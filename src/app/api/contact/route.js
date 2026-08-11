import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req) {
  try {
    const formData = await req.formData();
    
    const name = formData.get('fullName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const company = formData.get('companyName');
    const service = formData.get('serviceRequired');
    const projectLocation = formData.get('projectLocation');
    const expectedTimeline = formData.get('expectedTimeline');
    const projectDescription = formData.get('projectDescription');
    
    // Concatenate extra fields into the message body
    const message = `
Project Location: ${projectLocation || 'N/A'}
Expected Timeline: ${expectedTimeline || 'N/A'}
Description: 
${projectDescription}
    `.trim();

    await db.inquiry.create({
      data: {
        name,
        email,
        phone: phone || null,
        company: company || null,
        service: service || null,
        message,
        status: 'NEW'
      }
    });

    return NextResponse.json({ success: true, message: 'Inquiry received' });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
