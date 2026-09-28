// 2019 Mathematical Methods — Exam 1, Question 1 (4 marks).
// f(x) = 1/(3x-1) on (1/3,∞) — differentiate and antidifferentiate (part a); g(x) =
// sin(πx)/(x+1) — evaluate g'(1) via the quotient rule (part b). Question text transcribed
// from the original paper (no diagram given — purely algebraic). Cross-checked against the
// VCAA examination report and itute's independent solutions — both agree with the
// derivation below (the report also accepts ⅓logₑ(x − ⅓) in a.ii; it differs from ⅓logₑ(3x − 1)
// by a constant). Solution is original; all answers re-derived with sympy.
// Widgets: a.i meth-2019e1-q1ai-tangent (sliding tangent, with the "forget the ×3" line);
// a.ii meth-2019e1-q1aii-check (differentiate each candidate antiderivative back and compare with
// f); b meth-2019e1-q1b-tangent (g′(1) as the gradient at x = 1, the numerator's tangent, and the
// cos π = 1 slip). WrongMethod boxes: a.ii missing ⅓; b cos π = 1 and missing brackets.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const TangentAI = lazyWidget(() => import('../interactives/meth-2019e1-q1ai-tangent'))
const CheckAII = lazyWidget(() => import('../interactives/meth-2019e1-q1aii-check'))
const TangentB = lazyWidget(() => import('../interactives/meth-2019e1-q1b-tangent'))

const EXAM_AI: SAExaminerStats = {
  marks: [33, 67],
  average: 0.7,
  comment: <>The majority of students correctly applied the chain rule. Errors were generally arithmetic in nature or with the negative exponent.</>,
}

const EXAM_AII: SAExaminerStats = {
  marks: [50, 50],
  average: 0.5,
  comment: (
    <>
      There were various ways of expressing the anti-derivative, with the above being the
      most common. The most common error was placing a constant of 3 or 1 (rather than{' '}
      <Katex tex="\left(\tfrac13\right)" />) in front of the log expression. Students should
      note that they could easily verify their answer by using the chain rule to differentiate
      their answer, and checking whether or not this derivative was in fact the rule for{' '}
      <Katex tex="f" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [12, 39, 50],
  average: 1.4,
  comment: (
    <>
      Though generally well handled, poor placement of, or lack of, brackets when using
      quotient rule (or the combination of product and chain rules) led to errors in
      evaluation. Other errors included the misconception that <Katex tex="\cos(\pi)=1" /> or
      misquoting the relevant differentiation rule (which is listed on the formula sheet).
      <br />
      Some students did not answer the question in its entirety (i.e. completely forgetting to
      evaluate <Katex tex="g'(1)" />).
    </>
  ),
}


const ROWS_AI: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = (3x-1)^{-1}" />,
    reason: (
      <>
        One over something is that something to the power <Katex tex="-1" />. Rewriting the fraction as a
        bracket to a power lets the chain rule do it in one line, with no quotient rule needed.
      </>
    ),
  },
  {
    working: <Katex display tex="f'(x) = -1\times(3x-1)^{-2}\times 3" />,
    reason: (
      <>
        Chain rule with <Katex tex="u = 3x-1" />. First differentiate the outside power as if the bracket
        were a single letter: bring down the <Katex tex="-1" />, and the power drops by one to{' '}
        <Katex tex="-1-1=-2" /> (not <Katex tex="0" />; the report notes slips with the negative
        exponent). Then multiply by the inside&apos;s derivative, <Katex tex="\tfrac{du}{dx}=3" />. How would I
        know to? Whenever the inside is anything other than plain <Katex tex="x" />, its derivative goes on
        the end. The formula sheet&apos;s <Katex tex="\tfrac{d}{dx}(ax+b)^n = an(ax+b)^{n-1}" />, with{' '}
        <Katex tex="a=3,\ n=-1" />, says the same thing.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{f'(x) = \dfrac{-3}{(3x-1)^2}}" />,
    reason: (
      <>
        Move the negative power back to the denominator. Sense-check the sign: <Katex tex="f" /> falls all
        the way from its asymptote <Katex tex="x=\tfrac13" /> towards <Katex tex="0" />, so{' '}
        <Katex tex="f'(x)" /> should be negative for every <Katex tex="x>\tfrac13" />, and it is (a square is
        never negative).
      </>
    ),
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="\int \frac{1}{3x-1}\,dx = \tfrac13\log_e(3x-1) + c" />,
    reason: (
      <>
        The formula sheet only gives <Katex tex="\int\tfrac1x\,dx=\log_e(x)+c" /> for plain{' '}
        <Katex tex="x" />. With <Katex tex="3x-1" /> inside, guess <Katex tex="\log_e(3x-1)" /> and
        differentiate it: the chain rule gives <Katex tex="\tfrac{3}{3x-1}" />, three times too big. So divide
        by the inside&apos;s coefficient and put <Katex tex="\tfrac13" /> in front. The domain is{' '}
        <Katex tex="x>\tfrac13" />, so <Katex tex="3x-1>0" /> always and no absolute value is needed.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\tfrac13\log_e(3x-1)}" />,
    reason: (
      <>
        Any antiderivative will do, so take <Katex tex="c=0" />. Check by differentiating, as the report
        suggests: <Katex tex="\tfrac13\times\tfrac{3}{3x-1}=\tfrac{1}{3x-1}" /> ✓. The report also accepts{' '}
        <Katex tex="\tfrac13\log_e\!\left(x-\tfrac13\right)" />, which is this answer minus the constant{' '}
        <Katex tex="\tfrac13\log_e 3" />.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="u = \sin(\pi x),\quad \dfrac{du}{dx} = \pi\cos(\pi x)" />
        <Katex display tex="v = x+1,\quad \dfrac{dv}{dx} = 1" />
      </>
    ),
    reason: (
      <>
        <Katex tex="g" /> is one function divided by another, so use the quotient rule from the formula
        sheet, <Katex tex="\tfrac{d}{dx}\left(\tfrac uv\right)=\tfrac{v\frac{du}{dx}-u\frac{dv}{dx}}{v^2}" />.
        Writing <Katex tex="u" />, <Katex tex="v" /> and their derivatives out first is the surest way to
        avoid the bracket errors the report mentions. <Katex tex="\tfrac{du}{dx}" /> needs the chain rule:
        the inside <Katex tex="\pi x" /> has derivative <Katex tex="\pi" />.
      </>
    ),
  },
  {
    working: <Katex display tex="g'(x) = \dfrac{(x+1)\,\pi\cos(\pi x) - \sin(\pi x)\cdot 1}{(x+1)^2}" />,
    reason: (
      <>
        Substitute in the formula&apos;s order: <Katex tex="v\tfrac{du}{dx}" /> first, minus{' '}
        <Katex tex="u\tfrac{dv}{dx}" />. The brackets around <Katex tex="x+1" /> matter, because it multiplies
        the whole of <Katex tex="\pi\cos(\pi x)" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="g'(1) = \dfrac{(2)\,\pi\cos(\pi) - \sin(\pi)\cdot 1}{2^2}" />
        <Katex display tex="= \dfrac{2\pi(-1) - 0}{4}" />
      </>
    ),
    reason: (
      <>
        Now substitute <Katex tex="x=1" />, as the question asks. Angle <Katex tex="\pi" /> is half a turn,
        the point <Katex tex="(-1,0)" /> on the unit circle, so <Katex tex="\cos(\pi)=-1" /> and{' '}
        <Katex tex="\sin(\pi)=0" /> (the report notes some students used <Katex tex="\cos(\pi)=1" />). Because{' '}
        <Katex tex="\sin(\pi)=0" />, the whole second term drops out.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{g'(1) = -\dfrac{\pi}{2}}" />,
    reason: (
      <>
        The question says <em>evaluate</em>, so finish with the number; the report notes some students
        stopped at <Katex tex="g'(x)" />. Sense check: <Katex tex="\sin(\pi x)" /> crosses zero going down at{' '}
        <Katex tex="x=1" /> and <Katex tex="x+1=2>0" />, so <Katex tex="g" /> is decreasing there and{' '}
        <Katex tex="g'(1)" /> must be negative.
      </>
    ),
  },
]

export default function MethodsQ1_2019Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (4 marks)</p>
        <p>
          Let <Katex tex="f:\left(\tfrac13,\infty\right)\to R,\ f(x)=\dfrac{1}{3x-1}" />.
        </p>
      </div>

      <PartCard letter="a.i" topic="Chain Rule" marks={1} statement={<>Find <Katex tex="f'(x)" />.</>} examinerReport={EXAM_AI}>
        <WorkingTable rows={ROWS_AI} />
        <Explore title="Where the 3 in f′(x) comes from: slide the tangent">
          <TangentAI />
        </Explore>
      </PartCard>

      <PartCard letter="a.ii" topic="Antiderivative" marks={1} statement={<>Find an antiderivative of <Katex tex="f(x)" />.</>} examinerReport={EXAM_AII}>
        <Background title="What “an antiderivative” means">
          <p>
            <Katex tex="F" /> is an antiderivative of <Katex tex="f" /> when <Katex tex="F'(x)=f(x)" />: the
            gradient of <Katex tex="F" /> at every <Katex tex="x" /> equals the height of <Katex tex="f" />.
            If <Katex tex="F" /> works, so does <Katex tex="F+c" /> for any constant <Katex tex="c" />, because
            shifting a graph up or down changes none of its gradients. There are infinitely many, and the
            question asks for <em>an</em> antiderivative, so any one of them will do.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AII} />
        <Explore title="Differentiate your answer: does it land back on f?">
          <CheckAII />
        </Explore>
        <WrongMethod
          title="∫ 1/(3x − 1) dx = logₑ(3x − 1), just like ∫ 1/x dx"
          source="Examiner's report"
          working={<Katex display tex="\int\frac{1}{3x-1}\,dx = \log_e(3x-1)" />}
        >
          Differentiate it back: the chain rule gives <Katex tex="\tfrac{3}{3x-1}" />, which is{' '}
          <Katex tex="3f(x)" />, not <Katex tex="f(x)" />. The other common answer,{' '}
          <Katex tex="3\log_e(3x-1)" />, is worse: it differentiates to <Katex tex="\tfrac{9}{3x-1}" />.
          Differentiating brings the inside&apos;s <Katex tex="3" /> out, so antidifferentiating has to divide
          by it: <Katex tex="\tfrac13" />. A ten-second derivative check catches both.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Quotient Rule"
        marks={2}
        statement={
          <>
            Let <Katex tex="g:R\setminus\{-1\}\to R,\ g(x)=\dfrac{\sin(\pi x)}{x+1}" />.
            <br />
            Evaluate <Katex tex="g'(1)" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
        <Explore title="g′(1) is the gradient where the graph crosses x = 1">
          <TangentB />
        </Explore>
        <WrongMethod
          title="cos(π) = 1"
          source="Examiner's report"
          working={<Katex display tex="g'(1) = \dfrac{2\pi(1) - 0}{4} = \dfrac{\pi}{2}" />}
        >
          Right size, wrong sign. Angle <Katex tex="\pi" /> is half a turn round the unit circle, the point{' '}
          <Katex tex="(-1,0)" />, so <Katex tex="\cos(\pi)=-1" />. A positive answer should set off an alarm:{' '}
          <Katex tex="\sin(\pi x)" /> goes from positive to negative through <Katex tex="x=1" />, so{' '}
          <Katex tex="g" /> is falling there and its gradient must be negative.
        </WrongMethod>
        <WrongMethod
          title="Leave out the brackets around x + 1"
          source="Examiner's report"
          working={
            <>
              <Katex display tex="g'(x) = \dfrac{x+1\times\pi\cos(\pi x) - \sin(\pi x)}{(x+1)^2}" />
              <Katex display tex="g'(1) = \dfrac{1+\pi(-1) - 0}{4} = \dfrac{1-\pi}{4}" />
            </>
          }
        >
          Without brackets, only the <Katex tex="1" /> is multiplied by <Katex tex="\pi\cos(\pi x)" />, not the
          whole <Katex tex="x+1" />. The rule&apos;s <Katex tex="v\tfrac{du}{dx}" /> is a product of the whole of{' '}
          <Katex tex="v" /> with the whole of <Katex tex="\tfrac{du}{dx}" />, so write{' '}
          <Katex tex="(x+1)\,\pi\cos(\pi x)" />. Listing <Katex tex="u,\ v,\ \tfrac{du}{dx},\ \tfrac{dv}{dx}" />{' '}
          first and substituting each one in brackets prevents this.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
