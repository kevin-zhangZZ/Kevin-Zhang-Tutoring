// 2026 Mathematical Methods NHT — Exam 1, Question 7 (3 marks). The NHT report gives sample
// answers only, with no statistics; its notes on each part are quoted as the examiner comments.
// A rectangle under f(x) = √(12 − x): show its area is A(k) = √(12k² − k³), then maximise it
// (k = 8). Question text transcribed from the original paper; the diagram is cropped from the
// original VCAA exam PDF. Answers checked with sympy and against the VCAA report's sample answers
// (k = 8; maximum area 16, not asked). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import rectSrc from './meth-2026nhte1-q7-rectangle.png'

const REPORT_A: SAExaminerStats = {
  comment: (
    <>
      This question was a &lsquo;show that&rsquo; question. As such, each line of working needed to demonstrate a clear,
      logical and explicit progression, leading to the answer. Specifically, it was important to show how the
      manipulation of <Katex tex="k" /> led directly to <Katex tex="\sqrt{k^2}" />.
    </>
  ),
}

const REPORT_B: SAExaminerStats = {
  comment: (
    <>
      There were different ways to approach this question. The derivative could be found using the chain rule on the
      function <Katex tex="A(k)=\sqrt{12k^2-k^3}" /> given in part 7a., the derivative could be found using the product
      rule on the function <Katex tex="A(k)=k\sqrt{12-k}" />, or the function <Katex tex="A(k)^2" /> could be constructed
      and differentiated. In any case, the derivative needed to be set equal to zero and solved to find the value of{' '}
      <Katex tex="k" />. The domain was restricted to <Katex tex="(0,12)" /> so the only solution was <Katex tex="k=8" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="A(k)=k\times f(k)=k\sqrt{12-k}" />,
    reason: <>
      The rectangle runs from <Katex tex="O" /> to <Katex tex="(k,0)" />, so its width is{' '}
      <Katex tex="k" />, and up to <Katex tex="(0,f(k))" />, so its height is <Katex tex="f(k)" />.
    </>,
  },
  {
    working: <Katex display tex="=\sqrt{k^2}\,\sqrt{12-k}" />,
    reason: <>
      To combine everything under one root, write <Katex tex="k" /> as a root. This needs <Katex tex="k>0" />, which it is:{' '}
      <Katex tex="\sqrt{k^2}" /> equals <Katex tex="k" /> only for <Katex tex="k\ge0" />.
    </>,
    more: <>The report singles out this step: show how <Katex tex="k" /> becomes <Katex tex="\sqrt{k^2}" />, rather than jumping straight to the final form.</>,
  },
  {
    working: <Katex display tex="=\sqrt{k^2(12-k)}=\boxed{\sqrt{12k^2-k^3}}" />,
    reason: <><Katex tex="\sqrt p\,\sqrt q=\sqrt{pq}" /> for <Katex tex="p,q\ge0" />, then expand. As required.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="A(k)=\left(12k^2-k^3\right)^{1/2}" />,
    reason: <>The form from part a., ready for the chain rule.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}A'(k)&=\frac12\left(24k-3k^2\right)\left(12k^2-k^3\right)^{-1/2}\\ &=\frac{3k(8-k)}{2\sqrt{12k^2-k^3}}\end{aligned}" />,
    reason: <>
      Chain rule: bring down the <Katex tex="\tfrac12" />, lower the power by one, and multiply by the derivative of the
      inside, <Katex tex="24k-3k^2=3k(8-k)" />.
    </>,
    more: <>
      Two other routes the report shows: the product rule on <Katex tex="k\sqrt{12-k}" /> gives{' '}
      <Katex tex="\tfrac{3(8-k)}{2\sqrt{12-k}}" />; or maximise <Katex tex="A(k)^2=12k^2-k^3" /> instead, since a positive
      quantity and its square are largest at the same <Katex tex="k" />. All three are zero only at{' '}
      <Katex tex="k=8" /> in the domain.
    </>,
  },
  {
    working: <Katex display tex="\begin{gathered}A'(k)=0 \implies 3k(8-k)=0\\ \implies k=0 \text{ or } k=8\end{gathered}" />,
    reason: <>A fraction is zero when its numerator is zero (and the denominator isn&apos;t).</>,
  },
  {
    working: <Katex display tex="\boxed{k=8}" />,
    reason: <>
      <Katex tex="k=0" /> is rejected: the question says <Katex tex="0<k<12" /> (and a rectangle of width 0 has zero area,
      the opposite of a maximum).
    </>,
    more: <>
      Confirm it is a maximum: the area is 0 at both ends of the domain (<Katex tex="k\to0" /> and{' '}
      <Katex tex="k\to12" />) and positive in between, so the only stationary point must be the maximum. The area there
      is <Katex tex="8\sqrt{12-8}=8\times2=16" />.
    </>,
  },
]

export default function MethodsQ7_2026NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 7 (3 marks)</p>
        <p>
          Let <Katex tex="f:(0,12)\to R,\ f(x)=\sqrt{12-x}" />.
        </p>
        <p>
          A rectangle is inscribed on the graph of <Katex tex="y=f(x)" /> so that it has a vertex at the origin and the
          diagonally opposite vertex at <Katex tex="\big(k,f(k)\big)" />, where <Katex tex="0<k<12" />, as shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={rectSrc}
            alt="The graph of y = f(x) falling from an open circle on the y-axis to an open circle at (12, 0), with a shaded rectangle whose vertices are O, (k, 0), (k, f(k)) on the curve, and (0, f(k)) — from the original VCAA exam paper"
            className="w-full max-w-[440px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Show That"
        marks={1}
        statement={<>Show that the area of the rectangle can be expressed as <Katex tex="A(k)=\sqrt{12k^2-k^3}" />.</>}
        examinerReport={REPORT_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Optimisation"
        marks={2}
        statement={<>Determine the value of <Katex tex="k" /> that maximises the area of the rectangle.</>}
        examinerReport={REPORT_B}
      >
        <Background>
          <p>
            Maximising means finding where the area stops increasing and starts decreasing: a stationary point,{' '}
            <Katex tex="A'(k)=0" />. Any solution must then be checked against the domain the question gives,{' '}
            <Katex tex="0<k<12" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <WrongMethod
          title="Forget the inside derivative of the square root"
          working={<Katex display tex="A'(k)=\frac{1}{2\sqrt{12k^2-k^3}}=0" />}
        >
          This has no solution at all, which is the warning sign: the numerator 1 is never zero. The chain rule multiplies
          by the derivative of <Katex tex="12k^2-k^3" />, and that factor, <Katex tex="24k-3k^2" />, is what carries the
          answer.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
