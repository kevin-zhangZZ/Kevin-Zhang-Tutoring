// 2019 Specialist Exam 2 MCQ 19 — each fact about Z = aX + bY is a curve in the (a, b) plane.
// The mean condition 4a + 4b = 8 is the LINE a + b = 2 (the coefficients come out of E as they
// are); the variance condition 9a² + 9b² = 90 is the CIRCLE a² + b² = 10 (the coefficients come
// out of Var squared). Drag (a, b), snapped to halves, or jump to an option: A, B and E sit on the
// line but not the circle (mean 8, variance 18 / 180 / 180), D sits on the circle but not the line
// (variance 90, mean 16), and only C, where the curves cross, satisfies both. The other crossing,
// (−1, 3), also works but is not offered.

import { useState } from 'react'
import { ActionButton, Buttons, C, Circle, Controls, Label, Line, M, MovablePoint, Notice, Plane, Point, Readout, Readouts, tick } from './kit'
import type { Attach } from './kit'

type P = [number, number]

const OPTIONS: { letter: string; p: P; attach: Attach }[] = [
  { letter: 'A', p: [1, 1], attach: 'ne' },
  { letter: 'B', p: [4, -2], attach: 'ne' },
  { letter: 'C', p: [3, -1], attach: 'e' },
  { letter: 'D', p: [1, 3], attach: 'n' },
  { letter: 'E', p: [-2, 4], attach: 'ne' },
]

const R = Math.sqrt(10)
const snap = (v: number) => Math.round(v * 2) / 2
/** A coefficient in brackets for TeX, so 4(3) and 4(−1) both read as products. */
const br = (v: number) => `(${v})`

export default function LineCircle() {
  const [pt, setPt] = useState<P>([1, 1])
  const [a, b] = pt
  const mean = 4 * a + 4 * b
  const vr = 9 * a * a + 9 * b * b
  const onLine = Math.abs(mean - 8) < 1e-9
  const onCircle = Math.abs(vr - 90) < 1e-9
  const opt = OPTIONS.find(o => o.p[0] === a && o.p[1] === b)
  const name = opt ? `Option ${opt.letter}` : 'This point'

  let notice
  if (onLine && onCircle) {
    notice = (
      <Notice tone="good">
        On the line <b>and</b> on the circle: <M>{'E(Z)=8'}</M> and <M>{'\\operatorname{Var}(Z)=90'}</M> both hold.
        A line meets a circle at most twice, here at <M>{'(3,-1)'}</M> and <M>{'(-1,3)'}</M> (swapping{' '}
        <M>a</M> and <M>b</M> works because <M>X</M> and <M>Y</M> have the same mean and variance). Only{' '}
        <M>{'a=3,\\ b=-1'}</M> is offered: option <b>C</b>.
      </Notice>
    )
  } else if (onLine) {
    notice = (
      <Notice tone="warn">
        {name} is on the blue line, so the mean is right: <M>{`E(Z)=8`}</M>. But it is{' '}
        {vr < 90 ? 'inside' : 'outside'} the orange circle, so <M>{`\\operatorname{Var}(Z)=${vr}`}</M> is too{' '}
        {vr < 90 ? 'small' : 'big'}. Every point on the line has mean <M>8</M>; slide along it until the variance
        reaches <M>90</M>.
      </Notice>
    )
  } else if (onCircle) {
    notice = (
      <Notice tone="warn">
        {name} is on the orange circle, so <M>{'\\operatorname{Var}(Z)=90'}</M>, but it is off the blue line:{' '}
        <M>{`E(Z)=${mean}`}</M>, not <M>8</M>. One equation in two unknowns has a whole circle of solutions, so
        finding one pair that fits the variance proves nothing. Move round the circle to where it meets the line.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The mean uses <M>a</M> and <M>b</M> as they are, so <M>{'4a+4b=8'}</M> is a straight line. The variance
        squares them, so <M>{'9a^2+9b^2=90'}</M> is a circle of radius <M>{'\\sqrt{10}'}</M>. Drag the point onto
        both at once, or try each option.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-3.5, 4.5]} y={[-3.5, 4.5]} xStep={1} yStep={1} height={440} equalScale xLabel="a" yLabel="b" yLabels={v => (v > 4.6 ? '' : tick(v))}>
        <Line.ThroughPoints point1={[0, 2]} point2={[2, 0]} color={C.f} weight={3} />
        <Circle center={[0, 0]} radius={R} color={C.g} fillOpacity={0.06} />
        <Label at={[2, 0]} attach="ne" color={C.f}>4a + 4b = 8</Label>
        <Label at={[-1.45, -1.2]} attach="c" color={C.g} size={12}>9a² + 9b² = 90</Label>
        {OPTIONS.map(o => (
          <Point key={o.letter} x={o.p[0]} y={o.p[1]} color={o.letter === 'C' ? C.good : C.guide} />
        ))}
        {OPTIONS.map(o => (
          <Label key={`l${o.letter}`} at={o.p} attach={o.attach} color={o.letter === 'C' ? C.good : C.ink}>
            {o.letter}
          </Label>
        ))}
        <Point x={-1} y={3} color={C.good} />
        <Label at={[-1, 3]} attach="w" color={C.good} size={12} gap={9}>(−1, 3)</Label>
        <MovablePoint point={pt} onMove={p => setPt([snap(p[0]), snap(p[1])])} color={C.violet} />
      </Plane>
      <Controls>
        <Buttons>
          {OPTIONS.map(o => (
            <ActionButton key={o.letter} label={`Option ${o.letter}`} onClick={() => setPt(o.p)} />
          ))}
        </Buttons>
        <Readouts>
          <Readout color={onLine ? C.good : C.bad} tex={`E(Z) = 4${br(a)} + 4${br(b)} = ${mean}`} />
          <Readout color={onCircle ? C.good : C.bad} tex={`\\operatorname{Var}(Z) = 9${br(a)}^2 + 9${br(b)}^2 = ${vr}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
