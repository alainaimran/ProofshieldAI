import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Users, Filter, Heart, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Community({ user }) {
  const [filter, setFilter] = useState('All');

  const stories = [
    { id: 1, type: 'Deepfake', platform: 'Twitter', status: 'Resolved', story: "An anonymous account posted a fake explicit video of me. The AI evidence package helped me submit a flawless takedown request. Twitter removed it within 12 hours.", likes: 124 },
    { id: 2, type: 'Sextortion', platform: 'Instagram', status: 'Ongoing', story: "They threatened to send my photos to my boss. I panicked, but the Emergency checklist stopped me from paying. I locked everything down. They gave up after 2 days of silence.", likes: 89 },
    { id: 3, type: 'Cyberstalking', platform: 'WhatsApp', status: 'Resolved', story: "Getting 50+ threatening messages a day from different numbers. The recovery roadmap guided me to silently document everything before changing my number.", likes: 256 },
    { id: 4, type: 'Identity Theft', platform: 'LinkedIn', status: 'Resolved', story: "Someone cloned my profile and started messaging my clients. The formal complaint draft from ProofShield got the fake account banned immediately.", likes: 42 },
    { id: 5, type: 'Impersonation', platform: 'Discord', status: 'Ongoing', story: "A user is pretending to be me in gaming servers. Gathering the screenshots using the evidence checklist now.", likes: 15 }
  ];

  const filteredStories = filter === 'All' ? stories : stories.filter(s => s.type === filter);

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 bg-background">
      <Navbar user={user} />
      
      <div className="flex-1 max-w-6xl mx-auto w-full pt-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-3 mb-4">
            <Users className="text-primary w-10 h-10" /> Community Stories
          </h1>
          <p className="text-gray-400 text-lg">Anonymous accounts of survival and recovery. You are not alone in this fight.</p>
        </div>

        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          <span className="flex items-center gap-2 text-gray-500 mr-2"><Filter className="w-4 h-4" /> Filter:</span>
          {['All', 'Deepfake', 'Sextortion', 'Cyberstalking', 'Identity Theft', 'Impersonation'].map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${filter === cat ? 'bg-primary text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story, i) => (
            <motion.div 
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-6 border border-white/5 bg-black/40 flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded">
                  {story.type}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border
                  ${story.status === 'Resolved' ? 'text-green-400 border-green-500/30 bg-green-500/10' : 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10'}`}>
                  {story.status}
                </span>
              </div>
              
              <div className="text-xs text-gray-500 mb-4 font-mono">Platform: {story.platform} • Anonymous User #{1000 + story.id}</div>
              
              <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-1">"{story.story}"</p>
              
              <div className="border-t border-white/10 pt-4 flex justify-between items-center mt-auto">
                <button className="flex items-center gap-2 text-gray-500 hover:text-red-400 transition text-sm font-bold">
                  <Heart className="w-4 h-4" /> Helpful ({story.likes})
                </button>
                <button className="flex items-center gap-2 text-gray-500 hover:text-white transition text-sm font-bold">
                  <MessageCircle className="w-4 h-4" /> Reply
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
