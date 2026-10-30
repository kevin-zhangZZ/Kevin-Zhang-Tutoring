// 2023 Chemistry Exam, MCQ 14. VCAA examination report: 44% correct. Effect of raising the
// temperature on the rates of the forward and reverse reactions of the endothermic
// N₂O₄ ⇌ 2NO₂ equilibrium: both rates increase. Question text transcribed from the original
// paper; the rate–time graph in the report's comment is cropped from the original VCAA
// examination report PDF. VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import reportGraphSrc from './chem-2023-mcq14-report-graph.png'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 43, B: 1, C: 44, D: 12 },
  answer: 'C',
  comment: (
    <>
      Initially, when the temperature is increased, the rates of both the forward and backward
      (reverse) reactions immediately increase.
      <br />
      Since the forward reaction is endothermic, the forward reaction is favoured as the system
      returns to equilibrium.
      <br />
      So, the rate of the forward reaction will decrease as reactant concentrations decrease BUT at
      the new equilibrium the rate of the forward reaction will still be higher than prior to the
      temperature increase.
      <br />
      The rate of the reverse reaction will further increase as the product concentrations
      increase.
      <br />
      When equilibrium is established at 80 °C, the rates of both the
      <img loading="lazy" decoding="async"
        src={reportGraphSrc}
        alt="Unlabelled sketch of two rates against time: two flat, nearly equal lines, then at one instant both jump up — the upper (orange) line jumps higher and then falls, the lower (blue) line jumps less and then rises, until they meet and level off at a higher value than before — from the 2023 VCAA examination report"
        className="w-full max-w-[360px] mt-1 bg-white rounded"
      />
      forward and reverse have increased compared to the equilibrium at 35 °C.
      <br />
      Alternatively, the rate of any reaction at 80 °C, exothermic or endothermic, would be
      expected to be higher than at 35 °C.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Raising the temperature increases the rate of <b>every</b> reaction — forward <b>and</b> reverse.</>,
    reason: <>At a higher temperature particles move faster, so collisions are more frequent and a greater proportion of them have energy ≥ <i>E</i><sub>a</sub>. That is true for the forward reaction and for the reverse reaction alike, whether it is endothermic or exothermic.</>,
  },
  {
    working: <>Δ<i>H</i> = +58.0 kJ mol<sup>−1</sup> &gt; 0, so the forward reaction is <b>endothermic</b>; a temperature rise favours the forward reaction.</>,
    reason: <>Le Chatelier&rsquo;s principle: the system partially opposes the added heat by favouring the direction that absorbs heat. This decides which rate increases <i>more</i>, not whether a rate goes up or down.</>,
  },
  {
    working: <>Immediately: forward rate ↑ (by more), reverse rate ↑ (by less) ⇒ net forward reaction; [<Chem eq="N2O4" />] falls and [<Chem eq="NO2" />] rises.</>,
    reason: <>&ldquo;The forward reaction is favoured&rdquo; means its rate jumps <i>further</i> than the reverse rate, so for a while more <Chem eq="N2O4" /> is used up than is re-formed.</>,
  },
  {
    working: <>As the new equilibrium forms: forward rate falls a little, reverse rate rises further, until they are equal again — both <b>higher</b> than at 35 °C.</>,
    reason: <>The forward rate falls because [<Chem eq="N2O4" />] is dropping, but it never gets back down to its 35 °C value; the reverse rate keeps rising because [<Chem eq="NO2" />] is increasing. The report&rsquo;s graph has no labels, but its shapes match this: the orange line (jumps higher, then falls) is the forward rate, and the blue line (jumps less, then rises) is the reverse rate.</>,
  },
  {
    working: <b>Rate of forward reaction: increases · Rate of reverse reaction: increases</b>,
    reason: <>Matches option <b>C</b>. Option <b>A</b>, chosen by 43%, mixes up <i>rate</i> with <i>position</i> of equilibrium: &ldquo;the equilibrium shifts to the right&rdquo; means the forward rate is <i>greater than</i> the reverse rate for a while, not that the reverse rate drops — both rates still go up when the temperature rises. Option <b>D</b> makes the same rate-versus-position mix-up with the shift read the wrong way round (as if the forward reaction were exothermic), and option <b>B</b> has the temperature rise slowing both reactions.</>,
  },
]

export default function ChemistryQ14_2023() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The equation below shows the equilibrium reaction for the conversion of dinitrogen
            tetroxide, <Chem eq="N2O4(g)" />, to nitrogen dioxide, <Chem eq="NO2(g)" />.
          </p>
          <p className="mb-2 pl-6 sm:pl-16">
            <Chem eq="N2O4(g) <=> 2NO2(g)" />
            <span className="inline-block w-10" />
            Δ<i>H</i> = +58.0 kJ mol<sup>−1</sup>
          </p>
          <p>Which one of the following occurs when the temperature is increased from 35 °C to 80 °C?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'Rate of forward reaction: increases · Rate of reverse reaction: decreases' },
        { letter: 'B', content: 'Rate of forward reaction: decreases · Rate of reverse reaction: decreases' },
        { letter: 'C', content: 'Rate of forward reaction: increases · Rate of reverse reaction: increases', isAnswer: true },
        { letter: 'D', content: 'Rate of forward reaction: decreases · Rate of reverse reaction: increases' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
