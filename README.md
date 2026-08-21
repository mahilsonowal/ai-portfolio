# AI Portfolio — Chat with My AI Twin 🤖

An interactive, AI-powered portfolio assistant representing **Mahil Sonowal**. Built with a **FastAPI** backend powered by **Groq LLaMA 3.3**, and a modern **React + Vite + Tailwind CSS** frontend.

Recruiters and hiring managers can chat directly with the AI representative to learn about technical skills, real-world projects, research work, and evaluate job fit.

---

## 🚀 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS 4, Lucide Icons
- **Backend**: Python 3.13, FastAPI, Uvicorn, Pydantic, python-dotenv
- **LLM / AI**: Groq SDK (`llama-3.3-70b-versatile`), Streaming SSE
- **Architecture**: Decoupled Client-Server with real-time token streaming

---

## 📋 Phase-by-Phase Roadmap

| Phase | Description | Status |
|---|---|:---:|
| **Phase 1** | **Project Setup + Candidate Profile & Pydantic Validation** | ✅ **Completed** |
| **Phase 2** | **LLM Setup (Groq API Client & Streaming)** | ✅ **Completed** |
| **Phase 3** | **Grounded System Prompt Engineering** | ✅ **Completed** |
| **Phase 4** | **FastAPI Backend API (`/chat`, `/candidate`, `/health`)** | ✅ **Completed** |
| **Phase 5** | **ChatGPT-Style Modern Dark UI (React + Tailwind)** | ✅ **Completed** |
| **Phase 6** | **Frontend-Backend SSE Stream Integration** | ✅ **Completed** |
| **Phase 7** | **Multi-Turn Conversational Memory & Context Windowing** | ✅ **Completed** |
| **Phase 8** | **Recruiter JD Matching & Fit Evaluator Mode** | ✅ **Completed** |
| **Phase 9** | **Backend Deployment & Production Hardening** | ✅ **Completed** |
| **Phase 10** | Frontend Deployment (Vercel) & Environment Config | ⏳ Next |
| **Phase 11** | Final Documentation, Polish & Production Release | ⏳ Pending |

---

## 📁 Project Structure

```
Portfolio/
├── backend/
│   ├── .env.example             # Environment variable template
│   ├── candidate_profile.json   # Validated profile data
│   ├── jd_evaluator.py          # Structured JD analysis and scoring engine
│   ├── llm_client.py            # Groq API client with streaming generator
│   ├── main.py                  # FastAPI server with /chat, /match-jd, /candidate, /health
│   ├── models.py                # Pydantic data schemas
│   ├── Procfile                 # Process configuration for cloud hosts
│   ├── requirements.txt         # Python dependencies
│   └── system_prompt.py         # Grounded system prompt generator & guardrails
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── chat.js          # Streaming & JD matching API client
│   │   ├── assets/
│   │   │   └── dp3.png          # Mahil's profile picture
│   │   ├── components/
│   │   │   ├── ChatInput.jsx    # Textarea, Send button & keyboard shortcuts
│   │   │   ├── ChatWindow.jsx   # Message feed & starter prompt suggestions
│   │   │   ├── Header.jsx       # Persona header, tabs & social links
│   │   │   ├── JobMatcher.jsx   # Recruiter JD fit evaluator dashboard
│   │   │   └── MessageBubble.jsx# Markdown rendering, avatars & copy actions
│   │   ├── App.jsx              # Main stateful chat & tab orchestrator
│   │   ├── index.css            # Tailwind CSS 4 & typography
│   │   └── main.jsx             # React DOM entrypoint
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── Procfile                     # Root process file
├── render.yaml                  # Render Blueprint deployment config
├── README.md                    # Project documentation & progress tracker
└── AI_Portfolio_Build_Prompts.md
```

---

## 🛠️ Getting Started

### 1. Backend Setup
```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 👤 Candidate Profile Highlights
- **Name**: Mahil Sonowal
- **Role**: Web Development Intern Applicant / Frontend Developer
- **Location**: Guwahati, Assam, India
- **Education**: MCA (The Assam Royal Global University), BCA (Dibrugarh University)
- **Core Skills**: React.js, JavaScript/TypeScript, Python, Tailwind CSS, Material UI, Redux Toolkit, Supabase
- **Featured Projects**:
  - [Mukuba Economic Research & Consulting](https://mukubaecon.io/) (React 19, Supabase, Tailwind CSS)
  - [CADS Studio](https://createchstudio.in) (React, Material UI)
  - [Genesis Print Solutions](https://genesispress.in) (React, Tailwind CSS)
- **Research**: Assamese Folk Literature RAG Pipeline (OCR, Vector Search, Multilingual Embeddings)
