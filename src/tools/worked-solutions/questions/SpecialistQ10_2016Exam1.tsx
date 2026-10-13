// 2016 Specialist Mathematics — Exam 1, Question 10 (5 marks). A separable differential
// equation with an inverse-sine antiderivative, completing the square, and a root choice.
// Question text transcribed from the original paper (no diagram given). Answer checked
// with sympy and against the VCAA examination report. Solution is original. No lettered
// parts, so this uses the plain card layout. Qualifies for an interactive (14% full marks):
// interactives/spec-2016e1-q10-root-choice.tsx shows both roots and how y(1) picks the sign.

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { Background, WorkingTable, ReportShelf, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const RootChoice = lazyWidget(() => import('../interactives/spec-2016e1-q10-root-choice'))

const EXAM: SAExaminerStats = {
  marks: [20, 15, 12, 31, 7, 14],
  average: 2.4,
  comment: (
    <>
      Students found this question challenging. Most students were able to separate the
      variables correctly, but there were then many errors in the subsequent integration.
      Errors were seen in the integration of the polynomial part but far more in the
      integration of the term involving the reciprocal of the square root, despite the
      formula being on the formula sheet. It was common for logarithms to be seen. Some
      students were unable to proceed by completing the square or otherwise having
      integrated. A large number of students, when confronted with a square equals a
      constant, gave only the positive root. Many gave both roots but did not realise that
      only the negative root satisfied the initial conditions. Several students omitted the
      constant of integration; others made mistakes when attempting to evaluate the
      constant. A number of students interpreted <Katex tex="y(1)=0" /> as{' '}
      <Katex tex="x=0" /> when <Katex tex="y=1" />, while some attempted to solve for{' '}
      <Katex tex="x" /> rather than <Katex tex="y" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\sqrt{2-x^2}\,\frac{dy}{dx} = \frac{1}{2-y}" />,
    reason: <>The equation as given.</>,
  },
  {
    working: <Katex display tex="(2-y)\,dy = \frac{dx}{\sqrt{2-x^2}}" />,
    reason: <><Katex tex="\tfrac{dy}{dx}=\tfrac{1}{\sqrt{2-x^2}}\times\tfrac{1}{2-y}" /> is a function of <Katex tex="x" /> times a function of <Katex tex="y" />, so separate: all the <Katex tex="y" />s with <Katex tex="dy" />, all the <Katex tex="x" />s with <Katex tex="dx" />.</>,
  },
  {
    working: <Katex display tex="\int (2-y)\,dy = \int \frac{dx}{\sqrt{2-x^2}}" />,
    reason: <>Integrate both sides.</>,
  },
  {
    working: <Katex display tex="2y-\frac{y^2}{2} = \arcsin\!\left(\frac{x}{\sqrt2}\right)+c" />,
    reason: <>Left: integrate term by term. Right: the formula-sheet form <Katex tex="\int\tfrac{dx}{\sqrt{a^2-x^2}}=\arcsin\!\left(\tfrac{x}{a}\right)" /> with <Katex tex="a^2=2" />, so <Katex tex="a=\sqrt2" />. One constant <Katex tex="c" /> covers both sides.</>,
    more: (
      <>
        The report says logarithms were common here. A logarithm needs the derivative of the
        inside on top, as in <Katex tex="\int\tfrac{-2x}{2-x^2}\,dx=\log_e|2-x^2|" />; here there
        is no <Katex tex="x" /> on top and the bottom is a <em>square root</em> of{' '}
        <Katex tex="a^2-x^2" />, which is the inverse-sine pattern. The report also notes slips
        on the polynomial side: <Katex tex="\int(2-y)\,dy=2y-\tfrac{y^2}{2}" />, not{' '}
        <Katex tex="2y-y^2" />. It also says several students left out <Katex tex="c" />, which is fatal: the initial
        condition is then impossible to apply.
      </>
    ),
  },
  {
    working: <Katex display tex="y(1)=0: \quad 0 = \arcsin\!\left(\frac{1}{\sqrt2}\right)+c = \frac{\pi}{4}+c" />,
    reason: <><Katex tex="y(1)=0" /> means <Katex tex="y=0" /> when <Katex tex="x=1" />. The left side is <Katex tex="0" />, and <Katex tex="\arcsin\!\left(\tfrac{1}{\sqrt2}\right)=\tfrac{\pi}{4}" />.</>,
    more: (
      <>
        The report notes some students read <Katex tex="y(1)=0" /> the wrong way round, as{' '}
        <Katex tex="x=0" /> when <Katex tex="y=1" />. In function notation the number in the
        brackets is always the input <Katex tex="x" />; the value on the right is the output{' '}
        <Katex tex="y" />. Evaluating the constant now, before rearranging, keeps the algebra
        simplest.
      </>
    ),
  },
  {
    working: <Katex display tex="c = -\frac{\pi}{4} \implies 2y-\frac{y^2}{2} = \arcsin\!\left(\frac{x}{\sqrt2}\right)-\frac{\pi}{4}" />,
    reason: <>The question says “express <Katex tex="y" /> as a function of <Katex tex="x" />”, so <Katex tex="y" /> must now be made the subject. The left side is a quadratic in <Katex tex="y" />, so complete the square.</>,
    more: (
      <>
        The report says some students solved for <Katex tex="x" /> instead. That is tempting
        (the arcsine side rearranges easily), but it does not answer the question, which asks
        for <Katex tex="y" /> in terms of <Katex tex="x" />.
      </>
    ),
  },
  {
    working: <Katex display tex="y^2-4y = -2\arcsin\!\left(\frac{x}{\sqrt2}\right)+\frac{\pi}{2}" />,
    reason: <>Multiplying through by <Katex tex="-2" /> to make the <Katex tex="y^2" /> coefficient <Katex tex="1" />, ready to complete the square.</>,
  },
  {
    working: <Katex display tex="(y-2)^2 = 4+\frac{\pi}{2}-2\arcsin\!\left(\frac{x}{\sqrt2}\right)" />,
    reason: <>Completing the square: <Katex tex="(y-2)^2=y^2-4y+4" />, so add <Katex tex="4" /> to both sides.</>,
    more: (
      <>
        The report says some students could not get past this step, by completing the square
        or otherwise. The other route is the quadratic formula: treat{' '}
        <Katex tex="y^2-4y+\left(2\arcsin\tfrac{x}{\sqrt2}-\tfrac{\pi}{2}\right)=0" /> as a
        quadratic in <Katex tex="y" /> with the arcsine part as the constant term. It gives the
        same two roots as the next line.
      </>
    ),
  },
  {
    working: <Katex display tex="y = 2\pm\sqrt{4+\frac{\pi}{2}-2\arcsin\!\left(\frac{x}{\sqrt2}\right)}" />,
    reason: <>Take the square root of both sides and keep <b>both</b> roots: a square equal to a positive quantity (it is never below <Katex tex="4-\frac{\pi}{2}>0" />) has a positive and a negative root.</>,
    more: (
      <>
        The report says a large number of students wrote only the positive root. Both are
        genuine solutions of the differential equation (differentiate either one and it
        satisfies <Katex tex="\sqrt{2-x^2}\,\tfrac{dy}{dx}=\tfrac{1}{2-y}" />), so the sign
        cannot be chosen by habit; only the initial condition decides it, in the next line.
      </>
    ),
  },
  {
    working: <Katex display tex="x=1: \quad 4+\frac{\pi}{2}-2\times\frac{\pi}{4} = 4 \implies y = 2\pm2" />,
    reason: <>Testing the initial condition on each root: the plus gives <Katex tex="y=4" />, the minus gives <Katex tex="y=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = 2-\sqrt{4+\frac{\pi}{2}-2\arcsin\!\left(\frac{x}{\sqrt2}\right)}}" />,
    reason: <>Only the minus root gives <Katex tex="y(1)=0" />, so the answer is the minus root alone, not “<Katex tex="\pm" />”.</>,
    more: (
      <>
        The report says many students gave both roots without seeing that only the negative
        one satisfies the initial condition. A differential equation with an initial condition
        has one solution, so the answer is a single function. The sign cannot change partway
        along, either: the radicand is never smaller than{' '}
        <Katex tex="4+\tfrac{\pi}{2}-2\times\tfrac{\pi}{2}=4-\tfrac{\pi}{2}>0" />, so the two
        branches never meet. The solution holds for <Katex tex="-\sqrt2<x<\sqrt2" />, where{' '}
        <Katex tex="\sqrt{2-x^2}" /> is defined and non-zero.
      </>
    ),
  },
]

export default function SpecialistQ10_2016Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 10 (5 marks)" always>
        <p>
          Solve the differential equation{' '}
          <Katex tex="\sqrt{2-x^2}\,\dfrac{dy}{dx}=\dfrac{1}{2-y}" />, given that{' '}
          <Katex tex="y(1)=0" />. Express <Katex tex="y" /> as a function of{' '}
          <Katex tex="x" />.
        </p>
      </Background>
      <Background>
        <p>
          Three separate places to lose marks: recognising{' '}
          <Katex tex="\tfrac{1}{\sqrt{a^2-x^2}}" /> as an inverse sine rather than a
          logarithm; completing the square to make <Katex tex="y" /> the subject; and
          choosing between the two roots at the end.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <Explore title="Both roots solve the equation: the starting point picks the sign">
        <RootChoice />
      </Explore>
      <ReportShelf stats={EXAM} maxMarks={5} />
    </div>
  )
}
