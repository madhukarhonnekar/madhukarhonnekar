import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Briefcase } from 'lucide-react';
import type { RootState } from '../store/store';

const Experience: React.FC = () => {
  const experiences = useSelector((state: RootState) => state.portfolio.experiences);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <section ref={ref} id="experience" className="py-20 bg-white relative overflow-hidden">
      {/* 3D Floating Lines Background */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-5"
          style={{
            width: '2px',
            height: '100px',
            left: `${i * 5}%`,
            backgroundColor: i % 2 === 0 ? '#4F46E5' : '#60A5FA',
            top: 0,
          }}
          animate={{
            y: [0, 500],
            opacity: [0.1, 0.5, 0.1],
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
          style={{ y, opacity }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Professional Experience
          </motion.h2>

          <div className="relative">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative pl-8 pb-8 border-l-2 border-blue-600 last:border-0"
              >
                <motion.div 
                  className="absolute left-[-9px] top-0"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-blue-600 rounded-full p-1">
                    <Briefcase className="text-white" size={16} />
                  </div>
                </motion.div>

                <motion.div
                  className="bg-gray-50 rounded-lg p-6 shadow-sm transform-gpu"
                  whileHover={{
                    scale: 1.02,
                    rotateX: 5,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                >
                  <h3 className="text-xl font-semibold text-gray-900">{exp.designation}</h3>
                  <p className="text-blue-600 font-medium mt-1">{exp.organization}</p>
                  <p className="text-gray-600 mt-1">{exp.duration}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;