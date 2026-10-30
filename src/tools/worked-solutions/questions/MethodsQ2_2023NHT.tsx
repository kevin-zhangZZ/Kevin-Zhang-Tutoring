// 2023 Mathematical Methods NHT — Exam 2, MCQ 2. The NHT report gives the answer key only, with
// no statistics. Calculus: instantaneous rate of change of a cubic. Question text transcribed from
// the original paper. Solution is original; the answer C agrees with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'C' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f'(t)=-t^2+t+50" />,
    reason: <>The instantaneous rate of change is the derivative. Differentiate term by term: <Katex tex="\tfrac{d}{dt}\left(-\tfrac13t^3\right)=-t^2" />, <Katex tex="\tfrac{d}{dt}\left(\tfrac12t^2\right)=t" />, <Katex tex="\tfrac{d}{dt}(50t)=50" />.</>,
    more: <>&ldquo;Instantaneous&rdquo; is the key word: it means the gradient of the tangent at that one instant, <Katex tex="f'(1)" />, not the value <Katex tex="f(1)" /> and not an average rate of change over an interval.</>,
  },
  {
    working: <Katex display tex="f'(1)=-1+1+50" />,
    reason: <>Substitute <Katex tex="t=1" /> into the derivative <Katex tex="f'(t)" />, not into <Katex tex="f(t)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(1)=50.0}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: <>Option <b>B</b>, 50.2, is <Katex tex="f(1)=-\tfrac13+\tfrac12+50=\tfrac{301}{6}\approx50.17" />: the value of the function, not its rate of change. The two are close here only because <Katex tex="50t" /> dominates both near <Katex tex="t=1" />.</>,
  },
]

export default function MethodsQ2_2023NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-2">
          <p>
            Let <Katex tex="f(t)=-\dfrac{1}{3}t^3+\dfrac{1}{2}t^2+50t" />.
          </p>
          <p>
            The instantaneous rate of change of <Katex tex="f" /> when <Katex tex="t=1" /> is
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="247.5" /> },
        { letter: 'B', content: <Katex tex="50.2" /> },
        { letter: 'C', content: <Katex tex="50.0" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="-13.8" /> },
        { letter: 'E', content: <Katex tex="-22.0" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
