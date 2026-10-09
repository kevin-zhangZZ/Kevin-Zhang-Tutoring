// 2020 Mathematical Methods — Exam 2, MCQ 9. VCAA examination report: 35% correct. Evaluating
// a definite integral of a dilated-and-translated function using a given base integral.
// Question text transcribed from the original paper. Solution is original.
// Answer E (5/2) agrees with the VCAA report (dilate by ½ from the y-axis, then translate 2 left)
// and itute (E, by the same halving). The working follows the report's transformation route, with
// an antiderivative check that uses only the chain rule: general substitution u = 2x + 4 (Mr Nie's
// video route, and this file's earlier working) is Specialist content, not Methods (§12.5), so it
// is only mentioned. Checked numerically in scipy with three different f, each with ∫₄⁸ f = 5: all
// give 5/2 for ∫₀² f(2(x + 2)) dx. Distractor B (10) is 5 × 2 instead of 5 ÷ 2; no clean slip was
// found for A (12), C (8) or D (½), so they are not attributed (§12.9).
// Interactive diagram (§15): interactives/meth-2020e2-mcq9-squash.tsx transforms one possible f
// (three to choose from) into y = f(a(x + b)): squashing by a halves the area at a = 2 while every
// point keeps its height, sliding by b moves the region onto [0, 2] without changing it, and a
// toggle shows the stretch that option B assumes. This site's own explanatory figure; VCAA printed
// no diagram for this question.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const SquashWidget = lazyWidget(() => import('../interactives/meth-2020e2-mcq9-squash'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 16, B: 17, C: 19, D: 12, E: 35 },
  answer: 'E',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="\displaystyle\int_4^8 f(x)\,dx = 5" />
      <br />
      Dilate by a factor of <Katex tex="\tfrac12" /> from the <Katex tex="y" />-axis.
      <br />
      <Katex tex="\displaystyle\int_2^4 f(2x)\,dx = \frac52" />
      <br />
      Translating 2 units to the left does not change the area.
      <br />
      <Katex tex="\displaystyle\int_0^2 f\bigl(2(x+2)\bigr)\,dx = \frac52" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\int_4^8 f(x)\,dx = 5" />,
    reason: <>This is all we know about <Katex tex="f" />: the signed area between <Katex tex="y=f(x)" /> and the <Katex tex="x" />-axis from <Katex tex="x=4" /> to <Katex tex="x=8" /> is 5. With no rule for <Katex tex="f" />, there is nothing to antidifferentiate, so the way in is to see <Katex tex="y=f\big(2(x+2)\big)" /> as a transformed copy of <Katex tex="y=f(x)" /> and follow what happens to that area.</>,
  },
  {
    working: <Katex display tex="y=f(x) \;\to\; y=f(2x)" />,
    reason: <>First the 2. It multiplies <Katex tex="x" />, so the new graph reaches every input twice as early: <Katex tex="f(2x)" /> takes the value <Katex tex="f(8)" /> at <Katex tex="x=4" />, not at <Katex tex="x=8" />. Each point <Katex tex="(x,\,y)" /> moves to <Katex tex="\left(\tfrac x2,\,y\right)" />, halfway to the <Katex tex="y" />-axis at the same height: a dilation by factor <Katex tex="\tfrac12" /> from the <Katex tex="y" />-axis.</>,
  },
  {
    working: (
      <>
        <Katex display tex="[4,\,8] \;\to\; [2,\,4]" />
        <Katex display tex="\int_2^4 f(2x)\,dx = \tfrac12\times5 = \tfrac52" />
      </>
    ),
    reason: <>Picture the area as thin vertical strips. Every strip keeps its height (the heights are the same values of <Katex tex="f" />), but its width is halved, so the total area is halved. The ends move to <Katex tex="\tfrac42=2" /> and <Katex tex="\tfrac82=4" />. This is the report&apos;s middle line.</>,
  },
  {
    working: <Katex display tex="y=f(2x) \;\to\; y=f\big(2(x+2)\big)" />,
    reason: <>Replacing <Katex tex="x" /> with <Katex tex="x+2" /> is a translation of 2 units in the negative <Katex tex="x" /> direction: the new graph does at <Katex tex="x" /> what the old one did at <Katex tex="x+2" />, two units further right.</>,
  },
  {
    working: (
      <>
        <Katex display tex="[2,\,4] \;\to\; [0,\,2]" />
        <Katex display tex="\int_0^2 f\big(2(x+2)\big)\,dx = \int_2^4 f(2x)\,dx = \tfrac52" />
      </>
    ),
    reason: <>A translation slides the region without changing its shape or size, so the area stays <Katex tex="\tfrac52" />. And <Katex tex="[2,4]" /> slides to <Katex tex="[0,2]" />, exactly the limits in the question. That is the check that the transformations were read correctly. (Reading it as <Katex tex="f(2x+4)" />, translate 4 left then dilate by <Katex tex="\tfrac12" />, also lands on <Katex tex="[0,2]" />. Either way there is one dilation by <Katex tex="\tfrac12" />, so the area is halved once.)</>,
  },
  {
    working: (
      <>
        <Katex display tex="F'=f:\quad \frac{d}{dx}\Big(\tfrac12F(2x+4)\Big)" />
        <Katex display tex="= \tfrac12\times2f(2x+4) = f(2x+4)" />
        <Katex display tex="\int_0^2 f(2x+4)\,dx = \Big[\tfrac12F(2x+4)\Big]_0^2" />
        <Katex display tex="= \tfrac12\big(F(8)-F(4)\big) = \tfrac12\times5" />
      </>
    ),
    reason: <>The same answer by algebra, using only the chain rule. Let <Katex tex="F" /> be an antiderivative of <Katex tex="f" />, so the given integral says <Katex tex="F(8)-F(4)=5" />. Differentiating <Katex tex="\tfrac12F(2x+4)" /> gives back <Katex tex="f(2x+4)" />: the <Katex tex="\tfrac12" /> cancels the 2 the chain rule brings out, exactly as when you antidifferentiate <Katex tex="(2x+4)^n" /> and divide by 2. Then substitute the terminals: <Katex tex="x=2" /> gives <Katex tex="F(8)" />, <Katex tex="x=0" /> gives <Katex tex="F(4)" />. (Specialist students will recognise the substitution <Katex tex="u=2x+4" />.)</>,
  },
  {
    working: <Katex display tex="\boxed{\int_0^2 f\big(2(x+2)\big)\,dx = \frac52}" />,
    reason: <>Matches option <b>E</b>. Sanity check: <Katex tex="[0,2]" /> is half as wide as <Katex tex="[4,8]" />, and on it <Katex tex="f\big(2(x+2)\big)" /> takes exactly the heights <Katex tex="f" /> takes on <Katex tex="[4,8]" />, so the area has to be half of 5. Option <b>B</b> (<Katex tex="10" />) is 5 multiplied by 2 instead of divided by 2, which is what reading the 2 as a stretch gives.</>,
    more: <>See the Common Mistake below.</>,
  },
]

export default function MethodsQ9_2020() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="\displaystyle\int_4^8 f(x)\,dx = 5" />, then{' '}
          <Katex tex="\displaystyle\int_0^2 f\big(2(x+2)\big)\,dx" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="12" /> },
        { letter: 'B', content: <Katex tex="10" /> },
        { letter: 'C', content: <Katex tex="8" /> },
        { letter: 'D', content: <Katex tex="\tfrac12" /> },
        { letter: 'E', content: <Katex tex="\tfrac52" />, isAnswer: true },
      ]}
      rows={ROWS}
      background={
        <Background title="What transformations do to an area">
          <p>
            A definite integral is a signed area, so an integral of a function you don&apos;t know can still be found if the new
            graph is a transformed copy of one whose area you do know. Two transformations matter here:
          </p>
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li>
              <b>A translation in the <Katex tex="x" /> direction</b>, <Katex tex="y=f(x+b)" />, slides the graph <Katex tex="b" /> units
              left. The region moves but its area doesn&apos;t change.
            </li>
            <li>
              <b>A dilation from the <Katex tex="y" />-axis</b>, <Katex tex="y=f(ax)" />, moves every point to <Katex tex="\tfrac1a" /> of its
              distance from the <Katex tex="y" />-axis, at the same height. Every width is multiplied by <Katex tex="\tfrac1a" /> and every
              height is kept, so the area is multiplied by <Katex tex="\tfrac1a" />. For <Katex tex="a=2" /> the graph is squashed to half
              its width and the area is halved.
            </li>
          </ul>
        </Background>
      }
      extras={
        <>
          <Explore title="Same heights, half the width: squashing by ½ halves the area, and sliding it onto [0, 2] changes nothing">
            <SquashWidget />
          </Explore>
          <WrongMethod
            title="The 2 in f(2x) stretches the graph, so the area doubles"
            source="17% chose B"
            working={
              <>
                <Katex display tex="y=f(2x):\ \text{dilate by factor 2}" />
                <Katex display tex="\text{area} = 2\times5 = 10 \quad \text{(option B)}" />
              </>
            }
          >
            <p>
              A number multiplying <Katex tex="x" /> inside the function squashes the graph, it doesn&apos;t stretch it. Test one point:{' '}
              <Katex tex="f(2x)" /> takes the input 8 when <Katex tex="x=4" />, so the right-hand end of the region moves <b>in</b> from 8 to 4,
              not out to 16. A stretch by factor 2 would be <Katex tex="y=f\left(\tfrac x2\right)" />, a different function.
            </p>
            <p>
              The question&apos;s own limits catch it: <Katex tex="[0,2]" /> is a window of width 2, half the width of <Katex tex="[4,8]" />.
              The same heights over half the width can&apos;t make twice the area.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
