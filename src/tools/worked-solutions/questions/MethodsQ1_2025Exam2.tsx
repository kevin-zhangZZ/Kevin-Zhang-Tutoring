// 2025 Mathematical Methods — Exam 2, Section B Question 1 (13 marks). A quartic with a
// stationary point of inflection: sketch, gradient table, average value, transformations,
// and finally the same rule as a binomial probability. Question text transcribed from the
// original paper; the graph is our own drawing of the answer. Answers checked with sympy
// and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import sketchSrc from './meth-2025e2-q1b-sketch.png'

const EXAM_A: SAExaminerStats = {
  marks: [2, 7, 91],
  average: 1.9,
  comment: (
    <>
      This question was answered well. Some students, however, only gave the{' '}
      <Katex tex="x" />-values; both coordinates were required.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [7, 31, 62],
  average: 1.6,
  comment: (
    <>
      Some students did not include all the coordinates. Other students did not scale their
      graphs well on the axes — the <Katex tex="x" />-intercept <Katex tex="\tfrac43" /> was
      often drawn closer to 2 than 1. Some students did not draw the stationary point of
      inflection correctly.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [26, 19, 55],
  average: 1.3,
  comment: (
    <>
      Many students put a coordinate pair in the third column. Some students did not enter
      values in the second row. Others used <Katex tex="x" />-values greater than or equal to
      1 in the fourth column. Some students incorrectly assumed symmetry in their table.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [25, 4, 72],
  average: 1.5,
  comment: (
    <>
      Some students worked out the average rate of change instead of the average value.
      Students should check the values they enter into their CAS.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [30, 41, 9, 20],
  average: 1.2,
  comment: (
    <>
      Most students were able to describe the reflection. Students were required to use the
      correct wording and the transformations had to be in the correct order. Some students
      had the dilation factor as <Katex tex="\tfrac12" /> instead of 2.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [44, 11, 45],
  average: 1.0,
  comment: (
    <>
      This was a "show that" question and appropriate working needed to be shown. Some
      students worked out <Katex tex="\Pr(X=3)" /> instead of <Katex tex="\Pr(X\ge3)" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = 4x^3-3x^4 \implies g'(x) = 12x^2-12x^3" />,
    reason: 'Differentiating term by term.',
  },
  {
    working: <Katex display tex="= 12x^2(1-x) = 0 \implies x = 0 \ \text{(twice)} \ \text{ or } \ x = 1" />,
    reason: <>Factorising. The repeated factor <Katex tex="x^2" /> is the early warning that <Katex tex="x=0" /> is not an ordinary turning point.</>,
  },
  {
    working: <Katex display tex="g(0) = 0, \qquad g(1) = 4-3 = 1" />,
    reason: 'Substituting back into g, not g′.',
  },
  {
    working: <Katex display tex="\boxed{(0,\,0) \ \text{ and } \ (1,\,1)}" />,
    reason: <>Both coordinates were required — listing only <Katex tex="x=0,1" /> lost a mark.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="4x^3-3x^4 = x^3(4-3x) = 0 \implies x = 0, \ x = \tfrac43" />,
    reason: <>The <Katex tex="x" />-intercepts. Note <Katex tex="\tfrac43\approx1.33" />, which sits just past 1 — the examiner noted graphs that drew it near 2.</>,
  },
  {
    working: <Katex display tex="g'(x) = 12x^2(1-x) \ge 0 \text{ near } x=0 \text{ on both sides}" />,
    reason: <>The gradient does not change sign at <Katex tex="x=0" />, so the curve flattens and continues upward — a stationary point of inflection, not a turning point.</>,
  },
  {
    working: <Katex display tex="\text{leading term } -3x^4 \implies y\to-\infty \text{ as } x\to\pm\infty" />,
    reason: 'A negative quartic, so both ends fall away.',
  },
  {
    working: <Katex display tex="\boxed{\text{see the sketch below}}" />,
    reason: <>Stationary point of inflection at <Katex tex="(0,0)" />, local maximum at <Katex tex="(1,1)" />, and the <Katex tex="x" />-intercept at <Katex tex="\left(\tfrac43,0\right)" /> — all labelled with their coordinates.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{a gradient table needs a point either side of } x=0, \text{ and } x=0 \text{ itself}" />,
    reason: 'Three columns of x-values, with the derivative underneath each.',
  },
  {
    working: <Katex display tex="\text{the right-hand value must satisfy } 0<x<1" />,
    reason: <>Beyond <Katex tex="x=1" /> the derivative turns negative because of the other stationary point, which would destroy the argument. Using <Katex tex="x\ge1" /> was the listed error.</>,
  },
  {
    working: <Katex display tex="g'(-1) = 12(1)(2) = 24, \qquad g'(0) = 0, \qquad g'\!\left(\tfrac12\right) = 12\!\left(\tfrac14\right)\!\left(\tfrac12\right) = \tfrac32" />,
    reason: 'Any values of this shape will do; these are the tidiest.',
  },
  {
    working: <Katex display tex="\text{positive} \to 0 \to \text{positive}" />,
    reason: <>No sign change, so <Katex tex="x=0" /> is a stationary point of inflection. That sentence is the point of the table.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\text{average value} = \frac{1}{b-a}\int_a^b g(x)\,dx" />,
    reason: <>Not the average <em>rate of change</em>, which is <Katex tex="\tfrac{g(b)-g(a)}{b-a}" /> — the two were confused by a quarter of the cohort.</>,
  },
  {
    working: <Katex display tex="= \frac{1}{2}\int_0^{2}\left(4x^3-3x^4\right)dx" />,
    reason: 'Setting it up with the given terminals.',
  },
  {
    working: <Katex display tex="= \frac12\left[x^4-\frac{3x^5}{5}\right]_0^2 = \frac12\left(16-\frac{96}{5}\right)" />,
    reason: <>By hand or with <Cas fn="nInt" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac12\times\left(-\frac{16}{5}\right) = -\frac85}" />,
    reason: <>Negative, which is right: past <Katex tex="x=\tfrac43" /> the quartic plunges, and by <Katex tex="x=2" /> it has reached <Katex tex="-16" />.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="g: \ \text{SPI } (0,0), \ \text{local max } (1,1) \qquad h: \ \text{SPI } (1,0), \ \text{local max } (-1,1)" />,
    reason: 'Comparing the two feature pairs. The y-values are unchanged, so only the horizontal behaviour matters.',
  },
  {
    working: <Katex display tex="0 \mapsto 1 \ \text{ and } \ 1 \mapsto -1" />,
    reason: 'The two x-values that must move.',
  },
  {
    working: <Katex display tex="x \mapsto 1-2x" />,
    reason: <>The unique linear map doing both: <Katex tex="1-2(0)=1" /> ✓ and <Katex tex="1-2(1)=-1" /> ✓. The factor is <Katex tex="-2" />, so a dilation of factor 2 (not <Katex tex="\tfrac12" />) plus a reflection.</>,
  },
  {
    working: <Katex display tex="1-2x = -2x+1: \ \text{reflect, then dilate, then translate}" />,
    reason: 'Reading the composition from the inside out.',
  },
  {
    working: <Katex display tex="\boxed{\text{1. reflect in the } y\text{-axis} \quad \text{2. dilate by factor 2 from the } y\text{-axis} \quad \text{3. translate 1 unit right}}" />,
    reason: <>One of several valid orders. Another: dilate by factor 2 from the <Katex tex="y" />-axis, translate 1 unit <em>left</em>, then reflect in the <Katex tex="y" />-axis. Order matters, and the wording had to be precise.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="X\sim\text{Bi}(4,p) \implies \Pr(X\ge3) = \Pr(X=3)+\Pr(X=4)" />,
    reason: <>Two terms. Computing <Katex tex="\Pr(X=3)" /> alone was the listed error.</>,
  },
  {
    working: <Katex display tex="\Pr(X=3) = \binom{4}{3}p^3(1-p)^1 = 4p^3(1-p)" />,
    reason: <><Katex tex="\binom{4}{3}=4" />.</>,
  },
  {
    working: <Katex display tex="\Pr(X=4) = \binom{4}{4}p^4 = p^4" />,
    reason: 'No failure factor.',
  },
  {
    working: <Katex display tex="\Pr(X\ge3) = 4p^3-4p^4+p^4 = 4p^3-3p^4" />,
    reason: 'Expanding and collecting — every line of this is needed in a "show that".',
  },
  {
    working: <Katex display tex="\boxed{\Pr(X\ge3) = g(p) \ \text{ for all } p\in[0,1]}" />,
    reason: <>As required. Worth noticing: part b. showed <Katex tex="g" /> has a maximum of 1 at <Katex tex="p=1" /> over this domain, which is exactly what a probability should do.</>,
  },
]

export default function MethodsQ1_2025Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (13 marks)</p>
        <p>
          Let <Katex tex="g:\mathbb{R}\to\mathbb{R}" /> be defined by{' '}
          <Katex tex="g(x)=4x^3-3x^4" />.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Everything follows from the factorisation{' '}
            <Katex tex="g'(x)=12x^2(1-x)" />. The squared factor means the gradient touches
            zero at <Katex tex="x=0" /> without changing sign — a stationary point of
            inflection — while the simple factor at <Katex tex="x=1" /> gives an ordinary
            local maximum.
          </p>
          <p>
            Part f. is the twist: the same quartic is the binomial probability{' '}
            <Katex tex="\Pr(X\ge3)" /> for <Katex tex="X\sim\text{Bi}(4,p)" />. That is why
            the local maximum sits at exactly <Katex tex="(1,1)" /> — a certainty when{' '}
            <Katex tex="p=1" />.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        marks={2}
        statement={<>Find the coordinates of both stationary points of <Katex tex="g" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={2}
        statement={
          <>
            Sketch the graph of <Katex tex="y=g(x)" />, labelling the stationary points and
            axial intercepts with their coordinates.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={sketchSrc}
            alt="A negative quartic rising from below the axis, flattening through the labelled stationary point of inflection (0, 0), peaking at the labelled local maximum (1, 1), then crossing the axis at (4/3, 0) and falling steeply"
            className="w-full max-w-[500px]"
          />
        </div>
      </PartCard>

      <PartCard
        letter="c"
        marks={2}
        statement={
          <>
            Complete the following gradient table with appropriate values of <Katex tex="x" />{' '}
            and <Katex tex="g'(x)" /> to show that <Katex tex="g" /> has a stationary point of
            inflection.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <div className="overflow-x-auto">
          <table className="text-[13.5px] border-collapse">
            <tbody>
              <tr>
                <th className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 font-normal">
                  <Katex tex="x" />
                </th>
                {['-1', '0', '\\frac12'].map((v) => (
                  <td key={v} className="border border-gray-300 dark:border-gray-700 px-5 py-1.5 text-center">
                    <Katex tex={v} />
                  </td>
                ))}
              </tr>
              <tr>
                <th className="border border-gray-300 dark:border-gray-700 px-3 py-1.5 font-normal">
                  <Katex tex="g'(x)" />
                </th>
                {['24', '0', '\\frac32'].map((v) => (
                  <td key={v} className="border border-gray-300 dark:border-gray-700 px-5 py-1.5 text-center">
                    <Katex tex={v} />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </PartCard>

      <PartCard
        letter="d"
        marks={2}
        statement={
          <>
            Find the average value of <Katex tex="g" /> between <Katex tex="x=0" /> and{' '}
            <Katex tex="x=2" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        marks={3}
        statement={
          <>
            Let <Katex tex="h" /> be the result after applying a sequence of transformations
            to <Katex tex="g" />, such that <Katex tex="h" /> has a stationary point of
            inflection at <Katex tex="(1,0)" /> and a local maximum at{' '}
            <Katex tex="(-1,1)" />. Write down a possible sequence of three transformations to
            map from <Katex tex="g" /> to <Katex tex="h" />.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard
        letter="f"
        marks={2}
        statement={
          <>
            Let <Katex tex="X\sim\text{Bi}(4,p)" /> be a binomial random variable. Show that{' '}
            <Katex tex="\Pr(X\ge3)=g(p)" /> for all <Katex tex="p\in[0,1]" />.
          </>
        }
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>
    </div>
  )
}
