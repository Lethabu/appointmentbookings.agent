"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const SimpleCalendar_1 = __importDefault(require("./SimpleCalendar"));
const BookingForm_1 = __importDefault(require("./BookingForm"));
const BookingsPage = () => {
    const [selectedDate, setSelectedDate] = (0, react_1.useState)(new Date());
    const [bookings, setBookings] = (0, react_1.useState)([]); // To store created bookings locally
    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };
    const handleBookingSubmit = (newBookingData) => {
        const newBooking = {
            ...newBookingData,
            id: `booking-${Date.now()}`, // Simple unique ID
            status: 'Pending', // Default status
        };
        setBookings(prevBookings => [...prevBookings, newBooking]);
        alert(`Booking for ${newBooking.clientName} on ${newBooking.dateTime.toLocaleDateString()} at ${newBooking.dateTime.toLocaleTimeString()} added! Status: Pending.`);
        // You could also clear selectedDate or give other feedback
    };
    const bookingsForSelectedDate = selectedDate
        ? bookings.filter(b => b.dateTime.toDateString() === selectedDate.toDateString())
        : [];
    return ((0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "lg:col-span-2", children: [(0, jsx_runtime_1.jsx)(SimpleCalendar_1.default, { onDateSelect: handleDateSelect, selectedDate: selectedDate }), selectedDate && bookingsForSelectedDate.length > 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "mt-6 bg-white p-4 rounded-lg shadow-lg", children: [(0, jsx_runtime_1.jsxs)("h3", { className: "text-lg font-semibold text-neutral-700 mb-3", children: ["Bookings for ", selectedDate.toLocaleDateString(), ":"] }), (0, jsx_runtime_1.jsx)("ul", { className: "space-y-2", children: bookingsForSelectedDate.map(booking => ((0, jsx_runtime_1.jsxs)("li", { className: "p-3 bg-neutral-50 rounded-md shadow-sm", children: [(0, jsx_runtime_1.jsxs)("p", { className: "font-medium text-neutral-800", children: [booking.clientName, " - ", booking.service] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-neutral-600", children: ["Time: ", booking.dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), " - Status: ", booking.status] })] }, booking.id))) })] })), selectedDate && bookingsForSelectedDate.length === 0 && ((0, jsx_runtime_1.jsx)("div", { className: "mt-6 bg-white p-4 rounded-lg shadow-lg text-center", children: (0, jsx_runtime_1.jsxs)("p", { className: "text-neutral-500", children: ["No bookings scheduled for ", selectedDate.toLocaleDateString(), "."] }) }))] }), (0, jsx_runtime_1.jsx)("div", { className: "lg:col-span-1", children: (0, jsx_runtime_1.jsx)(BookingForm_1.default, { selectedDate: selectedDate, onBookingSubmit: handleBookingSubmit }) })] }));
};
exports.default = BookingsPage;
