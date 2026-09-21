// 2018 Specialist Mathematics — Exam 1, Question 6 (3 marks). Change in momentum of a
// particle whose position vector is given, between two times.
//
// The word "momentum" is mechanics vocabulary, but the mathematics is vector calculus:
// differentiate a position vector, evaluate at two times, subtract. The only mechanics
// content is the one-line definition p = mv, supplied here. Guide §13.7 — judge the
// question's mathematics, not its vocabulary; the skip guide carries a row recording that
// reading, as it does for 2019 Exam 2 MCQ 13.
//
// Question text transcribed from the original paper (no diagram given). Answer checked
// independently with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [12, 14, 42, 31],
  average: 1.9,
  comment: (
    <>
      The majority of students correctly differentiated to find{' '}
      <Katex tex="\dot{\underset{\sim}{r}}" /> and substituted <Katex tex="t=\pi" /> and{' '}
      <Katex tex="t=\tfrac{\pi}{2}" />. Some students made errors in their arithmetic when
      attempting to evaluate the difference. A number of students were unable to evaluate the
      trigonometric expressions correctly. Some students thought that a scalar result was
      required.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{r}(t) = \sin(t)\,\underset{\sim}{i} + \cos(t)\,\underset{\sim}{j} + \frac{t^2}{2}\,\underset{\sim}{k}" />,
    reason: <>Given. Momentum is mass times velocity, and velocity is the derivative of position, so the whole question is one differentiation and two substitutions.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{v}(t) = \dot{\underset{\sim}{r}}(t) = \cos(t)\,\underset{\sim}{i} - \sin(t)\,\underset{\sim}{j} + t\,\underset{\sim}{k}" />,
    reason: <>Differentiate component by component. Watch the sign: <Katex tex="\cos" /> differentiates to <Katex tex="-\sin" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{p}(t) = m\underset{\sim}{v}(t) = 2\underset{\sim}{v}(t)" />,
    reason: <>Momentum <Katex tex="=" /> mass <Katex tex="\times" /> velocity, with <Katex tex="m=2" /> kg. It is a <em>vector</em> — the report notes students who produced a single number instead.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{p}(\pi) = 2\bigl(\cos\pi\,\underset{\sim}{i} - \sin\pi\,\underset{\sim}{j} + \pi\,\underset{\sim}{k}\bigr) = -2\underset{\sim}{i} + 2\pi\,\underset{\sim}{k}" />,
    reason: <><Katex tex="\cos\pi=-1" />, <Katex tex="\sin\pi=0" />. The <Katex tex="\underset{\sim}{j}" /> component vanishes.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{p}\!\left(\frac{\pi}{2}\right) = 2\left(0\cdot\underset{\sim}{i} - 1\cdot\underset{\sim}{j} + \frac{\pi}{2}\underset{\sim}{k}\right) = -2\underset{\sim}{j} + \pi\,\underset{\sim}{k}" />,
    reason: <><Katex tex="\cos\tfrac{\pi}{2}=0" />, <Katex tex="\sin\tfrac{\pi}{2}=1" />. Now the <Katex tex="\underset{\sim}{i}" /> component vanishes instead.</>,
  },
  {
    working: <Katex display tex="\Delta\underset{\sim}{p} = \underset{\sim}{p}\!\left(\frac{\pi}{2}\right) - \underset{\sim}{p}(\pi)" />,
    reason: <>"From <Katex tex="t=\pi" /> to <Katex tex="t=\tfrac{\pi}{2}" />" means final minus initial, and here the <em>final</em> time is <Katex tex="\tfrac{\pi}{2}" /> — the smaller number. Getting this order backwards flips every sign.</>,
  },
  {
    working: <Katex display tex="= \left(-2\underset{\sim}{j}+\pi\underset{\sim}{k}\right) - \left(-2\underset{\sim}{i}+2\pi\underset{\sim}{k}\right)" />,
    reason: <>Subtract component by component.</>,
  },
  {
    working: <Katex display tex="\boxed{\Delta\underset{\sim}{p} = 2\underset{\sim}{i} - 2\underset{\sim}{j} - \pi\,\underset{\sim}{k}}" />,
    reason: <>A vector, in kg m s<Katex tex="^{-1}" />. All three components are non-zero even though each individual momentum had a zero component — a useful check that the subtraction was done properly.</>,
  },
]

export default function SpecialistQ6_2018Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 6 (3 marks)</p>
        <p>
          A particle of mass <Katex tex="2" /> kg moves under a force{' '}
          <Katex tex="\underset{\sim}{F}" /> so that its position vector{' '}
          <Katex tex="\underset{\sim}{r}" /> at any time <Katex tex="t" /> is given by{' '}
          <Katex tex="\underset{\sim}{r}=\sin(t)\,\underset{\sim}{i}+\cos(t)\,\underset{\sim}{j}+\dfrac{t^2}{2}\,\underset{\sim}{k}" />.
          Distances are measured in metres and time is measured in seconds. Find the change in
          momentum from <Katex tex="t=\pi" /> to <Katex tex="t=\dfrac{\pi}{2}" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background title="Mechanics wording, vector-calculus question">
          <p>
            Force and momentum are not on the current Specialist study design, so this
            question <em>looks</em> like one to skip. It is not. The only physics involved is
            the definition <Katex tex="\underset{\sim}{p}=m\underset{\sim}{v}" /> — momentum
            is mass times velocity — and that is handed to you in one line. Everything after
            it is differentiating a vector function and substituting, which is squarely
            current content.
          </p>
          <p>
            Two things to watch. The answer is a <em>vector</em>, not a magnitude, unless a
            magnitude is asked for. And the times run from <Katex tex="\pi" /> down to{' '}
            <Katex tex="\tfrac{\pi}{2}" />, so "change" means the value at{' '}
            <Katex tex="\tfrac{\pi}{2}" /> minus the value at <Katex tex="\pi" />, in that
            order.
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
