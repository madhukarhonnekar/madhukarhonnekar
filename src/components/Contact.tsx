import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formRef.current) return;
    
    setStatus('sending');

    try {
      await emailjs.sendForm(
        'service_27sfw79',
        'template_i686wjb',
        formRef.current,
        'kohwVyeU21L8fp807'
      );
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset form status after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Email sending failed:', error);
      setStatus('error');
      
      // Reset error status after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    }
  };

  return (
    <section ref={ref} id="contact" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* 3D Floating Circles with Ripple Effect */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-5"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            border: `2px solid ${i % 2 === 0 ? '#4F46E5' : '#60A5FA'}`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            rotate: rotate,
          }}
          animate={{
            scale: [1, 2, 1],
            opacity: [0.1, 0.2, 0.1],
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
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Get in Touch
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              className="space-y-6"
              initial={{ x: -50 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <motion.div 
                  className="flex items-center space-x-3"
                  whileHover={{ x: 10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Mail className="text-blue-600" size={20} />
                  <a href="mailto:madhukarhonnekar@gmail.com" className="hover:text-blue-600">
                    madhukarhonnekar@gmail.com
                  </a>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3"
                  whileHover={{ x: 10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Phone className="text-blue-600" size={20} />
                  <a href="tel:+917020432066" className="hover:text-blue-600">
                    +91 7020432066
                  </a>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-3"
                  whileHover={{ x: 10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <MapPin className="text-blue-600" size={20} />
                  <span>A/p Pirwadi Tal – Satara Dist – Satara</span>
                </motion.div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-lg shadow-md p-6 transform-gpu"
              initial={{ x: 50 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{
                scale: 1.02,
                rotateX: 5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
            >
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <motion.div whileHover={{ y: -2 }}>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                  />
                </motion.div>
                <motion.div whileHover={{ y: -2 }}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                  />
                </motion.div>
                <motion.div whileHover={{ y: -2 }}>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                  ></textarea>
                </motion.div>
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  className={`w-full py-2 px-4 rounded-md transition-colors transform-gpu flex items-center justify-center gap-2 ${
                    status === 'sending' 
                      ? 'bg-blue-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                  whileHover={{ scale: status !== 'sending' ? 1.02 : 1 }}
                  whileTap={{ scale: status !== 'sending' ? 0.98 : 1 }}
                >
                  {status === 'sending' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>
                
                {/* Status Messages */}
                {status === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-green-600 mt-2"
                  >
                    <CheckCircle size={18} />
                    <span>Message sent successfully!</span>
                  </motion.div>
                )}
                
                {status === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-600 mt-2"
                  >
                    <AlertCircle size={18} />
                    <span>Failed to send message. Please try again.</span>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;