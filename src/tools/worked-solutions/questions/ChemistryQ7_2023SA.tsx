// 2023 Chemistry Exam, Section B Question 7 (10 marks). Identifying molecule V (C₅H₁₀O,
// 3-methylbutan-2-one) from its mass spectrum, ¹H NMR and ¹³C NMR spectra, then explaining why
// one molecule absorbs several different frequencies of infrared radiation. Question text
// transcribed from the original paper; the four spectra are cropped from the original VCAA exam
// PDF, and the structure in part c.'s report comment (also shown in our working) is cropped from
// the VCAA examination report. Mark allocations: the report itemises the marks for a.i, c and d;
// for a.ii and b it prints only the answer, so those mark schemes are our reading. The "How to
// Think About It" notes and model answers are original (VCAA report only — no second source).
// Molar mass and the ¹³C isotope estimate checked in Python. Spectroscopy ranges quoted are from
// the 2026 Data Book (items 21–23); the paper cites no Data Book item numbers.
// The 2023 report prints its mark distributions as proportions (0.3, 0.1, 0.6); they are shown
// here as percentages. Two of its rows are VCAA slips kept as printed: 7a.ii reads 0.4 / 0.7
// (sums to 1.1; the 0.7 average implies 0.3 / 0.7) and 7c reads 0.4 / 0.3 / 0.1 / 0.3 (sums to
// 1.1). Part d. (why IR absorption occurs at different frequencies) leans on IR theory beyond the
// current study design's "identification of bond types … using characteristic absorption bands";
// written up and flagged as borderline for KZ.

import Chem from '../Chem'
import { Background, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import msSrc from './chem-2023sa-q7-mass-spectrum.png'
import hnmrSrc from './chem-2023sa-q7-h-nmr.png'
import cnmrSrc from './chem-2023sa-q7-c-nmr.png'
import irSrc from './chem-2023sa-q7-ir.png'
import structureSrc from './chem-2023sa-q7c-report-structure.png'

const STEM_BOX =
  'text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4'
const FIG_BOX = 'bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit'

const EXAM_AI: SAExaminerStats = {
  marks: [30, 10, 60],
  average: 1.3,
  comment: (
    <>
      The first mark was awarded for the correct molecular formula of C₅H₁₀O.
      <br />
      The second mark was awarded for reference to the parent ion being located at m/z = 86, and hence the
      molar mass of the compound must have been 86 g mol⁻¹.
    </>
  ),
}

const EXAM_AII: SAExaminerStats = {
  marks: [40, 70],
  average: 0.7,
  comment: <>The peak at m/z = 87 is an isotopic peak caused by a ¹³C isotope being present in the molecule.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [50, 50],
  average: 0.5,
  comment: (
    <>
      The doublet seen in the spectrum is formed according to the n+1 rule and is due to the presence of a
      single non-equivalent hydrogen located on an adjacent carbon atom.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [40, 30, 10, 30],
  average: 1.3,
  comment: (
    <>
      <img
        loading="lazy"
        decoding="async"
        src={structureSrc}
        alt="Full structural formula of 3-methylbutanone from the VCAA report: a C=O carbon bonded to a CH3 group and to a CH carbon that carries two CH3 groups"
        className="block w-full max-w-[220px] my-1 bg-white rounded"
      />
      The first mark was awarded for any structure drawn that was a valid isomer of C₅H₁₀O.
      <br />
      The second mark was awarded if this structure then had either four carbon environments or three
      hydrogen environments (i.e. was consistent with the patterns seen in the NMR spectra).
      <br />
      The third mark was awarded only if the student produced a correctly drawn, full structural diagram for
      the compound 3-methylbutanone.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [30, 50, 10, 10],
  average: 0.9,
  comment: (
    <>
      The first mark was awarded for the recognition that the different bonds, or the functional groups, are
      what is causing the absorption of different frequencies of infrared radiation.
      <br />
      The second and third marks could be obtained from discussion of any two of the following
      possibilities: strength of bonds / mass of atoms attached to bonds / bond length / bond dipoles /
      electronegativity differences / different types of molecular vibrations (i.e. stretching, wagging,
      flexing, etc.).
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <>The <b>molecular ion (parent) peak</b> is at <b>m/z = 86</b>, so M(V) = <b>86 g mol⁻¹</b>.</>,
    reason: (
      <>
        The molecular ion M⁺ is the whole molecule with one electron removed, so its m/z (charge 1+) equals the
        molar mass. It is the peak at the <b>highest m/z</b> (ignoring the tiny peak just after it — part a.ii)
        — not the tallest peak. The tallest (base) peak at 43 is a fragment. Mark 2.
      </>
    ),
  },
  {
    working: <>One O atom: 86 − 16.0 = 70 g mol⁻¹ left for C and H</>,
    reason: <>The stem says V has exactly one oxygen atom (A<sub>r</sub>(O) = 16.0).</>,
  },
  {
    working: <>C₅H₁₀: 5 × 12.0 + 10 × 1.0 = 70 ✓</>,
    reason: <>Try the number of carbons: 6 C would already be 72 &gt; 70, so at most 5 C; 5 × 12.0 = 60 leaves 70 − 60 = 10 for hydrogen. (4 C would need 22 H — impossible, since 4 C can hold at most 10 H.)</>,
  },
  {
    working: <b>Molecular formula: <Chem eq="C5H10O" /> (M = 86.0 g mol⁻¹)</b>,
    reason: <>Mark 1. Check: C₅H₁₀O has one degree of unsaturation (C<sub>n</sub>H<sub>2n</sub>O), room for exactly one C=O — which the ¹³C peak above 200 ppm will confirm in part c.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <>The peak at m/z = 87 is the <b>M+1 peak</b>: molecular ions that contain one <b>¹³C isotope</b> instead of ¹²C, so they are 1 mass unit heavier.</>,
    reason: (
      <>
        About 1.1% of carbon atoms are ¹³C. With 5 carbons, about 5 × 1.1% ≈ 5.5% of molecules carry one ¹³C,
        so the M+1 peak is roughly 5.5% of the 23%-high M⁺ peak — about 1%, a tiny peak, exactly as drawn. The
        key word is <b>isotope</b>: it is not a fragment and not an impurity.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <>By the <b>n + 1 rule</b>, a doublet (2 peaks) means n = 1: the hydrogens at 1.1 ppm are on a carbon <b>adjacent to a carbon bonded to one hydrogen</b> (a C–H neighbour).</>,
    reason: (
      <>
        A signal is split into n + 1 peaks by the n hydrogens on the <b>neighbouring</b> carbon(s). Doublet → 2 = n + 1 → n = 1. The
        report&rsquo;s wording: a single non-equivalent hydrogen on an adjacent carbon. Saying only &ldquo;there are
        2 neighbouring H&rdquo; (counting the peaks, not n) is a mix-up to avoid: n is one less than the number of peaks.
      </>
    ),
  },
  {
    working: <>(This signal is the two equivalent <Chem eq="CH3" /> groups of a <Chem eq="(CH3)2CH–" /> group.)</>,
    reason: <>Not needed for the mark, but it is what the doublet means in molecule V: the tallest signal (6 H) at about 1 ppm (R–CH₃, 0.9–1.0 ppm in the Data Book) split by the single H of the CH.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <>¹³C NMR: <b>4 peaks</b> → <b>4 carbon environments</b> (5 C atoms, so two C are equivalent)</>,
    reason: <>Count the peaks: about 212, 41, 27 and 18 ppm. Four environments for five carbons means two carbons are identical — a sign of symmetry, such as two CH₃ groups on the same carbon. Once the structure is found, the shifts fit the Data Book: 41 ppm the CH (R₃–CH, 40–60), 27 ppm the CH₃ on the C=O, and 18 ppm the two equivalent CH₃ groups (R–CH₃, 8–25).</>,
  },
  {
    working: <>Peak at ≈ 212 ppm → <b>ketone C=O</b> (R₂C=O, 205–220 ppm)</>,
    reason: <>From the Data Book&rsquo;s ¹³C table. An aldehyde C=O would be 190–200 ppm, so V is a <b>ketone</b>, not an aldehyde. This uses up the one O and the one degree of unsaturation from part a.i.</>,
  },
  {
    working: <>¹H NMR: <b>3 signals</b> → <b>3 hydrogen environments</b>: 1.1 ppm (doublet), 2.1 ppm (singlet), ≈ 2.6 ppm (multiplet)</>,
    reason: (
      <>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li>2.1 ppm <b>singlet</b>: a CH₃ next to the C=O (CH₃–CO–R, 2.1–2.7 ppm). Singlet → n = 0, no H on the neighbouring carbon (the C=O carbon has none).</li>
          <li>1.1 ppm <b>doublet</b>: two equivalent CH₃ groups on a CH (part b).</li>
          <li>≈ 2.6 ppm <b>multiplet</b>: that one CH, split by the 6 H of the two CH₃ groups (n = 6 → 7 peaks); it is next to the C=O, so it is shifted up.</li>
        </ul>
      </>
    ),
  },
  {
    working: <>MS fragments: m/z 43 = <Chem eq="CH3CO+" /> (or C₃H₇⁺); m/z 71 = M⁺ − CH₃ (86 − 15)</>,
    reason: <>A check, not a mark: the base peak at m/z 43 is CH₃CO⁺ (or C₃H₇⁺) and the peak at 71 is the molecular ion having lost a CH₃ (86 − 15).</>,
  },
  {
    working: (
      <>
        <div className="bg-white rounded-lg p-2 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={structureSrc}
            alt="Full structural formula of 3-methylbutan-2-one: CH3–CO–CH(CH3)2 with every bond and hydrogen drawn — cropped from the VCAA report"
            className="w-full max-w-[200px]"
          />
        </div>
        <b><Chem eq="CH3COCH(CH3)2" />, 3-methylbutan-2-one</b>
      </>
    ),
    reason: (
      <>
        Put the pieces together: CH₃–C(=O)– + –CH(CH₃)₂ = C₅H₁₀O ✓, 4 C environments (C=O, CH, CH₃–CO, two equivalent CH₃) ✓, 3 H environments in a 3 : 6 : 1 ratio ✓. Draw it as a <b>full structural formula</b> — every C–H bond shown — because the third mark needs a correctly drawn full structure (structure cropped from VCAA&rsquo;s report). The report calls it &ldquo;3-methylbutanone&rdquo;; the locant 2 can be left out because the C=O can only be on carbon 2. Pentan-2-one or pentan-3-one, or 3-methylbutanal, are isomers of C₅H₁₀O but give the wrong number of environments or splitting.
      </>
    ),
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <>Infrared radiation is absorbed when its frequency matches the <b>natural vibration frequency of a bond</b>; molecule V contains <b>different types of bonds</b> (C=O, C–H, C–C), and each type absorbs a <b>different frequency</b>.</>,
    reason: <>Mark 1: different bonds (or functional groups) absorb different frequencies. In this spectrum: the C=O stretch near 1715 cm⁻¹ and the C–H stretches near 2970 cm⁻¹ (Data Book C–H 2850–3090). The 2026 Data Book lists ketone C=O as 1680–1700 cm⁻¹; this real ketone absorbs a little higher, but the strong, sharp band near 1700 is still clearly C=O.</>,
  },
  {
    working: <>The frequency at which a bond vibrates depends on the <b>strength of the bond</b>: a stronger bond (such as the C=O <b>double bond</b>) vibrates at a higher frequency than a weaker single bond such as C–C.</>,
    reason: <>Mark 2: one factor from the report&rsquo;s list (bond strength). Bond length goes with this — shorter, stronger bonds absorb at higher wavenumber.</>,
  },
  {
    working: <>It also depends on the <b>masses of the atoms</b> joined by the bond: bonds to a light H atom (C–H) vibrate at a higher frequency than bonds between heavier atoms.</>,
    reason: <>Mark 3: a second, different factor (mass of the atoms). Other accepted factors: bond length, bond dipole / electronegativity difference, and the <b>different types of vibration</b> (stretching, bending) one bond can have.</>,
  },
  {
    working: <>So the one molecule absorbs at <b>several different frequencies</b>, giving several absorption bands.</>,
    reason: <>Tie it back to the question. Three marks means three ideas: (1) different bonds absorb different frequencies, then two separate reasons why.</>,
  },
]

export default function ChemistryQ7_2023SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className={STEM_BOX}>
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 7 (10 marks)</p>
        <p className="mb-2">Molecule V contains only carbon atoms, hydrogen atoms and one oxygen atom.</p>
        <p className="mb-3">The mass spectrum of molecule V is shown below.</p>
        <div className={FIG_BOX}>
          <img
            loading="lazy"
            decoding="async"
            src={msSrc}
            alt="Mass spectrum of molecule V: relative intensity against m/z from 10 to 90, base peak at m/z 43, other peaks at 15, 27, 39, 41, 57 and 71, molecular ion at m/z 86 and a very small peak at 87 — from the original 2023 VCAA exam paper"
            className="w-full max-w-[520px]"
          />
        </div>
      </div>

      <PartCard
        letter="a.i"
        topic="Molecular Formula"
        marks={2}
        statement={<>State the molecular formula of molecule V. Justify your answer by using the information in the mass spectrum.</>}
        examinerReport={EXAM_AI}
      >
        <Background title="How to Think About It">
          <p>
            Two marks, two ideas: the <b>formula</b> and the <b>evidence</b> for it. The evidence is the <b>molecular
            ion peak</b> — the peak at the highest m/z (86), not the tallest one (43) — which gives the molar mass.
            Then fit C and H around the single O to make 86. Writing the formula without naming the molecular ion
            at m/z = 86 loses the justification mark.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AI} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>The correct <b>molecular formula C₅H₁₀O</b>.</> },
            { point: <>Reference to the <b>parent (molecular) ion at m/z = 86</b>, so the <b>molar mass is 86 g mol⁻¹</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="M+1 Peak"
        marks={1}
        statement={<>State why there is a small peak at m/z = 87.</>}
        examinerReport={EXAM_AII}
      >
        <Background title="How to Think About It">
          <p>
            One step past the molecular ion means the same molecule, 1 unit heavier. The only way a molecule
            gains exactly 1 mass unit is a heavier <b>isotope</b> — here a ¹³C atom in place of a ¹²C. One mark, one
            idea: name the <b>¹³C isotope</b>.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AII} />
        <MarkScheme
          source="ours"
          points={[{ point: <>An <b>isotopic peak</b>: a molecular ion containing one <b>¹³C isotope</b> (M+1).</> }]}
        />
      </PartCard>

      <div className={STEM_BOX}>
        <p className="mb-3">The ¹H NMR spectrum of molecule V is shown below.</p>
        <div className={FIG_BOX}>
          <img
            loading="lazy"
            decoding="async"
            src={hnmrSrc}
            alt="¹H NMR spectrum of molecule V from 11 to 0 ppm: a small multiplet near 2.6 ppm, a tall singlet at 2.1 ppm and a tall doublet at 1.1 ppm — from the original 2023 VCAA exam paper"
            className="w-full max-w-[520px]"
          />
        </div>
      </div>

      <PartCard
        letter="b"
        topic="Splitting Pattern"
        marks={1}
        statement={<>State what information the doublet at 1.1 ppm provides about the structure of the molecule.</>}
        examinerReport={EXAM_B}
      >
        <Background title="How to Think About It">
          <p>
            Splitting tells you about the <b>neighbours</b>, not the hydrogens themselves. Use the <b>n + 1 rule</b>{' '}
            backwards: a doublet is 2 peaks, so n = 1 — there is <b>one hydrogen on the adjacent carbon</b>. Only half
            of students got this mark; the answer has to say what the splitting reveals about the <i>neighbouring</i>{' '}
            carbon.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <MarkScheme
          source="ours"
          points={[{ point: <>Using the <b>n + 1 rule</b>: there is <b>one hydrogen</b> (a single non-equivalent H) on the <b>adjacent carbon</b> atom.</> }]}
        />
      </PartCard>

      <div className={STEM_BOX}>
        <p className="mb-3">The ¹³C NMR spectrum of molecule V is shown below.</p>
        <div className={FIG_BOX}>
          <img
            loading="lazy"
            decoding="async"
            src={cnmrSrc}
            alt="¹³C NMR spectrum of molecule V from 200 to 0 ppm: four peaks, at about 212, 41, 27 and 18 ppm — from the original 2023 VCAA exam paper"
            className="w-full max-w-[520px]"
          />
        </div>
      </div>

      <PartCard
        letter="c"
        topic="Structure Determination"
        marks={3}
        statement={
          <>
            In the space below, draw a structural formula of molecule V that is consistent with the information
            provided in <b>parts a.–c.</b>
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background title="How to Think About It">
          <p>
            Build the molecule from clues, then check it against every spectrum. The marks step up: (1) any valid
            isomer of <b>C₅H₁₀O</b>; (2) one that matches the NMR — <b>4 carbon environments</b> or <b>3 hydrogen
            environments</b>; (3) the right molecule, <b>3-methylbutanone</b>, drawn as a <b>full structural
            formula</b>. Key clues: the ¹³C peak above 200 ppm (a ketone C=O), the ¹H singlet at 2.1 ppm (CH₃ next to
            C=O) and the doublet (CH₃ groups next to a CH). Only 30% scored all 3 marks — check your structure&rsquo;s
            environments before you commit.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Any structure that is a <b>valid isomer of C₅H₁₀O</b>.</> },
            { point: <>That structure has <b>four carbon environments</b> or <b>three hydrogen environments</b> (consistent with the NMR spectra).</> },
            { point: <>A correctly drawn, <b>full structural diagram</b> of <b>3-methylbutanone</b>.</> },
          ]}
        />
      </PartCard>

      <div className={STEM_BOX}>
        <p className="mb-3">The infrared (IR) spectrum of molecule V is shown below.</p>
        <div className={FIG_BOX}>
          <img
            loading="lazy"
            decoding="async"
            src={irSrc}
            alt="IR spectrum of molecule V: transmittance (%) against wave number from 4000 to 500 cm⁻¹, with a strong sharp absorption near 1715 cm⁻¹, strong absorptions near 2970 cm⁻¹ and several bands between 1500 and 1000 cm⁻¹ — from the original 2023 VCAA exam paper"
            className="w-full max-w-[560px]"
          />
        </div>
      </div>

      <PartCard
        letter="d"
        topic="IR Absorption"
        marks={3}
        statement={<>Explain why different frequencies of infrared radiation can be absorbed by the same molecule as shown in the spectrum above.</>}
        examinerReport={EXAM_D}
      >
        <Background title="How to Think About It">
          <p>
            This asks for the <b>reason</b> behind an IR spectrum, not for peak identification. A molecule absorbs IR
            when the radiation makes a <b>bond vibrate</b>, and different bonds vibrate at different frequencies.
            Three marks: (1) say that <b>different bonds / functional groups</b> absorb different frequencies, then
            (2)–(3) give <b>two separate factors</b> that set a bond&rsquo;s frequency — e.g. <b>bond strength</b> and the{' '}
            <b>mass of the atoms</b>. Half the cohort scored exactly 1 of the 3 marks, so naming the bonds is not enough: give two separate reasons.
          </p>
          <p>
            Study-design note: the current course asks you to identify bonds from characteristic absorption bands;
            this &ldquo;why&rdquo; question goes a little further, but the ideas are worth knowing.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Recognising that the <b>different bonds</b>, or <b>functional groups</b>, cause the absorption of different frequencies of IR radiation.</> },
            {
              marks: 2,
              point: (
                <>
                  Discussion of <b>any two</b> of: <b>strength of bonds</b> / <b>mass of atoms</b> attached to bonds / <b>bond length</b> /{' '}
                  <b>bond dipoles</b> / <b>electronegativity differences</b> / <b>different types of molecular vibrations</b> (stretching,
                  wagging, flexing, etc.).
                </>
              ),
            },
          ]}
        />
      </PartCard>
    </div>
  )
}
