// 2020 Specialist Exam 2 MCQ 14 — the component of F in the direction of d is F's shadow on the line
// of d. Any two vectors lie in one plane; this is that plane, drawn flat and to scale: d along the
// horizontal, F = i + 6j − 18k (|F| = 19) at θ = arccos(92/133) ≈ 46.2° to it. Dropping a
// perpendicular from F's tip gives the shadow, |F| cos θ = 92/7 ≈ 13.14 (option B). A slider
// stretches d by a factor μ: F · (μd) = 92μ grows, but the shadow doesn't move, because only d's
// direction matters — which is why F · d is divided by |d| = 7 (and |μd| = 7μ cancels the μ). A toggle
// shows option A's F · d / |F| instead: that is |d| cos θ, the shadow of d on the line of F (92/19 ≈
// 4.84 at μ = 1), the question turned round — and it changes as d is stretched.
//
// Drawn as its own SVG rather than on a mafs coordinate plane: the picture is the plane containing
// F and d, which has no x- and y-axes of its own. Labels are KaTeX laid over the SVG.

import { useEffect, useRef, useState } from 'react'
import { C, Controls, Katex, M, Notice, Readout, Readouts, Slider, Toggle, Buttons } from './kit'

type P2 = readonly [number, number]

const F_LEN = 19
const COS = 92 / 133 // F · d / (|F||d|) = 92 / (19 × 7)
const SIN = Math.sqrt(1 - COS * COS)
const THETA = Math.acos(COS) // ≈ 0.8069 rad ≈ 46.2°
const F_TIP: P2 = [F_LEN * COS, F_LEN * SIN] // (92/7, 13.72)
const SHADOW = 92 / 7 // ≈ 13.14

// The world window (units of force), fixed so nothing rescales as d is stretched.
const X0 = -1.2
const X1 = 20
const Y0 = -3.2
const Y1 = 15.2

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

function Arrow({ from, to, color, width = 2.6 }: { from: P2; to: P2; color: string; width?: number }) {
  const dx = to[0] - from[0]
  const dy = to[1] - from[1]
  const len = Math.hypot(dx, dy)
  if (len < 0.5) return null
  const ux = dx / len
  const uy = dy / len
  const head = Math.min(10, len * 0.4)
  const bx = to[0] - ux * head
  const by = to[1] - uy * head
  const hw = head * 0.48
  return (
    <g>
      <line x1={from[0]} y1={from[1]} x2={bx + ux} y2={by + uy} stroke={color} strokeWidth={width} strokeLinecap="round" />
      <polygon points={`${to[0]},${to[1]} ${bx - uy * hw},${by + ux * hw} ${bx + uy * hw},${by - ux * hw}`} fill={color} />
    </g>
  )
}

function Tag({ at, tex, color, size = 13.5 }: { at: P2; tex: string; color?: string; size?: number }) {
  return (
    <span
      className="absolute -translate-x-1/2 -translate-y-1/2 px-0.5 rounded bg-white/80 dark:bg-gray-900/80 leading-none pointer-events-none whitespace-nowrap"
      style={{ left: at[0], top: at[1], color: color ?? undefined, fontSize: size }}
    >
      <Katex tex={tex} />
    </span>
  )
}

const n2 = (v: number) => v.toFixed(2)
/** Like n2, but a whole number without decimals (92, not 92.00). */
const nf = (v: number) => (Math.abs(v - Math.round(v)) < 1e-9 ? String(Math.round(v)) : v.toFixed(2))

export default function Shadow() {
  const [ref, width] = useWidth()
  const [mu, setMu] = useState(1)
  const [showA, setShowA] = useState(false)

  const PAD = 8
  const W = Math.min(width || 340, 480)
  const S = (W - 2 * PAD) / (X1 - X0)
  const H = Math.round(S * (Y1 - Y0) + 2 * PAD)
  const X = (p: P2): P2 => [PAD + S * (p[0] - X0), PAD + S * (Y1 - p[1])]

  const O: P2 = [0, 0]
  const dLen = 7 * mu
  const dTip: P2 = [dLen, 0]
  const foot: P2 = [SHADOW, 0]
  // Option A: F · d / |F| = |d| cos θ, the shadow of d on the line of F.
  const aLen = (92 * mu) / 19
  const aFoot: P2 = [aLen * COS, aLen * SIN]
  const one = Math.abs(mu - 1) < 0.001
  /** d or (μ d) in the readouts: no brackets at μ = 1. */
  const dTex = one ? '\\underset{\\sim}{d}' : `${n2(mu)}\\underset{\\sim}{d}`
  const dPar = one ? dTex : `(${dTex})`

  // Right-angle marks (0.8 units a side) at the feet of the two perpendiculars.
  const q = 0.8
  const rightAngle = (
    <polyline
      points={[X([SHADOW - q, 0]), X([SHADOW - q, q]), X([SHADOW, q])].map(p => p.join(',')).join(' ')}
      fill="none"
      stroke="currentColor"
      strokeOpacity={0.6}
      strokeWidth={1.2}
    />
  )
  const u: P2 = [COS, SIN]
  const nrm: P2 = [-SIN, COS]
  const rightAngleA = (
    <polyline
      points={([
        [aFoot[0] - q * u[0], aFoot[1] - q * u[1]],
        [aFoot[0] - q * u[0] - q * nrm[0], aFoot[1] - q * u[1] - q * nrm[1]],
        [aFoot[0] - q * nrm[0], aFoot[1] - q * nrm[1]],
      ] as P2[])
        .map(p => X(p).join(','))
        .join(' ')}
      fill="none"
      stroke={C.bad}
      strokeOpacity={0.8}
      strokeWidth={1.2}
    />
  )

  // The angle θ at O, as an arc of radius 2.4.
  const arc = (() => {
    const r = 2.4
    const pts: string[] = []
    for (let i = 0; i <= 24; i++) {
      const a = (THETA * i) / 24
      pts.push(X([r * Math.cos(a), r * Math.sin(a)]).join(','))
    }
    return pts.join(' ')
  })()

  let notice
  if (showA) {
    notice = (
      <Notice tone="warn">
        <b>Dividing by <M>{'|\\underset{\\sim}{F}|'}</M> instead</b> gives{' '}
        <M>{'\\dfrac{\\underset{\\sim}{F}\\cdot\\underset{\\sim}{d}}{|\\underset{\\sim}{F}|} = |\\underset{\\sim}{d}|\\cos\\theta'}</M>, the red
        segment: the shadow of <M>{'\\underset{\\sim}{d}'}</M> on the line of <M>{'\\underset{\\sim}{F}'}</M>. That is the component of{' '}
        <M>{'\\underset{\\sim}{d}'}</M> along <M>{'\\underset{\\sim}{F}'}</M>, the question turned round
        {one ? (
          <>, and it is option A&apos;s <M>{'\\tfrac{92}{19}'}</M>.</>
        ) : (
          <>. Notice it changes as you stretch <M>{'\\underset{\\sim}{d}'}</M>; the green shadow of <M>{'\\underset{\\sim}{F}'}</M> doesn&apos;t.</>
        )}{' '}
        Rule: divide by the length of the vector you are projecting <i>onto</i>.
      </Notice>
    )
  } else if (one) {
    notice = (
      <Notice>
        Any two vectors lie in one plane: this is the plane of <M>{'\\underset{\\sim}{F}'}</M> and <M>{'\\underset{\\sim}{d}'}</M>, drawn flat and
        to scale. Drop a perpendicular from the tip of <M>{'\\underset{\\sim}{F}'}</M> to the line of <M>{'\\underset{\\sim}{d}'}</M>:{' '}
        <b>the green shadow is the part of <M>{'\\underset{\\sim}{F}'}</M> that acts along <M>{'\\underset{\\sim}{d}'}</M></b>, length{' '}
        <M>{'|\\underset{\\sim}{F}|\\cos\\theta = 19\\times\\tfrac{92}{133} = \\tfrac{92}{7}'}</M>. Now stretch <M>{'\\underset{\\sim}{d}'}</M> with
        the slider.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <M>{'\\underset{\\sim}{d}'}</M> is now {n2(mu)} times as long, and <M>{'\\underset{\\sim}{F}\\cdot\\underset{\\sim}{d}'}</M> has grown to{' '}
        <M>{`92 \\times ${n2(mu)} = ${n2(92 * mu)}`}</M>, but <b>the green shadow hasn&apos;t moved</b>: only the <i>direction</i> of{' '}
        <M>{'\\underset{\\sim}{d}'}</M> matters. Dividing by <M>{`|\\underset{\\sim}{d}| = 7 \\times ${n2(mu)}`}</M> cancels its length and leaves{' '}
        <M>{'\\tfrac{92}{7}'}</M> every time. That is why the formula divides by <M>{'|\\underset{\\sim}{d}|'}</M>, once.
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
            aria-label="The plane containing F and d: d along a horizontal line, F of length 19 at about 46 degrees to it, and the perpendicular from the tip of F meeting the line of d at distance 92/7 from the origin"
          >
            {/* The line of d, both ways. */}
            <line x1={X([X0, 0])[0]} y1={X([X0, 0])[1]} x2={X([X1, 0])[0]} y2={X([X1, 0])[1]} stroke={C.guide} strokeWidth={1.3} strokeDasharray="5 4" />
            {/* F's shadow on it. */}
            <line x1={X(O)[0]} y1={X(O)[1]} x2={X(foot)[0]} y2={X(foot)[1]} stroke={C.good} strokeOpacity={0.45} strokeWidth={9} strokeLinecap="butt" />
            <line x1={X(F_TIP)[0]} y1={X(F_TIP)[1]} x2={X(foot)[0]} y2={X(foot)[1]} stroke="currentColor" strokeOpacity={0.55} strokeWidth={1.3} strokeDasharray="5 4" />
            {rightAngle}
            {showA && (
              <>
                <line x1={X(O)[0]} y1={X(O)[1]} x2={X(aFoot)[0]} y2={X(aFoot)[1]} stroke={C.bad} strokeOpacity={0.5} strokeWidth={9} />
                <line x1={X(dTip)[0]} y1={X(dTip)[1]} x2={X(aFoot)[0]} y2={X(aFoot)[1]} stroke={C.bad} strokeOpacity={0.8} strokeWidth={1.3} strokeDasharray="5 4" />
                {rightAngleA}
              </>
            )}
            <polyline points={arc} fill="none" stroke="currentColor" strokeOpacity={0.6} strokeWidth={1.2} />
            <Arrow from={X(O)} to={X(F_TIP)} color={C.f} width={2.8} />
            <Arrow from={X(O)} to={X(dTip)} color={C.violet} width={2.8} />
            <circle cx={X(O)[0]} cy={X(O)[1]} r={2.6} fill="currentColor" />
          </svg>
          <Tag at={[X(F_TIP)[0] + 10, X(F_TIP)[1] - 8]} tex="\underset{\sim}{F}" color={C.f} />
          <Tag at={X([F_TIP[0] * 0.55 - 2.1 * SIN, F_TIP[1] * 0.55 + 2.1 * COS])} tex="|\underset{\sim}{F}| = 19" color={C.f} size={12.5} />
          <Tag at={[X(dTip)[0], X(dTip)[1] + 16]} tex={one ? '\\underset{\\sim}{d}' : `${n2(mu)}\\underset{\\sim}{d}`} color={C.violet} />
          <Tag at={X([3.3 * Math.cos(THETA / 2), 3.3 * Math.sin(THETA / 2)])} tex="\theta" size={12.5} />
          <Tag at={[X([SHADOW / 2 + 2.2, 0])[0], X([0, 0])[1] - 14]} tex="\tfrac{92}{7} \approx 13.14" color={C.good} size={12.5} />
          {showA && (
            <Tag
              at={X([aFoot[0] * 0.5 - 1.5 * SIN, aFoot[1] * 0.5 + 1.5 * COS])}
              tex={`${n2(aLen)}`}
              color={C.bad}
              size={12.5}
            />
          )}
        </div>
      </div>
      <Controls>
        <Slider label="\mu" value={mu} onChange={setMu} min={0.4} max={2.6} step={0.05} format={v => `${n2(v)}`} />
        <p className="text-[12px] text-gray-500 dark:text-gray-400 -mt-1">
          Stretch <Katex tex="\underset{\sim}{d}" /> by a factor <Katex tex="\mu" />; <Katex tex="\mu = 1" /> is the question&apos;s{' '}
          <Katex tex="\underset{\sim}{d} = 2\underset{\sim}{i} - 3\underset{\sim}{j} - 6\underset{\sim}{k}" />.
        </p>
        <Buttons>
          <Toggle label="Option A: divide by |F| instead" checked={showA} onChange={setShowA} />
        </Buttons>
        <Readouts>
          <Readout tex={`\\underset{\\sim}{F}\\cdot${dPar} = ${nf(92 * mu)}`} />
          <Readout tex={`|${dTex}| = ${nf(7 * mu)}`} />
          <Readout color={C.good} tex={`\\text{shadow} = \\tfrac{${nf(92 * mu)}}{${nf(7 * mu)}} \\approx ${n2(SHADOW)}`} />
          {showA && <Readout color={C.bad} tex={`\\tfrac{\\underset{\\sim}{F}\\cdot${dPar}}{|\\underset{\\sim}{F}|} = \\tfrac{${nf(92 * mu)}}{19} \\approx ${n2(aLen)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
