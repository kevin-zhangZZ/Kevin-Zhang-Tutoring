// 2019 Specialist Exam 1 Q3c — the surface of a piece of chocolate, opened out flat (its net). The
// curved side peels off as a rectangle L long and 2πr = π wide (its dashed edges wrap once round the
// dashed circles); the two ends are discs of area πr² = π/4 each. Dragging L stretches only the
// rectangle, so A = π/4 + π/4 + πL = π/2 + πL: a fixed amount plus π for every centimetre of length.
// That makes A linear in L, so E(A) = π/2 + πE(L) = π/2 + 3π = 7π/2 ≈ 11.0 cm² (the L = 3 button).

import { useState } from 'react'
import { ActionButton, Buttons, C, Circle, Controls, Label, Line, M, Notice, Plane, Polygon, Readout, Readouts, Slider } from './kit'

const R = 0.5
const H = 2 * Math.PI * R // the rectangle's other side: once round the end
// The net is drawn with its corner at (O, O), well away from the origin, so no x- or y-axis shows:
// the picture is a shape, not a graph.
const O = 10

export default function Net() {
  const [L, setL] = useState(3)
  const atMean = Math.abs(L - 3) < 0.005
  const ends = [
    [O - R, O + H / 2],
    [O + L + R, O + H / 2],
  ] as const

  return (
    <div>
      <Plane x={[O - 1.1, O + 5.1]} y={[O - 0.55, O + 3.75]} xStep={100} yStep={100} equalScale height={440} labels={false} xLabel="" yLabel="">
        {/* the curved side, unrolled */}
        <Polygon points={[[O, O], [O + L, O], [O + L, O + H], [O, O + H]]} color={C.f} fillOpacity={0.22} weight={2} />
        <Line.Segment point1={[O, O]} point2={[O, O + H]} color={C.f} weight={4} style="dashed" />
        <Line.Segment point1={[O + L, O]} point2={[O + L, O + H]} color={C.f} weight={4} style="dashed" />
        {/* the two ends */}
        {ends.map(([cx, cy], i) => (
          <Circle key={`d${i}`} center={[cx, cy]} radius={R} color={C.g} fillOpacity={0.3} weight={0} />
        ))}
        {ends.map(([cx, cy], i) => (
          <Circle key={`o${i}`} center={[cx, cy]} radius={R} color={C.f} fillOpacity={0} weight={2.5} strokeStyle="dashed" />
        ))}
        {ends.map(([cx, cy], i) => (
          <Label key={`t${i}`} at={[cx, cy]} attach="c" size={12} color={C.g}>
            π/4
          </Label>
        ))}
        <Label at={[O + L / 2, O + H / 2]} attach="c" color={C.f}>
          {`π × ${L.toFixed(2)}`}
        </Label>
        <Label at={[O + L / 2, O]} attach="s" gap={5}>
          {`L = ${L.toFixed(2)}`}
        </Label>
        <Label at={[O + L / 2, O + H]} attach="n" gap={5}>
          2πr = π
        </Label>
      </Plane>
      <Controls>
        <Slider label="L" value={L} onChange={setL} min={2} max={4} step={0.01} />
        <Buttons>
          <ActionButton label="The average piece: L = 3" onClick={() => setL(3)} />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={'\\text{ends: }2\\times\\tfrac{\\pi}{4}=\\tfrac{\\pi}{2}'} />
          <Readout color={C.f} tex={`\\text{side: }\\pi\\times ${atMean ? '3' : L.toFixed(2)}`} />
          <Readout
            tex={
              atMean
                ? 'A=\\tfrac{\\pi}{2}+3\\pi=\\tfrac{7\\pi}{2}\\approx11.0'
                : `A=\\tfrac{\\pi}{2}+${L.toFixed(2)}\\pi=${(0.5 + L).toFixed(2)}\\pi`
            }
          />
        </Readouts>
        {atMean ? (
          <Notice tone="good">
            The average piece: <M>{'A=\\tfrac{\\pi}{2}+3\\pi'}</M>. Write <M>3\pi</M> as <M>{'\\tfrac{6\\pi}{2}'}</M> before
            adding, to get <M>{'\\tfrac{7\\pi}{2}'}</M>. Because <M>{'A=\\tfrac{\\pi}{2}+\\pi L'}</M> is a straight-line
            function of <M>L</M>, averaging over all the pieces gives <M>{'E(A)=\\tfrac{\\pi}{2}+\\pi E(L)'}</M>. Every
            piece gets the same <M>{'\\tfrac{\\pi}{2}'}</M> from its ends, so the average does too.
          </Notice>
        ) : (
          <Notice>
            Drag <M>L</M>: the two ends never change (each is <M>{'\\pi r^2=\\tfrac{\\pi}{4}'}</M>, whatever the length).
            Only the rectangle stretches, gaining <M>\pi</M> cm² for every extra cm, because its other side is the
            distance round the end, <M>{'2\\pi r=\\pi'}</M>. So <M>{'A=\\tfrac{\\pi}{2}+\\pi L'}</M>: a constant plus a
            multiple of <M>L</M>.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
