import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import ChatWindow from './components/ChatWindow'
import ChatInput from './components/ChatInput'
import JobMatcher from './components/JobMatcher'
import LoadingSkeleton from './components/LoadingSkeleton'
import { sendMessage, getCandidateProfile } from './api/chat'

export default function App() {
  const [activeTab, setActiveTab] = useState('chat') // 'chat' | 'matcher'
  const [messages, setMessages] = useState([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })

  // Theme synchronization with HTML root element
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
    } else {
      root.classList.add('light')
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  // App initialization check
  useEffect(() => {
    const initApp = async () => {
      try {
        await getCandidateProfile()
      } catch (err) {
        console.warn('Backend warm-up / initialization notice:', err.message)
      } finally {
        // Smooth transition from skeleton to UI
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
    const previousHistory = [...messages]

    setMessages((prev) => [
      ...prev,
      userMsg,
      { id: aiMessageId, role: 'assistant', content: '' },
    ])
    setIsStreaming(true)

    try {
      await sendMessage(text, previousHistory, (chunk, fullText) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessageId ? { ...msg, content: fullText } : msg
          )
        )
      })
    } catch (error) {
      console.error('Failed to receive response:', error)
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === aiMessageId
            ? {
                ...msg,
                content:
                  "I'm having trouble connecting right now — please try again.",
              }
            : msg
        )
      )
    } finally {
      setIsStreaming(false)
    }
  }

  const handleClearChat = () => {
    if (window.confirm('Reset conversation history?')) {
      setMessages([])
    }
  }

  if (isInitializing) {
    return <LoadingSkeleton />
  }

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200 overflow-hidden font-sans">
      {/* Persona & Navigation Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onClearChat={handleClearChat}
        messageCount={messages.length}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 flex flex-col min-h-0 relative">
        {activeTab === 'chat' ? (
          <>
            <ChatWindow
              messages={messages}
              isStreaming={isStreaming}
              onSelectPrompt={handleSendMessage}
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
    </div>
  )
}
