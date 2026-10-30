// 2024 Mathematical Methods NHT — Exam 1, Question 7 (3 marks). The NHT report gives sample
// answers only, with no statistics; its note on part b. (setting up a conditional probability)
// is quoted as that part's examiner comment. A discrete random variable on the positive integers
// with Pr(X = x) = 2/3^x: one probability, then a conditional probability using the complement
// for the infinite denominator. Question text transcribed from the original paper. Answers
// checked with sympy (including that the probabilities sum to 1) and against the VCAA report's
// sample answers (2/81; 8/9). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT_B: SAExaminerStats = {
  comment: <>This question involved setting up and calculating a conditional probability.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X=4)=\frac{2}{3^4}" />,
    reason: <>Substitute <Katex tex="x=4" /> into the probability mass function; 4 is a positive integer, so it is a possible value.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(X=4)=\frac{2}{81}}" />,
    reason: <><Katex tex="3^4=81" />. Sanity check: the probabilities <Katex tex="\tfrac23,\tfrac29,\tfrac2{27},\tfrac2{81},\ldots" /> shrink by a factor of 3 each time, and this one is small, about 0.025.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}\Pr(X<4\mid X\ge2)&=\frac{\Pr(X<4\cap X\ge2)}{\Pr(X\ge2)}\\ &=\frac{\Pr(2\le X\le3)}{\Pr(X\ge2)}\end{aligned}" />,
    reason: <>The conditional probability formula <Katex tex="\Pr(A\mid B)=\tfrac{\Pr(A\cap B)}{\Pr(B)}" />. Here <Katex tex="A" /> is <Katex tex="X<4" /> and <Katex tex="B" /> is the given condition <Katex tex="X\ge2" />. <Katex tex="X" /> takes only whole-number values, so both hold for <Katex tex="X=2" /> and <Katex tex="X=3" /> only.</>,
  },
  {
    working: <Katex display tex="\Pr(2\le X\le3)=\frac{2}{9}+\frac{2}{27}=\frac{6+2}{27}=\frac{8}{27}" />,
    reason: <><Katex tex="\Pr(X=2)=\tfrac2{3^2}" /> and <Katex tex="\Pr(X=3)=\tfrac2{3^3}" />; use the common denominator 27.</>,
  },
  {
    working: <Katex display tex="\Pr(X\ge2)=1-\Pr(X=1)=1-\frac23=\frac13" />,
    reason: <><Katex tex="X\ge2" /> has infinitely many values, so don&apos;t add them up. Use the complement (all probabilities add to 1, so subtract the values you don&apos;t want): the only value <Katex tex="X\ge2" /> leaves out is <Katex tex="X=1" />.</>,
    more: <>This relies on the probabilities adding to 1, which they do: <Katex tex="\tfrac23+\tfrac29+\tfrac2{27}+\ldots" /> is a geometric series with sum <Katex tex="\tfrac{2/3}{1-1/3}=1" />. You aren&apos;t expected to show this; it is given that the rule is a probability mass function.</>,
  },
  {
    working: <Katex display tex="\Pr(X<4\mid X\ge2)=\frac{8/27}{1/3}=\frac{8}{27}\times3" />,
    reason: <>Dividing by <Katex tex="\tfrac13" /> is multiplying by 3.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(X<4\mid X\ge2)=\frac{8}{9}}" />,
    reason: <>Sanity check: given <Katex tex="X\ge2" />, values 2 and 3 carry most of the remaining probability (each value is a third as likely as the one before), so a probability close to 1 is plausible.</>,
  },
]

export default function MethodsQ7_2024NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 7 (3 marks)</p>
        <p>
          Let <Katex tex="X" /> be a discrete random variable with a probability mass function of{' '}
          <Katex tex="\Pr(X=x)=\dfrac{2}{3^x}" />, where <Katex tex="x\in Z^+" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Discrete Distribution"
        marks={1}
        statement={<>Find <Katex tex="\Pr(X=4)" />.</>}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Conditional Probability"
        marks={2}
        statement={<>Find <Katex tex="\Pr(X<4\mid X\ge2)" />.</>}
        examinerReport={REPORT_B}
      >
        <Background>
          <p>
            &ldquo;Given <Katex tex="X\ge2" />&rdquo; shrinks the sample space to the values 2, 3, 4, …; the
            conditional probability is the share of that reduced space where <Katex tex="X<4" /> also holds. That is why
            the denominator is <Katex tex="\Pr(X\ge2)" />, not 1.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <WrongMethod
          title="Use only the numerator"
          working={<Katex display tex="\begin{aligned}&\Pr(X<4\mid X\ge2)\\ &=\Pr(X=2)+\Pr(X=3)\\ &=\frac{8}{27}\end{aligned}" />}
        >
          That is <Katex tex="\Pr(2\le X\le3)" />, the probability of both events together. The condition{' '}
          <Katex tex="X\ge2" /> means you must divide by <Katex tex="\Pr(X\ge2)=\tfrac13" />.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
