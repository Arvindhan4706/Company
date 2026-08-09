import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    // Here you would integrate with Resend, EmailJS, SendGrid, etc.
    // For now, we simulate a successful email send.
    console.log(`Sending email from ${name} (${email}) at ${company}: ${message}`);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ success: true, message: 'Message sent successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
