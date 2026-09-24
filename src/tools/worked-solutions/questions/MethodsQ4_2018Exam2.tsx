// 2018 Mathematical Methods — Exam 2, Section B, Question 4 (16 marks). Heart rates in two
// towns: a normal probability, conditional probability and independence, a binomial sample
// and a sample proportion, a confidence interval read backwards, then a continuous
// probability density function and a two-group breakdown. Question text transcribed from the
// original paper (VCAA printed no diagram for this question). Answers re-derived
// independently in sympy/scipy and checked against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'

const EXAM_A: SAExaminerStats = {
  marks: [13, 87],
  average: 0.9,
  comment: (
    <>
      This question was answered well.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [43, 57],
  average: 0.6,
  comment: (
    <>
      This question was answered reasonably well. Some students gave their answer as{' '}
      <Katex tex="0.31" />. A common mistake was{' '}
      <Katex tex="\dfrac{\Pr(H)}{\Pr(S)}=\dfrac{0.1587}{0.29}=0.547" /> or{' '}
      <Katex tex="\dfrac{\Pr(H\cap S)}{\Pr(S)}=\dfrac{0.9}{0.1857}" />, giving an answer greater
      than <Katex tex="1" />.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [56, 44],
  average: 0.5,
  comment: (
    <>
      A mathematical explanation was required. Some students confused mutually exclusive
      events with independent events. A common mistake was{' '}
      <Katex tex="\Pr(H\mid S)=\Pr(S)" />.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [25, 9, 66],
  average: 1.4,
  comment: (
    <>
      This question was reasonably well done. A method was required to get full marks. Stating the correct{' '}
      <Katex tex="n" /> and <Katex tex="p" /> value was sufficient. Some students gave their
      answer as <Katex tex="0.19" />.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [54, 9, 36],
  average: 0.8,
  comment: (
    <>
      Some students used the normal approximation to the binomial distribution. There was
      poor use of variables, for example,{' '}
      <Katex tex="\Pr\!\left(\hat P>0.1\right)=\Pr\!\left(\hat P>1.6\right)=\Pr\!\left(\hat P\ge2\right)" />.
    </>
  ),
}

const EXAM_CIII: SAExaminerStats = {
  marks: [86, 6, 8],
  average: 0.2,
  comment: (
    <>
      This question was not answered well. Many students appeared to be confused by the
      terminology <Katex tex="\Pr\!\left(\hat P_n>\tfrac1n\right)" />.{' '}
      <Katex tex="1-\Pr(X=0)<0.01" /> was often evaluated, giving <Katex tex="n=27" />. Trial
      and error was an acceptable method.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [55, 45],
  average: 0.5,
  comment: (
    <>
      Many students tried to find the sample size rather than the proportion.{' '}
      <Katex tex="n=900" /> was often given.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [89, 11],
  average: 0.1,
  comment: (
    <>
      The confidence interval needed to be referred to in the answer.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [38, 9, 53],
  average: 1.2,
  comment: (
    <>
      Some students found the median or the mode. Others found the area under the curve. Some
      had one of the terminals incorrect, for example,{' '}
      <Katex tex="\displaystyle\int_0^{437}\bigl(t\times M(t)\bigr)dt" />. There were rounding
      errors; <Katex tex="44.7" /> was occasionally given.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [44, 56],
  average: 0.6,
  comment: (
    <>
      This question was answered reasonably well.{' '}
      <Katex tex="\displaystyle\int_0^{15}\bigl(t\times M(t)\bigr)dt=0.2991" /> was a common
      incorrect answer.
    </>
  ),
}

const EXAM_G: SAExaminerStats = {
  marks: [89, 6, 5],
  average: 0.2,
  comment: (
    <>
      This question was not answered well. There were a number of other approaches to this
      question, for example, Karnaugh maps, tree diagrams or a conditional probability
      statement. A common incorrect answer was{' '}
      <Katex tex="\tfrac67\times0.0266=0.0228" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="M \sim N\!\left(68,\ 8^2\right)" />,
    reason: <>The question gives the standard deviation directly as <Katex tex="8" />, so the variance is <Katex tex="64" />.</>,
  },
  {
    working: <Cas fn="normCdf">normCdf(60, 90, 68, 8)</Cas>,
    reason: <>Bounds first, parameters last, and the final argument is <Katex tex="\sigma=8" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(60<M<90) \approx 0.838}" />,
    reason: <>Three decimal places. Sensible: <Katex tex="60" /> is one standard deviation below the mean and <Katex tex="90" /> is nearly three above, so the interval should capture a bit more than the <Katex tex="0.84" /> that lies above <Katex tex="-1\sigma" />. ✓</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(S) = 0.29, \quad \Pr(H\cap S) = 0.09" />,
    reason: <>"<Katex tex="29\%" /> play sport regularly" is <Katex tex="\Pr(S)" />; "<Katex tex="9\%" /> play sport regularly <em>and</em> have a slow heart rate" is the intersection, not a conditional.</>,
  },
  {
    working: <Katex display tex="\Pr(H\mid S) = \frac{\Pr(H\cap S)}{\Pr(S)} = \frac{0.09}{0.29}" />,
    reason: <>The conditioning event goes in the denominator, and the numerator is the intersection. The report's common mistakes were <Katex tex="\tfrac{\Pr(H)}{\Pr(S)}=0.547" /> — using <Katex tex="\Pr(H)" /> instead of <Katex tex="\Pr(H\cap S)" /> — and versions giving an answer above <Katex tex="1" />, which should be caught immediately.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(H\mid S) \approx 0.310}" />,
    reason: <>Three decimal places, so write the trailing zero — the report notes some students gave <Katex tex="0.31" />.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(H) = 0.1587, \qquad \Pr(H\mid S) \approx 0.3103" />,
    reason: <>The test for independence: knowing <Katex tex="S" /> should leave <Katex tex="\Pr(H)" /> unchanged.</>,
  },
  {
    working: <Katex display tex="\Pr(H\mid S) \ne \Pr(H)" />,
    reason: <>Equivalently <Katex tex="\Pr(H)\Pr(S)=0.1587\times0.29\approx0.046\ne0.09=\Pr(H\cap S)" />. Either comparison works. Comparing with <Katex tex="\Pr(S)" /> does not — the report's common mistake was <Katex tex="\Pr(H\mid S)=\Pr(S)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{No — } H \text{ and } S \text{ are not independent}}" />,
    reason: <>A mathematical justification is required, not just the word "no". In context: sportspeople here are roughly twice as likely to have a slow heart rate, which is the opposite of independence. Note too that independent is not the same as mutually exclusive — the report flags that confusion.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="X \sim \operatorname{Bi}(16,\ 0.1587)" />,
    reason: <>Sixteen independent adults, each with probability <Katex tex="0.1587" /> of a slow heart rate. The report says a method was required for full marks, and stating the correct <Katex tex="n" /> and <Katex tex="p" /> was sufficient.</>,
  },
  {
    working: <Cas fn="binomPdf">binomPdf(16, 0.1587, 1)</Cas>,
    reason: <><Katex tex="\Pr(X=x)" /> for an exact count uses <b>binomPdf</b>, not binomCdf.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(X=1) \approx 0.190}" />,
    reason: <>Three decimal places, trailing zero included — the report notes some students gave <Katex tex="0.19" />.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\hat P = \frac{X}{16} > 0.1 \iff X > 1.6" />,
    reason: <>Convert the proportion back into a <em>count</em>. <Katex tex="0.1\times16=1.6" />.</>,
  },
  {
    working: <Katex display tex="X \text{ is a whole number} \implies X > 1.6 \iff X \ge 2" />,
    reason: <>This is the step the question is testing. <Katex tex="X" /> is discrete and binomial, so use the binomial distribution itself — the report notes some students used the normal approximation instead.</>,
  },
  {
    working: <Cas fn="binomCdf">binomCdf(16, 0.1587, 2, 16)</Cas>,
    reason: <>Both bounds inclusive, so the range runs from <Katex tex="2" /> to <Katex tex="16" />. Equivalently <Katex tex="1-\Pr(X\le1)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr\!\left(\hat P>0.1\right) \approx 0.747}" />,
    reason: <>Three decimal places. Sanity check: the expected count is <Katex tex="16\times0.1587\approx2.5" />, comfortably above <Katex tex="2" />, so a probability around three-quarters is the right size. ✓</>,
  },
]

const ROWS_CIII: WorkingRow[] = [
  {
    working: <Katex display tex="\hat P_n = \frac{X}{n} > \frac1n \iff X > 1 \iff X \ge 2" />,
    reason: <>The <Katex tex="n" />s cancel — this is the key simplification, and the report says many students appeared to be confused by this notation. Whatever the sample size, the condition is simply "at least two people".</>,
  },
  {
    working: <Katex display tex="\Pr(X\ge2) > 0.99 \ \text{ where } X\sim\operatorname{Bi}(n,\ 0.1587)" />,
    reason: <>Now a single inequality in <Katex tex="n" />. Note <Katex tex="X\ge2" />, not <Katex tex="X\ge1" />: the report says a set-up using only <Katex tex="\Pr(X=0)" /> was often evaluated, giving <Katex tex="n=27" />.</>,
  },
  {
    working: <Cas fn="binomCdf">binomCdf(n, 0.1587, 2, n) &gt; 0.99</Cas>,
    reason: <>Increase <Katex tex="n" /> until the probability first clears <Katex tex="0.99" />. Trial and error is an accepted method, and the report says so explicitly.</>,
  },
  {
    working: <Katex display tex="n=38: \ 0.98851 \ \text{✗}, \qquad n=39: \ 0.99011 \ \text{✓}" />,
    reason: <>Both lines are needed: one shows <Katex tex="38" /> fails, the other that <Katex tex="39" /> works, which together prove <Katex tex="39" /> is the <em>least</em>.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 39}" />,
    reason: <>Only <Katex tex="8\%" /> of students scored both marks.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="\text{CI} = \left(\hat p - E,\ \hat p + E\right)" />,
    reason: <>A confidence interval is symmetric about the sample proportion, so <Katex tex="\hat p" /> sits exactly at the midpoint.</>,
  },
  {
    working: <Katex display tex="\hat p = \frac{0.102+0.145}{2} = \frac{0.247}{2}" />,
    reason: <>Average the two endpoints. No margin-of-error formula is needed — the report notes many students went hunting for the sample <em>size</em> instead, answering <Katex tex="n=900" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\hat p = 0.1235}" />,
    reason: <>Exact, since the endpoints are given exactly.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Mathsland proportion} = 0.1587" />,
    reason: <>Given at the start of the question as the probability a Mathsland adult has a slow heart rate.</>,
  },
  {
    working: <Katex display tex="0.1587 \notin (0.102,\ 0.145)" />,
    reason: <>The Mathsland value lies <em>above</em> the upper endpoint of Statsville's interval.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{The interval does not contain } 0.1587}" />,
    reason: <>So the plausible values for Statsville, at the <Katex tex="95\%" /> level, exclude Mathsland's rate — which is why the two towns could genuinely differ. The report is explicit that the confidence interval needed to be <em>referred to</em> in the answer. Only <Katex tex="11\%" /> got this mark.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="E(T) = \int_{-\infty}^{\infty} t\,M(t)\,dt = \int_0^{\infty} t\cdot\frac{3}{50}\left(\frac{t}{50}\right)^2 e^{-\left(\frac{t}{50}\right)^3}dt" />,
    reason: <>The expected value of a continuous random variable weights each time by the density. <Katex tex="M" /> is zero for <Katex tex="t<0" />, so the integral starts at <Katex tex="0" /> and runs to <Katex tex="\infty" /> — the report gives <Katex tex="\int_0^{437}" /> as an example of an incorrect terminal.</>,
  },
  {
    working: <Cas fn="nInt">nInt(t*M(t), t, 0, ∞)</Cas>,
    reason: <>Technology. Do not confuse this with <Katex tex="\int M(t)\,dt" />, which is just the total probability <Katex tex="1" /> — the report notes students who computed "the area under the curve" instead, and others who found the median or mode.</>,
  },
  {
    working: <Katex display tex="\boxed{E(T) \approx 44.6 \text{ minutes}}" />,
    reason: <>One decimal place (<Katex tex="44.6489\ldots" />); <Katex tex="44.7" /> is a rounding error the report names.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(T<15) = \int_0^{15} M(t)\,dt" />,
    reason: <>A probability for a continuous variable is an area under the density — no <Katex tex="t" /> multiplier. The report names <Katex tex="\int_0^{15}t\,M(t)\,dt\approx0.2991" /> as a common incorrect answer — part e.'s integrand used here by mistake.</>,
  },
  {
    working: <Katex display tex="= \left[-e^{-\left(\frac{t}{50}\right)^3}\right]_0^{15} = 1-e^{-27/1000}" />,
    reason: <>This one has a neat closed form: the density is exactly the derivative of <Katex tex="-e^{-(t/50)^3}" />, so no technology is strictly needed.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.0266}" />,
    reason: <>Four decimal places. Sensible: <Katex tex="15" /> minutes is very fast against a mean of <Katex tex="44.6" />, so only a few per cent qualify as elite. ✓</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(\text{Year }12) = \frac17, \qquad \Pr(\text{not Year }12) = \frac67" />,
    reason: <>The two groups partition the school.</>,
  },
  {
    working: <Katex display tex="\Pr(E) = \Pr(E\mid Y)\Pr(Y) + \Pr(E\mid Y')\Pr(Y')" />,
    reason: <>Law of total probability, split by year level. The overall elite rate is the one computed in part f. — it applies to a randomly selected student from the whole school.</>,
  },
  {
    working: <Katex display tex="0.0266\ldots = 0.05\times\frac17 + x\times\frac67" />,
    reason: <>With <Katex tex="x=\Pr(E\mid Y')" />, the unknown. Use the <em>unrounded</em> <Katex tex="1-e^{-27/1000}" /> from part f. so the fourth decimal place is safe.</>,
  },
  {
    working: <Cas fn="solve">solve(0.05/7 + 6x/7 = 1-e^(-27/1000), x)</Cas>,
    reason: <>One linear equation in one unknown.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 0.0227}" />,
    reason: <>Four decimal places. It is below the school-wide <Katex tex="0.0266" />, as it must be: Year 12s are elite at <Katex tex="5\%" />, well above average, so the remaining six-sevenths have to sit below average to balance. Only <Katex tex="5\%" /> of students scored both marks. The report's common incorrect answer, <Katex tex="\tfrac67\times0.0266=0.0228" />, applies the six-sevenths to the wrong side.</>,
  },
]

export default function MethodsQ4_2018Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (16 marks)</p>
        <p className="mb-2">
          Doctors are studying the resting heart rate of adults in two neighbouring towns:
          Mathsland and Statsville. Resting heart rate is measured in beats per minute (bpm).
        </p>
        <p>
          The resting heart rate of adults in Mathsland is known to be normally distributed
          with a mean of <Katex tex="68" /> bpm and a standard deviation of <Katex tex="8" />{' '}
          bpm.
        </p>
      </div>

      <PartCard letter="a" topic="Normal Distribution" marks={1} statement={<>Find the probability that a randomly selected Mathsland adult has a resting heart rate between <Katex tex="60" /> bpm and <Katex tex="90" /> bpm. Give your answer correct to three decimal places.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-2">
          The doctors consider a person to have a slow heart rate if the person's resting heart
          rate is less than <Katex tex="60" /> bpm. The probability that a randomly chosen
          Mathsland adult has a slow heart rate is <Katex tex="0.1587" />.
        </p>
        <p className="mb-2">
          It is known that <Katex tex="29\%" /> of Mathsland adults play sport regularly. It is
          also known that <Katex tex="9\%" /> of Mathsland adults play sport regularly and have
          a slow heart rate.
        </p>
        <p>
          Let <Katex tex="S" /> be the event that a randomly selected Mathsland adult plays
          sport regularly and let <Katex tex="H" /> be the event that a randomly selected
          Mathsland adult has a slow heart rate.
        </p>
      </div>

      <PartCard letter="b.i" topic="Conditional Probability" marks={1} statement={<>Find <Katex tex="\Pr(H\mid S)" />, correct to three decimal places.</>} examinerReport={EXAM_BI}>
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard letter="b.ii" topic="Independence" marks={1} statement={<>Are the events <Katex tex="H" /> and <Katex tex="S" /> independent? Justify your answer.</>} examinerReport={EXAM_BII}>
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard letter="c.i" topic="Binomial Distribution" marks={2} statement={<>Find the probability that a random sample of <Katex tex="16" /> Mathsland adults will contain exactly one person with a slow heart rate. Give your answer correct to three decimal places.</>} examinerReport={EXAM_CI}>
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard letter="c.ii" topic="Sample Proportion" marks={2} statement={<>For random samples of <Katex tex="16" /> Mathsland adults, <Katex tex="\hat P" /> is the random variable that represents the proportion of people who have a slow heart rate. Find the probability that <Katex tex="\hat P" /> is greater than <Katex tex="10\%" />, correct to three decimal places.</>} examinerReport={EXAM_CII}>
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <PartCard letter="c.iii" topic="Sample Size" marks={2} statement={<>For random samples of <Katex tex="n" /> Mathsland adults, <Katex tex="\hat P_n" /> is the random variable that represents the proportion of people who have a slow heart rate. Find the least value of <Katex tex="n" /> for which <Katex tex="\Pr\!\left(\hat P_n>\dfrac1n\right)>0.99" />.</>} examinerReport={EXAM_CIII}>
        <Background>
          <p>
            <Katex tex="86\%" /> scored zero, and the report says many students were confused by
            the notation. Push through it: <Katex tex="\hat P_n" /> is the count divided by <Katex tex="n" />, so{' '}
            <Katex tex="\hat P_n>\tfrac1n" /> says <Katex tex="\tfrac{X}{n}>\tfrac1n" />, i.e.
            simply <Katex tex="X>1" />.
          </p>
          <p>
            Because <Katex tex="X" /> counts people it is a whole number, so{' '}
            <Katex tex="X>1" /> means <Katex tex="X\ge2" /> — <em>at least two</em>, not at
            least one. That single boundary is what separates the right answer from the
            report's common <Katex tex="n=27" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CIII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The doctors took a large random sample of adults from the population of Statsville
          and calculated an approximate <Katex tex="95\%" /> confidence interval for the
          proportion of Statsville adults who have a slow heart rate. The confidence interval
          they obtained was <Katex tex="(0.102,\ 0.145)" />.
        </p>
      </div>

      <PartCard letter="d.i" topic="Confidence Interval" marks={1} statement={<>Determine the sample proportion used in the calculation of this confidence interval.</>} examinerReport={EXAM_DI}>
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard letter="d.ii" topic="Confidence Interval" marks={1} statement={<>Explain why this confidence interval suggests that the proportion of adults with a slow heart rate in Statsville could be different from the proportion in Mathsland.</>} examinerReport={EXAM_DII}>
        <WorkingTable rows={ROWS_DII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-2">
          Every year at Mathsland Secondary College, students hike to the top of a hill that
          rises behind the school. The time taken by a randomly selected student to reach the
          top of the hill has the probability density function <Katex tex="M" /> with the rule
        </p>
        <p className="text-center">
          <Katex display tex="M(t) = \begin{cases} \dfrac{3}{50}\left(\dfrac{t}{50}\right)^2 e^{-\left(\frac{t}{50}\right)^3} & t\ge0 \\[6pt] 0 & t<0 \end{cases}" />
        </p>
        <p>where <Katex tex="t" /> is given in minutes.</p>
      </div>

      <PartCard letter="e" topic="Mean of PDF" marks={2} statement={<>Find the expected time, in minutes, for a randomly selected student from Mathsland Secondary College to reach the top of the hill. Give your answer correct to one decimal place.</>} examinerReport={EXAM_E}>
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard letter="f" topic="Continuous PDF" marks={1} statement={<>Students who take less than <Katex tex="15" /> minutes to get to the top of the hill are categorised as 'elite'. Find the probability that a randomly selected student from Mathsland Secondary College is categorised as elite. Give your answer correct to four decimal places.</>} examinerReport={EXAM_F}>
        <WorkingTable rows={ROWS_F} />
      </PartCard>

      <PartCard letter="g" topic="Total Probability" marks={2} statement={<>The Year 12 students at Mathsland Secondary College make up <Katex tex="\dfrac17" /> of the total number of students at the school. Of the Year 12 students at Mathsland Secondary College, <Katex tex="5\%" /> are categorised as elite. Find the probability that a randomly selected non-Year 12 student at Mathsland Secondary College is categorised as elite. Give your answer correct to four decimal places.</>} examinerReport={EXAM_G}>
        <Background>
          <p>
            Part f. gave the elite rate for a student drawn from the <em>whole</em> school.
            That overall rate is a weighted blend of two groups: Year 12s, who are elite{' '}
            <Katex tex="5\%" /> of the time, and everyone else, whose rate is unknown.
          </p>
          <p>
            Writing the blend out — one-seventh at <Katex tex="0.05" />, six-sevenths at{' '}
            <Katex tex="x" />, averaging to part f.'s value — turns the problem into a single
            linear equation. Tree diagrams and Karnaugh maps also work, and the report
            mentions both.
          </p>
        </Background>
        <WorkingTable rows={ROWS_G} />
      </PartCard>
    </div>
  )
}
