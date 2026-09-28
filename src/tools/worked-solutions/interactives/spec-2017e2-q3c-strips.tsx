// 2017 Specialist Exam 2 Q3c — two ways to slice the first-quadrant quarter of the brooch.
// Upright strips have height f(x), and the top edge changes rule at x = √2, so the area needs two
// integrals. Sideways strips run from the arcsin edge (x = 2 sin(y/3)) to the arccos edge
// (x = 2 cos(y/3)) at every height, so one integral does it and gives the exact 24(√2 − 1) ≈ 9.94.
// A toggle shows the report's slip of leaving out the factor 3: the shape squashes to a third of
// its height and the area comes out as 8(√2 − 1) ≈ 3.3.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Polygon, Readout, Readouts, Region,
  Slider, Toggle, clamp, integrate, usePlayer,
} from './kit'

const R2 = Math.SQRT2
const W = 0.06

export default function SliceBrooch() {
  const [mode, setMode] = useState<'v' | 'h'>('v')
  const [t, setT] = useState(0.45)
  const [noThree, setNoThree] = useState(false)
  const player = usePlayer(setT, { min: 0, max: 1, seconds: 6 })

  const k = noThree ? 1 : 3
  const F = (x: number) => (x <= R2 ? k * Math.asin(x / 2) : k * Math.acos(x / 2))
  const xL = (y: number) => 2 * Math.sin(y / k)
  const xR = (y: number) => 2 * Math.cos(y / k)
  const yTop = (k * Math.PI) / 4
  const quarter = k * (2 * R2 - 2)
  const shade = noThree ? C.bad : C.f

  // the strip
  const x0 = clamp(2 * t, 0.005, 1.995)
  const y0 = clamp(yTop * t, 0.005, yTop - 0.005)
  const left = x0 <= R2
  const soFar = mode === 'v' ? integrate(F, 0, x0) : integrate(y => xR(y) - xL(y), 0, y0)

  const stripPts: [number, number][] =
    mode === 'v'
      ? [[x0 - W / 2, 0], [x0 + W / 2, 0], [x0 + W / 2, F(x0)], [x0 - W / 2, F(x0)]]
      : [[xL(y0), y0 - W / 2], [xR(y0), y0 - W / 2], [xR(y0), y0 + W / 2], [xL(y0), y0 + W / 2]]
  const stripColor = noThree ? C.bad : mode === 'h' ? C.good : left ? C.f : C.g

  // swept band for sideways strips: from y = 0 up to y0, between the two edges
  const band: [number, number][] = []
  for (let i = 0; i <= 40; i++) band.push([xL((y0 * i) / 40), (y0 * i) / 40])
  for (let i = 40; i >= 0; i--) band.push([xR((y0 * i) / 40), (y0 * i) / 40])

  const kk = noThree ? '' : '3'
  const heightTex = left ? `${kk}\\arcsin\\tfrac{x}{2}` : `${kk}\\arccos\\tfrac{x}{2}`
  const widthTex = noThree ? '2\\cos y-2\\sin y' : '2\\cos\\tfrac{y}{3}-2\\sin\\tfrac{y}{3}'

  let notice
  if (noThree) {
    notice = (
      <Notice tone="warn">
        Without the <M>3</M>, the corner drops to height <M>{'\\tfrac{\\pi}{4}\\approx0.79'}</M> (red), but the
        figure&apos;s corner is above <M>2</M>. The area comes out as <M>{'8(\\sqrt2-1)\\approx3.3'}</M>, a third of
        the real one. The <M>3</M> is a dilation from the <M>x</M>-axis: every upright strip is three times as tall.
      </Notice>
    )
  } else if (mode === 'v') {
    notice = (
      <Notice>
        Each upright strip reaches up to the top edge, so its height is <M>{heightTex}</M>. Sweep past{' '}
        <M>{'x=\\sqrt2'}</M>: the top edge switches rule (the strip turns orange), so one integral can&apos;t cover
        both. That is why the working splits at <M>{'\\sqrt2'}</M>. Now try <b>Sideways strips</b>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        A sideways strip always runs from the <M>\arcsin</M> edge to the <M>\arccos</M> edge. Solving{' '}
        <M>{'y=3\\arcsin\\tfrac{x}{2}'}</M> gives <M>{'x=2\\sin\\tfrac{y}{3}'}</M>, and{' '}
        <M>{'y=3\\arccos\\tfrac{x}{2}'}</M> gives <M>{'x=2\\cos\\tfrac{y}{3}'}</M>, so one integral from{' '}
        <M>0</M> to <M>{'\\tfrac{3\\pi}{4}'}</M> does the quarter: <M>{'6\\sqrt2-6'}</M>. Four quarters:{' '}
        <M>{'24(\\sqrt2-1)\\approx9.94'}</M>, the same as the two upright integrals.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 2.2]} y={[0, 2.6]} xStep={0.5} yStep={0.5} equalScale height={380}>
        <Region top={F} bottom={() => 0} from={0} to={2} color={shade} opacity={0.1} />
        {mode === 'v' ? (
          <Region top={F} bottom={() => 0} from={0} to={x0} color={shade} opacity={0.25} />
        ) : (
          <Polygon points={band} color={shade} fillOpacity={0.25} weight={0} />
        )}
        {noThree && (
          <>
            <Plot.OfX y={x => 3 * Math.asin(x / 2)} domain={[0, R2]} color={C.guide} weight={1.5} />
            <Plot.OfX y={x => 3 * Math.acos(x / 2)} domain={[R2, 2]} color={C.guide} weight={1.5} />
          </>
        )}
        <Plot.OfX y={x => k * Math.asin(x / 2)} domain={[0, R2]} color={noThree ? C.bad : C.f} weight={3} style={noThree ? 'dashed' : 'solid'} />
        <Plot.OfX y={x => k * Math.acos(x / 2)} domain={[R2, 2]} color={noThree ? C.bad : C.g} weight={3} style={noThree ? 'dashed' : 'solid'} />
        {mode === 'v' && (
          <>
            <Line.Segment point1={[R2, 0]} point2={[R2, 2.55]} color={C.guide} style="dashed" weight={1.5} />
            <Label at={[R2, 2.5]} attach="e" color={C.ink} size={12}>rule changes</Label>
          </>
        )}
        <Polygon points={stripPts} color={stripColor} fillOpacity={0.85} weight={1} />
      </Plane>
      <Controls>
        <Buttons>
          <ActionButton label={mode === 'v' ? '● Upright strips' : 'Upright strips'} onClick={() => setMode('v')} />
          <ActionButton label={mode === 'h' ? '● Sideways strips' : 'Sideways strips'} onClick={() => setMode('h')} />
        </Buttons>
        <Slider
          label={mode === 'v' ? 'x' : 'y'}
          value={t}
          onChange={v => {
            player.stop()
            setT(v)
          }}
          min={0}
          max={1}
          step={0.005}
          format={v => (mode === 'v' ? clamp(2 * v, 0.005, 1.995) : clamp(yTop * v, 0.005, yTop - 0.005)).toFixed(2)}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Sweep" />
          <Toggle label="Leave out the factor 3" checked={noThree} onChange={setNoThree} />
        </Buttons>
        <Readouts>
          {mode === 'v' ? (
            <Readout color={stripColor} tex={`\\text{height}=${heightTex}=${F(x0).toFixed(3)}`} />
          ) : (
            <Readout color={stripColor} tex={`\\text{width}=${widthTex}=${(xR(y0) - xL(y0)).toFixed(3)}`} />
          )}
          <Readout tex={`\\text{quarter so far}\\approx${soFar.toFixed(3)}`} />
          <Readout
            color={noThree ? C.bad : C.good}
            tex={`\\text{brooch}=4\\times${quarter.toFixed(3)}\\approx${(4 * quarter).toFixed(2)}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
