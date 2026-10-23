// 2026 Specialist NHT — Exam 2, MCQ 20. The NHT report gives the answer key and a short comment
// only, with no statistics. Statistics: a linear combination of independent normal variables,
// then an inverse-normal equation for the coefficient c. Question text transcribed from the
// original paper. Solution is original; the answer C agrees with the report's key. scipy:
// z = 1.28155…, c = 3.0003…; Pr(Q > 112.2) is 0.0999 for c = 3, 0.0006 for c = 2 and 0.449 for c = 4.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'C',
  comment: (
    <>
      <Katex tex="\mathrm{E}(Q)=15c+50" />
      <br />
      <Katex tex="\mathrm{Var}(Q)=16c^2+36" />
      <br />
      Use inverse normal distribution to obtain <Katex tex="z=1.281\ldots" />
      <br />
      <Katex tex="\dfrac{112.2-(15c+50)}{\sqrt{16c^2+36}}=1.281\ldots" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{E}(Q)=c\,\mathrm{E}(X)+2\,\mathrm{E}(Y)=15c+50" />,
    reason: <>Expectation is linear: <Katex tex="\mathrm{E}(aX+bY)=a\mathrm{E}(X)+b\mathrm{E}(Y)" />.</>,
  },
  {
    working: <Katex display tex="\mathrm{Var}(Q)=c^2\,\mathrm{Var}(X)+2^2\,\mathrm{Var}(Y)=16c^2+36" />,
    reason: <>For <b>independent</b> variables, <Katex tex="\mathrm{Var}(aX+bY)=a^2\mathrm{Var}(X)+b^2\mathrm{Var}(Y)" /> (on the formula sheet). The coefficients are <b>squared</b>.</>,
  },
  {
    working: <Katex display tex="Q\sim N\!\left(15c+50,\ 16c^2+36\right)" />,
    reason: <>A linear combination of independent normal variables is itself normal. The second parameter here is the variance.</>,
  },
  {
    working: <Cas fn="invNorm">invNorm(0.9, 0, 1) = 1.28155…</Cas>,
    reason: <><Katex tex="\Pr(Q>112.2)=0.1" /> means 112.2 has 90% of the distribution below it, so its standardised value <Katex tex="z" /> satisfies <Katex tex="\Pr(Z<z)=0.9" />.</>,
    more: <><Cas fn="invNorm" /> works with the area to the <em>left</em>. Entering 0.1 instead would give <Katex tex="z=-1.28" />, the value with 10% below it.</>,
  },
  {
    working: <Katex display tex="\frac{112.2-(15c+50)}{\sqrt{16c^2+36}}=1.28155\ldots" />,
    reason: <>Standardise: <Katex tex="z=\tfrac{q-\mu}{\sigma}" />, with the standard deviation <Katex tex="\sqrt{16c^2+36}" />, the square root of the variance.</>,
  },
  {
    working: <Cas fn="solve">solve((112.2−(15c+50))/√(16c²+36) = 1.28155, c) → c = 3.0003…</Cas>,
    reason: <>The unknown is inside both the mean and the standard deviation, so solve on CAS.</>,
    more: <>Quick check by substitution: with <Katex tex="c=3" />, <Katex tex="Q\sim N(95,180)" /> and <Katex tex="\tfrac{112.2-95}{\sqrt{180}}=\tfrac{17.2}{13.416\ldots}=1.282" />, just as required.</>,
  },
  {
    working: <Katex display tex="\boxed{c\approx3}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: <>The neighbouring options are far off: with <Katex tex="c=2" />, <Katex tex="\Pr(Q>112.2)\approx0.0006" />, and with <Katex tex="c=4" /> it is about <Katex tex="0.45" />. A larger <Katex tex="c" /> raises both the mean and the spread, so across the options the probability climbs steeply with <Katex tex="c" />, passing 0.1 very close to 3.</>,
  },
]

export default function SpecialistQ20_2026NHT() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="X" /> and <Katex tex="Y" /> be independent normal random variables with{' '}
          <Katex tex="\mathrm{E}(X)=15" />, <Katex tex="\mathrm{E}(Y)=25" />, <Katex tex="\mathrm{Var}(X)=16" /> and{' '}
          <Katex tex="\mathrm{Var}(Y)=9" />.
          <br />
          Let <Katex tex="Q" /> be the random variable such that <Katex tex="Q=cX+2Y" />.
          <br />
          Given that <Katex tex="\Pr(Q>112.2)=0.1" />, the value of <Katex tex="c" /> is closest to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="1" /> },
        { letter: 'B', content: <Katex tex="2" /> },
        { letter: 'C', content: <Katex tex="3" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="4" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
