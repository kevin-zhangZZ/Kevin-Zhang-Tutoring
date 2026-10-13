// 2016 Mathematical Methods — Exam 2, MCQ 9. VCAA examination report: 41% correct.
// Derive ∫xe^(kx)dx by antidifferentiating a given derivative identity and rearranging.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 11, B: 16, C: 9, D: 41, E: 21 },
  answer: 'D',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="\dfrac{d\left(xe^{kx}\right)}{dx}=(kx+1)e^{kx}" />
      <br />
      <Katex tex="\displaystyle\int\left((kx+1)e^{kx}\right)dx=xe^{kx}+c_1" />
      <br />
      <Katex tex="\displaystyle\int\left(kxe^{kx}\right)dx+\int\left(e^{kx}\right)dx=xe^{kx}+c_1" />
      <br />
      <Katex tex="\displaystyle\int\left(kxe^{kx}\right)dx=xe^{kx}-\int\left(e^{kx}\right)dx+c_1" />
      <br />
      <Katex tex="\displaystyle\int\left(xe^{kx}\right)dx=\frac1k\left(xe^{kx}-\int\left(e^{kx}\right)dx\right)+c" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\frac{d}{dx}\bigl(xe^{kx}\bigr) = (kx+1)e^{kx}" />,
    reason: <>Start from the given derivative: the question supplies it so you can antidifferentiate it, rather than integrate <Katex tex="xe^{kx}" /> directly.</>,
    more: <>In Methods you can't integrate <Katex tex="xe^{kx}" /> by a standard rule. The technique is <em>antidifferentiation by recognition</em>: a given derivative tells you an antiderivative for free, and you then rearrange to get the integral you want.</>,
  },
  {
    working: <Katex display tex="xe^{kx} = \int (kx+1)e^{kx}\,dx" />,
    reason: <>Antidifferentiate both sides (constants are collected as one <Katex tex="+\,c" /> at the end): <Katex tex="xe^{kx}" /> is an antiderivative of <Katex tex="(kx+1)e^{kx}" />, by the given identity.</>,
    more: <>Strictly this line holds only up to a constant, which the report writes as <Katex tex="+\,c_1" />. Leaving it out until the last line changes nothing, because any constant divided by <Katex tex="k" /> is still just a constant.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\int (kx+1)e^{kx}\,dx = k\int xe^{kx}\,dx + \int e^{kx}\,dx" />
        <Katex display tex="\implies\; xe^{kx} = k\int xe^{kx}\,dx + \int e^{kx}\,dx" />
      </>
    ),
    reason: <>Expand <Katex tex="(kx+1)e^{kx}=kxe^{kx}+e^{kx}" /> and split the integral; the first piece is <Katex tex="k" /> times the integral wanted.</>,
  },
  {
    working: <Katex display tex="k\int xe^{kx}\,dx = xe^{kx} - \int e^{kx}\,dx" />,
    reason: <>Rearrange to isolate <Katex tex="\int xe^{kx}\,dx" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\int xe^{kx}\,dx = \frac{1}{k}\left(xe^{kx} - \int e^{kx}\,dx\right) + c}" />,
    reason: <>Divide by <Katex tex="k" />. Matches option <b>D</b> — an answer may legitimately still contain an integral.</>,
    more: <>Option E (21%) is not the same thing: evaluating D fully, using <Katex tex="\int e^{kx}\,dx=\tfrac1ke^{kx}" />, gives <Katex tex="\tfrac1kxe^{kx}-\tfrac1{k^2}e^{kx}+c" />, whereas E puts <Katex tex="\tfrac1{k^2}" /> on the <Katex tex="xe^{kx}" /> term as well. Differentiating E gives <Katex tex="\tfrac1kxe^{kx}+\tfrac{1-k}{k^2}e^{kx}" />, which is not <Katex tex="xe^{kx}" />. Option B is just <Katex tex="\tfrac1k" /> times the given derivative. A divides by <Katex tex="kx+1" />, but an integral can't be undone by dividing out a factor. C drops the <Katex tex="xe^{kx}" /> term and the constant.</>,
  },
]

export default function MethodsQ9_2016() {
  return (
    <MCQShell
      question={
        <p>
          Given that <Katex tex="\dfrac{d}{dx}\bigl(xe^{kx}\bigr) = (kx+1)e^{kx}" />, then{' '}
          <Katex tex="\displaystyle\int xe^{kx}\,dx" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{xe^{kx}}{kx+1}+c" /> },
        { letter: 'B', content: <Katex tex="\left(\dfrac{kx+1}{k}\right)e^{kx}+c" /> },
        { letter: 'C', content: <Katex tex="\dfrac1k\displaystyle\int e^{kx}\,dx" /> },
        { letter: 'D', content: <Katex tex="\dfrac1k\left(xe^{kx}-\displaystyle\int e^{kx}\,dx\right)+c" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\dfrac{1}{k^2}\left(xe^{kx}-e^{kx}\right)+c" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
