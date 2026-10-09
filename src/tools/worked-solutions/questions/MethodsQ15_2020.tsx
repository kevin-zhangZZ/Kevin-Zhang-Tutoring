// 2020 Mathematical Methods — Exam 2, MCQ 15. VCAA examination report: 32% correct. Average
// value of a piecewise-linear V-shaped function over a given interval. Question text
// transcribed from the original paper; the diagram is cropped directly from the original
// VCAA exam PDF, not a redrawing. Solution is original.
// Answer B checked with sympy: ∫ over [−2a, 0] of (−3x/2 − a) = a², ∫ over [0, a] of (2x − a) = 0,
// average a²/(3a) = a/3; the signed triangles +4a²/3 − 7a²/12 + a²/4 also give a² (itute's route
// lifts the graph by a instead: 3a² + a² − 3a² = a²). Agrees with the VCAA report and itute.
// Distractors verified: C = a/2 is the midpoint of the range, (2a + (−a))/2; E = a²/a; A = 0 is the
// integral (and average) of the right-hand piece alone. No clean slip lands exactly on D (3a/4),
// so it is not attributed. Interactive diagram (§15): interactives/meth-2020e2-mcq15-balance.tsx
// slides a level line y = h across the graph and shades the area above it against the area below
// it; they balance only at h = a/3. This site's own explanatory figure, a different view from
// VCAA's printed graph (which is still shown, cropped, in the stem).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import diagramSrc from './meth-2020-mcq15-piecewise-v.png'

const BalanceWidget = lazyWidget(() => import('../interactives/meth-2020e2-mcq15-balance'))

const DIAGRAM = <img src={diagramSrc} alt="Piecewise-linear V-shaped graph of f through (-2a, 2a), (0, -a) and (a, a), from the original 2020 VCAA exam paper" className="w-full max-w-[280px]" />

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 32, C: 28, D: 27, E: 8 },
  answer: 'B',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="\text{The average value} = \dfrac{1}{a-(-2a)}\displaystyle\int_{-2a}^{a}f(x)\,dx" />
      <br />
      <Katex tex="= \dfrac{1}{3a}\left(\displaystyle\int_{-2a}^0\left(-\tfrac32x-a\right)dx + \int_0^a(2x-a)\,dx\right)" />
      <br />
      <Katex tex="= \dfrac{a}{3}" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\text{Average} = \frac{1}{a-(-2a)}\int_{-2a}^{a}f(x)\,dx" />
        <Katex display tex="= \frac{1}{3a}\int_{-2a}^{a}f(x)\,dx" />
      </>
    ),
    reason: <>Start from the definition: the signed area under the graph, shared out over the width of the interval. The width is <Katex tex="a-(-2a)=3a" />.</>,
    more: <>See the Background above for the definition.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{Left: } (-2a,2a) \text{ to } (0,-a)" />
        <Katex display tex="\text{gradient} = \frac{-a-2a}{0-(-2a)} = -\tfrac32" />
      </>
    ),
    reason: <>The graph is two straight pieces joined at the corner <Katex tex="(0,-a)" />, so the integral splits at <Katex tex="x=0" /> and each piece needs its own rule. Get each gradient from rise over run between the labelled points.</>,
  },
  {
    working: <Katex display tex="y = -\tfrac32x - a,\quad x\in[-2a,0]" />,
    reason: <>Both pieces pass through <Katex tex="(0,-a)" />, so the <Katex tex="y" />-intercept is <Katex tex="-a" />. Check the other end: <Katex tex="-\tfrac32(-2a)-a=3a-a=2a" /> ✓.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{Right: } (0,-a) \text{ to } (a,a)" />
        <Katex display tex="\text{gradient} = \frac{a-(-a)}{a-0} = 2" />
      </>
    ),
    reason: <>Rise <Katex tex="2a" /> over run <Katex tex="a" />.</>,
  },
  {
    working: <Katex display tex="y = 2x-a,\quad x\in[0,a]" />,
    reason: <>Same <Katex tex="y" />-intercept, <Katex tex="-a" />. Check: <Katex tex="2a-a=a" /> ✓.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\int_{-2a}^0\left(-\tfrac32x-a\right)dx = \Big[-\tfrac34x^2-ax\Big]_{-2a}^0" />
        <Katex display tex="= 0-(-3a^2+2a^2) = a^2" />
      </>
    ),
    reason: <>Antidifferentiate, then substitute the terminals. At <Katex tex="x=-2a" />: <Katex tex="-\tfrac34(4a^2)-a(-2a)=-3a^2+2a^2=-a^2" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\int_0^a(2x-a)\,dx = \Big[x^2-ax\Big]_0^a" />
        <Katex display tex="= (a^2-a^2)-0 = 0" />
      </>
    ),
    reason: <>Zero is right, not a slip. This piece is below the axis from <Katex tex="0" /> to <Katex tex="\tfrac a2" /> and above it from <Katex tex="\tfrac a2" /> to <Katex tex="a" />, two triangles of area <Katex tex="\tfrac{a^2}{4}" /> each, and an integral counts area below the axis as negative, so they cancel.</>,
  },
  {
    working: <Katex display tex="\text{Average} = \frac{1}{3a}\big(a^2+0\big) = \frac{a^2}{3a}" />,
    reason: <>Divide the total by the width of the <em>whole</em> interval, <Katex tex="3a" />. (Quicker, with no rules needed: <Katex tex="f" /> crosses the axis at <Katex tex="x=-\tfrac{2a}{3}" /> and <Katex tex="x=\tfrac a2" />, so the signed area is three triangles, <Katex tex="\tfrac{4a^2}{3}-\tfrac{7a^2}{12}+\tfrac{a^2}{4}=a^2" />.)</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{a}{3}}" />,
    reason: <>Matches option <b>B</b>. Sanity check: <Katex tex="f" /> runs from <Katex tex="-a" /> to <Katex tex="2a" /> but spends most of the interval low down, so its average should sit below the middle of that range, <Katex tex="\tfrac a2" />, and <Katex tex="\tfrac a3" /> does. Option <b>C</b>, <Katex tex="\tfrac a2" />, is exactly that middle. Option <b>E</b> divides <Katex tex="a^2" /> by <Katex tex="a" /> instead of by the width <Katex tex="3a" />, and option <b>A</b> is the integral of the right-hand piece alone.</>,
    more: <>See the Common Mistake below.</>,
  },
]

export default function MethodsQ15_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Part of the graph of a function <Katex tex="f" />, where <Katex tex="a>0" />, is shown below.
          </p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">{DIAGRAM}</div>
          <p>
            The average value of the function <Katex tex="f" /> over the interval <Katex tex="[-2a,a]" /> is
          </p>
        </>
      }
      background={
        <Background title="What the average value of a function means">
          <p>
            The average value of <Katex tex="f" /> over <Katex tex="[p,q]" /> is
          </p>
          <Katex display tex="\frac{1}{q-p}\int_p^q f(x)\,dx," />
          <p>
            the height of the rectangle on <Katex tex="[p,q]" /> with the same signed area as the graph. Picture the graph as a
            heap of sand between <Katex tex="x=p" /> and <Katex tex="x=q" />: flatten it, pushing the peaks into the dips, and the
            level it settles at is the average value. At that level, the area of the graph above the line balances the area below it.
          </p>
          <p>
            Areas below the <Katex tex="x" />-axis count as negative, because the integral does. The average value is not halfway
            between the highest and lowest points, and not the average of the endpoint values.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="0" /> },
        { letter: 'B', content: <Katex tex="\tfrac{a}{3}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\tfrac{a}{2}" /> },
        { letter: 'D', content: <Katex tex="\tfrac{3a}{4}" /> },
        { letter: 'E', content: <Katex tex="a" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="The average value is the level that balances the graph: area above the line = area below it">
            <BalanceWidget />
          </Explore>
          <WrongMethod
            title="The average is halfway between the highest and lowest values"
            source="28% chose C"
            working={<Katex display tex="\frac{2a+(-a)}{2} = \frac{a}{2} \quad \text{(option C)}" />}
          >
            <p>
              That is the middle of the <em>range</em>, and it equals the average value only for special shapes, such as a
              straight line or a sine wave over whole periods. This V spends most of the interval low down: it is below{' '}
              <Katex tex="\tfrac a2" /> for everything between <Katex tex="x=-a" /> and <Katex tex="x=\tfrac{3a}{4}" />, more than
              half of the width <Katex tex="3a" />. So its average is lower. In the diagram above, press C: the area below the line
              is <Katex tex="\tfrac{21a^2}{16}" /> against <Katex tex="\tfrac{13a^2}{16}" /> above, nowhere near balanced.
            </p>
            <p>An average value always comes from an integral: signed area divided by width.</p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
