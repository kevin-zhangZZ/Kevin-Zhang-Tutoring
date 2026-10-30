// 2022 Chemistry Exam, MCQ 4. VCAA examination report: 56% correct. Identifying the diagram that
// shows the common design features of a fuel cell: a load (not a power source), fuel oxidised at
// the anode, air (O2) reduced at the cathode, excess fuel leaving on the anode side. Question text
// transcribed from the original paper; the four fuel-cell diagrams (options) are cropped from the
// original VCAA exam PDF. VCAA report only. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import optASrc from './chem-2022-mcq4-optA.png'
import optBSrc from './chem-2022-mcq4-optB.png'
import optCSrc from './chem-2022-mcq4-optC.png'
import optDSrc from './chem-2022-mcq4-optD.png'

const opt = (src: string, alt: string) => (
  <img loading="lazy" decoding="async" src={src} alt={`${alt} — from the original 2022 VCAA exam paper`} className="w-full max-w-[300px] bg-white rounded" />
)

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 56, B: 7, C: 24, D: 13 },
  answer: 'A',
  comment: (
    <>
      In a fuel cell, the fuel is oxidised at the anode, and O₂ is reduced at the cathode.
      <br />
      Excess fuel can only be removed at the anode.
      <br />
      Since a fuel cell converts chemical energy to electrical energy it provides electrical energy
      to the load (device) to which it is connected.
      <br />
      Power sources are part of electrolytic cells and secondary cells but not fuel cells.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>A fuel cell is a <b>galvanic</b> cell: chemical energy → electrical energy. So it is connected to a <b>load</b> (the device it powers), not a power source.</>,
    reason: <>A power source is what drives an <i>electrolytic</i> cell (or recharges a secondary cell). A fuel cell makes its own electricity from the fuel, so it needs no power source. This rules out <b>B</b> and <b>C</b>.</>,
  },
  {
    working: <>Fuel (e.g. H₂) is <b>oxidised</b> → it enters at the <b>anode</b>.<br />O₂ from the air is <b>reduced</b> → it enters at the <b>cathode</b>.</>,
    reason: <>&ldquo;An Ox, Red Cat&rdquo;: oxidation at the anode, reduction at the cathode. The fuel is the reductant (it loses electrons) and O₂ is the oxidant (it gains electrons). D labels the electrode at the fuel inlet the cathode, which is backwards — this rules out <b>D</b>.</>,
  },
  {
    working: <>Unreacted fuel can only leave from the fuel (anode) side; the cathode side releases products only.</>,
    reason: <>Each reactant flows past its own electrode, kept apart from the other reactant by the electrolyte. Fuel never reaches the air side, so &ldquo;excess fuel&rdquo; can&rsquo;t come out there — another reason B is wrong.</>,
  },
  {
    working: <b>Load · fuel in at the anode · air in at the cathode · excess fuel out on the anode side only.</b>,
    reason: <>Only diagram A has every feature: matches option <b>A</b>. Option <b>C</b> is identical to A except for the power source — it describes an electrolytic cell&rsquo;s energy supply, not a fuel cell. Option <b>D</b> has the load but swaps the anode and cathode. Option <b>B</b> has a power source and shows excess fuel leaving the cathode side.</>,
  },
]

export default function ChemistryQ4_2022() {
  return (
    <MCQShell
      question={<p>Which one of the following diagrams shows the common design features of a fuel cell?</p>}
      options={[
        { letter: 'A', content: opt(optASrc, 'Fuel cell connected to a load; fuel enters beside the anode and leaves as excess fuel and products; air enters beside the cathode and leaves as products'), isAnswer: true },
        { letter: 'B', content: opt(optBSrc, 'Fuel cell connected to a power source; fuel enters beside the anode; air enters beside the cathode; excess fuel and products leave from both sides') },
        { letter: 'C', content: opt(optCSrc, 'Fuel cell connected to a power source; fuel enters beside the anode and leaves as excess fuel and products; air enters beside the cathode and leaves as products') },
        { letter: 'D', content: opt(optDSrc, 'Fuel cell connected to a load; fuel enters beside the electrode labelled cathode; air enters beside the electrode labelled anode') },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
