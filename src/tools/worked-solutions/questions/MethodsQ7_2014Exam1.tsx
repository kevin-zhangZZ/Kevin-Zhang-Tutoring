// 2014 Mathematical Methods (CAS) — Exam 1, Question 7 (3 marks). Antidifferentiating a
// trigonometric derivative and pinning the constant. Question text transcribed from the
// original paper (no diagram given). Answer checked with sympy and against the VCAA
// examination report. Solution is original. This question has no lettered parts, so it uses
// the plain card layout rather than PartCard.
// 2014-16 review (Oct 2026): reasons expanded so each step says why; `more` added for the
// chain-rule check, the report's +c trap and its general comment on pi vs x. One widget (38%
// full marks): meth-2014e1-q7-constant — sliding c shows only c = -1 meets the given point.

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { Background, WorkingTable, ReportShelf, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const ConstantW = lazyWidget(() => import('../interactives/meth-2014e1-q7-constant'))

const EXAM: SAExaminerStats = {
  marks: [19, 12, 30, 38],
  average: 1.9,
  comment: (
    <>
      The students who omitted a constant of integration (+<Katex tex="c" />) when completing
      the anti-differentiation were then unable to find the specific equation required.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = 2\cos(x)-\sin(2x)" />,
    reason: <>To get <Katex tex="f" /> from <Katex tex="f'" />, antidifferentiate term by term, then use the given value to find the constant.</>,
  },
  {
    working: <Katex display tex="\int 2\cos(x)\,dx = 2\sin(x)" />,
    reason: <>The antiderivative of <Katex tex="\cos(x)" /> is <Katex tex="\sin(x)" />; the 2 stays as a multiplier.</>,
  },
  {
    working: <Katex display tex="\int -\sin(2x)\,dx = \tfrac12\cos(2x)" />,
    reason: <>Use <Katex tex="\int \sin(kx)\,dx = -\tfrac1k\cos(kx)" /> with <Katex tex="k=2" />. The minus sign in front then makes it positive.</>,
    more: (
      <>
        Check by differentiating: <Katex tex="\tfrac{d}{dx}\left(\tfrac12\cos(2x)\right) = \tfrac12\times(-\sin(2x))\times 2 = -\sin(2x)" /> ✓.
        The chain rule multiplies by 2 when you differentiate, so antidifferentiating must divide by 2. Writing{' '}
        <Katex tex="2\cos(2x)" /> (multiplying instead of dividing) or getting the sign wrong are the usual slips, and
        this check catches both.
      </>
    ),
  },
  {
    working: <Katex display tex="f(x) = 2\sin(x)+\tfrac12\cos(2x)+c" />,
    reason: <>Add <Katex tex="+c" />: every vertical shift of this curve has the same derivative, and the given value picks out the right one.</>,
    more: (
      <>
        This is where the marks were lost: the report says students who left out <Katex tex="+c" /> could not find the
        specific function asked for. Without it, <Katex tex="f\!\left(\tfrac\pi2\right)=\tfrac12" /> has nothing
        to determine. If you used <Katex tex="\sin(2x)=2\sin(x)\cos(x)" /> and got{' '}
        <Katex tex="-\sin^2(x)" /> instead of <Katex tex="\tfrac12\cos(2x)" />, that is fine: the two differ by a
        constant, so your <Katex tex="c" /> comes out as <Katex tex="-\tfrac12" /> instead, but the final{' '}
        <Katex tex="f(x)" /> is the same.
      </>
    ),
  },
  {
    working: <Katex display tex="f\!\left(\tfrac\pi2\right) = 2(1)+\tfrac12(-1)+c = \tfrac32+c" />,
    reason: <>Substitute <Katex tex="x=\tfrac\pi2" />: <Katex tex="\sin\!\left(\tfrac\pi2\right)=1" /> and <Katex tex="\cos\!\left(2\times\tfrac\pi2\right)=\cos(\pi)=-1" />.</>,
    more: (
      <>
        The report&apos;s general comments note that in this question <Katex tex="\pi" /> was written like{' '}
        <Katex tex="x" /> and students confused the two in their working. Write <Katex tex="\pi" /> clearly, with
        its flat top bar, especially here where both appear in the same line.
      </>
    ),
  },
  {
    working: <Katex display tex="\tfrac32+c = \tfrac12 \implies c = -1" />,
    reason: <>Set this equal to the given value <Katex tex="\tfrac12" /> and solve for <Katex tex="c" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f(x) = 2\sin(x)+\tfrac12\cos(2x)-1}" />,
    reason: <>Check: at <Katex tex="x=\tfrac\pi2" />, <Katex tex="2-\tfrac12-1=\tfrac12" /> ✓.</>,
  },
]

export default function MethodsQ7_2014Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 7 (3 marks)" always>
        <p>
          If <Katex tex="f'(x)=2\cos(x)-\sin(2x)" /> and{' '}
          <Katex tex="f\!\left(\tfrac\pi2\right)=\tfrac12" />, find <Katex tex="f(x)" />.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <Explore title="The +c slides the curve; only one position passes through the given point">
        <ConstantW />
      </Explore>
      <ReportShelf stats={EXAM} maxMarks={3} />
    </div>
  )
}
