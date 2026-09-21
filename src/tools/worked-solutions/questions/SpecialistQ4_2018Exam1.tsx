// 2018 Specialist Mathematics — Exam 1, Question 4 (4 marks). Mean and variance of a linear
// combination of two independent random variables, solved for integer coefficients. Question
// text transcribed from the original paper (no diagram given). Answer checked independently
// with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [5, 8, 8, 36, 43],
  average: 3.0,
  comment: (
    <>
      From the information given, students needed to write down a pair of simultaneous
      equations <Katex tex="2a+2b=10" />, <Katex tex="2a^2+4b^2=44" /> and then solve for{' '}
      <Katex tex="a" /> and <Katex tex="b" />. Common problems included failing to reject the
      non-integer solution and only stating the solution with minimal or no working. Students
      are reminded that in a question worth more than one mark, working must be shown.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="E(X)=2, \ \operatorname{Var}(X)=2, \qquad E(Y)=2, \ \operatorname{Var}(Y)=4" />,
    reason: <>Given. Note the variances differ even though the means match — that asymmetry is what makes the system solvable.</>,
  },
  {
    working: <Katex display tex="E(aX+bY) = aE(X)+bE(Y) = 2a+2b = 10" />,
    reason: <>Expectation is linear, always — independence is not needed for this one.</>,
  },
  {
    working: <Katex display tex="a+b = 5" />,
    reason: <>Dividing through by <Katex tex="2" />.</>,
  },
  {
    working: <Katex display tex="\operatorname{Var}(aX+bY) = a^2\operatorname{Var}(X)+b^2\operatorname{Var}(Y) = 2a^2+4b^2 = 44" />,
    reason: <>Here independence <em>is</em> needed: without it there would be a covariance term. Note the coefficients are <em>squared</em>, which is what makes the second equation quadratic.</>,
  },
  {
    working: <Katex display tex="a^2+2b^2 = 22" />,
    reason: <>Dividing through by <Katex tex="2" />.</>,
  },
  {
    working: <Katex display tex="a = 5-b \implies (5-b)^2+2b^2 = 22" />,
    reason: <>Substituting the linear equation into the quadratic one.</>,
  },
  {
    working: <Katex display tex="25-10b+b^2+2b^2 = 22 \implies 3b^2-10b+3 = 0" />,
    reason: <>Expanding and collecting.</>,
  },
  {
    working: <Katex display tex="(3b-1)(b-3) = 0 \implies b = \frac13 \ \text{ or } \ b = 3" />,
    reason: <>Two roots, and the question says <Katex tex="a" /> and <Katex tex="b" /> are integers.</>,
  },
  {
    working: <Katex display tex="b=\frac13 \text{ rejected (not an integer)}" />,
    reason: <>State the rejection explicitly — the report names failing to do so as a common problem. (For completeness, <Katex tex="b=\tfrac13" /> would give <Katex tex="a=\tfrac{14}{3}" />, which also fails.)</>,
  },
  {
    working: <Katex display tex="\boxed{a = 2, \quad b = 3}" />,
    reason: <>Check both conditions: <Katex tex="2(2)+2(3)=10" /> ✓ and <Katex tex="2(4)+4(9)=8+36=44" /> ✓. The report also warns that an answer stated with no working scores poorly on a four-mark question, however right it is.</>,
  },
]

export default function SpecialistQ4_2018Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (4 marks)</p>
        <p className="mb-2">
          <Katex tex="X" /> and <Katex tex="Y" /> are independent random variables. The mean
          and the variance of <Katex tex="X" /> are both <Katex tex="2" />, while the mean and
          the variance of <Katex tex="Y" /> are <Katex tex="2" /> and <Katex tex="4" />{' '}
          respectively.
        </p>
        <p>
          Given that <Katex tex="a" /> and <Katex tex="b" /> are integers, find the values of{' '}
          <Katex tex="a" /> and <Katex tex="b" /> if the mean and the variance of{' '}
          <Katex tex="aX+bY" /> are <Katex tex="10" /> and <Katex tex="44" /> respectively.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            Two rules do all the work, and the difference between them is the whole question:
          </p>
          <p>
            <Katex tex="E(aX+bY)=aE(X)+bE(Y)" /> — coefficients come out as they are.
          </p>
          <p>
            <Katex tex="\operatorname{Var}(aX+bY)=a^2\operatorname{Var}(X)+b^2\operatorname{Var}(Y)" />{' '}
            — coefficients come out <em>squared</em>, and this form needs{' '}
            <Katex tex="X" /> and <Katex tex="Y" /> independent.
          </p>
          <p>
            One linear equation and one quadratic gives two solutions, so the stated condition
            that <Katex tex="a" /> and <Katex tex="b" /> are integers is doing real work — it
            is there to be used, and the rejected root should be written down.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
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
