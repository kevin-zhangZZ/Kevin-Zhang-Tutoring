// 2018 Specialist Mathematics — Exam 2, MCQ 9. VCAA examination report: 69% correct (no
// comment printed for this question). Separating a differential equation after expanding the
// compound angles (sin(x + y) − sin(x − y) = 2cos(x)sin(y)). Question text transcribed from the
// original paper; VCAA printed no diagram and neither does the stem here (guide §7). Identity
// and each option's implied dy/dx checked in sympy: only D gives back 1/(cos(x)sin(y)). itute
// and the NBEASTK walkthrough agree (D). Distractors verified as the equations they separate:
// C (12%) is dy/dx = cos(x)sin(y), the reciprocal; E (8%) is dy/dx = sin(y)/cos(x); B (8%) is
// dy/dx = 1/(sin(x)cos(y)) = 2/(sin(x + y) + sin(x − y)), the denominator with a + sign.
// Widget: spec-2018-mcq9-slopefield (slope field from the question's own form; option D's curve
// through a draggable point follows it, options C and E cut across). WrongMethod: option C.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const FieldWidget = lazyWidget(() => import('../interactives/spec-2018-mcq9-slopefield'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 8, C: 12, D: 69, E: 8 },
  answer: 'D',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\sin(x+y) = \sin(x)\cos(y)+\cos(x)\sin(y)" />,
    reason: (
      <>
        Why expand? As written, <Katex tex="x" /> and <Katex tex="y" /> are tangled inside the same sine, so
        nothing can be separated. Every option is a separated equation, which tells you the denominator
        must break into (function of <Katex tex="x" />) × (function of <Katex tex="y" />). The compound angle
        formulas on the formula sheet are the tool that untangles them.
      </>
    ),
  },
  {
    working: <Katex display tex="\sin(x-y) = \sin(x)\cos(y)-\cos(x)\sin(y)" />,
    reason: <>The same formula with <Katex tex="-y" />: only the sign of the second term changes.</>,
  },
  {
    working: <Katex display tex="\sin(x+y)-\sin(x-y) = 2\cos(x)\sin(y)" />,
    reason: (
      <>
        Subtract: the <Katex tex="\sin(x)\cos(y)" /> terms cancel and the <Katex tex="\cos(x)\sin(y)" />{' '}
        terms add. The mixed-up denominator is really a product, one factor in <Katex tex="x" /> and one in{' '}
        <Katex tex="y" />. Take care with the sign here: a <Katex tex="+" /> between the two sines would give{' '}
        <Katex tex="2\sin(x)\cos(y)" /> instead, which leads to option <b>B</b>.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = \frac{2}{2\cos(x)\sin(y)} = \frac{1}{\cos(x)\sin(y)}" />,
    reason: <>The <Katex tex="2" />s cancel.</>,
  },
  {
    working: <Katex display tex="\sin(y)\,\frac{dy}{dx} = \frac{1}{\cos(x)} = \sec(x)" />,
    reason: (
      <>
        Separate: multiply both sides by <Katex tex="\sin(y)" /> so every <Katex tex="y" /> is on the left
        with <Katex tex="\tfrac{dy}{dx}" />, and every <Katex tex="x" /> is on the right. Then integrate both
        sides with respect to <Katex tex="x" />; the <Katex tex="\tfrac{dy}{dx}\,dx" /> on the left becomes{' '}
        <Katex tex="dy" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\int\sec(x)\,dx = \int\sin(y)\,dy}" />,
    reason: (
      <>
        Matches option <b>D</b>. To test any option, read it backwards:{' '}
        <Katex tex="\int f(x)\,dx=\int g(y)\,dy" /> means <Katex tex="\tfrac{dy}{dx}=\tfrac{f(x)}{g(y)}" />.
        Option <b>C</b>, chosen by <Katex tex="12\%" />, gives <Katex tex="\cos(x)\sin(y)" />, the reciprocal
        of the true rate. Option <b>E</b> gives <Katex tex="\tfrac{\sin(y)}{\cos(x)}" />, with{' '}
        <Katex tex="\sin(y)" /> on top instead of underneath. Option <b>B</b> gives{' '}
        <Katex tex="\tfrac{1}{\sin(x)\cos(y)}" />, from the sign slip above.
      </>
    ),
  },
]

export default function SpecialistQ9_2018() {
  return (
    <MCQShell
      question={
        <p>
          A solution to the differential equation{' '}
          <Katex tex="\dfrac{dy}{dx}=\dfrac{2}{\sin(x+y)-\sin(x-y)}" /> can be obtained from
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\displaystyle\int 1\,dx = \int 2\sin(y)\,dy" /> },
        { letter: 'B', content: <Katex tex="\displaystyle\int \cos(y)\,dy = \int \operatorname{cosec}(x)\,dx" /> },
        { letter: 'C', content: <Katex tex="\displaystyle\int \cos(x)\,dx = \int \operatorname{cosec}(y)\,dy" /> },
        { letter: 'D', content: <Katex tex="\displaystyle\int \sec(x)\,dx = \int \sin(y)\,dy" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\displaystyle\int \sec(x)\,dx = \int \operatorname{cosec}(y)\,dy" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="Make it separable first">
          <p>
            A differential equation is separable when <Katex tex="\tfrac{dy}{dx}" /> is a function of{' '}
            <Katex tex="x" /> times a function of <Katex tex="y" />. Then{' '}
            <Katex tex="\tfrac{dy}{dx}=\tfrac{f(x)}{g(y)}" /> rearranges to{' '}
            <Katex tex="\int g(y)\,dy=\int f(x)\,dx" />.
          </p>
          <p>
            As written, <Katex tex="\sin(x+y)" /> mixes the two variables and nothing can be separated. The
            compound angle expansions turn that mixture into a clean product{' '}
            <Katex tex="2\cos(x)\sin(y)" />, and from there the equation splits in one line. Worth
            remembering as a pattern: <Katex tex="\sin(A+B)-\sin(A-B)=2\cos(A)\sin(B)" />, because the
            terms that don&apos;t change sign with <Katex tex="B" /> cancel.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="Only the right separation follows the slope field">
            <FieldWidget />
          </Explore>
          <WrongMethod
            title="Move the denominator across and separate"
            source="12% chose C"
            working={
              <>
                <div>
                  <Katex tex="\int\cos(x)\,dx=\int\operatorname{cosec}(y)\,dy" />
                </div>
                <div>
                  <Katex tex="\Rightarrow\ \frac{dy}{dx}=\cos(x)\sin(y)" />
                </div>
              </>
            }
          >
            Option C separates the <em>reciprocal</em> of the real rate: the product{' '}
            <Katex tex="\cos(x)\sin(y)" /> has ended up on top of <Katex tex="\tfrac{dy}{dx}" /> instead of
            underneath. It is exactly what you get by separating{' '}
            <Katex tex="\tfrac{dx}{dy}=\tfrac{1}{\cos(x)\sin(y)}" />, with <Katex tex="dx" /> and{' '}
            <Katex tex="dy" /> swapped. Catch it by reading your answer backwards: from{' '}
            <Katex tex="\int f(x)\,dx=\int g(y)\,dy" />, differentiating gives{' '}
            <Katex tex="g(y)\tfrac{dy}{dx}=f(x)" />, and that must match the original equation. The
            interactive draws C&apos;s curve cutting across the slope field.
          </WrongMethod>
        </>
      }
    />
  )
}
