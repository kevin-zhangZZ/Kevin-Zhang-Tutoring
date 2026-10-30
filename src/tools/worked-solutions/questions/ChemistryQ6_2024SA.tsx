// 2024 Chemistry Exam, Section B Question 6 (13 marks). Structure determination of Compound X,
// C₅H₁₁ClO, from its IR spectrum, mass spectrum, ¹³C NMR spectrum and high-resolution ¹H NMR
// spectrum: the bond with the highest wave number, the base peak, the m/z = 73 fragment, carbon
// environments, what an integration curve shows, the 1 : 2 : 2 : 6 proton ratio, the two
// equivalent CH₃ groups and the final structure (3-chloro-2,2-dimethylpropan-1-ol).
// Question text transcribed from the original paper (the 2024 paper has no extractable text, so
// every page was read from a rendered image). The IR, mass, ¹³C and ¹H spectra and the four
// integration curves in the part d.iii table are cropped from the original VCAA exam PDF (the
// table's text columns are transcribed); the structure in the part e comment is cropped from the
// VCAA examination report. Mark allocations: VCAA report (itemised for a, b.ii, c, d.iv, e; our
// reading for b.i, d.i, d.ii, d.iii). "How to Think About It" notes and model answers are
// original; VCAA report only, no second source. Peak positions read off the spectra by pixel
// measurement; integration-curve heights measured from the crops (≈ 1 : 1.8 : 1.8 : 5.4, i.e.
// 1 : 2 : 2 : 6 within drawing error); masses checked in Python.
// Data Book: the paper's items 22 (IR), 23 (¹³C NMR) and 24 (¹H NMR) are items 21, 22 and 23 in
// the 2026 Data Book; the ranges used here are unchanged — Data Book notes say so.

import { Background, DataBookNote, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import irSrc from './chem-2024sa-q6-ir-spectrum.png'
import msSrc from './chem-2024sa-q6b-mass-spectrum.png'
import c13Src from './chem-2024sa-q6c-c13-nmr.png'
import h1Src from './chem-2024sa-q6d-h1-nmr.png'
import int1Src from './chem-2024sa-q6diii-integration1.png'
import int2Src from './chem-2024sa-q6diii-integration2.png'
import int3Src from './chem-2024sa-q6diii-integration3.png'
import int4Src from './chem-2024sa-q6diii-integration4.png'
import reportStructSrc from './chem-2024sa-q6e-report-structure.png'

const STEM_BOX =
  'text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4'
const FIG_BOX = 'bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit'
const TD = 'border border-gray-300 dark:border-gray-700 px-3 py-1.5 align-top text-center'

const EXAM_A: SAExaminerStats = {
  marks: [32, 68],
  average: 0.7,
  comment: (
    <>
      To gain the mark, the response needed to clearly identify the bond type as O-H <b>and</b> state that it was
      due to an &lsquo;alcohol&rsquo; as shown in the Data Book (i.e. O-H (alcohol)).
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [25, 75],
  average: 0.8,
  comment: (
    <>
      m/z = 56
      <br />
      Students should avoid attempting to use &lsquo;m/z&rsquo; as a unit (for example, &lsquo;56 m/z&rsquo;).
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [50, 50],
  average: 0.5,
  comment: (
    <>
      Either of the following representations were accepted:
      <br />[ C₄H₉O ]⁺ or [ (CH₃)₂CCH₂OH ]⁺
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [14, 26, 41, 19],
  average: 1.7,
  comment: (
    <>
      One mark was awarded for recognising that the compound had only four carbon environments.
      <br />
      One mark was awarded for recognising that the compound must have two carbons in the same environment.
      <br />
      The third mark could be obtained from any one of the following:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>a statement that Compound X has a side chain/branch or is a non-linear molecule</li>
        <li>a statement that Compound X has a point of symmetry</li>
        <li>
          any reference to one of the specific peaks located on the spectra being matched to a particular carbon
          type and chemical shift from item 23 of the Data Book.
        </li>
      </ul>
    </>
  ),
}

const EXAM_DI: SAExaminerStats = {
  marks: [80, 20],
  average: 0.2,
  comment: (
    <>
      The integration curve is a representation of the area of a signal for a hydrogen environment or a
      &lsquo;peak area&rsquo;.
      <br />
      This question was not well answered, and often responses to Question 6d.ii were repeat answers. Careful
      reading of the question was needed to understand the correct terminology that applied to each of these two
      questions.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [68, 32],
  average: 0.3,
  comment: (
    <>
      The relative size of an integration curve is proportional to the <b>ratio</b> or the <b>relative number</b> of
      hydrogens present in that hydrogen environment.
    </>
  ),
}

const EXAM_DIII: SAExaminerStats = {
  marks: [80, 20],
  average: 0.2,
  comment: (
    <>
      The relative size of an integration curve shown in the table indicates that the ratio of hydrogens present
      in each of the compound&rsquo;s four hydrogen environments are 1:2:2:6.
      <br />
      This question was not well answered, and often responses did not relate understanding of these
      integration curves back to the structure of Compound X.
    </>
  ),
}

const EXAM_DIV: SAExaminerStats = {
  marks: [13, 68, 19],
  average: 1.1,
  comment: (
    <>
      The first mark was awarded for understanding that the peak at 0.96 suggests that an R-CH₃ group is present.
      <br />
      The second mark was awarded for linking the information from Question 6d.iii and stating that therefore
      there must be two R-CH₃ groups present in Compound X.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [31, 49, 20],
  average: 0.9,
  comment: (
    <>
      The first mark was awarded for any structure showing the correct atoms connected to form an alcohol with a
      chemical formula of C₅H₁₁ClO.
      <br />
      The second mark was awarded for the correct structure of 3-chloro-2,2-dimethylpropan-1-ol.
      <br />
      <img
        loading="lazy"
        decoding="async"
        src={reportStructSrc}
        alt="Full structural formula of 3-chloro-2,2-dimethylpropan-1-ol: a central carbon bonded to two CH3 groups, a CH2–OH group and a CH2–Cl group — from the VCAA examination report"
        className="w-full max-w-[200px] mt-1 bg-white rounded"
      />
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <>Broad absorption at about 3200–3500 cm⁻¹ (centred near 3350 cm⁻¹)</>,
    reason: (
      <>
        Read the spectrum from the <b>left</b> — wave number increases to the left, so the first deep trough you meet
        is the highest-wave-number bond. The broad, rounded trough is the classic hydrogen-bonded O–H shape.
      </>
    ),
  },
  {
    working: <>Data Book: O–H (alcohols) 3200–3600 cm⁻¹</>,
    reason: (
      <>
        The other candidates: C–H (2850–3090 cm⁻¹) is the sharp pair just below 3000 — lower. O–H (acids) is
        ruled out: an acid needs a C=O, and there is no strong peak near 1700 cm⁻¹ (and the formula has only one O).
        <DataBookNote>
          the paper&rsquo;s &ldquo;item 22&rdquo; (infrared absorption) is item 21 in the 2026 Data Book; the
          O–H (alcohols) range, 3200–3600 cm⁻¹, is unchanged.
        </DataBookNote>
      </>
    ),
  },
  {
    working: <b>O–H (alcohol)</b>,
    reason: (
      <>
        The mark needs <b>both</b> the bond (O–H) <b>and</b> &ldquo;alcohol&rdquo; — the Data Book lists two
        different O–H ranges, so &ldquo;O–H&rdquo; alone is not enough.
      </>
    ),
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <>Tallest peak: relative intensity 100 at m/z = 56</>,
    reason: <>The <b>base peak</b> is the most abundant ion — the tallest line, which the spectrum sets to 100. (It is not the molecular ion, which is the tiny line at the far right, near m/z = 122.)</>,
  },
  {
    working: <b>m/z = 56</b>,
    reason: <>m/z is a <b>ratio with no unit</b> — write &ldquo;m/z = 56&rdquo;, not &ldquo;56 m/z&rdquo;, which the report says to avoid.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <>M(C₅H₁₁ClO) = 5(12.0) + 11(1.0) + 35.5 + 16.0 = 122.5 g mol⁻¹ (molecular ion at m/z = 122 with ³⁵Cl)</>,
    reason: <>Start from the molecular ion and ask what was lost to reach 73.</>,
  },
  {
    working: <>122 − 73 = 49 = mass of CH₂Cl (12 + 2 + 35)</>,
    reason: <>A loss of 49 is a CH₂Cl group breaking off. What is left contains C₄, H₉ and the O.</>,
  },
  {
    working: <>Check: C₄H₉O = 4(12.0) + 9(1.0) + 16.0 = 73</>,
    reason: <>The fragment&rsquo;s mass matches the peak. Mass spectra detect <b>positive ions</b>, so the species carries a + charge.</>,
  },
  {
    working: <b>[C₄H₉O]⁺</b>,
    reason: <>The <b>+ charge is part of the answer</b> — a formula with no charge describes a neutral molecule, not the ion the detector sees. VCAA also accepted the expanded form [(CH₃)₂CCH₂OH]⁺.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <>Four peaks → <b>four different carbon environments</b></>,
    reason: <>Mark 1. In ¹³C NMR, each peak is one carbon environment (not one carbon atom).</>,
  },
  {
    working: <>Five carbon atoms but only four environments → <b>two carbons are in the same (equivalent) environment</b></>,
    reason: <>Mark 2. The molecular formula has five C, so two of them must give the same signal.</>,
  },
  {
    working: (
      <>
        So the carbon chain is <b>branched</b> (not a straight chain) and the molecule has <b>symmetry</b> (as the ¹H NMR
        later confirms: two equivalent CH₃ groups on the same carbon).
      </>
    ),
    reason: <>Mark 3 — any one of: branched/non-linear, a point of symmetry, or a peak matched to the Data Book (next row). A straight five-carbon chain with Cl at one end and OH at the other would have five different environments, so five peaks.</>,
  },
  {
    working: (
      <>
        Peaks: about 22 ppm → <b>R–CH₃</b> (8–25); about 38 ppm → <b>R₄–C</b> (36–45); about 52 ppm →{' '}
        <b>R–CH₂–Cl</b> (R–CH₂–X, 15–80); about 68 ppm → <b>R–CH₂–OH</b> (50–90)
      </>
    ),
    reason: (
      <>
        Matching peaks to the Data Book also earns mark 3. The 22 ppm peak (R–CH₃) is most likely the two equivalent
        CH₃ carbons; 36–45 ppm for a carbon bonded to four other carbons supports the branch point.
        <DataBookNote>
          the report&rsquo;s &ldquo;item 23&rdquo; (¹³C NMR data) is item 22 in the 2026 Data Book; these ranges are
          unchanged.
        </DataBookNote>
      </>
    ),
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <>The integration curve represents the <b>area under the peak</b> (the <b>peak area</b>) for that hydrogen environment.</>,
    reason: (
      <>
        The height of the step in the curve is proportional to the area under the peak (study design wording). This
        part asks what the curve <i>is</i>; part d.ii asks what its size <i>tells you</i> — the report says answers to d.ii
        were often just a repeat of this one.
      </>
    ),
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: (
      <>
        The relative size of the integration curves gives the <b>ratio of the number of hydrogens</b> (the{' '}
        <b>relative number of hydrogen atoms</b>) in each hydrogen environment.
      </>
    ),
    reason: <>Peak area is proportional to how many H atoms produce that signal, so comparing the curves compares the H counts.</>,
  },
]

const ROWS_DIII: WorkingRow[] = [
  {
    working: <>Relative heights of the curves (4.16 : 3.44 : 3.39 : 0.96 ppm) ≈ 1 : 2 : 2 : 6</>,
    reason: <>Measure each step against the smallest. The second and third are about twice the first; the last is about six times.</>,
  },
  {
    working: <>1 + 2 + 2 + 6 = 11 = the 11 H in C₅H₁₁ClO</>,
    reason: <>A useful check: the ratio is the actual number of H in each environment, because the total matches the molecular formula.</>,
  },
  {
    working: (
      <>
        <b>The four hydrogen environments contain 1, 2, 2 and 6 hydrogens</b> (ratio <b>1 : 2 : 2 : 6</b>) — e.g. one
        O–H, two CH₂ groups and six equivalent H (two CH₃ groups).
      </>
    ),
    reason: <>The report says answers often did not relate the integration back to the <b>structure of Compound X</b> — so say what the numbers mean for the molecule, not just &ldquo;bigger curve, more H&rdquo;.</>,
  },
]

const ROWS_DIV: WorkingRow[] = [
  {
    working: <>0.96 ppm lies in the <b>R–CH₃</b> range (0.9–1.0 ppm) → a <b>CH₃ group</b> is present</>,
    reason: (
      <>
        Mark 1: match the chemical shift to the Data Book.
        <DataBookNote>
          the paper&rsquo;s &ldquo;item 24&rdquo; (¹H NMR data) is item 23 in the 2026 Data Book; R–CH₃ is still
          0.9–1.0 ppm.
        </DataBookNote>
      </>
    ),
  },
  {
    working: <>Integration = 6 H (part d.iii), but one CH₃ has only 3 H → <b>two equivalent CH₃ groups</b></>,
    reason: <>Mark 2: link to part d.iii. Six H in one environment at a CH₃ shift means two CH₃ groups in identical environments.</>,
  },
  {
    working: <>The peak is a singlet → the CH₃ groups are bonded to a carbon with <b>no hydrogens</b> (a quaternary C), so both CH₃ are on the <b>same carbon</b></>,
    reason: <>Extra support, by the n + 1 rule: a singlet means 0 neighbouring H. This agrees with the R₄–C peak at about 38 ppm in part c.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <>Central quaternary C carrying <b>two CH₃</b> groups (parts c and d.iv)</>,
    reason: <>Four C–C bonds to the centre carbon, no H on it — this explains why every ¹H peak is a singlet.</>,
  },
  {
    working: <>Remaining two bonds: <b>–CH₂–OH</b> and <b>–CH₂–Cl</b></>,
    reason: <>The O–H (alcohol) from part a, the CH₂–OH and CH₂–Cl carbons from part c, and the two 2-H environments from part d.iii. Count: C₅, H₁₁, Cl, O ✓.</>,
  },
  {
    working: (
      <>
        <b>
          HO–CH₂–C(CH₃)₂–CH₂–Cl
        </b>{' '}
        (draw every bond, as in VCAA&rsquo;s structure in the next row)
      </>
    ),
    reason: <>The condensed formula, read left to right: the OH on a CH₂, the central C with its two CH₃ groups, then the CH₂Cl.</>,
  },
  {
    working: (
      <img
        loading="lazy"
        decoding="async"
        src={reportStructSrc}
        alt="Full structural formula of 3-chloro-2,2-dimethylpropan-1-ol: a central carbon bonded to two CH3 groups, a CH2–OH group and a CH2–Cl group — from the VCAA examination report"
        className="w-full max-w-[200px] bg-white rounded"
      />
    ),
    reason: (
      <>
        3-chloro-2,2-dimethylpropan-1-ol. Mark 1 is for any alcohol with the correct atoms (C₅H₁₁ClO); mark 2 is
        for this exact arrangement. Check the m/z = 73 fragment from b.ii: removing CH₂Cl leaves (CH₃)₂C–CH₂OH,
        which is C₄H₉O ✓.
      </>
    ),
  },
]

export default function ChemistryQ6_2024SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className={STEM_BOX}>
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 6 (13 marks)</p>
        <p className="mb-2">Compound X has a molecular formula of C₅H₁₁ClO.</p>
        <p className="mb-3">The infrared spectrum of Compound X is shown below.</p>
        <div className={FIG_BOX}>
          <img
            loading="lazy"
            decoding="async"
            src={irSrc}
            alt="Infrared spectrum of Compound X, transmittance (%) against wave number 4000–400 cm⁻¹: a broad deep trough centred near 3350 cm⁻¹, sharp troughs just below 3000 cm⁻¹, nothing strong near 1700 cm⁻¹, and many peaks below 1500 cm⁻¹ — from the original 2024 VCAA exam paper"
            className="w-full max-w-[580px]"
          />
        </div>
      </div>

      <PartCard
        letter="a"
        topic="IR Spectroscopy"
        marks={1}
        statement={
          <>
            Use <b>item 22</b> of the Data Book to identify the bond type in Compound X that has the highest wave
            number.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            Find the absorption furthest to the <b>left</b> (highest wave number) and match it to the Data Book table.
            The trap is stopping at &ldquo;O–H&rdquo;: the Data Book has O–H (acids) and O–H (alcohols) as separate
            bond types, and the report required the word <b>alcohol</b>.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme
          source="vcaa"
          points={[{ point: <>Identifies the bond as <b>O–H</b> <b>and</b> states it is an <b>alcohol</b>: &ldquo;O–H (alcohol)&rdquo;.</> }]}
        />
      </PartCard>

      <div className={STEM_BOX}>
        <p className="font-semibold text-gray-900 dark:text-white mb-2">b.</p>
        <p className="mb-3">The mass spectrum of Compound X, C₅H₁₁ClO, is shown below.</p>
        <div className={FIG_BOX}>
          <img
            loading="lazy"
            decoding="async"
            src={msSrc}
            alt="Mass spectrum of Compound X, relative intensity against m/z from 10 to 125: tallest peak (100) at m/z 56 with a peak of about 60 at 55, a peak of about 42 at 73, peaks of about 15 near 90–91, smaller peaks around 27–45, and very small peaks near 107 and 122 — from the original 2024 VCAA exam paper"
            className="w-full max-w-[500px]"
          />
        </div>
      </div>

      <PartCard letter="b.i" topic="Base Peak" marks={1} statement={<>Identify the m/z of the base peak.</>} examinerReport={EXAM_BI}>
        <Background title="How to Think About It">
          <p>
            The <b>base peak</b> is the tallest peak (relative intensity 100) — not the molecular ion. Read its m/z
            off the axis and give it with no unit.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BI} />
        <MarkScheme source="ours" points={[{ point: <><b>m/z = 56</b> (no unit).</> }]} />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Fragment Ion"
        marks={1}
        statement={<>Identify the formula of the species that is responsible for the peak at m/z = 73.</>}
        examinerReport={EXAM_BII}
      >
        <Background title="How to Think About It">
          <p>
            A fragment peak is the molecular ion minus a piece that broke off. Work out the mass lost (molecular ion
            − 73), name that piece, and write what remains as a <b>positive ion</b>. Only half the cohort scored
            this mark. The species detected is an ion, so its formula carries the <b>+ charge</b>.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BII} />
        <MarkScheme
          source="vcaa"
          points={[{ point: <><b>[C₄H₉O]⁺</b> or <b>[(CH₃)₂CCH₂OH]⁺</b> (both accepted forms show the <b>positive charge</b>).</> }]}
        />
      </PartCard>

      <PartCard
        letter="c"
        topic="Carbon-13 NMR"
        marks={3}
        statement={
          <>
            The ¹³C NMR spectrum for Compound X is shown below.
            <div className={`${FIG_BOX} my-3`}>
              <img
                loading="lazy"
                decoding="async"
                src={c13Src}
                alt="Carbon-13 NMR spectrum of Compound X, 200 to 0 ppm: four single lines, at about 68, 52, 38 and 22 ppm, the one at 22 ppm the tallest — from the original 2024 VCAA exam paper"
                className="w-full max-w-[440px]"
              />
            </div>
            What information do the four peaks in the ¹³C NMR spectrum provide about the <b>arrangement</b> of the
            five carbon atoms in the structure of Compound X? Justify your answer.
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background title="How to Think About It">
          <p>
            Compare two numbers: <b>peaks</b> (4 = carbon environments) and <b>carbon atoms</b> (5, from the formula).
            Three marks means three ideas: four environments; so two carbons must be equivalent; and what that says
            about the <b>arrangement</b> — a branch/symmetry, backed up by matching peaks to the Data Book&rsquo;s
            chemical shifts. Don&rsquo;t just list the shifts — the question asks about the <i>arrangement</i>.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Only <b>four carbon environments</b>.</> },
            { point: <><b>Two carbons</b> must be in the <b>same environment</b> (equivalent).</> },
            {
              point: (
                <>
                  Any one of: X has a <b>side chain / branch</b> (non-linear); X has a <b>point of symmetry</b>; or a
                  specific peak <b>matched to a carbon type and chemical shift</b> from the Data Book.
                </>
              ),
            },
          ]}
        />
      </PartCard>

      <div className={STEM_BOX}>
        <p className="font-semibold text-gray-900 dark:text-white mb-2">d.</p>
        <p className="mb-3">The high-resolution ¹H NMR spectrum for Compound X is shown below.</p>
        <div className={FIG_BOX}>
          <img
            loading="lazy"
            decoding="async"
            src={h1Src}
            alt="High-resolution proton NMR spectrum of Compound X, 9.5 to 0 ppm: a small singlet near 4.2 ppm, a taller singlet near 3.4 ppm and the tallest singlet near 1.0 ppm — from the original 2024 VCAA exam paper"
            className="w-full max-w-[480px]"
          />
        </div>
      </div>

      <PartCard
        letter="d.i"
        topic="Integration Curve"
        marks={1}
        statement={
          <>
            Each peak in the ¹H NMR spectrum for Compound X is a singlet.
            <br />
            Each peak has an associated integration curve.
            <br />
            In general, what feature of a ¹H NMR peak is represented by its integration curve?
          </>
        }
        examinerReport={EXAM_DI}
      >
        <Background title="How to Think About It">
          <p>
            Only 20% scored this mark. The question asks what the curve <b>measures</b> (a feature of the peak), not
            what it tells you about the molecule — that is part d.ii. The answer is a property of the peak itself: its
            <b> area</b>.
          </p>
        </Background>
        <WorkingTable rows={ROWS_DI} />
        <MarkScheme source="ours" points={[{ point: <>The <b>area under the peak</b> (the <b>peak area</b>) for that hydrogen environment.</> }]} />
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Relative Peak Areas"
        marks={1}
        statement={
          <>
            ¹H NMR spectral analysis can provide information about the molecular structure of compounds.
            <br />
            In general, what information does the relative size of the integration curves for any given ¹H NMR
            spectrum provide about the molecular structure of the compound analysed?
          </>
        }
        examinerReport={EXAM_DII}
      >
        <Background title="How to Think About It">
          <p>
            Now the question is what the sizes <b>tell you</b>. Peak area is proportional to the number of H atoms
            giving that signal, so comparing curves gives the <b>ratio</b> (relative number) of hydrogens in each
            environment. Use the words &ldquo;ratio&rdquo; or &ldquo;relative number&rdquo; — the report bolds them.
          </p>
        </Background>
        <WorkingTable rows={ROWS_DII} />
        <MarkScheme
          source="ours"
          points={[{ point: <>The <b>ratio</b> / <b>relative number of hydrogens</b> in each <b>hydrogen environment</b>.</> }]}
        />
      </PartCard>

      <PartCard
        letter="d.iii"
        topic="Proton Ratio"
        marks={1}
        statement={
          <>
            The expected integration curves for Compound X are shown in the table below.
            <table className="text-[13.5px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 my-3">
              <thead>
                <tr>
                  <th className={TD}>Chemical shift (ppm)</th>
                  <th className={TD}>Splitting pattern</th>
                  <th className={TD}>Integration curve</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['4.16', int1Src, 'small'],
                  ['3.44', int2Src, 'medium'],
                  ['3.39', int3Src, 'medium'],
                  ['0.96', int4Src, 'large'],
                ].map(([shift, src, size]) => (
                  <tr key={shift}>
                    <td className={TD}>{shift}</td>
                    <td className={TD}>singlet</td>
                    <td className={`${TD} bg-white`}>
                      <img
                        loading="lazy"
                        decoding="async"
                        src={src}
                        alt={`A ${size} integration-curve step for the peak at ${shift} ppm — from the original 2024 VCAA exam paper`}
                        className="w-[110px] mx-auto"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            State what the relative size of the integration curves in the table above indicates about the molecular
            structure of Compound X.
          </>
        }
        examinerReport={EXAM_DIII}
      >
        <Background title="How to Think About It">
          <p>
            Apply part d.ii to <i>this</i> table: compare the heights of the four curves to get a whole-number ratio,
            then check it adds up to the 11 H in the formula. The report says answers often didn&rsquo;t relate the
            curves back to <b>Compound X&rsquo;s structure</b> — so state the ratio as numbers of hydrogens in its four
            environments.
          </p>
        </Background>
        <WorkingTable rows={ROWS_DIII} />
        <MarkScheme
          source="ours"
          points={[{ point: <>The four hydrogen environments of Compound X contain hydrogens in the ratio <b>1 : 2 : 2 : 6</b>.</> }]}
        />
      </PartCard>

      <PartCard
        letter="d.iv"
        topic="Chemical Shift"
        marks={2}
        statement={
          <>
            Consider the chemical shift and the size of the integration curve for the peak at 0.96 ppm. Refer to{' '}
            <b>item 24</b> of the Data Book.
            <br />
            What does this information indicate about the structure of Compound X?
          </>
        }
        examinerReport={EXAM_DIV}
      >
        <Background title="How to Think About It">
          <p>
            Two pieces of information, two marks: the <b>chemical shift</b> says what kind of H (look it up), and the{' '}
            <b>integration</b> says how many (6, from part d.iii). 68% scored only one of the two marks — put the two
            together: six H at a CH₃ shift means <b>two</b> CH₃ groups.
          </p>
        </Background>
        <WorkingTable rows={ROWS_DIV} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>The peak at 0.96 ppm indicates an <b>R–CH₃</b> group.</> },
            { point: <>Linked to the integration from d.iii (6 H): there are <b>two R–CH₃ groups</b> in Compound X.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="e"
        topic="Structure Deduction"
        marks={2}
        statement={
          <>
            In the space provided below, draw the structural diagram of Compound X, using the information provided in{' '}
            <b>parts a–d</b> of Question 6.
          </>
        }
        examinerReport={EXAM_E}
      >
        <Background title="How to Think About It">
          <p>
            Assemble the pieces: an alcohol O–H (a); a branch with two equivalent CH₃ groups on a carbon with no H
            (c, d.iv); two CH₂ groups and one O–H H (d.iii); four carbon types — CH₃, a quaternary C, CH₂–Cl, CH₂–OH
            (c). The only way to join them is to put the CH₃, CH₃, CH₂OH and CH₂Cl all on the central carbon. Then
            count atoms against C₅H₁₁ClO. Mark 1 is for a correct-formula alcohol; mark 2 needs this exact
            arrangement.
          </p>
        </Background>
        <WorkingTable rows={ROWS_E} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Any structure of an <b>alcohol</b> with the correct atoms, <b>C₅H₁₁ClO</b>.</> },
            { point: <>The correct structure: <b>3-chloro-2,2-dimethylpropan-1-ol</b>, HO–CH₂–C(CH₃)₂–CH₂–Cl.</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
