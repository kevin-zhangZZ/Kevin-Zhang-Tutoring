import { Link } from 'react-router-dom'
import { DEMOS, type DemoId } from './demos'

// The frame every demonstration page shares: a back link to the gallery, the title and intro,
// the demo itself, then a link on to the other demonstrations.
export default function DemoPage({ id, intro, children }: { id: DemoId; intro: React.ReactNode; children: React.ReactNode }) {
  const demo = DEMOS.find(d => d.id === id)!
  const others = DEMOS.filter(d => d.id !== id)

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-6 py-6 sm:py-8">
      <nav aria-label="Breadcrumb" className="mb-2 text-sm">
        <Link
          to="/misc-demonstrations"
          className="inline-flex items-center gap-1 min-h-[44px] -my-2 font-medium text-blue-700 dark:text-blue-300 hover:underline underline-offset-2"
        >
          <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10 3 5 8l5 5" />
          </svg>
          Misc Demonstrations
        </Link>
      </nav>
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{demo.name}</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl">{intro}</div>
      </div>

      {children}

      {others.length > 0 && (
        <div className="mt-10">
          <div className="text-[13px] font-semibold text-gray-500 dark:text-gray-400 mb-2">Another Demonstration</div>
          <div className="flex flex-col gap-2">
            {others.map(d => (
              <Link
                key={d.id}
                to={`/misc-demonstrations/${d.id}`}
                className="group flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 hover:border-blue-400 dark:hover:border-blue-600 transition-colors motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <span className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 inline-flex items-center justify-center flex-none">
                  {ICONS[d.id]}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-[15px] font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">{d.name}</span>
                  <span className="block text-[13px] text-gray-500 dark:text-gray-400">{d.tagline}</span>
                </span>
                <svg viewBox="0 0 16 16" className="w-4 h-4 flex-none text-gray-300 dark:text-gray-600 group-hover:text-blue-500" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m6 3 5 5-5 5" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Small line icons for the "Another Demonstration" link (no emoji in-page).
const ICONS: Record<DemoId, JSX.Element> = {
  'pyramids-prisms': (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3 3.5 16.5 12 21l8.5-4.5z" />
      <path d="M12 3v18" />
    </svg>
  ),
  nets: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinejoin="round" aria-hidden="true">
      <path d="M8.5 2.5h7v7h-7zM1.5 9.5h7v7h-7zM8.5 9.5h7v7h-7zM15.5 9.5h7v7h-7zM8.5 16.5h7v5h-7z" />
    </svg>
  ),
}
