// 2020 Specialist Mathematics — Exam 2, MCQ 3. VCAA examination report: 68% correct. A
// piecewise velocity function read off a three-stage train journey. Question text
// transcribed from the original paper. Solution is original.
// Answer A checked with sympy (pieces t/3, 10, (260 − t)/3 join continuously; distance
// 2300 m), against the VCAA report (no comment printed for this question) and itute (A, by the
// two-point form through (230, 10) and (260, 0)). Distractors checked: B's last piece (230 − t)/3
// is −⅓(t − 230), the braking gradient through (230, 0), giving 0 at t = 230 and −10 at t = 260;
// C and D use 3t (90 m/s at t = 30); E ends the cruise at t = 200. Sept 2026 review: the gradient
// reason used to say C and D "would reach 300 m s⁻¹ in 30 seconds" — 3 × 30 = 90; corrected.
// Interactive diagram (§15): interactives/spec-2020-mcq3-journey.tsx draws the v–t graph of the
// story (brackets 30 s | 200 s | 30 s), runs a time cursor along it giving each piece's rule, and
// lays any option over it. This site's own explanatory figure; VCAA printed no diagram.
// WrongMethod box for option B (20%).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const JourneyWidget = lazyWidget(() => import('../interactives/spec-2020-mcq3-journey'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 68, B: 20, C: 4, D: 5, E: 2 },
  answer: 'A',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="0\le t\le30: \ v \text{ rises from } 0 \text{ to } 10" />,
    reason: <>Sketch the velocity–time graph from the story before looking at the options: up from rest to 10&nbsp;m&nbsp;s<sup>−1</sup>, flat, then down to 0. Constant acceleration means a constant gradient, so each phase is a straight line.</>,
    more: <>The diagram below draws it.</>,
  },
  {
    working: <Katex display tex="v = \frac{10}{30}t = \frac{t}{3}" />,
    reason: <>Gradient is rise over run: 10&nbsp;m&nbsp;s<sup>−1</sup> gained over 30 s is <Katex tex="\tfrac{10}{30}" />, not <Katex tex="\tfrac{30}{10}" />. Options C and D invert it, and <Katex tex="3t" /> would already be 90&nbsp;m&nbsp;s<sup>−1</sup> at <Katex tex="t=30" />. The line starts at the origin (at rest when <Katex tex="t=0" />), so there is no constant term.</>,
  },
  {
    working: <Katex display tex="30<t\le230: \ v = 10" />,
    reason: <>The 200 seconds is how long the cruise <em>lasts</em>, not when it ends. It starts at <Katex tex="t=30" />, so it ends at <Katex tex="30+200=230" />. Option E ends it at 200.</>,
  },
  {
    working: <Katex display tex="230<t\le260: \ v \text{ falls from } 10 \text{ to } 0" />,
    reason: <>The whole trip is 260 seconds, so braking takes the last <Katex tex="260-230=30" />.</>,
  },
  {
    working: <Katex display tex="\text{gradient} = \frac{0-10}{260-230} = -\frac13" />,
    reason: <>Constant (negative) acceleration: a straight line from <Katex tex="(230,10)" /> down to <Katex tex="(260,0)" />. The gradient is negative because the train is slowing down.</>,
  },
  {
    working: <Katex display tex="v - 0 = -\tfrac13(t-260) \implies v = \tfrac13(260-t)" />,
    reason: <>Point–gradient form through <Katex tex="(260,0)" />, the moment the train stops, so the bracket is <Katex tex="260-t" />. Check the other end: <Katex tex="\tfrac13(260-230)=10" /> ✓. Option B uses <Katex tex="230-t" />, which is zero at <Katex tex="t=230" />, when the train is still doing 10&nbsp;m&nbsp;s<sup>−1</sup>, and negative for the whole braking phase.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{option A}}" />,
    reason: <>Matches option <b>A</b>. Option <b>B</b> has the braking piece through the wrong point, options <b>C</b> and <b>D</b> have the gradient <Katex tex="3" /> instead of <Katex tex="\tfrac13" />, and option <b>E</b> ends the cruise at 200 instead of 230. Check the joins: <Katex tex="\tfrac{30}{3}=10" /> ✓ and <Katex tex="\tfrac{260-230}{3}=10" /> ✓, so the velocity never jumps, as a real train&apos;s can&apos;t. The area under the graph, <Katex tex="\tfrac12(30)(10)+200(10)+\tfrac12(30)(10)=2300" /> m, is a sensible distance between two stations.</>,
  },
]

const A = (
  <Katex tex="v(t)=\begin{cases}\tfrac13t, & 0\le t\le30\\ 10, & 30<t\le230\\ \tfrac13(260-t), & 230<t\le260\end{cases}" />
)
const B = (
  <Katex tex="v(t)=\begin{cases}\tfrac13t, & 0\le t\le30\\ 10, & 30<t\le230\\ \tfrac13(230-t), & 230<t\le260\end{cases}" />
)
const C = (
  <Katex tex="v(t)=\begin{cases}3t, & 0\le t\le30\\ 10, & 30<t\le230\\ 3(230-t), & 230<t\le260\end{cases}" />
)
const D = (
  <Katex tex="v(t)=\begin{cases}3t, & 0\le t\le30\\ 10, & 30<t\le230\\ 3(260-t), & 230<t\le260\end{cases}" />
)
const E = (
  <Katex tex="v(t)=\begin{cases}\tfrac13t, & 0\le t\le30\\ 10, & 30<t\le200\\ \tfrac13(230-t), & 200<t\le230\end{cases}" />
)

export default function SpecialistQ3_2020() {
  return (
    <MCQShell
      question={
        <p>
          A train is travelling from Station A to Station B. The train starts from rest at
          Station A and travels with constant acceleration for 30 seconds until it reaches a
          velocity of <Katex tex="10\text{ m s}^{-1}" />. It then travels at this velocity
          for 200 seconds. The train then slows down, with constant acceleration, and stops
          at Station B having travelled for 260 seconds in total. Let{' '}
          <Katex tex="v\text{ m s}^{-1}" /> be the velocity of the train at time{' '}
          <Katex tex="t" /> seconds.
          <br />
          The velocity <Katex tex="v" /> as a function of{' '}
          <Katex tex="t" /> is given by
        </p>
      }
      options={[
        { letter: 'A', content: A, isAnswer: true },
        { letter: 'B', content: B },
        { letter: 'C', content: C },
        { letter: 'D', content: D },
        { letter: 'E', content: E },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="Draw the journey first, then lay each option over it">
            <JourneyWidget />
          </Explore>
          <WrongMethod
            title="The braking line has gradient −⅓ and starts at t = 230, so v = −⅓(t − 230)"
            source="20% chose B"
            working={<Katex display tex="v = -\tfrac13(t-230) = \tfrac13(230-t) \quad \text{(option B)}" />}
          >
            <p>
              Right gradient, wrong point. This line passes through <Katex tex="(230,0)" />, but at <Katex tex="t=230" /> the
              train is still doing 10&nbsp;m&nbsp;s<sup>−1</sup>: that is when braking <em>starts</em>. The point–gradient form needs
              a point that is actually on the line: <Katex tex="(230,10)" /> gives{' '}
              <Katex tex="v-10=-\tfrac13(t-230)" />, and <Katex tex="(260,0)" /> gives{' '}
              <Katex tex="v=-\tfrac13(t-260)" />. Both simplify to <Katex tex="\tfrac13(260-t)" />.
            </p>
            <p>
              Next time, check both ends of every piece. Option B gives <Katex tex="v(230)=0" /> and{' '}
              <Katex tex="v(260)=-10" />: a train reversing at 10&nbsp;m&nbsp;s<sup>−1</sup> when it should have stopped.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
