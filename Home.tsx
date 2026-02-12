
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, BookOpen, Clock, Zap, Target, Layers } from 'lucide-react';

const TypingHeadline = () => {
  const phrases = ["Awareness.", "Responsibility.", "Control."];
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

const Home: React.FC = () => {
  return (
    <div className="pt-20">
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
            Building ethical habits through structured awareness training. 50 chapters of progressive decision making.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/training" className="px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all text-lg shadow-xl glow-blue">
              Start Learning
            </Link>
            <Link to="/how-it-works" className="px-10 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-all text-lg">
              Explore Chapters
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8">The Real Issue</h2>
              <div className="space-y-6 text-gray-400 text-lg">
                <p>Rules alone do not change behavior. Fines do not create integrity.</p>
                <p>True safety comes from habits that are formed through consistent, low-stakes decision making. We believe that awareness is a muscle that must be trained.</p>
                <p>DriveAware focuses on the internal monologue of the driver, shifting from reactive compliance to proactive responsibility.</p>
              </div>
            </motion.div>
            <div className="relative">
               <div className="grid grid-cols-2 gap-4">
                 <div className="glass p-8 rounded-3xl">
                    <Shield className="text-blue-400 mb-4" size={32} />
                    <h3 className="font-bold text-xl mb-2">No Punishment</h3>
                    <p className="text-gray-400 text-sm">We don't penalize. We educate through exposure.</p>
                 </div>
                 <div className="glass p-8 rounded-3xl mt-8">
                    <Layers className="text-purple-400 mb-4" size={32} />
                    <h3 className="font-bold text-xl mb-2">50 Chapters</h3>
                    <p className="text-gray-400 text-sm">A complete journey from basics to mastery.</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white/[0.02] border-y border-white/5 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 gradient-text">Structured Learning Model</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="glass p-8 rounded-[2rem] border-t-4 border-blue-500/50">
              <BookOpen className="mx-auto mb-6 text-blue-400" size={32} />
              <h3 className="text-xl font-bold mb-2">Basic Awareness</h3>
              <p className="text-gray-500 text-sm">Chapters 1-10</p>
            </div>
            <div className="glass p-8 rounded-[2rem] border-t-4 border-purple-500/50">
              <Zap className="mx-auto mb-6 text-purple-400" size={32} />
              <h3 className="text-xl font-bold mb-2">Situational Thinking</h3>
              <p className="text-gray-500 text-sm">Chapters 11-25</p>
            </div>
            <div className="glass p-8 rounded-[2rem] border-t-4 border-pink-500/50">
              <Target className="mx-auto mb-6 text-pink-400" size={32} />
              <h3 className="text-xl font-bold mb-2">Emotional Control</h3>
              <p className="text-gray-500 text-sm">Chapters 26-40</p>
            </div>
            <div className="glass p-8 rounded-[2rem] border-t-4 border-green-500/50">
              <Shield className="mx-auto mb-6 text-green-400" size={32} />
              <h3 className="text-xl font-bold mb-2">Advanced Ethics</h3>
              <p className="text-gray-500 text-sm">Chapters 41-50</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Clock className="mx-auto mb-8 text-white" size={48} />
          <h2 className="text-4xl font-bold mb-6">Real-Time Decision Timer</h2>
          <p className="text-xl text-gray-400 mb-12">
            In the real world, you don't have forever to choose. Every scenario in DriveAware has a strict 60-second limit to simulate the pressure of the road.
          </p>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden max-w-md mx-auto">
             <motion.div 
               initial={{ width: "100%" }}
               whileInView={{ width: "0%" }}
               transition={{ duration: 3, repeat: Infinity }}
               className="h-full bg-blue-500"
             />
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-blue-500/5 text-center">
        <h2 className="text-4xl font-bold mb-8">Start Your Journey</h2>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Join a community of drivers dedicated to making roads safer through personal responsibility.
        </p>
        <Link to="/training" className="px-12 py-5 bg-white text-black font-bold rounded-full shadow-2xl hover:bg-gray-200 transition-all text-lg">
          Begin Chapter 1
        </Link>
      </section>
    </div>
  );
};

export default Home;

