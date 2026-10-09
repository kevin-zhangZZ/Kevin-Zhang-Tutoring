import { useState } from 'react'
import { Link } from 'react-router-dom'
import Katex from '../../components/Katex'
import { DEMOS, type Demo, type DemoId } from './demos'
import PyramidThumb from './gallery/PyramidThumb'
import NetThumb from './gallery/NetThumb'
import './demos.css'

// The Misc Demonstrations landing page: one card per demonstration, each with a small live 3D
// thumbnail that turns slowly and reacts when the card is hovered or focused.

const THUMBS: Record<DemoId, { Thumb: (p: { active: boolean }) => JSX.Element; badge: React.ReactNode; hint: string }> = {
  'pyramids-prisms': {
    Thumb: PyramidThumb,
    badge: <Katex tex="V = \tfrac{1}{3}Ah" />,
    hint: 'Hover to slide the slice up',
  },
  nets: {
    Thumb: NetThumb,
    badge: 'SA = sum of the face areas',
    hint: 'Hover to fold it shut',
  },
}

export default function Gallery() {
  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-6 py-6 sm:py-8">
      <div className="mb-5">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-1">Misc Demonstrations</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Interactive 3D shapes to rotate, slice and fold, for class or for working on your own.
        </p>
      </div>

      {/* One column between md and lg, where the sidebar leaves the page only ~470 px. */}
      <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4">
        {DEMOS.map(d => <GalleryCard key={d.id} demo={d} />)}
      </div>
    </div>
  )
}

// Each card tracks its own hover and focus, so hovering one card never resets another that has
// keyboard focus, and a focused card stays in its hover pose until it loses focus.
function GalleryCard({ demo: d }: { demo: Demo }) {
  const [hover, setHover] = useState(false)
  const [focus, setFocus] = useState(false)
  const { Thumb, badge, hint } = THUMBS[d.id]
  return (
    <Link
      to={`/misc-demonstrations/${d.id}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      className="group flex flex-col rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md dark:hover:shadow-none transition-all duration-200 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <div
        aria-hidden="true"
        className="md-gallery-thumb relative border-b border-gray-100 dark:border-gray-800 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950/60 dark:to-gray-900"
      >
        <Thumb active={hover || focus} />
        <span className="absolute left-3 top-3 text-[12.5px] font-medium px-2 py-0.5 rounded-md bg-white/85 dark:bg-gray-900/85 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200">
          {badge}
        </span>
        <span className="hidden md:block absolute right-3 bottom-2 text-[11.5px] text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity motion-reduce:transition-none">
          {hint}
        </span>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h2 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {d.name}
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{d.tagline}</p>
        <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 dark:text-blue-300">
          Open
          <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </span>
      </div>
    </Link>
  )
}
