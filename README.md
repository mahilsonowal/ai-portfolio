# AI Portfolio — Chat with My AI Twin 🤖

> *"Instead of reading my resume, chat with an AI that knows everything about me."*

[![Live Frontend Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://ai-portfolio-mahil.vercel.app)
[![FastAPI Backend](https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://ai-portfolio-backend-5pjv.onrender.com/health)
[![Groq LLaMA 3](https://img.shields.io/badge/LLM-Groq%20Cloud-f55036?style=for-the-badge&logo=groq&logoColor=white)](https://console.groq.com)
[![React 19](https://img.shields.io/badge/React%2019-Vite%20%2B%20Tailwind-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)

An interactive, full-stack AI representative representing **Mahil Sonowal** (Frontend Developer & MCA student). Instead of parsing static PDF resumes, recruiters and hiring managers can converse with an honest, guardrailed AI twin or paste complete Job Descriptions to receive instant technical fit evaluations.

---

## 🌐 Live Demos

- **Frontend App (Vercel)**: [https://ai-portfolio-mahil.vercel.app](https://ai-portfolio-mahil.vercel.app)
- **Backend API (Render)**: [https://ai-portfolio-backend-5pjv.onrender.com](https://ai-portfolio-backend-5pjv.onrender.com)
- **API Health Check**: [https://ai-portfolio-backend-5pjv.onrender.com/health](https://ai-portfolio-backend-5pjv.onrender.com/health)

---

## ✨ Key Features

- 💬 **Interactive AI Twin Chat**: Speaks on behalf of Mahil Sonowal, accurately answering queries regarding technical skills, frontend architecture experience, academic milestones, and research work.
- ⚡ **Real-Time Token Streaming**: Streams responses chunk-by-chunk using Server-Sent Events (SSE) and native `ReadableStream` decoding for zero-latency typewriter effects.
- 🛡️ **Strict Anti-Hallucination Guardrails**: Programmed to answer strictly and ONLY from verified candidate profile data, gracefully redirecting queries about unlisted topics directly to Mahil's contact channels.
- 🧠 **Multi-Turn Conversational Memory**: Sliding-window context management (retaining the last 20 messages) enables natural contextual follow-ups without exceeding token limits.
- 🎯 **Recruiter Job Description Matcher**: A dedicated recruiter dashboard where hiring managers can paste any job posting to receive an objective **Fit Score (0–100%)**, matching strengths, skill gaps, and interview recommendations.
- 🎨 **Modern ChatGPT-Inspired Dark UI**: Polished glassmorphism design with responsive layouts, interactive starter prompt cards, one-click copy buttons, and rich Markdown rendering (tables, badges, and clickable links).

---

## 🛠️ Tech Stack

| Layer | Technology | Description |
|---|---|---|
| **Frontend** | **React 19 + Vite 8** | High-performance SPA with instant HMR and optimized production bundles |
| **Styling** | **Tailwind CSS 4** | Sleek modern dark mode aesthetic with custom typography |
| **Icons & UI** | **Lucide React & React Markdown** | Iconography and rich GFM markdown rendering (tables, badges, code) |
| **Backend API** | **FastAPI + Uvicorn** | Asynchronous Python REST & streaming API with CORS middleware |
| **Data Validation**| **Pydantic v2** | Strict schema validation for candidate profiles and JD match payloads |
| **AI / LLM** | **Groq SDK (`openai/gpt-oss-120b`, `llama-3.3-70b`)** | Ultra-fast inference with fallback resilience |
| **Deployment** | **Render & Vercel** | Backend hosted on Render; Frontend deployed on Vercel |

---

## 📋 Phase-by-Phase Build Roadmap

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
| **Phase 9** | **Backend Deployment & Production Hardening (Render)** | ✅ **Completed** |
| **Phase 10** | **Frontend Deployment (Vercel) & Environment Config** | ✅ **Completed** |
| **Phase 11** | **GitHub Repository, README & Comprehensive Documentation** | ✅ **Completed** |

---

## 📁 Project Structure

```
Portfolio/
├── backend/
│   ├── .env.example             # Backend environment template
│   ├── candidate_profile.json   # Validated profile data (Mahil Sonowal)
│   ├── jd_evaluator.py          # Structured JD analysis and scoring engine
│   ├── llm_client.py            # Groq API client with streaming generator
│   ├── main.py                  # FastAPI server with /chat, /match-jd, /candidate, /health
│   ├── models.py                # Pydantic data schemas
│   ├── Procfile                 # Cloud process file for Render
│   ├── requirements.txt         # Python dependencies
│   └── system_prompt.py         # Grounded system prompt generator & guardrails
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── chat.js          # Streaming & JD matching API client
│   │   ├── assets/
│   │   │   └── dp3.png          # Mahil's profile photo
│   │   ├── components/
│   │   │   ├── ChatInput.jsx    # Auto-resizing textarea & shortcuts
│   │   │   ├── ChatWindow.jsx   # Message feed & starter prompt suggestions
│   │   │   ├── Header.jsx       # Persona header, tab switch & social links
│   │   │   ├── JobMatcher.jsx   # Recruiter JD fit evaluator dashboard
│   │   │   └── MessageBubble.jsx# Markdown rendering, avatars & copy actions
│   │   ├── App.jsx              # Main stateful chat & tab orchestrator
│   │   ├── index.css            # Tailwind CSS 4 & typography
│   │   └── main.jsx             # React DOM entrypoint
│   ├── .env.example             # Frontend local environment template
│   ├── .env.production          # Frontend production backend URL config
│   ├── index.html
│   ├── package.json
│   ├── vercel.json              # Vercel SPA routing and header caching
│   └── vite.config.js
├── Procfile                     # Root process file
├── render.yaml                  # Render Blueprint deployment config
├── .gitignore                   # Comprehensive Python & Node ignore rules
├── README.md                    # Project documentation & progress tracker
└── AI_Portfolio_Build_Prompts.md
```

---

## ⚙️ Local Development Setup

### 1. Prerequisites
- **Python 3.10+** (Tested on Python 3.13)
- **Node.js 18+** & **npm**
- A free **[Groq API Key](https://console.groq.com/keys)**

### 2. Backend Setup
```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file from template
copy .env.example .env   # Windows
# cp .env.example .env   # macOS/Linux

# Add your Groq API key inside backend/.env:
# GROQ_API_KEY=gsk_your_actual_key_here

# Start development server
uvicorn main:app --reload --port 8000
```
Backend will be live at: `http://localhost:8000` (API Docs: `http://localhost:8000/docs`).

### 3. Frontend Setup
```bash
# Navigate to frontend (in a separate terminal)
cd frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```
Frontend will be live at: `http://localhost:5173`.

---

## 🔐 Environment Variables

### Backend (`backend/.env`)
| Variable | Description | Default / Example |
|---|---|---|
| `GROQ_API_KEY` | Groq Cloud API Key | `gsk_...` |
| `GROQ_MODEL` | Primary LLM model ID | `openai/gpt-oss-120b` |
| `ALLOWED_ORIGINS` | Permitted CORS origins (comma-separated or `*`) | `*` |

### Frontend (`frontend/.env.production` or Vercel Settings)
| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Base URL of deployed FastAPI backend | `https://ai-portfolio-backend-5pjv.onrender.com` |

---

## 💡 About This Project

This project was built to demonstrate practical, production-grade engineering across:
1. **Applied LLM Engineering**: Grounding generative AI responses using structured JSON representations, strict guardrails, zero-hallucination policies, and real-time streaming SSE.
2. **Full-Stack Web Development**: Building responsive, componentized frontends in React 19 / Tailwind CSS integrated with an asynchronous FastAPI Python backend.
3. **Talent & Recruiter Experience**: Offering a specialized Job Description fit evaluator that accelerates candidate screening by comparing requirements against verified experience.

---

## 👤 Candidate Profile & Contact

**Mahil Sonowal**  
*Web Development Intern Applicant / Frontend Developer*  
*MCA Student at The Assam Royal Global University, Guwahati, Assam, India*

- 📧 **Email**: [mahilsonowalpro5@gmail.com](mailto:mahilsonowalpro5@gmail.com)
- 📞 **Phone**: [+91-9954910574](tel:+919954910574)
- 💼 **LinkedIn**: [linkedin.com/in/mahil-sonowal](https://linkedin.com/in/mahil-sonowal)
- 🐙 **GitHub**: [github.com/mahilsonowal](https://github.com/mahilsonowal)

---

⭐ *If you find this project interesting, feel free to star the repository and connect with me!*
