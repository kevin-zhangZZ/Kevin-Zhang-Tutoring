import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import Katex from '../../../components/Katex'
import { reducedMotion, type Stage, type Vec3 } from '../lib/solid3d.ts'
import { LIFT_MS, useLift } from './useLift'
import { Segmented, ShapePicker, SliderRow, TogglePill, liftReason } from './Controls'
import { Inset } from './Inset'
import { STEPS, type ControlId, type Predict, type StepN } from './lessonSteps'
import {
  DEFAULTS,
  DEG,
  HOME_CAM,
  LIMITS,
  PIECES,
  SIDE_CAM,
  STEP5_CAM,
  TRI_PRISM_VOLUME,
  WEIRD_SEED,
  applyPatch,
  computeGeometry,
  cornersOf,
  f1,
  f2,
  frameFor,
  homeFrame,
  snapShift,
  solidName,
  solidWords,
  stackVolume,
  trimNum,
  type PPGeometry,
  type PPState,
} from './model'
import { NoticeBar, exploreNotice, type NoticeTone } from './Notice'
import { buildScene, dissectionScene } from './scene'
import { PPStage, ViewButtons, useMedia } from './Stage'
import type { PPView } from './StepNav'
import { TileGrid, tileFor, type TileId, type TileProps } from './Tiles'
import { WorkingLines } from './Working'

/** A Predict answer: the choice picked, or 'skip'. */
export type PredAnswer = number | 'skip'
type PredMap = Partial<Record<StepN, PredAnswer>>

const U2 = ' u²'
const U3 = ' u³'
const LABEL = 'text-[12.5px] font-semibold text-gray-500 dark:text-gray-400'
const PILL =
  'min-h-[44px] md:[@media(pointer:fine)]:min-h-0 text-[12.5px] font-semibold px-3.5 py-1.5 rounded-full border bg-white border-gray-300 text-gray-700 hover:border-gray-400 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 dark:hover:border-gray-500'
const CARD = 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl'

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
const smooth = (t: number) => t * t * (3 - 2 * t)

/** The state a step starts from. */
function presetState(n: StepN): PPState {
  return applyPatch({ ...DEFAULTS }, { outline: 'blob', layout: 'nested', layerMode: 'inside', slant: false, lift: false, seed: WEIRD_SEED, ...STEPS[n].preset })
}

// ------------------------------------------------------------------------------------------------
// Camera: each step has its own view; the target and zoom frame the solid for that view
// ------------------------------------------------------------------------------------------------

interface Home {
  step: StepN
  yaw: number
  pitch: number
  zoom: number
  target: Vec3
  pan: [number, number]
}
/** Step 5 frames the pieces both together and fully pulled apart. */
const STEP5_FRAME = frameFor(
  PIECES.flatMap((p) => cornersOf(p).flatMap((c) => [c, [c[0] + p.push[0], c[1] + p.push[1], c[2] + p.push[2]]])),
  STEP5_CAM,
)
function homeFor(step: StepN, st: PPState, md: boolean): Home {
  const cam = STEPS[step].cam
  const fr = step === 5 ? STEP5_FRAME : homeFrame(computeGeometry(st), undefined, cam)
  return { step, yaw: cam.yaw, pitch: cam.pitch, zoom: fr.zoom, target: fr.target, pan: [0, md ? 0 : step === 5 ? 0.09 : 0.06] }
}
const sameFrame = (a: Home, b: Home) =>
  a.zoom === b.zoom && a.pan[1] === b.pan[1] && a.target[0] === b.target[0] && a.target[1] === b.target[1] && a.target[2] === b.target[2]

// ------------------------------------------------------------------------------------------------
// State tweens (a step's preset easing in, its entry animation, Pull Apart)
// ------------------------------------------------------------------------------------------------

interface Anim {
  dead: boolean
  raf: number
  fn: (t: number) => void
  /** Cancelling jumps this one to its end (a step's preset) rather than leaving it part-way. */
  finish: boolean
  done?: () => void
}
function useAnims() {
  const list = useRef<Anim[]>([])
  const cancel = useCallback(() => {
    const was = list.current
    list.current = []
    for (const a of was) {
      a.dead = true
      cancelAnimationFrame(a.raf)
      if (a.finish) a.fn(1)
    }
  }, [])
  const animate = useCallback((ms: number, fn: (t: number) => void, done?: () => void, finish = false) => {
    if (reducedMotion() || ms <= 0) {
      fn(1)
      done?.()
      return
    }
    const a: Anim = { dead: false, raf: 0, fn, finish, done }
    list.current.push(a)
    let t0: number | null = null
    const frame = (now: number) => {
      if (a.dead) return
      if (t0 === null) t0 = now
      const t = Math.min(1, (now - t0) / ms)
      a.fn(t)
      if (t < 1) a.raf = requestAnimationFrame(frame)
      else {
        list.current = list.current.filter((x) => x !== a)
        a.done?.()
      }
    }
    a.raf = requestAnimationFrame(frame)
  }, [])
  useEffect(
    () => () => {
      for (const a of list.current) {
        a.dead = true
        cancelAnimationFrame(a.raf)
      }
      list.current = []
    },
    [],
  )
  return { animate, cancel }
}

// ------------------------------------------------------------------------------------------------
// Numbers and words
// ------------------------------------------------------------------------------------------------

const GLYPH: Record<string, string> = { '1/2': '½', '1/3': '⅓', '2/3': '⅔', '1/4': '¼', '3/4': '¾', '1/8': '⅛', '3/8': '⅜', '5/8': '⅝', '7/8': '⅞' }
function gcd(a: number, b: number): number {
  return b ? gcd(b, a % b) : a
}
/** A fraction with denominator ≤ 12 as a glyph or p/q, else 4 dp. */
function exactFrac(v: number): string {
  if (Math.abs(v) < 1e-9) return '0'
  if (Math.abs(v - 1) < 1e-9) return '1'
  for (let q = 2; q <= 12; q++) {
    const p = Math.round(v * q)
    if (p > 0 && Math.abs(v * q - p) < 1e-6) {
      const d = gcd(p, q)
      return GLYPH[p / d + '/' + q / d] || `${p / d}/${q / d}`
    }
  }
  return trimNum(v)
}

interface Dissection {
  pull: number
  why: boolean
  pair: 1 | 2
}

function lessonNotice(step: StepN, g: PPGeometry, st: PPState, d: Dissection, pred: PredMap): { tone: NoticeTone; body: ReactNode } {
  const n = (body: ReactNode, tone: NoticeTone = 'neutral') => ({ tone, body })
  const w = solidWords(g.curvy)
  if (step === 5) {
    if (d.why)
      return n(
        d.pair === 1 ? (
          <>
            Pyramids 1 and 3: the bottom and top triangles are identical, and both are <i>h</i> = 6.0 tall.
          </>
        ) : (
          <>
            Pyramids 2 and 3: both have apex <i>F</i>, and their bases <i>ABE</i> and <i>ADE</i> are halves of the same rectangle.
          </>
        ),
      )
    if (d.pull > 0) return n(<>Each piece holds 27.0 u³, exactly ⅓ of the prism’s 81.0 u³.</>, 'good')
    return n(
      <>
        Two flat cuts, through <i>A</i>, <i>B</i>, <i>F</i> and through <i>A</i>, <i>E</i>, <i>F</i>, split the prism into three triangular
        pyramids.
      </>,
    )
  }
  if (step === 1 && st.solid === 'prism') {
    if (g.s !== 0)
      return n(
        <>
          The slanted edge is now {f2(g.edgeL)} long, but the height is still {f1(g.h)}. <i>V</i> = <i>Ah</i> uses the height.
        </>,
      )
    if (g.circle)
      return n(
        <>
          A cylinder is a prism with a circular base: <i>V</i> = π<i>r</i>²<i>h</i> = π × 2.5² × {f1(g.h)} = {f1(g.Vpri) + U3}.
        </>,
      )
  }
  // Step 2 is about lengths. The usual halfway notice ("a quarter of the area") would give away
  // step 3's question, so this step talks about k instead.
  if (step === 2 && !g.atBase && !g.atApex) {
    return n(
      <>
        The slice is <i>h</i> − <i>z</i> = {f1(g.h - g.z)} below the apex and the base is <i>h</i> = {f1(g.h)} below it, so <i>k</i> ={' '}
        {f1(g.h - g.z)}/{f1(g.h)} = {f2(g.k)}. Every length in the slice is {f2(g.k)} × the matching length in the base.
      </>,
    )
  }
  if (step === 3 && pred[3] === undefined) {
    return n(<>{g.half ? 'The orange slice is halfway up, so it’s half as wide as the base. ' : ''}Make your prediction, then count the squares in the inset.</>)
  }
  if (step === 3 && g.lifted) {
    return n(
      <>
        The top piece is a mini {w.P} scaled by <i>k</i> = {trimNum(g.k)}, so its volume is <i>k</i>³ = {exactFrac(g.k * g.k * g.k)} of the
        whole: {f1(g.topV) + U3} of {f1(g.Vpyr) + U3}.
      </>,
    )
  }
  return exploreNotice(g, st)
}

// ------------------------------------------------------------------------------------------------
// Lesson
// ------------------------------------------------------------------------------------------------

export default function Lesson({
  step,
  pred,
  onPredict,
  onGo,
  onResetStep,
}: {
  step: StepN
  pred: PredMap
  onPredict: (n: StepN, a: PredAnswer) => void
  onGo: (v: PPView) => void
  onResetStep: () => void
}) {
  const conf = STEPS[step]
  const [st, setSt] = useState<PPState>(() => presetState(step))
  const [diss, setDiss] = useState<Dissection>({ pull: 0, why: false, pair: 1 })
  const stRef = useRef(st)
  stRef.current = st
  const dissRef = useRef(diss)
  dissRef.current = diss
  const [stage, setStage] = useState<Stage | null>(null)
  const md = useMedia('(min-width: 768px)')
  const liftT = useLift(st.lift ? 1 : 0)
  const g = useMemo(() => computeGeometry(st, liftT), [st, liftT])
  const { animate, cancel } = useAnims()
  const tweening = useRef(false)
  /** The slice's area stays "?" in steps 2 and 3 until step 3's question is answered. */
  const hideSlice = (step === 2 || step === 3) && pred[3] === undefined

  const cancelAnims = useCallback(() => {
    cancel()
    tweening.current = false
  }, [cancel])

  /** A control changed something: stop any animation and apply the change. */
  const set = useCallback(
    (patch: Partial<PPState>) => {
      cancelAnims()
      setSt((prev) => applyPatch(prev, patch))
    },
    [cancelAnims],
  )

  // ---- Step changes: ease into the step's preset, then play its entry animation ----
  const applyStep = useCallback(
    (n: StepN, instant: boolean) => {
      cancelAnims()
      const c = STEPS[n]
      const start: PPState = { ...presetState(n), ...(c.entry?.from ?? {}) }
      if (n === 5) setDiss({ pull: 0, why: false, pair: 1 })
      const runEntry = () => {
        tweening.current = false
        const e = c.entry
        if (e) animate(e.ms, (t) => setSt((prev) => ({ ...prev, ...e.fn(t) })))
      }
      if (instant || reducedMotion()) {
        setSt(start)
        runEntry()
        return
      }
      const cur = stRef.current
      const from = { h: cur.h, s: cur.s, z: Math.min(cur.z, cur.h) }
      tweening.current = true
      setSt({ ...start, ...from })
      animate(
        400,
        (t) => {
          const e = easeOut(t)
          const h = t >= 1 ? start.h : lerp(from.h, start.h, e)
          setSt((prev) => ({ ...prev, h, s: t >= 1 ? start.s : lerp(from.s, start.s, e), z: Math.min(t >= 1 ? start.z : lerp(from.z, start.z, e), h) }))
        },
        runEntry,
        true,
      )
    },
    [animate, cancelAnims],
  )
  const firstRef = useRef(true)
  useEffect(() => {
    applyStep(step, firstRef.current)
    firstRef.current = false
  }, [step, applyStep])

  // ---- Camera: the step's view on a step change; afterwards the target and zoom follow the solid
  // (h and the apex slider move it instantly, clicks ease it) ----
  const homeRef = useRef<Home | null>(null)
  const prevRef = useRef(st)
  const stageRef = useRef<Stage | null>(null)
  useEffect(() => {
    const prev = prevRef.current
    prevRef.current = st
    if (!stage) return
    const had = homeRef.current
    if (stageRef.current !== stage || !had) {
      stageRef.current = stage
      const want = homeFor(step, presetState(step), md)
      homeRef.current = want
      stage.setHome(want)
      stage.resetCamera({ animate: false })
      return
    }
    if (had.step !== step) {
      const want = homeFor(step, presetState(step), md)
      homeRef.current = want
      stage.setHome(want)
      stage.setCamera(want, { animate: 400 })
      return
    }
    if (tweening.current) return
    const want = homeFor(step, st, md)
    if (sameFrame(want, had)) return
    homeRef.current = want
    stage.setHome(want)
    const sliding = prev.h !== st.h || prev.s !== st.s
    stage.setCamera(
      { target: want.target, pan: want.pan, zoom: stage.getCamera().zoom * (want.zoom / had.zoom) },
      { animate: sliding ? false : st.lift !== prev.lift ? LIFT_MS : true },
    )
  }, [stage, step, st, md])

  // Step 2's 3D View / Side View button follows the camera
  const [sideOn, setSideOn] = useState(false)
  useEffect(() => {
    if (!stage) return
    const sync = () => setSideOn(stage.getCamera().pitch < 10 * DEG)
    sync()
    return stage.on('camera', sync)
  }, [stage])

  // ---- Step 5 ----
  const setPull = (v: number) => {
    cancelAnims()
    setDiss((d) => ({ ...d, pull: v }))
  }
  const playPull = () => {
    cancelAnims()
    const from = dissRef.current.pull
    const to = from >= 100 ? 0 : 100
    animate((1200 * Math.abs(to - from)) / 100, (t) => setDiss((d) => ({ ...d, pull: t >= 1 ? to : lerp(from, to, smooth(t)) })))
  }

  // ---- Scene ----
  const sceneSt = useMemo(() => ({ ...st, slant: st.slant || (step === 1 && st.solid === 'prism' && st.s !== 0) }), [st, step])
  const scene = useCallback(
    (stg: Stage, heavy: boolean) =>
      step === 5 ? dissectionScene({ pull: diss.pull, pair: diss.why ? diss.pair : null }) : buildScene(g, sceneSt, stg, { heavy, bracket: step === 2 }),
    [g, sceneSt, step, diss],
  )

  // ---- Words for the stage ----
  const name = step === 5 ? 'Triangular Prism Cut Into Three Pyramids' : solidName(st)
  const Vshown = st.solid === 'prism' ? g.Vpri : g.Vpyr
  const sliceShown = st.solid === 'prism' ? g.Av : g.sliceA
  const label =
    step === 5
      ? `Triangular prism of volume 81.0 cut into three pyramids of 27.0 each, pulled apart ${Math.round(diss.pull)} percent. Drag or use the arrow keys to turn it.`
      : `${name.charAt(0) + name.slice(1).toLowerCase()}, base area ${f1(g.A)}, height ${f1(g.h)}, sliced at ${f1(g.z)}${
          hideSlice ? '' : `, slice area ${f1(sliceShown)}`
        }, volume ${f1(Vshown)}. Drag or use the arrow keys to turn it.`
  const notice = lessonNotice(step, g, st, diss, pred)
  const [live, setLive] = useState('')
  const liveText =
    step === 5
      ? `Pulled apart ${Math.round(diss.pull)} percent. Each pyramid 27.0 cubic units.`
      : `${hideSlice ? '' : `Slice area ${f1(sliceShown)} square units. `}Volume ${f1(Vshown)} cubic units.`
  useEffect(() => {
    const id = window.setTimeout(() => setLive(liveText), 500)
    return () => clearTimeout(id)
  }, [liveText])

  // ---- Desktop: keep the stage in view beside a long lesson card (when the column fits) ----
  const leftRef = useRef<HTMLDivElement>(null)
  const [sticky, setSticky] = useState(false)
  useEffect(() => {
    const el = leftRef.current
    if (!el) return
    const check = () => setSticky(window.matchMedia('(min-width: 1024px)').matches && el.getBoundingClientRect().height + 32 <= window.innerHeight)
    check()
    const ro = new ResizeObserver(check)
    ro.observe(el)
    window.addEventListener('resize', check)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', check)
    }
  }, [])

  const highlight: TileId[] = g.lifted && step !== 5 ? [...conf.tiles, 'L'] : conf.tiles

  return (
    <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-start">
      <div ref={leftRef} className={`contents lg:flex lg:flex-col lg:gap-4 lg:min-w-0 ${sticky ? 'lg:sticky lg:top-4' : ''}`}>
        <section className={`order-1 scroll-mt-4 ${CARD} relative overflow-hidden`} aria-label="3D stage">
          <PPStage
            scene={scene}
            canGoHeavy={g.n > 0}
            label={label}
            onStage={setStage}
            reserve={330}
            topRight={<ViewButtons stage={stage} />}
            topLeft={
              <>
                <div>{name}</div>
                {step !== 5 && (
                  <div className="md:hidden text-[12px] font-normal tabular-nums text-gray-600 dark:text-gray-300">
                    Slice {hideSlice ? '?' : f1(sliceShown) + U2} · <i>V</i> {f1(Vshown) + U3}
                  </div>
                )}
              </>
            }
            bottomRight={<Legend step={step} g={g} st={st} />}
          />
          <NoticeBar tone={notice.tone}>{notice.body}</NoticeBar>
          <div className="sr-only" aria-live="polite">
            {live}
          </div>
        </section>

        <TileGrid className="order-3" tiles={lessonTiles(step, g, st, hideSlice, highlight)} />
      </div>

      <div className="contents lg:flex lg:flex-col lg:gap-4 lg:min-w-0">
        <section className={`order-2 ${CARD} p-4 sm:p-5 flex flex-col gap-3.5 min-w-0`} aria-labelledby="pp-lesson-title">
          <div>
            <div className="text-[12.5px] font-semibold text-blue-700 dark:text-blue-300">Step {step} of 6</div>
            <h2 id="pp-lesson-title" tabIndex={-1} className="mt-0.5 text-lg font-semibold text-gray-900 dark:text-white outline-none">
              {conf.title}
            </h2>
          </div>
          {conf.predict && conf.predictFirst && <PredictCard step={step} p={conf.predict} answer={pred[step]} onAnswer={(a) => onPredict(step, a)} />}
          <p className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300">{conf.body}</p>
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 px-3.5 py-2.5 text-[13.5px] leading-relaxed text-gray-800 dark:text-gray-200">
            <span className="font-semibold text-blue-800 dark:text-blue-200">Try This</span> {conf.tryThis}
          </div>
          {conf.predict && !conf.predictFirst && <PredictCard step={step} p={conf.predict} answer={pred[step]} onAnswer={(a) => onPredict(step, a)} />}

          <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
            <h3 className={`${LABEL} mb-2`}>Controls</h3>
            <div className="flex flex-col gap-3">
              {conf.controls.map((c) => (
                <StepControl
                  key={c}
                  id={c}
                  step={step}
                  st={st}
                  g={g}
                  set={set}
                  diss={diss}
                  setPull={setPull}
                  playPull={playPull}
                  setWhy={(why) => setDiss((d) => ({ ...d, why }))}
                  sideOn={sideOn}
                  onView3d={() => stage?.setCamera(sideOn ? { yaw: HOME_CAM.yaw, pitch: HOME_CAM.pitch } : { yaw: SIDE_CAM.yaw, pitch: SIDE_CAM.pitch }, { animate: true })}
                />
              ))}
            </div>
          </div>

          {conf.table && <LayerTable g={g} st={st} />}
          {conf.table && <MethodsDetails />}

          <div>
            <button
              type="button"
              onClick={() => {
                applyStep(step, false)
                onResetStep()
              }}
              className="text-[12.5px] font-semibold text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 underline underline-offset-2 inline-flex items-center min-h-[44px] md:[@media(pointer:fine)]:min-h-[32px]"
            >
              Reset Step
            </button>
          </div>
          <div className="hidden md:flex items-center justify-between gap-2">
            <button
              type="button"
              disabled={step === 1}
              onClick={() => onGo((step - 1) as StepN)}
              className="rounded-full bg-gray-100 dark:bg-gray-800 px-3.5 py-2 text-[13px] font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ‹ Back
            </button>
            <button
              type="button"
              onClick={() => onGo(step === 6 ? 'explore' : ((step + 1) as StepN))}
              className="rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 px-4 py-2 text-[13px] font-semibold hover:bg-gray-700 dark:hover:bg-gray-200"
            >
              {step === 6 ? 'Explore ›' : `Next: ${STEPS[(step + 1) as StepN].short} ›`}
            </button>
          </div>
        </section>

        {conf.inset === 'why' ? (
          <WhyEqual className="order-4" d={diss} onPair={(pair) => setDiss((d) => ({ ...d, why: true, pair }))} />
        ) : (
          <Inset
            className={`order-4 ${conf.insetRing ? 'ring-2 ring-blue-300 dark:ring-blue-800' : ''}`}
            g={g}
            st={st}
            tab={conf.inset}
            title={conf.inset === 'graph' ? 'Area Graph' : 'Slice vs Base'}
            strongGrid={conf.gridStrong}
            hideArea={hideSlice}
            footer={
              <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                <h4 className={LABEL}>Working</h4>
                <WorkingLines g={g} st={st} hiddenSlice={hideSlice ? (step === 3 ? 'answer after you predict' : 'comes up in Step 3') : undefined} />
              </div>
            }
          />
        )}
      </div>
    </div>
  )
}

// ------------------------------------------------------------------------------------------------
// Tiles
// ------------------------------------------------------------------------------------------------

function Swatch({ cls }: { cls: string }) {
  return <span className={`inline-block w-2.5 h-2.5 rounded-sm mr-1.5 align-[-1px] ${cls}`} />
}
const vol = (v: string) => (
  <>
    {v}
    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-0.5">u³</span>
  </>
)

function lessonTiles(step: StepN, g: PPGeometry, st: PPState, hideSlice: boolean, highlight: TileId[]): (TileProps & { key: string })[] {
  if (step === 5) {
    const third = f1(TRI_PRISM_VOLUME / 3)
    return [
      {
        key: 'A',
        label: (
          <>
            <Swatch cls="sw-prism" />
            Prism <i>Ah</i>
          </>
        ),
        value: vol(f1(TRI_PRISM_VOLUME)),
        sub: 'Base 13.5 u² × height 6.0',
        highlight: true,
      },
      ...([1, 2, 3] as const).map((n) => ({
        key: 'P' + n,
        label: (
          <>
            <Swatch cls={`sw-p${n}`} />
            Pyramid {n}
          </>
        ),
        value: vol(third),
        sub: '⅓ of the prism',
        highlight: true,
      })),
    ]
  }
  return (['A', 'S', 'V', 'L'] as TileId[]).map((id) => {
    const t = { ...tileFor(id, g, st) }
    if (id === 'S' && hideSlice) {
      t.value = '?'
      t.sub = step === 3 ? 'Make your prediction first' : 'Comes up in Step 3'
    }
    if (id === 'L' && !g.n && !g.lifted) t.sub = step < 4 ? 'Comes up in Step 4' : 'Back in Step 4 or Explore'
    const on = highlight.includes(id)
    return { key: id, ...t, highlight: on, dim: !on }
  })
}

// ------------------------------------------------------------------------------------------------
// Legend
// ------------------------------------------------------------------------------------------------

function Legend({ step, g, st }: { step: StepN; g: PPGeometry; st: PPState }) {
  const item = (sw: ReactNode, text: string) => (
    <span key={text} className="inline-flex items-center gap-1.5">
      {sw}
      {text}
    </span>
  )
  const box = (cls: string) => <span className={`inline-block w-2.5 h-2.5 rounded-sm ${cls}`} />
  if (step === 5) return <>{([1, 2, 3] as const).map((n) => item(box(`sw-p${n}`), `Pyramid ${n}`))}</>
  const w = solidWords(g.curvy)
  const edge = step === 1 && st.solid === 'prism' && st.s !== 0
  return (
    <>
      {g.showPyr && item(box('sw-pyr'), w.Pc)}
      {g.n === 0 && item(box('sw-slice'), 'Slice')}
      {g.showPri && item(box(st.solid === 'both' && !g.side ? 'sw-prism' : 'sw-prism-solid'), w.Qc)}
      {g.n > 0 && item(box('sw-layer'), 'Layers')}
      {(st.slant || edge) && item(<span className="inline-block w-3 h-0.5 rounded sw-slant" />, st.solid === 'prism' ? 'Slanted Edge' : 'Slant Length')}
    </>
  )
}

// ------------------------------------------------------------------------------------------------
// Predict
// ------------------------------------------------------------------------------------------------

function Check() {
  return (
    <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  )
}

function PredictCard({ step, p, answer, onAnswer }: { step: StepN; p: Predict; answer: PredAnswer | undefined; onAnswer: (a: PredAnswer) => void }) {
  const answered = answer !== undefined
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([])
  const qId = `pp-predict-${step}`
  const skip = () => {
    onAnswer('skip')
    // The Skip link goes away: keep focus in the card, on the right answer
    window.setTimeout(() => btnRefs.current[p.correct]?.focus(), 0)
  }
  let fb: ReactNode = null
  if (answered) {
    if (answer === p.correct)
      fb = (
        <>
          <span className="font-semibold text-emerald-700 dark:text-emerald-300">{p.lead}</span> {p.exp}
        </>
      )
    else if (answer === 'skip')
      fb = (
        <>
          <span className="font-semibold">Answer: {p.choices[p.correct]}.</span> {p.exp}
        </>
      )
    else
      fb = (
        <>
          {p.fb[answer]}
          <span className="block mt-1">
            <span className="font-semibold">Answer: {p.choices[p.correct]}.</span> {p.exp}
          </span>
        </>
      )
  }
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 px-3.5 py-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[12.5px] font-semibold text-violet-700 dark:text-violet-300">Predict</span>
        {!answered && (
          <button
            type="button"
            onClick={skip}
            className="text-[12.5px] font-semibold text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 underline underline-offset-2 inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-2 -my-3 -mr-2"
          >
            Skip
          </button>
        )}
      </div>
      <p id={qId} className="mt-1 text-[14px] font-semibold text-gray-900 dark:text-white">
        {p.q}
      </p>
      <div className="mt-2.5 flex flex-wrap gap-2" role="group" aria-labelledby={qId}>
        {p.choices.map((c, i) => {
          let cls = 'bg-white border-gray-300 text-gray-800 hover:border-gray-400 dark:bg-gray-900 dark:border-gray-600 dark:text-gray-100'
          if (answered) {
            if (i === p.correct) cls = 'bg-emerald-50 border-emerald-500 text-emerald-800 dark:bg-emerald-950/50 dark:border-emerald-500 dark:text-emerald-200'
            else if (i === answer) cls = 'bg-amber-50 border-amber-400 text-amber-900 dark:bg-amber-950/50 dark:border-amber-500 dark:text-amber-200'
            else cls = 'bg-white border-gray-200 text-gray-400 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-500'
          }
          return (
            <button
              key={i}
              ref={(el) => (btnRefs.current[i] = el)}
              type="button"
              aria-pressed={answer === i}
              aria-disabled={answered || undefined}
              onClick={() => !answered && onAnswer(i)}
              className={`h-11 min-w-[44px] justify-center inline-flex items-center gap-1.5 rounded-full border px-4 font-semibold text-[14px] ${answered ? 'cursor-default' : ''} ${cls}`}
            >
              {answered && i === p.correct && <Check />}
              {c}
            </button>
          )
        })}
      </div>
      <div className="text-[13.5px] leading-relaxed text-gray-700 dark:text-gray-300" aria-live="polite">
        {fb && <div className="mt-2.5">{fb}</div>}
      </div>
    </div>
  )
}

// ------------------------------------------------------------------------------------------------
// Each step's controls
// ------------------------------------------------------------------------------------------------

function StepControl({
  id,
  step,
  st,
  g,
  set,
  diss,
  setPull,
  playPull,
  setWhy,
  sideOn,
  onView3d,
}: {
  id: ControlId
  step: StepN
  st: PPState
  g: PPGeometry
  set: (patch: Partial<PPState>) => void
  diss: Dissection
  setPull: (v: number) => void
  playPull: () => void
  setWhy: (on: boolean) => void
  sideOn: boolean
  onView3d: () => void
}) {
  const curvy = st.shape === 'curvy'
  switch (id) {
    case 'shapes4':
      return <ShapePicker st={st} set={set} shapes={['square', 'triangle', 'hexagon', 'circle']} />
    case 'shapes5':
      return <ShapePicker st={st} set={set} />
    case 'z':
      return (
        <SliderRow
          label={
            <>
              Slice Height <i>z</i>
            </>
          }
          value={st.z}
          display={f1(st.z)}
          min={0}
          max={st.h}
          step={0.1}
          onChange={(v) => set({ z: v })}
        />
      )
    case 's':
      return (
        <SliderRow
          label={step === 1 || st.solid === 'prism' ? 'Shear' : st.solid === 'pyramid' ? 'Slide Apex' : 'Slide Apex / Shear'}
          value={st.s}
          display={f1(st.s)}
          min={-LIMITS.sMax}
          max={LIMITS.sMax}
          step={0.1}
          onChange={(v) => set({ s: snapShift(v) })}
        />
      )
    case 'h':
      return (
        <SliderRow
          label={
            <>
              Height <i>h</i>
            </>
          }
          value={st.h}
          display={f1(st.h)}
          min={LIMITS.hMin}
          max={LIMITS.hMax}
          step={0.1}
          onChange={(v) => set({ h: v })}
        />
      )
    case 'solid':
      return <SolidPicker st={st} set={set} curvy={curvy} />
    case 'view3d':
      return (
        <div>
          <button type="button" onClick={onView3d} className={PILL}>
            {sideOn ? '3D View' : 'Side View'}
          </button>
        </div>
      )
    case 'liftOff':
      return <LiftToggle st={st} g={g} set={set} />
    case 'layers':
      return <SliderRow label="Layers" value={st.layers} display={String(st.layers)} min={1} max={LIMITS.layersMax} step={1} onChange={(v) => set({ layers: Math.round(v) })} />
    case 'lmode':
      return (
        <Segmented
          label="Layer position"
          value={st.layerMode}
          options={[
            { value: 'inside', label: 'Inside' },
            { value: 'outside', label: 'Outside' },
          ]}
          onChange={(v) => set({ layerMode: v })}
        />
      )
    case 'slant':
      return (
        <div>
          <TogglePill on={st.slant} onClick={() => set({ slant: !st.slant })}>
            Slant Length
          </TogglePill>
        </div>
      )
    case 'pull':
      return (
        <>
          <SliderRow label="Pull Apart" value={diss.pull} display={`${Math.round(diss.pull)}%`} min={0} max={100} step={1} onChange={setPull} />
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={playPull}
              className="inline-flex items-center gap-1.5 min-h-[44px] md:[@media(pointer:fine)]:min-h-0 md:[@media(pointer:fine)]:h-9 px-3.5 rounded-full bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 text-[13px] font-semibold"
            >
              <svg viewBox="0 0 12 12" className="w-3 h-3" aria-hidden="true">
                <path d="M3 1.5v9l7.5-4.5z" fill="currentColor" />
              </svg>
              {diss.pull >= 100 ? 'Put Back' : 'Pull Apart'}
            </button>
            <TogglePill on={diss.why} onClick={() => setWhy(!diss.why)}>
              Why Equal?
            </TogglePill>
          </div>
        </>
      )
  }
}

function SolidPicker({ st, set, curvy }: { st: PPState; set: (patch: Partial<PPState>) => void; curvy: boolean }) {
  return (
    <div>
      <div className={`${LABEL} mb-1.5`}>Solid</div>
      <Segmented
        label="Solid"
        value={st.solid}
        options={[
          { value: 'pyramid', label: curvy ? 'Cone' : 'Pyramid' },
          { value: 'prism', label: curvy ? 'Cylinder' : 'Prism' },
          { value: 'both', label: 'Both' },
        ]}
        onChange={(v) => set({ solid: v })}
      />
      {st.solid === 'both' && (
        <Segmented
          label="Both layout"
          className="mt-2 max-w-[16rem]"
          small
          value={st.layout}
          options={[
            { value: 'nested', label: 'Nested' },
            { value: 'side', label: 'Side by Side' },
          ]}
          onChange={(v) => set({ layout: v })}
        />
      )}
    </div>
  )
}

function LiftToggle({ st, g, set }: { st: PPState; g: PPGeometry; set: (patch: Partial<PPState>) => void }) {
  const reason = liftReason(g, st)
  const reasonId = 'pp-lift-reason'
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <TogglePill on={st.lift && g.liftAllowed} disabled={!g.liftAllowed} describedBy={reason ? reasonId : undefined} onClick={() => set({ lift: !st.lift })}>
          Lift Off Top
        </TogglePill>
        <span className="rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 text-[11.5px] font-semibold">Extension</span>
      </div>
      {reason && (
        <p id={reasonId} className="mt-1.5 text-[12px] text-gray-500 dark:text-gray-400">
          {reason}
        </p>
      )}
    </div>
  )
}

// ------------------------------------------------------------------------------------------------
// Step 4: the layer sums, and the calculus for Methods & Specialist
// ------------------------------------------------------------------------------------------------

function LayerTable({ g, st }: { g: PPGeometry; st: PPState }) {
  const n = st.layers
  const ns = [1, 2, 5, 10, 30]
  const rows = n > 0 && !ns.includes(n) ? [...ns, n].sort((a, b) => a - b) : ns
  const cell = (cur: boolean, mode: 'inside' | 'outside') =>
    cur && st.layerMode === mode ? ' underline decoration-2 underline-offset-2 decoration-orange-500' : ''
  return (
    <div>
      <table className="w-full text-[12.5px] tabular-nums">
        <caption className="sr-only">Layer stack volumes</caption>
        <thead>
          <tr className="text-left text-gray-500 dark:text-gray-400">
            <th scope="col" className="font-semibold py-1 pl-2">
              Layers
            </th>
            <th scope="col" className="font-semibold py-1 text-right">
              Inside
            </th>
            <th scope="col" className="font-semibold py-1 pr-2 text-right">
              Outside
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const cur = r === n
            return (
              <tr
                key={r}
                aria-current={cur ? 'true' : undefined}
                className={`border-t border-gray-100 dark:border-gray-800 ${
                  cur ? 'bg-blue-50 dark:bg-blue-950/50 font-semibold text-blue-900 dark:text-blue-100' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <td className="py-1 pl-2">
                  {r}
                  {cur && <span className="font-normal text-[11px] text-blue-700 dark:text-blue-300"> (now)</span>}
                </td>
                <td className={'py-1 text-right' + cell(cur, 'inside')}>{f1(stackVolume(g.Av, g.h, r, 'inside'))}</td>
                <td className={'py-1 pr-2 text-right' + cell(cur, 'outside')}>{f1(stackVolume(g.Av, g.h, r, 'outside'))}</td>
              </tr>
            )
          })}
          <tr className="border-t border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300">
            <td className="py-1 pl-2">∞</td>
            <td className="py-1 text-right">{f1(g.Vpyr)}</td>
            <td className="py-1 pr-2 text-right">{f1(g.Vpyr)}</td>
          </tr>
        </tbody>
      </table>
      <p className="mt-1 text-[12px] text-gray-500 dark:text-gray-400">
        Volumes in u³ for this pyramid (<i>A</i> = {trimNum(g.Av, 2)}, <i>h</i> = {trimNum(g.h, 1)}).
      </p>
    </div>
  )
}

function MethodsDetails() {
  return (
    <details className="rounded-lg border border-gray-200 dark:border-gray-700">
      <summary className="cursor-pointer select-none flex items-center gap-1.5 px-3.5 min-h-[44px] text-[13px] font-semibold text-gray-800 dark:text-gray-200 rounded-lg">
        <svg viewBox="0 0 12 12" className="pp-chev-r w-3 h-3" aria-hidden="true">
          <path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
        For Methods &amp; Specialist
      </summary>
      <div className="px-3.5 pb-3 text-[13px] leading-relaxed text-gray-700 dark:text-gray-300 flex flex-col gap-2">
        <p>
          The slices have area <Katex tex="A\left(1 - \tfrac{z}{h}\right)^2" />, so adding them up is an integral:
        </p>
        <Katex display tex="V = \int_0^h A\left(1 - \frac{z}{h}\right)^2 \mathrm{d}z" />
        <Katex display tex="= A\left[-\frac{h}{3}\left(1 - \frac{z}{h}\right)^3\right]_0^h = \frac{1}{3}Ah" />
        <p>
          The inside stack is a right-endpoint sum. Layer <i>m</i> from the top has area <Katex tex="A\left(\tfrac{m}{n}\right)^2" /> and thickness{' '}
          <Katex tex="\tfrac{h}{n}" />, so with <Katex tex="\textstyle\sum m^2 = \tfrac{n(n+1)(2n+1)}{6}" />:
        </p>
        <Katex display tex="V_\text{in} = \frac{Ah}{n^3}\sum_{m=0}^{n-1} m^2 = \frac{Ah(n-1)(2n-1)}{6n^2}" />
        <Katex display tex="V_\text{out} = \frac{Ah}{n^3}\sum_{m=1}^{n} m^2 = \frac{Ah(n+1)(2n+1)}{6n^2}" />
        <p>
          Both tend to ⅓<i>Ah</i> as <i>n</i> → ∞, and <Katex tex="V_\text{out} - V_\text{in} = \tfrac{Ah}{n}" /> exactly.
        </p>
      </div>
    </details>
  )
}

// ------------------------------------------------------------------------------------------------
// Step 5: Why Equal?
// ------------------------------------------------------------------------------------------------

function WhyEqual({ d, onPair, className = '' }: { d: Dissection; onPair: (p: 1 | 2) => void; className?: string }) {
  const btn = (n: 1 | 2, label: string) => {
    const on = d.why && d.pair === n
    return (
      <button
        type="button"
        aria-pressed={on}
        onClick={() => onPair(n)}
        className={`min-h-[44px] md:[@media(pointer:fine)]:min-h-0 md:[@media(pointer:fine)]:h-9 px-3.5 rounded-full border text-[13px] font-semibold ${
          on
            ? 'bg-blue-600 border-blue-600 text-white dark:bg-blue-500 dark:border-blue-500'
            : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200'
        }`}
      >
        {label}
      </button>
    )
  }
  return (
    <section className={`${CARD} p-4 ${className}`} aria-labelledby="pp-why-equal">
      <h3 id="pp-why-equal" className="text-[14px] font-semibold text-gray-900 dark:text-white">
        Why Equal?
      </h3>
      <div className="mt-2 flex flex-wrap gap-2">
        {btn(1, 'Pair 1 and 3')}
        {btn(2, 'Pair 2 and 3')}
      </div>
      <div className="mt-3 text-[13.5px] leading-relaxed text-gray-700 dark:text-gray-300" aria-live="polite">
        {!d.why ? (
          <p className="text-[13px] text-gray-500 dark:text-gray-400">Pick a pair to light up the faces that matter.</p>
        ) : d.pair === 1 ? (
          <p>
            Their bases are the bottom and top triangles of the prism (identical), and both have height <i>h</i>. Same base, same height, same
            volume.
          </p>
        ) : (
          <p>
            Both have their apex at <i>F</i>, and their bases <i>ABE</i> and <i>ADE</i> are the two halves of the same rectangular face. Same base
            area, same height, same volume.
          </p>
        )}
      </div>
      <p className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 text-[13px] leading-relaxed text-gray-600 dark:text-gray-400">
        So 1 = 3 and 2 = 3: all three are equal. Any prism can be cut into triangular prisms, so this works for every base.
      </p>
    </section>
  )
}
