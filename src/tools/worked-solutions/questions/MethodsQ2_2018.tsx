// 2018 Mathematical Methods — Exam 2, MCQ 2. VCAA examination report: 88% correct. Which rule
// has maximal domain R\{1}. Question text transcribed from the original paper; VCAA printed no
// diagram and neither does the stem here (guide §7). Every option's excluded set checked with
// sympy. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 88, B: 3, C: 2, D: 2, E: 5 },
  answer: 'A',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Maximal domain} = R\setminus\{1\} \implies \text{only } x=1 \text{ is excluded}" />,
    reason: <>So the rule must fail at <Katex tex="x=1" /> and be perfectly well defined at every other real number. Two things can exclude a value: a zero denominator, or a negative under a square root.</>,
  },
  {
    working: <Katex display tex="\textbf{A}: \ \frac{x^2-5}{x-1}, \quad x-1=0 \implies x=1" />,
    reason: <>The denominator vanishes at <Katex tex="x=1" /> and nowhere else, and the numerator is a polynomial defined everywhere. Maximal domain <Katex tex="R\setminus\{1\}" /> ✓</>,
  },
  {
    working: <Katex display tex="\textbf{B}: \ x-5=0 \implies x=5" />,
    reason: <>Ruling out <b>B</b>: excluded set is <Katex tex="\{5\}" />, not <Katex tex="\{1\}" />.</>,
  },
  {
    working: <Katex display tex="\textbf{C}: \ x^2+1>0 \ \text{ for all } x" />,
    reason: <>Ruling out <b>C</b>: the denominator is never zero, so the maximal domain is all of <Katex tex="R" />.</>,
  },
  {
    working: <Katex display tex="\textbf{D}: \ 1+x=0 \implies x=-1" />,
    reason: <>Ruling out <b>D</b>: excluded set is <Katex tex="\{-1\}" />. Note the sign — <Katex tex="1+x" /> vanishes at <Katex tex="-1" />, not <Katex tex="1" />.</>,
  },
  {
    working: <Katex display tex="\textbf{E}: \ x-1\ge0 \implies x\ge1" />,
    reason: <>Ruling out <b>E</b>, the most popular wrong answer at <Katex tex="5\%" />: a square root <em>requires</em> its argument to be non-negative, so the maximal domain is <Katex tex="[1,\infty)" /> — everything from <Katex tex="1" /> upwards is kept and everything below is lost. That is close to the opposite of excluding the single point <Katex tex="1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\textbf{A}}" />,
    reason: <>Matches option <b>A</b>. The <Katex tex="x^2-5" /> on top is a decoy: it makes the numerator zero at <Katex tex="x=\pm\sqrt5" />, but a zero numerator is perfectly legal — the function just takes the value <Katex tex="0" /> there. Only the denominator restricts the domain.</>,
  },
]

export default function MethodsQ2_2018() {
  return (
    <MCQShell
      question={
        <p>
          The maximal domain of the function <Katex tex="f" /> is{' '}
          <Katex tex="R\setminus\{1\}" />. A possible rule for <Katex tex="f" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="f(x)=\dfrac{x^2-5}{x-1}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="f(x)=\dfrac{x+4}{x-5}" /> },
        { letter: 'C', content: <Katex tex="f(x)=\dfrac{x^2+x+4}{x^2+1}" /> },
        { letter: 'D', content: <Katex tex="f(x)=\dfrac{5-x^2}{1+x}" /> },
        { letter: 'E', content: <Katex tex="f(x)=\sqrt{x-1}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="What a maximal domain is">
          <p>
            The maximal (or implied) domain is every real number the rule can actually be fed
            without breaking. You find it by asking what would break: division by zero, and
            the square root of a negative. Everything else is allowed.
          </p>
          <p>
            Here the target is <Katex tex="R\setminus\{1\}" /> — every real{' '}
            <em>except</em> <Katex tex="1" />. So you want a rule that dies at exactly one
            point, and that point is <Katex tex="1" />.
          </p>
        </Background>
      }
    />
  )
}
