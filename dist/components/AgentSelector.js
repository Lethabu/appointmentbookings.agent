"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const constants_1 = require("../constants");
const AgentSelector = ({ selectedAgent, onSelectAgent }) => {
    return (<div className="relative inline-block text-left mb-4">
      <div>
        <span className="rounded-md shadow-sm">
          <select value={selectedAgent} onChange={(e) => onSelectAgent(e.target.value)} className="block w-full pl-3 pr-10 py-2 text-base leading-6 border-neutral-300 focus:outline-none focus:ring-primary focus:border-primary-dark sm:text-sm sm:leading-5 rounded-md appearance-none bg-white">
            {constants_1.Agents.map((agent) => (<option key={agent.type} value={agent.type}>
                {agent.name}
              </option>))}
          </select>
        </span>
      </div>
       <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-700">
        <constants_1.IconChevronDown className="h-5 w-5"/>
      </div>
    </div>);
};
exports.default = AgentSelector;
