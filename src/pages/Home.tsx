import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { tools, contactTool, type ToolGroup } from '../tools/registry'
// Not data.ts: the whole question catalogue would land in the entry bundle. It's fetched after
// first paint, and only when there's a question to continue.
import { SUBJECTS } from '../tools/worked-solutions/subjects'
import { questionPath, subjectPath } from '../tools/worked-solutions/paths'
import type { QuestionMeta } from '../tools/worked-solutions/data'
import ToolIcon from '../components/ToolIcon'
import solutionLight from '../assets/home/solution-light.webp'
import solutionDark from '../assets/home/solution-dark.webp'

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

const featured = tools.find(t => t.id === 'worked-solutions')!
const others = tools.filter(t => t !== featured && t.section !== 'contact')
// The short names ("Methods"), so the Continue link fits on one line.
const SUBJECT_LABEL = Object.fromEntries(SUBJECTS.map(s => [s.id, s.label])) as Record<QuestionMeta['subject'], string>

// The other tools in two columns by their menu group: Exams on the left, Practice and Explore
// stacked on the right, so the columns come out about the same height.
const columns: ToolGroup[][] = [['Exams'], ['Practice', 'Explore']]

export default function Home() {
  const last = useLastQuestion()
  const lastLabel = last && `${SUBJECT_LABEL[last.subject]} ${last.year} ${last.exam} · ${mainCode(last.code)}`

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-6 py-8 md:py-12 lg:py-16">
      <section className="xl:grid xl:grid-cols-2 xl:items-center xl:gap-14 mb-6 md:mb-0">
        <div>
          <p className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2 md:mb-3">Free VCE tools from Kevin Zhang Tutoring</p>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-gray-900 dark:text-white tracking-tight leading-[1.1] text-balance">
            Past VCAA exams, explained step by step
          </h1>
          <p className="hidden md:block mt-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-[44ch]">
            Every Methods and Specialist question from 2014 to 2025, plus the hardest Chemistry, with full working and examiners’ comments.
          </p>
          <div className="hidden md:flex flex-wrap gap-3 mt-7">
            {SUBJECTS.map(s => (
              <Link
                key={s.id}
                to={subjectPath(s.id)}
                className="group inline-flex items-center gap-2.5 rounded-xl bg-blue-600 pl-5 pr-4 py-3 text-[15px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_10px_24px_-12px_rgba(37,99,235,0.8)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-[background-color,transform] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                {s.label}
                <span aria-hidden className="text-white/70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white">→</span>
              </Link>
            ))}
          </div>
          {last && (
            <Link to={questionPath(last)} className="hidden md:inline-block mt-5 text-sm group">
              <span className="text-gray-500 dark:text-gray-400">Continue where you left off: </span>
              <span className="font-semibold text-blue-700 dark:text-blue-300 group-hover:underline underline-offset-2 whitespace-nowrap">{lastLabel} ›</span>
            </Link>
          )}
        </div>

        {/* A real screenshot of 2023 Methods Exam 2 Q1 (light and dark), just a picture: not a link.
            Fades out at the bottom (border included) so the page reads as continuing. */}
        <div className="hidden xl:block relative max-h-[min(38rem,calc(100dvh-8rem))] overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 shadow-[0_28px_56px_-28px_rgba(30,64,175,0.35)] dark:shadow-none [mask-image:linear-gradient(to_bottom,black_72%,transparent)]">
          <img src={solutionLight} width={960} height={1480} alt="" className="block w-full h-auto dark:hidden" />
          {/* Lazy, so light-mode visitors never download it (hidden lazy images aren't fetched). */}
          <img src={solutionDark} width={960} height={1480} alt="" loading="lazy" className="hidden w-full h-auto dark:block" />
        </div>
      </section>

      {/* Phones: Continue, then every tool as a compact row, so all of it fits on one screen. */}
      <div className="md:hidden flex flex-col gap-3">
        {last && (
          <Link
            to={questionPath(last)}
            className="rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 px-4 py-3 text-sm"
          >
            <span className="text-blue-700 dark:text-gray-400">Continue: </span>
            <span className="font-semibold text-blue-800 dark:text-blue-300">{lastLabel} ›</span>
          </Link>
        )}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl divide-y divide-gray-100 dark:divide-gray-800">
          {tools.map(tool => (
            <Link key={tool.id} to={tool.route} className="flex items-center gap-3 px-4 py-3">
              <ToolIcon name={tool.icon} size={22} className="text-gray-500 dark:text-gray-400" />
              <span className="flex-1 min-w-0">
                <span className="block text-[15px] font-semibold text-gray-900 dark:text-white">{tool.name}</span>
                <span className="block text-[13px] text-gray-500 dark:text-gray-400">{tool.tagline}</span>
              </span>
              <span className="text-gray-300 dark:text-gray-600" aria-hidden>›</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Tablets and laptops: the other tools under the hero, grouped as in the menu (two columns
          once there's room beside the side menu), contact as a line. */}
      <div className="hidden md:block mt-16 lg:mt-20">
        <div className="grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
          {columns.map(groups => (
            <div key={groups.join()} className="flex flex-col gap-8">
              {groups.map(group => (
                <section key={group}>
                  <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 pb-2 border-b border-gray-200 dark:border-gray-800">{group}</h2>
                  <ul className="mt-2">
                    {others.filter(t => t.group === group).map(tool => (
                      <li key={tool.id}>
                        <Link
                          to={tool.route}
                          className="group -mx-3 flex items-center gap-4 rounded-xl px-3 py-3 hover:bg-white dark:hover:bg-gray-900 transition-[background-color,transform] active:scale-[0.99]"
                        >
                          <span className="grid place-items-center shrink-0 size-11 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300">
                            <ToolIcon name={tool.icon} size={22} />
                          </span>
                          <span className="flex-1 min-w-0">
                            <span className="block font-semibold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300">{tool.name}</span>
                            <span className="block text-sm text-gray-500 dark:text-gray-400">{tool.tagline}</span>
                          </span>
                          <span className="text-gray-300 dark:text-gray-600 transition-transform group-hover:translate-x-0.5" aria-hidden>›</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          ))}
        </div>

        {contactTool && (
          <p className="mt-12 text-sm text-gray-500 dark:text-gray-400">
            Questions about tutoring?{' '}
            <Link to={contactTool.route} className="font-semibold text-blue-700 dark:text-blue-300 hover:underline underline-offset-2">
              Contact me →
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}
