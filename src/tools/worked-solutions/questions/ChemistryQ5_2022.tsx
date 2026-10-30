// 2022 Chemistry Exam, MCQ 5. VCAA examination report: 67% correct. Which attribute of
// experimental data improves when a trial is repeated more times with the same method and
// equipment — reliability (the old study design's term; today's study design calls this
// repeatability), not bias, validity or accuracy. Question text transcribed from the original
// paper. VCAA report only. Solution is original.

import { MCQShell } from '../MCQShell'
import { Background } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 1, B: 11, C: 20, D: 67 },
  answer: 'D',
  comment: (
    <>
      Bias in an experimental investigation would be related to situations where the method of
      investigation or interpretation of results is managed/influenced to produce preferred data.
      <br />
      The validity of an experimental investigation is related to the experimental method and how
      appropriate it is in addressing the aim of the investigation.
      <br />
      The accuracy of an experimental investigation refers to agreement between the outcome of an
      investigation and the true value.
      <br />
      None of these attributes (bias, validity or accuracy) is improved by repeating the
      investigation multiple times.
      <br />
      When an experiment is repeated multiple times using the same method and equipment each time
      with the same outcome, the investigation is shown to be reliable.
      <br />
      An investigation can be reliable without providing an accurate outcome, for example, if the
      experimental method was not valid.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Repeating a trial with the <b>same method and equipment</b> shows whether the results come out consistently — i.e. how <b>reliable</b> (in today&rsquo;s terms, <b>repeatable</b>) they are.</>,
    reason: <>More repeats give a better picture of the spread caused by random errors, and a mean of several results is more trustworthy than a single result.</>,
  },
  {
    working: <>Accuracy = closeness to the <b>true value</b>. A systematic error (a miscalibrated balance, a flawed method) shifts every repeat by the same amount, so repeating doesn&rsquo;t remove it.</>,
    reason: <>This is the key distinction: results can agree closely with each other and still all be wrong. As the report says, an investigation can be reliable without being accurate. Rules out <b>C</b>.</>,
  },
  {
    working: <>Validity = whether the method actually tests the aim (e.g. only one independent variable changed, everything else controlled). Repeating a flawed method just repeats the flaw.</>,
    reason: <>Validity is fixed by the design of the experiment, not by the number of trials. Rules out <b>B</b>.</>,
  },
  {
    working: <>Bias = the method or interpretation being influenced towards a preferred result. Repeats with the same method carry the same bias.</>,
    reason: <>Rules out <b>A</b>.</>,
  },
  {
    working: <b>Repeating trials improves reliability.</b>,
    reason: <>Matches option <b>D</b>. Option <b>C</b> (accuracy), the most popular wrong answer, confuses agreement between repeats with agreement with the true value; option <b>B</b> (validity) depends on the method&rsquo;s design, which repetition does not change.</>,
  },
]

export default function ChemistryQ5_2022() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">Scientists often repeat trials of an experiment using the same experimental method and the same equipment.</p>
          <p>Which one attribute of experimental data will be improved when there is an increase in the number of times that a trial is repeated?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'bias' },
        { letter: 'B', content: 'validity' },
        { letter: 'C', content: 'accuracy' },
        { letter: 'D', content: 'reliability', isAnswer: true },
      ]}
      background={
        <Background title="Old Study Design Terminology">
          <p>
            This question was set on the 2017–2023 study design, which used the word{' '}
            <b>reliability</b> for results that come out consistently when an experiment is repeated.
            The current study design no longer uses &lsquo;reliability&rsquo;; its glossary splits the
            idea into <b>repeatability</b> (same observer, method and instrument — exactly the
            situation in this question) and <b>reproducibility</b> (changed conditions), and says
            measurements should be repeated where possible to produce a measurement result.
          </p>
          <p>
            Read option D as &ldquo;repeatability&rdquo;. Bias, validity and accuracy mean the same
            now as they did in 2022.
          </p>
        </Background>
      }
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
