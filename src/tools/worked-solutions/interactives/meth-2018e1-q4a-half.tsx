// 2018 Methods Exam 1 Q4a — X ~ N(6, 2²). The vertical line x = 6 (the mean) cuts the bell into two
// mirror-image halves, so Pr(X > 6) = ½. Slide σ (or jump to σ = 4, the variance misread as σ): the
// bell gets wider or narrower but both halves stay exactly ½, which is why part a needs neither σ
// nor a calculator, and why the variance/standard deviation trap only bites in part b.
import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider, integrate } from './kit'

const MU = 6

export default function Half() {
  const [sigma, setSigma] = useState(2)
  const pdf = (x: number) => Math.exp(-((x - MU) ** 2) / (2 * sigma * sigma)) / (sigma * Math.sqrt(2 * Math.PI))
  const peak = pdf(MU)
  // Areas over (practically) the whole real line, not just the visible window.
  const below = integrate(pdf, MU - 10 * sigma, MU, 400)
  const above = integrate(pdf, MU, MU + 10 * sigma, 400)
  const isTrue = Math.abs(sigma - 2) < 0.005
  const isMisread = Math.abs(sigma - 4) < 0.005

  let notice
  if (isMisread) {
    notice = (
      <Notice tone="warn">
        <b>
          <M>\sigma = 4</M> is the variance misread as the standard deviation
        </b>{' '}
        — a wider, flatter bell than the real one. Yet the two halves are <b>still</b> <M>{'\\tfrac12'}</M> each,
        because the bell is still symmetric about <M>x = 6</M>. So this slip costs nothing in part a. In part b
        it changes the answer, because <M>7</M> is not the mean.
      </Notice>
    )
  } else if (isTrue) {
    notice = (
      <Notice tone="good">
        <b>This is the real <M>X</M>:</b> mean <M>6</M>, variance <M>4</M>, so <span className="whitespace-nowrap"><M>\sigma = 2</M>.</span> The dashed line{' '}
        <M>x = 6</M> is a mirror: the blue half is the orange half flipped over, so each has area{' '}
        <M>{'\\tfrac12'}</M>. Now slide <M>\sigma</M> and watch the readouts.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        With <M>{`\\sigma = ${sigma.toFixed(2)}`}</M> the bell is {sigma < 2 ? 'taller and narrower' : 'lower and wider'},
        but it is still a mirror image about the mean, so each side is still exactly <M>{'\\tfrac12'}</M>.
        That is why <M>{'\\Pr(X > \\mu) = \\tfrac12'}</M> for <b>every</b> normal distribution: once you see the
        cut-off is the mean, you are done.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-4, 16]} y={[0, 0.47]} xStep={2} yStep={0.1} height={260} yLabels={false} yLabel="">
        <Region top={pdf} bottom={() => 0} from={-4} to={MU} color={C.g} opacity={0.28} />
        <Region top={pdf} bottom={() => 0} from={MU} to={16} color={C.f} opacity={0.28} />
        <Plot.OfX y={pdf} domain={[-4, 16]} color={isMisread ? C.bad : C.f} weight={3} />
        <Line.Segment point1={[MU, 0]} point2={[MU, Math.max(peak + 0.03, 0.14)]} color={C.good} style="dashed" weight={2} />
        <Label at={[MU, Math.max(peak + 0.03, 0.14)]} color={C.good} attach="n" size={12}>
          x = 6
        </Label>
        <Label at={[MU - Math.min(1.1 * sigma, 3.5), Math.min(peak * 0.35, 0.09)]} color={C.g} attach="c">
          ½
        </Label>
        <Label at={[MU + Math.min(1.1 * sigma, 3.5), Math.min(peak * 0.35, 0.09)]} color={C.f} attach="c">
          ½
        </Label>
      </Plane>
      <Controls>
        <Slider label="\sigma" value={sigma} onChange={setSigma} min={1} max={4} step={0.05} />
        <Buttons>
          <ActionButton label="σ = 2 (the real X)" onClick={() => setSigma(2)} />
          <ActionButton label="σ = 4 (variance misread)" onClick={() => setSigma(4)} />
        </Buttons>
        <Readouts>
          <Readout color={C.g} tex={`\\Pr(X < 6) = ${below.toFixed(3)}`} />
          <Readout color={C.f} tex={`\\Pr(X > 6) = ${above.toFixed(3)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
