import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="text-center py-20 bg-purple-50">
        <h1 className="text-5xl font-bold text-purple-800">Welcome to InStyle Hair Boutique</h1>
        <p className="text-lg text-purple-600 mt-4">Your one-stop shop for beautiful hair.</p>
        <a href="/#booking" className="mt-8 inline-block bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700">
          Book an Appointment
        </a>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <h2 className="text-4xl font-bold text-center text-gray-800">Our Services</h2>
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold text-gray-800">Haircuts & Styling</h3>
            <p className="mt-4 text-gray-600">From classic cuts to the latest trends, our stylists will create the perfect look for you.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold text-gray-800">Color & Highlights</h3>
            <p className="mt-4 text-gray-600">Expert color services to enhance your natural beauty or create a bold new look.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-bold text-gray-800">Special Occasions</h3>
            <p className="mt-4 text-gray-600">Look your best for weddings, proms, and other special events with our elegant updos and styling.</p>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-20 bg-gray-100">
        <h2 className="text-4xl font-bold text-center text-gray-800">Book Your Appointment</h2>
        <div className="mt-8 max-w-4xl mx-auto">
          <iframe
            src="https://www.supersaas.com/schedule/InStyle_Hair_Boutique/Instyle_Hair_Boutique?view=widget&widget_view=btn"
            className="w-full h-[600px] border-0"
          />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <h2 className="text-4xl font-bold text-center text-gray-800">Contact Us</h2>
        <div className="mt-8 max-w-lg mx-auto text-center text-gray-600">
          <p>123 Beauty Lane, Suite 101, Glamour City, 12345</p>
          <p className="mt-2">Phone: (123) 456-7890</p>
          <p className="mt-2">Email: contact@instylehair.com</p>
        </div>
      </section>
    </div>
  );
}
