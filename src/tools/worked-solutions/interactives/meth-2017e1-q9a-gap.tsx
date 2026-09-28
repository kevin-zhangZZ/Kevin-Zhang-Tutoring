// 2017 Methods Exam 1 Q9a — why expanding √x(1 − x) = x^{1/2} − x^{3/2} gives the area. The region
// between y = √x and y = x^{3/2} has area 2/3 − 2/5. Slide every vertical strip straight down (it
// keeps its length √x − x^{3/2}) and the region lands exactly on the hump y = √x(1 − x), so the
// hump's area is 2/3 − 2/5 = 4/15. A toggle shows the examiners' two wrong ideas failing:
// multiplying the separate areas (2/3 × 1/2 = 1/3) or adding them (2/3 + 1/2 = 7/6).

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Readout, Readouts, Region, Slider, Toggle,
  usePlayer,
} from './kit'

const root = (x: number) => Math.sqrt(Math.max(0, x))
const p32 = (x: number) => Math.pow(Math.max(0, x), 1.5)
const f = (x: number) => root(x) * (1 - x)
const STRIPS = [0.18, 0.36, 0.54, 0.72, 0.9]

export default function Gap() {
  const [t, setT] = useState(0)
  const [wrong, setWrong] = useState(false)
  const player = usePlayer(setT, { min: 0, max: 1, seconds: 3 })

  const top = (x: number) => root(x) - t * p32(x)
  const bottom = (x: number) => (1 - t) * p32(x)
  const landed = t > 0.98

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        These are the two wrong ideas from the examiners&apos; report. The hump&apos;s height at each <M>x</M> is{' '}
        <M>\sqrt x</M> times <M>1-x</M> <b>at that same <M>x</M></b>, but multiplying the two total areas gives{' '}
        <M>{'\\tfrac13'}</M>, not <M>{'\\tfrac4{15}'}</M>: there is no product rule for integrals. Adding them is worse:{' '}
        <M>{'\\tfrac76'}</M> is more than the whole 1-by-1 square, for a hump that never gets higher than <M>0.39</M>.
      </Notice>
    )
  } else if (landed) {
    notice = (
      <Notice tone="good">
        <b>Every strip now stands on the <M>x</M>-axis</b>, and their tops trace exactly the hump, because{' '}
        <M>{'\\sqrt x\\,(1-x) = x^{\\frac12} - x^{\\frac32}'}</M>. Same strips, same area:{' '}
        <M>{'\\tfrac23 - \\tfrac25 = \\tfrac4{15}'}</M>. That is why you expand first: a difference of powers can be
        antidifferentiated term by term.
      </Notice>
    )
  } else if (t < 0.02) {
    notice = (
      <Notice>
        The shaded region lies between <M>y=\sqrt x</M> (top) and <M>{'y = x^{\\frac32}'}</M> (bottom), so its area is{' '}
        <M>{'\\tfrac23 - \\tfrac25'}</M>. Press play or drag the slider: each strip slides straight down but keeps its
        length. Where does the region end up?
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Each strip still has length <M>{'\\sqrt x - x^{\\frac32}'}</M>. Only its position has changed, so the shaded area is
        still <M>{'\\tfrac23 - \\tfrac25'}</M>. Keep going until every strip rests on the <M>x</M>-axis.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 1.12]} y={[0, 1.1]} xStep={0.25} yStep={0.25} height={300}>
        {wrong ? (
          <>
            <Region top={root} bottom={() => 0} from={0} to={1} color={C.g} opacity={0.14} />
            <Region top={x => 1 - x} bottom={() => 0} from={0} to={1} color={C.violet} opacity={0.14} />
            <Region top={f} bottom={() => 0} from={0} to={1} color={C.f} opacity={0.45} />
            <Plot.OfX y={root} domain={[0, 1]} color={C.g} weight={2.5} />
            <Plot.OfX y={x => 1 - x} domain={[0, 1]} color={C.violet} weight={2.5} />
            <Plot.OfX y={f} domain={[0, 1]} color={C.f} weight={3} />
            <Label at={[0.82, 0.62]} color={C.g} attach="c">area 2/3</Label>
            <Label at={[0.12, 0.62]} color={C.violet} attach="c">area 1/2</Label>
            <Label at={[0.4, 0.14]} color={C.f} attach="c">4/15</Label>
            <Label at={[1, 1]} color={C.g} attach="nw">y = √x</Label>
            <Label at={[0.1, 0.9]} color={C.violet} attach="ne">y = 1 − x</Label>
          </>
        ) : (
          <>
            <Region top={top} bottom={bottom} from={0} to={1} color={C.f} opacity={0.22} />
            <Plot.OfX y={root} domain={[0, 1]} color={C.g} weight={2.5} />
            <Plot.OfX y={p32} domain={[0, 1]} color={C.violet} weight={2.5} />
            <Plot.OfX y={f} domain={[0, 1]} color={C.f} weight={landed ? 3 : 2} style={landed ? 'solid' : 'dashed'} />
            {STRIPS.map(x => (
              <Line.Segment key={x} point1={[x, bottom(x)]} point2={[x, top(x)]} color={C.f} weight={4} />
            ))}
            <Label at={[1, 1]} color={C.g} attach="nw">y = √x</Label>
            <Label at={[0.74, p32(0.74)]} color={C.violet} attach="se">y = x√x</Label>
            <Label at={[0.6, f(0.6)]} color={C.f} attach="ne">y = √x(1 − x)</Label>
          </>
        )}
      </Plane>
      <Controls>
        {!wrong && (
          <Slider
            label="\text{slide down}"
            value={t}
            onChange={v => {
              player.stop()
              setT(v)
            }}
            min={0}
            max={1}
            step={0.01}
          />
        )}
        <Buttons>
          {!wrong && <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Slide the strips down" />}
          <Toggle
            label="Wrong idea: integrate √x and 1 − x separately"
            checked={wrong}
            onChange={v => {
              player.stop()
              setWrong(v)
            }}
          />
        </Buttons>
        <Readouts>
          {wrong ? (
            <>
              <Readout color={C.bad} tex="\tfrac23\times\tfrac12 = \tfrac13 \approx 0.333" />
              <Readout color={C.bad} tex="\tfrac23+\tfrac12 = \tfrac76 \approx 1.167" />
              <Readout color={C.f} tex="\text{hump} = \tfrac4{15} \approx 0.267" />
            </>
          ) : (
            <>
              <Readout color={C.g} tex="\int_0^1 x^{\frac12}\,dx = \tfrac23" />
              <Readout color={C.violet} tex="\int_0^1 x^{\frac32}\,dx = \tfrac25" />
              <Readout color={C.f} tex="\text{shaded} = \tfrac23 - \tfrac25 = \tfrac4{15} \approx 0.267" />
            </>
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
