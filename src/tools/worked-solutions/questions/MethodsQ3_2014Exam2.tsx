// 2014 Mathematical Methods (CAS) — Exam 2, Section 2 Question 3 (11 marks). A concentration
// model c(t) = (5/2)t·e^(-3t/2): its maximum, the window above 0.5 mg/L, an average rate of
// change and where the instantaneous rate matches it, then recovering a parameter from a
// second model. Question text transcribed from the original paper; the figure is a crop of
// VCAA's own artwork. Answers checked with sympy and against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import graphSrc from './meth-2014e2-q3-graph.png'

const EXAM_A: SAExaminerStats = {
  marks: [25, 75],
  average: 0.8,
  comment: (
    <>
      This question was answered well. Some students had incorrect units, such as mm for
      milligrams. Some left their answers in exact form. Some found <Katex tex="t" /> correct
      to two decimal places and left their answer as <Katex tex="0.67" />.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [19, 81],
  average: 0.8,
  comment: (
    <>
      Some students gave two answers, <Katex tex="0.33" /> and <Katex tex="1.19" />, instead
      of only the first one, as specified in the question. Some students rounded incorrectly
      and gave <Katex tex="0.32" />.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [19, 9, 72],
  average: 1.6,
  comment: (
    <>
      Students should always work to suitable accuracy in intermediate calculations to
      support rounding the answer to the required accuracy. Some students wrote down the two
      values but did not find the difference. Some added the two values.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [27, 21, 52],
  average: 1.3,
  comment: (
    <>
      Some students worked out the average <em>value</em> of the function. Others had
      incorrect units.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [51, 23, 26],
  average: 0.8,
  comment: (
    <>
      Some rounded their answers incorrectly. Others did not work to the required number of
      decimal places.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [31, 27, 12, 29],
  average: 1.4,
  comment: (
    <>
      Many students were able to set up at least one of the equations.{' '}
      <Katex tex="n(0.5)=0.74" /> was often used. Some students differentiated by hand
      incorrectly. Some students gave the value of <Katex tex="k" />, not <Katex tex="A" />.
      Others gave an exact answer.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="c(t) = \tfrac52 t e^{-3t/2}" />,
    reason: <>The maximum is at a stationary point, so differentiate — a product rule with a chain rule inside.</>,
  },
  {
    working: <Katex display tex="c'(t) = \tfrac52 e^{-3t/2}\left(1-\tfrac32 t\right)" />,
    reason: <>Factorising out <Katex tex="e^{-3t/2}" />, which is never zero.</>,
  },
  {
    working: <Katex display tex="1-\tfrac32t = 0 \implies t = \tfrac23" />,
    reason: <>The only stationary point, and the graph shows it is the maximum.</>,
  },
  {
    working: <Katex display tex="c\!\left(\tfrac23\right) = \tfrac52\times\tfrac23\times e^{-1} = \tfrac{5}{3e}" />,
    reason: <>The exact value.</>,
  },
  {
    working: <Katex display tex="\boxed{0.61\ \text{mg/L}}" />,
    reason: <>To two decimal places, as asked. The answer is the <em>concentration</em>, not the time <Katex tex="0.67" /> at which it occurs.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Cas fn="nSolve">nSolve((5/2)·t·e^(-3t/2) = 0.5, t) | 0 &lt; t &lt; 1</Cas>,
    reason: <>The graph rises steeply then decays, so it crosses <Katex tex="0.5" /> twice. Restricting to <Katex tex="t<1" /> picks out the first crossing.</>,
  },
  {
    working: <Katex display tex="t = 0.326268\ldots" />,
    reason: <>Keep the extra digits — part b(ii) needs them.</>,
  },
  {
    working: <Katex display tex="\boxed{t \approx 0.33\ \text{hours}}" />,
    reason: <>Rounding up, not down to <Katex tex="0.32" />. Only the <em>first</em> time is wanted.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Cas fn="nSolve">nSolve((5/2)·t·e^(-3t/2) = 0.5, t) | t &gt; 1</Cas>,
    reason: <>The second crossing, on the decaying side of the peak.</>,
  },
  {
    working: <Katex display tex="t = 1.187558\ldots" />,
    reason: <>Again unrounded.</>,
  },
  {
    working: <Katex display tex="\Delta t = 1.187558\ldots - 0.326268\ldots" />,
    reason: <>The <em>length of time above</em> <Katex tex="0.5" /> is the difference of the two crossings — not their sum, and not either one alone.</>,
  },
  {
    working: <Katex display tex="\boxed{0.86\ \text{hours}}" />,
    reason: <>Rounding the two crossings first would give <Katex tex="1.19-0.33=0.86" /> here too, but working unrounded is what guarantees the second decimal place.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="\text{average rate of change} = \frac{c(3)-c\!\left(\tfrac23\right)}{3-\tfrac23}" />,
    reason: <>Rise over run between the two endpoints — the gradient of the chord. This is not the average <em>value</em> of <Katex tex="c" />, which is an integral.</>,
  },
  {
    working: <Katex display tex="c(3) = \tfrac{15}{2}e^{-4.5} = 0.083317\ldots" />,
    reason: <>The concentration has decayed a long way by <Katex tex="t=3" />.</>,
  },
  {
    working: <Katex display tex="c\!\left(\tfrac23\right) = \tfrac{5}{3e} = 0.613132\ldots" />,
    reason: <>The peak, from part a.</>,
  },
  {
    working: <Katex display tex="\frac{0.083317\ldots-0.613132\ldots}{\tfrac73} = -0.227063\ldots" />,
    reason: <>The run is <Katex tex="3-\tfrac23=\tfrac73" />.</>,
  },
  {
    working: <Katex display tex="\boxed{-0.23\ \text{mg/L/h}}" />,
    reason: <>Negative, because the concentration is falling across this interval. The units matter.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="c'(t) = -0.227063\ldots" />,
    reason: <>The mean value theorem guarantees at least one such <Katex tex="t" /> in the interval; here there are two.</>,
  },
  {
    working: <Cas fn="nSolve">nSolve(d/dt((5/2)·t·e^(-3t/2)) = -0.227063…, t) | 2/3 &lt; t &lt; 3</Cas>,
    reason: <>Use the unrounded value from part c(i), and solve inside the interval.</>,
  },
  {
    working: <Katex display tex="t_1 = 0.900361\ldots, \qquad t_2 = 2.117708\ldots" />,
    reason: <>One on the steep part just past the peak, one out on the flattening tail.</>,
  },
  {
    working: <Katex display tex="\boxed{t_1 \approx 0.90,\quad t_2 \approx 2.12\ \text{hours}}" />,
    reason: <>Both to two decimal places — <Katex tex="0.90" /> keeps its trailing zero.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="n(t) = Ate^{-kt}" />,
    reason: <>Two unknowns, so two equations are needed — the maximum supplies both.</>,
  },
  {
    working: <Katex display tex="n'(t) = Ae^{-kt}(1-kt)" />,
    reason: <>Product rule again, with the same structure as part a.</>,
  },
  {
    working: <Katex display tex="n'(0.5) = 0 \implies 1-0.5k = 0 \implies k = 2" />,
    reason: <>The maximum is <em>at</em> <Katex tex="t=0.5" />, which is the second equation many students missed.</>,
  },
  {
    working: <Katex display tex="n(0.5) = 0.74 \implies A(0.5)e^{-1} = 0.74" />,
    reason: <>Now the height fixes <Katex tex="A" />.</>,
  },
  {
    working: <Katex display tex="A = \frac{0.74\times2}{e^{-1}} = 1.48e = 4.023\ldots" />,
    reason: <>Multiplying by <Katex tex="e" /> rather than dividing by <Katex tex="e^{-1}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A = 4}" />,
    reason: <>To the nearest integer, as asked — and it is <Katex tex="A" />, not <Katex tex="k=2" />, that the question wants.</>,
  },
]

export default function MethodsQ3_2014Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (11 marks)</p>
        <p>
          In a controlled experiment, Juan took some medicine at 8 pm. The concentration of
          medicine in his blood was then measured at regular intervals. The concentration of
          medicine in Juan's blood is modelled by the function{' '}
          <Katex tex="c(t)=\tfrac52 te^{-3t/2}" />, <Katex tex="t\ge0" />, where{' '}
          <Katex tex="c" /> is the concentration of medicine in his blood, in milligrams per
          litre, <Katex tex="t" /> hours after 8 pm. Part of the graph of the function{' '}
          <Katex tex="c" /> is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="A curve rising steeply from the origin to a peak just above 0.5 and then decaying slowly towards the t-axis — from the original 2014 VCAA exam paper"
            className="w-full max-w-[380px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={
          <>
            What was the maximum value of the concentration of medicine in Juan's blood, in
            milligrams per litre, correct to two decimal places?
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b.i"
        marks={1}
        statement={
          <>
            Find the value of <Katex tex="t" />, in hours, correct to two decimal places, when
            the concentration of medicine in Juan's blood first reached 0.5 milligrams per
            litre.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        marks={2}
        statement={
          <>
            Find the length of time that the concentration of medicine in Juan's blood was
            above 0.5 milligrams per litre. Express the answer in hours, correct to two
            decimal places.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="c.i"
        marks={2}
        statement={
          <>
            What was the value of the average rate of change of the concentration of medicine
            in Juan's blood over the interval <Katex tex="\left[\tfrac23,3\right]" />? Express
            the answer in milligrams per litre per hour, correct to two decimal places.
          </>
        }
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        marks={2}
        statement={
          <>
            At times <Katex tex="t_1" /> and <Katex tex="t_2" />, the instantaneous rate of
            change of the concentration of medicine in Juan's blood was equal to the average
            rate of change over the interval <Katex tex="\left[\tfrac23,3\right]" />. Find the
            values of <Katex tex="t_1" /> and <Katex tex="t_2" />, in hours, correct to two
            decimal places.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        Alicia took part in a similar controlled experiment. However, she used a different
        medicine. The concentration of this different medicine was modelled by the function{' '}
        <Katex tex="n(t)=Ate^{-kt}" />, <Katex tex="t\ge0" />, where <Katex tex="A" /> and{' '}
        <Katex tex="k\in R^+" />.
      </div>

      <PartCard
        letter="d"
        marks={3}
        statement={
          <>
            If the maximum concentration of medicine in Alicia's blood was 0.74 milligrams per
            litre at <Katex tex="t=0.5" /> hours, find the value of <Katex tex="A" />, correct
            to the nearest integer.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>
    </div>
  )
}
