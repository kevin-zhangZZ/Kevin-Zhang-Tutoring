import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import Katex from '../../../components/Katex'
import { reducedMotion, type Stage, type Vec3 } from '../lib/solid3d.ts'
import { LIFT_MS, useLift } from './useLift'
import { ExploreControls } from './Controls'
import { Inset } from './Inset'
import {
  DEFAULTS,
  SLANT_CAM,
  applyPatch,
  computeGeometry,
  homeFrame,
  f1,
  solidName,
  solidWords,
  type CamPreset,
  type PPGeometry,
  type PPState,
} from './model'
import { NoticeBar, exploreNotice } from './Notice'
import { buildScene } from './scene'
import { PPStage, ViewButtons, useMedia } from './Stage'
import { Tiles } from './Tiles'
import { Working } from './Working'

/** The home camera for a state: centred on the solid, zoomed out only if it wouldn't fit. */
interface Home {
  zoom: number
  target: Vec3
  pan: [number, number]
}
/** On phones the picture sits a little lower, clear of the name chip. */
function homeFor(st: PPState, md: boolean): Home {
  return { ...homeFrame(computeGeometry(st)), pan: [0, md ? 0 : 0.06] }
}
const sameHome = (a: Home, b: Home) =>
  a.zoom === b.zoom && a.pan[1] === b.pan[1] && a.target[0] === b.target[0] && a.target[1] === b.target[1] && a.target[2] === b.target[2]

function Legend({ g, st }: { g: PPGeometry; st: PPState }) {
  const w = solidWords(g.curvy)
  const item = (sw: ReactNode, text: string) => (
    <span key={text} className="inline-flex items-center gap-1.5">
      {sw}
      {text}
    </span>
  )
  const box = (cls: string) => <span className={`inline-block w-2.5 h-2.5 rounded-sm ${cls}`} />
  return (
    <>
      {g.showPyr && item(box('sw-pyr'), w.Pc)}
      {g.n === 0 && item(box('sw-slice'), 'Slice')}
      {g.showPri && item(box(st.solid === 'both' && !g.side ? 'sw-prism' : 'sw-prism-solid'), w.Qc)}
      {g.n > 0 && item(box('sw-layer'), 'Layers')}
      {st.slant && item(<span className="inline-block w-3 h-0.5 rounded sw-slant" />, 'Slant Length')}
    </>
  )
}

// ------------------------------------------------------------------------------------------------
// Things to Try
// ------------------------------------------------------------------------------------------------

type TagId = 'mistake' | 'y10' | 'ms'
const TAGS: Record<TagId, [string, string]> = {
  mistake: ['Common Mistake', 'bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-200'],
  y10: ['Year 10', 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200'],
  ms: ['Methods & Specialist', 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'],
}
interface Try {
  tag: TagId
  text: ReactNode
  set: Partial<PPState>
  cam?: CamPreset
}
const TRIES: Try[] = [
  {
    tag: 'mistake',
    text: (
      <>
        Move the slice to <i>z</i> = 4.5. It’s ¼ as wide as the base. What fraction of the area is it?
      </>
    ),
    set: { shape: 'square', solid: 'pyramid', h: 6, s: 0, z: 4.5, tab: 'slice', layers: 0, lift: false, slant: false },
  },
  { tag: 'mistake', text: 'Slide the apex right off the edge of the base. Does the volume change?', set: { solid: 'pyramid', s: 5, slant: false, lift: false, layers: 0 } },
  {
    tag: 'mistake',
    text: (
      <>
        Turn on Slant Length. Which length belongs in <i>V</i> = ⅓<i>Ah</i>?
      </>
    ),
    set: { shape: 'square', solid: 'pyramid', s: 0, slant: true, lift: false, layers: 0 },
    cam: SLANT_CAM,
  },
  { tag: 'mistake', text: 'Switch to Both, then change anything you like. Watch Pyramid ÷ Prism.', set: { solid: 'both', layout: 'nested', slant: false, lift: false, layers: 0 } },
  {
    tag: 'mistake',
    text: (
      <>
        Pick Weird. Does ⅓<i>Ah</i> still work on a base this ugly?
      </>
    ),
    set: { shape: 'weird', solid: 'pyramid', slant: false, lift: false, layers: 0 },
  },
  {
    tag: 'y10',
    text: (
      <>
        Lift the top off at <i>z</i> = 3. What fraction of the volume is in the top piece?
      </>
    ),
    set: { z: 3, lift: true, layers: 0, slant: false },
  },
  {
    tag: 'ms',
    text: 'Add 30 layers, then flip Inside to Outside. Which number are both chasing?',
    set: { solid: 'pyramid', layers: 30, layerMode: 'inside', lift: false, slant: false, tab: 'graph' },
  },
]

// ------------------------------------------------------------------------------------------------
// Explore
// ------------------------------------------------------------------------------------------------

export default function Explore() {
  const [st, setSt] = useState<PPState>(() => ({ ...DEFAULTS }))
  const [stage, setStage] = useState<Stage | null>(null)
  const md = useMedia('(min-width: 768px)')
  const liftT = useLift(st.lift ? 1 : 0)
  const g = useMemo(() => computeGeometry(st, liftT), [st, liftT])
  const stageCardRef = useRef<HTMLElement>(null)
  const triesRef = useRef<HTMLDetailsElement>(null)

  const set = useCallback((patch: Partial<PPState>) => setSt((prev) => applyPatch(prev, patch)), [])

  // Camera follows the state: the target keeps the solid centred and the zoom backs off for tall,
  // leaning or Side by Side solids, so nothing leaves the stage. homeRef holds what the camera
  // already has; a zoom the user chose is scaled by the same ratio. Slider drags (h, s) move the
  // camera instantly with the picture; clicks (solid, layout, shape, lift) ease it over.
  const homeRef = useRef<Home | null>(null)
  const prevRef = useRef(st)
  const stageRef = useRef<Stage | null>(null)
  useEffect(() => {
    const prev = prevRef.current
    prevRef.current = st
    if (!stage) return
    const want = homeFor(st, md)
    const had = homeRef.current
    homeRef.current = want
    if (stageRef.current !== stage || !had) {
      // A new stage: start it at this state's home view
      stageRef.current = stage
      stage.setHome(want)
      stage.resetCamera({ animate: false })
      return
    }
    if (sameHome(want, had)) return
    stage.setHome(want)
    const sliding = prev.h !== st.h || prev.s !== st.s
    stage.setCamera(
      { target: want.target, pan: want.pan, zoom: stage.getCamera().zoom * (want.zoom / had.zoom) },
      { animate: sliding ? false : st.lift !== prev.lift ? LIFT_MS : true },
    )
  }, [stage, st, md])

  /** Jump to a new state and a camera, with the home view updated first so a reset tween heads
   *  for the right place. */
  const jump = (next: PPState, cam?: CamPreset) => {
    const home = homeFor(next, md)
    homeRef.current = home
    prevRef.current = next
    if (stage) {
      stage.setHome(home)
      if (cam) stage.setCamera({ ...cam, ...home }, { animate: true })
      else stage.resetCamera({ animate: true })
    }
    setSt(next)
  }

  const onReset = () => jump({ ...DEFAULTS })

  const tryIt = (t: Try) => {
    const p: Partial<PPState> = { ...t.set }
    if (p.lift) {
      if (st.solid === 'prism') p.solid = 'pyramid'
      if (st.h <= 3.1 && p.h === undefined) p.h = 6
    }
    if (p.layers && st.solid === 'both') p.solid = 'pyramid'
    jump(applyPatch(st, p), t.cam)
    if (!md) stageCardRef.current?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' })
  }

  // Things to Try starts open on wide screens, closed on phones
  useEffect(() => {
    if (triesRef.current) triesRef.current.open = window.matchMedia('(min-width: 768px)').matches
  }, [])

  const scene = useCallback((stg: Stage, heavy: boolean) => buildScene(g, st, stg, { heavy }), [g, st])

  const name = solidName(st)
  const Vshown = st.solid === 'prism' ? g.Vpri : g.Vpyr
  const sliceShown = st.solid === 'prism' ? g.Av : g.sliceA
  const label = `${name.charAt(0) + name.slice(1).toLowerCase()}, base area ${f1(g.A)}, height ${f1(g.h)}, sliced at ${f1(g.z)}, slice area ${f1(sliceShown)}, volume ${f1(Vshown)}. Drag or use the arrow keys to turn it.`
  const notice = exploreNotice(g, st)

  // Screen readers hear the numbers once a slider settles
  const [live, setLive] = useState('')
  useEffect(() => {
    const id = window.setTimeout(() => setLive(`Slice area ${f1(sliceShown)} square units. Volume ${f1(Vshown)} cubic units.`), 500)
    return () => clearTimeout(id)
  }, [sliceShown, Vshown])

  return (
    <>
      {/* Phone: one column in the order Stage, Controls, Tiles, Inset (the column wrappers are
          display: contents and the cards carry order-N). md+: two independent columns. */}
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start">
        <div className="contents lg:flex lg:flex-col lg:gap-4 lg:min-w-0">
          <section
            ref={stageCardRef}
            className="order-1 scroll-mt-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl relative overflow-hidden"
            aria-label="3D stage"
          >
            <PPStage
              scene={scene}
              canGoHeavy={g.n > 0}
              label={label}
              onStage={setStage}
              topRight={<ViewButtons stage={stage} />}
              topLeft={
                <>
                  <div>{name}</div>
                  <div className="md:hidden text-[12px] font-normal tabular-nums text-gray-600 dark:text-gray-300">
                    Slice {f1(sliceShown)} u² · <i>V</i> {f1(Vshown)} u³
                  </div>
                </>
              }
              bottomRight={<Legend g={g} st={st} />}
            />
            <NoticeBar tone={notice.tone}>{notice.body}</NoticeBar>
            <div className="sr-only" aria-live="polite">
              {live}
            </div>
          </section>

          <Tiles className="order-3" ids={['A', 'S', 'V', 'L']} g={g} st={st} />
        </div>

        <div className="contents lg:flex lg:flex-col lg:gap-4 lg:min-w-0">
          <ExploreControls className="order-2" st={st} g={g} set={set} onReset={onReset} />
          <Inset className="order-4" g={g} st={st} tab={st.tab} onTab={(tab) => set({ tab })} />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <Working g={g} st={st} />

        <details ref={triesRef} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
          <summary className="cursor-pointer select-none flex items-center justify-between px-4 min-h-[44px] py-2 text-[14px] font-semibold text-gray-800 dark:text-gray-100 rounded-xl">
            Things to Try
            <Chevron />
          </summary>
          <ul className="px-4 pb-1 divide-y divide-gray-100 dark:divide-gray-800">
            {TRIES.map((t, i) => {
              const [tagText, tagCls] = TAGS[t.tag]
              return (
                <li key={i} className="py-3 flex flex-wrap sm:flex-nowrap items-start gap-x-3 gap-y-2">
                  <span className={`flex-none mt-0.5 text-[11.5px] font-semibold rounded-full px-2 py-0.5 ${tagCls}`}>{tagText}</span>
                  <span className="flex-1 min-w-[12rem] text-[14px] text-gray-700 dark:text-gray-200">{t.text}</span>
                  <button
                    type="button"
                    onClick={() => tryIt(t)}
                    className="flex-none ml-auto min-h-[44px] md:[@media(pointer:fine)]:min-h-0 text-[12.5px] font-semibold px-3.5 py-1.5 rounded-full border bg-white border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-500"
                  >
                    Try It
                  </button>
                </li>
              )
            })}
          </ul>
        </details>

        <WhyThird />
      </div>
    </>
  )
}

function Chevron() {
  return (
    <svg viewBox="0 0 16 16" className="pp-chev flex-none w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 6l4 4 4-4" />
    </svg>
  )
}

/** The collapsible calculus panel. */
export function WhyThird() {
  return (
    <details className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
      <summary className="cursor-pointer select-none flex items-center justify-between gap-3 px-4 min-h-[44px] py-2 text-[14px] font-semibold text-gray-800 dark:text-gray-100 rounded-xl">
        Why ⅓? The Calculus Version (Methods &amp; Specialist)
        <Chevron />
      </summary>
      <div className="px-4 pb-4 flex flex-col gap-2 text-[14px] leading-relaxed text-gray-700 dark:text-gray-200">
        <p>
          Slice area at height <i>z</i>: <Katex tex="A(z) = A\left(1 - \frac{z}{h}\right)^2" />.
        </p>
        <div>
          <p>Volume adds up thin slices:</p>
          <Katex
            display
            tex="\begin{aligned} V &= \int_0^h A\left(1 - \frac{z}{h}\right)^2 \, \mathrm{d}z \\ &= A\left[-\frac{h}{3}\left(1 - \frac{z}{h}\right)^3\right]_0^h \\ &= A\left(0 + \frac{h}{3}\right) = \frac{1}{3}Ah \end{aligned}"
          />
        </div>
        <div>
          <p>
            Cone as a solid of revolution: rotate <Katex tex="y = r\left(1 - \frac{x}{h}\right)" /> about the <i>x</i>-axis.
          </p>
          <Katex display tex="V = \pi\int_0^h r^2\left(1 - \frac{x}{h}\right)^2 \, \mathrm{d}x = \frac{1}{3}\pi r^2 h" />
        </div>
        <div>
          <p>
            Without calculus: <i>n</i> inside layers hold
          </p>
          <Katex display tex="\begin{aligned} &\frac{Ah}{n^3}\left(0^2 + 1^2 + \cdots + (n-1)^2\right) \\ &= \frac{Ah(n-1)(2n-1)}{6n^2} \end{aligned}" />
          <p>
            which <Katex tex="\to \frac{1}{3}Ah" /> as <Katex tex="n \to \infty" />.
          </p>
        </div>
      </div>
    </details>
  )
}
