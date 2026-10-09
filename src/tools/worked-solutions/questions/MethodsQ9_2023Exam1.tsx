// 2023 Mathematical Methods — Exam 1 Question 9 (6 marks). Two walking tracks sharing a
// turning point, then the largest triangle that fits under one of them. Question text
// transcribed from the original paper; the figures are crops of VCAA's own artwork. Answers
// checked with sympy and against the VCAA examination report. Solution is original. Interactives
// (Detailed view only): part b. (interactives/meth-2023e1-q9b-meeting-vs-turning.tsx) slides a point
// along both tracks with their tangents, showing they meet at P and again at (3, 9) but are both
// turning only at P; part c. (interactives/meth-2023e1-q9c-past-the-peak.tsx) slides B along track 2 to see the
// triangle's area A(k) rise past the peak P and top out at k = 8/3, not at k = 2. Oct 2026 Concise
// review: report commentary, checks and asides moved from the reasons into each row's `more`; the
// page-top Background split into a Background inside part b. and one inside part c.

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import tracksSrc from './meth-2023e1-q9-tracks.png'
import triangleSrc from './meth-2023e1-q9c-triangle.png'

const MeetingVsTurningWidget = lazyWidget(() => import('../interactives/meth-2023e1-q9b-meeting-vs-turning'))
const PastThePeakWidget = lazyWidget(() => import('../interactives/meth-2023e1-q9c-past-the-peak'))

const EXAM_A: SAExaminerStats = {
  marks: [10, 90],
  average: 0.9,
  comment: (
    <>
      This question was frequently attempted successfully. Most students knew that in order to
      'verify' the values they needed to show working to support this.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [34, 36, 30],
  average: 1.0,
  comment: (
    <>
      This question required students to verify that both <Katex tex="f(x)" /> and{' '}
      <Katex tex="g(x)" /> have a turning point at <Katex tex="P" />. It was not sufficient to
      assume by inspection that the tracks met at <Katex tex="P" />. Some students
      misinterpreted the question and solved <Katex tex="f(x)=g(x)" />; they stopped short of
      showing that the point of intersection was a turning point for both curves. Errors were
      involved in expanding the brackets of <Katex tex="f(x)" /> and finding{' '}
      <Katex tex="f'(x)" />. Some students just showed that <Katex tex="g(x)" /> had a turning
      point at <Katex tex="x=2" />, not addressing the turning points of <Katex tex="f(x)" />.
      Some students incorrectly used the product rule to differentiate <Katex tex="f(x)" /> and
      gave <Katex tex="f'(x)=x(x-2)^2" />. Most students were successful in finding the
      coordinates of <Katex tex="P" /> at <Katex tex="(2,12)" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [65, 5, 17, 13],
  average: 0.8,
  comment: (
    <>
      This question was not well attempted. Those students who did complete the question
      generally were able to state the equation for the area of the triangle as either{' '}
      <Katex tex="A(k)=\tfrac12k\left(12k-3k^2\right)" /> or{' '}
      <Katex tex="A(k)=6k^2-\tfrac32k^3" /> or an equivalent equation in terms of the variable{' '}
      <Katex tex="x" />. Many students were able to differentiate to get{' '}
      <Katex tex="A'(k)=0" />, although some students incorrectly wrote this as{' '}
      <Katex tex="A'(x)" /> when the variable they were using was <Katex tex="k" />. Most
      students who were able to solve <Katex tex="A'(k)=0" /> found <Katex tex="k=\tfrac83" />{' '}
      or its equivalent, <Katex tex="k=\tfrac{24}{9}" />. Many arithmetic mistakes occurred when
      students tried to substitute the value of <Katex tex="k=\tfrac83" /> or{' '}
      <Katex tex="k=\tfrac{24}{9}" /> into their expression of <Katex tex="A(k)" /> to find the
      maximum area.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(0) = a-0\,(0-2)^2 = a-0 = a" />,
    reason: <>Substituting <Katex tex="x=0" /> into track 1's rule. The whole second term vanishes because of its factor of <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="f(0) = 12 \implies \boxed{a = 12}" />,
    reason: <>Using the given value <Katex tex="f(0)=12" />.</>,
  },
  {
    working: <Katex display tex="g(1) = 12(1)+b(1)^2 = 12+b" />,
    reason: <>Substituting <Katex tex="x=1" /> into track 2's rule.</>,
  },
  {
    working: <Katex display tex="12+b = 9 \implies \boxed{b = -3}" />,
    reason: <>Using the given value <Katex tex="g(1)=9" />. As required.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = 12x-3x^2 \implies g'(x) = 12-6x" />,
    reason: <>A turning point is where the gradient is zero, so differentiate. Start with track 2 (with <Katex tex="b=-3" /> from part a.), since a parabola has just one turning point to find.</>,
  },
  {
    working: <Katex display tex="g'(x) = 0 \implies 12-6x = 0 \implies x = 2" />,
    reason: <>So track 2 turns at <Katex tex="x=2" />. To verify, track 1 must also have zero gradient at <Katex tex="x=2" /> — showing that the tracks meet at <Katex tex="P" /> is not enough.</>,
    more: <>The report notes some students just showed that <Katex tex="g(x)" /> had a turning point at <Katex tex="x=2" />, not addressing the turning points of <Katex tex="f(x)" />. The question says <em>both</em>, so the next three lines do the same for track 1.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} f(x) &= 12-x(x-2)^2 = 12-x\left(x^2-4x+4\right) \\ &= -x^3+4x^2-4x+12 \end{aligned}"
      />
    ),
    reason: <>Expand first, so <Katex tex="f'(x)" /> needs only the power rule.</>,
    more: (
      <>
        The report notes errors in expanding the brackets of <Katex tex="f(x)" />. Square the bracket first,{' '}
        <Katex tex="(x-2)^2=x^2-4x+4" />, then multiply each term by <Katex tex="x" />, and only then take the
        whole result away from 12, so the minus sign reaches every term. The report also notes some students
        incorrectly used the product rule and gave <Katex tex="f'(x)=x(x-2)^2" />. Notice that this is just the term
        already in <Katex tex="f(x)" />, so it cannot be the derivative. Used correctly, on both factors and keeping
        the minus sign, the product rule gives{' '}
        <Katex tex="f'(x)=-\bigl[1\cdot(x-2)^2+x\cdot2(x-2)\bigr]=-(x-2)(3x-2)" />, the same as the next line.
      </>
    ),
  },
  {
    working: <Katex display tex="f'(x) = -3x^2+8x-4 = -(3x-2)(x-2)" />,
    reason: <>Differentiate term by term, then factorise to see where <Katex tex="f'(x)=0" />.</>,
  },
  {
    working: <Katex display tex="f'(2) = -3(4)+16-4 = 0" />,
    reason: <>Substituting <Katex tex="x=2" />: track 1 is stationary at <Katex tex="x=2" /> as well.</>,
    more: <>The factorised form shows <Katex tex="f'(x)=0" /> at <Katex tex="x=\tfrac23" /> too. That is the small dip in track 1 near the <Katex tex="y" />-axis in the question's figure (a local minimum), not <Katex tex="P" />.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} f'(1) &= 1 > 0, & f'(3) &= -7 < 0 \\ g'(1) &= 6 > 0, & g'(3) &= -6 < 0 \end{aligned}"
      />
    ),
    reason: <>A stationary point is a <em>turning point</em> only if the gradient changes sign there. Test a value each side of <Katex tex="x=2" /> with no other stationary point in between: track 1 has one at <Katex tex="x=\tfrac23" />, so use <Katex tex="x=1" />, not <Katex tex="x=0" />. Positive then negative: both tracks have a local maximum at <Katex tex="x=2" />.</>,
    more: <>If the gradient had the same sign on both sides, <Katex tex="x=2" /> would be a stationary point of inflection, not a turning point, so this check is what the word "turning" asks for. A test point to the left of <Katex tex="x=\tfrac23" /> misleads: <Katex tex="f'(0)=-4<0" /> only because <Katex tex="x=0" /> is on the far side of track 1's dip. To the right of <Katex tex="x=2" /> neither track has another stationary point, so <Katex tex="x=3" /> is safe. The second derivative is a quicker check that avoids choosing test points: <Katex tex="f''(x)=-6x+8" /> gives <Katex tex="f''(2)=-4<0" />, and <Katex tex="g''(2)=-6<0" />, so both are maxima.</>,
  },
  {
    working: <Katex display tex="f(2) = 12-2(0)^2 = 12, \qquad g(2) = 24-12 = 12" />,
    reason: <>Equal heights as well, so the two turning points are the same point: the shared peak <Katex tex="P" />.</>,
  },
  {
    working: <Katex display tex="\boxed{P = (2,\,12)}" />,
    reason: <>Both tracks reach their peak at <Katex tex="P" />, and the question asks for its co-ordinates.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} OA &= k \ \text{ (along the } x\text{-axis)} \\ AB &= g(k) = 12k-3k^2 \end{aligned}"
      />
    ),
    reason: <><Katex tex="A" /> is at <Katex tex="(k,0)" /> and <Katex tex="B" /> is directly above it on track 2, so the triangle is right-angled at <Katex tex="A" />, with base <Katex tex="OA=k" /> and height <Katex tex="AB=g(k)" />.</>,
    more: <>Since <Katex tex="g(k)=3k(4-k)>0" /> for <Katex tex="0<k<4" />, <Katex tex="B" /> is above the <Katex tex="x" />-axis, so <Katex tex="g(k)" /> really is the height (no absolute value needed).</>,
  },
  {
    working: <Katex display tex="A(k) = \frac12\,k\left(12k-3k^2\right) = 6k^2-\frac32k^3" />,
    reason: <>Half base times height, written as a function of <Katex tex="k" /> so it can be maximised. Here <Katex tex="A(k)" /> is the area, not the point <Katex tex="A" />.</>,
    more: <>Keep the same variable all the way through: the report notes some students wrote <Katex tex="A'(x)" /> when the variable they were using was <Katex tex="k" />.</>,
  },
  {
    working: <Katex display tex="A'(k) = 12k-\frac92k^2 = \frac{3k}{2}\left(8-3k\right)" />,
    reason: <>Differentiate term by term, then take out the common factor <Katex tex="\tfrac{3k}{2}" /> so <Katex tex="A'(k)=0" /> is easy to solve.</>,
  },
  {
    working: <Katex display tex="A'(k) = 0 \implies k = 0 \ \text{ or } \ k = \frac83" />,
    reason: <>Reject <Katex tex="k=0" />: it is outside <Katex tex="(0,4)" /> (and gives no triangle). <Katex tex="k=\tfrac83\approx2.67" /> is inside it.</>,
  },
  {
    working: <Katex display tex="A''(k) = 12-9k, \quad A''\!\left(\tfrac83\right) = 12-24 = -12 < 0" />,
    reason: <>A negative second derivative means the graph of <Katex tex="A(k)" /> is concave down there, so <Katex tex="k=\tfrac83" /> gives a maximum, not a minimum.</>,
    more: <>A sign test works too: <Katex tex="A'(2)=6>0" /> and <Katex tex="A'(3)=-4.5<0" />, so the area increases and then decreases through <Katex tex="k=\tfrac83" />.</>,
  },
  {
    working: <Katex display tex="g\!\left(\frac83\right) = 12\cdot\frac83-3\cdot\frac{64}{9} = 32-\frac{64}{3} = \frac{32}{3}" />,
    reason: <>Find the height at <Katex tex="k=\tfrac83" /> on its own line first, so the area is then a single product of fractions.</>,
    more: <>The report notes many arithmetic mistakes occurred when students substituted <Katex tex="k=\tfrac83" /> (or the unsimplified <Katex tex="k=\tfrac{24}{9}" />) into their expression for <Katex tex="A(k)" />. Simplify <Katex tex="k" /> first, and keep the height as a fraction rather than a rounded decimal.</>,
  },
  {
    working: <Katex display tex="\boxed{A_{\max} = \frac12\cdot\frac83\cdot\frac{32}{3} = \frac{128}{9} \ \mathrm{km^2}}" />,
    reason: <>Half base times height at <Katex tex="k=\tfrac83" />: about <Katex tex="14.2\ \mathrm{km^2}" />.</>,
    more: (
      <>
        Check with the expanded form:{' '}
        <Katex tex="6\cdot\tfrac{64}{9}-\tfrac32\cdot\tfrac{512}{27}=\tfrac{384}{9}-\tfrac{256}{9}=\tfrac{128}{9}" /> ✓.
      </>
    ),
  },
]

export default function MethodsQ9_2023Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 9 (6 marks)</p>
        <p>The shapes of two walking tracks are shown below.</p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={tracksSrc}
            alt="Two curves from near the y-axis rising to a shared peak P and falling to the x-axis: track 1 a solid cubic starting high on the y-axis with a small dip, and track 2 a dashed parabola starting at the origin — from the original 2023 VCAA exam paper"
            className="w-full max-w-[500px]"
          />
        </div>
        <p>
          Track 1 is described by the function <Katex tex="f(x)=a-x(x-2)^2" />.
          <br />
          Track 2 is defined by the function <Katex tex="g(x)=12x+bx^2" />.
          <br />
          The unit of length is kilometres.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Find Parameters"
        marks={1}
        statement={
          <>
            Given that <Katex tex="f(0)=12" /> and <Katex tex="g(1)=9" />, verify that{' '}
            <Katex tex="a=12" /> and <Katex tex="b=-3" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Turning Point"
        marks={2}
        statement={
          <>
            Verify that <Katex tex="f(x)" /> and <Katex tex="g(x)" /> both have a turning point
            at <Katex tex="P" />.
            <br />
            Give the co-ordinates of <Katex tex="P" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background>
          <p>
            "Verify" (as in part a.) means the answer is already given, and the marks are for the
            working that produces it: here, working that shows <em>each</em> track is turning at{' '}
            <Katex tex="P" />. Solving <Katex tex="f(x)=g(x)" /> answers
            a different question: it finds where the tracks meet, and they meet at a second point as
            well as <Katex tex="P" />, where neither track is turning. The interactive after the working
            shows both meeting points.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Explore title="The tracks meet twice, but only P is a turning point of both">
          <MeetingVsTurningWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="c"
        topic="Optimisation"
        marks={3}
        statement={
          <div className="flex flex-col gap-3">
            <p>
              A theme park is planned whose boundaries will form the triangle{' '}
              <Katex tex="\Delta OAB" /> where <Katex tex="O" /> is the origin,{' '}
              <Katex tex="A" /> is at <Katex tex="(k,0)" /> and <Katex tex="B" /> is at{' '}
              <Katex tex="\bigl(k,\,g(k)\bigr)" />, as shown below, where{' '}
              <Katex tex="k\in(0,4)" />.
              <br />
              Find the maximum possible area of the theme park, in{' '}
              <Katex tex="\mathrm{km^2}" />.
            </p>
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img loading="lazy" decoding="async"
                src={triangleSrc}
                alt="The same two tracks with a triangle drawn from the origin to A on the x-axis and up to B on track 2 directly above A, the right angle at A marked — from the original 2023 VCAA exam paper"
                className="w-full max-w-[500px]"
              />
            </div>
          </div>
        }
        examinerReport={EXAM_C}
      >
        <Background>
          <p>
            This is an ordinary optimisation, done in three steps: write the area as a function of
            the one thing that varies, <Katex tex="k" />; solve <Katex tex="A'(k)=0" /> for a value
            inside <Katex tex="(0,4)" />; then check that it gives a maximum and find the area there.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <Explore title="The biggest triangle is past the peak, not at it">
          <PastThePeakWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
