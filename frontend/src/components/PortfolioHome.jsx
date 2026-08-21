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
  Terminal,
  Activity,
  Cpu,
  Database,
  Globe,
  Check,
  Phone,
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
    name: 'Mukuba Economic Research',
    tag: 'International Consulting Platform',
    location: 'Zambia / Remote',
    url: 'https://mukubaecon.io/',
    tech: ['React 19', 'Vite', 'Tailwind CSS', 'Supabase'],
    description:
      'Full-scale responsive digital platform for an international economic research and consulting firm in Zambia. Includes SEO infrastructure and Supabase relational data backend.',
    aiPrompt: 'Tell me about the Mukuba Economic Research platform Mahil developed.',
  },
  {
    name: 'CADS Createch Studio',
    tag: 'Design Coaching Academy',
    location: 'Guwahati, Assam',
    url: 'https://createchstudio.in',
    tech: ['React.js', 'Material UI', 'Responsive Design'],
    description:
      'Official web platform for premier design entrance examination coaching (NID, NIFT, UCEED, NATA, Fine Arts) in Guwahati with responsive course modules.',
    aiPrompt: 'Can you describe the CADS Createch Studio website Mahil built?',
  },
  {
    name: 'Genesis Print Solutions',
    tag: 'Commercial Print House',
    location: 'Guwahati, Assam',
    url: 'https://genesispress.in',
    tech: ['React.js', 'Tailwind CSS', 'Performance'],
    description:
      'Digital showcase for a high-volume commercial offset printing business with high-speed rendering, catalog showcases, and order pipelines.',
    aiPrompt: 'What was Mahil’s role and tech approach for Genesis Print Solutions?',
  },
]

const SKILL_GROUPS = [
  {
    title: 'Frontend Systems',
    skills: ['React.js (18/19)', 'TypeScript', 'JavaScript (ES6+)', 'Redux Toolkit', 'Context API'],
  },
  {
    title: 'UI & Layout Architecture',
    skills: ['Tailwind CSS', 'Material UI', 'Mobile-First Layouts', 'CSS Grid / Flexbox', 'Design Systems'],
  },
  {
    title: 'AI & Backend Integrations',
    skills: ['Python 3.11', 'FastAPI', 'RAG Pipelines', 'Vector Search', 'Supabase PostgreSQL'],
  },
  {
    title: 'Tooling & Deployment',
    skills: ['Git / GitHub', 'Vite', 'npm / Node.js', 'SEO Best Practices', 'Vercel / Render'],
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
    <div className="flex-1 w-full overflow-y-auto bg-[#ffffff] text-[#312f27] font-sans antialiased selection:bg-[#ffc500] selection:text-[#312f27]">

      {/* 1. SLATE GRAY HERO CANVAS (#788086) */}
      <section className="bg-[#788086] text-white pt-16 sm:pt-24 pb-20 px-4 sm:px-8 border-b border-[#312f27]/20">
        <div className="max-w-[1100px] mx-auto text-center space-y-8">

          {/* Display Wordmark: lowercase, bold sunflower yellow (#ffc500) */}
          <div className="space-y-3">
            <span className="text-xs sm:text-sm uppercase tracking-[0.08em] font-extrabold text-[#ffc500] block">
              WEB & AI DEVELOPER
            </span>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-[#ffc500] tracking-tight leading-[1.0] lowercase">
              mahil sonowal
            </h1>
            <p className="text-xl sm:text-3xl font-bold text-[#ffffff] max-w-3xl mx-auto leading-snug tracking-tight">
              Building modern React web apps & researching multilingual RAG pipelines.
            </p>
          </div>

          {/* Subhead details */}
          <p className="text-sm sm:text-base text-[#e9e4d9] max-w-2xl mx-auto leading-relaxed">
            I care about clean architecture and component modularity as much as I care about building AI systems that actually work in the real world.
          </p>

          {/* Harmonious Action CTA Pills (Carbon Black #312f27 + Paper White + Sand) */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => onNavigateTab('chat')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[34px] bg-[#312f27] hover:bg-[#1f1e18] text-[#ffc500] border-2 border-[#ffc500]/50 text-sm font-bold tracking-tight shadow-[0_4px_14px_rgba(0,0,0,0.3)] transition-all cursor-pointer active:scale-98"
            >
              <MessageSquare className="w-4 h-4 text-[#ffc500]" />
              <span>Ask Mahil's AI Twin</span>
            </button>

            <button
              onClick={onTriggerPitch}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[34px] bg-[#ffffff] hover:bg-[#f6f6f6] text-[#312f27] text-sm font-bold tracking-tight shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-all cursor-pointer active:scale-98"
            >
              <Zap className="w-4 h-4 text-[#312f27] fill-[#ffc500]" />
              <span>Why Hire Me? (60-Sec Pitch)</span>
            </button>

            <button
              onClick={scrollToJdMatcher}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[34px] bg-[#312f27]/40 hover:bg-[#312f27]/70 text-[#ffffff] border border-[#ffffff]/20 text-sm font-bold tracking-tight transition-all cursor-pointer"
            >
              <Target className="w-4 h-4 text-[#ffc500]" />
              <span>Match Your Job Description</span>
            </button>
          </div>

          {/* Device Showcase Stage (Playdate Retro Stage Visual) */}
          <div className="pt-6 max-w-3xl mx-auto">
            <div className="bg-[#ffc500] p-4 sm:p-6 rounded-[20px] shadow-2xl border-4 border-[#312f27] text-left text-[#312f27] space-y-4">
              <div className="flex items-center justify-between border-b-2 border-[#312f27]/20 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#312f27]"></span>
                  <span className="w-3 h-3 rounded-full bg-[#312f27]"></span>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    SYSTEM DASHBOARD • MAHIL.DEV
                  </span>
                </div>
                <span className="text-[10px] font-extrabold bg-[#312f27] text-[#ffc500] px-2.5 py-0.5 rounded-[4px] uppercase">
                  ACTIVE
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#ffffff] p-3.5 rounded-[6px] border-2 border-[#312f27] space-y-1">
                  <span className="text-[10px] font-bold uppercase text-[#788086]">Currently</span>
                  <div className="text-xl font-black text-[#312f27]">Open to Work</div>
                  <p className="text-[11px] font-bold text-[#312f27]">Jobs & collaborations</p>
                </div>
                <div className="bg-[#ffffff] p-3.5 rounded-[6px] border-2 border-[#312f27] space-y-1">
                  <span className="text-[10px] font-bold uppercase text-[#788086]">Production</span>
                  <div className="text-xl font-black text-[#312f27]">3+ Web Apps</div>
                  <p className="text-[11px] font-bold text-[#312f27]">React 19 & Supabase</p>
                </div>
                <div className="bg-[#ffffff] p-3.5 rounded-[6px] border-2 border-[#312f27] space-y-1">
                  <span className="text-[10px] font-bold uppercase text-[#788086]">AI Research</span>
                  <div className="text-xl font-black text-[#312f27]">RAG Pipeline</div>
                  <p className="text-[11px] font-bold text-[#312f27]">Assamese Folk NLP</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SUNBEAM YELLOW SECTION BAND (#ffc500) */}
      <section className="bg-[#ffc500] text-[#312f27] py-16 sm:py-20 px-4 sm:px-8">
        <div className="max-w-[1100px] mx-auto space-y-10">

          <div className="text-left space-y-2 max-w-3xl">
            <span className="text-xs font-black uppercase tracking-[0.08em] text-[#312f27]/70 block">
              THE PHILOSOPHY
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Simple, modular code that scales from prototype to production.
            </h2>
            <p className="text-base sm:text-lg font-medium text-[#312f27]/85 leading-relaxed">
              Every interface I build is engineered with modern React standards, mobile-first responsive geometry, and clean API integrations. No bloated libraries, no slow rendering.
            </p>
          </div>

          {/* Feature Highlights on Yellow */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-left">
            <div className="bg-[#ffffff] p-6 rounded-[6px] border-2 border-[#312f27] shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-[6px] bg-[#ffc500] border-2 border-[#312f27] flex items-center justify-center text-[#312f27] font-black">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-[#312f27]">Clean React Stack</h3>
              <p className="text-xs sm:text-sm text-[#312f27]/80 leading-relaxed font-medium">
                Vite HMR, TypeScript typing, modular UI components, and state management via Redux Toolkit and Context API.
              </p>
            </div>

            <div className="bg-[#ffffff] p-6 rounded-[6px] border-2 border-[#312f27] shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-[6px] bg-[#ffc500] border-2 border-[#312f27] flex items-center justify-center text-[#312f27] font-black">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-[#312f27]">Backend & Cloud</h3>
              <p className="text-xs sm:text-sm text-[#312f27]/80 leading-relaxed font-medium">
                Supabase PostgreSQL, Python FastAPI endpoints, RESTful microservices, and automated Vercel/Render deployments.
              </p>
            </div>

            <div className="bg-[#ffffff] p-6 rounded-[6px] border-2 border-[#312f27] shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-[6px] bg-[#ffc500] border-2 border-[#312f27] flex items-center justify-center text-[#312f27] font-black">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-[#312f27]">Grounded AI & RAG</h3>
              <p className="text-xs sm:text-sm text-[#312f27]/80 leading-relaxed font-medium">
                Retrieval-Augmented Generation for low-resource languages with dense vector embeddings and zero hallucinations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PAPER WHITE GAME / PROJECT TILES (#ffffff with 2.85px radius) */}
      <section className="bg-[#ffffff] py-20 px-4 sm:px-8 border-b border-[#efefef]">
        <div className="max-w-[1100px] mx-auto space-y-12 text-left">

          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-[0.08em] text-[#312f27] block">
              CLIENT WORK
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#312f27] tracking-tight">
              Featured Web Platforms
            </h2>
            <p className="text-base text-[#788086]">
              Real client deployments with live URLs, clean responsive layouts, and production backend integrations.
            </p>
          </div>

          {/* 3-Column Card Grid (2.85px radius, crisp retro edges) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROJECTS.map((project, idx) => (
              <div
                key={idx}
                className="bg-[#ffffff] border-2 border-[#312f27] rounded-[2.85px] p-6 shadow-sm flex flex-col justify-between space-y-6 hover:translate-y-[-2px] transition-transform"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-[2px] bg-[#ffc500] text-[#312f27]">
                      {project.tag}
                    </span>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#312f27] hover:text-[#788086] transition-colors"
                      title="Visit Live Site"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <h3 className="text-xl font-black text-[#312f27]">
                    {project.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#788086] leading-relaxed font-normal">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t-2 border-[#312f27]/10">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-bold px-2 py-0.5 rounded-[2px] bg-[#efefef] text-[#312f27]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2.5 rounded-[28.5px] bg-[#312f27] hover:bg-[#1a1814] text-white text-xs font-bold transition-all shadow-sm"
                    >
                      Live Website ↗
                    </a>
                    <button
                      onClick={() => onAskInChat(project.aiPrompt)}
                      className="px-3.5 py-2.5 rounded-[28.5px] bg-[#ffc500] hover:bg-[#e6b000] text-[#312f27] text-xs font-bold transition-all cursor-pointer shadow-sm"
                      title="Ask AI"
                    >
                      Ask AI 💬
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SAND CALLOUT & AI RAG RESEARCH SECTION (#e9e4d9) */}
      <section className="bg-[#e9e4d9] py-20 px-4 sm:px-8 border-b border-[#312f27]/15 text-left">
        <div className="max-w-[1100px] mx-auto space-y-10">

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-[0.08em] text-[#312f27] block">
                ACADEMIC RESEARCH & NLP
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#312f27] tracking-tight">
                Assamese Folk Literature RAG
              </h2>
            </div>
            <span className="px-3.5 py-1.5 rounded-[28.5px] bg-[#312f27] text-[#ffc500] text-xs font-extrabold">
              The Assam Royal Global University • 2025–2027
            </span>
          </div>

          {/* Speech-Bubble Conversational Callout */}
          <div className="relative p-6 sm:p-8 bg-[#ffffff] border-2 border-[#312f27] rounded-[10px] space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#312f27]">
              <Sparkles className="w-4 h-4 text-[#ffc500] fill-current" />
              <span>Low-Resource Language Architecture</span>
            </div>

            <p className="text-sm sm:text-base font-medium text-[#312f27] leading-relaxed">
              "Building an end-to-end Retrieval-Augmented Generation pipeline tailored for low-resource Assamese regional folklore. Combines OCR text normalization, dense multilingual vector embeddings (<code className="bg-[#efefef] px-1.5 py-0.5 rounded font-mono text-xs text-[#312f27] font-bold">multilingual-e5-base</code>), and hybrid sparse BM25 indexing for zero-hallucination grounded responses."
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-[#e9e4d9]/50 rounded-[6px] border border-[#312f27]/20 text-xs">
                <strong className="block text-[#312f27] font-bold">1. OCR Digitization</strong>
                <span className="text-[#788086]">Extracts historical Assamese text archives</span>
              </div>
              <div className="p-3 bg-[#e9e4d9]/50 rounded-[6px] border border-[#312f27]/20 text-xs">
                <strong className="block text-[#312f27] font-bold">2. Hybrid Vector Index</strong>
                <span className="text-[#788086]">Dense semantic search + BM25 keyword matching</span>
              </div>
              <div className="p-3 bg-[#e9e4d9]/50 rounded-[6px] border border-[#312f27]/20 text-xs">
                <strong className="block text-[#312f27] font-bold">3. Grounded Synthesis</strong>
                <span className="text-[#788086]">Strict citation verification to prevent drift</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() =>
                  onAskInChat(
                    'Can you give me a deep dive into Mahil’s Assamese Folk Literature RAG research, methodology, and tools?'
                  )
                }
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[28.5px] bg-[#312f27] hover:bg-[#1a1814] text-[#ffc500] border border-[#ffc500]/40 text-xs font-bold tracking-tight transition-all cursor-pointer shadow-sm"
              >
                <span>Ask AI Twin about the RAG Architecture ➜</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SKILLS MATRIX & EDUCATION (Paper White Section) */}
      <section className="bg-[#ffffff] py-20 px-4 sm:px-8 border-b border-[#efefef] text-left">
        <div className="max-w-[1100px] mx-auto space-y-16">

          {/* Skills Grid */}
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-[0.08em] text-[#312f27] block">
                COMPETENCIES
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#312f27] tracking-tight">
                Technical Stack
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SKILL_GROUPS.map((group, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-[#ffffff] border-2 border-[#312f27] rounded-[2.85px] space-y-3"
                >
                  <h3 className="text-xs font-black uppercase tracking-wider text-[#312f27]">
                    {group.title}
                  </h3>
                  <ul className="space-y-1.5 text-xs text-[#312f27] font-medium">
                    {group.skills.map((s, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#ffc500] border border-[#312f27]"></span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Timeline */}
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-[0.08em] text-[#312f27] block">
                ACADEMICS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#312f27] tracking-tight">
                Education & Degrees
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-[#efefef] border-2 border-[#312f27] rounded-[2.85px] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#312f27]">2025 – 2027</span>
                  <span className="text-xs font-black bg-[#ffc500] text-[#312f27] px-2 py-0.5 rounded-[2px]">
                    SGPA 8.59 (2nd Sem)
                  </span>
                </div>
                <h3 className="text-lg font-black text-[#312f27]">
                  Master of Computer Applications (MCA)
                </h3>
                <p className="text-xs text-[#788086] font-medium">
                  The Assam Royal Global University, Guwahati
                </p>
                <p className="text-xs text-[#312f27] font-semibold pt-1">
                  • Focus on Natural Language Processing & Full-Stack Systems
                </p>
              </div>

              <div className="p-6 bg-[#efefef] border-2 border-[#312f27] rounded-[2.85px] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#312f27]">2022 – 2025</span>
                  <span className="text-xs font-black bg-[#ffc500] text-[#312f27] px-2 py-0.5 rounded-[2px]">
                    75% Aggregate
                  </span>
                </div>
                <h3 className="text-lg font-black text-[#312f27]">
                  Bachelor of Computer Applications (BCA)
                </h3>
                <p className="text-xs text-[#788086] font-medium">
                  Dibrugarh University
                </p>
                <p className="text-xs text-[#312f27] font-semibold pt-1">
                  • Core CS: Data Structures, Algorithms, Database Management & Web Dev
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. EMBEDDED JOB MATCHER (Sunbeam Yellow Section) */}
      <section id="jd-matcher-section" className="bg-[#ffc500] py-20 px-4 sm:px-8 border-b border-[#312f27]/20 text-left">
        <div className="max-w-[1100px] mx-auto space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-[0.08em] text-[#312f27]/70 block">
              RECRUITER SUITABILITY EVALUATOR
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#312f27] tracking-tight">
              Instant Job Description Fit Matcher
            </h2>
            <p className="text-base text-[#312f27]/85 font-medium max-w-2xl">
              Paste your role requirements below to receive an objective suitability analysis against Mahil's verified projects and skills.
            </p>
          </div>

          <div className="bg-[#ffffff] p-4 sm:p-6 rounded-[6px] border-4 border-[#312f27] shadow-xl">
            <JobMatcher onAskInChat={onAskInChat} />
          </div>
        </div>
      </section>

      {/* 7. FULL-BLEED CARBON FOOTER (#312f27) */}
      <footer className="bg-[#312f27] text-white pt-16 pb-12 px-4 sm:px-8 text-left">
        <div className="max-w-[1100px] mx-auto space-y-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-[#ffc500] lowercase">
                mahil sonowal
              </h3>
              <p className="text-xs sm:text-sm text-[#b1afa7] max-w-sm font-medium">
                Software Developer — Web & AI • Guwahati, Assam, India
              </p>
            </div>

            {/* Direct Connect Pills */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="mailto:mahilsonowalpro5@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[28.5px] bg-[#ffc500] hover:bg-[#e6b000] text-[#312f27] text-xs font-extrabold transition-all shadow-sm"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>mahilsonowalpro5@gmail.com</span>
              </a>

              <a
                href="https://linkedin.com/in/mahil-sonowal"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-[28.5px] bg-[#ffffff]/10 hover:bg-[#ffc500] hover:text-[#312f27] text-white transition-all"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              <a
                href="https://github.com/mahilsonowal"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-[28.5px] bg-[#ffffff]/10 hover:bg-[#ffc500] hover:text-[#312f27] text-white transition-all"
                title="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="pt-8 border-t border-[#ffffff]/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#b1afa7] gap-2">
            <span>© {new Date().getFullYear()} Mahil Sonowal. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
