// 2020 Chemistry Exam, MCQ 11. VCAA examination report: 56% correct. Classifying fuels as fossil
// fuels or biofuels by where they come from (their source), not by their environmental impact or
// their combustion products. Question text transcribed from the original paper. VCAA report only.
// Solution is original.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import { Background } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 6, B: 22, C: 56, D: 16 },
  answer: 'C',
  noAnswer: 0,
  comment: (
    <>
      Option A: Incorrect. A biofuel is a fuel produced from biomass that was alive in the recent
      past. Fossil fuels such as crude oil are produced by very slow geological processes.
      <br />
      Option B: Incorrect. Biofuels can also have significant environmental impact, e.g. use of
      land needed for food production to produce biofuel.
      <br />
      Methane processed from biomass has the same environmental impact in that it is a greenhouse
      gas and produces CO<sub>2</sub> on combustion.
      <br />
      Option C: Correct. Ethene (CH<sub>2</sub>=CH<sub>2</sub>), used to produce ethanol (by
      reaction with steam in the presence of an acid catalyst), is obtained from crude oil.
      <br />
      Option D: Incorrect. Hydrogen can also be obtained from coal – a fossil fuel. This hydrogen
      also does not produce CO<sub>2</sub> on combustion.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>A fuel is classified by its <b>source</b>: a <b>fossil fuel</b> comes from the remains of organisms buried millions of years ago (coal, crude oil, natural gas) and is non-renewable; a <b>biofuel</b> is made from <b>recently living biomass</b> (biogas, bioethanol, biodiesel) and is renewable.</>,
    reason: (
      <>
        The question turns on this definition. Every option gives a <i>reason</i> for a
        classification — check whether that reason is about the fuel&rsquo;s origin.
        <Background title="Why environmental impact doesn't decide the category">
          The same compound can be either kind of fuel. Methane from a gas field is a fossil fuel
          (natural gas); methane from rotting waste in a digester is a biofuel (biogas). Ethanol
          from fermenting sugar cane is bioethanol; ethanol made from ethene cracked out of crude
          oil is fossil-derived. Both versions of each burn identically and release the same
          CO<sub>2</sub> — only the source differs.
        </Background>
      </>
    ),
  },
  {
    working: <>A: crude oil formed from ancient marine organisms over millions of years, so it is a <b>fossil fuel</b>, not a biofuel.</>,
    reason: <>&ldquo;Originally comes from plants&rdquo; is true of every fossil fuel — what makes a biofuel is that the biomass was alive <i>recently</i>. ✗</>,
  },
  {
    working: <>B: &ldquo;major environmental impacts&rdquo; is not the definition of a fossil fuel.</>,
    reason: <>Biomethane (biogas) has the same impacts — <Chem eq="CH4" /> is a greenhouse gas and its combustion gives <Chem eq="CO2" /> — yet it is a biofuel. Impact doesn&rsquo;t decide the category. ✗</>,
  },
  {
    working: (
      <>
        C: crude oil → (cracking) ethene → ethanol:
        <br />
        <Chem eq="CH2=CH2(g) + H2O(g) -> CH3CH2OH(g)" /> &nbsp;(acid catalyst)
      </>
    ),
    reason: <>Ethanol made this way has a fossil source (crude oil, non-renewable), so it can be classified as a fossil fuel. The statement&rsquo;s reason is about origin, which is the right criterion. ✓</>,
  },
  {
    working: <>D: whether H<sub>2</sub> is a fossil fuel or a biofuel depends on how it was made — most hydrogen today is made from fossil sources (natural gas, coal), not from biomass.</>,
    reason: <>&ldquo;Does not produce <Chem eq="CO2" /> when it combusts&rdquo; describes the combustion product, not the source, so it can&rsquo;t make H<sub>2</sub> a biofuel. Hydrogen from coal produces no <Chem eq="CO2" /> when burnt either, yet its source is a fossil fuel. ✗</>,
  },
  {
    working: <b>C — ethanol produced from crude oil comes from a fossil source.</b>,
    reason: <>Matches option <b>C</b>. Option <b>B</b> (22%) classifies by environmental impact and option <b>D</b> (16%) by combustion products — neither is about where the fuel comes from. Option <b>A</b> misses that fossil fuels also began as living organisms, just millions of years ago.</>,
  },
]

export default function ChemistryQ11_2020() {
  return (
    <MCQShell
      question={<p>Which one of the following statements is correct?</p>}
      options={[
        { letter: 'A', content: 'Crude oil can be classified as a biofuel because it originally comes from plants.' },
        { letter: 'B', content: <>Methane, CH<sub>4</sub>, can be classified as a fossil fuel because it has major environmental impacts.</> },
        { letter: 'C', content: <>Ethanol, CH<sub>3</sub>CH<sub>2</sub>OH, can be classified as a fossil fuel because it can be produced from crude oil.</>, isAnswer: true },
        { letter: 'D', content: <>Hydrogen, H<sub>2</sub>, can be classified as a biofuel because, when it combusts, it does not produce carbon dioxide, CO<sub>2</sub>.</> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
