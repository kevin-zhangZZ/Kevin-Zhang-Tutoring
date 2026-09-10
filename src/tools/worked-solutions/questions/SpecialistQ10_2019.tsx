// 2019 Specialist Mathematics — Exam 2, MCQ 10. VCAA examination report: 58% correct.
// Related rates: height of a growing conical sand pile. Question text and diagram transcribed
// from the original paper (the diagram is the actual VCAA figure, cropped from the official
// exam PDF, not a redrawing). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import coneSrc from './spec-2019-mcq10-cone.png'

const DIAGRAM = (
  <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-3 w-fit">
    <img
      src={coneSrc}
      alt="A cone of sand with semi-vertex angle 60 degrees and height h, marked with a right angle from the apex down to the centre of the circular base"
      className="w-full max-w-[300px]"
    />
  </div>
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 13, C: 58, D: 14, E: 7 },
  answer: 'C',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\tan(60^\circ) = \frac{r}{h} \;\implies\; r = h\tan(60^\circ) = h\sqrt3" />,
    reason: 'The semi-vertex angle relates the base radius to the height of the cone at every instant.',
  },
  {
    working: <Katex display tex="V = \frac13\pi r^2 h = \frac13\pi (h\sqrt3)^2 h = \pi h^3" />,
    reason: 'Substitute r into the cone volume formula, expressing V purely in terms of h.',
  },
  {
    working: <Katex display tex="\frac{dV}{dt} = 3\pi h^2 \frac{dh}{dt}" />,
    reason: 'Differentiate with respect to t (chain rule).',
  },
  {
    working: <Katex display tex="1.5 = 3\pi (0.5)^2 \frac{dh}{dt} = 0.75\pi\,\frac{dh}{dt}" />,
    reason: <>Substitute <Katex tex="dV/dt=1.5" /> and <Katex tex="h=0.5" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dh}{dt} = \frac{1.5}{0.75\pi} = \frac{2}{\pi} \approx 0.64}" />,
    reason: <>Matches option <b>C</b>.</>,
  },
]

export default function SpecialistQ10_2019() {
  return (
    <MCQShell
      question={
        <>
          <div className="mb-3">{DIAGRAM}</div>
          <p>
            Sand falls from a chute to form a pile in the shape of a right circular cone with semi-vertex angle{' '}
            <Katex tex="60^\circ" />. Sand is added to the pile at a rate of <Katex tex="1.5\text{ m}^3" /> per minute.
          </p>
          <p className="mt-2">
            The rate at which the height <Katex tex="h" /> metres of the pile is increasing, in metres per minute,
            when the height of the pile is <Katex tex="0.5" /> m, correct to two decimal places, is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="0.21" /> },
        { letter: 'B', content: <Katex tex="0.31" /> },
        { letter: 'C', content: <Katex tex="0.64" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="3.82" /> },
        { letter: 'E', content: <Katex tex="3.53" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
