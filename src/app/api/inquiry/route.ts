import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import { resend, getRecipientEmails } from '@/lib/resend';

interface InquiryData {
  name: string;
  company: string;
  email: string;
  phone: string;
  event_type: string;
  guest_count: string;
  event_date: string;
  setup_type: string;
  breakout_needed: string;
  breakout_rooms: string;
  technical_needs: string[];
  fnb_needs: string[];
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: InquiryData = await request.json();
    const supabase = getServiceSupabase();
    
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const country = request.headers.get('x-vercel-ip-country') || 'Unknown';
    const city = request.headers.get('x-vercel-ip-city') || 'Unknown';

    const { data: inquiry, error } = await supabase.from('inquiries').insert({
      name: body.name,
      company: body.company,
      email: body.email,
      phone: body.phone,
      event_type: body.event_type,
      guest_count: body.guest_count,
      event_date: body.event_date || null,
      setup_type: body.setup_type,
      breakout_needed: body.breakout_needed === 'yes',
      breakout_rooms: body.breakout_rooms || null,
      technical_needs: body.technical_needs || [],
      fnb_needs: body.fnb_needs || [],
      message: body.message,
      country,
      city,
    }).select().single();

    if (error) {
      console.error('Error saving inquiry:', error);
      return NextResponse.json({ error: 'Failed to save inquiry' }, { status: 500 });
    }

    const recipients = getRecipientEmails();
    if (recipients.length > 0 && process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'Royal Phuket City <noreply@royalphuketcity.com>',
          to: recipients,
          subject: `[New Inquiry] ${body.event_type} - ${body.company || body.name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #1a1a2e; border-bottom: 3px solid #d4af37; padding-bottom: 10px;">
                New Event Inquiry
              </h1>
              
              <h2 style="color: #486581;">Contact Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Name:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${body.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Company:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${body.company || '-'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${body.email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${body.phone || '-'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Location:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${city}, ${country}</td>
                </tr>
              </table>

              <h2 style="color: #486581; margin-top: 24px;">Event Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Event Type:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${body.event_type}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Expected Guests:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${body.guest_count}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Event Date:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${body.event_date || 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Setup Type:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${body.setup_type}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Breakout Rooms:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${body.breakout_needed === 'yes' ? `Yes (${body.breakout_rooms || 'TBD'} rooms)` : 'No'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Technical Needs:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${body.technical_needs?.join(', ') || 'None specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">F&B:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${body.fnb_needs?.join(', ') || 'None specified'}</td>
                </tr>
              </table>

              ${body.message ? `
                <h2 style="color: #486581; margin-top: 24px;">Additional Notes</h2>
                <p style="background: #f5f5f5; padding: 16px; border-radius: 4px;">${body.message}</p>
              ` : ''}

              <hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;" />
              <p style="color: #888; font-size: 12px;">
                This inquiry was submitted from the Royal Phuket City Hotel Vietnam landing page.
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Error sending email:', emailError);
      }
    }

    return NextResponse.json({ success: true, inquiry });
  } catch (error) {
    console.error('Inquiry API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
