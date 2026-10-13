// 2024 Specialist Mathematics — Exam 1 Question 5 (3 marks). A solid of revolution whose
// volume is given, leading to a cubic in the upper terminal. Question text transcribed from
// the original paper (2024 papers are image-only, so read from rendered pages). Answers
// checked with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [22, 11, 9, 59],
  average: 2.1,
  comment: (
    <>
      Most students were able to apply the formula for the volume of the solid obtained by
      rotating the given region about the <Katex tex="x" />-axis. Some students tried to apply a
      formula for the surface area of the solid.
      <br />
      Some algebraic errors were observed. Students are reminded to be careful to avoid sign
      errors: responses often included incorrect expressions following the integration, such
      as <Katex tex="\pi\left(\dfrac{1}{2}k^2+\dfrac{2}{k}-k\textcolor{red}{+1}\right)" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\int_a^b y^2\,dx" />,
    reason: <>Volume formula for rotating a curve about the <Katex tex="x" />-axis: each slice is a disc of radius <Katex tex="y" />, area <Katex tex="\pi y^2" />.</>,
    more: <>The report notes some students tried to apply a formula for the surface area of the solid instead. Surface area is not asked for here: the question gives a volume, so the disc formula is the one to use.</>,
  },
  {
    working: <Katex display tex="y^2 = k-\frac{1}{x^2}" />,
    reason: <>Squaring removes the square root, leaving powers of <Katex tex="x" /> that are easy to antidifferentiate.</>,
  },
  {
    working: <Katex display tex="V = \pi\int_1^{k/2}\left(k-x^{-2}\right)dx = \pi\left[kx+\frac1x\right]_1^{k/2}" />,
    reason: <>The terminals are the ends of the domain <Katex tex="1\le x\le\tfrac{k}{2}" />. The antiderivative of <Katex tex="-x^{-2}" /> is <Katex tex="+x^{-1}" />.</>,
    more: <>Check by differentiating: <Katex tex="\tfrac{d}{dx}\left(x^{-1}\right)=-x^{-2}" />, so <Katex tex="+\tfrac1x" /> is right. Writing <Katex tex="-\tfrac1x" /> here is the first place a sign can slip. Treat <Katex tex="k" /> as a constant while integrating: <Katex tex="\int k\,dx = kx" />.</>,
  },
  {
    working: <Katex display tex="= \pi\left[\left(\frac{k^2}{2}+\frac{2}{k}\right)-\left(k+1\right)\right]" />,
    reason: <>At <Katex tex="x=\tfrac{k}{2}" />: <Katex tex="k\cdot\tfrac{k}{2}=\tfrac{k^2}{2}" /> and <Katex tex="1\div\tfrac{k}{2}=\tfrac{2}{k}" />. At <Katex tex="x=1" />: <Katex tex="k+1" />. Keep the lower value in brackets.</>,
    more: <>The report's example of a common wrong expression, <Katex tex="\pi\left(\tfrac12k^2+\tfrac2k-k+1\right)" />, comes from subtracting only the <Katex tex="k" /> of the lower-terminal value and leaving its <Katex tex="+1" /> unchanged. The whole of <Katex tex="k+1" /> must be subtracted.</>,
  },
  {
    working: <Katex display tex="\frac{k^2}{2}+\frac{2}{k}-k-1 = \frac72" />,
    reason: <>Expand <Katex tex="-(k+1)=-k-1" />, set the volume equal to the given <Katex tex="\tfrac{7\pi}{2}" />, then divide both sides by <Katex tex="\pi" />.</>,
  },
  {
    working: <Katex display tex="\times 2k: \quad k^3+4-2k^2-2k = 7k" />,
    reason: <>Multiply every term by <Katex tex="2k" />, the lowest common denominator, to clear the fractions. Allowed because <Katex tex="k>2" />, so <Katex tex="k\ne0" />.</>,
    more: <>Term by term: <Katex tex="\tfrac{k^2}{2}\times2k=k^3" />, <Katex tex="\tfrac2k\times2k=4" />, <Katex tex="-k\times2k=-2k^2" />, <Katex tex="-1\times2k=-2k" />, and <Katex tex="\tfrac72\times2k=7k" />.</>,
  },
  {
    working: <Katex display tex="\boxed{k^3-2k^2-9k+4 = 0}" />,
    reason: <>Subtract <Katex tex="7k" /> from both sides (<Katex tex="-2k-7k=-9k" />) and order by powers of <Katex tex="k" />. As required.</>,
    more: <>For interest: the cubic factorises as <Katex tex="(k-4)\left(k^2+2k-1\right)" />, whose other roots <Katex tex="-1\pm\sqrt2" /> are both less than 2, so the only value with <Katex tex="k>2" /> is <Katex tex="k=4" />. The question stops at the equation, so none of this is needed for the marks.</>,
  },
]

export default function SpecialistQ5_2024Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (3 marks)</p>
        <p>
          The curve with equation <Katex tex="y=\sqrt{k-\dfrac{1}{x^2}}" />, for{' '}
          <Katex tex="1\le x\le\dfrac{k}{2}" /> where <Katex tex="k>2" />, is rotated about
          the <Katex tex="x" />-axis to form a solid of revolution that has volume{' '}
          <Katex tex="\dfrac{7\pi}{2}" /> units<Katex tex="^3" />.
        </p>
        <p>
          Show that <Katex tex="k" /> satisfies the equation <Katex tex="k^3-2k^2-9k+4=0" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            The curve is written as a square root precisely so that{' '}
            <Katex tex="y^2" /> is clean: <Katex tex="\pi\int y^2\,dx" /> becomes an integral
            of <Katex tex="k-x^{-2}" />, which is a one-line antidifferentiation. If the
            square root is still in your integral, you have reached for the wrong formula.
          </p>
          <p>
            The unknown <Katex tex="k" /> appears in three places at once — inside the
            integrand, in the upper terminal, and (after substituting) as a denominator — so
            the cubic comes out of clearing fractions, not out of any clever manipulation.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <ReportShelf stats={EXAM} maxMarks={3} />
      </div>
    </div>
  )
}
