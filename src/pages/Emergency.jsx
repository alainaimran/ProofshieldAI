import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Emergency({ user }) {
  const [activated, setActivated] = useState(false);
  const [progress, setProgress] = useState(0);

  const checklist = [
    { id: 1, text: "Do not send money or explicit content." },
    { id: 2, text: "Stop all communication with the attacker." },
    { id: 3, text: "Screenshot the threat and the attacker's profile." },
    { id: 4, text: "Save the attacker's username and URL." },
    { id: 5, text: "Enable Two-Factor Authentication on all accounts." },
    { id: 6, text: "Contact a trusted friend or family member." },
    { id: 7, text: "Report the account to the platform." }
  ];

  const handleActivate = () => {
    setActivated(true);
  };

  const handleCheck = (id) => {
    setProgress(prev => {
      // Basic mock progress calculation
      const newProgress = prev + (100 / checklist.length);
      return Math.min(newProgress, 100);
    });
  };

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 bg-background">
      <Navbar user={user} />
      
      <div className="flex-1 max-w-4xl mx-auto w-full flex flex-col items-center justify-center py-12">
        <AnimatePresence mode="wait">
          {!activated ? (
            <motion.div 
              key="button"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              className="flex flex-col items-center justify-center"
            >
              <div className="relative group cursor-pointer" onClick={handleActivate}>
                <div className="absolute inset-0 bg-red-600 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition duration-500 animate-pulse"></div>
                <div className="relative w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-red-500 to-red-800 rounded-full flex flex-col items-center justify-center text-white shadow-[0_0_100px_rgba(220,38,38,0.5)] border-8 border-red-400/30 transform transition-transform group-hover:scale-105 group-active:scale-95">
                  <ShieldAlert className="w-20 h-20 mb-4 animate-bounce" />
                  <h1 className="text-2xl md:text-3xl font-black text-center px-4 uppercase tracking-wider leading-tight">
                    I'M BEING THREATENED <br/>RIGHT NOW
                  </h1>
                </div>
              </div>
              <p className="mt-8 text-gray-400 text-center max-w-md">Press this button to immediately enter emergency lockdown mode and generate an urgent safety checklist.</p>
            </motion.div>
          ) : (
            <motion.div 
              key="checklist"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full"
            >
              <div className="glass-panel p-8 border border-red-500/30 bg-black/40 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-white/10">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${progress}%` }} 
                    className="h-full bg-red-500" 
                    transition={{ duration: 0.5 }}
                  />
                </div>
                
                <h2 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
                  <AlertTriangle className="text-red-500 w-8 h-8" /> EMERGENCY PROTOCOL ACTIVE
                </h2>
                <p className="text-gray-400 mb-8">Follow these steps immediately to secure your digital footprint and preserve evidence.</p>

                <div className="space-y-4">
                  {checklist.map((item, i) => (
                    <ChecklistItem key={item.id} item={item} onCheck={() => handleCheck(item.id)} index={i} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ChecklistItem({ item, onCheck, index }) {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    if (!checked) {
      setChecked(true);
      onCheck();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={handleClick}
      className={`p-4 rounded-xl border flex items-center gap-4 cursor-pointer transition-all duration-300
        ${checked ? 'bg-green-500/10 border-green-500/30 text-gray-400' : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'}`}
    >
      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
        ${checked ? 'border-green-500 bg-green-500 text-white' : 'border-gray-500 text-transparent'}`}
      >
        <CheckCircle className="w-5 h-5" />
      </div>
      <span className={`text-lg font-medium ${checked ? 'line-through opacity-50' : ''}`}>{item.text}</span>
    </motion.div>
  );
}
