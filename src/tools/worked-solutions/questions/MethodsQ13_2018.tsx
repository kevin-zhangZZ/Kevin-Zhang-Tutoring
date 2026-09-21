// 2018 Mathematical Methods — Exam 2, MCQ 13. VCAA examination report: 59% correct. Two
// marbles from two different boxes; find the probability the scores total +1. Question text
// transcribed from the original paper; VCAA printed no diagram and neither does the stem here
// (guide §7). Answer checked with sympy. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 7, C: 15, D: 14, E: 59 },
  answer: 'E',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="-2 + 3 = 1" />,
    reason: <>Work out which <em>combination</em> of marbles scores <Katex tex="+1" /> before touching any probability. One white and one red is the only way: two whites give <Katex tex="-4" />, two reds give <Katex tex="+6" />.</>,
  },
  {
    working: <Katex display tex="\text{Box 1: } 4W, 2R \ (6) \qquad \text{Box 2: } 2W, 3R \ (5)" />,
    reason: <>One marble comes from each box, so the two draws are independent and the box sizes differ — <Katex tex="6" /> and <Katex tex="5" />, not a shared pool of <Katex tex="11" />.</>,
  },
  {
    working: <Katex display tex="\Pr(W_1 \cap R_2) = \frac46 \times \frac35 = \frac{12}{30}" />,
    reason: <>White from Box 1, red from Box 2. Multiply because the draws are independent.</>,
  },
  {
    working: <Katex display tex="\Pr(R_1 \cap W_2) = \frac26 \times \frac25 = \frac{4}{30}" />,
    reason: <>The other order: red from Box 1, white from Box 2. Missing this second case is the main way marks are lost here.</>,
  },
  {
    working: <Katex display tex="\Pr(\text{score}=+1) = \frac{12}{30}+\frac{4}{30} = \frac{16}{30}" />,
    reason: <>The two cases are mutually exclusive, so add them.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{8}{15}}" />,
    reason: <>Matches option <b>E</b>. (<Katex tex="\tfrac{8}{15}\approx0.53" /> — a little over half, which is plausible: mixed pairs are the most common outcome when each box is fairly balanced.) Option <b>C</b> <Katex tex="\left(\tfrac25=\tfrac{12}{30}\right)" /> is the first case only; option <b>D</b> <Katex tex="\left(\tfrac{2}{15}=\tfrac{4}{30}\right)" /> is the second only.</>,
  },
]

export default function MethodsQ13_2018() {
  return (
    <MCQShell
      question={
        <p>
          In a particular scoring game, there are two boxes of marbles and a player must
          randomly select one marble from each box. The first box contains four white marbles
          and two red marbles. The second box contains two white marbles and three red
          marbles. Each white marble scores <Katex tex="-2" /> points and each red marble
          scores <Katex tex="+3" /> points. The points obtained from the two marbles randomly
          selected by a player are added together to obtain a final score. What is the
          probability that the final score will equal <Katex tex="+1" />?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac23" /> },
        { letter: 'B', content: <Katex tex="\dfrac15" /> },
        { letter: 'C', content: <Katex tex="\dfrac25" /> },
        { letter: 'D', content: <Katex tex="\dfrac{2}{15}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{8}{15}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="Translate the score into colours first">
          <p>
            Questions like this are easier backwards. Rather than enumerating outcomes and
            adding up scores, ask what colour combination produces the target score — here
            only one does, and that immediately reduces the problem to two ordered cases.
          </p>
          <p>
            Then be careful that the two boxes have <em>different</em> compositions, so
            "white then red" and "red then white" are genuinely different probabilities. They
            are not, as in many textbook versions, two copies of the same number.
          </p>
        </Background>
      }
    />
  )
}
