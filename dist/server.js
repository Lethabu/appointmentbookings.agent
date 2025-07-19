"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiKey = exports.twilioConfig = void 0;
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("./app"));
const calendar_1 = require("./services/calendar");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server = http_1.default.createServer(app_1.default);
const io = new socket_io_1.Server(server, { cors: { origin: '*' } });
(0, calendar_1.setSocketServer)(io);
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
});
server.listen(process.env.PORT || 3000, () => {
    console.log('Server running');
});
// Twilio configuration
exports.twilioConfig = {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    whatsappFrom: process.env.TWILIO_WHATSAPP_FROM,
};
// API key configuration
exports.apiKey = process.env.API_KEY;
