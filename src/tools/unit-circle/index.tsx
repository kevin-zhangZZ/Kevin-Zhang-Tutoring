import { useState } from 'react'
import MemorizationMode from './MemorizationMode'
import TestMode from './TestMode'
import LocateMode from './LocateMode'

type Mode = 'memorize' | 'test' | 'locate'

const TABS: Array<{ id: Mode; label: string }> = [
  { id: 'memorize', label: 'Memorize' },
  { id: 'test',     label: 'Values Test' },
  { id: 'locate',   label: 'Locate Test' },
]

export default function UnitCircle() {
  const [mode, setMode] = useState<Mode>('memorize')

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Unit Circle</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          16 key angles — exact sin, cos, and tan values.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mb-6 w-fit">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setMode(id)}
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
      {mode === 'test'     && <TestMode />}
      {mode === 'locate'   && <LocateMode />}
    </div>
  )
}
