// 2020 Chemistry Exam, Section B Question 7 (15 marks). Eggs and fats: why vinegar helps poach an
// egg with a runny yolk (protein denaturation by heat and pH), identifying and quantifying the fatty
// acids of egg yolk by chromatography of their methyl esters, which fatty acid has the lowest flash
// point (melting-point trends, chain length versus C=C), and the formula, molar mass and iodine
// uptake of the triglyceride made from three palmitoleic acid molecules. Question text and both
// tables transcribed from the original paper (no figures). Mark allocations are from the VCAA
// examination report, which marks each mark-earning statement with an asterisk (and itemises
// part a. in words); VCAA report only — no second source. The worked solutions, "How to Think
// About It" notes and model answers are original. Numbers checked in Python with Data Book
// molar masses (C 12.0, H 1.0, O 16.0, I 126.9).
// Study design: all parts are on the current (2024–2027) study design — protein denaturation by
// heat and pH, HPLC, melting points and structure/bonding, triglycerides, degree of unsaturation
// using iodine. Borderline: "flash point" (part b.ii) is named in the old study design but not in
// the current one's list of physical properties (boiling point, melting point, viscosity); the
// reasoning is the same intermolecular-force argument, so it is written up with a note.
// Report slips kept verbatim: 7a "did not mention of the denaturation"; 7bi "the associate methyl
// esters"; 7cii "100 g" (the paper says 100.0 g) and "= = 95.2 g".

import Chem from '../Chem'
import { Background, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'

const TD = 'border border-gray-300 dark:border-gray-700 px-3 py-1.5'
const TH = 'border border-gray-300 dark:border-gray-700 px-3 py-1.5 font-semibold text-center'

const EXAM_A: SAExaminerStats = {
  marks: [61, 25, 12, 3],
  average: 0.6,
  comment: (
    <>
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          Cooking denatures protein in egg white and yolk. Denaturation changes secondary / tertiary structures
          of protein and allows proteins to coagulate and egg to harden.
        </li>
        <li>Vinegar contains an acid and the change in pH also causes denaturation.</li>
      </ul>
      One mark was awarded for each of the dot points above and one mark for linking them to how the egg yolk
      can more easily remain running in any of the following points.
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          The vinegar can only access the surface of the egg and so only causes the egg white to solidify whilst
          the yolk remains runny.
        </li>
        <li>
          Yolk is not as affected since it is covered by a thin film of egg white protecting it to some degree from
          the vinegar.
        </li>
        <li>Yolk is not as affected since it is a larger proportion of the egg.</li>
        <li>
          Once the egg white has solidified the heat source can be removed before the yolk heats up enough to
          solidify.
        </li>
        <li>Quickly denaturing the egg white protects the yolk from denaturation so it stays runny.</li>
        <li>
          Yolk protein is intermixed with fats which protect or prevent it from precipitating, so it is denatured more
          slowly and stays runny.
        </li>
      </ul>
      Students often did not mention of the denaturation occurring due to the egg being placed into hot water.
      Some reference to the disruption of the type of bonds was required and it was not enough to just say
      &lsquo;denatured&rsquo;. A significant number of responses tried, incorrectly, to use the increased protein
      content of the egg yolk to justify that it became more denatured and hence the egg yolk remained runny.
    </>
  ),
}

const EXAM_BI: SAExaminerStats = {
  marks: [52, 24, 21, 3],
  average: 0.8,
  comment: (
    <>
      Chromatography can be used to separate a mixture of methyl esters because they have different strengths
      of attraction to the stationary and mobile phases.
      <br />
      OR
      <br />
      The methyl esters all contain the ester functional group so retention times will depend on molecular
      mass/size and extent of unsaturation. *
      <br />
      Calibrate by running pure samples of each of the methyl esters through the HPLC under the same conditions
      to determine individual retention times. *
      <br />
      The relative amounts and hence percentage composition of the egg yolk can be determined from the relative
      areas under the peaks/peak heights at the retention times of the associate methyl esters. *
      <br />
      Students who broke this question up into clear dot points generally performed well. Underlining or
      highlighting the key points also greatly assisted them. Reasons students did not gain full marks included:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>They related their responses to the fatty acids themselves and not the methyl esters.</li>
        <li>
          They thought the chromatography was referring to TLC/paper chromatography and quantitative analysis
          is not possible via this technique.
        </li>
        <li>
          They did not address key aspects outlined in the question in their responses, i.e.
          <ul className="pl-5 flex flex-col gap-1">
            <li>&ndash; What are the basic principles of chromatography?</li>
            <li>&ndash; How can the methyl esters be identified?</li>
            <li>&ndash; How can the percentage be determined?</li>
          </ul>
        </li>
      </ul>
    </>
  ),
}

const EXAM_BII: SAExaminerStats = {
  marks: [32, 18, 23, 21, 6],
  average: 1.5,
  comment: (
    <>
      Arachidonic acid. *
      <br />
      The weaker the attraction (intermolecular forces) between molecules, the lower the flashpoint.*
      <br />
      (Data indicates) that melting points increase as the number of C atom increases and (data indicates) that
      melting points decrease when C=C is present *
      <br />
      This effect of C=C on the melting point/flashpoint is greater than the effect caused by increasing chain length
      and so the greater the number of C=C causes a greater effect than the effect caused by increasing chain
      length and hence arachidonic acid should have the lowest melting point/flashpoint. *
      <br />
      In general, this question was not handled well by students. The use of trends in data and the relative effect
      of the two major influencing factors was not well understood. Some students limited their responses to the
      fatty acids that had actual melting point data. Frequently chain length was ignored.
    </>
  ),
}

const EXAM_CI: SAExaminerStats = {
  marks: [38, 38, 23],
  average: 0.9,
  comment: (
    <>
      C₅₁H₉₂O₆*
      <br />
      Molar mass = 51x12.0 + 92x1.0 + 6x16.0 = 800 - 801 (g mol⁻¹) *
      <br />
      Many mathematical errors showed up here, but these became significantly reduced if students worked
      through the correct formula:
      <br />
      3 x C₁₆H₃₀O₂ + C₃H₈O₃ – 3 x H₂O = C₅₁H₉₂O₆
    </>
  ),
}

const EXAM_CII: SAExaminerStats = {
  marks: [43, 11, 20, 27],
  average: 1.3,
  comment: (
    <>
      n(C₅₁H₉₂O₆) = 100 g / 800 g mol⁻¹ = 0.125 mol *
      <br />
      n(C=C) = 3 x 0.125 = 0.375 mol
      <br />
      n(I₂) = 0.375 mol *
      <br />
      m(I₂) = 0.375 x 253.8 = = 95.2 g *
      <br />
      Most students were able to obtain some marks on this question. Some had difficulty determining the amount
      of C=C double bonds and hence how this related to the amount of iodine required. This was further
      compounded by the number of students who did not recognise that iodine is a diatomic molecule.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: (
      <>
        Egg white and yolk are mostly <b>protein</b>. The <b>heat</b> of the hot water <b>denatures</b> the
        proteins: it <b>disrupts the hydrogen bonds, ionic interactions and dispersion forces</b> that hold
        each protein&rsquo;s <b>secondary and tertiary structure</b>, so the chains unfold and{' '}
        <b>coagulate</b> — the egg sets (solidifies).
      </>
    ),
    reason: (
      <>
        Mark 1: denaturation by <b>heat</b>. The report says students often did not mention the hot water, and that
        just writing &ldquo;denatured&rdquo; was not enough — name the <b>bonds that are disrupted</b> and the{' '}
        <b>structure</b> that is lost. (The primary structure — the covalent peptide bonds — is not broken.)
      </>
    ),
  },
  {
    working: (
      <>
        Vinegar contains <b>ethanoic acid</b>, which <b>lowers the pH</b> of the water. The extra H⁺ ions{' '}
        <b>protonate</b> the side groups of the protein (–COO⁻ → –COOH, –NH₂ → –NH₃⁺), which{' '}
        <b>disrupts the ionic interactions and hydrogen bonds</b> between side chains — the <b>change in pH</b>{' '}
        also <b>denatures</b> the protein, so the egg white sets <b>faster</b>.
      </>
    ),
    reason: (
      <>
        Mark 2: denaturation by the <b>change in pH</b>. Acid and heat together denature the protein more
        quickly than heat alone.
      </>
    ),
  },
  {
    working: (
      <>
        The vinegar and the heat reach the <b>egg white on the outside first</b>, so the <b>white solidifies
        quickly</b> around the yolk. The yolk inside is <b>protected by the white</b>, and the egg can be removed
        from the water <b>before the yolk heats up enough to denature</b>, so the <b>yolk stays runny</b>.
      </>
    ),
    reason: (
      <>
        Mark 3: <b>link</b> the denaturation to why the yolk stays runny — the report accepted any one of
        several such links. Don&rsquo;t argue that the yolk&rsquo;s higher protein content makes it &ldquo;more
        denatured&rdquo;: the report calls that incorrect.
      </>
    ),
  },
]

const ROWS_BI: WorkingRow[] = [
  {
    working: (
      <>
        <b>Separation:</b> the methyl esters in the mixture have <b>different strengths of attraction</b> (adsorption)
        to the <b>stationary phase</b> and <b>solubility in the mobile phase</b>, so they move through the HPLC
        column at different rates and come out at <b>different retention times</b>.
      </>
    ),
    reason: (
      <>
        Mark 1: the <b>principle</b> of chromatography. Talk about the <b>methyl esters</b> — they are what goes
        through the column, not the fatty acids themselves (the report lists this as a reason marks were lost).
      </>
    ),
  },
  {
    working: (
      <>
        <b>Identification:</b> run a <b>pure sample (standard) of each methyl ester</b> through the HPLC{' '}
        <b>under the same conditions</b> (same column, mobile phase, temperature and flow rate) to find its{' '}
        <b>retention time</b>. Each peak in the egg-yolk chromatogram is identified by <b>matching its retention
        time</b> to a standard.
      </>
    ),
    reason: (
      <>
        Mark 2: <b>how each one is identified</b>. Retention times only match if the conditions are identical,
        so say so.
      </>
    ),
  },
  {
    working: (
      <>
        <b>Percentage:</b> the <b>area under each peak</b> is proportional to the amount of that methyl ester, so
        % of a fatty acid = <b>(area of its peak ÷ total area of all the peaks) × 100</b>.
      </>
    ),
    reason: (
      <>
        Mark 3: <b>how the percentage is found</b> — from the <b>relative peak areas</b> (or peak heights).
        This needs a quantitative technique such as HPLC: TLC or paper chromatography can&rsquo;t give a percentage,
        which the report says some students assumed.
      </>
    ),
  },
]

const FA_ROWS: [string, string, number, number, string][] = [
  ['palmitic', 'C16H32O2', 16, 0, '63'],
  ['stearic', 'C18H36O2', 18, 0, '69'],
  ['palmitoleic', 'C16H30O2', 16, 1, '0'],
  ['oleic', 'C18H34O2', 18, 1, '—'],
  ['linoleic', 'C18H32O2', 18, 2, '—'],
  ['linolenic', 'C18H30O2', 18, 3, '—'],
  ['arachidonic', 'C20H32O2', 20, 4, '—'],
]

const ROWS_BII: WorkingRow[] = [
  {
    working: (
      <>
        <table className="text-[13px] border border-gray-300 dark:border-gray-700 my-1">
          <thead>
            <tr>
              <th className={TH}>Fatty acid</th>
              <th className={TH}>Formula</th>
              <th className={TH}>C atoms</th>
              <th className={TH}>C=C</th>
              <th className={TH}>m.p. (°C)</th>
            </tr>
          </thead>
          <tbody>
            {FA_ROWS.map(([name, f, c, d, mp]) => (
              <tr key={name}>
                <td className={TD}>{name}</td>
                <td className={TD}><Chem eq={f} /></td>
                <td className={`${TD} text-center`}>{c}</td>
                <td className={`${TD} text-center`}>{d}</td>
                <td className={`${TD} text-center`}>{mp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    ),
    reason: (
      <>
        First get the facts you need from the Data Book (formulas of selected fatty acids). A saturated fatty acid
        is CₙH₂ₙO₂; <b>each C=C removes 2 H</b>. E.g. arachidonic <Chem eq="C20H32O2" />: 40 − 32 = 8
        H missing, so <b>4 C=C</b>. This is a working step for you — you don&rsquo;t need to copy the table into
        your answer.
      </>
    ),
  },
  {
    working: (
      <>
        <b>Arachidonic acid</b> would have the <b>lowest flash point</b>.
      </>
    ),
    reason: <>Mark 1: the identification.</>,
  },
  {
    working: (
      <>
        Flash point (like melting point) depends on the strength of the <b>intermolecular forces (dispersion
        forces)</b> between molecules: the <b>weaker the intermolecular forces</b>, the more easily the molecules
        separate, and the <b>lower the flash point</b>.
      </>
    ),
    reason: (
      <>
        Mark 2: connects flash point to <b>intermolecular forces</b>. The flash point is the lowest temperature at
        which a substance gives off enough vapour to ignite — weaker forces mean it vaporises more easily.
      </>
    ),
  },
  {
    working: (
      <>
        Table 2 shows that melting point <b>increases with chain length</b> (palmitic, 16 C, 63 °C → stearic, 18 C,
        69 °C) and <b>decreases when a C=C is present</b> (palmitic, 16 C, 63 °C → palmitoleic, 16 C with one C=C,
        0 °C).
      </>
    ),
    reason: (
      <>
        Mark 3: <b>both trends from the data</b>, with the pairs that show them. Compare acids that differ in only{' '}
        <i>one</i> thing: palmitic vs stearic (chain length only), palmitic vs palmitoleic (C=C only). The report
        says chain length was frequently ignored.
      </>
    ),
  },
  {
    working: (
      <>
        Longer chains have <b>more electrons</b>, so <b>stronger dispersion forces</b>. Each <b>cis C=C puts a
        &ldquo;kink&rdquo; in the chain</b>, so the molecules <b>cannot pack closely together</b> and the dispersion
        forces between them are <b>weaker</b>.
      </>
    ),
    reason: (
      <>
        The <b>structure and bonding</b> explanation the question&rsquo;s second dot point asks for.
      </>
    ),
  },
  {
    working: (
      <>
        The data show the <b>effect of a C=C is much greater</b> than the effect of chain length (one C=C lowers the
        melting point by 63 °C; two extra C atoms raise it by only 6 °C). Arachidonic acid has the{' '}
        <b>most C=C bonds (4)</b>, so even though it has the longest chain (20 C) it has the <b>weakest
        intermolecular forces</b> and the <b>lowest melting point and flash point</b>.
      </>
    ),
    reason: (
      <>
        Mark 4: weigh the <b>relative size</b> of the two effects — this is how you decide for the acids with no
        melting point given (the report notes some students only looked at the three that had data). Check:
        arachidonic acid&rsquo;s real melting point is about −49 °C, the lowest of the seven.
        <span className="block mt-1 text-[12.5px] text-gray-500 dark:text-gray-400">
          Study design note: &ldquo;flash point&rdquo; was named in the old study design; the current one lists
          boiling point, melting point and viscosity. The reasoning here — trends and intermolecular forces from
          structure and bonding — is the same and is still examinable.
        </span>
      </>
    ),
  },
]

const ROWS_CI: WorkingRow[] = [
  {
    working: <>palmitoleic acid: <Chem eq="C16H30O2" />; glycerol: <Chem eq="C3H8O3" /></>,
    reason: (
      <>
        Palmitoleic acid&rsquo;s formula is in the Data Book (formulas of selected fatty acids). Glycerol is
        propane-1,2,3-triol, <Chem eq="CH2(OH)CH(OH)CH2OH" />.
      </>
    ),
  },
  {
    working: <>3<Chem eq="C16H30O2" /> + <Chem eq="C3H8O3" /> − 3<Chem eq="H2O" /></>,
    reason: (
      <>
        A triglyceride forms by <b>condensation</b>: each of glycerol&rsquo;s three –OH groups forms an{' '}
        <b>ester</b> link with one fatty acid, and <b>one water molecule is lost per ester link</b> — three in all.
      </>
    ),
  },
  {
    working: <>C: 48 + 3 = 51; H: 90 + 8 − 6 = 92; O: 6 + 3 − 3 = 6</>,
    reason: <>Add up the atoms, remembering to subtract the 3 H₂O (6 H and 3 O).</>,
  },
  {
    working: (
      <b>
        molecular formula: <Chem eq="C51H92O6" />
      </b>
    ),
    reason: <>Mark 1.</>,
  },
  {
    working: <>M = 51 × 12.0 + 92 × 1.0 + 6 × 16.0 = 612.0 + 92.0 + 96.0</>,
    reason: <>Molar masses from the Data Book&rsquo;s periodic table.</>,
  },
  {
    working: <b>M = 800.0 g mol⁻¹</b>,
    reason: (
      <>
        Mark 2, with the unit. The report accepted 800–801 g mol⁻¹ (801 comes from more precise atomic masses).
        Check: 3 × 254.0 + 92.0 − 3 × 18.0 = 800.0 g mol⁻¹ — the same answer from the molar masses of the pieces.
      </>
    ),
  },
]

const ROWS_CII: WorkingRow[] = [
  {
    working: <>n(triglyceride) = m / M = 100.0 g / 800.0 g mol⁻¹</>,
    reason: <>Convert the mass to moles, using the molar mass from part c.i.</>,
  },
  {
    working: <>n(triglyceride) = 0.1250 mol</>,
    reason: <>Mark 1.</>,
  },
  {
    working: <>n(C=C) = 3 × 0.1250 = 0.3750 mol</>,
    reason: (
      <>
        Palmitoleic acid has <b>one C=C</b> (<Chem eq="C16H30O2" /> is 2 H short of saturated{' '}
        <Chem eq="C16H32O2" />), and the triglyceride has <b>three</b> palmitoleic chains, so <b>3 C=C per
        molecule</b>. The report says some students had difficulty with this step.
      </>
    ),
  },
  {
    working: <>n(<Chem eq="I2" />) = n(C=C) = 0.3750 mol</>,
    reason: (
      <>
        Mark 2. In an <b>addition reaction</b>, <b>one <Chem eq="I2" /> molecule adds across each C=C</b>
        {' '}(–CH=CH– + <Chem eq="I2" /> → –CHI–CHI–), so the mole ratio C=C : <Chem eq="I2" /> is 1 : 1.
      </>
    ),
  },
  {
    working: <>m(<Chem eq="I2" />) = n × M = 0.3750 mol × 253.8 g mol⁻¹</>,
    reason: (
      <>
        Iodine is <b>diatomic</b>: M(<Chem eq="I2" />) = 2 × 126.9 = 253.8 g mol⁻¹. Using 126.9 (forgetting iodine is diatomic) is the error the
        report mentions.
      </>
    ),
  },
  {
    working: <b>m(<Chem eq="I2" />) = 95.2 g</b>,
    reason: (
      <>
        Mark 3, with the unit (95.175 g unrounded; three significant figures, as in the report). Plausible: each
        800 g of triglyceride takes up 3 × 253.8 = 761 g of iodine, so 100 g takes up about 95 g. The report&rsquo;s
        &ldquo;= = 95.2 g&rdquo; is just a typo for &ldquo;= 95.2 g&rdquo;.
      </>
    ),
  },
]

export default function ChemistryQ7_2020SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 7 (15 marks)</p>
        <p className="mb-3">
          Inside the shell of an egg is egg white that encircles egg yolk. The nutrition information for egg yolk
          and egg white is given in Table 1.
        </p>
        <p className="font-semibold mb-1">Table 1</p>
        <table className="text-[13.5px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
          <thead>
            <tr>
              <th className={TH}>Nutrient</th>
              <th className={TH}>Per 100 g of egg yolk</th>
              <th className={TH}>Per 100 g of egg white</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className={TD}>energy</td><td className={`${TD} text-center`}>1437 kJ</td><td className={`${TD} text-center`}>184 kJ</td></tr>
            <tr><td className={TD}>fat</td><td className={`${TD} text-center`}>27.0 g</td><td className={`${TD} text-center`}>trace amounts</td></tr>
            <tr><td className={TD}>carbohydrate</td><td className={`${TD} text-center`}>0.0 g</td><td className={`${TD} text-center`}>0.0 g</td></tr>
            <tr><td className={TD}>protein</td><td className={`${TD} text-center`}>16.4 g</td><td className={`${TD} text-center`}>10.8 g</td></tr>
          </tbody>
        </table>
      </div>

      <PartCard
        letter="a"
        topic="Protein Denaturation"
        marks={3}
        statement={
          <>
            Poaching an egg involves cracking an egg and carefully placing the contents in a pan of hot water.
            <br />
            This allows the egg white to solidify around the egg yolk.
            <br />
            Using your knowledge of chemistry, explain why vinegar is sometimes added to the water to produce a
            poached egg with a runny yolk.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            Egg white &ldquo;solidifying&rdquo; is <b>protein denaturation</b>, and there are two things in the pan
            that cause it: the <b>hot water</b> and the <b>acid in vinegar</b> (a pH change). Three marks means three
            ideas: heat denatures the protein (say which <b>bonds</b> and which <b>structure</b> are disrupted), the
            acid&rsquo;s change in pH denatures it too, and then <b>link</b> that to the yolk staying runny — the
            white on the outside sets quickly while the yolk inside is protected. The report says answers often
            forgot the hot water, and just writing &ldquo;denatured&rdquo; without naming the bonds was not enough.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <><b>Heat (cooking) denatures</b> the protein: it <b>disrupts the bonds</b> holding the <b>secondary/tertiary structure</b>, so the proteins <b>coagulate</b> and the egg hardens.</> },
            { point: <>Vinegar contains an <b>acid</b>, and the <b>change in pH</b> also causes <b>denaturation</b>.</> },
            { point: <>A <b>link</b> to why the <b>yolk stays runny</b> — e.g. the acid only reaches the <b>surface</b> (the white), the <b>white sets quickly and protects the yolk</b>, or the egg is <b>removed before the yolk heats up</b> enough to set.</> },
          ]}
        />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">b.</p>
        <p className="mb-3">
          The composition of fatty acids found in an egg yolk sample is given in Table 2. The melting points for
          the first three fatty acids are provided.
        </p>
        <p className="font-semibold mb-1">Table 2</p>
        <table className="text-[13.5px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
          <thead>
            <tr>
              <th className={TH}>Fatty acid</th>
              <th className={TH}>Percentage (%)</th>
              <th className={TH}>Melting point (°C)</th>
            </tr>
          </thead>
          <tbody>
            {([
              ['palmitic', '25.9', '63'],
              ['stearic', '9.1', '69'],
              ['palmitoleic', '3.4', '0'],
              ['oleic', '40.9', ''],
              ['linoleic', '16.3', ''],
              ['linolenic', '2.9', ''],
              ['arachidonic', '1.5', ''],
            ] as const).map(([n, p, m]) => (
              <tr key={n}>
                <td className={TD}>{n}</td>
                <td className={`${TD} text-center`}>{p}</td>
                <td className={`${TD} text-center`}>{m}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PartCard
        letter="b.i"
        topic="HPLC Analysis"
        marks={3}
        statement={
          <>
            The composition of fatty acids in an egg yolk was determined by reacting the fatty acids with methanol
            to produce methyl esters and then analysing the methyl esters using chromatography.
            <br />
            Explain, using the principles of chromatography, how each fatty acid in the egg yolk sample can be
            identified and the percentage determined.
          </>
        }
        examinerReport={EXAM_BI}
      >
        <Background title="How to Think About It">
          <p>
            The question has three parts hidden in one sentence, one mark each: the <b>principle</b> (why the
            mixture separates), <b>identification</b> (retention time compared with standards) and the{' '}
            <b>percentage</b> (relative peak areas). Write them as three separate dot points — the report says
            students who did this generally performed well. Talk about the <b>methyl esters</b>, since they are
            what is analysed, and use a <b>quantitative</b> technique such as HPLC, not TLC or paper chromatography.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BI} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>The methyl esters <b>separate</b> because they have <b>different strengths of attraction to the stationary and mobile phases</b> (or: retention times depend on <b>molecular size</b> and <b>extent of unsaturation</b>).</> },
            { point: <><b>Run pure samples (standards)</b> of each methyl ester <b>under the same conditions</b> to find their <b>retention times</b>, and match.</> },
            { point: <>The <b>percentage</b> comes from the <b>relative areas under the peaks</b> (or peak heights) at those retention times.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="b.ii"
        topic="Fatty Acid Properties"
        marks={4}
        statement={
          <>
            Identify the fatty acid in Table 2 that would have the lowest flash point. Explain your answer in terms
            of both the:
            <ul className="list-disc pl-5 flex flex-col gap-0.5 mt-1">
              <li>melting point trends shown in Table 2</li>
              <li>structure and bonding of the fatty acids.</li>
            </ul>
          </>
        }
        examinerReport={EXAM_BII}
      >
        <Background title="How to Think About It">
          <p>
            Flash point, like melting point, is lower when the <b>intermolecular forces are weaker</b> — so the
            question is &ldquo;which fatty acid has the weakest forces between its molecules?&rdquo;. Two things
            change the forces: <b>chain length</b> (longer → stronger) and <b>number of C=C</b> (more → weaker,
            because the kinks stop the chains packing). They pull in opposite directions, so use the data to show
            which effect is <b>bigger</b>, then apply it to every acid in the table — including the four with no
            melting point given. Four marks: the answer, the IMF–flash point link, both data trends, and the
            relative size of the two effects. The report says chain length was frequently ignored.
          </p>
        </Background>
        <WorkingTable rows={ROWS_BII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <><b>Arachidonic acid</b>.</> },
            { point: <>The <b>weaker the intermolecular forces</b> between molecules, the <b>lower the flash point</b>.</> },
            { point: <>The data show melting point <b>increases as the number of C atoms increases</b> and <b>decreases when C=C is present</b>.</> },
            { point: <>The <b>effect of C=C is greater</b> than the effect of chain length, so the acid with the <b>most C=C</b> (arachidonic, 4) has the <b>lowest melting point/flash point</b>.</> },
          ]}
        />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">c.</p>
      </div>

      <PartCard
        letter="c.i"
        topic="Triglyceride Formula"
        marks={2}
        statement={<>Give the molecular formula and the molar mass of the triglyceride formed from three palmitoleic acid molecules.</>}
        examinerReport={EXAM_CI}
      >
        <Background title="How to Think About It">
          <p>
            A triglyceride is <b>glycerol + three fatty acids − three water molecules</b> (a condensation reaction
            makes three ester links). Write that as an atom count and the formula falls out — the report says the
            many mathematical errors &ldquo;became significantly reduced&rdquo; when students worked through it this
            way. Two marks: one for the formula, one for the molar mass.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CI} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Molecular formula <b><Chem eq="C51H92O6" /></b>.</> },
            { point: <>Molar mass <b>= 51 × 12.0 + 92 × 1.0 + 6 × 16.0 = 800 g mol⁻¹</b> (800–801 accepted).</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="c.ii"
        topic="Iodine Addition"
        marks={3}
        statement={
          <>
            Calculate the mass of iodine, <Chem eq="I2" />, in grams, that reacts in an addition reaction with 100.0
            g of the triglyceride formed from three palmitoleic acid molecules.
          </>
        }
        examinerReport={EXAM_CII}
      >
        <Background title="How to Think About It">
          <p>
            Iodine adds across C=C double bonds, <b>one <Chem eq="I2" /> per C=C</b>, so the question is really
            &ldquo;how many moles of C=C are in 100.0 g?&rdquo;. Plan: mass → mol of triglyceride (using part c.i) →
            mol of C=C (<b>3 per molecule</b>: one in each palmitoleic chain) → mol of <Chem eq="I2" /> → mass, with
            M(<Chem eq="I2" />) = 253.8 because iodine is <b>diatomic</b>. The report names both the C=C count and
            the diatomic iodine as where students went wrong.
          </p>
        </Background>
        <WorkingTable rows={ROWS_CII} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <><b>n(triglyceride) = 100.0 / 800 = 0.125 mol</b>.</> },
            { point: <><b>n(<Chem eq="I2" />) = n(C=C) = 3 × 0.125 = 0.375 mol</b> — three C=C per molecule, one <Chem eq="I2" /> per C=C.</> },
            { point: <><b>m(<Chem eq="I2" />) = 0.375 × 253.8 = 95.2 g</b>, using <b>M(<Chem eq="I2" />) = 253.8 g mol⁻¹</b>.</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
