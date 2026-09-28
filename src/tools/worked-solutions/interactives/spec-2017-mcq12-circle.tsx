// 2017 Specialist Exam 2 MCQ 12 — the path r(t) = (1 − √a sin t) i + (1 − (1/b) cos t) j is an ellipse
// centred at (1, 1) with horizontal semi-axis √a and vertical semi-axis 1/b, so it is a circle exactly
// when √a = 1/b, i.e. ab² = 1. Sliders for a and b draw the path from the question's own rule, with
// the two semi-axes marked and a dashed circle of radius √a to compare against. The buttons lock b
// to one of the options' conditions: under A (ab² = 1) dragging a changes the radius but the path is
// always a circle; under B (a²b = 1, 1/b = a²) or D (ab = 1, 1/b = a) it is a circle only at a = 1,
// so those conditions do not make it "always" a circle.

import { useState } from 'react'
import { ActionButton, Buttons, C, Circle, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, clamp, num } from './kit'

type Mode = 'free' | 'A' | 'B' | 'D'
/** 1/b for each locked mode, as a function of a; and the a-range that keeps the picture on screen. */
const LOCK: Record<Exclude<Mode, 'free'>, { inv: (a: number) => number; lo: number; hi: number; tex: string }> = {
  A: { inv: a => Math.sqrt(a), lo: 0.25, hi: 4, tex: 'ab^2 = 1' },
  B: { inv: a => a * a, lo: 0.5, hi: 1.55, tex: 'a^2b = 1' },
  D: { inv: a => a, lo: 0.25, hi: 2.4, tex: 'ab = 1' },
}

export default function CircleWidget() {
  const [mode, setMode] = useState<Mode>('free')
  const [a, setA] = useState(2.25)
  const [bFree, setBFree] = useState(1)

  const lock = mode === 'free' ? null : LOCK[mode]
  const b = lock ? 1 / lock.inv(a) : bFree
  const rx = Math.sqrt(a)
  const ry = 1 / b
  const circle = Math.abs(rx - ry) < 0.001
  // Free mode: snap to the circle when the sliders get within 1% of it, so it can be hit exactly.
  const near = (r1: number, r2: number) => Math.abs(r1 / r2 - 1) < 0.01
  const moveA = (v: number) => setA(mode === 'free' && near(Math.sqrt(v), 1 / bFree) ? 1 / (bFree * bFree) : v)
  const moveB = (v: number) => setBFree(near(1 / v, rx) ? 1 / rx : v)
  const pick = (m: Mode) => {
    setMode(m)
    if (m === 'free') {
      setBFree(clamp(b, 0.4, 2.5))
    } else {
      setA(clamp(a, LOCK[m].lo, LOCK[m].hi))
    }
  }

  let notice
  if (mode === 'A') {
    notice = (
      <Notice tone="good">
        <b>
          Locked to <M>{'ab^2 = 1'}</M>
        </b>
        , so <M>{'b = \\tfrac{1}{\\sqrt a}'}</M> and the vertical semi-axis <M>{'\\tfrac1b = \\sqrt a'}</M> always equals the
        horizontal one. Drag <M>a</M>: the radius changes, but the path is a circle for every <M>a</M>. That is what
        &ldquo;always a circle&rdquo; asks for.
      </Notice>
    )
  } else if (mode === 'B' || mode === 'D') {
    const at1 = Math.abs(a - 1) < 0.006
    notice = (
      <Notice tone={at1 ? 'neutral' : 'warn'}>
        <b>
          Locked to <M>{LOCK[mode].tex}</M>
        </b>
        , so the vertical semi-axis is <M>{mode === 'B' ? '\\tfrac1b = a^2' : '\\tfrac1b = a'}</M> while the horizontal one is{' '}
        <M>{'\\sqrt a'}</M>.{' '}
        {at1 ? (
          <>
            At <M>a = 1</M> they happen to agree (<M>1 = 1</M>), so this one is a circle, but move <M>a</M> at all and it is an
            ellipse again. A condition that works only for <M>a = 1</M> does not make the path <em>always</em> a circle.
          </>
        ) : (
          <>
            These are equal only when <M>a = 1</M>. Drag <M>a</M> to <M>1</M>: that is the only circle this condition
            gives.
          </>
        )}
      </Notice>
    )
  } else {
    notice = circle ? (
      <Notice tone="good">
        <b>A circle:</b> the two semi-axes agree, <M>{`\\sqrt a = \\tfrac1b = ${num(rx)}`}</M>, and{' '}
        <M>{`ab^2 = ${num(a * b * b)}`}</M>. Now press <b>Lock A</b> and drag <M>a</M> to see it stay a circle.
      </Notice>
    ) : (
      <Notice>
        The path is an ellipse centred at <M>(1, 1)</M>: <M>{'\\sin t'}</M> stretches it sideways by <M>{'\\sqrt a'}</M>{' '}
        (blue) and <M>{'\\cos t'}</M> stretches it up and down by <M>{'\\tfrac1b'}</M> (orange). It is a circle only when the
        orange end reaches the dashed circle of radius <M>{'\\sqrt a'}</M>. Drag <M>b</M> until it does, then read off{' '}
        <M>{'ab^2'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-1.6, 3.6]} y={[-1.7, 3.7]} equalScale height={360} xStep={1} yStep={1}>
        <Circle center={[1, 1]} radius={rx} color={C.guide} fillOpacity={0} strokeStyle="dashed" />
        <Plot.Parametric
          xy={t => [1 - rx * Math.sin(t), 1 - Math.cos(t) / b]}
          domain={[0, 2 * Math.PI]}
          color={circle ? C.good : C.violet}
          weight={3}
        />
        <Line.Segment point1={[1, 1]} point2={[1 + rx, 1]} color={C.f} weight={3} />
        <Line.Segment point1={[1, 1]} point2={[1, 1 + ry]} color={C.g} weight={3} />
        <Point x={1} y={1} color={C.ink} />
        <Label at={[1 + rx / 2, 1]} attach="s" color={C.f}>
          {`√a = ${num(rx)}`}
        </Label>
        <Label at={[1, 1 + ry / 2]} attach="e" color={C.g}>
          {`1/b = ${num(ry)}`}
        </Label>
      </Plane>
      <Controls>
        <Buttons>
          <Toggle label="Free" checked={mode === 'free'} onChange={() => pick('free')} />
          <Toggle label={<>Lock A: <M>{'ab^2=1'}</M></>} checked={mode === 'A'} onChange={() => pick('A')} />
          <Toggle label={<>Lock B: <M>{'a^2b=1'}</M></>} checked={mode === 'B'} onChange={() => pick('B')} />
          <Toggle label={<>Lock D: <M>{'ab=1'}</M></>} checked={mode === 'D'} onChange={() => pick('D')} />
        </Buttons>
        <Slider
          label="a"
          value={a}
          onChange={moveA}
          min={lock ? lock.lo : 0.25}
          max={lock ? lock.hi : 4}
          step={0.01}
        />
        {mode === 'free' ? (
          <Slider label="b" value={bFree} onChange={moveB} min={0.4} max={2.5} step={0.01} />
        ) : (
          <Buttons>
            <ActionButton label={<>Set <M>a = 1</M></>} onClick={() => setA(1)} />
          </Buttons>
        )}
        <Readouts>
          <Readout tex={`\\sqrt a = ${num(rx)}`} color={C.f} />
          <Readout tex={`\\tfrac1b = ${num(ry)}`} color={C.g} />
          <Readout tex={`ab^2 = ${num(a * b * b)}`} color={circle ? C.good : undefined} />
        </Readouts>
      </Controls>
      {notice}
    </div>
  )
}
