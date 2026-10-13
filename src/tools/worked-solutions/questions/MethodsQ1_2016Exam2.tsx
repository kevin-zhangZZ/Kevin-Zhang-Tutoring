// 2016 Mathematical Methods — Exam 2, Section B, Question 1 (11 marks).
// f(x) = 2cos(x/2) + π on [0, 8π]: period and range, the derivative, tangents, then a
// transformation carrying f to f′. Part (e) writes the transformation with a matrix,
// which is off the current study design; the mathematics is a horizontal translation and a
// vertical dilation, so it is included with a note (the skip guide lists it as doable). Question text
// transcribed from the original paper (no diagram given). Answers verified with sympy.
// Solution is original. Interactive (Detailed only): part e (10% full marks), sliders for a and b
// show the dilation halves the midline before b moves it. Parts a-d and f do not qualify.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const DilateThenTranslate = lazyWidget(() => import('../interactives/meth-2016e2-q1e-dilate-then-translate'))

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
    reason: <>For <Katex tex="\cos(nx)" /> the period is <Katex tex="\tfrac{2\pi}{n}" />; here <Katex tex="n=\tfrac12" />.</>,
    more: <>The domain <Katex tex="[0,8\pi]" /> is exactly two periods long, which matters in parts d. and f.: each solution repeats in the second period.</>,
  },
  {
    working: <Katex display tex="-1\le\cos\!\left(\frac{x}{2}\right)\le1 \implies -2\le 2\cos\!\left(\frac{x}{2}\right)\le2" />,
    reason: <>Cosine runs from <Katex tex="-1" /> to <Katex tex="1" />; the <Katex tex="2" /> out front (the amplitude) doubles that.</>,
  },
  {
    working: <Katex display tex="\pi-2\le 2\cos\!\left(\frac{x}{2}\right)+\pi\le\pi+2" />,
    reason: <>Adding <Katex tex="\pi" /> shifts the whole range up. The minimum <Katex tex="\pi-2" /> is reached at <Katex tex="x=2\pi" /> and the maximum <Katex tex="\pi+2" /> at <Katex tex="x=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{period } 4\pi, \quad \text{range } [\pi-2,\ \pi+2]}" />,
    reason: <>Exact values, smaller end first, square brackets because both ends are reached.</>,
    more: <>The report mentions all three slips: round brackets, the endpoints written the wrong way round (<Katex tex="[2+\pi,-2+\pi]" />), and approximate answers instead of exact ones.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\boxed{f'(x) = -\sin\!\left(\frac{x}{2}\right)}" />,
    reason: <>Chain rule: <Katex tex="\cos(u)" /> differentiates to <Katex tex="-\sin(u)" />, times <Katex tex="\tfrac12" /> from the inside, which cancels the <Katex tex="2" /> out front.</>,
    more: <>The question asks for the <em>rule</em>, so write the equation "<Katex tex="f'(x)=\ldots" />". The report says some students left only the expression <Katex tex="-\sin\!\left(\tfrac{x}{2}\right)" />, and some had their technology in degree mode, which gives a wrong derivative. Check radian mode before any calculus with trig.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f(\pi) = 2\cos\!\left(\frac{\pi}{2}\right)+\pi = \pi" />,
    reason: <>The point of contact is <Katex tex="(\pi,\pi)" />.</>,
  },
  {
    working: <Katex display tex="f'(\pi) = -\sin\!\left(\frac{\pi}{2}\right) = -1" />,
    reason: <>The gradient, from the rule in part b.</>,
  },
  {
    working: <Katex display tex="y-\pi = -1(x-\pi)" />,
    reason: <>Point–gradient form <Katex tex="y-y_1=m(x-x_1)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = -x+2\pi}" />,
    reason: <>Give the equation "<Katex tex="y=\ldots" />", not just the expression.</>,
    more: <>The report notes some students left the answer as <Katex tex="-x+2\pi" />, and that no working was required: CAS gives the line directly. A gradient of exactly <Katex tex="-1" /> is no accident: <Katex tex="x=\pi" /> is a quarter-period from the start, on the midline, where the curve falls fastest.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="-\sin\!\left(\frac{x}{2}\right) = 1 \implies \sin\!\left(\frac{x}{2}\right) = -1" />,
    reason: <>A tangent with gradient <Katex tex="1" /> touches where <Katex tex="f'(x)=1" />.</>,
  },
  {
    working: <Katex display tex="0\le x\le 8\pi \implies 0\le\frac{x}{2}\le4\pi" />,
    reason: <>Convert the domain for the angle <Katex tex="\tfrac{x}{2}" /> before solving, so no solution is missed.</>,
  },
  {
    working: <Katex display tex="\frac{x}{2} = \frac{3\pi}{2},\ \frac{7\pi}{2} \implies x = 3\pi,\ 7\pi" />,
    reason: <>Sine is <Katex tex="-1" /> only at the bottom of the unit circle, <Katex tex="\tfrac{3\pi}{2}" />, once per revolution; <Katex tex="[0,4\pi]" /> is two revolutions.</>,
    more: <>The report notes that once students had <Katex tex="x=3\pi" /> or <Katex tex="x=7\pi" />, the rest could be completed using technology. Finding these values is the key step. Some students gave only one tangent: the question asks for the tangent<em>s</em>, plural, a hint that there is more than one.</>,
  },
  {
    working: <Katex display tex="\begin{gathered}f(3\pi) = 2\cos\!\left(\frac{3\pi}{2}\right)+\pi = \pi \\ f(7\pi) = 2\cos\!\left(\frac{7\pi}{2}\right)+\pi = \pi\end{gathered}" />,
    reason: <>The points of contact are <Katex tex="(3\pi,\pi)" /> and <Katex tex="(7\pi,\pi)" />.</>,
    more: <>Both are on the midline <Katex tex="y=\pi" />, where a sinusoid is steepest, so the gradient <Katex tex="1" /> (the largest value <Katex tex="f'" /> reaches) happens there.</>,
  },
  {
    working: <Katex display tex="y-\pi = x-3\pi, \qquad y-\pi = x-7\pi" />,
    reason: <>Point–gradient form at each point, with gradient <Katex tex="1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{y = x-2\pi \quad\text{and}\quad y = x-6\pi}" />,
    reason: <>Both tangents.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="x' = x-\pi, \qquad y' = ay+b" />,
    reason: <>Read the matrices row by row (each row times <Katex tex="x" /> and <Katex tex="y" />, plus that row's last entry): <Katex tex="x'=1x+0y-\pi" />, <Katex tex="y'=0x+ay+b" />.</>,
    more: <>In words: each point moves <Katex tex="\pi" /> left; its height is dilated by factor <Katex tex="a" />, then moved up <Katex tex="b" />. The report says many students were able to take the equations out of the matrices and rearrange them. The difficulty is what comes next: substituting into <Katex tex="y=f(x)" /> and matching the result to <Katex tex="f'" />.</>,
  },
  {
    working: <Katex display tex="x = x'+\pi, \qquad y = \frac{y'-b}{a}" />,
    reason: <>Make the original <Katex tex="x" /> and <Katex tex="y" /> the subjects, ready to substitute into <Katex tex="y=f(x)" />.</>,
  },
  {
    working: <Katex display tex="\frac{y'-b}{a} = 2\cos\!\left(\frac{x'+\pi}{2}\right)+\pi" />,
    reason: <>Substituting into <Katex tex="y=f(x)" /> gives the rule of the image.</>,
  },
  {
    working: <Katex display tex="y' = 2a\cos\!\left(\frac{x'}{2}+\frac{\pi}{2}\right)+a\pi+b" />,
    reason: <>Multiply both sides by <Katex tex="a" />, add <Katex tex="b" />, and split the fraction inside the cosine.</>,
  },
  {
    working: <Katex display tex="\cos\!\left(\theta+\frac{\pi}{2}\right) = -\sin(\theta)" />,
    reason: <>Shifting cosine <Katex tex="\tfrac{\pi}{2}" /> left gives negative sine, which is what <Katex tex="f'" /> is made of.</>,
    more: <>To check the identity, try <Katex tex="\theta=0" />: <Katex tex="\cos\tfrac{\pi}{2}=0=-\sin 0" />; and <Katex tex="\theta=\tfrac{\pi}{2}" />: <Katex tex="\cos\pi=-1=-\sin\tfrac{\pi}{2}" />. Or sketch <Katex tex="y=\cos\theta" /> moved <Katex tex="\tfrac{\pi}{2}" /> left: it starts at <Katex tex="0" /> and goes down, like <Katex tex="-\sin\theta" />. This is why the translation is <Katex tex="\pi" /> left: inside <Katex tex="\tfrac{x}{2}" />, a shift of <Katex tex="\pi" /> in <Katex tex="x" /> is a shift of <Katex tex="\tfrac{\pi}{2}" /> in the angle.</>,
  },
  {
    working: <Katex display tex="y' = -2a\sin\!\left(\frac{x'}{2}\right)+a\pi+b" />,
    reason: <>Applying the identity with <Katex tex="\theta=\tfrac{x'}{2}" />.</>,
  },
  {
    working: <Katex display tex="-2a = -1 \implies a = \frac12" />,
    reason: <>This must be <Katex tex="f'(x')=-\sin\!\left(\tfrac{x'}{2}\right)" />, so match the coefficients of the sine.</>,
  },
  {
    working: <Katex display tex="a\pi+b = 0 \implies \frac{\pi}{2}+b=0" />,
    reason: <><Katex tex="f'" /> has no constant term, so the constant <Katex tex="a\pi+b" /> must be zero.</>,
    more: <>The tempting wrong answer is <Katex tex="b=-\pi" />, from thinking "the midline must move from <Katex tex="\pi" /> to <Katex tex="0" />". But <Katex tex="y'=ay+b" /> dilates first: the dilation by <Katex tex="\tfrac12" /> already brings the midline down to <Katex tex="\tfrac{\pi}{2}" />, so <Katex tex="b" /> only moves it <Katex tex="\tfrac{\pi}{2}" /> more. The report notes some students drew the graphs but were unable to describe the transformations; the algebra above does not need a graph.</>,
  },
  {
    working: <Katex display tex="\boxed{a=\frac12,\quad b=-\frac{\pi}{2}}" />,
    reason: <>Both values, exact.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{gathered}2\cos\!\left(\frac{x}{2}\right)+\pi = -2\sin\!\left(\frac{x}{2}\right)+\pi \\ 2\cos\!\left(\frac{x}{2}\right) = -2\sin\!\left(\frac{x}{2}\right)\end{gathered}" />,
    reason: <>Substituting <Katex tex="f(x)" />, and <Katex tex="f'(x)" /> from part b. The <Katex tex="\pi" /> on each side cancels.</>,
    more: <>The report notes some students solved <Katex tex="2f'(x)+\pi=0" /> instead. That equation has no solutions at all (it needs <Katex tex="\sin\!\left(\tfrac{x}{2}\right)=\tfrac{\pi}{2}" />, which is more than <Katex tex="1" />), so read the equation carefully: <Katex tex="f(x)" /> is on the left.</>,
  },
  {
    working: <Katex display tex="\frac{\sin\!\left(\frac{x}{2}\right)}{\cos\!\left(\frac{x}{2}\right)} = -1 \implies \tan\!\left(\frac{x}{2}\right) = -1" />,
    reason: <>Divide both sides by <Katex tex="-2\cos\!\left(\tfrac{x}{2}\right)" /> to turn sine and cosine into one tangent.</>,
    more: <>Dividing is safe: if <Katex tex="\cos\!\left(\tfrac{x}{2}\right)" /> were zero, the sine would be <Katex tex="\pm1" /> and the equation could not hold.</>,
  },
  {
    working: <Katex display tex="0\le x\le8\pi \implies 0\le\frac{x}{2}\le4\pi" />,
    reason: <>Convert the domain for the angle <Katex tex="\tfrac{x}{2}" /> first: it covers two revolutions.</>,
  },
  {
    working: <Katex display tex="\frac{x}{2} = \frac{3\pi}{4},\ \frac{7\pi}{4},\ \frac{11\pi}{4},\ \frac{15\pi}{4}" />,
    reason: <>Tangent is negative in quadrants 2 and 4, with reference angle <Katex tex="\tfrac{\pi}{4}" />; then add <Katex tex="2\pi" /> to each.</>,
  },
  {
    working: <Cas fn="solve">solve(2cos(x/2) + π = -2sin(x/2) + π, x) | 0≤x≤8π</Cas>,
    reason: <>On CAS, put the domain restriction in the same command.</>,
    more: <>Without the restriction, CAS returns a general solution with an arbitrary integer, which you would then have to sort through.</>,
  },
  {
    working: <Katex display tex="\boxed{x = \frac{3\pi}{2},\ \frac{7\pi}{2},\ \frac{11\pi}{2},\ \frac{15\pi}{2}}" />,
    reason: <>Doubling each angle gives the four values of <Katex tex="x" />.</>,
    more: <>The wrong answer in the report, <Katex tex="\tfrac{\pi}{2},\tfrac{5\pi}{2},\tfrac{9\pi}{2},\tfrac{13\pi}{2}" />, is exactly what <Katex tex="\tan\!\left(\tfrac{x}{2}\right)=+1" /> gives: a dropped minus sign. Check one answer: at <Katex tex="x=\tfrac{3\pi}{2}" />, <Katex tex="\cos\tfrac{3\pi}{4}=-\tfrac{\sqrt2}{2}" /> and <Katex tex="-\sin\tfrac{3\pi}{4}=-\tfrac{\sqrt2}{2}" />, equal as required.</>,
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
        <Explore title="Dilate first: by the time b acts, the midline is already at π/2">
          <DilateThenTranslate />
        </Explore>
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
