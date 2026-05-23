import emailjs from '@emailjs/browser';

// ── EmailJS Config ────────────────────────────────────────
// These values come from your EmailJS dashboard:
//   https://dashboard.emailjs.com
const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const TEMPLATE_CONTACT = import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT;
const TEMPLATE_BOOKING = import.meta.env.VITE_EMAILJS_TEMPLATE_BOOKING;

// ── Types ─────────────────────────────────────────────────
export interface ContactEmailParams {
  full_name: string;
  email: string;
  phone_number?: string;
  subject: string;
  message: string;
}

export interface BookingEmailParams {
  full_name: string;
  email: string;
  phone_number: string;
  event_type: string;
  preferred_date: string;
  preferred_time: string;
  location_needed: boolean;
  location_details?: string;
  additional_notes?: string;
}

// ── Helpers ────────────────────────────────────────────────
function initEmailJS() {
  emailjs.init({ publicKey: PUBLIC_KEY });
}

// ── Send Contact Notification ──────────────────────────────
export async function sendContactEmail(data: ContactEmailParams): Promise<void> {
  initEmailJS();

  const templateParams = {
    from_name:    data.full_name,
    from_email:   data.email,
    phone_number: data.phone_number || 'Not provided',
    subject:      data.subject,
    message:      data.message,
  };

  await emailjs.send(SERVICE_ID, TEMPLATE_CONTACT, templateParams);
}

// ── Send Booking Notification ──────────────────────────────
export async function sendBookingEmail(data: BookingEmailParams): Promise<void> {
  initEmailJS();

  const templateParams = {
    from_name:        data.full_name,
    from_email:       data.email,
    phone_number:     data.phone_number,
    event_type:       data.event_type,
    preferred_date:   data.preferred_date,
    preferred_time:   data.preferred_time,
    location_needed:  data.location_needed ? 'Yes' : 'No',
    location_details: data.location_details || 'N/A',
    additional_notes: data.additional_notes || 'None',
  };

  await emailjs.send(SERVICE_ID, TEMPLATE_BOOKING, templateParams);
}
