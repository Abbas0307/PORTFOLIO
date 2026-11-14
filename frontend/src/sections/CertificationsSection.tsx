import React, { useState } from 'react';
import { Award, ExternalLink, Plus, Calendar, Building2, ShieldCheck } from 'lucide-react';
import { CardTilt } from '../components/CardTilt';

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  status: 'Completed' | 'In Progress' | 'Verified';
  topics: string[];
}

export const CertificationsSection: React.FC = () => {
  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: 'cert-1',
      name: 'Python for Data Science & AI Foundations',
      issuer: 'Academic Coursework / Online Certification',
      date: '2025 – 2026',
      credentialUrl: '#',
      status: 'Verified',
      topics: ['Python Syntax', 'NumPy & Pandas', 'Data Structures', 'Algorithm Design'],
    },
    {
      id: 'cert-2',
      name: 'Foundations of Machine Learning & Neural Networks',
      issuer: 'Jain University Technical Curriculum',
      date: '2025 – Present',
      credentialUrl: '#',
      status: 'In Progress',
      topics: ['Supervised Learning', 'Loss Functions', 'Gradient Descent', 'Model Evaluation'],
    },
    {
      id: 'cert-3',
      name: 'Structured Programming & Systems in C/Java',
      issuer: 'Department of Computer Science Engineering',
      date: '2025',
      credentialUrl: '#',
      status: 'Verified',
      topics: ['Pointers & Memory', 'OOP Paradigms', 'File Handling', 'Algorithmic Efficiency'],
    },
    {
      id: 'cert-4',
      name: 'Algorithmic Problem Solving & Code Logic',
      issuer: 'Technical Hackathon & Coding Series',
      date: 'Ongoing Practice',
      credentialUrl: '#',
      status: 'Verified',
      topics: ['Time Complexity', 'Recursion', 'Dynamic Programming', 'Graph Theory'],
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newIssuer, setNewIssuer] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newTopics, setNewTopics] = useState('');

  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    setCertifications((prev) => [
      ...prev,
      {
        id: `cert-${Date.now()}`,
        name: newName.trim(),
        issuer: newIssuer.trim() || 'Issuing Organization',
        date: newDate.trim() || '2026',
        credentialUrl: newUrl.trim() || '#',
        status: 'Verified',
        topics: newTopics ? newTopics.split(',').map((t) => t.trim()) : ['Computer Science'],
      },
    ]);

    setNewName('');
    setNewIssuer('');
    setNewDate('');
    setNewUrl('');
    setNewTopics('');
    setShowModal(false);
  };

  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-gray-950/70 border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cobalt-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cobalt-500/10 border border-cobalt-500/30 text-cobalt-300 text-xs font-mono uppercase tracking-wider">
              Verification & Recognition
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Certifications & Achievements
            </h2>
            <p className="text-gray-300 text-sm sm:text-base font-light">
              Formal credentials, verified academic certifications, and ongoing skill specializations.
              Configured with editable placeholders for adding upcoming achievements.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium text-white bg-white/5 hover:bg-cobalt-600/20 border border-white/10 hover:border-cobalt-500/50 transition-all"
          >
            <Plus className="w-4 h-4 text-cobalt-400" />
            <span>Add Certification</span>
          </button>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert) => (
            <CardTilt key={cert.id} maxTilt={10} className="h-full">
              <div className="p-6 sm:p-7 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-cobalt-500/50 backdrop-blur-xl h-full flex flex-col justify-between transition-all duration-300 group">
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-cobalt-500/10 border border-cobalt-500/30 text-cobalt-400 group-hover:bg-cobalt-500 group-hover:text-white transition-all">
                      <Award className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-xs font-mono px-2.5 py-1 rounded-full border ${
                        cert.status === 'Verified'
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : 'bg-cobalt-500/10 border-cobalt-500/30 text-cobalt-300'
                      }`}
                    >
                      {cert.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cobalt-200 transition-colors">
                    {cert.name}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-2 font-mono">
                    <Building2 className="w-3.5 h-3.5 text-cobalt-400" />
                    <span>{cert.issuer}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-1 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-cobalt-400" />
                    <span>{cert.date}</span>
                  </div>

                  {/* Topics covered */}
                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {cert.topics.map((topic, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white/5 text-gray-300 border border-white/5"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer action link */}
                <div className="pt-5 mt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-gray-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-cobalt-400" />
                    Student Credential
                  </span>

                  {cert.credentialUrl && cert.credentialUrl !== '#' ? (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-cobalt-300 hover:text-white transition-colors"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-xs font-mono text-gray-400">
                      Editable Credential Placeholder
                    </span>
                  )}
                </div>

              </div>
            </CardTilt>
          ))}
        </div>

        {/* Modal for adding credentials */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="w-full max-w-md p-6 rounded-2xl bg-gray-900 border border-white/20 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Add Achievement / Certificate</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddCert} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">Certificate / Achievement Name</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Deep Learning Specialization"
                    className="w-full px-3 py-2 rounded-xl bg-gray-950 border border-white/10 text-white text-sm focus:border-cobalt-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">Issuing Organization / College</label>
                  <input
                    type="text"
                    required
                    value={newIssuer}
                    onChange={(e) => setNewIssuer(e.target.value)}
                    placeholder="e.g. Jain University / Coursera / AWS"
                    className="w-full px-3 py-2 rounded-xl bg-gray-950 border border-white/10 text-white text-sm focus:border-cobalt-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-gray-300 mb-1">Completion Date</label>
                    <input
                      type="text"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      placeholder="e.g. 2026"
                      className="w-full px-3 py-2 rounded-xl bg-gray-950 border border-white/10 text-white text-sm focus:border-cobalt-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-300 mb-1">Credential URL</label>
                    <input
                      type="url"
                      value={newUrl}
                      onChange={(e) => setNewUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-xl bg-gray-950 border border-white/10 text-white text-sm focus:border-cobalt-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1">Key Topics (comma-separated)</label>
                  <input
                    type="text"
                    value={newTopics}
                    onChange={(e) => setNewTopics(e.target.value)}
                    placeholder="Python, Neural Networks, PyTorch"
                    className="w-full px-3 py-2 rounded-xl bg-gray-950 border border-white/10 text-white text-sm focus:border-cobalt-500 outline-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-xl text-xs text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-cobalt-600 hover:bg-cobalt-500"
                  >
                    Add Certificate
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
