import { useLocation, useNavigate } from 'react-router-dom'
import DemoPage from '../DemoPage'
import Explore from './Explore'
import IsItANet from './IsItANet'
import '../demos.css'

// Two modes, kept in the URL so refresh and Back work: #/misc-demonstrations/nets (Explore) and
// #/misc-demonstrations/nets/is-it-a-net (the cube challenge).
type Mode = 'explore' | 'is-it-a-net'
const TABS: { id: Mode; label: string; path: string }[] = [
  { id: 'explore', label: 'Explore', path: '/misc-demonstrations/nets' },
  { id: 'is-it-a-net', label: 'Is It a Net?', path: '/misc-demonstrations/nets/is-it-a-net' },
]

export default function Nets() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const mode: Mode = pathname.split('/')[3] === 'is-it-a-net' ? 'is-it-a-net' : 'explore'

  return (
    <DemoPage
      id="nets"
      intro={mode === 'explore'
        ? 'A net is the flat shape you fold up to make a solid. Click or tap any face, edge or corner in either picture and its partner lights up in the other.'
        : 'A net is the flat shape you fold up to make a solid. Decide whether each pattern of six squares folds up into a cube, then watch it fold to check.'}
    >
      <div className="md-nets">
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mb-5 w-fit" role="tablist" aria-label="Nets mode">
          {TABS.map(t => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={mode === t.id}
              onClick={() => { if (mode !== t.id) navigate(t.path, { replace: true }) }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                mode === t.id
                  ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        {mode === 'explore' ? <Explore /> : <IsItANet />}
      </div>
    </DemoPage>
  )
}
