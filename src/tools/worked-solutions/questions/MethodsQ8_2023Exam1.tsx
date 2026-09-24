// 2023 Mathematical Methods — Exam 1 Question 8 (6 marks). A cubic probability density
// function: normalising it, its mean, and a conditional probability. Question text
// transcribed from the original paper. Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [57, 43],
  average: 0.4,
  comment: (
    <>
      There were two approaches students used to 'show that' <Katex tex="k=\tfrac{1}{64}" />.
      <br />
      They either formed an integral equation equal to 1, antidifferentiated, and then solved
      to find <Katex tex="k" />, or they evaluated the integral (without <Katex tex="k" />) and
      then solved an equation equal to 1 and involving <Katex tex="k" />. Both used the fact
      that the total probability is equal to 1. This was a 'show that' question, so students
      were expected to be explicit and clear with their workings, and to arrive at the expected
      result in a logical, step-by-step manner. Common errors involved omitting the{' '}
      <Katex tex="dt" /> in the integral statement or writing <Katex tex="dx" /> instead.
      Students are reminded to be consistent in their use of variables.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [50, 24, 26],
  average: 0.8,
  comment: (
    <>
      This question was well attempted. Most students knew to set up the integral{' '}
      <Katex tex="E(T)=\int_0^4 tf(t)\,dt" />. Some students incorrectly wrote{' '}
      <Katex tex="E(T)=\int_0^4 tf(t)\,dx" />, mixing their variables; students are reminded
      to pay attention to mathematical nomenclature.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [63, 13, 13, 11],
  average: 0.7,
  comment: (
    <>
      Most students recognised this question as a conditional probability question and
      indicated this as the starting point of their working. Sometimes, however, the
      formulation was incorrect. Common errors included writing the conditional probability as{' '}
      <Katex tex="\Pr(T>2\mid T=1)" />, where students had incorrectly interpreted the
      mathematical meaning of 'already queued for one minute' as <Katex tex="\Pr(T=1)" />.
      There were also errors where students incorrectly identified the terminals of
      integration. The arithmetic manipulation of fractions presented a challenge for some
      students. Students are encouraged to look for ways to cancel factors in their fractions
      to assist with the arithmetic calculations.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\int_{-\infty}^{\infty}f(t)\,dt = 1 \implies \int_0^4 kt\left(16-t^2\right)dt = 1" />,
    reason: <>The total area under any density function is 1. Outside <Katex tex="[0,4]" /> the function is zero, so only that interval contributes — and the <Katex tex="dt" /> matters.</>,
  },
  {
    working: <Katex display tex="k\int_0^4\left(16t-t^3\right)dt = 1" />,
    reason: <>Expand before integrating; the constant comes out the front.</>,
  },
  {
    working: <Katex display tex="k\left[8t^2-\frac{t^4}{4}\right]_0^4 = 1" />,
    reason: <><Katex tex="\int16t\,dt=8t^2" /> and <Katex tex="\int t^3dt=\tfrac{t^4}{4}" />.</>,
  },
  {
    working: <Katex display tex="k\left(8(16)-\frac{256}{4}\right) = k(128-64) = 64k = 1" />,
    reason: <><Katex tex="4^2=16" /> and <Katex tex="4^4=256" />. The lower terminal contributes nothing.</>,
  },
  {
    working: <Katex display tex="\boxed{k = \frac{1}{64}}" />,
    reason: <>Every line must be present — the report expects a "show that" to be explicit and clear, reaching the result in a logical, step-by-step manner. As required.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{E}(T) = \int_0^4 t\,f(t)\,dt = \frac{1}{64}\int_0^4 t\cdot t\left(16-t^2\right)dt" />,
    reason: <>The definition of the mean. Keep the variable <Katex tex="t" /> throughout.</>,
  },
  {
    working: <Katex display tex="= \frac{1}{64}\int_0^4\left(16t^2-t^4\right)dt" />,
    reason: <>Multiplying through by the extra <Katex tex="t" /> raises each power by one.</>,
  },
  {
    working: <Katex display tex="= \frac{1}{64}\left[\frac{16t^3}{3}-\frac{t^5}{5}\right]_0^4" />,
    reason: <>Antidifferentiating term by term.</>,
  },
  {
    working: <Katex display tex="= \frac{1}{64}\left(\frac{1024}{3}-\frac{1024}{5}\right) = \frac{1}{64}\cdot\frac{2048}{15}" />,
    reason: <><Katex tex="16\times64=1024" /> and <Katex tex="4^5=1024" />; <Katex tex="\tfrac{1024}{3}-\tfrac{1024}{5}=\tfrac{5120-3072}{15}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{E}(T) = \frac{32}{15} = 2\tfrac{2}{15} \ \text{minutes}}" />,
    reason: <>About <Katex tex="2.13" /> minutes — plausible for a density that peaks somewhere in the middle of <Katex tex="[0,4]" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(T>2\mid T>1) = \frac{\Pr(T>2 \cap T>1)}{\Pr(T>1)} = \frac{\Pr(T>2)}{\Pr(T>1)}" />,
    reason: <>"Already queued for one minute" means <Katex tex="T>1" />, not <Katex tex="T=1" /> — the report notes some students read it as <Katex tex="\Pr(T=1)" />. And <Katex tex="T>2" /> already implies <Katex tex="T>1" />, so the intersection collapses.</>,
  },
  {
    working: <Katex display tex="\Pr(T>2) = \frac{1}{64}\int_2^4\left(16t-t^3\right)dt = \frac{1}{64}\left[8t^2-\frac{t^4}{4}\right]_2^4" />,
    reason: <>Same antiderivative as part a., new terminals.</>,
  },
  {
    working: <Katex display tex="= \frac{1}{64}\bigl(64-(32-4)\bigr) = \frac{36}{64} = \frac{9}{16}" />,
    reason: <>At <Katex tex="t=2" />: <Katex tex="8(4)-\tfrac{16}{4}=28" />.</>,
  },
  {
    working: <Katex display tex="\Pr(T>1) = \frac{1}{64}\left(64-\left(8-\frac14\right)\right) = \frac{1}{64}\cdot\frac{225}{4} = \frac{225}{256}" />,
    reason: <>At <Katex tex="t=1" />: <Katex tex="8-\tfrac14=\tfrac{31}{4}" />, and <Katex tex="64-\tfrac{31}{4}=\tfrac{225}{4}" />.</>,
  },
  {
    working: <Katex display tex="\frac{9/16}{225/256} = \frac{9}{16}\times\frac{256}{225} = \frac{9\times16}{225}" />,
    reason: <>Cancelling <Katex tex="\tfrac{256}{16}=16" /> before multiplying keeps the numbers small.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{144}{225} = \frac{16}{25} = 0.64}" />,
    reason: <>Both 144 and 225 are divisible by 9. Sensible: having survived one minute, most of the remaining probability is still ahead.</>,
  },
]

export default function MethodsQ8_2023Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 8 (6 marks)</p>
        <p>
          Suppose that the queuing time, <Katex tex="T" /> (in minutes), at a customer service
          desk has a probability density function given by
        </p>
        <div className="py-1">
          <Katex
            display
            tex="f(t)=\begin{cases}kt\left(16-t^2\right) & 0\le t\le4\\[2pt]0 & \text{elsewhere}\end{cases}"
          />
        </div>
        <p>
          for some <Katex tex="k\in R" />.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Three standard facts, one per part: the area under a density is 1, the mean is{' '}
            <Katex tex="\int t\,f(t)\,dt" />, and{' '}
            <Katex tex="\Pr(A\mid B)=\tfrac{\Pr(A\cap B)}{\Pr(B)}" />. The same antiderivative{' '}
            <Katex tex="8t^2-\tfrac{t^4}{4}" /> serves parts a. and c., so work it out once
            and reuse it.
          </p>
          <p>
            In part c., <Katex tex="\{T>2\}" /> is contained in <Katex tex="\{T>1\}" />, so
            the intersection is just <Katex tex="\{T>2\}" />. And because the constant{' '}
            <Katex tex="\tfrac{1}{64}" /> appears in both the numerator and the denominator,
            it cancels — you can leave it out of both integrals entirely.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        topic="Continuous PDF"
        marks={1}
        statement={<>Show that <Katex tex="k=\dfrac{1}{64}" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Mean of PDF"
        marks={2}
        statement={<>Find <Katex tex="\mathrm{E}(T)" />.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Conditional Probability"
        marks={3}
        statement={
          <>
            What is the probability that a person has to queue for more than two minutes,
            given that they have already queued for one minute?
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
