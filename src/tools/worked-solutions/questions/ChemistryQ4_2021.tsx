// 2021 Chemistry Exam, MCQ 4. VCAA examination report: 62% correct. Telling a systematic error
// (the same in every titration — a standard NaOH solution weaker than its stated concentration)
// from random errors and one-off mistakes in an acid–base titration. Question text transcribed
// from the original paper. VCAA report only. Solution is original; the numerical example in the
// working is this site's own illustration.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import { Background } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 13, B: 13, C: 11, D: 62 },
  answer: 'D',
  comment: (
    <>
      A systematic error is consistent for all the titrations.
      <br />
      The only consistent error is the difference between the actual and stated concentrations of
      NaOH solution.
      <br />
      The other three options were all random errors.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <><b>Systematic error</b>: the same size and direction in <b>every</b> titration, so every result is shifted the same way.</>,
    reason: <>Repeating the titration and averaging concordant titres reduces <b>random</b> error, but cannot detect or remove a systematic error — every titre carries it. So look for the option that affects all the titrations in the same way.</>,
  },
  {
    working: <>D — the stated <i>c</i>(NaOH) is used in every calculation, but the actual <i>c</i>(NaOH) is lower in every titration → the <b>same</b> error every time.</>,
    reason: <>A weaker NaOH solution means a larger titre is needed to neutralise the same amount of acid, yet the calculation multiplies that titre by the higher stated concentration. So <i>n</i>(NaOH), and hence <i>c</i>(acid), comes out too <b>high</b> in every titration.</>,
  },
  {
    working: <>For example: 25.00 mL of 0.0800 mol L⁻¹ acid; NaOH stated as 0.100 mol L⁻¹ but actually 0.0950 mol L⁻¹.<br /><Chem eq="CH3COOH(aq) + NaOH(aq) -> CH3COONa(aq) + H2O(l)" /></>,
    reason: <>An illustration of our own, with made-up concentrations, to show the error carried through the usual calculation. The equation shows ethanoic acid (<Chem eq="C2H4O2" />, written <Chem eq="CH3COOH" />) reacting with NaOH.</>,
  },
  {
    working: <><i>n</i>(acid) = <i>c</i> × <i>V</i><br /><i>n</i>(acid) = 0.0800 mol L⁻¹ × 0.02500 L<br /><i>n</i>(acid) = 2.000 × 10⁻³ mol</>,
    reason: <>The true amount of acid in each 25.00 mL aliquot.</>,
  },
  {
    working: <><i>n</i>(NaOH) : <i>n</i>(acid) = 1 : 1</>,
    reason: <>From the balanced equation: one NaOH neutralises one ethanoic acid molecule.</>,
  },
  {
    working: <><i>V</i>(NaOH) = <i>n</i> ÷ <i>c</i><br /><i>V</i>(NaOH) = 2.000 × 10⁻³ mol ÷ 0.0950 mol L⁻¹<br /><i>V</i>(NaOH) = 0.02105 L = 21.05 mL</>,
    reason: <>The titre actually delivered — set by the <b>actual</b> NaOH concentration.</>,
  },
  {
    working: <><i>n</i>(NaOH) calculated = 0.100 mol L⁻¹ × 0.02105 L = 2.105 × 10⁻³ mol<br /><i>c</i>(acid) calculated = 2.105 × 10⁻³ mol ÷ 0.02500 L = 0.0842 mol L⁻¹</>,
    reason: <>The student uses the <b>stated</b> 0.100 mol L⁻¹, so the result is 0.0842 mol L⁻¹ instead of the true 0.0800 mol L⁻¹. Every titration gives 21.05 mL, so the titres are perfectly concordant — and every one gives the same wrong 0.0842 mol L⁻¹. That is exactly what a systematic error looks like.</>,
  },
  {
    working: <>Check the other options:<br />A — a leak during <b>one</b> titration affects only that titre.<br />B — recording readings to the nearest 0.1 mL limits precision; the rounding goes up in some readings and down in others.<br />C — a varying number of indicator drops changes the end point by different amounts in different titrations.</>,
    reason: <>None of these shifts every result by the same amount in the same direction: they are random errors (or, for A, a one-off mistake — that titre would simply not be concordant and would be left out). Random errors scatter the results and are reduced by repeating to concordant titres.</>,
  },
  {
    working: <b>The NaOH solution being weaker than its stated concentration causes a systematic error.</b>,
    reason: <>Matches option <b>D</b>. Options <b>A</b>, <b>B</b> and <b>C</b> (13%, 13%, 11%) all describe errors that differ from one titration to the next — random errors, as the report says — rather than one that is consistent for all the titrations.</>,
  },
]

export default function ChemistryQ4_2021() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            A titration was performed to determine the concentration of an ethanoic acid,{' '}
            <Chem eq="C2H4O2" />, solution using the following procedure:
          </p>
          <ol className="list-decimal pl-6 mb-2 flex flex-col gap-0.5">
            <li>25.00 mL of the <Chem eq="C2H4O2" /> solution was pipetted into a conical flask.</li>
            <li>A few drops of indicator were added to the flask.</li>
            <li>A burette was filled with standard sodium hydroxide, NaOH, solution.</li>
            <li>The <Chem eq="C2H4O2" /> solution was then titrated with the NaOH solution.</li>
            <li>Steps 1–4 were repeated until three concordant titres were obtained.</li>
          </ol>
          <p>A systematic error could result if the</p>
        </>
      }
      options={[
        { letter: 'A', content: <>burette tap leaked during one of the titrations.</> },
        { letter: 'B', content: <>burette readings were recorded to the nearest 0.1 mL.</> },
        { letter: 'C', content: <>number of drops of indicator was not consistent for each titration.</> },
        { letter: 'D', content: <>actual concentration of the standard NaOH solution was lower than the stated concentration.</>, isAnswer: true },
      ]}
      background={
        <Background>
          <ul className="list-disc pl-5 flex flex-col gap-1">
            <li><b>Random error</b> — unpredictable variation that differs from one measurement to the next (sometimes high, sometimes low). It affects <b>precision</b> and is reduced by repeating and averaging.</li>
            <li><b>Systematic error</b> — a consistent error of the same size and direction in every measurement, usually from faulty equipment, a wrong calibration or a wrong reagent concentration. It affects <b>accuracy</b> and is <b>not</b> reduced by repeating.</li>
            <li><b>Mistake</b> (personal error) — a one-off slip such as a spill or a leak; the affected result is discarded rather than counted as an error.</li>
          </ul>
        </Background>
      }
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
