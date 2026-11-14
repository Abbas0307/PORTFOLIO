import React from 'react';
import { GraduationCap, Award, Calendar, BookOpen, MapPin, Brain, Code2, Globe2, Lightbulb, Sparkles } from 'lucide-react';
import { CardTilt } from '../components/CardTilt';

export const AboutSection: React.FC = () => {
  const academicCards = [
    {
      title: 'Degree',
      value: 'B.Tech CSE – AIML',
      subtitle: 'Computer Science & Engineering',
      icon: GraduationCap,
      badge: 'Undergraduate',
    },
    {
      title: 'University',
      value: 'Jain University',
      subtitle: 'Faculty of Engineering & Tech',
      icon: BookOpen,
      badge: 'Bengaluru, India',
    },
    {
      title: 'Academic Year',
      value: '2025 – 2029',
      subtitle: '4-Year Engineering Program',
      icon: Calendar,
      badge: 'Full-Time',
    },
    {
      title: 'Current CGPA',
      value: '7.5 / 10.0',
      subtitle: 'Consistent Academic Track Record',
      icon: Award,
      badge: 'First Class',
    },
  ];

  const focusAreas = [
    {
      title: 'Artificial Intelligence',
      desc: 'Developing intelligent systems and studying cognitive computing architectures.',
      icon: Brain,
    },
    {
      title: 'Machine Learning',
      desc: 'Building statistical models, pattern recognition pipelines, and predictive algorithms.',
      icon: Sparkles,
    },
    {
      title: 'Python Programming',
      desc: 'Writing clean, scalable code for data processing, scripting, and backend engines.',
      icon: Code2,
    },
    {
      title: 'Software Development',
      desc: 'Architecting modular full-stack web applications and robust REST APIs.',
      icon: Lightbulb,
    },
    {
      title: 'Problem Solving',
      desc: 'Breaking down multifaceted real-world challenges into structured, logical solutions.',
      icon: Award,
    },
    {
      title: 'Emerging Technologies',
      desc: 'Staying ahead with cutting-edge advancements in generative AI and cloud infrastructure.',
      icon: Globe2,
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-gray-950/60 border-t border-white/5">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cobalt-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cobalt-500/10 border border-cobalt-500/30 text-cobalt-300 text-xs font-mono uppercase tracking-wider">
            Background & Academics
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            A Little About Me
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-light">
            I am a motivated Computer Science undergraduate student pursuing my degree with a specialization in{' '}
            <span className="text-white font-medium">Artificial Intelligence and Machine Learning</span> at{' '}
            <span className="text-white font-medium">Jain University</span>. My journey combines disciplined
            algorithmic fundamentals with a relentless drive to translate data-driven insights into functional,
            high-impact technologies.
          </p>
        </div>

        {/* 4 Interactive Academic Cards with 3D Tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {academicCards.map((card) => {
            const Icon = card.icon;
            return (
              <CardTilt key={card.title} maxTilt={14} className="h-full">
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cobalt-500/50 backdrop-blur-xl h-full flex flex-col justify-between transition-all duration-300 group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-xl bg-cobalt-500/10 border border-cobalt-500/30 text-cobalt-400 group-hover:bg-cobalt-500 group-hover:text-white transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300">
                        {card.badge}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-gray-400">
                        {card.title}
                      </span>
                      <h3 className="text-xl font-bold text-white tracking-tight mt-1 group-hover:text-cobalt-200 transition-colors">
                        {card.value}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">{card.subtitle}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-400 font-mono">
                    <span>Verified Academic Record</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cobalt-400" />
                  </div>
                </div>
              </CardTilt>
            );
          })}
        </div>

        {/* Focus Areas & Core Passions Grid */}
        <div className="rounded-3xl p-8 sm:p-10 bg-white/[0.02] border border-white/10 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Core Areas of Passion</h3>
              <p className="text-sm text-gray-400 mt-1">Disciplines where I invest my programming and research hours.</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              <MapPin className="w-3.5 h-3.5 text-cobalt-400" />
              <span>Bengaluru, Karnataka, India</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {focusAreas.map((area) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.title}
                  className="p-5 rounded-xl bg-gray-950/60 border border-white/5 hover:border-cobalt-500/40 hover:bg-white/[0.03] transition-all duration-300 group"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-lg bg-cobalt-500/10 text-cobalt-400 group-hover:bg-cobalt-500/20 group-hover:scale-105 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white group-hover:text-cobalt-200 transition-colors">
                        {area.title}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed font-light">
                        {area.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Languages & Professional Strengths Pill Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-xs font-mono uppercase text-gray-400 mb-2">Spoken & Written Languages</div>
              <div className="flex flex-wrap gap-2">
                {['English', 'Tamil', 'Hindi', 'Kannada'].map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-300"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-mono uppercase text-gray-400 mb-2">Professional Strengths</div>
              <div className="flex flex-wrap gap-2">
                {['Logical Thinking', 'Continuous Learning', 'Adaptability', 'Creative Thinking'].map((strength) => (
                  <span
                    key={strength}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-cobalt-500/10 border border-cobalt-500/30 text-cobalt-300"
                  >
                    {strength}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
