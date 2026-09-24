// 2020 Mathematical Methods — Exam 2, MCQ 19. VCAA examination report: 15% correct — the
// hardest MCQ on this paper. Relating the probability function for "6 rolled" to that for
// "6 not rolled" in 20 trials. Question text transcribed from the original paper; the
// diagram is cropped directly from the original VCAA exam PDF, not a redrawing. Solution
// is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import diagramSrc from './meth-2020-mcq19-probfunc.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 15, B: 33, C: 15, D: 9, E: 27 },
  answer: 'A',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="q\sim\mathrm{Bi}\left(20,\tfrac56\right),\ p\sim\mathrm{Bi}\left(20,\tfrac16\right)" />
      <br />
      Examples
      <br />
      <Katex tex="q(19)=\binom{20}{19}\left(\tfrac56\right)^{19}\left(\tfrac16\right)=p(1)=\binom{20}{1}\left(\tfrac16\right)\left(\tfrac56\right)^{19}" />
      <br />
      <Katex tex="q(18)=\binom{20}{18}\left(\tfrac56\right)^{18}\left(\tfrac16\right)^{2}=p(2)=\binom{20}{2}\left(\tfrac16\right)^{2}\left(\tfrac56\right)^{18}" />
      <br />
      In general
      <br />
      <Katex tex="q(w)=\binom{20}{w}\left(\tfrac56\right)^{w}\left(\tfrac16\right)^{20-w}=p(20-w)=\binom{20}{20-w}\left(\tfrac16\right)^{20-w}\left(\tfrac56\right)^{w}" />
      <br />
      <Katex tex="q(w)=p(20-w)" />
    </>
  ),
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
    working: <>e.g. <Katex tex="q(19)=p(1)" />, <Katex tex="q(18)=p(2)" />: nineteen non-6s is the same event as one 6.</>,
    reason: <>Sanity check with the graph: <Katex tex="q" /> is the mirror image of <Katex tex="p" /> in the line <Katex tex="w=10" />, peaking near <Katex tex="w=17" /> where <Katex tex="p" /> peaks near <Katex tex="x=3" />.</>,
  },
  {
    working: <Katex display tex="\boxed{q(w) = p(20-w)}" />,
    reason: <>Since <Katex tex="\Pr(X=20-w) = p(20-w)" /> by definition. Matches option <b>A</b>. Option <b>E</b>, <Katex tex="1-p(w)" />, takes the complement of a <em>probability</em> rather than of the count; option <b>B</b> treats <Katex tex="w" /> as a proportion; option <b>D</b> gives <Katex tex="p" /> a negative input.</>,
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
            <img src={diagramSrc} alt="Graph of p(x), the probability function for the number of 6s rolled in 20 trials, from the original 2020 VCAA exam paper" className="w-full max-w-[380px]" />
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
