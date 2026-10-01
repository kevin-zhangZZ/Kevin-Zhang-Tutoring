// 2022 Specialist Mathematics — Exam 1 Question 9 (4 marks). Antidifferentiating
// cos(2x)/sin³(2x) by substitution, then fixing the constant. Question text transcribed
// from the original paper. Answer checked with sympy and against the VCAA examination
// report. Solution is original. No interactive: the marks were lost to the power rule on
// u^(-3) and to not spotting the substitution, which a picture would not fix.

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [32, 10, 15, 10, 34],
  average: 2.0,
  comment: (
    <>
      Alternative correct answers were acceptable.
      <br />
      A number of students attempted to manipulate the integrand using trigonometric
      identities prior to integration, often with little success. Of those who used an
      appropriate substitution, errors including integrating <Katex tex="\tfrac{1}{u^3}" /> to
      get <Katex tex="-2u^{-2}+c" /> or <Katex tex="-2u^{-4}+c" /> were often seen.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \int\frac{\cos(2x)}{\sin^3(2x)}\,dx" />,
    reason: (
      <>
        To get <Katex tex="f" /> from <Katex tex="f'" />, antidifferentiate. The denominator is a
        power of <Katex tex="\sin(2x)" />, and the numerator <Katex tex="\cos(2x)" /> is its
        derivative apart from a factor of 2 (<Katex tex="\tfrac{d}{dx}\sin(2x)=2\cos(2x)" />). A
        function and its derivative together like this is the signal to substitute{' '}
        <Katex tex="u=\sin(2x)" />.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} u &= \sin(2x) \\ \frac{du}{dx} &= 2\cos(2x) \\ \cos(2x)\,dx &= \frac{du}{2} \end{aligned}"
      />
    ),
    reason: (
      <>
        Differentiate <Katex tex="u" /> with the chain rule, then rearrange for{' '}
        <Katex tex="\cos(2x)\,dx" />, which is exactly what sits in the integral. Keep the{' '}
        <Katex tex="\tfrac12" /> — dropping it makes the antiderivative twice as big as it should be.
      </>
    ),
  },
  {
    working: <Katex display tex="f(x) = \int\frac{1}{u^3}\cdot\frac{du}{2} = \frac12\int u^{-3}\,du" />,
    reason: (
      <>
        Replace <Katex tex="\sin^3(2x)" /> with <Katex tex="u^3" /> and{' '}
        <Katex tex="\cos(2x)\,dx" /> with <Katex tex="\tfrac{du}{2}" />. No <Katex tex="x" /> is
        left, which confirms the substitution worked. Writing <Katex tex="\tfrac{1}{u^3}" /> as{' '}
        <Katex tex="u^{-3}" /> gets it ready for the power rule.
      </>
    ),
  },
  {
    working: <Katex display tex="= \frac12\cdot\frac{u^{-2}}{-2}+c = -\frac{1}{4u^2}+c" />,
    reason: (
      <>
        Add 1 to the index (<Katex tex="-3+1=-2" />) and <em>divide</em> by the new index,{' '}
        <Katex tex="-2" />. The report says students often got <Katex tex="-2u^{-2}" /> or{' '}
        <Katex tex="-2u^{-4}" /> here. A quick check catches both: differentiating them gives{' '}
        <Katex tex="4u^{-3}" /> and <Katex tex="8u^{-5}" />, not <Katex tex="u^{-3}" />, whereas{' '}
        <Katex tex="\tfrac{d}{du}\!\left(\tfrac{u^{-2}}{-2}\right)=u^{-3}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="f(x) = -\frac{1}{4\sin^2(2x)}+c" />,
    reason: <>Replace <Katex tex="u" /> with <Katex tex="\sin(2x)" />, since the answer must be in terms of <Katex tex="x" />.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} f\!\left(\frac\pi8\right) &= \frac34 \\ -\frac{1}{4\sin^2\!\left(\frac\pi4\right)}+c &= \frac34 \end{aligned}"
      />
    ),
    reason: (
      <>
        The <Katex tex="+c" /> means there is a whole family of antiderivatives; the given value
        picks out the one we want. When <Katex tex="x=\tfrac\pi8" />,{' '}
        <Katex tex="2x=\tfrac\pi4" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} -\frac{1}{4\times\frac12}+c &= \frac34 \\ -\frac12+c &= \frac34 \\ c &= \frac54 \end{aligned}" />,
    reason: (
      <>
        <Katex tex="\sin\!\left(\tfrac\pi4\right)=\tfrac{1}{\sqrt2}" />, so{' '}
        <Katex tex="\sin^2\!\left(\tfrac\pi4\right)=\tfrac12" />.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\boxed{\begin{aligned} f(x) &= -\frac{1}{4\sin^2(2x)}+\frac54 \\ &= -\frac14\operatorname{cosec}^2(2x)+\frac54 \end{aligned}}"
      />
    ),
    reason: (
      <>
        Either form is fine (the report accepted alternative correct answers). Check by
        differentiating:{' '}
        <Katex tex="-\tfrac14\cdot(-2)\sin^{-3}(2x)\cdot2\cos(2x)=\tfrac{\cos(2x)}{\sin^3(2x)}" />,
        and <Katex tex="f\!\left(\tfrac\pi8\right)=-\tfrac12+\tfrac54=\tfrac34" />.
      </>
    ),
  },
]

export default function SpecialistQ9_2022Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 9 (4 marks)</p>
        <p>
          Given that <Katex tex="f'(x)=\dfrac{\cos(2x)}{\sin^3(2x)}" /> and{' '}
          <Katex tex="f\!\left(\dfrac\pi8\right)=\dfrac34" />, find <Katex tex="f(x)" />.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            When an integrand contains a function <Katex tex="g(x)" /> raised to a power, multiplied
            by (a constant multiple of) its derivative <Katex tex="g'(x)" />, substitute{' '}
            <Katex tex="u=g(x)" />. Here <Katex tex="g(x)=\sin(2x)" /> and{' '}
            <Katex tex="g'(x)=2\cos(2x)" />, so one substitution turns the whole thing into a
            simple power of <Katex tex="u" />. Rewriting with trig identities first (for example
            as <Katex tex="\cot(2x)\operatorname{cosec}^2(2x)" />) only gives another integrand
            that still needs a substitution — the report notes students who manipulated the
            integrand this way often had little success.
          </p>
          <p>
            Once the integral is done, the condition <Katex tex="f\!\left(\tfrac\pi8\right)=\tfrac34" />{' '}
            is there to find <Katex tex="c" />. The value <Katex tex="x=\tfrac\pi8" /> is chosen so
            that <Katex tex="2x=\tfrac\pi4" />, an angle with exact trig values.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <SAExaminerReport stats={EXAM} maxMarks={4} />
        <div>
          <p className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">
            Video Walkthrough
          </p>
          <p className="text-[13px] text-gray-400 dark:text-gray-500 italic">Coming soon.</p>
        </div>
      </div>
    </div>
  )
}
