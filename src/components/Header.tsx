import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSection } from '../store/portfolioSlice';
import { Menu, X } from 'lucide-react';
import type { RootState } from '../store/store';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const activeSection = useSelector((state: RootState) => state.portfolio.activeSection);
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact'];

  // 3D animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20, rotateX: 90 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="fixed w-full bg-white/90 backdrop-blur-sm shadow-lg z-50"
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            className="text-2xl font-bold text-blue-600 perspective-1000"
            whileHover={{ 
              scale: 1.1,
              rotateY: [0, 15, -15, 0],
              transition: { duration: 0.5 }
            }}
          >
            <span className="inline-block transform-gpu">MH</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 perspective-1000">
            {navItems.map((item, index) => (
              <motion.div
                key={item}
                variants={itemVariants}
                custom={index}
                className="transform-gpu"
              >
                <Link
                  to={item.toLowerCase()}
                  smooth={true}
                  duration={500}
                  className={`cursor-pointer transition-colors relative group ${
                    activeSection === item.toLowerCase() ? 'text-blue-600' : 'text-gray-600'
                  }`}
                  onClick={() => dispatch(setActiveSection(item.toLowerCase()))}
                >
                  <span className="relative z-10">{item}</span>
                  
                  {/* Hover effect */}
                  <motion.span 
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"
                    layoutId="underline"
                  />
                  
                  {/* 3D hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-blue-50 rounded-md -z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ 
                      opacity: 0.5, 
                      scale: 1.1,
                      rotateX: 10,
                      rotateY: 15
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-gray-600 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="md:hidden bg-white shadow-xl absolute top-full left-0 right-0 z-50 perspective-1000"
          >
            <div className="py-4 px-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item}
                  variants={itemVariants}
                  custom={index}
                  className="transform-gpu"
                  whileHover={{ 
                    scale: 1.05, 
                    x: 10,
                    rotateY: 5,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                >
                  <Link
                    to={item.toLowerCase()}
                    smooth={true}
                    duration={500}
                    className={`block py-2 px-4 rounded-md ${
                      activeSection === item.toLowerCase() 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      dispatch(setActiveSection(item.toLowerCase()));
                      setIsOpen(false);
                    }}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;