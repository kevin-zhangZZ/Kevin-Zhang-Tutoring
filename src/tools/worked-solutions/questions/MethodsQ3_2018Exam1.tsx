// 2018 Mathematical Methods — Exam 1, Question 3 (5 marks). Solve 2cos(x)+1 = 0 on [0, 2π],
// then sketch f(x) = 2cos(x)+1 on VCAA's blank axes. Question text transcribed from the
// original paper; the blank axes in part b.'s statement are cropped from the paper (page 5).
// VCAA printed only an empty grid for part (b), so the finished curve is this site's own
// answer-sketch (matplotlib) drawn to VCAA's exact printed range and tick spacing.
// Answers checked independently with sympy and against the VCAA examination report (and
// itute's solutions, which agree).
// Interactive widgets (this site's own): part a. — the unit circle, where cos(x) = −½ is a
// vertical line cutting the circle twice, with the report's π/6 slip shown missing it
// (interactives/meth-2018e1-q3a-unit-circle.tsx); part b. — y = 2cos(x)+1 built from y = cos(x)
// step by step on VCAA's grid, showing why part a.'s answers are the x-intercepts, plus the flat
// endpoints and the two-cycle cos(2x) slip (interactives/meth-2018e1-q3b-build-graph.tsx).
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import sketchSrc from './meth-2018e1-q3-cosine.png'
import blankAxesSrc from './meth-2018e1-q3b-blank-axes.png'

const UnitCircleWidget = lazyWidget(() => import('../interactives/meth-2018e1-q3a-unit-circle'))
const BuildGraphWidget = lazyWidget(() => import('../interactives/meth-2018e1-q3b-build-graph'))

const EXAM_A: SAExaminerStats = {
  marks: [11, 17, 72],
  average: 1.6,
  comment: (
    <>
      This question was well answered. However, some students gave solutions beyond the given
      domain or incorrect values (confusing <Katex tex="\tfrac{\pi}{6}" /> with{' '}
      <Katex tex="\tfrac{\pi}{3}" /> as the reference angle).
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [11, 10, 13, 66],
  average: 2.4,
  comment: (
    <>
      This question was well answered, including by students who made little progress in part
      a. Some students did not label the three key points as directed by the question or drew
      graphs with more than one cycle. Students who took care with shape, especially at
      endpoints, and who linked part a. of this question to part b. were generally successful.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="2\cos(x)+1 = 0 \implies \cos(x) = -\frac12" />,
    reason: (
      <>
        Get <Katex tex="\cos(x)" /> on its own first. The unit circle and the exact-value triangles tell you which angles
        give a particular value of <Katex tex="\cos(x)" />, so that is the form you need before you can use them.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{Reference angle: } \cos^{-1}\!\left(\tfrac12\right) = \frac{\pi}{3}" />,
    reason: (
      <>
        Ignore the minus sign for now and ask which acute angle has cosine <Katex tex="\tfrac12" />. It is{' '}
        <Katex tex="\tfrac{\pi}{3}" />: in the 30–60–90 triangle with hypotenuse 2, the side of length 1 is next to the{' '}
        <Katex tex="60^\circ" /> angle. The report names <Katex tex="\tfrac{\pi}{6}" /> as the common slip, but{' '}
        <Katex tex="\cos\left(\tfrac{\pi}{6}\right)=\tfrac{\sqrt3}{2}" />, not <Katex tex="\tfrac12" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\cos(x)<0 \implies x \text{ in the 2nd or 3rd quadrant}" />,
    reason: (
      <>
        Now the sign decides <em>where</em> the angle goes. <Katex tex="\cos(x)" /> is the horizontal coordinate of the
        point at angle <Katex tex="x" /> on the unit circle, so it is negative to the left of the vertical axis: quadrants 2
        and 3.
      </>
    ),
  },
  {
    working: <Katex display tex="x = \pi - \frac{\pi}{3} \ \text{ or } \ x = \pi + \frac{\pi}{3}" />,
    reason: (
      <>
        Place the reference angle either side of the negative horizontal axis (angle <Katex tex="\pi" />): back{' '}
        <Katex tex="\tfrac{\pi}{3}" /> for quadrant 2, forward <Katex tex="\tfrac{\pi}{3}" /> for quadrant 3. Both points
        have horizontal coordinate <Katex tex="-\tfrac12" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{x = \frac{2\pi}{3} \ \text{ or } \ x = \frac{4\pi}{3}}" />,
    reason: (
      <>
        Both lie inside <Katex tex="0\le x\le 2\pi" />, which is exactly one lap of the circle, so each quadrant is visited
        once and there are no others. Adding or subtracting <Katex tex="2\pi" /> only leaves the domain, which is the other
        slip the report mentions.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Amplitude } 2, \quad \text{period } \frac{2\pi}{1} = 2\pi" />,
    reason: (
      <>
        Read the transformations of <Katex tex="y=\cos(x)" /> off the rule before drawing anything. The 2 multiplies the
        output (it stretches the graph vertically), and nothing multiplies <Katex tex="x" />, so the period stays{' '}
        <Katex tex="2\pi" />. The domain <Katex tex="[0,2\pi]" /> is therefore exactly one cycle, and one cycle is all you
        draw.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} f(0) &= 2\cos(0)+1 = 3 \\ f(2\pi) &= 2\cos(2\pi)+1 = 3 \end{aligned}"
      />
    ),
    reason: (
      <>
        The two endpoints the question asks you to label. Draw both as closed dots, since the domain{' '}
        <Katex tex="[0,2\pi]" /> includes them. They are the highest points: <Katex tex="\cos(x)" /> is at its maximum of 1
        at <Katex tex="x=0" /> and <Katex tex="x=2\pi" />.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} &\cos(x) = -1 \text{ at } x=\pi \\ &f(\pi) = 2(-1)+1 = -1 \end{aligned}"
      />
    ),
    reason: (
      <>
        <Katex tex="f" /> is smallest where <Katex tex="\cos(x)" /> is smallest, which gives the local minimum, the third
        labelled point. Check: the curve swings 2 either side of the line <Katex tex="y=1" />, so the range is{' '}
        <Katex tex="[1-2,\,1+2] = [-1,3]" />.
      </>
    ),
  },
  {
    working: <Katex display tex="x\text{-intercepts: } x=\frac{2\pi}{3},\ \frac{4\pi}{3} \quad \text{(part a.)}" />,
    reason: (
      <>
        Part a. is not a separate question. The <Katex tex="x" />-intercepts are where <Katex tex="f(x)=0" />, which is
        exactly the equation you solved there. The report singles out students who linked the two parts as the ones who
        did well.
      </>
    ),
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={sketchSrc} alt="Graph of y = 2cos(x)+1 on [0, 2π]: starts at (0, 3), falls through the x-axis at 2π/3, reaches a minimum at (π, −1), rises back through 4π/3 and ends at (2π, 3)" className="w-full max-w-[420px]" />
      </div>
    ),
    reason: (
      <>
        One full cycle and no more, since the domain is exactly one period; the report notes graphs drawn with extra cycles.
        Take care that the curve leaves <Katex tex="(0,3)" /> and arrives at <Katex tex="(2\pi,3)" /> <em>flat</em>, not
        at a slant: <Katex tex="f'(x)=-2\sin(x)" /> is 0 at both endpoints, so the tangents there are horizontal.
      </>
    ),
  },
]

export default function MethodsQ3_2018Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (5 marks)</p>
        <p>
          Let <Katex tex="f:[0,2\pi]\to R,\ f(x)=2\cos(x)+1" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Trig Equation"
        marks={2}
        statement={<>Solve the equation <Katex tex="2\cos(x)+1=0" /> for <Katex tex="0\le x\le 2\pi" />.</>}
        examinerReport={EXAM_A}
      >
        <Background>
          <p>
            <Katex tex="\cos(x)" /> is the horizontal coordinate of the point at angle <Katex tex="x" /> on the unit
            circle. Solving <Katex tex="\cos(x)=k" /> is a two-step job. The reference angle comes from the{' '}
            <em>size</em> of the cosine, ignoring its sign: here{' '}
            <Katex tex="\cos^{-1}\!\left(\tfrac12\right)=\tfrac{\pi}{3}" />. The sign then tells you which quadrants to
            place it in. Keeping those two steps separate is what stops <Katex tex="\tfrac{\pi}{3}" /> and{' '}
            <Katex tex="\tfrac{\pi}{6}" /> getting swapped.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <Explore title="Why cos(x) = −½ has exactly two answers in [0, 2π]">
          <UnitCircleWidget />
        </Explore>
        <WrongMethod
          title="The reference angle is π/6, so x = 5π/6 or 7π/6"
          source="Examiner's report"
          working={<Katex display tex="2\cos\left(\tfrac{5\pi}{6}\right)+1 = 2\left(-\tfrac{\sqrt3}{2}\right)+1 = 1-\sqrt3 \ne 0" />}
        >
          <Katex tex="\tfrac{\pi}{6}" /> is the reference angle for <Katex tex="\tfrac{\sqrt3}{2}" />, not for{' '}
          <Katex tex="\tfrac12" />, so both answers put the point at horizontal coordinate{' '}
          <Katex tex="-\tfrac{\sqrt3}{2}\approx-0.87" /> instead of <Katex tex="-\tfrac12" />. Substituting back catches it
          in seconds: <Katex tex="1-\sqrt3\approx-0.73" />, not 0. To keep the two apart, sketch the 30–60–90 triangle
          with sides <Katex tex="1,\ \sqrt3,\ 2" />: cosine is adjacent over hypotenuse, and the side of length 1 is next
          to the <Katex tex="60^\circ" /> (<Katex tex="\tfrac{\pi}{3}" />) angle.
        </WrongMethod>
        <WrongMethod
          title="List the angles that solve cos(x) = −½ without checking the domain"
          source="Examiner's report"
          working={<Katex display tex="x = \pm\frac{2\pi}{3} \implies x = -\frac{2\pi}{3} \notin [0,2\pi]" />}
        >
          <Katex tex="-\tfrac{2\pi}{3}" /> does satisfy the equation, but it is outside the domain, and writing it instead
          of <Katex tex="-\tfrac{2\pi}{3}+2\pi=\tfrac{4\pi}{3}" /> loses the second answer that <em>is</em> in the domain.
          Finish every trig equation by checking each answer against the stated interval, and by counting: one lap from{' '}
          <Katex tex="0" /> to <Katex tex="2\pi" /> gives exactly two solutions of <Katex tex="\cos(x)=-\tfrac12" />.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Sketch Graph"
        marks={3}
        statement={
          <>
            <p className="mb-2">
              Sketch the graph of the function <Katex tex="f" /> on the axes below. Label the endpoints and local minimum
              point with their coordinates.
            </p>
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img
                src={blankAxesSrc}
                alt="Blank axes from the original 2018 VCAA exam paper: x from 0 to 2π marked every π/3, y from −2 to 4, grid squares of 1 unit"
                className="w-full max-w-[360px]"
              />
            </div>
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background>
          <p>
            For <Katex tex="y=a\cos(nx)+c" /> with <Katex tex="a, n>0" />: the amplitude is <Katex tex="a" />, the period
            is <Katex tex="\tfrac{2\pi}{n}" />, the curve oscillates about the line <Katex tex="y=c" />, and the range is{' '}
            <Katex tex="[c-a,\ c+a]" />. A number in front of <Katex tex="\cos" /> changes the heights; only a number
            multiplying <Katex tex="x" /> changes the period.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Explore title="Building 2cos(x) + 1 from cos(x), and why part a. gives the intercepts">
          <BuildGraphWidget />
        </Explore>
        <WrongMethod
          title="The 2 in 2cos(x) squeezes the wave, so draw two cycles"
          source="Examiner's report"
          working={<Katex display tex="2\cos(2x)+1=0 \implies x=\frac{\pi}{3},\ \frac{2\pi}{3},\ \frac{4\pi}{3},\ \frac{5\pi}{3}" />}
        >
          The report notes graphs drawn with more than one cycle. Reading <Katex tex="2\cos(x)" /> as{' '}
          <Katex tex="\cos(2x)" /> is one way to get there: that halves the period to <Katex tex="\pi" /> and fits two
          cycles into <Katex tex="[0,2\pi]" />, with minimums at <Katex tex="\tfrac{\pi}{2}" /> and{' '}
          <Katex tex="\tfrac{3\pi}{2}" /> instead of <Katex tex="\pi" />. The catch is part a.: that graph crosses the axis
          four times, but part a. found only two solutions. A 2 in front of <Katex tex="\cos" /> doubles the heights; only
          a 2 multiplying <Katex tex="x" /> squeezes the period.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
