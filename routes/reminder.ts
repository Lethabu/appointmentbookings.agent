import express from 'express';
import { sendWhatsAppReminder } from '../services/whatsappReminder';
import { Booking } from '../types';

const router = express.Router();

router.post('/send-reminder', async (req, res) => {
  const booking: Booking = req.body;
  const success = await sendWhatsAppReminder(booking);
  res.json({ success });
});

export default router;