import { useEffect, useRef, useState, type ReactNode } from 'react'
import Katex from '../../../components/Katex'
import { f1, f2, solidWords, texNum, trimNum, type InsetTab, type PPGeometry, type PPState } from './model'
import { useMedia } from './Stage'

type InsetState = Pick<PPState, 'solid' | 'layerMode'>
type Vec2Like = readonly number[]

function pathOf(pts: readonly Vec2Like[], T: (p: Vec2Like) => [number, number]): string {
  return pts.map((p, i) => { const q = T(p); return (i ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1) }).join('') + 'Z'
}

/** Top view of the slice inside the base, with rays from the apex foot F: the slice is the base
 *  dilated about F by k. For a prism the slice is the base, slid across. */
export function SliceVsBaseSVG({ g, st, W, H, strongGrid = false }: { g: PPGeometry; st: InsetState; W: number; H: number; strongGrid?: boolean }) {
  const prismMode = st.solid === 'prism'
  const base = g.base
  const F: Vec2Like = [g.s, 0]
  const slice = prismMode ? g.priSlice2D : g.slice2D
  const all: Vec2Like[] = [...base, ...(slice || []), ...(prismMode ? [] : [F])]
  let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity
  for (const p of all) {
    x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1])
  }
  const sc = Math.min(W / ((x1 - x0) * 1.2), H / ((y1 - y0) * 1.2))
  const cx = (x0 + x1) / 2
  const cy = (y0 + y1) / 2
  const T = (p: Vec2Like): [number, number] => [W / 2 + (p[0] - cx) * sc, H / 2 - (p[1] - cy) * sc]

  // Unit grid over the whole inset
  let grid = ''
  for (let x = Math.floor(cx - W / 2 / sc); x <= Math.ceil(cx + W / 2 / sc); x++) grid += 'M' + T([x, 0])[0].toFixed(1) + ' 0V' + H
  for (let y = Math.floor(cy - H / 2 / sc); y <= Math.ceil(cy + H / 2 / sc); y++) grid += 'M0 ' + T([0, y])[1].toFixed(1) + 'H' + W

  let rays = ''
  if (!prismMode) {
    const idx: number[] = []
    if (g.curvy) for (let i = 0; i < 8; i++) idx.push(i * 9)
    else {
      const step = Math.max(1, Math.ceil(base.length / 12))
      for (let i = 0; i < base.length; i += step) idx.push(i)
    }
    const pf = T(F)
    for (const j of idx) {
      const q = T(base[j])
      rays += 'M' + pf[0].toFixed(1) + ' ' + pf[1].toFixed(1) + 'L' + q[0].toFixed(1) + ' ' + q[1].toFixed(1)
    }
  }
  const pf = T(F)
  const right = pf[0] < W - 70
  return (
    <>
      <path className={strongGrid ? 'i-grid i-grid-strong' : 'i-grid'} d={grid} />
      <path className="i-base" d={pathOf(base, T)} />
      {rays && <path className="i-ray" d={rays} />}
      {slice && <path className="i-slice" d={pathOf(slice, T)} />}
      {!prismMode && (
        <>
          {!slice && <circle className="i-dot" cx={pf[0].toFixed(1)} cy={pf[1].toFixed(1)} r="5" />}
          <circle className="i-ink" cx={pf[0].toFixed(1)} cy={pf[1].toFixed(1)} r="2.8" />
          <text className="i-label" x={(pf[0] + (right ? 6 : -6)).toFixed(1)} y={(pf[1] + 13).toFixed(1)} textAnchor={right ? 'start' : 'end'}>
            below apex
          </text>
        </>
      )}
    </>
  )
}

/** Slice area against slice height: the pyramid's parabola-shaped curve A(1 − z/h)², the prism's
 *  flat line at A, the current slice as a dot, and the layer stack as rectangles. */
export function AreaGraphSVG({ g, st, W, H }: { g: PPGeometry; st: InsetState; W: number; H: number }) {
  const mL = 46, mR = 14, mT = 12, mB = 34
  const A = g.Av
  const h = g.h
  const pw = W - mL - mR
  const ph = H - mT - mB
  const X = (z: number) => mL + (z / h) * pw
  const Y = (a: number) => mT + ph - (a / (1.1 * A)) * ph

  const rects: ReactNode[] = []
  if (g.n > 0 && !g.lifted) {
    for (let j = 0; j < g.n; j++) {
      const za = (j * h) / g.n
      const zb = ((j + 1) * h) / g.n
      const a = st.solid === 'prism' ? A : st.layerMode === 'inside' ? A * Math.pow(1 - zb / h, 2) : A * Math.pow(1 - za / h, 2)
      if (a <= 1e-9) continue
      rects.push(<rect key={j} className="i-rect" x={X(za).toFixed(1)} y={Y(a).toFixed(1)} width={(X(zb) - X(za)).toFixed(1)} height={(Y(0) - Y(a)).toFixed(1)} />)
    }
  }
  let curve = ''
  for (let i = 0; i <= 60; i++) {
    const z = (i / 60) * h
    curve += (i ? 'L' : 'M') + X(z).toFixed(1) + ' ' + Y(A * Math.pow(1 - z / h, 2)).toFixed(1)
  }
  const az = st.solid === 'prism' ? A : g.sliceA
  return (
    <>
      <path className="i-under" d={curve + 'L' + X(h).toFixed(1) + ' ' + Y(0).toFixed(1) + 'L' + X(0).toFixed(1) + ' ' + Y(0).toFixed(1) + 'Z'} />
      {rects}
      <path className="i-curve" d={curve} />
      <path className="i-prism" d={'M' + X(0) + ' ' + Y(A).toFixed(1) + 'H' + X(h)} />
      <path className="i-axis" d={'M' + mL + ' ' + mT + 'V' + Y(0).toFixed(1) + 'H' + (W - mR + 4)} />
      <path className="i-axis" d={'M' + (mL - 4) + ' ' + Y(A).toFixed(1) + 'h4M' + (mL - 4) + ' ' + Y(A / 4).toFixed(1) + 'h4M' + X(h).toFixed(1) + ' ' + Y(0).toFixed(1) + 'v4'} />
      <text className="i-text" x={mL - 7} y={(Y(A) + 4).toFixed(1)} textAnchor="end" fontStyle="italic">A</text>
      <text className="i-text" x={mL - 7} y={(Y(A / 4) + 4).toFixed(1)} textAnchor="end">
        <tspan fontStyle="italic">A</tspan>/4
      </text>
      <text className="i-text" x={mL - 7} y={(Y(0) + 4).toFixed(1)} textAnchor="end">0</text>
      <text className="i-text" x={X(0)} y={(Y(0) + 15).toFixed(1)} textAnchor="middle">0</text>
      <text className="i-text" x={X(h).toFixed(1)} y={(Y(0) + 15).toFixed(1)} textAnchor="end">
        <tspan fontStyle="italic">h</tspan> = {f1(h)}
      </text>
      <text className="i-text" x={(mL + pw / 2).toFixed(1)} y={H - 4} textAnchor="middle">
        Slice height <tspan fontStyle="italic">z</tspan>
      </text>
      <text className="i-text" transform={`translate(12 ${(mT + ph / 2).toFixed(1)}) rotate(-90)`} textAnchor="middle">Slice area</text>
      <path className="i-z" d={'M' + X(g.z).toFixed(1) + ' ' + Y(0).toFixed(1) + 'V' + mT} />
      <circle className="i-dot" cx={X(g.z).toFixed(1)} cy={Y(az).toFixed(1)} r="4.5" />
    </>
  )
}

function Chip({ children }: { children: ReactNode }) {
  return <span className="text-[12px] rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-2 py-0.5 tabular-nums">{children}</span>
}

export function InsetCaption({ g, st, tab, hideArea = false }: { g: PPGeometry; st: InsetState; tab: InsetTab; hideArea?: boolean }) {
  const w = solidWords(g.curvy)
  if (tab === 'graph') {
    return (
      <p>
        Volume = area under this graph. The {w.Q}’s is the rectangle <i>A</i> × <i>h</i>. The {w.P}’s shaded region is exactly ⅓ of it.
      </p>
    )
  }
  if (st.solid === 'prism') {
    const sh = (g.s * g.z) / g.h
    return (
      <>
        <p>{Math.abs(sh) < 0.05 ? 'Slice = base exactly' : `Slice = base, shifted ${f1(Math.abs(sh))} across`}</p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          <Chip>Lengths × 1</Chip>
          <Chip>Area × 1</Chip>
        </div>
      </>
    )
  }
  return (
    <>
      <p className="tabular-nums">
        <Katex tex={`k = 1 - \\dfrac{z}{h} = 1 - \\dfrac{${texNum(g.z, 1)}}{${texNum(g.h, 1)}} = ${texNum(g.k, 2)}`} />
      </p>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        <Chip>Lengths × {f2(g.k)}</Chip>
        <Chip>Area × {hideArea ? '?' : trimNum(g.k * g.k)}</Chip>
        {g.lifted && <Chip>Volume × {trimNum(g.k * g.k * g.k)}</Chip>}
      </div>
    </>
  )
}

/** Measures its own width (the SVGs are drawn in px, so text stays a constant size). */
function useWidth<T extends HTMLElement>(): [React.RefObject<T>, number] {
  const ref = useRef<T>(null)
  const [w, setW] = useState(300)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => setW(Math.max(200, Math.round(el.getBoundingClientRect().width) || 300))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, w]
}

const TABS: { id: InsetTab; label: string }[] = [
  { id: 'slice', label: 'Slice vs Base' },
  { id: 'graph', label: 'Area Graph' },
]

/** The inset card: Slice vs Base | Area Graph tabs, the drawing, and a caption under it. */
export function Inset({
  g,
  st,
  tab,
  onTab,
  strongGrid,
  caption,
  title,
  hideArea = false,
  footer,
  className = '',
}: {
  g: PPGeometry
  st: InsetState
  tab: InsetTab
  onTab?: (t: InsetTab) => void
  strongGrid?: boolean
  /** Replaces the default caption. */
  caption?: ReactNode
  /** A fixed heading in place of the tabs (the Lesson picks the view for each step). */
  title?: string
  /** Hide the slice's area factor (the Lesson, until step 3's prediction). */
  hideArea?: boolean
  /** Extra content under the caption (the Lesson's Working lines). */
  footer?: ReactNode
  className?: string
}) {
  const md = useMedia('(min-width: 768px)')
  const [boxRef, W] = useWidth<HTMLDivElement>()
  const H = md ? 190 : 170
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    e.preventDefault()
    const next = tab === 'slice' ? 'graph' : 'slice'
    onTab?.(next)
    tabRefs.current[next === 'slice' ? 0 : 1]?.focus()
  }
  return (
    <section className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 ${className}`} aria-label={title ?? 'Inset'}>
      {title ? (
        <h3 className="text-[14px] font-semibold text-gray-900 dark:text-white">{title}</h3>
      ) : (
      <div role="tablist" aria-label="Inset view" className="flex gap-1.5">
        {TABS.map((t, i) => {
          const on = tab === t.id
          return (
            <button
              key={t.id}
              ref={(el) => (tabRefs.current[i] = el)}
              type="button"
              role="tab"
              id={`pp-tab-${t.id}`}
              aria-selected={on}
              aria-controls="pp-inset-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => onTab?.(t.id)}
              onKeyDown={onKey}
              className={`min-h-[44px] md:[@media(pointer:fine)]:min-h-0 text-[12.5px] font-semibold px-3 py-1.5 rounded-full ${
                on ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {t.label}
            </button>
          )
        })}
      </div>
      )}
      <div
        id="pp-inset-panel"
        role={title ? undefined : 'tabpanel'}
        aria-labelledby={title ? undefined : `pp-tab-${tab}`}
        className="mt-2"
        ref={boxRef}
      >
        <svg
          className="block w-full"
          viewBox={`0 0 ${W} ${H}`}
          style={{ height: H }}
          role="img"
          aria-label={tab === 'graph' ? 'Graph of slice area against slice height' : 'Top view of the slice inside the base'}
        >
          {tab === 'graph' ? <AreaGraphSVG g={g} st={st} W={W} H={H} /> : <SliceVsBaseSVG g={g} st={st} W={W} H={H} strongGrid={strongGrid} />}
        </svg>
        <div className="mt-2 text-[13px] text-gray-700 dark:text-gray-200">{caption ?? <InsetCaption g={g} st={st} tab={tab} hideArea={hideArea} />}</div>
        {footer}
      </div>
    </section>
  )
}
