// 2018 Specialist Mathematics — Exam 2, MCQ 2. VCAA examination report: 60% correct. The
// maximal domain of 1/√(arcsin(cx+d)). Question text transcribed from the original paper;
// VCAA printed no diagram and neither does the stem here (guide §7). Solution is original.
// Interactive (extras): spec-2018-mcq2-layers — drag x through the layers u = cx + d → sin⁻¹ →
// √ → 1/√ and see where each fails; a toggle shows option C's extra left half. WrongMethods for
// C (23%) and A (10%), each computed to give exactly that option.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const LayersWidget = lazyWidget(() => import('../interactives/spec-2018-mcq2-layers'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 60, C: 23, D: 7, E: 0 },
  answer: 'B',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \frac{1}{\sqrt{\sin^{-1}(cx+d)}}" />,
    reason: (
      <>
        How do I know what to check? Read <Katex tex="f" /> from the inside out and ask what each layer needs:{' '}
        <Katex tex="\sin^{-1}" /> needs an input it accepts, the square root needs something non-negative, and the
        fraction needs a non-zero denominator. An <Katex tex="x" /> is in the domain only if it survives <em>all</em>{' '}
        three.
      </>
    ),
  },
  {
    working: <Katex display tex="-1 \le cx+d \le 1" />,
    reason: <>Layer 1: the domain of <Katex tex="\sin^{-1}" /> is <Katex tex="[-1,1]" />.</>,
  },
  {
    working: <Katex display tex="\sin^{-1}(cx+d) > 0" />,
    reason: (
      <>
        Layers 2 and 3 together: the square root needs <Katex tex="\sin^{-1}(cx+d)\ge0" />, and because it sits in a
        denominator it cannot be <Katex tex="0" /> either. &ldquo;<Katex tex="\ge0" /> and <Katex tex="\ne0" />&rdquo; is{' '}
        <Katex tex="{}>0" />, strictly.
      </>
    ),
  },
  {
    working: <Katex display tex="\sin^{-1}(u) > 0 \iff 0 < u \le 1" />,
    reason: (
      <>
        Picture the graph of <Katex tex="\sin^{-1}" />: increasing, through the origin, so it is below the axis for{' '}
        <Katex tex="u<0" /> and above it for <Katex tex="u>0" />. Positive outputs come exactly from positive inputs —
        and inputs can still go no higher than <Katex tex="1" />.
      </>
    ),
  },
  {
    working: <Katex display tex="0 < cx+d \le 1" />,
    reason: (
      <>
        Combining the layers: <Katex tex="u>0" /> replaces the lower bound <Katex tex="-1" />, and the upper bound{' '}
        <Katex tex="1" /> survives. The lower end is open (the denominator would be <Katex tex="0" />); the upper end is
        closed, since <Katex tex="f=\tfrac{1}{\sqrt{\pi/2}}" /> there is perfectly fine.
      </>
    ),
  },
  {
    working: <Katex display tex="-d < cx \le 1-d \implies -\frac{d}{c} < x \le \frac{1-d}{c}" />,
    reason: (
      <>
        Subtract <Katex tex="d" />, then divide by <Katex tex="c" />. The inequality signs keep their direction because{' '}
        <Katex tex="c>0" /> — that condition is in the question for exactly this reason.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{-\frac{d}{c} < x \le \frac{1-d}{c}}" />,
    reason: (
      <>
        Matches option <b>B</b>. Option <b>C</b> keeps only layer 1, the domain of <Katex tex="\sin^{-1}" />; option{' '}
        <b>A</b> keeps only the <Katex tex="{}>0" /> condition and forgets that <Katex tex="\sin^{-1}" /> stops at an
        input of <Katex tex="1" />.
      </>
    ),
  },
]

export default function SpecialistQ2_2018() {
  return (
    <MCQShell
      question={
        <p>
          Consider the function <Katex tex="f" /> with rule{' '}
          <Katex tex="f(x)=\dfrac{1}{\sqrt{\sin^{-1}(cx+d)}}" />, where{' '}
          <Katex tex="c,d\in R" /> and <Katex tex="c>0" />. The domain of{' '}
          <Katex tex="f" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="x>-\dfrac{d}{c}" /> },
        { letter: 'B', content: <Katex tex="-\dfrac{d}{c}<x\le\dfrac{1-d}{c}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\dfrac{-1-d}{c}\le x\le\dfrac{1-d}{c}" /> },
        { letter: 'D', content: <Katex tex="x\in R\setminus\left\{-\dfrac{d}{c}\right\}" /> },
        { letter: 'E', content: <Katex tex="x\in R" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="Stack the restrictions">
          <p>
            Composite functions like this one restrict the domain in layers, and every layer
            counts. Work from the inside out: what does <Katex tex="\sin^{-1}" /> need, then
            what does the square root need, then what does the fraction need.
          </p>
          <p>
            The last two combine into one strict inequality. A square root wants{' '}
            <Katex tex="\ge0" />, a denominator wants <Katex tex="\ne0" />, so together they
            want <Katex tex="{}>0" />. Imposing only the <Katex tex="\sin^{-1}" /> condition
            gives option C — the choice of almost a quarter of the state.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="Push an x through every layer of f">
            <LayersWidget />
          </Explore>
          <WrongMethod
            title="sin⁻¹ only works on [−1, 1], so that's the domain"
            source="23% chose C"
            working={<Katex display tex="-1\le cx+d\le1 \implies \frac{-1-d}{c}\le x\le\frac{1-d}{c}" />}
          >
            That is only the innermost layer. For <Katex tex="-1\le cx+d<0" />, <Katex tex="\sin^{-1}" /> gives a
            negative number, which has no real square root — so the whole left half of this interval is lost, and at{' '}
            <Katex tex="cx+d=0" /> the denominator is zero. After finding a domain, test one <Katex tex="x" /> from each
            piece in the full rule: here <Katex tex="cx+d=-\tfrac12" /> gives{' '}
            <Katex tex="\sqrt{-\pi/6}" />, which fails.
          </WrongMethod>
          <WrongMethod
            title="The root and the denominator need sin⁻¹(cx + d) > 0, so cx + d > 0"
            source="10% chose A"
            working={<Katex display tex="cx+d>0 \implies x>-\frac{d}{c}" />}
          >
            Right condition, missing ceiling: <Katex tex="\sin^{-1}" /> only accepts inputs up to <Katex tex="1" />, so{' '}
            <Katex tex="cx+d" /> cannot keep growing. Every layer adds its own restriction — including the innermost one.
          </WrongMethod>
        </>
      }
    />
  )
}
