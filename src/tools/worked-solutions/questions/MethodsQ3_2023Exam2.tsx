// 2023 Mathematical Methods — Exam 2, Section B Question 3 (12 marks). An exponential and
// its tangents, then 2^x − x²: inflection, strict decrease, Newton's method and when it
// breaks. Question text transcribed from the original paper; the graph is our own drawing.
// Answers checked with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import graphSrc from './meth-2023e2-q3-graph.png'

const EXAM_A: SAExaminerStats = {
  marks: [25, 75],
  average: 0.7,
  comment: (
    <>
      Some students did not attempt the question and appear not to have recognised the
      notation <Katex tex="\lim_{x\to-\infty}g(x)" />. A common incorrect answer was 6.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [15, 85],
  average: 0.9,
  comment: <>This question was done well. Some students did not include the base.</>,
}

const EXAM_CI: SAExaminerStats = {
  marks: [48, 52],
  average: 0.5,
  comment: (
    <>
      An equation was required. There were many transcription errors. Some students attempted
      to find the equation by hand, making algebraic errors.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [52, 34, 15],
  average: 0.6,
  comment: (
    <>
      Many misread the question and found the equation of the tangent line at{' '}
      <Katex tex="x=0" />, giving <Katex tex="y=0.693x+6" />.{' '}
      <Katex tex="y=4.255x+8.14\mathrm{E}\!-\!10" /> was often seen — students did not
      recognise that the constant should be zero.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [42, 58],
  average: 0.6,
  comment: (
    <>
      Many students gave the coordinates of the stationary points{' '}
      <Katex tex="(0.49,1.16)" /> and <Katex tex="(3.21,-1.05)" /> rather than the
      coordinates of the point of inflection. There were some rounding errors.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [65, 35],
  average: 0.4,
  comment: (
    <>
      Round brackets were often seen; these were incorrect, as the largest interval was
      required, which included the endpoints. Another incorrect response was{' '}
      <Katex tex="(-\infty,0.49]\cup[3.21,\infty)" />, which is where the function is strictly
      increasing.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [36, 10, 54],
  average: 1.2,
  comment: (
    <>
      Answers were required to three decimal places. Some students only had one correct
      answer; others had rounding errors.
    </>
  ),
}

const EXAM_G: SAExaminerStats = {
  marks: [79, 21],
  average: 0.2,
  comment: <>There were some good explanations. Some students only mentioned the two solutions.</>,
}

const EXAM_H: SAExaminerStats = {
  marks: [86, 12, 3],
  average: 0.2,
  comment: (
    <>
      Many students indicated that <Katex tex="f(x)=0" /> but did not combine it with{' '}
      <Katex tex="f'(x)=0" />. Others found an approximate value such as{' '}
      <Katex tex="n=2.7" />; an exact answer was required.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x\to-\infty \implies 2^x\to0" />,
    reason: 'An exponential with base greater than 1 decays to zero in the negative direction.',
  },
  {
    working: <Katex display tex="\boxed{\lim_{x\to-\infty}g(x) = 0+5 = 5}" />,
    reason: <>The horizontal asymptote. The common wrong answer 6 comes from <Katex tex="2^0=1" /> — but the limit is as <Katex tex="x\to-\infty" />, not at <Katex tex="x=0" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{d}{dx}\left(a^x\right) = \log_e(a)\cdot a^x" />,
    reason: 'The formula-sheet derivative of a general exponential.',
  },
  {
    working: <Katex display tex="g'(x) = \log_e(2)\cdot2^x" />,
    reason: 'The constant 5 differentiates away.',
  },
  {
    working: <Katex display tex="\boxed{k = \log_e(2)}" />,
    reason: <>Write the base: "<Katex tex="\log(2)" />" without a subscript is not the same thing, and the report docks it.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Point: } \left(a,\ 2^a+5\right); \quad \text{gradient: } g'(a) = 2^a\log_e(2)" />,
    reason: 'Both pieces come straight from parts a. and b.',
  },
  {
    working: <Katex display tex="y-\left(2^a+5\right) = 2^a\log_e(2)\,(x-a)" />,
    reason: 'Point–gradient form.',
  },
  {
    working: <Katex display tex="\boxed{y = 2^a\log_e(2)\,x-a\,2^a\log_e(2)+2^a+5}" />,
    reason: <>An <em>equation</em> is required, not just a gradient. The constant term is <Katex tex="-a2^a\log_e(2)+2^a+5" /> — the piece part c.ii. sets to zero.</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Through the origin} \implies \text{the } y\text{-intercept is } 0" />,
    reason: <>Not "the tangent at <Katex tex="x=0" />" — that would give <Katex tex="y=0.693x+6" />, the report's most common misreading.</>,
  },
  {
    working: <Katex display tex="-a\,2^a\log_e(2)+2^a+5 = 0" />,
    reason: 'Setting the constant from part c.i. to zero.',
  },
  {
    working: (
      <Cas fn="solve">
        solve(−a·2^a·ln(2)+2^a+5=0, a)
      </Cas>
    ),
    reason: 'A transcendental equation, so a numerical solve is the intended route.',
  },
  {
    working: <Katex display tex="a = 2.61784\ldots" />,
    reason: 'The point of tangency.',
  },
  {
    working: <Katex display tex="\boxed{y = 4.255x}" />,
    reason: <>The gradient is <Katex tex="2^{2.61785}\log_e(2)=4.25477\ldots" />. A CAS may report the intercept as <Katex tex="8.14\mathrm{E}\!-\!10" />; that is numerical dust and should be written as 0.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="h(x) = 2^x-x^2 \implies h'(x) = \log_e(2)\cdot2^x-2x" />,
    reason: 'First derivative.',
  },
  {
    working: <Katex display tex="h''(x) = \left(\log_e2\right)^2 2^x-2" />,
    reason: <>The point of inflection needs the <em>second</em> derivative — setting <Katex tex="h'=0" /> gives the stationary points, which is what the report says most students handed in.</>,
  },
  {
    working: <Katex display tex="\left(\log_e2\right)^2 2^x = 2 \implies 2^x = \frac{2}{\left(\log_e2\right)^2}" />,
    reason: 'Rearranging.',
  },
  {
    working: <Katex display tex="x = \log_2\!\left(\frac{2}{\left(\log_e2\right)^2}\right) = 2.05753\ldots" />,
    reason: <><Katex tex="h''" /> is increasing, so it changes sign here — a genuine inflection.</>,
  },
  {
    working: <Katex display tex="\boxed{(2.06,\ -0.07)}" />,
    reason: <><Katex tex="h(2.0575)=4.1627-4.2334=-0.0707" />. Two decimal places, as asked.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="h'(x) = \log_e(2)\cdot2^x-2x = 0" />,
    reason: 'Strictly decreasing between the two stationary points.',
  },
  {
    working: (
      <Cas fn="solve">
        solve(ln(2)·2^x−2x=0, x)
      </Cas>
    ),
    reason: 'Two solutions, both needed.',
  },
  {
    working: <Katex display tex="x = 0.48509\ldots \ \text{ and } \ x = 3.21243\ldots" />,
    reason: <>The local maximum and local minimum of <Katex tex="h" />.</>,
  },
  {
    working: <Katex display tex="\boxed{[0.49,\ 3.21]}" />,
    reason: <><strong>Square</strong> brackets: the question asks for the <em>largest</em> interval on which <Katex tex="h" /> is strictly decreasing, and a function is still strictly decreasing on a closed interval whose endpoints are its turning points. Round brackets were the report's main complaint.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="x_{n+1} = x_n-\frac{h(x_n)}{h'(x_n)}, \qquad h'(x) = \log_e(2)\cdot2^x-2x" />,
    reason: "Newton's method, with the derivative from part d.",
  },
  {
    working: <Katex display tex="x_1 = 0-\frac{h(0)}{h'(0)} = 0-\frac{1}{0.69315} = -1.443" />,
    reason: <><Katex tex="h(0)=2^0-0=1" /> and <Katex tex="h'(0)=\log_e2" />.</>,
  },
  {
    working: <Katex display tex="x_2 = -1.443-\frac{h(-1.443)}{h'(-1.443)} = -0.897" />,
    reason: 'Feed the unrounded value back in; rounding at each step is where the report saw errors creep in.',
  },
  {
    working: <Katex display tex="x_3 = -0.773" />,
    reason: 'Three decimal places, as the table asks.',
  },
  {
    working: <Katex display tex="\boxed{x_1 = -1.443,\quad x_2 = -0.897,\quad x_3 = -0.773}" />,
    reason: <>Converging towards the root <Katex tex="x\approx-0.7667" />, the left-hand <Katex tex="x" />-intercept of <Katex tex="h" />.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="\log_e(2)\cdot2^x-2x = h'(x)" />,
    reason: 'Recognise the expression: this is exactly the derivative from part d.',
  },
  {
    working: <Katex display tex="\log_e(2)\cdot2^x-2x = 0 \iff h'(x) = 0" />,
    reason: <>So its solutions are the <Katex tex="x" />-coordinates of the two turning points, <Katex tex="0.49" /> and <Katex tex="3.21" />.</>,
  },
  {
    working: <Katex display tex="x_1 = x_0-\frac{h(x_0)}{h'(x_0)} \ \text{ with } \ h'(x_0) = 0" />,
    reason: 'Division by zero — the first iteration is undefined and the method cannot start.',
  },
  {
    working: <Katex display tex="\boxed{\text{The tangent there is horizontal, so it never meets the } x\text{-axis.}}" />,
    reason: <>The geometric reading of the same fact, and the better answer: Newton's method works by following a tangent to the <Katex tex="x" />-axis, and a horizontal tangent goes nowhere. Naming the two solutions without explaining the consequence earned nothing.</>,
  },
]

const ROWS_H: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = n^x-x^n \ \text{ has a local minimum } \textbf{on the } x\textbf{-axis}" />,
    reason: 'Two conditions at the same point: it is a stationary point, and its height is zero.',
  },
  {
    working: <Katex display tex="f(x) = 0: \ n^x = x^n; \qquad f'(x) = 0: \ n^x\log_e(n) = n\,x^{n-1}" />,
    reason: <>Both are needed. The report says most students wrote one and stopped.</>,
  },
  {
    working: <Katex display tex="\frac{f'}{f}: \quad \log_e(n) = \frac{n\,x^{n-1}}{x^n} = \frac nx \implies x = \frac{n}{\log_e(n)}" />,
    reason: 'Dividing the two equations eliminates the exponentials in one step.',
  },
  {
    working: <Katex display tex="\log\text{ of } n^x = x^n: \quad x\log_e(n) = n\log_e(x)" />,
    reason: 'Taking logs of the first condition.',
  },
  {
    working: <Katex display tex="\frac{n}{\log_e n}\cdot\log_e(n) = n\log_e(x) \implies n = n\log_e(x) \implies x = e" />,
    reason: 'Substituting. Everything collapses.',
  },
  {
    working: <Katex display tex="e = \frac{n}{\log_e(n)} \implies n = e\log_e(n)" />,
    reason: <>Back into <Katex tex="x=\tfrac{n}{\log_e n}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{n = e}" />,
    reason: <>Check: <Katex tex="e\log_e(e)=e" /> ✓. It is the only solution — writing <Katex tex="u=\log_e n" /> turns the equation into <Katex tex="u-\log_e u=1" />, whose unique root is <Katex tex="u=1" />. An exact answer was required, so <Katex tex="2.7" /> scored nothing.</>,
  },
]

export default function MethodsQ3_2023Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (12 marks)</p>
        <p>
          Consider the function <Katex tex="g:\mathbb{R}\to\mathbb{R}" />,{' '}
          <Katex tex="g(x)=2^x+5" />.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Every part turns on knowing <Katex tex="\tfrac{d}{dx}a^x=\log_e(a)\,a^x" />. Parts
            d. to g. all concern the same function <Katex tex="h(x)=2^x-x^2" />, so it is
            worth graphing it once and keeping the picture: two turning points at{' '}
            <Katex tex="x\approx0.49" /> and <Katex tex="3.21" />, an inflection between them,
            and three <Katex tex="x" />-intercepts (one near <Katex tex="-0.77" />, then
            exactly 2 and 4).
          </p>
          <p>
            Part g. is the payoff: Newton's method divides by <Katex tex="h'(x_0)" />, so the
            turning points found in part e. are precisely the starting values that break it.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={
          <>
            State the value of <Katex tex="\displaystyle\lim_{x\to-\infty}g(x)" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={1}
        statement={
          <>
            The derivative, <Katex tex="g'(x)" />, can be expressed in the form{' '}
            <Katex tex="g'(x)=k\cdot2^x" />. Find the real number <Katex tex="k" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c.i"
        marks={1}
        statement={
          <>
            Let <Katex tex="a" /> be a real number. Find, in terms of <Katex tex="a" />, the
            equation of the tangent to <Katex tex="g" /> at the point{' '}
            <Katex tex="\bigl(a,\,g(a)\bigr)" />.
          </>
        }
        examinerReport={EXAM_CI}
      >
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        marks={2}
        statement={
          <>
            Hence, or otherwise, find the equation of the tangent to <Katex tex="g" /> that
            passes through the origin, correct to three decimal places.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p>
          Let <Katex tex="h:\mathbb{R}\to\mathbb{R}" />, <Katex tex="h(x)=2^x-x^2" />.
        </p>
      </div>

      <PartCard
        letter="d"
        marks={1}
        statement={
          <>
            Find the coordinates of the point of inflection for <Katex tex="h" />, correct to
            two decimal places.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="The curve y = 2^x − x² rising to a local maximum near (0.49, 1.17), falling through an inflection at (2.06, −0.07) to a local minimum near (3.21, −1.05), then rising again; the left x-intercept is near x = −0.767"
            className="w-full max-w-[520px]"
          />
        </div>
      </PartCard>

      <PartCard
        letter="e"
        marks={1}
        statement={
          <>
            Find the largest interval of <Katex tex="x" /> values for which <Katex tex="h" />{' '}
            is strictly decreasing. Give your answer correct to two decimal places.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard
        letter="f"
        marks={2}
        statement={
          <>
            Apply Newton's method, with an initial estimate of <Katex tex="x_0=0" />, to find
            an approximate <Katex tex="x" />-intercept of <Katex tex="h" />. Write the
            estimates <Katex tex="x_1" />, <Katex tex="x_2" /> and <Katex tex="x_3" />,
            correct to three decimal places.
          </>
        }
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>

      <PartCard
        letter="g"
        marks={1}
        statement={
          <>
            For the function <Katex tex="h" />, explain why a solution to the equation{' '}
            <Katex tex="\log_e(2)\cdot\left(2^x\right)-2x=0" /> should not be used as an
            initial estimate <Katex tex="x_0" /> in Newton's method.
          </>
        }
        examinerReport={EXAM_G}
      >
        <WorkingTable rows={ROWS_G} />
      </PartCard>

      <PartCard
        letter="h"
        marks={2}
        statement={
          <>
            There is a positive real number <Katex tex="n" /> for which the function{' '}
            <Katex tex="f(x)=n^x-x^n" /> has a local minimum on the <Katex tex="x" />-axis.
            Find this value of <Katex tex="n" />.
          </>
        }
        examinerReport={EXAM_H}
      >
        <WorkingTable rows={ROWS_H} />
      </PartCard>
    </div>
  )
}
