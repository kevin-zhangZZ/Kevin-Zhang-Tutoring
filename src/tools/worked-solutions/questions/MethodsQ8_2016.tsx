// 2016 Mathematical Methods — Exam 2, MCQ 8. VCAA examination report: 77% correct.
// Matching a UV-index graph to a cosine model. Question text transcribed from the
// original paper; the figure is a crop of VCAA's own artwork. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import diagramSrc from './meth-2016-mcq8-uv.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 77, C: 4, D: 6, E: 4 },
  answer: 'B',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{at } t=0,\ y=0 \text{ (a minimum)}" />,
    reason: <>Read it off the graph. A curve that <em>starts at its minimum</em> is <Katex tex="-\cos" />, not <Katex tex="+\cos" />. That rules out options A and C (which start at their maximum, <Katex tex="10" />) and E (which starts at <Katex tex="5" />).</>,
  },
  {
    working: <Katex display tex="\text{period} = 14" />,
    reason: <>The graph completes one full dip-peak-dip between <Katex tex="t=0" /> and <Katex tex="t=14" />.</>,
  },
  {
    working: <Katex display tex="\frac{2\pi}{n} = 14 \implies n = \frac{\pi}{7}" />,
    reason: <>So the inside of the cosine is <Katex tex="\tfrac{\pi t}{7}" />. Option D uses <Katex tex="\tfrac{\pi t}{14}" />, which has period <Katex tex="28" /> — twice too slow.</>,
  },
  {
    working: <Katex display tex="\text{max } 10, \text{ min } 0 \implies \text{amplitude } 5, \text{ midline } y=5" />,
    reason: <>Half the difference, and the average, of the two extremes.</>,
  },
  {
    working: <Katex display tex="\boxed{y = 5-5\cos\!\left(\frac{\pi t}{7}\right)}" />,
    reason: <>Matches option <b>B</b>. Check at <Katex tex="t=7" />: <Katex tex="5-5\cos(\pi)=5+5=10" /> ✓, the peak — which the graph puts at <Katex tex="t=7" />, or 1 pm.</>,
  },
]

export default function MethodsQ8_2016() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The UV index, <Katex tex="y" />, for a summer day in Melbourne is illustrated in
            the graph below, where <Katex tex="t" /> is the number of hours after 6 am.
          </p>
          <p>The graph is most likely to be the graph of</p>
        </>
      }
      diagram={
        <img
          src={diagramSrc}
          alt="A single smooth hump starting at zero at t = 0, peaking at 10 around t = 7, and returning to zero near t = 14, from the original 2016 VCAA exam paper"
          className="w-full max-w-[420px]"
        />
      }
      options={[
        { letter: 'A', content: <Katex tex="y=5+5\cos\!\left(\tfrac{\pi t}{7}\right)" /> },
        { letter: 'B', content: <Katex tex="y=5-5\cos\!\left(\tfrac{\pi t}{7}\right)" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="y=5+5\cos\!\left(\tfrac{\pi t}{14}\right)" /> },
        { letter: 'D', content: <Katex tex="y=5-5\cos\!\left(\tfrac{\pi t}{14}\right)" /> },
        { letter: 'E', content: <Katex tex="y=5+5\sin\!\left(\tfrac{\pi t}{14}\right)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
