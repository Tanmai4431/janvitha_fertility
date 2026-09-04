import type { APIRoute } from 'astro';
import { z } from 'zod';
import { getSiteSettings } from '../../utils/sanity';
import { sendContactEmails } from '../../utils/resend';
import client from '../../../../../client.json';

// Zod Validation Schema for form payload
const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please provide a valid email address.' }),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
  honeypot: z.string().optional(),
});

export const POST: APIRoute = async ({ request, locals }) => {
  // Define response headers
  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  try {
    // 1. Parse and validate JSON request payload
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return new Response(
        JSON.stringify({ success: false, error: 'Malformed JSON payload.' }),
        { status: 400, headers }
      );
    }

    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      // Map validation errors into a clean key-value object
      const formattedErrors = validationResult.error.format();
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Validation failed.',
          details: formattedErrors 
        }),
        { status: 400, headers }
      );
    }

    const payload = validationResult.data;

    // Bot detection honeypot intercept
    if (payload.honeypot && payload.honeypot.trim().length > 0) {
      console.warn('[Honeypot Triggered]: Blocked spam bot submission from:', payload.email);
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Your inquiry has been successfully transmitted!' 
        }),
        { status: 200, headers }
      );
    }

    // 2. Database Lead Ingestion (Cloudflare D1 SQL)
    const runtime = (locals as any).runtime;
    const db = runtime?.env?.DB;
    let dbWriteSuccess = false;
    let dbErrorDetails = '';

    if (db) {
      try {
        await db
          .prepare(
            'INSERT INTO leads (name, email, phone, service, message) VALUES (?, ?, ?, ?, ?)'
          )
          .bind(payload.name, payload.email, payload.phone || null, payload.service || null, payload.message)
          .run();
        dbWriteSuccess = true;
        console.log('[D1 Database Success]: Successfully logged lead:', payload.email);
      } catch (dbError: any) {
        dbErrorDetails = dbError.message || 'Database write error';
        console.error('[D1 Database Error]: Failed to write lead to SQL database:', dbError);
      }
    } else {
      console.warn('[D1 Database Warning]: DB binding is unconfigured on the Cloudflare Dashboard settings.');
    }

    // 3. Fetch site settings from Sanity (or fallback to client.json)
    const siteSettings = await getSiteSettings();

    // 4. Resolve dynamic email properties based on priority logic
    const fromName = siteSettings?.emailFromName || siteSettings?.name || client.business.name;
    const fromAddress = siteSettings?.emailFromAddress || 'notifications@welcomewebworks.com';
    const to = siteSettings?.emailTo || siteSettings?.primaryEmail || client.contact.primaryEmail;
    const cc = siteSettings?.emailCc || undefined;
    const subjectTemplate = siteSettings?.emailSubjectTemplate || 'New Website Inquiry from {name}';

    // 5. Dispatch the emails using the Resend service utility
    const emailResult = await sendContactEmails({
      payload,
      fromName,
      fromAddress,
      to,
      cc,
      subjectTemplate,
      resendApiKey: siteSettings?.resendApiKey,
    });

    // 6. Evaluate and return response based on outcome (Industrial-grade Error Resilience)
    if (dbWriteSuccess) {
      if (!emailResult.success) {
        console.warn('[Endpoint Partial Success]: Lead saved to D1 DB, but email dispatch failed:', emailResult.error);
      }
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Your inquiry has been successfully logged!' 
        }),
        { status: 200, headers }
      );
    } else {
      // If D1 failed (or was not bound) and Resend also failed
      if (!emailResult.success) {
        return new Response(
          JSON.stringify({ 
            success: false, 
            error: `Submission failed. Database write error: ${dbErrorDetails || 'DB not bound'}. Email dispatch error: ${emailResult.error}` 
          }),
          { status: 500, headers }
        );
      }
      
      // If D1 failed (or was not bound) but Resend succeeded
      console.warn('[Endpoint Partial Success]: Email dispatched successfully, but D1 database logging failed:', dbErrorDetails || 'DB not bound');
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Your inquiry has been successfully transmitted!' 
        }),
        { status: 200, headers }
      );
    }

  } catch (error: any) {
    console.error('[API contact endpoint error]:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'An unexpected server error occurred. Please try again later.' 
      }),
      { status: 500, headers }
    );
  }
};
