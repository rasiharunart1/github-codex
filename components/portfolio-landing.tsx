'use client';

import { useEffect, useRef, useState } from 'react';

type Project = {
  title: string;
  description: string;
  tech: string[];
  icon: string;
};

const projects: Project[] = [
  { title: 'Cobox Smart Locker', description: 'Solar powered smart locker with IoT control and delivery camera monitoring.', tech: ['IoT', 'Solar', 'Microcontroller', 'Camera'], icon: 'DB' },
  { title: 'Withink IoT Platform', description: 'IoT monitoring system with relay control and sensor dashboard.', tech: ['ESP32', 'Laravel', 'API'], icon: 'WF' },
  { title: 'Fish Egg Detection AI', description: 'Computer vision system to detect and count fish eggs using YOLO.', tech: ['Python', 'YOLO', 'OpenCV', 'Raspberry Pi'], icon: 'AI' },
  { title: 'Energy Monitoring System', description: 'Multi battery monitoring system using voltage divider and PZEM sensor.', tech: ['Arduino', 'PZEM004T', 'C++'], icon: 'PW' },
  { title: 'Heated Belt Controller', description: 'Temperature controller using hysteresis algorithm with IoT monitoring.', tech: ['ESP32', 'IoT', 'C++'], icon: 'TM' },
  { title: 'Heated Pillow System', description: 'Smart heated pillow with remote temperature monitoring via Ubidots.', tech: ['ESP32', 'Ubidots', 'Cloud'], icon: 'CP' },
  { title: 'Solvia Machine Controller', description: 'IoT controller for palm sugar sieve machine using load cell monitoring.', tech: ['ESP32', 'Load Cell', 'Next.js'], icon: 'LC' },
  { title: 'Noisemon Smart Noise Monitor', description: 'Noise monitoring system using FFT audio analysis with ESP32 I2S microphone.', tech: ['ESP32', 'FFT', 'MQTT', 'Laravel'], icon: 'NS' }
];

const skills = [
  { category: 'Embedded Systems', items: ['C/C++', 'ESP32', 'Arduino', 'Raspberry Pi', 'RTOS', 'MicroPython'] },
  { category: 'IoT & Cloud', items: ['MQTT', 'HTTP/REST', 'Ubidots', 'Firebase', 'AWS IoT'] },
  { category: 'AI & Vision', items: ['Python', 'OpenCV', 'YOLO', 'TensorFlow Lite', 'Edge AI'] },
  { category: 'Web Tech', items: ['Next.js', 'React', 'Tailwind CSS', 'Laravel', 'Node.js'] }
];

function RevealOnScroll({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'} ${className}`}>
      {children}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: -100, y: -100, opacity: 0 });

  return (
    <div
      ref={cardRef}
      onMouseMove={(e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        setRotate({ x: ((y - centerY) / centerY) * -10, y: ((x - centerX) / centerX) * 10 });
        setGlow({ x, y, opacity: 1 });
      }}
      onMouseLeave={() => {
        setRotate({ x: 0, y: 0 });
        setGlow((prev) => ({ ...prev, opacity: 0 }));
      }}
      style={{ transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`, transition: 'transform 0.1s ease-out', ['--mouse-x' as string]: `${glow.x}px`, ['--mouse-y' as string]: `${glow.y}px` }}
      className="card-glow-wrapper relative flex h-full flex-col rounded-2xl border border-slate-700/50 bg-slate-900/50 p-6 backdrop-blur-sm transition-colors hover:border-cyan-500/30"
    >
      <div className="pointer-events-none absolute inset-0 z-0 rounded-2xl transition-opacity duration-300" style={{ background: `radial-gradient(800px circle at ${glow.x}px ${glow.y}px, rgba(34, 211, 238, 0.15), transparent 40%)`, opacity: glow.opacity }} />
      <div className="relative z-10 flex flex-1 flex-col">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 font-mono text-xs text-cyan-300">{project.icon}</div>
        <h3 className="mb-2 text-xl font-bold text-slate-100">{project.title}</h3>
        <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-400">{project.description}</p>
        <div className="mt-auto flex flex-wrap gap-2">
          {project.tech.map((item) => <span key={item} className="rounded-md border border-slate-700/50 bg-slate-800/80 px-2.5 py-1 font-mono text-xs text-cyan-300">{item}</span>)}
        </div>
      </div>
    </div>
  );
}

export function PortfolioLanding() {
  return <div className="relative -mx-[2.5%] min-h-screen overflow-hidden bg-[#050505] text-slate-200">
    <style>{`.cyber-grid{position:fixed;top:-50%;left:-50%;width:200%;height:200%;background-image:linear-gradient(to right, rgba(34,211,238,.05) 1px, transparent 1px),linear-gradient(to bottom, rgba(34,211,238,.05) 1px, transparent 1px);background-size:50px 50px;transform:perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px);animation:gridMove 20s linear infinite;z-index:0;pointer-events:none}.cyber-grid-overlay{position:fixed;inset:0;background:radial-gradient(circle at center, transparent 0%, #050505 70%);z-index:1;pointer-events:none}@keyframes gridMove{0%{transform:perspective(500px) rotateX(60deg) translateY(0) translateZ(-200px)}100%{transform:perspective(500px) rotateX(60deg) translateY(50px) translateZ(-200px)}}`}</style>
    <div className="cyber-grid" /><div className="cyber-grid-overlay" />
    <div className="relative z-10">
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center"><RevealOnScroll className="max-w-4xl"><h1 className="mb-6 bg-gradient-to-r from-slate-100 via-cyan-100 to-cyan-500 bg-clip-text text-5xl font-extrabold text-transparent md:text-7xl">Harun Ar Rasyid</h1><h2 className="mb-8 text-xl text-slate-400 md:text-3xl">IoT Engineer × AI Computer Vision</h2><p className="mx-auto mb-12 max-w-2xl text-lg text-slate-500">Building intelligent systems bridging physical and digital worlds with embedded hardware, edge AI, and cloud dashboards.</p><div className="flex flex-col gap-4 sm:flex-row sm:justify-center"><a href="#projects" className="rounded-lg bg-cyan-500 px-8 py-3 font-semibold text-slate-900">View Architecture</a><a href="#contact" className="rounded-lg border border-slate-700 bg-slate-800 px-8 py-3">Init Connection</a></div></RevealOnScroll></section>
      <section className="px-6 py-24"><div className="mx-auto max-w-6xl"><RevealOnScroll><h2 className="mb-12 text-center font-mono text-3xl font-bold text-cyan-400">01. Tech_Stack</h2></RevealOnScroll><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">{skills.map((skillGroup, i) => <RevealOnScroll key={skillGroup.category} delay={i * 100}><div className="h-full rounded-2xl border border-slate-800 bg-slate-900/40 p-6"><h3 className="mb-4 font-mono text-lg text-slate-200">&gt; {skillGroup.category}</h3><div className="flex flex-col gap-3">{skillGroup.items.map((item) => <span key={item} className="text-sm text-slate-400">• {item}</span>)}</div></div></RevealOnScroll>)}</div></div></section>
      <section id="projects" className="px-6 py-24"><div className="mx-auto max-w-6xl"><RevealOnScroll><h2 className="mb-16 text-center font-mono text-3xl font-bold text-cyan-400">02. Deployed_Systems</h2></RevealOnScroll><div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{projects.map((project, i) => <RevealOnScroll key={project.title} delay={(i % 3) * 120}><ProjectCard project={project} /></RevealOnScroll>)}</div></div></section>
      <section id="contact" className="px-6 py-32 text-center"><RevealOnScroll className="mx-auto max-w-3xl"><h2 className="mb-6 font-mono text-4xl font-bold"><span className="text-cyan-400">03.</span> Establish_Connection</h2><p className="mb-10 text-lg text-slate-400">Open for IoT, embedded AI, and automation collaborations.</p><div className="flex flex-col gap-4 sm:flex-row sm:justify-center"><a href="mailto:harun@example.com" className="rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-4 font-mono">harun@example.com</a><a href="https://github.com/rasiharunart" target="_blank" rel="noreferrer" className="rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-4 font-mono">github.com/rasiharunart</a></div></RevealOnScroll></section>
    </div>
  </div>;
}
