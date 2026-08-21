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
  ArrowRight,
  CornerDownRight,
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

  const handleCardClick = (messageId) => {
    if (onSelectMessage) {
      onSelectMessage(messageId)
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/30 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Sidebar (Porcelain #ffffff from DESIGN.md) */}
      <div className="relative z-50 w-full max-w-md bg-[#ffffff] border-l border-[#e7e7e7] shadow-2xl flex flex-col h-full overflow-hidden text-[#1f1f1f]">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#e7e7e7] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-[#f6f6f6] text-[#594ff4] border border-[#e7e7e7]">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#1f1f1f] flex items-center gap-2">
                Conversation History
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#f6f6f6] text-[#594ff4] border border-[#e7e7e7]">
                  {messages.length} msgs
                </span>
              </h3>
              <p className="text-xs text-[#5d5d5d]">
                Click any question to jump directly into the conversation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#5d5d5d] hover:text-[#1f1f1f] hover:bg-[#f6f6f6] transition-colors cursor-pointer"
            aria-label="Close history drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Action Bar */}
        <div className="p-4 border-b border-[#e7e7e7] space-y-3 bg-[#f6f6f6]">
          <div className="relative">
            <Search className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search conversation topics..."
              className="w-full bg-white border border-[#e7e7e7] rounded-full pl-10 pr-4 py-2 text-xs text-[#1f1f1f] placeholder-[#888888] focus:outline-none focus:border-[#594ff4]"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportMarkdown}
              disabled={messages.length === 0}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-white hover:border-[#594ff4] border border-[#e7e7e7] text-xs font-semibold text-[#1f1f1f] disabled:opacity-40 transition-all cursor-pointer"
              title="Download conversation as Markdown file"
            >
              <Download className="w-3.5 h-3.5 text-[#594ff4]" />
              <span>Export .md</span>
            </button>

            <button
              onClick={handleCopyAll}
              disabled={messages.length === 0}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-white hover:border-[#594ff4] border border-[#e7e7e7] text-xs font-semibold text-[#1f1f1f] disabled:opacity-40 transition-all cursor-pointer"
              title="Copy entire chat transcript"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#594ff4]" />
                  <span className="text-[#594ff4]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#594ff4]" />
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
                className="p-2 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition-colors cursor-pointer"
                title="Clear all history"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Message Feed / Questions List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#ffffff]">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#888888] space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#f6f6f6] border border-[#e7e7e7] flex items-center justify-center text-[#594ff4]">
                <MessageSquare className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-[#1f1f1f]">
                No chat history yet
              </p>
              <p className="text-xs max-w-xs leading-relaxed text-[#5d5d5d]">
                Ask Mahil's AI twin any questions about his skills, projects, or research to build your transcript.
              </p>
            </div>
          ) : searchTerm ? (
            /* Search Results */
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#888888] uppercase tracking-[0.075em] block mb-2">
                MATCHING RESULTS ({filteredMessages.length})
              </span>
              {filteredMessages.map((msg, i) => (
                <button
                  key={msg.id || i}
                  onClick={() => handleCardClick(msg.id || `msg-${msg.role}`)}
                  className="w-full text-left p-3.5 rounded-[20px] bg-[#f6f6f6] hover:bg-white border border-[#e7e7e7] hover:border-[#594ff4] space-y-1 transition-all group cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#594ff4]">
                    <span>{msg.role === 'user' ? '👤 QUESTION' : '🤖 AI ANSWER'}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0.5" />
                  </div>
                  <p className="text-xs text-[#1f1f1f] line-clamp-3">
                    {msg.content}
                  </p>
                </button>
              ))}
            </div>
          ) : (
            /* Questions Timeline */
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-[#888888] uppercase tracking-[0.075em] block mb-2">
                TOPIC TIMELINE ({userQuestions.length} QUERIES)
              </span>
              {userQuestions.map((q, idx) => (
                <button
                  key={q.id || idx}
                  onClick={() => handleCardClick(q.id || `msg-user`)}
                  className="w-full text-left group p-4 rounded-[20px] bg-[#f6f6f6] hover:bg-white border border-[#e7e7e7] hover:border-[#594ff4] transition-all space-y-2 cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-bold text-[#1f1f1f] group-hover:text-[#594ff4] transition-colors line-clamp-2">
                      {q.content}
                    </p>
                    <span className="flex-shrink-0 text-[10px] text-[#5d5d5d] px-2 py-0.5 rounded-full bg-white border border-[#e7e7e7] font-mono font-semibold">
                      #{userQuestions.length - idx}
                    </span>
                  </div>

                  {/* AI Preview Snippet */}
                  {messages[q.originalIndex + 1] && (
                    <div className="flex items-center justify-between gap-2 text-[11px] text-[#5d5d5d] line-clamp-2 pl-2.5 border-l-2 border-[#594ff4]">
                      <span className="line-clamp-2">
                        {messages[q.originalIndex + 1].content}
                      </span>
                      <CornerDownRight className="w-3.5 h-3.5 text-[#594ff4] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
