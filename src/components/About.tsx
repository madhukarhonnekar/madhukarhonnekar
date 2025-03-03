import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';

const About: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section ref={ref} id="about" className="py-20 bg-white relative overflow-hidden">
      {/* 3D Floating Cubes Background */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-20 h-20 opacity-5"
          style={{
            left: `${i * 10}%`,
            top: `${Math.sin(i) * 50 + 50}%`,
            backgroundColor: i % 2 === 0 ? '#4F46E5' : '#60A5FA',
            rotate: rotate,
          }}
          animate={{
            y: [0, 30, 0],
            rotateY: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10 + i,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          style={{ y }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About Me
          </motion.h2>

          <motion.div
            className="perspective-1000 transform-gpu"
            whileHover={{ scale: 1.02, rotateX: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Highly skilled Full-Stack Developer with 4+ years of experience in building and optimizing scalable, high-performance web applications using React.js and Node.js. Expertise in developing interactive UI/UX, RESTful APIs, and modern web architectures. Strong problem-solving skills and a passion for writing clean, maintainable, and efficient code.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div 
                className="space-y-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <motion.div 
                  className="flex items-center space-x-3"
                  whileHover={{ x: 10 }}
                >
                  <Mail className="text-blue-600" size={20} />
                  <span>madhukarhonnekar@gmail.com</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3"
                  whileHover={{ x: 10 }}
                >
                  <Phone className="text-blue-600" size={20} />
                  <span>+91 7020432066</span>
                </motion.div>
              </motion.div>

              <motion.div 
                className="space-y-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <motion.div 
                  className="flex items-center space-x-3"
                  whileHover={{ x: 10 }}
                >
                  <MapPin className="text-blue-600" size={20} />
                  <span>A/p Pirwadi Tal – Satara Dist – Satara</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3"
                  whileHover={{ x: 10 }}
                >
                  <Calendar className="text-blue-600" size={20} />
                  <span>5th May 1991</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;