// 2021 Mathematical Methods — Exam 2, Section B Question 3 (12 marks). A log difference
// that collapses to a single log, a tangent and a normal, then a squared exponential, the
// angle between two lines, and an area. Question text transcribed from the original paper;
// the figure is a crop of VCAA's own artwork. Answers checked with sympy/scipy and against
// the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import graphSrc from './meth-2021e2-q3-graph.png'

const EXAM_A: SAExaminerStats = {
  marks: [27, 37, 36],
  average: 1.1,
  comment: (
    <>
      Some students only gave the domain and not the range. Others gave the domain as{' '}
      <Katex tex="(-\infty,1)" /> or <Katex tex="(-\infty,1]" /> or <Katex tex="(-1,-\infty)" />.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [26, 74],
  average: 0.8,
  comment: (
    <>
      An equation was required. Many students worked out the equation without using
      technology. This would have been time consuming.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [35, 65],
  average: 0.7,
  comment: <>Once again, an equation was required and it could be found easily using technology.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [34, 66],
  average: 0.7,
  comment: (
    <>
      Some students wrote that there exists two <Katex tex="x" />-values for every{' '}
      <Katex tex="y" />-value, which is not the case, or <Katex tex="p" /> fails the vertical
      line test. Others gave the meaning of a
      one-to-one function without relating it to the question.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [33, 67],
  average: 0.7,
  comment: (
    <>
      Some students gave their answer in terms of <Katex tex="x" /> and not{' '}
      <Katex tex="a" />. There were some transcription errors and brackets were used poorly.
      Others wrote the equation of the tangent.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [83, 4, 9, 4],
  average: 0.4,
  comment: (
    <>
      This question was not answered well. Some students were able to find either{' '}
      <Katex tex="a=-0.67" /> or <Katex tex="a=-0.11" /> but not both.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [41, 23, 7, 29],
  average: 1.3,
  comment: (
    <>
      Many students were able to find <Katex tex="x=-0.750" />. Some wrote their answer as{' '}
      <Katex tex="x=-0.75" />, but three decimal places were required. Others were unable to
      set up the definite integrals correctly.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x^2-1>0 \implies x<-1 \text{ or } x>1" />,
    reason: <>Each logarithm needs a positive argument, and both conditions must hold at once.</>,
  },
  {
    working: <Katex display tex="1-x>0 \implies x<1" />,
    reason: <>The second condition.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{domain } (-\infty,-1)}" />,
    reason: <>The intersection. Combining the logs <em>before</em> checking would wrongly admit <Katex tex="x>1" />.</>,
  },
  {
    working: <Katex display tex="q(x) = \log_e\!\left(\frac{(x-1)(x+1)}{1-x}\right) = \log_e(-x-1)" />,
    reason: <><Katex tex="\tfrac{x-1}{1-x}=-1" />, so the whole thing collapses to a single log — valid on the domain just found.</>,
  },
  {
    working: <Katex display tex="x\to-1^-: \ -x-1\to0^+ \Rightarrow q\to-\infty; \quad x\to-\infty: \ q\to\infty" />,
    reason: <>The inner expression sweeps over all positive values.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{range } R}" />,
    reason: <>Both parts are asked for — the report notes some students gave only the domain.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="q(x) = \log_e(-x-1) \implies q'(x) = \frac{-1}{-x-1} = \frac{1}{x+1}" />,
    reason: <>Chain rule on the simplified form — far quicker than differentiating the difference of two logs.</>,
  },
  {
    working: <Katex display tex="q'(-2) = \frac{1}{-1} = -1, \quad q(-2) = \log_e(1) = 0" />,
    reason: <>Both come out exactly: <Katex tex="(-2,0)" /> is on the curve.</>,
  },
  {
    working: <Katex display tex="\boxed{y = -x-2}" />,
    reason: <>From <Katex tex="y-0=-1(x+2)" />. An <em>equation</em>, not just the gradient.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="m_{\perp} = \frac{-1}{-1} = 1" />,
    reason: <>The negative reciprocal of the tangent gradient from part b.i.</>,
  },
  {
    working: <Katex display tex="y-0 = 1\left(x-(-2)\right)" />,
    reason: <>Through the given point <Katex tex="(-2,0)" /> — which happens to be the point of tangency.</>,
  },
  {
    working: <Katex display tex="\boxed{y = x+2}" />,
    reason: <>The same line that appears in the diagram for parts e. and f. — not a coincidence the question leans on later.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="p(x) = e^{-2x}-2e^{-x}+1 = \left(e^{-x}-1\right)^2" />,
    reason: <>Recognising the perfect square makes everything about this function obvious at once.</>,
  },
  {
    working: <Katex display tex="p(x) \ge 0, \text{ with } p(0) = 0" />,
    reason: <>A squared quantity, zero only when <Katex tex="e^{-x}=1" />.</>,
  },
  {
    working: <Katex display tex="p'(x) = 2e^{-x}\left(1-e^{-x}\right): \ \text{negative for } x<0, \text{ positive for } x>0" />,
    reason: <>So the graph falls to a minimum at the origin and then rises — a shape that must repeat values.</>,
  },
  {
    working: <Katex display tex="\boxed{p \text{ is many-to-one: it fails the horizontal line test}}" />,
    reason: <>For example <Katex tex="p\left(\log_e\left(\tfrac23\right)\right)=p(\log_e(2))=\tfrac14" />. Note it is <em>some</em> <Katex tex="y" />-values that have two <Katex tex="x" />-values, not every one — and the <em>vertical</em> line test is about being a function at all, which <Katex tex="p" /> passes.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="p(x) = e^{-2x}-2e^{-x}+1" />,
    reason: <>Differentiating the expanded form is easiest here.</>,
  },
  {
    working: <Katex display tex="p'(x) = -2e^{-2x}+2e^{-x}" />,
    reason: <>Each chain rule contributes a factor of <Katex tex="-1" /> or <Katex tex="-2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{p'(a) = 2\left(e^a-1\right)e^{-2a}}" />,
    reason: <>Equivalently <Katex tex="2e^{-a}-2e^{-2a}" />. In terms of <Katex tex="a" />, and it is the <em>gradient</em> that is asked for, not the tangent's equation.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\tan\theta = \left|\frac{m-1}{1+m}\right| \ \text{ where } m = p'(a)" />,
    reason: <>The angle between two lines, with the line <Katex tex="y=x+2" /> contributing gradient 1.</>,
  },
  {
    working: <Katex display tex="\theta = 60^\circ \implies \left|\frac{m-1}{1+m}\right| = \sqrt3" />,
    reason: <><Katex tex="\tan60^\circ=\sqrt3" />. The absolute value means two cases.</>,
  },
  {
    working: <Katex display tex="m = \frac{1+\sqrt3}{1-\sqrt3} = -\left(2+\sqrt3\right) \ \text{ or } \ m = \frac{1-\sqrt3}{1+\sqrt3} = \sqrt3-2" />,
    reason: <>Equivalently <Katex tex="m=\tan(105^\circ)" /> and <Katex tex="m=\tan(165^\circ)" />: the tangent can sit <Katex tex="60^\circ" /> either side of the line.</>,
  },
  {
    working: <Cas fn="solve">solve(2(e^a − 1)·e^(−2a) = −(2 + √3), a)</Cas>,
    reason: <>Gives <Katex tex="a=-0.6702\ldots" />.</>,
  },
  {
    working: <Cas fn="solve">solve(2(e^a − 1)·e^(−2a) = √3 − 2, a)</Cas>,
    reason: <>Gives <Katex tex="a=-0.1130\ldots" />. Note <Katex tex="p'" /> never exceeds <Katex tex="\tfrac12" />, so only negative target gradients have solutions.</>,
  },
  {
    working: <Katex display tex="\boxed{a = -0.67 \ \text{ and } \ a = -0.11}" />,
    reason: <>Both, to two decimal places. Only 4% of students got both.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Cas fn="solve">solve(e^(−2x) − 2e^(−x) + 1 = x + 2, x)</Cas>,
    reason: <>Where the line meets the curve. There is exactly one crossing, on the left of the origin.</>,
  },
  {
    working: <Katex display tex="\boxed{x = -0.750}" />,
    reason: <>To three decimal places — the actual root is <Katex tex="-0.7504\ldots" />, so writing <Katex tex="-0.75" /> understates the precision asked for.</>,
  },
  {
    working: <Katex display tex="\text{the region is bounded by } y=x+2 \text{ on the left and } p \text{ on the right}" />,
    reason: <>The line cuts the <Katex tex="x" />-axis at <Katex tex="(-2,0)" />; the curve touches it at the origin. So the base runs from <Katex tex="-2" /> to <Katex tex="0" />, and the top switches at the crossing.</>,
  },
  {
    working: <Katex display tex="A = \int_{-2}^{-0.7504}(x+2)\,dx+\int_{-0.7504}^{0}p(x)\,dx" />,
    reason: <>Two integrals, split at the intersection — using the stored root, not the rounded one.</>,
  },
  {
    working: <Katex display tex="= 0.78075\ldots+0.25734\ldots" />,
    reason: <>The first piece is a triangle of base <Katex tex="1.2496" /> and height <Katex tex="1.2496" />, a useful check.</>,
  },
  {
    working: <Katex display tex="\boxed{A = 1.038}" />,
    reason: <>To three decimal places, as asked.</>,
  },
]

export default function MethodsQ3_2021Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (12 marks)</p>
        <p>
          Let <Katex tex="q(x)=\log_e\left(x^2-1\right)-\log_e(1-x)" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Domain & Range"
        marks={2}
        statement={<>State the maximal domain and the range of <Katex tex="q" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b.i"
        topic="Tangent Line"
        marks={1}
        statement={
          <>
            Find the equation of the tangent to the graph of <Katex tex="q" /> when{' '}
            <Katex tex="x=-2" />.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Normal Line"
        marks={1}
        statement={
          <>
            Find the equation of the line that is perpendicular to the graph of{' '}
            <Katex tex="q" /> when <Katex tex="x=-2" /> and passes through the point{' '}
            <Katex tex="(-2,0)" />.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Let <Katex tex="p(x)=e^{-2x}-2e^{-x}+1" />.
        </p>
      </div>

      <PartCard
        letter="c"
        topic="One-to-One"
        marks={1}
        statement={<>Explain why <Katex tex="p" /> is not a one-to-one function.</>}
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Tangent Gradient"
        marks={1}
        statement={
          <>
            Find the gradient of the tangent to the graph of <Katex tex="p" /> at{' '}
            <Katex tex="x=a" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1 flex flex-col gap-3">
        <p>
          The diagram below shows parts of the graph of <Katex tex="p" /> and the line{' '}
          <Katex tex="y=x+2" />. The line <Katex tex="y=x+2" /> and the tangent to the graph
          of <Katex tex="p" /> at <Katex tex="x=a" /> intersect with an acute angle of{' '}
          <Katex tex="\theta" /> between them.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="The curve p falling steeply from the upper left to touch the x-axis at the origin then rising slowly towards y = 1, with the straight line y = x + 2 crossing it — from the original 2021 VCAA exam paper"
            className="w-full max-w-[400px]"
          />
        </div>
      </div>

      <PartCard
        letter="e"
        topic="Angle Between Lines"
        marks={3}
        statement={
          <>
            Find the value(s) of <Katex tex="a" /> for which <Katex tex="\theta=60^\circ" />.
            Give your answer(s) correct to two decimal places.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard
        letter="f"
        topic="Area Between Curves"
        marks={3}
        statement={
          <>
            Find the <Katex tex="x" />-coordinate of the point of intersection between the
            line <Katex tex="y=x+2" /> and the graph of <Katex tex="p" />, and hence find the
            area bounded by <Katex tex="y=x+2" />, the graph of <Katex tex="p" /> and the{' '}
            <Katex tex="x" />-axis, both correct to three decimal places.
          </>
        }
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>
    </div>
  )
}
