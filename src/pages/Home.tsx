import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { tools, contactTool, type Tool } from '../tools/registry'
// Not data.ts: the whole question catalogue would land in the entry bundle. It's fetched after
// first paint, and only when there's a question to continue.
import { SUBJECTS } from '../tools/worked-solutions/subjects'
import { questionPath, subjectPath } from '../tools/worked-solutions/paths'
import type { QuestionMeta } from '../tools/worked-solutions/data'
import { Reveal, stagger } from '../components/motion/Reveal'
import { UnitCirclePreview, SpeedPreview, AnalysisPreview, StudyScorePreview, SkipPreview, DemoPreview, FlashcardsPreview } from './home/previews'
import solutionLight from '../assets/home/solution-light.webp'
import solutionDark from '../assets/home/solution-dark.webp'
import workingLight from '../assets/home/working-light.webp'
import workingDark from '../assets/home/working-dark.webp'

// Set by the worked solutions (worked-solutions/index.tsx) each time a question is opened.
const LAST_QUESTION_KEY = 'ws-last-question'

function readLastQuestionId(): string | null {
  try {
    return localStorage.getItem(LAST_QUESTION_KEY)
  } catch {
    return null
  }
}

function useLastQuestion(): QuestionMeta | undefined {
  const [last, setLast] = useState<QuestionMeta>()
  useEffect(() => {
    const id = readLastQuestionId()
    if (!id) return
    let live = true
    import('../tools/worked-solutions/data').then(({ QUESTIONS }) => {
      if (live) setLast(QUESTIONS.find(q => q.id === id))
    }, () => {})
    return () => {
      live = false
    }
  }, [])
  return last
}

// "Q2(a–f)" → "Q2": the sub-parts don't belong in a one-line label.
const mainCode = (code: string) => code.replace(/\(.*\)\s*$/, '').trim()

// The short names ("Methods"), so the Continue link fits on one line.
const SUBJECT_LABEL = Object.fromEntries(SUBJECTS.map(s => [s.id, s.label])) as Record<QuestionMeta['subject'], string>

const tool = (id: string) => tools.find(t => t.id === id)!

// The tool grid: each cell is a tool with a small live version of it. Spans make the rhythm
// (a wide row, three across, then one beside a wide one); `tone` varies the surfaces so it isn't six white boxes.
type Tone = 'plain' | 'tint' | 'ink'
const CELLS: Array<{ tool: Tool; preview: ReactNode; span: string; tone: Tone; row?: boolean }> = [
  { tool: tool('unit-circle'), preview: <UnitCirclePreview />, span: 'lg:col-span-2', tone: 'plain', row: true },
  { tool: tool('speed-maths'), preview: <SpeedPreview />, span: '', tone: 'ink' },
  { tool: tool('exam-analysis'), preview: <AnalysisPreview />, span: '', tone: 'plain' },
  { tool: tool('study-score'), preview: <StudyScorePreview />, span: '', tone: 'tint' },
  { tool: tool('exam-skip-guide'), preview: <SkipPreview />, span: '', tone: 'plain' },
  { tool: tool('flashcards'), preview: <FlashcardsPreview />, span: '', tone: 'plain' },
  { tool: tool('misc-demonstrations'), preview: <DemoPreview />, span: 'md:col-span-2', tone: 'tint', row: true },
]

const TONE: Record<Tone, { box: string; name: string; text: string }> = {
  plain: { box: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800', name: 'text-gray-900 dark:text-white', text: 'text-gray-500 dark:text-gray-400' },
  tint:  { box: 'bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50', name: 'text-gray-900 dark:text-white', text: 'text-blue-950/70 dark:text-blue-100/60' },
  ink:   { box: 'bg-gray-900 dark:bg-blue-950 border border-gray-900 dark:border-blue-900', name: 'text-white', text: 'text-white/70' },
}

function ToolCell({ tool, preview, tone, row }: { tool: Tool; preview: ReactNode; tone: Tone; row?: boolean }) {
  const t = TONE[tone]
  return (
    <Link
      to={tool.route}
      className={`group relative flex h-full flex-col gap-6 overflow-hidden rounded-2xl p-6 sm:p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(30,64,175,0.45)] dark:hover:shadow-none ${row ? 'xl:flex-row xl:items-center xl:justify-between' : ''} ${t.box}`}
    >
      <div className={row ? 'xl:max-w-[17rem]' : ''}>
        <h3 className={`font-display text-lg xl:text-xl font-bold tracking-tight ${t.name}`}>{tool.name}</h3>
        <p className={`mt-1.5 text-sm leading-relaxed ${t.text}`}>{tool.tagline}</p>
        <span className={`mt-4 inline-flex items-center gap-1.5 text-sm font-semibold ${tone === 'ink' ? 'text-blue-300' : 'text-blue-700 dark:text-blue-300'}`}>
          Open <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </span>
      </div>
      <div className={`mt-auto ${row ? 'xl:mt-0 xl:flex-1 xl:flex xl:justify-center' : ''}`}>{preview}</div>
    </Link>
  )
}

export default function Home() {
  const last = useLastQuestion()
  const lastLabel = last && `${SUBJECT_LABEL[last.subject]} ${last.year} ${last.exam} · ${mainCode(last.code)}`

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 md:py-12 xl:py-10">
      {/* Hero: the exam explanations, beside a stack of two real solution pages. */}
      <section className="xl:grid xl:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] xl:items-center xl:gap-12 xl:min-h-[min(44rem,calc(100dvh-5rem))]">
        <div>
          <p className="rise-in text-sm font-semibold text-blue-700 dark:text-blue-300 mb-3" style={stagger(0)}>Free VCE tools from Kevin Zhang Tutoring</p>
          <h1 className="rise-in font-display text-[2.4rem] leading-[1.04] sm:text-5xl lg:text-[2.9rem] xl:text-[3.3rem] font-bold text-gray-900 dark:text-white tracking-[-0.035em] text-balance" style={stagger(1)}>
            Past VCAA exams, explained step by step
          </h1>
          <p className="rise-in mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-[40ch]" style={stagger(2)}>
            Every Methods and Specialist question from 2014 to 2025, plus the hardest Chemistry, with full working and examiners’ comments.
          </p>
          <div className="rise-in flex flex-wrap gap-3 mt-7" style={stagger(3)}>
            {SUBJECTS.map(s => (
              <Link
                key={s.id}
                to={subjectPath(s.id)}
                className="group inline-flex items-center gap-2.5 rounded-xl bg-blue-600 pl-5 pr-4 py-3 xl:pl-6 xl:pr-5 xl:py-3.5 text-[15px] xl:text-base font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_12px_28px_-12px_rgba(37,99,235,0.85)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-[background-color,transform] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                {s.label}
                <span aria-hidden className="text-white/70 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white">→</span>
              </Link>
            ))}
          </div>
          {last && (
            <Link to={questionPath(last)} className="rise-in inline-block mt-6 text-sm group" style={stagger(4)}>
              <span className="text-gray-500 dark:text-gray-400">Continue where you left off: </span>
              <span className="font-semibold text-blue-700 dark:text-blue-300 group-hover:underline underline-offset-2 whitespace-nowrap">{lastLabel} ›</span>
            </Link>
          )}
        </div>

        {/* Two real worked solutions, one tucked behind the other. Pictures only, not links. */}
        <div className="hidden xl:block relative h-[36rem]" aria-hidden>
          <div className="settle-left absolute left-0 top-10 w-[74%]">
            <Shot light={workingLight} dark={workingDark} w={800} h={1233} />
          </div>
          <div className="settle-right absolute right-0 top-0 w-[80%]">
            <Shot light={solutionLight} dark={solutionDark} w={960} h={1480} front />
          </div>
        </div>
      </section>

      {/* Every other tool, each with a live miniature of what it does. */}
      <section className="mt-16 xl:mt-10">
        <Reveal>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">More free tools</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Practise the basics, plan your exam, see the maths move.</p>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CELLS.map((c, i) => (
            <Reveal key={c.tool.id} index={i % 3} className={c.span}>
              <ToolCell tool={c.tool} preview={c.preview} tone={c.tone} row={c.row} />
            </Reveal>
          ))}
        </div>
      </section>

      {contactTool && (
        <Reveal className="mt-16">
          <section className="relative overflow-hidden rounded-2xl bg-blue-600 px-7 py-10 sm:px-12 sm:py-12 text-white md:flex md:items-center md:justify-between md:gap-10">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-balance">Want help with Methods, Specialist or Chemistry?</h2>
              <p className="mt-3 text-blue-100 max-w-[44ch]">Ask me about tutoring, by email or on WeChat.</p>
            </div>
            <Link
              to={contactTool.route}
              className="group mt-7 md:mt-0 inline-flex shrink-0 items-center gap-3 rounded-xl bg-white px-6 py-3.5 font-semibold text-blue-700 shadow-[0_12px_28px_-12px_rgba(15,23,42,0.6)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-transform duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Contact me <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </section>
        </Reveal>
      )}
    </div>
  )
}

// One screenshot in light and dark, faded out at the bottom.
function Shot({ light, dark, w, h, front }: { light: string; dark: string; w: number; h: number; front?: boolean }) {
  return (
    // The front card fades into the page colour (opaque, so the card behind can't show through);
    // the back card simply fades out.
    <div className={`relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 max-h-[33rem] ${
      front ? 'shadow-[0_32px_64px_-32px_rgba(30,64,175,0.45)] dark:shadow-none' : 'opacity-90 dark:opacity-70 [mask-image:linear-gradient(to_bottom,black_60%,transparent)]'
    }`}>
      <img src={light} width={w} height={h} alt="" className="block w-full h-auto dark:hidden" />
      {/* Lazy, so light-mode visitors never download it (hidden lazy images aren't fetched). */}
      <img src={dark} width={w} height={h} alt="" loading="lazy" className="hidden w-full h-auto dark:block" />
      {front && <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-gray-50 dark:from-gray-950 to-transparent" />}
    </div>
  )
}
