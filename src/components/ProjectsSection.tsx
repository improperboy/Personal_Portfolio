import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'HackMate v3.0',
    subtitle: 'Hackathon Management Platform',
    description: 'A comprehensive hackathon management system with 120+ features including multi-role access, team management, sponsor showcase, and real-time analytics.',
    features: ['Multi-role System', 'Team Management', 'Live Updates (PWA)', 'Analytics Dashboard'],
    tech: ['PHP', 'MySQL', 'JavaScript', 'AJAX'],
    featured: true,
    color: 'primary',
  },
  {
    title: 'Student Portal',
    subtitle: 'Homework Submission System',
    description: 'A portal for schools where teachers upload assignments and students submit homework digitally with role-based dashboards.',
    features: ['Role-based Dashboards', 'File Upload System', 'Class Management'],
    tech: ['PHP', 'MySQL', 'Tailwind', 'Express'],
    featured: false,
    color: 'secondary',
  },
  {
    title: 'Attendance System',
    subtitle: 'School Attendance Management',
    description: 'Three-login system for admins, teachers, and students to manage and track attendance efficiently.',
    features: ['Multi-role Login', 'Same-day Updates', 'Attendance History'],
    tech: ['PHP', 'MySQL'],
    featured: false,
    color: 'primary',
  },
  {
    title: 'Feedback Manager',
    subtitle: 'Dynamic Feedback Platform',
    description: 'Comprehensive feedback platform with authentication, dashboards, filtering, and embeddable widget system.',
    features: ['CSV Export/Import', 'Embeddable Widgets', 'Pagination & Filtering'],
    tech: ['PHP', 'MySQL', 'AJAX'],
    featured: false,
    color: 'secondary',
  },
  {
    title: 'Afforestation Planner',
    subtitle: 'Sustainability Project',
    description: 'Tech-based solution for identifying ideal afforestation areas based on soil type, AQI, and environmental factors.',
    features: ['Environmental Analysis', 'Data Visualization', 'NGO Integration'],
    tech: ['PHP', 'MySQL', 'Data APIs'],
    featured: false,
    color: 'primary',
  },
  {
    title: 'Hospital Management',
    subtitle: 'In Development',
    description: 'Comprehensive hospital system with patient records, doctor management, appointments, and billing.',
    features: ['Patient Records', 'Appointment Scheduling', 'Billing System'],
    tech: ['PHP', 'MySQL', 'JavaScript'],
    featured: false,
    color: 'secondary',
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <div
      className={`project-card group ${project.featured ? 'md:col-span-2 md:row-span-2' : ''}`}
    >
      {project.featured && (
        <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-mono">
          <Star size={12} fill="currentColor" />
          Featured
        </div>
      )}

      <div className="space-y-4">
        <div>
          <span className={`text-xs font-mono ${project.color === 'primary' ? 'text-primary' : 'text-secondary'}`}>
            {project.subtitle}
          </span>
          <h3 className={`text-2xl font-bold mt-1 ${project.featured ? 'md:text-3xl' : ''}`}>
            {project.title}
          </h3>
        </div>

        <p className="text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        <ul className="flex flex-wrap gap-2">
          {project.features.map((feature) => (
            <li key={feature} className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">
              {feature}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech.map((t) => (
            <span key={t} className="tech-badge text-xs">
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <a
            href="#"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Github size={16} />
            Code
          </a>
          <a
            href="#"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ExternalLink size={16} />
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation with split text effect
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

      // Project cards stagger animation with 3D effect
      const cards = gridRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { 
            opacity: 0, 
            y: 100,
            rotateX: 15,
            transformPerspective: 1000,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: {
              amount: 0.6,
              from: 'start',
            },
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background accents */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <div ref={headingRef} className="text-center mb-16">
          <span className="text-primary font-mono text-sm mb-4 block">// MY WORK</span>
          <h2 className="section-heading">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subheading mx-auto">
            Real-world solutions built with passion. From hackathon platforms to school management systems.
          </p>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
