// 2019 Mathematical Methods — Exam 2, Question 3 (9 marks).
// f(t) = sin(πt/3) + sin(πt/6), the strength of a dual-tone telephone signal — its period,
// zeros, maximum, and the area it bounds with the axis (parts a-d), then a transformation g
// of f for which ∫₂⁰ g + ∫₂⁶ g equals part d.'s area (part e), and a rectangle of matching area
// over one period (part f). The given graph of f is VCAA's own, cropped directly from the exam
// paper. Note the paper's first integral in part e. is ∫ from 2 to 0 (terminals reversed), not
// from −2 to 0. Question text transcribed from the original paper. Cross-checked against the VCAA
// examination report and itute's independent solutions — both accept a family of
// transformations in part e., and both are shown. Every integral confirmed exactly by computer
// algebra (sympy), and the part e. families checked numerically, including the domain condition.
//
// Interactive widgets (interactives/meth-2019e2-q3*): a. slide a copy of f by P and watch it fit
// only when both waves have done whole cycles (P = 12, not 6 or 18); c. stack the two waves' values
// to see why the peaks can't add to 2; d. sweep the upper terminal to see ∫₀⁶ f undercount the area
// as the dip is subtracted; e. choose a, b, c and watch which pieces of g count for or against the
// expression, with g drawn only on its domain; f. half-turn the part d. region onto [6, 12] and
// draw the rectangle y = k. The part e. widget replaces this site's earlier static figure of g.
//
// Note on the report's part e. wording: it describes a = −1, c = 6 + 12n as "reflect f in the
// y-axis and translate 6 units left" and a = 1, b = −1, c = −6 + 12n as "reflect f in the x-axis and
// translate 6 units right". The values are right, but t ↦ −t + 6 is a reflection followed by a
// translation 6 units RIGHT, and t ↦ t − 6 is a translation 6 units LEFT (itute also says left).
// We describe the directions from the values and don't quote the report's direction words.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import ftGraphSrc from './meth-2019e2-q3-ft-graph.png'

const PeriodWidget = lazyWidget(() => import('../interactives/meth-2019e2-q3a-period'))
const PeaksWidget = lazyWidget(() => import('../interactives/meth-2019e2-q3c-peaks'))
const SignedWidget = lazyWidget(() => import('../interactives/meth-2019e2-q3d-signed'))
const TransformWidget = lazyWidget(() => import('../interactives/meth-2019e2-q3e-transform'))
const HalfTurnWidget = lazyWidget(() => import('../interactives/meth-2019e2-q3f-halfturn'))

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
      The most common incorrect answer was{' '}
      <Katex tex="\displaystyle\int_0^4f(t)dt+\int_4^6f(t)dt=\tfrac{12}{\pi}" />, or{' '}
      <Katex tex="\displaystyle\int_0^6f(t)dt=\tfrac{12}{\pi}" />.
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
      Many students did not double their answer from Question 3d., giving{' '}
      <Katex tex="12k=\tfrac{15}{\pi},\ k=\tfrac{5}{4\pi}" />. Other
      students had the correct method but wrote their final answer as <Katex tex="k=\tfrac{5\pi}{2}" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\sin\!\left(\dfrac{\pi t}{3}\right) \text{ has period } \dfrac{2\pi}{\pi/3}=6" />,
    reason: <>For a sum of two waves, find each wave's period first: <Katex tex="\sin(nt)" /> has period <Katex tex="\tfrac{2\pi}{n}" />, with <Katex tex="n=\tfrac{\pi}{3}" /> here.</>,
  },
  {
    working: <Katex display tex="\sin\!\left(\dfrac{\pi t}{6}\right) \text{ has period } \dfrac{2\pi}{\pi/6}=12" />,
    reason: <>The same rule for the slower term.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Period} = 12}" />,
    reason: <>The sum repeats only when <em>both</em> waves are back at their start together: the lowest common multiple of <Katex tex="6" /> and <Katex tex="12" />.</>,
    more: <>The given graph agrees: the pattern on <Katex tex="[0,12]" /> repeats exactly on <Katex tex="[12,24]" />. The report's common wrong answers were <Katex tex="6" />, <Katex tex="18" /> and <Katex tex="12t" />. After <Katex tex="6" /> or <Katex tex="18" /> units the slow wave has done only half a cycle or one and a half, so it is upside down. And the period is a number of time units, not an expression in <Katex tex="t" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\sin\!\left(\dfrac{\pi t}{3}\right)+\sin\!\left(\dfrac{\pi t}{6}\right)=0" />
        <Katex display tex="2\sin\!\left(\dfrac{\pi t}{6}\right)\cos\!\left(\dfrac{\pi t}{6}\right)+\sin\!\left(\dfrac{\pi t}{6}\right)=0" />
      </>
    ),
    reason: <><Katex tex="\tfrac{\pi t}{3}" /> is double <Katex tex="\tfrac{\pi t}{6}" />, so use <Katex tex="\sin(2A)=2\sin A\cos A" /> to write both terms with the same angle.</>,
    more: <>On CAS, <Cas fn="solve">solve(sin(πt/3)+sin(πt/6)=0, t) | 0≤t≤6</Cas> gives the answer directly; the rows here are the by-hand route. The double-angle rule rewrites the first term in terms of the angle <Katex tex="\tfrac{\pi t}{6}" />, so both terms share a factor. The given graph shows the same three crossings on <Katex tex="[0,6]" />.</>,
  },
  {
    working: <Katex display tex="\sin\!\left(\dfrac{\pi t}{6}\right)\left[2\cos\!\left(\dfrac{\pi t}{6}\right)+1\right]=0" />,
    reason: <>Take out the common factor. A product is zero when either factor is.</>,
    more: <>Don't divide by <Katex tex="\sin\!\left(\tfrac{\pi t}{6}\right)" /> instead: that would throw away the solutions where it is zero, <Katex tex="t=0" /> and <Katex tex="t=6" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\sin\!\left(\dfrac{\pi t}{6}\right)=0 \implies \dfrac{\pi t}{6}=0,\ \pi \implies t=0,\ 6" />
        <Katex display tex="\cos\!\left(\dfrac{\pi t}{6}\right)=-\dfrac12 \implies \dfrac{\pi t}{6}=\dfrac{2\pi}{3} \implies t=4" />
      </>
    ),
    reason: <>For <Katex tex="t\in[0,6]" />, the angle <Katex tex="\tfrac{\pi t}{6}" /> runs over <Katex tex="[0,\pi]" />, so only those solutions are kept.</>,
  },
  {
    working: <Katex display tex="\boxed{t=0,\ 4,\ 6}" />,
    reason: <>The interval is closed, so both endpoints count: all three values are wanted.</>,
    more: <>The report notes some students only gave two values, either <Katex tex="0,4" /> or <Katex tex="4,6" />. Only the <Katex tex="t" />-values are asked for; the report's general comments say there is no need to write down coordinates here.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{fMax on } 0\le t\le 12 \implies t\approx1.787" />,
    reason: <>Use technology: <Cas fn="fMax">fMax(sin(πt/3)+sin(πt/6), t) | 0≤t≤12</Cas> returns the <Katex tex="t" />-value of the maximum. One period, <Katex tex="[0,12]" />, is enough because the pattern repeats.</>,
    more: <>Graphing <Katex tex="f" /> and using the graph's maximum tool works equally well.</>,
  },
  {
    working: <Katex display tex="f(1.787\ldots)\approx1.7602" />,
    reason: <>The question asks for the <em>strength</em>, the <Katex tex="y" />-value, so substitute the <Katex tex="t" />-value back into <Katex tex="f" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Maximum strength} \approx 1.76}" />,
    reason: <>Correct to two decimal places, as asked. Give the strength itself, not the coordinates of the peak.</>,
    more: <>Sanity check against the given graph: the tall peaks sit a little below <Katex tex="2" />. ✓ The report's common wrong answers were <Katex tex="1.73" /> and <Katex tex="1.79" />. <Katex tex="1.79" /> is most likely the <Katex tex="t" />-value: the report's general comments single out Question 3c. for giving coordinates instead of the value.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="f(t)\ge0 \text{ on } [0,4], \qquad f(t)\le0 \text{ on } [4,6]" />,
    reason: <>Before integrating for an <em>area</em>, check whether the curve crosses the axis inside the interval. Part b. found a crossing at <Katex tex="t=4" />.</>,
    more: <>The given graph shows the curve above the axis on <Katex tex="[0,4]" /> and dipping below it between <Katex tex="4" /> and <Katex tex="6" />.</>,
  },
  {
    working: <Katex display tex="\text{Area} = \int_0^4 f(t)\,dt \;-\; \int_4^6 f(t)\,dt" />,
    reason: <>Split at the crossing. The second integral comes out <em>negative</em> (the region is below the axis), so subtracting it adds its size to the total.</>,
  },
  {
    working: <Katex display tex="F(t) = -\dfrac{3}{\pi}\cos\!\left(\dfrac{\pi t}{3}\right)-\dfrac{6}{\pi}\cos\!\left(\dfrac{\pi t}{6}\right)" />,
    reason: <>Antidifferentiate each term with <Katex tex="\int\sin(nt)\,dt=-\tfrac1n\cos(nt)" />: <Katex tex="\tfrac{1}{\pi/3}=\tfrac3\pi" /> and <Katex tex="\tfrac{1}{\pi/6}=\tfrac6\pi" />.</>,
    more: <>On CAS you can evaluate the two definite integrals directly and get the same exact values; the rows below are what it is doing. Either way, write the integrals down: this is a 2-mark question, and the report's general comments name Question 3d. as one where some students did not show their method.</>,
  },
  {
    working: (
      <>
        <Katex display tex="F(0) = -\dfrac{3}{\pi}(1)-\dfrac{6}{\pi}(1) = -\dfrac{9}{\pi}" />
        <Katex display tex="F(4) = -\dfrac{3}{\pi}\!\left(-\dfrac12\right)-\dfrac{6}{\pi}\!\left(-\dfrac12\right) = \dfrac{9}{2\pi}" />
        <Katex display tex="F(6) = -\dfrac{3}{\pi}(1)-\dfrac{6}{\pi}(-1) = \dfrac{3}{\pi}" />
      </>
    ),
    reason: <>Using <Katex tex="\cos\tfrac{4\pi}{3}=\cos\tfrac{2\pi}{3}=-\tfrac12" />, <Katex tex="\cos2\pi=1" /> and <Katex tex="\cos\pi=-1" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\int_0^4 f = F(4)-F(0) = \dfrac{27}{2\pi}" />
        <Katex display tex="\int_4^6 f = F(6)-F(4) = -\dfrac{3}{2\pi}" />
      </>
    ),
    reason: <>The second is negative, as expected for the dip below the axis — a built-in check that the split was needed.</>,
  },
  {
    working: <Katex display tex="\text{Area} = \dfrac{27}{2\pi}-\left(-\dfrac{3}{2\pi}\right) = \dfrac{30}{2\pi}" />,
    reason: <>Subtracting the negative integral adds its size.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Area} = \dfrac{15}{\pi}}" />,
    reason: <>Give the exact value: no decimal is asked for.</>,
    more: <>The report's general comments list Question 3d. among those where approximate answers were seen; <Katex tex="\tfrac{15}{\pi}\approx4.77" /> is only a check, not the answer.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&\int_2^0 g(t)\,dt+\int_2^6 g(t)\,dt\\&= -\int_0^2 g(t)\,dt+\int_2^6 g(t)\,dt\end{aligned}" />,
    reason: <>Swapping an integral's terminals changes its sign, so the first piece is <em>subtracted</em>: a part of <Katex tex="g" /> below the axis on <Katex tex="[0,2]" /> counts positively.</>,
  },
  {
    working: <Katex display tex="\text{Part d.: } \ -\int_4^6 f(t)\,dt+\int_0^4 f(t)\,dt=\dfrac{15}{\pi}" />,
    reason: <>Part d.'s area had the same shape: minus a 2-wide dip, plus a 4-wide hump. So <Katex tex="g" /> needs <Katex tex="f" />'s dip on <Katex tex="[0,2]" /> and its hump on <Katex tex="[2,6]" />.</>,
    more: <>The widths are the giveaway: <Katex tex="[0,2]" /> and <Katex tex="[4,6]" /> are both 2 wide, <Katex tex="[2,6]" /> and <Katex tex="[0,4]" /> both 4 wide. But <Katex tex="f" /> has its hump first and its dip second, and <Katex tex="g" /> needs the same two pieces <em>in reverse order</em>.</>,
  },
  {
    working: <Katex display tex="t\mapsto 6-t:\quad [0,4]\to[2,6],\ \ [4,6]\to[0,2]" />,
    reason: <>A translation can't reverse the order of the pieces; a reflection in a vertical line can. Reflecting in <Katex tex="t=3" />, the middle of <Katex tex="[0,6]" />, sends <Katex tex="t" /> to <Katex tex="6-t" />.</>,
    more: <>As two steps: reflect in the <Katex tex="y" />-axis (<Katex tex="t\mapsto -t" />), then translate <Katex tex="6" /> units right (<Katex tex="-t\mapsto -t+6" />). Check the ends: <Katex tex="0\mapsto6" />, <Katex tex="4\mapsto2" />, <Katex tex="6\mapsto0" />.</>,
  },
  {
    working: <Katex display tex="T\!\begin{bmatrix}t\\y\end{bmatrix}=\begin{bmatrix}-1&0\\0&1\end{bmatrix}\!\begin{bmatrix}t\\y\end{bmatrix}+\begin{bmatrix}6\\0\end{bmatrix}" />,
    reason: <>The matrix sends <Katex tex="(x,y)" /> to <Katex tex="(ax+c,\ by+d)" />, with <Katex tex="x" /> playing the role of <Katex tex="t" />. Match: <Katex tex="at+c=-t+6" />, and heights are unchanged, <Katex tex="by+d=y" />.</>,
  },
  {
    working: <Katex display tex="g(t)=f(6-t),\quad t\le 6" />,
    reason: <>The point <Katex tex="\bigl(t,f(t)\bigr)" /> moves to <Katex tex="\bigl(6-t,f(t)\bigr)" />. So the point at new position <Katex tex="s" /> came from <Katex tex="t=6-s" />, giving <Katex tex="g(s)=f(6-s)" />. <Katex tex="f" /> needs <Katex tex="6-s\ge0" />, so <Katex tex="s\le6" />.</>,
    more: <>Renaming <Katex tex="s" /> back to <Katex tex="t" /> gives <Katex tex="g(t)=f(6-t)" />. The domain <Katex tex="t\le6" /> covers <Katex tex="[0,6]" />, so both integrals exist.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\int_2^6 f(6-t)\,dt = \int_0^4 f(t)\,dt = \dfrac{27}{2\pi}" />
        <Katex display tex="-\int_0^2 f(6-t)\,dt = -\int_4^6 f(t)\,dt = \dfrac{3}{2\pi}" />
      </>
    ),
    reason: <>Check on CAS, or by symmetry: <Katex tex="g" /> on <Katex tex="[2,6]" /> is <Katex tex="f" /> on <Katex tex="[0,4]" /> reflected, and <Katex tex="g" /> on <Katex tex="[0,2]" /> is <Katex tex="f" /> on <Katex tex="[4,6]" /> reflected.</>,
    more: <>Reflecting a region in a vertical line doesn't change its size or which side of the axis it is on, so each integral of <Katex tex="g" /> equals the matching integral of <Katex tex="f" /> from part d.</>,
  },
  {
    working: <Katex display tex="\dfrac{3}{2\pi}+\dfrac{27}{2\pi} = \dfrac{15}{\pi}" />,
    reason: <>Exactly part d.'s area, as required.</>,
  },
  {
    working: <Katex display tex="\boxed{a=-1,\quad b=1,\quad c=6,\quad d=0}" />,
    reason: <>The question asks for values, so state all four. This is one of several accepted answers: any <Katex tex="c=6+12n" />, <Katex tex="n\in Z^+\cup\{0\}" />, also works, since <Katex tex="12" /> is the period.</>,
    more: <>The report notes students who described the transformations but gave incorrect or no values. <Katex tex="n" /> can't be negative: then <Katex tex="c<6" />, and <Katex tex="g" />, defined only for <Katex tex="t\le c" />, would miss part of <Katex tex="[0,6]" />. The report's alternative is <Katex tex="a=1,\ b=-1,\ c=-6+12n" /> for <Katex tex="n\in Z^-\cup\{0\}" />, <Katex tex="d=0" />: in our words, reflect in the <Katex tex="t" />-axis and translate <Katex tex="6" /> units left, giving <Katex tex="g(t)=-f(t+6)" />, which simplifies to the same function <Katex tex="\sin\!\left(\tfrac{\pi t}{6}\right)-\sin\!\left(\tfrac{\pi t}{3}\right)" />. "There are other solutions," as the report says.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Rectangle: width } 12, \text{ height } k \implies \text{area} = 12k" />,
    reason: <>It runs from <Katex tex="x=0" /> to <Katex tex="x=12" /> between the axis and the line <Katex tex="y=k" /> — one full period wide (part a.).</>,
  },
  {
    working: (
      <>
        <Katex display tex="f(12-t) = \sin\!\left(4\pi-\dfrac{\pi t}{3}\right)+\sin\!\left(2\pi-\dfrac{\pi t}{6}\right)" />
        <Katex display tex="= -f(t)" />
      </>
    ),
    reason: <>Part d. covered only half a period. Using <Katex tex="\sin(2n\pi - A)=-\sin A" />: the height at <Katex tex="12-t" /> is minus the height at <Katex tex="t" />, so <Katex tex="[6,12]" /> holds the <Katex tex="[0,6]" /> regions flipped, with the same sizes and so the same area.</>,
    more: <>In fact the graph on <Katex tex="[6,12]" /> is the <Katex tex="[0,6]" /> graph rotated <Katex tex="180^\circ" /> about <Katex tex="(6,0)" />. Why a rotation: <Katex tex="t\mapsto12-t" /> reflects in the line <Katex tex="t=6" />, and the minus sign in <Katex tex="-f(t)" /> reflects in the axis; the two reflections together are a half-turn about <Katex tex="(6,0)" />. The given graph shows it: on <Katex tex="[6,12]" /> a small bump then a deep trough, the half-turned image of the tall hump and small dip on <Katex tex="[0,6]" />.</>,
  },
  {
    working: <Katex display tex="\text{Area over one period } [0,12] = 2\times\dfrac{15}{\pi} = \dfrac{30}{\pi}" />,
    reason: <>Twice part d.'s answer.</>,
  },
  {
    working: <Katex display tex="12k = \dfrac{30}{\pi}" />,
    reason: <>Equating the two areas.</>,
  },
  {
    working: <Katex display tex="\boxed{k = \dfrac{30}{12\pi} = \dfrac{5}{2\pi}}" />,
    reason: <>Divide by <Katex tex="12" /> and simplify, keeping <Katex tex="\pi" /> in the denominator. Give the exact value: no decimal is asked for.</>,
    more: <>The report's general comments list Question 3f. among those where approximate answers were seen, so <Katex tex="k\approx0.80" /> is only a size check. Not <Katex tex="\tfrac{5\pi}{2}\approx7.85" />: the report notes students who had the correct method but wrote that as their final answer. A quick check catches it: <Katex tex="|f|" /> never exceeds about <Katex tex="1.76" />, so its average height <Katex tex="k" /> can't be <Katex tex="7.85" />.</>,
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
        <p className="mt-2 mb-3">Part of the graph of <Katex tex="y=f(t)" /> is shown below.</p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async" src={ftGraphSrc} alt="Graph of y = f(t) for t from 0 to about 25, oscillating between about −1.76 and 1.76 and crossing the axis at t = 0, 4, 6, 8, 12, 16, 18, 20 and 24, from the original 2019 VCAA exam paper" className="w-full max-w-[420px]" />
        </div>
      </div>

      <PartCard letter="a" topic="Period" marks={1} statement="State the period of the function." examinerReport={EXAM_A}>
        <Background>
          <p>
            "Dual-tone" means two sine waves of different frequencies added together — which is
            literally what a telephone keypad sends down the line when you press a button. So
            this question asks for the period of a sum, and the key idea is that a sum repeats
            only when <em>every</em> term does: its period is the <b>lowest common multiple</b> of
            the individual periods.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <Explore title="Why the period is 12, not 6: both waves must be back in step">
          <PeriodWidget />
        </Explore>
        <WrongMethod
          title="The period is 6 — that's the period of the first term"
          source="Examiner's report"
          working={<Katex display tex="f(t+6)=\sin\!\left(\tfrac{\pi t}{3}\right)-\sin\!\left(\tfrac{\pi t}{6}\right)\ne f(t)" />}
        >
          After <Katex tex="6" /> units the fast wave is back where it started, but the slow wave has
          only done half a cycle, so it comes back upside down. A period has to work for the{' '}
          <em>whole</em> function. Catch it by checking the graph: the shape on <Katex tex="[0,6]" /> (a
          tall hump then a small dip) is not repeated on <Katex tex="[6,12]" /> (a small bump then a deep
          trough).
        </WrongMethod>
      </PartCard>

      <PartCard letter="b" topic="Zeros" marks={1} statement={<>Find the values of <Katex tex="t" /> where <Katex tex="f(t)=0" /> for the interval <Katex tex="t\in[0,6]" />.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard letter="c" topic="Maximum Value" marks={1} statement="Find the maximum strength of the dual-tone frequency signal, correct to two decimal places." examinerReport={EXAM_C}>
        <Background>
          <p>
            It's tempting to say the maximum is <Katex tex="1+1=2" />, but the two waves peak at{' '}
            <em>different</em> times — <Katex tex="\sin\!\left(\tfrac{\pi t}{3}\right)" /> peaks at{' '}
            <Katex tex="t=1.5" />, <Katex tex="\sin\!\left(\tfrac{\pi t}{6}\right)" /> at{' '}
            <Katex tex="t=3" /> — so they never both hit <Katex tex="1" /> at once and the true
            maximum falls short of <Katex tex="2" />. It happens somewhere between the two peaks, and
            the exact form is messy, so this is a technology question.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <Explore title="Why the two peaks don't add up to 2">
          <PeaksWidget />
        </Explore>
        <WrongMethod
          title="The top of the hump looks like it's at t = 2"
          source="Examiner's report"
          working={<Katex display tex="f(2)=\tfrac{\sqrt3}{2}+\tfrac{\sqrt3}{2}=\sqrt3\approx1.73" />}
        >
          <Katex tex="1.73" />, one of the report's common wrong answers, is exactly <Katex tex="f(2)" />.
          The peak is close to <Katex tex="t=2" /> but actually at <Katex tex="t\approx1.79" />, where{' '}
          <Katex tex="f\approx1.76" />. Reading a maximum off a printed graph, or guessing a nice{' '}
          <Katex tex="t" />, isn't accurate enough for two decimal places — use fMax, or the graph's
          maximum tool, on your calculator.
        </WrongMethod>
      </PartCard>

      <PartCard letter="d" topic="Area Under Curve" marks={2} statement={<>Find the area between the graph of <Katex tex="f" /> and the horizontal axis for <Katex tex="t\in[0,6]" />.</>} examinerReport={EXAM_D}>
        <Background>
          <p>
            <b>Area is never negative, but integrals can be.</b> When a curve crosses the axis
            inside the interval, a single integral across the whole interval subtracts the
            below-axis part from the above-axis part. To get <em>area</em>, split the interval at
            every crossing and make each piece count positively — either by subtracting the
            integrals that come out negative, or by integrating <Katex tex="|f(t)|" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
        <Explore title="Why ∫₀⁶ f(t) dt is not the area">
          <SignedWidget />
        </Explore>
        <WrongMethod
          title="Area from 0 to 6, so integrate from 0 to 6"
          source="Examiner's report"
          working={<Katex display tex="\int_0^6 f(t)\,dt=\dfrac{27}{2\pi}-\dfrac{3}{2\pi}=\dfrac{12}{\pi}" />}
        >
          The dip on <Katex tex="[4,6]" /> is below the axis, so the integral counts it as negative and
          it cancels part of the hump: the answer is short by twice the dip. Splitting at{' '}
          <Katex tex="t=4" /> but still <em>adding</em> the two integrals gives the same{' '}
          <Katex tex="\tfrac{12}{\pi}" />. Catch it by sketching (or looking at the given graph) for
          any crossing inside the interval before you integrate for an area.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-2">
          Let <Katex tex="g" /> be the function obtained by applying the transformation{' '}
          <Katex tex="T" /> to the function <Katex tex="f" />, where{' '}
          <Katex tex="T\left(\begin{bmatrix}x\\y\end{bmatrix}\right)=\begin{bmatrix}a&0\\0&b\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix}+\begin{bmatrix}c\\d\end{bmatrix}" />{' '}
          and <Katex tex="a,b,c" /> and <Katex tex="d" /> are real numbers.
        </p>
      </div>

      <PartCard
        letter="e"
        topic="Transformations"
        marks={2}
        statement={<>Find the values of <Katex tex="a,b,c" /> and <Katex tex="d" /> given that <Katex tex="\displaystyle\int_{2}^{0}g(t)dt+\int_{2}^{6}g(t)dt" /> has the same area calculated in <b>part d.</b></>}
        examinerReport={EXAM_E}
      >
        <Background>
          <p>
            <b>How a transformation acts on a graph.</b> Transformation matrices are no longer in
            the study design; a current paper would describe the same reflections and translations
            in words, and the working would be identical. The matrix statement says a point{' '}
            <Katex tex="(t,y)" /> moves to <Katex tex="(at+c,\ by+d)" />. So a point on the graph
            of <Katex tex="f" />, which looks like <Katex tex="\bigl(t,\ f(t)\bigr)" />, lands at{' '}
            <Katex tex="\bigl(at+c,\ b\,f(t)+d\bigr)" />.
          </p>
          <p>
            To get the <em>rule</em> of the new graph, call the image point{' '}
            <Katex tex="(s,\ Y)" />. Then <Katex tex="s=at+c" />, so <Katex tex="t=\tfrac{s-c}{a}" />
            , and <Katex tex="Y=b\,f(t)+d" /> becomes{' '}
            <Katex tex="Y = b\,f\!\left(\tfrac{s-c}{a}\right)+d" />. That backwards-looking
            substitution is the key step: the rule of the image uses the{' '}
            <em>inverse</em> of what the transformation does to <Katex tex="t" />, which is easy to
            get backwards. The domain moves too: <Katex tex="f" /> is only defined for{' '}
            <Katex tex="t\ge0" />, so <Katex tex="g" /> is only defined where those points land.
          </p>
          <p>
            There is no single right answer here — VCAA accepted several — so the job is to
            find <em>any</em> transformation that lands the right pieces of the graph on{' '}
            <Katex tex="[0,2]" /> and <Katex tex="[2,6]" />. The given terminals are the clue.
          </p>
        </Background>
        <WorkingTable rows={ROWS_E} />
        <Explore title="Put f's dip on [0, 2] and its hump on [2, 6]">
          <TransformWidget />
        </Explore>
        <WrongMethod
          title="Read ∫₂⁰ as ∫₀², so the expression is just ∫₀⁶ g(t) dt"
          working={
            <>
              <Katex display tex="\int_0^2 f(6-t)\,dt+\int_2^6 f(6-t)\,dt" />
              <Katex display tex="=\int_0^6 f(t)\,dt=\dfrac{12}{\pi}" />
            </>
          }
        >
          With the terminals the usual way round, even the correct <Katex tex="g" /> gives{' '}
          <Katex tex="\tfrac{12}{\pi}" />, part d.'s wrong answer, and nothing seems to work. Read{' '}
          <Katex tex="\int_2^0" /> as written: it is minus <Katex tex="\int_0^2" />.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="f"
        topic="Average Value"
        marks={2}
        statement={<>The rectangle bounded by the line <Katex tex="y=k,\ k\in R^+" />, the horizontal axis, and the lines <Katex tex="x=0" /> and <Katex tex="x=12" /> has the same area as the area between the graph of <Katex tex="f" /> and the horizontal axis for one period of the dual-tone frequency signal. Find the value of <Katex tex="k" />.</>}
        examinerReport={EXAM_F}
      >
        <Background>
          <p>
            One period is <Katex tex="12" /> units long (part a), but part d. only measured the
            area over the <em>first half</em> of it, <Katex tex="[0,6]" />. So the first job is to
            get from half a period to a whole one — and the symmetry of the signal makes that a
            doubling rather than a fresh integral. The rectangle's height <Katex tex="k" /> is then
            the area spread evenly over the width <Katex tex="12" />: the average height of{' '}
            <Katex tex="|f|" /> over a period.
          </p>
        </Background>
        <WorkingTable rows={ROWS_F} />
        <Explore title="Why one period traps twice part d.'s area">
          <HalfTurnWidget />
        </Explore>
        <WrongMethod
          title="Use part d.'s area as the area for one period"
          source="Examiner's report"
          working={<Katex display tex="12k=\dfrac{15}{\pi}\implies k=\dfrac{5}{4\pi}" />}
        >
          Part d. covered <Katex tex="t\in[0,6]" />, but one period runs from <Katex tex="0" /> to{' '}
          <Katex tex="12" />, the same width as the rectangle. This <Katex tex="k" /> is half the
          correct value. Check that the interval of the area you use matches the width of the
          rectangle.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
