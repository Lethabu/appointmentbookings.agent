"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWhatsAppReminder = sendWhatsAppReminder;
const twilio_1 = __importDefault(require("twilio"));
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const whatsappFrom = process.env.TWILIO_WHATSAPP_FROM;
const client = (0, twilio_1.default)(accountSid, authToken);
async function sendWhatsAppReminder(booking) {
    try {
        await client.messages.create({
            body: `Hi ${booking.clientName}, this is a reminder for your ${booking.service} appointment on ${booking.dateTime}.`,
            from: `whatsapp:${whatsappFrom}`,
            to: `whatsapp:${booking.clientPhone}`,
        });
        return true;
    }
    catch (err) {
        console.error('WhatsApp reminder failed:', err);
        return false;
    }
}
