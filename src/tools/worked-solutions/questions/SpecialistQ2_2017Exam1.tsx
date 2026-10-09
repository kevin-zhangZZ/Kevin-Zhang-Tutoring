// 2017 Specialist Mathematics — Exam 1, Question 2 (4 marks). A definite integral needing
// partial fractions with an irreducible quadratic factor. 38% of students scored zero.
// Question text transcribed from the original paper (no diagram given). Answer checked with
// sympy, against the VCAA examination report and against itute (both log_e(√(3/2))). Solution is
// original. No lettered parts, so this uses the plain card layout rather than PartCard.
//
// Interactive widgets (this site's own, after the working):
//  - interactives/spec-2017e1-q2-numerator.tsx: the identity 1 = A(1+x²) + (Bx+C)x as curves that
//    must lie flat on y = 1; a toggle swaps in the wrong form B/(1+x²), which can never flatten.
//  - interactives/spec-2017e1-q2-gap.tsx: the integral as the gap between y = 1/x and
//    y = x/(1+x²), built in three steps; a toggle shows how dropping ½log_e 2 at x = 1 gives the
//    report's wrong answer log_e(√(3/4)), a negative "area".

import Katex from '../../../components/Katex'
import { Background, WorkingTable, WrongMethod, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const NumeratorWidget = lazyWidget(() => import('../interactives/spec-2017e1-q2-numerator'))
const GapWidget = lazyWidget(() => import('../interactives/spec-2017e1-q2-gap'))

const EXAM: SAExaminerStats = {
  marks: [38, 11, 9, 7, 35],
  average: 1.9,
  comment: (
    <>
      This question tended to be answered well by students who knew that partial fractions
      were required and which form of partial fractions to use. A large number of students
      did not use partial fractions, which meant that no progress could be made. Students gave
      answers such as <Katex tex="\log_e\!\left(x(1+x^2)\right)" /> and{' '}
      <Katex tex="\log_e\!\left(x\times\tan^{-1}(x)\right)" /> using this approach. Several
      students used partial fractions of the form <Katex tex="\tfrac{A}{x}+\tfrac{B}{1+x^2}" />,
      often getting correct partial fractions with incorrect working, or{' '}
      <Katex tex="\tfrac{A}{x}+\tfrac{Bx}{1+x^2}" />, which led to correct partial fractions
      since the value of <Katex tex="C" /> was zero. Some used a substitution such as{' '}
      <Katex tex="u=x^2" /> or <Katex tex="u=1+x^2" />, which led to an alternative partial
      fractions form that was sometimes handled successfully but often terminals were not
      adjusted. Occasionally <Katex tex="x=\tan(u)" /> was used but this was rarely followed
      through correctly. A number of students found the correct antiderivative but made errors
      in final arithmetic simplification work, which frequently gave the incorrect answer{' '}
      <Katex tex="\log_e\!\left(\sqrt{\tfrac34}\right)" />. Others did not put the answer in the
      correct form, often giving <Katex tex="\log_e\!\left(\tfrac{\sqrt6}{2}\right)" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{1}{x(1+x^2)} = \frac{A}{x}+\frac{Bx+C}{1+x^2}" />,
    reason: (
      <>
        How would I know? There is no <Katex tex="\tfrac{f'}{f}" /> pattern (the derivative of{' '}
        <Katex tex="x(1+x^2)" /> is <Katex tex="1+3x^2" />, not a constant multiple of the numerator <Katex tex="1" />), but the
        denominator is already factorised, which is the cue for partial fractions. Since{' '}
        <Katex tex="1+x^2\ge1" /> has no real roots, it is an irreducible quadratic and gets a{' '}
        <em>linear</em> numerator <Katex tex="Bx+C" />, not a constant.
      </>
    ),
  },
  {
    working: <Katex display tex="1 = A(1+x^2)+(Bx+C)x" />,
    reason: (
      <>
        Multiply both sides by <Katex tex="x(1+x^2)" />. This must be true for <em>every</em>{' '}
        <Katex tex="x" /> (it is an identity, not an equation to solve), so we may substitute any
        convenient value or compare coefficients.
      </>
    ),
  },
  {
    working: <Katex display tex="x=0: \quad 1=A" />,
    reason: (
      <>
        <Katex tex="x=0" /> wipes out both terms containing <Katex tex="x" />. It is allowed even though
        the original fraction is undefined there, because this polynomial identity holds for all{' '}
        <Katex tex="x" />.
      </>
    ),
  },
  {
    working: <Katex display tex="1 = (A+B)x^2+Cx+A" />,
    reason: (
      <>
        Expand and collect powers of <Katex tex="x" />, ready to match against the left side, which is{' '}
        <Katex tex="0x^2+0x+1" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} x^2&:\ 0=A+B \implies B=-1\\ x&:\ 0=C \end{aligned}" />,
    reason: (
      <>
        Three powers of <Katex tex="x" />, three unknowns: that is why the quadratic factor needs both{' '}
        <Katex tex="B" /> and <Katex tex="C" />. The <Katex tex="Bx^2" /> term is the only thing that can
        cancel the <Katex tex="Ax^2" /> from <Katex tex="A(1+x^2)" />. (The report notes that{' '}
        <Katex tex="\tfrac{Bx}{1+x^2}" /> happened to work here only because <Katex tex="C=0" />.)
      </>
    ),
  },
  {
    working: <Katex display tex="\int_1^{\sqrt3}\!\left(\frac1x-\frac{x}{1+x^2}\right)dx" />,
    reason: (
      <>
        Quick check at <Katex tex="x=1" />: <Katex tex="1-\tfrac12=\tfrac12" /> and{' '}
        <Katex tex="\tfrac{1}{1\times2}=\tfrac12" />. The first piece is standard. In the second, the
        numerator <Katex tex="x" /> is half the derivative of <Katex tex="1+x^2" />, so it is an{' '}
        <Katex tex="\tfrac{f'}{f}" /> form.
      </>
    ),
  },
  {
    working: <Katex display tex="= \Bigl[\log_e(x)-\tfrac12\log_e(1+x^2)\Bigr]_1^{\sqrt3}" />,
    reason: (
      <>
        <Katex tex="\int\tfrac{2x}{1+x^2}\,dx=\log_e(1+x^2)" />, so the <Katex tex="x" /> numerator gives
        half of that. No modulus signs are needed: <Katex tex="x>0" /> and <Katex tex="1+x^2>0" /> on{' '}
        <Katex tex="[1,\sqrt3]" />.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} &= \left(\log_e\sqrt3-\tfrac12\log_e 4\right)\\ &\quad-\left(0-\tfrac12\log_e 2\right) \end{aligned}"
      />
    ),
    reason: (
      <>
        Substitute both terminals into <em>both</em> terms. At <Katex tex="x=1" /> the first term is{' '}
        <Katex tex="\log_e1=0" />, but the second is <Katex tex="-\tfrac12\log_e2" />, not 0, because{' '}
        <Katex tex="1+1^2=2" />.
      </>
    ),
  },
  {
    working: <Katex display tex="= \tfrac12\log_e3-\log_e2+\tfrac12\log_e2" />,
    reason: (
      <>
        Write everything in terms of <Katex tex="\log_e3" /> and <Katex tex="\log_e2" />:{' '}
        <Katex tex="\log_e\sqrt3=\tfrac12\log_e3" /> and <Katex tex="\tfrac12\log_e4=\tfrac12\log_e2^2=\log_e2" />.
      </>
    ),
  },
  {
    working: <Katex display tex="= \tfrac12\log_e3-\tfrac12\log_e2 = \tfrac12\log_e\!\left(\tfrac32\right)" />,
    reason: (
      <>
        Collect the <Katex tex="\log_e2" /> terms (<Katex tex="-1+\tfrac12=-\tfrac12" />), then use{' '}
        <Katex tex="\log_e a-\log_e b=\log_e\tfrac{a}{b}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\log_e\!\left(\sqrt{\frac32}\right)}" />,
    reason: (
      <>
        The required form has a square root, so move the <Katex tex="\tfrac12" /> inside:{' '}
        <Katex tex="a=3" />, <Katex tex="b=2" />. <Katex tex="\log_e\!\left(\tfrac{\sqrt6}{2}\right)" /> is the
        same number but not the required form, since{' '}
        <Katex tex="\tfrac{\sqrt6}{2}=\sqrt{\tfrac64}=\sqrt{\tfrac32}" />. Sense check: about{' '}
        <Katex tex="0.203" />, positive, as it must be for a positive integrand.
      </>
    ),
  },
]

export default function SpecialistQ2_2017Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 2 (4 marks)" always>
        <p>
          Find <Katex tex="\displaystyle\int_1^{\sqrt3}\frac{1}{x\left(1+x^2\right)}\,dx" />, expressing
          your answer in the form <Katex tex="\log_e\!\left(\sqrt{\tfrac{a}{b}}\right)" />, where{' '}
          <Katex tex="a" /> and <Katex tex="b" /> are positive integers.
        </p>
      </Background>
      <Background>
        <p>
          <strong>Which partial-fraction form?</strong> Match the numerator to the factor: a{' '}
          <em>linear</em> factor gets a constant on top, an <em>irreducible quadratic</em>{' '}
          factor gets a linear expression on top. So{' '}
          <Katex tex="\tfrac{1}{x(1+x^2)}" /> splits as{' '}
          <Katex tex="\tfrac{A}{x}+\tfrac{Bx+C}{1+x^2}" />. A quick count confirms it: the denominator
          has degree 3, so you need 3 unknowns.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <Explore title="Why 1 + x² needs Bx + C on top, not just B">
        <NumeratorWidget />
      </Explore>
      <WrongMethod
        title="Integrating 1 over something gives log_e of that something"
        source="Examiner's report"
        working={
          <Katex
            display
            tex="\begin{aligned} &\frac{d}{dx}\log_e\!\left(x(1+x^2)\right)\\ &= \frac{1+3x^2}{x(1+x^2)} \ne \frac{1}{x(1+x^2)} \end{aligned}"
          />
        }
      >
        <Katex tex="\int\tfrac{f'(x)}{f(x)}\,dx=\log_e f(x)" /> needs the derivative of the denominator on
        top, and here that would be <Katex tex="1+3x^2" />, not <Katex tex="1" />. Differentiating your
        answer is the check, and it fails. The report&apos;s other wrong answer,{' '}
        <Katex tex="\log_e\!\left(x\times\tan^{-1}(x)\right)" />, looks like each factor was integrated
        separately (<Katex tex="\tfrac1x\to\log_e x" />, <Katex tex="\tfrac{1}{1+x^2}\to\tan^{-1}x" />), but
        the integral of a product is not built from the integrals of its factors. When no rule fits a
        factorised fraction, split it into partial fractions first.
      </WrongMethod>
      <WrongMethod
        title="Put a constant B over 1 + x²"
        source="Examiner's report"
        working={
          <Katex
            display
            tex="\begin{aligned} 1&=A(1+x^2)+Bx\\ &=Ax^2+Bx+A \end{aligned}"
          />
        }
      >
        The <Katex tex="x^2" /> coefficient and the constant are both <Katex tex="A" />, so you would need{' '}
        <Katex tex="A=0" /> and <Katex tex="A=1" /> at once: no constants work. Substituting{' '}
        <Katex tex="x=0" /> and <Katex tex="x=1" /> seems to give <Katex tex="A=1" />, <Katex tex="B=-1" />,
        but <Katex tex="\tfrac1x-\tfrac{1}{1+x^2}" /> fails at <Katex tex="x=2" />:{' '}
        <Katex tex="\tfrac12-\tfrac15=\tfrac{3}{10}" />, while <Katex tex="\tfrac{1}{2\times5}=\tfrac{1}{10}" />.
        Always test your partial fractions at an <Katex tex="x" />-value you did not use to find them.
      </WrongMethod>
      <Explore title="The integral is the gap between 1/x and x/(1 + x²)">
        <GapWidget />
      </Explore>
      <WrongMethod
        title="At x = 1 the logs are zero, so the bottom terminal drops out"
        source="Examiner's report"
        working={
          <Katex
            display
            tex="\begin{aligned} &\log_e\sqrt3-\tfrac12\log_e4-0\\ &=\log_e\!\left(\tfrac{\sqrt3}{2}\right)=\log_e\!\left(\sqrt{\tfrac34}\right) \end{aligned}"
          />
        }
      >
        <Katex tex="\log_e1=0" /> kills the first term at <Katex tex="x=1" />, but{' '}
        <Katex tex="\tfrac12\log_e(1+x^2)" /> is <Katex tex="\tfrac12\log_e2" /> there. Dropping it gives
        exactly <Katex tex="\log_e\!\left(\sqrt{\tfrac34}\right)" />, the incorrect answer the report says
        came up frequently. That value is about <Katex tex="-0.144" />: a negative result for the integral
        of a positive function, which is impossible. Check the sign of every definite integral against
        the integrand.
      </WrongMethod>
      <SAExaminerReport stats={EXAM} maxMarks={4} />
      <div>
        <p className="text-[11px] font-bold tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">Video Walkthrough</p>
        <p className="text-[13px] text-gray-500 dark:text-gray-400 italic">Coming soon.</p>
      </div>
    </div>
  )
}
