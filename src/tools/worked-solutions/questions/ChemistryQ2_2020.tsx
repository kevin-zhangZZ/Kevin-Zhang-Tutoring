// 2020 Chemistry Exam, MCQ 2. VCAA examination report: 48% correct. What a larger sample size
// improves in an experiment — reliability (the old study design's term), not precision, validity
// or uncertainty. Question text transcribed from the original paper. VCAA report only. The report's
// comment on option B concedes that a larger sample size can improve precision; this is
// explained in the working. Solution is original.

import { MCQShell } from '../MCQShell'
import { Background } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 48, B: 19, C: 23, D: 10 },
  answer: 'A',
  noAnswer: 0,
  comment: (
    <>
      Option A: Correct.
      <br />
      Sufficiently large sample sizes are essential for a reliable measurement result (usually the
      mean of a set of values) since repetition and/or replication can demonstrate that individual
      measurements are consistent within an acceptable range. If the mean is taken for only a small
      number of measured values, it will be found to be less consistent than if a larger sample is
      taken.
      <br />
      Option B: Incorrect. Precision refers to the closeness of agreement between measured values
      obtained by repeated measurements. It cannot be ascertained without having several
      measurements, so precision is improved by a larger sample size. Repeated measurements,
      however, may not appear to improve precision in special cases:
      <ul className="list-disc pl-5 flex flex-col gap-1">
        <li>
          When the repeated measured values give the same value (due to the limitations of the
          instrument, in which case precision can only be known from calibration properties of the
          instrument.
        </li>
        <li>
          When a large number of measurement values have already been taken and increasing the
          number does not make a significant difference to the spread of values.
        </li>
      </ul>
      Option C: Incorrect. A measurement is &lsquo;valid&rsquo; if it measures what it is supposed to
      be measuring and depends on both procedure and instrument. Validity may therefore not be
      affected by increasing the sample size due to a consistent flaw in the method or equipment
      used.
      <br />
      Option D: Incorrect. Uncertainty depends on both systematic and random errors. A larger sample
      size will reduce the contribution of random errors while systematic errors are not influenced
      by sample size; hence a larger sample size cannot increase the uncertainty.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>A larger sample = more repeated measurements, so the <b>mean</b> (the measurement result) is less affected by <b>random errors</b>.</>,
    reason: <>Random errors scatter individual values above and below the true value. Averaging many values lets the highs and lows cancel, so the mean barely changes if the experiment is done again — the result is <b>consistent</b>. A mean of two or three values can be pulled well off by one unlucky reading.</>,
  },
  {
    working: <>A: a result that comes out the same when repeated is <b>reliable</b> — so a large sample increases reliability.</>,
    reason: <>This is exactly what the report&rsquo;s comment on A says: repetition shows the individual measurements are consistent within an acceptable range. (Today&rsquo;s study design calls this <b>repeatability</b>/<b>reproducibility</b> — see the note above.)</>,
  },
  {
    working: <>B: precision = how close the individual measured values are to <b>each other</b>.</>,
    reason: <>You need several measurements before you can judge precision at all, and the report&rsquo;s comment on B does say &ldquo;precision is improved by a larger sample size&rdquo; — but it then lists cases where it is not: an instrument too coarse to show any spread (every reading the same), or a sample already large enough that more values don&rsquo;t change the spread. So B holds only sometimes, whereas A always holds — and the instructions ask for the response that <b>best</b> answers the question.</>,
  },
  {
    working: <>C: validity = whether the experiment measures what it is meant to measure.</>,
    reason: <>A flaw in the method or equipment (a <b>systematic</b> error, or measuring the wrong variable) is repeated in every measurement, so repeating it more times does not make the experiment any more valid.</>,
  },
  {
    working: <>D: more measurements reduce the random-error part of the uncertainty and leave the systematic part unchanged.</>,
    reason: <>So a larger sample can only lower the uncertainty (or leave it the same) — never increase it. D has the direction backwards.</>,
  },
  {
    working: <b>Using large sample sizes increases reliability.</b>,
    reason: <>Matches option <b>A</b>. Option <b>C</b> (23%) confuses validity with reliability — a larger sample cannot fix a flawed method. Option <b>B</b> (19%) is not always true, as the report explains above. Option <b>D</b> reverses the effect: a larger sample reduces uncertainty.</>,
  },
]

export default function ChemistryQ2_2020() {
  return (
    <MCQShell
      question={<p>Using large sample sizes in an experiment increases</p>}
      options={[
        { letter: 'A', content: <>reliability.</>, isAnswer: true },
        { letter: 'B', content: <>precision.</> },
        { letter: 'C', content: <>validity.</> },
        { letter: 'D', content: <>uncertainty.</> },
      ]}
      background={
        <Background title="Old Study Design Terminology">
          <p>
            This question was set on the 2017–2023 study design, which used the word{' '}
            <b>reliability</b> for results that come out consistently when an experiment is repeated.
            The current study design no longer uses &lsquo;reliability&rsquo;; its glossary splits the
            idea into <b>repeatability</b> (same observer, method and instrument) and{' '}
            <b>reproducibility</b> (changed conditions), and notes that experiments with small sample
            sizes may give results that are not repeatable or reproducible.
          </p>
          <p>
            Read option A as &ldquo;repeatability&rdquo;: a larger sample makes the measurement result
            more repeatable. The other three terms — precision, validity and uncertainty — mean the
            same now as they did in 2020.
          </p>
        </Background>
      }
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
