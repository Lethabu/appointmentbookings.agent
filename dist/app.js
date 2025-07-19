"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const Sidebar_1 = __importDefault(require("./components/Sidebar"));
const Header_1 = __importDefault(require("./components/Header"));
const DashboardPage_1 = __importDefault(require("./components/DashboardPage"));
const AgentChatPage_1 = __importDefault(require("./components/AgentChatPage"));
const BookingsPage_1 = __importDefault(require("./components/BookingsPage"));
const constants_1 = require("./constants");
const App = () => {
    return ((0, jsx_runtime_1.jsx)(react_router_dom_1.HashRouter, { children: (0, jsx_runtime_1.jsxs)("div", { className: "flex h-screen bg-neutral-100", children: [(0, jsx_runtime_1.jsx)(Sidebar_1.default, {}), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 flex flex-col overflow-hidden", children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)("main", { className: "flex-1 overflow-x-hidden overflow-y-auto bg-neutral-100 p-6", children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: constants_1.AppRoutes.DASHBOARD, replace: true }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: constants_1.AppRoutes.DASHBOARD, element: (0, jsx_runtime_1.jsx)(DashboardPage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: constants_1.AppRoutes.AGENT_CHAT, element: (0, jsx_runtime_1.jsx)(AgentChatPage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: constants_1.AppRoutes.BOOKINGS, element: (0, jsx_runtime_1.jsx)(BookingsPage_1.default, {}) })] }) })] })] }) }));
};
exports.default = App;
