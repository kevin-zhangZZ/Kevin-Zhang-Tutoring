import { useState, type ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SegmentedControl from '../../components/ui/SegmentedControl'
import { Reveal, stagger } from '../../components/motion/Reveal'
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
      {item.allParts && <span className="block text-[11px] font-medium text-gray-500 dark:text-gray-400">all parts</span>}
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
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
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
                  {s.note && <span className="block text-xs text-gray-500 dark:text-gray-400">{s.note}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
        {tips.length > 0 && (
          <div>
            <ListLabel tone="tip">Doable with a tip</ListLabel>
            {tips.map((t, i) => (
              <div key={i} className="flex gap-3 py-1.5 [@media(pointer:coarse)]:py-3">
                <ItemCode item={t} />
                <p className="min-w-0 text-[13px] leading-relaxed text-gray-700 dark:text-gray-300">
                  {t.note ?? t.topic}
                  {t.link && (
                    <>
                      {' '}
                      <Link to={t.link} className="relative font-semibold text-blue-700 dark:text-blue-400 hover:underline underline-offset-2 whitespace-nowrap after:absolute after:-inset-y-1 after:-inset-x-1 [@media(pointer:coarse)]:after:-inset-y-3">
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
// One button per year, each with how many questions to skip in it, then Exam 1 / Exam 2. The
// subject comes from the switch at the top of the page.

/** Questions to skip in a year, across its papers. */
const skipsIn = (papers: Paper[], year: number) =>
  papers.filter(p => p.year === year).reduce((n, p) => n + p.items.filter(i => i.status === 'skip').length, 0)

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
  const title = year !== null ? `${SHORT_NAME[subject]} ${year}${exams.length > 1 ? `, ${exam}` : ''}` : ''

  return (
    <section className="rise-in rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 sm:p-7 mb-10" style={stagger(3)} aria-labelledby="picker-title">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div>
          <h2 id="picker-title" className="font-display text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Which paper are you doing?</h2>
          <p className="mt-1 text-[13px] text-gray-500 dark:text-gray-400">Pick a year to see what to skip in it. The number is how many questions to skip.</p>
        </div>
        {exams.length > 1 && (
          <SegmentedControl aria-label="Exam" value={exam} onChange={v => onChange(subject, year, v)} options={exams.map(e => ({ value: e, label: e }))} />
        )}
      </div>

      <div className="mt-5 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2" role="group" aria-label="Year">
        {PICKER_YEARS.map(y => {
          const on = y === year
          const checked = reviewed.has(y)
          const n = skipsIn(papers, y)
          return (
            <button
              key={y}
              type="button"
              aria-pressed={on}
              aria-label={`${y}${checked ? `, ${n} to skip` : ', not checked yet'}`}
              onClick={() => onChange(subject, on ? null : y, exam)}
              className={`flex flex-col items-center rounded-xl border px-2 py-2.5 transition-[background-color,border-color,transform] active:scale-[0.97] ${
                on
                  ? 'border-gray-900 dark:border-white bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 text-gray-900 dark:text-white hover:-translate-y-0.5'
              }`}
            >
              <span className="font-display text-base font-bold tabular-nums">{y}</span>
              <span className={`text-[11px] font-semibold tabular-nums ${on ? 'opacity-75' : checked && n ? 'text-rose-600 dark:text-rose-400' : 'text-gray-400 dark:text-gray-500'}`}>
                {!checked ? 'not checked' : n ? `${n} skip` : 'none'}
              </span>
            </button>
          )
        })}
      </div>

      {year !== null && (
        <div key={`${year}-${exam}`} className="slide-up-in mt-6 border-t border-gray-100 dark:border-gray-800 pt-5" aria-live="polite">
          <p className="font-display text-lg font-bold text-gray-900 dark:text-white mb-3">{title}</p>
          {!reviewed.has(year) ? (
            <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-3">
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

  const scrollToYear = (y: number) => document.getElementById(`y${y}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 sm:py-12">
      {/* Header: the title, then the subject switch. */}
      <div className="rise-in flex flex-wrap items-end justify-between gap-x-6 gap-y-4" style={stagger(0)}>
        <div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-[-0.03em]">
            Past Exam Skip Guide
          </h1>
          <p className="mt-2 text-[15px] sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
            What to skip when practising with 2014&ndash;2022 VCE papers, now that the study design has changed.
          </p>
        </div>
        <SegmentedControl
          size="md"
          aria-label="Subject"
          value={subjectId}
          onChange={id => {
            go(id, pickedYear, examsFor(id)[0])
            setOpenTitles(new Set())
          }}
          options={guides.map(g => ({
            value: g.id,
            ariaLabel: g.name,
            label: (
              <>
                <span className="sm:hidden">{SHORT_NAME[g.id] ?? g.name}</span>
                <span className="hidden sm:inline">{g.name}</span>
              </>
            ),
          }))}
        />
      </div>

      {/* The change of study design, old papers to now. */}
      <div className="rise-in mt-8 grid sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 sm:gap-4" style={stagger(1)}>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-100/70 dark:bg-gray-900/60 px-5 py-4">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">2014&ndash;2022 papers used</p>
          <p className="mt-0.5 font-display text-lg font-bold text-gray-700 dark:text-gray-300">{guide.oldSD}</p>
        </div>
        <span aria-hidden className="justify-self-center text-2xl text-gray-300 dark:text-gray-600 rotate-90 sm:rotate-0">→</span>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-5 py-4">
          <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">Current</p>
          <p className="mt-0.5 font-display text-lg font-bold text-gray-900 dark:text-white">{guide.currentSD}</p>
        </div>
      </div>
      {guide.intro && (
        <p className="rise-in mt-5 text-[15px] text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl" style={stagger(2)}>{guide.intro}</p>
      )}

      <div className="mt-8">
        <PaperPicker
          subject={subjectId}
          year={pickedYear}
          exam={pickedExam}
          papers={papers}
          reviewed={reviewed}
          onChange={(s, y, e) => { if (s !== subjectId) setOpenTitles(new Set()); go(s, y, e) }}
        />
      </div>

      {/* Topic list: collapsed to a title row by default; click to expand the full write-up
          in place, so the list stays scannable even as more topics get added. */}
      <Reveal>
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">What changed</h2>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mb-14 overflow-hidden">
          {guide.items.map((item, i) => {
            const Icon = CONFIDENCE_ICON[item.confidence]
            const isOpen = openTitles.has(item.title)
            return (
              <div key={item.title} className={i > 0 ? 'border-t border-gray-100 dark:border-gray-800' : ''}>
                <button
                  onClick={() => toggleItem(item.title)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/60"
                >
                  <span className={`flex-none ${CONFIDENCE_TEXT[item.confidence]}`}>
                    <Icon className="w-[18px] h-[18px]" />
                  </span>
                  <span className="flex-1 min-w-0 text-[15px] font-semibold text-gray-900 dark:text-white leading-snug">
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
                  <div className="slide-up-in px-5 pb-5 pl-[50px]">
                    <p className={`text-[11px] font-bold tracking-wide mb-2 ${CONFIDENCE_TEXT[item.confidence]}`}>
                      {CONFIDENCE_LABEL[item.confidence]}
                    </p>
                    <RichText text={item.detail} className="text-[14px] text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl" />
                    {item.where && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2.5 pt-2.5 border-t border-gray-100 dark:border-gray-800">
                        Typically appeared in: {item.where}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Reveal>

      {/* Question-by-question audit: a year rail on laptops (sticky, with counts), and each
          year's papers side by side. */}
      <div className="mb-14">
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
          Question-by-question audit
        </h2>

        {years.length > 0 ? (
          <div className="lg:grid lg:grid-cols-[9rem_minmax(0,1fr)] lg:gap-10">
            <nav aria-label="Years" className="hidden lg:block">
              <ul className="sticky top-6 flex flex-col gap-0.5">
                {years.map(y => (
                  <li key={y}>
                    <button
                      type="button"
                      onClick={() => scrollToYear(y)}
                      className="w-full flex items-baseline justify-between rounded-lg px-3 py-1.5 text-left hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-colors"
                    >
                      <span className="font-display text-[15px] font-bold text-gray-900 dark:text-white tabular-nums">{y}</span>
                      <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 tabular-nums">{skipsIn(papers, y)} skip</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex flex-col gap-10">
              {years.map(year => (
                <Reveal key={year}>
                  <section id={`y${year}`} className="scroll-mt-6">
                    <h3 className="font-display text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-3 tabular-nums">{year}</h3>
                    <div className="grid gap-4 xl:grid-cols-2 xl:items-start">
                      {papers.filter(p => p.year === year).map(p => (
                        <PaperCard key={p.exam} paper={p} showExam={examsFor(subjectId).length > 1} />
                      ))}
                    </div>
                  </section>
                </Reveal>
              ))}
            </div>
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
