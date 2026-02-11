
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { saveContactMessage } from '../utils/storage';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveContactMessage({
      ...formState,
      date: new Date().toISOString()
    });
    setIsSubmitted(true);
    setFormState({ name: '', email: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 gradient-text">Contact Us</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have questions about our training methodology or want to collaborate? Reach out to the DriveAware team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center shrink-0">
                <Mail className="text-blue-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-white">Email Inquiries</h3>
                <p className="text-gray-400">Our team monitors all communications and responds within 24-48 business hours.</p>
                <p className="mt-4 font-bold text-white">hello@driveaware.eth</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center shrink-0">
                <MessageCircle className="text-purple-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 text-white">Support Channels</h3>
                <p className="text-gray-400">Technical assistance is available for individual users via our local support nodes.</p>
                <p className="mt-4 font-bold text-white">@DriveAwareSupport</p>
              </div>
            </div>

            <div className="p-10 glass rounded-[3rem]">
              <h4 className="text-xl font-bold mb-4">Mailing Address</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Innovation Hub, Suite 402<br />
                San Francisco, CA 94103<br />
                United States
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-12 rounded-[3rem] relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full"></div>
            
            {isSubmitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
                <CheckCircle2 className="text-green-500 mx-auto mb-6" size={80} />
                <h2 className="text-3xl font-bold mb-4">Message Sent</h2>
                <p className="text-gray-400">Thank you for your interest. We will be in touch soon.</p>
                <button onClick={() => setIsSubmitted(false)} className="mt-10 px-8 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-blue-500 transition-all text-white"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-blue-500 transition-all text-white"
                    placeholder="name@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1">Message</label>
                  <textarea 
                    rows={5} 
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-blue-500 transition-all text-white resize-none"
                    placeholder="Tell us about your inquiry..."
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full py-5 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-all flex items-center justify-center gap-3 text-lg shadow-xl"
                >
                  <Send size={20} /> Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
