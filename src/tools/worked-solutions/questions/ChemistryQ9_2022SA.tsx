// 2022 Chemistry Exam, Section B Question 9 (8 marks). Two extended-response parts: a. defining
// flashpoint and explaining how structure and bonding (intermolecular forces) make it vary between
// organic molecules; b. using the Maxwell–Boltzmann distribution and activation energy to explain
// why a platinum catalyst speeds up the reaction of ethene with hydrogen. Question text transcribed
// from the original paper (no figures). The Maxwell–Boltzmann graph in part b.'s report comment
// (and repeated in the model answer) is cropped from the original VCAA examination report PDF.
// Mark allocations are from the VCAA examination report, which itemises every mark in both parts;
// the "How to Think About It" notes and model answers are original. VCAA report only — no second
// source. No calculations. Study design: the paper was set on the 2017–2023 study design.
// Flashpoint is no longer named in the current one (boiling point, melting point and viscosity are),
// and the Maxwell–Boltzmann distribution is not named either (collision theory, activation energy
// and catalysts are) — both parts written up with a study-design note, flagged as borderline for KZ.

import Chem from '../Chem'
import { Background, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'
import mbGraphSrc from './chem-2022sa-q9b-report-graph.png'

const MB_GRAPH_ALT =
  'Maxwell–Boltzmann distribution: number of particles against energy of particles. Two vertical lines mark EA (with Pt) and, further right, EA (without Pt). The blue area beyond EA (without Pt) is the proportion of particles with sufficient energy to react without catalyst; the pink area between the two lines is the additional proportion with sufficient energy to react with the Pt catalyst present; the region under the peak is the proportion that do not have sufficient energy to react — from the 2022 VCAA examination report'

const EXAM_A: SAExaminerStats = {
  marks: [27, 19, 27, 20, 7],
  average: 1.6,
  comment: (
    <>
      The first mark was awarded for the correct definition of flashpoint:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          The flash point is the lowest temperature at which a substance (e.g. fuel oil) will give off a
          vapour that will flash or burn momentarily when ignited / exposed to a flame (IUPAC definition).
        </li>
      </ul>
      Reference to &lsquo;lowest temperature&rsquo;, &lsquo;vapour&rsquo; and &lsquo;source of
      ignition&rsquo; were all required for this mark.
      <br />
      The second mark was awarded for a clear link to the strength of intermolecular forces present:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>As the strength of intermolecular forces increases, the flashpoint increases.</li>
      </ul>
      The third mark was awarded for a clear link to the molecular structure:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          The flashpoint is affected by the presence of branching, length of chain, presence/absence of
          different functional groups / polarity.
        </li>
      </ul>
      The fourth mark was awarded for explaining how the variation between flashpoints was a direct
      result of the differences between molecules. Students could have addressed any of the following
      three differences, using specific examples, such as:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          Size – Alkanes are non-polar with weak dispersion forces between molecules. Since the strength
          of dispersion forces increases as the size of the molecule increases, then the flashpoint
          increases.
        </li>
        <li>
          Branching – Flash point of any methyl heptane (branched isomer) is lower than octane (linear
          isomer). Increasing the branching decreases the surface area of the molecule, therefore
          decreases the number/strength of dispersion forces, hence decreases the flashpoint.
        </li>
        <li>
          Bonding type – Hydrogen bonding between two carboxylic acids (e.g. propanoic acid) is stronger
          than the dipole-dipole bonding between two ester molecules (e.g. methyl ethanoate). The
          carboxylic acids would have the higher flashpoint.
        </li>
      </ul>
      This last mark was the discriminating mark, and high-scoring responses from students were easily
      shown when they discussed two similar but related molecules and the expected difference in
      flashpoint.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [38, 18, 18, 16, 10],
  average: 1.4,
  comment: (
    <>
      <img loading="lazy" decoding="async" src={mbGraphSrc} alt={MB_GRAPH_ALT} className="w-full max-w-[460px] mt-1 mb-2" />
      The first mark was awarded when students showed or explained using either written communication
      or a diagram that the Boltzmann distribution shows the number of particles across the range of
      kinetic energies (in a gas mixture).
      <br />
      The second mark was awarded when students showed or explained using either written communication
      or a diagram that the proportion/fraction of particles that react / are involved in collisions that
      are successful is represented by the region under the curve where energy is equal to or greater
      than the activation energy (E<sub>A</sub>).
      <br />
      The third mark was awarded when students showed or explained, using either written communication
      or a diagram, either:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>that the total area under the curve represents the total number of particles</li>
        <li>
          a justification for the shape of the peak (i.e. there are a high number of particles with a
          common kinetic energy and – on either side of this peak – the numbers of particles decreases.
          These first three marks were often available with a very clearly annotated and well-labelled
          diagram.
        </li>
      </ul>
      The fourth mark was awarded when students clearly explained that the rate increases with the
      addition of a catalyst because the activation energy was lowered, via an alternative pathway, and
      so the proportion of molecules in collisions that are successful increases as indicated by the
      increased area under the curve.
      <br />
      To get this mark the student must specifically relate the proportion of the particles / successful
      collisions to the area under the curve. Possible responses include the following.
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          In the absence of a catalyst, there is a smaller proportion of H₂ and C₂H₄ particles that have
          sufficient energies to undergo successful collisions and a greater proportion of H₂ and C₂H₄
          particles that do not have sufficient kinetic energies to cause a reaction.
        </li>
        <li>
          The catalyst lowers the activation energy (E<sub>A</sub>) by adopting an alternative energy
          pathway. Since the activation energy is lowered, there is a greater proportion of H₂ and C₂H₄
          particles that have sufficient kinetic energies to have successful collisions. Reactant bonds
          are broken more frequently. This increases the likelihood of successful collisions and the
          reaction rate increases.
        </li>
      </ul>
      A significant number of students struggled in their approach to answering this question, which
      often resulted in them just writing everything they knew about Maxwell-Boltzmann distributions,
      therefore not specifically addressing the dot points specified in the stem.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: (
      <>
        The <b>flashpoint</b> is the <b>lowest temperature</b> at which a liquid gives off enough{' '}
        <b>vapour</b> to <b>ignite</b> (flash, or burn momentarily) when exposed to a{' '}
        <b>source of ignition</b> such as a flame.
      </>
    ),
    reason: (
      <>
        Mark 1: the definition. The report required all three of &lsquo;lowest temperature&rsquo;,
        &lsquo;vapour&rsquo; and &lsquo;source of ignition&rsquo; — leave one out and the mark is lost.
        It is the <i>vapour</i> above the liquid that burns, not the liquid itself.
      </>
    ),
  },
  {
    working: (
      <>
        To form a vapour, molecules must escape the liquid by overcoming the{' '}
        <b>intermolecular forces</b> between them (no covalent bonds are broken). The{' '}
        <b>stronger the intermolecular forces</b>, the higher the temperature needed to produce enough
        vapour, so the <b>higher the flashpoint</b>.
      </>
    ),
    reason: (
      <>
        Mark 2: the link to <b>bonding</b>. Say &ldquo;intermolecular forces&rdquo; (forces{' '}
        <i>between</i> molecules) — vaporising never breaks the C–C or C–H bonds inside a molecule.
      </>
    ),
  },
  {
    working: (
      <>
        The strength of the intermolecular forces depends on <b>molecular structure</b>: the{' '}
        <b>length of the carbon chain</b> (molecular size), the amount of <b>branching</b>, and the{' '}
        <b>functional groups</b> present (<b>polarity</b>), which decide whether there are only{' '}
        <b>dispersion forces</b>, or also <b>dipole–dipole</b> forces or <b>hydrogen bonding</b>.
      </>
    ),
    reason: <>Mark 3: the link to <b>structure</b> — name the structural features that change the forces.</>,
  },
  {
    working: (
      <>
        <b>Chain length:</b> alkanes are non-polar, with only dispersion forces. Octane, C₈H₁₈, is a
        larger molecule than hexane, C₆H₁₄, with more electrons and more contact between molecules, so
        its <b>dispersion forces are stronger</b> and its flashpoint is <b>higher</b>.
      </>
    ),
    reason: (
      <>
        Mark 4 (the report&rsquo;s &ldquo;discriminating mark&rdquo;): explain the variation with a{' '}
        <b>specific comparison of two related molecules</b>. One well-explained comparison is enough;
        two more are given here so you can choose.
      </>
    ),
  },
  {
    working: (
      <>
        <b>Branching:</b> 2-methylheptane and octane are isomers (both C₈H₁₈). The branched isomer is
        more compact, with a <b>smaller surface area</b> for contact between molecules, so its{' '}
        <b>dispersion forces are weaker</b> and its flashpoint is <b>lower</b> than octane&rsquo;s.
      </>
    ),
    reason: <>Comparing isomers isolates the effect of shape: same molecular formula, same number of electrons, different branching.</>,
  },
  {
    working: (
      <>
        <b>Functional group:</b> propanoic acid, CH₃CH₂COOH, and methyl ethanoate, CH₃COOCH₃, are isomers
        (both C₃H₆O₂). The carboxylic acid has an O–H group, so it forms <b>hydrogen bonds</b> between
        molecules; the ester has no O–H, so only <b>dipole–dipole</b> and dispersion forces. Propanoic
        acid therefore has the <b>higher flashpoint</b>.
      </>
    ),
    reason: (
      <>
        Hydrogen bonding needs H bonded directly to O, N or F. The ester&rsquo;s H atoms are all bonded to
        C, so it is polar (dipole–dipole) but cannot hydrogen bond with itself. Specific flashpoint
        values were not required.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <><Chem eq="C2H4(g) + H2(g) -> C2H6(g)" /> (Pt catalyst)</>,
    reason: <>The reaction being described: addition of hydrogen to ethene. Not marked, but it names the particles your answer talks about.</>,
  },
  {
    working: (
      <>
        <img loading="lazy" decoding="async" src={mbGraphSrc} alt={MB_GRAPH_ALT} className="w-full max-w-[420px]" />
      </>
    ),
    reason: (
      <>
        A labelled sketch like VCAA&rsquo;s earns the first three marks on its own if it is clearly
        annotated: axes &ldquo;number of particles&rdquo; and &ldquo;(kinetic) energy&rdquo;, both E
        <sub>A</sub> lines, and the shaded areas labelled. Note the <b>curve itself is the same</b> with
        and without Pt — the temperature has not changed; only the E<sub>A</sub> line moves.
      </>
    ),
  },
  {
    working: (
      <>
        The <b>Maxwell–Boltzmann distribution</b> shows the <b>number of particles</b> (H₂ and C₂H₄
        molecules) with each value of <b>kinetic energy</b> in the gas mixture at a given temperature.
      </>
    ),
    reason: <>Mark 1: what the curve shows — the spread of kinetic energies of the particles.</>,
  },
  {
    working: (
      <>
        Very few particles have very low or very high energies; the <b>largest number of particles have
        energies near the peak</b> (the most common kinetic energy), and the numbers fall away on either
        side of it. The <b>total area under the curve</b> represents the{' '}
        <b>total number of particles</b>.
      </>
    ),
    reason: <>Mark 3: either the shape of the peak or the meaning of the total area earns this mark — writing both is safe.</>,
  },
  {
    working: (
      <>
        Only collisions in which the particles have energy <b>equal to or greater than the activation
        energy (E<sub>A</sub>)</b> are <b>successful</b> and lead to reaction. The{' '}
        <b>proportion of particles</b> able to react is the <b>area under the curve to the right of E
        <sub>A</sub></b>.
      </>
    ),
    reason: <>Mark 2: link activation energy to the <b>area under the curve</b> beyond E<sub>A</sub>. (A successful collision also needs the correct orientation, but orientation does not appear on this graph — only energy does.)</>,
  },
  {
    working: (
      <>
        Without a catalyst, E<sub>A</sub> is high, so only a <b>small proportion</b> of H₂ and C₂H₄
        particles have enough energy to react — the reaction is very slow at SLC.
      </>
    ),
    reason: <>The blue area on the graph.</>,
  },
  {
    working: (
      <>
        The platinum catalyst provides an <b>alternative reaction pathway</b> with a{' '}
        <b>lower activation energy</b>. E<sub>A</sub> moves to the left, so a <b>greater proportion</b> of
        particles have energy ≥ E<sub>A</sub> (a <b>larger area under the curve</b>). There are more{' '}
        <b>successful collisions per unit time</b>, so the <b>rate of reaction increases</b>.
      </>
    ),
    reason: (
      <>
        Mark 4: the catalyst&rsquo;s effect, tied to the <b>area under the curve</b> — the report says
        this link must be made specifically. The extra (pink) area is the additional proportion that can
        now react. A catalyst does not give the particles more energy and does not change the curve.
      </>
    ),
  },
]

export default function ChemistryQ9_2022SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 9 (8 marks)</p>
        <div className="border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-3">
          Flashpoint measurements of various types are used as one measure of the flammability of liquid
          materials … Many manufacturing processes involve flammable chemicals; therefore, flashpoints and
          flammability limits are essential to maximise safety in process design and operational
          procedures.
        </div>
        <p className="mt-2 text-right text-[12.5px] text-gray-500 dark:text-gray-400">
          Source: M Vidal, WJ Rogers, JC Holste and MS Mannan, &lsquo;A review of estimation methods for
          flash points and flammability limits&rsquo;, American Institute of Chemical Engineers (AIChE),
          30 March 2004, &lt;https://doi.org/10.1002/prs.10004&gt;
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Flashpoint"
        marks={4}
        statement={
          <>
            Describe and explain the variation in flashpoint between organic molecules. In your answer:
            <ul className="list-disc pl-5 my-1">
              <li>define &lsquo;flashpoint&rsquo;</li>
              <li>refer to the influence of structure and bonding on flashpoint.</li>
            </ul>
            References to specific values of flashpoints and to safety are <b>not</b> required.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="Flashpoint and the Current Study Design" always>
          <p>
            This question was set on the old (2017–2023) study design, which named flashpoint. The current
            study design asks about trends in boiling point, melting point and viscosity instead.
            Flashpoint follows exactly the same intermolecular-force reasoning as boiling point, so the
            question is still good practice — read &ldquo;flashpoint&rdquo; as &ldquo;how easily the
            liquid vaporises&rdquo;.
          </p>
        </Background>
        <Background title="How to Think About It">
          <p>
            Four marks, four separate ideas, and the dot points tell you two of them: a precise{' '}
            <b>definition</b>, then <b>bonding</b> (stronger intermolecular forces → higher flashpoint),
            then <b>structure</b> (chain length, branching, functional groups decide those forces), and
            finally a <b>specific comparison of two related molecules</b> explaining why one has the higher
            flashpoint.
          </p>
          <p>
            The traps from the report: a definition missing any of &lsquo;lowest temperature&rsquo;,
            &lsquo;vapour&rsquo; or &lsquo;source of ignition&rsquo; scores nothing for mark 1, and the
            fourth mark — the one that separated the top answers — needs a worked example, not just a
            general statement.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Definition: the <b>lowest temperature</b> at which a substance gives off a <b>vapour</b> that will flash or burn momentarily when exposed to a <b>source of ignition</b> (all three needed).</> },
            { point: <>Bonding: as the <b>strength of intermolecular forces increases</b>, the <b>flashpoint increases</b>.</> },
            { point: <>Structure: flashpoint is affected by <b>branching</b>, <b>chain length</b>, and the presence of different <b>functional groups / polarity</b>.</> },
            { point: <>Explaining the variation with a <b>specific example</b> of two related molecules — e.g. <b>larger alkane → stronger dispersion forces</b>; <b>branched isomer → smaller surface area → weaker dispersion forces → lower flashpoint</b>; <b>carboxylic acid (hydrogen bonding) higher than ester (dipole–dipole)</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="b"
        topic="Catalysts and Rate"
        marks={4}
        statement={
          <>
            In 1859, the Scottish physicist James Clerk Maxwell developed a kinetic theory of gases. He
            determined the distribution of the velocities of gas molecules, which were later, in 1871,
            generalised to a distribution of the energies of gas molecules by the Austrian physicist Ludwig
            Boltzmann.
            <br />
            The reaction between ethene and hydrogen gas is very slow at SLC. When the same reaction is
            performed at SLC in the presence of a platinum catalyst, the reaction occurs more quickly.
            <br />
            <br />
            Use the Maxwell-Boltzmann distribution curve to explain the difference between the rate of
            reaction of ethene and hydrogen gas with and without the platinum catalyst. In your answer:
            <ul className="list-disc pl-5 my-1">
              <li>explain the Maxwell-Boltzmann distribution curve</li>
              <li>refer to activation energy.</li>
            </ul>
            A graph may assist your answer but is <b>not</b> essential.
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="Study Design Note" always>
          <p>
            The current study design does not name the Maxwell–Boltzmann distribution, but it does cover
            collision theory, activation energy and catalysts providing an alternative pathway with a lower
            activation energy. The distribution curve is the standard way to show <i>why</i> lowering E
            <sub>A</sub> speeds a reaction up, and textbooks still teach it, so this part is good practice.
          </p>
        </Background>
        <Background title="How to Think About It">
          <p>
            Answer the two dot points, in order, and nothing else: first <b>explain the curve</b> (what the
            axes mean, why it has a peak, what the total area is), then bring in <b>activation energy</b>{' '}
            (the area beyond E<sub>A</sub> is the proportion that can react) and show what the catalyst
            does to it.
          </p>
          <p>
            Four marks: what the curve shows; the area beyond E<sub>A</sub> = proportion with enough energy;
            the shape or total area; and the catalyst lowering E<sub>A</sub> so a <b>larger area</b> lies
            beyond it. The report says many students wrote everything they knew about the curve without
            addressing the dot points, and that mark 4 needs the proportion of successful collisions tied
            specifically to the <b>area under the curve</b>.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>The distribution shows the <b>number of particles</b> across the range of <b>kinetic energies</b> (in a gas mixture).</> },
            { point: <>The <b>proportion of particles</b> in successful collisions is the <b>region under the curve</b> where energy is <b>≥ the activation energy</b> (E<sub>A</sub>).</> },
            { point: <>Either: the <b>total area under the curve</b> represents the <b>total number of particles</b>, or the <b>shape of the peak</b> (many particles with a common kinetic energy, fewer either side).</> },
            { point: <>The catalyst gives an <b>alternative pathway</b> with a <b>lower activation energy</b>, so a <b>greater proportion</b> of particles have enough energy — a <b>larger area under the curve</b> — and the <b>rate increases</b>.</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
