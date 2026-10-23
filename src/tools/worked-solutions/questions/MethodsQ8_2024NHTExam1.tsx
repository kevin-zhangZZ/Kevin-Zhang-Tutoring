// 2024 Mathematical Methods NHT — Exam 1, Question 8 (4 marks). The NHT report gives sample
// answers only, with no statistics; its notes on parts a. (the (ax + b)^n rule on the formula
// sheet) and b. (the definition of average value) are quoted as those parts' examiner comments.
// An antiderivative of 1/√(3x + 1), then the m for which the average value over [0, m] is 1/3,
// rejecting m = 0. Question text transcribed from the original paper. Answers checked with sympy
// and against the VCAA report's sample answers ((2/3)√(3x + 1); m = 8). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT_A: SAExaminerStats = {
  comment: (
    <>
      The formula sheet gives the rule{' '}
      <Katex tex="\displaystyle\int\left(ax+b\right)^n dx=\frac{1}{a(n+1)}\left(ax+b\right)^{n+1}+c,\ n\neq-1" />.
    </>
  ),
}

const REPORT_B: SAExaminerStats = {
  comment: (
    <>
      The average value of a function for an interval <Katex tex="[a,b]" /> is defined as{' '}
      <Katex tex="\displaystyle\frac{1}{b-a}\int_a^b f(x)\,dx" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)=(3x+1)^{-\frac12}" />,
    reason: <>Rewrite the root as a power, so the formula-sheet rule for <Katex tex="(ax+b)^n" /> applies, with <Katex tex="a=3" />, <Katex tex="b=1" />, <Katex tex="n=-\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\int(3x+1)^{-\frac12}dx&=\frac{1}{3\cdot\frac12}(3x+1)^{\frac12}\\ &=\frac23(3x+1)^{\frac12}\end{aligned}" />,
    reason: <>Raise the power by 1 (to <Katex tex="\tfrac12" />), and divide by the new power and by <Katex tex="a=3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{F(x)=\frac23\sqrt{3x+1}}" />,
    reason: <>The question asks for <b>an</b> antiderivative, so the constant can be left out (any <Katex tex="+c" /> is also correct).</>,
    more: <>Check by differentiating: <Katex tex="\tfrac23\cdot\tfrac12(3x+1)^{-\frac12}\cdot3=(3x+1)^{-\frac12}" />, which is <Katex tex="f(x)" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{1}{m-0}\int_0^m\frac{1}{\sqrt{3x+1}}\,dx=\frac13" />,
    reason: <>The average value over <Katex tex="[0,m]" /> is the area under the curve divided by the width of the interval, <Katex tex="m" />.</>,
  },
  {
    working: <Katex display tex="\frac1m\left[\frac23\sqrt{3x+1}\right]_0^m=\frac13" />,
    reason: <>Use the antiderivative from part a.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}\frac1m\cdot\frac23\left(\sqrt{3m+1}-1\right)=\frac13\\ \implies \sqrt{3m+1}-1=\frac m2\end{gathered}" />,
    reason: <>At the lower terminal <Katex tex="\sqrt{0+1}=1" />. Then multiply both sides by <Katex tex="\tfrac{3m}{2}" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}\sqrt{3m+1}=\frac m2+1\\ \implies 3m+1=\frac{m^2}{4}+m+1\end{gathered}" />,
    reason: <>Isolate the root, then square both sides. <Katex tex="\left(\tfrac m2+1\right)^2=\tfrac{m^2}4+m+1" />.</>,
    more: <>Squaring can introduce false solutions, so any answer must be checked in the unsquared equation. Here both sides of <Katex tex="\sqrt{3m+1}=\tfrac m2+1" /> are positive for <Katex tex="m>0" />, so nothing is lost or gained.</>,
  },
  {
    working: <Katex display tex="0=\frac{m^2}{4}-2m \implies 0=m^2-8m=m(m-8)" />,
    reason: <>Collect terms and multiply by 4, then factorise.</>,
  },
  {
    working: <Katex display tex="m=0\ \text{ or }\ m=8" />,
    reason: <>Reject <Katex tex="m=0" />: the interval <Katex tex="[0,0]" /> has no width, and the formula divides by <Katex tex="m" />.</>,
  },
  {
    working: <Katex display tex="\boxed{m=8}" />,
    reason: <>Check: <Katex tex="\tfrac18\cdot\tfrac23\left(\sqrt{25}-1\right)=\tfrac18\cdot\tfrac23\cdot4=\tfrac13" />.</>,
    more: <>Plausibility: <Katex tex="f" /> falls from <Katex tex="f(0)=1" /> to <Katex tex="f(8)=\tfrac15" />, so an average of <Katex tex="\tfrac13" />, between those, makes sense.</>,
  },
]

export default function MethodsQ8_2024NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 8 (4 marks)</p>
        <p>
          Let <Katex tex="f:\left(-\tfrac13,\infty\right)\to R,\ f(x)=\dfrac{1}{\sqrt{3x+1}}" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Antiderivative"
        marks={1}
        statement={<>Find an anti-derivative for <Katex tex="f(x)" />.</>}
        examinerReport={REPORT_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Average Value"
        marks={3}
        statement={
          <>
            The average value of the function, <Katex tex="f" />, over <Katex tex="0\le x\le m" /> is{' '}
            <Katex tex="\dfrac13" />.
            <br />
            Find the value of <Katex tex="m" />.
          </>
        }
        examinerReport={REPORT_B}
      >
        <Background>
          <p>
            The average value of <Katex tex="f" /> on <Katex tex="[a,b]" /> is the height of the rectangle on the same
            base with the same area as the region under the curve: <Katex tex="\tfrac{1}{b-a}\int_a^b f(x)\,dx" />. It
            is an average of the function&apos;s <em>values</em>, not the average rate of change{' '}
            <Katex tex="\tfrac{f(b)-f(a)}{b-a}" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
