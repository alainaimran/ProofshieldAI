import React from 'react';
import Navbar from '../components/Navbar';
import { BookOpen, Shield, Lock, FileText, XCircle } from 'lucide-react';

export default function SafetyKit({ user }) {
  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8">
      <Navbar user={user} />
      
      <div className="flex-1 max-w-5xl mx-auto w-full">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-3 mb-4">
            <BookOpen className="text-primary w-10 h-10" /> Safety Kit
          </h1>
          <p className="text-gray-400 text-lg">Essential educational resources for handling cyber harassment and digital abuse.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          <div className="glass-panel p-6 border-t-4 border-t-red-500">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-white">
              <XCircle className="text-red-500" /> What NOT To Do
            </h2>
            <ul className="space-y-3 text-sm text-gray-300 list-disc pl-5">
              <li><strong>Do not pay the ransom.</strong> Extortionists rarely stop after the first payment.</li>
              <li><strong>Do not delete the messages.</strong> You need them for evidence.</li>
              <li><strong>Do not confront the attacker alone.</strong> Engage only with support or authorities.</li>
              <li><strong>Do not blame yourself.</strong> You are the victim of a crime.</li>
            </ul>
          </div>

          <div className="glass-panel p-6 border-t-4 border-t-blue-500">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-white">
              <FileText className="text-blue-500" /> Evidence Checklist
            </h2>
            <ul className="space-y-3 text-sm text-gray-300 list-disc pl-5">
              <li>Screenshot entire conversations, ensuring the timestamp is visible.</li>
              <li>Save URLs of the offending posts or profiles.</li>
              <li>Download copies of the images/videos (if safe to do so) without modifying metadata.</li>
              <li>Keep a log of all unknown phone numbers or accounts contacting you.</li>
            </ul>
          </div>

          <div className="glass-panel p-6 border-t-4 border-t-green-500">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-white">
              <Shield className="text-green-500" /> Immediate Safety Steps
            </h2>
            <ul className="space-y-3 text-sm text-gray-300 list-disc pl-5">
              <li>Physically separate yourself from the device if you are experiencing an anxiety attack.</li>
              <li>Contact a trusted friend or family member immediately.</li>
              <li>Use the ProofShield AI Agent to analyze your specific scenario for customized steps.</li>
              <li>Contact local authorities if you feel in immediate physical danger.</li>
            </ul>
          </div>

          <div className="glass-panel p-6 border-t-4 border-t-yellow-500">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-white">
              <Lock className="text-yellow-500" /> Social Media Lockdown
            </h2>
            <ul className="space-y-3 text-sm text-gray-300 list-disc pl-5">
              <li>Temporarily deactivate your accounts; do not delete them permanently.</li>
              <li>Change passwords for your email and primary social accounts.</li>
              <li>Enable Two-Factor Authentication (2FA) using an authenticator app.</li>
              <li>Lock your LinkedIn profile to "Connections Only".</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
