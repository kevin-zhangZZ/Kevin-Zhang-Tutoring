// 2021 Specialist Exam 2 MCQ 9 — f has a point of inflection only where f''(x) CHANGES SIGN.
// Pick an option and see the graph of its f''(x), shaded green where f'' > 0 (concave up) and
// orange where f'' < 0 (concave down). Every option has f''(x) = 0 somewhere; in A, C, D and E
// that zero is a crossing (a point of inflection, marked), but B's f''(x) = 6(x − 3)² only
// touches the axis at x = 3 and stays ≥ 0 on both sides, so f never changes concavity.
// Starts on B, the touching zero.

import { useState, type ReactNode } from 'react'
import { Buttons, C, Controls, Label, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Toggle, clamp, tick } from './kit'

type Opt = 'A' | 'B' | 'C' | 'D' | 'E'

type Zero = { x: number; crosses: boolean; attach: 'nw' | 'ne' | 's' }

const OPTS: Record<Opt, { f2: (x: number) => number; tex: string; zeros: Zero[]; signs: string }> = {
  A: { f2: x => 4 * (x - 3), tex: '4(x-3)', zeros: [{ x: 3, crosses: true, attach: 'nw' }], signs: '-\\;\\underset{x=3}{|}\\;+' },
  B: { f2: x => 6 * (x - 3) ** 2, tex: '6(x-3)^2', zeros: [{ x: 3, crosses: false, attach: 's' }], signs: '+\\;\\underset{x=3}{|}\\;+' },
  C: { f2: x => 5 * (x - 3), tex: '5(x-3)', zeros: [{ x: 3, crosses: true, attach: 'nw' }], signs: '-\\;\\underset{x=3}{|}\\;+' },
  D: { f2: x => x - 3, tex: 'x-3', zeros: [{ x: 3, crosses: true, attach: 'nw' }], signs: '-\\;\\underset{x=3}{|}\\;+' },
  E: {
    f2: x => 3 * (x - 1) * (x - 5),
    tex: '3(x-1)(x-5)',
    zeros: [
      { x: 1, crosses: true, attach: 'ne' },
      { x: 5, crosses: true, attach: 'nw' },
    ],
    signs: '+\\;\\underset{x=1}{|}\\;-\\;\\underset{x=5}{|}\\;+',
  },
}

const X0 = -0.5
const X1 = 6.5
const YMAX = 16

export default function TouchNotCross() {
  const [opt, setOpt] = useState<Opt>('B')
  const o = OPTS[opt]
  const count = o.zeros.filter(z => z.crosses).length

  const notices: Record<Opt, ReactNode> = {
    A: (
      <Notice tone="neutral">
        <b>
          <M>{"f''(x) = 4(x-3)"}</M> crosses zero at <M>x = 3</M>
        </b>
        : negative before, positive after, so <M>f</M> switches from concave down to concave up there, a point of
        inflection. <M>{"f'(x) = 2(x-3)^2 + 5"}</M> is never zero, so <M>f</M> has no stationary points, but a point of
        inflection doesn&apos;t have to be stationary. Now try option B.
      </Notice>
    ),
    B: (
      <Notice tone="good">
        <b>
          <M>{"f''(3) = 0"}</M>, but the graph only touches zero.
        </b>{' '}
        <M>{"f''(x) = 6(x-3)^2"}</M> is positive on both sides of <M>x = 3</M>, so <M>f</M> is concave up everywhere and
        never changes concavity: no point of inflection. Click through the other options: every one has{' '}
        <M>{"f''(x) = 0"}</M> somewhere, so <M>{"f''(x) = 0"}</M> on its own can&apos;t be the test, or none of the five
        would be the answer.
      </Notice>
    ),
    C: (
      <Notice tone="neutral">
        <b>
          <M>{"f''(x) = 5(x-3)"}</M> crosses zero at <M>x = 3</M>
        </b>
        , so <M>f</M> has a point of inflection there. Since <M>{"f'(3) = 0"}</M> as well, it is a stationary point of
        inflection. Try option B to see a zero that doesn&apos;t cross.
      </Notice>
    ),
    D: (
      <Notice tone="neutral">
        <b>
          <M>{"f''(x) = x-3"}</M> crosses zero at <M>x = 3</M>
        </b>
        : concave down before, concave up after, so <M>f</M> has a point of inflection at <M>x = 3</M>. Try option B to
        see a zero that doesn&apos;t cross.
      </Notice>
    ),
    E: (
      <Notice tone="neutral">
        <b>
          <M>{"f''(x) = 3(x-1)(x-5)"}</M> crosses zero twice
        </b>
        : positive, then negative between <M>x = 1</M> and <M>x = 5</M>, then positive again. That is two points of
        inflection. Try option B to see a zero that doesn&apos;t cross.
      </Notice>
    ),
  }

  return (
    <div>
      <Plane
        x={[X0, X1]}
        y={[-YMAX, YMAX]}
        yStep={4}
        height={300}
        yLabel="f″(x)"
        xLabels={v => (v >= 0 && v <= 6 ? tick(v) : '')}
      >
        <Region top={x => clamp(o.f2(x), 0, YMAX + 4)} bottom={() => 0} from={X0 - 1} to={X1 + 1} color={C.good} opacity={0.2} />
        <Region top={() => 0} bottom={x => clamp(o.f2(x), -YMAX - 4, 0)} from={X0 - 1} to={X1 + 1} color={C.g} opacity={0.2} />
        <Plot.OfX y={o.f2} color={C.f} weight={3} />
        {o.zeros.map(z => (
          <Point key={`p${z.x}`} x={z.x} y={0} color={z.crosses ? C.violet : C.bad} />
        ))}
        {o.zeros.map(z => (
          <Label key={`l${z.x}`} at={[z.x, 0]} attach={z.attach} color={z.crosses ? C.violet : C.bad} size={13} gap={z.crosses ? 8 : 26}>
            {z.crosses ? 'inflection' : 'f″ = 0, no sign change'}
          </Label>
        ))}
      </Plane>
      <Controls>
        <Buttons>
          {(['A', 'B', 'C', 'D', 'E'] as Opt[]).map(k => (
            <Toggle key={k} label={`Option ${k}`} checked={opt === k} onChange={() => setOpt(k)} />
          ))}
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`f''(x) = ${o.tex}`} />
          <Readout tex={`\\text{sign of } f'':\\ ${o.signs}`} />
          <Readout color={count ? C.violet : C.good} tex={`\\text{points of inflection: } ${count}`} />
        </Readouts>
        {notices[opt]}
        <p className="text-[11.5px] text-gray-500 dark:text-gray-400">
          Green shading: <M>{"f''(x) > 0"}</M>, <M>f</M> concave up. Orange shading: <M>{"f''(x) < 0"}</M>, <M>f</M>{' '}
          concave down.
        </p>
      </Controls>
    </div>
  )
}
