import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Sparkles, Compass } from 'lucide-react'

const PLAYFUL_PHRASES = [
  "beep boop! 🤖 Exploring the page!",
  "I run on React 19 & curiosity ⚡",
  "Mahil writes clean, modular code!",
  "Ask my AI twin in the chat! 💬",
  "Hire Mahil, he builds cool stuff ✨",
  "Look at me fly! Wheee! 🚁",
  "Checking out the technical stack... ⚙️",
  "Playdate-inspired aesthetic! 💛",
  "Psst... check out the projects section 👀",
  "Guwahati to your screen 🌄",
  "Compiling vibes... 100% done ✅",
  "I heard there's an Assamese RAG pipeline nearby 📚",
  "Not a bug, I'm a feature! 🐛✨",
  "Someone give this dev a job already 😤",
  "Fueled by chai & console.logs ☕",
  "TypeScript keeps me honest 🔒",
  "Scroll down, there's more cool stuff 📜",
  "I'm low-key the best hire here 👑",
  "Vercel deployed me in 12 seconds 🚀",
  "Try the JD matcher, I dare you 🎯",
  "Tailwind classes go brrr 🌀",
  "Warning: may contain excessive enthusiasm ⚠️",
  "01001000 01101001 (that's 'hi' in binary) 👋",
  "This portfolio has no bugs... probably 🐞",
  "Mahil's still debugging his sleep schedule 😅",
]

export default function RoamingCharacter() {
  const [pos, setPos] = useState({ x: 80, y: window.innerHeight - 75 })
  const [direction, setDirection] = useState(1) // 1 = right, -1 = left
  const [mode, setMode] = useState('walking') // 'walking' | 'flying' | 'hovering' | 'landing' | 'jumping'
  const [speechText, setSpeechText] = useState(null)
  const [speechKey, setSpeechKey] = useState(0)
  const [walkPhase, setWalkPhase] = useState(0)
  const [spinDeg, setSpinDeg] = useState(0)
  const [eyeDirection, setEyeDirection] = useState(1)

  // Mutable refs for high-performance 60fps animation state machine
  const stateRef = useRef({
    x: 80,
    y: window.innerHeight - 75,
    targetX: 80,
    targetY: window.innerHeight - 75,
    vx: 0,
    vy: 0,
    direction: 1,
    mode: 'walking', // 'walking' | 'flying' | 'hovering' | 'landing' | 'jumping'
    modeTimer: 3.5, // time remaining in current mode
    lastTime: null,
    jumpTimer: 0,
    spin: 0,
    phraseIndex: 0,
    groundY: window.innerHeight - 75,
  })

  const speechTimeoutRef = useRef(null)

  // Pick a new random target waypoint within viewport safety margins
  const pickNewWaypoint = useCallback((ground = false) => {
    const marginX = 60
    const marginY = 85
    const width = window.innerWidth
    const height = window.innerHeight
    const groundY = height - 75
    stateRef.current.groundY = groundY

    if (ground) {
      return {
        x: marginX + Math.random() * (width - marginX * 2),
        y: groundY,
      }
    }

    return {
      x: marginX + Math.random() * (width - marginX * 2),
      y: marginY + Math.random() * (height - marginY - 140),
    }
  }, [])

  // Interactive Click / Hover action: trigger jetpack boost, spin, and speech bubble
  const handleInteract = useCallback(() => {
    const phrases = PLAYFUL_PHRASES
    const nextIndex = (stateRef.current.phraseIndex + 1) % phrases.length
    stateRef.current.phraseIndex = nextIndex
    setSpeechText(phrases[nextIndex])
    setSpeechKey((prev) => prev + 1)

    // Trigger backflip / jetpack jump
    stateRef.current.mode = 'jumping'
    stateRef.current.jumpTimer = 0
    setMode('jumping')

    if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current)
    speechTimeoutRef.current = setTimeout(() => {
      setSpeechText(null)
    }, 3500)
  }, [])

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      const groundY = window.innerHeight - 75
      stateRef.current.groundY = groundY
      if (stateRef.current.y > groundY) {
        stateRef.current.y = groundY
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Main 60fps animation loop
  useEffect(() => {
    let rafId

    const loop = (timestamp) => {
      const s = stateRef.current
      if (!s.lastTime) s.lastTime = timestamp
      const dt = Math.min((timestamp - s.lastTime) / 1000, 0.1)
      s.lastTime = timestamp

      const width = window.innerWidth
      const height = window.innerHeight
      const groundY = height - 75
      s.groundY = groundY

      // Mode State Machine Logic
      s.modeTimer -= dt

      if (s.mode === 'jumping') {
        s.jumpTimer += dt
        s.spin += dt * 720 // fast 360 spin
        setSpinDeg(s.spin)

        // Hop upwards
        s.y = Math.max(70, s.y - 120 * dt)

        if (s.jumpTimer >= 0.55) {
          s.spin = 0
          setSpinDeg(0)
          // Switch to flying to explore a new spot!
          s.mode = 'flying'
          const wp = pickNewWaypoint(false)
          s.targetX = wp.x
          s.targetY = wp.y
          s.modeTimer = 4.0 + Math.random() * 3.0
          setMode('flying')
        }
      } else if (s.mode === 'walking') {
        // Walk along bottom edge
        const walkSpeed = 42
        s.x += s.direction * walkSpeed * dt
        s.y = groundY

        // Turn around at viewport boundaries
        if (s.x > width - 70) {
          s.x = width - 70
          s.direction = -1
          setDirection(-1)
          setEyeDirection(-1)
        } else if (s.x < 30) {
          s.x = 30
          s.direction = 1
          setDirection(1)
          setEyeDirection(1)
        }

        // Switch to flying mode after walking for a while
        if (s.modeTimer <= 0) {
          if (Math.random() < 0.65) {
            // Take off with propeller/jetpack!
            s.mode = 'flying'
            const wp = pickNewWaypoint(false)
            s.targetX = wp.x
            s.targetY = wp.y
            s.modeTimer = 5.0 + Math.random() * 4.0
            setMode('flying')
          } else {
            // Pause on ground & look around
            s.mode = 'hovering'
            s.modeTimer = 2.0 + Math.random() * 1.5
            setMode('hovering')
          }
        }
      } else if (s.mode === 'flying') {
        // Move towards target waypoint with smooth easing
        const dx = s.targetX - s.x
        const dy = s.targetY - s.y
        const dist = Math.hypot(dx, dy)

        // Float with natural organic sine wave bob
        const floatWave = Math.sin(timestamp / 300) * 1.5

        if (dist > 15) {
          const flySpeed = 58
          s.vx = (dx / dist) * flySpeed
          s.vy = (dy / dist) * flySpeed
          s.x += s.vx * dt
          s.y += s.vy * dt + floatWave * 0.15

          const newDir = dx > 0 ? 1 : -1
          if (newDir !== s.direction) {
            s.direction = newDir
            setDirection(newDir)
            setEyeDirection(newDir)
          }
        } else {
          // Reached waypoint: hover for a few seconds or pick next destination
          s.mode = 'hovering'
          s.modeTimer = 2.5 + Math.random() * 2.0
          setMode('hovering')
        }

        if (s.modeTimer <= 0) {
          // Decision: land or fly somewhere else
          if (Math.random() < 0.45) {
            s.mode = 'landing'
            const wp = pickNewWaypoint(true)
            s.targetX = wp.x
            s.targetY = groundY
            s.modeTimer = 4.0
            setMode('landing')
          } else {
            const wp = pickNewWaypoint(false)
            s.targetX = wp.x
            s.targetY = wp.y
            s.modeTimer = 4.5 + Math.random() * 3.0
          }
        }
      } else if (s.mode === 'hovering') {
        // Gently hover in place with sine wave floating
        const floatWave = Math.sin(timestamp / 240) * 0.8
        s.y += floatWave * 0.4

        if (s.modeTimer <= 0) {
          if (s.y >= groundY - 15) {
            // If on ground, start walking
            s.mode = 'walking'
            s.direction = Math.random() < 0.5 ? 1 : -1
            setDirection(s.direction)
            setEyeDirection(s.direction)
            s.modeTimer = 4.0 + Math.random() * 4.0
            setMode('walking')
          } else {
            // If in air, either land or fly
            if (Math.random() < 0.5) {
              s.mode = 'landing'
              const wp = pickNewWaypoint(true)
              s.targetX = wp.x
              s.targetY = groundY
              s.modeTimer = 4.0
              setMode('landing')
            } else {
              s.mode = 'flying'
              const wp = pickNewWaypoint(false)
              s.targetX = wp.x
              s.targetY = wp.y
              s.modeTimer = 4.5 + Math.random() * 3.0
              setMode('flying')
            }
          }
        }
      } else if (s.mode === 'landing') {
        // Glide gently downwards to ground level
        const dx = s.targetX - s.x
        const dy = groundY - s.y
        const dist = Math.hypot(dx, dy)

        if (dist > 10 && s.y < groundY - 2) {
          const landSpeed = 45
          s.x += (dx / Math.max(1, dist)) * landSpeed * dt
          s.y += Math.min(landSpeed * dt, dy)
        } else {
          s.y = groundY
          s.mode = 'walking'
          s.direction = Math.random() < 0.5 ? 1 : -1
          setDirection(s.direction)
          setEyeDirection(s.direction)
          s.modeTimer = 4.5 + Math.random() * 3.5
          setMode('walking')
        }
      }

      // Bound within screen
      s.x = Math.max(20, Math.min(width - 60, s.x))
      s.y = Math.max(65, Math.min(groundY, s.y))

      setPos({ x: s.x, y: s.y })
      setWalkPhase(s.mode === 'walking' ? (timestamp / 110) % (Math.PI * 2) : 0)

      rafId = requestAnimationFrame(loop)
    }

    rafId = requestAnimationFrame(loop)
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [pickNewWaypoint])

  // Animation values
  const isFlyingOrHovering = mode === 'flying' || mode === 'hovering' || mode === 'landing' || mode === 'jumping'
  const legBob = mode === 'walking' ? Math.sin(walkPhase) * 2.5 : 0
  const bodyTilt = mode === 'walking' ? Math.sin(walkPhase) * 3 : (mode === 'flying' ? direction * 6 : 0)
  const shadowScale = Math.max(0.2, 1 - (stateRef.current.groundY - pos.y) / (stateRef.current.groundY * 0.8))
  const shadowOpacity = Math.max(0.1, 0.6 * shadowScale)

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Dynamic Ground Shadow that tracks X position on the floor */}
      <div
        className="fixed h-1.5 bg-[#312f27]/40 rounded-full blur-[0.8px] pointer-events-none transition-opacity duration-150"
        style={{
          left: `${pos.x + 8}px`,
          top: `${stateRef.current.groundY + 36}px`,
          width: '28px',
          transform: `scale(${shadowScale})`,
          opacity: shadowOpacity,
        }}
      />

      {/* Roaming Character Entity (Fixed on full screen viewport) */}
      <div
        onClick={handleInteract}
        onMouseEnter={handleInteract}
        className="fixed pointer-events-auto cursor-pointer group transition-transform duration-75"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          willChange: 'transform, left, top',
        }}
        title="Hi! I'm Mahil's free-roaming bot companion (Click or hover me to boost!)"
      >
        {/* Playful Comic Speech Bubble */}
        {speechText && (
          <div
            key={speechKey}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-max max-w-[220px] pointer-events-none animate-in fade-in zoom-in-95 duration-150 z-50"
          >
            <div className="relative bg-[#ffffff] text-[#312f27] text-[11px] font-extrabold px-3 py-1.5 rounded-[8px] border-2 border-[#312f27] shadow-[0_6px_16px_rgba(0,0,0,0.3)] flex items-center gap-1.5 tracking-tight">
              <Sparkles className="w-3.5 h-3.5 text-[#ffc500] fill-[#ffc500] flex-shrink-0" />
              <span>{speechText}</span>
              {/* Speech Beak */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[2px] w-2.5 h-2.5 bg-[#ffffff] border-r-2 border-b-2 border-[#312f27] rotate-45" />
            </div>
          </div>
        )}

        {/* Animated Bot Body */}
        <div
          className="relative transition-transform duration-100"
          style={{
            transform: `scaleX(${direction}) rotate(${spinDeg || bodyTilt}deg)`,
            transformOrigin: 'center center',
          }}
        >
          <svg
            width="42"
            height="46"
            viewBox="0 0 42 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-md filter"
          >
            {/* Spinning Helicopter Propeller when flying/hovering */}
            {isFlyingOrHovering && (
              <g className="animate-spin" style={{ transformOrigin: '21px 3px', animationDuration: '0.12s' }}>
                <ellipse cx="21" cy="3" rx="14" ry="2" fill="#312f27" />
                <circle cx="21" cy="3" r="2.5" fill="#ffc500" stroke="#312f27" strokeWidth="1" />
              </g>
            )}

            {/* Antenna with LED */}
            <line
              x1="21"
              y1="4"
              x2="21"
              y2="12"
              stroke="#312f27"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle
              cx="21"
              cy="4"
              r="2.5"
              fill={isFlyingOrHovering ? "#ffc500" : "#ffffff"}
              stroke="#312f27"
              strokeWidth="1.5"
              className="animate-pulse"
            />

            {/* Main Yellow Chassis */}
            <rect
              x="8"
              y="12"
              width="26"
              height="24"
              rx="6"
              fill="#ffc500"
              stroke="#312f27"
              strokeWidth="2.5"
            />

            {/* Screen Visor */}
            <rect
              x="12"
              y="16"
              width="18"
              height="11"
              rx="3"
              fill="#312f27"
            />

            {/* Glowing Pixel Eyes */}
            <circle
              cx={eyeDirection > 0 ? 17.5 : 15.5}
              cy="21"
              r="1.8"
              fill="#ffffff"
            />
            <circle
              cx={eyeDirection > 0 ? 25.5 : 23.5}
              cy="21"
              r="1.8"
              fill="#ffffff"
            />

            {/* Cheerful blush */}
            <circle cx="14" cy="24" r="0.8" fill="#e9e4d9" opacity="0.6" />
            <circle cx="28" cy="24" r="0.8" fill="#e9e4d9" opacity="0.6" />

            {/* Activity bar */}
            <rect
              x="15"
              y="30"
              width="12"
              height="2.5"
              rx="1.25"
              fill="#312f27"
            />
            <rect
              x="16"
              y="30.5"
              width={isFlyingOrHovering ? "10" : "6"}
              height="1.5"
              rx="0.75"
              fill="#ffffff"
            />

            {/* Left Foot / Thruster Pad */}
            <rect
              x="12"
              y={36 + (direction > 0 ? legBob : -legBob)}
              width="6"
              height="4.5"
              rx="2"
              fill="#312f27"
            />

            {/* Right Foot / Thruster Pad */}
            <rect
              x="24"
              y={36 + (direction > 0 ? -legBob : legBob)}
              width="6"
              height="4.5"
              rx="2"
              fill="#312f27"
            />

            {/* Jetpack Thruster Flame Effect when flying */}
            {isFlyingOrHovering && (
              <g className="animate-pulse">
                <polygon points="14,41 16,46 17,41" fill="#ffc500" />
                <polygon points="25,41 27,46 28,41" fill="#ffc500" />
              </g>
            )}

            {/* Playdate side crank knob */}
            <rect
              x="34"
              y="20"
              width="2"
              height="5"
              rx="1"
              fill="#312f27"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
