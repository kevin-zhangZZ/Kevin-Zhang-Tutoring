// 2024 Specialist NHT — Exam 2, MCQ 18. The NHT report gives the answer key only, with no
// statistics. Vectors: the distance between two parallel planes, after rescaling one equation
// so both have the same normal. Question text transcribed from the original paper. Solution is
// original; the answer B agrees with the report's key. Checked: |12 − 6|/3 = 2.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'B' }

const v = (s: string) => `\\underset{\\sim}{${s}}`
const I = v('i'), J = v('j'), K = v('k'), N = v('n')

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="-4x-4y+2z=-24\iff 2x+2y-z=12" />,
    reason: <>Divide the second equation by <Katex tex="-2" /> so both planes are written with the same normal, <Katex tex={`${N}=2${I}+2${J}-${K}`} />.</>,
  },
  {
    working: <Katex display tex="(3,0,0):\ 2(3)+2(0)-0=6\ \checkmark" />,
    reason: <>Pick any convenient point on the first plane.</>,
  },
  {
    working: <Katex display tex={`|${N}|=\\sqrt{2^2+2^2+(-1)^2}=3`} />,
    reason: <>The magnitude of the common normal.</>,
  },
  {
    working: <Katex display tex="d=\frac{|2(3)+2(0)-0-12|}{3}=\frac{|6-12|}{3}=2" />,
    reason: <>The distance from a point to the plane <Katex tex="ax+by+cz=k" /> is <Katex tex="\dfrac{|ax_0+by_0+cz_0-k|}{\sqrt{a^2+b^2+c^2}}" />: the scalar resolute of a joining vector onto the unit normal.</>,
    more: <>Once both equations share the normal, this is just <Katex tex="\tfrac{|12-6|}{|\underset{\sim}{n}|}" />. Each constant over <Katex tex="|\underset{\sim}{n}|" /> is that plane&apos;s distance from the origin, <Katex tex="2" /> and <Katex tex="4" />; both planes are on the same side of <Katex tex="O" /> (the constants have the same sign), so the gap between them is <Katex tex="4-2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{2}" />,
    reason: <>Matches option <b>B</b>.</>,
    more: <>Option <b>E</b>, 6, is <Katex tex="12-6" /> without dividing by <Katex tex="|\underset{\sim}{n}|=3" />, or equally the two distances from the origin added as if the planes were on opposite sides. Option <b>D</b>, 4, is the second plane&apos;s distance from the origin.</>,
  },
]

export default function SpecialistQ18_2024NHT() {
  return (
    <MCQShell
      question={
        <p>
          The shortest distance between the two parallel planes with equations <Katex tex="2x+2y-z=6" /> and{' '}
          <Katex tex="-4x-4y+2z=-24" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="1" /> },
        { letter: 'B', content: <Katex tex="2" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="3" /> },
        { letter: 'D', content: <Katex tex="4" /> },
        { letter: 'E', content: <Katex tex="6" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
