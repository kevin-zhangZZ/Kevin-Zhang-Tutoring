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
    working: <><Katex tex="f" />: increasing, then decreasing, then increasing (two turning points).</>,
    reason: <>Reading the stem graph: <Katex tex="f" /> rises to a local maximum just right of the origin, falls to a local minimum, then rises steeply.</>,
  },
  {
    working: <Katex display tex="f' > 0, \ \text{then } f' < 0, \ \text{then } f' > 0" />,
    reason: <>The derivative is the gradient of <Katex tex="f" />: positive where <Katex tex="f" /> is increasing, negative where it is decreasing. At each turning point the gradient is zero, so the graph of <Katex tex="f'" /> crosses the <Katex tex="x" />-axis exactly twice, at the <Katex tex="x" />-values of the turning points.</>,
    more: <>The <Katex tex="x" />-intercepts of <Katex tex="f" /> play no part here. The graph of <Katex tex="f'" /> records how steep <Katex tex="f" /> is, not how high it is, so <Katex tex="f'" /> is zero where <Katex tex="f" /> is flat (its turning points), not where <Katex tex="f" /> crosses the <Katex tex="x" />-axis.</>,
  },
  {
    working: <><Katex tex="f'" /> is large and positive at both ends, with a minimum between its two <Katex tex="x" />-intercepts.</>,
    reason: <>The graph of <Katex tex="f" /> is steep at both ends, so its gradient is large there. Between the turning points <Katex tex="f" /> is falling, and it falls fastest partway between them, so that is where <Katex tex="f'" /> is most negative.</>,
    more: <>The point where <Katex tex="f" /> falls fastest is its point of inflection, where the curve changes from bending downwards (concave down) to bending upwards (concave up). A turning point of <Katex tex="f'" /> always lines up with a point of inflection of <Katex tex="f" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{E}}" />,
    reason: <>Matches option <b>E</b>, the only graph that goes positive, negative, positive by crossing the <Katex tex="x" />-axis twice.</>,
    more: (
      <>
        <p>
          E has every property found above: positive, then negative between its two <Katex tex="x" />-intercepts (the
          first just right of the origin, like the local maximum of <Katex tex="f" />), then positive again, with a
          minimum in between and steep at both ends.
        </p>
        <p>
          A, B and C have the wrong sign pattern. A (negative, positive, negative, positive, with three{' '}
          <Katex tex="x" />-intercepts) has the same shape as <Katex tex="f" /> itself: it copies the height of{' '}
          <Katex tex="f" /> instead of its gradient. B (negative, positive, negative) has exactly the opposite signs.
          C, the most common wrong answer, starts positive then negative like E, but then turns positive and negative
          again: it has three <Katex tex="x" />-intercepts and ends negative, which would need <Katex tex="f" /> to be
          falling at the far right, where it actually rises steeply.
        </p>
        <p>
          D does go positive, negative, positive, but it switches sign at vertical asymptotes instead of crossing the{' '}
          <Katex tex="x" />-axis. The graph of <Katex tex="f" /> is smooth with no vertical tangents, so its gradient is
          a finite number at every <Katex tex="x" /> and <Katex tex="f'" /> has no asymptotes. At the turning points{' '}
          <Katex tex="f'(x)=0" />, so <Katex tex="f'" /> must actually cross the axis.
        </p>
      </>
    ),
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
