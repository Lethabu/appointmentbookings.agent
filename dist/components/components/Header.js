"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const constants_1 = require("../../../../Lethabu/Lethabu Agents/smart-salon-hq/constants");
const Header = () => {
    // In a real app, you'd get the current page title or breadcrumbs from routing context
    const pageTitle = "Salon Dashboard";
    return ((0, jsx_runtime_1.jsxs)("header", { className: "bg-white shadow-md p-4 flex justify-between items-center h-16 border-b border-neutral-200", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-semibold text-neutral-700", children: pageTitle }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-3", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-neutral-600", children: "Salon Admin" }), (0, jsx_runtime_1.jsx)(constants_1.IconUserCircle, { className: "h-8 w-8 text-neutral-500" })] })] }));
};
exports.default = Header;
