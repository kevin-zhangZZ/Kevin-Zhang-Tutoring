// 2017 Specialist Mathematics — Exam 1, Question 10 (7 marks). A show-that derivative,
// the domain and range of √(arccos(x/2)), and a volume of revolution where the square root
// cancels and part (a) becomes the antiderivative. Question text transcribed from the
// original paper (no diagram given). Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [15, 85],
  average: 0.9,
  comment: (
    <>
      The majority of students answered this question well. A number of students showed
      insufficient working to enable the mark to be awarded; some students simply wrote the
      answer as given. Some students gave a different answer from that given.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [35, 25, 40],
  average: 1.1,
  comment: (
    <>
      This question was not particularly well answered. The most common errors were to state
      the domain as <Katex tex="(-2,2)" /> or <Katex tex="[0,2]" /> or other variations; the
      range was frequently given as <Katex tex="[0,\pi]" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [38, 21, 19, 8, 14],
  average: 1.4,
  comment: (
    <>
      Many students found this question quite challenging. Typical errors included:
      <ul className="list-disc pl-5 my-1">
        <li>trying to find the area rather than the volume of revolution</li>
        <li>forgetting the <Katex tex="\pi" /></li>
        <li>sign errors when attempting to use the result given in part a.</li>
        <li>
          integrating from <Katex tex="-2" /> to <Katex tex="0" /> was common or from{' '}
          <Katex tex="-2" /> to <Katex tex="\pi" />, which was less common.
        </li>
      </ul>
      There were many poor attempts to integrate <Katex tex="\tfrac{x}{\sqrt{4-x^2}}" /> where
      arcsin expressions and incorrect constants or incorrect signs were common. Some students
      attempted to integrate the correct integral expression by turning it into the integration
      of a cos function, finding the area to the <Katex tex="y" />-axis and subtracting from the
      surrounding rectangle. This was occasionally done successfully.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{d}{dx}\left(x\arccos\!\left(\frac{x}{a}\right)\right) = 1\cdot\arccos\!\left(\frac{x}{a}\right)+x\cdot\frac{d}{dx}\arccos\!\left(\frac{x}{a}\right)" />,
    reason: <>Product rule.</>,
  },
  {
    working: <Katex display tex="\frac{d}{dx}\arccos\!\left(\frac{x}{a}\right) = \frac{-1}{\sqrt{1-\frac{x^2}{a^2}}}\times\frac1a" />,
    reason: <>Formula sheet plus the chain rule on <Katex tex="\tfrac{x}{a}" />. Note the minus sign — <Katex tex="\arccos" /> is decreasing.</>,
  },
  {
    working: <Katex display tex="\sqrt{1-\frac{x^2}{a^2}} = \sqrt{\frac{a^2-x^2}{a^2}} = \frac{\sqrt{a^2-x^2}}{a}" />,
    reason: <>Using <Katex tex="a>0" />, so <Katex tex="\sqrt{a^2}=a" />. This is the step that makes the <Katex tex="a" /> vanish.</>,
  },
  {
    working: <Katex display tex="\frac{-1}{\frac{\sqrt{a^2-x^2}}{a}}\times\frac1a = \frac{-a}{a\sqrt{a^2-x^2}} = \frac{-1}{\sqrt{a^2-x^2}}" />,
    reason: <>The two <Katex tex="a" />s cancel.</>,
  },
  {
    working: <Katex display tex="\boxed{\ =\ \arccos\!\left(\frac{x}{a}\right)-\frac{x}{\sqrt{a^2-x^2}}}" />,
    reason: <>As required. For a "show that", every line above has to be written down — the report says the mark was withheld from students who just copied the given answer.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="-1\le\frac{x}{2}\le1 \implies -2\le x\le 2" />,
    reason: <>The domain of <Katex tex="\arccos" /> is <Katex tex="[-1,1]" />, endpoints included.</>,
  },
  {
    working: <Katex display tex="\arccos\!\left(\frac{x}{2}\right)\ge0 \text{ for all such } x" />,
    reason: <>The square root imposes no extra restriction, because <Katex tex="\arccos" /> never returns a negative value.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{dom}(f) = [-2,2]}" />,
    reason: <>Closed at both ends. The report's wrong answers <Katex tex="(-2,2)" /> and <Katex tex="[0,2]" /> come from over-restricting.</>,
  },
  {
    working: <Katex display tex="0\le\arccos\!\left(\frac{x}{2}\right)\le\pi" />,
    reason: <>The range of <Katex tex="\arccos" /> is <Katex tex="[0,\pi]" />, attained at <Katex tex="x=2" /> and <Katex tex="x=-2" /> respectively.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{ran}(f) = \left[0,\sqrt{\pi}\,\right]}" />,
    reason: <>Do not forget the outer square root — the report says <Katex tex="[0,\pi]" /> was frequently given. <Katex tex="\sqrt\pi\approx1.77" />.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\int_{-2}^{2}\bigl(f(x)\bigr)^2\,dx" />,
    reason: <>The region runs from <Katex tex="x=-2" /> (the given line) to <Katex tex="x=2" />, where the curve meets <Katex tex="y=0" />. Stopping at <Katex tex="0" /> is the report's common terminal error.</>,
  },
  {
    working: <Katex display tex="\bigl(f(x)\bigr)^2 = \arccos\!\left(\frac{x}{2}\right)" />,
    reason: <>Squaring removes the square root — which is the whole reason the question put one there.</>,
  },
  {
    working: <Katex display tex="V = \pi\int_{-2}^{2}\arccos\!\left(\frac{x}{2}\right)dx" />,
    reason: <>Now part (a) with <Katex tex="a=2" /> supplies the antiderivative.</>,
  },
  {
    working: <Katex display tex="\int\arccos\!\left(\frac{x}{2}\right)dx = x\arccos\!\left(\frac{x}{2}\right)+\int\frac{x}{\sqrt{4-x^2}}\,dx" />,
    reason: <>Rearranging part (a): integrate both sides and move the second term across. Getting this sign the wrong way round is the report's other flagged error.</>,
  },
  {
    working: <Katex display tex="\int\frac{x}{\sqrt{4-x^2}}\,dx = -\sqrt{4-x^2}" />,
    reason: <>Check by differentiating: <Katex tex="\tfrac{d}{dx}\left(-\left(4-x^2\right)^{1/2}\right)=-\tfrac12(4-x^2)^{-1/2}(-2x)=\tfrac{x}{\sqrt{4-x^2}}" /> ✓.</>,
  },
  {
    working: <Katex display tex="V = \pi\left[x\arccos\!\left(\frac{x}{2}\right)-\sqrt{4-x^2}\right]_{-2}^{2}" />,
    reason: <>Putting the antiderivative together.</>,
  },
  {
    working: <Katex display tex="x=2:\ 2\arccos(1)-0 = 0; \qquad x=-2:\ -2\arccos(-1)-0 = -2\pi" />,
    reason: <><Katex tex="\arccos(1)=0" /> and <Katex tex="\arccos(-1)=\pi" />; the square root vanishes at both ends.</>,
  },
  {
    working: <Katex display tex="V = \pi\bigl(0-(-2\pi)\bigr)" />,
    reason: <>Subtracting.</>,
  },
  {
    working: <Katex display tex="\boxed{V = 2\pi^2}" />,
    reason: <>About <Katex tex="19.7" /> cubic units. Plausible: the solid sits inside a cylinder of radius <Katex tex="\sqrt\pi" /> and length <Katex tex="4" />, of volume <Katex tex="4\pi^2\approx39.5" />, and fills roughly half of it.</>,
  },
]

export default function SpecialistQ10_2017Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 10 (7 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Product Rule"
        marks={1}
        statement={
          <>
            Show that{' '}
            <Katex tex="\dfrac{d}{dx}\left(x\arccos\!\left(\dfrac{x}{a}\right)\right)=\arccos\!\left(\dfrac{x}{a}\right)-\dfrac{x}{\sqrt{a^2-x^2}}" />
            , where <Katex tex="a>0" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Domain & Range"
        marks={2}
        statement={
          <>
            State the maximal domain and the range of{' '}
            <Katex tex="f(x)=\sqrt{\arccos\!\left(\dfrac{x}{2}\right)}" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Volume of Revolution"
        marks={4}
        statement={
          <>
            Find the volume of the solid of revolution generated when the region bounded by
            the graph of <Katex tex="y=f(x)" />, and the lines <Katex tex="x=-2" /> and{' '}
            <Katex tex="y=0" />, is rotated about the <Katex tex="x" />-axis.
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background title="Why part (a) is the key">
          <p>
            A volume of revolution about the <Katex tex="x" />-axis needs{' '}
            <Katex tex="\pi\int y^2\,dx" /> — and squaring{' '}
            <Katex tex="\sqrt{\arccos(x/2)}" /> leaves a plain{' '}
            <Katex tex="\arccos(x/2)" />.
          </p>
          <p>
            Antidifferentiating <Katex tex="\arccos" /> is not on the formula sheet, which is
            precisely why part (a) handed you{' '}
            <Katex tex="\tfrac{d}{dx}\left(x\arccos\!\left(\tfrac{x}{a}\right)\right)" />.
            Reading a "show that" result as a tool for the next part, rather than as an
            isolated exercise, is the habit this question rewards.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
