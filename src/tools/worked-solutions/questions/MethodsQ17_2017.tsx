// 2017 Mathematical Methods — Exam 2, MCQ 17. VCAA examination report: 21% correct —
// the hardest MCQ on this paper.
// Express the total area under an even function's graph, over 4 x-intercepts, as a single
// integral expression. Question text transcribed from the original paper; the diagram is the
// actual VCAA figure (cropped from the official exam PDF), not a redrawing. Solution is
// original.
// Interactive: "Green adds area, red takes it away" (interactives/meth-2017-mcq17-signs.tsx) — pick
// an option and every piece it integrates over is shaded by whether it adds or subtracts area, in
// units of A₁ (each hump) and A₂ (the dip); only D totals 2A₁ + A₂. WrongMethod boxes for B (37%)
// and C (21%), both verified to equal the signed integral 2A₁ − A₂.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import evenFunctionSrc from './meth-2017-mcq17-even-function.png'

const SignsWidget = lazyWidget(() => import('../interactives/meth-2017-mcq17-signs'))

const DIAGRAM = (
  <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
    <img loading="lazy" decoding="async" src={evenFunctionSrc} alt="Graph of an even function f with x-intercepts at a, b, c, d, symmetric about the y-axis, from the original 2017 VCAA exam paper" className="w-full max-w-[340px]" />
  </div>
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 37, C: 21, D: 21, E: 17 },
  answer: 'D',
  noAnswer: 0,
  comment: (
    <>
      <Katex tex="\text{Area}=\int_a^b f(x)\,dx-\int_b^c f(x)\,dx+\int_c^d f(x)\,dx" />
      <br />
      <Katex tex="=2\int_a^b f(x)\,dx-\int_b^c f(x)\,dx" />
      <br />
      <Katex tex="=2\int_a^b f(x)\,dx-2\int_b^{b+c} f(x)\,dx" />, as <Katex tex="b+c=0" />, since{' '}
      <Katex tex="f(-x)=f(x)" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="a=-d, \qquad b=-c" />,
    reason: (
      <>
        <Katex tex="f(-x)=f(x)" /> means the graph is symmetric about the <Katex tex="y" />-axis, so the intercepts pair
        up. In particular <Katex tex="b+c=0" />: that is the odd-looking upper limit in option D.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} \text{Area} &= \int_a^b f(x)\,dx - \int_b^c f(x)\,dx \\ &\quad + \int_c^d f(x)\,dx \end{aligned}"
      />
    ),
    reason: (
      <>
        Split at each <Katex tex="x" />-intercept. The dip on <Katex tex="(b,c)" /> is below the axis, so its integral is
        negative; the minus in front makes it a positive area.
      </>
    ),
    more: (
      <>
        The intercepts are where <Katex tex="f" /> changes sign, so each piece is entirely above or entirely below the
        axis. The two humps are above it, so their integrals are already positive and need no sign change.
      </>
    ),
  },
  {
    working: <Katex display tex="\int_c^d f(x)\,dx = \int_a^b f(x)\,dx" />,
    reason: (
      <>
        <Katex tex="[c,d]=[-b,-a]" /> is the mirror image of <Katex tex="[a,b]" />, so the two humps have the same area.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{Area} = 2\int_a^b f(x)\,dx - \int_b^c f(x)\,dx" />,
    reason: <>Combine the two equal humps. No option looks like this yet, so the dip must be rewritten too.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \int_b^c f(x)\,dx &= 2\int_b^{0} f(x)\,dx \\ &= 2\int_b^{b+c} f(x)\,dx \end{aligned}" />,
    reason: (
      <>
        The dip runs from <Katex tex="b" /> to <Katex tex="c=-b" />, so by symmetry it is twice its left half{' '}
        <Katex tex="[b,0]" />. Then write <Katex tex="0" /> as <Katex tex="b+c" /> to match option D.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\text{Area} = 2\int_a^b f(x)\,dx - 2\int_b^{b+c} f(x)\,dx}" />,
    reason: (
      <>
        Matches option <b>D</b>, where every piece counts as positive area.
      </>
    ),
    more: (
      <>
        Call each hump&apos;s area <Katex tex="A_1" /> and the dip&apos;s area <Katex tex="A_2" />, so the answer is{' '}
        <Katex tex="2A_1+A_2" />. A, B (37%) and C (21%) all equal the signed integral <Katex tex="2A_1-A_2" />: they count
        the dip as negative. E handles the dip correctly (<Katex tex="\int_c^b f(x)\,dx=A_2" />) but also reverses the
        bounds on the right hump, which is above the axis, so that hump becomes <Katex tex="-A_1" /> and cancels the left
        one: E <Katex tex="=A_2" />.
      </>
    ),
  },
]

export default function MethodsQ17_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-3">
            The graph of a function <Katex tex="f" />, where <Katex tex="f(-x)=f(x)" />, is shown below.
          </p>
          {DIAGRAM}
          <p className="mt-3">
            The graph has <Katex tex="x" />-intercepts at <Katex tex="(a,0), (b,0), (c,0)" /> and{' '}
            <Katex tex="(d,0)" /> only.
          </p>
          <p className="mt-2">The area bound by the curve and the <Katex tex="x" />-axis on the interval <Katex tex="[a,d]" /> is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\displaystyle\int_a^d f(x)\,dx" /> },
        { letter: 'B', content: <Katex tex="\displaystyle\int_a^b f(x)\,dx - \int_c^b f(x)\,dx + \int_c^d f(x)\,dx" /> },
        { letter: 'C', content: <Katex tex="\displaystyle 2\int_a^b f(x)\,dx + \int_b^c f(x)\,dx" /> },
        { letter: 'D', content: <Katex tex="\displaystyle 2\int_a^b f(x)\,dx - 2\int_b^{b+c} f(x)\,dx" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\displaystyle\int_a^b f(x)\,dx + \int_c^b f(x)\,dx + \int_d^c f(x)\,dx" /> },
      ]}
      background={
        <Background title="Signed integral or area?">
          <p>
            <Katex tex="\int f(x)\,dx" /> adds up strips of height <Katex tex="f(x)" />, so strips below the axis count as
            negative. An <em>area</em> must count every piece as positive: split at the <Katex tex="x" />-intercepts, and for
            each piece below the axis either put a minus in front or reverse the bounds. Each of those flips the sign once,
            so use exactly one of them; doing both flips it back.
          </p>
          <p>
            If <Katex tex="f" /> is even, its graph is symmetric about the <Katex tex="y" />-axis, so
            mirror-image pieces have equal areas: <Katex tex="\int_{-k}^{0} f(x)\,dx=\int_0^k f(x)\,dx" />.
          </p>
        </Background>
      }
      rows={ROWS}
      extras={
        <>
          <Explore title="Green adds area, red takes it away: test each option">
            <SignsWidget />
          </Explore>
          <WrongMethod
            title="The middle bit is below the axis, so reverse its bounds and put a minus in front"
            source="37% chose B"
            working={
              <>
                <Katex display tex="-\int_c^b f(x)\,dx = \int_b^c f(x)\,dx" />
                <Katex display tex="\text{so B} = \int_a^d f(x)\,dx" />
              </>
            }
          >
            <p>
              Reversing the bounds flips the sign, and so does the minus. Doing both flips it back, so the dip is still
              counted as negative and B is just option A rewritten. For each piece below the axis use one flip only, then
              check: every integral in an area expression should come out positive.
            </p>
          </WrongMethod>
          <WrongMethod
            title="Double the left hump for symmetry, then add the middle integral"
            source="21% chose C"
            working={<Katex display tex="2\int_a^b f(x)\,dx+\int_b^c f(x)\,dx=\int_a^d f(x)\,dx" />}
          >
            <p>
              The symmetry step is right, but on <Katex tex="(b,c)" /> the curve is below the axis, so{' '}
              <Katex tex="\int_b^c f(x)\,dx" /> is negative and adding it <em>subtracts</em> the dip&apos;s area. C is the
              signed integral again. Look at the graph for each piece: below the axis needs a minus.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
