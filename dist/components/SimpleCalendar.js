"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const constants_1 = require("../constants"); // Re-using for prev/next month
const SimpleCalendar = ({ onDateSelect, selectedDate }) => {
    const [currentMonth, setCurrentMonth] = (0, react_1.useState)(new Date());
    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday...
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth(); // 0-11
    const numDays = daysInMonth(year, month);
    const startDay = (firstDayOfMonth(year, month) + 6) % 7; // Adjust to make Monday first day (0)
    const calendarDays = [];
    for (let i = 0; i < startDay; i++) {
        calendarDays.push(<div key={`empty-${i}`} className="p-2 border border-neutral-200"></div>);
    }
    for (let day = 1; day <= numDays; day++) {
        const date = new Date(year, month, day);
        const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
        calendarDays.push(<div key={day} className={`p-2 border border-neutral-200 text-center cursor-pointer hover:bg-primary-light hover:text-white transition-colors
                    ${isSelected ? 'bg-primary text-white font-bold' : 'bg-white text-neutral-700'}
                    ${new Date().toDateString() === date.toDateString() ? 'ring-2 ring-secondary' : ''}`} onClick={() => onDateSelect(date)}>
        {day}
      </div>);
    }
    const changeMonth = (offset) => {
        setCurrentMonth(new Date(year, month + offset, 1));
    };
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return (<div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-neutral-100">
          <constants_1.IconChevronDown className="h-5 w-5 transform rotate-90 text-neutral-600"/>
        </button>
        <h3 className="text-lg font-semibold text-neutral-700">
          {currentMonth.toLocaleString('default', { month: 'long' })} {year}
        </h3>
        <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-neutral-100">
          <constants_1.IconChevronDown className="h-5 w-5 transform -rotate-90 text-neutral-600"/>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {dayNames.map(d => <div key={d} className="p-2 text-center font-medium text-sm text-neutral-500">{d}</div>)}
        {calendarDays}
      </div>
    </div>);
};
exports.default = SimpleCalendar;
