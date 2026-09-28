// 2018 Specialist Mathematics — Exam 2, MCQ 4. VCAA examination report: 49% correct.
// Find cosec(-x) given cos(x) and cot(x), working entirely from trig identities (no calculator
// angle needed). The signs decide it: cos x < 0 and cot x > 0 put x in the third quadrant, and −x
// is its reflection into the second, where cosec is positive.
// Widget (interactives/spec-2018-mcq4-reflect.tsx): drag P(x) round the unit circle; the conditions
// hold only in the third quadrant, and reflecting to P(−x) flips the sign of sin. WrongMethod:
// stopping at cosec(x) = −b/a (option B, 22%). The report has no comment on this question.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const Reflect = lazyWidget(() => import('../interactives/spec-2018-mcq4-reflect'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 49, B: 22, C: 14, D: 12, E: 4 },
  answer: 'A',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\cos(x) = -a < 0, \qquad \cot(x) = b > 0" />
        <Katex display tex="\implies x \text{ in quadrant 3},\ \sin(x) < 0" />
      </>
    ),
    reason: (
      <>
        Options A and B (and C and D) differ only by a sign, so settle the signs first. Cosine is negative in quadrants 2 and 3.{' '}
        <Katex tex="\cot(x) = \frac{\cos(x)}{\sin(x)}" /> is positive only when <Katex tex="\sin(x)" /> has the same sign as{' '}
        <Katex tex="\cos(x)" />, so <Katex tex="\sin(x)" /> is negative too: quadrant 3.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} \sin(x) &= \frac{\cos(x)}{\cot(x)} \\ &= -\frac{a}{b} \end{aligned}" />,
    reason: (
      <>
        We want cosec, which is <Katex tex="\frac{1}{\sin}" />, but we are given cos and cot. The definition{' '}
        <Katex tex="\cot = \frac{\cos}{\sin}" /> links all three, so rearrange it for <Katex tex="\sin(x)" />. It is negative, as the
        quadrant said it must be.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} \mathrm{cosec}(x) &= \frac{1}{\sin(x)} \\ &= -\frac{b}{a} \end{aligned}" />,
    reason: <>Cosecant is the reciprocal of sine, so flip the fraction; the sign stays.</>,
  },
  {
    working: <Katex display tex="\mathrm{cosec}(-x) = \frac{1}{\sin(-x)} = -\mathrm{cosec}(x)" />,
    reason: (
      <>
        On the unit circle, <Katex tex="-x" /> is <Katex tex="x" /> reflected in the horizontal axis, so the height{' '}
        <Katex tex="\sin" /> changes sign: <Katex tex="\sin(-x) = -\sin(x)" />. Its reciprocal changes sign with it, so cosec is
        odd. Drag <Katex tex="P" /> in the diagram below to see the reflection.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\mathrm{cosec}(-x) = -\left(-\frac{b}{a}\right) = \frac{b}{a}}" />,
    reason: (
      <>
        Matches option <b>A</b>. Sign check: <Katex tex="-x" /> is in quadrant 2, where sine and cosec are positive, and{' '}
        <Katex tex="\tfrac{b}{a} > 0" />. Option <b>B</b> (<Katex tex="22\%" />), <Katex tex="-\tfrac{b}{a}" />, is{' '}
        <Katex tex="\mathrm{cosec}(x)" />: it misses the sign change for <Katex tex="-x" />. Options <b>C</b> and <b>D</b> are{' '}
        <Katex tex="\sin(x)" /> and <Katex tex="\sin(-x)" />: the reciprocal was never taken.
      </>
    ),
  },
]

export default function SpecialistQ4_2018() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="\cos(x) = -a" /> and <Katex tex="\cot(x) = b" />, where <Katex tex="a,b>0" />, then{' '}
          <Katex tex="\mathrm{cosec}(-x)" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{b}{a}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="-\dfrac{b}{a}" /> },
        { letter: 'C', content: <Katex tex="-\dfrac{a}{b}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{a}{b}" /> },
        { letter: 'E', content: <Katex tex="-ab" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="Reading signs off the unit circle">
          <p>
            The point at angle <Katex tex="x" /> on the unit circle is <Katex tex="P = (\cos x, \sin x)" />: cosine is how far across,
            sine is how high. So cosine is negative on the left (quadrants 2 and 3) and sine is negative below the axis (quadrants 3
            and 4). Tangent and cotangent are ratios of the two, so they are positive where the signs agree (quadrants 1 and 3).
          </p>
          <p>
            Replacing <Katex tex="x" /> with <Katex tex="-x" /> measures the angle the other way round, which reflects <Katex tex="P" /> in
            the horizontal axis. Across stays the same and height flips:{' '}
            <Katex tex="\cos(-x) = \cos(x)" /> (even) and <Katex tex="\sin(-x) = -\sin(x)" /> (odd). Cosec, tan and cot each contain
            one sine (on top or underneath) and otherwise only cosine, so they flip sign too: they are odd.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="Reflecting x to −x flips the sign of sine, and so of cosec">
            <Reflect />
          </Explore>
          <WrongMethod
            title="Find cosec(x) and that's the answer"
            source="22% chose B"
            working={
              <>
                <Katex display tex="\sin(x) = -\tfrac{a}{b}" />
                <Katex display tex="\implies \mathrm{cosec}(x) = -\tfrac{b}{a} \quad \text{(option B)}" />
              </>
            }
          >
            <p>
              Everything up to here is right, but it answers a different question: it is <Katex tex="\mathrm{cosec}(x)" />, and the
              question asks for <Katex tex="\mathrm{cosec}(-x)" />. Cosec is odd, so one more sign change is needed. A ten-second
              sign check catches it: <Katex tex="x" /> is in quadrant 3, so <Katex tex="-x" /> is in quadrant 2, where cosec is
              positive. A negative answer can&apos;t be right.
            </p>
          </WrongMethod>
        </>
      }
    />
  )
}
