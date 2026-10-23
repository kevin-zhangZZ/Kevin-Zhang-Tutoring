// 2024 Specialist NHT — Exam 1, Question 2 (3 marks). The NHT report gives sample answers only,
// with no statistics. The four fourth roots of −8 + 8√3i by polar form and de Moivre's theorem:
// √3 + i, −1 + √3i, −√3 − i, 1 − √3i. Question text transcribed from the original paper (read from a
// rendered page image). The Argand diagram of the roots (spec-2024nhte1-q2-roots.png) is this
// site's own explanatory figure, drawn with matplotlib; VCAA printed no figure. Answers checked with
// sympy (each root raised to the fourth power) and against the VCAA report's sample answer, which
// agrees; the report lists the arguments as π/6, 2π/3, 7π/6, 5π/3 (not all principal), the same
// four numbers. Solution is original.

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import rootsSrc from './spec-2024nhte1-q2-roots.png'

const REPORT: SAExaminerStats = {}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}\left|-8+8\sqrt3i\right|&=\sqrt{(-8)^2+\left(8\sqrt3\right)^2} \\ &=\sqrt{64+192}=\sqrt{256}=16\end{aligned}" />,
    reason: <>To use de Moivre&apos;s theorem, first write the right-hand side in polar form. Start with its modulus.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\tan\theta=\frac{8\sqrt3}{-8}=-\sqrt3 \\ &\text{2nd quadrant}\implies\operatorname{Arg}=\frac{2\pi}{3}\end{aligned}" />,
    reason: <>Real part negative, imaginary part positive: the point is in the second quadrant. The reference angle with <Katex tex="\tan=\sqrt3" /> is <Katex tex="\tfrac\pi3" />, so the argument is <Katex tex="\pi-\tfrac\pi3=\tfrac{2\pi}3" />.</>,
    more: <>Taking <Katex tex="\tan^{-1}(-\sqrt3)=-\tfrac\pi3" /> straight from the ratio would put the point in the fourth quadrant, where <Katex tex="8-8\sqrt3i" /> lives. Always check the quadrant from the signs of the real and imaginary parts.</>,
  },
  {
    working: <Katex display tex="z^4=16\operatorname{cis}\!\left(\frac{2\pi}{3}+2k\pi\right),\ k\in Z" />,
    reason: <>Adding any whole number of turns <Katex tex="2k\pi" /> gives the same complex number. Keeping them is what produces all four roots when we divide the angle by 4.</>,
  },
  {
    working: <Katex display tex="z=r\operatorname{cis}\theta:\quad r^4\operatorname{cis}(4\theta)=16\operatorname{cis}\!\left(\frac{2\pi}{3}+2k\pi\right)" />,
    reason: <>de Moivre&apos;s theorem: raising to the 4th power raises the modulus to the 4th power and multiplies the argument by 4.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&r^4=16\implies r=2 \\ &4\theta=\frac{2\pi}{3}+2k\pi \\ &\implies\theta=\frac{\pi}{6}+\frac{k\pi}{2}\end{aligned}" />,
    reason: <>Match moduli and arguments. <Katex tex="r" /> is a modulus, so it&apos;s the positive real fourth root of 16.</>,
  },
  {
    working: <Katex display tex="k=-2,-1,0,1:\quad\theta=-\frac{5\pi}{6},\ -\frac{\pi}{3},\ \frac{\pi}{6},\ \frac{2\pi}{3}" />,
    reason: <>Successive roots are <Katex tex="\tfrac\pi2" /> apart, so four consecutive values of <Katex tex="k" /> give four different roots; any other <Katex tex="k" /> repeats one of them. These four arguments are the ones in <Katex tex="(-\pi,\pi]" />.</>,
    more: <>The report uses <Katex tex="k=0,1,2,3" />, giving <Katex tex="\tfrac\pi6,\ \tfrac{2\pi}3,\ \tfrac{7\pi}6,\ \tfrac{5\pi}3" />. These are the same four directions (<Katex tex="\tfrac{7\pi}6" /> and <Katex tex="-\tfrac{5\pi}6" /> differ by a full turn), so the roots are identical.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} 2\operatorname{cis}\!\left(\tfrac{\pi}{6}\right)&=2\left(\tfrac{\sqrt3}{2}+\tfrac12i\right)=\sqrt3+i \\ 2\operatorname{cis}\!\left(\tfrac{2\pi}{3}\right)&=2\left(-\tfrac12+\tfrac{\sqrt3}{2}i\right)=-1+\sqrt3i \\ 2\operatorname{cis}\!\left(-\tfrac{5\pi}{6}\right)&=2\left(-\tfrac{\sqrt3}{2}-\tfrac12i\right)=-\sqrt3-i \\ 2\operatorname{cis}\!\left(-\tfrac{\pi}{3}\right)&=2\left(\tfrac12-\tfrac{\sqrt3}{2}i\right)=1-\sqrt3i \end{aligned}"
      />
    ),
    reason: <>The question asks for Cartesian form, so expand each <Katex tex="\operatorname{cis}\theta=\cos\theta+i\sin\theta" /> using exact values.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async" src={rootsSrc} alt="This site's own Argand diagram: the four roots √3 + i, −1 + √3i, −√3 − i and 1 − √3i on a dashed circle of radius 2, a quarter-turn apart, forming a square; the first root is at angle π/6 from the positive real axis." className="w-full max-w-[340px]" />
      </div>
    ),
    reason: <>The roots of <Katex tex="z^4=w" /> all have the same modulus, so they lie on one circle (radius 2), equally spaced a quarter-turn apart: the vertices of a square.</>,
    more: <>This gives a fast cross-check. The roots come in pairs <Katex tex="\pm z" />: once you have <Katex tex="\sqrt3+i" />, the opposite vertex is <Katex tex="-\sqrt3-i" />, and multiplying by <Katex tex="i" /> (a quarter-turn) gives <Katex tex="i(\sqrt3+i)=-1+\sqrt3i" />.</>,
  },
  {
    working: <Katex display tex="\boxed{z=\sqrt3+i,\ \ -1+\sqrt3i,\ \ -\sqrt3-i,\ \ 1-\sqrt3i}" />,
    reason: <>Check one: <Katex tex="(\sqrt3+i)^2=3+2\sqrt3i-1=2+2\sqrt3i" />, and <Katex tex="(2+2\sqrt3i)^2=4+8\sqrt3i-12=-8+8\sqrt3i" /> ✓.</>,
  },
]

export default function SpecialistQ2_2024NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (3 marks)</p>
        <p>
          Solve <Katex tex="z^4=-8+8\sqrt3i" />, giving your answers in Cartesian form.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            An equation <Katex tex="z^n=w" /> has exactly <Katex tex="n" /> solutions. The efficient route is polar form:
            write <Katex tex="w=R\operatorname{cis}\varphi" />, then by de Moivre&apos;s theorem every solution has
            modulus <Katex tex="\sqrt[n]{R}" /> and argument <Katex tex="\tfrac{\varphi+2k\pi}{n}" />. The{' '}
            <Katex tex="2k\pi" /> matters: without it you find only one of the <Katex tex="n" /> roots.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <ReportShelf stats={REPORT} maxMarks={3} />
      </div>
    </div>
  )
}
