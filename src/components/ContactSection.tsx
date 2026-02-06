import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const startupCardRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

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

      // Left column slide in with rotation
      gsap.fromTo(
        leftColRef.current,
        { opacity: 0, x: -100, rotateY: 10 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: leftColRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Form slide in from right
      gsap.fromTo(
        formRef.current,
        { opacity: 0, x: 100, rotateY: -10 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Startup card special reveal
      gsap.fromTo(
        startupCardRef.current,
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: 0.4,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: startupCardRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6">
        <div ref={headingRef} className="text-center mb-16">
          <span className="text-primary font-mono text-sm mb-4 block">// GET IN TOUCH</span>
          <h2 className="section-heading">
            Let's Work <span className="gradient-text">Together</span>
          </h2>
          <p className="section-subheading mx-auto">
            Have a project in mind? Let's build something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div ref={leftColRef} className="space-y-8" style={{ transformStyle: 'preserve-3d' }}>
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-6">Contact Info</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">ansh@example.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">India</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">Connect with me</p>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:scale-110 transition-all"
                    >
                      <social.icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Startup Card */}
            <div ref={startupCardRef} className="glass-card p-6 glow-border">
              <span className="text-primary font-mono text-xs mb-2 block">STARTUP</span>
              <h4 className="text-xl font-bold mb-2">Dulify</h4>
              <p className="text-sm text-muted-foreground">
                Building dynamic web applications for schools, local businesses, 
                and e-commerce stores. Affordable digital transformation solutions.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass-card p-8 space-y-6"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
                placeholder="Tell me about your project..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Send Message
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
