// 2016 Mathematical Methods — Exam 1, Question 6 (5 marks).
// Average rate of change and average value of 2sin(2x) − 1 over the same interval — two
// different averages, deliberately side by side. Question text transcribed from the
// original paper (no diagram given). Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [37, 31, 32],
  average: 1.0,
  comment: (
    <>
      Most students used the correct gradient rule but erred when evaluating, particularly{' '}
      <Katex tex="f\!\left(-\tfrac{\pi}{3}\right)" /> or in dealing with fractions in the
      denominator. A few students confused average rate of change with average value, and
      some incorrectly found the average of derivatives.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [31, 23, 30, 16],
  average: 1.3,
  comment: (
    <>
      Most students used the correct expression for average value. As with the previous part
      of the question, arithmetic errors, especially when substituting the terminals, caused
      difficulties. Some students omitted the <Katex tex="-1" /> in the integrand, while
      others misplaced negative signs or the constant of <Katex tex="2" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f\!\left(-\frac{\pi}{3}\right) = 2\sin\!\left(-\frac{2\pi}{3}\right)-1" />,
    reason: <>Double the input inside the sine. <Katex tex="2\times\left(-\tfrac{\pi}{3}\right)=-\tfrac{2\pi}{3}" />.</>,
  },
  {
    working: <Katex display tex="= 2\left(-\frac{\sqrt3}{2}\right)-1 = -\sqrt3-1" />,
    reason: <><Katex tex="-\tfrac{2\pi}{3}" /> is in the third quadrant, reference angle <Katex tex="\tfrac{\pi}{3}" />, so the sine is <Katex tex="-\tfrac{\sqrt3}{2}" />. The report says this evaluation caused the most trouble.</>,
  },
  {
    working: <Katex display tex="f\!\left(\frac{\pi}{6}\right) = 2\sin\!\left(\frac{\pi}{3}\right)-1 = \sqrt3-1" />,
    reason: <>First quadrant this time.</>,
  },
  {
    working: <Katex display tex="\text{rate} = \frac{\left(\sqrt3-1\right)-\left(-\sqrt3-1\right)}{\frac{\pi}{6}-\left(-\frac{\pi}{3}\right)}" />,
    reason: <>Change in <Katex tex="y" /> over change in <Katex tex="x" /> — the gradient of the chord.</>,
  },
  {
    working: <Katex display tex="= \frac{2\sqrt3}{\frac{\pi}{2}}" />,
    reason: <>The <Katex tex="-1" />s cancel in the numerator; <Katex tex="\tfrac{\pi}{6}+\tfrac{2\pi}{6}=\tfrac{\pi}{2}" /> in the denominator.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{4\sqrt3}{\pi}}" />,
    reason: <>Dividing by <Katex tex="\tfrac{\pi}{2}" /> means multiplying by <Katex tex="\tfrac{2}{\pi}" />. About <Katex tex="2.21" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\text{average value} = \frac{1}{b-a}\int_a^b f(x)\,dx" />,
    reason: <>A different average entirely: the mean <em>height</em> of the graph, not the mean gradient.</>,
  },
  {
    working: <Katex display tex="b-a = \frac{\pi}{6}-\left(-\frac{\pi}{3}\right) = \frac{\pi}{2}" />,
    reason: <>The same interval width as part (a).</>,
  },
  {
    working: <Katex display tex="\int\bigl(2\sin(2x)-1\bigr)dx = -\cos(2x)-x" />,
    reason: <>The <Katex tex="2" /> out front and the <Katex tex="\tfrac12" /> from the chain rule cancel. Dropping the <Katex tex="-1" /> is one of the report's noted slips.</>,
  },
  {
    working: <Katex display tex="\Bigl[-\cos(2x)-x\Bigr]_{-\pi/3}^{\pi/6} = \left(-\frac12-\frac{\pi}{6}\right)-\left(\frac12+\frac{\pi}{3}\right)" />,
    reason: <>At <Katex tex="\tfrac{\pi}{6}" />: <Katex tex="-\cos\tfrac{\pi}{3}=-\tfrac12" />. At <Katex tex="-\tfrac{\pi}{3}" />: <Katex tex="-\cos\left(-\tfrac{2\pi}{3}\right)=+\tfrac12" /> and <Katex tex="-\left(-\tfrac{\pi}{3}\right)=+\tfrac{\pi}{3}" />.</>,
  },
  {
    working: <Katex display tex="= -1-\frac{\pi}{2}" />,
    reason: <>Collecting.</>,
  },
  {
    working: <Katex display tex="\text{average} = \frac{2}{\pi}\left(-1-\frac{\pi}{2}\right)" />,
    reason: <>Dividing by the interval width <Katex tex="\tfrac{\pi}{2}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{-\frac{2}{\pi}-1}" />,
    reason: <>About <Katex tex="-1.64" />. Sensible: the graph oscillates about <Katex tex="y=-1" /> and spends most of this interval below that line.</>,
  },
]

export default function MethodsQ6_2016Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 6 (5 marks)</p>
        <p>
          Let <Katex tex="f:[-\pi,\pi]\to R" />, where <Katex tex="f(x)=2\sin(2x)-1" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Average Rate"
        marks={2}
        statement={
          <>
            Calculate the average rate of change of <Katex tex="f" /> between{' '}
            <Katex tex="x=-\tfrac{\pi}{3}" /> and <Katex tex="x=\tfrac{\pi}{6}" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="Two different averages">
          <p>
            <strong>Average rate of change</strong> is{' '}
            <Katex tex="\dfrac{f(b)-f(a)}{b-a}" /> — the gradient of the straight line
            joining the endpoints. Only the two endpoint values matter.
          </p>
          <p>
            <strong>Average value</strong> is{' '}
            <Katex tex="\dfrac{1}{b-a}\displaystyle\int_a^b f(x)\,dx" /> — the constant
            height a rectangle on the same base would need to have the same area. Every
            point in between matters.
          </p>
          <p>
            The question asks for both, over the same interval, to see whether you can tell
            them apart.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Average Value"
        marks={3}
        statement={
          <>
            Calculate the average value of <Katex tex="f" /> over the interval{' '}
            <Katex tex="-\tfrac{\pi}{3}\le x\le\tfrac{\pi}{6}" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
