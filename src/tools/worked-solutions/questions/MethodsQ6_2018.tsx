// 2018 Mathematical Methods — Exam 2, MCQ 6. VCAA examination report: 58% correct. A
// composite where g is given only as g(x+2), so its rule must be recovered first. Question
// text transcribed from the original paper; VCAA printed no diagram and neither does the stem
// here (guide §7). Answer checked with sympy (g(u) = 3(u − 2) + 1 = 3u − 5, f(g(x)) = 6x − 10);
// itute agrees (D). Solution is original. Distractor slips verified: E (6x + 2) is 2(3x + 1), taking
// g(x) = 3x + 1; A (6x − 5) is g(f(x)) = 3(2x) − 5; B (6x + 1) is both slips at once, 3(2x) + 1.
// Interactive diagram (§15): interactives/meth-2018-mcq6-shifted-input.tsx — slide x and plot the
// fact g(x + 2) = 3x + 1 as the point (x + 2, 3x + 1), two units right of the line y = 3x + 1;
// the points trace y = 3x − 5. A toggle shows the g(x) = 3x + 1 misreading is 6 too high.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const ShiftedInput = lazyWidget(() => import('../interactives/meth-2018-mcq6-shifted-input'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 10, C: 6, D: 58, E: 20 },
  answer: 'D',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="g(x+2) = 3x+1" />,
    reason: <>This is <em>not</em> the rule for <Katex tex="g" />. The input to <Katex tex="g" /> is <Katex tex="x+2" />, but the right-hand side is written in terms of <Katex tex="x" />, so the rule has to be extracted before it can be used. The warning sign is anything other than a single letter inside the bracket.</>,
  },
  {
    working: <Katex display tex="\text{Let } u = x+2 \implies x = u-2" />,
    reason: <>Give the input its own name, <Katex tex="u" />. Then express the old <Katex tex="x" /> in terms of <Katex tex="u" />, ready to substitute.</>,
  },
  {
    working: <Katex display tex="g(u) = 3(u-2)+1 = 3u-5" />,
    reason: <>Replace <Katex tex="x" /> by <Katex tex="u-2" /> on the right. Now both sides are in terms of the actual input of <Katex tex="g" />, and that is where the <Katex tex="-5" /> appears.</>,
  },
  {
    working: <Katex display tex="g(x) = 3x-5" />,
    reason: <>The name of the variable is irrelevant, so relabel back to <Katex tex="x" />. Sanity check: <Katex tex="g(x+2)=3(x+2)-5=3x+1" /> ✓, which is what was given. As graphs: <Katex tex="y=g(x+2)" /> is <Katex tex="y=g(x)" /> shifted 2 units left, so <Katex tex="g" /> is the line <Katex tex="y=3x+1" /> shifted 2 units right.</>,
  },
  {
    working: <Katex display tex="f(g(x)) = 2\bigl(g(x)\bigr) = 2(3x-5)" />,
    reason: <><Katex tex="f" /> doubles whatever it receives, and here it receives <Katex tex="g(x)" />. The inner function acts first.</>,
  },
  {
    working: <Katex display tex="\boxed{f(g(x)) = 6x-10}" />,
    reason: <>Matches option <b>D</b>. Option <b>E</b> <Katex tex="(6x+2)" />, chosen by <Katex tex="20\%" />, is what you get by treating <Katex tex="3x+1" /> as the rule for <Katex tex="g" /> itself and doubling it, skipping the substitution step entirely. Option <b>A</b> <Katex tex="(6x-5)" /> is <Katex tex="g(f(x))=3(2x)-5" />, the composition the wrong way round, and option <b>B</b> <Katex tex="(6x+1)" /> makes both slips at once: <Katex tex="3(2x)+1" />.</>,
  },
]

export default function MethodsQ6_2018() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="f" /> and <Katex tex="g" /> be two functions such that{' '}
          <Katex tex="f(x)=2x" /> and <Katex tex="g(x+2)=3x+1" />. The function{' '}
          <Katex tex="f(g(x))" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="6x-5" /> },
        { letter: 'B', content: <Katex tex="6x+1" /> },
        { letter: 'C', content: <Katex tex="6x^2+1" /> },
        { letter: 'D', content: <Katex tex="6x-10" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="6x+2" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="When a function is given at a shifted input">
          <p>
            <Katex tex="g(x+2)=3x+1" /> defines <Katex tex="g" /> indirectly. Reading it as
            "<Katex tex="g" /> of something is <Katex tex="3\times" /> that something{' '}
            <Katex tex="+1" />" is the trap — the <Katex tex="3x" /> on the right is written
            in terms of <Katex tex="x" />, not in terms of the input <Katex tex="x+2" />.
          </p>
          <p>
            Substituting <Katex tex="u=x+2" /> forces the right-hand side to be rewritten in
            terms of the actual input, and that is where the <Katex tex="-5" /> appears.
            Always check the recovered rule by feeding the original input back in.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="g(x + 2) = 3x + 1 is g's graph shifted 2 left">
            <ShiftedInput />
          </Explore>
          <WrongMethod
            title="g(x + 2) = 3x + 1, so g(x) = 3x + 1"
            source="20% chose E"
            working={<Katex display tex="f(g(x)) = 2(3x+1) = 6x+2 \quad \text{(option E)}" />}
          >
            <p>
              The <Katex tex="3x+1" /> is the output when the input is <Katex tex="x+2" />, not when it is <Katex tex="x" />.
              Feeding the input back in catches it: if <Katex tex="g(x)=3x+1" />, then{' '}
              <Katex tex="g(x+2)=3(x+2)+1=3x+7" />, not the <Katex tex="3x+1" /> the question gives. That wrong{' '}
              <Katex tex="g" /> is <Katex tex="6" /> too high everywhere, and <Katex tex="f" /> doubles the error to{' '}
              <Katex tex="12" />: <Katex tex="6x+2" /> instead of <Katex tex="6x-10" />.
            </p>
          </WrongMethod>
        </>
      }
    />
  )
}
