const RAW_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const API_BASE_URL = RAW_API_URL.replace(/\/+$/, '')

/**
 * Sends a message and conversation history to the FastAPI backend and streams the response chunks.
 *
 * @param {string} message - Current user message
 * @param {Array<{role: string, content: string}>} history - Previous messages
 * @param {Function} onChunk - Callback executed for each streamed text piece
 * @returns {Promise<string>} - Complete accumulated response text
 */
export async function sendMessage(message, history = [], onChunk) {
  try {
    const formattedHistory = history.map(({ role, content }) => ({
      role,
      content,
    }))

    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        history: formattedHistory,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      throw new Error(
        errorData?.detail || `Server returned error status ${response.status}`
      )
    }

    if (!response.body) {
      throw new Error('ReadableStream not supported by browser or empty response body.')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder('utf-8')
    let fullText = ''

    while (true) {
      const { value, done } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value, { stream: true })
      fullText += chunk
      if (onChunk) {
        onChunk(chunk, fullText)
      }
    }

    return fullText
  } catch (error) {
    console.error('API Error in sendMessage:', error)
    throw error
  }
}

/**
 * Evaluates candidate fit against a job description.
 *
 * @param {string} jobDescription - Raw pasted job description
 * @returns {Promise<object>} - Structured match result
 */
export async function matchJobDescription(jobDescription) {
  try {
    const response = await fetch(`${API_BASE_URL}/match-jd`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        job_description: jobDescription,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      throw new Error(
        errorData?.detail || `Server error during JD matching: ${response.status}`
      )
    }

    return await response.json()
  } catch (error) {
    console.error('API Error in matchJobDescription:', error)
    throw error
  }
}

/**
 * Fetches the candidate profile data from the backend.
 */
export async function getCandidateProfile() {
  const response = await fetch(`${API_BASE_URL}/candidate`)
  if (!response.ok) {
    throw new Error('Failed to fetch candidate profile')
  }
  return response.json()
}
