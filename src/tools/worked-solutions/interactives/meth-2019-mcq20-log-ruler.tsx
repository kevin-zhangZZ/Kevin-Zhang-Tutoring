// 2019 Methods Exam 2 MCQ 20 — a log ruler: every number sits at distance logₑ(number) from 1,
// so each tick is double the last and multiplying by x is always the same step. logₓ(y) counts
// how many ×x steps (blue) make up the distance from 1 to y (orange): logₑy ÷ logₑx. Swapping the
// base and the argument divides the same two lengths the other way round, so log_y(x) is the
// reciprocal. A toggle tests all five options with the chosen x, y, z (> 1): only D matches the
// expression, A and C come out negative, and B and E always agree with each other.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Polygon, Readout, Readouts, Slider, Toggle, num } from './kit'

const RULER = Math.log(64)
const SUP = ['', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹']
const Y_BAR: [number, number] = [1.3, 1.75]
const X_ROW: [number, number] = [0.45, 0.9]

const lg = (b: number, v: number) => Math.log(v) / Math.log(b)

function rect(x0: number, x1: number, [y0, y1]: [number, number]): [number, number][] {
  return [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]
}

export default function LogRuler() {
  const [x, setX] = useState(2)
  const [y, setY] = useState(8)
  const [z, setZ] = useState(32)
  const [test, setTest] = useState(false)

  const lx = Math.log(x)
  const ly = Math.log(y)
  const r = ly / lx
  const n = Math.ceil(r - 1e-9)
  const whole = Math.abs(r - Math.round(r)) < 0.005

  const lhs = lg(x, y) + lg(y, z)
  const options: [string, string, number][] = [
    ['A', '-\\tfrac{1}{\\log_y(x)} - \\tfrac{1}{\\log_z(y)}', -1 / lg(y, x) - 1 / lg(z, y)],
    ['B', '\\tfrac{1}{\\log_x(y)} + \\tfrac{1}{\\log_y(z)}', 1 / lg(x, y) + 1 / lg(y, z)],
    ['C', '-\\tfrac{1}{\\log_x(y)} - \\tfrac{1}{\\log_y(z)}', -1 / lg(x, y) - 1 / lg(y, z)],
    ['D', '\\tfrac{1}{\\log_y(x)} + \\tfrac{1}{\\log_z(y)}', 1 / lg(y, x) + 1 / lg(z, y)],
    ['E', '\\log_y(x) + \\log_z(y)', lg(y, x) + lg(z, y)],
  ]

  let notice
  if (test) {
    notice = (
      <Notice tone="good">
        D matches whatever <M>x</M>, <M>y</M>, <M>z</M> you pick (another option can only agree by coincidence, e.g.
        when <M>x = y = z</M>). A and C are negative, but with every number above 1
        every log here is positive, so they were never in the running. B and E always give the same value, because{' '}
        <M>{'\\tfrac{1}{\\log_x(y)} = \\log_y(x)'}</M> makes them the same expression written two ways, and two different
        options can&apos;t both be the single answer.
      </Notice>
    )
  } else if (y < x) {
    notice = (
      <Notice>
        Now <M>y</M> is closer to 1 than <M>x</M> is, so less than one <M>x</M>-step fits:{' '}
        <M>{`\\log_x(y) \\approx ${num(r)}`}</M>, below 1. Measured the other way, the <M>x</M>-bar is longer than the{' '}
        <M>y</M>-bar, so <M>{`\\log_y(x) \\approx ${num(1 / r)}`}</M>. They are still reciprocals.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Each number <M>n</M> sits at distance <M>{'\\log_e(n)'}</M> from 1, so each tick is double the last and multiplying by the same
        number is always the same step.{' '}
        <M>\log_x(y)</M> asks how many <M>{'\\times x'}</M> steps take you from 1 to <M>y</M>: the blue steps laid along the
        orange bar{whole ? <>, here exactly <b>{Math.round(r)}</b></> : ''}. <M>\log_y(x)</M> divides the same two lengths
        the other way round, so it is the reciprocal. Try other values: the product stays 1.
      </Notice>
    )
  }

  const steps = []
  for (let k = 0; k < n; k++) {
    const a = k * lx
    const b = Math.min((k + 1) * lx, ly)
    steps.push(
      <Polygon key={`s${k}`} points={rect(a, b, X_ROW)} color={C.f} fillOpacity={k % 2 === 0 ? 0.55 : 0.28} weight={1.5} />,
    )
    if (b < (k + 1) * lx - 1e-9) {
      const c = Math.min((k + 1) * lx, RULER * 1.05)
      steps.push(<Line.Segment key={`p${k}`} point1={[b, X_ROW[1]]} point2={[c, X_ROW[1]]} color={C.f} style="dashed" weight={1.5} />)
      steps.push(<Line.Segment key={`q${k}`} point1={[b, X_ROW[0]]} point2={[c, X_ROW[0]]} color={C.f} style="dashed" weight={1.5} />)
    }
    if (lx >= 0.45 && (k + 1) * lx <= ly + 1e-9 && k < SUP.length) {
      steps.push(
        <Label key={`l${k}`} at={[(k + 1) * lx, X_ROW[0]]} color={C.f} attach="s" size={12}>
          {`x${SUP[k]}`}
        </Label>,
      )
    }
  }

  return (
    <div>
      <Plane x={[0, RULER]} y={[0, 2.2]} xStep={Math.log(2)} yStep={10} height={210} xLabel="" yLabel="" xLabels={v => String(Math.round(Math.exp(v)))} yLabels={false}>
        <Label at={[0, 0]} attach="s" size={12} bold={false}>1</Label>
        <Line.Segment point1={[ly, 0]} point2={[ly, Y_BAR[1]]} color={C.g} style="dashed" weight={1.5} />
        <Line.Segment point1={[lx, 0]} point2={[lx, X_ROW[1]]} color={C.f} style="dashed" weight={1.5} />
        <Polygon points={rect(0, ly, Y_BAR)} color={C.g} fillOpacity={0.45} weight={1.5} />
        <Label at={[ly, Y_BAR[1]]} color={C.g} attach={ly < RULER / 2 ? 'ne' : 'nw'}>{`y = ${num(y, 1)}`}</Label>
        {steps}
        <Label at={[0, X_ROW[1]]} color={C.f} attach="ne" size={12}>{`x = ${num(x, 1)}`}</Label>
      </Plane>
      <Controls>
        <Slider label="x" value={x} onChange={setX} min={1.2} max={8} step={0.1} format={v => v.toFixed(1)} />
        <Slider label="y" value={y} onChange={setY} min={1.2} max={60} step={0.1} format={v => v.toFixed(1)} />
        <Readouts>
          <Readout color={C.f} tex={`\\log_x(y) = \\dfrac{\\log_e y}{\\log_e x} = \\dfrac{${num(ly, 3)}}{${num(lx, 3)}} \\approx ${num(r, 3)}`} />
          <Readout color={C.g} tex={`\\log_y(x) = \\dfrac{\\log_e x}{\\log_e y} = \\dfrac{${num(lx, 3)}}{${num(ly, 3)}} \\approx ${num(1 / r, 3)}`} />
          <Readout tex="\log_x(y) \times \log_y(x) = 1" />
        </Readouts>
        <Toggle label="Test the five options with these numbers" checked={test} onChange={setTest} />
        {test && (
          <>
            <Slider label="z" value={z} onChange={setZ} min={1.2} max={60} step={0.1} format={v => v.toFixed(1)} />
            <div className="overflow-x-auto">
              <table className="text-[13px] text-gray-700 dark:text-gray-200">
                <tbody>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-1 pr-3" colSpan={2}>
                      <M>\log_x(y) + \log_y(z)</M>
                    </td>
                    <td className="py-1 text-right font-semibold tabular-nums">{num(lhs, 3)}</td>
                  </tr>
                  {options.map(([letter, tex, v]) => {
                    const ok = Math.abs(v - lhs) < 1e-9
                    return (
                      <tr key={letter} className={ok ? 'text-emerald-700 dark:text-emerald-300' : ''}>
                        <td className="py-0.5 pr-2 font-bold">{letter}</td>
                        <td className="py-0.5 pr-3">
                          <M>{tex}</M>
                        </td>
                        <td className="py-0.5 text-right tabular-nums">
                          {num(v, 3)} {ok ? '✓' : ''}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
        {notice}
      </Controls>
    </div>
  )
}
