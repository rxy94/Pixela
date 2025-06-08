'use client';

import { useState, useRef } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useCategoriesStore } from '@/features/categories/store/categoriesStore';
import { useDiscoverAnimation } from '../../hooks/useDiscoverAnimation';
import { DiscoverSelector } from '../ui/DiscoverSelector';
import { IoIosArrowForward } from 'react-icons/io';
import Link from 'next/link';
import { DiscoverGrid } from '../layout/DiscoverGrid';
import { headings } from '../../content/headings';

const STYLES = {
    container: "relative w-full bg-pixela-dark flex flex-col justify-center overflow-hidden",
    gradientContainer: "absolute inset-0 w-full h-full z-0 pointer-events-none",

    mainGradient: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] lg:w-[80vw] lg:h-[80vw] lg:left-[75%] rounded-full",
    secondaryGradient: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] lg:w-[60vw] lg:h-[60vw] lg:left-[75%] rounded-full",

    desktopContainer: "min-h-screen mt-8",
    desktopContent: "w-[90%] xl:w-[85%] mx-auto flex flex-row items-center gap-16",
    desktopLeftSection: "w-5/12 text-left",
    desktopRightSection: "w-7/12",
    desktopActions: "flex flex-row items-center justify-start gap-8 mt-10",
    desktopDivider: "absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-px h-64 bg-gradient-to-b from-transparent via-pixela-accent/30 to-transparent blur-sm",

    mobileContainer: "flex-col items-stretch gap-8 px-4 py-12",

    discoverLabel: "text-lg font-semibold text-pixela-accent uppercase tracking-widest mb-4",
    mainHeadingDesktop: "text-6xl font-black text-white leading-tight mb-8",
    mainHeadingMobile: "text-6xl font-black text-pixela-accent font-outfit tracking-tighter uppercase leading-none text-left",
    description: "text-pixela-light/80 text-base max-w-full text-left",
    descriptionDesktop: "mb-8 mx-0 lg:max-w-xl",
    descriptionMobile: "py-8",
    accentText: "text-pixela-light font-semibold",

    exploreButton: "group bg-gradient-to-r from-pixela-accent to-pixela-accent/80 text-pixela-dark px-8 py-3 rounded-full font-bold text-base transition-all duration-300 hover:shadow-xl hover:shadow-pixela-accent/30 relative overflow-hidden transform hover:-translate-y-px hover:scale-[1.02]",
    buttonContent: "relative z-10 flex items-center justify-center",
    buttonIcon: "w-4 h-4 ml-2 transition-transform duration-300",
    buttonIconHover: "group-hover:translate-x-1",
    buttonHoverEffect: "absolute inset-0 bg-white/20 w-0 group-hover:w-full transition-all duration-300",
} as const;

type DiscoverMediaType = 'serie' | 'pelicula';

export const DiscoverContent = () => {
    const isMobile = useMediaQuery('(max-width: 1023px)');
    const [activeType, setActiveType] = useState<DiscoverMediaType>('serie');
    const [heading] = useState(() => headings[Math.floor(Math.random() * headings.length)]);
    
    const setSelectedMediaType = useCategoriesStore((state) => state.setSelectedMediaType);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const leftSectionRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useDiscoverAnimation({
        containerRef,
        leftSectionRef,
        gridRef,
    });

    const handleExploreClick = () => {
        if (activeType === 'serie') {
            setSelectedMediaType('series');
        } else {
            setSelectedMediaType('movies');
        }
    };

    const descriptionContent = (
        <div className={`${STYLES.description} ${isMobile ? STYLES.descriptionMobile : STYLES.descriptionDesktop}`}>
            <p>
                Explora un catálogo seleccionado para <span className={STYLES.accentText}>cautivar</span> tus sentidos y sumérgete en narrativas inolvidables que despiertan tu <span className={STYLES.accentText}>imaginación</span>.
            </p>
            <p className="mt-4">
                Ya sea que busques emoción, misterio o inspiración, aquí empieza tu próximo viaje cinematográfico.
            </p>
        </div>
    );

    return (
        <div className={`${STYLES.container} ${isMobile ? STYLES.mobileContainer : STYLES.desktopContainer}`}>
            {/* --- Degradado de Fondo para ESCRITORIO --- */}
            {!isMobile && (
                <div 
                    className={STYLES.gradientContainer}
                    style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)' }}
                >
                    <div 
                        className={STYLES.mainGradient}
                        style={{ backgroundImage: 'radial-gradient(circle, rgba(236, 27, 105, 0.15) 0%, transparent 80%)' }} 
                    />
                    <div 
                        className={STYLES.secondaryGradient}
                        style={{ backgroundImage: 'radial-gradient(circle, rgba(236, 27, 105, 0.20) 0%, transparent 75%)' }}
                    />
                </div>
            )}
            
            {/* --- Contenido para MÓVIL --- */}
            {isMobile && (
                <>
                    <h2 className={STYLES.mainHeadingMobile}>
                        DES-<br />CUBRE
                    </h2>
                    {descriptionContent}
                    <DiscoverSelector 
                        activeType={activeType}
                        onTypeChange={setActiveType}
                    />
                    <DiscoverGrid type={activeType} />
                    <Link 
                        href="/categories" 
                        className={`${STYLES.exploreButton} w-full`}
                        onClick={handleExploreClick}
                    >
                        <span className={STYLES.buttonContent}>
                            Explorar catálogo
                            <IoIosArrowForward className={STYLES.buttonIcon} />
                        </span>
                    </Link>
                </>
            )}

            {/* --- Contenido para ESCRITORIO --- */}
            {!isMobile && (
                <div ref={containerRef} className={STYLES.desktopContent}>
                    <div ref={leftSectionRef} className={STYLES.desktopLeftSection}>
                        <p className={STYLES.discoverLabel}>DESCUBRE</p>
                        <h2 className={STYLES.mainHeadingDesktop}>
                            {heading.map((line, index) => (
                                <span key={index} className="block">
                                    {line}
                                </span>
                            ))}
                        </h2>
                        {descriptionContent}
                        <div className={STYLES.desktopActions}>
                            <DiscoverSelector 
                                activeType={activeType}
                                onTypeChange={setActiveType}
                            />
                            <Link 
                                href="/categories" 
                                className={`${STYLES.exploreButton} w-auto`}
                                onClick={handleExploreClick}
                            >
                                <span className={STYLES.buttonContent}>
                                    Explorar catálogo
                                    <IoIosArrowForward className={`${STYLES.buttonIcon} ${STYLES.buttonIconHover}`} />
                                </span>
                                <span className={STYLES.buttonHoverEffect} />
                            </Link>
                        </div>
                    </div>
                    
                    <div className={STYLES.desktopDivider} />
                    
                    <div ref={gridRef} className={STYLES.desktopRightSection}>
                        <DiscoverGrid type={activeType} />
                    </div>
                </div>
            )}
        </div>
    );
};  