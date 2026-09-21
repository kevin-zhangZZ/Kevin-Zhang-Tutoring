// 2017 Mathematical Methods — Exam 1, Question 8 (5 marks).
// Two conditional probabilities and Pr(A ∩ B) = p; everything else in terms of p.
// Question text transcribed from the original paper (no diagram given). The probability
// table below is the standard karnaugh-style layout, not a VCAA figure. Solution is
// original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [27, 73],
  average: 0.6,
  comment: (
    <>
      This question was generally answered well. The most common errors included solving for{' '}
      <Katex tex="\Pr(B)" />, and incorrectly transposing{' '}
      <Katex tex="\tfrac{p}{\Pr(A)}=\tfrac14" /> to yield{' '}
      <Katex tex="\tfrac{p}{4}" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [55, 8, 36],
  average: 0.3,
  comment: (
    <>
      Students who scored highly usually used a table or a Venn diagram to arrive at their
      answer. There were various misconceptions of the connection between conditional
      probabilities and <Katex tex="\Pr(A\cap B)" />. Many students assumed that events{' '}
      <Katex tex="A" /> and <Katex tex="B" /> were independent, hence incorrectly used{' '}
      <Katex tex="\Pr(A\cap B)=\Pr(A)\times\Pr(B)" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [38, 53, 10],
  average: 0.4,
  comment: (
    <>
      Most students identified that <Katex tex="\Pr(A\cup B)=8p" />. Only a few students
      identified the correct interval because students did not consider that in this case{' '}
      <Katex tex="p>0" />. Common incorrect answers included{' '}
      <Katex tex="p=\tfrac1{40}" /> or <Katex tex="p\le\tfrac1{40}" /> (allowing negative
      probabilities) and <Katex tex="0\le p\le\tfrac1{40}" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(B\mid A) = \frac{\Pr(A\cap B)}{\Pr(A)}" />,
    reason: <>The definition. Choose the conditional that has <Katex tex="\Pr(A)" /> underneath — that is the one that will give <Katex tex="\Pr(A)" /> when rearranged.</>,
  },
  {
    working: <Katex display tex="\frac14 = \frac{p}{\Pr(A)}" />,
    reason: <>Substituting both given values.</>,
  },
  {
    working: <Katex display tex="\Pr(A) = \frac{p}{\frac14}" />,
    reason: <>Cross-multiplying. The report's warning is about this line: dividing by <Katex tex="\tfrac14" /> means multiplying by <Katex tex="4" />, not dividing by <Katex tex="4" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(A)=4p}" />,
    reason: <>Bigger than <Katex tex="p" />, as it must be: <Katex tex="A\cap B" /> is part of <Katex tex="A" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(A\mid B)=\frac{p}{\Pr(B)}=\frac15 \implies \Pr(B)=5p" />,
    reason: <>The same move with the other conditional.</>,
  },
  {
    working: <Katex display tex="\Pr(A\cup B)=\Pr(A)+\Pr(B)-\Pr(A\cap B)" />,
    reason: <>The addition rule. Subtracting the overlap stops it being counted twice.</>,
  },
  {
    working: <Katex display tex="= 4p+5p-p = 8p" />,
    reason: <>Note this uses no independence assumption — the report says many students wrongly multiplied <Katex tex="\Pr(A)\Pr(B)" /> here, which would give <Katex tex="20p^2" /> and is simply not what <Katex tex="\Pr(A\cap B)" /> means unless the events are independent.</>,
  },
  {
    working: <Katex display tex="A'\cap B' = (A\cup B)'" />,
    reason: <>De Morgan: "in neither" is the same as "not in either". This is the step that turns the question into one you have already answered.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(A'\cap B') = 1-8p}" />,
    reason: <>The complement of the union.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="8p \le \frac15" />,
    reason: <>Substituting <Katex tex="\Pr(A\cup B)=8p" /> from part (b).</>,
  },
  {
    working: <Katex display tex="p \le \frac{1}{40}" />,
    reason: <>Dividing by <Katex tex="8" />.</>,
  },
  {
    working: <Katex display tex="p>0" />,
    reason: <>This is the mark almost everyone dropped. If <Katex tex="p=0" /> then <Katex tex="\Pr(B)=5p=0" />, and <Katex tex="\Pr(A\mid B)" /> would be a division by zero — so the given <Katex tex="\Pr(A\mid B)=\tfrac15" /> already rules <Katex tex="p=0" /> out. Negative <Katex tex="p" /> is impossible for a probability.</>,
  },
  {
    working: <Katex display tex="\boxed{0<p\le\frac{1}{40}}" />,
    reason: <>Round bracket on the left, square on the right. Sanity check at the top end: <Katex tex="p=\tfrac1{40}" /> gives <Katex tex="\Pr(A)=\tfrac1{10}" />, <Katex tex="\Pr(B)=\tfrac18" />, <Katex tex="\Pr(A\cup B)=\tfrac15" /> — all legitimate.</>,
  },
]

export default function MethodsQ8_2017Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 8 (5 marks)</p>
        <p>
          For events <Katex tex="A" /> and <Katex tex="B" /> from a sample space,{' '}
          <Katex tex="\Pr(A\mid B)=\tfrac15" /> and <Katex tex="\Pr(B\mid A)=\tfrac14" />. Let{' '}
          <Katex tex="\Pr(A\cap B)=p" />.
        </p>
      </div>

      <PartCard letter="a" marks={1} statement={<>Find <Katex tex="\Pr(A)" /> in terms of <Katex tex="p" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" marks={2} statement={<>Find <Katex tex="\Pr(A'\cap B')" /> in terms of <Katex tex="p" />.</>} examinerReport={EXAM_B}>
        <Background title="The whole question on one table">
          <p>
            Once you know <Katex tex="\Pr(A)=4p" />, <Katex tex="\Pr(B)=5p" /> and{' '}
            <Katex tex="\Pr(A\cap B)=p" />, every other cell follows by subtraction along rows
            and columns:
          </p>
          <div className="overflow-x-auto">
            <table className="text-[13px] tabular-nums border-collapse mt-1">
              <thead>
                <tr className="text-gray-500 dark:text-gray-400">
                  <th className="px-3 py-1.5 text-left font-medium"></th>
                  <th className="px-3 py-1.5 font-medium">
                    <Katex tex="A" />
                  </th>
                  <th className="px-3 py-1.5 font-medium">
                    <Katex tex="A'" />
                  </th>
                  <th className="px-3 py-1.5 font-medium border-l border-gray-200 dark:border-gray-700">
                    total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-3 py-1.5 text-gray-500 dark:text-gray-400">
                    <Katex tex="B" />
                  </td>
                  <td className="px-3 py-1.5 text-center">
                    <Katex tex="p" />
                  </td>
                  <td className="px-3 py-1.5 text-center">
                    <Katex tex="4p" />
                  </td>
                  <td className="px-3 py-1.5 text-center border-l border-gray-200 dark:border-gray-700">
                    <Katex tex="5p" />
                  </td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-3 py-1.5 text-gray-500 dark:text-gray-400">
                    <Katex tex="B'" />
                  </td>
                  <td className="px-3 py-1.5 text-center">
                    <Katex tex="3p" />
                  </td>
                  <td className="px-3 py-1.5 text-center font-semibold">
                    <Katex tex="1-8p" />
                  </td>
                  <td className="px-3 py-1.5 text-center border-l border-gray-200 dark:border-gray-700">
                    <Katex tex="1-5p" />
                  </td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="px-3 py-1.5 text-gray-500 dark:text-gray-400">total</td>
                  <td className="px-3 py-1.5 text-center">
                    <Katex tex="4p" />
                  </td>
                  <td className="px-3 py-1.5 text-center">
                    <Katex tex="1-4p" />
                  </td>
                  <td className="px-3 py-1.5 text-center border-l border-gray-200 dark:border-gray-700">
                    <Katex tex="1" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            The bold cell is what part (b) asks for. The algebra below reaches the same place
            without drawing the table, but in the exam the table is faster and far harder to
            get wrong.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        marks={2}
        statement={
          <>
            Given that <Katex tex="\Pr(A\cup B)\le\tfrac15" />, state the largest possible
            interval for <Katex tex="p" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
