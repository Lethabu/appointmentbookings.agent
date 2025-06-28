"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IconWhatsApp = exports.IconChevronDown = exports.IconSparkles = exports.IconUserCircle = exports.IconSend = exports.IconCalendar = exports.IconChat = exports.IconDashboard = exports.MockServices = exports.getAgentSystemInstruction = exports.Agents = exports.AppRoutes = exports.AppName = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const types_1 = require("./types");
exports.AppName = "Smart Salon HQ";
var AppRoutes;
(function (AppRoutes) {
    AppRoutes["DASHBOARD"] = "/dashboard";
    AppRoutes["AGENT_CHAT"] = "/agent-chat";
    AppRoutes["BOOKINGS"] = "/bookings";
})(AppRoutes || (exports.AppRoutes = AppRoutes = {}));
exports.Agents = [
    { type: types_1.AgentType.NIA, name: 'Nia - Salon Assistant', description: 'Handles bookings and client communication.' },
    { type: types_1.AgentType.BLAZE, name: 'Blaze - Marketing Guru', description: 'Generates marketing ideas and content.' },
    { type: types_1.AgentType.NOVA, name: 'Nova - Business Strategist', description: 'Provides insights for business growth.' },
];
const getAgentSystemInstruction = (agentType) => {
    switch (agentType) {
        case types_1.AgentType.NIA:
            return "You are Nia, a friendly and efficient AI assistant for InStyle Hair Boutique. You specialize in salon services, appointment booking, and client communication. Be polite, helpful, and concise.";
        case types_1.AgentType.BLAZE:
            return "You are Blaze, a dynamic and creative AI marketing assistant for InStyle Hair Boutique. You specialize in generating marketing ideas, social media content, and promotional strategies for salon businesses. Be energetic, insightful, and provide actionable suggestions.";
        case types_1.AgentType.NOVA:
            return "You are Nova, a strategic AI business advisor for InStyle Hair Boutique. You specialize in providing insights for business growth, client retention, and operational efficiency for salons. Be analytical, forward-thinking, and offer practical advice.";
        default:
            return "You are a helpful AI assistant.";
    }
};
exports.getAgentSystemInstruction = getAgentSystemInstruction;
exports.MockServices = [
    { id: '1', name: 'Ladies Cut & Blowdry', durationMinutes: 60, price: 75 },
    { id: '2', name: 'Gents Cut', durationMinutes: 30, price: 40 },
    { id: '3', name: 'Full Head Color', durationMinutes: 120, price: 150 },
    { id: '4', name: 'Highlights - Half Head', durationMinutes: 90, price: 120 },
    { id: '5', name: 'Manicure', durationMinutes: 45, price: 50 },
];
// SVG Icons
const IconDashboard = ({ className }) => ((0, jsx_runtime_1.jsx)("svg", { className: className, xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" }) }));
exports.IconDashboard = IconDashboard;
const IconChat = ({ className }) => ((0, jsx_runtime_1.jsx)("svg", { className: className, xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }) }));
exports.IconChat = IconChat;
const IconCalendar = ({ className }) => ((0, jsx_runtime_1.jsx)("svg", { className: className, xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }));
exports.IconCalendar = IconCalendar;
const IconSend = ({ className }) => ((0, jsx_runtime_1.jsx)("svg", { className: className, xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8" }) }));
exports.IconSend = IconSend;
const IconUserCircle = ({ className }) => ((0, jsx_runtime_1.jsx)("svg", { className: className, xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }));
exports.IconUserCircle = IconUserCircle;
const IconSparkles = ({ className }) => ((0, jsx_runtime_1.jsx)("svg", { className: className, xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: "2", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 3v4M3 5h4M6.343 6.343l2.829-2.829m11.314 0l-2.829 2.829M12 21a9 9 0 110-18 9 9 0 010 18zM9.536 9.536L6.707 12.364m7.728.001L17.293 15m-7.728 0l2.829-2.829M12 3v2m0 16v2m4.657-4.657l-1.414-1.414M6.757 17.243L8.172 15.828" }) }));
exports.IconSparkles = IconSparkles;
const IconChevronDown = ({ className }) => ((0, jsx_runtime_1.jsx)("svg", { className: className, xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19 9l-7 7-7-7" }) }));
exports.IconChevronDown = IconChevronDown;
const IconWhatsApp = ({ className }) => ((0, jsx_runtime_1.jsx)("svg", { className: className, fill: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: (0, jsx_runtime_1.jsx)("path", { d: "M16.75 13.96c.27.13.42.22.5.34.09.12.15.25.15.41a.87.87 0 01-.41.77c-.19.14-.43.21-.72.21-.21 0-.42-.04-.63-.12s-.4-.19-.58-.33c-.18-.14-.35-.29-.51-.45s-.3-.32-.42-.48c-.12-.16-.23-.3-.31-.43s-.15-.24-.15-.33a.35.35 0 01.1-.26.66.66 0 01.2-.14.73.73 0 01.27-.06c.1 0 .18.01.25.03a.5.5 0 01.22.09c.07.04.14.09.2.15s.13.13.18.21.09.17.11.25c.02.08.02.17.02.25 0 .09-.01.18-.04.26s-.06.15-.1.21c-.04.06-.09.12-.15.17s-.12.1-.19.13c-.07.03-.14.05-.21.05-.07 0-.14-.01-.2-.03s-.13-.05-.18-.08c-.06-.03-.11-.07-.15-.11s-.08-.08-.11-.13c-.02-.05-.05-.09-.06-.14l-.01-.03c0-.28-.1-.52-.29-.73s-.43-.31-.72-.31c-.33 0-.61.12-.84.35-.23.23-.34.52-.34.86a2.1 2.1 0 00.31 1.11c.1.18.23.36.37.52s.3.33.47.51.34.34.52.5c.18.16.37.31.56.45.2.14.4.26.62.36.22.1.45.18.69.23.24.05.48.08.72.08.26 0 .51-.03.75-.09s.46-.14.65-.25c.19-.11.36-.25.51-.41.15-.16.27-.34.37-.54.1-.2.17-.42.22-.65.04-.23.06-.47.06-.71 0-.31-.06-.59-.17-.83s-.27-.45-.48-.61c-.21-.17-.46-.29-.74-.38-.28-.09-.58-.13-.88-.13-.37 0-.72.06-1.04.18s-.6.28-.84.48-.44.44-.6.71-.24.58-.24.91a2.6 2.6 0 00.86 1.99c.3.29.66.52 1.07.68.41.17.85.25 1.31.25.26 0 .52-.03.77-.08.25-.05.5-.13.73-.23.23-.1.46-.22.66-.37.2-.15.39-.32.55-.5.16-.18.3-.39.41-.61.11-.22.19-.46.25-.71.06-.25.08-.51.08-.76a3.15 3.15 0 00-.71-2.07c-.23-.3-.5-.54-.8-.71s-.63-.29-.98-.34c-.35-.05-.7-.07-1.03-.07-.46 0-.91.07-1.33.2s-.8.32-1.14.56c-.34.24-.62.53-.84.87s-.37.71-.46 1.1c-.09.39-.13.79-.13 1.18 0 .54.11.96.34 1.25.23.3.61.44 1.14.44.25 0 .49-.05.71-.14s.41-.2.58-.33.3-.28.41-.43.18-.31.22-.47.06-.31.06-.46c0-.21-.04-.39-.12-.53s-.19-.25-.32-.33c-.13-.08-.28-.12-.45-.12-.2 0-.38.04-.52.11s-.26.17-.34.29c-.08.12-.12.26-.12.41 0 .15.04.28.11.39.07.11.16.2.26.27.1.07.21.12.33.15.12.03.24.04.37.04.38 0 .72-.08 1.02-.23.3-.15.55-.36.74-.61.19-.25.33-.55.41-.88.08-.33.12-.68.12-1.03a2.6 2.6 0 00-.3-1.22 2.4 2.4 0 00-.81-.9c-.33-.24-.7-.41-1.1-.51-.4-.1-.82-.15-1.26-.15-.56 0-1.1.08-1.6.25-.5.17-.95.4-1.35.71-.4.31-.73.68-1 .11-.27.43-.46.89-.57 1.37s-.17.97-.17 1.47c0 .58.09 1.12.27 1.63.18.51.44.96.78 1.36.34.4.75.73 1.21 1 .47.27.98.46 1.53.57.55.11 1.12.17 1.7.17.65 0 1.28-.1 1.88-.31.6-.21 1.13-.51 1.6-.9.47-.39.85-.85 1.14-1.39.29-.54.44-1.12.44-1.74 0-.46-.07-.9-.2-1.31s-.33-.78-.58-1.1c-.25-.32-.56-.6-.91-.81-.35-.22-.75-.38-1.17-.49-.42-.11-.87-.16-1.33-.16zm-4.47-5.93c1.08 0 2.11.21 3.06.63.95.42 1.76.99 2.44 1.72.68.72 1.21 1.58 1.6 2.56.38.98.57 2.03.57 3.12 0 1.06-.18 2.08-.55 3.05-.37.97-.9 1.86-1.57 2.66-.68.8-1.49 1.45-2.43 1.95-.94.5-1.98.75-3.1.75-2.32 0-4.38-.83-6.16-2.48-1.78-1.65-2.67-3.8-2.67-6.42 0-1.34.33-2.62.98-3.81.65-1.2 1.54-2.2 2.66-2.99.7-.5 1.47-.88 2.29-1.14.82-.26 1.68-.39 2.55-.39zm0-1.75c-1.13 0-2.23.23-3.26.68-.92.4-1.74.95-2.46 1.62-.32.3-.62.62-.89.96-.34.41-.65.84-.91 1.3-.27.45-.49.93-.68 1.42-.41 1.06-.62 2.18-.62 3.32 0 1.35.34 2.65 1.01 3.87.67 1.22 1.57 2.25 2.71 3.08 1.13.84 2.44 1.45 3.91 1.84 1.47.39 3.02.58 4.64.58 1.19 0 2.34-.2 3.44-.61.99-.36 1.88-.87 2.67-1.51.79-.64 1.46-1.41 1.99-2.3.53-.89.92-1.89 1.15-2.99.23-1.1.35-2.23.35-3.37 0-1.19-.2-2.35-.61-3.46-.35-.98-.85-1.88-1.49-2.69-.64-.81-1.39-1.48-2.26-2.02-.87-.54-1.82-.94-2.86-1.22-.92-.25-1.87-.38-2.83-.38z" }) }));
exports.IconWhatsApp = IconWhatsApp;
