// 2018 Mathematical Methods — Exam 2, MCQ 5. VCAA examination report: 67% correct. Find p
// given a stationary point of x² + p/x at x = −2. Question text transcribed from the original
// paper; VCAA printed no diagram and neither does the stem here (guide §7). Answer checked
// with sympy (f'(−2) = −4 − p/4 = 0 ⟹ p = −16; f(−2) = 12, f''(−2) = 6, a local minimum); itute
// agrees (A). Solution is original. Distractor slips verified with sympy: E (16) comes from
// f'(x) = 2x + p/x² (or from (−2)² = −4); D (8) from f(−2) = 0, or from differentiating p/x as −p/x.
// Interactive diagram (§15): interactives/meth-2018-mcq5-flat-tangent.tsx — slide p and watch
// the tangent at x = −2 (gradient −4 − p/4) and the turning point at x = ∛(p/2); only p = −16
// makes the tangent flat. Option buttons show E's turning point at x = +2 and D's x-intercept
// at x = −2.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Cas } from '../CasRef'
import { Explore, lazyWidget } from '../Explore'

const FlatTangent = lazyWidget(() => import('../interactives/meth-2018-mcq5-flat-tangent'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 67, B: 7, C: 3, D: 9, E: 15 },
  answer: 'A',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = x^2 + \frac{p}{x} = x^2 + p\,x^{-1}" />,
    reason: <><Katex tex="p" /> is an unknown constant, so treat it like any number. Rewriting the fraction as a negative power lets the ordinary power rule do the differentiating.</>,
  },
  {
    working: <Katex display tex="f'(x) = 2x - p\,x^{-2} = 2x - \frac{p}{x^2}" />,
    reason: <>Power rule on <Katex tex="p\,x^{-1}" />: bring the <Katex tex="-1" /> down in front and lower the power to <Katex tex="-2" />. That minus sign is the one the whole answer depends on; lose it and you land on option E.</>,
  },
  {
    working: <Katex display tex="\text{Stationary at } x=-2 \implies f'(-2) = 0" />,
    reason: <>&ldquo;Stationary point&rdquo; means the tangent is horizontal, so the <em>gradient</em> is zero there. It is <Katex tex="f'" /> that is zero, not <Katex tex="f" />: setting <Katex tex="f(-2)=0" /> would find an <Katex tex="x" />-intercept instead. One equation in one unknown is enough to pin <Katex tex="p" />. On the CAS: define <Katex tex="f(x)" />, then <Cas fn="solve">solve((d/dx(f(x))|x=−2)=0, p)</Cas>; the bracket before <code>d/dx</code> stops the CAS reading &ldquo;<Katex tex="-2=0" />&rdquo;.</>,
  },
  {
    working: <Katex display tex="2(-2) - \frac{p}{(-2)^2} = 0 \implies -4 - \frac{p}{4} = 0" />,
    reason: <>Note <Katex tex="(-2)^2 = +4" />: squaring kills the minus sign in the denominator, while the <Katex tex="2x" /> term keeps it.</>,
  },
  {
    working: <Katex display tex="\frac{p}{4} = -4" />,
    reason: <>Add <Katex tex="\tfrac{p}{4}" /> to both sides. <Katex tex="p" /> must be negative, since <Katex tex="-\tfrac{p}{4}" /> has to cancel the <Katex tex="-4" />.</>,
  },
  {
    working: <Katex display tex="\boxed{p = -16}" />,
    reason: <>Matches option <b>A</b>. Option <b>E</b> <Katex tex="(16)" />, chosen by <Katex tex="15\%" />, is this answer with the sign lost, either from differentiating <Katex tex="p x^{-1}" /> as <Katex tex="+p x^{-2}" /> or from taking <Katex tex="(-2)^2" /> as <Katex tex="-4" />. Option <b>D</b> <Katex tex="(8)" /> is what <Katex tex="f(-2)=0" /> gives (an <Katex tex="x" />-intercept, not a stationary point); differentiating <Katex tex="\tfrac{p}{x}" /> as <Katex tex="-\tfrac{p}{x}" /> also gives it. A quick check: with <Katex tex="p=-16" />, <Katex tex="f'(x)=2x+\tfrac{16}{x^2}" />, and <Katex tex="f'(-2)=-4+4=0" /> ✓.</>,
  },
]

export default function MethodsQ5_2018() {
  return (
    <MCQShell
      question={
        <p>
          Consider <Katex tex="f(x)=x^2+\dfrac{p}{x},\ x\ne0,\ p\in R" />. There is a
          stationary point on the graph of <Katex tex="f" /> when <Katex tex="x=-2" />. The
          value of <Katex tex="p" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-16" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="-8" /> },
        { letter: 'C', content: <Katex tex="2" /> },
        { letter: 'D', content: <Katex tex="8" /> },
        { letter: 'E', content: <Katex tex="16" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="Only one p makes the tangent at x = −2 flat">
            <FlatTangent />
          </Explore>
          <WrongMethod
            title="The derivative of p/x is p/x²"
            source="15% chose E"
            working={
              <>
                <Katex display tex="f'(x) = 2x + \frac{p}{x^2}" />
                <Katex display tex="-4 + \frac{p}{4} = 0 \implies p = 16 \quad \text{(option E)}" />
              </>
            }
          >
            <p>
              Dividing by <Katex tex="x" /> is multiplying by <Katex tex="x^{-1}" />, and the power rule brings that{' '}
              <Katex tex="-1" /> down as a factor, so <Katex tex="\tfrac{d}{dx}\bigl(p\,x^{-1}\bigr) = -p\,x^{-2}" />. Substituting
              back catches it: with <Katex tex="p=16" /> the true gradient at <Katex tex="x=-2" /> is{' '}
              <Katex tex="-4-\tfrac{16}{4}=-8" />, not <Katex tex="0" />. In fact <Katex tex="p=16" /> puts the turning point at{' '}
              <Katex tex="x=+2" />, the mirror image.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
