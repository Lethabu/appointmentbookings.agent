"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const constants_1 = require("../constants");
const BookingForm = ({ selectedDate, onBookingSubmit }) => {
    const [clientName, setClientName] = (0, react_1.useState)('');
    const [selectedServiceId, setSelectedServiceId] = (0, react_1.useState)(constants_1.MockServices[0]?.id || '');
    const [bookingTime, setBookingTime] = (0, react_1.useState)('09:00'); // Default time
    const [clientPhone, setClientPhone] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        // Reset form or update based on selectedDate if needed
    }, [selectedDate]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedDate || !selectedServiceId) {
            alert('Please select a date and service.');
            return;
        }
        const service = constants_1.MockServices.find(s => s.id === selectedServiceId);
        if (!service) {
            alert('Selected service not found.');
            return;
        }
        const [hours, minutes] = bookingTime.split(':').map(Number);
        const bookingDateTime = new Date(selectedDate);
        bookingDateTime.setHours(hours, minutes, 0, 0);
        onBookingSubmit({
            clientName,
            service: service.name,
            dateTime: bookingDateTime,
        });
        // Reset form (optional)
        setClientName('');
        setSelectedServiceId(constants_1.MockServices[0]?.id || '');
        setBookingTime('09:00');
        setClientPhone('');
    };
    const handleSimulateWhatsAppReminder = () => {
        if (!clientPhone) {
            alert("Please enter a client phone number to simulate WhatsApp reminder.");
            return;
        }
        alert(`(Simulated) WhatsApp reminder would be sent to ${clientPhone} for this booking if it were confirmed.`);
    };
    const availableTimes = Array.from({ length: 18 }, (_, i) => {
        const hour = Math.floor(i / 2) + 9;
        const minute = (i % 2) * 30;
        return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    });
    return ((0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "bg-white p-6 rounded-lg shadow-lg space-y-4", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-xl font-semibold text-neutral-700 mb-2", children: selectedDate ? `Book for ${selectedDate.toLocaleDateString()}` : 'Select a date to book' }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "clientName", className: "block text-sm font-medium text-neutral-700", children: "Client Name" }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "clientName", value: clientName, onChange: (e) => setClientName(e.target.value), className: "mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm", required: true, disabled: !selectedDate })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "clientPhone", className: "block text-sm font-medium text-neutral-700", children: "Client Phone (for reminders)" }), (0, jsx_runtime_1.jsx)("input", { type: "tel", id: "clientPhone", value: clientPhone, onChange: (e) => setClientPhone(e.target.value), placeholder: "e.g., +27821234567", className: "mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm", disabled: !selectedDate })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "service", className: "block text-sm font-medium text-neutral-700", children: "Service" }), (0, jsx_runtime_1.jsx)("select", { id: "service", value: selectedServiceId, onChange: (e) => setSelectedServiceId(e.target.value), className: "mt-1 block w-full pl-3 pr-10 py-2 text-base border-neutral-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md bg-white", required: true, disabled: !selectedDate, children: constants_1.MockServices.map(service => ((0, jsx_runtime_1.jsxs)("option", { value: service.id, children: [service.name, " - ", service.durationMinutes, "min (R", service.price, ")"] }, service.id))) })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "bookingTime", className: "block text-sm font-medium text-neutral-700", children: "Time" }), (0, jsx_runtime_1.jsx)("select", { id: "bookingTime", value: bookingTime, onChange: (e) => setBookingTime(e.target.value), className: "mt-1 block w-full pl-3 pr-10 py-2 text-base border-neutral-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md bg-white", required: true, disabled: !selectedDate, children: availableTimes.map(time => (0, jsx_runtime_1.jsx)("option", { value: time, children: time }, time)) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0 pt-2", children: [(0, jsx_runtime_1.jsx)("button", { type: "submit", disabled: !selectedDate, className: "w-full sm:w-auto flex-grow justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light disabled:opacity-50", children: "Add Booking" }), (0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: handleSimulateWhatsAppReminder, disabled: !selectedDate || !clientPhone, className: "w-full sm:w-auto flex-grow justify-center py-2 px-4 border border-secondary text-secondary hover:bg-secondary hover:text-white rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-light disabled:opacity-50 flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(constants_1.IconWhatsApp, { className: "h-5 w-5" }), (0, jsx_runtime_1.jsx)("span", { children: "Simulate Reminder" })] })] })] }));
};
exports.default = BookingForm;
