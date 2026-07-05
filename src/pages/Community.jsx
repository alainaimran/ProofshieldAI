import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Users, Filter, Heart, MessageCircle, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const initialStories = [
  { id: 1, type: 'Deepfake', platform: 'Twitter', status: 'Resolved', story: "An anonymous account posted a fake explicit video of me. The AI evidence package helped me submit a flawless takedown request. Twitter removed it within 12 hours.", likes: 124 },
  { id: 2, type: 'Sextortion', platform: 'Instagram', status: 'Ongoing', story: "They threatened to send my photos to my boss. I panicked, but the Emergency checklist stopped me from paying. I locked everything down. They gave up after 2 days of silence.", likes: 89 },
  { id: 3, type: 'Cyberstalking', platform: 'WhatsApp', status: 'Resolved', story: "Getting 50+ threatening messages a day from different numbers. The recovery roadmap guided me to silently document everything before changing my number.", likes: 256 },
  { id: 4, type: 'Identity Theft', platform: 'LinkedIn', status: 'Resolved', story: "Someone cloned my profile and started messaging my clients. The formal complaint draft from ProofShield got the fake account banned immediately.", likes: 42 },
  { id: 5, type: 'Impersonation', platform: 'Discord', status: 'Ongoing', story: "A user is pretending to be me in gaming servers. Gathering the screenshots using the evidence checklist now.", likes: 15 }
];

export default function Community({ user }) {
  const [filter, setFilter] = useState('All');
  const [storiesList, setStoriesList] = useState(initialStories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newStory, setNewStory] = useState({
    type: 'Deepfake',
    platform: '',
    status: 'Ongoing',
    story: ''
  });

  const handleAddStory = (e) => {
    e.preventDefault();
    if (!newStory.story.trim() || !newStory.platform.trim()) return;
    
    const storyItem = {
      id: Date.now(),
      type: newStory.type,
      platform: newStory.platform,
      status: newStory.status,
      story: newStory.story,
      likes: 0
    };
    
    // Add to the front of the list
    setStoriesList([storyItem, ...storiesList]);
    setIsModalOpen(false);
    // Reset form
    setNewStory({ type: 'Deepfake', platform: '', status: 'Ongoing', story: '' });
  };

  const filteredStories = filter === 'All' ? storiesList : storiesList.filter(s => s.type === filter);

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 bg-background relative">
      <Navbar user={user} />
      
      <div className="flex-1 max-w-6xl mx-auto w-full pt-8">
        <div className="mb-12 text-center relative">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-3 mb-4">
            <Users className="text-primary w-10 h-10" /> Community Stories
          </h1>
          <p className="text-gray-400 text-lg">Anonymous accounts of survival and recovery. You are not alone in this fight.</p>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-6 inline-flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-6 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(139,92,246,0.4)] transition"
          >
            <Plus className="w-5 h-5" /> Share Your Story Anonymously
          </button>
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
              transition={{ delay: Math.min(i * 0.1, 0.5) }} // Cap delay
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
              
              <div className="text-xs text-gray-500 mb-4 font-mono">Platform: {story.platform} • Anonymous User #{1000 + (story.id % 9000)}</div>
              
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

      {/* Add Story Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-panel w-full max-w-lg p-6 bg-[#0a0a0e] border-white/10 shadow-2xl relative"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
              >
                <X className="w-6 h-6" />
              </button>
              
              <h2 className="text-2xl font-bold text-white mb-6">Share Your Story</h2>
              <p className="text-sm text-gray-400 mb-6">Your story is 100% anonymous. Sharing your experience helps others recognize patterns and find courage to act.</p>
              
              <form onSubmit={handleAddStory} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Threat Type</label>
                    <select 
                      value={newStory.type}
                      onChange={e => setNewStory({...newStory, type: e.target.value})}
                      className="glass-input w-full bg-black/50"
                    >
                      <option value="Deepfake">Deepfake</option>
                      <option value="Sextortion">Sextortion</option>
                      <option value="Cyberstalking">Cyberstalking</option>
                      <option value="Identity Theft">Identity Theft</option>
                      <option value="Impersonation">Impersonation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Status</label>
                    <select 
                      value={newStory.status}
                      onChange={e => setNewStory({...newStory, status: e.target.value})}
                      className="glass-input w-full bg-black/50"
                    >
                      <option value="Ongoing">Ongoing</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Platform (e.g. Instagram, WhatsApp)</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Where did this happen?"
                    value={newStory.platform}
                    onChange={e => setNewStory({...newStory, platform: e.target.value})}
                    className="glass-input w-full bg-black/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Your Story</label>
                  <textarea 
                    required
                    placeholder="What happened? How did you respond?"
                    value={newStory.story}
                    onChange={e => setNewStory({...newStory, story: e.target.value})}
                    className="glass-input w-full min-h-[120px] bg-black/50 resize-none"
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary w-full mt-4">
                  Post Anonymously
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
