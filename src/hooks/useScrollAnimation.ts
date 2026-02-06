import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type AnimationType = 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale' | 'stagger' | 'parallax' | 'reveal';

interface ScrollAnimationOptions {
  type?: AnimationType;
  duration?: number;
  delay?: number;
  staggerAmount?: number;
  scrub?: boolean | number;
  start?: string;
  end?: string;
  markers?: boolean;
}

export function useScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
) {
  const ref = useRef<T>(null);
  const {
    type = 'fadeUp',
    duration = 1,
    delay = 0,
    staggerAmount = 0.1,
    scrub = false,
    start = 'top 85%',
    end = 'bottom 20%',
  } = options;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let animation: gsap.core.Tween | gsap.core.Timeline;
    let scrollTriggerInstance: ScrollTrigger;

    const baseConfig = {
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub,
        toggleActions: 'play none none reverse',
      },
    };

    switch (type) {
      case 'fadeUp':
        gsap.set(element, { opacity: 0, y: 60 });
        animation = gsap.to(element, {
          ...baseConfig,
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
        });
        break;

      case 'fadeLeft':
        gsap.set(element, { opacity: 0, x: -80 });
        animation = gsap.to(element, {
          ...baseConfig,
          opacity: 1,
          x: 0,
          duration,
          delay,
          ease: 'power3.out',
        });
        break;

      case 'fadeRight':
        gsap.set(element, { opacity: 0, x: 80 });
        animation = gsap.to(element, {
          ...baseConfig,
          opacity: 1,
          x: 0,
          duration,
          delay,
          ease: 'power3.out',
        });
        break;

      case 'scale':
        gsap.set(element, { opacity: 0, scale: 0.8 });
        animation = gsap.to(element, {
          ...baseConfig,
          opacity: 1,
          scale: 1,
          duration,
          delay,
          ease: 'back.out(1.7)',
        });
        break;

      case 'stagger':
        const children = element.children;
        gsap.set(children, { opacity: 0, y: 40 });
        animation = gsap.to(children, {
          ...baseConfig,
          opacity: 1,
          y: 0,
          duration: duration * 0.8,
          stagger: staggerAmount,
          ease: 'power3.out',
        });
        break;

      case 'parallax':
        animation = gsap.to(element, {
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
          y: -100,
          ease: 'none',
        });
        break;

      case 'reveal':
        gsap.set(element, { clipPath: 'inset(100% 0% 0% 0%)' });
        animation = gsap.to(element, {
          ...baseConfig,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: duration * 1.2,
          delay,
          ease: 'power4.inOut',
        });
        break;
    }

    return () => {
      if (animation) animation.kill();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === element) t.kill();
      });
    };
  }, [type, duration, delay, staggerAmount, scrub, start, end]);

  return ref;
}

export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const animation = gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      y: speed * 200,
      ease: 'none',
    });

    return () => {
      animation.kill();
    };
  }, [speed]);

  return ref;
}

export function initSmoothScroll() {
  // Add smooth scrolling enhancement
  gsap.registerPlugin(ScrollTrigger);
  
  ScrollTrigger.defaults({
    toggleActions: 'play none none reverse',
  });
}
