// 2019 Specialist Mathematics — Exam 2, MCQ 3. VCAA examination report: 65% correct. The
// implied domain of 1 − sec(x + π/4). Question text transcribed from the original paper
// (no diagram). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 1, C: 24, D: 65, E: 8 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\sec(\theta) = \dfrac{1}{\cos(\theta)}" />,
    reason: <>So <Katex tex="\sec" /> is undefined exactly where <Katex tex="\cos" /> is zero — that is the only restriction here, since nothing else in the rule (no square root, no logarithm, no other fraction) can fail.</>,
  },
  {
    working: <Katex display tex="\cos\!\left(x+\dfrac{\pi}{4}\right)=0 \implies x+\dfrac{\pi}{4} = \dfrac{\pi}{2}+n\pi, \ n\in\mathbb{Z}" />,
    reason: <><Katex tex="\cos" /> is zero at every odd multiple of <Katex tex="\tfrac{\pi}{2}" />.</>,
  },
  {
    working: <Katex display tex="x = \dfrac{\pi}{2}-\dfrac{\pi}{4}+n\pi = \dfrac{\pi}{4}+n\pi" />,
  },
  {
    working: <Katex display tex="= \dfrac{\pi}{4}+\dfrac{4n\pi}{4} = \dfrac{(4n+1)\pi}{4}" />,
    reason: <>Putting it over a common denominator of <Katex tex="4" /> to match the form of the options.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathbb{R}\setminus\left\{\dfrac{(4n+1)\pi}{4}\right\},\ n\in\mathbb{Z}}" />,
    reason: <>Matches option <b>D</b>. Sanity-check by listing a few: <Katex tex="n=0" /> gives <Katex tex="\tfrac{\pi}{4}" />, <Katex tex="n=1" /> gives <Katex tex="\tfrac{5\pi}{4}" />, <Katex tex="n=-1" /> gives <Katex tex="-\tfrac{3\pi}{4}" /> — each is <Katex tex="\pi" /> apart, as it should be. Option <b>C</b>, <Katex tex="\tfrac{(4n-1)\pi}{4}" />, gives <Katex tex="-\tfrac{\pi}{4},\ \tfrac{3\pi}{4},\dots" />, which is the set where <Katex tex="\cos\left(x+\tfrac{\pi}{4}\right)" /> equals <Katex tex="\pm1" />, not zero.</>,
  },
]

export default function SpecialistQ3_2019() {
  return (
    <MCQShell
      question={<p>The implied domain of the function with rule <Katex tex="f(x)=1-\sec\!\left(x+\dfrac{\pi}{4}\right)" /> is</p>}
      options={[
        { letter: 'A', content: <Katex tex="\mathbb{R}" /> },
        { letter: 'B', content: <Katex tex="[0,2]" /> },
        { letter: 'C', content: <Katex tex="\mathbb{R}\setminus\left\{\tfrac{(4n-1)\pi}{4}\right\},\ n\in\mathbb{Z}" /> },
        { letter: 'D', content: <Katex tex="\mathbb{R}\setminus\left\{\tfrac{(4n+1)\pi}{4}\right\},\ n\in\mathbb{Z}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="\mathbb{R}\setminus\left\{\tfrac{(2n-1)\pi}{2}\right\},\ n\in\mathbb{Z}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
