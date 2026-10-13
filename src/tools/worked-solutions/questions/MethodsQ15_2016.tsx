// 2016 Mathematical Methods — Exam 2, MCQ 15. VCAA examination report: 84% correct.
// Two marbles of the same colour, drawn without replacement. Question text transcribed
// from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 6, C: 84, D: 5, E: 3 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(RR) = \frac{6}{10}\times\frac{5}{9} = \frac{30}{90}" />,
    reason: <>"Same colour" means both red or both blue. Red first (<Katex tex="6" /> of <Katex tex="10" />), then red from the <Katex tex="9" /> left, of which <Katex tex="5" /> are red.</>,
  },
  {
    working: <Katex display tex="\Pr(BB) = \frac{4}{10}\times\frac{3}{9} = \frac{12}{90}" />,
    reason: <>Blue first (<Katex tex="4" /> of <Katex tex="10" />), then blue from the <Katex tex="9" /> left, of which <Katex tex="3" /> are blue.</>,
  },
  {
    working: <Katex display tex="\Pr(\text{same}) = \frac{30+12}{90} = \frac{42}{90}" />,
    reason: <>The two cases are mutually exclusive, so add.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{7}{15}}" />,
    reason: <>Simplify by dividing top and bottom by <Katex tex="6" />. Matches option <b>C</b>.</>,
    more: <>Check: the other outcome, different colours, is <Katex tex="\frac{6}{10}\times\frac{4}{9}+\frac{4}{10}\times\frac{6}{9}=\frac{48}{90}=\frac{8}{15}" />, and <Katex tex="\frac{7}{15}+\frac{8}{15}=1" />. Option <b>E</b>, <Katex tex="\frac13=\frac{30}{90}" />, is red–red alone — the blue–blue case forgotten. Option <b>D</b>, <Katex tex="\frac35" />, is only the probability that the first marble is red.</>,
  },
]

export default function MethodsQ15_2016() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A box contains six red marbles and four blue marbles. Two marbles are drawn from
            the box, without replacement.
          </p>
          <p>The probability that they are the same colour is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac12" /> },
        { letter: 'B', content: <Katex tex="\dfrac{28}{45}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{7}{15}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\dfrac35" /> },
        { letter: 'E', content: <Katex tex="\dfrac13" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
