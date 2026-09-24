// 2018 Specialist Mathematics — Exam 2, MCQ 7. VCAA examination report: 78% correct. The
// length of a parametric curve. Question text transcribed from the original paper; VCAA
// printed no diagram and neither does the stem here (guide §7). Value checked numerically
// (12.1944). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 5, C: 78, D: 12, E: 1 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="L = \int_{t_1}^{t_2}\sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2}\,dt" />,
    reason: <>Arc length of a parametric curve. Parametric arc length is current content — only the cartesian-form version was removed from the study design.</>,
  },
  {
    working: <Katex display tex="\frac{dx}{dt} = 2\cos(2t), \qquad \frac{dy}{dt} = -2\sin(t)" />,
    reason: <>Chain rule on <Katex tex="\sin(2t)" /> brings out the <Katex tex="2" />; <Katex tex="2\cos(t)" /> differentiates to <Katex tex="-2\sin(t)" />.</>,
  },
  {
    working: <Katex display tex="L = \int_0^{2\pi}\sqrt{4\cos^2(2t)+4\sin^2(t)}\,dt" />,
    reason: <>Substituting. This does not simplify to anything nice, so it is a numerical integral — which is what the word "closest to" in the question is signalling.</>,
  },
  {
    working: <Cas fn="nInt">nInt(√(4cos(2t)^2+4sin(t)^2), t, 0, 2π)</Cas>,
    reason: <>Radian mode. Use the full <Katex tex="[0,2\pi]" /> given in the question — the curve is traced once over that interval.</>,
  },
  {
    working: <Katex display tex="\boxed{L \approx 12.1944 \approx 12.2}" />,
    reason: <>Matches option <b>C</b>. Option <b>D</b> <Katex tex="(12.5)" />, chosen by <Katex tex="12\%" />, is what the same integral gives with the calculator in degree mode (<Katex tex="12.49" />). Option <b>B</b> <Katex tex="(9.5)" /> takes <Katex tex="\tfrac{dx}{dt}" /> as <Katex tex="\cos(2t)" />, forgetting the chain-rule factor <Katex tex="2" />.</>,
  },
]

export default function SpecialistQ7_2018() {
  return (
    <MCQShell
      question={
        <p>
          A curve is described parametrically by <Katex tex="x=\sin(2t)" />,{' '}
          <Katex tex="y=2\cos(t)" /> for <Katex tex="0\le t\le2\pi" />. The length of the
          curve is closest to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="9.2" /> },
        { letter: 'B', content: <Katex tex="9.5" /> },
        { letter: 'C', content: <Katex tex="12.2" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="12.5" /> },
        { letter: 'E', content: <Katex tex="38.3" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background>
          <p>
            Two of the options sit only <Katex tex="0.3" /> apart, so this is a question about
            setting the integral up exactly right and then letting technology evaluate it —
            not about estimating. Keep the square root, keep the given terminals, and work in
            radians.
          </p>
        </Background>
      }
    />
  )
}
