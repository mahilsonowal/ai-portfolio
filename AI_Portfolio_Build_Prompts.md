# AI Portfolio Challenge — Phase-by-Phase Build Prompts

How to use this: Copy ONE phase's prompt at a time into Claude Code / Cursor / your AI coding tool. Let it finish and test before moving to the next phase. Each phase builds on the last.

---

## PHASE 1 — Project Setup + Candidate Profile

```
Set up a new project called "ai-portfolio" with two folders: /backend (Python/FastAPI) and /frontend (React + Vite + Tailwind CSS).

In /backend, create a file called candidate_profile.json with the following structured data about me:

{
  "name": "Mahil Sonowal",
  "title": "Web Development Intern Applicant / Frontend Developer",
  "location": "Guwahati, Assam, India",
  "contact": {
    "email": "mahilsonowalpro5@gmail.com",
    "phone": "+91-9954910574",
    "linkedin": "linkedin.com/in/mahil-sonowal",
    "github": "github.com/mahilsonowal"
  },
  "education": [
    {"degree": "Master of Computer Applications (MCA)", "institution": "The Assam Royal Global University, Guwahati", "duration": "2025-2027", "score": "SGPA 8.45 (1st Semester)"},
    {"degree": "Bachelor of Computer Applications (BCA)", "institution": "Dibrugarh University", "score": "75% Aggregate"},
    {"degree": "Higher Secondary (12th)", "institution": "R.D Junior College, Digboi", "score": "85%"},
    {"degree": "Matriculation (10th)", "institution": "Little Star High School, Tengakhat", "score": "75%"}
  ],
  "skills": {
    "languages": ["JavaScript (ES6+)", "TypeScript", "Python"],
    "frontend": ["React.js", "Redux Toolkit", "React Context API", "Material UI", "Tailwind CSS"],
    "ui_layout": ["Mobile-first Design", "Flexbox", "CSS Grid", "Responsive Web Design"],
    "tools": ["Git", "GitHub", "Vite", "npm", "Supabase"],
    "other": ["Basic AI/ML knowledge", "SEO Fundamentals"]
  },
  "projects": [
    {
      "name": "Mukuba Economic Research and Consulting Firm",
      "url": "https://mukubaecon.io/",
      "tech": ["React 19", "Vite", "Tailwind CSS", "Supabase"],
      "description": "Modern, responsive web app for an international economic consulting firm in Zambia. Implemented SEO best practices and integrated Supabase as backend."
    },
    {
      "name": "CADS - Createch Art & Design Studio",
      "url": "https://createchstudio.in",
      "tech": ["React.js", "Material UI", "Responsive Design"],
      "description": "Full website for a Guwahati-based coaching center (Ganeshguri) preparing students for design entrance exams (NID, NIFT, UCEED, NATA, Fine Arts)."
    },
    {
      "name": "Genesis - House of Complete Print Solutions",
      "url": "https://genesispress.in",
      "tech": ["React.js", "Tailwind CSS"],
      "description": "Landing page for a printing company in Six Mile, Barbari, Guwahati, focused on clean UI/UX and fast load times."
    }
  ],
  "research_project": {
    "name": "Assamese Folk Literature RAG",
    "status": "Ongoing - Royal Global University",
    "tech": ["Python", "NLP", "RAG Pipeline", "Vector Search", "OCR", "Multilingual Embeddings"],
    "description": "Building a Retrieval-Augmented Generation pipeline for Assamese folk literature, combining OCR digitization, hybrid vector + keyword search, and multilingual embeddings for a low-resource regional language dataset."
  },
  "achievements": [],
  "certifications": [],
  "career_goal": "Building a strong foundation across full-stack web development and AI/ML, with a focus on creating practical, real-world applications. Open to internships, collaborations, and opportunities that offer hands-on project experience and continued growth as a developer."
}

Also create backend/models.py using Pydantic to define a CandidateProfile model that validates this JSON structure (Contact, Education, Skills, Project, ResearchProject as nested models).

Set up a basic requirements.txt with fastapi, uvicorn, pydantic, python-dotenv, groq.

Confirm the folder structure once done.
```

---

## PHASE 2 — LLM Setup (Groq API)

```
In /backend, create a .env.example file with GROQ_API_KEY=your_key_here.

Create backend/llm_client.py that:
- Loads the Groq API key from environment variables using python-dotenv
- Initializes a Groq client (use the groq Python SDK)
- Exports a function get_llm_response(messages: list) that sends a list of chat messages to the Groq API using the llama-3.3-70b-versatile model (or best available free model) and returns a streaming response generator

Keep this file clean and reusable — it should not contain the system prompt itself, just the API call logic.
```

---

## PHASE 3 — System Prompt

```
Create backend/system_prompt.py with a function build_system_prompt(candidate_data: dict) -> str that generates a system prompt for the LLM. The prompt must:

1. State: "You are the AI representative of [candidate name], speaking to recruiters and hiring managers on their behalf."
2. Instruct the AI to answer ONLY using the information in the candidate profile provided.
3. Explicitly forbid hallucination — if asked something not covered in the data, it must say something like "I don't have that information about [name], but you're welcome to ask them directly."
4. Instruct it to be honest, professional, and conversational — not robotic.
5. Instruct it to speak about the candidate in third person when describing facts, but can use "I" when representing the candidate's voice/perspective (e.g. "I'd love to bring my React skills to your team").
6. Include a rule: never make up skills, experience, or projects not listed in the data.
7. Include a rule: if asked to compare the candidate to other candidates, politely decline and redirect to the candidate's own strengths.

The function should inject the full candidate_profile.json content into the prompt as context.
```

---

## PHASE 4 — Backend API

```
Create backend/main.py using FastAPI with:

1. CORS middleware enabled for the frontend origin (allow all origins for now, restrict later)
2. Load candidate_profile.json on startup
3. POST endpoint /chat that:
   - Accepts a JSON body: { "message": string, "history": [{role, content}, ...] }
   - Builds the system prompt using build_system_prompt()
   - Constructs the full message list: [system_prompt, ...history, new user message]
   - Calls get_llm_response() and streams the response back to the client using FastAPI's StreamingResponse with media_type "text/event-stream"
4. GET endpoint /candidate that returns the full candidate_profile.json (for the frontend to display a profile card)
5. GET endpoint /health for a simple health check

Add proper error handling — if the Groq API key is missing or the call fails, return a clean JSON error response, not a crash.

Test locally with uvicorn main:app --reload and confirm curl -X POST http://localhost:8000/chat works.
```

---

## PHASE 5 — Chat UI (Frontend)

```
In /frontend, set up a React + Vite + Tailwind CSS project. Build a ChatGPT-style chat interface with:

1. A header showing my name "Mahil Sonowal", title "AI Portfolio Assistant", and a subtitle like "Ask me anything about my skills, projects, and experience"
2. A chat window with:
   - User messages right-aligned, AI messages left-aligned, styled as chat bubbles
   - Auto-scroll to the latest message
   - A typing/streaming indicator while the AI is responding
3. An input box at the bottom with a Send button (disabled while a response is streaming)
4. Support for pressing Enter to send (Shift+Enter for new line)
5. Store conversation history in React state (array of {role, content})
6. Dark mode as default, styled with a clean modern aesthetic (rounded corners, soft shadows, accent color of your choice)
7. Fully responsive for mobile

Structure it as clean, componentized code: ChatWindow.jsx, MessageBubble.jsx, ChatInput.jsx, Header.jsx.

Don't wire up the backend yet — use mock/placeholder responses for now so I can see the UI working.
```

---

## PHASE 6 — Connect Frontend & Backend + Streaming

```
Now connect the frontend to the backend:

1. Create a frontend/src/api/chat.js file with a function sendMessage(message, history, onChunk) that:
   - Uses fetch() to POST to http://localhost:8000/chat with { message, history }
   - Reads the response body as a stream using response.body.getReader()
   - Decodes chunks and calls onChunk(text) for each piece as it arrives, so the UI can render text progressively (typewriter effect)

2. Wire this into the ChatWindow component:
   - When the user sends a message, add it to history immediately
   - Call sendMessage, appending streamed chunks to a new AI message bubble in real time
   - Once streaming is done, save the complete AI response into the conversation history array

3. Add a loading state (three-dot typing animation) that shows the moment the request is sent, before the first chunk arrives

4. Add basic error handling — if the backend is unreachable, show a friendly error bubble like "I'm having trouble connecting right now — please try again."

Test end-to-end: typing "Tell me about this candidate" should return a real streamed response from the backend.
```

---

## PHASE 7 — Conversation Memory

```
Update the /chat endpoint and frontend so the AI has proper conversational memory:

1. Confirm the frontend sends the FULL conversation history array with every request (not just the latest message)
2. In backend/main.py, make sure the history is correctly appended after the system prompt, preserving role order (user/assistant alternating)
3. Test this scenario:
   - User: "Tell me about his projects"
   - AI responds listing projects
   - User: "Which one was the hardest?"
   - Confirm the AI correctly understands "one" refers to "projects" from the earlier turn

4. Add a maximum history length (e.g. last 20 messages) to avoid exceeding token limits on long conversations, while keeping the system prompt intact at every request.
```

---

## PHASE 8 — Job Description Matching

```
Add a new feature: Job Description Matching mode.

1. Backend: create a new POST endpoint /match-jd that:
   - Accepts { "job_description": string }
   - Builds a specialized prompt instructing the LLM to act as an honest technical evaluator comparing the candidate_profile data against the pasted job description
   - The response should cover: (a) overall suitability, (b) matching skills/strengths, (c) missing skills/gaps, (d) a recommendation on whether to interview
   - Optional: also return a structured JSON using Pydantic with fields: suitability_score (0-100), matching_skills (list), missing_skills (list), recommendation (string), summary (string) — use the LLM's JSON mode or instruct it to output valid JSON only

2. Frontend: add a toggle or separate tab labeled "For Recruiters — Match a Job Description" with:
   - A textarea to paste the JD
   - An "Analyze Fit" button
   - A results card showing the suitability score (as a progress bar or percentage badge), strengths, gaps, and recommendation

Keep this visually distinct from the normal chat mode — like a dedicated recruiter tool section.
```

---

## PHASE 9 — Deploy Backend

```
Prepare the backend for deployment:

1. Add a Procfile or start command: uvicorn main:app --host 0.0.0.0 --port $PORT
2. Make sure all secrets (GROQ_API_KEY) are read from environment variables, never hardcoded
3. Add a render.yaml (if deploying to Render) or equivalent config for Railway/Koyeb
4. Update CORS settings to allow the specific deployed frontend URL (not "*") once I have it
5. Give me step-by-step instructions to deploy this FastAPI backend to Render's free tier, including setting the GROQ_API_KEY environment variable in their dashboard.
```

---

## PHASE 10 — Deploy Frontend

```
Prepare the frontend for deployment to Vercel:

1. Create a .env.production file with VITE_API_URL pointing to my deployed backend URL (placeholder for now)
2. Update all API calls in the frontend to use import.meta.env.VITE_API_URL instead of a hardcoded localhost URL
3. Add a vercel.json if needed for proper routing
4. Give me step-by-step instructions to deploy this Vite + React app to Vercel, including how to set the VITE_API_URL environment variable in the Vercel dashboard.
```

---

## PHASE 11 — GitHub + README

```
Create a professional README.md for this project including:

1. Project title: "AI Portfolio — Chat with My AI Twin"
2. A one-line pitch: "Instead of reading my resume, chat with an AI that knows everything about me."
3. Live demo link placeholder + screenshot placeholders
4. Features list (chat, streaming, memory, JD matching)
5. Tech stack (FastAPI, Groq API, React, Vite, Tailwind CSS)
6. Local setup instructions for both backend and frontend
7. Environment variables needed
8. Folder structure overview
9. A section: "About This Project" explaining it was built to demonstrate practical skills in LLM integration, full-stack development, and prompt engineering
10. My contact/social links at the bottom

Also create a .gitignore for Python (venv, __pycache__, .env) and Node (node_modules, .env.production, dist).
```

---

## PHASE 12 — Final Polish

```
Add these final polish features:

1. Typing animation for AI responses (character-by-character reveal, even if backend already streams — smooth it out client-side if needed)
2. Light/dark mode toggle (dark mode default)
3. "Clear chat" button that resets conversation state
4. "Copy response" button on each AI message bubble (copies to clipboard with a brief confirmation tooltip)
5. Loading skeleton/spinner while the app initializes and fetches candidate data
6. Smooth mobile responsiveness — test at 375px width
7. A subtle "Powered by Groq + FastAPI + React" footer credit
8. Favicon and page title: "Chat with Mahil's AI"

Do a final pass checking accessibility (proper alt text, keyboard navigation for send button and inputs, sufficient color contrast in dark mode).
```

---

## BONUS PHASE (Optional, pick any)

```
Add ONE of the following bonus features to the existing project:

A) Upload a new resume (PDF) without changing code — parse it with a PDF text extraction library, feed extracted text through the LLM to auto-generate an updated candidate_profile.json, and hot-reload it in the backend.

B) "Why should we hire this candidate?" mode — a dedicated button that triggers a persuasive, honest pitch generated by the LLM using only the candidate profile data.

C) Export the chat as a PDF — add a button that takes the current conversation and generates a downloadable PDF transcript.

D) Multilingual support — detect if the user is typing in Hindi/Assamese and respond in the same language, while keeping the underlying candidate data in English.

Pick whichever fits best and implement it end-to-end, including any needed frontend UI changes.
```

---

## Notes for you (Max)
- Run Phase 1–4 fully locally first and test the backend alone with `curl` or Postman before touching the frontend.
- Keep your Groq API key out of GitHub — double check `.env` is in `.gitignore` before every commit.
- After Phase 6, you'll already have a genuinely demo-able product — good checkpoint to show progress if needed.
- Phases 9–11 (deployment + GitHub) are what actually make this "recruiter-ready" — don't skip them even if the bonus phase looks more fun.
