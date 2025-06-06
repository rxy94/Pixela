'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import Error403 from '@/app/error-403';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
}

const STYLES = {
  loadingContainer: "min-h-screen bg-gradient-to-br from-[#0F0F0F] via-[#1A1A1A] to-[#0F0F0F] flex items-center justify-center pt-20",
  loadingContent: "text-center",
  loadingSpinner: "animate-spin rounded-full h-12 w-12 border-b-2 border-pixela-accent mx-auto mb-4",
  loadingText: "text-gray-300"
} as const;

export function ProtectedRoute({ 
  children, 
  requireAuth = true, 
  requireAdmin = false 
}: ProtectedRouteProps) {
  const { isAuthenticated, user, checkAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await checkAuth();
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setIsLoading(false);
        setIsChecked(true);
      }
    };

    initAuth();
  }, [checkAuth]);

  // Mostrar loading mientras verificamos autenticación
  if (isLoading || !isChecked) {
    return (
      <div className={STYLES.loadingContainer}>
        <div className={STYLES.loadingContent}>
          <div className={STYLES.loadingSpinner}></div>
          <p className={STYLES.loadingText}>Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Verificar si requiere autenticación
  if (requireAuth && !isAuthenticated) {
    return <Error403 />;
  }

  // Verificar si requiere privilegios de administrador
  if (requireAdmin && (!isAuthenticated || !user?.is_admin)) {
    return <Error403 />;
  }

  // Si pasa todas las verificaciones, renderizar children
  return <>{children}</>;
} 