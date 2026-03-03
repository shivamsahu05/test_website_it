"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: string;
  y: string;
  delay: number;
}

interface TechIcon {
  name: string;
  x: string;
  y: string;
}

export default function Hero() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Generate particles only on client to avoid SSR mismatch
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
    setMounted(true);
  }, []);

  const techIcons: TechIcon[] = [
    { name: "React", x: "10%", y: "20%" },
    { name: "Node.js", x: "85%", y: "15%" },
    { name: "Python", x: "75%", y: "70%" },
    { name: "AWS", x: "15%", y: "65%" },
    { name: "TypeScript", x: "50%", y: "80%" },
    { name: "Docker", x: "90%", y: "45%" },
  ];

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ background: "#0f172a" }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Transform Your Business with{" "}
            <span style={{ background: "linear-gradient(135deg, #06b6d4, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Cutting-Edge IT Solutions
            </span>
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Particle Background */}
      <div className="particle-bg">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="particle"
            style={{ left: particle.x, top: particle.y }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Network Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <path
          d="M100 200 Q300 100 500 200 T900 200"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="1"
        />
        <path
          d="M50 400 Q250 300 450 400 T850 400"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="1"
        />
        <path
          d="M150 600 Q350 500 550 600 T950 600"
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="1"
        />
      </svg>

      {/* Floating Tech Icons */}
      {techIcons.map((icon, index) => (
        <motion.div
          key={icon.name}
          className="absolute text-[#94a3b8]/30 text-sm font-medium"
          style={{ left: icon.x, top: icon.y }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            delay: index * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {icon.name}
        </motion.div>
      ))}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full glass text-[#06b6d4] text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            🚀 Innovating Tomorrow's Technology Today
          </motion.span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Transform Your Business with{" "}
          <span className="gradient-text">Cutting-Edge IT Solutions</span>
        </motion.h1>

        <motion.p
          className="text-[#94a3b8] text-lg md:text-xl max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          We deliver comprehensive software development, cloud solutions, and
          digital transformation services that drive growth and innovation.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <motion.a
            href="#services"
            className="gradient-btn text-lg px-8 py-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Our Services
          </motion.a>
          <motion.a
            href="#contact"
            className="glass px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#1e293b]/50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Us
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-[#94a3b8]/50 flex justify-center">
            <motion.div
              className="w-1.5 h-3 bg-[#06b6d4] rounded-full mt-2"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

