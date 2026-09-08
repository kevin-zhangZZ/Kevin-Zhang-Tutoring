// 2018 Specialist Mathematics — Exam 2, MCQ 12. VCAA examination report: 36% correct —
// the hardest MCQ in the 2017-2018 Specialist Exam 2 papers.
// The equality case of the triangle inequality for vectors — what does it force?
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 36, B: 18, C: 21, D: 9, E: 16 },
  answer: 'A',
  noAnswer: 1,
  comment: (
    <>
      Option B would not necessarily satisfy the given statement. Options D and E would not satisfy the
      given statement. Options A and C would satisfy the given statement, but only A is necessarily true.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\underset{\sim}{a}=(2,0), \ \underset{\sim}{b}=(3,0):" />
        <Katex display tex="|\underset{\sim}{a}+\underset{\sim}{b}|=5=|\underset{\sim}{a}|+|\underset{\sim}{b}|" />
      </>
    ),
    reason: <>A quick example where equality holds — <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{b}" /> point the <em>same</em> way. Here <Katex tex="|\underset{\sim}{a}|=2\ne3=|\underset{\sim}{b}|" />, <Katex tex="\underset{\sim}{a}\ne\underset{\sim}{b}" />, <Katex tex="\underset{\sim}{a}\ne-\underset{\sim}{b}" />, and they're not perpendicular — this already rules out B, C, D, E as <em>necessary</em> conditions.</>,
  },
  {
    working: <Katex display tex="|\underset{\sim}{a}+\underset{\sim}{b}|^2 = |\underset{\sim}{a}|^2+2\,\underset{\sim}{a}\!\cdot\!\underset{\sim}{b}+|\underset{\sim}{b}|^2" />,
    reason: 'Expand the left side of the given equation after squaring both sides, to work with dot products instead of magnitudes.',
  },
  {
    working: <Katex display tex="\bigl(|\underset{\sim}{a}|+|\underset{\sim}{b}|\bigr)^2 = |\underset{\sim}{a}|^2+2|\underset{\sim}{a}||\underset{\sim}{b}|+|\underset{\sim}{b}|^2" />,
  },
  {
    working: (
      <>
        <Katex display tex="|\underset{\sim}{a}+\underset{\sim}{b}|=|\underset{\sim}{a}|+|\underset{\sim}{b}|" />
        <Katex display tex="\implies\; \underset{\sim}{a}\!\cdot\!\underset{\sim}{b} = |\underset{\sim}{a}||\underset{\sim}{b}|" />
      </>
    ),
    reason: 'Equate the two expansions above (squaring is valid since both sides are non-negative) and cancel matching terms.',
  },
  {
    working: (
      <>
        <Katex display tex="\underset{\sim}{a}\!\cdot\!\underset{\sim}{b}=|\underset{\sim}{a}||\underset{\sim}{b}|\cos\theta" />
        <Katex display tex="\implies\; \cos\theta=1 \;\implies\; \theta=0" />
      </>
    ),
    reason: <>Since <Katex tex="\underset{\sim}{a},\underset{\sim}{b}\ne\underset{\sim}{0}" />, dividing through by <Katex tex="|\underset{\sim}{a}||\underset{\sim}{b}|" /> is valid — the angle between them must be exactly <Katex tex="0" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\theta=0 \;\implies\; \underset{\sim}{a} \text{ and } \underset{\sim}{b}" />
        <Katex display tex="\text{point in the same direction}" />
      </>
    ),
    reason: <>This is stronger than option A's "parallel" (which would also cover pointing in opposite directions), but same-direction always <em>implies</em> parallel — so parallel is a necessary (if not sufficient on its own) consequence.</>,
  },
  {
    working: <Katex display tex="\boxed{\underset{\sim}{a} \text{ is parallel to } \underset{\sim}{b}}" />,
    reason: <>Matches option <b>A</b> — it's the only listed statement that must be true in every case, even though the full condition (same direction) is actually a bit stronger.</>,
  },
]

export default function SpecialistQ12_2018() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="|\underset{\sim}{a}+\underset{\sim}{b}| = |\underset{\sim}{a}|+|\underset{\sim}{b}|" />{' '}
          and <Katex tex="\underset{\sim}{a},\underset{\sim}{b}\ne\underset{\sim}{0}" />, which one of the
          following is <b>necessarily true</b>?
        </p>
      }
      options={[
        { letter: 'A', content: <><Katex tex="\underset{\sim}{a}" /> is parallel to <Katex tex="\underset{\sim}{b}" /></>, isAnswer: true },
        { letter: 'B', content: <Katex tex="|\underset{\sim}{a}|=|\underset{\sim}{b}|" /> },
        { letter: 'C', content: <Katex tex="\underset{\sim}{a}=\underset{\sim}{b}" /> },
        { letter: 'D', content: <Katex tex="\underset{\sim}{a}=-\underset{\sim}{b}" /> },
        { letter: 'E', content: <><Katex tex="\underset{\sim}{a}" /> is perpendicular to <Katex tex="\underset{\sim}{b}" /></> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
