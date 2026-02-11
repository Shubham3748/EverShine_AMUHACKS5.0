
import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, PlayCircle, ClipboardCheck, MessageSquare, ShieldCheck, TrendingUp } from 'lucide-react';

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
    { icon: UserPlus, title: "Create Account", desc: "Start your journey by setting up your anonymous profile. No sensitive data needed." },
    { icon: PlayCircle, title: "Choose Training", desc: "Select from curated scenario modules focusing on specific urban and rural challenges." },
    { icon: ClipboardCheck, title: "Complete Sessions", desc: "Interact with 10 detailed scenarios per session, each designed to test your reflexes." },
    { icon: MessageSquare, title: "Receive Feedback", desc: "Get immediate, professional insights into the ethical implications of your choices." },
    { icon: ShieldCheck, title: "Build Profile", desc: "Your scores populate an ethical DNA profile across four core driving metrics." },
    { icon: TrendingUp, title: "Track Progress", desc: "Watch your awareness level rise as you consistently make life-saving decisions." },
  ];

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 gradient-text">How It Works</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A scientific approach to behavior change, broken down into six simple steps.
          </p>
        </div>

        <div className="relative">
          {/* Central Vertical Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 -translate-x-1/2 opacity-20"></div>
          
          <div className="relative z-10">
            {steps.map((step, i) => (
              <TimelineStep key={i} {...step} index={i} />
            ))}
          </div>
        </div>

        <div className="mt-32 p-16 glass rounded-[4rem] text-center border-2 border-blue-500/10">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to evolve?</h2>
          <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto">Join thousands of drivers committed to a safer, more ethical future on our roads.</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="px-12 py-5 bg-white text-black font-bold rounded-full text-xl shadow-2xl"
          >
            Start Your First Session
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
