// 2024 Specialist Mathematics — Exam 1 Question 3 (6 marks). Rewriting a rational function
// in partial-fraction form, then its turning point and a full sketch. Question text
// transcribed from the original paper (2024 papers are image-only, so read from rendered
// pages); the part c. graph is our own drawing of the answer on VCAA's exact grid (x from
// −6.6 to 4.6, y from −2.45 to 6.5, gridlines every 0.5). Answers checked with sympy and
// against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import sketchSrc from './spec-2024e1-q3c-sketch.png'

const EXAM_A: SAExaminerStats = {
  marks: [37, 63],
  average: 0.7,
  comment: (
    <>
      Various methods could be applied here. Although not necessarily efficient, a common
      approach was to perform the division, showing that{' '}
      <Katex tex="f(x)=1+\dfrac{-4x}{(x+1)^2}" />. Partial fractions could then be applied to
      the rational function <Katex tex="\dfrac{-4x}{(x+1)^2}" /> to obtain the desired result.
      <br />
      Some students made errors in manipulating the rational functions.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [12, 23, 65],
  average: 1.6,
  comment: (
    <>
      Students needed to solve <Katex tex="f'(x)=0" />. Many students achieved this by applying
      the quotient rule to <Katex tex="f(x)=\dfrac{(x-1)^2}{(x+1)^2}" />. To avoid using the
      quotient rule, students could simply differentiate the expanded form of the rational
      function <Katex tex="f(x)=1-\dfrac{4}{x+1}+\dfrac{4}{(x+1)^2}" /> to obtain{' '}
      <Katex tex="f'(x)=\dfrac{4}{(x+1)^2}-\dfrac{8}{(x+1)^3}" />.
      <br />
      Some students gave the answer <Katex tex="(1,0)" /> with little or no evidence of working.
      Additional incorrect coordinates were sometimes given.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [51, 13, 25, 10],
  average: 1.0,
  comment: (
    <>
      The graph sketching was not done well, and many students gave no clear indication of the
      correct behaviour of the graph. Additional or incorrect asymptotes were submitted, and some
      students who did have reasonable-looking graphs did not label asymptotes or axis intercepts
      appropriately.
      <br />
      Some students only drew the right-hand branch of the graph. Students were much more
      successful in showing the correct behaviour of the graph on the left-hand side if they
      evaluated the function at several points.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\text{let } u = x+1 \implies x-1 = u-2" />,
    reason: <>With <Katex tex="u=x+1" /> the denominator becomes the single power <Katex tex="u^2" />, so we only need the numerator in powers of <Katex tex="u" />.</>,
    more: <>Two other routes reach the same place. The common one the report describes: divide first, <Katex tex="f(x)=1+\dfrac{-4x}{(x+1)^2}" />, then split <Katex tex="-4x=-4(x+1)+4" />. Or compare coefficients in <Katex tex="(x-1)^2=A(x+1)^2+B(x+1)+C" />: <Katex tex="x=-1" /> gives <Katex tex="C=4" />, the <Katex tex="x^2" /> terms give <Katex tex="A=1" />, and <Katex tex="x=0" /> gives <Katex tex="1=1+B+4" />, so <Katex tex="B=-4" />. The substitution avoids most of the algebra slips the report mentions.</>,
  },
  {
    working: <Katex display tex="(x-1)^2 = (u-2)^2 = u^2-4u+4" />,
    reason: <>Expanding in the new variable, using <Katex tex="x-1=(x+1)-2=u-2" />.</>,
  },
  {
    working: <Katex display tex="f(x) = \frac{u^2-4u+4}{u^2} = 1-\frac4u+\frac{4}{u^2}" />,
    reason: <>Dividing each term of the numerator by <Katex tex="u^2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\begin{aligned} &f(x) = 1-\frac{4}{x+1}+\frac{4}{(x+1)^2} \\ &A=1,\ B=-4,\ C=4 \end{aligned}}" />,
    reason: <>Substituting <Katex tex="u=x+1" /> back. Check at <Katex tex="x=0" />: <Katex tex="1-4+4=1" />, and <Katex tex="f(0)=\tfrac{1}{1}=1" />, which agree. As required.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = 1-4(x+1)^{-1}+4(x+1)^{-2}" />,
    reason: <>Part a.'s form written with negative powers — differentiating these is quicker and safer than the quotient rule on the original.</>,
  },
  {
    working: <Katex display tex="f'(x) = 4(x+1)^{-2}-8(x+1)^{-3}" />,
    reason: <>Chain rule on each power, <Katex tex="\tfrac{d}{dx}(x+1)^n=n(x+1)^{n-1}" />: <Katex tex="-4\times(-1)=4" /> and <Katex tex="4\times(-2)=-8" />.</>,
  },
  {
    working: <Katex display tex="= \frac{4(x+1)-8}{(x+1)^3} = \frac{4x-4}{(x+1)^3}" />,
    reason: <>Writing <Katex tex="4(x+1)^{-2}" /> as <Katex tex="\tfrac{4(x+1)}{(x+1)^3}" /> gives one fraction, so only the numerator decides where <Katex tex="f'(x)=0" />.</>,
  },
  {
    working: <Katex display tex="f'(x) = 0 \implies 4x-4 = 0 \implies x = 1" />,
    reason: <>A fraction is zero only when its numerator is, and <Katex tex="4x-4=0" /> has the single solution <Katex tex="x=1" /> — the one turning point the stem promises.</>,
  },
  {
    working: <Katex display tex="f(1) = \frac{(1-1)^2}{(1+1)^2} = 0" />,
    reason: <>Substituting back into the original rule.</>,
  },
  {
    working: <Katex display tex="\boxed{(1,\ 0)}" />,
    reason: <>A minimum: <Katex tex="f\ge0" /> everywhere, so a zero value has to be the lowest point. That also makes it the <Katex tex="x" />-intercept, which part c. needs.</>,
    more: <>The report notes some answers had little or no working, and some listed extra coordinates. With 2 marks, show <Katex tex="f'(x)" /> and the equation <Katex tex="f'(x)=0" />, then give this single point only — the stem says there is exactly one turning point.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="x+1 = 0 \implies \text{vertical asymptote } x = -1" />,
    reason: <>The one excluded value. Near it the numerator is close to <Katex tex="4" /> and <Katex tex="(x+1)^2" /> is a small positive number, so <Katex tex="f\to+\infty" /> on <em>both</em> sides.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &x\to\pm\infty \implies \frac{4}{x+1},\ \frac{4}{(x+1)^2} \to 0 \\ &\implies \text{horizontal asymptote } y = 1 \end{aligned}" />,
    reason: <>Read straight off part a.'s form: both fractions vanish far out, leaving <Katex tex="1" />.</>,
    more: <>The report notes additional or incorrect asymptotes were submitted. The repeated factor <Katex tex="(x+1)^2" /> gives just one vertical asymptote, and because top and bottom have equal degree the far-out behaviour is the horizontal line <Katex tex="y=1" /> — there is nothing else.</>,
  },
  {
    working: <Katex display tex="f(x)-1 = -\frac{4}{x+1}+\frac{4}{(x+1)^2} = \frac{-4x}{(x+1)^2}" />,
    reason: <>The sign of <Katex tex="f(x)-1" /> says which side of <Katex tex="y=1" /> the curve is on. The denominator is a square, so positive, and the sign is that of <Katex tex="-4x" />: above <Katex tex="y=1" /> for <Katex tex="x<0" />, on it at <Katex tex="x=0" />, below for <Katex tex="x>0" />.</>,
    more: <>This one fact settles both branches: the left branch (<Katex tex="x<-1" />) lies entirely above <Katex tex="y=1" />, and the right branch crosses <Katex tex="y=1" /> once, at <Katex tex="x=0" />. A curve may cross its horizontal asymptote — the asymptote only describes behaviour as <Katex tex="x\to\pm\infty" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} &\text{intercepts: } (1,0) \text{ from part b.,} \\ &\text{and } f(0) = 1 \implies (0,1) \end{aligned}" />,
    reason: <>Both must be labelled with coordinates. The <Katex tex="y" />-intercept <Katex tex="(0,1)" /> is exactly where the curve crosses <Katex tex="y=1" />.</>,
    more: <>The report notes that some students with reasonable-looking graphs did not label asymptotes or axis intercepts appropriately — those labels carry marks.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} x<-1: \quad & f(-2)=9,\ f(-3)=4, \\ & f(-6)=\tfrac{49}{25}\approx2.0 \end{aligned}" />,
    reason: <>A few values pin down the left branch: it comes down from <Katex tex="+\infty" /> near <Katex tex="x=-1" /> and levels off towards <Katex tex="y=1" /> from <em>above</em>.</>,
    more: <>The report notes some students only drew the right-hand branch, and that students were much more successful on the left-hand side if they evaluated the function at several points. Here <Katex tex="f(-6)\approx2" /> is still well above 1, so the branch approaches the asymptote slowly — don't flatten it onto <Katex tex="y=1" /> too early.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} x>-1:\quad & f\to+\infty \text{ as } x\to-1^+, \\ & \text{down through } (0,1) \\ & \text{to the minimum } (1,0), \\ & \text{then up towards } y=1 \end{aligned}" />,
    reason: <>From part b., <Katex tex="f'(x)=\tfrac{4(x-1)}{(x+1)^3}" /> is negative on <Katex tex="(-1,1)" /> and positive for <Katex tex="x>1" />: it falls to <Katex tex="(1,0)" />, then rises but stays below <Katex tex="y=1" /> since <Katex tex="f(x)<1" /> for <Katex tex="x>0" />.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={sketchSrc}
          alt="The answer on VCAA's grid (x from about −6.6 to 4.6, y from about −2.4 to 6.5): two branches either side of the dashed asymptote x = −1, both approaching the dashed asymptote y = 1 far out; the left branch rises from about 1.8 at the left edge to +∞ at x = −1, the right branch falls from +∞ through the labelled point (0, 1) to the labelled minimum (1, 0) and then rises back towards y = 1"
          className="w-full max-w-[540px]"
        />
      </div>
    ),
    reason: <>Asymptotes labelled with their equations and both intercepts with their coordinates, as the question asks.</>,
  },
]

export default function SpecialistQ3_2024Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (6 marks)</p>
        <p>
          Let <Katex tex="f:R\setminus\{-1\}\to R" />,{' '}
          <Katex tex="f(x)=\dfrac{(x-1)^2}{(x+1)^2}" />.
        </p>
        <p>
          The rule <Katex tex="f(x)" /> can be written in the form{' '}
          <Katex tex="f(x)=A+\dfrac{B}{x+1}+\dfrac{C}{(x+1)^2}" />, where{' '}
          <Katex tex="A,B,C\in Z" />.
        </p>
      </div>

      <DetailOnly>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
          <Background>
            <p>
              Part a. is worth doing properly because it pays for the rest of the question. In
              the form <Katex tex="1-\tfrac{4}{x+1}+\tfrac{4}{(x+1)^2}" /> the horizontal
              asymptote <Katex tex="y=1" /> is visible at a glance, and differentiating two
              powers beats the quotient rule on the original.
            </p>
            <p>
              The graph in part c. has an unusual feature worth watching for: the curve{' '}
              <em>crosses</em> its own horizontal asymptote, at the <Katex tex="y" />-intercept.
              Part c.'s working shows how the sign of <Katex tex="f(x)-1" /> reveals this.
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard
        letter="a"
        topic="Partial Fractions"
        marks={1}
        statement={<>Show that <Katex tex="A=1" />, <Katex tex="B=-4" /> and <Katex tex="C=4" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Turning Point"
        marks={2}
        statement={
          <>
            The graph of <Katex tex="f" /> has one turning point.
            <br />
            Find the coordinates of this turning point.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Sketch Graph"
        marks={3}
        statement={
          <>
            Sketch the graph of <Katex tex="y=f(x)" /> on the set of axes below. Label the
            asymptotes with their equations and the axial intercepts with their coordinates.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
