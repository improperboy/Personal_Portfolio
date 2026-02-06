import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Database, Rocket, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  {
    icon: Code2,
    title: 'Full-Stack Developer',
    description: 'Strong backend expertise in PHP and MySQL with modern frontend skills',
  },
  {
    icon: Database,
    title: 'Database Design',
    description: 'Structured databases with 20+ tables for complex management systems',
  },
  {
    icon: Users,
    title: 'Multi-Role Systems',
    description: 'Building platforms for admins, mentors, teachers, and users',
  },
  {
    icon: Rocket,
    title: 'Startup Vision',
    description: 'Founder of Dulify - affordable digital transformation solutions',
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Left column slide in
      gsap.fromTo(
        leftColRef.current,
        { opacity: 0, x: -80 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: leftColRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Right column cards stagger
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: rightColRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-6">
        <div ref={headingRef} className="text-center mb-16">
          <span className="text-primary font-mono text-sm mb-4 block">// ABOUT ME</span>
          <h2 className="section-heading">
            Turning Ideas Into <span className="gradient-text">Reality</span>
          </h2>
          <p className="section-subheading mx-auto">
            I focus on building real-world, scalable systems that make a difference.
            From hackathon platforms to school management systems, I create practical solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Bio */}
          <div ref={leftColRef} className="space-y-6">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Who I Am
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I am a full-stack web developer with strong backend expertise in PHP and MySQL. 
                My goal is to create practical and impactful digital solutions that solve real problems.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Currently working on advanced multi-role platforms, management systems, 
                and startup-oriented web products. I believe in building products that users love.
              </p>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                Current Focus
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Advanced backend system design
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Security improvements in web applications
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Building scalable SaaS-style platforms
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Converting projects into real businesses
                </li>
              </ul>
            </div>
          </div>

          {/* Right - Highlights Grid */}
          <div ref={rightColRef} className="grid grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => (cardsRef.current[index] = el)}
                className="glass-card p-6 group hover:scale-105 transition-transform duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-bold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
