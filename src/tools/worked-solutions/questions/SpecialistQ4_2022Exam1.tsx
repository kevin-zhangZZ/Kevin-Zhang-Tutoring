// 2022 Specialist Mathematics — Exam 1 Question 4 (4 marks). A rational integrand that
// splits without partial fractions if you spot the right regrouping. Question text
// transcribed from the original paper. Answer checked with sympy and against the VCAA
// examination report. Solution is original. Interactive: "Why log_e|x|?" — slide a point along
// F(x) = 3 log_e|x| + 2 tan⁻¹(x/2) and watch the integrand-slope line touch it on both sides of the
// y-axis; a toggle drops the absolute value and the left half of the graph disappears
// (interactives/spec-2022e1-q4-abs-log.tsx).

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
    reason: <>The trick of the question. Compare the numerator with each factor of the denominator: its <Katex tex="x^2" /> and constant terms, <Katex tex="3x^2+12" />, are exactly <Katex tex="3\left(x^2+4\right)" />, and what is left, <Katex tex="4x" />, has the other factor <Katex tex="x" />. So split the numerator into those two pieces.</>,
  },
  {
    working: <Katex display tex="= \frac{3\left(x^2+4\right)}{x\left(x^2+4\right)}+\frac{4x}{x\left(x^2+4\right)} = \frac{3}{x}+\frac{4}{x^2+4}" />,
    reason: <>Each fraction now cancels: <Katex tex="x^2+4" /> in the first, <Katex tex="x" /> in the second (allowed, since <Katex tex="x\neq0" /> anyway). No partial fractions needed, though setting up <Katex tex="\tfrac Ax+\tfrac{Bx+C}{x^2+4}" /> gives the same <Katex tex="A=3" />, <Katex tex="B=0" />, <Katex tex="C=4" /> (see the Background above).</>,
  },
  {
    working: <Katex display tex="\int\frac{3}{x}\,dx = 3\log_e|x|+c_1" />,
    reason: <>The absolute value matters. The integrand is defined for every <Katex tex="x\neq0" />, negative <Katex tex="x" /> included, but <Katex tex="\log_e(x)" /> only exists for <Katex tex="x>0" />. <Katex tex="\log_e|x|" /> exists on both sides of <Katex tex="0" />, and its derivative is <Katex tex="\tfrac1x" /> on both sides. The report notes students who left the absolute value signs out.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\int\frac{4}{x^2+4}\,dx &= 2\int\frac{2}{2^2+x^2}\,dx\\&= 2\tan^{-1}\!\left(\frac{x}{2}\right)+c_2\end{aligned}" />,
    reason: <>Formula sheet: <Katex tex="\int\tfrac{a}{a^2+x^2}\,dx=\tan^{-1}\!\left(\tfrac xa\right)+c" />. Here <Katex tex="a^2=4" />, so <Katex tex="a=2" />, and the formula needs the numerator to be <Katex tex="a=2" />: write <Katex tex="4=2\times2" /> and take the spare <Katex tex="2" /> outside. Leaving the <Katex tex="4" /> in front, to get <Katex tex="4\tan^{-1}\!\left(\tfrac x2\right)" />, is the easy slip: that differentiates to <Katex tex="\tfrac{8}{x^2+4}" />, double the integrand.</>,
  },
  {
    working: <Katex display tex="\boxed{3\log_e|x|+2\tan^{-1}\!\left(\frac{x}{2}\right)+c}" />,
    reason: <>The two constants combine into one, <Katex tex="c=c_1+c_2" />. Include the <Katex tex="+c" />: the report notes some students failed to. Check by differentiating back: <Katex tex="\tfrac3x+2\cdot\tfrac12\cdot\tfrac{1}{1+x^2/4}=\tfrac3x+\tfrac{4}{x^2+4}" />, the integrand.</>,
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
            Before reaching for partial fractions, look at the numerator and ask whether any
            part of it is a multiple of a factor of the denominator. Here{' '}
            <Katex tex="3x^2+12" /> is exactly <Katex tex="3\left(x^2+4\right)" />, so
            splitting the numerator does in one line what partial fractions does in five.
            The report notes that mixing the two methods "often resulted in students doing
            significantly more work than would otherwise be required".
          </p>
          <p className="mt-2">
            If you don&apos;t spot the split, partial fractions still works; just do it fully, once.
            Write <Katex tex="3x^2+4x+12=A\left(x^2+4\right)+(Bx+C)x" />. Putting{' '}
            <Katex tex="x=0" /> gives <Katex tex="12=4A" />, so <Katex tex="A=3" />. Matching the{' '}
            <Katex tex="x^2" /> coefficients gives <Katex tex="3=A+B" />, so <Katex tex="B=0" />,
            and matching the <Katex tex="x" /> coefficients gives <Katex tex="C=4" />. That is the
            same <Katex tex="\tfrac3x+\tfrac{4}{x^2+4}" />.
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
