// 2019 Chemistry Exam, MCQ 22. VCAA examination report: 30% correct. Which statement about
// conducting an experiment is most correct — testing understanding of precision, accuracy,
// validity and uncertainty. Question text transcribed from the original paper. Solution is
// original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 30, B: 12, C: 18, D: 40 },
  answer: 'A',
  comment: (
    <>
      Precise results may be biased because even though they are close together they may have been
      obtained from a preferred sample and not reflect the true characteristics of the substance
      under analysis.
      <br />
      Sensitive instruments should give more accurate measurements, but may be subject to random
      error associated with environmental fluctuations.
      <br />
      The method must be appropriate for the analysis to be valid.
      <br />
      Repeating a procedure using the same equipment will not remove the uncertainty associated with
      systematic errors. Systematic errors are consistent repeatable errors associated with faulty
      equipment or flaws in experimental method or design.
      <br />
      As well as significant issues with understanding of systematic errors, performance on this
      question suggests a lack of a common understanding of the best descriptions of precision,
      accuracy, uncertainty, validity, etc. as they apply to VCE Chemistry.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <><b>Precision</b> is about how close repeated measurements are to <i>each other</i>. <b>Accuracy</b> is about how close a result is to the <i>true</i> value.</>,
    reason: <>The distinction every option here turns on.</>,
  },
  {
    working: <>A: Precise results can still be biased — tightly clustered measurements can all be shifted away from the true value by a systematic error (e.g. a consistently faulty instrument, or an unrepresentative sample).</>,
    reason: <>Precision and accuracy are independent — this is exactly the kind of case that shows it. Correct.</>,
  },
  {
    working: <>B: Sensitive instruments alone don't guarantee accuracy — they can still be miscalibrated, and may even pick up more random error from environmental fluctuations.</>,
    reason: <>Ruled out — sensitivity is not the same thing as being correctly calibrated.</>,
  },
  {
    working: <>C: Validity is about whether the <i>method itself</i> actually measures what it's meant to and addresses the question being asked — controlling variables is one part of that, not the whole definition.</>,
    reason: <>Ruled out — too narrow a definition of validity.</>,
  },
  {
    working: <>D: Repeating a procedure with the <i>same</i> equipment reduces the effect of random error (improves precision), but does nothing about a systematic error baked into that equipment — a consistent error stays consistent no matter how many times you repeat it.</>,
    reason: <>Ruled out — repetition addresses random error, not systematic (uncertainty-causing) error.</>,
  },
  {
    working: <b>Only &ldquo;precise results may be biased&rdquo; holds up.</b>,
    reason: <>Matches option <b>A</b>. Option <b>D</b>, chosen by 40%, is the misconception the report singles out: repetition with the same equipment cannot remove the uncertainty that comes from systematic errors.</>,
  },
]

export default function ChemistryQ22_2019() {
  return (
    <MCQShell
      question={<p>Which one of the following statements about conducting an experiment is the <b>most</b> correct?</p>}
      options={[
        { letter: 'A', content: 'Precise results may be biased.', isAnswer: true },
        { letter: 'B', content: 'Accuracy is assured if sensitive instruments are used.' },
        { letter: 'C', content: 'A method is valid if it identifies all controlled variables.' },
        { letter: 'D', content: 'Repeating a procedure will remove the uncertainty of the results.' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
