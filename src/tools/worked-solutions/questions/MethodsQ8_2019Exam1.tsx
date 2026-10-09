// 2019 Mathematical Methods — Exam 1, Question 8 (4 marks).
// A degree-4 polynomial f touching the x-axis at the origin, with local maxima marked on its
// graph — find the rule (part a), then the domain (part b) and range (part c) of
// h(x)=log_e(g(x))-log_e(x³+x²), where g has the same rule as f. Question text transcribed from
// the original paper; the diagram is cropped directly from the original VCAA exam PDF, not a
// redrawing. Cross-checked against the VCAA examination report and itute's independent
// solutions — both agree with the derivation below (itute writes the range as
// (−∞, 3log_e 2)\{2log_e 2}, the same set). Solution is original; answers re-checked with sympy.
// Interactives: (a) a slider for the dilation factor a in y = a·x²(x²−1) — every a gives the same
// intercepts, only a = −4 reaches the marked peaks; (b) drag x to see h exists only where both log
// inputs are positive, with a toggle for the "simplify first" shortcut's too-big domain; (c) sweep
// x across D and watch the range bar get painted, leaving a gap at log_e 4 from the hole at x = 0.
// WrongMethods: (a) no dilation factor (examiner's report); (b) simplify-then-find-domain;
// (c) forgetting the hole at x = 0.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import diagramSrc from './meth-2019e1-q8-quartic.png'

const DilationWidget = lazyWidget(() => import('../interactives/meth-2019e1-q8a-dilation'))
const DomainWidget = lazyWidget(() => import('../interactives/meth-2019e1-q8b-domain'))
const RangeWidget = lazyWidget(() => import('../interactives/meth-2019e1-q8c-range'))

const EXAM_A: SAExaminerStats = {
  marks: [86, 14],
  average: 0.2,
  comment: <>This question was well attempted but not done well, with many students overlooking the dilation factor.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [91, 9],
  average: 0.1,
  comment: (
    <>
      Students who did this question well realised that the maximal domain could be obtained
      by considering the common domains for <Katex tex="f(x)>0" /> (observed from the graph
      given in part a.) and <Katex tex="\{x: x^3+x^2>0\}" />. Some students were not clear on
      how to express the interval.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [88, 12, 1],
  average: 0.2,
  comment: <>Not many students attempted this question. Only a few students used logarithm laws. Some students sketched various graphs with limited success.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = ax^2(x+1)(x-1)" />,
    reason: (
      <>
        Read the factors off the intercepts. The graph <em>touches</em> the axis at the origin and
        turns back, like <Katex tex="y=x^2" /> does, so <Katex tex="x^2" /> is a factor; it{' '}
        <em>crosses</em> straight through at <Katex tex="x=\pm1" />, so <Katex tex="(x+1)" /> and{' '}
        <Katex tex="(x-1)" /> are single factors. That is <Katex tex="2+1+1=4" />, the whole degree,
        so there are no other factors — but there is still an unknown constant <Katex tex="a" />,
        because stretching the graph up or down never moves an intercept.
      </>
    ),
  },
  {
    working: <Katex display tex="f(x) = ax^2(x^2-1)" />,
    reason: <>Difference of two squares tidies it up and makes the next substitution quicker.</>,
  },
  {
    working: <Katex display tex="f\!\left(\tfrac{1}{\sqrt2}\right) = 1" />,
    reason: (
      <>
        To find <Katex tex="a" /> you need a point on the graph that is <em>not</em> an intercept:
        substituting <Katex tex="(1,0)" /> gives <Katex tex="a\cdot1\cdot0=0" />, which is true for
        every <Katex tex="a" /> and tells you nothing. The marked turning point{' '}
        <Katex tex="\left(\tfrac{1}{\sqrt2},1\right)" /> is the only height information the diagram
        gives.
      </>
    ),
  },
  {
    working: <Katex display tex="a\cdot\tfrac12\left(\tfrac12-1\right) = 1" />,
    reason: <>Since <Katex tex="\left(\tfrac{1}{\sqrt2}\right)^2=\tfrac12" />, both brackets are simple fractions.</>,
  },
  {
    working: <Katex display tex="-\tfrac{a}{4} = 1 \;\implies\; a=-4" />,
    reason: (
      <>
        This is the dilation factor the report says many students overlooked. Its sign is a
        built-in check: a negative leading coefficient means both ends of a quartic fall, exactly
        as in the diagram.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{f(x) = -4x^2(x^2-1)}" />,
    reason: (
      <>
        Check with the other marked point:{' '}
        <Katex tex="f\left(-\tfrac{1}{\sqrt2}\right)=-4\left(\tfrac12\right)\left(-\tfrac12\right)=1" /> ✓.
        The expanded form <Katex tex="f(x)=-4x^4+4x^2" /> is equally correct.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="g(x)>0 \ \text{ and } \ x^3+x^2>0" />,
    reason: (
      <>
        A logarithm only accepts positive inputs, and <Katex tex="h" /> is a difference of two
        logs, so <Katex tex="h(x)" /> has a value only where <em>both</em> logs do. The maximal
        domain is every <Katex tex="x" /> that makes the rule work, so both conditions must hold
        at the same <Katex tex="x" />.
      </>
    ),
  },
  {
    working: <Katex display tex="-4x^2(x^2-1)>0 \iff x^2(x^2-1)<0" />,
    reason: <>Dividing by <Katex tex="-4" /> flips the inequality.</>,
  },
  {
    working: <Katex display tex="\iff x\ne0 \text{ and } -1<x<1" />,
    reason: (
      <>
        <Katex tex="x^2" /> is never negative, so the product is negative exactly when{' '}
        <Katex tex="x^2>0" /> (that is, <Katex tex="x\ne0" />) and <Katex tex="x^2-1<0" />. Check it
        on the graph in part a: <Katex tex="f" /> is above the axis between the crossings
        at <Katex tex="\pm1" />, except at the origin, where it only touches — there{' '}
        <Katex tex="g(0)=0" /> and <Katex tex="\log_e 0" /> is undefined.
      </>
    ),
  },
  {
    working: <Katex display tex="x^3+x^2>0 \iff x^2(x+1)>0" />,
    reason: <>Now the second log. Factorise so each factor's sign is easy to read.</>,
  },
  {
    working: <Katex display tex="\iff x\ne0 \text{ and } x>-1" />,
    reason: (
      <>
        Same trick: <Katex tex="x^2\ge0" />, so the sign is decided by <Katex tex="x+1" />, except
        at <Katex tex="x=0" /> where the whole product is <Katex tex="0" />, which is not positive.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{D = (-1,1)\setminus\{0\}}" />,
    reason: (
      <>
        Both conditions at once: <Katex tex="x>-1" /> (from the cubic), <Katex tex="x<1" /> (from{' '}
        <Katex tex="g" />) and <Katex tex="x\ne0" /> (from both). The report gives this form or{' '}
        <Katex tex="(-1,0)\cup(0,1)" />, which is the same set; plain <Katex tex="(-1,1)" /> would
        wrongly include <Katex tex="0" />.
      </>
    ),
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="h(x) = \log_e\!\left(\dfrac{g(x)}{x^3+x^2}\right)" />,
    reason: (
      <>
        The rule is messy as given, so combine it with{' '}
        <Katex tex="\log_e A-\log_e B=\log_e\!\left(\tfrac{A}{B}\right)" />. How would I know to? The
        two arguments share the factor <Katex tex="x^2" />, a strong hint that something cancels.
        The law is valid here because <Katex tex="A" /> and <Katex tex="B" /> are both positive
        on <Katex tex="D" />.
      </>
    ),
  },
  {
    working: <Katex display tex="= \log_e\!\left(\dfrac{-4x^2(x-1)(x+1)}{x^2(x+1)}\right)" />,
    reason: <>Factorise fully so the common factors are visible.</>,
  },
  {
    working: <Katex display tex="= \log_e\bigl(-4(x-1)\bigr) = \log_e\bigl(4(1-x)\bigr)" />,
    reason: (
      <>
        Cancel <Katex tex="x^2" /> and <Katex tex="x+1" />, allowed because <Katex tex="x\ne0" /> and{' '}
        <Katex tex="x\ne-1" /> on <Katex tex="D" />. The simpler rule describes <Katex tex="h" /> only
        on <Katex tex="D" />: simplifying never changes the domain. The report notes only a few
        students used log laws, and this is the step that makes the range easy.
      </>
    ),
  },
  {
    working: <Katex display tex="h \text{ is strictly decreasing on } D" />,
    reason: (
      <>
        As <Katex tex="x" /> increases, <Katex tex="4(1-x)" /> decreases, and <Katex tex="\log_e" /> is
        an increasing function, so <Katex tex="h" /> decreases. So <Katex tex="h" /> is one-to-one:
        its range runs between its values at the two ends of <Katex tex="D" />, and removing the
        single point <Katex tex="x=0" /> removes exactly the single value <Katex tex="h(0)" /> — not a
        whole interval.
      </>
    ),
  },
  {
    working: <Katex display tex="x\to-1^+:\ \ h(x)\to\log_e 8" />,
    reason: (
      <>
        Left end: <Katex tex="4(1-(-1))=8" />. The end is open (<Katex tex="-1\notin D" />), so{' '}
        <Katex tex="\log_e 8" /> is approached but never reached — a round bracket.
      </>
    ),
  },
  {
    working: <Katex display tex="x\to1^-:\ \ h(x)\to-\infty" />,
    reason: (
      <>
        Right end: <Katex tex="4(1-x)\to0^+" />, and the log of a tiny positive number is a large
        negative number. The graph has the vertical asymptote <Katex tex="x=1" />.
      </>
    ),
  },
  {
    working: <Katex display tex="0\notin D \implies \log_e 4 \notin \text{range}" />,
    reason: (
      <>
        The simplified rule gives <Katex tex="\log_e(4(1-0))=\log_e 4" /> at <Katex tex="x=0" />, but{' '}
        <Katex tex="x=0" /> is not in <Katex tex="D" />, so <Katex tex="h" /> never takes that value,
        and being one-to-one, no other <Katex tex="x" /> gives it either. The graph of{' '}
        <Katex tex="h" /> is the curve <Katex tex="y=\log_e(4(1-x))" /> with a hole at{' '}
        <Katex tex="(0,\log_e 4)" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\text{Range} = \left(-\infty,\ \log_e 8\right)\setminus\left\{\log_e 4\right\}}" />,
    reason: <>Equivalently <Katex tex="\left(-\infty,\log_e 4\right)\cup\left(\log_e 4,\log_e 8\right)" />; the report gives both forms.</>,
  },
]

export default function MethodsQ8_2019Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 8 (4 marks)</p>
        <p className="mb-2">
          The function <Katex tex="f:R\to R" />, <Katex tex="f(x)" /> is a
          polynomial function of degree 4. Part of the graph of <Katex tex="f" /> is shown
          below. The graph of <Katex tex="f" /> touches the <Katex tex="x" />-axis at the
          origin.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async"
            src={diagramSrc}
            alt="Degree-4 polynomial touching the x-axis at the origin, crossing at (-1,0) and (1,0), with local maxima marked at (-1/√2,1) and (1/√2,1), from the original 2019 VCAA exam paper"
            className="w-full max-w-[420px]"
          />
        </div>
      </div>

      <PartCard letter="a" topic="Rule from Graph" marks={1} statement={<>Find the rule of <Katex tex="f" />.</>} examinerReport={EXAM_A}>
        <Background title="Reading a polynomial's rule from its graph">
          <p>
            Each <Katex tex="x" />-intercept <Katex tex="x=r" /> gives a factor <Katex tex="(x-r)" />,
            and the way the graph meets the axis tells you its power: crossing straight
            through gives <Katex tex="(x-r)" />, touching and turning back gives{' '}
            <Katex tex="(x-r)^2" />, and flattening out as it crosses (a stationary point of
            inflection) gives <Katex tex="(x-r)^3" />.
          </p>
          <p>
            The factors fix <em>where</em> the graph meets the axis, not <em>how tall</em> it is:
            every <Katex tex="y=a\times(\text{factors})" /> has the same intercepts. So there is
            always a constant <Katex tex="a" /> to find (a dilation from the <Katex tex="x" />-axis,
            plus a reflection if <Katex tex="a<0" />), and you find it from a point on the graph
            that is not an intercept.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <Explore title="The intercepts fix the factors — only the marked peak fixes a">
          <DilationWidget />
        </Explore>
        <WrongMethod
          title="The roots are 0, 0, −1 and 1, so f(x) = x²(x + 1)(x − 1)"
          source="Examiner's report"
          working={<Katex display tex="\begin{aligned} f(x) &= x^2(x^2-1)\\ f\left(\tfrac{1}{\sqrt2}\right) &= \tfrac12\left(-\tfrac12\right) = -\tfrac14 \ne 1 \end{aligned}" />}
        >
          This has the right intercepts, but it opens upward, with dips of depth{' '}
          <Katex tex="\tfrac14" /> where the diagram has peaks of height <Katex tex="1" />. Any
          constant multiple of <Katex tex="x^2(x+1)(x-1)" /> has the same intercepts, so the factors
          alone never finish the job. Catch it by substituting the marked point into your answer:
          if it doesn&apos;t give <Katex tex="1" />, you are missing <Katex tex="a" />.
        </WrongMethod>
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p>
          Let <Katex tex="g" /> be a function with the same rule as <Katex tex="f" />.
          <br />
          Let <Katex tex="h:D\to R,\ h(x)=\log_e(g(x)) - \log_e(x^3+x^2)" />, where{' '}
          <Katex tex="D" /> is the maximal domain of <Katex tex="h" />.
        </p>
      </div>

      <PartCard letter="b" topic="Maximal Domain" marks={1} statement={<>State <Katex tex="D" />.</>} examinerReport={EXAM_B}>
        <Background title="The maximal domain of a sum or difference">
          <p>
            The maximal (implied) domain is the largest set of <Katex tex="x" />-values for which
            the rule gives a real number. For <Katex tex="\log_e(u)" /> that means{' '}
            <Katex tex="u>0" />, strictly: <Katex tex="\log_e 0" /> is undefined.
          </p>
          <p>
            When a rule is a sum or difference of two functions, it only has a value where both
            parts do, so its domain is the intersection of theirs:{' '}
            <Katex tex="\operatorname{dom}(f\pm g)=\operatorname{dom}f\cap\operatorname{dom}g" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Explore title="h exists only where both log inputs are above the axis">
          <DomainWidget />
        </Explore>
        <WrongMethod
          title={<>Simplify with log laws first to <Katex tex="\log_e(4(1-x))" />, then find where that works</>}
          working={<Katex display tex="4(1-x)>0 \iff x<1 \implies D=(-\infty,1)" />}
        >
          Log laws only hold where each log already exists. At <Katex tex="x=-2" />,{' '}
          <Katex tex="4(1-(-2))=12" /> is positive, but <Katex tex="g(-2)=-48" />, so{' '}
          <Katex tex="\log_e(g(-2))" /> has no value; at <Katex tex="x=0" /> both original logs
          are <Katex tex="\log_e 0" />. Always find the domain from the rule as given, then
          simplify on that domain.
        </WrongMethod>
      </PartCard>

      <PartCard letter="c" topic="Range" marks={2} statement={<>State the range of <Katex tex="h" />.</>} examinerReport={EXAM_C}>
        <Background title="The range of a one-to-one function">
          <p>
            If a function is strictly increasing or strictly decreasing on its domain, you don&apos;t
            need to sketch the original rule: the range runs between its values at the two ends of
            the domain. Use a round bracket for an end that isn&apos;t included, and{' '}
            <Katex tex="\pm\infty" /> for an asymptote.
          </p>
          <p>
            Because each output comes from exactly one input, every point punched out of the
            domain punches exactly one value out of the range.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <Explore title="The hole at x = 0 becomes a hole in the range">
          <RangeWidget />
        </Explore>
        <WrongMethod
          title={<>The curve runs from <Katex tex="\log_e 8" /> down to <Katex tex="-\infty" />, so the range is <Katex tex="(-\infty,\ \log_e 8)" /></>}
          working={<Katex display tex="\text{Range} = \left(-\infty,\ \log_e 8\right)" />}
        >
          This forgets that <Katex tex="x=0" /> is not in <Katex tex="D" />. The curve{' '}
          <Katex tex="y=\log_e(4(1-x))" /> passes through <Katex tex="(0,\log_e 4)" />, but{' '}
          <Katex tex="h" /> has a hole there, because at <Katex tex="x=0" /> both original logs
          are <Katex tex="\log_e 0" />. Since <Katex tex="h" /> is one-to-one, nothing else fills
          the gap. Whenever a point is removed from a domain, ask what output it would have given.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
