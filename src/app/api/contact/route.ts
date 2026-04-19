import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);


export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Tutti i campi sono obbligatori' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Walter Portfolio <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL_TO || 'alessiog622@gmail.com',
      subject: `Nuovo messaggio da: ${name}`,
      replyTo: email,
      text: `Nome: ${name}\nEmail: ${email}\n\nMessaggio:\n${message}`,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error('API Error:', err);
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
  }
}
