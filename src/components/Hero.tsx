import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Download } from 'lucide-react';

const Hero: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);

  const x = useSpring(mouseX, { stiffness: 500, damping: 50 });
  const y = useSpring(mouseY, { stiffness: 500, damping: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set((e.clientX - centerX) * 0.1);
        mouseY.set((e.clientY - centerY) * 0.1);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const shapes = Array.from({ length: 20 }).map((_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 40 + 20,
    rotation: Math.random() * 360,
  }));

  return (
    <section 
      ref={ref}
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50"
    >
      {/* Animated Background Shapes */}
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute opacity-10"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
            backgroundColor: index % 2 === 0 ? '#4F46E5' : '#60A5FA',
            borderRadius: index % 3 === 0 ? '50%' : '20%',
          }}
          animate={{
            rotate: [shape.rotation, shape.rotation + 360],
            scale: [1, 1.2, 1],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10 + index * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <div className="container mx-auto px-6 py-20 z-10">
        <motion.div
          style={{
            perspective: 1000,
            rotateX,
            rotateY,
          }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-gray-800 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Madhukar Honnekar
            </motion.h1>
            
            <motion.h2 
              className="text-2xl md:text-3xl text-gray-600 mb-8"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Full-Stack Developer
            </motion.h2>

            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto mb-10"
              whileHover={{ scale: 1.02 }}
            >
              Highly skilled Full-Stack Developer with 4+ years of experience in building and optimizing
              scalable, high-performance web applications using React.js and Node.js.
            </motion.p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <motion.a
                href="#contact"
                className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.a>
              
              <motion.a
                href="/madhukar-honnekar-resume.pdf"
                download="Madhukar-Honnekar-Resume.pdf"
                className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-full hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={18} className="mr-2" />
                Download Resume
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-50 pointer-events-none" />
    </section>
  );
};

export default Hero;