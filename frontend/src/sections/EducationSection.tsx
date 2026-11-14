import React from 'react';
import { GraduationCap, CheckCircle2, School } from 'lucide-react';
import { CardTilt } from '../components/CardTilt';

export const EducationSection: React.FC = () => {
  const milestones = [
    {
      period: '2025 – 2029',
      institution: 'Jain University',
      degree: 'Bachelor of Technology (B.Tech)',
      specialization: 'Computer Science and Engineering (Artificial Intelligence & Machine Learning)',
      score: 'Current CGPA: 7.5 / 10.0',
      status: 'In Progress (Active Enrollment)',
      location: 'Bengaluru, Karnataka, India',
      highlights: [
        'Foundational curriculum in Artificial Intelligence architectures & Machine Learning algorithms.',
        'Core computer engineering coursework: Programming in Python, Java, C, Data Structures & Systems.',
        'Mathematics for Computing: Linear Algebra, Discrete Mathematics, Probability & Statistics.',
        'Regular laboratory coursework, peer collaborative projects, and practical coding exercises.',
      ],
      currentFocus:
        'Strengthening programming logic, mastering algorithms, and exploring practical neural network implementations.',
    },
    {
      period: 'Foundational Studies',
      institution: 'Pre-University & Secondary Education',
      degree: 'Senior Secondary Education (Science / Mathematics)',
      specialization: 'Physics, Chemistry, Mathematics & Computer Science',
      score: 'First Class Academic Excellence',
      status: 'Completed',
      location: 'Karnataka, India',
      highlights: [
        'Advanced mathematical problem solving, analytical reasoning, and structured algorithmic logic.',
        'Solid quantitative aptitude preparing for university computer science engineering studies.',
      ],
      currentFocus: 'Transition to university-level engineering and advanced computing architectures.',
    },
  ];

  return (
    <section id="education" className="py-24 relative overflow-hidden bg-gray-950">
      {/* Background glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-cobalt-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cobalt-500/10 border border-cobalt-500/30 text-cobalt-300 text-xs font-mono uppercase tracking-wider">
            Academic Journey
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Education & Academic Timeline
          </h2>
          <p className="text-gray-300 text-base sm:text-lg font-light">
            Formal engineering foundations and continuous scholastic advancement at Jain University.
          </p>
        </div>

        {/* Vertical Animated Timeline */}
        <div className="relative border-l-2 border-cobalt-600/30 ml-4 sm:ml-8 md:ml-32 space-y-12">
          {milestones.map((item) => (
            <div key={item.institution} className="relative pl-6 sm:pl-10">
              
              {/* Glowing Cobalt Node Indicator */}
              <div className="absolute -left-[17px] top-1 flex items-center justify-center">
                <div className="relative">
                  <span className="animate-ping absolute -inset-1 rounded-full bg-cobalt-400 opacity-60"></span>
                  <div className="w-8 h-8 rounded-full bg-gray-950 border-2 border-cobalt-500 flex items-center justify-center text-cobalt-300 shadow-[0_0_15px_#0047AB]">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Floating Period Badge (Desktop Left Offset) */}
              <div className="hidden md:block absolute -left-36 top-1.5 text-right w-28">
                <span className="text-xs font-mono font-bold text-cobalt-300 px-2.5 py-1 rounded-full bg-cobalt-500/10 border border-cobalt-500/30">
                  {item.period}
                </span>
              </div>

              {/* Interactive Milestone Card */}
              <CardTilt maxTilt={8}>
                <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-cobalt-500/50 backdrop-blur-xl transition-all duration-300 group">
                  
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="md:hidden text-xs font-mono font-bold text-cobalt-300 px-2.5 py-1 rounded-full bg-cobalt-500/10 border border-cobalt-500/30">
                      {item.period}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-gray-300 flex items-center gap-1.5">
                      <School className="w-3.5 h-3.5 text-cobalt-400" />
                      {item.location}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-cobalt-500/20 border border-cobalt-500/40 text-cobalt-200 font-semibold">
                      {item.score}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-cobalt-200 transition-colors">
                    {item.institution}
                  </h3>

                  <div className="text-sm font-semibold text-cobalt-300 mt-1">
                    {item.degree} — <span className="text-gray-300 font-normal">{item.specialization}</span>
                  </div>

                  <p className="text-xs text-gray-400 font-mono mt-2 mb-5">
                    Status: <span className="text-emerald-400 font-medium">{item.status}</span>
                  </p>

                  {/* Highlights Bulleted */}
                  <div className="space-y-2.5 mb-6 pt-4 border-t border-white/5">
                    {item.highlights.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-cobalt-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Current Focus Highlight */}
                  <div className="p-4 rounded-xl bg-cobalt-500/10 border border-cobalt-500/20 text-xs text-gray-300">
                    <span className="font-semibold text-cobalt-300 font-mono">Learning Focus: </span>
                    {item.currentFocus}
                  </div>

                </div>
              </CardTilt>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
