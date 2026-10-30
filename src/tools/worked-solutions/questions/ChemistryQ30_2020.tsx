// 2020 Chemistry Exam, MCQ 30. VCAA examination report: 55% correct. Placing an unfamiliar redox
// pair (ClO₂/ClO₂⁻) in the electrochemical series from reaction observations, then predicting
// which oxidants can oxidise Fe²⁺. Question text transcribed from the original paper. E° values
// from the Data Book (unchanged in the 2026 Data Book). VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 13, B: 18, C: 55, D: 13 },
  answer: 'C',
  noAnswer: 1,
  comment: (
    <>
      According to information from the electrochemical series
      <div className="my-1 grid grid-cols-[auto_auto] gap-x-8 gap-y-0.5 w-fit">
        <span><Chem eq="Cl2(g) + 2e- <=> 2Cl-(aq)" /></span><span>+1.36 V</span>
        <span><Chem eq="Fe3+(aq) + e- <=> Fe2+(aq)" /></span><span>+0.77 V</span>
        <span><Chem eq="I2(s) + 2e- <=> 2I-(aq)" /></span><span>+0.54 V</span>
      </div>
      Based on the information supplied in the question, ClO₂ / ClO₂⁻ is located above Fe³⁺/Fe²⁺
      but below Cl₂/Cl⁻, i.e. the order of the redox pairs in terms of decreasing oxidising agent
      strength / increasing reducing agent strength) is:
      <ul className="list-disc pl-5 flex flex-col gap-1 my-1">
        <li>Cl₂(g)/Cl⁻(aq)</li>
        <li>ClO₂(g)/ClO₂⁻(aq)</li>
        <li>Fe³⁺(aq)/Fe²⁺(aq)</li>
        <li>I₂(s)/I⁻(aq).</li>
      </ul>
      Hence Fe²⁺(aq) will be oxidised by Cl₂(g) and ClO₂(g) but not by I₂(s).
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>An oxidant (left side of a half-equation) reacts with a reductant (right side) only if the oxidant&rsquo;s half-equation has the <b>higher</b> <i>E</i>°.</>,
    reason: <>The electrochemical series rule: in the Data Book table, an oxidant reacts with any reductant <b>below</b> it. So &ldquo;X oxidises Y&rdquo; tells you X&rsquo;s pair sits above Y&rsquo;s pair, and &ldquo;X does not oxidise Y&rdquo; tells you it sits below.</>,
  },
  {
    working: (
      <>
        <Chem eq="Cl2(g) + 2e- <=> 2Cl-(aq)" />&nbsp;&nbsp;+1.36 V
        <br /><Chem eq="Fe3+(aq) + e- <=> Fe2+(aq)" />&nbsp;&nbsp;+0.77 V
        <br /><Chem eq="I2(s) + 2e- <=> 2I-(aq)" />&nbsp;&nbsp;+0.54 V
      </>
    ),
    reason: <>Data Book: electrochemical series (same values in the 2026 Data Book). The Data Book writes I₂(s); the paper&rsquo;s I₂(aq) is the same I₂/I⁻ pair.</>,
  },
  {
    working: <>ClO₂ oxidises HI (I⁻) but not HCl (Cl⁻) ⇒ +0.54 V &lt; <i>E</i>°(ClO₂/ClO₂⁻) &lt; +1.36 V</>,
    reason: <>HI(aq) supplies the reductant I⁻ and HCl(aq) supplies Cl⁻. ClO₂ is strong enough to take electrons from I⁻ but not from Cl⁻, so its pair sits between I₂/I⁻ and Cl₂/Cl⁻.</>,
  },
  {
    working: <>Fe³⁺ does not oxidise NaClO₂ (ClO₂⁻) ⇒ <i>E</i>°(ClO₂/ClO₂⁻) &gt; +0.77 V</>,
    reason: <>NaClO₂(aq) supplies ClO₂⁻, the reductant of the ClO₂/ClO₂⁻ pair. Fe³⁺ cannot oxidise it, so Fe³⁺/Fe²⁺ sits <b>below</b> ClO₂/ClO₂⁻. (&ldquo;Fe³⁺ oxidises HI&rdquo; just confirms +0.77 V &gt; +0.54 V.)</>,
  },
  {
    working: (
      <>
        Order (strongest oxidant first):
        <br />Cl₂/Cl⁻ (+1.36 V) &gt; ClO₂/ClO₂⁻ (between +0.77 and +1.36 V) &gt; Fe³⁺/Fe²⁺ (+0.77 V) &gt; I₂/I⁻ (+0.54 V)
      </>
    ),
    reason: <>Combining the two deductions puts ClO₂/ClO₂⁻ between Fe³⁺/Fe²⁺ and Cl₂/Cl⁻.</>,
  },
  {
    working: (
      <>
        Fe²⁺ (reductant of the +0.77 V pair) is oxidised by the oxidants <b>above</b> it: Cl₂ and ClO₂.
        <br /><Chem eq="Cl2(g) + 2Fe2+(aq) -> 2Cl-(aq) + 2Fe3+(aq)" />
        <br />ClO₂(g) + Fe²⁺(aq) → ClO₂⁻(aq) + Fe³⁺(aq)
      </>
    ),
    reason: <>I₂ sits <b>below</b> Fe³⁺/Fe²⁺, so it is too weak an oxidant to oxidise Fe²⁺. In fact the reverse reaction happens: Fe³⁺ oxidises I⁻ (the stem&rsquo;s second bullet).</>,
  },
  {
    working: <b>Fe²⁺(aq) can be oxidised by ClO₂(g) and Cl₂(g), but not I₂(aq).</b>,
    reason: <>Matches option <b>C</b>. Option <b>B</b> (18%) leaves out ClO₂, which would need ClO₂/ClO₂⁻ to sit below Fe³⁺/Fe²⁺ — but Fe³⁺ cannot oxidise ClO₂⁻, so it sits above. Option <b>D</b> includes I₂, whose pair is below Fe³⁺/Fe²⁺. Option <b>A</b> makes both errors.</>,
  },
]

export default function ChemistryQ30_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Consider the following half-equation.</p>
          <p className="mb-2 ml-6">ClO₂(g) + e⁻ ⇌ ClO₂⁻(aq)</p>
          <p className="mb-1">It is also known that:</p>
          <ul className="mb-2 list-disc pl-5 flex flex-col gap-0.5">
            <li>ClO₂(g) will oxidise HI(aq), but not HCl(aq)</li>
            <li>Fe³⁺(aq) will oxidise HI(aq), but not NaClO₂(aq).</li>
          </ul>
          <p>Based on this information, Fe²⁺(aq) can be oxidised by</p>
        </>
      }
      options={[
        { letter: 'A', content: 'Cl₂(g) and I₂(aq).' },
        { letter: 'B', content: 'Cl₂(g), but not ClO₂(g).' },
        { letter: 'C', content: 'ClO₂(g) and Cl₂(g), but not I₂(aq).', isAnswer: true },
        { letter: 'D', content: 'Cl₂(g), ClO₂(g) and I₂(aq).' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
