import type { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { stagger } from '../../components/motion/Reveal'
import { useStoredState } from '../unit-circle/storage'
import { cardKey, subjects, type Deck, type Subject } from './data'
import { useProgress } from './progress'
import type { Settings } from './parts'
import Home, { type View } from './Home'
import Study from './Study'
import Sheet from './Sheet'
import Test from './Test'
import Match from './Match'
import './flashcards.css'

const VIEWS: View[] = ['study', 'sheet', 'test', 'match']

// Subject, deck and view are in the URL (#/flashcards/chemistry/ions/test), so a refresh, Back
// or a shared link lands in the same place (a session in progress starts afresh). A topic opened
// to read is #/flashcards/specialist/trig-identities/topic/Double%20Angle.
export default function Flashcards() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [, , subjectSeg, deckSeg, viewSeg, topicSeg] = pathname.split('/')
  const subject = subjects.find(s => s.id === subjectSeg) ?? subjects[0]
  const deck = subject.decks.find(d => d.id === deckSeg) ?? subject.decks[0]

  return (
    <div className="max-w-2xl lg:max-w-6xl mx-auto px-5 sm:px-8 py-6 sm:py-8">
      <div className="mb-6 lg:mb-8">
        <div className="rise-in" style={stagger(0)}>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-[-0.03em] mb-1.5">Flashcards</h1>
          <p className="text-[15px] text-gray-500 dark:text-gray-400">The formulas, rules and facts to know cold, for Methods, Specialist and Chemistry.</p>
        </div>
      </div>

      <div className="rise-in" style={stagger(2)}>
        {/* Keyed by deck: each deck remembers its own settings. */}
        <DeckPage
          key={deck.id}
          subject={subject}
          deck={deck}
          viewSeg={viewSeg}
          topicSeg={topicSeg}
          go={(s, d, v) => navigate(`/flashcards/${s}/${d}${v ? `/${v}` : ''}`)}
        />
      </div>
    </div>
  )
}

function DeckPage({ subject, deck, viewSeg, topicSeg, go }: {
  subject: Subject
  deck: Deck
  viewSeg?: string
  topicSeg?: string
  go: (subject: string, deck: string, view?: string) => void
}) {
  const view = VIEWS.find(v => v === viewSeg) ?? null
  const home = () => go(subject.id, deck.id)
  const open = (v: View) => go(subject.id, deck.id, v)

  const [stored, setStored] = useStoredState<Settings>(`fc-${deck.id}`, {
    groups: deck.groups,
    dir: 'fwd',
    starredOnly: false,
    testN: 20,
    testTypes: { mc: true, tf: true, write: true, gap: true },
  })
  // Groups remembered from an older version of the deck may no longer exist.
  const settings: Settings = { ...stored, groups: stored.groups.filter(g => deck.groups.includes(g)) }
  const onSettings = (patch: Partial<Settings>) => setStored(s => ({ ...s, ...patch }))

  const p = useProgress()
  const pool = deck.cards.filter(c =>
    settings.groups.includes(c.group)
    && !(settings.dir === 'rev' && c.oneWay)
    && (!settings.starredOnly || p.stars[cardKey(deck, c)]),
  )
  // One topic's cards to read, whatever is ticked.
  const topic = viewSeg === 'topic' ? deck.groups.find(g => g === decodeURIComponent(topicSeg ?? '')) : undefined
  // A view needs cards (Match needs two); without them (say, a link from another device) it's the deck page.
  const ready = view !== null && pool.length >= (view === 'match' ? 2 : 1)

  if (topic) return <Focus><Sheet key={topic} deck={deck} pool={deck.cards.filter(c => c.group === topic)} dir="fwd" open onExit={home} /></Focus>
  if (!ready) {
    return (
      <Home
        subject={subject}
        deck={deck}
        settings={settings}
        onSettings={onSettings}
        pool={pool}
        onSubject={s => go(s, subjects.find(x => x.id === s)!.decks[0].id)}
        onDeck={d => go(subject.id, d)}
        onStart={open}
        onTopic={g => go(subject.id, deck.id, `topic/${encodeURIComponent(g)}`)}
      />
    )
  }
  if (view === 'study') return <Focus><Study deck={deck} pool={pool} dir={settings.dir} onExit={home} onTest={() => open('test')} /></Focus>
  if (view === 'sheet') return <Focus><Sheet deck={deck} pool={pool} dir={settings.dir} onExit={home} /></Focus>
  if (view === 'test') return <Focus><Test deck={deck} pool={pool} settings={settings} onSettings={onSettings} onExit={home} /></Focus>
  return <Focus><Match pool={pool} subjectId={subject.id} onExit={home} /></Focus>
}

/** A study view sits in a centred column, so a card is where the eye already is. */
function Focus({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-3xl">{children}</div>
}
