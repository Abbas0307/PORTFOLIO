import React, { useState } from 'react';
import { Terminal, Cpu, Globe, Wrench, Plus } from 'lucide-react';
import { CardTilt } from '../components/CardTilt';

interface Skill {
  name: string;
  level: string;
  proficiency: number;
  tag: string;
  note: string;
}

interface SkillCategory {
  id: string;
  title: string;
  icon: any;
  color: string;
  description: string;
  skills: Skill[];
}

export const SkillsSection: React.FC = () => {
  const [categories, setCategories] = useState<SkillCategory[]>([
    {
      id: 'programming',
      title: 'Programming Languages',
      icon: Terminal,
      color: 'from-blue-600 to-cobalt-600',
      description: 'Foundational algorithmic coding and structured software principles.',
      skills: [
        {
          name: 'Python',
          level: 'Foundational',
          proficiency: 78,
          tag: 'Core Focus',
          note: 'Foundational programming knowledge, automation scripts, and data processing.',
        },
        {
          name: 'Java',
          level: 'Foundational',
          proficiency: 70,
          tag: 'OOP',
          note: 'Understanding of core programming concepts and object-oriented principles.',
        },
        {
          name: 'C',
          level: 'Foundational',
          proficiency: 72,
          tag: 'Structured',
          note: 'Fundamentals of structured programming, pointers, and memory mechanics.',
        },
        {
          name: 'Problem Solving',
          level: 'Proficient',
          proficiency: 82,
          tag: 'Logic',
          note: 'Logical thinking, algorithmic step decomposition, and debugging.',
        },
      ],
    },
    {
      id: 'aiml',
      title: 'AI & Machine Learning',
      icon: Cpu,
      color: 'from-cobalt-500 to-indigo-600',
      description: 'Specialization coursework and emerging cognitive computing practices.',
      skills: [
        {
          name: 'Artificial Intelligence',
          level: 'Academic / Exploring',
          proficiency: 75,
          tag: 'Specialization',
          note: 'Search algorithms, heuristic logic, and intelligent agent principles.',
        },
        {
          name: 'Machine Learning',
          level: 'Academic / Exploring',
          proficiency: 72,
          tag: 'Predictive',
          note: 'Supervised & unsupervised learning models, regression, and clustering basics.',
        },
        {
          name: 'Data Science',
          level: 'Foundational',
          proficiency: 68,
          tag: 'Analytics',
          note: 'Exploratory data analysis, data cleansing, and feature representation.',
        },
      ],
    },
    {
      id: 'development',
      title: 'Web & Backend Development',
      icon: Globe,
      color: 'from-indigo-600 to-blue-700',
      description: 'Modern front-end styling and robust Python-driven server services.',
      skills: [
        {
          name: 'HTML5 & Modern Markup',
          level: 'Proficient',
          proficiency: 85,
          tag: 'Web',
          note: 'Semantic structure, accessibility standards, and SEO hygiene.',
        },
        {
          name: 'CSS3 & Tailwind CSS',
          level: 'Proficient',
          proficiency: 80,
          tag: 'UI/UX',
          note: 'Responsive grid systems, flexbox layouts, glassmorphism, and styling.',
        },
        {
          name: 'JavaScript (ES6+)',
          level: 'Foundational',
          proficiency: 74,
          tag: 'Frontend',
          note: 'Interactive DOM manipulation, asynchronous promises, and API fetching.',
        },
        {
          name: 'Backend Development',
          level: 'Foundational',
          proficiency: 72,
          tag: 'FastAPI / REST',
          note: 'RESTful API routing, database schema modeling, and CORS architecture.',
        },
      ],
    },
    {
      id: 'tools',
      title: 'Developer Tools & Ecosystem',
      icon: Wrench,
      color: 'from-blue-700 to-cobalt-800',
      description: 'Version control workflows and everyday engineering productivity toolchain.',
      skills: [
        {
          name: 'Git',
          level: 'Proficient',
          proficiency: 80,
          tag: 'VCS',
          note: 'Branching strategies, commit history, merge tracking, and workflow management.',
        },
        {
          name: 'GitHub',
          level: 'Proficient',
          proficiency: 82,
          tag: 'Collaboration',
          note: 'Remote repositories, issue tracking, markdown documentation, and GitHub Pages.',
        },
        {
          name: 'VS Code',
          level: 'Proficient',
          proficiency: 88,
          tag: 'IDE',
          note: 'Linting, integrated terminals, interactive debugging, and productivity extensions.',
        },
      ],
    },
  ]);

  const [activeTab, setActiveTab] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('programming');
  const [newSkillLevel, setNewSkillLevel] = useState('Foundational');
  const [newSkillNote, setNewSkillNote] = useState('');

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === newSkillCategory) {
          return {
            ...cat,
            skills: [
              ...cat.skills,
              {
                name: newSkillName.trim(),
                level: newSkillLevel,
                proficiency: 70,
                tag: 'Custom',
                note: newSkillNote.trim() || 'Custom skill added by user.',
              },
            ],
          };
        }
        return cat;
      })
    );

    setNewSkillName('');
    setNewSkillNote('');
    setShowAddModal(false);
  };

  const filteredCategories = activeTab === 'all'
    ? categories
    : categories.filter((c) => c.id === activeTab);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-gray-950">
      {/* Glow Effects */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-cobalt-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cobalt-500/10 border border-cobalt-500/30 text-cobalt-300 text-xs font-mono uppercase tracking-wider">
              Technical Arsenal
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Technical Skills & Proficiencies
            </h2>
            <p className="text-gray-300 text-sm sm:text-base font-light">
              Organized into structured technical domains. Transparently rated reflecting current academic
              and foundational engineering mastery.
            </p>
          </div>

          {/* Add Skill Button (Editable Placeholder Requirement) */}
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium text-white bg-white/5 hover:bg-cobalt-600/20 border border-white/10 hover:border-cobalt-500/50 transition-all"
          >
            <Plus className="w-4 h-4 text-cobalt-400" />
            <span>Customize / Add Skill</span>
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-white/10">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
              activeTab === 'all'
                ? 'bg-cobalt-600 text-white shadow-[0_0_15px_rgba(0,71,171,0.5)]'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            All Disciplines
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                activeTab === cat.id
                  ? 'bg-cobalt-600 text-white shadow-[0_0_15px_rgba(0,71,171,0.5)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="space-y-10">
          {filteredCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.id} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cobalt-500/10 border border-cobalt-500/30 text-cobalt-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">{category.title}</h3>
                    <p className="text-xs text-gray-400">{category.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {category.skills.map((skill) => (
                    <CardTilt key={skill.name} maxTilt={12} className="h-full">
                      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cobalt-500/50 backdrop-blur-md h-full flex flex-col justify-between transition-all duration-300 group">
                        
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cobalt-500/10 text-cobalt-300 border border-cobalt-500/20">
                              {skill.tag}
                            </span>
                            <span className="text-[11px] font-mono text-gray-400">{skill.level}</span>
                          </div>

                          <h4 className="text-lg font-bold text-white group-hover:text-cobalt-200 transition-colors">
                            {skill.name}
                          </h4>

                          <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                            {skill.note}
                          </p>
                        </div>

                        {/* Visual Proficiency Bar */}
                        <div className="mt-5 pt-3 border-t border-white/5 space-y-1.5">
                          <div className="flex justify-between text-[11px] font-mono text-gray-400">
                            <span>Knowledge Level</span>
                            <span className="text-cobalt-300">{skill.proficiency}%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-cobalt-600 to-cobalt-400 rounded-full transition-all duration-500"
                              style={{ width: `${skill.proficiency}%` }}
                            />
                          </div>
                        </div>

                      </div>
                    </CardTilt>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for adding/editing skills */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="w-full max-w-md p-6 rounded-2xl bg-gray-900 border border-white/20 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Add / Customize Skill</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddSkill} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">Skill Name</label>
                  <input
                    type="text"
                    required
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    placeholder="e.g. PyTorch, Docker, SQL..."
                    className="w-full px-3 py-2 rounded-xl bg-gray-950 border border-white/10 text-white text-sm focus:border-cobalt-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">Category</label>
                  <select
                    value={newSkillCategory}
                    onChange={(e) => setNewSkillCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-gray-950 border border-white/10 text-white text-sm focus:border-cobalt-500 outline-none"
                  >
                    <option value="programming">Programming Languages</option>
                    <option value="aiml">AI & Machine Learning</option>
                    <option value="development">Web & Backend Development</option>
                    <option value="tools">Developer Tools & Ecosystem</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">Proficiency Status</label>
                  <select
                    value={newSkillLevel}
                    onChange={(e) => setNewSkillLevel(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-gray-950 border border-white/10 text-white text-sm focus:border-cobalt-500 outline-none"
                  >
                    <option value="Foundational">Foundational</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Proficient">Proficient</option>
                    <option value="Exploring">Academic / Exploring</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">Description / Notes</label>
                  <input
                    type="text"
                    value={newSkillNote}
                    onChange={(e) => setNewSkillNote(e.target.value)}
                    placeholder="Short description of experience..."
                    className="w-full px-3 py-2 rounded-xl bg-gray-950 border border-white/10 text-white text-sm focus:border-cobalt-500 outline-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl text-xs text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-cobalt-600 hover:bg-cobalt-500"
                  >
                    Save Skill
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
