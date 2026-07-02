import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { BookOpen, Search, ChevronRight, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Resources({ user }) {
  const [searchTerm, setSearchTerm] = useState("");

  const articles = [
    { title: "How to report Instagram impersonation", cat: "Platform Guides" },
    { title: "How to report WhatsApp abuse", cat: "Platform Guides" },
    { title: "How to report Facebook fake profiles", cat: "Platform Guides" },
    { title: "How to secure Gmail", cat: "Security" },
    { title: "Enable Two Factor Authentication", cat: "Security" },
    { title: "How to preserve digital evidence", cat: "Legal" },
    { title: "How to contact Cyber Crime authorities", cat: "Legal" },
    { title: "Understanding Deepfake Laws in your state", cat: "Legal" },
    { title: "What to do if someone threatens to leak photos", cat: "Crisis Response" }
  ];

  const filtered = articles.filter(a => a.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 bg-background">
      <Navbar user={user} />
      
      <div className="flex-1 max-w-5xl mx-auto w-full pt-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-3 mb-4">
            <BookOpen className="text-primary w-10 h-10" /> Knowledge Base
          </h1>
          <p className="text-gray-400 text-lg">Searchable resources, platform guides, and legal preparation steps.</p>
        </div>

        <div className="relative max-w-2xl mx-auto mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-6 h-6" />
          <input 
            type="text" 
            placeholder="Search guides (e.g. 'Instagram', 'Two Factor')..." 
            className="glass-input w-full pl-14 py-4 text-lg rounded-2xl bg-white/5 border border-white/10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((article, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-panel p-6 border border-white/5 bg-black/40 hover:bg-white/5 hover:border-primary/30 transition group cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg group-hover:text-primary transition">{article.title}</h3>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{article.cat}</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition transform group-hover:translate-x-1" />
            </motion.div>
          ))}
          {filtered.length === 0 && (
             <div className="col-span-2 text-center py-12 text-gray-500">
               No resources found matching "{searchTerm}".
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
