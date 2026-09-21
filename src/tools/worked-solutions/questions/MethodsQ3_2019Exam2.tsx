// 2019 Mathematical Methods — Exam 2, Question 3 (9 marks).
// f(t) = sin(πt/3) + sin(πt/6), the strength of a dual-tone telephone signal — its period,
// zeros, maximum, and the area it bounds with the axis (parts a-d), then a transformation g
// of f with the same bounded area (part e), and a rectangle of matching area (part f). The
// given graph is VCAA's own, cropped directly from the exam paper. Question text transcribed
// from the original paper. Cross-checked against the VCAA examination report and itute's
// independent solutions, and independently re-derived (all integrals confirmed exactly by
// computer algebra). Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import ftGraphSrc from './meth-2019exam2-q3-ft-graph.png'

const EXAM_A: SAExaminerStats = {
  marks: [24, 76],
  average: 0.8,
  comment: <>This question was answered well. Common incorrect answers were <Katex tex="6" />, <Katex tex="18" /> and <Katex tex="12t" />.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [24, 76],
  average: 0.8,
  comment: <>This question was answered well. Some students only gave two values, either <Katex tex="0,4" /> or <Katex tex="4,6" />.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [27, 73],
  average: 0.8,
  comment: <>This question was answered well. Common incorrect answers were <Katex tex="1.73" /> and <Katex tex="1.79" />.</>,
}

const EXAM_D: SAExaminerStats = {
  marks: [32, 6, 62],
  average: 1.3,
  comment: (
    <>
      The most common incorrect answer was <Katex tex="\displaystyle\int_0^4f(t)dt+\int_4^6f(t)dt=\tfrac{12}{\pi}" />, or{' '}
      <Katex tex="\displaystyle\int_0^6f(t)dt=\tfrac{12}{\pi}" /> — both let the negative part of
      the integral cancel instead of add to the enclosed area.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [72, 18, 10],
  average: 0.4,
  comment: (
    <>
      This question was not answered well. Some students attempted to describe the
      transformations but gave incorrect or no values for <Katex tex="a" />, <Katex tex="b" />,{' '}
      <Katex tex="c" /> and <Katex tex="d" />.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [62, 2, 36],
  average: 0.8,
  comment: (
    <>
      Many students did not double their answer from part (d), giving{' '}
      <Katex tex="12k=\tfrac{15}{\pi}" /> and so <Katex tex="k=\tfrac{5}{4\pi}" />. Other
      students had the correct method but wrote their final answer as <Katex tex="k=\tfrac{5\pi}{2}" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\sin\left(\dfrac{\pi t}{3}\right) \text{ has period } \dfrac{2\pi}{\pi/3}=6, \qquad \sin\left(\dfrac{\pi t}{6}\right) \text{ has period } \dfrac{2\pi}{\pi/6}=12" />,
  },
  {
    working: <Katex display tex="\boxed{\text{Period} = \operatorname{lcm}(6,12) = 12}" />,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={ftGraphSrc} alt="Graph of f(t) = sin(πt/3) + sin(πt/6), oscillating with zeros at t=0,4,6,12,16,18,24" className="w-full max-w-[420px]" />
      </div>
    ),
    reason: <>Reading the given graph directly over <Katex tex="t\in[0,6]" />.</>,
  },
  {
    working: <Katex display tex="\boxed{t=0,\ 4,\ 6}" />,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Maximise } f(t) \text{ on one period (by CAS)}" />,
  },
  {
    working: <Katex display tex="\boxed{\text{Maximum strength} \approx 1.76}" />,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="f(t)\ge0 \text{ on } [0,4], \qquad f(t)\le0 \text{ on } [4,6]" />,
    reason: <>From the graph and part (b)'s zeros.</>,
  },
  {
    working: <Katex display tex="\text{Area} = \int_0^4 f(t)\,dt - \int_4^6 f(t)\,dt" />,
    reason: <>Subtracting the negative second integral makes both pieces contribute positively.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Area} = \dfrac{15}{\pi} \approx 4.7746}" />,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="g(t) = f(-t-6) = \sin\left(\dfrac{\pi t}{6}\right) - \sin\left(\dfrac{\pi t}{3}\right)" />,
    reason: <>Reflecting <Katex tex="f" /> in the <Katex tex="y" />-axis then translating <Katex tex="6" /> units left sends <Katex tex="t\mapsto -t-6" />.</>,
  },
  {
    working: <Katex display tex="\int_{-2}^{0}g(t)\,dt + \int_{2}^{6}g(t)\,dt = \dfrac{15}{\pi}" />,
    reason: <>Matches part (d)'s area exactly (verified by CAS) — the reflect-and-shift maps <Katex tex="[0,4]" /> and <Katex tex="[4,6]" /> onto <Katex tex="[-6,-2]" /> and <Katex tex="[-2,0]" />, and the given intervals pick up the same two pieces via the <Katex tex="y" />-axis symmetry of the transformation.</>,
  },
  {
    working: <Katex display tex="\boxed{a=-1,\ \ b=1,\ \ c=6,\ \ d=0}" />,
    reason: <>Matching <Katex tex="T\begin{pmatrix}t\\y\end{pmatrix}=\begin{pmatrix}a&0\\0&b\end{pmatrix}\begin{pmatrix}t\\y\end{pmatrix}+\begin{pmatrix}c\\d\end{pmatrix}" /> to <Katex tex="t\mapsto-t-6" />. (Other values of <Katex tex="a,b,c,d" /> also work — VCAA accepted several equivalent transformations.)</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Area over one full period} = 2\times\dfrac{15}{\pi} = \dfrac{30}{\pi}" />,
    reason: <>By symmetry, the signal repeats the same shape (scaled by <Katex tex="\pm1" />) every half-period; one full period <Katex tex="[0,12]" /> contains two copies of part (d)'s area.</>,
  },
  {
    working: <Katex display tex="12k = \dfrac{30}{\pi}" />,
    reason: <>The rectangle <Katex tex="0\le y\le k,\ 0\le x\le12" /> has the same area as one full period.</>,
  },
  {
    working: <Katex display tex="\boxed{k = \dfrac{5}{2\pi}}" />,
  },
]

export default function MethodsQ3_2019Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (9 marks)</p>
        <p>
          During a telephone call, a phone uses a dual-tone frequency electrical signal to
          communicate with the telephone exchange. The strength, <Katex tex="f" />, of a simple
          dual-tone frequency signal is given by the function{' '}
          <Katex tex="f(t) = \sin\left(\dfrac{\pi t}{3}\right)+\sin\left(\dfrac{\pi t}{6}\right)" />
          , where <Katex tex="t" /> is a measure of time and <Katex tex="t\ge0" />.
        </p>
      </div>

      <PartCard letter="a" marks={1} statement="State the period of the function." examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" marks={1} statement={<>Find the values of <Katex tex="t" /> where <Katex tex="f(t)=0" /> for the interval <Katex tex="t\in[0,6]" />.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard letter="c" marks={1} statement="Find the maximum strength of the dual-tone frequency signal, correct to two decimal places." examinerReport={EXAM_C}>
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard letter="d" marks={2} statement={<>Find the area between the graph of <Katex tex="f" /> and the horizontal axis for <Katex tex="t\in[0,6]" />.</>} examinerReport={EXAM_D}>
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-2">
          Let <Katex tex="g" /> be the function obtained by applying the transformation{' '}
          <Katex tex="T" /> to the function <Katex tex="f" />, where{' '}
          <Katex tex="T\begin{pmatrix}t\\y\end{pmatrix}=\begin{pmatrix}a&0\\0&b\end{pmatrix}\begin{pmatrix}t\\y\end{pmatrix}+\begin{pmatrix}c\\d\end{pmatrix}" />{' '}
          and <Katex tex="a,b,c" /> and <Katex tex="d" /> are real numbers.
        </p>
      </div>

      <PartCard
        letter="e"
        marks={2}
        statement={<>Find the values of <Katex tex="a,b,c" /> and <Katex tex="d" /> given that <Katex tex="\displaystyle\int_{-2}^{0}g(t)dt+\int_{2}^{6}g(t)dt" /> has the same area calculated in part (d).</>}
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard
        letter="f"
        marks={2}
        statement={<>The rectangle bounded by the line <Katex tex="y=k,\ k\in\mathbb{R}^+" />, the horizontal axis, and the lines <Katex tex="x=0" /> and <Katex tex="x=12" /> has the same area as the area between the graph of <Katex tex="f" /> and the horizontal axis for one period of the dual-tone frequency signal. Find the value of <Katex tex="k" />.</>}
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>
    </div>
  )
}
