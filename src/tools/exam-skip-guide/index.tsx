import { useState } from 'react'
import { guides, CONFIDENCE_LABEL, type Confidence } from './data'
import { audits } from './audit'
import { SkipIcon, NoteIcon, NewIcon } from './icons'

const CONFIDENCE_ICON: Record<Confidence, (props: { className?: string }) => JSX.Element> = {
  skip: SkipIcon,
  note: NoteIcon,
  new: NewIcon,
}

// Text/icon color per tier — chosen to hold AA contrast in both themes.
const CONFIDENCE_TEXT: Record<Confidence, string> = {
  skip: 'text-red-700 dark:text-red-400',
  note: 'text-amber-700 dark:text-amber-400',
  new: 'text-blue-700 dark:text-blue-400',
}

// Timeline dot color per tier (decorative, so a bit brighter than the text color is fine).
const CONFIDENCE_DOT: Record<Confidence, string> = {
  skip: 'bg-red-500',
  note: 'bg-amber-500',
  new: 'bg-blue-500',
}

export default function ExamSkipGuide() {
  const [subjectId, setSubjectId] = useState(guides[0].id)
  const guide = guides.find(g => g.id === subjectId)!
  const audit = audits.find(a => a.id === subjectId)!
  const years = Array.from(new Set(audit.rows.map(r => r.year))).sort((a, b) => a - b)

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-2">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
          Past Exam Skip Guide
        </h1>
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-full p-1 flex-wrap">
          {guides.map(g => (
            <button
              key={g.id}
              onClick={() => setSubjectId(g.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                subjectId === g.id
                  ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              {g.name}
            </button>
          ))}
        </div>
      </div>
      <p className="text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed mb-8 max-w-2xl">
        What to skip when practicing with 2014&ndash;2022 VCE papers, now that the study design has changed.
      </p>

      {/* Study design context */}
      <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
        <span><span className="font-semibold text-gray-700 dark:text-gray-300">Current</span>&ensp;{guide.currentSD}</span>
        <span><span className="font-semibold text-gray-700 dark:text-gray-300">2014&ndash;2022 papers used</span>&ensp;{guide.oldSD}</span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-10 max-w-2xl">{guide.intro}</p>

      {/* Topic cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
        {guide.items.map(item => {
          const Icon = CONFIDENCE_ICON[item.confidence]
          return (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5"
            >
              <div className={`mb-3.5 ${CONFIDENCE_TEXT[item.confidence]}`}>
                <Icon />
              </div>
              <div className={`text-[10.5px] font-bold uppercase tracking-wider mb-1.5 ${CONFIDENCE_TEXT[item.confidence]}`}>
                {CONFIDENCE_LABEL[item.confidence]}
              </div>
              <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white mb-1.5 leading-snug">
                {item.title}
              </h3>
              <p className="text-[13px] text-gray-600 dark:text-gray-300 leading-relaxed">
                {item.detail}
              </p>
              {item.where && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2.5 pt-2.5 border-t border-gray-100 dark:border-gray-800">
                  Typically appeared in &mdash; {item.where}
                </p>
              )}
            </div>
          )
        })}
      </div>

      {/* Question-by-question audit — timeline */}
      <div className="mb-14">
        <h2 className="font-display text-xl font-semibold text-gray-900 dark:text-white mb-8">
          Question-by-question audit
        </h2>

        {years.length > 0 ? (
          <div>
            {years.map((year, yi) => {
              const rows = audit.rows.filter(r => r.year === year)
              const exams = Array.from(new Set(rows.map(r => r.exam)))
              const isLast = yi === years.length - 1
              return (
                <div key={year} className="flex gap-5">
                  {/* Spine */}
                  <div className="flex-none w-14 flex flex-col items-center">
                    <div className="font-display w-14 h-14 rounded-full bg-red-500 text-white flex items-center justify-center text-[13px] font-bold flex-shrink-0">
                      {year}
                    </div>
                    {!isLast && <div className="flex-1 w-0.5 bg-gray-200 dark:bg-gray-800 mt-1 min-h-[16px]" />}
                  </div>
                  {/* Entries */}
                  <div className={`flex-1 min-w-0 ${isLast ? '' : 'pb-9'}`}>
                    <div className="font-display text-[15px] font-semibold text-gray-900 dark:text-white mb-2.5 pt-3">
                      {year}
                    </div>
                    <div className="flex flex-col gap-5">
                      {exams.map(exam => (
                        <div key={exam}>
                          <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                            {exam}
                          </div>
                          <div className="flex flex-col gap-2.5">
                            {rows.filter(r => r.exam === exam).map((row, i) => (
                              <div key={i} className="flex gap-2.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0 mt-[7px]" />
                                <div className="min-w-0">
                                  <div className="text-xs font-mono font-bold text-gray-700 dark:text-gray-300">
                                    {row.question}
                                  </div>
                                  <div className="text-sm text-gray-800 dark:text-gray-200">
                                    {row.topic}
                                  </div>
                                  {row.note && (
                                    <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mt-1 space-y-1">
                                      {row.note.split('\n').map((line, li) => (
                                        <p key={li} className="m-0">{line}</p>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
            No individual questions confirmed for this subject.
          </p>
        )}
      </div>
    </div>
  )
}
