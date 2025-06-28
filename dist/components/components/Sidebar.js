"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const constants_1 = require("../../../../Lethabu/Lethabu Agents/smart-salon-hq/constants");
const Sidebar = () => {
    const navLinkClasses = ({ isActive }) => `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ease-in-out hover:bg-primary-dark hover:text-white ${isActive ? 'bg-primary-dark text-white shadow-md' : 'text-neutral-200'}`;
    return (<div className="w-64 bg-neutral-800 text-white flex flex-col p-4 space-y-6 shadow-lg">
      <div className="flex items-center space-x-2 px-2 py-4 border-b border-neutral-700">
        <constants_1.IconSparkles className="h-10 w-10 text-primary-light"/>
        <h1 className="text-2xl font-bold text-white">{constants_1.AppName}</h1>
      </div>
      <nav className="flex-1 space-y-2">
        <react_router_dom_1.NavLink to={constants_1.AppRoutes.DASHBOARD} className={navLinkClasses}>
          <constants_1.IconDashboard className="h-6 w-6"/>
          <span>Dashboard</span>
        </react_router_dom_1.NavLink>
        <react_router_dom_1.NavLink to={constants_1.AppRoutes.AGENT_CHAT} className={navLinkClasses}>
          <constants_1.IconChat className="h-6 w-6"/>
          <span>AI Agents</span>
        </react_router_dom_1.NavLink>
        <react_router_dom_1.NavLink to={constants_1.AppRoutes.BOOKINGS} className={navLinkClasses}>
          <constants_1.IconCalendar className="h-6 w-6"/>
          <span>Bookings</span>
        </react_router_dom_1.NavLink>
      </nav>
      <div className="mt-auto p-2 text-center text-neutral-400 text-xs">
        &copy; {new Date().getFullYear()} {constants_1.AppName}
      </div>
    </div>);
};
exports.default = Sidebar;
