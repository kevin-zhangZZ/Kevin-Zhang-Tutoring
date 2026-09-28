// 2017 Specialist Mathematics — Exam 2, MCQ 1. VCAA examination report: 75% correct.
// Implied domain of 2arccos(1/x). Question text transcribed from the original paper;
// solution is original. Answer C agrees with the report and itute.
// Widget: interactives/spec-2017-mcq1-band.tsx — drag x and watch y = 1/x enter the band
// −1 ≤ y ≤ 1 only when |x| ≥ 1; a toggle shades option E's [−1, 1] and shows 1/x leaving the band.
// WrongMethod: option E (12%) — the [−1, 1] restriction applied to x instead of to 1/x.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const BandWidget = lazyWidget(() => import('../interactives/spec-2017-mcq1-band'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 1, B: 8, C: 75, D: 4, E: 12 },
  answer: 'C',
  noAnswer: 0,
  comment: (
    <>
      <Katex tex="-1\le\tfrac1x\le1 \implies x\in(-\infty,-1]\cup[1,\infty)" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="-1\le\frac1x\le1" />,
    reason: (
      <>
        <Katex tex="f" /> is a composite: <Katex tex="\cos^{-1}" /> applied to <Katex tex="\tfrac1x" />. For a
        composite, the inside&apos;s output must be something the outside accepts, and{' '}
        <Katex tex="\cos^{-1}" /> only accepts inputs in <Katex tex="[-1,1]" />. So it is{' '}
        <Katex tex="\tfrac1x" />, not <Katex tex="x" />, that must land in <Katex tex="[-1,1]" />. The outer factor
        of <Katex tex="2" /> only stretches the graph; it can&apos;t change which <Katex tex="x" /> are allowed.
      </>
    ),
  },
  {
    working: <Katex display tex="\left|\frac1x\right|\le1" />,
    reason: <>The same double inequality in one line. The modulus form saves splitting into positive and negative <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\frac{1}{|x|}\le1 \;\implies\; 1\le|x|" />,
    reason: (
      <>
        <Katex tex="|x|" /> is positive, so multiplying both sides by it keeps the direction. Don&apos;t multiply{' '}
        <Katex tex="-1\le\tfrac1x\le1" /> through by <Katex tex="x" /> itself: its sign is unknown, and for negative{' '}
        <Katex tex="x" /> both inequalities would flip. Sense check: <Katex tex="1" /> divided by a small number is
        big, so it is the <em>small</em> <Katex tex="x" /> that must go.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{(-\infty,-1]\cup[1,\infty)}" />,
    reason: (
      <>
        Matches option <b>C</b>. Option E is the <Katex tex="[-1,1]" /> restriction applied to <Katex tex="x" />{' '}
        instead of to <Katex tex="\tfrac1x" /> (see below). <Katex tex="x=0" /> needs no separate exclusion, since{' '}
        <Katex tex="|0|\ge1" /> is false. Spot-check: <Katex tex="x=2" /> gives{' '}
        <Katex tex="2\cos^{-1}(0.5)=\tfrac{2\pi}{3}" />, fine; <Katex tex="x=0.5" /> gives{' '}
        <Katex tex="\cos^{-1}(2)" />, undefined.
      </>
    ),
  },
]

export default function SpecialistQ1_2017() {
  return (
    <MCQShell
      question={
        <p>
          The implied domain of{' '}
          <Katex tex="f(x)=2\cos^{-1}\!\left(\dfrac1x\right)" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="R" /> },
        { letter: 'B', content: <Katex tex="[-1,1]" /> },
        { letter: 'C', content: <Katex tex="(-\infty,-1]\cup[1,\infty)" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="R\setminus\{0\}" /> },
        { letter: 'E', content: <Katex tex="[-1,1]\setminus\{0\}" /> },
      ]}
      rows={ROWS}
      background={
        <Background title="The domain of a composite function">
          <p>
            The implied domain is every <Katex tex="x" /> for which the rule gives a real value. For a composite{' '}
            <Katex tex="f(g(x))" />, each <Katex tex="x" /> has to pass two checks: <Katex tex="x" /> is in the
            domain of <Katex tex="g" />, <em>and</em> the output <Katex tex="g(x)" /> is in the domain of{' '}
            <Katex tex="f" />. Here <Katex tex="g(x)=\tfrac1x" /> needs <Katex tex="x\ne0" />, and{' '}
            <Katex tex="\cos^{-1}" /> needs its input in <Katex tex="[-1,1]" />.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="1/x lands inside cos⁻¹'s band only when |x| ≥ 1">
            <BandWidget />
          </Explore>
          <WrongMethod
            title="cos⁻¹ only works on [−1, 1], so x must be in [−1, 1], but not 0 because of the 1/x"
            source="12% chose E"
            working={
              <>
                <Katex display tex="x\in[-1,1]\setminus\{0\}" />
                <Katex display tex="x=\tfrac12:\ \cos^{-1}(2)\ \text{undefined}" />
              </>
            }
          >
            The <Katex tex="[-1,1]" /> rule is about whatever sits <em>inside</em> <Katex tex="\cos^{-1}" />, which
            here is <Katex tex="\tfrac1x" />, not <Katex tex="x" />. Applying it to <Katex tex="x" /> gives exactly
            the wrong set: for every <Katex tex="x" /> strictly between <Katex tex="-1" /> and <Katex tex="1" />{' '}
            (other than 0), <Katex tex="\left|\tfrac1x\right|>1" />. To catch it, test one value from your answer
            in the original rule: <Katex tex="x=\tfrac12" /> fails straight away.
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
