import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

const Skills: React.FC = () => {
  const skills = useSelector((state: RootState) => state.portfolio.skills);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const categories = ['Frontend', 'Backend', 'Database', 'DevOps'];
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section ref={ref} id="skills" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* 3D Rotating Spheres Background */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-5"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: i % 2 === 0 ? '#4F46E5' : '#60A5FA',
            rotate: rotate,
          }}
          animate={{
            scale: [1, 1.2, 1],
            z: [0, 50, 0],
          }}
          transition={{
            duration: 8 + i,
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
            Technical Skills
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, idx) => (
              <motion.div
                key={category}
                className="bg-white rounded-lg shadow-md p-6 transform-gpu"
                initial={{ rotateY: 90, opacity: 0 }}
                whileInView={{ rotateY: 0, opacity: 1 }}
                transition={{ delay: idx * 0.2, duration: 0.8 }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 10,
                  transition: { type: "spring", stiffness: 400 }
                }}
              >
                <h3 className="text-xl font-semibold mb-4 text-blue-600">{category}</h3>
                <div className="space-y-4">
                  {skills
                    .filter((skill) => skill.category === category)
                    .map((skill) => (
                      <motion.div
                        key={skill.name}
                        className="flex items-center space-x-3"
                        whileHover={{ x: 10, scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="w-6 h-6"
                        />
                        <span>{skill.name}</span>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;