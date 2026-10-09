// 2021 Specialist Mathematics — Exam 1 Question 9 (8 marks). Two parametric paths, the
// ellipse one of them traces, where they collide, and an area under the ellipse's upper
// arc. Question text transcribed from the original paper; the figure is a crop of VCAA's
// own artwork. Answers checked with sympy and against the VCAA examination report.
// Solution is original. Interactive: c.ii has spec-2021e1-q9cii-sector-triangle (c.i's antiderivative
// as a sector plus a triangle, so the triangles cancel at the two limits). c.i (15% full marks) has
// none: it is a pure-algebra "show that", where students lost marks for missed steps.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import regionSrc from './spec-2021e1-q9c-region.png'

const SectorTriangle = lazyWidget(() => import('../interactives/spec-2021e1-q9cii-sector-triangle'))

const EXAM_AI: SAExaminerStats = {
  marks: [17, 83],
  average: 0.9,
  comment: (
    <>
      This "show that" question was answered very well. Students were very comfortable
      identifying <Katex tex="x=-1+4\cos(t)" />,{' '}
      <Katex tex="y=\tfrac{2}{\sqrt3}\sin(t)" /> and using the trigonometric identity{' '}
      <Katex tex="\sin^2(\theta)+\cos^2(\theta)=1" /> to obtain the required result.
    </>
  ),
}

const EXAM_AII: SAExaminerStats = {
  marks: [59, 41],
  average: 0.4,
  comment: (
    <>
      A common error was for students to neglect to justify the choice of sign for the path
      of the particle in the first quadrant.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [38, 62],
  average: 0.6,
  comment: (
    <>
      This question was answered well, with most students correctly showing that the{' '}
      <Katex tex="x" /> components and <Katex tex="y" /> components of both particles
      coincided when <Katex tex="\cos(t)=\tfrac{\sqrt3}{2}" />.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [48, 52],
  average: 0.5,
  comment: (
    <>
      This question was answered well by students who were successful in answering the
      previous part. Some students mistakenly gave the point of the collision as{' '}
      <Katex tex="\left(\tfrac\pi6,\tfrac{1}{\sqrt3}\right)" />, confusing the parameter{' '}
      <Katex tex="t" /> with the <Katex tex="x" />-value of the point of collision.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [42, 43, 15],
  average: 0.7,
  comment: (
    <>
      It was necessary to use the product and chain rules as appropriate and then simplify
      to obtain the required result. For example:
      <Katex
        display
        tex="\begin{aligned}&\frac{d}{dx}\Bigl(8\arcsin\left(\frac{x+1}{4}\right)\\&\qquad+\frac{(x+1)\sqrt{-x^2-2x+15}}{2}\Bigr)\\&=\frac84\cdot\frac{1}{\sqrt{1-\left(\frac{x+1}{4}\right)^2}}+\frac12\sqrt{-x^2-2x+15}\\&\qquad+\frac{\frac12(x+1)\cdot\frac12(-2x-2)}{\sqrt{-x^2-2x+15}}\\&=8\cdot\frac{1}{\sqrt{-x^2-2x+15}}+\frac12\sqrt{-x^2-2x+15}\\&\qquad-\frac12\,\frac{x^2+2x+1}{\sqrt{-x^2-2x+15}}\\&=\frac12\sqrt{-x^2-2x+15}-\frac12\,\frac{x^2+2x-15}{\sqrt{-x^2-2x+15}}\\&=\sqrt{-x^2-2x+15}\end{aligned}"
      />
      Students are reminded that in a 'show that' question, sufficient evidence must be
      presented in order for full marks to be awarded. Many students missed steps or made
      algebraic errors in their working.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [32, 46, 22],
  average: 0.9,
  comment: (
    <>
      A majority of students realised that the result of Question 9ci. should be used:
      <Katex
        display
        tex="\begin{aligned}&\frac{\sqrt3}{6}\Bigl[8\arcsin\left(\frac{x+1}{4}\right)\\&\qquad+\frac{(x+1)\sqrt{-x^2-2x+15}}{2}\Bigr]_1^{2\sqrt3-1}\\&=\frac{\sqrt3}{6}\Bigl(8\arcsin\left(\frac{\sqrt3}{2}\right)\\&\qquad+\sqrt3\sqrt{-\left(12-4\sqrt3+1\right)-2\left(2\sqrt3-1\right)+15}\\&\qquad-8\arcsin\left(\frac12\right)-\sqrt{12}\Bigr)\\&=\frac{\sqrt3}{6}\left(\frac{8\pi}{3}+\sqrt{12}-\frac{8\pi}{6}-\sqrt{12}\right)\\&=\frac{\sqrt3}{6}\left(\frac{16\pi}{6}-\frac{8\pi}{6}\right)\\&=\frac{8\sqrt3\pi}{36}=\frac{2\sqrt3\pi}{9}\end{aligned}"
      />
      Many found the resulting arithmetic to be challenging and were unable to arrive at the
      correct answer.
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="x = -1+4\cos(t) \implies \cos(t) = \frac{x+1}{4}" />,
    reason: <>A cartesian equation links <Katex tex="x" /> and <Katex tex="y" /> with no <Katex tex="t" />, so <Katex tex="t" /> must be eliminated. The <Katex tex="\underset{\sim}{i}" /> component of <Katex tex="\underset{\sim}{r}(t)" /> is <Katex tex="x" />, and it contains <Katex tex="t" /> only through <Katex tex="\cos(t)" />, so make <Katex tex="\cos(t)" /> the subject.</>,
  },
  {
    working: <Katex display tex="y = \frac{2}{\sqrt3}\sin(t) \implies \sin(t) = \frac{\sqrt3\,y}{2}" />,
    reason: <>Same for the <Katex tex="\underset{\sim}{j}" /> component: multiply both sides by <Katex tex="\tfrac{\sqrt3}{2}" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\cos^2(t)+\sin^2(t) = 1\\ \implies &\left(\frac{x+1}{4}\right)^2+\left(\frac{\sqrt3\,y}{2}\right)^2 = 1\end{aligned}" />,
    reason: <>With <Katex tex="\cos(t)" /> and <Katex tex="\sin(t)" /> each written in terms of <Katex tex="x" /> or <Katex tex="y" />, the Pythagorean identity removes <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{(x+1)^2}{16}+\frac{3y^2}{4} = 1}" />,
    reason: <><Katex tex="\left(\tfrac{\sqrt3y}{2}\right)^2=\tfrac{3y^2}{4}" />. An ellipse centred at <Katex tex="(-1,0)" />. As required.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{3y^2}{4} = 1-\frac{(x+1)^2}{16}" />,
    reason: <>Start from part a.i. and make the <Katex tex="y^2" /> term the subject.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}12y^2 &= 16-(x+1)^2\\ &= 16-x^2-2x-1 = -x^2-2x+15\end{aligned}" />,
    reason: <>Multiplying both sides by 16 (<Katex tex="16\times\tfrac{3y^2}{4}=12y^2" />), then expanding <Katex tex="(x+1)^2=x^2+2x+1" />.</>,
  },
  {
    working: <Katex display tex="y^2 = \frac{-x^2-2x+15}{12} \implies y = \pm\frac{\sqrt{-x^2-2x+15}}{2\sqrt3}" />,
    reason: <>Dividing by 12 and taking the square root, with <Katex tex="\sqrt{12}=2\sqrt3" />. A square root gives two signs, so a reason is needed to keep only one.</>,
  },
  {
    working: <Katex display tex="\text{first quadrant} \implies y\ge 0, \text{ so take the positive root}" />,
    reason: <>The first quadrant is on or above the <Katex tex="x" />-axis, so <Katex tex="y" /> cannot be negative. Write this reason down: the report says a common error was not justifying the choice of sign.</>,
  },
  {
    working: <Katex display tex="\boxed{y = \frac{\sqrt3}{6}\sqrt{-x^2-2x+15}}" />,
    reason: <>Rationalising: <Katex tex="\tfrac{1}{2\sqrt3}=\tfrac{\sqrt3}{2\sqrt3\cdot\sqrt3}=\tfrac{\sqrt3}{6}" />. As required.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}\underset{\sim}{i}: \ -1+4\cos(t) &= 3\sec(t)-1\\ 4\cos(t) &= \frac{3}{\cos(t)}\end{aligned}" />,
    reason: <>Two particles collide when they are at the same point at the <em>same</em> time, so set the <Katex tex="\underset{\sim}{i}" /> components equal and the <Katex tex="\underset{\sim}{j}" /> components equal, using one <Katex tex="t" />. Here the <Katex tex="-1" /> cancels from both sides, and <Katex tex="\sec(t)=\tfrac{1}{\cos(t)}" />.</>,
  },
  {
    working: <Katex display tex="4\cos^2(t) = 3 \implies \cos(t) = \pm\frac{\sqrt3}{2}" />,
    reason: <>Multiplying both sides by <Katex tex="\cos(t)" />, which is not zero because <Katex tex="\sec(t)" /> must be defined. The <Katex tex="x" /> coordinates agree only at these times.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{j}: \ \frac{2}{\sqrt3}\sin(t) = \tan(t) = \frac{\sin(t)}{\cos(t)}" />,
    reason: <>Now the <Katex tex="y" /> coordinates, using <Katex tex="\tan(t)=\tfrac{\sin(t)}{\cos(t)}" />.</>,
  },
  {
    working: <Katex display tex="\sin(t)\left(\frac{2}{\sqrt3}-\frac{1}{\cos(t)}\right) = 0" />,
    reason: <>Move everything to one side and factorise out <Katex tex="\sin(t)" />. Don&apos;t divide by <Katex tex="\sin(t)" />: that would lose any solution with <Katex tex="\sin(t)=0" />.</>,
  },
  {
    working: <Katex display tex="\sin(t) = 0 \ \text{ or } \ \cos(t) = \frac{\sqrt3}{2}" />,
    reason: <>If <Katex tex="\sin(t)=0" /> then <Katex tex="\cos(t)=\pm1" />, so <Katex tex="4\cos^2(t)=4\ne3" /> and the <Katex tex="x" /> coordinates don&apos;t match: reject it. Of the two values from the <Katex tex="x" /> coordinates, only <Katex tex="\cos(t)=\tfrac{\sqrt3}{2}" /> also makes the <Katex tex="y" /> coordinates match.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered}\text{both components agree}\\ \text{when } \cos(t) = \tfrac{\sqrt3}{2}\ \left(t=\tfrac\pi6\right),\\ \text{so the particles collide}\end{gathered}}" />,
    reason: <>At <Katex tex="t=\tfrac\pi6" /> both particles are at the same point at the same moment, which is exactly what a collision is. As required.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\cos(t) = \frac{\sqrt3}{2} \implies t = \frac{\pi}{6}" />,
    reason: <>Particle <Katex tex="B" />&apos;s position uses <Katex tex="\sec(t)" /> and <Katex tex="\tan(t)" />, which are undefined at <Katex tex="t=\tfrac\pi2" />, so its motion from <Katex tex="t=0" /> must stop before <Katex tex="\tfrac\pi2" />. The only solution in that interval is <Katex tex="t=\tfrac\pi6" />.</>,
  },
  {
    working: <Katex display tex="x = -1+4\cos\!\left(\frac\pi6\right) = -1+4\cdot\frac{\sqrt3}{2} = -1+2\sqrt3" />,
    reason: <><Katex tex="t=\tfrac\pi6" /> is a time, not a coordinate: substitute it into particle <Katex tex="A" />&apos;s position to get the point. The report notes some students gave <Katex tex="\tfrac\pi6" /> as the <Katex tex="x" />-value.</>,
  },
  {
    working: <Katex display tex="y = \frac{2}{\sqrt3}\sin\!\left(\frac\pi6\right) = \frac{2}{\sqrt3}\cdot\frac12 = \frac{1}{\sqrt3} = \frac{\sqrt3}{3}" />,
    reason: <>Check with particle <Katex tex="B" />: <Katex tex="3\sec\left(\tfrac\pi6\right)-1=\tfrac{6}{\sqrt3}-1=2\sqrt3-1" /> and <Katex tex="\tan\left(\tfrac\pi6\right)=\tfrac{1}{\sqrt3}" />, the same point.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(-1+2\sqrt3,\ \tfrac{\sqrt3}{3}\right)}" />,
    reason: <>The answer is a point <Katex tex="(x,y)" />, about <Katex tex="(2.46,0.58)" />.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{d}{dx}\left[8\arcsin\!\left(\frac{x+1}{4}\right)\right] = \frac{8\cdot\tfrac14}{\sqrt{1-\left(\tfrac{x+1}{4}\right)^2}}" />,
    reason: <>Differentiate the two terms separately. For the first, use the formula-sheet derivative of <Katex tex="\arcsin" /> with the chain rule: <Katex tex="\tfrac{d}{dx}\arcsin(u)=\tfrac{u'}{\sqrt{1-u^2}}" />, where <Katex tex="u=\tfrac{x+1}{4}" /> and <Katex tex="u'=\tfrac14" />.</>,
  },
  {
    working: <Katex display tex="= \frac{2}{\sqrt{\dfrac{16-(x+1)^2}{16}}} = \frac{2}{\tfrac14\sqrt{16-(x+1)^2}}" />,
    reason: <><Katex tex="8\times\tfrac14=2" />. Under the root, write 1 as <Katex tex="\tfrac{16}{16}" /> to combine into one fraction; then <Katex tex="\sqrt{16}=4" /> comes out of the root as <Katex tex="\tfrac14" />.</>,
  },
  {
    working: <Katex display tex="= \frac{8}{\sqrt{16-(x+1)^2}} = \frac{8}{\sqrt{-x^2-2x+15}}" />,
    reason: <><Katex tex="2\div\tfrac14=8" />, and <Katex tex="16-(x+1)^2=-x^2-2x+15" /> (expanded in part a.ii.).</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}&\frac{d}{dx}\left[\frac{(x+1)\sqrt{-x^2-2x+15}}{2}\right]\\&= \frac{\sqrt{-x^2-2x+15}}{2}+\frac{(x+1)(-2x-2)}{4\sqrt{-x^2-2x+15}}\end{aligned}"
      />
    ),
    reason: <>Product rule on <Katex tex="\tfrac{x+1}{2}" /> times <Katex tex="\sqrt{-x^2-2x+15}" />. The derivative of <Katex tex="\tfrac{x+1}{2}" /> is <Katex tex="\tfrac12" />. By the chain rule, the derivative of <Katex tex="\sqrt{-x^2-2x+15}" /> is <Katex tex="\tfrac{-2x-2}{2\sqrt{-x^2-2x+15}}" />, which is then multiplied by <Katex tex="\tfrac{x+1}{2}" />.</>,
  },
  {
    working: <Katex display tex="= \frac{\sqrt{-x^2-2x+15}}{2}-\frac{(x+1)^2}{2\sqrt{-x^2-2x+15}}" />,
    reason: <><Katex tex="-2x-2=-2(x+1)" />, so the numerator is <Katex tex="-2(x+1)^2" />, and <Katex tex="\tfrac{-2}{4}=-\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="\text{total} = \frac{16-(x+1)^2+\left(-x^2-2x+15\right)}{2\sqrt{-x^2-2x+15}}" />,
    reason: <>Add all three pieces over the common denominator <Katex tex="2\sqrt{-x^2-2x+15}" />. Writing <Katex tex="\sqrt{\cdots}" /> for that root: <Katex tex="\tfrac{8}{\sqrt{\cdots}}=\tfrac{16}{2\sqrt{\cdots}}" />, and <Katex tex="\tfrac{\sqrt{\cdots}}{2}=\tfrac{-x^2-2x+15}{2\sqrt{\cdots}}" /> (multiply top and bottom by the root).</>,
  },
  {
    working: <Katex display tex="= \frac{2\left(-x^2-2x+15\right)}{2\sqrt{-x^2-2x+15}} = \boxed{\sqrt{-x^2-2x+15}}" />,
    reason: <>Since <Katex tex="16-(x+1)^2=-x^2-2x+15" />, the numerator is twice <Katex tex="-x^2-2x+15" />. Cancel the 2s; a quantity divided by its own square root is the square root. This is a "show that", so every one of these lines needs to be written: the report says many students missed steps. As required.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="A = \int_1^{2\sqrt3-1}\frac{\sqrt3}{6}\sqrt{-x^2-2x+15}\,dx" />,
    reason: <>The curve is on or above the <Katex tex="x" />-axis (<Katex tex="y\ge0" />) for the whole strip, so the area is the definite integral of <Katex tex="y" /> from <Katex tex="x=1" /> to <Katex tex="x=2\sqrt3-1" />, with no splitting needed.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}= \frac{\sqrt3}{6}\Bigg[&8\arcsin\!\left(\frac{x+1}{4}\right)\\ &+\frac{(x+1)\sqrt{-x^2-2x+15}}{2}\Bigg]_1^{2\sqrt3-1}\end{aligned}" />,
    reason: <>"Hence" points to part c.i.: the bracketed expression has derivative <Katex tex="\sqrt{-x^2-2x+15}" />, so it is an antiderivative of <Katex tex="\sqrt{-x^2-2x+15}" />. The constant <Katex tex="\tfrac{\sqrt3}{6}" /> stays out in front.</>,
  },
  {
    working: <Katex display tex="x = 2\sqrt3-1: \quad x+1 = 2\sqrt3, \quad \frac{x+1}{4} = \frac{\sqrt3}{2}" />,
    reason: <>Work with <Katex tex="x+1" /> rather than <Katex tex="x" />: every part of the antiderivative depends on <Katex tex="x" /> only through <Katex tex="x+1" />.</>,
  },
  {
    working: <Katex display tex="-x^2-2x+15 = 16-(x+1)^2 = 16-\left(2\sqrt3\right)^2 = 4" />,
    reason: <>Using <Katex tex="-x^2-2x+15=16-(x+1)^2" /> (part a.ii.) avoids expanding <Katex tex="\left(2\sqrt3-1\right)^2" />: the report says many students found this arithmetic challenging.</>,
  },
  {
    working: <Katex display tex="\text{upper} = 8\cdot\frac\pi3+\frac{2\sqrt3\cdot2}{2} = \frac{8\pi}{3}+2\sqrt3" />,
    reason: <><Katex tex="\arcsin\!\left(\tfrac{\sqrt3}{2}\right)=\tfrac\pi3" /> and <Katex tex="\sqrt4=2" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}x = 1: \quad &x+1 = 2, \quad \frac{x+1}{4} = \frac12,\\ &16-(x+1)^2 = 12\end{aligned}" />,
    reason: <>The same shortcut: <Katex tex="16-2^2=12" />, and <Katex tex="\sqrt{12}=2\sqrt3" />.</>,
  },
  {
    working: <Katex display tex="\text{lower} = 8\cdot\frac\pi6+\frac{2\cdot2\sqrt3}{2} = \frac{4\pi}{3}+2\sqrt3" />,
    reason: <><Katex tex="\arcsin\!\left(\tfrac12\right)=\tfrac\pi6" />.</>,
  },
  {
    working: <Katex display tex="\text{upper}-\text{lower} = \frac{8\pi}{3}-\frac{4\pi}{3} = \frac{4\pi}{3}" />,
    reason: <>The <Katex tex="2\sqrt3" /> terms cancel exactly, a good sign the arithmetic is right. They cancel because each is the area of a triangle, and the two triangles have the same area.</>,
    more: <>The interactive below shows why.</>,
  },
  {
    working: <Katex display tex="\boxed{A = \frac{\sqrt3}{6}\cdot\frac{4\pi}{3} = \frac{2\sqrt3\,\pi}{9}}" />,
    reason: <>In the required form with <Katex tex="a=2" /> and <Katex tex="b=9" />; about 1.209 square units, which fits the diagram: the region is about 1.46 units wide and between 0.58 and 1 unit tall.</>,
  },
]

export default function SpecialistQ9_2021Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 9 (8 marks)</p>
        <p>
          Let{' '}
          <Katex tex="\underset{\sim}{r}(t)=\bigl(-1+4\cos(t)\bigr)\underset{\sim}{i}+\tfrac{2}{\sqrt3}\sin(t)\,\underset{\sim}{j}" />{' '}
          and{' '}
          <Katex tex="\underset{\sim}{s}(t)=\bigl(3\sec(t)-1\bigr)\underset{\sim}{i}+\tan(t)\,\underset{\sim}{j}" />{' '}
          be the position vectors relative to a fixed point <Katex tex="O" /> of particle{' '}
          <Katex tex="A" /> and particle <Katex tex="B" /> respectively for{' '}
          <Katex tex="0\le t\le c" />, where <Katex tex="c" /> is a positive real constant.
        </p>
      </div>

      <PartCard
        letter="a.i"
        topic="Cartesian Equation"
        marks={1}
        statement={
          <>
            Show that the cartesian equation of the path of particle <Katex tex="A" /> is{' '}
            <Katex tex="\dfrac{(x+1)^2}{16}+\dfrac{3y^2}{4}=1" />.
          </>
        }
        examinerReport={EXAM_AI}
      >
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Cartesian Equation"
        marks={1}
        statement={
          <>
            Show that the cartesian equation of the path of particle <Katex tex="A" /> in the
            first quadrant can be written as{' '}
            <Katex tex="y=\dfrac{\sqrt3}{6}\sqrt{-x^2-2x+15}" />.
          </>
        }
        examinerReport={EXAM_AII}
      >
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <PartCard
        letter="b.i"
        topic="Collision"
        marks={1}
        statement={
          <>
            Show that the particles <Katex tex="A" /> and <Katex tex="B" /> will collide.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Collision Point"
        marks={1}
        statement={
          <>
            Hence, find the coordinates of the point of collision of the two particles.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="c.i"
        topic="Derivative Identity"
        marks={2}
        statement={
          <>
            Show that{' '}
            <Katex tex="\dfrac{d}{dx}\!\left(8\arcsin\!\left(\dfrac{x+1}{4}\right)+\dfrac{(x+1)\sqrt{-x^2-2x+15}}{2}\right)=\sqrt{-x^2-2x+15}" />
            .
          </>
        }
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Area Under Curve"
        marks={2}
        statement={
          <div className="flex flex-col gap-3">
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img
                src={regionSrc}
                alt="A quarter-ellipse arc falling from about y = 1.1 at x = −1 to the x-axis at x = 3, with the region under it between the vertical lines x = 1 and x = 2√3 − 1 shaded — from the original 2021 VCAA exam paper"
                className="w-full max-w-[380px]"
              />
            </div>
            <p>
            Hence, find the area bounded by the graph of{' '}
            <Katex tex="y=\dfrac{\sqrt3}{6}\sqrt{-x^2-2x+15}" />, the <Katex tex="x" />-axis
            and the lines <Katex tex="x=1" /> and <Katex tex="x=2\sqrt3-1" />, as shown in
            the diagram above. Give your answer in the form{' '}
            <Katex tex="\dfrac{a\sqrt3\,\pi}{b}" />, where <Katex tex="a" /> and{' '}
            <Katex tex="b" /> are positive integers.
            </p>
          </div>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
        <Explore title="Why the 2√3 terms cancel: each limit is a sector plus a triangle">
          <SectorTriangle />
        </Explore>
      </PartCard>
    </div>
  )
}
