
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
          <p className="text-2xl text-gray-300 leading-relaxed italic">
            "To build ethical drivers, not fearful drivers."
          </p>
        </motion.div>

        <div className="space-y-32">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-6">The Vision</h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Safer roads are not just about better technology or stricter laws. They are about the human behind the wheel.
                DriveAware envisions a world where every driver understands their profound responsibility to the community.
              </p>
              <p className="text-gray-400 leading-relaxed">
                By focusing on awareness and responsible thinking, we are creating a long-term shift in how people behave 
                on the road, even when no one is watching.
              </p>
            </div>
            <div className="order-1 md:order-2 glass aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img src="https://picsum.photos/seed/vision/600/600" alt="Vision" className="w-full h-full object-cover opacity-50" />
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-8 glass rounded-3xl">
              <h3 className="text-xl font-bold mb-4">Integrity</h3>
              <p className="text-sm text-gray-400">Doing what is right because it protects life, not because it avoids a fine.</p>
            </div>
            <div className="p-8 glass rounded-3xl">
              <h3 className="text-xl font-bold mb-4">Focus</h3>
              <p className="text-sm text-gray-400">Total mental presence while operating a vehicle. Zero distractions.</p>
            </div>
            <div className="p-8 glass rounded-3xl">
              <h3 className="text-xl font-bold mb-4">Respect</h3>
              <p className="text-sm text-gray-400">Treating every road user as a family member who deserves to be safe.</p>
            </div>
          </section>

          <section className="py-20 bg-white/5 rounded-[3rem] px-12 text-center">
            <h2 className="text-4xl font-bold mb-8">Professional Excellence</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              DriveAware is designed by behavioral experts and safety professionals to provide a serious, 
              high-impact learning environment. We don't play games with safety; we build character for life.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
