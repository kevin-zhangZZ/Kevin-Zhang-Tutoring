// 2018 Specialist Mathematics — Exam 2, MCQ 1. VCAA examination report: 85% correct. The
// asymptotes of y = ½arctan(x). Question text and diagram transcribed from the original
// paper; the figure is cropped directly from the exam PDF, not a redrawing.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import graphSrc from './spec-2018-mcq1-arctan.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 3, C: 4, D: 7, E: 85 },
  answer: 'E',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="-\frac{\pi}{2} < \tan^{-1}(x) < \frac{\pi}{2} \ \text{ for all } x\in\mathbb{R}" />,
    reason: <>The range of the inverse tangent. It approaches <Katex tex="\pm\tfrac{\pi}{2}" /> but never reaches them, which is exactly what makes those values asymptotes.</>,
  },
  {
    working: <Katex display tex="y = \frac12\tan^{-1}(x) \implies -\frac{\pi}{4} < y < \frac{\pi}{4}" />,
    reason: <>The factor of <Katex tex="\tfrac12" /> is a dilation by factor <Katex tex="\tfrac12" /> from the <Katex tex="x" />-axis, which halves every <Katex tex="y" />-value — including the limiting ones.</>,
  },
  {
    working: <Katex display tex="\boxed{y = \pm\frac{\pi}{4}}" />,
    reason: <>Matches option <b>E</b>. (<Katex tex="\tfrac{\pi}{4}\approx0.79" />, which fits the graph: the curve levels out a little below <Katex tex="1" />.) Option <b>D</b> <Katex tex="\left(\pm\tfrac{\pi}{2}\right)" /> forgets the dilation and quotes the asymptotes of the un-scaled <Katex tex="\tan^{-1}(x)" />.</>,
  },
]

export default function SpecialistQ1_2018() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-3">
            Part of the graph of <Katex tex="y=\dfrac12\tan^{-1}(x)" /> is shown below.
          </p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img src={graphSrc} alt="Graph of y = ½arctan(x): an increasing S-shaped curve through the origin, flattening towards horizontal dashed lines above and below the axis, from the original 2018 VCAA exam paper" className="w-full max-w-[420px]" />
          </div>
          <p className="mt-3">The equations of its asymptotes are</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="y=\pm\dfrac12" /> },
        { letter: 'B', content: <Katex tex="y=\pm\dfrac34" /> },
        { letter: 'C', content: <Katex tex="y=\pm1" /> },
        { letter: 'D', content: <Katex tex="y=\pm\dfrac{\pi}{2}" /> },
        { letter: 'E', content: <Katex tex="y=\pm\dfrac{\pi}{4}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
