import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = {
  backend: {
    title: 'Backend',
    items: [
      { name: 'PHP', level: 95 },
      { name: 'MySQL', level: 90 },
      { name: 'REST APIs', level: 85 },
      { name: 'Express.js', level: 70 },
      { name: 'Authentication Systems', level: 88 },
      { name: 'Database Design', level: 92 },
    ],
  },
  frontend: {
    title: 'Frontend',
    items: [
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 90 },
      { name: 'JavaScript', level: 88 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'AJAX', level: 85 },
      { name: 'EJS', level: 80 },
    ],
  },
  tools: {
    title: 'Tools & Tech',
    items: [
      { name: 'Git & GitHub', level: 88 },
      { name: 'Apache/Nginx', level: 82 },
      { name: 'VS Code', level: 95 },
      { name: 'Linux', level: 75 },
      { name: 'MySQL Workbench', level: 85 },
      { name: 'PWA', level: 78 },
    ],
  },
};

const strengths = [
  'Building multi-role management systems',
  'Designing structured databases',
  'Practical problem solving',
  'Scalable architecture thinking',
  'Product-oriented development',
  'Startup vision & execution',
];

function SkillBar({ name, level, barRef }: { name: string; level: number; barRef: (el: HTMLDivElement | null) => void }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground font-mono">{level}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
          style={{ width: 0 }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const skillCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const skillBarsRef = useRef<(HTMLDivElement | null)[]>([]);
  const strengthsRef = useRef<HTMLDivElement>(null);
  const strengthItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
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

      // Skill cards animation
      skillCardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 80, rotateY: -15 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Skill bars animation
      let barIndex = 0;
      Object.values(skills).forEach((category) => {
        category.items.forEach((skill) => {
          const bar = skillBarsRef.current[barIndex];
          if (bar) {
            gsap.to(bar, {
              width: `${skill.level}%`,
              duration: 1.2,
              delay: barIndex * 0.05,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: bar.parentElement,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
            });
          }
          barIndex++;
        });
      });

      // Strengths card animation
      gsap.fromTo(
        strengthsRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: strengthsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Strength items stagger
      strengthItemsRef.current.forEach((item, index) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: 0.3 + index * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: strengthsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  let barIndex = 0;

  return (
    <section id="skills" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-[200px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <div ref={headingRef} className="text-center mb-16">
          <span className="text-primary font-mono text-sm mb-4 block">// EXPERTISE</span>
          <h2 className="section-heading">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="section-subheading mx-auto">
            A focused skillset built through practical project experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {Object.entries(skills).map(([key, category], categoryIndex) => (
            <div
              key={key}
              ref={(el) => (skillCardsRef.current[categoryIndex] = el)}
              className="glass-card p-6"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.items.map((skill) => {
                  const currentIndex = barIndex++;
                  return (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      barRef={(el) => (skillBarsRef.current[currentIndex] = el)}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Core Strengths */}
        <div ref={strengthsRef} className="glass-card p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Core <span className="gradient-text">Strengths</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {strengths.map((strength, index) => (
              <div
                key={strength}
                ref={(el) => (strengthItemsRef.current[index] = el)}
                className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                <span className="text-sm">{strength}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
