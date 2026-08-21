import React, { useState, useRef, useEffect } from 'react'
import { Send, Loader2, Cpu } from 'lucide-react'

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
    <div className="sticky bottom-0 w-full bg-gradient-to-t from-white via-white/95 to-transparent pt-3 pb-4 sm:pb-6 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="relative flex items-end gap-2 bg-[#efefef] border-2 border-[#312f27]/20 rounded-[16px] p-2 sm:p-2.5 focus-within:border-[#312f27] focus-within:bg-white transition-all shadow-sm"
        >
          {/* Text Area */}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isStreaming}
            rows={1}
            aria-label="Message input for AI assistant"
            placeholder={
              isStreaming
                ? 'AI is responding...'
                : 'Ask about Mahil’s skills, projects, RAG research, or experience...'
            }
            className="w-full bg-transparent text-[#312f27] placeholder-[#788086] text-sm sm:text-[15px] px-3 py-1.5 focus:outline-none resize-none max-h-40 min-h-[24px] disabled:opacity-50 font-medium"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!input.trim() || isStreaming}
            aria-label="Send message"
            className="flex-shrink-0 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-[28.5px] bg-[#312f27] hover:bg-[#1a1814] disabled:bg-[#e9e4d9] text-[#ffc500] disabled:text-[#b1afa7] transition-all cursor-pointer disabled:cursor-not-allowed focus:outline-none shadow-sm"
            title="Send Message"
          >
            {isStreaming ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#b1afa7]" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#788086] mt-2 px-2 gap-1 font-medium">
          <span className="hidden sm:inline">
            Press <kbd className="px-1.5 py-0.5 rounded-[4px] bg-[#efefef] text-[#312f27] border border-[#312f27]/20 font-mono text-[10px] font-bold">Enter ↵</kbd> to send, <kbd className="px-1.5 py-0.5 rounded-[4px] bg-[#efefef] text-[#312f27] border border-[#312f27]/20 font-mono text-[10px] font-bold">Shift + Enter</kbd> for newline
          </span>
          <span className="inline-flex items-center gap-1 text-[11px]">
            <Cpu className="w-3 h-3 text-[#ffc500]" /> Powered by <strong className="text-[#312f27]">Groq</strong>
          </span>
        </div>
      </div>
    </div>
  )
}
