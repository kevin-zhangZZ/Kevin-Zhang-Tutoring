// 2023 Mathematical Methods — Exam 2, MCQ 17. VCAA examination report: 28% correct. Volume of
// a cylinder rolled from a rectangular sheet with two circular end-caps cut from it. Question
// text transcribed from the original paper; the diagram is cropped directly from the original
// VCAA exam PDF, not a redrawing. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import diagramSrc from './meth-2023-mcq17-cylinder-sheet.png'

const DIAGRAM = <img src={diagramSrc} alt="Rectangular metal sheet of length x and width y, with two circular end-caps of radius r cut out, leaving a middle strip of width h, from the original 2023 VCAA exam paper" className="w-full max-w-[320px]" />

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 28, C: 26, D: 26, E: 13 },
  answer: 'B',
  noAnswer: 1,
  comment: (
    <>
      The base of the cylinder has a circumference of <Katex tex="2\pi r" /> units, so <Katex tex="y=2\pi r" />,{' '}
      <Katex tex="r=y/(2\pi)" />; <Katex tex="h=x-4r" />; <Katex tex="V=\pi r^2h = \dfrac{\pi xy^2-2y^3}{4\pi^2}" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: DIAGRAM,
    reason: <>The shaded middle strip (width <Katex tex="h" />, height <Katex tex="y" />) rolls up into the cylinder's curved surface; the two circles of radius <Katex tex="r" /> become its top and bottom.</>,
  },
  {
    working: <Katex display tex="y = 2\pi r \;\implies\; r = \frac{y}{2\pi}" />,
    reason: <>The height <Katex tex="y" /> of the sheet becomes the circumference of the circular cross-section once rolled.</>,
  },
  {
    working: <Katex display tex="h = x - 4r" />,
    reason: <>The two end circles (diameter <Katex tex="2r" /> each) are cut from the two ends of the length <Katex tex="x" />, leaving <Katex tex="h" /> for the middle strip.</>,
  },
  {
    working: <Katex display tex="h = x - \frac{4y}{2\pi} = x - \frac{2y}{\pi}" />,
    reason: 'Substitute r in terms of y.',
  },
  {
    working: <Katex display tex="V = \pi r^2 h = \pi\left(\frac{y}{2\pi}\right)^2\left(x-\frac{2y}{\pi}\right)" />,
    reason: 'Standard cylinder volume formula.',
  },
  {
    working: <Katex display tex="= \frac{y^2}{4\pi}\left(x - \frac{2y}{\pi}\right) = \frac{xy^2}{4\pi} - \frac{2y^3}{4\pi^2}" />,
    reason: 'Expand.',
  },
  {
    working: <Katex display tex="\boxed{V = \frac{\pi xy^2 - 2y^3}{4\pi^2}}" />,
    reason: <>Common denominator <Katex tex="4\pi^2" /> — matches option <b>B</b>.</>,
  },
]

export default function MethodsQ17_2023() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A cylinder of height <Katex tex="h" /> and radius <Katex tex="r" /> is formed from a thin rectangular
            sheet of metal of length <Katex tex="x" /> and width <Katex tex="y" />, by cutting along the dashed
            lines shown below.
          </p>
          <p>The volume of the cylinder, in terms of <Katex tex="x" /> and <Katex tex="y" />, is given by</p>
        </>
      }
      diagram={DIAGRAM}
      options={[
        { letter: 'A', content: <Katex tex="\pi x^2 y" /> },
        { letter: 'B', content: <Katex tex="\dfrac{\pi xy^2-2y^3}{4\pi^2}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\dfrac{2y^3-\pi xy^2}{4\pi^2}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{\pi xy-2y^2}{2\pi}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{2y^2-\pi xy}{2\pi}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
