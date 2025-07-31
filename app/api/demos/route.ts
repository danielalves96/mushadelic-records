import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

import { env } from '@/env';

const resend = new Resend(env.RESEND_API_KEY);

const demoSchema = z.object({
  name: z.string().min(1).max(30),
  email: z.string().email(),
  artist_name: z.string().min(1).max(30),
  country: z.string().url(),
  message: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, artist_name, country, message } = demoSchema.parse(body);

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Demo Submission - Mushadelic Records</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f0f0f; color: #ffffff;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 40px; padding: 30px 0; background: linear-gradient(135deg, #ec4899 0%, #f97316 50%, #eab308 100%); border-radius: 12px;">
              <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: #ffffff; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                Mushadelic Records
              </h1>
              <p style="margin: 8px 0 0 0; font-size: 16px; color: #fef7cd; opacity: 0.9;">
                New Demo Submission
              </p>
            </div>

            <!-- Artist Card -->
            <div style="background-color: #1a1a1a; border-radius: 12px; padding: 30px; margin-bottom: 30px; border: 1px solid #333;">
              <div style="margin-bottom: 24px;">
                <h2 style="margin: 0 0 8px 0; font-size: 20px; color: #f97316; font-weight: 600;">
                  ${artist_name} - ${country}
                </h2>
                <div style="height: 2px; width: 50px; background: linear-gradient(90deg, #ec4899, #f97316); border-radius: 1px;"></div>
              </div>

              <!-- Artist Info Grid -->
              <div style="margin-bottom: 24px;">
                <div style="background-color: #111; border-radius: 8px; padding: 20px; margin-bottom: 16px;">
                  <div style="margin-bottom: 16px;">
                    <span style="font-size: 14px; color: #94a3b8; font-weight: 500; display: block; margin-bottom: 4px;">ARTIST NAME:</span>
                    <span style="font-size: 18px; color: #ffffff; font-weight: 600;">${artist_name}</span>
                  </div>
                  <div style="margin-bottom: 16px;">
                    <span style="font-size: 14px; color: #94a3b8; font-weight: 500; display: block; margin-bottom: 4px;">CONTACT NAME:</span>
                    <span style="font-size: 16px; color: #e2e8f0;">${name}</span>
                  </div>
                  <div style="margin-bottom: 16px;">
                    <span style="font-size: 14px; color: #94a3b8; font-weight: 500; display: block; margin-bottom: 4px;">EMAIL:</span>
                    <a href="mailto:${email}" style="font-size: 16px; color: #f97316; text-decoration: none; font-weight: 500;">${email}</a>
                  </div>
                  <div>
                    <span style="font-size: 14px; color: #94a3b8; font-weight: 500; display: block; margin-bottom: 4px;">SOUNDCLOUD:</span>
                    <a href="${country}" target="_blank" style="font-size: 16px; color: #f97316; text-decoration: none; font-weight: 500; word-break: break-all;">${country}</a>
                  </div>
                </div>
              </div>

              <!-- Demo Description -->
              <div style="margin-bottom: 16px;">
                <h3 style="margin: 0 0 12px 0; font-size: 16px; color: #f97316; font-weight: 600;">
                  RELEASE DESCRIPTION
                </h3>
                <div style="background-color: #111; border-radius: 8px; padding: 20px; border-left: 4px solid #f97316;">
                  <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap;">${message}</p>
                </div>
              </div>

            </div>

            <!-- Footer -->
            <div style="text-align: center; padding: 20px; color: #64748b; font-size: 14px;">
              <p style="margin: 0 0 8px 0;">This demo was submitted through the Mushadelic Records website</p>
              <p style="margin: 0; font-size: 12px; opacity: 0.7;">${new Date().toLocaleString()}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await resend.emails.send({
      from: '[Mushadelic Records] New Demo Submission <noreply@kyantech.com.br>',
      to: ['daniel.madeireira@gmail.com', 'mushadelicrec@gmail.com'],
      subject: `Demo: ${artist_name} - New Submission`,
      html: emailHtml,
      replyTo: email,
    });

    return NextResponse.json({ message: 'Demo submitted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Demo submission error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid form data', details: error.errors }, { status: 400 });
    }

    return NextResponse.json({ error: 'Failed to submit demo' }, { status: 500 });
  }
}
