// 2025 Chemistry Exam, MCQ 7. VCAA examination report: 24% correct — the hardest MCQ on this
// paper. Which particles move through the electrolyte of a flexible metal–air cell while it
// discharges (ions through the electrolyte; electrons only through the external circuit). Question
// text transcribed from the original paper; the zinc–air cell diagram (shared stem for Questions
// 7–9) is cropped from the original VCAA exam PDF (the same crop as MCQ 8). VCAA report only.
// Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import cellSrc from './chem-2025-mcq8-zinc-air-cell.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 60, B: 24, C: 9, D: 6 },
  answer: 'B',
  comment: (
    <>
      Metal ions are generated at the anode and these have to migrate through the polymer/gel
      electrolyte in order to balance the negative charges being formed at the cathode.
      <br />
      While the anode generates electrons which flow through the wire to the cathode, this
      question refers to &lsquo;through the polymer/gel electrolyte&rsquo;.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Anode (−), zinc electrode, oxidation: <Chem eq="Zn(s) -> Zn2+(aq) + 2e-" /></>,
    reason: <>In a galvanic cell the <b>anode</b> is where <b>oxidation</b> happens and it is the <b>negative</b> electrode. The diagram puts the zinc electrode against the negative current collector, so the metal is oxidised to metal ions there.</>,
  },
  {
    working: <>Cathode (+), air electrode, reduction: <Chem eq="O2(g) + 2H2O(l) + 4e- -> 4OH-(aq)" /></>,
    reason: <>O₂ from the air is <b>reduced</b> at the air electrode (the <b>cathode</b>, positive) — shown here for an alkaline electrolyte (Data Book, +0.40 V). In an acidic electrolyte it would be <Chem eq="O2(g) + 4H+(aq) + 4e- -> 2H2O(l)" />; either way, negative charge builds up at the cathode (OH⁻ is made, or H⁺ is used up).</>,
  },
  {
    working: <>External circuit (wire + load): <b>electrons</b> flow anode → cathode.<br />Electrolyte: <b>ions</b> migrate — metal cations anode → cathode.</>,
    reason: <>A cell has two paths for charge. <b>Electrons travel only through the wire</b> — they cannot pass through an electrolyte. Inside the electrolyte the charge is carried by <b>ions</b>: the positive metal ions made at the anode move <b>towards the cathode</b>, balancing the negative charge being formed there and keeping both regions electrically neutral.</>,
  },
  {
    working: <>A, C: electrons → not through the electrolyte ✗<br />D: metal ions cathode → anode ✗ (wrong direction)</>,
    reason: <>Check each option against the question&rsquo;s key phrase, &ldquo;through the polymer/gel electrolyte&rdquo;. Option A is a true statement about the <b>wire</b>, but not about the electrolyte; C is wrong on both counts.</>,
  },
  {
    working: <b>Metal ions flow from the anode to the cathode through the electrolyte.</b>,
    reason: (
      <>
        Matches option <b>B</b>. Option <b>A</b>, chosen by 60%, describes electron flow in the
        external circuit — correct for the wire, but the question asks about migration{' '}
        <b>through the polymer/gel electrolyte</b>, which only ions can do (the report makes
        exactly this point). Option <b>D</b> reverses the direction: cations move towards the
        cathode, where negative charge is building up.
      </>
    ),
  },
]

export default function ChemistryQ7_2025() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2 italic">Use the following information to answer Questions 7–9.</p>
          <div className="mb-1 border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-[13.5px]">
            <p className="mb-2 text-[12.5px] text-gray-500 dark:text-gray-400">
              [Image — due to copyright restrictions, this material is not supplied.]
            </p>
            <p className="mb-2">
              The rapid popularization of wearable electronics, soft robots and implanted medical
              devices has stimulated extensive research in flexible batteries, which are bendable,
              foldable, knittable, wearable, and/or stretchable …
            </p>
            <p>
              Different from the conventional batteries that utilize rigid and bulky electrodes,
              current collectors, metal anodes, liquid electrolytes, and packages, flexible
              batteries require the flexibility of each component to accommodate diverse shapes or
              sizes.
            </p>
          </div>
          <p className="mb-3 text-right text-[11.5px] text-gray-500 dark:text-gray-400">
            Sources: Xiao Zhu et al., &lsquo;Recent progress of flexible rechargeable batteries&rsquo;,{' '}
            <i>Science Bulletin</i>, vol. 69, issue 23, 2024 (extract); tradeKorea,
            &lt;www.tradekorea.com/main.do&gt; (image)
          </p>
          <p className="mb-2">
            Metal–air batteries are considered a suitable option for flexible batteries. Oxygen,
            O₂, in the air reacts with a metal electrode in all cells. Sodium, Na, magnesium, Mg,
            aluminium, Al, and zinc, Zn, are being investigated using polymer and gel electrolytes.
          </p>
          <p className="mb-2">A diagram of one of the cells in a flexible zinc–air battery is shown below.</p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={cellSrc}
              alt="A curved, flexible zinc–air cell in layers: a porous positive current collector (+), the air electrode, a solid-state electrolyte, the zinc electrode and a negative current collector (−) — from the original 2025 VCAA exam paper"
              className="w-full max-w-[460px]"
            />
          </div>
          <p>
            Which one of the following shows the migration that occurs through the polymer/gel
            electrolyte when the flexible cell is producing electrical energy?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: 'Electrons flow from the anode to the cathode.' },
        { letter: 'B', content: 'Metal ions flow from the anode to the cathode.', isAnswer: true },
        { letter: 'C', content: 'Electrons flow from the cathode to the anode.' },
        { letter: 'D', content: 'Metal ions flow from the cathode to the anode.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
