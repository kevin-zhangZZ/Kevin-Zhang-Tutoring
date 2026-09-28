// 2019 Specialist Exam 2 Q4e — the height of the pyramid is how far the apex P rises in the
// direction of the unit normal n̂ = (6i + 2j + 5k)/√65, i.e. the scalar resolute XP · n̂ of a
// vector that STARTS ON THE BASE. The scene is drawn with the base flat (n̂ straight up), from the
// question's own coordinates. Pick where the slant edge starts: every corner A, B, C, D and the
// centre M give the same rise 36/√65 ≈ 4.47 (green), equal to the true height PF; the origin O is
// 25/√65 below the base's plane, so OP · n̂ = 61/√65 is the height above the parallel plane through
// O (red sheet) — the report's slip, giving V = 122/3 instead of 24. "From above" shows the foot F
// of the perpendicular lies OUTSIDE ABCD (F = A + 19/65 AB − 62/65 AD): the apex overhangs, so any
// assumption about where P sits is unfounded. "Edge-on" shows the base as a line with P's height
// the perpendicular distance to it.
//
// A 3D scene, so it is drawn as its own SVG (orthographic view: turn about the normal, tilt from
// edge-on 0° to straight down 90°; drag the picture or use the sliders), with KaTeX labels laid
// over it. Everything below the base's plane is drawn before the translucent base, so it is tinted.

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'
import { ActionButton, Buttons, C, Controls, Katex, M, Notice, Readout, Readouts, Slider, Toggle } from './kit'

type V3 = readonly [number, number, number]
type P2 = readonly [number, number]

const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
const sub = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
const mul = (k: number, a: V3): V3 => [k * a[0], k * a[1], k * a[2]]
const dot = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
const cross = (a: V3, b: V3): V3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
const len = (a: V3) => Math.sqrt(dot(a, a))
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
const wrap = (deg: number) => ((((deg + 180) % 360) + 360) % 360) - 180

// The question's points (world coordinates).
const A: V3 = [2, -1, 3]
const B: V3 = [4, -2, 1]
const D: V3 = [4, 3, -1]
const P: V3 = [4, -4, 9]
const CC = add(B, sub(D, A)) // part a: C(6, 2, −3)
const MID = mul(0.5, add(A, CC)) // centre of the base, (4, ½, 0)
const O: V3 = [0, 0, 0]
const N: V3 = [6, 2, 5] // part d
const NHAT = mul(1 / len(N), N)
const AB = sub(B, A)

// A frame fitted to the base: s along AB, t across the base, h along n̂ (so the base is flat).
const U = mul(1 / len(AB), AB)
const VV = cross(NHAT, U)
const loc = (p: V3): V3 => {
  const d = sub(p, A)
  return [dot(d, U), dot(d, VV), dot(d, NHAT)]
}
const L = { A: loc(A), B: loc(B), C: loc(CC), D: loc(D), P: loc(P), M: loc(MID), O: loc(O) }
const F: V3 = [L.P[0], L.P[1], 0] // foot of the perpendicular from P
const O_DEPTH = L.O[2] // −25/√65

/** A point A + a·AB + b·AD, in the fitted frame, lifted by h. */
const onBase = (a: number, b: number, h = 0): V3 => add(add(mul(a, L.B), mul(b, L.D)), [0, 0, h])
const quad = (a0: number, a1: number, b0: number, b1: number, h = 0): V3[] => [
  onBase(a0, b0, h),
  onBase(a1, b0, h),
  onBase(a1, b1, h),
  onBase(a0, b1, h),
]
const BASE_SHEET = quad(-0.12, 1.12, -1.06, 1.06) // the plane of the base (F = A + 19/65 AB − 62/65 AD is on it)
const O_SHEET = quad(-0.36, 1.12, -1.06, 1.06, O_DEPTH) // the parallel plane through O
const NORMAL_AT = onBase(1.06, 0.86)
const NORMAL_TIP = add(NORMAL_AT, [0, 0, 1.6])

// The camera: turn α about the normal, tilt φ above the base's plane (0° edge-on, 90° from above).
function view(alphaDeg: number, phiDeg: number) {
  const a = (alphaDeg * Math.PI) / 180
  const p = (phiDeg * Math.PI) / 180
  const e1: V3 = [-Math.sin(a), Math.cos(a), 0]
  const e2: V3 = [-Math.sin(p) * Math.cos(a), -Math.sin(p) * Math.sin(a), Math.cos(p)]
  return { e1, e2 }
}
const START_VIEW = { a: -40, p: 32 }

// The scene turns about the middle of its bounding box, and each view is fitted to a canvas of
// fixed height (so the controls never move); the picture scales a little as it turns, and makes
// room for O's plane only when O is picked.
const SCENE: V3[] = [...BASE_SHEET, L.P, NORMAL_TIP]
const SCENE_O: V3[] = [...SCENE, ...O_SHEET]
const CENTRE = [0, 1, 2].map(i => (Math.min(...SCENE_O.map(p => p[i])) + Math.max(...SCENE_O.map(p => p[i]))) / 2) as unknown as V3
function frameAt(alphaDeg: number, phiDeg: number, withO: boolean) {
  const { e1, e2 } = view(alphaDeg, phiDeg)
  let u0 = Infinity
  let u1 = -Infinity
  let v0 = Infinity
  let v1 = -Infinity
  for (const q of withO ? SCENE_O : SCENE) {
    const r = sub(q, CENTRE)
    u0 = Math.min(u0, dot(r, e1))
    u1 = Math.max(u1, dot(r, e1))
    v0 = Math.min(v0, dot(r, e2))
    v1 = Math.max(v1, dot(r, e2))
  }
  return { u0, u1, v0, v1 }
}

type Start = 'A' | 'B' | 'C' | 'D' | 'M' | 'O'
const STARTS: { key: Start; world: V3; label: string }[] = [
  { key: 'A', world: A, label: 'A' },
  { key: 'B', world: B, label: 'B' },
  { key: 'C', world: CC, label: 'C' },
  { key: 'D', world: D, label: 'D' },
  { key: 'M', world: MID, label: 'Centre M' },
  { key: 'O', world: O, label: 'Origin O' },
]

/** A number as TeX: whole numbers as is, halves as \tfrac{n}{2}. */
function numTex(x: number): string {
  if (Math.abs(x - Math.round(x)) < 1e-9) return String(Math.round(x))
  return `\\tfrac{${Math.round(Math.abs(x) * 2)}}{2}`
}
/** A vector as TeX in i, j, k form, skipping zero components. */
function vecTex(v: V3): string {
  const units = ['\\underset{\\sim}{i}', '\\underset{\\sim}{j}', '\\underset{\\sim}{k}']
  let out = ''
  v.forEach((c, i) => {
    if (Math.abs(c) < 1e-9) return
    const mag = Math.abs(c)
    const coef = Math.abs(mag - 1) < 1e-9 ? '' : numTex(mag)
    out += c < 0 ? `-${coef}${units[i]}` : `${out ? '+' : ''}${coef}${units[i]}`
  })
  return out || '\\underset{\\sim}{0}'
}

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

/** A KaTeX label laid over the SVG, centred on a point in px. */
function Tag({ at, tex, color }: { at: P2; tex: string; color?: string }) {
  return (
    <span
      className="absolute -translate-x-1/2 -translate-y-1/2 px-0.5 rounded bg-white/75 dark:bg-gray-900/75 text-[13px] leading-none pointer-events-none whitespace-nowrap"
      style={{ left: at[0], top: at[1], color: color ?? undefined }}
    >
      <Katex tex={tex} />
    </span>
  )
}

function Arrow({ from, to, color, width = 2.5 }: { from: P2; to: P2; color: string; width?: number }) {
  const dx = to[0] - from[0]
  const dy = to[1] - from[1]
  const l = Math.hypot(dx, dy) || 1
  const ux = dx / l
  const uy = dy / l
  const hl = Math.min(11, l * 0.45)
  const hw = hl * 0.45
  const bx = to[0] - ux * hl
  const by = to[1] - uy * hl
  return (
    <g>
      <line x1={from[0]} y1={from[1]} x2={bx + ux} y2={by + uy} stroke={color} strokeWidth={width} strokeLinecap="round" />
      <polygon points={`${to[0]},${to[1]} ${bx - uy * hw},${by + ux * hw} ${bx + uy * hw},${by - ux * hw}`} fill={color} />
    </g>
  )
}

export default function PyramidHeight() {
  const [ref, width] = useWidth()
  const [alpha, setAlpha] = useState(START_VIEW.a)
  const [phi, setPhi] = useState(START_VIEW.p)
  const [start, setStart] = useState<Start>('B')

  // Animated moves between views.
  const cam = useRef({ a: alpha, p: phi })
  cam.current = { a: alpha, p: phi }
  const raf = useRef(0)
  useEffect(() => () => cancelAnimationFrame(raf.current), [])
  const stop = () => cancelAnimationFrame(raf.current)
  const go = (ta: number, tp: number) => {
    stop()
    const fa = cam.current.a
    const fp = cam.current.p
    const da = wrap(ta - fa)
    const t0 = performance.now()
    const tick = (now: number) => {
      const q = Math.min(1, (now - t0) / 900)
      const e = q < 0.5 ? 2 * q * q : 1 - (-2 * q + 2) ** 2 / 2
      setAlpha(wrap(fa + da * e))
      setPhi(fp + (tp - fp) * e)
      if (q < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
  }

  // Drag the picture to turn (sideways) and tilt (up/down).
  const drag = useRef<{ x: number; y: number; a: number; p: number } | null>(null)
  const onDown = (e: ReactPointerEvent<SVGSVGElement>) => {
    stop()
    drag.current = { x: e.clientX, y: e.clientY, a: alpha, p: phi }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const onMove = (e: ReactPointerEvent<SVGSVGElement>) => {
    const d = drag.current
    if (!d) return
    setAlpha(wrap(d.a - (e.clientX - d.x) * 0.5))
    setPhi(clamp(d.p + (e.clientY - d.y) * 0.4, 0, 90))
  }
  const onUp = () => {
    drag.current = null
  }

  const W = Math.min(width || 340, 520)
  const H = Math.round(Math.min(360, W * (W < 480 ? 0.62 : 0.74))) // phones: the width-limited scene leaves less height to fill
  const PAD = 24
  const fr = frameAt(alpha, phi, start === 'O')
  const S = Math.min((W - 2 * PAD) / (fr.u1 - fr.u0), (H - 2 * PAD) / (fr.v1 - fr.v0))
  const uMid = (fr.u0 + fr.u1) / 2
  const vMid = (fr.v0 + fr.v1) / 2
  const { e1, e2 } = view(alpha, phi)
  const X = (p: V3): P2 => {
    const r = sub(p, CENTRE)
    return [W / 2 + S * (dot(r, e1) - uMid), H / 2 - S * (dot(r, e2) - vMid)]
  }
  const pts = (ps: V3[]) => ps.map(p => X(p).join(',')).join(' ')
  const seg = (p: V3, q: V3, color: string, w: number, dash?: string) => {
    const [a, b] = [X(p), X(q)]
    return <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={color} strokeWidth={w} strokeDasharray={dash} strokeLinecap="round" />
  }
  /** Push a label a fixed number of px away from another screen point. */
  const away = (p: V3, from: P2, d = 13): P2 => {
    const q = X(p)
    const dx = q[0] - from[0]
    const dy = q[1] - from[1]
    const l = Math.hypot(dx, dy) || 1
    return [q[0] + (dx / l) * d, q[1] + (dy / l) * d]
  }

  const chosen = STARTS.find(s => s.key === start)!
  const isO = start === 'O'
  const Xl = L[start]
  const XP = sub(P, chosen.world)
  const k = dot(XP, N) // 36, or 61 for O
  const rise = k / Math.sqrt(65)
  const top: V3 = [Xl[0], Xl[1], L.P[2]] // X lifted by the resolute: P's level
  const vol = (2 * k) % 3 === 0 ? `${(2 * k) / 3}\\ \\checkmark` : `\\tfrac{${2 * k}}{3}`
  const riseColor = isO ? C.bad : C.good
  const edgeOn = phi <= 3
  const fromAbove = phi >= 80
  const name = isO ? 'O' : start

  // The right-angle marks: at F (height ⟂ base) and at the top of the green rise.
  const RA = 0.38
  const toward = (p: V3, q: V3): V3 => {
    const d = sub(q, p)
    return mul(RA / (len(d) || 1), d)
  }
  const fMark = [add(F, [0, RA, 0]), add(F, [0, RA, RA]), add(F, [0, 0, RA])]
  const tDir = toward(top, L.P)
  const tMark = [add(top, [0, 0, -RA]), add(add(top, [0, 0, -RA]), tDir), add(top, tDir)]

  const baseCentre = X(L.M)
  const levelO: V3 = [Xl[0], Xl[1], 0] // where O's rise crosses the base's plane
  const lam = isO ? -Xl[2] / (L.P[2] - Xl[2]) : 0
  const crossPt = add(Xl, mul(lam, sub(L.P, Xl))) // where OP pierces the base's plane

  // Which side of the rise to put its label: away from P on screen.
  const riseLabelSide = X(L.P)[0] > X(top)[0] ? -1 : 1
  const labelAt = (p: V3, q: V3): P2 => {
    const a = X(p)
    const b = X(q)
    return [(a[0] + b[0]) / 2 + riseLabelSide * 24, (a[1] + b[1]) / 2]
  }

  let notice: ReactNode
  if (isO) {
    notice = (
      <Notice tone="warn">
        <b>O is not on the base.</b> It sits <M>{'\\tfrac{25}{\\sqrt{65}} \\approx 3.10'}</M> below the base&apos;s plane (the red
        sheet is the parallel plane through O). So <M>{'\\overrightarrow{OP}\\cdot\\hat{\\underset{\\sim}{n}} = \\tfrac{61}{\\sqrt{65}}'}</M>{' '}
        is P&apos;s height above the <em>red</em> plane: the true height (green) plus O&apos;s depth (red). The report says most
        students who used a scalar resolute made this slip. Start the vector at a point of the base instead.
      </Notice>
    )
  } else if (fromAbove) {
    notice = (
      <Notice tone="good">
        Looking straight down the normal, P sits exactly over F, the foot of the height, and <b>F is outside the
        parallelogram</b>: the apex overhangs the base. So P is not above the centre or above any corner, and nothing in the
        question says where it is. <M>{'V = \\tfrac13 \\times \\text{base} \\times \\text{height}'}</M> still holds, because the
        height is measured to the <em>plane</em> of the base. Press &ldquo;Edge-on&rdquo; next.
      </Notice>
    )
  } else if (edgeOn) {
    notice = (
      <Notice tone="good">
        Edge-on, the base is just a line and the height is the perpendicular from P down to it. A, B, C, D and the centre
        all lie on that line, so <b>every</b> slant edge rises the same <M>{'\\tfrac{36}{\\sqrt{65}} \\approx 4.47'}</M> along{' '}
        <M>{'\\hat{\\underset{\\sim}{n}}'}</M>. That is why any slant edge works. Now pick O.
      </Notice>
    )
  } else if (start === 'M') {
    notice = (
      <Notice>
        The centre M is on the base too, so <M>{'\\overrightarrow{MP}\\cdot\\hat{\\underset{\\sim}{n}}'}</M> is again{' '}
        <M>{'\\tfrac{36}{\\sqrt{65}}'}</M>. But the edge MP itself is long and slanted (about <M>10.06</M>): P is not above the
        centre, so <M>{'|\\overrightarrow{MP}|'}</M> is not the height. Press &ldquo;From above&rdquo; to see where P really is.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The orange arrow is the slant edge <M>{`\\overrightarrow{${name}P}`}</M>. Split it into a part along{' '}
        <M>{'\\hat{\\underset{\\sim}{n}}'}</M> (green, straight up out of the base) and a part parallel to the base (dashed). Only
        the green part lifts you off the base, and its length is the scalar resolute{' '}
        <M>{`\\overrightarrow{${name}P}\\cdot\\hat{\\underset{\\sim}{n}} = \\tfrac{36}{\\sqrt{65}}`}</M>, the same as the height PF.
        Try the other corners, then O.
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
            className="block select-none"
            style={{ touchAction: 'pan-y', cursor: 'grab' }}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            role="img"
            aria-label={`Three-dimensional view of the pyramid with parallelogram base ABCD drawn flat and apex P above it; the slant edge from ${name} to P is split into a rise of ${rise.toFixed(2)} along the unit normal and a part parallel to the base`}
          >
            {/* Below the base's plane (only O's things): drawn first so the base tints them. */}
            {isO && (
              <g>
                <polygon points={pts(O_SHEET)} fill={C.bad} fillOpacity={0.07} stroke={C.bad} strokeOpacity={0.5} strokeDasharray="5 4" strokeWidth={1} />
                {seg(Xl, levelO, C.bad, 4)}
                {seg(Xl, crossPt, C.g, 2.5)}
                <circle cx={X(Xl)[0]} cy={X(Xl)[1]} r={3.5} fill="currentColor" />
              </g>
            )}

            {/* The plane of the base, and the base itself. */}
            <polygon points={pts(BASE_SHEET)} fill="currentColor" fillOpacity={0.05} stroke="currentColor" strokeOpacity={0.35} strokeDasharray="5 4" strokeWidth={1} />
            <polygon points={pts([L.A, L.B, L.C, L.D])} fill={C.f} fillOpacity={0.22} stroke={C.f} strokeWidth={2} strokeLinejoin="round" />
            {start === 'M' && (
              <g>
                {seg(L.A, L.C, C.f, 1, '3 3')}
                {seg(L.B, L.D, C.f, 1, '3 3')}
              </g>
            )}

            {/* The slant edges. */}
            {[L.A, L.B, L.C, L.D].map((q, i) => (
              <g key={i}>{seg(q, L.P, C.guide, 1.5)}</g>
            ))}

            {/* The true height PF, perpendicular to the base's plane. */}
            {seg(F, L.P, C.good, 1.5, '5 4')}
            <polyline points={pts(fMark)} fill="none" stroke={C.good} strokeWidth={1.2} />
            <circle cx={X(F)[0]} cy={X(F)[1]} r={3} fill={C.good} />

            {/* The chosen slant edge, split into its rise along n̂ and a part parallel to the base. */}
            {isO ? seg(levelO, top, C.good, 4) : seg(Xl, top, C.good, 4)}
            {seg(top, L.P, C.guide, 1.5, '4 4')}
            <polyline points={pts(tMark)} fill="none" stroke={C.guide} strokeWidth={1.2} />
            <Arrow from={X(isO ? crossPt : Xl)} to={X(L.P)} color={C.g} />

            {/* The unit normal from part d. */}
            {!fromAbove && <Arrow from={X(NORMAL_AT)} to={X(NORMAL_TIP)} color={C.violet} width={2} />}

            {[L.A, L.B, L.C, L.D].map((q, i) => (
              <circle key={i} cx={X(q)[0]} cy={X(q)[1]} r={3.5} fill={C.f} />
            ))}
            {start === 'M' && <circle cx={X(L.M)[0]} cy={X(L.M)[1]} r={3.5} fill="currentColor" />}
            <circle cx={X(L.P)[0]} cy={X(L.P)[1]} r={4} fill="currentColor" />
          </svg>
          <Tag at={away(L.A, baseCentre)} tex="A" color={C.f} />
          <Tag at={away(L.B, baseCentre)} tex="B" color={C.f} />
          <Tag at={away(L.C, baseCentre)} tex="C" color={C.f} />
          <Tag at={away(L.D, baseCentre)} tex="D" color={C.f} />
          <Tag at={[X(L.P)[0], X(L.P)[1] - 14]} tex={fromAbove ? 'P\\ (\\text{over } F)' : 'P'} />
          {!fromAbove && <Tag at={[X(F)[0], X(F)[1] + 13]} tex="F" color={C.good} />}
          {start === 'M' && <Tag at={[X(L.M)[0] + 12, X(L.M)[1] + 8]} tex="M" />}
          {isO && <Tag at={[X(L.O)[0] - 12, X(L.O)[1] + 8]} tex="O" />}
          {!fromAbove && <Tag at={[X(NORMAL_TIP)[0] + 12, X(NORMAL_TIP)[1] - 4]} tex="\hat{\underset{\sim}{n}}" color={C.violet} />}
          {!fromAbove && (
            <Tag at={labelAt(isO ? levelO : Xl, top)} tex={`\\tfrac{36}{\\sqrt{65}}`} color={C.good} />
          )}
          {isO && !fromAbove && <Tag at={labelAt(Xl, levelO)} tex={`\\tfrac{25}{\\sqrt{65}}`} color={C.bad} />}
        </div>
      </div>
      <Controls>
        <div className="flex flex-wrap items-center gap-2 text-[12.5px] text-gray-600 dark:text-gray-300">
          <span className="font-semibold">Start the vector at</span>
          {STARTS.map(s => (
            <Toggle key={s.key} label={s.label} checked={start === s.key} onChange={() => setStart(s.key)} />
          ))}
        </div>
        <Slider
          label="\text{turn}"
          value={alpha}
          onChange={v => {
            stop()
            setAlpha(v)
          }}
          min={-180}
          max={180}
          step={1}
          format={v => `${Math.round(v)}°`}
        />
        <Slider
          label="\text{tilt}"
          value={phi}
          onChange={v => {
            stop()
            setPhi(v)
          }}
          min={0}
          max={90}
          step={1}
          format={v => `${Math.round(v)}°`}
        />
        <Buttons>
          <ActionButton label="Edge-on" onClick={() => go(alpha, 0)} />
          <ActionButton label="From above" onClick={() => go(alpha, 90)} />
          <ActionButton label="Reset view" onClick={() => go(START_VIEW.a, START_VIEW.p)} />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`\\overrightarrow{${name}P} = ${vecTex(XP)}`} />
          <Readout color={C.guide} tex={`\\left|\\overrightarrow{${name}P}\\right| \\approx ${len(XP).toFixed(2)}`} />
          <Readout
            color={riseColor}
            tex={`\\overrightarrow{${name}P}\\cdot\\hat{\\underset{\\sim}{n}} = \\tfrac{${k}}{\\sqrt{65}} \\approx ${rise.toFixed(2)}`}
          />
          <Readout
            color={riseColor}
            tex={`V = \\tfrac13 \\times 2\\sqrt{65} \\times \\tfrac{${k}}{\\sqrt{65}} = ${vol}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
