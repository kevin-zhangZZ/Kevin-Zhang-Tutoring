// 2019 Methods Exam 2 MCQ 15 — why the inverse's gradient is the reciprocal. f(x) = x² − 4x + 2 on
// [2, ∞) and its inverse g(x) = 2 + √(x + 2) are mirror images in y = x. Slide a: the tangent at
// P(a, f(a)) and its rise/run triangle are reflected onto the tangent at Q(f(a), a) on g, and the
// reflection swaps the legs — f's run (violet) becomes g's rise, f's rise (green) becomes g's run —
// so g'(f(a)) = 1/f'(a). At a = 5: f'(5) = 6 and g'(7) = 1/6. A toggle draws the "copy f's gradient"
// idea (option D): a line of gradient 6 through (7, 5), which cuts straight across g.
import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, Slider, Toggle, tick } from './kit'

const f = (x: number) => x * x - 4 * x + 2
const g = (x: number) => 2 + Math.sqrt(x + 2)
const df = (x: number) => 2 * x - 4

type V = [number, number]
const seg = (p: V, dir: V, len: number): [V, V] => {
  const n = Math.hypot(dir[0], dir[1])
  const d: V = [(dir[0] / n) * len, (dir[1] / n) * len]
  return [[p[0] - d[0], p[1] - d[1]], [p[0] + d[0], p[1] + d[1]]]
}
const nice = (v: number) => {
  const s = parseFloat(v.toFixed(2)).toString()
  return s === '-0' ? '0' : s
}

export default function Reciprocal() {
  const [a, setA] = useState(5)
  const [copy, setCopy] = useState(false)

  const m = df(a)
  const P: V = [a, f(a)]
  const Q: V = [f(a), a]
  // rise/run triangle on f: run r, rise r·m (kept to a readable size)
  const r = m > 0.01 ? Math.min(1.5, 3 / m) : 1.5
  const rise = r * m
  const fRunEnd: V = [a + r, f(a)]
  const fTop: V = [a + r, f(a) + rise]
  // its mirror image in y = x
  const gRiseEnd: V = [f(a), a + r]
  const gTop: V = [f(a) + rise, a + r]

  const atFive = Math.abs(a - 5) < 0.005
  const flat = a < 2.005

  const [t1, t2] = seg(P, [1, m], 6)
  const [u1, u2] = seg(Q, [m, 1], 6)
  const [w1, w2] = seg(Q, [1, m], 2.6)

  let notice
  if (copy) {
    notice = (
      <Notice tone="warn">
        The red line has <b>f&apos;s gradient</b>, <M>{`${nice(m)}`}</M>, through <M>{`(${nice(f(a))},\\ ${nice(a)})`}</M>. It
        slices steeply across <M>g</M> instead of just touching it. <M>g</M> is the mirror image of a <em>steep</em>{' '}
        curve, so it must be <em>shallow</em> there. Copying <M>{"f'(5)=6"}</M> as the answer is option <b>D</b>.
      </Notice>
    )
  } else if (flat) {
    notice = (
      <Notice>
        At the vertex <M>(2,\ -2)</M>, <M>f</M> is flat: <M>{"f'(2)=0"}</M>. Its mirror image is a <b>vertical</b> tangent
        at <M>(-2,\ 2)</M> on <M>g</M>, so <M>{"g'(-2)"}</M> doesn&apos;t exist: the reciprocal of <M>0</M>. Slide{' '}
        <M>a</M> back up to <M>5</M>.
      </Notice>
    )
  } else if (atFive) {
    notice = (
      <Notice tone="good">
        <b>The question&apos;s point.</b> On <M>f</M> at <M>(5,\ 7)</M> the triangle has run <M>0.5</M> and rise <M>3</M>:
        gradient <M>6</M>. Its reflection at <M>(7,\ 5)</M> on <M>g</M> has rise <M>0.5</M> and run <M>3</M>: gradient{' '}
        <M>{'\\tfrac16'}</M>. So <M>{"g'(7)=\\tfrac16"}</M>, and it comes from <M>{"f'"}</M> at <M>5</M>, the matching
        point, not at <M>7</M>. Slide <M>a</M>: the swap works everywhere.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Reflecting in <M>y=x</M> swaps the coordinates of every point, so the triangle&apos;s legs swap too:
        f&apos;s <b style={{ color: C.violet }}>run</b> becomes g&apos;s rise, and f&apos;s{' '}
        <b style={{ color: C.good }}>rise</b> becomes g&apos;s run. Gradient is rise over run, so{' '}
        <M>{`g'(${nice(f(a))}) = \\frac{1}{f'(${nice(a)})}`}</M>. The mirror image of a tangent is a tangent, not a
        perpendicular, so it&apos;s the reciprocal, not the negative reciprocal.
      </Notice>
    )
  }

  const legLab = (v: number) => (Math.abs(v) < 0.05 ? '' : nice(v))

  return (
    <div>
      <Plane x={[-3, 13]} y={[-3, 13]} xStep={2} yStep={2} equalScale height={500} xLabels={v => (v < -2.5 || v > 12.5 ? "" : tick(v))}>
        <Line.Segment point1={[-3, -3]} point2={[13, 13]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[11.5, 11.5]} color={C.guide} attach="se" size={12}>y = x</Label>

        <Plot.OfX y={f} domain={[2, 2 + Math.sqrt(15)]} color={C.f} weight={3} />
        <Plot.OfX y={g} domain={[-2, 13]} color={C.g} weight={3} />
        <Label at={[2 + Math.sqrt(14.4), 12.4]} color={C.f} attach="w">f</Label>
        <Label at={[12.4, g(12.4)]} color={C.g} attach="n">g = f⁻¹</Label>

        {/* tangents */}
        <Line.Segment point1={t1} point2={t2} color={C.ink} weight={1.25} style="dashed" />
        <Line.Segment point1={u1} point2={u2} color={C.ink} weight={1.25} style="dashed" />
        {copy && <Line.Segment point1={w1} point2={w2} color={C.bad} weight={2.5} />}

        {/* rise/run triangle on f and its mirror image on g */}
        <Polygon points={[P, fRunEnd, fTop]} color={C.f} fillOpacity={0.08} weight={0} />
        <Line.Segment point1={P} point2={fRunEnd} color={C.violet} weight={3.5} />
        <Line.Segment point1={fRunEnd} point2={fTop} color={C.good} weight={3.5} />
        <Polygon points={[Q, gRiseEnd, gTop]} color={C.g} fillOpacity={0.08} weight={0} />
        <Line.Segment point1={Q} point2={gRiseEnd} color={C.violet} weight={3.5} />
        <Line.Segment point1={gRiseEnd} point2={gTop} color={C.good} weight={3.5} />

        <Label at={[a + r / 2, f(a)]} color={C.violet} attach="s" size={12}>{legLab(r)}</Label>
        <Label at={[a + r, f(a) + rise / 2]} color={C.good} attach="e" size={12}>{legLab(rise)}</Label>
        <Label at={[f(a), a + r / 2]} color={C.violet} attach="nw" size={12}>{legLab(r)}</Label>
        <Label at={[f(a) + rise / 2, a + r]} color={C.good} attach="n" size={12}>{legLab(rise)}</Label>

        <Point x={P[0]} y={P[1]} color={C.f} />
        <Point x={Q[0]} y={Q[1]} color={C.g} />
        <Label at={P} color={C.f} attach="w" size={12}>{`(${nice(a)}, ${nice(f(a))})`.replace(/-/g, "−")}</Label>
        <Label at={Q} color={C.g} attach="se" size={12}>{`(${nice(f(a))}, ${nice(a)})`.replace(/-/g, "−")}</Label>
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={2} max={5.4} step={0.01} format={v => v.toFixed(2)} />
        <Toggle label="Give g the same gradient as f?" checked={copy} onChange={setCopy} />
        <Readouts>
          <Readout color={C.f} tex={`f'(${nice(a)}) = \\frac{${nice(rise)}}{${nice(r)}} = ${nice(m)}`} />
          <Readout
            color={C.g}
            tex={flat ? `g'(${nice(f(a))})\\ \\text{undefined}` : `g'(${nice(f(a))}) = \\frac{${nice(r)}}{${nice(rise)}} = \\frac{1}{${nice(m)}}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
