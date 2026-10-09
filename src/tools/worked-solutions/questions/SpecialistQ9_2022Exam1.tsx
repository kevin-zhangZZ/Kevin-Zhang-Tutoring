// 2022 Specialist Mathematics — Exam 1 Question 9 (4 marks). Antidifferentiating
// cos(2x)/sin³(2x) by substitution, then fixing the constant. Question text transcribed
// from the original paper. Answer checked with sympy and against the VCAA examination
// report. Solution is original. No interactive: the marks were lost to the power rule on
// u^(-3) and to not spotting the substitution, which a picture would not fix. Reviewed Oct
// 2026 for the Concise/Detailed split (34% full marks; skip above re-checked and kept):
// checks, traps and the report's power-rule errors moved into each row's `more`.

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
        power of <Katex tex="\sin(2x)" />, and the numerator <Katex tex="\cos(2x)" /> is the
        derivative of <Katex tex="\sin(2x)" /> apart from a factor of 2{' '}
        (<Katex tex="\tfrac{d}{dx}\sin(2x)=2\cos(2x)" />). A
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
        <Katex tex="\cos(2x)\,dx" />, which is exactly what sits in the integral.
      </>
    ),
    more: (
      <>
        Keep the <Katex tex="\tfrac12" />: it comes from the chain rule&apos;s factor of 2, and
        dropping it makes the antiderivative twice as big as it should be.
      </>
    ),
  },
  {
    working: <Katex display tex="f(x) = \int\frac{1}{u^3}\cdot\frac{du}{2} = \frac12\int u^{-3}\,du" />,
    reason: (
      <>
        Replace <Katex tex="\sin^3(2x)" /> with <Katex tex="u^3" /> and{' '}
        <Katex tex="\cos(2x)\,dx" /> with <Katex tex="\tfrac{du}{2}" />. Write{' '}
        <Katex tex="\tfrac{1}{u^3}" /> as <Katex tex="u^{-3}" /> so the power rule can be used.
      </>
    ),
    more: (
      <>
        No <Katex tex="x" /> is left in the integral, which confirms the substitution worked. If
        some <Katex tex="x" /> had been left over, that would be the sign to try a different
        choice of <Katex tex="u" />.
      </>
    ),
  },
  {
    working: <Katex display tex="= \frac12\cdot\frac{u^{-2}}{-2}+c = -\frac{1}{4u^2}+c" />,
    reason: (
      <>
        Power rule: add 1 to the index (<Katex tex="-3+1=-2" />) and <em>divide</em> by the new
        index, <Katex tex="-2" />. Then <Katex tex="\tfrac12\times\tfrac{1}{-2}=-\tfrac14" />.
      </>
    ),
    more: (
      <>
        <p>
          This is where the report says students who substituted went wrong: integrating{' '}
          <Katex tex="\tfrac{1}{u^3}" /> to get <Katex tex="-2u^{-2}" /> (multiplying by the new
          index instead of dividing by it) or <Katex tex="-2u^{-4}" /> (the same multiplying by{' '}
          <Katex tex="-2" />, and the index has also gone down by 1, as in differentiation,
          instead of up).
        </p>
        <p>
          A quick check catches both: an antiderivative of <Katex tex="u^{-3}" /> must
          differentiate back to <Katex tex="u^{-3}" />. Differentiating the wrong answers gives{' '}
          <Katex tex="4u^{-3}" /> and <Katex tex="8u^{-5}" />, whereas{' '}
          <Katex tex="\tfrac{d}{du}\!\left(\tfrac{u^{-2}}{-2}\right)=u^{-3}" />.
        </p>
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
        Use the given value to find <Katex tex="c" />: substitute <Katex tex="x=\tfrac\pi8" /> and
        set the result equal to <Katex tex="\tfrac34" />. When <Katex tex="x=\tfrac\pi8" />,{' '}
        <Katex tex="2x=\tfrac\pi4" />.
      </>
    ),
    more: (
      <>
        The <Katex tex="+c" /> means there is a whole family of antiderivatives: the same curve
        shifted up or down. Only one member of the family passes through{' '}
        <Katex tex="\left(\tfrac\pi8,\tfrac34\right)" />, and that is the <Katex tex="f" /> we
        want. The value <Katex tex="x=\tfrac\pi8" /> was chosen so that the angle becomes{' '}
        <Katex tex="\tfrac\pi4" />, whose exact trig values you know.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned} -\frac{1}{4\times\frac12}+c &= \frac34 \\ -\frac12+c &= \frac34 \\ c &= \frac54 \end{aligned}" />,
    reason: (
      <>
        <Katex tex="\sin\!\left(\tfrac\pi4\right)=\tfrac{1}{\sqrt2}" />, so{' '}
        <Katex tex="\sin^2\!\left(\tfrac\pi4\right)=\tfrac12" />. Then solve for{' '}
        <Katex tex="c" />.
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
        Put <Katex tex="c=\tfrac54" /> back into <Katex tex="f(x)" />. Since{' '}
        <Katex tex="\operatorname{cosec}(2x)=\tfrac{1}{\sin(2x)}" />, either form is fine.
      </>
    ),
    more: (
      <>
        <p>
          Check by differentiating:{' '}
          <Katex tex="-\tfrac14\cdot(-2)\sin^{-3}(2x)\cdot2\cos(2x)=\tfrac{\cos(2x)}{\sin^3(2x)}" />,
          and <Katex tex="f\!\left(\tfrac\pi8\right)=-\tfrac12+\tfrac54=\tfrac34" />.
        </p>
        <p>
          If you rewrote the integrand as <Katex tex="\cot(2x)\operatorname{cosec}^2(2x)" /> and
          substituted <Katex tex="u=\cot(2x)" />, you would get{' '}
          <Katex tex="f(x)=-\tfrac14\cot^2(2x)+1" />. That is the same function, because{' '}
          <Katex tex="\cot^2(2x)=\operatorname{cosec}^2(2x)-1" />: the different-looking{' '}
          <Katex tex="+c" /> just absorbs the extra <Katex tex="\tfrac14" />. So that route is
          also correct; it is just longer, because after rewriting you still need a substitution.
        </p>
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
            The question has two stages: antidifferentiate <Katex tex="f'(x)" /> to get{' '}
            <Katex tex="f(x)" /> with an unknown constant <Katex tex="c" />, then use{' '}
            <Katex tex="f\!\left(\tfrac\pi8\right)=\tfrac34" /> to find <Katex tex="c" />.
          </p>
          <p>
            For the first stage, look at the shape of the integrand (the function being
            integrated): some function <Katex tex="g(x)" /> raised to a power, multiplied by a
            constant multiple of its derivative <Katex tex="g'(x)" />. That shape is exactly what
            the substitution <Katex tex="u=g(x)" /> is for: after the swap every{' '}
            <Katex tex="x" /> disappears and only a simple power of <Katex tex="u" /> is left.
          </p>
          <p>
            Rewriting with trig identities first (for example as{' '}
            <Katex tex="\cot(2x)\operatorname{cosec}^2(2x)" />) only gives another integrand that
            still needs a substitution. The report notes that students who manipulated the
            integrand using trig identities often had little success.
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
