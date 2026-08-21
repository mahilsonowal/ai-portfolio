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
      className={`group flex items-start gap-2.5 sm:gap-3 w-full max-w-3xl mx-auto py-2 transition-opacity ${
        isUser ? 'flex-row-reverse justify-start' : 'justify-start'
      }`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 mt-0.5">
        {isUser ? (
          <div
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-sm ring-2 ring-indigo-500/20"
            aria-label="User Avatar"
          >
            <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
        ) : (
          <div
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-900 border border-slate-700/60 p-[1.5px] overflow-hidden flex-shrink-0 shadow-sm ring-2 ring-indigo-500/20"
            aria-label="Mahil AI Avatar"
          >
            <img
              src={profilePic}
              alt="Mahil Sonowal"
              className="w-full h-full object-cover object-top rounded-[7px] sm:rounded-[9px]"
            />
          </div>
        )}
      </div>

      {/* Bubble Content */}
      <div
        className={`relative max-w-[88%] sm:max-w-[82%] rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-sm leading-relaxed transition-all shadow-sm ${
          isUser
            ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-tr-xs shadow-indigo-500/10'
            : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-xs shadow-slate-950/40 backdrop-blur-sm'
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        ) : !message.content ? (
          /* Typing state waiting for initial token chunk */
          <div className="flex items-center gap-1.5 py-1 px-1">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"></span>
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]"></span>
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.4s]"></span>
          </div>
        ) : (
          <div className="prose prose-invert prose-sm max-w-none space-y-2.5 text-slate-200">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => (
                  <p className="mb-2.5 last:mb-0 leading-relaxed text-slate-300">
                    {children}
                  </p>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors font-medium"
                  >
                    {children}
                    <ExternalLink className="w-3 h-3 inline-block opacity-70" />
                  </a>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-5 mb-2.5 space-y-1 text-slate-300">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-5 mb-2.5 space-y-1 text-slate-300">
                    {children}
                  </ol>
                ),
                li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                h1: ({ children }) => (
                  <h1 className="text-base sm:text-lg font-bold text-slate-100 mt-3 mb-2">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-sm sm:text-base font-bold text-slate-100 mt-3 mb-1.5">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xs sm:text-sm font-semibold text-slate-200 mt-2 mb-1">
                    {children}
                  </h3>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-indigo-500/50 pl-3 italic text-slate-400 my-2">
                    {children}
                  </blockquote>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-3 rounded-lg border border-slate-800">
                    <table className="min-w-full text-left text-xs border-collapse divide-y divide-slate-800">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-slate-800/70 text-slate-200 font-semibold">
                    {children}
                  </thead>
                ),
                th: ({ children }) => (
                  <th className="px-3 py-2 border-b border-slate-800">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-3 py-2 border-b border-slate-800/60 text-slate-300">
                    {children}
                  </td>
                ),
                code: ({ node, inline, className, children, ...props }) => {
                  return (
                    <code
                      className="bg-slate-800/90 text-indigo-300 px-1.5 py-0.5 rounded text-xs font-mono border border-slate-700/50"
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

            {/* Glowing streaming cursor */}
            {isCurrentlyStreaming && (
              <span className="inline-block w-1.5 h-4 ml-1 bg-indigo-400 animate-pulse align-middle" />
            )}
          </div>
        )}

        {/* Copy Button with Confirmation Tooltip */}
        {!isUser && message.content && (
          <div className="flex justify-end pt-1.5 mt-1 border-t border-slate-800/60">
            <button
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity flex items-center gap-1 text-[11px] text-slate-400 hover:text-indigo-400 cursor-pointer focus:outline-none"
              title="Copy message response"
              aria-label="Copy message response to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copied!</span>
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
