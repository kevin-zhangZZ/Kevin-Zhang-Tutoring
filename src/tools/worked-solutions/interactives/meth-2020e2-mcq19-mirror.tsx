// 2020 Methods Exam 2 MCQ 19 — why q(w) = p(20 − w). Twenty rolls of a die: w of them are not a 6
// (orange), so the other 20 − w are 6s (blue). "Exactly w non-sixes" and "exactly 20 − w sixes" are
// one event described two ways, so q(w) = p(20 − w). On the plot, p (X ~ Bi(20, 1/6), blue) and
// q (W ~ Bi(20, 5/6), orange) are each computed from their own binomial formula; the highlighted
// pair q(w) and p(20 − w) always sit at the same height, mirror images in x = 10. Slide w from the
// default 17 (q's peak, the mirror of p's peak at 3).

import { useState } from 'react'
import { C, Controls, Katex, Label, Line, M, Notice, Plane, Point, Readout, Readouts, Slider } from './kit'

const choose = (n: number, k: number) => {
  let r = 1
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i
  return r
}
/** p(x) = Pr(X = x), X ~ Bi(20, 1/6): the number of 6s. */
const p = (x: number) => choose(20, x) * (1 / 6) ** x * (5 / 6) ** (20 - x)
/** q(w) = Pr(W = w), W ~ Bi(20, 5/6): the number of rolls that are not a 6 — its own formula. */
const q = (w: number) => choose(20, w) * (5 / 6) ** w * (1 / 6) ** (20 - w)

const N = Array.from({ length: 21 }, (_, i) => i)

// A fixed "random" set of 20 rolls: ORDER says which rolls turn into 6s first as w goes down, and
// FACE is what a roll that isn't a 6 shows.
const ORDER = [6, 13, 2, 17, 9, 0, 15, 4, 11, 19, 7, 1, 14, 10, 3, 18, 5, 12, 16, 8]
const FACE = [3, 5, 1, 4, 2, 2, 5, 1, 3, 4, 1, 3, 5, 2, 4, 1, 3, 2, 5, 4]

/** A probability for a readout: 4 dp, or a power of ten when it is too small to show. */
function prob(v: number): string {
  if (v >= 0.0005) return v.toFixed(4)
  const e = Math.floor(Math.log10(v))
  const m = v / 10 ** e
  return `${m.toFixed(1)}\\times10^{${e}}`
}

const xTicks = (v: number) => (v > 0 && Math.round(v) % 2 === 0 ? String(Math.round(v)) : '')
// The y numbers go on the left of the axis (mafs puts them on the right, where the dots at x = 1
// and 2 sit right on top of 0.1 and 0.2); the x-range starts at −1.2 to make room for them.
const Y_NUMBERS = [0.1, 0.2, 0.3]

export default function Mirror() {
  const [w, setW] = useState(17)
  const x = 20 - w
  const h = q(w)
  const sixes = new Set(ORDER.slice(0, x))

  let notice
  if (w === 10) {
    notice = (
      <Notice>
        Ten rolls that aren&apos;t a 6 means ten that are, so <M>q(10) = p(10)</M>. This dot sits on the mirror line,
        so it is its own partner. It sits almost on the axis: ten 6s in twenty rolls is very unlikely (about 0.0005).
      </Notice>
    )
  } else if (w === 20) {
    notice = (
      <Notice>
        Twenty non-sixes means <b>no sixes at all</b>, so <M>{'q(20) = p(0) = \\left(\\tfrac56\\right)^{20} \\approx 0.026'}</M>. The
        last orange dot is the mirror image of the first blue one.
      </Notice>
    )
  } else if (w === 0) {
    notice = (
      <Notice>
        No non-sixes means <b>every</b> roll was a 6, so <M>{'q(0) = p(20) = \\left(\\tfrac16\\right)^{20}'}</M>, practically zero.
        Both dots are flat on the axis, at opposite ends.
      </Notice>
    )
  } else if (w === 17) {
    notice = (
      <Notice tone="good">
        <b>Seventeen rolls that aren&apos;t a 6 is the same event as three rolls that are.</b> So <M>q(17) = p(3)</M>, about
        0.238: the peak of <M>p</M> at 3 becomes the peak of <M>q</M> at 17. The two ringed dots are at the same height,
        equally far either side of <M>x = 10</M>. Slide <M>w</M> and watch every pair do the same.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <M>{`w = ${w}`}</M> rolls that aren&apos;t a 6 means <M>{`20 - ${w} = ${x}`}</M> that are: one event, described two
        ways. So <M>{`q(${w}) = p(${x})`}</M>, the same height, mirrored in <M>x = 10</M>. Write a general <M>w</M> in place
        of {w} and you have <M>q(w) = p(20 - w)</M>, option A.
      </Notice>
    )
  }

  return (
    <div>
      <div className="flex gap-[2px] sm:gap-1 mb-1.5" aria-label={`20 rolls: ${w} not a 6, ${x} sixes`}>
        {Array.from({ length: 20 }, (_, i) => {
          const six = sixes.has(i)
          return (
            <div
              key={i}
              className={`flex-1 min-w-0 rounded-[4px] sm:rounded-md border text-center py-1 text-[11px] sm:text-[13px] font-semibold tabular-nums ${
                six
                  ? 'bg-sky-100 border-sky-300 text-sky-900 dark:bg-sky-950/60 dark:border-sky-800 dark:text-sky-100'
                  : 'bg-orange-50 border-orange-200 text-orange-800 dark:bg-orange-950/40 dark:border-orange-900 dark:text-orange-200'
              }`}
            >
              {six ? 6 : FACE[i]}
            </div>
          )
        })}
      </div>
      <p className="text-[12.5px] text-gray-600 dark:text-gray-300 mb-3">
        Twenty rolls: <b className="text-orange-600 dark:text-orange-400">{w} not a 6</b>, so{' '}
        <b className="text-sky-600 dark:text-sky-400">{x} {x === 1 ? 'six' : 'sixes'}</b>.
      </p>
      <Plane x={[-1.2, 20]} y={[0, 0.3]} xStep={1} yStep={0.05} height={300} xLabel="" yLabel="" xLabels={xTicks} yLabels={false}>
        {Y_NUMBERS.map(v => (
          <Label key={v} at={[0, v]} attach="w" size={12} bold={false}>{v.toFixed(1)}</Label>
        ))}
        <Line.Segment point1={[10, 0]} point2={[10, 0.29]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[10, 0.29]} color={C.guide} attach="e" size={12}>x = 10</Label>
        {w !== 10 && <Line.Segment point1={[x, h]} point2={[w, h]} color={C.guide} style="dashed" weight={1.5} />}
        {N.map(k => (
          <Point key={`p${k}`} x={k} y={p(k)} color={C.f} svgCircleProps={{ r: 4 }} />
        ))}
        {N.map(k => (
          <Point key={`q${k}`} x={k} y={q(k)} color={C.g} svgCircleProps={{ r: 4 }} />
        ))}
        <Point x={x} y={p(x)} color={C.f} svgCircleProps={{ r: 9, style: { fill: 'none', stroke: C.f, strokeWidth: 2.5 } }} />
        <Point x={w} y={h} color={C.g} svgCircleProps={{ r: 9, style: { fill: 'none', stroke: C.g, strokeWidth: 2.5 } }} />
        {Math.abs(w - 10) >= 2 && (
          <>
            <Label at={[x, h]} color={C.f} attach="n" gap={13} size={12}>{`p(${x})`}</Label>
            <Label at={[w, h]} color={C.g} attach="n" gap={13} size={12}>{`q(${w})`}</Label>
          </>
        )}
      </Plane>
      <Controls>
        <Slider label="w" value={w} onChange={v => setW(Math.round(v))} min={0} max={20} step={1} format={v => String(Math.round(v))} />
        <Readouts>
          <Readout color={C.g} tex={`q(${w}) = \\binom{20}{${w}}\\left(\\tfrac56\\right)^{${w}}\\left(\\tfrac16\\right)^{${x}} \\approx ${prob(h)}`} />
          <Readout color={C.f} tex={`p(${x}) = \\binom{20}{${x}}\\left(\\tfrac16\\right)^{${x}}\\left(\\tfrac56\\right)^{${w}} \\approx ${prob(p(x))}`} />
        </Readouts>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">
          Blue dots: <Katex tex="p" />, the number of 6s. Orange dots: <Katex tex="q" />, the number of rolls that aren&apos;t a
          6, each from its own binomial formula. The two formulas match term for term, since{' '}
          <Katex tex={`\\binom{20}{${w}} = \\binom{20}{${x}} = ${choose(20, w)}`} />.
        </p>
        {notice}
      </Controls>
    </div>
  )
}
