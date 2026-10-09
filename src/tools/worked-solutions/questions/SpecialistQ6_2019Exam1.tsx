// 2019 Specialist Mathematics — Exam 1, Question 6 (3 marks).
// Find d so that three given vectors are linearly dependent. Question text transcribed from the
// original paper (no diagram given). Cross-checked against the VCAA examination report and
// itute's independent solutions (m = −10, n = −7, d = 16), and verified by computer algebra
// (including the determinant route and c·(a × b), both 2d − 32 = 0). Solution is original; the
// i and j equations are solved by elimination (2 × i-equation + j-equation), and a cross-product
// alternative is given for students on the 2023+ course.
// Widget: interactives/spec-2019e1-q6-coplanar.tsx — a turnable 3D view of the plane of a and b,
// with c's tip sliding up the vertical line above (−6, 2) as d changes; it meets the plane only at
// d = 16, and "View edge-on" makes on/off the plane obvious.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const CoplanarWidget = lazyWidget(() => import('../interactives/spec-2019e1-q6-coplanar'))

const EXAMINER: SAExaminerStats = {
  marks: [16, 4, 17, 63],
  average: 2.3,
  comment: (
    <>
      This question was handled well with most students being able to write down correct
      simultaneous equations to solve. Occasional arithmetic and transcription errors were
      noted, but a large number were successful in finding the value of <Katex tex="d" />. A
      number of students successfully evaluated a <Katex tex="3\times3" /> determinant in order to
      find the value of <Katex tex="d" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{c} = m\underset{\sim}{a} + n\underset{\sim}{b}" />,
    reason: (
      <>
        First check that <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{b}" /> aren't parallel: to match
        the <Katex tex="\underset{\sim}{i}" />-components, <Katex tex="\underset{\sim}{b}" /> would have to be{' '}
        <Katex tex="-\underset{\sim}{a}" />, but then its <Katex tex="\underset{\sim}{j}" />-component would be{' '}
        <Katex tex="3" />, not <Katex tex="4" />. So <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{b}" />{' '}
        span a plane through the origin, and the three vectors are dependent exactly when{' '}
        <Katex tex="\underset{\sim}{c}" /> lies in that plane — that is, when it can be built out of{' '}
        <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{b}" />. Write that down with two unknown scalars.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} -6\underset{\sim}{i}+2\underset{\sim}{j}+d\underset{\sim}{k} &= m\left(2\underset{\sim}{i}-3\underset{\sim}{j}+4\underset{\sim}{k}\right) \\ &\quad +n\left(-2\underset{\sim}{i}+4\underset{\sim}{j}-8\underset{\sim}{k}\right) \end{aligned}" />,
    reason: <>Substituting the three given vectors.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\underset{\sim}{i}: \quad 2m-2n = -6" />
        <Katex display tex="\underset{\sim}{j}: \quad -3m+4n = 2" />
        <Katex display tex="\underset{\sim}{k}: \quad 4m-8n = d" />
      </>
    ),
    reason: (
      <>
        Two vectors are equal only when all three components match, so this one vector equation is three ordinary
        equations. Now look at where <Katex tex="d" /> appears: only in the <Katex tex="\underset{\sim}{k}" /> equation.
        So the <Katex tex="\underset{\sim}{i}" /> and <Katex tex="\underset{\sim}{j}" /> equations are two equations in
        just <Katex tex="m" /> and <Katex tex="n" /> — solve them first, and the <Katex tex="\underset{\sim}{k}" />{' '}
        equation then tells you what <Katex tex="d" /> has to be.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="2(2m-2n)+(-3m+4n) = 2(-6)+2" />
        <Katex display tex="m = -10" />
      </>
    ),
    reason: (
      <>
        Doubling the <Katex tex="\underset{\sim}{i}" /> equation turns <Katex tex="-2n" /> into <Katex tex="-4n" />, which
        cancels the <Katex tex="+4n" /> in the <Katex tex="\underset{\sim}{j}" /> equation — so add them and{' '}
        <Katex tex="n" /> disappears.
      </>
    ),
  },
  {
    working: <Katex display tex="2(-10)-2n = -6 \implies n = -7" />,
    reason: <>Substitute back into the <Katex tex="\underset{\sim}{i}" /> equation.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} d &= 4m-8n \\ &= 4(-10)-8(-7) \\ &= -40+56 = 16 \end{aligned}" />,
    reason: (
      <>
        Now the <Katex tex="\underset{\sim}{k}" /> equation, held back until now. The first two equations have already
        fixed <Katex tex="m" /> and <Katex tex="n" />, so the third can only hold if <Katex tex="d" /> equals the{' '}
        <Katex tex="\underset{\sim}{k}" />-component of <Katex tex="-10\underset{\sim}{a}-7\underset{\sim}{b}" />. For any
        other <Katex tex="d" />, no choice of <Katex tex="m" /> and <Katex tex="n" /> works and the vectors are
        independent.
      </>
    ),
    more: (
      <>
        In the diagram below, <Katex tex="16" /> is the height of the plane directly above the
        point <Katex tex="(-6,\,2)" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\text{Alternative: } \underset{\sim}{a}\times\underset{\sim}{b} = 8\underset{\sim}{i}+8\underset{\sim}{j}+2\underset{\sim}{k}" />
        <Katex display tex="\underset{\sim}{c}\cdot\left(\underset{\sim}{a}\times\underset{\sim}{b}\right) = -6(8)+2(8)+2d" />
        <Katex display tex="2d-32 = 0 \implies d = 16" />
      </>
    ),
    reason: (
      <>
        If you know the cross product (on the course from 2023): <Katex tex="\underset{\sim}{a}\times\underset{\sim}{b}" />{' '}
        is perpendicular to both <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{b}" />, so it is the
        normal to their plane. <Katex tex="\underset{\sim}{c}" /> lies in that plane exactly when it is perpendicular to
        the normal, i.e. when the dot product is zero.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\text{Alternative: } \begin{vmatrix} 2 & -3 & 4 \\ -2 & 4 & -8 \\ -6 & 2 & d\end{vmatrix} = 0" />
        <Katex display tex="2(4d+16)+3(-2d-48)+4(-4+24) = 0" />
        <Katex display tex="2d-32 = 0 \implies d=16" />
      </>
    ),
    reason: (
      <>
        The same test laid out as a determinant of the three vectors' components. The determinant equals{' '}
        <Katex tex="\underset{\sim}{c}\cdot\left(\underset{\sim}{a}\times\underset{\sim}{b}\right)" />, which is why it
        also comes to <Katex tex="2d-32" />; it is zero exactly when the three vectors lie in one plane. The report notes
        a number of students used this route successfully.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{d = 16}" />,
    reason: (
      <>
        Check: <Katex tex="-10\underset{\sim}{a} = -20\underset{\sim}{i}+30\underset{\sim}{j}-40\underset{\sim}{k}" /> and{' '}
        <Katex tex="-7\underset{\sim}{b} = 14\underset{\sim}{i}-28\underset{\sim}{j}+56\underset{\sim}{k}" /> add to{' '}
        <Katex tex="-6\underset{\sim}{i}+2\underset{\sim}{j}+16\underset{\sim}{k}" />, which is{' '}
        <Katex tex="\underset{\sim}{c}" /> with <Katex tex="d = 16" /> ✓.
      </>
    ),
  },
]

export default function SpecialistQ6_2019Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 6 (3 marks)</p>
        <p>
          Find the value of <Katex tex="d" /> for which the vectors{' '}
          <Katex tex="\underset{\sim}{a}=2\underset{\sim}{i}-3\underset{\sim}{j}+4\underset{\sim}{k}" />,{' '}
          <Katex tex="\underset{\sim}{b}=-2\underset{\sim}{i}+4\underset{\sim}{j}-8\underset{\sim}{k}" /> and{' '}
          <Katex tex="\underset{\sim}{c}=-6\underset{\sim}{i}+2\underset{\sim}{j}+d\underset{\sim}{k}" /> are
          linearly dependent.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            A set of vectors is <b>linearly dependent</b> when at least one of them can be
            written as a combination of the others — in other words, one is redundant. For three
            vectors in space this has a picture. Two non-parallel vectors{' '}
            <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{b}" /> sweep out a plane
            through the origin: every combination <Katex tex="m\underset{\sim}{a}+n\underset{\sim}{b}" />{' '}
            lies in it. So the three vectors are dependent exactly when{' '}
            <Katex tex="\underset{\sim}{c}" /> lies in that same plane; if it points out of the plane,
            the three are independent and between them reach every point of space.
          </p>
          <p>
            In practice the test is: write <Katex tex="\underset{\sim}{c}=m\underset{\sim}{a}+n\underset{\sim}{b}" />,
            compare components to get simultaneous equations, and find the values that make it
            work. (Equivalently, <Katex tex="\underset{\sim}{c}\cdot\left(\underset{\sim}{a}\times\underset{\sim}{b}\right)=0" />,
            or the determinant of the three vectors' components is zero.)
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <Explore title="Dependent means coplanar: c meets the plane of a and b only at d = 16">
          <CoplanarWidget />
        </Explore>
        <SAExaminerReport stats={EXAMINER} maxMarks={3} />
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
