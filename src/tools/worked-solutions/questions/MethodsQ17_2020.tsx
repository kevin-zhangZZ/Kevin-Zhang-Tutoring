// 2020 Mathematical Methods — Exam 2, MCQ 17. VCAA examination report: 42% correct. Maximum
// possible y-intercept of a tangent line to f(x) = −ln(x + 2). Question text transcribed from
// the original paper (no diagram was given — f is defined purely algebraically). Solution is
// original. Answer C checked with sympy (c(a) = −log_e(a + 2) + a/(a + 2), dc/da = −a/(a + 2)²,
// maximum at a = 0), against the report (C, "tangent … at x = 0") and itute (C: "tangents at x ≠ 0
// have c < −log_e 2"). The working leads with the picture both video tutors (LMK, Mr Nie) use —
// slide the tangent and watch its intercept — made rigorous by concavity (f″ > 0, so every tangent
// lies below the curve; Marty Ross's "trivial via convexity"), then confirms it with calculus.
// Distractors verified: A (−1) is the tangent at the x-intercept (−1, 0); B (≈ −0.31) and E (≈ 0.69)
// exceed f(0) = −log_e 2, so no tangent reaches them (E = −f(0)); D (≈ −1.69) is reached by the
// tangents at a ≈ −1.364 and a ≈ 10.61 but is not the maximum. No clean slip was found for B (21%),
// so none is attributed.
// Interactive diagram (§15): interactives/meth-2020e2-mcq17-tangents.tsx slides the tangent along
// the curve with the gap between its intercept c and f(0) shown in red, a toggle drawing several
// tangents at once and another marking the five options on the y-axis. This site's own explanatory
// figure; VCAA printed no diagram for this question.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import { Background, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import reportGraphSrc from './meth-2020-mcq17-report-graph.png'

const TangentsWidget = lazyWidget(() => import('../interactives/meth-2020e2-mcq17-tangents'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 21, C: 42, D: 17, E: 9 },
  answer: 'C',
  noAnswer: 1,
  comment: (
    <>
      <img src={reportGraphSrc} alt="The report's graph of y = −ln(x + 2) with its vertical asymptote x = −2" className="w-full max-w-[360px] my-1" />
      The maximum value of <Katex tex="c" /> occurs when the tangent to <Katex tex="f" /> is at <Katex tex="x=0" />.{' '}
      <Katex tex="c=f(0)=-\log_e(2)" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="f(x) = -\log_e(x+2), \quad x>-2" />
        <Katex display tex="f'(x) = -\frac{1}{x+2}, \qquad f''(x) = \frac{1}{(x+2)^2} > 0" />
      </>
    ),
    reason: (
      <>
        Start with the shape. <Katex tex="-\log_e(x+2)" /> is <Katex tex="y=\log_e(x)" /> translated 2 units left and
        reflected in the <Katex tex="x" />-axis: it comes down from the asymptote <Katex tex="x=-2" />, crosses the{' '}
        <Katex tex="x" />-axis at <Katex tex="(-1,0)" /> and the <Katex tex="y" />-axis at <Katex tex="(0,-\log_e(2))" />, and
        keeps falling. <Katex tex="f''(x)" /> is a square on the bottom, so it is positive for every <Katex tex="x" />: the
        curve is concave up everywhere (it bends upwards, like the left-hand side of a ∪).
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\text{every tangent lies below the curve}" />
        <Katex display tex="\implies c \le f(0)" />
        <Katex display tex="c=f(0) \text{ only for the tangent at } x=0" />
      </>
    ),
    reason: (
      <>
        This is the idea that answers the question (see the Background above). <Katex tex="c" /> is the height where a
        tangent crosses the <Katex tex="y" />-axis, and the curve itself crosses the <Katex tex="y" />-axis at height{' '}
        <Katex tex="f(0)" />. A tangent touches a concave-up curve at one point and runs underneath it everywhere else, so
        at <Katex tex="x=0" /> it is below <Katex tex="f(0)" />, unless the point it touches is on the <Katex tex="y" />
        -axis. Drag the tangent along the curve in the diagram below and watch the red gap close only at{' '}
        <Katex tex="x=0" />.
      </>
    ),
  },
  {
    working: <Katex display tex="y = -\log_e(a+2) - \frac{1}{a+2}(x-a)" />,
    reason: (
      <>
        Now confirm it with calculus. The tangent at the point where <Katex tex="x=a" /> is{' '}
        <Katex tex="y-f(a)=f'(a)(x-a)" />, with <Katex tex="f(a)=-\log_e(a+2)" /> and{' '}
        <Katex tex="f'(a)=-\frac{1}{a+2}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="c = -\log_e(a+2) + \frac{a}{a+2}" />,
    reason: (
      <>
        The vertical axis intercept: put <Katex tex="x=0" />, so <Katex tex="-\frac{1}{a+2}(0-a)=+\frac{a}{a+2}" />. Now{' '}
        <Katex tex="c" /> is a function of <Katex tex="a" />, the point of contact, and the question wants its maximum.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\frac{dc}{da} = -\frac{1}{a+2} + \frac{2}{(a+2)^2}" />
        <Katex display tex="= \frac{-(a+2)+2}{(a+2)^2} = -\frac{a}{(a+2)^2}" />
      </>
    ),
    reason: (
      <>
        The quotient rule on <Katex tex="\frac{a}{a+2}" /> gives <Katex tex="\frac{(a+2)\times1-a\times1}{(a+2)^2}=\frac{2}{(a+2)^2}" />
        . Then put both terms over <Katex tex="(a+2)^2" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\frac{dc}{da} > 0 \ \text{ for } -2<a<0" />
        <Katex display tex="\frac{dc}{da} < 0 \ \text{ for } a>0" />
        <Katex display tex="\implies \text{maximum at } a=0" />
      </>
    ),
    reason: (
      <>
        The denominator <Katex tex="(a+2)^2" /> is positive, so <Katex tex="\frac{dc}{da}" /> has the sign of{' '}
        <Katex tex="-a" />: <Katex tex="c" /> rises as the contact point moves right towards <Katex tex="x=0" />, then falls
        once it passes it, exactly as in the diagram. (On CAS,{' '}
        <Cas fn="fMax">fMax(−ln(a + 2) + a/(a + 2), a) | a &gt; −2</Cas> gives <Katex tex="a=0" />.)
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{c = -\log_e(0+2) + 0 = -\log_e(2)}" />,
    reason: (
      <>
        Matches option <b>C</b>. Check: <Katex tex="-\log_e(2)\approx-0.69" /> is exactly <Katex tex="f(0)" />, where the
        curve itself crosses the <Katex tex="y" />-axis, as the picture said. Option <b>A</b> (<Katex tex="-1" />) is a real
        tangent&apos;s intercept, the tangent <Katex tex="y=-x-1" /> at the <Katex tex="x" />-intercept{' '}
        <Katex tex="(-1,0)" />, but a lower one. Options <b>B</b> (<Katex tex="-1+\log_e(2)\approx-0.31" />) and{' '}
        <b>E</b> (<Katex tex="\log_e(2)\approx0.69" />) are both <em>above</em> <Katex tex="f(0)" />, so no tangent can
        reach them; E is <Katex tex="f(0)" /> with its minus sign lost. Option <b>D</b> (
        <Katex tex="\approx-1.69" />) is reached by some tangents, but it is lower than <Katex tex="-\log_e(2)" />.
      </>
    ),
  },
]

export default function MethodsQ17_2020() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="f(x) = -\log_e(x+2)" />.
          <br />
          A tangent to the graph of <Katex tex="f" /> has a vertical axis intercept at <Katex tex="(0,c)" />.
          <br />
          The maximum value of <Katex tex="c" /> is
        </p>
      }
      background={
        <Background title="The Idea That Makes This Quick">
          <p>
            A curve is <b>concave up</b> where it bends upwards, like ∪; that is where <Katex tex="f''(x)>0" />. A tangent
            touches a concave-up curve at one point, and the curve bends away upwards on both sides of it, so the tangent
            lies <em>below</em> the curve everywhere else.
          </p>
          <p>
            So at any other <Katex tex="x" />, a tangent&apos;s height is less than the curve&apos;s height there. That
            turns a &ldquo;maximum intercept&rdquo; question into a picture: the highest a tangent can cross the{' '}
            <Katex tex="y" />-axis is where the curve itself crosses it.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="-1" /> },
        { letter: 'B', content: <Katex tex="-1+\log_e(2)" /> },
        { letter: 'C', content: <Katex tex="-\log_e(2)" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="-1-\log_e(2)" /> },
        { letter: 'E', content: <Katex tex="\log_e(2)" /> },
      ]}
      rows={ROWS}
      extras={
        <Explore title="Every tangent runs under this curve, so none can cross the y-axis higher than the curve does: c is largest for the tangent at x = 0">
          <TangentsWidget />
        </Explore>
      }
      examinerReport={EXAMINER}
    />
  )
}
