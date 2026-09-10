// 2019 Chemistry Exam, MCQ 18. VCAA examination report: 24% correct. Which galvanic cell
// produces the largest cell voltage under standard laboratory conditions, comparing four
// candidate half-cell pairs. Question text transcribed from the original paper. Solution is
// original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 24, B: 38, C: 16, D: 21 },
  answer: 'A',
  comment: (
    <>
      <Chem eq="E_cell = E°(oxidising agent half-cell) - E°(reducing agent half-cell)" />. Option D
      pairs an inert Pt electrode with pure water — with no reactive ionic species present, this
      cell would not be expected to generate a voltage at all.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Chem eq="E_cell = E°(oxidising agent) - E°(reducing agent)" />,
    reason: 'Standard formula for a galvanic cell voltage, using the two half-cells\' reduction potentials from the Data Book.',
  },
  {
    working: (
      <>
        A: <Chem eq="Ni2+/Ni" /> (−0.25 V) and <Chem eq="Zn2+/Zn" /> (−0.76 V)
        <br />
        <Chem eq="E_cell = -0.25 - (-0.76) = 0.51" /> V
      </>
    ),
    reason: 'Ni²⁺/Ni is the stronger oxidising agent of the pair, so it drives the reaction.',
  },
  {
    working: (
      <>
        B: <Chem eq="H+/H2" /> (0.00 V) and <Chem eq="Fe2+/Fe" /> (−0.44 V)
        <br />
        <Chem eq="E_cell = 0.00 - (-0.44) = 0.44" /> V
      </>
    ),
  },
  {
    working: (
      <>
        C: <Chem eq="Ag+/Ag" /> (+0.80 V) and <Chem eq="Cu2+/Cu" /> (+0.34 V)
        <br />
        <Chem eq="E_cell = 0.80 - 0.34 = 0.46" /> V
      </>
    ),
  },
  {
    working: <>D: a Pt electrode in pure water — with no oxidising or reducing species present (other than water itself, which reacts far too weakly under these conditions), there's no realistic cell reaction to assign a voltage to.</>,
    reason: 'Not a genuine candidate — this rules D out immediately.',
  },
  {
    working: <Chem eq="0.51 > 0.46 > 0.44 > 0 " />,
    reason: 'Compare the three genuine candidates.',
  },
  {
    working: <b>Cell A produces the largest voltage, 0.51 V.</b>,
    reason: <>Matches option <b>A</b>.</>,
  },
]

export default function ChemistryQ18_2019() {
  return (
    <MCQShell
      question={<p>Which one of the following galvanic cells will produce the largest cell voltage under standard laboratory conditions (SLC)?</p>}
      options={[
        { letter: 'A', content: <>Zn(s) | 1.0 M Zn(NO₃)₂ ‖ 1.0 M Ni(NO₃)₂ | Ni(s)</>, isAnswer: true },
        { letter: 'B', content: <>Fe(s) | 1.0 M Fe(NO₃)₂ ‖ 1.0 M HCl(aq) | Pt(s), H₂(g)</> },
        { letter: 'C', content: <>Ag(s) | 1.0 M AgNO₃ ‖ 1.0 M Cu(NO₃)₂ | Cu(s)</> },
        { letter: 'D', content: <>Sn(s) | 1.0 M Sn(NO₃)₂ ‖ pure water | Pt(s)</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
