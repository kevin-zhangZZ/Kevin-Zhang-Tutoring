// 2019 Specialist Mathematics — Exam 2, MCQ 1. VCAA examination report: 72% correct. Which
// feature the graph of f(x) = eˣ/(x−1) does NOT have. Question text transcribed from the
// original paper. VCAA printed no diagram, so the question stem here has none either
// (guide §7) — the graph is this site's own explanatory figure (matplotlib) and appears
// only inside the worked solution, where it is our explanation rather than given
// information. It would give the answer away in the stem: every option is a claim about
// the shape of this curve. Solution is original.
//
// Interactive (extras): interactives/spec-2019-mcq1-walk — slide a point along the curve;
// the tangent and a sign table of f′ and f″ show the minimum at x = 2 and the change of
// concavity happening only across the asymptote x = 1; a toggle shows the TI-Nspire's
// standard window, where the whole right branch (y ≥ e² ≈ 7.39) is off-screen. The wrong-method
// box for option C (19%) uses that window as one route to the wrong answer — our own
// explanation, not the report's (the report says only that there is a local minimum at x = 2).
// Answer E confirmed with sympy (f″ has no zeros; f′ = 0 only at x = 2) and agrees with itute.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import { Cas } from '../CasRef'
import graphSrc from './spec-2019-mcq1-graph.png'

const WalkWidget = lazyWidget(() => import('../interactives/spec-2019-mcq1-walk'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 2, C: 19, D: 4, E: 72 },
  answer: 'E',
  comment: <>There is a local minimum at <Katex tex="x=2" />.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async" src={graphSrc} alt="Graph of y = eˣ/(x − 1): a left branch approaching the asymptote y = 0, passing through (0, −1) and falling to −∞ at the asymptote x = 1, and a right branch dropping from +∞ to a minimum at (2, e²) then rising — this site's own explanatory figure" className="w-full max-w-[360px]" />
      </div>
    ),
    reason: <>A &ldquo;does <b>not</b> have&rdquo; question is answered by checking the options one at a time: four will be there, and the answer is the one you can show is missing. A graph in a big enough window shows four features at once, but each still deserves a one-line algebraic check, which is what the next rows do.</>,
  },
  {
    working: <Katex display tex="\lim_{x\to-\infty}\dfrac{e^x}{x-1} = 0" />,
    reason: <><b>A — horizontal asymptote.</b> A horizontal asymptote is about the ends of the graph, so look at <Katex tex="x\to\pm\infty" />. On the left <Katex tex="e^x\to0" /> while the denominator grows without bound, so <Katex tex="y=0" /> is a horizontal asymptote there. (On the right <Katex tex="e^x" /> wins and <Katex tex="f(x)\to\infty" />, but one end is enough.) <b>Has one.</b></>,
  },
  {
    working: <Katex display tex="x-1=0 \implies x=1, \quad e^{1}\ne0" />,
    reason: <><b>B — vertical asymptote.</b> Vertical asymptotes come from where the denominator is zero. At <Katex tex="x=1" /> the numerator is <Katex tex="e\ne0" />, so the value blows up there rather than cancelling to a hole. <b>Has one.</b></>,
  },
  {
    working: (
      <>
        <Katex display tex="f'(x) = \dfrac{e^x(x-1)-e^x}{(x-1)^2} = \dfrac{e^x(x-2)}{(x-1)^2}" />
        <Katex display tex="f'(x)=0 \implies x=2" />
      </>
    ),
    reason: <><b>C — local minimum.</b> Turning points are where <Katex tex="f'(x)=0" />, so differentiate (quotient rule, or <Cas fn="derivative">d/dx(e^x/(x-1))</Cas> and factor). The denominator <Katex tex="(x-1)^2" /> is positive and <Katex tex="e^x>0" />, so <Katex tex="f'" /> takes the sign of <Katex tex="(x-2)" />: negative before <Katex tex="x=2" />, positive after. Falling then rising is a minimum, at <Katex tex="\left(2,e^2\right)\approx(2,\ 7.39)" />. <b>Has one.</b></>,
  },
  {
    working: <Katex display tex="f(0) = \dfrac{e^0}{0-1} = -1" />,
    reason: <><b>D — vertical axis intercept.</b> The graph meets the <Katex tex="y" />-axis exactly when <Katex tex="x=0" /> is in the domain. It is (the only excluded value is <Katex tex="x=1" />), so the graph crosses at <Katex tex="(0,-1)" />. <b>Has one.</b></>,
  },
  {
    working: (
      <>
        <Katex display tex="f''(x) = \dfrac{e^x\left(x^2-4x+5\right)}{(x-1)^3}" />
        <Katex display tex="x^2-4x+5 = (x-2)^2+1 > 0 \ \text{ for all } x" />
      </>
    ),
    reason: <><b>E — point of inflection.</b> Concavity is the sign of <Katex tex="f''" />, and it can only change where <Katex tex="f''" /> is zero or undefined. The numerator is never zero (its discriminant is <Katex tex="16-20<0" />), so the only candidate is <Katex tex="x=1" />, where the denominator changes sign. The concavity does change there, from concave down to concave up, but <Katex tex="x=1" /> is the asymptote, not a point on the curve. <b>No point of inflection.</b></>,
  },
  {
    working: <Katex display tex="\boxed{\text{Option E}}" />,
    reason: <>Matches option <b>E</b>, the only feature the graph lacks. Options <b>A</b>, <b>B</b> and <b>D</b> are all present, and so is <b>C</b>, the popular wrong answer: as the report notes, there is a local minimum at <Katex tex="x=2" />.</>,
  },
]

export default function SpecialistQ1_2019() {
  return (
    <MCQShell
      question={<p>The graph of <Katex tex="f(x)=\dfrac{e^x}{x-1}" /> does <b>not</b> have a</p>}
      background={
        <Background title="What Counts As a Point of Inflection">
          <p>
            A <b>point of inflection</b> is a point <em>on the curve</em> where the concavity changes: concave down (∩) on one
            side, concave up (∪) on the other. Concavity is the sign of <Katex tex="f''" />, so look for a sign change of{' '}
            <Katex tex="f''" /> at an <Katex tex="x" />-value in the domain.
          </p>
          <p>
            <Katex tex="f''" /> can also change sign across a vertical asymptote, where it is undefined. The concavity really
            does change there, but there is no point on the graph at that <Katex tex="x" />, so it is not a point of inflection.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <>horizontal asymptote.</> },
        { letter: 'B', content: <>vertical asymptote.</> },
        { letter: 'C', content: <>local minimum.</> },
        { letter: 'D', content: <>vertical axis intercept.</> },
        { letter: 'E', content: <>point of inflection.</>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <>
          <Explore title="The minimum is at x = 2, and the concavity changes only across the asymptote">
            <WalkWidget />
          </Explore>
          <WrongMethod
            title="I graphed it and nothing turns around, so there's no local minimum"
            source="19% chose C"
            working={
              <>
                <Katex display tex="\text{Standard window: } -6.67\le y\le 6.67" />
                <Katex display tex="\text{only the left branch shows}" />
                <Katex display tex="\implies \text{no minimum (option C)}" />
              </>
            }
          >
            <p>
              A graph shows only what is inside its window. Here the right branch never comes lower than{' '}
              <Katex tex="f(2)=e^2\approx7.39" />, which is above the top of the TI-Nspire&apos;s standard window, so the
              whole branch, minimum and all, is off-screen. What is left looks like a curve that just falls, with both
              asymptotes and the <Katex tex="y" />-intercept, so C looks like the missing feature.
            </p>
            <p>
              The algebra settles it: <Katex tex="f'(x)=\tfrac{e^x(x-2)}{(x-1)^2}" /> is zero at <Katex tex="x=2" /> and
              changes from negative to positive, so there is a minimum. Before deciding a feature is missing, solve{' '}
              <Katex tex="f'(x)=0" /> or zoom out until you have seen both sides of every asymptote.
            </p>
          </WrongMethod>
        </>
      }
    />
  )
}
