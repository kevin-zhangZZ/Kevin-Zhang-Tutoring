// 2023 Specialist Mathematics — Exam 1 Question 3 (3 marks). Velocity as a function of
// displacement, so acceleration is v dv/dx; then a limit at infinity. Question text
// transcribed from the original paper. Answers checked with sympy and against the VCAA
// examination report. Solution is original.
// Widget (part a, 35% full marks): interactives/spec-2023e1-q3a-per-metre.tsx — dv/dx is the
// velocity change per metre; scaling the gradient triangle by v gives the change per second, a.
// Oct 2026 Concise/Detailed review: the trap (stopping at dv/dx), the report's alternative methods
// and its "0 or infinity" comment now sit in rows' `more` (Detailed); widget slider capped at x = 2.5
// so its triangles stay readable and their labels never collide. Final review: Background trimmed to
// the three forms (the per-metre trap lives in row 3, with the units argument in its `more`); part b's
// leading-terms check moved to `more`.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const PerMetre = lazyWidget(() => import('../interactives/spec-2023e1-q3a-per-metre'))

const EXAM_A: SAExaminerStats = {
  marks: [44, 21, 35],
  average: 0.9,
  comment: (
    <>
      A smaller number of students evaluated{' '}
      <Katex tex="\tfrac{d}{dx}\!\left(\tfrac12v^2\right)" /> when <Katex tex="x=2" /> to
      obtain the same result.
      <br />
      A large number of students evaluated <Katex tex="\tfrac{dv}{dx}" /> at{' '}
      <Katex tex="x=2" /> and proceeded no further.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [50, 50],
  average: 0.5,
  comment: (
    <>
      Some students separated the fraction to find the limit:
      <br />
      <Katex tex="\tfrac{3x+2}{2x-1}=\tfrac32+\tfrac{7}{2(2x-1)}" />
      <br />
      Other students divided both the numerator and denominator by <Katex tex="x" /> to find
      the limit. Many students wrote for their answer 0 or <Katex tex="\infty" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="a = v\frac{dv}{dx}" />,
    reason: <>Velocity is given in terms of <Katex tex="x" />, not <Katex tex="t" />, so use this form of acceleration. It comes from the chain rule: <Katex tex="a=\tfrac{dv}{dt}=\tfrac{dv}{dx}\cdot\tfrac{dx}{dt}" />, and <Katex tex="\tfrac{dx}{dt}=v" />.</>,
  },
  {
    working: <Katex display tex="\frac{dv}{dx} = \frac{3(2x-1)-2(3x+2)}{(2x-1)^2}" />,
    reason: <>Quotient rule: (derivative of top × bottom − top × derivative of bottom) ÷ bottom². The top, <Katex tex="3x+2" />, has derivative 3; the bottom, <Katex tex="2x-1" />, has derivative 2.</>,
  },
  {
    working: <Katex display tex="= \frac{6x-3-6x-4}{(2x-1)^2} = \frac{-7}{(2x-1)^2}" />,
    reason: <>Expand the numerator; the <Katex tex="6x" /> terms cancel. At <Katex tex="x=2" /> this is <Katex tex="-\tfrac79" />, but that is the change in velocity per metre, not per second. It is not yet the acceleration, so keep going.</>,
    more: <>This is where the report says a large number of students stopped. To turn &ldquo;per metre&rdquo; into &ldquo;per second&rdquo;, multiply by the number of metres the particle covers each second, which is <Katex tex="v" />: (<Katex tex="\mathrm{m\,s^{-1}}" /> per metre) × (metres per second) = <Katex tex="\mathrm{m\,s^{-1}}" /> per second. That is exactly what <Katex tex="a=v\tfrac{dv}{dx}" /> does; the diagram below shows it as the orange triangle scaled up by <Katex tex="v" />.</>,
  },
  {
    working: <Katex display tex="a = \frac{3x+2}{2x-1}\cdot\frac{-7}{(2x-1)^2}" />,
    reason: <>Substitute <Katex tex="v" /> and <Katex tex="\tfrac{dv}{dx}" /> into <Katex tex="a=v\tfrac{dv}{dx}" />.</>,
  },
  {
    working: <Katex display tex="x=2: \quad a = \frac{8}{3}\cdot\frac{-7}{9}" />,
    reason: <><Katex tex="3(2)+2=8" />, <Katex tex="2(2)-1=3" />, and <Katex tex="3^2=9" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a = -\frac{56}{27} \ \mathrm{m\,s^{-2}}}" />,
    reason: <>About <Katex tex="-2.07" />. It is negative because <Katex tex="v>0" /> but <Katex tex="\tfrac{dv}{dx}<0" />: the particle is moving in the positive direction and slowing down.</>,
    more: <>The report notes a smaller number of students used the other form, <Katex tex="a=\tfrac{d}{dx}\!\left(\tfrac12v^2\right)" />. By the chain rule, differentiating <Katex tex="\tfrac12v^2" /> with respect to <Katex tex="x" /> gives <Katex tex="v\tfrac{dv}{dx}" />, the same expression as above, so it leads to the same <Katex tex="-\tfrac{56}{27}" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\lim_{x\to\infty}\frac{3x+2}{2x-1}" />,
    reason: <>As <Katex tex="x" /> becomes very large, the numerator and the denominator both grow without bound, so looking at either one alone tells you nothing. You need to compare how fast they grow.</>,
    more: <>So neither &ldquo;the top goes to infinity, so <Katex tex="v\to\infty" />&rdquo; nor &ldquo;the bottom goes to infinity, so <Katex tex="v\to0" />&rdquo; is right, and those two lines of thinking lead to exactly the answers, <Katex tex="\infty" /> and 0, that the report says many students wrote. Try a large value: at <Katex tex="x=1000" />, <Katex tex="v=\tfrac{3002}{1999}\approx1.502" />, neither huge nor close to 0.</>,
  },
  {
    working: <Katex display tex="\frac{3x+2}{2x-1} = \frac{3+\tfrac2x}{2-\tfrac1x}" />,
    reason: <>To compare them, divide every term in the numerator and the denominator by <Katex tex="x" />, the highest power of <Katex tex="x" />. This doesn&apos;t change the fraction&apos;s value, but now each piece is either a constant or shrinks to 0.</>,
  },
  {
    working: <Katex display tex="\frac2x\to0 \ \text{ and } \ \frac1x\to0" />,
    reason: <>A fixed number divided by an ever-larger <Katex tex="x" /> gets ever closer to 0.</>,
  },
  {
    working: <Katex display tex="v \to \frac{3+0}{2-0}" />,
    reason: <>Replace each vanishing piece by 0.</>,
  },
  {
    working: <Katex display tex="\boxed{v \to \frac32 \ \mathrm{m\,s^{-1}}}" />,
    reason: <>As <Katex tex="x" /> grows, the velocity gets closer and closer to <Katex tex="1.5\ \mathrm{m\,s^{-1}}" />.</>,
    more: <>A quick check: for large <Katex tex="x" /> the fraction behaves like the ratio of the leading terms, <Katex tex="\tfrac{3x}{2x}=\tfrac32" />. The report also shows another method: split the fraction, <Katex tex="v=\tfrac32+\tfrac{7}{2(2x-1)}" />. The second term is positive and shrinks to 0, so the velocity stays above <Katex tex="1.5\ \mathrm{m\,s^{-1}}" /> and comes down towards it, consistent with the particle slowing down in part a.</>,
  },
]

export default function SpecialistQ3_2023Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (3 marks)</p>
        <p>
          A particle moves along a straight line. When the particle is <Katex tex="x" /> m
          from a fixed point <Katex tex="O" />, its velocity, <Katex tex="v" />{' '}
          <Katex tex="\mathrm{m\,s^{-1}}" />, is given by
        </p>
        <Katex display tex="v=\frac{3x+2}{2x-1}, \ \text{where } x\ge1." />
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Acceleration has three equivalent forms:{' '}
              <Katex tex="\tfrac{dv}{dt}" />, <Katex tex="v\tfrac{dv}{dx}" /> and{' '}
              <Katex tex="\tfrac{d}{dx}\!\left(\tfrac12v^2\right)" />. Use{' '}
              <Katex tex="\tfrac{dv}{dt}" /> when <Katex tex="v" /> is given in terms of{' '}
              <Katex tex="t" />, and either of the other two when <Katex tex="v" /> is given in
              terms of <Katex tex="x" />.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Acceleration"
        marks={2}
        statement={
          <>
            Find the acceleration of the particle, in <Katex tex="\mathrm{m\,s^{-2}}" />, when{' '}
            <Katex tex="x=2" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
        <Explore title="dv/dx is the change per metre; scale it by v to get the change per second">
          <PerMetre />
        </Explore>
      </PartCard>

      <PartCard
        letter="b"
        topic="Limiting Velocity"
        marks={1}
        statement={
          <>
            Find the value that the velocity of the particle approaches as <Katex tex="x" />{' '}
            becomes very large.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
