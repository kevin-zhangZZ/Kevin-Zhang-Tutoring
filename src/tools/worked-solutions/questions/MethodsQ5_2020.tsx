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
    reason: <>A vertical asymptote is where the denominator is 0 but the numerator isn&apos;t: at <Katex tex="x=5" /> the top is <Katex tex="3(5)+2=17\ne0" />.</>,
  },
  {
    working: <Katex display tex="f(x) = \frac{3x+2}{5-x} = -\frac{3x+2}{x-5} = -\frac{3(x-5)+17}{x-5}" />,
    reason: <>For the horizontal asymptote, write <Katex tex="f" /> as a constant plus a proper fraction. Take the minus sign out so the bottom is <Katex tex="x-5" />. Then <Katex tex="3(x-5)=3x-15" />, and <Katex tex="3x+2" /> is 17 more.</>,
  },
  {
    working: <Katex display tex="= -3-\frac{17}{x-5}" />,
    reason: <>Split the fraction: <Katex tex="-\tfrac{3(x-5)}{x-5}=-3" />. The hyperbola <Katex tex="\tfrac{a}{x-h}+k" /> has asymptotes <Katex tex="x=h" /> and <Katex tex="y=k" />: here <Katex tex="x=5" /> and <Katex tex="y=-3" />.</>,
  },
  {
    working: <Katex display tex="x\to\pm\infty: \ \frac{17}{x-5}\to 0, \ \text{ so } f(x)\to -3" />,
    reason: <>Far out either way, the fraction part shrinks to 0 and the graph settles onto <Katex tex="y=-3" />.</>,
    more: <>The quick way to see the sign: for huge <Katex tex="x" /> the <Katex tex="+2" /> and the 5 hardly matter, so <Katex tex="f(x)\approx\tfrac{3x}{-x}=-3" />. The top and bottom have opposite signs out there, so the ratio is negative. Slide <Katex tex="x" /> far away in the diagram below.</>,
  },
  {
    working: <Katex display tex="\boxed{x = 5, \quad y = -3}" />,
    reason: <>Matches option <b>E</b>.</>,
    more: <>Check with a big value: <Katex tex="f(1000)=\tfrac{3002}{-995}\approx-3.02" />, close to <Katex tex="-3" />. Option <b>D</b>, the most popular wrong answer, has the right vertical asymptote but <Katex tex="y=3" /> (the Common Mistake box below). <b>B</b> swaps the two values between <Katex tex="x" /> and <Katex tex="y" />, and <b>A</b> and <b>C</b> put the vertical asymptote where the denominator isn&apos;t zero (<Katex tex="f\!\left(\tfrac23\right)=\tfrac{12}{13}" /> is defined, for instance).</>,
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
            The fraction part shrinks to 0 far away, leaving <Katex tex="k" />.
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
              easy to miss because the <Katex tex="x" /> term is written second. The ratio is{' '}
              <Katex tex="\tfrac{3}{-1}=-3" />.
            </p>
            <p>
              Two safe habits: rewrite the bottom as <Katex tex="-(x-5)" /> before anything else, or test a big value, as in the
              check above: <Katex tex="f(1000)\approx-3.02" /> is nowhere near 3.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
