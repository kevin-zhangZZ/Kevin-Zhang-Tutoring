// 2017 Specialist Mathematics — Exam 2, MCQ 10. VCAA examination report: 6% correct —
// by far the hardest MCQ on this paper.
// Find the inflection point(s) of |f(x)| given properties of f, f' and f''.
// Question text transcribed from the original paper; solution is original. Answer E checked
// against the VCAA report and itute (both E).
// Notes on sources:
// - The report's one-line comment "f''(x) does not change sign at a" means the point x = −a,
//   where the squared factor (x + a)² is zero (f''(a) itself is not zero, since a ≠ 0 and
//   a ≠ b); it is kept verbatim and the working says what it refers to.
// - itute sketches "a possible f", but its curve changes concavity at several places (near 0
//   and near ±b), which the given f'' = (x + a)²(x − b)/g(x) does not allow: f'' changes sign only
//   at b. The answer is unaffected. (By convexity, the given values can only all hold when b < 0
//   and |a| > |b|; a itself may be either sign, so −a may lie left of b (f concave up there) or
//   right of it (concave down) — the working argues only from signs, so it covers both. The
//   widgets use one such f with a = 3, b = −1.)
// Interactive diagrams (§15): the first (interactives/spec-2017-mcq10-squared-factor.tsx) drags a
// point with its tangent along a function that fits every condition, beside a sign table of the
// factors of f'', to show f'' keeping its sign through −a and changing only at b; the second
// (interactives/spec-2017-mcq10-abs-inflection.tsx) flips the parts of f below the x-axis to make
// |f|, carrying the inflection point (b, −1) up to (b, 1). Both are this site's own explanatory
// figures; VCAA printed no graph for this question.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const SquaredFactorWidget = lazyWidget(() => import('../interactives/spec-2017-mcq10-squared-factor'))
const AbsInflectionWidget = lazyWidget(() => import('../interactives/spec-2017-mcq10-abs-inflection'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 31, B: 9, C: 45, D: 7, E: 6 },
  answer: 'E',
  noAnswer: 1,
  comment: <><Katex tex="f''(x)" /> does not change sign at <Katex tex="a" />.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="f''(x)=0 \implies (x+a)^2(x-b)=0" />
        <Katex display tex="\implies x=-a \ \text{ or } \ x=b" />
      </>
    ),
    reason: (
      <>
        A point of inflection is where the concavity changes, so where <Katex tex="f''" /> <em>changes sign</em>.
        <Katex tex="g(x)<0" /> is never zero, so <Katex tex="f''=0" /> only where the numerator is. That gives
        candidates; each must be checked for a sign change.
      </>
    ),
    more: (
      <>
        Compare <Katex tex="y=x^4" />: <Katex tex="f''(0)=0" />, but it is concave up on both sides of{' '}
        <Katex tex="0" />, so it has no inflection there.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="g(x)<0, \quad (x+a)^2>0 \ \text{ for } x\ne-a" />
        <Katex display tex="\implies f''(x) \text{ has the opposite sign to } x-b" />
      </>
    ),
    reason: (
      <>
        Check the sign of each factor: dividing by <Katex tex="g(x)" />, negative everywhere, flips the sign;{' '}
        <Katex tex="(x+a)^2" /> is a square, never negative. So <Katex tex="x-b" /> decides the sign of{' '}
        <Katex tex="f''" />.
      </>
    ),
    more: <>The first diagram below has a sign table like this.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{near } x=-a\!: \ (x+a)^2>0 \text{ on both sides}" />
        <Katex display tex="\implies f'' \text{ does not change sign at } x=-a" />
        <Katex display tex="\implies \text{no point of inflection at } x=-a" />
      </>
    ),
    reason: (
      <>
        <Katex tex="(x+a)^2" /> touches zero at <Katex tex="-a" /> but is positive on both sides, and{' '}
        <Katex tex="x-b" /> keeps its sign there, so <Katex tex="f''" /> does too. (The report&apos;s &ldquo;at{' '}
        <Katex tex="a" />&rdquo; means this point, <Katex tex="x=-a" />.)
      </>
    ),
    more: (
      <>
        Like <Katex tex="y=x^2" /> at the origin, the square bounces off zero rather than crossing it, so the curve
        straightens for an instant at <Katex tex="-a" /> and keeps bending the same way. Drag P through <Katex tex="-a" /> in the first diagram below
        and watch the tangent stay on one side of the curve.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\text{at } x=b\!: \ x-b \text{ changes from } - \text{ to } +" />
        <Katex display tex="\implies f'' \text{ changes from } + \text{ to } -" />
        <Katex display tex="\implies \text{point of inflection of } f \text{ at } (b,\,-1)" />
      </>
    ),
    reason: (
      <>
        Left of <Katex tex="b" />, <Katex tex="f''>0" /> (concave up); right of it, <Katex tex="f''<0" /> (concave
        down). So <Katex tex="(b,-1)" /> is the only inflection of <Katex tex="f" />, but the question asks about{' '}
        <Katex tex="|f(x)|" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="f(b)=-1<0" />
        <Katex display tex="\implies |f(x)|=-f(x) \ \text{ for } x \text{ near } b" />
      </>
    ),
    reason: (
      <>
        <Katex tex="f" /> is continuous and <Katex tex="f(b)=-1" />, so <Katex tex="f<0" /> for <Katex tex="x" /> near{' '}
        <Katex tex="b" />. There <Katex tex="|f|" /> reflects <Katex tex="f" /> in the <Katex tex="x" />-axis:{' '}
        <Katex tex="|f|=-f" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\frac{d^2}{dx^2}\bigl(-f(x)\bigr)=-f''(x)" />
        <Katex display tex="-f'' \text{ changes from } - \text{ to } + \text{ at } x=b" />
        <Katex display tex="\implies \text{point of inflection of } |f|" />
        <Katex display tex="\text{at } \bigl(b,\,|f(b)|\bigr)=(b,\,1)" />
      </>
    ),
    reason: (
      <>
        Reflecting swaps concave up and concave down, so a change of concavity is still a change. The inflection
        survives, at height <Katex tex="|-1|=1" />.
      </>
    ),
    more: (
      <>
        Press <b>Flip</b> in the second diagram below.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="f(-a)=-1<0 \implies |f|=-f \text{ near } x=-a" />
        <Katex display tex="-f'' \text{ does not change sign at } x=-a" />
        <Katex display tex="\implies (-a,\,1) \text{ is not a point of inflection}" />
      </>
    ),
    reason: (
      <>
        <Katex tex="f''" /> kept its sign at <Katex tex="-a" />, so <Katex tex="-f''" /> does too: still no change of
        concavity, so still no inflection.
      </>
    ),
    more: (
      <>
        Whichever way <Katex tex="f" /> bends around <Katex tex="-a" />, it bends the same way on both sides, and the
        reflection turns both sides over together. In the diagrams, concave up on both sides becomes concave down on
        both sides.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{(b,\,1)}" />,
    reason: (
      <>
        Matches option <b>E</b>, the only point of inflection of <Katex tex="|f|" />.
      </>
    ),
    more: (
      <>
        Where <Katex tex="f" /> crosses the <Katex tex="x" />-axis, <Katex tex="|f|" /> has a sharp corner. The
        concavity does flip across it (one side is <Katex tex="f" />, the other <Katex tex="-f" />), but there is no
        tangent, so a corner is not a point of inflection (and no option mentions one);{' '}
        <Katex tex="f(a)=1" /> and <Katex tex="f(-b)=1" /> are never needed. Option C (45%) takes both zeros of{' '}
        <Katex tex="f''" /> as points of inflection and gives the coordinates on <Katex tex="f" />, not{' '}
        <Katex tex="|f|" />; option A (31%) switches to <Katex tex="|f|" /> but still includes <Katex tex="-a" />; option
        D (7%) is that wrong point alone; option B (9%) is the point of inflection of <Katex tex="f" />, with the
        absolute value forgotten.
      </>
    ),
  },
]

export default function SpecialistQ10_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A function <Katex tex="f" />, its derivative <Katex tex="f'" /> and its second derivative{' '}
            <Katex tex="f''" /> are defined for <Katex tex="x\in R" /> with the following properties.
          </p>
          <Katex display tex="f(a)=1,\ f(-a)=-1" className="my-1" />
          <Katex display tex="f(b)=-1,\ f(-b)=1" className="my-1" />
          <Katex display tex="\text{and} \quad f''(x)=\frac{(x+a)^2(x-b)}{g(x)}," className="my-1" />
          <Katex display tex="\text{where } g(x)<0" className="my-1" />
          <p className="mt-2">The coordinates of any points of inflection of <Katex tex="|f(x)|" /> are</p>
        </>
      }
      background={
        <Background title="Two Ideas This Question Tests">
          <p>
            <b>A point of inflection</b> is a point on the curve where it has a tangent (no sharp corner) and the
            concavity changes: concave up (bending like ∪) on one side and concave down (bending like ∩) on the other. Concavity is the sign of <Katex tex="f''" />, so
            the test is a <em>change of sign</em> of <Katex tex="f''" />.
          </p>
          <p>
            <b>The graph of <Katex tex="|f(x)|" /></b> is the graph of <Katex tex="f" /> with every part below the{' '}
            <Katex tex="x" />-axis reflected up above it; the parts above the axis are unchanged.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <>(<Katex tex="-a" />, 1) and (<Katex tex="b" />, 1)</> },
        { letter: 'B', content: <>(<Katex tex="b" />, −1)</> },
        { letter: 'C', content: <>(<Katex tex="-a" />, −1) and (<Katex tex="b" />, −1)</> },
        { letter: 'D', content: <>(<Katex tex="-a" />, 1)</> },
        { letter: 'E', content: <>(<Katex tex="b" />, 1)</>, isAnswer: true },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="f″ is zero at x = −a, but a squared factor can't change its sign — so there's no inflection there">
            <SquaredFactorWidget />
          </Explore>
          <WrongMethod
            title="f″(x) = 0 at x = −a and at x = b, so both are points of inflection"
            source="C 45%, A 31%"
            working={
              <>
                <Katex display tex="f''(x)=0 \implies x=-a \ \text{ or } \ x=b" />
                <Katex display tex="\implies (-a,\,-1) \text{ and } (b,\,-1) \quad \text{(option C)}" />
              </>
            }
          >
            <p>
              This stops at the candidates and skips the sign check, which <Katex tex="x=-a" /> fails. Reflecting both
              points up (option A) fixes the <Katex tex="|f|" /> part but not this.
            </p>
            <p>
              Next time, check every candidate for a sign change. A factor with an even power, like{' '}
              <Katex tex="(x+a)^2" />, never changes sign, so it never gives a point of inflection.
            </p>
          </WrongMethod>
          <Explore title="|f| flips the parts below the x-axis up, so the inflection point (b, −1) becomes (b, 1)">
            <AbsInflectionWidget />
          </Explore>
          <WrongMethod
            title="Find the point of inflection of f and stop there"
            source="B 9%, C 45%"
            working={
              <>
                <Katex display tex="f''(x) \text{ changes sign at } x=b, \quad f(b)=-1" />
                <Katex display tex="\implies (b,\,-1) \quad \text{(option B)}" />
              </>
            }
          >
            <p>
              The question is about <Katex tex="|f(x)|" />, and every option has a <Katex tex="y" />-coordinate of{' '}
              <Katex tex="1" /> or <Katex tex="-1" />, so the absolute value is exactly what decides between B and E. The
              graph of <Katex tex="|f|" /> passes through <Katex tex="(b,\,|f(b)|)=(b,\,1)" />, never through a point with
              a negative <Katex tex="y" />-coordinate: the inflection sits one unit above the axis, not one below.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
