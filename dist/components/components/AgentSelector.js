"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const constants_1 = require("../../../../Lethabu/Lethabu Agents/smart-salon-hq/constants");
const AgentSelector = ({ selectedAgent, onSelectAgent }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative inline-block text-left mb-4", children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("span", { className: "rounded-md shadow-sm", children: (0, jsx_runtime_1.jsx)("select", { value: selectedAgent, onChange: (e) => onSelectAgent(e.target.value), className: "block w-full pl-3 pr-10 py-2 text-base leading-6 border-neutral-300 focus:outline-none focus:ring-primary focus:border-primary-dark sm:text-sm sm:leading-5 rounded-md appearance-none bg-white", children: constants_1.Agents.map((agent) => ((0, jsx_runtime_1.jsx)("option", { value: agent.type, children: agent.name }, agent.type))) }) }) }), (0, jsx_runtime_1.jsx)("div", { className: "pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-700", children: (0, jsx_runtime_1.jsx)(constants_1.IconChevronDown, { className: "h-5 w-5" }) })] }));
};
exports.default = AgentSelector;
