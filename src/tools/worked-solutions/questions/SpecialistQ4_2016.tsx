// 2016 Specialist Mathematics — Exam 2, MCQ 4. VCAA examination report: 68% correct.
// Recovering b and c from one complex root of z³ + bz² + cz = 0. Question text
// transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 7, C: 10, D: 6, E: 68 },
  answer: 'E',
  noAnswer: 1,
  comment: <><Katex tex="z=3+2i" /> is also a solution.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="z^3+bz^2+cz = z\left(z^2+bz+c\right) = 0" />,
    reason: <>Factor out the <Katex tex="z" /> first: <Katex tex="z=0" /> is one root, and the complex pair comes from the quadratic.</>,
  },
  {
    working: <Katex display tex="3-2i \text{ is a root} \implies 3+2i \text{ is a root}" />,
    reason: <><Katex tex="b" /> and <Katex tex="c" /> are real, so non-real roots come in conjugate pairs.</>,
    more: <>This is the examiner's one-line comment. The conjugate-root theorem needs <em>real</em> coefficients — that is why the question tells you <Katex tex="b" /> and <Katex tex="c" /> are real. With the conjugate you now know all three roots: <Katex tex="0" />, <Katex tex="3-2i" /> and <Katex tex="3+2i" />.</>,
  },
  {
    working: <Katex display tex="z^2+bz+c = \bigl(z-(3-2i)\bigr)\bigl(z-(3+2i)\bigr)" />,
    reason: <>The quadratic has leading coefficient 1 and exactly these two roots, so it equals this product.</>,
  },
  {
    working: <Katex display tex="= z^2-6z+\left(9-4i^2\right) = z^2-6z+13" />,
    reason: <>Expand: the <Katex tex="i" /> terms cancel, and <Katex tex="i^2=-1" /> gives <Katex tex="9+4=13" />.</>,
    more: <>Shortcut: a monic quadratic is <Katex tex="z^2-(\text{sum of roots})z+(\text{product of roots})" />. Here the sum is <Katex tex="6" /> and the product is <Katex tex="|3-2i|^2=13" />.</>,
  },
  {
    working: <Katex display tex="\boxed{b=-6,\ c=13}" />,
    reason: <>Matches option <b>E</b>, reading <Katex tex="b" /> and <Katex tex="c" /> off <Katex tex="z^2+bz+c" />.</>,
    more: <>Option A (8%) has the sign of <Katex tex="b" /> wrong — the coefficient of <Katex tex="z" /> is <em>minus</em> the sum of the roots. Options B and C (7%, 10%) just copy the real and imaginary parts of the root <Katex tex="3-2i" /> (C with both signs flipped); D is unrelated. Check E: <Katex tex="(3-2i)^2=5-12i" />, and <Katex tex="5-12i-6(3-2i)+13=0" /> ✓.</>,
  },
]

export default function SpecialistQ4_2016() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            One of the roots of <Katex tex="z^3+bz^2+cz=0" /> is <Katex tex="3-2i" />, where{' '}
            <Katex tex="b" /> and <Katex tex="c" /> are real numbers.
          </p>
          <p>
            The values of <Katex tex="b" /> and <Katex tex="c" /> respectively are
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <><Katex tex="6" />, <Katex tex="13" /></> },
        { letter: 'B', content: <><Katex tex="3" />, <Katex tex="-2" /></> },
        { letter: 'C', content: <><Katex tex="-3" />, <Katex tex="2" /></> },
        { letter: 'D', content: <><Katex tex="2" />, <Katex tex="3" /></> },
        { letter: 'E', content: <><Katex tex="-6" />, <Katex tex="13" /></>, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
