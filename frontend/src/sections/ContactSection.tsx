import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Sparkles, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { apiService } from '../services/api';
import type { ContactFormData } from '../services/api';
import { CardTilt } from '../components/CardTilt';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    full_name: '',
    email: '',
    phone: '',
    organization: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [loading, setLoading] = useState(false);
  const [successResponse, setSuccessResponse] = useState<{ message: string; enquiry_id: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic frontend validation
    if (!formData.full_name.trim() || formData.full_name.trim().length < 2) {
      setErrorMessage('Please enter your full name (at least 2 characters).');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      setErrorMessage('Please enter a subject line (at least 3 characters).');
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setErrorMessage('Please write a message with at least 10 characters.');
      return;
    }

    setLoading(true);

    try {
      const response = await apiService.submitContact(formData);
      setSuccessResponse({
        message: response.message,
        enquiry_id: response.enquiry_id,
      });

      // Fire celebratory confetti!
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0047AB', '#589efc', '#ffffff', '#bbd9ff'],
      });

      // Clear form
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        organization: '',
        subject: '',
        message: '',
        honeypot: '',
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while transmitting your message. Please verify backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-gray-950 border-t border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cobalt-600/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cobalt-500/10 border border-cobalt-500/30 text-cobalt-300 text-xs font-mono uppercase tracking-wider">
            Start a Conversation
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Have an Idea? Let's Connect.
          </h2>
          <p className="text-gray-300 text-base sm:text-lg font-light leading-relaxed">
            Whether you have an inquiry regarding internships, collaborative artificial intelligence research,
            or software development, my inbox is always open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Details & Information (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Cards */}
            <div className="space-y-4">
              
              {/* Email Card */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cobalt-500/50 backdrop-blur-md transition-all group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 rounded-xl bg-cobalt-500/10 border border-cobalt-500/30 text-cobalt-400 group-hover:bg-cobalt-500 group-hover:text-white transition-all">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-gray-400">Direct Email</div>
                      <a
                        href="mailto:abbas.cse36@gmail.com"
                        className="text-sm font-semibold text-white hover:text-cobalt-300 transition-colors"
                      >
                        abbas.cse36@gmail.com
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('abbas.cse36@gmail.com', 'email')}
                    title="Copy Email"
                    className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                  >
                    {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Phone Card */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cobalt-500/50 backdrop-blur-md transition-all group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 rounded-xl bg-cobalt-500/10 border border-cobalt-500/30 text-cobalt-400 group-hover:bg-cobalt-500 group-hover:text-white transition-all">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-gray-400">Mobile Phone</div>
                      <a
                        href="tel:+918867055236"
                        className="text-sm font-semibold text-white hover:text-cobalt-300 transition-colors"
                      >
                        +91 8867055236
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy('+918867055236', 'phone')}
                    title="Copy Phone"
                    className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                  >
                    {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Location Card */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md transition-all">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-cobalt-500/10 border border-cobalt-500/30 text-cobalt-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-gray-400">Location</div>
                    <div className="text-sm font-semibold text-white">
                      Bengaluru, Karnataka, India
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Architecture Assurance Note */}
            <div className="p-5 rounded-2xl bg-cobalt-950/40 border border-cobalt-500/30 backdrop-blur-md space-y-2">
              <div className="flex items-center gap-2 text-cobalt-300 font-mono text-xs font-semibold">
                <Sparkles className="w-4 h-4 text-cobalt-400" />
                <span>Connected Python FastAPI REST Backend</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-light">
                Submissions trigger automated backend validation, assign a distinct Enquiry ID, and persist
                securely to the database for private administrative management.
              </p>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <CardTilt maxTilt={6}>
              <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl relative">
                
                {/* Success Banner */}
                {successResponse && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-8 p-6 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 backdrop-blur-md space-y-3"
                  >
                    <div className="flex items-center gap-2.5 text-emerald-400 font-semibold text-base">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Message Successfully Received!</span>
                    </div>
                    <p className="text-sm text-emerald-200/90 leading-relaxed">
                      "Thank you for reaching out! Your message has been received. I'll get back to you soon."
                    </p>
                    <div className="pt-2 flex items-center justify-between text-xs font-mono text-emerald-300 border-t border-emerald-500/20">
                      <span>Unique Reference ID:</span>
                      <span className="font-bold bg-emerald-500/20 px-2.5 py-1 rounded border border-emerald-500/30">
                        {successResponse.enquiry_id}
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Error Banner */}
                {errorMessage && (
                  <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-200 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot field (hidden from human visitors to catch spam bots) */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="honeypot"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.honeypot}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-gray-300 mb-1.5">
                        Full Name <span className="text-cobalt-400">*</span>
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        required
                        value={formData.full_name}
                        onChange={handleChange}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-4 py-3 rounded-xl bg-gray-950/70 border border-white/10 text-white text-sm focus:border-cobalt-500 focus:ring-1 focus:ring-cobalt-500 outline-none transition-all placeholder:text-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-gray-300 mb-1.5">
                        Email Address <span className="text-cobalt-400">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. sarah@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-gray-950/70 border border-white/10 text-white text-sm focus:border-cobalt-500 focus:ring-1 focus:ring-cobalt-500 outline-none transition-all placeholder:text-gray-600"
                      />
                    </div>
                  </div>

                  {/* Phone and Organization (Optional) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-gray-300 mb-1.5">
                        Phone Number <span className="text-gray-500 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 9876543210"
                        className="w-full px-4 py-3 rounded-xl bg-gray-950/70 border border-white/10 text-white text-sm focus:border-cobalt-500 focus:ring-1 focus:ring-cobalt-500 outline-none transition-all placeholder:text-gray-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-gray-300 mb-1.5">
                        Organization <span className="text-gray-500 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="Company or University"
                        className="w-full px-4 py-3 rounded-xl bg-gray-950/70 border border-white/10 text-white text-sm focus:border-cobalt-500 focus:ring-1 focus:ring-cobalt-500 outline-none transition-all placeholder:text-gray-600"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-mono text-gray-300 mb-1.5">
                      Subject <span className="text-cobalt-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. AI Engineering Collaboration / Internship Inquiry"
                      className="w-full px-4 py-3 rounded-xl bg-gray-950/70 border border-white/10 text-white text-sm focus:border-cobalt-500 focus:ring-1 focus:ring-cobalt-500 outline-none transition-all placeholder:text-gray-600"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono text-gray-300 mb-1.5">
                      Message <span className="text-cobalt-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share details regarding your idea, opportunity, or inquiry..."
                      className="w-full px-4 py-3 rounded-xl bg-gray-950/70 border border-white/10 text-white text-sm focus:border-cobalt-500 focus:ring-1 focus:ring-cobalt-500 outline-none transition-all placeholder:text-gray-600 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-2xl font-semibold text-white bg-cobalt-600 hover:bg-cobalt-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_25px_rgba(0,71,171,0.5)] hover:shadow-[0_0_35px_rgba(0,71,171,0.8)] transition-all flex items-center justify-center gap-2 group"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Transmitting to Server...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>

              </div>
            </CardTilt>
          </div>

        </div>

      </div>
    </section>
  );
};
