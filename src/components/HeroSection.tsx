import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

export default function HeroSection() {
  const textRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const chars = textRef.current.innerText.split('');
    textRef.current.innerHTML = chars
      .map((char) => `<span class="inline-block opacity-0">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('');

    const tl = gsap.timeline({ delay: 0.3 });

    // Name letter animation
    tl.to(textRef.current.children, {
      opacity: 1,
      y: 0,
      stagger: 0.04,
      duration: 0.6,
      ease: 'power3.out',
    });

    // Subtitle animation
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.3'
    );

    // Description animation
    tl.fromTo(
      descRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    );

    // Buttons animation
    tl.fromTo(
      buttonsRef.current?.children || [],
      { opacity: 0, y: 20, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.15,
        duration: 0.5,
        ease: 'back.out(1.7)'
      },
      '-=0.3'
    );

    // Social links animation
    tl.fromTo(
      socialsRef.current?.children || [],
      { opacity: 0, y: 20, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.1,
        duration: 0.4,
        ease: 'back.out(1.4)'
      },
      '-=0.2'
    );

    return () => {
      tl.kill();
    };
  }, []);

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: '#contact', label: 'Email' },
  ];

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 rounded-full glass-card text-sm font-mono text-primary">
              👋 Hello, I'm
            </span>
          </motion.div>

          {/* Name */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span ref={textRef} className="gradient-text glow-text transition-all duration-300 hover:scale-105 hover:bg-primary/20 hover:px-8 hover:py-2 hover:rounded-2xl cursor-pointer inline-block">
              Divyanshu Gupta
            </span>
          </h1>

          {/* Title with typing effect */}
          <h2
            ref={subtitleRef}
            className="text-xl md:text-2xl lg:text-3xl font-medium text-muted-foreground mb-8 opacity-0"
          >
            <span className="text-foreground">Full-Stack Developer</span>
            <span className="mx-3 text-primary">•</span>
            <span>Backend Specialist</span>
            <span className="mx-3 text-primary">•</span>
            <span>Startup Builder</span>
          </h2>

          {/* Description */}
          <p
            ref={descRef}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0"
          >
            Building real-world, scalable systems for schools, organizations, and startups.
            Creating practical and impactful digital solutions that solve real problems.
          </p>

          {/* CTA Buttons */}
          <div ref={buttonsRef} className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a
              href="#projects"
              className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg transition-all hover:shadow-lg hover:shadow-primary/30 hover:scale-105 hover:-translate-y-1 glow-box"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-full glass-card font-semibold text-lg transition-all hover:bg-muted/50 hover:scale-105 hover:-translate-y-1 glow-border"
            >
              Get In Touch
            </a>
          </div>

          {/* Social Links */}
          <div ref={socialsRef} className="flex items-center justify-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="p-3 rounded-full glass-card text-muted-foreground hover:text-primary hover:scale-110 hover:-translate-y-1 transition-all"
              >
                <social.icon size={24} />
              </a>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="text-sm font-mono">Scroll Down</span>
            <ArrowDown size={20} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
