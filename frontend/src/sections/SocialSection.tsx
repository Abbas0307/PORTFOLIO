import React from 'react';
import { Code2, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { CardTilt } from '../components/CardTilt';
import { GithubIcon, LinkedinIcon } from '../components/Icons';

export const SocialSection: React.FC = () => {
  const githubRepos = [
    {
      name: 'AI-ML-Engineering-Foundations',
      desc: 'Machine learning algorithms, loss functions, regression, and data structures in Python.',
      lang: 'Python',
    },
    {
      name: 'FastAPI-Modern-Backend-Engine',
      desc: 'REST API architectures with SQLAlchemy ORM, SQLite/PostgreSQL, and JWT security.',
      lang: 'Python / FastAPI',
    },
    {
      name: 'Competitive-Coding-Problem-Solving',
      desc: 'Optimized solutions in C, Java, and Python covering graph theory, trees, and dynamic programming.',
      lang: 'C / Java / Python',
    },
  ];

  return (
    <section id="social" className="py-24 relative overflow-hidden bg-gray-950 border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cobalt-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cobalt-500/10 border border-cobalt-500/30 text-cobalt-300 text-xs font-mono uppercase tracking-wider">
            Connected Presence
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            GitHub & LinkedIn Integration
          </h2>
          <p className="text-gray-300 text-base sm:text-lg font-light">
            Explore my active open-source activity, codebase commits, and professional networking profile.
          </p>
        </div>

        {/* Two Grand Showcase Cards: GitHub & LinkedIn */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* GitHub Spotlight Card (7 cols) */}
          <div className="lg:col-span-7">
            <CardTilt maxTilt={8} className="h-full">
              <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-cobalt-500/50 backdrop-blur-xl h-full flex flex-col justify-between transition-all group">
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-white group-hover:scale-105 group-hover:border-cobalt-500 transition-all">
                        <GithubIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">GitHub Ecosystem</h3>
                        <p className="text-xs font-mono text-cobalt-300">@Abbas0307</p>
                      </div>
                    </div>

                    <a
                      href="https://github.com/Abbas0307"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
                    >
                      <span>Explore GitHub</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <p className="text-sm text-gray-300 font-light leading-relaxed">
                    Repository tracking my daily code practice, algorithm challenges, and software implementations.
                  </p>

                  {/* Curated Repos Grid */}
                  <div className="space-y-3">
                    <div className="text-xs font-mono uppercase text-gray-400">Featured Repositories</div>
                    {githubRepos.map((repo) => (
                      <div
                        key={repo.name}
                        className="p-4 rounded-xl bg-gray-950/70 border border-white/5 hover:border-cobalt-500/40 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-white font-mono flex items-center gap-2">
                            <Code2 className="w-4 h-4 text-cobalt-400" />
                            {repo.name}
                          </span>
                          <span className="text-[11px] font-mono text-cobalt-300 bg-cobalt-500/10 px-2 py-0.5 rounded border border-cobalt-500/20">
                            {repo.lang}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{repo.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-gray-400">
                  <span>Continuous Development</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Active Commits
                  </span>
                </div>

              </div>
            </CardTilt>
          </div>

          {/* LinkedIn Spotlight Card (5 cols) */}
          <div className="lg:col-span-5">
            <CardTilt maxTilt={8} className="h-full">
              <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-cobalt-500/50 backdrop-blur-xl h-full flex flex-col justify-between transition-all group">
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 group-hover:scale-105 group-hover:border-cobalt-400 transition-all">
                        <LinkedinIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">LinkedIn Network</h3>
                        <p className="text-xs font-mono text-cobalt-300">Professional Profile</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-300 font-light leading-relaxed">
                    Connect with me on LinkedIn for professional internships, engineering collaborations, academic projects, and industry networking.
                  </p>

                  {/* Profile Preview Box */}
                  <div className="p-5 rounded-2xl bg-gray-950/70 border border-white/5 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-cobalt-950/60 border-2 border-cobalt-500 shadow-md flex items-end justify-center">
                        <img
                          src="/profile-transparent.png"
                          alt="Mohammed Abbas S"
                          className="w-full h-full object-contain object-bottom"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Mohammed Abbas S</div>
                        <div className="text-xs text-gray-400">CSE (AIML) Student • Jain University</div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/5 space-y-1.5 text-xs text-gray-300">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cobalt-400 shrink-0" />
                        <span>Open to Summer 2026 AI/ML Engineering Internships</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cobalt-400 shrink-0" />
                        <span>Bengaluru, Karnataka, India</span>
                      </div>
                    </div>
                  </div>

                  {/* Big Connect Call to Action */}
                  <a
                    href="https://www.linkedin.com/in/mohammed-abbas-s-4754b1401"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-white bg-cobalt-600 hover:bg-cobalt-500 shadow-[0_0_25px_rgba(0,71,171,0.5)] hover:shadow-[0_0_35px_rgba(0,71,171,0.8)] transition-all"
                  >
                    <span>Connect on LinkedIn</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 text-xs font-mono text-gray-400 text-center">
                  Verified Student & Developer Profile
                </div>

              </div>
            </CardTilt>
          </div>

        </div>

      </div>
    </section>
  );
};
