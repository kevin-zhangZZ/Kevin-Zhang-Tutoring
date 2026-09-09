import { useState } from 'react'
import { QUESTIONS, SUBJECTS, SUBJECT_NAME, SUBJECT_COLOR, QUESTION_TYPE_LABEL, type SubjectId, type QuestionMeta, type QuestionType } from './data'
import { QUESTION_DETAILS } from './details'
import ComingSoon from './ComingSoon'

function firstOf(subject: SubjectId): QuestionMeta | undefined {
  return QUESTIONS.find(q => q.subject === subject)
}

// `topic` is stored as "<category> — <description>" (e.g. "Complex numbers — Argand diagram
// parallelogram"). The sidebar shows the two halves as a topic/subtopic pair; the detail panel
// still uses the full original string, so this split only ever happens at render time.
function splitTopic(topic: string): [category: string, detail: string] {
  const parts = topic.split('—')
  if (parts.length < 2) return [topic.trim(), '']
  return [parts[0].trim(), parts.slice(1).join('—').trim()]
}

function toTitleCase(s: string): string {
  return s.replace(/\S+/g, word => word.charAt(0).toUpperCase() + word.slice(1))
}

// Sentence case for subtopics: just capitalise the first letter and leave the rest of the
// string as written, since proper nouns (Argand, Euler's, ...) are already capitalised
// correctly in the source data. "pH ..." is special-cased since it's a chemistry notation,
// not a word that starts a sentence.
function toSentenceCase(s: string): string {
  if (/^pH\b/.test(s)) return s
  return s.charAt(0).toUpperCase() + s.slice(1)
}

// The sidebar uses one fixed accent colour regardless of subject (the app's other subject-
// colour coding, e.g. the detail panel's badge, is unaffected).
const SIDEBAR_ACCENT = SUBJECT_COLOR.specialist

// Sidebar rows are sorted by ascending question number rather than data-entry order.
function questionNumber(code: string): number {
  const match = code.match(/\d+/)
  return match ? parseInt(match[0], 10) : 0
}

// The sidebar shows just the question number (e.g. "Q2"), dropping the specific sub-part
// range (e.g. "(a–f)") — the full code with its sub-parts still appears in the detail panel.
function mainCode(code: string): string {
  return code.replace(/\(.*\)\s*$/, '').trim()
}

export default function WorkedSolutions() {
  const [subject, setSubject] = useState<SubjectId>('specialist')
  const [selectedId, setSelectedId] = useState<string | null>(firstOf('specialist')?.id ?? null)
  const [openYear, setOpenYear] = useState<number | null>(firstOf('specialist')?.year ?? null)

  const subjectQuestions = QUESTIONS.filter(q => q.subject === subject)
  const years = Array.from(new Set(subjectQuestions.map(q => q.year))).sort((a, b) => a - b)
  const selected = QUESTIONS.find(q => q.id === selectedId) ?? subjectQuestions[0] ?? null
  const Detail = selected?.hasDetail ? QUESTION_DETAILS[selected.id] : undefined
  const selectedColor = selected ? SUBJECT_COLOR[selected.subject] : null

  function handleSubjectChange(next: SubjectId) {
    const first = firstOf(next)
    setSubject(next)
    setSelectedId(first?.id ?? null)
    setOpenYear(first?.year ?? null)
  }

  const yearQuestions = subjectQuestions.filter(q => q.year === openYear)
  const exams = Array.from(new Set(yearQuestions.map(q => q.exam)))

  return (
    <div className="px-6 py-10">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
          VCAA Exam Explanations
        </h1>
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-full p-1 flex-wrap">
          {SUBJECTS.map(s => (
            <button
              key={s.id}
              onClick={() => handleSubjectChange(s.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                subject === s.id
                  ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-7 items-start flex-col lg:flex-row">
        {/* List panel — sticky on large screens, so it stays in view while the (often much
            taller) detail panel scrolls; capped to the viewport height with its own scroll
            so a long, fully-expanded question list can't run off-screen. */}
        <div className="w-full lg:w-[336px] flex-none bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-3 flex flex-col lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto scrollbar-quiet">
          <div className="font-display text-[13px] font-bold text-gray-900 dark:text-white mt-1 mb-2 ml-1.5">
            {SUBJECT_NAME[subject]}
          </div>

          {years.length === 0 && (
            <p className="text-[13px] text-gray-400 dark:text-gray-500 px-2 py-2">
              No {SUBJECT_NAME[subject]} questions yet — check back soon.
            </p>
          )}

          {years.length > 0 && (
            <div className="flex gap-2">
              {/* Year rail */}
              <div className="flex-none flex flex-col gap-0.5 pt-0.5">
                {years.map(year => {
                  const isOpen = openYear === year
                  return (
                    <button
                      key={year}
                      onClick={() => setOpenYear(year)}
                      className={`w-10 font-display text-[11.5px] font-bold py-1.5 rounded-lg transition-colors ${
                        isOpen ? `${SIDEBAR_ACCENT.bg} ${SIDEBAR_ACCENT.text}` : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                      }`}
                    >
                      {year}
                    </button>
                  )
                })}
              </div>

              {/* Selected year's questions, grouped by exam then by type */}
              <div className="flex-1 min-w-0 border-l border-gray-100 dark:border-gray-800 pl-2.5 flex flex-col">
                {exams.map((exam, examIndex) => {
                  const examQuestions = yearQuestions.filter(q => q.exam === exam)
                  // Skip the "Multiple Choice"/"Short Answer" band entirely when an exam only
                  // ever has one type of question (e.g. Exam 1 for Methods/Specialist is always
                  // short-answer-only) — the label adds nothing when there's no other type to
                  // distinguish it from.
                  const examHasBothTypes = new Set(examQuestions.map(q => q.type)).size > 1
                  return (
                    <div key={exam} className={`flex flex-col gap-1.5 ${examIndex === 0 ? '' : 'mt-2'}`}>
                      <div className="text-[11px] font-bold text-gray-900 dark:text-white px-1">{exam}</div>
                      {(['mc', 'sa'] as QuestionType[]).map(type => {
                        const typeQuestions = examQuestions
                          .filter(q => q.type === type)
                          .sort((a, b) => questionNumber(a.code) - questionNumber(b.code))
                        if (typeQuestions.length === 0) return null
                        return (
                          <div key={type} className="flex flex-col gap-0.5">
                            {examHasBothTypes && (
                              <div className="flex items-center bg-slate-200 dark:bg-slate-800/40 rounded-lg px-2.5 py-1.5 my-0.5">
                                <span className="font-display text-[10.5px] font-bold leading-none text-slate-700 dark:text-slate-300 tracking-wide">
                                  {QUESTION_TYPE_LABEL[type]}
                                </span>
                              </div>
                            )}
                            {typeQuestions.map(q => (
                              <QuestionRow
                                key={q.id}
                                question={q}
                                selected={q.id === selectedId}
                                onSelect={() => setSelectedId(q.id)}
                              />
                            ))}
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Detail panel */}
        <div className="flex-1 min-w-0 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8">
          {selected && selectedColor ? (
            <>
              <span className="flex items-center gap-2 flex-wrap">
                <span className={`font-display text-[12.5px] font-bold px-2.5 py-1 rounded-lg ${selectedColor.bg} ${selectedColor.text}`}>
                  {selected.year} · {selected.exam} · {selected.code}
                </span>
                {selected.percentCorrect !== undefined && (
                  <span className="font-display text-[12.5px] font-bold px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                    {selected.percentCorrect}% accuracy
                  </span>
                )}
                {selected.hasVideo && (
                  <span className="flex items-center gap-1.5 font-display text-[12.5px] font-bold px-2.5 py-1 rounded-lg bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                      <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
                    </svg>
                    Video
                  </span>
                )}
              </span>
              <h2 className="font-display text-xl font-semibold text-gray-900 dark:text-white mt-3 mb-5 leading-snug">
                {selected.topic}
              </h2>
              {Detail ? <Detail key={selected.id} /> : <ComingSoon topic={selected.topic} />}
            </>
          ) : (
            <p className="text-[13.5px] text-gray-400 dark:text-gray-500 text-center py-10">
              No {SUBJECT_NAME[subject]} questions yet — check back soon.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function QuestionRow({
  question,
  selected,
  onSelect,
}: {
  question: QuestionMeta
  selected: boolean
  onSelect: () => void
}) {
  const [category, detail] = splitTopic(question.topic)
  return (
    <button
      onClick={onSelect}
      className={`flex items-center gap-2 text-left px-2 py-1.5 ml-2.5 w-[calc(100%-0.625rem)] rounded-xl transition-colors ${
        selected ? SIDEBAR_ACCENT.bg : 'hover:bg-gray-50 dark:hover:bg-gray-800/60'
      }`}
    >
      <span className="flex-1 min-w-0 flex items-start gap-2">
        <span className={`flex-none w-[52px] font-display text-[11.5px] font-bold ${SIDEBAR_ACCENT.text}`}>{mainCode(question.code)}</span>
        <span className="flex-1 min-w-0 flex flex-col">
          <span className="text-[12.5px] text-gray-700 dark:text-gray-300 leading-snug line-clamp-1" title={category}>
            {toTitleCase(category)}
          </span>
          {detail && (
            <span
              className="text-[12.5px] text-gray-400 dark:text-gray-500 leading-snug mt-0.5 line-clamp-2"
              title={detail}
            >
              {toSentenceCase(detail)}
            </span>
          )}
        </span>
      </span>
      {question.hasVideo && (
        <span className="flex-none flex items-center gap-1 font-display text-[10.5px] font-bold text-violet-600 dark:text-violet-400 whitespace-nowrap">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
          </svg>
          Video
        </span>
      )}
    </button>
  )
}
