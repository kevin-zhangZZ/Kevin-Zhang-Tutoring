// 2023 Specialist NHT — Exam 1, Question 6 (3 marks). The NHT report gives sample answers only,
// with no statistics, and no notes. Arc length of y = 5 + 2x^(3/2) on [0, k] is 1022/27: the
// integrand √(1 + 9x) has a linear inside, so the antiderivative is (2/27)(1 + 9x)^(3/2), and
// (1 + 9k)^(3/2) = 512 gives k = 7. Arc length of a curve given by a Cartesian rule is listed in
// §12.8 as an older-design exclusion (KZ's 2016 ruling); the 2023 study design examines it (this
// paper, and 2023 Exam 1 Q7's surface-area sibling), and the brief says every NHT question is on
// the current design, so it is written up and flagged for KZ. Question text transcribed from the
// original paper. Answer checked with sympy (the arc length on [0, 7] is exactly 1022/27) and
// against the report's sample answer (k = 7). Solution is original.

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT: SAExaminerStats = {}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x)=2\times\tfrac32x^{\frac12}=3x^{\frac12}" />,
    reason: <>The arc length formula needs the gradient. Power rule on <Katex tex="2x^{\frac32}" />; the constant 5 differentiates to 0.</>,
  },
  {
    working: <Katex display tex="1+\left(f'(x)\right)^2=1+\left(3x^{\frac12}\right)^2=1+9x" />,
    reason: <>Squaring <Katex tex="x^{\frac12}" /> gives <Katex tex="x" />: the square root disappears, which is why the question uses a power of <Katex tex="\tfrac32" />.</>,
  },
  {
    working: <Katex display tex="L=\int_0^k\sqrt{1+9x}\,dx" />,
    reason: <>Arc length from <Katex tex="x=0" /> to <Katex tex="x=k" /> is <Katex tex="\displaystyle\int_0^k\sqrt{1+\left(\tfrac{dy}{dx}\right)^2}\,dx" />.</>,
  },
  {
    working: <Katex display tex="\int(1+9x)^{\frac12}\,dx=\frac{(1+9x)^{\frac32}}{\frac32\times9}=\frac{2}{27}(1+9x)^{\frac32}" />,
    reason: <>The inside, <Katex tex="1+9x" />, is linear, so raise the power by one and divide by the new power <b>and</b> by the coefficient of <Katex tex="x" />, 9.</>,
    more: <>Check by differentiating: <Katex tex="\tfrac{2}{27}\times\tfrac32(1+9x)^{\frac12}\times9=(1+9x)^{\frac12}" /> ✓. Leaving out the 9 (writing <Katex tex="\tfrac23" /> in front) is the usual slip; it would make the length 9 times too big. A substitution <Katex tex="u=1+9x" /> gives the same result.</>,
  },
  {
    working: <Katex display tex="L=\left[\frac{2}{27}(1+9x)^{\frac32}\right]_0^k=\frac{2}{27}(1+9k)^{\frac32}-\frac{2}{27}" />,
    reason: <>Substitute the terminals. At <Katex tex="x=0" />, <Katex tex="(1+0)^{\frac32}=1" />.</>,
  },
  {
    working: <Katex display tex="\frac{2}{27}\left((1+9k)^{\frac32}-1\right)=\frac{1022}{27}" />,
    reason: <>Set the arc length equal to the given value.</>,
  },
  {
    working: <Katex display tex="(1+9k)^{\frac32}-1=511\implies(1+9k)^{\frac32}=512" />,
    reason: <>Multiply both sides by <Katex tex="\tfrac{27}{2}" />: <Katex tex="\tfrac{1022}{2}=511" />.</>,
  },
  {
    working: <Katex display tex="1+9k=512^{\frac23}=\left(\sqrt[3]{512}\right)^2=8^2=64" />,
    reason: <>Raise both sides to the power <Katex tex="\tfrac23" /> to undo the <Katex tex="\tfrac32" />. Take the cube root first, <Katex tex="8^3=512" />, then square, to keep the numbers small.</>,
  },
  {
    working: <Katex display tex="9k=63\implies\boxed{k=7}" />,
    reason: <>Sanity check: the curve rises from <Katex tex="(0,5)" /> to <Katex tex="\left(7,\,5+14\sqrt7\right)\approx(7,\,42.0)" />, a straight-line distance of <Katex tex="\sqrt{7^2+37.0^2}\approx37.7" />, just under the arc length <Katex tex="\tfrac{1022}{27}\approx37.85" />. The curve can never be shorter than the chord ✓.</>,
  },
]

export default function SpecialistQ6_2023NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 6 (3 marks)</p>
        <p>
          A function <Katex tex="f" /> has rule <Katex tex="f(x)=5+2x^{\frac32}" />. The length of the curve
          for the graph of <Katex tex="f" /> in the interval <Katex tex="0\le x\le k" /> is{' '}
          <Katex tex="\dfrac{1022}{27}" />.
        </p>
        <p>Find the value of <Katex tex="k" />.</p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Over a tiny step <Katex tex="dx" />, the curve rises <Katex tex="dy" />, so by Pythagoras the
            little piece of curve has length <Katex tex="\sqrt{dx^2+dy^2}=\sqrt{1+\left(\tfrac{dy}{dx}\right)^2}\,dx" />.
            Adding up all the pieces gives the arc length{' '}
            <Katex tex="\displaystyle\int_a^b\sqrt{1+\left(\tfrac{dy}{dx}\right)^2}\,dx" />. In a
            technology-free question the rule is chosen so that the expression under the root is easy
            to integrate.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <ReportShelf stats={REPORT} maxMarks={3} />
      </div>
    </div>
  )
}
