// 2020 Chemistry Exam, MCQ 17. VCAA examination report: 60% correct. Reading a
// concentration–time graph for Cl₂ + CO ⇌ COCl₂ to identify a temperature change (gradual
// shift at 1 minute) and a volume change (sudden proportional drop at 7 minutes). Question text
// transcribed from the original paper; the concentration–time graph is cropped from the original
// VCAA exam PDF. VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import { Background } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import graphSrc from './chem-2020-mcq17-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 60, B: 8, C: 13, D: 20 },
  answer: 'A',
  noAnswer: 0,
  comment: (
    <>
      The gradual adjustment to the change at 1 minute is consistent with a change in temperature.
      Since the reverse endothermic reaction is favoured the temperature was increased.
      <br />
      The sudden, and proportional, decrease in all concentrations at 7 minutes is consistent with
      a volume increase to which the system responds by favouring the reverse reaction to partially
      compensate for the imposed decrease in concentration/pressure.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <><Chem eq="Cl2(g) + CO(g) <=> COCl2(g)" />, Δ<i>H</i> = −108 kJ mol⁻¹</>,
    reason: <>Δ<i>H</i> is negative, so the <b>forward</b> reaction is <b>exothermic</b> and the <b>reverse</b> reaction is <b>endothermic</b>. Count the gas particles: 2 mol on the left, 1 mol on the right.</>,
  },
  {
    working: <>At 1 min: no sudden jump. [Cl₂] and [CO] rise <b>gradually</b> and [COCl₂] falls gradually, until a new equilibrium at about 3 min.</>,
    reason: <>A gradual change starting from the old values (no vertical jump) means nothing was added, removed or squeezed — the only change that does this is a <b>temperature</b> change.</>,
  },
  {
    working: <>Reactants up, product down ⇒ the equilibrium shifted <b>left</b> (the reverse, endothermic reaction was favoured).</>,
    reason: <>By Le Chatelier&rsquo;s principle, raising the temperature favours the endothermic direction, which absorbs some of the added heat. A decrease in temperature would have favoured the exothermic forward reaction and pushed [COCl₂] <i>up</i>.</>,
  },
  {
    working: <>1 minute: <b>increase in temperature</b></>,
    reason: <>This rules out options B and C.</>,
  },
  {
    working: <>At 7 min: all three concentrations drop <b>suddenly</b> (vertical lines), by the same proportion.</>,
    reason: <>A sudden, proportional change in <i>every</i> concentration means the same amounts of gas are now spread through a different volume (<i>c</i> = <i>n</i>/<i>V</i>). A <b>decrease</b> in concentration means the volume <b>increased</b>. (A volume decrease would make every line jump <i>up</i>.)</>,
  },
  {
    working: <>After 7 min: [Cl₂] and [CO] rise, [COCl₂] falls ⇒ shift <b>left</b>, towards the side with more gas particles (2 mol vs 1 mol).</>,
    reason: <>Le Chatelier check: a larger volume lowers the total pressure, and the system partially compensates by favouring the side with more particles. The response confirms a volume increase.</>,
  },
  {
    working: <b>1 minute: increase in temperature · 7 minutes: increase in volume</b>,
    reason: <>Matches option <b>A</b>. Option <b>D</b> (20%) gets 1 minute right but reads the 7-minute change the wrong way round: a volume <i>decrease</i> would make all the concentrations jump up and the equilibrium shift right, towards fewer particles. Options <b>B</b> and <b>C</b> say the temperature was decreased, but that would favour the exothermic forward reaction and raise [COCl₂], not lower it.</>,
  },
]

export default function ChemistryQ17_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The following equation represents the reaction between chlorine gas, Cl₂, and carbon
            monoxide gas, CO.
          </p>
          <p className="mb-2 text-[14px]">
            <Chem eq="Cl2(g) + CO(g) <=> COCl2(g)" /> &nbsp;&nbsp; Δ<i>H</i> = −108 kJ mol⁻¹
          </p>
          <p className="mb-2">The concentration–time graph below represents changes to the system.</p>
          <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
            <img loading="lazy" decoding="async" src={graphSrc} alt="Concentration (M) against time (min) for Cl2, CO and COCl2: constant until 1 min, then Cl2 and CO rise gradually and COCl2 falls gradually to new constant values by 3 min; at 7 min all three drop suddenly, then Cl2 and CO rise gradually and COCl2 falls gradually to new constant values by about 9 min — from the original 2020 VCAA exam paper" className="w-full max-w-[440px]" />
          </div>
          <p>
            Which of the following identifies the changes to the system that took place at 1 minute
            and at 7 minutes?
          </p>
        </>
      }
      background={
        <Background title="Reading a concentration–time graph">
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li><b>Sudden jump in one species only</b> → that species was added or removed.</li>
            <li><b>Sudden jump in all species by the same proportion</b> → a volume change (up = volume decreased, down = volume increased), or dilution for a solution.</li>
            <li><b>No jump, gradual change from the old values</b> → a temperature change.</li>
            <li>Then look at which way the lines move afterwards to see which reaction was favoured.</li>
          </ul>
        </Background>
      }
      options={[
        { letter: 'A', content: '1 minute: increase in temperature · 7 minutes: increase in volume', isAnswer: true },
        { letter: 'B', content: '1 minute: decrease in temperature · 7 minutes: decrease in volume' },
        { letter: 'C', content: '1 minute: decrease in temperature · 7 minutes: increase in volume' },
        { letter: 'D', content: '1 minute: increase in temperature · 7 minutes: decrease in volume' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
