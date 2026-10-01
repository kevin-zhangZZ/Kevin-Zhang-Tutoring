// 2021 Specialist Exam 2 Q4e — W is where two motions meet. On a speed–distance graph the run-up
// is v = (180s)^{1/3} from A (s = 0) to B (s = 400/9, v = 20). Drag W along it: the car's speed at
// W comes from part d, and braking at 9 m/s² from there traces v² = v_W² − 18(s − s_W), landing
// v_W²/18 metres further on. Too late and it lands beyond B; W is the point where the stopping
// distance equals the d = 400/9 − s_W metres left, s_W = 28.08, v_W = 17.16, d = 16.36 (scipy),
// matching the working's 16.4 m. The toggle draws v² = 18(400/9 − s), every state that stops
// exactly at B: the CAS equation (180(400/9 − d))^{2/3} = 18d is its crossing with the run-up curve.

import { useState } from 'react'
import { C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, clamp, num, tick } from './kit'

const AB = 400 / 9
const runUp = (s: number) => Math.cbrt(180 * s)
const S_MIN = 4
const S_MAX = 40
const S_W = 28.081647 // the true W (scipy)

export default function BrakePoint() {
  const [sW, setSW] = useState(36)
  const [all, setAll] = useState(false)
  // Snap onto the true W when within 0.4 m, so the key moment can be landed on exactly.
  const move = (v: number) => setSW(Math.abs(v - S_W) < 0.4 ? S_W : clamp(v, S_MIN, S_MAX))

  const vW = runUp(sW)
  const brake = (vW * vW) / 18
  const sStop = sW + brake
  const d = AB - sW
  const diff = sStop - AB
  const hit = Math.abs(sW - S_W) < 1e-6
  const col = hit ? C.good : diff > 0 ? C.bad : C.g

  let notice
  if (hit) {
    notice = (
      <Notice tone="good">
        <b>This is W.</b> Called off here, the car is doing <M>{`v_W \\approx ${num(vW, 1)}\\ \\text{m s}^{-1}`}</M> and needs{' '}
        <M>{`\\tfrac{v_W^2}{18} \\approx ${num(brake, 1)}\\ \\text{m}`}</M> to stop: exactly the <M>{`d \\approx ${num(d, 1)}`}</M> m
        left to <M>B</M>. Both sides of the equation are in <M>d</M>: the speed at W from part d with{' '}
        <M>{'s = \\tfrac{400}{9} - d'}</M>, and the stopping distance from <M>{'v^2 = u^2 + 2as'}</M>.
      </Notice>
    )
  } else if (diff > 0) {
    notice = (
      <Notice tone="warn">
        Called off here, the car is doing <M>{`${num(vW, 1)}\\ \\text{m s}^{-1}`}</M> and needs{' '}
        <M>{`\\tfrac{${num(vW, 1)}^2}{18} \\approx ${num(brake, 1)}`}</M> m to stop, but only <M>{`d \\approx ${num(d, 1)}`}</M> m remain
        to <M>B</M>. It runs <b>{num(diff, 1)} m past B</b>: too late. Drag W back towards <M>A</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The car stops <b>{num(-diff, 1)} m short of B</b>: safe, but not the <i>furthest</i> safe point. Drag W towards{' '}
        <M>B</M>: the car is faster there, so it needs more room to stop, while the room left, <M>d</M>, shrinks. W is where the
        two are equal.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 62]} y={[0, 22]} xStep={10} yStep={5} height={300} xLabel="s" yLabel="v" yLabels={v => (Math.abs(v - 5) < 1e-9 ? '' : tick(v))}>
        <Line.Segment point1={[AB, 0]} point2={[AB, 22]} color={C.guide} weight={1.5} style="dashed" />
        <Label at={[AB, 21]} attach="e">B</Label>
        <Label at={[0, 0]} attach="ne">A</Label>
        {all && (
          <>
            <Plot.Parametric xy={v => [AB - (v * v) / 18, v]} domain={[0, 22]} color={C.violet} weight={2} style="dashed" />
            <Label at={[AB - (22 * 22) / 18, 22]} attach="sw" color={C.violet} size={12}>stops at B</Label>
          </>
        )}
        <Plot.OfX y={runUp} domain={[0, AB]} color={C.f} weight={3} />
        <Plot.Parametric xy={v => [sW + (vW * vW - v * v) / 18, v]} domain={[0, vW]} color={col} weight={3} />
        <Line.Segment point1={[sW, 0]} point2={[sW, vW]} color={C.guide} weight={1} style="dashed" />
        <Point x={sStop} y={0} color={col} />
        <Label at={[sStop, 0]} attach="ne" color={col} size={12}>stops</Label>
        <Label at={[sW, vW]} attach="nw" color={C.f}>W</Label>
        <MovablePoint point={[sW, vW]} onMove={p => move(p[0])} color={C.f} />
      </Plane>
      <Controls>
        <Slider label="s_W" value={sW} onChange={move} min={S_MIN} max={S_MAX} step={0.05} format={v => `${v.toFixed(1)} m`} />
        <Toggle label="Show every speed that stops exactly at B" checked={all} onChange={setAll} />
        <Readouts>
          <Readout color={C.f} tex={`v_W = (180 s_W)^{1/3} = ${num(vW, 2)}`} />
          <Readout color={col} tex={`\\text{stopping distance } \\tfrac{v_W^2}{18} = ${num(brake, 2)}`} />
          <Readout tex={`d = \\tfrac{400}{9} - s_W = ${num(d, 2)}`} />
        </Readouts>
        {notice}
        {all && (
          <p className="text-[12px] text-gray-500 dark:text-gray-400">
            The violet curve is <M>{'v^2 = 18\\left(\\tfrac{400}{9} - s\\right)'}</M>: from any point on it, braking at{' '}
            <M>{'9\\ \\text{m s}^{-2}'}</M> ends exactly at <M>B</M>. W is where the run-up crosses it, which is the equation{' '}
            <M>{'\\left(180\\left(\\tfrac{400}{9} - d\\right)\\right)^{2/3} = 18d'}</M> solved in the working.
          </p>
        )}
      </Controls>
    </div>
  )
}
