// 2018 Mathematical Methods — Exam 2, MCQ 6. VCAA examination report: 58% correct. A
// composite where g is given only as g(x+2), so its rule must be recovered first. Question
// text transcribed from the original paper; VCAA printed no diagram and neither does the stem
// here (guide §7). Answer checked with sympy. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 10, C: 6, D: 58, E: 20 },
  answer: 'D',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="g(x+2) = 3x+1" />,
    reason: <>This is <em>not</em> the rule for <Katex tex="g" />. It tells you what <Katex tex="g" /> does to the input <Katex tex="x+2" />, so the rule has to be extracted before it can be used.</>,
  },
  {
    working: <Katex display tex="\text{Let } u = x+2 \implies x = u-2" />,
    reason: <>Substitution renames the input so that <Katex tex="g" /> is applied to a single letter.</>,
  },
  {
    working: <Katex display tex="g(u) = 3(u-2)+1 = 3u-6+1 = 3u-5" />,
    reason: <>Replacing <Katex tex="x" /> by <Katex tex="u-2" /> on the right-hand side.</>,
  },
  {
    working: <Katex display tex="g(x) = 3x-5" />,
    reason: <>The name of the variable is irrelevant, so relabel back to <Katex tex="x" />. Sanity check: <Katex tex="g(x+2)=3(x+2)-5=3x+1" /> ✓, which is what was given.</>,
  },
  {
    working: <Katex display tex="f(g(x)) = 2\bigl(g(x)\bigr) = 2(3x-5)" />,
    reason: <><Katex tex="f" /> doubles whatever it receives, and here it receives <Katex tex="g(x)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f(g(x)) = 6x-10}" />,
    reason: <>Matches option <b>D</b>. Option <b>E</b> <Katex tex="(6x+2)" />, chosen by <Katex tex="20\%" />, is what you get by treating <Katex tex="3x+1" /> as the rule for <Katex tex="g" /> itself and doubling it — skipping the substitution step entirely. Option <b>C</b> <Katex tex="\left(6x^2+1\right)" /> comes from composing the wrong way round.</>,
  },
]

export default function MethodsQ6_2018() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="f" /> and <Katex tex="g" /> be two functions such that{' '}
          <Katex tex="f(x)=2x" /> and <Katex tex="g(x+2)=3x+1" />. The function{' '}
          <Katex tex="f(g(x))" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="6x-5" /> },
        { letter: 'B', content: <Katex tex="6x+1" /> },
        { letter: 'C', content: <Katex tex="6x^2+1" /> },
        { letter: 'D', content: <Katex tex="6x-10" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="6x+2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="When a function is given at a shifted input">
          <p>
            <Katex tex="g(x+2)=3x+1" /> defines <Katex tex="g" /> indirectly. Reading it as
            "<Katex tex="g" /> of something is <Katex tex="3\times" /> that something{' '}
            <Katex tex="+1" />" is the trap — the <Katex tex="3x" /> on the right is written
            in terms of <Katex tex="x" />, not in terms of the input <Katex tex="x+2" />.
          </p>
          <p>
            Substituting <Katex tex="u=x+2" /> forces the right-hand side to be rewritten in
            terms of the actual input, and that is where the <Katex tex="-5" /> appears.
            Always check the recovered rule by feeding the original input back in.
          </p>
        </Background>
      }
    />
  )
}
