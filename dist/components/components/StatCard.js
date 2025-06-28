"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const StatCard = ({ title, value, icon, color = 'text-primary' }) => {
    return ((0, jsx_runtime_1.jsx)("div", { className: "bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-neutral-500 uppercase tracking-wider", children: title }), (0, jsx_runtime_1.jsx)("p", { className: "text-3xl font-bold text-neutral-800 mt-1", children: value })] }), (0, jsx_runtime_1.jsx)("div", { className: `p-3 rounded-full bg-opacity-20 ${color.replace('text-', 'bg-')}`, children: react_1.default.cloneElement(icon, { className: `h-7 w-7 ${color}` }) })] }) }));
};
exports.default = StatCard;
