// 2024 Specialist Mathematics — Exam 2, MCQ 12. VCAA examination report: 50% correct.
// Acceleration of an exponential is a constant multiple of the position. Question text transcribed from the original paper (2024 papers
// are image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 30, C: 50, D: 13 },
  answer: 'C',
  comment: (
    <>
      <Katex tex="a=\dfrac{d^2x}{dt^2}" />
      <br />
      <Katex tex="=(k-1)^2e^{(k-1)t}" />
      <br />
      Substitute <Katex tex="x=e^{(k-1)t}=k+1" />
      <br />
      <Katex tex="\therefore a=(k-1)^2(k+1)" />
      <br />
      <Katex tex="=\left(k^2-1\right)(k+1)" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="x = e^{(k-1)t}" />,
    reason: <>Acceleration is the second derivative of position. Here <Katex tex="k" /> is a constant, so <Katex tex="k-1" /> is a constant coefficient of <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="v = \frac{dx}{dt} = (k-1)e^{(k-1)t}" />,
    reason: <>Chain rule: the derivative of <Katex tex="e^{ct}" /> is <Katex tex="ce^{ct}" />, with <Katex tex="c=k-1" />.</>,
  },
  {
    working: <Katex display tex="a = \frac{dv}{dt} = (k-1)^2e^{(k-1)t} = (k-1)^2 x" />,
    reason: <>Differentiate again. The answer is <Katex tex="(k-1)^2" /> times <Katex tex="x" /> itself, so the given <Katex tex="x" /> can be substituted directly.</>,
    more: <>Solving <Katex tex="e^{(k-1)t}=k+1" /> for <Katex tex="t=\tfrac{\log_e(k+1)}{k-1}" /> and substituting it back also works, but it only undoes itself: <Katex tex="e^{(k-1)t}" /> returns to <Katex tex="k+1" />. Spotting <Katex tex="a=(k-1)^2x" /> skips that.</>,
  },
  {
    working: <Katex display tex="x = k+1 \implies a = (k-1)^2(k+1)" />,
    reason: <>Substitute the given position.</>,
  },
  {
    working: <Katex display tex="a = (k-1)\bigl[(k-1)(k+1)\bigr] = (k-1)\left(k^2-1\right)" />,
    reason: <>No option shows <Katex tex="(k-1)^2(k+1)" />, so pair one <Katex tex="(k-1)" /> with <Katex tex="(k+1)" /> to make the difference of squares <Katex tex="k^2-1" />.</>,
    more: <>Option <b>B</b>, <Katex tex="\left(k^2-1\right)(k+1)=(k-1)(k+1)^2" />, squares the wrong factor, and was chosen by 30%. A quick check with <Katex tex="k=2" />: <Katex tex="a=(1)^2(3)=3" />; option <b>C</b> gives <Katex tex="3\times1=3" />, option <b>B</b> gives <Katex tex="3\times3=9" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(k^2-1\right)(k-1)}" />,
    reason: <>Matches option <b>C</b>. The report's last line, <Katex tex="\left(k^2-1\right)(k+1)" />, is a slip: that is option <b>B</b>.</>,
    more: <>The report's working is right up to <Katex tex="a=(k-1)^2(k+1)" />. Option <b>A</b>, <Katex tex="k^2-1=(k-1)(k+1)" />, is the velocity at <Katex tex="x=k+1" />, not the acceleration. Option <b>D</b>, <Katex tex="(k-1)^2" />, is the multiplier <Katex tex="\tfrac{a}{x}" /> — the position was never substituted.</>,
  },
]

export default function SpecialistQ12_2024() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-1">
          <p>
            The position, <Katex tex="x" /> metres, of a particle moving in a straight line
            from a fixed origin <Katex tex="O" /> at time <Katex tex="t" /> seconds, is given
            by <Katex tex="x=e^{(k-1)t}" />, where <Katex tex="k>1" />.
          </p>
          <p>
            The acceleration of the particle, in m s<Katex tex="^{-2}" />, when{' '}
            <Katex tex="x=k+1" /> is
          </p>
        </div>
      }
      options={[
        { letter: 'A', content: <Katex tex="k^2-1" /> },
        { letter: 'B', content: <Katex tex="\left(k^2-1\right)(k+1)" /> },
        { letter: 'C', content: <Katex tex="\left(k^2-1\right)(k-1)" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="(k-1)^2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
