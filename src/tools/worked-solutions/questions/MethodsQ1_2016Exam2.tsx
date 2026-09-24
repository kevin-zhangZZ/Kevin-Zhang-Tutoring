// 2016 Mathematical Methods — Exam 2, Section B, Question 1 (11 marks).
// f(x) = 2cos(x/2) + π on [0, 8π]: period and range, the derivative, tangents, then a
// transformation carrying f to f′. Part (e) writes the transformation with a matrix,
// which is off the current study design; the mathematics is a horizontal translation and a
// vertical dilation, so it is included with a note (the skip guide lists it as doable). Question text
// transcribed from the original paper (no diagram given). Answers verified with sympy.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'

const EXAM_A: SAExaminerStats = {
  marks: [10, 33, 57],
  average: 1.5,
  comment: (
    <>
      This question was answered well. However, some students included round brackets
      instead of square brackets for the range. Range <Katex tex="=[2+\pi,-2+\pi]" /> was
      occasionally seen. Some students gave approximate answers instead of exact answers.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [13, 87],
  average: 0.9,
  comment: (
    <>
      This question was answered well. Some students did not write an equation, leaving
      their answer as <Katex tex="-\sin\!\left(\tfrac{x}{2}\right)" />. Others made errors
      when using the chain rule. Some had their technology in degree mode rather than radian
      mode.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [33, 67],
  average: 0.7,
  comment: (
    <>
      This question was answered well. Students were not required to show any working. The
      answer could be obtained directly using technology. Some left their answer as{' '}
      <Katex tex="-x+2\pi" />.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [48, 5, 47],
  average: 1.0,
  comment: (
    <>
      Once students found <Katex tex="x=3\pi" /> or <Katex tex="x=7\pi" /> the rest of the
      question could be completed using technology. Some students gave only one of the
      equations of the tangents.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [48, 34, 9, 10],
  average: 0.8,
  comment: (
    <>
      This question was not answered well. Many students were able to take the equations out
      of the matrices and rearrange them. Some attempted to draw the graphs but were unable
      to describe the transformations.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [49, 4, 47],
  average: 1.0,
  comment: (
    <>
      Some students gave{' '}
      <Katex tex="x=\tfrac{\pi}{2},\tfrac{5\pi}{2},\tfrac{9\pi}{2},\tfrac{13\pi}{2}" /> as
      the answer. Others tried solving <Katex tex="2f'(x)+\pi=0" /> instead of{' '}
      <Katex tex="2f'(x)+\pi=f(x)" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\text{period} = \frac{2\pi}{\frac12} = 4\pi" />,
    reason: <>The coefficient of <Katex tex="x" /> inside the cosine is <Katex tex="\tfrac12" />, so the graph is stretched horizontally by a factor of <Katex tex="2" />. The domain <Katex tex="[0,8\pi]" /> holds exactly two full cycles.</>,
  },
  {
    working: <Katex display tex="-1\le\cos\!\left(\frac{x}{2}\right)\le1 \implies -2\le 2\cos\!\left(\frac{x}{2}\right)\le2" />,
    reason: <>Amplitude <Katex tex="2" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{period } 4\pi, \quad \text{range } [\pi-2,\ \pi+2]}" />,
    reason: <>Exact values, and square brackets at both ends since both extremes are actually reached on this domain. The report notes marks lost for round brackets and for writing the endpoints the wrong way round.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\boxed{f'(x) = -\sin\!\left(\frac{x}{2}\right)}" />,
    reason: <>Chain rule: the derivative of <Katex tex="\cos(u)" /> is <Katex tex="-\sin(u)" />, times <Katex tex="\tfrac12" /> from the inside, and the <Katex tex="2" /> out front cancels it. Write it as an equation, including "<Katex tex="f'(x)=" />" — the report says some students lost the mark for giving only the expression.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f(\pi) = 2\cos\!\left(\frac{\pi}{2}\right)+\pi = \pi" />,
    reason: <>The point of contact is <Katex tex="(\pi,\pi)" />.</>,
  },
  {
    working: <Katex display tex="f'(\pi) = -\sin\!\left(\frac{\pi}{2}\right) = -1" />,
    reason: <>The gradient.</>,
  },
  {
    working: <Katex display tex="y-\pi = -1(x-\pi)" />,
    reason: <>Point–gradient form.</>,
  },
  {
    working: <Katex display tex="\boxed{y = -x+2\pi}" />,
    reason: <>Give the equation, not just the expression <Katex tex="-x+2\pi" />. A gradient of exactly <Katex tex="-1" /> is no accident: <Katex tex="x=\pi" /> is a quarter-cycle from the start, where the curve is falling fastest.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="-\sin\!\left(\frac{x}{2}\right) = 1 \implies \sin\!\left(\frac{x}{2}\right) = -1" />,
    reason: <>Setting the derivative equal to the required gradient.</>,
  },
  {
    working: <Katex display tex="\frac{x}{2} = \frac{3\pi}{2}+2k\pi \implies x = 3\pi+4k\pi" />,
    reason: <>Sine hits <Katex tex="-1" /> once per cycle.</>,
  },
  {
    working: <Katex display tex="x = 3\pi \text{ and } x = 7\pi \text{ in } [0,8\pi]" />,
    reason: <>Two solutions, because the domain holds two full periods. The report says many students found only one — the question asks for the tangent<em>s</em>, plural.</>,
  },
  {
    working: <Katex display tex="f(3\pi) = 2\cos\!\left(\frac{3\pi}{2}\right)+\pi = \pi, \qquad f(7\pi) = \pi" />,
    reason: <>Both points of contact are at height <Katex tex="\pi" /> — the midline, which is exactly where a sinusoid has its steepest gradient.</>,
  },
  {
    working: <Katex display tex="\boxed{y = x-2\pi \quad\text{and}\quad y = x-6\pi}" />,
    reason: <>Point–gradient form at each point with gradient <Katex tex="1" />.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="x' = x-\pi, \qquad y' = ay+b" />,
    reason: <>Reading the transformation: a horizontal translation of <Katex tex="\pi" /> to the left, and a vertical dilation by <Katex tex="a" /> followed by a translation of <Katex tex="b" />.</>,
  },
  {
    working: <Katex display tex="x = x'+\pi, \qquad y = \frac{y'-b}{a}" />,
    reason: <>Invert, so the old variables are in terms of the new ones.</>,
  },
  {
    working: <Katex display tex="\frac{y'-b}{a} = 2\cos\!\left(\frac{x'+\pi}{2}\right)+\pi" />,
    reason: <>Substituting into <Katex tex="y=f(x)" />.</>,
  },
  {
    working: <Katex display tex="y' = 2a\cos\!\left(\frac{x'}{2}+\frac{\pi}{2}\right)+a\pi+b" />,
    reason: <>Expanding the bracket and multiplying out.</>,
  },
  {
    working: <Katex display tex="\cos\!\left(\theta+\frac{\pi}{2}\right) = -\sin(\theta) \implies y' = -2a\sin\!\left(\frac{x'}{2}\right)+a\pi+b" />,
    reason: <>The identity that turns the cosine into a sine — and it is why the translation had to be <Katex tex="\pi" /> to the left.</>,
  },
  {
    working: <Katex display tex="-2a = -1 \implies a = \frac12" />,
    reason: <>Matching against <Katex tex="f'(x')=-\sin\!\left(\tfrac{x'}{2}\right)" />: the coefficient of the sine.</>,
  },
  {
    working: <Katex display tex="a\pi+b = 0 \implies \boxed{a=\tfrac12,\ b=-\tfrac{\pi}{2}}" />,
    reason: <><Katex tex="f'" /> has no constant term, so the leftover must vanish.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="2\cos\!\left(\frac{x}{2}\right)+\pi = -2\sin\!\left(\frac{x}{2}\right)+\pi" />,
    reason: <>Substituting both rules. The <Katex tex="\pi" /> on each side cancels immediately.</>,
  },
  {
    working: <Katex display tex="\frac{\sin\!\left(\frac{x}{2}\right)}{\cos\!\left(\frac{x}{2}\right)} = -1 \implies \tan\!\left(\frac{x}{2}\right) = -1" />,
    reason: <>Dividing by <Katex tex="\cos\!\left(\tfrac{x}{2}\right)" />, which is safe: if it were zero the sine would be <Katex tex="\pm1" /> and the equation could not hold.</>,
  },
  {
    working: <Katex display tex="\frac{x}{2} = \frac{3\pi}{4},\ \frac{7\pi}{4},\ \frac{11\pi}{4},\ \frac{15\pi}{4}" />,
    reason: <>The domain <Katex tex="0\le x\le8\pi" /> becomes <Katex tex="0\le\tfrac{x}{2}\le4\pi" />, which holds four solutions of <Katex tex="\tan\theta=-1" />. Halving the domain first is the step that stops you stopping at one or two.</>,
  },
  {
    working: <Cas fn="solve">solve(2cos(x/2) + π = -2sin(x/2) + π, x) | 0≤x≤8π</Cas>,
    reason: <>On CAS, restrict the domain in the same command; without the restriction it returns a general solution with an arbitrary integer.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \frac{3\pi}{2},\ \frac{7\pi}{2},\ \frac{11\pi}{2},\ \frac{15\pi}{2}}" />,
    reason: <>The report's common wrong answer <Katex tex="\tfrac{\pi}{2},\tfrac{5\pi}{2},\ldots" /> comes from <Katex tex="\tan\left(\tfrac{x}{2}\right)=+1" /> — a dropped minus sign.</>,
  },
]

export default function MethodsQ1_2016Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (11 marks)</p>
        <p>
          Let <Katex tex="f:[0,8\pi]\to R" />,{' '}
          <Katex tex="f(x)=2\cos\!\left(\dfrac{x}{2}\right)+\pi" />.
        </p>
      </div>

      <PartCard letter="a" topic="Period & Range" marks={2} statement={<>Find the period and range of <Katex tex="f" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" topic="Derivative" marks={1} statement={<>State the rule for the derivative function <Katex tex="f'" />.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Tangent Line"
        marks={1}
        statement={
          <>
            Find the equation of the tangent to the graph of <Katex tex="f" /> at{' '}
            <Katex tex="x=\pi" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Tangent Lines"
        marks={2}
        statement={
          <>
            Find the equations of the tangents to the graph of{' '}
            <Katex tex="f:[0,8\pi]\to R" />,{' '}
            <Katex tex="f(x)=2\cos\!\left(\tfrac{x}{2}\right)+\pi" /> that have a gradient of{' '}
            <Katex tex="1" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard
        letter="e"
        topic="Transformations"
        marks={3}
        statement={
          <>
            The rule of <Katex tex="f'" /> can be obtained from the rule of <Katex tex="f" />{' '}
            under a transformation <Katex tex="T" />, such that{' '}
            <Katex tex="T:R^2\to R^2,\ T\!\left(\begin{bmatrix}x\\y\end{bmatrix}\right)=\begin{bmatrix}1&0\\0&a\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix}+\begin{bmatrix}-\pi\\b\end{bmatrix}" />
            . Find the value of <Katex tex="a" /> and the value of <Katex tex="b" />.
          </>
        }
        examinerReport={EXAM_E}
      >
        <Background title="On the matrix notation">
          <p>
            Transformation matrices are off the current study design. This one says only:
            translate <Katex tex="\pi" /> units left, then dilate vertically by factor{' '}
            <Katex tex="a" /> and translate <Katex tex="b" /> units up. A current paper would
            say that in words, and the working would be identical.
          </p>
          <p>
            The mathematical content — substituting the inverse transformation into{' '}
            <Katex tex="y=f(x)" />, then matching coefficients against a known target rule —
            is entirely current, and the identity{' '}
            <Katex tex="\cos\!\left(\theta+\tfrac{\pi}{2}\right)=-\sin(\theta)" /> is the
            heart of it.
          </p>
        </Background>
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard
        letter="f"
        topic="Trig Equation"
        marks={2}
        statement={
          <>
            Find the values of <Katex tex="x" />, <Katex tex="0\le x\le8\pi" />, such that{' '}
            <Katex tex="f(x)=2f'(x)+\pi" />.
          </>
        }
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>
    </div>
  )
}
