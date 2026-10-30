// 2023 Chemistry Exam, MCQ 19. VCAA examination report: 59% correct. Comparing omega-6
// (polyunsaturated) fatty acids with saturated fatty acids of the same carbon number: C=C double
// bonds put kinks in the chain, so the chains pack less closely — lower density and melting
// point, fewer H atoms. Question text transcribed from the original paper. VCAA report only.
// Borderline for the current study design: "omega-6" itself was old (2017–2023) food-chemistry
// content, but every option is answerable from degree of unsaturation, which is still on the
// course — a note on the page says so. Solution is original.

import { MCQShell } from '../MCQShell'
import { Background } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 59, B: 15, C: 4, D: 22 },
  answer: 'A',
  comment: (
    <>
      Omega-6 fatty acids contain a C=C double bond between the 6th and 7th carbons in the
      hydrocarbon chain.
      <br />
      This creates a kink in the chains that prevents them from packing as close together as the
      chains in saturated fatty acids.
      <br />
      Consequently omega-6 fatty acids have
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>lower densities</li>
        <li>lower melting points</li>
      </ul>
      than saturated fatty acids.
      <br />
      Because omega-6 fatty acids have C=C double bonds they undergo addition reactions, and having{' '}
      <u>fewer</u> hydrogen atoms in each molecule they undergo substitution reactions <u>less</u>{' '}
      readily than saturated fatty acids.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Omega-6 fatty acid: <b>unsaturated</b> — its chain has C=C double bonds, the first one starting at the <b>6th carbon from the CH₃ (omega) end</b>. Saturated fatty acid: only C–C single bonds.</>,
    reason: (
      <>
        The &ldquo;omega&rdquo; number just locates the first C=C, counting from the CH₃ end of the
        chain rather than from the –COOH end. What matters for every option is that the omega-6
        acid has C=C double bonds and the saturated acid does not.
        <Background title="Study design note">
          The name &ldquo;omega-6&rdquo; comes from the old (2017–2023) study design&rsquo;s food
          chemistry. The current course doesn&rsquo;t require it, but it does cover degree of
          unsaturation (C=C double bonds), melting points of molecular substances and addition
          reactions of alkenes — which is all this question really tests.
        </Background>
      </>
    ),
  },
  {
    working: <>C=C double bonds (cis) put <b>kinks</b> in the chain ⇒ the chains <b>cannot pack as closely</b> ⇒ <b>weaker dispersion forces</b> between molecules.</>,
    reason: <>A saturated chain is a straight zig-zag that lines up neatly against its neighbours, so dispersion forces act over more contact. A kinked chain holds its neighbours further away.</>,
  },
  {
    working: <>A: less close packing ⇒ less mass per unit volume ⇒ <b>lower density</b>. ✓</>,
    reason: <>Same number of carbons (almost the same mass per molecule), but fewer molecules fit in each mL.</>,
  },
  {
    working: <>B: weaker dispersion forces ⇒ less energy needed to separate the molecules ⇒ <b>lower</b> melting point, not higher. ✗</>,
    reason: <>This is why unsaturated fats (oils) are liquid at room temperature while saturated fats are solid.</>,
  },
  {
    working: <>C: each C=C has two fewer H atoms than the C–C it replaces ⇒ omega-6 acids have <b>fewer</b> H atoms. ✗</>,
    reason: <>E.g. with 18 C: stearic acid (saturated) is C₁₇H₃₅COOH, linoleic acid (an omega-6 acid with two C=C) is C₁₇H₃₁COOH.</>,
  },
  {
    working: <>D: C=C double bonds react by <b>addition</b>; with fewer C–H bonds, omega-6 acids undergo substitution <b>less</b> readily. ✗</>,
    reason: <>Substitution replaces an H atom, which is the typical reaction of saturated (alkane-like) chains. The reaction characteristic of an unsaturated chain is addition across the C=C.</>,
  },
  {
    working: <span className="font-semibold">Omega-6 fatty acids have lower densities than saturated fatty acids.</span>,
    reason: <>Matches option <b>A</b>. Option <b>D</b>, chosen by 22%, confuses substitution with addition: the C=C makes omega-6 acids more reactive in <i>addition</i>, not substitution. Option <b>B</b> reverses the melting-point trend.</>,
  },
]

export default function ChemistryQ19_2023() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Compare omega-6 fatty acids with saturated fatty acids containing the same number of carbon atoms.</p>
          <p className="mb-2">Which one of the following statements is correct?</p>
          <p>Omega-6 fatty acids</p>
        </>
      }
      options={[
        { letter: 'A', content: 'have lower densities than saturated fatty acids.', isAnswer: true },
        { letter: 'B', content: 'have higher melting points than saturated fatty acids.' },
        { letter: 'C', content: 'have more hydrogen atoms than saturated fatty acids.' },
        { letter: 'D', content: 'undergo substitution reactions more readily than saturated fatty acids.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
