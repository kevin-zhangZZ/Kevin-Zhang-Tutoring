// 2023 Specialist Mathematics — Exam 1 Question 5 (3 marks). Integration by parts, new to
// the 2023 study design. Question text transcribed from the original paper. Answer checked
// with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [23, 10, 14, 53],
  average: 2.0,
  comment: (
    <>
      Integration by parts is a new topic for 2023 and many students were able to answer this
      question reasonably well.
      <br />
      Some students did not consistently evaluate the definite integral, and some final
      responses included the independent variable{' '}
      <Katex tex="\tfrac13x^3\log_e(x)-\tfrac79" />.
      <br />
      A number of students selected the function to differentiate and the function to
      antidifferentiate incorrectly. Some idiosyncratic methods were also observed.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int u\,\frac{dv}{dx}\,dx = uv-\int v\,\frac{du}{dx}\,dx" />,
    reason: <>The integrand is a product of two different types of function,{' '}
      <Katex tex="x^2" /> and <Katex tex="\log_e(x)" />, and neither factor is a multiple of the
      derivative of the other, so a substitution won't work. A product like this is the signal to
      use integration by parts (on the formula sheet).</>,
  },
  {
    working: <Katex display tex="u = \log_e(x), \qquad \frac{dv}{dx} = x^2" />,
    reason: <>Make <Katex tex="\log_e(x)" /> the part you <em>differentiate</em>. It is not a
      standard integral, so it can't be <Katex tex="\tfrac{dv}{dx}" />; and its derivative{' '}
      <Katex tex="\tfrac1x" /> will cancel with the power of <Katex tex="x" />. Swapping the roles
      (the mix-up the report describes) would need <Katex tex="v=\int\log_e(x)\,dx" />, which you
      can't write down directly, and the new integral would still contain{' '}
      <Katex tex="\log_e(x)" />.</>,
  },
  {
    working: <Katex display tex="\frac{du}{dx} = \frac1x, \qquad v = \frac{x^3}{3}" />,
    reason: <>Differentiate <Katex tex="u" /> and antidifferentiate{' '}
      <Katex tex="\tfrac{dv}{dx}" />. No constant is needed in <Katex tex="v" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\int_1^2 x^2\log_e(x)\,dx &= \left[\frac{x^3}{3}\log_e(x)\right]_1^2\\&\quad-\int_1^2\frac{x^3}{3}\cdot\frac1x\,dx\end{aligned}" />,
    reason: <>Substitute into the formula. For a definite integral the terminals 1 and 2 apply to{' '}
      <em>both</em> pieces: the <Katex tex="uv" /> term is evaluated from 1 to 2, and the integral
      left over is still from 1 to 2. Forgetting to evaluate the <Katex tex="uv" /> term is how a
      final answer ends up still containing <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="= \frac83\log_e(2)-0-\frac13\int_1^2 x^2\,dx" />,
    reason: <>At <Katex tex="x=2" /> the <Katex tex="uv" /> term is{' '}
      <Katex tex="\tfrac83\log_e(2)" />; at <Katex tex="x=1" /> it is{' '}
      <Katex tex="\tfrac13\log_e(1)=0" />. In the integral,{' '}
      <Katex tex="\tfrac{x^3}{3}\cdot\tfrac1x=\tfrac{x^2}{3}" />, and the{' '}
      <Katex tex="\tfrac13" /> comes out the front. The log has gone, which is the payoff for
      choosing <Katex tex="u=\log_e(x)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&= \frac83\log_e(2)-\frac13\left[\frac{x^3}{3}\right]_1^2\\&= \frac83\log_e(2)-\frac19(8-1)\end{aligned}" />,
    reason: <>Antidifferentiate <Katex tex="x^2" />, then substitute the terminals:{' '}
      <Katex tex="2^3-1^3=7" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{8\log_e(2)}{3}-\frac79}" />,
    reason: <>Leave it exact (Exam 1 has no calculator). As a check, it is about{' '}
      <Katex tex="1.071" />, positive as expected since <Katex tex="x^2\log_e(x)>0" /> for{' '}
      <Katex tex="1<x\le 2" />. A definite integral must evaluate to a <em>number</em> — the
      report notes some final responses still included the independent variable.</>,
  },
]

export default function SpecialistQ5_2023Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (3 marks)</p>
        <p>
          Evaluate <Katex tex="\displaystyle\int_1^2 x^2\log_e(x)\,dx" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Integration by parts is the product rule run backwards; it entered the study design
            in 2023. Use it when the integrand is a product of two different types of function
            and no substitution works. The whole skill is the choice of which factor to
            differentiate (<Katex tex="u" />): pick the one that gets <em>simpler</em> when
            differentiated, and check you can antidifferentiate the other. A logarithm almost
            always plays the <Katex tex="u" /> role, because <Katex tex="\log_e(x)" />{' '}
            differentiates to <Katex tex="\tfrac1x" />, which then cancels against the power
            you antidifferentiated.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAM} maxMarks={3} />
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
