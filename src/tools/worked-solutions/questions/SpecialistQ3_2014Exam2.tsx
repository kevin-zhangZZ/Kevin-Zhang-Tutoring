// 2014 Specialist Mathematics — Exam 2, Section 2 Question 3 (10 marks). Splitting a vector
// into parallel and perpendicular resolutes, then locating the intersection of a diagonal
// and a median in a parallelogram. Question text transcribed from the original paper; the
// figure is a crop of VCAA's own artwork. Answers checked with sympy and against the VCAA
// examination report. Solution is original.
//
// Interactive (Detailed view only): b.iii (37% full marks) has a two-sliders widget showing the
// routes via AD and via OB land on the same point only when both the a- and c-coefficients agree.
// Parts a, b.i and b.ii do not qualify (41%, 75%, 55% full marks), so they have none.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import pgramSrc from './spec-2014e2-q3b-parallelogram.png'
import { Explore, lazyWidget } from '../Explore'

const TwoRoutesWidget = lazyWidget(() => import('../interactives/spec-2014e2-q3biii-two-routes'))

const EXAM_A: SAExaminerStats = {
  marks: [14, 4, 8, 10, 23, 41],
  average: 3.5,
  comment: (
    <>
      Many students made arithmetic errors finding the resolutes, and a significant number
      omitted the final line, where <Katex tex="\underset{\sim}{a}" /> was to be expressed as
      the sum of the two vector resolutes. A significant number of students
      unsuccessfully attempted to find the resolutes from first principles, instead of
      applying the standard formulas.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [16, 9, 75],
  average: 1.6,
  comment: (
    <>
      The majority of students answered this question well. However, the main error was to
      use{' '}
      <Katex tex="\alpha\left(\underset{\sim}{c}+\tfrac12\underset{\sim}{a}\right)" />,
      brought about by confusion of the direction of <Katex tex="\underset{\sim}{a}" />. A
      small number of students did not realise that they needed to work with{' '}
      <Katex tex="\tfrac12\underset{\sim}{a}" />.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [45, 55],
  average: 0.6,
  comment: (
    <>
      A significant number of students misread this question and gave a correct answer for{' '}
      <Katex tex="\overrightarrow{OP}" /> instead of <Katex tex="\overrightarrow{AP}" />.
    </>
  ),
}

const EXAM_BIII: SAExaminerStats = {
  marks: [50, 14, 37],
  average: 0.9,
  comment: (
    <>
      Few students could correctly equate coefficients to find the values of{' '}
      <Katex tex="\alpha" /> and <Katex tex="\beta" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{b} = 3(2)+2(-2)+1(-1) = 1" />,
    reason: <>Both resolute formulas need <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{b}" /> and <Katex tex="\left|\underset{\sim}{b}\right|^2" />, so find these first.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{b}\right|^2 = 2^2+(-2)^2+(-1)^2 = 9" />,
    reason: <>Square each component and add. The formulas use <Katex tex="\left|\underset{\sim}{b}\right|^2" />, so there is no need to find <Katex tex="\left|\underset{\sim}{b}\right|" /> itself.</>,
  },
  {
    working: <Katex display tex="\left(\underset{\sim}{a}\cdot\hat{\underset{\sim}{b}}\right)\hat{\underset{\sim}{b}} = \frac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{\left|\underset{\sim}{b}\right|^2}\underset{\sim}{b} = \tfrac19\left(2\underset{\sim}{i}-2\underset{\sim}{j}-\underset{\sim}{k}\right)" />,
    reason: <>The standard formula for the <em>parallel</em> vector resolute. It is a multiple of <Katex tex="\underset{\sim}{b}" />, as it must be.</>,
    more: <>Where the formula comes from: <Katex tex="\underset{\sim}{a}\cdot\hat{\underset{\sim}{b}}" /> is the scalar resolute (the length of the shadow of <Katex tex="\underset{\sim}{a}" /> on <Katex tex="\underset{\sim}{b}" />), and multiplying by the unit vector <Katex tex="\hat{\underset{\sim}{b}}=\tfrac{1}{\left|\underset{\sim}{b}\right|}\underset{\sim}{b}" /> points it along <Katex tex="\underset{\sim}{b}" />. The two factors of <Katex tex="\tfrac{1}{\left|\underset{\sim}{b}\right|}" /> combine into <Katex tex="\tfrac{1}{\left|\underset{\sim}{b}\right|^2}" />. The report notes many students unsuccessfully tried to find the resolutes from first principles instead of applying the standard formulas: quote the formula and substitute.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\underset{\sim}{a}-\left(\underset{\sim}{a}\cdot\hat{\underset{\sim}{b}}\right)\hat{\underset{\sim}{b}} \\ &= \left(3-\tfrac29\right)\underset{\sim}{i}+\left(2+\tfrac29\right)\underset{\sim}{j}+\left(1+\tfrac19\right)\underset{\sim}{k} \end{aligned}" />,
    reason: <>The perpendicular part is whatever is left of <Katex tex="\underset{\sim}{a}" /> after removing the parallel part. Subtract component by component.</>,
    more: <>The <Katex tex="\underset{\sim}{j}" /> and <Katex tex="\underset{\sim}{k}" /> entries become additions because the parallel resolute has negative components there: <Katex tex="2-\left(-\tfrac29\right)=2+\tfrac29" />. The report notes many arithmetic errors in finding the resolutes, and this sign is the usual place for one. The check in the next row catches it.</>,
  },
  {
    working: <Katex display tex="= \tfrac{25}{9}\underset{\sim}{i}+\tfrac{20}{9}\underset{\sim}{j}+\tfrac{10}{9}\underset{\sim}{k}" />,
    reason: <>The <em>perpendicular</em> vector resolute. Check: its dot product with <Katex tex="\underset{\sim}{b}" /> is <Katex tex="\tfrac{50}9-\tfrac{40}9-\tfrac{10}9=0" /> ✓.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{aligned} \underset{\sim}{a} &= \underbrace{\tfrac19\left(2\underset{\sim}{i}-2\underset{\sim}{j}-\underset{\sim}{k}\right)}_{\text{parallel to } \underset{\sim}{b}} \\ &\quad+\underbrace{\tfrac{25}{9}\underset{\sim}{i}+\tfrac{20}{9}\underset{\sim}{j}+\tfrac{10}{9}\underset{\sim}{k}}_{\text{perpendicular to } \underset{\sim}{b}} \end{aligned}}" />,
    reason: <>The question asks for <Katex tex="\underset{\sim}{a}" /> written as the sum, with each resolute identified. The report says many omitted this final line.</>,
    more: <>Check that the sum really is <Katex tex="\underset{\sim}{a}" />: <Katex tex="\tfrac29+\tfrac{25}9=3" />, <Katex tex="-\tfrac29+\tfrac{20}9=2" />, <Katex tex="-\tfrac19+\tfrac{10}9=1" /> ✓.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\overrightarrow{CB} = \overrightarrow{OA} = \underset{\sim}{a}" />,
    reason: <>Opposite sides of a parallelogram are parallel and equal in length, so they are equal as vectors.</>,
  },
  {
    working: <Katex display tex="\overrightarrow{OD} = \overrightarrow{OC}+\tfrac12\overrightarrow{CB} = \underset{\sim}{c}+\tfrac12\underset{\sim}{a}" />,
    reason: <>To reach <Katex tex="D" />, go up to <Katex tex="C" />, then halfway along <Katex tex="CB" />, because <Katex tex="D" /> is its midpoint.</>,
    more: <>The report notes a small number of students did not realise they needed to work with <Katex tex="\tfrac12\underset{\sim}{a}" />. The half comes from the midpoint: <Katex tex="\overrightarrow{CD}" /> is half of <Katex tex="\overrightarrow{CB}=\underset{\sim}{a}" />.</>,
  },
  {
    working: <Katex display tex="\overrightarrow{AD} = \overrightarrow{OD}-\overrightarrow{OA} = \underset{\sim}{c}+\tfrac12\underset{\sim}{a}-\underset{\sim}{a} = \underset{\sim}{c}-\tfrac12\underset{\sim}{a}" />,
    reason: <>A vector from one point to another is (end) minus (start): <Katex tex="\overrightarrow{AD}=\overrightarrow{OD}-\overrightarrow{OA}" />.</>,
    more: <>The report's main error was <Katex tex="\alpha\left(\underset{\sim}{c}+\tfrac12\underset{\sim}{a}\right)" />, from confusing the direction of <Katex tex="\underset{\sim}{a}" />. Check against the figure: from <Katex tex="A" /> (bottom right) to <Katex tex="D" /> (top middle) you go up by <Katex tex="\underset{\sim}{c}" /> but back to the left, against <Katex tex="\underset{\sim}{a}" />, so the <Katex tex="\underset{\sim}{a}" />-coefficient must be negative. Equivalently, <Katex tex="\overrightarrow{AD}=\overrightarrow{AB}+\overrightarrow{BD}=\underset{\sim}{c}-\tfrac12\underset{\sim}{a}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\overrightarrow{AP} = \alpha\left(\underset{\sim}{c}-\tfrac12\underset{\sim}{a}\right)}" />,
    reason: <>Substitute into the given <Katex tex="\overrightarrow{AP}=\alpha\overrightarrow{AD}" />.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\overrightarrow{OB} = \overrightarrow{OA}+\overrightarrow{AB} = \underset{\sim}{a}+\underset{\sim}{c}" />,
    reason: <>The diagonal: along <Katex tex="OA" />, then up <Katex tex="AB" />, which equals <Katex tex="\overrightarrow{OC}=\underset{\sim}{c}" /> (opposite sides).</>,
  },
  {
    working: <Katex display tex="\overrightarrow{OP} = \beta\left(\underset{\sim}{a}+\underset{\sim}{c}\right)" />,
    reason: <>From the given <Katex tex="\overrightarrow{OP}=\beta\overrightarrow{OB}" />. This is <Katex tex="\overrightarrow{OP}" />, but the question asks for <Katex tex="\overrightarrow{AP}" />.</>,
    more: <>The report notes a significant number of students misread the question and gave a correct answer for <Katex tex="\overrightarrow{OP}" /> instead of <Katex tex="\overrightarrow{AP}" />. Part b.iii needs <Katex tex="\overrightarrow{AP}" /> both ways, so this one extra step matters.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{aligned} \overrightarrow{AP} &= \overrightarrow{OP}-\overrightarrow{OA} = -\underset{\sim}{a}+\beta\left(\underset{\sim}{a}+\underset{\sim}{c}\right) \\ &= (\beta-1)\underset{\sim}{a}+\beta\,\underset{\sim}{c} \end{aligned}}" />,
    reason: <>End minus start again: <Katex tex="\overrightarrow{AP}=\overrightarrow{OP}-\overrightarrow{OA}" />.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="\alpha\left(\underset{\sim}{c}-\tfrac12\underset{\sim}{a}\right) = -\underset{\sim}{a}+\beta\left(\underset{\sim}{a}+\underset{\sim}{c}\right)" />,
    reason: <>Parts b.i and b.ii are two expressions for the same vector <Katex tex="\overrightarrow{AP}" />, so set them equal. That is the &ldquo;hence&rdquo;.</>,
  },
  {
    working: <Katex display tex="-\tfrac\alpha2\,\underset{\sim}{a}+\alpha\,\underset{\sim}{c} = (\beta-1)\underset{\sim}{a}+\beta\,\underset{\sim}{c}" />,
    reason: <>Write each side as (number)<Katex tex="\,\underset{\sim}{a}" /> + (number)<Katex tex="\,\underset{\sim}{c}" /> so the coefficients can be compared.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\underset{\sim}{a} \text{ and } \underset{\sim}{c} \text{ are not parallel} \\ &\implies \text{coefficients must match} \end{aligned}" />,
    reason: <>A vector can be written as <Katex tex="m\underset{\sim}{a}+n\underset{\sim}{c}" /> in only one way when <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{c}" /> are non-parallel, so equate coefficients.</>,
    more: <>Why only one way: if <Katex tex="m_1\underset{\sim}{a}+n_1\underset{\sim}{c}=m_2\underset{\sim}{a}+n_2\underset{\sim}{c}" />, then <Katex tex="(m_1-m_2)\underset{\sim}{a}=(n_2-n_1)\underset{\sim}{c}" />. If <Katex tex="m_1\ne m_2" />, dividing would make <Katex tex="\underset{\sim}{a}" /> a multiple of <Katex tex="\underset{\sim}{c}" />, so parallel, which the sides of a parallelogram are not. Hence <Katex tex="m_1=m_2" />, and then <Katex tex="n_1=n_2" />. The report notes few students could correctly equate coefficients. The usual slip is to compare before expanding, e.g. matching <Katex tex="-\tfrac12" /> (instead of <Katex tex="-\tfrac\alpha2" />) with <Katex tex="\beta-1" />, or <Katex tex="\alpha" /> with the <Katex tex="-1" /> on the right. Expanding and collecting first (the row above) avoids that.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{c}:\ \alpha = \beta \qquad \underset{\sim}{a}:\ -\tfrac\alpha2 = \beta-1" />,
    reason: <>One equation from the <Katex tex="\underset{\sim}{c}" />-coefficients, one from the <Katex tex="\underset{\sim}{a}" />-coefficients: two equations for two unknowns.</>,
  },
  {
    working: <Katex display tex="-\tfrac\beta2 = \beta-1 \implies 1 = \tfrac{3\beta}{2} \implies \beta = \tfrac23" />,
    reason: <>Substitute <Katex tex="\alpha=\beta" /> into the <Katex tex="\underset{\sim}{a}" />-equation and solve.</>,
  },
  {
    working: <Katex display tex="\boxed{\alpha = \tfrac23, \qquad \beta = \tfrac23}" />,
    reason: <>So <Katex tex="P" /> is two-thirds of the way from <Katex tex="A" /> to <Katex tex="D" />, and two-thirds of the way from <Katex tex="O" /> to <Katex tex="B" />.</>,
    more: <>Check: both expressions give <Katex tex="\overrightarrow{AP}=-\tfrac13\underset{\sim}{a}+\tfrac23\underset{\sim}{c}" />. A geometric check: <Katex tex="DB" /> is parallel to <Katex tex="OA" /> and half as long, so triangles <Katex tex="PDB" /> and <Katex tex="PAO" /> are similar with ratio <Katex tex="1:2" />. That puts <Katex tex="P" /> two-thirds of the way along both <Katex tex="AD" /> and <Katex tex="OB" />.</>,
  },
]

export default function SpecialistQ3_2014Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (10 marks)</p>
        <p>
          Let{' '}
          <Katex tex="\underset{\sim}{a}=3\underset{\sim}{i}+2\underset{\sim}{j}+\underset{\sim}{k}" />{' '}
          and{' '}
          <Katex tex="\underset{\sim}{b}=2\underset{\sim}{i}-2\underset{\sim}{j}-\underset{\sim}{k}" />
          .
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Vector Resolutes"
        marks={5}
        statement={
          <>
            Express <Katex tex="\underset{\sim}{a}" /> as the <b>sum</b> of two vector resolutes, one
            of which is parallel to <Katex tex="\underset{\sim}{b}" /> and the other of which
            is perpendicular to <Katex tex="\underset{\sim}{b}" />. Identify clearly the
            parallel vector resolute and the perpendicular vector resolute.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1 flex flex-col gap-3">
        <p>
          <Katex tex="OABC" /> is a parallelogram where <Katex tex="D" /> is the midpoint of{' '}
          <Katex tex="CB" />. <Katex tex="OB" /> and <Katex tex="AD" /> intersect at point{' '}
          <Katex tex="P" />. Let <Katex tex="\overrightarrow{OA}=\underset{\sim}{a}" /> and{' '}
          <Katex tex="\overrightarrow{OC}=\underset{\sim}{c}" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={pgramSrc}
            alt="A parallelogram with vertices O bottom left, A bottom right, B top right and C top left; D marks the midpoint of the top side CB, and the diagonal OB crosses the segment AD at P — from the original 2014 VCAA exam paper"
            className="w-full max-w-[400px]"
          />
        </div>
      </div>

      <PartCard
        letter="b.i"
        topic="Vector Expression"
        marks={2}
        statement={
          <>
            Given that <Katex tex="\overrightarrow{AP}=\alpha\overrightarrow{AD}" />, write an
            expression for <Katex tex="\overrightarrow{AP}" /> in terms of{' '}
            <Katex tex="\alpha" />, <Katex tex="\underset{\sim}{a}" /> and{' '}
            <Katex tex="\underset{\sim}{c}" />.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Vector Expression"
        marks={1}
        statement={
          <>
            Given that <Katex tex="\overrightarrow{OP}=\beta\overrightarrow{OB}" />, write
            another expression for <Katex tex="\overrightarrow{AP}" /> in terms of{' '}
            <Katex tex="\beta" />, <Katex tex="\underset{\sim}{a}" /> and{' '}
            <Katex tex="\underset{\sim}{c}" />.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="b.iii"
        topic="Solve Vector Equation"
        marks={2}
        statement={
          <>
            <b>Hence</b> deduce the values of <Katex tex="\alpha" /> and <Katex tex="\beta" />.
          </>
        }
        examinerReport={EXAM_BIII}
      >
        <WorkingTable rows={ROWS_BIII} />
        <Explore title="Two routes to P meet only when both coefficients match">
          <TwoRoutesWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
