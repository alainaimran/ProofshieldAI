import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Archive, Trash2, FolderOpen, AlertTriangle } from 'lucide-react';

export default function Vault({ user }) {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('proofshield_vault') || '[]');
    setCases(saved);
  }, []);

  const handleDelete = (id) => {
    const updated = cases.filter(c => c.id !== id);
    setCases(updated);
    localStorage.setItem('proofshield_vault', JSON.stringify(updated));
  };

  const getRiskStyles = (level) => {
    const l = level?.toUpperCase();
    if (l === 'CRITICAL') return 'text-red-400 bg-red-500/20 border-red-500/50';
    if (l === 'HIGH') return 'text-orange-400 bg-orange-500/20 border-orange-500/50';
    if (l === 'MEDIUM') return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
    return 'text-green-400 bg-green-500/20 border-green-500/50';
  };

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8">
      <Navbar user={user} />
      
      <div className="flex-1 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Archive className="text-primary" /> Case Vault
          </h1>
          <p className="text-gray-400 mt-2">Securely view and manage your saved incident analyses.</p>
        </div>

        {cases.length === 0 ? (
          <div className="glass-panel p-12 text-center flex flex-col items-center">
            <FolderOpen className="w-16 h-16 text-gray-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Vault is Empty</h2>
            <p className="text-gray-400">Cases you save from the Dashboard will appear here securely.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((c) => (
              <div key={c.id} className="glass-panel p-6 flex flex-col relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-50 group-hover:opacity-100 transition"></div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs text-gray-400">{new Date(c.date).toLocaleString()}</span>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded border uppercase tracking-wider ${getRiskStyles(c.risk_level)}`}>
                    {c.risk_level} RISK
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{c.harm_type}</h3>
                <p className="text-sm text-gray-400 mb-6 flex-1 line-clamp-3">
                  {c.report_summary}
                </p>
                <div className="flex justify-between items-center mt-auto border-t border-white/10 pt-4">
                  <button className="text-sm text-primary hover:text-white font-medium transition flex items-center gap-1">
                    <FolderOpen className="w-4 h-4" /> Open Case
                  </button>
                  <button 
                    onClick={() => handleDelete(c.id)}
                    className="text-gray-500 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
