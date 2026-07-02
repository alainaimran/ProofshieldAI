import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { 
  HeartHandshake, ShieldCheck, AlertTriangle, XCircle, 
  PhoneCall, Scale, Users, Mail, ArrowRight, Zap, Shield, HelpCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function SafeStart({ user }) {
  const navigate = useNavigate();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar user={user} />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-8 py-8 space-y-24">
        
        {/* 1. Hero Section */}
        <motion.section {...fadeIn} className="text-center space-y-6 pt-12">
          <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
            <HeartHandshake className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            You are not alone.
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            ProofShield AI is designed to help you organize incidents of cyber harassment, deepfake abuse, impersonation, and blackmail into a clear, actionable safety workflow. Take a deep breath. We are here to help you regain control.
          </p>
          <div className="mt-8 flex justify-center">
            {user ? (
              <button onClick={() => navigate('/dashboard')} className="btn-primary px-8 py-4 text-lg shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_50px_rgba(139,92,246,0.5)] transition">
                Open Dashboard
              </button>
            ) : (
              <button 
                onClick={async () => {
                  try {
                    await signInWithPopup(auth, googleProvider);
                    navigate('/dashboard');
                  } catch(e) {
                    console.error(e);
                    alert("Firebase auth error. Check config.");
                  }
                }} 
                className="btn-primary px-8 py-4 text-lg shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_50px_rgba(139,92,246,0.5)] transition"
              >
                Sign in with Google
              </button>
            )}
          </div>
        </motion.section>

        {/* 2. What ProofShield AI Does */}
        <motion.section {...fadeIn} className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">How We Protect You</h2>
            <p className="text-gray-400">Our AI agent automates the critical first steps of crisis response.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { title: "Detects harm type", icon: ShieldCheck },
              { title: "Assesses risk level", icon: AlertTriangle },
              { title: "Creates evidence checklist", icon: Shield },
              { title: "Generates safety steps", icon: ArrowRight },
              { title: "Drafts report summary", icon: Scale },
              { title: "Saves case to vault", icon: HelpCircle }
            ].map((feature, i) => (
              <div key={i} className="glass-panel p-6 border border-white/5 bg-white/5 text-center flex flex-col items-center gap-3">
                <feature.icon className="w-6 h-6 text-primary" />
                <span className="font-semibold text-gray-200">{feature.title}</span>
              </div>
            ))}
          </div>
        </motion.section>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 3. What To Do First */}
          <motion.section {...fadeIn} className="glass-panel p-8 border-t-4 border-t-green-500 bg-black/40">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <ShieldCheck className="text-green-500" /> What To Do First
            </h2>
            <ul className="space-y-4">
              {[
                "Do not panic. Focus on the next immediate step.",
                "Do not pay blackmailers or extortionists.",
                "Do not delete threatening messages or emails.",
                "Take screenshots of everything (include timestamps).",
                "Save profile links and usernames of the attacker.",
                "Tell a trusted person about what is happening."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 bg-green-500/20 p-1 rounded text-green-400 shrink-0"><CheckCircleIcon /></div>
                  <span className="text-gray-300 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* 4. What Not To Do */}
          <motion.section {...fadeIn} className="glass-panel p-8 border-t-4 border-t-red-500 bg-black/40">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <XCircle className="text-red-500" /> What NOT To Do
            </h2>
            <ul className="space-y-4">
              {[
                "Do not engage or argue with the attacker.",
                "Do not forward or share the fake/abusive content.",
                "Do not publicly respond emotionally on social media.",
                "Do not delete evidence, even if you want it gone."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 bg-red-500/20 p-1 rounded text-red-400 shrink-0"><XCircle className="w-4 h-4" /></div>
                  <span className="text-gray-300 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.section>
        </div>

        {/* 5. Emergency Support */}
        <motion.section {...fadeIn} className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Emergency Support Channels</h2>
            <p className="text-gray-400">Reach out to these avenues if you need immediate external assistance.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="glass-panel p-6 border border-white/10 hover:bg-white/5 transition flex items-center gap-4">
              <Users className="w-8 h-8 text-blue-400 shrink-0" />
              <div>
                <h3 className="font-bold text-white">Trusted Contact</h3>
                <p className="text-sm text-gray-400">Reach out to a close friend, family member, or colleague immediately.</p>
              </div>
            </div>
            <div className="glass-panel p-6 border border-white/10 hover:bg-white/5 transition flex items-center gap-4">
              <Shield className="w-8 h-8 text-purple-400 shrink-0" />
              <div>
                <h3 className="font-bold text-white">Platform Reporting</h3>
                <p className="text-sm text-gray-400">Use built-in reporting tools on the social media or messaging app.</p>
              </div>
            </div>
            <div className="glass-panel p-6 border border-white/10 hover:bg-white/5 transition flex items-center gap-4">
              <Scale className="w-8 h-8 text-orange-400 shrink-0" />
              <div>
                <h3 className="font-bold text-white">Cybercrime Reporting</h3>
                <p className="text-sm text-gray-400">File a report with local authorities or cybercrime divisions (e.g., IC3).</p>
              </div>
            </div>
            <div className="glass-panel p-6 border border-white/10 hover:bg-white/5 transition flex items-center gap-4">
              <PhoneCall className="w-8 h-8 text-green-400 shrink-0" />
              <div>
                <h3 className="font-bold text-white">Emotional Support</h3>
                <p className="text-sm text-gray-400">Contact mental health crisis lines or abuse support organizations.</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 6. Quick Links */}
        <motion.section {...fadeIn} className="glass-panel p-8 bg-primary/5 border border-primary/20 text-center space-y-6">
          <h2 className="text-2xl font-bold text-white">Ready to proceed?</h2>
          <p className="text-gray-400">Navigate to our secure tools below.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate('/dashboard')} className="btn-primary">Dashboard</button>
            <button onClick={() => navigate('/safety-kit')} className="btn-secondary">Safety Kit</button>
            <button onClick={() => navigate('/vault')} className="btn-secondary">Case Vault</button>
            <button onClick={() => navigate('/report')} className="btn-secondary">Report Preview</button>
          </div>
        </motion.section>

      </main>

      {/* 7. Footer */}
      <footer className="mt-12 border-t border-white/10 bg-black/40 py-12 px-4 md:px-8 text-center md:text-left">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg">ProofShield AI</span>
            </div>
            <p className="text-xs text-gray-500 uppercase tracking-wider flex items-center justify-center md:justify-start gap-1">
              <Zap className="w-3 h-3 text-yellow-400" /> Powered by Google Gemini 2.5 Flash + Firebase
            </p>
            <p className="text-sm text-gray-400 flex items-center justify-center md:justify-start gap-2">
              <Mail className="w-4 h-4" /> support@proofshield.ai
            </p>
          </div>
          <div className="space-y-4 md:text-right">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-xs text-red-300 leading-relaxed max-w-sm ml-auto">
              <strong>EMERGENCY NOTE:</strong> If someone is in immediate physical danger, contact local emergency services immediately (e.g., 911).
            </div>
            <p className="text-xs text-gray-500 leading-relaxed max-w-sm ml-auto">
              <strong>Disclaimer:</strong> ProofShield AI provides automated guidance only and is not a replacement for emergency services, legal counsel, or professional psychological support.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CheckCircleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
  );
}
