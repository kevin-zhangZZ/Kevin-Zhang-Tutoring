// 2018 Specialist Mathematics — Exam 1, Question 3 (4 marks). Implicit differentiation of
// 2x²sin(y) + xy = π²/18 at (π/6, π/6). Question text transcribed from the original paper
// (no diagram given). Answer checked independently with sympy and against the VCAA
// examination report; itute's solutions agree (−18/(π√3 + 6)). Solution is original.
//
// Interactive (after the working): interactives/spec-2018e1-q3-balance.tsx. Walk from P to a
// nearby Q on the curve in two steps, across (only x changes) then down (only y changes): the
// left side's two changes cancel exactly, which is why the differentiated equation equals 0,
// and the chord PQ closes in on the tangent. A toggle draws the line from forgetting the
// dy/dx on sin(y) (gradient −3 − √3π/6), the subject of the first Common Mistake box. The
// second box is the report's point about rearranging for dy/dx before substituting.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const BalanceWidget = lazyWidget(() => import('../interactives/spec-2018e1-q3-balance'))

const EXAM: SAExaminerStats = {
  marks: [8, 4, 9, 33, 46],
  average: 3.1,
  comment: (
    <>
      Most students knew to use implicit differentiation in this problem and were successful
      in their application of the chain and product rules. Many students attempted to find an
      expression for <Katex tex="\tfrac{dy}{dx}" /> in terms of <Katex tex="x" /> and{' '}
      <Katex tex="y" />. This was not necessary, with a more effective approach being to
      substitute <Katex tex="x=\tfrac{\pi}{6}" /> and <Katex tex="y=\tfrac{\pi}{6}" />{' '}
      immediately following the implicit differentiation. Some students had difficulty with
      arithmetic.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="2x^2\sin(y) + xy = \frac{\pi^2}{18}" />,
    reason: (
      <>
        The equation mixes <Katex tex="x" /> and <Katex tex="y" /> and can&apos;t be rearranged
        into <Katex tex="y=\dots" />, yet we want a gradient: that is the signal for implicit
        differentiation. Differentiate every term with respect to <Katex tex="x" />,
        remembering that <Katex tex="y" /> changes as <Katex tex="x" /> does. The right side
        differentiates to <Katex tex="0" />: every point on the curve makes the left side
        equal <Katex tex="\tfrac{\pi^2}{18}" />, so moving along the curve never changes it.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{d}{dx}\left(2x^2\sin(y)\right) = 4x\sin(y) + 2x^2\cos(y)\frac{dy}{dx}" />,
    reason: (
      <>
        Both factors change as you move along the curve, so product rule: (derivative of{' '}
        <Katex tex="2x^2" />) <Katex tex="\times\sin(y)" /> <Katex tex="+\ 2x^2\times" />{' '}
        (derivative of <Katex tex="\sin(y)" />). <Katex tex="\sin(y)" /> depends on{' '}
        <Katex tex="x" /> only through <Katex tex="y" />, so the chain rule gives{' '}
        <Katex tex="\tfrac{d}{dx}\sin(y)=\cos(y)\tfrac{dy}{dx}" />: the{' '}
        <Katex tex="\tfrac{dy}{dx}" /> measures how fast <Katex tex="y" /> itself is changing.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{d}{dx}(xy) = y + x\frac{dy}{dx}" />,
    reason: (
      <>
        Product rule again: differentiating <Katex tex="x" /> gives <Katex tex="1" /> (leaving{' '}
        <Katex tex="y" />), and differentiating <Katex tex="y" /> gives{' '}
        <Katex tex="\tfrac{dy}{dx}" /> (leaving <Katex tex="x" />). Writing just{' '}
        <Katex tex="y" /> here would treat <Katex tex="y" /> as a constant.
      </>
    ),
  },
  {
    working: <Katex display tex="4x\sin(y) + 2x^2\cos(y)\frac{dy}{dx} + y + x\frac{dy}{dx} = 0" />,
    reason: (
      <>
        The differentiated equation. The terms without <Katex tex="\tfrac{dy}{dx}" /> are the
        change caused by <Katex tex="x" /> moving; the terms with it are the change caused
        by <Katex tex="y" /> moving, and together they cancel. Substitute the point now rather
        than rearranging first: the report is explicit that finding a general expression
        for <Katex tex="\tfrac{dy}{dx}" /> was not necessary.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned}&x=y=\frac{\pi}{6}:\\ &\sin\!\left(\frac{\pi}{6}\right)=\frac12, \quad \cos\!\left(\frac{\pi}{6}\right)=\frac{\sqrt3}{2}\end{aligned}" />,
    reason: (
      <>
        Only <Katex tex="y" /> sits inside the trig functions, and <Katex tex="\tfrac{\pi}{6}" />{' '}
        is <Katex tex="30^\circ" />, so there are just two exact values to recall. The{' '}
        <Katex tex="x" />s are plain numbers.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}&4\!\left(\frac{\pi}{6}\right)\!\left(\frac12\right) + 2\!\left(\frac{\pi^2}{36}\right)\!\left(\frac{\sqrt3}{2}\right)\frac{dy}{dx}\\ &\quad + \frac{\pi}{6} + \frac{\pi}{6}\frac{dy}{dx} = 0\end{aligned}"
      />
    ),
    reason: (
      <>
        Substitute term by term, keeping <Katex tex="\tfrac{dy}{dx}" /> as the one unknown.
        Watch the square: <Katex tex="x^2=\tfrac{\pi^2}{36}" />, not{' '}
        <Katex tex="\tfrac{\pi^2}{6}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{\pi}{3} + \frac{\pi}{6} + \left(\frac{\sqrt3\pi^2}{36} + \frac{\pi}{6}\right)\frac{dy}{dx} = 0" />,
    reason: (
      <>
        Now it is a linear equation in <Katex tex="\tfrac{dy}{dx}" /> with plain numbers, so
        group the number terms and the <Katex tex="\tfrac{dy}{dx}" /> terms:{' '}
        <Katex tex="4\cdot\tfrac{\pi}{6}\cdot\tfrac12=\tfrac{\pi}{3}" /> and{' '}
        <Katex tex="2\cdot\tfrac{\pi^2}{36}\cdot\tfrac{\sqrt3}{2}=\tfrac{\sqrt3\pi^2}{36}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{\pi}{2} + \frac{\pi\left(\sqrt3\pi + 6\right)}{36}\frac{dy}{dx} = 0" />,
    reason: (
      <>
        <Katex tex="\tfrac{\pi}{3}+\tfrac{\pi}{6}=\tfrac{\pi}{2}" />. In the bracket write{' '}
        <Katex tex="\tfrac{\pi}{6}" /> as <Katex tex="\tfrac{6\pi}{36}" /> and take out the
        common <Katex tex="\tfrac{\pi}{36}" />:{' '}
        <Katex tex="\tfrac{\sqrt3\pi^2+6\pi}{36}=\tfrac{\pi(\sqrt3\pi+6)}{36}" />. The{' '}
        <Katex tex="\pi\sqrt3+6" /> of the required form is already showing.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = -\frac{\pi}{2}\times\frac{36}{\pi\left(\sqrt3\pi+6\right)}" />,
    reason: (
      <>
        Move <Katex tex="\tfrac{\pi}{2}" /> across and divide by the coefficient of{' '}
        <Katex tex="\tfrac{dy}{dx}" /> (multiply by its reciprocal). The lone{' '}
        <Katex tex="\pi" /> cancels top and bottom and <Katex tex="\tfrac{36}{2}=18" />, which
        is what makes the prescribed answer form possible.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = \frac{-18}{\pi\sqrt3 + 6}}" />,
    reason: (
      <>
        The required form <Katex tex="\tfrac{a}{\pi\sqrt b+c}" /> with <Katex tex="a=-18" />,{' '}
        <Katex tex="b=3" />, <Katex tex="c=6" />, all integers. Sense check:{' '}
        <Katex tex="\approx-1.57" />, negative, and the curve is indeed falling as it passes
        through <Katex tex="\left(\tfrac{\pi}{6},\tfrac{\pi}{6}\right)" />.
      </>
    ),
    more: <>See the interactive below.</>,
  },
]

export default function SpecialistQ3_2018Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (4 marks)</p>
        <p>
          Find the gradient of the curve with equation{' '}
          <Katex tex="2x^2\sin(y)+xy=\dfrac{\pi^2}{18}" /> at the point{' '}
          <Katex tex="\left(\dfrac{\pi}{6},\ \dfrac{\pi}{6}\right)" />. Give your answer in
          the form <Katex tex="\dfrac{a}{\pi\sqrt{b}+c}" />, where <Katex tex="a" />,{' '}
          <Katex tex="b" /> and <Katex tex="c" /> are integers.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            The equation cannot be rearranged for <Katex tex="y" />, so differentiate it as it
            stands. Think of <Katex tex="y" /> as a function of <Katex tex="x" />: as you move
            along the curve, both coordinates change. Every time a <Katex tex="y" /> is
            differentiated, the chain rule leaves a <Katex tex="\tfrac{dy}{dx}" /> behind;
            everything else is the ordinary product rule.
          </p>
          <p>
            Why does the right side become <Katex tex="0" />? Every point on the curve makes the
            left side equal the same constant, so as you slide along the curve the left side
            does not change at all. Its derivative is <Katex tex="0" />: the change caused
            by <Katex tex="x" /> moving and the change caused by <Katex tex="y" /> moving must
            cancel. That balance is the equation you solve for <Katex tex="\tfrac{dy}{dx}" />.
          </p>
          <p>
            The efficiency point the report makes is worth taking: substitute the numbers{' '}
            <em>immediately</em> after differentiating, before rearranging. Solving a general
            expression for <Katex tex="\tfrac{dy}{dx}" /> and only then substituting gives the
            same answer through far messier algebra.
          </p>
          <p>
            Worth a check first that the point is actually on the curve:{' '}
            <Katex tex="2\left(\tfrac{\pi}{6}\right)^2\left(\tfrac12\right)+\left(\tfrac{\pi}{6}\right)^2 = \tfrac{\pi^2}{36}+\tfrac{\pi^2}{36}=\tfrac{\pi^2}{18}" /> ✓
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <Explore title="Along the curve the left side never changes, so its derivative is 0">
          <BalanceWidget />
        </Explore>
        <WrongMethod
          title={<>&ldquo;<Katex tex="\sin(y)" /> differentiates to <Katex tex="\cos(y)" />&rdquo;</>}
          working={
            <>
              <Katex display tex="4x\sin(y) + 2x^2\cos(y) + y + x\frac{dy}{dx} = 0" />
              <Katex display tex="\Rightarrow\ \frac{dy}{dx} = -3-\frac{\sqrt3\pi}{6} \approx -3.91" />
            </>
          }
        >
          <p>
            This treats <Katex tex="y" /> as a constant inside the sine, but <Katex tex="y" />{' '}
            changes as <Katex tex="x" /> does, so <Katex tex="\sin(y)" /> is a function of a
            function and the chain rule gives <Katex tex="\cos(y)\tfrac{dy}{dx}" />. Two quick
            catches: <Katex tex="\pi" /> ends up in the numerator, so the answer won&apos;t go into
            the form <Katex tex="\tfrac{a}{\pi\sqrt b+c}" />; and a gradient of{' '}
            <Katex tex="-3.91" /> is far steeper than the curve (turn on the toggle in the diagram
            above).
          </p>
        </WrongMethod>
        <WrongMethod
          title={<>&ldquo;I need <Katex tex="\tfrac{dy}{dx}" /> in terms of <Katex tex="x" /> and <Katex tex="y" /> before I can substitute&rdquo;</>}
          source="Examiner's report"
          working={
            <>
              <Katex display tex="\frac{dy}{dx} = \frac{-4x\sin(y) - y}{2x^2\cos(y) + x}" />
              <Katex display tex="= \frac{-\frac{\pi}{3} - \frac{\pi}{6}}{\frac{\sqrt3\pi^2}{36} + \frac{\pi}{6}}" />
            </>
          }
        >
          <p>
            Not wrong, but the report notes many students did this and that it was not
            necessary. It leaves a fraction of fractions to clear (multiply top and bottom
            by <Katex tex="\tfrac{36}{\pi}" />), which is extra arithmetic for no extra marks.
            Substituting straight after differentiating turns the equation into a linear one
            in <Katex tex="\tfrac{dy}{dx}" /> with plain numbers.
          </p>
        </WrongMethod>
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
