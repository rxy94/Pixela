'use client';

import { Outfit, Roboto } from "next/font/google";
import "./globals.css";
import { Navbar } from "../shared/components/navbar";
import { useAuthStore } from "../store/auth.store";
import { useEffect } from "react";

/* Fuentes para el texto */
const roboto = Roboto({
  subsets: ["latin"],
  weight:  ["400"],
  variable: "--font-roboto",
});

/* Fuente sans para la interfaz */
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <html lang="en" className={`${roboto.variable} ${outfit.variable}`}>
      <body className="bg-pixela-dark">
        <div className="min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
        </div>
      </body>
    </html>
  );
}
