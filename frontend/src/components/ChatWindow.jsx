import React, { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import { Sparkles, Code2, Layers, BookOpen, GraduationCap, Zap } from 'lucide-react'
import profilePic from '../assets/dp3.png'

const SUGGESTED_PROMPTS = [
  {
    icon: Layers,
    title: 'Featured Projects',
    prompt: 'Tell me about the real-world projects Mahil has built, especially Mukuba Economic Research.',
  },
  {
    icon: Code2,
    title: 'Frontend & Tech Skills',
    prompt: 'What are Mahil’s core skills across React, TypeScript, and UI layout design?',
  },
  {
    icon: BookOpen,
    title: 'Assamese RAG Research',
    prompt: 'Can you explain Mahil’s ongoing Assamese Folk Literature RAG research at Royal Global University?',
  },
  {
    icon: GraduationCap,
    title: 'Education & Academics',
    prompt: 'What is Mahil’s educational background and academic performance in MCA and BCA?',
  },
]

export default function ChatWindow({ messages, isStreaming, onSelectPrompt, onTriggerPitch }) {
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom on new messages or stream chunks
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isStreaming])

  return (
    <div className="flex-1 w-full overflow-y-auto px-3 sm:px-8 py-4 sm:py-6 space-y-4 scroll-smooth">
      {/* Empty State / Welcome Screen */}
      {messages.length === 0 ? (
        <div className="max-w-3xl mx-auto py-4 sm:py-8 flex flex-col items-center text-center animate-fade-in">

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            Chat with Mahil's AI Twin
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mb-5 sm:mb-6 leading-relaxed px-2">
            I am programmed to represent <strong className="text-slate-200">Mahil Sonowal</strong>—answering questions about his web development experience, projects, skills, and research.
          </p>

          {/* Featured 60-Sec Recruiter Pitch Button */}
          {onTriggerPitch && (
            <button
              onClick={onTriggerPitch}
              className="mb-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-indigo-600/30 to-cyan-500/20 hover:from-amber-500/30 hover:via-indigo-600/40 hover:to-cyan-500/30 border border-amber-500/40 hover:border-amber-400 text-amber-200 text-xs sm:text-sm font-semibold transition-all shadow-lg shadow-indigo-500/10 cursor-pointer group"
            >
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400/40 group-hover:scale-110 transition-transform" />
              <span>⚡ Generate 60-Second Recruiter Pitch for Mahil</span>
            </button>
          )}

          {/* Quick Starter Suggestions */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-left">
            {SUGGESTED_PROMPTS.map((item, idx) => {
              const Icon = item.icon
              return (
                <button
                  key={idx}
                  onClick={() => onSelectPrompt(item.prompt)}
                  className="group p-3.5 sm:p-4 rounded-2xl bg-slate-900/70 hover:bg-slate-800/90 border border-slate-800 hover:border-indigo-500/40 text-slate-300 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/5 cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-200 tracking-wide">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-400 line-clamp-2 group-hover:text-slate-300 transition-colors">
                    {item.prompt}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      ) : (
        /* Conversation Message Feed */
        <div className="space-y-3.5 sm:space-y-4 max-w-3xl mx-auto">
          {messages.map((msg, index) => (
            <MessageBubble
              key={msg.id || index}
              message={msg}
              isCurrentlyStreaming={isStreaming && index === messages.length - 1 && msg.role === 'assistant'}
            />
          ))}

          {/* Typing Indicator (shown when waiting for stream start) */}
          {isStreaming && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex items-start gap-3 py-2 max-w-3xl mx-auto">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-900 border border-slate-700/60 p-[1.5px] overflow-hidden flex-shrink-0">
                <img
                  src={profilePic}
                  alt="Mahil AI"
                  className="w-full h-full object-cover object-top rounded-[7px] sm:rounded-[9px]"
                />
              </div>
              <div className="bg-slate-900/90 border border-slate-800 text-slate-200 rounded-2xl rounded-tl-xs px-4 py-3 shadow-sm backdrop-blur-sm">
                <div className="flex items-center gap-1.5 py-1">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  )
}
