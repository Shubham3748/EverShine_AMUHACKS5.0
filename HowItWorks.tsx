
import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, PlayCircle, Clock, CheckCircle, Unlock, TrendingUp } from 'lucide-react';

const TimelineStep = ({ icon: Icon, title, desc, index }: any) => (
  <motion.div 
    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className={`flex flex-col md:flex-row items-center gap-8 mb-20 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
  >
    <div className="w-full md:w-1/2 flex justify-center">
      <div className="p-10 glass rounded-[3rem] text-center w-full max-w-sm">
        <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Icon className="text-blue-400" size={32} />
        </div>
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
    <div className="hidden md:flex w-12 h-12 bg-white/10 rounded-full items-center justify-center shrink-0 z-10">
      <div className="w-4 h-4 bg-white rounded-full"></div>
    </div>
    <div className="hidden md:block w-1/2"></div>
  </motion.div>
);

const HowItWorks: React.FC = () => {
  const steps = [
    { icon: UserPlus, title: "Initialize", desc: "Enter your name to start. We create a local profile to track your journey." },
    { icon: PlayCircle, title: "Start Chapter 1", desc: "Begin your journey with the Foundations of Awareness." },
    { icon: Clock, title: "Make Decisions", desc: "Face 10 scenarios per chapter. You have 60 seconds for each choice." },
    { icon: CheckCircle, title: "Review Feedback", desc: "Instantly understand the ethical weight of your decision." },
    { icon: Unlock, title: "Unlock Progressive", desc: "Complete a chapter to automatically unlock the next one." },
    { icon: TrendingUp, title: "Mastery", desc: "Complete all 50 chapters to achieve the highest level of awareness." },
  ];

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 gradient-text">How It Works</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Six simple steps to transforming your driving mindset.
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 -translate-x-1/2 opacity-20"></div>
          
          <div className="relative z-10">
            {steps.map((step, i) => (
              <TimelineStep key={i} {...step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
