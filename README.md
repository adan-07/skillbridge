# 🎓 SkillBridge - AI-Powered Skill Assessment & Freelance Readiness Platform

An end-to-end, serverless web platform designed to guide students and beginners from zero knowledge to freelance-ready professionals through personalized AI skill assessments, dynamic learning roadmaps, hands-on mini-projects, and step-by-step freelancing onboarding.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Netlify-brightgreen?style=for-the-badge&logo=netlify)](https://skillbridge-mentor.netlify.app/)

---

## 🔗 Live Demo
Access the live platform here:  
👉 **[skillbridge-mentor.netlify.app](https://skillbridge-mentor.netlify.app/)**

---

## 📌 Project Overview
Self-directed learning often lacks structure, leaving students unsure of their current skill level, what to learn next, or how to monetize their technical skills. **SkillBridge** solves this by providing a single, intelligent platform that evaluates user background, generates personalized learning roadmaps using AI, provides an interactive AI Progress Mentor, and walks users through creating client-ready freelance profiles.

---

## 🔥 Key Modules & Features

- **🎯 Skill Assessment Engine (`index.html`):** Adaptive assessment form collecting current skill exposure to evaluate expertise levels (Beginner, Intermediate, Advanced).
- **🗺️ AI Roadmap Generator (`roadmap.html`):** Generates week-by-week learning paths with curated resources based on chosen tech domains.
- **🧪 Mini Project Lab (`projects.html`):** Progressively unlocks beginner, intermediate, and advanced practical project briefs with evaluation criteria.
- **🤖 AI Progress Mentor (`mentor.html`):** Interactive AI mentor chat interface providing instant code assistance, concept breakdowns, and project feedback.
- **💼 Freelance Onboarding Guide (`freelance.html`):** Structured guide walking students through Fiverr gig setup, LinkedIn profile optimization, Upwork proposal writing, and beginner pricing strategies.
- **📊 Admin Monitoring Dashboard (`admin.html`):** Real-time administrator portal built with Firebase to monitor student registrations, project completions, and overall platform analytics.

---

## 🛠️ Tech Stack
- **Frontend:** HTML5, CSS3 (Dark Theme UI), Modern JavaScript (ES6+)
- **Backend & Realtime Database:** Cloud Firestore & Firebase Authentication
- **AI Integration:** LLM API Integration (Interactive AI Mentor & Assessment Engine)
- **Deployment:** Netlify

---

## 🗂️ Project Directory Blueprint

```text
skillbridge/
├── css/
│   └── style.css            # Dark theme dashboard & responsive UI styles
├── js/
│   ├── firebase-config.js   # Firebase setup & database initialization
│   ├── assessment.js       # Form handling & skill evaluation logic
│   ├── roadmap.js          # Dynamic AI roadmap rendering
│   ├── projects.js         # Project lab loader & progression tracker
│   ├── mentor.js           # AI mentor chatbot interface logic
│   ├── freelance.js        # Freelance onboarding milestone tracker
│   └── admin.js            # Admin portal Firestore snapshot listener
├── index.html               # Skill assessment portal (Entry Point)
├── roadmap.html             # Learning path & milestone display
├── projects.html            # Practical mini-project lab
├── mentor.html              # Conversational AI mentor chat
├── freelance.html           # Fiverr, LinkedIn & Upwork guide
└── admin.html               # Real-time admin monitoring dashboard
