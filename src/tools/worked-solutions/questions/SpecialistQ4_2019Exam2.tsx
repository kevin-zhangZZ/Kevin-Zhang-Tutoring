// 2019 Specialist Mathematics — Exam 2, Section B, Question 4 (11 marks).
// A pyramid on a parallelogram base in 3D: finding the fourth vertex, the angle between two
// edges, the base area, a unit normal, and the volume. Question text transcribed from the
// original paper (no diagram given). Cross-checked against the VCAA examination report and
// itute's independent solutions, and every value verified by computer algebra.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [46, 19, 35],
  average: 0.9,
  comment: <>Many students did not use the parallelogram property correctly, or matched the wrong pair of sides.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [14, 20, 65],
  average: 1.5,
  comment: <>Most students applied the scalar product formula correctly.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [69, 9, 22],
  average: 0.6,
  comment: <>This question was not well done. Many students did not connect the angle found in part (b) to the area formula, or used <Katex tex="\cos" /> where <Katex tex="\sin" /> was required.</>,
}

const EXAM_D: SAExaminerStats = {
  marks: [20, 5, 26, 49],
  average: 2.1,
  comment: <>Most students showed the two scalar products were zero. Some did not go on to divide by the magnitude to produce a <em>unit</em> vector.</>,
}

const EXAM_E: SAExaminerStats = {
  marks: [96, 2, 2],
  average: 0.1,
  comment: <>This question was very poorly done. Few students realised the height of the pyramid is the scalar resolute of a vector from the base to the apex in the direction of the unit normal.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="ABCD \text{ is a parallelogram} \implies \overrightarrow{AB} = \overrightarrow{DC}" />,
    reason: <>In a parallelogram the two opposite sides are equal <em>as vectors</em> — same length and same direction. Watch the lettering: going round the shape <Katex tex="A\to B\to C\to D" />, the side <Katex tex="AB" /> is opposite <Katex tex="DC" /> (not <Katex tex="CD" />, which points the other way).</>,
  },
  {
    working: <Katex display tex="\overrightarrow{AB} = B-A = (4-2)\underset{\sim}{i}+(-2+1)\underset{\sim}{j}+(1-3)\underset{\sim}{k} = 2\underset{\sim}{i}-\underset{\sim}{j}-2\underset{\sim}{k}" />,
  },
  {
    working: <Katex display tex="\overrightarrow{DC} = C-D = (a-4)\underset{\sim}{i}+(b-3)\underset{\sim}{j}+(c+1)\underset{\sim}{k}" />,
  },
  {
    working: (
      <>
        <Katex display tex="a-4=2, \quad b-3=-1, \quad c+1=-2" />
      </>
    ),
    reason: <>Equate components.</>,
  },
  {
    working: <Katex display tex="\boxed{a=6, \quad b=2, \quad c=-3}" />,
    reason: <>So <Katex tex="C(6,2,-3)" />. Check: <Katex tex="\overrightarrow{DC}=2\underset{\sim}{i}-\underset{\sim}{j}-2\underset{\sim}{k}=\overrightarrow{AB}" /> ✓</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\overrightarrow{AD} = D-A = 2\underset{\sim}{i}+4\underset{\sim}{j}-4\underset{\sim}{k}" />,
  },
  {
    working: <Katex display tex="\overrightarrow{AB}\cdot\overrightarrow{AD} = (2)(2)+(-1)(4)+(-2)(-4) = 4-4+8 = 8" />,
    reason: <>The scalar (dot) product: multiply matching components and add.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\left|\overrightarrow{AB}\right| = \sqrt{4+1+4} = 3" />
        <Katex display tex="\left|\overrightarrow{AD}\right| = \sqrt{4+16+16} = \sqrt{36} = 6" />
      </>
    ),
  },
  {
    working: <Katex display tex="\cos\theta = \dfrac{\overrightarrow{AB}\cdot\overrightarrow{AD}}{\left|\overrightarrow{AB}\right|\left|\overrightarrow{AD}\right|} = \dfrac{8}{3\times6} = \dfrac{8}{18}" />,
  },
  {
    working: <Katex display tex="\boxed{\cos\theta = \dfrac{4}{9}}" />,
    reason: <>Positive, so the angle at <Katex tex="A" /> is acute.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Area} = \left|\overrightarrow{AB}\right|\left|\overrightarrow{AD}\right|\sin\theta" />,
    reason: <>Area of a parallelogram is base × perpendicular height, and the perpendicular height is the second side times <Katex tex="\sin" /> of the angle between them. Note <Katex tex="\sin" />, not <Katex tex="\cos" /> — the report flags that swap.</>,
  },
  {
    working: <Katex display tex="\sin\theta = \sqrt{1-\cos^2\theta} = \sqrt{1-\left(\tfrac49\right)^2} = \sqrt{1-\tfrac{16}{81}} = \sqrt{\dfrac{65}{81}} = \dfrac{\sqrt{65}}{9}" />,
    reason: <>Using the Pythagorean identity with part (b)'s value. <Katex tex="\sin\theta>0" /> since <Katex tex="0<\theta<\pi" />.</>,
  },
  {
    working: <Katex display tex="\text{Area} = 3\times6\times\dfrac{\sqrt{65}}{9} = \dfrac{18\sqrt{65}}{9}" />,
  },
  {
    working: <Katex display tex="\boxed{\text{Area} = 2\sqrt{65} \ \text{ square units}}" />,
    reason: <>About <Katex tex="16.1" />. (The cross product gives the same thing in one step: <Katex tex="\left|\overrightarrow{AB}\times\overrightarrow{AD}\right|=2\sqrt{65}" />.)</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\left(6\underset{\sim}{i}+2\underset{\sim}{j}+5\underset{\sim}{k}\right)\cdot\overrightarrow{AB} = (6)(2)+(2)(-1)+(5)(-2) = 12-2-10 = 0" />,
    reason: <>A zero scalar product means the two vectors are perpendicular.</>,
  },
  {
    working: <Katex display tex="\left(6\underset{\sim}{i}+2\underset{\sim}{j}+5\underset{\sim}{k}\right)\cdot\overrightarrow{AD} = (6)(2)+(2)(4)+(5)(-4) = 12+8-20 = 0" />,
  },
  {
    working: <Katex display tex="\implies 6\underset{\sim}{i}+2\underset{\sim}{j}+5\underset{\sim}{k} \text{ is perpendicular to the plane of the base}" />,
    reason: <><Katex tex="\overrightarrow{AB}" /> and <Katex tex="\overrightarrow{AD}" /> are two non-parallel directions lying in the base, so anything perpendicular to both is perpendicular to the whole base plane.</>,
  },
  {
    working: <Katex display tex="\left|6\underset{\sim}{i}+2\underset{\sim}{j}+5\underset{\sim}{k}\right| = \sqrt{36+4+25} = \sqrt{65}" />,
  },
  {
    working: <Katex display tex="\boxed{\hat{\underset{\sim}{n}} = \dfrac{1}{\sqrt{65}}\left(6\underset{\sim}{i}+2\underset{\sim}{j}+5\underset{\sim}{k}\right)}" />,
    reason: <>Dividing by the magnitude is what makes it a <em>unit</em> vector — the step the report says students most often skipped.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="V = \dfrac13\times\text{base area}\times\text{height}" />,
    reason: <>Volume of any pyramid. The base area is part (c); the only missing piece is the perpendicular height.</>,
  },
  {
    working: <Katex display tex="\overrightarrow{BP} = P-B = (4-4)\underset{\sim}{i}+(-4+2)\underset{\sim}{j}+(9-1)\underset{\sim}{k} = -2\underset{\sim}{j}+8\underset{\sim}{k}" />,
    reason: <>Any vector from a point on the base to the apex will do — <Katex tex="B" /> is convenient here.</>,
  },
  {
    working: <Katex display tex="\text{height} = \left|\overrightarrow{BP}\cdot\hat{\underset{\sim}{n}}\right| = \left|\dfrac{(0)(6)+(-2)(2)+(8)(5)}{\sqrt{65}}\right| = \dfrac{36}{\sqrt{65}}" />,
    reason: <>This is the key idea: the height is the <b>scalar resolute</b> of <Katex tex="\overrightarrow{BP}" /> in the direction of the unit normal — the part of <Katex tex="\overrightarrow{BP}" /> that points straight out of the base. Almost no one saw this (96% scored zero).</>,
  },
  {
    working: <Katex display tex="V = \dfrac13\times2\sqrt{65}\times\dfrac{36}{\sqrt{65}}" />,
  },
  {
    working: <Katex display tex="\boxed{V = 24 \ \text{ cubic units}}" />,
    reason: <>The <Katex tex="\sqrt{65}" /> cancels — a strong sign the setup is right.</>,
  },
]

export default function SpecialistQ4_2019Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (11 marks)</p>
        <p>
          The base of a pyramid is the parallelogram <Katex tex="ABCD" /> with vertices at points{' '}
          <Katex tex="A(2,-1,3)" />, <Katex tex="B(4,-2,1)" />, <Katex tex="C(a,b,c)" /> and{' '}
          <Katex tex="D(4,3,-1)" />. The apex (top) of the pyramid is located at{' '}
          <Katex tex="P(4,-4,9)" />.
        </p>
      </div>

      <div className="text-[13px] leading-relaxed">
        <Background title="Before You Start">
          <p>
            Every part here runs on the same two tools. The <b>scalar (dot) product</b>{' '}
            <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{b}=|\underset{\sim}{a}||\underset{\sim}{b}|\cos\theta" />{' '}
            measures how much two vectors point the same way — it gives angles, and it is zero
            exactly when they are perpendicular. The <b>scalar resolute</b>{' '}
            <Katex tex="\underset{\sim}{a}\cdot\hat{\underset{\sim}{b}}" /> measures how far{' '}
            <Katex tex="\underset{\sim}{a}" /> reaches in the direction of{' '}
            <Katex tex="\underset{\sim}{b}" />, which is exactly what "perpendicular height above
            a plane" means.
          </p>
        </Background>
      </div>

      <PartCard letter="a" marks={2} statement={<>Find the values of <Katex tex="a" />, <Katex tex="b" /> and <Katex tex="c" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" marks={2} statement={<>Find the cosine of the angle between the vectors <Katex tex="\overrightarrow{AB}" /> and <Katex tex="\overrightarrow{AD}" />.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard letter="c" marks={2} statement="Find the area of the base of the pyramid." examinerReport={EXAM_C}>
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard letter="d" marks={3} statement={<>Show that <Katex tex="6\underset{\sim}{i}+2\underset{\sim}{j}+5\underset{\sim}{k}" /> is perpendicular to both <Katex tex="\overrightarrow{AB}" /> and <Katex tex="\overrightarrow{AD}" />, and hence find a unit vector that is perpendicular to the base of the pyramid.</>} examinerReport={EXAM_D}>
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard letter="e" marks={2} statement="Find the volume of the pyramid." examinerReport={EXAM_E}>
        <Background>
          <p>
            The apex <Katex tex="P" /> is not directly above any convenient corner, so the height
            can't just be read off a coordinate. Instead: take any vector from the base up to{' '}
            <Katex tex="P" />, and find how much of it points along the unit normal from part
            (d). That component <em>is</em> the perpendicular height, because the normal is the
            "straight up out of the base" direction.
          </p>
        </Background>
        <WorkingTable rows={ROWS_E} />
      </PartCard>
    </div>
  )
}
