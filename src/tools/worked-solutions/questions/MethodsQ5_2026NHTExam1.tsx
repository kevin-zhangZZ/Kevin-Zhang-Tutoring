// 2026 Mathematical Methods NHT — Exam 1, Question 5 (4 marks). The NHT report gives sample
// answers only, with no statistics; its notes on each part are quoted as the examiner comments.
// f(x) = tan(2x) + 2 on its maximal domain: the general equation of the vertical asymptotes, the
// derivative 2sec²(2x), then the area under y = f′(x) between π/12 and π/6, found by the
// fundamental theorem (the antiderivative of f′ is f). Question text transcribed from the original
// paper (no diagram). Answers checked with sympy and against the VCAA report's sample answers
// (x = π/4 + kπ/2, k ∈ Z; 2/cos²(2x); 2√3/3). Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT_A: SAExaminerStats = {
  comment: (
    <>
      The question involved finding the equations of all vertical asymptotes over the maximal domain <Katex tex="R" />.
      The equation needed to be written as <Katex tex="x=" /> with the introduced parameter <Katex tex="k" /> (or{' '}
      <Katex tex="n" />) defined as <Katex tex="k\in Z" />. The equations could be expressed in any correct form.
    </>
  ),
}

const REPORT_B: SAExaminerStats = {
  comment: (
    <>
      This question involved using the chain rule to differentiate the tangent function, the formula for which can be
      found on the formula sheet.
    </>
  ),
}

const REPORT_C: SAExaminerStats = {
  comment: (
    <>
      This question involved the calculation of the area bounded by the graph of <Katex tex="y=f'(x)" />, the{' '}
      <Katex tex="x" />-axis and the lines <Katex tex="x=\dfrac{\pi}{12}" /> and <Katex tex="x=\dfrac{\pi}{6}" />.
      Antidifferentiating <Katex tex="f'(x)" /> gave <Katex tex="f(x)" /> and then the integral needed to be evaluated at
      the correct terminals of <Katex tex="\dfrac{\pi}{12}" /> and <Katex tex="\dfrac{\pi}{6}" />. The answer needed to be
      expressed as a single term.
      <br />
      A graph of <Katex tex="y=f'(x)" /> can be considered over{' '}
      <Katex tex="x\in\left(-\dfrac{\pi}{4},\dfrac{\pi}{4}\right)" />. Note that <Katex tex="f'(x)\ge2>0" />, so the region
      has a positive area above the <Katex tex="x" />-axis.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="2x=\frac\pi2+k\pi,\quad k\in Z" />,
    reason: <>
      <Katex tex="\tan(\theta)" /> has vertical asymptotes wherever <Katex tex="\cos(\theta)=0" />, at{' '}
      <Katex tex="\theta=\tfrac\pi2+k\pi" /> for every integer <Katex tex="k" />. Here <Katex tex="\theta=2x" />. The{' '}
      <Katex tex="+2" /> moves the graph up, which doesn&apos;t change where the asymptotes are.
    </>,
  },
  {
    working: <Katex display tex="\boxed{x=\frac\pi4+\frac{k\pi}2,\ k\in Z}" />,
    reason: <>
      Divide by 2. The maximal domain is all of <Katex tex="R" /> except these, so there are infinitely many asymptotes,
      half a period (<Katex tex="\tfrac\pi2" />) apart. The report notes the answer needed the form{' '}
      <Katex tex="x=\ldots" /> with <Katex tex="k\in Z" /> stated.
    </>,
    more: <>
      Equivalent forms the report accepts: <Katex tex="x=\tfrac\pi4(1+2k)" /> or <Katex tex="x=\tfrac\pi4(\pm1\pm2k)" />.
      Check: <Katex tex="k=0" /> gives <Katex tex="x=\tfrac\pi4" />, where <Katex tex="2x=\tfrac\pi2" /> and{' '}
      <Katex tex="\tan" /> is undefined. The period of <Katex tex="\tan(2x)" /> is <Katex tex="\tfrac\pi2" />, which is the
      gap between consecutive asymptotes.
    </>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x)=2\sec^2(2x)" />,
    reason: <>
      Formula sheet: <Katex tex="\tfrac{d}{dx}\tan(ax)=a\sec^2(ax)" />, here with <Katex tex="a=2" /> (the chain rule
      brings out the inside derivative 2). The constant <Katex tex="+2" /> differentiates to 0.
    </>,
  },
  {
    working: <Katex display tex="\boxed{f'(x)=\frac{2}{\cos^2(2x)}}" />,
    reason: <>
      <Katex tex="\sec(\theta)=\tfrac{1}{\cos(\theta)}" />. Either form is a correct answer; the report gives both.
    </>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x)=\frac{2}{\cos^2(2x)}>0" />,
    reason: <>
      Over <Katex tex="\left[\tfrac\pi{12},\tfrac\pi6\right]" /> there is no asymptote (the nearest is{' '}
      <Katex tex="x=\tfrac\pi4" />) and <Katex tex="\cos^2(2x)\le1" />, so <Katex tex="f'(x)\ge2" />: the whole region is
      above the <Katex tex="x" />-axis, and the area is just the definite integral.
    </>,
  },
  {
    working: <Katex display tex="A=\int_{\pi/12}^{\pi/6}f'(x)\,dx=\Big[f(x)\Big]_{\pi/12}^{\pi/6}" />,
    reason: <>
      An antiderivative of <Katex tex="f'" /> is <Katex tex="f" /> itself, which part b. just differentiated. No new
      integration is needed.
    </>,
    more: <>
      Using <Katex tex="\tan(2x)" /> (without the <Katex tex="+2" />) works equally well: a constant in the antiderivative
      cancels when the terminals are subtracted. That is the report&apos;s first method.
    </>,
  },
  {
    working: <Katex display tex="=\left(\tan\!\left(\frac\pi3\right)+2\right)-\left(\tan\!\left(\frac\pi6\right)+2\right)" />,
    reason: <>Upper terminal: <Katex tex="2\cdot\tfrac\pi6=\tfrac\pi3" />. Lower terminal: <Katex tex="2\cdot\tfrac\pi{12}=\tfrac\pi6" />.</>,
  },
  {
    working: <Katex display tex="=\sqrt3-\frac{1}{\sqrt3}=\frac{3}{\sqrt3}-\frac{1}{\sqrt3}=\frac{2}{\sqrt3}" />,
    reason: <>Exact values: <Katex tex="\tan\!\left(\tfrac\pi3\right)=\sqrt3" />, <Katex tex="\tan\!\left(\tfrac\pi6\right)=\tfrac{1}{\sqrt3}" />. Write <Katex tex="\sqrt3" /> as <Katex tex="\tfrac{3}{\sqrt3}" /> to combine.</>,
  },
  {
    working: <Katex display tex="\boxed{A=\frac{2\sqrt3}{3}\ \text{square units}}" />,
    reason: <>
      Rationalised; <Katex tex="\tfrac{2}{\sqrt3}" /> is also correct. The report notes the answer had to be a single term,
      so <Katex tex="\sqrt3-\tfrac{\sqrt3}{3}" /> is not finished.
    </>,
    more: <>
      Sanity check: <Katex tex="\tfrac{2\sqrt3}3\approx1.15" />. The strip is <Katex tex="\tfrac\pi{12}\approx0.26" /> wide
      and <Katex tex="f'" /> climbs from <Katex tex="\tfrac83" /> at <Katex tex="x=\tfrac\pi{12}" /> to 8 at{' '}
      <Katex tex="x=\tfrac\pi6" />, so the area must lie between <Katex tex="0.26\times2.67\approx0.70" /> and{' '}
      <Katex tex="0.26\times8\approx2.1" />. It does.
    </>,
  },
]

export default function MethodsQ5_2026NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (4 marks)</p>
        <p>
          Consider the function with the rule <Katex tex="f(x)=\tan(2x)+2" /> and maximal domain.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Asymptotes"
        marks={1}
        statement={<>Find the equations of the vertical asymptotes for the graph of <Katex tex="y=f(x)" />.</>}
        examinerReport={REPORT_A}
      >
        <WorkingTable rows={ROWS_A} />
        <WrongMethod
          title="Give only the asymptote nearest the origin"
          working={<Katex display tex="x=\frac\pi4" />}
        >
          With the maximal domain, <Katex tex="\tan(2x)" /> repeats forever in both directions, so there is an asymptote
          every <Katex tex="\tfrac\pi2" />. The question asks for the equations (plural); the general solution with{' '}
          <Katex tex="k\in Z" /> lists them all at once.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Chain Rule"
        marks={1}
        statement={<>Determine <Katex tex="f'(x)" />.</>}
        examinerReport={REPORT_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Area Under a Curve"
        marks={2}
        statement={
          <>
            Find the area of the region bounded by the curve <Katex tex="y=f'(x)" />, the line{' '}
            <Katex tex="x=\dfrac\pi{12}" />, the line <Katex tex="x=\dfrac\pi6" /> and the <Katex tex="x" />-axis.
          </>
        }
        examinerReport={REPORT_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
