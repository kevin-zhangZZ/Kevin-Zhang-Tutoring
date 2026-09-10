// 2023 Specialist Mathematics — Exam 2, MCQ 5. VCAA examination report: 34% correct.
// Given |z̄| = 4 and arg(z³) = −π with z in the first quadrant, express z² in terms of z̄.
// Question text transcribed from the original paper. Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 15, B: 20, C: 13, D: 18, E: 34 },
  answer: 'E',
  comment: (
    <Katex tex="\mathrm{arg}(z^3) = -\mathrm{arg}(\bar z\,)\ \text{is not needed} — z^2 = 16\,\mathrm{cis}\!\big(\tfrac{2\pi}{3}\big) = -4\bar z" />
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="|\bar z| = |z| = 4" />,
    reason: 'The modulus of a conjugate equals the modulus of the original number.',
  },
  {
    working: <Katex display tex="\mathrm{arg}(z^3) = 3\,\mathrm{arg}(z) \equiv -\pi \pmod{2\pi}" />,
    reason: 'Argument of a power multiplies (before reducing mod 2π).',
  },
  {
    working: <Katex display tex="\mathrm{arg}(z) = -\tfrac{\pi}{3}+\tfrac{2k\pi}{3},\quad k\in\mathbb{Z}" />,
    reason: 'General solution for the argument.',
  },
  {
    working: <Katex display tex="\mathrm{Re}(z)>0,\ \mathrm{Im}(z)>0 \;\implies\; \mathrm{arg}(z)\in\big(0,\tfrac{\pi}{2}\big)" />,
    reason: <>Only <Katex tex="k=1" /> lands in this range: <Katex tex="\mathrm{arg}(z)=-\tfrac{\pi}{3}+\tfrac{2\pi}{3}=\tfrac{\pi}{3}" />.</>,
  },
  {
    working: <Katex display tex="z = 4\,\mathrm{cis}\!\big(\tfrac{\pi}{3}\big) \;\implies\; z^2 = 16\,\mathrm{cis}\!\big(\tfrac{2\pi}{3}\big)" />,
    reason: <>Modulus squares, argument doubles.</>,
  },
  {
    working: <Katex display tex="-4\bar z = -4\cdot4\,\mathrm{cis}\!\big({-\tfrac{\pi}{3}}\big) = 16\,\mathrm{cis}(\pi)\,\mathrm{cis}\!\big({-\tfrac{\pi}{3}}\big) = 16\,\mathrm{cis}\!\big(\tfrac{2\pi}{3}\big)" />,
    reason: <>Check option E: multiplying by <Katex tex="-1=\mathrm{cis}(\pi)" /> rotates the conjugate's argument by <Katex tex="\pi" />.</>,
  },
  {
    working: <Katex display tex="\boxed{z^2 = -4\bar z}" />,
    reason: <>Both sides equal <Katex tex="16\,\mathrm{cis}(2\pi/3)" /> — matches option <b>E</b>.</>,
  },
]

export default function SpecialistQ5_2023() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="z" /> be a complex number where <Katex tex="\mathrm{Re}(z)>0" /> and <Katex tex="\mathrm{Im}(z)>0" />.
          <br />
          Given <Katex tex="|\bar z\,| = 4" /> and <Katex tex="\mathrm{arg}(z^3) = -\pi" />, then <Katex tex="z^2" /> is
          equivalent to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="4z" /> },
        { letter: 'B', content: <Katex tex="-2\bar z" /> },
        { letter: 'C', content: <Katex tex="3z" /> },
        { letter: 'D', content: <Katex tex="\bar z^2" /> },
        { letter: 'E', content: <Katex tex="-4\bar z" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
