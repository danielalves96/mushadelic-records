import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

import { env } from '@/env';

const resend = new Resend(env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(1).max(30),
  email: z.string().email(),
  subject: z.string().min(1).max(75),
  message: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = contactSchema.parse(body);

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Contact Message - Mushadelic Records</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f0f0f; color: #ffffff;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 40px; padding: 30px 0; background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 50%, #c084fc 100%); border-radius: 12px;">
              <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: #ffffff;">
                Mushadelic Records
              </h1>
              <p style="margin: 8px 0 0 0; font-size: 16px; color: #e2e8f0;">
                Mensagem de Contato
              </p>
            </div>

            <!-- Message Card -->
            <div style="background-color: #1a1a1a; border-radius: 12px; padding: 30px; margin-bottom: 30px; border: 1px solid #333;">
              <div style="margin-bottom: 24px;">
                <h2 style="margin: 0 0 8px 0; font-size: 20px; color: #a855f7; font-weight: 600;">
                  ${subject}
                </h2>
                <div style="height: 2px; width: 50px; background: linear-gradient(90deg, #8b5cf6, #a855f7); border-radius: 1px;"></div>
              </div>

              <!-- Contact Info -->
              <div style="margin-bottom: 24px; background-color: #111; border-radius: 8px; padding: 20px;">
                <p style="margin: 0 0 12px 0; font-size: 16px; color: #ffffff;">
                  <strong>De:</strong> ${name}
                </p>
                <p style="margin: 0; font-size: 16px; color: #ffffff;">
                  <strong>Email:</strong> <a href="mailto:${email}" style="color: #a855f7; text-decoration: none;">${email}</a>
                </p>
              </div>

              <!-- Message Content -->
              <div style="background-color: #111; border-radius: 8px; padding: 20px; border-left: 4px solid #a855f7;">
                <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap;">${message}</p>
              </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding: 20px; color: #64748b; font-size: 14px;">
              <p style="margin: 0 0 8px 0;">Enviado através do formulário de contato do site</p>
              <p style="margin: 0; font-size: 12px;">${new Date().toLocaleString('pt-BR')}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await resend.emails.send({
      from: 'Mushadelic Records <noreply@kyantech.com.br>',
      to: ['daniel.madeireira@gmail.com', 'mushadelicrec@gmail.com'],
      subject: `Contato Site: ${subject}`,
      html: emailHtml,
      replyTo: email,
      headers: {
        'X-Priority': '1',
        Importance: 'high',
      },
    });

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Contact email error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid form data', details: error.errors }, { status: 400 });
    }

    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
