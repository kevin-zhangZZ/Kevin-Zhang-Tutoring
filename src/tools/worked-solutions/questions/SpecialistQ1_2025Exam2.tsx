// 2025 Specialist Mathematics — Exam 2, Section B Question 1 (10 marks). A rational function
// with a cubic denominator: sketch, volume of revolution, then a family of curves where the
// constant in the denominator controls the stationary point, the asymptotes and the
// inflection. Question text transcribed from the original paper; the part a. answer is our
// own drawing on VCAA's exact grid (x from −4 to 4 with gridlines every 0.5, y from −2 to 2
// with gridlines every 0.25). Answers checked with sympy and against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import sketchSrc from './spec-2025e2-q1a-sketch.png'

const EXAM_A: SAExaminerStats = {
  marks: [6.97, 17.07, 35.07, 40.9],
  average: 2.09,
  comment: (
    <>
      Many graphs were not accurately drawn. To improve accuracy, students can sketch the function
      on their CAS calculator and set the domain, range and scale to match those provided in the
      question.
      <br />
      Some responses did not include the coordinates of the maximum in exact form, but rounded to
      1 decimal place.
      <br />
      Care must be taken with the shape of the graph, with asymptotic behaviour and smooth curves.
      <br />
      Several responses, incorrectly, sketched the point of inflection as a stationary one.
      <br />
      Many responses did not label the horizontal asymptote <Katex tex="y=0" />.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [9.9, 90.1],
  average: 0.9,
  comment: <>Students must make sure variables are defined if they are being used in formulas.</>,
}

const EXAM_BII: SAExaminerStats = {
  marks: [18.51, 81.49],
  average: 0.81,
  comment: (
    <>
      This is obtained using CAS with the equation from part 1b.i.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [26.47, 73.53],
  average: 0.73,
  comment: (
    <>
      Vertical asymptotes are found by equating the denominator to 0.
      <br />
      This question specified that separate equations should be written for each asymptote, but
      many responses did not include this.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [15.68, 84.32],
  average: 0.84,
  comment: (
    <>
      The stationary point <Katex tex="P" /> is where <Katex tex="x=1" />. So this{' '}
      <Katex tex="y" /> coordinate is found by substituting <Katex tex="x=1" /> into{' '}
      <Katex tex="y(x)" />.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [54.15, 45.85],
  average: 0.45,
  comment: (
    <>
      If there are no stationary points, then there must be an asymptote at <Katex tex="x=1" />{' '}
      and this gives <Katex tex="a=-3" />. Solve <Katex tex="x^3-3x+2=0" /> to find the equations
      of the asymptotes.
    </>
  ),
}

const EXAM_DIII: SAExaminerStats = {
  marks: [20.12, 9.09, 70.78],
  average: 1.5,
  comment: (
    <>
      Found by equating the second derivative at <Katex tex="x=2" /> to 0.
      <br />
      Students must show an appropriate method to gain both marks.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x^3+x+2 = (x+1)(x^2-x+2)" />,
    reason: <>Vertical asymptotes come from the denominator's zeros. Trying the factors of 2 (<Katex tex="\pm1,\ \pm2" />): <Katex tex="x=-1" /> works, since <Katex tex="-1-1+2=0" />.</>,
    more: <>So <Katex tex="(x+1)" /> is a factor, and dividing it out leaves <Katex tex="x^2-x+2" />. On CAS, factor or <Cas fn="solve" /> gives the same thing.</>,
  },
  {
    working: <Katex display tex="x^2-x+2: \ \Delta = 1-8 = -7 < 0" />,
    reason: <>No further real roots, so there is exactly one vertical asymptote.</>,
  },
  {
    working: <Katex display tex="\text{vertical asymptote: } x = -1" />,
    reason: <>The numerator is 3x = −3 there, not zero, so the graph really does blow up.</>,
    more: <>Which way it blows up: just left of <Katex tex="x=-1" /> the denominator and the numerator are both negative, so <Katex tex="y\to+\infty" />; just right of it the denominator is positive, so <Katex tex="y\to-\infty" />. That is why the left branch climbs up the asymptote and the right branch comes up from below.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\deg(\text{denominator}) > \deg(\text{numerator}) \\ &\implies y \to 0 \text{ as } x\to\pm\infty\end{aligned}" />,
    reason: <>Horizontal asymptote y = 0 (the x-axis), which must be labelled.</>,
    more: <>For large <Katex tex="|x|" /> the rule behaves like <Katex tex="\dfrac{3x}{x^3}=\dfrac{3}{x^2}" />, which is positive and tends to 0, so both branches approach the x-axis from above at the far ends of the grid. The report notes many responses did not label <Katex tex="y=0" /> — easy to forget because the axis is already drawn.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} y' &= \frac{3(x^3+x+2)-3x(3x^2+1)}{(x^3+x+2)^2} \\ &= \frac{6-6x^3}{(x^3+x+2)^2}\end{aligned}" />,
    reason: <>Quotient rule, then collecting. The denominator is a square, so only the numerator can change sign.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&6-6x^3 = 0 \implies x = 1 \\ &\implies y = \frac{3}{1+1+2} = \frac{3}{4}\end{aligned}" />,
    reason: <>The only stationary point. <Katex tex="y'>0" /> for <Katex tex="x<1" /> and <Katex tex="y'<0" /> for <Katex tex="x>1" />, so <Katex tex="\left(1,\tfrac34\right)" /> is a maximum.</>,
    more: <>Label it exactly: the report notes some responses rounded the maximum to 1 decimal place, but only the point of inflection was to be rounded. The sign pattern comes from <Katex tex="6-6x^3=6(1-x^3)" />, positive for <Katex tex="x<1" /> and negative for <Katex tex="x>1" /> (so the left branch, <Katex tex="x<-1" />, is increasing throughout).</>,
  },
  {
    working: <Katex display tex="y'' = 0 \implies x = 1.6864\ldots \implies y = 0.5964\ldots" />,
    reason: <>Define y on CAS and solve <Katex tex="y''=0" /> with <Cas fn="solve" />: there is one real solution. <Katex tex="y''" /> changes sign there and <Katex tex="y'\neq0" />, so it is a non-stationary inflection. To one decimal place: <Katex tex="(1.7,\,0.6)" />.</>,
    more: <>The numerator of <Katex tex="y''" /> is <Katex tex="6(3x^5-x^3-12x^2-2)" />, whose only real zero is <Katex tex="x\approx1.686" />, so this is the only point of inflection: <Katex tex="y''<0" /> just before and <Katex tex="y''>0" /> just after. Since <Katex tex="x>1" />, <Katex tex="y'<0" /> there — the curve is still falling, so draw it sloping, not flat. The report notes several responses wrongly sketched it as a stationary point.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={sketchSrc}
          alt="The answer on VCAA's grid (x from −4 to 4, y from −2 to 2): a left branch rising from just above the x-axis to +∞ at the dashed asymptote x = −1, and a right branch rising from −∞ through the origin to the maximum (1, 3/4), passing the inflection (1.7, 0.6) and decaying towards the asymptote y = 0"
          className="w-full max-w-[520px]"
        />
      </div>
    ),
    reason: <>Both branches drawn, <Katex tex="x=-1" /> and <Katex tex="y=0" /> labelled, and the inflection shown as a non-stationary point.</>,
    more: <>As the report suggests, graph the function on CAS with the window set to the question's axes (<Katex tex="-4\le x\le4" />, <Katex tex="-2\le y\le2" />) and copy its shape: smooth curves that approach the asymptotes without crossing <Katex tex="x=-1" />, the right branch passing through the origin, and both branches ending close to the x-axis at the edges of the grid.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\int_{a}^{b} y^2\,dx" />,
    reason: <>The disc formula for rotation about the x-axis.</>,
  },
  {
    working: <Katex display tex="\text{region: } 0 \le x \le 2" />,
    reason: <>The y-axis (<Katex tex="x=0" />) closes the region on the left, where the curve passes through the origin; the line <Katex tex="x=2" /> closes it on the right.</>,
    more: <>On <Katex tex="0\le x\le2" /> the curve is never below the x-axis, so the region is one piece between the curve and the x-axis, and rotating it gives a solid made of discs of radius <Katex tex="y" />.</>,
  },
  {
    working: <Katex display tex="\boxed{V = \pi\int_0^2\left(\frac{3x}{x^3+x+2}\right)^2dx}" />,
    reason: <>Write the rule in full in place of <Katex tex="y" /> — part b.ii. does the evaluating.</>,
    more: <>The report reminds students that any variable used in a formula must be defined. Writing just <Katex tex="\pi\int_0^2 y^2\,dx" />, or <Katex tex="\pi\int_0^2 f(x)^2\,dx" /> without saying what <Katex tex="f" /> is, does not pin down the solid; substituting the rule avoids the problem.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\pi\int_0^2\left(\frac{3x}{x^3+x+2}\right)^2dx = 2.28801\ldots" />,
    reason: <>Evaluate the part b.i. integral by <Cas fn="nInt" /> — there is no useful antiderivative here.</>,
  },
  {
    working: <Katex display tex="\boxed{V \approx 2.29 \text{ cubic units}}" />,
    reason: <>Two decimal places, as asked.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="x^3-5x+2 = 0" />,
    reason: <>Vertical asymptotes occur where the denominator vanishes and the numerator does not.</>,
  },
  {
    working: <Katex display tex="x = 2 \text{ is a root}: \ 8-10+2 = 0" />,
    reason: <>Trying the factors of the constant term (<Katex tex="\pm1,\ \pm2" />) finds it quickly.</>,
    more: <>This is Exam 2, so <Cas fn="solve" /> on <Katex tex="x^3-5x+2=0" /> gives all three exact roots at once; the factorising here shows where they come from.</>,
  },
  {
    working: <Katex display tex="x^3-5x+2 = (x-2)(x^2+2x-1)" />,
    reason: <>Dividing out the known factor.</>,
  },
  {
    working: <Katex display tex="x^2+2x-1 = 0 \implies x = \frac{-2\pm\sqrt{8}}{2} = -1\pm\sqrt2" />,
    reason: <>Completing the square or the quadratic formula.</>,
  },
  {
    working: <Katex display tex="\boxed{x = 2, \qquad x = -1+\sqrt2, \qquad x = -1-\sqrt2}" />,
    reason: <>Three separate equations, as the question asks.</>,
    more: <>None of these is cancelled by the numerator: <Katex tex="3x" /> is zero only at <Katex tex="x=0" />, which is not a root of the denominator. A single combined statement such as <Katex tex="x=2,\ -1\pm\sqrt2" /> is not three separate equations.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="y(x) = \frac{3x}{x^3+ax+2}" />,
    reason: <>The family, with a as the parameter.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} y' &= \frac{3(x^3+ax+2)-3x(3x^2+a)}{(x^3+ax+2)^2} \\ &= \frac{6-6x^3}{(x^3+ax+2)^2}\end{aligned}" />,
    reason: <>Quotient rule, as in part a. The <Katex tex="3ax" /> terms cancel, so a disappears from the numerator entirely.</>,
  },
  {
    working: <Katex display tex="6-6x^3 = 0 \implies x = 1 \quad \text{for every } a" />,
    reason: <>A stationary point needs <Katex tex="y'=0" />, so it always sits at x = 1 — the key fact for part d.ii.</>,
  },
  {
    working: <Katex display tex="\boxed{y_P = \frac{3}{1+a+2} = \frac{3}{a+3}}" />,
    reason: <>Substituting x = 1 into the rule.</>,
    more: <>This needs <Katex tex="a\neq-3" />: when <Katex tex="a=-3" /> the denominator is 0 at <Katex tex="x=1" />, so the graph has no point there at all. That is exactly the case part d.ii. is about, and why this part says to consider the case where the graph has a stationary point.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{the only candidate is } x = 1 \text{ (part d.i.)}" />,
    reason: <>If x = 1 is in the domain, <Katex tex="y'(1)=0" /> for every a. So no stationary point means x = 1 is not in the domain.</>,
    more: <>Over half of students scored 0 here. The trap is to start from scratch — say, hunting for values of a that make <Katex tex="y'=0" /> unsolvable. But part d.i. already fixed where any stationary point must be, so the only question is which a removes <Katex tex="x=1" /> from the domain.</>,
  },
  {
    working: <Katex display tex="1+a+2 = 0 \implies a = -3" />,
    reason: <>The denominator <Katex tex="x^3+ax+2" /> must be zero at x = 1.</>,
  },
  {
    working: <Katex display tex="x^3-3x+2 = (x-1)^2(x+2)" />,
    reason: <>Factorising with <Katex tex="a=-3" /> (we know <Katex tex="x-1" /> is a factor). The numerator <Katex tex="3x" /> is 3 at x = 1 and −6 at x = −2, so neither zero cancels.</>,
    more: <>Check: with <Katex tex="a=-3" />, <Katex tex="y'=\dfrac{6(1-x^3)}{(x-1)^4(x+2)^2}=\dfrac{-6(x^2+x+1)}{(x-1)^3(x+2)^2}" />, and <Katex tex="x^2+x+1" /> has no real zeros, so there really are no stationary points.</>,
  },
  {
    working: <Katex display tex="\boxed{x = 1 \qquad \text{and} \qquad x = -2}" />,
    reason: <>Again as two separate equations. The repeated factor still gives a genuine asymptote, not a hole.</>,
  },
]

const ROWS_DIII: WorkingRow[] = [
  {
    working: <Katex display tex="y' = \frac{6-6x^3}{D^2}, \qquad D = x^3+ax+2" />,
    reason: <>From part d.i. Naming the denominator keeps the next line readable.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} y'' &= \frac{-18x^2D^2-2D\left(6-6x^3\right)\left(3x^2+a\right)}{D^4} \\ &= \frac{-18x^2D-12\left(1-x^3\right)\left(3x^2+a\right)}{D^3}\end{aligned}" />,
    reason: <>Quotient rule again, with <Katex tex="\tfrac{d}{dx}(D^2)=2D\,D'" /> and <Katex tex="D'=3x^2+a" /> (chain rule). Then cancel one factor of D.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&x = 2: \\ &-18(4)(8+2a+2) \\ &\quad -12(1-8)(12+a) = 0\end{aligned}" />,
    reason: <>At a point of inflection <Katex tex="y''=0" />. A fraction is zero when its numerator is, so set the numerator to 0 at x = 2.</>,
    more: <>With <Katex tex="x=2" />: <Katex tex="x^2=4" />, <Katex tex="D=8+2a+2" />, <Katex tex="1-x^3=-7" /> and <Katex tex="3x^2+a=12+a" />. The report says an appropriate method must be shown for both marks, so write this equation down even if CAS solves it.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&-72(10+2a)+84(12+a) \\ &= -720-144a+1008+84a \\ &= 288-60a\end{aligned}" />,
    reason: <>Expanding and collecting.</>,
  },
  {
    working: <Katex display tex="288-60a = 0 \implies \boxed{a = \frac{24}{5}}" />,
    reason: <>Equivalently, define y on CAS and solve <Katex tex="y''(2)=0" /> for a with <Cas fn="solve" />.</>,
    more: <>Check it is a genuine inflection: with <Katex tex="a=\tfrac{24}{5}" /> the denominator's only real zero is near <Katex tex="x=-0.40" />, so <Katex tex="x=2" /> is in the domain, and <Katex tex="y''" /> changes sign there (about <Katex tex="-0.012" /> at <Katex tex="x=1.9" /> and <Katex tex="+0.010" /> at <Katex tex="x=2.1" />).</>,
  },
]

export default function SpecialistQ1_2025Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (10 marks)</p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Everything in this question turns on the denominator. Its real zeros give the
              vertical asymptotes; its degree being higher than the numerator&rsquo;s gives the
              horizontal asymptote <Katex tex="y=0" />; and, once the quotient rule is applied,
              the <Katex tex="ax" /> term cancels out of the numerator of{' '}
              <Katex tex="y'" /> altogether.
            </p>
            <p>
              That last cancellation is the key to part d.: whatever <Katex tex="a" /> is, the
              only stationary point sits at <Katex tex="x=1" />. So &ldquo;no stationary
              points&rdquo; can only mean that <Katex tex="x=1" /> has been removed from the
              domain — which pins <Katex tex="a" /> down immediately.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Sketch Graph"
        marks={3}
        statement={
          <>
            Sketch the graph of <Katex tex="y(x) = \dfrac{3x}{x^3+x+2}" /> on the axes below.
            <br />
            Label the asymptotes with their equations, and label the turning point and the point
            of inflection with their coordinates. Give the coordinates of the point of inflection
            correct to one decimal place.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b.i"
        topic="Volume of Revolution"
        marks={1}
        statement={
          <>
            The region bounded by the graph of <Katex tex="y = \dfrac{3x}{x^3+x+2}" />, the
            coordinate axes and the line <Katex tex="x = 2" /> is rotated about the{' '}
            <Katex tex="x" />-axis to form a solid of revolution. Write down a definite integral
            that, when evaluated, will give the volume of the solid of revolution.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Volume of Revolution"
        marks={1}
        statement={<>Find the volume of the solid of revolution correct to two decimal places.</>}
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Asymptotes"
        marks={1}
        statement={
          <>
            Find the equations of the vertical asymptotes of the curve given by{' '}
            <Katex tex="y = \dfrac{3x}{x^3-5x+2}" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">d.</p>
        <p>
          A family of curves is given by <Katex tex="y(x) = \dfrac{3x}{x^3+ax+2}" />, where{' '}
          <Katex tex="a\in R" />.
        </p>
      </div>

      <PartCard
        letter="d.i"
        topic="Stationary Point"
        marks={1}
        statement={
          <>
            Consider the case where the graph has a stationary point <Katex tex="P" />.
            <br />
            Find the <Katex tex="y" />-coordinate of <Katex tex="P" /> in terms of <Katex tex="a" />.
          </>
        }
        examinerReport={EXAM_DI}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Asymptotes"
        marks={1}
        statement={
          <>
            For a given value of <Katex tex="a" />, the graph has no stationary points.
            <br />
            Find the equations of the vertical asymptotes of the graph in this case.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>

      <PartCard
        letter="d.iii"
        topic="Point of Inflection"
        marks={2}
        statement={
          <>
            For a given value of <Katex tex="a" />, the graph will have a point of inflection at{' '}
            <Katex tex="x = 2" />.
            <br />
            Find the value of <Katex tex="a" />.
          </>
        }
        examinerReport={EXAM_DIII}
      >
        <WorkingTable rows={ROWS_DIII} />
      </PartCard>
    </div>
  )
}
