// 2024 Chemistry Exam, MCQ 30. VCAA examination report: 81% correct. Sorting three statements
// from a titration investigation into the method, results and discussion sections of a
// scientific poster. Question text transcribed from the original paper (rendered from page
// images — the 2024 exam PDF has no extractable text); the options table is written out as
// "I: … · II: … · III: …". VCAA report only. Solution is original.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 1, B: 15, C: 81, D: 3 },
  answer: 'C',
  comment: (
    <>
      The correct response is C. Some students appeared to be challenged in classifying
      Statements II and III in particular.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <b>Methodology and methods</b>: what was done and how the data were generated.
        <br />
        <b>Results</b>: the data themselves, presented in tables and graphs.
        <br />
        <b>Discussion</b>: interpreting and evaluating the results — comparing them with expected
        values or claims, limitations, improvements.
      </>
    ),
    reason: <>These are the study design&rsquo;s descriptions of the poster sections. The test for each statement: is it <i>how</i> the data were obtained, the data <i>themselves</i>, or what the data <i>mean</i>?</>,
  },
  {
    working: <>I &ldquo;A 50 mL solution of 0.1 M HCl was placed in a conical flask.&rdquo; → <b>method</b></>,
    reason: <>It describes a step of the procedure — what Salim did — not a measurement he obtained.</>,
  },
  {
    working: <>II &ldquo;The average concentration is within the range claimed by the manufacturer.&rdquo; → <b>discussion</b></>,
    reason: <>The average concentration is a result, but this statement <b>compares</b> it with the manufacturer&rsquo;s claim and draws a judgement from it. Interpreting a result against an external value is discussion.</>,
  },
  {
    working: <>III &ldquo;The table shows the titres from the titration.&rdquo; → <b>results</b></>,
    reason: <>A table of titres is the generated data, presented without interpretation — exactly what the results section holds.</>,
  },
  {
    working: <b>I: method · II: discussion · III: results</b>,
    reason: (
      <>
        Matches option <b>C</b>. Option <b>B</b> (15%) swaps II and III — it treats the comparison with
        the manufacturer&rsquo;s claim as a result and the data table as discussion, the two
        statements the report says students found hardest to classify. Options <b>A</b> and <b>D</b>{' '}
        put statement I, a procedural step, in the results.
      </>
    ),
  },
]

export default function ChemistryQ30_2024() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Salim is writing a scientific poster to report on his laboratory analysis of a compound.</p>
          <p className="mb-2">Consider the following three statements.</p>
          <div className="mb-3 grid grid-cols-[2.2rem_1fr] gap-y-1 pl-2">
            <span>I</span><span>A 50 mL solution of 0.1 M HCl was placed in a conical flask.</span>
            <span>II</span><span>The average concentration is within the range claimed by the manufacturer.</span>
            <span>III</span><span>The table shows the titres from the titration.</span>
          </div>
          <p>Which section of the poster should include these statements?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'I: results · II: results · III: discussion' },
        { letter: 'B', content: 'I: method · II: results · III: discussion' },
        { letter: 'C', content: 'I: method · II: discussion · III: results', isAnswer: true },
        { letter: 'D', content: 'I: results · II: discussion · III: results' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
