// 2014 Specialist Mathematics — Exam 1, Question 5 (5 marks). A double-angle simplification,
// then the same integral by substitution. Question text transcribed from the original paper
// (no diagram given). Answers checked with sympy and against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [19, 81],
  average: 0.8,
  comment: (
    <>
      This question was answered well, with most students understanding that a double-angle
      formula was required. Some applied it incorrectly. Common incorrect answers were{' '}
      <Katex tex="16" />, <Katex tex="96" /> and <Katex tex="192" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [20, 11, 22, 48],
  average: 2,
  comment: (
    <>
      The result from part a. was often not used. There were many errors in notation, with{' '}
      <Katex tex="dx" /> and <Katex tex="du" /> often missing. Several students used{' '}
      <Katex tex="u=\sin(6x)" />, <Katex tex="u=\sin(3x)" />, <Katex tex="u=\cos(3x)" /> or{' '}
      <Katex tex="u=\cos^2(6x)" /> rather than <Katex tex="u=\cos(6x)" />. Others failed to
      change the terminals.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [55, 45],
  average: 0.5,
  comment: (
    <>
      This question was answered well by students who completed part b. successfully. Some
      students correctly obtained <Katex tex="\sqrt3" /> but then stated{' '}
      <Katex tex="k=\sqrt3" />. Typical errors included substituting the terminals in the
      incorrect order.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\sin(2\theta) = 2\sin(\theta)\cos(\theta)" />,
    reason: <>The double-angle formula, with <Katex tex="\theta=3x" /> so that <Katex tex="2\theta=6x" />.</>,
  },
  {
    working: <Katex display tex="\sin(6x) = 2\sin(3x)\cos(3x)" />,
    reason: <>So <Katex tex="\sin(3x)\cos(3x)=\tfrac12\sin(6x)" />.</>,
  },
  {
    working: <Katex display tex="96\cos(3x)\sin(3x) = 96\times\tfrac12\sin(6x) = 48\sin(6x)" />,
    reason: <>Halving, not doubling — the report's wrong answer 192 doubles instead.</>,
  },
  {
    working: <Katex display tex="\boxed{a = 48}" />,
    reason: <>The question asks for <Katex tex="a" />, so a single number.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="I = \int_{\pi/36}^{\pi/12}48\sin(6x)\cos^2(6x)\,dx" />,
    reason: <>Use part a. first — the integrand becomes a single trigonometric function of <Katex tex="6x" />, which is what makes the substitution obvious.</>,
  },
  {
    working: <Katex display tex="u = \cos(6x) \implies \frac{du}{dx} = -6\sin(6x)" />,
    reason: <>Take the function that is being <em>squared</em>; its derivative is the other factor, up to a constant.</>,
  },
  {
    working: <Katex display tex="\sin(6x)\,dx = -\tfrac16\,du" />,
    reason: <>Rearranging the differential. Keeping <Katex tex="dx" /> and <Katex tex="du" /> in the working is part of the mark.</>,
  },
  {
    working: <Katex display tex="x = \tfrac{\pi}{36} \implies u = \cos\!\left(\tfrac\pi6\right) = \tfrac{\sqrt3}{2}" />,
    reason: <>The terminals must change too — the new integral is in <Katex tex="u" /> only.</>,
  },
  {
    working: <Katex display tex="x = \tfrac{\pi}{12} \implies u = \cos\!\left(\tfrac\pi2\right) = 0" />,
    reason: <>The upper terminal becomes the <em>smaller</em> number, which is fine.</>,
  },
  {
    working: <Katex display tex="\boxed{I = -8\int_{\sqrt3/2}^{0}u^2\,du \ \left(= 8\int_0^{\sqrt3/2}u^2\,du\right)}" />,
    reason: <>Since <Katex tex="48\times\left(-\tfrac16\right)=-8" />. Swapping the terminals absorbs the minus sign, which is the tidier form.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="I = 8\int_0^{\sqrt3/2}u^2\,du = 8\left[\frac{u^3}{3}\right]_0^{\sqrt3/2}" />,
    reason: <>Using the tidied form from part b.</>,
  },
  {
    working: <Katex display tex="\left(\tfrac{\sqrt3}{2}\right)^3 = \frac{3\sqrt3}{8}" />,
    reason: <>Cubing: <Katex tex="\left(\sqrt3\right)^3=3\sqrt3" /> and <Katex tex="2^3=8" />.</>,
  },
  {
    working: <Katex display tex="I = \frac83\times\frac{3\sqrt3}{8} = \sqrt3" />,
    reason: <>Everything cancels.</>,
  },
  {
    working: <Katex display tex="\boxed{\sqrt3, \text{ so } k = 3}" />,
    reason: <>The answer is <Katex tex="\sqrt3" /> in the required form <Katex tex="\sqrt k" />; the report notes students writing <Katex tex="k=\sqrt3" /> instead.</>,
  },
]

export default function SpecialistQ5_2014Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (5 marks)</p>
        <p>
          Part a. is not a warm-up — it is what turns the integrand of parts b. and c. into
          something a single substitution can handle.
        </p>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={
          <>
            For the function with rule <Katex tex="f(x)=96\cos(3x)\sin(3x)" />, find the value
            of <Katex tex="a" /> such that <Katex tex="f(x)=a\sin(6x)" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={3}
        statement={
          <>
            Use an appropriate substitution in the form <Katex tex="u=g(x)" /> to find an
            equivalent definite integral for{' '}
            <Katex tex="\displaystyle\int_{\pi/36}^{\pi/12}96\cos(3x)\sin(3x)\cos^2(6x)\,dx" />{' '}
            in terms of <Katex tex="u" /> only.
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
            <b>Hence</b> evaluate{' '}
            <Katex tex="\displaystyle\int_{\pi/36}^{\pi/12}96\cos(3x)\sin(3x)\cos^2(6x)\,dx" />
            , giving your answer in the form <Katex tex="\sqrt k" />,{' '}
            <Katex tex="k\in Z" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
