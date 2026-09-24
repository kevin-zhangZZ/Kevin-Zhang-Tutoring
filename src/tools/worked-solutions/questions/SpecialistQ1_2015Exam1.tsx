// 2015 Specialist Mathematics — Exam 1, Question 1 (3 marks). A rhombus built from two
// vectors: finding the side length, then showing the diagonals are perpendicular. Question
// text transcribed from the original paper; the figure is a crop of VCAA's own artwork.
// Answers checked with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import rhombusSrc from './spec-2015e1-q1-rhombus.png'

const EXAM_A: SAExaminerStats = {
  marks: [29, 71],
  average: 0.7,
  comment: (
    <>
      This question was answered reasonably well by students. The most common errors involved
      finding the magnitude to be <Katex tex="a=1" /> or <Katex tex="a=\pm\sqrt3" /> (even
      though the question stated that <Katex tex="a" /> was positive). Another common error was <Katex tex="a=3" />. A small number of students
      gave the answer <Katex tex="a=0" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [25, 15, 59],
  average: 1.4,
  comment: (
    <>
      This question was quite well answered. The main errors were sign errors in finding the
      diagonal vectors and sign errors in the dot product. A few students found{' '}
      <Katex tex="\overrightarrow{OM}" /> and <Katex tex="\overrightarrow{AM}" /> where{' '}
      <Katex tex="M" /> is the point of intersection of the diagonals. Some students proved
      that the diagonals in a rhombus intersect at right angles using general vector methods.
      Brackets were often omitted and the notation used with vectors was often poor. There
      were some unconvincing arguments, often due to insufficient steps shown.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\bigl|\overrightarrow{OA}\bigr| = \bigl|\overrightarrow{OC}\bigr|" />,
    reason: <>All four sides of a rhombus have the same length — that is the only fact the question gives you, and it is enough.</>,
  },
  {
    working: <Katex display tex="\bigl|a\,\underset{\sim}{i}\bigr| = a \quad (a>0)" />,
    reason: <>The magnitude of <Katex tex="a\,\underset{\sim}{i}" /> is <Katex tex="|a|" />, which is just <Katex tex="a" /> because the question says <Katex tex="a" /> is positive.</>,
  },
  {
    working: <Katex display tex="\bigl|\underset{\sim}{i}+\underset{\sim}{j}+\underset{\sim}{k}\bigr| = \sqrt{1^2+1^2+1^2} = \sqrt3" />,
    reason: <>Three unit components, so the magnitude is <Katex tex="\sqrt3" />, not <Katex tex="3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a = \sqrt3}" />,
    reason: <>Rejecting <Katex tex="-\sqrt3" /> because <Katex tex="a" /> is a positive real constant.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\overrightarrow{OB} = \overrightarrow{OA}+\overrightarrow{AB} = \overrightarrow{OA}+\overrightarrow{OC}" />,
    reason: <>In the rhombus <Katex tex="OABC" />, the side <Katex tex="AB" /> is parallel and equal to <Katex tex="OC" />, so it is the same vector.</>,
  },
  {
    working: <Katex display tex="\overrightarrow{OB} = (\sqrt3+1)\underset{\sim}{i}+\underset{\sim}{j}+\underset{\sim}{k}" />,
    reason: <>One diagonal, using <Katex tex="a=\sqrt3" /> from part a.</>,
  },
  {
    working: <Katex display tex="\overrightarrow{CA} = \overrightarrow{OA}-\overrightarrow{OC} = (\sqrt3-1)\underset{\sim}{i}-\underset{\sim}{j}-\underset{\sim}{k}" />,
    reason: <>The other diagonal runs from <Katex tex="C" /> to <Katex tex="A" />, so subtract in that order. Getting the sign wrong here is the report's other common error.</>,
  },
  {
    working: <Katex display tex="\overrightarrow{OB}\cdot\overrightarrow{CA} = (\sqrt3+1)(\sqrt3-1)+(1)(-1)+(1)(-1)" />,
    reason: <>The dot product. If it is zero, the diagonals are perpendicular.</>,
  },
  {
    working: <Katex display tex="= (3-1)-1-1 = 0" />,
    reason: <>The difference of two squares does the work: <Katex tex="(\sqrt3+1)(\sqrt3-1)=3-1=2" />.</>,
  },
  {
    working: <Katex display tex="\therefore\ \overrightarrow{OB}\perp\overrightarrow{CA} \quad \text{as required}" />,
    reason: <>A zero dot product between two non-zero vectors means they are perpendicular — say so explicitly, since the question asks you to <em>show</em> the result. The report criticises arguments with too few steps.</>,
  },
]

export default function SpecialistQ1_2015Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (3 marks)</p>
        <p>
          Consider the rhombus <Katex tex="OABC" /> shown below, where{' '}
          <Katex tex="\overrightarrow{OA}=a\,\underset{\sim}{i}" /> and{' '}
          <Katex tex="\overrightarrow{OC}=\underset{\sim}{i}+\underset{\sim}{j}+\underset{\sim}{k}" />
          , and <Katex tex="a" /> is a positive real constant.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={rhombusSrc}
            alt="A rhombus labelled O at the bottom left, A at the bottom right, B at the top right and C at the top left — from the original 2015 VCAA exam paper"
            className="w-full max-w-[200px]"
          />
        </div>
      </div>

      <PartCard letter="a" topic="Magnitude" marks={1} statement={<>Find <Katex tex="a" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Perpendicular Diagonals"
        marks={2}
        statement={<>Show that the diagonals of the rhombus <Katex tex="OABC" /> are perpendicular.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
