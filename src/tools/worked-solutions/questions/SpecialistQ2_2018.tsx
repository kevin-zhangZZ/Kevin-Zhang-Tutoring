// 2018 Specialist Mathematics — Exam 2, MCQ 2. VCAA examination report: 60% correct. The
// maximal domain of 1/√(arcsin(cx+d)). Question text transcribed from the original paper;
// VCAA printed no diagram and neither does the stem here (guide §7). Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 60, C: 23, D: 7, E: 0 },
  answer: 'B',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x) = \frac{1}{\sqrt{\sin^{-1}(cx+d)}}" />,
    reason: <>Two restrictions apply at once, and both have to be imposed.</>,
  },
  {
    working: <Katex display tex="-1 \le cx+d \le 1" />,
    reason: <>First: <Katex tex="\sin^{-1}" /> is only defined on <Katex tex="[-1,1]" />.</>,
  },
  {
    working: <Katex display tex="\sin^{-1}(cx+d) > 0" />,
    reason: <>Second: the square root needs a non-negative argument, and the whole thing is in a <em>denominator</em>, so zero is excluded too. Strictly greater than zero — the restriction option C misses.</>,
  },
  {
    working: <Katex display tex="\sin^{-1}(u) > 0 \iff u > 0" />,
    reason: <><Katex tex="\sin^{-1}" /> is increasing and <Katex tex="\sin^{-1}(0)=0" />, so it is positive exactly when its argument is.</>,
  },
  {
    working: <Katex display tex="0 < cx+d \le 1" />,
    reason: <>Combining. The lower end is open (from the denominator), the upper end closed (the square root of <Katex tex="\tfrac{\pi}{2}" /> is perfectly fine).</>,
  },
  {
    working: <Katex display tex="-d < cx \le 1-d \implies -\frac{d}{c} < x \le \frac{1-d}{c}" />,
    reason: <>Dividing by <Katex tex="c" />. The inequality signs keep their direction because <Katex tex="c>0" /> is given — that condition is in the question for exactly this reason.</>,
  },
  {
    working: <Katex display tex="\boxed{-\frac{d}{c} < x \le \frac{1-d}{c}}" />,
    reason: <>Matches option <b>B</b>. Option <b>C</b>, chosen by <Katex tex="23\%" />, uses <Katex tex="\tfrac{-1-d}{c}\le x" /> — it imposes only the <Katex tex="\sin^{-1}" /> domain and forgets that the denominator cannot be zero or the square root negative, so it keeps the entire left half of the interval that should be discarded.</>,
  },
]

export default function SpecialistQ2_2018() {
  return (
    <MCQShell
      question={
        <p>
          Consider the function <Katex tex="f" /> with rule{' '}
          <Katex tex="f(x)=\dfrac{1}{\sqrt{\sin^{-1}(cx+d)}}" />, where{' '}
          <Katex tex="c,d\in R" /> and <Katex tex="c>0" />. The domain of{' '}
          <Katex tex="f" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="x>-\dfrac{d}{c}" /> },
        { letter: 'B', content: <Katex tex="-\dfrac{d}{c}<x\le\dfrac{1-d}{c}" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\dfrac{-1-d}{c}\le x\le\dfrac{1-d}{c}" /> },
        { letter: 'D', content: <Katex tex="x\in R\setminus\left\{-\dfrac{d}{c}\right\}" /> },
        { letter: 'E', content: <Katex tex="x\in R" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="Stack the restrictions">
          <p>
            Composite functions like this one restrict the domain in layers, and every layer
            counts. Work from the inside out: what does <Katex tex="\sin^{-1}" /> need, then
            what does the square root need, then what does the fraction need.
          </p>
          <p>
            The last two combine into one strict inequality. A square root wants{' '}
            <Katex tex="\ge0" />, a denominator wants <Katex tex="\ne0" />, so together they
            want <Katex tex="{}>0" />. Getting only the <Katex tex="\sin^{-1}" /> condition
            gives option C, which is why it drew almost a quarter of the state.
          </p>
        </Background>
      }
    />
  )
}
