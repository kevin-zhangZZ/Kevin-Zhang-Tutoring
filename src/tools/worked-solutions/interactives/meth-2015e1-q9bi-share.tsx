// 2015 Methods Exam 1 Q9b.i — Pr(B | W) as a share of area. The unit square is every egg in the
// warehouse: farm A's column has width p, farm B's width 1 − p; white eggs fill the bottom 3/5 of
// A's column and the bottom 1/5 of B's. Total white area (2p + 1)/5 (part a), B-and-white area
// (1 − p)/5, so Pr(B | W) = (1 − p)/(2p + 1): both areas carry the factor 1/5, which cancels.
// The report says students recognised conditional probability but could not apply it in context
// and mishandled the algebraic fractions; the toggle shows the likely confusion, Pr(W | B) = 1/5,
// which is orange's share of farm B's column, not of the white eggs. Readouts checked with sympy
// (p = 0.5 gives 1/4).

import { useState } from 'react'
import { Buttons, C, Controls, Label, M, Notice, Plane, Polygon, Readout, Readouts, Slider, Toggle } from './kit'

const rect = (x0: number, x1: number, y0: number, y1: number): [number, number][] => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]

export default function WhiteEggShare() {
  const [p, setP] = useState(0.5)
  const [reverse, setReverse] = useState(false)

  const white = (2 * p + 1) / 5
  const bw = (1 - p) / 5
  const share = bw / white

  return (
    <div>
      <Plane x={[0, 1]} y={[0, 1.12]} xStep={0.1} yStep={0.2} labels={false} xLabel="" yLabel="" height={300}>
        {/* not-white eggs, ruled out once we're told the egg is white */}
        <Polygon points={rect(0, p, 3 / 5, 1)} color={C.guide} fillOpacity={0.15} weight={0} strokeOpacity={0} />
        <Polygon points={rect(p, 1, 1 / 5, 1)} color={C.guide} fillOpacity={0.15} weight={0} strokeOpacity={0} />
        {/* white eggs */}
        <Polygon points={rect(0, p, 0, 3 / 5)} color={C.f} fillOpacity={0.35} weight={1} />
        <Polygon points={rect(p, 1, 0, 1 / 5)} color={C.g} fillOpacity={0.6} weight={reverse ? 1 : 3} />
        <Polygon points={rect(0, 1, 0, 1)} color={C.ink} fillOpacity={0} weight={2} />
        <Polygon points={rect(p, p, 0, 1)} color={C.ink} fillOpacity={0} weight={2} />
        {reverse && <Polygon points={rect(p, 1, 0, 1)} color={C.bad} fillOpacity={0} weight={4} />}
        {p > 0.12 && <Label at={[p / 2, 1]} attach="n">A</Label>}
        {p < 0.88 && <Label at={[(1 + p) / 2, 1]} attach="n">B</Label>}
        {p > 0.2 && <Label at={[p / 2, 3 / 10]} attach="c" color={C.ink}>A ∩ W</Label>}
        {p < 0.8 && <Label at={[(1 + p) / 2, 1 / 10]} attach="c" color={C.ink}>B ∩ W</Label>}
        {p > 0.2 && <Label at={[p / 2, 4 / 5]} attach="c" color={C.guide}>not white</Label>}
        {p < 0.8 && <Label at={[(1 + p) / 2, 3 / 5]} attach="c" color={C.guide}>not white</Label>}
      </Plane>
      <Controls>
        <Slider label="p" value={p} onChange={setP} min={0.05} max={0.95} step={0.05} />
        <Buttons>
          <Toggle label="Show Pr(W | B) = 1/5 instead" checked={reverse} onChange={setReverse} />
        </Buttons>
        <Readouts>
          <Readout tex={`\\Pr(W) = \\tfrac{2p+1}{5} = ${white.toFixed(2)}`} />
          <Readout color={C.g} tex={`\\Pr(B\\cap W) = \\tfrac{1-p}{5} = ${bw.toFixed(2)}`} />
          <Readout color={C.good} tex={`\\Pr(B\\mid W) = \\tfrac{1-p}{2p+1} = ${share.toFixed(3)}`} />
        </Readouts>
        {reverse ? (
          <Notice tone="warn">
            <M>{'\\tfrac15'}</M> is the orange block&apos;s share of <b>farm B&apos;s column</b> (red outline): it answers the
            reverse question, &ldquo;given farm B, is it white?&rdquo;. Part (b)(i) is told the egg is <b>white</b>, so the
            whole you divide by is the coloured region, not farm B&apos;s column. Turn the toggle off.
          </Notice>
        ) : (
          <Notice>
            Told the egg is white, only the <b>coloured</b> eggs are possible; the grey (not white) eggs are ruled out. Orange (farm B)
            is <M>{'\\tfrac{1-p}{5}'}</M> of the square out of <M>{'\\tfrac{2p+1}{5}'}</M> coloured, and the{' '}
            <M>{'\\tfrac15'}</M> on both cancels. Drag <M>p</M> to <M>0.45</M>: orange shrinks to just under{' '}
            <M>0.3</M> of the coloured area. It is exactly <M>0.3</M> at <M>{'p = \\tfrac{7}{16} = 0.4375'}</M>, between slider steps: part (b)(ii).
          </Notice>
        )}
      </Controls>
    </div>
  )
}
