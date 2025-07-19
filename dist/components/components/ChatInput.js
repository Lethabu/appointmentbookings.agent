"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const constants_1 = require("../../../../Lethabu/Lethabu Agents/smart-salon-hq/constants");
const ChatInput = ({ onSendMessage, isLoading }) => {
    const [inputText, setInputText] = (0, react_1.useState)('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputText.trim() && !isLoading) {
            onSendMessage(inputText.trim());
            setInputText('');
        }
    };
    return ((0, jsx_runtime_1.jsx)("form", { onSubmit: handleSubmit, className: "p-4 border-t border-neutral-200 bg-white", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-3", children: [(0, jsx_runtime_1.jsx)("input", { type: "text", value: inputText, onChange: (e) => setInputText(e.target.value), placeholder: "Type your message...", className: "flex-1 p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow", disabled: isLoading }), (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "bg-primary hover:bg-primary-dark text-white p-3 rounded-lg disabled:opacity-50 transition-colors flex items-center justify-center", disabled: isLoading || !inputText.trim(), children: isLoading ? ((0, jsx_runtime_1.jsx)("div", { className: "animate-spin rounded-full h-5 w-5 border-b-2 border-white" })) : ((0, jsx_runtime_1.jsx)(constants_1.IconSend, { className: "h-5 w-5" })) })] }) }));
};
exports.default = ChatInput;
