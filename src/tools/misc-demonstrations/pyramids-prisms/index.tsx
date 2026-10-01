import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useBackToTop } from '../../../components/Layout'
import { reducedMotion } from '../lib/solid3d.ts'
import DemoPage from '../DemoPage'
import Explore from './Explore'
import Lesson, { type PredAnswer } from './Lesson'
import type { StepN } from './lessonSteps'
import { PhoneNav, StepBar, type PPView } from './StepNav'
import './pp.css'

// Pyramids & Prisms. Routes: #/misc-demonstrations/pyramids-prisms (the Lesson, step 1),
// /pyramids-prisms/step-2 … /step-6, and /pyramids-prisms/explore (the full explorer).
export const PP_BASE = '/misc-demonstrations/pyramids-prisms'

function viewFromPath(pathname: string): PPView {
  const sub = pathname.split('/')[3] ?? ''
  if (sub === 'explore') return 'explore'
  const m = /^step-([1-6])$/.exec(sub)
  return m ? (Number(m[1]) as StepN) : 1
}
function pathFor(v: PPView): string {
  if (v === 'explore') return `${PP_BASE}/explore`
  return v === 1 ? PP_BASE : `${PP_BASE}/step-${v}`
}
const isPhone = () => !window.matchMedia('(min-width: 768px)').matches

export default function PyramidsPrisms() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const view = viewFromPath(pathname)

  // Lesson progress lives here, so it survives a trip to Explore and back
  const [pred, setPred] = useState<Partial<Record<StepN, PredAnswer>>>({})
  const [visited, setVisited] = useState<Set<PPView>>(() => new Set([view]))
  useEffect(() => {
    setVisited((v) => (v.has(view) ? v : new Set(v).add(view)))
  }, [view])

  // The phone's Back / Next bar sits where the back-to-top button would be
  useBackToTop({ liftBelowLg: true })

  // After a step change the user asked for, move focus to the new step's heading (and on phones,
  // scroll back up to the step bar)
  const focusNext = useRef(false)
  const [focusTick, setFocusTick] = useState(0)
  const refocus = useCallback(() => {
    focusNext.current = true
    setFocusTick((t) => t + 1)
  }, [])
  const go = useCallback(
    (v: PPView) => {
      if (v === view) return refocus()
      focusNext.current = true
      navigate(pathFor(v), { replace: true })
    },
    [navigate, view, refocus],
  )
  useEffect(() => {
    if (!focusNext.current) return
    focusNext.current = false
    const el = document.getElementById(view === 'explore' ? 'pp-controls-title' : 'pp-lesson-title')
    if (isPhone()) document.getElementById('pp-stepbar')?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' })
    el?.focus({ preventScroll: true })
  }, [view, focusTick])

  const toControls = () => {
    document.getElementById('pp-controls')?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' })
    document.getElementById('pp-controls-title')?.focus({ preventScroll: true })
  }

  return (
    <DemoPage
      id="pyramids-prisms"
      intro={
        <>
          Cut a pyramid or a prism at any height and the flat face you get is a slice (a cross-section). Six short steps take you from{' '}
          <i>V</i> = <i>Ah</i> to <i>V</i> = ⅓<i>Ah</i>, then Explore lets you change everything.
        </>
      }
    >
      <div className="md-pp pb-20 md:pb-0">
        <StepBar view={view} visited={visited} onGo={go} />
        {view === 'explore' ? (
          <Explore />
        ) : (
          <Lesson step={view} pred={pred} onPredict={(n, a) => setPred((p) => ({ ...p, [n]: a }))} onGo={go} onResetStep={refocus} />
        )}
        <PhoneNav view={view} onGo={go} onControls={toControls} />
      </div>
    </DemoPage>
  )
}
