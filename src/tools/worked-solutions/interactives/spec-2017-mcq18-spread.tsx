// 2017 Specialist Exam 2 MCQ 18 — why W = 4U − 3V is MORE spread out than 4U alone. Step 1: the
// pieces 4U ~ N(20, 4²) and −3V ~ N(−24, 3²) — the minus sign flips V to the other side but its
// spread is still 3. Step 2: add them: W ~ N(−4, 5²), since variances add (16 + 9 = 25); a grey
// histogram of 4000 simulated values of 4U − 3V (fixed seed) follows the curve. Step 3: W = 5 is
// 9 above the mean, 1.8 sd, so Pr(W > 5) = Pr(Z > 1.8) ≈ 0.036 (option E). A toggle draws the
// subtracted-variance curve, sd √7 — narrower than 4U alone, and it misses the simulated data —
// giving z = 9/√7 = 9√7/7 (option A, chosen by 25%).

import { useMemo, useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Polygon, Readout, Readouts, Region, StepNav, Toggle,
  useSteps,
} from './kit'

const pdf = (x: number, m: number, s: number) => Math.exp(-((x - m) ** 2) / (2 * s * s)) / (s * Math.sqrt(2 * Math.PI))
const SD_WRONG = Math.sqrt(7)
const pW = (x: number) => pdf(x, -4, 5)
const pWrong = (x: number) => pdf(x, -4, SD_WRONG)
const p4U = (x: number) => pdf(x, 20, 4)
const pM3V = (x: number) => pdf(x, -24, 3)

// Standard normal upper tail (Abramowitz & Stegun 7.1.26 erf; error below 2e-7).
function upperTail(z: number): number {
  const x = Math.abs(z) / Math.SQRT2
  const t = 1 / (1 + 0.3275911 * x)
  const erf = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x)
  const phi = 0.5 * (1 + (z >= 0 ? erf : -erf))
  return 1 - phi
}

/** 4000 simulated values of 4U − 3V with U ~ N(5, 1), V ~ N(8, 1): a fixed seed, so the picture is
 *  the same every time. Returns the histogram outline (bins of width 1) and the sample mean/sd. */
function simulate() {
  let a = 20170218
  const rand = () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  const normal = () => Math.sqrt(-2 * Math.log(1 - rand())) * Math.cos(2 * Math.PI * rand())
  const N = 4000
  const lo = -26
  const hi = 18
  const counts = new Array(hi - lo).fill(0)
  let sum = 0
  let sumSq = 0
  for (let i = 0; i < N; i++) {
    const w = 4 * (5 + normal()) - 3 * (8 + normal())
    sum += w
    sumSq += w * w
    const b = Math.floor(w - lo)
    if (b >= 0 && b < counts.length) counts[b]++
  }
  const pts: [number, number][] = [[lo, 0]]
  counts.forEach((c, i) => {
    const h = c / N
    pts.push([lo + i, h], [lo + i + 1, h])
  })
  pts.push([hi, 0])
  const mean = sum / N
  return { pts, mean, sd: Math.sqrt(sumSq / N - mean * mean) }
}

export default function SpreadOfW() {
  const { step, next, back } = useSteps(3)
  const [wrong, setWrong] = useState(false)
  const sim = useMemo(simulate, [])
  const showWrong = wrong && step >= 1

  let notice
  if (step === 0) {
    notice = (
      <Notice>
        Multiplying <M>U</M> by 4 stretches its spread by 4, so <M>{'\\text{sd}(4U)=4'}</M>. Multiplying <M>V</M> by{' '}
        <M>-3</M> flips it to the negative side <b>and</b> stretches it by 3, so <M>{'\\text{sd}(-3V)=3'}</M>. The minus
        sign moves the curve; it can&apos;t make a spread negative. Press Next to add the two pieces.
      </Notice>
    )
  } else if (step === 1 && !showWrong) {
    notice = (
      <Notice>
        Adding two <b>independent</b> random amounts adds their variances: <M>{'4^2+3^2=25'}</M>, so{' '}
        <M>{'\\text{sd}(W)=5'}</M>, wider than either piece. The grey histogram is 4000 simulated values of{' '}
        <M>4U-3V</M>, and it follows the violet curve. Turn on the toggle to test the subtracted-variance curve against it.
      </Notice>
    )
  } else if (step === 1) {
    notice = (
      <Notice tone="warn">
        Subtracting gives <M>{'\\text{Var}=16-9=7'}</M>, <M>{'\\text{sd}=\\sqrt7\\approx2.65'}</M>, narrower than{' '}
        <M>4U</M> on its own (sd 4). Adding a second independent random quantity can&apos;t make <M>W</M> less variable:
        the randomness in <M>V</M> adds to the randomness in <M>U</M>; on average it can&apos;t cancel it out. The simulated values plainly
        don&apos;t fit the red curve.
      </Notice>
    )
  } else if (!showWrong) {
    notice = (
      <Notice tone="good">
        <M>W=5</M> is <M>{'5-(-4)=9'}</M> above the mean, which is <M>{'9\\div5=1.8'}</M> standard deviations. So{' '}
        <M>{'\\Pr(W>5)=\\Pr(Z>1.8)\\approx0.036'}</M>: option E. Taking <M>{'\\mathrm{E}(W)=+4'}</M> would put 5 only{' '}
        <M>{'0.2'}</M> sd above the mean, which is option D.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        With the subtracted variance, <M>{'z=\\frac{9}{\\sqrt7}=\\frac{9\\sqrt7}{7}\\approx3.40'}</M>: option A, chosen by
        25%. Its red tail is almost nothing (about <M>0.0003</M>) against the true violet tail of about{' '}
        <M>0.036</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[-34, 32]}
        y={[0, 0.16]}
        xStep={4}
        yStep={0.04}
        height={300}
        xLabel="w"
        yLabel=""
        xLabels={v => (Math.round(v) % 8 === 0 && Math.abs(v) <= 32 ? String(Math.round(v)) : '')}
        yLabels={false}
      >
        {step >= 1 && <Polygon points={sim.pts} color={C.guide} fillOpacity={0.3} weight={1} />}
        {step === 2 && <Region top={pW} bottom={() => 0} from={5} to={32} color={C.violet} opacity={0.4} />}
        {step === 2 && showWrong && <Region top={pWrong} bottom={() => 0} from={5} to={32} color={C.bad} opacity={0.5} />}
        {step <= 1 && (
          <>
            <Plot.OfX y={p4U} domain={[4, 32]} color={C.f} weight={step === 0 ? 3 : 2} style={step === 0 ? 'solid' : 'dashed'} />
            <Plot.OfX y={pM3V} domain={[-34, -14]} color={C.g} weight={step === 0 ? 3 : 2} style={step === 0 ? 'solid' : 'dashed'} />
            <Label at={[20, p4U(20)]} attach="n" color={C.f}>4U: sd 4</Label>
            <Label at={[-24, pM3V(-24)]} attach="n" color={C.g}>−3V: sd 3</Label>
          </>
        )}
        {step >= 1 && (
          <>
            <Plot.OfX y={pW} domain={[-26, 18]} color={C.violet} weight={3} />
            <Label at={[2, pW(2)]} attach="ne" color={C.violet}>W: sd 5</Label>
          </>
        )}
        {showWrong && (
          <>
            <Plot.OfX y={pWrong} domain={[-16, 8]} color={C.bad} weight={2.5} />
            <Label at={[-2, 0.13]} attach="e" color={C.bad}>sd √7 ✗</Label>
          </>
        )}
        {step === 2 && (
          <>
            <Line.Segment point1={[5, 0]} point2={[5, 0.11]} color={C.ink} style="dashed" weight={1.5} />
            <Label at={[5, 0.11]} attach="e">w = 5</Label>
            <Line.Segment point1={[-4, 0]} point2={[-4, pW(-4)]} color={C.violet} style="dashed" weight={1.5} />
          </>
        )}
      </Plane>
      <Controls>
        <Buttons>
          <StepNav step={step} count={3} onBack={back} onNext={next} />
          {step >= 1 && <Toggle label="Subtract the variances (25% chose A)" checked={wrong} onChange={setWrong} />}
        </Buttons>
        <Readouts>
          {step === 0 && (
            <>
              <Readout color={C.f} tex={'\\mathrm{E}(4U)=20,\\ \\text{sd}=4'} />
              <Readout color={C.g} tex={'\\mathrm{E}(-3V)=-24,\\ \\text{sd}=3'} />
            </>
          )}
          {step === 1 && (
            <>
              <Readout color={C.violet} tex={'\\mathrm{E}(W)=20-24=-4,\\ \\text{sd}=\\sqrt{16+9}=5'} />
              <Readout color={C.guide} tex={`\\text{simulated: mean}\\approx${sim.mean.toFixed(1)},\\ \\text{sd}\\approx${sim.sd.toFixed(1)}`} />
            </>
          )}
          {step === 2 && (
            <>
              <Readout color={C.violet} tex={`z=\\tfrac{5-(-4)}{5}=1.8,\\ \\Pr(Z>1.8)\\approx${upperTail(1.8).toFixed(3)}`} />
              {showWrong && (
                <Readout color={C.bad} tex={`z=\\tfrac{9}{\\sqrt7}\\approx${(9 / SD_WRONG).toFixed(2)},\\ \\Pr\\approx${upperTail(9 / SD_WRONG).toFixed(4)}`} />
              )}
            </>
          )}
          {step === 1 && showWrong && <Readout color={C.bad} tex={'\\text{sd}=\\sqrt{16-9}=\\sqrt7\\approx2.65'} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
