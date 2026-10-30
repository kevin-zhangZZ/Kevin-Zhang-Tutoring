// 2025 Chemistry Exam, MCQ 17. VCAA examination report: 49% correct. Which claimed benefits of an
// electrolyte-free fuel cell (EFFC) align with the green chemistry principle of design for energy
// efficiency. Question text transcribed from the original paper; the conventional fuel cell / EFFC
// diagram is cropped from the original VCAA exam PDF. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import cellsSrc from './chem-2025-mcq17-fuel-cells.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 10, B: 34, C: 49, D: 7 },
  answer: 'C',
  comment: (
    <>
      Energy efficiency requires less wastage of the desired energy.
      <br />
      Benefit I will be more efficient because better conduction properties means less heat energy
      is being produced.
      <br />
      Benefit II will be more efficient because less heat energy is lost.
      <br />
      In both cases with less heat energy being generated from the cell, the processes occurring in
      an EFFC meet the requirements for design for energy efficiency.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Design for energy efficiency: processes/pathways should be designed for <b>maximum energy efficiency</b> — as little of the energy as possible wasted.</>,
    reason: <>The study design states the principle as: processes/pathways should be designed for maximum energy efficiency and with minimal negative environmental and economic impacts. Maximum efficiency means as much of the energy as possible ends up in the desired form. For a fuel cell, the <b>desired</b> energy is <b>electrical</b> energy; any chemical energy that ends up as <b>heat</b> instead is wasted. So a claim aligns with the principle if it means less energy is lost as heat.</>,
  },
  {
    working: <>Claim I: a layer with superior conductive properties → lower resistance to the flow of charge → <b>less electrical energy converted to heat</b> inside the cell.</>,
    reason: <>Any conductor with resistance turns some of the electrical energy passing through it into heat. Better conduction means less of the cell&rsquo;s output is wasted this way, so more of the chemical energy is delivered as electrical energy. Claim I aligns with the principle.</>,
  },
  {
    working: <>Claim II: fewer internal interfaces → <b>less heat loss</b>.</>,
    reason: <>The claim itself says the result is less heat loss — less energy wasted. Claim II aligns with the principle.</>,
  },
  {
    working: <b>Both I and II reduce the energy wasted as heat.</b>,
    reason: <>Matches option <b>C</b>. Option <b>B</b>, chosen by 34%, accepts only the claim that mentions heat loss directly; it misses that better conductivity also means less electrical energy is turned into heat, so claim I is about energy efficiency too.</>,
  },
]

export default function ChemistryQ17_2025() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            In innovative fuel cells, like the electrolyte-free (layer-free) fuel cell (EFFC), the
            internal cathode–electrolyte–anode structure commonly found in conventional fuel cells
            is replaced with a single conductive porous layer, as shown in the diagram below.
          </p>
          <div className="mb-1 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async"
              src={cellsSrc}
              alt="Left: a conventional fuel cell, with separate cathode, electrolyte and anode layers between two end plates. Right: an EFFC, with a single conductive porous layer between two end plates — from the original 2025 VCAA exam paper"
              className="w-full max-w-[520px]"
            />
          </div>
          <p className="mb-3 text-right text-[11.5px] text-gray-500 dark:text-gray-400">
            Source: Adapted from Yuzheng Lu et al., &lsquo;Progress in electrolyte-free fuel
            cells&rsquo;, <i>Frontiers in Energy Research</i>, vol. 4, 2016
          </p>
          <p className="mb-2">Manufacturers of the EFFC claim the following benefits:</p>
          <div className="mb-2 pl-2 flex flex-col gap-1">
            <p><span className="inline-block w-6">I</span>The single porous layer can be made from material with superior conductive properties.</p>
            <p><span className="inline-block w-6">II</span>Fewer internal interfaces, compared to conventional fuel cells, result in less heat loss.</p>
          </div>
          <p>
            Which of the claims above describes how the operation of the EFFC aligns with the green
            chemistry principle of design for energy efficiency?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: 'I only' },
        { letter: 'B', content: 'II only' },
        { letter: 'C', content: 'both I and II', isAnswer: true },
        { letter: 'D', content: 'neither I nor II' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
