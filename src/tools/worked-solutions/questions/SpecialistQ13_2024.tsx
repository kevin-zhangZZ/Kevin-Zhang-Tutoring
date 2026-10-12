// 2024 Specialist Mathematics — Exam 2, MCQ 13. VCAA examination report: 81% correct.
// A known angle between two vectors, solved for the missing component. Question text transcribed from the original paper (2024 papers
// are image-only, so read from rendered pages). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 81, C: 10, D: 4 },
  answer: 'B',
  comment: (
    <>
      Let the two vectors be <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{b}" />.
      <br />
      <Katex tex="\underset{\sim}{a}\cdot \underset{\sim}{b}=|\underset{\sim}{a}||\underset{\sim}{b}|\cos(\theta)" />
      <br />
      <Katex tex="16-m=\sqrt{4+1+4}\sqrt{4+m^2+36}\times\cos\left(\cos^{-1}\left(\frac{13}{21}\right)\right)" />
      <br />
      Solve <Katex tex="16-m=3\sqrt{40+m^2}\times\dfrac{13}{21}" />
      <br />
      <Katex tex="m=-\dfrac{241}{15},3" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{b} = (2)(2)+(-1)(m)+(2)(6) = 16-m" />,
    reason: <>An angle between vectors means <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{b}=|\underset{\sim}{a}||\underset{\sim}{b}|\cos\theta" />. Start with the dot product, which contains <Katex tex="m" />.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{a}\right| = \sqrt{4+1+4} = 3" />,
    reason: <>The two magnitudes the formula needs: first <Katex tex="|\underset{\sim}{a}|" />,</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{b}\right| = \sqrt{4+m^2+36} = \sqrt{40+m^2}" />,
    reason: <>then <Katex tex="|\underset{\sim}{b}|" />, which still contains <Katex tex="m" />.</>,
  },
  {
    working: <Katex display tex="\frac{16-m}{3\sqrt{40+m^2}} = \frac{13}{21}" />,
    reason: <>The left side is <Katex tex="\cos\theta=\tfrac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{|\underset{\sim}{a}||\underset{\sim}{b}|}" />; the right side is <Katex tex="\cos\theta" /> because <Katex tex="\theta=\cos^{-1}\!\left(\tfrac{13}{21}\right)" />. On CAS, solve it for <Katex tex="m" /> directly with <Cas fn="solve" /> (the report's route); the rows below show the by-hand version.</>,
  },
  {
    working: <Katex display tex="21(16-m) = 39\sqrt{40+m^2}" />,
    reason: <>Cross-multiply.</>,
  },
  {
    working: <Katex display tex="7(16-m) = 13\sqrt{40+m^2}" />,
    reason: <>Divide both sides by 3 to keep the numbers small before squaring.</>,
    more: <>The right side is positive, so any valid answer needs <Katex tex="16-m>0" />. Keep this in mind, because squaring next can introduce a false root; here both roots turn out to satisfy it, and they also check in the original equation.</>,
  },
  {
    working: <Katex display tex="49\left(256-32m+m^2\right) = 169\left(40+m^2\right)" />,
    reason: <>Square both sides to remove the square root.</>,
  },
  {
    working: <Katex display tex="120m^2+1568m-5784 = 0" />,
    reason: <>Expand both sides and collect every term on one side.</>,
  },
  {
    working: <Katex display tex="15m^2+196m-723 = 0" />,
    reason: <>Divide through by 8.</>,
  },
  {
    working: <Katex display tex="m = \frac{-196\pm286}{30} \implies m = 3 \ \text{ or } \ m = -\tfrac{241}{15}" />,
    reason: <>Quadratic formula, with <Katex tex="\sqrt{196^2+4(15)(723)}=\sqrt{81796}=286" />.</>,
  },
  {
    working: <Katex display tex="\boxed{m = 3}" />,
    reason: <>The question restricts <Katex tex="m\in R^+" />, so the negative root is rejected. Matches option <b>B</b>.</>,
    more: <>A quicker multiple-choice route: substitute each option into <Katex tex="\tfrac{16-m}{3\sqrt{40+m^2}}" /> and compare with <Katex tex="\tfrac{13}{21}\approx0.619" />. Only <Katex tex="m=3" /> works: <Katex tex="\tfrac{13}{3\sqrt{49}}=\tfrac{13}{21}" />. The others give about 0.704 (<Katex tex="m=2" />), 0.535 (<Katex tex="m=4" />) and 0.455 (<Katex tex="m=5" />).</>,
  },
]

export default function SpecialistQ13_2024() {
  return (
    <MCQShell
      question={
        <p>
          If the angle between the vectors{' '}
          <Katex tex="2\underset{\sim}{i}-\underset{\sim}{j}+2\underset{\sim}{k}" /> and{' '}
          <Katex tex="2\underset{\sim}{i}+m\underset{\sim}{j}+6\underset{\sim}{k}" /> is{' '}
          <Katex tex="\cos^{-1}\!\left(\dfrac{13}{21}\right)" />, then the value of{' '}
          <Katex tex="m" />, where <Katex tex="m\in R^+" />, is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2" /> },
        { letter: 'B', content: <Katex tex="3" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="4" /> },
        { letter: 'D', content: <Katex tex="5" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
