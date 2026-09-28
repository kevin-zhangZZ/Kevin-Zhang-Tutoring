// An interactive diagram inside a worked solution — the "let me show you why" moment a teacher
// would have at the whiteboard: drag a point, move a slider, press play, and watch the
// relationship the algebra relies on happen in front of you (AUTHORING_GUIDE §15).
//
// The frame is deliberately light. Each widget lives in its own file under ./interactives and is
// loaded with `lazyWidget(() => import('./interactives/…'))`, so the graphing library (mafs) and
// the widget's code only download when a student opens a question that has one — the rest of
// the tool never pays for them.
//
//   const MirrorWidget = lazyWidget(() => import('../interactives/meth-2020e1-q6-mirror'))
//   <Explore title="Why f and its inverse meet on y = x"><MirrorWidget /></Explore>
//
// In "Hide answers" mode an Explore is held back with the rest of the finished answer until the
// working is revealed, because most widgets show the answer. Pass `spoilerFree` for one that only
// builds intuition (it then shows straight away, like a Background).

import { Component, lazy, Suspense, type ComponentType, type ReactNode } from 'react'

export function lazyWidget(load: () => Promise<{ default: ComponentType }>) {
  return lazy(load)
}

class WidgetBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    if (this.state.failed) {
      return (
        <p className="text-[13px] text-gray-500 dark:text-gray-400 px-1 py-6 text-center">
          This interactive diagram couldn't load. Refresh the page to try again.
        </p>
      )
    }
    return this.props.children
  }
}

function Loading() {
  return (
    <div className="h-[300px] rounded-lg bg-gray-50 dark:bg-gray-800/40 animate-pulse flex items-center justify-center text-[12.5px] text-gray-400 dark:text-gray-500">
      Loading the interactive diagram…
    </div>
  )
}

export function Explore({
  title,
  children,
}: {
  /** What the student is about to see, as a question or claim: "Why f and f⁻¹ meet on y = x". */
  title: ReactNode
  /** The widget (a lazyWidget component). */
  children: ReactNode
  /** Only builds intuition and gives nothing away — show it before the working is revealed. */
  spoilerFree?: boolean
}) {
  return (
    <section
      data-explore
      className="rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-white dark:bg-gray-900 overflow-hidden"
    >
      <header className="flex items-center gap-2.5 px-4 py-2.5 bg-emerald-50/80 dark:bg-emerald-950/30 border-b border-emerald-100 dark:border-emerald-900/50">
        {/* Tabler "hand-click" (MIT) — the same pointing hand the sidebar uses to mark questions
            and parts that have one of these boxes. */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="flex-none w-[18px] h-[18px] text-emerald-600 dark:text-emerald-400"
          aria-hidden="true"
        >
          <path d="M8 13v-8.5a1.5 1.5 0 0 1 3 0v7.5" />
          <path d="M11 11.5v-2a1.5 1.5 0 0 1 3 0v2.5" />
          <path d="M14 10.5a1.5 1.5 0 0 1 3 0v1.5" />
          <path d="M17 11.5a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7l-.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47" />
          <path d="M5 3l-1 -1" />
          <path d="M4 7h-1" />
          <path d="M14 3l1 -1" />
          <path d="M15 6h1" />
        </svg>
        <div className="min-w-0">
          <p className="text-[10.5px] font-bold tracking-wider text-emerald-700 dark:text-emerald-400 leading-none mb-1">Try It Yourself</p>
          <p className="text-[13.5px] font-semibold text-gray-800 dark:text-gray-100 leading-snug">{title}</p>
        </div>
      </header>
      <div className="px-3 sm:px-4 py-4">
        <WidgetBoundary>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </WidgetBoundary>
      </div>
    </section>
  )
}
