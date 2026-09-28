// 2020 Methods Exam 2 MCQ 15 — the average value of f over [−2a, a] is the height h of the level
// line that balances the graph: the area between f and y = h where f is above the line (blue)
// equals the area where f is below it (orange). That is ∫(f − h) dx = 0, i.e. a² − 3ah = 0,
// h = a/3 — the same statement as (1/3a)∫f dx: a rectangle 3a wide and h tall with the same
// signed area a² as f. Drawn with a = 1 (tick labels in terms of a), on the printed grid's a/2
// squares. At h = 0 the pieces are the three signed triangles +4a²/3, −7a²/12, +a²/4 (total a²);
// at h = a/3 both sides are 28a²/27. The option buttons show C = a/2 (halfway between the highest
// value 2a and the lowest −a) and the other options failing to balance. The y tick −a is left
// off: the labelled corner (0, −a) sits on it. Areas are exact: each
// piece of f is linear, so the part above or below the line is a triangle or trapezium.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Region, Slider, Toggle, num } from './kit'

/** f with a = 1: through (−2, 2), (0, −1) and (1, 1), continued a little past each end as printed. */
const f = (x: number) => (x <= 0 ? -1.5 * x - 1 : 2 * x - 1)

/** ∫ max(g, 0) over a piece of width w on which g runs linearly from g0 to g1. */
function positivePart(g0: number, g1: number, w: number): number {
  if (g0 >= 0 && g1 >= 0) return ((g0 + g1) / 2) * w
  if (g0 <= 0 && g1 <= 0) return 0
  const r = (g0 / (g0 - g1)) * w // where g crosses zero
  return g0 > 0 ? (g0 * r) / 2 : (g1 * (w - r)) / 2
}

/** Areas (in units of a²) between f and the level y = h over [−2, 1]. */
function areas(h: number) {
  const above = positivePart(f(-2) - h, f(0) - h, 2) + positivePart(f(0) - h, f(1) - h, 1)
  const below = positivePart(h - f(-2), h - f(0), 2) + positivePart(h - f(0), h - f(1), 1)
  return { above, below }
}

/** A multiple of a as the student would write it. */
function inA(t: number): string {
  const known: [number, string][] = [[0, '0'], [1 / 3, 'a/3'], [0.5, 'a/2'], [0.75, '3a/4'], [1, 'a'], [2, '2a'], [-1, '−a']]
  for (const [v, s] of known) if (Math.abs(t - v) < 1e-6) return s
  return `${num(t, 2)}a`
}
/** The same for TeX. */
function inATex(t: number): string {
  const known: [number, string][] = [[0, '0'], [1 / 3, '\\tfrac{a}{3}'], [0.5, '\\tfrac{a}{2}'], [0.75, '\\tfrac{3a}{4}'], [1, 'a']]
  for (const [v, s] of known) if (Math.abs(t - v) < 1e-6) return s
  return `${num(t, 2).replace('−', '-')}a`
}

const aTick = (v: number) => {
  const r = Math.round(v)
  if (Math.abs(v - r) > 1e-9) return ''
  return r === 1 ? 'a' : r === -1 ? '−a' : `${r}a`.replace('-', '−')
}

const OPTIONS: { letter: string; t: number; tex: string }[] = [
  { letter: 'A', t: 0, tex: '0' },
  { letter: 'B', t: 1 / 3, tex: 'a/3' },
  { letter: 'C', t: 0.5, tex: 'a/2' },
  { letter: 'D', t: 0.75, tex: '3a/4' },
  { letter: 'E', t: 1, tex: 'a' },
]

export default function Balance() {
  const [h, setH] = useState(0)
  const { above, below } = areas(h)
  const net = 1 - 3 * h // ∫(f − h) dx in units of a², exactly
  const is = (v: number) => Math.abs(h - v) < 1e-6
  const balanced = is(1 / 3)
  const lineColor = balanced ? C.good : C.violet

  let notice
  if (is(0)) {
    notice = (
      <Notice>
        With the line on the <M>x</M>-axis, blue and orange are the three triangles of the signed area:{' '}
        <M>{'+\\tfrac{4a^2}{3} - \\tfrac{7a^2}{12} + \\tfrac{a^2}{4} = a^2'}</M>. That is <M>{'\\int_{-2a}^{a} f(x)\\,dx = a^2'}</M> from the
        working. Blue beats orange by <M>a^2</M>, so the balancing level is <i>above</i> 0, which rules out option A. Drag <M>h</M> up.
      </Notice>
    )
  } else if (balanced) {
    notice = (
      <Notice tone="good">
        <b>Balanced:</b> <M>{'\\tfrac{28a^2}{27}'}</M> above the line and <M>{'\\tfrac{28a^2}{27}'}</M> below it. Knock the peaks into the
        dips and the graph levels off at <M>{'h = \\tfrac{a}{3}'}</M>. It&apos;s the formula in picture form: the dashed rectangle, <M>3a</M> wide and{' '}
        <M>{'\\tfrac{a}{3}'}</M> tall, has area <M>a^2</M>, the same signed area as <M>f</M>, so{' '}
        <M>{'\\tfrac{1}{3a}\\int_{-2a}^{a} f(x)\\,dx = \\tfrac{a}{3}'}</M>.
      </Notice>
    )
  } else if (is(0.5)) {
    notice = (
      <Notice tone="warn">
        <b>Option C, <M>{'\\tfrac{a}{2}'}</M>, is halfway between the highest value <M>2a</M> and the lowest <M>-a</M></b>. But orange now
        beats blue, <M>{'\\tfrac{21a^2}{16}'}</M> to <M>{'\\tfrac{13a^2}{16}'}</M>: the graph spends most of its width low down, so its
        average sits below the middle of its range. The average value depends on the area, not on the highest and lowest points.
      </Notice>
    )
  } else if (is(0.75) || is(1)) {
    notice = (
      <Notice tone="warn">
        <b>Option {is(1) ? 'E' : 'D'} is far too high:</b> orange {num(below, 3)}<M>a^2</M> against blue {num(above, 3)}<M>a^2</M>.
        {is(1) ? (
          <>
            {' '}(<M>a</M> is what you get by dividing <M>a^2</M> by <M>a</M>, the right-hand end, instead of by the width{' '}
            <M>a - (-2a) = 3a</M>.)
          </>
        ) : null}
      </Notice>
    )
  } else if (net > 0) {
    notice = (
      <Notice>
        Blue (the graph above the line) is bigger by <M>{`${num(net, 3).replace('−', '-')}a^2`}</M>: raise the line. The difference is
        always <M>{'\\int_{-2a}^{a}\\bigl(f(x) - h\\bigr)dx = a^2 - 3ah'}</M>, because raising the line by a small amount moves a strip{' '}
        <M>3a</M> wide from the blue side to the orange side.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Orange (the graph below the line) is bigger by <M>{`${num(-net, 3).replace('−', '-')}a^2`}</M>: lower the line. Blue minus orange
        is always <M>{'a^2 - 3ah'}</M>, so it is zero at exactly one height.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-2.5, 1.5]} y={[-1.5, 2.5]} xStep={0.5} yStep={0.5} height={340} labels={aTick} yLabels={v => (Math.abs(v + 1) < 1e-9 ? '' : aTick(v))}>
        {/* The graph above the line (blue) and below it (orange), piece by piece. */}
        <Region top={x => Math.max(f(x), h)} bottom={() => h} from={-2} to={0} color={C.f} opacity={0.3} />
        <Region top={x => Math.max(f(x), h)} bottom={() => h} from={0} to={1} color={C.f} opacity={0.3} />
        <Region top={() => h} bottom={x => Math.min(f(x), h)} from={-2} to={0} color={C.g} opacity={0.35} />
        <Region top={() => h} bottom={x => Math.min(f(x), h)} from={0} to={1} color={C.g} opacity={0.35} />
        <Line.Segment point1={[-2, -1.5]} point2={[-2, 2.5]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[1, -1.5]} point2={[1, 2.5]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.OfX y={f} domain={[-2.35, 1.25]} color={C.f} weight={3} />
        <Line.Segment point1={[-2, h]} point2={[1, h]} color={lineColor} weight={3} />
        {/* At the balance level: the rectangle with the same signed area, 3a wide and a/3 tall. */}
        {balanced && <Polygon points={[[-2, 0], [1, 0], [1, h], [-2, h]]} color={C.good} fillOpacity={0} weight={2} strokeStyle="dashed" />}
        <Point x={-2} y={2} color={C.ink} />
        <Point x={0} y={-1} color={C.ink} />
        <Point x={1} y={1} color={C.ink} />
        <Label at={[-2, 2]} attach="ne" size={12}>(−2a, 2a)</Label>
        <Label at={[0, -1]} attach="sw" size={12}>(0, −a)</Label>
        <Label at={[1, 1]} attach="e" size={12}>(a, a)</Label>
        {is(0) && (
          <>
            <Label at={[-1.55, 0.62]} color={C.f} attach="c" size={12}>+4a²/3</Label>
            <Label at={[-0.06, -0.36]} color={C.g} attach="c" size={12}>−7a²/12</Label>
            <Label at={[1, 0.3]} color={C.f} attach="e" size={12}>+a²/4</Label>
          </>
        )}
      </Plane>
      <Controls>
        <Slider label="h" value={h} onChange={setH} min={-1} max={2} step={1 / 60} format={inA} />
        <Buttons>
          <span className="text-[12.5px] text-gray-500 dark:text-gray-400">Try an option:</span>
          {OPTIONS.map(o => (
            <Toggle key={o.letter} label={`${o.letter}: ${o.tex}`} checked={is(o.t)} onChange={() => setH(o.t)} />
          ))}
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\text{above the line} \\approx ${num(above, 3)}a^2`} />
          <Readout color={C.g} tex={`\\text{below} \\approx ${num(below, 3)}a^2`} />
          <Readout
            color={lineColor}
            tex={`\\int_{-2a}^{a}\\bigl(f(x) ${h < 0 ? '+' : '-'} ${inATex(Math.abs(h))}\\bigr)dx = ${balanced ? '0\\ \\checkmark' : `${num(net, 3).replace('−', '-')}a^2`}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
