// 2024 Mathematical Methods — Exam 1 Question 8 (7 marks). A translated cube-root curve:
// its y-intercept, the gradient there, and the second point with the same gradient. Question
// text transcribed from the original paper. Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [39, 61],
  average: 0.6,
  comment: (
    <>
      Many students attained the <Katex tex="y" /> value of the intercept but did not write
      the answer in coordinate form. Some demonstrated difficulties with a negative sign
      inside a cube root, and some incorrectly wrote the radical as{' '}
      <Katex tex="\sqrt[3]{-k}+m" /> with the sign misplaced, which led to errors later.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [55, 13, 32],
  average: 0.8,
  comment: (
    <>
      Some students confused the process and integrated instead of differentiating, leading
      to an incorrect power of <Katex tex="\tfrac43" />. Many calculated{' '}
      <Katex tex="g'(0)" /> but mistakenly took the negative sign out, leaving{' '}
      <Katex tex="-\tfrac{1}{3k^{2/3}}" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [53, 47],
  average: 0.5,
  comment: <>This question was well attempted.</>,
}

const EXAM_D: SAExaminerStats = {
  marks: [74, 15, 2, 9],
  average: 0.5,
  comment: (
    <>
      Very few students were able to view this question visually; however, those who did
      usually achieved success. Many students noted they needed to equate derivatives from
      earlier questions, but some had incorrect derivatives or used incorrect procedures to
      solve for <Katex tex="x=2m^3" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="P \text{ is the } y\text{-intercept} \implies x = 0" />,
    reason: 'Substitute and simplify.',
  },
  {
    working: <Katex display tex="g(0) = \sqrt[3]{0-k}+m = \sqrt[3]{-k}+m" />,
    reason: <>The cube root of a negative is fine — cube root is defined for all reals, unlike a square root.</>,
  },
  {
    working: <Katex display tex="\sqrt[3]{-k} = -\sqrt[3]{k}" />,
    reason: <>Because <Katex tex="x\mapsto x^3" /> is odd. Writing <Katex tex="\sqrt[3]{-k}+m" /> and then mishandling the sign is what the report says caused trouble downstream.</>,
  },
  {
    working: <Katex display tex="\boxed{P\left(0,\ m-\sqrt[3]{k}\right)}" />,
    reason: <>In coordinate form, with brackets — the mark is for the point, not just the <Katex tex="y" /> value.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = (x-k)^{\frac13}+m" />,
    reason: 'Index form makes the differentiation routine.',
  },
  {
    working: <Katex display tex="g'(x) = \frac13(x-k)^{-\frac23}" />,
    reason: <>Subtract 1 from the index: <Katex tex="\tfrac13-1=-\tfrac23" />. An index of <Katex tex="\tfrac43" /> would mean you integrated.</>,
  },
  {
    working: <Katex display tex="g'(0) = \frac13(-k)^{-\frac23} = \frac{1}{3(-k)^{\frac23}}" />,
    reason: 'Substituting the x-coordinate of P.',
  },
  {
    working: <Katex display tex="(-k)^{\frac23} = \left((-k)^2\right)^{\frac13} = \left(k^2\right)^{\frac13} = k^{\frac23}" />,
    reason: <>The <em>even</em> power inside removes the sign, so the gradient is positive. Pulling a minus out front is the report's named error.</>,
  },
  {
    working: <Katex display tex="\boxed{g'(0) = \frac{1}{3k^{\frac23}}}" />,
    reason: <>Equivalently <Katex tex="\tfrac{1}{3\sqrt[3]{k^2}}" /> or <Katex tex="\tfrac13k^{-2/3}" />; any correct form was accepted.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Through the origin} \implies g(0) = 0" />,
    reason: <>So the point <Katex tex="P" /> from part a. <em>is</em> the origin.</>,
  },
  {
    working: <Katex display tex="m-\sqrt[3]{k} = 0 \implies \sqrt[3]{k} = m" />,
    reason: 'Rearranging part a.',
  },
  {
    working: <Katex display tex="\boxed{k = m^3}" />,
    reason: <>Cubing both sides. Note this needs <Katex tex="m\ne0" />, consistent with <Katex tex="k\ne0" />.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="g'(x) = g'(0) \implies \frac13(x-k)^{-\frac23} = \frac13(-k)^{-\frac23}" />,
    reason: 'Equal gradients at Q and at P.',
  },
  {
    working: <Katex display tex="(x-k)^{-\frac23} = (-k)^{-\frac23} \implies (x-k)^2 = (-k)^2" />,
    reason: <>Raising both sides to the power <Katex tex="-\tfrac32" />. The square is the key: it admits two solutions.</>,
  },
  {
    working: <Katex display tex="|x-k| = |k| \implies x = 0 \ \text{ or } \ x = 2k" />,
    reason: <>The graph of <Katex tex="g'" /> is symmetric about <Katex tex="x=k" />, so the two points with equal gradient sit equally far either side of it. <Katex tex="x=0" /> is <Katex tex="P" />; the new point is <Katex tex="x=2k" />.</>,
  },
  {
    working: <Katex display tex="k = m^3 \implies x = 2m^3" />,
    reason: 'Using part c.',
  },
  {
    working: <Katex display tex="g\!\left(2m^3\right) = \sqrt[3]{2m^3-m^3}+m = \sqrt[3]{m^3}+m = m+m" />,
    reason: 'The cube root undoes the cube exactly, which is why the answer is so clean.',
  },
  {
    working: <Katex display tex="\boxed{Q\left(2m^3,\ 2m\right)}" />,
    reason: <>The point of inflection of <Katex tex="g" /> is at <Katex tex="(k,m)=(m^3,m)" />, and <Katex tex="Q" /> is the reflection of the origin in it — which is the "visual" route the report says was the most successful.</>,
  },
]

export default function MethodsQ8_2024Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 8 (7 marks)</p>
        <p>
          Let <Katex tex="g:\mathbb{R}\to\mathbb{R}" />,{' '}
          <Katex tex="g(x)=\sqrt[3]{x-k}+m" />, where{' '}
          <Katex tex="k\in\mathbb{R}\setminus\{0\}" /> and <Katex tex="m\in\mathbb{R}" />. Let
          the point <Katex tex="P" /> be the <Katex tex="y" />-intercept of the graph of{' '}
          <Katex tex="y=g(x)" />.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            A cube-root curve <Katex tex="y=\sqrt[3]{x-k}+m" /> has a point of inflection at{' '}
            <Katex tex="(k,m)" /> and is symmetric about it. Its gradient function{' '}
            <Katex tex="g'(x)=\tfrac13(x-k)^{-2/3}" /> is therefore symmetric about the{' '}
            <em>line</em> <Katex tex="x=k" /> — and that is the whole of part d.: if{' '}
            <Katex tex="P" /> is at <Katex tex="x=0" />, the other point with the same
            gradient must be at <Katex tex="x=2k" />.
          </p>
          <p>
            Watch the signs. The cube root of a negative is negative, so{' '}
            <Katex tex="\sqrt[3]{-k}=-\sqrt[3]{k}" />; but the <Katex tex="-\tfrac23" /> power
            squares first, so <Katex tex="(-k)^{-2/3}=k^{-2/3}" /> is positive.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={
          <>
            Find the coordinates of <Katex tex="P" />, in terms of <Katex tex="k" /> and{' '}
            <Katex tex="m" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={
          <>
            Find the gradient of <Katex tex="g" /> at <Katex tex="P" />, in terms of{' '}
            <Katex tex="k" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        marks={1}
        statement={
          <>
            Given that the graph of <Katex tex="y=g(x)" /> passes through the origin, express{' '}
            <Katex tex="k" /> in terms of <Katex tex="m" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        marks={3}
        statement={
          <>
            Let the point <Katex tex="Q" /> be a point different from the point{' '}
            <Katex tex="P" />, such that the gradient of <Katex tex="g" /> at points{' '}
            <Katex tex="P" /> and <Katex tex="Q" /> are equal. Given that the graph of{' '}
            <Katex tex="y=g(x)" /> passes through the origin, find the coordinates of{' '}
            <Katex tex="Q" /> in terms of <Katex tex="m" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>
    </div>
  )
}
