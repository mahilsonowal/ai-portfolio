import React, { useState } from 'react'
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Award,
  ArrowRight,
  Loader2,
  Copy,
  Check,
  RotateCcw,
  Briefcase,
  FileText,
  TrendingUp,
} from 'lucide-react'
import { matchJobDescription } from '../api/chat'

const SAMPLE_JDS = [
  {
    label: 'Frontend Developer Intern',
    text: `Role: Frontend Developer Intern
Location: Remote / Hybrid
Requirements:
- Strong hands-on experience in React.js and modern JavaScript/TypeScript (ES6+).
- Proficiency with CSS frameworks, particularly Tailwind CSS or Material UI.
- Understanding of responsive design, CSS Grid, and Flexbox layouts.
- Familiarity with Git/GitHub, Vite, and state management (Redux Toolkit or Context API).
- Experience with backend integrations (REST APIs, Supabase) and enthusiasm for AI/RAG is a major plus!`,
  },
  {
    label: 'React & UI/UX Developer',
    text: `Job Title: React & UI/UX Engineer
Key Responsibilities:
- Build pixel-perfect, responsive web applications from Figma mockups.
- Optimize web app performance, SEO metrics, and accessibility.
- Collaborate on client portals, consulting websites, and marketing landing pages.
- Experience with React 19, Tailwind CSS, component modularity, and clean code principles.`,
  },
  {
    label: 'Full Stack & AI Developer',
    text: `Role: Junior Full Stack & AI Associate
Requirements:
- Python and JavaScript/TypeScript programming knowledge.
- Frontend development in React.js.
- Knowledge of Retrieval-Augmented Generation (RAG), vector databases, embeddings, and NLP pipelines.
- Familiarity with FastAPI, REST APIs, and database solutions like PostgreSQL/Supabase.`,
  },
]

export default function JobMatcher({ onAskInChat }) {
  const [jobDescription, setJobDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)

  const handleAnalyze = async (e) => {
    if (e) e.preventDefault()
    if (!jobDescription.trim() || jobDescription.trim().length < 20 || loading) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const data = await matchJobDescription(jobDescription.trim())
      setResult(data)
    } catch (err) {
      console.error('JD Match Error:', err)
      setError(
        err.message || 'Failed to analyze job description. Please ensure the backend is running.'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleCopyReport = async () => {
    if (!result) return
    const textReport = `--- MAHIL SONOWAL: JOB FIT EVALUATION REPORT ---
Suitability Score: ${result.suitability_score}%
Recommendation: ${result.recommendation}

SUMMARY:
${result.summary}

MATCHING SKILLS:
${result.matching_skills.map((s) => `• ${s}`).join('\n')}

SKILL GAPS / UPSKILLING AREAS:
${result.missing_skills.map((s) => `• ${s}`).join('\n')}

KEY STRENGTHS:
${result.key_strengths.map((s) => `• ${s}`).join('\n')}
`
    try {
      await navigator.clipboard.writeText(textReport)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy report:', err)
    }
  }

  const getScoreColor = (score) => {
    if (score >= 85) return 'from-emerald-500 to-teal-400 text-emerald-400'
    if (score >= 70) return 'from-indigo-500 to-cyan-400 text-indigo-400'
    if (score >= 50) return 'from-amber-500 to-yellow-400 text-amber-400'
    return 'from-rose-500 to-pink-400 text-rose-400'
  }

  return (
    <div className="flex-1 w-full overflow-y-auto px-4 sm:px-8 py-6 max-w-4xl mx-auto space-y-6 animate-fade-in scroll-smooth">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900/90 to-purple-950/60 border border-indigo-500/20 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <Briefcase className="w-3.5 h-3.5" />
            Recruiter & Hiring Tool
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Job Description Fit Evaluator
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Paste any Job Description or internship posting below. The AI evaluator will compare Mahil's verified skills, projects, and academic background to generate an instant, honest suitability assessment.
          </p>

          {/* Quick Preset Badges */}
          <div className="pt-2">
            <span className="text-xs text-slate-400 font-medium block mb-2">
              Or test with sample JD presets:
            </span>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_JDS.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => setJobDescription(sample.text)}
                  className="text-xs px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-indigo-600/30 border border-slate-700/80 hover:border-indigo-500/40 text-slate-300 hover:text-white transition-all cursor-pointer"
                >
                  + {sample.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <form onSubmit={handleAnalyze} className="space-y-4">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-sm relative">
          <div className="flex items-center justify-between mb-2.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              Paste Job Description
            </label>
            {jobDescription && (
              <button
                type="button"
                onClick={() => setJobDescription('')}
                className="text-xs text-slate-400 hover:text-rose-400 transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            disabled={loading}
            rows={6}
            placeholder="Paste role requirements, tech stack, and responsibilities here..."
            className="w-full bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 resize-y transition-all font-mono leading-relaxed"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-2 border-t border-slate-800/80">
            <span className="text-xs text-slate-400">
              {jobDescription.trim().length < 20 ? (
                <span className="text-slate-500">
                  ⚠️ Type/paste a JD (min 20 chars) or click a preset above to enable
                </span>
              ) : (
                <span className="text-emerald-400 font-medium">
                  ✓ Ready for evaluation ({jobDescription.trim().length} characters)
                </span>
              )}
            </span>

            <button
              type="submit"
              disabled={loading || jobDescription.trim().length < 20}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 disabled:from-slate-800 disabled:to-slate-800 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/20 disabled:shadow-none cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing Match...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Analyze Candidate Fit
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Error Display */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="block font-semibold">Evaluation Error</strong>
            {error}
          </div>
        </div>
      )}

      {/* Results Section */}
      {result && (
        <div className="space-y-5 animate-fade-in pb-8">
          {/* Top Score & Recommendation Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
              {/* Score Metric */}
              <div className="flex items-center gap-5">
                <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-950 border border-slate-800 shadow-inner">
                  <div className="text-center">
                    <span className={`text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-br ${getScoreColor(result.suitability_score)} bg-clip-text text-transparent`}>
                      {result.suitability_score}%
                    </span>
                    <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Fit Score
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Recommendation
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-indigo-400" />
                    {result.recommendation}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Based on Mahil's verified projects, technical stack, and education.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
                <button
                  onClick={handleCopyReport}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Report
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setResult(null)
                    setJobDescription('')
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </button>
              </div>
            </div>

            {/* Executive Summary */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
                Fit Assessment Summary
              </h4>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
                {result.summary}
              </p>
            </div>

            {/* Strengths & Gaps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              {/* Matching Skills */}
              <div className="bg-slate-950/60 border border-emerald-500/20 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  Matching Skills & Strengths
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {result.matching_skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                    >
                      <Check className="w-3 h-3 text-emerald-400" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills / Gaps */}
              <div className="bg-slate-950/60 border border-amber-500/20 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                  <AlertCircle className="w-4 h-4" />
                  Missing Skills / Gaps
                </div>
                {result.missing_skills.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {result.missing_skills.map((gap, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20"
                      >
                        • {gap}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">
                    No major technical skill gaps identified for this role!
                  </p>
                )}
              </div>
            </div>

            {/* Standout Advantages */}
            {result.key_strengths && result.key_strengths.length > 0 && (
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  Key Standout Advantages
                </h4>
                <ul className="space-y-2">
                  {result.key_strengths.map((strength, idx) => (
                    <li
                      key={idx}
                      className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5 bg-slate-950/40 p-3 rounded-xl border border-slate-800/60"
                    >
                      <Sparkles className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cross-Link to AI Chat */}
            {onAskInChat && (
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 bg-indigo-950/20 p-4 rounded-2xl border border-indigo-500/20">
                <div className="text-xs text-slate-300">
                  Want to interview Mahil's AI twin regarding these specific requirements?
                </div>
                <button
                  onClick={() =>
                    onAskInChat(
                      `Based on this job description, can you discuss your relevant experience and how you would address any missing areas like ${result.missing_skills.slice(0, 2).join(', ') || 'new tools'}?`
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/20 cursor-pointer flex-shrink-0"
                >
                  Discuss in AI Chat
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
