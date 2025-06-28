"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const whatsappReminder_1 = require("../services/whatsappReminder");
const router = express_1.default.Router();
router.post('/send-reminder', async (req, res) => {
    const booking = req.body;
    const success = await (0, whatsappReminder_1.sendWhatsAppReminder)(booking);
    res.json({ success });
});
exports.default = router;
