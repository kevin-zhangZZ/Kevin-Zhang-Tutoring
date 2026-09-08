// 2018 Specialist Mathematics — Exam 2, MCQ 5. VCAA examination report: 41% correct —
// the fifth-hardest MCQ in the 2017-2018 Specialist Exam 2 papers.
// If z + 1/z is real, what must be true of z? A complex-numbers algebra question.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 13, B: 16, C: 14, D: 41, E: 15 },
  answer: 'D',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{1}{z} = \frac{1}{a+bi} = \frac{a-bi}{a^2+b^2}" />,
    reason: <>Multiply top and bottom by the conjugate <Katex tex="a-bi" /> to rationalise.</>,
  },
  {
    working: <Katex display tex="z+\frac{1}{z} = \left(a+\frac{a}{a^2+b^2}\right) + i\left(b-\frac{b}{a^2+b^2}\right)" />,
    reason: 'Add real and imaginary parts separately.',
  },
  {
    working: <Katex display tex="z+\frac1z \in \mathbb{R} \;\implies\; b-\frac{b}{a^2+b^2}=0" />,
    reason: 'The imaginary part of a real number must be exactly zero.',
  },
  {
    working: <Katex display tex="b\left(1-\frac{1}{a^2+b^2}\right)=0" />,
  },
  {
    working: <Katex display tex="b\ne 0 \;\implies\; 1-\frac{1}{a^2+b^2}=0 \;\implies\; a^2+b^2=1" />,
    reason: <>Given <Katex tex="b\in\mathbb{R}\setminus\{0\}" />, so the other factor must vanish instead.</>,
  },
  {
    working: <Katex display tex="\boxed{|z| = \sqrt{a^2+b^2} = 1}" />,
    reason: <>Matches option <b>D</b>. (This doesn't pin down <Katex tex="\operatorname{Arg}(z)" />, or force <Katex tex="a=\pm b" /> or <Katex tex="z^2=1" /> — those only hold for particular points on the unit circle, not every valid <Katex tex="z" />.)</>,
  },
]

export default function SpecialistQ5_2018() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Let <Katex tex="z=a+bi" />, where <Katex tex="a,b\in\mathbb{R}\setminus\{0\}" />.
          </p>
          <p>
            If <Katex tex="z+\dfrac{1}{z}\in\mathbb{R}" />, which one of the following must be <b>true</b>?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\operatorname{Arg}(z)=\dfrac{\pi}{4}" /> },
        { letter: 'B', content: <Katex tex="a=-b" /> },
        { letter: 'C', content: <Katex tex="a=b" /> },
        { letter: 'D', content: <Katex tex="|z|=1" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="z^2=1" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
