// 2018 Specialist Mathematics — Exam 2, Section B, Question 1 (11 marks). The composite
// f(x) = 2arcsin(x²−1): its maximal domain and range, its graph, and a derivative that
// splits either side of x = 0. Question text transcribed from the original paper. VCAA
// supplied blank axes for parts (b) and (e)(iii), so both curves are this site's own
// answer-sketches (matplotlib), drawn to VCAA's printed range and living in the solution
// rather than the stem (guide §7). Answers checked in sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import arcsinSrc from './spec-2018exam2-q1b-arcsin.png'
import piecewiseSrc from './spec-2018exam2-q1e-piecewise.png'

const EXAM_A: SAExaminerStats = {
  marks: [16, 16, 68],
  average: 1.5,
  comment: (
    <>
      This question was generally handled well. Common errors included: giving open endpoints
      with round brackets on the intervals, decimal approximations rather than exact values
      and failing to state the range. Students should read questions carefully and ensure
      that all required information is supplied in their responses.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [6, 13, 32, 50],
  average: 2.3,
  comment: (
    <>
      This question required students to label any endpoints and the <Katex tex="y" />
      -intercept with their coordinates. Not doing this or giving incorrect coordinates
      frequently caused students to miss out on marks. Students' graphs were not always
      precise and accurate.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [20, 80],
  average: 0.8,
  comment: (
    <>
      Parts c. and d. of Question 1 were generally answered well. Some students did not
      express the derivatives in the required form with a real number in the numerator.
    </>
  ),
}

const EXAM_D: SAExaminerStats = { marks: [19, 81], average: 0.8 }

const EXAM_EI: SAExaminerStats = {
  marks: [79, 21],
  average: 0.2,
  comment: (
    <>
      This question was not answered well. The most common error was to include{' '}
      <Katex tex="x=0" /> in the domain. Another common error was to include the endpoints{' '}
      <Katex tex="x=\pm\sqrt2" />.
    </>
  ),
}

const EXAM_EII: SAExaminerStats = {
  marks: [51, 49],
  average: 0.5,
  comment: <>Some graphs were not graphs of functions.</>,
}

const EXAM_EIII: SAExaminerStats = {
  marks: [43, 18, 39],
  average: 1.0,
  comment: (
    <>
      The majority of students who answered Question 1e.ii. correctly were also able to
      sketch a correct graph in this question. Attempts to sketch graphs of{' '}
      <Katex tex="f'(x)" />, rather than <Katex tex="g(x)" />, were frequently seen.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="-1 \le x^2-1 \le 1" />,
    reason: <><Katex tex="\sin^{-1}(u)" /> is only defined for <Katex tex="-1\le u\le1" />, and here <Katex tex="u=x^2-1" />.</>,
  },
  {
    working: <Katex display tex="0 \le x^2 \le 2 \implies -\sqrt2 \le x \le \sqrt2" />,
    reason: <>Adding <Katex tex="1" /> throughout. The left inequality <Katex tex="x^2\ge0" /> is automatic, so only <Katex tex="x^2\le2" /> bites.</>,
  },
  {
    working: <Katex display tex="\boxed{D = \left[-\sqrt2,\ \sqrt2\right]}" />,
    reason: <><em>Closed</em> brackets: <Katex tex="x=\pm\sqrt2" /> gives <Katex tex="\sin^{-1}(1)" />, which is perfectly defined. The report names round brackets here as a common error, along with writing <Katex tex="\pm1.41" /> instead of the exact surd.</>,
  },
  {
    working: <Katex display tex="x^2-1 \text{ covers } [-1,1] \implies \sin^{-1}(x^2-1) \text{ covers } \left[-\frac{\pi}{2},\frac{\pi}{2}\right]" />,
    reason: <>As <Katex tex="x" /> runs across the domain, the inner expression sweeps the whole of <Katex tex="[-1,1]" />, so the inverse sine sweeps its whole range.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Range} = \left[-\pi,\ \pi\right]}" />,
    reason: <>The factor of <Katex tex="2" /> doubles it. The question asks for <em>both</em> domain and range — the report notes the range being left out.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="f(0) = 2\sin^{-1}(-1) = 2\left(-\frac{\pi}{2}\right) = -\pi" />,
    reason: <>The <Katex tex="y" />-intercept, and also the minimum: <Katex tex="x^2-1" /> is smallest at <Katex tex="x=0" />.</>,
  },
  {
    working: <Katex display tex="f\!\left(\pm\sqrt2\right) = 2\sin^{-1}(1) = \pi" />,
    reason: <>Both endpoints give the same value, so the graph is symmetric about the <Katex tex="y" />-axis — as it must be, since <Katex tex="f" /> depends on <Katex tex="x" /> only through <Katex tex="x^2" />.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={arcsinSrc} alt="Graph of y = 2arcsin(x²−1): a symmetric U-shaped curve from (−√2, π) down to a cusp-like minimum at (0, −π) and back up to (√2, π)" className="w-full max-w-[380px]" />
      </div>
    ),
    reason: <>Three labelled points, as the question demands. Note the shape at the ends: the curve meets <Katex tex="x=\pm\sqrt2" /> <em>vertically</em>, because the derivative blows up there — part (c) will show <Katex tex="f'(x)=\tfrac{4}{\sqrt{2-x^2}}\to\infty" />. At <Katex tex="x=0" /> it turns sharply rather than smoothly, which part (e) explains.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = 2\cdot\frac{1}{\sqrt{1-\left(x^2-1\right)^2}}\cdot 2x = \frac{4x}{\sqrt{1-\left(x^2-1\right)^2}}" />,
    reason: <>Chain rule, with <Katex tex="\tfrac{d}{du}\sin^{-1}(u)=\tfrac{1}{\sqrt{1-u^2}}" /> and <Katex tex="\tfrac{du}{dx}=2x" />.</>,
  },
  {
    working: <Katex display tex="1-\left(x^2-1\right)^2 = 1-\left(x^4-2x^2+1\right) = 2x^2-x^4 = x^2\left(2-x^2\right)" />,
    reason: <>Expanding and factorising the expression under the root. Pulling out the <Katex tex="x^2" /> is the key step.</>,
  },
  {
    working: <Katex display tex="\sqrt{x^2\left(2-x^2\right)} = |x|\sqrt{2-x^2}" />,
    reason: <>The absolute value is essential — <Katex tex="\sqrt{x^2}=|x|" />, not <Katex tex="x" />. This is where the split between parts (c) and (d) comes from.</>,
  },
  {
    working: <Katex display tex="x>0 \implies |x|=x \implies f'(x) = \frac{4x}{x\sqrt{2-x^2}}" />,
    reason: <>The <Katex tex="x" />s cancel.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x) = \frac{4}{\sqrt{2-x^2}}, \quad A = 4}" />,
    reason: <>A real number in the numerator, as the question's prescribed form requires — the report notes answers left in a form that did not match.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="x<0 \implies |x| = -x" />,
    reason: <>The only thing that changes.</>,
  },
  {
    working: <Katex display tex="f'(x) = \frac{4x}{-x\sqrt{2-x^2}}" />,
    reason: <>Substituting into the same expression from part (c).</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x) = \frac{-4}{\sqrt{2-x^2}}, \quad B = -4}" />,
    reason: <>Negative, matching the graph: on <Katex tex="x<0" /> the curve is falling. This sign flip is what makes the point at <Katex tex="x=0" /> a corner rather than a smooth minimum.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = \frac{4x}{|x|\sqrt{2-x^2}}" />,
    reason: <>The single expression covering both sides.</>,
  },
  {
    working: <Katex display tex="|x| \ne 0 \implies x \ne 0" />,
    reason: <>The derivative does not exist at <Katex tex="x=0" />: the left and right limits are <Katex tex="-2\sqrt2" /> and <Katex tex="+2\sqrt2" />, which disagree. The report says including <Katex tex="x=0" /> was the most common error.</>,
  },
  {
    working: <Katex display tex="2-x^2 > 0 \implies -\sqrt2 < x < \sqrt2" />,
    reason: <>Strict: at <Katex tex="x=\pm\sqrt2" /> the denominator is zero, so the derivative is undefined there too — even though <Katex tex="f" /> itself is defined. The report names including these endpoints as the other common error.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(-\sqrt2,\ 0\right)\cup\left(0,\ \sqrt2\right)}" />,
    reason: <>Only <Katex tex="21\%" /> of the state got this mark. The domain of a derivative is always a subset of the function's own domain, and here it is strictly smaller at three separate points.</>,
  },
]

const ROWS_EII: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = \frac{g(x)}{\sqrt{2-x^2}}" />,
    reason: <>Comparing with parts (c) and (d), where the numerators were <Katex tex="4" /> and <Katex tex="-4" />.</>,
  },
  {
    working: <Katex display tex="\boxed{g(x) = \begin{cases} 4 & 0<x<\sqrt2 \\[2pt] -4 & -\sqrt2<x<0 \end{cases}}" />,
    reason: <>A hybrid function taking just two values. Note <Katex tex="x=0" /> is excluded from both branches — including it would make <Katex tex="g" /> either undefined twice over or not a function at all, which is what the report means by "some graphs were not graphs of functions".</>,
  },
]

const ROWS_EIII: WorkingRow[] = [
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={piecewiseSrc} alt="Graph of g: a horizontal segment at y = −4 from x = −√2 to 0 and another at y = 4 from 0 to √2, with open circles at all four endpoints" className="w-full max-w-[380px]" />
      </div>
    ),
    reason: <>Two horizontal segments, and <em>four</em> open circles: at <Katex tex="x=0" /> on both branches (the derivative does not exist there) and at <Katex tex="x=\pm\sqrt2" /> (the denominator vanishes). Sketch <Katex tex="g" />, not <Katex tex="f'" /> — the report notes that confusion explicitly, and the two look nothing alike.</>,
  },
]

export default function SpecialistQ1_2018Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (11 marks)</p>
        <p>
          Consider the function <Katex tex="f:D\to\mathbb{R}" />, where{' '}
          <Katex tex="f(x)=2\sin^{-1}\!\left(x^2-1\right)" />.
        </p>
      </div>

      <PartCard letter="a" marks={2} statement={<>Determine the maximal domain <Katex tex="D" /> and the range of <Katex tex="f" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" marks={3} statement={<>Sketch the graph of <Katex tex="y=f(x)" />, labelling any endpoints and the <Katex tex="y" />-intercept with their coordinates.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard letter="c" marks={1} statement={<>Find <Katex tex="f'(x)" /> for <Katex tex="x>0" />, expressing your answer in the form <Katex tex="f'(x)=\dfrac{A}{\sqrt{2-x^2}}" />, <Katex tex="A\in\mathbb{R}" />.</>} examinerReport={EXAM_C}>
        <Background>
          <p>
            The prescribed answer form is doing you a favour: it tells you the{' '}
            <Katex tex="\sqrt{2-x^2}" /> will appear and that everything else cancels. If
            your expression still has an <Katex tex="x" /> on top, the{' '}
            <Katex tex="\sqrt{x^2}" /> has not been dealt with yet.
          </p>
          <p>
            And <Katex tex="\sqrt{x^2}" /> is <Katex tex="|x|" />, not <Katex tex="x" />. That
            single fact is the reason this derivative needs two parts, and it is what makes
            the graph in part (b) have a corner at the origin.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard letter="d" marks={1} statement={<>Write down <Katex tex="f'(x)" /> for <Katex tex="x<0" />, expressing your answer in the form <Katex tex="f'(x)=\dfrac{B}{\sqrt{2-x^2}}" />, <Katex tex="B\in\mathbb{R}" />.</>} examinerReport={EXAM_D}>
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <PartCard letter="e.i" marks={1} statement={<>The derivative <Katex tex="f'(x)" /> can be expressed in the form <Katex tex="f'(x)=\dfrac{g(x)}{\sqrt{2-x^2}}" /> over its maximal domain. Find the maximal domain of <Katex tex="f'" />.</>} examinerReport={EXAM_EI}>
        <WorkingTable rows={ROWS_EI} />
      </PartCard>

      <PartCard letter="e.ii" marks={1} statement={<>Find <Katex tex="g(x)" />, expressing your answer as a piecewise (hybrid) function.</>} examinerReport={EXAM_EII}>
        <WorkingTable rows={ROWS_EII} />
      </PartCard>

      <PartCard letter="e.iii" marks={2} statement={<>Sketch the graph of <Katex tex="g" />.</>} examinerReport={EXAM_EIII}>
        <WorkingTable rows={ROWS_EIII} />
      </PartCard>
    </div>
  )
}
