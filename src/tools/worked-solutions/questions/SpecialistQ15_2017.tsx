// 2017 Specialist Mathematics — Exam 2, MCQ 15. VCAA examination report: 71% correct.
// Constant velocity from two displacement vectors two seconds apart. Question text
// transcribed from the original paper; solution is original.
// Interactive (extras): spec-2017-mcq15-steps — the two-second displacement split into two equal
// one-second steps (each the velocity), the midpoint at t = 1 (option E), and what happens if the
// whole displacement −4i + 4j (option C) is used as the velocity. WrongMethod: forgetting to divide
// by the time (13% chose C). Distractors checked: C = r₂ − r₁, D = r₁ − r₂, A = r₁ + r₂,
// E = ½(r₁ + r₂). itute agrees (B).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const StepsWidget = lazyWidget(() => import('../interactives/spec-2017-mcq15-steps'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 71, C: 13, D: 7, E: 4 },
  answer: 'B',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{v} = \frac{\underset{\sim}{r}_2-\underset{\sim}{r}_1}{t_2-t_1}" />,
    reason: <>&ldquo;Constant velocity&rdquo; is the clue: the position changes by the same vector every second, so the velocity is the total change in position divided by the time it took, the vector version of a gradient. (If the velocity weren&apos;t constant, you&apos;d need to differentiate instead.)</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{r}_2-\underset{\sim}{r}_1 = \left(-\underset{\sim}{i}+5\underset{\sim}{j}\right)-\left(3\underset{\sim}{i}+\underset{\sim}{j}\right)" />,
    reason: <>Later minus earlier: where it ended up minus where it started. Getting the order backwards (and not dividing by the time) gives option D.</>,
  },
  {
    working: <Katex display tex="= -4\underset{\sim}{i}+4\underset{\sim}{j}" />,
    reason: <>Component by component: <Katex tex="-1-3=-4" /> and <Katex tex="5-1=4" />. This is the <em>displacement</em> over the two seconds, which is option C, the trap for anyone who forgets to divide.</>,
  },
  {
    working: <Katex display tex="\boxed{\underset{\sim}{v} = -2\underset{\sim}{i}+2\underset{\sim}{j}\ \text{m s}^{-1}}" />,
    reason: <>Matches option <b>B</b>, after dividing by the <Katex tex="2" /> seconds. Check: starting at <Katex tex="3\underset{\sim}{i}+\underset{\sim}{j}" /> and adding <Katex tex="2\underset{\sim}{v}" /> gives <Katex tex="-\underset{\sim}{i}+5\underset{\sim}{j}" /> ✓. Option E, <Katex tex="\underset{\sim}{i}+3\underset{\sim}{j}" />, is <Katex tex="\tfrac12\left(\underset{\sim}{r}_1+\underset{\sim}{r}_2\right)" />: the body&apos;s <em>position</em> at <Katex tex="t=1" />, not its velocity. Option A adds the two position vectors instead of subtracting them.</>,
  },
]

export default function SpecialistQ15_2017() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A body has displacement of{' '}
            <Katex tex="3\underset{\sim}{i}+\underset{\sim}{j}" /> metres at a particular
            time. The body moves with constant velocity and two seconds later its
            displacement is <Katex tex="-\underset{\sim}{i}+5\underset{\sim}{j}" /> metres.
          </p>
          <p>
            The velocity, in m s<Katex tex="^{-1}" />, of the body is
          </p>
        </>
      }
      background={
        <p>
          Velocity is the rate of change of position, <Katex tex="\underset{\sim}{v}=\dfrac{d\underset{\sim}{r}}{dt}" />.
          When the velocity is constant, the position changes by the same vector every second, so the body moves in a
          straight line and <Katex tex="\underset{\sim}{v}=\dfrac{\text{change in position}}{\text{time taken}}" />.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2\underset{\sim}{i}+6\underset{\sim}{j}" /> },
        { letter: 'B', content: <Katex tex="-2\underset{\sim}{i}+2\underset{\sim}{j}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="-4\underset{\sim}{i}+4\underset{\sim}{j}" /> },
        { letter: 'D', content: <Katex tex="4\underset{\sim}{i}-4\underset{\sim}{j}" /> },
        { letter: 'E', content: <Katex tex="\underset{\sim}{i}+3\underset{\sim}{j}" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="Constant velocity: the two-second displacement is two equal one-second steps">
            <StepsWidget />
          </Explore>
          <WrongMethod
            title="The velocity is the change in displacement, −4i + 4j"
            source="13% chose C"
            working={
              <Katex
                display
                tex="\underset{\sim}{r}_2-\underset{\sim}{r}_1=-4\underset{\sim}{i}+4\underset{\sim}{j} \quad \text{(option C)}"
              />
            }
          >
            <p>
              That is how far the body moved in <em>two</em> seconds. Velocity is displacement per second, so it has to
              be divided by the time taken. Two quick catches: the units (the answer is asked for in m s
              <Katex tex="^{-1}" />, but <Katex tex="-4\underset{\sim}{i}+4\underset{\sim}{j}" /> is in metres), and
              the check <Katex tex="\underset{\sim}{r}_1+2\left(-4\underset{\sim}{i}+4\underset{\sim}{j}\right)=-5\underset{\sim}{i}+9\underset{\sim}{j}" />,
              which is not where the body ends up.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
