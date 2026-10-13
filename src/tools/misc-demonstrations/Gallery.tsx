import { useState } from 'react'
import { Link } from 'react-router-dom'
import Katex from '../../components/Katex'
import { DEMOS, type Demo, type DemoId } from './demos'
import PyramidThumb from './gallery/PyramidThumb'
import NetThumb from './gallery/NetThumb'
import './demos.css'
import { stagger } from '../../components/motion/Reveal'

// The Misc Demonstrations landing page: one wide row per demonstration, each with a live 3D
// thumbnail that turns slowly and reacts when the row is hovered or focused, and what's inside.

const THUMBS: Record<DemoId, { Thumb: (p: { active: boolean }) => JSX.Element; badge: React.ReactNode; hint: string; inside: string[] }> = {
  'pyramids-prisms': {
    Thumb: PyramidThumb,
    badge: <Katex tex="V = \tfrac{1}{3}Ah" />,
    hint: 'Hover to slide the slice up',
    inside: ['Six short steps', 'Predict, then check', 'Explore every control'],
  },
  nets: {
    Thumb: NetThumb,
    badge: 'SA = sum of the face areas',
    hint: 'Hover to fold it shut',
    inside: ['Nine solids', 'All 11 nets of a cube', 'Is It a Net? challenge'],
  },
}

export default function Gallery() {
  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 sm:py-12">
      <div className="rise-in mb-8 sm:mb-10" style={stagger(0)}>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-[-0.03em]">Misc Demonstrations</h1>
        <p className="mt-2 text-[15px] sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl">
          Interactive 3D shapes to rotate, slice and fold, for class or for working on your own.
        </p>
      </div>

      {/* One wide row per demonstration, the live model alternating sides. */}
      <div className="flex flex-col gap-5 sm:gap-6">
        {DEMOS.map((d, i) => <GalleryCard key={d.id} demo={d} index={i} />)}
      </div>
    </div>
  )
}

// Each card tracks its own hover and focus, so hovering one card never resets another that has
// keyboard focus, and a focused card stays in its hover pose until it loses focus.
function GalleryCard({ demo: d, index }: { demo: Demo; index: number }) {
  const [hover, setHover] = useState(false)
  const [focus, setFocus] = useState(false)
  const { Thumb, badge, hint, inside } = THUMBS[d.id]
  const flip = index % 2 === 1
  return (
    <Link
      to={`/misc-demonstrations/${d.id}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={stagger(index + 1)}
      className={`rise-in group grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-[0_28px_56px_-32px_rgba(30,64,175,0.45)] dark:hover:shadow-none hover:-translate-y-0.5 transition-[transform,box-shadow,border-color] duration-300 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`}
    >
      <div
        aria-hidden="true"
        className={`md-gallery-thumb relative border-b lg:border-b-0 border-gray-100 dark:border-gray-800 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950/60 dark:to-gray-900 ${
          flip ? 'lg:order-2 lg:border-l' : 'lg:border-r'
        }`}
      >
        <Thumb active={hover || focus} />
        <span className="absolute left-4 top-4 text-[13px] font-medium px-2.5 py-1 rounded-lg bg-white/90 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200">
          {badge}
        </span>
        <span className="hidden md:block absolute right-4 bottom-3 text-[12px] text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity motion-reduce:transition-none">
          {hint}
        </span>
      </div>
      <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
          {d.name}
        </h2>
        <p className="mt-2 text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed max-w-md">{d.tagline}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {inside.map(t => (
            <li key={t} className="text-[12.5px] font-medium px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">{t}</li>
          ))}
        </ul>
        <span className="mt-7 inline-flex items-center gap-2 self-start rounded-xl bg-blue-600 group-hover:bg-blue-700 px-5 py-2.5 text-[15px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-colors">
          Open
          <svg viewBox="0 0 16 16" className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </span>
      </div>
    </Link>
  )
}
