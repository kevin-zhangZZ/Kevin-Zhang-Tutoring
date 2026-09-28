// 2017 Methods Exam 1 Q4 — sd(P̂) = √(p(1−p)/n) = √(3/(16n)) plotted against the sample size n,
// with the target line sd = 1/100. Bigger samples give a smaller spread, so the curve falls as n
// grows and drops onto the line exactly at n = 1875: every n from there on works (n ≥ 1875), and
// 1875 is the smallest because sd = 1/100 exactly there and "less than or equal to" lets it in.
// Buttons check the boundary (n = 1874 just fails). A toggle shows the reversed inequality
// n ≤ 1875 failing: those sample sizes all sit above the line.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, Toggle,
} from './kit'

const sd = (n: number) => Math.sqrt(3 / (16 * n))
const N_STAR = 1875
const X_MAX = 4000
const LINE = 0.01

export default function Threshold() {
  const [n, setN] = useState(800)
  const [reversed, setReversed] = useState(false)

  const s = sd(n)
  const exact = n === N_STAR
  const ok = exact || s < LINE
  const dot = ok ? C.good : C.bad

  let notice
  if (reversed) {
    notice = (
      <Notice tone="warn">
        <b>The red strip is <M>n \le 1875</M></b>, and every sample size in it puts the curve <b>above</b> the line:
        its sd is too big, the opposite of what was asked (and the &ldquo;smallest&rdquo; such <M>n</M> would be{' '}
        <M>1</M>). Because <M>n</M> is in the denominator, the sd shrinks as <M>n</M> grows, so the answer has to be{' '}
        <M>n \ge</M> something. Safest algebra: multiply both sides of <M>{'\\tfrac{3}{16n} \\le \\tfrac{1}{10\\,000}'}</M>{' '}
        by the positive <M>{'160\\,000\\,n'}</M> to get <M>{'30\\,000 \\le 16n'}</M>.
      </Notice>
    )
  } else if (exact) {
    notice = (
      <Notice tone="good">
        <b>At <M>n = 1875</M> the point sits exactly on the line:</b>{' '}
        <M>{'\\sqrt{\\tfrac{3}{30\\,000}} = \\sqrt{\\tfrac{1}{10\\,000}} = \\tfrac{1}{100}'}</M>. The question says
        &ldquo;less than or equal to&rdquo;, so <M>1875</M> counts. Press <b>n = 1874</b> to see that one sample fewer is
        already just over the line.
      </Notice>
    )
  } else if (n === N_STAR - 1) {
    notice = (
      <Notice tone="warn">
        <b><M>n = 1874</M> just fails:</b> its sd is <M>0.010003</M>, a hair above <M>{'\\tfrac{1}{100}'}</M>. However
        close, it is not <M>{'\\le \\tfrac{1}{100}'}</M>, so <M>1875</M> really is the smallest sample size that works.
      </Notice>
    )
  } else if (n < N_STAR) {
    notice = (
      <Notice>
        The point is <b>above</b> the dashed line: with only <M>{String(n)}</M> fish in a sample, the sample proportion
        wanders too far from <M>{'\\tfrac14'}</M>. Drag <M>n</M> to the right. The curve falls like{' '}
        <M>{'\\tfrac{1}{\\sqrt n}'}</M>, so it flattens out: at <M>n = 469</M> (about a quarter of <M>1875</M>) the sd is
        about <M>0.02</M>, double the target. Where does the curve reach the line?
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <b>Below the line, so <M>{`n = ${n}`}</M> works</b>, and so does every larger <M>n</M> (the green strip). That is
        why solving gives <M>n \ge 1875</M>, pointing right, and why the question asks for the <em>smallest</em> one. Press{' '}
        <b>n = 1875</b> and <b>n = 1874</b> to check the boundary.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[-300, X_MAX]}
        y={[0, 0.05]}
        xStep={500}
        yStep={0.01}
        height={300}
        xLabel="n"
        yLabel="sd"
        xLabels={v => (Math.round(v) % 1000 === 0 ? String(Math.round(v)) : '')}
        yLabels={false}
      >
        {/* The steep left end of the curve runs over mafs's y numbers (drawn right of the axis),
            so put them on the left, in the small strip left of n = 0. */}
        {[0.01, 0.02, 0.03, 0.04, 0.05].map(v => (
          <Label key={v} at={[0, v]} attach="w" size={12} gap={5}>
            {v.toFixed(2)}
          </Label>
        ))}
        {reversed ? (
          <Region top={sd} bottom={() => LINE} from={80} to={N_STAR} color={C.bad} opacity={0.18} />
        ) : (
          <Region top={() => LINE} bottom={sd} from={N_STAR} to={X_MAX} color={C.good} opacity={0.18} />
        )}
        <Line.Segment
          point1={reversed ? [0, 0] : [N_STAR, 0]}
          point2={reversed ? [N_STAR, 0] : [X_MAX, 0]}
          color={reversed ? C.bad : C.good}
          weight={6}
        />
        <Label at={reversed ? [1300, 0] : [3000, 0]} attach="n" color={reversed ? C.bad : C.good} gap={9}>
          {reversed ? 'n ≤ 1875?' : 'n ≥ 1875'}
        </Label>
        <Line.Segment point1={[0, LINE]} point2={[X_MAX, LINE]} color={C.g} style="dashed" weight={2} />
        <Label at={[X_MAX, LINE]} attach="nw" color={C.g}>
          sd = 1/100
        </Label>
        <Plot.OfX y={sd} domain={[75, X_MAX]} color={C.f} weight={3} />
        <Label at={[260, sd(260)]} attach="e" color={C.f}>
          √(3/(16n))
        </Label>
        <Line.Segment point1={[N_STAR, 0]} point2={[N_STAR, LINE]} color={C.guide} style="dashed" weight={1.5} />
        <Point x={N_STAR} y={LINE} color={C.g} />
        <Label at={[N_STAR, LINE]} attach="ne" color={C.g}>
          1875
        </Label>
        <Line.Segment point1={[n, 0]} point2={[n, s]} color={dot} style="dashed" weight={1.5} />
        <Point x={n} y={s} color={dot} />
      </Plane>
      <Controls>
        <Slider label="n" value={n} onChange={setN} min={100} max={X_MAX} step={1} format={v => String(v)} />
        <Buttons>
          <ActionButton label="n = 1874" onClick={() => setN(N_STAR - 1)} />
          <ActionButton label="n = 1875" onClick={() => setN(N_STAR)} />
          <Toggle label="What if n ≤ 1875?" checked={reversed} onChange={setReversed} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\operatorname{sd}(\\hat P) = \\sqrt{\\tfrac{3}{16\\times ${n}}} ${exact ? '=' : '\\approx'} ${s.toFixed(6)}`} />
          <Readout
            color={dot}
            tex={exact ? '= \\tfrac{1}{100}\\ \\text{exactly}\\ \\checkmark' : ok ? '< \\tfrac{1}{100}\\ \\checkmark' : '> \\tfrac{1}{100}\\ \\times'}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
