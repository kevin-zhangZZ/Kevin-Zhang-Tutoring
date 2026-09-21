// 2019 Mathematical Methods — Exam 1, Question 2, parts (a)-(b) only (3 of the question's 4
// marks). Same rule as Question 1 but with the wider domain R\{1/3} — find the rule and
// domain of f⁻¹. Question text transcribed from the original paper (no diagram given).
// Part (c) is deliberately omitted: it asks for a transformation expressed in explicit
// matrix/column-vector form (T([x,y]) = [x,y] + [c,d]) — VCAA's own report calls this
// "matrix form" — and matrices aren't part of the current VCE Methods study design.
// Cross-checked against the VCAA examination report and itute's independent solutions —
// both agree with the derivation below. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [6, 37, 57],
  average: 1.5,
  comment: (
    <>
      This question was well attempted and generally well done; however, in some cases
      progression to the correct answer was hindered by errors with algebraic manipulation
      (transposition) or poor use of notation.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [36, 64],
  average: 0.7,
  comment: <>In general, students knew that the domain of <Katex tex="f^{-1}" /> equals the range of <Katex tex="f" />.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="y = \dfrac{1}{3x-1}" />,
  },
  {
    working: <Katex display tex="y(3x-1) = 1 \;\implies\; 3xy - y = 1 \;\implies\; 3xy = 1+y" />,
    reason: <>Swap <Katex tex="x" /> and <Katex tex="y" />'s roles — rearrange for <Katex tex="x" /> in terms of <Katex tex="y" />.</>,
  },
  {
    working: <Katex display tex="x = \dfrac{1+y}{3y}" />,
  },
  {
    working: <Katex display tex="\boxed{f^{-1}(x) = \dfrac{1+x}{3x} = \dfrac13\left(\dfrac1x+1\right)}" />,
    reason: <>Relabel <Katex tex="y\to x" /> for the inverse rule.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\operatorname{dom}(f^{-1}) = \operatorname{ran}(f)" />,
    reason: <>Standard inverse-function fact.</>,
  },
  {
    working: <Katex display tex="f:\mathbb{R}\setminus\{\tfrac13\}\to\mathbb{R},\ f(x)=\dfrac{1}{3x-1}" />,
    reason: <>As <Katex tex="x" /> ranges over all reals except <Katex tex="\tfrac13" />, <Katex tex="3x-1" /> ranges over all reals except <Katex tex="0" />, so <Katex tex="f(x)=\dfrac{1}{3x-1}" /> takes every nonzero real value (and never equals <Katex tex="0" />, since a fraction with numerator <Katex tex="1" /> is never <Katex tex="0" />).</>,
  },
  {
    working: <Katex display tex="\boxed{\operatorname{dom}(f^{-1}) = \mathbb{R}\setminus\{0\}}" />,
  },
]

export default function MethodsQ2_2019Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (parts a–b)</p>
        <p>
          Let <Katex tex="f:\mathbb{R}\setminus\left\{\tfrac13\right\}\to\mathbb{R},\ f(x)=\dfrac{1}{3x-1}" />.
        </p>
      </div>

      <PartCard letter="a" marks={2} statement={<>Find the rule of <Katex tex="f^{-1}" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" marks={1} statement={<>State the domain of <Katex tex="f^{-1}" />.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
