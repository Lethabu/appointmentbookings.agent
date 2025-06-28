import http from 'http';
import { Server } from 'socket.io';
import app from './app';
import { setSocketServer } from './services/calendar';
import dotenv from 'dotenv';

dotenv.config();

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

setSocketServer(io);

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
});

server.listen(process.env.PORT || 3000, () => {
  console.log('Server running');
});

// Twilio configuration
export const twilioConfig = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  whatsappFrom: process.env.TWILIO_WHATSAPP_FROM,
};

// API key configuration
export const apiKey = process.env.API_KEY;