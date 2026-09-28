// 2017 Specialist Exam 1 Q5 — the angle between two vectors is the angle at their common tail, so the
// angle at C needs two arrows that start at C. The scene is the question's own points with the answer
// a = −2: O, B(1, −1, 2), C(2, −1, 1) and D(−2, −2, 0). Three buttons pick a pair of vectors and mark
// the angle that pair actually measures, with its dot product worked out:
//   CB and CD (tail to tail at C): CB·CD = 3, cos θ = 1/2, θ = π/3 — angle BCD itself;
//   b and d (the position vectors, tails at O): b·d = 0, a right angle — angle BOD, at the origin;
//   BC and CD (head to tail): BC·CD = −3, cos θ = −1/2, θ = 2π/3 — slide BC so its tail is at C (dashed)
//   and it points away from B, so the angle it makes with CD is the outside angle π − π/3.
// The view can be turned, or turned square-on to the plane of the marked angle so it shows at true size.
//
// A 3D scene, so it is drawn as its own SVG (an orthographic view from azimuth/elevation), not on a
// mafs coordinate plane. Labels are KaTeX laid over the SVG.

import { useEffect, useRef, useState } from 'react'
import { ActionButton, Buttons, C, Controls, Katex, M, Notice, Readout, Readouts, Slider, Toggle } from './kit'

type V3 = readonly [number, number, number]
type P2 = readonly [number, number]
const add = (p: V3, q: V3): V3 => [p[0] + q[0], p[1] + q[1], p[2] + q[2]]
const sub = (p: V3, q: V3): V3 => [p[0] - q[0], p[1] - q[1], p[2] - q[2]]
const mul = (k: number, p: V3): V3 => [k * p[0], k * p[1], k * p[2]]
const dot = (p: V3, q: V3) => p[0] * q[0] + p[1] * q[1] + p[2] * q[2]
const cross = (p: V3, q: V3): V3 => [p[1] * q[2] - p[2] * q[1], p[2] * q[0] - p[0] * q[2], p[0] * q[1] - p[1] * q[0]]
const unit = (p: V3): V3 => mul(1 / Math.sqrt(dot(p, p)), p)

const A = -2
const O: V3 = [0, 0, 0]
const B: V3 = [1, -1, 2]
const CP: V3 = [2, -1, 1]
const D: V3 = [A, -2, 0]
/** C + BC: where BC ends once it is slid along so that its tail sits at C. */
const E: V3 = add(CP, sub(CP, B))

const AX = 2.6
const AXES: [V3, V3, string][] = [
  [[-AX, 0, 0], [AX, 0, 0], 'x'],
  [[0, -AX, 0], [0, AX, 0], 'y'],
  [[0, 0, -1], [0, 0, AX], 'z'],
]

type Mode = 'CB' | 'bd' | 'BC'
interface Pair {
  vertex: V3
  /** The two arrows as [tail, tip, label]. */
  one: [V3, V3, string]
  two: [V3, V3, string]
  /** Directions of the two arms of the marked angle (from the vertex). */
  arm1: V3
  arm2: V3
  angle: string
  good: boolean
}
const PAIRS: Record<Mode, Pair> = {
  CB: {
    vertex: CP,
    one: [CP, B, '\\overrightarrow{CB}'],
    two: [CP, D, '\\overrightarrow{CD}'],
    arm1: sub(B, CP),
    arm2: sub(D, CP),
    angle: '\\tfrac{\\pi}{3}',
    good: true,
  },
  bd: {
    vertex: O,
    one: [O, B, '\\underset{\\sim}{b}'],
    two: [O, D, '\\underset{\\sim}{d}'],
    arm1: B,
    arm2: D,
    angle: '\\tfrac{\\pi}{2}',
    good: false,
  },
  BC: {
    vertex: CP,
    one: [B, CP, '\\overrightarrow{BC}'],
    two: [CP, D, '\\overrightarrow{CD}'],
    arm1: sub(CP, B),
    arm2: sub(D, CP),
    angle: '\\tfrac{2\\pi}{3}',
    good: false,
  },
}

// Frame: every view fits in the sphere around the scene's middle, so turning never rescales it.
const ALL: V3[] = [O, B, CP, D, E, ...AXES.flatMap(([p, q]) => [p, q])]
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
  const w: V3 = [Math.cos(f) * Math.cos(t), Math.cos(f) * Math.sin(t), Math.sin(f)]
  return { e1, e2, w }
}
const wrap = (deg: number) => ((((deg + 180) % 360) + 360) % 360) - 180

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

const READOUTS: Record<Mode, { tex: string; color?: string }[]> = {
  CB: [
    { tex: '\\overrightarrow{CB} = -\\underset{\\sim}{i}+\\underset{\\sim}{k}', color: C.f },
    { tex: '\\overrightarrow{CD} = -4\\underset{\\sim}{i}-\\underset{\\sim}{j}-\\underset{\\sim}{k}', color: C.g },
    { tex: '\\overrightarrow{CB}\\cdot\\overrightarrow{CD} = 4+0-1 = 3' },
    { tex: '\\cos\\theta = \\tfrac{3}{\\sqrt2\\times3\\sqrt2} = \\tfrac12,\\ \\theta = \\tfrac{\\pi}{3}', color: C.good },
  ],
  bd: [
    { tex: '\\underset{\\sim}{b} = \\underset{\\sim}{i}-\\underset{\\sim}{j}+2\\underset{\\sim}{k}', color: C.f },
    { tex: '\\underset{\\sim}{d} = -2\\underset{\\sim}{i}-2\\underset{\\sim}{j}', color: C.g },
    { tex: '\\underset{\\sim}{b}\\cdot\\underset{\\sim}{d} = -2+2+0 = 0' },
    { tex: '\\theta = \\tfrac{\\pi}{2}\\ (\\text{angle } BOD)', color: C.bad },
  ],
  BC: [
    { tex: '\\overrightarrow{BC} = \\underset{\\sim}{i}-\\underset{\\sim}{k}', color: C.f },
    { tex: '\\overrightarrow{CD} = -4\\underset{\\sim}{i}-\\underset{\\sim}{j}-\\underset{\\sim}{k}', color: C.g },
    { tex: '\\overrightarrow{BC}\\cdot\\overrightarrow{CD} = -4+0+1 = -3' },
    { tex: '\\cos\\theta = \\tfrac{-3}{\\sqrt2\\times3\\sqrt2} = -\\tfrac12,\\ \\theta = \\tfrac{2\\pi}{3}', color: C.bad },
  ],
}

export default function TailToTail() {
  const [ref, width] = useWidth()
  const [mode, setMode] = useState<Mode>('CB')
  const [az, setAz] = useState(-62)
  const [el, setEl] = useState(20)
  const raf = useRef(0)
  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  const W = Math.min(width || 340, 600)
  const H = Math.min(320, Math.max(260, W))
  const PAD = 14
  const S = (Math.min(W, H) - 2 * PAD) / (2 * RADIUS)
  const { e1, e2, w } = view(az, el)
  const toS = (p: V3): P2 => {
    const r = sub(p, MID)
    return [W / 2 + S * dot(r, e1), H / 2 - S * dot(r, e2)]
  }
  const path = (pts: V3[]) => pts.map(toS).map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')

  const pair = PAIRS[mode]
  const arcColor = pair.good ? C.good : C.bad

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
  const faceOn = () => {
    let n = unit(cross(pair.arm1, pair.arm2))
    if (dot(n, w) < 0) n = mul(-1, n)
    turnTo((Math.atan2(n[1], n[0]) * 180) / Math.PI, (Math.asin(n[2]) * 180) / Math.PI)
  }

  // Arrow in screen space: a line to the base of a filled head.
  const arrow = (p: V3, q: V3, color: string, dashed = false) => {
    const [px, py] = toS(p)
    const [qx, qy] = toS(q)
    const len = Math.hypot(qx - px, qy - py)
    if (len < 2) return null
    const ux = (qx - px) / len
    const uy = (qy - py) / len
    const bx = qx - 11 * ux
    const by = qy - 11 * uy
    return (
      <g>
        <line x1={px} y1={py} x2={bx} y2={by} stroke={color} strokeWidth={3} strokeDasharray={dashed ? '6 5' : undefined} strokeLinecap="round" />
        <polygon points={`${qx},${qy} ${bx - 5 * uy},${by + 5 * ux} ${bx + 5 * uy},${by - 5 * ux}`} fill={color} />
      </g>
    )
  }

  // The marked angle: an arc between the two arms, drawn in 3D and projected.
  const u1 = unit(pair.arm1)
  const u2 = unit(pair.arm2)
  const th = Math.acos(Math.max(-1, Math.min(1, dot(u1, u2))))
  const r = mode === 'bd' ? 0.6 : 0.5
  const arcPts: V3[] = []
  for (let i = 0; i <= 30; i++) {
    const t = i / 30
    const dir = add(mul(Math.sin((1 - t) * th) / Math.sin(th), u1), mul(Math.sin(t * th) / Math.sin(th), u2))
    arcPts.push(add(pair.vertex, mul(r, dir)))
  }
  const bis = unit(add(u1, u2))
  const angleAt = toS(add(pair.vertex, mul(r + 0.42, bis)))

  // Point labels pushed away from the middle of the four points, on screen.
  const centre = [O, B, CP, D].map(toS).reduce((s, p) => [s[0] + p[0] / 4, s[1] + p[1] / 4] as P2, [0, 0] as P2)
  const away = (p: V3, gap = 13): P2 => {
    const [x, y] = toS(p)
    const dx = x - centre[0]
    const dy = y - centre[1]
    const l = Math.hypot(dx, dy) || 1
    return [x + (gap * dx) / l, y + (gap * dy) / l]
  }
  // Vector labels beside the middle of each arrow, on the side away from the other arrow.
  const beside = (arr: [V3, V3, string], other: [V3, V3, string]): P2 => {
    const [px, py] = toS(arr[0])
    const [qx, qy] = toS(arr[1])
    const mx = (px + qx) / 2
    const my = (py + qy) / 2
    const len = Math.hypot(qx - px, qy - py) || 1
    let nx = -(qy - py) / len
    let ny = (qx - px) / len
    const [ox, oy] = toS(add(mul(0.5, other[0]), mul(0.5, other[1])))
    if ((mx + nx - ox) ** 2 + (my + ny - oy) ** 2 < (mx - nx - ox) ** 2 + (my - ny - oy) ** 2) {
      nx = -nx
      ny = -ny
    }
    return [mx + 15 * nx, my + 15 * ny]
  }

  let notice
  if (mode === 'CB') {
    notice = (
      <Notice tone="good">
        <b>Both arrows start at <M>C</M></b>, the vertex of angle <M>BCD</M> (the middle letter). Each is &ldquo;end minus
        start&rdquo;: <M>{'\\overrightarrow{CB} = \\underset{\\sim}{b} - \\underset{\\sim}{c}'}</M>. With the answer{' '}
        <M>a = -2</M> their dot product is positive and the angle between them is exactly <M>{'\\tfrac{\\pi}{3}'}</M>. Press
        the other two buttons to see what the common slips actually measure.
      </Notice>
    )
  } else if (mode === 'bd') {
    notice = (
      <Notice tone="warn">
        <M>{'\\underset{\\sim}{b}'}</M> and <M>{'\\underset{\\sim}{d}'}</M> are position vectors: <b>both start at the origin
        <M>O</M>, not at <M>C</M></b>. The angle between them is angle <M>BOD</M>, and here{' '}
        <M>{'\\underset{\\sim}{b}\\cdot\\underset{\\sim}{d} = 0'}</M>, a right angle at <M>O</M>: nothing to do with the angle
        at <M>C</M>. Unless the vertex is <M>O</M>, subtract position vectors to get arrows that start at the vertex.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <M>{'\\overrightarrow{BC}'}</M> <b>ends</b> at <M>C</M>, so it and <M>{'\\overrightarrow{CD}'}</M> are head to tail.
        The angle between two vectors is measured tail to tail: slide <M>{'\\overrightarrow{BC}'}</M> along until its tail
        sits at <M>C</M> (dashed). It now points <em>away</em> from <M>B</M>, so the angle it makes with{' '}
        <M>{'\\overrightarrow{CD}'}</M> is the outside angle, <M>{'\\pi - \\tfrac{\\pi}{3} = \\tfrac{2\\pi}{3}'}</M>, and the dot
        product has the opposite sign. Reverse the arrow (use <M>{'\\overrightarrow{CB}'}</M>) to get the angle inside the
        triangle.
      </Notice>
    )
  }

  const one = pair.one
  const two = pair.two
  // The position vectors, faint, unless they are the pair being shown.
  const guides: [V3, V3][] = mode === 'bd' ? [[O, CP]] : [[O, B], [O, CP], [O, D]]

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
            aria-label="Three-dimensional view of the origin O and the points B(1, −1, 2), C(2, −1, 1) and D(−2, −2, 0), with the chosen pair of vectors and the angle between them marked"
          >
            {AXES.map(([p, q, name]) => (
              <path key={name} d={path([p, q])} stroke="currentColor" strokeOpacity={0.35} strokeWidth={1.2} fill="none" />
            ))}
            {guides.map(([p, q], i) => (
              <path key={i} d={path([p, q])} stroke={C.guide} strokeWidth={1.3} strokeDasharray="3 4" fill="none" />
            ))}
            <path d={path([B, CP, D, B])} stroke="currentColor" strokeOpacity={0.45} strokeWidth={1.5} fill="none" />
            {mode === 'BC' && (
              arrow(CP, E, C.f, true)
            )}
            {arrow(one[0], one[1], C.f)}
            {arrow(two[0], two[1], C.g)}
            <path d={path(arcPts)} stroke={arcColor} strokeWidth={2.5} fill="none" />
            {[O, B, CP, D].map((p, i) => {
              const [x, y] = toS(p)
              return <circle key={i} cx={x} cy={y} r={3.5} fill="currentColor" />
            })}
          </svg>
          {AXES.map(([, q, name]) => {
            const [x, y] = toS(q)
            const [ox, oy] = toS(O)
            const l = Math.hypot(x - ox, y - oy) || 1
            const at: P2 = [x + (10 * (x - ox)) / l, y + (10 * (y - oy)) / l]
            // An axis name is only orientation: drop it when a vector's label would sit on top of it.
            const crowded = [beside(one, two), beside(two, one), angleAt].some(
              ([vx, vy]) => Math.abs(vx - at[0]) < 30 && Math.abs(vy - at[1]) < 18,
            )
            return crowded ? null : <Tag key={name} at={at} tex={name} />
          })}
          <Tag at={away(O)} tex="O" />
          <Tag at={away(B)} tex="B" />
          <Tag at={away(CP)} tex="C" />
          <Tag at={away(D)} tex="D" />
          <Tag at={beside(one, two)} tex={one[2]} color={C.f} />
          <Tag at={beside(two, one)} tex={two[2]} color={C.g} />
          <Tag at={angleAt} tex={pair.angle} color={arcColor} />
        </div>
      </div>
      <Controls>
        <Buttons>
          <Toggle label={<>Tail to tail: <Katex tex="\overrightarrow{CB},\ \overrightarrow{CD}" /></>} checked={mode === 'CB'} onChange={() => setMode('CB')} />
          <Toggle label={<>Position vectors: <Katex tex="\underset{\sim}{b},\ \underset{\sim}{d}" /></>} checked={mode === 'bd'} onChange={() => setMode('bd')} />
          <Toggle label={<>Head to tail: <Katex tex="\overrightarrow{BC},\ \overrightarrow{CD}" /></>} checked={mode === 'BC'} onChange={() => setMode('BC')} />
        </Buttons>
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
          <ActionButton label="Look square-on to the marked angle" onClick={faceOn} />
        </Buttons>
        <Readouts>
          {READOUTS[mode].map(rd => (
            <Readout key={rd.tex} tex={rd.tex} color={rd.color} />
          ))}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
