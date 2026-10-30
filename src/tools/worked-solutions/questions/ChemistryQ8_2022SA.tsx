// 2022 Chemistry Exam, Section B Question 8 (11 marks). Experimental design: a student's
// report on how the ethanol concentration of white wine affects the rate at which the ethanol
// oxidises, measured by acid-base titration with 0.0100 M NaOH after two weeks. Parts: precision
// of the titration method, % m/m of ethanol in Beaker 2, the independent variable, the effect of
// rinsing the pipette with water, why acidity tracks ethanol oxidation, a conclusion from the
// titres, and a discussion of that conclusion. Question text transcribed from the original paper
// (the two tables are transcribed as HTML tables; the paper has no figures). Mark allocations
// and accepted answers are from the VCAA examination report (VCAA report only — no second
// source); the "How to Think About It" notes, model answers and the mark split for a. and f.ii
// are original. Numbers checked in Python (9.96% m/m; concordant mean titres 24.59, 21.29, 2.61
// and 2.71 mL; the acid already in the wine alone would give a titre of about 2.36 mL).
// Study design: acid-base titration is Unit 2 content in the current study design, but the
// experimental-design skills tested here (precision, concordant titres, rinsing, variables,
// conclusions) are key science skills and oxidation of ethanol to ethanoic acid is Unit 4, so the
// whole question is written up (flagged borderline for KZ). No Data Book values are used.
// The report's f.ii comment reads "One mark was awarded for recognising any two of the following"
// for a 2-mark part; kept verbatim — our mark split reads it as one mark per point.

import Chem from '../Chem'
import { Background, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'

const cell = 'border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center'
const head = 'border border-gray-300 dark:border-gray-700 px-3 py-1.5 text-center font-semibold'
const rowHead = 'border border-gray-300 dark:border-gray-700 px-3 py-1.5 font-semibold text-left'

const EXAM_A: SAExaminerStats = {
  marks: [80, 20],
  average: 0.2,
  comment: (
    <>
      Step 11 in the method requires that the results be concordant, so the data that is obtained will be
      precise.
      <br />
      Students needed to clearly justify that by using correct experimental technique in a consistent fashion
      this would also produce a minimal spread in data collected, and lead to good precision.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [67, 7, 7, 19],
  average: 0.8,
  comment: (
    <>
      The first mark was awarded for correctly determining the mass of ethanol in 245 g of wine:
      <br />
      Mass (ethanol in 245 g) = 245.00 × 0.0812 = 19.89 g
      <br />
      The second mark was awarded for correctly determining the total mass of ethanol in beaker 2:
      <br />
      Total mass of ethanol = 19.89 + 5.00 = 24.89 g
      <br />
      The third mark was awarded for correctly determining the initial ethanol concentration:
      <br />
      Initial % by mass = m(ethanol) / m(solution) x 100%
      <br />
      = 24.89/250 ×100 %
      <br />
      = 9.96 % m/m
      <br />
      Consequential marks were awarded when students were able to show clear calculations.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [30, 70],
  average: 0.7,
  comment: (
    <>
      Either of the following responses was accepted.
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>concentration of ethanol in beaker</li>
        <li>mass of ethanol added to the beaker</li>
      </ul>
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [43, 38, 19],
  average: 0.8,
  comment: (
    <>
      One mark was awarded for recognising that less NaOH would be required to neutralise the aliquot as the
      carboxylic acid formed would have been diluted by the water in the pipette.
      <br />
      The second mark was awarded for recognising that because the NaOH titre was smaller, then the calculated
      value for the acidity would be lower than the actual value.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [78, 22],
  average: 0.2,
  comment: <>One mark was awarded for the recognition that the oxidation of ethanol produces a carboxylic acid (ethanoic acid).</>,
}

const EXAM_FI: SAExaminerStats = {
  marks: [81, 19],
  average: 0.2,
  comment: <>One mark was awarded for the recognition that as the concentration of ethanol increases the rate of oxidation decreases.</>,
}

const EXAM_FII: SAExaminerStats = {
  marks: [94, 6, 0],
  average: 0.1,
  comment: (
    <>
      One mark was awarded for recognising any two of the following:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>The ethanol may not all be oxidised to ethanoic acid (i.e., the ethanol may only be oxidised to ethanal).</li>
        <li>
          It may have been better for the student to analyse the concentration of ethanol after two weeks, instead
          of performing an acid/base titration.
        </li>
        <li>
          The decrease could be the result of the higher ethanol concentration causing less oxygen to be present in
          the wine solution (altering the solubility), which means the oxidation will occur at a slower rate.
        </li>
        <li>The rate of oxidation should have increased as the concentration of ethanol increased, based on rate theory.</li>
        <li>
          The higher concentrations of ethanol may have inactivated the bacteria that was oxidising the ethanol /
          ethanol acts as a denaturant for enzymes.
        </li>
        <li>
          The different masses of wine used will contain different amounts of acid initially, hence will cause a
          decrease in titre.
        </li>
        <li>
          Radical changes (between beaker 2 and 3) to the observed titre compared to the regular/even increase in
          ethanol content.
        </li>
      </ul>
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <>Step 11 requires <b>three concordant titres</b> for each beaker — titres that agree within a narrow range (e.g. within 0.10 mL).</>,
    reason: <>Name the feature of the method that controls precision. <b>Precision</b> = how close repeated measurements are to each other (it says nothing about how close they are to the true value — that is accuracy).</>,
  },
  {
    working: <>Using the same careful technique each time (the same pipette and burette, reading the burette at eye level, swirling, stopping at the first permanent pink colour) and repeating until the titres agree keeps <b>random errors</b> small, so the titres have a <b>small spread</b> and the data will be <b>precise</b> (high precision).</>,
    reason: <>The mark needs the effect <i>and</i> its justification: consistent technique, repeated until concordant → <b>minimal spread</b> in the data → <b>good precision</b>. The report says students &ldquo;needed to clearly justify&rdquo; this — only 20% scored the mark. (Steps such as rinsing the burette with NaOH and the pipette with the sample prevent <i>systematic</i> errors, which affect accuracy rather than precision.)</>,
  },
]

const ROWS_B: WorkingRow[] = [
  { working: <>m(ethanol in wine) = % m/m ÷ 100 × m(wine)</>, reason: <>Beaker 2 holds ethanol from <b>two</b> sources: the ethanol already in the 245.00 g of wine (8.12% m/m, from the technician) and the 5.00 g of pure ethanol added.</> },
  { working: <>m(ethanol in wine) = 0.0812 × 245.00 g</> },
  { working: <>m(ethanol in wine) = 19.894 g</>, reason: <>Mark 1. Keep this unrounded for the next step.</> },
  { working: <>m(ethanol) total = 19.894 g + 5.00 g = 24.894 g</>, reason: <>Mark 2: add the pure ethanol from Table 1.</> },
  { working: <>% m/m = m(ethanol) ÷ m(mixture) × 100</>, reason: <>% m/m is grams of ethanol per 100 g of the <b>whole mixture</b>, so divide by the total mass of contents, 250.00 g — not by the 245.00 g of wine.</> },
  { working: <>% m/m = 24.894 g ÷ 250.00 g × 100</> },
  {
    working: <b>% m/m = 9.96% m/m</b>,
    reason: <>Mark 3. (9.9576% unrounded.) Three significant figures, set by 8.12%. The acid concentration (9.45 × 10⁻⁴ M) is not needed here — it is extra information. Sanity check: adding pure ethanol must raise the 8.12% — 9.96% is higher, as expected.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <b>The concentration of ethanol in the wine (the mass of pure ethanol added to each beaker)</b>,
    reason: <>The <b>independent variable</b> is the one the experimenter deliberately changes. The aim names it: &ldquo;how the oxidation rate … is affected by <i>the concentration of ethanol</i>&rdquo;, and Table 1 shows it being changed (0.00, 5.00, 10.00, 15.00 g of ethanol). The oxidation rate (measured by the titre) is the <i>dependent</i> variable.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <>Water left in the pipette <b>dilutes</b> the 25.00 mL aliquot, so it contains <b>fewer moles of acid</b> than 25.00 mL of the beaker contents should.</>,
    reason: <>The pipette delivers a fixed <i>volume</i>; any water inside it replaces part of the sample. That is why Step 5 says to rinse the pipette with the solution it will deliver.</>,
  },
  {
    working: <>So <b>less NaOH is needed to neutralise</b> the aliquot — the <b>titre is smaller</b>.</>,
    reason: <>Mark 1: the effect on the titre. n(NaOH) = n(acid) for a monoprotic acid, so fewer moles of acid → smaller volume of NaOH.</>,
  },
  {
    working: <>The student calculates c(acid) = n(NaOH) ÷ 25.00 mL from this smaller titre, so the <b>calculated acid concentration is lower than the actual value</b>.</>,
    reason: <>Mark 2: the effect on the <b>calculated value</b>, which is what the question asks. The calculation still assumes an undiluted 25.00 mL sample. (Contrast Step 4: water left in the <i>conical flask</i> does no harm, because it doesn&rsquo;t change the moles of acid in the flask.)</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <>When ethanol is oxidised it forms <b>ethanoic acid</b> (a <b>carboxylic acid</b>), so the <b>more ethanol oxidised, the more acid</b> in the beaker and the larger the NaOH titre.</>,
    reason: (
      <>
        Primary alcohol → (aldehyde) → carboxylic acid: <Chem eq="CH3CH2OH -> CH3CHO -> CH3COOH" />. Ethanol itself is not acidic, so the NaOH only measures the acid that oxidation has produced (on top of the acid already in the wine). The key link the mark needs: <b>oxidation produces acid</b>.
      </>
    ),
  },
]

const ROWS_FI: WorkingRow[] = [
  { working: <>Mean concordant titres: Beaker 1 = 24.59 mL, Beaker 2 = 21.29 mL, Beaker 3 = 2.61 mL, Beaker 4 = 2.71 mL</>, reason: <>Average only the concordant titres (within 0.10 mL), ignoring the rough first titre (23.65 mL, 3.55 mL, 1.80 mL) and outliers such as 24.55 and 22.25 mL in Beaker 2 and 4.45 mL in Beaker 3. Beaker 4 uses 2.65, 2.72 and 2.75 mL (2.45 and 2.85 mL are not concordant with them).</> },
  { working: <>Ethanol added: 0 g → 5 g → 10 g → 15 g, while the titre falls: 24.59 → 21.29 → 2.61 → 2.71 mL</>, reason: <>Bigger titre = more acid = more ethanol oxidised in the two weeks. So the titres fall as the ethanol concentration rises. (Beakers 3 and 4 differ by only 0.10 mL — essentially the same, both very low.)</> },
  {
    working: <b>As the concentration of ethanol in the wine increases, the rate of oxidation of ethanol decreases.</b>,
    reason: <>This is the opposite of what collision theory predicts, but the question asks for a conclusion <b>consistent with the student&rsquo;s results</b> — so write what the data show, not what you expected. The report&rsquo;s general comments single out this question: the data showed that increasing the reactant concentration decreased the rate, and many students struggled with this.</>,
  },
]

const ROWS_FII: WorkingRow[] = [
  {
    working: <><b>Limitation:</b> the titration measures <b>acid</b>, not ethanol. The ethanol <b>may not all be oxidised to ethanoic acid</b> — some may only be oxidised to <b>ethanal</b>, which is not acidic and is not detected — so the titre may not show the true rate of ethanol oxidation. Measuring the <b>concentration of ethanol</b> after two weeks would be more direct.</>,
    reason: <>Point 1 (one mark). A limitation questions whether the measurement really reflects the variable in the aim. Another accepted limitation: the beakers held different masses of wine, so they started with slightly different amounts of acid (though this accounts for only about 0.14 mL of titre — see below).</>,
  },
  {
    working: <><b>Explanation:</b> in wine the ethanol is oxidised by <b>bacteria</b> (using enzymes). A <b>higher ethanol concentration may inactivate the bacteria / denature their enzymes</b>, so less ethanol is oxidised to acid, giving the smaller titres in Beakers 3 and 4.</>,
    reason: <>Point 2 (one mark). An explanation accounts for <i>why</i> the results go against expectation. Supporting evidence: the acid already in the wine (9.45 × 10⁻⁴ M) alone would give a titre of 9.45 × 10⁻⁴ × 25.00 ÷ 0.0100 ≈ 2.36 mL — almost exactly the 2.6–2.7 mL titres of Beakers 3 and 4, so hardly any ethanol was oxidised there.</>,
  },
  {
    working: <>(Other accepted points: higher ethanol concentration may lower the <b>solubility of oxygen</b> in the wine, slowing oxidation; by <b>collision theory</b> the rate should have increased, so the result is unexpected; the <b>sudden drop</b> in titre between Beakers 2 and 3 doesn&rsquo;t match the even steps in ethanol added.)</>,
    reason: <>Any two different points from the report&rsquo;s list earn the two marks. Make each point a separate, complete sentence that refers to <b>this</b> experiment — the report&rsquo;s general comments single out Question 8, where many students struggled to come up with viable explanations for unexpected data. Only 6% scored a mark here and nobody scored both.</>,
  },
]

export default function ChemistryQ8_2022SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 8 (11 marks)</p>
        <p className="mb-3">A student wrote the following partial experimental report.</p>
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Experimental report</p>
        <div className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 flex flex-col gap-3">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Introduction</p>
            <p>
              Wine is made from grapes containing sugars that are fermented by bacteria to produce ethanol. If a
              bottle of wine is left open, the ethanol will oxidise.
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Aim</p>
            <p>
              To investigate how the oxidation rate of ethanol in white wine from a freshly opened bottle is
              affected by the concentration of ethanol in the wine
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Method</p>
            <p>
              Open a bottle of white wine and prepare samples in four beakers according to Part I below. Then,
              determine the acidity of the samples in each beaker after two weeks using the method described in
              Part II.
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Part I – Beaker preparation</p>
            <p>Prepare four different beakers.</p>
            <ol className="list-decimal pl-6 flex flex-col gap-0.5">
              <li>Put a clean and dry 250 mL beaker on a balance.</li>
              <li>Zero the balance and add 250.00 g of wine to the beaker.</li>
              <li>Remove the first beaker from the balance and put a second 250 mL beaker on the balance.</li>
              <li>Zero the balance and add 245.00 g of wine to the beaker.</li>
              <li>Zero the balance and add 5.00 g of pure ethanol to the beaker.</li>
              <li>Repeat steps 4 and 5 with different amounts of wine and ethanol for Beaker 3 and Beaker 4, as shown in Table 1.</li>
            </ol>
            <p className="font-semibold text-gray-900 dark:text-white mt-2 mb-1">Table 1</p>
            <div className="overflow-x-auto">
              <table className="text-[13.5px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
                <thead>
                  <tr>
                    <th className={head}></th>
                    <th className={head}>Mass of wine<br />added to beaker (g)</th>
                    <th className={head}>Mass of pure ethanol<br />added to beaker (g)</th>
                    <th className={head}>Total mass of<br />contents (g)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className={rowHead}>Beaker 1</td><td className={cell}>250.00</td><td className={cell}>0.00</td><td className={cell}>250.00</td></tr>
                  <tr><td className={rowHead}>Beaker 2</td><td className={cell}>245.00</td><td className={cell}>5.00</td><td className={cell}>250.00</td></tr>
                  <tr><td className={rowHead}>Beaker 3</td><td className={cell}>240.00</td><td className={cell}>10.00</td><td className={cell}>250.00</td></tr>
                  <tr><td className={rowHead}>Beaker 4</td><td className={cell}>235.00</td><td className={cell}>15.00</td><td className={cell}>250.00</td></tr>
                </tbody>
              </table>
            </div>
            <ol start={7} className="list-decimal pl-6 mt-2">
              <li>
                Cover each of the four beakers with a watch glass and leave the covered beakers on a bench in an
                unused corner of the laboratory for two weeks.
              </li>
            </ol>
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">Part II – Acid-base titration</p>
            <ol className="list-decimal pl-6 flex flex-col gap-0.5">
              <li>Rinse a clean and dry burette with a freshly standardised solution of 0.0100 M sodium hydroxide, NaOH.</li>
              <li>Fill the burette with more of the freshly standardised solution of NaOH.</li>
              <li>Flush about 5 mL of the NaOH through the burette and into a waste beaker to remove any air bubbles.</li>
              <li>Rinse a clean conical flask with distilled water.</li>
              <li>Rinse a 25.00 mL pipette using a small amount of the contents of Beaker 1.</li>
              <li>Use the rinsed pipette to transfer 25.00 mL of the contents of Beaker 1 to the rinsed conical flask.</li>
              <li>Add two drops of phenolphthalein indicator to the conical flask.</li>
              <li>Note the initial volume reading on the burette.</li>
              <li>
                Slowly add the NaOH from the burette to the conical flask, swirling to mix. As soon as the colour
                permanently changes, stop adding NaOH and note the final volume reading on the burette.
              </li>
              <li>Calculate the titre.</li>
              <li>Repeat steps 4 to 10 to obtain three concordant titres for Beaker 1. Refill the burette as necessary.</li>
              <li>Repeat steps 2 to 11 for Beaker 2, Beaker 3 and Beaker 4.</li>
            </ol>
          </div>
        </div>
      </div>

      <PartCard
        letter="a"
        topic="Precision"
        marks={1}
        statement={<>State how the precision of the experimental data will be affected by the acid-base titration method specified in Part II.</>}
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            <b>Precision</b> is about how closely repeated results agree. Look through the method for the step
            that controls repeat results: Step 11 demands <b>three concordant titres</b>. One mark, but it needs
            the effect (precise data) <i>and</i> the reason (consistent technique gives a small spread). Don&rsquo;t
            confuse precision with accuracy.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme
          source="ours"
          points={[
            { point: <>The data will be <b>precise</b>, justified: the method requires <b>concordant titres</b> obtained with <b>consistent technique</b>, giving a <b>minimal spread</b> in the data.</> },
          ]}
        />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-1">
          Immediately after the bottle was opened, an experienced and qualified laboratory technician analysed a
          sample of the wine and found that:
        </p>
        <ul className="list-disc pl-5 flex flex-col gap-0.5">
          <li>the wine contained 8.12% m/m ethanol</li>
          <li>the concentration of acid in the sample was 9.45 × 10⁻⁴ M (assuming a monoprotic acid).</li>
        </ul>
      </div>

      <PartCard
        letter="b"
        topic="Percentage by Mass"
        marks={3}
        statement={
          <>
            Use the laboratory technician&rsquo;s results and the information given in Table 1 above to calculate the
            initial ethanol concentration of the ethanol–wine mixture in Beaker 2 in % m/m.
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="How to Think About It">
          <p>
            Three marks, three steps: the ethanol <b>already in the wine</b>, plus the <b>pure ethanol added</b>,
            divided by the <b>total mass</b> of the mixture. Two thirds of students scored 0. Watch for the two easy slips: forgetting
            that the wine itself already contains ethanol, and dividing by 245.00 g instead of the 250.00 g total.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>Mass of ethanol in the wine: <b>245.00 × 0.0812 = 19.89 g</b>.</> },
            { point: <><b>Total mass of ethanol</b> in Beaker 2: <b>19.89 + 5.00 = 24.89 g</b>.</> },
            { point: <><b>% m/m = m(ethanol) ÷ m(solution) × 100 = 24.89 ÷ 250 × 100 = 9.96% m/m</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="c"
        topic="Independent Variable"
        marks={1}
        statement={<>What is the independent variable in the student&rsquo;s investigation?</>}
        examinerReport={EXAM_C}
      >
        <Background title="How to Think About It">
          <p>
            The independent variable is what the student <b>deliberately changes</b> between beakers. The aim
            states it outright (&ldquo;affected by the concentration of ethanol&rdquo;), and Table 1 shows it varying.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <MarkScheme
          source="vcaa"
          points={[{ point: <>Either the <b>concentration of ethanol in the beaker</b> or the <b>mass of ethanol added to the beaker</b>.</> }]}
        />
      </PartCard>

      <PartCard
        letter="d"
        topic="Titration Errors"
        marks={2}
        statement={
          <>
            At Step 5 of Part II above, the student mistakenly rinsed the pipette with distilled water instead of a
            small amount of the contents of the beaker.
            <br />
            Explain how this change would affect the student&rsquo;s calculated value for the concentration of a
            monoprotic acid in the sample.
          </>
        }
        examinerReport={EXAM_D}
      >
        <Background title="How to Think About It">
          <p>
            Follow the error through the chain: water in the pipette → <b>diluted aliquot</b> → fewer moles of acid
            → <b>smaller titre</b> → <b>lower calculated concentration</b>. Two marks: one for the effect on the
            titre (and why), one for the effect on the calculated value. Saying only &ldquo;it would be
            inaccurate&rdquo; earns nothing — state the direction.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <><b>Less NaOH</b> is needed to neutralise the aliquot because the acid was <b>diluted by the water</b> in the pipette.</> },
            { point: <>The titre is <b>smaller</b>, so the <b>calculated acidity is lower than the actual value</b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="e"
        topic="Oxidation of Alcohols"
        marks={1}
        statement={<>State why analysing the acidity of the wine in beakers 1, 2, 3 and 4 can be related to the oxidation of ethanol in the wine in each beaker.</>}
        examinerReport={EXAM_E}
      >
        <Background title="How to Think About It">
          <p>
            The experiment is meant to measure how much ethanol oxidised, but it measures <b>acid</b>. The link is
            the product: a primary alcohol oxidises to a <b>carboxylic acid</b>. Name that product — only 22% did.
          </p>
        </Background>
        <WorkingTable rows={ROWS_E} />
        <MarkScheme
          source="vcaa"
          points={[{ point: <>The <b>oxidation of ethanol produces a carboxylic acid (ethanoic acid)</b>, so the acidity shows how much ethanol has been oxidised.</> }]}
        />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="mb-2">The student obtained the following results.</p>
        <p className="font-semibold text-gray-900 dark:text-white mb-1">Table 2</p>
        <div className="overflow-x-auto">
          <table className="text-[13.5px] border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
            <thead>
              <tr>
                <th className={head}></th>
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <th key={n} className={head}>Titre {n}<br />(mL)</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['Beaker 1', '23.65', '24.54', '24.64', '24.59', '', ''],
                ['Beaker 2', '21.32', '24.55', '22.25', '21.25', '21.30', ''],
                ['Beaker 3', '3.55', '2.60', '4.45', '2.65', '2.58', ''],
                ['Beaker 4', '1.80', '2.45', '2.75', '2.65', '2.85', '2.72'],
              ].map(([b, ...t]) => (
                <tr key={b}>
                  <td className={rowHead}>{b}</td>
                  {t.map((v, i) => (
                    <td key={i} className={cell}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <PartCard
        letter="f.i"
        topic="Writing a Conclusion"
        marks={1}
        statement={<>Write a conclusion relating to the oxidation rate of ethanol, which is consistent with the student&rsquo;s results in Table 2.</>}
        examinerReport={EXAM_FI}
      >
        <Background title="How to Think About It">
          <p>
            A conclusion answers the <b>aim</b>: how does the oxidation rate change as the ethanol concentration
            changes? Read the trend from the concordant titres (bigger titre = more acid = more oxidation). The
            trap: the data show the <i>opposite</i> of what rate theory predicts, and the report says many students
            struggled with this — write what the <b>data</b> show.
          </p>
        </Background>
        <WorkingTable rows={ROWS_FI} />
        <MarkScheme
          source="vcaa"
          points={[{ point: <>As the <b>concentration of ethanol increases</b>, the <b>rate of oxidation decreases</b>.</> }]}
        />
      </PartCard>

      <PartCard
        letter="f.ii"
        topic="Limitations of Conclusion"
        marks={2}
        statement={
          <>
            Discuss your conclusion in relation to the white wine tested in this experiment. In your answer, make{' '}
            <b>two</b> points relating to <b>one or both</b> of the following:
            <ul className="list-disc pl-5 mt-1 flex flex-col gap-0.5">
              <li>the limitations of your conclusion</li>
              <li>an explanation for the student&rsquo;s findings</li>
            </ul>
          </>
        }
        examinerReport={EXAM_FII}
      >
        <Background title="How to Think About It">
          <p>
            Two marks means <b>two separate points</b>, each tied to this experiment. A <b>limitation</b> asks
            &ldquo;does the titre really measure ethanol oxidation?&rdquo; (it measures acid, and ethanol may stop at
            ethanal). An <b>explanation</b> asks &ldquo;why would more ethanol slow oxidation?&rdquo; (in an open bottle
            the ethanol is oxidised with the help of bacteria — high ethanol can inactivate them). The report&rsquo;s general comments say
            that, faced with these unexpected data, many students struggled to come up with viable explanations; 94% scored 0.
          </p>
        </Background>
        <WorkingTable rows={ROWS_FII} />
        <MarkScheme
          source="ours"
          points={[
            { point: <>A first valid point from the report&rsquo;s list, e.g. a <b>limitation</b>: the ethanol <b>may not all be oxidised to ethanoic acid</b> (some only to <b>ethanal</b>), so the acid titration may not reflect the oxidation; measuring the <b>ethanol concentration</b> would be better.</> },
            { point: <>A second, different point, e.g. an <b>explanation</b>: <b>higher ethanol concentrations may inactivate the bacteria / denature the enzymes</b> that oxidise the ethanol (or lower the <b>solubility of oxygen</b>), so oxidation is slower.</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
