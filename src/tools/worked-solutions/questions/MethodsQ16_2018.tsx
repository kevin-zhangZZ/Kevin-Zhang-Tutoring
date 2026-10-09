// 2018 Mathematical Methods — Exam 2, MCQ 16. VCAA examination report: 49% correct.
// Compare a right-endpoint rectangle approximation of an area to the exact integral.
// Question text transcribed from the original paper; the diagram is the actual VCAA figure
// (cropped from the official exam PDF), not a redrawing. Solution is original.
// Answer B checked with sympy: right-endpoint sum 7π/6, exact area 3π/2, ratio 7/9; itute agrees.
// Distractor verified: E (7/3) is 7π/6 ÷ π/2, dividing by the interval's width instead of the
// exact area. No single clean slip lands on A, C or D (C is exact ÷ left-endpoint sum, two slips),
// so they are not named.
// Interactive (§15): interactives/meth-2018-mcq16-underestimate.tsx draws Jamie's rectangles
// under the falling curve with the missed slivers in red; slide n or switch to left endpoints.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import rectanglesSrc from './meth-2018-mcq16-rectangles.png'

const UnderestimateWidget = lazyWidget(() => import('../interactives/meth-2018-mcq16-underestimate'))

const DIAGRAM = (
  <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-3 w-fit">
    <img loading="lazy" decoding="async" src={rectanglesSrc} alt="Graph of y = 2cos(2x) + 3 on [0, π/2] with three right-endpoint approximating rectangles, from the original 2018 VCAA exam paper" className="w-full max-w-[380px]" />
  </div>
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 49, C: 18, D: 9, E: 15 },
  answer: 'B',
  noAnswer: 1,
  comment: (
    <>
      Area of the rectangles =
      <br />
      <Katex tex="\dfrac{\pi}{6}\left(f\left(\dfrac{\pi}{6}\right)+f\left(\dfrac{\pi}{3}\right)+f\left(\dfrac{\pi}{2}\right)\right)=\dfrac{7\pi}{6}" />
      <br />
      Actual area = <Katex tex="\displaystyle\int_0^{\frac{\pi}{2}} f(x)\,dx=\frac{3\pi}{2}" />
      <br />
      <Katex tex="\dfrac{\;\frac{7\pi}{6}\;}{\frac{3\pi}{2}}=\dfrac79" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\begin{aligned} f\!\left(\tfrac{\pi}{6}\right) &= 2\cos\!\left(\tfrac{\pi}{3}\right)+3 \\ &= 2(0.5)+3 \\ &= 4 \end{aligned}" />
        <Katex display tex="\begin{aligned} f\!\left(\tfrac{\pi}{3}\right) &= 2\cos\!\left(\tfrac{2\pi}{3}\right)+3 \\ &= 2(-0.5)+3 \\ &= 2 \end{aligned}" />
        <Katex display tex="\begin{aligned} f\!\left(\tfrac{\pi}{2}\right) &= 2\cos(\pi)+3 \\ &= 2(-1)+3 \\ &= 1 \end{aligned}" />
      </>
    ),
    reason: (
      <>
        First read the picture: the interval <Katex tex="\left[0,\tfrac{\pi}{2}\right]" /> is cut into three equal widths
        of <Katex tex="\tfrac{\pi}{6}" />, and each rectangle&apos;s <em>top-right</em> corner touches the curve. So the
        heights are <Katex tex="f" /> at the right edges <Katex tex="\tfrac{\pi}{6},\tfrac{\pi}{3},\tfrac{\pi}{2}" />. These
        are exact values you know, so no CAS is needed (and it avoids a degree-mode slip).
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} \text{Jamie's area} &= \frac{\pi}{6}(4+2+1) \\ &= \frac{7\pi}{6} \end{aligned}" />,
    reason: <>Each rectangle is width <Katex tex="\times" /> height, and all three share the width <Katex tex="\tfrac{\pi}{6}" />, so factor it out and add the heights.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{Exact area} = \int_0^{\pi/2}\bigl(2\cos(2x)+3\bigr)dx" />
        <Katex display tex="= \Bigl[\sin(2x)+3x\Bigr]_0^{\pi/2} = \bigl(\sin\pi+\tfrac{3\pi}{2}\bigr)-0 = \frac{3\pi}{2}" />
      </>
    ),
    reason: (
      <>
        The exact area is the definite integral. Sanity check before dividing: the curve is decreasing, so every
        right-endpoint rectangle sits below it and Jamie&apos;s <Katex tex="\tfrac{7\pi}{6}" /> must be <em>less</em> than{' '}
        <Katex tex="\tfrac{3\pi}{2}" />. It is.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} \text{ratio} &= \frac{7\pi/6}{3\pi/2} \\ &= \frac{7}{6}\times\frac{2}{3} \\ &= \frac{14}{18} \end{aligned}" />,
    reason: <>&ldquo;As a fraction of the exact area&rdquo; means approximation <Katex tex="\div" /> exact. The <Katex tex="\pi" />s cancel, and the result is less than <Katex tex="1" />, as it must be for an underestimate.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{7}{9}}" />,
    reason: <>Matches option <b>B</b>. Option <b>E</b> <Katex tex="\left(\tfrac73\right)" /> divides <Katex tex="\tfrac{7\pi}{6}" /> by <Katex tex="\tfrac{\pi}{2}" />, the width of the interval, rather than by the exact area; a fraction bigger than <Katex tex="1" /> is impossible for an underestimate.</>,
  },
]

export default function MethodsQ16_2018() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-3">
            Jamie approximates the area between the <Katex tex="x" />-axis and the graph of{' '}
            <Katex tex="y=2\cos(2x)+3" />, over the interval <Katex tex="\left[0,\tfrac{\pi}{2}\right]" />,
            using the three rectangles shown below.
          </p>
          <div className="mb-3">{DIAGRAM}</div>
          <p>Jamie's approximation as a fraction of the exact area is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac59" /> },
        { letter: 'B', content: <Katex tex="\dfrac79" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\dfrac{9}{11}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{11}{18}" /> },
        { letter: 'E', content: <Katex tex="\dfrac73" /> },
      ]}
      rows={ROWS}
      background={
        <Background title="Left or right endpoints: over or under?">
          <p>
            A rectangle approximation takes one height per strip. If the function is <em>decreasing</em>, the right edge
            of each strip is its lowest point, so right-endpoint rectangles sit under the curve and underestimate the area;
            left endpoints do the opposite. For an increasing function the roles swap. Knowing which way the error goes
            lets you reject impossible options before calculating.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="Why Jamie's rectangles fall short of the exact area">
            <UnderestimateWidget />
          </Explore>
          <WrongMethod
            title="Divide Jamie's area by the width of the interval"
            source="15% chose E"
            working={<Katex display tex="\frac{7\pi/6}{\pi/2} = \frac{7}{6}\times 2 = \frac73 \quad \text{(option E)}" />}
          >
            <p>
              <Katex tex="\tfrac{\pi}{2}" /> is a length along the <Katex tex="x" />-axis, not the exact area. Dividing an
              area by a width gives the rectangles&apos; <em>average height</em>{' '}
              (<Katex tex="\tfrac{4+2+1}{3}=\tfrac73" />), not a fraction of the true area. The check that catches it:
              every rectangle sits under the curve, so the fraction must be less than <Katex tex="1" />, and{' '}
              <Katex tex="\tfrac73" /> isn&apos;t. Divide by <Katex tex="\int_0^{\pi/2} f(x)\,dx=\tfrac{3\pi}{2}" /> instead.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
