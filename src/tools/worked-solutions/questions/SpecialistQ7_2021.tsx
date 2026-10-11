// 2021 Specialist Mathematics — Exam 2, MCQ 7. VCAA examination report: 39% correct.
// Shortest distance along a parametrically-defined circle between two given points. Question
// text transcribed from the original paper. Solution is original. Widget:
// interactives/spec-2021-mcq7-angle-2t.tsx (slide t: the point turns through 2t, not t).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const AngleWidget = lazyWidget(() => import('../interactives/spec-2021-mcq7-angle-2t'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 18, C: 10, D: 23, E: 39 },
  answer: 'E',
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}&(x-1)^2+(y+1)^2\\ &= 25\cos^2(2t)+25\sin^2(2t)\\ &= 25\end{aligned}"
      />
    ),
    reason: (
      <>
        Isolate <Katex tex="x-1=5\cos(2t)" /> and <Katex tex="y+1=5\sin(2t)" />, square and add, and use{' '}
        <Katex tex="\cos^2+\sin^2=1" />. The graph is a circle with centre <Katex tex="(1,-1)" /> and radius{' '}
        <Katex tex="5" />.
      </>
    ),
    more: (
      <>
        A shortest distance <b>along the graph</b> is an
        arc length, so we need the angle between <Katex tex="A" /> and <Katex tex="B" /> at the centre.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{angle at the centre} = 2t" />,
    reason: (
      <>
        In <Katex tex="x=1+5\cos\theta" />, <Katex tex="y=-1+5\sin\theta" />, <Katex tex="\theta" /> is the angle at
        the centre (anticlockwise from the horizontal). Here <Katex tex="2t" /> is in the place of{' '}
        <Katex tex="\theta" />, so the angle is <Katex tex="2t" />, <b>not</b> <Katex tex="t" />.
      </>
    ),
    more: (
      <>
        So the point turns twice as fast as <Katex tex="t" /> grows. Treating{' '}
        <Katex tex="t" /> as the angle is what leads to option D, the most common wrong answer (23%).
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned}A(6,-1):\ &\cos(2t)=1,\ \sin(2t)=0\\ &\implies 2t=0\end{aligned}" />,
    reason: (
      <>
        Substitute <Katex tex="A" />: <Katex tex="5\cos(2t)+1=6" /> and <Katex tex="5\sin(2t)-1=-1" />. So{' '}
        <Katex tex="A" /> is at angle <Katex tex="0" /> (<Katex tex="t=0" />), directly right of the centre.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned}B(1,4):\ &\cos(2t)=0,\ \sin(2t)=1\\ &\implies 2t=\tfrac{\pi}{2}\end{aligned}" />,
    reason: (
      <>
        Substitute <Katex tex="B" />: <Katex tex="5\cos(2t)+1=1" /> and <Katex tex="5\sin(2t)-1=4" />. So{' '}
        <Katex tex="B" /> is at angle <Katex tex="\tfrac{\pi}{2}" /> (<Katex tex="t=\tfrac{\pi}{4}" />), directly above
        the centre.
      </>
    ),
    more: (
      <>
        So from <Katex tex="A" /> to <Katex tex="B" />, <Katex tex="t" /> changes by only <Katex tex="\tfrac{\pi}{4}" />{' '}
        while the angle at the centre changes by <Katex tex="\tfrac{\pi}{2}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{arc } AB = r\times\text{angle} = 5\times\tfrac{\pi}{2}" />,
    reason: (
      <>
        Arc length is radius × angle at the centre (in radians). Anticlockwise from <Katex tex="A" /> to{' '}
        <Katex tex="B" /> is a quarter turn, <Katex tex="\tfrac{\pi}{2}" />, the shorter way round.
      </>
    ),
    more: (
      <>
        The other way round is <Katex tex="\tfrac{3\pi}{2}" />, giving{' '}
        <Katex tex="5\times\tfrac{3\pi}{2}=\tfrac{15\pi}{2}" />, which is longer.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\text{shortest distance} = \tfrac{5\pi}{2}}" />,
    reason: (
      <>
        Matches option <b>E</b>.
      </>
    ),
    more: (
      <>
        Option D, <Katex tex="\tfrac{5\pi}{4}" />, is <Katex tex="5\times\tfrac{\pi}{4}" />: the radius times the change
        in <Katex tex="t" /> instead of the change in the angle <Katex tex="2t" />. Option B,{' '}
        <Katex tex="\tfrac{\pi}{2}" />, is the angle without multiplying by the radius, option A,{' '}
        <Katex tex="\tfrac{\pi}{4}" />, is just the change in <Katex tex="t" />, and option C,{' '}
        <Katex tex="\pi" />, does not come from any single standard slip.
      </>
    ),
  },
]

export default function SpecialistQ7_2021() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">A relation is defined parametrically by</p>
          <p className="mb-2">
            <Katex tex="x(t) = 5\cos(2t)+1 \qquad y(t) = 5\sin(2t)-1" />
          </p>
          <p>
            If <Katex tex="A(6,-1)" /> and <Katex tex="B(1,4)" /> are two points that lie on the graph of the relation,
            then the shortest distance along the graph from <Katex tex="A" /> to <Katex tex="B" /> is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\tfrac{\pi}{4}" /> },
        { letter: 'B', content: <Katex tex="\tfrac{\pi}{2}" /> },
        { letter: 'C', content: <Katex tex="\pi" /> },
        { letter: 'D', content: <Katex tex="\tfrac{5\pi}{4}" /> },
        { letter: 'E', content: <Katex tex="\tfrac{5\pi}{2}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <Explore title="t is not the angle: the point turns through 2t">
          <AngleWidget />
        </Explore>
      }
    />
  )
}
