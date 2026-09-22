// 2024 Mathematical Methods — Exam 2, Section B Question 1 (12 marks). A quartic with a
// parameter: counting distinct roots, then calculus on the a = 1 case, then matching one
// quartic to another by transformation. Question text transcribed from the original paper
// (2024 papers are image-only, so read from rendered pages). Answers checked with sympy and
// against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [15, 85],
  average: 0.9,
  comment: <>This question was answered well.</>,
}

const EXAM_BI: SAExaminerStats = {
  marks: [29, 61, 10],
  average: 0.8,
  comment: <>Some of the values were often missing.</>,
}

const EXAM_BII: SAExaminerStats = {
  marks: [69, 31],
  average: 0.3,
  comment: (
    <>
      This question was not answered well. Some students did not exclude <Katex tex="1" />.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [5, 95],
  average: 1.0,
  comment: <>This question was answered well.</>,
}

const EXAM_CII: SAExaminerStats = {
  marks: [24, 76],
  average: 0.8,
  comment: (
    <>
      Exact answers were required. <Katex tex="(0.5,5.06)" /> was sometimes seen.
    </>
  ),
}

const EXAM_CIII: SAExaminerStats = {
  marks: [29, 71],
  average: 0.7,
  comment: (
    <>
      This question was answered well. Some students used square brackets instead of round
      brackets. Others put <Katex tex="\cap" /> instead of <Katex tex="\cup" />.
    </>
  ),
}

const EXAM_CIV: SAExaminerStats = {
  marks: [32, 17, 51],
  average: 1.2,
  comment: (
    <>
      This question was answered reasonably well. A common incorrect answer was{' '}
      <Katex tex="\left(\tfrac12,\tfrac{81}{16}\right)" /> — the local maximum rather than the
      point where the tangents meet.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [63, 37],
  average: 0.4,
  comment: (
    <>
      Some students incorrectly translated to the left and down. Others had an incorrect value
      for the vertical translation, such as <Katex tex="\tfrac{81}{16}" />. Exact answers were
      required; <Katex tex="1.06" /> was sometimes seen.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [76, 19, 5],
  average: 0.3,
  comment: (
    <>
      This question was not done well. The vertical translation could be completed at any
      stage in the sequence; the other transformations had to be in the correct order.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = (x+1)(x+a)(x-2)(x-2a) = 0" />,
    reason: 'Already fully factorised — the null factor law is all that is needed.',
  },
  {
    working: <Katex display tex="\boxed{x = -1,\ -a,\ 2,\ 2a}" />,
    reason: <>Each bracket set to zero in turn. Note the signs: <Katex tex="x+a=0" /> gives <Katex tex="x=-a" />, not <Katex tex="x=a" />.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\{-1,\ -a,\ 2,\ 2a\}" />,
    reason: 'Four roots are listed, so three intercepts means exactly one coincidence among them — and no more than one.',
  },
  {
    working: <Katex display tex="-a = 2 \implies a = -2: \quad \{-1,\,2,\,2,\,-4\} \to \text{3 distinct}" />,
    reason: 'Pair off the four roots two at a time and test each equation.',
  },
  {
    working: <Katex display tex="-a = 2a \implies a = 0: \quad \{-1,\,0,\,2,\,0\} \to \text{3 distinct}" />,
    reason: <>The <Katex tex="a=0" /> case is easy to overlook because both repeated roots are 0.</>,
  },
  {
    working: <Katex display tex="2a = -1 \implies a = -\tfrac12: \quad \{-1,\,\tfrac12,\,2,\,-1\} \to \text{3 distinct}" />,
    reason: 'Three found so far.',
  },
  {
    working: <Katex display tex="-a = -1 \text{ or } 2a = 2 \implies a = 1: \quad \{-1,\,-1,\,2,\,2\} \to \text{2 distinct}" />,
    reason: <>Both coincidences happen at once, so <Katex tex="a=1" /> gives two intercepts, not three — it must be excluded.</>,
  },
  {
    working: <Katex display tex="\boxed{a = -2,\ -\tfrac12,\ 0}" />,
    reason: <>The remaining pairing, <Katex tex="-1=2" />, is impossible.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Four intercepts} \iff \text{all four roots distinct}" />,
    reason: 'So exclude every value of a that makes any two of them coincide.',
  },
  {
    working: <Katex display tex="\text{Excluded: } a = -2,\ -\tfrac12,\ 0 \ \text{(three roots)}; \quad a = 1 \ \text{(two roots)}" />,
    reason: <>Part b.i. found the first three; <Katex tex="a=1" /> is the fourth, and it is the one most often forgotten.</>,
  },
  {
    working: <Katex display tex="\boxed{a \in \mathbb{R}\setminus\left\{-2,\,-\tfrac12,\,0,\,1\right\}}" />,
    reason: 'Every other value of a leaves four separate roots.',
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = (x+1)^2(x-2)^2" />,
    reason: <>Putting <Katex tex="a=1" /> into <Katex tex="f" /> pairs the brackets up.</>,
  },
  {
    working: <Katex display tex="g'(x) = 2(x+1)(x-2)^2 + (x+1)^2\cdot 2(x-2)" />,
    reason: 'Product rule, with the chain rule on each squared bracket.',
  },
  {
    working: <Katex display tex="= 2(x+1)(x-2)\bigl[(x-2)+(x+1)\bigr]" />,
    reason: 'Taking out the common factor rather than expanding — the factorised form is what parts c.ii. and c.iii. need.',
  },
  {
    working: <Katex display tex="\boxed{g'(x) = 2(x+1)(x-2)(2x-1) = 4x^3-6x^2-6x+4}" />,
    reason: 'Either form is accepted.',
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="g'(x) = 0 \implies x = -1,\ 2,\ \tfrac12" />,
    reason: 'The three stationary points, straight from the factorised derivative.',
  },
  {
    working: <Katex display tex="g(-1) = 0, \quad g(2) = 0" />,
    reason: <>Both are repeated roots of <Katex tex="g" />, so both are local <em>minima</em> sitting on the axis.</>,
  },
  {
    working: <Katex display tex="g\!\left(\tfrac12\right) = \left(\tfrac32\right)^2\left(-\tfrac32\right)^2 = \tfrac94\cdot\tfrac94" />,
    reason: 'The middle stationary point is the only candidate left, so it is the local maximum.',
  },
  {
    working: <Katex display tex="\boxed{\left(\tfrac12,\ \tfrac{81}{16}\right)}" />,
    reason: <>Exact coordinates were required — <Katex tex="(0.5,\,5.0625)" /> is also exact, but <Katex tex="(0.5,\,5.06)" /> is not.</>,
  },
]

const ROWS_CIII: WorkingRow[] = [
  {
    working: <Katex display tex="g'(x) = 2(x+1)(x-2)(2x-1)" />,
    reason: <>A cubic with positive leading coefficient and three simple zeros at <Katex tex="-1" />, <Katex tex="\tfrac12" />, <Katex tex="2" />.</>,
  },
  {
    working: <Katex display tex="\text{sign of } g': \quad - \ \big|_{-1} \ + \ \big|_{1/2} \ - \ \big|_{2} \ +" />,
    reason: 'The sign alternates across each simple zero, and the rightmost region is positive.',
  },
  {
    working: <Katex display tex="\boxed{x\in\left(-1,\tfrac12\right)\cup(2,\infty)}" />,
    reason: <>Strict inequality, so round brackets and a union — not an intersection, which is empty.</>,
  },
]

const ROWS_CIV: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = (x+1)^2(x-2)^2 = \left[(x+1)(x-2)\right]^2 = \left(x^2-x-2\right)^2" />,
    reason: 'Writing g as a perfect square exposes the symmetry.',
  },
  {
    working: <Katex display tex="x^2-x-2 = \left(x-\tfrac12\right)^2-\tfrac94 \implies g \text{ is symmetric about } x = \tfrac12" />,
    reason: <>Completing the square inside. So <Katex tex="g\!\left(\tfrac12+u\right)=g\!\left(\tfrac12-u\right)" /> for every <Katex tex="u" />.</>,
  },
  {
    working: <Katex display tex="\frac{-\sqrt3+1}{2} = \tfrac12-\tfrac{\sqrt3}{2}, \qquad \frac{\sqrt3+1}{2} = \tfrac12+\tfrac{\sqrt3}{2}" />,
    reason: <>The two given points are mirror images in <Katex tex="x=\tfrac12" />, so their tangents are mirror images too and must meet <em>on</em> that line.</>,
  },
  {
    working: <Katex display tex="g\!\left(\tfrac12+\tfrac{\sqrt3}{2}\right) = \left(\tfrac34-\tfrac94\right)^2 = \tfrac94, \qquad g'\!\left(\tfrac12+\tfrac{\sqrt3}{2}\right) = -3\sqrt3" />,
    reason: <>Substituting <Katex tex="u=\tfrac{\sqrt3}{2}" /> into <Katex tex="g=\left(u^2-\tfrac94\right)^2" /> and <Katex tex="g'=4u^3-9u" />.</>,
  },
  {
    working: <Katex display tex="y - \tfrac94 = -3\sqrt3\left(x-\tfrac12-\tfrac{\sqrt3}{2}\right)" />,
    reason: 'The tangent at the right-hand point, in point–gradient form.',
  },
  {
    working: <Katex display tex="x = \tfrac12: \quad y = \tfrac94 + 3\sqrt3\cdot\tfrac{\sqrt3}{2} = \tfrac94+\tfrac92" />,
    reason: <>Substituting the axis of symmetry. Or solve the two tangent equations simultaneously on CAS with <Cas fn="solve" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(\tfrac12,\ \tfrac{27}{4}\right)}" />,
    reason: <>Equivalently <Katex tex="(0.5,\,6.75)" />. The two given <Katex tex="x" />-values are in fact the points of inflection of <Katex tex="g" />, which is why the tangents are the steepest ones available.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="h(x) = (x+1)(x-1)(x+2)(x-2) = \left(x^2-1\right)\left(x^2-4\right)" />,
    reason: <>Pairing the brackets shows <Katex tex="h" /> is even, so its graph is symmetric about the <Katex tex="y" />-axis.</>,
  },
  {
    working: <Katex display tex="h'(x) = 4x^3-10x = 2x\left(2x^2-5\right) \implies x = 0,\ \pm\sqrt{\tfrac52}" />,
    reason: <>The outer two are the minima (a positive quartic), so <Katex tex="x=0" /> is the local maximum.</>,
  },
  {
    working: <Katex display tex="h(0) = 4 \implies \text{local maximum } (0,4)" />,
    reason: <>Compare with <Katex tex="g" />, whose local maximum is at <Katex tex="\left(\tfrac12,\tfrac{81}{16}\right)" /> from part c.ii.</>,
  },
  {
    working: <Katex display tex="\tfrac12-0 = \tfrac12, \qquad \tfrac{81}{16}-4 = \tfrac{81}{16}-\tfrac{64}{16} = \tfrac{17}{16}" />,
    reason: 'Subtract to get each translation. Both are positive, so both are in the positive direction.',
  },
  {
    working: <Katex display tex="\boxed{\text{translate } \tfrac12 \text{ unit right and } \tfrac{17}{16} \text{ units up}}" />,
    reason: <>An exact value was required — <Katex tex="1.0625" /> is exact, <Katex tex="1.06" /> is not.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="g: \text{ minima at } (-1,0) \text{ and } (2,0) \quad\text{— separation } 3" />,
    reason: <>Both are repeated roots of <Katex tex="g" />, so both minima sit on the <Katex tex="x" />-axis.</>,
  },
  {
    working: <Katex display tex="h: \text{ minima at } x = \pm\sqrt{\tfrac52} = \pm\tfrac{\sqrt{10}}{2} \quad\text{— separation } \sqrt{10}" />,
    reason: <>From part d.i. A horizontal dilation is the only transformation that can change this separation, so it has to come first.</>,
  },
  {
    working: <Katex display tex="\text{dilation factor} = \frac{3}{\sqrt{10}} = \frac{3\sqrt{10}}{10} \ \text{ from the } y\text{-axis}" />,
    reason: <>Scaling <Katex tex="\sqrt{10}" /> up to <Katex tex="3" />. Rationalising the denominator is the usual house style.</>,
  },
  {
    working: <Katex display tex="\text{minima move to } x = \pm\frac{3}{\sqrt{10}}\cdot\frac{\sqrt{10}}{2} = \pm\tfrac32, \quad y = h\!\left(\pm\tfrac{\sqrt{10}}{2}\right) = -\tfrac94" />,
    reason: <><Katex tex="h\!\left(\tfrac52\right)" /> evaluated from <Katex tex="\left(x^2-1\right)\left(x^2-4\right)" /> with <Katex tex="x^2=\tfrac52" />: <Katex tex="\tfrac32\times\left(-\tfrac32\right)=-\tfrac94" />. The dilation leaves heights alone.</>,
  },
  {
    working: <Katex display tex="\pm\tfrac32 \to -1 \text{ and } 2: \ \text{ right } \tfrac12; \qquad -\tfrac94 \to 0: \ \text{ up } \tfrac94" />,
    reason: 'The midpoint moves from 0 to ½, and the common height from −9/4 to 0.',
  },
  {
    working: <Katex display tex="\boxed{\text{dilate by } \tfrac{3\sqrt{10}}{10} \text{ from the } y\text{-axis, then } \tfrac12 \text{ right and } \tfrac94 \text{ up}}" />,
    reason: <>The dilation must precede the horizontal translation. Doing them the other way round works only if the translation is changed to <Katex tex="\tfrac{\sqrt{10}}{6}" /> units right first — VCAA allowed that alternative. The vertical translation can go anywhere in the sequence.</>,
  },
]

export default function MethodsQ1_2024Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 1 (12 marks)</p>
        <p>
          Consider the function <Katex tex="f:\mathbb{R}\to\mathbb{R}" />,{' '}
          <Katex tex="f(x)=(x+1)(x+a)(x-2)(x-2a)" /> where <Katex tex="a\in\mathbb{R}" />.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Parts a. and b. are about <em>distinct</em> roots. The four bracket-roots{' '}
            <Katex tex="-1,\,-a,\,2,\,2a" /> are a list, not a set: whenever two of them are
            equal the quartic loses an intercept. So the whole of part b. is the bookkeeping
            exercise of pairing them off six ways and seeing which equations have solutions.
          </p>
          <p>
            Parts c. and d. both turn on the same hidden symmetry. Writing{' '}
            <Katex tex="g(x)=\left[(x+1)(x-2)\right]^2=\left(x^2-x-2\right)^2" /> shows that{' '}
            <Katex tex="g" /> is a perfect square, and completing the square inside puts its
            axis of symmetry at <Katex tex="x=\tfrac12" />. That single observation gives the
            local maximum, the tangent intersection, and the target coordinates for the
            transformations — all without expanding anything.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={
          <>
            State, in terms of <Katex tex="a" /> where required, the values of{' '}
            <Katex tex="x" /> for which <Katex tex="f(x)=0" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">b.</p>
        <p>
          Find the values of <Katex tex="a" /> for which the graph of{' '}
          <Katex tex="y=f(x)" /> has
        </p>
      </div>

      <PartCard letter="b.i" marks={2} statement={<>exactly three <Katex tex="x" />-intercepts.</>} examinerReport={EXAM_BI}>
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard letter="b.ii" marks={1} statement={<>exactly four <Katex tex="x" />-intercepts.</>} examinerReport={EXAM_BII}>
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">c.</p>
        <p>
          Let <Katex tex="g" /> be the function <Katex tex="g:\mathbb{R}\to\mathbb{R}" />,{' '}
          <Katex tex="g(x)=(x+1)^2(x-2)^2" />, which is the function <Katex tex="f" /> where{' '}
          <Katex tex="a=1" />.
        </p>
      </div>

      <PartCard letter="c.i" marks={1} statement={<>Find <Katex tex="g'(x)" />.</>} examinerReport={EXAM_CI}>
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard
        letter="c.ii"
        marks={1}
        statement={<>Find the coordinates of the local maximum of <Katex tex="g" />.</>}
        examinerReport={EXAM_CII}
      >
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <PartCard
        letter="c.iii"
        marks={1}
        statement={<>Find the values of <Katex tex="x" /> for which <Katex tex="g'(x)>0" />.</>}
        examinerReport={EXAM_CIII}
      >
        <WorkingTable rows={ROWS_CIII} />
      </PartCard>

      <PartCard
        letter="c.iv"
        marks={2}
        statement={
          <>
            Consider the two tangent lines to the graph of <Katex tex="y=g(x)" /> at the points
            where <Katex tex="x=\dfrac{-\sqrt3+1}{2}" /> and <Katex tex="x=\dfrac{\sqrt3+1}{2}" />.
            Determine the coordinates of the point of intersection of these two tangent lines.
          </>
        }
        examinerReport={EXAM_CIV}
      >
        <WorkingTable rows={ROWS_CIV} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">d.</p>
        <p>
          Let <Katex tex="g" /> remain as the function <Katex tex="g:\mathbb{R}\to\mathbb{R}" />,{' '}
          <Katex tex="g(x)=(x+1)^2(x-2)^2" />, which is the function <Katex tex="f" /> where{' '}
          <Katex tex="a=1" />.
        </p>
        <p>
          Let <Katex tex="h" /> be the function <Katex tex="h:\mathbb{R}\to\mathbb{R}" />,{' '}
          <Katex tex="h(x)=(x+1)(x-1)(x+2)(x-2)" />, which is the function <Katex tex="f" />{' '}
          where <Katex tex="a=-1" />.
        </p>
      </div>

      <PartCard
        letter="d.i"
        marks={1}
        statement={
          <>
            Using translations only, describe a sequence of transformations of{' '}
            <Katex tex="h" />, for which its image would have a local maximum at the same
            coordinates as that of <Katex tex="g" />.
          </>
        }
        examinerReport={EXAM_DI}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        marks={2}
        statement={
          <>
            Using a dilation and translations, describe a different sequence of transformations
            of <Katex tex="h" />, for which its image would have both local minimums at the
            same coordinates as that of <Katex tex="g" />.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>
    </div>
  )
}
