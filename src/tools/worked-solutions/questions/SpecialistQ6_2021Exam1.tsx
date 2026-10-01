// 2021 Specialist Mathematics — Exam 1 Question 6 (4 marks). The values of a parameter
// making three vectors linearly independent, with an absolute value in the way. Question
// text transcribed from the original paper. Answer checked with sympy and against the VCAA
// examination report. Solution is original.
// Widget: interactives/spec-2021e1-q6-two-holes.tsx — slide p along |1 − p²| against 4: only ±√5 are
// dependent, so the answer is the whole p-axis with two holes (Explore box after the working).

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const TwoHolesWidget = lazyWidget(() => import('../interactives/spec-2021e1-q6-two-holes'))

const EXAM: SAExaminerStats = {
  marks: [14, 9, 19, 33, 26],
  average: 2.5,
  comment: (
    <>
      Most students realised that they first needed to write down and solve a system of
      linear equations in order to find the values of <Katex tex="p" /> for which the set of
      vectors were linearly dependent. Many students were able to find that{' '}
      <Katex tex="p=\pm\sqrt5" /> for linear dependence but failed to conclude that{' '}
      <Katex tex="p\in R\setminus\left\{-\sqrt5,\sqrt5\right\}" /> (or equivalent) for
      independence.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} &\text{Dependent} \iff \underset{\sim}{c} = m\underset{\sim}{a}+n\underset{\sim}{b} \\ &\text{for some } m,\ n\in R \end{aligned}" />,
    reason: (
      <>
        <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{b}" /> are not parallel:{' '}
        <Katex tex="\underset{\sim}{b}" /> is not a multiple of <Katex tex="\underset{\sim}{a}" />, since{' '}
        <Katex tex="2 = -2\times(-1)" /> but <Katex tex="-8 \ne -2\times 6" />. So the only way the three can be
        dependent is for <Katex tex="\underset{\sim}{c}" /> to be a combination of <Katex tex="\underset{\sim}{a}" />{' '}
        and <Katex tex="\underset{\sim}{b}" />. Find the values of <Katex tex="p" /> that make this happen first,
        then exclude them — the question asks for independence.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} &3\underset{\sim}{i}+2\underset{\sim}{j}+\left|1-p^2\right|\underset{\sim}{k} \\ &= m\left(-\underset{\sim}{i}+6\underset{\sim}{j}-3\underset{\sim}{k}\right) \\ &\quad +n\left(2\underset{\sim}{i}-8\underset{\sim}{j}+5\underset{\sim}{k}\right) \end{aligned}" />,
    reason: <>Substitute the three vectors into <Katex tex="\underset{\sim}{c} = m\underset{\sim}{a}+n\underset{\sim}{b}" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{i}: \ -m+2n = 3; \qquad \underset{\sim}{j}: \ 6m-8n = 2" />,
    reason: (
      <>
        Two vectors are equal only when their <Katex tex="\underset{\sim}{i}" />, <Katex tex="\underset{\sim}{j}" /> and{' '}
        <Katex tex="\underset{\sim}{k}" /> components are all equal. The <Katex tex="\underset{\sim}{i}" /> and{' '}
        <Katex tex="\underset{\sim}{j}" /> equations have no <Katex tex="p" /> in them, so solve these two first.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} &m = 2n-3 \\ &6(2n-3)-8n = 2 \implies 4n = 20 \\ &n = 5, \ m = 7 \end{aligned}" />,
    reason: (
      <>
        Rearrange the <Katex tex="\underset{\sim}{i}" /> equation for <Katex tex="m" /> and substitute into the{' '}
        <Katex tex="\underset{\sim}{j}" /> equation. Check in the <Katex tex="\underset{\sim}{j}" /> equation:{' '}
        <Katex tex="6(7)-8(5) = 2" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\underset{\sim}{k}: \ \left|1-p^2\right| = -3m+5n = -21+25 = 4" />,
    reason: (
      <>
        <Katex tex="m" /> and <Katex tex="n" /> are now fixed, so <Katex tex="\underset{\sim}{c}" /> is a combination
        of <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{b}" /> only if the{' '}
        <Katex tex="\underset{\sim}{k}" /> components also match. This is where <Katex tex="p" /> enters.
      </>
    ),
  },
  {
    working: <Katex display tex="1-p^2 = 4 \ \text{ or } \ 1-p^2 = -4" />,
    reason: <><Katex tex="\left|X\right| = 4" /> means <Katex tex="X" /> is <Katex tex="4" /> or <Katex tex="-4" />, so there are two cases to solve.</>,
  },
  {
    working: <Katex display tex="1-p^2 = 4 \implies p^2 = -3" />,
    reason: <>No real solutions, since the square of a real number can't be negative. Reject this case.</>,
  },
  {
    working: <Katex display tex="1-p^2 = -4 \implies p^2 = 5 \implies p = \pm\sqrt5" />,
    reason: (
      <>
        These are the only two values that make <Katex tex="\underset{\sim}{c}" /> a combination of{' '}
        <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{b}" />, so the only values for which the
        three vectors are <em>dependent</em>.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{p \in R\setminus\left\{-\sqrt5,\ \sqrt5\right\}}" />,
    reason: (
      <>
        The question asks for <em>independent</em>, which is every real <Katex tex="p" /> except the two dependent
        values. The report notes many students found <Katex tex="p=\pm\sqrt5" /> but failed to conclude this:{' '}
        <Katex tex="\pm\sqrt5" /> answers the opposite question. Slide <Katex tex="p" /> in the diagram below to see
        the two holes.
      </>
    ),
  },
]

export default function SpecialistQ6_2021Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 6 (4 marks)</p>
        <p>
          Consider the three vectors{' '}
          <Katex tex="\underset{\sim}{a}=-\underset{\sim}{i}+6\underset{\sim}{j}-3\underset{\sim}{k}" />
          ,{' '}
          <Katex tex="\underset{\sim}{b}=2\underset{\sim}{i}-8\underset{\sim}{j}+5\underset{\sim}{k}" />{' '}
          and{' '}
          <Katex tex="\underset{\sim}{c}=3\underset{\sim}{i}+2\underset{\sim}{j}+\left|1-p^2\right|\underset{\sim}{k}" />
          , where <Katex tex="p" /> is a real constant.
        </p>
        <p>
          Find the values of <Katex tex="p" /> for which the three vectors are linearly independent.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Three vectors are <b>linearly dependent</b> when one of them can be written as a
            combination of the others, such as{' '}
            <Katex tex="\underset{\sim}{c}=m\underset{\sim}{a}+n\underset{\sim}{b}" />; geometrically,
            all three then lie in one plane. They are <b>linearly independent</b> when no such
            combination exists.
          </p>
          <p>
            Dependence gives equations you can solve, so the route is to find when the vectors{' '}
            <em>are</em> dependent and then exclude those values. Read the last line of the
            question twice before writing the answer: it asks for independent.
          </p>
          <p>
            The absolute value is the second trap: <Katex tex="\left|1-p^2\right|=4" /> has
            two branches, and only one of them has real solutions.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <Explore title={<>Only two values of <Katex tex="p" /> make the vectors dependent — the answer is everything else</>}>
          <TwoHolesWidget />
        </Explore>
        <SAExaminerReport stats={EXAM} maxMarks={4} />
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
