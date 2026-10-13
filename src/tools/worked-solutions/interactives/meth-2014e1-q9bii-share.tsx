// 2014 Methods Exam 1 Q9b.ii — Pr(P | W) as a share of area. The unit square is every April
// morning: 5/8 of it pleasant (left), 3/8 unpleasant (right); in each column the walked mornings
// fill the bottom 3/4 or 1/3. On a 1/8 × 1/12 grid each cell is 1/96: the walked mornings are
// 45 blue + 12 orange = 57 cells (19/32), and the pleasant-and-walked share is 45/57 = 15/19.
// The report says students had the right denominator but the wrong numerator; the buttons try
// the two likely wrong ones, Pr(W | P) = 3/4 (gives 24/19) and Pr(P) = 5/8 (gives 20/19), both
// bigger than 1 because neither is a piece of the walked region.

import { useState } from 'react'
import { Buttons, C, Controls, Label, M, Notice, Plane, Polygon, Readout, Readouts, Toggle } from './kit'

type Choice = 'right' | 'cond' | 'prior'
const P = 5 / 8
const rect = (x0: number, x1: number, y0: number, y1: number): [number, number][] => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]

const NUM: Record<Choice, { tex: string; share: string }> = {
  right: { tex: '\\Pr(P\\cap W) = \\tfrac{15}{32}', share: '\\dfrac{15/32}{19/32} = \\tfrac{15}{19} \\approx 0.789' },
  cond: { tex: '\\Pr(W\\mid P) = \\tfrac34', share: '\\dfrac{3/4}{19/32} = \\tfrac{24}{19} \\approx 1.263' },
  prior: { tex: '\\Pr(P) = \\tfrac58', share: '\\dfrac{5/8}{19/32} = \\tfrac{20}{19} \\approx 1.053' },
}

export default function ShareOfWalked() {
  const [choice, setChoice] = useState<Choice>('right')

  let notice
  if (choice === 'right') {
    notice = (
      <Notice tone="good">
        Told she walked, only the coloured mornings are possible: <b>57 cells</b> (<M>{'\\tfrac{57}{96} = \\tfrac{19}{32}'}</M>, part b.i).
        Of those, the <b>45 blue cells</b> were pleasant. So <M>{'\\Pr(P\\mid W) = \\tfrac{45}{57} = \\tfrac{15}{19}'}</M>. The
        numerator is the blue block alone, which is the first product in part b.i. Now try a wrong numerator.
      </Notice>
    )
  } else if (choice === 'cond') {
    notice = (
      <Notice tone="warn">
        <M>{'\\tfrac34'}</M> is the blue block&apos;s share of the <b>pleasant column</b>, not an area of the square: it answers the
        reverse question, &ldquo;given pleasant, did she walk?&rdquo;. Dividing it by <M>{'\\tfrac{19}{32}'}</M> gives{' '}
        <M>{'\\tfrac{24}{19}'}</M>, more than 1, which no probability can be.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <M>{'\\Pr(P) = \\tfrac58'}</M> is the whole red-outlined column, including the grey mornings when she <b>didn&apos;t</b> walk.
        Those are ruled out by &ldquo;given she walked&rdquo;, so they can&apos;t be in the numerator. The result,{' '}
        <M>{'\\tfrac{20}{19}'}</M>, is again bigger than 1.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 1]} y={[0, 1.1]} xStep={1 / 8} yStep={1 / 12} labels={false} xLabel="" yLabel="" height={300}>
        {/* not walked */}
        <Polygon points={rect(0, P, 3 / 4, 1)} color={C.guide} fillOpacity={0.18} weight={0} strokeOpacity={0} />
        <Polygon points={rect(P, 1, 1 / 3, 1)} color={C.guide} fillOpacity={0.18} weight={0} strokeOpacity={0} />
        {/* walked */}
        <Polygon points={rect(0, P, 0, 3 / 4)} color={C.f} fillOpacity={choice === 'right' ? 0.5 : 0.3} weight={choice === 'right' ? 3 : 1} />
        <Polygon points={rect(P, 1, 0, 1 / 3)} color={C.g} fillOpacity={0.35} weight={1} />
        {/* the columns */}
        <Polygon points={rect(0, 1, 0, 1)} color={C.ink} fillOpacity={0} weight={2} />
        <Polygon points={rect(P, P, 0, 1)} color={C.ink} fillOpacity={0} weight={2} />
        {choice === 'prior' && <Polygon points={rect(0, P, 0, 1)} color={C.bad} fillOpacity={0} weight={4} />}
        <Label at={[P / 2, 1]} attach="n">pleasant  5/8</Label>
        <Label at={[(1 + P) / 2, 1]} attach="n">unpleasant  3/8</Label>
        <Label at={[P / 2, 3 / 8]} attach="c" color={C.ink}>P ∩ W: 45 cells</Label>
        <Label at={[(1 + P) / 2, 1 / 6]} attach="c" color={C.ink}>P′ ∩ W: 12 cells</Label>
        <Label at={[P / 2, 7 / 8]} attach="c" color={C.guide}>didn&apos;t walk</Label>
        <Label at={[(1 + P) / 2, 2 / 3]} attach="c" color={C.guide}>didn&apos;t walk</Label>
        {choice === 'cond' && <Label at={[0.02, 3 / 4]} attach="se" color={C.bad}>height 3/4</Label>}
      </Plane>
      <Controls>
        <Buttons>
          <Toggle label="Pr(P ∩ W)" checked={choice === 'right'} onChange={() => setChoice('right')} />
          <Toggle label="Pr(W | P)" checked={choice === 'cond'} onChange={() => setChoice('cond')} />
          <Toggle label="Pr(P)" checked={choice === 'prior'} onChange={() => setChoice('prior')} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\text{numerator: } ${NUM[choice].tex}`} />
          <Readout tex={'\\text{denominator: } \\Pr(W) = \\tfrac{19}{32}'} />
          <Readout color={choice === 'right' ? C.good : C.bad} tex={NUM[choice].share} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
