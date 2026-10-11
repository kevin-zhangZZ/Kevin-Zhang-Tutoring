// 2021 Mathematical Methods — Exam 2, Section B Question 5 (10 marks). The family
// sin(x/a) + cos(ax): its period, minimum and symmetry, an antiderivative, why the areas
// balance, and the greatest possible minimum. Question text transcribed from the original
// paper; the figure is a crop of VCAA's own artwork. Answers checked with sympy/numpy and
// against the VCAA examination report. Solution is original.
// Interactives: part e.ii — meth-2021e2-q5eii-balanced-areas (step a = 1 … 5 and the shaded
// areas above and below the axis on [0, 2aπ] match; a toggle lets a be any positive number and
// they split apart once 2a² is not a whole number). Part g — meth-2021e2-q5g-greatest-minimum
// (click a = 1 … 5 to graph g_a over a period with its minimum above y = −2; a toggle shows the
// troughs of sin(x/a) and cos(ax) never line up, and a = 1 gives the highest minimum, −√2).
// Parts c and f have no widget: c's named error is the inexact 6.28 and the stem's graph already
// shows the symmetry; f is a written bound argument with nothing to manipulate.
// Oct 2026 review: part g's a = 1 minimum now uses g_1' = 0 instead of the compound-angle form
// √2 sin(x + π/4) (Specialist, not Methods); g adds a check that every a ≥ 2 dips below −√2;
// part c reads the first line of symmetry off the graph and confirms f(2π − x) = f(x).
// Oct 2026 Concise/Detailed rebalance: long reasons trimmed, teacher detail and report commentary
// moved to each row's `more`; part g notes the minima approach −2 unevenly (a = 4 above a = 3).

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import graphSrc from './meth-2021e2-q5-graph.png'

const BalancedAreas = lazyWidget(() => import('../interactives/meth-2021e2-q5eii-balanced-areas'))
const GreatestMinimum = lazyWidget(() => import('../interactives/meth-2021e2-q5g-greatest-minimum'))

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
    reason: <>The period of <Katex tex="\sin(nx)" /> or <Katex tex="\cos(nx)" /> is <Katex tex="\tfrac{2\pi}{n}" />. Here <Katex tex="n=\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="\cos(2x): \ \text{period } \frac{2\pi}{2} = \pi" />,
    reason: <>The same rule with <Katex tex="n=2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{4\pi}" />,
    reason: <><Katex tex="f" /> repeats only when <em>both</em> parts restart together: the smallest length holding a whole number of periods of each. <Katex tex="4\pi" /> is one sine period and four cosine periods.</>,
    more: <>The common wrong answer <Katex tex="2\pi" /> is a whole number of periods of <Katex tex="\cos(2x)" /> but only half a period of <Katex tex="\sin\!\left(\tfrac x2\right)" />, so the sine part has flipped sign: <Katex tex="f(x+2\pi)=-\sin\!\left(\tfrac x2\right)+\cos(2x)" />, which is not <Katex tex="f(x)" />. The graph confirms it: the pattern from 0 to <Katex tex="4\pi" /> is what repeats.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Cas fn="fMin">fMin(sin(x/2) + cos(2x), x) | 0 ≤ x ≤ 4π</Cas>,
    reason: <><Katex tex="f" /> repeats every <Katex tex="4\pi" /> (part a), so its lowest value over one period is its lowest value anywhere. The lowest point is not at a &lsquo;nice&rsquo; <Katex tex="x" />-value, so let the CAS find it.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}x \approx 7.939 \\ f(7.939\ldots) = -1.72209\ldots\end{gathered}" />,
    reason: <>The CAS gives the <Katex tex="x" />-value of the lowest point; substitute it into <Katex tex="f" /> to get the minimum value.</>,
    more: <>This trough sits just right of <Katex tex="x=\tfrac{5\pi}{2}\approx7.854" />, where <Katex tex="\cos(2x)=-1" /> and <Katex tex="f=-\tfrac{\sqrt2}{2}-1\approx-1.707" />. That is the same value as <Katex tex="f\!\left(-\tfrac\pi2\right)" />, which the report notes many students evaluated. The trough looks as if it is where <Katex tex="\cos(2x)" /> is lowest, but <Katex tex="\sin\!\left(\tfrac x2\right)" /> is still changing there, so the true lowest point is slightly to one side and slightly lower.</>,
  },
  {
    working: <Katex display tex="\boxed{-1.722}" />,
    reason: <>The <em>value</em>, not the coordinates, and to three decimal places.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered}f(h-x) = f(x) \text{ for all } x \\ \iff \text{the graph is symmetric about } x = \tfrac h2\end{gathered}" />,
    reason: <><Katex tex="x" /> and <Katex tex="h-x" /> average to <Katex tex="\tfrac h2" />, so they sit the same distance either side of <Katex tex="x=\tfrac h2" />. Equal heights at every such pair is mirror symmetry in that line.</>,
  },
  {
    working: <Katex display tex="\text{first line of symmetry right of the } y\text{-axis: } x = \pi" />,
    reason: <>A vertical line of symmetry passes through a peak or trough with matching shapes either side. The small peak near 0 and the trough near <Katex tex="\tfrac\pi2" /> have unequal sides; the first balanced one is the tall peak <Katex tex="(\pi,2)" />.</>,
    more: <>The unequal sides in numbers: for the small peak just right of 0, the troughs either side are at about <Katex tex="-1.7" /> and <Katex tex="-0.3" />; for the trough near <Katex tex="\tfrac\pi2" />, the peaks either side are at about 1 and 2. The tall peak <Katex tex="(\pi,2)" /> is: matching smaller peaks (height about 1) sit just right of 0 and just left of <Katex tex="2\pi" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}f(2\pi-x) &= \sin\!\left(\pi-\tfrac x2\right)+\cos(4\pi-2x) \\ &= \sin\!\left(\tfrac x2\right)+\cos(2x) = f(x)\end{aligned}" />,
    reason: <>Confirming the symmetry exactly: <Katex tex="\sin(\pi-\theta)=\sin\theta" />, and <Katex tex="\cos(4\pi-\theta)=\cos(-\theta)=\cos\theta" /> since cosine repeats every <Katex tex="2\pi" /> and is symmetric about the <Katex tex="y" />-axis.</>,
  },
  {
    working: <Katex display tex="\tfrac h2 = \pi \implies \boxed{h = 2\pi}" />,
    reason: <>The line is at <Katex tex="x=\tfrac h2" />, so double <Katex tex="\pi" />. Give it exactly: <Katex tex="2\pi" />, not 6.28.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered}g_a(x) = \sin\!\left(\tfrac xa\right)+\cos(ax) \\ f(x) = \sin\!\left(\tfrac x2\right)+\cos(2x)\end{gathered}" />,
    reason: <>Compare the two rules term by term: the sine needs <Katex tex="\tfrac xa=\tfrac x2" />, and the cosine needs <Katex tex="ax=2x" />.</>,
  },
  {
    working: <Katex display tex="\boxed{a = 2}" />,
    reason: <>The same value works for both terms, so <Katex tex="g_2(x)=\sin\!\left(\tfrac x2\right)+\cos(2x)=f(x)" /> for all <Katex tex="x" />.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="\int\sin\!\left(\tfrac xa\right)dx = -\frac{\cos\!\left(\tfrac xa\right)}{1/a} = -a\cos\!\left(\tfrac xa\right)" />,
    reason: <>Use <Katex tex="\int\sin(kx)\,dx=-\tfrac1k\cos(kx)" /> with <Katex tex="k=\tfrac1a" />. Dividing by <Katex tex="\tfrac1a" /> means multiplying by <Katex tex="a" />.</>,
  },
  {
    working: <Katex display tex="\int\cos(ax)\,dx = \frac{\sin(ax)}{a}" />,
    reason: <>Use <Katex tex="\int\cos(kx)\,dx=\tfrac1k\sin(kx)" /> with <Katex tex="k=a" />.</>,
  },
  {
    working: <Katex display tex="\boxed{-a\cos\!\left(\tfrac xa\right)+\frac{\sin(ax)}{a}}" />,
    reason: <>The question asks for <em>an</em> antiderivative, so no <Katex tex="+c" /> is needed. Check: differentiating it gives back <Katex tex="g_a(x)" />.</>,
    more: <>The report notes students who differentiated instead, and others who wrote <Katex tex="a\cos\!\left(\tfrac xa\right)-\tfrac{\sin(ax)}{a}" /> (both signs flipped). Differentiating back catches both slips: <Katex tex="-a\cdot\left(-\sin\!\left(\tfrac xa\right)\right)\cdot\tfrac1a=\sin\!\left(\tfrac xa\right)" /> and <Katex tex="\tfrac1a\cdot a\cos(ax)=\cos(ax)" />, which gives <Katex tex="g_a(x)" />.</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="\int_0^{2a\pi}g_a(x)\,dx = \left[-a\cos\!\left(\tfrac xa\right)+\frac{\sin(ax)}{a}\right]_0^{2a\pi}" />,
    reason: <>Use the antiderivative from part e.i.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{at } x=2a\pi&: \ -a\cos(2\pi)+\frac{\sin\left(2a^2\pi\right)}{a} \\ &= -a+\frac{\sin\left(2a^2\pi\right)}{a}\end{aligned}" />,
    reason: <>Upper terminal: <Katex tex="\tfrac{2a\pi}{a}=2\pi" /> and <Katex tex="a\cdot2a\pi=2a^2\pi" />. Since <Katex tex="\cos(2\pi)=1" />, the cosine term is exactly <Katex tex="-a" />.</>,
  },
  {
    working: <Katex display tex="\text{at } x=0: \ -a\cos(0)+\frac{\sin(0)}{a} = -a" />,
    reason: <>Lower terminal: <Katex tex="\cos(0)=1" /> and <Katex tex="\sin(0)=0" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\int_0^{2a\pi}g_a(x)\,dx &= \left(-a+\frac{\sin\!\left(2a^2\pi\right)}{a}\right)-(-a) \\ &= \frac{\sin\!\left(2a^2\pi\right)}{a}\end{aligned}" />,
    reason: <>Upper minus lower: the <Katex tex="-a" /> terms cancel.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}a\in Z^+ \implies 2a^2 \text{ is an integer} \\ \implies \sin\!\left(2a^2\pi\right) = 0\end{gathered}" />,
    reason: <><Katex tex="a" /> is a positive integer, so <Katex tex="2a^2" /> is a whole number, and <Katex tex="\sin(n\pi)=0" /> for every whole number <Katex tex="n" />.</>,
    more: <>This is the step the report notes some students were unable to interpret. On the graph of sine, these are the <Katex tex="x" />-axis crossings, so the whole expression collapses to 0. (That <Katex tex="2a^2" /> is also even does not matter; any integer works.) The diagram below shows what goes wrong when <Katex tex="a" /> is not an integer.</>,
  },
  {
    working: <Katex display tex="\int_0^{2a\pi}g_a(x)\,dx = \frac{0}{a} = 0" />,
    reason: <>This holds for every positive integer <Katex tex="a" />, which is what &lsquo;for all values of <Katex tex="a" />&rsquo; means here.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}(\text{area above}) - (\text{area below}) = 0 \\ \boxed{\text{area above} = \text{area below}}\end{gathered}" />,
    reason: <>A definite integral counts area above the <Katex tex="x" />-axis as positive and area below as negative. A total of zero means the two areas are equal. As required.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="-1 \le \sin\!\left(\tfrac xa\right) \le 1 \ \text{ for all } x \text{ and all } a" />,
    reason: <>Whatever is inside the brackets, sine gives a value from <Katex tex="-1" /> to 1. Changing <Katex tex="a" /> only stretches the graph sideways; it never changes this range.</>,
  },
  {
    working: <Katex display tex="-1 \le \cos(ax) \le 1 \ \text{ for all } x \text{ and all } a" />,
    reason: <>The same is true of cosine.</>,
  },
  {
    working: <Katex display tex="\boxed{-2 \le \sin\!\left(\tfrac xa\right)+\cos(ax) \le 2}" />,
    reason: <>Adding the two inequalities: <Katex tex="g_a(x)" /> can never be more than <Katex tex="1+1=2" /> or less than <Katex tex="-1+(-1)=-2" />, for any <Katex tex="x" /> and any <Katex tex="a" />. State both bounds: the question asks about the maximum <em>and</em> the minimum.</>,
    more: <>The report notes some students considered the maximum value only and not the minimum value.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered}g_a(x) = -2 \text{ needs } \sin\!\left(\tfrac xa\right) = -1 \\ \text{and } \cos(ax) = -1 \text{ at the same } x\end{gathered}" />,
    reason: <>Part f shows <Katex tex="-2" /> is the lowest any <Katex tex="g_a" /> could go. Whether one actually gets there is a separate question: both parts would have to be at their lowest at the same <Katex tex="x" />.</>,
  },
  {
    working: <Katex display tex="\sin\!\left(\tfrac xa\right) = -1 \text{ on } [0, 2a\pi] \iff x = \tfrac{3a\pi}{2}" />,
    reason: <><Katex tex="g_a" /> repeats every <Katex tex="2a\pi" /> (one sine period, <Katex tex="a^2" /> cosine periods), so check one period. Within it, <Katex tex="\sin\!\left(\tfrac xa\right)=-1" /> only when <Katex tex="\tfrac xa=\tfrac{3\pi}{2}" />.</>,
    more: <>In detail: <Katex tex="\sin\!\left(\tfrac xa\right)" /> has period <Katex tex="2a\pi" />, and <Katex tex="\cos(ax)" /> has period <Katex tex="\tfrac{2\pi}{a}" />, so it fits <Katex tex="2a\pi\div\tfrac{2\pi}{a}=a^2" /> whole cycles into that length. Both parts restart together after <Katex tex="2a\pi" />, so nothing new happens beyond one period.</>,
  },
  {
    working: <Katex display tex="\cos\!\left(a\cdot\tfrac{3a\pi}{2}\right) = \cos\!\left(\tfrac{3a^2\pi}{2}\right) = \begin{cases}0, & a \text{ odd} \\ 1, & a \text{ even}\end{cases}" />,
    reason: <>Even <Katex tex="a" />: <Katex tex="a^2" /> is a multiple of 4, so the angle is a multiple of <Katex tex="6\pi" />. Odd <Katex tex="a" />: <Katex tex="3a^2" /> is odd, so it is an odd multiple of <Katex tex="\tfrac\pi2" />. Never <Katex tex="-1" />, so no <Katex tex="g_a" /> reaches <Katex tex="-2" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}a=1: \ g_1'(x) = \cos x - \sin x = 0 \\ \implies \tan x = 1 \implies x = \tfrac\pi4,\ \tfrac{5\pi}{4}\end{gathered}" />,
    reason: <>So each <Katex tex="a" /> has its own minimum above <Katex tex="-2" />, and we want the highest. Start with <Katex tex="a=1" />: <Katex tex="g_1(x)=\sin x+\cos x" />, period <Katex tex="2\pi" />; find its stationary points in <Katex tex="[0,2\pi]" />.</>,
    more: <>Setting <Katex tex="g_1'(x)=0" /> gives <Katex tex="\sin x=\cos x" />; dividing by <Katex tex="\cos x" /> gives <Katex tex="\tan x=1" />, so <Katex tex="x=\tfrac\pi4" /> (first quadrant) or <Katex tex="\tfrac{5\pi}{4}" /> (third quadrant).</>,
  },
  {
    working: <Katex display tex="\min g_1 = g_1\!\left(\tfrac{5\pi}{4}\right) = -\tfrac{\sqrt2}{2}-\tfrac{\sqrt2}{2} = -\sqrt2" />,
    reason: <><Katex tex="g_1" /> repeats and has no endpoints, so its minimum is at a stationary point: <Katex tex="x=\tfrac\pi4" /> gives <Katex tex="\sqrt2" /> (the maximum), <Katex tex="x=\tfrac{5\pi}{4}" /> gives <Katex tex="-\sqrt2" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}a=2: \ -1.722; \quad a=3: \ -1.985 \\ a=4: \ -1.981; \quad a=5: \ -1.998\end{gathered}" />,
    reason: <>The minimum for each <Katex tex="a" /> from <Cas fn="fMin" /> over one period <Katex tex="[0,2a\pi]" />. Every one is lower than <Katex tex="-\sqrt2\approx-1.414" />.</>,
    more: <><Katex tex="a=2" /> is <Katex tex="f" /> from part b. The minima get close to <Katex tex="-2" /> as <Katex tex="a" /> grows, though not steadily (<Katex tex="a=4" /> is slightly higher than <Katex tex="a=3" />). Click through the values of <Katex tex="a" /> in the diagram below.</>,
  },
  {
    working: <Katex display tex="a \ge 2: \ \min g_a \le -1-\tfrac{\sqrt2}{2} \approx -1.707 \lt -\sqrt2" />,
    reason: <>True for every <Katex tex="a\ge2" />: <Katex tex="\cos(ax)=-1" /> at some <Katex tex="x" /> within <Katex tex="\tfrac\pi a" /> of <Katex tex="\tfrac{3a\pi}{2}" />; there <Katex tex="\tfrac xa" /> is within <Katex tex="\tfrac{\pi}{a^2}\le\tfrac\pi4" /> of <Katex tex="\tfrac{3\pi}{2}" />, so <Katex tex="\sin\!\left(\tfrac xa\right)\le-\tfrac{\sqrt2}{2}" />.</>,
    more: <>Why: <Katex tex="\cos(ax)" /> equals <Katex tex="-1" /> once every <Katex tex="\tfrac{2\pi}{a}" />, so the nearest such <Katex tex="x" /> is at most half that, <Katex tex="\tfrac\pi a" />, away. Dividing by <Katex tex="a" /> shrinks the gap in angle to <Katex tex="\tfrac{\pi}{a^2}" />, which is at most <Katex tex="\tfrac\pi4" /> once <Katex tex="a\ge2" />. Every angle from <Katex tex="\tfrac{5\pi}{4}" /> to <Katex tex="\tfrac{7\pi}{4}" /> has sine at most <Katex tex="-\tfrac{\sqrt2}{2}" />. So at that <Katex tex="x" />, <Katex tex="g_a(x)\le-\tfrac{\sqrt2}{2}-1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{-\sqrt2}" />,
    reason: <>The highest of the minima, at <Katex tex="a=1" />. Give it exactly. Not <Katex tex="-2" />: that is only the bound from part f, which no <Katex tex="g_a" /> reaches.</>,
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
          <img loading="lazy" decoding="async"
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
        <Explore title="Why the areas balance: whole cycles of both waves">
          <BalancedAreas />
        </Explore>
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
        <Explore title="Why −2 is never reached, and a = 1 has the highest minimum">
          <GreatestMinimum />
        </Explore>
      </PartCard>
    </div>
  )
}
