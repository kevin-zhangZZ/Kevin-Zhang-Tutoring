// 2023 Mathematical Methods — Exam 2, Section B Question 2 (11 marks). An observation wheel
// modelled by a cosine: average value against average rate of change, then a piecewise
// version after the wheel stops and speeds up. Question text transcribed from the original
// paper; the stem figure is a crop of VCAA's own artwork and the graph is our own drawing of
// the answer. Answers checked with sympy and against the VCAA examination report. Solution is
// original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import wheelSrc from './meth-2023e2-q2-wheel.png'
import sketchSrc from './meth-2023e2-q2diii-sketch.png'

const EXAM_A: SAExaminerStats = {
  marks: [16, 18, 66],
  average: 1.5,
  comment: (
    <>
      As this was a "show that" question, appropriate working with logical sequencing needed
      to be shown. Many students were able to show that <Katex tex="c=75" />. Some students
      wrote <Katex tex="\text{Period}=b" /> instead of <Katex tex="\text{Period}=\tfrac{2\pi}{b}" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [54, 3, 42],
  average: 0.9,
  comment: (
    <>
      Some students had the correct formula for average value of a function but used incorrect
      values; <Katex tex="\tfrac{1}{60}\int_0^{60}h(t)\,dt" /> was often seen. Other students
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
      Many students were able to find <Katex tex="k" />, but not <Katex tex="m" />;{' '}
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
      general solution was required; some students wrote <Katex tex="p\in\mathbb{R}" />.
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
      correct curvature; linear graphs were sometimes seen.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Period} = \frac{2\pi}{b} = 30" />,
    reason: <>One full rotation every 30 minutes. The period of <Katex tex="\cos(bt)" /> is <Katex tex="\tfrac{2\pi}{b}" />, not <Katex tex="b" /> — the report's named error.</>,
  },
  {
    working: <Katex display tex="\boxed{b = \frac{2\pi}{30} = \frac{\pi}{15}} \ \checkmark" />,
    reason: 'Rearranging.',
  },
  {
    working: <Katex display tex="t=0 \text{ is at } A \implies h(0) = 15" />,
    reason: 'The pod starts at the lowest point, 15 m above the ground.',
  },
  {
    working: <Katex display tex="-60\cos(0)+c = 15 \implies -60+c = 15" />,
    reason: <><Katex tex="\cos(0)=1" />, so the cosine term is at its most negative — which is exactly why the model uses <Katex tex="-60\cos" /> rather than <Katex tex="+60\cos" />.</>,
  },
  {
    working: <Katex display tex="\boxed{c = 75} \ \checkmark" />,
    reason: <>And it checks geometrically: the centre <Katex tex="P" /> is <Katex tex="15+60=75" /> m up, which is the model's midline.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="A \text{ to } B \text{ is a quarter turn} \implies t \text{ from } 0 \text{ to } 7.5" />,
    reason: <><Katex tex="B" /> is level with the centre, so the pod has gone a quarter of the way round: <Katex tex="\tfrac{30}{4}=7.5" /> minutes.</>,
  },
  {
    working: <Katex display tex="\text{average value} = \frac{1}{b-a}\int_a^b h(t)\,dt = \frac{1}{7.5}\int_0^{7.5}h(t)\,dt" />,
    reason: <>The <em>average value of a function</em> — not the average rate of change, which is part c. Using <Katex tex="\tfrac{1}{60}\int_0^{60}" /> integrates over a whole rotation instead.</>,
  },
  {
    working: <Katex display tex="\int_0^{7.5}\left(-60\cos\!\left(\frac{\pi t}{15}\right)+75\right)dt = \left[-\frac{900}{\pi}\sin\!\left(\frac{\pi t}{15}\right)+75t\right]_0^{7.5}" />,
    reason: <><Katex tex="\int\cos(kt)dt=\tfrac{1}{k}\sin(kt)" /> with <Katex tex="k=\tfrac{\pi}{15}" />, so the factor is <Katex tex="\tfrac{15}{\pi}" />.</>,
  },
  {
    working: <Katex display tex="= -\frac{900}{\pi}+562.5 = 276.02\ldots" />,
    reason: <><Katex tex="\sin\!\left(\tfrac\pi2\right)=1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{276.02\ldots}{7.5} \approx 36.80 \ \text{metres}}" />,
    reason: <>Comfortably below the halfway height of 75 m, which is right: the pod spends the first part of the quarter-turn crawling up from the bottom.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{average rate of change} = \frac{h(7.5)-h(0)}{7.5-0}" />,
    reason: 'Rise over run between the two endpoints — the gradient of the chord, not an integral.',
  },
  {
    working: <Katex display tex="h(7.5) = -60\cos\!\left(\frac\pi2\right)+75 = 75" />,
    reason: <><Katex tex="B" /> is at the height of the centre, as the diagram shows.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{75-15}{7.5} = 8 \ \mathrm{m/min}}" />,
    reason: <>Positive, because the pod is rising. The report's common wrong answer <Katex tex="-8" /> comes from subtracting the two heights the other way round.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="k = h(15) = -60\cos(\pi)+75 = 60+75" />,
    reason: 'The wheel stops after 15 minutes — half a rotation, so the pod is at the very top.',
  },
  {
    working: <Katex display tex="\boxed{k = 135}" />,
    reason: <>Which is <Katex tex="15+120" />: the bottom of the wheel plus a full diameter ✓.</>,
  },
  {
    working: <Katex display tex="\text{double speed} \implies \text{half the period} \implies \text{time runs twice as fast}" />,
    reason: <>Inside the function, doubling the speed means replacing <Katex tex="t" /> by <Katex tex="2t" />.</>,
  },
  {
    working: <Katex display tex="\boxed{m = 2}" />,
    reason: <>A dilation of factor <Katex tex="\tfrac12" /> from the vertical axis, which is <Katex tex="m=2" /> inside the bracket. Writing <Katex tex="m=\tfrac12" /> — the report's common error — would halve the speed.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="w \text{ continuous at } t=20 \implies h(m(20)+n) = k = 135" />,
    reason: 'The pod restarts from wherever it stopped, so the third piece must begin at height 135.',
  },
  {
    working: <Katex display tex="h(40+n) = 135 \implies -60\cos\!\left(\frac{\pi(40+n)}{15}\right)+75 = 135" />,
    reason: <>Substituting <Katex tex="m=2" />.</>,
  },
  {
    working: <Katex display tex="\cos\!\left(\frac{\pi(40+n)}{15}\right) = -1 \implies \frac{\pi(40+n)}{15} = \pi+2p\pi, \ p\in\mathbb{Z}" />,
    reason: <>Cosine equals <Katex tex="-1" /> at every odd multiple of <Katex tex="\pi" />. A <em>general</em> solution is required, and <Katex tex="p" /> must be an integer.</>,
  },
  {
    working: <Katex display tex="40+n = 15+30p \implies n = -25+30p" />,
    reason: 'Multiplying by 15/π.',
  },
  {
    working: <Katex display tex="\boxed{n = 5+30p, \ p\in\mathbb{Z}}" />,
    reason: <>The same set written from a different starting point (<Katex tex="-25=5-30" />). Taking <Katex tex="n=5" />: at <Katex tex="t=27.5" />, <Katex tex="h(60)=15" />, so the pod is back at the bottom ✓.</>,
  },
]

const ROWS_DIII: WorkingRow[] = [
  {
    working: <Katex display tex="0\le t<15: \ w = -60\cos\!\left(\frac{\pi t}{15}\right)+75" />,
    reason: <>Half a cosine wave from <Katex tex="(0,15)" /> up to <Katex tex="(15,135)" />, flat at both ends — not a straight line, which the report says several students drew.</>,
  },
  {
    working: <Katex display tex="15\le t<20: \ w = 135" />,
    reason: 'A horizontal segment while the wheel is stationary.',
  },
  {
    working: <Katex display tex="20\le t\le27.5: \ w = h(2t+5)" />,
    reason: <>The same shape running down, but horizontally compressed by <Katex tex="\tfrac12" /> — it takes 7.5 minutes instead of 15.</>,
  },
  {
    working: <Katex display tex="\boxed{(0,15),\ (15,135),\ (20,135),\ (27.5,15)}" />,
    reason: 'The endpoints of the three pieces, all of which must be labelled with coordinates.',
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
          <img
            src={wheelSrc}
            alt="A circle on a support frame, with centre P, the lowest point A marked 15 m above the ground, a point B on the rim level with P to the right, and an arrow showing anticlockwise rotation — from the original 2023 VCAA exam paper"
            className="w-full max-w-[340px]"
          />
        </div>
        <p>
          Consider the function <Katex tex="h(t)=-60\cos(bt)+c" /> for some{' '}
          <Katex tex="b,c\in\mathbb{R}" />, which models the height above the ground of a pod
          originally situated at point <Katex tex="A" />, after time <Katex tex="t" /> minutes.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Parts b. and c. ask for two things that sound alike and are not. The{' '}
            <em>average value</em> of a function is{' '}
            <Katex tex="\tfrac{1}{b-a}\int_a^b h" /> — the height of the rectangle with the
            same area. The <em>average rate of change</em> is{' '}
            <Katex tex="\tfrac{h(b)-h(a)}{b-a}" /> — the gradient of the chord. One is an
            integral, the other is not.
          </p>
          <p>
            In part d., "double its previous speed" acts <em>inside</em> the function. A
            dilation of factor <Katex tex="\tfrac12" /> from the vertical axis is written{' '}
            <Katex tex="h(2t+n)" />, so <Katex tex="m=2" />, and <Katex tex="n" /> is then
            whatever makes the pod restart from the top.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
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
        marks={2}
        statement={
          <>
            Find the average height of a pod on the wheel as it travels from point{' '}
            <Katex tex="A" /> to point <Katex tex="B" />. Give your answer in metres, correct
            to two decimal places.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
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
        <p className="font-semibold text-gray-900 dark:text-white">d.</p>
        <p>
          After 15 minutes, the wheel stops moving and remains stationary for 5 minutes. After
          this, it continues moving at double its previous speed for another 7.5 minutes. The
          height above the ground of a pod that was initially at point <Katex tex="A" />,
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
          where <Katex tex="k>0" />, <Katex tex="m>0" /> and <Katex tex="n\in\mathbb{R}" />.
        </p>
      </div>

      <PartCard
        letter="d.i"
        marks={1}
        statement={<>State the values of <Katex tex="k" /> and <Katex tex="m" />.</>}
        examinerReport={EXAM_DI}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        marks={2}
        statement={<>Find all possible values of <Katex tex="n" />.</>}
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>

      <PartCard
        letter="d.iii"
        marks={3}
        statement={
          <>
            Sketch the graph of the piecewise function <Katex tex="w" /> on the axes provided,
            showing the coordinates of the endpoints.
          </>
        }
        examinerReport={EXAM_DIII}
      >
        <WorkingTable rows={ROWS_DIII} />
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={sketchSrc}
            alt="A curve rising in an S-shape from (0, 15) to (15, 135), then flat to (20, 135), then falling in a steeper S-shape to (27.5, 15)"
            className="w-full max-w-[520px]"
          />
        </div>
      </PartCard>
    </div>
  )
}
