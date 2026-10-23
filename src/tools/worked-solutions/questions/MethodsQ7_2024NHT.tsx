// 2024 Mathematical Methods NHT — Exam 2, MCQ 7. The NHT report gives the answer key only, with
// no statistics. Functions: finding the parameters of a cosine function from its period and
// maximum. Question text transcribed from the original paper. Solution is original; the answer B
// agrees with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'B' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{2\pi}{|b-1|}=\frac{\pi}{3}\ \Rightarrow\ |b-1|=6" />,
    reason: <>The period of <Katex tex="\cos(nx)" /> is <Katex tex="\tfrac{2\pi}{|n|}" />, and here <Katex tex="n=b-1" />.</>,
  },
  {
    working: <Katex display tex="b-1=6\ \text{or}\ b-1=-6\ \Rightarrow\ b=7\ \text{or}\ b=-5" />,
    reason: <>Both signs give the same period, so keep both for now.</>,
  },
  {
    working: <Katex display tex="b=7" />,
    reason: <><Katex tex="b=-5" /> is rejected, since the question says <Katex tex="b>0" />.</>,
  },
  {
    working: <Katex display tex="\max f=|a|+b=|a|+7=10\ \Rightarrow\ |a|=3" />,
    reason: <>Cosine runs between <Katex tex="-1" /> and <Katex tex="1" />, so <Katex tex="a\cos(\ldots)" /> runs between <Katex tex="-|a|" /> and <Katex tex="|a|" />, and adding <Katex tex="b" /> shifts both up by <Katex tex="b" />.</>,
    more: <><Katex tex="a" /> could be <Katex tex="3" /> or <Katex tex="-3" />: a negative <Katex tex="a" /> reflects the graph in its mean line but doesn&apos;t change the maximum or minimum, so it isn&apos;t needed.</>,
  },
  {
    working: <Katex display tex="\boxed{\min f=b-|a|=7-3=4}" />,
    reason: <>Matches option <b>B</b>. Check: the graph oscillates between <Katex tex="4" /> and <Katex tex="10" /> about its mean line <Katex tex="y=7" />, one amplitude of <Katex tex="3" /> each way.</>,
    more: <>Ignoring <Katex tex="b>0" /> doesn&apos;t lead to another option either: <Katex tex="b=-5" /> needs <Katex tex="|a|=15" />, and the minimum would be <Katex tex="-20" />.</>,
  },
]

export default function MethodsQ7_2024NHT() {
  return (
    <MCQShell
      question={
        <p>
          The function <Katex tex="f:R\to R,\ f(x)=a\cos\big((b-1)x\big)+b" /> has a period of <Katex tex="\dfrac{\pi}{3}" /> and a maximum value of <Katex tex="10" />.
          <br />
          Given that <Katex tex="b>0" />, the minimum value of the function <Katex tex="f" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="6" /> },
        { letter: 'B', content: <Katex tex="4" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="1" /> },
        { letter: 'D', content: <Katex tex="-4" /> },
        { letter: 'E', content: <Katex tex="-10" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
