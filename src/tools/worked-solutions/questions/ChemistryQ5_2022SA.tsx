// 2022 Chemistry Exam, Section B Question 5 (10 marks). Identifying Molecule J (methyl
// chloroethanoate, ClCH₂COOCH₃) from its ¹³C NMR, IR, mass and ¹H NMR spectra: the carbon
// environment at 168 ppm, ester versus carboxylic acid from the IR spectrum, the ³⁷Cl molecular-ion
// peak, how the two molecular-ion peaks give the molecular mass of 108.5, what two ¹H NMR singlets
// mean, and the structural formula. Question text transcribed from the original paper; all four
// spectra are cropped from the original VCAA exam PDF; the two structures in part e.'s report
// comment are cropped from the VCAA examination report, and the left one is reused (cropped from
// the report, not redrawn) as the model answer. VCAA report only. Mark allocations are from the
// report, which states every mark here; the "How to Think About It" notes and model answers are
// original. Data Book ranges are quoted from the 2026 Data Book (items 21–23); the paper cites no
// item numbers. Numbers (molar mass 108.5, isotope weighted average, fragment masses) checked in
// Python. All parts are on the current study design (MS, IR, ¹³C and ¹H NMR; Unit 4 Area of
// Study 2), and c.ii also draws on Unit 1's relative atomic mass from isotopes.

import { Background, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import c13Src from './chem-2022sa-q5-c13-nmr.png'
import irSrc from './chem-2022sa-q5b-ir.png'
import msSrc from './chem-2022sa-q5c-mass-spectrum.png'
import h1Src from './chem-2022sa-q5d-h1-nmr.png'
import reportStructSrc from './chem-2022sa-q5e-report-structure.png'
import structSrc from './chem-2022sa-q5e-structure.png'

const STEM_BOX =
  'text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4'
const FIG_BOX = 'bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit'

const EXAM_A: SAExaminerStats = {
  marks: [11, 89],
  average: 0.9,
  comment: <>Carboxylic acid (-COOH) or Ester (-COO-R)</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [39, 41, 20],
  average: 0.8,
  comment: (
    <>
      Ester
      <br />
      The second mark was awarded for the recognition of the <b>absence</b> of a broad -O-H (acid) peak
      between 2500 cm⁻¹ – 3500 cm⁻¹ and therefore it could not be a carboxylic acid.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [85, 15],
  average: 0.1,
  comment: <>The peak at m/z = 110 is due to the ³⁷Cl isotope or is due to an isotope of chlorine.</>,
}

const EXAM_CII: SAExaminerStats = {
  marks: [97, 2, 1],
  average: 0.03,
  comment: (
    <>
      One mark was awarded for the recognition that the two peaks at m/z = 108 and m/z = 110 are both
      parent ions.
      <br />
      The second mark was awarded for the recognition that the relative molar mass is a weighted average
      of these two parent ions based on their relative abundances.
      <br />
      There were very few high-scoring responses to this question. Most students tried to discuss
      ‘base peak’ or ‘fragments’ and did not attempt to specifically address how the spectra allowed the
      determination of the relative molecular mass of the molecule.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [17, 38, 45],
  average: 1.3,
  comment: (
    <>
      One mark was awarded for the recognition that there are two different hydrogen environments.
      <br />
      The second mark was awarded for either one of the two following points:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>There are no neighbouring/adjacent hydrogen environments because the peaks are singlets.</li>
        <li>The ratio of the hydrogens in the two environments is 2:3.</li>
      </ul>
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [55, 10, 35],
  average: 0.8,
  comment: (
    <>
      One mark was awarded for any valid structural drawing with the chemical formulae C₃H₅O₂Cl.
      <br />
      Because of the relative differences in chemical shifts of the two singlets, the second mark was
      awarded for specific drawing of either of the two compounds shown below.
      <br />
      <img
        loading="lazy"
        decoding="async"
        src={reportStructSrc}
        alt="Two structural formulas from the VCAA report. Left, labelled 'Structural formula fully consistent with spectra': Cl–CH2–C(=O)–O–CH3. Right, labelled 'Structural formula not fully consistent with spectra but accepted': CH3–C(=O)–O–CH2–Cl"
        className="w-full max-w-[520px] mt-1 bg-white rounded"
      />
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <>168 ppm lies in the range for the carbon of a <b>C=O</b> group that is also bonded to an <b>O</b> atom.</>,
    reason: (
      <>
        Data Book ¹³C-NMR table: RCOOH 160–185 ppm; ester R–C(=O)–OR 165–175 ppm. 168 ppm is inside both ranges
        — that is why the question says there are <i>two</i> possibilities.
      </>
    ),
  },
  {
    working: <b>The carbon in a carboxylic acid group (–COOH) or the carbon in an ester group (–COO–R).</b>,
    reason: (
      <>
        Either one earns the mark. (The 2026 Data Book also lists amides, R–C(=O)–NH₂, at 165–185 ppm, but the
        report&rsquo;s answer names only the acid and the ester — give one of those.)
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <>The strong, sharp absorption at about <b>1750 cm⁻¹</b> is due to a <b>C=O</b> bond.</>,
    reason: (
      <>
        Data Book IR table: C=O (esters) 1720–1750 cm⁻¹; C=O (acids) 1680–1740 cm⁻¹. This confirms the 168 ppm
        carbon is a C=O carbon, but on its own it can&rsquo;t separate an ester from an acid — the ranges overlap.
      </>
    ),
  },
  {
    working: (
      <>
        There is <b>no broad O–H (acid) absorption</b> between <b>2500 and 3500 cm⁻¹</b>. The only absorptions near
        3000 cm⁻¹ are the sharp C–H peaks.
      </>
    ),
    reason: (
      <>
        Mark 2 — the justification. A carboxylic acid&rsquo;s O–H gives a very broad, deep absorption across
        2500–3500 cm⁻¹ (Data Book). Here the trace sits near 90% transmittance there, apart from narrow C–H dips
        at about 2950–3000 cm⁻¹ (C–H: 2850–3090 cm⁻¹). The report credits the <b>absence</b> of the O–H peak.
      </>
    ),
  },
  {
    working: <b>The functional group is an ester (–COO–), not a carboxylic acid.</b>,
    reason: <>Mark 1 — name the group. C=O present + no acid O–H ⇒ ester.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <>Chlorine has two <b>isotopes</b>, <b>³⁵Cl</b> and <b>³⁷Cl</b>, and each molecule of J contains one Cl atom.</>,
    reason: (
      <>
        The Data Book&rsquo;s relative atomic mass of Cl, 35.5, is the weighted average of these two isotopes (about 75%
        ³⁵Cl and 25% ³⁷Cl). Any single molecule has either a ³⁵Cl or a ³⁷Cl in it — never &ldquo;35.5&rdquo;.
      </>
    ),
  },
  {
    working: <>The peaks at m/z = 108 and 110 differ by 2, the mass difference between ³⁷Cl and ³⁵Cl.</>,
    reason: (
      <>
        Nothing appears above 110, so these are the heaviest ions — whole molecules that have lost one electron. Their
        heights (about 6.5 and 2.2) are in a ratio of about 3 : 1, the natural ratio of ³⁵Cl to ³⁷Cl.
      </>
    ),
  },
  {
    working: <b>The peak at m/z = 110 is the molecular (parent) ion of J that contains the ³⁷Cl isotope.</b>,
    reason: <>The mark is for linking the 110 peak to the <b>³⁷Cl isotope</b> (the report also accepted &ldquo;an isotope of chlorine&rdquo;).</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <>No single molecule has a mass of 108.5, so there is <b>no peak at m/z = 108.5</b>.</>,
    reason: <>This is the puzzle the question is pointing at: the given molecular mass isn&rsquo;t a peak on the spectrum.</>,
  },
  {
    working: (
      <>
        The peaks at <b>m/z = 108 and m/z = 110 are both molecular (parent) ions</b>: the molecular ion containing ³⁵Cl
        (108) and the molecular ion containing ³⁷Cl (110).
      </>
    ),
    reason: <>Mark 1 — from part c.i. Both are the whole molecule, just with different chlorine isotopes.</>,
  },
  {
    working: (
      <>
        The molecular mass, 108.5, is the <b>weighted average</b> of the masses of these two molecular ions, <b>based on
        their relative abundances</b> (peak heights).
      </>
    ),
    reason: <>Mark 2 — the same idea as finding the relative atomic mass of an element from its isotopes (Unit 1).</>,
  },
  { working: <>M<sub>r</sub> = (abundance of 108 × 108 + abundance of 110 × 110) ÷ total abundance</>, reason: <>Checking it with the spectrum: peak heights about 6.5 and 2.2, i.e. about 3 : 1, or 75% : 25%.</> },
  { working: <>M<sub>r</sub> ≈ 0.75 × 108 + 0.25 × 110</> },
  {
    working: <b>M<sub>r</sub> ≈ 108.5</b>,
    reason: (
      <>
        Matches the given molecular mass ✓. The base peak (59) and the other fragment peaks do not give the molecular
        mass — the report notes that most students discussed &lsquo;base peak&rsquo; or &lsquo;fragments&rsquo; instead.
      </>
    ),
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <><b>Two peaks</b> means there are <b>two different hydrogen environments</b> in the molecule.</>,
    reason: <>Mark 1. In ¹H NMR, each peak (or split group of peaks) is one set of equivalent H atoms.</>,
  },
  {
    working: (
      <>
        Both peaks are <b>singlets</b>, so by the n + 1 rule (n = 0) neither environment has any <b>hydrogens on the
        neighbouring (adjacent) carbon</b>.
      </>
    ),
    reason: <>Mark 2 (either this point or the next earns it). A singlet = n + 1 = 1 line, so n = 0 neighbouring H atoms.</>,
  },
  {
    working: (
      <>
        The peak heights are in the ratio of about <b>2 : 3</b>, so the hydrogens are split <b>2 H : 3 H</b> between the two
        environments — e.g. a CH₂ group and a CH₃ group.
      </>
    ),
    reason: (
      <>
        Peak area is proportional to the number of H atoms; for two sharp singlets like these, the heights show the same
        ratio. Here the 4.1 ppm peak is about two-thirds the height of the
        3.8 ppm peak. Writing both points is the safe way to secure the second mark.
      </>
    ),
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <>Pieces: an <b>ester</b> group –COO– (b); one <b>Cl</b> (c); a <b>CH₂</b> and a <b>CH₃</b> with no H neighbours (d); <b>3 carbon environments</b> (three ¹³C peaks).</>,
    reason: <>Collect what each spectrum told you before drawing anything. Three ¹³C peaks (168, about 53 and about 41 ppm) and three C atoms means every carbon is different.</>,
  },
  { working: <>Molecular formula: C₃H₅O₂Cl</>, reason: <>3 C, 5 H (2 + 3), 2 O (the ester group) and 1 Cl.</> },
  { working: <>M = 3(12.0) + 5(1.0) + 2(16.0) + 35.5</>, reason: <>Check the formula against the molecular mass from part c (Data Book atomic masses).</> },
  { working: <>M = 108.5 g mol⁻¹ ✓</>, reason: <>Mark 1 is for any valid structure with the formula <b>C₃H₅O₂Cl</b>.</> },
  {
    working: <>Two arrangements fit: ClCH₂–COO–CH₃ or CH₃–COO–CH₂Cl. The CH₃ must be bonded to the <b>O</b>, not to the C=O, because both ¹H peaks are at 3.8–4.1 ppm and there is <b>no peak at 2.0 ppm</b>.</>,
    reason: (
      <>
        Mark 2 depends on the chemical shifts. Data Book ¹H-NMR table: CH₃–C(=O)OR is at 2.0 ppm (not seen); R–O–CH₃ is
        3.3–3.7 ppm (observed: the taller, 3 H peak at about 3.8 — a little higher, as the nearby C=O also pulls electron density away); R–CH₂–X (X = Cl) is 3.0–4.5 ppm (observed: the 2 H peak at
        about 4.1). On the ¹³C spectrum, about 41 ppm is the CH₂–Cl carbon (R–CH₂–X: 15–80 ppm) and about 53 ppm is
        the O–CH₃ carbon (the Data Book has no row for it, but a carbon bonded to an O sits around 50–90 ppm, like
        R–CH₂–OH).
      </>
    ),
  },
  {
    working: (
      <>
        <div className={FIG_BOX}>
          <img
            loading="lazy"
            decoding="async"
            src={structSrc}
            alt="Structural formula of methyl chloroethanoate: a CH2Cl carbon (H, H and Cl attached) bonded to a C=O carbon, which is bonded to an O that is bonded to a CH3 carbon — cropped from the 2022 VCAA examination report"
            className="w-full max-w-[280px]"
          />
        </div>
        <b>Molecule J: ClCH₂COOCH₃ (methyl 2-chloroethanoate)</b>
      </>
    ),
    reason: (
      <>
        Draw every atom and every bond, including the C=O double bond. Check with the mass spectrum: the base peak at 59 is
        [COOCH₃]⁺ (24.0 + 32.0 + 3.0 = 59), the 3 : 1 pairs at 77/79 and 49/51 are [ClCH₂CO]⁺ and [CH₂Cl]⁺ with ³⁵Cl/³⁷Cl ✓.
        The report also gave full marks for CH₃COOCH₂Cl, though it is not fully consistent with the spectra.
      </>
    ),
  },
]

export default function ChemistryQ5_2022SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className={STEM_BOX}>
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (10 marks)</p>
        <p className="mb-3">
          A chemist uses spectroscopy to identify an unknown organic molecule, Molecule J, that contains chlorine.
          <br />
          The ¹³C NMR spectrum of Molecule J is shown below.
        </p>
        <div className={FIG_BOX}>
          <img
            loading="lazy"
            decoding="async"
            src={c13Src}
            alt="¹³C NMR spectrum of Molecule J, chemical shift 200 to 0 ppm: three peaks, at about 168 ppm, about 53 ppm and about 41 ppm (tallest) — from the original 2022 VCAA exam paper"
            className="w-full max-w-[440px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="¹³C NMR Spectroscopy"
        marks={1}
        statement={
          <>
            There are two possible carbon environments that can produce the peak at 168 ppm.
            <br />
            Identify <b>one</b> of the two possible carbon environments that can produce the peak at 168 ppm.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            A ¹³C chemical shift tells you what a carbon is bonded to. Look up 168 ppm in the Data Book&rsquo;s ¹³C-NMR table
            and see which rows include it. One mark, one idea: name one environment — a carbon in <b>–COOH</b> or in an{' '}
            <b>ester –COO–</b>.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme source="vcaa" points={[{ point: <>A <b>carboxylic acid (–COOH)</b> carbon <b>or</b> an <b>ester (–COO–R)</b> carbon.</> }]} />
      </PartCard>

      <div className={STEM_BOX}>
        <p className="mb-3">The infra-red (IR) spectrum of Molecule J is shown below.</p>
        <div className={FIG_BOX}>
          <img
            loading="lazy"
            decoding="async"
            src={irSrc}
            alt="IR spectrum of Molecule J, transmittance 0 to 100% against wave number 4000 to 500 cm⁻¹: no broad absorption between 2500 and 3500 cm⁻¹, small sharp dips near 3000 cm⁻¹, a very strong sharp absorption near 1750 cm⁻¹, and many peaks below 1500 cm⁻¹ — from the original 2022 VCAA exam paper"
            className="w-full max-w-[560px]"
          />
        </div>
      </div>

      <PartCard
        letter="b"
        topic="IR Spectroscopy"
        marks={2}
        statement={
          <>
            Name the functional group that produces the peak at 168 ppm in the ¹³C NMR spectrum above, which is consistent
            with the IR spectrum shown above. Justify your answer with reference to the IR spectrum.
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="How to Think About It">
          <p>
            Part a left two options, acid or ester. The IR spectrum decides between them. Both have a C=O, so the C=O peak
            can&rsquo;t settle it; what separates them is the acid&rsquo;s <b>O–H</b>, which gives a huge broad absorption at
            2500–3500 cm⁻¹. Two marks: <b>name the group</b> (ester), then <b>justify</b> it from the spectrum — the report
            gave the second mark for pointing out the <b>absence</b> of the broad O–H (acid) peak.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Names the functional group as an <b>ester</b>.</> },
            { point: <>Justifies it: <b>no broad O–H (acid) peak</b> between <b>2500 and 3500 cm⁻¹</b>, so it <b>cannot be a carboxylic acid</b>.</> },
          ]}
        />
      </PartCard>

      <div className={STEM_BOX}>
        <p className="mb-3">The mass spectrum of Molecule J is shown below.</p>
        <div className={`${FIG_BOX} mb-3`}>
          <img
            loading="lazy"
            decoding="async"
            src={msSrc}
            alt="Mass spectrum of Molecule J, relative intensity against m/z from 10 to 110: base peak (100) at m/z 59; other peaks at about 15 (35), 29 (19), 42 (12), 49 (45), 51 (14), 64 (16), 77 (27) and 79 (9); small peaks at 108 (about 6) and 110 (about 2) — from the original 2022 VCAA exam paper"
            className="w-full max-w-[520px]"
          />
        </div>
        <p className="font-semibold text-gray-900 dark:text-white mb-1">c.</p>
        <p>The molecular mass of Molecule J is 108.5</p>
      </div>

      <PartCard
        letter="c.i"
        topic="Isotope Peaks"
        marks={1}
        statement={<>Explain the presence of the peak at 110 m/z.</>}
        examinerReport={EXAM_CI}
      >
        <Background title="How to Think About It">
          <p>
            The stem told you J contains chlorine, and the molecular mass, 108.5, is not a whole number — both are clues that
            chlorine&rsquo;s <b>isotopes</b> matter. The peak at 110 sits 2 above the peak at 108: the same molecule, but
            with the heavier chlorine isotope. Only 15% of students earned this mark.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CI} />
        <MarkScheme source="vcaa" points={[{ point: <>The 110 peak is due to the <b>³⁷Cl isotope</b> (or &ldquo;an <b>isotope of chlorine</b>&rdquo;).</> }]} />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Molecular Ion"
        marks={2}
        statement={<>Explain how the peaks in the mass spectrum relate to the molecular mass of Molecule J.</>}
        examinerReport={EXAM_CII}
      >
        <Background title="How to Think About It">
          <p>
            &ldquo;The peaks&rdquo; here means the two at the high-mass end, 108 and 110 — not the base peak or the fragments. The report says most students discussed
            &lsquo;base peak&rsquo; or &lsquo;fragments&rsquo; instead, and only 3% scored any marks. Two marks, two ideas: both
            peaks are <b>molecular (parent) ions</b>, and 108.5 is their <b>weighted average</b> by <b>relative abundance</b>{' '}
            — exactly how a relative atomic mass is worked out from isotopes.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>The peaks at <b>m/z = 108 and 110 are both parent (molecular) ions</b>.</> },
            { point: <>The relative molecular mass is a <b>weighted average</b> of these two parent ions, <b>based on their relative abundances</b>.</> },
          ]}
        />
      </PartCard>

      <div className={STEM_BOX}>
        <p className="mb-3">The ¹H NMR spectrum of Molecule J is shown below.</p>
        <div className={FIG_BOX}>
          <img
            loading="lazy"
            decoding="async"
            src={h1Src}
            alt="¹H NMR spectrum of Molecule J, chemical shift 10 to 0 ppm: two single lines, a shorter one at about 4.1 ppm and a taller one at about 3.8 ppm — from the original 2022 VCAA exam paper"
            className="w-full max-w-[380px]"
          />
        </div>
      </div>

      <PartCard
        letter="d"
        topic="¹H NMR Spectroscopy"
        marks={2}
        statement={
          <>
            The ¹H NMR spectrum consists of two singlet peaks.
            <br />
            What information does this give about the molecule?
          </>
        }
        examinerReport={EXAM_D}
      >
        <Background title="How to Think About It">
          <p>
            Read a ¹H NMR spectrum three ways: the <b>number of peaks</b> (how many H environments), the <b>splitting</b>{' '}
            (how many H on the neighbouring carbons, by the n + 1 rule) and the <b>peak areas</b> (how many H in each
            environment). Two marks: the first for the number of environments, the second for <i>either</i> the splitting or
            the 2 : 3 ratio — so give both.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>There are <b>two different hydrogen environments</b>.</> },
            {
              point: (
                <>
                  Either: <b>no neighbouring/adjacent hydrogens</b> because the peaks are <b>singlets</b>; or: the ratio of
                  hydrogens in the two environments is <b>2 : 3</b>.
                </>
              ),
            },
          ]}
        />
      </PartCard>

      <PartCard
        letter="e"
        topic="Structure Determination"
        marks={2}
        statement={
          <>
            Draw a structural formula for Molecule J that is consistent with the information provided in <b>parts a.–d.</b>
          </>
        }
        examinerReport={EXAM_E}
      >
        <Background title="How to Think About It">
          <p>
            Put the pieces together: an ester group, one Cl, a CH₂ and a CH₃ with no neighbouring H, and three C atoms. Check
            the formula gives 108.5 — that earns the first mark. There are two ways to join the pieces; the second mark needs
            the <b>chemical shifts</b> to choose: a CH₃ on the C=O side of an ester would appear at 2.0 ppm, and there is no
            peak there. 55% of students scored zero, so build the formula step by step rather than guessing a structure.
          </p>
        </Background>
        <WorkingTable rows={ROWS_E} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Any valid structural formula with the molecular formula <b>C₃H₅O₂Cl</b>.</> },
            {
              point: (
                <>
                  The specific structure <b>ClCH₂–COO–CH₃</b> (fully consistent with the shifts) — the report also
                  accepted CH₃–COO–CH₂Cl.
                </>
              ),
            },
          ]}
        />
      </PartCard>
    </div>
  )
}
