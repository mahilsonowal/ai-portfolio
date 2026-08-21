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
    <div className="fixed inset-0 z-50 flex justify-end animate-fade-in font-sans">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Sidebar */}
      <div className="relative z-50 w-full max-w-md bg-[#ffffff] border-l-2 border-[#312f27] shadow-2xl flex flex-col h-full overflow-hidden text-[#312f27]">
        
        {/* Drawer Header */}
        <div className="p-5 border-b-2 border-[#312f27]/10 flex items-center justify-between bg-[#efefef]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-[6px] bg-[#ffc500] text-[#312f27] border border-[#312f27]">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-base text-[#312f27] flex items-center gap-2">
                Conversation History
                <span className="text-xs font-black px-2 py-0.5 rounded-[4px] bg-[#ffc500] text-[#312f27] border border-[#312f27]">
                  {messages.length} msgs
                </span>
              </h3>
              <p className="text-xs text-[#788086] font-medium">
                Click any question to jump into the conversation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-[6px] text-[#312f27] hover:bg-white transition-colors cursor-pointer"
            aria-label="Close history drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Action Bar */}
        <div className="p-4 border-b-2 border-[#312f27]/10 space-y-3 bg-[#e9e4d9]/50">
          <div className="relative">
            <Search className="w-4 h-4 text-[#788086] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search conversation topics..."
              className="w-full bg-white border-2 border-[#312f27]/20 rounded-[28.5px] pl-10 pr-4 py-2 text-xs text-[#312f27] placeholder-[#788086] focus:outline-none focus:border-[#312f27] font-medium"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportMarkdown}
              disabled={messages.length === 0}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-[28.5px] bg-white hover:bg-[#ffc500] hover:text-[#312f27] border-2 border-[#312f27]/20 text-xs font-bold text-[#312f27] disabled:opacity-40 transition-all cursor-pointer shadow-xs"
              title="Download conversation as Markdown file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export .md</span>
            </button>

            <button
              onClick={handleCopyAll}
              disabled={messages.length === 0}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-[28.5px] bg-white hover:bg-[#ffc500] hover:text-[#312f27] border-2 border-[#312f27]/20 text-xs font-bold text-[#312f27] disabled:opacity-40 transition-all cursor-pointer shadow-xs"
              title="Copy entire chat transcript"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#312f27]" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
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
                className="p-2 rounded-[28.5px] bg-rose-50 hover:bg-rose-100 text-rose-700 border-2 border-rose-200 transition-colors cursor-pointer"
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
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#788086] space-y-3">
              <div className="w-12 h-12 rounded-[6px] bg-[#ffc500] border-2 border-[#312f27] flex items-center justify-center text-[#312f27]">
                <MessageSquare className="w-6 h-6" />
              </div>
              <p className="text-sm font-black text-[#312f27]">
                No chat history yet
              </p>
              <p className="text-xs max-w-xs leading-relaxed text-[#788086]">
                Ask Mahil's AI twin any questions about his skills, projects, or research to build your transcript.
              </p>
            </div>
          ) : searchTerm ? (
            /* Search Results */
            <div className="space-y-2">
              <span className="text-[11px] font-black text-[#788086] uppercase tracking-[0.08em] block mb-2">
                MATCHING RESULTS ({filteredMessages.length})
              </span>
              {filteredMessages.map((msg, i) => (
                <button
                  key={msg.id || i}
                  onClick={() => handleCardClick(msg.id || `msg-${msg.role}`)}
                  className="w-full text-left p-3.5 rounded-[6px] bg-[#efefef] hover:bg-[#ffc500] border-2 border-[#312f27]/15 space-y-1 transition-all group cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[11px] font-black text-[#312f27]">
                    <span>{msg.role === 'user' ? '👤 QUESTION' : '🤖 AI ANSWER'}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0.5" />
                  </div>
                  <p className="text-xs text-[#312f27] line-clamp-3 font-medium">
                    {msg.content}
                  </p>
                </button>
              ))}
            </div>
          ) : (
            /* Questions Timeline */
            <div className="space-y-3">
              <span className="text-[11px] font-black text-[#788086] uppercase tracking-[0.08em] block mb-2">
                TOPIC TIMELINE ({userQuestions.length} QUERIES)
              </span>
              {userQuestions.map((q, idx) => (
                <button
                  key={q.id || idx}
                  onClick={() => handleCardClick(q.id || `msg-user`)}
                  className="w-full text-left group p-4 rounded-[6px] bg-[#efefef] hover:bg-[#ffc500] border-2 border-[#312f27]/15 transition-all space-y-2 cursor-pointer shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs font-black text-[#312f27] line-clamp-2">
                      {q.content}
                    </p>
                    <span className="flex-shrink-0 text-[10px] text-[#312f27] px-2 py-0.5 rounded-[4px] bg-white border border-[#312f27]/20 font-mono font-bold">
                      #{userQuestions.length - idx}
                    </span>
                  </div>

                  {/* AI Preview Snippet */}
                  {messages[q.originalIndex + 1] && (
                    <div className="flex items-center justify-between gap-2 text-[11px] text-[#788086] line-clamp-2 pl-2.5 border-l-2 border-[#312f27]">
                      <span className="line-clamp-2 font-medium">
                        {messages[q.originalIndex + 1].content}
                      </span>
                      <CornerDownRight className="w-3.5 h-3.5 text-[#312f27] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
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
