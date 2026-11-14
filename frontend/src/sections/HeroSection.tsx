import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Cpu, ChevronRight, Mail } from 'lucide-react';
import { ThreeCanvas } from '../components/ThreeCanvas';
import { CardTilt } from '../components/CardTilt';
import { GithubIcon, LinkedinIcon } from '../components/Icons';

export const HeroSection: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Interactive 3D Three.js Background Canvas */}
      <ThreeCanvas />

      {/* Radial Cobalt Glow & Atmospheric Gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cobalt-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cobalt-800/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & Introduction */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Status Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-cobalt-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(0,71,171,0.2)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cobalt-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cobalt-500"></span>
              </span>
              <span className="text-xs font-mono font-medium text-gray-300">
                Open to AI/ML Research & Engineering Internships
              </span>
            </motion.div>

            {/* Main Hero Title */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Hi, I'm{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-white via-blue-100 to-cobalt-300 bg-clip-text text-transparent">
                    Mohammed Abbas S
                  </span>
                  <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-cobalt-600 via-cobalt-400 to-transparent rounded-full opacity-80" />
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-cobalt-300 tracking-normal flex items-center gap-2">
                <Cpu className="w-6 h-6 text-cobalt-400" />
                Computer Science Engineering Student | AI & ML Enthusiast
              </p>
            </motion.div>

            {/* Short Bio Statement */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl font-light"
            >
              I'm an aspiring AI and Machine Learning engineer passionate about technology, programming,
              and building intelligent solutions that solve real-world problems. Currently pursuing my B.Tech
              at Jain University with a strong focus on algorithmic foundations and neural systems.
            </motion.p>

            {/* Quick Metrics / Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="grid grid-cols-3 gap-3 py-2 max-w-lg"
            >
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-xs text-gray-400 font-mono">Specialization</div>
                <div className="text-sm font-semibold text-white">AI & ML</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-xs text-gray-400 font-mono">CGPA</div>
                <div className="text-sm font-semibold text-cobalt-300">7.5 / 10.0</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-xs text-gray-400 font-mono">Graduation</div>
                <div className="text-sm font-semibold text-white">2025 – 2029</div>
              </div>
            </motion.div>

            {/* Two Prominent Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={() => scrollTo('#projects')}
                className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-cobalt-600 hover:bg-cobalt-500 shadow-[0_0_30px_rgba(0,71,171,0.5)] hover:shadow-[0_0_40px_rgba(0,71,171,0.8)] transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000" />
                <span>Explore My Work</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollTo('#contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-gray-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-cobalt-500/50 hover:text-white transition-all duration-300 shadow-sm"
              >
                <span>Let's Connect</span>
                <Mail className="w-4 h-4 text-cobalt-400" />
              </button>

              {/* Direct Quick Links */}
              <div className="flex items-center gap-2 pl-2">
                <a
                  href="https://github.com/Abbas0307"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/[0.03] hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white hover:border-cobalt-500/40 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mohammed-abbas-s-4754b1401"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/[0.03] hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white hover:border-cobalt-500/40 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Isolated Profile Photo Directly Over Website Background */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <CardTilt maxTilt={8} glowColor="transparent" className="bg-transparent overflow-visible">
              <div className="relative group flex flex-col items-center">
                
                {/* Isolated Photograph - Zero Background, Zero Container Box, 100% Transparent */}
                <div className="relative w-80 sm:w-96 md:w-[440px] lg:w-[480px] h-[500px] sm:h-[560px] lg:h-[620px] flex justify-center items-end bg-transparent">
                  <img
                    src="/profile-transparent.png"
                    alt="Mohammed Abbas S"
                    className="w-full h-full object-contain object-bottom bg-transparent select-none filter drop-shadow-[0_0_30px_rgba(0,71,171,0.45)] drop-shadow-[0_20px_50px_rgba(0,71,171,0.3)] transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Floating Status Badges Over Website Canvas */}
                <div className="absolute top-4 -left-2 sm:-left-4 px-3.5 py-1.5 rounded-full bg-gray-950/80 border border-cobalt-500/40 backdrop-blur-md shadow-xl flex items-center gap-2 pointer-events-none">
                  <Cpu className="w-3.5 h-3.5 text-cobalt-400" />
                  <span className="text-xs font-mono font-medium text-white">AI & ML Engineer</span>
                </div>

                <div className="absolute bottom-6 -right-2 sm:-right-4 px-3.5 py-1.5 rounded-full bg-gray-950/80 border border-cobalt-500/40 backdrop-blur-md shadow-xl flex items-center gap-2 pointer-events-none">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono font-medium text-white">Python • C • Java</span>
                </div>

              </div>
            </CardTilt>
          </div>

        </div>

        {/* Scroll Down Indicator */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => scrollTo('#about')}
            className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Scroll to About section"
          >
            <span className="text-xs font-mono tracking-widest uppercase">Scroll Down</span>
            <div className="animate-bounce">
              <ArrowDown className="w-4 h-4 text-cobalt-400" />
            </div>
          </button>
        </div>

      </div>
    </section>
  );
};
