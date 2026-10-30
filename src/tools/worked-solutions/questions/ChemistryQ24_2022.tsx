// 2022 Chemistry Exam, MCQ 24. VCAA examination report: 50% correct. HPLC with a polar mobile
// phase and a non-polar stationary phase: ordering the retention times of leucine, alanine and
// asparagine from the polarity of their side groups (Data Book table of 2-amino acids). Question
// text transcribed from the original paper. VCAA report only. Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 18, B: 10, C: 22, D: 50 },
  answer: 'D',
  comment: (
    <>
      The relative interactions between the side groups of the amino acids and the non-polar
      stationary and polar mobile phases are the key factors influencing retention times.
      <br />
      Leu – <Chem eq="CH2CH(CH3)2" />
      <br />
      Ala – <Chem eq="CH3" />
      <br />
      Asn – <Chem eq="CH2CONH2" />
      <br />
      These side groups indicate that Leu – with its larger non-polar side group – will be most
      strongly attracted to the stationary phase and have the longest retention time.
      <br />
      Asn – with its polar side group – will be most strongly attracted to the mobile phase and
      have the shortest retention time.
      <br />
      The order of increasing retention times is Asn &lt; Ala &lt; Leu.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Retention time = time a component takes to pass through the column. <br />Stronger attraction to the <b>stationary phase</b> → <b>longer</b> retention time. <br />Stronger attraction to the <b>mobile phase</b> → <b>shorter</b> retention time.</>,
    reason: <>Every component spends its time either stuck to the stationary phase or carried along by the mobile phase. &ldquo;Like attracts like&rdquo;: a polar component is attracted to a polar phase, a non-polar one to a non-polar phase.</>,
  },
  {
    working: <>Here: mobile phase <b>polar</b>, stationary phase <b>non-polar</b>. <br />So the most <b>non-polar</b> amino acid is held longest; the most <b>polar</b> one leaves first.</>,
    reason: <>The three amino acids share the same backbone (<Chem eq="H2N–CH–COOH" />); only the side group (R) differs, so the side group decides the order.</>,
  },
  {
    working: <>Side groups (Data Book, 2-amino acids): <br />Leu: <Chem eq="–CH2CH(CH3)2" /> — larger, <b>non-polar</b> hydrocarbon <br />Ala: <Chem eq="–CH3" /> — small, <b>non-polar</b> hydrocarbon <br />Asn: <Chem eq="–CH2CONH2" /> — <b>polar</b> amide group</>,
    reason: <>Leu and Ala both have hydrocarbon side groups (C–H bonds only), but Leu&rsquo;s is much larger, so it has stronger dispersion forces with the non-polar stationary phase. Asn&rsquo;s amide (C=O and N–H) can hydrogen bond with the polar mobile phase.</>,
  },
  {
    working: <>Shortest: Asn (most attracted to the polar mobile phase) <br />Middle: Ala <br />Longest: Leu (most attracted to the non-polar stationary phase)</>,
    reason: <>All three share the same polar backbone (amine and carboxylic acid groups), so the side group tips the balance: a polar side group (Asn) makes the whole molecule more polar, and a larger non-polar side group (Leu) makes it less polar than Ala. Rank from most polar to least polar to get shortest to longest retention time.</>,
  },
  {
    working: <b>Order of retention times, shortest to longest: Asn, Ala, Leu.</b>,
    reason: <>Matches option <b>D</b>. Option <b>A</b> (18%) is the exact reverse — the order you would get if the stationary phase were polar and the mobile phase non-polar. Option <b>C</b> (22%) is the order of side-group size by number of carbon atoms (<Chem eq="CH3" /> &lt; <Chem eq="CH2CONH2" /> &lt; <Chem eq="CH2CH(CH3)2" />), which treats size (dispersion forces) as the only factor and ignores that Asn&rsquo;s amide group is polar.</>,
  },
]

export default function ChemistryQ24_2022() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A high-performance liquid chromatography (HPLC) instrument is set up with a polar mobile
            phase and a non-polar stationary phase. Three amino acids – leucine, Leu, alanine, Ala,
            and asparagine, Asn – are added to the mobile phase and are run through the HPLC.
          </p>
          <p>The order of the retention times, from shortest to longest, for these three amino acids is</p>
        </>
      }
      options={[
        { letter: 'A', content: 'Leu, Ala, Asn' },
        { letter: 'B', content: 'Leu, Asn, Ala' },
        { letter: 'C', content: 'Ala, Asn, Leu' },
        { letter: 'D', content: 'Asn, Ala, Leu', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
