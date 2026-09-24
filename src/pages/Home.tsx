import { Link } from 'react-router-dom'
import { tools, contactTool } from '../tools/registry'
import { QUESTIONS, SUBJECTS, SUBJECT_NAME, type QuestionMeta } from '../tools/worked-solutions/data'
import { questionPath, subjectPath } from '../tools/worked-solutions/routes'

// Set by the worked solutions (worked-solutions/index.tsx) each time a question is opened.
const LAST_QUESTION_KEY = 'ws-last-question'

function readLastQuestion(): QuestionMeta | undefined {
  try {
    const id = localStorage.getItem(LAST_QUESTION_KEY)
    return id ? QUESTIONS.find(q => q.id === id) : undefined
  } catch {
    return undefined
  }
}

// "Q2(a–f)" → "Q2": the sub-parts don't belong in a one-line label.
const mainCode = (code: string) => code.replace(/\(.*\)\s*$/, '').trim()

const featured = tools.find(t => t.id === 'worked-solutions')!
const others = tools.filter(t => t !== featured && t.section !== 'contact')
const counts = SUBJECTS.map(s => ({ ...s, count: QUESTIONS.filter(q => q.subject === s.id).length }))

export default function Home() {
  const last = readLastQuestion()
  const lastLabel = last && `${SUBJECT_NAME[last.subject]} ${last.year} · ${last.exam} · ${mainCode(last.code)}`

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-6 py-8 md:py-12">
      <div className="mb-6 md:mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 md:mb-3">VCE Tools</h1>
        <p className="text-gray-500 dark:text-gray-400 md:text-lg max-w-xl">Free interactive resources from Kevin Zhang Tutoring</p>
      </div>

      {/* Phones: Continue, then every tool as a compact row, so all of it fits on one screen. */}
      <div className="md:hidden flex flex-col gap-3">
        {last && (
          <Link
            to={questionPath(last)}
            className="rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900 px-4 py-3 text-sm"
          >
            <span className="text-gray-500 dark:text-gray-400">Continue: </span>
            <span className="font-semibold text-blue-800 dark:text-blue-300">{lastLabel} ›</span>
          </Link>
        )}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl divide-y divide-gray-100 dark:divide-gray-800">
          {tools.map(tool => (
            <Link key={tool.id} to={tool.route} className="flex items-center gap-3 px-4 py-3">
              <span className="text-xl leading-none w-6 text-center">{tool.icon}</span>
              <span className="flex-1 min-w-0">
                <span className="block text-[15px] font-semibold text-gray-900 dark:text-white">{tool.name}</span>
                <span className="block text-[13px] text-gray-500 dark:text-gray-400">{tool.tagline}</span>
              </span>
              <span className="text-gray-300 dark:text-gray-600" aria-hidden>›</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Laptops: Exam Explanations first and widest, the other tools below, contact as a line. */}
      <div className="hidden md:flex flex-col gap-4">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
          <Link to={featured.route} className="group block">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              <span className="mr-2">{featured.icon}</span>{featured.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mt-1 max-w-2xl">{featured.description}</p>
          </Link>
          <div className="flex flex-wrap gap-2 mt-4">
            {counts.map(s => (
              <Link
                key={s.id}
                to={subjectPath(s.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  s.id === 'chemistry'
                    ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-950'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {s.label} <span className="font-normal opacity-80 tabular-nums">{s.count}</span>
              </Link>
            ))}
          </div>
          {last && (
            <Link
              to={questionPath(last)}
              className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-baseline justify-between gap-2 text-sm group"
            >
              <span className="text-gray-500 dark:text-gray-400">Continue where you left off</span>
              <span className="font-semibold text-blue-700 dark:text-blue-300 group-hover:underline underline-offset-2">{lastLabel} ›</span>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {others.map(tool => (
            <Link
              key={tool.id}
              to={tool.route}
              className="group rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md dark:hover:shadow-none transition-all duration-200"
            >
              <div className="text-2xl mb-3 leading-none">{tool.icon}</div>
              <h2 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {tool.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{tool.description}</p>
            </Link>
          ))}
        </div>

        {contactTool && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
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
