
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { getStoredUser, logoutUser } from '../utils/storage';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = getStoredUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
    window.location.reload();
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Training', path: '/training' },
    { name: 'My Progress', path: '/progress' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-3 shadow-2xl' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tighter gradient-text">
          DriveAware
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-blue-400 ${location.pathname === link.path ? 'text-blue-400' : 'text-gray-300'}`}
            >
              {link.name}
            </Link>
          ))}
          {user?.isLoggedIn ? (
            <button onClick={handleLogout} className="flex items-center space-x-2 text-gray-300 hover:text-red-400 transition-colors">
              <LogOut size={18} />
              <span className="text-sm">Logout</span>
            </button>
          ) : (
            <Link to="/training" className="px-5 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-sm font-medium transition-all">
              Get Started
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button className="lg:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-black/95 z-40 lg:hidden transition-transform duration-500 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8 px-6 text-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-2xl font-semibold tracking-tight ${location.pathname === link.path ? 'gradient-text' : 'text-white'}`}
            >
              {link.name}
            </Link>
          ))}
          {user?.isLoggedIn ? (
            <button 
              onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
              className="text-2xl font-semibold text-red-500 flex items-center gap-2"
            >
              <LogOut size={24} /> Logout
            </button>
          ) : (
            <Link 
              to="/training" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-8 py-3 bg-white text-black rounded-full font-bold text-lg"
            >
              Start Training
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
