import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AboutAnimationRefs {
  sectionRef: React.RefObject<HTMLElement | null>;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  subtitleRef: React.RefObject<HTMLParagraphElement | null>;
  featuresGridRef: React.RefObject<HTMLDivElement | null>;
  teamTitleRef: React.RefObject<HTMLHeadingElement | null>;
  teamTextRef: React.RefObject<HTMLDivElement | null>;
  teamCardsRef: React.RefObject<HTMLDivElement | null>;
}

export const useAboutAnimation = ({
  sectionRef,
  titleRef,
  subtitleRef,
  featuresGridRef,
  teamTitleRef,
  teamTextRef,
  teamCardsRef,
}: AboutAnimationRefs) => {
  useEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const featuresGrid = featuresGridRef.current;
    const teamTitle = teamTitleRef.current;
    const teamTextContainer = teamTextRef.current;
    const teamCardsContainer = teamCardsRef.current;

    let tl1: gsap.core.Timeline | undefined;
    let tl2: gsap.core.Timeline | undefined;

    if (title && subtitle && featuresGrid) {
      const featureCards = gsap.utils.toArray(featuresGrid.children);
      const firstGroupElements = [title, subtitle, ...featureCards];
      
      gsap.set(firstGroupElements, { autoAlpha: 0, y: 20 });

      tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onComplete: () => {
          gsap.to(featureCards, {
            y: -8,
            duration: 4,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            stagger: 0.3
          });
        }
      });

      tl1.to(title, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' })
         .to(subtitle, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' }, "-=0.4")
         .to(featureCards, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.15 }, "-=0.4");
    }

    if (teamTitle && teamTextContainer && teamCardsContainer) {
      const teamTextElements = gsap.utils.toArray(teamTextContainer.children);
      const teamMemberCards = gsap.utils.toArray(teamCardsContainer.children);
      const secondGroupElements = [teamTitle, ...teamTextElements, ...teamMemberCards];

      gsap.set(secondGroupElements, { autoAlpha: 0, y: 20 });
      
      tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: teamTitle,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onComplete: () => {
          gsap.to(teamMemberCards, {
            y: -8,
            duration: 4,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            stagger: 0.3
          });
        }
      });

      tl2.to(teamTitle, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' })
         .to(teamTextElements, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' }, "-=0.4")
         .to(teamMemberCards, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, "-=0.4");
    }

    return () => {
      if (tl1) tl1.kill();
      if (tl2) tl2.kill();
      gsap.killTweensOf(gsap.utils.toArray(featuresGridRef.current?.children || []));
      gsap.killTweensOf(gsap.utils.toArray(teamCardsRef.current?.children || []));
    }

  }, [sectionRef, titleRef, subtitleRef, featuresGridRef, teamTitleRef, teamTextRef, teamCardsRef]);
}; 