// 2022 Specialist Mathematics — Exam 1 Question 8 (4 marks). Acceleration given as a
// function of displacement, so a = d(½v²)/dx. Question text transcribed from the original
// paper. Answer checked with sympy and against the VCAA examination report. Solution is
// original.
//
// Interactive widget (this site's own, after the working; 37% full marks):
//  - interactives/spec-2022e1-q8-two-halves.tsx: the body moving on the x-axis with its (x, v)
//    point travelling round v² = 4 − 4x². The trip asked about is the lower half; after the body
//    comes to rest again it returns along the upper half with the same v², so only v = −2 at O can
//    choose the sign.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const TwoHalvesWidget = lazyWidget(() => import('../interactives/spec-2022e1-q8-two-halves'))

const EXAM: SAExaminerStats = {
  marks: [29, 7, 6, 22, 37],
  average: 2.3,
  comment: (
    <>
      Many students were able to use an appropriate acceleration equivalent, either{' '}
      <Katex tex="\tfrac{d}{dx}\!\left(\tfrac12v^2\right)" /> or{' '}
      <Katex tex="v\tfrac{dv}{dx}" />. A number of students chose the incorrect sign for
      their final answer.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="a = \frac{d}{dx}\!\left(\frac12v^2\right) = -4x" />,
    reason: <>Acceleration is given in terms of <Katex tex="x" />, not <Katex tex="t" />, so use the form of <Katex tex="a" /> that differentiates with respect to <Katex tex="x" />: by the chain rule <Katex tex="a=\tfrac{dv}{dt}=\tfrac{dv}{dx}\cdot\tfrac{dx}{dt}=v\tfrac{dv}{dx}=\tfrac{d}{dx}\!\left(\tfrac12v^2\right)" />. (Starting from <Katex tex="v\tfrac{dv}{dx}=-4x" /> and separating variables gives the same next line.)</>,
  },
  {
    working: <Katex display tex="\frac12v^2 = \int -4x\,dx = -2x^2+c" />,
    reason: <>Antidifferentiate both sides with respect to <Katex tex="x" />. One constant <Katex tex="c" /> covers both sides.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &x=0,\ v=-2:\\ &\frac12(-2)^2 = 0+c\\ &c = 2 \end{aligned}" />,
    reason: <>Use the given condition: <Katex tex="v=-2" /> as the body passes through the origin, where <Katex tex="x=0" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \frac12v^2 &= -2x^2+2\\ v^2 &= 4-4x^2 = 4\left(1-x^2\right) \end{aligned}" />,
    reason: <>Multiplying through by 2.</>,
  },
  {
    working: <Katex display tex="v = \pm2\sqrt{1-x^2}" />,
    reason: <>Taking the square root gives two possibilities. The equation <Katex tex="v^2=4\left(1-x^2\right)" /> is true whichever way the body is moving, so it cannot decide the sign; the direction of motion on this interval must.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &v = 0 \iff x = \pm1\\ &v=-2<0 \text{ at } x=0 \end{aligned}" />,
    reason: <>The body is at rest only where <Katex tex="v=0" />, so the interval runs between <Katex tex="x=1" /> and <Katex tex="x=-1" />. It starts at <Katex tex="x=1" />: there <Katex tex="a=-4" />, which pushes it in the negative direction, towards <Katex tex="O" />. Between the two rests <Katex tex="v" /> is never 0, so it cannot change sign, and it is <Katex tex="-2" /> at <Katex tex="x=0" />. So <Katex tex="v<0" /> for the whole interval.</>,
  },
  {
    working: <Katex display tex="\boxed{v = -2\sqrt{1-x^2}, \quad -1\le x\le1}" />,
    reason: <>Take the negative root. The report notes that a number of students chose the incorrect sign. Check: at <Katex tex="x=0" /> this gives <Katex tex="v=-2" />.</>,
  },
]

export default function SpecialistQ8_2022Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 8 (4 marks)</p>
        <p>
          A body moves in a straight line so that when its displacement from a fixed origin{' '}
          <Katex tex="O" /> is <Katex tex="x" /> metres, its acceleration,{' '}
          <Katex tex="a" />, is <Katex tex="-4x\ \mathrm{ms}^{-2}" />. The body accelerates
          from rest and its velocity, <Katex tex="v" />, is equal to{' '}
          <Katex tex="-2\ \mathrm{ms}^{-1}" /> as it passes through the origin. The body then
          comes to rest again.
        </p>
        <p>
          Find <Katex tex="v" /> in terms of <Katex tex="x" /> for this interval.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Match the form of <Katex tex="a" /> to the variable you are given. Here{' '}
            <Katex tex="a" /> is a function of <Katex tex="x" /> and the answer wants{' '}
            <Katex tex="v" /> in terms of <Katex tex="x" />, so neither{' '}
            <Katex tex="\tfrac{dv}{dt}" /> nor <Katex tex="\tfrac{d^2x}{dt^2}" /> helps —{' '}
            <Katex tex="a=\tfrac{d}{dx}\!\left(\tfrac12v^2\right)" /> turns the problem into
            a single antiderivative.
          </p>
          <p>
            Taking the square root at the end produces two answers and only one of them is
            the body being described. Every question like this needs a sentence justifying
            the sign, and here the justification is that <Katex tex="v" /> is continuous and
            only vanishes at <Katex tex="x=\pm1" />, the two ends of the interval.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <Explore title="v² = 4(1 − x²) holds both ways: this trip is the v < 0 half">
          <TwoHalvesWidget />
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
