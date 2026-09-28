// 2019 Specialist Exam 2 Q4c — why the base's area is |AD| × |AB| sin θ and not 3 × 6. The
// parallelogram keeps its sides |AB| = 3 and |AD| = 6 as the angle θ at A changes, but its
// perpendicular height is only 3 sin θ, so the area 18 sin θ is below the product of the sides
// (the dashed red rectangle, what "3 × 6 = 18" measures) unless θ = 90°. It opens at this
// question's angle, θ = cos⁻¹(4/9) ≈ 63.6° from part b, where h = √65/3 and the area is 2√65.
// "Cut and slide" moves the triangle off one end along the base by 6 into the gap at the other
// end: the parallelogram becomes a rectangle 6 wide and 3 sin θ tall — the reason area = base ×
// perpendicular height.

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ActionButton, Buttons, C, Controls, Katex, M, Notice, Readout, Readouts, Slider, Toggle } from './kit'

type P2 = readonly [number, number]

const SIDE_AB = 3 // |AB|, part b
const SIDE_AD = 6 // |AD|, part b
const THETA_Q = (Math.acos(4 / 9) * 180) / Math.PI // this question's angle at A, ≈ 63.61°
const MIN = 30
const MAX = 150

// One frame for every angle.
const X0 = SIDE_AB * Math.cos((MAX * Math.PI) / 180) - 0.55
const X1 = SIDE_AD + SIDE_AB * Math.cos((MIN * Math.PI) / 180) + 0.45
const Y0 = -0.8
const Y1 = SIDE_AB + 0.75

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
      className="absolute -translate-x-1/2 -translate-y-1/2 px-0.5 rounded bg-white/80 dark:bg-gray-900/80 text-[13px] leading-none pointer-events-none whitespace-nowrap"
      style={{ left: at[0], top: at[1], color: color ?? undefined }}
    >
      <Katex tex={tex} />
    </span>
  )
}

export default function ParallelogramLean() {
  const [ref, width] = useWidth()
  const [theta, setTheta] = useState(THETA_Q)
  const [cut, setCut] = useState(false)

  const W = Math.min(width || 340, 560)
  const S = W / (X1 - X0)
  const H = Math.round(S * (Y1 - Y0))
  const X = (p: P2): P2 => [S * (p[0] - X0), S * (Y1 - p[1])]
  const pts = (ps: P2[]) => ps.map(p => X(p).join(',')).join(' ')

  const t = (theta * Math.PI) / 180
  const bx = SIDE_AB * Math.cos(t)
  const h = SIDE_AB * Math.sin(t)
  const A: P2 = [0, 0]
  const D: P2 = [SIDE_AD, 0]
  const B: P2 = [bx, h]
  const Cp: P2 = [bx + SIDE_AD, h]
  const foot: P2 = [bx, 0]
  const area = SIDE_AD * h
  const atQ = Math.abs(theta - THETA_Q) < 0.3
  const atRight = Math.abs(theta - 90) < 0.3

  // Cut and slide: the triangle beside the height moves 6 along the base.
  const tri: P2[] = bx >= 0 ? [A, foot, B] : [[SIDE_AD + bx, 0], D, Cp]
  const shift = (bx >= 0 ? SIDE_AD : -SIDE_AD) * S

  // The angle arc at A, and the right-angle mark at the foot of the height.
  const R = 0.7
  const arc = Array.from({ length: 25 }, (_, i) => {
    const a = (t * i) / 24
    return X([R * Math.cos(a), R * Math.sin(a)]).join(',')
  }).join(' ')
  const q = 0.28
  const sgn = bx >= 0 ? 1 : -1 // the mark sits on the side of the foot towards the parallelogram
  const mark: P2[] = [
    [bx + sgn * q, 0],
    [bx + sgn * q, q],
    [bx, q],
  ]

  // Label for |AB|: just outside the side AB.
  const mAB = X([bx / 2, h / 2])
  const abAt: P2 = [mAB[0] - 18 * Math.sin(t), mAB[1] - 18 * Math.cos(t)]
  const hAt = X([bx, h / 2])
  const arcAt = X([(R + 0.45) * Math.cos(t / 2), (R + 0.45) * Math.sin(t / 2)])

  let notice: ReactNode
  if (cut) {
    notice = (
      <Notice tone="good">
        Cut the green triangle off one end and slide it <M>6</M> along the base: it fills the gap at the other end exactly,
        and the parallelogram becomes a <b>rectangle</b> <M>6</M> wide and <M>{'3\\sin\\theta'}</M> tall. Same pieces, same
        area. That is why area <M>=</M> base <M>\times</M> <em>perpendicular</em> height, and why the slanted side&apos;s
        length <M>3</M> never appears on its own.
      </Notice>
    )
  } else if (atRight) {
    notice = (
      <Notice tone="good">
        At <M>{'90^\\circ'}</M> the parallelogram <em>is</em> the red rectangle: <M>{'\\sin 90^\\circ = 1'}</M>, the height
        equals the side, and <M>{'3 \\times 6 = 18'}</M> is right. This is the only angle where multiplying the two sides
        works. Press &ldquo;This question&apos;s angle&rdquo; to go back.
      </Notice>
    )
  } else if (atQ) {
    notice = (
      <Notice>
        This is the pyramid&apos;s base drawn to scale, with <M>{'\\theta = \\cos^{-1}\\tfrac49 \\approx 63.6^\\circ'}</M> from part
        b. The side <M>AB</M> is <M>3</M> long, but the parallelogram is only{' '}
        <M>{'3\\sin\\theta = \\tfrac{\\sqrt{65}}{3} \\approx 2.69'}</M> tall (green). Area <M>{'= 6 \\times \\tfrac{\\sqrt{65}}{3} = 2\\sqrt{65}'}</M>,
        not the red rectangle&apos;s <M>18</M>. Drag <M>\theta</M> to <M>{'90^\\circ'}</M>, then try &ldquo;Cut and slide&rdquo;.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Leaning the parallelogram over keeps both sides (<M>3</M> and <M>6</M>) but lowers the top: the height is{' '}
        <M>{'3\\sin\\theta'}</M>, so the area <M>{'18\\sin\\theta'}</M> is less than <M>18</M> for every angle except{' '}
        <M>{'90^\\circ'}</M>. The side length is not the height. Try &ldquo;Cut and slide&rdquo; to see why the height is what counts.
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
            aria-label={`Parallelogram with sides 3 and 6 and angle ${theta.toFixed(1)} degrees at A: its perpendicular height is ${h.toFixed(2)} and its area ${area.toFixed(2)}, compared with a 3 by 6 rectangle of area 18`}
          >
            {/* What "3 × 6" measures: the rectangle with the same sides. */}
            <polygon points={pts([A, D, [SIDE_AD, SIDE_AB], [0, SIDE_AB]])} fill="none" stroke={C.bad} strokeWidth={1.5} strokeDasharray="6 4" />
            {/* The parallelogram. */}
            <polygon points={pts([A, B, Cp, D])} fill={C.f} fillOpacity={0.2} stroke={C.f} strokeWidth={2.5} strokeLinejoin="round" />
            {/* The base line extended, when the foot of the height falls outside AD. */}
            {bx < 0 && <line x1={X(foot)[0]} y1={X(foot)[1]} x2={X(A)[0]} y2={X(A)[1]} stroke={C.guide} strokeWidth={1.5} strokeDasharray="4 4" />}
            {/* Cut and slide. */}
            {cut && <polygon points={pts(tri)} fill="none" stroke={C.good} strokeWidth={1.5} strokeDasharray="4 3" />}
            <g style={{ transform: `translate(${cut ? shift : 0}px, 0px)`, opacity: cut ? 1 : 0, transition: 'transform 0.9s ease, opacity 0.35s' }}>
              <polygon points={pts(tri)} fill={C.good} fillOpacity={0.35} stroke={C.good} strokeWidth={1.5} />
            </g>
            {cut && (
              <polygon points={pts([foot, [bx + SIDE_AD, 0], Cp, B])} fill="none" stroke={C.good} strokeWidth={2.5} />
            )}
            {/* The perpendicular height. */}
            <line x1={X(B)[0]} y1={X(B)[1]} x2={X(foot)[0]} y2={X(foot)[1]} stroke={C.good} strokeWidth={2.5} strokeDasharray="6 4" />
            <polyline points={pts(mark)} fill="none" stroke={C.good} strokeWidth={1.3} />
            <polyline points={arc} fill="none" stroke="currentColor" strokeWidth={1.3} />
            {[A, B, Cp, D].map((p, i) => (
              <circle key={i} cx={X(p)[0]} cy={X(p)[1]} r={3.5} fill={C.f} />
            ))}
          </svg>
          <Tag at={[X(A)[0] - 10, X(A)[1] + 11]} tex="A" color={C.f} />
          <Tag at={[X(D)[0] + 10, X(D)[1] + 11]} tex="D" color={C.f} />
          <Tag at={[X(B)[0], X(B)[1] - 13]} tex="B" color={C.f} />
          <Tag at={[X(Cp)[0] + 4, X(Cp)[1] - 13]} tex="C" color={C.f} />
          <Tag at={[X([SIDE_AD / 2, 0])[0], X(A)[1] + 14]} tex="|\overrightarrow{AD}| = 6" />
          <Tag at={abAt} tex="3" />
          <Tag at={[hAt[0] + (bx >= 0 ? 16 : -16), hAt[1]]} tex="h" color={C.good} />
          <Tag at={arcAt} tex="\theta" />
          <Tag at={[X([SIDE_AD, SIDE_AB])[0] - 30, X([SIDE_AD, SIDE_AB])[1] - 12]} tex="3 \times 6" color={C.bad} />
        </div>
      </div>
      <Controls>
        <Slider label="\theta" value={theta} onChange={setTheta} min={MIN} max={MAX} step={0.1} format={v => `${v.toFixed(1)}°`} />
        <Buttons>
          <ActionButton label="This question's angle" onClick={() => setTheta(THETA_Q)} />
          <ActionButton label="Make it 90°" onClick={() => setTheta(90)} />
          <Toggle label="Cut and slide" checked={cut} onChange={setCut} />
        </Buttons>
        <Readouts>
          <Readout color={C.good} tex={`h = 3\\sin\\theta \\approx ${h.toFixed(2)}`} />
          <Readout
            color={C.good}
            tex={`\\text{area} = 6h ${atQ ? '= 2\\sqrt{65}' : ''} \\approx ${area.toFixed(2)}`}
          />
          <Readout color={C.bad} tex="3 \times 6 = 18" />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}

