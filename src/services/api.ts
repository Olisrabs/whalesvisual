import { supabase } from '../lib/supabase';

// ── Types ────────────────────────────────────────────────
export interface ContactFormData {
  full_name: string;
  email: string;
  phone_number?: string;
  subject: 'General Inquiry' | 'Booking Question' | 'Partnership' | 'Other';
  message: string;
}

export interface BookingFormData {
  full_name: string;
  email: string;
  phone_number: string;
  event_type: 'Wedding' | 'Portrait Session' | 'Corporate Event' | 'Birthday' | 'Brand Shoot' | 'Other';
  preferred_date: string;       // ISO date string: "YYYY-MM-DD"
  preferred_time: 'Morning (8am–12pm)' | 'Afternoon (12pm–4pm)' | 'Evening (4pm–7pm)';
  location_needed: boolean;
  location_details?: string;
  additional_notes?: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: Record<string, unknown>;
}

// ── API Calls ─────────────────────────────────────────────

export async function submitContactForm(data: ContactFormData): Promise<ApiResponse> {
  const { error } = await supabase
    .from('contact_messages')
    .insert([data]);

  if (error) {
    console.error('Supabase contact insert error:', error);
    throw new Error(error.message || 'Failed to send message.');
  }

  return {
    success: true,
    message: 'Your message has been sent successfully! We will get back to you soon.',
    data: data as unknown as Record<string, unknown>
  };
}

export async function submitBookingForm(data: BookingFormData): Promise<ApiResponse> {
  const { error } = await supabase
    .from('booking_requests')
    .insert([data]);

  if (error) {
    console.error('Supabase booking insert error:', error);
    throw new Error(error.message || 'Failed to submit booking.');
  }

  return {
    success: true,
    message: 'Your booking request has been submitted successfully!',
    data: data as unknown as Record<string, unknown>
  };
}
