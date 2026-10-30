// 2020 Chemistry Exam, Section B Question 8 (7 marks). Identifying an unknown C₄H₈O
// (non-cyclic, one double bond) from its IR spectrum, the number of ¹³C NMR environments and its
// high-resolution ¹H NMR spectrum. Question text transcribed from the original paper; the IR and
// ¹H NMR spectra are cropped from the original VCAA exam PDF; the ¹H NMR data table is
// transcribed. The structural formulas in part b (the report's accepted answers, and the two
// shown in our working) are cropped from the VCAA examination report. Mark distributions and
// comments are from the report (VCAA report only — no second source); the "How to Think About It"
// notes, model answers and mark schemes are original. Data Book ranges checked against the 2026
// Data Book (items 21–23; the paper cites no item numbers).
// Report slip: part a's comment says "the quoted range of 3100–3400 cm⁻¹" — the question quotes
// 3100–4000 cm⁻¹. Kept verbatim, flagged in the working.
// Study-design note: the compound VCAA intended (2-methoxypropene) is an ether, a functional group
// the current study design does not list; the question is still answerable (part b also accepts
// butanone and butanal, and the Data Book still lists R–O–CH₃ shifts). Flagged as borderline.

import { Background, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import irSrc from './chem-2020sa-q8-ir-spectrum.png'
import nmrSrc from './chem-2020sa-q8c-h-nmr.png'
import reportStructSrc from './chem-2020sa-q8b-report-structure.png'
import methoxySrc from './chem-2020sa-q8b-methoxypropene.png'
import butanoneSrc from './chem-2020sa-q8b-butanone.png'

const EXAM_A: SAExaminerStats = {
  marks: [45, 9, 46],
  average: 1.0,
  comment: (
    <>
      Compound is not an alcohol, since there is no O-H bond in the molecule.
      <br />
      This is shown by a lack of a peak in the O-H(alcohols) range (3200-3600 cm⁻¹).
      <br />
      One mark was awarded for recognising the lack of any O-H peak and one mark for the use of
      evidence to support this.
      <br />
      Students needed to pay attention to the quoted range of 3100–3400 cm⁻¹. A significant number
      of responses was centred on incorrectly discussing the C-H bonding peak being an O-H peak and
      therefore the compound must be an alcohol. Careful use of the Data Book could have avoided this
      error.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [27, 18, 56],
  average: 1.3,
  comment: (
    <>
      Any two of the following were accepted.
      <br />
      <img
        loading="lazy"
        decoding="async"
        src={reportStructSrc}
        alt="Six structural formulas accepted by VCAA: 2-methoxypropene CH₂=C(CH₃)–O–CH₃ (labelled 'Correct structure for the compound being analysed'), ethenyl ethyl ether CH₂=CH–O–CH₂–CH₃, butanone CH₃–CO–CH₂–CH₃, butanal CH₃–CH₂–CH₂–CHO, 3-methoxypropene CH₃–O–CH₂–CH=CH₂ and 1-methoxypropene CH₃–O–CH=CH–CH₃ — cropped from the 2020 VCAA examination report"
        className="w-full max-w-[520px] mt-1 mb-1 bg-white rounded"
      />
      <br />
      The compounds accepted had to show four distinct carbon environments and also not show an O-H
      bond.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [25, 35, 27, 12],
  average: 1.3,
  comment: (
    <>
      Any three of the following were accepted.
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>Three sets of peaks on the ¹H NMR spectrum indicates three (hydrogen) environments.</li>
        <li>
          No signal splitting (single peaks) on ¹H NMR spectrum indicates there are no regions in the
          molecule where H atoms are attached to adjacent C atoms / there are no neighbouring H atoms.
        </li>
        <li>
          The peak area ratio 3:3:2 indicates the three different hydrogen environments contain 3, 3
          and 2 hydrogen atoms respectively.
        </li>
        <li>
          The type of environment is indicated by the chemical shift, for example
          <br />
          δ = 1.82 indicates -CH=CH-C<b>H</b>₃, δ = 3.53 indicates - OC<b>H</b>₃.
        </li>
      </ul>
      This question was designed so that the students only needed to provide information from the ¹H
      NMR spectrum or the table of data to answer it. Some students, however, tried to match their
      chosen structure to the data. Some students also assumed the peak area was linked to peak
      splitting.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <>There is <b>no broad absorption</b> in the region 3100–4000 cm⁻¹ — the transmittance stays close to 90–95% across it. The only dips nearby are the <b>sharp, narrow C–H peaks</b> at about 2850–3120 cm⁻¹.</>,
    reason: (
      <>
        Read the spectrum first: a peak is a dip <i>down</i> from the baseline. From 4000 cm⁻¹ down to about 3130 cm⁻¹ the line is flat. Then comes a cluster of sharp, narrow dips: these are <b>C–H</b> stretches (Data Book: C–H 2850–3090 cm⁻¹). The small first dip, at about 3120 cm⁻¹, sits just above the Data Book range — it is the C–H on the C=C (H atoms on a double-bonded carbon absorb at the high end of the C–H range). It is far too narrow and shallow to be O–H. The report notes that a significant number of responses discussed this C–H peak as an O–H peak.
      </>
    ),
  },
  {
    working: <>An <b>O–H (alcohols)</b> bond absorbs at <b>3200–3600 cm⁻¹</b> (and O–H (acids) at 2500–3500 cm⁻¹), as a <b>broad, strong</b> band.</>,
    reason: <>Evidence mark: the <b>evidence</b> — quote the Data Book range that falls inside 3100–4000 cm⁻¹. An O–H band is wide and deep; nothing like it appears here.</>,
  },
  {
    working: <b>So the molecule contains no O–H bond: C₄H₈O is not an alcohol (or a carboxylic acid).</b>,
    reason: (
      <>
        Conclusion mark: the <b>conclusion about the bonds</b>. The one O atom must therefore be in a C–O–C link or a C=O group. (The report writes &ldquo;3100–3400 cm⁻¹&rdquo; in its comment — a slip for the 3100–4000 cm⁻¹ the question quotes.)
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <>C₄H₈O: a saturated non-cyclic C₄ compound would have 2 × 4 + 2 = 10 H, so 8 H means <b>one double bond</b> (C=C or C=O).</>,
    reason: <>This matches the stem (non-cyclic, one double bond). The double bond can be between two carbons or between carbon and the oxygen.</>,
  },
  {
    working: <>From part a: <b>no O–H</b>, so the O is in a C=O group (aldehyde or ketone) or a C–O–C link.</>,
    reason: <>The report: accepted compounds had to &ldquo;not show an O-H bond&rdquo;. So unsaturated alcohols such as but-3-en-2-ol or but-2-en-1-ol are out.</>,
  },
  {
    working: <>Four ¹³C NMR peaks → <b>four different carbon environments</b>, so all four C atoms must be in different environments (no two equivalent carbons).</>,
    reason: <>Each peak in a ¹³C NMR spectrum is one carbon environment. This rules out, for example, 2-methylpropanal, (CH₃)₂CHCHO, whose two CH₃ groups are equivalent (only 3 peaks).</>,
  },
  {
    working: (
      <div className="flex flex-col gap-2">
        <span>Structure 1 (<b>butanone</b>, CH₃COCH₂CH₃):</span>
        <img loading="lazy" decoding="async" src={butanoneSrc} alt="Structural formula of butanone, CH₃–CO–CH₂–CH₃, with all H atoms shown — cropped from the 2020 VCAA examination report" className="w-full max-w-[200px] bg-white rounded" />
        <span>Structure 2 (<b>2-methoxypropene</b>, CH₂=C(CH₃)OCH₃):</span>
        <img loading="lazy" decoding="async" src={methoxySrc} alt="Structural formula of 2-methoxypropene, CH₂=C(CH₃)–O–CH₃, with all H atoms shown — cropped from the 2020 VCAA examination report" className="w-full max-w-[190px] bg-white rounded" />
      </div>
    ),
    reason: (
      <>
        One mark per correct structure. Check each: C₄H₈O ✓, non-cyclic ✓, one double bond ✓, no O–H ✓, four different carbons ✓ (butanone: the CH₃ next to C=O, the C=O carbon, the CH₂, the end CH₃; 2-methoxypropene: the O–CH₃, the C=C carbon bonded to O, the =CH₂, the CH₃ on the C=C). Draw a <b>structural</b> formula — every bond and every H shown. Other accepted answers: butanal, CH₂=CH–O–CH₂CH₃, CH₃–O–CH₂–CH=CH₂ and CH₃–O–CH=CH–CH₃ (see the report below).
      </>
    ),
  },
  {
    working: <><b>Two structural formulas drawn, each C₄H₈O with four carbon environments and no O–H.</b></>,
    reason: <>2-methoxypropene is the compound VCAA actually used — part c&rsquo;s ¹H NMR picks it out. C–O–C compounds (ethers) are not a named functional group in the current study design, so butanone and butanal are the safest choices today; any two of the six earn both marks.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <>1. There are <b>three peaks</b>, so there are <b>three different hydrogen environments</b> in the molecule.</>,
    reason: <>Information + what it tells you = one mark. Each peak (set of peaks) in a ¹H NMR spectrum is one H environment.</>,
  },
  {
    working: <>2. The <b>relative peak areas 3 : 3 : 2</b> give the <b>number of H atoms</b> in each environment: 3, 3 and 2 (8 H in total, matching C₄H₈O).</>,
    reason: <>The area under a peak (integration) is proportional to the number of H atoms in that environment. Area tells you <i>how many</i> H — it has nothing to do with splitting (the report notes some students linked the two).</>,
  },
  {
    working: <>3. Every peak is a <b>single peak (singlet)</b> — <b>no splitting</b> — so <b>no H atoms are on neighbouring (adjacent) carbon atoms</b>; each H environment has zero neighbouring H.</>,
    reason: <>The n + 1 rule: a peak splits into n + 1 lines, where n is the number of H on the adjacent carbon(s). A singlet means n + 1 = 1, so n = 0.</>,
  },
  {
    working: <>4. The <b>chemical shifts</b> show the <b>type of H environment</b>: δ = 1.82 ppm fits a CH₃ on a C=C carbon (RHC=CH–C<b>H</b>₃, 1.6–1.9 ppm) and δ = 3.53 ppm fits an <b>O–CH₃</b> (R–O–C<b>H</b>₃, 3.3–3.7 ppm).</>,
    reason: <>Compare each shift with the Data Book&rsquo;s ¹H NMR table. Any <b>three</b> of these four points earn the 3 marks — writing all four is a safe habit.</>,
  },
  {
    working: <b>Three pieces of information, each paired with what it shows about the structure.</b>,
    reason: (
      <>
        Do <b>not</b> answer by describing your structure from part b — the report says the question only wanted information read from the spectrum or table. (Put together, the data give CH₃–O– (3.53, 3H), a CH₃ on C=C (1.82, 3H) and a =CH₂ (3.85, 2H — lower than the Data Book&rsquo;s 4.5–7.0 ppm for alkene H, because the O is attached to the other end of the C=C) with no H on neighbouring carbons: CH₂=C(CH₃)–O–CH₃, 2-methoxypropene.)
      </>
    ),
  },
]

const td = 'border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center'

export default function ChemistryQ8_2020SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 8 (7 marks)</p>
        <p className="mb-3">
          An unknown organic compound has a molecular formula of C₄H₈O.
          <br />
          The compound is <b>non-cyclic</b> and contains a <b>double bond</b>.
          <br />
          The infra-red (IR) spectrum of the molecule is shown below.
        </p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit max-w-full">
          <img
            loading="lazy"
            decoding="async"
            src={irSrc}
            alt="IR spectrum, transmittance (%) against wave number 4000 to 500 cm⁻¹: flat near 90–95% from 4000 to about 3100 cm⁻¹; a cluster of sharp C–H dips between about 3100 and 2850 cm⁻¹; strong sharp peaks near 1660, 1300 and 1100 cm⁻¹ and several smaller ones below 1500 cm⁻¹ — data from SDBS Web, National Institute of Advanced Industrial Science and Technology, from the original 2020 VCAA exam paper"
            className="w-full max-w-[600px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="IR Spectroscopy"
        marks={2}
        statement={<>What does the region 3100–4000 cm⁻¹ indicate about the bonds in C₄H₈O? Give your reasoning.</>}
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            Look only at 3100–4000 cm⁻¹ and ask: which bonds absorb there? In the Data Book, that is
            O–H (and N–H, but there is no N). Two marks means two ideas: a <b>conclusion</b> (no O–H
            bond, so not an alcohol) and the <b>evidence</b> (no broad peak in the O–H range, 3200–3600
            cm⁻¹). The trap the report describes: calling the sharp C–H peaks at about 2850–3120 cm⁻¹ an
            O–H peak.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Recognising the <b>lack of any O–H peak</b> — so there is <b>no O–H bond</b> and the compound is <b>not an alcohol</b>.</> },
            { point: <>The <b>evidence</b>: <b>no absorption</b> in the <b>O–H (alcohols) range, 3200–3600 cm⁻¹</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="b"
        topic="Structural Isomers"
        marks={2}
        statement={
          <>
            The ¹³C NMR spectrum of the unknown compound has four distinct peaks.
            <br />
            Draw <b>two</b> possible structural formulas of the unknown compound using the information
            provided.
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="How to Think About It">
          <p>
            Collect every clue and use them all: C₄H₈O, non-cyclic, one double bond, <b>no O–H</b>{' '}
            (part a) and <b>four different carbon environments</b> (four ¹³C peaks). Then list
            isomers that satisfy every clue. Each correct structure earns one mark, so check each one
            against all the clues — an alcohol, or a molecule with two equivalent carbons, scores
            nothing.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <MarkScheme
          source="ours"
          points={[
            { point: <>A first correct <b>structural formula</b>: C₄H₈O, <b>non-cyclic</b>, <b>one double bond</b>, <b>no O–H</b>, <b>four distinct carbon environments</b> (e.g. butanone).</> },
            { point: <>A <b>second, different</b> correct structural formula meeting the same conditions (e.g. 2-methoxypropene, butanal).</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="c"
        topic="¹H NMR Spectroscopy"
        marks={3}
        statement={
          <>
            The high-resolution ¹H NMR spectrum of the unknown compound has three single peaks, as shown
            below.
            <div className="my-3 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit max-w-full">
              <img
                loading="lazy"
                decoding="async"
                src={nmrSrc}
                alt="High-resolution ¹H NMR spectrum, 11 to 0 ppm: three single peaks, at about 3.85, 3.53 and 1.82 ppm, the 3.53 ppm peak the tallest — data from SDBS Web, National Institute of Advanced Industrial Science and Technology, from the original 2020 VCAA exam paper"
                className="w-full max-w-[520px]"
              />
            </div>
            <table className="text-[13.5px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 mb-3">
              <thead>
                <tr><th className={td}>Chemical shift (ppm)</th><th className={td}>Relative peak area</th></tr>
              </thead>
              <tbody>
                <tr><td className={td}>1.82</td><td className={td}>3</td></tr>
                <tr><td className={td}>3.53</td><td className={td}>3</td></tr>
                <tr><td className={td}>3.85</td><td className={td}>2</td></tr>
              </tbody>
            </table>
            Refer to the ¹H NMR spectrum and the table of spectrum information provided above.
            <br />
            Identify three pieces of information about the unknown compound and indicate how each would
            assist in determining its structure.
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background title="How to Think About It">
          <p>
            A ¹H NMR spectrum gives four kinds of information: the <b>number of peaks</b>, the{' '}
            <b>peak areas</b>, the <b>splitting</b> and the <b>chemical shifts</b>. Three marks means
            three of these, and each mark needs both halves — <b>what you see</b> and <b>what it tells
            you</b> about the structure. Read it straight from the spectrum and table; the report notes
            some students tried to match their chosen structure to the data instead, and some linked peak
            area to splitting.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <MarkScheme
          source="ours"
          points={[
            { point: <>Any one of: <b>three peaks → three H environments</b>; <b>peak areas 3 : 3 : 2 → 3, 3 and 2 H</b> in those environments; <b>singlets (no splitting) → no H on adjacent C atoms</b>; <b>chemical shift → type of environment</b> (1.82 ppm C<b>H</b>₃ on C=C, 3.53 ppm O–C<b>H</b>₃).</> },
            { point: <>A <b>second</b> of these, again with <b>what it indicates</b> about the structure.</> },
            { point: <>A <b>third</b> of these, again with <b>what it indicates</b> about the structure.</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
