// 2020 Mathematical Methods — Exam 2, MCQ 5. VCAA examination report: 83% correct.
// The asymptotes of a rational function. Question text transcribed from the original paper; solution is original.
// Answer E checked with sympy (apart gives f(x) = −3 − 17/(x − 5); limits at ±∞ are −3), against the
// VCAA report (no comment printed for this question) and itute (E). The proper-fraction route follows
// the LMKMaths video (whose caption reads "−7 on x − 5"; it is −17, as Mr Nie's video and sympy give).
// Distractors: D (y = 3) is 3 ÷ 1, the x-coefficients of top and bottom with the minus sign of −x
// dropped; B swaps E's two values between x and y; A and C put the vertical asymptote where the
// denominator is not zero (f(2/3) = 12/13 is defined).
// Interactive diagram (§15): interactives/meth-2020e2-mcq5-gap.tsx draws f with the violet gap
// 17/(5 − x) between the curve and y = −3, with the top and bottom read out, near x = 5 and zoomed out
// to ±400, beside option D's y = 3. This site's own explanatory figure; VCAA printed no diagram.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const GapWidget = lazyWidget(() => import('../interactives/meth-2020e2-mcq5-gap'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 3, C: 3, D: 7, E: 83 },
  answer: 'E',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="5-x = 0 \implies x = 5" />,
    reason: <>A vertical asymptote comes from a zero of the denominator. Check the numerator isn&apos;t zero there too: at <Katex tex="x=5" /> the top is <Katex tex="3(5)+2=17" />, so near <Katex tex="x=5" /> we divide 17 by something tiny and the graph blows up.</>,
  },
  {
    working: <Katex display tex="f(x) = \frac{3x+2}{5-x} = -\frac{3x+2}{x-5} = -\frac{3(x-5)+17}{x-5}" />,
    reason: <>For the horizontal asymptote, write <Katex tex="f" /> as a proper fraction: a constant plus a fraction that shrinks to 0. Take the minus sign out of the bottom so <Katex tex="x" /> has coefficient <Katex tex="+1" />, then write the top as a multiple of <Katex tex="x-5" /> plus what&apos;s left over: <Katex tex="3(x-5)=3x-15" />, and <Katex tex="3x+2" /> is 17 more than that.</>,
  },
  {
    working: <Katex display tex="= -3-\frac{17}{x-5}" />,
    reason: <>Split the fraction: <Katex tex="-\tfrac{3(x-5)}{x-5}=-3" />. This is the hyperbola form <Katex tex="\tfrac{a}{x-h}+k" />, whose asymptotes are <Katex tex="x=h" /> and <Katex tex="y=k" />: here <Katex tex="x=5" /> and <Katex tex="y=-3" />.</>,
  },
  {
    working: <Katex display tex="x\to\pm\infty: \ \frac{17}{x-5}\to 0, \ \text{ so } f(x)\to -3" />,
    reason: <>As <Katex tex="x" /> gets large either way, the fraction part shrinks to 0 and the graph settles onto <Katex tex="y=-3" />. The quick way to see the sign: for huge <Katex tex="x" /> the <Katex tex="+2" /> and the 5 hardly matter, so <Katex tex="f(x)\approx\tfrac{3x}{-x}=-3" />. The top and bottom have opposite signs out there, so the ratio is negative.</>,
    more: <>Slide <Katex tex="x" /> far away in the diagram below.</>,
  },
  {
    working: <Katex display tex="\boxed{x = 5, \quad y = -3}" />,
    reason: <>Matches option <b>E</b>. Check with a big value: <Katex tex="f(1000)=\tfrac{3002}{-995}\approx-3.02" />, close to <Katex tex="-3" />. Option <b>D</b>, the most popular wrong answer, has the right vertical asymptote but <Katex tex="y=3" />: that is <Katex tex="3\div1" />, the <Katex tex="x" />-coefficients of the top and bottom with the minus sign of <Katex tex="-x" /> dropped. <b>B</b> swaps the two values between <Katex tex="x" /> and <Katex tex="y" />, and <b>A</b> and <b>C</b> put the vertical asymptote where the denominator isn&apos;t zero (<Katex tex="f\!\left(\tfrac23\right)=\tfrac{12}{13}" /> is defined, for instance).</>,
  },
]

export default function MethodsQ5_2020() {
  return (
    <MCQShell
      question={
        <p>
          The graph of the function <Katex tex="f:D\to R" />,{' '}
          <Katex tex="f(x)=\dfrac{3x+2}{5-x}" />, where <Katex tex="D" /> is the maximal
          domain, has asymptotes
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="x=-5,\ y=\tfrac32" /> },
        { letter: 'B', content: <Katex tex="x=-3,\ y=5" /> },
        { letter: 'C', content: <Katex tex="x=\tfrac23,\ y=-3" /> },
        { letter: 'D', content: <Katex tex="x=5,\ y=3" /> },
        { letter: 'E', content: <Katex tex="x=5,\ y=-3" />, isAnswer: true },
      ]}
      rows={ROWS}
      background={
        <Background title="Asymptotes of a hyperbola y = a/(x − h) + k">
          <p>
            A <b>vertical asymptote</b> sits where the denominator is 0 but the numerator isn&apos;t: dividing a fixed number by
            something ever closer to 0 gives something ever larger, so the graph shoots up or down beside that line.
          </p>
          <p>
            A <b>horizontal asymptote</b> is the value the function settles towards as <Katex tex="x\to\pm\infty" />. For a
            fraction whose top and bottom are both linear, divide it out into a constant plus a proper fraction:
          </p>
          <Katex display tex="y = \frac{a}{x-h} + k \quad\text{has asymptotes}\quad x = h,\ \ y = k." />
          <p>
            The fraction part shrinks to 0 far away, leaving <Katex tex="k" />. A quick check: for huge <Katex tex="x" /> only the{' '}
            <Katex tex="x" /> terms matter, so <Katex tex="y" /> approaches the ratio of the <Katex tex="x" />-coefficients, signs
            included.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="f(x) = −3 + 17/(5 − x): the curve is the line y = −3 plus a gap that blows up at x = 5 and dies away far out">
            <GapWidget />
          </Explore>
          <WrongMethod
            title="The horizontal asymptote is the ratio of the x-coefficients: 3 over 1"
            source="7% chose D"
            working={
              <>
                <Katex display tex="y = \tfrac31 = 3, \quad x = 5" />
                <Katex display tex="\implies \text{option D}" />
              </>
            }
          >
            <p>
              The ratio idea is fine, but the coefficient of <Katex tex="x" /> in <Katex tex="5-x" /> is <Katex tex="-1" />, not 1. It&apos;s
              easy to miss because the <Katex tex="x" /> term is written second. For large <Katex tex="x" />,{' '}
              <Katex tex="f(x)\approx\tfrac{3x}{-x}=-3" />.
            </p>
            <p>
              Two safe habits: rewrite the bottom as <Katex tex="-(x-5)" /> before anything else, or test a big value.{' '}
              <Katex tex="f(1000)\approx-3.02" /> is nowhere near 3.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
