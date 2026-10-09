// 2023 Mathematical Methods — Exam 2, Section B Question 2 (11 marks). An observation wheel
// modelled by a cosine: average value against average rate of change, then a piecewise
// version after the wheel stops and speeds up. Question text transcribed from the original
// paper; the stem figure is a crop of VCAA's own artwork and the graph is our own drawing of
// the answer. Answers checked with sympy and against the VCAA examination report. Solution is
// original. Interactives: d.ii meth-2023e2-q2dii-join (slide n until the third piece joins the
// stationary piece at t = 20; the solutions repeat every 30); d.iii meth-2023e2-q2diii-wheel
// (turn the wheel beside the graph to see why w is curved, with a straight-line-sketch toggle).
// Concise/Detailed review (Oct 2026): reasons trimmed to the step itself; report commentary,
// checks and alternatives moved to each row's `more`; both widgets audited and kept (they show
// exactly the two things the report says students missed: the join/general solution, and the
// curvature). The Background's average-value formula uses t1, t2 so it can't clash with b.
// Final review: the d.iii widget's "slow / flattest" Notice now shows only where the rate is under
// half its 12.6 m/min top (t < 2.5 or t > 12.5), starting at t = 2; Exam 2 CAS routes (nInt for
// b, solve for d.ii) added in `more`; Background para 2 no longer repeats the d.i reasons.

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import wheelSrc from './meth-2023e2-q2-wheel.png'
import sketchSrc from './meth-2023e2-q2diii-sketch.png'

const JoinWidget = lazyWidget(() => import('../interactives/meth-2023e2-q2dii-join'))
const WheelWidget = lazyWidget(() => import('../interactives/meth-2023e2-q2diii-wheel'))

const EXAM_A: SAExaminerStats = {
  marks: [16, 18, 66],
  average: 1.5,
  comment: (
    <>
      As this was a 'show that' question, appropriate working with logical sequencing needed to
      be shown. Many students were able to show that <Katex tex="c=75" />. Some students wrote{' '}
      <Katex tex="\text{Period}=b" /> instead of <Katex tex="\text{Period}=\tfrac{2\pi}{b}" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [54, 3, 42],
  average: 0.9,
  comment: (
    <>
      Some students had the correct formula for average value of a function but used incorrect
      values. <Katex tex="\tfrac{1}{60}\int_0^{60}h(t)\,dt" /> was often seen. Other students
      found the average rate of change.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [45, 55],
  average: 0.5,
  comment: <>A common incorrect answer was <Katex tex="-8" />.</>,
}

const EXAM_DI: SAExaminerStats = {
  marks: [60, 40],
  average: 0.4,
  comment: (
    <>
      Many students were able to find <Katex tex="k" />, but not <Katex tex="m" />.{' '}
      <Katex tex="m=\tfrac12" /> was often seen.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [76, 12, 12],
  average: 0.4,
  comment: (
    <>
      This question was not done well. Some students were able to set up a correct equation. A
      general solution was required. Some students wrote <Katex tex="p\in R" />.
    </>
  ),
}

const EXAM_DIII: SAExaminerStats = {
  marks: [39, 25, 12, 24],
  average: 1.2,
  comment: (
    <>
      Many students had the correct graph for <Katex tex="0\le t\le15" />. The coordinates of
      the endpoints were missing on some graphs. Some students did not draw graphs with the
      correct curvature. Linear graphs were sometimes seen.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Period} = \frac{2\pi}{b} = 30" />,
    reason: <>One full rotation takes 30 minutes, and the period of <Katex tex="\cos(bt)" /> is <Katex tex="\tfrac{2\pi}{b}" />.</>,
    more: <>Not <Katex tex="b" /> itself: the report notes some students wrote <Katex tex="\text{Period}=b" />. The angle inside the cosine, <Katex tex="bt" />, grows by <Katex tex="b" /> radians every minute, and one full cycle is <Katex tex="2\pi" /> radians, so a cycle takes <Katex tex="\tfrac{2\pi}{b}" /> minutes.</>,
  },
  {
    working: <Katex display tex="\boxed{b = \frac{2\pi}{30} = \frac{\pi}{15}}" />,
    reason: <>Rearranging, taking <Katex tex="b" /> positive.</>,
    more: <>A negative <Katex tex="b" /> would give the same model anyway, because <Katex tex="\cos(-x)=\cos(x)" />.</>,
  },
  {
    working: <Katex display tex="t=0 \text{ is at } A \implies h(0) = 15" />,
    reason: <>The pod starts at the lowest point, 15 m above the ground.</>,
  },
  {
    working: <Katex display tex="-60\cos(0)+c = 15 \implies -60+c = 15" />,
    reason: <>Substituting <Katex tex="t=0" />, with <Katex tex="\cos(0)=1" />.</>,
    more: <>So at <Katex tex="t=0" /> the cosine term is at its most negative, <Katex tex="-60" />. That is exactly why the model uses <Katex tex="-60\cos" /> rather than <Katex tex="+60\cos" />: the pod starts at the bottom.</>,
  },
  {
    working: <Katex display tex="\boxed{c = 75}" />,
    reason: <>Adding 60 to both sides. As required.</>,
    more: <>It checks geometrically: the centre <Katex tex="P" /> is <Katex tex="15+60=75" /> m up, which is the model's midline.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="A \text{ to } B \text{ is a quarter turn} \implies t \text{ from } 0 \text{ to } 7.5" />,
    reason: <>Turning anticlockwise from the lowest point <Katex tex="A" />, the pod reaches <Katex tex="B" />, level with the centre <Katex tex="P" />, after a quarter turn. A quarter of 30 minutes is <Katex tex="\tfrac{30}{4}=7.5" /> minutes.</>,
  },
  {
    working: <Katex display tex="\text{average height} = \frac{1}{7.5-0}\int_0^{7.5}h(t)\,dt" />,
    reason: <>The average height is the <em>average value</em> of <Katex tex="h" /> over the trip: its integral over the time interval, divided by the length of the interval.</>,
    more: <>The report notes <Katex tex="\tfrac{1}{60}\int_0^{60}h(t)\,dt" /> was often seen: the right formula with the wrong values. Both the terminals and the divisor come from the trip itself, which runs from <Katex tex="t=0" /> at <Katex tex="A" /> to <Katex tex="t=7.5" /> at <Katex tex="B" />. The report also notes some students found the average rate of change instead; that measures how fast the height changes, not how high the pod is on average.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\int_0^{7.5}\left(-60\cos\!\left(\frac{\pi t}{15}\right)+75\right)dt\\ &= \left[-\frac{900}{\pi}\sin\!\left(\frac{\pi t}{15}\right)+75t\right]_0^{7.5}\end{aligned}" />,
    reason: <><Katex tex="\int\cos(kt)\,dt=\tfrac{1}{k}\sin(kt)" /> with <Katex tex="k=\tfrac{\pi}{15}" />, so <Katex tex="\tfrac1k=\tfrac{15}{\pi}" /> and the cosine term becomes <Katex tex="-60\times\tfrac{15}{\pi}=-\tfrac{900}{\pi}" /> times the sine.</>,
  },
  {
    working: <Katex display tex="= -\frac{900}{\pi}+562.5 = 276.02\ldots" />,
    reason: <>At the upper terminal <Katex tex="\sin\!\left(\tfrac\pi2\right)=1" /> and <Katex tex="75\times7.5=562.5" />; at the lower terminal both terms are 0. Keep the unrounded value for the last step.</>,
    more: <>In Exam 2 you can also get this number straight from CAS, <Cas fn="nInt">nInt(−60·cos(π·t/15) + 75, t, 0, 7.5)</Cas>, and divide by 7.5. The antiderivative above shows where it comes from.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{276.02\ldots}{7.5} \approx 36.80 \ \text{metres}}" />,
    reason: <>Dividing by 7.5, correct to two decimal places as asked (exactly <Katex tex="75-\tfrac{120}{\pi}" />).</>,
    more: <>Check: the pod climbs from 15 m to 75 m, and the answer is below the half-way height of 45 m. That is because near the bottom the pod moves mostly sideways, so it lingers at low heights: it is below 45 m for the first 5 of the 7.5 minutes.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{average rate of change} = \frac{h(7.5)-h(0)}{7.5-0}" />,
    reason: <>Change in height divided by change in time, between the start and end of the trip: <Katex tex="t=0" /> at <Katex tex="A" /> and <Katex tex="t=7.5" /> at <Katex tex="B" /> (part b).</>,
  },
  {
    working: <Katex display tex="h(7.5) = -60\cos\!\left(\frac\pi2\right)+75 = 75" />,
    reason: <><Katex tex="\cos\!\left(\tfrac\pi2\right)=0" />: <Katex tex="B" /> is level with the centre, 75 m up.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{75-15}{7.5} = 8 \ \mathrm{m/min}}" />,
    reason: <>Later height minus earlier height, over the time taken. Positive, because the pod is rising.</>,
    more: <>The report notes <Katex tex="-8" /> was a common incorrect answer, which is what subtracting in the wrong order, <Katex tex="h(0)-h(7.5)" />, gives. The sign is a free check: from <Katex tex="A" /> to <Katex tex="B" /> the pod goes up, so the average rate of change must be positive.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="k = h(15) = -60\cos(\pi)+75 = 60+75" />,
    reason: <><Katex tex="k" /> is the height while the wheel is stopped, which is where the pod was at <Katex tex="t=15" />. Fifteen minutes is half of a 30-minute rotation, so the pod is at the very top.</>,
  },
  {
    working: <Katex display tex="\boxed{k = 135}" />,
    reason: <>Using <Katex tex="\cos(\pi)=-1" /> in the line above, so <Katex tex="-60\cos(\pi)=60" />.</>,
    more: <>Check: the bottom of the wheel is 15 m up and the diameter is 120 m, so the top is <Katex tex="15+120=135" /> m ✓.</>,
  },
  {
    working: <Katex display tex="\text{period of } h(mt+n) = \frac{2\pi}{m\times\frac{\pi}{15}} = \frac{30}{m}" />,
    reason: <>Inside <Katex tex="h" />, <Katex tex="t" /> is now multiplied by <Katex tex="m" />, so the coefficient of <Katex tex="t" /> in the cosine is <Katex tex="m\times\tfrac{\pi}{15}" />. The period is <Katex tex="2\pi" /> divided by that coefficient, as in part a; the <Katex tex="+n" /> only shifts the graph.</>,
  },
  {
    working: <Katex display tex="\text{double speed} \implies \frac{30}{m} = 15" />,
    reason: <>Twice as fast means one full rotation takes half as long: 15 minutes instead of 30.</>,
  },
  {
    working: <Katex display tex="\boxed{m = 2}" />,
    reason: <>Doubling the speed squeezes the graph horizontally: a dilation by a factor of <Katex tex="\tfrac12" /> from the vertical axis.</>,
    more: <>The report notes <Katex tex="m=\tfrac12" /> was often seen. A likely slip: <Katex tex="\tfrac12" /> is the dilation factor, but the number that multiplies <Katex tex="t" /> is its reciprocal, 2. Check: <Katex tex="m=\tfrac12" /> would make the period <Katex tex="\tfrac{30}{1/2}=60" /> minutes, which halves the speed instead of doubling it.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&w \text{ continuous at } t=20\\ &\implies h(m(20)+n) = k = 135\end{aligned}" />,
    reason: <>The pod restarts from where it stopped, so the third piece must start at the stopped height, <Katex tex="k=135" /> (part d.i). Set the pieces equal at the join, <Katex tex="t=20" />.</>,
    more: <>This is the key step: the report says the question was not done well, and that some students were able to set up a correct equation. The equation comes from one idea: whenever a piecewise model describes one object moving, its pieces must join up, because a jump in the graph would mean the pod teleports.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&h(40+n) = 135\\ &\implies -60\cos\!\left(\frac{\pi(40+n)}{15}\right)+75 = 135\end{aligned}" />,
    reason: <>Substituting <Katex tex="m=2" /> from part d.i, then the rule for <Katex tex="h" />.</>,
  },
  {
    working: <Katex display tex="\cos\!\left(\frac{\pi(40+n)}{15}\right) = -1" />,
    reason: <>Subtracting 75, then dividing by <Katex tex="-60" />.</>,
  },
  {
    working: <Katex display tex="\frac{\pi(40+n)}{15} = \pi+2p\pi, \ p\in Z" />,
    reason: <>Cosine equals <Katex tex="-1" /> at every odd multiple of <Katex tex="\pi" />: <Katex tex="\ldots,-\pi,\ \pi,\ 3\pi,\ldots" />. The question asks for <b>all</b> values of <Katex tex="n" />, so write the <em>general</em> solution, with <Katex tex="p" /> an integer.</>,
    more: <>The report notes a general solution was required, and that some students wrote <Katex tex="p\in R" />. <Katex tex="p" /> has to be a whole number: <Katex tex="p=\tfrac12" />, for example, would give <Katex tex="\pi+\pi=2\pi" />, where cosine is <Katex tex="+1" />, not <Katex tex="-1" />, so the pod would restart from the bottom. On CAS, <Cas fn="solve">solve(−60·cos(π·(40 + n)/15) + 75 = 135, n)</Cas> also gives the general solution, with an arbitrary integer constant playing the part of <Katex tex="p" />. Don't add a domain restriction: the question wants every value.</>,
  },
  {
    working: <Katex display tex="40+n = 15+30p \implies n = -25+30p" />,
    reason: <>Multiplying both sides by <Katex tex="\tfrac{15}{\pi}" />, then subtracting 40.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 5+30p, \ p\in Z}" />,
    reason: <>The same set of values as <Katex tex="-25+30p" /> (since <Katex tex="-25=5-30" />), written from the smallest positive value.</>,
    more: <>There are infinitely many answers because <Katex tex="h" /> repeats every 30: adding 30 to <Katex tex="n" /> moves the input of <Katex tex="h" /> along one whole period, giving exactly the same third piece. Check <Katex tex="n=5" />: at <Katex tex="t=27.5" />, <Katex tex="h(2(27.5)+5)=h(60)=15" />, so the pod finishes back at the bottom ✓. The diagram below shows both ideas: slide <Katex tex="n" /> to close the gap at <Katex tex="t=20" />, then on to <Katex tex="n=35" /> or <Katex tex="n=-25" />.</>,
  },
]

const ROWS_DIII: WorkingRow[] = [
  {
    working: <Katex display tex="0\le t<15: \ w = -60\cos\!\left(\frac{\pi t}{15}\right)+75" />,
    reason: <>Half a cosine wave from <Katex tex="(0,15)" /> up to <Katex tex="(15,135)" />: flat at both ends and steepest in the middle (<Katex tex="t=7.5" />), so an S-shaped curve, not a straight line.</>,
    more: <>Why it curves: near the bottom and the top of the wheel the pod moves mostly sideways, so its height changes slowly; level with the centre it moves straight up, so its height changes fastest. The graph is concave up until the point of inflection at <Katex tex="(7.5,75)" />, then concave down. The report notes some students did not draw graphs with the correct curvature, and linear graphs were sometimes seen: a straight segment from <Katex tex="(0,15)" /> to <Katex tex="(15,135)" /> would mean the height rose at a steady 8 m/min, which a turning wheel cannot do.</>,
  },
  {
    working: <Katex display tex="15\le t<20: \ w = 135" />,
    reason: <><Katex tex="k=135" /> from part d.i: a horizontal segment while the wheel is stationary.</>,
  },
  {
    working: <Katex display tex="20\le t\le27.5: \ w = h(2t+5)" />,
    reason: <>Using <Katex tex="m=2" /> and <Katex tex="n=5" /> (any value of <Katex tex="n" /> from d.ii gives the same piece). It starts at <Katex tex="h(45)=135" /> and ends at <Katex tex="h(60)=15" />: the same S-shape running downhill, squeezed into 7.5 minutes instead of 15, so twice as steep.</>,
    more: <>Like the first piece it is flat at both ends, so it leaves the horizontal segment smoothly and levels off at the bottom: concave down until the point of inflection at <Katex tex="(23.75,75)" />, where it is steepest, then concave up.</>,
  },
  {
    working: <Katex display tex="\boxed{(0,15),\ (15,135),\ (20,135),\ (27.5,15)}" />,
    reason: <>The endpoints of the three pieces, each labelled with its coordinates. The pieces join, so the graph is one unbroken curve, with no open circles at <Katex tex="t=15" /> or <Katex tex="t=20" />.</>,
    more: <>The report notes the coordinates of the endpoints were missing on some graphs. Each piece has two endpoints, so that means the points where the pieces meet, <Katex tex="(15,135)" /> and <Katex tex="(20,135)" />, as well as the two ends of the whole graph.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={sketchSrc}
          alt="The answer on VCAA's grid (t from 0 to 30, w from 0 to 180): a curve rising in an S-shape from (0, 15) to (15, 135), flat to (20, 135), then falling in a steeper S-shape to (27.5, 15)"
          className="w-full max-w-[520px]"
        />
      </div>
    ),
    reason: <>Drawn on the same grid as the paper's axes: <Katex tex="t" /> in steps of 1, <Katex tex="w" /> in steps of 10.</>,
  },
]

export default function MethodsQ2_2023Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (11 marks)</p>
        <p>
          The following diagram represents an observation wheel, with its centre at point{' '}
          <Katex tex="P" />. Passengers are seated in pods, which are carried around as the
          wheel turns. The wheel moves anticlockwise with constant speed and completes one
          full rotation every 30 minutes. When a pod is at the lowest point of the wheel
          (point <Katex tex="A" />), it is 15 metres above the ground. The wheel has a radius
          of 60 metres.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={wheelSrc}
            alt="A circle on a support frame, with centre P, the lowest point A marked 15 m above the ground, a point B on the rim level with P to the right, and an arrow showing anticlockwise rotation — from the original 2023 VCAA exam paper"
            className="w-full max-w-[340px]"
          />
        </div>
        <p>
          Consider the function <Katex tex="h(t)=-60\cos(bt)+c" /> for some{' '}
          <Katex tex="b,c\in R" />, which models the height above the ground of a pod
          originally situated at point <Katex tex="A" />, after time <Katex tex="t" /> minutes.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Parts b. and c. ask for two things that sound alike and are not. The{' '}
              <em>average value</em> of a function is{' '}
              <Katex tex="\tfrac{1}{t_2-t_1}\int_{t_1}^{t_2} h(t)\,dt" /> — the height of the
              rectangle on the same interval with the same area as the region under the graph.
              The{' '}
              <em>average rate of change</em> is <Katex tex="\tfrac{h(t_2)-h(t_1)}{t_2-t_1}" /> —
              the gradient of the chord joining the two endpoints. One is an integral, the other
              is not.
            </p>
            <p>
              In part d., the wheel's new speed goes <em>inside</em> the function. Replacing{' '}
              <Katex tex="t" /> by <Katex tex="mt" /> makes the pod go round <Katex tex="m" />{' '}
              times as fast: at time <Katex tex="t" /> it is where it used to be at time <Katex tex="mt" />. The{' '}
              <Katex tex="+n" /> is then chosen so that the pod restarts from where it stopped.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Find Parameters"
        marks={2}
        statement={
          <>
            Show that <Katex tex="b=\dfrac{\pi}{15}" /> and <Katex tex="c=75" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Average Value"
        marks={2}
        statement={
          <>
            Find the average height of a pod on the wheel as it travels from point{' '}
            <Katex tex="A" /> to point <Katex tex="B" />.
            <br />
            Give your answer in metres, correct to two decimal places.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Average Rate"
        marks={1}
        statement={
          <>
            Find the average rate of change, in metres per minute, of the height of a pod on
            the wheel as it travels from point <Katex tex="A" /> to point <Katex tex="B" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p>
          After 15 minutes, the wheel stops moving and remains stationary for 5 minutes. After
          this, it continues moving at double its previous speed for another 7.5 minutes.
          <br />
          The height above the ground of a pod that was initially at point <Katex tex="A" />,
          after <Katex tex="t" /> minutes, can be modelled by the piecewise function{' '}
          <Katex tex="w" />:
        </p>
        <div className="py-1">
          <Katex
            display
            tex="w(t)=\begin{cases}h(t) & 0\le t<15\\[2pt]k & 15\le t<20\\[2pt]h(mt+n) & 20\le t\le27.5\end{cases}"
          />
        </div>
        <p>
          where <Katex tex="k\ge0" />, <Katex tex="m\ge0" /> and <Katex tex="n\in R" />.
        </p>
      </div>

      <PartCard
        letter="d.i"
        topic="Hybrid Function"
        marks={1}
        statement={<>State the values of <Katex tex="k" /> and <Katex tex="m" />.</>}
        examinerReport={EXAM_DI}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Hybrid Function"
        marks={2}
        statement={<>Find <b>all</b> possible values of <Katex tex="n" />.</>}
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
        <Explore title="Why w(20) = 135 pins down n, and why every n = 5 + 30p works">
          <JoinWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="d.iii"
        topic="Sketch Graph"
        marks={3}
        statement={
          <>
            Sketch the graph of the piecewise function <Katex tex="w" /> on the axes below,
            showing the coordinates of the endpoints.
          </>
        }
        examinerReport={EXAM_DIII}
      >
        <WorkingTable rows={ROWS_DIII} />
        <Explore title="Why the graph curves: the pod's height changes slowly at the top and bottom of the wheel">
          <WheelWidget />
        </Explore>
      </PartCard>
    </div>
  )
}
