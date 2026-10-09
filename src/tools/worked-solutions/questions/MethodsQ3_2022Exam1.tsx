// 2022 Mathematical Methods — Exam 1 Question 3 (3 marks). When a 2×2 system has
// infinitely many solutions. Question text transcribed from the original paper. Answer
// checked with sympy and against the VCAA examination report. Solution is original.
// Widget: meth-2022e1-q3-same-line — slide k and watch the two lines: k = −9 matches the
// intercepts only (one crossing), k = −5 the gradients only (parallel, no solutions), and only
// k = −3 makes them the same line.
// Report slip (kept verbatim): its determinant-method values "k = 5 and k = −3" should read
// k = −5; flagged in row 5's `more`. The report's "forming ratios" and "solve simultaneously"
// methods are both shown in the last row's `more` (elimination of y gives
// (k+3)(k+5)x = (k+3)(k+9), sympy-checked), and its "set the equations equal" error in the
// Background. Widget audited 9 Oct 2026 (Concise/Detailed pass): readouts and Notices rechecked
// with sympy, kept as is. Final review 9 Oct: row 3 reason now says why k = −8 crosses once
// (the first line is never vertical); elimination route spells out why it must read 0 = 0; the
// widget's warn Notice names the report's "determinant method" instead of an out-of-course term.

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const SameLine = lazyWidget(() => import('../interactives/meth-2022e1-q3-same-line'))

const EXAM: SAExaminerStats = {
  marks: [38, 13, 13, 36],
  average: 1.5,
  comment: (
    <>
      There were multiple ways to approach this question. Students generally approached this
      by either equating gradients and <Katex tex="y" />-intercepts separately, using a
      matrix/determinant method, forming ratios or attempting to solve simultaneously. These
      methods were met with varying degrees of success. Those who knew that the two lines
      needed to be identical were generally successful. Students using the determinant method
      often arrived at <Katex tex="k=5" /> and <Katex tex="k=-3" />, and then did not justify
      which value was valid. Students who set the two initial equations equal to one another
      commonly found they had multiple variables to deal with and consequently could not
      demonstrate how to solve for <Katex tex="k" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered}\text{infinitely many solutions}\\ \iff \text{the lines are identical}\end{gathered}" />,
    reason: (
      <>
        Each equation is a straight line, and a solution is a point on <em>both</em> lines. Two lines
        either cross once (one solution), are parallel and separate (no solutions), or are the same
        line (every point on it is a solution). So we need equal gradients <em>and</em> equal{' '}
        <Katex tex="y" />-intercepts.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned}kx-5y &= 4+k\\ -5y &= -kx+4+k\\ y &= \frac{k}{5}x-\frac{4+k}{5}\end{aligned}" />,
    reason: (
      <>
        Make <Katex tex="y" /> the subject of each equation (the form <Katex tex="y=mx+c" />) so the
        gradients and <Katex tex="y" />-intercepts can be read off and compared. Here: subtract{' '}
        <Katex tex="kx" />, then divide by <Katex tex="-5" />. So <Katex tex="m_1=\tfrac{k}{5}" /> and{' '}
        <Katex tex="c_1=-\tfrac{4+k}{5}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned}3x+(k+8)y &= -1\\ (k+8)y &= -3x-1\\ y &= -\frac{3}{k+8}x-\frac{1}{k+8}\end{aligned}" />,
    reason: (
      <>
        Same again: subtract <Katex tex="3x" />, then divide by <Katex tex="k+8" />. So{' '}
        <Katex tex="m_2=-\tfrac{3}{k+8}" /> and <Katex tex="c_2=-\tfrac{1}{k+8}" />. Dividing needs{' '}
        <Katex tex="k\ne-8" />; at <Katex tex="k=-8" /> this line is vertical but the first line never
        is, so they cross once and <Katex tex="k=-8" /> isn&apos;t the answer.
      </>
    ),
    more: (
      <>
        At <Katex tex="k=-8" /> the second equation is <Katex tex="3x=-1" />, the vertical line{' '}
        <Katex tex="x=-\tfrac13" />. The first line&apos;s <Katex tex="y" /> coefficient is always{' '}
        <Katex tex="-5" />, so it can never be vertical; at <Katex tex="k=-8" /> it is{' '}
        <Katex tex="-8x-5y=-4" />, which meets <Katex tex="x=-\tfrac13" /> at the single point{' '}
        <Katex tex="\left(-\tfrac13,\tfrac43\right)" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned}m_1 &= m_2\\ \frac{k}{5} &= -\frac{3}{k+8}\\ k(k+8) &= -15\\ k^2+8k+15 &= 0\end{aligned}" />,
    reason: (
      <>
        First condition, equal gradients. Multiply both sides by <Katex tex="5(k+8)" />, then bring
        everything to one side.
      </>
    ),
  },
  {
    working: <Katex display tex="(k+3)(k+5) = 0 \implies k = -3 \text{ or } k = -5" />,
    reason: (
      <>
        Equal gradients only makes the lines <em>parallel</em>. Parallel lines can still be separate,
        so each of these values must also be tested on the <Katex tex="y" />-intercepts.
      </>
    ),
    more: (
      <>
        The report&apos;s &ldquo;determinant method&rdquo; comes from matrices, which are no longer in
        the Methods course. Setting that determinant to zero gives this same equation,{' '}
        <Katex tex="k^2+8k+15=0" />, so it only finds the values that make the lines parallel: here,
        two candidates. The report says these students often arrived at two values (its
        &ldquo;<Katex tex="k=5" />&rdquo; is a slip for <Katex tex="k=-5" />) and then did not justify
        which was valid. The intercept check in the next two rows is that justification.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned}c_1 &= c_2\\ -\frac{4+k}{5} &= -\frac{1}{k+8}\\ (4+k)(k+8) &= 5\\ k^2+12k+27 &= 0\end{aligned}" />,
    reason: (
      <>
        Second condition, equal <Katex tex="y" />-intercepts. Multiply both sides by{' '}
        <Katex tex="-5(k+8)" />, then expand: <Katex tex="k^2+12k+32=5" />.
      </>
    ),
  },
  {
    working: <Katex display tex="(k+3)(k+9) = 0 \implies k = -3 \text{ or } k = -9" />,
    reason: (
      <>
        Equal <Katex tex="y" />-intercepts alone is not enough either: at <Katex tex="k=-9" /> the
        gradients differ, so the lines cross only once.
      </>
    ),
    more: (
      <>
        At <Katex tex="k=-9" /> the gradients are <Katex tex="-\tfrac95" /> and <Katex tex="3" />, and both
        lines pass through <Katex tex="(0,1)" /> on the <Katex tex="y" />-axis, so that point is the
        single solution.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{k = -3}" />,
    reason: (
      <>
        The only value in <em>both</em> lists, so the lines are identical. <Katex tex="k=-5" /> is
        rejected: the gradients match but the <Katex tex="y" />-intercepts (<Katex tex="\tfrac15" /> and{' '}
        <Katex tex="-\tfrac13" />) don&apos;t, so the lines are parallel and never meet (no solutions).
      </>
    ),
    more: (
      <>
        <p>
          Check: <Katex tex="k=-3" /> gives <Katex tex="-3x-5y=1" /> and <Katex tex="3x+5y=-1" />;
          multiplying the first by <Katex tex="-1" /> gives the second, so they really are the same
          line. The <Katex tex="k=-5" /> rejection is just as clear in equation form, with no
          gradients needed: the equations become <Katex tex="-5x-5y=-1" /> and{' '}
          <Katex tex="3x+3y=-1" />, that is, <Katex tex="x+y=\tfrac15" /> and{' '}
          <Katex tex="x+y=-\tfrac13" />, and <Katex tex="x+y" /> can&apos;t equal two different numbers.
        </p>
        <p>
          Two other methods the report lists lead to the same two quadratics.{' '}
          <b>Forming ratios:</b> identical lines means one equation is a multiple of the other, so{' '}
          <Katex tex="\tfrac{k}{3}=\tfrac{-5}{k+8}=\tfrac{4+k}{-1}" />. The first equality rearranges
          to <Katex tex="k(k+8)=-15" /> and the second to <Katex tex="(4+k)(k+8)=5" />.{' '}
          <b>Solving simultaneously</b> works if you <em>eliminate</em> a variable (unlike setting the
          two equations equal to each other, which leaves <Katex tex="x" />, <Katex tex="y" /> and{' '}
          <Katex tex="k" /> all in the result): <Katex tex="(k+8)" /> times the first equation plus{' '}
          <Katex tex="5" /> times the second removes <Katex tex="y" /> and leaves{' '}
          <Katex tex="(k^2+8k+15)x=k^2+12k+27" />, that is,{' '}
          <Katex tex="(k+3)(k+5)x=(k+3)(k+9)" />. If <Katex tex="(k+3)(k+5)\ne0" />, this gives exactly
          one <Katex tex="x" /> (and then one <Katex tex="y" />): one solution. Infinitely many needs
          both sides to be zero, which happens only at <Katex tex="k=-3" />; at <Katex tex="k=-5" /> it
          reads <Katex tex="0=-8" />, so there are no solutions.
        </p>
      </>
    ),
  },
]

export default function MethodsQ3_2022Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (3 marks)</p>
        <p>Consider the system of equations</p>
        <p className="py-1">
          <Katex display tex="\begin{aligned}kx-5y &= 4+k\\ 3x+(k+8)y &= -1\end{aligned}" />
        </p>
        <p>
          Determine the value of <Katex tex="k" /> for which the system of equations above
          has an infinite number of solutions.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            The question asks for a value of <Katex tex="k" />, not for a solution{' '}
            <Katex tex="(x,y)" />, so the working has to get rid of <Katex tex="x" /> and{' '}
            <Katex tex="y" /> and end with an equation in <Katex tex="k" /> alone. Setting the two
            equations equal to each other doesn&apos;t do that: the result still contains{' '}
            <Katex tex="x" />, <Katex tex="y" /> and <Katex tex="k" />. The report notes students who
            did this &ldquo;had multiple variables to deal with&rdquo; and could not show how to solve
            for <Katex tex="k" />.
          </p>
          <p>
            Comparing the two lines instead does remove <Katex tex="x" /> and <Katex tex="y" />. The
            gradients and <Katex tex="y" />-intercepts are expressions in <Katex tex="k" /> only, so
            each condition becomes an ordinary equation in <Katex tex="k" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <Explore title="Equal gradients only makes the lines parallel: k = −3 is the one value that makes them the same line">
          <SameLine />
        </Explore>
        <SAExaminerReport stats={EXAM} maxMarks={3} />
        <div>
          <p className="text-[11px] font-bold tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">
            Video Walkthrough
          </p>
          <p className="text-[13px] text-gray-500 dark:text-gray-400 italic">Coming soon.</p>
        </div>
      </div>
    </div>
  )
}
