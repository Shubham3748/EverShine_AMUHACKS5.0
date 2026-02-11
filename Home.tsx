
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// Added X to the lucide-react imports to fix 'Cannot find name X' errors
import { Shield, Users, Heart, Zap, ChevronRight, BarChart3, Clock, Scale, X } from 'lucide-react';

const TypingHeadline = () => {
  const phrases = ["Awareness.", "Ethics.", "Responsibility."];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === phrases[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <span className="gradient-text">
      {phrases[index].substring(0, subIndex)}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const FeatureCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="glass p-8 rounded-3xl group"
  >
    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
      <Icon className="text-blue-400 group-hover:text-blue-300 transition-colors" size={24} />
    </div>
    <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

const Home: React.FC = () => {
  return (
    <div className="pt-20">
      {/* 1. Hero Section */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full -z-10"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 leading-tight">
            Drive with <br />
            <TypingHeadline />
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Building safer roads through better decisions. Experience the next generation of ethical mobility training.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/training" className="px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all text-lg shadow-xl glow-blue">
              Start Training
            </Link>
            <Link to="/about" className="px-10 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all text-lg">
              Learn More
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 2. The Real Problem */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Why Rules Are <br /><span className="text-gray-500">Not Enough</span></h2>
              <div className="space-y-6 text-gray-400 text-lg">
                <p>Rules exist. Fines exist. Yet, accidents still happen every second across the globe.</p>
                <p>The problem is simple: habits are not built through punishment. People often follow rules only when they feel watched.</p>
                <p>True safety comes from within—from a mindset that understands the human impact of every turn and every brake.</p>
              </div>
            </motion.div>
            <div className="relative">
              <div className="aspect-video glass rounded-3xl overflow-hidden shadow-2xl">
                <img src="https://picsum.photos/seed/driving/800/600" alt="Driving" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Approach */}
      <section className="py-32 bg-white/[0.02] border-y border-white/5 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 gradient-text">A Better Way to Learn</h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-10">
              DriveAware shifts the focus from technical skill to behavioral integrity. We help you think before you react, 
              fostering an intuitive understanding of your role within the community.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="glass p-6 rounded-2xl">
                <h4 className="font-bold text-blue-400 mb-2">Zero Punishment</h4>
                <p className="text-sm text-gray-400">We replace fear of fines with the pride of ethical excellence.</p>
              </div>
              <div className="glass p-6 rounded-2xl">
                <h4 className="font-bold text-purple-400 mb-2">Pure Awareness</h4>
                <p className="text-sm text-gray-400">We visualize the unseen consequences of small driving choices.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. How it Works Overview */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">The Journey</h2>
            <p className="text-gray-400">Simple steps to becoming a better driver.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Face Situations</h3>
              <p className="text-gray-400 text-sm">Experience realistic scenarios designed to test your ethical reflexes.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-purple-500/20 group-hover:scale-110 transition-all">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Make Decisions</h3>
              <p className="text-gray-400 text-sm">Choose your path under pressure and see the immediate ethical feedback.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-pink-500/20 group-hover:scale-110 transition-all">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Improve Daily</h3>
              <p className="text-gray-400 text-sm">Track your progress as your awareness grows and your habits shift.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Core Features Grid */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard icon={Zap} title="Scenario Training" desc="Dynamic simulations based on real-world edge cases." />
            <FeatureCard icon={Shield} title="Real-time Feedback" desc="Understand the 'why' behind every ethical decision you make." />
            <FeatureCard icon={Scale} title="Score Tracking" desc="Monitor four distinct metrics of your driving personality." />
            <FeatureCard icon={BarChart3} title="Behavior Insights" desc="Deep data on your tendencies under stress and fatigue." />
            <FeatureCard icon={Clock} title="Progress Monitoring" desc="Long-term historical data showing your journey upwards." />
            <FeatureCard icon={Heart} title="Habit Building" desc="Scientific approach to turning awareness into muscle memory." />
          </div>
        </div>
      </section>

      {/* 6. Ethical Profile Section */}
      <section className="py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Your Ethical DNA</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Patience', color: 'border-blue-500/50', text: 'How well you handle delays and slow traffic without frustration.' },
              { label: 'Empathy', color: 'border-purple-500/50', text: 'Your consideration for pedestrians, cyclists, and other drivers.' },
              { label: 'Risk Awareness', color: 'border-pink-500/50', text: 'Ability to foresee hazards before they become dangerous.' },
              { label: 'Rule Respect', color: 'border-green-500/50', text: 'Following laws even when it is inconvenient or unmonitored.' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`p-8 glass rounded-3xl border-t-4 ${item.color}`}
              >
                <h4 className="text-2xl font-bold mb-4">{item.label}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Real Progress Visuals */}
      <section className="py-32 px-6 relative">
        <div className="absolute top-1/2 left-0 w-full h-[300px] bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 blur-[100px] -z-10"></div>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">Visualization of <br />Growth</h2>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                See how your driving mindset changes over time with our intuitive analytics dashboard. 
                We map your decisions to reveal the transformation from a reactive driver to a community protector.
              </p>
              <div className="space-y-6">
                <div className="w-full bg-white/5 rounded-full h-2">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '75%' }} transition={{ duration: 1.5 }} className="h-full bg-blue-500 rounded-full"></motion.div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 uppercase tracking-widest">
                  <span>Awareness Growth</span>
                  <span>75%</span>
                </div>
              </div>
            </div>
            <div className="glass p-8 rounded-3xl aspect-square flex flex-col items-center justify-center">
              <div className="w-48 h-48 border-[12px] border-white/5 rounded-full relative flex items-center justify-center">
                <div className="absolute inset-0 border-[12px] border-t-blue-500 border-r-purple-500 border-b-pink-500 border-l-transparent rounded-full rotate-45 animate-spin-slow"></div>
                <div className="text-center">
                  <span className="text-5xl font-bold block">84</span>
                  <span className="text-xs text-gray-500 uppercase">Ethical Score</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Why We Are Different */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">A Different Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-8 border border-red-500/20 rounded-3xl bg-red-500/5">
              <h4 className="text-red-400 font-bold mb-6 uppercase tracking-wider text-sm">Traditional Systems</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  {/* Fixed missing X icon from lucide-react */}
                  <X className="text-red-500 shrink-0 mt-1" size={16} />
                  <span>Focus on punishing mistakes after they happen.</span>
                </li>
                <li className="flex items-start gap-3">
                  {/* Fixed missing X icon from lucide-react */}
                  <X className="text-red-500 shrink-0 mt-1" size={16} />
                  <span>Temporary compliance based on fear of fines.</span>
                </li>
              </ul>
            </div>
            <div className="p-8 border border-green-500/20 rounded-3xl bg-green-500/5">
              <h4 className="text-green-400 font-bold mb-6 uppercase tracking-wider text-sm">DriveAware Approach</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <ChevronRight className="text-green-500 shrink-0 mt-1" size={16} />
                  <span>Focus on building better habits before they fail.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ChevronRight className="text-green-500 shrink-0 mt-1" size={16} />
                  <span>Long-term awareness driven by personal values.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Social Impact */}
      <section className="py-32 px-6 bg-white/[0.02] text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold mb-12">Beyond the Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div>
                <h4 className="text-3xl font-bold text-white mb-2">Safer Roads</h4>
                <p className="text-sm text-gray-500">Reducing statistics through individual choice.</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-white mb-2">Safer Families</h4>
                <p className="text-sm text-gray-500">Bringing everyone home at the end of the day.</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-white mb-2">Safer Cities</h4>
                <p className="text-sm text-gray-500">Creating a harmonious flow of urban mobility.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 10. Final CTA */}
      <section className="py-40 px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto glass p-16 rounded-[4rem]"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-12 leading-tight">
            Start driving <br /><span className="gradient-text">differently.</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/training" className="px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all text-lg shadow-2xl">
              Create Account
            </Link>
            <Link to="/training" className="px-10 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all text-lg">
              Begin First Session
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
