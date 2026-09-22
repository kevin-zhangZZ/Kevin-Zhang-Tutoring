// 2020 Specialist Mathematics — Exam 2, Section B Question 3 (10 marks). x²e^(−x), its
// stationary points, asymptote and inflections, then the general family xⁿe^(−x) and how
// many inflections it has for each integer n. Question text transcribed from the original
// paper; the sketch is our own matplotlib drawing of the answer. Answers checked with
// sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import sketchSrc from './spec-2020e2-q3c-sketch.png'

const EXAM_A: SAExaminerStats = {
  marks: [1, 7, 91],
  average: 1.9,
  comment: (
    <>
      Students handled this question very well. Students who did not score well stated the
      derivative only and did not give the coordinates of the stationary points.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [27, 73],
  average: 0.7,
  comment: (
    <>
      Some students incorrectly gave an additional vertical asymptote such as{' '}
      <Katex tex="x=0" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [3, 11, 41, 45],
  average: 2.3,
  comment: (
    <>
      This question was done quite well, with the turning point almost universally correctly
      labelled. However, students lost marks either for sketching a poor shape in the second
      quadrant or for incorrectly labelling points of inflection, including having the{' '}
      <Katex tex="x" />-value of the left-most point of inflection rounded to 0.58 instead of
      0.59.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [9, 91],
  average: 0.9,
  comment: <>Students responded with a variety of correct forms for the second derivative.</>,
}

const EXAM_EI: SAExaminerStats = {
  marks: [11, 89],
  average: 0.9,
  comment: <>Students generally handled this question well.</>,
}

const EXAM_EII: SAExaminerStats = {
  marks: [84, 14, 2],
  average: 0.2,
  comment: (
    <>
      Some students gave intervals of real numbers for <Katex tex="n" />. The majority of
      responses indicated <Katex tex="n<0" /> gave zero points of inflection and{' '}
      <Katex tex="n=0" /> gave one point. However, very few students were able to distinguish
      between even and odd values of <Katex tex="n" /> when considering multiple points of
      inflection.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = x^2e^{-x}" />,
    reason: 'A product, so the product rule.',
  },
  {
    working: <Katex display tex="f'(x) = 2xe^{-x}+x^2\left(-e^{-x}\right) = \left(2x-x^2\right)e^{-x}" />,
    reason: <>The derivative of <Katex tex="e^{-x}" /> carries a minus sign.</>,
  },
  {
    working: <Katex display tex="f'(x) = 0: \ x(2-x)e^{-x} = 0" />,
    reason: <><Katex tex="e^{-x}>0" /> always, so only the bracket can vanish.</>,
  },
  {
    working: <Katex display tex="x = 0 \text{ or } x = 2" />,
    reason: 'Two stationary points.',
  },
  {
    working: <Katex display tex="\boxed{(0,\ 0) \ \text{ and } \ \left(2,\ \tfrac{4}{e^2}\right)}" />,
    reason: <>Coordinates, not just <Katex tex="x" />-values — the only thing that separated full marks from partial. <Katex tex="\tfrac{4}{e^2}\approx0.54" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="x\to\infty: \ e^{-x}\to0 \text{ faster than } x^2\to\infty" />,
    reason: 'The exponential always wins against a polynomial.',
  },
  {
    working: <Katex display tex="x\to-\infty: \ x^2e^{-x}\to+\infty" />,
    reason: 'No asymptote on this side — the graph shoots up.',
  },
  {
    working: <Katex display tex="\boxed{y = 0}" />,
    reason: <>One horizontal asymptote and nothing else. There is no vertical asymptote: the function is defined and finite at every real <Katex tex="x" />, including <Katex tex="x=0" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f''(x) = \left(2-2x\right)e^{-x}-\left(2x-x^2\right)e^{-x} = \left(x^2-4x+2\right)e^{-x}" />,
    reason: 'Differentiating part a. once more to locate the inflections the question asks to be labelled.',
  },
  {
    working: <Katex display tex="x^2-4x+2 = 0 \implies x = 2\pm\sqrt2" />,
    reason: <>So <Katex tex="x=0.5857\ldots" /> and <Katex tex="x=3.4142\ldots" />.</>,
  },
  {
    working: <Katex display tex="f\left(2-\sqrt2\right) = 0.1910\ldots, \quad f\left(2+\sqrt2\right) = 0.3835\ldots" />,
    reason: <>Rounding to two decimal places gives <Katex tex="(0.59,0.19)" /> and <Katex tex="(3.41,0.38)" /> — and <Katex tex="0.5857" /> rounds <em>up</em> to 0.59, the slip the report calls out.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          src={sketchSrc}
          alt="Graph of y = x²e^(−x): falling steeply from the top left to a minimum at the origin, rising to a local maximum near (2, 0.54), then decaying towards the x-axis, with the two inflection points marked"
          className="w-full max-w-[400px]"
        />
      </div>
    ),
    reason: 'The second-quadrant branch climbs steeply off the top of the grid — draw it steep, not flat. Three labelled points plus the asymptote earn the three marks.',
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = x^ne^{-x} \implies g'(x) = nx^{n-1}e^{-x}-x^ne^{-x}" />,
    reason: 'Product rule, keeping the index general.',
  },
  {
    working: <Katex display tex="g''(x) = n(n-1)x^{n-2}e^{-x}-nx^{n-1}e^{-x}-nx^{n-1}e^{-x}+x^ne^{-x}" />,
    reason: <>Differentiating each of the two terms; the middle contribution appears twice, which is where the <Katex tex="-2n" /> comes from.</>,
  },
  {
    working: <Katex display tex="\boxed{g''(x) = x^{n-2}\left(x^2-2nx+n(n-1)\right)e^{-x}}" />,
    reason: <>Factoring out the lowest power. Leaving it expanded as <Katex tex="\left(n(n-1)x^{n-2}-2nx^{n-1}+x^n\right)e^{-x}" /> is equally acceptable — but the factored form is what makes part e. easy.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="g''(x) = 0, \ x\ne0 \implies x^2-2nx+n(n-1) = 0" />,
    reason: <>The <Katex tex="x^{n-2}" /> factor and <Katex tex="e^{-x}" /> are set aside, which is exactly what "non-zero values" signals.</>,
  },
  {
    working: <Katex display tex="x = \frac{2n\pm\sqrt{4n^2-4n(n-1)}}{2} = n\pm\sqrt{n}" />,
    reason: <>The discriminant collapses beautifully: <Katex tex="4n^2-4n^2+4n=4n" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x = n-\sqrt n \ \text{ and } \ x = n+\sqrt n}" />,
    reason: <>Real only when <Katex tex="n\ge0" />; and <Katex tex="n-\sqrt n" /> is itself non-zero only for <Katex tex="n\ge2" />. (The report notes the restrictions were not required.)</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="n\le0: \ n\pm\sqrt n \text{ is not real (or gives } x=0), \text{ so } g'' \text{ never changes sign}" />,
    reason: <>For example <Katex tex="n=-1" />: <Katex tex="g''=x^{-3}\left(x^2+2x+2\right)e^{-x}" />, and that quadratic has no real roots. <b>0 points of inflection.</b></>,
  },
  {
    working: <Katex display tex="n=1: \ g''(x) = x^{-1}\cdot x(x-2)e^{-x} = (x-2)e^{-x}" />,
    reason: <>The root at <Katex tex="x=0" /> cancels against <Katex tex="x^{n-2}" />, leaving just one. <b>1 point of inflection.</b></>,
  },
  {
    working: <Katex display tex="n \text{ even}, \ n\ge2: \ x^{n-2} \text{ is an even power, so it does not change sign at } 0" />,
    reason: <>Only <Katex tex="n\pm\sqrt n" /> give concavity changes. <b>2 points of inflection</b> — e.g. <Katex tex="n=4" />: <Katex tex="g''=x^2(x-2)(x-6)e^{-x}" />.</>,
  },
  {
    working: <Katex display tex="n \text{ odd}, \ n\ge3: \ x^{n-2} \text{ is an odd power, so } g'' \text{ does change sign at } 0" />,
    reason: <>That adds the origin to the two roots. <b>3 points of inflection</b> — e.g. <Katex tex="n=3" />: <Katex tex="g''=x\left(x^2-6x+6\right)e^{-x}" />.</>,
  },
  {
    working: (
      <div className="overflow-x-auto">
        <table className="text-[13.5px] border-collapse">
          <thead>
            <tr className="text-left text-gray-500 dark:text-gray-400">
              <th className="border border-gray-200 dark:border-gray-800 px-3 py-1.5 font-semibold">
                Number of points of inflection
              </th>
              <th className="border border-gray-200 dark:border-gray-800 px-3 py-1.5 font-semibold">
                Value(s) of <Katex tex="n" /> (where <Katex tex="n\in Z" />)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-200 dark:border-gray-800 px-3 py-1.5">0</td>
              <td className="border border-gray-200 dark:border-gray-800 px-3 py-1.5">
                <Katex tex="n\le0" />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 dark:border-gray-800 px-3 py-1.5">1</td>
              <td className="border border-gray-200 dark:border-gray-800 px-3 py-1.5">
                <Katex tex="n=1" />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 dark:border-gray-800 px-3 py-1.5">2</td>
              <td className="border border-gray-200 dark:border-gray-800 px-3 py-1.5">
                <Katex tex="n=2,4,6,\ldots" />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-200 dark:border-gray-800 px-3 py-1.5">3</td>
              <td className="border border-gray-200 dark:border-gray-800 px-3 py-1.5">
                <Katex tex="n=3,5,7,\ldots" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
    reason: <>The completed table. Only 2% of students scored both marks — almost nobody split the cases by the parity of <Katex tex="n" />.</>,
  },
]

export default function SpecialistQ3_2020Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (10 marks)</p>
        <p>
          Let <Katex tex="f(x)=x^2e^{-x}" />.
        </p>
      </div>

      <PartCard
        letter="a"
        marks={2}
        statement={
          <>
            Find an expression for <Katex tex="f'(x)" /> and state the coordinates of the
            stationary points of <Katex tex="f(x)" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={1}
        statement={
          <>
            State the equation(s) of any asymptotes of <Katex tex="f(x)" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        marks={3}
        statement={
          <>
            Sketch the graph of <Katex tex="y=f(x)" /> on the axes provided, labelling the
            local maximum stationary point and all points of inflection with their
            coordinates, correct to two decimal places.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        <p>
          Let <Katex tex="g(x)=x^ne^{-x}" />, where <Katex tex="n\in Z" />.
        </p>
      </div>

      <PartCard
        letter="d"
        marks={1}
        statement={
          <>
            Write down an expression for <Katex tex="g''(x)" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e.i"
        marks={1}
        statement={
          <>
            Find the non-zero values of <Katex tex="x" /> for which{' '}
            <Katex tex="g''(x)=0" />.
          </>
        }
        examinerReport={EXAM_EI}
      >
        <WorkingTable rows={ROWS_EI} />
      </PartCard>

      <PartCard
        letter="e.ii"
        marks={2}
        statement={
          <>
            Complete a table stating the value(s) of <Katex tex="n" /> for which the graph of{' '}
            <Katex tex="g(x)" /> has 0, 1, 2 and 3 points of inflection.
          </>
        }
        examinerReport={EXAM_EII}
      >
        <WorkingTable rows={ROWS_EII} />
      </PartCard>
    </div>
  )
}
