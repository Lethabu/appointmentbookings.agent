"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
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
        calendarDays.push((0, jsx_runtime_1.jsx)("div", { className: "p-2 border border-neutral-200" }, `empty-${i}`));
    }
    for (let day = 1; day <= numDays; day++) {
        const date = new Date(year, month, day);
        const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
        calendarDays.push((0, jsx_runtime_1.jsx)("div", { className: `p-2 border border-neutral-200 text-center cursor-pointer hover:bg-primary-light hover:text-white transition-colors
                    ${isSelected ? 'bg-primary text-white font-bold' : 'bg-white text-neutral-700'}
                    ${new Date().toDateString() === date.toDateString() ? 'ring-2 ring-secondary' : ''}`, onClick: () => onDateSelect(date), children: day }, day));
    }
    const changeMonth = (offset) => {
        setCurrentMonth(new Date(year, month + offset, 1));
    };
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return ((0, jsx_runtime_1.jsxs)("div", { className: "bg-white p-4 rounded-lg shadow-lg", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between items-center mb-4", children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => changeMonth(-1), className: "p-2 rounded-full hover:bg-neutral-100", children: (0, jsx_runtime_1.jsx)(constants_1.IconChevronDown, { className: "h-5 w-5 transform rotate-90 text-neutral-600" }) }), (0, jsx_runtime_1.jsxs)("h3", { className: "text-lg font-semibold text-neutral-700", children: [currentMonth.toLocaleString('default', { month: 'long' }), " ", year] }), (0, jsx_runtime_1.jsx)("button", { onClick: () => changeMonth(1), className: "p-2 rounded-full hover:bg-neutral-100", children: (0, jsx_runtime_1.jsx)(constants_1.IconChevronDown, { className: "h-5 w-5 transform -rotate-90 text-neutral-600" }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-7 gap-1", children: [dayNames.map(d => (0, jsx_runtime_1.jsx)("div", { className: "p-2 text-center font-medium text-sm text-neutral-500", children: d }, d)), calendarDays] })] }));
};
exports.default = SimpleCalendar;
