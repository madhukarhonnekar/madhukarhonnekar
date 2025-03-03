import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useSelector } from 'react-redux';
import { GraduationCap } from 'lucide-react';
import type { RootState } from '../store/store';

const Education: React.FC = () => {
  const education = useSelector((state: RootState) => state.portfolio.education);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section ref={ref} id="education" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* 3D Floating Triangles Background */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-5"
          style={{
            width: 0,
            height: 0,
            borderLeft: `${Math.random() * 50 + 25}px solid transparent`,
            borderRight: `${Math.random() * 50 + 25}px solid transparent`,
            borderBottom: `${Math.random() * 50 + 25}px solid ${i % 2 === 0 ? '#4F46E5' : '#60A5FA'}`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            rotate: rotate,
          }}
          animate={{
            y: [0, 50, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15 + i,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          style={{ scale }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Education
          </motion.h2>

          <div className="max-w-4xl mx-auto grid gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-md p-6 flex items-start space-x-4 transform-gpu"
                whileHover={{
                  scale: 1.02,
                  rotateX: 5,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <motion.div 
                  className="bg-blue-100 rounded-full p-3"
                  whileHover={{ rotate: 360 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <GraduationCap className="text-blue-600" size={24} />
                </motion.div>
                <div>
                  <motion.h3 
                    className="text-xl font-semibold text-gray-900"
                    whileHover={{ x: 10 }}
                  >
                    {edu.degree}
                  </motion.h3>
                  <motion.p 
                    className="text-blue-600 mt-1"
                    whileHover={{ x: 10 }}
                  >
                    {edu.institution}
                  </motion.p>
                  <motion.p 
                    className="text-gray-600 mt-1"
                    whileHover={{ x: 10 }}
                  >
                    Score: {edu.score}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;