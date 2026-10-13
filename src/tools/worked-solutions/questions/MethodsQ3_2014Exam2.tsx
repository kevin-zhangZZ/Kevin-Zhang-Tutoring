// 2014 Mathematical Methods (CAS) — Exam 2, Section 2 Question 3 (11 marks). A concentration
// model c(t) = (5/2)t·e^(-3t/2): its maximum, the window above 0.5 mg/L, an average rate of
// change and where the instantaneous rate matches it, then recovering a parameter from a
// second model. Question text transcribed from the original paper; the figure is a crop of
// VCAA's own artwork. Answers checked with sympy and against the VCAA examination report.
// Solution is original.
// Interactives (Detailed only) on the two parts under 40% full marks: c(ii) slides a tangent to
// find where it is parallel to the chord, with a toggle showing the rounded −0.23 trap; d moves A
// and k separately to show k alone sets when the peak happens.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import graphSrc from './meth-2014e2-q3-graph.png'
import { Explore, lazyWidget } from '../Explore'

const ParallelTangent = lazyWidget(() => import('../interactives/meth-2014e2-q3cii-parallel'))
const Peak = lazyWidget(() => import('../interactives/meth-2014e2-q3d-peak'))

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
      This question was answered well. Some students gave two answers, <Katex tex="0.33" />{' '}
      and <Katex tex="1.19" />, instead of only the first one, as specified in the question.
      Some students rounded incorrectly and gave <Katex tex="0.32" /> as their answer.
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
      values but did not find the difference for the length of time. Some added the two
      values. Some students incorrectly converted the time to minutes.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [27, 21, 52],
  average: 1.3,
  comment: (
    <>
      Some students worked out the average value of the function. Some used{' '}
      <Katex tex="\dfrac{3-\frac23}{c(3)-c\left(\frac23\right)}" />. Others had incorrect units.
      Some changed their answer to <Katex tex="0.23" /> mg/L/h.
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
      <Katex tex="n'(0.5)=0.74" /> was often used. Some students differentiated by hand
      incorrectly. Some students gave the value of <Katex tex="k" />, not <Katex tex="A" />.
      Others gave an exact answer.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="c(t) = \tfrac52 t e^{-3t/2}" />,
    reason: <>The maximum is at a stationary point, so differentiate — a product rule with a chain rule inside.</>,
    more: (
      <>
        On the CAS, <Cas fn="fMax">fMax((5/2)·t·e^(-3t/2), t) | t ≥ 0</Cas> gives <Katex tex="t=0.6667" /> directly;
        you still substitute that time back into <Katex tex="c" /> to get the concentration.
      </>
    ),
  },
  {
    working: <Katex display tex="c'(t) = \tfrac52 e^{-3t/2}\left(1-\tfrac32 t\right)" />,
    reason: <>Product rule: <Katex tex="\tfrac52e^{-3t/2}+\tfrac52t\cdot\left(-\tfrac32\right)e^{-3t/2}" />, then factorise out <Katex tex="\tfrac52e^{-3t/2}" />.</>,
  },
  {
    working: <Katex display tex="1-\tfrac32t = 0 \implies t = \tfrac23" />,
    reason: <><Katex tex="e^{-3t/2}" /> is never zero, so only the bracket can be. This is the only stationary point, and the graph shows it is the maximum.</>,
  },
  {
    working: <Katex display tex="c\!\left(\tfrac23\right) = \tfrac52\times\tfrac23\times e^{-1} = \tfrac{5}{3e}" />,
    reason: <>Substitute the time back in to get the concentration itself.</>,
  },
  {
    working: <Katex display tex="\boxed{0.61\ \text{mg/L}}" />,
    reason: <>To two decimal places, as asked. The answer is the <em>concentration</em>, not the time <Katex tex="0.67" /> at which it occurs.</>,
    more: (
      <>
        The report lists the three ways this mark was lost: giving the time <Katex tex="t=0.67" /> instead of the
        concentration, leaving the exact value <Katex tex="\tfrac{5}{3e}" /> when two decimal places were asked
        for, and writing the wrong units (such as mm for milligrams).
      </>
    ),
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Cas fn="nSolve">nSolve((5/2)·t·e^(-3t/2) = 0.5, t) | 0 &lt; t &lt; 2/3</Cas>,
    reason: <>The graph rises to its peak at <Katex tex="t=\tfrac23" /> (part a) then decays, so it crosses <Katex tex="0.5" /> twice; the first crossing is before the peak.</>,
    more: (
      <>
        Any restriction that separates the two crossings works (for example <Katex tex="0<t<1" /> also does), but
        the peak is the one boundary you know for certain lies between them.
      </>
    ),
  },
  {
    working: <Katex display tex="t = 0.326268\ldots" />,
    reason: <>Keep the extra digits — part b(ii) needs them.</>,
  },
  {
    working: <Katex display tex="\boxed{t \approx 0.33\ \text{hours}}" />,
    reason: <>The third decimal is 6, so round up to <Katex tex="0.33" />, not down to <Katex tex="0.32" />. Only the <em>first</em> time is wanted.</>,
    more: (
      <>
        The report notes some students gave both crossings, <Katex tex="0.33" /> and <Katex tex="1.19" />. The
        question says &ldquo;first reached&rdquo;, so the second one (which belongs to part b(ii)) costs the mark here.
      </>
    ),
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Cas fn="nSolve">nSolve((5/2)·t·e^(-3t/2) = 0.5, t) | t &gt; 2/3</Cas>,
    reason: <>The second crossing, after the peak at <Katex tex="t=\tfrac23" />, on the decaying side.</>,
  },
  {
    working: <Katex display tex="t = 1.187558\ldots" />,
    reason: <>Again unrounded.</>,
  },
  {
    working: <Katex display tex="\Delta t = 1.187558\ldots - 0.326268\ldots" />,
    reason: <>The concentration is above <Katex tex="0.5" /> between the two crossings, so the length of time is their difference.</>,
    more: (
      <>
        The report notes some students wrote down the two times and stopped, and some added them. Neither is a
        length of time: the concentration rises through <Katex tex="0.5" /> at the first crossing and falls back
        through it at the second, so the time above is <em>later − earlier</em>.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{0.86\ \text{hours}}" />,
    reason: <>In hours, as asked. Subtract the unrounded values so the second decimal place is reliable.</>,
    more: (
      <>
        Rounding the two crossings first gives <Katex tex="1.19-0.33=0.86" /> here too, but that is luck: in
        general, rounding before subtracting can shift the last digit, which is the report&apos;s point about
        working to suitable accuracy. Some students also converted to minutes (about <Katex tex="51.7" /> minutes);
        the question asks for hours.
      </>
    ),
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="\text{average rate of change} = \frac{c(3)-c\!\left(\tfrac23\right)}{3-\tfrac23}" />,
    reason: <>Rise over run between the two endpoints — the gradient of the chord. The change in <Katex tex="c" /> goes on top.</>,
    more: (
      <>
        Two mix-ups from the report. The <em>average value</em> of <Katex tex="c" /> is a different quantity,{' '}
        <Katex tex="\tfrac{1}{3-\frac23}\int_{2/3}^{3} c(t)\,dt\approx0.32" /> mg/L — a concentration, not a rate.
        And putting the run on top, <Katex tex="\dfrac{3-\frac23}{c(3)-c\left(\frac23\right)}" />, gives about{' '}
        <Katex tex="-4.40" />, which is hours per mg/L — the reciprocal of a rate.
      </>
    ),
  },
  {
    working: <Katex display tex="c(3) = \tfrac{15}{2}e^{-4.5} = 0.083317\ldots" />,
    reason: <>Substituting <Katex tex="t=3" />: <Katex tex="\tfrac52\times3=\tfrac{15}{2}" /> and <Katex tex="-\tfrac32\times3=-4.5" />.</>,
  },
  {
    working: <Katex display tex="c\!\left(\tfrac23\right) = \tfrac{5}{3e} = 0.613132\ldots" />,
    reason: <>The peak, from part a.</>,
  },
  {
    working: <Katex display tex="\frac{0.083317\ldots-0.613132\ldots}{\tfrac73} = -0.227063\ldots" />,
    reason: <>The run is <Katex tex="3-\tfrac23=\tfrac73" />. Keep this unrounded for part c(ii).</>,
  },
  {
    working: <Katex display tex="\boxed{-0.23\ \text{mg/L/h}}" />,
    reason: <>Negative, because the concentration falls across this interval. Keep the sign and the units.</>,
    more: (
      <>
        The report notes some students changed their answer to <Katex tex="0.23" /> mg/L/h. A rate of change
        carries its sign: the minus says the concentration is <em>decreasing</em>, by about <Katex tex="0.23" />{' '}
        mg/L each hour on average.
      </>
    ),
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="c'(t) = -0.227063\ldots" />,
    reason: <>The instantaneous rate of change is the derivative <Katex tex="c'(t)" />; set it equal to the average rate from part c(i).</>,
    more: (
      <>
        On the graph, these are the times where the tangent is parallel to the chord from{' '}
        <Katex tex="\left(\tfrac23, c\left(\tfrac23\right)\right)" /> to <Katex tex="\left(3, c(3)\right)" />. There
        are two because <Katex tex="c'" /> starts at <Katex tex="0" /> at the peak, falls to its steepest value{' '}
        <Katex tex="c'\left(\tfrac43\right)=-\tfrac{5}{2e^2}\approx-0.34" />, then rises back towards zero
        (<Katex tex="c'(3)\approx-0.10" />). It passes <Katex tex="-0.227" /> once on the way down and once on the
        way back.
      </>
    ),
  },
  {
    working: <Cas fn="solve">solve(d/dt((5/2)·t·e^(-3t/2)) = -0.227063…, t) | 2/3 &lt; t &lt; 3</Cas>,
    reason: <><Katex tex="c'" /> passes this value twice, either side of the steepest point <Katex tex="t=\tfrac43" />, so use solve (nSolve gives one root). Use the unrounded value from part c(i).</>,
    more: (
      <>
        A likely cause of the report&apos;s &ldquo;did not work to the required number of decimal places&rdquo;: with
        the rounded <Katex tex="-0.23" /> the solutions are <Katex tex="0.905\ldots" /> and <Katex tex="2.101\ldots" />, so they
        round to <Katex tex="0.91" /> and <Katex tex="2.10" /> instead of <Katex tex="0.90" /> and{' '}
        <Katex tex="2.12" />. The second one moves furthest because out on the tail the gradient changes slowly, so a small change in the target gradient
        moves the matching time a long way. If you prefer nSolve, run it twice, on{' '}
        <Katex tex="\tfrac23<t<\tfrac43" /> and on <Katex tex="\tfrac43<t<3" />.
      </>
    ),
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
    reason: <>Two unknowns, so two equations are needed. The maximum supplies both: <Katex tex="n'(0.5)=0" /> and <Katex tex="n(0.5)=0.74" />.</>,
  },
  {
    working: <Katex display tex="n'(t) = Ae^{-kt}(1-kt)" />,
    reason: <>Product rule: <Katex tex="Ae^{-kt}+At\cdot(-k)e^{-kt}" />, then factorise out <Katex tex="Ae^{-kt}" />.</>,
    more: (
      <>
        The report notes some students differentiated by hand incorrectly. The common slip is forgetting the
        chain-rule factor <Katex tex="-k" /> from <Katex tex="e^{-kt}" />. On Exam 2 you can let the CAS
        differentiate (<Cas fn="derivative">d/dt(A·t·e^(-k·t))</Cas>) and check it against this.
      </>
    ),
  },
  {
    working: <Katex display tex="n'(0.5) = 0 \implies 1-0.5k = 0 \implies k = 2" />,
    reason: <>The maximum is <em>at</em> <Katex tex="t=0.5" />, so <Katex tex="n'(0.5)=0" />. As <Katex tex="Ae^{-0.5k}\neq0" />, the bracket must be zero.</>,
    more: (
      <>
        The report says <Katex tex="n'(0.5)=0.74" /> was often used. That mixes up the two facts: <Katex tex="0.74" />{' '}
        is the maximum&apos;s <em>height</em>, a value of <Katex tex="n" />, while the derivative at a maximum is
        always <Katex tex="0" />. The stationary point is at <Katex tex="t=\tfrac1k" /> whatever <Katex tex="A" /> is,
        which is why this equation finds <Katex tex="k" /> on its own.
      </>
    ),
  },
  {
    working: <Katex display tex="n(0.5) = 0.74 \implies A(0.5)e^{-1} = 0.74" />,
    reason: <>Now the height fixes <Katex tex="A" />. With <Katex tex="t=0.5" /> and <Katex tex="k=2" />, <Katex tex="e^{-kt}=e^{-1}" />.</>,
  },
  {
    working: <Katex display tex="A = \frac{0.74\times2}{e^{-1}} = 1.48e = 4.023\ldots" />,
    reason: <>Divide by <Katex tex="0.5e^{-1}" />; dividing by <Katex tex="e^{-1}" /> is the same as multiplying by <Katex tex="e" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A = 4}" />,
    reason: <>To the nearest integer, as asked — not the exact <Katex tex="1.48e" />. It is <Katex tex="A" />, not <Katex tex="k=2" />, that is wanted.</>,
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
          <img loading="lazy" decoding="async"
            src={graphSrc}
            alt="A curve rising steeply from the origin to a peak just above 0.5 and then decaying slowly towards the t-axis — from the original 2014 VCAA exam paper"
            className="w-full max-w-[380px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Maximum Value"
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
        topic="Solve Equation"
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
        topic="Time Above Level"
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
        topic="Average Rate"
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
        topic="Instantaneous Rate"
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
        <Explore title="Two places where the tangent is parallel to the chord">
          <ParallelTangent />
        </Explore>
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        Alicia took part in a similar controlled experiment. However, she used a different
        medicine. The concentration of this different medicine was modelled by the function{' '}
        <Katex tex="n(t)=Ate^{-kt}" />, <Katex tex="t\ge0" />, where <Katex tex="A" /> and{' '}
        <Katex tex="k\in R^+" />.
      </div>

      <PartCard
        letter="d"
        topic="Find Parameter"
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
        <Explore title="Only k moves the peak sideways; A just stretches it">
          <Peak />
        </Explore>
      </PartCard>
    </div>
  )
}
