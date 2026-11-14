import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CardTilt } from '../components/CardTilt';
import { GithubIcon } from '../components/Icons';

interface Project {
  id: string;
  title: string;
  category: 'AI/ML' | 'Full-Stack' | 'Algorithms';
  subtitle: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoUrl?: string;
  metrics: string;
  gradient: string;
}

export const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'AI/ML' | 'Full-Stack' | 'Algorithms'>('All');

  const projects: Project[] = [
    {
      id: 'proj-1',
      title: 'Neural Vision Classifier & Edge Detection',
      category: 'AI/ML',
      subtitle: 'Computer Vision & Deep Learning',
      description:
        'A convolutional neural network pipeline built with Python and PyTorch for multi-class image classification and feature boundary extraction with real-time inference optimization.',
      technologies: ['Python', 'PyTorch', 'OpenCV', 'NumPy', 'Matplotlib'],
      githubUrl: 'https://github.com/Abbas0307',
      demoUrl: '#',
      metrics: 'Accuracy ~92% on Test Benchmark',
      gradient: 'from-blue-600/30 via-cobalt-600/20 to-slate-900',
    },
    {
      id: 'proj-2',
      title: 'FastAPI 3D Intelligent Portfolio & CRM Backend',
      category: 'Full-Stack',
      subtitle: 'Modern Full-Stack Architecture',
      description:
        'The production-grade full-stack website you are currently exploring! Engineered with FastAPI, SQLAlchemy ORM, JWT authentication, and interactive Three.js 3D web graphics.',
      technologies: ['FastAPI', 'Python 3.12', 'SQLAlchemy', 'React', 'TypeScript', 'Three.js'],
      githubUrl: 'https://github.com/Abbas0307',
      demoUrl: 'http://127.0.0.1:8000/docs',
      metrics: 'Sub-50ms API Latency',
      gradient: 'from-cobalt-600/30 via-indigo-600/20 to-slate-900',
    },
    {
      id: 'proj-3',
      title: 'Predictive Machine Learning Data Analytics Engine',
      category: 'AI/ML',
      subtitle: 'Predictive Modeling & Statistical Analysis',
      description:
        'A comprehensive exploratory data analysis and predictive pipeline evaluating regression and ensemble classification models on real-world benchmark datasets.',
      technologies: ['Python', 'Scikit-Learn', 'Pandas', 'Seaborn', 'SciPy'],
      githubUrl: 'https://github.com/Abbas0307',
      demoUrl: '#',
      metrics: 'Comprehensive Cross-Validation',
      gradient: 'from-indigo-600/30 via-blue-600/20 to-slate-900',
    },
    {
      id: 'proj-4',
      title: 'Algorithmic Problem Solving & Data Structures Suite',
      category: 'Algorithms',
      subtitle: 'Core Computational Logic',
      description:
        'A curated implementation repository of essential computer science algorithms, graph traversal engines (BFS/DFS, Dijkstra), sorting benchmarks, and dynamic programming patterns.',
      technologies: ['Python', 'C', 'Java', 'Data Structures', 'Complexity Analysis'],
      githubUrl: 'https://github.com/Abbas0307',
      demoUrl: '#',
      metrics: 'Optimized Big-O Time & Space Complexity',
      gradient: 'from-blue-700/30 via-cobalt-700/20 to-slate-900',
    },
  ];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-gray-950/80 border-t border-white/5">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-cobalt-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cobalt-500/10 border border-cobalt-500/30 text-cobalt-300 text-xs font-mono uppercase tracking-wider">
              Featured Work
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Things I've Built
            </h2>
            <p className="text-gray-300 text-sm sm:text-base font-light">
              Showcasing hands-on engineering, machine learning pipelines, and software projects.
              Each card is backed by source code repositories and verifiable technical implementations.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            {(['All', 'AI/ML', 'Full-Stack', 'Algorithms'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  filter === cat
                    ? 'bg-cobalt-600 text-white shadow-[0_0_15px_rgba(0,71,171,0.5)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Interactive Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <CardTilt key={project.id} maxTilt={10} className="h-full">
              <div className="p-7 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-cobalt-500/50 backdrop-blur-xl h-full flex flex-col justify-between transition-all duration-300 group">
                
                <div>
                  {/* Top Visual Showcase Header */}
                  <div
                    className={`h-48 rounded-2xl bg-gradient-to-br ${project.gradient} border border-white/10 p-5 flex flex-col justify-between relative overflow-hidden mb-6 group-hover:border-cobalt-500/40 transition-all`}
                  >
                    {/* Futuristic Grid Pattern Overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(#0047AB_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

                    <div className="flex items-center justify-between relative z-10">
                      <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-gray-950/80 text-cobalt-300 border border-cobalt-500/30 backdrop-blur-md">
                        {project.category}
                      </span>
                      <span className="text-xs font-mono text-gray-300 bg-gray-950/60 px-2 py-0.5 rounded border border-white/10">
                        {project.metrics}
                      </span>
                    </div>

                    <div className="relative z-10">
                      <div className="text-xs font-mono text-cobalt-300 uppercase tracking-wider">
                        {project.subtitle}
                      </div>
                      <h3 className="text-xl font-bold text-white tracking-tight mt-1 group-hover:translate-x-1 transition-transform">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-300 leading-relaxed font-light mb-6">
                    {project.description}
                  </p>

                  {/* Technologies Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.04] text-gray-300 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono text-gray-300 hover:text-white transition-colors"
                  >
                    <GithubIcon className="w-4 h-4 text-cobalt-400" />
                    <span>View Repository</span>
                  </a>

                  {project.demoUrl && project.demoUrl !== '#' ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium text-white bg-cobalt-600/80 hover:bg-cobalt-500 border border-cobalt-500/50 shadow-[0_0_15px_rgba(0,71,171,0.3)] transition-all"
                    >
                      <span>Live Swagger / API</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-[11px] font-mono text-gray-500 italic">
                      Academic Demo on Request
                    </span>
                  )}
                </div>

              </div>
            </CardTilt>
          ))}
        </div>

      </div>
    </section>
  );
};
