// 2014 Mathematical Methods (CAS) — Exam 2, Section 2 Question 4 (14 marks). A nursery:
// normal-distribution heights, a sine probability density function, a binomial "at least
// one", and a two-state chain of smooth and rough pots. Question text transcribed from the
// original paper (no diagram given). Part g. is a transition-matrix (Markov chain) question,
// which is no longer on the Mathematical Methods study design: its statement is shown, marked
// as such, with no worked solution (KZ's decision, Sept 2026; the skip guide lists it). Answers
// checked with sympy/scipy and against the VCAA examination report. Solution is original.
// Interactives (Oct 2026; parts under 40% full marks): d. sine-quantile (area 0.15 under h, with a
// same-mean-and-SD normal curve for comparison); e. at-least-one (q = 1 - 0.8^n against 0.95).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const QuantileWidget = lazyWidget(() => import('../interactives/meth-2014e2-q4d-sine-quantile'))
const AtLeastOneWidget = lazyWidget(() => import('../interactives/meth-2014e2-q4e-at-least-one'))

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
    reason: <>Let <Katex tex="X" /> be a basil plant's height in centimetres: mean 14, standard deviation 4.</>,
  },
  {
    working: <Katex display tex="\Pr(X>x) = 0.1 \iff \Pr(X<x) = 0.9" />,
    reason: <>The tallest 10% lie <em>above</em> the cut-off <Katex tex="x" />, so 90% lie below it — the inverse normal works with the area to the left.</>,
    more: <>The report notes that some students entered the incorrect probability into their technology. Entering 0.1 gives <Katex tex="8.87" /> cm, the cut-off for the <em>shortest</em> 10%. A quick sense check catches it: the tallest plants must be above the mean of 14 cm.</>,
  },
  {
    working: <Cas fn="invNorm">invNorm(0.9, 14, 4)</Cas>,
    reason: <>The inverse normal finds the height with area 0.9 to its left.</>,
  },
  {
    working: <Katex display tex="x = 19.1262\ldots \text{ cm}" />,
    reason: <>In centimetres, the unit the distribution is given in. Keep the full value until the conversion.</>,
  },
  {
    working: <Katex display tex="\boxed{191\ \text{mm}}" />,
    reason: <>The answer is wanted to the nearest millimetre, and <Katex tex="1\ \text{cm}=10\ \text{mm}" />: <Katex tex="19.126\ldots\times10=191.26\ldots" /> mm.</>,
    more: <>The report's answer is 19.1 cm or 191 mm. It notes many students thought 100 mm = 1 cm and answered 1913 mm (almost 2 metres — far too tall for a basil plant), and others wrote 19.1 mm, the right number with the wrong unit.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(X<9)" />,
    reason: <>The plants moved are those less than 9 cm tall. Use 9 exactly: height is continuous, so no adjustment is needed.</>,
    more: <>The report notes some students used <Katex tex="\Pr(X<8.9)" /> or <Katex tex="\Pr(X<8)" />. Shifting the boundary like that only makes sense for whole-number (discrete) variables; for a continuous variable <Katex tex="\Pr(X<9)" /> and <Katex tex="\Pr(X\le9)" /> are the same.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(-∞, 9, 14, 4)</Cas>,
    reason: <>On the page, write the probability statement above, not this calculator syntax.</>,
    more: <>The report says some students used technology syntax in their working and that correct mathematical notation was required. It also notes that students who used <Katex tex="z" /> values often went wrong; with CAS there is no need to standardise.</>,
  },
  {
    working: <Katex display tex="\Pr(X<9) = 0.105649\ldots" />,
    reason: <>About 10.6% of the basil plants.</>,
  },
  {
    working: <Katex display tex="0.105649\ldots\times2000 = 211.29\ldots" />,
    reason: <>The number of plants is this proportion of the 2000. Write it as a new line, not chained onto the last one.</>,
    more: <>The report shows the incorrect working <Katex tex="\Pr(X<9)=0.10565\ldots=0.10565\ldots\times2000=211" />. Each "=" claims the two sides are equal, but <Katex tex="0.10565\ldots" /> is not equal to <Katex tex="211" />. Start a new statement for the multiplication, as here.</>,
  },
  {
    working: <Katex display tex="\boxed{211 \text{ plants}}" />,
    reason: <>Rounded to the nearest whole number, as asked: <Katex tex="211.29\ldots" /> rounds down to 211.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="h(x) = \tfrac{\pi}{100}\sin\!\left(\tfrac{\pi x}{50}\right), \quad 0<x<50" />,
    reason: <>One arch of a sine curve: zero at <Katex tex="x=0" /> and <Katex tex="x=50" />, highest at <Katex tex="x=25" />.</>,
  },
  {
    working: <Katex display tex="h(50-x) = \tfrac\pi{100}\sin\!\left(\pi-\tfrac{\pi x}{50}\right) = h(x)" />,
    reason: <>The density is symmetric about <Katex tex="x=25" />, since <Katex tex="\sin(\pi-\theta)=\sin\theta" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{E}(X) = 25\ \text{cm}}" />,
    reason: <>A symmetric density has its mean at its centre of symmetry. "State" means no calculation is required.</>,
    more: <>The report's working gives <Katex tex="\mathrm{E}(X)=\int_0^{50}x\,h(x)\,dx=25" />; on this exam you evaluate that integral with CAS, which confirms the answer. If you integrate, the calculator must be in radians: the report notes students who used degrees. It also notes students who used the median formula, <Katex tex="\int_0^m h(x)\,dx=0.5" />. That happens to give 25 here only because the density is symmetric; the mean is defined by <Katex tex="\int x\,h(x)\,dx" />.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\int_0^a h(x)\,dx = 0.15" />,
    reason: <>The smallest 15% are below some height <Katex tex="a" />, so the area under <Katex tex="h" /> from 0 to <Katex tex="a" /> is 0.15.</>,
    more: <>This is the same idea as part a. (the area to the left of a cut-off), but the distribution is now the one given by <Katex tex="h" />. The report notes some students used the normal distribution. Nothing says the coriander heights are normal: <Katex tex="h" /> is the only distribution given. Even a normal curve with the same mean (25) and standard deviation (<Katex tex="\sqrt{\mathrm{E}(X^2)-25^2}\approx 10.88" />, by CAS) gives a different cut-off, about 13.7 cm.</>,
  },
  {
    working: <Katex display tex="\int_0^a \tfrac\pi{100}\sin\!\left(\tfrac{\pi x}{50}\right)dx = \left[-\tfrac12\cos\!\left(\tfrac{\pi x}{50}\right)\right]_0^a" />,
    reason: <>An antiderivative of <Katex tex="\sin(kx)" /> is <Katex tex="-\tfrac1k\cos(kx)" />. Here <Katex tex="\tfrac1k=\tfrac{50}\pi" />, and <Katex tex="\tfrac\pi{100}\times\tfrac{50}\pi=\tfrac12" />.</>,
    more: <>On this calculator-allowed exam you can instead solve the first line for <Katex tex="a" /> directly with CAS, as the report does — restricting the solution to <Katex tex="0<a<50" />.</>,
  },
  {
    working: <Katex display tex="\tfrac12\left(1-\cos\!\left(\tfrac{\pi a}{50}\right)\right) = 0.15" />,
    reason: <>Substituting the limits: <Katex tex="-\tfrac12\cos\!\left(\tfrac{\pi a}{50}\right)+\tfrac12\cos(0)" />, with <Katex tex="\cos(0)=1" />.</>,
  },
  {
    working: <Katex display tex="\cos\!\left(\tfrac{\pi a}{50}\right) = 0.7 \implies \tfrac{\pi a}{50} = 0.795398\ldots" />,
    reason: <>Multiply by 2 and rearrange, then take <Katex tex="\cos^{-1}" /> in radians. As <Katex tex="0<\tfrac{\pi a}{50}<\pi" />, this is the only solution.</>,
  },
  {
    working: <Katex display tex="a = 12.6591\ldots \text{ cm}" />,
    reason: <>Multiplying by <Katex tex="\tfrac{50}\pi" />. Well below the mean of 25, as it should be for the bottom 15%.</>,
  },
  {
    working: <Katex display tex="\boxed{127\ \text{mm}}" />,
    reason: <>To the nearest millimetre: <Katex tex="12.659\ldots\times10=126.59\ldots" /> mm, so the plants given the food are at most 127 mm tall.</>,
    more: <>The report's answer is 12.7 cm or 127 mm, and it notes some students had incorrect units or conversions — the same trap as part a.: 1 cm is 10 mm.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="Y \sim \mathrm{Bi}(n,\,0.2)" />,
    reason: <>Let <Katex tex="Y" /> be the number of tall plants among Jack's <Katex tex="n" />. Each is tall with probability 0.2, independently: a binomial.</>,
    more: <>The report notes many students did not know to use the binomial distribution. The signal is a fixed number of independent selections (<Katex tex="n" /> plants), each with two outcomes (tall or regular) and the same probability of "success" (0.2).</>,
  },
  {
    working: <Katex display tex="q = \Pr(Y\ge1) = 1-\Pr(Y=0)" />,
    reason: <>"At least one" is everything except "none", so use the complement.</>,
  },
  {
    working: <Katex display tex="\Pr(Y=0) = 0.8^n" />,
    reason: <>No tall plants means all <Katex tex="n" /> are regular, each with probability 0.8.</>,
  },
  {
    working: <Katex display tex="1-0.8^n > 0.95 \implies 0.8^n < 0.05" />,
    reason: <>Subtract 1, then multiply by <Katex tex="-1" />: multiplying by a negative reverses the inequality.</>,
    more: <>The report notes students used the inequality sign incorrectly. A sense check: <Katex tex="0.8^n" /> is the chance that <em>none</em> is tall, which must be <em>small</em> if "at least one" is to be likely.</>,
  },
  {
    working: <Katex display tex="n > \frac{\log_e(0.05)}{\log_e(0.8)} = 13.425\ldots" />,
    reason: <>Take <Katex tex="\log_e" /> of both sides: <Katex tex="n\log_e(0.8)<\log_e(0.05)" />. Dividing by <Katex tex="\log_e(0.8)" />, which is <em>negative</em>, reverses the inequality again.</>,
    more: <>Alternatively, solve <Katex tex="0.8^n=0.05" /> with CAS and then decide which side you need: <Katex tex="1-0.8^n" /> increases with <Katex tex="n" />, so <Katex tex="q>0.95" /> for every <Katex tex="n" /> above 13.43. The report notes that trial and error was also used; that is fine if you show the values either side of 0.95, as in the next row.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 14}" />,
    reason: <><Katex tex="n" /> is a whole number, so round <em>up</em>. Check: <Katex tex="1-0.8^{13}=0.945" /> (not enough) and <Katex tex="1-0.8^{14}=0.956" /> ✓.</>,
  },
]

const ROWS_FI: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(S_1) = 1, \qquad \Pr(S_2) = 0.7" />,
    reason: <><Katex tex="S_n" /> means "pot <Katex tex="n" /> is smooth", <Katex tex="R_n" /> "rough". Pot 1 is always smooth, so pot 2 is smooth with probability 0.7.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\Pr(S_3) &= \Pr(S_3\mid S_2)\Pr(S_2)\\ &\quad+\Pr(S_3\mid R_2)\Pr(R_2)\end{aligned}" />,
    reason: <>Each pot depends only on the one before, so split by what pot 2 was: smooth or rough (the two branches of a tree).</>,
    more: <>The pots are <em>not</em> independent trials, so this is not a binomial: the chance pot 3 is smooth depends on pot 2.</>,
  },
  {
    working: <Katex display tex="\Pr(S_3) = (0.7)(0.7)+(1-p)(0.3)" />,
    reason: <><Katex tex="\Pr(R_2)=0.3" />. Since <Katex tex="p=\Pr(\text{rough}\mid\text{rough})" />, a rough pot is followed by a smooth one with probability <Katex tex="1-p" />. Keep its brackets.</>,
    more: <>Keep the brackets around <Katex tex="1-p" />: the report notes they were sometimes omitted, giving <Katex tex="0.7\times0.7+0.3\times1-p=0.79-p" />. The report also shows a transition-matrix method; transition matrices are no longer in the Methods study design, and the tree is all you need. Of the incorrect matrix formulations it lists, one raises the matrix to the power 3 (pot 3 is only two steps after pot 1) and the other has <Katex tex="p" /> and <Katex tex="1-p" /> in the wrong places.</>,
  },
  {
    working: <Katex display tex="= 0.49+0.3-0.3p" />,
    reason: <>Expanding: <Katex tex="0.3(1-p)=0.3-0.3p" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(S_3) = 0.79-0.3p}" />,
    reason: <>Collecting the constants.</>,
    more: <>A check: if <Katex tex="p=0.3" />, a rough pot is followed by a smooth one with probability 0.7, just as after a smooth pot, so every pot after the first is smooth with probability 0.7. Indeed <Katex tex="0.79-0.3(0.3)=0.7" />.</>,
  },
]

const ROWS_FII: WorkingRow[] = [
  {
    working: <Katex display tex="0.79-0.3p = 0.61" />,
    reason: <>Setting the answer to part f.i. equal to the given probability.</>,
  },
  {
    working: <Katex display tex="0.3p = 0.18" />,
    reason: <>Subtract 0.79 from both sides, then multiply by <Katex tex="-1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{p = 0.6}" />,
    reason: <>Dividing by 0.3. It lies in <Katex tex="(0,1)" />, as the stem requires.</>,
    more: <>Check: <Katex tex="0.79-0.3(0.6)=0.79-0.18=0.61" /> ✓. An error in part f.i. carries straight into this part, so check that expression first if your answer is outside <Katex tex="(0,1)" />.</>,
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
        <Explore title="The bottom 15% is an area of 0.15 under h, not under a normal curve">
          <QuantileWidget />
        </Explore>
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
        <Explore title="q climbs past 0.95 between n = 13 and n = 14">
          <AtLeastOneWidget />
        </Explore>
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
        <Background title="Not in the Current Study Design" always>
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
