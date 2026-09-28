// 2018 Methods Exam 1 Q9a.ii — the antiderivative F(x) = sin(x) − x cos(x) evaluated at a multiple
// of π is F(kπ) = −kπ cos(kπ): the sine term dies and the point lands on y = −x (k even) or y = x
// (k odd). The definite integral is the change in F from nπ to (n+1)π, so it always jumps from one
// line to the other — up by (2n+1)π when n is even, down by (2n+1)π when n is odd. A toggle keeps
// part a.i's cosine values for odd n (the slip in the examiner's report) and shows the endpoints
// that produces falling off the curve.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, Vector } from './kit'

const PI = Math.PI
const F = (x: number) => Math.sin(x) - x * Math.cos(x)
const piTick = (v: number) => {
  const k = Math.round(v / PI)
  if (Math.abs(v - k * PI) > 1e-6) return ''
  return k === 1 ? 'π' : k === -1 ? '−π' : `${k}π`
}
const piTex = (k: number) => (k === 0 ? '0' : k === 1 ? '\\pi' : k === -1 ? '-\\pi' : `${k}\\pi`)
const piTxt = (k: number) => (k === 0 ? '0' : k === 1 ? 'π' : k === -1 ? '−π' : `${k < 0 ? '−' : ''}${Math.abs(k)}π`)

export default function Endpoints() {
  const [n, setN] = useState(1)
  const [wrong, setWrong] = useState(false)

  const odd = n % 2 === 1
  const kStart = odd ? n : -n // F(nπ) = −nπ cos(nπ), in multiples of π
  const kEnd = odd ? -(n + 1) : n + 1
  const change = kEnd - kStart // ±(2n+1)
  const x0 = n * PI
  const x1 = (n + 1) * PI
  const up = change > 0
  const arrowColor = up ? C.good : C.bad
  const showWrong = wrong && odd

  let notice
  if (wrong && !odd) {
    notice = (
      <Notice>
        For even <M>n</M> these cosine values <b>are</b> right, so there is nothing to see yet. Choose an odd{' '}
        <M>n</M>.
      </Notice>
    )
  } else if (showWrong) {
    notice = (
      <Notice tone="warn">
        Keeping part a.i&apos;s <M>{'\\cos(n\\pi) = 1'}</M> and <M>{'\\cos\\bigl((n+1)\\pi\\bigr) = -1'}</M> puts the
        endpoints at the red dots, which are <b>not on the curve</b>. For odd <M>n</M> the cosines swap:{' '}
        <M>{`\\cos(${piTex(n)}) = -1`}</M> and <M>{`\\cos(${piTex(n + 1)}) = 1`}</M>. The real integral drops by{' '}
        <M>{`${piTex(2 * n + 1)}`}</M>; it doesn&apos;t rise by it.
      </Notice>
    )
  } else if (odd) {
    notice = (
      <Notice>
        <M>n = {n}</M> is odd, so <M>F</M> starts on the line <M>y = x</M> at{' '}
        <M>{`(${piTex(n)}, ${piTex(n)})`}</M> and finishes on <M>y = -x</M> at{' '}
        <M>{`(${piTex(n + 1)}, ${piTex(-(n + 1))})`}</M>. The integral is the change in <M>F</M>, a drop of{' '}
        <M>{`${piTex(n)} + ${piTex(n + 1)} = ${piTex(2 * n + 1)}`}</M>. That is part a.i&apos;s size with the sign
        flipped. Turn on the toggle to see what goes wrong if you keep a.i&apos;s cosines.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <M>n = {n}</M> is even, so <M>F</M> starts on <M>y = -x</M> and finishes on <M>y = x</M>: a rise of{' '}
        <M>{`${piTex(n)} + ${piTex(n + 1)} = ${piTex(2 * n + 1)}`}</M>, part a.i&apos;s answer. Every multiple of{' '}
        <M>\pi</M> lands on one of the two lines because <M>{'\\sin(k\\pi) = 0'}</M> leaves only{' '}
        <M>{'-k\\pi\\cos(k\\pi) = \\pm k\\pi'}</M>. Now choose an odd <M>n</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 5 * PI]} y={[-16, 16]} xStep={PI} yStep={5} height={340} xLabels={piTick}>
        <Line.Segment point1={[0, 0]} point2={[5 * PI, 5 * PI]} color={C.guide} style="dashed" weight={1.5} />
        <Line.Segment point1={[0, 0]} point2={[5 * PI, -5 * PI]} color={C.guide} style="dashed" weight={1.5} />
        <Label at={[4.3 * PI, 4.3 * PI]} color={C.guide} attach="nw">
          y = x
        </Label>
        <Label at={[4.3 * PI, -4.3 * PI]} color={C.guide} attach="sw">
          y = −x
        </Label>
        <Plot.OfX y={F} domain={[0, 5 * PI]} color={C.f} weight={3} />
        <Line.Segment point1={[x0, kStart * PI]} point2={[x1, kStart * PI]} color={C.guide} style="dashed" weight={1.5} />
        {Math.abs(change) > 0 && (
          <Vector tail={[x1, kStart * PI]} tip={[x1, kEnd * PI]} color={showWrong ? C.guide : arrowColor} weight={3} />
        )}
        <Label at={[x1, kEnd * PI * 0.55]} color={showWrong ? C.guide : arrowColor} attach="e">
          {`${up ? '+' : ''}${piTxt(change)}`}
        </Label>
        <Point x={x0} y={kStart * PI} color={C.f} />
        <Point x={x1} y={kEnd * PI} color={C.f} />
        {showWrong && (
          <>
            <Line.Segment point1={[x1 - 0.35, -n * PI]} point2={[x1 - 0.35, (n + 1) * PI]} color={C.bad} style="dashed" weight={2} />
            <Point x={x0} y={-n * PI} color={C.bad} />
            <Point x={x1} y={(n + 1) * PI} color={C.bad} />
            <Label at={[x0, -n * PI]} color={C.bad} attach="w">
              {`(${piTxt(n)}, ${piTxt(-n)})?`}
            </Label>
          </>
        )}
        <Label at={[0.9 * PI, F(0.9 * PI)]} color={C.f} attach="nw">
          F(x)
        </Label>
      </Plane>
      <Controls>
        <Slider label="n" value={n} onChange={setN} min={0} max={4} step={1} format={v => String(v)} />
        <Toggle label="Wrong idea: keep a.i's cosine values" checked={wrong} onChange={setWrong} />
        <Readouts>
          <Readout tex={`F(x) = \\sin(x) - x\\cos(x)`} />
          <Readout color={C.f} tex={`F(${piTex(n)}) = ${piTex(kStart)}`} />
          <Readout color={C.f} tex={`F(${piTex(n + 1)}) = ${piTex(kEnd)}`} />
          <Readout
            color={arrowColor}
            tex={`\\int_{${piTex(n)}}^{${piTex(n + 1)}} x\\sin(x)\\,dx = ${piTex(change)}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
