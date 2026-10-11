// 2021 Specialist Mathematics — Exam 2, MCQ 9. VCAA examination report: 38% correct.
// Which derivative corresponds to an f with no points of inflection. Question text
// transcribed from the original paper. Solution is original.
// Widget: interactives/spec-2021-mcq9-touch-not-cross.tsx (graph of each option's f''(x),
// showing that B's f'' touches zero at x = 3 without changing sign).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Explore, lazyWidget } from '../Explore'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const TouchNotCross = lazyWidget(() => import('../interactives/spec-2021-mcq9-touch-not-cross'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 18, B: 38, C: 12, D: 9, E: 22 },
  answer: 'B',
  comment: (
    <>
      The antiderivative of the expression in option B is a quartic with a turning point but no point of
      inflection. Alternatively, the sign of the second derivative changes around <Katex tex="x=3" /> for
      option B.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>A point of inflection of <Katex tex="f" /> is where <Katex tex="f''(x)" /> <b>changes sign</b>, not merely where <Katex tex="f''(x)=0" />.</>,
    reason: <>Concavity follows the sign of <Katex tex="f''" />. Each option gives <Katex tex="f'(x)" />, so differentiate once more and check whether <Katex tex="f''(x)" /> changes sign.</>,
    more: <>At a point of inflection the curve switches from concave up (<Katex tex="f''>0" />) to concave down (<Katex tex="f''<0" />), or the reverse. So <Katex tex="f''(x)=0" /> only marks a <i>candidate</i>: it is a point of inflection only if <Katex tex="f''" /> has opposite signs on either side.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{A: } f'(x)&=2(x-3)^2+5\\f''(x)&=4(x-3)\end{aligned}" />,
    reason: <>Negative for <Katex tex="x<3" />, positive for <Katex tex="x>3" />: a sign change, so <Katex tex="f" /> <i>has</i> a point of inflection at <Katex tex="x=3" />. Ruled out.</>,
    more: <>Here <Katex tex="f'(x)\geq 5" /> is never zero, so <Katex tex="f" /> has no <i>stationary</i> points, but a point of inflection doesn&apos;t have to be stationary. Option A, chosen by 18% of students, is the only option whose <Katex tex="f" /> has no stationary points, which answers a different question.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{B: } f'(x)&=2(x-3)^3+5\\f''(x)&=6(x-3)^2\end{aligned}" />,
    reason: <>A multiple of a square, so <Katex tex="f''(x)\geq0" />: zero at <Katex tex="x=3" /> but positive on both sides. <Katex tex="f" /> is concave up everywhere, so <b>no point of inflection</b>.</>,
    more: <>Differentiating <Katex tex="2(x-3)^3" /> by the chain rule gives <Katex tex="2\times3(x-3)^2=6(x-3)^2" />. The sign of <Katex tex="f''" /> is the same just left and just right of <Katex tex="x=3" /> (try <Katex tex="x=2" /> and <Katex tex="x=4" />: both give <Katex tex="6" />), so the concavity never switches.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{C: } f'(x)&=\tfrac52(x-3)^2\\f''(x)&=5(x-3)\end{aligned}" />,
    reason: <>Changes sign at <Katex tex="x=3" /> (negative, then positive). Ruled out.</>,
    more: <>As <Katex tex="f'(3)=0" /> too, this one is a stationary point of inflection.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\text{D: } f'(x)&=\tfrac12(x-3)^2-5\\f''(x)&=x-3\end{aligned}" />,
    reason: <>Changes sign at <Katex tex="x=3" /> (negative, then positive). Ruled out.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\text{E: } f'(x)&=(x-3)^3-12x\\f''(x)&=3(x-3)^2-12\\&=3\big[(x-3)^2-4\big]\\&=3(x-1)(x-5)\end{aligned}"
      />
    ),
    reason: <>Difference of two squares. This upright parabola is positive, negative between <Katex tex="x=1" /> and <Katex tex="x=5" />, then positive: two sign changes, so two points of inflection. Ruled out.</>,
    more: <>The factorisation is <Katex tex="(x-3)^2-2^2=(x-3-2)(x-3+2)=(x-5)(x-1)" />. Option E was the most common wrong answer (22%); expanding <Katex tex="f''(x)=3x^2-18x+15" /> and checking its discriminant, <Katex tex="18^2-4(3)(15)=144>0" />, also shows two distinct roots, so <Katex tex="f''" /> does cross zero.</>,
  },
  {
    working: <Katex display tex="\boxed{f'(x) = 2(x-3)^3+5}" />,
    reason: <>Matches option <b>B</b>, the only option whose <Katex tex="f''(x)" /> never changes sign.</>,
    more: <>Every option has <Katex tex="f''(x)=0" /> somewhere, so &ldquo;<Katex tex="f''(x)=0" /> means a point of inflection&rdquo; would rule out all five. The report&apos;s first approach also works: antidifferentiating B gives <Katex tex="f(x)=\tfrac12(x-3)^4+5x+c" />, a quartic with one turning point (as <Katex tex="f''\geq0" />, <Katex tex="f'" /> is increasing, so <Katex tex="f'(x)=0" /> only once, at <Katex tex="x=3-\sqrt[3]{5/2}" />, where <Katex tex="f'" /> goes from negative to positive) and, since <Katex tex="f''(x)=6(x-3)^2\geq0" />, no point of inflection. The report&apos;s comment that the sign of the second derivative &ldquo;changes around <Katex tex="x=3" />&rdquo; for option B is a slip: <Katex tex="6(x-3)^2\geq0" /> does not change sign, which is exactly why there is no point of inflection.</>,
  },
]

export default function SpecialistQ9_2021() {
  return (
    <MCQShell
      question={<p>Which one of the following derivatives corresponds to a graph of <Katex tex="f" /> that has no points of inflection?</p>}
      options={[
        { letter: 'A', content: <Katex tex="f'(x) = 2(x-3)^2+5" /> },
        { letter: 'B', content: <Katex tex="f'(x) = 2(x-3)^3+5" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="f'(x) = \tfrac52(x-3)^2" /> },
        { letter: 'D', content: <Katex tex="f'(x) = \tfrac12(x-3)^2-5" /> },
        { letter: 'E', content: <Katex tex="f'(x) = (x-3)^3-12x" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <Explore title="f″ = 0 isn't enough: it has to change sign">
          <TouchNotCross />
        </Explore>
      }
    />
  )
}
