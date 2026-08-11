import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { checkRateLimit } from '@/lib/rateLimit';

export async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.ip || '127.0.0.1';
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ success: false, message: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const formData = await req.formData();
    
    const name = formData.get('fullName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const company = formData.get('companyName');
    const service = formData.get('serviceRequired');
    const projectLocation = formData.get('projectLocation');
    const expectedTimeline = formData.get('expectedTimeline');
    const projectDescription = formData.get('projectDescription');
    
    // We'll keep the raw projectDescription as 'message' in the DB
    const message = projectDescription || 'No description provided.';
    let documentUrl = null;

    const file = formData.get('documentUpload');
    if (file && file.size > 0) {
      const { mkdir, writeFile } = await import('fs/promises');
      const path = await import('path');
      
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const uploadDir = path.default.join(process.cwd(), 'public', 'uploads');
      
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (e) {}

      const filepath = path.default.join(uploadDir, filename);
      await writeFile(filepath, buffer);
      
      documentUrl = `/uploads/${filename}`;
    }

    // Generate Reference Number
    // Example: MEC-2026-0001
    const currentYear = new Date().getFullYear();
    const count = await db.inquiry.count();
    const referenceNumber = `MEC-${currentYear}-${String(count + 1).padStart(4, '0')}`;

    const newInquiry = await db.inquiry.create({
      data: {
        referenceNumber,
        name,
        email,
        phone: phone || null,
        company: company || null,
        service: service || null,
        location: projectLocation || null,
        timeline: expectedTimeline || null,
        preferredContactMethod: formData.get('preferredContactMethod') || 'Email',
        message,
        documentUrl,
        status: 'NEW'
      }
    });

    // Create Activity Log
    await db.activityLog.create({
      data: {
        action: 'INQUIRY_CREATED',
        entity: 'INQUIRY',
        entityId: newInquiry.id,
        details: `Customer submitted new service request for ${service || 'General Service'}.`
      }
    });

    // Create Notification for SUPER_ADMINs and ADMINs
    const admins = await db.user.findMany({
      where: { role: { in: ['SUPER_ADMIN', 'ADMIN'] } },
      select: { id: true }
    });

    if (admins.length > 0) {
      await db.notification.createMany({
        data: admins.map(admin => ({
          userId: admin.id,
          type: 'INQUIRY_CREATED',
          title: 'New Service Request',
          message: `New inquiry received from ${name} (${company || 'Individual'}).`,
          entityType: 'INQUIRY',
          entityId: newInquiry.id,
        }))
      });
    }

    return NextResponse.json({ success: true, message: 'Inquiry received', referenceNumber });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
