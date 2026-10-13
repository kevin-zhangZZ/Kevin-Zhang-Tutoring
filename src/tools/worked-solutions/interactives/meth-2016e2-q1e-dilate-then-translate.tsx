// 2016 Methods Exam 2 Q1e — the transformation x' = x − π, y' = ay + b carries
// f(x) = 2cos(x/2) + π onto f′(x) = −sin(x/2). The π-left shift is fixed by the question; sliders
// set a and b. The image's rule is y = −2a sin(x/2) + aπ + b, so a fixes the amplitude (2a = 1) and
// then b fixes the midline (aπ + b = 0). The point: the dilation acts first and already halves the
// midline from π to π/2, so b = −π/2, not −π. A toggle switches the π-left shift off to show the
// cosine shape never matches −sin without it.

import { useState } from 'react'
import { Buttons, C, Controls, Label, M, Notice, Plane, Plot, Readout, Readouts, Slider, Toggle } from './kit'

const PI = Math.PI
const fp = (x: number) => -Math.sin(x / 2)
const piTick = (v: number) => {
  const n = Math.round(v / PI)
  return n === 0 ? '' : n === 1 ? 'π' : n === -1 ? '−π' : `${n}π`
}
const fmt = (v: number) => (Math.abs(v) < 0.005 ? '0' : v.toFixed(2))
const plus = (v: number) => (Math.abs(v) < 0.005 ? '' : v < 0 ? ` - ${fmt(-v)}` : ` + ${fmt(v)}`)

export default function DilateThenTranslate() {
  const [a, setA] = useState(1)
  const [b, setB] = useState(0)
  const [shift, setShift] = useState(true)

  const h = shift ? PI : 0
  const image = (x: number) => a * (2 * Math.cos((x + h) / 2) + PI) + b
  const amp = 2 * a
  const mid = a * PI + b
  const aOk = Math.abs(a - 0.5) < 0.013
  const bOk = Math.abs(b + PI / 2) < 0.03
  const bIsMinusPi = Math.abs(b + PI) < 0.03

  let notice
  if (!shift) {
    notice = (
      <Notice tone="warn">
        Without the shift the image is still a <b>cosine</b>: it peaks at <M>x = 0</M> while <M>f'</M> starts at{' '}
        <M>0</M> and falls. No choice of <M>a</M> and <M>b</M> fixes that, which is why the question shifts{' '}
        <M>\pi</M> left. Turn the shift back on.
      </Notice>
    )
  } else if (aOk && bOk) {
    notice = (
      <Notice tone="good">
        <b>The image lies exactly on <M>f'</M>.</b> Amplitude <M>2a = 1</M> and midline{' '}
        <M>{'a\\pi + b = \\tfrac{\\pi}{2} - \\tfrac{\\pi}{2} = 0'}</M>, so <M>{'a = \\tfrac12'}</M>,{' '}
        <M>{'b = -\\tfrac{\\pi}{2}'}</M>. The ends differ only because every point moved{' '}
        <M>{'\\pi'}</M> left (the image covers <M>{'[-\\pi, 7\\pi]'}</M>); the rules agree.
      </Notice>
    )
  } else if (!aOk) {
    notice = (
      <Notice>
        The shape already matches <M>f'</M>: after the shift the peaks and troughs line up. But the amplitude is{' '}
        <M>{`2a = ${fmt(amp)}`}</M> and <M>f'</M> has amplitude <M>1</M>. Slide <M>a</M> until <M>2a = 1</M>.
      </Notice>
    )
  } else if (bIsMinusPi) {
    notice = (
      <Notice tone="warn">
        <M>{'b = -\\pi'}</M> overshoots: the midline is now at <M>{'a\\pi + b = -\\tfrac{\\pi}{2}'}</M>. The dilation by{' '}
        <M>{'\\tfrac12'}</M> acts <b>first</b>, so it already moved the midline from <M>\pi</M> down to{' '}
        <M>{'\\tfrac{\\pi}{2}'}</M>. Only <M>{'\\tfrac{\\pi}{2}'}</M> more is needed.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Amplitude is right. Now the midline sits at <M>{`a\\pi + b = ${fmt(mid)}`}</M>, but <M>f'</M> oscillates about{' '}
        <M>0</M>. With <M>{'b = 0'}</M> it sits at <M>{'\\tfrac{\\pi}{2}'}</M>, not <M>\pi</M>, because the dilation
        halved it. Try <M>{'b = -\\pi'}</M> first, then find the right <M>b</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-PI, 8 * PI]} y={[-2, 7]} xStep={PI} yStep={1} height={320} xLabels={piTick}>
        <Plot.OfX y={x => 2 * Math.cos(x / 2) + PI} domain={[0, 8 * PI]} color={C.guide} weight={2} style="dashed" />
        <Plot.OfX y={fp} domain={[0, 8 * PI]} color={C.g} weight={3} />
        <Plot.OfX y={image} domain={[-h, 8 * PI - h]} color={C.f} weight={3} />
        <Plot.OfX y={() => mid} domain={[-h, 8 * PI - h]} color={C.f} weight={1} style="dashed" />
        <Label at={[4 * PI, PI + 2]} color={C.guide} attach="n">f</Label>
        <Label at={[3 * PI, 1]} color={C.g} attach="n">f′</Label>
        <Label at={[2 * PI - h, image(2 * PI - h)]} color={C.f} attach="s">image</Label>
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setA} min={0.1} max={1.5} step={0.025} format={v => v.toFixed(3)} />
        <Slider
          label="b"
          value={b}
          onChange={v => setB(Math.abs(v + PI / 2) < 0.03 ? -PI / 2 : Math.abs(v + PI) < 0.03 ? -PI : v)}
          min={-4}
          max={2}
          step={0.01}
          format={v => (Math.abs(v + PI / 2) < 1e-9 ? '−π/2' : Math.abs(v + PI) < 1e-9 ? '−π' : v.toFixed(2))}
        />
        <Buttons>
          <Toggle label="Translate π left" checked={shift} onChange={setShift} />
        </Buttons>
        <Readouts>
          {shift ? (
            <Readout color={C.f} tex={`y = -${fmt(amp)}\\sin\\!\\left(\\tfrac{x}{2}\\right)${plus(mid)}`} />
          ) : (
            <Readout color={C.f} tex={`y = ${fmt(amp)}\\cos\\!\\left(\\tfrac{x}{2}\\right)${plus(mid)}`} />
          )}
          <Readout tex={`\\text{amplitude } 2a = ${fmt(amp)}`} />
          <Readout tex={`\\text{midline } a\\pi + b = ${fmt(mid)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
