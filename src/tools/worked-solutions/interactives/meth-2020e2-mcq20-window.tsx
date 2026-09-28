// 2020 Methods Exam 2 MCQ 20 — which interval D gives g(x) = log₂(cos(2πx)) the range [−1, 0]?
// log₂ is increasing with log₂(1/2) = −1 and log₂(1) = 0, so on D the cosine must stay inside the
// green band 1/2 ≤ y ≤ 1 and touch both edges. Pick an option: its window is shaded and the piece of
// y = cos(2πx) over it drawn thick, with the live range of the cosine and of g. Only B = [1, 7/6]
// fits (a crest at x = 1 falling to exactly 1/2 at x = 7/6). C is D moved 2 units right, the same
// piece of graph. The toggle swaps in a = 4π (also allowed by the property): then no option fits.

import { useState, type ReactNode } from 'react'
import { Buttons, C, Controls, Katex, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Toggle } from './kit'

type Letter = 'A' | 'B' | 'C' | 'D' | 'E'
const OPTIONS: { letter: Letter; tex: string; lo: number; hi: number }[] = [
  { letter: 'A', tex: '\\left[\\tfrac14, \\tfrac{5}{12}\\right]', lo: 1 / 4, hi: 5 / 12 },
  { letter: 'B', tex: '\\left[1, \\tfrac76\\right]', lo: 1, hi: 7 / 6 },
  { letter: 'C', tex: '\\left[\\tfrac53, 2\\right]', lo: 5 / 3, hi: 2 },
  { letter: 'D', tex: '\\left[-\\tfrac13, 0\\right]', lo: -1 / 3, hi: 0 },
  { letter: 'E', tex: '\\left[-\\tfrac1{12}, \\tfrac14\\right]', lo: -1 / 12, hi: 1 / 4 },
]

const X0 = -0.5
const X1 = 2.25
const Y = 1.25

/** Smallest and largest value of cos(a x) on [lo, hi] (sampled finely enough for a readout). */
function range(a: number, lo: number, hi: number): [number, number] {
  let mn = Infinity
  let mx = -Infinity
  for (let i = 0; i <= 2000; i++) {
    const c = Math.cos(a * (lo + ((hi - lo) * i) / 2000))
    mn = Math.min(mn, c)
    mx = Math.max(mx, c)
  }
  return [mn, mx]
}
/** 2 dp for TeX; a negative is braced so KaTeX sets it as a sign, not a binary minus after text. */
const fmt = (v: number) => {
  const s = Math.abs(v) < 5e-4 ? '0.00' : v.toFixed(2)
  return s.startsWith('-') ? `{${s}}` : s
}

const xTicks = (v: number) => {
  if (v > X1 + 1e-9 || Math.abs(v * 2 - Math.round(v * 2)) > 1e-9) return ''
  const r = Math.round(v * 2)
  return r % 2 === 0 ? String(r / 2) : `${r}/2`
}

export default function Window() {
  const [letter, setLetter] = useState<Letter>('B')
  const [fast, setFast] = useState(false)
  const a = fast ? 4 * Math.PI : 2 * Math.PI
  const opt = OPTIONS.find(o => o.letter === letter)!
  const [mn, mx] = range(a, opt.lo, opt.hi)
  const defined = mn > 1e-9
  const works = Math.abs(mn - 0.5) < 1e-6 && Math.abs(mx - 1) < 1e-6
  const cos = (x: number) => Math.cos(a * x)
  const aTex = fast ? '4\\pi' : '2\\pi'
  // Band labels go where the curve is below the band: x from −1/2 to about −1/6 for 2π (room for
  // "y = 1"), but only the narrow gap −5/12 to −1/12 for 4π (a crest at x = −1/2), so there they are
  // shortened and centred in the gap.
  const bandLabels = fast
    ? { x: -0.25, top: 's' as const, bottom: 'n' as const, one: '1', half: '½' }
    : { x: X0, top: 'se' as const, bottom: 'ne' as const, one: 'y = 1', half: 'y = ½' }

  const slow: Record<Letter, ReactNode> = {
    A: (
      <Notice tone="warn">
        On <M>{'\\left[\\tfrac14, \\tfrac5{12}\\right]'}</M> the angle <M>2\pi x</M> runs from <M>{'\\tfrac\\pi2'}</M> to{' '}
        <M>{'\\tfrac{5\\pi}6'}</M>: the cosine starts at 0 and goes <b>negative</b>, so <M>{'\\log_2'}</M> isn&apos;t defined
        anywhere on it. (A would be right for <M>\sin(2\pi x)</M>, whose graph is this one moved a quarter of a unit
        right.)
      </Notice>
    ),
    B: (
      <Notice tone="good">
        <b>This one fits.</b> At <M>x = 1</M> the angle is <M>2\pi</M>, a crest, so the cosine is 1; by{' '}
        <M>{'x = \\tfrac76'}</M> the angle is <M>{'\\tfrac{7\\pi}3 = 2\\pi + \\tfrac\\pi3'}</M> and it has fallen to exactly{' '}
        <M>{'\\tfrac12'}</M>, never leaving the band. So <M>g</M> runs from <M>{'\\log_2 1 = 0'}</M> down to{' '}
        <M>{'\\log_2\\tfrac12 = -1'}</M>: all of <M>[-1, 0]</M> and nothing else. Now try the others.
      </Notice>
    ),
    C: (
      <Notice tone="warn">
        <M>{'\\left[\\tfrac53, 2\\right]'}</M> starts at <M>{'\\cos\\tfrac{10\\pi}3 = -\\tfrac12'}</M>, below the band, and
        crosses 0, where <M>{'\\log_2'}</M> breaks. It does end on a crest. Look at D: C is D moved 2 units right, so with
        period 1 it is the <b>same piece of graph</b>. C and D had to stand or fall together.
      </Notice>
    ),
    D: (
      <Notice tone="warn">
        <M>{'\\left[-\\tfrac13, 0\\right]'}</M> climbs from <M>{'\\cos\\left(-\\tfrac{2\\pi}3\\right) = -\\tfrac12'}</M> up to 1.
        It reaches the top of the band but starts well below it, through 0, where <M>{'\\log_2'}</M> is undefined. Its
        twin C (the same piece, 2 units right) fails the same way.
      </Notice>
    ),
    E: (
      <Notice tone="warn">
        <M>{'\\left[-\\tfrac1{12}, \\tfrac14\\right]'}</M> contains the crest at <M>x = 0</M>, but it runs on down to{' '}
        <M>{'\\cos\\tfrac\\pi2 = 0'}</M> at <M>{'x = \\tfrac14'}</M>. There <M>{'\\log_2'}</M> is undefined, and just before it{' '}
        <M>g</M> plunges far below <M>-1</M>. The window is too wide.
      </Notice>
    ),
  }

  const notice = fast ? (
    <Notice tone="warn">
      With <M>a = 4\pi</M> (two cycles per unit, which the property also allows) the wave is twice as steep, so it can stay in
      the band only over <M>{'\\tfrac16'}</M> of a unit: exactly the width of A and B, and C, D and E are twice as wide. Neither
      A nor B lines up: B now falls from 1 right through the band to <M>{'-\\tfrac12'}</M>. <b>No option works for{' '}
      <M>a = 4\pi</M></b>, or for any faster wave, so the answer rests on <M>a = 2\pi</M>.
    </Notice>
  ) : (
    slow[letter]
  )

  return (
    <div>
      <Buttons>
        {OPTIONS.map(o => (
          <Toggle
            key={o.letter}
            checked={o.letter === letter}
            onChange={() => setLetter(o.letter)}
            label={
              <span className="inline-flex items-center gap-1.5">
                {o.letter}
                <Katex tex={o.tex} />
              </span>
            }
          />
        ))}
      </Buttons>
      <div className="mt-3">
        <Plane x={[X0, X1]} y={[-Y, Y]} xStep={0.25} yStep={0.5} height={280} xLabels={xTicks} yLabels={false}>
          <Polygon points={[[X0, 0.5], [X1, 0.5], [X1, 1], [X0, 1]]} color={C.good} fillOpacity={0.14} weight={0} strokeOpacity={0} />
          <Line.Segment point1={[X0, 0.5]} point2={[X1, 0.5]} color={C.good} style="dashed" weight={1.5} />
          <Line.Segment point1={[X0, 1]} point2={[X1, 1]} color={C.good} style="dashed" weight={1.5} />
          <Label at={[bandLabels.x, 1]} color={C.good} attach={bandLabels.top} size={12} gap={3}>{bandLabels.one}</Label>
          <Label at={[bandLabels.x, 0.5]} color={C.good} attach={bandLabels.bottom} size={12} gap={3}>{bandLabels.half}</Label>
          <Polygon
            points={[[opt.lo, -Y], [opt.hi, -Y], [opt.hi, Y], [opt.lo, Y]]}
            color={C.guide}
            fillOpacity={0.18}
            weight={0}
            strokeOpacity={0}
          />
          <Plot.OfX y={cos} domain={[X0, X1]} color={C.f} weight={2.5} minSamplingDepth={9} />
          <Plot.OfX y={cos} domain={[opt.lo, opt.hi]} color={works ? C.good : C.g} weight={6} />
          <Point x={opt.lo} y={cos(opt.lo)} color={works ? C.good : C.g} />
          <Point x={opt.hi} y={cos(opt.hi)} color={works ? C.good : C.g} />
          <Label at={[(opt.lo + opt.hi) / 2, Y]} attach="n" size={13} gap={4}>{letter}</Label>
        </Plane>
      </div>
      <Controls>
        <Buttons>
          <Toggle label={<>What about <M>a = 4\pi</M>?</>} checked={fast} onChange={setFast} />
        </Buttons>
        <Readouts>
          <Readout color={works ? C.good : C.g} tex={`\\cos(${aTex} x) \\text{ on } ${opt.tex}: \\text{ from } ${fmt(mn)} \\text{ to } ${fmt(mx)}`} />
          <Readout
            color={works ? C.good : C.bad}
            tex={
              !defined
                ? `g \\text{ undefined where } \\cos \\le 0`
                : `\\text{range of } g = [${fmt(Math.log2(mn))},\\ ${fmt(Math.log2(mx))}]${works ? '\\ \\checkmark' : ''}`
            }
          />
        </Readouts>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">
          Blue: <M>{`y = \\cos(${aTex} x)`}</M>. Green band: <M>{'\\tfrac12 \\le y \\le 1'}</M>, the values that{' '}
          <M>{'\\log_2'}</M> turns into <M>[-1, 0]</M>. Grey strip: the chosen interval <M>D</M>.
        </p>
        {notice}
      </Controls>
    </div>
  )
}
