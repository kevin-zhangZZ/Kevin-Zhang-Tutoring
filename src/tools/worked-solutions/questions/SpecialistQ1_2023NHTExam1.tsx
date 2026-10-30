// 2023 Specialist NHT — Exam 1, Question 1 (3 marks). The NHT report gives sample answers only,
// with no statistics; its one note beyond the bare answer ("Alternative approaches can be used.")
// is quoted as the examiner comment. Given sin(x) = 3cos(x) on (0, π/2), find sin(2x): tan(x) = 3, a
// 1–3–√10 right triangle, then the double-angle formula. Question text transcribed from the
// original paper. Answer checked with sympy (sin(2 arctan 3) = 3/5) and against the report's sample
// answer (3/5). Solution is original; the report uses the same triangle, and the
// 2tan/(1 + tan²) route is given as an alternative in `more`.

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT: SAExaminerStats = {
  comment: <>Alternative approaches can be used.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\sin(x)=3\cos(x)\implies \tan(x)=\frac{\sin(x)}{\cos(x)}=3" />,
    reason: <>Divide both sides by <Katex tex="\cos(x)" />, which is allowed because <Katex tex="\cos(x)>0" /> on <Katex tex="\left(0,\tfrac{\pi}{2}\right)" />. One trig ratio is easier to work with than an equation linking two.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}\text{opposite}=3\\ \text{adjacent}=1\\ \text{hypotenuse}=\sqrt{3^2+1^2}=\sqrt{10}\end{gathered}" />,
    reason: <>Since <Katex tex="x" /> is acute, draw a right-angled triangle with angle <Katex tex="x" />: <Katex tex="\tan(x)=\tfrac{\text{opposite}}{\text{adjacent}}=\tfrac31" />, and Pythagoras gives the hypotenuse.</>,
  },
  {
    working: <Katex display tex="\sin(x)=\frac{3}{\sqrt{10}},\quad \cos(x)=\frac{1}{\sqrt{10}}" />,
    reason: <>Read both ratios off the triangle. Both are positive, as they must be in the first quadrant.</>,
    more: <>This is where the interval matters. Without it, <Katex tex="\tan(x)=3" /> also has a third-quadrant solution where both <Katex tex="\sin(x)" /> and <Katex tex="\cos(x)" /> are negative. Their product, and so <Katex tex="\sin(2x)" />, would come out the same, but you should still say which quadrant you are in before taking signs off a triangle.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\sin(2x)&=2\sin(x)\cos(x)\\&=2\times\frac{3}{\sqrt{10}}\times\frac{1}{\sqrt{10}}\\&=\frac{6}{10}\end{aligned}" />,
    reason: <>The double-angle formula for sine turns <Katex tex="\sin(2x)" /> into the two ratios just found. <Katex tex="\sqrt{10}\times\sqrt{10}=10" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\sin(2x)=\frac{3}{5}}" />,
    reason: <>Simplify the fraction: <Katex tex="\tfrac{6}{10}=\tfrac35" />.</>,
    more: <>Sanity check: <Katex tex="\tan(x)=3" /> gives <Katex tex="x\approx1.25" />, so <Katex tex="2x\approx2.5" /> is in the second quadrant, where sine is positive and less than 1 ✓. A route with no triangle: <Katex tex="\sin(2x)=\dfrac{2\tan(x)}{1+\tan^2(x)}=\dfrac{2\times3}{1+9}=\dfrac35" />. It comes from dividing <Katex tex="2\sin(x)\cos(x)" /> by <Katex tex="\sin^2(x)+\cos^2(x)=1" /> and then dividing top and bottom by <Katex tex="\cos^2(x)" />.</>,
  },
]

export default function SpecialistQ1_2023NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (3 marks)</p>
        <p>
          If <Katex tex="\sin(x)=3\cos(x)" />, find the value of <Katex tex="\sin(2x)" />, where{' '}
          <Katex tex="x\in\left(0,\dfrac{\pi}{2}\right)" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Knowing one trig ratio of an acute angle fixes all the others: sketch a right-angled
            triangle with that ratio, find the third side by Pythagoras, and read off whatever you
            need. Here the given equation is really a statement about <Katex tex="\tan(x)" />, and
            the double-angle formula <Katex tex="\sin(2x)=2\sin(x)\cos(x)" /> then needs only{' '}
            <Katex tex="\sin(x)" /> and <Katex tex="\cos(x)" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <ReportShelf stats={REPORT} maxMarks={3} />
      </div>
    </div>
  )
}
