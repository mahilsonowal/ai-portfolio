import React from 'react'
import {
  ExternalLink,
  Mail,
  MapPin,
  Sparkles,
  ArrowRight,
  Code2,
  Layers,
  BookOpen,
  GraduationCap,
  Briefcase,
  Zap,
  Target,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react'
import profilePic from '../assets/dp3.png'
import JobMatcher from './JobMatcher'

const GithubIcon = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
)

const LinkedinIcon = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.62 1.62 0 0 0-1.63 1.63 1.63 1.63 0 0 0 3.26 0c0-.9-.73-1.63-1.63-1.63z" />
  </svg>
)

const PROJECTS = [
  {
    name: 'Mukuba Economic Research & Consulting',
    url: 'https://mukubaecon.io/',
    tagline: 'International Economic Consulting Web Platform',
    tech: ['React 19', 'Vite', 'Tailwind CSS', 'Supabase', 'SEO Optimization'],
    description:
      'Engineered a high-performance, responsive web application for an international economic research firm based in Zambia. Implemented comprehensive SEO best practices, structured metadata, and integrated Supabase backend.',
    aiPrompt: 'Tell me about the Mukuba Economic Research project Mahil built, including the architecture and tech stack.',
  },
  {
    name: 'CADS — Createch Art & Design Studio',
    url: 'https://createchstudio.in',
    tagline: 'Design Entrance Coaching Center Website',
    tech: ['React.js', 'Material UI', 'Responsive Design', 'Client Portals'],
    description:
      'Developed the complete official website for a premier Guwahati-based coaching academy preparing students for national design entrance examinations (NID, NIFT, UCEED, NATA, Fine Arts).',
    aiPrompt: 'Can you describe the CADS Createch Art & Design Studio website Mahil developed?',
  },
  {
    name: 'Genesis — Complete Print Solutions',
    url: 'https://genesispress.in',
    tagline: 'Commercial Printing House Digital Showcase',
    tech: ['React.js', 'Tailwind CSS', 'Modern UI/UX', 'Performance'],
    description:
      'Created an elegant, responsive digital landing page for a commercial printing business in Six Mile, Guwahati, focusing on rapid load times, interactive service showcases, and clean layout geometry.',
    aiPrompt: 'What was Mahil’s role and tech approach for Genesis Print Solutions?',
  },
]

const SKILL_CATEGORIES = [
  {
    category: 'Core Frontend',
    skills: ['React.js (v18/19)', 'TypeScript', 'JavaScript (ES6+)', 'Redux Toolkit', 'Context API'],
  },
  {
    category: 'UI & Layout Architecture',
    skills: ['Tailwind CSS', 'Material UI', 'Mobile-first Design', 'CSS Grid & Flexbox', 'Responsive Systems'],
  },
  {
    category: 'AI & Backend Integrations',
    skills: ['Python', 'FastAPI', 'RAG Pipelines', 'Vector Search', 'Supabase', 'RESTful APIs'],
  },
  {
    category: 'Tooling & Workflow',
    skills: ['Git & GitHub', 'Vite', 'npm / Node', 'SEO Optimization', 'Deployment (Vercel/Render)'],
  },
]

const EDUCATION = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'The Assam Royal Global University, Guwahati',
    duration: '2025 – 2027',
    score: 'SGPA 8.59 (2nd Semester)',
    highlight: 'Active Research in NLP / RAG for Assamese Folk Literature',
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Dibrugarh University',
    duration: '2022 – 2025',
    score: '75% Aggregate',
    highlight: 'Core foundation in Computer Science, Data Structures & Web Technologies',
  },
]

export default function PortfolioHome({ onNavigateTab, onAskInChat, onTriggerPitch }) {
  const scrollToJdMatcher = () => {
    const el = document.getElementById('jd-matcher-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="flex-1 w-full overflow-y-auto bg-[#ffffff] text-[#1f1f1f] scroll-smooth">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-8 py-8 sm:py-14 space-y-16 sm:space-y-24">

        {/* HERO SECTION */}
        <section className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 sm:gap-12 pt-2 sm:pt-4">
          <div className="flex-1 space-y-5 max-w-2xl">

            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f6f6f6] border border-[#e7e7e7] text-[#594ff4] text-[11px] sm:text-xs font-bold uppercase tracking-[0.075em]">
              <span className="w-2 h-2 rounded-full bg-[#594ff4] animate-pulse"></span>
              Software Developer — Web & AI
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1f1f1f] leading-[1.08]">
              Building scalable web applications & exploring AI.
            </h1>

            <p className="text-base sm:text-lg text-[#5d5d5d] leading-relaxed">
              Hi, I'm <strong className="text-[#1f1f1f] font-semibold">Mahil Sonowal</strong>. I specialize in building responsive React & Tailwind applications with clean code architecture and researching Retrieval-Augmented Generation (RAG) pipelines in NLP.
            </p>

            {/* Quick Action Pill CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigateTab('chat')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#594ff4] hover:bg-[#483ee0] text-white text-xs sm:text-sm font-semibold tracking-tight transition-all shadow-sm cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat with My AI</span>
              </button>

              <button
                onClick={onTriggerPitch}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#f6f6f6] border border-[#594ff4] text-[#594ff4] text-xs sm:text-sm font-semibold tracking-tight transition-all cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Why Hire Me? (60s Pitch)</span>
              </button>

              <button
                onClick={scrollToJdMatcher}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f6f6f6] hover:bg-[#e7e7e7] border border-[#e7e7e7] text-[#1f1f1f] text-xs sm:text-sm font-semibold tracking-tight transition-all cursor-pointer"
              >
                <Target className="w-4 h-4 text-[#594ff4]" />
                <span>Match Your JD</span>
              </button>
            </div>
          </div>

          {/* Profile Card Hero Visual */}
          <div className="relative flex-shrink-0 w-full sm:w-auto flex justify-center">
            <div className="relative p-3 rounded-[32px] bg-[#f6f6f6] border border-[#e7e7e7] shadow-sm">
              <div className="w-48 h-56 sm:w-56 sm:h-64 rounded-[24px] overflow-hidden bg-white border border-[#e7e7e7]">
                <img
                  src={profilePic}
                  alt="Mahil Sonowal"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="mt-3 px-2 flex items-center justify-between text-xs text-[#5d5d5d]">
                <span className="flex items-center gap-1.5 font-medium text-[#1f1f1f]">
                  <MapPin className="w-3.5 h-3.5 text-[#594ff4]" /> Guwahati, India
                </span>
                <span className="text-[11px] font-bold text-[#594ff4] bg-white px-2 py-0.5 rounded-full border border-[#e7e7e7]">
                  Available for Roles
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* METRICS / STATS BLOCK */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">

          <div className="p-5 rounded-[24px] bg-[#f6f6f6] border border-[#e7e7e7] text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-bold text-[#1f1f1f]">3+</span>
            <p className="text-xs text-[#5d5d5d] uppercase tracking-wider font-semibold">
              Production Web Apps
            </p>
          </div>
          <div className="p-5 rounded-[24px] bg-[#f6f6f6] border border-[#e7e7e7] text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-bold text-[#594ff4]">RAG</span>
            <p className="text-xs text-[#5d5d5d] uppercase tracking-wider font-semibold">
              NLP Research Project
            </p>
          </div>
          <div className="p-5 rounded-[24px] bg-[#f6f6f6] border border-[#e7e7e7] text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-bold text-[#1f1f1f]">React 19</span>
            <p className="text-xs text-[#5d5d5d] uppercase tracking-wider font-semibold">
              Modern Frontend Stack
            </p>
          </div>
        </section>

        {/* FEATURED CLIENT PROJECTS */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1f1f1f] tracking-tight">
              Featured Client Projects
            </h2>
            <p className="text-sm text-[#5d5d5d]">
              Real-world web applications built with modern frontend architecture and clean UI layouts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PROJECTS.map((project, idx) => (
              <div
                key={idx}
                className="group flex flex-col justify-between p-6 rounded-[28px] bg-[#f6f6f6] border border-[#e7e7e7] hover:border-[#594ff4] transition-all space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white text-[#594ff4] border border-[#e7e7e7]">
                      {project.tagline}
                    </span>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-full text-[#888888] hover:text-[#594ff4] hover:bg-white transition-colors"
                      title="Visit Live Website"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <h3 className="text-lg font-bold text-[#1f1f1f] group-hover:text-[#594ff4] transition-colors">
                    {project.name}
                  </h3>

                  <p className="text-xs text-[#5d5d5d] leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-4 pt-2 border-t border-[#e7e7e7]">
                  {/* Tech stack pill tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-white text-[#1f1f1f] border border-[#e7e7e7]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Ask AI Prompt Button */}
                  <button
                    onClick={() => onAskInChat(project.aiPrompt)}
                    className="w-full flex items-center justify-between px-3.5 py-2 rounded-full bg-white hover:bg-[#594ff4] hover:text-white border border-[#e7e7e7] text-xs font-semibold text-[#1f1f1f] transition-all cursor-pointer group/btn"
                  >
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#594ff4] group-hover/btn:text-white" />
                      Ask AI about this project
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI & NLP RESEARCH SPOTLIGHT */}
        <section className="p-6 sm:p-8 rounded-[32px] bg-[#f6f6f6] border border-[#e7e7e7] space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.075em] text-[#594ff4]">
                ACADEMIC RESEARCH & AI
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1f1f1f] tracking-tight">
                Assamese Folk Literature RAG Pipeline
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-[#594ff4] border border-[#e7e7e7]">
              Ongoing — Royal Global University
            </span>
          </div>

          <p className="text-sm text-[#5d5d5d] leading-relaxed max-w-3xl">
            Developing an end-to-end Retrieval-Augmented Generation (RAG) architecture tailored for low-resource regional languages. The system integrates OCR digitization of Assamese historical texts, hybrid dense + sparse vector search, and multilingual embeddings to deliver accurate, grounded semantic query answers without hallucinations.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {['Python', 'NLP', 'RAG Architecture', 'Vector Search', 'OCR Digitization', 'Multilingual Embeddings'].map(
              (badge, i) => (
                <span
                  key={i}
                  className="text-xs font-medium px-3 py-1 rounded-full bg-white text-[#1f1f1f] border border-[#e7e7e7]"
                >
                  {badge}
                </span>
              )
            )}
          </div>

          <div className="pt-2">
            <button
              onClick={() =>
                onAskInChat(
                  'Can you give me a deep dive into Mahil’s Assamese Folk Literature RAG research, methodology, and tools?'
                )
              }
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:border-[#594ff4] text-[#594ff4] border border-[#e7e7e7] text-xs font-semibold transition-all cursor-pointer"
            >
              <span>Ask AI Twin about the RAG Architecture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        {/* TECHNICAL SKILLS MATRIX */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1f1f1f] tracking-tight">
              Technical Stack & Competencies
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-[24px] bg-[#f6f6f6] border border-[#e7e7e7] space-y-3"
              >
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#594ff4]">
                  {cat.category}
                </h3>
                <ul className="space-y-1.5 text-xs text-[#1f1f1f]">
                  {cat.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#594ff4]"></span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1f1f1f] tracking-tight">
              Education & Degrees
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EDUCATION.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 rounded-[28px] bg-[#f6f6f6] border border-[#e7e7e7] space-y-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#594ff4] px-2.5 py-0.5 rounded-full bg-white border border-[#e7e7e7]">
                    {edu.duration}
                  </span>
                  <span className="text-xs font-bold text-[#1f1f1f] bg-white px-2.5 py-0.5 rounded-full border border-[#e7e7e7]">
                    {edu.score}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#1f1f1f]">
                  {edu.degree}
                </h3>
                <p className="text-xs text-[#5d5d5d]">
                  {edu.institution}
                </p>
                <p className="text-xs text-[#1f1f1f] pt-1 font-medium">
                  • {edu.highlight}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* EMBEDDED JOB MATCHER SECTION */}
        <section id="jd-matcher-section" className="space-y-4 pt-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1f1f1f] tracking-tight">
              Instant Job Description Matcher
            </h2>
            <p className="text-sm text-[#5d5d5d]">
              Hiring managers & recruiters: paste your candidate requirements to get an objective fit assessment.
            </p>
          </div>

          <JobMatcher onAskInChat={onAskInChat} />
        </section>

        {/* INTERACTIVE AI TWIN CALLOUT BANNER */}
        <section className="p-8 sm:p-10 rounded-[32px] bg-[#f6f6f6] border border-[#e7e7e7] text-center space-y-5">
          <div className="w-12 h-12 rounded-full bg-white border border-[#e7e7e7] text-[#594ff4] flex items-center justify-center mx-auto shadow-sm">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1f1f1f] tracking-tight">
              Want to ask more questions?
            </h2>
            <p className="text-sm text-[#5d5d5d]">
              Instead of manually browsing through a static resume, chat with an AI twin that knows every verified detail of Mahil's experience, code projects, and technical skills.
            </p>
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigateTab('chat')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#594ff4] hover:bg-[#483ee0] text-white text-xs sm:text-sm font-semibold tracking-tight transition-all cursor-pointer"
            >
              <span>Launch Full Interactive AI Chat</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-16 pt-12 pb-8 border-t border-[#e7e7e7] space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#1f1f1f]">
                Mahil Sonowal
              </h3>
              <p className="text-xs text-[#5d5d5d]">
                Software Developer — Web & AI • Guwahati, Assam
              </p>
            </div>

            {/* Direct Contact Pills */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="mailto:mahilsonowalpro5@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f6f6f6] hover:bg-[#e7e7e7] border border-[#e7e7e7] text-xs font-semibold text-[#1f1f1f] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#594ff4]" />
                <span>mahilsonowalpro5@gmail.com</span>
              </a>

              <a
                href="https://linkedin.com/in/mahil-sonowal"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#f6f6f6] hover:bg-[#e7e7e7] border border-[#e7e7e7] text-[#1f1f1f] hover:text-[#594ff4] transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              <a
                href="https://github.com/mahilsonowal"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#f6f6f6] hover:bg-[#e7e7e7] border border-[#e7e7e7] text-[#1f1f1f] transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="text-center text-xs text-[#888888] pt-4 border-t border-[#e7e7e7]">
            © {new Date().getFullYear()} Mahil Sonowal • Powered by Groq
          </div>
        </footer>
      </div>
    </div>
  )
}
