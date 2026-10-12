// 2025 Specialist Mathematics — Exam 2, MCQ 15. VCAA examination report: 52% correct. This
// year's paper used four options (A–D) rather than five. Rearranging the angle-between-planes
// formula into an equation for an unknown coefficient. Question text transcribed from the
// original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 52, B: 20, C: 14, D: 14 },
  answer: 'A',
  comment: (
    <>
      The angle between planes is the same as the angle between the normals to the planes.
      <br />
      Knowing what the two normals are:
      <br />
      <Katex tex="\underset{\sim}{n}_1=\begin{pmatrix}2\\2\\1\end{pmatrix}\text{ and }\underset{\sim}{n}_2=\begin{pmatrix}a\\0\\4\end{pmatrix}" />
      <br />
      <Katex tex="\underset{\sim}{n}_1\cdot \underset{\sim}{n}_2=|\underset{\sim}{n}_1||\underset{\sim}{n}_2|\cos(\theta)" />
      <br />
      <Katex tex="\dfrac{2a+4}{3\sqrt{a^2+16}}=\dfrac{2}{3}" />
      <br />
      <Katex tex="a+2=\sqrt{a^2+16}" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{n_1} = (2,2,1) \qquad \underset{\sim}{n_2} = (a,0,4)" />,
    reason: <>A plane <Katex tex="Ax+By+Cz=D" /> has normal <Katex tex="(A,B,C)" />. The second plane has no <Katex tex="y" /> term, so its middle component is 0.</>,
  },
  {
    working: <Katex display tex="\cos\theta = \frac{|\underset{\sim}{n_1}\cdot\underset{\sim}{n_2}|}{|\underset{\sim}{n_1}||\underset{\sim}{n_2}|} = \frac{|2a+4|}{3\sqrt{a^2+16}}" />,
    reason: <>The angle between planes is the angle between their normals. <Katex tex="|\underset{\sim}{n_1}|=\sqrt{4+4+1}=3" />, <Katex tex="|\underset{\sim}{n_2}|=\sqrt{a^2+16}" />. The modulus gives the acute angle.</>,
    more: <>Two planes meet at two angles, <Katex tex="\theta" /> and <Katex tex="\pi-\theta" />; the modulus makes the cosine non-negative, so it picks the acute one. The report leaves it off, which is fine here because the next line shows <Katex tex="2a+4" /> is positive anyway.</>,
  },
  {
    working: <Katex display tex="a>0 \implies |2a+4|=2a+4" />,
    reason: <>The question says <Katex tex="a" /> is positive, so <Katex tex="2a+4>0" /> and the modulus can be dropped.</>,
  },
  {
    working: <Katex display tex="\frac{2a+4}{3\sqrt{a^2+16}} = \frac{2}{3}" />,
    reason: <>The angle is <Katex tex="\cos^{-1}\!\big(\tfrac23\big)" />, so its cosine is <Katex tex="\tfrac23" />.</>,
    more: <>This is the report&rsquo;s equation too. Option <b>B</b> (20%) has the right-hand side upside down (<Katex tex="\tfrac32" />), and option <b>D</b> (14%) has left out <Katex tex="|\underset{\sim}{n_1}|=3" /> from the denominator.</>,
  },
  {
    working: <Katex display tex="6a+12 = 6\sqrt{a^2+16}" />,
    reason: <>Multiply both sides by <Katex tex="3\cdot3\sqrt{a^2+16}" /> (cross-multiply).</>,
  },
  {
    working: <Katex display tex="\boxed{a+2 = \sqrt{a^2+16}}" />,
    reason: <>Divide through by 6. Matches option <b>A</b>.</>,
    more: (
      <>
        Check: squaring gives <Katex tex="a^2+4a+4=a^2+16" />, so <Katex tex="a=3" />, and then <Katex tex="\tfrac{2(3)+4}{3\sqrt{25}}=\tfrac{10}{15}=\tfrac23" /> as required.
        <br />
        Option <b>C</b> (14%), <Katex tex="2a+4=3\sqrt{a^2+16}" />, says the cosine equals 1 (the planes would be parallel); it has no solution at all. Options <b>B</b> and <b>D</b> have no positive solution either, so A is the only option a positive <Katex tex="a" /> can satisfy.
      </>
    ),
  },
]

export default function SpecialistQ15_2025() {
  return (
    <MCQShell
      question={
        <p>
          Consider the two planes described by the equations <Katex tex="2x+2y+z=2" /> and{' '}
          <Katex tex="ax+4z=1" />, where <Katex tex="a" /> is a positive constant.
          <br />
          The angle between the two planes is <Katex tex="\cos^{-1}\!\big(\tfrac23\big)" />.
          <br />
          The value of <Katex tex="a" /> satisfies the equation
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="a+2=\sqrt{a^2+16}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\dfrac{2a+4}{3\sqrt{a^2+16}}=\dfrac32" /> },
        { letter: 'C', content: <Katex tex="2a+4=3\sqrt{a^2+16}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{2a+4}{\sqrt{a^2+16}}=\dfrac23" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
