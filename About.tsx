
import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-8 gradient-text">Our Mission</h1>
          <p className="text-2xl text-gray-300 leading-relaxed">
            We exist to help you become the driver you want to be. Not through rules, but through understanding.
          </p>
        </motion.div>

        <div className="space-y-32">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-6">The Philosophy</h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Most training focuses on vehicle handling. We focus on mind handling.
              </p>
              <p className="text-gray-400 leading-relaxed">
                DriveAware is built on the belief that ethical driving is a habit. By repeatedly exposing you to complex decisions in a safe, low-stress environment, we help you build the neural pathways needed for split-second safety in the real world.
              </p>
            </div>
            <div className="order-1 md:order-2 glass aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-blue-900 to-black flex items-center justify-center">
                 <div className="text-9xl font-bold text-white/5">50</div>
              </div>
            </div>
          </section>

          <section className="py-20 bg-white/5 rounded-[3rem] px-12 text-center">
            <h2 className="text-4xl font-bold mb-8">Why Awareness?</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              An aware driver anticipates. A reactive driver survives. We want to move you from survival to anticipation.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;

