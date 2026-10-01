import { useLocation } from 'react-router-dom'
import Gallery from './Gallery'
import PyramidsPrisms from './pyramids-prisms'
import Nets from './nets'

// Each demonstration has its own page below the tool's route (#/misc-demonstrations/nets);
// the bare route is the gallery of cards.
export const BASE = '/misc-demonstrations'

export default function MiscDemonstrations() {
  const { pathname } = useLocation()
  const demo = pathname.split('/')[2]

  if (demo === 'pyramids-prisms') return <PyramidsPrisms />
  if (demo === 'nets') return <Nets />
  return <Gallery />
}
