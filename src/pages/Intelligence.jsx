import React from 'react';
import Navbar from '../components/Navbar';
import { Activity, TrendingUp, PieChart, BarChart3, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Intelligence({ user }) {
  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 bg-background">
      <Navbar user={user} />
      
      <div className="flex-1 max-w-7xl mx-auto w-full pt-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3 mb-2">
              <Globe className="text-blue-400 w-10 h-10" /> Threat Intelligence
            </h1>
            <p className="text-gray-400">Global analytics of digital abuse trends and platform distribution.</p>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest">
            <Activity className="w-4 h-4 animate-pulse" /> Live Data
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Chart Area */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-6 border border-white/5 bg-black/40 h-80 flex flex-col">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-400" /> Trending Threat Types (30 Days)
              </h3>
              <div className="flex-1 flex items-end gap-4 px-4 pb-4 border-b border-l border-white/10">
                {/* Fake Bar Chart */}
                {[
                  { height: '60%', color: 'bg-blue-500', label: 'Deepfake' },
                  { height: '90%', color: 'bg-red-500', label: 'Sextortion' },
                  { height: '40%', color: 'bg-yellow-500', label: 'Impersonation' },
                  { height: '50%', color: 'bg-purple-500', label: 'Cyberstalk' },
                  { height: '20%', color: 'bg-green-500', label: 'Identity' },
                ].map((bar, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group">
                    <motion.div 
                      initial={{ height: 0 }} animate={{ height: bar.height }} transition={{ duration: 1, delay: i * 0.1 }}
                      className={`w-full max-w-[40px] ${bar.color} rounded-t-sm opacity-80 group-hover:opacity-100 transition`}
                    />
                    <span className="text-[10px] uppercase text-gray-500 mt-2 font-bold rotate-45 origin-left md:rotate-0">{bar.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6 border border-white/5 bg-black/40">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-orange-400" /> Top Platforms Exploited
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'Instagram', val: '45%', width: 'w-[45%]' },
                  { name: 'WhatsApp', val: '25%', width: 'w-[25%]' },
                  { name: 'Telegram', val: '15%', width: 'w-[15%]' },
                  { name: 'Facebook', val: '10%', width: 'w-[10%]' },
                  { name: 'TikTok', val: '5%', width: 'w-[5%]' },
                ].map((plat, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="w-24 text-sm font-bold text-gray-300">{plat.name}</span>
                    <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: plat.val }} transition={{ duration: 1, delay: i * 0.1 }} className="h-full bg-gradient-to-r from-blue-600 to-blue-400" />
                    </div>
                    <span className="text-xs font-mono text-gray-500">{plat.val}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-panel p-6 border border-white/5 bg-black/40">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                <PieChart className="w-4 h-4 text-purple-400" /> Risk Distribution
              </h3>
              {/* CSS Fake Pie Chart (Donut) */}
              <div className="flex justify-center my-8">
                <div className="w-40 h-40 rounded-full border-[16px] border-t-red-500 border-r-orange-500 border-b-yellow-500 border-l-green-500 shadow-[0_0_30px_rgba(255,255,255,0.05)] flex items-center justify-center">
                  <span className="font-bold text-gray-400 text-sm">24k Reports</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs font-bold uppercase tracking-widest">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div> Critical (40%)</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-orange-500 rounded-full"></div> High (25%)</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-500 rounded-full"></div> Medium (20%)</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div> Low (15%)</div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-6 border border-white/5 bg-black/40">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Recent Global Reports</h3>
              <div className="space-y-4">
                {[
                  { time: '2 min ago', type: 'Sextortion', loc: 'US' },
                  { time: '5 min ago', type: 'Deepfake', loc: 'UK' },
                  { time: '12 min ago', type: 'Impersonation', loc: 'CA' },
                  { time: '18 min ago', type: 'Sextortion', loc: 'AU' },
                ].map((rep, i) => (
                  <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                    <span className="text-gray-300 font-medium">{rep.type}</span>
                    <div className="text-right">
                      <div className="text-gray-500 text-xs">{rep.time}</div>
                      <div className="text-primary font-mono text-[10px]">{rep.loc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
