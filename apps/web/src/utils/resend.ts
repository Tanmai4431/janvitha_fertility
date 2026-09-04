import { Resend } from 'resend';
import client from '../../../../client.json';

// Initialize the Resend SDK. Since wrangler can expose environment variables at runtime, 
// fallback to a dummy/empty key if not defined to prevent compile-time crashes.
const apiKey = import.meta.env.RESEND_API_KEY || '';

export const resend = apiKey ? new Resend(apiKey) : null;

interface EmailPayload {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

interface SendEmailParams {
  payload: EmailPayload;
  fromName: string;
  fromAddress: string;
  to: string;
  cc?: string;
  subjectTemplate: string;
  resendApiKey?: string;
}

export async function sendContactEmails({
  payload,
  fromName,
  fromAddress,
  to,
  cc,
  subjectTemplate,
  resendApiKey,
}: SendEmailParams) {
  // Dynamically resolve Resend API Key: Sanity CMS siteSettings -> process.env -> import.meta.env
  const activeApiKey =
    (resendApiKey && resendApiKey.trim().length > 0 ? resendApiKey.trim() : null) ||
    process.env.RESEND_API_KEY ||
    (import.meta as any).env?.RESEND_API_KEY ||
    '';

  if (!activeApiKey) {
    console.warn('[Resend Warning]: Resend API Key is unconfigured in Sanity CMS or Environment. Email dispatch skipped gracefully.');
    return {
      success: false,
      error: 'Email dispatch service is currently unconfigured (Missing Resend API Key in Sanity CMS / Environment).',
    };
  }

  const resend = new Resend(activeApiKey);

  const { name, email, phone, message } = payload;

  // 1. Interpolate subject line variables (e.g. replacing {name} with submitter name)
  const subject = subjectTemplate
    ? subjectTemplate.replace(/{name}/g, name)
    : `New Lead Inquiry from ${name}`;

  // 2. Build To and CC recipient arrays with trim and empty string filtering
  const toEmails = to
    ? to.split(',').map((e) => e.trim()).filter((e) => e.length > 0)
    : [client.contact.primaryEmail];

  const ccEmails = cc
    ? cc.split(',').map((e) => e.trim()).filter((e) => e.length > 0)
    : undefined;

  // 3. Format dynamic HTML email body for lead alert notification
  const htmlNotification = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${subject}</title>
        <style>
          body { font-family: 'Inter', Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6; margin: 0; padding: 20px; background-color: #f8fafc; }
          .container { max-w: 600px; margin: 0 auto; background: #ffffff; padding: 32px; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
          .header { border-bottom: 2px solid #e2e8f0; padding-bottom: 16px; margin-bottom: 24px; }
          .logo-text { font-size: 20px; font-weight: 700; color: #4f46e5; text-decoration: none; }
          .title { font-size: 22px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 8px; }
          .meta-info { font-size: 13px; color: #64748b; margin-bottom: 24px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
          td { padding: 12px; border-bottom: 1px solid #f1f5f9; vertical-align: top; }
          td.label { font-weight: 600; width: 140px; color: #475569; }
          td.value { color: #1e293b; }
          .message-box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 8px; font-style: italic; color: #334155; white-space: pre-wrap; }
          .footer { border-top: 1px solid #e2e8f0; padding-top: 16px; margin-top: 32px; font-size: 12px; color: #94a3b8; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="logo-text">${client.business.name} Notification</span>
          </div>
          <h2 class="title">${subject}</h2>
          <div class="meta-info">Received on ${new Date().toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}</div>
          
          <table>
            <tr>
              <td class="label">Name</td>
              <td class="value"><strong>${name}</strong></td>
            </tr>
            <tr>
              <td class="label">Email</td>
              <td class="value"><a href="mailto:${email}">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td class="label">Phone</td>
              <td class="value"><a href="tel:${phone}">${phone}</a></td>
            </tr>` : ''}
            ${payload.service ? `
            <tr>
              <td class="label">Service Requested</td>
              <td class="value"><strong>${payload.service}</strong></td>
            </tr>` : ''}
          </table>
          
          <h3 style="font-size: 16px; color: #0f172a; margin-bottom: 12px;">Message:</h3>
          <div class="message-box">${message}</div>
          
          <div class="footer">
            This email was generated automatically by the ${client.business.name} form handler endpoint.
          </div>
        </div>
      </body>
    </html>
  `;

  // 4. Format HTML confirmation response for the user
  const htmlConfirmation = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>We have received your message</title>
        <style>
          body { font-family: 'Inter', Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6; margin: 0; padding: 20px; background-color: #f8fafc; }
          .container { max-w: 600px; margin: 0 auto; background: #ffffff; padding: 32px; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
          .header { border-bottom: 2px solid #e2e8f0; padding-bottom: 16px; margin-bottom: 24px; }
          .logo-text { font-size: 20px; font-weight: 700; color: #4f46e5; text-decoration: none; }
          .title { font-size: 22px; font-weight: 700; color: #0f172a; margin-top: 0; margin-bottom: 8px; }
          .footer { border-top: 1px solid #e2e8f0; padding-top: 16px; margin-top: 32px; font-size: 12px; color: #94a3b8; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="logo-text">${client.business.name}</span>
          </div>
          <h2 class="title">Hello ${name},</h2>
          <p>Thank you for reaching out to us. We wanted to confirm that we have received your inquiry.</p>
          <p>A member of our team will review your message and get back to you shortly.</p>
          
          <div style="margin: 24px 0; padding: 16px; border-left: 4px solid #4f46e5; background: #f8fafc; font-size: 14px;">
            <strong>Your Message:</strong><br>
            <p style="margin-top: 8px; font-style: italic; color: #475569;">"${message}"</p>
          </div>
          
          <p>Best regards,<br><strong>The ${client.business.name} Team</strong></p>
          
          <div class="footer">
            &copy; ${new Date().getFullYear()} ${client.business.name}. All rights reserved.<br>
            If you did not submit this request, please ignore this email.
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    // Dispatch main notification email to the client admin
    const notificationResult = await resend.emails.send({
      from: `"${fromName}" <${fromAddress}>`,
      to: toEmails,
      cc: ccEmails,
      subject: subject,
      html: htmlNotification,
      replyTo: email,
    });

    if (notificationResult.error) {
      console.error('[Resend Error]: Failed to send notification email:', notificationResult.error);
      return {
        success: false,
        error: notificationResult.error.message || 'Failed to dispatch email notification.',
      };
    }

    // Dispatch confirmation email back to the submitter (lead validation auto-response)
    // NOTE: In sandbox mode, Resend can only send to the verified domain owner's address.
    // If the sender address domain matches the verified domain, it will work. Otherwise,
    // in real production, it functions perfectly.
    try {
      await resend.emails.send({
        from: `"${client.business.name}" <${fromAddress}>`,
        to: [email],
        subject: `Thank you for contacting ${client.business.name}`,
        html: htmlConfirmation,
      });
    } catch (confirmationError) {
      // Log but do not block lead ingestion if only the confirmation email fails (e.g. due to sandbox restrictions)
      console.warn('[Resend Warning]: Failed to send auto-reply confirmation email to client:', confirmationError);
    }

    return {
      success: true,
      data: notificationResult.data,
    };
  } catch (error: any) {
    console.error('[Resend Exception]: Unhandled error during email dispatching:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred during email transmission.',
    };
  }
}
