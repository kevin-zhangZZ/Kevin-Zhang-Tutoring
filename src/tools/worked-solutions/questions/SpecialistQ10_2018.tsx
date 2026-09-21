// 2018 Specialist Mathematics — Exam 2, MCQ 10. VCAA examination report: 65% correct.
// Matching a direction field to its differential equation. Question text and diagram
// transcribed from the original paper; the figure is cropped directly from the exam PDF,
// not a redrawing. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import fieldSrc from './spec-2018-mcq10-dirfield.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 65, B: 7, C: 9, D: 6, E: 12 },
  answer: 'A',
  noAnswer: 1,
}

const DIAGRAM = (
  <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-3 w-fit">
    <img src={fieldSrc} alt="A direction field on axes from −8 to 8: slope marks turn steeply near the origin and flatten far out, with a clear change of behaviour across the lines y = 2x and y = −x/2" className="w-full max-w-[420px]" />
  </div>
)

const ROWS: WorkingRow[] = [
  {
    working: DIAGRAM,
    reason: <>Test a few easy points against each option rather than trying to read the whole field at once. Points on the axes are quickest, because one variable is zero.</>,
  },
  {
    working: <Katex display tex="\text{On the positive } x\text{-axis } (x>0,\ y=0): \ \text{marks slope down-right}" />,
    reason: <>Reading the field: just to the right of the origin along the axis, the dashes tilt downwards.</>,
  },
  {
    working: <Katex display tex="\textbf{A}: \ \frac{dy}{dx} = \frac{2x+y}{y-2x} \implies \frac{2x+0}{0-2x} = -1 \ \checkmark" />,
    reason: <>Negative, matching the field. Note the gradient is <Katex tex="-1" /> for <em>every</em> point on the positive <Katex tex="x" />-axis, which is what the uniform tilt along that axis shows.</>,
  },
  {
    working: <Katex display tex="\text{On the positive } y\text{-axis } (x=0,\ y>0): \ \textbf{A} \text{ gives } \frac{0+y}{y-0} = 1" />,
    reason: <>Positive, sloping up-right — again matching the printed field, where the marks above the origin lean the other way.</>,
  },
  {
    working: <Katex display tex="\text{Vertical marks where } y = 2x \ \text{ (denominator } y-2x=0)" />,
    reason: <>The field turns vertical along that line, and the diagram does show the marks standing up as they cross it. That single feature separates <b>A</b> from most of the alternatives, whose denominators vanish somewhere else.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = \frac{2x+y}{y-2x}}" />,
    reason: <>Matches option <b>A</b>. Option <b>E</b>, chosen by <Katex tex="12\%" />, has denominator <Katex tex="2y-x" />, so its vertical marks would lie along <Katex tex="y=\tfrac{x}{2}" /> — a noticeably shallower line than the field shows.</>,
  },
]

export default function SpecialistQ10_2018() {
  return (
    <MCQShell
      question={<p>The differential equation that best represents the direction field above is</p>}
      diagram={<img src={fieldSrc} alt="Direction field for the differential equation, from the original 2018 VCAA exam paper" className="w-full max-w-[300px]" />}
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{dy}{dx}=\dfrac{2x+y}{y-2x}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\dfrac{dy}{dx}=\dfrac{x+2y}{2x-y}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{dy}{dx}=\dfrac{2x-y}{x+2y}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{dy}{dx}=\dfrac{x-2y}{y-2x}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{dy}{dx}=\dfrac{2x+y}{2y-x}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="Test points, do not read the whole field">
          <p>
            Matching a direction field is a process of elimination, not of recognition. Pick
            two or three points where the arithmetic is trivial — usually on the axes, where
            one variable is zero — work out what each option predicts there, and discard the
            ones that disagree with the picture.
          </p>
          <p>
            One more feature is worth looking for: where the <em>denominator</em> vanishes the
            gradient is undefined and the marks stand vertical. Spotting the line of vertical
            marks in the diagram usually identifies the denominator immediately.
          </p>
        </Background>
      }
    />
  )
}
