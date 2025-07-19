"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const constants_1 = require("../../../../Lethabu/Lethabu Agents/smart-salon-hq/constants");
const ChatMessageItem = ({ message }) => {
    const isUser = message.role === 'user';
    const bubbleClasses = isUser
        ? 'bg-primary text-white self-end rounded-l-lg rounded-tr-lg'
        : 'bg-neutral-200 text-neutral-800 self-start rounded-r-lg rounded-tl-lg';
    const containerClasses = isUser ? 'flex justify-end' : 'flex justify-start';
    const Icon = isUser ? constants_1.IconUserCircle : constants_1.IconSparkles;
    return ((0, jsx_runtime_1.jsxs)("div", { className: `flex items-end space-x-2 mb-3 ${containerClasses}`, children: [!isUser && (0, jsx_runtime_1.jsx)(Icon, { className: "h-8 w-8 text-neutral-400 flex-shrink-0 mb-1" }), (0, jsx_runtime_1.jsxs)("div", { className: `p-3 max-w-md md:max-w-lg lg:max-w-xl shadow-md ${bubbleClasses}`, children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm whitespace-pre-wrap", children: message.text }), (0, jsx_runtime_1.jsx)("p", { className: `text-xs mt-1 ${isUser ? 'text-indigo-200' : 'text-neutral-500'} text-right`, children: new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) })] }), isUser && (0, jsx_runtime_1.jsx)(Icon, { className: "h-8 w-8 text-primary flex-shrink-0 mb-1" })] }));
};
exports.default = ChatMessageItem;
