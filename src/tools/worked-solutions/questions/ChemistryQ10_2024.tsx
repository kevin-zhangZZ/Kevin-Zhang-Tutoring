// 2024 Chemistry Exam, MCQ 10 — BONUS: a VCAA-flagged question with no single correct answer.
// VCAA's report gives only "As a result of psychometric analysis and review, all four options
// were accepted as correct" — no further reasoning. Question text transcribed from the original
// paper (rendered from page images — the 2024 exam PDF has no extractable text). The reasoning
// below for why each of I and II is genuinely arguable both ways is original analysis, not VCAA's
// own — flagged clearly as such since VCAA gave no published explanation for this one.

import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 20, B: 35, C: 5, D: 40 },
  answer: ['A', 'B', 'C', 'D'],
  flawed: (
    <>
      VCAA's report gives no reasoning for this one beyond: "As a result of psychometric
      analysis and review, all four options were accepted as correct." Unlike most flagged
      questions, VCAA didn't publish an explanation of what went wrong — the analysis in the
      Worked Solution tab is this site's own attempt to reconstruct why both statements turned
      out to be genuinely arguable, clearly marked as independent reasoning rather than VCAA's
      own words.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Two independent statements are being judged, so there are 4 possible combinations of true/false — matching the 4 options (I only, II only, both, neither). For VCAA to accept all four, <i>both</i> statements must have been genuinely arguable either way, not just one.</>,
    reason: "The structure of the question means it can only fall apart if there's real ambiguity in both I and II, not just one of them.",
  },
  {
    working: <>Statement I: "Bioethanol fuel is sustainable because it results in no net release of carbon dioxide into the atmosphere." The standard VCE-taught argument is that CO₂ released burning bioethanol was previously absorbed by the sugar cane during photosynthesis, making combustion "carbon neutral" — supporting I as true.</>,
    reason: 'This is the textbook simple model, and the one most students would have been taught to apply directly.',
  },
  {
    working: <>But a more complete life-cycle view complicates this: growing, harvesting, transporting and processing sugar cane typically uses fossil-fuel-powered machinery, fertilisers, and energy — all of which release additional CO₂ that isn't reabsorbed by the crop. Under this reading, there <i>is</i> a net release of CO₂ once the whole production chain is considered, not just the combustion step — making I arguably false.</>,
    reason: "Both readings of \"sustainable\" (combustion-only vs. whole life-cycle) are defensible chemistry — this is plausibly where the ambiguity in statement I came from.",
  },
  {
    working: <>Statement II: "Hydrogen peroxide, H₂O₂, can be used as an oxidising agent in fuel cells." H₂O₂ genuinely can act as an oxidant — it has a strongly positive reduction potential and is used as the oxidant in some specialised (e.g. direct H₂O₂/borohydride) fuel cells, reduced to H₂O at the cathode instead of the more familiar O₂.</>,
    reason: 'A real, if less commonly taught, category of fuel cell — supporting II as true if the broader chemistry is considered valid.',
  },
  {
    working: <>But VCE Chemistry's fuel-cell coverage centres on O₂ as the oxidant (as in hydrogen and ethanol fuel cells studied in the course) — a student restricting "fuel cells" to what the study design actually covers could reasonably judge II unsupported by anything taught, and so false in context.</>,
    reason: "Whether II counts as \"correct\" plausibly depends on whether students are expected to draw on chemistry beyond the specific fuel cells named in the course.",
  },
  {
    working: <b>With both I and II genuinely arguable true or false depending on how strictly "sustainable" and "fuel cell" are read, all four combinations (A: I only, B: II only, C: both, D: neither) become defensible — consistent with VCAA accepting every option.</b>,
    reason: 'Independent reconstruction of the likely source of ambiguity — VCAA itself gave no published reasoning for this question.',
  },
]

export default function ChemistryQ10_2024() {
  return (
    <MCQShell
      flawed={
        <p>
          VCAA's report gives no explanation beyond "as a result of psychometric analysis and
          review, all four options were accepted as correct" — an unusually bare statement even
          among flagged questions. All four options are marked below since VCAA accepted every
          one. The Worked Solution tab below is this site's own reconstruction of where the
          ambiguity likely came from, clearly separate from anything VCAA actually published.
        </p>
      }
      question={
        <>
          <p className="mb-2">Consider the following statements regarding fuels.</p>
          <div className="flex flex-col gap-1 mb-2">
            <span>I. Bioethanol fuel is sustainable because it results in no net release of carbon dioxide into the atmosphere.</span>
            <span>II. Hydrogen peroxide, H₂O₂, can be used as an oxidising agent in fuel cells.</span>
          </div>
          <p>Which of the statements regarding fuels is/are correct?</p>
        </>
      }
      options={[
        { letter: 'A', content: 'I only', isAnswer: true },
        { letter: 'B', content: 'II only', isAnswer: true },
        { letter: 'C', content: 'both I and II', isAnswer: true },
        { letter: 'D', content: 'neither I nor II', isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
    />
  )
}
