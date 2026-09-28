// 2017 Specialist Exam 2 MCQ 11 — "linearly dependent" means a lies in the plane of b and c. The
// scene is the question's own vectors: b = i + j − 4k, c = 2i + j − 2k (spanning the shaded plane)
// and a = 2i + 3j + dk with a slider for d. The i- and j-parts of a are fixed, so d only moves a's
// tip up and down one vertical line through (2, 3, ·). That line meets the plane at exactly one
// point, 4b − c = 2i + 3j − 14k, so exactly one value, d = −14, makes the three vectors coplanar
// (dependent). The red gap a − (4b − c) = (d + 14)k shows how far off the plane the tip is. The view
// can be turned, or turned edge-on to the plane, where the plane is a line and a lies in it only
// at d = −14.
//
// A 3D scene, so it is drawn as its own SVG (an orthographic view from azimuth/elevation), not on a
// mafs coordinate plane. Heights are drawn at a quarter of their true size so the long k-parts fit;
// squashing one direction is a linear map, so it never changes whether vectors are coplanar.

import { useEffect, useRef, useState } from 'react'
import { ActionButton, Buttons, C, Controls, Katex, M, Notice, Readout, Readouts, Slider, num } from './kit'

type V3 = readonly [number, number, number]
type P2 = readonly [number, number]
const add = (p: V3, q: V3): V3 => [p[0] + q[0], p[1] + q[1], p[2] + q[2]]
const sub = (p: V3, q: V3): V3 => [p[0] - q[0], p[1] - q[1], p[2] - q[2]]
const mul = (k: number, p: V3): V3 => [k * p[0], k * p[1], k * p[2]]
const dot = (p: V3, q: V3) => p[0] * q[0] + p[1] * q[1] + p[2] * q[2]
const cross = (p: V3, q: V3): V3 => [p[1] * q[2] - p[2] * q[1], p[2] * q[0] - p[0] * q[2], p[0] * q[1] - p[1] * q[0]]

/** Heights are drawn at this fraction of their true size. */
const ZS = 0.25
/** True coordinates → drawing coordinates. */
const sq = (p: V3): V3 => [p[0], p[1], ZS * p[2]]

const O: V3 = [0, 0, 0]
const B: V3 = [1, 1, -4]
const CV: V3 = [2, 1, -2]
/** The one point of the plane directly above/below (2, 3): 4b − c. */
const T: V3 = add(mul(4, B), mul(-1, CV))
const D_MIN = -20
const D_MAX = 2
const unit = (p: V3): V3 => mul(1 / Math.sqrt(dot(p, p)), p)
const TRACK: [V3, V3] = [[2, 3, D_MIN - 1], [2, 3, D_MAX + 2]]
const AXES: [V3, V3, string][] = [
  [[0, 0, 0], [3, 0, 0], 'x'],
  [[0, 0, 0], [0, 4, 0], 'y'],
  [[0, 0, 0], [0, 0, 6], 'z'],
]

// The plane of b and c, drawn as a rectangle (in drawing coordinates) around the points that
// matter: O, b, c, 4b and 4b − c. Built on perpendicular in-plane directions u and v so it reads as
// a flat sheet, not the thin sliver b and c themselves would make.
const N = cross(sq(B), sq(CV))
const U = unit(sq(B))
const VV = unit(cross(N, U))
const KEY: V3[] = [O, B, CV, mul(4, B), T].map(sq)
const CEN: V3 = mul(1 / KEY.length, KEY.reduce((s, p) => add(s, p), O))
const uu = KEY.map(p => dot(sub(p, CEN), U))
const vv = KEY.map(p => dot(sub(p, CEN), VV))
const U0 = Math.min(...uu) - 0.8
const U1 = Math.max(...uu) + 0.8
const V0 = Math.min(...vv) - 1.2
const V1 = Math.max(...vv) + 1.2
/** A point of the drawn plane, already in drawing coordinates. */
const onPlane = (x: number, y: number): V3 => add(CEN, add(mul(x, U), mul(y, VV)))
const PATCH: V3[] = [onPlane(U0, V0), onPlane(U1, V0), onPlane(U1, V1), onPlane(U0, V1)]
const GRID: [V3, V3][] = [
  ...[1, 2, 3, 4].map(i => U0 + ((U1 - U0) * i) / 5).map(x => [onPlane(x, V0), onPlane(x, V1)] as [V3, V3]),
  ...[1, 2].map(i => V0 + ((V1 - V0) * i) / 3).map(y => [onPlane(U0, y), onPlane(U1, y)] as [V3, V3]),
]

// Frame: every view fits in the sphere around the scene's middle, so turning never rescales it.
// The plane itself is left out (it is allowed to run off the edge — it goes on for ever anyway).
const ALL: V3[] = [...KEY, ...TRACK.map(sq), ...AXES.flatMap(([p, q]) => [p, q]).map(sq)]
const MID: V3 = (() => {
  const lo = [0, 1, 2].map(i => Math.min(...ALL.map(p => p[i])))
  const hi = [0, 1, 2].map(i => Math.max(...ALL.map(p => p[i])))
  return [(lo[0] + hi[0]) / 2, (lo[1] + hi[1]) / 2, (lo[2] + hi[2]) / 2]
})()
const RADIUS = Math.max(...ALL.map(p => Math.sqrt(dot(sub(p, MID), sub(p, MID)))))

function view(azDeg: number, elDeg: number) {
  const t = (azDeg * Math.PI) / 180
  const f = (elDeg * Math.PI) / 180
  const e1: V3 = [-Math.sin(t), Math.cos(t), 0]
  const e2: V3 = [-Math.sin(f) * Math.cos(t), -Math.sin(f) * Math.sin(t), Math.cos(f)]
  return { e1, e2 }
}
const wrap = (deg: number) => ((((deg + 180) % 360) + 360) % 360) - 180

// Edge-on: look along the horizontal direction lying in the (drawn) plane, so the plane shows as a line.
const EDGE_AZ = (Math.atan2(-N[0], N[1]) * 180) / Math.PI

function useWidth() {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    setWidth(el.getBoundingClientRect().width)
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(entries => setWidth(entries[0]?.contentRect.width ?? 0))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, width] as const
}

function Tag({ at, tex, color }: { at: P2; tex: string; color?: string }) {
  return (
    <span
      className="absolute -translate-x-1/2 -translate-y-1/2 px-0.5 rounded bg-white/75 dark:bg-gray-900/75 text-[13.5px] leading-none pointer-events-none whitespace-nowrap"
      style={{ left: at[0], top: at[1], color: color ?? undefined }}
    >
      <Katex tex={tex} />
    </span>
  )
}

const V = (s: string) => `\\underset{\\sim}{${s}}`

export default function CoplanarWidget() {
  const [ref, width] = useWidth()
  const [d, setD] = useState(-6)
  const [az, setAz] = useState(150)
  const [el, setEl] = useState(20)
  const raf = useRef(0)
  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  const W = Math.min(width || 340, 600)
  const H = Math.min(360, Math.max(300, W))
  const PAD = 12
  const S = (Math.min(W, H) - 2 * PAD) / (2 * RADIUS)
  const { e1, e2 } = view(az, el)
  const toD = (p: V3): P2 => {
    const r = sub(p, MID)
    return [W / 2 + S * dot(r, e1), H / 2 - S * dot(r, e2)]
  }
  const toS = (p: V3): P2 => toD(sq(p))
  const pathD = (pts: V3[]) => pts.map(toD).map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const path = (pts: V3[]) => pts.map(toS).map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')

  const turnTo = (az1: number, el1: number) => {
    cancelAnimationFrame(raf.current)
    const az0 = az
    const el0 = el
    const dAz = wrap(az1 - az0)
    const t0 = performance.now()
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / 700)
      const k = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2
      setAz(wrap(az0 + dAz * k))
      setEl(el0 + (el1 - el0) * k)
      if (t < 1) raf.current = requestAnimationFrame(step)
    }
    raf.current = requestAnimationFrame(step)
  }
  const edgeOn = () => {
    // Of the two edge-on directions, the one nearer the current view.
    const a1 = EDGE_AZ
    const a2 = wrap(EDGE_AZ + 180)
    turnTo(Math.abs(wrap(a1 - az)) <= Math.abs(wrap(a2 - az)) ? a1 : a2, 0)
  }
  const isEdge = Math.abs(el) < 0.5 && Math.min(Math.abs(wrap(az - EDGE_AZ)), Math.abs(wrap(az - EDGE_AZ - 180))) < 0.5

  const arrow = (p: V3, q: V3, color: string, width = 3) => {
    const [px, py] = toS(p)
    const [qx, qy] = toS(q)
    const len = Math.hypot(qx - px, qy - py)
    if (len < 2) return null
    const ux = (qx - px) / len
    const uy = (qy - py) / len
    const h = Math.min(11, len * 0.45)
    const bx = qx - h * ux
    const by = qy - h * uy
    return (
      <g>
        <line x1={px} y1={py} x2={bx} y2={by} stroke={color} strokeWidth={width} strokeLinecap="round" />
        <polygon points={`${qx},${qy} ${bx - 5 * uy},${by + 5 * ux} ${bx + 5 * uy},${by - 5 * ux}`} fill={color} />
      </g>
    )
  }
  // Label beside the middle of an arrow from O, on the side away from a given screen point.
  const beside = (tip: V3, awayFrom: P2, gap = 15, at = 0.55): P2 => {
    const [px, py] = toS(O)
    const [qx, qy] = toS(tip)
    const mx = px + at * (qx - px)
    const my = py + at * (qy - py)
    const len = Math.hypot(qx - px, qy - py) || 1
    let nx = -(qy - py) / len
    let ny = (qx - px) / len
    if ((mx + nx - awayFrom[0]) ** 2 + (my + ny - awayFrom[1]) ** 2 < (mx - nx - awayFrom[0]) ** 2 + (my - ny - awayFrom[1]) ** 2) {
      nx = -nx
      ny = -ny
    }
    return [mx + gap * nx, my + gap * ny]
  }

  const A: V3 = [2, 3, d]
  const gap = d + 14
  const inPlane = Math.abs(gap) < 0.25
  const aColor = inPlane ? C.good : C.violet
  const patchCentre = toD(CEN)

  const Tpt = toS(T)
  const Apt = toS(A)
  const aLabel = beside(A, patchCentre, 16, 0.62)
  // Below the green point when the tip is above it (the red gap runs upward), and vice versa.
  const tLabelAt: P2 = [Tpt[0], Tpt[1] + (d >= -14 ? 17 : -17)]

  let notice
  if (inPlane) {
    notice = (
      <Notice tone="good">
        <b>
          <M>{'d = -14'}</M>: the tip of <M>{V('a')}</M> lands on the plane
        </b>
        , at <M>{`4${V('b')} - ${V('c')}`}</M>. So <M>{`${V('a')} = 4${V('b')} - ${V('c')}`}</M> and all three vectors lie in
        one plane: linearly dependent. Turn the view. From every angle <M>{V('a')}</M> stays flat in the plane, and{' '}
        {isEdge ? 'edge-on it lies right along the line the plane has become.' : 'edge-on (button) it lies right along it.'}
      </Notice>
    )
  } else {
    notice = (
      <Notice tone={d === -10 ? 'warn' : 'neutral'}>
        {d === -10 && (
          <>
            <b>Option A, <M>{'d = -10'}</M>, misses.</b>{' '}
          </>
        )}
        The <M>{V('i')}</M> and <M>{V('j')}</M> parts of <M>{V('a')}</M> are fixed at <M>2</M> and <M>3</M>, so <M>d</M> only slides
        its tip along the dashed vertical line. That line meets the plane of <M>{V('b')}</M> and <M>{V('c')}</M> at exactly one
        point (green), <M>{`4${V('b')} - ${V('c')}`}</M>. The tip is <M>{num(Math.abs(gap), 1).replace(/\.0$/, '')}</M> units{' '}
        {gap > 0 ? 'above' : 'below'} it (red).{' '}
        {isEdge
          ? <>Edge-on, the plane is the slanted line: the tip is off it. Slide <M>d</M> until it lands on the line.</>
          : <>Slide <M>d</M> to close the gap, or look along the plane edge-on to see the tip is off it.</>}
      </Notice>
    )
  }

  return (
    <div>
      <div ref={ref} className="w-full">
        <div className="relative mx-auto text-gray-700 dark:text-gray-300" style={{ width: W, height: H }}>
          <svg
            width={W}
            height={H}
            viewBox={`0 0 ${W} ${H}`}
            className="block"
            role="img"
            aria-label="Three-dimensional view of the plane spanned by b = i + j − 4k and c = 2i + j − 2k, with a = 2i + 3j + dk and the vertical line its tip moves along"
          >
            {AXES.map(([p, q, name]) => (
              <path key={name} d={path([p, q])} stroke="currentColor" strokeOpacity={0.3} strokeWidth={1.2} fill="none" />
            ))}
            <path d={pathD(PATCH) + ' Z'} fill={C.guide} fillOpacity={0.2} stroke={C.guide} strokeOpacity={0.7} strokeWidth={1.2} />
            {GRID.map(([p, q], i) => (
              <path key={i} d={pathD([p, q])} stroke={C.guide} strokeOpacity={0.45} strokeWidth={0.9} fill="none" />
            ))}
            <path d={path(TRACK)} stroke="currentColor" strokeOpacity={0.55} strokeWidth={1.4} strokeDasharray="4 5" fill="none" />
            {/* 4b then −c: the combination that reaches the plane's point above (2, 3). */}
            <path d={path([O, mul(4, B)])} stroke={C.f} strokeWidth={1.6} strokeDasharray="6 4" fill="none" />
            <path d={path([mul(4, B), T])} stroke={C.g} strokeWidth={1.6} strokeDasharray="6 4" fill="none" />
            {arrow(O, B, C.f)}
            {arrow(O, CV, C.g)}
            {!inPlane && <path d={path([A, T])} stroke={C.bad} strokeWidth={3} fill="none" />}
            {arrow(O, A, aColor)}
            <circle cx={Tpt[0]} cy={Tpt[1]} r={4.5} fill={C.good} />
            <circle cx={toS(O)[0]} cy={toS(O)[1]} r={3} fill="currentColor" />
          </svg>
          {AXES.map(([, q, name]) => {
            const [x, y] = toS(q)
            const [ox, oy] = toS(O)
            const l = Math.hypot(x - ox, y - oy) || 1
            if (l < 12) return null
            const at: P2 = [x + (9 * (x - ox)) / l, y + (9 * (y - oy)) / l]
            // An axis name is only orientation: drop it when it would sit on a's tip or a vector's label.
            const crowded = [Apt, aLabel, Tpt, tLabelAt].some(([vx, vy]) => Math.abs(vx - at[0]) < 28 && Math.abs(vy - at[1]) < 18)
            if (crowded) return null
            return <Tag key={name} at={[x + (9 * (x - ox)) / l, y + (9 * (y - oy)) / l]} tex={name} />
          })}
          <Tag at={beside(B, patchCentre, 13, 0.45)} tex={V('b')} color={C.f} />
          <Tag at={beside(CV, Apt, 12, 0.95)} tex={V('c')} color={C.g} />
          <Tag at={aLabel} tex={V('a')} color={aColor} />
          {!inPlane && <Tag at={tLabelAt} tex={`4${V('b')}-${V('c')}`} color={C.good} />}
        </div>
      </div>
      <Controls>
        <Slider label="d" value={d} onChange={setD} min={D_MIN} max={D_MAX} step={0.5} format={v => num(v, 1).replace(/\.0$/, '')} />
        <Slider
          label="\text{turn}"
          value={az}
          onChange={v => {
            cancelAnimationFrame(raf.current)
            setAz(v)
          }}
          min={-180}
          max={180}
          step={1}
          format={v => `${Math.round(v)}°`}
        />
        <Buttons>
          <ActionButton label="Look along the plane (edge-on)" onClick={edgeOn} />
          <ActionButton label="Back to the 3D view" onClick={() => turnTo(150, 20)} />
          <ActionButton label={<>Try option A, <Katex tex="d=-10" /></>} onClick={() => setD(-10)} />
        </Buttons>
        <Readouts>
          <Readout tex={`${V('a')} - \\left(4${V('b')} - ${V('c')}\\right) = (d+14)\\,${V('k')} = ${num(gap, 1).replace(/\.0$/, '')}\\,${V('k')}`} color={inPlane ? C.good : C.bad} />
        </Readouts>
      </Controls>
      {notice}
      <p className="mt-1 text-[11.5px] text-gray-500 dark:text-gray-400">
        Heights are drawn at a quarter of their size so everything fits. Squashing one direction never changes whether
        vectors lie in a plane.
      </p>
    </div>
  )
}
