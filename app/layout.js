import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "InStyle Hair Boutique",
  description: "Your one-stop shop for beautiful hair.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-800`}>
        <header className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-purple-600">
              InStyle Hair Boutique
            </Link>
            <nav>
              <Link href="/#booking" className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                Book Appointment
              </Link>
              <Link href="/#services" className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                Services
              </Link>
              <Link href="/#contact" className="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </Link>
            </nav>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">{children}</main>
        <footer className="bg-white shadow-md mt-8">
          <div className="container mx-auto px-4 py-4 text-center text-gray-600">
            <p>&copy; 2024 InStyle Hair Boutique. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
