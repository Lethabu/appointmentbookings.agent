import { Booking } from '../types';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const whatsappFrom = process.env.TWILIO_WHATSAPP_FROM!;

const client = twilio(accountSid, authToken);

export async function sendWhatsAppReminder(booking: Booking): Promise<boolean> {
  try {
    await client.messages.create({
      body: `Hi ${booking.clientName}, this is a reminder for your ${booking.service} appointment on ${booking.dateTime}.`,
      from: `whatsapp:${whatsappFrom}`,
      to: `whatsapp:${booking.clientPhone}`,
    });
    return true;
  } catch (err) {
    console.error('WhatsApp reminder failed:', err);
    return false;
  }
}