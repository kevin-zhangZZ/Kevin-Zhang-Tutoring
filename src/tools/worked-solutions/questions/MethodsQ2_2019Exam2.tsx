// 2019 Mathematical Methods — Exam 2, Question 2 (11 marks).
// A zip-line cable above a hill modelled by y = 3x(x-30)²/2000 — the hill's gradient (parts
// a-b), the cable's rule where it runs 3 m above the hill (part c), where the cable's gradient
// matches the hill's average gradient (part d), and the join point A where the straight and
// curved sections meet smoothly (part e). Both diagrams are VCAA's own (blank-axes function
// sketches don't arise here), cropped directly from the exam paper. Question text transcribed
// from the original paper. Cross-checked against the VCAA examination report and itute's
// independent solutions, and independently re-derived (all numeric parts by CAS/computer
// algebra, matching both sources exactly). Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import hillSrc from './meth-2019exam2-q2-hill.png'
import hillCableSrc from './meth-2019exam2-q2-hill-cable.png'

const EXAM_A: SAExaminerStats = {
  marks: [7, 93],
  average: 1.0,
  comment: (
    <>
      This question was answered well. Common incorrect answers were{' '}
      <Katex tex="\dfrac{9x(x-30)(x-15)}{500}" /> and <Katex tex="\dfrac{9(x^2-40x+30)}{2000}" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [97, 3],
  average: 0.1,
  comment: (
    <>
      This question was not done well. Most students interpreted the question as asking where
      the function modelling the hill itself was strictly decreasing, rather than where its
      gradient was strictly decreasing — the most common incorrect response was{' '}
      <Katex tex="[10,30]" />, or a combination of round and square brackets with those two
      values.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [38, 62],
  average: 0.6,
  comment: <>This question was generally well done. Some students did not give an equation. Others added <Katex tex="10" />, instead of <Katex tex="3" />, to <Katex tex="f" />.</>,
}

const EXAM_D: SAExaminerStats = {
  marks: [41, 13, 9, 37],
  average: 1.4,
  comment: (
    <>
      A common incorrect answer for the average gradient was <Katex tex="\tfrac{3}{10}" /> (the
      sign was dropped). Some students gave approximate answers for the <Katex tex="x" />{' '}
      values, <Katex tex="14.23" /> and <Katex tex="25.77" />, instead of the exact forms.
    </>
  ),
}

const EXAM_EI: SAExaminerStats = {
  marks: [48, 52],
  average: 0.5,
  comment: <>The answer had to be given in terms of <Katex tex="a" />. Some students used <Katex tex="\tfrac{f(a)-10}{a}" /> instead of <Katex tex="\tfrac{h(a)-10}{a}" />.</>,
}

const EXAM_EII: SAExaminerStats = {
  marks: [69, 9, 6, 15],
  average: 0.7,
  comment: (
    <>
      Many students did not equate the correct expressions. Some students found the value of{' '}
      <Katex tex="a" /> but not the value of <Katex tex="b" />. Other students rounded their
      answers incorrectly, giving <Katex tex="(11.11,8.94)" />.
    </>
  ),
}

const EXAM_EIII: SAExaminerStats = {
  marks: [80, 20],
  average: 0.2,
  comment: <>Students who obtained the correct value for <Katex tex="a" /> in part (e)(ii) were generally successful with this question.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="y = \dfrac{3x(x-30)^2}{2000} = \dfrac{3}{2000}\Bigl[x(x-30)^2\Bigr]" />,
  },
  {
    working: <Katex display tex="\dfrac{dy}{dx} = \dfrac{3}{2000}\Bigl[(x-30)^2+2x(x-30)\Bigr] = \dfrac{3}{2000}(x-30)(3x-30)" />,
    reason: <>Product rule on <Katex tex="x\cdot(x-30)^2" />, then factor out <Katex tex="(x-30)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\dfrac{dy}{dx} = \dfrac{9(x-30)(x-10)}{2000}}" />,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={hillSrc} alt="The hill y = 3x(x-30)²/2000 on x ∈ [0,30], peaking at (10,6)" className="w-full max-w-[420px]" />
      </div>
    ),
    reason: <>The hill's own graph, for reference — the gradient is a separate function, <Katex tex="\tfrac{dy}{dx}=\tfrac{9(x-30)(x-10)}{2000}" />, an upward parabola in <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\dfrac{d}{dx}\left(\dfrac{dy}{dx}\right) = \dfrac{9(2x-40)}{2000}" />,
    reason: <>The gradient is strictly decreasing where its own derivative is negative.</>,
  },
  {
    working: <Katex display tex="\dfrac{9(2x-40)}{2000}<0 \iff x<20" />,
  },
  {
    working: <Katex display tex="\boxed{x\in(0,20]}" />,
    reason: <>Restricted to the hill's domain <Katex tex="x\in[0,30]" />, with the left endpoint excluded.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={hillCableSrc} alt="The hill with the cable 3 m above it, straight for 0≤x≤a and joining the curved section at A(a,b)" className="w-full max-w-[480px]" />
      </div>
    ),
  },
  {
    working: <Katex display tex="\boxed{h(x) = \dfrac{3x(x-30)^2}{2000}+3} \quad \text{for } x\in[a,30]" />,
    reason: <>The cable runs exactly <Katex tex="3" /> m vertically above the hill on this stretch.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Average gradient of the hill on } [10,30] = \dfrac{y(30)-y(10)}{30-10} = \dfrac{0-6}{20} = -\dfrac{3}{10}" />,
  },
  {
    working: <Katex display tex="\dfrac{9(x-30)(x-10)}{2000} = -\dfrac{3}{10}" />,
    reason: <>The cable's gradient on <Katex tex="[a,30]" /> is <Katex tex="h'(x)=y'(x)" /> (a vertical shift doesn't change the gradient).</>,
  },
  {
    working: <Katex display tex="3x^2-120x+1100=0" />,
  },
  {
    working: <Katex display tex="\boxed{x = 20-\dfrac{10\sqrt3}{3} \approx 14.23 \quad \text{or} \quad x=20+\dfrac{10\sqrt3}{3}\approx25.77}" />,
    reason: <>Quadratic formula; both solutions lie in <Katex tex="[10,30]" />.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="\boxed{\text{Gradient of the cable at } A = \dfrac{9(a-30)(a-10)}{2000}}" />,
    reason: <>Same rule as part (a), evaluated at <Katex tex="x=a" /> (the curved section is <Katex tex="h(x)=y(x)+3" />, which has the same gradient as <Katex tex="y" />).</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Straight section's gradient} = \dfrac{b-10}{a}, \qquad b=h(a)=\dfrac{3a(a-30)^2}{2000}+3" />,
    reason: <>The straight section joins <Katex tex="(0,10)" /> to <Katex tex="A(a,b)" />.</>,
  },
  {
    working: <Katex display tex="\dfrac{h(a)-10}{a} = \dfrac{9(a-30)(a-10)}{2000}" />,
    reason: <>For a smooth join, the straight section's gradient must equal the curved section's gradient at <Katex tex="A" /> (part e.i).</>,
  },
  {
    working: <Katex display tex="\text{Solve for } a \text{ (by CAS)}" />,
  },
  {
    working: <Katex display tex="\boxed{A \approx (11.12,\ 8.95)} \text{, correct to two decimal places}" />,
  },
]

const ROWS_EIII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Gradient at } A = \dfrac{9(11.12-30)(11.12-10)}{2000}" />,
    reason: <>Substitute <Katex tex="a\approx11.12" /> from part (e)(ii) into part (e)(i)'s expression.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx -0.1} \text{, correct to one decimal place}" />,
  },
]

export default function MethodsQ2_2019Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (11 marks)</p>
        <p className="mb-2">
          An amusement park is planning to build a zip-line above a hill on its property. The
          hill is modelled by <Katex tex="y=\dfrac{3x(x-30)^2}{2000},\ x\in[0,30]" />, where{' '}
          <Katex tex="x" /> is the horizontal distance, in metres, from an origin and{' '}
          <Katex tex="y" /> is the height, in metres, above this origin.
        </p>
      </div>

      <PartCard letter="a" marks={1} statement={<>Find <Katex tex="\dfrac{dy}{dx}" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" marks={1} statement="State the set of values for which the gradient of the hill is strictly decreasing." examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The cable for the zip-line is connected to a pole at the origin at a height of{' '}
          <Katex tex="10" /> m and is straight for <Katex tex="0\le x\le a" />, where{' '}
          <Katex tex="10\le a\le20" />. The straight section joins the curved section at{' '}
          <Katex tex="A(a,b)" />. The cable is then exactly <Katex tex="3" /> m vertically above
          the hill from <Katex tex="a\le x\le30" />.
        </p>
      </div>

      <PartCard letter="c" marks={1} statement={<>State the rule, in terms of <Katex tex="x" />, for the height of the cable above the horizontal axis for <Katex tex="x\in[a,30]" />.</>} examinerReport={EXAM_C}>
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard letter="d" marks={3} statement={<>Find the values of <Katex tex="x" /> for which the gradient of the cable is equal to the average gradient of the hill for <Katex tex="x\in[10,30]" />.</>} examinerReport={EXAM_D}>
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The gradients of the straight and curved sections of the cable approach the same
          value at <Katex tex="x=a" />, so there is a continuous and smooth join at{' '}
          <Katex tex="A" />.
        </p>
      </div>

      <PartCard letter="e.i" marks={1} statement={<>State the gradient of the cable at <Katex tex="A" />, in terms of <Katex tex="a" />.</>} examinerReport={EXAM_EI}>
        <WorkingTable rows={ROWS_EI} />
      </PartCard>

      <PartCard letter="e.ii" marks={3} statement={<>Find the coordinates of <Katex tex="A" />, with each value correct to two decimal places.</>} examinerReport={EXAM_EII}>
        <WorkingTable rows={ROWS_EII} />
      </PartCard>

      <PartCard letter="e.iii" marks={1} statement="Find the value of the gradient at A, correct to one decimal place." examinerReport={EXAM_EIII}>
        <WorkingTable rows={ROWS_EIII} />
      </PartCard>
    </div>
  )
}
