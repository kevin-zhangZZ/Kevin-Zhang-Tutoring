// 2019 Mathematical Methods — Exam 2, Question 1 (11 marks).
// f(x) = x²e^(−x²) — its derivative, the stationary point at the origin, the maximum value
// (part b), the tangent at x=−1 and the area it encloses with f (part c), then the minimum
// distance from a point on the graph to (0, e) (part d). Question text transcribed from the
// original paper (no diagram given). Cross-checked against the VCAA examination report and
// itute's independent solutions, and independently re-derived (the numeric parts of b, c, d
// by CAS/computer algebra, matching both sources exactly). Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [6, 94],
  average: 1.0,
  comment: (
    <>
      This question was answered well. Some students appeared to transcribe the output from
      technology incorrectly: <Katex tex="f'(x)=2x^3e^{-x^2}-2xe^{-x^2}" /> and{' '}
      <Katex tex="f'(x)=2e^{-x^2}-2x^3e^{-x^2}" /> were occasionally seen. Others tried to find
      the derivative by hand or further engaged with the output from technology and made
      errors.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [28, 72],
  average: 0.7,
  comment: (
    <>
      This question was answered well. Some students did not understand what the term
      "nature of the stationary point" meant. Common incorrect answers were point of
      inflection, stationary points and turning points. Some gave the coordinates of the
      turning point, <Katex tex="(0,0)" />.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [10, 22, 67],
  average: 1.6,
  comment: (
    <>
      Some students included <Katex tex="x=0" /> or only gave one answer for <Katex tex="x" />.
      Others did not find the maximum value. Some gave the approximate answer for the maximum
      value. An exact answer was required.
    </>
  ),
}

const EXAM_BIII: SAExaminerStats = {
  marks: [65, 35],
  average: 0.4,
  comment: (
    <>
      This question was not answered well. Common incorrect answers were{' '}
      <Katex tex="d=-\tfrac1e" />, <Katex tex="d\le-\tfrac1e" />, <Katex tex="d>\tfrac1e" />,{' '}
      <Katex tex="d\ge-\tfrac1e" /> and <Katex tex="d<\tfrac1e" />. Some students wrote{' '}
      <Katex tex="-\tfrac1e" /> alone, with no inequality. Others did not attempt the question.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [21, 79],
  average: 0.8,
  comment: <>This question was answered well. An equation was required.</>,
}

const EXAM_CII: SAExaminerStats = {
  marks: [32, 12, 56],
  average: 1.3,
  comment: (
    <>
      Most students were able to subtract <Katex tex="f" /> from their tangent. Common
      incorrect methods included integrating <Katex tex="f" /> alone, or over the wrong
      interval.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [46, 23, 7, 24],
  average: 1.1,
  comment: (
    <>
      Many students were able to use the distance formula. Others found <Katex tex="m" /> but
      not the distance. Some gave their answers correct to two decimal places.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = 2xe^{-x^2} + x^2\cdot(-2x)e^{-x^2}" />,
    reason: <>Product rule, with <Katex tex="\dfrac{d}{dx}e^{-x^2}=-2xe^{-x^2}" /> by the chain rule.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x) = 2xe^{-x^2}-2x^3e^{-x^2}}" />,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = 2x(1-x^2)e^{-x^2}" />,
    reason: <>Factorise part (a)'s derivative.</>,
  },
  {
    working: (
      <>
        For small <Katex tex="x<0" />: <Katex tex="f'(x)<0" />. For small <Katex tex="x>0" />:{' '}
        <Katex tex="f'(x)>0" />.
      </>
    ),
    reason: <>Near <Katex tex="x=0" />, the sign of <Katex tex="f'(x)" /> matches the sign of <Katex tex="2x" /> (since <Katex tex="(1-x^2)e^{-x^2}>0" /> there).</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Local minimum}}" />,
    reason: <><Katex tex="f" /> is decreasing then increasing through <Katex tex="x=0" />.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x)=0 \iff 2x(1-x^2)e^{-x^2}=0 \iff x=-1,\ 0 \text{ or } 1" />,
  },
  {
    working: <Katex display tex="f(-1)=f(1)=1\cdot e^{-1}=\dfrac1e, \qquad f(0)=0" />,
    reason: <><Katex tex="f" /> is even, so <Katex tex="f(-1)=f(1)" />; the origin is the local minimum found in part (b)(i).</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Maximum value } \dfrac1e, \text{ occurring at } x=-1 \text{ and } x=1}" />,
  },
]

const ROWS_BIII: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)\in\left[0,\dfrac1e\right] \text{ for every real } x" />,
    reason: <>Part (b)(ii)'s value <Katex tex="\tfrac1e" /> is the global maximum of <Katex tex="f" />; <Katex tex="f(x)\ge0" /> always since <Katex tex="f(x)=x^2e^{-x^2}" /> is a square times a positive exponential.</>,
  },
  {
    working: <Katex display tex="f(x)+d<0 \text{ for every } x \iff d < -\max_x f(x) = -\dfrac1e" />,
  },
  {
    working: <Katex display tex="\boxed{d<-\dfrac1e}" />,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <Katex display tex="f'(-1) = 2(-1)\bigl(1-(-1)^2\bigr)e^{-1} = 2(-1)(0)e^{-1}=0" />,
    reason: <><Katex tex="x=-1" /> is one of the stationary points found in part (b)(ii), so the tangent there is horizontal.</>,
  },
  {
    working: <Katex display tex="\boxed{y=\dfrac1e}" />,
    reason: <><Katex tex="f(-1)=\tfrac1e" /> from part (b)(ii).</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Tangent touches } f \text{ again where } f(x)=\dfrac1e \iff x=1 \text{ (part b.ii, the other maximum)}" />,
  },
  {
    working: <Katex display tex="\text{Area} = \int_{-1}^{1}\left(\dfrac1e - x^2e^{-x^2}\right)dx" />,
    reason: <>On <Katex tex="[-1,1]" />, <Katex tex="f(x)\le\tfrac1e" /> (part b.ii), so the horizontal tangent line lies on or above <Katex tex="f" /> throughout.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Area} \approx 0.3568} \text{ (by CAS)}" />,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="M=(m,f(m)) = \bigl(m,\ m^2e^{-m^2}\bigr), \qquad m\in[0,1]" />,
  },
  {
    working: <Katex display tex="D(m) = \sqrt{(m-0)^2+\bigl(m^2e^{-m^2}-e\bigr)^2}" />,
    reason: <>Distance from <Katex tex="M" /> to <Katex tex="(0,e)" />.</>,
  },
  {
    working: <Katex display tex="\text{Minimise } D(m) \text{ on } [0,1] \text{ (by CAS)}" />,
  },
  {
    working: <Katex display tex="\boxed{\text{Minimum distance} \approx 2.511, \text{ at } m\approx0.783}" />,
  },
]

export default function MethodsQ1_2019Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (11 marks)</p>
        <p>
          Let <Katex tex="f:\mathbb{R}\to\mathbb{R},\ f(x)=x^2e^{-x^2}" />.
        </p>
      </div>

      <PartCard letter="a" marks={1} statement={<>Find <Katex tex="f'(x)" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b.i" marks={1} statement={<>State the nature of the stationary point on the graph of <Katex tex="f" /> at the origin.</>} examinerReport={EXAM_BI}>
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard letter="b.ii" marks={2} statement={<>Find the maximum value of the function <Katex tex="f" /> and the values of <Katex tex="x" /> for which the maximum occurs.</>} examinerReport={EXAM_BII}>
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard letter="b.iii" marks={1} statement={<>Find the values of <Katex tex="d\in\mathbb{R}" /> for which <Katex tex="f(x)+d" /> is always negative.</>} examinerReport={EXAM_BIII}>
        <WorkingTable rows={ROWS_BIII} />
      </PartCard>

      <PartCard letter="c.i" marks={1} statement={<>Find the equation of the tangent to the graph of <Katex tex="f" /> at <Katex tex="x=-1" />.</>} examinerReport={EXAM_CI}>
        <WorkingTable rows={ROWS_CI} />
      </PartCard>

      <PartCard letter="c.ii" marks={2} statement={<>Find the area enclosed by the graph of <Katex tex="f" /> and the tangent to the graph of <Katex tex="f" /> at <Katex tex="x=-1" />, correct to four decimal places.</>} examinerReport={EXAM_CII}>
        <WorkingTable rows={ROWS_CII} />
      </PartCard>

      <PartCard
        letter="d"
        marks={3}
        statement={<>Let <Katex tex="M(m,n)" /> be a point on the graph of <Katex tex="f" />, where <Katex tex="m\in[0,1]" />. Find the minimum distance between <Katex tex="M" /> and the point <Katex tex="(0,e)" />, and the value of <Katex tex="m" /> for which this occurs, correct to three decimal places.</>}
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>
    </div>
  )
}
