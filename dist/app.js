"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const security_1 = require("./middleware/security");
const reminder_1 = __importDefault(require("./routes/reminder"));
const agent_1 = __importDefault(require("./routes/agent"));
const calendar_1 = require("./services/calendar");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(security_1.advancedSecurity);
app.use('/reminder', reminder_1.default);
app.use('/agent', agent_1.default);
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, { cors: { origin: '*' } });
(0, calendar_1.setSocketServer)(io);
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
});
server.listen(process.env.PORT || 3000, () => {
    console.log('Server running');
});
exports.default = app;
