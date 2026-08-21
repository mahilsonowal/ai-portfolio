import React, { useState } from 'react'
import {
  Mail,
  Trash2,
  Home,
  MessageSquare,
  Target,
  Zap,
  Clock,
  Menu,
  X,
} from 'lucide-react'
import profilePic from '../assets/dp3.png'

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
  activeTab = 'home',
  onTabChange,
  onNewChat,
  onClearChat,
  onTriggerPitch,
  onOpenHistory,
  messageCount = 0,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleBrandClick = () => {
    onTabChange('home')
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
    <header className="sticky top-0 z-40 w-full bg-[#788086]/95 backdrop-blur-md border-b border-[#312f27]/15 px-4 sm:px-8 py-3.5 transition-colors">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-4">

        {/* BRAND: Yellow / Paper White Signature Wordmark */}
        <button
          type="button"
          onClick={handleBrandClick}
          className="flex items-center gap-3 min-w-0 text-left group cursor-pointer focus:outline-none"
          title="Return to Home Portfolio"
          aria-label="Return to Home Portfolio"
        >
          <div className="relative flex-shrink-0">
            <div className="w-10 h-10 rounded-[6px] bg-[#ffc500] border border-[#312f27]/20 p-[2px] overflow-hidden shadow-sm">
              <img
                src={profilePic}
                alt="Mahil Sonowal"
                className="w-full h-full object-cover object-top rounded-[4px]"
              />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ffc500] border-2 border-[#788086]"></span>
            </span>
          </div>

          <div className="min-w-0">
            <h1 className="font-extrabold text-lg sm:text-xl text-[#ffffff] group-hover:text-[#ffc500] transition-colors tracking-[-0.01em] lowercase">
              mahil sonowal
            </h1>
            <p className="text-[11px] text-[#e9e4d9] font-medium tracking-tight">
              Software Developer • Web & AI
            </p>
          </div>
        </button>

        {/* DESKTOP VIEW: Nav Pills */}
        <div className="hidden md:flex items-center gap-3">

          {/* Main 3 Segment Buttons */}
          <div className="flex items-center bg-[#312f27]/30 border border-[#ffffff]/10 p-1 rounded-[22px]">
            <button
              onClick={() => handleTabSwitch('home')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-[20px] text-xs font-bold transition-all cursor-pointer ${activeTab === 'home'
                ? 'bg-[#ffc500] text-[#312f27] shadow-sm'
                : 'text-[#ffffff] hover:text-[#ffc500]'
                }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Portfolio</span>
            </button>

            <button
              onClick={() => handleTabSwitch('chat')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-[20px] text-xs font-bold transition-all cursor-pointer ${activeTab === 'chat'
                ? 'bg-[#ffc500] text-[#312f27] shadow-sm'
                : 'text-[#ffffff] hover:text-[#ffc500]'
                }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>AI Chat</span>
            </button>

            <button
              onClick={() => handleTabSwitch('matcher')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-[20px] text-xs font-bold transition-all cursor-pointer ${activeTab === 'matcher'
                ? 'bg-[#ffc500] text-[#312f27] shadow-sm'
                : 'text-[#ffffff] hover:text-[#ffc500]'
                }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Match JD</span>
            </button>
          </div>

          {/* Desktop Right Action Bar */}
          <div className="flex items-center gap-2">
            {/* Pitch Pill */}
            <button
              onClick={handlePitchClick}
              className="flex items-center gap-1.5 px-4 py-2 rounded-[22px] text-xs font-bold bg-[#312f27] hover:bg-[#1a1814] text-[#ffc500] border border-[#ffc500]/40 transition-all shadow-md cursor-pointer active:scale-98"
              title="Generate a 60-Second Recruiter Pitch for Mahil"
            >
              <Zap className="w-3.5 h-3.5 fill-current text-[#ffc500]" />
              <span>Why Hire Me?</span>
            </button>

            {/* History Button */}
            <button
              onClick={handleHistoryClick}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-[22px] text-xs font-bold text-[#ffffff] bg-[#312f27]/40 hover:bg-[#312f27]/60 border border-[#ffffff]/15 transition-all cursor-pointer"
              title="Open Conversation History"
            >
              <Clock className="w-3.5 h-3.5 text-[#ffc500]" />
              <span>History</span>
              {messageCount > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 bg-[#ffc500] text-[#312f27] rounded-full font-mono font-extrabold">
                  {messageCount}
                </span>
              )}
            </button>

            {/* Social Pill Group */}
            <div className="flex items-center bg-[#312f27]/30 border border-[#ffffff]/10 rounded-[22px] p-1">
              <a
                href="https://github.com/mahilsonowal"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full text-[#ffffff] hover:text-[#ffc500] transition-colors"
                title="GitHub Profile"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com/in/mahil-sonowal"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-full text-[#ffffff] hover:text-[#ffc500] transition-colors"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="mailto:mahilsonowalpro5@gmail.com"
                className="p-1.5 rounded-full text-[#ffffff] hover:text-[#ffc500] transition-colors"
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
                className="p-2 rounded-full text-[#e9e4d9] hover:text-rose-300 hover:bg-rose-900/30 transition-all cursor-pointer"
                title="Reset Conversation"
                aria-label="Reset Conversation"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* MOBILE VIEW */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={handlePitchClick}
            className="flex items-center gap-1 px-3 py-1.5 rounded-[22px] bg-[#312f27] text-[#ffc500] border border-[#ffc500]/40 text-xs font-bold shadow-sm"
            title="60-Second Pitch"
          >
            <Zap className="w-3.5 h-3.5 fill-current text-[#ffc500]" />
            <span>Pitch</span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-[10px] bg-[#312f27]/40 border border-[#ffffff]/15 text-[#ffffff] hover:bg-[#312f27]/60 relative focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
            {messageCount > 0 && !isMobileMenuOpen && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ffc500] text-[#312f27] text-[9px] font-bold">
                {messageCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 p-4 bg-[#312f27] text-white border border-[#ffffff]/15 rounded-[16px] space-y-3 shadow-2xl">
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-black/40 rounded-[12px]">
            <button
              onClick={() => handleTabSwitch('home')}
              className={`flex items-center justify-center gap-1 py-2 rounded-[8px] text-xs font-bold transition-all ${activeTab === 'home'
                ? 'bg-[#ffc500] text-[#312f27]'
                : 'text-[#e9e4d9]'
                }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>

            <button
              onClick={() => handleTabSwitch('chat')}
              className={`flex items-center justify-center gap-1 py-2 rounded-[8px] text-xs font-bold transition-all ${activeTab === 'chat'
                ? 'bg-[#ffc500] text-[#312f27]'
                : 'text-[#e9e4d9]'
                }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>AI Chat</span>
            </button>

            <button
              onClick={() => handleTabSwitch('matcher')}
              className={`flex items-center justify-center gap-1 py-2 rounded-[8px] text-xs font-bold transition-all ${activeTab === 'matcher'
                ? 'bg-[#ffc500] text-[#312f27]'
                : 'text-[#e9e4d9]'
                }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Match JD</span>
            </button>
          </div>

          <div className="space-y-2 pt-1">
            <button
              onClick={handlePitchClick}
              className="w-full flex items-center justify-between p-3 rounded-[10px] bg-[#312f27] border border-[#ffc500]/40 text-[#ffc500] text-xs font-bold"
            >
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#ffc500] fill-current" />
                <span>Why Hire Mahil? (60-Sec Pitch)</span>
              </div>
              <span className="text-[10px] bg-[#ffc500]/20 text-[#ffc500] font-bold px-2 py-0.5 rounded-full">
                ⚡ Instant
              </span>
            </button>

            <button
              onClick={handleHistoryClick}
              className="w-full flex items-center justify-between p-3 rounded-[10px] bg-white/10 text-white text-xs font-medium hover:bg-white/15"
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#ffc500]" />
                <span>Conversation History</span>
              </div>
              {messageCount > 0 && (
                <span className="text-[10px] bg-[#ffc500] text-[#312f27] px-2 py-0.5 rounded-full font-mono font-bold">
                  {messageCount} msgs
                </span>
              )}
            </button>
          </div>

          {/* Mobile Social & Contact Links */}
          <div className="pt-2 border-t border-[#ffffff]/10 space-y-2">
            <span className="text-[10px] uppercase font-bold text-[#b1afa7] tracking-wider block px-1">
              Connect & Profiles
            </span>
            <div className="grid grid-cols-3 gap-2">
              <a
                href="https://github.com/mahilsonowal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-[10px] bg-white/10 hover:bg-[#ffc500] hover:text-[#312f27] text-white text-xs font-bold transition-all"
                title="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              <a
                href="https://linkedin.com/in/mahil-sonowal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-[10px] bg-white/10 hover:bg-[#ffc500] hover:text-[#312f27] text-white text-xs font-bold transition-all"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>

              <a
                href="mailto:mahilsonowalpro5@gmail.com"
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-[10px] bg-[#ffc500] hover:bg-[#e6b000] text-[#312f27] text-xs font-extrabold transition-all shadow-sm"
                title="Email Mahil"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>
            </div>

            {/* Clear chat action in mobile if active in chat */}
            {activeTab === 'chat' && messageCount > 0 && (
              <button
                onClick={() => {
                  handleClearClick()
                  setIsMobileMenuOpen(false)
                }}
                className="w-full flex items-center justify-center gap-2 p-2 rounded-[10px] bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 border border-rose-500/30 text-xs font-bold transition-all mt-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Chat Conversation</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
