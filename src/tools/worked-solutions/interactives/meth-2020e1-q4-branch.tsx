// 2020 Methods Exam 1 Q4 — where the rejected solution x = −7 comes from. Built up in the order of
// the working: (1) the left side as printed, 2log₂(x + 5) − log₂(x + 9), exists only for x > −5
// (shaded zone: no log₂(x + 5)) and meets y = 1 once, at x = −1; (2) the power law turns it into
// log₂((x + 5)²) − log₂(x + 9), which agrees for x > −5 but ALSO has values on −9 < x < −5, because
// squaring makes x + 5 positive — a whole new branch inside the zone where the printed equation
// doesn't exist; (3) the quadratic x² + 8x + 7 = 0 is "combined form = 1", so it finds both
// crossings of that form with y = 1: x = −1 and x = −7, and x = −7 is on the new branch. A probe x
// with a live table substitutes into both forms, so the student sees x = −7 give exactly 1 in the
// rearranged equation (the check that fools students) but log₂(−2) in the printed one.
//
// The orange branch on (−9, −5) decreases from +∞ to −∞ (d/dx of (x + 5)²/(x + 9) is
// (x + 5)(x + 13)/(x + 9)², negative there), so it crosses y = 1 exactly once, at x = −7.

import { useState, type ReactNode } from 'react'
import {
  ActionButton, Buttons, C, Controls, Katex, Label, Line, M, Notice, Plane, Plot, Point, Region, Slider, StepNav, num,
  tick, useSteps,
} from './kit'

const X0 = -10
const X1 = 2
const Y0 = -4
const Y1 = 4

/** The left side as printed: needs x + 5 > 0 (and x + 9 > 0), so it exists only for x > −5. */
const printed = (x: number) => 2 * Math.log2(x + 5) - Math.log2(x + 9)
/** The same left side after the log laws: exists for x > −9, x ≠ −5. */
const combined = (x: number) => Math.log2((x + 5) ** 2 / (x + 9))

/** Where a monotonic `fn` reaches `target` between lo and hi (bisection). */
function reach(fn: (x: number) => number, lo: number, hi: number, target: number): number {
  let a = lo
  let b = hi
  const up = fn(b) > fn(a)
  for (let i = 0; i < 60; i++) {
    const m = (a + b) / 2
    if (fn(m) < target === up) a = m
    else b = m
  }
  return (a + b) / 2
}

// Each curve is drawn only while it is inside the grid (y from −4 to 4), never into the margin.
const RIGHT_FROM = reach(printed, -5 + 1e-9, -1, Y0) // ≈ −4.47
const LEFT_FROM = reach(combined, -9 + 1e-9, -7, Y1) // ≈ −8.31
const LEFT_TO = reach(combined, -7, -5 - 1e-9, Y0) // ≈ −5.47

const STEP_TITLES = [
  'The left side as printed',
  'After the power law',
  'After the quotient law, set = 1',
]

const inGrid = (y: number) => y >= Y0 && y <= Y1

/** A value for the table: exact when it is a whole number (1 at x = −1 and x = −7), else ≈ 2 dp. */
const value = (v: number) => (Math.abs(v - Math.round(v)) < 1e-9 ? num(v, 0) : `\\approx ${num(v)}`)

function TableRow({ dot, label, children, bad = false }: { dot?: string; label: ReactNode; children: ReactNode; bad?: boolean }) {
  return (
    <tr className="border-t border-gray-100 dark:border-gray-800">
      <td className="py-1 pr-2">
        <span className="inline-flex items-center gap-1.5">
          {dot && <span className="inline-block flex-none w-2.5 h-2.5 rounded-full" style={{ background: dot }} />}
          {label}
        </span>
      </td>
      <td className={`py-1 text-right tabular-nums whitespace-nowrap ${bad ? 'font-semibold text-rose-600 dark:text-rose-400' : ''}`}>
        {children}
      </td>
    </tr>
  )
}

export default function BranchWidget() {
  const steps = useSteps(3)
  const s = steps.step
  const [x, setX] = useState(-7)

  const a = x + 5
  const b = x + 9
  const printedOk = a > 1e-9 && b > 1e-9
  const combinedOk = b > 1e-9 && Math.abs(a) > 1e-9
  const pv = printedOk ? printed(x) : NaN
  const cv = combinedOk ? combined(x) : NaN
  const nearM7 = Math.abs(x + 7) < 0.03
  const nearM1 = Math.abs(x + 1) < 0.03
  const inZone = x > -9 && x < -5

  let notice
  if (s === 0) {
    notice = (
      <Notice>
        <b>The equation as printed only exists for <M>{'{x > -5}'}</M>.</b> Every log needs a positive input, so{' '}
        <M>{'{x + 5 > 0}'}</M> and <M>{'{x + 9 > 0}'}</M>, and <M>{'{x > -5}'}</M> covers both. In the shaded zone{' '}
        <M>{'\\log_2(x+5)'}</M> has no value, so there is no blue graph there at all, and the graph meets{' '}
        <M>y = 1</M> just once. Press Next to apply the first log law.
      </Notice>
    )
  } else if (s === 1) {
    notice = (
      <Notice>
        <b>The power law grows a new branch.</b> After <M>{'2\\log_2(x+5) = \\log_2\\big((x+5)^2\\big)'}</M>, the orange form
        matches the blue one wherever <M>{'{x > -5}'}</M> (it runs along it). But <M>{'(x+5)^2'}</M> is positive even when{' '}
        <M>x + 5</M> is negative, so the orange form also has values for <M>{'{-9 < x < -5}'}</M>, inside the shaded zone.
        The law only holds when <M>{'{x + 5 > 0}'}</M>: those values are new.{' '}
        {inZone ? (
          <>
            Here <M>{`x + 5 = ${num(a)}`}</M> but <M>{`(x+5)^2 = ${num(a * a)}`}</M>: compare the two rows of the table.
          </>
        ) : x <= -9 ? (
          <>
            Left of <M>x = -9</M> neither form has a value, because <M>{'x + 9 \\le 0'}</M>. Drag <M>x</M> to between{' '}
            <M>-9</M> and <M>-5</M>.
          </>
        ) : (
          <>
            Drag <M>x</M> into the shaded zone, between <M>-9</M> and <M>-5</M>, and compare the two rows of the table.
          </>
        )}
      </Notice>
    )
  } else if (nearM7) {
    notice = (
      <Notice tone="warn">
        <b><M>x = -7</M> is where the new branch crosses <M>y = 1</M>.</b> The orange form gives{' '}
        <M>{'\\log_2\\!\\big(\\tfrac{(-2)^2}{2}\\big) = \\log_2 2 = 1'}</M>, so a check in the rearranged equation passes. But
        the printed equation needs <M>{'\\log_2(-7+5) = \\log_2(-2)'}</M>, and no power of 2 is negative: there is no blue
        graph here. <M>-7</M> is not in <M>{'{x > -5}'}</M>, so reject it.
      </Notice>
    )
  } else if (nearM1) {
    notice = (
      <Notice tone="good">
        <b><M>x = -1</M> is on both graphs.</b> In the printed equation,{' '}
        <M>{'2\\log_2 4 - \\log_2 8 = 2\\times2 - 3 = 1'}</M>, and <M>-1</M> is inside the domain <M>{'{x > -5}'}</M>. It is the only solution.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <b>The quadratic can&apos;t tell the branches apart.</b> <M>{'x^2 + 8x + 7 = 0'}</M> comes from the orange form, so its
        roots are every <M>x</M> where the orange graph meets <M>y = 1</M>: <M>-1</M> and <M>-7</M>. Only one of those
        crossings is on the blue graph. Press &ldquo;Try x = −7&rdquo; to test the other one in both forms.
      </Notice>
    )
  }

  const combinedTex = s === 2 ? '\\log_2\\!\\Big(\\dfrac{(x+5)^2}{x+9}\\Big)' : '\\log_2\\big((x+5)^2\\big)-\\log_2(x+9)'

  return (
    <div>
      <Plane
        x={[X0, X1]}
        y={[Y0, Y1]}
        xStep={1}
        yStep={1}
        height={300}
        xLabels={v => (v >= X0 && v <= X1 && Math.abs(Math.round(v)) % 2 === 1 ? tick(v) : '')}
        yLabels={v => (Math.abs(v - 1) < 1e-9 ? '' : tick(v))}
      >
        {/* Where the printed equation has no value: x + 5 ≤ 0. */}
        <Region top={() => Y1} bottom={() => Y0} from={X0} to={-5} color={C.bad} opacity={0.07} />

        {/* Asymptotes, dashed in their own curve's colour. */}
        <Line.Segment point1={[-5, Y0]} point2={[-5, Y1]} color={C.f} style="dashed" weight={1.5} />
        {s >= 1 && <Line.Segment point1={[-9, Y0]} point2={[-9, Y1]} color={C.g} style="dashed" weight={1.5} />}

        {/* The right-hand side of the equation. */}
        <Line.Segment point1={[X0, 1]} point2={[X1, 1]} color={C.violet} weight={2} />
        <Label at={[X1, 1]} color={C.violet} attach="sw" size={12}>y = 1</Label>

        {/* The probe. */}
        <Line.Segment point1={[x, Y0]} point2={[x, Y1]} color={C.guide} style="dashed" weight={1.5} />

        <Plot.OfX y={printed} domain={[RIGHT_FROM, X1]} color={C.f} weight={s >= 1 ? 5 : 3} />
        {s >= 1 && (
          <>
            <Plot.OfX y={combined} domain={[RIGHT_FROM, X1]} color={C.g} weight={2} />
            <Plot.OfX y={combined} domain={[LEFT_FROM, LEFT_TO]} color={C.g} weight={3} />
            <Label at={[-8.05, combined(-8.05)]} color={C.g} attach="e" size={12}>new branch</Label>
          </>
        )}

        {printedOk && inGrid(pv) && <Point x={x} y={pv} color={C.f} />}
        {s >= 1 && combinedOk && x < -5 && inGrid(cv) && <Point x={x} y={cv} color={C.g} />}

        {/* Drawn after the probe line and the curves, so its halo keeps it readable over them. */}
        <Label at={[-7.55, -2.75]} color={C.bad} attach="c" size={11.5}>log₂(x + 5)</Label>
        <Label at={[-7.55, -3.45]} color={C.bad} attach="c" size={11.5}>undefined</Label>

        <Point x={-1} y={1} color={C.good} />
        <Label at={[-1, 1]} color={C.good} attach="nw" size={12}>(−1, 1)</Label>
        {s === 2 && (
          <>
            <Point x={-7} y={1} color={C.bad} />
            <Label at={[-7, 1]} color={C.bad} attach="ne" size={12}>(−7, 1)</Label>
          </>
        )}
      </Plane>
      <Controls>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <StepNav step={s} count={3} onBack={steps.back} onNext={steps.next} />
          <span className="text-[12.5px] font-semibold text-gray-700 dark:text-gray-200">{STEP_TITLES[s]}</span>
        </div>
        <Slider label="x" value={x} onChange={setX} min={-9.8} max={2} step={0.05} format={v => num(v)} />
        <Buttons>
          <ActionButton label="Try x = −7" onClick={() => setX(-7)} />
          <ActionButton label="Try x = −1" onClick={() => setX(-1)} />
        </Buttons>
        <table className="w-full border-collapse text-[12.5px] text-gray-700 dark:text-gray-300">
          <tbody>
            <TableRow label={<Katex tex="x+5" />} bad={a <= 1e-9}>
              <Katex tex={num(a)} />
            </TableRow>
            <TableRow label={<Katex tex="x+9" />} bad={b <= 1e-9}>
              <Katex tex={num(b)} />
            </TableRow>
            <TableRow dot={C.f} label={<Katex tex="2\log_2(x+5)-\log_2(x+9)" />} bad={!printedOk}>
              {printedOk ? <Katex tex={value(pv)} /> : 'undefined'}
            </TableRow>
            {s >= 1 && (
              <TableRow dot={C.g} label={<Katex tex={combinedTex} />} bad={!combinedOk}>
                {combinedOk ? <Katex tex={value(cv)} /> : 'undefined'}
              </TableRow>
            )}
          </tbody>
        </table>
        {notice}
      </Controls>
    </div>
  )
}
