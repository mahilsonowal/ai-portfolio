import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import PortfolioHome from './components/PortfolioHome'
import ChatWindow from './components/ChatWindow'
import ChatInput from './components/ChatInput'
import JobMatcher from './components/JobMatcher'
import LoadingSkeleton from './components/LoadingSkeleton'
import HistoryDrawer from './components/HistoryDrawer'
import { sendMessage, getPitchStream, getCandidateProfile } from './api/chat'

export default function App() {
  const [activeTab, setActiveTab] = useState('home') // 'home' | 'chat' | 'matcher'
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)

  // Current active chat session messages
  const [messages, setMessages] = useState([])

  // Master history log across all sessions stored in localStorage
  const [allHistory, setAllHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('ai_portfolio_all_history')
      return saved ? JSON.parse(saved) : []
    } catch (e) {
      return []
    }
  })

  const [isStreaming, setIsStreaming] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)

  // Persist master history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ai_portfolio_all_history', JSON.stringify(allHistory))
    } catch (e) {
      console.warn('Failed to persist all history to localStorage:', e)
    }
  }, [allHistory])

  // App initialization check
  useEffect(() => {
    const initApp = async () => {
      try {
        await getCandidateProfile()
      } catch (err) {
        console.warn('Backend warm-up / initialization notice:', err.message)
      } finally {
        setTimeout(() => setIsInitializing(false), 400)
      }
    }
    initApp()
  }, [])

  const handleSendMessage = async (text) => {
    if (!text.trim() || isStreaming) return

    setActiveTab('chat')

    const userMessageId = `user-${Date.now()}`
    const aiMessageId = `assistant-${Date.now()}`

    const userMsg = { id: userMessageId, role: 'user', content: text }
    const aiMsgPlaceholder = { id: aiMessageId, role: 'assistant', content: '' }
    const previousHistory = [...messages]

    setMessages((prev) => [...prev, userMsg, aiMsgPlaceholder])
    setIsStreaming(true)

    try {
      const fullResponse = await sendMessage(text, previousHistory, (chunk, fullText) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId ? { ...msg, content: fullText } : msg
          )
        )
      })

      // Add completed interaction to master history
      const completedAiMsg = { id: aiMessageId, role: 'assistant', content: fullResponse }
      setAllHistory((prev) => [...prev, userMsg, completedAiMsg])
    } catch (error) {
      console.error('Failed to receive response:', error)
      const errorMsg = {
        id: aiMessageId,
        role: 'assistant',
        content: "I'm having trouble connecting right now — please try again.",
      }
      setMessages((prev) =>
        prev.map((msg) => (msg.id === aiMessageId ? errorMsg : msg))
      )
    } finally {
      setIsStreaming(false)
    }
  }

  // Bonus Option B: Trigger 60-Second Recruiter Pitch
  const handleTriggerPitch = async () => {
    if (isStreaming) return

    setActiveTab('chat')

    const userMessageId = `user-${Date.now()}`
    const aiMessageId = `assistant-${Date.now()}`

    const userMsg = {
      id: userMessageId,
      role: 'user',
      content: '⚡ Why should we hire Mahil Sonowal? Give me your 60-second recruiter pitch.',
    }
    const aiMsgPlaceholder = { id: aiMessageId, role: 'assistant', content: '' }

    setMessages((prev) => [...prev, userMsg, aiMsgPlaceholder])
    setIsStreaming(true)

    try {
      const fullResponse = await getPitchStream((chunk, fullText) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId ? { ...msg, content: fullText } : msg
          )
        )
      })

      const completedAiMsg = { id: aiMessageId, role: 'assistant', content: fullResponse }
      setAllHistory((prev) => [...prev, userMsg, completedAiMsg])
    } catch (error) {
      console.error('Pitch generation error:', error)
      const errorMsg = {
        id: aiMessageId,
        role: 'assistant',
        content: "I'm having trouble generating the pitch right now — please try again in a moment.",
      }
      setMessages((prev) =>
        prev.map((msg) => (msg.id === aiMessageId ? errorMsg : msg))
      )
    } finally {
      setIsStreaming(false)
    }
  }

  // Brand click: Navigate to Home Portfolio
  const handleNewChat = () => {
    setActiveTab('home')
  }

  // When a user selects a past item from the History Drawer:
  // Restore all history messages to the view and scroll to the selected question
  const handleSelectHistoryMessage = (messageId) => {
    setActiveTab('chat')
    setMessages(allHistory)
    setIsHistoryOpen(false)

    setTimeout(() => {
      const el = document.getElementById(messageId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        el.classList.add('ring-2', 'ring-[#ffc500]', 'bg-[#ffc500]/10', 'rounded-2xl', 'p-2')
        setTimeout(() => {
          el.classList.remove('ring-2', 'ring-[#ffc500]', 'bg-[#ffc500]/10', 'p-2')
        }, 2200)
      }
    }, 120)
  }

  // Clear active chat and wipe master history
  const handleClearChat = () => {
    if (window.confirm('Reset current conversation and chat history?')) {
      setMessages([])
      setAllHistory([])
      try {
        localStorage.removeItem('ai_portfolio_all_history')
      } catch (e) {
        console.warn('Failed to clear history:', e)
      }
    }
  }

  if (isInitializing) {
    return <LoadingSkeleton />
  }

  return (
    <div className="flex flex-col h-screen bg-[#ffffff] text-[#312f27] selection:bg-[#ffc500] selection:text-[#312f27] overflow-hidden font-sans">
      {/* Persona & Navigation Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onNewChat={handleNewChat}
        onClearChat={handleClearChat}
        onTriggerPitch={handleTriggerPitch}
        onOpenHistory={() => setIsHistoryOpen(true)}
        messageCount={allHistory.filter((m) => m.role === 'user').length}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 flex flex-col min-h-0 relative bg-[#ffffff]">
        {activeTab === 'home' ? (
          <PortfolioHome
            onNavigateTab={setActiveTab}
            onAskInChat={handleSendMessage}
            onTriggerPitch={handleTriggerPitch}
          />
        ) : activeTab === 'chat' ? (
          <>
            <ChatWindow
              messages={messages}
              isStreaming={isStreaming}
              onSelectPrompt={handleSendMessage}
              onTriggerPitch={handleTriggerPitch}
            />

            {/* Bottom Floating Input Dock */}
            <ChatInput
              onSendMessage={handleSendMessage}
              isStreaming={isStreaming}
            />
          </>
        ) : (
          <JobMatcher onAskInChat={handleSendMessage} />
        )}
      </main>

      {/* Slide-out Chat History Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        messages={allHistory}
        onClearHistory={handleClearChat}
        onSelectMessage={handleSelectHistoryMessage}
      />
    </div>
  )
}
