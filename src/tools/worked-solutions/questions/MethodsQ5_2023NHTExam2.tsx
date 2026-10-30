// 2023 Mathematical Methods NHT — Exam 2, Section B Question 5 (10 marks). The NHT report gives
// sample answers only, with no statistics. f(x) = 2 sin(3x) + 1: amplitude, range, the general
// solution of f(x) = 0 and the sum of the solutions in [−10π/3, −5π/3]; then the integral
// function g(a) = ∫₀ᵃ (f(x) − 1) dx (its maximum and minimum on [0, π/2], and the a that makes
// the average values on [0, a] and [a, π/2] equal), and the horizontal translations of f for
// which the matching integral h(a) reaches 4/3. Question text transcribed from the original
// paper (no diagram). The graph in part c.ii. is this site's own explanatory figure
// (matplotlib), not from the paper. Answers checked with sympy/scipy and against the VCAA
// report's sample answers: a. 2; b. [−1, 3]; c.i. x = π(12k − 1)/18 or π(12k + 7)/18, k ∈ Z;
// c.ii. −10π; d.i. 4/3 at a = π/3; d.ii. 0 at a = 0; d.iii. 0.144 (the only solution in
// (0, π/2)); e. k = 2n, n ∈ Z⁺. The report has no comments. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, DetailOnly } from '../QuestionParts'
import rootsSrc from './meth-2023nhte2-q5cii-roots.png'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\boxed{\text{Amplitude} = 2}" />,
    reason: <>The amplitude is the coefficient of the sine, 2: the graph rises and falls 2 units either side of its centre line <Katex tex="y=1" />. The 3 changes the period and the 1 moves the centre line; neither affects the amplitude.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered}-1 \le \sin(3x) \le 1 \\ \implies -2 + 1 \le 2\sin(3x) + 1 \le 2 + 1\end{gathered}" />,
    reason: <>Multiply through by 2, then add 1. No domain is given, so <Katex tex="x" /> ranges over all of <Katex tex="R" /> and every value of the sine is reached.</>,
  },
  {
    working: <Katex display tex="\boxed{[-1,\ 3]}" />,
    reason: <>Square brackets: both <Katex tex="-1" /> and 3 are attained.</>,
    more: <>Equivalently, centre line plus or minus the amplitude: <Katex tex="1\pm2" />.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="2\sin(3x) + 1 = 0 \implies \sin(3x) = -\frac{1}{2}" />,
    reason: <>Isolate the sine.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}3x = -\frac{\pi}{6} + 2k\pi \quad\text{or} \\ 3x = \pi + \frac{\pi}{6} + 2k\pi = \frac{7\pi}{6} + 2k\pi\end{gathered}" />,
    reason: <><Katex tex="\sin\tfrac{\pi}{6}=\tfrac12" />, so the reference angle is <Katex tex="\tfrac{\pi}{6}" />. Sine is negative in the third and fourth quadrants: <Katex tex="\pi+\tfrac{\pi}{6}" /> and <Katex tex="-\tfrac{\pi}{6}" />. Adding any whole number of turns <Katex tex="2k\pi" /> gives every solution.</>,
  },
  {
    working: <Katex display tex="x = -\frac{\pi}{18} + \frac{2k\pi}{3} \quad\text{or}\quad x = \frac{7\pi}{18} + \frac{2k\pi}{3}" />,
    reason: <>Divide everything by 3, <em>including</em> the <Katex tex="2k\pi" />: the solutions repeat every period, <Katex tex="\tfrac{2\pi}{3}" />, not every <Katex tex="2\pi" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{gathered}x = \frac{\pi(12k-1)}{18} \ \text{ or} \\ x = \frac{\pi(12k+7)}{18}, \quad k \in Z\end{gathered}}" />,
    reason: <>The general solution must say what <Katex tex="k" /> is: an integer.</>,
    more: <>Check <Katex tex="k=0" />, <Katex tex="x=-\tfrac{\pi}{18}" />: <Katex tex="2\sin\left(-\tfrac{\pi}{6}\right)+1=-1+1=0" />.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\left[-\frac{10\pi}{3},\ -\frac{5\pi}{3}\right] = \left[-\frac{60\pi}{18},\ -\frac{30\pi}{18}\right]" />,
    reason: <>Write the interval over 18 to compare it with the solutions from part c.i.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}-60 \le 12k - 1 \le -30 \implies k = -4,\ -3 \\ x = -\frac{49\pi}{18},\ -\frac{37\pi}{18}\end{gathered}" />,
    reason: <>The first family: <Katex tex="12k" /> must lie between <Katex tex="-59" /> and <Katex tex="-29" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}-60 \le 12k + 7 \le -30 \implies k = -5,\ -4 \\ x = -\frac{53\pi}{18},\ -\frac{41\pi}{18}\end{gathered}" />,
    reason: <>The second family: <Katex tex="12k" /> between <Katex tex="-67" /> and <Katex tex="-37" />.</>,
    more: <>On CAS: <Cas fn="solve">solve(2sin(3x) + 1 = 0, x) | −10π/3 ≤ x ≤ −5π/3</Cas></>,
  },
  {
    working: <Katex display tex="-\frac{53\pi}{18} - \frac{49\pi}{18} - \frac{41\pi}{18} - \frac{37\pi}{18} = -\frac{180\pi}{18}" />,
    reason: <>Add the four solutions found above, two from each family. (The interval is <Katex tex="\tfrac{5\pi}{3}" /> long, two and a half periods, and <Katex tex="f(x)=0" /> has two solutions in each full period, so four is the expected count.)</>,
  },
  {
    working: <Katex display tex="\boxed{-10\pi}" />,
    reason: <>The sum of all four solutions.</>,
    more: (
      <>
        Symmetry check: the solutions come in pairs either side of a minimum of <Katex tex="f" />,
        at <Katex tex="-\tfrac{17\pi}{6}" /> and <Katex tex="-\tfrac{13\pi}{6}" /> (dashed). Each pair
        adds to twice its minimum, so the sum is{' '}
        <Katex tex="2\left(-\tfrac{17\pi}{6}\right)+2\left(-\tfrac{13\pi}{6}\right)=-10\pi" />.
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit mt-2">
          <img loading="lazy" decoding="async"
            src={rootsSrc}
            alt="This site's own graph of y = 2sin(3x) + 1 from x = −10π/3 to −5π/3, crossing the x-axis at −53π/18, −49π/18, −41π/18 and −37π/18, with dashed vertical lines at the minimum points x = −17π/6 and −13π/6 halfway between each pair — not from the VCAA paper"
            className="w-full max-w-[480px]"
          />
        </div>
      </>
    ),
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} g(a) &= \int_0^a 2\sin(3x)\,dx = \left[-\frac{2}{3}\cos(3x)\right]_0^a \\ &= \frac{2}{3}\big(1 - \cos(3a)\big)\end{aligned}" />,
    reason: <><Katex tex="f(x)-1=2\sin(3x)" />. Antidifferentiating confirms the given rule, written so that its size depends only on <Katex tex="\cos(3a)" />.</>,
  },
  {
    working: <Katex display tex="a \in \left[0,\ \frac{\pi}{2}\right] \implies 3a \in \left[0,\ \frac{3\pi}{2}\right]" />,
    reason: <><Katex tex="g" /> is largest when <Katex tex="\cos(3a)" /> is smallest, so find where in this range the cosine reaches <Katex tex="-1" />.</>,
  },
  {
    working: <Katex display tex="\cos(3a) = -1 \implies 3a = \pi \implies a = \frac{\pi}{3}" />,
    reason: <><Katex tex="\pi" /> is the only angle in <Katex tex="\left[0,\tfrac{3\pi}{2}\right]" /> with cosine <Katex tex="-1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{g_{\max} = \frac{2}{3}(1+1) = \frac{4}{3}, \ \text{ at } a = \frac{\pi}{3}}" />,
    reason: <>Area view: <Katex tex="2\sin(3x)" /> is positive on <Katex tex="\left(0,\tfrac{\pi}{3}\right)" /> and negative after, so the area accumulates up to <Katex tex="\tfrac{\pi}{3}" /> and then starts being cancelled.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="\cos(3a) = 1 \implies 3a = 0 \implies a = 0" />,
    reason: <><Katex tex="g" /> is smallest when <Katex tex="\cos(3a)" /> is largest, 1. The only angle in <Katex tex="\left[0,\tfrac{3\pi}{2}\right]" /> with cosine 1 is 0.</>,
  },
  {
    working: <Katex display tex="\boxed{g_{\min} = \frac{2}{3}(1-1) = 0, \ \text{ at } a = 0}" />,
    reason: <>The integral over an interval of zero width is 0.</>,
    more: <>Check the other end: <Katex tex="g\left(\tfrac{\pi}{2}\right)=\tfrac23\left(1-\cos\tfrac{3\pi}{2}\right)=\tfrac23>0" />. The negative area after <Katex tex="\tfrac{\pi}{3}" /> cancels only half of the positive area, so <Katex tex="g" /> never drops below 0 on this domain.</>,
  },
]

const ROWS_DIII: WorkingRow[] = [
  {
    working: <Katex display tex="\int_a^{\frac{\pi}{2}} 2\sin(3x)\,dx = \left[-\frac{2}{3}\cos(3x)\right]_a^{\frac{\pi}{2}} = \frac{2}{3}\cos(3a)" />,
    reason: <><Katex tex="\cos\tfrac{3\pi}{2}=0" />, so only the lower terminal contributes.</>,
  },
  {
    working: <Katex display tex="\frac{1}{a} \times \frac{2}{3}\big(1 - \cos(3a)\big) = \frac{1}{\frac{\pi}{2} - a} \times \frac{2}{3}\cos(3a)" />,
    reason: <>Substitute both integrals. Each side is an average value of <Katex tex="f(x)-1" />: over <Katex tex="[0,a]" /> on the left and over <Katex tex="\left[a,\tfrac{\pi}{2}\right]" /> on the right.</>,
    more: <>Cross-multiplying and cancelling <Katex tex="a\cos(3a)" /> simplifies it to <Katex tex="\cos(3a)=1-\tfrac{2a}{\pi}" />, a cosine against a straight line, which has no algebraic solution.</>,
  },
  {
    working: <Cas fn="solve">solve(1/a × g(a) = 1/(π/2 − a) × 2/3·cos(3a), a) | 0 &lt; a &lt; π/2</Cas>,
    reason: <>Restrict to the open interval: <Katex tex="a=0" /> and <Katex tex="a=\tfrac{\pi}{2}" /> make a denominator zero.</>,
  },
  {
    working: <Katex display tex="\boxed{a \approx 0.144}" />,
    reason: <><Katex tex="a=0.14368\ldots" />, correct to three decimal places. It is the only solution in <Katex tex="\left(0,\tfrac{\pi}{2}\right)" />.</>,
    more: <>Check in the simplified form: <Katex tex="\cos(0.4310\ldots)=0.9085\ldots" /> and <Katex tex="1-\tfrac{2(0.14368)}{\pi}=0.9085\ldots" />.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="f\left(x - \frac{k\pi}{3}\right) - 1 = 2\sin\left(3x - k\pi\right)" />,
    reason: <>Replace <Katex tex="x" /> by <Katex tex="x-\tfrac{k\pi}{3}" /> inside <Katex tex="\sin(3x)" />: <Katex tex="3\left(x-\tfrac{k\pi}{3}\right)=3x-k\pi" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} h(a) &= \left[-\frac{2}{3}\cos(3x - k\pi)\right]_0^a \\ &= \frac{2}{3}\Big(\cos(k\pi) - \cos(3a - k\pi)\Big)\end{aligned}" />,
    reason: <>Antidifferentiate as in part d.i.; at the lower terminal <Katex tex="\cos(-k\pi)=\cos(k\pi)" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}h(a) = \frac{4}{3} \iff \cos(k\pi) = 1 \\ \text{and } \cos(3a - k\pi) = -1\end{gathered}" />,
    reason: <>Each cosine lies between <Katex tex="-1" /> and 1, so the bracket is at most 2, and <Katex tex="h(a)=\tfrac23\times2" /> only when the first cosine is 1 and the second is <Katex tex="-1" /> at the same time.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}\cos(k\pi) = 1 \iff k \text{ is an even integer} \\ \text{then } \cos(3a) = -1 \text{ at } a = \frac{\pi}{3} \in \left[0,\ \frac{\pi}{2}\right]\end{gathered}" />,
    reason: <>Cosine is 1 only at whole turns, <Katex tex="k\pi = 0,\ \pm 2\pi,\ \pm 4\pi,\ \ldots" />, so <Katex tex="k" /> must be an even integer. Then <Katex tex="\cos(3a-k\pi)=\cos(3a)" />, which is <Katex tex="-1" /> at <Katex tex="a=\tfrac{\pi}{3}" />, inside the domain, as in part d.i.</>,
  },
  {
    working: <Katex display tex="\boxed{k = 2n, \quad n \in Z^+}" />,
    reason: <>Even and positive, since <Katex tex="k>0" />.</>,
    more: <>Why this makes sense: the period of <Katex tex="f" /> is <Katex tex="\tfrac{2\pi}{3}" />, so <Katex tex="f\left(x-\tfrac{2n\pi}{3}\right)" /> translates the graph a whole number of periods and lands it back on itself. Then <Katex tex="h" /> is exactly <Katex tex="g" />, whose maximum is <Katex tex="\tfrac43" /> (part d.i.). Any other translation starts the integral at a different point of the wave, and it never accumulates as much.</>,
  },
]

export default function MethodsQ5_2023NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (10 marks)</p>
        <p>
          Let <Katex tex="f(x)=2\sin(3x)+1" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              <Katex tex="f(x)=2\sin(3x)+1" /> has amplitude 2, period{' '}
              <Katex tex="\tfrac{2\pi}{3}" /> and centre line <Katex tex="y=1" />. Subtracting 1
              (parts d. and e.) moves the centre line back to the <Katex tex="x" />-axis, so{' '}
              <Katex tex="g(a)" /> is the signed area under <Katex tex="2\sin(3x)" /> from 0 to{' '}
              <Katex tex="a" />: it grows while the wave is above the axis and shrinks while it is
              below.
            </p>
            <p>
              Dividing an integral by the width of its interval gives an average value, which is
              what both sides of the equation in d.iii. are.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard letter="a" topic="Amplitude" marks={1} statement={<>State the amplitude of <Katex tex="f" />.</>}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" topic="Range" marks={1} statement={<>Find the range of <Katex tex="f" />.</>}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c.i"
        topic="General Solution"
        marks={1}
        statement={<>Give the general solution for <Katex tex="f(x)=0" />.</>}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Sum of Solutions"
        marks={1}
        statement={
          <>
            Calculate the sum of solutions for <Katex tex="f(x)=0" />, where{' '}
            <Katex tex="x\in\left[-\dfrac{10\pi}{3},\ -\dfrac{5\pi}{3}\right]" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Let the definite integral <Katex tex="g(a)=\displaystyle\int_0^a\big(f(x)-1\big)\,dx" /> where{' '}
          <Katex tex="a\in\left[0,\ \dfrac{\pi}{2}\right]" /> be given by{' '}
          <Katex tex="g(a)=\dfrac{-2\big(\cos(3a)-1\big)}{3}" />.
        </p>
      </div>

      <PartCard
        letter="d.i"
        topic="Maximum"
        marks={2}
        statement={<>Find the maximum value of <Katex tex="g" /> and the value of <Katex tex="a" /> for which this occurs.</>}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Minimum"
        marks={2}
        statement={<>Find the minimum value of <Katex tex="g" /> and the value of <Katex tex="a" /> for which this occurs.</>}
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>

      <PartCard
        letter="d.iii"
        topic="Average Value"
        marks={1}
        statement={
          <>
            Find the value of <Katex tex="a" />, such that{' '}
            <Katex tex="\dfrac{1}{a}\times g(a)=\dfrac{1}{\frac{\pi}{2}-a}\times\displaystyle\int_a^{\frac{\pi}{2}}\big(f(x)-1\big)\,dx" />.
            Give your answer correct to three decimal places.
          </>
        }
      >
        <WorkingTable rows={ROWS_DIII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Let <Katex tex="h(a)=\displaystyle\int_0^a\left(f\left(x-\frac{k\pi}{3}\right)-1\right)dx" />,
          where <Katex tex="k>0" /> and <Katex tex="a\in\left[0,\ \dfrac{\pi}{2}\right]" />.
        </p>
      </div>

      <PartCard
        letter="e"
        topic="Horizontal Translation"
        marks={1}
        statement={
          <>
            Give the values of <Katex tex="k>0" />, given that <Katex tex="h(a)=\dfrac{4}{3}" /> for
            some value of <Katex tex="a" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>
    </div>
  )
}
