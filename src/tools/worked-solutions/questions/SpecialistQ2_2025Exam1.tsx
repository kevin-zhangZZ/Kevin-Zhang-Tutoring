// 2025 Specialist Mathematics — Exam 1 Question 2 (3 marks). Where two lines in space meet,
// found by equating components with two different parameters. Question text transcribed
// from the original paper. Answers checked with sympy and against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [14, 13, 15, 59],
  average: 2.2,
  comment: (
    <>
      Students needed to express the two lines in parametric form using different parameters for
      each line and solving the resulting equations for the parameters. Substituting back gave the
      point of intersection of the lines.
      <br />
      It was common for students to use the same parameter for both lines. This did not result in
      viable equations to solve. In this case, students were ineligible for full marks.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="L_1: \ \underset{\sim}{r_1}(s) = (2+s)\underset{\sim}{i}+(3+2s)\underset{\sim}{j}+(1-s)\underset{\sim}{k}" />,
    reason: <>A point plus a multiple of the direction, written out in components.</>,
  },
  {
    working: <Katex display tex="L_2: \ \underset{\sim}{r_2}(u) = (1-u)\underset{\sim}{i}+(3-u)\underset{\sim}{j}+(2+u)\underset{\sim}{k}" />,
    reason: <>A <em>different</em> parameter <Katex tex="u" />: the two lines reach the meeting point at different parameter values, so reusing <Katex tex="s" /> forces them to arrive simultaneously and destroys the problem.</>,
  },
  {
    working: <Katex display tex="2+s = 1-u, \qquad 3+2s = 3-u, \qquad 1-s = 2+u" />,
    reason: <>Equating components gives three equations in two unknowns.</>,
  },
  {
    working: <Katex display tex="\text{from the } \underset{\sim}{j} \text{ equation: } 2s = -u \implies u = -2s" />,
    reason: <>The simplest of the three.</>,
  },
  {
    working: <Katex display tex="\text{substituting into } 2+s=1-u: \quad 2+s = 1+2s \implies s = 1, \ u = -2" />,
    reason: <>Any two of the three equations determine the parameters.</>,
  },
  {
    working: <Katex display tex="\text{check the third: } 1-1 = 0 \ \text{ and } \ 2+(-2) = 0 \ \checkmark" />,
    reason: <>The third equation must hold too — that is what confirms the lines really intersect rather than being skew.</>,
  },
  {
    working: <Katex display tex="\boxed{(3,\,5,\,0)}" />,
    reason: <>From <Katex tex="s=1" /> in <Katex tex="L_1" />, and <Katex tex="u=-2" /> in <Katex tex="L_2" /> gives the same point.</>,
  },
]

export default function SpecialistQ2_2025Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (3 marks)</p>
        <p>
          Consider the following two lines, <Katex tex="L_1" /> and <Katex tex="L_2" />.
        </p>
        <p>
          <Katex tex="L_1" /> passes through the point <Katex tex="A_1(2,3,1)" /> and has
          direction{' '}
          <Katex tex="\underset{\sim}{u}=\underset{\sim}{i}+2\underset{\sim}{j}-\underset{\sim}{k}" />.
        </p>
        <p>
          <Katex tex="L_2" /> passes through the point <Katex tex="A_2(1,3,2)" /> and has
          direction{' '}
          <Katex tex="\underset{\sim}{v}=-\underset{\sim}{i}-\underset{\sim}{j}+\underset{\sim}{k}" />.
        </p>
        <p>Find the coordinates of the point of intersection of the two lines.</p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Two lines in space meet at a single <em>point</em>, but the two parameters at that
            point are generally different. Using one letter for both asks the two lines to
            reach the point at the same parameter value, which they do not — the report notes
            it was common, and those students were ineligible for full marks.
          </p>
          <p>
            Three equations for two unknowns means the system is overdetermined. Solving two
            of them and checking the third is not optional — it is the step that proves the
            lines are not skew.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAM} maxMarks={3} />
        <div>
          <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">
            Video Walkthrough
          </p>
          <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
        </div>
      </div>
    </div>
  )
}
