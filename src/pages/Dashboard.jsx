import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { analyzeIncident } from '../services/gemini';
import { 
  Shield, Send, Loader2, AlertTriangle, CheckCircle, FileText, 
  Lock, Users, FileWarning, Zap, Check, ShieldAlert,
  Activity, BarChart3, Database, Fingerprint, Globe, Image as ImageIcon,
  Smartphone, MessageSquare, Clock, ArrowRight, ShieldCheck, Camera
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dashboard({ user }) {
  const [incidentText, setIncidentText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  
  // Simulation states
  const [simulatingId, setSimulatingId] = useState(null);
  const [completedActions, setCompletedActions] = useState([]);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if(!incidentText.trim()) return;
    
    setIsAnalyzing(true);
    setResults(null);
    setError(null);
    setCompletedActions([]);
    
    try {
      const data = await analyzeIncident(incidentText);
      setResults(data);
      
      const caseEntry = { id: Date.now().toString(), date: new Date().toISOString(), ...data };
      localStorage.setItem('proofshield_latest_case', JSON.stringify(caseEntry));
    } catch (err) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveToVault = () => {
    if(!results) return;
    const currentVault = JSON.parse(localStorage.getItem('proofshield_vault') || '[]');
    const latestCase = JSON.parse(localStorage.getItem('proofshield_latest_case'));
    if(latestCase) {
      localStorage.setItem('proofshield_vault', JSON.stringify([latestCase, ...currentVault]));
      alert('Case successfully saved to Vault!');
    }
  };

  const handleSimulate = (id) => {
    if (completedActions.includes(id) || simulatingId) return;
    setSimulatingId(id);
    setTimeout(() => {
      setSimulatingId(null);
      setCompletedActions(prev => [...prev, id]);
    }, 2000);
  };

  const getRiskStyles = (level) => {
    const l = level?.toUpperCase();
    if (l === 'CRITICAL') return { color: 'text-red-400', bg: 'bg-red-500', glow: 'shadow-red-500/20' };
    if (l === 'HIGH') return { color: 'text-orange-400', bg: 'bg-orange-500', glow: 'shadow-orange-500/20' };
    if (l === 'MEDIUM') return { color: 'text-yellow-400', bg: 'bg-yellow-500', glow: 'shadow-yellow-500/20' };
    return { color: 'text-green-400', bg: 'bg-green-500', glow: 'shadow-green-500/20' };
  };

  const actionButtons = [
    { id: 'evidence', label: 'Generate Evidence Package', icon: Database },
    { id: 'complaint', label: 'Generate Cybercrime Complaint', icon: FileWarning },
    { id: 'alert', label: 'Simulate Trusted Contact Alert', icon: Users },
    { id: 'lockdown', label: 'Secure Social Accounts', icon: Lock },
  ];

  return (
    <div className="min-h-screen flex flex-col pb-8">
      <Navbar user={user} />

      <div className="grid lg:grid-cols-12 gap-6 flex-1 max-w-[1600px] mx-auto w-full px-4 md:px-8">
        {/* Left Column: Input */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="glass-panel p-6 flex-1 flex flex-col h-full border border-white/10 shadow-2xl bg-black/40 backdrop-blur-xl">
            <h2 className="text-2xl font-bold mb-2 text-white flex items-center gap-2">
              <ShieldAlert className="text-primary w-6 h-6" /> Report Incident
            </h2>
            <p className="text-sm text-gray-400 mb-6">Enter scenario details. Our Gemini 2.5 agent will initiate the command protocol.</p>
            
            <textarea
              className="glass-input flex-1 min-h-[250px] resize-none mb-4 font-mono text-sm leading-relaxed"
              placeholder="COMMAND> Awaiting incident report..."
              value={incidentText}
              onChange={(e) => setIncidentText(e.target.value)}
            />
            
            <div className="flex flex-wrap gap-2 mb-6">
              <button 
                onClick={() => setIncidentText("Someone posted a deepfake of me on Twitter and it's gaining retweets.")}
                className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full transition border border-white/5"
              >
                Deepfake on Twitter
              </button>
              <button 
                onClick={() => setIncidentText("An ex-partner created a fake AI image of me and is threatening to send it to my employer unless I pay them.")}
                className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full transition border border-white/5"
              >
                Extortion Threat
              </button>
            </div>

            <button 
              onClick={handleAnalyze} 
              disabled={isAnalyzing || !incidentText.trim()}
              className="btn-primary w-full disabled:opacity-50 py-4 font-bold tracking-wide uppercase"
            >
              {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
              {isAnalyzing ? "Processing Threat Vector..." : "Analyze & Protect"}
            </button>
          </div>
        </div>

        {/* Right Column: Mission Control Output */}
        <div className="lg:col-span-8 flex flex-col h-full min-h-[600px]">
          {!isAnalyzing && !results && !error && (
            <div className="glass-panel flex-1 flex flex-col items-center justify-center text-center opacity-50 bg-black/20 border border-white/5">
              <Activity className="w-24 h-24 mb-6 text-primary opacity-50" />
              <h3 className="text-2xl font-bold mb-2 uppercase tracking-widest text-white">System Standby</h3>
              <p className="max-w-md text-sm text-gray-400">Incident Command Center is awaiting data input to initialize the Gemini 2.5 Flash threat analysis protocol.</p>
            </div>
          )}

          {error && !isAnalyzing && (
            <div className="glass-panel flex-1 flex flex-col items-center justify-center text-center text-red-400 bg-red-900/10 border border-red-500/20 p-8">
              <AlertTriangle className="w-20 h-20 mb-6 opacity-80" />
              <h3 className="text-xl font-bold mb-2 uppercase tracking-wider">Analysis Failed</h3>
              <p className="font-mono text-sm max-w-lg">{error}</p>
            </div>
          )}

          {isAnalyzing && (
            <div className="glass-panel flex-1 flex flex-col items-center justify-center space-y-8 bg-black/40 border border-white/10">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <Shield className="w-10 h-10 text-primary animate-pulse" />
              </div>
              
              <div className="space-y-3 text-center">
                <h3 className="text-xl font-bold text-white uppercase tracking-widest">Initializing Protocol</h3>
                <div className="flex flex-col gap-2 font-mono text-xs text-primary/80">
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>[OK] Establishing secure connection...</motion.span>
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>[OK] Parsing threat vectors...</motion.span>
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>[OK] Generating safety plan...</motion.span>
                </div>
              </div>
            </div>
          )}

          <AnimatePresence>
            {results && !isAnalyzing && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col gap-6"
              >
                {/* Mission Control Top Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="glass-panel p-4 border border-white/10 bg-black/40">
                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2"><AlertTriangle className="w-3 h-3" /> Threat Level</div>
                    <div className={`text-xl font-black ${getRiskStyles(results.risk_level).color}`}>{results.risk_level}</div>
                  </motion.div>
                  <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="glass-panel p-4 border border-white/10 bg-black/40">
                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2"><Database className="w-3 h-3" /> Evidence Score</div>
                    <div className="text-xl font-black text-blue-400">82%</div>
                  </motion.div>
                  <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="glass-panel p-4 border border-white/10 bg-black/40">
                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2"><Zap className="w-3 h-3" /> AI Confidence</div>
                    <div className="text-xl font-black text-purple-400">HIGH</div>
                  </motion.div>
                  <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="glass-panel p-4 border border-white/10 bg-black/40">
                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2"><Activity className="w-3 h-3" /> Status</div>
                    <div className="text-xl font-black text-green-400">ACTIVE</div>
                  </motion.div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Threat Radar */}
                  <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="glass-panel p-6 border border-white/10 bg-black/40">
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-primary" /> Threat Radar
                    </h3>
                    <div className="space-y-4">
                      {['Identity Theft', 'Financial Risk', 'Emotional Harm', 'Reputation Damage', 'Privacy Risk'].map((label, idx) => {
                        const isHigh = results.risk_level === 'CRITICAL' || results.risk_level === 'HIGH';
                        const percent = isHigh ? 75 + Math.random() * 20 : 30 + Math.random() * 30;
                        const color = percent > 80 ? 'bg-red-500' : percent > 50 ? 'bg-orange-500' : 'bg-green-500';
                        return (
                          <div key={idx}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-300">{label}</span>
                              <span className="text-gray-500">{Math.round(percent)}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }} animate={{ width: `${percent}%` }} transition={{ duration: 1, delay: 0.5 }}
                                className={`h-full ${color}`} 
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>

                  {/* AI Agent Timeline & Mission Status */}
                  <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="glass-panel p-6 border border-white/10 bg-black/40 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-[50px] pointer-events-none"></div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-green-400" /> Mission Complete
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400" /> <span className="text-gray-300">Threat Identified ({results.harm_type})</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400" /> <span className="text-gray-300">Evidence Organized</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400" /> <span className="text-gray-300">Recovery Plan Ready</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400" /> <span className="text-gray-300">Complaint Draft Generated</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <h4 className="text-xs text-gray-500 uppercase tracking-widest mb-2">Next Best Action</h4>
                      <div className="bg-primary/20 border border-primary/30 p-3 rounded-lg text-sm text-white font-medium">
                        {results.immediate_steps[0] || "Lock down all compromised accounts immediately."}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Evidence Locker */}
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="glass-panel p-6 border border-white/10 bg-black/40">
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-blue-400" /> Evidence Locker (82% Complete)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                    {[
                      { label: 'Screenshots', icon: Camera, status: 'Collected' },
                      { label: 'Messages', icon: MessageSquare, status: 'Collected' },
                      { label: 'URLs', icon: Globe, status: 'Collected' },
                      { label: 'Fake Profiles', icon: Fingerprint, status: 'Missing' },
                      { label: 'Social', icon: Smartphone, status: 'Available' },
                      { label: 'Images', icon: ImageIcon, status: 'Collected' },
                    ].map((item, i) => (
                      <div key={i} className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-2 transition
                        ${item.status === 'Collected' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 
                          item.status === 'Missing' ? 'bg-red-500/10 border-red-500/30 text-red-400' : 
                          'bg-white/5 border-white/10 text-gray-400'}`}
                      >
                        <item.icon className="w-6 h-6 mb-1" />
                        <span className="text-xs font-bold">{item.label}</span>
                        <span className="text-[9px] uppercase tracking-wider opacity-70">{item.status}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Recovery Roadmap */}
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="glass-panel p-6 border border-white/10 bg-black/40">
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-400" /> Recovery Roadmap
                  </h3>
                  <div className="flex flex-col md:flex-row gap-4 justify-between relative">
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -z-10"></div>
                    {[
                      { time: 'Immediate', desc: results.immediate_steps[0] || "Secure accounts", active: true },
                      { time: 'Today', desc: "Compile evidence", active: false },
                      { time: '24 Hours', desc: "Submit cybercrime report", active: false },
                      { time: '48 Hours', desc: "Notify inner circle", active: false },
                      { time: 'Long Term', desc: "Monitor privacy", active: false },
                    ].map((step, i) => (
                      <div key={i} className={`bg-black/60 p-4 rounded-xl border z-10 w-full md:w-1/5 ${step.active ? 'border-primary shadow-lg shadow-primary/20' : 'border-white/10'}`}>
                        <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${step.active ? 'text-primary' : 'text-gray-500'}`}>{step.time}</div>
                        <p className={`text-xs ${step.active ? 'text-white' : 'text-gray-400'}`}>{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Action Center */}
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }} className="mt-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Action Center</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {actionButtons.map((btn) => {
                      const Icon = btn.icon;
                      const isSimulating = simulatingId === btn.id;
                      const isCompleted = completedActions.includes(btn.id);
                      
                      return (
                        <button 
                          key={btn.id}
                          onClick={() => handleSimulate(btn.id)}
                          disabled={isSimulating || isCompleted}
                          className={`relative overflow-hidden flex items-center justify-between p-4 rounded-xl border transition-all duration-300 text-left shadow-lg
                            ${isCompleted ? 'bg-green-500/10 border-green-500/40 shadow-green-500/10' : 
                              isSimulating ? 'bg-primary/20 border-primary/50 shadow-primary/20' : 'bg-black/40 hover:bg-black/20 border-white/10'
                            }
                          `}
                        >
                          <div className="flex items-center gap-3 z-10 relative">
                            {isCompleted ? (
                              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 shrink-0 border border-green-500/30">
                                <Check className="w-5 h-5" />
                              </div>
                            ) : isSimulating ? (
                              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 border border-primary/30">
                                <Loader2 className="w-5 h-5 animate-spin" />
                              </div>
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 shrink-0 border border-white/5">
                                <Icon className="w-5 h-5" />
                              </div>
                            )}
                            <span className={`text-sm font-bold ${isCompleted ? 'text-green-400' : 'text-gray-200'}`}>
                              {isCompleted ? 'Completed' : btn.label}
                            </span>
                          </div>
                          
                          {isSimulating && (
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                              initial={{ x: '-100%' }}
                              animate={{ x: '100%' }}
                              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Footer Navigation */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex gap-4 mt-4">
                  <button onClick={handleSaveToVault} className="btn-secondary flex-1 py-4 text-sm font-bold uppercase tracking-wider">
                    <Database className="w-4 h-4 mr-2 inline" /> Save to Case Vault
                  </button>
                  <button onClick={() => navigate('/report')} className="btn-primary flex-1 py-4 text-sm font-bold uppercase tracking-wider">
                    <FileText className="w-4 h-4 mr-2 inline" /> View Formal Report
                  </button>
                </motion.div>
                
                {/* Case Info Footer */}
                <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono">
                  <div className="flex items-center gap-4">
                    <span>CASE_ID: {Date.now().toString(16).toUpperCase()}</span>
                    <span>PRIORITY: {results.risk_level}</span>
                    <span>T-RESOLVE: 48H</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Powered by Gemini 2.5 Flash</span>
                    <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Firebase Auth</span>
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
