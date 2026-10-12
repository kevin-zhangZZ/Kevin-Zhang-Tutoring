// 2024 Mathematical Methods — Exam 2, MCQ 11. VCAA examination report: 40% correct. This
// year's paper used four options (A–D) rather than five. Probability exactly two of three
// randomly chosen students are from a given row. Question text transcribed from the original
// paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 12, B: 40, C: 10, D: 37 },
  answer: 'B',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="\dfrac{\binom{7}{2}\binom{5}{1}}{\binom{12}{3}}=\dfrac{21}{44}" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="12 \text{ students total: } 7 \text{ in row 1},\ 5 \text{ in row 2}" />,
    reason: <>Three <em>different</em> students are chosen, so this is selection without replacement: count groups of 3 with combinations, not a binomial.</>,
    more: <>The trap: option <b>D</b>, chosen by 37%, comes from a binomial distribution with <Katex tex="p=\tfrac{7}{12}" />. A binomial needs the probability of "row 1" to stay <Katex tex="\tfrac{7}{12}" /> on every pick, which is only true if the same student could be picked again. Once a row-1 student is chosen, only 6 of the remaining 11 are in row 1, so the picks are not independent.</>,
  },
  {
    working: <Katex display tex="\binom{7}{2}\binom{5}{1}" />,
    reason: <>Favourable groups: choose 2 of the 7 row-1 students, and the third student from the 5 in row 2.</>,
  },
  {
    working: <Katex display tex="\binom{7}{2}=21,\qquad \binom{5}{1}=5" />,
    reason: <>Evaluate each combination.</>,
  },
  {
    working: <Katex display tex="\binom{12}{3} = 220" />,
    reason: <>Total ways to choose any 3 students from all 12.</>,
  },
  {
    working: <Katex display tex="\Pr = \frac{21\times5}{220} = \frac{105}{220}" />,
    reason: <>Every group of 3 is equally likely, so probability is favourable groups over total groups.</>,
    more: <>Check by picking one at a time: the row-1, row-1, row-2 order has probability <Katex tex="\tfrac{7}{12}\times\tfrac{6}{11}\times\tfrac{5}{10}=\tfrac{7}{44}" />, and the row-2 student can come 1st, 2nd or 3rd, so the answer is <Katex tex="3\times\tfrac{7}{44}=\tfrac{21}{44}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{105}{220} = \frac{21}{44}}" />,
    reason: <>Simplify (divide by 5). Matches option <b>B</b>.</>,
    more: <>Option <b>D</b>, <Katex tex="\tfrac{245}{576}=3\left(\tfrac{7}{12}\right)^2\tfrac{5}{12}" />, is the binomial calculation warned about in the first step. Option <b>A</b>, <Katex tex="\tfrac{7}{44}" />, is what you get by forgetting the factor of 3 for the position of the row-2 student in the one-at-a-time method (it also happens to equal the probability that all three are in row 1, <Katex tex="\tfrac{35}{220}" />). Option <b>C</b>, <Katex tex="\tfrac{5}{22}=\tfrac{50}{220}" />, matches none of the four possible splits: 0, 1, 2 or 3 students from row 1 account for 10, 70, 105 and 35 of the 220 groups.</>,
  },
]

export default function MethodsQ11_2024() {
  return (
    <MCQShell
      question={
        <p>
          Twelve students sit in a classroom, with seven students in the first row and the other five students in
          the second row. Three students are chosen randomly from the class.
          <br />
          The probability that exactly two of the three students chosen are in the first row is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\tfrac{7}{44}" /> },
        { letter: 'B', content: <Katex tex="\tfrac{21}{44}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\tfrac{5}{22}" /> },
        { letter: 'D', content: <Katex tex="\tfrac{245}{576}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
