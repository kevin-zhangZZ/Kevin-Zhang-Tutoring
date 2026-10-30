// 2025 Specialist Mathematics — Exam 2, Section B Question 5 (10 marks). Three planes: their
// common point, the line where two of them meet, a point-to-plane distance, and a family of
// planes parallel to the first. Question text transcribed from the original paper. Answers
// checked with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [26.49, 73.51],
  average: 0.73,
  comment: <>This could be found by solving the equations of the planes simultaneously.</>,
}

const EXAM_BI: SAExaminerStats = {
  marks: [27.67, 20.36, 51.97],
  average: 1.24,
  comment: (
    <>
      This could be found using the cross product of the normals to the two planes. Any equivalent
      form of this vector was accepted.
      <br />
      Several responses used CAS to find the solution to the two equations of the planes, but left
      the answer in parametric form or wrote it as the vector equation of a line. The response
      should have then identified the direction vector to answer the question.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [48.82, 51.18],
  average: 0.51,
  comment: (
    <>
      There were many acceptable forms for these equations.
      <br />
      However, some responses gave the Cartesian equation of the line rather than the parametric
      equations and were not awarded the mark.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [22.49, 12.54, 64.97],
  average: 1.42,
  comment: (
    <>
      There were many different methods used to find this answer.
      <br />
      Several response included only the answer so they only gained the answer mark. It is
      essential that students show the mathematics behind their solution to be awarded the full
      marks.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [32.08, 67.92],
  average: 0.67,
  comment: (
    <>
      To show that two planes are parallel, the normals need to be a scalar multiple of each other.
      Many responses did not identify that they were working with the normal vectors of the planes
      and many mixed up the multiple, writing <Katex tex="\dfrac{1}{3}" /> rather than 3.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [41.82, 13.61, 10.77, 33.79],
  average: 1.36,
  comment: (
    <>
      There are several methods that can be used to find this. Many responses did not demonstrate
      that the modulus needed to be used and consequently only one of the solutions was found.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} 2x+9z &= 8 \\ 3x+6y+5z &= 7 \\ x+9y-3z &= 7 \end{aligned}" />,
    reason: <>The common point lies on every plane, so its coordinates satisfy all three equations at once.</>,
  },
  {
    working: <Katex display tex="\text{solve the } 3\times3 \text{ system}" />,
    reason: <>By <Cas fn="solve" />: enter the three equations joined by &ldquo;and&rdquo;, with <Katex tex="\{x,y,z\}" /> as the unknowns.</>,
    more: <>One answer comes back, so the planes meet in a single point (rather than in a line, or not at all).</>,
  },
  {
    working: <Katex display tex="\boxed{(-5,\,2,\,2)}" />,
    reason: <>Check: <Katex tex="2(-5)+9(2)=8" /> ✓, <Katex tex="3(-5)+6(2)+5(2)=7" /> ✓, <Katex tex="-5+9(2)-3(2)=7" /> ✓.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{n_2} = 3\underset{\sim}{i}+6\underset{\sim}{j}+5\underset{\sim}{k}, \qquad \underset{\sim}{n_3} = \underset{\sim}{i}+9\underset{\sim}{j}-3\underset{\sim}{k}" />,
    reason: <>A plane&rsquo;s normal is the coefficients of <Katex tex="x" />, <Katex tex="y" />, <Katex tex="z" /> in its equation.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\text{the line lies in both planes} \\ &\implies \text{it is perpendicular to both normals} \end{aligned}" />,
    reason: <>Any line inside a plane is perpendicular to that plane&rsquo;s normal. A vector perpendicular to two given vectors is their cross product.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{n_2}\times\underset{\sim}{n_3} = \begin{vmatrix}\underset{\sim}{i}&\underset{\sim}{j}&\underset{\sim}{k}\\3&6&5\\1&9&-3\end{vmatrix}" />,
    reason: <>Setting up the determinant: the unit vectors on top, then the components of each normal.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &= \big(6(-3)-5(9)\big)\underset{\sim}{i}-\big(3(-3)-5(1)\big)\underset{\sim}{j} \\ &\quad +\big(3(9)-6(1)\big)\underset{\sim}{k} \\ &= -63\underset{\sim}{i}+14\underset{\sim}{j}+21\underset{\sim}{k} \end{aligned}" />,
    reason: <>Expanding along the top row, minding the minus sign on the middle term.</>,
    more: <>The <Katex tex="\underset{\sim}{j}" /> term is the usual slip: <Katex tex="-\big(3(-3)-5(1)\big) = -(-14) = +14" />. The CAS cross-product command gives the same vector, but write the cross product down so the method is visible.</>,
  },
  {
    working: <Katex display tex="\boxed{-9\underset{\sim}{i}+2\underset{\sim}{j}+3\underset{\sim}{k}}" />,
    reason: <>Dividing by the common factor 7. Any non-zero multiple of this vector is also correct.</>,
    more: <>Check it is perpendicular to both normals: <Katex tex="-27+12+15=0" /> and <Katex tex="-9+18-9=0" />. The report gives <Katex tex="-63\underset{\sim}{i}+14\underset{\sim}{j}+21\underset{\sim}{k}" /> and accepted any equivalent form. It also notes that several students solved the two plane equations on CAS and stopped at the parametric or vector equation of the line. If you go that way, finish the job: the direction vector is the coefficients of the parameter, and that vector is the answer.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="(-5,2,2) \text{ lies on } \Pi_2 \text{ and } \Pi_3" />,
    reason: <>From part a., <Katex tex="(-5,2,2)" /> lies on all three planes, so it is on the line where <Katex tex="\Pi_2" /> and <Katex tex="\Pi_3" /> meet. No need to find a fresh point.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{r} = (-5\underset{\sim}{i}+2\underset{\sim}{j}+2\underset{\sim}{k})+\lambda\left(-9\underset{\sim}{i}+2\underset{\sim}{j}+3\underset{\sim}{k}\right)" />,
    reason: <>A line is a point on it plus any multiple of its direction, here from part b.i.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{aligned} x &= -5-9\lambda \\ y &= 2+2\lambda \\ z &= 2+3\lambda, \quad \lambda\in R \end{aligned}}" />,
    reason: <>One equation per coordinate, each in terms of the parameter <Katex tex="\lambda" />: this is what &ldquo;parametric equations&rdquo; asks for. A Cartesian equation of the line is not parametric and does not earn the mark.</>,
    more: <>Check: in <Katex tex="\Pi_2" />, <Katex tex="3(-5-9\lambda)+6(2+2\lambda)+5(2+3\lambda) = 7" /> for every <Katex tex="\lambda" /> ✓, and in <Katex tex="\Pi_3" />, <Katex tex="(-5-9\lambda)+9(2+2\lambda)-3(2+3\lambda) = 7" /> ✓. The report&rsquo;s answer, <Katex tex="x=-5-63\lambda,\ y=2+14\lambda,\ z=2+21\lambda" />, uses the unsimplified direction; any point on the line and any multiple of the direction gives a correct set. The Cartesian form <Katex tex="\frac{x+5}{-9}=\frac{y-2}{2}=\frac{z-2}{3}" /> describes the same line, but the report says responses that gave this Cartesian form instead of parametric equations were not awarded the mark.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="d = \frac{\left|ax_1+by_1+cz_1-d_0\right|}{\sqrt{a^2+b^2+c^2}}" />,
    reason: <>The shortest distance is measured along the normal: it is the size of the scalar resolute, onto the normal, of a vector from the plane to the point. This formula gives it for the point <Katex tex="(x_1,y_1,z_1)" /> and the plane <Katex tex="ax+by+cz=d_0" />.</>,
    more: <>Where the formula comes from (and a method that works without it): take any point on <Katex tex="\Pi_3" />, say <Katex tex="(7,0,0)" />. The vector from it to <Katex tex="(1,1,2)" /> is <Katex tex="-6\underset{\sim}{i}+\underset{\sim}{j}+2\underset{\sim}{k}" />. Its scalar resolute in the direction of the normal is <Katex tex="\frac{-6+9-6}{\sqrt{91}} = -\frac{3}{\sqrt{91}}" />, and the distance is the size of that, <Katex tex="\frac{3}{\sqrt{91}}" />.</>,
  },
  {
    working: <Katex display tex="\Pi_3: \ x+9y-3z = 7, \qquad \text{point } (1,1,2)" />,
    reason: <>So <Katex tex="a=1,\ b=9,\ c=-3,\ d_0=7" /> and <Katex tex="(x_1,y_1,z_1)=(1,1,2)" />.</>,
  },
  {
    working: <Katex display tex="\left|1+9(1)-3(2)-7\right| = |1+9-6-7| = 3" />,
    reason: <>The numerator. A distance can&rsquo;t be negative, so take the modulus of −3.</>,
  },
  {
    working: <Katex display tex="\sqrt{1^2+9^2+(-3)^2} = \sqrt{91}" />,
    reason: <>The denominator is the length of the normal.</>,
  },
  {
    working: <Katex display tex="\boxed{d = \frac{3}{\sqrt{91}} = \frac{3\sqrt{91}}{91} \approx 0.3145}" />,
    reason: <>Either exact form is fine (the report gives <Katex tex="\frac{3}{\sqrt{91}}" />).</>,
    more: <>The report notes several responses gave only the answer and so earned only one of the two marks. Write the formula with the numbers substituted, as above.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="\Pi_1: \ 2x+9z = 8 \implies \underset{\sim}{n_1} = 2\underset{\sim}{i}+0\underset{\sim}{j}+9\underset{\sim}{k}" />,
    reason: <>The normal is the coefficients of <Katex tex="x" />, <Katex tex="y" />, <Katex tex="z" />. There is no <Katex tex="y" /> term, so the <Katex tex="\underset{\sim}{j}" /> component is 0.</>,
  },
  {
    working: <Katex display tex="\Psi: \ 6x+27z = m \implies \underset{\sim}{n_\Psi} = 6\underset{\sim}{i}+0\underset{\sim}{j}+27\underset{\sim}{k}" />,
    reason: <>The normal of a typical member of the family.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{n_\Psi} = 3\underset{\sim}{n_1}" />,
    reason: <>Each component is 3 times as big: <Katex tex="6=3(2)" />, <Katex tex="0=3(0)" />, <Katex tex="27=3(9)" />.</>,
    more: <>The report notes many responses mixed up the multiple, writing <Katex tex="\tfrac13" /> rather than 3. Check which way round your statement goes: <Katex tex="3\underset{\sim}{n_1} = 6\underset{\sim}{i}+27\underset{\sim}{k} = \underset{\sim}{n_\Psi}" />, whereas <Katex tex="\tfrac13\underset{\sim}{n_\Psi} = \underset{\sim}{n_1}" />. Either true statement shows the normals are parallel; <Katex tex="\underset{\sim}{n_\Psi} = \tfrac13\underset{\sim}{n_1}" /> is false.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{aligned} &\text{the normals are parallel} \\ &\implies \text{the planes are parallel} \end{aligned}}" />,
    reason: <>True for every <Katex tex="m" />, since <Katex tex="m" /> never appears in the normal. As required.</>,
    more: <>The report notes many responses did not identify that they were working with the normal vectors. Name them, as here: it is the normals, not the equations, that are scalar multiples. At <Katex tex="m=24" /> the member of <Katex tex="\Psi" /> is <Katex tex="3\times\Pi_1" />, the same plane as <Katex tex="\Pi_1" />. Coincident planes still have parallel normals, so the statement holds there too (and d.ii.&rsquo;s non-zero distance rules that <Katex tex="m" /> out anyway).</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="3\times\Pi_1: \quad 6x+27z = 24" />,
    reason: <>The parallel-plane distance needs identical <Katex tex="x" />, <Katex tex="y" />, <Katex tex="z" /> coefficients, so multiply <Katex tex="\Pi_1" /> by 3, the multiple from d.i.</>,
    more: <>Skipping this step and comparing 8 with <Katex tex="m" /> mixes two different scalings of the normal and gives wrong values of <Katex tex="m" />.</>,
  },
  {
    working: <Katex display tex="d = \frac{|24-m|}{\sqrt{6^2+0^2+27^2}}" />,
    reason: <>For parallel planes <Katex tex="ax+by+cz=d_1" /> and <Katex tex="ax+by+cz=d_2" />, the distance is <Katex tex="\frac{|d_1-d_2|}{\sqrt{a^2+b^2+c^2}}" />.</>,
    more: <>This is part c.&rsquo;s formula in disguise: every point of <Katex tex="\Pi_1" /> is the same distance from <Katex tex="\Psi" />, so take one, say <Katex tex="(4,0,0)" />. Its distance from <Katex tex="6x+27z=m" /> is <Katex tex="\frac{|6(4)+27(0)-m|}{\sqrt{765}} = \frac{|24-m|}{\sqrt{765}}" />, the same expression.</>,
  },
  {
    working: <Katex display tex="\sqrt{36+729} = \sqrt{765} = \sqrt{9\times85} = 3\sqrt{85}" />,
    reason: <>It matches the denominator in the question, a good sign the setup is right.</>,
  },
  {
    working: <Katex display tex="\frac{|24-m|}{3\sqrt{85}} = \frac{23}{3\sqrt{85}} \implies |24-m| = 23" />,
    reason: <>Same denominators, so the numerators are equal.</>,
  },
  {
    working: <Katex display tex="24-m = 23 \quad \text{or} \quad 24-m = -23" />,
    reason: <>A modulus equal to 23 means the inside is 23 or −23: <Katex tex="\Psi" /> can sit on either side of <Katex tex="\Pi_1" />.</>,
    more: <>This is the trap in this part. The report notes many responses did not demonstrate that the modulus needed to be used, and so found only one of the solutions. Picture the constants as levels: <Katex tex="\Pi_1" /> sits at level 24, and the planes 23 levels away are at <Katex tex="24-23" /> and <Katex tex="24+23" />, one on each side.</>,
  },
  {
    working: <Katex display tex="\boxed{m = 1 \qquad \text{or} \qquad m = 47}" />,
    reason: <>Both are natural numbers, so both are allowed.</>,
    more: <>Check: <Katex tex="|24-1| = 23" /> ✓ and <Katex tex="|24-47| = 23" /> ✓.</>,
  },
]

export default function SpecialistQ5_2025Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (10 marks)</p>
        <p>
          Consider three planes defined by the equations{' '}
          <Katex tex="\Pi_1: 2x+9z = 8" />, <Katex tex="\Pi_2: 3x+6y+5z = 7" /> and{' '}
          <Katex tex="\Pi_3: x+9y-3z = 7" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Almost everything here comes from the normal vectors. Two planes meet in a line
              whose direction is perpendicular to both normals, so the cross product supplies it;
              a point&rsquo;s distance from a plane is measured along the normal; and two planes
              are parallel exactly when their normals are scalar multiples.
            </p>
            <p>
              Part d.ii. is the one that separated the cohort. Scaling{' '}
              <Katex tex="\Pi_1" /> to match the family&rsquo;s left-hand side turns the question
              into a modulus equation in <Katex tex="m" />. Only
              about a third of students scored full marks.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Planes Intersection"
        marks={1}
        statement={<>Find the point of intersection of the three planes.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b.i"
        topic="Line of Intersection"
        marks={2}
        statement={
          <>
            Find a vector that gives the direction of the line of intersection of the planes{' '}
            <Katex tex="\Pi_2" /> and <Katex tex="\Pi_3" />.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Parametric Line"
        marks={1}
        statement={
          <>
            Find a set of parametric equations that give the coordinates of the points that lie
            on this line of intersection.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Distance to Plane"
        marks={2}
        statement={
          <>
            Find the shortest distance from the point <Katex tex="(1,1,2)" /> to the plane{' '}
            <Katex tex="\Pi_3" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">d.</p>
        <p>
          Consider a family of planes, <Katex tex="\Psi" />, with equation{' '}
          <Katex tex="6x+27z = m" />, where <Katex tex="m\in N" />.
        </p>
      </div>

      <PartCard
        letter="d.i"
        topic="Parallel Planes"
        marks={1}
        statement={
          <>
            Show that the plane <Katex tex="\Pi_1" /> is parallel to each member of{' '}
            <Katex tex="\Psi" />.
          </>
        }
        examinerReport={EXAM_DI}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Distance to Plane"
        marks={3}
        statement={
          <>
            Find all values of <Katex tex="m" /> for which the shortest distance between plane{' '}
            <Katex tex="\Pi_1" /> and the plane of the form <Katex tex="6x+27z = m" /> is{' '}
            <Katex tex="\dfrac{23}{3\sqrt{85}}" />.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>
    </div>
  )
}
