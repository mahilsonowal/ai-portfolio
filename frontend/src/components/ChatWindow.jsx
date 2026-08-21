import React, { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import { Code2, Layers, BookOpen, GraduationCap, Zap } from 'lucide-react'
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
    <div className="flex-1 w-full overflow-y-auto px-4 sm:px-8 py-6 space-y-6 scroll-smooth bg-[#ffffff]">
      {/* Empty State / Welcome Screen */}
      {messages.length === 0 ? (
        <div className="max-w-3xl mx-auto py-6 sm:py-12 flex flex-col items-center text-center animate-fade-in">
          
          {/* Eyebrow Label */}
          <span className="text-[12px] font-black text-[#312f27] tracking-[0.08em] uppercase mb-2">
            AI PORTFOLIO ASSISTANT
          </span>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#312f27] mb-3 leading-[1.1]">
            Chat with Mahil's AI Twin
          </h2>
          <p className="text-sm sm:text-base text-[#788086] max-w-lg mb-8 leading-relaxed font-medium">
            Programmed to represent <strong className="text-[#312f27] font-bold">Mahil Sonowal</strong>—answering questions on frontend engineering, React architectures, and AI/RAG research.
          </p>

          {/* Featured 60-Sec Recruiter Pitch Pill Button */}
          {onTriggerPitch && (
            <button
              onClick={onTriggerPitch}
              className="mb-10 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-[34px] bg-[#312f27] hover:bg-[#1a1814] text-[#ffc500] border-2 border-[#ffc500]/50 text-xs sm:text-sm font-bold tracking-tight shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-all cursor-pointer active:scale-98"
            >
              <Zap className="w-4 h-4 fill-[#ffc500] text-[#ffc500]" />
              <span>Generate 60-Second Recruiter Pitch for Mahil</span>
            </button>
          )}

          {/* Quick Starter Suggestions Cards */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {SUGGESTED_PROMPTS.map((item, idx) => {
              const Icon = item.icon
              return (
                <button
                  key={idx}
                  onClick={() => onSelectPrompt(item.prompt)}
                  className="group p-5 rounded-[2.85px] bg-[#ffffff] hover:bg-[#efefef] border-2 border-[#312f27] transition-all duration-150 cursor-pointer text-left focus:outline-none shadow-sm hover:translate-y-[-2px]"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="p-2 rounded-[2px] bg-[#ffc500] text-[#312f27] border border-[#312f27]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-black text-[#312f27] tracking-tight">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-xs text-[#788086] line-clamp-2 leading-relaxed font-medium">
                    {item.prompt}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      ) : (
        /* Conversation Message Feed */
        <div className="space-y-4 max-w-3xl mx-auto">
          {messages.map((msg, index) => (
            <MessageBubble
              key={msg.id || index}
              message={msg}
              isCurrentlyStreaming={isStreaming && index === messages.length - 1 && msg.role === 'assistant'}
            />
          ))}

          {/* Typing Indicator */}
          {isStreaming && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex items-start gap-3 py-2 max-w-3xl mx-auto">
              <div className="w-8 h-8 rounded-[4px] bg-[#ffc500] border-2 border-[#312f27] p-[1px] overflow-hidden flex-shrink-0">
                <img
                  src={profilePic}
                  alt="Mahil AI"
                  className="w-full h-full object-cover object-top rounded-[2px]"
                />
              </div>
              <div className="bg-[#efefef] border-2 border-[#312f27] text-[#312f27] rounded-[10px] px-4 py-3">
                <div className="flex items-center gap-1.5 py-1">
                  <span className="w-2 h-2 rounded-full bg-[#ffc500] border border-[#312f27] animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-[#ffc500] border border-[#312f27] animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-[#ffc500] border border-[#312f27] animate-bounce [animation-delay:0.4s]"></span>
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
