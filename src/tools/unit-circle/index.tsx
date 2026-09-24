import { useLocation, useNavigate } from 'react-router-dom'
import MemorizationMode from './MemorizationMode'
import TestMode from './TestMode'
import LocateMode from './LocateMode'

type Mode = 'memorize' | 'values' | 'locate'

// The mode is in the URL (#/unit-circle/locate), so a refresh, Back or a shared link keeps it.
const TABS: Array<{ id: Mode; label: string }> = [
  { id: 'memorize', label: 'Memorize' },
  { id: 'values',   label: 'Values' },
  { id: 'locate',   label: 'Locate' },
]

export default function UnitCircle() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const segment = pathname.split('/')[2]
  const mode: Mode = TABS.some(t => t.id === segment) ? (segment as Mode) : 'memorize'

  return (
    <div className="max-w-2xl lg:max-w-5xl mx-auto px-5 sm:px-6 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Unit Circle</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          16 key angles — exact sin, cos, and tan values.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mb-5 w-fit" role="tablist" aria-label="Unit Circle mode">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            role="tab"
            aria-selected={mode === id}
            onClick={() => navigate(`/unit-circle/${id}`, { replace: true })}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              mode === id
                ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      {mode === 'memorize' && <MemorizationMode />}
      {mode === 'values'   && <TestMode />}
      {mode === 'locate'   && <LocateMode />}
    </div>
  )
}
