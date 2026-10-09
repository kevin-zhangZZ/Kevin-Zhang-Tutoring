import { useLocation, useNavigate } from 'react-router-dom'
import MemorizationMode from './MemorizationMode'
import TestMode from './TestMode'
import LocateMode from './LocateMode'
import SegmentedControl from '../../components/ui/SegmentedControl'

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
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-1">Unit Circle</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          16 key angles — exact sin, cos, and tan values.
        </p>
      </div>

      {/* Tabs */}
      <SegmentedControl
        variant="tabs"
        size="md"
        aria-label="Unit Circle mode"
        className="mb-5"
        value={mode}
        onChange={id => navigate(`/unit-circle/${id}`, { replace: true })}
        options={TABS.map(({ id, label }) => ({ value: id, label }))}
        idFor={id => `uc-tab-${id}`}
        controls="uc-panel"
      />

      {/* Content */}
      <div role="tabpanel" id="uc-panel" aria-labelledby={`uc-tab-${mode}`}>
        {mode === 'memorize' && <MemorizationMode />}
        {mode === 'values'   && <TestMode />}
        {mode === 'locate'   && <LocateMode />}
      </div>
    </div>
  )
}
