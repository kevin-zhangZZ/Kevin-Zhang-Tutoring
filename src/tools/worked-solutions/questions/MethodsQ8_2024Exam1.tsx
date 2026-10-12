// 2024 Mathematical Methods — Exam 1 Question 8 (7 marks). A translated cube-root curve:
// its y-intercept, the gradient there, and the second point with the same gradient. Question
// text transcribed from the original paper. Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [39, 61],
  average: 0.6,
  comment: (
    <>
      Many students attained the <Katex tex="y" /> value of the intercept, but did not correctly
      write the answer in coordinate form, with correct brackets. Some students demonstrated
      difficulties in dealing with a negative sign inside a cube-root, noting the odd nature of
      the function. Some students incorrectly wrote the radical sign as{' '}
      <Katex tex="3\sqrt{-k}+m" /> and this often led to errors in later parts of Question 8.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [55, 13, 32],
  average: 0.8,
  comment: (
    <>
      There were many ways the answer could be expressed in this question and students were not
      required to give their answer in a particular form. Some students confused the process
      involved in this question using integration instead of differentiation, leading to
      answers that involved an incorrect power of <Katex tex="\tfrac43" />. Many students
      calculated the <Katex tex="g'(0)" /> but mistakenly took the negative sign out, leaving
      their final response as <Katex tex="-\tfrac{1}{3k^{2/3}}" />. Some students did not
      manipulate or write the surds correctly.
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
      earlier questions, but some either had incorrect derivatives or used incorrect procedures
      to solve for <Katex tex="x=2m^3" />. Students who successfully calculated the{' '}
      <Katex tex="x" /> value were generally able to identify the correct coordinates.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="P \text{ is the } y\text{-intercept} \implies x = 0" />,
    reason: <>The <Katex tex="y" />-intercept is where the graph meets the <Katex tex="y" />-axis, so substitute <Katex tex="x=0" /> into <Katex tex="g" />.</>,
  },
  {
    working: <Katex display tex="g(0) = \sqrt[3]{0-k}+m = \sqrt[3]{-k}+m" />,
    reason: <><Katex tex="-k" /> may be negative, but that's fine: a cube root is defined for all reals, unlike a square root.</>,
  },
  {
    working: <Katex display tex="\sqrt[3]{-k} = -\sqrt[3]{k}" />,
    reason: <>Cube roots are odd: <Katex tex="(-a)^3=-a^3" />, so the minus sign comes straight out of a cube root.</>,
    more: <>Either form, <Katex tex="\sqrt[3]{-k}+m" /> or <Katex tex="m-\sqrt[3]{k}" />, is correct. The report notes some students had difficulty with the negative sign inside the cube root, and some wrote the cube root as <Katex tex="3\sqrt{-k}+m" /> (a coefficient 3 times a square root — a different function), which caused errors in later parts.</>,
  },
  {
    working: <Katex display tex="\boxed{P\left(0,\ m-\sqrt[3]{k}\right)}" />,
    reason: <>The question asks for coordinates, so give both, in brackets.</>,
    more: <>The report notes many students found the <Katex tex="y" /> value but did not write the answer in coordinate form with correct brackets — that cost the mark.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = (x-k)^{\frac13}+m" />,
    reason: <>Rewrite the cube root as a power of <Katex tex="\tfrac13" /> so the power rule applies.</>,
  },
  {
    working: <Katex display tex="g'(x) = \frac13(x-k)^{-\frac23}" />,
    reason: <>Bring down the <Katex tex="\tfrac13" /> and subtract 1 from the index: <Katex tex="\tfrac13-1=-\tfrac23" />. The constant <Katex tex="m" /> differentiates to 0.</>,
    more: <>The report notes some students integrated instead of differentiating, getting a power of <Katex tex="\tfrac43" /> (that is <Katex tex="\tfrac13+1" />). Gradient means derivative.</>,
  },
  {
    working: <Katex display tex="g'(0) = \frac13(-k)^{-\frac23} = \frac{1}{3(-k)^{\frac23}}" />,
    reason: <><Katex tex="P" /> has <Katex tex="x=0" />, so substitute <Katex tex="x=0" /> into <Katex tex="g'(x)" />. A negative index means reciprocal.</>,
  },
  {
    working: <Katex display tex="(-k)^{\frac23} = \left((-k)^2\right)^{\frac13} = \left(k^2\right)^{\frac13} = k^{\frac23}" />,
    reason: <>The power <Katex tex="\tfrac23" /> squares as well as cube-roots, and squaring removes the minus sign. So the gradient is positive.</>,
    more: <>The report notes many students mistakenly took the negative sign out, leaving <Katex tex="-\tfrac{1}{3k^{2/3}}" />. That is <Katex tex="\sqrt[3]{-k}=-\sqrt[3]{k}" /> from part a. applied where it doesn't belong. A quick check: a cube-root graph is increasing everywhere, so its gradient can never be negative.</>,
  },
  {
    working: <Katex display tex="\boxed{g'(0) = \frac{1}{3k^{\frac23}}}" />,
    reason: <>Equivalently <Katex tex="\tfrac{1}{3\sqrt[3]{k^2}}" /> or <Katex tex="\tfrac13k^{-2/3}" />; any correct form was accepted.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Through the origin} \implies g(0) = 0" />,
    reason: <>The origin is on the <Katex tex="y" />-axis, so it must be the <Katex tex="y" />-intercept <Katex tex="P" /> from part a.</>,
  },
  {
    working: <Katex display tex="m-\sqrt[3]{k} = 0 \implies \sqrt[3]{k} = m" />,
    reason: <>Set the <Katex tex="y" />-coordinate of <Katex tex="P" /> from part a. equal to 0 and rearrange.</>,
  },
  {
    working: <Katex display tex="\boxed{k = m^3}" />,
    reason: <>Cube both sides.</>,
    more: <>Since <Katex tex="k\ne0" />, this also means <Katex tex="m\ne0" /> for the rest of the question.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="g'(x) = g'(0) \implies \frac13(x-k)^{-\frac23} = \frac13(-k)^{-\frac23}" />,
    reason: <><Katex tex="Q" /> has the same gradient as <Katex tex="P" />, so set <Katex tex="g'(x)" /> equal to the gradient at <Katex tex="P" /> (part b.) and solve for <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="(x-k)^{-\frac23} = (-k)^{-\frac23} \implies (x-k)^2 = (-k)^2" />,
    reason: <>Take reciprocals of both sides, then cube both sides: <Katex tex="\left(a^{\frac23}\right)^3=a^2" />.</>,
    more: <>Keep the square — it is what gives two answers. If you instead raise both sides to the power <Katex tex="-\tfrac32" /> and write <Katex tex="x-k=-k" />, you lose a solution and only find <Katex tex="x=0" />, which is <Katex tex="P" /> itself.</>,
  },
  {
    working: <Katex display tex="x-k = \pm k \implies x = 0 \ \text{ or } \ x = 2k" />,
    reason: <>Square root both sides, taking <Katex tex="\pm" />. <Katex tex="x=0" /> is <Katex tex="P" />, and <Katex tex="Q" /> is a different point, so <Katex tex="Q" /> has <Katex tex="x=2k" />.</>,
    more: <>Notice <Katex tex="x=0" /> and <Katex tex="x=2k" /> are each a distance <Katex tex="|k|" /> from <Katex tex="x=k" />, on opposite sides — the symmetry of the gradient function described in the Background.</>,
  },
  {
    working: <Katex display tex="k = m^3 \implies x = 2m^3" />,
    reason: <>The answer must be in terms of <Katex tex="m" />, so use part c.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} g\!\left(2m^3\right) &= \sqrt[3]{2m^3-m^3}+m \\ &= \sqrt[3]{m^3}+m = m+m = 2m \end{aligned}" />,
    reason: <>Substitute <Katex tex="x=2m^3" /> (with <Katex tex="k=m^3" />) into <Katex tex="g" /> for the <Katex tex="y" />-coordinate. The cube root undoes the cube.</>,
  },
  {
    working: <Katex display tex="\boxed{Q\left(2m^3,\ 2m\right)}" />,
    reason: <>Coordinates of <Katex tex="Q" />, in terms of <Katex tex="m" /> as asked.</>,
    more: <>The "visual" route: the point of inflection of <Katex tex="g" /> is <Katex tex="(k,m)=(m^3,m)" />, and rotating the origin half a turn about it lands on <Katex tex="(2m^3,2m)" />. By the half-turn symmetry in the Background, that point has the same gradient as the origin, so it is <Katex tex="Q" />. The report notes very few students saw the question visually, but those who did usually succeeded. Check with <Katex tex="m=2" />: <Katex tex="k=8" />, <Katex tex="g'(0)=g'(16)=\tfrac1{12}" /> and <Katex tex="g(16)=\sqrt[3]{8}+2=4" />.</>,
  },
]

export default function MethodsQ8_2024Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 8 (7 marks)</p>
        <p>
          Let <Katex tex="g:R\to R" />,{' '}
          <Katex tex="g(x)=\sqrt[3]{x-k}+m" />, where{' '}
          <Katex tex="k\in R\setminus\{0\}" /> and <Katex tex="m\in R" />.
          <br />
          Let the point <Katex tex="P" /> be the <Katex tex="y" />-intercept of the graph of{' '}
          <Katex tex="y=g(x)" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              A cube-root curve <Katex tex="y=\sqrt[3]{x-k}+m" /> has a point of inflection at{' '}
              <Katex tex="(k,m)" /> and has point (half-turn) symmetry about it: rotating the graph 180° about{' '}
              <Katex tex="(k,m)" /> maps it onto itself, and a half-turn keeps slopes unchanged. Its gradient function{' '}
              <Katex tex="g'(x)=\tfrac13(x-k)^{-2/3}" /> is therefore symmetric about the{' '}
              <em>line</em> <Katex tex="x=k" /> — and that is the whole of part d.: if{' '}
              <Katex tex="P" /> is at <Katex tex="x=0" />, the other point with the same
              gradient must be at <Katex tex="x=2k" />.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Coordinates"
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
        topic="Gradient"
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
        topic="Find Parameter"
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
        topic="Equal Gradients"
        marks={3}
        statement={
          <>
            Let the point <Katex tex="Q" /> be a point different from the point{' '}
            <Katex tex="P" />, such that the gradient of <Katex tex="g" /> at points{' '}
            <Katex tex="P" /> and <Katex tex="Q" /> are equal.
            <br />
            Given that the graph of{' '}
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
