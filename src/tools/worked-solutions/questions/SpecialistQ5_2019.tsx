// 2019 Specialist Mathematics — Exam 2, MCQ 5. VCAA examination report: 38% correct.
// Two rays from fixed points at given arguments intersect at (a, b); find b. Question text
// transcribed from the original paper. Solution is original.
// Extras: interactive (interactives/spec-2019-mcq5-slide-z.tsx) — drag z along the first ray (or
// freely) with both Arg angles drawn at the start points; they are π/4 and 5π/6 together only at
// (2 + √3, √3). A toggle shows the sign slip tan(5π/6) = +1/√3. WrongMethods: answering with x = a
// (option E, 21%), and that sign slip, which lands on (2 − √3, −√3) — y is option A, x is option B
// (both computed with sympy). No single slip was verified for B's 25% on its own, so it is only
// described as that point's x-coordinate.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import raysSrc from './spec-2019-mcq5-rays.png'

const SlideZ = lazyWidget(() => import('../interactives/spec-2019-mcq5-slide-z'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 25, C: 8, D: 38, E: 21 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      Intersection of <Katex tex="y = x-2,\ x>2" /> and{' '}
      <Katex tex="y-1 = -\dfrac{1}{\sqrt3}(x-5),\ x<5" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{Arg}(z-2) = \tfrac{\pi}{4}" />,
    reason: (
      <>
        <Katex tex="z-2" /> is the arrow from the point <Katex tex="2" /> to <Katex tex="z" />, so this says: the arrow from{' '}
        <Katex tex="(2,0)" /> to <Katex tex="z" /> points at angle <Katex tex="\tfrac{\pi}{4}" />. That is a ray starting at{' '}
        <Katex tex="(2,0)" />, with gradient <Katex tex="\tan\tfrac{\pi}{4}=1" />.
      </>
    ),
  },
  {
    working: <Katex display tex="y - 0 = 1\cdot(x-2) \;\implies\; y = x-2,\ \ x>2" />,
    reason: (
      <>
        Point–gradient form through <Katex tex="(2,0)" />. The direction <Katex tex="\tfrac{\pi}{4}" /> points up and to
        the right, so only <Katex tex="x>2" /> is on the ray. That already tells you <Katex tex="b>0" /> for any point on
        this ray, which rules out options <b>A</b> and <b>C</b> before any algebra.
      </>
    ),
  },
  {
    working: <Katex display tex="\mathrm{Arg}\big(z-(5+i)\big) = \tfrac{5\pi}{6}" />,
    reason: (
      <>
        In the same way, a ray from <Katex tex="(5,1)" /> at angle <Katex tex="\tfrac{5\pi}{6}" />. That angle is in the
        second quadrant, so the ray heads up and to the <em>left</em>: it climbs as <Katex tex="x" /> decreases, and its
        gradient <Katex tex="\tan\tfrac{5\pi}{6}=-\tfrac{1}{\sqrt3}" /> is negative.
      </>
    ),
  },
  {
    working: <Katex display tex="y - 1 = -\tfrac{1}{\sqrt3}(x-5),\ \ x<5" />,
    reason: <>Point–gradient form through <Katex tex="(5,1)" />; heading left means only <Katex tex="x<5" /> is on the ray.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} x-2-1 &= -\tfrac{1}{\sqrt3}(x-5) \\ \sqrt3(x-3) &= -(x-5) \\ x(\sqrt3+1) &= 5+3\sqrt3 \end{aligned}" />,
    reason: (
      <>
        The crossing point is on both rays, so it satisfies both equations. Substitute <Katex tex="y=x-2" /> into the
        second, multiply both sides by <Katex tex="\sqrt3" /> to clear the fraction, then collect the <Katex tex="x" />{' '}
        terms. (CAS <em>solve</em> on the two equations does the same.)
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} x &= \frac{5+3\sqrt3}{\sqrt3+1} \\ &= \frac{(5+3\sqrt3)(\sqrt3-1)}{2} = 2+\sqrt3 \end{aligned}" />,
    reason: (
      <>
        Rationalise with the conjugate, since <Katex tex="(\sqrt3+1)(\sqrt3-1)=2" />. Then check the point is on both{' '}
        <em>rays</em>, not just both lines: <Katex tex="x=2+\sqrt3\approx3.73" /> satisfies <Katex tex="x>2" /> and{' '}
        <Katex tex="x<5" />.
      </>
    ),
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async" src={raysSrc} alt="The ray from 2 at angle π/4 and the ray from 5 + i at angle 5π/6, each starting at an open circle, crossing at (2 + √3, √3) — this site's own explanatory figure" className="w-full max-w-[420px]" />
      </div>
    ),
    reason: (
      <>
        A sketch confirms it: the two rays really do cross, at <Katex tex="\left(2+\sqrt3,\ \sqrt3\right)" />, about{' '}
        <Katex tex="(3.7,\ 1.7)" />. The starting points are open circles, since <Katex tex="\mathrm{Arg}(0)" /> is
        undefined.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{b = y = x-2 = \sqrt3}" />,
    reason: (
      <>
        The point is <Katex tex="(a,b)" />, so <Katex tex="b" /> is the <Katex tex="y" />-coordinate (the imaginary part of{' '}
        <Katex tex="z" />). Matches option <b>D</b>. Option <b>E</b>, <Katex tex="2+\sqrt3" />, is <Katex tex="a" />, the{' '}
        <Katex tex="x" />-coordinate.
      </>
    ),
  },
]

export default function SpecialistQ5_2019() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="z=x+yi" />, where <Katex tex="x,y\in R" />. The rays{' '}
          <Katex tex="\mathrm{Arg}(z-2) = \tfrac{\pi}{4}" /> and{' '}
          <Katex tex="\mathrm{Arg}\big(z-(5+i)\big) = \tfrac{5\pi}{6}" />, where <Katex tex="z\in C" />, intersect on
          the complex plane at a point <Katex tex="(a,b)" />.
          <br />
          The value of <Katex tex="b" /> is
        </p>
      }
      background={
        <Background title="Arg(z − z₁) = θ is a ray from z₁">
          <p>
            <Katex tex="z-z_1" /> is the arrow from the point <Katex tex="z_1" /> to the point <Katex tex="z" />. So{' '}
            <Katex tex="\mathrm{Arg}(z-z_1)=\theta" /> says the direction from <Katex tex="z_1" /> to <Katex tex="z" /> is{' '}
            <Katex tex="\theta" />: the points satisfying it form a half-line (ray) starting at <Katex tex="z_1" /> and
            heading off at angle <Katex tex="\theta" /> to the positive real direction. The start point itself is excluded
            (an open circle), because <Katex tex="\mathrm{Arg}(0)" /> is undefined.
          </p>
          <p>
            In Cartesian form it is the line through <Katex tex="z_1" /> with gradient <Katex tex="\tan\theta" />, plus a
            restriction saying which half: <Katex tex="x" /> greater than the start if <Katex tex="\theta" /> points right,
            less if it points left.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="-\sqrt3" /> },
        { letter: 'B', content: <Katex tex="2-\sqrt3" /> },
        { letter: 'C', content: <Katex tex="0" /> },
        { letter: 'D', content: <Katex tex="\sqrt3" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="2+\sqrt3" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="Each Arg condition fixes the direction from a start point to z">
            <SlideZ />
          </Explore>
          <WrongMethod
            title="Solve for the crossing point, and the answer is the x I just found"
            source="21% chose E"
            working={
              <>
                <Katex display tex="x(\sqrt3+1) = 5+3\sqrt3" />
                <Katex display tex="\implies x = 2+\sqrt3 \quad \text{(option E)}" />
              </>
            }
          >
            <p>
              Solving by substituting <Katex tex="y=x-2" /> gives <Katex tex="x" /> first, and it is tempting to stop there.
              But <Katex tex="x" /> is <Katex tex="a" />; the question wants <Katex tex="b" />, the <Katex tex="y" />
              -coordinate, which needs one more line: <Katex tex="b=x-2=\sqrt3" />. A quick check catches it: if{' '}
              <Katex tex="b" /> were <Katex tex="2+\sqrt3" />, the point on the first ray would have{' '}
              <Katex tex="x=b+2\approx5.73" />, which is not less than <Katex tex="5" />, so it can&apos;t be on the second
              ray.
            </p>
          </WrongMethod>
          <WrongMethod
            title="The gradient of the second ray is tan(5π/6) = 1/√3"
            source="8% chose A"
            working={
              <>
                <Katex display tex="x-3 = \tfrac{1}{\sqrt3}(x-5) \implies x = 2-\sqrt3" />
                <Katex display tex="y = x-2 = -\sqrt3 \quad \text{(option A)}" />
              </>
            }
          >
            <p>
              <Katex tex="\tfrac{5\pi}{6}" /> is in the second quadrant, where tangent is negative:{' '}
              <Katex tex="\tan\tfrac{5\pi}{6}=-\tan\tfrac{\pi}{6}=-\tfrac{1}{\sqrt3}" />. With the sign dropped, the line meets{' '}
              <Katex tex="y=x-2" /> at <Katex tex="\left(2-\sqrt3,\ -\sqrt3\right)" /> (whose <Katex tex="x" />-coordinate is
              option <b>B</b>). That point has <Katex tex="x<2" />, so it is on the backward extension of{' '}
              <Katex tex="y=x-2" />, not on the ray: there <Katex tex="\mathrm{Arg}(z-2)=-\tfrac{3\pi}{4}" />. Checking the
              ray restrictions (<Katex tex="x>2" />, <Katex tex="x<5" />), or simply noticing that the first ray has{' '}
              <Katex tex="y>0" />, catches it.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
