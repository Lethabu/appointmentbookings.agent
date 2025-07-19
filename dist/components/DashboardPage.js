"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const StatCard_1 = __importDefault(require("./StatCard"));
const constants_1 = require("../constants"); // Assuming you have an icon for revenue or clients
const DashboardPage = () => {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl font-bold text-neutral-800", children: "Welcome to Smart Salon HQ!" }), (0, jsx_runtime_1.jsx)("p", { className: "text-neutral-600", children: "Here's a quick overview of your salon's performance." }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [(0, jsx_runtime_1.jsx)(StatCard_1.default, { title: "Upcoming Appointments", value: "12", icon: (0, jsx_runtime_1.jsx)(constants_1.IconCalendar, {}), color: "text-blue-500" }), (0, jsx_runtime_1.jsx)(StatCard_1.default, { title: "AI Interactions Today", value: "47", icon: (0, jsx_runtime_1.jsx)(constants_1.IconChat, {}), color: "text-green-500" }), (0, jsx_runtime_1.jsx)(StatCard_1.default, { title: "Growth Opportunities", value: "3 New", icon: (0, jsx_runtime_1.jsx)(constants_1.IconSparkles, {}), color: "text-purple-500" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-8 p-6 bg-white rounded-xl shadow-lg", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-semibold text-neutral-700 mb-4", children: "Recent Activity" }), (0, jsx_runtime_1.jsxs)("ul", { className: "space-y-3", children: [(0, jsx_runtime_1.jsx)("li", { className: "text-neutral-600 p-3 bg-neutral-50 rounded-md", children: "New booking: Jane Doe - Ladies Cut - Tomorrow @ 2 PM" }), (0, jsx_runtime_1.jsx)("li", { className: "text-neutral-600 p-3 bg-neutral-50 rounded-md", children: "AI Agent 'Blaze' suggested a new promotion." }), (0, jsx_runtime_1.jsx)("li", { className: "text-neutral-600 p-3 bg-neutral-50 rounded-md", children: "Client 'Mike R.' completed their 5th visit." })] })] })] }));
};
exports.default = DashboardPage;
