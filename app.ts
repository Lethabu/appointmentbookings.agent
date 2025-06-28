import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { advancedSecurity as importedAdvancedSecurity } from './middleware/security';
import reminderRoutes from './routes/reminder';
import agentRoutes from './routes/agent';
import { setSocketServer } from './services/calendar';

const app = express();
app.use(express.json());
app.use(importedAdvancedSecurity);

app.use('/reminder', reminderRoutes);
app.use('/agent', agentRoutes);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });
setSocketServer(io);

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
});

server.listen(process.env.PORT || 3000, () => {
  console.log('Server running');
});

export default app;

