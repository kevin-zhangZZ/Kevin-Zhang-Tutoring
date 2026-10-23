// 2026 Mathematical Methods NHT — Exam 2, MCQ 8. The NHT report gives the answer key only, with no
// statistics; its comment is transcribed below from the rendered report. Algebra: finding the first invalid step in an attempted solution of an exponential
// equation (a false "law of logarithms" for a quotient of logs). Question text, including the
// boxed sequence of steps, transcribed from the original paper. Solution is original; the answer C
// agrees with the report's key. Checked with sympy: the true solution is
// x = log2(3)/log2(3/4) = log_e(3)/log_e(3/4) ≈ −3.819, while log2(9/4) ≈ 1.170.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: 'C',
  comment: (
    <>
      The <b>first</b> step containing an error is Step 4.
      <br />
      Step 4 – expressing <Katex tex="x=\dfrac{\log_2(3)}{\log_2\left(\frac34\right)}" /> as{' '}
      <Katex tex="x=\log_2\left(3-\dfrac34\right)" /> is <b>not</b> correct.
      <br />
      Step 5 – expressing <Katex tex="x=\log_2\left(\dfrac94\right)" /> as <Katex tex="x=\sqrt{\dfrac94}" /> is{' '}
      <b>not</b> correct.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\text{Step 1: }\ \log_2\!\left(\left(\tfrac34\right)^x\right)=\log_2(3)\quad\checkmark" />,
    reason: <>Taking the same logarithm of both sides is valid: both sides are positive, and equal numbers have equal logs.</>,
  },
  {
    working: <Katex display tex="\text{Step 2: }\ x\log_2\!\left(\tfrac34\right)=\log_2(3)\quad\checkmark" />,
    reason: <>The power law, <Katex tex="\log_b(m^n)=n\log_b(m)" />, brings the <Katex tex="x" /> down. Correct.</>,
  },
  {
    working: <Katex display tex="\text{Step 3: }\ x=\frac{\log_2(3)}{\log_2\left(\frac34\right)}\quad\checkmark" />,
    reason: <>Divide both sides by the number <Katex tex="\log_2\left(\tfrac34\right)" /> (which is not zero). Correct — this is in fact the exact answer.</>,
  },
  {
    working: <Katex display tex="\text{Step 4: }\ \frac{\log_2(3)}{\log_2\left(\frac34\right)}\ \neq\ \log_2\!\left(3-\tfrac34\right)\quad\times" />,
    reason: <>There is no log law for a <b>quotient of two logs</b>. The quotient law is <Katex tex="\log_b(m)-\log_b(n)=\log_b\left(\tfrac mn\right)" /> — a <em>difference</em> of logs becomes the log of a <em>quotient</em>, not the other way round.</>,
    more: <>Numerically: <Katex tex="\dfrac{\log_2(3)}{\log_2(3/4)}\approx\dfrac{1.585}{-0.415}\approx-3.82" />, but <Katex tex="\log_2\left(\tfrac94\right)\approx1.17" />. Even the sign is wrong: <Katex tex="\left(\tfrac34\right)^x=3>1" /> needs a negative <Katex tex="x" />, because a positive power of <Katex tex="\tfrac34" /> is less than 1.</>,
  },
  {
    working: <Katex display tex="\text{Step 5: }\ \log_2\!\left(\tfrac94\right)\neq\sqrt{\tfrac94}\quad\times" />,
    reason: <>Step 5 is wrong too — <Katex tex="\log_2" /> is not a square root: <Katex tex="\log_2\left(\tfrac94\right)\approx1.17" />, while <Katex tex="\sqrt{\tfrac94}=1.5" />. But it is not the <b>first</b> error.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Step 4}}" />,
    reason: <>Matches option <b>C</b>. Check the final "answer": <Katex tex="\left(\tfrac34\right)^{3/2}\approx0.65\ne3" />, so the attempt really is wrong; the correct solution is <Katex tex="x=\tfrac{\log_e(3)}{\log_e(3/4)}\approx-3.819" />, and <Katex tex="\left(\tfrac34\right)^{-3.819}\approx3" /> ✓.</>,
    more: <>Option <b>D</b> (step 5) is also an error, but the question asks for the <b>first</b> one. Options A and B are valid steps.</>,
  },
]

export default function MethodsQ8_2026NHT() {
  return (
    <MCQShell
      question={
        <div className="flex flex-col gap-3">
          <p>
            The following sequence of steps is an attempt to solve the exponential
            equation <Katex tex="\left(\dfrac34\right)^x=3" />.
          </p>
          <p>The sequence of steps contains at least one error.</p>
          <div className="border border-gray-300 dark:border-gray-700 rounded-xl px-5 py-4 w-fit max-w-full overflow-x-auto flex flex-col gap-3">
            <div>
              <p><b>Step 1</b> Take a logarithm of both sides:</p>
              <Katex display tex="\log_2\!\left(\left(\frac34\right)^x\right)=\log_2(3)" />
            </div>
            <div>
              <p><b>Step 2</b> Use a law of logarithms to rewrite the equation:</p>
              <Katex display tex="x\log_2\!\left(\frac34\right)=\log_2(3)" />
            </div>
            <div>
              <p><b>Step 3</b> Make <Katex tex="x" /> the subject of the equation:</p>
              <Katex display tex="x=\frac{\log_2(3)}{\log_2\left(\frac34\right)}" />
            </div>
            <div>
              <p><b>Step 4</b> Use a law of logarithms to simplify the fraction:</p>
              <Katex display tex="\begin{aligned}x&=\log_2\!\left(3-\frac34\right)\\&=\log_2\!\left(\frac94\right)\end{aligned}" />
            </div>
            <div>
              <p><b>Step 5</b> Evaluate the base 2 logarithm using a square root:</p>
              <Katex display tex="\begin{aligned}x&=\sqrt{\frac94}\\&=\frac32\end{aligned}" />
            </div>
          </div>
          <p>The <b>first</b> step containing an error is</p>
        </div>
      }
      options={[
        { letter: 'A', content: <>step 2</> },
        { letter: 'B', content: <>step 3</> },
        { letter: 'C', content: <>step 4</>, isAnswer: true },
        { letter: 'D', content: <>step 5</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
