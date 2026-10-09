// Loads a question's worked-solution component on demand, so the ~870 question files stay out
// of the main bundle. vite.config.ts (manualChunks) groups the files into one chunk per exam
// paper, so opening one question fetches its whole paper and the rest of it opens instantly.

import { useEffect, useState, type ComponentType } from 'react'
import { QUESTION_FILES } from './details'

type QuestionModule = { default: ComponentType }

const modules = import.meta.glob<QuestionModule>('./questions/*.tsx')

// Components already fetched, so revisiting a question (or a paper already loaded) renders on
// the very first pass with no placeholder.
const loaded = new Map<string, ComponentType>()

function loaderFor(id: string) {
  const file = QUESTION_FILES[id]
  return file ? modules[`./questions/${file}.tsx`] : undefined
}

/** Starts fetching a question's paper (if it isn't already loaded), e.g. ahead of a click. */
export function preloadQuestion(id: string): Promise<ComponentType | undefined> {
  const cached = loaded.get(id)
  if (cached) return Promise.resolve(cached)
  const load = loaderFor(id)
  if (!load) return Promise.resolve(undefined)
  return load().then(m => {
    loaded.set(id, m.default)
    return m.default
  })
}

export type QuestionDetailState =
  | { status: 'ready'; Detail: ComponentType }
  | { status: 'loading' }
  | { status: 'error'; retry: () => void }
  | { status: 'none' }

/** The worked-solution component for a question id, loading it if needed. */
export function useQuestionDetail(id: string | undefined): QuestionDetailState {
  const [, setVersion] = useState(0)
  const [failed, setFailed] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)

  const cached = id ? loaded.get(id) : undefined
  const exists = !!id && !!loaderFor(id)

  useEffect(() => {
    if (!id || cached || !exists) return
    let live = true
    setFailed(null)
    preloadQuestion(id).then(
      () => live && setVersion(v => v + 1),
      () => live && setFailed(id),
    )
    return () => {
      live = false
    }
  }, [id, cached, exists, attempt])

  if (!id || !exists) return { status: 'none' }
  if (cached) return { status: 'ready', Detail: cached }
  if (failed === id) return { status: 'error', retry: () => setAttempt(a => a + 1) }
  return { status: 'loading' }
}
