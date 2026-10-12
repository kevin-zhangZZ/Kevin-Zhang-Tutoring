// 2024 Specialist Mathematics — Exam 2, MCQ 5. VCAA examination report: 70% correct.
// Conjugate then negate: a reflection then a 180° rotation compose into one reflection. Question text transcribed from the original paper (2024 papers
// are image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 13, B: 13, C: 70, D: 4 },
  answer: 'C',
  comment: (
    <>
      Given <Katex tex="z=1+\sqrt{3}i," /> then
      <br />
      <Katex tex="\bar{z}=1-\sqrt{3}i" />
      <br />
      <Katex tex="-\bar{z}=-1+\sqrt{3}i" />
      <br />
      <Katex tex="\therefore" /> Reflected in imaginary axis
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="z = 1+\sqrt3\,i" />,
    reason: <>The point <Katex tex="(1,\sqrt3)" /> on the Argand diagram, in the first quadrant.</>,
  },
  {
    working: <Katex display tex="\bar{z} = 1-\sqrt3\,i" />,
    reason: <>The conjugate flips the sign of the imaginary part: a reflection in the real axis.</>,
  },
  {
    working: <Katex display tex="-\bar{z} = -1+\sqrt3\,i" />,
    reason: <>The minus sign flips the sign of both parts: a rotation by 180° about the origin.</>,
  },
  {
    working: <Katex display tex="(1,\sqrt3) \mapsto (-1,\sqrt3)" />,
    reason: <>Compare start and finish: the imaginary part (height) is unchanged and the real part has flipped sign — a mirror image across the imaginary axis.</>,
    more: <>This holds for every <Katex tex="z" />, not just this one: if <Katex tex="z=a+bi" /> then <Katex tex="-\bar{z}=-(a-bi)=-a+bi" />, the reflection of <Katex tex="(a,b)" /> in the imaginary axis. A reflection in one axis followed by a 180° rotation about the origin always gives the reflection in the other axis.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{reflection in the imaginary axis}}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: <>Option <b>B</b> is tempting because <Katex tex="-1+\sqrt3\,i" /> does lie anticlockwise from <Katex tex="z" />, but by <Katex tex="\tfrac{\pi}{3}" /> (60°), not 90°: the arguments are <Katex tex="\tfrac{\pi}{3}" /> and <Katex tex="\tfrac{2\pi}{3}" />. An anticlockwise rotation by 90° is multiplication by <Katex tex="i" />, giving <Katex tex="iz=-\sqrt3+i" />. Option <b>D</b> (clockwise by 90°) gives <Katex tex="-iz=\sqrt3-i" />, in the fourth quadrant. Option <b>A</b> stops one step early: reflecting in the real axis gives <Katex tex="\bar{z}" />, not <Katex tex="-\bar{z}" /> — the minus sign is a second operation.</>,
  },
]

export default function SpecialistQ5_2024() {
  return (
    <MCQShell
      question={
        <p>
          If the point <Katex tex="z=1+\sqrt3\,i" /> is represented on an Argand diagram, the
          point representing <Katex tex="-\bar{z}" /> can be located by
        </p>
      }
      options={[
        { letter: 'A', content: <>reflecting the point representing <Katex tex="z" /> in the real axis.</> },
        { letter: 'B', content: <>rotating the point representing <Katex tex="z" /> anticlockwise about the origin by 90°.</> },
        { letter: 'C', content: <>reflecting the point representing <Katex tex="z" /> in the imaginary axis.</>, isAnswer: true },
        { letter: 'D', content: <>rotating the point representing <Katex tex="z" /> clockwise about the origin by 90°.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
