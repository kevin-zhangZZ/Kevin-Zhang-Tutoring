// 2024 Specialist Mathematics — Exam 2, Section B Question 1 (10 marks). A rational
// function with two vertical asymptotes: sketch, a volume of revolution about the y-axis,
// then counting the stationary points of a parametrised relative. Question text transcribed
// from the original paper (2024 papers are image-only, so read from rendered pages); the
// part a. graph is our own drawing of the answer on VCAA's exact grid (x from −2.26 to 2.3,
// gridlines every 0.2; y from −9 to 9, gridlines every 1). Answers checked with sympy and
// against the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Cas } from '../CasRef'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import sketchSrc from './spec-2024e2-q1a-sketch.png'

const EXAM_A: SAExaminerStats = {
  marks: [2, 16, 65, 17],
  average: 2.0,
  comment: (
    <>
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          Many students did not draw this graph accurately. To improve accuracy, students can
          sketch the function on their CAS calculator and set the domain, range and scale to match
          those provided in the question.
        </li>
        <li>
          The graph must be flatter near the <Katex tex="y" />-intercept, with turning points and
          end points precisely positioned.
        </li>
        <li>
          Students generally succeeded in drawing and labelling the asymptotes and demonstrated
          asymptotic behaviour effectively.
        </li>
      </ul>
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [22, 22, 56],
  average: 1.4,
  comment: (
    <>
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          Students were expected to write an expression for <Katex tex="x^2" /> within the
          definite integral instead of stating the generic formula.
        </li>
        <li>
          Many students made transcription errors when transferring their answer from their CAS
          to the script.
        </li>
      </ul>
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [44, 56],
  average: 0.6,
  comment: <>Success in part i generally resulted in an accurate answer in this part.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [28, 72],
  average: 0.7,
}

const EXAM_DI: SAExaminerStats = {
  marks: [73, 27],
  average: 0.3,
  comment: (
    <>
      Of those students who attempted this part, the most frequent incorrect response was{' '}
      <Katex tex="b<-1" />.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [73, 27],
  average: 0.3,
  comment: <>Many students did not include the equality sign.</>,
}

const EXAM_DIII: SAExaminerStats = {
  marks: [75, 25],
  average: 0.3,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="x^4-x^2+1 = x^2\left(x^2-1\right)+1 \implies f(x) = -x^2+\frac{1}{1-x^2}" />,
    reason: <>Dividing through first. In this form the two pieces are separate: a downward parabola plus a term that blows up at <Katex tex="x=\pm1" />.</>,
  },
  {
    working: <Katex display tex="1-x^2 = 0 \implies \text{vertical asymptotes } x = -1 \text{ and } x = 1" />,
    reason: <>Both must be labelled with their equations.</>,
  },
  {
    working: <Katex display tex="f'(x) = -2x+\frac{2x}{\left(1-x^2\right)^2} = 2x\left[\frac{1}{\left(1-x^2\right)^2}-1\right]" />,
    reason: <>Factorising the 2x out is what makes the zeros readable.</>,
  },
  {
    working: <Katex display tex="f'(x) = 0 \implies x = 0 \ \text{ or } \ \left(1-x^2\right)^2 = 1 \implies x = 0,\ \pm\sqrt2" />,
    reason: <><Katex tex="1-x^2=\pm1" /> gives <Katex tex="x^2=0" /> or <Katex tex="x^2=2" />.</>,
  },
  {
    working: <Katex display tex="f(0) = 1, \qquad f\!\left(\pm\sqrt2\right) = -2+\frac{1}{1-2} = -3" />,
    reason: <>So the stationary points are <Katex tex="(0,1)" />, <Katex tex="\left(\sqrt2,-3\right)" /> and <Katex tex="\left(-\sqrt2,-3\right)" />.</>,
  },
  {
    working: <Katex display tex="|x|<1: \ f\to+\infty \text{ at both ends}; \qquad |x|>1: \ f\to-\infty \text{ both ways}" />,
    reason: <>On the middle branch <Katex tex="1-x^2>0" />, so the reciprocal term is positive and dominates near the asymptotes; on the outer branches it is negative, and far out the <Katex tex="-x^2" /> takes over.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img
          src={sketchSrc}
          alt="The answer on VCAA's grid (x from about −2.3 to 2.3, y from about −9 to 9): three branches either side of the dashed asymptotes x = −1 and x = 1 — a flat-bottomed middle valley with minimum (0, 1) rising to +∞ at both asymptotes, and two outer branches each with a maximum at (±√2, −3) falling away to −∞"
          className="w-full max-w-[480px]"
        />
      </div>
    ),
    reason: <>The middle branch is a wide, flat-bottomed valley with its minimum at <Katex tex="(0,1)" />. The report stresses the graph must be flatter near the <Katex tex="y" />-intercept, with turning points and end points precisely positioned.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="V = \pi\int_{1}^{6} x^2\,dy" />,
    reason: <>Rotation about the <Katex tex="y" />-axis, between the two given horizontal lines. The terminals are <Katex tex="y" />-values, not <Katex tex="x" />-values.</>,
  },
  {
    working: <Katex display tex="y = -x^2+\frac{1}{1-x^2}, \quad \text{let } u = x^2 \implies y(1-u) = -u(1-u)+1" />,
    reason: <>The integrand has to be <Katex tex="x^2" /> written in terms of <Katex tex="y" />, so invert the relation.</>,
  },
  {
    working: <Katex display tex="u^2+(y-1)u+(1-y) = 0" />,
    reason: <>A quadratic in <Katex tex="u=x^2" />. Rearranging: <Katex tex="y-yu = -u+u^2+1" />.</>,
  },
  {
    working: <Katex display tex="u = \frac{(1-y)\pm\sqrt{(y-1)^2+4(y-1)}}{2} = \frac{1-y\pm\sqrt{y^2+2y-3}}{2}" />,
    reason: <>The quadratic formula, with <Katex tex="(y-1)^2+4(y-1) = y^2+2y-3" />.</>,
  },
  {
    working: <Katex display tex="y=1 \implies u=0 \text{ (the minimum at } x=0) \implies \text{take the } + \text{ root}" />,
    reason: <>Choosing the branch: the region sits on the middle arm, which starts at <Katex tex="x=0" /> when <Katex tex="y=1" />. Only the plus sign delivers that.</>,
  },
  {
    working: <Katex display tex="\boxed{V = \pi\int_1^{6}\frac{1-y+\sqrt{y^2+2y-3}}{2}\,dy}" />,
    reason: <>The report says students were expected to write an expression for <Katex tex="x^2" /> within the definite integral instead of stating the generic formula.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="V = \frac{\pi}{2}\int_1^{6}\left(1-y+\sqrt{y^2+2y-3}\right)dy" />,
    reason: <>Straight into <Cas fn="nInt" />.</>,
  },
  {
    working: <Katex display tex="= 11.19823\ldots" />,
    reason: <>Exactly, <Katex tex="\tfrac{\pi}{4}\left(21\sqrt5-25+4\log_e\!\left(\tfrac{2}{7+3\sqrt5}\right)\right)" /> — but a decimal was all that was asked for.</>,
  },
  {
    working: <Katex display tex="\boxed{11.2 \text{ cubic units}}" />,
    reason: <>One decimal place, as required.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="g(x) = \frac{x^4+b}{1-x^2}" />,
    reason: <>The only possible asymptotes come from <Katex tex="1-x^2=0" />, so they disappear exactly when the numerator cancels those factors.</>,
  },
  {
    working: <Katex display tex="\text{need } x = \pm1 \text{ to be zeros of } x^4+b \implies 1+b = 0" />,
    reason: <>Both give the same condition, since <Katex tex="(\pm1)^4=1" />.</>,
  },
  {
    working: <Katex display tex="b = -1: \quad g(x) = \frac{x^4-1}{1-x^2} = \frac{\left(x^2-1\right)\left(x^2+1\right)}{-\left(x^2-1\right)} = -\left(x^2+1\right)" />,
    reason: <>Both factors cancel at once, leaving a polynomial.</>,
  },
  {
    working: <Katex display tex="\boxed{b = -1}" />,
    reason: <>The graph is then the downward parabola <Katex tex="y=-x^2-1" /> (with the points at <Katex tex="x=\pm1" /> still excluded from the domain) — no asymptotes of any kind.</>,
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="g'(x) = \frac{-2x\left(\left(x^2-1\right)^2-(b+1)\right)}{\left(1-x^2\right)^2} = 0" />,
    reason: <>Given. The numerator is zero when <Katex tex="x=0" /> or <Katex tex="\left(x^2-1\right)^2 = b+1" />.</>,
  },
  {
    working: <Katex display tex="x=0 \text{ is always a stationary point}" />,
    reason: <>Since <Katex tex="g'(0)=0" /> whatever <Katex tex="b" /> is. So "exactly one" means the second equation must contribute nothing.</>,
  },
  {
    working: <Katex display tex="b+1<0 \implies \left(x^2-1\right)^2 = b+1 \text{ has no real solutions}" />,
    reason: <>A square cannot be negative.</>,
  },
  {
    working: <Katex display tex="b+1=0 \implies \left(x^2-1\right)^2 = 0 \implies x = \pm1" />,
    reason: <>These are outside the domain, so they are not stationary points either — which is why <Katex tex="b=-1" /> must be included.</>,
  },
  {
    working: <Katex display tex="\boxed{b \le -1}" />,
    reason: <>The report notes <Katex tex="b<-1" /> as the most frequent wrong answer.</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="\left(x^2-1\right)^2 = b+1 \implies x^2 = 1\pm\sqrt{b+1} \quad (b\ge-1)" />,
    reason: <>Taking square roots twice, keeping both signs at the first step.</>,
  },
  {
    working: <Katex display tex="x^2 = 1+\sqrt{b+1} \ \text{ always gives two solutions } \pm\sqrt{1+\sqrt{b+1}}" />,
    reason: <>This value is at least 1, so it is always positive.</>,
  },
  {
    working: <Katex display tex="x^2 = 1-\sqrt{b+1} \ \text{ gives two more only if } 1-\sqrt{b+1}>0 \iff b<0" />,
    reason: <>So for <Katex tex="-1<b<0" /> there are four extra stationary points, not two.</>,
  },
  {
    working: <Katex display tex="b\ge0 \implies 1-\sqrt{b+1}\le0 \implies \text{no solutions from that branch}" />,
    reason: <>At <Katex tex="b=0" /> exactly, <Katex tex="x^2=0" /> gives <Katex tex="x=0" />, which is already counted — so <Katex tex="b=0" /> still yields three stationary points in total and must be included.</>,
  },
  {
    working: <Katex display tex="\boxed{b \ge 0}" />,
    reason: <>The three points are <Katex tex="x=0" /> and <Katex tex="x=\pm\sqrt{1+\sqrt{b+1}}" />. The report notes many students did not include the equality sign.</>,
  },
]

const ROWS_DIII: WorkingRow[] = [
  {
    working: <Katex display tex="\text{five stationary points} \iff \text{four nonzero solutions of } \left(x^2-1\right)^2 = b+1" />,
    reason: <>Both branches of part d.ii. must contribute a pair, on top of <Katex tex="x=0" />.</>,
  },
  {
    working: <Katex display tex="b+1>0 \implies b>-1" />,
    reason: <>Strictly positive, so that <Katex tex="\sqrt{b+1}\ne0" /> and the two branches are genuinely different (and their roots are not the excluded <Katex tex="x=\pm1" />).</>,
  },
  {
    working: <Katex display tex="1-\sqrt{b+1}>0 \implies \sqrt{b+1}<1 \implies b<0" />,
    reason: <>Strict again, since <Katex tex="b=0" /> would collapse that pair onto <Katex tex="x=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{-1<b<0}" />,
    reason: <>The five points are <Katex tex="x=0" /> and <Katex tex="x=\pm\sqrt{1\pm\sqrt{b+1}}" />. Note how parts d.i., d.ii. and d.iii. between them cover the whole real line for <Katex tex="b" />: one, five, and three stationary points respectively.</>,
  },
]

export default function SpecialistQ1_2024Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (10 marks)</p>
        <p>
          Consider the function <Katex tex="f" /> with rule{' '}
          <Katex tex="f(x)=\dfrac{x^4-x^2+1}{1-x^2}" />.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            Dividing first is worth the thirty seconds it takes:{' '}
            <Katex tex="f(x) = -x^2+\tfrac{1}{1-x^2}" />. The sketch, the derivative and the
            inversion in part b. all come out of that form, and none of them is pleasant from
            the original quotient.
          </p>
          <p>
            Part d. is really one calculation asked three ways. Every stationary point comes
            from <Katex tex="x=0" /> (always) or from{' '}
            <Katex tex="x^2 = 1\pm\sqrt{b+1}" />, and the count depends only on how many of
            those two values are positive. Work that out once and all three answers —{' '}
            <Katex tex="b\le-1" />, <Katex tex="b\ge0" />, <Katex tex="-1<b<0" /> — fall out
            together, which is also a check that they partition the real line.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        topic="Sketch Graph"
        marks={3}
        statement={
          <>
            Sketch the graph of <Katex tex="y=f(x)" /> on the set of axes below. Label the
            vertical asymptotes with their equations and label the stationary points with their
            coordinates.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">b.</p>
        <p>
          The region bounded by the graph of <Katex tex="y=f(x)" /> and the lines{' '}
          <Katex tex="y=1" /> and <Katex tex="y=6" /> is rotated about the{' '}
          <Katex tex="y" />-axis to form a solid of revolution.
        </p>
      </div>

      <PartCard
        letter="b.i"
        topic="Volume of Revolution"
        marks={2}
        statement={
          <>
            Write down a definite integral involving only the variable <Katex tex="y" />, that
            when evaluated, will give the volume of the solid.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Volume of Revolution"
        marks={1}
        statement={<>Find the volume of the solid, correct to one decimal place.</>}
        examinerReport={EXAM_BII}
      >
        <WorkingTable rows={ROWS_BII} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Asymptotes"
        marks={1}
        statement={
          <>
            Now consider the function <Katex tex="g" /> with rule{' '}
            <Katex tex="g(x)=\dfrac{x^4+b}{1-x^2}" />, where <Katex tex="b\in R" />.
            <br />
            For what value of <Katex tex="b" /> will the graph of <Katex tex="g" /> have no
            asymptotes?
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-3">
        <p className="font-semibold text-gray-900 dark:text-white">d.</p>
        <p>
          The gradient function of <Katex tex="g" /> is given by{' '}
          <Katex tex="g'(x)=\dfrac{-2x\left(\left(x^2-1\right)^2-(b+1)\right)}{\left(1-x^2\right)^2}" />.
          <br />
          For what values of <Katex tex="b" /> will the graph of <Katex tex="g" /> have exactly
        </p>
      </div>

      <PartCard letter="d.i" topic="Stationary Points" marks={1} statement={<>one stationary point?</>} examinerReport={EXAM_DI}>
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard letter="d.ii" topic="Stationary Points" marks={1} statement={<>three stationary points?</>} examinerReport={EXAM_DII}>
        <WorkingTable rows={ROWS_DII} />
      </PartCard>

      <PartCard letter="d.iii" topic="Stationary Points" marks={1} statement={<>five stationary points?</>} examinerReport={EXAM_DIII}>
        <WorkingTable rows={ROWS_DIII} />
      </PartCard>
    </div>
  )
}
