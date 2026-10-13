// 2015 Methods Exam 1 Q8c — what independence pins down. The sample space is a unit square: the
// left column (width 1/3) is B, the right column (width 2/3) is B'. A fills 3/4 of the height of
// the B column (given Pr(A | B) = 3/4, so Pr(A ∩ B) = 1/4). The slider sets the share of B' that
// A fills, p = Pr(A | B'), in twelfths. Then Pr(A) = 1/4 + 2p/3 and Pr(A ∪ B) = 1/3 + 2p/3.
// Only p = 3/4 makes Pr(A) = Pr(A | B) = 3/4 (independence), and then Pr(A ∪ B) = 5/6. Starts at
// p = 1/6 (not independent) so the reader has to find the independent position.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Polygon, Readout, Readouts, Slider, Toggle } from './kit'

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
/** n/d in lowest terms, as TeX. */
const frac = (n: number, d: number) => {
  const g = gcd(n, d)
  const a = n / g
  const b = d / g
  return b === 1 ? String(a) : `\\tfrac{${a}}{${b}}`
}

const W = 1 / 3 // Pr(B): the width of the B column

export default function SameShare() {
  const [k, setK] = useState(2) // p = k/12
  const [union, setUnion] = useState(false)
  const p = k / 12
  const indep = k === 9
  // Pr(A) = 1/4 + (2/3)(k/12) = (9 + 2k)/36;  Pr(A ∪ B) = 1/3 + (2/3)(k/12) = (6 + k)/18
  const prA = frac(9 + 2 * k, 36)
  const prU = frac(6 + k, 18)

  return (
    <div>
      <Plane x={[0, 1]} y={[0, 1]} xStep={1} yStep={1} labels={false} xLabel="" yLabel="" height={260}>
        {/* A ∩ B and A ∩ B' */}
        <Polygon points={[[0, 0], [W, 0], [W, 0.75], [0, 0.75]]} color={C.f} fillOpacity={0.4} weight={0} strokeOpacity={0} />
        {k > 0 && <Polygon points={[[W, 0], [1, 0], [1, p], [W, p]]} color={indep ? C.good : C.g} fillOpacity={0.4} weight={0} strokeOpacity={0} />}
        {/* A ∪ B outline: the whole B column plus A ∩ B' */}
        {union && (
          <Polygon
            points={[[0, 0], [1, 0], [1, p], [W, p], [W, 1], [0, 1]]}
            color={C.violet}
            fillOpacity={0.12}
            weight={3}
          />
        )}
        {/* the sample space and the B | B' divider */}
        <Polygon points={[[0, 0], [1, 0], [1, 1], [0, 1]]} color={C.guide} fillOpacity={0} weight={2} />
        <Line.Segment point1={[W, 0]} point2={[W, 1]} color={C.ink} weight={2} />
        <Label at={[W / 2, 1]} attach="n">B</Label>
        <Label at={[(1 + W) / 2, 1]} attach="n">B′</Label>
        <Label at={[W / 2, 0.375]} attach="c">A∩B</Label>
        <Label at={[W / 2, 0.875]} attach="c" size={12} bold={false}>A′∩B</Label>
        {k >= 2 && <Label at={[(1 + W) / 2, p / 2]} attach="c">A∩B′</Label>}
      </Plane>
      <Controls>
        <Slider label="\Pr(A\mid B')" value={k} onChange={setK} min={0} max={12} step={1} format={v => (v === 0 ? '0' : v === 12 ? '1' : `${v / gcd(v, 12)}/${12 / gcd(v, 12)}`)} />
        <Toggle label="Outline A ∪ B" checked={union} onChange={setUnion} />
        <Readouts>
          <Readout color={C.f} tex="\Pr(A\mid B)=\tfrac34,\ \ \Pr(A\cap B)=\tfrac14" />
          <Readout color={indep ? C.good : C.g} tex={`\\Pr(A)=\\tfrac14+\\tfrac23\\times${frac(k, 12)}=${prA}`} />
          {union && <Readout color={C.violet} tex={`\\Pr(A\\cup B)=\\tfrac13+\\tfrac23\\times${frac(k, 12)}=${prU}`} />}
        </Readouts>
        {indep ? (
          <Notice tone="good">
            Now <M>A</M> fills <M>{'\\tfrac34'}</M> of <M>B'</M> as well as <M>{'\\tfrac34'}</M> of <M>B</M>, so{' '}
            <M>{'\\Pr(A)=\\tfrac34=\\Pr(A\\mid B)'}</M>: knowing <M>B</M> happened changes nothing. That is independence,
            and it is the only position where it holds. {union ? <>The outlined union is <M>{'\\tfrac56'}</M>, inside <M>{'[0,1]'}</M> as it must be.</> : <>Turn on the outline to read off <M>{'\\Pr(A\\cup B)'}</M>.</>}
          </Notice>
        ) : (
          <Notice>
            The blue block is fixed by the question: <M>A</M> fills <M>{'\\tfrac34'}</M> of <M>B</M>. On its own that does
            not decide <M>{'\\Pr(A)'}</M>: move the slider and <M>{'\\Pr(A)'}</M> changes. Independence says <M>A</M> must be
            just as common outside <M>B</M> as inside it. The <M>{"A\\cap B'"}</M> block has width{' '}
            <M>{'\\tfrac23'}</M> and height <M>{"\\Pr(A\\mid B')"}</M>: that area is the <M>{'\\tfrac23\\times'}</M> term
            in <M>{'\\Pr(A)'}</M>. Find the slider value that makes <M>{'\\Pr(A)=\\Pr(A\\mid B)'}</M>.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
