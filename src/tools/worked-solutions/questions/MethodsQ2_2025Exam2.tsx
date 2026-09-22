// 2025 Mathematical Methods — Exam 2, Section B Question 2 (14 marks). A line meeting an
// exponential twice: solving for the two parameters, the area between, the biggest gap,
// inverses, and an antiderivative that cannot fit both points. Question text transcribed
// from the original paper; the stem figure is a crop of VCAA's own artwork. Answers checked
// with sympy and against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import graphSrc from './meth-2025e2-q2-graph.png'

const EXAM_A: SAExaminerStats = {
  marks: [22, 35, 12, 31],
  average: 1.5,
  comment: (
    <>
      This was a "show that" question and students were required to show the algebraic steps.
      Many students were able to set up the two simultaneous equations, but some
      unnecessarily solved for values that were already on the diagram. Some used a
      combination of their CAS and algebraic steps and were unable to gain full marks.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [45, 55],
  average: 0.6,
}

const EXAM_C: SAExaminerStats = {
  marks: [13, 10, 77],
  average: 1.6,
  comment: (
    <>
      Some students set up the correct definite integral but had the wrong answer. Other
      students who wrote the definite integral in terms of <Katex tex="x" /> sometimes made
      transcription errors.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [29, 71],
  average: 0.7,
  comment: (
    <>
      This question was answered well. However, some students wrote the expression for{' '}
      <Katex tex="h(x)" />, not <Katex tex="h'(x)" />.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [44, 56],
  average: 0.6,
  comment: (
    <>
      Some students just gave the <Katex tex="x" />-value. Others gave the coordinates of the
      turning point without stating the maximum value.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [26, 12, 62],
  average: 1.4,
  comment: (
    <>
      This question was answered well. Some students, however, just gave the{' '}
      <Katex tex="x" />-values or the equation for the inverse function.
    </>
  ),
}

const EXAM_FI: SAExaminerStats = {
  marks: [41, 21, 39],
  average: 1.0,
  comment: (
    <>
      Some students substituted the points incorrectly, obtaining the wrong{' '}
      <Katex tex="c" /> values. Others found both values of <Katex tex="c" /> but then did
      not draw the conclusion.
    </>
  ),
}

const EXAM_FII: SAExaminerStats = {
  marks: [62, 11, 28],
  average: 0.7,
  comment: (
    <>
      Some students multiplied by the wrong quantity. Others attempted to solve their
      equations by hand and made algebraic errors.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="(-12,1) \text{ on } g: \quad Ae^{-12k} = 1 \qquad (1)" />,
    reason: 'The two intersection points are given on the diagram, so there is nothing to solve for first.',
  },
  {
    working: <Katex display tex="(2,8) \text{ on } g: \quad Ae^{2k} = 8 \qquad (2)" />,
    reason: 'The second simultaneous equation.',
  },
  {
    working: <Katex display tex="\frac{(2)}{(1)}: \quad e^{14k} = 8" />,
    reason: <>Dividing eliminates <Katex tex="A" /> in one step — the move that makes this algebraic rather than a CAS exercise.</>,
  },
  {
    working: <Katex display tex="14k = \log_e(8) = 3\log_e(2) \implies k = \frac{3}{14}\log_e(2)" />,
    reason: <>Using <Katex tex="8=2^3" />.</>,
  },
  {
    working: <Katex display tex="A = e^{12k} = e^{\frac{36}{14}\log_e(2)} = 2^{\frac{18}{7}}" />,
    reason: <>From (1). Since <Katex tex="e^{a\log_e 2}=2^a" />, and <Katex tex="\tfrac{36}{14}=\tfrac{18}{7}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{A = 2^{\frac{18}{7}}, \qquad k = \frac{3}{14}\log_e(2)}" />,
    reason: <>As required; numerically <Katex tex="A\approx5.944" /> and <Katex tex="k\approx0.1485" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="Ae^{kx} = A\times2^{bx} \implies e^{kx} = 2^{bx}" />,
    reason: <>The <Katex tex="A" /> cancels, so this is purely about the base.</>,
  },
  {
    working: <Katex display tex="2^{bx} = e^{bx\log_e(2)} \implies kx = bx\log_e(2)" />,
    reason: 'Rewriting base 2 as base e.',
  },
  {
    working: <Katex display tex="b = \frac{k}{\log_e(2)} = \frac{\tfrac{3}{14}\log_e(2)}{\log_e(2)}" />,
    reason: 'The logarithms cancel — which is exactly why the given k was written in that form.',
  },
  {
    working: <Katex display tex="\boxed{b = \frac{3}{14}}" />,
    reason: <>So <Katex tex="g(x)=2^{18/7}\times2^{3x/14}" />. A check: at <Katex tex="x=2" />, <Katex tex="2^{18/7+3/7}=2^3=8" /> ✓.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{on } (-12,2): \ f(x) > g(x)" />,
    reason: <>The straight line lies above the exponential between the two intersections — visible on the diagram, and forced by the fact that they meet exactly twice.</>,
  },
  {
    working: <Katex display tex="\text{Area} = \int_{-12}^{2}\left(\frac{x}{2}+7-2^{\frac{18}{7}}e^{\frac{3}{14}\log_e(2)\,x}\right)dx" />,
    reason: <>Upper minus lower. By <Cas fn="nInt" />, or define <Katex tex="f" /> and <Katex tex="g" /> first with <Cas fn="define" /> to avoid transcription errors.</>,
  },
  {
    working: <Katex display tex="= 15.87196\ldots" />,
    reason: 'One evaluation.',
  },
  {
    working: <Katex display tex="\boxed{15.87 \text{ square units}}" />,
    reason: 'Two decimal places, as asked.',
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="h(x) = f(x)-g(x) = \frac{x}{2}+7-Ae^{kx}" />,
    reason: 'The vertical gap between the line and the curve.',
  },
  {
    working: <Katex display tex="\boxed{h'(x) = \frac12-Ake^{kx}}" />,
    reason: <>Chain rule on the exponential. With the values from part a., <Katex tex="Ak = 2^{18/7}\times\tfrac{3}{14}\log_e 2 \approx 0.8827" />. The question asked for the <em>derivative</em> — writing <Katex tex="h(x)" /> again was the listed error.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="h'(x) = 0 \implies Ake^{kx} = \tfrac12" />,
    reason: <>Setting the derivative from d.i. to zero. This is the point where the tangent to <Katex tex="g" /> is parallel to the line <Katex tex="f" />.</>,
  },
  {
    working: <Katex display tex="x = -3.8279\ldots" />,
    reason: <>By <Cas fn="nSolve" />. It lies inside <Katex tex="[-12,2]" />, so it is the maximum rather than an endpoint.</>,
  },
  {
    working: <Katex display tex="h(-3.8279) = 1.71974\ldots" />,
    reason: 'Substituting back into h, not h′.',
  },
  {
    working: <Katex display tex="\boxed{\text{maximum value } 1.72}" />,
    reason: <>The <em>value</em> was asked for, not the <Katex tex="x" />-coordinate or the coordinate pair — a distinction that cost 44% of students the mark.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="y = \frac{x}{2}+7 \implies x = 2(y-7) \implies f^{-1}(x) = 2(x-7)" />,
    reason: <>The line in the question <em>is</em> <Katex tex="f^{-1}" /> — spotting that turns the whole problem into a reflection.</>,
  },
  {
    working: <Katex display tex="g^{-1}(x) = f^{-1}(x) \iff \text{reflecting } g(x)=f(x) \text{ in } y=x" />,
    reason: 'Both graphs are reflected in the same line, so their intersections are too.',
  },
  {
    working: <Katex display tex="f \text{ and } g \text{ meet at } (-12,1) \text{ and } (2,8)" />,
    reason: 'Given in the stem.',
  },
  {
    working: <Katex display tex="\boxed{(1,\,-12) \ \text{ and } \ (8,\,2)}" />,
    reason: <>Swap each coordinate pair. Solving <Katex tex="g^{-1}(x)=2(x-7)" /> numerically gives the same two points — but takes far longer.</>,
  },
]

const ROWS_FI: WorkingRow[] = [
  {
    working: <Katex display tex="F(x) = \int\left(\frac{x}{2}+7\right)dx = \frac{x^2}{4}+7x+c" />,
    reason: <>The constant is <Katex tex="c" /> because <Katex tex="F(0)=c" />, which is what "passes through <Katex tex="(0,c)" />" means.</>,
  },
  {
    working: <Katex display tex="F(-12) = 1: \quad \frac{144}{4}-84+c = 1 \implies 36-84+c = 1" />,
    reason: 'Substituting the first point.',
  },
  {
    working: <Katex display tex="c = 49" />,
    reason: 'One value of c.',
  },
  {
    working: <Katex display tex="F(2) = 8: \quad \frac44+14+c = 8 \implies 15+c = 8 \implies c = -7" />,
    reason: 'Substituting the second point.',
  },
  {
    working: <Katex display tex="\boxed{49 \ne -7, \ \text{so no single } c \text{ works and } F \text{ cannot pass through both}}" />,
    reason: <>The conclusion is the second mark — finding the two values of <Katex tex="c" /> without saying what they prove was the listed error.</>,
  },
]

const ROWS_FII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{dilation of factor } m \text{ from the } x\text{-axis}: \ y = mF(x)" />,
    reason: <>Multiply the whole function by <Katex tex="m" />, including the constant.</>,
  },
  {
    working: <Katex display tex="mF(-12) = 1: \quad m(c-48) = 1 \qquad (1)" />,
    reason: <>From <Katex tex="F(-12)=36-84+c" />.</>,
  },
  {
    working: <Katex display tex="mF(2) = 8: \quad m(c+15) = 8 \qquad (2)" />,
    reason: <>From <Katex tex="F(2)=1+14+c" />.</>,
  },
  {
    working: <Katex display tex="\frac{(2)}{(1)}: \quad \frac{c+15}{c-48} = 8 \implies c+15 = 8c-384" />,
    reason: <>Dividing eliminates <Katex tex="m" />, the same trick as part a.</>,
  },
  {
    working: <Katex display tex="7c = 399 \implies c = 57" />,
    reason: 'Solving the linear equation.',
  },
  {
    working: <Katex display tex="\boxed{m = \frac{1}{57-48} = \frac19, \qquad c = 57}" />,
    reason: <>Check with (2): <Katex tex="\tfrac19(57+15)=\tfrac{72}{9}=8" /> ✓.</>,
  },
]

export default function MethodsQ2_2025Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (14 marks)</p>
        <p>Let</p>
        <div className="py-1">
          <Katex display tex="f:\mathbb{R}\to\mathbb{R},\ f(x)=\frac{x}{2}+7 \qquad\text{and}\qquad g:\mathbb{R}\to\mathbb{R},\ g(x)=Ae^{kx}" />
        </div>
        <p>
          where <Katex tex="A,k\in\mathbb{R}" />. The graphs of <Katex tex="y=f(x)" /> and{' '}
          <Katex tex="y=g(x)" /> intersect at the points <Katex tex="(-12,1)" /> and{' '}
          <Katex tex="(2,8)" />, as shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="A straight line and a rising exponential curve crossing at the labelled points (−12, 1) and (2, 8), with the line above the curve between them — from the original 2025 VCAA exam paper"
            className="w-full max-w-[420px]"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Dividing one equation by another is the move that appears twice. In part a. it
            eliminates <Katex tex="A" /> and leaves <Katex tex="e^{14k}=8" />; in part f.ii.
            it eliminates <Katex tex="m" /> and leaves a linear equation in{' '}
            <Katex tex="c" />. Both are far quicker than substitution.
          </p>
          <p>
            Part e. has a shortcut worth spotting: <Katex tex="y=2(x-7)" /> is precisely{' '}
            <Katex tex="f^{-1}(x)" />. Reflecting <Katex tex="f" /> and <Katex tex="g" /> in{' '}
            <Katex tex="y=x" /> sends their intersections to the intersections of the
            inverses, so the answer is the two given points with their coordinates swapped —
            no new equation to solve.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        marks={3}
        statement={
          <>
            Write down two simultaneous equations in terms of <Katex tex="A" /> and{' '}
            <Katex tex="k" />. Solve them, using algebra, to show that{' '}
            <Katex tex="A=2^{\frac{18}{7}}" /> and{' '}
            <Katex tex="k=\frac{3}{14}\log_e(2)" />.
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
            Find the value of <Katex tex="b" />, where <Katex tex="b\in\mathbb{R}" />, such
            that <Katex tex="g(x)" /> can be expressed in the form{' '}
            <Katex tex="g(x)=A\times2^{bx}" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        marks={2}
        statement={
          <>
            Use a definite integral to evaluate the area bounded by the graphs of{' '}
            <Katex tex="y=f(x)" /> and <Katex tex="y=g(x)" />, where{' '}
            <Katex tex="x\in[-12,2]" />. Give the area correct to two decimal places.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d.i"
        marks={1}
        statement={
          <>
            Let <Katex tex="h(x)=f(x)-g(x)" />. Write down an expression for the derivative of{' '}
            <Katex tex="h(x)" />.
          </>
        }
        examinerReport={EXAM_DI}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        marks={1}
        statement={
          <>
            Find the maximum value of <Katex tex="h(x)" />, where{' '}
            <Katex tex="x\in[-12,2]" />. Give your answer correct to two decimal places.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>

      <PartCard
        letter="e"
        marks={2}
        statement={
          <>
            Let <Katex tex="g^{-1}" /> be the inverse of <Katex tex="g" />. Find the points
            where the graph of <Katex tex="y=g^{-1}(x)" /> intersects with the graph of{' '}
            <Katex tex="y=2(x-7)" />.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          <span className="font-semibold text-gray-900 dark:text-white">f.</span> Let{' '}
          <Katex tex="F" /> be an anti-derivative of <Katex tex="f" /> that passes through{' '}
          <Katex tex="(0,c)" />, where <Katex tex="c\in\mathbb{R}" />.
        </p>
      </div>

      <PartCard
        letter="f.i"
        marks={2}
        statement={
          <>
            Show that it is <b>not</b> possible for the graph of <Katex tex="y=F(x)" /> to
            pass through both <Katex tex="(-12,1)" /> and <Katex tex="(2,8)" />.
          </>
        }
        examinerReport={EXAM_FI}
      >
        <WorkingTable rows={ROWS_FI} />
      </PartCard>

      <PartCard
        letter="f.ii"
        marks={2}
        statement={
          <>
            The graph of <Katex tex="y=F(x)" /> can be dilated by a factor of{' '}
            <Katex tex="m" /> from the <Katex tex="x" />-axis such that its image passes
            through both <Katex tex="(-12,1)" /> and <Katex tex="(2,8)" />. Find the values of{' '}
            <Katex tex="m" /> and <Katex tex="c" />.
          </>
        }
        examinerReport={EXAM_FII}
      >
        <WorkingTable rows={ROWS_FII} />
      </PartCard>
    </div>
  )
}
