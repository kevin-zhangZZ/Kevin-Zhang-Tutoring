// 2022 Mathematical Methods — Exam 2, MCQ 13. VCAA examination report: 39% correct. The
// maximal domain of f(x) = ln((x+a)/(x−a)). Question text transcribed from the original
// paper. Solution is original.
// Interactive: meth-2022-mcq13-endpoints (slide x, with a = 2: f exists only where the fraction
// (x+a)/(x-a) is positive; it is 0 at x = -a and undefined at x = a, so both are asymptotes).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const EndpointsWidget = lazyWidget(() => import('../interactives/meth-2022-mcq13-endpoints'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 15, C: 39, D: 40, E: 3 },
  answer: 'C',
  comment: (
    <>
      <Katex tex="f(x)=\log_e\left(\dfrac{x+a}{x-a}\right),\ a>0" />
      <br />
      For the maximal domain solve <Katex tex="\dfrac{x+a}{x-a}>0" /> for <Katex tex="x" />.
      <br />
      The maximal domain is <Katex tex="R\setminus[-a,a]" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{x+a}{x-a} > 0" />,
    reason: (
      <>
        A log is only defined for a positive input: <Katex tex="\log_e(0)" /> and the log of a negative number are
        both undefined. So the maximal domain is every <Katex tex="x" /> that makes the fraction strictly positive.
      </>
    ),
    more: (
      <>
        Picture the graph of <Katex tex="y=\log_e(x)" />: it exists only to the right of its asymptote{' '}
        <Katex tex="x=0" /> and never touches it. On CAS,{' '}
        <Cas fn="solve">solve((x+a)/(x-a) &gt; 0, x) | a &gt; 0</Cas> gives the same intervals; the{' '}
        <Katex tex="\mid a>0" /> tells the calculator that <Katex tex="a" /> is positive.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="x+a=0 \implies x=-a" />
        <Katex display tex="x-a=0 \implies x=a" />
      </>
    ),
    reason: (
      <>
        A fraction can only change sign where its numerator or denominator is <Katex tex="0" />. These two values split
        the number line into three intervals, with <Katex tex="-a<a" /> because <Katex tex="a>0" />.
      </>
    ),
  },
  {
    working: (
      <div className="flex flex-col gap-1">
        <span><Katex tex="x<-a" />: <Katex tex="x+a<0" /> and <Katex tex="x-a<0" /> → fraction positive ✓</span>
        <span><Katex tex="-a<x<a" />: <Katex tex="x+a>0" /> but <Katex tex="x-a<0" /> → fraction negative ✗</span>
        <span><Katex tex="x>a" />: <Katex tex="x+a>0" /> and <Katex tex="x-a>0" /> → fraction positive ✓</span>
      </div>
    ),
    reason: (
      <>
        On each interval, find the sign of the numerator and of the denominator. Negative over negative is positive;
        positive over negative is negative.
      </>
    ),
    more: (
      <>
        A quicker way to the same signs: <Katex tex="\dfrac{x+a}{x-a}" /> and <Katex tex="(x+a)(x-a)" /> always have
        the same sign (for <Katex tex="x\neq a" />), and <Katex tex="y=(x+a)(x-a)" /> is an upright parabola with{' '}
        <Katex tex="x" />-intercepts <Katex tex="\pm a" />. It is positive outside its intercepts and negative between
        them.
      </>
    ),
  },
  {
    working: (
      <div className="flex flex-col gap-1">
        <span><Katex tex="x=-a" />: <Katex tex="\dfrac{0}{-2a}=0" /> ✗</span>
        <span><Katex tex="x=a" />: <Katex tex="\dfrac{2a}{0}" /> undefined ✗</span>
      </div>
    ),
    reason: (
      <>
        Check the two endpoints separately. At <Katex tex="x=-a" /> the fraction is <Katex tex="0" />, and{' '}
        <Katex tex="\log_e(0)" /> is undefined. At <Katex tex="x=a" /> the denominator is <Katex tex="0" />, so the
        fraction is undefined. So neither endpoint is in the domain.
      </>
    ),
    more: (
      <>
        On the graph, both endpoints are vertical asymptotes. As <Katex tex="x" /> approaches <Katex tex="-a" /> from
        the left, the fraction shrinks towards <Katex tex="0" /> and <Katex tex="f(x)\to-\infty" />. As{' '}
        <Katex tex="x" /> approaches <Katex tex="a" /> from the right, the fraction grows without bound and{' '}
        <Katex tex="f(x)\to\infty" />. The graph gets ever closer to <Katex tex="x=\pm a" /> but never touches
        either line. The diagram below lets you slide <Katex tex="x" /> up to each endpoint and watch this.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{(-\infty,-a)\cup(a,\infty) = R\setminus[-a,a]}" />,
    reason: (
      <>
        Matches option <b>C</b>: the square brackets mean <Katex tex="\pm a" /> are removed too.
      </>
    ),
    more: (
      <>
        In <Katex tex="R\setminus S" />, the brackets belong to the set <Katex tex="S" /> being <em>removed</em>, not
        to the domain that is left. The endpoints <Katex tex="\pm a" /> must go, so they must be inside the removed
        set: square brackets, <Katex tex="[-a,a]" />. Option D, <Katex tex="R\setminus(-a,a)" />, removes only the
        numbers strictly between <Katex tex="-a" /> and <Katex tex="a" />, so it keeps <Katex tex="x=\pm a" />, where{' '}
        <Katex tex="f" /> is undefined. It was the most popular answer (40%), ahead of C. Option B,{' '}
        <Katex tex="(-a,a)" />, is the interval where the fraction is negative: where <Katex tex="f" /> does{' '}
        <em>not</em> exist. Option A, <Katex tex="[-a,a]" />, is the set that has to be removed, not the domain.
        Option E, <Katex tex="R" />, ignores the restriction altogether.
      </>
    ),
  },
]

export default function MethodsQ13_2022() {
  return (
    <MCQShell
      question={
        <p>
          The function <Katex tex="f(x)=\log_e\!\left(\dfrac{x+a}{x-a}\right)" />, where <Katex tex="a" /> is a
          positive real constant, has the maximal domain
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="[-a,a]" /> },
        { letter: 'B', content: <Katex tex="(-a,a)" /> },
        { letter: 'C', content: <Katex tex="R\setminus[-a,a]" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="R\setminus(-a,a)" /> },
        { letter: 'E', content: <Katex tex="R" /> },
      ]}
      rows={ROWS}
      extras={
        <Explore title="Both ends are asymptotes: why ±a is left out of the domain">
          <EndpointsWidget />
        </Explore>
      }
      examinerReport={EXAMINER}
    />
  )
}
