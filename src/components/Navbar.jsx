import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Shield, LogOut, Zap, Archive, BookOpen, FileText, Home } from 'lucide-react';

export default function Navbar({ user }) {
  const location = useLocation();
  
  const handleSignOut = () => {
    signOut(auth);
  };

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/vault', label: 'Case Vault', icon: Archive },
    { path: '/safety-kit', label: 'Safety Kit', icon: BookOpen },
    { path: '/report', label: 'Report Preview', icon: FileText },
  ];

  return (
    <nav className="flex justify-between items-center mb-6 glass-panel px-6 py-4">
      <div className="flex items-center gap-3">
        <Shield className="w-8 h-8 text-primary" />
        <div className="flex flex-col">
          <span className="font-bold text-xl tracking-wide leading-none hidden sm:block">ProofShield AI</span>
          <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider hidden sm:flex items-center gap-1">
            <Zap className="w-3 h-3 text-yellow-400" />
            Gemini 2.5 Flash
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link 
              key={link.path}
              to={link.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition ${isActive ? 'bg-primary/20 text-primary' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium hidden md:block">{link.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 hidden lg:flex">
          {user?.photoURL && (
            <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full border border-surface-border object-cover" />
          )}
          <span className="text-sm text-gray-400">
            {user?.displayName || user?.email || "Demo User"}
          </span>
        </div>
        <button onClick={handleSignOut} className="btn-secondary !p-2" title="Sign Out">
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
}
