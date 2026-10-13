// 2014 Specialist Exam 1 Q6b — the volume is π times the area under y² = x²/(x²−4) on [3, 4].
// Part a splits that area into a unit rectangle (the "1") plus a thin strip 4/(x²−4) whose
// partial fractions integrate to logs: 1 + ln(5/3) ≈ 1.511. Toggles overlay the curves the
// report's wrong methods actually integrate: the forced cover-up A/(x−2) + B/(x+2) gives A = 1,
// B = −1, i.e. 4/(x²−4) — the strip alone, with the unit rectangle deleted; the "log of the
// denominator" answer is the antiderivative of 2x/(x²−4); forgetting to square integrates
// x/√(x²−4). Each sits below y², so each volume is too small. Values checked with sympy:
// ∫ y² = 1 + ln(5/3) ≈ 1.511 (V ≈ 4.746); ∫ 4/(x²−4) = ln(5/3) ≈ 0.511 (V ≈ 1.605);
// ∫ 2x/(x²−4) = ln(12/5) ≈ 0.875 (V ≈ 2.750); ∫ x/√(x²−4) = √12 − √5 ≈ 1.228 (V ≈ 3.858).

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Toggle } from './kit'

type Mode = 'right' | 'coverup' | 'logden' | 'unsquared'

const y2 = (x: number) => (x * x) / (x * x - 4)
const one = () => 1
const zero = () => 0
const coverup = (x: number) => 4 / (x * x - 4)
const logden = (x: number) => (2 * x) / (x * x - 4)
const unsquared = (x: number) => x / Math.sqrt(x * x - 4)

const AREA = {
  right: 1 + Math.log(5 / 3),
  coverup: Math.log(5 / 3),
  logden: Math.log(12 / 5),
  unsquared: Math.sqrt(12) - Math.sqrt(5),
}

const WRONG_TEX = {
  coverup: '\\int_3^4 \\frac{4}{x^2-4}\\,dx = \\log_e\\tfrac{5}{3}',
  logden: '\\int_3^4 \\frac{2x}{x^2-4}\\,dx = \\log_e\\tfrac{12}{5}',
  unsquared: '\\int_3^4 y\\,dx = \\sqrt{12}-\\sqrt5',
}

const WRONG_LABEL = { coverup: '4/(x²−4)', logden: '2x/(x²−4)', unsquared: 'y' }

export default function Split() {
  const [mode, setMode] = useState<Mode>('right')
  const pick = (m: Mode) => (on: boolean) => setMode(on ? m : 'right')
  const wrong = mode === 'coverup' ? coverup : mode === 'logden' ? logden : unsquared

  return (
    <div>
      <Plane x={[2.4, 4.6]} y={[0, 3]} xStep={0.5} yStep={0.5} height={320} label="Graph of y squared between x = 3 and x = 4, split at height 1">
        {mode === 'right' ? (
          <>
            <Region top={one} bottom={zero} from={3} to={4} color={C.f} opacity={0.3} />
            <Region top={y2} bottom={one} from={3} to={4} color={C.g} opacity={0.35} />
            <Label at={[3.5, 0.5]} color={C.f} attach="c">area 1</Label>
            <Label at={[3.5, 1.22]} color={C.g} attach="c">4/(x²−4)</Label>
          </>
        ) : (
          <>
            <Region top={y2} bottom={zero} from={3} to={4} color={C.guide} opacity={0.15} />
            <Region top={wrong} bottom={zero} from={3} to={4} color={C.bad} opacity={0.3} />
            <Plot.OfX y={wrong} domain={[2.45, 4.6]} color={C.bad} weight={3} />
            <Label at={mode === 'coverup' ? [3.5, coverup(3.5)] : [2.75, wrong(2.75)]} color={C.bad} attach={mode === 'coverup' ? 'n' : 'w'}>
              {WRONG_LABEL[mode]}
            </Label>
          </>
        )}
        <Line.Segment point1={[2.4, 1]} point2={[4.6, 1]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.OfX y={y2} domain={[2.45, 4.6]} color={C.f} weight={3} />
        <Label at={[2.85, 2.55]} color={C.f} attach="e">y² = x²/(x²−4)</Label>
        <Label at={[2.45, 1]} color={C.guide} attach="ne">y = 1</Label>
      </Plane>
      <Controls>
        <Buttons>
          <Toggle label="Cover-up: A/(x−2) + B/(x+2)" checked={mode === 'coverup'} onChange={pick('coverup')} />
          <Toggle label="Log of the denominator" checked={mode === 'logden'} onChange={pick('logden')} />
          <Toggle label="Forgot to square y" checked={mode === 'unsquared'} onChange={pick('unsquared')} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\int_3^4 y^2\\,dx = 1 + \\log_e\\tfrac53 \\approx ${AREA.right.toFixed(3)},\\quad V \\approx ${(Math.PI * AREA.right).toFixed(2)}`} />
          {mode !== 'right' && (
            <Readout color={C.bad} tex={`${WRONG_TEX[mode]} \\approx ${AREA[mode].toFixed(3)},\\quad V \\approx ${(Math.PI * AREA[mode]).toFixed(2)}`} />
          )}
        </Readouts>
        {mode === 'right' && (
          <Notice tone="good">
            <b>The curve never drops below <M>y = 1</M></b>, so its area is a <b>unit rectangle</b> (the{' '}
            <M>1</M> from part a) plus the thin orange strip <M>{'\\tfrac{4}{x^2-4}'}</M>, which partial fractions
            turn into logs. Now turn on &ldquo;Cover-up&rdquo; to see what the common wrong attempt integrates.
          </Notice>
        )}
        {mode === 'coverup' && (
          <Notice tone="warn">
            Forcing <M>{'\\tfrac{x^2}{x^2-4}=\\tfrac{A}{x-2}+\\tfrac{B}{x+2}'}</M> and covering up gives{' '}
            <M>{'A=1,\\ B=-1'}</M>, i.e. <M>{'\\tfrac{4}{x^2-4}'}</M> (red): <b>exactly the orange strip, with the unit
            rectangle deleted</b>. The volume drops to <M>{'\\pi\\log_e\\tfrac53'}</M>, a loss of exactly{' '}
            <M>{'\\pi'}</M>. Now try &ldquo;Log of the denominator&rdquo;.
          </Notice>
        )}
        {mode === 'logden' && (
          <Notice tone="warn">
            Writing <M>{'\\log_e(x^2-4)'}</M> straight away integrates <M>{'\\tfrac{2x}{x^2-4}'}</M> (red): the log of
            the bottom only works when the top is its derivative. The red curve falls towards <M>0</M> while{' '}
            <M>y^2</M> stays above <M>1</M>, losing about {(Math.PI * (AREA.right - AREA.logden)).toFixed(1)} cubic
            units.
          </Notice>
        )}
        {mode === 'unsquared' && (
          <Notice tone="warn">
            A disc of radius <M>y</M> has area <M>{'\\pi y^2'}</M>, so the integrand is <M>y^2</M>, not <M>y</M>. Here the
            red curve <M>y</M> sits just below <M>y^2</M> (both exceed <M>1</M>), so the wrong answer{' '}
            <M>{'\\pi(\\sqrt{12}-\\sqrt5)'}</M> even looks plausible — which is why the squaring step must be written down.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
