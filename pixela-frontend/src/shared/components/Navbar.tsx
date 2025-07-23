'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MdLogout } from 'react-icons/md';
import { FiUser, FiX } from 'react-icons/fi';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useState, useEffect, useMemo } from 'react';
import { mainNavLinks } from '@/links/navigation';
import { useAuthStore } from '@/stores/useAuthStore';
import { useSectionNavigation } from '@/hooks/useSectionNavigation';

const STYLES = {
  nav: 'w-full fixed top-0 left-0 z-50 mt-5 px-4',
  container: 'w-full max-w-[83.333%] mx-auto flex items-center p-4 max-sm:px-3 max-sm:w-[calc(100%-2rem)] bg-dark-opacity backdrop-blur-sm rounded-[36px]',
  logo: 'mx-10 sm:mx-2 md:mx-6 lg:mx-10',
  logoText: 'text-3xl font-bold font-outfit text-pixela-accent',
  navLinks: 'hidden md:flex ipad:hidden lg:flex flex-1 justify-center', 
  navLinksContainer: 'flex space-x-8',
  navLink: 'font-pixela-outfit-sm text-pixela-light relative group',
  navLinkUnderline: 'absolute bottom-0 left-0 w-0 h-0.5 bg-pixela-accent transition-all duration-300 group-hover:w-full',
  userSection: 'hidden md:flex ipad:hidden lg:flex mx-10 items-center',
  userContainer: 'flex items-center gap-2',
  userName: 'text-pixela-light font-pixela-outfit-sm',
  button: 'text-pixela-light/80 hover:text-pixela-accent transition-colors duration-300 p-2 rounded-full hover:bg-pixela-dark/30',
  divider: 'mx-2 h-6 w-0.5 bg-pixela-light/20',

  // Estilos para el menú hamburguesa
  mobileMenuButton: 'md:hidden ipad:block lg:hidden text-pixela-light hover:text-pixela-accent p-2 rounded-full shadow-lg transition-all duration-300 mr-3 ml-auto',
  mobileMenu: 'fixed inset-0 bg-pixela-dark/95 backdrop-blur-lg z-50 flex flex-col justify-center items-start p-6 sm:p-8 md:p-16 transform transition-transform duration-300',
  mobileMenuVisible: 'translate-y-0',
  mobileMenuHidden: 'translate-y-full',
  mobileCloseButton: 'absolute top-6 right-6 text-pixela-light hover:text-pixela-accent p-2',
  mobileNavContainer: 'flex flex-col items-start w-full space-y-2 sm:space-y-8 pl-2 sm:pl-6',
  mobileNavLink: 'font-outfit font-black text-5xl sm:text-4xl text-pixela-light hover:text-pixela-accent py-3 pl-4 sm:pl-8 transition-colors duration-300 text-left w-full',
  mobileWelcomeText: 'text-sm sm:text-base font-outfit text-pixela-light/60 pl-4 sm:pl-8 mb-1',
  mobileUserGreeting: 'flex flex-col items-start pl-4 sm:pl-8 mb-4',
  mobileHelloText: 'text-sm sm:text-base font-outfit text-pixela-light/70 mb-1',
  mobileUserName: 'text-2xl sm:text-3xl font-outfit font-bold text-pixela-accent bg-gradient-to-r from-pixela-accent to-pink-400 bg-clip-text text-transparent',
  mobileUserSection: 'mt-8 sm:mt-12 flex flex-col items-start w-full space-y-4 sm:space-y-6',
  mobileUserContainer: 'flex flex-col items-start gap-4 sm:gap-5 w-full pl-2 sm:pl-6',
  mobileActionButton: 'flex items-center justify-start gap-3 text-pixela-light hover:text-pixela-accent transition-colors duration-300 py-2 sm:py-3 pl-4 sm:pl-8 rounded-lg hover:bg-pixela-accent/5 w-full border border-pixela-accent/10 hover:border-pixela-accent/30',
  mobileActionText: 'text-lg sm:text-xl font-outfit',
} as const;

/**
 * Componente de botón de acción para el menú móvil
 */
const MobileActionButton = ({ 
  onClick, 
  icon: Icon, 
  label, 
  userName = '' 
}: { 
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void, 
  icon: React.ElementType, 
  label: string, 
  userName?: string 
}) => (
  <button 
    onClick={onClick} 
    className={STYLES.mobileActionButton}
  >
    {userName ? (
      <>
        <span className={STYLES.mobileActionText}>{userName}</span>
        <span className="text-pixela-light/40">|</span>
        <Icon className="w-6 h-6" />
      </>
    ) : (
      <>
        <Icon className="w-6 h-6" />
        <span className={STYLES.mobileActionText}>{label}</span>
      </>
    )}
  </button>
);

/**
 * Componente de barra de navegación principal
 * @returns {JSX.Element} Componente de barra de navegación
 */
export const Navbar = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const logout = useAuthStore((s) => s.logout);
  const checkAuth = useAuthStore((s) => s.checkAuth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { navigateToSection, navigateToTop } = useSectionNavigation();

  // Verificar estado de autenticación al cargar
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  // Prefetch de rutas críticas al montar el componente
  useEffect(() => {
    router.prefetch('/');
    router.prefetch('/profile');
    router.prefetch('/categories');
  }, [router]);

  // Manejar overflow del body cuando el menú móvil está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Memoizar el nombre del usuario para evitar re-renders innecesarios
  const userDisplayName = useMemo(() => {
    if (!user) return '';
    return user.name || user.email?.split('@')[0] || '';
  }, [user]);

  const handleProfile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isAuthenticated && user) {
      router.push('/profile');
      setMobileMenuOpen(false);
    } else {
      window.location.href = `https://pixela.onrender.com/login`;
    }
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    // Marcar inmediatamente que estamos haciendo logout
    localStorage.setItem('forceLogout', 'true');
    setMobileMenuOpen(false);
    
    // Usar router.push optimizado para navegación
    router.push('/');
    
    // Limpiar forceLogout después de la navegación
    setTimeout(() => {
      localStorage.removeItem('forceLogout');
    }, 1000);
    
    // Hacer logout en background
    try {
      await logout();
    } catch (error) {
      console.error('Error durante el logout:', error);
      // No importa si falla, ya redirigimos
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Si estamos en la página principal y el enlace es a la página principal (inicio)
    if (href === "/") {
      e.preventDefault();
      // Usar la función navigateToTop del hook
      navigateToTop(closeMobileMenu);
      return;
    }
    
    if (href.startsWith('/#')) {
      e.preventDefault();
      const sectionId = href.replace('/#', '');
      navigateToSection(sectionId, closeMobileMenu);
    } else {
      closeMobileMenu();
    }
  };

  return (
    <>
      <nav className={STYLES.nav} role="navigation">
        <div className={STYLES.container}>
          {/* Prefetch en el logo para navegación al inicio */}
          <Link href="/" className={STYLES.logo} prefetch={true}>
            <h1 className={STYLES.logoText}>Pixela</h1>
          </Link>
          
          <div className={STYLES.navLinks}>
            <div className={STYLES.navLinksContainer}>
              {mainNavLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={STYLES.navLink}
                  aria-label={link.label}
                  onClick={(e) => handleNavClick(e, link.href)}
                  prefetch={true} // Prefetch para todos los links
                >
                  {link.label}
                  <span className={STYLES.navLinkUnderline} />
                </Link>
              ))}
            </div>
          </div>
          
          <div className={STYLES.userSection}>
            {isAuthenticated && user ? (
              <div className={STYLES.userContainer}>
                <span className={STYLES.userName}>{userDisplayName}</span>
                <div className={STYLES.divider} />
                <button 
                  onClick={handleProfile}
                  className={STYLES.button}
                  aria-label="Ver perfil"
                >
                  <FiUser className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleLogout}
                  className={STYLES.button}
                  aria-label="Cerrar sesión"
                  disabled={isLoading}
                >
                  <MdLogout className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={handleProfile}
                className={STYLES.button}
                aria-label="Iniciar sesión"
              >
                <FiUser className="w-5 h-5" />
              </button>
            )}
          </div>
          
          <button 
            className={STYLES.mobileMenuButton} 
            onClick={toggleMobileMenu}
            aria-label="Abrir menú"
          >
            <RxHamburgerMenu className="w-6 h-6" />
          </button>
        </div>
      </nav>
      
      <div className={`${STYLES.mobileMenu} ${mobileMenuOpen ? STYLES.mobileMenuVisible : STYLES.mobileMenuHidden}`}>
        <button 
          className={STYLES.mobileCloseButton} 
          onClick={closeMobileMenu}
          aria-label="Cerrar menú"
        >
          <FiX className="w-8 h-8" />
        </button>

        {/* Enlaces de navegación para móvil */}
        <div className={STYLES.mobileNavContainer}>
          {mainNavLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={STYLES.mobileNavLink}
              onClick={(e) => handleNavClick(e, link.href)}
              prefetch={true} // Prefetch también en móvil
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Sección de usuario para móvil */}
        <div className={STYLES.mobileUserSection}>
          <div className={STYLES.mobileUserContainer}>
            {isAuthenticated && user && (
              <>
                <MobileActionButton
                  onClick={handleProfile}
                  icon={FiUser}
                  label="Perfil"
                  userName={userDisplayName}
                />
              </>
            )}
            {!isAuthenticated && (
              <MobileActionButton
                onClick={handleProfile}
                icon={FiUser}
                label="Iniciar sesión"
              />
            )}
            
            {isAuthenticated && !isLoading && (
              <MobileActionButton
                onClick={handleLogout}
                icon={MdLogout}
                label="Cerrar sesión"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
