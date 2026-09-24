// 2022 Mathematical Methods — Exam 2, Section B Question 3 (14 marks). Coin flips: a
// binomial, a quadratic density function fixed by three integrals, and a sample
// proportion. Question text transcribed from the original paper. Answers checked with
// sympy/scipy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'

const EXAM_AI: SAExaminerStats = {
  marks: [10, 90],
  average: 0.9,
  comment: (
    <>
      This question was done well. An exact answer was required. Some students rounded their
      answer to 0.0313 or had their technology on the wrong float. 0.3125 was sometimes seen.
    </>
  ),
}

const EXAM_AII: SAExaminerStats = {
  marks: [15, 85],
  average: 0.9,
  comment: (
    <>
      An exact answer was required. Some students rounded their answer to 0.813. Common
      incorrect answers were <Katex tex="\tfrac12" /> or <Katex tex="\tfrac{1}{16}" />.
    </>
  ),
}

const EXAM_AIII: SAExaminerStats = {
  marks: [14, 36, 50],
  average: 1.4,
  comment: (
    <>
      Many students had the correct denominator but evaluated{' '}
      <Katex tex="\Pr(2\le X\le5)" /> in the numerator. Some rounded their answer to 0.8065
      and others gave exact answers.
    </>
  ),
}

const EXAM_AIV: SAExaminerStats = {
  marks: [21, 22, 57],
  average: 1.4,
  comment: (
    <>
      Many students were able to find <Katex tex="\mathrm{E}(X)" />. Some wrote down the
      variance instead of the standard deviation.
      <br />
      Common incorrect answers for the standard deviation were{' '}
      <Katex tex="\tfrac{\sqrt5}{4}" /> or 1.118. An exact answer was required.
      <br />
      Some students set up a table of values rather than using the formulas{' '}
      <Katex tex="\mathrm{E}(X)=np" /> and <Katex tex="\mathrm{sd}(X)=\sqrt{np(1-p)}" />. This
      would have been time consuming. Other students found the mean and standard deviation of
      the sample proportion.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [62, 38],
  average: 0.4,
  comment: (
    <>
      This question was not answered well. Many students gave{' '}
      <Katex tex="\displaystyle\int_{1.5}^{3}f(h)\,dh=\frac{63a}{8}+\frac{27b}{8}+\frac{3c}{2}" /> as
      the answer.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [41, 14, 11, 34],
  average: 1.4,
  comment: (
    <>
      Exact values were required. Some students had <Katex tex="c=-2.783" />. Others set up
      the definite integrals correctly but did not find the answers.
    </>
  ),
}

const EXAM_BIII: SAExaminerStats = {
  marks: [94, 6],
  average: 0.1,
  comment: (
    <>
      This question was not answered well. Many students did not attempt it. Some wrote{' '}
      <Katex tex="r=1" /> and <Katex tex="s=3" />.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [32, 68],
  average: 0.7,
  comment: <>This question was answered well.</>,
}

const EXAM_CII: SAExaminerStats = {
  marks: [34, 66],
  average: 0.7,
  comment: (
    <>
      This question was answered well. There were some rounding errors. Some students used
      the formula on the formula sheet but this was not necessary and would have been time
      consuming. Others did not give their answer as an interval.
    </>
  ),
}

const EXAM_CIII: SAExaminerStats = {
  marks: [72, 28],
  average: 0.3,
  comment: <>Common incorrect answers were 0, 10, 11, 50 and 101.</>,
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="X \sim \mathrm{Bi}\!\left(5,\tfrac12\right) \implies \Pr(X=5) = \left(\tfrac12\right)^5" />,
    reason: <>All five flips must be heads.</>,
  },
  {
    working: <Katex display tex="\boxed{\tfrac{1}{32} = 0.03125}" />,
    reason: <>Exact, as required.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X\ge2) = 1-\Pr(X=0)-\Pr(X=1)" />,
    reason: <>Two terms in the complement rather than four in the tail.</>,
  },
  {
    working: <Katex display tex="= 1-\tfrac{1}{32}-\tfrac{5}{32} = \tfrac{26}{32}" />,
    reason: <><Katex tex="\binom51=5" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\tfrac{13}{16} = 0.8125}" />,
    reason: <>Exact.</>,
  },
]

const ROWS_AIII: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X\ge2\mid X<5) = \frac{\Pr(2\le X\le4)}{\Pr(X\le4)}" />,
    reason: <>The intersection of <Katex tex="X\ge2" /> and <Katex tex="X<5" /> is <Katex tex="2\le X\le4" /> — the report notes many students evaluated <Katex tex="\Pr(2\le X\le5)" /> in the numerator.</>,
  },
  {
    working: <Katex display tex="\Pr(2\le X\le4) = \tfrac{26}{32}-\tfrac{1}{32} = \tfrac{25}{32}" />,
    reason: <>Part a.ii. minus the <Katex tex="X=5" /> term.</>,
  },
  {
    working: <Katex display tex="\Pr(X\le4) = 1-\tfrac{1}{32} = \tfrac{31}{32}" />,
    reason: <>The complement of all heads.</>,
  },
  {
    working: <Katex display tex="\frac{25/32}{31/32} = \frac{25}{31} = 0.80645\ldots" />,
    reason: <>The 32s cancel.</>,
  },
  {
    working: <Katex display tex="\boxed{0.806}" />,
    reason: <>To three decimal places, as asked.</>,
  },
]

const ROWS_AIV: WorkingRow[] = [
  {
    working: <Katex display tex="E(X) = np = 5\times\tfrac12 = \boxed{2.5}" />,
    reason: <>The binomial mean.</>,
  },
  {
    working: <Katex display tex="\mathrm{Var}(X) = np(1-p) = 5\times\tfrac12\times\tfrac12 = \tfrac54" />,
    reason: <>The <em>variance</em> — the report notes some wrote this down instead of the standard deviation.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{sd}(X) = \frac{\sqrt5}{2}}" />,
    reason: <>Exact, as required: <Katex tex="\sqrt{5/4}=\tfrac{\sqrt5}{2}\approx1.118" />.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="f \text{ is a probability density function}" />,
    reason: <>The question gives the terminals 1.5 and 3, which are exactly where <Katex tex="f" /> is non-zero.</>,
  },
  {
    working: <Katex display tex="\boxed{\int_{1.5}^{3}f(h)\,dh = 1}" />,
    reason: <>No integration is required at all. Evaluating the integral in terms of <Katex tex="a,b,c" /> — the report notes many students did this — answers a question that was not asked, and is the first of the three equations in part b.ii.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\int_{1.5}^{3}\left(ah^2+bh+c\right)dh = 1" />,
    reason: <>Three unknowns, so three equations are needed.</>,
  },
  {
    working: <Katex display tex="\Pr(H<2) = \int_{1.5}^{2}f(h)\,dh = 0.35" />,
    reason: <>The second condition.</>,
  },
  {
    working: <Katex display tex="\Pr(H>2.5) = \int_{2.5}^{3}f(h)\,dh = 0.25" />,
    reason: <>The third. Note the <em>upper</em> tail, so the terminals run from 2.5 to 3.</>,
  },
  {
    working: <Cas fn="solve">solve({'{'}eq1, eq2, eq3{'}'}, {'{'}a, b, c{'}'})</Cas>,
    reason: <>A linear system in the three unknowns.</>,
  },
  {
    working: <Katex display tex="\boxed{a = -\tfrac45, \quad b = \tfrac{17}{5}, \quad c = -\tfrac{167}{60}}" />,
    reason: <>Exact values were required: <Katex tex="-\tfrac{167}{60}=-2.78\dot3" />, and the report notes some students gave <Katex tex="c=-2.783" />.</>,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="d = 3-h \implies h = 3-d" />,
    reason: <>The ceiling is at 3 m, so the gap above the coin is 3 minus the height reached.</>,
  },
  {
    working: <Katex display tex="g(d) = f(3-d) = f(rd+s)" />,
    reason: <>Comparing with the given form.</>,
  },
  {
    working: <Katex display tex="\boxed{r = -1, \quad s = 3}" />,
    reason: <>The <em>negative</em> <Katex tex="r" /> is the whole point: a larger height means a smaller gap, so the transformation reflects as well as translates. Check the support: <Katex tex="1.5\le3-d\le3" /> gives <Katex tex="0\le d\le1.5" />.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="\hat P = \frac{X}{25} \text{ where } X \in \{0,1,\ldots,25\}" />,
    reason: <>A count divided by a fixed number.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{discrete: } \hat P \text{ can only take the 26 values } 0,\ \tfrac{1}{25},\ \tfrac{2}{25},\ \ldots,\ 1}" />,
    reason: <>Countably many values, so discrete — and the question asks for this justification.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\hat p \pm 1.96\sqrt{\frac{\hat p(1-\hat p)}{n}}, \quad \hat p = 0.4, \ n = 25" />,
    reason: <>The approximate confidence interval from the formula sheet.</>,
  },
  {
    working: <Katex display tex="\sqrt{\frac{0.4\times0.6}{25}} = 0.09798, \quad 1.96\times0.09798 = 0.19204" />,
    reason: <>The margin of error.</>,
  },
  {
    working: <Katex display tex="\boxed{(0.208,\ 0.592)}" />,
    reason: <>To three decimal places, and stated as an <em>interval</em>.</>,
  },
]

const ROWS_CIII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{width} \propto \frac{1}{\sqrt n}" />,
    reason: <>The margin of error carries a <Katex tex="\sqrt n" /> in the denominator, and <Katex tex="\hat p" /> is unchanged.</>,
  },
  {
    working: <Katex display tex="\text{halve the width} \implies \sqrt n \text{ doubles} \implies n \text{ quadruples}" />,
    reason: <>The key relationship — halving the width is not the same as halving or doubling the sample.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 4\times25 = 100}" />,
    reason: <>Check: <Katex tex="1.96\sqrt{\tfrac{0.24}{100}}=0.0960" />, exactly half of <Katex tex="0.1920" />.</>,
  },
]

export default function MethodsQ3_2022Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (14 marks)</p>
        <p>
          Mika is flipping a coin. The unbiased coin has a probability of{' '}
          <Katex tex="\tfrac12" /> of landing on heads and <Katex tex="\tfrac12" /> of
          landing on tails.
          <br />
          Let <Katex tex="X" /> be the binomial random variable representing the number of
          times that the coin lands on heads.
          <br />
          Mika flips the coin five times.
        </p>
      </div>

      <PartCard letter="a.i" topic="Binomial Distribution" marks={1} statement={<>Find <Katex tex="\Pr(X=5)" />.</>} examinerReport={EXAM_AI}>
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard letter="a.ii" topic="Binomial Distribution" marks={1} statement={<>Find <Katex tex="\Pr(X\ge2)" />.</>} examinerReport={EXAM_AII}>
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <PartCard
        letter="a.iii"
        topic="Conditional Binomial"
        marks={2}
        statement={
          <>
            Find <Katex tex="\Pr(X\ge2\mid X<5)" />, correct to three decimal places.
          </>
        }
        examinerReport={EXAM_AIII}
      >
        <WorkingTable rows={ROWS_AIII} />
      </PartCard>

      <PartCard
        letter="a.iv"
        topic="Mean & SD"
        marks={2}
        statement={
          <>
            Find the expected value and the standard deviation for <Katex tex="X" />.
          </>
        }
        examinerReport={EXAM_AIV}
      >
        <WorkingTable rows={ROWS_AIV} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p>
          The height reached by each of Mika's coin flips is given by a continuous random
          variable, <Katex tex="H" />, with the probability density function
        </p>
        <p className="py-1">
          <Katex
            display
            tex="f(h)=\begin{cases}ah^2+bh+c & 1.5\le h\le3\\[4pt] 0 & \text{elsewhere}\end{cases}"
          />
        </p>
        <p>
          where <Katex tex="h" /> is the vertical height reached by the coin flip, in metres,
          between the coin and the floor, and <Katex tex="a" />, <Katex tex="b" /> and{' '}
          <Katex tex="c" /> are real constants.
        </p>
      </div>

      <PartCard
        letter="b.i"
        topic="Continuous PDF"
        marks={1}
        statement={
          <>
            State the value of the definite integral{' '}
            <Katex tex="\displaystyle\int_{1.5}^{3}f(h)\,dh" />.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Find Parameters"
        marks={3}
        statement={
          <>
            Given that <Katex tex="\Pr(H<2)=0.35" /> and <Katex tex="\Pr(H>2.5)=0.25" />,
            find the values of <Katex tex="a" />, <Katex tex="b" /> and <Katex tex="c" />.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="b.iii"
        topic="Transformed PDF"
        marks={1}
        statement={
          <>
            The ceiling of Mika's room is 3 m above the floor. The minimum distance between
            the coin and the ceiling is a continuous random variable, <Katex tex="D" />, with
            probability density function <Katex tex="g" />.
            <br />
            The function <Katex tex="g" /> is a transformation of the function{' '}
            <Katex tex="f" /> given by <Katex tex="g(d)=f(rd+s)" />, where <Katex tex="d" /> is
            the minimum distance between the coin and the ceiling, and <Katex tex="r" /> and{' '}
            <Katex tex="s" /> are real constants.
            <br />
            Find the values of <Katex tex="r" /> and <Katex tex="s" />.
          </>
        }
        examinerReport={EXAM_BIII}
      >
        <WorkingTable rows={ROWS_BIII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Mika's sister Bella also has a coin. On each flip, Bella's coin has a probability
          of <Katex tex="p" /> of landing on heads and <Katex tex="(1-p)" /> of landing on
          tails, where <Katex tex="p" /> is a constant value between 0 and 1.
          <br />
          Bella flips her coin 25 times in order to estimate <Katex tex="p" />.
          <br />
          Let <Katex tex="\hat P" /> be the random variable
          representing the proportion of times that Bella's coin lands on heads in her
          sample.
        </p>
      </div>

      <PartCard
        letter="c.i"
        topic="Sample Proportion"
        marks={1}
        statement={
          <>
            Is the random variable <Katex tex="\hat P" /> discrete or continuous? Justify
            your answer.
          </>
        }
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Confidence Interval"
        marks={1}
        statement={
          <>
            If <Katex tex="\hat p=0.4" />, find an approximate 95% confidence interval for{' '}
            <Katex tex="p" />, correct to three decimal places.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <PartCard
        letter="c.iii"
        topic="Sample Size"
        marks={1}
        statement={
          <>
            Bella knows that she can decrease the width of a 95% confidence interval by using a
            larger sample of coin flips.
            <br />
            If <Katex tex="\hat p=0.4" />, how many coin flips would be required to halve the
            width of the confidence interval found in part c.ii.?
          </>
        }
        examinerReport={EXAM_CIII}
      >
        <WorkingTable rows={ROWS_CIII} />
      </PartCard>
    </div>
  )
}
