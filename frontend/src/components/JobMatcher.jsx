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

  return (
    <div className="flex-1 w-full overflow-y-auto px-4 sm:px-8 py-8 max-w-[1000px] mx-auto space-y-8 animate-fade-in scroll-smooth bg-[#ffffff] text-[#312f27]">

      {/* Header Banner */}
      <div className="bg-[#efefef] border-2 border-[#312f27]/20 rounded-[12px] p-6 sm:p-8 space-y-4">
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#312f27]">
            Job Description Fit Evaluator
          </h2>
          <p className="text-sm text-[#788086] max-w-2xl leading-relaxed font-medium">
            Paste any Job Description or internship posting below. The AI evaluator will compare Mahil's verified skills, projects, and academic background to generate an instant, honest suitability assessment.
          </p>

          {/* Quick Preset Badges */}
          <div className="pt-2">
            <span className="text-xs text-[#788086] font-bold block mb-2">
              Or test with sample JD presets:
            </span>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_JDS.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => setJobDescription(sample.text)}
                  className="text-xs px-3.5 py-1.5 rounded-[28.5px] bg-white hover:bg-[#ffc500] hover:text-[#312f27] border-2 border-[#312f27]/20 text-[#312f27] font-bold transition-all cursor-pointer shadow-xs"
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
        <div className="bg-[#efefef] border-2 border-[#312f27]/20 rounded-[12px] p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black text-[#312f27] flex items-center gap-1.5 uppercase tracking-[0.08em]">
              <FileText className="w-3.5 h-3.5 text-[#312f27]" />
              Paste Job Description
            </label>
            {jobDescription && (
              <button
                type="button"
                onClick={() => setJobDescription('')}
                className="text-xs text-[#788086] hover:text-rose-600 font-bold transition-colors cursor-pointer"
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
            className="w-full bg-white border-2 border-[#312f27]/20 rounded-[8px] p-4 text-sm text-[#312f27] placeholder-[#788086] focus:outline-none focus:border-[#312f27] resize-y transition-all font-mono leading-relaxed"
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[#312f27]/10">
            <span className="text-xs text-[#788086]">
              {jobDescription.trim().length < 20 ? (
                <span>
                  ⚠️ Type/paste a JD (min 20 chars) or click a preset above to enable
                </span>
              ) : (
                <span className="text-[#312f27] font-bold">
                  ✓ Ready for evaluation ({jobDescription.trim().length} characters)
                </span>
              )}
            </span>

            {/* Analyze CTA Button */}
            <button
              type="submit"
              disabled={loading || jobDescription.trim().length < 20}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-[28.5px] bg-[#312f27] hover:bg-[#1a1814] disabled:bg-[#e9e4d9] text-[#ffc500] disabled:text-[#b1afa7] font-bold text-xs sm:text-sm tracking-tight transition-all cursor-pointer disabled:cursor-not-allowed active:scale-98 shadow-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#ffc500]" />
                  Analyzing Match...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#ffc500] fill-current" />
                  Analyze Candidate Fit
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Error Display */}
      {error && (
        <div className="p-4 rounded-[8px] bg-rose-50 border-2 border-rose-200 text-rose-800 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="block font-bold">Evaluation Error</strong>
            {error}
          </div>
        </div>
      )}

      {/* Results Section */}
      {result && (
        <div className="space-y-6 animate-fade-in pb-12">
          <div className="bg-[#efefef] border-2 border-[#312f27]/20 rounded-[16px] p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#312f27]/10">

              {/* Score Metric Display */}
              <div className="flex items-center gap-5">
                <div className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-[8px] bg-[#ffc500] border-2 border-[#312f27] shadow-sm">
                  <div className="text-center">
                    <span className="text-3xl sm:text-4xl font-black tracking-tight text-[#312f27]">
                      {result.suitability_score}%
                    </span>
                    <span className="block text-[10px] uppercase font-extrabold text-[#312f27] tracking-wider">
                      FIT SCORE
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-black uppercase tracking-[0.08em] text-[#312f27]">
                      RECOMMENDATION
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-[#312f27] flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#312f27]" />
                    {result.recommendation}
                  </h3>
                  <p className="text-xs text-[#788086] mt-1 font-medium">
                    Based on Mahil's verified projects, technical stack, and education.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
                <button
                  onClick={handleCopyReport}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-[28.5px] text-xs font-bold bg-white hover:bg-[#ffc500] text-[#312f27] border-2 border-[#312f27]/20 transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#312f27]" />
                      <span className="text-[#312f27]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#312f27]" />
                      Copy Report
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setResult(null)
                    setJobDescription('')
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-[28.5px] text-xs font-bold text-[#788086] hover:text-[#312f27] hover:bg-white transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </button>
              </div>
            </div>

            {/* Executive Summary */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.08em] text-[#312f27] mb-2 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#312f27]" />
                FIT ASSESSMENT SUMMARY
              </h4>
              <p className="text-sm sm:text-[15px] text-[#312f27] leading-relaxed bg-white p-5 rounded-[8px] border-2 border-[#312f27]/15 font-medium">
                {result.summary}
              </p>
            </div>

            {/* Strengths & Gaps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              {/* Matching Skills */}
              <div className="bg-white border-2 border-[#312f27]/15 rounded-[8px] p-5 space-y-3">
                <div className="flex items-center gap-2 text-[#312f27] font-black text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-[#312f27]" />
                  Matching Skills & Strengths
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {result.matching_skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-[4px] text-xs font-bold bg-[#ffc500] text-[#312f27] border border-[#312f27]"
                    >
                      <Check className="w-3 h-3 text-[#312f27]" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills / Gaps */}
              <div className="bg-white border-2 border-[#312f27]/15 rounded-[8px] p-5 space-y-3">
                <div className="flex items-center gap-2 text-[#788086] font-bold text-xs uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4 text-[#788086]" />
                  Missing Skills / Potential Gaps
                </div>
                {result.missing_skills.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {result.missing_skills.map((gap, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-[4px] text-xs font-medium bg-[#efefef] text-[#788086] border border-[#312f27]/15"
                      >
                        • {gap}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#788086]">
                    No major technical skill gaps identified for this role!
                  </p>
                )}
              </div>
            </div>

            {/* Standout Advantages */}
            {result.key_strengths && result.key_strengths.length > 0 && (
              <div className="pt-2">
                <h4 className="text-xs font-black uppercase tracking-[0.08em] text-[#312f27] mb-3">
                  KEY STANDOUT ADVANTAGES
                </h4>
                <ul className="space-y-2">
                  {result.key_strengths.map((strength, idx) => (
                    <li
                      key={idx}
                      className="text-xs sm:text-sm text-[#312f27] flex items-start gap-3 bg-white p-4 rounded-[6px] border-2 border-[#312f27]/15 font-medium"
                    >
                      <Sparkles className="w-4 h-4 text-[#ffc500] fill-current flex-shrink-0 mt-0.5" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cross-Link to AI Chat */}
            {onAskInChat && (
              <div className="pt-4 border-t border-[#312f27]/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-5 rounded-[8px] border-2 border-[#312f27]/15">
                <div className="text-xs text-[#788086] font-medium">
                  Want to interview Mahil's AI twin regarding these specific requirements?
                </div>
                <button
                  onClick={() =>
                    onAskInChat(
                      `Based on this job description, can you discuss your relevant experience and how you would address any missing areas like ${result.missing_skills.slice(0, 2).join(', ') || 'new tools'}?`
                    )
                  }
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[28.5px] text-xs font-bold bg-[#312f27] hover:bg-[#1a1814] text-[#ffc500] border border-[#ffc500]/30 transition-all cursor-pointer flex-shrink-0"
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
