// 2025 Mathematical Methods NHT — Exam 1, Question 4 (5 marks). The NHT report gives sample
// answers only, with no statistics; its notes on each part are quoted as the examiner comments.
// Bruised apples, p = 1/3: a. a binomial probability, Pr(X = 3) for n = 4; b. the sample
// proportion of a sample of 10, Pr(P̂ ≤ 1/10) = Pr(Y ≤ 1), simplified to the form 2^m/3^n.
// Question text transcribed from the original paper (read from the page images — the 2025 paper
// has no text layer). Answers checked with sympy and against the VCAA report's sample answers
// (8/81 and 2¹¹/3⁹). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const REPORT_A: SAExaminerStats = {
  comment: (
    <>
      This question could be attempted by setting up a binomial probability distribution or by using a tree diagram to
      determine the combinations.
    </>
  ),
}

const REPORT_B: SAExaminerStats = {
  comment: (
    <>
      This question involved finding the sum of probabilities. We can define the random variable{' '}
      <Katex tex="\hat P=\dfrac{Y}{10}" />, where <Katex tex="Y" /> is a binomial random variable with parameters{' '}
      <Katex tex="n=10,\ p=\dfrac13" /> and <Katex tex="\Pr\left(\hat P=p\right)=\Pr\left(Y=y\right)" />.
      <br />
      The answer was required to be given in a particular format.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="X\sim\text{Bi}\left(4,\ \frac13\right)" />,
    reason: <>
      Let <Katex tex="X" /> be the number of bruised apples among the four. Each apple is bruised or not, with the same
      chance <Katex tex="\tfrac13" />, and because the orchard has a large number of apples, picking a few barely changes
      that chance, so the apples can be treated as independent trials.
    </>,
  },
  {
    working: <Katex display tex="\Pr(X=3)=\binom43\left(\frac13\right)^3\left(\frac23\right)^1" />,
    reason: <>
      Binomial formula <Katex tex="\Pr(X=x)=\binom nx p^x(1-p)^{n-x}" />: three bruised (each <Katex tex="\tfrac13" />), one not
      bruised (<Katex tex="\tfrac23" />), and <Katex tex="\binom43=4" /> choices for which apple is the unbruised one.
    </>,
  },
  {
    working: <Katex display tex="=4\times\frac{1}{27}\times\frac23" />,
  },
  {
    working: <Katex display tex="\boxed{\Pr(X=3)=\frac{8}{81}}" />,
    reason: <>
      About 0.099. Plausible: three out of four is well above the expected <Katex tex="4\times\tfrac13\approx1.3" /> bruised
      apples, so it should be fairly unlikely.
    </>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="Y\sim\text{Bi}\left(10,\ \frac13\right),\qquad \hat P=\frac{Y}{10}" />,
    reason: <>
      <Katex tex="\hat P" /> is the proportion of bruised apples in a sample of 10, so it is the number bruised,{' '}
      <Katex tex="Y" />, divided by 10. <Katex tex="Y" /> is binomial for the same reasons as in part a.
    </>,
  },
  {
    working: <Katex display tex="\Pr\left(\hat P\le\frac1{10}\right)=\Pr\left(\frac{Y}{10}\le\frac1{10}\right)=\Pr(Y\le1)" />,
    reason: <>Convert the proportion into a count by multiplying by the sample size: a proportion of at most <Katex tex="\tfrac1{10}" /> means at most 1 bruised apple out of 10.</>,
  },
  {
    working: <Katex display tex="=\Pr(Y=0)+\Pr(Y=1)" />,
    reason: <><Katex tex="Y" /> counts apples, so it can only be a whole number from 0 to 10. &ldquo;At most 1&rdquo; is 0 or 1.</>,
  },
  {
    working: <Katex display tex="=\binom{10}{0}\left(\frac13\right)^0\left(\frac23\right)^{10}+\binom{10}{1}\left(\frac13\right)^1\left(\frac23\right)^{9}" />,
  },
  {
    working: <Katex display tex="=\frac{2^{10}}{3^{10}}+10\times\frac13\times\frac{2^9}{3^9}=\frac{2\times2^9+10\times2^9}{3^{10}}" />,
    reason: <>Write both terms over the common denominator <Katex tex="3^{10}" />, and split <Katex tex="2^{10}=2\times2^9" /> so that <Katex tex="2^9" /> is a common factor on top.</>,
  },
  {
    working: <Katex display tex="=\frac{2^9\times12}{3^{10}}=\frac{2^9\times2^2\times3}{3^{10}}" />,
    reason: <>Take out the <Katex tex="2^9" />: <Katex tex="2+10=12" />. Then factorise 12 into powers of 2 and 3, the only bases the required form allows.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr\left(\hat P\le\frac1{10}\right)=\frac{2^{11}}{3^{9}}}" />,
    reason: <>
      Index laws: <Katex tex="2^9\times2^2=2^{11}" />, and one 3 cancels from <Katex tex="3^{10}" />. So <Katex tex="m=11" />,{' '}
      <Katex tex="n=9" />, positive integers as required.
    </>,
    more: <>
      Check the size: <Katex tex="\tfrac{2048}{19683}\approx0.104" />. The expected number bruised is{' '}
      <Katex tex="10\times\tfrac13\approx3.3" />, so having at most one is unlikely, around 1 in 10.
    </>,
  },
]

export default function MethodsQ4_2025NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (5 marks)</p>
        <p>An orchard contains a large number of apples. One third of the apples are bruised.</p>
      </div>

      <PartCard
        letter="a"
        topic="Binomial Probability"
        marks={2}
        statement={<>In a random sample of four apples, find the probability that exactly three are bruised.</>}
        examinerReport={REPORT_A}
      >
        <WorkingTable rows={ROWS_A} />
        <WrongMethod
          title="Leave out the number of arrangements"
          working={<Katex display tex="\left(\frac13\right)^3\left(\frac23\right)=\frac{2}{81}" />}
        >
          That is the probability of one particular order, say bruised, bruised, bruised, then unbruised. The unbruised apple
          could be any of the four, giving four equally likely orders, which is what <Katex tex="\binom43" /> counts. A tree
          diagram shows the four branches explicitly.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Sample Proportion"
        marks={3}
        statement={
          <>
            Let <Katex tex="\hat P" /> be the random variable representing the proportion of bruised apples in random samples of
            10 apples from the orchard.
            <br />
            Find <Katex tex="\Pr\left(\hat P\le\dfrac{1}{10}\right)" />.
            <br />
            Give your answer in the form <Katex tex="\dfrac{2^m}{3^n}" />, where <Katex tex="m" /> and <Katex tex="n" /> are
            positive integers.
          </>
        }
        examinerReport={REPORT_B}
      >
        <Background>
          <p>
            A sample proportion is a count in disguise: <Katex tex="\hat P=\tfrac{X}{n}" />, where <Katex tex="X" /> is the number
            of &ldquo;successes&rdquo; in the sample. For a small sample, the exact probabilities come from the binomial
            distribution of <Katex tex="X" />: turn every statement about <Katex tex="\hat P" /> into one about <Katex tex="X" /> by
            multiplying by <Katex tex="n" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
