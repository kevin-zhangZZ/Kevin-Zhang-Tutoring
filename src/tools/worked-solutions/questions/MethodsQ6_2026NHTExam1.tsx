// 2026 Mathematical Methods NHT — Exam 1, Question 6 (2 marks). The NHT report gives sample
// answers only, with no statistics; its note on the question is quoted as the examiner comment.
// A conditional probability for a normal variable in terms of m = Pr(X < a) and n = Pr(X < b):
// Pr(X > a | X < b) = (n − m)/n. Question text transcribed from the original paper (no diagram).
// The shaded normal curve is this site's own explanatory figure (the report prints a similar one
// with its sample answer). Answer checked against the VCAA report's sample answer ((n − m)/n, or
// 1 − m/n). Solution is original.

import Katex from '../../../components/Katex'
import { Background, ReportShelf, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import normalSrc from './meth-2026nhte1-q6-normal.png'

const REPORT: SAExaminerStats = {
  comment: (
    <>
      This question involved the calculation of a conditional probability. Initially there needed to be evidence of the
      calculation of either <Katex tex="\Pr(a<X<b)" /> on the numerator or <Katex tex="\Pr(X<b)" /> on the denominator. A
      graph could be drawn to indicate the required intersection. The answer could be given in either form.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X>a\mid X<b)=\frac{\Pr(X>a\,\cap\,X<b)}{\Pr(X<b)}" />,
    reason: <>
      The conditional probability rule from the formula sheet, <Katex tex="\Pr(A\mid B)=\tfrac{\Pr(A\cap B)}{\Pr(B)}" />, with
      the given condition <Katex tex="X<b" /> as <Katex tex="B" />.
    </>,
  },
  {
    working: <Katex display tex="=\frac{\Pr(a<X<b)}{\Pr(X<b)}" />,
    reason: <>
      &ldquo;Greater than <Katex tex="a" /> and less than <Katex tex="b" />&rdquo; is the interval between them, which is
      not empty because <Katex tex="a<b" />.
    </>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={normalSrc}
          alt="This site's own sketch of a normal curve with points a and b marked on the horizontal axis, a to the left of b: the area to the left of a is shaded blue and labelled m, the area between a and b is shaded orange and labelled n − m"
          className="w-full max-w-[400px]"
        />
      </div>
    ),
    reason: <>
      Everything to the left of <Katex tex="b" /> has area <Katex tex="n" />. Take away the blue part to the left of{' '}
      <Katex tex="a" />, area <Katex tex="m" />, and the orange strip between <Katex tex="a" /> and <Katex tex="b" /> is
      left.
    </>,
  },
  {
    working: <Katex display tex="\begin{aligned}\Pr(a<X<b)&=\Pr(X<b)-\Pr(X<a)\\ &=n-m\end{aligned}" />,
    reason: <>The numerator, read off the picture.</>,
    more: <>
      For a continuous variable like the normal, <Katex tex="\Pr(X=a)=0" />, so it doesn&apos;t matter whether the
      inequalities are strict.
    </>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(X>a\mid X<b)=\frac{n-m}{n}}" />,
    reason: <>
      The denominator is <Katex tex="\Pr(X<b)=n" />. The report accepts <Katex tex="1-\tfrac mn" /> too.
    </>,
    more: <>
      Sanity check: since <Katex tex="a<b" />, <Katex tex="m<n" />, so the answer is between 0 and 1, as a probability
      must be. Nothing here used the normal shape: the same answer holds for any continuous random variable.
    </>,
  },
]

export default function MethodsQ6_2026NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 6 (2 marks)</p>
        <p>
          Let <Katex tex="X" /> be a normal random variable.
        </p>
        <p>
          Let <Katex tex="a" /> and <Katex tex="b" /> be real numbers, where <Katex tex="a<b" />.
        </p>
        <p>
          If <Katex tex="\Pr(X<a)=m" /> and <Katex tex="\Pr(X<b)=n" />, find, in terms of <Katex tex="m" /> and{' '}
          <Katex tex="n" />, <Katex tex="\Pr(X>a\mid X<b)" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            A conditional probability shrinks the sample space to the condition. Once you know <Katex tex="X<b" />, only
            the area to the left of <Katex tex="b" /> is in play, and the question becomes: what fraction of that area is
            also to the right of <Katex tex="a" />? Draw the curve and shade both regions before writing any algebra.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <WrongMethod
          title="Use 1 − m for Pr(X > a) in the numerator"
          working={<Katex display tex="\Pr(X>a\mid X<b)=\frac{1-m}{n}" />}
        >
          The numerator is the <em>intersection</em> of <Katex tex="X>a" /> and <Katex tex="X<b" />, not{' '}
          <Katex tex="\Pr(X>a)" /> alone. <Katex tex="1-m" /> includes the right-hand tail beyond <Katex tex="b" />, which the
          condition has ruled out. It can even give an answer bigger than 1.
        </WrongMethod>
        <ReportShelf stats={REPORT} maxMarks={2} />
      </div>
    </div>
  )
}
