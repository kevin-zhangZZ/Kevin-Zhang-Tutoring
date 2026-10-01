import { useEffect, useRef, useState, type ReactNode } from 'react'
import { createStage, type Scene, type Stage } from '../lib/solid3d.ts'
import { DEFAULTS, DEG, HOME_CAM, SIDE_CAM, STAGE_FIT, TOP_CAM, computeGeometry, homeFrame, type CamPreset } from './model'

/** Live matchMedia. */
export function useMedia(query: string): boolean {
  const [on, setOn] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const fn = () => setOn(mq.matches)
    fn()
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [query])
  return on
}

const MD = '(min-width: 768px)'
const KEY_HINT = 'Arrow keys rotate · + and − zoom · 0 resets'

/** Phones: square, at most 360 px and 60% of the screen height, so the page can still be swiped
 *  beside and below it. md+: as tall as the window allows (less `reserve` px), 280–440 px. */
function sizeStage(stage: Stage, reserve: number) {
  const o = stage.options
  if (window.matchMedia(MD).matches) {
    o.height = Math.max(280, Math.min(440, window.innerHeight - reserve))
  } else {
    o.height = undefined
    o.aspect = 1
    o.minHeight = 240
    o.maxHeight = Math.max(240, Math.min(360, Math.round(window.innerHeight * 0.6)))
  }
  stage.resize()
}

interface PPStageProps {
  /** Draws the scene; called at draw time with the live stage. `heavy` = a slow frame during a
   *  drag, so draw less (e.g. only layer caps) until pointer-up. Change its identity to redraw. */
  scene: (stage: Stage, heavy: boolean) => Scene
  /** May a slow frame switch heavy mode on (e.g. only while layers are shown)? */
  canGoHeavy?: boolean
  /** aria-label: what the picture shows. */
  label: string
  /** Called with the stage once it exists (and null on unmount). */
  onStage?: (stage: Stage | null) => void
  /** Top-left overlay (the name chip). */
  topLeft?: ReactNode
  /** Top-right overlay (view buttons). */
  topRight?: ReactNode
  /** Bottom-right overlay (legend). */
  bottomRight?: ReactNode
  /** md+: window height kept free below the stage (default 96). The Lesson keeps more, so its
   *  sticky stage column (stage, notice and tiles) fits on screen. */
  reserve?: number
}

/** The 3D stage: an imperative solid3d engine in a container; React state drives what it draws.
 *  Orthographic, drag to rotate, Ctrl/⌘ + wheel or pinch to zoom, keys when focused. */
export function PPStage({ scene, canGoHeavy = false, label, onStage, topLeft, topRight, bottomRight, reserve = 96 }: PPStageProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<Stage | null>(null)
  const sceneRef = useRef(scene)
  const heavyRef = useRef(false)
  const canHeavyRef = useRef(canGoHeavy)
  const onStageRef = useRef(onStage)
  sceneRef.current = scene
  canHeavyRef.current = canGoHeavy
  onStageRef.current = onStage
  const reserveRef = useRef(reserve)
  reserveRef.current = reserve
  const fine = useMedia('(pointer: fine)')
  const [keyHint, setKeyHint] = useState(false)
  const [flash, setFlash] = useState(false)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const stage = createStage(host, {
      fit: STAGE_FIT,
      aspect: 1,
      minHeight: 240,
      maxHeight: 360,
      camera: { ...HOME_CAM, ...homeFrame(computeGeometry(DEFAULTS)), projection: 'orthographic' },
      minZoom: 0.5,
      maxZoom: 3,
      pitchRange: [0, 89 * DEG],
      doubleTapReset: 'background',
      roleDescription: '3D diagram',
    })
    stageRef.current = stage
    sizeStage(stage, reserveRef.current)
    const svg = stage.svg

    // Slow frames while dragging: draw less until pointer-up
    let dragging = false
    const onDown = () => {
      dragging = true
    }
    const onUp = () => {
      dragging = false
      if (heavyRef.current) {
        heavyRef.current = false
        stage.redraw()
      }
    }
    svg.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    const offRender = stage.on('render', (s) => {
      if (dragging && !heavyRef.current && s.ms > 24 && canHeavyRef.current) {
        heavyRef.current = true
        stage.redraw()
      }
    })

    // Hints: keys while focused from the keyboard; flash "Ctrl + scroll to zoom" when a plain wheel
    // scrolls past the stage
    const onFocus = () => setKeyHint(svg.matches(':focus-visible'))
    const onBlur = () => setKeyHint(false)
    const onKeyUp = () => setKeyHint(true)
    svg.addEventListener('focus', onFocus)
    svg.addEventListener('blur', onBlur)
    svg.addEventListener('keyup', onKeyUp)
    let flashTimer = 0
    const offWheel = stage.on('wheelIgnored', () => {
      setFlash(true)
      clearTimeout(flashTimer)
      flashTimer = window.setTimeout(() => setFlash(false), 1400)
    })

    const onResize = () => sizeStage(stage, reserveRef.current)
    window.addEventListener('resize', onResize)
    const mq = window.matchMedia(MD)
    mq.addEventListener('change', onResize)

    stage.render((stg) => sceneRef.current(stg, heavyRef.current))
    onStageRef.current?.(stage)
    return () => {
      onStageRef.current?.(null)
      clearTimeout(flashTimer)
      offRender()
      offWheel()
      svg.removeEventListener('pointerdown', onDown)
      svg.removeEventListener('focus', onFocus)
      svg.removeEventListener('blur', onBlur)
      svg.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      window.removeEventListener('resize', onResize)
      mq.removeEventListener('change', onResize)
      stage.destroy()
      stageRef.current = null
    }
  }, [])

  useEffect(() => {
    if (stageRef.current) sizeStage(stageRef.current, reserve)
  }, [reserve])

  // Redraw when the scene changes
  useEffect(() => {
    stageRef.current?.render((stg) => sceneRef.current(stg, heavyRef.current))
  }, [scene])

  useEffect(() => {
    stageRef.current?.svg.setAttribute('aria-label', label)
  }, [label])

  const hint = keyHint ? KEY_HINT : fine ? 'Drag to rotate · Ctrl + scroll to zoom' : 'Drag to rotate · Pinch to zoom'

  return (
    <div className="relative @container">
      {topRight && <div className="absolute top-2.5 right-2.5 z-10 flex gap-1.5">{topRight}</div>}
      <div ref={hostRef} />
      {topLeft && (
        <div className="pointer-events-none absolute top-2.5 left-2.5 max-w-[calc(100%-10.5rem)] md:max-w-[calc(100%-9rem)] rounded-md bg-white/85 dark:bg-gray-900/85 border border-gray-200 dark:border-gray-800 px-2 py-1 text-[12.5px] font-semibold text-gray-800 dark:text-gray-100 leading-snug">
          {topLeft}
        </div>
      )}
      <div className="pointer-events-none absolute inset-x-3 bottom-2 flex flex-wrap items-end justify-between gap-x-3 gap-y-1">
        <span
          className={`pp-hint-flash text-[12px] rounded px-1 -mx-1 ${
            flash ? 'bg-blue-50 text-blue-800 dark:bg-blue-950/70 dark:text-blue-200' : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {hint}
        </span>
        {bottomRight && <span className="hidden @[300px]:flex flex-wrap justify-end gap-x-2.5 gap-y-0.5 text-[12px] text-gray-600 dark:text-gray-300">{bottomRight}</span>}
      </div>
    </div>
  )
}

// ------------------------------------------------------------------------------------------------
// View buttons: Reset / Side / Top (S and T keys too, while the stage has focus)
// ------------------------------------------------------------------------------------------------

function camIs(stage: Stage, c: CamPreset): boolean {
  const cur = stage.getCamera()
  const dy = Math.abs(((cur.yaw - c.yaw + 3 * Math.PI) % (2 * Math.PI)) - Math.PI)
  return dy < 0.6 * DEG && Math.abs(cur.pitch - c.pitch) < 0.6 * DEG
}

const VIEW_BTN =
  'w-11 h-11 md:[@media(pointer:fine)]:w-9 md:[@media(pointer:fine)]:h-9 inline-flex items-center justify-center rounded-lg bg-white/85 dark:bg-gray-900/85 border hover:text-gray-900 dark:hover:text-white'
const VIEW_ON = 'text-blue-700 dark:text-blue-300 border-blue-500'
const VIEW_OFF = 'text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700'

export function ViewButtons({ stage }: { stage: Stage | null }) {
  const [view, setView] = useState<'side' | 'top' | null>(null)
  useEffect(() => {
    if (!stage) return
    const sync = () => setView(camIs(stage, SIDE_CAM) ? 'side' : camIs(stage, TOP_CAM) ? 'top' : null)
    sync()
    const off = stage.on('camera', sync)
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return
      if (e.key === 's' || e.key === 'S') stage.setCamera(SIDE_CAM, { animate: true })
      else if (e.key === 't' || e.key === 'T') stage.setCamera(TOP_CAM, { animate: true })
      else return
      e.preventDefault()
    }
    stage.svg.addEventListener('keydown', onKey)
    return () => {
      off()
      stage.svg.removeEventListener('keydown', onKey)
    }
  }, [stage])

  return (
    <>
      <button type="button" aria-label="Reset View" title="Reset View" className={`${VIEW_BTN} ${VIEW_OFF}`} onClick={() => stage?.resetCamera({ animate: true })}>
        <svg viewBox="0 0 20 20" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4.2 8.5a6 6 0 1 1 1.3 5.6" />
          <path d="M3.5 3.8v4.9h4.9" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Side View"
        title="Side View"
        aria-pressed={view === 'side'}
        className={`${VIEW_BTN} ${view === 'side' ? VIEW_ON : VIEW_OFF}`}
        onClick={() => stage?.setCamera(SIDE_CAM, { animate: true })}
      >
        <svg viewBox="0 0 20 20" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2.5" y="4" width="15" height="12" rx="1.5" />
          <path d="M2.5 12h15" />
          <path d="M7 12l3-5 3 5" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Top View"
        title="Top View"
        aria-pressed={view === 'top'}
        className={`${VIEW_BTN} ${view === 'top' ? VIEW_ON : VIEW_OFF}`}
        onClick={() => stage?.setCamera(TOP_CAM, { animate: true })}
      >
        <svg viewBox="0 0 20 20" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="8.5" width="14" height="9" rx="1.5" />
          <path d="M10 1.8v8.4" />
          <path d="M7 7.3l3 3 3-3" />
        </svg>
      </button>
    </>
  )
}
