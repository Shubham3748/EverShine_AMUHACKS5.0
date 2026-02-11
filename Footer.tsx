
import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative mt-20 pt-20 pb-10 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-bold mb-6 gradient-text">DriveAware</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Building safer roads through ethical decision-making and cognitive awareness. 
              Join the movement for responsible mobility.
            </p>
            <div className="flex space-x-4">
              <Twitter size={20} className="text-gray-500 hover:text-blue-400 cursor-pointer transition-colors" />
              <Instagram size={20} className="text-gray-500 hover:text-pink-400 cursor-pointer transition-colors" />
              <Linkedin size={20} className="text-gray-500 hover:text-blue-600 cursor-pointer transition-colors" />
              <Github size={20} className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Platform</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/training" className="text-gray-400 hover:text-white transition-colors">Training</Link></li>
              <li><Link to="/how-it-works" className="text-gray-400 hover:text-white transition-colors">Methodology</Link></li>
              <li><Link to="/progress" className="text-gray-400 hover:text-white transition-colors">Insights</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><span className="text-gray-400 cursor-default">Privacy Policy</span></li>
              <li><span className="text-gray-400 cursor-default">Terms of Use</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Stay updated with ethical driving tips.</p>
            <div className="flex bg-white/5 border border-white/10 rounded-lg p-1">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-transparent border-none outline-none text-sm px-3 py-2 w-full text-white"
              />
              <button className="bg-white text-black text-xs font-bold px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} DriveAware. All rights reserved.</p>
          <div className="flex space-x-8">
            <span>Empowering Drivers</span>
            <span>Ethical Mobility</span>
            <span>Social Impact</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
