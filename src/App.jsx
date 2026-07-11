import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  Briefcase, 
  GraduationCap, 
  ArrowUpRight, 
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

const Github = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" rx="1" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

gsap.registerPlugin(ScrollTrigger);

// Custom Skill Card with animated percentage and SVG circular indicator
const SkillCard = ({ name, targetPercent, index }) => {
  const [percent, setPercent] = useState(0);
  const cardRef = useRef(null);
  const circleRef = useRef(null);
  
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      
      // Animate percentage text
      gsap.to(obj, {
        val: targetPercent,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          setPercent(Math.round(obj.val));
        }
      });

      // Animate SVG circle strokeDashoffset
      if (circleRef.current) {
        const strokeOffset = circumference - (targetPercent / 100) * circumference;
        gsap.fromTo(circleRef.current, 
          { strokeDashoffset: circumference },
          {
            strokeDashoffset: strokeOffset,
            duration: 2.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        );
      }
    }, cardRef);

    return () => ctx.revert();
  }, [targetPercent, circumference]);

  return (
    <div 
      ref={cardRef} 
      className="bg-[#121225] border border-accent/15 rounded-[2rem] p-6 flex flex-col items-center justify-between glow-card hover:border-accent/40 transition-all duration-300"
    >
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Animated circular SVG */}
        <svg className="w-full h-full transform -rotate-90">
          <circle 
            cx="48" 
            cy="48" 
            r={radius} 
            className="stroke-accent/10 fill-none" 
            strokeWidth="6"
          />
          <circle 
            ref={circleRef}
            cx="48" 
            cy="48" 
            r={radius} 
            className="stroke-accent fill-none circular-progress" 
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-xl font-mono font-bold text-accent glow-accent">{percent}%</span>
      </div>
      
      <div className="mt-4 text-center">
        <h4 className="text-base font-bold text-[#F0EFF4] tracking-wide font-sans">{name}</h4>
        <span className="text-xs text-[#F0EFF4]/50 font-mono mt-1 block">Niveau Maîtrise</span>
      </div>
    </div>
  );
};

// Experience Card for Timeline
const ExperienceCard = ({ period, role, company, desc, align, index }) => {
  const cardRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline Card slide in animation
      gsap.fromTo(cardRef.current,
        { 
          opacity: 0, 
          x: align === 'left' ? -50 : 50 
        },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Dot pulsing animation when it comes into view
      if (dotRef.current) {
        gsap.fromTo(dotRef.current,
          { scale: 1, boxShadow: '0 0 0 0 rgba(212, 168, 67, 0.7)' },
          {
            scale: 1.2,
            boxShadow: '0 0 0 10px rgba(212, 168, 67, 0)',
            repeat: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: dotRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        );
      }
    }, cardRef);

    return () => ctx.revert();
  }, [align]);

  return (
    <div className={`relative flex flex-col md:flex-row items-center justify-between w-full mb-12 ${align === 'left' ? 'md:flex-row-reverse' : ''}`}>
      {/* Spacer to push card to side */}
      <div className="hidden md:block w-5/12"></div>
      
      {/* Dot on the timeline */}
      <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10">
        <div 
          ref={dotRef}
          className="w-4 h-4 rounded-full bg-accent border-2 border-[#0A0A14] shadow-[0_0_10px_rgba(212,168,67,0.8)]"
        />
      </div>

      {/* The actual Card */}
      <div 
        ref={cardRef} 
        className="w-full md:w-5/12 ml-10 md:ml-0 bg-[#121225] border border-accent/10 hover:border-accent/30 rounded-[2rem] p-8 shadow-xl glow-card transform hover:scale-[1.01] transition-all duration-300"
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-mono mb-4 tracking-wider">
          {period}
        </span>
        <h3 className="text-xl font-bold text-[#F0EFF4] font-sans">{role}</h3>
        <span className="text-sm text-[#F0EFF4]/60 font-medium block mt-1">{company}</span>
        <p className="text-sm text-[#F0EFF4]/85 leading-relaxed mt-4">
          {desc}
        </p>
      </div>
    </div>
  );
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const formationRef = useRef(null);
  const contactRef = useRef(null);

  // IntersectionObserver for Navbar transition
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero stagger fade-up
      const tl = gsap.timeline();
      tl.fromTo('.hero-animate', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', stagger: 0.12 }
      );

      // About section scroll animations
      gsap.fromTo('.about-title',
        { opacity: 0, x: -30 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo('.about-text',
        { opacity: 0, x: 30 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 1.2, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%',
          }
        }
      );

      // Skills section title
      gsap.fromTo('.skills-header',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.skills-section',
            start: 'top 85%',
          }
        }
      );

      // Formation stagger scroll
      gsap.fromTo('.formation-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.formation-section',
            start: 'top 80%',
          }
        }
      );

      // Contact social icons stagger
      gsap.fromTo('.contact-item',
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 85%',
          }
        }
      );

    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A14] text-[#F0EFF4] relative overflow-hidden select-none">
      {/* Global Noise Overlay */}
      <div className="noise-overlay" />

      {/* A. NAVBAR — La Signature Flottante */}
      <nav className={`fixed left-1/2 transform -translate-x-1/2 top-6 z-50 transition-all duration-500 w-[90%] max-w-4xl rounded-full ${
        scrolled 
          ? 'glass py-3 px-6 md:px-8 shadow-2xl border-accent/25' 
          : 'bg-transparent py-5 px-6'
      }`}>
        <div className="flex items-center justify-between">
          {/* Logo / Initials */}
          <a href="#hero" className="font-mono text-lg font-extrabold tracking-widest text-[#F0EFF4] hover:text-accent transition-colors duration-300">
            KT<span className="text-accent">.</span>
          </a>

          {/* Navigation Links */}
          <div className="hidden sm:flex items-center gap-8 text-sm font-medium">
            <a href="#about" className="text-[#F0EFF4]/70 hover:text-accent transition-colors duration-300 lift-hover">À propos</a>
            <a href="#experience" className="text-[#F0EFF4]/70 hover:text-accent transition-colors duration-300 lift-hover">Expérience</a>
            <a href="#skills" className="text-[#F0EFF4]/70 hover:text-accent transition-colors duration-300 lift-hover">Compétences</a>
            <a href="#contact" className="text-[#F0EFF4]/70 hover:text-accent transition-colors duration-300 lift-hover">Contact</a>
          </div>

          {/* CTA Download Resume */}
          <a 
            href="/placeholder.pdf" 
            download 
            className="px-5 py-2.5 rounded-full bg-accent hover:bg-accent/90 text-[#0A0A14] font-semibold text-xs md:text-sm tracking-wider uppercase font-sans flex items-center gap-2 shadow-[0_0_15px_rgba(212,168,67,0.4)] magnetic-btn"
          >
            <Download size={14} />
            <span className="hidden xs:inline">Mon CV</span>
          </a>
        </div>
      </nav>

      {/* B. SECTION HERO — La Première Impression */}
      <section 
        id="hero" 
        ref={heroRef}
        className="min-h-screen flex flex-col justify-center items-center px-6 relative z-10 bg-radial-gradient"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,168,67,0.08)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="flex flex-col items-center text-center max-w-4xl">
          {/* Profile Picture Placeholder */}
          <div className="hero-animate mb-8 relative">
            <div className="w-32 h-32 md:w-36 md:h-36 rounded-full border-2 border-accent/70 flex items-center justify-center bg-[#14142B] text-accent text-3xl font-mono font-bold shadow-[0_0_30px_rgba(212,168,67,0.25)] relative z-10">
              KT
            </div>
            {/* Glowing ring */}
            <div className="absolute inset-0 rounded-full bg-accent/20 blur-xl scale-95 -z-10 animate-pulse-slow"></div>
          </div>

          {/* Name & Title */}
          <h1 className="hero-animate text-5xl md:text-8xl font-black tracking-tighter text-[#F0EFF4] font-sans">
            Kekeli <span className="text-accent glow-accent">Tengue</span>
          </h1>
          <p className="hero-animate text-2xl md:text-4xl font-serif italic text-[#F0EFF4]/70 mt-4">
            Analyste TI & Gestion de Projets
          </p>

          {/* 3 Stats in Monospace */}
          <div className="hero-animate flex flex-wrap justify-center items-center gap-4 md:gap-8 mt-10 text-xs md:text-sm font-mono text-[#F0EFF4]/60 border-y border-[#F0EFF4]/10 py-4 w-full max-w-2xl">
            <span>[5+ ANS D'EXPÉRIENCE]</span>
            <span className="hidden md:inline text-accent/50">•</span>
            <span>[20+ PROJETS LIVRÉS]</span>
            <span className="hidden md:inline text-accent/50">•</span>
            <span>[MONTRÉAL, QC]</span>
          </div>

          {/* CTAs */}
          <div className="hero-animate flex flex-wrap gap-4 justify-center mt-12">
            <a 
              href="/placeholder.pdf" 
              download 
              className="px-8 py-4 rounded-full bg-accent text-[#0A0A14] font-bold text-sm tracking-wider uppercase flex items-center gap-2 shadow-[0_0_20px_rgba(212,168,67,0.4)] magnetic-btn"
            >
              <Download size={16} />
              Télécharger CV
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 rounded-full border border-accent/50 hover:border-accent text-accent hover:bg-accent/5 font-bold text-sm tracking-wider uppercase transition-colors duration-300 magnetic-btn"
            >
              Me contacter
            </a>
          </div>
        </div>
      </section>

      {/* C. A PROPOS — Le Manifeste Personnel */}
      <section 
        id="about" 
        ref={aboutRef}
        className="about-section py-24 md:py-36 px-6 md:px-12 bg-[#0C0C1E] text-[#F0EFF4] relative z-10 rounded-[3rem] md:rounded-[4rem] border-y border-accent/10"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Title on the Left */}
          <div className="about-title md:col-span-5 flex flex-col justify-center">
            <span className="text-accent text-xs font-mono font-bold tracking-widest uppercase block mb-3">Manifeste</span>
            <h2 className="text-4xl md:text-6xl font-serif italic font-normal tracking-tight text-[#F0EFF4] leading-none">
              À propos de moi
            </h2>
          </div>

          {/* Vertical line divider (visible on desktop) */}
          <div className="hidden md:block md:col-span-1 h-32 w-0.5 bg-accent/40 justify-self-center"></div>

          {/* Bio text on the Right */}
          <div className="about-text md:col-span-6">
            <p className="text-lg md:text-xl font-normal leading-relaxed text-[#F0EFF4]/90 font-sans">
              Passionné d'innovation, je conçois des solutions techniques robustes et scalables. 
              En tant qu'Analyste TI et fort d'une expérience solide, je traduis les besoins d'affaires complexes en architectures fiables tout en assurant l'alignement stratégique avec les équipes de développement.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent font-sans">
                <CheckCircle2 size={16} className="text-accent" /> Solutions Robustes
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent font-sans">
                <CheckCircle2 size={16} className="text-accent" /> Alignement Agile
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* D. EXPERIENCE — La Timeline Vivante */}
      <section 
        id="experience" 
        className="py-24 md:py-36 px-6 relative z-10"
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <span className="text-accent text-xs font-mono font-bold tracking-widest uppercase block mb-3">Parcours Professionnel</span>
            <h2 className="text-4xl md:text-6xl font-serif italic text-[#F0EFF4]">Mon Expérience</h2>
          </div>

          {/* Timeline Wrapper */}
          <div className="relative">
            {/* Center Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent/30 via-accent to-accent/30 transform md:-translate-x-1/2"></div>
            
            {/* Experience Cards */}
            <ExperienceCard 
              period="2024 - Présent"
              role="Analyste TI Senior / Product Owner"
              company="TechCorp Solutions"
              desc="Pilotage de la refonte des architectures applicatives et de la gouvernance des données. Interface privilégiée entre les métiers et les sprints de développement, garantissant des livrables de haute performance."
              align="left"
              index={0}
            />
            
            <ExperienceCard 
              period="2021 - 2024"
              role="Gestionnaire de Projets TI"
              company="Innova Systems"
              desc="Gestion du cycle de vie de projets complexes avec les méthodologies Agiles et Scrum. Coordination d'équipes pluridisciplinaires et livraison à succès de plateformes d'analyse de données d'envergure."
              align="right"
              index={1}
            />
            
            <ExperienceCard 
              period="2018 - 2021"
              role="Designer UI/UX & Analyste Fonctionnel"
              company="PixelCraft Agency"
              desc="Conception de parcours utilisateurs centrés sur l'expérience client. Création de mockups haute fidélité sous Figma et formulation de récits utilisateurs (user stories) techniques précis pour le développement C++ et Web."
              align="left"
              index={2}
            />
          </div>
        </div>
      </section>

      {/* E. COMPETENCES — Le Tableau de Bord */}
      <section 
        id="skills" 
        ref={skillsRef}
        className="skills-section py-24 md:py-36 px-6 relative z-10 bg-[#0F0F23] rounded-[3rem] md:rounded-[4rem]"
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="skills-header text-center mb-20">
            <span className="text-accent text-xs font-mono font-bold tracking-widest uppercase block mb-3">Compétences Techniques</span>
            <h2 className="text-4xl md:text-6xl font-serif italic text-[#F0EFF4]">Le Tableau de Maîtrise</h2>
            <p className="text-sm text-[#F0EFF4]/50 max-w-lg mx-auto mt-4 leading-relaxed font-sans">
              Visualisation en temps réel de mes forces et aptitudes techniques clés en ingénierie et méthodologies.
            </p>
          </div>

          {/* Grille de Maitrise (Pattern 2) */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <SkillCard name="Prototypage & UI" targetPercent={90} index={0} />
            <SkillCard name="Méthodologies Agile" targetPercent={85} index={1} />
            <SkillCard name="C++ Avancé" targetPercent={75} index={2} />
            <SkillCard name="Python / Scripting" targetPercent={80} index={3} />
            <SkillCard name="User Research" targetPercent={85} index={4} />
          </div>
        </div>
      </section>

      {/* F. FORMATION — Les Fondations */}
      <section 
        id="formation" 
        ref={formationRef}
        className="formation-section py-24 md:py-36 px-6 relative z-10"
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <span className="text-accent text-xs font-mono font-bold tracking-widest uppercase block mb-3">Cursus Académique</span>
            <h2 className="text-4xl md:text-6xl font-serif italic text-[#F0EFF4]">Formation & Diplômes</h2>
          </div>

          {/* Stacked Cards */}
          <div className="flex flex-col gap-6">
            <div className="formation-card bg-[#121225] border border-accent/10 hover:border-accent/30 rounded-[2rem] p-8 flex flex-col md:flex-row justify-between items-start md:items-center shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#F0EFF4] font-sans">Baccalauréat en informatique</h3>
                  <span className="text-sm text-[#F0EFF4]/60 block mt-0.5">Université Laval</span>
                </div>
              </div>
              <span className="mt-4 md:mt-0 font-mono text-sm px-4 py-1.5 rounded-full bg-[#181832] border border-[#2B2B4A] text-accent">
                En cours
              </span>
            </div>

            <div className="formation-card bg-[#121225] border border-accent/10 hover:border-accent/30 rounded-[2rem] p-8 flex flex-col md:flex-row justify-between items-start md:items-center shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#F0EFF4] font-sans">Certificat en informatique</h3>
                  <span className="text-sm text-[#F0EFF4]/60 block mt-0.5">Université Laval</span>
                </div>
              </div>
              <span className="mt-4 md:mt-0 font-mono text-sm px-4 py-1.5 rounded-full bg-[#181832] border border-[#2B2B4A] text-accent">
                2024
              </span>
            </div>

            <div className="formation-card bg-[#121225] border border-accent/10 hover:border-accent/30 rounded-[2rem] p-8 flex flex-col md:flex-row justify-between items-start md:items-center shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#F0EFF4] font-sans">Master en communication publique</h3>
                  <span className="text-sm text-[#F0EFF4]/60 block mt-0.5">Université Laval</span>
                </div>
              </div>
              <span className="mt-4 md:mt-0 font-mono text-sm px-4 py-1.5 rounded-full bg-[#181832] border border-[#2B2B4A] text-accent">
                2018
              </span>
            </div>

            <div className="formation-card bg-[#121225] border border-accent/10 hover:border-accent/30 rounded-[2rem] p-8 flex flex-col md:flex-row justify-between items-start md:items-center shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#F0EFF4] font-sans">Baccalauréat en infographie</h3>
                  <span className="text-sm text-[#F0EFF4]/60 block mt-0.5">Université de Lomé</span>
                </div>
              </div>
              <span className="mt-4 md:mt-0 font-mono text-sm px-4 py-1.5 rounded-full bg-[#181832] border border-[#2B2B4A] text-accent">
                2012
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* G. CONTACT — Le Pont */}
      <section 
        id="contact" 
        ref={contactRef}
        className="contact-section py-24 md:py-36 px-6 relative z-10 bg-[#0F0F23] rounded-t-[3rem] md:rounded-t-[4rem]"
      >
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-accent text-xs font-mono font-bold tracking-widest uppercase block mb-3">Entrer en Contact</span>
            <h2 className="text-4xl md:text-6xl font-serif italic text-[#F0EFF4]">Travaillons ensemble</h2>
            <p className="text-sm text-[#F0EFF4]/60 mt-4 max-w-md mx-auto leading-relaxed font-sans">
              Disponible pour des opportunités de conseil ou d'embauche permanente à Montréal ou à distance.
            </p>
          </div>

          {/* Social Links & Main Contact Button */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Social details list */}
            <div className="flex flex-col gap-6">
              <a 
                href="mailto:contact@kekelitengue.com" 
                className="contact-item p-6 rounded-[2rem] bg-[#121225] border border-accent/10 hover:border-accent/30 flex items-center gap-4 group transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-[#0A0A14] transition-all duration-300">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="text-xs text-[#F0EFF4]/50 font-mono block">EMAIL</span>
                  <span className="text-sm md:text-base font-semibold group-hover:text-accent transition-colors duration-300">contact@kekelitengue.com</span>
                </div>
              </a>

              <a 
                href="https://linkedin.com" 
                target="_blank"
                rel="noreferrer"
                className="contact-item p-6 rounded-[2rem] bg-[#121225] border border-accent/10 hover:border-accent/30 flex items-center gap-4 group transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-[#0A0A14] transition-all duration-300">
                  <Linkedin size={20} />
                </div>
                <div>
                  <span className="text-xs text-[#F0EFF4]/50 font-mono block">LINKEDIN</span>
                  <span className="text-sm md:text-base font-semibold group-hover:text-accent transition-colors duration-300">linkedin.com/in/kekeli-tengue</span>
                </div>
              </a>

              <a 
                href="https://github.com" 
                target="_blank"
                rel="noreferrer"
                className="contact-item p-6 rounded-[2rem] bg-[#121225] border border-accent/10 hover:border-accent/30 flex items-center gap-4 group transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-[#0A0A14] transition-all duration-300">
                  <Github size={20} />
                </div>
                <div>
                  <span className="text-xs text-[#F0EFF4]/50 font-mono block">GITHUB</span>
                  <span className="text-sm md:text-base font-semibold group-hover:text-accent transition-colors duration-300">github.com/kekelitengue</span>
                </div>
              </a>
            </div>

            {/* Contact Form instead of simple DM Card */}
            <div className="bg-[#121225] border border-accent/15 rounded-[2rem] p-8 md:p-10 flex flex-col justify-between h-full glow-card">
              {submitSuccess ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-6 animate-bounce">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#F0EFF4] font-sans">Message Envoyé !</h3>
                  <p className="text-sm text-[#F0EFF4]/70 leading-relaxed mt-4">
                    Merci pour votre message, Kekeli Tengue vous répondra dans les plus brefs délais.
                  </p>
                  <button 
                    onClick={() => setSubmitSuccess(false)}
                    className="mt-8 px-6 py-3 rounded-full bg-accent text-[#0A0A14] font-bold text-xs tracking-wider uppercase transition-colors duration-300 hover:bg-accent/90 magnetic-btn"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 h-full">
                  <div>
                    <h3 className="text-xl font-bold text-[#F0EFF4] font-sans">M'écrire un message</h3>
                    <p className="text-xs text-[#F0EFF4]/50 leading-relaxed mt-1">
                      Remplissez ce formulaire pour me contacter directement.
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-[#F0EFF4]/50 uppercase tracking-widest">Nom Complet</label>
                    <input 
                      type="text" 
                      name="name" 
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jean Dupont"
                      className="px-4 py-3 rounded-xl bg-[#0A0A14] border border-accent/10 focus:border-accent/40 focus:outline-none text-sm text-[#F0EFF4] transition-all duration-300 placeholder-[#F0EFF4]/20"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-[#F0EFF4]/50 uppercase tracking-widest">Adresse E-mail</label>
                    <input 
                      type="email" 
                      name="email" 
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jean.dupont@example.com"
                      className="px-4 py-3 rounded-xl bg-[#0A0A14] border border-accent/10 focus:border-accent/40 focus:outline-none text-sm text-[#F0EFF4] transition-all duration-300 placeholder-[#F0EFF4]/20"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-[#F0EFF4]/50 uppercase tracking-widest">Sujet</label>
                    <input 
                      type="text" 
                      name="subject" 
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Opportunité de projet"
                      className="px-4 py-3 rounded-xl bg-[#0A0A14] border border-accent/10 focus:border-accent/40 focus:outline-none text-sm text-[#F0EFF4] transition-all duration-300 placeholder-[#F0EFF4]/20"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-mono text-[#F0EFF4]/50 uppercase tracking-widest">Votre Message</label>
                    <textarea 
                      name="message" 
                      required
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Bonjour, je souhaiterais discuter de..."
                      className="px-4 py-3 rounded-xl bg-[#0A0A14] border border-accent/10 focus:border-accent/40 focus:outline-none text-sm text-[#F0EFF4] transition-all duration-300 placeholder-[#F0EFF4]/20 resize-none"
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="mt-2 px-6 py-4 rounded-full bg-accent text-[#0A0A14] font-bold text-center text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,168,67,0.3)] hover:bg-accent/90 disabled:opacity-50 transition-all duration-300 magnetic-btn cursor-pointer"
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* H. PIED DE PAGE */}
      <footer className="bg-[#05050B] py-12 px-6 border-t border-accent/5 rounded-t-[3rem] md:rounded-t-[4rem] relative z-10 text-center flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="text-sm font-semibold tracking-wider font-sans">Kekeli Tengue</span>
          <span className="text-xs text-[#F0EFF4]/40 font-mono">© 2026 Kekeli Tengue. Tous droits réservés.</span>
        </div>
        
        {/* Status Indicator "En ligne" */}
        <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/25 px-4 py-2 rounded-full mt-6 md:mt-0">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] md:text-xs font-mono text-emerald-400 tracking-widest uppercase">Disponible / En ligne</span>
        </div>
      </footer>
    </div>
  );
}
