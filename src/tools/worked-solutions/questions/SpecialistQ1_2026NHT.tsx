// 2026 Specialist NHT — Exam 2, MCQ 1. The NHT report gives the answer key and a one-line
// comment only, with no statistics. Proof: the contrapositive of an "if … then …" statement.
// Question text transcribed from the original paper. Solution is original; the answer D agrees
// with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'D',
  comment: <>Contrapositive statement required.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}P&:\ \text{the temperature is } 35^\circ\text{C or more}\\ Q&:\ \text{the students do not play sport}\end{aligned}" />,
    reason: <>Name the two parts of the statement <Katex tex="P\Rightarrow Q" />: the hypothesis after &ldquo;if&rdquo; and the conclusion after &ldquo;then&rdquo;.</>,
  },
  {
    working: <Katex display tex="\text{Contrapositive: } \neg Q\Rightarrow\neg P" />,
    reason: <>The contrapositive swaps the two parts <b>and</b> negates both. It is always equivalent to the original statement, so it is true exactly when the original is.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\neg Q&:\ \text{the students play sport}\\ \neg P&:\ \text{the temperature is less than } 35^\circ\text{C}\end{aligned}" />,
    reason: <>The negation of &ldquo;do not play sport&rdquo; is &ldquo;play sport&rdquo;, and the negation of &ldquo;35 °C or more&rdquo; (<Katex tex="T\ge35" />) is &ldquo;less than 35 °C&rdquo; (<Katex tex="T<35" />).</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{aligned}&\text{if the students play sport, then}\\ &\text{the temperature is less than } 35^\circ\text{C}\end{aligned}}" />,
    reason: <>Matches option <b>D</b>.</>,
    more: <>Option <b>B</b> is the converse, <Katex tex="Q\Rightarrow P" /> (swapped but not negated), and option <b>C</b> is the inverse, <Katex tex="\neg P\Rightarrow\neg Q" /> (negated but not swapped); neither is equivalent to the original. Option <b>A</b> is just one instance of the original statement (36 °C is 35 °C or more), not its contrapositive.</>,
  },
]

export default function SpecialistQ1_2026NHT() {
  return (
    <MCQShell
      question={
        <p>
          Consider the following statement.
          <br />
          &lsquo;If the temperature is 35 °C or more, then the students do not play sport.&rsquo;
          <br />
          The contrapositive of this statement is
        </p>
      }
      options={[
        { letter: 'A', content: <>if the temperature is 36 °C, then the students do not play sport.</> },
        { letter: 'B', content: <>if the students do not play sport, then the temperature is 35 °C or more.</> },
        { letter: 'C', content: <>if the temperature is less than 35 °C, then the students play sport.</> },
        { letter: 'D', content: <>if the students play sport, then the temperature is less than 35 °C.</>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
