// 2023 Mathematical Methods — Exam 1 Question 8 (6 marks). A cubic probability density
// function: normalising it, its mean, and a conditional probability. Question text
// transcribed from the original paper. Answers checked with sympy and against the VCAA
// examination report. Solution is original.
// Interactive: part c. - meth-2023e1-q8c-new-whole (conditioning on T > 1 makes the area right of
// t = 1 the new whole; a toggle shows the T = 1 misreading as a zero-width strip). Part b.
// (26% full marks) has no widget: the report names only a dx/dt notation slip, and the rest is
// fraction arithmetic.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const NewWholeWidget = lazyWidget(() => import('../interactives/meth-2023e1-q8c-new-whole'))

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
    working: <Katex display tex="\int_0^4 kt\left(16-t^2\right)dt = 1" />,
    reason: <>The total area under a probability density function is 1. Here <Katex tex="f(t)=0" /> outside <Katex tex="[0,4]" />, so only that interval contributes. Write the <Katex tex="dt" /> — the report lists leaving it out, or writing <Katex tex="dx" />, as common errors.</>,
  },
  {
    working: <Katex display tex="k\int_0^4\left(16t-t^3\right)dt = 1" />,
    reason: <>Multiply out first, <Katex tex="t\left(16-t^2\right)=16t-t^3" />, so each term can be antidifferentiated on its own. The constant <Katex tex="k" /> comes out the front.</>,
  },
  {
    working: <Katex display tex="k\left[8t^2-\frac{t^4}{4}\right]_0^4 = 1" />,
    reason: <>Raise each power by one and divide by the new power: <Katex tex="\int16t\,dt=8t^2" /> and <Katex tex="\int t^3\,dt=\tfrac{t^4}{4}" />.</>,
  },
  {
    working: <Katex display tex="k\left(\left(8(16)-\frac{256}{4}\right)-0\right) = 1" />,
    reason: <>Substitute the upper terminal <Katex tex="t=4" /> (<Katex tex="4^2=16" />, <Katex tex="4^4=256" />), then subtract the value at the lower terminal <Katex tex="t=0" />, which is 0.</>,
  },
  {
    working: <Katex display tex="k(128-64) = 64k = 1" />,
    reason: <><Katex tex="8\times16=128" /> and <Katex tex="\tfrac{256}{4}=64" />.</>,
  },
  {
    working: <Katex display tex="\boxed{k = \frac{1}{64}}" />,
    reason: <>Divide both sides by 64. In a "show that" the report expects every step to be explicit, reaching the result in a logical, step-by-step manner — so write each line above, not just the answer. As required.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{E}(T) = \int_0^4 t\,f(t)\,dt" />,
    reason: <>For a continuous random variable, the mean is <Katex tex="\int t\,f(t)\,dt" /> over the values it can take: multiply the density by <Katex tex="t" />, then integrate. <Katex tex="f(t)=0" /> outside <Katex tex="[0,4]" />, so those are the terminals. Write <Katex tex="dt" />, not <Katex tex="dx" /> — the report notes some students mixed their variables here.</>,
  },
  {
    working: <Katex display tex="= \frac{1}{64}\int_0^4 t\cdot t\left(16-t^2\right)dt" />,
    reason: <>Substitute <Katex tex="f(t)" /> with <Katex tex="k=\tfrac{1}{64}" /> from part a., and take the constant out the front.</>,
  },
  {
    working: <Katex display tex="= \frac{1}{64}\int_0^4\left(16t^2-t^4\right)dt" />,
    reason: <><Katex tex="t\cdot t\left(16-t^2\right)=t^2\left(16-t^2\right)" />: the extra <Katex tex="t" /> raises each power by one.</>,
  },
  {
    working: <Katex display tex="= \frac{1}{64}\left[\frac{16t^3}{3}-\frac{t^5}{5}\right]_0^4" />,
    reason: <>Antidifferentiate term by term: raise each power by one and divide by the new power.</>,
  },
  {
    working: <Katex display tex="= \frac{1}{64}\left(\frac{1024}{3}-\frac{1024}{5}\right)" />,
    reason: <>At <Katex tex="t=4" />: <Katex tex="16\times4^3=16\times64=1024" /> and <Katex tex="4^5=1024" />. At <Katex tex="t=0" /> both terms are 0.</>,
  },
  {
    working: <Katex display tex="= \frac{1}{64}\times\frac{2048}{15}" />,
    reason: <>Common denominator 15: <Katex tex="\tfrac{1024}{3}-\tfrac{1024}{5}=\tfrac{5120-3072}{15}=\tfrac{2048}{15}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{E}(T) = \frac{32}{15} = 2\tfrac{2}{15} \ \text{minutes}}" />,
    reason: <>Cancel before multiplying out: <Katex tex="2048\div64=32" />. About <Katex tex="2.13" /> minutes — sensible, since <Katex tex="T" /> lies between 0 and 4 and the density is largest near the middle of that interval.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(T>2\mid T>1) = \frac{\Pr(T>2 \cap T>1)}{\Pr(T>1)}" />,
    reason: <>"Already queued for one minute" means the person's total queuing time is more than 1 minute, so the condition is <Katex tex="T>1" />, not <Katex tex="T=1" /> — the report notes some students read it as <Katex tex="\Pr(T=1)" /> (which is 0 for a continuous variable, so it can't be divided by). Then use <Katex tex="\Pr(A\mid B)=\tfrac{\Pr(A\cap B)}{\Pr(B)}" />.</>,
  },
  {
    working: <Katex display tex="= \frac{\Pr(T>2)}{\Pr(T>1)}" />,
    reason: <>Any time more than 2 is also more than 1, so the intersection is just <Katex tex="T>2" />.</>,
  },
  {
    working: <Katex display tex="\Pr(T>2) = \frac{1}{64}\int_2^4\left(16t-t^3\right)dt" />,
    reason: <><Katex tex="T>2" /> means <Katex tex="t" /> runs from 2 up to 4, the largest value <Katex tex="T" /> can take (<Katex tex="f(t)=0" /> beyond 4) — these are the terminals.</>,
  },
  {
    working: <Katex display tex="= \frac{1}{64}\left[8t^2-\frac{t^4}{4}\right]_2^4" />,
    reason: <>Same antiderivative as part a., new terminals.</>,
  },
  {
    working: <Katex display tex="= \frac{1}{64}\bigl(64-(32-4)\bigr) = \frac{36}{64} = \frac{9}{16}" />,
    reason: <>At <Katex tex="t=4" /> the bracket is <Katex tex="128-64=64" /> (part a.). At <Katex tex="t=2" />: <Katex tex="8(4)-\tfrac{16}{4}=32-4=28" />.</>,
  },
  {
    working: <Katex display tex="\Pr(T>1) = \frac{1}{64}\int_1^4\left(16t-t^3\right)dt" />,
    reason: <>The same integral, now from 1 to 4.</>,
  },
  {
    working: <Katex display tex="= \frac{1}{64}\left[8t^2-\frac{t^4}{4}\right]_1^4" />,
    reason: <>Same antiderivative again.</>,
  },
  {
    working: <Katex display tex="= \frac{1}{64}\left(64-\left(8-\frac14\right)\right) = \frac{1}{64}\times\frac{225}{4}" />,
    reason: <>At <Katex tex="t=1" />: <Katex tex="8(1)-\tfrac{1}{4}=\tfrac{31}{4}" />, and <Katex tex="64-\tfrac{31}{4}=\tfrac{256}{4}-\tfrac{31}{4}=\tfrac{225}{4}" />.</>,
  },
  {
    working: <Katex display tex="= \frac{225}{256}" />,
    reason: <><Katex tex="64\times4=256" />.</>,
  },
  {
    working: <Katex display tex="\Pr(T>2\mid T>1) = \frac{9/16}{225/256} = \frac{9}{16}\times\frac{256}{225}" />,
    reason: <>Dividing by a fraction is multiplying by its reciprocal.</>,
  },
  {
    working: <Katex display tex="= \frac{9\times16}{225} = \frac{9\times16}{9\times25}" />,
    reason: <>Cancel before multiplying, as the report advises: <Katex tex="\tfrac{256}{16}=16" />. Then <Katex tex="225=9\times25" />, so the 9 cancels too.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{16}{25} = 0.64}" />,
    reason: <>Check: this is bigger than <Katex tex="\Pr(T>2)=\tfrac{9}{16}\approx0.56" /> with no condition. Knowing the person has already waited a minute rules out the short waits, so a long wait becomes more likely.</>,
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
        <Explore title="Given T > 1, the area right of t = 1 becomes the new whole">
          <NewWholeWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
