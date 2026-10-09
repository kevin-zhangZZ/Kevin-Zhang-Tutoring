import { useLocation, useNavigate } from 'react-router-dom'
import DemoPage from '../DemoPage'
import Explore from './Explore'
import IsItANet from './IsItANet'
import '../demos.css'
import SegmentedControl from '../../../components/ui/SegmentedControl'

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
        <SegmentedControl
          variant="tabs"
          size="md"
          aria-label="Nets mode"
          className="mb-5"
          value={mode}
          onChange={id => navigate(TABS.find(t => t.id === id)!.path, { replace: true })}
          options={TABS.map(t => ({ value: t.id, label: t.label }))}
          idFor={id => `nets-tab-${id}`}
          controls="nets-panel"
        />
        <div role="tabpanel" id="nets-panel" aria-labelledby={`nets-tab-${mode}`}>
          {mode === 'explore' ? <Explore /> : <IsItANet />}
        </div>
      </div>
    </DemoPage>
  )
}
