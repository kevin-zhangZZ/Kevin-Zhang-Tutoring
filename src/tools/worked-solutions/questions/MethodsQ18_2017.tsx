// 2017 Mathematical Methods — Exam 2, MCQ 18. VCAA examination report: 38% correct.
// Smallest binomial n so that "mean = standard deviation" forces p below a threshold.
// Question text transcribed from the original paper; solution is original.
// Interactive: "Mean = sd ties p to n" (interactives/meth-2017-mcq18-curve.tsx) — the curve
// p = 1/(n + 1) against the line p = 0.01, with readouts showing mean and sd really are equal,
// and a zoom on n = 94…104 where 98 (option C) sits just above the line and 99 lands on it.
// No WrongMethod: no slip that produces 37, 49, 98 or 101 could be verified.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const CurveWidget = lazyWidget(() => import('../interactives/meth-2017-mcq18-curve'))

const EXAMINER_COMMENT = (
  <>
    <Katex tex="np=\sqrt{np(1-p)}" />
    <br />
    <Katex tex="n^2p^2=np(1-p)" />
    <br />
    <Katex tex="np(np-1+p)=0,\ np\ne0" />
    <br />
    <Katex tex="np=1-p,\ p=\dfrac{1}{n+1}" />
    <br />
    <Katex tex="\dfrac{1}{n+1}\le0.01,\ n\ge99" />
  </>
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 16, C: 25, D: 38, E: 9 },
  answer: 'D',
  noAnswer: 2,
  comment: EXAMINER_COMMENT,
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="X \sim \mathrm{Bi}(n,p)" />
        <Katex display tex="\mathrm{E}(X)=np, \qquad \mathrm{sd}(X)=\sqrt{np(1-p)}" />
      </>
    ),
    reason: (
      <>
        The binomial mean and standard deviation from the formula sheet. The question links them (mean = sd) and puts a
        condition on <Katex tex="p" />, so write both in terms of <Katex tex="n" /> and <Katex tex="p" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="np = \sqrt{np(1-p)}" />
        <Katex display tex="\implies\; n^2p^2 = np(1-p)" />
      </>
    ),
    reason: (
      <>
        Set the mean equal to the standard deviation, then square both sides to clear the root. Both sides are positive,
        so squaring adds no extra solutions.
      </>
    ),
  },
  {
    working: <Katex display tex="np = 1-p" />,
    reason: (
      <>
        Divide both sides by <Katex tex="np" /> (valid since <Katex tex="0<p<1" /> and <Katex tex="n\ge1" />, so{' '}
        <Katex tex="np\ne0" />). This says the mean is <Katex tex="1-p" />, always just under <Katex tex="1" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="np+p = 1 \;\implies\; p(n+1)=1" />
        <Katex display tex="\implies\; p = \frac{1}{n+1}" />
      </>
    ),
    reason: (
      <>
        Collect the <Katex tex="p" /> terms and factorise to make <Katex tex="p" /> the subject. So each <Katex tex="n" />{' '}
        allows exactly one <Katex tex="p" />, and more trials force a smaller <Katex tex="p" />.
      </>
    ),
    more: (
      <>
        Slide <Katex tex="n" /> in the graph below.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="p \le 0.01 \;\implies\; \frac{1}{n+1} \le 0.01" />
        <Katex display tex="\implies\; n+1 \ge 100 \implies n \ge 99" />
      </>
    ),
    reason: (
      <>
        Taking reciprocals of positive quantities flips the inequality: a smaller <Katex tex="p" /> needs a larger{' '}
        <Katex tex="n+1" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{n=99}" />,
    reason: (
      <>
        Matches option <b>D</b>. Check the neighbour: <Katex tex="n=98" /> (option C) gives{' '}
        <Katex tex="p=\tfrac1{99}\approx0.0101>0.01" />, which fails, while <Katex tex="n=99" /> gives{' '}
        <Katex tex="p=0.01" /> exactly, which <Katex tex="\le" /> allows.
      </>
    ),
  },
]

export default function MethodsQ18_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Let <Katex tex="X" /> be a discrete random variable with binomial distribution{' '}
            <Katex tex="X \sim \mathrm{Bi}(n,p)" />. The mean and the standard deviation of this
            distribution are equal.
          </p>
          <p>
            Given that <Katex tex="0&lt;p&lt;1" />, the smallest number of trials, <Katex tex="n" />, such
            that <Katex tex="p \le 0.01" /> is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="37" /> },
        { letter: 'B', content: <Katex tex="49" /> },
        { letter: 'C', content: <Katex tex="98" /> },
        { letter: 'D', content: <Katex tex="99" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="101" /> },
      ]}
      background={
        <Background title="Mean and standard deviation of a binomial">
          <p>
            For <Katex tex="X\sim\mathrm{Bi}(n,p)" />, <Katex tex="\mathrm{E}(X)=np" /> and{' '}
            <Katex tex="\mathrm{sd}(X)=\sqrt{np(1-p)}" />. Both depend on <Katex tex="n" /> and <Katex tex="p" />, so a
            condition connecting them, like &ldquo;the mean equals the standard deviation&rdquo;, is one equation linking{' '}
            <Katex tex="n" /> and <Katex tex="p" />: solve it for <Katex tex="p" /> in terms of <Katex tex="n" />.
          </p>
        </Background>
      }
      rows={ROWS}
      extras={
        <Explore title="Mean = sd ties p to n: p = 1/(n + 1)">
          <CurveWidget />
        </Explore>
      }
      examinerReport={EXAMINER}
    />
  )
}
