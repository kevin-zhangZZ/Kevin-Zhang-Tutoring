// 2019 Specialist Mathematics — Exam 2, Section B, Question 2 (10 marks).
// Complex roots of 2z²+4z+5=0, the circle of minimum radius through them, the values of d for
// which the roots of 2z²+4z+d=0 lie inside that circle, and the general case for az²+bz+c=0.
// Question text transcribed from the original paper. VCAA's Argand grid was blank, so the
// plotted roots and circle are this site's own answer, drawn with matplotlib on VCAA's grid
// (−3 to 3, gridlines every 0.2).
// Cross-checked against the VCAA examination report and itute's independent solutions (itute's
// current solutions agree on a.–c., including c.: −1 ≤ d ≤ 5 via |2 − d| ≤ 3, and on p = b/(2a) in d.). All answers
// re-derived with sympy; part c. also confirmed by a numerical sweep of d. Solution is original.
// Interactives: b.i. slide the centre of a circle through both roots along the real axis
// (spec-2019e2-q2bi-smallest-circle); c. slide d and watch the roots travel the real axis, meet at
// −1 and split vertically (spec-2019e2-q2c-roots-vs-d); d. general a, b, c with "multiply by −1"
// and the report's two sign slips (spec-2019e2-q2d-general-circle).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import argandSrc from './spec-2019e2-q2-argand.png'

const SmallestCircleWidget = lazyWidget(() => import('../interactives/spec-2019e2-q2bi-smallest-circle'))
const RootsVsDWidget = lazyWidget(() => import('../interactives/spec-2019e2-q2c-roots-vs-d'))
const GeneralCircleWidget = lazyWidget(() => import('../interactives/spec-2019e2-q2d-general-circle'))

const EXAM_AI: SAExaminerStats = {
  marks: [32, 68],
  average: 0.7,
  comment: <>Most students were able to show that the quadratic equation had the given solutions either by the quadratic formula as above or by completing the square. In a 'show that' question such as this, students are expected to explicitly show that the given information leads to the required conclusion rather than 'verify' that the given values of <Katex tex="z" /> are solutions of the equation. The working shown above is an example of a suitable response.</>,
}

const EXAM_AII: SAExaminerStats = {
  marks: [17, 83],
  average: 0.9,
  comment: <>Most students correctly plotted points representing the two solutions. In some cases insufficient care was taken to plot points accurately relative to the supplied gridlines and scale.</>,
}

const EXAM_BI: SAExaminerStats = {
  marks: [28, 17, 55],
  average: 1.3,
  comment: <><Katex tex="m=-1" /> was a common incorrect response.</>,
}

const EXAM_BII: SAExaminerStats = {
  marks: [41, 59],
  average: 0.6,
  comment: <>Incorrect responses included sign errors and algebraic errors resulting from unnecessary attempts to isolate <Katex tex="y" />.</>,
}

const EXAM_BIII: SAExaminerStats = {
  marks: [32, 68],
  average: 0.7,
  comment: <>Refer to the diagram in Question 2a(ii).</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [70, 23, 7],
  average: 0.4,
  comment: (
    <>
      Many students did not attempt this question. Of those who did, most abandoned a
      potentially correct approach before they reached a conclusion. Those who reached a
      conclusion generally got there via the quadratic formula but unfortunately most of these
      students found only one end point of the interval.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [72, 27, 1],
  average: 0.3,
  comment: <>Many students did not attempt this question. Of those who attempted it, most made errors relating to signs; giving the negative of the correct <Katex tex="p" /> value, or not accounting for the sign of <Katex tex="a" />.</>,
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="z = \dfrac{-4\pm\sqrt{4^2-4(2)(5)}}{2(2)} = \dfrac{-4\pm\sqrt{-24}}{4}" />,
    reason: <>A "show that" has to start from the equation and arrive at the given roots, so solve it: quadratic formula with <Katex tex="a=2,\ b=4,\ c=5" />. The discriminant <Katex tex="16-40=-24" /> is negative, which is why the roots come out as a complex conjugate pair.</>,
  },
  {
    working: <Katex display tex="\sqrt{-24} = \sqrt{24}\,i = 2\sqrt6\,i" />,
    reason: <><Katex tex="\sqrt{24}=\sqrt{4\times6}=2\sqrt6" />.</>,
  },
  {
    working: <Katex display tex="z = \dfrac{-4\pm2\sqrt6\,i}{4}" />,
    reason: <>Substituting <Katex tex="\sqrt{-24}=2\sqrt6\,i" />.</>,
  },
  {
    working: <Katex display tex="\boxed{z = -1\pm\dfrac{\sqrt6}{2}i}" />,
    reason: <>Dividing each term by <Katex tex="4" />. As required. The report stresses that a "show that" must start from the equation and lead to the given solutions, rather than substituting them in to verify.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="-1+\dfrac{\sqrt6}{2}i \ \leftrightarrow \ \left(-1,\ \dfrac{\sqrt6}{2}\right)" />
        <Katex display tex="-1-\dfrac{\sqrt6}{2}i \ \leftrightarrow \ \left(-1,\ -\dfrac{\sqrt6}{2}\right)" />
      </>
    ),
    reason: <>On an Argand diagram the real part is the horizontal coordinate and the imaginary part the vertical one. <Katex tex="\tfrac{\sqrt6}{2}\approx1.22" />, so both points sit a little above and below <Katex tex="-1" />.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={argandSrc} alt="VCAA's Argand grid (−3 to 3, gridlines every 0.2) with the conjugate pair −1 ± (√6/2)i plotted and the circle of minimum radius through them, centred at −1" className="w-full max-w-[380px]" />
      </div>
    ),
    reason: <>The two points, together with the circle from part b.iii. drawn through them. Conjugate roots are always mirror images in the real axis. Plot them carefully against the gridlines: <Katex tex="\tfrac{\sqrt6}{2}\approx1.22" /> sits just above the <Katex tex="1.2" /> gridline — the report notes some students did not plot the points accurately relative to the supplied gridlines and scale.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="|z+m| = n \ \text{ is a circle of centre } -m \text{ and radius } n" />,
    reason: <><Katex tex="|z-c|=r" /> is the set of points at distance <Katex tex="r" /> from <Katex tex="c" />. Here the centre is <Katex tex="-m" /> because the expression is <Katex tex="z+m=z-(-m)" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{Minimum radius} \iff" />
        <Katex display tex="\text{the two points are ends of a diameter}" />
      </>
    ),
    reason: <>The segment joining the two points is a chord of any circle through them, and no chord is longer than a diameter. So the diameter is at least the distance between the points, and the smallest circle is the one where that segment <em>is</em> a diameter: centre at the midpoint, radius half the distance.</>,
    more: <>Drag the centre in the diagram below to see the radius grow as soon as the centre leaves the midpoint.</>,
  },
  {
    working: <Katex display tex="\text{midpoint} = \dfrac{\left(-1+\tfrac{\sqrt6}{2}i\right)+\left(-1-\tfrac{\sqrt6}{2}i\right)}{2} = -1" />,
    reason: <>The imaginary parts cancel — as they always do for a conjugate pair, so the centre lands on the real axis.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{radius} = \dfrac{1}{2}\left|\left(-1+\tfrac{\sqrt6}{2}i\right)-\left(-1-\tfrac{\sqrt6}{2}i\right)\right|" />
        <Katex display tex="= \dfrac{1}{2}\left|\sqrt6\,i\right| = \dfrac{\sqrt6}{2}" />
      </>
    ),
    reason: <>Half the distance between the two points.</>,
  },
  {
    working: <Katex display tex="\boxed{m=1, \qquad n=\dfrac{\sqrt6}{2}}" />,
    reason: <>Centre <Katex tex="-m=-1" /> gives <Katex tex="m=1" />. Check: <Katex tex="|z+1|" /> is <Katex tex="0" /> at <Katex tex="z=-1" />, so the centre really is <Katex tex="-1" />. The report notes <Katex tex="m=-1" /> was a common incorrect response.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="|z+1| = \dfrac{\sqrt6}{2} \ \text{ with } z=x+yi" />,
    reason: <>From part b.i., with <Katex tex="m=1" /> and <Katex tex="n=\tfrac{\sqrt6}{2}" />.</>,
  },
  {
    working: <Katex display tex="|(x+1)+yi| = \dfrac{\sqrt6}{2} \implies \sqrt{(x+1)^2+y^2} = \dfrac{\sqrt6}{2}" />,
    reason: <>The modulus of <Katex tex="X+Yi" /> is <Katex tex="\sqrt{X^2+Y^2}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{(x+1)^2+y^2 = \dfrac{3}{2}}" />,
    reason: <>Squaring: <Katex tex="\left(\tfrac{\sqrt6}{2}\right)^2=\tfrac{6}{4}=\tfrac32" />. Leave it in this form — the report notes algebraic errors from unnecessary attempts to isolate <Katex tex="y" />, and sign errors.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="2z^2+4z+d=0 \implies z = \dfrac{-4\pm\sqrt{16-8d}}{4}" />
        <Katex display tex="= -1\pm\dfrac{\sqrt{16-8d}}{4}" />
      </>
    ),
    reason: <>Quadratic formula again, with the new constant term.</>,
  },
  {
    working: <Katex display tex="\text{Require } |z+1| \le \dfrac{\sqrt6}{2}" />,
    reason: <>Both roots must lie on or inside the circle from part b. Conveniently every root has the form <Katex tex="-1+(\text{something})" />, so <Katex tex="|z+1|" /> is just the size of that something.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\textbf{Case 1: } 16-8d<0 \ (d>2)" />
        <Katex display tex="\implies z=-1\pm\dfrac{\sqrt{8d-16}}{4}i" />
      </>
    ),
    reason: <>A negative discriminant gives a conjugate pair displaced vertically from <Katex tex="-1" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\dfrac{\sqrt{8d-16}}{4}\le\dfrac{\sqrt6}{2} \implies \sqrt{8d-16}\le2\sqrt6" />
        <Katex display tex="8d-16\le24 \implies d\le5 \qquad\text{so } 2<d\le5" />
      </>
    ),
    reason: <>The modulus of <Katex tex="\pm\tfrac{\sqrt{8d-16}}{4}i" /> is <Katex tex="\tfrac{\sqrt{8d-16}}{4}" />; square both sides (both are non-negative).</>,
  },
  {
    working: (
      <>
        <Katex display tex="\textbf{Case 2: } 16-8d\ge0 \ (d\le2)" />
        <Katex display tex="\implies z=-1\pm\dfrac{\sqrt{16-8d}}{4} \ \text{(both real)}" />
      </>
    ),
    reason: <>This branch is easy to miss, but the question says <Katex tex="d\in R" /> and asks only that the solutions satisfy the relation — it never says they must be non-real. Real roots sit on the real axis and can perfectly well fall inside the circle.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\dfrac{\sqrt{16-8d}}{4}\le\dfrac{\sqrt6}{2} \implies 16-8d\le24" />
        <Katex display tex="-8d\le8 \implies d\ge-1 \qquad\text{so } -1\le d\le2" />
      </>
    ),
    reason: <>The same condition on the real distance <Katex tex="\tfrac{\sqrt{16-8d}}{4}" /> from <Katex tex="-1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{-1\le d\le5}" />,
    reason: <>Combining the two cases. Each case gave one end point: <Katex tex="d=-1" /> from the real roots, <Katex tex="d=5" /> from the non-real ones. Both cases really say the same thing, <Katex tex="\tfrac{\sqrt{|16-8d|}}{4}\le\tfrac{\sqrt6}{2}" />, i.e. <Katex tex="|16-8d|\le24" /> or <Katex tex="|d-2|\le3" />: an interval centred on <Katex tex="d=2" />, the value that gives a double root at the centre <Katex tex="-1" />. The report notes most students who reached a conclusion found only one end point of the interval.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="z = \dfrac{-b\pm\sqrt{b^2-4ac}}{2a}" />,
    reason: <>The general quadratic formula. Since the solutions are stated to have non-zero imaginary parts, <Katex tex="b^2-4ac<0" />.</>,
  },
  {
    working: <Katex display tex="= -\dfrac{b}{2a} \pm \dfrac{\sqrt{4ac-b^2}}{2a}\,i" />,
    reason: <>Write <Katex tex="\sqrt{b^2-4ac}=\sqrt{-(4ac-b^2)}=\sqrt{4ac-b^2}\,i" />, so the real and imaginary parts are visible separately.</>,
  },
  {
    working: <Katex display tex="\text{centre} = -\dfrac{b}{2a} \implies -p = -\dfrac{b}{2a} \implies \boxed{p=\dfrac{b}{2a}}" />,
    reason: <>Same reasoning as part b.: the roots are straight above and below <Katex tex="-\tfrac{b}{2a}" />, so the smallest circle through them is centred at that common real part. The centre of <Katex tex="|z+p|=|z-(-p)|" /> is <Katex tex="-p" />, not <Katex tex="p" />, so set <Katex tex="-p" /> equal to the real part.</>,
  },
  {
    working: <Katex display tex="\boxed{q = \left|\dfrac{\sqrt{4ac-b^2}}{2a}\right| = \dfrac{\sqrt{4ac-b^2}}{2|a|}}" />,
    reason: <>The radius is the distance from the centre to either root, which is the <em>size</em> of the imaginary part. If <Katex tex="a" /> is negative, <Katex tex="\tfrac{\sqrt{4ac-b^2}}{2a}" /> is negative, and a radius can't be. So the denominator is <Katex tex="2|a|" />, which is the report's answer. The report notes that not accounting for the sign of <Katex tex="a" /> was a common error, as was giving the negative of the correct <Katex tex="p" /> value.</>,
  },
]

export default function SpecialistQ2_2019Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (10 marks)</p>
      </div>

      <PartCard letter="a.i" topic="Complex Quadratic" marks={1} statement={<>Show that the solutions of <Katex tex="2z^2+4z+5=0" />, where <Katex tex="z\in C" />, are <Katex tex="z=-1\pm\dfrac{\sqrt6}{2}i" />.</>} examinerReport={EXAM_AI}>
        <WorkingTable rows={ROWS_AI} />
        <WrongMethod
          title="Substitute the given roots in and show the left side comes to 0"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="2\left(-1+\tfrac{\sqrt6}{2}i\right)^2+4\left(-1+\tfrac{\sqrt6}{2}i\right)+5" />
              <Katex display tex="=(-1-2\sqrt6\,i)+(-4+2\sqrt6\,i)+5=0" />
            </>
          }
        >
          The arithmetic is right, but it only <em>verifies</em> that the given values work. The report says a
          &lsquo;show that&rsquo; expects you to start from the given information (the equation) and show it leads to
          the conclusion. Solve the equation, by the quadratic formula or by completing the square, and arrive at{' '}
          <Katex tex="-1\pm\tfrac{\sqrt6}{2}i" />.
        </WrongMethod>
      </PartCard>

      <PartCard letter="a.ii" topic="Argand Diagram" marks={1} statement={<>Plot the solutions of <Katex tex="2z^2+4z+5=0" /> on the Argand diagram below.</>} examinerReport={EXAM_AII}>
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Let <Katex tex="|z+m|=n" />, where <Katex tex="m,n\in R" />, represent the
          circle of minimum radius that passes through the solutions of{' '}
          <Katex tex="2z^2+4z+5=0" />.
        </p>
      </div>

      <PartCard letter="b.i" topic="Circle Locus" marks={2} statement={<>Find <Katex tex="m" /> and <Katex tex="n" />.</>} examinerReport={EXAM_BI}>
        <Background>
          <p>
            <Katex tex="|z-c|=r" /> is the Argand-plane way of writing "all points at distance{' '}
            <Katex tex="r" /> from <Katex tex="c" />" — a circle. The smallest circle through two
            given points is the one having them at opposite ends of a diameter, so its centre is
            their midpoint and its radius is half the distance between them.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BI} />
        <Explore title="Why the smallest circle has the two roots at the ends of a diameter">
          <SmallestCircleWidget />
        </Explore>
        <WrongMethod
          title="|z + m| is a circle centred at m, and the centre is −1, so m = −1"
          source="Examiner's report"
          working={<Katex display tex="\text{centre } -1 \implies m=-1 \implies |z-1|=\tfrac{\sqrt6}{2}" />}
        >
          <Katex tex="|z-c|" /> is the distance from <Katex tex="c" />, so first write <Katex tex="|z+m|" /> as{' '}
          <Katex tex="|z-(-m)|" />: the centre is <Katex tex="-m" />. With <Katex tex="m=-1" /> the circle is centred
          at <Katex tex="+1" /> and misses both roots (turn on the slip in the diagram above). Quick check: the
          expression inside the modulus must be <Katex tex="0" /> at the centre, and <Katex tex="|-1+m|=0" /> needs{' '}
          <Katex tex="m=1" />.
        </WrongMethod>
      </PartCard>

      <PartCard letter="b.ii" topic="Cartesian Form" marks={1} statement={<>Find the cartesian equation of the circle <Katex tex="|z+m|=n" />.</>} examinerReport={EXAM_BII}>
        <WorkingTable rows={ROWS_BII} />
        <WrongMethod
          title="Centre −1, so the equation is (x − 1)² + y² = 3/2"
          source="Examiner's report"
          working={<Katex display tex="(x-1)^2+y^2=\tfrac32" />}
        >
          The report lists sign errors among the incorrect responses, and this is one of them.{' '}
          <Katex tex="(x-h)^2+(y-k)^2=r^2" /> has centre <Katex tex="(h,k)" />, so <Katex tex="(x-1)^2" /> puts the
          centre at <Katex tex="(1,0)" />. Don&apos;t reach for a formula at all: substitute <Katex tex="z=x+yi" /> into{' '}
          <Katex tex="|z+1|" /> and the <Katex tex="+1" /> lands next to <Katex tex="x" /> by itself. Check with a root:{' '}
          <Katex tex="(-1+1)^2+\left(\tfrac{\sqrt6}{2}\right)^2=\tfrac32" /> works, while{' '}
          <Katex tex="(-1-1)^2+\tfrac32\ne\tfrac32" />.
        </WrongMethod>
      </PartCard>

      <PartCard letter="b.iii" topic="Sketch Circle" marks={1} statement={<>Sketch the circle on the Argand diagram in <b>part a.ii.</b> Intercepts with the coordinate axes do not need to be calculated or labelled.</>} examinerReport={EXAM_BIII}>
        <WorkingTable rows={[{ working: <>Drawn on the diagram in part a.ii. above: a circle centred at <Katex tex="-1" /> on the real axis, of radius <Katex tex="\tfrac{\sqrt6}{2}\approx1.22" />, passing through both plotted roots.</>, reason: <>Because the roots are the ends of a diameter, the circle must touch both of them and be centred midway between — a useful self-check when sketching.</> }]} />
      </PartCard>

      <PartCard letter="c" topic="Roots in Region" marks={2} statement={<>Find all values of <Katex tex="d" />, where <Katex tex="d\in R" />, for which the solutions of <Katex tex="2z^2+4z+d=0" /> satisfy the relation <Katex tex="|z+m|\le n" />.</>} examinerReport={EXAM_C}>
        <Background>
          <p>
            The relation <Katex tex="|z+1|\le\tfrac{\sqrt6}{2}" /> describes the closed{' '}
            <em>disc</em> — the circle together with its inside. So the question is: for which{' '}
            <Katex tex="d" /> do both roots land inside or on that circle?
          </p>
          <p>
            The trap is assuming the roots must be complex. Changing <Katex tex="d" /> changes the
            discriminant, so for small enough <Katex tex="d" /> the roots become <em>real</em> —
            and real numbers near <Katex tex="-1" /> are inside the disc too. Both cases have to
            be checked — the report notes most students who reached a conclusion found only one
            end point of the interval.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <Explore title="Why there are two end points: the roots slide along the real axis, then up and down">
          <RootsVsDWidget />
        </Explore>
        <WrongMethod
          title="The roots must be complex, so the discriminant must be negative"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="16-8d<0 \implies d>2" />
              <Katex display tex="\tfrac{\sqrt{8d-16}}{4}\le\tfrac{\sqrt6}{2} \implies d\le5 \implies 2<d\le5" />
            </>
          }
        >
          The report says most students who reached a conclusion found only one end point of the interval, and this
          is one way that happens: it finds <Katex tex="d=5" /> but never <Katex tex="d=-1" />. The question asks for
          all <Katex tex="d\in R" />, and nothing says the roots are non-real. For <Katex tex="-1\le d\le2" /> the
          roots are real numbers between <Katex tex="-1-\tfrac{\sqrt6}{2}" /> and <Katex tex="-1+\tfrac{\sqrt6}{2}" />,
          which sit inside the circle on the real axis. Whenever a parameter changes the discriminant, check both signs
          of it.
        </WrongMethod>
      </PartCard>

      <PartCard letter="d" topic="Minimum Circle" marks={2} statement={<>All complex solutions of <Katex tex="az^2+bz+c=0" /> have non-zero real and imaginary parts.<br />Let <Katex tex="|z+p|=q" /> represent the circle of minimum radius in the complex plane that passes through these solutions, where <Katex tex="a,b,c,p,q\in R" />.<br />Find <Katex tex="p" /> and <Katex tex="q" /> in terms of <Katex tex="a" />, <Katex tex="b" /> and <Katex tex="c" />.</>} examinerReport={EXAM_D}>
        <Background>
          <p>
            Because <Katex tex="a,b,c" /> are real, non-real roots come as a conjugate pair{' '}
            <Katex tex="x\pm yi" />. Part b. already found the smallest circle through such a pair: centre{' '}
            <Katex tex="x" /> on the real axis, radius <Katex tex="|y|" />. So this part is part b. done with letters:
            find the real part and the size of the imaginary part of the roots, then match them to{' '}
            <Katex tex="|z+p|=q" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
        <Explore title="Centre at the real part, radius the size of the imaginary part, whatever the sign of a">
          <GeneralCircleWidget />
        </Explore>
        <WrongMethod
          title="The centre is −b/(2a), so p = −b/(2a)"
          source="Examiner's report"
          working={<Katex display tex="p=-\dfrac{b}{2a}" />}
        >
          This is the same slip as <Katex tex="m=-1" /> in part b.: <Katex tex="|z+p|" /> is centred at{' '}
          <Katex tex="-p" />. Test it on part b.&apos;s equation (<Katex tex="a=2,\ b=4" />): it gives{' '}
          <Katex tex="p=-1" />, but part b. found <Katex tex="m=1" />. Testing a general formula on a case you have
          already solved is the fastest check there is.
        </WrongMethod>
        <WrongMethod
          title="The imaginary part is √(4ac − b²)/(2a), so that is the radius"
          source="Examiner's report"
          working={<Katex display tex="q=\dfrac{\sqrt{4ac-b^2}}{2a}" />}
        >
          It works only when <Katex tex="a>0" />. Multiply part b.&apos;s equation by <Katex tex="-1" />:{' '}
          <Katex tex="-2z^2-4z-5=0" /> has the same roots and the same circle, but this formula gives{' '}
          <Katex tex="\tfrac{\sqrt{40-16}}{-4}=-\tfrac{\sqrt6}{2}" />, a negative radius. The radius is the{' '}
          <em>size</em> of the imaginary part, so divide by <Katex tex="2|a|" />.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
