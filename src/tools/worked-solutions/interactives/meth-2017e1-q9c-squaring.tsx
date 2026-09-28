// 2017 Methods Exam 1 Q9c — why squaring (1 − 3x)/(2√x) = −1 invents a solution. The graph of the
// gradient function f'(x) = (1 − 3x)/(2√x) only falls, so it meets y = −1 once (x = 1, BC's contact
// point) and y = +1 once (x = 1/9, AC's contact point). Squaring either equation gives the same
// (1 − 3x)² = 4x, i.e. 9x² − 10x + 1 = 0, which solves BOTH: the extra root is the other tangent's
// contact point. Switch between BC (part c) and AC (part d) to see the same quadratic twice.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Toggle, tick } from './kit'

const fp = (x: number) => (1 - 3 * x) / (2 * Math.sqrt(x))

export default function Squaring() {
  const [target, setTarget] = useState<-1 | 1>(-1)
  const [squared, setSquared] = useState(false)

  const xTrue = target === -1 ? 1 : 1 / 9
  const xFake = target === -1 ? 1 / 9 : 1
  const trueTex = target === -1 ? '1' : '\\tfrac19'
  const fakeTex = target === -1 ? '\\tfrac19' : '1'
  const line = (m: number, color: string, dashed: boolean) => (
    <Line.ThroughPoints point1={[0, m]} point2={[1, m]} color={color} weight={2} style={dashed ? 'dashed' : 'solid'} />
  )

  let notice
  if (!squared && target === -1) {
    notice = (
      <Notice>
        The gradient function only ever falls, so it crosses the green line <M>y=-1</M> exactly once, at <M>x=1</M>:
        the only point where the tangent has gradient <M>-1</M>. Now turn on &ldquo;Square both sides&rdquo;.
      </Notice>
    )
  } else if (squared && target === -1) {
    notice = (
      <Notice tone="warn">
        Squaring <M>{'1-3x=-2\\sqrt x'}</M> gives <M>{'(1-3x)^2=4x'}</M>, but squaring <M>{'1-3x=+2\\sqrt x'}</M> gives exactly
        the same thing. So the squared equation solves gradient <M>-1</M> <b>and</b> gradient <M>+1</M>, and{' '}
        <M>{'x=\\tfrac19'}</M> sneaks in. Put it back in the original: you get <M>+1</M>, not <M>-1</M>, so reject it. With{' '}
        <M>{'a=\\sqrt x'}</M> this root shows up as <M>{'a=-\\tfrac13'}</M>, rejected on sight.
      </Notice>
    )
  } else if (!squared) {
    notice = (
      <Notice>
        For part d, <M>AC</M> has gradient <M>+1</M>. The gradient function crosses <M>y=1</M> once, at{' '}
        <M>{'x=\\tfrac19'}</M>, left of the peak at <M>{'x=\\tfrac13'}</M>, where the curve climbs. Turn on
        &ldquo;Square both sides&rdquo; again.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        Same squared equation, same two roots, but this time <M>x=1</M> is the intruder (its gradient is <M>-1</M>).
        Parts c and d lead to the same quadratic <M>{'9x^2-10x+1=0'}</M> because squaring throws away the sign that tells
        the two tangents apart. Keep the sign by substituting <M>{'a=\\sqrt x'}</M> instead.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 1.15]} y={[-1.6, 2.6]} xStep={0.25} yStep={1} height={300} yLabel="f′(x)" yLabels={false} xLabels={v => (v > 1.01 ? "" : tick(v))}>
        {squared && line(-target, C.bad, true)}
        {line(target, C.good, false)}
        <Plot.OfX y={fp} domain={[0.035, 1]} color={C.f} weight={3} />
        <Point x={xTrue} y={target} color={C.good} />
        {squared && <Point x={xFake} y={-target} color={C.bad} />}
        <Label at={[0.65, target]} color={C.good} attach={target < 0 ? 's' : 'n'}>
          {target === -1 ? 'gradient −1 (BC)' : 'gradient +1 (AC)'}
        </Label>
        {squared && (
          <Label at={[0.65, -target]} color={C.bad} attach={target < 0 ? 'n' : 's'}>
            {target === -1 ? 'gradient +1: not BC' : 'gradient −1: not AC'}
          </Label>
        )}
        <Label at={[xTrue, target]} color={C.good} attach="ne">
          {target === -1 ? 'x = 1' : 'x = 1/9'}
        </Label>
        {squared && (
          <Label at={[xFake, -target]} color={C.bad} attach="ne">
            {target === -1 ? 'x = 1/9' : 'x = 1'}
          </Label>
        )}
        <Label at={[0.3, fp(0.3)]} color={C.f} attach="ne">(1 − 3x)/(2√x)</Label>
      </Plane>
      <Controls>
        <Buttons>
          <Toggle label="BC: gradient −1 (part c)" checked={target === -1} onChange={() => setTarget(-1)} />
          <Toggle label="AC: gradient +1 (part d)" checked={target === 1} onChange={() => setTarget(1)} />
          <Toggle label="Square both sides" checked={squared} onChange={setSquared} />
        </Buttons>
        <Readouts>
          {squared ? (
            <>
              <Readout tex={`(1-3x)^2 = 4x \\;\\Rightarrow\\; 9x^2-10x+1=0`} />
              <Readout tex={`x=\\tfrac19 \\text{ or } x=1`} />
              <Readout
                color={C.bad}
                tex={`x=${fakeTex}:\\ \\frac{1-3x}{2\\sqrt x} = ${target === -1 ? '+1' : '-1'} \\ne ${target}`}
              />
            </>
          ) : (
            <Readout color={C.good} tex={`\\frac{1-3x}{2\\sqrt x} = ${target} \\;\\Rightarrow\\; x = ${trueTex}`} />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
