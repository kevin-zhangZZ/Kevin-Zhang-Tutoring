import { useState, type ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { guides, CONFIDENCE_LABEL, type Confidence } from './data'
import { audits } from './audit'
import { SkipIcon, NoteIcon, NewIcon } from './icons'
import {
  PICKER_YEARS, examsFor, examSlug, papersFor, reviewedYears, explanationsFor,
  type Paper, type PaperItem,
} from './auditView'

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

const SHORT_NAME: Record<string, string> = { methods: 'Methods', specialist: 'Specialist', chemistry: 'Chemistry' }

const TOOL = '/exam-skip-guide'

// The write-ups in data.ts use blank lines between paragraphs and *asterisks* for emphasis.
function RichText({ text, className }: { text: string; className: string }) {
  return (
    <>
      {text.split(/\n\s*\n/).map((para, i) => (
        <p key={i} className={`${className} ${i > 0 ? 'mt-2' : ''}`}>
          {para.split(/(\*[^*]+\*)/g).map((bit, j) =>
            bit.startsWith('*') && bit.endsWith('*') && bit.length > 2 ? <em key={j}>{bit.slice(1, -1)}</em> : bit,
          )}
        </p>
      ))}
    </>
  )
}

// ── One paper: a quiet card listing what to skip, then what's doable with a tip ──
// Numbers run down a left-hand column so they line up; the only colour is each list's label
// and the small square beside it.

function ItemCode({ item }: { item: PaperItem }) {
  return (
    <span className="w-24 flex-none font-display text-[14px] font-bold text-gray-900 dark:text-white leading-snug">
      {item.code}
      {item.allParts && <span className="block text-[11px] font-medium text-gray-400 dark:text-gray-500">all parts</span>}
    </span>
  )
}

function ListLabel({ tone, children }: { tone: 'skip' | 'tip'; children: ReactNode }) {
  return (
    <p className={`text-[12px] font-semibold flex items-center gap-1.5 ${tone === 'skip' ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-700 dark:text-emerald-400'}`}>
      <span className={`w-2 h-2 rounded-sm ${tone === 'skip' ? 'bg-rose-200 dark:bg-rose-800' : 'bg-emerald-200 dark:bg-emerald-800'}`} aria-hidden />
      {children}
    </p>
  )
}

function PaperCard({ paper, showExam }: { paper: Paper; showExam: boolean }) {
  const skips = paper.items.filter(i => i.status === 'skip')
  const tips = paper.items.filter(i => i.status === 'tip')
  const summary = [
    skips.length ? `${skips.length} to skip` : '',
    tips.length ? `${tips.length} doable with a tip` : '',
  ].filter(Boolean).join(' · ')
  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 px-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
        <span className="text-[13px] font-semibold text-gray-800 dark:text-gray-100">{showExam ? paper.exam : 'The exam'}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">{summary}</span>
      </div>
      <div className="px-4 py-2.5 flex flex-col gap-2.5">
        {skips.length > 0 && (
          <div>
            <ListLabel tone="skip">Skip</ListLabel>
            {skips.map((s, i) => (
              <div key={i} className="flex gap-3 py-1.5">
                <ItemCode item={s} />
                <div className="min-w-0 text-[13px] leading-relaxed text-gray-500 dark:text-gray-400">
                  {s.topic}
                  {s.note && <span className="block text-xs text-gray-400 dark:text-gray-500">{s.note}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
        {tips.length > 0 && (
          <div>
            <ListLabel tone="tip">Doable with a tip</ListLabel>
            {tips.map((t, i) => (
              <div key={i} className="flex gap-3 py-1.5">
                <ItemCode item={t} />
                <p className="min-w-0 text-[13px] leading-relaxed text-gray-700 dark:text-gray-300">
                  {t.note ?? t.topic}
                  {t.link && (
                    <>
                      {' '}
                      <Link to={t.link} className="font-semibold text-blue-700 dark:text-blue-400 hover:underline underline-offset-2 whitespace-nowrap">
                        Worked solution →
                      </Link>
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── "Which paper are you doing?" ─────────────────────────────────────────────

function Select({ label, value, onChange, children }: { label: string; value: string; onChange: (v: string) => void; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1 text-xs font-semibold text-gray-500 dark:text-gray-400">
      {label}
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="text-sm font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {children}
      </select>
    </label>
  )
}

function PaperPicker({ subject, year, exam, papers, reviewed, onChange }: {
  subject: string
  year: number | null
  exam: string
  papers: Paper[]
  reviewed: Set<number>
  onChange: (subject: string, year: number | null, exam: string) => void
}) {
  const exams = examsFor(subject)
  const paper = year !== null ? papers.find(p => p.year === year && p.exam === exam) : undefined
  const explanations = year !== null ? explanationsFor(subject, year) : undefined
  const title = year !== null ? `${SHORT_NAME[subject]} ${year}${exams.length > 1 ? ` · ${exam}` : ''}` : ''

  return (
    <section className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 sm:p-5 mb-10" aria-labelledby="picker-title">
      <h2 id="picker-title" className="font-display text-lg font-semibold text-gray-900 dark:text-white">Which paper are you doing?</h2>
      <div className="flex flex-wrap gap-3 mt-3">
        <Select label="Subject" value={subject} onChange={v => onChange(v, year, examsFor(v)[0])}>
          {guides.map(g => <option key={g.id} value={g.id}>{SHORT_NAME[g.id] ?? g.name}</option>)}
        </Select>
        <Select label="Year" value={year === null ? '' : String(year)} onChange={v => onChange(subject, v ? Number(v) : null, exam)}>
          <option value="">Choose a year</option>
          {PICKER_YEARS.map(y => <option key={y} value={y}>{y}</option>)}
        </Select>
        {exams.length > 1 && (
          <Select label="Exam" value={exam} onChange={v => onChange(subject, year, v)}>
            {exams.map(e => <option key={e} value={e}>{e}</option>)}
          </Select>
        )}
      </div>

      {year !== null && (
        <div className="mt-4 border-t border-gray-100 dark:border-gray-800 pt-4" aria-live="polite">
          <p className="font-display text-[15px] font-bold text-gray-900 dark:text-white mb-2.5">{title}</p>
          {!reviewed.has(year) ? (
            <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-lg px-3 py-2.5">
              <b className="text-gray-800 dark:text-gray-100">This paper hasn’t been checked question by question yet.</b> Watch for the topics listed below.
            </p>
          ) : paper ? (
            <>
              <PaperCard paper={paper} showExam={exams.length > 1} />
              <p className="text-[13px] text-gray-600 dark:text-gray-300 mt-3">Everything else in this paper is on the current course.</p>
            </>
          ) : (
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Nothing to skip: everything in this paper is on the current course.</p>
          )}
          {explanations && (
            <Link to={explanations} className="inline-block mt-3 text-[13px] font-semibold text-blue-700 dark:text-blue-400 hover:underline underline-offset-2">
              Open {year} in Exam Explanations →
            </Link>
          )}
        </div>
      )}
    </section>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ExamSkipGuide() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  // The subject and the picked paper live in the URL: #/exam-skip-guide/specialist/2016/exam-2
  const [, , subjectSeg, yearSeg, examSeg] = pathname.split('/')
  const subjectId = guides.find(g => g.id === subjectSeg)?.id ?? guides[0].id
  const pickedYear = yearSeg && PICKER_YEARS.includes(Number(yearSeg)) ? Number(yearSeg) : null
  const exams = examsFor(subjectId)
  const pickedExam = exams.find(e => examSlug(e) === examSeg) ?? exams[0]

  const [openTitles, setOpenTitles] = useState<Set<string>>(new Set())
  const guide = guides.find(g => g.id === subjectId)!
  const audit = audits.find(a => a.id === subjectId)!
  const papers = papersFor(subjectId, audit.rows)
  const reviewed = reviewedYears(audit.rows)
  const years = [...new Set(papers.map(p => p.year))]

  function go(subject: string, year: number | null, exam: string) {
    const path = year !== null ? `${TOOL}/${subject}/${year}/${examSlug(exam)}` : `${TOOL}/${subject}`
    navigate(path, { replace: true })
  }

  function toggleItem(title: string) {
    setOpenTitles(prev => {
      const next = new Set(prev)
      if (next.has(title)) next.delete(title)
      else next.add(title)
      return next
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-6 py-10">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-2">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
          Past Exam Skip Guide
        </h1>
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-full p-1">
          {guides.map(g => (
            <button
              key={g.id}
              onClick={() => { go(g.id, pickedYear, examsFor(g.id)[0]); setOpenTitles(new Set()) }}
              aria-pressed={subjectId === g.id}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                subjectId === g.id
                  ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              <span className="sm:hidden">{SHORT_NAME[g.id] ?? g.name}</span>
              <span className="hidden sm:inline">{g.name}</span>
            </button>
          ))}
        </div>
      </div>
      <p className="text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed mb-8 max-w-2xl">
        What to skip when practicing with 2014&ndash;2022 VCE papers, now that the study design has changed.
      </p>

      {/* Study design context */}
      <div className={`flex flex-wrap gap-x-8 gap-y-2 text-xs text-gray-500 dark:text-gray-400 ${guide.intro ? 'mb-3' : 'mb-8'}`}>
        <span><span className="font-semibold text-gray-700 dark:text-gray-300">Current</span>&ensp;{guide.currentSD}</span>
        <span><span className="font-semibold text-gray-700 dark:text-gray-300">2014&ndash;2022 papers used</span>&ensp;{guide.oldSD}</span>
      </div>
      {guide.intro && (
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-8 max-w-2xl">{guide.intro}</p>
      )}

      <PaperPicker
        subject={subjectId}
        year={pickedYear}
        exam={pickedExam}
        papers={papers}
        reviewed={reviewed}
        onChange={(s, y, e) => { if (s !== subjectId) setOpenTitles(new Set()); go(s, y, e) }}
      />

      {/* Topic list — collapsed to a title row by default; click to expand the full write-up
          in place, so the list stays scannable even as more topics get added. */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mb-14 overflow-hidden">
        {guide.items.map((item, i) => {
          const Icon = CONFIDENCE_ICON[item.confidence]
          const isOpen = openTitles.has(item.title)
          return (
            <div key={item.title} className={i > 0 ? 'border-t border-gray-100 dark:border-gray-800' : ''}>
              <button
                onClick={() => toggleItem(item.title)}
                aria-expanded={isOpen}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-gray-50 dark:hover:bg-gray-800/60"
              >
                <span className={`flex-none ${CONFIDENCE_TEXT[item.confidence]}`}>
                  <Icon className="w-[17px] h-[17px]" />
                </span>
                <span className="flex-1 min-w-0 text-[14px] font-semibold text-gray-900 dark:text-white leading-snug">
                  {item.title}
                </span>
                <span className="flex-none text-[11px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                  {CONFIDENCE_LABEL[item.confidence].split(' — ')[0]}
                </span>
                <svg
                  className={`flex-none w-3.5 h-3.5 text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                >
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pl-[42px]">
                  <p className={`text-[11px] font-bold tracking-wide mb-2 ${CONFIDENCE_TEXT[item.confidence]}`}>
                    {CONFIDENCE_LABEL[item.confidence]}
                  </p>
                  <RichText text={item.detail} className="text-[13px] text-gray-600 dark:text-gray-300 leading-relaxed" />
                  {item.where && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2.5 pt-2.5 border-t border-gray-100 dark:border-gray-800">
                      Typically appeared in &mdash; {item.where}
                    </p>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Question-by-question audit — timeline, one card per paper */}
      <div className="mb-14">
        <h2 className="font-display text-xl font-semibold text-gray-900 dark:text-white mb-8">
          Question-by-question audit
        </h2>

        {years.length > 0 ? (
          <div className="flex flex-col gap-9">
            {years.map(year => (
              <section key={year} id={`y${year}`} className="scroll-mt-6">
                <h3 className="font-display text-[18px] font-bold text-gray-900 dark:text-white mb-2.5">{year}</h3>
                <div className="flex flex-col gap-4">
                  {papers.filter(p => p.year === year).map(p => (
                    <PaperCard key={p.exam} paper={p} showExam={examsFor(subjectId).length > 1} />
                  ))}
                </div>
              </section>
            ))}
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
