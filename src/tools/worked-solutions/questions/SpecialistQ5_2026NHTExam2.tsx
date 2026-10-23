// 2026 Specialist NHT — Exam 2, Section B Question 5 (10 marks). The NHT report gives sample
// answers only, with no statistics. Planes: the area of a triangle from a cross product (in the
// form a√b/c with c = a + 1), the Cartesian equation of the plane through the three points, showing
// a plane given in an unusual rearranged form is parallel to 2x − y + z = 6, the values of d that put
// the two parallel planes 2√6 apart, and the values of p that make two planes perpendicular.
// Question text transcribed from the original paper (no diagram). Answers checked with sympy and
// against the VCAA report's sample answers, which agree: a. 8√6/9; b. 2x + y + z = 4; c.ii d = −9 and
// d = 27; d. p = −3/2 and p = 1. The report's sample answer printed under 5ci is a slip: it repeats
// part a.'s area line (½|P1P2 × P1P3| = 8√6/9) rather than anything about parallel planes; the
// working says so. The report's note for b. ("For their left side using their normal from above.")
// is given as the examiner's comment; its step labels in a. and d. are part of the sample answer and
// not repeated. The WrongMethod in c.ii is a verified slip, not taken from the report. Solution is
// original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'

const r = String.raw
const I = r`\underset{\sim}{i}`
const J = r`\underset{\sim}{j}`
const K = r`\underset{\sim}{k}`
const N = r`\underset{\sim}{n}`
const P12 = r`\overrightarrow{P_1P_2}`
const P13 = r`\overrightarrow{P_1P_3}`

const REPORT_B: SAExaminerStats = {
  comment: <>For their left side using their normal from above.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex={r`\begin{aligned}${P12} &= \left(\tfrac43-\tfrac43\right)${I}+\left(0-\tfrac43\right)${J} \\ &\quad +\left(\tfrac43-0\right)${K} \\ &= -\tfrac43${J}+\tfrac43${K} \\[4pt] ${P13} &= \left(0-\tfrac43\right)${I}+\left(2-\tfrac43\right)${J} \\ &\quad +(2-0)${K} \\ &= -\tfrac43${I}+\tfrac23${J}+2${K}\end{aligned}`} />,
    reason: <>Two sides of the triangle from the same vertex, each as &ldquo;end minus start&rdquo;. These two vectors span the triangle.</>,
  },
  {
    working: <Katex display tex={r`${P12}\times${P13} = \begin{vmatrix} ${I} & ${J} & ${K} \\ 0 & -\tfrac43 & \tfrac43 \\ -\tfrac43 & \tfrac23 & 2 \end{vmatrix}`} />,
    reason: <>The magnitude of the cross product of two sides is the area of the parallelogram they make; the triangle is half of it. That is the &ldquo;vector method&rdquo; the question asks for.</>,
  },
  {
    working: <Katex display tex={r`\begin{aligned}&= \left(-\tfrac83-\tfrac89\right)${I} - \left(0+\tfrac{16}{9}\right)${J} + \left(0-\tfrac{16}{9}\right)${K} \\ &= -\tfrac{32}{9}${I}-\tfrac{16}{9}${J}-\tfrac{16}{9}${K} = -\tfrac{16}{9}\left(2${I}+${J}+${K}\right)\end{aligned}`} />,
    reason: <>Expand along the top row, with the minus sign on the <Katex tex={J} /> term. Taking out the common factor makes the magnitude easy.</>,
  },
  {
    working: <Katex display tex={r`\left|${P12}\times${P13}\right| = \tfrac{16}{9}\sqrt{2^2+1^2+1^2} = \tfrac{16\sqrt6}{9}`} />,
  },
  {
    working: <Katex display tex={r`\text{Area} = \tfrac12\left|${P12}\times${P13}\right| = \boxed{\frac{8\sqrt6}{9}}`} />,
    reason: <>In the form <Katex tex={r`\tfrac{a\sqrt b}{c}`} /> with <Katex tex="a=8" />, <Katex tex="b=6" />, <Katex tex="c=9=a+1" />, as required.</>,
    more: <>The condition <Katex tex="c=a+1" /> is a built-in check: if your <Katex tex="a" /> and <Katex tex="c" /> don&apos;t differ by 1, look for an arithmetic slip. Size check: <Katex tex={r`\tfrac{8\sqrt6}{9}\approx2.18`} />, reasonable for a triangle whose sides are about 1.9, 2.5 and 2.5 units.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex={r`${N} = 2${I}+${J}+${K}`} />,
    reason: <>The cross product from part a. is perpendicular to two directions in the plane, so it is normal to the plane. Any non-zero multiple will do; drop the factor <Katex tex={r`-\tfrac{16}{9}`} />.</>,
  },
  {
    working: <Katex display tex={r`2x+y+z = 2(0)+2+2 = 4`} />,
    reason: <>A plane with normal <Katex tex={r`a${I}+b${J}+c${K}`} /> has equation <Katex tex="ax+by+cz=k" />. Find <Katex tex="k" /> by substituting any of the three points; <Katex tex="P_3(0,2,2)" /> has the easiest numbers.</>,
  },
  {
    working: <Katex display tex={r`\boxed{2x+y+z=4}`} />,
    reason: <>Check with the other points: <Katex tex={r`P_1\!: \tfrac83+\tfrac43+0=4`} /> and <Katex tex={r`P_2\!: \tfrac83+0+\tfrac43=4`} />.</>,
    more: <>Any multiple of this equation (for example <Katex tex="-32x-16y-16z=-64" />, straight from the unsimplified cross product) describes the same plane. The report&apos;s note means the mark for the left-hand side follows from whatever normal you found in part a.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex={r`\frac{d-1.5z}{3} = x-\frac12 y \implies d-1.5z = 3x-1.5y`} />,
    reason: <>Rearrange <Katex tex="\Pi_3" /> into the form <Katex tex="ax+by+cz=k" />, so its normal can be read off. Multiply both sides by 3 first.</>,
  },
  {
    working: <Katex display tex={r`\begin{aligned}3x-1.5y+1.5z &= d \\ 2x-y+z &= \tfrac{2d}{3}\end{aligned}`} />,
    reason: <>Collect <Katex tex="x" />, <Katex tex="y" />, <Katex tex="z" /> on the left, then multiply by <Katex tex={r`\tfrac23`} /> to match the coefficients of <Katex tex="\Pi_2" />.</>,
  },
  {
    working: <Katex display tex={r`\begin{aligned}${N}_3 &= 3${I}-1.5${J}+1.5${K} \\ &= 1.5\left(2${I}-${J}+${K}\right) = 1.5\,${N}_2\end{aligned}`} />,
    reason: <>Two planes are parallel when their normals are parallel, that is, one is a scalar multiple of the other.</>,
  },
  {
    working: <Katex display tex={r`\boxed{\text{The normals are parallel, so } \Pi_3 \parallel \Pi_2}`} />,
    reason: <>Both planes have the same left side <Katex tex="2x-y+z" />, differing only in the constant. As required.</>,
    more: <>If <Katex tex={r`\tfrac{2d}{3}=6`} />, i.e. <Katex tex="d=9" />, the two equations are identical and the planes coincide; part c.ii. rules this out by asking for a non-zero distance. (The sample answer the report prints under 5ci repeats part a.&apos;s area calculation, which is a slip; it has nothing to do with this part.)</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex={r`A(0,0,6) \in \Pi_2, \qquad B\left(0,0,\tfrac{2d}{3}\right) \in \Pi_3`} />,
    reason: <>Pick a convenient point on each plane: set <Katex tex="x=y=0" /> in <Katex tex="2x-y+z=6" /> and in <Katex tex={r`2x-y+z=\tfrac{2d}{3}`} /> (the form from part c.i).</>,
  },
  {
    working: <Katex display tex={r`\overrightarrow{AB} = \left(\tfrac{2d}{3}-6\right)${K}, \qquad \hat{${N}} = \frac{2${I}-${J}+${K}}{\sqrt6}`} />,
    reason: <>The distance between parallel planes is measured along the common normal: it is the length of the component of <Katex tex={r`\overrightarrow{AB}`} /> in the normal direction, the scalar resolute onto the unit normal.</>,
  },
  {
    working: <Katex display tex={r`\left|\overrightarrow{AB}\cdot\hat{${N}}\right| = \frac{\left|\tfrac{2d}{3}-6\right|}{\sqrt6} = 2\sqrt6`} />,
    reason: <>The modulus is needed because a distance is positive whichever side of <Katex tex="\Pi_2" /> the plane <Katex tex="\Pi_3" /> lies on.</>,
  },
  {
    working: <Katex display tex={r`\begin{gathered}\left|\tfrac{2d}{3}-6\right| = 12 \implies \tfrac{2d}{3}-6 = \pm 12 \\ \implies \tfrac{2d}{3} = 18 \text{ or } -6\end{gathered}`} />,
    reason: <>Multiply both sides by <Katex tex="\sqrt6" />: <Katex tex={r`2\sqrt6\times\sqrt6=12`} />. A modulus equation has two cases.</>,
  },
  {
    working: <Katex display tex={r`\boxed{d = -9 \ \text{ or } \ d = 27}`} />,
    reason: <>There is one parallel plane on each side of <Katex tex="\Pi_2" /> at the required distance, so two values.</>,
    more: <>Check <Katex tex="d=27" />: <Katex tex={r`\Pi_3\!: 2x-y+z=18`} />, and <Katex tex={r`\tfrac{|18-6|}{\sqrt6}=\tfrac{12}{\sqrt6}=2\sqrt6`} />. For <Katex tex="d=-9" />: <Katex tex={r`2x-y+z=-6`} />, and <Katex tex={r`\tfrac{|-6-6|}{\sqrt6}=2\sqrt6`} />.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex={r`\left(2${I}-${J}+${K}\right)\cdot\left(p^2${I}-(p+2)${J}-5${K}\right) = 0`} />,
    reason: <>Two planes are perpendicular when their normals are perpendicular, so the scalar product of the normals is zero. Read each normal from the coefficients of <Katex tex="x" />, <Katex tex="y" />, <Katex tex="z" />.</>,
  },
  {
    working: <Katex display tex={r`2p^2+(p+2)-5 = 0 \implies 2p^2+p-3 = 0`} />,
    reason: <>Watch the signs: <Katex tex="(-1)\times\big(-(p+2)\big)=+(p+2)" />.</>,
  },
  {
    working: <Katex display tex={r`(2p+3)(p-1) = 0`} />,
  },
  {
    working: <Katex display tex={r`\boxed{p = -\frac32 \ \text{ or } \ p = 1}`} />,
    reason: <>Both values are real, and <Katex tex={r`p\in R`} />, so both are kept.</>,
    more: <>Check <Katex tex="p=1" />: normal <Katex tex={r`${I}-3${J}-5${K}`} />, and <Katex tex="2+3-5=0" />. Check <Katex tex={r`p=-\tfrac32`} />: normal <Katex tex={r`\tfrac94${I}-\tfrac12${J}-5${K}`} />, and <Katex tex={r`\tfrac92+\tfrac12-5=0`} />.</>,
  },
]

export default function SpecialistQ5_2026NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (10 marks)</p>
        <p>
          Consider the three points{' '}
          <Katex tex={r`P_1\left(\frac43,\frac43,0\right)`} />,{' '}
          <Katex tex={r`P_2\left(\frac43,0,\frac43\right)`} /> and <Katex tex="P_3(0,2,2)" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Almost everything about a plane comes from its <b>normal vector</b>, a vector
              perpendicular to it. In <Katex tex="ax+by+cz=k" /> the normal is{' '}
              <Katex tex={r`a${I}+b${J}+c${K}`} />, so you can read it straight off the equation, and
              you can build it from two directions in the plane with a cross product.
            </p>
            <p>
              Planes are parallel when their normals are parallel, and perpendicular when their
              normals are perpendicular (scalar product zero). The distance between two parallel
              planes is measured along the normal.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Area of a Triangle"
        marks={3}
        statement={
          <>
            Using a vector method, find the area of the triangle with vertices <Katex tex="P_1" />,{' '}
            <Katex tex="P_2" /> and <Katex tex="P_3" />.
            <br />
            Give your answer in the form <Katex tex={r`\frac{a\sqrt b}{c}`} />, where{' '}
            <Katex tex={r`a, b, c \in Z^+`} /> and <Katex tex="c=a+1" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Equation of a Plane"
        marks={2}
        statement={
          <>
            The points <Katex tex="P_1" />, <Katex tex="P_2" /> and <Katex tex="P_3" /> lie in the
            plane <Katex tex="\Pi_1" />.
            <br />
            Find the Cartesian equation of this plane.
          </>
        }
        examinerReport={REPORT_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">
          Use the following information to answer part c and part d.
        </p>
        <p>
          Now consider the plane <Katex tex="\Pi_2" /> with equation <Katex tex="2x-y+z=6" />.
        </p>
      </div>

      <PartCard
        letter="c.i"
        topic="Parallel Planes"
        marks={1}
        statement={
          <>
            Show that the plane <Katex tex="\Pi_3" /> given by{' '}
            <Katex tex={r`\frac{d-1.5z}{3}=x-\frac12 y`} />, where <Katex tex={r`d\in R`} />, is
            parallel to the plane <Katex tex="\Pi_2" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Distance Between Planes"
        marks={2}
        statement={
          <>
            Determine the values of <Katex tex="d" /> so that the minimum distance between plane{' '}
            <Katex tex="\Pi_2" /> and plane <Katex tex="\Pi_3" /> is <Katex tex={r`2\sqrt6`} />.
          </>
        }
      >
        <WorkingTable rows={ROWS_CII} />
        <WrongMethod
          title="Use d itself as the constant of plane Π₃"
          working={<Katex display tex={r`\frac{|d-6|}{\sqrt6} = 2\sqrt6 \implies d = -6 \text{ or } 18`} />}
        >
          The constant <Katex tex="d" /> only matches <Katex tex="\Pi_2" />&apos;s 6 once both
          equations have the <em>same</em> left side. In its rearranged form{' '}
          <Katex tex="3x-1.5y+1.5z=d" />, the normal is 1.5 times <Katex tex="\Pi_2" />&apos;s, so
          scale first to <Katex tex={r`2x-y+z=\tfrac{2d}{3}`} /> and compare <Katex tex={r`\tfrac{2d}{3}`} /> with 6.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="d"
        topic="Perpendicular Planes"
        marks={2}
        statement={
          <>
            Consider the plane <Katex tex="\Pi_2" />, and the plane <Katex tex="\Pi_4" /> given by{' '}
            <Katex tex="p^2x-(p+2)y-5z=1" /> for <Katex tex={r`p\in R`} />.
            <br />
            Find the possible values of <Katex tex="p" /> for these two planes to be perpendicular.
          </>
        }
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>
    </div>
  )
}
