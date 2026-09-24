// 2018 Mathematical Methods — Exam 2, Section B, Question 2 (10 marks). A two-exponential
// drug-concentration model: time to peak, average rate of change, average value, then the
// sum of two staggered doses. Question text transcribed from the original paper; both graphs
// are cropped directly from the original VCAA exam PDF, not redrawings.
//
// Part (d)(i) asks for a sketch ON VCAA's printed axes, so the answer curve is an SVG
// overlay on the real cropped image (guide §7), never a redrawing of the underlying figure.
// Calibration was measured programmatically from the printed gridlines of the cropped PNG
// (1314 × 734): thirteen vertical rules at t = 0…12 give the origin x = 252 and
// SX = (1219−252)/12 = 80.5833 px per hour; six horizontal rules give the t-axis at y = 631
// and SY = (631−79)/500 = 1.1040 px per mg.
//
// Answers re-derived independently in sympy/numpy and checked against the VCAA report.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import oneTabletSrc from './meth-2018e2-q2-onetablet.png'
import twoTabletsSrc from './meth-2018e2-q2-twotablets.png'

const EXAM_A: SAExaminerStats = {
  marks: [19, 8, 73],
  average: 1.6,
  comment: (
    <>
      This question was answered well. An exact answer was required. Some students converted{' '}
      <Katex tex="t=2.148\ldots" /> to 2 hours and 15 minutes.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [16, 15, 70],
  average: 1.6,
  comment: (
    <>
      Some students used the average value of the function. Others made
      substitution errors. A common incorrect answer was <Katex tex="33.5" />. Several
      students used the graph to approximate values rather than find <Katex tex="b(6)" /> and{' '}
      <Katex tex="b(2)" />. Some students found the average of the gradient at{' '}
      <Katex tex="b=2" /> and <Katex tex="b=6" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [39, 6, 56],
  average: 1.2,
  comment: (
    <>
      Some students used the interval <Katex tex="[2,6]" /> from Question 2c., instead of{' '}
      <Katex tex="[0,6]" />. Others did not divide by <Katex tex="6" />, which gave{' '}
      <Katex tex="1535.1\ldots" /> mg.{' '}
      <Katex tex="\dfrac{b(0)+b(1)+b(2)+b(3)+b(4)+b(5)+b(6)}{6}" /> was often given. Some
      thought that the first six hours meant <Katex tex="t=1" /> to <Katex tex="t=6" /> instead
      of <Katex tex="t=0" /> to <Katex tex="t=6" />. Others evaluated{' '}
      <Katex tex="\displaystyle\int_0^6 t\times b(t)\,dt" /> or found the average rate of
      change.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [35, 29, 35],
  average: 1.0,
  comment: (
    <>
      Many students were able to trace over the first part of the graph from{' '}
      <Katex tex="t=0" /> to <Katex tex="t=6" />. Some did not join the two sections at{' '}
      <Katex tex="x=6" />, with some starting at the intersection of the two graphs. Students
      could use addition of ordinates or define the function{' '}
      <Katex tex="b_2(t)=b(t)+b(t-6)" /> and use technology to sketch the graph and find the
      position of turning point. Some students shaded the area under the graph.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [74, 6, 19],
  average: 0.5,
  comment: (
    <>
      This question was not answered well. Many students were
      unable to find the new rule and solved <Katex tex="b'(t)=0" /> for <Katex tex="t" />,
      getting <Katex tex="324.34" /> mg for the maximum amount of drug. Some then added six to
      this answer, <Katex tex="324.34+6=330.34" /> mg. Some assumed that <Katex tex="t=8" />.
      Answers were required to two decimal places. Other students gave only one answer.
    </>
  ),
}

// Sampled from b(t) + b(t−6) at 121 points and mapped through the measured calibration.
const TOTAL_PATH =
  'M 252.0 631.0 L 260.1 584.0 L 268.1 541.9 L 276.2 504.4 L 284.2 471.0 L 292.3 441.4 L 300.4 415.1 L 308.4 392.0 L 316.5 371.7 L 324.5 353.9 L 332.6 338.5 L 340.6 325.2 L 348.7 313.7 L 356.8 304.0 L 364.8 295.9 L 372.9 289.2 L 380.9 283.8 L 389.0 279.5 L 397.0 276.3 L 405.1 274.0 L 413.2 272.6 L 421.2 271.9 L 429.3 271.9 L 437.3 272.5 L 445.4 273.7 L 453.5 275.3 L 461.5 277.4 L 469.6 279.9 L 477.6 282.7 L 485.7 285.8 L 493.8 289.2 L 501.8 292.8 L 509.9 296.6 L 517.9 300.6 L 526.0 304.7 L 534.0 309.0 L 542.1 313.3 L 550.2 317.8 L 558.2 322.3 L 566.3 326.9 L 574.3 331.5 L 582.4 336.1 L 590.5 340.8 L 598.5 345.5 L 606.6 350.2 L 614.6 354.8 L 622.7 359.5 L 630.7 364.1 L 638.8 368.7 L 646.9 373.3 L 654.9 377.8 L 663.0 382.3 L 671.0 386.7 L 679.1 391.1 L 687.1 395.5 L 695.2 399.8 L 703.3 404.0 L 711.3 408.2 L 719.4 412.4 L 727.4 416.4 L 735.5 420.4 L 743.6 377.4 L 751.6 339.2 L 759.7 305.5 L 767.7 275.9 L 775.8 250.0 L 783.9 227.4 L 791.9 207.9 L 800.0 191.1 L 808.0 176.8 L 816.1 164.8 L 824.1 154.8 L 832.2 146.7 L 840.3 140.2 L 848.3 135.3 L 856.4 131.7 L 864.4 129.3 L 872.5 128.1 L 880.6 127.8 L 888.6 128.4 L 896.7 129.8 L 904.7 131.9 L 912.8 134.7 L 920.8 138.0 L 928.9 141.8 L 937.0 146.0 L 945.0 150.6 L 953.1 155.6 L 961.1 160.9 L 969.2 166.4 L 977.2 172.1 L 985.3 178.0 L 993.4 184.1 L 1001.4 190.3 L 1009.5 196.6 L 1017.5 203.0 L 1025.6 209.4 L 1033.7 215.9 L 1041.7 222.4 L 1049.8 229.0 L 1057.8 235.5 L 1065.9 242.1 L 1074.0 248.6 L 1082.0 255.1 L 1090.1 261.5 L 1098.1 268.0 L 1106.2 274.3 L 1114.2 280.6 L 1122.3 286.9 L 1130.4 293.1 L 1138.4 299.2 L 1146.5 305.2 L 1154.5 311.2 L 1162.6 317.1 L 1170.7 322.9 L 1178.7 328.7 L 1186.8 334.3 L 1194.8 339.9 L 1202.9 345.4 L 1210.9 350.8 L 1219.0 356.1'

const OVERLAY = (
  <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
    <div className="relative w-full max-w-[560px]">
      <img src={twoTabletsSrc} alt="VCAA's graph of the two tablets as separate dashed curves, with the solved total-amount curve drawn over it in blue and its maximum marked at (7.78, 455.82)" className="w-full" />
      <svg viewBox="0 0 1314 734" className="absolute inset-0 w-full h-full" aria-hidden="true">
        <path d={TOTAL_PATH} fill="none" stroke="#0ea5e9" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx="880.6" cy="127.8" r="11" fill="#0ea5e9" />
        <text x="900" y="112" fill="#0ea5e9" fontSize="34" fontStyle="italic">(7.78, 455.82)</text>
      </svg>
    </div>
  </div>
)

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="b(t) = \frac{4500}{7}\left(e^{-t/5}-e^{-9t/10}\right)" />,
    reason: <>A difference of two decaying exponentials: the slower one (<Katex tex="e^{-t/5}" />) is absorption holding the level up, the faster one (<Katex tex="e^{-9t/10}" />) pulls it down early. The peak is where the two rates balance.</>,
  },
  {
    working: <Katex display tex="b'(t) = \frac{4500}{7}\left(-\frac15 e^{-t/5}+\frac{9}{10}e^{-9t/10}\right) = 0" />,
    reason: <>Differentiate and set to zero for the maximum.</>,
  },
  {
    working: <Katex display tex="\frac{9}{10}e^{-9t/10} = \frac15 e^{-t/5}" />,
    reason: <>Rearranging so each side has one exponential.</>,
  },
  {
    working: <Katex display tex="e^{-9t/10+t/5} = \frac{1/5}{9/10} = \frac{2}{9} \implies e^{-7t/10} = \frac29" />,
    reason: <>Dividing exponentials subtracts their indices: <Katex tex="-\tfrac{9t}{10}+\tfrac{t}{5}=-\tfrac{7t}{10}" />.</>,
  },
  {
    working: <Katex display tex="-\frac{7t}{10} = \log_e\!\left(\frac29\right) \implies t = -\frac{10}{7}\log_e\!\left(\frac29\right)" />,
    reason: <>Taking natural logarithms.</>,
  },
  {
    working: <Katex display tex="\boxed{t = \frac{10}{7}\log_e\!\left(\frac92\right)}" />,
    reason: <>Flipping the fraction absorbs the minus sign, giving the required form <Katex tex="a\log_e(c)" /> with <Katex tex="a=\tfrac{10}{7}" />, <Katex tex="c=\tfrac92" />. An exact answer was required. (<Katex tex="\approx2.15" /> hours — matching the peak just past <Katex tex="t=2" /> on the printed graph.)</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Average rate of change} = \frac{b(6)-b(2)}{6-2}" />,
    reason: <>Average <em>rate</em> of change is the gradient of the chord — the change in amount divided by the change in time. Not the average value of the function, and not the average of two gradients; the report lists both among the errors.</>,
  },
  {
    working: <Katex display tex="b(2) \approx 324.6565, \qquad b(6) \approx 190.7213" />,
    reason: <>Evaluate the rule, not the graph — the report notes several students used the graph to approximate these values.</>,
  },
  {
    working: <Katex display tex="= \frac{190.7213-324.6565}{4}" />,
    reason: <>Later value minus earlier, over the four-hour gap.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx -33.5 \text{ mg/hour}}" />,
    reason: <>Negative, and that sign is part of the answer — the drug is leaving the bloodstream over <Katex tex="[2,6]" />. The report lists <Katex tex="33.5" /> without the minus as a common wrong answer. One decimal place, as asked.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Average value} = \frac{1}{b-a}\int_a^b f(x)\,dx" />,
    reason: <>The standard formula. "Average amount" is an average <em>value</em> of the function — a different thing from part b.'s average rate of change, and the two parts sit side by side precisely to test that.</>,
  },
  {
    working: <Katex display tex="= \frac16\int_0^6 \frac{4500}{7}\left(e^{-t/5}-e^{-9t/10}\right)dt" />,
    reason: <>"During the first six hours" means <Katex tex="t=0" /> to <Katex tex="t=6" />. The report flags students who used <Katex tex="[2,6]" /> from the previous part, or started at <Katex tex="t=1" />.</>,
  },
  {
    working: <Cas fn="nInt">nInt(4500/7*(e^(-t/5)-e^(-9t/10)), t, 0, 6)/6</Cas>,
    reason: <>The integral alone is <Katex tex="1535.1\ldots" />; forgetting to divide by <Katex tex="6" /> leaves that, which the report records as a frequent answer.</>,
  },
  {
    working: <Katex display tex="\boxed{\approx 256 \text{ mg}}" />,
    reason: <>To the nearest milligram. Sanity check against the graph: the curve spends most of the six hours between <Katex tex="200" /> and <Katex tex="325" /> mg, so an average in the mid-<Katex tex="200" />s is the right size. ✓</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="b_{\text{total}}(t) = b(t) + b(t-6) \ \text{ for } \ 6\le t\le 12" />,
    reason: <>Tablet 2 is the same function started six hours later, so its contribution is <Katex tex="b" /> with <Katex tex="t" /> replaced by <Katex tex="t-6" />. Before <Katex tex="t=6" /> it contributes nothing.</>,
  },
  {
    working: <Katex display tex="0\le t<6: \ b_{\text{total}}(t) = b(t)" />,
    reason: <>The total curve simply traces Tablet 1's curve over the first six hours. The report says many students traced this part, but some did not <em>join</em> the two sections at <Katex tex="t=6" /> — the sketch must be one continuous curve, not two pieces.</>,
  },
  {
    working: OVERLAY,
    reason: <>Addition of ordinates: at each time, stack the two dashed heights. The result follows Tablet 1 exactly until <Katex tex="t=6" />, then climbs steeply as Tablet 2 takes effect while Tablet 1 is still present, peaking higher than either curve alone before falling away. Note it does <em>not</em> start at the crossing point of the two dashed curves — another error the report records.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="b_{\text{total}}(t) = b(t)+b(t-6)" />,
    reason: <>The new rule. The report says many students were unable to find it, and instead solved <Katex tex="b'(t)=0" /> for the single-tablet peak.</>,
  },
  {
    working: <Cas fn="define">Define btot(t)=b(t)+b(t-6)</Cas>,
    reason: <>Storing the combined rule first avoids retyping it and makes the next step one line.</>,
  },
  {
    working: <Cas fn="fMax">fMax(btot(t), t) | 6&lt;=t&lt;=12</Cas>,
    reason: <>Restrict to the window after the second tablet. The overall maximum in the first twelve hours must be in there — before <Katex tex="t=6" /> the total is just Tablet 1, which peaks at only <Katex tex="325.34" /> mg.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Maximum} \approx 455.82 \text{ mg at } t \approx 7.78 \text{ hours}}" />,
    reason: <>Both values are required, both to two decimal places — the report notes students who gave only one. Watch the two traps it names: <Katex tex="324.34" /> mg is the report's figure for the single-tablet peak (which is actually <Katex tex="325.34" /> mg), and <Katex tex="330.34" /> comes from adding <Katex tex="6" /> to a milligram figure, which mixes up the units entirely. Sensible: <Katex tex="455.82" /> is well above either curve's own peak but well below <Katex tex="2\times325=650" />, since Tablet 1 has already decayed a long way by the time Tablet 2 peaks.</>,
  },
]

export default function MethodsQ2_2018Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (10 marks)</p>
        <p>
          A drug, <Katex tex="X" />, comes in <Katex tex="500" /> milligram (mg) tablets. The
          amount, <Katex tex="b" />, of drug <Katex tex="X" /> in the bloodstream, in
          milligrams, <Katex tex="t" /> hours after one tablet is consumed is given by the
          function
        </p>
        <p className="mt-2 text-center">
          <Katex display tex="b(t) = \frac{4500}{7}\left(e^{-\frac{t}{5}}-e^{-\frac{9t}{10}}\right)" />
        </p>
      </div>

      <PartCard letter="a" topic="Maximum Time" marks={2} statement={<>Find the time, in hours, it takes for drug <Katex tex="X" /> to reach a maximum amount in the bloodstream after one tablet is consumed. Express your answer in the form <Katex tex="a\log_e(c)" />, where <Katex tex="a,c\in R" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-3">
          The graph of <Katex tex="y=b(t)" /> is shown below for <Katex tex="0\le t\le6" />.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img src={oneTabletSrc} alt="Graph of the amount of drug X against time for one tablet: rising steeply to a peak just above 300 mg near t = 2, then declining to about 190 mg at t = 6, from the original 2018 VCAA exam paper" className="w-full max-w-[520px]" />
        </div>
      </div>

      <PartCard letter="b" topic="Average Rate" marks={2} statement={<>Find the average rate of change of the amount of drug <Katex tex="X" /> in the bloodstream, in milligrams per hour, over the interval <Katex tex="[2,6]" />. Give your answer correct to one decimal place.</>} examinerReport={EXAM_B}>
        <Background>
          <p>
            Parts b. and c. ask for two different "averages" and the wording is the only
            thing distinguishing them. Average <em>rate of change</em> is the gradient of the
            chord between two points — a difference divided by a difference. Average{' '}
            <em>value</em> is the mean height of the curve — an integral divided by the
            interval width.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard letter="c" topic="Average Value" marks={2} statement={<>Find the average amount of drug <Katex tex="X" /> in the bloodstream, in milligrams, during the first six hours after one tablet is consumed. Give your answer correct to the nearest milligram.</>} examinerReport={EXAM_C}>
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-3">
          Six hours after one <Katex tex="500" /> milligram tablet of drug <Katex tex="X" /> is
          consumed (Tablet 1), a second identical tablet is consumed (Tablet 2). The amount of
          drug <Katex tex="X" /> in the bloodstream from each tablet consumed independently is
          shown in the graph below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img src={twoTabletsSrc} alt="Two identical dashed curves six hours apart, labelled Tablet 1 and Tablet 2, on axes running to t = 12 hours, from the original 2018 VCAA exam paper" className="w-full max-w-[520px]" />
        </div>
      </div>

      <PartCard letter="d.i" topic="Sketch Graph" marks={2} statement={<>On the graph above, sketch the total amount of drug <Katex tex="X" /> in the bloodstream during the first 12 hours after Tablet 1 is consumed.</>} examinerReport={EXAM_DI}>
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard letter="d.ii" topic="Maximum Value" marks={2} statement={<>Find the maximum amount of drug <Katex tex="X" /> in the bloodstream in the first 12 hours and the time at which this maximum occurs. Give your answers correct to two decimal places.</>} examinerReport={EXAM_DII}>
        <Background>
          <p>
            <Katex tex="74\%" /> of students scored zero here, and the report says many were
            unable to find the combined rule. A second dose taken at{' '}
            <Katex tex="t=6" /> contributes <Katex tex="b(t-6)" /> — the same curve shifted
            six hours right — and the body holds both at once, so the total is the{' '}
            <em>sum</em>.
          </p>
          <p>
            Once <Katex tex="b(t)+b(t-6)" /> is defined, this is an ordinary maximum on{' '}
            <Katex tex="[6,12]" />. Without it, the only thing left to maximise is the
            single-tablet curve, which is where the report's <Katex tex="324.34" /> mg comes
            from.
          </p>
        </Background>
        <WorkingTable rows={ROWS_DII} />
      </PartCard>
    </div>
  )
}
