# 🛡️ ProofShield AI

**Google Build with AI Hackathon 2024 Submission**
**Track:** Agentic AI Web App

---

## 📖 Project Overview
ProofShield AI is an autonomous, agentic crisis-response web application designed for victims of cyber harassment, sextortion, and AI-generated image abuse (deepfakes). 

When victims are targeted, panic and confusion often prevent them from taking the correct immediate steps to secure their identity and evidence. ProofShield AI solves this by deploying a specialized Gemini 2.5 Flash agent that instantly analyzes the user's situation, categorizes the threat, and generates a structured, actionable safety plan and evidence package.

## 🚨 Problem Statement
Generative AI brings immense creative potential, but it also arms bad actors with tools to generate non-consensual deepfakes and facilitate cyber extortion at scale. Victims are frequently overwhelmed and lack immediate, structured guidance on how to lock down their accounts, preserve digital evidence legally, and report the abuse safely without escalating the threat.

## ✨ Features
*   **Agentic Threat Analysis:** Input an incident, and the AI agent evaluates the risk level (Low to Critical) and identifies specific red flags.
*   **Transparent Reasoning Trace:** A visible timeline shows exactly how the AI agent parsed the situation and arrived at its conclusions, building user trust.
*   **Structured Safety Plans:** Dynamically generated checklists for immediate steps and digital evidence preservation.
*   **Simulated Action Center:** One-click automated workflows to generate evidence packages, draft cybercrime complaints, and securely alert trusted contacts.
*   **Premium Glassmorphic UI:** A calm, secure, and modern dark-mode interface built to keep panicked users grounded.

## 🛠️ Tech Stack
*   **Frontend:** React (Vite), JavaScript, Tailwind CSS
*   **Animations & Icons:** Framer Motion, Lucide React
*   **Authentication:** Firebase Auth (Google Sign-In)
*   **Core Intelligence (LLM):** Google Gemini 2.5 Flash (via `@google/genai` SDK)

## 🧠 How Gemini 2.5 Flash is Used
ProofShield AI does not use Gemini as a simple chatbot. It utilizes the **Agentic** capabilities of the `@google/genai` SDK. 
*   We use a strict system prompt to force the model into a specialized persona.
*   We lock the `responseMimeType` to `application/json` and set a low temperature (0.2).
*   The model acts as a backend engine, parsing unstructured human panic into a rigid, highly structured JSON schema that programmatically drives the entire React dashboard, risk meters, and checklist components.

## 🔐 How Firebase Auth is Used
We implemented a frictionless onboarding experience using Firebase Authentication (`signInWithPopup` via `GoogleAuthProvider`). This ensures users can securely access the platform in seconds during an emergency without the overhead of creating passwords. Route protection automatically redirects unauthenticated users to the secure landing page.

---

## 🚀 Setup & Installation

### Prerequisites
*   Node.js (v18+)
*   npm or yarn
*   A Google AI Studio API Key (`AIza...` or `AQ...`)
*   A Firebase Web App configuration

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/proofshield-ai.git
cd proofshield-ai
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory and add your Gemini API key:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Firebase Configuration
Open `src/config/firebase.js` and replace the placeholder configuration with your actual Firebase project settings:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  // ...
};
```

### 4. Run Development Server
```bash
npm run dev
```

---

## 🎬 Demo Flow (For Judges)
1.  **Landing Page:** Start at the premium hero section. Click **Sign in with Google**.
2.  **Dashboard:** Notice the empty state. 
3.  **Input:** Click the "Extortion Threat" quick-fill chip to populate a realistic crisis scenario.
4.  **Agent Activation:** Click **Analyze & Protect**.
5.  **The Reveal:** Watch the Agent Reasoning Trace animate in real-time as Gemini 2.5 Flash categorizes the threat as CRITICAL.
6.  **Simulation:** Scroll to the Action Center and click **Generate Evidence Package** to simulate the automated security workflow.

## 🔮 Future Improvements
*   **Live Encrypted Evidence Vault:** Connect Firebase Storage to securely upload and encrypt screenshots of the abuse.
*   **Direct API Reporting:** Integrate with local law enforcement APIs (e.g., IC3) to securely transmit the generated cybercrime complaint package directly from the dashboard.
*   **Multi-Modal Analysis:** Allow users to upload threatening screenshots, using Gemini Pro Vision to analyze both the text and the imagery for threats.
