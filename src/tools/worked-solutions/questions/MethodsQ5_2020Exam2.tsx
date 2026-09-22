// 2020 Mathematical Methods — Exam 2, Section B Question 5 (13 marks). Tangents to x³ − x
// and the x-intercept they land on, then the odd-function family x³ + wx and its image
// under a dilation-and-translation. The hardest question on the paper: parts g. and h.
// averaged 0.03 and 0.02 marks. Question text transcribed from the original paper; the
// figure is a crop of VCAA's own artwork. Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import tangentsSrc from './meth-2020e2-q5-tangents.png'

const EXAM_A: SAExaminerStats = {
  marks: [36, 7, 9, 49],
  average: 1.7,
  comment: (
    <>
      Most students were able to find the equation of the tangent. When finding it, many left
      out brackets when multiplying <Katex tex="(x-a)" /> by the gradient, writing{' '}
      <Katex tex="3a^2-1(x-a)" /> instead of <Katex tex="\left(3a^2-1\right)(x-a)" />. Some
      students did not show suitable steps.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [54, 46],
  average: 0.5,
  comment: (
    <>
      Some students wrote down only one solution. Other incorrect answers involved set
      notation or interval notation. Some gave approximate answers.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [77, 23],
  average: 0.2,
  comment: (
    <>
      The concept of the "nature of a tangent line" was not obvious for many students. Common
      incorrect answers were undefined, asymptote, increasing, decreasing, inflection,
      maximum and minimum. Many described the curve of <Katex tex="f" /> and not the tangent.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [40, 60],
  average: 0.6,
  comment: (
    <>
      There were some decimal place errors such as <Katex tex="a=-0.5051" />,{' '}
      <Katex tex="a=1.3467" /> or <Katex tex="a=1.347" />. Sometimes{' '}
      <Katex tex="a=-0.5052" /> was written as <Katex tex="a=0.5052" />.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [87, 13],
  average: 0.1,
  comment: (
    <>
      Some students had the values within the interval in the wrong order. Others had
      incorrect brackets.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [82, 3, 8, 7],
  average: 0.4,
  comment: (
    <>
      Many students did not use <Katex tex="b=\dfrac{2a^3}{3a^2-1}" />. Others did not
      eliminate the values where <Katex tex="a=b" /> and included <Katex tex="a=-1" />,{' '}
      <Katex tex="0" /> and <Katex tex="1" />.
    </>
  ),
}

const EXAM_F: SAExaminerStats = {
  marks: [43, 57],
  average: 0.6,
  comment: (
    <>
      Some students did not expand the expression in brackets correctly. Others tried to show
      the required result by substitution.
    </>
  ),
}

const EXAM_G: SAExaminerStats = {
  marks: [97, 3],
  average: 0.03,
  comment: (
    <>
      This question was attempted by a small number of students. Some students found{' '}
      <Katex tex="w=-5t^2" /> but were unable to write down the values of <Katex tex="w" />.
    </>
  ),
}

const EXAM_H: SAExaminerStats = {
  marks: [98, 2],
  average: 0.02,
  comment: (
    <>
      This question was attempted by only a small number of students. When the correct answer
      was given, it was sometimes accompanied with incorrect values of <Katex tex="m" /> and{' '}
      <Katex tex="n" />. The key word in this part is <em>restrictions</em>. There were no
      restrictions on <Katex tex="m" />, <Katex tex="n" /> or <Katex tex="k" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = x^3-x \implies f'(x) = 3x^2-1" />,
    reason: <>So the tangent at <Katex tex="x=a" /> has gradient <Katex tex="3a^2-1" />.</>,
  },
  {
    working: <Katex display tex="g_a: \ y-\left(a^3-a\right) = \left(3a^2-1\right)(x-a)" />,
    reason: <>Point–gradient form through <Katex tex="\bigl(a,f(a)\bigr)" />. The brackets around <Katex tex="3a^2-1" /> are what the report says most students dropped.</>,
  },
  {
    working: <Katex display tex="\text{at } (b,0): \ -\left(a^3-a\right) = \left(3a^2-1\right)(b-a)" />,
    reason: <>Substituting the <Katex tex="x" />-intercept.</>,
  },
  {
    working: <Katex display tex="-a^3+a = 3a^2b-3a^3-b+a" />,
    reason: <>Expanding the right-hand side.</>,
  },
  {
    working: <Katex display tex="-a^3+3a^3 = 3a^2b-b \implies 2a^3 = b\left(3a^2-1\right)" />,
    reason: <>The <Katex tex="+a" /> cancels from both sides; collect the <Katex tex="b" /> terms.</>,
  },
  {
    working: <Katex display tex="\boxed{b = \frac{2a^3}{3a^2-1}} \ \checkmark" />,
    reason: <>Every line shown — this is a "show that", so the steps are the marks.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="b \text{ undefined} \iff 3a^2-1 = 0" />,
    reason: <>A fraction fails only where its denominator vanishes.</>,
  },
  {
    working: <Katex display tex="a^2 = \tfrac13 \implies a = \pm\frac{1}{\sqrt3}" />,
    reason: <>Both signs — writing only one costs the mark.</>,
  },
  {
    working: <Katex display tex="\boxed{a = \pm\frac{\sqrt3}{3}}" />,
    reason: <>Rationalised, and exact: about <Katex tex="\pm0.577" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{at } a = \pm\tfrac{\sqrt3}{3}: \ f'(a) = 3a^2-1 = 0" />,
    reason: <>The same condition that killed the denominator is the condition for zero gradient — these are the turning points of <Katex tex="f" />.</>,
  },
  {
    working: <Katex display tex="f\!\left(\pm\tfrac{\sqrt3}{3}\right) = \mp\tfrac{2\sqrt3}{9} \ne 0" />,
    reason: <>So the tangent is a horizontal line that sits above or below the <Katex tex="x" />-axis and never meets it — which is exactly why <Katex tex="b" /> does not exist.</>,
  },
  {
    working: <Katex display tex="\boxed{g_a \text{ is a horizontal line}}" />,
    reason: <>Describe the <em>tangent</em>, not the curve. "Maximum", "inflection" and "asymptote" all describe something else.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{2a^3}{3a^2-1} = 1.1" />,
    reason: <>Straight from part a.</>,
  },
  {
    working: <Cas fn="solve">solve(2a³/(3a² − 1) = 1.1, a)</Cas>,
    reason: <>Rearranged this is the cubic <Katex tex="2a^3-3.3a^2+1.1=0" />, so expect up to three roots.</>,
  },
  {
    working: <Katex display tex="\boxed{a = -0.5052, \ 0.8084, \ 1.3468}" />,
    reason: <>All three, to four decimal places. Two sit either side of the asymptote at <Katex tex="a=\tfrac{\sqrt3}{3}\approx0.577" />.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="b = 1: \ 2a^3 = 3a^2-1 \implies (a-1)^2(2a+1) = 0" />,
    reason: <>Worth factorising by hand: <Katex tex="a=1" /> is a <em>double</em> root, so <Katex tex="b=1" /> is a local minimum of <Katex tex="b" /> there, not a crossing.</>,
  },
  {
    working: <Katex display tex="\implies a = -\tfrac12 \text{ or } a = 1" />,
    reason: <>The two places where <Katex tex="b" /> equals exactly 1.</>,
  },
  {
    working: <Katex display tex="b = 1.1 \text{ at } a = -0.5052,\ 0.8084,\ 1.3468 \ \text{(part d.i)}" />,
    reason: <>These are the open ends, since <Katex tex="b<1.1" /> is strict.</>,
  },
  {
    working: <Katex display tex="\text{branch } a<\tfrac{-\sqrt3}{3}\text{--}\tfrac{\sqrt3}{3}: \ b \text{ falls from } 1.1 \text{ to } 1 \text{ across } (-0.5052,-0.5]" />,
    reason: <>Test a point: <Katex tex="a=-0.502" /> gives <Katex tex="b=1.037" /> ✓. The closed end is where <Katex tex="b=1" /> exactly.</>,
  },
  {
    working: <Katex display tex="\text{branch } a>\tfrac{\sqrt3}{3}: \ b \text{ dips from } 1.1 \text{ to } 1 \text{ at } a=1 \text{ and back to } 1.1" />,
    reason: <>The double root means <Katex tex="b" /> touches 1 without crossing, so the whole stretch between the two 1.1's qualifies.</>,
  },
  {
    working: <Katex display tex="\boxed{(-0.505,\ -0.500\,] \ \cup \ (0.808,\ 1.347)}" />,
    reason: <>To three decimal places. Square bracket only where <Katex tex="b=1" /> is attained at an endpoint; round brackets where <Katex tex="b=1.1" />.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="g_a \parallel g_b \iff f'(a) = f'(b) \iff 3a^2-1 = 3b^2-1" />,
    reason: <>Parallel means equal gradients.</>,
  },
  {
    working: <Katex display tex="a^2 = b^2 \implies b = a \text{ or } b = -a" />,
    reason: <>The question rules out <Katex tex="b=a" />, so the second case is the one that matters — but both must be checked to know which values to discard.</>,
  },
  {
    working: <Katex display tex="b = -a: \ \frac{2a^3}{3a^2-1} = -a \implies 2a^3 = -3a^3+a" />,
    reason: <>Using the part a. formula, as the report says most students failed to do.</>,
  },
  {
    working: <Katex display tex="5a^3-a = 0 \implies a\left(5a^2-1\right) = 0" />,
    reason: <>So <Katex tex="a=0" /> or <Katex tex="a=\pm\tfrac{1}{\sqrt5}" />.</>,
  },
  {
    working: <Katex display tex="b = a: \ \frac{2a^3}{3a^2-1} = a \implies a^3-a = 0 \implies a = 0,\ \pm1" />,
    reason: <>These are the self-tangent cases, excluded by <Katex tex="b\ne a" /> — and <Katex tex="a=0" /> appears in both lists, so it goes.</>,
  },
  {
    working: <Katex display tex="\boxed{a = \pm\frac{\sqrt5}{5}}" />,
    reason: <>About <Katex tex="\pm0.447" />, matching the picture: <Katex tex="g_a" /> touches at <Katex tex="a" /> and crosses the axis at <Katex tex="b=-a" />, where <Katex tex="g_b" /> runs parallel to it.</>,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="p(-x) = (-x)^3+w(-x)" />,
    reason: <>Substitute <Katex tex="-x" /> everywhere <Katex tex="x" /> appears — brackets included, which is where the report says marks went.</>,
  },
  {
    working: <Katex display tex="= -x^3-wx" />,
    reason: <><Katex tex="(-x)^3=-x^3" /> because the power is odd.</>,
  },
  {
    working: <Katex display tex="= -\left(x^3+wx\right)" />,
    reason: <>Factor out <Katex tex="-1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{= -p(x) \ \text{ for all } w\in R} \ \checkmark" />,
    reason: <>Note <Katex tex="w" /> was never given a value, so the argument holds for every <Katex tex="w" /> — testing one number would not prove it.</>,
  },
]

const ROWS_G: WorkingRow[] = [
  {
    working: <Katex display tex="p'(x) = 3x^2+w \implies \text{gradient at } t \text{ is } 3t^2+w" />,
    reason: <>The tangent we need.</>,
  },
  {
    working: <Katex display tex="y-\left(t^3+wt\right) = \left(3t^2+w\right)(x-t)" />,
    reason: <>Point–gradient form at <Katex tex="\bigl(t,p(t)\bigr)" />.</>,
  },
  {
    working: <Katex display tex="\text{at } (-t,0): \ -\left(t^3+wt\right) = \left(3t^2+w\right)(-2t)" />,
    reason: <><Katex tex="x-t=-t-t=-2t" />.</>,
  },
  {
    working: <Katex display tex="-t^3-wt = -6t^3-2wt \implies 5t^3+wt = 0" />,
    reason: <>Collecting everything on one side.</>,
  },
  {
    working: <Katex display tex="t\left(5t^2+w\right) = 0, \ t>0 \implies w = -5t^2" />,
    reason: <><Katex tex="t\ne0" />, so the bracket must vanish.</>,
  },
  {
    working: <Katex display tex="\boxed{w<0}" />,
    reason: <>The question asks for the values of <Katex tex="w" />, not a formula: as <Katex tex="t" /> runs over all positives, <Katex tex="-5t^2" /> runs over every negative number. This last step is what the 3% who scored the mark did.</>,
  },
]

const ROWS_H: WorkingRow[] = [
  {
    working: <Katex display tex="T\!\begin{bmatrix}x\\y\end{bmatrix} = \begin{bmatrix}mx+h\\ny+k\end{bmatrix}" />,
    reason: <>A dilation by <Katex tex="m" /> horizontally and <Katex tex="n" /> vertically, then a translation by <Katex tex="(h,k)" />.</>,
  },
  {
    working: <Katex display tex="\text{need } \frac{dY}{dX}\bigg|_{X=t} = \frac{dY}{dX}\bigg|_{X=-t} \ \text{ for all } t\ne0" />,
    reason: <>Part f. says <Katex tex="p" /> itself has this property, because it is odd about the origin. The image keeps it only if it stays symmetric about <em>its own</em> centre and that centre sits at <Katex tex="x=0" />.</>,
  },
  {
    working: <Katex display tex="X = mx+h \implies x = \frac{X-h}{m}, \quad Y = np\!\left(\frac{X-h}{m}\right)+k" />,
    reason: <>The image rule.</>,
  },
  {
    working: <Katex display tex="\frac{dY}{dX} = \frac{n}{m}p'\!\left(\frac{X-h}{m}\right), \quad p' \text{ even}" />,
    reason: <><Katex tex="p'(x)=3x^2+w" /> is even, so the gradients at <Katex tex="X=t" /> and <Katex tex="X=-t" /> agree exactly when <Katex tex="\tfrac{t-h}{m}" /> and <Katex tex="\tfrac{-t-h}{m}" /> are negatives of each other — that is, when <Katex tex="h=0" />.</>,
  },
  {
    working: <Katex display tex="\text{vertical stretch } n \text{ and shift } k \text{ scale the gradients equally at } \pm t" />,
    reason: <>So they never break the property; nor does the horizontal dilation <Katex tex="m" />.</>,
  },
  {
    working: <Katex display tex="\boxed{h = 0; \ \text{no restriction on } m, n, k}" />,
    reason: <>Only the horizontal translation can move the point of symmetry off the vertical axis. The key word is <em>restrictions</em>: <Katex tex="m,n\in R\setminus\{0\}" /> and <Katex tex="k\in R" /> were already given.</>,
  },
]

export default function MethodsQ5_2020Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (13 marks)</p>
        <p>
          Let <Katex tex="f:R\to R" />, <Katex tex="f(x)=x^3-x" />. Let{' '}
          <Katex tex="g_a:R\to R" /> be the function representing the tangent to the graph of{' '}
          <Katex tex="f" /> at <Katex tex="x=a" />, where <Katex tex="a\in R" />. Let{' '}
          <Katex tex="(b,0)" /> be the <Katex tex="x" />-intercept of the graph of{' '}
          <Katex tex="g_a" />.
        </p>
      </div>

      <PartCard
        letter="a"
        marks={3}
        statement={<>Show that <Katex tex="b=\dfrac{2a^3}{3a^2-1}" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={1}
        statement={<>State the values of <Katex tex="a" /> for which <Katex tex="b" /> does not exist.</>}
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        marks={1}
        statement={
          <>
            State the nature of the graph of <Katex tex="g_a" /> when <Katex tex="b" /> does
            not exist.
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
            State all values of <Katex tex="a" /> for which <Katex tex="b=1.1" />. Give your
            answers correct to four decimal places.
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
            The graph of <Katex tex="f" /> has an <Katex tex="x" />-intercept at{' '}
            <Katex tex="(1,0)" />. State the values of <Katex tex="a" /> for which{' '}
            <Katex tex="1\le b<1.1" />. Give your answers correct to three decimal places.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1 flex flex-col gap-3">
        <p>
          The coordinate <Katex tex="(b,0)" /> is the horizontal axis intercept of{' '}
          <Katex tex="g_a" />. Let <Katex tex="g_b" /> be the function representing the
          tangent to the graph of <Katex tex="f" /> at <Katex tex="x=b" />, as shown in the
          graph below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={tangentsSrc}
            alt="The cubic f with two straight lines labelled g sub a and g sub b drawn tangent to it, meeting the horizontal axis at b and a respectively — from the original 2020 VCAA exam paper"
            className="w-full max-w-[420px]"
          />
        </div>
      </div>

      <PartCard
        letter="e"
        marks={3}
        statement={
          <>
            Find the values of <Katex tex="a" /> for which the graphs of <Katex tex="g_a" />{' '}
            and <Katex tex="g_b" />, where <Katex tex="b" /> exists, are parallel and where{' '}
            <Katex tex="b\ne a" />.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        <p>
          Let <Katex tex="p:R\to R" />, <Katex tex="p(x)=x^3+wx" />, where{' '}
          <Katex tex="w\in R" />.
        </p>
      </div>

      <PartCard
        letter="f"
        marks={1}
        statement={
          <>
            Show that <Katex tex="p(-x)=-p(x)" /> for all <Katex tex="w\in R" />.
          </>
        }
        examinerReport={EXAM_F}
      >
        <WorkingTable rows={ROWS_F} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1">
        <p>
          A property of the graphs of <Katex tex="p" /> is that two distinct parallel tangents
          will always occur at <Katex tex="\bigl(t,p(t)\bigr)" /> and{' '}
          <Katex tex="\bigl(-t,p(-t)\bigr)" /> for all <Katex tex="t\ne0" />.
        </p>
      </div>

      <PartCard
        letter="g"
        marks={1}
        statement={
          <>
            Find all values of <Katex tex="w" /> such that a tangent to the graph of{' '}
            <Katex tex="p" /> at <Katex tex="\bigl(t,p(t)\bigr)" />, for some{' '}
            <Katex tex="t>0" />, will have an <Katex tex="x" />-intercept at{' '}
            <Katex tex="(-t,0)" />.
          </>
        }
        examinerReport={EXAM_G}
      >
        <WorkingTable rows={ROWS_G} />
      </PartCard>

      <PartCard
        letter="h"
        marks={1}
        statement={
          <>
            Let{' '}
            <Katex tex="T:R^2\to R^2,\ T\!\begin{bmatrix}x\\y\end{bmatrix}=\begin{bmatrix}m&0\\0&n\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix}+\begin{bmatrix}h\\k\end{bmatrix}" />
            , where <Katex tex="m,n\in R\setminus\{0\}" /> and <Katex tex="h,k\in R" />. State
            any restrictions on the values of <Katex tex="m" />, <Katex tex="n" />,{' '}
            <Katex tex="h" /> and <Katex tex="k" />, given that the image of <Katex tex="p" />{' '}
            under the transformation <Katex tex="T" /> always has the property that parallel
            tangents occur at <Katex tex="x=-t" /> and <Katex tex="x=t" /> for all{' '}
            <Katex tex="t\ne0" />.
          </>
        }
        examinerReport={EXAM_H}
      >
        <WorkingTable rows={ROWS_H} />
      </PartCard>
    </div>
  )
}
