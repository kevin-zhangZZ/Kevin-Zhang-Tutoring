import { useState } from 'react'
import { QUESTIONS, SUBJECTS, SUBJECT_NAME, SUBJECT_COLOR, QUESTION_TYPE_LABEL, type SubjectId, type QuestionMeta, type QuestionType } from './data'
import { QUESTION_DETAILS } from './details'
import ComingSoon from './ComingSoon'

function firstOf(subject: SubjectId): QuestionMeta | undefined {
  return QUESTIONS.find(q => q.subject === subject)
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

  return (
    <div className="px-6 py-10">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
          Worked Solutions &amp; Videos
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
        {/* List panel */}
        <div className="w-full lg:w-[336px] flex-none bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-3 flex flex-col">
          <div className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 mt-1.5 mb-2 ml-2">
            {SUBJECT_NAME[subject]} — {subjectQuestions.length} Question{subjectQuestions.length === 1 ? '' : 's'}
          </div>

          {years.length === 0 && (
            <p className="text-[13px] text-gray-400 dark:text-gray-500 px-2 py-2">
              No {SUBJECT_NAME[subject]} questions yet — check back soon.
            </p>
          )}

          {years.map(year => {
            const isOpen = openYear === year
            const yearQuestions = subjectQuestions.filter(q => q.year === year)
            return (
              <div key={year} className={`rounded-2xl mb-0.5 ${isOpen ? 'bg-gray-50 dark:bg-gray-800/50' : ''}`}>
                <button
                  onClick={() => setOpenYear(isOpen ? null : year)}
                  className="w-full flex items-center justify-between px-2.5 py-2.5 rounded-xl"
                >
                  <span className="flex items-center gap-2">
                    <svg
                      className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                    <span className="font-display text-sm font-bold text-gray-900 dark:text-white">{year}</span>
                  </span>
                </button>

                {isOpen && (
                  <div className="flex flex-col gap-3 pt-0.5 pb-2 pl-6">
                    {(['mc', 'sa'] as QuestionType[]).map(type => {
                      const typeQuestions = yearQuestions.filter(q => q.type === type)
                      if (typeQuestions.length === 0) return null
                      return (
                        <div key={type} className="flex flex-col gap-1">
                          <div className="text-[10px] font-bold tracking-wider text-gray-400 dark:text-gray-500 px-3">
                            {QUESTION_TYPE_LABEL[type]}
                          </div>
                          {typeQuestions.map(q => (
                            <QuestionRow key={q.id} question={q} selected={q.id === selectedId} onSelect={() => setSelectedId(q.id)} />
                          ))}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Detail panel */}
        <div className="flex-1 min-w-0 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 sm:p-8">
          {selected && selectedColor ? (
            <>
              <span className={`font-display text-[12.5px] font-bold px-2.5 py-1 rounded-lg ${selectedColor.bg} ${selectedColor.text}`}>
                {selected.year} · {selected.exam} · {selected.code}
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
  const c = SUBJECT_COLOR[question.subject]
  return (
    <button
      onClick={onSelect}
      className={`text-left flex flex-col gap-1 px-3 py-2.5 rounded-xl border transition-colors ${
        selected ? `${c.bg} ${c.border}` : 'bg-transparent border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/60'
      }`}
    >
      <span className="flex items-center gap-2">
        <span className={`font-display text-[11px] font-bold px-1.5 py-0.5 rounded-md ${c.bg} ${c.text}`}>{question.code}</span>
        <span className="text-[11px] text-gray-400 dark:text-gray-500">{question.exam}</span>
      </span>
      <span className="text-[13px] text-gray-700 dark:text-gray-300 leading-snug">{question.topic}</span>
      <span className="text-[10.5px] font-medium text-gray-400 dark:text-gray-500">
        {question.hasDetail ? 'Written solution ready' : 'Coming soon'}
      </span>
    </button>
  )
}
