// 2023 Specialist Mathematics — Exam 1 Question 5 (3 marks). Integration by parts, new to
// the 2023 study design. Question text transcribed from the original paper. Answer checked
// with sympy and against the VCAA examination report. Solution is original.
// Oct 2026 Concise/Detailed review: 53% full marks, so no interactive. Each reason now carries
// only what is needed to follow its line; the substitution test, the swapped-roles trap, the
// +c question, the report's "x left in the answer" slip and the numerical check moved to `more`.
// Final review: log_e(x) is a poor dv/dx (not an impossible one); the swapped route returns 2I
// and can be solved for I, but is far longer (sympy-checked).

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
      <Katex tex="x^2" /> and <Katex tex="\log_e(x)" />, and no substitution will simplify it. That
      is the signal to use integration by parts (on the formula sheet).</>,
    more: <>A substitution only works when one factor is a constant multiple of the derivative of
      an expression inside the other, as in <Katex tex="2xe^{x^2}" />. Here neither pairing works:{' '}
      <Katex tex="x^2" /> is not a constant multiple of <Katex tex="\tfrac1x" /> (the derivative
      of <Katex tex="\log_e(x)" />), and <Katex tex="\log_e(x)" /> is not a constant multiple
      of <Katex tex="2x" /> (the derivative of <Katex tex="x^2" />). The formula itself comes from the product rule: antidifferentiate both sides
      of <Katex tex="\tfrac{d}{dx}(uv)=u\tfrac{dv}{dx}+v\tfrac{du}{dx}" /> and rearrange.</>,
  },
  {
    working: <Katex display tex="u = \log_e(x), \qquad \frac{dv}{dx} = x^2" />,
    reason: <>Make <Katex tex="\log_e(x)" /> the part you <em>differentiate</em>: its derivative{' '}
      <Katex tex="\tfrac1x" /> is simple, and once it is multiplied by <Katex tex="v" /> (a power
      of <Katex tex="x" />) it just lowers the power, leaving a plain power of <Katex tex="x" /> to
      integrate. Its antiderivative is not a standard one, so it is a poor choice for{' '}
      <Katex tex="\tfrac{dv}{dx}" />.</>,
    more: <>Swapping the roles (<Katex tex="u=x^2" />, <Katex tex="\tfrac{dv}{dx}=\log_e(x)" />) is
      the mix-up the report describes. You would first need{' '}
      <Katex tex="v=\int\log_e(x)\,dx=x\log_e(x)-x" />, which takes an integration by parts of its
      own. The integral left over, <Katex tex="\int\left(2x^2\log_e(x)-2x^2\right)dx" />, then
      contains twice the integral you started with. It can still be finished by moving that term
      to the left-hand side and solving, but it is far longer than choosing{' '}
      <Katex tex="u=\log_e(x)" /> and easy to get wrong in an exam.</>,
  },
  {
    working: <Katex display tex="\frac{du}{dx} = \frac1x, \qquad v = \frac{x^3}{3}" />,
    reason: <>Differentiate <Katex tex="u" /> and antidifferentiate{' '}
      <Katex tex="\tfrac{dv}{dx}" />. No constant is needed in <Katex tex="v" />.</>,
    more: <>Adding a constant <Katex tex="c" /> to <Katex tex="v" /> would give the same answer: it
      adds <Katex tex="c\log_e(2)" /> to the <Katex tex="uv" /> term and the same amount to the
      integral being subtracted, so the two cancel.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\int_1^2 x^2\log_e(x)\,dx &= \left[\frac{x^3}{3}\log_e(x)\right]_1^2\\&\quad-\int_1^2\frac{x^3}{3}\cdot\frac1x\,dx\end{aligned}" />,
    reason: <>Substitute into the formula. For a definite integral the terminals 1 and 2 apply to{' '}
      <em>both</em> pieces: evaluate the <Katex tex="uv" /> term from 1 to 2, and keep 1 and 2 on
      the integral left over.</>,
    more: <>This is where the slip in the report happens. The final response it quotes,{' '}
      <Katex tex="\tfrac13x^3\log_e(x)-\tfrac79" />, has the second integral evaluated but
      the <Katex tex="uv" /> term never evaluated, so <Katex tex="x" /> is still in the answer.
      Putting square brackets with terminals around <Katex tex="uv" /> as soon as you write it
      stops this.</>,
  },
  {
    working: <Katex display tex="= \frac83\log_e(2)-0-\frac13\int_1^2 x^2\,dx" />,
    reason: <>Evaluate the <Katex tex="uv" /> term: at <Katex tex="x=2" /> it is{' '}
      <Katex tex="\tfrac83\log_e(2)" />; at <Katex tex="x=1" /> it is{' '}
      <Katex tex="\tfrac13\log_e(1)=0" />. In the integral,{' '}
      <Katex tex="\tfrac{x^3}{3}\cdot\tfrac1x=\tfrac{x^2}{3}" />, and the{' '}
      <Katex tex="\tfrac13" /> comes out the front.</>,
    more: <>Check: the integral left over has no <Katex tex="\log_e(x)" /> in it. If it still did,
      you would have chosen <Katex tex="u" /> wrongly; go back and swap <Katex tex="u" /> and{' '}
      <Katex tex="\tfrac{dv}{dx}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&= \frac83\log_e(2)-\frac13\left[\frac{x^3}{3}\right]_1^2\\&= \frac83\log_e(2)-\frac19(8-1)\end{aligned}" />,
    reason: <>Antidifferentiate <Katex tex="x^2" />, then substitute the terminals:{' '}
      <Katex tex="2^3-1^3=7" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{8\log_e(2)}{3}-\frac79}" />,
    reason: <>Leave it exact (Exam 1 has no calculator). A definite integral evaluates to
      a <em>number</em>, so the final answer must not contain <Katex tex="x" />.</>,
    more: <>Check: <Katex tex="\tfrac83\log_e(2)\approx1.848" /> and{' '}
      <Katex tex="\tfrac79\approx0.778" />, so the answer is about <Katex tex="1.071" />. It should
      be positive, since <Katex tex="x^2\log_e(x)>0" /> for <Katex tex="1<x\le 2" />. An equivalent
      form is <Katex tex="\tfrac{24\log_e(2)-7}{9}" />.</>,
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
            in 2023. The whole skill is the choice of which factor to differentiate
            (<Katex tex="u" />): it should get <em>simpler</em> when differentiated, and the other
            factor (<Katex tex="\tfrac{dv}{dx}" />) must be one you can antidifferentiate. A
            logarithm almost always plays the <Katex tex="u" /> role, whatever it is multiplied
            by: it has no antiderivative on the standard list, but differentiating it gets rid
            of the log.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAM} maxMarks={3} />
        <div>
          <p className="text-[11px] font-bold tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">
            Video Walkthrough
          </p>
          <p className="text-[13px] text-gray-500 dark:text-gray-400 italic">Coming soon.</p>
        </div>
      </div>
    </div>
  )
}
