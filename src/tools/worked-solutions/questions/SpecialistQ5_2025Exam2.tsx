// 2025 Specialist Mathematics — Exam 2, Section B Question 5 (10 marks). Three planes: their
// common point, the line where two of them meet, a point-to-plane distance, and a family of
// planes parallel to the first. Question text transcribed from the original paper. Answers
// checked with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

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
      This could be found using the cross product of the normals to the two planes. Any
      equivalent form of this vector was accepted. Several responses used CAS to solve the two
      equations but left the answer in parametric form, or wrote it as the vector equation of a
      line, without then identifying the direction vector.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [48.82, 51.18],
  average: 0.51,
  comment: (
    <>
      There were many acceptable forms for these equations. However, some responses gave the
      Cartesian equation of the line rather than the parametric equations and were not awarded
      the mark.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [22.49, 12.54, 64.97],
  average: 1.42,
  comment: (
    <>
      There were many different methods used to find this answer. Several responses included
      only the answer, so they only gained the answer mark. It is essential that students show
      the mathematics behind their solution.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [32.08, 67.92],
  average: 0.67,
  comment: (
    <>
      To show that two planes are parallel, the normals need to be a scalar multiple of each
      other. Many responses did not identify that they were working with the normal vectors,
      and many mixed up the multiple.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [41.82, 13.61, 10.77, 33.79],
  average: 1.36,
  comment: (
    <>
      There are several methods that can be used. Many responses did not demonstrate that the
      modulus needed to be used and consequently only one of the solutions was found.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="2x+9z = 8, \qquad 3x+6y+5z = 7, \qquad x+9y-3z = 7" />,
    reason: 'The three plane equations, to be solved simultaneously.',
  },
  {
    working: <Katex display tex="\text{solve the } 3\times3 \text{ system}" />,
    reason: <>By <Cas fn="solve" /> with the three equations and the three unknowns.</>,
  },
  {
    working: <Katex display tex="\boxed{(-5,\,2,\,2)}" />,
    reason: <>Check: <Katex tex="2(-5)+9(2)=8" /> ✓, <Katex tex="3(-5)+6(2)+5(2)=7" /> ✓, <Katex tex="-5+9(2)-3(2)=7" /> ✓.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{n_2} = 3\underset{\sim}{i}+6\underset{\sim}{j}+5\underset{\sim}{k}, \qquad \underset{\sim}{n_3} = \underset{\sim}{i}+9\underset{\sim}{j}-3\underset{\sim}{k}" />,
    reason: 'The normals are read straight off the coefficients.',
  },
  {
    working: <Katex display tex="\text{the line lies in both planes} \implies \text{it is perpendicular to both normals}" />,
    reason: 'Which is exactly what the cross product produces.',
  },
  {
    working: <Katex display tex="\underset{\sim}{n_2}\times\underset{\sim}{n_3} = \begin{vmatrix}\underset{\sim}{i}&\underset{\sim}{j}&\underset{\sim}{k}\\3&6&5\\1&9&-3\end{vmatrix}" />,
    reason: 'Setting up the determinant.',
  },
  {
    working: <Katex display tex="= \big(6(-3)-5(9)\big)\underset{\sim}{i}-\big(3(-3)-5(1)\big)\underset{\sim}{j}+\big(3(9)-6(1)\big)\underset{\sim}{k} = -63\underset{\sim}{i}+14\underset{\sim}{j}+21\underset{\sim}{k}" />,
    reason: 'Expanding, minding the sign on the middle term.',
  },
  {
    working: <Katex display tex="\boxed{-9\underset{\sim}{i}+2\underset{\sim}{j}+3\underset{\sim}{k}}" />,
    reason: 'Dividing by the common factor 7. Any non-zero multiple was accepted — but a direction vector, not a whole line, had to be named.',
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="(-5,2,2) \text{ lies on } \Pi_2 \text{ and } \Pi_3" />,
    reason: 'From part a. — it lies on all three planes, so it certainly lies on the line where two of them meet. It saves finding a fresh point.',
  },
  {
    working: <Katex display tex="\underset{\sim}{r} = (-5\underset{\sim}{i}+2\underset{\sim}{j}+2\underset{\sim}{k})+\lambda\left(-9\underset{\sim}{i}+2\underset{\sim}{j}+3\underset{\sim}{k}\right)" />,
    reason: 'Point plus a multiple of the direction from part b.i.',
  },
  {
    working: <Katex display tex="\boxed{x = -5-9\lambda, \qquad y = 2+2\lambda, \qquad z = 2+3\lambda}" />,
    reason: <>Three separate parametric equations, <Katex tex="\lambda\in\mathbb{R}" />. A Cartesian form was not accepted here.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="d = \frac{\left|ax_1+by_1+cz_1-d_0\right|}{\sqrt{a^2+b^2+c^2}}" />,
    reason: <>The point-to-plane distance, for the plane <Katex tex="ax+by+cz=d_0" />.</>,
  },
  {
    working: <Katex display tex="\Pi_3: \ x+9y-3z = 7, \qquad \text{point } (1,1,2)" />,
    reason: 'Identifying the pieces.',
  },
  {
    working: <Katex display tex="\left|1+9(1)-3(2)-7\right| = |1+9-6-7| = 3" />,
    reason: 'The numerator. The modulus matters — the raw value is −3.',
  },
  {
    working: <Katex display tex="\sqrt{1^2+9^2+(-3)^2} = \sqrt{91}" />,
    reason: 'The length of the normal.',
  },
  {
    working: <Katex display tex="\boxed{d = \frac{3}{\sqrt{91}} = \frac{3\sqrt{91}}{91} \approx 0.3145}" />,
    reason: 'Rationalised. The working had to be shown — an answer on its own earned only one of the two marks.',
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="\Pi_1: \ 2x+9z = 8 \implies \underset{\sim}{n_1} = 2\underset{\sim}{i}+0\underset{\sim}{j}+9\underset{\sim}{k}" />,
    reason: <>The <Katex tex="y" /> coefficient is zero, which is easy to drop.</>,
  },
  {
    working: <Katex display tex="\Psi: \ 6x+27z = m \implies \underset{\sim}{n_\Psi} = 6\underset{\sim}{i}+0\underset{\sim}{j}+27\underset{\sim}{k}" />,
    reason: 'The normal of a typical member of the family.',
  },
  {
    working: <Katex display tex="\underset{\sim}{n_\Psi} = 3\underset{\sim}{n_1}" />,
    reason: <>Since <Katex tex="6=3(2)" /> and <Katex tex="27=3(9)" />. The multiple is 3, not <Katex tex="\tfrac13" /> — the report notes many got this the wrong way round.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{the normals are parallel} \implies \text{the planes are parallel}}" />,
    reason: <>True for every <Katex tex="m" />, since <Katex tex="m" /> never appears in the normal. (At <Katex tex="m=24" /> the two planes coincide.)</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="3\times\Pi_1: \quad 6x+27z = 24" />,
    reason: 'Scaling Π₁ so that both planes have identical left-hand sides — now the distance formula applies directly.',
  },
  {
    working: <Katex display tex="d = \frac{|24-m|}{\sqrt{6^2+0^2+27^2}}" />,
    reason: 'The distance between two parallel planes is the difference of the constants over the length of the shared normal.',
  },
  {
    working: <Katex display tex="\sqrt{36+729} = \sqrt{765} = \sqrt{9\times85} = 3\sqrt{85}" />,
    reason: 'Which is exactly the denominator given in the question — a useful confirmation that the scaling was right.',
  },
  {
    working: <Katex display tex="\frac{|24-m|}{3\sqrt{85}} = \frac{23}{3\sqrt{85}} \implies |24-m| = 23" />,
    reason: 'The modulus is the whole point: it gives two equations, not one.',
  },
  {
    working: <Katex display tex="24-m = 23 \quad \text{or} \quad 24-m = -23" />,
    reason: 'Ψ can sit on either side of Π₁.',
  },
  {
    working: <Katex display tex="\boxed{m = 1 \qquad \text{or} \qquad m = 47}" />,
    reason: <>Both are natural numbers, so both are admissible. Two-thirds of the cohort found at most one of them.</>,
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
            into <Katex tex="|24-m|=23" /> — and that modulus has <em>two</em> solutions. Only a
            third of students found both.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={<>Find the point of intersection of the three planes.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b.i"
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
          <Katex tex="6x+27z = m" />, where <Katex tex="m\in\mathbb{N}" />.
        </p>
      </div>

      <PartCard
        letter="d.i"
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
