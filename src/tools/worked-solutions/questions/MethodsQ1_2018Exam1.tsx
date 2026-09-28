// 2018 Mathematical Methods — Exam 1, Question 1 (3 marks). A chain-rule derivative, then a
// quotient-rule derivative evaluated at x = π. Question text transcribed from the original
// paper (no diagram given). Answers checked independently with sympy and against the VCAA
// examination report (which writes 1a as 3(−9x² + 2x)(−3x³ + x² − 64)², the same product in a
// different order) and itute (which factors out −1: −3(3x³ − x² + 64)²(9x² − 2x), equivalent).
// Solution is original.
//
// Interactives: 1a — slide along y = u³ and see dy/dx = 3u² × du/dx as the tangent's slope, with
// flat spots from each factor and the examiner's bracketless version as a line that misses the
// curve (meth-2018e1-q1a-chain). 1b — the quotient rule's numerator split into the top's and the
// bottom's change; at x = π the bottom is flat, so f′(π) = −e^π, with y = −eˣ touching f there
// (meth-2018e1-q1b-quotient).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const ChainWidget = lazyWidget(() => import('../interactives/meth-2018e1-q1a-chain'))
const QuotientWidget = lazyWidget(() => import('../interactives/meth-2018e1-q1b-quotient'))

const EXAM_A: SAExaminerStats = {
  marks: [42, 58],
  average: 0.6,
  comment: (
    <>
      Students generally recognised the need to deploy the chain rule; however, a significant
      number of students could not be awarded the mark. Poor use of brackets (or lack of
      brackets) resulted in an incorrect expression. For example, the expression{' '}
      <Katex tex="3\left(-3x^3+x^2-64\right)^2\left(-9x^2+2x\right)" /> is not equivalent to{' '}
      <Katex tex="3\left(-3x^3+x^2-64\right)^2-9x^2+2x" />. Transcription errors
      (especially with exponents) and arithmetic errors with unnecessary expansions were also
      observed.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [10, 39, 51],
  average: 1.4,
  comment: (
    <>
      Students competently applied the quotient rule; however, many were unable to carry out
      the required evaluation, often omitting it completely. Students who opted to use the
      product and chain rules tended to make little progress due to confusion with negative
      signs or negative exponents. Students should take care with legibility, for example, to
      distinguishing clearly the variable <Katex tex="x" /> and the constant <Katex tex="\pi" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="y = \left(-3x^3+x^2-64\right)^3" />,
    reason: <>How would I know it's the chain rule? A whole bracket is raised to a power, and what's inside isn't just <Katex tex="x" />: that's a function inside a function. Call the inside <Katex tex="u=-3x^3+x^2-64" />, so <Katex tex="y=u^3" />.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\frac{dy}{dx} &= \frac{dy}{du}\times\frac{du}{dx}\\ &= 3\left(-3x^3+x^2-64\right)^2 \times \frac{d}{dx}\left(-3x^3+x^2-64\right)\end{aligned}"
      />
    ),
    reason: <>Differentiate the outside as if the bracket were a single letter: <Katex tex="u^3" /> becomes <Katex tex="3u^2" />, with the bracket copied exactly (power down by one, nothing inside touched). Then <em>multiply</em> by how fast the inside is changing.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = 3\left(-3x^3+x^2-64\right)^2\left(-9x^2+2x\right)}" />,
    reason: <>The inside differentiates term by term to <Katex tex="-9x^2+2x" /> (the constant <Katex tex="-64" /> disappears). It multiplies the whole of <Katex tex="3(\dots)^2" />, so it needs its own brackets: without them the expression means something else entirely, and the report names poor use of brackets as a reason a significant number of students missed this mark. Leave it factorised. Expanding isn't asked for, and the report notes arithmetic errors with unnecessary expansions.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} u &= e^x, & u' &= e^x \\ v &= \cos(x), & v' &= -\sin(x)\end{aligned}" />,
    reason: <>How would I know it's the quotient rule? <Katex tex="f" /> is one function of <Katex tex="x" /> divided by another. Name the top <Katex tex="u" /> and the bottom <Katex tex="v" />, and write all four pieces down before assembling anything. That's where the signs get sorted out.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} f'(x) &= \frac{u'v-uv'}{v^2} \\ &= \frac{e^x\cos(x)-e^x\bigl(-\sin(x)\bigr)}{\cos^2(x)}\end{aligned}"
      />
    ),
    reason: <>The top's derivative comes first: <Katex tex="u'v-uv'" />. The order matters because of the subtraction, since swapping it flips the sign of the answer. Here <Katex tex="v'=-\sin(x)" />, so subtracting it gives a double negative, which becomes <Katex tex="+" />.</>,
  },
  {
    working: <Katex display tex="f'(x) = \frac{e^x\bigl(\cos(x)+\sin(x)\bigr)}{\cos^2(x)}" />,
    reason: <>Both terms on top share <Katex tex="e^x" />. Taking it out makes the substitution that follows shorter and harder to get wrong.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} f'(\pi) &= \frac{e^{\pi}\bigl(\cos(\pi)+\sin(\pi)\bigr)}{\cos^2(\pi)} \\ &= \frac{e^{\pi}(-1+0)}{(-1)^2}\end{aligned}"
      />
    ),
    reason: <>Now the evaluation the question asks for: replace every <Katex tex="x" /> with <Katex tex="\pi" /> (and write <Katex tex="\pi" /> clearly, as the report reminds students). The exact values come from the unit circle point <Katex tex="(-1,0)" />: <Katex tex="\cos(\pi)=-1" />, <Katex tex="\sin(\pi)=0" />, and <Katex tex="\cos^2(\pi)" /> means <Katex tex="\bigl(\cos(\pi)\bigr)^2=1" />.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(\pi) = -e^{\pi}}" />,
    reason: <>The question says <em>evaluate</em>, so the answer is a number: the slope of <Katex tex="y=f(x)" /> at <Katex tex="x=\pi" />. A quick check: <Katex tex="\cos(x)" /> is at its minimum at <Katex tex="x=\pi" />, so the bottom is momentarily not changing and only the top's change counts: <Katex tex="\tfrac{e^{\pi}\cos(\pi)}{\cos^2(\pi)}=\tfrac{e^{\pi}}{\cos(\pi)}=-e^{\pi}" /> ✓.</>,
  },
]

export default function MethodsQ1_2018Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 1 (3 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Chain Rule"
        marks={1}
        statement={<>If <Katex tex="y=\left(-3x^3+x^2-64\right)^3" />, find <Katex tex="\dfrac{dy}{dx}" />.</>}
        examinerReport={EXAM_A}
      >
        <Background>
          <p>
            <b>The chain rule.</b> If <Katex tex="y" /> depends on <Katex tex="u" /> and{' '}
            <Katex tex="u" /> depends on <Katex tex="x" />, then{' '}
            <Katex tex="\dfrac{dy}{dx}=\dfrac{dy}{du}\times\dfrac{du}{dx}" />. Think of rates in a
            chain: if <Katex tex="u" /> changes 5 times as fast as <Katex tex="x" />, and{' '}
            <Katex tex="y" /> changes 3 times as fast as <Katex tex="u" />, then <Katex tex="y" />{' '}
            changes <Katex tex="3\times5=15" /> times as fast as <Katex tex="x" />. The rates
            multiply; the inner derivative is never just added on. For a power of a function this
            gives <Katex tex="\dfrac{d}{dx}\bigl(g(x)\bigr)^n=n\bigl(g(x)\bigr)^{n-1}g'(x)" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <Explore title="Why the inner derivative multiplies: check it against the tangent">
          <ChainWidget />
        </Explore>
        <WrongMethod
          title="Put the inside's derivative on the end without brackets"
          source="Examiner's report"
          working={<Katex display tex="\frac{dy}{dx} = 3\left(-3x^3+x^2-64\right)^2-9x^2+2x" />}
        >
          Without brackets, <Katex tex="-9x^2+2x" /> is added on instead of multiplying the whole
          of <Katex tex="3(\dots)^2" />. That's a different function, not just untidy notation: at{' '}
          <Katex tex="x=-1" /> it gives <Katex tex="10\,800-9-2=10\,789" />, but the true slope is{' '}
          <Katex tex="3(-60)^2(-11)=-118\,800" />, and the curve is falling steeply there. To
          catch it, read your answer back as a product: every factor in a chain-rule answer gets
          its own brackets.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Quotient Rule"
        marks={2}
        statement={<>Let <Katex tex="f(x)=\dfrac{e^x}{\cos(x)}" />. Evaluate <Katex tex="f'(\pi)" />.</>}
        examinerReport={EXAM_B}
      >
        <Background>
          <p>
            <b>The quotient rule.</b> If <Katex tex="f=\dfrac{u}{v}" />, then{' '}
            <Katex tex="f'=\dfrac{u'v-uv'}{v^2}" />. The numerator has two pieces:{' '}
            <Katex tex="u'v" /> is the effect of the top changing, and <Katex tex="-uv'" /> is
            the effect of the bottom changing. You could instead write{' '}
            <Katex tex="f(x)=e^x\bigl(\cos(x)\bigr)^{-1}" /> and use the product and chain rules,
            but then there are two negatives to track (the power <Katex tex="-1" /> and{' '}
            <Katex tex="v'=-\sin(x)" />), and the report says students who went that way tended
            to make little progress because of them.
          </p>
          <p>
            Two marks for a derivative and an evaluation: expect the work to be split between
            finding <Katex tex="f'(x)" /> and substituting <Katex tex="x=\pi" />. The report says
            students applied the quotient rule competently, but many didn't carry out the
            evaluation, often omitting it completely.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Explore title="Why f′(π) is so clean: at x = π the bottom isn't changing">
          <QuotientWidget />
        </Explore>
        <WrongMethod
          title="I've found f′(x), so I'm finished"
          source="Examiner's report"
          working={<Katex display tex="f'(x) = \frac{e^x\bigl(\cos(x)+\sin(x)\bigr)}{\cos^2(x)}" />}
        >
          &ldquo;Evaluate <Katex tex="f'(\pi)" />&rdquo; asks for a single number, the slope of the
          graph at <Katex tex="x=\pi" />. A correct derivative with no substitution answers only
          half the question, and the report says many students omitted the evaluation completely.
          To catch it, reread the instruction before moving on and check that your last line is
          what it asks for: here, a value with no <Katex tex="x" /> left in it.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
