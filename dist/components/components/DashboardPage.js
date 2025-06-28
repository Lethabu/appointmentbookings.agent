"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const StatCard_1 = __importDefault(require("./StatCard"));
const constants_1 = require("../../../../Lethabu/Lethabu Agents/smart-salon-hq/constants"); // Assuming you have an icon for revenue or clients
const DashboardPage = () => {
    return (<div className="space-y-6">
      <h1 className="text-3xl font-bold text-neutral-800">Welcome to Smart Salon HQ!</h1>
      <p className="text-neutral-600">Here's a quick overview of your salon's performance.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard_1.default title="Upcoming Appointments" value="12" icon={<constants_1.IconCalendar />} color="text-blue-500"/>
        <StatCard_1.default title="AI Interactions Today" value="47" icon={<constants_1.IconChat />} color="text-green-500"/>
        <StatCard_1.default title="Growth Opportunities" value="3 New" icon={<constants_1.IconSparkles />} color="text-purple-500"/>
      </div>

      <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-neutral-700 mb-4">Recent Activity</h2>
        {/* Placeholder for recent activity feed or charts */}
        <ul className="space-y-3">
          <li className="text-neutral-600 p-3 bg-neutral-50 rounded-md">New booking: Jane Doe - Ladies Cut - Tomorrow @ 2 PM</li>
          <li className="text-neutral-600 p-3 bg-neutral-50 rounded-md">AI Agent 'Blaze' suggested a new promotion.</li>
          <li className="text-neutral-600 p-3 bg-neutral-50 rounded-md">Client 'Mike R.' completed their 5th visit.</li>
        </ul>
      </div>
    </div>);
};
exports.default = DashboardPage;
