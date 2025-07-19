"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const server_1 = require("next/server");
const db_1 = require("../../../lib/db");
async function POST(req) {
    const secret = req.headers.get('X-Webhook-Secret');
    if (secret !== process.env.YOUR_WEBHOOK_SECRET) {
        return server_1.NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { phone, message } = await req.json();
    if (!phone || !message) {
        return server_1.NextResponse.json({ error: 'Missing phone or message' }, { status: 400 });
    }
    // Get or create client
    const client = await (0, db_1.getOrCreateClient)(phone);
    // Get conversation history
    let history = await (0, db_1.getConversationHistory)(phone);
    history += `\nUser: ${message}`;
    // Call your AI agent (pseudo-code)
    let aiResponse = '';
    try {
        // aiResponse = await callSmartAgent({ message, client, history });
        aiResponse = "This is a placeholder AI response.";
    }
    catch (err) {
        // Optionally send a WhatsApp message here if you have a sendWhatsAppMessage helper
        return server_1.NextResponse.json({ error: 'AI error' }, { status: 500 });
    }
    // Save new history
    history += `\nAI: ${aiResponse}`;
    await (0, db_1.saveConversationHistory)(phone, history);
    // Optionally send WhatsApp reply here
    // await sendWhatsAppMessage(phone, aiResponse);
    return server_1.NextResponse.json({ success: true });
}
