// 2018 Mathematical Methods — Exam 2, MCQ 8. VCAA examination report: 41% correct, with option
// E close behind at 36%. Additivity
// of definite integrals with a reversed interval. Question text transcribed from the original
// paper; VCAA printed no diagram and neither does the stem here (guide §7).
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 41, C: 11, D: 7, E: 36 },
  answer: 'B',
  noAnswer: 0,
  comment: (
    <>
      <Katex tex="\displaystyle\int_1^{12} g(x)\,dx = 5,\ \int_{12}^{5} g(x)\,dx = -6" />
      <br />
      <Katex tex="\displaystyle\int_1^{12} g(x)\,dx = \int_1^{5} g(x)\,dx + \int_5^{12} g(x)\,dx" /> so
      <br />
      <Katex tex="\displaystyle 5 = \int_1^{5} g(x)\,dx + 6" />
      <br />
      <Katex tex="\displaystyle\int_1^{5} g(x)\,dx = -1" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_{12}^{5} g(x)\,dx = -6 \implies \int_{5}^{12} g(x)\,dx = 6" />,
    reason: <>Swapping the terminals of a definite integral reverses its sign. The given integral runs <em>backwards</em> (from <Katex tex="12" /> down to <Katex tex="5" />), so turn it round before combining it with anything — this is the step the question is really testing.</>,
  },
  {
    working: <Katex display tex="\int_1^{12} = \int_1^{5} + \int_5^{12}" />,
    reason: <>Additivity: an integral splits at any interior point, provided every piece runs in the same direction.</>,
  },
  {
    working: <Katex display tex="5 = \int_1^{5} g(x)\,dx + 6" />,
    reason: <>Substituting the known values.</>,
  },
  {
    working: <Katex display tex="5 + (-6) = -1 \quad \text{(same answer, one line)}" />,
    reason: <>The quick route: <Katex tex="\int_1^{12}+\int_{12}^{5}=\int_1^{5}" /> directly, because the terminals chain <Katex tex="1\to12\to5" />. Additivity does not require the middle point to lie <em>between</em> the ends — a backwards leg is fine as long as the chain joins up.</>,
  },
  {
    working: <Katex display tex="\boxed{\int_1^{5} g(x)\,dx = -1}" />,
    reason: <>Matches option <b>B</b>. Option <b>E</b> <Katex tex="(11)" />, chosen by <Katex tex="36\%" /> — almost as many as answered correctly — is <Katex tex="5-(-6)" />: subtracting the given <Katex tex="\int_{12}^{5}" /> as though it were <Katex tex="\int_{5}^{12}" />, i.e. forgetting that swapping the terminals changes the sign. Options <b>A</b> <Katex tex="(-11)" /> and <b>C</b> <Katex tex="(1)" /> are the other sign permutations.</>,
  },
]

export default function MethodsQ8_2018() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="\displaystyle\int_1^{12} g(x)\,dx = 5" /> and{' '}
          <Katex tex="\displaystyle\int_{12}^{5} g(x)\,dx = -6" />, then{' '}
          <Katex tex="\displaystyle\int_1^{5} g(x)\,dx" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-11" /> },
        { letter: 'B', content: <Katex tex="-1" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="1" /> },
        { letter: 'D', content: <Katex tex="3" /> },
        { letter: 'E', content: <Katex tex="11" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="Why the terminals here are deliberately awkward">
          <p>
            Look at the order: <Katex tex="1\to12" />, then <Katex tex="12\to5" />. The second
            interval runs backwards and overlaps the first. That is not an accident — the
            question is built so that anyone who only remembers "add the integrals" without
            checking direction lands on a distractor.
          </p>
          <p>
            Two facts settle it:{' '}
            <Katex tex="\int_a^b = -\int_b^a" />, and{' '}
            <Katex tex="\int_a^b + \int_b^c = \int_a^c" /> for <em>any</em>{' '}
            <Katex tex="a,b,c" />, in any order. The second fact makes this a one-line
            addition; the first explains why.
          </p>
        </Background>
      }
    />
  )
}
