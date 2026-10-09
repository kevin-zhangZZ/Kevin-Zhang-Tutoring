// 2018 Specialist Mathematics — Exam 2, MCQ 7. VCAA examination report: 78% correct (no
// comment printed for this question). The length of a parametric curve. Question text
// transcribed from the original paper; VCAA printed no diagram and neither does the stem here
// (guide §7). Value checked numerically in scipy (12.1944); itute and the NBEASTK walkthrough
// agree (C). Distractors verified numerically: D (12%) is the same integral with the calculator
// in degree mode (12.491); B (5%) drops the chain-rule 2 from dx/dt (9.508); A (4%) puts x and y
// in the formula instead of their derivatives (9.182). E (38.3) is numerically π × 12.19, but no
// plausible student slip produces it, so it is not named in the solution.
// Widget: spec-2018-mcq7-chords (arc length as a sum of chord hypotenuses, with a toggle that
// draws the narrower curve option B actually measures). WrongMethod: degree mode (D), missing
// chain-rule 2 (B). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const ChordsWidget = lazyWidget(() => import('../interactives/spec-2018-mcq7-chords'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 5, C: 78, D: 12, E: 1 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="L = \int_{t_1}^{t_2}\sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2}\,dt" />,
    reason: (
      <>
        &ldquo;Length of the curve&rdquo; with <Katex tex="x" /> and <Katex tex="y" /> both given in terms
        of <Katex tex="t" /> means the parametric arc-length formula. It is Pythagoras on a tiny scale: in a
        short time <Katex tex="\Delta t" /> the point moves <Katex tex="\Delta x" /> across and{' '}
        <Katex tex="\Delta y" /> up, so it travels <Katex tex="\sqrt{\Delta x^2+\Delta y^2}" />, and adding
        up those little hypotenuses is the integral.
      </>
    ),
    more: <>See the interactive below.</>,
  },
  {
    working: <Katex display tex="\frac{dx}{dt} = 2\cos(2t), \qquad \frac{dy}{dt} = -2\sin(t)" />,
    reason: (
      <>
        The chain rule on <Katex tex="\sin(2t)" /> brings out a <Katex tex="2" />, and{' '}
        <Katex tex="2\cos(t)" /> differentiates to <Katex tex="-2\sin(t)" />. That first <Katex tex="2" /> is
        the easy one to drop, and dropping it changes the answer to option <b>B</b>.
      </>
    ),
  },
  {
    working: <Katex display tex="L = \int_0^{2\pi}\sqrt{4\cos^2(2t)+4\sin^2(t)}\,dt" />,
    reason: (
      <>
        Substitute into the formula. Nothing under the root simplifies to a perfect square, so there is no
        antiderivative to find by hand. That is what &ldquo;closest to&rdquo; is telling you: evaluate it
        numerically.
      </>
    ),
  },
  {
    working: <Cas fn="nInt">nInt(√(4cos(2t)^2+4sin(t)^2), t, 0, 2π)</Cas>,
    reason: (
      <>
        Check the calculator is in <b>radian</b> mode first. The derivatives above are only true with{' '}
        <Katex tex="t" /> in radians, and degree mode gives option <b>D</b>. Use the full interval{' '}
        <Katex tex="[0,2\pi]" /> from the question, which traces the figure-eight exactly once.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{L \approx 12.1944 \approx 12.2}" />,
    reason: (
      <>
        Matches option <b>C</b>. Option <b>D</b> <Katex tex="(12.5)" />, chosen by <Katex tex="12\%" />, is
        the same integral with the calculator in degree mode (<Katex tex="12.49" />). Option <b>B</b>{' '}
        <Katex tex="(9.5)" /> uses <Katex tex="\tfrac{dx}{dt}=\cos(2t)" />, forgetting the chain-rule{' '}
        <Katex tex="2" /> (<Katex tex="9.51" />). Option <b>A</b> <Katex tex="(9.2)" /> puts{' '}
        <Katex tex="x" /> and <Katex tex="y" /> under the root instead of their derivatives (
        <Katex tex="9.18" />).
      </>
    ),
  },
]

export default function SpecialistQ7_2018() {
  return (
    <MCQShell
      question={
        <p>
          A curve is described parametrically by <Katex tex="x=\sin(2t)" />,{' '}
          <Katex tex="y=2\cos(t)" /> for <Katex tex="0\le t\le2\pi" />. The length of the
          curve is closest to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="9.2" /> },
        { letter: 'B', content: <Katex tex="9.5" /> },
        { letter: 'C', content: <Katex tex="12.2" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="12.5" /> },
        { letter: 'E', content: <Katex tex="38.3" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background>
          <p>
            Arc length adds up the distance the point actually travels. Over a small time step{' '}
            <Katex tex="\Delta t" /> the point moves along a short, almost straight piece of the curve whose
            length is
          </p>
          <Katex
            display
            tex="\sqrt{\Delta x^2+\Delta y^2}=\sqrt{\left(\tfrac{\Delta x}{\Delta t}\right)^2+\left(\tfrac{\Delta y}{\Delta t}\right)^2}\,\Delta t"
          />
          <p>
            As <Katex tex="\Delta t\to0" /> the fractions become <Katex tex="\tfrac{dx}{dt}" /> and{' '}
            <Katex tex="\tfrac{dy}{dt}" />, and the sum becomes the integral. Parametric arc length is
            current content; only the version for a cartesian rule <Katex tex="y=f(x)" /> was removed from
            the study design.
          </p>
          <p>
            Two of the options sit only <Katex tex="0.3" /> apart, so this question is about setting the
            integral up exactly right and then letting technology evaluate it, not about estimating. Keep
            the square root, keep the given terminals, and work in radians.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="Arc length is a sum of tiny hypotenuses">
            <ChordsWidget />
          </Explore>
          <WrongMethod
            title="Evaluate the integral without checking the calculator's angle mode"
            source="12% chose D"
            working={<Katex tex="\int_0^{2\pi}\sqrt{4\cos^2(2t^\circ)+4\sin^2(t^\circ)}\,dt\approx12.49" />}
          >
            In degree mode the calculator reads <Katex tex="t" /> from <Katex tex="0" /> to{' '}
            <Katex tex="2\pi\approx6.28" /> as degrees, a sliver of a turn. Over that sliver{' '}
            <Katex tex="\cos(2t)\approx1" /> and <Katex tex="\sin(t)\approx0" />, so the integrand sits near{' '}
            <Katex tex="2" /> the whole way and the answer comes out close to{' '}
            <Katex tex="2\times2\pi\approx12.57" />. The derivatives <Katex tex="2\cos(2t)" /> and{' '}
            <Katex tex="-2\sin(t)" /> only hold in radians. Check the mode before any calculus with trig
            functions: a near-miss like <Katex tex="12.5" /> against <Katex tex="12.2" /> won&apos;t look
            wrong on its own.
          </WrongMethod>
          <WrongMethod
            title="The derivative of sin(2t) is cos(2t)"
            source="5% chose B"
            working={<Katex tex="\int_0^{2\pi}\sqrt{\cos^2(2t)+4\sin^2(t)}\,dt\approx9.51" />}
          >
            The chain rule gives <Katex tex="\tfrac{d}{dt}\sin(2t)=2\cos(2t)" />. With the{' '}
            <Katex tex="2" /> missing, the integral is the exact length of a different curve,{' '}
            <Katex tex="x=\tfrac12\sin(2t)" />, <Katex tex="y=2\cos(t)" />, a figure-eight half as wide
            (turn on the toggle in the interactive). Catch it by differentiating the inside every time:
            the <Katex tex="2t" /> contributes its own factor of <Katex tex="2" />.
          </WrongMethod>
        </>
      }
    />
  )
}
