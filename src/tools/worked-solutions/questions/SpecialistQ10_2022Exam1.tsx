// 2022 Specialist Mathematics — Exam 1 Question 10 (6 marks). Sketching sec(4x) over one
// full period-and-a-bit, then a volume of revolution needing tan(π/12). Question text
// transcribed from the original paper; the sketch is our own drawing of the answer.
// Answers checked with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import sketchSrc from './spec-2022e1-q10a-sketch.png'

const EXAM_A: SAExaminerStats = {
  marks: [23, 17, 46, 13],
  average: 1.5,
  comment: (
    <>
      Many students correctly identified the vertical asymptotes, turning point and
      endpoints. Occasionally a horizontal asymptote was implied. Some graphs were drawn
      inaccurately, showing the wrong shape or failing to be symmetric around the vertical
      axis.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [15, 29, 31, 25],
  average: 1.7,
  comment: (
    <>
      Equivalent answers in the correct form such as{' '}
      <Katex tex="\tfrac{\left(6-\sqrt{12}\right)\pi}{12}" /> were acceptable.
      <br />
      Most students wrote down a correct integral for the volume of revolution and many made
      progress by realising that <Katex tex="\tfrac14\tan(4x)" /> was an antiderivative of{' '}
      <Katex tex="\sec^2(4x)" />.
      <br />
      Students needed to determine the value of{' '}
      <Katex tex="\tan\!\left(\tfrac{\pi}{12}\right)" />. The most common approaches were
      via a double angle formula involving <Katex tex="\tan\left(\tfrac\pi6\right)" /> or
      recognising that{' '}
      <Katex tex="\tan\left(\tfrac{\pi}{12}\right)=\tan\left(\tfrac\pi3-\tfrac\pi4\right)" />.
      Some students had difficulty solving the quadratic equation arising from the double
      angle formula or chose the wrong solution.
      <br />
      Students who used the difference formula often ran into arithmetic difficulties.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \sec(4x) = \frac{1}{\cos(4x)}" />,
    reason: <>Sketch the cosine underneath in your head; the secant is its reciprocal.</>,
  },
  {
    working: <Katex display tex="\cos(4x) = 0 \implies 4x = \pm\frac\pi2 \implies x = \pm\frac\pi8" />,
    reason: <>Asymptotes where the cosine is zero. These are the only two in <Katex tex="\left[-\tfrac\pi4,\tfrac\pi4\right]" />.</>,
  },
  {
    working: <Katex display tex="\cos(4x) = 1 \text{ at } x=0 \implies f(0) = 1" />,
    reason: <>Where the cosine peaks, the secant bottoms out: a local <em>minimum</em> at <Katex tex="(0,1)" />.</>,
  },
  {
    working: <Katex display tex="x = \pm\frac\pi4: \ \cos(\pm\pi) = -1 \implies f\!\left(\pm\frac\pi4\right) = -1" />,
    reason: <>The two endpoints, which are also the local maxima of the outer branches.</>,
  },
  {
    working: <Katex display tex="\text{no horizontal asymptote; range } (-\infty,-1]\cup[1,\infty)" />,
    reason: <>The report notes some students implied one. The curve runs off to <Katex tex="\pm\infty" /> at the vertical asymptotes and never flattens out.</>,
  },
  {
    working: <Katex display tex="\text{Even function: } \sec(-4x)=\sec(4x) \implies \text{symmetric about the } y\text{-axis}" />,
    reason: <>A free accuracy check — the report notes some graphs failed to be symmetric around the vertical axis.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          src={sketchSrc}
          alt="On VCAA's grid: three branches of y = sec(4x) — a U-shaped branch with minimum (0, 1) between the dashed asymptotes x = −π/8 and x = π/8, and two branches below the axis rising to the endpoints (−π/4, −1) and (π/4, −1)"
          className="w-full max-w-[520px]"
        />
      </div>
    ),
    reason: <>Asymptotes labelled with their equations; the turning point and both endpoints labelled with their coordinates.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\int_a^b y^2\,dx = \pi\int_{-\pi/24}^{\pi/48}\sec^2(4x)\,dx" />,
    reason: <>Rotation about the <Katex tex="x" />-axis, straight off the formula sheet. Squaring <Katex tex="\sec(4x)" /> is what makes this integrable at all.</>,
  },
  {
    working: <Katex display tex="= \pi\left[\frac{\tan(4x)}{4}\right]_{-\pi/24}^{\pi/48}" />,
    reason: <>Since <Katex tex="\tfrac{d}{dx}\tan(4x)=4\sec^2(4x)" />, the antiderivative carries a <Katex tex="\tfrac14" />.</>,
  },
  {
    working: <Katex display tex="= \frac{\pi}{4}\left(\tan\!\left(\frac{\pi}{12}\right)-\tan\!\left(-\frac{\pi}{6}\right)\right)" />,
    reason: <><Katex tex="4\times\tfrac{\pi}{48}=\tfrac{\pi}{12}" /> and <Katex tex="4\times\left(-\tfrac{\pi}{24}\right)=-\tfrac\pi6" />.</>,
  },
  {
    working: <Katex display tex="\tan\!\left(\frac{\pi}{12}\right) = \tan\!\left(\frac\pi3-\frac\pi4\right) = \frac{\sqrt3-1}{1+\sqrt3} = \frac{\left(\sqrt3-1\right)^2}{2} = 2-\sqrt3" />,
    reason: <>The difference formula, then rationalising with <Katex tex="\sqrt3-1" />. The double angle route <Katex tex="t^2+2\sqrt3\,t-1=0" /> gives <Katex tex="t=-\sqrt3\pm2" />, and only <Katex tex="2-\sqrt3" /> is positive — the report notes some students chose the wrong solution.</>,
  },
  {
    working: <Katex display tex="\tan\!\left(-\frac\pi6\right) = -\frac{1}{\sqrt3} = -\frac{\sqrt3}{3}" />,
    reason: <>An exact value worth knowing cold.</>,
  },
  {
    working: <Katex display tex="V = \frac{\pi}{4}\left(2-\sqrt3+\frac{\sqrt3}{3}\right) = \frac{\pi}{4}\cdot\frac{6-3\sqrt3+\sqrt3}{3} = \frac{\pi\left(6-2\sqrt3\right)}{12}" />,
    reason: <>Common denominator 3, then combining the surd terms.</>,
  },
  {
    working: <Katex display tex="\boxed{V = \frac{\left(3-\sqrt3\right)\pi}{6} \text{ cubic units}}" />,
    reason: <>Dividing numerator and denominator by 2 puts it in the required form with <Katex tex="a=3" />, <Katex tex="b=3" />, <Katex tex="c=6" />; about <Katex tex="0.664" />. The report accepted equivalent answers in the correct form, such as <Katex tex="\tfrac{\left(6-\sqrt{12}\right)\pi}{12}" />.</>,
  },
]

export default function SpecialistQ10_2022Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 10 (6 marks)</p>
        <p>
          Let <Katex tex="f(x)=\sec(4x)" />.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Every feature of a secant graph is inherited from the cosine underneath it. Where{' '}
            <Katex tex="\cos" /> crosses zero, <Katex tex="\sec" /> has an asymptote; where{' '}
            <Katex tex="\cos" /> peaks at 1, <Katex tex="\sec" /> has a minimum of 1; where{' '}
            <Katex tex="\cos" /> troughs at <Katex tex="-1" />, <Katex tex="\sec" /> has a
            maximum of <Katex tex="-1" />. Nothing lies between{' '}
            <Katex tex="-1" /> and <Katex tex="1" />.
          </p>
          <p>
            The dilation factor <Katex tex="\tfrac14" /> from the <Katex tex="y" />-axis
            compresses the period from <Katex tex="2\pi" /> to <Katex tex="\tfrac\pi2" />, so
            the interval <Katex tex="\left[-\tfrac\pi4,\tfrac\pi4\right]" /> is exactly one
            full period.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        topic="Sketch Reciprocal Trig"
        marks={3}
        statement={
          <>
            Sketch the graph of <Katex tex="f" /> for{' '}
            <Katex tex="x\in\left[-\dfrac\pi4,\dfrac\pi4\right]" /> on the set of axes below.
            Label any asymptotes with their equations and label any turning points and the
            endpoints with their coordinates.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Volume of Revolution"
        marks={3}
        statement={
          <>
            The graph of <Katex tex="y=f(x)" /> for{' '}
            <Katex tex="x\in\left[-\dfrac{\pi}{24},\dfrac{\pi}{48}\right]" /> is rotated about
            the <Katex tex="x" />-axis to form a solid of revolution.
            <br />
            Find the volume of this solid. Give your answer in the form{' '}
            <Katex tex="\dfrac{\left(a-\sqrt b\right)\pi}{c}" />, where{' '}
            <Katex tex="a,b,c\in R" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
