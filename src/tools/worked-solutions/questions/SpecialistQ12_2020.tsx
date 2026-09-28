// 2020 Specialist Mathematics — Exam 2, MCQ 12. VCAA examination report: 59% correct (no
// comment printed for this question). Three steps of Euler's method, kept unevaluated. Question
// text transcribed from the original paper. Solution is original; answer C agrees with itute and
// with the NBEASTK and Dr U video walkthroughs. Distractors checked numerically: D reads each
// gradient at the end of its step (x = 0.1, 0.2, 0.3); E is y₄ (four steps); B takes e^{cos 0} as 1;
// A is the same slip stopping after two steps. (Sept 2026: the final row used to say "options D
// and E add a fourth" term; D has three terms and leaves out e, so it now says what D does.)
// Interactive diagram (§15): interactives/spec-2020-mcq12-euler.tsx builds the three steps one at
// a time as rise-over-run triangles against the exact solution, with each wrong option's method
// (D, E, B) rebuilt the same way; a zoomed graph of the gradient e^{cos x} underneath shows each
// step's gradient as a flat bar (C's start on the curve, D's end on it, E's fourth passes x₃ = 0.3).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const EulerWidget = lazyWidget(() => import('../interactives/spec-2020-mcq12-euler'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 12, C: 59, D: 17, E: 9 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="y_{n+1} = y_n+h\,f(x_n), \quad h = 0.1, \ f(x) = e^{\cos(x)}" />,
    reason: <>Euler's method replaces the curve by its tangent for one small step: from the point you are at, go across <Katex tex="h" /> and up <Katex tex="h\times" />(the gradient there). The gradient is taken at <Katex tex="x_n" />, where the step <em>starts</em>, because that is the only point you already know. <Katex tex="y_3" /> is three steps from <Katex tex="x_0=0" />, so the steps start at 0, 0.1 and 0.2 and finish at <Katex tex="x_3=0.3" />.</>,
  },
  {
    working: <Katex display tex="y_1 = y_0+0.1\,f(0) = e+0.1\,e^{\cos(0)} = e+0.1e" />,
    reason: <>First step, from <Katex tex="x_0=0" />. <Katex tex="\cos(0)=1" />, so <Katex tex="e^{\cos(0)}=e^1=e" />. It is <Katex tex="e^0" /> that equals 1: using 1 here is the slip in options A and B.</>,
  },
  {
    working: <Katex display tex="y_2 = y_1+0.1\,f(0.1) = e+0.1\left(e+e^{\cos(0.1)}\right)" />,
    reason: <>The second step starts at <Katex tex="x_1=0.1" />, so it uses the gradient there. Leave it unevaluated and collect the 0.1s: every option is in this exact form.</>,
  },
  {
    working: <Katex display tex="y_3 = y_2+0.1\,f(0.2)" />,
    reason: <>The third step starts at <Katex tex="x_2=0.2" />. It finishes at <Katex tex="x_3=0.3" />, but the gradient at 0.3 is never used: it would only start a fourth step.</>,
  },
  {
    working: <Katex display tex="\boxed{y_3 = e+0.1\left(e+e^{\cos(0.1)}+e^{\cos(0.2)}\right)}" />,
    reason: <>Matches option <b>C</b>: three steps, three gradients, read at <Katex tex="x=0" />, 0.1 and 0.2. Option D (17%) reads each gradient at the <em>end</em> of its step (0.1, 0.2, 0.3); option E adds a fourth step, so it is <Katex tex="y_4" />; options B and A take <Katex tex="e^{\cos(0)}" /> as 1, and A also stops after two steps. As a check, C <Katex tex="\approx3.527" />, close to the exact <Katex tex="y(0.3)\approx3.522" />; Euler is a little high because the gradient <Katex tex="e^{\cos(x)}" /> is falling, so each tangent overshoots.</>,
  },
]

export default function SpecialistQ12_2020() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="\dfrac{dy}{dx}=e^{\cos(x)}" /> and <Katex tex="y_0=e" /> when{' '}
          <Katex tex="x_0=0" />, then, using Euler's formula with step size 0.1,{' '}
          <Katex tex="y_3" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="e+0.1\left(1+e^{\cos(0.1)}\right)" /> },
        { letter: 'B', content: <Katex tex="e+0.1\left(1+e^{\cos(0.1)}+e^{\cos(0.2)}\right)" /> },
        {
          letter: 'C',
          content: <Katex tex="e+0.1\left(e+e^{\cos(0.1)}+e^{\cos(0.2)}\right)" />,
          isAnswer: true,
        },
        {
          letter: 'D',
          content: <Katex tex="e+0.1\left(e^{\cos(0.1)}+e^{\cos(0.2)}+e^{\cos(0.3)}\right)" />,
        },
        {
          letter: 'E',
          content: <Katex tex="e+0.1\left(e+e^{\cos(0.1)}+e^{\cos(0.2)}+e^{\cos(0.3)}\right)" />,
        },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="Three Euler steps use three gradients, each read where its step starts">
            <EulerWidget />
          </Explore>
          <WrongMethod
            title="Use the gradient at the end of each step"
            source="17% chose D"
            working={
              <>
                <Katex display tex="y_1 = e+0.1\,e^{\cos(0.1)}" />
                <Katex display tex="y_2 = y_1+0.1\,e^{\cos(0.2)}, \ \ldots" />
                <Katex display tex="y_3 = e+0.1\left(e^{\cos(0.1)}+e^{\cos(0.2)}+e^{\cos(0.3)}\right)" />
              </>
            }
          >
            <p>
              Euler's formula <Katex tex="y_{n+1}=y_n+h\,f(x_n)" /> evaluates <Katex tex="f" /> at{' '}
              <Katex tex="x_n" />, the value you are stepping <em>from</em>. The first step leaves{' '}
              <Katex tex="x_0=0" />, so the first term in the bracket must be{' '}
              <Katex tex="e^{\cos(0)}=e" />, and <Katex tex="e^{\cos(0.3)}" />, from the point you
              finish at, can't appear.
            </p>
            <p>
              The numbers can't warn you here: <Katex tex="e^{\cos(x)}" /> barely changes between 0
              and 0.3, so C and D differ by only about 0.012. Get the method right and write one
              line per step.
            </p>
          </WrongMethod>
          <WrongMethod
            title="e to the power cos(0) is 1"
            source="12% chose B"
            working={<Katex display tex="y_3 = e+0.1\left(1+e^{\cos(0.1)}+e^{\cos(0.2)}\right)" />}
          >
            <p>
              <Katex tex="\cos(0)=1" />, not 0, so <Katex tex="e^{\cos(0)}=e^1=e" />. The first
              gradient is the steepest of the three, about 2.718, and option B replaces it with 1,
              which makes the first step far too flat (see it in the diagram). Option A makes the
              same slip and stops after two steps.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
