// 2014 Mathematical Methods (CAS) — Exam 2, Section 2 Question 4 (14 marks). A nursery:
// normal-distribution heights, a sine probability density function, a binomial "at least
// one", and a two-state chain of smooth and rough pots. Question text transcribed from the
// original paper (no diagram given). Part g. is a transition-matrix (Markov chain) question,
// which is no longer on the Mathematical Methods study design: its statement is shown, marked
// as such, with no worked solution (KZ's decision, Sept 2026; the skip guide lists it). Answers
// checked with sympy/scipy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'

const EXAM_A: SAExaminerStats = {
  marks: [57, 43],
  average: 0.5,
  comment: (
    <>
      Many students thought 100 mm = 1 cm, giving their final answer as{' '}
      <Katex tex="1913" /> mm. Others had incorrect units, such as{' '}
      <Katex tex="19.1" /> mm. Some entered the incorrect probability into their technology.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [40, 13, 47],
  average: 1.1,
  comment: (
    <>
      Some students had incorrect working, such as{' '}
      <Katex tex="\Pr(X<9)=0.10565\ldots=0.10565\ldots\times2000=211" /> basil plants. Some
      students used <Katex tex="\Pr(X<8.9)" /> or <Katex tex="\Pr(X<8)" />. Some rounded
      incorrectly. Some used technology syntax in their working. Correct mathematical notation
      was required. Other students complicated the question by using <Katex tex="z" /> values.
      Many of these attempts were unsuccessful.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [27, 73],
  average: 0.8,
  comment: (
    <>
      This question was answered well. Some students used the median formula. Others used
      their technology in degrees rather than radians.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [60, 15, 25],
  average: 0.7,
  comment: (
    <>
      Some students attempted to use the normal distribution to answer this question. Some
      had incorrect units or conversions.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [63, 14, 23],
  average: 0.6,
  comment: (
    <>
      Many students did not know to use the binomial distribution and others used the
      inequality sign incorrectly. Many different approaches could have been used. Many
      different approaches were used, including trial and error.
    </>
  ),
}

const EXAM_FI: SAExaminerStats = {
  marks: [43, 7, 50],
  average: 1.1,
  comment: (
    <>
      Students who used a tree diagram often gave the correct answer.{' '}
      <Katex tex="\begin{bmatrix}0.7&1-p\\0.3&p\end{bmatrix}^3\begin{bmatrix}1\\0\end{bmatrix}" />{' '}
      or{' '}
      <Katex tex="\begin{bmatrix}0.7&p\\0.3&1-p\end{bmatrix}^2\begin{bmatrix}1\\0\end{bmatrix}" />{' '}
      were common incorrect formulations. Brackets were sometimes omitted, giving the
      incorrect answer <Katex tex="0.7\times0.7+0.3\times1-p=0.79-p" />
    </>
  ),
}

const EXAM_FII: SAExaminerStats = {
  marks: [34, 18, 48],
  average: 1.2,
}


const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="X \sim \mathrm{N}\!\left(14,\,4^2\right)" />,
    reason: <>Heights in centimetres, mean 14, standard deviation 4.</>,
  },
  {
    working: <Katex display tex="\Pr(X>x) = 0.1 \iff \Pr(X<x) = 0.9" />,
    reason: <>"Tallest 10 per cent" is the upper tail, so the inverse-normal needs the 0.9 quantile — entering 0.1 instead is the report's error.</>,
  },
  {
    working: <Cas fn="invNorm">invNorm(0.9, 14, 4)</Cas>,
    reason: <>The inverse normal.</>,
  },
  {
    working: <Katex display tex="x = 19.1262\ldots \text{ cm}" />,
    reason: <>In centimetres, since that is the unit the distribution is given in.</>,
  },
  {
    working: <Katex display tex="\boxed{191\ \text{mm}}" />,
    reason: <>To the nearest millimetre, so convert: <Katex tex="1\ \text{cm}=10\ \text{mm}" />, giving <Katex tex="191.26\ldots" /> mm. The report notes students using <Katex tex="1\ \text{cm}=100\ \text{mm}" /> and answering 1913.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X<9)" />,
    reason: <>"Less than 9 cm in height" — use 9 exactly, not 8.9 or 8.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(-∞, 9, 14, 4)</Cas>,
    reason: <>Write the probability in mathematical notation in your working, not calculator syntax.</>,
  },
  {
    working: <Katex display tex="\Pr(X<9) = 0.105649\ldots" />,
    reason: <>About 10.6% of the plants.</>,
  },
  {
    working: <Katex display tex="0.105649\ldots\times2000 = 211.29\ldots" />,
    reason: <>There are 2000 basil plants in the nursery.</>,
  },
  {
    working: <Katex display tex="\boxed{211 \text{ plants}}" />,
    reason: <>To the nearest whole number — and a whole number is the only sensible answer for a count of plants.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="h(x) = \tfrac{\pi}{100}\sin\!\left(\tfrac{\pi x}{50}\right), \quad 0<x<50" />,
    reason: <>A single arch of a sine curve.</>,
  },
  {
    working: <Katex display tex="h(50-x) = \tfrac\pi{100}\sin\!\left(\pi-\tfrac{\pi x}{50}\right) = h(x)" />,
    reason: <>The density is symmetric about <Katex tex="x=25" />, since <Katex tex="\sin(\pi-\theta)=\sin\theta" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{E}(X) = 25\ \text{cm}}" />,
    reason: <>A symmetric density has its mean at the centre of symmetry — no integration needed, though <Katex tex="\int_0^{50}x\,h(x)\,dx" /> confirms it.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\int_0^a h(x)\,dx = 0.15" />,
    reason: <>The smallest 15% sit below some height <Katex tex="a" />. This is a <em>continuous</em> distribution given by <Katex tex="h" /> — the normal distribution has nothing to do with it.</>,
  },
  {
    working: <Katex display tex="\int_0^a \tfrac\pi{100}\sin\!\left(\tfrac{\pi x}{50}\right)dx = \left[-\tfrac12\cos\!\left(\tfrac{\pi x}{50}\right)\right]_0^a" />,
    reason: <>The chain rule brings out <Katex tex="\tfrac{50}\pi" />, and <Katex tex="\tfrac\pi{100}\times\tfrac{50}\pi=\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="\tfrac12\left(1-\cos\!\left(\tfrac{\pi a}{50}\right)\right) = 0.15" />,
    reason: <>Evaluating, with <Katex tex="\cos(0)=1" />.</>,
  },
  {
    working: <Katex display tex="\cos\!\left(\tfrac{\pi a}{50}\right) = 0.7 \implies \tfrac{\pi a}{50} = 0.795398\ldots" />,
    reason: <>Radians throughout.</>,
  },
  {
    working: <Katex display tex="a = 12.6591\ldots \text{ cm}" />,
    reason: <>Well below the mean of 25, as it should be for the bottom 15%.</>,
  },
  {
    working: <Katex display tex="\boxed{127\ \text{mm}}" />,
    reason: <>To the nearest millimetre.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="Y \sim \mathrm{Bi}(n,\,0.2)" />,
    reason: <>Each plant is independently tall with probability 0.2, and <Katex tex="n" /> are chosen — a binomial.</>,
  },
  {
    working: <Katex display tex="q = \Pr(Y\ge1) = 1-\Pr(Y=0)" />,
    reason: <>"At least one" through the complement, as always.</>,
  },
  {
    working: <Katex display tex="\Pr(Y=0) = 0.8^n" />,
    reason: <>Every one of the <Katex tex="n" /> plants must be regular.</>,
  },
  {
    working: <Katex display tex="1-0.8^n > 0.95 \implies 0.8^n < 0.05" />,
    reason: <>Rearranging — the inequality flips, which the report says students got wrong.</>,
  },
  {
    working: <Katex display tex="n > \frac{\log_e(0.05)}{\log_e(0.8)} = 13.425\ldots" />,
    reason: <>Dividing by <Katex tex="\log_e(0.8)" />, which is <em>negative</em>, reverses the inequality a second time.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 14}" />,
    reason: <>The smallest integer above <Katex tex="13.43" />. Check: <Katex tex="1-0.8^{13}=0.945" /> (not enough) and <Katex tex="1-0.8^{14}=0.956" /> ✓.</>,
  },
]

const ROWS_FI: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(S_1) = 1, \qquad \Pr(S_2) = 0.7" />,
    reason: <>The first pot each week is always smooth, so the second is smooth with probability <Katex tex="0.7" /> outright.</>,
  },
  {
    working: <Katex display tex="\Pr(S_3) = \Pr(S_3\mid S_2)\Pr(S_2)+\Pr(S_3\mid R_2)\Pr(R_2)" />,
    reason: <>Condition on the state of the second pot — the law of total probability, or equivalently a four-branch tree.</>,
  },
  {
    working: <Katex display tex="\Pr(S_3) = (0.7)(0.7)+(1-p)(0.3)" />,
    reason: <>If pot 2 is rough (probability <Katex tex="0.3" />), pot 3 is smooth with probability <Katex tex="1-p" />, since <Katex tex="p" /> is <Katex tex="\Pr(\text{rough}\mid\text{rough})" />. The brackets around <Katex tex="1-p" /> are essential.</>,
  },
  {
    working: <Katex display tex="= 0.49+0.3-0.3p" />,
    reason: <>Expanding.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(S_3) = 0.79-0.3p}" />,
    reason: <>Dropping the brackets gives <Katex tex="0.79-p" />, the report's common error.</>,
  },
]

const ROWS_FII: WorkingRow[] = [
  {
    working: <Katex display tex="0.79-0.3p = 0.61" />,
    reason: <>Setting part f(i) equal to the given probability.</>,
  },
  {
    working: <Katex display tex="0.3p = 0.18" />,
    reason: <>Rearranging.</>,
  },
  {
    working: <Katex display tex="\boxed{p = 0.6}" />,
    reason: <>In <Katex tex="(0,1)" /> ✓, as the stem requires.</>,
  },
]


export default function MethodsQ4_2014Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (14 marks)</p>
        <p>
          Patricia is a gardener and she owns a garden nursery. She grows and sells basil
          plants and coriander plants.
        </p>
        <p>
          The heights, in centimetres, of the basil plants that Patricia is selling are
          distributed normally with a mean of 14 cm and a standard deviation of 4 cm. There
          are 2000 basil plants in the nursery.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Inverse Normal"
        marks={1}
        statement={
          <>
            Patricia classifies the tallest 10 per cent of her basil plants as{' '}
            <em>super</em>. What is the minimum height of a super basil plant, correct to the
            nearest millimetre?
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        Patricia decides that some of her basil plants are not growing quickly enough, so she
        plans to move them to a special greenhouse. She will move the basil plants that are
        less than 9 cm in height.
      </div>

      <PartCard
        letter="b"
        topic="Normal Distribution"
        marks={2}
        statement={
          <>
            How many basil plants will Patricia move to the greenhouse, correct to the nearest
            whole number?
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1 flex flex-col gap-2">
        <p>
          The heights of the coriander plants, <Katex tex="x" /> centimetres, follow the
          probability density function <Katex tex="h(x)" />, where
        </p>
        <div>
          <Katex
            display
            tex="h(x)=\begin{cases}\tfrac{\pi}{100}\sin\!\left(\tfrac{\pi x}{50}\right) & 0<x<50\\ 0 & \text{otherwise}\end{cases}"
          />
        </div>
      </div>

      <PartCard
        letter="c"
        topic="Mean of PDF"
        marks={1}
        statement={<>State the mean height of the coriander plants.</>}
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        Patricia thinks that the smallest 15 per cent of her coriander plants should be given
        a new type of plant food.
      </div>

      <PartCard
        letter="d"
        topic="PDF Quantile"
        marks={2}
        statement={
          <>
            Find the maximum height, correct to the nearest millimetre, of a coriander plant
            if it is to be given the new type of plant food.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        Patricia also grows and sells tomato plants that she classifies as either tall or
        regular. She finds that 20 per cent of her tomato plants are tall. A customer, Jack,
        selects <Katex tex="n" /> tomato plants at random.
      </div>

      <PartCard
        letter="e"
        topic="Binomial Distribution"
        marks={2}
        statement={
          <>
            Let <Katex tex="q" /> be the probability that at least one of Jack's{' '}
            <Katex tex="n" /> tomato plants is tall. Find the minimum value of{' '}
            <Katex tex="n" /> so that <Katex tex="q" /> is greater than 0.95.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1 flex flex-col gap-2">
        <p>
          In another section of the nursery, a craftsman makes plant pots. The pots are
          classified as smooth or rough. The craftsman finishes each pot before starting on
          the next. Over a period of time, it is found that if one plant pot is smooth, the
          probability that the next one is smooth is <Katex tex="0.7" />, while if one plant
          pot is rough, the probability that the next one is rough is <Katex tex="p" />, where{' '}
          <Katex tex="0<p<1" />. The value of <Katex tex="p" /> stays fixed for a week at a
          time, but can vary from week to week. The first pot made each week is always a
          smooth pot.
        </p>
      </div>

      <PartCard
        letter="f.i"
        topic="Markov Chain"
        marks={2}
        statement={
          <>
            Find, in terms of <Katex tex="p" />, the probability that the third pot made in a
            given week is smooth.
          </>
        }
        examinerReport={EXAM_FI}
      >
        <Background>
          <p>
            In the working below, <Katex tex="S_n" /> denotes the event that the{' '}
            <Katex tex="n" />th pot made in a week is smooth, and <Katex tex="R_n" /> that it is
            rough. These trials are <em>not</em> independent, so nothing here is binomial — each
            pot depends on the one before it.
          </p>
        </Background>
        <WorkingTable rows={ROWS_FI} />
      </PartCard>

      <PartCard
        letter="f.ii"
        topic="Markov Chain"
        marks={2}
        statement={
          <>
            In one particular week, the probability that the third pot made is smooth is{' '}
            <Katex tex="0.61" />. Calculate the value of <Katex tex="p" /> in this week.
          </>
        }
        examinerReport={EXAM_FII}
      >
        <WorkingTable rows={ROWS_FII} />
      </PartCard>

      <PartCard
        letter="g"
        topic="Transition Matrix"
        marks={2}
        statement={
          <>
            If, in another week, <Katex tex="p=0.8" />, find the probability that the fifth
            pot made that week is smooth.
          </>
        }
      >
        <Background title="Not in the Current Study Design">
          <p>
            Part g. is a transition-matrix (Markov chain) question — VCAA&rsquo;s report solves it
            with a transition matrix — and transition matrices are no longer on the Mathematical
            Methods study design. It is left without a worked solution; the skip guide lists it
            as one to skip.
          </p>
        </Background>
      </PartCard>
    </div>
  )
}
