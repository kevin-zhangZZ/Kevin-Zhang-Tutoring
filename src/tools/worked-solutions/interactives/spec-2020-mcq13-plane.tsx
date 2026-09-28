// 2020 Specialist Exam 2 MCQ 13 — three vectors in space are linearly dependent exactly when they
// lie in one plane through the origin. a = i + 2j − k and c = i + k are not parallel, so every
// combination ma + nc fills a plane (the shaded sheet, with its lattice of whole-number m and n). As
// λ changes, the tip of b = λi + 3j + 2k slides along the dashed line parallel to the x-axis and
// pierces the sheet at one point only: λ = 5, where b = 3/2 a + 7/2 c = 5i + 3j + 2k. Turn the view,
// or press "Look along the plane" to see the sheet edge-on as a single line with b's tip off it (or,
// at λ = 5, on it). A toggle builds 3/2 a + 7/2 c tip to tail: the j and k equations fix m = 3/2 and
// n = 7/2 whatever λ is, and the gap left over is (λ − 5)i — the i equation m + n = λ. The readout
// is the tip's distance from the plane, |λ − 5|/√3 (b · (a × c) = 2λ − 10, |a × c| = 2√3).
//
// A 3D scene, so it is drawn as its own SVG (an orthographic view from azimuth θ, elevation 30°),
// not on a mafs coordinate plane: a plane's own x/y axes would mean nothing here. Labels are KaTeX
// laid over the SVG so the vectors carry their tildes. Parts of the scene behind the translucent
// sheet are drawn before it, parts in front after it, so the sheet tints what is behind it.

import { useEffect, useRef, useState } from 'react'
import { ActionButton, Buttons, C, Controls, Katex, M, Notice, Readout, Readouts, Slider, Toggle } from './kit'

type V3 = readonly [number, number, number]
type P2 = readonly [number, number]
const add = (p: V3, q: V3): V3 => [p[0] + q[0], p[1] + q[1], p[2] + q[2]]
const mul = (k: number, p: V3): V3 => [k * p[0], k * p[1], k * p[2]]
const dot = (p: V3, q: V3) => p[0] * q[0] + p[1] * q[1] + p[2] * q[2]

const O: V3 = [0, 0, 0]
const A: V3 = [1, 2, -1]
const CV: V3 = [1, 0, 1]
const bOf = (l: number): V3 => [l, 3, 2]
const HALF_A: V3 = mul(1.5, A) // 3/2 a = (1.5, 3, −1.5)
const P: V3 = add(HALF_A, mul(3.5, CV)) // 3/2 a + 7/2 c = (5, 3, 2)
/** Normal to the plane of a and c: a × c = (2, −2, −2), halved. Its dot product with b is λ − 5. */
const NORMAL: V3 = [1, -1, -1]
const side = (p: V3) => dot(NORMAL, p)

const AXIS = 5.2
const L_MIN = 0
const L_MAX = 8
const LINE: [number, number] = [-0.6, 8.6]
/** The sheet: s·a + t·c for s, t in these ranges (it holds O, a, c and 3/2 a + 7/2 c). */
const S_RANGE: [number, number] = [-0.5, 2]
const T_RANGE: [number, number] = [-0.5, 4.2]
const sheet = (s: number, t: number) => add(mul(s, A), mul(t, CV))
const CORNERS: V3[] = [
  sheet(S_RANGE[0], T_RANGE[0]),
  sheet(S_RANGE[1], T_RANGE[0]),
  sheet(S_RANGE[1], T_RANGE[1]),
  sheet(S_RANGE[0], T_RANGE[1]),
]

// The camera: azimuth θ (the slider), elevation fixed at 30°.
const PHI = Math.PI / 6
function view(thetaDeg: number) {
  const t = (thetaDeg * Math.PI) / 180
  const e1: V3 = [-Math.sin(t), Math.cos(t), 0]
  const e2: V3 = [-Math.sin(PHI) * Math.cos(t), -Math.sin(PHI) * Math.sin(t), Math.cos(PHI)]
  const w: V3 = [Math.cos(PHI) * Math.cos(t), Math.cos(PHI) * Math.sin(t), Math.sin(PHI)]
  return { e1, e2, w }
}
/** The view direction lies in the plane (edge-on) when w · (1, −1, −1) = 0, i.e.
 *  cos θ − sin θ = tan φ: θ = −45° ± arccos(tan φ / √2) ≈ 20.9° or −110.9°. */
const EDGE = (() => {
  const d = (Math.acos(Math.tan(PHI) / Math.SQRT2) * 180) / Math.PI
  return [-45 + d, -45 - d]
})()
const START_THETA = -140
const wrap = (deg: number) => ((((deg + 180) % 360) + 360) % 360) - 180

/** The scene turns about the middle of its bounding box, not the origin, so the frame is as tight as it can be. */
const MID: V3 = [3.8, 2.1, 1.35]
const rel = (p: V3): V3 => add(p, mul(-1, MID))

// One fixed frame for every view, so turning the picture never rescales it.
const BOUNDS = (() => {
  const pts: V3[] = [O, [AXIS, 0, 0], [0, AXIS, 0], [0, 0, AXIS], ...CORNERS, bOf(LINE[0]), bOf(LINE[1]), P, HALF_A]
  let u0 = Infinity
  let u1 = -Infinity
  let v0 = Infinity
  let v1 = -Infinity
  for (let th = -180; th <= 180; th += 2) {
    const { e1, e2 } = view(th)
    for (const p of pts) {
      const u = dot(rel(p), e1)
      const v = dot(rel(p), e2)
      u0 = Math.min(u0, u)
      u1 = Math.max(u1, u)
      v0 = Math.min(v0, v)
      v1 = Math.max(v1, v)
    }
  }
  return { u0, u1, v0, v1 }
})()

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

/** Animate θ to a target over about a second (eased), so the student sees the scene turn. */
function useTurn(setTheta: (v: number) => void) {
  const raf = useRef(0)
  useEffect(() => () => cancelAnimationFrame(raf.current), [])
  const stop = () => cancelAnimationFrame(raf.current)
  const go = (from: number, to: number) => {
    stop()
    const t0 = performance.now()
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 1100)
      const e = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2
      setTheta(p < 1 ? from + (to - from) * e : wrap(to))
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
  }
  return { go, stop }
}

function Arrow({ from, to, color, width = 2.4, dash, opacity = 1 }: { from: P2; to: P2; color: string; width?: number; dash?: string; opacity?: number }) {
  const dx = to[0] - from[0]
  const dy = to[1] - from[1]
  const len = Math.hypot(dx, dy)
  if (len < 0.5) return null
  const ux = dx / len
  const uy = dy / len
  const head = Math.min(9, len * 0.45)
  const bx = to[0] - ux * head
  const by = to[1] - uy * head
  const hw = head * 0.48
  return (
    <g opacity={opacity}>
      <line x1={from[0]} y1={from[1]} x2={bx + ux * 1} y2={by + uy * 1} stroke={color} strokeWidth={width} strokeDasharray={dash} strokeLinecap="round" />
      <polygon points={`${to[0]},${to[1]} ${bx - uy * hw},${by + ux * hw} ${bx + uy * hw},${by - ux * hw}`} fill={color} />
    </g>
  )
}

/** A KaTeX label laid over the SVG, centred on a point in px. */
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

const OPTION: Record<number, string> = { 1: 'A', 2: 'B', 3: 'C', 4: 'D', 5: 'E' }
const fmt = (v: number) => v.toFixed(1).replace('-', '−')

export default function LinearDependence() {
  const [ref, width] = useWidth()
  const [lambda, setLambda] = useState(2)
  const [theta, setTheta] = useState(START_THETA)
  const [recipe, setRecipe] = useState(false)
  const turn = useTurn(setTheta)

  const PAD = 16
  const W = Math.min(width || 340, 560)
  const S = (W - 2 * PAD) / (BOUNDS.u1 - BOUNDS.u0)
  const H = Math.round(S * (BOUNDS.v1 - BOUNDS.v0) + 2 * PAD)
  const { e1, e2, w } = view(theta)
  const X = (p: V3): P2 => [PAD + S * (dot(rel(p), e1) - BOUNDS.u0), PAD + S * (BOUNDS.v1 - dot(rel(p), e2))]
  /** A label position: just past the end of the arrow from `from` to `to`, along its direction on screen. */
  const past = (from: V3, to: V3, gap = 13): P2 => {
    const a = X(from)
    const b = X(to)
    const len = Math.hypot(b[0] - a[0], b[1] - a[1])
    if (len < 1) return [b[0], b[1] - gap]
    return [b[0] + ((b[0] - a[0]) / len) * gap, b[1] + ((b[1] - a[1]) / len) * gap]
  }

  const onPlane = Math.abs(lambda - 5) < 0.05
  const facing = dot(w, NORMAL) / Math.sqrt(3) // cos of the angle between the view and the plane's normal
  const edgeOn = Math.abs(facing) < 0.02
  const camSide = Math.sign(facing) || 1
  /** Which layer an object on side `s` of the plane goes in: behind the sheet, in it, or in front. */
  const layer = (s: number) => (Math.abs(s) < 1e-9 ? 'in' : s * camSide > 0 ? 'front' : 'back')

  const tip = bOf(lambda)
  const bColor = onPlane ? C.good : C.g
  const ink = 'currentColor'

  type Item = { key: string; side: number; el: JSX.Element }
  const items: Item[] = [
    { key: 'x', side: side([1, 0, 0]), el: <line x1={X(O)[0]} y1={X(O)[1]} x2={X([AXIS, 0, 0])[0]} y2={X([AXIS, 0, 0])[1]} stroke={ink} strokeOpacity={0.45} strokeWidth={1.3} /> },
    { key: 'y', side: side([0, 1, 0]), el: <line x1={X(O)[0]} y1={X(O)[1]} x2={X([0, AXIS, 0])[0]} y2={X([0, AXIS, 0])[1]} stroke={ink} strokeOpacity={0.45} strokeWidth={1.3} /> },
    { key: 'z', side: side([0, 0, 1]), el: <line x1={X(O)[0]} y1={X(O)[1]} x2={X([0, 0, AXIS])[0]} y2={X([0, 0, AXIS])[1]} stroke={ink} strokeOpacity={0.45} strokeWidth={1.3} /> },
    // The line of every possible tip of b, split where it pierces the sheet (λ = 5).
    { key: 'line-lo', side: -1, el: <line x1={X(bOf(LINE[0]))[0]} y1={X(bOf(LINE[0]))[1]} x2={X(P)[0]} y2={X(P)[1]} stroke={C.g} strokeOpacity={0.6} strokeWidth={1.5} strokeDasharray="5 4" /> },
    { key: 'line-hi', side: 1, el: <line x1={X(P)[0]} y1={X(P)[1]} x2={X(bOf(LINE[1]))[0]} y2={X(bOf(LINE[1]))[1]} stroke={C.g} strokeOpacity={0.6} strokeWidth={1.5} strokeDasharray="5 4" /> },
    {
      key: 'b',
      side: onPlane ? 0 : lambda - 5,
      el: (
        <>
          <Arrow from={X(O)} to={X(tip)} color={bColor} width={2.8} />
          <circle cx={X(tip)[0]} cy={X(tip)[1]} r={3.2} fill={bColor} />
        </>
      ),
    },
  ]
  if (!onPlane && !recipe) {
    // The perpendicular from b's tip to the plane: its length is the readout's distance.
    const foot = add(tip, mul(-(lambda - 5) / 3, NORMAL))
    items.push({
      key: 'drop',
      side: lambda - 5,
      el: (
        <>
          <line x1={X(tip)[0]} y1={X(tip)[1]} x2={X(foot)[0]} y2={X(foot)[1]} stroke={C.bad} strokeWidth={1.8} strokeDasharray="3 3" />
          <circle cx={X(foot)[0]} cy={X(foot)[1]} r={2.6} fill={C.bad} />
        </>
      ),
    })
  }
  if (recipe && !onPlane) {
    items.push({ key: 'gap', side: lambda - 5, el: <line x1={X(P)[0]} y1={X(P)[1]} x2={X(tip)[0]} y2={X(tip)[1]} stroke={C.bad} strokeWidth={3} strokeLinecap="round" /> })
  }

  // The lattice of whole-number combinations on the sheet.
  const lattice: JSX.Element[] = []
  for (let s = 0; s <= 2; s++) {
    const p = X(sheet(s, T_RANGE[0]))
    const q = X(sheet(s, T_RANGE[1]))
    lattice.push(<line key={`s${s}`} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={C.f} strokeOpacity={0.28} strokeWidth={1} />)
  }
  for (let t = 0; t <= 4; t++) {
    const p = X(sheet(S_RANGE[0], t))
    const q = X(sheet(S_RANGE[1], t))
    lattice.push(<line key={`t${t}`} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={C.f} strokeOpacity={0.28} strokeWidth={1} />)
  }
  const sheetPts = CORNERS.map(p => X(p).join(',')).join(' ')

  const inPlane = (
    <g>
      <polygon points={sheetPts} fill={C.f} fillOpacity={0.14} stroke={C.f} strokeOpacity={0.55} strokeWidth={1.2} />
      {lattice}
      {recipe && (
        <>
          <Arrow from={X(O)} to={X(HALF_A)} color={C.f} width={2} dash="6 4" />
          <Arrow from={X(HALF_A)} to={X(P)} color={C.violet} width={2} dash="6 4" />
        </>
      )}
      <Arrow from={X(O)} to={X(A)} color={C.f} width={2.8} />
      <Arrow from={X(O)} to={X(CV)} color={C.violet} width={2.8} />
      <circle cx={X(P)[0]} cy={X(P)[1]} r={5} stroke={C.good} strokeWidth={2} className="fill-white dark:fill-gray-900" fillOpacity={0.9} />
      <circle cx={X(O)[0]} cy={X(O)[1]} r={2.6} fill={ink} />
    </g>
  )

  const r = Math.round(lambda)
  const optionNote = Math.abs(lambda - r) < 0.05 && OPTION[r] ? ` (option ${OPTION[r]})` : ''

  let notice
  if (onPlane) {
    notice = (
      <Notice tone="good">
        <b>
          <M>\lambda = 5</M>: the tip of <M>{'\\underset{\\sim}{b}'}</M> is in the plane.
        </b>{' '}
        So <M>{'\\underset{\\sim}{b} = \\tfrac32\\underset{\\sim}{a} + \\tfrac72\\underset{\\sim}{c}'}</M>: <M>{'\\underset{\\sim}{b}'}</M> can be
        built from <M>{'\\underset{\\sim}{a}'}</M> and <M>{'\\underset{\\sim}{c}'}</M>, which is exactly what linearly dependent means.
        Three vectors in space are dependent when they lie in one plane through <M>O</M>.{' '}
        {edgeOn ? (
          <>Seen edge-on, the plane is a line and <M>{'\\underset{\\sim}{b}'}</M> lies right along it.</>
        ) : (
          <>Press &ldquo;Look along the plane&rdquo; to check it edge-on.</>
        )}
      </Notice>
    )
  } else if (edgeOn) {
    notice = (
      <Notice>
        <b>Edge-on, the whole plane of <M>{'\\underset{\\sim}{a}'}</M> and <M>{'\\underset{\\sim}{c}'}</M> is one line through <M>O</M></b>:
        every combination <M>{'m\\underset{\\sim}{a} + n\\underset{\\sim}{c}'}</M> lands on it. At <M>{`\\lambda = ${fmt(lambda)}`}</M>
        {optionNote} the tip of <M>{'\\underset{\\sim}{b}'}</M> is off that line, on one side of the plane, so no <M>m</M> and <M>n</M>{' '}
        give <M>{'\\underset{\\sim}{b}'}</M>. Slide <M>\lambda</M>: the tip crosses the line only at <M>\lambda = 5</M>.
      </Notice>
    )
  } else if (recipe) {
    notice = (
      <Notice>
        <b>The <M>{'\\underset{\\sim}{j}'}</M> and <M>{'\\underset{\\sim}{k}'}</M> parts fix the recipe</b>: <M>2m = 3</M> and{' '}
        <M>-m + n = 2</M> give <M>{'m = \\tfrac32'}</M> and <M>{'n = \\tfrac72'}</M>, whatever <M>\lambda</M> is. Following{' '}
        <M>{'\\tfrac32\\underset{\\sim}{a}'}</M> then <M>{'\\tfrac72\\underset{\\sim}{c}'}</M> (dashed) always ends at{' '}
        <M>{'5\\underset{\\sim}{i} + 3\\underset{\\sim}{j} + 2\\underset{\\sim}{k}'}</M>, the green ring. <M>{'\\underset{\\sim}{b}'}</M> misses it
        by <M>{`(\\lambda - 5)\\underset{\\sim}{i} = ${fmt(lambda - 5)}\\underset{\\sim}{i}`}</M>, the red gap. Only the <M>{'\\underset{\\sim}{i}'}</M>{' '}
        equation <M>m + n = \lambda</M> can close it, and only when <M>\lambda = 5</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The blue sheet is <b>every combination <M>{'m\\underset{\\sim}{a} + n\\underset{\\sim}{c}'}</M></b>: two non-parallel vectors from{' '}
        <M>O</M> span a plane (the faint lines are whole-number <M>m</M> and <M>n</M>). Changing <M>\lambda</M> slides the tip of{' '}
        <M>{'\\underset{\\sim}{b}'}</M> along the dashed line, parallel to the <M>x</M>-axis. At <M>{`\\lambda = ${fmt(lambda)}`}</M>
        {optionNote} the tip is {layer(lambda - 5) === 'back' ? 'behind' : 'in front of'} the sheet, not on it (the red dotted line drops from the tip to the sheet), so{' '}
        <M>{'\\underset{\\sim}{b}'}</M> can&apos;t be made from <M>{'\\underset{\\sim}{a}'}</M> and <M>{'\\underset{\\sim}{c}'}</M>. Slide{' '}
        <M>\lambda</M> until the tip meets the sheet, or turn the view to see the depth.
      </Notice>
    )
  }

  const order = (l: 'back' | 'in' | 'front') => items.filter(it => layer(it.side) === l).map(it => <g key={it.key}>{it.el}</g>)

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
            aria-label={`Three-dimensional view: the plane through the origin containing a = i + 2j − k and c = i + k, and b = ${fmt(lambda)}i + 3j + 2k, whose tip lies on a line parallel to the x-axis that meets the plane at (5, 3, 2)`}
          >
            {order('back')}
            {inPlane}
            {order('in')}
            {order('front')}
          </svg>
          <Tag at={past(O, [AXIS, 0, 0], 10)} tex="x" />
          <Tag at={past(O, [0, AXIS, 0], 10)} tex="y" />
          <Tag at={past(O, [0, 0, AXIS], 10)} tex="z" />
          <Tag at={past(O, A)} tex="\underset{\sim}{a}" color={C.f} />
          <Tag at={past(O, CV)} tex="\underset{\sim}{c}" color={C.violet} />
          <Tag at={past(O, tip)} tex="\underset{\sim}{b}" color={bColor} />
        </div>
      </div>
      <Controls>
        <Slider
          label="\lambda"
          value={lambda}
          onChange={v => setLambda(Math.round(v * 10) / 10)}
          min={L_MIN}
          max={L_MAX}
          step={0.1}
          format={v => fmt(v)}
        />
        <Slider
          label="\text{turn}"
          value={wrap(theta)}
          onChange={v => {
            turn.stop()
            setTheta(v)
          }}
          min={-180}
          max={180}
          step={1}
          format={v => `${Math.round(v)}°`.replace('-', '−')}
        />
        <Buttons>
          {edgeOn ? (
            <ActionButton label="Back to the 3D view" onClick={() => turn.go(theta, START_THETA)} />
          ) : (
            <ActionButton
              label="Look along the plane"
              onClick={() => {
                const steps = EDGE.map(e => wrap(e - theta))
                const d = Math.abs(steps[0]) <= Math.abs(steps[1]) ? steps[0] : steps[1]
                turn.go(theta, theta + d)
              }}
            />
          )}
          <Toggle label="Build 3/2 a + 7/2 c" checked={recipe} onChange={setRecipe} />
        </Buttons>
        <Readouts>
          <Readout color={bColor} tex={`\\underset{\\sim}{b} = ${fmt(lambda)}\\underset{\\sim}{i} + 3\\underset{\\sim}{j} + 2\\underset{\\sim}{k}`} />
          {recipe ? (
            <Readout
              color={onPlane ? C.good : C.bad}
              tex={`\\underset{\\sim}{b} - \\left(\\tfrac32\\underset{\\sim}{a} + \\tfrac72\\underset{\\sim}{c}\\right) = ${fmt(lambda - 5)}\\underset{\\sim}{i}`}
            />
          ) : (
            <Readout
              color={onPlane ? C.good : undefined}
              tex={`\\text{tip's distance from the plane} = \\tfrac{|\\lambda - 5|}{\\sqrt3} \\approx ${(Math.abs(lambda - 5) / Math.sqrt(3)).toFixed(2)}`}
            />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
