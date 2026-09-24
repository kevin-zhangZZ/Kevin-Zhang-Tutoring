// 2021 Mathematical Methods — Exam 2, Section B Question 5 (10 marks). The family
// sin(x/a) + cos(ax): its period, minimum and symmetry, an antiderivative, why the areas
// balance, and the greatest possible minimum. Question text transcribed from the original
// paper; the figure is a crop of VCAA's own artwork. Answers checked with sympy/numpy and
// against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import graphSrc from './meth-2021e2-q5-graph.png'

const EXAM_A: SAExaminerStats = {
  marks: [29, 71],
  average: 0.7,
  comment: <>A common incorrect answer was <Katex tex="2\pi" />.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [39, 61],
  average: 0.6,
  comment: (
    <>
      Some students gave the coordinates of the turning point and did not state the minimum
      value. Others gave their answer as <Katex tex="1.722" /> or <Katex tex="-1.72" />.
      Many evaluated <Katex tex="f\!\left(-\tfrac\pi2\right)" />, which equals{' '}
      <Katex tex="-1.707" /> correct to three decimal places.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [79, 21],
  average: 0.2,
  comment: <>An exact answer was required. 6.28 was a common incorrect answer.</>,
}

const EXAM_D: SAExaminerStats = {
  marks: [32, 68],
  average: 0.7,
  comment: <>This question was answered well by those who attempted it.</>,
}

const EXAM_EI: SAExaminerStats = {
  marks: [50, 50],
  average: 0.5,
  comment: (
    <>
      Some students found the derivative instead of the antiderivative. Others wrote{' '}
      <Katex tex="a\cos\!\left(\tfrac xa\right)-\tfrac{\sin(ax)}{a}" />.
    </>
  ),
}

const EXAM_EII: SAExaminerStats = {
  marks: [52, 20, 16, 12],
  average: 0.9,
  comment: (
    <>
      Some students were unable to interpret <Katex tex="\dfrac{\sin\left(2a^2\pi\right)}{a}" />.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [87, 13],
  average: 0.2,
  comment: <>Some students considered the maximum value only and not the minimum value.</>,
}

const EXAM_G: SAExaminerStats = {
  marks: [98, 2],
  average: 0,
  comment: <>An exact answer was required. <Katex tex="-2" /> was a common incorrect answer.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\sin\!\left(\tfrac x2\right): \ \text{period } \frac{2\pi}{1/2} = 4\pi" />,
    reason: <>The slower of the two components.</>,
  },
  {
    working: <Katex display tex="\cos(2x): \ \text{period } \frac{2\pi}{2} = \pi" />,
    reason: <>The faster one.</>,
  },
  {
    working: <Katex display tex="\boxed{4\pi}" />,
    reason: <>The sum repeats only when <em>both</em> do, so take the lowest common multiple: <Katex tex="4\pi" /> is already a multiple of <Katex tex="\pi" />. The graph confirms it — the pattern from 0 to <Katex tex="4\pi" /> repeats.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Cas fn="fMin">fMin(sin(x/2) + cos(2x), x) | 0 ≤ x ≤ 4π</Cas>,
    reason: <>Search over one full period. The minimum is not at an obvious point, so a numerical search is the practical route.</>,
  },
  {
    working: <Katex display tex="\text{minimum} = -1.72209\ldots" />,
    reason: <>Note <Katex tex="f\!\left(-\tfrac\pi2\right)=-\tfrac{\sqrt2}{2}-1=-1.707" /> (to three decimal places), which looks close but is not the minimum — the report notes many students evaluated it.</>,
  },
  {
    working: <Katex display tex="\boxed{-1.722}" />,
    reason: <>The <em>value</em>, not the coordinates, and to three decimal places.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f(h-x) = f(x) \iff \text{the graph is symmetric about } x = \tfrac h2" />,
    reason: <>Reflecting in the vertical line <Katex tex="x=\tfrac h2" /> maps <Katex tex="x" /> to <Katex tex="h-x" />.</>,
  },
  {
    working: <Katex display tex="\sin\!\left(\tfrac x2\right) \text{ is symmetric about } x = \pi,\ 3\pi,\ 5\pi,\ \ldots" />,
    reason: <>Its peaks and troughs: <Katex tex="\tfrac x2=\tfrac\pi2+k\pi" />.</>,
  },
  {
    working: <Katex display tex="\cos(2x) \text{ is symmetric about } x = 0,\ \tfrac\pi2,\ \pi,\ \tfrac{3\pi}{2},\ \ldots" />,
    reason: <>Every multiple of <Katex tex="\tfrac\pi2" />.</>,
  },
  {
    working: <Katex display tex="\text{common lines: } x = \pi,\ 3\pi,\ 5\pi,\ \ldots \implies \tfrac h2 = \pi" />,
    reason: <>The smallest positive line of symmetry the two share.</>,
  },
  {
    working: <Katex display tex="\boxed{h = 2\pi}" />,
    reason: <>Exact. Writing 6.28 loses the mark. Check on the graph: it is symmetric about <Katex tex="x=\pi" /> ✓.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="g_a(x) = \sin\!\left(\tfrac xa\right)+\cos(ax), \quad f(x) = \sin\!\left(\tfrac x2\right)+\cos(2x)" />,
    reason: <>Comparing the two rules term by term.</>,
  },
  {
    working: <Katex display tex="\boxed{a = 2}" />,
    reason: <>Both the <Katex tex="\tfrac1a" /> and the <Katex tex="a" /> agree at once, which is the point of the family.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="\int\sin\!\left(\tfrac xa\right)dx = -\frac{\cos\!\left(\tfrac xa\right)}{1/a} = -a\cos\!\left(\tfrac xa\right)" />,
    reason: <>Dividing by the coefficient <Katex tex="\tfrac1a" /> means multiplying by <Katex tex="a" />.</>,
  },
  {
    working: <Katex display tex="\int\cos(ax)\,dx = \frac{\sin(ax)}{a}" />,
    reason: <>Here dividing by a really does divide.</>,
  },
  {
    working: <Katex display tex="\boxed{-a\cos\!\left(\tfrac xa\right)+\frac{\sin(ax)}{a}}" />,
    reason: <>An <em>antiderivative</em>, so no constant is needed — but the signs must be right: the cosine term is negative, the sine term positive.</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="\int_0^{2a\pi}g_a(x)\,dx = \left[-a\cos\!\left(\tfrac xa\right)+\frac{\sin(ax)}{a}\right]_0^{2a\pi}" />,
    reason: <>Using part e.i.</>,
  },
  {
    working: <Katex display tex="\text{at } x=2a\pi: \ -a\cos(2\pi)+\frac{\sin\left(2a^2\pi\right)}{a} = -a+\frac{\sin\left(2a^2\pi\right)}{a}" />,
    reason: <><Katex tex="\tfrac{2a\pi}{a}=2\pi" />, so the cosine term is exactly <Katex tex="-a" />.</>,
  },
  {
    working: <Katex display tex="\text{at } x=0: \ -a\cos(0)+\frac{\sin(0)}{a} = -a" />,
    reason: <>The lower terminal.</>,
  },
  {
    working: <Katex display tex="\int_0^{2a\pi}g_a(x)\,dx = \frac{\sin\!\left(2a^2\pi\right)}{a}" />,
    reason: <>The <Katex tex="-a" /> cancels.</>,
  },
  {
    working: <Katex display tex="a\in Z^+ \implies 2a^2 \text{ is an even integer} \implies \sin\!\left(2a^2\pi\right) = 0" />,
    reason: <>The report notes some students were unable to interpret <Katex tex="\tfrac{\sin\left(2a^2\pi\right)}{a}" />: <Katex tex="\sin" /> of any integer multiple of <Katex tex="\pi" /> is zero.</>,
  },
  {
    working: <Katex display tex="\boxed{\int_0^{2a\pi}g_a(x)\,dx = 0 \text{ for all positive integers } a}" />,
    reason: <>A definite integral of zero means the signed areas cancel — so the area above the axis equals the area below. As required.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="-1 \le \sin\!\left(\tfrac xa\right) \le 1 \ \text{ for all } x \text{ and all } a" />,
    reason: <>A sine is bounded regardless of how its input is scaled.</>,
  },
  {
    working: <Katex display tex="-1 \le \cos(ax) \le 1 \ \text{ for all } x \text{ and all } a" />,
    reason: <>The same for cosine — the report notes students who argued only about the <em>maximum</em>.</>,
  },
  {
    working: <Katex display tex="\boxed{-2 \le \sin\!\left(\tfrac xa\right)+\cos(ax) \le 2}" />,
    reason: <>Adding the two inequalities. Both bounds need stating, since the question asks about both.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="g_a = -2 \text{ needs } \sin\!\left(\tfrac xa\right) = -1 \ \text{and}\ \cos(ax) = -1 \text{ at the same } x" />,
    reason: <>Part f. gives −2 as the floor; whether it is reached is a separate question.</>,
  },
  {
    working: <Katex display tex="\tfrac xa = \tfrac{3\pi}{2}+2k\pi \ \text{ and } \ ax = \pi+2m\pi" />,
    reason: <>The two conditions written out.</>,
  },
  {
    working: <Katex display tex="\frac{a^2(4k+3)}{2} = 2m+1 \implies a^2(4k+3) = 2(2m+1)" />,
    reason: <>Eliminating <Katex tex="x" />. The left side is odd when <Katex tex="a" /> is odd, and a multiple of 4 when <Katex tex="a" /> is even; the right side is neither. So <Katex tex="-2" /> is never attained.</>,
  },
  {
    working: <Katex display tex="a=1: \ g_1(x) = \sin(x)+\cos(x) = \sqrt2\sin\!\left(x+\tfrac\pi4\right)" />,
    reason: <>With equal frequencies the two waves combine into a single sinusoid of amplitude <Katex tex="\sqrt2" />.</>,
  },
  {
    working: <Katex display tex="a=2: \ -1.722; \quad a=3: \ -1.985; \quad a=4: \ -1.981; \quad a=5: \ -1.998" />,
    reason: <>For <Katex tex="a\ge2" /> the two frequencies differ and the minimum sits well below <Katex tex="-\sqrt2" />, creeping towards <Katex tex="-2" /> as <Katex tex="a" /> grows. So the greatest minimum is at <Katex tex="a=1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{-\sqrt2}" />,
    reason: <>Attained at <Katex tex="a=1" />. Exact — <Katex tex="-2" /> is the report's common wrong answer, and is exactly the bound that is never reached. Only 2% of students scored this mark.</>,
  },
]

export default function MethodsQ5_2021Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (10 marks)</p>
        <p>
          Part of the graph of <Katex tex="f:R\to R" />,{' '}
          <Katex tex="f(x)=\sin\!\left(\tfrac x2\right)+\cos(2x)" /> is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="An oscillating curve between about −1.7 and 2, with a tall peak near x = π and a repeating pattern of period 4π — from the original 2021 VCAA exam paper"
            className="w-full max-w-[480px]"
          />
        </div>
      </div>

      <PartCard letter="a" topic="Period" marks={1} statement={<>State the period of <Katex tex="f" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Minimum Value"
        marks={1}
        statement={
          <>
            State the minimum value of <Katex tex="f" />, correct to three decimal places.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Symmetry"
        marks={1}
        statement={
          <>
            Find the smallest positive value of <Katex tex="h" /> for which{' '}
            <Katex tex="f(h-x)=f(x)" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Consider the set of functions of the form <Katex tex="g_a:R\to R" />,{' '}
          <Katex tex="g_a(x)=\sin\!\left(\tfrac xa\right)+\cos(ax)" />, where{' '}
          <Katex tex="a" /> is a positive integer.
        </p>
      </div>

      <PartCard
        letter="d"
        topic="Find Parameter"
        marks={1}
        statement={
          <>
            State the value of <Katex tex="a" /> such that <Katex tex="g_a(x)=f(x)" /> for
            all <Katex tex="x" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e.i"
        topic="Antiderivative"
        marks={1}
        statement={
          <>
            Find an antiderivative of <Katex tex="g_a" /> in terms of <Katex tex="a" />.
          </>
        }
        examinerReport={EXAM_EI}
      >
        <WorkingTable rows={ROWS_EI} />
      </PartCard>

      <PartCard
        letter="e.ii"
        topic="Definite Integral"
        marks={3}
        statement={
          <>
            Use a definite integral to show that the area bounded by <Katex tex="g_a" /> and
            the <Katex tex="x" />-axis over the interval <Katex tex="[0,2a\pi]" /> is equal
            above and below the <Katex tex="x" />-axis for all values of <Katex tex="a" />.
          </>
        }
        examinerReport={EXAM_EII}
      >
        <WorkingTable rows={ROWS_EII} />
      </PartCard>

      <PartCard
        letter="f"
        topic="Max & Min Bounds"
        marks={1}
        statement={
          <>
            Explain why the maximum value of <Katex tex="g_a" /> cannot be greater than 2 for
            all values of <Katex tex="a" /> and why the minimum value of <Katex tex="g_a" />{' '}
            cannot be less than <Katex tex="-2" /> for all values of <Katex tex="a" />.
          </>
        }
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>

      <PartCard
        letter="g"
        topic="Minimum Value"
        marks={1}
        statement={
          <>
            Find the greatest possible minimum value of <Katex tex="g_a" />.
          </>
        }
        examinerReport={EXAM_G}
      >
        <WorkingTable rows={ROWS_G} />
      </PartCard>
    </div>
  )
}
