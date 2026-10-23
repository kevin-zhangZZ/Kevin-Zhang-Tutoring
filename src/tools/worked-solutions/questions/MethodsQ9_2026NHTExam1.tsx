// 2026 Mathematical Methods NHT — Exam 1, Question 9 (9 marks). The NHT report gives sample
// answers only, with no statistics; its notes on each part are quoted as the examiner comments.
// f(x) = (2 − eˣ)/e²ˣ: show f′(x) = (eˣ − 4)/e²ˣ, the stationary point (log_e(4), −1/8) and its
// nature (a local minimum), the solution set of f(x) ≥ 0, then p in terms of q given that the
// integral of f from p to q is zero. Question text transcribed from the original paper (no
// diagram). The figure in part d. is this site's own explanatory graph of f, which VCAA never
// printed. Answers checked with sympy/scipy and against the VCAA report's sample answers
// ((log_e(4), −1/8); local minimum; x ≤ log_e(2); p = −log_e(1 − e^(−q)), equivalently
// log_e(eᵠ/(eᵠ − 1)), for q > 0). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import areasSrc from './meth-2026nhte1-q9d-areas.png'

const REPORT_A: SAExaminerStats = {
  comment: (
    <>
      This question was a &lsquo;show that&rsquo; question. As such, each line of working needed to demonstrate a clear,
      logical and explicit progression, leading to the answer. Students could choose to separate out the terms and then
      differentiate and recombine, or they could use the product rule or quotient rule directly to produce the
      derivative. The derivative needed to be given in the form as stated in the question.
    </>
  ),
}

const REPORT_BI: SAExaminerStats = {
  comment: (
    <>
      This question involved setting the derivative equal to zero and solving to find the coordinates of the stationary
      point.
    </>
  ),
}

const REPORT_BII: SAExaminerStats = {
  comment: (
    <>
      There were different ways that this question could be approached. Students could test the derivative either side
      of the point, they could use the second derivative test or they could test the <Katex tex="y" />-values either side
      of the point. It was important to see that actual calculations were made and that conclusions were drawn from
      actual calculations.
    </>
  ),
}

const REPORT_C: SAExaminerStats = {
  comment: (
    <>
      This question required students to find the values of <Katex tex="x" /> such that <Katex tex="f(x)\ge0" />.
    </>
  ),
}

const REPORT_D: SAExaminerStats = {
  comment: (
    <>
      This question involved finding the integral of <Katex tex="f(x)=\dfrac{2-e^x}{e^{2x}}" /> and evaluating at the
      terminals <Katex tex="x=q" /> and <Katex tex="x=p" /> in order to obtain an expression for <Katex tex="p" /> in
      terms of <Katex tex="q" />. The resulting equation could then be factorised and solved by using either a difference
      of two squares approach, completing the square, or by forming a quadratic in terms of <Katex tex="e^{-p}" /> and
      using the quadratic formula. It was important to discard the case when <Katex tex="p=q" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)=\frac{2}{e^{2x}}-\frac{e^x}{e^{2x}}=2e^{-2x}-e^{-x}" />,
    reason: <>
      Split the fraction and use index laws: <Katex tex="\tfrac{1}{e^{2x}}=e^{-2x}" /> and{' '}
      <Katex tex="\tfrac{e^x}{e^{2x}}=e^{x-2x}=e^{-x}" />. Two simple exponentials are easier to differentiate than a
      quotient.
    </>,
    more: <>The quotient rule or the product rule on <Katex tex="e^{-2x}(2-e^x)" /> works too; the report shows all three.</>,
  },
  {
    working: <Katex display tex="f'(x)=-4e^{-2x}+e^{-x}" />,
    reason: <><Katex tex="\tfrac{d}{dx}e^{ax}=ae^{ax}" />: <Katex tex="2\times(-2)=-4" />, and <Katex tex="-1\times(-1)=+1" />.</>,
  },
  {
    working: <Katex display tex="=\frac{1}{e^x}-\frac{4}{e^{2x}}=\frac{e^x}{e^{2x}}-\frac{4}{e^{2x}}" />,
    reason: <>Back to fractions, over the common denominator <Katex tex="e^{2x}" />: multiply the first by <Katex tex="\tfrac{e^x}{e^x}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x)=\frac{e^x-4}{e^{2x}}}" />,
    reason: <>The form stated in the question, which the report notes was required. As required.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x)=0 \implies e^x-4=0" />,
    reason: <>A fraction is zero only when its numerator is; <Katex tex="e^{2x}" /> is never zero.</>,
  },
  {
    working: <Katex display tex="e^x=4 \implies x=\log_e(4)" />,
    reason: <>Take the natural log of both sides. One solution, matching &ldquo;exactly one stationary point&rdquo;.</>,
  },
  {
    working: <Katex display tex="f\big(\log_e(4)\big)=\frac{2-e^{\log_e(4)}}{\left(e^{\log_e(4)}\right)^2}=\frac{2-4}{4^2}=-\frac{2}{16}" />,
    reason: <>
      Use <Katex tex="e^{\log_e(4)}=4" /> in the numerator and in the denominator, since{' '}
      <Katex tex="e^{2x}=\left(e^x\right)^2" />. So the denominator is <Katex tex="4^2=16" />.
    </>,
  },
  {
    working: <Katex display tex="\boxed{\left(\log_e(4),\,-\frac18\right)}" />,
    reason: <>
      Exact form, as Exam 1 requires. <Katex tex="\log_e(4)" /> may also be written <Katex tex="2\log_e(2)" />.
    </>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <Katex display tex="f'\big(\log_e(2)\big)=\frac{2-4}{2^2}=-\frac12<0" />,
    reason: <>
      Test the gradient just to the left of <Katex tex="x=\log_e(4)" />: <Katex tex="\log_e(2)<\log_e(4)" /> because{' '}
      <Katex tex="\log_e" /> is increasing. Choosing <Katex tex="x=\log_e(\text{a number})" /> makes{' '}
      <Katex tex="e^x" /> that number, so the arithmetic stays exact.
    </>,
  },
  {
    working: <Katex display tex="f'\big(\log_e(6)\big)=\frac{6-4}{6^2}=\frac{1}{18}>0" />,
    reason: <>And to the right: <Katex tex="\log_e(6)>\log_e(4)" />.</>,
    more: <>
      Quicker reasoning gives the same signs: the denominator <Katex tex="e^{2x}" /> is always positive, so{' '}
      <Katex tex="f'(x)" /> has the sign of <Katex tex="e^x-4" />, negative for <Katex tex="x<\log_e(4)" /> and positive
      after. The report wants actual calculations, though, so show the two test values.
    </>,
  },
  {
    working: <Katex display tex="\boxed{\left(\log_e(4),\,-\tfrac18\right)\text{ is a local minimum}}" />,
    reason: <>
      The gradient changes from negative to positive: the graph falls into the point and rises out of it. The report also
      accepts &ldquo;minimum&rdquo; or &ldquo;global minimum&rdquo;.
    </>,
    more: <>
      Second-derivative route: <Katex tex="f''(x)=-e^{-x}+8e^{-2x}" />, so{' '}
      <Katex tex="f''\big(\log_e(4)\big)=-\tfrac14+\tfrac{8}{16}=\tfrac14>0" />, concave up, a minimum.
    </>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{2-e^x}{e^{2x}}\ge0 \iff 2-e^x\ge0" />,
    reason: <>
      <Katex tex="e^{2x}>0" /> for every real <Katex tex="x" />, so multiplying through by it keeps the inequality the
      same way round. The sign of <Katex tex="f" /> is the sign of its numerator.
    </>,
  },
  {
    working: <Katex display tex="e^x\le2 \iff x\le\log_e(2)" />,
    reason: <><Katex tex="\log_e" /> is increasing, so taking logs of both sides keeps <Katex tex="\le" />.</>,
  },
  {
    working: <Katex display tex="\boxed{x\le\log_e(2)}" />,
    reason: <>
      Or <Katex tex="x\in(-\infty,\log_e(2)]" />. Include the endpoint: the question asks for <Katex tex="\ge" />, and{' '}
      <Katex tex="f\big(\log_e(2)\big)=0" />.
    </>,
    more: <>
      Consistent with part b.: the graph crosses the axis at <Katex tex="\log_e(2)\approx0.69" />, then dips to its
      minimum <Katex tex="-\tfrac18" /> at <Katex tex="\log_e(4)" /> and stays negative from there on.
    </>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\int_p^q\left(2e^{-2x}-e^{-x}\right)dx=\Big[-e^{-2x}+e^{-x}\Big]_p^q" />,
    reason: <>
      Use the split form from part a. <Katex tex="\int e^{ax}\,dx=\tfrac1ae^{ax}" />: <Katex tex="\tfrac{2}{-2}=-1" /> and{' '}
      <Katex tex="\tfrac{-1}{-1}=+1" />.
    </>,
  },
  {
    working: <Katex display tex="\left(-e^{-2q}+e^{-q}\right)-\left(-e^{-2p}+e^{-p}\right)=0" />,
    reason: <>Substitute the terminals and set the integral equal to 0, as given.</>,
  },
  {
    working: <Katex display tex="e^{-p}-e^{-q}=e^{-2p}-e^{-2q}" />,
    reason: <>Rearrange to put the matching powers side by side.</>,
  },
  {
    working: <Katex display tex="e^{-p}-e^{-q}=\left(e^{-p}-e^{-q}\right)\left(e^{-p}+e^{-q}\right)" />,
    reason: <>
      The right side is a difference of two squares: <Katex tex="e^{-2p}=\left(e^{-p}\right)^2" />.
    </>,
    more: <>
      Seeing this is easier with a substitution: let <Katex tex="u=e^{-p}" />, <Katex tex="v=e^{-q}" />. Then the equation
      is <Katex tex="u-v=u^2-v^2=(u-v)(u+v)" />.
    </>,
  },
  {
    working: <Katex display tex="p\ne q \implies e^{-p}-e^{-q}\ne0 \implies 1=e^{-p}+e^{-q}" />,
    reason: <>
      Divide both sides by <Katex tex="e^{-p}-e^{-q}" />. That is only allowed because it isn&apos;t zero:{' '}
      <Katex tex="e^{-x}" /> is one-to-one, so <Katex tex="p\ne q" /> gives <Katex tex="e^{-p}\ne e^{-q}" />.
    </>,
    more: <>
      The factor <Katex tex="e^{-p}-e^{-q}=0" /> would give <Katex tex="p=q" />, an integral over an interval of width
      zero, which is zero for any function. The question rules it out, and the report notes it had to be discarded.
    </>,
  },
  {
    working: <Katex display tex="e^{-p}=1-e^{-q} \implies -p=\log_e\!\left(1-e^{-q}\right)" />,
    reason: <>
      Take logs. This needs <Katex tex="1-e^{-q}>0" />, i.e. <Katex tex="q>0" />: for any <Katex tex="q\le0" /> there is no
      such <Katex tex="p" />.
    </>,
  },
  {
    working: <Katex display tex="\boxed{p=-\log_e\!\left(1-e^{-q}\right)}" />,
    reason: <>
      Equivalent forms the report lists include <Katex tex="\log_e\!\left(\tfrac{e^q}{e^q-1}\right)" /> and{' '}
      <Katex tex="q-\log_e\!\left(e^q-1\right)" />; the report gives the first with the condition{' '}
      <Katex tex="q>0" />.
    </>,
    more: <>
      Check with <Katex tex="q=\log_e(4)" />: <Katex tex="p=-\log_e\!\left(\tfrac34\right)=\log_e\!\left(\tfrac43\right)" />,
      one on each side of <Katex tex="\log_e(2)" />, as the picture below says it must be. The relationship{' '}
      <Katex tex="e^{-p}+e^{-q}=1" /> is symmetric, so swapping <Katex tex="p" /> and <Katex tex="q" /> works too. One
      fine point: <Katex tex="q=\log_e(2)" /> gives <Katex tex="p=\log_e(2)" />, i.e. <Katex tex="p=q" />, so that single
      value of <Katex tex="q" /> is excluded as well.
    </>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={areasSrc}
          alt="This site's own graph of y = f(x): the curve falls from (0, 1), crosses the x-axis at log_e(2), dips to its minimum below the axis and then rises slowly back towards the axis. Between x = p and log_e(2) the area above the axis is shaded blue and marked plus; between log_e(2) and x = q the area below the axis is shaded orange and marked minus"
          className="w-full max-w-[420px]"
        />
      </div>
    ),
    reason: <>
      Why a zero integral is possible: <Katex tex="f" /> is positive left of <Katex tex="\log_e(2)" /> and negative right
      of it (part c.), so the signed area above the axis (blue) can cancel the signed area below it (orange). Shown for{' '}
      <Katex tex="q=1.6" />, where the formula gives <Katex tex="p\approx0.23" />.
    </>,
  },
]

export default function MethodsQ9_2026NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 9 (9 marks)</p>
        <p>
          Let <Katex tex="f:R\to R,\ f(x)=\dfrac{2-e^x}{e^{2x}}" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Show That"
        marks={1}
        statement={<>Show that <Katex tex="f'(x)=\dfrac{e^x-4}{e^{2x}}" />.</>}
        examinerReport={REPORT_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-1">
        <p className="font-semibold text-gray-900 dark:text-white">b.</p>
        <p>
          The graph of <Katex tex="y=f(x)" /> has exactly one stationary point.
        </p>
      </div>

      <PartCard
        letter="b.i"
        topic="Stationary Points"
        marks={2}
        statement={<>Find the coordinates of this stationary point.</>}
        examinerReport={REPORT_BI}
      >
        <WorkingTable rows={ROWS_BI} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Nature of Stationary Points"
        marks={2}
        statement={<>Determine the nature of this stationary point.</>}
        examinerReport={REPORT_BII}
      >
        <WorkingTable rows={ROWS_BII} />
        <WrongMethod
          title="State the nature without testing anything"
          working={<>&ldquo;The <Katex tex="y" />-value is negative, so it is a minimum.&rdquo;</>}
        >
          A negative <Katex tex="y" />-value says nothing about the shape: a maximum can sit below the axis too. The report
          stresses that conclusions had to come from actual calculations: the sign of <Katex tex="f'" /> on each side, the
          sign of <Katex tex="f''" /> at the point, or <Katex tex="f" />-values on each side.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="c"
        topic="Inequalities"
        marks={1}
        statement={<>Find all values of <Katex tex="x" /> such that <Katex tex="f(x)\ge0" />.</>}
        examinerReport={REPORT_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Definite Integrals"
        marks={3}
        statement={
          <>
            Given that <Katex tex="\displaystyle\int_p^q f(x)\,dx=0" />, where <Katex tex="p\ne q" /> and{' '}
            <Katex tex="p,q\in R" />, find an expression for <Katex tex="p" /> in terms of <Katex tex="q" />.
          </>
        }
        examinerReport={REPORT_D}
      >
        <Background>
          <p>
            A definite integral measures <em>signed</em> area: regions above the axis count positive and regions below count
            negative. An integral of zero over <Katex tex="[p,q]" /> doesn&apos;t mean there is no area, only that the
            positive and negative parts cancel. So expect <Katex tex="p" /> and <Katex tex="q" /> to lie on opposite sides
            of the <Katex tex="x" />-intercept <Katex tex="\log_e(2)" /> found in part c.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
        <WrongMethod
          title="Keep p = q as a solution"
          working={<Katex display tex="e^{-p}-e^{-q}=0 \implies p=q" />}
        >
          This factor gives the trivial solution <Katex tex="p=q" />, which the question excludes. Say explicitly that it is
          non-zero because <Katex tex="p\ne q" />, and only then divide by it; the report notes discarding{' '}
          <Katex tex="p=q" /> was important.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
