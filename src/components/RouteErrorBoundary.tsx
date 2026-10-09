import { Component, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

// Tool pages are lazy chunks with hashed names. A tab left open across a deploy asks for a
// chunk that no longer exists, and React.lazy caches that rejection — without a boundary the
// whole app goes blank. Catch it here, say what happened calmly, and offer a reload.
class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <div className="max-w-xl mx-auto px-4 py-16">
        <div role="alert" className="border-[1.5px] border-dashed border-gray-300 dark:border-gray-700 rounded-2xl px-7 py-9 text-center text-[13.5px] leading-relaxed text-gray-500 dark:text-gray-400">
          This page couldn’t load — the site may have just been updated.
          <div className="mt-4">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="underline underline-offset-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    )
  }
}

// Keyed by pathname so moving to another page clears a previous failure.
export default function RouteErrorBoundary({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  return <Boundary key={pathname}>{children}</Boundary>
}
