import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';

import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Vault from './pages/Vault';
import SafetyKit from './pages/SafetyKit';
import ReportPreview from './pages/ReportPreview';
import SafeStart from './pages/SafeStart';
import Emergency from './pages/Emergency';
import Community from './pages/Community';
import Intelligence from './pages/Intelligence';
import Resources from './pages/Resources';
import ScamDetector from './pages/ScamDetector';
import ImageScanner from './pages/ImageScanner';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        const mockUser = localStorage.getItem('mockUser');
        if (mockUser) {
          setUser(JSON.parse(mockUser));
        } else {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SafeStart user={user} />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/" />} />
        <Route path="/vault" element={user ? <Vault user={user} /> : <Navigate to="/" />} />
        <Route path="/safety-kit" element={user ? <SafetyKit user={user} /> : <Navigate to="/" />} />
        <Route path="/report" element={user ? <ReportPreview user={user} /> : <Navigate to="/" />} />
        <Route path="/emergency" element={user ? <Emergency user={user} /> : <Navigate to="/" />} />
        <Route path="/community" element={user ? <Community user={user} /> : <Navigate to="/" />} />
        <Route path="/intelligence" element={user ? <Intelligence user={user} /> : <Navigate to="/" />} />
        <Route path="/resources" element={user ? <Resources user={user} /> : <Navigate to="/" />} />
        <Route path="/scam-detector" element={user ? <ScamDetector user={user} /> : <Navigate to="/" />} />
        <Route path="/image-scanner" element={user ? <ImageScanner user={user} /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
