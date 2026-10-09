// 2019 Mathematical Methods — Exam 1, Question 9 (9 marks).
// f(x)=3+2x-x² and g(x)=eˣ — composite rules and their calculus (parts a-c), solving
// f(g(x))=0 and finding its stationary point (parts d-e), then the number of solutions to
// g(f(x))+f(g(x))=0 (part f). Question text transcribed from the original paper (no diagram
// given). Cross-checked against the VCAA examination report and itute's independent
// solutions — both agree with every answer below (all re-derived with sympy; part f's single
// root is x ≈ 1.866). Part f. argues itute's way: the sum is positive for x ≤ logₑ3, then
// strictly decreasing from positive to −∞. Note: the report's printed 9b working has two typos
// (exponent 3+2x+x², and "h'(x) > 0 when (2 − 2x) > 0") though its final answer x > 1 is right;
// our working uses the correct forms. Solution is original.
// Widgets: part b. — the bell g(f(x)) and the parabola f turning together at x = 1, with a
// "drop the brackets" toggle (meth-2019e1-q9b-sign); part d. (and e.) — f(g(x)) as the parabola
// f(u) travelled along u = eˣ > 0 (meth-2019e1-q9d-parabola); part f. — addition of ordinates
// with stacked arrows, and the equivalent g(f(x)) = −f(g(x)) picture (meth-2019e1-q9f-ordinates).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const SignWidget = lazyWidget(() => import('../interactives/meth-2019e1-q9b-sign'))
const ParabolaWidget = lazyWidget(() => import('../interactives/meth-2019e1-q9d-parabola'))
const OrdinatesWidget = lazyWidget(() => import('../interactives/meth-2019e1-q9f-ordinates'))

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
      Students generally applied the chain rule to find the derivative; however, poor
      expression resulted in incorrect answers. The expression{' '}
      <Katex tex="(2-2x)e^{3+2x-x^2}" /> is <b>not</b> equivalent to{' '}
      <Katex tex="2-2xe^{3+2x-x^2}" />. Some students did find the correct answer; however, it
      was not supported by correct reasoning.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [14, 86],
  average: 0.9,
  comment: <>This question was done well. Some students incorrectly stated <Katex tex="f(g(x))=3+2e^x-e^{x^2}" />.</>,
}

const EXAM_D: SAExaminerStats = {
  marks: [34, 19, 48],
  average: 1.2,
  comment: (
    <>
      Most students were able to form a quadratic equation. Some faltered with the correct
      factorisation. The inclusion of <Katex tex="x=\log_e(-1)" /> was a common error.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [42, 28, 30],
  average: 0.9,
  comment: <>This question was well attempted but not so well done. Common errors included an incorrect derivative and omitting the <Katex tex="y" />-coordinate of the stationary point.</>,
}

const EXAM_F: SAExaminerStats = {
  marks: [81, 19],
  average: 0.2,
  comment: <>This question was not well done. Few students attempted to draw a rough sketch of each equation and use addition of ordinates.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="g(f(x)) = e^{f(x)}" />,
    reason: (
      <>
        Read <Katex tex="g(f(x))" /> from the inside out: <Katex tex="f" /> acts first, then <Katex tex="g" /> acts on
        the result. <Katex tex="g" /> makes whatever it is given the power of <Katex tex="e" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{g(f(x)) = e^{3+2x-x^2}}" />,
    reason: (
      <>
        Substitute the rule for <Katex tex="f(x)" /> into the index. No domain issue: <Katex tex="g" /> accepts every
        real number, so the composite exists for all <Katex tex="x" />.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\dfrac{d}{dx}\,g(f(x)) = f'(x)\,e^{f(x)}" />,
    reason: (
      <>
        Chain rule for <Katex tex="e^{(\text{inside})}" />: the derivative is (derivative of the inside){' '}
        <Katex tex="\times\ e^{(\text{inside})}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="= (2-2x)e^{3+2x-x^2}" />,
    reason: (
      <>
        <Katex tex="f'(x)=2-2x" />, and the <b>whole</b> of it multiplies the exponential, so it goes in brackets. The
        report stresses that <Katex tex="2-2xe^{3+2x-x^2}" /> is a different expression.
      </>
    ),
  },
  {
    working: <Katex display tex="e^{3+2x-x^2}>0 \text{ for all } x" />,
    reason: (
      <>
        This is the reasoning the report says was often missing. Every power of <Katex tex="e" /> is positive, and
        multiplying by a positive number never changes a sign, so the derivative has the same sign as{' '}
        <Katex tex="2-2x" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\therefore\ \dfrac{d}{dx}\,g(f(x))<0 \iff 2-2x<0" />,
    reason: <>Only the linear factor can make the product negative.</>,
  },
  {
    working: <Katex display tex="-2x<-2 \implies x>1" />,
    reason: (
      <>
        Dividing by <Katex tex="-2" /> flips the inequality. Check: at <Katex tex="x=2" /> the derivative is{' '}
        <Katex tex="(2-4)e^{3}<0" />, and at <Katex tex="x=0" /> it is <Katex tex="2e^{3}>0" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{x>1}" />,
    reason: (
      <>
        Equivalently <Katex tex="x\in(1,\infty)" />. The bell-shaped graph of <Katex tex="g(f(x))" /> goes downhill
        right of <Katex tex="x=1" />, exactly where the parabola <Katex tex="f" /> turns over.
      </>
    ),
    more: (
      <>
        Drag <Katex tex="x" /> in the widget below to see both turn together.
      </>
    ),
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="f(g(x)) = 3+2g(x)-\bigl(g(x)\bigr)^2" />,
    reason: (
      <>
        Now <Katex tex="g" /> acts first: replace <b>every</b> <Katex tex="x" /> in the rule for <Katex tex="f" /> by{' '}
        <Katex tex="g(x)" />, including the one being squared.
      </>
    ),
  },
  {
    working: <Katex display tex="= 3+2e^x-(e^x)^2" />,
    reason: <>Substitute <Katex tex="g(x)=e^x" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f(g(x)) = 3+2e^x-e^{2x}}" />,
    reason: (
      <>
        Index law <Katex tex="(a^m)^n=a^{mn}" />: <Katex tex="(e^x)^2=e^{2x}" />. Writing it this way makes the
        quadratic in part d. easy to spot.
      </>
    ),
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="3+2e^x-e^{2x}=0" />,
    reason: (
      <>
        Set part c.&apos;s rule equal to <Katex tex="0" />. Seeing <Katex tex="e^x" /> next to{' '}
        <Katex tex="e^{2x}=(e^x)^2" /> is the signal: this is a quadratic in <Katex tex="e^x" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{Let } u=e^x:\quad 3+2u-u^2=0" />,
    reason: (
      <>
        With <Katex tex="u=e^x" />, <Katex tex="e^{2x}=u^2" />. The left side is exactly <Katex tex="f(u)" />:{' '}
        <Katex tex="f(g(x))" /> is the parabola <Katex tex="f" /> read off at <Katex tex="u=e^x" />.
      </>
    ),
    more: <>See the widget below.</>,
  },
  {
    working: <Katex display tex="u^2-2u-3=0" />,
    reason: <>Multiply by <Katex tex="-1" /> so the <Katex tex="u^2" /> term is positive, which is easier to factorise.</>,
  },
  {
    working: <Katex display tex="(u-3)(u+1)=0 \implies u=3 \text{ or } u=-1" />,
    reason: (
      <>
        Two numbers with product <Katex tex="-3" /> and sum <Katex tex="-2" />. Check by expanding:{' '}
        <Katex tex="(u-3)(u+1)=u^2-2u-3" />. These are the parabola&apos;s two <Katex tex="u" />-intercepts.
      </>
    ),
  },
  {
    working: <Katex display tex="e^x=3 \text{ or } e^x=-1" />,
    reason: <>Undo the substitution before writing any <Katex tex="x" />-values.</>,
  },
  {
    working: <Katex display tex="e^x>0, \text{ so } e^x=-1 \text{ has no solution}" />,
    reason: (
      <>
        The graph of <Katex tex="y=e^x" /> lies entirely above the <Katex tex="x" />-axis, so it never reaches{' '}
        <Katex tex="-1" />. The report says including <Katex tex="x=\log_e(-1)" /> was a common error.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{x=\log_e(3)}" />,
    reason: <>Take <Katex tex="\log_e" /> of both sides of <Katex tex="e^x=3" />. This is the only solution.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="\dfrac{d}{dx}f(g(x)) = 2e^x-2e^{2x}" />,
    reason: (
      <>
        Differentiate part c.&apos;s rule term by term. The report lists an incorrect derivative as a common error, so
        check the last term: by the chain rule, <Katex tex="\tfrac{d}{dx}e^{2x}=2e^{2x}" />. (The chain rule on the
        composite gives the same thing: <Katex tex="f'(g(x))\,g'(x)=(2-2e^x)e^x" />.)
      </>
    ),
  },
  {
    working: <Katex display tex="= 2e^x(1-e^x)" />,
    reason: <>Take out the common factor <Katex tex="2e^x" /> so each factor can be set to zero separately.</>,
  },
  {
    working: <Katex display tex="2e^x(1-e^x)=0 \implies e^x=1" />,
    reason: (
      <>
        A stationary point is where the derivative is <Katex tex="0" />. The factor <Katex tex="2e^x" /> is never{' '}
        <Katex tex="0" />, so it must be <Katex tex="1-e^x=0" />.
      </>
    ),
  },
  {
    working: <Katex display tex="x=\log_e(1)=0" />,
    reason: <>Because <Katex tex="e^0=1" />.</>,
  },
  {
    working: <Katex display tex="f(g(0)) = 3+2e^0-e^{0} = 3+2-1 = 4" />,
    reason: (
      <>
        The question asks for <b>coordinates</b>, so substitute <Katex tex="x=0" /> into <Katex tex="f(g(x))" /> (not
        into the derivative) for the <Katex tex="y" />-value. The report says omitting it was a common error.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{(0,\,4)}" />,
    reason: (
      <>
        This is the parabola&apos;s vertex carried across: <Katex tex="x=0" /> gives <Katex tex="u=e^0=1" />, and{' '}
        <Katex tex="f(1)=4" />. The derivative is positive for <Katex tex="x<0" /> and negative for{' '}
        <Katex tex="x>0" />, so it is a maximum, which part f. uses.
      </>
    ),
    more: (
      <>
        Slide <Katex tex="x" /> to <Katex tex="0" /> in part d.&apos;s widget to see it.
      </>
    ),
  },
]

const ROWS_F: WorkingRow[] = [
  {
    working: <Katex display tex="g(f(x)) = e^{3+2x-x^2} > 0 \text{ for all } x" />,
    reason: (
      <>
        Start from what each piece does. An exponential is always positive, so the sum can only be <Katex tex="0" />{' '}
        where <Katex tex="f(g(x))" /> is negative enough to cancel it.
      </>
    ),
  },
  {
    working: <Katex display tex="f(g(x)) = (3-e^x)(1+e^x)" />,
    reason: (
      <>
        Part d.&apos;s factorisation. <Katex tex="1+e^x>0" />, so <Katex tex="f(g(x))" /> has the sign of{' '}
        <Katex tex="3-e^x" />.
      </>
    ),
  },
  {
    working: <Katex display tex="f(g(x))\ge0 \iff e^x\le3 \iff x\le\log_e(3)" />,
    reason: <>So <Katex tex="f(g(x))" /> is only negative to the right of its <Katex tex="x" />-intercept from part d.</>,
  },
  {
    working: <Katex display tex="x\le\log_e(3):\ \ g(f(x))+f(g(x))>0" />,
    reason: <>Positive plus non-negative is positive: no solutions on this side.</>,
  },
  {
    working: <Katex display tex="x>\log_e(3) \implies x>1 \text{ and } x>0" />,
    reason: <>Because <Katex tex="\log_e(3)\approx1.10" />. This lets us use parts b. and e.</>,
  },
  {
    working: <Katex display tex="\implies g(f(x))+f(g(x)) \text{ strictly decreasing}" />,
    reason: (
      <>
        Part b.: <Katex tex="g(f(x))" /> is decreasing for <Katex tex="x>1" />. Part e.: the derivative of{' '}
        <Katex tex="f(g(x))" />, <Katex tex="2e^x(1-e^x)" />, is negative for <Katex tex="x>0" />. A sum of two
        decreasing functions is decreasing, so it can cross <Katex tex="0" /> at most once.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="x=\log_e(3):\ \ \text{sum} = g(f(x))+0>0" />
        <Katex display tex="x\to\infty:\ \ g(f(x))\to0,\ \ f(g(x))\to-\infty" />
      </>
    ),
    reason: (
      <>
        The sum starts positive at <Katex tex="\log_e(3)" /> and ends as negative as you like. It is continuous and
        strictly decreasing, so it passes through <Katex tex="0" /> exactly once (at <Katex tex="x\approx1.87" />,
        though the question doesn&apos;t ask for it).
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\text{One solution}}" />,
    reason: (
      <>
        This is the report&apos;s rough sketch with addition of ordinates, argued precisely. For a 1-mark question the
        sketch is enough.
      </>
    ),
    more: (
      <>
        Sweep <Katex tex="x" /> in the widget below to watch the two ordinates cancel exactly once.
      </>
    ),
  },
]

export default function MethodsQ9_2019Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 9 (9 marks)</p>
        <p>
          Consider the functions <Katex tex="f:R\to R,\ f(x)=3+2x-x^2" /> and{' '}
          <Katex tex="g:R\to R,\ g(x)=e^x" />.
        </p>
      </div>

      <PartCard letter="a" topic="Composite Function" marks={1} statement={<>State the rule of <Katex tex="g(f(x))" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" topic="Decreasing Derivative" marks={2} statement={<>Find the values of <Katex tex="x" /> for which the derivative of <Katex tex="g(f(x))" /> is negative.</>} examinerReport={EXAM_B}>
        <Background title="Why g(f(x)) rises and falls with f(x)">
          <p>
            <Katex tex="e^u" /> is an increasing function: a bigger <Katex tex="u" /> always gives a bigger{' '}
            <Katex tex="e^u" />. So <Katex tex="g(f(x))=e^{f(x)}" /> goes up exactly where <Katex tex="f(x)" /> goes up,
            and down exactly where <Katex tex="f(x)" /> goes down. Here <Katex tex="f" /> is an upside-down parabola with
            its vertex at <Katex tex="x=1" />, so you can predict the answer before differentiating. The chain rule
            makes it precise: the derivative is <Katex tex="f'(x)" /> times <Katex tex="e^{f(x)}" />, and that second
            factor is always positive.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Explore title="Why only (2 − 2x) decides the sign">
          <SignWidget />
        </Explore>
        <WrongMethod
          title="The derivative is 2 − 2x·e^(3+2x−x²)"
          source="Examiner's report"
          working={<Katex display tex="\dfrac{d}{dx}\,g(f(x)) = 2-2xe^{3+2x-x^2}" />}
        >
          Without brackets only the <Katex tex="2x" /> is multiplied by the exponential, so this isn&apos;t the
          derivative at all. Test it at <Katex tex="x=0.5" />, where the graph is clearly rising: it gives{' '}
          <Katex tex="2-e^{3.75}\approx-40.5" />, but the true derivative is <Katex tex="e^{3.75}\approx42.5" />. The
          chain rule multiplies the <b>whole</b> of <Katex tex="f'(x)" /> by <Katex tex="e^{f(x)}" />, so the bracket
          must go around <Katex tex="2-2x" />. (Turn on &ldquo;Drop the brackets&rdquo; in the widget.)
        </WrongMethod>
      </PartCard>

      <PartCard letter="c" topic="Composite Function" marks={1} statement={<>State the rule of <Katex tex="f(g(x))" />.</>} examinerReport={EXAM_C}>
        <WorkingTable rows={ROWS_C} />
        <WrongMethod
          title="(eˣ)² is the same as e^(x²)"
          source="Examiner's report"
          working={<Katex display tex="f(g(x))=3+2e^x-e^{x^2}" />}
        >
          <Katex tex="(e^x)^2" /> means <Katex tex="e^x\times e^x=e^{x+x}=e^{2x}" />: squaring the whole power doubles
          the index. <Katex tex="e^{x^2}" /> squares the index instead. Catch it by testing <Katex tex="x=1" />:{' '}
          <Katex tex="(e^1)^2=e^2\approx7.39" />, but <Katex tex="e^{1^2}=e\approx2.72" />.
        </WrongMethod>
      </PartCard>

      <PartCard letter="d" topic="Exponential Equation" marks={2} statement={<>Solve <Katex tex="f(g(x))=0" />.</>} examinerReport={EXAM_D}>
        <WorkingTable rows={ROWS_D} />
        <Explore title="f(g(x)) is the parabola f(u), travelled along u = eˣ">
          <ParabolaWidget />
        </Explore>
        <WrongMethod
          title="eˣ = −1, so x = logₑ(−1) is a second answer"
          source="Examiner's report"
          working={<Katex display tex="x=\log_e(3) \text{ or } x=\log_e(-1)" />}
        >
          <Katex tex="\log_e(a)" /> is the power of <Katex tex="e" /> that gives <Katex tex="a" />, and every power of{' '}
          <Katex tex="e" /> is positive, so <Katex tex="\log_e" /> is only defined for <Katex tex="a>0" />;{' '}
          <Katex tex="\log_e(-1)" /> isn&apos;t a real number. After a substitution <Katex tex="u=e^x" />, check each{' '}
          <Katex tex="u" />-value against <Katex tex="u>0" /> before converting back. In the widget, the root{' '}
          <Katex tex="u=-1" /> sits in the grey zone that <Katex tex="e^x" /> never reaches.
        </WrongMethod>
      </PartCard>

      <PartCard letter="e" topic="Stationary Point" marks={2} statement={<>Find the coordinates of the stationary point of the graph of <Katex tex="f(g(x))" />.</>} examinerReport={EXAM_E}>
        <WorkingTable rows={ROWS_E} />
        <WrongMethod
          title="The stationary point is x = 0"
          source="Examiner's report"
          working={<Katex display tex="2e^x(1-e^x)=0 \implies x=0" />}
        >
          That is only half the point. &ldquo;Coordinates&rdquo; means both <Katex tex="x" /> and <Katex tex="y" />, so
          finish by substituting <Katex tex="x=0" /> into <Katex tex="f(g(x))" /> to get <Katex tex="y=4" />. Substituting
          into the derivative instead just gives <Katex tex="0" />, which is how the point was found, not its height.
        </WrongMethod>
      </PartCard>

      <PartCard letter="f" topic="Number of Solutions" marks={1} statement={<>State the number of solutions to <Katex tex="g(f(x)) + f(g(x)) = 0" />.</>} examinerReport={EXAM_F}>
        <Background title="Addition of ordinates">
          <p>
            An ordinate is a <Katex tex="y" />-value. The graph of <Katex tex="y=p(x)+q(x)" /> is built by adding the
            heights of the two graphs at each <Katex tex="x" />. So <Katex tex="p(x)+q(x)=0" /> wherever one graph is
            exactly as far below the axis as the other is above it. If one of them is always positive, a solution can
            only happen where the other is negative.
          </p>
          <p>
            An equivalent picture: rearrange to <Katex tex="p(x)=-q(x)" /> and count where the graph of{' '}
            <Katex tex="p" /> meets the reflection of <Katex tex="q" /> in the <Katex tex="x" />-axis. Parts b. to e.
            give you everything you need to sketch both graphs here.
          </p>
        </Background>
        <WorkingTable rows={ROWS_F} />
        <Explore title="Adding ordinates: why the sum crosses zero exactly once">
          <OrdinatesWidget />
        </Explore>
        <WrongMethod
          title="g(f(x)) is always positive, so the sum is never 0: no solutions"
          working={<Katex display tex="g(f(x))>0 \implies g(f(x))+f(g(x))\ne0" />}
        >
          The first half is right, but the sum has a second term. <Katex tex="f(g(x))" /> is negative for{' '}
          <Katex tex="x>\log_e(3)" /> and heads to <Katex tex="-\infty" /> (the <Katex tex="-e^{2x}" /> term wins), while{' '}
          <Katex tex="g(f(x))" /> shrinks towards <Katex tex="0" />. So somewhere the negative term exactly cancels the
          positive one. Before concluding &ldquo;no solutions&rdquo;, check how far the other term can go.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
