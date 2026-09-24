// "Hide answers" practice mode. With it on, an MCQ's options become clickable and the answer,
// VCAA's percentages and the working only appear once the student commits to an option, and a
// short-answer part's working is revealed one step at a time. Off by default, so the page reads
// exactly as it always has for anyone who just wants the solutions. Remembered per device.

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

const STORAGE_KEY = 'ws-hide-answers'

interface StudyMode {
  hideAnswers: boolean
  setHideAnswers: (hide: boolean) => void
}

const StudyModeCtx = createContext<StudyMode>({ hideAnswers: false, setHideAnswers: () => {} })

export function StudyModeProvider({ children }: { children: ReactNode }) {
  const [hideAnswers, setHideAnswers] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(hideAnswers))
    } catch {
      // Storage can be blocked (private windows) — the toggle still works for this visit.
    }
  }, [hideAnswers])

  return <StudyModeCtx.Provider value={{ hideAnswers, setHideAnswers }}>{children}</StudyModeCtx.Provider>
}

export function useStudyMode() {
  return useContext(StudyModeCtx)
}
