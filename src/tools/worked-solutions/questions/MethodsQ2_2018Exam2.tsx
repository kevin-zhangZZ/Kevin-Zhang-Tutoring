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
// Answers re-derived independently in sympy/numpy and checked against the VCAA report and itute
// (all agree: (10/7)log_e(9/2), −33.5, 256, 455.82 mg at t = 7.78). One discrepancy in the report's
// comment on (d)(ii): it quotes the single-tablet peak as 324.34 mg (and 324.34 + 6 = 330.34), but
// b((10/7)log_e(9/2)) = 325.34 to two decimal places; we quote 325.34 in our own working and keep the
// report's comment verbatim. Solution is original.
//
// Interactive widgets (interactives/meth-2018e2-q2*): (a) b(t) as the gap between a slow and a fast
// exponential, largest where their tangents are parallel; (b) the steady rate that lands on b(6) is
// the chord gradient, with the report's "average of the two gradients" failing; (c) the average value
// as the level where the curve above balances the gaps below, vs the hourly-readings method; (d)(i)
// addition of ordinates as stacked bars (the join at t = 6, the crossing, the peak); (d)(ii) the total
// peaks where Tablet 2's rise cancels Tablet 1's fall — before Tablet 2's own peak at 8.15.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import oneTabletSrc from './meth-2018e2-q2-onetablet.png'
import twoTabletsSrc from './meth-2018e2-q2-twotablets.png'

const GapWidget = lazyWidget(() => import('../interactives/meth-2018e2-q2a-gap'))
const ChordWidget = lazyWidget(() => import('../interactives/meth-2018e2-q2b-chord'))
const HeightWidget = lazyWidget(() => import('../interactives/meth-2018e2-q2c-height'))
const StackWidget = lazyWidget(() => import('../interactives/meth-2018e2-q2di-stack'))
const SlopesWidget = lazyWidget(() => import('../interactives/meth-2018e2-q2dii-slopes'))

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
    reason: <>A difference of two decaying exponentials: <Katex tex="b(t)" /> is the <em>gap</em> between a slow one (<Katex tex="e^{-t/5}" />) and a fast one (<Katex tex="e^{-9t/10}" />). The fast one dies away first, so the gap opens up and then closes again. The widget below shows the gap is widest when the two are falling equally fast.</>,
  },
  {
    working: <Katex display tex="b'(t) = \frac{4500}{7}\left(-\frac15 e^{-t/5}+\frac{9}{10}e^{-9t/10}\right) = 0" />,
    reason: <>&ldquo;Maximum amount&rdquo; means a stationary point: the graph rises then falls, so the peak is where <Katex tex="b'(t)=0" />. Each term uses <Katex tex="\frac{d}{dt}e^{kt}=ke^{kt}" />, so the constants <Katex tex="-\frac15" /> and <Katex tex="-\frac{9}{10}" /> come down in front.</>,
  },
  {
    working: <Katex display tex="\frac{9}{10}e^{-9t/10} = \frac15 e^{-t/5}" />,
    reason: <>The factor <Katex tex="\frac{4500}{7}" /> isn't zero, so the bracket must be. Move one term across so each side is a single exponential; one division then leaves <em>one</em> exponential equal to a number, which a log can undo.</>,
  },
  {
    working: <Katex display tex="e^{-9t/10+t/5} = \frac{1/5}{9/10} = \frac{2}{9} \implies e^{-7t/10} = \frac29" />,
    reason: <>Dividing exponentials subtracts their indices: <Katex tex="-\tfrac{9t}{10}+\tfrac{t}{5}=-\tfrac{7t}{10}" />.</>,
  },
  {
    working: <Katex display tex="-\frac{7t}{10} = \log_e\!\left(\frac29\right) \implies t = -\frac{10}{7}\log_e\!\left(\frac29\right)" />,
    reason: <>Take <Katex tex="\log_e" /> of both sides: it undoes <Katex tex="e^{(\ldots)}" /> and brings the index down.</>,
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
    working: <Katex display tex="0\le t<6: \ b_{\text{total}}(t) = b(t)" />,
    reason: <>Before <Katex tex="t=6" /> Tablet 2 hasn't been taken, so the total simply traces Tablet 1's curve. The report says many students traced this part correctly.</>,
  },
  {
    working: <Katex display tex="6\le t\le 12: \ b_{\text{total}}(t) = b(t) + b(t-6)" />,
    reason: <>Tablet 2 is the same curve started six hours later, so its contribution is <Katex tex="b" /> with <Katex tex="t" /> replaced by <Katex tex="t-6" /> (a translation 6 units right). The body holds both at once, so the heights <em>add</em>.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} t=6&: \ b(6)+b(0)\approx190.72 \\ \text{max}&: \ (7.78,\ 455.82) \\ t=12&: \ b(12)+b(6)\approx249.03 \end{aligned}" />,
    reason: <>Three points pin the sketch down. At <Katex tex="t=6" /> Tablet 2 adds <Katex tex="b(0)=0" />, so the second piece starts exactly where the first ends: the report says some students did not <em>join</em> the two sections there. The graph turns a sharp corner at the join, since Tablet 2 arrives rising steeply. The maximum comes from d.ii.</>,
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
    reason: <>Both values are required, both to two decimal places — the report notes students who gave only one. The time is before Tablet 2's own peak at <Katex tex="8.15" />, for the reason in the Background above. Sensible: <Katex tex="455.82" /> is well above either curve's own peak but well below <Katex tex="2\times325=650" />, since Tablet 1 has already decayed a long way by the time Tablet 2 peaks.</>,
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
        <Explore title="Why the peak is where both exponentials fall equally fast">
          <GapWidget />
        </Explore>
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
        <Explore title="The average rate is the one steady rate that lands on b(6)">
          <ChordWidget />
        </Explore>
        <WrongMethod
          title="Average the gradients at t = 2 and t = 6"
          source="Examiner's report"
          working={<Katex display tex="\frac{b'(2)+b'(6)}{2}\approx\frac{9.45+(-36.11)}{2}\approx-13.3" />}
        >
          Each derivative is the rate at a single instant, and two instants say nothing about what the
          curve does in between. Test it: <Katex tex="-13.3" /> mg/h for 4 hours from{' '}
          <Katex tex="b(2)\approx324.7" /> would leave about <Katex tex="271.3" /> mg, but{' '}
          <Katex tex="b(6)\approx190.7" />. An average rate of change must reproduce the actual change,
          which is why it is <Katex tex="\frac{b(6)-b(2)}{6-2}" />.
        </WrongMethod>
      </PartCard>

      <PartCard letter="c" topic="Average Value" marks={2} statement={<>Find the average amount of drug <Katex tex="X" /> in the bloodstream, in milligrams, during the first six hours after one tablet is consumed. Give your answer correct to the nearest milligram.</>} examinerReport={EXAM_C}>
        <WorkingTable rows={ROWS_C} />
        <Explore title="The average value is the level where the curve balances">
          <HeightWidget />
        </Explore>
        <WrongMethod
          title="Add up the readings at t = 0, 1, 2, …, 6 and divide by 6"
          source="Examiner's report"
          working={<Katex display tex="\frac{b(0)+b(1)+\dots+b(6)}{6}\approx265.1" />}
        >
          That is seven readings divided by six, and even a proper mean of the seven readings,{' '}
          <Katex tex="\approx227.2" />, only samples seven instants of a curve that changes all the
          time. The average value of a function over an interval uses every instant: the integral
          adds them all up, and dividing by the width <Katex tex="6-0" /> turns that total back into a
          height.
        </WrongMethod>
        <WrongMethod
          title="Reuse the interval [2, 6] from part b"
          source="Examiner's report"
          working={<Katex display tex="\frac{1}{4}\int_2^6 b(t)\,dt\approx267.9" />}
        >
          Each part sets its own interval. &ldquo;The first six hours after one tablet is
          consumed&rdquo; starts the clock at the tablet, <Katex tex="t=0" />, and runs to{' '}
          <Katex tex="t=6" />. Starting at <Katex tex="t=2" /> leaves out the low early values while the
          drug is still being absorbed, which is why this answer comes out too high.
        </WrongMethod>
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
        <Explore title="Adding the two tablets, height by height">
          <StackWidget />
        </Explore>
        <WrongMethod
          title="Start the total curve where the two dashed curves cross"
          source="Examiner's report"
          working={<Katex display tex="\begin{aligned} t\approx6.51&: \ b(t)=b(t-6)\approx173.2 \\ &\phantom{:}\ \text{total}\approx346.3 \end{aligned}" />}
        >
          The crossing is where the two tablets contribute <em>equal</em> amounts, not where the total
          is. Every point on the total is a sum of the two dashed heights, so at the crossing it sits
          twice as high. The total is also already <Katex tex="190.72" /> mg at <Katex tex="t=6" />:
          it never drops to the crossing point.
        </WrongMethod>
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
          <p>
            Where will the peak be? The total's gradient is{' '}
            <Katex tex="b'(t)+b'(t-6)" />: Tablet 2's rise plus Tablet 1's fall. At Tablet 2's own
            peak (<Katex tex="t\approx8.15" />) its rise has already stopped while Tablet 1 is still
            falling, so the total is already going down. The total peaks a little earlier, where
            the rise and the fall cancel.
          </p>
        </Background>
        <WorkingTable rows={ROWS_DII} />
        <Explore title="Why the total peaks before Tablet 2 does">
          <SlopesWidget />
        </Explore>
        <WrongMethod
          title="Solve b′(t) = 0, and add 6 for the second tablet"
          source="Examiner's report"
          working={<Katex display tex="b'(t)=0 \implies t\approx2.15, \ b\approx325.34" />}
        >
          That is the peak of <em>one</em> tablet on its own, and it ignores the drug still left from
          Tablet 1 (the report quotes this figure as <Katex tex="324.34" />). Adding <Katex tex="6" /> to it
          adds hours to milligrams, which is meaningless. The question is about the total, so
          maximise the total&apos;s rule <Katex tex="b(t)+b(t-6)" />.
        </WrongMethod>
        <WrongMethod
          title="The second peak is six hours after the first, so t = 8"
          source="Examiner's report"
          working={<Katex display tex="\begin{aligned} b(8)+b(2)&\approx453.97 \\ b(8.149)+b(2.149)&\approx450.91 \end{aligned}" />}
        >
          Both are less than <Katex tex="455.82" />. Tablet 2 on its own peaks at{' '}
          <Katex tex="t\approx8.15" />, but Tablet 1 is still falling then, so the total has already
          started to drop. Evaluating at a guessed time never proves a maximum: use the maximum
          feature on the combined rule.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
