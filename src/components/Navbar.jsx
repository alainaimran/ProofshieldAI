import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signOut, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { 
  Shield, LogOut, Zap, Archive, BookOpen, FileText, Home, 
  AlertTriangle, Users, Globe, ShieldAlert, Menu, X, ChevronDown, ShieldCheck, Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ user }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const handleSignOut = () => {
    signOut(auth);
    localStorage.removeItem('mockUser');
    window.location.href = '/';
  };

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      window.location.href = '/dashboard';
    } catch(e) {
      console.error("Firebase auth error, falling back to mock user:", e);
      localStorage.setItem('mockUser', JSON.stringify({ displayName: "Demo User", email: "demo@example.com", photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Demo" }));
      window.location.href = '/dashboard';
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const mainLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: ActivityIcon },
    { path: '/emergency', label: 'Emergency', icon: AlertTriangle },
    { path: '/image-scanner', label: 'Image Scanner', icon: ImageIcon },
  ];

  const secondaryLinks = [
    { path: '/community', label: 'Community', icon: Users },
    { path: '/intelligence', label: 'Intelligence', icon: Globe },
    { path: '/scam-detector', label: 'Scam Detector', icon: ShieldAlert },
    { path: '/vault', label: 'Case Vault', icon: Archive },
    { path: '/resources', label: 'Resources', icon: BookOpen },
    { path: '/safety-kit', label: 'Safety Kit', icon: ShieldCheck },
    { path: '/report', label: 'Report Preview', icon: FileText },
  ];

  const allLinks = [...mainLinks, ...secondaryLinks];
  const isMoreActive = secondaryLinks.some(link => location.pathname === link.path);

  return (
    <nav className="flex justify-between items-center mb-6 glass-panel px-4 md:px-6 py-4 relative z-50 shadow-2xl bg-black/40 border-b border-white/10 backdrop-blur-xl w-full">
      
      {/* Brand */}
      <div className="flex items-center gap-3">
        <Shield className="w-8 h-8 text-primary" />
        <div className="flex flex-col">
          <span className="font-bold text-lg tracking-wide leading-none text-white">ProofShield</span>
          <span className="text-[9px] text-gray-400 mt-1 uppercase tracking-wider hidden sm:flex items-center gap-1 font-bold">
            <Zap className="w-3 h-3 text-yellow-400" />
            Gemini 2.5
          </span>
        </div>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-2">
        {mainLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path || (link.path === '/' && location.pathname === '/dashboard' && mainLinks.find(l=>l.path==='/dashboard'));
          // Handle specific case where "/" redirects to "/dashboard"
          const reallyActive = location.pathname === link.path;
          return (
            <Link 
              key={link.path}
              to={link.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition font-medium ${reallyActive ? 'bg-primary/20 text-primary shadow-inner border border-primary/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <Icon className="w-4 h-4" />
              <span>{link.label}</span>
            </Link>
          );
        })}

        {/* More Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition font-medium ${isMoreActive ? 'bg-primary/20 text-primary shadow-inner border border-primary/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            <span>More</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${moreDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {moreDropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full right-0 mt-3 w-56 !bg-[#09090b] !bg-opacity-100 border border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.9)] p-2 rounded-xl flex flex-col gap-1 z-50 backdrop-blur-3xl"
              >
                {secondaryLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = location.pathname === link.path;
                  return (
                    <Link 
                      key={link.path}
                      to={link.path}
                      onClick={() => setMoreDropdownOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition ${isActive ? 'bg-primary/20 text-primary font-bold' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{link.label}</span>
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-4">
        {/* Mobile Toggle */}
        <button className="lg:hidden text-gray-400 hover:text-white transition p-2 rounded-lg hover:bg-white/5" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {user ? (
          <>
            <div className="flex items-center gap-3 hidden md:flex border-l border-white/10 pl-4">
              {user.photoURL && (
                <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full border border-primary/30 shadow-[0_0_10px_rgba(139,92,246,0.3)] object-cover" />
              )}
              <span className="text-sm font-bold text-gray-300">
                {user.displayName?.split(" ")[0] || "User"}
              </span>
            </div>
            <button onClick={handleSignOut} className="btn-secondary !p-2 !rounded-xl hidden sm:flex border-red-500/20 hover:border-red-500 hover:bg-red-500/10 hover:text-red-400" title="Sign Out">
              <LogOut className="w-5 h-5" />
            </button>
          </>
        ) : (
          <button onClick={handleSignIn} className="btn-primary !px-4 !py-2 !text-sm hidden sm:flex">
            Sign In
          </button>
        )}
      </div>

      {/* Mobile Full Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full glass-panel border-t border-white/10 bg-black/95 backdrop-blur-3xl lg:hidden shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-1 max-h-[70vh] overflow-y-auto">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-2">Main</div>
              {mainLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link 
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive ? 'bg-primary/20 text-primary font-bold' : 'text-gray-300 hover:bg-white/5'}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
              
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-4 mb-2 px-2 border-t border-white/10 pt-4">More Features</div>
              {secondaryLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link 
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive ? 'bg-primary/20 text-primary font-bold' : 'text-gray-300 hover:bg-white/5'}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}

              <div className="mt-4 pt-4 border-t border-white/10 px-2 flex justify-between items-center">
                {user ? (
                  <>
                    <div className="flex items-center gap-3">
                      {user.photoURL && (
                        <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full border border-primary/30 object-cover" />
                      )}
                      <span className="text-sm font-bold text-gray-300">
                        {user.displayName || user.email || "User"}
                      </span>
                    </div>
                    <button onClick={handleSignOut} className="btn-secondary !p-2 !rounded-xl text-red-400 border-red-500/30">
                      <LogOut className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <button onClick={() => { handleSignIn(); setMobileMenuOpen(false); }} className="btn-primary w-full text-center">
                    Sign In to Dashboard
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function ActivityIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </svg>
  );
}
