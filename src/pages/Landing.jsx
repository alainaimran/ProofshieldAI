import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";
import { Shield, Lock, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function Landing() {
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Firebase Auth Error:", error);
      alert(`Google Login Failed:\n${error.code || error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-[#0B1020] text-white">

      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[450px] h-[450px] bg-purple-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[450px] h-[450px] bg-cyan-500/20 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-panel max-w-5xl w-full p-10 md:p-14 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl relative z-10"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-3xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
            <Shield className="w-12 h-12 text-purple-400" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-6">
          ProofShield{" "}
          <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            AI
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-center text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12">
          The AI-powered crisis response platform helping victims of
          AI-generated fake photos, cyber harassment, online blackmail, and
          image-based abuse. Analyze incidents, prepare evidence, and receive
          immediate safety guidance.
        </p>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 text-left">
          <div className="bg-white/5 p-6 rounded-xl border border-white/5">
            <Activity className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="font-semibold mb-2">Instant Analysis</h3>
            <p className="text-sm text-gray-400">Describe the incident and our agent instantly assesses the threat level.</p>
          </div>
          <div className="bg-white/5 p-6 rounded-xl border border-white/5">
            <Shield className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="font-semibold mb-2">Safety Workflow</h3>
            <p className="text-sm text-gray-400">Receive step-by-step immediate actions to secure your identity.</p>
          </div>
          <div className="bg-white/5 p-6 rounded-xl border border-white/5">
            <Lock className="w-8 h-8 text-green-400 mb-4" />
            <h3 className="font-semibold mb-2">Evidence Packaging</h3>
            <p className="text-sm text-gray-400">Simulate building secure, encrypted packages for authorities.</p>
          </div>
        </div>

        {/* Animated Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-black/30 p-4 rounded-xl border border-white/5">
            <div className="text-3xl font-black text-purple-400 mb-1">24.5k+</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Cases Protected</div>
          </div>
          <div className="bg-black/30 p-4 rounded-xl border border-white/5">
            <div className="text-3xl font-black text-blue-400 mb-1">18.2k</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Reports Generated</div>
          </div>
          <div className="bg-black/30 p-4 rounded-xl border border-white/5">
            <div className="text-3xl font-black text-red-400 mb-1">99.9%</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Threats Detected</div>
          </div>
          <div className="bg-black/30 p-4 rounded-xl border border-white/5">
            <div className="text-3xl font-black text-green-400 mb-1">50k+</div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">Evidence Packages</div>
          </div>
        </div>

        {/* Login Button */}
        <div className="flex justify-center">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-3 px-10 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition-all duration-300 shadow-xl"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-6 h-6"
            />
            Sign in with Google
          </button>
        </div>
      </motion.div>
    </div>
  );
}