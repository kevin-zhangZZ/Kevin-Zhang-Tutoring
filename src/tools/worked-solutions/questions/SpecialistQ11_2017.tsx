// 2017 Specialist Mathematics — Exam 2, MCQ 11. VCAA examination report: 76% correct (no comment).
// Linear dependence of three vectors, solved for the unknown component. Question text
// transcribed from the original paper; answer checked with sympy (a = 4b − c at d = −14, and
// det[a; b; c] = −d − 14). itute agrees (C). Solution is original.
// Widget: interactives/spec-2017-mcq11-coplanar — a 3D view of the plane of b and c, with a slider
// for d moving a's tip up and down the one vertical line it can travel; it lands in the plane only
// at d = −14.
// WrongMethod: option B (9%) — d ≠ −14 is the condition for independence, not dependence. Framed
// without a determinant (3×3 determinants are not in the current Specialist study design).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import { Cas } from '../CasRef'

const CoplanarWidget = lazyWidget(() => import('../interactives/spec-2017-mcq11-coplanar'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 9, C: 76, D: 7, E: 2 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a} = k\underset{\sim}{b}+l\underset{\sim}{c}" />,
    reason: (
      <>
        Dependent means one vector can be built from the others. <Katex tex="\underset{\sim}{b}" /> and{' '}
        <Katex tex="\underset{\sim}{c}" /> are not parallel, so write <Katex tex="\underset{\sim}{a}" /> as a combination of
        them.
      </>
    ),
    more: (
      <>
        <Katex tex="\underset{\sim}{b}" /> and <Katex tex="\underset{\sim}{c}" /> are not parallel because their components
        are not in the same ratio, so the three are dependent exactly when <Katex tex="\underset{\sim}{a}" /> can be built from
        them. One vector equation is three component equations, and there are three unknowns: <Katex tex="k" />,{' '}
        <Katex tex="l" /> and <Katex tex="d" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\underset{\sim}{i}:\ 2 = k+2l; \qquad \underset{\sim}{j}:\ 3 = k+l" />,
    reason: (
      <>
        Start with the two components that do not contain <Katex tex="d" />. They involve only <Katex tex="k" /> and{' '}
        <Katex tex="l" />, so they can be solved on their own.
      </>
    ),
  },
  {
    working: <Katex display tex="l = -1, \qquad k = 4" />,
    reason: (
      <>
        Subtract the <Katex tex="\underset{\sim}{j}" />-equation from the <Katex tex="\underset{\sim}{i}" />-equation:{' '}
        <Katex tex="l = 2-3 = -1" />, then <Katex tex="k = 3-l = 4" />.
      </>
    ),
    more: (
      <>
        Check in the <Katex tex="\underset{\sim}{i}" />-equation: <Katex tex="4+2(-1)=2" /> ✓. It is worth checking, because a
        sign slip here (<Katex tex="l=1,\ k=2" />) gives <Katex tex="d=-8-2=-10" />, which is option A.
      </>
    ),
  },
  {
    working: <Katex display tex="\underset{\sim}{k}:\ d = 4(-4)+(-1)(-2)" />,
    reason: (
      <>
        The <Katex tex="\underset{\sim}{k}" />-components must agree too: those of <Katex tex="\underset{\sim}{b}" /> and{' '}
        <Katex tex="\underset{\sim}{c}" /> are <Katex tex="-4" /> and <Katex tex="-2" />. With the scalars{' '}
        <Katex tex="k=4" /> and <Katex tex="l=-1" /> now known, this decides <Katex tex="d" />.
      </>
    ),
    more: (
      <>
        On CAS, <Cas fn="solve" /> the three component equations together for <Katex tex="k" />, <Katex tex="l" /> and{' '}
        <Katex tex="d" /> to get the same values in one step.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{d = -14}" />,
    reason: (
      <>
        Matches option <b>C</b>. Check: <Katex tex="4\underset{\sim}{b}-\underset{\sim}{c}=2\underset{\sim}{i}+3\underset{\sim}{j}-14\underset{\sim}{k}" /> ✓.
      </>
    ),
    more: (
      <>
        Option B, <Katex tex="d\in R\setminus\{-14\}" />, is the condition for independence, the reverse of what is asked.
        Option A,{' '}
        <Katex tex="d=-10" />, comes from the sign slip in the third row, and D is its opposite. E, every{' '}
        <Katex tex="d" />, cannot be right: at <Katex tex="d=0" />, say, the <Katex tex="\underset{\sim}{k}" />-equation fails.
      </>
    ),
  },
]

export default function SpecialistQ11_2017() {
  return (
    <MCQShell
      question={
        <p>
          The vectors{' '}
          <Katex tex="\underset{\sim}{a}=2\underset{\sim}{i}+3\underset{\sim}{j}+d\underset{\sim}{k}" />
          ,{' '}
          <Katex tex="\underset{\sim}{b}=\underset{\sim}{i}+\underset{\sim}{j}-4\underset{\sim}{k}" />{' '}
          and{' '}
          <Katex tex="\underset{\sim}{c}=2\underset{\sim}{i}+\underset{\sim}{j}-2\underset{\sim}{k}" />
          , where <Katex tex="d" /> is a real constant, are linearly dependent if
        </p>
      }
      background={
        <p>
          A set of vectors is <em>linearly dependent</em> when one of them can be written as a combination of the others
          (equivalently, <Katex tex="\alpha\underset{\sim}{a}+\beta\underset{\sim}{b}+\gamma\underset{\sim}{c}=\underset{\sim}{0}" />{' '}
          with <Katex tex="\alpha,\beta,\gamma" /> not all zero). For three vectors in space this has a picture: two
          non-parallel vectors <Katex tex="\underset{\sim}{b}" /> and <Katex tex="\underset{\sim}{c}" /> span a plane through the
          origin, and every combination <Katex tex="k\underset{\sim}{b}+l\underset{\sim}{c}" /> lies in it. So{' '}
          <Katex tex="\underset{\sim}{a},\underset{\sim}{b},\underset{\sim}{c}" /> are dependent exactly when all three lie in
          one plane (they are coplanar). Independent means <Katex tex="\underset{\sim}{a}" /> sticks out of that plane.
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="d=-10" /> },
        { letter: 'B', content: <Katex tex="d\in R\setminus\{-14\}" /> },
        { letter: 'C', content: <Katex tex="d=-14" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="d\in R\setminus\{-10\}" /> },
        { letter: 'E', content: <Katex tex="d\in R" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <>
          <Explore title="Only one height puts a in the plane of b and c">
            <CoplanarWidget />
          </Explore>
          <WrongMethod
            title="Dependent means a can't be made from b and c, so d ≠ −14"
            source="9% chose B"
            working={
              <>
                <Katex display tex="\underset{\sim}{a}=k\underset{\sim}{b}+l\underset{\sim}{c}\ \text{only when}\ d=-14" />
                <Katex display tex="\text{dependent} \implies d\in R\setminus\{-14\}" />
              </>
            }
          >
            The algebra is right, but the meanings are swapped. Being able to build <Katex tex="\underset{\sim}{a}" /> from{' '}
            <Katex tex="\underset{\sim}{b}" /> and <Katex tex="\underset{\sim}{c}" /> is what <em>dependent</em> means: then
            all three lie in one plane, so <Katex tex="d=-14" />. For every other <Katex tex="d" />,{' '}
            <Katex tex="\underset{\sim}{a}" /> sticks out of that plane, and that is <em>independent</em>. A sense check:
            dependence is the special, fragile situation, pinned to one value of <Katex tex="d" />; an answer that says
            &ldquo;almost every <Katex tex="d" />&rdquo; describes the ordinary case, independence.
          </WrongMethod>
        </>
      }
    />
  )
}
