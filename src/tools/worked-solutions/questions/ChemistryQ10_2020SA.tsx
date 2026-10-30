// 2020 Chemistry Exam, Section B Question 10 (7 marks). Classical versus instrumental analysis of
// alcohols: (a) how qualitative tests (observations) and quantitative wet analysis (titration) give
// information about an alcohol; (b) how the principles of IR and ¹H NMR spectroscopy distinguish the
// two C₃H₆O isomers, propanone and prop-2-en-1-ol. Question text (including the quoted passage and
// its source line) transcribed from the original paper; the question has no figures. Mark
// allocations are from the VCAA examination report, which itemises the marks for both parts; the
// "How to Think About It" notes and model answers are original (VCAA report only — no second source).
// Study design: qualitative tests for hydroxyl/carboxyl/C=C groups, redox titrations, IR and ¹H NMR
// are all on the current (2024–2027) study design, so both parts are written up.
// Data Book: the report's IR ranges (C=O 1680–1850 cm⁻¹, C=C 1620–1680 cm⁻¹) are not the 2026 Data
// Book's — item 21 now gives C=O (ketones) 1680–1700 cm⁻¹ and has no C=C row; a Data Book note says
// so. The report's part a. average (0.5) is a little above what its own distribution gives (0.43);
// its part b. second alcohol, HO-CH=CH-CH₃, is an enol rather than a typical primary alcohol — both
// kept verbatim, the second explained in the working.

import Chem from '../Chem'
import { Background, DataBookNote, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [70, 17, 10, 2],
  average: 0.5,
  comment: (
    <>
      Qualitative analysis
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>Alcohols react with carboxylic acids to produce esters which can be identified by smell.</li>
        <li>No colour change with Cr₂O₇²⁻ / H⁺, not a primary or secondary alcohol, could be tertiary</li>
        <li>Colour change with Cr₂O₇²⁻ / H⁺, either primary or secondary alcohol</li>
        <li>If product of reaction with Cr₂O₇²⁻ / H⁺, reacts with NaHCO₃ – primary alcohol.</li>
        <li>If product of reaction with Cr₂O₇²⁻ / H⁺, does not react with NaHCO₃ – secondary alcohol.</li>
        <li>Addition of Br₂ – decolourisation implies a possible alkenol.</li>
        <li>If a pH test shows neutral it could be an alcohol.</li>
      </ul>
      Quantitative analysis
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>Can be titrated using a redox titration to determine concentration.</li>
        <li>Oxidise alcohol to acid and titrate with base.</li>
      </ul>
      Two marks were awarded for the qualitative analysis as long as a clear link to an observation could
      be made, i.e. a colour change, a smell, production of bubbles etc.
      <br />
      The last mark was associated with the quantitative change and a clear link to a titration or similar
      wet chemical analysis needed to be shown.
      <br />
      A large number of students struggled with this question, and responded solely by talking about
      instrumental analysis, which was not the requirement of the question. Many also did not seem to be
      aware that a qualitative analysis must involve an observation.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [40, 27, 28, 4, 2],
  average: 1.0,
  comment: (
    <>
      IR spectroscopy – Principle
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          IR measures the vibrations of atoms in a molecule and can give information about the type of bonds
          (functional groups) present in a molecule.
        </li>
        <li>IR involves the absorption of infrared radiation the wavenumber of which alters with different bond types.</li>
      </ul>
      Interpretation of spectra
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>In primary alcohols the O-H bond will show a distinct peak between 3200–3600 cm⁻¹.</li>
        <li>In ketones the C=O bond will show a distinct peak between 1680–1850 cm⁻¹.</li>
        <li>
          The lack of a peak in a region of the spectra can indicate the absence of a type of bond in a
          molecule. For example, the lack of a peak between 1680–1850 cm⁻¹ due to C=O indicates that the
          compound is unlikely to be a ketone.
        </li>
        <li>Since an alcohol C₃H₆O, is unsaturated it must have a C=C bond and it would have a peak at 1620–1680 cm⁻¹.</li>
      </ul>
      <sup>1</sup>H NMR spectroscopy – Principle
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          <sup>1</sup>H NMR measures the change in the spin state of nuclei and can give information about the
          H environment present in the molecule.
        </li>
        <li><sup>1</sup>H NMR involves the absorption of radio waves, the chemical shift alters with the neighbouring environment.</li>
        <li>
          Neighbouring hydrogens will induce a splitting in the peak of a hydrogen atom leading to the
          ‘n+1’ rule. The peak area can indicate the number of hydrogens in the environment.
        </li>
      </ul>
      Interpretation of spectra
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          Primary alcohols show chemical shift of 3.3–4.5 ppm for H atoms adjacent to the -OH functional group
          and a singlet between 1–6 ppm for functional group H.
        </li>
        <li>Ketones show a chemical shift is 2.1–2.7 ppm for H atoms adjacent to the C=O functional group.</li>
        <li>
          The symmetry of the C₃H₆O ketone means that there is only one HNMR peak in the spectrum whereas
          there are four peaks in the spectrum of the C₃H₆O primary alcohol.
        </li>
        <li>
          The ratio of peak areas on the alcohol (CH₂=CHCH₂OH) spectrum will be 2:1:2:1;
          <br />
          HO-CH=CH-CH₃ – 1:1:1:3
        </li>
      </ul>
      One mark each was awarded for stating the principle by which <sup>1</sup>H NMR and IR spectroscopy
      operated.
      <br />
      One mark each was awarded for stating how the interpretation of the spectra could be used to uniquely
      identify the two isomers.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: (
      <>
        <b>Qualitative analysis</b> identifies <b>what</b> is present from an <b>observation</b>. To show the
        compound is an <b>alcohol</b>: warm it with <b>ethanoic acid</b> and a few drops of{' '}
        <b>concentrated H₂SO₄</b> — a <b>sweet, fruity smell</b> shows an <b>ester</b> has formed, so the
        compound has a <b>hydroxyl (–OH) group</b>. A <b>neutral pH</b> with universal indicator shows it is
        not a carboxylic acid.
      </>
    ),
    reason: (
      <>
        Esterification: alcohol + carboxylic acid ⇌ ester + water (H₂SO₄ catalyst). Every test must name
        what you would <b>see or smell</b> — the report says many students did not realise a qualitative
        analysis must involve an observation.
      </>
    ),
  },
  {
    working: (
      <>
        To find the <b>type</b> of alcohol: warm with <b>acidified potassium dichromate</b>,{' '}
        Cr₂O₇²⁻ / H⁺. A <b>colour change from orange to green</b>
        {" "}(Cr₂O₇²⁻(aq) → Cr³⁺(aq)) means it was <b>oxidised</b>, so it is a{' '}
        <b>primary or secondary alcohol</b>; <b>no colour change</b> means it is neither — it could be a{' '}
        <b>tertiary alcohol</b>.
      </>
    ),
    reason: (
      <>
        Tertiary alcohols have no H on the C bearing the –OH, so acidified dichromate cannot oxidise them and
        the solution stays orange. The two qualitative marks need tests with clear observations covering both halves of the bullet: is
        it an alcohol, and which type.
      </>
    ),
  },
  {
    working: (
      <>
        Add <b>NaHCO₃</b> to the oxidation product (heated under reflux with excess oxidant):{' '}
        <b>effervescence — bubbles of CO₂</b> — shows a <b>carboxylic acid</b> formed, so the alcohol was{' '}
        <b>primary</b>; <b>no bubbles</b> means the product is a ketone, so the alcohol was{' '}
        <b>secondary</b>.
      </>
    ),
    reason: (
      <>
        Primary alcohol → carboxylic acid; secondary alcohol → ketone. Only the acid reacts with hydrogen
        carbonate: <Chem eq="RCOOH(aq) + HCO3-(aq) -> RCOO-(aq) + H2O(l) + CO2(g)" />. Test the{' '}
        <b>separated product</b> (e.g. distilled off), not the reaction mixture — the mixture still contains
        the H⁺ from the acidified dichromate, which would fizz with NaHCO₃ whatever the alcohol was.
      </>
    ),
  },
  {
    working: (
      <>
        <b>Quantitative analysis</b> finds <b>how much</b> alcohol is present, by <b>volumetric analysis</b>:
        titrate an <b>aliquot</b> of the alcohol solution with a <b>standard solution</b> of acidified K₂Cr₂O₇
        (a <b>redox titration</b>). From the <b>titre</b>, n(Cr₂O₇²⁻) = c × V; the{' '}
        <b>mole ratio</b> in the balanced redox equation then gives n(alcohol), and so its{' '}
        <b>concentration</b>.
      </>
    ),
    reason: (
      <>
        Mark 3: a clear link to a <b>titration</b> (or similar wet chemical analysis). For ethanol:{' '}
        3CH₃CH₂OH + 2Cr₂O₇²⁻ + 16H⁺ → 3CH₃COOH + 4Cr³⁺ + 11H₂O, so n(ethanol) = 3/2 ×
        n(Cr₂O₇²⁻). The report also accepts oxidising the alcohol to the acid and{' '}
        <b>titrating with a standard base</b> (NaOH). Do not describe IR, NMR or any instrument — the report
        says many students answered only with instrumental analysis, which was not what was asked.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: (
      <>
        The isomers: <b>ketone = propanone</b>, CH₃COCH₃; <b>primary alcohol = prop-2-en-1-ol</b>,
        CH₂=CHCH₂OH (it needs a <b>C=C</b> because C₃H₆O has two fewer H than a saturated C₃ alcohol).
      </>
    ),
    reason: (
      <>
        Work out the structures first — you cannot say what the spectra show until you know which bonds and
        H environments each molecule has. The saturated alcohol would be C₃H₈O; losing 2 H means one double
        bond, which the ketone spends on C=O and the alcohol on C=C.
      </>
    ),
  },
  {
    working: (
      <>
        <b>IR principle:</b> a molecule <b>absorbs infrared radiation</b>, which makes its bonds{' '}
        <b>vibrate</b> (stretch and bend). <b>Each type of bond absorbs at a characteristic wavenumber</b>,
        so the absorption bands show which <b>bonds / functional groups</b> are present.
      </>
    ),
    reason: <>Mark 1: the principle of IR — absorption of IR radiation, and a wavenumber that depends on the bond type.</>,
  },
  {
    working: (
      <>
        <b>IR interpretation:</b> propanone shows a strong, sharp <b>C=O</b> absorption (about{' '}
        <b>1680–1700 cm⁻¹</b>) and <b>no O–H band</b>; prop-2-en-1-ol shows a <b>broad O–H</b> absorption at{' '}
        <b>3200–3600 cm⁻¹</b> and <b>no C=O</b> absorption. So the presence of O–H or C=O tells them apart.
      </>
    ),
    reason: (
      <>
        Mark 2: how the IR spectra differ. Ranges from the Data Book&rsquo;s IR table — say both what each
        spectrum <b>has</b> and what it <b>lacks</b>; the absence of a band is evidence too. The alcohol also
        absorbs for its C=C (about 1620–1680 cm⁻¹, the report&rsquo;s range), but O–H versus C=O is the clear
        distinction.
        <DataBookNote>
          the report quotes C=O at 1680–1850 cm⁻¹ and C=C at 1620–1680 cm⁻¹. The 2026 Data Book (item 21)
          gives C=O (ketones) 1680–1700 cm⁻¹ and O–H (alcohols) 3200–3600 cm⁻¹, and no longer lists C=C. The
          way the two isomers are told apart is unchanged.
        </DataBookNote>
      </>
    ),
  },
  {
    working: (
      <>
        <b>¹H NMR principle:</b> in a strong magnetic field, ¹H nuclei <b>absorb radio waves</b>, causing a{' '}
        <b>change in their spin state</b>. The <b>chemical shift</b> depends on each hydrogen&rsquo;s{' '}
        <b>chemical environment</b>, so <b>each different H environment gives a separate peak</b>; the{' '}
        <b>peak area</b> is proportional to the <b>number of H</b> in that environment, and a peak is{' '}
        <b>split into n + 1</b> lines by n neighbouring H.
      </>
    ),
    reason: <>Mark 3: the principle of ¹H NMR — radio-wave absorption by nuclei changing spin state, with a shift that depends on the H environment.</>,
  },
  {
    working: (
      <>
        <b>¹H NMR interpretation:</b> propanone is <b>symmetrical</b> — all 6 H are equivalent — so it gives{' '}
        <b>one peak</b> (a singlet at <b>2.1–2.7 ppm</b>, CH₃ next to C=O). Prop-2-en-1-ol has{' '}
        <b>four H environments</b>, so <b>four peaks</b> in area ratio <b>2 : 1 : 2 : 1</b> (=CH₂ and =CH– at
        4.5–7.0 ppm, –CH₂–O at <b>3.3–4.5 ppm</b>, –OH at 1–6 ppm).
      </>
    ),
    reason: (
      <>
        Mark 4: how the NMR spectra differ — <b>number of peaks</b> (1 vs 4) is the clearest evidence. Shifts
        from the Data Book&rsquo;s ¹H-NMR table. Strictly the two =CH₂ hydrogens differ slightly, but VCE treats
        them as one environment, as in the report&rsquo;s 2:1:2:1. The report also lists HO-CH=CH-CH₃ (1:1:1:3);
        that is an <i>enol</i> (–OH on a C=C carbon), not the usual primary alcohol, so use CH₂=CHCH₂OH.
      </>
    ),
  },
]

export default function ChemistryQ10_2020SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 10 (7 marks)</p>
        <div className="border border-gray-400 dark:border-gray-600 px-4 py-3 mb-1">
          <p>
            Analytical chemistry deals with methods for determining the chemical composition of samples of
            matter. A qualitative method yields information about the identity of atomic or molecular species or
            the functional groups in the sample …
          </p>
          <p className="mt-1">
            Analytical methods are often classified as being either <i>classical</i> or <i>instrumental</i>.
          </p>
        </div>
        <p className="text-right text-[12.5px] mb-3">
          Source: DA Skoog, FJ Holler and SR Crouch, <i>Principles of Instrumental Analysis</i>,
          <br />
          6th edition, Thomson Brooks/Cole, Belmont (CA), 2007, p. 1
        </p>
        <p className="mb-2">
          Classical methods include qualitative analysis, such as treating a compound with reagents to observe
          any reaction, and quantitative methods, such as volumetric analysis, where the amount of a compound is
          determined by its reaction with a standard reagent.
        </p>
        <p>Instrumental methods include a variety of spectroscopy, such as IR spectroscopy and NMR spectroscopy.</p>
      </div>

      <PartCard
        letter="a"
        topic="Classical Analysis"
        marks={3}
        statement={
          <>
            Explain how the classical methods of analytical chemistry can be used to determine information about
            alcohols. In your answer, refer to:
            <ul className="list-disc pl-5 flex flex-col gap-1 mt-1">
              <li>qualitative analysis and how it can be used to determine whether a compound is an alcohol and, if it is, the type of alcohol</li>
              <li>quantitative analysis.</li>
            </ul>
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            &ldquo;Classical&rdquo; means <b>wet chemistry with reagents</b> — test tubes and burettes, not
            instruments. The report says a large number of students wrote only about instrumental analysis, which
            was not what the question asked. Three marks, two ideas: <b>qualitative</b> tests (2 marks) — each one a reagent
            plus the <b>observation</b> it gives (colour change, smell, bubbles) and what that tells you — and{' '}
            <b>quantitative</b> analysis (1 mark) — a <b>titration</b> against a standard solution to find how
            much alcohol is present.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme
          source="vcaa"
          points={[
            {
              marks: 2,
              point: (
                <>
                  <b>Qualitative analysis</b> linked to a clear <b>observation</b>: e.g. an ester&rsquo;s{' '}
                  <b>smell</b> with a carboxylic acid (alcohol present); <b>orange → green</b> with{' '}
                  <b>Cr₂O₇²⁻ / H⁺</b> (primary or secondary) or no change (could be tertiary); oxidation product{' '}
                  <b>bubbles with NaHCO₃</b> (primary) or not (secondary).
                </>
              ),
            },
            {
              point: (
                <>
                  <b>Quantitative analysis</b> with a clear link to a <b>titration</b> — a <b>redox titration</b>{' '}
                  to find the concentration, or oxidise to the acid and <b>titrate with base</b>.
                </>
              ),
            },
          ]}
        />
      </PartCard>

      <PartCard
        letter="b"
        topic="IR and ¹H NMR"
        marks={4}
        statement={
          <>
            <Chem eq="C3H6O" /> can exist as a ketone or as a primary alcohol.
            <br />
            Explain how the principles of IR spectroscopy and <sup>1</sup>H NMR spectroscopy lead to different
            spectra for the ketone and primary alcohol isomers of <Chem eq="C3H6O" />, which can then be used to
            differentiate between the two molecules.
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="How to Think About It">
          <p>
            Four marks are four separate ideas, two per technique: the <b>principle</b> (what the instrument
            actually measures) and the <b>interpretation</b> (how the two isomers&rsquo; spectra differ). Only 6% of students scored 3 or 4 —
            each technique needs both its principle and its interpretation. Start by drawing the isomers: propanone (C=O, one H environment) and prop-2-en-1-ol
            (O–H and C=C, four H environments); the differences in the spectra follow straight from those
            structures.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <><b>IR principle</b>: <b>absorption of infrared radiation</b> makes bonds <b>vibrate</b>; the <b>wavenumber depends on the bond type</b>, so IR identifies bonds / functional groups.</> },
            { point: <><b>IR interpretation</b>: the alcohol has a <b>broad O–H</b> peak at <b>3200–3600 cm⁻¹</b> and no C=O; the ketone has a <b>C=O</b> peak and no O–H.</> },
            { point: <><b>¹H NMR principle</b>: nuclei <b>absorb radio waves</b> and <b>change spin state</b>; the <b>chemical shift depends on the H environment</b> (peak area ∝ number of H; n + 1 splitting).</> },
            { point: <><b>¹H NMR interpretation</b>: the symmetrical ketone gives <b>one peak</b> (2.1–2.7 ppm); the alcohol CH₂=CHCH₂OH gives <b>four peaks</b> in ratio <b>2:1:2:1</b>.</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
