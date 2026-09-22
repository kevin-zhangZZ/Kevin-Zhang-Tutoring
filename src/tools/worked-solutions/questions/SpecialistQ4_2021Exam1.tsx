// 2021 Specialist Mathematics — Exam 1 Question 4 (4 marks). A solid of revolution under
// one arch of sin(x), then the same for sin(kx) by a dilation argument. Question text
// transcribed from the original paper; the figure is a crop of VCAA's own artwork. Answers
// checked with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import sineSrc from './spec-2021e1-q4-sine.png'

const EXAM_A: SAExaminerStats = {
  marks: [14, 22, 6, 58],
  average: 2.1,
  comment: (
    <>
      Most students were able to write down a correct integral for the volume of the solid.
      Some students were unable to proceed further and incorrect attempts at integration
      were frequently seen. The most effective method was to use the double angle formula{' '}
      <Katex tex="\sin^2(x)=\tfrac12\bigl(1-\cos(2x)\bigr)" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [70, 30],
  average: 0.3,
  comment: (
    <>
      Very few students recognised that dilating the graph (and hence the solid) from part
      a. by a factor <Katex tex="\tfrac1k" /> yields the graph and solid for part b. Of those
      who were successful, many did not write their answer in terms of{' '}
      <Katex tex="V_s" />, as instructed.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="V_s = \pi\int_0^\pi\sin^2(x)\,dx" />,
    reason: 'Rotation about the x-axis, over the arch shown.',
  },
  {
    working: <Katex display tex="\sin^2(x) = \tfrac12\bigl(1-\cos(2x)\bigr)" />,
    reason: <>The double-angle identity is the only practical route: <Katex tex="\sin^2" /> has no elementary antiderivative in that form.</>,
  },
  {
    working: <Katex display tex="V_s = \frac{\pi}{2}\int_0^\pi\bigl(1-\cos(2x)\bigr)dx = \frac{\pi}{2}\left[x-\frac{\sin(2x)}{2}\right]_0^\pi" />,
    reason: 'Both terms are now standard.',
  },
  {
    working: <Katex display tex="= \frac{\pi}{2}\left(\pi-0\right)-0" />,
    reason: <><Katex tex="\sin(2\pi)=\sin(0)=0" />, so the sine term contributes nothing.</>,
  },
  {
    working: <Katex display tex="\boxed{V_s = \frac{\pi^2}{2}}" />,
    reason: <>About <Katex tex="4.93" /> cubic units.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="y = \sin(kx) \text{ is } y = \sin(x) \text{ dilated by } \tfrac1k \text{ from the } y\text{-axis}" />,
    reason: <>The arch that ran from 0 to <Katex tex="\pi" /> now runs from 0 to <Katex tex="\tfrac\pi k" />: same height, <Katex tex="\tfrac1k" /> of the length.</>,
  },
  {
    working: <Katex display tex="\text{a horizontal dilation by } \tfrac1k \text{ scales the volume by } \tfrac1k" />,
    reason: <>Every cross-section perpendicular to the <Katex tex="x" />-axis is unchanged — only the axis itself is compressed. This one-line argument is what the report says almost nobody spotted.</>,
  },
  {
    working: <Katex display tex="\boxed{V = \frac{V_s}{k}}" />,
    reason: <>Checking by integration: <Katex tex="\pi\int_0^{\pi/k}\sin^2(kx)\,dx=\tfrac{\pi^2}{2k}=\tfrac{V_s}{k}" /> ✓. The answer must be <em>in terms of</em> <Katex tex="V_s" />, as instructed.</>,
  },
]

export default function SpecialistQ4_2021Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (4 marks)</p>
      </div>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1 flex flex-col gap-3">
        <p>
          The shaded region in the diagram below is bounded by the graph of{' '}
          <Katex tex="y=\sin(x)" /> and the <Katex tex="x" />-axis between the first two
          non-negative <Katex tex="x" />-intercepts of the curve, that is, the interval{' '}
          <Katex tex="[0,\pi]" />. The shaded region is rotated about the <Katex tex="x" />
          -axis to form a solid of revolution.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={sineSrc}
            alt="A sine curve with the single arch between x = 0 and x = π shaded — from the original 2021 VCAA exam paper"
            className="w-full max-w-[320px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        marks={3}
        statement={
          <>
            Find the volume, <Katex tex="V_s" />, of the solid formed.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={1}
        statement={
          <>
            Now consider the function <Katex tex="y=\sin(kx)" />, where <Katex tex="k" /> is
            a positive real constant. The region bounded by the graph of the function and the{' '}
            <Katex tex="x" />-axis between the first two non-negative <Katex tex="x" />
            -intercepts of the graph is rotated about the <Katex tex="x" />-axis to form a
            solid of revolution. Find the volume of this solid in terms of{' '}
            <Katex tex="V_s" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
