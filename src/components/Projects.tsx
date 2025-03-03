import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Code2, GitBranch } from 'lucide-react';
import type { RootState } from '../store/store';

const Projects: React.FC = () => {
  const projects = useSelector((state: RootState) => state.portfolio.projects);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const pathLength = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  return (
    <section ref={ref} id="projects" className="py-20 bg-white relative overflow-hidden">
      {/* 3D Floating Code Symbols Background */}
      {Array.from({ length: 20 }).map((_, i) => {
        const symbol = ['{ }', '< /', '/>', '( )', '[ ]'][i % 5];
        return (
          <motion.div
            key={i}
            className="absolute text-2xl font-mono opacity-5"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              color: i % 2 === 0 ? '#4F46E5' : '#60A5FA',
              rotate: rotate,
            }}
            animate={{
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 10 + i,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {symbol}
          </motion.div>
        );
      })}

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          style={{ y }}
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
            Projects
          </motion.h2>

          <div className="grid gap-8">
            {projects.map((project, index) => (
              <div key={index} className="relative">
                {/* Animated Connection Line */}
                {index < projects.length - 1 && (
                  <motion.div
                    className="absolute left-8 top-full w-1 h-16 overflow-hidden"
                    style={{ zIndex: 1 }}
                  >
                    <motion.div
                      className="h-full w-full bg-gradient-to-b from-blue-600 to-blue-400"
                      initial={{ height: 0 }}
                      whileInView={{ height: "100%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </motion.div>
                )}

                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-lg shadow-md p-8 transform-gpu relative"
                  whileHover={{
                    scale: 1.02,
                    rotateX: 2,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  {/* Project Timeline Node */}
                  <motion.div
                    className="absolute -left-4 top-8 bg-blue-600 rounded-full p-2 shadow-lg"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <GitBranch className="text-white" size={20} />
                  </motion.div>

                  <motion.div 
                    className="flex items-center space-x-3 mb-4"
                    whileHover={{ x: 10 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Code2 className="text-blue-600" size={24} />
                    </motion.div>
                    <h3 className="text-2xl font-semibold">{project.name}</h3>
                  </motion.div>

                  <motion.div 
                    className="mb-4"
                    whileHover={{ x: 10 }}
                  >
                    <p className="text-blue-600 font-medium">Client: {project.client}</p>
                    {project.domain && (
                      <p className="text-gray-600">Domain: {project.domain}</p>
                    )}
                  </motion.div>

                  <motion.p 
                    className="text-gray-700 mb-6"
                    whileHover={{ x: 10 }}
                  >
                    {project.description}
                  </motion.p>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                  >
                    <h4 className="font-semibold mb-3">Key Responsibilities:</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {project.responsibilities.map((resp, idx) => (
                        <motion.li 
                          key={idx}
                          whileHover={{ x: 10 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {resp}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;