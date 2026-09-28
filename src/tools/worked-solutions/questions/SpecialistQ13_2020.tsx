// 2020 Specialist Mathematics — Exam 2, MCQ 13. VCAA examination report: 72% correct (no
// comment printed for this question). Finding the parameter that makes three vectors linearly
// dependent. Question text transcribed from the original paper. Solution is original; λ = 5 (E)
// agrees with itute, and with the NBEASTK and Dr U video walkthroughs (NBEASTK sets the 3 × 3
// determinant to zero on CAS; itute and Dr U write b = ma + nc, as here). Checked in sympy:
// b = (3/2)a + (7/2)c at λ = 5, and b · (a × c) = 2λ − 10. No wrong option has a verified slip
// behind it, so there is no wrong-method box.
// Interactive diagram (§15): interactives/spec-2020-mcq13-plane.tsx draws the plane of a and c in
// 3D with b's tip sliding along a line as λ changes; it meets the plane only at λ = 5, and a toggle
// builds (3/2)a + (7/2)c tip to tail to show the i-gap (λ − 5)i that the i equation has to close.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const PlaneWidget = lazyWidget(() => import('../interactives/spec-2020-mcq13-plane'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 10, C: 7, D: 5, E: 72 },
  answer: 'E',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{b} = m\underset{\sim}{a}+n\underset{\sim}{c}" />,
    reason: (
      <>
        Linearly dependent means one of the vectors can be built from the other two.{' '}
        <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{c}" /> are clearly not
        parallel, so the question becomes: is <Katex tex="\underset{\sim}{b}" /> a combination of
        them? Put <Katex tex="\underset{\sim}{b}" /> on its own because it holds the unknown{' '}
        <Katex tex="\lambda" />; the right side then has only <Katex tex="m" /> and{' '}
        <Katex tex="n" /> in it.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\lambda\underset{\sim}{i}+3\underset{\sim}{j}+2\underset{\sim}{k}" />
        <Katex display tex="= m\left(\underset{\sim}{i}+2\underset{\sim}{j}-\underset{\sim}{k}\right)+n\left(\underset{\sim}{i}+\underset{\sim}{k}\right)" />
      </>
    ),
    reason: <>Substitute the three vectors. Two vectors are equal only when all three components match, so this one line is really three equations.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{j}: \ 2m = 3 \implies m = \tfrac32" />,
    reason: (
      <>
        Three equations, three unknowns (<Katex tex="m" />, <Katex tex="n" />,{' '}
        <Katex tex="\lambda" />). Start with the one that has the fewest:{' '}
        <Katex tex="\underset{\sim}{c}" /> has no <Katex tex="\underset{\sim}{j}" /> part, so the{' '}
        <Katex tex="\underset{\sim}{j}" /> equation has <Katex tex="m" /> alone.
      </>
    ),
  },
  {
    working: <Katex display tex="\underset{\sim}{k}: \ -m+n = 2 \implies n = 2+\tfrac32 = \tfrac72" />,
    reason: (
      <>
        With <Katex tex="m" /> known, the <Katex tex="\underset{\sim}{k}" /> equation gives{' '}
        <Katex tex="n" />. Notice <Katex tex="\lambda" /> hasn't appeared yet: the{' '}
        <Katex tex="\underset{\sim}{j}" /> and <Katex tex="\underset{\sim}{k}" /> parts of{' '}
        <Katex tex="\underset{\sim}{b}" /> fix the only possible recipe, whatever{' '}
        <Katex tex="\lambda" /> is.
      </>
    ),
  },
  {
    working: <Katex display tex="\underset{\sim}{i}: \ m+n = \lambda \implies \lambda = \tfrac32+\tfrac72" />,
    reason: (
      <>
        The <Katex tex="\underset{\sim}{i}" /> equation is the test that's left. The recipe{' '}
        <Katex tex="\tfrac32\underset{\sim}{a}+\tfrac72\underset{\sim}{c}" /> has{' '}
        <Katex tex="\underset{\sim}{i}" />-component <Katex tex="\tfrac32+\tfrac72" />, so it
        produces <Katex tex="\underset{\sim}{b}" /> only if <Katex tex="\lambda" /> equals that.
        For any other <Katex tex="\lambda" />, no <Katex tex="m" /> and <Katex tex="n" /> work and
        the vectors are independent.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\lambda = 5}" />,
    reason: (
      <>
        Matches option <b>E</b>. Check:{' '}
        <Katex tex="\tfrac32\underset{\sim}{a}+\tfrac72\underset{\sim}{c}=5\underset{\sim}{i}+3\underset{\sim}{j}+2\underset{\sim}{k}" />.
        On CAS, a zero determinant (the three vectors as rows) says the same thing:{' '}
        <Cas fn="solve">solve(det([[1,2,−1][λ,3,2][1,0,1]]) = 0, λ)</Cas> gives{' '}
        <Katex tex="10-2\lambda=0" />, so <Katex tex="\lambda=5" />.
      </>
    ),
  },
]

export default function SpecialistQ13_2020() {
  return (
    <MCQShell
      question={
        <p>
          The vectors{' '}
          <Katex tex="\underset{\sim}{a}=\underset{\sim}{i}+2\underset{\sim}{j}-\underset{\sim}{k}" />
          ,{' '}
          <Katex tex="\underset{\sim}{b}=\lambda\underset{\sim}{i}+3\underset{\sim}{j}+2\underset{\sim}{k}" />{' '}
          and <Katex tex="\underset{\sim}{c}=\underset{\sim}{i}+\underset{\sim}{k}" /> will be{' '}
          <b>linearly dependent</b> when the value of <Katex tex="\lambda" /> is
        </p>
      }
      background={
        <Background title="What linearly dependent means">
          <p>
            Three vectors are <b>linearly dependent</b> when one of them can be written as a
            combination of the other two, for example{' '}
            <Katex tex="\underset{\sim}{b}=m\underset{\sim}{a}+n\underset{\sim}{c}" />. If none of
            them can, they are linearly independent.
          </p>
          <p>
            The picture: two non-parallel vectors from the origin, such as{' '}
            <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{c}" />, can be
            combined to reach every point of one plane through the origin, and no point off it.
            So three vectors in space are dependent exactly when all three lie in one plane
            through the origin.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="1" /> },
        { letter: 'B', content: <Katex tex="2" /> },
        { letter: 'C', content: <Katex tex="3" /> },
        { letter: 'D', content: <Katex tex="4" /> },
        { letter: 'E', content: <Katex tex="5" />, isAnswer: true },
      ]}
      rows={ROWS}
      extras={
        <Explore title="Dependent means b lies in the plane of a and c">
          <PlaneWidget />
        </Explore>
      }
      examinerReport={EXAMINER}
    />
  )
}
