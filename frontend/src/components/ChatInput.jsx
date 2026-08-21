import React, { useState, useRef, useEffect } from 'react'
import { Send, Sparkles, Loader2 } from 'lucide-react'

export default function ChatInput({ onSendMessage, isStreaming }) {
  const [input, setInput] = useState('')
  const textareaRef = useRef(null)

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`
    }
  }, [input])

  const handleSubmit = (e) => {
    if (e) e.preventDefault()
    if (!input.trim() || isStreaming) return

    onSendMessage(input.trim())
    setInput('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="sticky bottom-0 w-full bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent pt-4 pb-4 sm:pb-6 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="relative flex items-end gap-2 bg-slate-900/90 border border-slate-800/90 rounded-2xl p-2 sm:p-2.5 shadow-2xl backdrop-blur-xl focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all"
        >
          {/* Text Area */}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isStreaming}
            rows={1}
            placeholder={
              isStreaming
                ? 'AI is responding...'
                : 'Ask about Mahil’s skills, projects, RAG research, or experience...'
            }
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm sm:text-base px-3 py-1.5 focus:outline-none resize-none max-h-40 min-h-[24px] disabled:opacity-60"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!input.trim() || isStreaming}
            className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white disabled:text-slate-500 transition-all shadow-md shadow-indigo-600/20 disabled:shadow-none cursor-pointer disabled:cursor-not-allowed"
            title="Send Message"
          >
            {isStreaming ? (
              <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
            ) : (
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            )}
          </button>
        </form>

        {/* Footer info tip */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 px-2">
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/60 font-mono">Enter ↵</kbd> to send, <kbd className="px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/60 font-mono">Shift + Enter</kbd> for newline</span>
          <span className="hidden sm:inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-400" /> Grounded in verified portfolio profile
          </span>
        </div>
      </div>
    </div>
  )
}
