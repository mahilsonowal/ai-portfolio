import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { User, Copy, Check, ExternalLink } from 'lucide-react'
import profilePic from '../assets/dp3.png'

export default function MessageBubble({ message, isCurrentlyStreaming = false }) {
  const isUser = message.role === 'user'
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!message.content) return
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div
      id={message.id || `msg-${message.role}`}
      className={`group flex items-start gap-3 w-full max-w-3xl mx-auto py-2 transition-all scroll-mt-20 ${
        isUser ? 'flex-row-reverse justify-start' : 'justify-start'
      }`}
    >
      {/* Avatar (DESIGN.md monoline style) */}
      <div className="flex-shrink-0 mt-0.5">
        {isUser ? (
          <div
            className="w-8 h-8 rounded-full bg-[#594ff4] flex items-center justify-center text-white shadow-sm"
            aria-label="User Avatar"
          >
            <User className="w-4 h-4 stroke-[2]" />
          </div>
        ) : (
          <div
            className="w-8 h-8 rounded-[10px] bg-[#f6f6f6] border border-[#e7e7e7] p-[1px] overflow-hidden flex-shrink-0"
            aria-label="Mahil AI Avatar"
          >
            <img
              src={profilePic}
              alt="Mahil Sonowal"
              className="w-full h-full object-cover object-top rounded-[8px]"
            />
          </div>
        )}
      </div>

      {/* Bubble Container */}
      <div
        className={`relative max-w-[88%] sm:max-w-[84%] px-4 py-3 sm:px-5 sm:py-3.5 text-sm leading-relaxed transition-all ${
          isUser
            ? 'bg-[#594ff4] text-white rounded-[22px] rounded-tr-xs shadow-sm font-medium'
            : 'bg-[#f6f6f6] border border-[#e7e7e7] text-[#1f1f1f] rounded-[24px] rounded-tl-xs'
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        ) : !message.content ? (
          /* Typing token placeholder */
          <div className="flex items-center gap-1.5 py-1 px-1">
            <span className="w-2 h-2 rounded-full bg-[#594ff4] animate-bounce"></span>
            <span className="w-2 h-2 rounded-full bg-[#594ff4] animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-2 h-2 rounded-full bg-[#594ff4] animate-bounce [animation-delay:0.4s]"></span>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none space-y-2 text-[#1f1f1f]">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => (
                  <p className="mb-2 last:mb-0 leading-relaxed text-[#1f1f1f]">
                    {children}
                  </p>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#594ff4] hover:underline font-semibold"
                  >
                    {children}
                    <ExternalLink className="w-3 h-3 inline-block opacity-70" />
                  </a>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-5 mb-2 space-y-1 text-[#333333]">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-5 mb-2 space-y-1 text-[#333333]">
                    {children}
                  </ol>
                ),
                li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                h1: ({ children }) => (
                  <h1 className="text-base sm:text-lg font-bold text-[#1f1f1f] mt-3 mb-1.5 tracking-tight">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-sm sm:text-base font-bold text-[#1f1f1f] mt-2.5 mb-1 tracking-tight">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xs sm:text-sm font-semibold text-[#1f1f1f] mt-2 mb-1">
                    {children}
                  </h3>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-[#594ff4] pl-3 italic text-[#5d5d5d] my-2">
                    {children}
                  </blockquote>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-3 rounded-xl border border-[#e7e7e7] bg-white">
                    <table className="min-w-full text-left text-xs border-collapse divide-y divide-[#e7e7e7]">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-[#f6f6f6] text-[#1f1f1f] font-semibold">
                    {children}
                  </thead>
                ),
                th: ({ children }) => (
                  <th className="px-3 py-2 border-b border-[#e7e7e7] font-bold">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-3 py-2 border-b border-[#e7e7e7] text-[#333333]">
                    {children}
                  </td>
                ),
                code: ({ node, inline, className, children, ...props }) => {
                  return (
                    <code
                      className="bg-white text-[#594ff4] px-1.5 py-0.5 rounded-md text-xs font-mono border border-[#e7e7e7]"
                      {...props}
                    >
                      {children}
                    </code>
                  )
                },
              }}
            >
              {message.content}
            </ReactMarkdown>

            {/* Signal Violet streaming pulse */}
            {isCurrentlyStreaming && (
              <span className="inline-block w-1.5 h-4 ml-1 bg-[#594ff4] animate-pulse align-middle" />
            )}
          </div>
        )}

        {/* Copy Button */}
        {!isUser && message.content && (
          <div className="flex justify-end pt-1.5 mt-1 border-t border-[#e7e7e7]">
            <button
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity flex items-center gap-1 text-[11px] text-[#5d5d5d] hover:text-[#594ff4] cursor-pointer focus:outline-none"
              title="Copy message response"
              aria-label="Copy message response to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-[#594ff4]" />
                  <span className="text-[#594ff4] font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
