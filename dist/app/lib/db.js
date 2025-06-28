"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateClient = getOrCreateClient;
exports.getConversationHistory = getConversationHistory;
exports.saveConversationHistory = saveConversationHistory;
const supabase_js_1 = require("@supabase/supabase-js");
const supabase = (0, supabase_js_1.createClient)(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
async function getOrCreateClient(phone) {
    let { data } = await supabase
        .from('clients')
        .select('*')
        .eq('phone', phone)
        .single();
    if (!data) {
        const { data: newClient } = await supabase
            .from('clients')
            .insert({ phone })
            .select()
            .single();
        return newClient;
    }
    return data;
}
async function getConversationHistory(phone) {
    const { data } = await supabase
        .from('conversations')
        .select('history')
        .eq('phone', phone)
        .single();
    return data?.history || '';
}
async function saveConversationHistory(phone, history) {
    await supabase
        .from('conversations')
        .upsert({ phone, history });
}
