// 2023 Mathematical Methods — Exam 2, Section B Question 1 (11 marks). A cubic in factorised
// form: intercepts, stationary points, the area it cuts with a line, and the shift that gives
// it a repeated root. Question text transcribed from the original paper; the stem figure is a
// crop of VCAA's own artwork and the region figure is this site's own explanatory graph. Answers checked with sympy and
// against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import graphSrc from './meth-2023e2-q1-graph.png'
import regionSrc from './meth-2023e2-q1c-region.png'

const EXAM_A: SAExaminerStats = {
  marks: [9, 91],
  average: 0.9,
  comment: <>This question was answered well. Coordinates were required.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [6, 25, 68],
  average: 1.6,
  comment: (
    <>
      Some students only gave the <Katex tex="x" /> values. Exact answers were required.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [14, 86],
  average: 0.9,
  comment: (
    <>
      Some students incorrectly transcribed <Katex tex="x=\tfrac{-1\pm\sqrt5}{2}" /> from
      their technology, giving the answer <Katex tex="x=\pm\tfrac{\sqrt5-1}{2}" />. Exact
      answers were required.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [25, 15, 61],
  average: 1.4,
  comment: (
    <>
      Some students only gave one of the definite integrals.{' '}
      <Katex tex="\int_{\frac{-\sqrt5-1}{2}}^{2}\bigl(f(x)-g(x)\bigr)dx" /> was a common
      incorrect answer. There were a lot of sign errors, where students were subtracting the
      equations the wrong way around. Some unsuccessfully split the integrals into extra
      parts.
    </>
  ),
}

const EXAM_CIII: SAExaminerStats = {
  marks: [42, 58],
  average: 0.6,
  comment: (
    <>
      Students who set up the definite integrals correctly in part cii. were generally
      successful with this question. <Katex tex="5.94" /> was a common incorrect answer.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [61, 11, 9, 6, 13],
  average: 1.0,
  comment: (
    <>
      This question was not done well. There were many different approaches taken. Those who
      used method 1 were generally successful. Those who used method 2 often had sign errors
      in their expressions for <Katex tex="k" />. Exact answers were required. Some students
      only gave one set of values for <Katex tex="a" /> and <Katex tex="b" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = x(x-2)(x+1) = 0 \implies x = 0,\ 2,\ -1" />,
    reason: <>Already factorised, so the null factor law gives the x-intercepts immediately.</>,
  },
  {
    working: <Katex display tex="f(0) = 0" />,
    reason: <>The y-intercept, which here coincides with one of the x-intercepts.</>,
  },
  {
    working: <Katex display tex="\boxed{(-1,\,0),\ (0,\,0),\ (2,\,0)}" />,
    reason: <>Coordinates, not just values — the report notes coordinates were required.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = x\left(x^2-x-2\right) = x^3-x^2-2x" />,
    reason: <>Expanding first makes the derivative a one-liner.</>,
  },
  {
    working: <Katex display tex="f'(x) = 3x^2-2x-2 = 0" />,
    reason: <>Stationary points.</>,
  },
  {
    working: <Katex display tex="x = \frac{2\pm\sqrt{4+24}}{6} = \frac{2\pm2\sqrt7}{6} = \frac{1\pm\sqrt7}{3}" />,
    reason: <>Quadratic formula, then cancelling the factor of 2. About <Katex tex="-0.549" /> and <Katex tex="1.215" />.</>,
  },
  {
    working: <Katex display tex="f\!\left(\frac{1-\sqrt7}{3}\right) = \frac{14\sqrt7-20}{27} = \frac{2\left(7\sqrt7-10\right)}{27}" />,
    reason: <>About <Katex tex="0.631" /> — the local maximum. Exact values are required, so keep the surds rather than reading decimals off the screen.</>,
  },
  {
    working: <Katex display tex="f\!\left(\frac{1+\sqrt7}{3}\right) = \frac{-14\sqrt7-20}{27} = -\frac{2\left(7\sqrt7+10\right)}{27}" />,
    reason: <>About <Katex tex="-2.113" /> — the local minimum.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(\tfrac{1-\sqrt7}{3},\ \tfrac{2\left(7\sqrt7-10\right)}{27}\right) \ \text{ and } \ \left(\tfrac{1+\sqrt7}{3},\ -\tfrac{2\left(7\sqrt7+10\right)}{27}\right)}" />,
    reason: <>Both coordinates of both points — the report notes some students only gave the <Katex tex="x" /> values. Its general comments also flag transcription slips here, such as writing <Katex tex="-\tfrac{\sqrt7}{3}+1" /> for <Katex tex="\tfrac{-\sqrt7+1}{3}" />.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="x^3-x^2-2x = x-2 \implies x^3-x^2-3x+2 = 0" />,
    reason: <>Everything to one side.</>,
  },
  {
    working: <Katex display tex="x=2: \ 8-4-6+2 = 0 \implies (x-2) \text{ is a factor}" />,
    reason: <>Spotted by inspection, or straight from a CAS.</>,
  },
  {
    working: <Katex display tex="x^3-x^2-3x+2 = (x-2)\left(x^2+x-1\right)" />,
    reason: <>Dividing out the known factor.</>,
  },
  {
    working: <Katex display tex="x^2+x-1 = 0 \implies x = \frac{-1\pm\sqrt5}{2}" />,
    reason: <>The whole numerator is over 2 — the report notes some students transcribed this as <Katex tex="x=\pm\tfrac{\sqrt5-1}{2}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \frac{-1-\sqrt5}{2},\quad x = \frac{-1+\sqrt5}{2},\quad x = 2}" />,
    reason: <>About <Katex tex="-1.618" />, <Katex tex="0.618" /> and <Katex tex="2" /> — three crossings, so two bounded regions.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          src={regionSrc}
          alt="The cubic and the line y = x − 2 crossing three times, with the two regions between them shaded: the cubic above the line on the left region and below it on the right"
          className="w-full max-w-[440px]"
        />
      </div>
    ),
    reason: <>The two regions bound by <Katex tex="f" /> and <Katex tex="g" />, between the three intersections from part c.i.</>,
  },
  {
    working: <Katex display tex="\text{On } \left(\tfrac{-1-\sqrt5}{2},\ \tfrac{-1+\sqrt5}{2}\right): \ f(x) > g(x)" />,
    reason: <>Test <Katex tex="x=0" />: <Katex tex="f(0)=0" /> and <Katex tex="g(0)=-2" />. The cubic is on top over the left region.</>,
  },
  {
    working: <Katex display tex="\text{On } \left(\tfrac{-1+\sqrt5}{2},\ 2\right): \ g(x) > f(x)" />,
    reason: <>Test <Katex tex="x=1" />: <Katex tex="f(1)=-2" /> and <Katex tex="g(1)=-1" />. They swap over, which is why two integrals are needed.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\boxed{A = \int_{\frac{-1-\sqrt5}{2}}^{\frac{-1+\sqrt5}{2}}\bigl(f(x)-g(x)\bigr)dx+\int_{\frac{-1+\sqrt5}{2}}^{2}\bigl(g(x)-f(x)\bigr)dx}"
      />
    ),
    reason: <>Upper minus lower on each piece. Both integrals are needed — the report notes some students only gave one.</>,
  },
  {
    working: <Katex display tex="\text{or } A = \int_{\frac{-1-\sqrt5}{2}}^{2}\bigl|f(x)-g(x)\bigr|\,dx" />,
    reason: <>A single integral with a modulus is equally acceptable. Without the modulus, <Katex tex="\int_{\frac{-1-\sqrt5}{2}}^{2}\bigl(f(x)-g(x)\bigr)dx" /> was a common incorrect answer, the report notes — the right-hand region counts negatively.</>,
  },
]

const ROWS_CIII: WorkingRow[] = [
  {
    working: (
      <Cas fn="nInt">
        nInt(abs((x³−x²−2x)−(x−2)), x, (−1−√5)/2, 2)
      </Cas>
    ),
    reason: <>Evaluating the expression from part c.ii. Keep the terminals exact so no rounding creeps in.</>,
  },
  {
    working: <Katex display tex="A = 5.94604\ldots" />,
    reason: <>The unrounded value.</>,
  },
  {
    working: <Katex display tex="\boxed{A \approx 5.95 \ \text{square units}}" />,
    reason: <>Correct to two decimal places: <Katex tex="5.946\ldots" /> rounds up. The report notes <Katex tex="5.94" /> was a common incorrect answer.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="(x-a)(x-b)^2 = x^3-(a+2b)x^2+\left(2ab+b^2\right)x-ab^2" />,
    reason: <>Expand the target form so its coefficients can be compared.</>,
  },
  {
    working: <Katex display tex="f(x)+k = x^3-x^2-2x+k" />,
    reason: <>Adding <Katex tex="k" /> moves the graph vertically, so only the constant term changes.</>,
  },
  {
    working: <Katex display tex="x^2: \ -(a+2b) = -1 \implies a+2b = 1" />,
    reason: <>The <Katex tex="x^3" /> coefficients already match, so start here.</>,
  },
  {
    working: <Katex display tex="x^1: \ 2ab+b^2 = -2" />,
    reason: <>The second equation. The constant term only determines <Katex tex="k" />, which the question does not ask for.</>,
  },
  {
    working: <Katex display tex="a = 1-2b \implies 2b(1-2b)+b^2 = -2 \implies 3b^2-2b-2 = 0" />,
    reason: <>Substituting and tidying: <Katex tex="2b-4b^2+b^2+2=0" />.</>,
  },
  {
    working: <Katex display tex="b = \frac{2\pm\sqrt{4+24}}{6} = \frac{1\pm\sqrt7}{3}" />,
    reason: <>The same surds as part b. — and that is no accident: a repeated root of <Katex tex="h" /> is a turning point of <Katex tex="f" /> shifted onto the <Katex tex="x" />-axis.</>,
  },
  {
    working: <Katex display tex="\boxed{a = \frac{1-2\sqrt7}{3},\ b = \frac{1+\sqrt7}{3} \quad\text{or}\quad a = \frac{1+2\sqrt7}{3},\ b = \frac{1-\sqrt7}{3}}" />,
    reason: <>From <Katex tex="a=1-2b" />. Both sets — the report notes some students only gave one set of values for <Katex tex="a" /> and <Katex tex="b" />.</>,
  },
]

export default function MethodsQ1_2023Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (11 marks)</p>
        <p>
          Let <Katex tex="f:R\to R" />,{' '}
          <Katex tex="f(x)=x(x-2)(x+1)" />. Part of the graph of <Katex tex="f" /> is shown
          below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="A positive cubic crossing the x-axis three times, with a local maximum just left of the y-axis and a local minimum to its right — from the original 2023 VCAA exam paper"
            className="w-full max-w-[460px]"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            The surds <Katex tex="\tfrac{1\pm\sqrt7}{3}" /> show up in part b. and again in
            part d., and that is the structure of the question. Adding <Katex tex="k" /> to{' '}
            <Katex tex="f" /> slides the curve up or down; it has a repeated root exactly when
            a turning point lands on the <Katex tex="x" />-axis, so the repeated root{' '}
            <Katex tex="b" /> <em>is</em> a stationary <Katex tex="x" />-value.
          </p>
          <p>
            Every numerical answer here except part c.iii. must be exact — the report repeats
            "Exact answers were required" for parts b., c.i. and d. Reading a decimal off the
            CAS and stopping there costs the mark.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        topic="Intercepts"
        marks={1}
        statement={<>State the coordinates of all axial intercepts of <Katex tex="f" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Stationary Points"
        marks={2}
        statement={<>Find the coordinates of the stationary points of <Katex tex="f" />.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c.i"
        topic="Intersections"
        marks={1}
        statement={
          <>
            Let <Katex tex="g:R\to R" />, <Katex tex="g(x)=x-2" />.
            <br />
            Find the values of <Katex tex="x" /> for which <Katex tex="f(x)=g(x)" />.
          </>
        }
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Definite Integral"
        marks={2}
        statement={
          <>
            Write down an expression using definite integrals that gives the area of the
            regions bound by <Katex tex="f" /> and <Katex tex="g" />.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <PartCard
        letter="c.iii"
        topic="Area Between Curves"
        marks={1}
        statement={
          <>
            Hence, find the total area of the regions bound by <Katex tex="f" /> and{' '}
            <Katex tex="g" />, correct to two decimal places.
          </>
        }
        examinerReport={EXAM_CIII}
      >
        <WorkingTable rows={ROWS_CIII} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Repeated Root"
        marks={4}
        statement={
          <>
            Let <Katex tex="h:R\to R" />,{' '}
            <Katex tex="h(x)=(x-a)(x-b)^2" />, where <Katex tex="h(x)=f(x)+k" /> and{' '}
            <Katex tex="a,b,k\in R" />.
            <br />
            Find the possible values of <Katex tex="a" /> and <Katex tex="b" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>
    </div>
  )
}
