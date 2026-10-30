// 2024 Chemistry Exam, MCQ 10 — BONUS: a VCAA-flagged question with no single correct answer.
// VCAA's report gives only "As a result of psychometric analysis and review, all four options
// were accepted as correct" — no further reasoning. Question text transcribed from the original
// paper (rendered from page images — the 2024 exam PDF has no extractable text). The reasoning
// below for why each of I and II is genuinely arguable both ways is original analysis, not VCAA's
// own — flagged clearly as such since VCAA gave no published explanation for this one. The H₂O₂
// E° is the 2026 Data Book's (+1.76 V; +1.77 V in the 2024 Data Book), noted where used.

import Chem from '../Chem'
import { MCQShell } from '../MCQShell'
import { DataBookNote } from '../QuestionParts'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const FLAWED = (
  <p>
    VCAA&rsquo;s report gives no explanation beyond &ldquo;As a result of psychometric analysis and
    review, all four options were accepted as correct.&rdquo; All four options are marked as
    correct below because VCAA accepted every one. The worked solution is this site&rsquo;s own
    analysis of where the ambiguity probably came from, not VCAA&rsquo;s reasoning.
  </p>
)

const EXAMINER: MCQExaminerStats = {
  percentages: {},
  answer: ['A', 'B', 'C', 'D'],
  flawed: FLAWED,
  comment: (
    <>
      As a result of psychometric analysis and review, all four options were accepted as correct.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <>Judge each statement on its own: I true or false, II true or false. The four options are the four combinations.</>,
    reason: (
      <>
        For VCAA to accept all four options, <i>both</i> statements must be arguable either way.
        Everything below is this site&rsquo;s own analysis — VCAA published no reasoning.
      </>
    ),
  },
  {
    working: (
      <>
        Statement I — the case for <b>true</b>: the CO₂ released when bioethanol burns was absorbed
        from the atmosphere by the crop (e.g. sugar cane) during photosynthesis, so burning it adds
        no <i>new</i> CO₂ — it is &ldquo;carbon neutral&rdquo;. The crop can be regrown, so the fuel
        is renewable.
      </>
    ),
    reason: <>This is the simple model most students are taught for biofuels.</>,
  },
  {
    working: (
      <>
        Statement I — the case for <b>false</b>: growing, harvesting, transporting and fermenting the
        crop and distilling the ethanol use energy (often from fossil fuels) and fertilisers, which
        release CO₂ that the crop never absorbed. Over the whole life cycle there <i>is</i> a net
        release of CO₂. &ldquo;Sustainable&rdquo; also means more than zero net CO₂ (renewable supply,
        land and water use), so the reason given in I is incomplete.
      </>
    ),
    reason: <>Whether I is true depends on whether only combustion or the whole production chain is counted.</>,
  },
  {
    working: (
      <>
        Statement II — the case for <b>true</b>: H₂O₂ is a strong oxidising agent,{' '}
        <Chem eq="H2O2(aq) + 2H+(aq) + 2e- <=> 2H2O(l)" />, <i>E</i>° = +1.76 V, well above O₂
        (+1.23 V), and some fuel cells (e.g. direct borohydride–H₂O₂ cells) do use it at the
        cathode instead of O₂.
      </>
    ),
    reason: (
      <>
        Data Book electrochemical series: a high <i>E</i>° means H₂O₂ is readily reduced, so it can
        act as the oxidising agent.
        <DataBookNote>the 2026 Data Book gives +1.76 V for H₂O₂/H₂O; the Data Book used for the 2024 exam gave +1.77 V (and +0.68 V, now +0.70 V, for O₂/H₂O₂). Either way H₂O₂ is a stronger oxidising agent than O₂.</DataBookNote>
      </>
    ),
  },
  {
    working: (
      <>
        Statement II — the case for <b>false</b>: the fuel cells in the VCE course use O₂ (from air)
        as the oxidising agent; H₂O₂ is not a standard fuel-cell oxidant, and it can also act as a
        reducing agent (<Chem eq="O2(g) + 2H+(aq) + 2e- <=> H2O2(aq)" />, +0.70 V), so a student
        could reasonably judge II unsupported.
      </>
    ),
    reason: <>Whether II counts as correct depends on how far beyond the course&rsquo;s fuel cells a student is expected to reason.</>,
  },
  {
    working: <b>Both I and II can be argued true or false, so every option (A: I only, B: II only, C: both, D: neither) is defensible — consistent with VCAA accepting all four.</b>,
    reason: <>Independent reconstruction of the likely source of the ambiguity — VCAA itself gave no published reasoning for this question.</>,
  },
]

export default function ChemistryQ10_2024() {
  return (
    <MCQShell
      flawed={FLAWED}
      question={
        <>
          <p className="mb-2">Consider the following statements regarding fuels.</p>
          <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 mb-2 pl-2">
            <span>I</span>
            <span>Bioethanol fuel is sustainable because it results in no net release of carbon dioxide into the atmosphere.</span>
            <span>II</span>
            <span>Hydrogen peroxide, <Chem eq="H2O2" />, can be used as an oxidising agent in fuel cells.</span>
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
