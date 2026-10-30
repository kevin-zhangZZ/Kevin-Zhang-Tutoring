// 2020 Chemistry Exam, MCQ 3. VCAA examination report: 86% correct. Reading the direction of
// electron flow in a galvanic cell to identify the electrode in the oxidation half-cell and the
// electrolyte in the reduction half-cell. Question text transcribed from the original paper; the
// cell diagram is cropped from the original VCAA exam PDF. VCAA report only. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import cellSrc from './chem-2020-mcq3-cell.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 2, C: 86, D: 3 },
  answer: 'C',
  noAnswer: 0,
  comment: <>Electrons leave the site of oxidation and move to the site of reduction, i.e. from Q to S, which is immersed in electrolyte R.</>,
}

const opt = (electrode: string, electrolyte: string) => (
  <>
    Electrode (oxidation half-cell): {electrode} · Electrolyte (reduction half-cell): {electrolyte}
  </>
)

const ROWS: WorkingRow[] = [
  {
    working: <>Oxidation produces electrons; reduction uses them. So electrons flow through the wire <b>from</b> the oxidation electrode (anode) <b>to</b> the reduction electrode (cathode).</>,
    reason: <>In a galvanic cell the electrons are released by the reductant at the anode, travel through the external circuit (here, through the voltmeter V) and are taken up by the oxidant at the cathode. &lsquo;<b>An Ox</b>, <b>Red Cat</b>&rsquo;: anode – oxidation, reduction – cathode.</>,
  },
  {
    working: <>The e⁻ arrows point from Q towards S, so Q is the <b>anode</b> (oxidation) and S is the <b>cathode</b> (reduction).</>,
    reason: <>Both arrows in the diagram point left to right, away from Q and towards S.</>,
  },
  {
    working: <>Q stands in electrolyte P → P is the oxidation half-cell.<br />S stands in electrolyte R → <b>R is the reduction half-cell&rsquo;s electrolyte</b>.</>,
    reason: <>Each electrode belongs to the half-cell whose beaker it dips into. The black inverted U joining the two beakers is the salt bridge.</>,
  },
  {
    working: <b>Electrode (oxidation half-cell): Q · Electrolyte (reduction half-cell): R</b>,
    reason: <>Matches option <b>C</b>. Option <b>A</b> (S and P) reads the electron flow backwards: it treats S as the anode and P as the reduction half-cell, swapping both answers. Option <b>D</b> has the right electrode but gives P, the electrolyte of the <i>oxidation</i> half-cell. Option <b>B</b> has the right electrolyte but takes S, the cathode, as the oxidation electrode.</>,
  },
]

export default function ChemistryQ3_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">A diagram of an electrochemical cell is shown below.</p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={cellSrc}
              alt="Two beakers joined by a salt bridge. The left beaker holds electrolyte P and a cross-hatched electrode Q; the right beaker holds electrolyte R and a wavy-patterned electrode S. A wire from Q through a voltmeter V to S carries arrows labelled e⁻ pointing from Q towards S — from the original 2020 VCAA exam paper"
              className="w-full max-w-[460px]"
            />
          </div>
          <p>
            Which of the following gives the correct combination of the electrode in the oxidation
            half-cell and the electrolyte in the reduction half-cell?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: opt('S', 'P') },
        { letter: 'B', content: opt('S', 'R') },
        { letter: 'C', content: opt('Q', 'R'), isAnswer: true },
        { letter: 'D', content: opt('Q', 'P') },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
