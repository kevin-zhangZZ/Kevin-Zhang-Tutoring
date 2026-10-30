// 2024 Chemistry Exam, Section B Question 4 (8 marks). The Haber process at 400 °C: writing the
// equilibrium constant in partial pressures (Kp), finding p(NH₃) from Kp, a change at constant
// temperature that makes Q < K and the system's response, and how the iron catalyst resolves the
// rate/temperature conflict with reference to a green chemistry principle. Question text
// transcribed from rendered pages of the original paper (it has no extractable text); there are no
// figures. Mark allocations for c and d are itemised in the VCAA examination report; a and b are
// 1-mark parts whose required answer the report prints. The worked solutions, "How to Think About
// It" notes and model answers are original (VCAA report only — no second source). Numbers checked
// in Python. The paper's "item 26.ii" (green chemistry principles) is item 24.ii in the 2026 Data
// Book, wording unchanged — a Data Book note says so.

import Katex from '../../../components/Katex'
import Chem from '../Chem'
import { Background, DataBookNote, MarkScheme, PartCard, WorkingTable, type SAExaminerStats, type WorkingRow } from '../QuestionParts'

const KP_EXPR = String.raw`K_\text{p} = \dfrac{\left(p_{\text{NH}_3}\right)^2}{p_{\text{N}_2} \times \left(p_{\text{H}_2}\right)^3}`

const EXAM_A: SAExaminerStats = {
  marks: [14, 86],
  average: 0.9,
  comment: (
    <>
      The correct response required by students was:
      <br />
      <Katex tex={String.raw`K_\text{p} = \dfrac{{\text{P}_{\text{NH}_3}}^{2}}{\text{P}_{\text{N}_2} \text{ x } {\text{P}_{\text{H}_2}}^{3}}`} display />
      However, given the nature of this question being novel, and the lack of familiarity of students with this
      expression, a correct representation of the relevant product and reactant concentrations was also accepted
      for this examination.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [66, 34],
  average: 0.4,
  comment: (
    <>
      Students needed to calculate the correct value for the partial pressure.
      <br />
      <Katex tex={String.raw`1.60 \times 10^{-8} = \dfrac{{\text{P}_{\text{NH}_3}}^{2}}{43.4 \times 88.7^{3}}`} /> therefore P<sub>NH₃</sub> = 0.696 kPa
      <br />
      This question was not well answered, even when the correct representation was used.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [33, 38, 16, 13],
  average: 1.1,
  comment: (
    <>
      The first mark was awarded for any one of the following three valid stresses that caused <i>Q</i> ≠ <i>K</i>:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>removal of product / addition of reactant / reduction in volume (increase in all partial pressures).</li>
      </ul>
      The second mark was awarded for the correct identification of the forward shift in the equilibrium.
      <br />
      The third mark was awarded for a description of how this shift applied to either:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>the partial changes in quantities associated with the stress</li>
        <li>restoring the equilibrium so that <i>Q</i> = <i>K</i>.</li>
      </ul>
      Some responses did not gain full marks as they failed to provide sufficiently specific responses that linked
      directly to the stress they had selected.
      <br />
      Attempts to provide a response based on temperature change could not be accepted as the stem of the
      question emphasised that the process occurred at a constant temperature. Students are reminded to fully
      read the stem of each question.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [23, 41, 18, 18],
  average: 1.3,
  comment: (
    <>
      The first mark was awarded for a clear identification of what the term &lsquo;conflict&rsquo; related to in terms of the
      optimal rate and temperature when ammonia is being produced. A good example showing detailed
      understanding of this conflict could have been:
      <p className="italic pl-4 my-1">
        Due to the exothermic nature of the equilibrium, at high temperature the rate of formation of ammonia is
        high but the yield will be low, whereas at low temperature the rate of formation of ammonia is too slow but
        the yield is very high.
      </p>
      The second mark was awarded for a clear statement that linked the presence of the catalyst to allowing a
      sufficiently fast rate to be occurring at a lower temperature, and hence reducing energy requirements.
      <br />
      The third mark was awarded for a clear statement that linked the lower temperature requirements with the
      green chemistry principle of &lsquo;catalysis&rsquo;, which states that &lsquo;Catalysts … using less energy and reagents in
      reaction processes/pathways&rsquo;. Therefore, a student needed to show reasoning for this choice based on
      linking the lower temperature to this concept.
      <br />
      Most responses effectively linked the green chemistry principle to this issue, but often did not fully identify the
      &lsquo;conflict&rsquo; that was asked for in the stem of the question.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <><Chem eq="N2(g) + 3H2(g) <=> 2NH3(g)" /></>,
    reason: <>Start from the balanced equation: products go on top, reactants underneath, and each <b>coefficient becomes a power</b>.</>,
  },
  {
    working: <b><Katex tex={KP_EXPR} /></b>,
    reason: (
      <>
        <i>K</i><sub>p</sub> is the same as the <i>K</i><sub>c</sub> you know, except each gas is measured by its{' '}
        <b>partial pressure</b> (<i>p</i>, in kPa) instead of its concentration in mol L⁻¹. NH₃ has coefficient 2, so it is{' '}
        <b>squared</b>; H₂ has coefficient 3, so it is <b>cubed</b>. The report also accepted the expression written with
        concentrations, [NH₃]² / ([N₂][H₂]³), because <i>K</i><sub>p</sub> was new to students.
      </>
    ),
  },
  {
    working: <>Units check: kPa² ÷ (kPa × kPa³) = kPa⁻²</>,
    reason: <>This matches the units the stem gives for <i>K</i><sub>p</sub> (kPa⁻²) — a quick way to confirm the powers are right.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex tex={KP_EXPR} />,
    reason: <>The expression from part a. The mixture is <b>at equilibrium</b>, so the pressures given satisfy it exactly.</>,
  },
  {
    working: <Katex tex={String.raw`\left(p_{\text{NH}_3}\right)^2 = K_\text{p} \times p_{\text{N}_2} \times \left(p_{\text{H}_2}\right)^3`} />,
    reason: <>Rearrange first, before putting numbers in: multiply both sides by the denominator.</>,
  },
  {
    working: <Katex tex={String.raw`\left(p_{\text{NH}_3}\right)^2 = 1.60 \times 10^{-8}\ \text{kPa}^{-2} \times 43.4\ \text{kPa} \times (88.7\ \text{kPa})^3`} />,
    reason: <>Substitute. Remember to <b>cube</b> 88.7 — (88.7)³ = 697 864.1… kPa³ — and multiply by 43.4 kPa: the denominator is 3.0287… × 10⁷ kPa⁴.</>,
  },
  {
    working: <Katex tex={String.raw`\left(p_{\text{NH}_3}\right)^2 = 0.48459\ldots\ \text{kPa}^2`} />,
    reason: <>The units are kPa⁻² × kPa⁴ = kPa². This is <i>p</i>² — not the answer yet.</>,
  },
  {
    working: <Katex tex={String.raw`p_{\text{NH}_3} = \sqrt{0.48459\ldots}\ \text{kPa}`} />,
    reason: <>Take the <b>square root</b>, because NH₃ was squared in the expression. Forgetting this step gives 0.485 kPa.</>,
  },
  {
    working: <b>p(NH₃) = 0.696 kPa</b>,
    reason: (
      <>
        (0.69613… unrounded.) Three significant figures, because 1.60 × 10⁻⁸, 43.4 and 88.7 each have three. Check: 0.696² ÷
        (43.4 × 88.7³) = 1.60 × 10⁻⁸ ✓. A small value makes sense: <i>K</i><sub>p</sub> is tiny, so at 400&nbsp;°C the equilibrium
        lies well to the left.
      </>
    ),
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <><i>Q</i> = 1.20 × 10⁻⁹ kPa⁻² &lt; <i>K</i><sub>p</sub> = 1.60 × 10⁻⁸ kPa⁻²</>,
    reason: (
      <>
        Compare first. The temperature is <b>constant</b>, so <i>K</i> has not changed — only <i>Q</i> has. <i>Q</i> has
        dropped to 0.075 of <i>K</i>, so the change must have made the top of the fraction (NH₃) smaller or the bottom (N₂, H₂)
        bigger.
      </>
    ),
  },
  {
    working: <>The change: some <b>NH₃ was removed</b> from the equilibrium mixture (its partial pressure was decreased).</>,
    reason: (
      <>
        Mark 1: a stress that makes <i>Q</i> &lt; <i>K</i>. Removing product lowers the numerator, so <i>Q</i> falls. (For a check:
        p(NH₃) is squared in <i>Q</i>, so to make <i>Q</i> = 0.075 <i>K</i> with N₂ and H₂ unchanged, p(NH₃) must fall by a
        factor of √0.075 = 0.274, from 0.696 to 0.191 kPa.) Also accepted: <b>adding N₂ or H₂</b> (raises the denominator), or{' '}
        <b>decreasing the volume</b>, which raises every partial pressure — the denominator has four powers of pressure and
        the numerator only two, so <i>Q</i> falls. (Here <i>Q</i> is proportional to <i>V</i>², so the volume would be cut to
        √0.075 ≈ 27% of the original.) A
        temperature change could not be accepted — the stem says <b>constant temperature</b>.
      </>
    ),
  },
  {
    working: <>Because <i>Q</i> &lt; <i>K</i>, the system responds by a <b>net forward reaction</b> — the equilibrium <b>shifts to the right</b> (towards NH₃).</>,
    reason: <>Mark 2: the direction. When <i>Q</i> &lt; <i>K</i> there is &ldquo;too little product&rdquo;, so the forward reaction is favoured.</>,
  },
  {
    working: (
      <>
        N₂ and H₂ react to form more NH₃, so the partial pressure of NH₃ <b>increases</b> (it <b>partially replaces</b> the NH₃
        removed) while the partial pressures of N₂ and H₂ <b>decrease</b>, until <b><i>Q</i> = <i>K</i></b> again and a new
        equilibrium is reached.
      </>
    ),
    reason: (
      <>
        Mark 3: describe the shift <b>for the stress you chose</b> — the report says some responses did not gain full marks because they were not specific enough to the stress chosen. Name
        what happens to each gas and say it stops when <i>Q</i> = <i>K</i>. (For a volume decrease you would instead say the
        system shifts forward because that side has fewer gas particles, 2 mol compared with 4 mol, partially reducing the
        total pressure.)
      </>
    ),
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: (
      <>
        The conflict: the forward reaction is <b>exothermic</b> (ΔH = −92.3 kJ), so a <b>low temperature</b> gives a{' '}
        <b>high equilibrium yield</b> of NH₃ but a <b>rate that is too slow</b>; a <b>high temperature</b> gives a{' '}
        <b>fast rate</b> but a <b>low yield</b>.
      </>
    ),
    reason: (
      <>
        Mark 1: state <b>both sides</b> of the conflict. Rate always increases with temperature (more collisions with energy
        ≥ <i>E</i><sub>a</sub>), but for an exothermic reaction a higher temperature shifts the equilibrium left. The report
        says responses often did not fully identify this conflict.
      </>
    ),
  },
  {
    working: (
      <>
        The iron catalyst provides an <b>alternative reaction pathway with a lower activation energy</b>, so a{' '}
        <b>sufficiently fast rate</b> is achieved at a <b>lower temperature</b>. This means <b>less energy is needed</b> to
        heat the reactants, and the lower temperature also gives a better yield.
      </>
    ),
    reason: (
      <>
        Mark 2: link the catalyst to a <b>fast rate at a lower temperature</b> and so to <b>lower energy requirements</b>. A
        catalyst does not change the equilibrium yield itself — it lets the plant run at a temperature where the yield is
        better without the rate becoming too slow.
      </>
    ),
  },
  {
    working: (
      <>
        This supports the green chemistry principle of <b>catalysis</b>: catalysts should be selected to generate the same
        desired product(s) <b>with less waste and using less energy</b> and reagents. Running at a lower temperature uses less energy, which
        is exactly what this principle asks for.
      </>
    ),
    reason: (
      <>
        Mark 3: name <b>one</b> principle and <b>link it to the lower temperature</b> — naming it alone is not enough. The
        principle the report credits is &lsquo;catalysis&rsquo;.
        <DataBookNote>the paper&rsquo;s &ldquo;item 26.ii&rdquo; (green chemistry principles) is item 24.ii in the 2026 Data Book; the wording of the catalysis principle is unchanged.</DataBookNote>
      </>
    ),
  },
]

export default function ChemistryQ4_2024SA() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 4 (8 marks)</p>
        <p className="mb-2">
          Ammonia gas, NH₃(g), can be made by reacting a mixture of nitrogen gas, N₂(g), and hydrogen gas, H₂(g), using an
          iron catalyst.
        </p>
        <p className="mb-2">The reaction can be represented by the equation</p>
        <p className="mb-3 pl-6">
          <Chem eq="N2(g) + 3H2(g) <=> 2NH3(g)" />
          <span className="ml-8">Δ<i>H</i> = −92.3 kJ</span>
        </p>
        <p className="mb-2">
          The equilibrium constant, <i>K</i><sub>p</sub>, at 400 °C is 1.60 × 10<sup>−8</sup> kPa<sup>−2</sup>.
        </p>
        <p>
          In a mixture that is at equilibrium at 400 °C, the partial pressure of H₂ is 88.7 kPa and the partial pressure of
          N₂ is 43.4 kPa.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Equilibrium Expression"
        marks={1}
        statement={<>Write the expression for the equilibrium constant, <i>K</i><sub>p</sub>.</>}
        examinerReport={EXAM_A}
      >
        <Background title="How to Think About It">
          <p>
            <i>K</i><sub>p</sub> is new, but it follows the same equilibrium law as <i>K</i><sub>c</sub>: products over
            reactants, each raised to the power of its coefficient. The only difference is that gases are measured by{' '}
            <b>partial pressure</b> rather than concentration — the kPa⁻² units in the stem are the clue.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <MarkScheme
          source="vcaa"
          points={[
            {
              point: (
                <>
                  <Katex tex={KP_EXPR} /> — <b>p(NH₃) squared</b> over <b>p(N₂) × p(H₂) cubed</b> (the same expression in
                  concentrations was also accepted for this exam).
                </>
              ),
            },
          ]}
        />
      </PartCard>

      <PartCard
        letter="b"
        topic="Partial Pressure"
        marks={1}
        statement={<>Determine the partial pressure of NH₃, in kPa, in the equilibrium mixture at 400 °C.</>}
        examinerReport={EXAM_B}
      >
        <Background title="How to Think About It">
          <p>
            This is &ldquo;find the missing equilibrium value&rdquo;: you know <i>K</i><sub>p</sub> and two of the three
            pressures, so substitute into part a&rsquo;s expression and solve for the third. The report says this was not well
            answered even by students with the right expression, so the slips are in the algebra — cube 88.7, and take the{' '}
            <b>square root</b> at the end because NH₃ is squared.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <MarkScheme
          source="vcaa"
          points={[{ point: <>Correct <b>p(NH₃) = √(1.60 × 10⁻⁸ × 43.4 × 88.7³) = 0.696 kPa</b>.</> }]}
        />
      </PartCard>

      <PartCard
        letter="c"
        topic="Reaction Quotient"
        marks={3}
        statement={
          <>
            At a <b>constant temperature</b> of 400 °C, a change was made to the equilibrium system. Just after the change was
            made, the reaction quotient, <i>Q</i>, was 1.20 × 10<sup>−9</sup> kPa<sup>−2</sup>.
            <br />
            Identify a change to the system that would result in this reaction quotient. Explain how the system would respond
            to the change.
          </>
        }
        examinerReport={EXAM_C}
      >
        <Background title="How to Think About It">
          <p>
            Compare <i>Q</i> with <i>K</i>: 1.20 × 10⁻⁹ is <b>smaller</b> than 1.60 × 10⁻⁸, so the change lowered <i>Q</i> and
            the system will react <b>forwards</b> to raise it again. Three marks, three ideas: a change that lowers <i>Q</i>,
            the forward shift, and what that shift does to the gases until <i>Q</i> = <i>K</i>. The traps the report names:
            choosing a temperature change (ruled out by &ldquo;constant temperature&rdquo;, which also tells you <i>K</i> is
            fixed), and an explanation too general to match the change you picked.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>A valid stress that makes <b><i>Q</i> &lt; <i>K</i></b>: <b>removal of NH₃</b>, <b>addition of N₂ or H₂</b>, or a <b>decrease in volume</b> (all partial pressures increase).</> },
            { point: <>The equilibrium <b>shifts forward</b> (net forward reaction).</> },
            { point: <>How the shift applies to the chosen stress: the <b>partial changes</b> in the gases (e.g. <b>p(NH₃) partially restored</b>, p(N₂) and p(H₂) decrease), or that it continues until <b><i>Q</i> = <i>K</i></b>.</> },
          ]}
        />
      </PartCard>

      <PartCard
        letter="d"
        topic="Catalysis and Green Chemistry"
        marks={3}
        statement={
          <>
            Explain how the iron catalyst addresses the conflict between optimal rate and temperature considerations in the
            production of NH₃. Support your answer with reference to <b>one</b> green chemistry principle. Refer to{' '}
            <b>item 26.ii</b> of the Data Book.
          </>
        }
        examinerReport={EXAM_D}
      >
        <Background title="How to Think About It">
          <p>
            Three marks, three ideas in order: (1) spell out the <b>conflict</b> — exothermic, so low temperature means high
            yield but slow rate, high temperature means fast rate but low yield; (2) what the <b>catalyst</b> does about it — a
            fast enough rate at a lower temperature, so less energy is used; (3) link that lower energy use to the green
            chemistry principle of <b>catalysis</b>. The report says most responses made the green chemistry link but often did not
            fully state the conflict — so write both halves of it.
          </p>
        </Background>
        <WorkingTable rows={ROWS_D} />
        <MarkScheme
          source="vcaa"
          points={[
            { point: <>The <b>conflict</b>: reaction is <b>exothermic</b>, so <b>high temperature → fast rate but low yield</b>; <b>low temperature → high yield but rate too slow</b>.</> },
            { point: <>The catalyst allows a <b>sufficiently fast rate at a lower temperature</b>, hence <b>reducing energy requirements</b>.</> },
            { point: <>Links the lower temperature to the green chemistry principle of <b>catalysis</b> — catalysts <b>using less energy</b> (and reagents).</> },
          ]}
        />
      </PartCard>
    </div>
  )
}
