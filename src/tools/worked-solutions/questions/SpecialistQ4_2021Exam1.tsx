// 2021 Specialist Mathematics — Exam 1 Question 4 (4 marks). A solid of revolution under
// one arch of sin(x), then the same for sin(kx) by a dilation argument. Question text
// transcribed from the original paper; the figure is a crop of VCAA's own artwork. Answers
// checked with sympy and against the VCAA examination report. Solution is original.
// Part b has an interactive (interactives/spec-2021e1-q4b-squash.tsx): slide k and the same
// eight discs keep their radii but become 1/k as thick, so the volume is V_s/k.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import sineSrc from './spec-2021e1-q4-sine.png'
import { Explore, lazyWidget } from '../Explore'

const Squash = lazyWidget(() => import('../interactives/spec-2021e1-q4b-squash'))

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
    reason: <>For a region rotated about the <Katex tex="x" />-axis, <Katex tex="V=\pi\int_a^b y^2\,dx" />: each thin slice is a disc of radius <Katex tex="y" />. Here <Katex tex="y=\sin(x)" /> and the arch runs from <Katex tex="x=0" /> to <Katex tex="x=\pi" />.</>,
  },
  {
    working: <Katex display tex="\sin^2(x) = \tfrac12\bigl(1-\cos(2x)\bigr)" />,
    reason: <>There is no standard antiderivative for <Katex tex="\sin^2(x)" />, so rewrite it. Rearrange <Katex tex="\cos(2x)=1-2\sin^2(x)" /> from the formula sheet to get terms with standard antiderivatives — the report notes this was the most effective method.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} V_s &= \frac{\pi}{2}\int_0^\pi\bigl(1-\cos(2x)\bigr)dx \\ &= \frac{\pi}{2}\left[x-\frac{\sin(2x)}{2}\right]_0^\pi \end{aligned}" />,
    reason: <>Take the constant <Katex tex="\pi\times\tfrac12=\tfrac{\pi}{2}" /> outside, then integrate term by term: an antiderivative of <Katex tex="\cos(2x)" /> is <Katex tex="\tfrac12\sin(2x)" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &= \frac{\pi}{2}\Bigl[\Bigl(\pi-\frac{\sin(2\pi)}{2}\Bigr) \\ &\qquad\;-\Bigl(0-\frac{\sin(0)}{2}\Bigr)\Bigr] \\ &=\frac{\pi}{2}\bigl[(\pi-0)-(0-0)\bigr] \end{aligned}" />,
    reason: <>Substitute the terminals: <Katex tex="\sin(2\pi)=\sin(0)=0" />, so the sine term contributes nothing.</>,
  },
  {
    working: <Katex display tex="\boxed{V_s = \frac{\pi^2}{2}}" />,
    reason: <>About <Katex tex="4.93" /> cubic units.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\sin(kx)=0 \;\Rightarrow\; kx=0,\ \pi \;\Rightarrow\; x=0,\ \tfrac{\pi}{k}" />,
    reason: <>The first two non-negative <Katex tex="x" />-intercepts come from <Katex tex="kx=0" /> and <Katex tex="kx=\pi" />. Since <Katex tex="k>0" />, <Katex tex="\tfrac{\pi}{k}" /> is positive, so it is the next intercept after 0. The arch that ran from 0 to <Katex tex="\pi" /> now runs from 0 to <Katex tex="\tfrac\pi k" />, with the same height 1.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} &y = \sin(kx) \text{ is } y = \sin(x) \\ &\text{dilated by a factor of } \tfrac1k \\ &\text{from the } y\text{-axis} \end{aligned}"
      />
    ),
    reason: <>Replacing <Katex tex="x" /> by <Katex tex="kx" /> is a dilation by factor <Katex tex="\tfrac1k" /> from the <Katex tex="y" />-axis. Rotating the squashed graph gives part a&apos;s solid squashed the same way.</>,
  },
  {
    working: <Katex display tex="\text{volume scales by } \tfrac1k" />,
    reason: <>Think of the solid as thin discs. Every disc keeps its radius (the heights of the graph are unchanged), but each one is only <Katex tex="\tfrac1k" /> as thick, so each disc volume <Katex tex="\pi r^2\,\Delta x" /> — and so the total — is multiplied by <Katex tex="\tfrac1k" />. It is not <Katex tex="\tfrac1{k^2}" />: only the <Katex tex="x" />-direction is squashed, not the radius. The report notes very few students recognised this dilation.</>,
    more: <>Slide <Katex tex="k" /> in the diagram below to see it.</>,
  },
  {
    working: <Katex display tex="\boxed{V = \frac{V_s}{k}}" />,
    reason: <>The answer must be <em>in terms of</em> <Katex tex="V_s" />, as instructed — <Katex tex="\tfrac{\pi^2}{2k}" /> alone does not answer the question. Check by integrating as in part a: <Katex tex="\pi\int_0^{\pi/k}\sin^2(kx)\,dx=\tfrac{\pi}{2}\left[x-\tfrac{\sin(2kx)}{2k}\right]_0^{\pi/k}=\tfrac{\pi}{2}\cdot\tfrac{\pi}{k}=\tfrac{\pi^2}{2k}=\tfrac{V_s}{k}" />.</>,
  },
]

export default function SpecialistQ4_2021Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (4 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Volume of Revolution"
        marks={3}
        statement={
          <div className="flex flex-col gap-3">
            <p>
              The shaded region in the diagram below is bounded by the graph of{' '}
              <Katex tex="y=\sin(x)" /> and the <Katex tex="x" />-axis between the first two
              non-negative <Katex tex="x" />-intercepts of the curve, that is, the interval{' '}
              <Katex tex="[0,\pi]" />. The shaded region is rotated about the{' '}
              <Katex tex="x" />-axis to form a solid of revolution.
            </p>
            <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img
                src={sineSrc}
                alt="The graph of y = sin(x) on a grid from about −π/2 to 9π/4, with the arch between x = 0 and x = π shaded — from the original 2021 VCAA exam paper"
                className="w-full max-w-[320px]"
              />
            </div>
            <p>
              Find the volume, <Katex tex="V_s" />, of the solid formed.
            </p>
          </div>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Volume of Revolution"
        marks={1}
        statement={
          <>
            Now consider the function <Katex tex="y=\sin(kx)" />, where <Katex tex="k" /> is
            a positive real constant. The region bounded by the graph of the function and the{' '}
            <Katex tex="x" />-axis between the first two non-negative <Katex tex="x" />
            -intercepts of the graph is rotated about the <Katex tex="x" />-axis to form a
            solid of revolution.
            <br />
            Find the volume of this solid in terms of <Katex tex="V_s" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <Explore title="Squash the arch: every disc keeps its radius but is 1/k as thick">
          <Squash />
        </Explore>
      </PartCard>
    </div>
  )
}
