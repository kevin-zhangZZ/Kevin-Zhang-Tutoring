// 2019 Mathematical Methods — Exam 1, Question 9 (9 marks).
// f(x)=3+2x-x² and g(x)=eˣ — composite rules and their calculus (parts a-c), solving
// f(g(x))=0 and finding its stationary point (parts d-e), then the number of solutions to
// g(f(x))+f(g(x))=0 (part f). Question text transcribed from the original paper (no diagram
// given). Cross-checked against the VCAA examination report and itute's independent
// solutions — both agree with the derivation below (part (f) reasons the count directly
// from monotonicity rather than a rough addition-of-ordinates sketch, but reaches the same
// answer). Solution is original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [6, 94],
  average: 1.0,
  comment: <>This question was done well.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [59, 19, 22],
  average: 0.7,
  comment: (
    <>
      Students generally applied the chain rule; however, poor expression resulted in
      incorrect answers. The expression <Katex tex="(2-2x)e^{3+2x-x^2}" /> is not equivalent
      to <Katex tex="2-2xe^{3+2x-x^2}" />. Some students found the correct answer but without
      correct supporting reasoning.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [14, 86],
  average: 0.9,
  comment: <>This question was done well. Some students incorrectly stated <Katex tex="f(g(x))=3+2x-x^2" />.</>,
}

const EXAM_D: SAExaminerStats = {
  marks: [34, 19, 48],
  average: 1.2,
  comment: (
    <>
      Most students were able to form a quadratic equation. Some faltered with the correct
      factorisation. Including <Katex tex="x=\ln_e(-1)" /> was a common error.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [42, 28, 30],
  average: 0.9,
  comment: <>This question was well attempted but not so well done. Common errors included an incorrect derivative, and omitting the <Katex tex="y" />-coordinate of the stationary point.</>,
}

const EXAM_F: SAExaminerStats = {
  marks: [81, 19],
  average: 0.2,
  comment: <>This question was not well done. Few students attempted to reason about the two composite functions' behaviour to pin down the count.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="g(f(x)) = e^{f(x)}" />,
  },
  {
    working: <Katex display tex="\boxed{g(f(x)) = e^{3+2x-x^2}}" />,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\dfrac{d}{dx}g(f(x)) = f'(x)\cdot e^{f(x)} = (2-2x)e^{3+2x-x^2}" />,
    reason: <>Chain rule; <Katex tex="f'(x)=2-2x" />.</>,
  },
  {
    working: <Katex display tex="e^{3+2x-x^2}>0 \text{ always} \;\implies\; \text{sign matches } (2-2x)" />,
  },
  {
    working: <Katex display tex="(2-2x)<0 \;\iff\; x>1" />,
  },
  {
    working: <Katex display tex="\boxed{x>1}" />,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f(g(x)) = 3+2g(x)-g(x)^2 = 3+2e^x-(e^x)^2" />,
  },
  {
    working: <Katex display tex="\boxed{f(g(x)) = 3+2e^x-e^{2x}}" />,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="3+2e^x-e^{2x}=0" />,
  },
  {
    working: <Katex display tex="\text{Let } u=e^x: \quad -u^2+2u+3=0 \;\implies\; u^2-2u-3=0" />,
    reason: <>Substitute to turn this into an ordinary quadratic.</>,
  },
  {
    working: <Katex display tex="(u-3)(u+1) = 0 \;\implies\; u=3 \text{ or } u=-1" />,
  },
  {
    working: <Katex display tex="e^x = -1 \text{ is impossible } (e^x>0 \text{ always}); \quad e^x=3 \;\implies\; x=\ln_e3" />,
  },
  {
    working: <Katex display tex="\boxed{x=\ln_e3}" />,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\dfrac{d}{dx}f(g(x)) = 2e^x-2e^{2x} = 2e^x(1-e^x)" />,
  },
  {
    working: <Katex display tex="2e^x(1-e^x)=0 \;\implies\; e^x=0 \text{ (impossible) or } e^x=1 \;\implies\; x=0" />,
  },
  {
    working: <Katex display tex="f(g(0)) = 3+2e^0-e^0 = 3+2-1 = 4" />,
  },
  {
    working: <Katex display tex="\boxed{(0,4)}" />,
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="g(f(x)) = e^{3+2x-x^2} > 0 \text{ for every real } x" />,
    reason: <>An exponential is never zero or negative, so any solution of <Katex tex="g(f(x))+f(g(x))=0" /> needs <Katex tex="f(g(x))<0" />.</>,
  },
  {
    working: <Katex display tex="f(g(x)) = -(e^x-1)^2+4 < 0 \;\iff\; (e^x-1)^2>4 \;\iff\; e^x>3 \;\iff\; x>\ln_e3" />,
    reason: <>Completing the square in <Katex tex="u=e^x" /> (part (d)'s substitution); <Katex tex="e^x<-1" /> is impossible.</>,
  },
  {
    working: <Katex display tex="\text{For } x>1\text{: } g(f(x)) \text{ is strictly decreasing from } g(f(1))=e^4 \text{ to } 0 \text{ (part b)}" />,
    reason: <>In particular this holds on <Katex tex="x>\ln_e3" />, since <Katex tex="\ln_e3\approx1.10>1" />.</>,
  },
  {
    working: <Katex display tex="\text{For } x>0\text{: } f(g(x)) \text{ is strictly decreasing from } 4 \text{ to } -\infty \text{ (part e)}" />,
    reason: <>In particular this also holds on <Katex tex="x>\ln_e3" />, since <Katex tex="\ln_e3>0" />.</>,
  },
  {
    working: (
      <>
        At <Katex tex="x=\ln_e3" />: <Katex tex="g(f(x))>0=-f(g(x))" />, so <Katex tex="g(f(x))-\bigl(-f(g(x))\bigr)>0" />.
        <br />
        As <Katex tex="x\to\infty" />: <Katex tex="g(f(x))\to0" /> but <Katex tex="-f(g(x))\to\infty" />, so the difference <Katex tex="\to-\infty" />.
      </>
    ),
    reason: <>One curve (strictly decreasing) starts above the other (strictly increasing) at <Katex tex="x=\ln_e3" />, and ends below it as <Katex tex="x\to\infty" />.</>,
  },
  {
    working: <Katex display tex="\implies g(f(x))+f(g(x)) = 0 \text{ has exactly one solution, in } (\ln_e3,\infty)" />,
    reason: <>By continuity (Intermediate Value Theorem), <Katex tex="g(f(x))-\bigl(-f(g(x))\bigr)" /> — the difference of one strictly decreasing and one strictly increasing continuous function — crosses zero exactly once. For <Katex tex="x\le\ln_e3" />, <Katex tex="f(g(x))\ge0" /> so <Katex tex="g(f(x))+f(g(x))>0" /> always (a positive plus a non-negative number), giving no solutions there.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{exactly one solution}}" />,
  },
]

export default function MethodsQ9_2019Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 9 (9 marks)</p>
        <p>
          Consider the functions <Katex tex="f:\mathbb{R}\to\mathbb{R},\ f(x)=3+2x-x^2" /> and{' '}
          <Katex tex="g:\mathbb{R}\to\mathbb{R},\ g(x)=e^x" />.
        </p>
      </div>

      <PartCard letter="a" marks={1} statement={<>State the rule of <Katex tex="g(f(x))" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" marks={2} statement={<>Find the values of <Katex tex="x" /> for which the derivative of <Katex tex="g(f(x))" /> is negative.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard letter="c" marks={1} statement={<>State the rule of <Katex tex="f(g(x))" />.</>} examinerReport={EXAM_C}>
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard letter="d" marks={2} statement={<>Solve <Katex tex="f(g(x))=0" />.</>} examinerReport={EXAM_D}>
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard letter="e" marks={2} statement={<>Find the coordinates of the stationary point of the graph of <Katex tex="f(g(x))" />.</>} examinerReport={EXAM_E}>
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard letter="f" marks={1} statement={<>State the number of solutions to <Katex tex="g(f(x)) + f(g(x)) = 0" />.</>} examinerReport={EXAM_F}>
        <WorkingTable rows={ROWS_F} />
      </PartCard>
    </div>
  )
}
