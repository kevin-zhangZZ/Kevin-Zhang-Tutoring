// 2023 Mathematical Methods — Exam 2, MCQ 7. VCAA examination report: 60% correct.
// The domain of a composite, and why differentiating does not shrink it further here. Question text transcribed from the original paper.
// Solution is original.
// Oct 2026 Concise/Detailed pass (no interactive: 60% correct): reasons trimmed; the composite-existence test,
// the x = -3 example, "read the derivative's domain from the original function" and the option analysis moved
// to `more`. Rechecked in sympy.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 12, C: 60, D: 7, E: 17 },
  answer: 'C',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="(f\circ g)(x) = f\big(g(x)\big) = \log_e\left(\sqrt{1-x}\right)" />,
    reason: <>Substituting <Katex tex="g(x)" /> into <Katex tex="f" />.</>,
  },
  {
    working: <Katex display tex="x<1 \implies 1-x>0 \implies \sqrt{1-x}>0" />,
    reason: <>To check that <Katex tex="f\circ g" /> exists, first find the outputs of <Katex tex="g" />. For <Katex tex="x<1" /> the expression under the root is positive, so the root is positive. It is never 0, since that would need <Katex tex="x=1" />, which is excluded.</>,
  },
  {
    working: <Katex display tex="\text{ran}(g) = (0,\infty) = \text{dom}(f)" />,
    reason: <>As <Katex tex="x\to1" /> the root shrinks towards 0, and as <Katex tex="x\to-\infty" /> it grows without bound, so <Katex tex="g" /> outputs every positive number. That is exactly <Katex tex="\text{dom}(f)" />, so <Katex tex="\text{ran}(g)\subseteq\text{dom}(f)" /> and <Katex tex="f\circ g" /> exists.</>,
    more: (
      <>
        This is the test for any composite <Katex tex="f\circ g" />: every output of <Katex tex="g" /> must be an
        allowed input of <Katex tex="f" />. Had <Katex tex="g" /> been able to output 0 (for
        example, if its domain had been <Katex tex="x\le1" />), that <Katex tex="x" /> value would have had to be cut
        from the domain first.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{dom}(f\circ g) = \text{dom}(g) = (-\infty,1)" />,
    reason: <>When <Katex tex="f\circ g" /> exists, its domain is the domain of <Katex tex="g" />, because <Katex tex="x" /> goes into <Katex tex="g" /> first.</>,
    more: (
      <>
        So negative <Katex tex="x" /> values are allowed. For example, <Katex tex="x=-3" /> gives{' '}
        <Katex tex="g(-3)=\sqrt4=2" />, and then <Katex tex="f(2)=\log_e 2" />. The condition <Katex tex="x>0" /> attached
        to <Katex tex="f" /> applies to whatever goes into <Katex tex="f" />, which here is <Katex tex="g(x)" />, not{' '}
        <Katex tex="x" /> itself.
      </>
    ),
  },
  {
    working: <Katex display tex="(f\circ g)'(x) = \frac{1}{\sqrt{1-x}}\cdot\frac{-1}{2\sqrt{1-x}} = \frac{-1}{2(1-x)}" />,
    reason: <>Chain rule: <Katex tex="f'\big(g(x)\big)\,g'(x)" />, with <Katex tex="f'(u)=\tfrac1u" /> and <Katex tex="g'(x)=\tfrac{-1}{2\sqrt{1-x}}" />. The derivative exists at every point of <Katex tex="(-\infty,1)" />: the interval is open, so it has no endpoints, and this formula is defined throughout it.</>,
    more: (
      <>
        Read the domain of a derivative from the original function, not from the simplified rule. The rule{' '}
        <Katex tex="\tfrac{-1}{2(1-x)}" /> also gives numbers for <Katex tex="x>1" />, but a derivative only exists where
        its function exists, and <Katex tex="\log_e\left(\sqrt{1-x}\right)" /> is undefined there. A derivative&apos;s
        domain can be smaller than its function&apos;s (it loses the endpoints of a closed interval, and any sharp
        corners), but never larger.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{x\in(-\infty,1)}" />,
    reason: <>Matches option <b>C</b>, the domain of <Katex tex="g" />.</>,
    more: (
      <>
        Option <b>E</b>, <Katex tex="(0,1)" />, is the overlap of the two given domains. It applies the log&apos;s
        condition <Katex tex="x>0" /> to <Katex tex="x" /> itself rather than to <Katex tex="g(x)" />, and so throws away
        valid inputs such as <Katex tex="x=-3" />. Option <b>B</b> includes <Katex tex="x=1" />, which is outside the
        domain of <Katex tex="g" /> and would need <Katex tex="\log_e(0)" />. Option <b>D</b>,{' '}
        <Katex tex="(0,\infty)" />, is the domain of <Katex tex="f" />. Option <b>A</b> ignores both restrictions:{' '}
        <Katex tex="\sqrt{1-x}" /> alone already needs <Katex tex="x\le1" />.
      </>
    ),
  },
]

export default function MethodsQ7_2023() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="f(x)=\log_e x" />, where <Katex tex="x>0" />, and{' '}
          <Katex tex="g(x)=\sqrt{1-x}" />, where <Katex tex="x<1" />.
          <br />
          The domain of the derivative of <Katex tex="(f\circ g)(x)" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="x\in R" /> },
        { letter: 'B', content: <Katex tex="x\in(-\infty,1]" /> },
        { letter: 'C', content: <Katex tex="x\in(-\infty,1)" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="x\in(0,\infty)" /> },
        { letter: 'E', content: <Katex tex="x\in(0,1)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
