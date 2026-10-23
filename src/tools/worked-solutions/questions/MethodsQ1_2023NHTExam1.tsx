// 2023 Mathematical Methods NHT — Exam 1, Question 1 (3 marks). The NHT report gives sample
// answers only, with no statistics; its one note beyond the bare answer (part a.: the product
// rule) is quoted as that part's examiner comment. Differentiating x sin(x) with the product rule,
// then a definite integral of x + cos(x) from 0 to π/2. Question text transcribed from the
// original paper. Answers checked with sympy and against the report's sample answers
// (sin(x) + x cos(x); 1 + π²/8). Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT_A: SAExaminerStats = {
  comment: <>This question involved using the product rule for differentiation.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="u=x,\quad v=\sin(x)" />,
    reason: <><Katex tex="y" /> is a product of two functions of <Katex tex="x" />, so use the product rule <Katex tex="\tfrac{d}{dx}(uv)=u'v+uv'" />.</>,
  },
  {
    working: <Katex display tex="u'=1,\quad v'=\cos(x)" />,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx}=\sin(x)+x\cos(x)}" />,
    reason: <><Katex tex="u'v+uv'=1\cdot\sin(x)+x\cos(x)" />.</>,
    more: <>Check at <Katex tex="x=0" />: the gradient is <Katex tex="0+0=0" />. That fits: near 0, <Katex tex="\sin(x)\approx x" />, so <Katex tex="x\sin(x)\approx x^2" />, a parabola with a flat bottom at the origin.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\int_0^{\frac{\pi}{2}}\bigl(x+\cos(x)\bigr)\,dx=\left[\frac{x^2}{2}+\sin(x)\right]_0^{\frac{\pi}{2}}" />,
    reason: <>Antidifferentiate term by term: <Katex tex="\int x\,dx=\tfrac{x^2}{2}" /> and <Katex tex="\int\cos(x)\,dx=\sin(x)" />.</>,
    more: <>Check the sign by differentiating back: <Katex tex="\tfrac{d}{dx}\sin(x)=\cos(x)" />, so it is <Katex tex="+\sin(x)" />, not <Katex tex="-\sin(x)" />.</>,
  },
  {
    working: <Katex display tex="=\left(\frac{1}{2}\left(\frac{\pi}{2}\right)^2+\sin\left(\frac{\pi}{2}\right)\right)-\left(0+\sin(0)\right)" />,
    reason: <>Upper terminal minus lower terminal.</>,
  },
  {
    working: <Katex display tex="=\left(\frac{\pi^2}{8}+1\right)-(0+0)" />,
    reason: <><Katex tex="\left(\tfrac{\pi}{2}\right)^2=\tfrac{\pi^2}{4}" />, and half of that is <Katex tex="\tfrac{\pi^2}{8}" />. <Katex tex="\sin\left(\tfrac{\pi}{2}\right)=1" /> and <Katex tex="\sin(0)=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{=\frac{\pi^2}{8}+1}" />,
    reason: <>Exact, as the paper&apos;s instructions require. VCAA writes it as <Katex tex="1+\tfrac{\pi^2}{8}" />.</>,
    more: <>Sanity check: <Katex tex="\tfrac{\pi^2}{8}+1\approx2.23" />. On <Katex tex="\left[0,\tfrac{\pi}{2}\right]" /> the integrand runs from <Katex tex="0+1=1" /> up to <Katex tex="\tfrac{\pi}{2}+0\approx1.57" />, so the area is between <Katex tex="1\times1.57" /> and <Katex tex="1.57\times1.57\approx2.47" /> ✓.</>,
  },
]

export default function MethodsQ1_2023NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (3 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Product Rule"
        marks={1}
        statement={<>Find the derivative of <Katex tex="y=x\sin(x)" /> with respect to <Katex tex="x" />.</>}
        examinerReport={REPORT_A}
      >
        <WorkingTable rows={ROWS_A} />
        <WrongMethod
          title="Differentiate each factor separately and multiply"
          working={<Katex display tex="\frac{dy}{dx}=1\times\cos(x)=\cos(x)" />}
        >
          The derivative of a product is not the product of the derivatives. Check at <Katex tex="x=\tfrac{\pi}{2}" />:
          the function <Katex tex="x\sin(x)" /> is still increasing there (it reaches <Katex tex="\tfrac{\pi}{2}" /> at
          that point and keeps rising), but <Katex tex="\cos\left(\tfrac{\pi}{2}\right)=0" /> would say it is flat. The
          product rule gives <Katex tex="\sin\left(\tfrac{\pi}{2}\right)+\tfrac{\pi}{2}\cos\left(\tfrac{\pi}{2}\right)=1" />,
          a positive gradient.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Definite Integral"
        marks={2}
        statement={<>Evaluate <Katex tex="\displaystyle\int_0^{\frac{\pi}{2}}\bigl(x+\cos(x)\bigr)\,dx" />.</>}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
