import React, { useState } from 'react'
import {
  X,
  Clock,
  Trash2,
  Download,
  Copy,
  Check,
  Search,
  MessageSquare,
  Sparkles,
  ArrowRight,
} from 'lucide-react'

export default function HistoryDrawer({
  isOpen,
  onClose,
  messages = [],
  onClearHistory,
  onSelectMessage,
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  // Filter messages for search
  const filteredMessages = messages.filter((m) =>
    m.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Extract user questions as key timeline points
  const userQuestions = messages
    .map((msg, index) => ({ ...msg, originalIndex: index }))
    .filter((msg) => msg.role === 'user')
    .reverse()

  const handleExportMarkdown = () => {
    if (messages.length === 0) return
    const textContent = messages
      .map(
        (m) =>
          `### ${m.role === 'user' ? '👤 User' : '🤖 Mahil Sonowal AI'}\n\n${
            m.content
          }\n\n---\n`
      )
      .join('\n')

    const blob = new Blob([textContent], { type: 'text/markdown;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `Mahil_AI_Chat_Transcript_${new Date()
      .toISOString()
      .slice(0, 10)}.md`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleCopyAll = async () => {
    if (messages.length === 0) return
    const fullTranscript = messages
      .map(
        (m) =>
          `${m.role === 'user' ? 'User' : 'Mahil AI'}: ${m.content}`
      )
      .join('\n\n')

    try {
      await navigator.clipboard.writeText(fullTranscript)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy transcript:', err)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
      {/* Dimmed Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Sidebar Container */}
      <div className="relative z-50 w-full max-w-md bg-slate-950/95 border-l border-slate-800 shadow-2xl flex flex-col h-full overflow-hidden text-slate-200 backdrop-blur-xl">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-base text-slate-100 flex items-center gap-2">
                Conversation History
                <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  {messages.length} messages
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Review questions and export chat logs
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 transition-colors cursor-pointer"
            aria-label="Close history drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Actions Bar */}
        <div className="p-4 border-b border-slate-800/80 space-y-3 bg-slate-900/40">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search conversation topics..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/60"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportMarkdown}
              disabled={messages.length === 0}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-xs font-medium text-slate-200 disabled:opacity-40 transition-all cursor-pointer"
              title="Download conversation as Markdown file"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span>Export .md</span>
            </button>

            <button
              onClick={handleCopyAll}
              disabled={messages.length === 0}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 text-xs font-medium text-slate-200 disabled:opacity-40 transition-all cursor-pointer"
              title="Copy entire chat transcript"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Copy All</span>
                </>
              )}
            </button>

            {messages.length > 0 && (
              <button
                onClick={() => {
                  if (window.confirm('Clear all conversation history?')) {
                    onClearHistory()
                    onClose()
                  }
                }}
                className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors cursor-pointer"
                title="Clear all history"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Message Feed / Questions List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600">
                <MessageSquare className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-slate-400">
                No chat history yet
              </p>
              <p className="text-xs max-w-xs leading-relaxed">
                Ask Mahil's AI twin any questions about his skills, projects, or research to build your transcript.
              </p>
            </div>
          ) : searchTerm ? (
            /* Search Results */
            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                Matching Search Results ({filteredMessages.length})
              </span>
              {filteredMessages.map((msg, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1"
                >
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-indigo-400">
                    {msg.role === 'user' ? '👤 Question' : '🤖 AI Answer'}
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-3">
                    {msg.content}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            /* Questions Timeline */
            <div className="space-y-2.5">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                Topic History ({userQuestions.length} queries)
              </span>
              {userQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="group p-3.5 rounded-xl bg-slate-900/70 hover:bg-slate-900 border border-slate-800/80 hover:border-indigo-500/40 transition-all space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-medium text-slate-200 line-clamp-2">
                      {q.content}
                    </p>
                    <span className="flex-shrink-0 text-[10px] text-slate-500 px-1.5 py-0.5 rounded bg-slate-800 font-mono">
                      #{userQuestions.length - idx}
                    </span>
                  </div>

                  {/* AI Preview Snippet */}
                  {messages[q.originalIndex + 1] && (
                    <p className="text-[11px] text-slate-400 line-clamp-2 pl-2 border-l-2 border-indigo-500/40">
                      {messages[q.originalIndex + 1].content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
