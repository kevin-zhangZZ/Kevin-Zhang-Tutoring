// 2026 Specialist NHT — Exam 1, Question 11 (4 marks). The NHT report gives a sample answer only,
// with no statistics, and no notes. Planes 2x + y + z = 4 and px + (p + 1)y + 2z = 1 at an acute angle
// of 60°: the angle between the normals, |n₁·n₂| = |n₁||n₂| cos 60°, squared, gives
// 4p² + 10p + 1 = 0, so p = (−5 ± √21)/4. Question text transcribed from the original paper. Answers
// checked with sympy and against the report's sample answer: for p = (−5 + √21)/4 the normals meet at
// 60°, and for p = (−5 − √21)/4 (where p + 1 < 0) at 120°, whose supplement is the acute 60°, so both
// values stand. The report writes the dot product without an absolute value; its line
// 6(p + 1) = √6√(2p² + 2p + 5) is strictly true only for the first root, but squaring recovers both,
// and the absolute value in our working covers both cases. Solution is original.

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT: SAExaminerStats = {}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}\underset{\sim}{n_1}&=2\underset{\sim}{i}+\underset{\sim}{j}+\underset{\sim}{k}\\ \underset{\sim}{n_2}&=p\,\underset{\sim}{i}+(p+1)\underset{\sim}{j}+2\underset{\sim}{k}\end{aligned}" />,
    reason: <>The angle between two planes is the angle between their normals. A normal to <Katex tex="ax+by+cz=d" /> is <Katex tex="a\underset{\sim}{i}+b\underset{\sim}{j}+c\underset{\sim}{k}" />: read off the coefficients.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{n_1}\cdot\underset{\sim}{n_2}=2p+(p+1)+2=3p+3" />,
    reason: <>Dot product: multiply matching components and add.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}|\underset{\sim}{n_1}|&=\sqrt{4+1+1}=\sqrt6\\ |\underset{\sim}{n_2}|&=\sqrt{p^2+(p+1)^2+4}=\sqrt{2p^2+2p+5}\end{aligned}" />,
    reason: <>Magnitudes as square roots of the sum of squared components. <Katex tex="(p+1)^2=p^2+2p+1" />.</>,
  },
  {
    working: <Katex display tex="\frac{|3p+3|}{\sqrt6\,\sqrt{2p^2+2p+5}}=\cos60^\circ=\frac12" />,
    reason: <>The normals could point so that the angle between them is <Katex tex="60^\circ" /> or <Katex tex="120^\circ" />; either way the acute angle between the planes is <Katex tex="60^\circ" />. The absolute value on the dot product covers both.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}2|3p+3|&=\sqrt6\,\sqrt{2p^2+2p+5}\\ 36(p+1)^2&=6\left(2p^2+2p+5\right)\\ 6\left(p^2+2p+1\right)&=2p^2+2p+5\end{aligned}" />,
    reason: <>Cross-multiply, then square both sides to remove the roots and the absolute value. Then divide by 6.</>,
  },
  {
    working: <Katex display tex="4p^2+10p+1=0" />,
    reason: <>Collect everything on one side: <Katex tex="6p^2-2p^2=4p^2" />, <Katex tex="12p-2p=10p" />, <Katex tex="6-5=1" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}p&=\frac{-10\pm\sqrt{100-16}}{8}\\ &=\frac{-10\pm\sqrt{84}}{8}=\frac{-10\pm2\sqrt{21}}{8}\end{aligned}" />,
    reason: <>It doesn&apos;t factorise, so use the quadratic formula. <Katex tex="\sqrt{84}=\sqrt{4\times21}=2\sqrt{21}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{p=\frac{-5\pm\sqrt{21}}{4}}" />,
    reason: <>Both values are valid: squaring added no false solutions because the absolute value already allowed both signs. Check: <Katex tex="p=\tfrac{-5+\sqrt{21}}{4}\approx-0.10" /> has <Katex tex="3p+3>0" /> (normals at <Katex tex="60^\circ" />); <Katex tex="p=\tfrac{-5-\sqrt{21}}{4}\approx-2.40" /> has <Katex tex="3p+3<0" /> (normals at <Katex tex="120^\circ" />, planes at <Katex tex="60^\circ" />) ✓.</>,
    more: <>The report writes the equation without the absolute value, as <Katex tex="6(p+1)=\sqrt6\sqrt{2p^2+2p+5}" />. That line is only true for the first value (for the second, the left side is negative); squaring brings both back, and the report gives both, as here.</>,
  },
]

export default function SpecialistQ11_2026NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 11 (4 marks)</p>
        <p>
          Consider the two planes <Katex tex="2x+y+z=4" /> and <Katex tex="px+(p+1)y+2z=1" />, where <Katex tex="p\in R" />.
        </p>
        <p>
          Given that the acute angle between the two planes is <Katex tex="60^\circ" />, find all possible values of{' '}
          <Katex tex="p" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Two planes meet along a line, and the angle between them is the angle between their normal vectors (or its
            supplement, if that one is obtuse). From the dot product,{' '}
            <Katex tex="\cos\theta=\dfrac{\underset{\sim}{n_1}\cdot\underset{\sim}{n_2}}{|\underset{\sim}{n_1}||\underset{\sim}{n_2}|}" />;
            taking the absolute value of the dot product always gives the acute angle.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <WrongMethod
          title="Discard the root that makes the dot product negative"
          working={<Katex display tex="p=\frac{-5+\sqrt{21}}{4}\ \text{ only}" />}
        >
          With <Katex tex="p=\tfrac{-5-\sqrt{21}}{4}" /> the normals are at <Katex tex="120^\circ" />, but reversing one normal
          (which describes the same plane) makes it <Katex tex="60^\circ" />. The acute angle between the planes is{' '}
          <Katex tex="60^\circ" /> for both values.
        </WrongMethod>
        <ReportShelf stats={REPORT} maxMarks={4} />
      </div>
    </div>
  )
}
