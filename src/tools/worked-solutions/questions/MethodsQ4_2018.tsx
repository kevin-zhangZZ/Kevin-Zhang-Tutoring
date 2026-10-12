// 2018 Mathematical Methods — Exam 2, MCQ 4. VCAA examination report: 48% correct.
// Track a single point through the same transformation that maps f onto g.
// Question text transcribed from the original paper; solution is original. Answer C re-checked:
// (x, y) → (x + 1, ½y) sends A(3, 2) to (4, 1), and g(4) = ½f(3) = 1; itute and the report agree.
// Distractors checked: A (2, 1) is the shift taken left; D (4, 2) drops the dilation; E (4, 4)
// doubles instead of halving; B (2, 4) is the reverse transformation (g back to f).
// Interactive diagram (§15): interactives/meth-2018-mcq4-follow-point.tsx — slide x along g and
// watch each point of g copy f's height from one unit to the LEFT and halve it, so A(3, 2) lands
// at P(4, 1); a toggle draws the "move left" reading, ½f(x + 1), and shows (2, 1) is not on g.
// Report comment is verbatim incl. VCAA's "a factor of a ½" (the "a" was missing until 12 Oct 2026).
// f there is this site's example curve through A (the question gives no rule for f).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const FollowPoint = lazyWidget(() => import('../interactives/meth-2018-mcq4-follow-point'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 18, B: 11, C: 48, D: 13, E: 10 },
  answer: 'C',
  noAnswer: 0,
  comment: (
    <>
      <Katex tex="A(3,2),\ g(x)=\tfrac12 f(x-1)" />,
      <br />
      Dilate by a factor of a <Katex tex="\tfrac12" /> from the <Katex tex="x" />-axis: <Katex tex="(3,1)" />
      <br />
      Translate 1 unit to the right: <Katex tex="(4,1)" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = \frac12 f(x-1)" />,
    reason: <>Compare with <Katex tex="y=f(x)" />: the change <em>inside</em> the bracket acts on <Katex tex="x" />, and the <Katex tex="\tfrac12" /> <em>outside</em> acts on <Katex tex="y" />. Read each off separately.</>,
  },
  {
    working: (
      <>
        <Katex display tex="f(x-1): \text{translate 1 unit right}" />
        <Katex display tex="\tfrac12 f(\cdot): \text{dilate by factor } \tfrac12 \text{ from the } x\text{-axis}" />
      </>
    ),
    reason: <>The outside <Katex tex="\tfrac12" /> halves every <Katex tex="y" />-value. Inside: <Katex tex="g" /> at <Katex tex="x" /> uses <Katex tex="f" /> at <Katex tex="x-1" />, so what <Katex tex="f" /> does at <Katex tex="x=3" />, <Katex tex="g" /> does at <Katex tex="x=4" />: one unit <em>later</em>, a shift right.</>,
  },
  {
    working: <Katex display tex="(x,\,y) \to \left(x+1,\ \tfrac12 y\right)" />,
    reason: <>Write the transformation as a rule for points. Order doesn&apos;t matter here: one move acts only on <Katex tex="x" />, the other only on <Katex tex="y" />.</>,
  },
  {
    working: <Katex display tex="A(3,\,2) \to \left(3+1,\ \tfrac12\times 2\right) = (4,\,1)" />,
    reason: <>Push <Katex tex="A" /> through the rule, then check with <Katex tex="g" />&apos;s rule: <Katex tex="g(4)=\tfrac12 f(3)=\tfrac12\times2=1" />, so <Katex tex="(4,1)" /> is on <Katex tex="g" />.</>,
    more: <>This substitution check is the safest way to settle any left-or-right doubt.</>,
  },
  {
    working: <Katex display tex="\boxed{P = (4,\,1)}" />,
    reason: <>Matches option <b>C</b>.</>,
    more: <>Option A <Katex tex="(2,1)" /> shifts left instead of right. Option D <Katex tex="(4,2)" /> forgets the dilation, option E <Katex tex="(4,4)" /> doubles instead of halving, and option B <Katex tex="(2,4)" /> does both moves backwards (it is the transformation that maps <Katex tex="g" /> back onto <Katex tex="f" />).</>,
  },
]

export default function MethodsQ4_2018() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The point <Katex tex="A(3,2)" /> lies on the graph of the function <Katex tex="f" />. A
            transformation maps the graph of <Katex tex="f" /> to the graph of <Katex tex="g" />, where{' '}
            <Katex tex="g(x) = \dfrac12 f(x-1)" />. The same transformation maps the point <Katex tex="A" /> to
            the point <Katex tex="P" />.
          </p>
          <p>The coordinates of the point <Katex tex="P" /> are</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="(2,\,1)" /> },
        { letter: 'B', content: <Katex tex="(2,\,4)" /> },
        { letter: 'C', content: <Katex tex="(4,\,1)" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="(4,\,2)" /> },
        { letter: 'E', content: <Katex tex="(4,\,4)" /> },
      ]}
      rows={ROWS}
      background={
        <Background title="Moving a point, not just a graph">
          <p>
            If <Katex tex="y=f(x)" /> passes through <Katex tex="(a,\,b)" />, then <Katex tex="y=k\,f(x-h)" /> passes
            through <Katex tex="(a+h,\ kb)" />. A change <em>outside</em> <Katex tex="f" /> acts on <Katex tex="y" /> exactly
            as written: multiply by <Katex tex="k" />.
          </p>
          <p>
            A change <em>inside</em> acts on <Katex tex="x" /> in reverse. The new graph reaches the point of{' '}
            <Katex tex="f" /> at <Katex tex="x=a" /> when <Katex tex="x-h=a" />, that is at <Katex tex="x=a+h" />, so{' '}
            <Katex tex="x-h" /> moves the graph <Katex tex="h" /> units to the <em>right</em>.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="Why x − 1 moves every point right, not left">
            <FollowPoint />
          </Explore>
          <WrongMethod
            title="“x − 1” means move 1 unit left"
            source="18% chose A"
            working={<Katex display tex="A(3,2) \to \left(3-1,\ \tfrac12\times2\right) = (2,\,1) \quad \text{(option A)}" />}
          >
            <p>
              The minus sign inside the bracket moves the graph the <em>opposite</em> way. Substitution catches it: if{' '}
              <Katex tex="(2,1)" /> were on <Katex tex="g" />, then <Katex tex="g(2)=\tfrac12 f(1)" /> would have to be{' '}
              <Katex tex="1" />, but nothing is known about <Katex tex="f(1)" />, so <Katex tex="(2,1)" /> can&apos;t be justified.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
