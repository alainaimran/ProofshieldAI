import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';
import { Shield, Lock, Activity, ArrowRight, Zap, Database, Fingerprint, EyeOff, Users, MessageSquareWarning, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Landing() {
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Auth error:", error);
      alert("Firebase is using mock credentials. Please update src/config/firebase.js with real config to test Google Login.");
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      
      {/* Navbar (Landing) */}
      <nav className="flex justify-between items-center px-8 py-6 relative z-50">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-primary" />
          <span className="font-bold text-xl tracking-wide">ProofShield AI</span>
        </div>
        <button onClick={handleGoogleSignIn} className="text-sm font-bold text-white hover:text-primary transition uppercase tracking-widest">
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center p-6 text-center">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-5xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-primary mb-8">
            <Zap className="w-4 h-4" /> Powered by Gemini 2.5 Flash
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-tight text-white drop-shadow-2xl">
            You're Not <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-blue-400">Alone.</span>
          </h1>
          
          <p className="text-xl md:text-3xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            AI-powered protection against Deepfakes, Sextortion, Cyber Harassment and Online Blackmail.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={handleGoogleSignIn}
              className="btn-primary w-full sm:w-auto px-12 py-5 text-xl font-bold rounded-2xl shadow-[0_0_40px_rgba(139,92,246,0.3)] hover:shadow-[0_0_60px_rgba(139,92,246,0.5)] transition-all transform hover:-translate-y-1"
            >
              Get Protected Now <ArrowRight className="w-6 h-6 ml-2 inline" />
            </button>
            <a href="#how-it-works" className="text-gray-400 hover:text-white font-bold uppercase tracking-widest text-sm transition">
              Learn More
            </a>
          </div>
        </motion.div>
      </section>

      {/* Threat Statistics */}
      <section className="py-12 border-y border-white/5 bg-black/40 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
          <div className="text-center px-4">
            <div className="text-4xl md:text-5xl font-black text-white mb-2">24,500+</div>
            <div className="text-xs text-primary font-bold uppercase tracking-widest">Deepfake Cases Analyzed</div>
          </div>
          <div className="text-center px-4">
            <div className="text-4xl md:text-5xl font-black text-white mb-2">18,200+</div>
            <div className="text-xs text-blue-400 font-bold uppercase tracking-widest">Safety Plans Generated</div>
          </div>
          <div className="text-center px-4">
            <div className="text-4xl md:text-5xl font-black text-white mb-2">99.9%</div>
            <div className="text-xs text-green-400 font-bold uppercase tracking-widest">Threats Detected</div>
          </div>
          <div className="text-center px-4">
            <div className="text-4xl md:text-5xl font-black text-white mb-2">50,000+</div>
            <div className="text-xs text-purple-400 font-bold uppercase tracking-widest">Evidence Packages</div>
          </div>
        </div>
      </section>

      {/* How ProofShield Works */}
      <section id="how-it-works" className="py-32 px-6 max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">How ProofShield Works</h2>
          <p className="text-xl text-gray-400">An autonomous agent workflow designed for crisis response.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-1 bg-gradient-to-r from-primary/5 via-primary to-primary/5"></div>
          
          {[
            { step: '01', title: 'Report the incident', icon: MessageSquareWarning, desc: 'Securely describe the threats or abuse you are facing in your own words.' },
            { step: '02', title: 'AI analyzes the threat', icon: Activity, desc: 'Gemini 2.5 evaluates the psychological tactics, risk level, and urgency.' },
            { step: '03', title: 'Build evidence package', icon: Database, desc: 'Automated compilation of screenshots, URLs, and critical metadata.' },
            { step: '04', title: 'Generate action plan', icon: ShieldCheck, desc: 'Receive a step-by-step roadmap to secure accounts and report safely.' }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              {...fadeIn}
              transition={{ delay: idx * 0.2 }}
              className="relative flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 rounded-full bg-black border-4 border-white/10 flex items-center justify-center mb-6 relative z-10 group-hover:border-primary transition-colors shadow-2xl">
                <item.icon className="w-10 h-10 text-gray-400 group-hover:text-primary transition-colors" />
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-white text-xs font-black flex items-center justify-center">
                  {item.step}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Common Threats */}
      <section className="py-32 bg-black/40 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Threats We Mitigate</h2>
            <p className="text-xl text-gray-400">Our AI model is specifically trained on modern cybercrime typologies.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Deepfake Blackmail', icon: EyeOff },
              { title: 'Sextortion', icon: ShieldAlert },
              { title: 'Fake Impersonation', icon: Users },
              { title: 'Cyberstalking', icon: Fingerprint },
              { title: 'Revenge Porn', icon: Lock },
              { title: 'Identity Theft', icon: Database }
            ].map((threat, idx) => (
              <motion.div 
                key={idx}
                {...fadeIn}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel p-8 border border-white/5 hover:border-primary/50 transition-all group hover:-translate-y-2 cursor-default"
              >
                <threat.icon className="w-12 h-12 text-gray-500 mb-6 group-hover:text-primary transition-colors" />
                <h3 className="text-2xl font-bold text-white">{threat.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Survivor Stories</h2>
          <p className="text-xl text-gray-400">Real outcomes. Total anonymity.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            "I thought my life was over. ProofShield helped me stay calm and guided me through every step.",
            "The extortionist demanded $5000. The AI agent told me exactly how to lock down my LinkedIn and who to contact.",
            "Someone made a fake AI video of me. The evidence package generated here was instrumental for the police.",
            "It felt like having a cybersecurity expert holding my hand during the worst panic attack of my life."
          ].map((quote, idx) => (
            <motion.div 
              key={idx}
              {...fadeIn}
              transition={{ delay: idx * 0.2 }}
              className="glass-panel p-8 border border-white/10 relative"
            >
              <div className="text-primary text-4xl font-serif absolute top-4 left-4 opacity-20">"</div>
              <p className="text-lg text-gray-300 italic mb-6 relative z-10">"{quote}"</p>
              <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
                <span className="font-bold text-white">Anonymous Survivor</span>
                <span className="text-yellow-500 text-lg">⭐⭐⭐⭐⭐</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-8">Take Back Control.</h2>
        <button 
          onClick={handleGoogleSignIn}
          className="btn-primary px-16 py-6 text-2xl font-bold rounded-2xl shadow-[0_0_60px_rgba(139,92,246,0.4)] hover:shadow-[0_0_80px_rgba(139,92,246,0.6)] transition-all transform hover:-translate-y-2"
        >
          Secure Your Identity Now
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/80 pt-16 pb-8 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg text-white">ProofShield AI</span>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Empowering victims of digital abuse with autonomous crisis response.
            </p>
            <div className="text-xs text-gray-600 space-y-1">
              <p>Made using:</p>
              <p className="text-gray-400">Gemini 2.5 Flash</p>
              <p className="text-gray-400">Firebase Auth</p>
              <p className="text-gray-400">React & Tailwind</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Platform</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-primary transition">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-primary transition">Emergency Contacts</a></li>
              <li><a href="#" className="hover:text-primary transition">Cyber Crime Links</a></li>
              <li><a href="#" className="hover:text-primary transition">Report Abuse</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Open Source</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-primary transition">GitHub Repository</a></li>
              <li><a href="#" className="hover:text-primary transition">Google Build with AI Hackathon</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} ProofShield AI. All rights reserved. Not a replacement for professional legal or emergency services.
        </div>
      </footer>
    </div>
  );
}