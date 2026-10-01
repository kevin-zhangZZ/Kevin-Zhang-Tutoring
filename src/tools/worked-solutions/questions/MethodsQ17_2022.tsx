// 2022 Mathematical Methods — Exam 2, MCQ 17. VCAA examination report: 39% correct. What a
// positive average rate of change combined with a negative instantaneous rate of change at
// the midpoint implies about a function. Question text transcribed from the original paper.
// Solution is original.
// Interactive: meth-2022-mcq17-try-one-to-one (drag five points shaping a continuous g; while the
// chord rises and the midpoint tangent falls, a horizontal line always meets the graph twice).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import reportGraphSrc from './meth-2022-mcq17-report-graph.png'

const TryWidget = lazyWidget(() => import('../interactives/meth-2022-mcq17-try-one-to-one'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 39, B: 25, C: 16, D: 11, E: 8 },
  answer: 'A',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="\dfrac{g(b)-g(a)}{b-a}>0,\ g(b)>g(a)" />
      <br />
      <Katex tex="g'(x)<0" /> at <Katex tex="x=\dfrac{a+b}{2}" />
      <br />
      <Katex tex="g" /> is a many-to-one function.
      <br />
      An example is shown below using <Katex tex="g(x)=(x-1)(x-2)(x-2.5)" />.
      <br />
      Let <Katex tex="a" /> = 1 and <Katex tex="b" /> = 3. The average rate of change is 0.5.
      <br />
      The gradient at <Katex tex="x" /> = 2 is negative.
      <br />
      So, <Katex tex="g" /> is a many-to-one function.
      <img src={reportGraphSrc} alt="The report's example: g(x) = (x − 1)(x − 2)(x − 5/2) and the chord y = ½(x − 1) from (1, 0) to (3, 1)" className="w-full max-w-[360px] mt-1" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\frac{g(b)-g(a)}{b-a} > 0,\quad b-a>0" />
        <Katex display tex="\therefore\ g(b) > g(a)" />
      </>
    ),
    reason: (
      <>
        The average rate of change is the gradient of the chord from <Katex tex="x=a" /> to <Katex tex="x=b" />. Since{' '}
        <Katex tex="b>a" />, the denominator is positive, so the numerator must be too: <Katex tex="g" /> finishes
        higher than it starts.
      </>
    ),
  },
  {
    working: <Katex display tex="g'\!\left(\frac{a+b}{2}\right) < 0" />,
    reason: (
      <>
        The instantaneous rate of change is the derivative. It is negative, so at the midpoint of the interval the
        graph of <Katex tex="g" /> is heading downhill.
      </>
    ),
  },
  {
    working: <>B: <Katex tex="g" /> is a function, so it is never one-to-many ✗</>,
    reason: (
      <>
        One-to-many means one <Katex tex="x" />-value gives several <Katex tex="y" />-values, and a function never does
        that (see the Background above). So B is impossible for any function.
      </>
    ),
  },
  {
    working: (
      <div className="flex flex-col gap-1">
        <span>D: <Katex tex="g(b)>g(a)" />, so not strictly decreasing ✗</span>
        <span>E: <Katex tex="g'\!\left(\tfrac{a+b}{2}\right)<0" />, so not strictly increasing ✗</span>
      </div>
    ),
    reason: (
      <>
        A strictly decreasing function would finish lower than it started. A strictly increasing function never heads
        downhill, so its gradient is never negative.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex tex="g" /> heads downhill at <Katex tex="x=\tfrac{a+b}{2}" /> but finishes higher than it started, so it
        changes direction at least once. So some <Katex tex="y" />-value is reached at two different{' '}
        <Katex tex="x" />-values: C (one-to-one) ✗
      </>
    ),
    reason: (
      <>
        To end above where it started, <Katex tex="g" /> must also go uphill somewhere, so the graph turns around.
        Because <Katex tex="g" /> is continuous (no jumps), after turning it passes back through heights it has
        already reached, so a horizontal line just below a peak (or just above a dip) meets the graph twice. That
        fails the horizontal line test, so <Katex tex="g" /> cannot be one-to-one; this holds for every such{' '}
        <Katex tex="g" />, which is what &ldquo;must be&rdquo; requires.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{g \text{ is many-to-one}}" />,
    reason: (
      <>
        Matches option <b>A</b>. Option B mixes up the two terms: one-to-many describes a relation that is not a
        function at all. Options C, D and E are each ruled out above: one-to-one fails the horizontal line test,
        strictly decreasing contradicts <Katex tex="g(b)>g(a)" />, and strictly increasing contradicts the negative
        gradient at the midpoint.
      </>
    ),
  },
]

export default function MethodsQ17_2022() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A function <Katex tex="g" /> is continuous on the domain <Katex tex="x\in[a,b]" /> and has the following
            properties:
          </p>
          <ul className="list-disc pl-5 mb-2 space-y-1">
            <li>The average rate of change of <Katex tex="g" /> between <Katex tex="x=a" /> and <Katex tex="x=b" /> is positive.</li>
            <li>The instantaneous rate of change of <Katex tex="g" /> at <Katex tex="x=\dfrac{a+b}{2}" /> is negative.</li>
          </ul>
          <p>Therefore, on the interval <Katex tex="x\in[a,b]" />, the function must be</p>
        </>
      }
      options={[
        { letter: 'A', content: 'many-to-one.', isAnswer: true },
        { letter: 'B', content: 'one-to-many.' },
        { letter: 'C', content: 'one-to-one.' },
        { letter: 'D', content: 'strictly decreasing.' },
        { letter: 'E', content: 'strictly increasing.' },
      ]}
      rows={ROWS}
      background={
        <Background title="One-to-one, many-to-one and one-to-many">
          <p>
            <b>One-to-one:</b> every output comes from exactly one input. On a graph, every horizontal line meets it at
            most once.
          </p>
          <p>
            <b>Many-to-one:</b> some output comes from two or more inputs. For example, <Katex tex="y=x^2" /> gives{' '}
            <Katex tex="1" /> at both <Katex tex="x=-1" /> and <Katex tex="x=1" />. On a graph, some horizontal line
            meets it more than once.
          </p>
          <p>
            <b>One-to-many:</b> one input gives two or more outputs. For example, the circle{' '}
            <Katex tex="x^2+y^2=1" /> gives <Katex tex="y=\pm1" /> at <Katex tex="x=0" />. On a graph, some vertical
            line meets it more than once, so it is not a function. A function is always one-to-one or many-to-one.
          </p>
        </Background>
      }
      extras={
        <Explore title="Downhill at the midpoint but higher at the end: the graph must repeat a height">
          <TryWidget />
        </Explore>
      }
      examinerReport={EXAMINER}
    />
  )
}
