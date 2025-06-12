'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
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
  const { isAuthenticated, user, checkAuth, isLoading } = useAuthStore();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [hasTriedAuth, setHasTriedAuth] = useState(false);
  const router = useRouter();

  // Verificación rápida inicial - si claramente no hay sesión, ir directo al 403
  const hasValidSession = () => {
    if (typeof window === 'undefined') return true; // SSR safety
    
    // Verificar si hay cookies de sesión básicas
    const hasCookies = document.cookie.includes('pixela_session') || 
                      document.cookie.includes('XSRF-TOKEN');
    return hasCookies;
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Verificar si hay un logout forzado
        if (localStorage.getItem('forceLogout')) {
          setIsLoggingOut(true);
          localStorage.removeItem('forceLogout');
          
          // Timeout más corto para logout (500ms)
          setTimeout(() => {
            router.push('/');
            
            // Asegurar limpieza después de redirección
            setTimeout(() => {
              localStorage.removeItem('forceLogout');
            }, 100);
          }, 500);
          return;
        }
        
        // Si requiere auth y claramente no hay sesión, 403 inmediato
        if (requireAuth && !hasValidSession()) {
          setHasTriedAuth(true);
          return;
        }
        
        // Verificación rápida de auth (máximo 600ms)
        const authPromise = checkAuth();
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 600)
        );
        
        await Promise.race([authPromise, timeoutPromise]);
        
      } catch (error) {
        console.error('Error checking auth:', error);
        
        // Si hay error y requiere autenticación, mostrar 403 inmediatamente
        if (requireAuth) {
          setHasTriedAuth(true);
          return;
        }
      } finally {
        setHasTriedAuth(true);
      }
    };

    initAuth();
  }, [checkAuth, requireAuth, router]);

  // Verificar si hay un logout en progreso
  if (typeof window !== 'undefined' && localStorage.getItem('forceLogout')) {
    return (
      <div className={STYLES.loadingContainer}>
        <div className={STYLES.loadingContent}>
          <div className={STYLES.loadingSpinner}></div>
          <p className={STYLES.loadingText}>Cerrando sesión...</p>
        </div>
      </div>
    );
  }

  // Mostrar mensaje de logout
  if (isLoggingOut) {
    return (
      <div className={STYLES.loadingContainer}>
        <div className={STYLES.loadingContent}>
          <div className={STYLES.loadingSpinner}></div>
          <p className={STYLES.loadingText}>Cerrando sesión...</p>
        </div>
      </div>
    );
  }

  // Mientras no se haya intentado autenticar, no muestres nada (ni loader ni error)
  if (!hasTriedAuth || isLoading) {
    return (
      <div className={STYLES.loadingContainer}>
        <div className={STYLES.loadingContent}>
          <div className={STYLES.loadingSpinner}></div>
          <p className={STYLES.loadingText}>Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Solo aquí, después de la verificación, mostrar el 403 si corresponde
  if (requireAuth && !isAuthenticated) {
    return <Error403 />;
  }

  if (requireAdmin && (!isAuthenticated || !user?.is_admin)) {
    return <Error403 />;
  }

  // Si pasa todas las verificaciones, renderizar children
  return <>{children}</>;
} 