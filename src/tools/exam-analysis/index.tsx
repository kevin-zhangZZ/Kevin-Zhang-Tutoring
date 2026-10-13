// Exam Analysis: how Methods and Specialist exams split their marks across topics, which
// topics students find hard, and what's changed over 2014–2025 — built from every question in
// the worked-solutions archive (see model.ts and taxonomy.ts).
//
// Subject is in the path (#/exam-analysis/specialist); filters and the current pick are in the
// query string, so a view can be bookmarked or sent. Clicking a topic anywhere zooms every
// chart into its subtopics; the question list at the bottom shows whatever is picked.
//
// Each section answers one question a student or teacher brings to past papers, in the order
// they'd ask it, and its headline is that answer for the current filters (worked out from the
// data, so it changes as they do).

import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import SegmentedControl from '../../components/ui/SegmentedControl'
import {
  FIRST_YEAR, LAST_YEAR, STUDY_DESIGN_YEAR, filterItems, groupsOf, missingMarksByYear, pct, fmt, statOf, subLabel, topicLabel, yearsOf,
  type ExamFilter, type Filters, type Level, type TypeFilter,
} from './model'
import { TAXONOMY, type AnalysisSubject } from './taxonomy'
import { NO_FOCUS, type ChartCtx, type Focus } from './view'
import { FilterBar, type FilterProps } from './Filters'
import { AllocationBars, allocationHeadline } from './charts/Allocation'
import { DotStrip, difficultyHeadline } from './charts/Difficulty'
import { Heatmap, trendHeadline, type TrendMeasure } from './charts/Trends'
import { Histogram, binLabel, binOf, questionScores, spreadHeadline } from './charts/Spread'
import { QuestionList } from './QuestionList'
import { bandOf } from './charts/common'
import { Reveal, stagger, useTween } from '../../components/motion/Reveal'
import './ea-motion.css'

const TOOL = '/exam-analysis'

// ── URL state ──────────────────────────────────────────────────────────────────────────────

function readState(subject: AnalysisSubject, q: URLSearchParams) {
  const num = (k: string, d: number) => {
    const v = Number(q.get(k))
    return q.has(k) && Number.isFinite(v) ? v : d
  }
  const from = Math.min(LAST_YEAR, Math.max(FIRST_YEAR, num('from', FIRST_YEAR)))
  const to = Math.min(LAST_YEAR, Math.max(from, num('to', LAST_YEAR)))
  const exam: ExamFilter = q.get('exam') === '1' ? 'Exam 1' : q.get('exam') === '2' ? 'Exam 2' : 'all'
  const type: TypeFilter = q.get('type') === 'mc' ? 'mc' : q.get('type') === 'sa' ? 'sa' : 'all'
  const level: Level = q.get('level') === 'sub' ? 'sub' : 'topic'
  const topics = new Set(TAXONOMY[subject].map(t => t.id))
  const subs = new Set(TAXONOMY[subject].flatMap(t => t.subtopics.map(s => s.id)))
  const sub = q.get('sub') && subs.has(q.get('sub')!) ? q.get('sub') : null
  const topic = sub ? sub.split('.')[0] : q.get('topic') && topics.has(q.get('topic')!) ? q.get('topic') : null
  const focus: Focus = {
    topic,
    sub,
    year: q.has('year') ? num('year', 0) || null : null,
    bin: q.has('bin') ? num('bin', -1) : null,
  }
  if (focus.bin !== null && (focus.bin < 0 || focus.bin > 19)) focus.bin = null
  const filters: Filters = { subject, from, to, exam, type }
  return { filters, level, focus }
}

function writeState(filters: Filters, level: Level, focus: Focus): URLSearchParams {
  const q = new URLSearchParams()
  if (filters.from !== FIRST_YEAR) q.set('from', String(filters.from))
  if (filters.to !== LAST_YEAR) q.set('to', String(filters.to))
  if (filters.exam !== 'all') q.set('exam', filters.exam.slice(-1))
  if (filters.type !== 'all') q.set('type', filters.type)
  if (level === 'sub') q.set('level', 'sub')
  if (focus.sub) q.set('sub', focus.sub)
  else if (focus.topic) q.set('topic', focus.topic)
  if (focus.year) q.set('year', String(focus.year))
  if (focus.bin !== null) q.set('bin', String(focus.bin))
  return q
}

// ── Page ───────────────────────────────────────────────────────────────────────────────────

export default function ExamAnalysis() {
  const navigate = useNavigate()
  const rest = useParams()['*'] ?? ''
  const subject: AnalysisSubject = rest.split('/')[0] === 'specialist' ? 'specialist' : 'methods'
  const [params, setParams] = useSearchParams()
  const { filters, level, focus } = readState(subject, params)
  const [measure, setMeasure] = useState<TrendMeasure>('marks')

  const update = (next: { filters?: Filters; level?: Level; focus?: Focus }) =>
    setParams(writeState(next.filters ?? filters, next.level ?? level, next.focus ?? focus), { replace: true })

  const zoomTopic = focus.topic

  const data = useMemo(() => {
    const allItems = filterItems(filters)
    const items = zoomTopic ? allItems.filter(i => i.topic === zoomTopic) : allItems
    const effLevel: Level = zoomTopic ? 'sub' : level
    const groups = groupsOf(items, subject, effLevel, zoomTopic)
    const missing = zoomTopic ? new Map<number, number>() : missingMarksByYear(filters)
    return { allItems, items, effLevel, groups, missing }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subject, filters.from, filters.to, filters.exam, filters.type, level, zoomTopic])

  const years = yearsOf(filters)

  // Clicking what's already picked unpicks it (a subtopic goes back to its topic).
  const pickGroup = (id: string, year: number | null = null, toggle = true) => {
    const isSub = id.includes('.')
    const same = isSub ? focus.sub === id : focus.topic === id && focus.sub === null
    if (toggle && same && year === null) {
      update({ focus: isSub ? { ...NO_FOCUS, topic: focus.topic } : NO_FOCUS })
      return
    }
    update({ focus: { topic: isSub ? id.split('.')[0] : id, sub: isSub ? id : null, year, bin: null } })
  }

  const ctx: ChartCtx = {
    subject,
    filters,
    items: data.items,
    groups: data.groups,
    level: data.effLevel,
    years,
    missing: data.missing,
    focus,
    onGroup: id => pickGroup(id),
    onYear: y => update({ filters: { ...filters, from: y, to: y }, focus: { ...focus, year: null } }),
    onCell: (id, y) => pickGroup(id, y, false),
    onBin: bin => update({ focus: { ...focus, bin: focus.bin === bin ? null : bin } }),
  }

  // What the question list and histogram show: the filters, then the pick.
  const pickedItems = data.allItems.filter(
    i => (!focus.topic || i.topic === focus.topic) && (!focus.sub || i.sub === focus.sub) && (!focus.year || i.year === focus.year),
  )
  // A histogram bar is questions (see Spread.tsx): list every part of the questions in it.
  const qScores = focus.bin === null ? null : questionScores(pickedItems)
  const listItems = qScores
    ? pickedItems.filter(i => {
        const q = qScores.get(i.question.id)
        return !!q && binOf(q.score) === focus.bin
      })
    : pickedItems

  const filterProps: FilterProps = {
    f: filters,
    level,
    onSubject: s => {
      const q = writeState({ ...filters, subject: s }, level, NO_FOCUS).toString()
      navigate(`${TOOL}/${s}${q ? `?${q}` : ''}`, { replace: true })
    },
    onChange: patch => update({ filters: { ...filters, ...patch }, focus: { ...focus, year: null, bin: null } }),
    onLevel: l => update({ level: l }),
  }

  const source = sourceLine(filters)

  useEffect(() => {
    if (rest.split('/')[0] !== subject) navigate(`${TOOL}/${subject}${params.toString() ? `?${params}` : ''}`, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rest])

  return (
    <div className="px-4 sm:px-6 pt-6 sm:pt-10 pb-16 max-w-6xl mx-auto">
      <header className="mb-6 rise-in" style={stagger(0)}>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-[-0.03em]">Exam Analysis</h1>
        <p className="mt-2 max-w-3xl text-[15px] sm:text-base text-gray-600 dark:text-gray-300">
          How the {subject === 'methods' ? 'Mathematical Methods' : 'Specialist Mathematics'} exams split their marks across topics, which topics students find hard, and
          what’s been changing. Built from every question in the VCAA Exam Explanations archive, 2014–{LAST_YEAR}.
        </p>
      </header>

      <FilterBar {...filterProps} />

      <div className="mt-5 flex flex-col gap-6 min-w-0">
        <FocusBar ctx={ctx} onClear={patch => update({ focus: { ...focus, ...patch } })} />
        <Kpis ctx={ctx} />

        <Section ask="What’s Worth the Most?" title={allocationHeadline(ctx)} source={source}>
          <AllocationBars ctx={ctx} />
        </Section>

        <Section ask="What Do Students Find Hard?" title={difficultyHeadline(ctx)} source={source}>
          <DotStrip ctx={ctx} />
        </Section>

        <Section
          ask="Has It Changed?"
          title={trendHeadline(ctx, measure)}
          options={<MeasureSwitch value={measure} onChange={setMeasure} />}
          source={source}
        >
          <Heatmap ctx={ctx} measure={measure} />
        </Section>

        <Section ask="How Hard Is a Typical Question?" title={spreadHeadline(pickedItems)} source={source}>
          <Histogram ctx={ctx} items={pickedItems} />
        </Section>

        <Section ask="Where Do I Start?" title="Every question in view, linked to its worked solution" blurb={<ListCaption ctx={ctx} />}>
          <QuestionList key={subject} subject={subject} items={listItems} />
        </Section>

        <AboutNumbers />
      </div>
    </div>
  )
}

// ── Pieces ─────────────────────────────────────────────────────────────────────────────────

/** A section: the question it answers, the answer as its headline, the chart, and where the numbers come from. */
function Section({ ask, title, blurb, options, source, children }: { ask: string; title: string; blurb?: ReactNode; options?: ReactNode; source?: string; children: ReactNode }) {
  return (
    <Reveal>
    <section className="@container rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 sm:p-6">
      <div className="flex flex-col @3xl:flex-row @3xl:items-start @3xl:justify-between gap-2.5 @3xl:gap-4 mb-4">
        <div className="min-w-0">
          <p className="text-[12.5px] font-semibold text-amber-700 dark:text-amber-400">{ask}</p>
          <h2 className="font-display text-lg sm:text-[1.4rem] leading-snug font-bold tracking-tight text-gray-900 dark:text-white mt-0.5 max-w-3xl text-balance">{title}</h2>
          {blurb && <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-1 max-w-2xl">{blurb}</p>}
        </div>
        {options && <div className="@3xl:flex-none">{options}</div>}
      </div>
      {children}
      {source && <p className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 text-[11.5px] text-gray-400 dark:text-gray-500">{source}</p>}
    </section>
    </Reveal>
  )
}

/** "Source: VCAA examination reports · Methods 2014–2025 · Exams 1 and 2 · MCQs and short answer". */
function sourceLine(f: Filters): string {
  const years = f.from === f.to ? String(f.from) : `${f.from}–${f.to}`
  const exam = f.exam === 'all' ? 'Exams 1 and 2' : f.exam
  const type = f.type === 'all' ? 'MCQs and short answer' : f.type === 'mc' ? 'MCQs only' : 'Short answer only'
  return `Source: VCAA examination reports · ${f.subject === 'methods' ? 'Methods' : 'Specialist'} ${years} · ${exam} · ${type}`
}

function MeasureSwitch({ value, onChange }: { value: TrendMeasure; onChange: (v: TrendMeasure) => void }) {
  return (
    <div className="flex items-center gap-2">
      <span id="ea-measure-label" className="text-[12px] font-semibold text-gray-500 dark:text-gray-400">
        Show
      </span>
      <SegmentedControl
        aria-labelledby="ea-measure-label"
        value={value}
        onChange={onChange}
        options={[
          { value: 'marks', label: 'Marks' },
          { value: 'score', label: 'Difficulty' },
        ]}
      />
    </div>
  )
}

/** What's picked, as removable chips: All topics › Calculus › Optimisation · 2019 · 35–39%. */
function FocusBar({ ctx, onClear }: { ctx: ChartCtx; onClear: (patch: Partial<Focus>) => void }) {
  const f = ctx.focus
  const any = f.topic || f.year || f.bin !== null
  const chip = (label: string, onX: () => void) => (
    <span className="inline-flex items-center gap-1 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 pl-3 pr-1 py-0.5 text-[12.5px] font-medium">
      {label}
      <button type="button" onClick={onX} aria-label={`Clear ${label}`} className="relative w-5 h-5 rounded-full grid place-items-center hover:bg-white/20 dark:hover:bg-gray-900/10 after:absolute after:-inset-3">
        ×
      </button>
    </span>
  )
  return (
    <div className="flex flex-wrap items-center gap-2 min-h-[28px]">
      <button
        type="button"
        onClick={() => onClear({ topic: null, sub: null, year: null, bin: null })}
        className={`relative text-[13px] font-semibold after:absolute after:-inset-y-3 after:-inset-x-1 ${any ? 'text-sky-700 dark:text-sky-400 hover:underline' : 'text-gray-900 dark:text-white'}`}
      >
        All topics
      </button>
      {f.topic && (
        <>
          <span className="text-gray-300 dark:text-gray-600">›</span>
          {f.sub ? (
            <button type="button" onClick={() => onClear({ sub: null })} className="text-[13px] font-semibold text-sky-700 dark:text-sky-400 hover:underline">
              {topicLabel(ctx.subject, f.topic)}
            </button>
          ) : (
            chip(topicLabel(ctx.subject, f.topic), () => onClear({ topic: null, sub: null }))
          )}
        </>
      )}
      {f.sub && (
        <>
          <span className="text-gray-300 dark:text-gray-600">›</span>
          {chip(subLabel(ctx.subject, f.sub), () => onClear({ sub: null }))}
        </>
      )}
      {f.year && chip(String(f.year), () => onClear({ year: null }))}
      {f.bin !== null && chip(`Average ${binLabel(f.bin)}`, () => onClear({ bin: null }))}
      {!any && <span className="text-[12.5px] text-gray-500 dark:text-gray-400">Click any topic, year or bar to narrow the view.</span>}
    </div>
  )
}

function Kpis({ ctx }: { ctx: ChartCtx }) {
  const st = statOf(ctx.items)
  const n = Math.max(1, ctx.years.length)
  const shown = ctx.groups.filter(g => g.marks > 0)
  const costly = [...shown].filter(g => g.lost > 0).sort((a, b) => b.lost - a.lost)[0]
  const minMarks = Math.max(3, st.marks * 0.02)
  const hardest = [...shown].filter(g => g.score !== null && g.marks >= minMarks).sort((a, b) => (a.score ?? 1) - (b.score ?? 1))[0]
  // The two figures count up on arrival and glide when the filters change.
  const marks = Math.round(useTween(st.marks, { fromZero: true }))
  const score = useTween(st.score ?? 0, { fromZero: true })
  const tile = (i: number, label: string, value: ReactNode, sub: ReactNode, opts: { ink?: boolean; onClick?: () => void } = {}) => {
    const Tag = opts.onClick ? 'button' : 'div'
    return (
      <Tag
        type={opts.onClick ? 'button' : undefined}
        onClick={opts.onClick}
        style={stagger(i + 1)}
        className={`rise-in flex flex-col items-start justify-start text-left rounded-2xl px-5 py-4 min-w-0 transition-[transform,border-color] ${
          opts.ink ? 'bg-gray-900 dark:bg-blue-950 text-white border border-gray-900 dark:border-blue-900' : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800'
        } ${opts.onClick ? 'hover:-translate-y-0.5 hover:border-gray-400 dark:hover:border-gray-600' : ''}`}
      >
        <span className={`block text-[12px] font-semibold ${opts.ink ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'}`}>{label}</span>
        <span className={`block font-display font-bold tracking-tight leading-tight mt-1 line-clamp-2 tabular-nums ${opts.ink ? 'text-4xl text-white' : 'text-xl xl:text-[1.35rem] text-gray-900 dark:text-white'}`}>{value}</span>
        <span className={`block text-[12px] mt-1 line-clamp-2 ${opts.ink ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'}`}>{sub}</span>
      </Tag>
    )
  }
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {tile(0, 'Marks in View', marks.toLocaleString(), `${st.items} items${n > 1 ? `, ${fmt(st.marks / n)} a year` : ''}`, { ink: true })}
      {tile(1, 'Average Score', st.score === null ? '—' : pct(score), st.score === null ? 'Nothing scored in view' : `${bandOf(st.score) === 'hard' ? 'Hard' : bandOf(st.score) === 'medium' ? 'Middling' : 'Well done'} overall`)}
      {costly
        ? tile(2, 'Most Marks Lost', costly.label, `${fmt(costly.lost / n)} marks${n > 1 ? ' a year' : ''} dropped, of ${fmt(costly.marks / n)}`, { onClick: () => ctx.onGroup(costly.id) })
        : tile(2, 'Most Marks Lost', '—', 'Nothing scored in view')}
      {hardest ? tile(3, 'Hardest', hardest.label, `${pct(hardest.score)} average, ${hardest.marks} marks`, { onClick: () => ctx.onGroup(hardest.id) }) : tile(3, 'Hardest', '—', 'Nothing scored in view')}
    </div>
  )
}

function ListCaption({ ctx }: { ctx: ChartCtx }) {
  const f = ctx.focus
  const bits: string[] = []
  if (f.sub) bits.push(subLabel(ctx.subject, f.sub))
  else if (f.topic) bits.push(topicLabel(ctx.subject, f.topic))
  if (f.year) bits.push(String(f.year))
  if (f.bin !== null) bits.push(`average ${binLabel(f.bin)}`)
  return (
    <>
      {bits.length ? `Showing ${bits.join(' · ')}: ` : 'Everything in the filters: '}each MCQ and short-answer part, with VCAA’s average.
    </>
  )
}

function AboutNumbers() {
  return (
    <section className="text-[12.5px] text-gray-500 dark:text-gray-400 leading-relaxed max-w-3xl flex flex-col gap-2 px-1">
      <h2 className="font-display text-[15px] font-bold text-gray-700 dark:text-gray-200">About the Numbers</h2>
      <p>
        <b className="text-gray-700 dark:text-gray-300">Scores</b> are VCAA’s averages from the examination reports: an MCQ’s % correct, and a short-answer part’s average
        mark as a share of its marks. A topic’s score is weighted by marks. The colours use the same cut-offs as the worked-solutions sidebar.
      </p>
      <p>
        <b className="text-gray-700 dark:text-gray-300">Marks lost</b> are a topic’s marks minus the average student’s marks on them, from the same averages. The
        study-design comparison sets the yearly average from {STUDY_DESIGN_YEAR} against the years before it in view.
      </p>
      <p>
        <b className="text-gray-700 dark:text-gray-300">Topics.</b> Each MCQ and each short-answer part is filed under one subtopic, from its description in the archive and
        checked by hand. Some parts draw on two areas, so read small differences with care.
      </p>
      <p>
        <b className="text-gray-700 dark:text-gray-300">Not in archive</b> is marks from questions left out as off the current course — mostly Specialist Mechanics before 2023
        — and the two MCQs VCAA redacted in 2022. Exam 1 is 40 marks and Exam 2 is 80 in every year shown.
      </p>
      <p>
        <b className="text-gray-700 dark:text-gray-300">Chemistry</b> isn’t here: the archive holds only its hardest MCQs, so it can’t show how a paper splits.
      </p>
    </section>
  )
}
