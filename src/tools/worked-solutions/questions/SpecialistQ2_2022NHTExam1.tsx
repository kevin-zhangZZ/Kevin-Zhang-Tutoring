// 2022 Specialist NHT — Exam 1, Question 2 (3 marks). The NHT report gives sample answers only,
// with no statistics. z³/w² for z = 1 − √3i and w = −2 − 2i in cartesian form, by polar form and
// de Moivre's theorem (the report's main route); the rectangular route the report mentions is
// shown as the check on the final row. Question text transcribed from the original paper (read
// from a rendered page image). Answer checked with sympy and against the report's sample answer
// (i). Solution is original.

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT: SAExaminerStats = {
  comment: <>An algebraic approach using the rectangular form for complex numbers could also have been used.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} |z|&=\sqrt{1^2+\left(\sqrt3\right)^2}=2 \\ \operatorname{Arg}(z)&=-\frac{\pi}{3} \end{aligned}" />,
    reason: <><Katex tex="z=1-\sqrt3i" /> has positive real part and negative imaginary part, so it is in the fourth quadrant. The reference angle is <Katex tex="\tan^{-1}\!\left(\tfrac{\sqrt3}{1}\right)=\tfrac\pi3" />, measured clockwise.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} |w|&=\sqrt{4+4}=2\sqrt2 \\ \operatorname{Arg}(w)&=-\frac{3\pi}{4} \end{aligned}" />,
    reason: <><Katex tex="w=-2-2i" /> is in the third quadrant. The reference angle is <Katex tex="\tan^{-1}(1)=\tfrac\pi4" />, so the principal argument is <Katex tex="-\pi+\tfrac\pi4=-\tfrac{3\pi}{4}" />.</>,
    more: <>Not <Katex tex="\tfrac\pi4" />: that is the argument of <Katex tex="2+2i" />, in the first quadrant. Always place the number on the Argand plane before quoting an inverse tangent.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} z&=2\operatorname{cis}\!\left(-\frac{\pi}{3}\right) \\ w&=2\sqrt2\operatorname{cis}\!\left(-\frac{3\pi}{4}\right) \end{aligned}" />,
  },
  {
    working: <Katex display tex="\begin{aligned} z^3&=2^3\operatorname{cis}\!\left(3\times-\frac{\pi}{3}\right)=8\operatorname{cis}(-\pi) \\ w^2&=\left(2\sqrt2\right)^2\operatorname{cis}\!\left(2\times-\frac{3\pi}{4}\right)=8\operatorname{cis}\!\left(-\frac{3\pi}{2}\right) \end{aligned}" />,
    reason: <>De Moivre's theorem: raising to the power <Katex tex="n" /> raises the modulus to the power <Katex tex="n" /> and multiplies the argument by <Katex tex="n" />.</>,
    more: <>There is no need to bring these arguments back into <Katex tex="(-\pi,\pi]" /> yet. Only the final answer has to be simplified, and leaving them alone keeps the next subtraction tidy.</>,
  },
  {
    working: <Katex display tex="\frac{z^3}{w^2}=\frac{8}{8}\operatorname{cis}\!\left(-\pi-\left(-\frac{3\pi}{2}\right)\right)=\operatorname{cis}\!\left(\frac{\pi}{2}\right)" />,
    reason: <>Dividing in polar form: divide the moduli and subtract the arguments (top minus bottom).</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{z^3}{w^2}=i}" />,
    reason: <>Convert to cartesian form, as the question asks: <Katex tex="\operatorname{cis}\!\left(\tfrac\pi2\right)=\cos\tfrac\pi2+i\sin\tfrac\pi2=0+1i" />. Check, using rectangular form as the report suggests: <Katex tex="z^3=-8" /> and <Katex tex="w^2=8i" />, so <Katex tex="\tfrac{z^3}{w^2}=\tfrac{-8}{8i}=-\tfrac1i=i" /> ✓.</>,
    more: (
      <>
        The rectangular route in full: <Katex tex="(1-\sqrt3i)^3=1-3\sqrt3i+3(\sqrt3i)^2-(\sqrt3i)^3=1-3\sqrt3i-9+3\sqrt3i=-8" />{' '}
        (binomial expansion, with <Katex tex="i^2=-1" /> and <Katex tex="i^3=-i" />), and{' '}
        <Katex tex="(-2-2i)^2=4+8i+4i^2=8i" />. The last step uses <Katex tex="-\tfrac1i=-\tfrac{i}{i^2}=i" />. That{' '}
        <Katex tex="z^3" /> comes out real is no accident: <Katex tex="z" /> has argument{' '}
        <Katex tex="-\tfrac\pi3" />, and three of those make <Katex tex="-\pi" />, the negative real axis.
      </>
    ),
  },
]

export default function SpecialistQ2_2022NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (3 marks)</p>
        <p>
          Given the complex numbers <Katex tex="z=1-\sqrt3i" /> and <Katex tex="w=-2-2i" />, find{' '}
          <Katex tex="\dfrac{z^3}{w^2}" /> in cartesian form.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Powers and quotients are what polar form is good at: in{' '}
            <Katex tex="r\operatorname{cis}\theta" /> form, multiplying multiplies the moduli and
            adds the arguments, so a power <Katex tex="n" /> raises the modulus to the{' '}
            <Katex tex="n" />th power and multiplies the argument by <Katex tex="n" /> (de Moivre),
            and dividing subtracts the arguments.
          </p>
          <p>
            Both <Katex tex="z" /> and <Katex tex="w" /> have exact-value arguments (their real
            and imaginary parts are in the ratio <Katex tex="1:\sqrt3" /> and <Katex tex="1:1" />),
            which is the signal that the polar route was intended. Expanding the cube and the
            square in rectangular form works too, and makes a good check.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <ReportShelf stats={REPORT} maxMarks={3} />
      </div>
    </div>
  )
}
