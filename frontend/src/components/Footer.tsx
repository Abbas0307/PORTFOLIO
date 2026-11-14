import React from 'react';
import { Mail, Shield, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

interface FooterProps {
  onAdminClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gray-950 border-t border-white/10 pt-16 pb-12 overflow-hidden text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Brand & Identity */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cobalt-600/30 border border-cobalt-500/50 flex items-center justify-center text-cobalt-300">
                <span className="font-mono text-sm font-bold text-white">MA</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Mohammed Abbas S</span>
            </div>
            <p className="text-sm text-gray-400 max-w-md font-light leading-relaxed">
              Undergraduate Computer Science & Engineering student specializing in Artificial Intelligence
              and Machine Learning at Jain University, Bengaluru (2025–2029).
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/Abbas0307"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/mohammed-abbas-s-4754b1401"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:abbas.cse36@gmail.com"
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white">Navigation</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Me</a></li>
              <li><a href="#skills" className="hover:text-white transition-colors">Technical Skills</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Projects</a></li>
              <li><a href="#education" className="hover:text-white transition-colors">Education</a></li>
              <li><a href="#certifications" className="hover:text-white transition-colors">Certifications</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* System & Architecture */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white">System Architecture</h4>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span>Frontend:</span>
                <span className="font-mono text-gray-200">React + Three.js</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Backend:</span>
                <span className="font-mono text-cobalt-300">FastAPI (Python)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Database:</span>
                <span className="font-mono text-gray-200">SQLAlchemy / SQLite</span>
              </div>
              <div className="pt-2 border-t border-white/5">
                <button
                  onClick={onAdminClick}
                  className="w-full flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg bg-cobalt-600/20 hover:bg-cobalt-600/30 border border-cobalt-500/30 text-cobalt-300 text-xs font-mono transition-colors"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Portal</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div>
            © {new Date().getFullYear()} Mohammed Abbas S. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onAdminClick}
              className="text-gray-500 hover:text-cobalt-300 transition-colors flex items-center gap-1"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Access</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
