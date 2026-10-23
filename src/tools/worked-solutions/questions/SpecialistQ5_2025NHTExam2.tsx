// 2025 Specialist NHT — Exam 2, Section B Question 5 (10 marks). The NHT report gives sample
// answers only, with no statistics. Four points on a plane through the origin: a linear
// combination of position vectors, a cross product and the plane's Cartesian equation, a second
// plane parallel to a given vector, and the shortest distance from a point to a line. Question
// text transcribed from the original paper (no diagram; the 2025 NHT paper has no text layer, so it
// was read from the page images). Answers checked with sympy and against the VCAA report's sample
// answers, which agree: a. a = −2; b.i −32i + 32j − 16k; b.ii 2x − 2y + z = 0; c. u = −4, 1;
// d. 24√26/13. The report works part c. with TS = 3i + j − 4k (the negative of ST — either is
// parallel to the plane); the working says so. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, DetailOnly } from '../QuestionParts'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}&a\underset{\sim}{i} - 4\underset{\sim}{j} - 4\underset{\sim}{k} \\ &= m\left(-3\underset{\sim}{i} - 4\underset{\sim}{j} - 2\underset{\sim}{k}\right) + n\left(2\underset{\sim}{i} + 3\underset{\sim}{j} + 2\underset{\sim}{k}\right)\end{aligned}" />,
    reason: <>Write each position vector from the coordinates: <Katex tex="\overrightarrow{OP}" /> from <Katex tex="P(a,-4,-4)" />, and so on.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} a &= -3m + 2n \\ -4 &= -4m + 3n \\ -4 &= -2m + 2n \end{aligned}" />,
    reason: <>Two vectors are equal only when their <Katex tex="\underset{\sim}{i}" />, <Katex tex="\underset{\sim}{j}" /> and <Katex tex="\underset{\sim}{k}" /> components are all equal.</>,
  },
  {
    working: <Katex display tex="m = -2, \quad n = -4" />,
    reason: <>The <Katex tex="\underset{\sim}{j}" /> and <Katex tex="\underset{\sim}{k}" /> equations don&apos;t involve <Katex tex="a" />, so solve them first. The third gives <Katex tex="n=m-2" />; then <Katex tex="-4m+3(m-2)=-4" /> gives <Katex tex="m=-2" />.</>,
  },
  {
    working: <Katex display tex="a = -3(-2) + 2(-4) = \boxed{-2}" />,
    reason: <>Substitute into the <Katex tex="\underset{\sim}{i}" /> equation.</>,
    more: <>Check the <Katex tex="\underset{\sim}{j}" /> equation: <Katex tex="-4(-2)+3(-4)=8-12=-4" />. ✓ Writing <Katex tex="\overrightarrow{OP}" /> as a combination of <Katex tex="\overrightarrow{OQ}" /> and <Katex tex="\overrightarrow{OT}" /> means <Katex tex="O" />, <Katex tex="P" />, <Katex tex="Q" /> and <Katex tex="T" /> are coplanar, which fits part b.: <Katex tex="\Pi_1" /> passes through the origin.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\overrightarrow{QT} = 5\underset{\sim}{i} + 7\underset{\sim}{j} + 4\underset{\sim}{k}, \qquad \overrightarrow{QS} = 8\underset{\sim}{i} + 8\underset{\sim}{j}" />,
    reason: <><Katex tex="\overrightarrow{QT}=\overrightarrow{OT}-\overrightarrow{OQ}" />: end point minus start point. Likewise <Katex tex="\overrightarrow{QS}=(5,4,-2)-(-3,-4,-2)" />.</>,
  },
  {
    working: <Katex display tex="\overrightarrow{QT} \times \overrightarrow{QS} = \begin{vmatrix} \underset{\sim}{i} & \underset{\sim}{j} & \underset{\sim}{k} \\ 5 & 7 & 4 \\ 8 & 8 & 0 \end{vmatrix}" />,
    reason: <>Set out the cross product as a determinant, in the order asked (<Katex tex="\overrightarrow{QT}" /> first).</>,
  },
  {
    working: <Katex display tex="= (0-32)\underset{\sim}{i} - (0-32)\underset{\sim}{j} + (40-56)\underset{\sim}{k}" />,
    reason: <>Expand along the top row; the middle term carries a minus sign.</>,
  },
  {
    working: <Katex display tex="\boxed{-32\underset{\sim}{i} + 32\underset{\sim}{j} - 16\underset{\sim}{k}}" />,
    reason: <>Check it is perpendicular to both: with <Katex tex="\overrightarrow{QT}" />, <Katex tex="-160+224-64=0" />; with <Katex tex="\overrightarrow{QS}" />, <Katex tex="-256+256+0=0" />.</>,
    more: <>Reversing the order (<Katex tex="\overrightarrow{QS}\times\overrightarrow{QT}" />) gives the negative of this vector, which is a normal to the plane just as well but is not the cross product asked for.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="-32x + 32y - 16z = d" />,
    reason: <>The cross product of two vectors lying in the plane is perpendicular to it: a normal. A plane with normal <Katex tex="\alpha\underset{\sim}{i}+\beta\underset{\sim}{j}+\gamma\underset{\sim}{k}" /> has equation <Katex tex="\alpha x+\beta y+\gamma z=d" />.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}T(2,3,2): \ -32(2) + 32(3) - 16(2) = d \\ \implies d = 0\end{gathered}" />,
    reason: <>Substitute any point on the plane to find <Katex tex="d" />.</>,
  },
  {
    working: <Katex display tex="-32x + 32y - 16z = 0" />,
  },
  {
    working: <Katex display tex="\boxed{2x - 2y + z = 0}" />,
    reason: <>Divide by <Katex tex="-16" /> to make the coefficient of <Katex tex="z" /> equal to 1, as the form <Katex tex="Ax+By+z=C" /> requires: <Katex tex="A=2" />, <Katex tex="B=-2" />, <Katex tex="C=0" />.</>,
    more: <>Check the other points: <Katex tex="Q" />: <Katex tex="-6+8-2=0" />; <Katex tex="S" />: <Katex tex="10-8-2=0" />; <Katex tex="P(-2,-4,-4)" />: <Katex tex="-4+8-4=0" />. All lie on it, and so does the origin, as part a. suggested.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}\overrightarrow{ST} &= (2-5)\underset{\sim}{i} + (3-4)\underset{\sim}{j} + (2+2)\underset{\sim}{k} \\ &= -3\underset{\sim}{i} - \underset{\sim}{j} + 4\underset{\sim}{k}\end{aligned}" />,
    reason: <>End point <Katex tex="T" /> minus start point <Katex tex="S" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{n}_2 = u^2\underset{\sim}{i} + 9u\underset{\sim}{j} + 3\underset{\sim}{k}" />,
    reason: <>The normal to <Katex tex="\Pi_2" /> is read from the coefficients of <Katex tex="x" />, <Katex tex="y" /> and <Katex tex="z" />.</>,
  },
  {
    working: <Katex display tex="\overrightarrow{ST} \cdot \underset{\sim}{n}_2 = -3u^2 - 9u + 12 = 0" />,
    reason: <>A vector parallel to a plane is perpendicular to the plane&apos;s normal, so their dot product is zero.</>,
    more: <>VCAA&apos;s sample answer uses <Katex tex="\overrightarrow{TS}=3\underset{\sim}{i}+\underset{\sim}{j}-4\underset{\sim}{k}" />, the negative of <Katex tex="\overrightarrow{ST}" />. The equation is the same up to sign, so it makes no difference.</>,
  },
  {
    working: <Katex display tex="u^2 + 3u - 4 = 0 \implies (u+4)(u-1) = 0" />,
    reason: <>Divide by <Katex tex="-3" /> and factorise.</>,
  },
  {
    working: <Katex display tex="\boxed{u = -4 \ \text{ or } \ u = 1}" />,
    reason: <>Check <Katex tex="u=1" />: normal <Katex tex="(1,9,3)" />, and <Katex tex="-3-9+12=0" />. Check <Katex tex="u=-4" />: normal <Katex tex="(16,-36,3)" />, and <Katex tex="-48+36+12=0" />.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{d} = \overrightarrow{TS} = 3\underset{\sim}{i} + \underset{\sim}{j} - 4\underset{\sim}{k}, \qquad \left|\underset{\sim}{d}\right| = \sqrt{26}" />,
    reason: <>The line through <Katex tex="S" /> and <Katex tex="T" /> has direction <Katex tex="\overrightarrow{TS}" /> (from part c., or its negative).</>,
  },
  {
    working: <Katex display tex="\begin{gathered}\overrightarrow{QT} = 5\underset{\sim}{i} + 7\underset{\sim}{j} + 4\underset{\sim}{k} \\ \left|\overrightarrow{QT}\right|^2 = 25+49+16 = 90\end{gathered}" />,
    reason: <>A vector from <Katex tex="Q" /> to a point on the line (from part b.i). The shortest distance is its component <em>perpendicular</em> to the line.</>,
  },
  {
    working: <Katex display tex="\overrightarrow{QT} \cdot \hat{\underset{\sim}{d}} = \frac{15 + 7 - 16}{\sqrt{26}} = \frac{6}{\sqrt{26}}" />,
    reason: <>The scalar resolute of <Katex tex="\overrightarrow{QT}" /> along the line: how far along the line <Katex tex="\overrightarrow{QT}" /> reaches.</>,
  },
  {
    working: <Katex display tex="\text{distance}^2 = 90 - \left(\frac{6}{\sqrt{26}}\right)^2 = 90 - \frac{18}{13} = \frac{1152}{13}" />,
    reason: <>Pythagoras: <Katex tex="\overrightarrow{QT}" /> is the hypotenuse of a right-angled triangle whose other sides are the part along the line and the perpendicular distance.</>,
  },
  {
    working: <Katex display tex="\text{distance} = \frac{\sqrt{1152}}{\sqrt{13}} = \frac{24\sqrt{2}}{\sqrt{13}} = \frac{24\sqrt{26}}{13}" />,
    reason: <><Katex tex="1152=576\times2" />, so <Katex tex="\sqrt{1152}=24\sqrt2" />. Rationalise by multiplying top and bottom by <Katex tex="\sqrt{13}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{24\sqrt{26}}{13}}" />,
    reason: <>In the form <Katex tex="\tfrac{b\sqrt{2c}}{c}" /> with <Katex tex="b=24" />, <Katex tex="c=13" /> (since <Katex tex="26=2\times13" />).</>,
    more: <>Sanity check: <Katex tex="\approx9.41" />, a little less than <Katex tex="|\overrightarrow{QT}|=\sqrt{90}\approx9.49" />, as it must be. The scalar resolute 1.18 is small, so <Katex tex="T" /> is nearly the closest point on the line to <Katex tex="Q" />.</>,
  },
]

export default function SpecialistQ5_2025NHTExam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (10 marks)</p>
        <p>
          The points <Katex tex="P(a,-4,-4)" />, <Katex tex="Q(-3,-4,-2)" />,{' '}
          <Katex tex="S(5,4,-2)" /> and <Katex tex="T(2,3,2)" />, where <Katex tex="a\in R" />, lie
          on the plane <Katex tex="\Pi_1" /> relative to an origin, <Katex tex="O" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Linear Combination"
        marks={2}
        statement={
          <>
            Given <Katex tex="\overrightarrow{OP}=m\overrightarrow{OQ}+n\overrightarrow{OT}" />, where{' '}
            <Katex tex="m,n\in R" />, find the value of <Katex tex="a" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b.i"
        topic="Cross Product"
        marks={1}
        statement={
          <>
            Find the vector cross product{' '}
            <Katex tex="\overrightarrow{QT}\times\overrightarrow{QS}" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Equation of a Plane"
        marks={2}
        statement={
          <>
            Find the Cartesian equation of the plane <Katex tex="\Pi_1" />.
            <br />
            Express your answer in the form <Katex tex="Ax+By+z=C" />, where{' '}
            <Katex tex="A,B,C\in R" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Vector Parallel to Plane"
        marks={2}
        statement={
          <>
            A second plane <Katex tex="\Pi_2" /> has the equation <Katex tex="u^2x+9uy+3z=13" />,
            where <Katex tex="u\in R" />.
            <br />
            Given that the vector <Katex tex="\overrightarrow{ST}" /> is parallel to this plane, find
            the possible values of <Katex tex="u" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_C} />
        <WrongMethod
          title="Parallel to the plane means parallel to its normal"
          working={<Katex display tex="\overrightarrow{ST} = \lambda\left(u^2\underset{\sim}{i}+9u\underset{\sim}{j}+3\underset{\sim}{k}\right)" />}
        >
          That would make <Katex tex="\overrightarrow{ST}" /> perpendicular to the plane, the opposite
          of what is given (and here it has no solution at all: the <Katex tex="\underset{\sim}{k}" />{' '}
          component forces <Katex tex="\lambda=\tfrac43" />, then <Katex tex="9u\lambda=-1" /> and{' '}
          <Katex tex="u^2\lambda=-3" /> can&apos;t both hold). A vector lying along a plane is at right
          angles to the normal: dot product zero.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="d"
        topic="Distance Point to Line"
        marks={3}
        statement={
          <>
            What is the shortest distance from point <Katex tex="Q" /> to the line that passes through
            the points <Katex tex="S" /> and <Katex tex="T" />?
            <br />
            Give your answer in the form <Katex tex="\dfrac{b\sqrt{2c}}{c}" /> where{' '}
            <Katex tex="b,c\in Z" />.
          </>
        }
      >
        <DetailOnly>
          <Background>
            <p>
              The shortest distance from a point to a line is measured at right angles to the line. Take
              any vector from the point to the line (here <Katex tex="\overrightarrow{QT}" />) and split
              it into a part along the line and a part perpendicular to it. The perpendicular part is
              the distance. You can find it directly as the vector resolute perpendicular to the line,
              or, as below, find the part along the line and use Pythagoras.
            </p>
          </Background>
        </DetailOnly>
        <WorkingTable rows={ROWS_D} />
      </PartCard>
    </div>
  )
}
