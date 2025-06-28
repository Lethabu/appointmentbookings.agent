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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
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
    return (<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <SimpleCalendar_1.default onDateSelect={handleDateSelect} selectedDate={selectedDate}/>
        {selectedDate && bookingsForSelectedDate.length > 0 && (<div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-neutral-700 mb-3">
              Bookings for {selectedDate.toLocaleDateString()}:
            </h3>
            <ul className="space-y-2">
              {bookingsForSelectedDate.map(booking => (<li key={booking.id} className="p-3 bg-neutral-50 rounded-md shadow-sm">
                  <p className="font-medium text-neutral-800">{booking.clientName} - {booking.service}</p>
                  <p className="text-sm text-neutral-600">
                    Time: {booking.dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - Status: {booking.status}
                  </p>
                </li>))}
            </ul>
          </div>)}
         {selectedDate && bookingsForSelectedDate.length === 0 && (<div className="mt-6 bg-white p-4 rounded-lg shadow-lg text-center">
             <p className="text-neutral-500">No bookings scheduled for {selectedDate.toLocaleDateString()}.</p>
           </div>)}

      </div>
      <div className="lg:col-span-1">
        <BookingForm_1.default selectedDate={selectedDate} onBookingSubmit={handleBookingSubmit}/>
      </div>
    </div>);
};
exports.default = BookingsPage;
