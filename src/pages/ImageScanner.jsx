import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import { analyzeImage } from '../services/gemini';
import { Image as ImageIcon, Upload, Loader2, AlertTriangle, ShieldCheck, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImageScanner({ user }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [base64Data, setBase64Data] = useState(null);
  const [mimeType, setMimeType] = useState(null);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError("Please upload a valid image file.");
      return;
    }

    setMimeType(file.type);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      // Remove the data:image/...;base64, prefix for the API
      const base64String = reader.result.split(',')[1];
      setBase64Data(base64String);
      setResult(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    setImagePreview(null);
    setBase64Data(null);
    setMimeType(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAnalyze = async () => {
    if (!base64Data) return;
    setIsAnalyzing(true);
    setResult(null);
    setError(null);
    
    try {
      const data = await analyzeImage(base64Data, mimeType);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getRiskColor = (level) => {
    const l = level?.toUpperCase();
    if (l === 'HIGH' || l === 'CRITICAL') return 'text-red-500 bg-red-500/10 border-red-500/30';
    if (l === 'MEDIUM') return 'text-orange-500 bg-orange-500/10 border-orange-500/30';
    return 'text-green-500 bg-green-500/10 border-green-500/30';
  };

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 bg-background">
      <Navbar user={user} />
      
      <div className="flex-1 max-w-6xl mx-auto w-full pt-8 flex flex-col items-center">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-3 mb-2">
            <ImageIcon className="text-primary w-10 h-10" /> Deepfake & Image Scanner
          </h1>
          <p className="text-gray-400">Upload a suspicious image to scan for signs of AI manipulation or harassment risk.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 w-full">
          {/* Left Column: Upload */}
          <div className="flex flex-col gap-4">
            <div className="glass-panel p-6 border border-white/10 bg-black/40 flex-1 flex flex-col items-center justify-center relative min-h-[400px]">
              {!imagePreview ? (
                <>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    className="hidden" 
                    ref={fileInputRef}
                    id="image-upload"
                  />
                  <label 
                    htmlFor="image-upload" 
                    className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-white/20 rounded-2xl cursor-pointer hover:border-primary/50 hover:bg-white/5 transition group"
                  >
                    <Upload className="w-12 h-12 text-gray-500 group-hover:text-primary transition mb-4" />
                    <span className="font-bold text-lg text-white">Click to Upload Image</span>
                    <span className="text-sm text-gray-500 mt-2">JPG, PNG, WEBP max 10MB</span>
                  </label>
                </>
              ) : (
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                  <button 
                    onClick={handleClear}
                    className="absolute top-2 right-2 bg-black/80 hover:bg-red-500/80 text-white p-2 rounded-full transition z-10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <img src={imagePreview} alt="Preview" className="max-h-[350px] object-contain rounded-lg shadow-2xl border border-white/10" />
                </div>
              )}
            </div>

            <button 
              onClick={handleAnalyze}
              disabled={isAnalyzing || !imagePreview}
              className="btn-primary w-full py-4 text-lg font-bold disabled:opacity-50"
            >
              {isAnalyzing ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : "Scan Image"}
            </button>
          </div>

          {/* Right Column: Results */}
          <div className="flex flex-col h-full">
            <AnimatePresence mode="wait">
              {!result && !isAnalyzing && !error && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="glass-panel p-8 border border-white/10 bg-black/20 h-full flex flex-col items-center justify-center text-center opacity-50"
                >
                  <ShieldCheck className="w-16 h-16 mb-4 text-primary opacity-50" />
                  <h3 className="text-xl font-bold uppercase tracking-widest text-white mb-2">Awaiting Image</h3>
                  <p className="text-sm text-gray-400">Upload an image and run the scanner to see the AI risk assessment here.</p>
                </motion.div>
              )}

              {isAnalyzing && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="glass-panel p-8 border border-primary/30 bg-primary/5 h-full flex flex-col items-center justify-center text-center"
                >
                  <div className="relative w-24 h-24 flex items-center justify-center mb-6">
                    <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <ImageIcon className="w-8 h-8 text-primary animate-pulse" />
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-widest text-white mb-2">Scanning Pixels...</h3>
                  <p className="text-xs text-primary font-mono">Analyzing artifacts and manipulation vectors</p>
                </motion.div>
              )}

              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel p-6 border border-red-500/30 bg-red-900/10 text-red-400 h-full">
                  <AlertTriangle className="w-8 h-8 mb-4" />
                  <h3 className="font-bold text-lg mb-2">Analysis Failed</h3>
                  <p className="text-sm">{error}</p>
                </motion.div>
              )}

              {result && !isAnalyzing && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  className="glass-panel p-6 border border-white/10 bg-black/40 h-full overflow-y-auto"
                >
                  <div className="flex gap-4 mb-6">
                    <div className={`flex-1 p-4 rounded-xl border flex flex-col items-center justify-center ${getRiskColor(result.riskLevel)}`}>
                      <span className="text-[10px] uppercase font-bold tracking-widest mb-1 opacity-80">Risk Level</span>
                      <span className="text-2xl font-black">{result.riskLevel}</span>
                    </div>
                    <div className={`flex-1 p-4 rounded-xl border flex flex-col items-center justify-center ${getRiskColor(result.confidence)}`}>
                      <span className="text-[10px] uppercase font-bold tracking-widest mb-1 opacity-80">AI Confidence</span>
                      <span className="text-2xl font-black">{result.confidence}</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 border-b border-white/5 pb-1">Explanation</h4>
                      <p className="text-sm text-gray-300 leading-relaxed bg-black/30 p-3 rounded-lg border border-white/5">{result.explanation}</p>
                    </div>

                    {result.suspiciousSigns && result.suspiciousSigns.length > 0 && (
                      <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 border-b border-white/5 pb-1">Suspicious Signs Detected</h4>
                        <ul className="space-y-2">
                          {result.suspiciousSigns.map((sign, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-orange-300">
                              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                              <span>{sign}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div>
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 border-b border-white/5 pb-1">Victim Advice</h4>
                      <p className="text-sm text-blue-300 leading-relaxed bg-blue-900/10 p-3 rounded-lg border border-blue-500/20">{result.victimSafetyAdvice}</p>
                    </div>

                    <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg flex items-start gap-3 mt-8">
                      <Info className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-red-300 leading-relaxed">
                        <strong>Disclaimer:</strong> {result.disclaimer}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
