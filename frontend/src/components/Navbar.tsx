import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Shield } from 'lucide-react';

interface NavbarProps {
  onAdminClick: () => void;
  isAdminView?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onAdminClick, isAdminView = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (isAdminView) {
      window.location.hash = href;
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-gray-950/80 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 group text-white font-semibold text-lg tracking-tight"
          >
            <div className="w-8 h-8 rounded-lg bg-cobalt-600/30 border border-cobalt-500/50 flex items-center justify-center text-cobalt-300 group-hover:scale-105 group-hover:border-cobalt-400 group-hover:shadow-[0_0_15px_rgba(0,71,171,0.6)] transition-all">
              <span className="font-mono text-sm font-bold text-white">MA</span>
            </div>
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Mohammed Abbas S
            </span>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono font-medium bg-cobalt-500/10 text-cobalt-300 border border-cobalt-500/30">
              AI & ML
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="px-3 py-1.5 text-xs lg:text-sm font-medium text-gray-300 hover:text-white rounded-full hover:bg-white/10 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onAdminClick}
              title="Admin Portal (Demo credentials available)"
              className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors flex items-center gap-1.5 text-xs"
            >
              <Shield className="w-4 h-4 text-cobalt-400" />
              <span className="hidden lg:inline text-gray-300">Admin</span>
            </button>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs lg:text-sm font-medium text-white bg-cobalt-600 hover:bg-cobalt-500 shadow-[0_0_20px_rgba(0,71,171,0.4)] hover:shadow-[0_0_25px_rgba(0,71,171,0.7)] transition-all duration-200"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onAdminClick}
              className="p-2 text-gray-300 hover:text-white bg-white/5 rounded-lg border border-white/10"
              title="Admin Portal"
            >
              <Shield className="w-4 h-4 text-cobalt-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white bg-white/5 rounded-lg border border-white/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-4 p-4 rounded-2xl bg-gray-950/95 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col gap-2">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-200 hover:text-white hover:bg-white/10 transition-colors"
            >
              {item.name}
            </a>
          ))}
          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="w-full text-center py-2.5 rounded-xl text-sm font-medium text-white bg-cobalt-600 hover:bg-cobalt-500 shadow-[0_0_15px_rgba(0,71,171,0.4)]"
            >
              Let's Talk
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
