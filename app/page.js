'use client';

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [contactStatus, setContactStatus] = useState(null);
  const [contactLoading, setContactLoading] = useState(false);

  async function handleContactSubmit(e) {
    e.preventDefault();
    setContactLoading(true);
    setContactStatus(null);
    const form = e.target;
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name.value,
        email: form.email.value,
        message: form.message.value,
      }),
    });
    const data = await res.json();
    setContactLoading(false);
    if (data.success) {
      setContactStatus("Thank you! We'll be in touch soon.");
      form.reset();
    } else {
      setContactStatus("Sorry, something went wrong. Please try again later.");
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-8 bg-gradient-to-b from-indigo-50 to-white">
        <Image src="/next.svg" alt="Logo" width={120} height={40} className="mb-4" />
        <h1 className="text-4xl sm:text-5xl font-bold text-indigo-900">Effortless Appointment Booking</h1>
        <p className="text-lg sm:text-xl text-gray-700 max-w-xl mx-auto">
          Manage your salon, staff, and clients with a modern, easy-to-use platform. Book, track, and grow—all in one place.
        </p>
        <div className="flex gap-4 justify-center mt-4">
          <a href="/signup" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition">Get Started</a>
          <a href="/login" className="px-6 py-3 border border-indigo-600 text-indigo-700 rounded-lg font-semibold hover:bg-indigo-50 transition">Log In</a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-indigo-900">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-indigo-50 p-6 rounded-lg shadow text-center">
              <h3 className="text-xl font-semibold mb-2">Multi-Tenant Architecture</h3>
              <p className="text-gray-700">Isolated data per salon, secure with Row-Level Security and tenant partitioning.</p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-lg shadow text-center">
              <h3 className="text-xl font-semibold mb-2">Real-Time Booking</h3>
              <p className="text-gray-700">Live calendar sync, instant notifications, and seamless client experience.</p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-lg shadow text-center">
              <h3 className="text-xl font-semibold mb-2">AI-Powered Agents</h3>
              <p className="text-gray-700">Nia (GPT-4o) for bookings, Orion (Gemini Pro) for recommendations, and WhatsApp reminders.</p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-lg shadow text-center">
              <h3 className="text-xl font-semibold mb-2">Flexible Payments</h3>
              <p className="text-gray-700">Stripe, Netcash, and Payflex integration for subscriptions and e-commerce.</p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-lg shadow text-center">
              <h3 className="text-xl font-semibold mb-2">Secure & Scalable</h3>
              <p className="text-gray-700">Vercel edge deployment, nightly backups, and Redis caching for performance.</p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-lg shadow text-center">
              <h3 className="text-xl font-semibold mb-2">Role-Based Access</h3>
              <p className="text-gray-700">Supabase Auth with OAuth, Magic Links, and RBAC for owners and staff.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-indigo-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-indigo-900">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-gray-700 italic mb-4">“AppointmentBookings made running my salon so much easier. My clients love the online booking and reminders!”</p>
              <span className="block font-semibold text-indigo-700">— Lerato, Salon Owner</span>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-gray-700 italic mb-4">“The AI assistant is a game changer. I save hours every week and never miss a booking.”</p>
              <span className="block font-semibold text-indigo-700">— Sipho, Barber</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-indigo-900">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-indigo-50 p-6 rounded-lg shadow text-center">
              <h3 className="text-xl font-semibold mb-2">Basic</h3>
              <p className="text-3xl font-bold mb-2">R199<span className="text-base font-normal">/mo</span></p>
              <ul className="text-gray-700 mb-4 space-y-1">
                <li>1 Salon</li>
                <li>Unlimited Appointments</li>
                <li>Email Support</li>
              </ul>
              <a href="/signup" className="block px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">Choose Basic</a>
            </div>
            <div className="bg-indigo-100 p-6 rounded-lg shadow-lg border-2 border-indigo-600 text-center scale-105">
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <p className="text-3xl font-bold mb-2">R499<span className="text-base font-normal">/mo</span></p>
              <ul className="text-gray-700 mb-4 space-y-1">
                <li>Up to 5 Salons</li>
                <li>Staff Management</li>
                <li>Priority Support</li>
                <li>AI Booking Assistant</li>
              </ul>
              <a href="/signup" className="block px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">Choose Pro</a>
            </div>
            <div className="bg-indigo-50 p-6 rounded-lg shadow text-center">
              <h3 className="text-xl font-semibold mb-2">Elite</h3>
              <p className="text-3xl font-bold mb-2">R999<span className="text-base font-normal">/mo</span></p>
              <ul className="text-gray-700 mb-4 space-y-1">
                <li>Unlimited Salons</li>
                <li>Custom Integrations</li>
                <li>Dedicated Account Manager</li>
                <li>All Pro Features</li>
              </ul>
              <a href="/signup" className="block px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">Choose Elite</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-indigo-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-indigo-900">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg text-indigo-800">How do I get started?</h3>
              <p className="text-gray-700">Simply sign up for a free trial, set up your salon, and start accepting bookings in minutes.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-indigo-800">Can I upgrade or downgrade my plan?</h3>
              <p className="text-gray-700">Yes, you can change your plan at any time from your dashboard. Your billing will be adjusted automatically.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-indigo-800">Is my data secure?</h3>
              <p className="text-gray-700">Absolutely. We use industry-standard security, RLS, and nightly backups to keep your data safe.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-indigo-800">Do you offer support?</h3>
              <p className="text-gray-700">Yes! Our support team is available via email and chat for all plans, with priority support for Pro and Elite users.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 text-indigo-900">Contact Us</h2>
          <form className="space-y-6 bg-indigo-50 p-8 rounded-lg shadow" onSubmit={handleContactSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input id="name" name="name" type="text" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input id="email" name="email" type="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea id="message" name="message" rows={4} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            </div>
            <button type="submit" disabled={contactLoading} className="w-full py-3 px-6 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50">
              {contactLoading ? "Sending..." : "Send Message"}
            </button>
            {contactStatus && <p className="text-center text-sm mt-2 text-indigo-700">{contactStatus}</p>}
          </form>
        </div>
      </section>
    </>
  );
}
