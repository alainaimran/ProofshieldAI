import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { analyzeScam } from '../services/gemini';
import { ShieldAlert, Zap, Loader2, Target, BrainCircuit, Activity, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScamDetector({ user }) {
  const [message, setMessage] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!message.trim()) return;
    setIsAnalyzing(true);
    setResult(null);
    setError(null);
    
    try {
      const data = await analyzeScam(message);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 bg-background">
      <Navbar user={user} />
      
      <div className="flex-1 max-w-5xl mx-auto w-full pt-8 flex flex-col items-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-3 mb-2">
            <ShieldAlert className="text-primary w-10 h-10" /> AI Scam Detector
          </h1>
          <p className="text-gray-400">Paste a suspicious or threatening message below. Gemini will analyze the psychological tactics used.</p>
        </div>

        <div className="w-full glass-panel p-6 border border-white/10 bg-black/40 mb-8">
          <textarea
            className="glass-input w-full min-h-[150px] mb-4 text-sm font-mono p-4"
            placeholder="Paste the SMS, email, or DM here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button 
            onClick={handleAnalyze}
            disabled={isAnalyzing || !message.trim()}
            className="btn-primary w-full py-4 text-lg font-bold disabled:opacity-50"
          >
            {isAnalyzing ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : "Scan Message for Threats"}
          </button>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full text-red-400 bg-red-900/20 p-4 border border-red-500/30 rounded-xl mb-4">
              Error: {error}
            </motion.div>
          )}

          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full grid md:grid-cols-2 gap-6"
            >
              {/* Left Column */}
              <div className="space-y-6">
                <div className="glass-panel p-6 border border-white/10 bg-black/40 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Scam Confidence</span>
                    <span className={`text-4xl font-black ${result.scam_confidence > 75 ? 'text-red-500' : 'text-orange-400'}`}>
                      {result.scam_confidence}%
                    </span>
                  </div>
                  <Target className="w-12 h-12 opacity-20" />
                </div>
                
                <div className="glass-panel p-6 border border-white/10 bg-black/40">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-4 flex items-center gap-2"><Activity className="w-4 h-4"/> Assessment</span>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-400">Threat Type</span>
                      <span className="text-white font-bold">{result.threat_type}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-gray-400">Risk Level</span>
                      <span className="text-red-400 font-bold">{result.risk_level}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="glass-panel p-6 border border-white/10 bg-black/40">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-4 flex items-center gap-2"><BrainCircuit className="w-4 h-4"/> Psychological Tactics</span>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {result.psychological_tactics.map((tac, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{tac}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass-panel p-6 border border-green-500/30 bg-green-900/10">
                  <span className="text-xs font-bold text-green-500 uppercase tracking-widest block mb-4 flex items-center gap-2"><MessageCircle className="w-4 h-4"/> Recommended Response</span>
                  <p className="text-sm text-green-100 font-medium">
                    {result.recommended_response}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
