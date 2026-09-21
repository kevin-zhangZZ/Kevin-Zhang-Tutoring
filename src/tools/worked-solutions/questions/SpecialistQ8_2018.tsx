// 2018 Specialist Mathematics — Exam 2, MCQ 8. VCAA examination report: 71% correct.
// Rewriting a definite integral under the substitution u = tan(x). Question text transcribed
// from the original paper; VCAA printed no diagram and neither does the stem here (guide §7).
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 14, B: 7, C: 4, D: 4, E: 71 },
  answer: 'E',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="u = \tan(x) \implies \frac{du}{dx} = \sec^2(x) \implies du = \sec^2(x)\,dx" />,
    reason: <>Choose the substitution so that the <em>rest</em> of the integrand is exactly the derivative. Here <Katex tex="\sec^2(x)\,dx" /> is already sitting there, which is the signal that <Katex tex="u=\tan(x)" /> is the right choice.</>,
  },
  {
    working: <Katex display tex="\tan^2(x)\sec^2(x)\,dx = u^2\,du" />,
    reason: <>The <Katex tex="\tan^2(x)" /> becomes <Katex tex="u^2" /> and the <Katex tex="\sec^2(x)\,dx" /> becomes <Katex tex="du" /> in one step.</>,
  },
  {
    working: <Katex display tex="x=0 \implies u=\tan(0)=0" />,
    reason: <>Change the terminals too — a definite integral in <Katex tex="u" /> needs <Katex tex="u" />-terminals.</>,
  },
  {
    working: <Katex display tex="x=\frac{\pi}{6} \implies u=\tan\!\left(\frac{\pi}{6}\right)=\frac{1}{\sqrt3}" />,
    reason: <>The exact value. Leaving the terminal as <Katex tex="\tfrac{\pi}{6}" /> gives option <b>D</b>, which mixes <Katex tex="x" />-terminals with a <Katex tex="u" />-integrand.</>,
  },
  {
    working: <Katex display tex="\boxed{\int_0^{1/\sqrt3} u^2\,du}" />,
    reason: <>Matches option <b>E</b>. Option <b>A</b>, chosen by <Katex tex="14\%" />, has integrand <Katex tex="u^4+u^2" /> — that is what appears if <Katex tex="\sec^2=1+\tan^2" /> is expanded before substituting, and then <Katex tex="\sec^2(x)\,dx" /> is still replaced by <Katex tex="du" />, double-counting it. Option <b>C</b> loses a power.</>,
  },
]

export default function SpecialistQ8_2018() {
  return (
    <MCQShell
      question={
        <p>
          Using a suitable substitution,{' '}
          <Katex tex="\displaystyle\int_0^{\pi/6}\tan^2(x)\sec^2(x)\,dx" /> can be expressed
          as
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\displaystyle\int_0^{1/\sqrt3}\left(u^4+u^2\right)du" /> },
        { letter: 'B', content: <Katex tex="\displaystyle\int_1^{2/\sqrt3}\left(u^4+u^2\right)du" /> },
        { letter: 'C', content: <Katex tex="\displaystyle\int_0^{1/\sqrt3} u\,du" /> },
        { letter: 'D', content: <Katex tex="\displaystyle\int_0^{\pi/6} u^2\,du" /> },
        { letter: 'E', content: <Katex tex="\displaystyle\int_0^{1/\sqrt3} u^2\,du" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="Three things change, not one">
          <p>
            A substitution in a <em>definite</em> integral changes the integrand, the{' '}
            <Katex tex="dx" /> and the terminals. Every one of the four wrong options here
            gets one of those three wrong, so check all three before choosing.
          </p>
          <p>
            The give-away for which substitution to use is that{' '}
            <Katex tex="\sec^2(x)" /> is exactly <Katex tex="\tfrac{d}{dx}\tan(x)" />. When
            an integrand contains a function and its own derivative multiplied together, the
            function is the substitution.
          </p>
        </Background>
      }
    />
  )
}
