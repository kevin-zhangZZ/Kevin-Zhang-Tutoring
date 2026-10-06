// Two reading preferences for the worked solutions, each remembered per device.
//
// "Hide answers" practice mode. With it on, an MCQ's options become clickable and the answer,
// VCAA's percentages and the working only appear once the student commits to an option, and a
// short-answer part's working is revealed one step at a time. Off by default, so the page reads
// exactly as it always has for anyone who just wants the solutions.
//
// "Concise" / "Detailed". Concise (the default) shows only what a student would write in the exam
// — the working and its line-by-line reasoning — plus the examiner's report and the video.
// Detailed adds the teaching around it: Background notes, Try It Yourself interactive diagrams,
// Common Mistake boxes and other asides (anything wrapped in <DetailOnly>). Chemistry always reads
// in full — the split was designed around the maths solutions — so its pages pin `detailed` on.

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

const STORAGE_KEY = 'ws-hide-answers'
const DETAIL_KEY = 'ws-detailed'

interface StudyMode {
  hideAnswers: boolean
  setHideAnswers: (hide: boolean) => void
  detailed: boolean
  setDetailed: (detailed: boolean) => void
}

const StudyModeCtx = createContext<StudyMode>({ hideAnswers: false, setHideAnswers: () => {}, detailed: false, setDetailed: () => {} })

function useStoredFlag(key: string): [boolean, (v: boolean) => void] {
  const [value, setValue] = useState<boolean>(() => {
    try {
      return localStorage.getItem(key) === 'true'
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, String(value))
    } catch {
      // Storage can be blocked (private windows) — the toggle still works for this visit.
    }
  }, [key, value])

  return [value, setValue]
}

export function StudyModeProvider({ children }: { children: ReactNode }) {
  const [hideAnswers, setHideAnswers] = useStoredFlag(STORAGE_KEY)
  const [detailed, setDetailed] = useStoredFlag(DETAIL_KEY)
  return <StudyModeCtx.Provider value={{ hideAnswers, setHideAnswers, detailed, setDetailed }}>{children}</StudyModeCtx.Provider>
}

/** Shows everything below it in full whatever the Concise/Detailed choice (Chemistry). */
export function AlwaysDetailed({ children }: { children: ReactNode }) {
  const mode = useStudyMode()
  return <StudyModeCtx.Provider value={{ ...mode, detailed: true }}>{children}</StudyModeCtx.Provider>
}

export function useStudyMode() {
  return useContext(StudyModeCtx)
}
