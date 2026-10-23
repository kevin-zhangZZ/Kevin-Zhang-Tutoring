// 2024 Specialist NHT — Exam 2, MCQ 15. The NHT report gives the answer key only, with no
// statistics. Vectors: a normal to the plane through three points, as the cross product of two
// vectors in the plane. Question text transcribed from the original paper. Solution is original;
// the answer D agrees with the report's key. sympy: (1, 2, 2) × (−3, 0, 3) = (6, −9, 6); of the
// options only D is perpendicular to both.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'D' }

const v = (s: string) => `\\underset{\\sim}{${s}}`
const I = v('i'), J = v('j'), K = v('k')

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="P(2,-1,-1),\quad Q(3,1,1),\quad R(-1,-1,2)" />,
    reason: <>Name the three points.</>,
  },
  {
    working: <Katex display tex={`\\begin{aligned}\\overrightarrow{PQ}&=${I}+2${J}+2${K}\\\\ \\overrightarrow{PR}&=-3${I}+0${J}+3${K}\\end{aligned}`} />,
    reason: <>Two vectors lying in the plane: subtract the coordinates of <Katex tex="P" /> from those of <Katex tex="Q" /> and <Katex tex="R" />.</>,
  },
  {
    working: <Katex display tex={`\\overrightarrow{PQ}\\times\\overrightarrow{PR}=\\begin{vmatrix}${I}&${J}&${K}\\\\1&2&2\\\\-3&0&3\\end{vmatrix}`} />,
    reason: <>The cross product of two non-parallel vectors in the plane is perpendicular to both, so it is a normal to the plane.</>,
  },
  {
    working: <Katex display tex={`\\begin{aligned}&=(6-0)${I}-(3+6)${J}+(0+6)${K}\\\\ &=6${I}-9${J}+6${K}\\\\ &=3(2${I}-3${J}+2${K})\\end{aligned}`} />,
    reason: <>Expand along the top row. The middle (<Katex tex={J} />) term carries a minus sign.</>,
    more: <>Any non-zero multiple of a normal is also a normal, so divide out the common factor 3.</>,
  },
  {
    working: <Katex display tex={`(2${I}-3${J}+2${K})\\cdot(${I}+2${J}+2${K})=2-6+4=0`} />,
    reason: <>Check: the normal is perpendicular to <Katex tex="\overrightarrow{PQ}" />, and likewise <Katex tex="-6+0+6=0" /> with <Katex tex="\overrightarrow{PR}" />.</>,
  },
  {
    working: <Katex display tex={`\\boxed{2${I}-3${J}+2${K}}`} />,
    reason: <>Matches option <b>D</b>.</>,
    more: <>Option <b>C</b> is <Katex tex={`-(2${I}+3${J}+2${K})`} />, the result of forgetting the minus sign on the <Katex tex={J} /> term: its dot product with <Katex tex="\overrightarrow{PQ}" /> is <Katex tex="-12" />, not 0. None of A, B, C or E is perpendicular to both <Katex tex="\overrightarrow{PQ}" /> and <Katex tex="\overrightarrow{PR}" />.</>,
  },
]

export default function SpecialistQ15_2024NHT() {
  return (
    <MCQShell
      question={
        <p>
          A normal vector to the plane that contains the points <Katex tex="(2,-1,-1)" />, <Katex tex="(3,1,1)" /> and{' '}
          <Katex tex="(-1,-1,2)" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex={`2${I}+3${J}-3${K}`} /> },
        { letter: 'B', content: <Katex tex={`-2${I}-7${J}-10${K}`} /> },
        { letter: 'C', content: <Katex tex={`-2${I}-3${J}-2${K}`} /> },
        { letter: 'D', content: <Katex tex={`2${I}-3${J}+2${K}`} />, isAnswer: true },
        { letter: 'E', content: <Katex tex={`2${I}+7${J}+10${K}`} /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
