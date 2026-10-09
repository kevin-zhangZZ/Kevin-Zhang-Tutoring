// 2022 Specialist Mathematics — Exam 1 Question 4 (4 marks). A rational integrand that
// splits without partial fractions if you spot the right regrouping. Question text
// transcribed from the original paper. Answer checked with sympy and against the VCAA
// examination report. Solution is original. Interactive: "Why log_e|x|?" — slide a point along
// F(x) = 3 log_e|x| + 2 tan⁻¹(x/2) and watch the integrand-slope line touch it on both sides of the
// y-axis; a toggle drops the absolute value and the left half of the graph disappears
// (interactives/spec-2022e1-q4-abs-log.tsx). Oct 2026 review (36% full marks): widget kept — it shows
// why the |x| and +c that the report flags are needed (numbers re-checked with sympy); the
// partial-fractions alternative moved from the Background into row 2's `more`; report commentary,
// the |x| derivation, the 4tan⁻¹ slip and the differentiate-back check moved into `more`; row 4's
// aligned line break restored. Final review: Background no longer repeats row 1's instruction;
// skipped "multiply top and bottom by 4" steps added; widget opens at x = −2.5 with even x ticks
// only, so nothing sits on a tick number on a phone.

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const AbsLogWidget = lazyWidget(() => import('../interactives/spec-2022e1-q4-abs-log'))

const EXAM: SAExaminerStats = {
  marks: [21, 6, 7, 29, 36],
  average: 2.5,
  comment: (
    <>
      The appropriate partial fraction decomposition for the integrand was
      <Katex display tex="\frac{3x^2+4x+12}{x\left(x^2+4\right)}\equiv\frac Ax+\frac{Bx+C}{x^2+4}" />
      A small number of students realised that
      <Katex display tex="\begin{aligned}\frac{3x^2+4x+12}{x\left(x^2+4\right)}&=\frac{3x^2+12}{x\left(x^2+4\right)}+\frac{4x}{x\left(x^2+4\right)}\\&=\frac3x+\frac{4}{x^2+4}\end{aligned}" />
      This removed the need to use partial fractions. Many students used elements of both
      the above methods with some initial algebraic work followed by one or more
      applications of partial fractions. Such approaches were inefficient and often resulted
      in students doing significantly more work than would otherwise be required.
      <br />
      A number of students did not include absolute value signs in the logarithmic term or
      failed to include the arbitrary constant in their answer. A small number of students
      integrated <Katex tex="\tfrac{4}{x^2+4}" /> incorrectly.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{3x^2+4x+12}{x\left(x^2+4\right)} = \frac{\left(3x^2+12\right)+4x}{x\left(x^2+4\right)}" />,
    reason: <>Before using partial fractions, compare the numerator with each factor of the denominator: its <Katex tex="x^2" /> and constant terms, <Katex tex="3x^2+12" />, are exactly <Katex tex="3\left(x^2+4\right)" />, and what is left, <Katex tex="4x" />, is a multiple of the other factor, <Katex tex="x" />. So split the numerator into those two pieces.</>,
  },
  {
    working: <Katex display tex="= \frac{3\left(x^2+4\right)}{x\left(x^2+4\right)}+\frac{4x}{x\left(x^2+4\right)} = \frac{3}{x}+\frac{4}{x^2+4}" />,
    reason: <>Each fraction now cancels: <Katex tex="x^2+4" /> in the first, <Katex tex="x" /> in the second (allowed, since <Katex tex="x\neq0" /> anyway). These two pieces are standard integrals.</>,
    more: (
      <>
        If you don&apos;t spot the split, partial fractions from the start gives the same two pieces.
        Write <Katex tex="3x^2+4x+12=A\left(x^2+4\right)+(Bx+C)x" />. Putting{' '}
        <Katex tex="x=0" /> gives <Katex tex="12=4A" />, so <Katex tex="A=3" />. Matching the{' '}
        <Katex tex="x^2" /> coefficients gives <Katex tex="3=A+B" />, so <Katex tex="B=0" />, and matching
        the <Katex tex="x" /> coefficients gives <Katex tex="C=4" />. That is the same{' '}
        <Katex tex="\tfrac3x+\tfrac{4}{x^2+4}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\int\frac{3}{x}\,dx = 3\log_e|x|+c_1" />,
    reason: <>Standard integral: <Katex tex="\int\tfrac1x\,dx=\log_e|x|+c" />. Keep the absolute value: the integrand is defined for negative <Katex tex="x" /> too, and <Katex tex="\log_e(x)" /> isn&apos;t.</>,
    more: (
      <>
        <Katex tex="\log_e|x|" /> is defined on both sides of <Katex tex="0" /> and differentiates to{' '}
        <Katex tex="\tfrac1x" /> on both. For <Katex tex="x>0" /> it is just <Katex tex="\log_e(x)" />.
        For <Katex tex="x<0" />, <Katex tex="|x|=-x" />, so it is <Katex tex="\log_e(-x)" />, whose
        derivative by the chain rule is <Katex tex="\tfrac{1}{-x}\times(-1)=\tfrac1x" />. The report notes that a number of students did not include the absolute value signs.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned}\int\frac{4}{x^2+4}\,dx &= 2\int\frac{2}{2^2+x^2}\,dx\\&= 2\tan^{-1}\!\left(\frac{x}{2}\right)+c_2\end{aligned}" />,
    reason: <>Formula sheet: <Katex tex="\int\tfrac{a}{a^2+x^2}\,dx=\tan^{-1}\!\left(\tfrac xa\right)+c" />. Here <Katex tex="a^2=4" />, so <Katex tex="a=2" />, and the formula needs a numerator of <Katex tex="2" />: write <Katex tex="4=2\times2" /> and take the spare <Katex tex="2" /> outside.</>,
    more: (
      <>
        The report notes a small number of students integrated <Katex tex="\tfrac{4}{x^2+4}" />{' '}
        incorrectly. The easy slip is leaving the <Katex tex="4" /> in front, to get{' '}
        <Katex tex="4\tan^{-1}\!\left(\tfrac x2\right)" />: that differentiates to{' '}
        <Katex tex="4\times\tfrac12\times\tfrac{1}{1+x^2/4}=\tfrac{2}{1+x^2/4}=\tfrac{8}{4+x^2}" /> (multiplying
        top and bottom by <Katex tex="4" />), double the integrand.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{3\log_e|x|+2\tan^{-1}\!\left(\frac{x}{2}\right)+c}" />,
    reason: <>The two constants combine into one, <Katex tex="c=c_1+c_2" />. An indefinite integral always needs the <Katex tex="+c" />.</>,
    more: (
      <>
        The report notes some students failed to include the arbitrary constant. Shifting the answer
        up or down changes none of its slopes, so every value of <Katex tex="c" /> gives a function
        whose derivative is the integrand. Check by differentiating back:{' '}
        <Katex tex="\tfrac3x+2\cdot\tfrac12\cdot\tfrac{1}{1+x^2/4}=\tfrac3x+\tfrac{1}{1+x^2/4}=\tfrac3x+\tfrac{4}{4+x^2}" />{' '}
        (multiplying top and bottom by <Katex tex="4" />), the integrand.
      </>
    ),
  },
]

export default function SpecialistQ4_2022Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (4 marks)</p>
        <p>
          Find <Katex tex="\displaystyle\int\frac{3x^2+4x+12}{x\left(x^2+4\right)}\,dx" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            The usual route for a fraction like this is partial fractions: the denominator has the
            factors <Katex tex="x" /> and <Katex tex="x^2+4" /> (which doesn&apos;t factorise, so its
            numerator is <Katex tex="Bx+C" />), so you write the integrand as{' '}
            <Katex tex="\tfrac Ax+\tfrac{Bx+C}{x^2+4}" />, find <Katex tex="A" />, <Katex tex="B" />,{' '}
            <Katex tex="C" />, and integrate each piece.
          </p>
          <p className="mt-2">
            This integrand has a quicker route, used in the working below, that reaches the same two
            pieces without any partial fractions. The report notes that many students did some algebra
            first and then switched to partial fractions, and that mixing the two methods &ldquo;often resulted in students doing
            significantly more work than would otherwise be required&rdquo;. Pick one method and
            finish it.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <Explore
          title={
            <>
              Why <Katex tex="\log_e|x|" />? The integrand has values for <Katex tex="x<0" />, so the
              antiderivative must too
            </>
          }
        >
          <AbsLogWidget />
        </Explore>
        <SAExaminerReport stats={EXAM} maxMarks={4} />
        <div>
          <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">
            Video Walkthrough
          </p>
          <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
        </div>
      </div>
    </div>
  )
}
