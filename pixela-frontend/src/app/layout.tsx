'use client';

import "./globals.css";
import { Navbar } from "../shared/components/Navbar";
import { useAuthStore } from "../stores/useAuthStore";
import { useEffect, startTransition } from "react";
import Footer from "../features/footer/Footer";
import { outfit, roboto } from "./ui/fonts";

const STYLES = {
  html: `${roboto.variable} ${outfit.variable}`,
  body: "antialiased bg-pixela-dark",
  container: "min-h-screen",
  main: "flex-grow"
} as const;

/**
 * Componente separado para manejo de autenticación
 * ✅ Optimizado para no bloquear el render inicial
 */
function AuthHandler() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    // ✅ Limpiar forceLogout inmediatamente (síncrono)
    localStorage.removeItem('forceLogout');
    
    // ✅ Mover checkAuth a transición no urgente
    startTransition(() => {
      // Pequeño delay para no bloquear el primer render
      setTimeout(() => {
        checkAuth();
      }, 50);
    });
  }, [checkAuth]);

  return null;
}

/**
 * Layout principal de la aplicación optimizado
 * @param {Object} props - Propiedades del layout
 * @param {React.ReactNode} props.children - Contenido del layout
 * @returns {React.ReactNode} - Layout principal
 * @description Layout principal optimizado para reducir bloqueos de rendering
 * @author Pixela
 * @version 1.0.1
 * @since 2025-06-04
 * @requires React
 * @requires Next.js
 * @requires Tailwind CSS
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={STYLES.html}>
      <body className={STYLES.body}>
        <div className={STYLES.container}>
          {/* ✅ Componente auth separado para no bloquear render */}
          <AuthHandler />
          <Navbar />
          <main className={STYLES.main}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
