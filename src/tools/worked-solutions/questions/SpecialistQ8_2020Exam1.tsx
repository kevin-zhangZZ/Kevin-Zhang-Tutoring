// 2020 Specialist Mathematics — Exam 1 Question 8 (5 marks). A volume of revolution whose
// integrand needs a partial fraction decomposition with an irreducible quadratic. Question
// text transcribed from the original paper. Answer checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [14, 22, 16, 11, 16, 20],
  average: 2.5,
  comment: (
    <>
      Many students identified the correct form of the partial fraction decomposition for the
      integrand: <Katex tex="\dfrac{A}{x+1}+\dfrac{Bx+C}{x^2+1}" />
      <br />
      This led to the integral{' '}
      <Katex tex="\displaystyle2\pi\int_0^{\sqrt3}\left(\frac{1}{x+1}+\frac{x}{x^2+1}+\frac{1}{x^2+1}\right)dx" />
      <br />
      A number of students used a substitution to evaluate the integral{' '}
      <Katex tex="\displaystyle\int_0^{\sqrt3}\frac{x}{x^2+1}\,dx" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\int_0^{\sqrt3}y^2\,dx" />,
    reason: <>Rotation about the <Katex tex="x" />-axis. Squaring <Katex tex="y" /> removes the square root — which is why it was put there.</>,
  },
  {
    working: <Katex display tex="y^2 = \frac{4\left(x^2+x+1\right)}{(x+1)\left(x^2+1\right)}" />,
    reason: <>The 2 out the front squares to 4.</>,
  },
  {
    working: <Katex display tex="\frac{x^2+x+1}{(x+1)\left(x^2+1\right)} = \frac{A}{x+1}+\frac{Bx+C}{x^2+1}" />,
    reason: <><Katex tex="x^2+1" /> is irreducible over <Katex tex="R" />, so its numerator must be linear, not constant — the report notes many students identified this form.</>,
  },
  {
    working: <Katex display tex="x^2+x+1 = A\left(x^2+1\right)+(Bx+C)(x+1)" />,
    reason: <>Multiplying through by the denominator.</>,
  },
  {
    working: <Katex display tex="x=-1: \ 1 = 2A \implies A = \tfrac12" />,
    reason: <>Substituting the root of the linear factor kills the other term.</>,
  },
  {
    working: <Katex display tex="x^2: \ 1 = A+B \implies B = \tfrac12; \quad \text{const}: \ 1 = A+C \implies C = \tfrac12" />,
    reason: <>Equating coefficients for the remaining two.</>,
  },
  {
    working: <Katex display tex="y^2 = \frac{2}{x+1}+\frac{2x+2}{x^2+1} = \frac{2}{x+1}+\frac{2x}{x^2+1}+\frac{2}{x^2+1}" />,
    reason: <>Multiplying back by 4, then splitting the middle term — each of the three pieces now matches a standard antiderivative.</>,
  },
  {
    working: <Katex display tex="V = \pi\left[2\log_e(x+1)+\log_e\left(x^2+1\right)+2\arctan(x)\right]_0^{\sqrt3}" />,
    reason: <>The middle term is the <Katex tex="\tfrac{f'}{f}" /> form: <Katex tex="\int\frac{2x}{x^2+1}dx=\log_e\left(x^2+1\right)" />, no substitution required (the report notes a number of students used one).</>,
  },
  {
    working: <Katex display tex="= \pi\left[2\log_e\left(\sqrt3+1\right)+\log_e(4)+2\cdot\tfrac\pi3\right]-\pi\left[0+0+0\right]" />,
    reason: <><Katex tex="\left(\sqrt3\right)^2+1=4" /> and <Katex tex="\arctan\sqrt3=\tfrac\pi3" />; every term vanishes at <Katex tex="x=0" />.</>,
  },
  {
    working: <Katex display tex="= \pi\left[2\log_e\left(\sqrt3+1\right)+2\log_e(2)+\tfrac{2\pi}{3}\right]" />,
    reason: <><Katex tex="\log_e(4)=2\log_e(2)" />, which makes every term carry a factor of 2.</>,
  },
  {
    working: <Katex display tex="\boxed{V = 2\pi\left(\log_e\left(2+2\sqrt3\right)+\frac\pi3\right)}" />,
    reason: <>Combining the logs: <Katex tex="\log_e\left(\sqrt3+1\right)+\log_e(2)=\log_e\left(2\sqrt3+2\right)" />. So <Katex tex="a=2+2\sqrt3" /> and <Katex tex="b=\tfrac\pi3" />; numerically <Katex tex="V\approx17.25" />.</>,
  },
]

export default function SpecialistQ8_2020Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 8 (5 marks)</p>
        <p>
          Find the volume, <Katex tex="V" />, of the solid of revolution formed when the
          graph of{' '}
          <Katex tex="y=2\sqrt{\dfrac{x^2+x+1}{(x+1)\left(x^2+1\right)}}" /> is rotated about
          the <Katex tex="x" />-axis over the interval{' '}
          <Katex tex="\left[0,\sqrt3\right]" />. Give your answer in the form{' '}
          <Katex tex="V=2\pi\left(\log_e(a)+b\right)" />, where <Katex tex="a,b\in R" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            The square root and the 2 out the front are both there to be removed by the{' '}
            <Katex tex="y^2" /> in the volume formula — so the real question is the partial
            fraction decomposition underneath.
          </p>
          <p>
            The given answer form is a strong hint: a single logarithm plus something, all
            times <Katex tex="2\pi" />. Seeing that <Katex tex="b=\tfrac\pi3" /> has to come
            from an arctan tells you the <Katex tex="\tfrac{1}{x^2+1}" /> piece must survive
            the decomposition.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAM} maxMarks={5} />
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
