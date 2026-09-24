// 2019 Chemistry Exam, MCQ 18. VCAA examination report: 24% correct. Which galvanic cell
// produces the largest cell voltage under standard laboratory conditions, comparing four
// candidate half-cell pairs. Question text transcribed from the original paper. The working uses
// the 2026 Data Book's E° values; where they differ from the report's (Ni²⁺/Ni), a note says so.
// Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import { DataBookNote } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import optASrc from './chem-2019-mcq18-optA.png'
import optBSrc from './chem-2019-mcq18-optB.png'
import optCSrc from './chem-2019-mcq18-optC.png'
import optDSrc from './chem-2019-mcq18-optD.png'

const opt = (src: string, alt: string) => (
  <img src={src} alt={`${alt} — from the original 2019 VCAA exam paper`} className="w-full max-w-[240px] bg-white rounded" />
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 24, B: 38, C: 16, D: 21 },
  answer: 'A',
  comment: (
    <>
      <i>E</i><sub>cell</sub> = <i>E</i>°(oxidising agent half-cell) - <i>E</i>°(reducing agent
      half-cell)
      <br />
      A. E[<Chem eq="Ni2+(aq)/Ni(s)//Zn2+(aq)/Zn(s)" />] = -0.25 V – (-0.76 V) = 0.51 V
      <br />
      B. E[<Chem eq="(H+(aq)/H2(g)//Fe2+(aq)/Fe(s)" />] = 0.0 V – (-0.44 V) = 0.44 V
      <br />
      C. E[<Chem eq="Ag+(aq)/Ag(s)//Cu2+(aq)/Cu(s)" />] = -0.80 V – (-0.34 V) = 0.46 V
      <br />
      D. Since one half-cell is just an inert electrode in water, this cell would not be expected to
      generate a voltage.
      <br />
      While there are half-cells on the electrochemical series in which water acts as an oxidising
      agent or reducing agent, these half-cells contain acidic or alkaline solutions (e.g.{' '}
      <Chem eq="O2(g), H+(aq) / H2O(l)" /> and <Chem eq="H2O(l) / H2(g),OH-(aq)" />).
      <br />
      The popularity of Option B suggests that many students may have considered the relative
      half-cell potentials of <Chem eq="Cl2(g)/Cl-(aq)" /> or <Chem eq="O2(g),H+(aq)/H2O(l)" /> as
      pertinent to the half-cell containing 1.0 M <Chem eq="HCl(aq)" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Chem eq="E_cell = E°(oxidising agent) - E°(reducing agent)" />,
    reason: <>Standard formula for a galvanic cell voltage, using the two half-cells' reduction potentials from the Data Book.</>,
  },
  {
    working: (
      <>
        A: <Chem eq="Ni2+/Ni" /> (−0.24 V) and <Chem eq="Zn2+/Zn" /> (−0.76 V)
        <br />
        <Chem eq="E_cell = -0.24 - (-0.76) = 0.52" /> V
      </>
    ),
    reason: <>Ni²⁺/Ni is the stronger oxidising agent of the pair, so it drives the reaction.<DataBookNote>the 2026 Data Book gives <i>E</i>°(Ni²⁺/Ni) = −0.24 V; the 2019 Data Book, used by the paper and the report, gave −0.25 V, which is why the report has 0.51 V. Cell A is still the largest, so the answer is unchanged.</DataBookNote></>,
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
    reason: <>Not a genuine candidate — this rules D out immediately.</>,
  },
  {
    working: <Chem eq="0.52 > 0.46 > 0.44 > 0 " />,
    reason: <>Compare the three genuine candidates.</>,
  },
  {
    working: <b>Cell A produces the largest voltage, 0.52 V.</b>,
    reason: <>Matches option <b>A</b>. Option <b>B</b>, the most common choice, gives only 0.44 V with the <Chem eq="H+/H2" /> half-cell; the report suggests students paired the HCl half-cell with the chlorine or oxygen half-cells instead. (The report&rsquo;s line for C reads −0.80 V − (−0.34 V); it means 0.80 V − 0.34 V = 0.46 V.)</>,
  },
]

export default function ChemistryQ18_2019() {
  return (
    <MCQShell
      question={<p>Which one of the following galvanic cells will produce the largest cell voltage under standard laboratory conditions (SLC)?</p>}
      options={[
        { letter: 'A', content: opt(optASrc, 'A galvanic cell: a Zn electrode in 1.0 M Zn(NO3)2 and a Ni electrode in 1.0 M Ni(NO3)2, joined by a salt bridge'), isAnswer: true },
        { letter: 'B', content: opt(optBSrc, 'A galvanic cell: an Fe electrode in 1.0 M Fe(NO3)2 and a Pt electrode in 1.0 M HCl, joined by a salt bridge') },
        { letter: 'C', content: opt(optCSrc, 'A galvanic cell: an Ag electrode in 1.0 M AgNO3 and a Cu electrode in 1.0 M Cu(NO3)2, joined by a salt bridge') },
        { letter: 'D', content: opt(optDSrc, 'A galvanic cell: an Sn electrode in 1.0 M Sn(NO3)2 and a Pt electrode in pure water, joined by a salt bridge') },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
