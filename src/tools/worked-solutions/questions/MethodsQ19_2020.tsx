// 2020 Mathematical Methods — Exam 2, MCQ 19. VCAA examination report: 15% correct — the
// hardest MCQ on this paper. Relating the probability function for "6 rolled" to that for
// "6 not rolled" in 20 trials. Question text and diagram transcribed from the original paper.
// Solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 15, B: 33, C: 15, D: 9, E: 27 },
  answer: 'A',
  noAnswer: 1,
  comment: <Katex tex="q \sim \mathrm{Bi}\big(20,\tfrac56\big),\quad p \sim \mathrm{Bi}\big(20,\tfrac16\big) \;\implies\; q(w) = p(20-w)" />,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="X \sim \mathrm{Bi}\big(20,\tfrac16\big),\quad p(x) = \Pr(X=x)" />,
    reason: <><Katex tex="X" /> = number of 6s rolled in 20 trials; <Katex tex="p" /> is its probability function.</>,
  },
  {
    working: <Katex display tex="W = 20 - X,\quad q(w) = \Pr(W=w)" />,
    reason: <>Every trial is either a 6 or not a 6, so the number of "not-6"s, <Katex tex="W" />, is always exactly <Katex tex="20" /> minus the number of 6s.</>,
  },
  {
    working: <Katex display tex="q(w) = \Pr(W=w) = \Pr(20-X=w) = \Pr(X=20-w)" />,
    reason: <>Rewrite the event <Katex tex="\{W=w\}" /> in terms of <Katex tex="X" />.</>,
  },
  {
    working: <Katex display tex="\boxed{q(w) = p(20-w)}" />,
    reason: <>Since <Katex tex="\Pr(X=20-w) = p(20-w)" /> by definition — matches option <b>A</b>.</>,
  },
  {
    working: <>e.g. <Katex tex="q(19)=p(1)" />, <Katex tex="q(18)=p(2)" />, matching one "no 6" occurring in a specific way to one "6" occurring, mirrored.</>,
    reason: 'Sanity check with the graph: q needs to be a mirror image of p (high probability near w=20−(mean of X), just as p peaks near its own mean).',
  },
]

export default function MethodsQ19_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Shown below is the graph of <Katex tex="p" />, which is the probability function for the number of
            times, <Katex tex="x" />, that a '6' is rolled on a fair six-sided die in 20 trials.
          </p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-2xl p-3 w-fit">
            <svg viewBox="0 0 420 220" className="w-full max-w-[380px]">
              <line x1="40" y1="190" x2="410" y2="190" stroke="currentColor" strokeWidth="1.5" className="text-gray-400" />
              <line x1="40" y1="190" x2="40" y2="10" stroke="currentColor" strokeWidth="1.5" className="text-gray-400" />
              {[0.03,0.11,0.2,0.24,0.2,0.13,0.065,0.03,0.013,0.005,0.002].map((p,i) => (
                <circle key={i} cx={40+i*17} cy={190-p*530} r="3" className="fill-sky-600 dark:fill-sky-400" />
              ))}
              {Array.from({length:9},(_,i)=>(
                <circle key={`z${i}`} cx={40+(11+i)*17} cy={188} r="2.5" className="fill-sky-600 dark:fill-sky-400" />
              ))}
              <text x="8" y="55" fontSize="10" className="fill-gray-500 dark:fill-gray-400">0.3</text>
              <text x="8" y="100" fontSize="10" className="fill-gray-500 dark:fill-gray-400">0.2</text>
              <text x="8" y="145" fontSize="10" className="fill-gray-500 dark:fill-gray-400">0.1</text>
              <text x="200" y="210" fontSize="11" className="fill-gray-500 dark:fill-gray-400">x</text>
              <text x="30" y="8" fontSize="11" className="fill-gray-500 dark:fill-gray-400">p(x)</text>
            </svg>
          </div>
          <p>
            Let <Katex tex="q" /> be the probability function for the number of times, <Katex tex="w" />, that a '6'
            is <b>not</b> rolled on a fair six-sided die in 20 trials.
            <br />
            <Katex tex="q(w)" /> is given by
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="p(20-w)" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="p\!\left(1-\dfrac{w}{20}\right)" /> },
        { letter: 'C', content: <Katex tex="p\!\left(\dfrac{w}{20}\right)" /> },
        { letter: 'D', content: <Katex tex="p(w-20)" /> },
        { letter: 'E', content: <Katex tex="1-p(w)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
