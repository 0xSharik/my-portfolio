"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Contact() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center w-full"
        >
          {/* 🔥 High-Intent Trigger */}
          <p className="text-sm md:text-base text-cyan-300 mb-4 tracking-wide uppercase">
            Looking to build something serious?
          </p>

          <h1 className="text-5xl md:text-7xl font-bold mb-10 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent neon-glow">
            Let’s Work Together
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto space-y-10"
          >
            <p className="text-lg text-gray-300 leading-relaxed">
              I collaborate on real-world products, startup systems, and scalable full-stack platforms.
              If you’re building something meaningful, I’m open to serious discussions.
            </p>

            {/* ✅ Main Contact Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-dark p-8 rounded-2xl border border-cyan-400/30 grid md:grid-cols-2 gap-8"
            >
              {/* LEFT: Direct Contact */}
              <div className="space-y-6 text-left">
                <div>
                  <h3 className="text-lg font-semibold text-cyan-400 mb-1">
                    Email
                  </h3>
                  <p className="text-gray-300">
                    sharikhasan390@gmail.com
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-cyan-400 mb-1">
                    Mobile
                  </h3>
                  <p className="text-gray-300">
                    +91 6283400770
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-cyan-400 mb-1">
                    Location
                  </h3>
                  <p className="text-gray-300">
                    Available for remote, hybrid & on-site work
                  </p>
                </div>
              </div>

              {/* RIGHT: Authority + Availability */}
              <div className="space-y-6 text-left">
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-1">
                    Startup Role
                  </h3>
                  <p className="text-gray-300">
                    Co-Founder — Softgame Studio
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-1">
                    Leadership
                  </h3>
                  <p className="text-gray-300">
                    Management Team — CU Defence Club
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-cyan-400 mb-1">
                    Availability
                  </h3>
                  <p className="text-gray-300">
                    Open to startup, freelance & long-term roles
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ✅ Social Links as Action Buttons */}
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <a
                href="https://www.linkedin.com/in/0xsharik/"
                target="_blank"
                className="px-6 py-3 border border-cyan-400 text-cyan-400 rounded-full hover:bg-cyan-400/10 transition-all glass-dark font-medium"
              >
                Professional Profile
              </a>

              <a
                href="https://github.com/0xSharik"
                target="_blank"
                className="px-6 py-3 border border-purple-400 text-purple-400 rounded-full hover:bg-purple-400/10 transition-all glass-dark font-medium"
              >
                Source Code
              </a>

              <a
                href="https://www.instagram.com/samar_pb15/"
                target="_blank"
                className="px-6 py-3 border border-pink-400 text-pink-400 rounded-full hover:bg-pink-400/10 transition-all glass-dark font-medium"
              >
                Personal Feed
              </a>
            </div>
          </motion.div>

          {/* ✅ High-Value CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mt-16"
          >
            <Link
              href="http://wa.me/+916283400770"
              className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-bold hover:scale-105 transition-transform neon-glow glass-dark"
            >
              Hire Me
            </Link>

            <Link
              href="/projects"
              className="px-10 py-4 border border-cyan-400 text-cyan-400 rounded-full font-bold hover:scale-105 transition-transform hover:bg-cyan-400/10 glass-dark"
            >
              View My Work
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
