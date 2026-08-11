import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';

export async function POST(req) {
  try {
    const hasSession = cookies().has('admin_session');
    if (!hasSession) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file received.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (e) {
      // Ignore if directory exists
    }

    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    const url = `/uploads/${filename}`;

    // Save to database
    const media = await db.media.create({
      data: {
        filename,
        url,
        key: filename,
        mimeType: file.type,
        size: file.size,
        alt: file.name
      }
    });

    return NextResponse.json({ message: 'Success', url, media });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
