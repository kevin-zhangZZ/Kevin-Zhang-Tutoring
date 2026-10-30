// 2025 Chemistry Exam, Section B Question 5 (13 marks). Quinine in tonic water: confirming quinine
// by HPLC retention time, why calibration standards are run under controlled conditions, why a
// calibration curve can't be used outside its range, the highest-priority functional group, which
// structure exists at low pH (protonated amines), why only one stereoisomer is an effective drug, and
// why quinine is a better competitive inhibitor at pH 4.7. Question text transcribed from the
// original paper; the chromatogram, calibration curve and all three structures are cropped from the
// original VCAA exam PDF. Mark allocations are from the VCAA examination report, which itemises the
// marks for every part; the "How to Think About It" notes and model answers are original (VCAA report
// only — no second source). The paper's "item 19" (functional group nomenclature) is item 17 in the
// 2026 Data Book — a Data Book note says so. Report slips kept verbatim: "valid peaks areas" (5a.ii)
// and "complimentary shape" for complementary (5c.i).

import { Background, DataBookNote, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import chromSrc from './chem-2025sa-q5a-chromatograph.png'
import calSrc from './chem-2025sa-q5a-calibration-curve.png'
import quinineSrc from './chem-2025sa-q5b-quinine.png'
import qrSrc from './chem-2025sa-q5b-structures-q-r.png'

const STEM_BOX =
  'text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4'
const FIG_BOX = 'mb-1 bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit'

const EXAM_AI: SAExaminerStats = {
  marks: [52, 27, 20],
  average: 0.7,
  comment: (
    <>
      The first mark was awarded for recognising that a quinine standard needed to be run under the same
      conditions and a retention time established.
      <br />
      The second mark was awarded for recognising that the retention time of the standard needed to match
      that of the peak in the tonic water in order for the presence of quinine to be possible.
      <br />
      Some students used the argument of &lsquo;spiking&rsquo;, which was also accepted.
      <br />
      The first mark was awarded for recognising that a sample of tonic water needed to be run and then a
      small quantity of pure quinine was then added to the sample.
      <br />
      The second mark was awarded for recognising that when the spiked sample was run again, for quinine to
      be identified as the peak at 1.415 mins, this peak must have increased in size in comparison to the
      first run.
    </>
  ),
}

const EXAM_AII: SAExaminerStats = {
  marks: [68, 25, 7],
  average: 0.4,
  comment: (
    <>
      The first mark was awarded for recognising that uncontrolled conditions will produce peaks at various
      retention times and this has the potential to alter the validity of the measurement of peak areas.
      <br />
      The second mark was awarded for recognising that without valid peaks areas an inaccurate/invalid
      calibration curve will be generated.
    </>
  ),
}

const EXAM_AIII: SAExaminerStats = {
  marks: [25, 75],
  average: 0.8,
  comment: (
    <>
      &lsquo;Cannot accurately extrapolate the data&rsquo; or &lsquo;outside of the range of the
      standards&rsquo; were accepted.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [43, 57],
  average: 0.6,
  comment: <>Hydroxyl or hydroxy.</>,
}

const EXAM_BII: SAExaminerStats = {
  marks: [21, 33, 46],
  average: 1.3,
  comment: (
    <>
      The first mark was awarded for identifying Q as the correct structure.
      <br />
      The second mark was awarded for showing an understanding that there is a change in the functional
      groups at low pH, i.e. amino groups / amines / nitrogen / bases are subject to protonation / accepting
      H⁺ ions.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [31, 28, 27, 14],
  average: 1.3,
  comment: (
    <>
      The first mark was awarded for recognising that a chiral centre in a molecule arises due to four
      different substituents being present.
      <br />
      The second mark was awarded for recognising that these chiral centres generate uniquely shaped isomers.
      <br />
      The third mark was awarded for recognising that only one of these isomers will have the exact
      three-dimensional shape / complimentary shape needed to interact with the malaria enzyme&rsquo;s active
      site.
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [60, 32, 8],
  average: 0.5,
  comment: (
    <>
      The first mark was awarded for recognising that if Q is a more effective inhibitor, it must bind more
      strongly to the active site.
      <br />
      The second mark was awarded for the chemical explanation of this by any of the following:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>The protonated form can form (ionic) bonds with negatively charged groups within the active site.</li>
        <li>The protonated form of Q has caused the shape of the molecule to change so it fits better in the active site.</li>
        <li>An inhibitor is a molecule that fits into the active site, blocking the substrate from entering.</li>
      </ul>
    </>
  ),
}

const ROWS_AI: WorkingRow[] = [
  {
    working: <>Run a <b>pure quinine standard</b> through the HPLC under the <b>same conditions</b> (same column, mobile phase, flow rate and temperature) and record its <b>retention time</b>.</>,
    reason: <>Mark 1. Retention time is only meaningful when it is compared with a known sample run under identical conditions — on its own, &ldquo;1.415 min&rdquo; tells you nothing.</>,
  },
  {
    working: <>If the standard&rsquo;s retention time <b>matches</b> the retention time of the tonic-water peak (<b>1.415 min</b>), quinine is likely present in the tonic water.</>,
    reason: <>Mark 2. A compound always takes the same time to pass through the column under the same conditions, so a match is evidence that the peak is quinine. (It is strong evidence, not absolute proof — a different compound could happen to have the same retention time.)</>,
  },
  {
    working: <>Alternative (also accepted): run the tonic water, then <b>spike</b> it with a small amount of <b>pure quinine</b> and run it again — if the peak at <b>1.415 min increases in size</b> (and no new peak appears), that peak is quinine.</>,
    reason: <>The report accepted this &lsquo;spiking&rsquo; route for both marks: mark 1 for running the sample then adding pure quinine, mark 2 for the 1.415 min peak growing on the second run.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <>Retention time and <b>peak area</b> both depend on the conditions (e.g. <b>flow rate, temperature, mobile phase</b>, column, injection volume). If the conditions are <b>not controlled</b>, the same compound can give peaks at <b>different retention times</b> and with <b>different peak areas</b> even at the same concentration.</>,
    reason: <>Mark 1: uncontrolled conditions change where the peak appears and how big it is, so the peak-area measurements would not be valid.</>,
  },
  {
    working: <>Only with controlled (identical) conditions does the peak area depend on <b>concentration alone</b>; otherwise the peak areas are not valid and the result is an <b>inaccurate / invalid calibration curve</b>, so the tonic water&rsquo;s concentration read from it would be wrong.</>,
    reason: <>Mark 2: link the invalid peak areas to the calibration curve itself. The tonic-water sample must also be run under those same conditions so its peak area can be read off the curve.</>,
  },
]

const ROWS_AIII: WorkingRow[] = [
  {
    working: <>The highest-concentration standard is <b>120 mg L⁻¹</b>; 130 mg L⁻¹ is <b>outside the range of the standards</b>.</>,
    reason: <>Read the calibration curve: the plotted points run from about 15 to 120 mg L⁻¹ only.</>,
  },
  {
    working: <><b>Cannot accurately extrapolate</b> the data — there is no evidence the line stays linear above 120 mg L⁻¹.</>,
    reason: <>Either idea earned the mark. In practice you would <b>dilute</b> the tonic water so its concentration falls within the range, then multiply by the dilution factor.</>,
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: <>Circled groups: <b>hydroxyl</b> (–OH, alcohol), <b>amine</b> (the N in the bicyclic ring) and <b>alkene</b> (C=C).</>,
    reason: <>Identify each circled group first; the ether (O–CH₃) and the ring N at the bottom are not circled, so ignore them.</>,
  },
  {
    working: <>Data Book priority order: carboxylic acid &gt; ester &gt; aldehyde &gt; ketone &gt; <b>alcohol</b> &gt; amine &gt; alkene.</>,
    reason: (
      <>
        The table lists groups from highest to lowest priority; the highest-priority group sets the name&rsquo;s suffix (here &ldquo;-ol&rdquo;).
        <DataBookNote>the paper&rsquo;s &ldquo;item 19&rdquo; (functional group nomenclature) is item 17 in the 2026 Data Book. The 2026 table lists the class (&ldquo;alcohol&rdquo;, prefix &ldquo;hydroxy-&rdquo;) rather than a &ldquo;functional group name&rdquo; column, but the order is unchanged — alcohol above amine above alkene — so the answer is unchanged.</DataBookNote>
      </>
    ),
  },
  {
    working: <b>Hydroxyl (hydroxy) group</b>,
    reason: <>The question asks for the <i>functional group</i>, so name the group: hydroxyl or hydroxy, as the report accepts.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <b>Structure Q</b>,
    reason: <>Mark 1. Compare the two structures: Q has two N atoms carrying an extra H and a + charge (N⁺–H); R has neutral N atoms.</>,
  },
  {
    working: <>At low pH there is a high concentration of <b>H₃O⁺ (H⁺) ions</b>. The <b>amine / nitrogen</b> groups in quinine act as <b>bases</b>: the lone pair on each N <b>accepts an H⁺ ion</b> (is <b>protonated</b>), giving the positively charged N⁺–H groups shown in Q.</>,
    reason: <>Mark 2: the change in the functional groups — amines are <b>protonated</b> at low pH. Like NH₃ + H⁺ → NH₄⁺, an amine N gains an H⁺ and a positive charge. At higher pH there is little H⁺, so the neutral form R dominates.</>,
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <>A <b>chiral centre</b> is a carbon atom bonded to <b>four different groups (substituents)</b>.</>,
    reason: <>Mark 1: the definition, which the question tells you to use.</>,
  },
  {
    working: <>At each chiral centre the four groups can be arranged in two ways that are <b>non-superimposable mirror images</b>, so the four chiral centres give several <b>stereoisomers (optical isomers)</b>, each with a <b>different three-dimensional shape</b>.</>,
    reason: <>Mark 2: chiral centres generate uniquely shaped isomers. They have the same formula and the same bonds — only the 3D arrangement differs.</>,
  },
  {
    working: <>The <b>active site</b> of the malaria parasite&rsquo;s enzyme has a specific 3D shape. Only <b>one isomer</b> has the <b>complementary shape</b> to fit and bind to the active site, so only that isomer is effective.</>,
    reason: <>Mark 3: link the shape to the <b>enzyme&rsquo;s active site</b>. The report spells this &ldquo;complimentary&rdquo;; the correct word is <b>complementary</b> (fitting together).</>,
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <>A <b>competitive inhibitor</b> binds to the <b>active site</b> of the enzyme, <b>blocking the substrate</b> from entering.</>,
    reason: <>Start from what &ldquo;competitive&rdquo; means: inhibitor and substrate compete for the same site, so the more strongly the inhibitor binds, the better it inhibits.</>,
  },
  {
    working: <>At pH 4.7 quinine is mainly in its <b>protonated</b> form (<b>structure Q</b>, from part b.ii), so it <b>binds more strongly to the active site</b> than the neutral form present at higher pH.</>,
    reason: <>Mark 1: the effective inhibitor must <b>bind more strongly</b> to the active site. pH 4.7 is &ldquo;low&rdquo; in the sense of part b.ii.</>,
  },
  {
    working: <>The <b>positively charged N⁺–H groups</b> can form <b>ionic bonds</b> with <b>negatively charged groups</b> in the active site (e.g. –COO⁻ side chains of amino acids), which are stronger than the hydrogen bonds and dispersion forces the neutral molecule can form.</>,
    reason: <>Mark 2: the chemical explanation. The report also accepted that protonation changes Q&rsquo;s shape so it fits the active site better. A diagram of N⁺–H next to a –COO⁻ in the active site is a good way to show this.</>,
  },
]

export default function ChemistryQ5_2025SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className={STEM_BOX}>
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (13 marks)</p>
        <p>
          Traditionally the quinine tree has been used to treat many illnesses, including malaria, due to the
          range of different compounds contained in its bark. One of the useful medicinal compounds in its
          bark is quinine, C₂₀H₂₄N₂O₂, which is used to make tonic water. Tonic water sold today has a much
          lower concentration of quinine than in the past.
        </p>
      </div>

      <div className={STEM_BOX}>
        <p className="mb-2">
          <b>a.</b> High-performance liquid chromatography (HPLC) is commonly used to detect both the presence
          and concentration of quinine in tonic water.
        </p>
        <p className="mb-3">The HPLC chromatograph of a sample of tonic water is shown below.</p>
        <div className={FIG_BOX}>
          <img
            loading="lazy"
            decoding="async"
            src={chromSrc}
            alt="HPLC chromatogram of tonic water: absorbance against time (minutes), with a tall peak labelled quinine at a retention time of 1.415 minutes — from the original 2025 VCAA exam paper"
            className="w-full max-w-[400px]"
          />
        </div>
      </div>

      <PartCard
        letter="a.i"
        topic="Retention Time"
        marks={2}
        statement={<>Explain how retention time can be used to confirm the presence of quinine in the sample of tonic water.</>}
        examinerReport={EXAM_AI}
      >
        <Background title="How to Think About It">
          <p>
            A retention time is just a number until you compare it with something. Identification by HPLC
            always means comparing with a <b>standard</b> — pure quinine — run under the <b>same conditions</b>.
            Two marks, two ideas: (1) run a quinine standard under identical conditions to get its retention
            time; (2) that retention time must <b>match</b> the 1.415 min peak. Saying only &ldquo;quinine has a
            retention time of 1.415 min&rdquo; misses the standard, which is the first mark. Spiking the sample
            with pure quinine and watching the 1.415 min peak grow was also accepted.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AI} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>A <b>quinine standard</b> is run under the <b>same conditions</b> and its <b>retention time</b> established (or: run the tonic water, then <b>add a small quantity of pure quinine</b> — spiking).</> },
            { point: <>The standard&rsquo;s retention time <b>matches</b> that of the tonic-water peak (or: on re-running the spiked sample, the <b>peak at 1.415 min increases in size</b>).</> },
          ]}
        />
      </PartCard>

      <div className={STEM_BOX}>
        <div className={`${FIG_BOX} mb-3`}>
          <img
            loading="lazy"
            decoding="async"
            src={calSrc}
            alt="Calibration curve: area under the curve (arbitrary units × 10⁵) against sample concentration (mg L⁻¹), a straight line through points from about 15 to 120 mg L⁻¹ — from the original 2025 VCAA exam paper"
            className="w-full max-w-[520px]"
          />
        </div>
        <p className="mb-2">
          Various concentrations of quinine solutions were run through an HPLC instrument to produce the
          calibration curve shown above.
        </p>
        <p>A sample of tonic water is to be tested to determine the concentration of quinine.</p>
      </div>

      <PartCard
        letter="a.ii"
        topic="Controlled Conditions"
        marks={2}
        statement={<>Explain why solutions of known concentration must be run through the HPLC instrument under controlled conditions.</>}
        examinerReport={EXAM_AII}
      >
        <Background title="How to Think About It">
          <p>
            This was the hardest part of the question (68% scored zero). A generic &ldquo;to make it a fair
            test&rdquo; doesn&rsquo;t say anything about HPLC. Be specific about <b>what</b> the conditions
            change and <b>why that matters</b> for a calibration curve. Two marks, two links in a chain:
            (1) uncontrolled conditions change the <b>retention times and peak areas</b>, so the peak-area
            measurements aren&rsquo;t valid; (2) invalid peak areas give an <b>inaccurate / invalid calibration
            curve</b>.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <><b>Uncontrolled conditions</b> produce peaks at <b>different retention times</b>, which can alter the <b>validity of the peak-area measurements</b>.</> },
            { point: <>Without valid peak areas, an <b>inaccurate / invalid calibration curve</b> is generated.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="a.iii"
        topic="Calibration Range"
        marks={1}
        statement={
          <>
            State why the calibration curve should <b>not</b> be used to test a sample of tonic water that has a
            mean concentration of 130 mg L⁻¹.
          </>
        }
        examinerReport={EXAM_AIII}
      >
        <Background title="How to Think About It">
          <p>
            Look at where the calibration points stop. A calibration curve is only trustworthy between its
            lowest and highest standards; beyond that you would be <b>extrapolating</b>, and you don&rsquo;t know
            the response is still linear. One mark, one idea.
          </p>
        </Background>
        <WorkingTable rows={ROWS_AIII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>130 mg L⁻¹ is <b>outside the range of the standards</b> (highest 120 mg L⁻¹) — the data <b>cannot be accurately extrapolated</b>.</> },
          ]}
        />
      </PartCard>

      <div className={STEM_BOX}>
        <p className="mb-3">
          <b>b.</b> A representation for quinine is shown below with three functional groups circled.
        </p>
        <div className={FIG_BOX}>
          <img
            loading="lazy"
            decoding="async"
            src={quinineSrc}
            alt="Skeletal structure of quinine with three functional groups circled: the H–O (hydroxyl) group, the nitrogen in the bicyclic ring, and the C=C double bond — from the original 2025 VCAA exam paper"
            className="w-full max-w-[300px]"
          />
        </div>
      </div>

      <PartCard
        letter="b.i"
        topic="Functional Group Priority"
        marks={1}
        statement={<>Using <b>item 19</b> of the Data Book, name the functional group with the highest priority when following IUPAC nomenclature.</>}
        examinerReport={EXAM_BI}
      >
        <Background title="How to Think About It">
          <p>
            Name the three circled groups, then find them in the Data Book&rsquo;s priority table, which is
            listed from highest to lowest priority. The –OH group sits above the amine and the alkene. The
            question asks for the name of the <b>functional group</b>: hydroxyl (or hydroxy).
          </p>
        </Background>
        <WorkingTable rows={ROWS_BI} />
        <MarkScheme source="vcaa" points={[{ point: <><b>Hydroxyl</b> or <b>hydroxy</b>.</> }]} />
      </PartCard>

      <div className={STEM_BOX}>
        <p className="mb-2">
          Malaria is caused by the malaria parasite, which enters red blood cells and feeds on haemoglobin.
          Experiments have shown that the malaria parasite enzymes involved in this reaction are most effective
          at a pH of 4.7
        </p>
        <p className="mb-3">
          The structure of the quinine molecule can vary with pH. Representations of two possible structures
          are shown below.
        </p>
        <div className={FIG_BOX}>
          <img
            loading="lazy"
            decoding="async"
            src={qrSrc}
            alt="Two structures of quinine. Structure Q: both nitrogen atoms carry an extra hydrogen and a positive charge (N⁺–H). Structure R: both nitrogen atoms are neutral — from the original 2025 VCAA exam paper"
            className="w-full max-w-[460px]"
          />
        </div>
      </div>

      <PartCard
        letter="b.ii"
        topic="Protonation at Low pH"
        marks={2}
        statement={<>Identify which structure, Q or R, is most likely to occur at a low pH. Justify your response.</>}
        examinerReport={EXAM_BII}
      >
        <Background title="How to Think About It">
          <p>
            Low pH means lots of H⁺ (H₃O⁺). Spot the difference between Q and R: in Q, both nitrogens have
            gained an H and a + charge. Amines are <b>bases</b> — the N lone pair accepts H⁺. Two marks: (1) the
            choice, Q; (2) the justification — the <b>amine / nitrogen groups are protonated</b> (accept H⁺ ions)
            at low pH. Naming Q without explaining the protonation earns only one mark.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Identifies <b>Q</b>.</> },
            { point: <>At low pH the <b>amino groups / amines / nitrogen</b> (acting as <b>bases</b>) are <b>protonated</b> — they <b>accept H⁺ ions</b>.</> },
          ]}
        />
      </PartCard>

      <div className={STEM_BOX}>
        <p>
          <b>c.</b> Quinine has four chiral centres. Only one of its isomers is an effective medicine in the
          treatment of malaria.
        </p>
      </div>

      <PartCard
        letter="c.i"
        topic="Chirality and Drugs"
        marks={3}
        statement={<>Referring to the term &lsquo;chiral centre&rsquo; in your response, explain why only one isomer of quinine is effective.</>}
        examinerReport={EXAM_CI}
      >
        <Background title="How to Think About It">
          <p>
            Three marks means a three-step chain: <b>what a chiral centre is</b> → <b>what chiral centres do</b>{' '}
            (give isomers with different 3D shapes) → <b>why shape matters</b> (only one shape fits the
            enzyme&rsquo;s active site). Answers that stop after the definition, or that jump to &ldquo;it fits
            the enzyme&rdquo; without linking it to the isomers&rsquo; different shapes, leave marks behind.
            Make sure you name the <b>active site</b> of the parasite&rsquo;s enzyme.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CI} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>A chiral centre arises from <b>four different substituents</b> (groups) on one carbon atom.</> },
            { point: <>The chiral centres generate <b>isomers with unique (different) 3D shapes</b>.</> },
            { point: <>Only one isomer has the exact <b>three-dimensional / complementary shape</b> to interact with the <b>malaria enzyme&rsquo;s active site</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Competitive Inhibition"
        marks={2}
        statement={
          <>
            Quinine acts as a competitive inhibitor in the prevention of malaria.
            <br />
            Explain why quinine is more effective as a competitive inhibitor at pH 4.7 than at a higher pH. You
            may draw a diagram to support your response.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <Background title="How to Think About It">
          <p>
            Connect this to part b.ii: at pH 4.7 (low) quinine is in the <b>protonated</b> form Q. So the question
            is really &ldquo;why does Q inhibit better than R?&rdquo; A competitive inhibitor works by occupying the
            active site, so a better inhibitor must <b>bind more strongly</b> to the active site (mark 1). Then
            give the chemical reason (mark 2): the <b>positive N⁺–H groups</b> can form <b>ionic bonds</b> with
            <b> negatively charged groups</b> in the active site. Only 8% scored both marks, so state both steps
            explicitly.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>If Q is the more effective inhibitor, it must <b>bind more strongly to the active site</b>.</> },
            { point: <>A chemical explanation, any of: the <b>protonated</b> form forms <b>(ionic) bonds</b> with <b>negatively charged groups</b> in the active site; protonation <b>changes Q&rsquo;s shape</b> so it fits the active site better; an inhibitor <b>fits into the active site</b>, <b>blocking the substrate</b>.</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
