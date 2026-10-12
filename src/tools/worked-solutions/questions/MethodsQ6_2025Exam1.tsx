// 2025 Mathematical Methods — Exam 1 Question 6 (3 marks). A binomial variance, then an
// upper-tail probability forced into a power-of-two form. Question text transcribed from
// the original paper. Answers checked with sympy and against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [27, 73],
  average: 0.8,
  comment: (
    <>
      This question was well answered. Common mistakes included finding the standard deviation
      instead of the variance and incorrect multiplication of the fractions.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [31, 35, 34],
  average: 1.0,
  comment: (
    <>
      Many students correctly stated the binomial expansion sum with appropriate probability
      values and powers. The answer was required to be stated in a particular form, but some
      students were not able to reduce 4096 down to the prime factorisation of{' '}
      <Katex tex="2^{12}" />. Instead, many students gave the answer as{' '}
      <Katex tex="\dfrac{19}{4^6}" />. Many students calculated only one term,{' '}
      <Katex tex="\Pr(X=5)" />, instead of evaluating <Katex tex="\Pr(X=5)+\Pr(X=6)" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="X\sim\text{Bi}(6,\tfrac14) \implies \text{var}(X) = np(1-p)" />,
    reason: <>The binomial variance formula (on the formula sheet).</>,
  },
  {
    working: <Katex display tex="= 6\times\tfrac14\times\tfrac34" />,
    reason: <>Here <Katex tex="n=6" />, <Katex tex="p=\tfrac14" /> and <Katex tex="1-p=\tfrac34" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{var}(X) = \frac{18}{16} = \frac98}" />,
    reason: <>Multiply the numerators (<Katex tex="6\times1\times3=18" />) and the denominators (<Katex tex="4\times4=16" />), then simplify. No square root — that would be the standard deviation.</>,
    more: (
      <>
        The report names two common mistakes. One was giving the standard deviation{' '}
        <Katex tex="\text{sd}(X)=\sqrt{\tfrac98}=\tfrac{3\sqrt2}{4}" /> instead of the variance.
        The other was multiplying the fractions incorrectly. Remember the whole number 6 goes on
        top, e.g. <Katex tex="6\times\tfrac14=\tfrac64" />, not <Katex tex="\tfrac{6}{24}" />. Any equivalent form of the answer is fine; the report
        gives <Katex tex="\tfrac98=1\tfrac18=1.125" />.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X\ge5) = \Pr(X=5)+\Pr(X=6)" />,
    reason: <>With 6 trials, <Katex tex="X" /> is at most 6, so <Katex tex="X\ge5" /> means <Katex tex="X=5" /> or <Katex tex="X=6" /> — two terms.</>,
    more: (
      <>
        The report notes many students calculated only <Katex tex="\Pr(X=5)" />. The sign is{' '}
        <Katex tex="\ge" />, so 5 itself is included, and so is every value above it up to{' '}
        <Katex tex="n=6" />. Using <Katex tex="1-\Pr(X\le4)" /> gives the same answer but needs
        five terms instead of two.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} \Pr(X=5) &= \binom{6}{5}\left(\tfrac14\right)^5\left(\tfrac34\right)^1 \\ &= 6\times\frac{1}{1024}\times\frac34 = \frac{18}{4096} \end{aligned}" />,
    reason: <>Binomial formula <Katex tex="\Pr(X=x)=\binom{n}{x}p^x(1-p)^{n-x}" /> with <Katex tex="x=5" />. Leave it over <Katex tex="4^6=4096" />; don't cancel yet, so it adds straight to <Katex tex="\Pr(X=6)=\tfrac{1}{4096}" />.</>,
    more: (
      <>
        <Katex tex="\binom{6}{5}=6" /> (choose which 5 of the 6 trials are the successes), and{' '}
        <Katex tex="4^5\times4=4^6=4096" />. Cancelling to <Katex tex="\tfrac{9}{2048}" /> would only have to be
        undone before adding. Writing it as{' '}
        <Katex tex="\tfrac{6\times3}{4^6}" />, as the report does, is just as good.
      </>
    ),
  },
  {
    working: <Katex display tex="\Pr(X=6) = \left(\tfrac14\right)^6 = \frac{1}{4096}" />,
    reason: <>All six trials are successes: <Katex tex="\binom{6}{6}=1" /> and <Katex tex="\left(\tfrac34\right)^0=1" />.</>,
  },
  {
    working: <Katex display tex="\Pr(X\ge5) = \frac{18+1}{4096} = \frac{19}{4096}" />,
    reason: <>Adding over the common denominator.</>,
  },
  {
    working: <Katex display tex="4096 = 4^6 = \left(2^2\right)^6 = 2^{12}" />,
    reason: <>The required form has a power of <b>2</b> underneath, so rewrite 4096 using <Katex tex="4=2^2" />.</>,
    more: (
      <>
        The report notes many students gave <Katex tex="\tfrac{19}{4^6}" /> instead. That is the
        right value, but it is not in the required form <Katex tex="\tfrac{a}{2^b}" />, so it would
        not have earned full marks. Because 19 is odd, the fraction cannot be simplified, so <Katex tex="a=19" />,{' '}
        <Katex tex="b=12" /> is the natural answer.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\Pr(X\ge5) = \frac{19}{2^{12}}}" />,
    reason: <>So <Katex tex="a=19" /> and <Katex tex="b=12" />, both integers as required.</>,
  },
]

export default function MethodsQ6_2025Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 6 (3 marks)</p>
        <p>
          Consider the binomial random variable{' '}
          <Katex tex="X\sim\text{Bi}\!\left(6,\tfrac14\right)" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              The requested form <Katex tex="\tfrac{a}{2^b}" /> is a hint, not decoration. With{' '}
              <Katex tex="p=\tfrac14" /> every probability is something over a power of 4, and{' '}
              <Katex tex="4=2^2" />, so the answer will be something over a power of 2 once the powers of
              4 are rewritten.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard letter="a" topic="Binomial Variance" marks={1} statement={<>Find <Katex tex="\text{var}(X)" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Binomial Distribution"
        marks={2}
        statement={
          <>
            Determine <Katex tex="\Pr(X\ge5)" />.
            <br />
            Give your answer in the form{' '}
            <Katex tex="\dfrac{a}{2^b}" />, where <Katex tex="a,b\in Z" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
