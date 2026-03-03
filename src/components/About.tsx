"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { label: "Projects Completed", value: 500, suffix: "+" },
  { label: "Happy Clients", value: 150, suffix: "+" },
  { label: "Awards Won", value: 25, suffix: "+" },
  { label: "Years Experience", value: 10, suffix: "+" },
];

const techStack = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "AWS", "Docker", "Kubernetes"
];

function Counter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return <span>{count}{suffix}</span>;
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 relative" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-medium">About Us</span>
          <h2 className="text-4xl font-bold mt-2 mb-4">
            Empowering Businesses Through <span className="gradient-text">Innovation</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            We are a team of passionate IT professionals dedicated to delivering 
            exceptional digital solutions that transform businesses and drive growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p className="text-text-secondary mb-6 leading-relaxed">
              To empower businesses with innovative technology solutions that enhance 
              efficiency, productivity, and competitive advantage. We believe in 
              delivering not just code, but solutions that create real business value.
            </p>
            <p className="text-text-secondary mb-8 leading-relaxed">
              With over a decade of experience, we've helped startups and enterprises 
              alike navigate their digital transformation journey, delivering projects 
              that exceed expectations and deliver measurable results.
            </p>

            {/* Tech Stack */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Technologies We Use</h4>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 glass rounded-full text-sm text-text-secondary"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Content - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="glass p-6 rounded-xl text-center gradient-border"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-bold gradient-text mb-2">
                  <Counter value={stat.value} suffix={stat.suffix} inView={isInView} />
                </div>
                <div className="text-text-secondary text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

