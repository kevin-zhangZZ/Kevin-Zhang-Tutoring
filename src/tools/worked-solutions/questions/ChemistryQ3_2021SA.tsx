// 2021 Chemistry Exam, Section B Question 3 (12 marks). Food chemistry from quinoa: essential
// amino acids, the peptide bond and side chains in a dipeptide, enzymes in protein digestion,
// omega classification and melting points of fatty acids, and amylose versus cellulose.
// Question text transcribed from the original paper; the dipeptide is cropped from the original
// VCAA exam PDF, the circled dipeptide in part b.i's report comment is cropped from the VCAA
// examination report, and the amylose and cellulose structures in part e. are cropped from the
// 2017–2023 VCAA Chemistry Data Book (the one this paper was sat with). Mark distributions,
// averages and comments are from the VCAA examination report (VCAA report only — no second
// source); the "How to Think About It" notes, model answers and mark schemes are original.
// Study design: parts a. (essential amino acids) and d.i. (omega classification of fatty acids)
// are not in the current study design — the skip guide already skips the same content in 2017
// SAQ3c and 2018 MCQ 8 — so they keep their statements without working. Part e. is borderline:
// cellulose is not named in the current study design and its structure is no longer in the
// 2026 Data Book (item 20 shows amylose, amylopectin and glycogen only); it is written up with
// a Data Book note and the old Data Book's structures. Part d.ii. (melting points from the
// number of C=C bonds) is written up as current ("trends in physical properties ... with
// reference to structure and bonding"), though the skip guide skips 2016 SAQ3b on mono-/
// polyunsaturation — flagged for KZ.

import Chem from '../Chem'
import { Background, DataBookNote, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import dipeptideSrc from './chem-2021sa-q3b-dipeptide.png'
import reportGraphSrc from './chem-2021sa-q3bi-report-graph.png'
import celluloseSrc from './chem-2021sa-q3e-cellulose-databook.png'
import amyloseSrc from './chem-2021sa-q3e-amylose-databook.png'

const EXAM_BI: SAExaminerStats = {
  marks: [23, 77],
  average: 0.8,
  comment: (
    <>
      <img
        loading="lazy"
        decoding="async"
        src={reportGraphSrc}
        alt="The dipeptide with the C–N peptide bond circled — from the 2021 VCAA examination report"
        className="w-full max-w-[360px] mt-1"
      />
      Either the four atoms, CONH, or the two CN atoms or the actual C-N bond could have been circled
      to receive full marks.
      <br />
      Students need to be cautious when approaching a question such as this; many circled other
      portions of the dipeptide as they attempted to identify the R-groups of the two amino acids.
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [40, 60],
  average: 0.6,
  comment: <>Isoleucine</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [34, 41, 25],
  average: 0.9,
  comment: (
    <>
      The correct responses identified that:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          the papaya probably contained an enzyme/co-enzyme/co-factor that could have been involved in
          the digestion process of proteins.
        </li>
        <li>this enzyme/co-enzyme/co-factor facilitated the hydrolysis process.</li>
      </ul>
      No mention of specific enzymes was required to gain full marks.
      <br />
      The most common mistake made by students was to assume that acid was present, and this would
      cause denaturation to occur. While this may have been true, the key process in digestion is the
      breaking apart of primary structure in proteins.
    </>
  ),
}

const EXAM_DII: SAExaminerStats = {
  marks: [19, 23, 21, 36],
  average: 1.8,
  comment: (
    <>
      Linoleic acid*
      <br />
      Students were expected to include:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>a comparison of the relative number of C=C bonds in both molecules*</li>
        <li>
          a statement indicating a reason for weaker attraction between linoleic acid molecules (e.g.
          less effective packing of molecules or more extensive kinks in the chain).*
        </li>
      </ul>
      Most students seem to understand the theory behind this question but failed to deliver
      sufficient detail in their responses. Common mistakes were to:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>misread the data</li>
        <li>not directly compare oleic acid with linoleic acid</li>
        <li>state the answer as linolenic acid</li>
        <li>
          be too general in description of the relevant bonds. It was not sufficient to just state the
          &lsquo;number of double bonds&rsquo;, specific mention of the relative number of C=C was
          required.
        </li>
      </ul>
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [15, 26, 34, 25],
  average: 1.7,
  comment: (
    <>
      Any two of the following similarities were accepted:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>both have glycosidic links / ether links</li>
        <li>are polymers of glucose</li>
        <li>are straight chain / linear / unbranched polymers</li>
        <li>presence of same number of -OH groups.</li>
      </ul>
      Difference:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>Some reasoning identifying the difference in orientation of glucose monomers in the polymer chains.</li>
      </ul>
      Students did not always successfully express their understanding of the orientation of the
      glycosidic links between the glucose molecules in these two compounds; while α and β linkages
      were certainly not expected to be used in their explanations, it is possible that these have
      been taught as an easy way of explaining how these molecules are related.
      <br />
      The structures of both polymers were shown in the Data Book. Students are advised to ensure that
      they are familiar with the contents of the Data Book during their examination preparation.
    </>
  ),
}

const ROWS_BI: WorkingRow[] = [
  {
    working: <>Circle the <b>C–N bond</b> between the <b>C=O carbon</b> of the left amino acid and the <b>N–H nitrogen</b> of the right amino acid (the –CO–NH– group in the middle of the molecule).</>,
    reason: <>A <b>peptide (amide) bond</b> forms when the –COOH of one amino acid and the –NH₂ of the next join in a <b>condensation reaction</b>, losing H₂O. So look for the one C(=O)–N(H) link in the <b>backbone</b> — not the –NH₂ at the left end, the –COOH at the right end, or the –NH₂ at the end of the right-hand side chain.</>,
  },
  {
    working: (
      <img
        loading="lazy"
        decoding="async"
        src={reportGraphSrc}
        alt="The dipeptide with the C–N peptide bond circled — from the 2021 VCAA examination report"
        className="w-full max-w-[340px]"
      />
    ),
    reason: <>VCAA&rsquo;s answer: circling the four atoms C, O, N and H (the red loop), just the C and N (the blue loop), or only the C–N bond line all earned the mark. The report says many students circled other parts while trying to find the side chains — circle <b>one</b> region only.</>,
  },
]

const ROWS_BII: WorkingRow[] = [
  {
    working: <>Split the dipeptide at the peptide bond. Left amino acid side chain: <b>–CH(CH₃)CH₂CH₃</b>. Right amino acid side chain: <b>–CH₂CH₂CH₂CH₂NH₂</b>.</>,
    reason: <>Each amino acid is H₂N–CH(Z)–COOH. The <b>Z group</b> (side chain, R group) is whatever hangs off the central carbon besides H, the amino N and the carbonyl C. The left one is drawn as a branched four-carbon chain; the right one is a four-carbon chain ending in –NH₂.</>,
  },
  {
    working: <>Left = <b>isoleucine</b>; right = <b>lysine</b>.</>,
    reason: <>Match each side chain to the Data Book&rsquo;s 2-amino acids table: isoleucine is CH₃–CH(–CH₂–CH₃)– on the central carbon; lysine is –CH₂–CH₂–CH₂–CH₂–NH₂. Leucine (–CH₂–CH(CH₃)₂) is a common mix-up — check where the branch is.</>,
  },
  {
    working: <b>Isoleucine</b>,
    reason: <>Isoleucine&rsquo;s side chain is pure <b>hydrocarbon</b> (C and H only), so it is <b>non-polar</b>. Lysine&rsquo;s side chain ends in an –NH₂ group, which is polar (and can be protonated to –NH₃⁺).</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <>Papaya contains an <b>enzyme</b> (a <b>protease</b>, e.g. papain) that acts as a <b>biological catalyst</b> for the breakdown of proteins.</>,
    reason: <>Mark 1: name what is in the fruit — an <b>enzyme</b>. The report accepted enzyme/co-enzyme/co-factor; co-enzymes and co-factors are no longer on the study design, so write &ldquo;enzyme&rdquo;. Naming papain was not required.</>,
  },
  {
    working: <>The enzyme <b>catalyses the hydrolysis of the peptide bonds</b> in the protein, breaking the <b>primary structure</b> into smaller peptides and <b>amino acids</b> that can be absorbed.</>,
    reason: <>Mark 2: what the enzyme does — <b>hydrolysis</b> (water breaking the –CO–NH– links). The report&rsquo;s most common mistake was saying acid in the fruit <b>denatures</b> the protein: denaturation only disrupts the secondary, tertiary (and quaternary) structure and leaves the peptide bonds intact; digestion means breaking the <b>primary</b> structure (the peptide bonds).</>,
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <><b>Linoleic acid</b> would have the lower melting point.</>,
    reason: <>Mark 1: the correct choice. Read the right rows of the Data Book&rsquo;s fatty acids table — the report lists &ldquo;linolenic&rdquo; (a different acid, C₁₈H₃₀O₂) as a common wrong answer.</>,
  },
  {
    working: <>Oleic acid, <Chem eq="C18H34O2" /> (<Chem eq="CH3(CH2)7CH=CH(CH2)7COOH" />), has <b>one C=C</b> double bond; linoleic acid, <Chem eq="C18H32O2" /> (<Chem eq="CH3(CH2)4CH=CHCH2CH=CH(CH2)7COOH" />), has <b>two C=C</b> double bonds.</>,
    reason: <>Mark 2: a <b>direct comparison</b> of the number of <b>C=C</b> bonds in <b>both</b> molecules. Both have 18 carbons, so the only structural difference is the number of C=C bonds (two fewer H atoms = one more C=C). The report did not accept just &ldquo;more double bonds&rdquo; — say <b>C=C</b>, and compare the two acids by name.</>,
  },
  {
    working: <>Each <b>cis C=C</b> bond puts a <b>kink</b> in the hydrocarbon chain, so linoleic acid molecules <b>cannot pack as closely</b> together. This gives <b>weaker dispersion forces</b> between linoleic acid molecules, so <b>less energy</b> is needed to separate them and it melts at a <b>lower temperature</b>.</>,
    reason: <>Mark 3: the <b>reason</b> the attraction is weaker. Chain length (and so molecular size) is the same, so the difference in packing is what changes the strength of the dispersion forces. Melting overcomes the forces <b>between</b> molecules, not the covalent bonds within them. (Check: the Data Book lists both as liquids at SLC — oleic acid melts at about 13 °C, linoleic acid at about −5 °C.)</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <><b>Similarity 1:</b> both are <b>condensation polymers of glucose</b> — every monomer unit is a glucose molecule.</>,
    reason: <>Mark 1. In the Data Book drawings every ring is the same six-membered glucose ring (five C and one O, with a CH₂OH group).</>,
  },
  {
    working: <><b>Similarity 2:</b> in both, the glucose units are joined by <b>glycosidic (C–O–C, ether) links</b> between carbon 1 of one glucose and carbon 4 of the next, giving <b>unbranched (linear) chains</b>.</>,
    reason: <>Mark 2. Any two of the report&rsquo;s four similarities score: glycosidic/ether links, polymers of glucose, linear/unbranched, the same number of –OH groups (three per unit). Amylopectin is branched — amylose is not.</>,
  },
  {
    working: <><b>Difference:</b> in cellulose <b>every second glucose unit is flipped over</b> (rotated 180°) relative to its neighbour, so the CH₂OH groups <b>alternate above and below</b> the chain; in amylose <b>all glucose units have the same orientation</b> (every CH₂OH on the same side).</>,
    reason: <>Mark 3: a <b>structural difference</b> — the <b>orientation of the glucose monomers</b> (and so of the glycosidic links). Compare the two drawings above: cellulose&rsquo;s second ring is drawn upside down. The report notes α/β linkage labels were not expected; a clear description of the orientation is enough.</>,
  },
]

const STEM_BOX = 'text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4'

export default function ChemistryQ3_2021SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className={STEM_BOX}>
        <p className="font-semibold text-gray-900 dark:text-white">Question 3 (12 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Essential Amino Acids"
        marks={1}
        statement={
          <>
            All nine essential amino acids are found in quinoa.
            <br />
            State what is meant by an essential amino acid.
          </>
        }
      >
        <Background title="Not in the Current Study Design" always>
          <p>
            Part a. asks what an <i>essential</i> amino acid is — dietary nutrition content from the old
            study design. The current study design covers the structures of 2-amino acids and how they form
            proteins, but not which amino acids are essential in the diet. It is left without a worked
            solution; the skip guide skips the same content in 2017 Question 3c.
          </p>
        </Background>
      </PartCard>

      <div className={STEM_BOX}>
        <p className="font-semibold text-gray-900 dark:text-white mb-2">b.</p>
        <p className="mb-3">Consider the dipeptide below.</p>
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            loading="lazy"
            decoding="async"
            src={dipeptideSrc}
            alt="Full structural formula of a dipeptide: a branched hydrocarbon side chain on the left amino acid, a –CH₂CH₂CH₂CH₂NH₂ side chain on the right — from the original 2021 VCAA exam paper"
            className="w-full max-w-[460px]"
          />
        </div>
      </div>

      <PartCard
        letter="b.i"
        topic="Peptide Bond"
        marks={1}
        statement={<>Circle the peptide bond in the dipeptide above.</>}
        examinerReport={EXAM_BI}
      >
        <Background title="How to Think About It">
          <p>
            A dipeptide is two amino acids joined by <b>one</b> peptide bond, made by a condensation
            reaction between the –COOH of one and the –NH₂ of the other. So there is exactly one
            –CO–NH– link in the backbone, and that is the one to circle. The trap the report describes:
            circling side chains (R groups) or the end groups instead.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BI} />
        <MarkScheme
          source="vcaa"
          points={[{ point: <>Circles the <b>peptide bond</b>: the <b>C–N bond</b> between the carbonyl carbon and the N–H, or the C and N atoms, or the four atoms <b>CONH</b>.</> }]}
        />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Amino Acid Side Chains"
        marks={1}
        statement={
          <>
            Name the amino acid with the non-polar Z group, which is involved in the formation of the
            dipeptide.
          </>
        }
        examinerReport={EXAM_BII}
      >
        <Background title="How to Think About It">
          <p>
            The &ldquo;Z group&rdquo; is the side chain (R group) on each amino acid&rsquo;s central carbon.
            Split the dipeptide at the peptide bond from b.i, read off the two side chains, and match them
            to the 2-amino acids table in the Data Book. Then decide which side chain is <b>non-polar</b>:
            one made only of C and H.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BII} />
        <MarkScheme source="vcaa" points={[{ point: <><b>Isoleucine</b>.</> }]} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Enzymes in Digestion"
        marks={2}
        statement={
          <>
            When papaya fruit is eaten with protein in a meal, it can aid the digestion of that protein.
            <br />
            Explain why papaya can aid protein digestion.
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background title="How to Think About It">
          <p>
            Digesting a protein means <b>hydrolysing</b> its peptide bonds into amino acids — a slow
            reaction in the body unless it is catalysed. Two marks means two ideas: <b>what</b> papaya
            supplies (an <b>enzyme</b>, a protein catalyst) and <b>what it does</b> (catalyses the{' '}
            <b>hydrolysis</b> of the peptide bonds). The trap in the report: answering with acid and
            denaturation — denaturing a protein does not break its primary structure.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Papaya contains an <b>enzyme</b> (report: enzyme/co-enzyme/co-factor) involved in the <b>digestion of proteins</b>.</> },
            { point: <>The enzyme <b>catalyses</b> (facilitates) the <b>hydrolysis</b> of the protein — breaking its <b>primary structure</b> (peptide bonds).</> },
          ]}
        />
      </PartCard>

      <div className={STEM_BOX}>
        <p className="font-semibold text-gray-900 dark:text-white mb-2">d.</p>
        <p>Quinoa fat contains oleic acid and linoleic acid.</p>
      </div>

      <PartCard
        letter="d.i"
        topic="Omega Fatty Acids"
        marks={1}
        statement={<>What type of omega fatty acid is linoleic acid?</>}
      >
        <Background title="Not in the Current Study Design" always>
          <p>
            Part d.i. asks for the omega classification of a fatty acid (where the first C=C sits counted
            from the CH₃ end). Omega-3/omega-6 classification belonged to the old study design&rsquo;s
            nutrition content and is not in the current one. It is left without a worked solution; the
            skip guide skips the same content in 2018 MCQ 8.
          </p>
        </Background>
      </PartCard>

      <PartCard
        letter="d.ii"
        topic="Fatty Acid Melting Points"
        marks={3}
        statement={
          <>
            Which of the two fatty acids – oleic acid or linoleic acid – would be expected to have a lower
            melting point? Justify your answer.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <Background title="How to Think About It">
          <p>
            Look both acids up in the Data Book&rsquo;s fatty acids table: same chain length (C₁₈), different
            number of C=C bonds. Melting point depends on how strongly the molecules attract each other, and
            that depends on how closely they can pack. Three marks means three ideas: the <b>answer</b>,
            the <b>comparison of C=C bonds</b> in both molecules, and the <b>reason</b> for weaker attraction
            (kinks → poorer packing → weaker dispersion forces). The report says most students knew the
            idea but lost marks for not comparing the two acids directly or for writing &ldquo;double
            bonds&rdquo; instead of <b>C=C</b>.
          </p>
        </Background>
        <WorkingTable rows={ROWS_DII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <><b>Linoleic acid</b> has the lower melting point.</> },
            { point: <>A <b>comparison of the number of C=C bonds</b> in both molecules: linoleic acid has <b>two C=C</b>, oleic acid <b>one C=C</b>.</> },
            { point: <>A reason for <b>weaker attraction between linoleic acid molecules</b>: more <b>kinks</b> in the chain, so <b>less effective packing</b> (weaker dispersion forces).</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="e"
        topic="Polysaccharide Structure"
        marks={3}
        statement={
          <>
            Amylose and cellulose are two polysaccharides.
            <br />
            Identify two similarities and one difference between the structures of amylose and cellulose.
          </>
        }
        examinerReport={EXAM_E}
      >
        <Background title="How to Think About It">
          <p>
            &ldquo;Structures&rdquo; means compare the drawings, not uses or digestibility. Three marks are
            three separate ideas, laid out for you: two things the structures share (monomer, type of link,
            chain shape) and one thing that differs (the orientation of the glucose units). The report says
            students struggled to put that difference into words — describe what you see in the drawings.
          </p>
          <div className="flex flex-wrap gap-3 mt-3">
            <figure className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img
                loading="lazy"
                decoding="async"
                src={amyloseSrc}
                alt="Amylose (starch): a chain of glucose rings, all drawn the same way up, joined by O bridges — from the 2017–2023 VCAA Chemistry Data Book"
                className="w-full max-w-[380px]"
              />
              <figcaption className="text-[13px] text-gray-600 mt-1">Amylose (starch)</figcaption>
            </figure>
            <figure className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
              <img
                loading="lazy"
                decoding="async"
                src={celluloseSrc}
                alt="Cellulose: two glucose rings joined by an O bridge, the second ring flipped upside down — from the 2017–2023 VCAA Chemistry Data Book"
                className="w-full max-w-[260px]"
              />
              <figcaption className="text-[13px] text-gray-600 mt-1">Cellulose</figcaption>
            </figure>
          </div>
          <DataBookNote>
            the Data Book this paper was sat with (2017–2023, shown above) printed the structures of both
            amylose and cellulose. The 2026 Data Book (item 20) shows amylose, amylopectin and glycogen but{' '}
            <b>not cellulose</b>, and cellulose is not named in the current study design — so this part is
            only answerable today with a cellulose structure in front of you.
          </DataBookNote>
        </Background>
        <WorkingTable rows={ROWS_E} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>One similarity from the report&rsquo;s list: both have <b>glycosidic / ether links</b>; both are <b>polymers of glucose</b>; both are <b>straight-chain / linear / unbranched</b>; both have the <b>same number of –OH groups</b>.</> },
            { point: <>A <b>second, different</b> similarity from the same list (any two of the four score both marks).</> },
            { point: <>Difference: the <b>orientation of the glucose monomers</b> — alternate units are <b>flipped</b> in cellulose, all the <b>same way up</b> in amylose.</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
