// 2022 Mathematical Methods — Exam 2, Section B Question 2 (16 marks). Predator and prey
// populations modelled by two sinusoids, then a matrix transformation and a damped version
// of the rabbit model. Question text transcribed from the original paper; the figure is a
// crop of VCAA's own artwork. Answers checked with scipy and against the VCAA examination
// report. Solution is original.
// The transformation Q before part e is written as a matrix, which is off the current study
// design; part e carries a Background translating it into dilations and translations, and the
// working never multiplies a matrix.
//
// Interactive widgets (interactives/meth-2022e2-q2*): (c) slide t through one cycle of r, f and
// r + f, with a toggle for the report's "add the two maxima" line at 6700; (e) raise a level h
// until the areas above and below the combined curve balance at 4142, with a toggle showing the
// average-rate-of-change chord instead; (g) move a tangent along s(t) with s'(t) plotted below:
// the steepest climb for t > 40 is the top of the s' graph (s'' = 0), not s' = 0, and not the
// steepest fall at t = 76.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import graphSrc from './meth-2022e2-q2-populations.png'

const OutOfPhaseW = lazyWidget(() => import('../interactives/meth-2022e2-q2c-out-of-phase'))
const AverageLevelW = lazyWidget(() => import('../interactives/meth-2022e2-q2e-average-level'))
const SteepestClimbW = lazyWidget(() => import('../interactives/meth-2022e2-q2g-steepest-climb'))

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
    working: <Katex display tex="r(0) = 1700\sin(0)+2500 = 0+2500" />,
    reason: <>"Initial" means the start, <Katex tex="t=0" />, and <Katex tex="\sin(0)=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{2500 \text{ rabbits}}" />,
    reason: <>The population starts on the midline of the sine curve, as the graph shows at <Katex tex="t=0" />.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="-1 \le \sin\!\left(\tfrac{\pi t}{80}\right) \le 1" />,
    reason: <>Sine always lies between <Katex tex="-1" /> and 1, so <Katex tex="1700\sin\!\left(\tfrac{\pi t}{80}\right)" /> lies between <Katex tex="-1700" /> and 1700. Work from the rule rather than estimating from the graph.</>,
  },
  {
    working: <Katex display tex="2500-1700 = 800, \quad 2500+1700 = 4200" />,
    reason: <>Midline (2500) minus and plus the amplitude (1700).</>,
  },
  {
    working: <Katex display tex="\boxed{\text{minimum } 800, \ \text{maximum } 4200}" />,
    reason: <>The question asks for population values, not coordinates. The report notes students who gave the points <Katex tex="(120,800)" /> and <Katex tex="(40,4200)" /> without stating the values, and others who gave 700 and 4000.</>,
  },
]

const ROWS_AIII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{period} = \frac{2\pi}{\pi/80} = 160" />,
    reason: <>Successive maxima are one full period apart, and the period of <Katex tex="\sin(nt)" /> is <Katex tex="\tfrac{2\pi}{n}" />. Check on the graph: the rabbit maxima are at <Katex tex="t=40" /> and <Katex tex="t=200" />.</>,
  },
  {
    working: <Katex display tex="\boxed{160 \text{ weeks}}" />,
    reason: <>Not 80, the report's common incorrect answer: 80 weeks is only <em>half</em> a period, the gap from a maximum to the next minimum.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{min } (20,700), \quad \text{max } (100,2500)" />,
    reason: <>The two labelled points on the fox curve.</>,
  },
  {
    working: <Katex display tex="a = \frac{2500-700}{2} = 900" />,
    reason: <>The amplitude is half the distance from the minimum value to the maximum value. Check: the midline is <Katex tex="\tfrac{2500+700}{2}=1600" />, which matches the <Katex tex="+1600" /> in the rule.</>,
  },
  {
    working: <Katex display tex="\tfrac12 \text{ period} = 100-20 = 80 \implies \text{period} = 160" />,
    reason: <>A minimum and the next maximum are half a period apart.</>,
  },
  {
    working: <Katex display tex="\frac{2\pi}{b} = 160 \implies b = \frac{2\pi}{160} = \frac{\pi}{80}" />,
    reason: <>The period of <Katex tex="\sin\bigl(b(t-60)\bigr)" /> is <Katex tex="\tfrac{2\pi}{b}" />; the translation by 60 doesn't change it.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}f(100) &= 900\sin\!\left(\tfrac{\pi}{2}\right)+1600 = 2500\\ f(20) &= 900\sin\!\left(-\tfrac{\pi}{2}\right)+1600 = 700\end{aligned}"
      />
    ),
    reason: <>Substitute both points to confirm the sign: the amplitude calculation only gives the size of <Katex tex="a" />, and <Katex tex="a=-900" /> would put the maximum and minimum the wrong way round. Both points fit, so <Katex tex="a=900" /> and <Katex tex="b=\tfrac{\pi}{80}" />. As required.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}r(t)+f(t) &= 1700\sin\!\left(\tfrac{\pi t}{80}\right)+2500\\ &\quad +900\sin\!\left(\tfrac{\pi(t-60)}{80}\right)+1600\end{aligned}"
      />
    ),
    reason: <>The combined population is the sum of the two models. The two curves peak at different times (rabbits at <Katex tex="t=40" />, foxes at <Katex tex="t=100" />), so the combined maximum is <em>not</em> <Katex tex="4200+2500" />. The report notes adding the two maxima as a common incorrect approach.</>,
  },
  {
    working: <Cas fn="fMax">fMax(r(t) + f(t), t) | 0 ≤ t ≤ 160</Cas>,
    reason: <>Define <Katex tex="r" /> and <Katex tex="f" /> first. One period is enough: both have period 160, so the sum repeats every 160 weeks.</>,
  },
  {
    working: <Katex display tex="t = 53.73\ldots" />,
    reason: <>fMax gives the time of the maximum, not the maximum itself. It lies between the rabbit peak and the fox peak, as expected.</>,
  },
  {
    working: <Katex display tex="r(53.73\ldots)+f(53.73\ldots) = 5339.456\ldots" />,
    reason: <>Substitute the stored time back in.</>,
  },
  {
    working: <Katex display tex="\boxed{5339}" />,
    reason: <>To the nearest whole number: the decimal part .456 is less than .5, so round down. The report notes 5340 as a common incorrect answer.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\text{both } f \text{ and } r \text{ have period } 160" />,
    reason: <>Established in parts a.iii. and b.</>,
  },
  {
    working: <Katex display tex="r(t+160)+f(t+160) = r(t)+f(t)" />,
    reason: <>Each model repeats every 160 weeks, so their sum does too. Graphing <Katex tex="r+f" /> shows one peak in each 160-week cycle (at <Katex tex="t\approx53.7" />, <Katex tex="213.7" />, …), so the maxima are one period apart.</>,
  },
  {
    working: <Katex display tex="\boxed{160 \text{ weeks}}" />,
    reason: <>The report says an exact answer was required: 160 comes from the period, so a decimal estimate such as 160.1 (the report's common incorrect answer) is not accepted.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="t' = \tfrac{90}{\pi}t+60, \qquad y' = 900y+1600" />,
    reason: <>What <Katex tex="Q" /> does to a point <Katex tex="(t,y)" />: each row of the matrix gives one new coordinate (see the note above).</>,
  },
  {
    working: <Katex display tex="t = \frac{\pi(t'-60)}{90}, \qquad y = \frac{y'-1600}{900}" />,
    reason: <>Make the original coordinates the subject, ready to substitute into <Katex tex="y=\sin(t)" />.</>,
  },
  {
    working: <Katex display tex="\frac{y'-1600}{900} = \sin\!\left(\frac{\pi(t'-60)}{90}\right)" />,
    reason: <>The original points satisfy <Katex tex="y=\sin(t)" />, so their images satisfy this equation.</>,
  },
  {
    working: <Katex display tex="g(t) = 900\sin\!\left(\frac{\pi(t-60)}{90}\right)+1600" />,
    reason: <>Make <Katex tex="y'" /> the subject and drop the dashes; call the new fox model <Katex tex="g" />. Its period is <Katex tex="2\pi\div\tfrac{\pi}{90}=180" />, not 160, so it is a different model from <Katex tex="f" /> in part b: don't reuse <Katex tex="f" />.</>,
  },
  {
    working: <Katex display tex="\text{average} = \frac{1}{300-0}\int_0^{300}\bigl(g(t)+r(t)\bigr)\,dt" />,
    reason: <>The average value of a function over <Katex tex="a \le t \le b" /> is <Katex tex="\tfrac{1}{b-a}" /> times its integral from <Katex tex="a" /> to <Katex tex="b" />. The combined population is foxes <em>plus</em> rabbits, so add <Katex tex="r(t)" />: the report notes 1600 (the foxes alone) as a common incorrect answer, and that some students subtracted <Katex tex="r(t)" />. It is the average <em>value</em>, not the average rate of change, which some students used.</>,
  },
  {
    working: <Cas fn="nInt">(1/300)·∫(900·sin(π(t − 60)/90) + 1600 + r(t), t, 0, 300)</Cas>,
    reason: <>Evaluate, with <Katex tex="r" /> defined.</>,
  },
  {
    working: <Katex display tex="= 4142.26\ldots" />,
    reason: <>A sensible size: the two midlines add to <Katex tex="1600+2500=4100" />, and 300 weeks is not a whole number of cycles of either curve, so the average is close to 4100 but not equal to it.</>,
  },
  {
    working: <Katex display tex="\boxed{4142}" />,
    reason: <>To the nearest whole number.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Cas fn="solve">solve(s′(t) = 0, t) | 0 &lt; t &lt; 220</Cas>,
    reason: <>The population is at a maximum where its rate of change is zero. The damping moves the turning points slightly earlier than the maxima of <Katex tex="r" /> at <Katex tex="t=40" /> and 200, so those times can't be reused: the report notes <Katex tex="\tfrac{s(200)-s(40)}{200-40}" /> was often seen. (It happens to round to <Katex tex="-3.6" /> as well, but 40 and 200 are not the maxima of <Katex tex="s" />.)</>,
  },
  {
    working: <Katex display tex="t = 38.058\ldots, \ 118.058\ldots, \ 198.058\ldots" />,
    reason: <>Three turning points in this interval.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}s(38.058\ldots) &= 4012.16\ldots \ \text{(max)}\\ s(118.058\ldots) &= 1310.48\ldots \ \text{(min)}\\ s(198.058\ldots) &= 3435.70\ldots \ \text{(max)}\end{aligned}"
      />
    ),
    reason: <>Substitute to see which are maxima. The middle one is a minimum, so reject it: the report notes students who found the average rate of change between the maximum and the minimum populations.</>,
  },
  {
    working: <Katex display tex="\text{average rate} = \frac{s(198.058\ldots)-s(38.058\ldots)}{198.058\ldots-38.058\ldots}" />,
    reason: <>The average rate of change is the gradient between the two points on the curve. Use the stored, unrounded values: the report notes students who rounded too early.</>,
  },
  {
    working: <Katex display tex="= -3.6028\ldots" />,
    reason: <>Negative because the second peak is lower than the first.</>,
  },
  {
    working: <Katex display tex="\boxed{-3.6 \text{ rabbits per week}}" />,
    reason: <>To one decimal place.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="\text{maximise } s'(t) \implies \text{solve } s''(t) = 0" />,
    reason: <>The <em>rate of change</em>, <Katex tex="s'(t)" />, is what is being maximised. A maximum of <Katex tex="s'" /> is a turning point of the <Katex tex="s'" /> graph, where <em>its</em> derivative <Katex tex="s''" /> is zero. Solving <Katex tex="s'(t)=0" />, as many students did, finds the population's own turning points instead.</>,
  },
  {
    working: <Cas fn="solve">solve(s″(t) = 0, t) | 40 &lt; t &lt; 320</Cas>,
    reason: <>Two full cycles after <Katex tex="t=40" /> are enough to see the pattern.</>,
  },
  {
    working: <Katex display tex="t = 76.11\ldots, \ 156.11\ldots, \ 236.11\ldots, \ 316.11\ldots" />,
    reason: <>These alternate between the population's steepest fall and its steepest climb.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}s'(76.11\ldots) &= -53.1\ldots\\ s'(156.11\ldots) &= 41.79\ldots\\ s'(236.11\ldots) &= -32.8\ldots\\ s'(316.11\ldots) &= 25.8\ldots\end{aligned}"
      />
    ),
    reason: <>Substitute each time into <Katex tex="s'" />. 76 gives the greatest <em>negative</em> rate, the report's other common incorrect answer. Of the positive rates, 41.79 is the largest, and every later climb is smaller: each is <Katex tex="e^{-0.003\times160}\approx0.62" /> times the one 160 weeks earlier. Just after <Katex tex="t=40" /> the rate is negative (<Katex tex="s'(40)\approx-4.5" />), so nothing earlier competes.</>,
  },
  {
    working: <Katex display tex="\boxed{t = 156 \text{ weeks}}" />,
    reason: <>To the nearest whole number. The answer is the time: 41.8 is the rate <Katex tex="s'(156.11\ldots)" /> itself, a common incorrect answer (written in the report as <Katex tex="s(156.11\ldots)" />).</>,
  },
]

const ROWS_H: WorkingRow[] = [
  {
    working: <Katex display tex="t\to\infty: \ e^{-0.003t}\to0" />,
    reason: <>The damping factor decays to zero, while the sine stays between <Katex tex="-1" /> and 1.</>,
  },
  {
    working: <Katex display tex="1700e^{-0.003t}\sin\!\left(\tfrac{\pi t}{80}\right)\to0" />,
    reason: <>A factor shrinking to zero, times something between <Katex tex="-1700" /> and 1700, goes to zero.</>,
  },
  {
    working: <Katex display tex="\boxed{2500 \text{ rabbits}}" />,
    reason: <>Only the constant 2500 is left. Answering 0, the report's common incorrect answer, gives the limit of the oscillating <em>part</em>, not of the population.</>,
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
        <Explore title="The peaks don't line up: the total tops out at 5339, not 4200 + 2500">
          <OutOfPhaseW />
        </Explore>
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
            transformation of <Katex tex="y=\sin(t)" /> under the transformation <Katex tex="Q" />. Give your
            answer correct to the nearest whole number.
          </>
        }
        examinerReport={EXAM_E}
      >
        <Background title="On the matrix notation">
          <p>
            Transformation matrices are no longer on the study design. Multiplied out,{' '}
            <Katex tex="Q" /> sends the point <Katex tex="(t,y)" /> to{' '}
            <Katex tex="\left(\tfrac{90}{\pi}t+60,\ 900y+1600\right)" />. In words: a dilation by
            factor <Katex tex="\tfrac{90}{\pi}" /> from the <Katex tex="y" />-axis and by factor 900 from
            the <Katex tex="t" />-axis, then a translation of 60 units in the positive{' '}
            <Katex tex="t" /> direction and 1600 units in the positive <Katex tex="y" /> direction. A
            current paper would say that in words, and the working would be identical.
          </p>
        </Background>
        <WorkingTable rows={ROWS_E} />
        <Explore title="An average value is the level that balances the area, not a slope between the ends">
          <AverageLevelW />
        </Explore>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Over a longer period of time, it is found that the increase and decrease in the
          population of rabbits gets smaller and smaller.
          <br />
          The population of rabbits over a longer period of time can be modelled by the rule
        </p>
        <Katex display tex="\begin{gathered}s(t)=1700\cdot e^{-0.003t}\cdot\sin\!\left(\dfrac{\pi t}{80}\right)+2500,\\ \text{for all } t\ge0\end{gathered}" />
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
        <Explore title="The steepest climb is the top of the s′ graph, not where s′ = 0">
          <SteepestClimbW />
        </Explore>
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
