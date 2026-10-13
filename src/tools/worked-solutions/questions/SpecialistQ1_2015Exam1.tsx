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
    reason: <><Katex tex="OA" /> and <Katex tex="OC" /> are adjacent sides, and all four sides of a rhombus have the same length, so set their magnitudes equal.</>,
  },
  {
    working: <Katex display tex="\bigl|a\,\underset{\sim}{i}\bigr| = a \quad (a>0)" />,
    reason: <>The magnitude of <Katex tex="a\,\underset{\sim}{i}" /> is <Katex tex="|a|" />, which is just <Katex tex="a" /> because the question says <Katex tex="a" /> is positive.</>,
  },
  {
    working: <Katex display tex="\bigl|\underset{\sim}{i}+\underset{\sim}{j}+\underset{\sim}{k}\bigr| = \sqrt{1^2+1^2+1^2} = \sqrt3" />,
    reason: <>Magnitude is the square root of the sum of the squared components: <Katex tex="\sqrt3" />, not <Katex tex="3" />.</>,
    more: (
      <>
        Two of the report's wrong answers come from this line. <Katex tex="a=3" /> adds the components
        and forgets the square root. <Katex tex="a=1" /> treats{' '}
        <Katex tex="\underset{\sim}{i}+\underset{\sim}{j}+\underset{\sim}{k}" /> as if it were
        a unit vector because each component is 1; it is not, since three perpendicular steps of
        length 1 reach a point <Katex tex="\sqrt3" /> from the origin (the diagonal of a unit cube).
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{a = \sqrt3}" />,
    reason: <>Equate the two lengths. Only the positive value: <Katex tex="a" /> is given as positive, so <Katex tex="a=\pm\sqrt3" /> loses the mark.</>,
    more: (
      <>
        The report also mentions <Katex tex="a=0" />. That cannot be right: <Katex tex="a" /> is
        positive, and <Katex tex="a=0" /> would make <Katex tex="\overrightarrow{OA}" /> the zero
        vector, so <Katex tex="OA" /> would not be a side of length <Katex tex="\sqrt3" /> at all.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\overrightarrow{OB} = \overrightarrow{OA}+\overrightarrow{AB} = \overrightarrow{OA}+\overrightarrow{OC}" />,
    reason: <>Plan: the diagonals are <Katex tex="OB" /> and <Katex tex="CA" />; show their dot product is <Katex tex="0" />. Get <Katex tex="\overrightarrow{OB}" /> by the triangle rule; <Katex tex="\overrightarrow{AB}=\overrightarrow{OC}" /> (opposite sides of a rhombus).</>,
    more: (
      <>
        Going round <Katex tex="OABC" />, side <Katex tex="AB" /> is opposite <Katex tex="OC" />:
        parallel, the same length and pointing the same way, so it is the same vector.
      </>
    ),
  },
  {
    working: <Katex display tex="\overrightarrow{OB} = (\sqrt3+1)\underset{\sim}{i}+\underset{\sim}{j}+\underset{\sim}{k}" />,
    reason: <>One diagonal, using <Katex tex="a=\sqrt3" /> from part a.</>,
  },
  {
    working: <Katex display tex="\overrightarrow{CA} = \overrightarrow{OA}-\overrightarrow{OC} = (\sqrt3-1)\underset{\sim}{i}-\underset{\sim}{j}-\underset{\sim}{k}" />,
    reason: <>The other diagonal joins <Katex tex="C" /> and <Katex tex="A" />. A vector from <Katex tex="C" /> to <Katex tex="A" /> is (position of <Katex tex="A" />) minus (position of <Katex tex="C" />).</>,
    more: (
      <>
        Either direction, <Katex tex="\overrightarrow{CA}" /> or <Katex tex="\overrightarrow{AC}" />,
        is fine: reversing a vector only changes the sign of the dot product, and zero stays
        zero. What loses marks is the report's main error, a sign slip inside the subtraction,
        such as writing <Katex tex="-\underset{\sim}{j}+\underset{\sim}{k}" />. Bracket the whole
        of <Katex tex="\overrightarrow{OC}" /> when you subtract it, so every component changes sign.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned}\overrightarrow{OB}\cdot\overrightarrow{CA} &= (\sqrt3+1)(\sqrt3-1) \\ &\quad+(1)(-1)+(1)(-1)\end{aligned}" />,
    reason: <>Multiply matching components and add, keeping each negative inside brackets.</>,
  },
  {
    working: <Katex display tex="= (3-1)-1-1 = 0" />,
    reason: <>The difference of two squares does the work: <Katex tex="(\sqrt3+1)(\sqrt3-1)=3-1=2" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\text{Non-zero vectors, zero dot product, so}\\ &\text{diagonals } OB \text{ and } CA \text{ are perpendicular.}\\ &\text{As required.}\end{aligned}" />,
    reason: <>Zero dot product of non-zero vectors means perpendicular. A "show that" ends with this conclusion written in words.</>,
    more: (
      <>
        Notation counts too (the report says it "was often poor"): mark every vector with a tilde
        or an arrow, and put the dot between the two vectors in the dot product.{' '}
        The report notes "unconvincing arguments, often due to insufficient steps shown", so
        write the diagonal vectors, the dot product with each product of components visible,
        the value <Katex tex="0" />, and the conclusion. The report also notes that some
        students used <Katex tex="\overrightarrow{OM}" /> and <Katex tex="\overrightarrow{AM}" />,
        where <Katex tex="M" /> is where the diagonals meet. That works, since those vectors are
        halves of the diagonals, but it is extra work; the whole diagonals are enough. A general
        proof (for any rhombus with sides <Katex tex="\underset{\sim}{u}" /> and{' '}
        <Katex tex="\underset{\sim}{v}" />, <Katex tex="(\underset{\sim}{u}+\underset{\sim}{v})\cdot(\underset{\sim}{u}-\underset{\sim}{v})=|\underset{\sim}{u}|^2-|\underset{\sim}{v}|^2=0" />)
        is also valid, and shows why part a matters: the equal side lengths are exactly what
        make the dot product vanish.
      </>
    ),
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
          <img loading="lazy" decoding="async"
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
