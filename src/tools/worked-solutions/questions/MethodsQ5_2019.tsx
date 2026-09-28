// 2019 Mathematical Methods — Exam 2, MCQ 5. VCAA examination report: 90% correct. Recovering
// f from its derivative and one function value. Question text transcribed from the original
// paper (no diagram). Solution is original. Interactive (interactives/meth-2019-mcq5-family): the
// family y = x³ − x² + c as one curve slid up and down, with the gap f(4) = 48 + c to the point
// (4, 0) closing only at c = −48. Distractors checked: A is c = 0 (f(4) = 48), B is c = +48
// (f(4) = 96), D is f''(x), and E is 6x + k fitted to f(4) = 0.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const FamilyWidget = lazyWidget(() => import('../interactives/meth-2019-mcq5-family'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 5, C: 90, D: 1, E: 1 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \int\left(3x^2-2x\right)dx = x^3-x^2+c" />,
    reason: (
      <>
        We&apos;re given <Katex tex="f'" /> and want <Katex tex="f" />, so antidifferentiate: raise each power by one
        and divide by the new power. Antidifferentiating can&apos;t recover a constant term, because every function{' '}
        <Katex tex="x^3-x^2+c" /> has the same derivative. That unknown <Katex tex="c" /> is exactly what the extra
        fact <Katex tex="f(4)=0" /> is for.
      </>
    ),
  },
  {
    working: <Katex display tex="f(4) = 4^3-4^2+c = 48+c" />,
    reason: (
      <>
        Use the known point: substitute <Katex tex="x=4" /> into the general antiderivative, keeping the{' '}
        <Katex tex="c" />.
      </>
    ),
  },
  {
    working: <Katex display tex="48+c = 0 \implies c = -48" />,
    reason: (
      <>
        Set it equal to the given value, <Katex tex="0" />, and solve. Subtracting <Katex tex="48" /> from both sides
        makes <Katex tex="c" /> negative.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{f(x)=x^3-x^2-48}" />,
    reason: (
      <>
        Matches option <b>C</b>. Option <b>A</b> leaves the constant out (it gives <Katex tex="f(4)=48" />), and{' '}
        <b>B</b> has the sign of the constant reversed. Options <b>D</b> and <b>E</b> come from <em>differentiating</em>{' '}
        instead: <Katex tex="6x-2" /> is <Katex tex="f''(x)" />, and <Katex tex="6x-24" /> is <Katex tex="6x+k" /> with{' '}
        <Katex tex="k" /> chosen to make the value at <Katex tex="4" /> zero.
      </>
    ),
  },
]

export default function MethodsQ5_2019() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="f'(x)=3x^2-2x" /> such that <Katex tex="f(4)=0" />. The rule of{' '}
          <Katex tex="f" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="f(x)=x^3-x^2" /> },
        { letter: 'B', content: <Katex tex="f(x)=x^3-x^2+48" /> },
        { letter: 'C', content: <Katex tex="f(x)=x^3-x^2-48" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="f(x)=6x-2" /> },
        { letter: 'E', content: <Katex tex="f(x)=6x-24" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <>
          <Explore title="Every antiderivative is the same curve slid up or down, and one point picks one">
            <FamilyWidget />
          </Explore>
          <WrongMethod
            title="f(4) comes to 48, so c = 48"
            source="5% chose B"
            working={
              <>
                <Katex display tex="4^3-4^2 = 48 \implies c = 48" />
                <Katex display tex="f(x)=x^3-x^2+48 \quad \text{(option B)}" />
              </>
            }
          >
            <p>
              The <Katex tex="c" /> has to <em>cancel</em> the <Katex tex="48" />, not copy it: <Katex tex="48+c=0" />{' '}
              gives <Katex tex="c=-48" />. Always substitute back to check. Option B gives{' '}
              <Katex tex="f(4)=64-16+48=96" />, not <Katex tex="0" />, so its curve passes <Katex tex="96" /> units above
              the point <Katex tex="(4,0)" />.
            </p>
          </WrongMethod>
        </>
      }
    />
  )
}
