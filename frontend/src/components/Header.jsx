import React from 'react'
import {
  Sparkles,
  Mail,
  Trash2,
  MessageSquare,
  Target,
  Sun,
  Moon,
  Zap,
  Clock,
} from 'lucide-react'
import profilePic from '../assets/dp3.png'

// Lightweight inline SVGs for social icons
const GithubIcon = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
)

const LinkedinIcon = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25a1.62 1.62 0 0 0-1.63 1.63 1.63 1.63 0 0 0 3.26 0c0-.9-.73-1.63-1.63-1.63z" />
  </svg>
)

export default function Header({
  activeTab = 'chat',
  onTabChange,
  onClearChat,
  onTriggerPitch,
  onOpenHistory,
  messageCount = 0,
  theme = 'dark',
  onToggleTheme,
}) {
  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-xl bg-slate-950/90 dark:bg-slate-950/90 border-b border-slate-800/80 px-3 sm:px-6 py-2 sm:py-2.5 transition-colors shadow-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-2.5">
        
        {/* ROW 1: Brand (Avatar + Name) & Mobile Quick Actions */}
        <div className="flex items-center justify-between gap-2 min-w-0">
          {/* Brand Link */}
          <button
            type="button"
            onClick={() => onTabChange('chat')}
            className="flex items-center gap-2.5 min-w-0 text-left group cursor-pointer focus:outline-none rounded-xl p-1 -ml-1 transition-all"
            title="Return to Home / AI Chat"
            aria-label="Return to Home / AI Chat"
          >
            <div className="relative flex-shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-cyan-400 p-[1.5px] shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <img
                  src={profilePic}
                  alt="Mahil Sonowal"
                  className="w-full h-full object-cover object-top rounded-[10px]"
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-slate-950"></span>
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="font-bold text-sm sm:text-base text-slate-100 truncate tracking-tight group-hover:text-indigo-400 transition-colors">
                  Mahil Sonowal
                </h1>
                <span className="inline-flex items-center gap-0.5 text-[9px] font-semibold bg-indigo-500/15 text-indigo-400 border border-indigo-500/25 px-1.5 py-0.2 rounded-full">
                  <Sparkles className="w-2.5 h-2.5" />
                  AI
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-400 truncate">
                Frontend Developer & MCA Candidate
              </p>
            </div>
          </button>

          {/* Quick Actions (Always visible on mobile right side) */}
          <div className="flex md:hidden items-center gap-1.5 flex-shrink-0">
            {/* Mobile Pitch */}
            <button
              onClick={onTriggerPitch}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-semibold"
              title="60-Second Pitch"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30" />
              <span>Pitch</span>
            </button>

            {/* Mobile History */}
            <button
              onClick={onOpenHistory}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white relative"
              title="Chat History"
              aria-label="Chat History"
            >
              <Clock className="w-4 h-4 text-indigo-400" />
              {messageCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[9px] font-bold text-white">
                  {messageCount}
                </span>
              )}
            </button>

            {/* Mobile Theme */}
            <button
              onClick={onToggleTheme}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 border border-slate-800/80 bg-slate-900/60"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-400" />}
            </button>
          </div>
        </div>

        {/* ROW 2 on mobile / CENTER & RIGHT on desktop */}
        <div className="flex items-center justify-between md:justify-end gap-2 sm:gap-3">
          
          {/* Main Navigation Segment Tabs */}
          <div className="flex items-center bg-slate-900/90 border border-slate-800/90 p-0.5 sm:p-1 rounded-xl shadow-inner flex-1 md:flex-initial justify-center">
            <button
              onClick={() => onTabChange('chat')}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>AI Chat</span>
            </button>

            <button
              onClick={() => onTabChange('matcher')}
              className={`flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'matcher'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Match JD</span>
              <span className="hidden sm:inline-block text-[9px] font-bold px-1.5 py-0.2 bg-indigo-400/20 text-indigo-300 rounded border border-indigo-400/30">
                Recruiter
              </span>
            </button>
          </div>

          {/* Desktop Right Action Bar */}
          <div className="hidden md:flex items-center gap-1.5">
            {/* Desktop Pitch Button */}
            <button
              onClick={onTriggerPitch}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-500/20 via-indigo-500/20 to-cyan-500/20 hover:from-amber-500/30 hover:to-indigo-500/30 text-amber-300 border border-amber-500/40 hover:border-amber-400 transition-all shadow-sm cursor-pointer"
              title="Generate a 60-Second Recruiter Pitch for Mahil"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30" />
              <span>Why Hire Mahil?</span>
            </button>

            {/* Desktop History Button */}
            <button
              onClick={onOpenHistory}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
              title="Open Conversation History"
            >
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>History</span>
              {messageCount > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 bg-indigo-500/20 text-indigo-300 rounded-full font-mono font-bold">
                  {messageCount}
                </span>
              )}
            </button>

            {/* Desktop Theme Switcher */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 transition-colors border border-slate-800/80 bg-slate-900/60 cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-400" />}
            </button>

            {/* Social Pill Group */}
            <div className="flex items-center bg-slate-900/80 border border-slate-800/80 rounded-xl p-0.5 ml-0.5">
              <a
                href="https://github.com/mahilsonowal"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="GitHub Profile"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com/in/mahil-sonowal"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-800 transition-colors"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:mahilsonowalpro5@gmail.com"
                className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                title="Email Mahil"
                aria-label="Email Mahil Sonowal"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Clear Chat Button */}
            {activeTab === 'chat' && messageCount > 0 && (
              <button
                onClick={onClearChat}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-slate-800 hover:border-rose-500/30 transition-all cursor-pointer"
                title="Reset Conversation"
                aria-label="Reset Conversation"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
