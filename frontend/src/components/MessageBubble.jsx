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
      {/* Avatar */}
      <div className="flex-shrink-0 mt-0.5">
        {isUser ? (
          <div
            className="w-8 h-8 rounded-full bg-[#312f27] flex items-center justify-center text-[#ffc500] border border-[#ffc500]/40 shadow-sm"
            aria-label="User Avatar"
          >
            <User className="w-4 h-4 stroke-[2]" />
          </div>
        ) : (
          <div
            className="w-8 h-8 rounded-[6px] bg-[#ffc500] border-2 border-[#312f27] p-[1px] overflow-hidden flex-shrink-0"
            aria-label="Mahil AI Avatar"
          >
            <img
              src={profilePic}
              alt="Mahil Sonowal"
              className="w-full h-full object-cover object-top rounded-[4px]"
            />
          </div>
        )}
      </div>

      {/* Bubble Container */}
      <div
        className={`relative max-w-[88%] sm:max-w-[84%] px-4 py-3 sm:px-5 sm:py-3.5 text-sm leading-relaxed transition-all ${
          isUser
            ? 'bg-[#312f27] text-white rounded-[16px] rounded-tr-xs shadow-md font-medium'
            : 'bg-[#efefef] border-2 border-[#312f27]/15 text-[#312f27] rounded-[16px] rounded-tl-xs'
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        ) : !message.content ? (
          /* Typing token placeholder */
          <div className="flex items-center gap-1.5 py-1 px-1">
            <span className="w-2 h-2 rounded-full bg-[#ffc500] border border-[#312f27] animate-bounce"></span>
            <span className="w-2 h-2 rounded-full bg-[#ffc500] border border-[#312f27] animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-2 h-2 rounded-full bg-[#ffc500] border border-[#312f27] animate-bounce [animation-delay:0.4s]"></span>
          </div>
        ) : (
          <div className="prose prose-sm max-w-none space-y-2 text-[#312f27]">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => (
                  <p className="mb-2 last:mb-0 leading-relaxed text-[#312f27]">
                    {children}
                  </p>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#312f27] underline decoration-[#ffc500] decoration-2 underline-offset-2 hover:text-[#788086] font-bold"
                  >
                    {children}
                    <ExternalLink className="w-3 h-3 inline-block opacity-70" />
                  </a>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-5 mb-2 space-y-1 text-[#312f27]">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-5 mb-2 space-y-1 text-[#312f27]">
                    {children}
                  </ol>
                ),
                li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                h1: ({ children }) => (
                  <h1 className="text-base sm:text-lg font-black text-[#312f27] mt-3 mb-1.5 tracking-tight">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-sm sm:text-base font-black text-[#312f27] mt-2.5 mb-1 tracking-tight">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xs sm:text-sm font-bold text-[#312f27] mt-2 mb-1">
                    {children}
                  </h3>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-[#ffc500] pl-3 italic text-[#788086] my-2">
                    {children}
                  </blockquote>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-3 rounded-[6px] border-2 border-[#312f27]/20 bg-white">
                    <table className="min-w-full text-left text-xs border-collapse divide-y divide-[#312f27]/10">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-[#e9e4d9] text-[#312f27] font-bold">
                    {children}
                  </thead>
                ),
                th: ({ children }) => (
                  <th className="px-3 py-2 border-b border-[#312f27]/10 font-bold">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-3 py-2 border-b border-[#312f27]/10 text-[#312f27]">
                    {children}
                  </td>
                ),
                code: ({ node, inline, className, children, ...props }) => {
                  return (
                    <code
                      className="bg-white text-[#312f27] px-1.5 py-0.5 rounded-[4px] text-xs font-mono border border-[#312f27]/20 font-bold"
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

            {/* Pulsing indicator */}
            {isCurrentlyStreaming && (
              <span className="inline-block w-1.5 h-4 ml-1 bg-[#ffc500] animate-pulse align-middle" />
            )}
          </div>
        )}

        {/* Copy Button */}
        {!isUser && message.content && (
          <div className="flex justify-end pt-1.5 mt-1 border-t border-[#312f27]/10">
            <button
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity flex items-center gap-1 text-[11px] text-[#788086] hover:text-[#312f27] cursor-pointer focus:outline-none font-bold"
              title="Copy message response"
              aria-label="Copy message response to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-[#312f27]" />
                  <span className="text-[#312f27] font-bold">Copied!</span>
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
