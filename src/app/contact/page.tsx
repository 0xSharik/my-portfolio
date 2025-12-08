"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Contact() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center w-full"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent neon-glow">
            Get In Touch
          </h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto space-y-8"
          >
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm always interested in hearing about new opportunities, exciting projects, 
              or just having a chat about technology and innovation.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-dark p-8 rounded-xl border border-cyan-400/30"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-2">Email</h3>
                  <p className="text-gray-300">sharik.hasan@example.com</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-2">Location</h3>
                  <p className="text-gray-300">Available for remote work worldwide</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-cyan-400 mb-2">Connect</h3>
                  <div className="flex gap-4 justify-center">
                    <a href="#" className="text-cyan-300 hover:text-cyan-400 transition-colors">
                      LinkedIn
                    </a>
                    <a href="#" className="text-cyan-300 hover:text-cyan-400 transition-colors">
                      GitHub
                    </a>
                    <a href="#" className="text-cyan-300 hover:text-cyan-400 transition-colors">
                      Twitter
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mt-12"
          >
            <Link
              href="/projects"
              className="px-8 py-4 border border-cyan-400 text-cyan-400 rounded-full font-semibold hover:scale-105 transition-transform hover:bg-cyan-400/10 glass-dark"
            >
              View Projects
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-semibold hover:scale-105 transition-transform neon-glow glass-dark"
            >
              About Me
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
