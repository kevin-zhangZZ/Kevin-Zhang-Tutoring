// 2021 Specialist Exam 2 Q2b — placing the ray Arg(z − z₄) = 5π/6 precisely on VCAA's polar grid
// (circles r = 1 to 4, radial lines every 30°, no rectangular grid). Slide z along the ray: z − z₄ =
// t·cis(5π/6) with t = |z − z₄|, so the argument is 5π/6 for every t > 0, and at t = 0 (z = z₄) it is
// undefined, which is why z₄ is an open circle. Both of the report's issues are shown: in polar form
// z₄ = √3 + i = 2cis(π/6) sits exactly where r = 2 meets the 30° line, and at t = 2 the ray passes
// through 2i, where r = 2 meets the imaginary axis, so two grid intersections fix the ray exactly.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Circle, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider,
  Vector, num,
} from './kit'

type P = [number, number]
const S3 = Math.sqrt(3)
const Z4: P = [S3, 1]
const at = (t: number): P => [S3 - (t * S3) / 2, 1 + t / 2]
const FAR = at(7)
const DEG = Math.PI / 180
const polar = (r: number, deg: number): P => [r * Math.cos(deg * DEG), r * Math.sin(deg * DEG)]
const SPOKES = [30, 60, 120, 150, 210, 240, 300, 330]
const ARC_R = 0.45

export default function Ray() {
  const [t, setT] = useState(1.2)

  const atZ4 = t < 0.03
  const at2i = Math.abs(t - 2) < 0.03
  const z = at(t)
  const col = atZ4 ? C.bad : C.good
  const sgn = (v: number) => (v < -0.004 ? '-' : '+')

  const zTex = atZ4 ? 'z = z_4 = \\sqrt3 + i' : at2i ? 'z = 2i' : `z \\approx ${num(z[0])} ${sgn(z[1])} ${num(Math.abs(z[1]))}i`
  const diffTex = atZ4
    ? 'z - z_4 = 0'
    : at2i
      ? 'z - z_4 = -\\sqrt3 + i = 2\\operatorname{cis}\\left(\\tfrac{5\\pi}{6}\\right)'
      : `z - z_4 = ${num(t)}\\operatorname{cis}\\left(\\tfrac{5\\pi}{6}\\right)`
  const argTex = `\\operatorname{Arg}(z - z_4) = ${atZ4 ? '\\text{undefined}' : '\\tfrac{5\\pi}{6}'}`

  let notice
  if (atZ4) {
    notice = (
      <Notice tone="warn">
        <b>
          Here <M>z = z_4</M>, so <M>z - z_4 = 0</M>
        </b>
        , and <M>0</M> has no argument. <M>z_4</M> itself is not on the ray: draw it as an <b>open circle</b>. To place
        it precisely on this polar grid, write it in polar form{' '}
        <M>{'\\sqrt3 + i = 2\\operatorname{cis}\\left(\\tfrac{\\pi}{6}\\right)'}</M> and it sits exactly where the circle{' '}
        <M>r = 2</M> meets the <M>{'30^\\circ'}</M> line (violet). Now press &ldquo;Go to 2i&rdquo;.
      </Notice>
    )
  } else if (at2i) {
    notice = (
      <Notice tone="good">
        <b>
          The ray passes exactly through <M>2i</M>
        </b>
        , where the circle <M>r = 2</M> meets the imaginary axis (violet). Check:{' '}
        <M>{'2i - z_4 = -\\sqrt3 + i = 2\\operatorname{cis}\\left(\\tfrac{5\\pi}{6}\\right)'}</M>. So the ray runs from an
        open circle at <M>{'2\\operatorname{cis}\\left(\\tfrac{\\pi}{6}\\right)'}</M> straight through <M>2i</M>: two grid
        intersections a ruler can line up exactly, with no estimating <M>{'\\sqrt3 \\approx 1.73'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>{`z - z_4 = ${num(t)}\\operatorname{cis}\\left(\\tfrac{5\\pi}{6}\\right)`}</M>: however far along <M>z</M> is, the
        arrow from <M>z_4</M> to <M>z</M> points at <M>{'150^\\circ'}</M>, so{' '}
        <M>{'\\operatorname{Arg}(z - z_4) = \\tfrac{5\\pi}{6}'}</M> and <M>z</M> is on the ray. Press &ldquo;Go to
        z&#8324;&rdquo; to see the one point where this fails, then &ldquo;Go to 2i&rdquo;.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-3.2, 3.2]} y={[-0.6, 4.3]} xStep={10} yStep={10} equalScale height={460} labels={false} xLabel="" yLabel="">
        {/* VCAA's polar grid: circles r = 1 to 4 and radial lines every 30° */}
        {[1, 2, 3, 4].map(r => (
          <Circle key={r} center={[0, 0]} radius={r} color={C.guide} fillOpacity={0} weight={1} />
        ))}
        {SPOKES.map(d => (
          <Line.Segment key={d} point1={[0, 0]} point2={polar(4, d)} color={C.guide} weight={1} />
        ))}
        {[-3, -2, -1, 1, 2, 3].map(v => (
          <Label key={v} at={[v, 0]} attach="s" size={11} bold={false}>
            {v < 0 ? `−${-v}` : v}
          </Label>
        ))}
        {[1, 2, 3, 4].map(v => (
          <Label key={v} at={[0, v]} attach="w" size={11} bold={false}>
            {v}
          </Label>
        ))}
        <Label at={[3.2, 0]} attach="nw" italic>
          Re(z)
        </Label>
        <Label at={[0, 4.3]} attach="e" italic>
          Im(z)
        </Label>

        {/* The grid lines that pin each key point down */}
        {(atZ4 || at2i) && <Circle center={[0, 0]} radius={2} color={C.violet} fillOpacity={0} weight={2.5} />}
        {atZ4 && (
          <>
            <Line.Segment point1={[0, 0]} point2={polar(4, 30)} color={C.violet} weight={2.5} />
            <Plot.Parametric xy={a => polar(0.7, a / DEG)} domain={[0, Math.PI / 6]} color={C.violet} weight={2} />
            <Label at={polar(0.95, 14)} attach="c" color={C.violet} size={12}>
              π/6
            </Label>
          </>
        )}
        {at2i && <Line.Segment point1={[0, 0]} point2={[0, 4]} color={C.violet} weight={2.5} />}

        {/* The ray */}
        <Line.Segment point1={Z4} point2={FAR} color={C.g} weight={3} />

        {/* The positive real direction at z₄ and the angle z − z₄ makes with it */}
        <Line.Segment point1={Z4} point2={[Z4[0] + 1.1, Z4[1]]} color={C.ink} style="dashed" weight={1.5} />
        {!atZ4 && (
          <>
            <Plot.Parametric
              xy={a => [Z4[0] + ARC_R * Math.cos(a), Z4[1] + ARC_R * Math.sin(a)]}
              domain={[0, (5 * Math.PI) / 6]}
              color={col}
              weight={2.5}
            />
            <Label at={[Z4[0] + 0.72 * Math.cos(75 * DEG), Z4[1] + 0.72 * Math.sin(75 * DEG)]} attach="c" color={col} size={12}>
              5π/6
            </Label>
            <Vector tail={Z4} tip={z} color={col} weight={2.5} />
          </>
        )}

        {/* z₄: an open circle, since Arg(0) is undefined */}
        <Circle center={Z4} radius={0.1} color="var(--mafs-bg)" fillOpacity={1} weight={0} />
        <Circle center={Z4} radius={0.1} color={atZ4 ? C.bad : C.g} fillOpacity={0} weight={2.5} />
        <Label at={Z4} attach="s" color={C.g} gap={11}>
          z₄
        </Label>
        {!atZ4 && <Point x={z[0]} y={z[1]} color={col} />}
        {!atZ4 && (
          <Label at={z} attach="ne" color={col} gap={9}>
            z
          </Label>
        )}
      </Plane>
      <Controls>
        <Slider label="|z - z_4|" value={t} onChange={setT} min={0} max={4.5} step={0.02} />
        <Buttons>
          <ActionButton label="Go to z₄" onClick={() => setT(0)} />
          <ActionButton label="Go to 2i" onClick={() => setT(2)} />
        </Buttons>
        <Readouts>
          <Readout tex={zTex} />
          <Readout color={col} tex={diffTex} />
          <Readout color={col} tex={argTex} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
