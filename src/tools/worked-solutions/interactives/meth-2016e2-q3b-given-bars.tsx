// 2016 Methods Exam 2 Q3b — "given at least one" shrinks the sample space. The bars are
// Bi(22, 0.1); the X = 0 bar is ruled out by the condition, so the denominator is the area of the
// bars X ≥ 1 (0.9015) and the numerator is the bars inside it that are also "fewer than five",
// X = 1 to 4 (0.8394), giving 0.9311. Two toggles show the report's wrong numerators: including
// X = 5 gives 0.9798, and leaving X = 0 on top gives 0.9378 / 0.9015 = 1.040, more than 1.

import { useState } from 'react'
import { Buttons, C, Controls, Label, M, Notice, Plane, Polygon, Readout, Readouts, Toggle } from './kit'

const N = 22
const P = 0.1
function choose(n: number, k: number) {
  let r = 1
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i
  return r
}
const PMF = Array.from({ length: N + 1 }, (_, k) => choose(N, k) * P ** k * (1 - P) ** (N - k))
const SHOW = 9 // bars X = 0 … 8 (the rest are too small to see)
const DENOM = 1 - PMF[0]

export default function GivenBars() {
  const [with5, setWith5] = useState(false)
  const [with0, setWith0] = useState(false)

  const lo = with0 ? 0 : 1
  const hi = with5 ? 5 : 4
  const inTop = (k: number) => k >= lo && k <= hi
  const top = PMF.slice(lo, hi + 1).reduce((a, b) => a + b, 0)
  const ratio = top / DENOM
  const right = !with0 && !with5

  let notice
  if (with0) {
    notice = (
      <Notice tone="warn">
        The numerator now includes the <M>X = 0</M> bar, which the teacher has already ruled out. The top is no longer
        part of the bottom, and the &ldquo;probability&rdquo; comes out as <M>{ratio.toFixed(4)}</M>, more than{' '}
        <M>1</M>. The numerator must be the overlap of both events: <M>{'1 \\le X \\le 4'}</M>.
      </Notice>
    )
  } else if (with5) {
    notice = (
      <Notice tone="warn">
        &ldquo;Fewer than five&rdquo; stops at <M>4</M>. Adding the <M>X = 5</M> bar gives <M>{ratio.toFixed(4)}</M>,
        the wrong answer the report mentions. Turn this off again.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        Being told &ldquo;at least one&rdquo; throws away the grey <M>X = 0</M> bar: the blue and green bars are now
        the whole world, with total probability <M>{DENOM.toFixed(4)}</M>. The answer is the green share of that:{' '}
        <M>{`${top.toFixed(4)} \\div ${DENOM.toFixed(4)}`}</M>. Try the two toggles to see the report&apos;s wrong
        numerators.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-0.7, 8.7]} y={[0, 0.33]} xStep={1} yStep={0.1} height={300} xLabel="X" yLabel="" yLabels={false}>
        {PMF.slice(0, SHOW).map((pr, k) => {
          const color = k === 0 && !with0 ? C.guide : inTop(k) ? C.good : C.f
          return (
            <Polygon
              key={k}
              points={[[k - 0.35, 0], [k + 0.35, 0], [k + 0.35, pr], [k - 0.35, pr]]}
              color={color}
              fillOpacity={inTop(k) ? 0.6 : 0.25}
              weight={1.5}
            />
          )
        })}
        {PMF.slice(0, 6).map((pr, k) => (
          <Label key={k} at={[k, pr]} attach="n" size={11}>
            {pr.toFixed(3)}
          </Label>
        ))}
        <Label at={[0, 0]} attach="s" size={13} bold={false}>
          0
        </Label>
        {!with0 && (
          <Label at={[0, PMF[0] + 0.05]} attach="n" size={11} color={C.bad}>
            ruled out
          </Label>
        )}
      </Plane>
      <Controls>
        <Buttons>
          <Toggle label="Include X = 5 on top" checked={with5} onChange={v => { setWith5(v); if (v) setWith0(false) }} />
          <Toggle label="Use Pr(X ≤ 4) on top" checked={with0} onChange={v => { setWith0(v); if (v) setWith5(false) }} />
        </Buttons>
        <Readouts>
          <Readout color={C.good} tex={`\\text{top: }\\Pr(${lo} \\le X \\le ${hi}) = ${top.toFixed(4)}`} />
          <Readout color={C.f} tex={`\\text{bottom: }\\Pr(X \\ge 1) = ${DENOM.toFixed(4)}`} />
          <Readout color={right ? C.good : C.bad} tex={`\\text{ratio} = ${ratio.toFixed(4)}${right ? '\\ \\checkmark' : ''}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
