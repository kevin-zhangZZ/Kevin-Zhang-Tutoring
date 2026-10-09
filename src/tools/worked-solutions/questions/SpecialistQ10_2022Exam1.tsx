// 2022 Specialist Mathematics — Exam 1 Question 10 (6 marks). Sketching sec(4x) over exactly
// one period, then a volume of revolution needing tan(π/12). Question text
// transcribed from the original paper; the sketch is our own drawing of the answer.
// Answers checked with sympy and against the VCAA examination report. Solution is original.
// Widget: interactives/spec-2022e1-q10a-reciprocal.tsx (part a, 13% full marks) — sweep x and
// read each point of sec(4x) as 1 ÷ cos(4x), for the shape errors the report describes. No
// widget for part b (25%): the marks went on the exact value of tan(π/12) and surd arithmetic,
// which a picture doesn't help with.

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import sketchSrc from './spec-2022e1-q10a-sketch.png'

const ReciprocalWidget = lazyWidget(() => import('../interactives/spec-2022e1-q10a-reciprocal'))

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
    reason: <>Sketch <Katex tex="y=\cos(4x)" /> lightly first. Each <Katex tex="y" />-value of the secant is 1 divided by the cosine&apos;s, so every feature below comes from the cosine.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} &x\in\left[-\tfrac\pi4,\tfrac\pi4\right] \implies 4x\in[-\pi,\pi] \\ &\cos(4x) = 0 \implies 4x = \pm\tfrac\pi2 \implies x = \pm\tfrac\pi8 \end{aligned}"
      />
    ),
    reason: <>Multiplying the domain by 4 gives the interval that <Katex tex="4x" /> lies in. Asymptotes are where the cosine is zero, because <Katex tex="1\div0" /> is undefined, and in <Katex tex="[-\pi,\pi]" /> cosine is zero only at <Katex tex="\pm\tfrac\pi2" />, so there are exactly two asymptotes.</>,
  },
  {
    working: <Katex display tex="\cos(4x) = 1 \text{ at } x=0 \implies f(0) = 1" />,
    reason: <>Where the cosine is at its highest, 1, the secant is at its lowest, <Katex tex="\tfrac11=1" />: a local <em>minimum</em> at <Katex tex="(0,1)" />, the only turning point. Either side of it the cosine shrinks towards 0, so the secant grows: a U-shape between the asymptotes.</>,
  },
  {
    working: <Katex display tex="x = \pm\frac\pi4: \ \cos(\pm\pi) = -1 \implies f\!\left(\pm\frac\pi4\right) = -1" />,
    reason: <>At the endpoints the cosine is at its lowest, <Katex tex="-1" />, so the secant is <Katex tex="\tfrac{1}{-1}=-1" />, the top of each outer branch. Moving in towards <Katex tex="x=\pm\tfrac\pi8" />, the cosine rises from <Katex tex="-1" /> to 0, so the secant falls from <Katex tex="-1" /> towards <Katex tex="-\infty" />.</>,
    more: <>Each outer branch levels off (gradient 0) as it arrives at its endpoint, so it looks like half of an upside-down U. But the domain ends there, so these points are endpoints, not turning points. Draw each as a closed dot at the end of its branch.</>,
  },
  {
    working: <Katex display tex="\text{no horizontal asymptote; range } (-\infty,-1]\cup[1,\infty)" />,
    reason: <>The outer branches simply stop at the endpoints, so there is no horizontal asymptote. Nothing lies between <Katex tex="-1" /> and <Katex tex="1" />: the cosine is between <Katex tex="-1" /> and <Katex tex="1" />, and 1 divided by such a number is at least 1 in size.</>,
    more: <>A horizontal asymptote describes what a graph does as <Katex tex="x\to\pm\infty" />, but here <Katex tex="x" /> stays in <Katex tex="\left[-\tfrac\pi4,\tfrac\pi4\right]" />. The report notes a horizontal asymptote was occasionally implied, so don&apos;t draw a dashed line at <Katex tex="y=-1" /> or let the outer branches carry on past the endpoints.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} &\text{Even function: } \sec(-4x)=\sec(4x) \\ &\implies \text{symmetric about the } y\text{-axis} \end{aligned}"
      />
    ),
    reason: <>Because <Katex tex="\cos(-\theta)=\cos(\theta)" />. Check that the asymptotes, branches and endpoints on the left mirror those on the right.</>,
    more: <>The report notes some graphs failed to be symmetric around the vertical axis. A quick test: the two asymptotes should be the same distance, <Katex tex="\tfrac\pi8" />, either side of the <Katex tex="y" />-axis, and both endpoints should sit at the same height, <Katex tex="y=-1" />.</>,
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
    working: <Katex display tex="V = \pi\int_{-\pi/24}^{\pi/48} y^2\,dx =\pi\int_{-\pi/24}^{\pi/48}\sec^2(4x)\,dx" />,
    reason: <>Rotating about the <Katex tex="x" />-axis, each thin slice is a disc of radius <Katex tex="y" />, so <Katex tex="V=\pi\int y^2\,dx" />. Here <Katex tex="y^2=\sec^2(4x)" />.</>,
    more: <>Learn this formula: it isn&apos;t on the formula sheet. The interval sits between the asymptotes <Katex tex="x=\pm\tfrac\pi8" />, inside the middle branch from part a, so the solid is finite. Squaring <Katex tex="\sec(4x)" /> is also what makes this integrable: <Katex tex="\sec^2(4x)" /> has an antiderivative on the formula sheet, <Katex tex="\sec(4x)" /> on its own doesn&apos;t.</>,
  },
  {
    working: <Katex display tex="= \pi\left[\frac{\tan(4x)}{4}\right]_{-\pi/24}^{\pi/48}" />,
    reason: <>The formula sheet gives <Katex tex="\int\sec^2(ax)\,dx=\tfrac1a\tan(ax)+c" />; here <Katex tex="a=4" />.</>,
    more: <>Check by differentiating: <Katex tex="\tfrac{d}{dx}\left(\tfrac14\tan(4x)\right)=\tfrac14\times4\sec^2(4x)=\sec^2(4x)" />.</>,
  },
  {
    working: <Katex display tex="= \frac{\pi}{4}\left(\tan\!\left(\frac{\pi}{12}\right)-\tan\!\left(-\frac{\pi}{6}\right)\right)" />,
    reason: <><Katex tex="4\times\tfrac{\pi}{48}=\tfrac{\pi}{12}" /> and <Katex tex="4\times\left(-\tfrac{\pi}{24}\right)=-\tfrac\pi6" />. The <Katex tex="\tfrac14" /> comes out the front.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} \tan\!\left(\frac{\pi}{12}\right) &= \tan\!\left(\frac\pi3-\frac\pi4\right) \\ &= \frac{\tan\frac\pi3-\tan\frac\pi4}{1+\tan\frac\pi3\tan\frac\pi4} \\ &= \frac{\sqrt3-1}{1+\sqrt3} \end{aligned}"
      />
    ),
    reason: <><Katex tex="\tfrac{\pi}{12}" /> isn&apos;t an angle with a known exact value, but it is the difference of two that are: <Katex tex="\tfrac\pi3-\tfrac\pi4=\tfrac{4\pi}{12}-\tfrac{3\pi}{12}=\tfrac{\pi}{12}" />. Then use the <Katex tex="\tan(x-y)" /> formula from the formula sheet, with <Katex tex="\tan\tfrac\pi3=\sqrt3" /> and <Katex tex="\tan\tfrac\pi4=1" />.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} &= \frac{\sqrt3-1}{\sqrt3+1}\times\frac{\sqrt3-1}{\sqrt3-1} = \frac{3-2\sqrt3+1}{3-1} \\ &= \frac{4-2\sqrt3}{2} = 2-\sqrt3 \end{aligned}"
      />
    ),
    reason: <>Rationalise the denominator: multiplying top and bottom by <Katex tex="\sqrt3-1" /> turns the bottom into <Katex tex="\left(\sqrt3\right)^2-1^2=2" />, and the top is <Katex tex="\left(\sqrt3-1\right)^2=3-2\sqrt3+1" />.</>,
    more: (
      <>
        <p>
          The report notes students who used the difference formula often ran into arithmetic difficulties.
          Most of that route&apos;s arithmetic happens here, so take it one line at a time. Check: <Katex tex="2-\sqrt3\approx0.27" /> is positive and less than{' '}
          <Katex tex="\tan\tfrac\pi6\approx0.58" />, as it must be for an angle smaller than{' '}
          <Katex tex="\tfrac\pi6" />.
        </p>
        <p>
          The other common route is the double angle formula, because <Katex tex="2\times\tfrac{\pi}{12}=\tfrac\pi6" />.
          Let <Katex tex="t=\tan\tfrac{\pi}{12}" /> and use the <Katex tex="\tan(2x)" /> formula from the formula
          sheet:
        </p>
        <Katex
          display
          tex="\begin{aligned} \frac{2t}{1-t^2}&=\tan\tfrac\pi6=\frac{1}{\sqrt3} \\ 2\sqrt3\,t&=1-t^2 \\ t^2+2\sqrt3\,t-1&=0 \\ t&=\frac{-2\sqrt3\pm\sqrt{12+4}}{2} \\ &=-\sqrt3\pm2 \end{aligned}"
        />
        <p>
          The second line is cross-multiplying, and the quadratic formula gives the two roots. Reject{' '}
          <Katex tex="-\sqrt3-2" />: <Katex tex="\tfrac{\pi}{12}" /> is in the first quadrant, so its tangent is
          positive, leaving <Katex tex="t=2-\sqrt3" />. (The rejected root is <Katex tex="\tan\tfrac{7\pi}{12}" />,
          since doubling <Katex tex="\tfrac{7\pi}{12}" /> gives <Katex tex="\tfrac{7\pi}{6}" />, which has the same
          tangent as <Katex tex="\tfrac\pi6" />.) The report notes some students had difficulty solving this
          quadratic or chose the wrong solution.
        </p>
      </>
    ),
  },
  {
    working: <Katex display tex="\tan\!\left(-\frac\pi6\right) = -\frac{1}{\sqrt3} = -\frac{\sqrt3}{3}" />,
    reason: <>Tangent is odd, <Katex tex="\tan(-\theta)=-\tan(\theta)" />, and <Katex tex="\tan\tfrac\pi6=\tfrac{1}{\sqrt3}" />. Rationalising makes it easy to combine with <Katex tex="2-\sqrt3" />.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} V &= \frac{\pi}{4}\left(2-\sqrt3-\left(-\frac{\sqrt3}{3}\right)\right) \\ &= \frac{\pi}{4}\left(2-\sqrt3+\frac{\sqrt3}{3}\right) \\ &= \frac{\pi}{4}\cdot\frac{6-3\sqrt3+\sqrt3}{3} \\ &= \frac{\pi\left(6-2\sqrt3\right)}{12} \end{aligned}"
      />
    ),
    reason: <>Subtracting a negative becomes adding. Then use a common denominator of 3: <Katex tex="2=\tfrac63" /> and <Katex tex="\sqrt3=\tfrac{3\sqrt3}{3}" />, and <Katex tex="-3\sqrt3+\sqrt3=-2\sqrt3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{V = \frac{\left(3-\sqrt3\right)\pi}{6} \text{ cubic units}}" />,
    reason: <>Dividing numerator and denominator by 2 puts it in the required form with <Katex tex="a=3" />, <Katex tex="b=3" />, <Katex tex="c=6" />.</>,
    more: <>That is about <Katex tex="0.664" /> cubic units. Equivalent answers that still fit the form <Katex tex="\tfrac{\left(a-\sqrt b\right)\pi}{c}" /> were accepted; the report gives <Katex tex="\tfrac{\left(6-\sqrt{12}\right)\pi}{12}" /> as an example.</>,
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

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Every feature of a secant graph is inherited from the cosine underneath it. Where{' '}
              <Katex tex="\cos" /> crosses zero, <Katex tex="\sec" /> has an asymptote; where{' '}
              <Katex tex="\cos" /> peaks at 1, <Katex tex="\sec" /> has a minimum of 1; where{' '}
              <Katex tex="\cos" /> troughs at <Katex tex="-1" />, <Katex tex="\sec" /> reaches{' '}
              <Katex tex="-1" />, the top of a branch that opens downwards.
            </p>
            <p>
              The dilation factor <Katex tex="\tfrac14" /> from the <Katex tex="y" />-axis
              compresses the period from <Katex tex="2\pi" /> to <Katex tex="\tfrac\pi2" />, so
              the interval <Katex tex="\left[-\tfrac\pi4,\tfrac\pi4\right]" /> is exactly one
              full period.
            </p>
          </Background>
        </div>
      </DetailOnly>

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
        <Explore
          title={
            <>
              Each point of <Katex tex="y=\sec(4x)" /> is <Katex tex="1\div\cos(4x)" />: a small cosine makes a huge
              secant, and the cosine&apos;s sign decides which side of the axis
            </>
          }
        >
          <ReciprocalWidget />
        </Explore>
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
