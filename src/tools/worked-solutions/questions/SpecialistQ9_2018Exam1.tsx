// 2018 Specialist Mathematics — Exam 1, Question 9 (5 marks). A parametric hyperbola
// converted to cartesian form, its intersections with a line, and the volume of the solid
// of revolution between them. Question text transcribed from the original paper (no diagram
// given). Answers checked independently with sympy and against the VCAA examination report.
//
// Note: the first pass integrated (line² − curve²) and got a negative volume. The curve is
// the outer boundary on [1, 3], so the correct integrand is (curve² − line²), giving 2π/3.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [13, 14, 73],
  average: 1.6,
  comment: (
    <>
      This question was answered well, with most students realising that a substitution into
      a trigonometric identity was required.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [30, 70],
  average: 0.7,
  comment: (
    <>
      Students needed to substitute <Katex tex="y=x-1" /> into the equation{' '}
      <Katex tex="x^2-2y^2=1" /> and solve the resulting quadratic equation for{' '}
      <Katex tex="x" />. A number of students gave the coordinates of the points of
      intersection and in some cases did not do this correctly.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [60, 21, 19],
  average: 0.6,
  comment: (
    <>
      Students found this question challenging. Some students did not apply the formula for
      the volume of a solid of revolution correctly. Many students made algebraic or
      arithmetic errors. A small number of students realised that the volume required could
      be found by finding the volume obtained by rotating the region bounded by the
      hyperbola.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x = \sec(t), \qquad y = \frac{\sqrt2}{2}\tan(t)" />,
    reason: <>Given parametrically. Eliminate <Katex tex="t" /> using an identity that links <Katex tex="\sec" /> and <Katex tex="\tan" />.</>,
  },
  {
    working: <Katex display tex="\sec^2(t) - \tan^2(t) = 1" />,
    reason: <>The Pythagorean identity in the form that matches these two functions — divide <Katex tex="\sin^2+\cos^2=1" /> by <Katex tex="\cos^2" /> to derive it if needed.</>,
  },
  {
    working: <Katex display tex="x^2 = \sec^2(t), \qquad y^2 = \frac12\tan^2(t) \implies \tan^2(t) = 2y^2" />,
    reason: <><Katex tex="\left(\tfrac{\sqrt2}{2}\right)^2=\tfrac12" />, so squaring <Katex tex="y" /> and multiplying by <Katex tex="2" /> recovers <Katex tex="\tan^2(t)" />.</>,
  },
  {
    working: <Katex display tex="x^2 - 2y^2 = \sec^2(t)-\tan^2(t) = 1 \ \checkmark" />,
    reason: <>Substituting both into the identity. On a "show that", write the final line explicitly rather than stopping at the substitution.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="x^2 - 2(x-1)^2 = 1" />,
    reason: <>Substituting <Katex tex="y=x-1" /> into the cartesian equation.</>,
  },
  {
    working: <Katex display tex="x^2 - 2\left(x^2-2x+1\right) = 1 \implies -x^2+4x-2 = 1" />,
    reason: <>Expanding. Watch the <Katex tex="-2" /> multiplying every term in the bracket.</>,
  },
  {
    working: <Katex display tex="x^2-4x+3 = 0 \implies (x-1)(x-3) = 0" />,
    reason: <>Tidying into standard form and factorising.</>,
  },
  {
    working: <Katex display tex="\boxed{x = 1 \ \text{ and } \ x = 3}" />,
    reason: <>The question asks for the <Katex tex="x" />-coordinates only — the report notes students who supplied full coordinate pairs, sometimes wrongly. (For reference the points are <Katex tex="(1,0)" /> and <Katex tex="(3,2)" />.)</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\int_a^b \left(y_{\text{outer}}^2 - y_{\text{inner}}^2\right)dx" />,
    reason: <>Rotating a region between two curves about the <Katex tex="x" />-axis gives a washer: the outer radius sweeps a solid and the inner one removes a core.</>,
  },
  {
    working: <Katex display tex="\text{At } x=2: \ \text{curve } y^2 = \frac{x^2-1}{2} = \frac32; \quad \text{line } y^2 = (x-1)^2 = 1" />,
    reason: <>Test a point inside the interval to see which is further from the axis. The <em>curve</em> is outer, so it goes first — getting this order backwards produces a negative volume, which is the clearest possible signal something is wrong.</>,
  },
  {
    working: <Katex display tex="V = \pi\int_1^3\left(\frac{x^2-1}{2} - (x-1)^2\right)dx" />,
    reason: <>From part (a), <Katex tex="x^2-2y^2=1" /> rearranges to <Katex tex="y^2=\tfrac{x^2-1}{2}" /> — there is no need to solve for <Katex tex="y" /> itself, since only <Katex tex="y^2" /> appears.</>,
  },
  {
    working: <Katex display tex="\frac{x^2-1}{2}-(x-1)^2 = \frac{x^2-1-2x^2+4x-2}{2} = \frac{-x^2+4x-3}{2}" />,
    reason: <>Combining over a common denominator of <Katex tex="2" />.</>,
  },
  {
    working: <Katex display tex="V = \frac{\pi}{2}\left[-\frac{x^3}{3}+2x^2-3x\right]_1^3" />,
    reason: <>Antidifferentiating term by term.</>,
  },
  {
    working: <Katex display tex="= \frac{\pi}{2}\left[(-9+18-9) - \left(-\frac13+2-3\right)\right] = \frac{\pi}{2}\left[0+\frac43\right]" />,
    reason: <>The upper terminal contributes exactly zero, which is a useful sign the algebra is right.</>,
  },
  {
    working: <Katex display tex="\boxed{V = \frac{2\pi}{3}}" />,
    reason: <>Positive, as any volume must be. (<Katex tex="\approx2.09" /> cubic units.) Only <Katex tex="19\%" /> of the state scored both marks.</>,
  },
]

export default function SpecialistQ9_2018Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 9 (5 marks)</p>
        <p>
          A curve is specified parametrically by{' '}
          <Katex tex="\underset{\sim}{r}(t)=\sec(t)\,\underset{\sim}{i}+\dfrac{\sqrt2}{2}\tan(t)\,\underset{\sim}{j},\ t\in\mathbb{R}" />.
        </p>
      </div>

      <PartCard letter="a" marks={2} statement={<>Show that the cartesian equation of the curve is <Katex tex="x^2-2y^2=1" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" marks={1} statement={<>Find the <Katex tex="x" />-coordinates of the points of intersection of the curve <Katex tex="x^2-2y^2=1" /> and the line <Katex tex="y=x-1" />.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard letter="c" marks={2} statement={<>Find the volume of the solid of revolution formed when the region bounded by the curve and the line is rotated about the <Katex tex="x" />-axis.</>} examinerReport={EXAM_C}>
        <Background>
          <p>
            Two things make this manageable. First, the formula needs{' '}
            <Katex tex="y^2" />, not <Katex tex="y" />, and part (a) hands you{' '}
            <Katex tex="y^2=\tfrac{x^2-1}{2}" /> directly — no square roots ever appear.
          </p>
          <p>
            Second, decide which curve is <em>outer</em> before writing the integral. Test one
            interior point. If the answer comes out negative, the order was wrong: a volume
            cannot be negative, so that is a free check the report suggests students did not
            always make.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
