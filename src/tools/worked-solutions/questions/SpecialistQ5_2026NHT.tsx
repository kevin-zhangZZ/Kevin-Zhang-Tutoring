// 2026 Specialist NHT — Exam 2, MCQ 5. The NHT report gives the answer key and a short comment
// only, with no statistics. Complex numbers: the largest modulus on the circle |z − 2 − i| = 3,
// found as radius plus the distance from O to the centre. Question text transcribed from the
// original paper. The Argand-plane figure (spec-2026nht-mcq5-circle.png) is this site's own
// explanatory figure, drawn with matplotlib; VCAA printed none. Solution is original; the answer B
// agrees with the report's key.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import circleSrc from './spec-2026nht-mcq5-circle.png'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'B',
  comment: (
    <>
      The maximum value of <Katex tex="|z|" /> is the furthest point that lies on <Katex tex="|z-2-i|=3" /> from origin.
      <br />
      A ray from the origin to this point must pass through the centre of the circle.
      <br />
      Distance = radius + distance from origin to the circle centre.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="|z-(2+i)|=3:\ \text{circle, centre }2+i,\ \text{radius }3" />,
    reason: <><Katex tex="|z-w|" /> is the distance from <Katex tex="z" /> to <Katex tex="w" />, so these are the points at distance 3 from <Katex tex="2+i" />. And <Katex tex="|z|" /> is the distance from <Katex tex="z" /> to the origin, so we want the point of the circle furthest from <Katex tex="O" />.</>,
  },
  {
    working: <Katex display tex="|2+i|=\sqrt{2^2+1^2}=\sqrt5" />,
    reason: <>Distance from the origin to the centre. Since <Katex tex="\sqrt5\approx2.24<3" />, the origin is <b>inside</b> the circle.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async" src={circleSrc} alt="This site's own figure: the circle with centre 2 + i and radius 3 on an Argand plane, with a dashed orange line from the origin through the centre to the far side of the circle, labelled √5 from O to the centre and 3 from the centre to the point where |z| = 3 + √5" className="w-full max-w-[320px]" />
      </div>
    ),
    reason: <>The furthest point lies on the line from <Katex tex="O" /> through the centre, on the far side of the centre: go <Katex tex="\sqrt5" /> to the centre, then a further radius of 3 in the same direction.</>,
    more: <>Why that line? For any point <Katex tex="z" /> on the circle, the triangle inequality gives <Katex tex="|z|\le|z-(2+i)|+|2+i|=3+\sqrt5" />, with equality only when <Katex tex="z" />, the centre and <Katex tex="O" /> are lined up with the centre between them.</>,
  },
  {
    working: <Katex display tex="\boxed{|z|_{\max}=3+\sqrt5}" />,
    reason: <>Matches option <b>B</b>. Sanity check: <Katex tex="3+\sqrt5\approx5.24" />, the distance from <Katex tex="O" /> to the far end of the dashed line, and bigger than the radius, as it must be with <Katex tex="O" /> inside the circle.</>,
    more: <>Option <b>D</b>, <Katex tex="3-\sqrt5" />, is the <em>minimum</em> value of <Katex tex="|z|" />: the nearest point is on the same line but on the origin&apos;s side, a radius minus <Katex tex="\sqrt5" /> away.</>,
  },
]

export default function SpecialistQ5_2026NHT() {
  return (
    <MCQShell
      question={
        <p>
          Consider the circle given by <Katex tex="|z-2-i|=3" />, where <Katex tex="z\in C" />.
          <br />
          The maximum value of <Katex tex="|z|" /> for those points that lie on this circle is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2+2\sqrt2" /> },
        { letter: 'B', content: <Katex tex="3+\sqrt5" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="1+\sqrt5" /> },
        { letter: 'D', content: <Katex tex="3-\sqrt5" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
