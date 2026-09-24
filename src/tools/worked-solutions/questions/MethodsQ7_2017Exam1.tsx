// 2017 Mathematical Methods — Exam 1, Question 7 (5 marks).
// Composite functions: when does a composition exist, and what is its range. Parts (b)(ii)
// and (c) were answered poorly (80% and 70% of students scored zero).
// Question text transcribed from the original paper (no diagram given); the parabola sketch
// below is this site's own, plotted with matplotlib. Answers verified with sympy. Solution
// is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import parabolaSrc from './meth-2017e1-q7-parabola.png'

const EXAM_A: SAExaminerStats = {
  marks: [35, 65],
  average: 0.6,
  comment: <>Some students made incorrect use of square or round brackets.</>,
}

const EXAM_BI: SAExaminerStats = {
  marks: [53, 18, 29],
  average: 0.4,
  comment: <>Students who successfully solved this question used the equation, a graph or both.</>,
}

const EXAM_BII: SAExaminerStats = {
  marks: [80, 20],
  average: 0.1,
  comment: (
    <>
      This question was not answered well. Since <Katex tex="(-\infty,-3]" /> is the domain of{' '}
      <Katex tex="g" />, the range of <Katex tex="g" /> is the same as the domain of{' '}
      <Katex tex="f" />. Hence, in this case, the range of <Katex tex="f(g(x))" /> is the same
      as the range of <Katex tex="f" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [70, 30],
  average: 0.3,
  comment: (
    <>
      Domain of <Katex tex="f(h(x))" /> is <Katex tex="R" />, and{' '}
      <Katex tex="f(h(x))=\sqrt{x^2+4}" />. Most students could identify the composite
      function but struggled with determining its range.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x\ge0 \implies x+1\ge1" />,
    reason: <>The domain is <Katex tex="[0,\infty)" />, so the expression under the root is at least <Katex tex="1" />.</>,
  },
  {
    working: <Katex display tex="\sqrt{x+1}\ge\sqrt{1}=1" />,
    reason: <>Square root is increasing, so the inequality carries through. At <Katex tex="x=0" /> the value <Katex tex="1" /> is actually attained, so the endpoint is included.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{ran}(f)=[1,\infty)}" />,
    reason: <>Square bracket at <Katex tex="1" /> because <Katex tex="f(0)=1" /> is reached; round bracket at <Katex tex="\infty" /> because infinity never is. The report flags bracket choice as the one thing students got wrong here.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\text{dom}(f)=[0,\infty)" />,
    reason: <>This is the set the outputs of <Katex tex="g" /> have to land in.</>,
  },
  {
    working: <Katex display tex="g(x)=x^2+4x+3=(x+1)(x+3)" />,
    reason: <>Factorising gives the <Katex tex="x" />-intercepts <Katex tex="-3" /> and <Katex tex="-1" /> straight away.</>,
  },
  {
    working: <Katex display tex="g(x)\ge0 \iff x\le-3 \text{ or } x\ge-1" />,
    reason: <>An upright parabola is above the axis outside its roots. Only the left branch is relevant, since the domain of <Katex tex="g" /> is a left-hand interval <Katex tex="(-\infty,c]" />.</>,
  },
  {
    working: <Katex display tex="(-\infty,c]\subseteq(-\infty,-3] \implies c\le-3" />,
    reason: <>Every <Katex tex="x" /> in the domain of <Katex tex="g" /> must satisfy <Katex tex="g(x)\ge0" />, and the only such left-hand interval runs up to <Katex tex="-3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{c=-3}" />,
    reason: <>The largest value allowed, and it does satisfy <Katex tex="c<0" />. Pushing <Katex tex="c" /> any further right — to <Katex tex="-2" />, say — would include <Katex tex="x" />-values where <Katex tex="g(x)<0" /> (for example <Katex tex="g(-2)=-1" />), and <Katex tex="-1" /> is not in the domain of <Katex tex="f" />, <Katex tex="[0,\infty)" />.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{dom}(g)=(-\infty,-3]" />,
    reason: <>Using the <Katex tex="c=-3" /> just found.</>,
  },
  {
    working: <Katex display tex="\text{ran}(g)=[0,\infty)" />,
    reason: <>On <Katex tex="(-\infty,-3]" /> the parabola is decreasing: it takes the value <Katex tex="0" /> at <Katex tex="x=-3" /> and grows without bound as <Katex tex="x\to-\infty" />. Every value from <Katex tex="0" /> up is hit exactly once.</>,
  },
  {
    working: <Katex display tex="\text{ran}(g)=\text{dom}(f)" />,
    reason: <>They are the same set — which is no accident, since part (b)(i) chose <Katex tex="c" /> to make the fit as tight as possible.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{ran}(f(g(x)))=\text{ran}(f)=[1,\infty)}" />,
    reason: <>Because <Katex tex="g" /> delivers <em>all</em> of the domain of <Katex tex="f" />, the composite reaches everything <Katex tex="f" /> can reach. No new work is needed — just part (a)'s answer.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{ran}(h)=[3,\infty) \subseteq [0,\infty)=\text{dom}(f)" />,
    reason: <>Check the composite exists first. <Katex tex="h(x)=x^2+3\ge3" /> for all real <Katex tex="x" />, and that is inside the domain of <Katex tex="f" />, so <Katex tex="f(h(x))" /> is defined for every <Katex tex="x\in R" />.</>,
  },
  {
    working: <Katex display tex="f(h(x)) = \sqrt{(x^2+3)+1} = \sqrt{x^2+4}" />,
    reason: <>Substituting <Katex tex="h(x)" /> into <Katex tex="f(u)=\sqrt{u+1}" />.</>,
  },
  {
    working: <Katex display tex="x^2\ge0 \implies x^2+4\ge4" />,
    reason: <>The smallest the inside can be is <Katex tex="4" />, at <Katex tex="x=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{ran}(f(h(x)))=[2,\infty)}" />,
    reason: <>Since <Katex tex="\sqrt{4}=2" />, and the expression grows without bound as <Katex tex="|x|\to\infty" />. Note this is <em>not</em> the range of <Katex tex="f" />: here <Katex tex="h" /> only delivers part of the domain of <Katex tex="f" />, so the composite reaches less than <Katex tex="f" /> would. That is the difference between this part and part (b)(ii).</>,
  },
]

export default function MethodsQ7_2017Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 7 (5 marks)</p>
        <p>
          Let <Katex tex="f:[0,\infty)\to R" />, <Katex tex="f(x)=\sqrt{x+1}" />.
        </p>
      </div>

      <PartCard letter="a" topic="Range" marks={1} statement={<>State the range of <Katex tex="f" />.</>} examinerReport={EXAM_A}>
        <Background title="The one rule behind this whole question">
          <p>
            <Katex tex="f(g(x))" /> exists only when{' '}
            <Katex tex="\text{ran}(g)\subseteq\text{dom}(f)" /> — every output of the inner
            function has to be something the outer function can accept.
          </p>
          <p>
            And the range of the composite depends on <em>how much</em> of{' '}
            <Katex tex="\text{dom}(f)" /> the inner function delivers. If{' '}
            <Katex tex="g" /> hands over all of it, the composite has the same range as{' '}
            <Katex tex="f" /> (part b.ii). If it hands over only part of it, the composite
            reaches less (part c). The whole question is that one distinction, asked twice.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b.i"
        topic="Composite Function"
        marks={2}
        statement={
          <>
            Let <Katex tex="g:(-\infty,c]\to R" />, <Katex tex="g(x)=x^2+4x+3" />, where{' '}
            <Katex tex="c<0" />. Find the largest possible value of <Katex tex="c" /> such
            that the range of <Katex tex="g" /> is a subset of the domain of{' '}
            <Katex tex="f" />.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={parabolaSrc}
            alt="The parabola y = x squared plus 4x plus 3 with x-intercepts at (−3, 0) and (−1, 0) and turning point (−2, −1); the branch to the left of x = −3, where the parabola is at or above the x-axis, is drawn thicker"
            className="w-full max-w-[420px]"
          />
        </div>
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Range"
        marks={1}
        statement={
          <>
            For the value of <Katex tex="c" /> found in <strong>part b.i.</strong>, state the
            range of <Katex tex="f(g(x))" />.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Range"
        marks={1}
        statement={
          <>
            Let <Katex tex="h:R\to R" />, <Katex tex="h(x)=x^2+3" />. State the range of{' '}
            <Katex tex="f(h(x))" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
