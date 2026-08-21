import React, { useState } from 'react'
import {
  Mail,
  Trash2,
  MessageSquare,
  Target,
  Zap,
  Clock,
  Menu,
  X,
} from 'lucide-react'
import profilePic from '../assets/dp3.png'

// Minimalist monoline SVGs for social icons
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
  onNewChat,
  onClearChat,
  onTriggerPitch,
  onOpenHistory,
  messageCount = 0,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleBrandClick = () => {
    if (onNewChat) {
      onNewChat()
    } else {
      onTabChange('chat')
    }
    setIsMobileMenuOpen(false)
  }

  const handleTabSwitch = (tab) => {
    onTabChange(tab)
    setIsMobileMenuOpen(false)
  }

  const handlePitchClick = () => {
    onTriggerPitch()
    setIsMobileMenuOpen(false)
  }

  const handleHistoryClick = () => {
    onOpenHistory()
    setIsMobileMenuOpen(false)
  }

  const handleClearClick = () => {
    onClearChat()
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-30 w-full bg-[#ffffff]/90 backdrop-blur-md border-b border-[#e7e7e7] px-4 sm:px-8 py-3 transition-colors">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">

        {/* BRAND: Avatar + Typography (Clickable: Starts New Chat Session) */}
        <button
          type="button"
          onClick={handleBrandClick}
          className="flex items-center gap-3 min-w-0 text-left group cursor-pointer focus:outline-none rounded-2xl p-1 -ml-1 transition-all"
          title="New Chat / Start Fresh Session"
          aria-label="New Chat / Start Fresh Session"
        >
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-[10px] bg-[#f6f6f6] border border-[#e7e7e7] p-[2px] overflow-hidden">
              <img
                src={profilePic}
                alt="Mahil Sonowal"
                className="w-full h-full object-cover object-top rounded-[8px]"
              />
            </div>
            {/* Signal Violet Status Pulse */}
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#594ff4] opacity-60"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#594ff4] border-2 border-white"></span>
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-[15px] sm:text-[16px] text-[#1f1f1f] truncate tracking-tight group-hover:text-[#594ff4] transition-colors">
                Mahil Sonowal
              </h1>
            </div>
            <p className="text-[12px] text-[#5d5d5d] truncate">
              Building Web Apps & Exploring AI
            </p>
          </div>
        </button>

        {/* DESKTOP VIEW: Navigation Pill Tabs + Actions (DESIGN.md specs) */}
        <div className="hidden md:flex items-center gap-3">

          {/* Main Navigation Segment Pill Tabs */}
          <div className="flex items-center bg-[#f6f6f6] border border-[#e7e7e7] p-1 rounded-full">
            <button
              onClick={() => handleTabSwitch('chat')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all cursor-pointer ${activeTab === 'chat'
                  ? 'bg-[#594ff4] text-white shadow-sm font-semibold'
                  : 'text-[#5d5d5d] hover:text-[#1f1f1f]'
                }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>AI Chat</span>
            </button>

            <button
              onClick={() => handleTabSwitch('matcher')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all cursor-pointer ${activeTab === 'matcher'
                  ? 'bg-[#594ff4] text-white shadow-sm font-semibold'
                  : 'text-[#5d5d5d] hover:text-[#1f1f1f]'
                }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Match JD</span>
              <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider ${activeTab === 'matcher' ? 'bg-white/20 text-white' : 'bg-[#e7e7e7] text-[#5d5d5d]'
                }`}>
                Recruiter
              </span>
            </button>
          </div>

          {/* Desktop Right Action Bar */}
          <div className="flex items-center gap-2">
            {/* Pitch Pill Button */}
            <button
              onClick={handlePitchClick}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-white border border-[#594ff4] text-[#594ff4] hover:bg-[#594ff4] hover:text-white transition-all cursor-pointer"
              title="Generate a 60-Second Recruiter Pitch for Mahil"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Why Hire Mahil?</span>
            </button>

            {/* History Pill Button */}
            <button
              onClick={handleHistoryClick}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#1f1f1f] bg-[#f6f6f6] hover:bg-[#e7e7e7] border border-[#e7e7e7] transition-all cursor-pointer"
              title="Open Conversation History"
            >
              <Clock className="w-3.5 h-3.5 text-[#594ff4]" />
              <span>History</span>
              {messageCount > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 bg-[#594ff4] text-white rounded-full font-mono font-bold">
                  {messageCount}
                </span>
              )}
            </button>

            {/* Social Pill Group */}
            <div className="flex items-center bg-[#f6f6f6] border border-[#e7e7e7] rounded-full p-1">
              <a
                href="https://github.com/mahilsonowal"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full text-[#5d5d5d] hover:text-[#1f1f1f] hover:bg-white transition-colors"
                title="GitHub Profile"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com/in/mahil-sonowal"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full text-[#5d5d5d] hover:text-[#594ff4] hover:bg-white transition-colors"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="mailto:mahilsonowalpro5@gmail.com"
                className="p-1.5 rounded-full text-[#5d5d5d] hover:text-[#594ff4] hover:bg-white transition-colors"
                title="Email Mahil"
                aria-label="Email Mahil Sonowal"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Clear Chat Button */}
            {activeTab === 'chat' && messageCount > 0 && (
              <button
                onClick={handleClearClick}
                className="p-2 rounded-full text-[#888888] hover:text-rose-600 hover:bg-rose-50 border border-[#e7e7e7] hover:border-rose-200 transition-all cursor-pointer"
                title="Reset Conversation"
                aria-label="Reset Conversation"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* MOBILE VIEW: Quick Pitch + Hamburger Menu Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={handlePitchClick}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#594ff4] text-white text-xs font-semibold"
            title="60-Second Pitch"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Pitch</span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-full bg-[#f6f6f6] border border-[#e7e7e7] text-[#1f1f1f] hover:bg-[#e7e7e7] relative focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-[#1f1f1f]" />
            ) : (
              <Menu className="w-5 h-5 text-[#1f1f1f]" />
            )}
            {messageCount > 0 && !isMobileMenuOpen && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#594ff4] text-[9px] font-bold text-white">
                {messageCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU FLYOUT (Cloud #f6f6f6 card) */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 p-4 bg-[#f6f6f6] border border-[#e7e7e7] rounded-[24px] space-y-3 shadow-lg">
          {/* 1. Main Navigation Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-white rounded-full border border-[#e7e7e7]">
            <button
              onClick={() => handleTabSwitch('chat')}
              className={`flex items-center justify-center gap-2 py-2 rounded-full text-xs font-semibold transition-all ${activeTab === 'chat'
                  ? 'bg-[#594ff4] text-white shadow-sm'
                  : 'text-[#5d5d5d]'
                }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>AI Chat</span>
            </button>

            <button
              onClick={() => handleTabSwitch('matcher')}
              className={`flex items-center justify-center gap-2 py-2 rounded-full text-xs font-semibold transition-all ${activeTab === 'matcher'
                  ? 'bg-[#594ff4] text-white shadow-sm'
                  : 'text-[#5d5d5d]'
                }`}
            >
              <Target className="w-4 h-4" />
              <span>Match JD</span>
            </button>
          </div>

          {/* 2. Actions List */}
          <div className="space-y-2">
            <button
              onClick={handlePitchClick}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-white border border-[#e7e7e7] text-[#1f1f1f] text-xs font-semibold hover:border-[#594ff4]"
            >
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#594ff4] fill-[#594ff4]" />
                <span>Why Hire Mahil? (60-Sec Pitch)</span>
              </div>
              <span className="text-[10px] bg-[#594ff4]/10 text-[#594ff4] font-bold px-2 py-0.5 rounded-full">
                ⚡ Instant
              </span>
            </button>

            <button
              onClick={handleHistoryClick}
              className="w-full flex items-center justify-between p-3 rounded-2xl bg-white border border-[#e7e7e7] text-[#1f1f1f] text-xs font-medium hover:border-[#594ff4]"
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#594ff4]" />
                <span>Conversation History & Export</span>
              </div>
              {messageCount > 0 && (
                <span className="text-[10px] bg-[#594ff4] text-white px-2 py-0.5 rounded-full font-mono font-bold">
                  {messageCount} msgs
                </span>
              )}
            </button>

            {activeTab === 'chat' && messageCount > 0 && (
              <button
                onClick={handleClearClick}
                className="w-full flex items-center gap-2 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold"
              >
                <Trash2 className="w-4 h-4 text-rose-500" />
                <span>Reset Conversation</span>
              </button>
            )}
          </div>

          {/* 3. Social Contacts Footer */}
          <div className="pt-3 border-t border-[#e7e7e7] flex items-center justify-around text-xs text-[#5d5d5d]">
            <a
              href="https://github.com/mahilsonowal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 py-1 px-3 rounded-full hover:text-[#1f1f1f] hover:bg-white"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/mahil-sonowal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 py-1 px-3 rounded-full hover:text-[#594ff4] hover:bg-white"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:mahilsonowalpro5@gmail.com"
              className="flex items-center gap-1.5 py-1 px-3 rounded-full hover:text-[#594ff4] hover:bg-white"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email</span>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
