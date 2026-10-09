// 2022 Mathematical Methods — Exam 2, Section B Question 4 (10 marks). A log-difference
// function that turns out to be odd, its inverse, and the area between a scaled copy and
// its own inverse. Part e(ii) was redacted by VCAA following the Independent Review.
// Question text transcribed from the original paper; both figures are crops of VCAA's own
// artwork. Answers checked with sympy and against the VCAA examination report. Solution is
// original.
// Interactive: e(i) meth-2022e2-q4ei-second-crossing (slide k: h and h⁻¹ only enclose area once
// h'(0) = 4/k < 1, and there is no upper limit on k; presets include the report's k = 33).
// Concise/Detailed review (Oct 2026): reasons trimmed to the step itself; report commentary,
// traps and checks moved into each row's `more`.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'
import graphSrc from './meth-2022e2-q4-graph.png'
import areaSrc from './meth-2022e2-q4e-area.png'

const CrossingWidget = lazyWidget(() => import('../interactives/meth-2022e2-q4ei-second-crossing'))

const EXAM_A: SAExaminerStats = {
  marks: [18, 82],
  average: 0.8,
  comment: (
    <>
      This question was answered well. Some students gave the domain rather than the range.
      A common error was{' '}
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
      Common incorrect answers were{' '}
      <Katex tex="\left(-\tfrac12,0\right)\cup\left(0,\tfrac12\right)" />,{' '}
      <Katex tex="R\setminus\left(-\tfrac12,\tfrac12\right)" />,{' '}
      <Katex tex="\left[-\tfrac12,\tfrac12\right]" />, <Katex tex="\left[0,\tfrac12\right)" />,{' '}
      <Katex tex="(-\infty,\infty)" /> and <Katex tex="\left(0,\tfrac12\right)" />.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [28, 72],
  average: 0.7,
  comment: (
    <>
      Some students substituted <Katex tex="-x" /> incorrectly. Others substituted a value
      for <Katex tex="x" />.
      <br />
      <Katex tex="\dfrac{x+\frac12}{\frac12-x}\times\dfrac{-x+\frac12}{\frac12+x}=0" /> was
      occasionally seen.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [12, 14, 23, 51],
  average: 2.2,
  comment: (
    <>
      Many students were able to swap <Katex tex="x" /> and <Katex tex="y" />. Some wrote{' '}
      <Katex tex="f^{-1}(x)=\tfrac12\tan\!\left(\tfrac x2\right)" /> instead of{' '}
      <Katex tex="f^{-1}(x)=\tfrac12\tanh\!\left(\tfrac x2\right)" />. The tanh function is
      not part of the study design but the output on some students' technology gave this
      function and it is correct. Other students did not find the domain. Some found{' '}
      <Katex tex="\tfrac{1}{f(x)}" />. Some students did not use their technology and tried to
      find the inverse function by hand. This would have been time consuming.
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
    reason: <>Defined on <Katex tex="\left(-\tfrac12,\tfrac12\right)" />, where both arguments are positive. That interval is the <em>domain</em>; the question asks for the range, the set of <Katex tex="y" />-values.</>,
  },
  {
    working: <Katex display tex="x\to\tfrac12^-: \ \log_e\!\left(\tfrac12-x\right)\to-\infty \implies f(x)\to+\infty" />,
    reason: <>The first logarithm just approaches <Katex tex="\log_e 1 = 0" />. The second one heads to <Katex tex="-\infty" />, and it is subtracted, so it drives <Katex tex="f" /> up without limit.</>,
  },
  {
    working: <Katex display tex="x\to-\tfrac12^+: \ \log_e\!\left(x+\tfrac12\right)\to-\infty \implies f(x)\to-\infty" />,
    reason: <>Now the first logarithm heads to <Katex tex="-\infty" /> while the second approaches <Katex tex="\log_e 1 = 0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{range } R}" />,
    reason: <><Katex tex="f" /> is continuous and goes from <Katex tex="-\infty" /> to <Katex tex="+\infty" />, so it takes every real value, as the graph shows.</>,
    more: (
      <>
        It has no largest or smallest value, so a finite interval such as{' '}
        <Katex tex="(-26.2,26.2)" />, which the report notes as a common error, cannot be right. A value like
        26.2 is what technology shows extremely close to the asymptote (
        <Katex tex="f\left(\tfrac12-4\times10^{-12}\right)\approx26.2" />), but it is not a limit: the values of{' '}
        <Katex tex="f" /> keep growing past any number as <Katex tex="x\to\tfrac12^-" />.
      </>
    ),
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} f'(x) &= \frac{1}{x+\tfrac12}-\frac{-1}{\tfrac12-x} \\ &= \frac{1}{x+\tfrac12}+\frac{1}{\tfrac12-x} \end{aligned}" />,
    reason: <>Using <Katex tex="\tfrac{d}{dx}\log_e(u) = \tfrac{u'}{u}" /> on each term. The inner derivative of <Katex tex="\tfrac12-x" /> is <Katex tex="-1" />, and it meets the minus sign in front: two negatives make a plus.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} &= \frac{2}{2x+1}+\frac{2}{1-2x} \\ &= \frac{2(1-2x)+2(2x+1)}{(2x+1)(1-2x)} = \frac{4}{1-4x^2} \end{aligned}"
      />
    ),
    reason: <>Multiply the top and bottom of each fraction by 2 to clear the halves, then use the common denominator <Katex tex="(2x+1)(1-2x) = 1-4x^2" />. CAS may show this as <Katex tex="\tfrac{-4}{4x^2-1}" />, which is the same thing.</>,
  },
  {
    working: <Katex display tex="f'(0) = \frac{4}{1-0} = \boxed{4}" />,
    reason: <>Substitute <Katex tex="x=0" /> into <Katex tex="f'(x)" />. On CAS, <Cas fn="define">Define f(x) = ln(x+1/2) - ln(1/2-x)</Cas>, then <Cas fn="derivative">d/dx(f(x)) | x = 0</Cas> gives 4 directly.</>,
    more: (
      <>
        The report notes students who found <Katex tex="f'(x)" /> and then did not substitute{' '}
        <Katex tex="x=0" />: the question asks for a number. As for <Katex tex="f'(0)=0" />:{' '}
        <Katex tex="f(0) = \log_e\tfrac12-\log_e\tfrac12 = 0" /> (the graph passes through <Katex tex="O" />), but{' '}
        <Katex tex="f'(0)" /> is the <em>gradient</em> there, and the graph is clearly rising at{' '}
        <Katex tex="O" />, so it cannot be 0.
      </>
    ),
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = \frac{4}{1-4x^2}" />,
    reason: <>From part b.i.</>,
  },
  {
    working: <Katex display tex="x \in \left(-\tfrac12,\tfrac12\right) \implies 4x^2<1 \implies 1-4x^2>0" />,
    reason: <>The numerator 4 and the denominator are both positive, so <Katex tex="f'(x)>0" /> at every <Katex tex="x" /> in the domain, including <Katex tex="x=0" />, where <Katex tex="f'(0)=4" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(-\tfrac12,\ \tfrac12\right)}" />,
    reason: <><Katex tex="f" /> is strictly increasing on its whole domain, so that is the maximal set. The endpoints <Katex tex="\pm\tfrac12" /> stay out, because <Katex tex="f" /> is not defined there.</>,
    more: (
      <>
        The report lists six wrong answers. There is no need to remove <Katex tex="x=0" /> or to start the
        interval at <Katex tex="0" />: <Katex tex="O" /> is not a turning point, since the gradient there is 4.
        Square brackets are wrong because <Katex tex="f" /> is not defined at <Katex tex="\pm\tfrac12" />. And{' '}
        <Katex tex="(-\infty,\infty)" /> and <Katex tex="R\setminus\left(-\tfrac12,\tfrac12\right)" /> include
        values of <Katex tex="x" /> outside <Katex tex="\left(-\tfrac12,\tfrac12\right)" />, where{' '}
        <Katex tex="f" /> is not defined at all.
      </>
    ),
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f(-x) = \log_e\!\left(-x+\tfrac12\right)-\log_e\!\left(\tfrac12+x\right)" />,
    reason: <>Replace every <Katex tex="x" /> with <Katex tex="(-x)" />: <Katex tex="x+\tfrac12" /> becomes <Katex tex="-x+\tfrac12" /> and <Katex tex="\tfrac12-x" /> becomes <Katex tex="\tfrac12+x" />.</>,
    more: (
      <>
        The report notes students who substituted <Katex tex="-x" /> incorrectly. Write the brackets in as you
        go: <Katex tex="\tfrac12-(-x) = \tfrac12+x" />. Dropping them gives <Katex tex="\tfrac12-x" /> back
        again, and then the sum no longer comes to 0.
      </>
    ),
  },
  {
    working: <Katex display tex="= \log_e\!\left(\tfrac12-x\right)-\log_e\!\left(x+\tfrac12\right)" />,
    reason: <>Writing <Katex tex="-x+\tfrac12" /> as <Katex tex="\tfrac12-x" /> and <Katex tex="\tfrac12+x" /> as <Katex tex="x+\tfrac12" /> shows these are the same two logarithms as in <Katex tex="f(x)" />, with the signs swapped.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} f(x)+f(-x) &= \log_e\!\left(x+\tfrac12\right)-\log_e\!\left(\tfrac12-x\right) \\ &\quad +\log_e\!\left(\tfrac12-x\right)-\log_e\!\left(x+\tfrac12\right) \end{aligned}"
      />
    ),
    reason: <>Adding.</>,
  },
  {
    working: <Katex display tex="\boxed{f(x)+f(-x) = 0}" />,
    reason: <>The terms cancel in pairs, for every <Katex tex="x" /> in the domain. As required.</>,
    more: (
      <>
        It has to hold for every <Katex tex="x" />, so substituting one value, which the report notes some
        students did, proves nothing. If you combine the logarithms instead, you get <Katex tex="\log_e" /> of a
        product that equals 1, and <Katex tex="\log_e 1 = 0" />. It is the logarithm that is 0, not the product
        inside it: setting the product equal to 0, as in the line the report quotes, is wrong.
      </>
    ),
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\text{domain of } f^{-1} = \text{range of } f = \boxed{R}" />,
    reason: <>The domain of an inverse is the range of the original function, found in part a.</>,
    more: <>The question asks for the domain as well as the rule, and the report notes some students did not find it. Here it takes one line, because part a has already done the work.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} x &= \log_e\!\left(y+\tfrac12\right)-\log_e\!\left(\tfrac12-y\right) \\ &= \log_e\!\left(\frac{y+\tfrac12}{\tfrac12-y}\right) \end{aligned}" />,
    reason: <>Swap <Katex tex="x" /> and <Katex tex="y" /> in <Katex tex="y=f(x)" />, then solve for <Katex tex="y" />. On CAS, <Cas fn="solve">solve(x = ln(y+1/2) - ln(1/2-y), y)</Cas> does this in one step; by hand, first combine the logarithms using <Katex tex="\log_e a-\log_e b = \log_e\tfrac ab" />.</>,
    more: (
      <>
        <Katex tex="f^{-1}" /> is the inverse function, not the reciprocal <Katex tex="\tfrac{1}{f(x)}" />, which
        the report notes some students found. The report also notes that finding the inverse by hand was time
        consuming: in the exam, write this swapped equation, use solve and copy down the answer. The algebra in
        the next three lines is what CAS is doing, so you can see where its answer comes from.
      </>
    ),
  },
  {
    working: <Katex display tex="e^x = \frac{y+\tfrac12}{\tfrac12-y} = \frac{2y+1}{1-2y}" />,
    reason: <>Write both sides as powers of <Katex tex="e" />, since <Katex tex="e^{\log_e A} = A" />, then multiply the top and bottom by 2 to clear the halves.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} e^x-2ye^x &= 2y+1 \\ e^x-1 &= 2y\left(e^x+1\right) \end{aligned}"
      />
    ),
    reason: <>Multiply both sides by <Katex tex="1-2y" />, then move the terms with <Katex tex="y" /> to one side and factorise out <Katex tex="2y" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f^{-1}(x) = \frac{e^x-1}{2\left(e^x+1\right)}}" />,
    reason: <>Dividing by <Katex tex="2\left(e^x+1\right)" />. With the domain <Katex tex="R" /> from the first line, that answers both parts of the question. CAS may show the rule as <Katex tex="\tfrac12\tanh\!\left(\tfrac x2\right)" />, which is the same function.</>,
    more: (
      <>
        If you copy the CAS form, copy it exactly: <Katex tex="\tanh" /> is not <Katex tex="\tan" />, a slip
        the report notes. The report also says <Katex tex="\tanh" /> is not part of the study design but that
        this output is correct, so either form of the rule is fine.
      </>
    ),
  },
]

const ROWS_EI: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} h'(x) &= \tfrac1k f'(x) = \frac{4}{k\left(1-4x^2\right)} \\ h'(0) &= \frac4k \end{aligned}" />,
    reason: <>Using <Katex tex="f'(x)" /> from part b.i. Since <Katex tex="k>0" />, <Katex tex="h'(x)>0" />, so <Katex tex="h" /> is strictly increasing, and <Katex tex="h(0) = \tfrac1k f(0) = 0" />.</>,
  },
  {
    working: <Katex display tex="h(x) = h^{-1}(x) \iff h(x) = x" />,
    reason: <><Katex tex="h^{-1}" /> is the reflection of <Katex tex="h" /> in <Katex tex="y=x" />, and because <Katex tex="h" /> is strictly increasing the two graphs can only meet on that line. They always meet at <Katex tex="O" />, so area is enclosed only if <Katex tex="h(x) = x" /> has a solution <em>other</em> than <Katex tex="x=0" />.</>,
    more: (
      <>
        Why only on <Katex tex="y=x" />: suppose <Katex tex="h(a) = h^{-1}(a) = b" />. Then{' '}
        <Katex tex="h(a) = b" /> and <Katex tex="h(b) = a" />. If <Katex tex="a<b" />, then{' '}
        <Katex tex="h(a)<h(b)" /> because <Katex tex="h" /> is increasing, which says <Katex tex="b<a" />,
        impossible; <Katex tex="a>b" /> fails the same way. So <Katex tex="a=b" />, a point on{' '}
        <Katex tex="y=x" />. This is why the rule for <Katex tex="h^{-1}" /> is never needed here: comparing{' '}
        <Katex tex="h" /> with the line <Katex tex="y=x" /> is enough.
      </>
    ),
  },
  {
    working: <Katex display tex="k>4: \ h'(0) = \tfrac4k<1" />,
    reason: <><Katex tex="y=x" /> has gradient 1, so compare <Katex tex="h'(0)" /> with 1. For <Katex tex="k>4" />, <Katex tex="h" /> leaves <Katex tex="O" /> flatter than <Katex tex="y=x" />, so just to the right of <Katex tex="O" /> it is below the line. But <Katex tex="h(x)\to+\infty" /> as <Katex tex="x\to\tfrac12^-" /> (part a), while <Katex tex="y=x" /> stays below <Katex tex="\tfrac12" /> there, so <Katex tex="h" /> must cross <Katex tex="y=x" /> again at some <Katex tex="x_0" /> in <Katex tex="\left(0,\tfrac12\right)" />. Area is enclosed: <Katex tex="A(k)>0" />.</>,
    more: (
      <>
        Because <Katex tex="h=\tfrac1kf" /> is odd (part c), its graph is symmetric about <Katex tex="O" />, so it
        also crosses at <Katex tex="-x_0" />: just to the left of <Katex tex="O" /> it is above the line, and near{' '}
        <Katex tex="-\tfrac12" /> it is below it. That gives the two shaded regions in VCAA&apos;s figure.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} &0<k\le4,\ x\ne0: \\ &h'(x) = \frac{4}{k\left(1-4x^2\right)} > \frac4k \ge 1 \end{aligned}" />,
    reason: <>For <Katex tex="x\ne0" /> in the domain, <Katex tex="0<1-4x^2<1" />, so <Katex tex="h'(x)" /> is bigger than <Katex tex="\tfrac4k" />. Starting together at <Katex tex="O" />, <Katex tex="h" /> climbs faster than <Katex tex="y=x" />, so <Katex tex="h(x)>x" /> on <Katex tex="\left(0,\tfrac12\right)" />, and, since <Katex tex="h=\tfrac1k f" /> is odd (part c), <Katex tex="h(x)<x" /> on <Katex tex="\left(-\tfrac12,0\right)" />. They meet only at <Katex tex="O" />, so <Katex tex="A(k)=0" />, including at <Katex tex="k=4" />.</>,
    more: (
      <>
        Dividing <Katex tex="\tfrac4k" /> by a positive number less than 1 makes it bigger, which is where{' '}
        <Katex tex="h'(x) > \tfrac4k" /> comes from. At <Katex tex="k=4" />, <Katex tex="h'(0)=1" />, so{' '}
        <Katex tex="y=x" /> is the tangent to <Katex tex="h" /> at <Katex tex="O" />, but <Katex tex="h" />{' '}
        crosses it there (<Katex tex="O" /> is a point of inflection): below the line on the left, above it on
        the right. <Katex tex="O" /> is still the only meeting point, so no region is enclosed,{' '}
        <Katex tex="k=4" /> is excluded and the answer is a strict inequality.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{k > 4}" />,
    reason: <>Combining the two cases. There is no upper limit on <Katex tex="k" />: as <Katex tex="k" /> grows, <Katex tex="x_0" /> moves closer to <Katex tex="\tfrac12" />, but <Katex tex="h" /> still reaches <Katex tex="+\infty" />, so the crossing never disappears.</>,
    more: (
      <>
        <Katex tex="k>0" />, one of the report&apos;s incorrect responses, just repeats the condition in the
        question: it assumes the curves always enclose area, but for <Katex tex="0<k\le4" /> they meet only at{' '}
        <Katex tex="O" />. <Katex tex="4<k<33" /> gets the lower end right but adds a false upper limit. On a
        graph the crossing can seem to vanish for large <Katex tex="k" />: at <Katex tex="k=33" />,{' '}
        <Katex tex="x_0\approx0.49999993" />, so close to <Katex tex="\tfrac12" /> that a graph can no longer
        separate the crossing from the asymptote. The report&apos;s general comments say the answers to 4e could
        easily be found with a slider: graph <Katex tex="y=h(x)" /> and <Katex tex="y=x" /> on CAS with a slider
        for <Katex tex="k" />, and the area appears just after <Katex tex="k=4" />. For large <Katex tex="k" />,
        trust the argument above over the screen. The
        diagram below has such a slider: nothing is enclosed up to <Katex tex="k=4" />, and the shaded area
        never vanishes as <Katex tex="k" /> grows.
      </>
    ),
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
          .
          <br />
          Part of the graph of <Katex tex="y=f(x)" /> is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={graphSrc}
            alt="The graph of f: an increasing curve through the origin O between dashed vertical asymptotes x = −1/2 and x = 1/2 — from the original 2022 VCAA exam paper"
            className="w-full max-w-[340px]"
          />
        </div>
      </div>

      <PartCard letter="a" topic="Range" marks={1} statement={<>State the range of <Katex tex="f(x)" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b.i" topic="Derivative" marks={2} statement={<>Find <Katex tex="f'(0)" />.</>} examinerReport={EXAM_BI}>
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Increasing Function"
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
        topic="Odd Function"
        marks={1}
        statement={<>Show that <Katex tex="f(x)+f(-x)=0" />.</>}
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Inverse Function"
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

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p>
          Let <Katex tex="h" /> be the function{' '}
          <Katex tex="h:\left(-\tfrac12,\tfrac12\right)\to R,\ h(x)=\tfrac1k\left(\log_e\!\left(x+\tfrac12\right)-\log_e\!\left(\tfrac12-x\right)\right)" />
          , where <Katex tex="k\in R" /> and <Katex tex="k>0" />.
          <br />
          The inverse function of <Katex tex="h" /> is defined by{' '}
          <Katex tex="h^{-1}:R\to R,\ h^{-1}(x)=\dfrac{e^{kx}-1}{2\left(e^{kx}+1\right)}" />
          .
          <br />
          The area of the regions bound by the functions <Katex tex="h" /> and{' '}
          <Katex tex="h^{-1}" /> can be expressed as a function, <Katex tex="A(k)" />.
          <br />
          The graph below shows the relevant area shaded.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={areaSrc}
            alt="The curves h and h⁻¹ between the dashed lines x = −1/2 and x = 1/2, crossing at the origin and at two symmetric points, with the two regions between them shaded — from the original 2022 VCAA exam paper"
            className="w-full max-w-[400px]"
          />
        </div>
        <p>
          You are not required to find or define <Katex tex="A(k)" />.
        </p>
      </div>

      <PartCard
        letter="e.i"
        topic="Parameter Range"
        marks={1}
        statement={
          <>
            Determine the range of values of <Katex tex="k" /> such that{' '}
            <Katex tex="A(k)>0" />.
          </>
        }
        examinerReport={EXAM_EI}
      >
        <WorkingTable rows={ROWS_EI} />
        <Explore title="The curves only trap area once h leaves O flatter than y = x">
          <CrossingWidget />
        </Explore>
      </PartCard>

      <div className="text-[13.5px] leading-relaxed text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          <b>Part e.ii.</b> was redacted by VCAA following the findings of the Independent
          Review into the VCAA's Examination-Setting Policies, Processes and Procedures for
          the VCE. Neither the question nor a marking scheme was published, so there is
          nothing to solve here.
        </p>
      </div>
    </div>
  )
}
