// 2020 Methods Exam 1 Q3 — why −π/4 and π/3? Pick any solution of tan u = −1 for the angle at
// x = −1 (−5π/4, −π/4, 3π/4) and any solution of tan u = √3 for the angle at x = 1 (−2π/3, π/3,
// 4π/3, plus the slip π/6), and the widget solves −a + b = u₁, a + b = u₂ and draws
// y = tan(ax + b), checking each of the question's conditions. Every genuine pair puts the curve
// through both points, so the points alone can't decide; the conditions do, and each one is
// needed (all checked with sympy):
// - 3π/4 with π/3 (the report's common error): a = −5π/24, b = 13π/24, asymptote at x = 1/5.
// - π/6 (the report's other error): tan(π/6) = 1/√3, so the curve misses (1, √3); with −π/4,
//   b = −π/24.
// - 3π/4 with 4π/3, or −5π/4 with −2π/3: a = 7π/24 and the SAME curve (b moves by π), but
//   b = 25π/24 or −23π/24 — only 0 < b < 1 rules these out.
// - −5π/4 with 4π/3: a = 31π/24 > 0 and b = π/24, but asymptotes at x = −13/31 and 11/31 — only
//   "continuous for x ∈ [−1, 1]" rules this out.
// The default is the report's common error, 3π/4 with π/3.

import { useState } from 'react'
import { C, Controls, Katex, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Toggle, num } from './kit'

const PI = Math.PI
const ROOT3 = Math.sqrt(3)
// Curves are clipped just outside the visible y-range [−3, 3]; the plane shows x from about −2.3 to 2.3.
const Y = 3.4
const T = Math.atan(Y)
const XV = 2.3

// Angles in twelfths of π, so a = (u₂ − u₁)/2 and b = (u₁ + u₂)/2 are whole multiples of π/24.
const LEFT = [
  { n: -15, tex: '-\\tfrac{5\\pi}{4}' },
  { n: -3, tex: '-\\tfrac{\\pi}{4}' },
  { n: 9, tex: '\\tfrac{3\\pi}{4}' },
]
const RIGHT = [
  { n: -8, tex: '-\\tfrac{2\\pi}{3}' },
  { n: 2, tex: '\\tfrac{\\pi}{6}' },
  { n: 4, tex: '\\tfrac{\\pi}{3}' },
  { n: 16, tex: '\\tfrac{4\\pi}{3}' },
]

const gcd = (p: number, q: number): number => (q === 0 ? Math.abs(p) : gcd(q, p % q))

/** TeX for the fraction p/q in lowest terms, optionally times π. */
function frac(p: number, q: number, pi = false): string {
  if (q < 0) {
    p = -p
    q = -q
  }
  const g = gcd(Math.abs(p), q) || 1
  p /= g
  q /= g
  const sign = p < 0 ? '-' : ''
  const m = Math.abs(p)
  const top = pi ? (m === 1 ? '\\pi' : `${m}\\pi`) : String(m)
  return q === 1 ? sign + top : `${sign}\\tfrac{${top}}{${q}}`
}

export default function Angles() {
  const [n1, setN1] = useState(9)
  const [n2, setN2] = useState(4)

  // a = aN·π/24 and b = bN·π/24.
  const aN = n2 - n1
  const bN = n1 + n2
  const a = (aN * PI) / 24
  const b = (bN * PI) / 24
  const g = (x: number) => Math.tan(a * x + b)

  // Asymptotes where ax + b = π/2 + kπ, i.e. x = (12 + 24k − bN)/aN — rational, so exact labels.
  const asym: { x: number; tex: string }[] = []
  for (let k = -12; k <= 12; k++) {
    const x = (12 + 24 * k - bN) / aN
    if (Math.abs(x) < XV + 0.1) asym.push({ x, tex: frac(12 + 24 * k - bN, aN) })
  }
  asym.sort((p, q) => p.x - q.x)
  const inside = asym.filter(s => s.x > -1 && s.x < 1)

  // Each branch of the curve: ax + b between kπ − T and kπ + T.
  const branches: [number, number][] = []
  for (let k = -12; k <= 12; k++) {
    let x0 = (k * PI - T - b) / a
    let x1 = (k * PI + T - b) / a
    if (x0 > x1) [x0, x1] = [x1, x0]
    x0 = Math.max(x0, -XV)
    x1 = Math.min(x1, XV)
    if (x1 > x0) branches.push([x0, x1])
  }

  const aOK = aN > 0
  const bOK = b > 0 && b < 1
  const contOK = inside.length === 0
  const hitsOK = n2 !== 2
  const allOK = aOK && bOK && contOK && hitsOK
  const bTex = `${frac(bN, 24, true)} \\approx ${num(b)}`
  const asymList = inside.map(s => s.tex).join(',\\ ')

  let notice
  if (allOK) {
    notice = (
      <Notice tone="good">
        <b>This is the graph in the question.</b> Both angles are on the branch through the origin, so as <M>x</M> runs
        from <M>-1</M> to <M>1</M> the angle <M>ax + b</M> runs from <M>{'-\\tfrac{\\pi}{4}'}</M> to{' '}
        <M>{'\\tfrac{\\pi}{3}'}</M> without reaching <M>{'\\pm\\tfrac{\\pi}{2}'}</M>: one unbroken rising branch. And{' '}
        <M>{'a = \\tfrac{7\\pi}{24} > 0'}</M>, <M>{'b = \\tfrac{\\pi}{24} \\approx 0.13'}</M>: every condition holds.
      </Notice>
    )
  } else if (!hitsOK) {
    notice = (
      <Notice tone="warn">
        <b>The curve misses <M>(1, \sqrt3)</M>.</b> <M>{'\\tan\\tfrac{\\pi}{6} = \\tfrac{1}{\\sqrt3} \\approx 0.58'}</M>,
        not <M>\sqrt3</M>, so this curve goes through <M>{'\\left(1, \\tfrac{1}{\\sqrt3}\\right)'}</M> instead (red
        dot): <M>{'\\tfrac{\\pi}{6}'}</M> and <M>{'\\tfrac{\\pi}{3}'}</M> have been swapped. In the half-equilateral
        triangle the side <M>\sqrt3</M> is opposite the <M>{'\\tfrac{\\pi}{3}'}</M> angle, so{' '}
        <M>{'\\tan\\tfrac{\\pi}{3} = \\tfrac{\\sqrt3}{1}'}</M>. Quick check: <M>{'\\sqrt3 > 1 = \\tan\\tfrac{\\pi}{4}'}</M>,
        so the angle must be bigger than <M>{'\\tfrac{\\pi}{4}'}</M>.
        {n1 === -3 && (
          <>
            {' '}Here <M>{'b = -\\tfrac{\\pi}{24}'}</M> also comes out negative, which <M>{'0 < b < 1'}</M> should have
            caught.
          </>
        )}
      </Notice>
    )
  } else if (aOK && contOK) {
    notice = (
      <Notice tone="warn">
        <b>It&apos;s the right curve, but <M>b</M> is wrong.</b> Both angles moved a whole branch along together, by{' '}
        <M>\pi</M> each, so <M>a</M> didn&apos;t change and <M>b</M> moved by <M>\pi</M>. <M>\tan</M> repeats every{' '}
        <M>\pi</M>, so this is exactly the same graph: the picture can&apos;t tell <M>b</M> from <M>b \pm \pi</M>.
        That is why the question insists on <M>{'0 < b < 1'}</M>, and here <M>{`b = ${bTex}`}</M> is outside it.
      </Notice>
    )
  } else if (aOK && bOK) {
    notice = (
      <Notice tone="warn">
        <b>
          <M>{'a > 0'}</M> and <M>{'0 < b < 1'}</M> both hold, but the graph breaks.
        </b>{' '}
        The angles <M>{'-\\tfrac{5\\pi}{4}'}</M> and <M>{'\\tfrac{4\\pi}{3}'}</M> are two branches apart, so as{' '}
        <M>x</M> runs from <M>-1</M> to <M>1</M> the angle <M>ax + b</M> passes both <M>{'-\\tfrac{\\pi}{2}'}</M> and{' '}
        <M>{'\\tfrac{\\pi}{2}'}</M>: asymptotes at <M>{`x = ${asymList}`}</M> (red). Only the condition &ldquo;continuous
        for <M>{'x \\in [-1, 1]'}</M>&rdquo; rules this one out, which is why the question states it.
      </Notice>
    )
  } else if (n1 === 9 && n2 === 4) {
    notice = (
      <Notice tone="warn">
        <b>This is the report&apos;s common error.</b> The curve does pass through both points, but between them the
        angle falls from <M>{'\\tfrac{3\\pi}{4}'}</M> to <M>{'\\tfrac{\\pi}{3},'}</M> passing{' '}
        <M>{'\\tfrac{\\pi}{2},'}</M> so there is an asymptote at <M>{'x = \\tfrac15'}</M> (red). <M>{'a = -\\tfrac{5\\pi}{24}'}</M>{' '}
        is negative, so each piece falls instead of rising, and <M>{'b = \\tfrac{13\\pi}{24} \\approx 1.70'}</M> is bigger
        than <M>1</M>. <M>{'\\tfrac{3\\pi}{4}'}</M> is a solution of <M>\tan u = -1</M>, but on the next branch along. Now
        choose <M>{'-\\tfrac{\\pi}{4}'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        The curve passes through both points, but the two angles are on different branches, so between <M>x = -1</M> and{' '}
        <M>x = 1</M> the angle <M>ax + b</M> passes an asymptote: the graph breaks at <M>{`x = ${asymList}`}</M> (red),
        which &ldquo;continuous for <M>{'x \\in [-1, 1]'}</M>&rdquo; forbids.
        {!aOK && <> And <M>{'a < 0'}</M>, so each piece falls instead of rising.</>}
        {!bOK && <> And <M>{`b \\approx ${num(b)}`}</M> is outside <M>(0, 1)</M>.</>} Both angles have to come from the
        same branch, and <M>{'0 < b < 1'}</M> says which one.
      </Notice>
    )
  }

  return (
    <div>
      {/* No y tick numbers: an asymptote near x = 0 (x = 1/5, 11/31) ran through them on a phone. */}
      <Plane x={[-2, 2]} y={[-3, 3]} xStep={1} yStep={1} height={300} yLabels={false}>
        <Region top={() => Y} bottom={() => -Y} from={-1} to={1} color={contOK ? C.good : C.bad} opacity={0.07} samples={2} />
        {asym.map(s => (
          <Line.Segment
            key={s.tex}
            point1={[s.x, -Y]}
            point2={[s.x, Y]}
            color={s.x > -1 && s.x < 1 ? C.bad : C.f}
            style="dashed"
            weight={s.x > -1 && s.x < 1 ? 2.5 : 1.5}
          />
        ))}
        {branches.map(([x0, x1]) => (
          <Plot.OfX key={x0} y={g} domain={[x0, x1]} color={C.f} weight={3} />
        ))}
        <Point x={-1} y={-1} color={C.ink} />
        {/* On the side of the point the curve doesn't pass through: below-right if it rises, below-left if it falls. */}
        <Label at={[-1, -1]} attach={aOK ? 'se' : 'sw'}>(−1, −1)</Label>
        <Point x={1} y={ROOT3} color={C.ink} />
        <Label at={[1, ROOT3]} attach="w">(1, √3)</Label>
        {!hitsOK && (
          <>
            <Point x={1} y={1 / ROOT3} color={C.bad} />
            <Label at={[1, 1 / ROOT3]} attach={aOK ? 'se' : 'ne'} color={C.bad}>(1, 1/√3)</Label>
          </>
        )}
      </Plane>
      <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-1">
        The shaded strip is <M>{'-1 \\le x \\le 1'}</M>, where the graph must be unbroken.
      </p>
      <Controls>
        <div className="flex flex-col gap-1.5">
          <p className="text-[12.5px] text-gray-600 dark:text-gray-300">
            At <M>x = -1</M>: <M>{'\\tan(-a + b) = -1'}</M>, so <M>-a + b =</M>
          </p>
          <div className="flex flex-wrap gap-2">
            {LEFT.map(o => (
              <Toggle key={o.n} label={<Katex tex={o.tex} />} checked={n1 === o.n} onChange={() => setN1(o.n)} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="text-[12.5px] text-gray-600 dark:text-gray-300">
            At <M>x = 1</M>: <M>{'\\tan(a + b) = \\sqrt3'}</M>, so <M>a + b =</M>
          </p>
          <div className="flex flex-wrap gap-2">
            {RIGHT.map(o => (
              <Toggle key={o.n} label={<Katex tex={o.tex} />} checked={n2 === o.n} onChange={() => setN2(o.n)} />
            ))}
          </div>
        </div>
        <Readouts>
          <Readout color={aOK ? C.good : C.bad} tex={`a = ${frac(aN, 24, true)}${aOK ? ' > 0' : ' < 0'}`} />
          <Readout color={bOK ? C.good : C.bad} tex={`b = ${bTex}${bOK ? '' : ' \\notin (0, 1)'}`} />
          <Readout
            color={contOK ? C.good : C.bad}
            tex={contOK ? '\\text{unbroken on } [-1, 1]' : `\\text{asymptote at } x = ${asymList}`}
          />
          <Readout color={hitsOK ? C.good : C.bad} tex={hitsOK ? '\\text{through } (1, \\sqrt3)' : '\\text{misses } (1, \\sqrt3)'} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
