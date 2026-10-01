// Explore: the solid and its net side by side (stacked on phones with the info panel between),
// linked selection both ways, a Fold slider with Play, Pick a Net, counts and surface area.
import { useCallback, useEffect, useRef, useState } from 'react'
import { NET_SHAPES, SHAPE_GROUPS, getNetShape, countList, type ShapeKey } from '../lib/nets.ts'
import Solid3DView, { type Solid3DHandle } from './Solid3DView'
import NetView, { type NetHandle } from './NetView'
import InfoPanel from './InfoPanel'
import Counts from './Counts'
import SurfaceArea from './SurfaceArea'
import NetStrip from './NetStrip'
import { tokensFor, useDark, useMedia, FOCUS, PILL_OFF, type Sel, type Hover, type Show, type CountState, type Kind } from './common'

const CHIP_ON = 'bg-blue-600 border-blue-600 text-white dark:bg-blue-500 dark:border-blue-500 dark:text-gray-950'
const CHIP_OFF = 'bg-white border-gray-300 text-gray-600 hover:border-gray-400 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'
const TGL_ON = 'bg-emerald-600 border-emerald-600 text-white dark:bg-emerald-500 dark:border-emerald-500 dark:text-gray-950'
const CARD = 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl'

function Toggle({ label, on, onClick }: { label: string; on: boolean; onClick(): void }) {
  return (
    <button type="button" aria-pressed={on} onClick={onClick}
      className={'text-[12.5px] font-semibold px-3 py-1.5 min-h-11 sm:min-h-0 rounded-full border transition-colors ' + (on ? TGL_ON : PILL_OFF) + ' ' + FOCUS}>
      {label}
    </button>
  )
}

const PLAY_MS = 4000

export default function Explore() {
  const dark = useDark()
  const T = tokensFor(dark)
  const phone = useMedia('(max-width: 639px)')
  const fine = useMedia('(hover: hover) and (pointer: fine)')
  const coarse = useMedia('(pointer: coarse)')
  const reduced = useMedia('(prefers-reduced-motion: reduce)')

  const [shapeKey, setShapeKey] = useState<ShapeKey>('cube')
  const ns = getNetShape(shapeKey) || NET_SHAPES[0]
  const [netIx, setNetIx] = useState(0)
  const ni = ns.nets[netIx] || ns.nets[0]
  const [sel, setSel] = useState<Sel | null>(null)
  const [hover, setHoverState] = useState<Hover | null>(null)
  const [show, setShow] = useState<Show>({ faces: true, edges: true, verts: true })
  const [see, setSee] = useState(false)
  const [count, setCount] = useState<CountState | null>(null)
  const [more, setMore] = useState(false)
  const [foldT, setFoldT] = useState(1) // 1 = folded: the solid at rest
  const [playing, setPlaying] = useState(false)

  const solidRef = useRef<Solid3DHandle>(null)
  const netRef = useRef<NetHandle>(null)
  const selRef = useRef(sel)
  selRef.current = sel
  const foldRef = useRef(foldT)
  foldRef.current = foldT

  /* ── selection ── */
  const select = useCallback((s: Sel | null) => {
    setCount(null)
    const cur = selRef.current
    if (s && cur && s.kind === cur.kind && s.id === cur.id) s = null
    selRef.current = s
    setSel(s)
    setMore(false)
    if (!s) return
    const turned = s.source !== 'solid' && !!solidRef.current?.autoTurn(s)
    const want = s
    window.setTimeout(() => {
      const now = selRef.current
      if (!now || now.kind !== want.kind || now.id !== want.id) return
      netRef.current?.ping()
      solidRef.current?.ping()
    }, turned ? 480 : 60)
  }, [])
  const clear = useCallback(() => select(null), [select])
  const setHover = useCallback((h: Hover | null) => {
    setHoverState(cur => (!h && !cur) || (h && cur && h.kind === cur.kind && h.id === cur.id && h.view === cur.view) ? cur : h)
  }, [])

  /* ── Count Along ── */
  const startCount = (kind: Kind) => {
    if (count && count.kind === kind) { setCount(null); return }
    setSel(null)
    selRef.current = null
    setMore(false)
    const list = countList(ns, kind)
    setCount({ kind, list, n: reduced ? list.length : 1, see: kind !== 'face', done: reduced || list.length <= 1 })
  }
  useEffect(() => {
    if (!count) return
    if (count.done) {
      const id = window.setTimeout(() => setCount(null), reduced ? 4000 : 2200)
      return () => window.clearTimeout(id)
    }
    const id = window.setTimeout(() => setCount(c => (c ? { ...c, n: c.n + 1, done: c.n + 1 >= c.list.length } : c)), count.kind === 'face' ? 450 : 300)
    return () => window.clearTimeout(id)
  }, [count, reduced])

  /* ── Fold slider and Play ── */
  useEffect(() => {
    if (!playing) return
    if (reduced) {
      // No animation: two steps, half folded then closed.
      const ids: number[] = []
      if (foldRef.current < 0.5) {
        setFoldT(0.5)
        ids.push(window.setTimeout(() => { setFoldT(1); ids.push(window.setTimeout(() => setPlaying(false), 700)) }, 700))
      } else { setFoldT(1); ids.push(window.setTimeout(() => setPlaying(false), 700)) }
      return () => ids.forEach(id => window.clearTimeout(id))
    }
    let raf = 0, t0: number | null = null
    const start = foldRef.current
    const step = (now: number) => {
      if (t0 === null) t0 = now
      const t = Math.min(1, start + (now - t0) / PLAY_MS)
      setFoldT(t)
      if (t >= 1) setPlaying(false)
      else raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [playing, reduced])
  const onPlay = () => {
    if (playing) { setPlaying(false); return }
    if (foldRef.current >= 1) { setFoldT(0); foldRef.current = 0 }
    setPlaying(true)
  }
  const pct = Math.round(foldT * 100)

  /* ── shape and net ── */
  const setShape = (k: string) => {
    const next = getNetShape(k)
    if (!next || next.key === shapeKey) return
    setPlaying(false)
    setCount(null)
    setShapeKey(next.key)
    setNetIx(0)
    setSel(null)
    selRef.current = null
    setHoverState(null)
    setMore(false)
  }
  const pickNet = (i: number) => {
    if (i === netIx) return
    setCount(null)
    setNetIx(i)
  }

  return (
    <div>
      {/* Shape picker: chips from 640 px, a native select on phones */}
      <div className="hidden sm:flex flex-wrap items-center gap-2" role="group" aria-label="Shape">
        <span className="text-[13px] font-semibold text-gray-700 dark:text-gray-300 mr-1">Shape</span>
        {SHAPE_GROUPS.map((g, gi) => (
          <span key={g} role="group" aria-label={g} className="contents">
            {gi > 0 && <span className="h-5 w-px bg-gray-200 dark:bg-gray-700" aria-hidden="true" />}
            {NET_SHAPES.filter(s => s.group === g).map(s => (
              <button key={s.key} type="button" aria-pressed={s.key === shapeKey} onClick={() => setShape(s.key)}
                className={'text-[12.5px] font-semibold px-3 py-1.5 rounded-full border transition-colors ' + (s.key === shapeKey ? CHIP_ON : CHIP_OFF) + ' ' + FOCUS}>
                {s.title}
              </button>
            ))}
          </span>
        ))}
      </div>
      <div className="sm:hidden">
        <label htmlFor="nets-shape" className="block text-[13px] font-semibold text-gray-700 dark:text-gray-300 mb-1">Shape</label>
        <select id="nets-shape" value={shapeKey} onChange={e => setShape(e.target.value)}
          className="w-full h-11 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 text-[15px] text-gray-900 dark:text-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
          {SHAPE_GROUPS.map(g => (
            <optgroup key={g} label={g}>
              {NET_SHAPES.filter(s => s.group === g).map(s => <option key={s.key} value={s.key}>{s.title}</option>)}
            </optgroup>
          ))}
        </select>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2" role="group" aria-label="Show">
        <span className="text-[13px] font-semibold text-gray-700 dark:text-gray-300 mr-1">Show</span>
        <Toggle label="Face Names" on={show.faces} onClick={() => setShow(s => ({ ...s, faces: !s.faces }))} />
        <Toggle label="Edge Numbers" on={show.edges} onClick={() => setShow(s => ({ ...s, edges: !s.edges }))} />
        <Toggle label="Vertex Letters" on={show.verts} onClick={() => setShow(s => ({ ...s, verts: !s.verts }))} />
      </div>

      {/* Main grid: one DOM order (solid, info, net) */}
      <div className="nets-grid mt-4">
        <section className={'nets-area-solid p-3 sm:p-4 min-w-0 ' + CARD} aria-labelledby="nets-solid-title">
          <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
            <h3 id="nets-solid-title" className="text-[13px] font-semibold text-gray-700 dark:text-gray-300">3D Shape</h3>
            <div className="flex items-center gap-2">
              <Toggle label="See-Through" on={see} onClick={() => setSee(v => !v)} />
              <button type="button" onClick={() => solidRef.current?.resetView()}
                className={'inline-flex items-center gap-1.5 text-[12.5px] font-semibold px-3 py-1.5 min-h-11 sm:min-h-0 rounded-full border ' + PILL_OFF + ' ' + FOCUS}>
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.5 8a5.5 5.5 0 1 0 1.8-4.1" /><path d="M2.3 1.8v2.6h2.6" /></svg>
                Reset View
              </button>
            </div>
          </div>
          <Solid3DView
            ref={solidRef} ns={ns} ni={ni} sel={sel} hover={hover} show={show} see={see} count={count}
            foldT={foldT} playing={playing} T={T} fine={fine} coarse={coarse}
            onPick={select} onHover={setHover} onEscape={clear}
          />
          <div className="mt-3 flex items-center gap-2.5 sm:gap-3">
            <button type="button" onClick={onPlay} aria-label={playing ? 'Pause' : 'Play'}
              className={'inline-flex items-center justify-center gap-1.5 text-[12.5px] font-semibold px-3.5 py-1.5 rounded-full bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 min-h-11 sm:min-h-0 min-w-[4.75rem] ' + FOCUS}>
              {playing
                ? <svg viewBox="0 0 12 12" className="w-3 h-3" aria-hidden="true"><rect x="2" y="1.5" width="3" height="9" rx="0.6" fill="currentColor" /><rect x="7" y="1.5" width="3" height="9" rx="0.6" fill="currentColor" /></svg>
                : <svg viewBox="0 0 12 12" className="w-3 h-3" aria-hidden="true"><path d="M3 1.5v9l7.5-4.5z" fill="currentColor" /></svg>}
              {playing ? 'Pause' : 'Play'}
            </button>
            <label htmlFor="nets-fold" className="text-[13px] text-gray-700 dark:text-gray-300">Fold</label>
            <input
              id="nets-fold" type="range" min={0} max={100} step={1} value={pct}
              aria-valuetext={pct + '% folded'}
              onPointerDown={() => setPlaying(false)}
              onChange={e => { setPlaying(false); setFoldT(+e.target.value / 100) }}
              className={"flex-1 min-w-0 h-11 sm:h-6 cursor-pointer rounded accent-emerald-600 dark:accent-emerald-400 " + FOCUS}
            />
            <span className="w-11 sm:w-28 lg:w-11 xl:w-28 text-right text-[13px] font-display font-semibold tabular-nums text-gray-800 dark:text-gray-100 whitespace-nowrap">
              {pct}%<span className="hidden sm:inline lg:hidden xl:inline"> · {pct === 0 ? 'Flat' : pct === 100 ? 'Closed' : 'Folding'}</span>
            </span>
          </div>
        </section>

        <InfoPanel ns={ns} ni={ni} sel={count ? null : sel} phone={phone} more={more} onMore={() => setMore(m => !m)}
          onJump={j => select({ ...j, source: 'panel', part: null })} onClear={clear} />

        <section className={'nets-area-net p-3 sm:p-4 min-w-0 ' + CARD} aria-labelledby="nets-net-title">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 id="nets-net-title" className="text-[13px] font-semibold text-gray-700 dark:text-gray-300">Net</h3>
          </div>
          <NetView
            ref={netRef} ns={ns} ni={ni} sel={sel} hover={hover} show={show} count={count} T={T} fine={fine} wide={!phone}
            onPick={select} onHover={setHover} onEscape={clear}
          />
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-gray-600 dark:text-gray-400">
            {!ns.curved && (
              <span className="inline-flex items-center gap-1.5">
                <svg width="22" height="8" aria-hidden="true"><line x1="0" y1="4" x2="22" y2="4" style={{ stroke: 'var(--nets-fold)' }} strokeWidth="1.5" strokeDasharray="6 4" /></svg>Fold line
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <svg width="34" height="16" aria-hidden="true"><line x1="0" y1="8" x2="16" y2="8" style={{ stroke: 'var(--nets-pair-1)' }} strokeWidth="3" /><rect x="18" y="1" width="14" height="14" rx="4" style={{ fill: 'var(--nets-pair-1)' }} /><text x="25" y="8.5" className="nets-tag-num">1</text></svg>
              Taped edge — same number, taped together
            </span>
            {!ns.curved && <span className="inline-flex items-center gap-1.5"><i className="font-semibold text-gray-800 dark:text-gray-100 font-serif">A</i>Corner (vertex)</span>}
          </div>
          <NetStrip ns={ns} netIx={netIx} onPick={pickNet} />
        </section>
      </div>

      {/* Lower grid */}
      <div className="mt-4 grid md:grid-cols-2 gap-4">
        <section className={'p-4 ' + CARD} aria-labelledby="nets-count-title">
          <h3 id="nets-count-title" className="text-sm font-semibold mb-3 text-gray-900 dark:text-white">Faces, Vertices and Edges</h3>
          <Counts ns={ns} ni={ni} count={count} onCount={startCount} />
        </section>
        <section className={'p-4 ' + CARD} aria-labelledby="nets-sa-title">
          <h3 id="nets-sa-title" className="text-sm font-semibold mb-3 text-gray-900 dark:text-white">Surface Area</h3>
          <SurfaceArea ns={ns} sel={sel} onFace={id => select({ kind: 'face', id, source: 'panel', part: null })} />
        </section>
      </div>
      <p className="mt-4 text-[12px] text-gray-500 dark:text-gray-400">All lengths in cm. Why no sphere? A sphere can’t be flattened without stretching or tearing, so it has no net.</p>
    </div>
  )
}
