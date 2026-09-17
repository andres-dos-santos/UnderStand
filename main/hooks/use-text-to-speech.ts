import { useCallback, useEffect, useRef, useState } from 'react'

export function useTextToSpeech() {
  const [speaking, setSpeaking] = useState(false)
  const [paused, setPaused] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  const speak = useCallback((text: string, lang = 'pt-BR') => {
    if (!('speechSynthesis' in window)) return

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.onstart = () => {
      setSpeaking(true)
      setPaused(false)
    }
    utterance.onpause = () => {
      setSpeaking(false)
      setPaused(true)
    }
    utterance.onresume = () => {
      setSpeaking(true)
      setPaused(false)
    }
    utterance.onend = () => {
      if (utteranceRef.current !== utterance) return
      setSpeaking(false)
      setPaused(false)
      utteranceRef.current = null
    }
    utterance.onerror = utterance.onend
    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }, [])

  const pause = useCallback(() => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.pause()
  }, [])

  const resume = useCallback(() => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.resume()
  }, [])

  const stop = useCallback(() => {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    utteranceRef.current = null
    setSpeaking(false)
    setPaused(false)
  }, [])

  useEffect(() => stop, [stop])

  return { pause, paused, resume, speak, speaking, stop }
}
