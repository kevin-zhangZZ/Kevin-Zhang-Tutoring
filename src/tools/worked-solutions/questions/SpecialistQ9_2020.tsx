// 2020 Specialist Mathematics — Exam 2, MCQ 9. VCAA examination report: 35% correct.
// Matching a described curve to its slope field — all five options are diagrams. Question
// text transcribed from the original paper; each option is the actual VCAA figure, cropped from
// the official exam PDF at 300 dpi (re-cropped Sept 2026 to the figure alone: the earlier crops
// were lower resolution with half their width blank, so the marks were hard to read at option
// size), option letters excluded. Solution is original.
//
// Notes on sources:
// - The answer B agrees with the report and itute (which gives no working). The derivation
//   dy/dx = y/(x − y) matches the NBEASTK video walkthrough; the two-line elimination (flat on the
//   x-axis, gradient −1 on the y-axis) follows John Friend's comment on Marty Ross's blog
//   (mathematicalcrap.com), where the question's wording is also criticised: no differential
//   equation is given, and "the x-intercept of a tangent to point P" is loose. Strictly, at a point
//   on the x-axis with a horizontal tangent the tangent is the x-axis itself, which has no single
//   x-intercept; the flat marks there are the limit of the nearby ones. VCAA's answer is still the
//   only field that fits.
// - Each option's differential equation was identified by measuring every mark in the 300 dpi
//   crops (PCA angle of each dash against candidate rules; 500+ marks per figure, median error
//   under 1°): A dy/dx = x/(x − y), B y/(x − y), C y/(y − x), D x/(y − x), E y/x. The C slip in
//   the Common Mistake (x-intercept x + y/m) is checked with sympy to give exactly y/(y − x).
// Interactive diagrams (§15): interactives/spec-2020-mcq9-tangent.tsx (this site's own
// explanatory figure) drags P and draws the tangent through Q(y, 0), showing where the gradient
// y/(x − y) comes from and what it does on the three easy lines; interactives/
// spec-2020-mcq9-test-lines.tsx is an SVG overlay on the cropped option figures that highlights
// the x-axis and y-axis strips of the chosen option and marks each test passed or failed.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import optASrc from './spec-2020-mcq9-optA.png'
import optBSrc from './spec-2020-mcq9-optB.png'
import optCSrc from './spec-2020-mcq9-optC.png'
import optDSrc from './spec-2020-mcq9-optD.png'
import optESrc from './spec-2020-mcq9-optE.png'

const TangentWidget = lazyWidget(() => import('../interactives/spec-2020-mcq9-tangent'))
const TestLinesWidget = lazyWidget(() => import('../interactives/spec-2020-mcq9-test-lines'))

function SlopeField({ src, letter }: { src: string; letter: string }) {
  return <img src={src} alt={`Slope field option ${letter}, cropped from the VCAA paper`} className="w-full max-w-[220px]" />
}

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 35, C: 17, D: 22, E: 13 },
  answer: 'B',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{tangent at } P(x,y) \text{ passes through } Q(y,\,0)" />,
    reason: (
      <>
        Turn the words into a point. The <Katex tex="x" />-intercept of the tangent is a point on the{' '}
        <Katex tex="x" />-axis, and the condition says its <Katex tex="x" />-coordinate equals the <Katex tex="y" />-value
        at P. So the tangent passes through <Katex tex="(y,0)" />, as well as through P itself. Drag P in the first diagram
        below: Q is always P&apos;s height laid out along the <Katex tex="x" />-axis.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = \frac{y-0}{x-y} = \frac{y}{x-y}" />,
    reason: (
      <>
        The gradient of the tangent at P is <Katex tex="\tfrac{dy}{dx}" /> there, and two points fix a line&apos;s
        gradient: rise over run from <Katex tex="Q(y,0)" /> to <Katex tex="P(x,y)" />. (Writing the tangent as{' '}
        <Katex tex="Y-y=\tfrac{dy}{dx}(X-x)" /> and putting in <Katex tex="Y=0" />, <Katex tex="X=y" /> gives the same
        equation.) This is the differential equation the right slope field shows; the question never states it, and
        building it is the real work.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="y=0\ (x\ne0)\!:\ \frac{dy}{dx} = \frac{0}{x} = 0" />
        <Katex display tex="x=0\ (y\ne0)\!:\ \frac{dy}{dx} = \frac{y}{-y} = -1" />
      </>
    ),
    reason: (
      <>
        Rather than check marks at random points, pick lines where the formula collapses to one number all along them:
        the two axes. Along the <Katex tex="x" />-axis every mark must be flat. Along the <Katex tex="y" />-axis every
        mark must have gradient <Katex tex="-1" />, above <Katex tex="O" /> and below it (in the first diagram, O, P and Q
        then form an isosceles right-angled triangle). VCAA draws no marks on the axes themselves, so read the row and
        column of marks just beside them. (Strictly, a point on the <Katex tex="x" />-axis with a flat tangent has the{' '}
        <Katex tex="x" />-axis itself as its tangent, so &ldquo;its <Katex tex="x" />-intercept&rdquo; isn&apos;t one
        point; the marks just beside the axis are nearly flat, and that is what the figures show.)
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="x\text{-axis: A (gradient } 1\text{) and D (gradient } {-1}\text{) fail}" />
        <Katex display tex="y\text{-axis: C (gradient } 1\text{) and E (vertical) fail}" />
      </>
    ),
    reason: (
      <>
        Check each option in turn (the second diagram below lights up the two strips on each figure). <b>A</b> climbs at{' '}
        <Katex tex="45^\circ" /> along the <Katex tex="x" />-axis and is flat along the <Katex tex="y" />-axis: it fails
        both. <b>C</b> is flat along the <Katex tex="x" />-axis but climbs at gradient <Katex tex="+1" /> along the{' '}
        <Katex tex="y" />-axis. <b>D</b> has gradient <Katex tex="-1" /> along the <Katex tex="x" />-axis and is flat along
        the <Katex tex="y" />-axis: it fails both. <b>E</b> is flat along the <Katex tex="x" />-axis but vertical along the{' '}
        <Katex tex="y" />-axis. Only <b>B</b> is flat along the <Katex tex="x" />-axis and has gradient{' '}
        <Katex tex="-1" /> along the <Katex tex="y" />-axis.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\text{B}}" />,
    reason: (
      <>
        Matches option <b>B</b>. A third check agrees: B&apos;s marks turn vertical along <Katex tex="y=x" /> in the first
        and third quadrants, where <Katex tex="x-y=0" /> makes <Katex tex="\tfrac{y}{x-y}" /> undefined (Q is straight
        below P). Measured mark by mark, the other four fields are A: <Katex tex="\tfrac{x}{x-y}" />, C:{' '}
        <Katex tex="\tfrac{y}{y-x}" />, D: <Katex tex="\tfrac{x}{y-x}" /> and E: <Katex tex="\tfrac{y}{x}" />. Option{' '}
        <b>D</b> (22%), the most popular wrong answer, is the right rule with <Katex tex="x" /> and <Katex tex="y" />{' '}
        swapped, and it fails both axis tests. Option <b>C</b> (17%) is the right rule with its sign reversed, which the{' '}
        <Katex tex="x" />-axis test alone can&apos;t catch (see below). Option <b>E</b> is the gradient of <Katex tex="OP" />,
        as if the tangent passed through <Katex tex="O" /> instead of <Katex tex="Q" />.
      </>
    ),
  },
]

export default function SpecialistQ9_2020() {
  return (
    <MCQShell
      question={
        <p>
          <Katex tex="P(x,y)" /> is a point on a curve. The <Katex tex="x" />-intercept of a tangent to point{' '}
          <Katex tex="P(x,y)" /> is equal to the <Katex tex="y" />-value at <Katex tex="P" />.
          <br />
          Which one of the following slope fields best represents this curve?
        </p>
      }
      background={
        <Background title="What a Slope Field Shows">
          <p>
            A slope field draws, at each point <Katex tex="(x,y)" /> of a grid, a short mark whose gradient is the value
            of <Katex tex="\tfrac{dy}{dx}" /> there. Every curve with that gradient rule runs along the marks, like a leaf
            carried on a stream.
          </p>
          <p>
            So choosing between slope fields takes two steps: find the rule for <Katex tex="\tfrac{dy}{dx}" />, then test
            it on a few lines where the marks are easy to predict. Here the rule isn&apos;t given; it has to be built from
            the description of the tangent.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <SlopeField src={optASrc} letter="A" /> },
        { letter: 'B', content: <SlopeField src={optBSrc} letter="B" />, isAnswer: true },
        { letter: 'C', content: <SlopeField src={optCSrc} letter="C" /> },
        { letter: 'D', content: <SlopeField src={optDSrc} letter="D" /> },
        { letter: 'E', content: <SlopeField src={optESrc} letter="E" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="The condition gives the tangent a second point, Q(y, 0), so its gradient is y/(x − y)">
            <TangentWidget />
          </Explore>
          <Explore title="Test two easy lines on each option: flat along the x-axis, gradient −1 along the y-axis">
            <TestLinesWidget />
          </Explore>
          <WrongMethod
            title="Solve the tangent equation for its x-intercept, and slip a sign"
            source="C 17%"
            working={
              <>
                <Katex display tex="0-y = m(X-x) \implies X = x+\frac{y}{m}" />
                <Katex display tex="x+\frac{y}{m} = y \implies m = \frac{y}{y-x} \quad \text{(option C)}" />
              </>
            }
          >
            <p>
              From <Katex tex="-y=m(X-x)" />, <Katex tex="X-x=-\tfrac{y}{m}" />, so <Katex tex="X=x-\tfrac{y}{m}" />. One
              sign error turns the right rule into its negative, and the negative still gives flat marks along the{' '}
              <Katex tex="x" />-axis (zero is its own negative), so option C survives the first test. The{' '}
              <Katex tex="y" />-axis test catches it: C&apos;s marks there have gradient <Katex tex="+1" />, not{' '}
              <Katex tex="-1" />.
            </p>
            <p>
              Two safeguards: always use both test lines, and use the picture. The tangent passes through{' '}
              <Katex tex="P(x,y)" /> and <Katex tex="Q(y,0)" />, so its gradient is rise over run,{' '}
              <Katex tex="\tfrac{y-0}{x-y}" />, with nothing to rearrange and no sign to slip.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
