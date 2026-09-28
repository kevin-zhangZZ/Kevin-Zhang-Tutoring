// 2020 Mathematical Methods — Exam 2, MCQ 3. VCAA examination report: 86% correct.
// Antidifferentiating a derivative and pinning the constant. Question text transcribed from the original paper; solution is original.
// Answer C checked with sympy (antiderivative 2√(2x − 3), c = −2), against the VCAA report (no
// comment printed for this question) and itute (C). Options checked with sympy: A has the right
// derivative but f(6) = 6; B, D and E have derivative 1/√(2x − 3) (half of f′) and give f(6) = 1,
// 5 and 3. The alternative f(x) = f(6) + ∫₆ˣ f′(t) dt is from Mr Nie's video walkthrough.
// Interactive diagram (§15): interactives/meth-2020e2-mcq3-family.tsx slides the antiderivative
// 2√(2x − 3) + c up and down through its family, with the tangent at x = 6 keeping gradient 2/3,
// until it passes through (6, 4); a toggle overlays options B, D and E. This site's own
// explanatory figure; VCAA printed no diagram for this question.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const FamilyWidget = lazyWidget(() => import('../interactives/meth-2020e2-mcq3-family'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 5, C: 86, D: 2, E: 0 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f'(x) = \frac{2}{\sqrt{2x-3}} = 2(2x-3)^{-1/2}" />,
    reason: <><Katex tex="f" /> is an antiderivative of <Katex tex="f'" />. Writing the root as a power puts it in the form <Katex tex="(ax+b)^n" /> with <Katex tex="a=2" />, <Katex tex="b=-3" />, <Katex tex="n=-\tfrac12" />, which the formula sheet&apos;s rule covers.</>,
  },
  {
    working: <Katex display tex="f(x) = 2\times\frac{(2x-3)^{1/2}}{2\times\tfrac12}+c = 2\sqrt{2x-3}+c" />,
    reason: <>The rule <Katex tex="\int(ax+b)^n\,dx=\frac{(ax+b)^{n+1}}{a(n+1)}+c" />: raise the index by one, then divide by the new index <Katex tex="\tfrac12" /> <em>and</em> by <Katex tex="a=2" />. Here those two cancel. You divide by <Katex tex="a" /> because differentiating <Katex tex="(2x-3)^{1/2}" /> by the chain rule brings out a factor of 2 (the derivative of the inside), so antidifferentiating has to take it back out.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\frac{d}{dx}\Bigl(2\sqrt{2x-3}\Bigr) = 2\times\tfrac12(2x-3)^{-1/2}\times2" />
        <Katex display tex="= \frac{2}{\sqrt{2x-3}}\ \checkmark" />
      </>
    ),
    reason: <>Differentiate back as a check: this is the step that catches a lost factor of 2 (options B, D and E).</>,
  },
  {
    working: <Katex display tex="f(6) = 2\sqrt{12-3}+c = 2(3)+c = 6+c" />,
    reason: <>The derivative fixes only the <em>shape</em> of <Katex tex="f" />: adding any constant slides the graph up or down without changing its gradient anywhere, so every <Katex tex="c" /> gives a valid antiderivative. The one extra fact, <Katex tex="f(6)=4" />, is what picks out a single curve (slide <Katex tex="c" /> in the diagram below).</>,
  },
  {
    working: <Katex display tex="6+c = 4 \implies c = -2" />,
    reason: <>Using the given value. (Another way to see it: <Katex tex="f(x)=f(6)+\int_6^x f'(t)\,dt" />, start at the known value and add the change. On CAS, <Katex tex="4+\int_6^x \frac{2}{\sqrt{2t-3}}\,dt" /> returns <Katex tex="2\sqrt{2x-3}-2" /> directly.)</>,
  },
  {
    working: <Katex display tex="\boxed{f(x) = 2\sqrt{2x-3}-2}" />,
    reason: <>Matches option <b>C</b>. Option <b>A</b> is the antiderivative with the constant left as 0: it gives <Katex tex="f(6)=6" />, not 4. Options <b>B</b>, <b>D</b> and <b>E</b> are <Katex tex="\sqrt{2x-3}" /> plus a constant, whose derivative is <Katex tex="\frac{1}{\sqrt{2x-3}}" />, half of <Katex tex="f'(x)" />: they have lost the factor of 2, and none of them gives <Katex tex="f(6)=4" /> either (they give 1, 5 and 3).</>,
  },
]

export default function MethodsQ3_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Let <Katex tex="f'(x)=\dfrac{2}{\sqrt{2x-3}}" />.
          </p>
          <p>If <Katex tex="f(6)=4" />, then</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="f(x)=2\sqrt{2x-3}" /> },
        { letter: 'B', content: <Katex tex="f(x)=\sqrt{2x-3}-2" /> },
        { letter: 'C', content: <Katex tex="f(x)=2\sqrt{2x-3}-2" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="f(x)=\sqrt{2x-3}+2" /> },
        { letter: 'E', content: <Katex tex="f(x)=\sqrt{2x-3}" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="Every antiderivative is the same curve slid up or down, and f(6) = 4 picks out one">
            <FamilyWidget />
          </Explore>
          <WrongMethod
            title="Antidifferentiate f′ and that's f; no constant needed"
            source="7% chose A"
            working={
              <>
                <Katex display tex="f(x) = \int \frac{2}{\sqrt{2x-3}}\,dx" />
                <Katex display tex="= 2\sqrt{2x-3} \quad \text{(option A)}" />
              </>
            }
          >
            <p>
              An antiderivative is only fixed up to a constant: <Katex tex="2\sqrt{2x-3}+c" /> has derivative{' '}
              <Katex tex="f'(x)" /> for <em>every</em> <Katex tex="c" />. Option A never uses the fact <Katex tex="f(6)=4" />, and
              it fails it: <Katex tex="2\sqrt9=6" />.
            </p>
            <p>
              Next time: if a question gives you <Katex tex="f'" /> and one value of <Katex tex="f" />, that value is there to
              find the <Katex tex="+\,c" />. Write the <Katex tex="+\,c" /> the moment you antidifferentiate, then substitute.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
