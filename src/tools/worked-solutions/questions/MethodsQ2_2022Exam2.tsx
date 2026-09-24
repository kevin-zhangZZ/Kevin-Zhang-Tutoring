// 2022 Mathematical Methods — Exam 2, Section B Question 2 (16 marks). Predator and prey
// populations modelled by two sinusoids, then a matrix transformation and a damped version
// of the rabbit model. Question text transcribed from the original paper; the figure is a
// crop of VCAA's own artwork. Answers checked with scipy and against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import graphSrc from './meth-2022e2-q2-populations.png'

const EXAM_AI: SAExaminerStats = {
  marks: [3, 97],
  average: 1,
  comment: <>This question was done very well.</>,
}

const EXAM_AII: SAExaminerStats = {
  marks: [11, 89],
  average: 0.9,
  comment: (
    <>
      Some students gave the coordinates <Katex tex="(120,800)" /> and{' '}
      <Katex tex="(40,4200)" />, without stating the minimum and maximum values. Others had
      the minimum as 700 and the maximum as 4000.
    </>
  ),
}

const EXAM_AIII: SAExaminerStats = {
  marks: [16, 84],
  average: 0.9,
  comment: <>A common incorrect answer was 80.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [19, 13, 68],
  average: 1.5,
  comment: (
    <>
      As this was a 'show that' question, appropriate working needed to be shown. Students
      used a range of techniques to find the correct values of <Katex tex="a" /> and{' '}
      <Katex tex="b" />. Many students substituted in points from the graphs and solved
      simultaneous equations. Other students took a similar approach using the derivative.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [62, 38],
  average: 0.4,
  comment: (
    <>
      This question was not answered well. There were rounding errors, with 5340 as a common
      incorrect answer. A common incorrect approach was to add the maximum value of rabbits to
      the maximum value of foxes, without recognising that the maximum values for each animal
      occurred at different times.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [43, 57],
  average: 0.6,
  comment: <>An exact answer was required. A common incorrect answer was 160.1.</>,
}

const EXAM_E: SAExaminerStats = {
  marks: [40, 12, 22, 4, 22],
  average: 1.6,
  comment: (
    <>
      Many students were able to do the transformation. Some did not add{' '}
      <Katex tex="r(t)" /> in the integral. 1600 was a common incorrect answer. Others
      subtracted <Katex tex="r(t)" />. Some students used average rate of change instead of
      average value.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [54, 5, 41],
  average: 0.9,
  comment: (
    <>
      Some students rounded their values too early.{' '}
      <Katex tex="\tfrac{s(200)-s(40)}{200-40}" /> was often seen. Some students found the
      average rate of change between the maximum and the minimum populations. Others used{' '}
      <Katex tex="r(t)" /> instead of <Katex tex="s(t)" />.
    </>
  ),
}

const EXAM_G: SAExaminerStats = {
  marks: [69, 12, 19],
  average: 0.5,
  comment: (
    <>
      Many students solved <Katex tex="\tfrac{ds}{dt}=0" />. A common incorrect answer was
      41.8, <Katex tex="s(156.11\ldots)=41.79\ldots" /> Another common incorrect answer was 76
      weeks. This is when the rate of change of the rabbit population is at its greatest
      negative value.
    </>
  ),
}

const EXAM_H: SAExaminerStats = {
  marks: [44, 56],
  average: 0.6,
  comment: <>This question was reasonably well done. A common incorrect answer was 0.</>,
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="r(0) = 1700\sin(0)+2500" />,
    reason: <>"Initial" means t = 0.</>,
  },
  {
    working: <Katex display tex="\boxed{2500 \text{ rabbits}}" />,
    reason: <>The midline value, since the sine starts at zero.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="-1 \le \sin\!\left(\tfrac{\pi t}{80}\right) \le 1" />,
    reason: <>The amplitude 1700 scales this.</>,
  },
  {
    working: <Katex display tex="2500-1700 = 800, \quad 2500+1700 = 4200" />,
    reason: <>Midline minus and plus the amplitude.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{minimum } 800, \ \text{maximum } 4200}" />,
    reason: <>Population values, not coordinates — the report notes students who gave the points instead.</>,
  },
]

const ROWS_AIII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{period} = \frac{2\pi}{\pi/80}" />,
    reason: <>Successive maxima are one full period apart.</>,
  },
  {
    working: <Katex display tex="\boxed{160 \text{ weeks}}" />,
    reason: <>80 is the <em>half</em>-period, the gap from a maximum to the next minimum — the report's common error.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{min } (20,700), \ \text{max } (100,2500)" />,
    reason: <>The two labelled points on the fox curve.</>,
  },
  {
    working: <Katex display tex="a = \frac{2500-700}{2} = 900" />,
    reason: <>Half the range is the amplitude. The midline is <Katex tex="\tfrac{2500+700}{2}=1600" />, which matches the <Katex tex="+1600" /> in the rule.</>,
  },
  {
    working: <Katex display tex="\text{min to max} = 100-20 = 80 = \tfrac12\text{period}" />,
    reason: <>A minimum and the next maximum are half a period apart.</>,
  },
  {
    working: <Katex display tex="\text{period} = 160 = \frac{2\pi}{b} \implies \boxed{b = \frac{\pi}{80}}" />,
    reason: <>Matching the rabbit period, as the stem says it must. A check on the phase: <Katex tex="f(60)=1600" /> and the curve is rising there, consistent with a minimum at 20 and a maximum at 100. As required.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="P(t) = f(t)+r(t) = 900\sin\!\left(\tfrac{\pi(t-60)}{80}\right)+1700\sin\!\left(\tfrac{\pi t}{80}\right)+4100" />,
    reason: <>Adding the two models. The two sinusoids are <em>out of phase</em>, so the combined maximum is not <Katex tex="2500+4200" /> — the report notes adding the two maxima as a common incorrect approach.</>,
  },
  {
    working: <Cas fn="fMax">fMax(f(t) + r(t), t) | 0 ≤ t ≤ 160</Cas>,
    reason: <>One period is enough, since both components share it.</>,
  },
  {
    working: <Katex display tex="\text{maximum} = 5339.45\ldots \text{ at } t \approx 53.7" />,
    reason: <>Between the two individual peaks, as expected.</>,
  },
  {
    working: <Katex display tex="\boxed{5339}" />,
    reason: <>To the nearest whole number — <Katex tex="5339.45" /> rounds <em>down</em>, so 5340 is wrong.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\text{both } f \text{ and } r \text{ have period } 160" />,
    reason: <>Established in parts a.iii. and b.</>,
  },
  {
    working: <Katex display tex="\boxed{160 \text{ weeks}}" />,
    reason: <>A sum of two functions of the same period repeats with that period, so the combined maxima are 160 weeks apart. Exact, not the numerically-hunted 160.1.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="Q\!\begin{bmatrix}t\\y\end{bmatrix} = \begin{bmatrix}\tfrac{90}{\pi}&0\\0&900\end{bmatrix}\begin{bmatrix}t\\y\end{bmatrix}+\begin{bmatrix}60\\1600\end{bmatrix}" />,
    reason: <>A dilation in each direction, then a translation.</>,
  },
  {
    working: <Katex display tex="t' = \tfrac{90}{\pi}t+60 \implies t = \frac{\pi(t'-60)}{90}" />,
    reason: <>Inverting the horizontal component.</>,
  },
  {
    working: <Katex display tex="y' = 900y+1600 \implies y' = 900\sin\!\left(\frac{\pi(t'-60)}{90}\right)+1600" />,
    reason: <>The new fox model. Note the period is now <Katex tex="180" />, not 160 — the transformation is not the same as part b.</>,
  },
  {
    working: <Katex display tex="\text{average} = \frac{1}{300}\int_0^{300}\bigl(y'(t)+r(t)\bigr)dt" />,
    reason: <>Average <em>value</em> of the <em>combined</em> population — omitting <Katex tex="r(t)" /> gives 1600, a common incorrect answer in the report.</>,
  },
  {
    working: <Cas fn="nInt">(1/300)·∫(900·sin(π(t − 60)/90) + 1600 + r(t), t, 0, 300)</Cas>,
    reason: <>Evaluating.</>,
  },
  {
    working: <Katex display tex="\boxed{4142}" />,
    reason: <>To the nearest whole number. Comfortably near the combined midline of 4100, as it should be.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="s(t) = 1700e^{-0.003t}\sin\!\left(\tfrac{\pi t}{80}\right)+2500" />,
    reason: <>A damped version of r.</>,
  },
  {
    working: <Cas fn="solve">solve(s′(t) = 0, t) | 0 &lt; t &lt; 220</Cas>,
    reason: <>The damping shifts the maxima slightly earlier than the undamped <Katex tex="t=40" /> and <Katex tex="t=200" /> — the report notes <Katex tex="\tfrac{s(200)-s(40)}{200-40}" /> was often seen.</>,
  },
  {
    working: <Katex display tex="t_1 = 38.0584\ldots, \quad t_2 = 198.0584\ldots" />,
    reason: <>Exactly one period apart, as the damping does not change the spacing.</>,
  },
  {
    working: <Katex display tex="\text{average rate} = \frac{s(t_2)-s(t_1)}{t_2-t_1}" />,
    reason: <>A gradient between two points on the curve, using the stored values.</>,
  },
  {
    working: <Katex display tex="\boxed{-3.6 \text{ rabbits per week}}" />,
    reason: <>Negative: the peaks are shrinking. To one decimal place.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="\text{maximise } s'(t) \implies \text{solve } s''(t) = 0" />,
    reason: <>The <em>rate of change</em> is what is being maximised, so differentiate once more — solving <Katex tex="s'(t)=0" /> finds the population's own turning points instead.</>,
  },
  {
    working: <Cas fn="solve">solve(s″(t) = 0, t) | t &gt; 40</Cas>,
    reason: <>Restricting as the question says. There are two families of roots — the maxima and the minima of <Katex tex="s'" />.</>,
  },
  {
    working: <Katex display tex="t = 156.1168\ldots \ \text{ gives } s'(t) = 41.79 > 0" />,
    reason: <>The other candidate near <Katex tex="t=76" /> gives the greatest <em>negative</em> rate — the report notes 76 weeks as a common incorrect answer.</>,
  },
  {
    working: <Katex display tex="\boxed{t = 156 \text{ weeks}}" />,
    reason: <>To the nearest whole number. Note 41.8 is the rate <Katex tex="s'(156.11\ldots)" /> itself, not the time. (The report's comment writes it as <Katex tex="s(156.11\ldots)" />.)</>,
  },
]

const ROWS_H: WorkingRow[] = [
  {
    working: <Katex display tex="t\to\infty: \ e^{-0.003t}\to0" />,
    reason: <>The damping factor decays, and the sine stays bounded.</>,
  },
  {
    working: <Katex display tex="1700e^{-0.003t}\sin\!\left(\tfrac{\pi t}{80}\right)\to0" />,
    reason: <>A bounded oscillation times a vanishing factor.</>,
  },
  {
    working: <Katex display tex="\boxed{2500 \text{ rabbits}}" />,
    reason: <>The constant term survives. Answering 0 confuses the limit of the oscillating <em>part</em> with the limit of the population.</>,
  },
]

export default function MethodsQ2_2022Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (16 marks)</p>
        <p>
          On a remote island, there are only two species of animals: foxes and rabbits. The
          foxes are the predators and the rabbits are their prey.
          <br />
          The populations of foxes and rabbits increase and decrease in a periodic pattern,
          with the period of both populations being the same, as shown in the graph below, for
          all <Katex tex="t\ge0" />, where time <Katex tex="t" /> is measured in weeks.
          <br />
          One point of minimum fox population, <Katex tex="(20,700)" />, and one point of
          maximum fox population, <Katex tex="(100,2500)" />, are also shown on the graph.
          <br />
          The graph has been drawn to scale.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="Two out-of-phase sinusoidal population curves against time in weeks from 0 to 320: the rabbit population r(t) oscillating between 800 and 4200, and the fox population f(t) between 700 and 2500, with the points (20, 700) and (100, 2500) marked — from the original 2022 VCAA exam paper"
            className="w-full max-w-[520px]"
          />
        </div>
        <p>
          The population of rabbits can be modelled by the rule{' '}
          <Katex tex="r(t)=1700\sin\!\left(\dfrac{\pi t}{80}\right)+2500" />.
        </p>
      </div>

      <PartCard letter="a.i" topic="Initial Value" marks={1} statement={<>State the initial population of rabbits.</>} examinerReport={EXAM_AI}>
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Max & Min"
        marks={1}
        statement={<>State the minimum and maximum population of rabbits.</>}
        examinerReport={EXAM_AII}
      >
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <PartCard
        letter="a.iii"
        topic="Period"
        marks={1}
        statement={<>State the number of weeks between maximum populations of rabbits.</>}
        examinerReport={EXAM_AIII}
      >
        <WorkingTable rows={ROWS_AIII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The population of foxes can be modelled by the rule{' '}
          <Katex tex="f(t)=a\sin\bigl(b(t-60)\bigr)+1600" />.
        </p>
      </div>

      <PartCard
        letter="b"
        topic="Find Parameters"
        marks={2}
        statement={
          <>
            Show that <Katex tex="a=900" /> and <Katex tex="b=\dfrac{\pi}{80}" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Maximum Value"
        marks={1}
        statement={
          <>
            Find the maximum combined population of foxes and rabbits. Give your answer
            correct to the nearest whole number.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Period"
        marks={1}
        statement={
          <>
            What is the number of weeks between the periods when the combined population of
            foxes and rabbits is a maximum?
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          The population of foxes is better modelled by the transformation of{' '}
          <Katex tex="y=\sin(t)" /> under <Katex tex="Q" /> given by{' '}
          <Katex tex="Q:R^2\to R^2,\ Q\!\begin{bmatrix}t\\y\end{bmatrix}=\begin{bmatrix}\tfrac{90}{\pi}&0\\0&900\end{bmatrix}\begin{bmatrix}t\\y\end{bmatrix}+\begin{bmatrix}60\\1600\end{bmatrix}" />
          .
        </p>
      </div>

      <PartCard
        letter="e"
        topic="Average Value"
        marks={4}
        statement={
          <>
            Find the average population during the first 300 weeks for the combined
            population of foxes and rabbits, where the population of foxes is modelled by the
            transformation of <Katex tex="y=\sin(t)" /> under <Katex tex="Q" />. Give your
            answer correct to the nearest whole number.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Over a longer period of time, it is found that the increase and decrease in the
          population of rabbits gets smaller and smaller.
          <br />
          The population of rabbits over a longer period of time can be modelled by the rule
        </p>
        <Katex display tex="s(t)=1700\cdot e^{-0.003t}\cdot\sin\!\left(\dfrac{\pi t}{80}\right)+2500,\qquad \text{for all } t\ge0" />
      </div>

      <PartCard
        letter="f"
        topic="Average Rate"
        marks={2}
        statement={
          <>
            Find the average rate of change between the first two times when the population
            of rabbits is at a maximum. Give your answer correct to one decimal place.
          </>
        }
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>

      <PartCard
        letter="g"
        topic="Maximum Rate"
        marks={2}
        statement={
          <>
            Find the time, where <Katex tex="t>40" />, in weeks, when the rate of change of
            the rabbit population is at its greatest positive value. Give your answer correct
            to the nearest whole number.
          </>
        }
        examinerReport={EXAM_G}
      >
        <WorkingTable rows={ROWS_G} />
      </PartCard>

      <PartCard
        letter="h"
        topic="Long-Term Value"
        marks={1}
        statement={
          <>
            Over time, the rabbit population approaches a particular value.
            <br />
            State this value.
          </>
        }
        examinerReport={EXAM_H}
      >
        <WorkingTable rows={ROWS_H} />
      </PartCard>
    </div>
  )
}
