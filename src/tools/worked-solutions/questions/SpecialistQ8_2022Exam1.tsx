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
    reason: <>Acceleration is given in terms of <Katex tex="x" />, and we want <Katex tex="v" /> in terms of <Katex tex="x" />, so use the formula-sheet form <Katex tex="a=\tfrac{d}{dx}\!\left(\tfrac12v^2\right)" />. It has no <Katex tex="t" /> in it.</>,
    more: <>
      <p>
        Why this form works: by the chain rule{' '}
        <Katex tex="a=\tfrac{dv}{dt}=\tfrac{dv}{dx}\cdot\tfrac{dx}{dt}=v\tfrac{dv}{dx}" />, and differentiating{' '}
        <Katex tex="\tfrac12v^2" /> with respect to <Katex tex="x" /> (chain rule again) also gives{' '}
        <Katex tex="v\tfrac{dv}{dx}" />.
      </p>
      <p>
        The report lists either form as an appropriate acceleration equivalent. Starting from{' '}
        <Katex tex="v\tfrac{dv}{dx}=-4x" /> and separating variables,{' '}
        <Katex tex="\int v\,dv=\int -4x\,dx" />, gives the same next line.
      </p>
    </>,
  },
  {
    working: <Katex display tex="\frac12v^2 = \int -4x\,dx = -2x^2+c" />,
    reason: <>Antidifferentiate both sides with respect to <Katex tex="x" />: the left side is already the derivative of <Katex tex="\tfrac12v^2" />, so it just gives back <Katex tex="\tfrac12v^2" />. One constant <Katex tex="c" /> covers both sides.</>,
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
    reason: <>Taking the square root gives two possibilities. <Katex tex="v^2" /> is the same whichever way the body is moving, so the sign has to come from the direction of motion on this interval.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &v = 0 \iff x = \pm1\\ &v=-2<0 \text{ at } x=0 \end{aligned}" />,
    reason: <>The body starts from rest and ends at rest, and <Katex tex="v=0" /> only at <Katex tex="x=\pm1" />, so the interval runs between these two points. Between them <Katex tex="v" /> is never 0, so it can't change sign: it keeps the negative sign it has at <Katex tex="x=0" />.</>,
    more: <>
      This agrees with how the motion starts. <Katex tex="v=-2" /> at <Katex tex="O" /> means the body is moving in
      the negative direction, so it came from the positive side: it started from rest at <Katex tex="x=1" />,
      where <Katex tex="a=-4(1)=-4" /> pushes it towards <Katex tex="O" />. Had it started from rest at{' '}
      <Katex tex="x=-1" /> instead, <Katex tex="a=+4" /> would push it the other way and it would reach{' '}
      <Katex tex="O" /> with <Katex tex="v=+2" />, which is not the body described.
    </>,
  },
  {
    working: <Katex display tex="\boxed{v = -2\sqrt{1-x^2}, \quad -1\le x\le1}" />,
    reason: <>Take the negative root, since <Katex tex="v<0" /> on this interval. The domain is the interval between the two rests.</>,
    more: <>
      <p>
        Check: at <Katex tex="x=0" /> this gives <Katex tex="v=-2\sqrt{1}=-2" />, as given.
      </p>
      <p>
        The sign is the step the report singles out: a number of students chose the incorrect sign. The
        positive root, <Katex tex="v=+2\sqrt{1-x^2}" />, describes the body after this interval: having come
        to rest at <Katex tex="x=-1" />, it heads back
        towards <Katex tex="x=1" /> with <Katex tex="v>0" />. Play the motion in the diagram below to watch both
        halves.
      </p>
    </>,
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
            The formula sheet gives acceleration four ways:{' '}
            <Katex tex="a=\tfrac{d^2x}{dt^2}=\tfrac{dv}{dt}=v\tfrac{dv}{dx}=\tfrac{d}{dx}\!\left(\tfrac12v^2\right)" />.
            They are the same quantity, so choose the one whose variables match the question.
            When <Katex tex="a" /> is given as a function of displacement <Katex tex="x" /> rather
            than time <Katex tex="t" />, the first two bring in <Katex tex="t" />, which the
            question never mentions; the last two involve only <Katex tex="v" /> and{' '}
            <Katex tex="x" />.
          </p>
          <p>
            Squaring throws away direction, so taking a square root to find <Katex tex="v" /> gives
            a <Katex tex="\pm" />, and only one sign describes the body. Every question like this
            needs a sentence justifying the sign, usually from a known velocity at one point
            together with the fact that <Katex tex="v" /> can only change sign by passing through 0,
            where the body is momentarily at rest.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <Explore title="v² = 4(1 − x²) holds both ways: this trip is the v < 0 half">
          <TwoHalvesWidget />
        </Explore>
        <SAExaminerReport stats={EXAM} maxMarks={4} />
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
