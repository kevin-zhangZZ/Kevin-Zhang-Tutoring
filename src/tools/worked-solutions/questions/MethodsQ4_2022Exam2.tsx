// 2022 Mathematical Methods — Exam 2, Section B Question 4 (10 marks). A log-difference
// function that turns out to be odd, its inverse, and the area between a scaled copy and
// its own inverse. Part e(ii) was redacted by VCAA following the Independent Review.
// Question text transcribed from the original paper; both figures are crops of VCAA's own
// artwork. Answers checked with sympy and against the VCAA examination report. Solution is
// original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import graphSrc from './meth-2022e2-q4-graph.png'
import areaSrc from './meth-2022e2-q4e-area.png'

const EXAM_A: SAExaminerStats = {
  marks: [18, 82],
  average: 0.8,
  comment: (
    <>
      Some students gave the domain rather than the range. A common error was{' '}
      <Katex tex="(-26.2,26.2)" />.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [9, 6, 85],
  average: 1.8,
  comment: (
    <>
      Many students were able to find <Katex tex="f'(x)" />. Some did not substitute{' '}
      <Katex tex="x=0" /> into the derivative. A common incorrect answer was{' '}
      <Katex tex="f'(0)=0" />.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [43, 57],
  average: 0.6,
  comment: (
    <>
      Common incorrect answers were <Katex tex="\left(-\tfrac12,0\right)" />,{' '}
      <Katex tex="\left(0,\tfrac12\right)" />,{' '}
      <Katex tex="R\setminus\left(-\tfrac12,\tfrac12\right)" /> and{' '}
      <Katex tex="(-\infty,\infty)" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [28, 72],
  average: 0.7,
  comment: (
    <>
      Some students substituted <Katex tex="-x" /> incorrectly. Others substituted a value
      for <Katex tex="x" /> instead of arguing generally.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [12, 14, 23, 51],
  average: 2.2,
  comment: (
    <>
      Many students were able to swap <Katex tex="x" /> and <Katex tex="y" />. Some wrote{' '}
      <Katex tex="f^{-1}(x)=\tfrac12\tanh\!\left(\tfrac x2\right)" />, which some
      technology outputs and which is correct, though <Katex tex="\tanh" /> is not on the
      study design. Other students did not find the domain.
    </>
  ),
}

const EXAM_EI: SAExaminerStats = {
  marks: [94, 6],
  average: 0.1,
  comment: (
    <>
      This question was not answered well. Some incorrect responses were{' '}
      <Katex tex="k>0" /> and <Katex tex="4<k<33" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \log_e\!\left(x+\tfrac12\right)-\log_e\!\left(\tfrac12-x\right)" />,
    reason: <>Defined on <Katex tex="\left(-\tfrac12,\tfrac12\right)" />, where both arguments are positive.</>,
  },
  {
    working: <Katex display tex="x\to\tfrac12^-: \ \log_e\!\left(\tfrac12-x\right)\to-\infty \implies f\to+\infty" />,
    reason: 'The second logarithm is subtracted, so it drives the function up.',
  },
  {
    working: <Katex display tex="x\to-\tfrac12^+: \ f\to-\infty" />,
    reason: 'The first logarithm dives.',
  },
  {
    working: <Katex display tex="\boxed{\text{range } R}" />,
    reason: <>Continuous and unbounded both ways. The <Katex tex="(-26.2,26.2)" /> the report mentions is just what a calculator window happens to show.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = \frac{1}{x+\tfrac12}-\frac{-1}{\tfrac12-x} = \frac{1}{x+\tfrac12}+\frac{1}{\tfrac12-x}" />,
    reason: <>The inner derivative of <Katex tex="\tfrac12-x" /> is <Katex tex="-1" />, and it meets the minus sign in front — two negatives.</>,
  },
  {
    working: <Katex display tex="= \frac{2}{2x+1}+\frac{2}{1-2x} = \frac{-4}{4x^2-1}" />,
    reason: 'Combining over a common denominator.',
  },
  {
    working: <Katex display tex="f'(0) = \frac{-4}{-1} = \boxed{4}" />,
    reason: <>Substituting. Or directly: <Katex tex="2+2=4" /> from the first form. The report notes students who found <Katex tex="f'" /> and then forgot to evaluate it.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = \frac{-4}{4x^2-1} = \frac{4}{1-4x^2}" />,
    reason: 'Rewriting with a positive numerator.',
  },
  {
    working: <Katex display tex="x \in \left(-\tfrac12,\tfrac12\right) \implies 4x^2<1 \implies 1-4x^2>0" />,
    reason: <>So <Katex tex="f'(x)>0" /> everywhere on the domain.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(-\tfrac12,\ \tfrac12\right)}" />,
    reason: <>The whole maximal domain: <Katex tex="f" /> is strictly increasing throughout. It cannot be <Katex tex="R" />, because <Katex tex="f" /> is not defined outside the interval.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f(-x) = \log_e\!\left(-x+\tfrac12\right)-\log_e\!\left(\tfrac12+x\right)" />,
    reason: <>Substituting <Katex tex="-x" /> into both logarithms — carefully, since it swaps them.</>,
  },
  {
    working: <Katex display tex="= \log_e\!\left(\tfrac12-x\right)-\log_e\!\left(x+\tfrac12\right)" />,
    reason: 'Reordering the two terms shows they are exactly the negatives of f\u2019s.',
  },
  {
    working: <Katex display tex="f(x)+f(-x) = \left[\log_e\!\left(x+\tfrac12\right)-\log_e\!\left(\tfrac12-x\right)\right]+\left[\log_e\!\left(\tfrac12-x\right)-\log_e\!\left(x+\tfrac12\right)\right]" />,
    reason: 'Adding.',
  },
  {
    working: <Katex display tex="\boxed{= 0} \ \checkmark" />,
    reason: <>Everything cancels in pairs, so <Katex tex="f" /> is odd. Testing one value proves nothing — the report flags that.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\text{domain of } f^{-1} = \text{range of } f = \boxed{R}" />,
    reason: 'From part a. — worth stating first, because it is a separate mark.',
  },
  {
    working: <Katex display tex="x = \log_e\!\left(\frac{y+\tfrac12}{\tfrac12-y}\right)" />,
    reason: 'Swap x and y, then combine the two logarithms into one.',
  },
  {
    working: <Katex display tex="e^x = \frac{y+\tfrac12}{\tfrac12-y} = \frac{2y+1}{1-2y}" />,
    reason: 'Exponentiating and clearing the halves.',
  },
  {
    working: <Katex display tex="e^x(1-2y) = 2y+1 \implies e^x-1 = 2y\left(e^x+1\right)" />,
    reason: 'Collecting the y terms on one side.',
  },
  {
    working: <Katex display tex="\boxed{f^{-1}(x) = \frac{e^x-1}{2\left(e^x+1\right)}}" />,
    reason: <>Both the rule and the domain <Katex tex="R" /> are needed. Its range is <Katex tex="\left(-\tfrac12,\tfrac12\right)" />, matching <Katex tex="f" />'s domain ✓.</>,
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="h(x) = \tfrac1kf(x) \implies h'(0) = \tfrac{f'(0)}{k} = \tfrac4k" />,
    reason: <>Using part b(i). The factor <Katex tex="\tfrac1k" /> flattens the graph.</>,
  },
  {
    working: <Katex display tex="h^{-1} \text{ is the reflection of } h \text{ in } y=x, \text{ and } h(0)=0" />,
    reason: <>So the two curves always meet at the origin — the question is whether they meet anywhere <em>else</em>, because only then is there an enclosed area.</>,
  },
  {
    working: <Katex display tex="h'(0)<1 \iff \tfrac4k<1 \iff k>4" />,
    reason: <>If <Katex tex="h" /> leaves the origin more slowly than <Katex tex="y=x" />, it must cross back over the line before it runs off to <Katex tex="+\infty" /> at <Katex tex="x=\tfrac12" />.</>,
  },
  {
    working: <Katex display tex="k>4 \implies h \text{ cuts } y=x \text{ at } \pm x_0 \ne 0" />,
    reason: <>By oddness, symmetric about the origin — giving two enclosed regions, so <Katex tex="A(k)>0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{k > 4}" />,
    reason: <>For <Katex tex="0<k\le4" /> the curve stays above <Katex tex="y=x" /> on <Katex tex="\left(0,\tfrac12\right)" />, the only meeting point is the origin, and the enclosed area is zero. Six per cent of students scored this mark.</>,
  },
]

export default function MethodsQ4_2022Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (10 marks)</p>
        <p>
          Consider the function <Katex tex="f" />, where{' '}
          <Katex tex="f:\left(-\tfrac12,\tfrac12\right)\to R,\ f(x)=\log_e\!\left(x+\tfrac12\right)-\log_e\!\left(\tfrac12-x\right)" />
          . Part of the graph of <Katex tex="y=f(x)" /> is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="An increasing S-shaped curve through the origin with vertical asymptotes at x = −1/2 and x = 1/2 — from the original 2022 VCAA exam paper"
            className="w-full max-w-[340px]"
          />
        </div>
      </div>

      <PartCard letter="a" marks={1} statement={<>State the range of <Katex tex="f(x)" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b.i" marks={2} statement={<>Find <Katex tex="f'(0)" />.</>} examinerReport={EXAM_BI}>
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        marks={1}
        statement={
          <>
            State the maximal domain over which <Katex tex="f" /> is strictly increasing.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="c"
        marks={1}
        statement={<>Show that <Katex tex="f(x)+f(-x)=0" />.</>}
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        marks={3}
        statement={
          <>
            Find the domain and the rule of <Katex tex="f^{-1}" />, the inverse of{' '}
            <Katex tex="f" />.
          </>
        }
        examinerReport={EXAM_D}
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 px-1 flex flex-col gap-3">
        <p>
          Let <Katex tex="h" /> be the function{' '}
          <Katex tex="h:\left(-\tfrac12,\tfrac12\right)\to R,\ h(x)=\tfrac1k\left(\log_e\!\left(x+\tfrac12\right)-\log_e\!\left(\tfrac12-x\right)\right)" />
          , where <Katex tex="k\in R" /> and <Katex tex="k>0" />. The inverse function of{' '}
          <Katex tex="h" /> is{' '}
          <Katex tex="h^{-1}:R\to R,\ h^{-1}(x)=\dfrac{e^{kx}-1}{2\left(e^{kx}+1\right)}" />
          . The area of the regions bound by <Katex tex="h" /> and <Katex tex="h^{-1}" /> can
          be expressed as a function <Katex tex="A(k)" />, shaded in the graph below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={areaSrc}
            alt="The curve h and its reflection h inverse crossing at three points, with the two lens-shaped regions between them shaded — from the original 2022 VCAA exam paper"
            className="w-full max-w-[400px]"
          />
        </div>
      </div>

      <PartCard
        letter="e.i"
        marks={1}
        statement={
          <>
            Determine the range of values of <Katex tex="k" /> such that{' '}
            <Katex tex="A(k)>0" />. You are not required to find or define{' '}
            <Katex tex="A(k)" />.
          </>
        }
        examinerReport={EXAM_EI}
      >
        <WorkingTable rows={ROWS_EI} />
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          <b>Part e(ii)</b> was redacted by VCAA following the findings of the Independent
          Review into the VCAA's Examination-Setting Policies, Processes and Procedures for
          the VCE. Neither the question nor a marking scheme was published, so there is
          nothing to solve here.
        </p>
      </div>
    </div>
  )
}
