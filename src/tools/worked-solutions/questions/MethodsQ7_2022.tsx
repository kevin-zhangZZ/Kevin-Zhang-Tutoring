// 2022 Mathematical Methods — Exam 2, MCQ 7. VCAA examination report: 73% correct.
// Matching a graph to the graph of its derivative. Question text transcribed from the
// original paper; the stem graph and all five option graphs are cropped directly from the
// original VCAA exam PDF (option letters masked), not redrawings. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import stemSrc from './meth-2022-mcq7-stem.png'
import optASrc from './meth-2022-mcq7-optA.png'
import optBSrc from './meth-2022-mcq7-optB.png'
import optCSrc from './meth-2022-mcq7-optC.png'
import optDSrc from './meth-2022-mcq7-optD.png'
import optESrc from './meth-2022-mcq7-optE.png'

function Panel({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-2 w-fit">
      <img src={src} alt={alt} className="w-full max-w-[160px]" />
    </div>
  )
}

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 8, C: 10, D: 3, E: 73 },
  answer: 'E',
}

const ROWS: WorkingRow[] = [
  {
    working: <>The graph of <Katex tex="f" /> rises to a local maximum near the origin, falls to a local minimum, then rises steeply.</>,
    reason: <>Reading the stem graph: two turning points, and increasing on either side of them.</>,
  },
  {
    working: <Katex display tex="f' > 0, \ \text{then } f' < 0, \ \text{then } f' > 0" />,
    reason: <>Where <Katex tex="f" /> increases <Katex tex="f'" /> is positive, and where it decreases <Katex tex="f'" /> is negative. So <Katex tex="f'" /> has exactly two <Katex tex="x" />-intercepts, at the turning points of <Katex tex="f" />.</>,
  },
  {
    working: <>A: negative, positive, negative, positive (three intercepts). B: negative, positive, negative. C: positive, negative, positive, negative.</>,
    reason: <>Each has the wrong sign pattern.</>,
  },
  {
    working: <>D: vertical asymptotes.</>,
    reason: <>The graph of <Katex tex="f" /> is smooth, so <Katex tex="f'" /> cannot blow up anywhere.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{E}}" />,
    reason: <>Positive, then negative between its two intercepts, then positive and rising steeply — every property of <Katex tex="f'" /> above. Matches option <b>E</b>.</>,
  },
]

export default function MethodsQ7_2022() {
  return (
    <MCQShell
      question={
        <>
          <p>The graph of <Katex tex="y=f(x)" /> is shown below.</p>
          <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit my-3">
            <img
              src={stemSrc}
              alt="The graph of y = f(x): rising from the lower left through the origin to a small local maximum just right of it, falling to a local minimum below the x-axis, then rising steeply — from the original 2022 VCAA exam paper"
              className="w-full max-w-[230px]"
            />
          </div>
          <p>
            The graph of <Katex tex="y=f'(x)" />, the first derivative of{' '}
            <Katex tex="f(x)" /> with respect to <Katex tex="x" />, could be
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Panel src={optASrc} alt="Option A: a curve that is negative, positive, negative, then positive, with three x-intercepts" /> },
        { letter: 'B', content: <Panel src={optBSrc} alt="Option B: a curve that is negative, rises through a positive maximum, then falls negative" /> },
        { letter: 'C', content: <Panel src={optCSrc} alt="Option C: a curve that is positive, negative, positive, then negative" /> },
        { letter: 'D', content: <Panel src={optDSrc} alt="Option D: branches separated by two vertical asymptotes" /> },
        { letter: 'E', content: <Panel src={optESrc} alt="Option E: a curve that is positive, falls below the x-axis to a minimum, then rises steeply back above it" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
