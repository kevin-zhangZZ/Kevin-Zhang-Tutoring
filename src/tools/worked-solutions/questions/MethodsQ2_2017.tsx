// 2017 Mathematical Methods — Exam 2, MCQ 2. VCAA examination report: 80% correct.
// Where a cubic is decreasing, read off its two stationary points. Question text
// transcribed from the original paper; the figure is a crop of VCAA's own artwork.
// Solution is original. The report has no comment on this question.
// Widget: meth-2017-mcq2-downhill — slide a tangent along the cubic (which is x(x + 5)(x − 3),
// the cubic with these two turning points); it points downhill only between them, and a toggle
// overlays y = f′(x), below the axis only between its roots.
// WrongMethod: option C (12%), f′(x) < 0 taken as "outside the roots" of the quadratic f′.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import diagramSrc from './meth-2017-mcq2-cubic.png'

const DownhillWidget = lazyWidget(() => import('../interactives/meth-2017-mcq2-downhill'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 1, B: 5, C: 12, D: 80, E: 1 },
  answer: 'D',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x)<0 \iff f \text{ is decreasing}" />,
    reason: (
      <>
        The question is about the <em>derivative</em>, which is the gradient of the tangent. So read the graph for
        where the curve goes downhill (left to right), not for where it is below the axis.
      </>
    ),
  },
  {
    working: <Katex display tex="f'(x)=0 \text{ at } x=-3 \text{ and } x=\tfrac53" />,
    reason: (
      <>
        Straight from the two labelled points: take their <Katex tex="x" />-coordinates, because the answer is an
        interval of <Katex tex="x" />-values. These are the only places the gradient is zero, so they are the only
        places its sign can change.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="(-3,36) \text{ is a maximum}" />
        <Katex display tex="\left(\tfrac53,-\tfrac{400}{27}\right) \text{ is a minimum}" />
      </>
    ),
    reason: (
      <>
        From the shape of the graph: it rises to the first, falls to the second, then rises again. The downhill
        stretch runs from the maximum to the minimum.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{f'(x)<0 \text{ on } \left(-3,\tfrac53\right)}" />,
    reason: (
      <>
        Matches option <b>D</b>. The brackets are round because <Katex tex="f'(x)=0" /> at the turning points
        themselves. Option C (12%) is the complement, where the cubic is increasing. Option B is where{' '}
        <Katex tex="f(x)" /> itself is negative (the cubic is <Katex tex="x(x+5)(x-3)" />), and option E uses the{' '}
        <Katex tex="y" />-coordinates of the turning points instead of the <Katex tex="x" />-coordinates.
      </>
    ),
  },
]

export default function MethodsQ2_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Part of the graph of a cubic polynomial function <Katex tex="f" /> and the
            coordinates of its stationary points are shown below.
          </p>
          <p>
            <Katex tex="f'(x)<0" /> for the interval
          </p>
        </>
      }
      diagram={
        <img loading="lazy" decoding="async"
          src={diagramSrc}
          alt="Part of a cubic graph with a local maximum at (−3, 36) and a local minimum at (5/3, −400/27), from the original 2017 VCAA exam paper"
          className="w-full max-w-[360px]"
        />
      }
      options={[
        { letter: 'A', content: <Katex tex="(0,3)" /> },
        { letter: 'B', content: <Katex tex="(-\infty,-5)\cup(0,3)" /> },
        { letter: 'C', content: <Katex tex="(-\infty,-3)\cup\left(\tfrac53,\infty\right)" /> },
        { letter: 'D', content: <Katex tex="\left(-3,\tfrac53\right)" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\left(-\tfrac{400}{27},36\right)" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="Slide the tangent: it points downhill only between the turning points">
            <DownhillWidget />
          </Explore>
          <WrongMethod
            title="f′ is a quadratic with roots −3 and 5/3, so f′(x) < 0 outside them"
            source="12% chose C"
            working={
              <>
                <Katex display tex="f'(x)=k(x+3)(3x-5)<0" />
                <Katex display tex="\Rightarrow x<-3 \text{ or } x>\tfrac53 \quad \text{✗}" />
              </>
            }
          >
            <p>
              The cubic ends up rising on the right, so its leading coefficient is positive and{' '}
              <Katex tex="f'" /> is an upright parabola (<Katex tex="k>0" />). An upright parabola is{' '}
              <em>negative between</em> its roots and positive outside them, so this picks exactly the wrong
              pieces: the intervals where <Katex tex="f" /> is increasing. To catch it, test one point from the
              graph. At <Katex tex="x=0" /> the curve is clearly heading downhill, and <Katex tex="0" /> lies in{' '}
              <Katex tex="\left(-3,\tfrac53\right)" />, not in option C.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
