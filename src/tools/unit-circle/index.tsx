import { useLocation, useNavigate } from 'react-router-dom'
import MemorizationMode from './MemorizationMode'
import TestMode from './TestMode'
import LocateMode from './LocateMode'
import SegmentedControl from '../../components/ui/SegmentedControl'
import { stagger } from '../../components/motion/Reveal'
import './unit-circle.css'

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
    <div className="max-w-2xl lg:max-w-6xl mx-auto px-5 sm:px-8 py-6 sm:py-8">
      {/* Header: the title, and the three modes beside it on laptops. */}
      <div className="mb-6 lg:mb-8 lg:flex lg:items-end lg:justify-between lg:gap-8">
        <div className="rise-in" style={stagger(0)}>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-[-0.03em] mb-1.5">Unit Circle</h1>
          <p className="text-[15px] text-gray-500 dark:text-gray-400">
            The 16 key angles and their exact trig values.
          </p>
        </div>
        <div className="rise-in mt-5 lg:mt-0" style={stagger(1)}>
      <SegmentedControl
        variant="tabs"
        size="md"
        aria-label="Unit Circle mode"
        value={mode}
        onChange={id => navigate(`/unit-circle/${id}`, { replace: true })}
        options={TABS.map(({ id, label }) => ({ value: id, label }))}
        idFor={id => `uc-tab-${id}`}
        controls="uc-panel"
      />
        </div>
      </div>

      {/* Content */}
      <div role="tabpanel" id="uc-panel" aria-labelledby={`uc-tab-${mode}`}>
        {mode === 'memorize' && <MemorizationMode />}
        {mode === 'values'   && <TestMode />}
        {mode === 'locate'   && <LocateMode />}
      </div>
    </div>
  )
}
