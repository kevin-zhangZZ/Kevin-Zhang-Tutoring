// 2023 Specialist Mathematics — Exam 1 Question 2 (3 marks). The argument of a cube, done
// either by dividing the argument or by expanding. Question text transcribed from the
// original paper. Answer checked with sympy and against the VCAA examination report.
// Solution is original.
//
// Interactive: interactives/spec-2023e1-q2-cube-angle.tsx (slide b: b − i moves along Im = −1 and
// the direction of z = (b − i)³ turns three times as far, pointing straight down only at b = √3; a
// toggle draws all three directions whose cube points down and shows why only −π/6 fits b > 0).

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const CubeAngleWidget = lazyWidget(() => import('../interactives/spec-2023e1-q2-cube-angle'))

const EXAM: SAExaminerStats = {
  marks: [38, 14, 11, 37],
  average: 1.5,
  comment: (
    <>
      Some students used graphical approaches or expanded; for example,
      <br />
      <Katex tex="(b-i)^3=b^3-3b+\left(1-3b^2\right)i" />
      <br />
      If <Katex tex="\arg(z)=-\tfrac\pi2" /> then{' '}
      <Katex tex="b^3-3b=0\Rightarrow b=\sqrt3" /> since <Katex tex="b>0" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="-\frac{\pi}{2} < \arg(b-i) < 0" />,
    reason: <>Start by locating <Katex tex="b-i" />: its real part <Katex tex="b" /> is positive and its imaginary part is <Katex tex="-1" />, so it lies in the fourth quadrant. This range is what lets you pick the right angle two rows down.</>,
  },
  {
    working: <Katex display tex="3\arg(b-i) = -\frac{\pi}{2} + 2k\pi,\ k \in Z" />,
    reason: <>De Moivre&apos;s theorem: if <Katex tex="b-i = r\operatorname{cis}\theta" />, then <Katex tex="z=(b-i)^3 = r^3\operatorname{cis}(3\theta)" />, so cubing triples the argument. But <Katex tex="3\theta" /> is only <em>an</em> argument of <Katex tex="z" />: it can differ from the principal argument <Katex tex="-\tfrac{\pi}{2}" /> by a whole number of turns, <Katex tex="2k\pi" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}-\frac{3\pi}{2} < 3\arg(b-i) < 0\\ \implies 3\arg(b-i) = -\frac{\pi}{2}\end{gathered}" />,
    reason: <>Multiply the first row&apos;s range by 3. The only value of <Katex tex="-\tfrac{\pi}{2}+2k\pi" /> strictly between <Katex tex="-\tfrac{3\pi}{2}" /> and <Katex tex="0" /> is <Katex tex="-\tfrac{\pi}{2}" /> itself (<Katex tex="k=0" />): <Katex tex="k=1" /> gives <Katex tex="\tfrac{3\pi}{2}" /> and <Katex tex="k=-1" /> gives <Katex tex="-\tfrac{5\pi}{2}" />, both outside.</>,
  },
  {
    working: <Katex display tex="\arg(b-i) = -\frac\pi6" />,
    reason: <>Divide by 3. As it must be, this angle is in the fourth quadrant.</>,
  },
  {
    working: <Katex display tex="\tan\!\left(-\frac\pi6\right) = \frac{-1}{b} \implies -\frac{1}{\sqrt3} = -\frac1b" />,
    reason: <>The tangent of an argument is <Katex tex="\tfrac{\text{Im}}{\text{Re}}" /> (opposite over adjacent in the right-angled triangle from the origin to the point), here <Katex tex="\tfrac{-1}{b}" />. The exact value <Katex tex="\tan\tfrac{\pi}{6}=\tfrac{1}{\sqrt3}" />, with <Katex tex="\tan(-x)=-\tan x" />, gives the left side.</>,
  },
  {
    working: <Katex display tex="\boxed{b = \sqrt3}" />,
    reason: <>Positive, as required by <Katex tex="b\in R^+" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{Or: } (b-i)^3 &= b^3 - 3b^2 i + 3b\,i^2 - i^3\\ &= \left(b^3-3b\right)+\left(1-3b^2\right)i\end{aligned}" />,
    reason: <>The other route the report mentions: expand the cube (coefficients 1, 3, 3, 1, with alternating signs because of the minus), then use <Katex tex="i^2=-1" /> and <Katex tex="i^3=-i" /> to collect the real and imaginary parts.</>,
  },
  {
    working: <Katex display tex="\arg(z) = -\frac\pi2 \implies \mathrm{Re}(z) = 0,\ \mathrm{Im}(z)<0" />,
    reason: <>An argument of <Katex tex="-\tfrac{\pi}{2}" /> means <Katex tex="z" /> points straight down the imaginary axis: no real part, and a negative imaginary part.</>,
  },
  {
    working: <Katex display tex="b^3-3b = b\left(b^2-3\right) = 0 \implies b = \sqrt3" />,
    reason: <>The solutions are <Katex tex="b=0" />, <Katex tex="\sqrt3" /> and <Katex tex="-\sqrt3" />; only <Katex tex="\sqrt3" /> is in <Katex tex="R^+" />.</>,
  },
  {
    working: <Katex display tex="\mathrm{Im}(z) = 1-3\left(\sqrt3\right)^2 = -8 < 0\ \checkmark" />,
    reason: <><Katex tex="\mathrm{Re}(z)=0" /> on its own only puts <Katex tex="z" /> on the imaginary axis, where the argument could be <Katex tex="\tfrac{\pi}{2}" /> or <Katex tex="-\tfrac{\pi}{2}" />. The negative imaginary part confirms <Katex tex="-\tfrac{\pi}{2}" />, so <Katex tex="b=\sqrt3" />.</>,
  },
]

export default function SpecialistQ2_2023Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (3 marks)</p>
        <p>
          Consider the complex number <Katex tex="z=(b-i)^3" />, where{' '}
          <Katex tex="b\in R^+" />.
          <br />
          Find <Katex tex="b" /> given that{' '}
          <Katex tex="\arg(z)=-\dfrac\pi2" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            A power of a complex number is a job for polar form: by de Moivre&apos;s theorem,
            cubing <Katex tex="b-i" /> triples its argument, so the question becomes
            &ldquo;which angle, times 3, gives <Katex tex="-\tfrac{\pi}{2}" />?&rdquo;. The one
            catch is that three times an argument need not be the principal argument, so
            locate <Katex tex="b-i" /> on the Argand diagram first. Expanding{' '}
            <Katex tex="(b-i)^3" /> also works and is not much longer here.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <Explore title="Cubing triples the angle, so b − i must point at −π/6">
          <CubeAngleWidget />
        </Explore>
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
