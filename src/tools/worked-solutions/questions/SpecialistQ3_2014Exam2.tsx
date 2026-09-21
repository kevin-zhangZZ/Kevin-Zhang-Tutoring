// 2014 Specialist Mathematics — Exam 2, Section 2 Question 3 (10 marks). Splitting a vector
// into parallel and perpendicular resolutes, then locating the intersection of a diagonal
// and a median in a parallelogram. Question text transcribed from the original paper; the
// figure is a crop of VCAA's own artwork. Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import pgramSrc from './spec-2014e2-q3b-parallelogram.png'

const EXAM_A: SAExaminerStats = {
  marks: [14, 4, 8, 10, 23, 41],
  average: 3.5,
  comment: (
    <>
      Many students made arithmetic errors finding the resolutes, and a significant number
      omitted the final line, where <Katex tex="\underset{\sim}{a}" /> was to be expressed as
      the <em>sum</em> of the two vector resolutes. A significant number of students
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
      The main error was to use{' '}
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
    reason: <>The dot product, which both resolutes are built from.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{b}\right|^2 = 4+4+1 = 9" />,
    reason: <>Using <Katex tex="\left|\underset{\sim}{b}\right|^2" /> rather than <Katex tex="\left|\underset{\sim}{b}\right|=3" /> avoids carrying a square root through the arithmetic.</>,
  },
  {
    working: <Katex display tex="\left(\underset{\sim}{a}\cdot\hat{\underset{\sim}{b}}\right)\hat{\underset{\sim}{b}} = \frac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{\left|\underset{\sim}{b}\right|^2}\underset{\sim}{b} = \tfrac19\left(2\underset{\sim}{i}-2\underset{\sim}{j}-\underset{\sim}{k}\right)" />,
    reason: <>The <em>parallel</em> vector resolute — a multiple of <Katex tex="\underset{\sim}{b}" />, as it must be.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{a}-\left(\underset{\sim}{a}\cdot\hat{\underset{\sim}{b}}\right)\hat{\underset{\sim}{b}} = \left(3-\tfrac29\right)\underset{\sim}{i}+\left(2+\tfrac29\right)\underset{\sim}{j}+\left(1+\tfrac19\right)\underset{\sim}{k}" />,
    reason: <>Subtracting componentwise. The signs flip because the parallel resolute has negative <Katex tex="\underset{\sim}{j}" /> and <Katex tex="\underset{\sim}{k}" /> components.</>,
  },
  {
    working: <Katex display tex="= \tfrac{25}{9}\underset{\sim}{i}+\tfrac{20}{9}\underset{\sim}{j}+\tfrac{10}{9}\underset{\sim}{k}" />,
    reason: <>The <em>perpendicular</em> vector resolute. Check: its dot product with <Katex tex="\underset{\sim}{b}" /> is <Katex tex="\tfrac{50}9-\tfrac{40}9-\tfrac{10}9=0" /> ✓.</>,
  },
  {
    working: <Katex display tex="\boxed{\underset{\sim}{a} = \tfrac19\left(2\underset{\sim}{i}-2\underset{\sim}{j}-\underset{\sim}{k}\right)+\left(\tfrac{25}{9}\underset{\sim}{i}+\tfrac{20}{9}\underset{\sim}{j}+\tfrac{10}{9}\underset{\sim}{k}\right)}" />,
    reason: <>The question asks for <Katex tex="\underset{\sim}{a}" /> expressed as the sum — the report says this final line was the mark most often dropped.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\overrightarrow{CB} = \overrightarrow{OA} = \underset{\sim}{a}" />,
    reason: <>Opposite sides of a parallelogram are equal as vectors.</>,
  },
  {
    working: <Katex display tex="\overrightarrow{OD} = \overrightarrow{OC}+\tfrac12\overrightarrow{CB} = \underset{\sim}{c}+\tfrac12\underset{\sim}{a}" />,
    reason: <><Katex tex="D" /> is the midpoint of <Katex tex="CB" />.</>,
  },
  {
    working: <Katex display tex="\overrightarrow{AD} = \overrightarrow{OD}-\overrightarrow{OA} = \underset{\sim}{c}+\tfrac12\underset{\sim}{a}-\underset{\sim}{a}" />,
    reason: <>Going from <Katex tex="A" /> to <Katex tex="D" /> means subtracting <Katex tex="\overrightarrow{OA}" /> — this is where the sign of <Katex tex="\underset{\sim}{a}" /> gets confused.</>,
  },
  {
    working: <Katex display tex="\boxed{\overrightarrow{AP} = \alpha\left(\underset{\sim}{c}-\tfrac12\underset{\sim}{a}\right)}" />,
    reason: <><Katex tex="\overrightarrow{AD}=\underset{\sim}{c}-\tfrac12\underset{\sim}{a}" />, and <Katex tex="\overrightarrow{AP}=\alpha\overrightarrow{AD}" />.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\overrightarrow{OB} = \underset{\sim}{a}+\underset{\sim}{c}" />,
    reason: <>The diagonal of the parallelogram.</>,
  },
  {
    working: <Katex display tex="\overrightarrow{OP} = \beta\left(\underset{\sim}{a}+\underset{\sim}{c}\right)" />,
    reason: <>As given. Stopping here answers a different question — the report says many did.</>,
  },
  {
    working: <Katex display tex="\boxed{\overrightarrow{AP} = \overrightarrow{OP}-\overrightarrow{OA} = -\underset{\sim}{a}+\beta\left(\underset{\sim}{a}+\underset{\sim}{c}\right)}" />,
    reason: <>The question asks for <Katex tex="\overrightarrow{AP}" />, so subtract <Katex tex="\overrightarrow{OA}" />.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="\alpha\left(\underset{\sim}{c}-\tfrac12\underset{\sim}{a}\right) = -\underset{\sim}{a}+\beta\left(\underset{\sim}{a}+\underset{\sim}{c}\right)" />,
    reason: <>Two expressions for the same vector <Katex tex="\overrightarrow{AP}" />.</>,
  },
  {
    working: <Katex display tex="-\tfrac\alpha2\,\underset{\sim}{a}+\alpha\,\underset{\sim}{c} = (\beta-1)\underset{\sim}{a}+\beta\,\underset{\sim}{c}" />,
    reason: <>Collecting each side in terms of <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{c}" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{a} \text{ and } \underset{\sim}{c} \text{ are not parallel} \implies \text{coefficients must match}" />,
    reason: <>They span the plane, so the decomposition is unique — this is the justification for equating coefficients.</>,
  },
  {
    working: <Katex display tex="\alpha = \beta \quad\text{and}\quad -\tfrac\alpha2 = \beta-1" />,
    reason: <>One equation from each vector.</>,
  },
  {
    working: <Katex display tex="-\tfrac\beta2 = \beta-1 \implies 1 = \tfrac{3\beta}{2}" />,
    reason: <>Substituting <Katex tex="\alpha=\beta" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\alpha = \tfrac23, \qquad \beta = \tfrac23}" />,
    reason: <>So <Katex tex="P" /> is two-thirds of the way along both <Katex tex="AD" /> and <Katex tex="OB" /> — which matches the diagram.</>,
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
        marks={5}
        statement={
          <>
            Express <Katex tex="\underset{\sim}{a}" /> as the sum of two vector resolutes, one
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
          <img
            src={pgramSrc}
            alt="A parallelogram with vertices O bottom left, A bottom right, B top right and C top left; D marks the midpoint of the top side CB, and the diagonal OB crosses the segment AD at P — from the original 2014 VCAA exam paper"
            className="w-full max-w-[400px]"
          />
        </div>
      </div>

      <PartCard
        letter="b.i"
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
        marks={2}
        statement={
          <>
            Hence deduce the values of <Katex tex="\alpha" /> and <Katex tex="\beta" />.
          </>
        }
        examinerReport={EXAM_BIII}
      >
        <WorkingTable rows={ROWS_BIII} />
      </PartCard>
    </div>
  )
}
