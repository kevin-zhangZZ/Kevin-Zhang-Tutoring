// 2020 Methods Exam 2 MCQ 10 — which n make x = log₂(n + 1) a positive integer? The curve
// y = log₂(n + 1) is plotted with a dot at every whole number n from 0 to 16, and the positive
// integer heights x = 1, 2, 3, 4 are drawn as dashed "rungs". Only four dots sit on a rung:
// n = 1, 3, 7, 15, where n + 1 = 2, 4, 8, 16 is a power of 2. So n = 2^k − 1, and the gaps
// between the right n's double each time. Buttons ring the n-values of each option (green on a
// rung, red off it): B hits every rung and nothing else; D (the odd numbers) contains all the
// right n's but also 5, 9, 11, 13 — and agrees with B for k = 1 and 2, so testing only small k
// can't separate them; A and E never land on a rung; C only at n = 1. Values computed from the
// question's own rule and the five options' rules (checked in Python).

import { useEffect, useRef, useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Toggle } from './kit'

const N_MAX = 16
const lg = (n: number) => Math.log2(n + 1)
const isHit = (n: number) => n >= 1 && Number.isInteger(n) && Math.abs(lg(n) - Math.round(lg(n))) < 1e-12
const HITS = [1, 3, 7, 15]

type Opt = 'A' | 'B' | 'C' | 'D' | 'E'
const OPTIONS: Record<Opt, { tex: string; rule: (k: number) => number }> = {
  A: { tex: 'n = 2^k', rule: k => 2 ** k },
  B: { tex: 'n = 2^k - 1', rule: k => 2 ** k - 1 },
  C: { tex: 'n = 2^{k-1}', rule: k => 2 ** (k - 1) },
  D: { tex: 'n = 2k - 1', rule: k => 2 * k - 1 },
  E: { tex: 'n = 2k', rule: k => 2 * k },
}

/** The option's n-values for k = 1, 2, 3, … that fit on the plane. */
function valuesOf(o: Opt): number[] {
  const out: number[] = []
  for (let k = 1; k <= 20; k++) {
    const n = OPTIONS[o].rule(k)
    if (n > N_MAX) break
    out.push(n)
  }
  return out
}

/** The widget's width, so the n-axis can drop some grey labels on a phone. */
function useWidth() {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(700)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    setWidth(el.getBoundingClientRect().width)
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(entries => setWidth(entries[0]?.contentRect.width ?? 700))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, width] as const
}

export default function LogLadder() {
  const [opt, setOpt] = useState<Opt | null>(null)
  const [ref, width] = useWidth()
  // On a narrow screen the two-digit labels would touch: keep the four hits and the even n up to 12.
  const showN = (n: number) => isHit(n) || width >= 520 || (n % 2 === 0 && n <= 12)
  const vals = opt ? valuesOf(opt) : []
  const hits = vals.filter(isHit).length

  let notice
  if (opt === null) {
    notice = (
      <Notice>
        Each dot is a whole number <M>n</M>, sitting at height <M>x = \log_2(n+1)</M>. The dashed green rungs are the
        heights <M>x = 1, 2, 3, 4</M>, the positive integers. Only four dots land on a rung: <M>n = 1, 3, 7, 15</M>, where{' '}
        <M>n + 1 = 2, 4, 8, 16</M> is a power of 2. Notice the gaps between them: 2, 4, 8, doubling each time. That doubling
        is the signature of <M>2^k</M>. Now test the options.
      </Notice>
    )
  } else if (opt === 'B') {
    notice = (
      <Notice tone="good">
        <b>Every ring is green, and every rung is caught.</b> <M>{'n = 2^k - 1'}</M> gives <M>n + 1 = 2^k</M>, so{' '}
        <M>{'x = \\log_2(2^k) = k'}</M>: <M>k = 1</M> lands on rung 1, <M>k = 2</M> on rung 2, and so on up the ladder. Because{' '}
        <M>k</M> runs over the positive integers, <M>n = 0</M> (which gives <M>x = 0</M>, not positive) is correctly left out.
      </Notice>
    )
  } else if (opt === 'D') {
    notice = (
      <Notice tone="warn">
        <b>The odd numbers catch every right answer, but too much else.</b> <M>n = 1</M> and <M>n = 3</M> are green, just as
        in option B, so testing only <M>k = 1</M> and <M>k = 2</M> can&apos;t tell B and D apart. At <M>k = 3</M>, D gives{' '}
        <M>n = 5</M> and <M>{'\\log_2 6 \\approx 2.58'}</M>: between rungs. A linear rule steps by 2 every time; the right
        values double their gaps. When you test options, test a third value.
      </Notice>
    )
  } else if (opt === 'A') {
    notice = (
      <Notice tone="warn">
        <b>Every ring is red.</b> <M>n = 2^k</M> gives <M>n + 1 = 2^k + 1 = 3, 5, 9, 17</M>, always one <i>more</i> than a
        power of 2, so each dot sits above a rung, never on one (<M>{'\\log_2 3 \\approx 1.58'}</M>, <M>{'\\log_2 5 \\approx 2.32'}</M>).
        The <M>-1</M> from <M>n + 1 = 2^x</M> has been dropped.
      </Notice>
    )
  } else if (opt === 'C') {
    notice = (
      <Notice tone="warn">
        <b>Only <M>n = 1</M> works.</b> <M>{'n = 2^{k-1}'}</M> gives 1, 2, 4, 8, 16, and after the first one each{' '}
        <M>n + 1</M> is 3, 5, 9, 17: never a power of 2. This rule solves <M>\log_2(n) + 1 = x</M>, a different equation:
        the <M>+1</M> has been pulled outside the logarithm.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <b>Every ring is red.</b> <M>n = 2k</M> is even, so <M>n + 1</M> is odd, and no odd number bigger than 1 is a power
        of 2. None of these <M>n</M> give a whole-number <M>x</M>.
      </Notice>
    )
  }

  return (
    <div ref={ref}>
      <Plane x={[0, N_MAX]} y={[0, 4.5]} xStep={1} yStep={1} height={300} labels={false} xLabel="n" yLabel="">
        {/* The rungs: positive integer values of x. */}
        {[1, 2, 3, 4].map(k => (
          <Line.Segment key={`r${k}`} point1={[0, k]} point2={[N_MAX, k]} color={C.good} style="dashed" weight={1.5} opacity={0.7} />
        ))}
        {[1, 2, 3, 4].map(k => (
          <Label key={`y${k}`} at={[0, k]} attach="w" size={12} color={C.good}>
            {k}
          </Label>
        ))}
        <Label at={[0, 4.5]} attach="ne" size={13} italic>
          x = log₂(n + 1)
        </Label>
        <Plot.OfX y={lg} domain={[0, N_MAX]} color={C.f} weight={2.5} />
        {/* Drop lines from the four hits to the n-axis. */}
        {HITS.map(n => (
          <Line.Segment key={`d${n}`} point1={[n, 0]} point2={[n, lg(n)]} color={C.good} style="dashed" weight={1.5} />
        ))}
        {Array.from({ length: N_MAX + 1 }, (_, n) => n).map(n =>
          isHit(n) ? (
            <Point key={`p${n}`} x={n} y={lg(n)} color={C.good} svgCircleProps={{ r: 5 }} />
          ) : (
            <Point key={`p${n}`} x={n} y={lg(n)} color={C.guide} svgCircleProps={{ r: 3.5 }} />
          ),
        )}
        {vals.map(n => (
          <Point
            key={`o${n}`}
            x={n}
            y={lg(n)}
            color={isHit(n) ? C.good : C.bad}
            svgCircleProps={{ r: 9, style: { fill: 'none', stroke: isHit(n) ? C.good : C.bad, strokeWidth: 2.5 } }}
          />
        ))}
        {/* n-values under the axis: the four hits in green, the rest small and grey. */}
        {Array.from({ length: N_MAX }, (_, i) => i + 1).filter(showN).map(n => (
          <Label
            key={`n${n}`}
            at={[n, 0]}
            attach="s"
            gap={6}
            size={isHit(n) ? 12 : 10}
            bold={isHit(n)}
            color={isHit(n) ? C.good : C.guide}
          >
            {n}
          </Label>
        ))}
      </Plane>
      <Controls>
        <Buttons>
          <span className="text-[12.5px] text-gray-500 dark:text-gray-400">Test an option:</span>
          {(Object.keys(OPTIONS) as Opt[]).map(o => (
            <Toggle key={o} label={o} checked={opt === o} onChange={v => setOpt(v ? o : null)} />
          ))}
        </Buttons>
        {opt && (
          <Readouts>
            <Readout color={hits === vals.length ? C.good : C.bad} tex={`\\text{${opt}: } ${OPTIONS[opt].tex} = ${vals.slice(0, 5).join(', ')}, \\ldots`} />
            <Readout tex={`\\text{on a rung: } ${hits} \\text{ of the } ${vals.length} \\text{ shown}`} />
          </Readouts>
        )}
        {notice}
      </Controls>
    </div>
  )
}
