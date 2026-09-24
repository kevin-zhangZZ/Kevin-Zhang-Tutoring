// 2015 Specialist Mathematics — Exam 2, Section 2 Question 3 (10 marks). A bow-tie logo
// given parametrically: the parametric gradient, the cartesian form, and an area found via
// a supplied antiderivative identity. Question text transcribed from the original paper; the
// figure is a crop of VCAA's own artwork. Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import logoSrc from './spec-2015e2-q3-logo.png'

const EXAM_A: SAExaminerStats = {
  marks: [20, 16, 64],
  average: 1.5,
  comment: (
    <>
      This question was reasonably well answered. Many students attempted a chain rule
      relation, but a number of these had <Katex tex="x" /> instead of <Katex tex="t" /> in
      what otherwise would have been a correct answer. Some students gave{' '}
      <Katex tex="\tfrac{dy}{dt}" /> as their answer, while others first eliminated{' '}
      <Katex tex="t" /> to get <Katex tex="y" /> in terms of <Katex tex="x" />, found{' '}
      <Katex tex="\tfrac{dy}{dx}" />, and then expressed their answer in terms of{' '}
      <Katex tex="t" />. The latter method was lengthy and more prone to errors. Some students
      did unnecessary further working out, attempted to simplify a correct answer and changed
      it to an incorrect answer.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [36, 64],
  average: 0.7,
  comment: <>This question was managed quite well by students who answered Question 3a. correctly.</>,
}

const EXAM_CI: SAExaminerStats = {
  marks: [48, 52],
  average: 0.5,
  comment: (
    <>
      Many responses to this question lacked the necessary steps. Some students assumed what
      was to be shown and then proceeded to show something else.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [45, 55],
  average: 0.6,
  comment: (
    <>
      This question was answered reasonably well. Common errors included{' '}
      <Katex tex="\left(-\tfrac{\sqrt3}2,\tfrac{\sqrt3}2\right)" />,{' '}
      <Katex tex="(-1,1)" /> and <Katex tex="\left(-\tfrac\pi3,\tfrac\pi3\right)" />.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [24, 15, 61],
  average: 1.4,
  comment: (
    <>
      Students were asked to simplify the right-hand side of the equation in this question.
      However, some students attempted
      to work on both sides of the given equation, usually integrating both sides. The
      second-last step of putting the two square root terms over a common denominator was
      occasionally omitted.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [50, 16, 14, 20],
  average: 1.1,
  comment: (
    <>
      Only a small number of students seemed to understand this "hence" question. An
      antiderivative with terminals needed to be written down. The most common answer was an
      integral for the area, followed by its evaluation using CAS technology.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x = \sin(t) \implies \frac{dx}{dt} = \cos(t)" />,
    reason: <>Differentiate each parametric equation with respect to <Katex tex="t" />, then divide. Do not eliminate <Katex tex="t" /> first — the report calls that route lengthy and error-prone.</>,
  },
  {
    working: <Katex display tex="y = \tfrac12\sin(t)\tan(t) \implies \frac{dy}{dt} = \tfrac12\bigl(\cos(t)\tan(t)+\sin(t)\sec^2(t)\bigr)" />,
    reason: <>Product rule, with <Katex tex="\tfrac{d}{dt}\tan(t)=\sec^2(t)" />.</>,
  },
  {
    working: <Katex display tex="= \tfrac12\bigl(\sin(t)+\sin(t)\sec^2(t)\bigr) = \tfrac12\sin(t)\bigl(1+\sec^2(t)\bigr)" />,
    reason: <><Katex tex="\cos(t)\tan(t)=\sin(t)" />, then factorise.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = \frac{dy/dt}{dx/dt} = \frac{\tfrac12\sin(t)\bigl(1+\sec^2(t)\bigr)}{\cos(t)}" />,
    reason: <>The parametric chain rule.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = \tfrac12\tan(t)\bigl(\sec^2(t)+1\bigr)}" />,
    reason: <>Since <Katex tex="\tfrac{\sin t}{\cos t}=\tan t" />. The answer is in terms of <Katex tex="t" />, as asked.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="t=\tfrac\pi6:\quad \tan\!\left(\tfrac\pi6\right) = \tfrac1{\sqrt3}" />,
    reason: <>An exact value.</>,
  },
  {
    working: <Katex display tex="\cos\!\left(\tfrac\pi6\right) = \tfrac{\sqrt3}2 \implies \sec^2\!\left(\tfrac\pi6\right) = \tfrac{4}{3}" />,
    reason: <><Katex tex="\sec^2=\tfrac1{\cos^2}=\tfrac1{3/4}" />.</>,
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = \tfrac12\times\tfrac1{\sqrt3}\times\left(\tfrac43+1\right) = \frac{7}{6\sqrt3}" />,
    reason: <>Since <Katex tex="\tfrac43+1=\tfrac73" /> and <Katex tex="\tfrac12\times\tfrac73=\tfrac76" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{7\sqrt3}{18}}" />,
    reason: <>Rationalising: <Katex tex="\tfrac{7}{6\sqrt3}\times\tfrac{\sqrt3}{\sqrt3}=\tfrac{7\sqrt3}{18}" />. So <Katex tex="a=7" />, <Katex tex="b=3" />, <Katex tex="c=18" />.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="y = \tfrac12\sin(t)\tan(t) = \tfrac12\sin(t)\cdot\frac{\sin(t)}{\cos(t)} = \frac{\sin^2(t)}{2\cos(t)}" />,
    reason: <>Start from the parametric pair and work towards the cartesian form — not from the answer backwards, which the report says cost marks.</>,
  },
  {
    working: <Katex display tex="x = \sin(t) \implies \sin^2(t) = x^2" />,
    reason: <>The numerator is done.</>,
  },
  {
    working: <Katex display tex="\cos(t) = \sqrt{1-\sin^2(t)} = \sqrt{1-x^2}" />,
    reason: <>The positive root is correct because <Katex tex="t\in\left[-\tfrac\pi3,\tfrac\pi3\right]" />, where <Katex tex="\cos(t)>0" />. Saying so is part of the "verify".</>,
  },
  {
    working: <Katex display tex="\boxed{y = \frac{x^2}{2\sqrt{1-x^2}}}" />,
    reason: <>As required.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="x = \sin(t), \qquad t\in\left[-\tfrac\pi3,\tfrac\pi3\right]" />,
    reason: <>The domain in <Katex tex="x" /> is the <em>image</em> of the <Katex tex="t" />-interval under <Katex tex="\sin" />, not the interval itself.</>,
  },
  {
    working: <Katex display tex="\sin \text{ is increasing on } \left[-\tfrac\pi3,\tfrac\pi3\right]" />,
    reason: <>So the endpoints map to the endpoints, and nothing beyond them is reached.</>,
  },
  {
    working: <Katex display tex="\boxed{\left[-\frac{\sqrt3}{2},\ \frac{\sqrt3}{2}\right]}" />,
    reason: <>Since <Katex tex="\sin\!\left(\pm\tfrac\pi3\right)=\pm\tfrac{\sqrt3}2" />. Closed, because the given <Katex tex="t" />-interval is closed.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\text{RHS} = \frac{2x^2}{\sqrt{1-x^2}} + \frac{d}{dx}\!\left(x\sqrt{1-x^2}\right)" />,
    reason: <>The instruction is to simplify the right-hand side only — working on both sides is what the report warns against.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\!\left(x\sqrt{1-x^2}\right) = \sqrt{1-x^2}+x\cdot\tfrac12\left(1-x^2\right)^{-1/2}(-2x)" />,
    reason: <>Product rule, with a chain rule on the square root.</>,
  },
  {
    working: <Katex display tex="= \sqrt{1-x^2}-\frac{x^2}{\sqrt{1-x^2}}" />,
    reason: <>Simplifying the second term.</>,
  },
  {
    working: <Katex display tex="\text{RHS} = \frac{2x^2}{\sqrt{1-x^2}}-\frac{x^2}{\sqrt{1-x^2}}+\sqrt{1-x^2} = \frac{x^2}{\sqrt{1-x^2}}+\sqrt{1-x^2}" />,
    reason: <>The two <Katex tex="x^2" /> terms combine.</>,
  },
  {
    working: <Katex display tex="= \frac{x^2+\left(1-x^2\right)}{\sqrt{1-x^2}} = \frac{1}{\sqrt{1-x^2}}" />,
    reason: <>The common-denominator step the report says was often skipped — and everything cancels.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\bigl(\arcsin(x)\bigr) = \frac{1}{\sqrt{1-x^2}} = \text{RHS} \ \checkmark" />,
    reason: <>The simplified right-hand side is the standard derivative of <Katex tex="\arcsin(x)" />, as required.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="A = 4\int_0^{\sqrt3/2}\frac{x^2}{2\sqrt{1-x^2}}\,dx" />,
    reason: <>The logo has two mirror symmetries — about the <Katex tex="x" />-axis (stated) and about the <Katex tex="y" />-axis (since <Katex tex="y" /> is even in <Katex tex="x" />) — so integrate one quarter and multiply by 4. The terminals are from part c(ii).</>,
  },
  {
    working: <Katex display tex="A = \int_0^{\sqrt3/2}\frac{2x^2}{\sqrt{1-x^2}}\,dx" />,
    reason: <>Taking the 4 inside cancels the 2 in the denominator — and now the integrand is exactly the term part d. isolated.</>,
  },
  {
    working: <Katex display tex="\frac{2x^2}{\sqrt{1-x^2}} = \frac{d}{dx}\bigl(\arcsin(x)\bigr) - \frac{d}{dx}\!\left(x\sqrt{1-x^2}\right)" />,
    reason: <>Rearranging part d. This is the "hence": the antiderivative is handed to you.</>,
  },
  {
    working: <Katex display tex="A = \left[\arcsin(x)-x\sqrt{1-x^2}\right]_0^{\sqrt3/2}" />,
    reason: <>The report asks specifically for the antiderivative written down with terminals, not just an integral evaluated on CAS.</>,
  },
  {
    working: <Katex display tex="= \arcsin\!\left(\tfrac{\sqrt3}2\right)-\tfrac{\sqrt3}2\sqrt{1-\tfrac34} - 0" />,
    reason: <>The lower terminal contributes nothing, since <Katex tex="\arcsin(0)=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A = \frac\pi3-\frac{\sqrt3}{4}}" />,
    reason: <>Since <Katex tex="\arcsin\!\left(\tfrac{\sqrt3}2\right)=\tfrac\pi3" /> and <Katex tex="\tfrac{\sqrt3}2\times\tfrac12=\tfrac{\sqrt3}4" />. Numerically <Katex tex="0.614" />. Sanity check: the logo fits in a box <Katex tex="\sqrt3\approx1.73" /> wide and <Katex tex="1.5" /> tall (at the edges <Katex tex="y=\pm\tfrac34" />), about <Katex tex="2.6" /> square units, and it pinches to nothing at the middle, so a quarter of the box is about right.</>,
  },
]

export default function SpecialistQ3_2015Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (10 marks)</p>
        <p>
          A manufacturer of bow ties wishes to design an advertising logo, represented below,
          where the upper boundary curve in the first and second quadrants is given by the
          parametric relations{' '}
          <Katex tex="x=\sin(t),\ y=\tfrac12\sin(t)\tan(t)" /> for{' '}
          <Katex tex="t\in\left[-\tfrac\pi3,\tfrac\pi3\right]" />. The logo is symmetrical
          about the <Katex tex="x" />-axis.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={logoSrc}
            alt="A bow-tie shaped logo on gridded axes: two curves meeting at the origin and flaring out to vertical edges at x = ±√3/2, mirrored above and below the x-axis — from the original 2015 VCAA exam paper"
            className="w-full max-w-[380px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Parametric Derivative"
        marks={2}
        statement={<>Find an expression for <Katex tex="\tfrac{dy}{dx}" /> in terms of <Katex tex="t" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Gradient"
        marks={1}
        statement={
          <>
            Find the slope of the upper boundary curve where <Katex tex="t=\tfrac\pi6" />.
            Give your answer in the form <Katex tex="\tfrac{a\sqrt b}{c}" />, where{' '}
            <Katex tex="a" />, <Katex tex="b" /> and <Katex tex="c" /> are positive integers.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c.i"
        topic="Cartesian Equation"
        marks={1}
        statement={
          <>
            Verify that the cartesian equation of the upper boundary curve is{' '}
            <Katex tex="y=\dfrac{x^2}{2\sqrt{1-x^2}}" />.
          </>
        }
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Domain"
        marks={1}
        statement={<>State the domain for <Katex tex="x" /> of the upper boundary curve.</>}
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Derivative Identity"
        marks={2}
        statement={
          <>
            Show that{' '}
            <Katex tex="\dfrac{d}{dx}\bigl(\arcsin(x)\bigr)=\dfrac{2x^2}{\sqrt{1-x^2}}+\dfrac{d}{dx}\!\left(x\sqrt{1-x^2}\right)" />{' '}
            by simplifying the right-hand side of this equation.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Area Enclosed"
        marks={3}
        statement={
          <>
            Hence write down an antiderivative in terms of <Katex tex="x" />, to be evaluated
            between two appropriate terminals, and find the area of the advertising logo.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>
    </div>
  )
}
