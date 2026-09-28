// 2019 Specialist Mathematics — Exam 2, Section B, Question 4 (11 marks).
// A pyramid on a parallelogram base in 3D: finding the fourth vertex, the angle between two
// edges, the base area, a unit normal, and the volume. Question text transcribed from the
// original paper (no diagram given). Cross-checked against the VCAA examination report and
// itute's independent solutions, and every value verified by computer algebra (C(6, 2, −3),
// cos θ = 4/9, area 2√65, height 36/√65 from every one of AP, BP, CP, DP, volume 24; the report's
// OP slip gives 61/√65 and V = 122/3; the foot of the perpendicular from P is
// A + 19/65 AB − 62/65 AD, outside the base). Solution is original.
//
// Interactive widgets (interactives/spec-2019e2-q4*): a. walk round ABCD in order, with a toggle
// for the report's AB = CD slip (a self-crossing bow-tie); c. a parallelogram with sides 3 and 6
// whose angle you change, against the 3 × 6 rectangle, with cut-and-slide; e. the pyramid in 3D
// with its base flat, splitting a chosen slant edge into its rise along n̂ and a part parallel to
// the base (every base point gives 36/√65; O gives 61/√65), with edge-on and from-above views.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const VertexOrderWidget = lazyWidget(() => import('../interactives/spec-2019e2-q4a-vertex-order'))
const LeanWidget = lazyWidget(() => import('../interactives/spec-2019e2-q4c-lean'))
const HeightWidget = lazyWidget(() => import('../interactives/spec-2019e2-q4e-height'))

const EXAM_A: SAExaminerStats = {
  marks: [46, 19, 35],
  average: 0.9,
  comment: <>A significant proportion of students did not correctly consider the order of the vertices of the parallelogram and consequently set <Katex tex="\overrightarrow{AB}=\overrightarrow{CD}" />. A diagram could assist to avoid this error.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [14, 20, 65],
  average: 1.5,
  comment: <>Use of the scalar product was generally evident. Some students who would otherwise have been successful did not explicitly answer the question and instead found an approximate value of the angle.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [69, 9, 22],
  average: 0.6,
  comment: <>A frequent issue here was the significant proportion of students who multiplied the lengths of two adjacent sides of the parallelogram as if they were finding the area of a rectangle. As for Question 4a., a diagram may help avoid this error.</>,
}

const EXAM_D: SAExaminerStats = {
  marks: [20, 5, 26, 49],
  average: 2.1,
  comment: <>While most students were able to show that the given vector was perpendicular to <Katex tex="\overrightarrow{AB}" /> and <Katex tex="\overrightarrow{AD}" /> some of them did not proceed to find the required unit vector.</>,
}

const EXAM_E: SAExaminerStats = {
  marks: [96, 2, 2],
  average: 0.1,
  comment: <>Very few students approached this problem correctly. The majority of those who attempted it made unfounded assumptions about the height or the layout of the pyramid. Of those who used a scalar resolute to find the height of the pyramid, most incorrectly used <Katex tex="\overrightarrow{OP}" /> rather than a slant edge of the pyramid such as <Katex tex="\overrightarrow{AP}" />.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="ABCD \text{ is a parallelogram} \implies \overrightarrow{AB} = \overrightarrow{DC}" />,
    reason: <>In a parallelogram the two opposite sides are equal <em>as vectors</em>: same length and same direction. The letters tell you the order you walk round the shape, <Katex tex="A\to B\to C\to D\to A" />, so you go out along <Katex tex="AB" /> and come back along <Katex tex="CD" />. That makes <Katex tex="\overrightarrow{AB}" /> equal to <Katex tex="\overrightarrow{DC}" />, not <Katex tex="\overrightarrow{CD}" /> (which points back the other way). The report notes a significant proportion of students set <Katex tex="\overrightarrow{AB}=\overrightarrow{CD}" />; a quick sketch of <Katex tex="ABCD" /> in order avoids this.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\overrightarrow{AB} &= B-A\\ &= (4-2)\underset{\sim}{i}+(-2+1)\underset{\sim}{j}+(1-3)\underset{\sim}{k}\\ &= 2\underset{\sim}{i}-\underset{\sim}{j}-2\underset{\sim}{k}\end{aligned}" />,
    reason: <>We know <Katex tex="A" /> and <Katex tex="B" />, so <Katex tex="\overrightarrow{AB}" /> is the side we can find completely. Any vector between two points is the position vector of the end minus the position vector of the start.</>,
  },
  {
    working: <Katex display tex="\overrightarrow{DC} = C-D = (a-4)\underset{\sim}{i}+(b-3)\underset{\sim}{j}+(c+1)\underset{\sim}{k}" />,
    reason: <>Its partner <Katex tex="\overrightarrow{DC}" /> holds the unknowns, so write it the same way, end minus start.</>,
  },
  {
    working: (
      <>
        <Katex display tex="a-4=2, \quad b-3=-1, \quad c+1=-2" />
      </>
    ),
    reason: <>Two vectors are equal exactly when every component matches: three equations for the three unknowns.</>,
  },
  {
    working: <Katex display tex="\boxed{a=6, \quad b=2, \quad c=-3}" />,
    reason: <>So <Katex tex="C(6,2,-3)" />. Check the other pair of sides as well: <Katex tex="\overrightarrow{BC}=C-B=2\underset{\sim}{i}+4\underset{\sim}{j}-4\underset{\sim}{k}=\overrightarrow{AD}" /> ✓, so <Katex tex="ABCD" /> really is a parallelogram. (The report gets there in one line: <Katex tex="\overrightarrow{OC}=\overrightarrow{OB}+\overrightarrow{AD}" />, since from <Katex tex="B" /> you make the same move as from <Katex tex="A" /> to <Katex tex="D" />.)</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\overrightarrow{AD} = D-A = 2\underset{\sim}{i}+4\underset{\sim}{j}-4\underset{\sim}{k}" />,
    reason: <>The angle between two vectors is measured with them tail to tail. <Katex tex="\overrightarrow{AB}" /> and <Katex tex="\overrightarrow{AD}" /> both start at <Katex tex="A" />, so this is the parallelogram&apos;s angle at <Katex tex="A" />, the same angle part c. needs.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\overrightarrow{AB}\cdot\overrightarrow{AD}\\ &= (2)(2)+(-1)(4)+(-2)(-4)\\ &= 4-4+8 = 8\end{aligned}" />,
    reason: <>The scalar (dot) product is the bridge between what we have (components) and what we want (an angle). Multiply matching components and add.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\left|\overrightarrow{AB}\right| = \sqrt{4+1+4} = 3" />
        <Katex display tex="\left|\overrightarrow{AD}\right| = \sqrt{4+16+16} = \sqrt{36} = 6" />
      </>
    ),
    reason: <>Magnitudes: the square root of the sum of the squared components. Keep these; part c. uses them.</>,
  },
  {
    working: <Katex display tex="\cos\theta = \dfrac{\overrightarrow{AB}\cdot\overrightarrow{AD}}{\left|\overrightarrow{AB}\right|\left|\overrightarrow{AD}\right|} = \dfrac{8}{3\times6} = \dfrac{8}{18}" />,
    reason: <>Rearranging <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{b}=|\underset{\sim}{a}||\underset{\sim}{b}|\cos\theta" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\cos\theta = \dfrac{4}{9}}" />,
    reason: <>Exact form. The question asks for the cosine, not the angle, so stop here; the report notes some students instead found an approximate value of the angle. (For the record, <Katex tex="\theta\approx63.6^\circ" />: acute, because the cosine is positive.)</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Area} = \left|\overrightarrow{AB}\right|\left|\overrightarrow{AD}\right|\sin\theta" />,
    reason: <>Area of a parallelogram is base × <em>perpendicular</em> height. Take <Katex tex="AD" /> as the base; the height is how far <Katex tex="B" /> is above the line <Katex tex="AD" />, which is <Katex tex="\left|\overrightarrow{AB}\right|\sin\theta" />, not the slanted side <Katex tex="\left|\overrightarrow{AB}\right|" /> itself. Simply multiplying the two side lengths, <Katex tex="3\times6" />, treats the base as a rectangle; the report notes a significant proportion of students did this. Change the angle in the diagram below to see the difference.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\sin\theta &= \sqrt{1-\cos^2\theta} = \sqrt{1-\left(\tfrac49\right)^2}\\ &= \sqrt{1-\tfrac{16}{81}} = \sqrt{\dfrac{65}{81}} = \dfrac{\sqrt{65}}{9}\end{aligned}" />,
    reason: <>Part b. gave the cosine, but the area needs the sine: the Pythagorean identity converts one to the other. (Or sketch a right triangle with adjacent side <Katex tex="4" /> and hypotenuse <Katex tex="9" />; the opposite side is <Katex tex="\sqrt{81-16}=\sqrt{65}" />.) Take the positive root, since <Katex tex="0<\theta<\pi" />.</>,
  },
  {
    working: <Katex display tex="\text{Area} = 3\times6\times\dfrac{\sqrt{65}}{9} = \dfrac{18\sqrt{65}}{9}" />,
    reason: <>The side lengths from part b. Read it as base <Katex tex="6" /> times height <Katex tex="3\times\tfrac{\sqrt{65}}{9}=\tfrac{\sqrt{65}}{3}\approx2.69" />, a little less than the side <Katex tex="3" /> because the parallelogram leans.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Area} = 2\sqrt{65} \ \text{ square units}}" />,
    reason: <>About <Katex tex="16.1" />, less than <Katex tex="18" /> as it must be. (The cross product gives the same thing in one step: <Katex tex="\left|\overrightarrow{AB}\times\overrightarrow{AD}\right|=2\sqrt{65}" />.)</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&\left(6\underset{\sim}{i}+2\underset{\sim}{j}+5\underset{\sim}{k}\right)\cdot\overrightarrow{AB}\\ &= (6)(2)+(2)(-1)+(5)(-2)\\ &= 12-2-10 = 0\end{aligned}" />,
    reason: <>&ldquo;Perpendicular&rdquo; is a job for the scalar product: <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{b}=|\underset{\sim}{a}||\underset{\sim}{b}|\cos\theta" /> is zero exactly when <Katex tex="\cos\theta=0" />, i.e. <Katex tex="\theta=90^\circ" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\left(6\underset{\sim}{i}+2\underset{\sim}{j}+5\underset{\sim}{k}\right)\cdot\overrightarrow{AD}\\ &= (6)(2)+(2)(4)+(5)(-4)\\ &= 12+8-20 = 0\end{aligned}" />,
    reason: <>Zero again, so it is perpendicular to <Katex tex="\overrightarrow{AD}" /> as well. As required.</>,
  },
  {
    working: <Katex display tex="\implies 6\underset{\sim}{i}+2\underset{\sim}{j}+5\underset{\sim}{k} \text{ is perpendicular to the base}" />,
    reason: <>This is the &ldquo;hence&rdquo;. <Katex tex="\overrightarrow{AB}" /> and <Katex tex="\overrightarrow{AD}" /> are two non-parallel directions lying in the base, and every direction in the base is a combination of them, so anything perpendicular to both is perpendicular to the whole base.</>,
  },
  {
    working: <Katex display tex="\left|6\underset{\sim}{i}+2\underset{\sim}{j}+5\underset{\sim}{k}\right| = \sqrt{36+4+25} = \sqrt{65}" />,
    reason: <>The question wants a <em>unit</em> vector, so find the length first, ready to scale it down to <Katex tex="1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\hat{\underset{\sim}{n}} = \dfrac{1}{\sqrt{65}}\left(6\underset{\sim}{i}+2\underset{\sim}{j}+5\underset{\sim}{k}\right)}" />,
    reason: <>Dividing by the magnitude keeps the direction and makes the length <Katex tex="1" />. The report notes some students did not proceed to find the required unit vector. (Its negative is equally correct.)</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="V = \dfrac13\times\text{base area}\times\text{height}" />,
    reason: <>Volume of any pyramid, whatever its shape and wherever its apex sits. The base area is part c.; the missing piece is the perpendicular height, the distance from <Katex tex="P" /> to the plane of the base.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\overrightarrow{BP} &= P-B\\ &= (4-4)\underset{\sim}{i}+(-4+2)\underset{\sim}{j}+(9-1)\underset{\sim}{k}\\ &= -2\underset{\sim}{j}+8\underset{\sim}{k}\end{aligned}" />,
    reason: <>&ldquo;Perpendicular to the base&rdquo; is the direction of <Katex tex="\hat{\underset{\sim}{n}}" /> from part d., so the height is how far you travel along <Katex tex="\hat{\underset{\sim}{n}}" /> getting from the base to <Katex tex="P" />. That needs a vector that <b>starts on the base</b> and ends at <Katex tex="P" />: any slant edge will do. <Katex tex="B" /> is convenient here (the report uses <Katex tex="\overrightarrow{AP}=2\underset{\sim}{i}-3\underset{\sim}{j}+6\underset{\sim}{k}" />, which gives the same height). The report notes most students who used a scalar resolute incorrectly used <Katex tex="\overrightarrow{OP}" />, and the origin is not on the base.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{height} &= \left|\overrightarrow{BP}\cdot\hat{\underset{\sim}{n}}\right|\\ &= \left|\dfrac{(0)(6)+(-2)(2)+(8)(5)}{\sqrt{65}}\right| = \dfrac{36}{\sqrt{65}}\end{aligned}" />,
    reason: <>The key idea: the <b>scalar resolute</b> <Katex tex="\overrightarrow{BP}\cdot\hat{\underset{\sim}{n}}" /> is the part of <Katex tex="\overrightarrow{BP}" /> pointing straight out of the base. The rest of <Katex tex="\overrightarrow{BP}" /> runs parallel to the base and adds no height (the diagram below splits it for you). Very few students approached this correctly (96% scored zero); the report says the majority of those who attempted it made unfounded assumptions about the height or the layout of the pyramid. The resolute needs no assumption at all.</>,
  },
  {
    working: <Katex display tex="V = \dfrac13\times2\sqrt{65}\times\dfrac{36}{\sqrt{65}}" />,
    reason: <>Base area from part c., height from above.</>,
  },
  {
    working: <Katex display tex="\boxed{V = 24 \ \text{ cubic units}}" />,
    reason: <>The <Katex tex="\sqrt{65}" /> cancels, a good sign the setup is right. (With the cross product: <Katex tex="\tfrac13\left|\overrightarrow{AP}\cdot\left(\overrightarrow{AB}\times\overrightarrow{AD}\right)\right|=\tfrac13\times72=24" /> ✓.)</>,
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

      <PartCard letter="a" topic="Vector Coordinates" marks={2} statement={<>Find the values of <Katex tex="a" />, <Katex tex="b" /> and <Katex tex="c" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
        <Explore title="Walk round ABCD in order: why it's AB = DC, not AB = CD">
          <VertexOrderWidget />
        </Explore>
        <WrongMethod
          title="AB and CD are the opposite sides, so AB = CD"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="\overrightarrow{CD}=\overrightarrow{AB} \implies D-C=2\underset{\sim}{i}-\underset{\sim}{j}-2\underset{\sim}{k}" />
              <Katex display tex="\implies C=(2,\,4,\,1)" />
            </>
          }
        >
          <Katex tex="AB" /> and <Katex tex="CD" /> are opposite sides, but <Katex tex="\overrightarrow{CD}" /> runs from{' '}
          <Katex tex="C" /> back towards <Katex tex="D" />, the opposite way to <Katex tex="\overrightarrow{AB}" /> when you
          walk round <Katex tex="ABCD" /> in order. Equating them puts <Katex tex="C" /> where the path{' '}
          <Katex tex="A\to B\to C\to D" /> crosses itself. To catch it, check the other pair of sides: with{' '}
          <Katex tex="C(2,4,1)" />, <Katex tex="\overrightarrow{BC}=-2\underset{\sim}{i}+6\underset{\sim}{j}" />, which is not{' '}
          <Katex tex="\overrightarrow{AD}=2\underset{\sim}{i}+4\underset{\sim}{j}-4\underset{\sim}{k}" />.
        </WrongMethod>
      </PartCard>

      <PartCard letter="b" topic="Angle Between Vectors" marks={2} statement={<>Find the cosine of the angle between the vectors <Katex tex="\overrightarrow{AB}" /> and <Katex tex="\overrightarrow{AD}" />.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard letter="c" topic="Parallelogram Area" marks={2} statement="Find the area of the base of the pyramid." examinerReport={EXAM_C}>
        <WorkingTable rows={ROWS_C} />
        <Explore title="Why the area isn't 3 × 6: leaning the side lowers the height">
          <LeanWidget />
        </Explore>
        <WrongMethod
          title="Area of a parallelogram = side × side"
          source="Examiner's report"
          working={<Katex display tex="\text{Area}=\left|\overrightarrow{AB}\right|\left|\overrightarrow{AD}\right|=3\times6=18" />}
        >
          That is the area of a 3 by 6 <em>rectangle</em>. This parallelogram leans (<Katex tex="\theta\approx63.6^\circ" />,
          not <Katex tex="90^\circ" />), so its height above <Katex tex="AD" /> is{' '}
          <Katex tex="3\sin\theta=\tfrac{\sqrt{65}}{3}\approx2.69" />, not <Katex tex="3" />. A quick check: leaning a shape over
          with the same sides always loses area, so the answer must come out under <Katex tex="18" />. Multiply by{' '}
          <Katex tex="\sin\theta" />; side × side is only right at <Katex tex="90^\circ" />.
        </WrongMethod>
      </PartCard>

      <PartCard letter="d" topic="Unit Normal" marks={3} statement={<>Show that <Katex tex="6\underset{\sim}{i}+2\underset{\sim}{j}+5\underset{\sim}{k}" /> is perpendicular to both <Katex tex="\overrightarrow{AB}" /> and <Katex tex="\overrightarrow{AD}" />, and hence find a unit vector that is perpendicular to the base of the pyramid.</>} examinerReport={EXAM_D}>
        <WorkingTable rows={ROWS_D} />
        <WrongMethod
          title="It's perpendicular to the base, so 6i + 2j + 5k is the answer"
          source="Examiner's report"
          working={<Katex display tex="\left|6\underset{\sim}{i}+2\underset{\sim}{j}+5\underset{\sim}{k}\right|=\sqrt{65}\ne1" />}
        >
          It is perpendicular, but the question asks for a <em>unit</em> vector, and this one is{' '}
          <Katex tex="\sqrt{65}\approx8.06" /> long. &ldquo;Unit&rdquo; is the signal to divide by the magnitude. It matters in
          part e.: a scalar resolute <Katex tex="\underset{\sim}{a}\cdot\hat{\underset{\sim}{n}}" /> only measures a length
          when <Katex tex="\hat{\underset{\sim}{n}}" /> has length <Katex tex="1" />.
        </WrongMethod>
      </PartCard>

      <PartCard letter="e" topic="Pyramid Volume" marks={2} statement="Find the volume of the pyramid." examinerReport={EXAM_E}>
        <Background>
          <p>
            The apex <Katex tex="P" /> is not directly above any convenient point. In fact the foot of the
            perpendicular from <Katex tex="P" /> lands <em>outside</em> the parallelogram: this pyramid leans
            so far that its apex overhangs the base. So the height can&apos;t be read off a coordinate or
            taken from a slant length. Instead, take any vector from the base up to <Katex tex="P" />, and
            find how much of it points along the unit normal from part d. That component <em>is</em> the
            perpendicular height, because the normal is the &ldquo;straight up out of the base&rdquo;
            direction. <Katex tex="V=\tfrac13\times\text{base}\times\text{height}" /> still holds for a
            leaning pyramid, as long as the height is measured perpendicular to the base.
          </p>
        </Background>
        <WorkingTable rows={ROWS_E} />
        <Explore title="The height is the rise along n̂: the same from every point of the base, but not from O">
          <HeightWidget />
        </Explore>
        <WrongMethod
          title="Height = OP · n̂"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="\overrightarrow{OP}\cdot\hat{\underset{\sim}{n}}=\dfrac{(4)(6)+(-4)(2)+(9)(5)}{\sqrt{65}}=\dfrac{61}{\sqrt{65}}" />
              <Katex display tex="V=\dfrac13\times2\sqrt{65}\times\dfrac{61}{\sqrt{65}}=\dfrac{122}{3}" />
            </>
          }
        >
          <Katex tex="\overrightarrow{OP}" /> starts at the origin, and <Katex tex="O" /> is not on the base.{' '}
          <Katex tex="\overrightarrow{OP}\cdot\hat{\underset{\sim}{n}}" /> measures how far <Katex tex="P" /> is above the
          plane through <Katex tex="O" /> parallel to the base: the true height <em>plus</em> <Katex tex="O" />&apos;s own
          distance below the base, <Katex tex="\overrightarrow{OA}\cdot\hat{\underset{\sim}{n}}=\tfrac{25}{\sqrt{65}}" />. Indeed{' '}
          <Katex tex="\tfrac{61}{\sqrt{65}}=\tfrac{25}{\sqrt{65}}+\tfrac{36}{\sqrt{65}}" /> (pick O in the diagram). The vector
          you resolve must run from a point of the base to <Katex tex="P" />: a slant edge{' '}
          <Katex tex="\overrightarrow{AP}" />, <Katex tex="\overrightarrow{BP}" />, <Katex tex="\overrightarrow{CP}" /> or{' '}
          <Katex tex="\overrightarrow{DP}" />.
        </WrongMethod>
        <WrongMethod
          title="The apex is above the centre, so the height is the distance from the centre to P"
          working={
            <>
              <Katex display tex="M=\tfrac12(A+C)=\left(4,\,\tfrac12,\,0\right)" />
              <Katex display tex="\left|\overrightarrow{MP}\right|=\sqrt{0+\tfrac{81}{4}+81}=\tfrac{9\sqrt5}{2}\approx10.06" />
              <Katex display tex="V=\tfrac13\times2\sqrt{65}\times\tfrac{9\sqrt5}{2}=15\sqrt{13}\approx54.1" />
            </>
          }
        >
          Nothing in the question says where the apex sits, and here it is not over the centre, or over the
          base at all: the foot of the perpendicular from <Katex tex="P" /> is outside <Katex tex="ABCD" /> (press
          &ldquo;From above&rdquo; in the diagram). <Katex tex="\left|\overrightarrow{MP}\right|" /> is the length of a
          slanted segment. A height has to be measured perpendicular to the base, which is exactly what the
          resolute along <Katex tex="\hat{\underset{\sim}{n}}" /> does, with no need to know the layout.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
