'use client';
import { Poppins } from "next/font/google";
import "./globals.css";
import { CartContextProvider } from "@/components/CartContext";
import AuthProvider from "@/components/AuthProvider";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: '100'
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://js.paystack.co/v1/inline.js"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        <AuthProvider>
          <CartContextProvider>
            <Toaster position="top-right" reverseOrder={false} />
            <Header />
            <main> {children}</main>
            <Footer />
          </CartContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}