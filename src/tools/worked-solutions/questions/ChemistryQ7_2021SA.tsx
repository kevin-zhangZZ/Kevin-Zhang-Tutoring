// 2021 Chemistry Exam, Section B Question 7 (8 marks). Identifying an unknown compound (one of
// five structures P–T) from its ¹³C NMR, IR and mass spectra: eliminating a compound by its number
// of carbon environments, eliminating compounds from the IR spectrum, the fragment at m/z = 43,
// the meaning of m/z, and why one molecule gives many peaks in a mass spectrum. Question text
// transcribed from the original paper; the five structures, the ¹³C NMR spectrum, the IR spectrum
// and the mass spectrum are cropped from the original VCAA exam PDF. Mark distributions and
// comments are from the VCAA examination report (VCAA report only — no second source); the report
// itemises the marks for c.iii only, so the other mark schemes are our reading. The "How to Think
// About It" notes and model answers are original. IR ranges quoted from the 2026 Data Book
// (item 21: O–H acids 2500–3500, O–H alcohols 3200–3600 cm⁻¹ — the same ranges the report uses);
// the paper cites no item numbers. Molar masses checked in Python (M = 102, fragments 43 and 59).
// Mass spectrometry is on the current study design for data analysis ("excluding features of
// instrumentation and operation"); c.ii and c.iii ask only what m/z means and why fragments form.

import Chem from '../Chem'
import { Background, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import structuresSrc from './chem-2021sa-q7-structures.png'
import nmrSrc from './chem-2021sa-q7-c13-nmr.png'
import irSrc from './chem-2021sa-q7b-ir.png'
import msSrc from './chem-2021sa-q7c-mass-spectrum.png'

const EXAM_A: SAExaminerStats = {
  marks: [48, 52],
  average: 0.5,
  comment: <>Compound T</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [27, 29, 33, 11],
  average: 1.3,
  comment: (
    <>
      Compounds eliminated: P, Q and S.
      <br />
      Compound P has no -O-H group present, whereas the IR shows a clear -O-H alcohol with an absorbance
      at 3500 cm⁻¹.*
      <br />
      Compound Q has an -O-H group of an acid, whereas the IR shows a clear -O-H alcohol with an
      absorbance at 3500 cm⁻¹. There is no evidence of a large broad -O-H of an acid showing up between
      2500 cm⁻¹ and 3500 cm⁻¹.*
      <br />
      Compound S has no -O-H group present, whereas the IR shows a clear -O-H alcohol with an absorbance
      at 3500 cm⁻¹.*
      <br />
      Most students picked up that either/both compounds P and S could be eliminated as they lacked any
      -O-H group. However, many did not specifically refer to the -O-H of an alcohol. Likewise, they
      frequently failed to recognise that Q, being a carboxylic acid, should have shown a strong, broad
      absorbance between 2500 cm⁻¹ and 3500 cm⁻¹.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [51, 49],
  average: 0.5,
  comment: (
    <>
      Any of: [CH₃CO]⁺, [(CH₃)₂CH]⁺, [C₂H₃O]⁺ or [C₃H₇]⁺.
      <br />
      This question was generally handled well, except for the frequent lack of the essential positive
      charge.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [69, 31],
  average: 0.3,
  comment: (
    <>
      Mass to charge ratio
      <br />
      The basic theory behind key instrumental techniques was a challenge for many students.
    </>
  ),
}

const EXAM_CIII: SAExaminerStats = {
  marks: [35, 52, 13],
  average: 0.8,
  comment: (
    <>
      One mark was awarded for the understanding that ions (cations) needed to be formed in order for any
      peak to appear on a mass spectrum.
      <br />
      One mark was awarded for the understanding that multiple ions form because of either:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>fragmentation pattern that occurs because of the initial parent ion being unstable</li>
        <li>molar masses of the different isotopes present in the parent ion.</li>
      </ul>
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <>The ¹³C NMR spectrum has <b>4 peaks</b> (at about 213, 77, 26 and 24 ppm), so the unknown has <b>4 different carbon environments</b>.</>,
    reason: <>Each peak in a ¹³C NMR spectrum is one <b>carbon environment</b> — a set of carbons with identical surroundings. Some peaks here are drawn as a pair of almost touching lines (at 77, 26 and 24 ppm) — each touching pair is one peak. Near 25 ppm there are two separate peaks: a tall one at about 26 ppm and a shorter one at about 24 ppm.</>,
  },
  {
    working: <>P: 4 environments (the two CH₃ on the CH are equivalent; CH, C=O, CH₃ of the ethanoate)</>,
    reason: <>Two CH₃ groups attached to the <b>same</b> carbon, with nothing else to tell them apart, are equivalent and give only one peak. P, Q, R and S each have such a pair.</>,
  },
  { working: <>Q: 4 environments (2 equivalent CH₃, CH, CH₂, COOH)</> },
  { working: <>R: 4 environments (2 equivalent CH₃, C–OH, C=O, CH₃ next to C=O)</> },
  { working: <>S: 4 environments (2 equivalent CH₃, central C, O–CH₃, CHO)</> },
  {
    working: <>T: 5 environments — every carbon is different (CH₃, CH₂, CH–OH, C=O, CH₃)</>,
    reason: <>T is a straight five-carbon chain with no branch, so no two carbons have the same surroundings: the CH₃ at the end of the ethyl group is not the same as the CH₃ next to the C=O.</>,
  },
  {
    working: <b>Compound T</b>,
    reason: <>T would give <b>5 peaks</b>, but the spectrum shows 4, so T is eliminated. The other four all fit, so the ¹³C NMR alone can&rsquo;t pick between them.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <>Compounds eliminated: <b>P, Q and S</b>.</>,
    reason: <>The three marks match the three compounds — each needs its own reason taken from the spectrum.</>,
  },
  {
    working: <>The spectrum has a strong, <b>broad absorption centred at about 3500 cm⁻¹</b> (roughly 3200–3600 cm⁻¹), which is an <b>O–H (alcohol)</b> — Data Book range 3200–3600 cm⁻¹.</>,
    reason: <>Quote the wavenumber from the graph <b>and</b> name the bond: the report noted many students did not specifically say <b>alcohol</b> O–H. The sharp peaks just below 3000 cm⁻¹ are C–H (2850–3090 cm⁻¹).</>,
  },
  {
    working: <><b>P</b> (an ester) and <b>S</b> (an ether and aldehyde) have <b>no O–H group</b>, so they cannot produce the O–H absorption at 3500 cm⁻¹ — eliminated.</>,
    reason: <>Look at each structure for an –OH. P has O only in the ester link and C=O; S has O only in C–O–C and the CHO group.</>,
  },
  {
    working: <><b>Q</b> is a <b>carboxylic acid</b>: its O–H would give a <b>very broad absorption across 2500–3500 cm⁻¹</b>, overlapping the C–H peaks. The spectrum has no such band — the O–H band rises back up before 3000 cm⁻¹ and the C–H peaks stand clearly on their own — so Q is eliminated.</>,
    reason: <>This is the step the report says students frequently missed: an <b>acid</b> O–H (Data Book 2500–3500 cm⁻¹) looks different from an <b>alcohol</b> O–H (3200–3600 cm⁻¹). The absorption here is the narrower, alcohol kind.</>,
  },
  {
    working: <>The strong, sharp peak at about 1710 cm⁻¹ is C=O, which all five compounds contain, so it does not eliminate any of them.</>,
    reason: <>Worth knowing why it doesn&rsquo;t help: every structure P–T has a C=O. R and T both have an alcohol O–H and a C=O, so both survive the IR. Together with part a (T eliminated), the unknown must be <b>R</b>.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <><b><Chem eq="[CH3CO]+" /></b> (also accepted: <Chem eq="[C2H3O]+" />, <Chem eq="[(CH3)2CH]+" /> or <Chem eq="[C3H7]+" />)</>,
    reason: (
      <>
        A fragment of mass 43: CH₃CO = 12.0 + 3(1.0) + 12.0 + 16.0 = 43.0. The unknown is R, and breaking the bond between its C=O and the
        C–OH carbon gives CH₃CO⁺ (43) and (CH₃)₂C(OH)⁺ (3(12.0) + 7(1.0) + 16.0 = 59 — the tallest peak, the base peak). C₃H₇⁺ also has mass 3(12.0) + 7(1.0) = 43.0, so the report accepted it too. The <b>positive charge is essential</b>:
        the report says it was frequently left off. Only ions are detected, so every peak is a <b>cation</b>.
      </>
    ),
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <><b>m/z is the mass-to-charge ratio</b>: the <b>mass of the ion divided by its charge</b>.</>,
    reason: <>Write the full words &ldquo;mass-to-charge ratio&rdquo; — the report says the basic theory was a challenge for many students. Since almost all ions in a mass spectrum have a charge of 1+, m/z is in practice the mass of the ion, which is why the molecular ion peak at m/z = 102 (very small here, but present) gives R&rsquo;s molar mass (C₅H₁₀O₂, 102 g mol⁻¹).</>,
  },
]

const ROWS_CIII: WorkingRow[] = [
  {
    working: <>In a mass spectrometer the molecule is <b>ionised</b> to form a <b>positive ion (cation)</b>, the <b>molecular (parent) ion</b> M⁺; only <b>ions</b> are detected, so a peak only appears for a <b>charged</b> species.</>,
    reason: <>Mark 1: the idea that <b>ions (cations) must form</b> for any peak to appear. Neutral pieces are never detected.</>,
  },
  {
    working: <>The molecular ion is <b>unstable</b> and <b>fragments</b> (breaks into smaller pieces). Each <b>positively charged fragment</b> has a different m/z and gives its own peak.</>,
    reason: <>Mark 2: why there are <b>multiple</b> ions. In this spectrum: 102 (M⁺), 59 and 43 (fragments).</>,
  },
  {
    working: <>Also, molecules contain <b>different isotopes</b> (e.g. ¹³C instead of ¹²C), so ions of the same fragment have <b>different masses</b> and give separate peaks (such as a small M+1 peak).</>,
    reason: <>The report accepted either fragmentation <b>or</b> isotopes for the second mark; writing both is safe.</>,
  },
]

export default function ChemistryQ7_2021SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 7 (8 marks)</p>
        <p className="mb-3">
          Two students are given a homework assignment that involves analysing a set of spectra and identifying an unknown
          compound. The unknown compound is one of the molecules shown below.
        </p>
        <div className="mb-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={structuresSrc}
            alt="Full structural formulas of five compounds: P, Q, R, S and T — from the original 2021 VCAA exam paper"
            className="w-full max-w-[640px]"
          />
        </div>
        <p className="mb-2">
          The <sup>13</sup>C NMR spectrum of the unknown compound is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={nmrSrc}
            alt="¹³C NMR spectrum of the unknown compound, from 0 to 200 ppm, with peaks near 213, 77, 26 and 24 ppm — from the original 2021 VCAA exam paper"
            className="w-full max-w-[420px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Carbon Environments"
        marks={1}
        statement={
          <>
            Based on the number of peaks in the <sup>13</sup>C NMR spectrum above, which compound – P, Q, R, S or T – could be
            eliminated as the unknown compound?
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            The number of peaks in a ¹³C NMR spectrum = the number of <b>different carbon environments</b>. Count the
            environments in each structure and find the one that doesn&rsquo;t match the spectrum&rsquo;s 4 peaks. The trap
            is counting carbon <i>atoms</i> instead of environments: P, Q, R and S each have 5 carbons but two identical CH₃
            groups, so only 4 environments. Only T has 5.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme source="ours" points={[{ point: <><b>Compound T</b> — it has <b>5 carbon environments</b>, but the spectrum shows only <b>4 peaks</b>.</> }]} />
      </PartCard>

      <PartCard
        letter="b"
        topic="IR Spectroscopy"
        marks={3}
        statement={
          <>
            The infra-red (IR) spectrum of the unknown compound is shown below.
            <div className="my-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img
                loading="lazy"
                decoding="async"
                src={irSrc}
                alt="IR spectrum of the unknown compound: a broad strong absorption centred near 3450 cm⁻¹, sharp C–H absorptions just below 3000 cm⁻¹, and a very strong sharp absorption near 1710 cm⁻¹ — from the original 2021 VCAA exam paper"
                className="w-full max-w-[600px]"
              />
            </div>
            Identify which of the five compounds can be eliminated on the basis of the IR spectrum. Justify your answer using
            data from the IR spectrum.
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="How to Think About It">
          <p>
            Find the key absorptions, match them to bonds with the Data Book (item 21 in 2026), then check each structure:
            does it have that bond, and of the right type? Three marks means three compounds, each with a reason that quotes a
            wavenumber. The broad band at about 3500 cm⁻¹ is an <b>alcohol</b> O–H, so P and S (no O–H) go — and so does Q,
            because an <b>acid</b> O–H would give a much broader band spreading over 2500–3500 cm⁻¹. The report notes that many
            students did not specifically refer to the O–H of an <b>alcohol</b>, and frequently failed to recognise why Q goes.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <MarkScheme
          source="ours"
          points={[
            { point: <><b>P eliminated</b>: it has <b>no O–H</b>, but the spectrum shows an <b>alcohol O–H</b> absorption at about <b>3500 cm⁻¹</b>.</> },
            { point: <><b>Q eliminated</b>: a <b>carboxylic acid O–H</b> would give a <b>strong, broad absorption between 2500 and 3500 cm⁻¹</b>; there is none — the O–H present is an <b>alcohol</b>.</> },
            { point: <><b>S eliminated</b>: it has <b>no O–H</b>, but the spectrum shows an <b>alcohol O–H</b> at about <b>3500 cm⁻¹</b>.</> },
          ]}
        />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">c.</p>
        <p className="mb-2">The mass spectrum of the unknown compound is shown below.</p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={msSrc}
            alt="Mass spectrum of the unknown compound, relative intensity against m/z from 10 to 150: base peak at m/z 59, tall peaks at 31, 41 and 43, small peaks near 87 and 102 — from the original 2021 VCAA exam paper"
            className="w-full max-w-[520px]"
          />
        </div>
      </div>

      <PartCard
        letter="c.i"
        topic="Fragment Ions"
        marks={1}
        statement={<>Write the chemical formula of the species that produces a peak at m/z = 43.</>}
        examinerReport={EXAM_CI}
      >
        <Background title="How to Think About It">
          <p>
            Every peak in a mass spectrum is a <b>positive ion</b>, so the answer is a formula with a + charge whose mass adds up
            to 43. Think about which piece the unknown (R) could break into: CH₃CO⁺ is the obvious one. The report says the
            answer was generally handled well, except that the <b>positive charge</b> was frequently missing.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CI} />
        <MarkScheme source="ours" points={[{ point: <>A correct formula of mass 43 <b>with the positive charge</b>, e.g. <b>[CH₃CO]⁺</b> (or [C₂H₃O]⁺, [(CH₃)₂CH]⁺, [C₃H₇]⁺).</> }]} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Mass-to-Charge Ratio"
        marks={1}
        statement={<>Define m/z as used in mass spectroscopy.</>}
        examinerReport={EXAM_CII}
      >
        <Background title="How to Think About It">
          <p>
            A one-mark definition: say what the letters stand for. m is the mass of the ion and z is its charge, so m/z is the
            <b> mass-to-charge ratio</b>. Only 31% of students earned this mark, so don&rsquo;t skip the basics.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CII} />
        <MarkScheme source="ours" points={[{ point: <><b>Mass-to-charge ratio</b> (the mass of the ion ÷ its charge).</> }]} />
      </PartCard>

      <PartCard
        letter="c.iii"
        topic="Fragmentation"
        marks={2}
        statement={<>Explain why one molecule can produce multiple peaks on a mass spectrum.</>}
        examinerReport={EXAM_CIII}
      >
        <Background title="How to Think About It">
          <p>
            Two marks, two ideas. First, a peak only appears for an <b>ion</b> — the molecule must be ionised to a cation.
            Second, <i>why more than one</i> ion: the molecular ion is <b>unstable and fragments</b> into smaller cations of
            different m/z (or the molecule contains <b>different isotopes</b>). Saying only &ldquo;it breaks up&rdquo; without
            mentioning ions misses the first mark.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CIII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <><b>Ions (cations)</b> must be formed for any peak to appear on a mass spectrum.</> },
            { point: <>Multiple ions form because the <b>parent (molecular) ion is unstable</b> and <b>fragments</b>, <i>or</i> because of the <b>different isotopes</b> present in the parent ion.</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
