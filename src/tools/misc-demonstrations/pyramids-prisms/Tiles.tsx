import type { ReactNode } from 'react'
import { f1, f2, solidWords, trimNum, type PPGeometry, type PPState } from './model'

const U3 = ' u³'

export function Unit({ u }: { u: string }) {
  return <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-0.5">{u}</span>
}

export interface TileProps {
  label: ReactNode
  value: ReactNode
  sub?: ReactNode
  /** Small pill after the value (e.g. "Same as Upright"). */
  badge?: ReactNode
  /** Ring the tile (the Lesson points at the number that matters in each step). */
  highlight?: boolean
  /** Fade the tile (the Lesson's tiles that don't matter in this step). */
  dim?: boolean
}

/** One readout tile: small label, big number, one line of explanation. */
export function Tile({ label, value, sub, badge, highlight, dim }: TileProps) {
  return (
    <div
      className={`pp-tile bg-white dark:bg-gray-900 border rounded-xl p-3.5 min-w-0 ${
        highlight ? 'border-blue-400 ring-2 ring-blue-200 dark:border-blue-600 dark:ring-blue-900/60' : 'border-gray-200 dark:border-gray-800'
      } ${dim ? 'opacity-50' : ''}`}
    >
      <div className="text-[12.5px] text-gray-500 dark:text-gray-400">{label}</div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="text-2xl font-display font-semibold tabular-nums text-gray-900 dark:text-white">{value}</span>
        {badge}
      </div>
      {sub && <div className="text-[12px] text-gray-500 dark:text-gray-400 mt-0.5">{sub}</div>}
    </div>
  )
}

export function SameAsUprightBadge() {
  return (
    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 text-[11.5px] font-semibold rounded-full px-2 py-0.5">
      <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2.5 6.3l2.3 2.2 4.7-5" />
      </svg>
      Same as Upright
    </span>
  )
}

// ------------------------------------------------------------------------------------------------
// The four tiles, as data, so the Lesson can pick and highlight the ones a step needs
// ------------------------------------------------------------------------------------------------

export type TileId = 'A' | 'S' | 'V' | 'L'

export function baseAreaTile(g: PPGeometry, st: Pick<PPState, 'solid'>): TileProps {
  return {
    label: (
      <>
        Base Area <i>A</i>
      </>
    ),
    value: (
      <>
        {f1(g.A)}
        <Unit u="u²" />
      </>
    ),
    sub: g.circle ? (
      <>
        π<i>r</i>² with <i>r</i> = 2.5
      </>
    ) : st.solid === 'both' ? (
      'Same base for both solids'
    ) : (
      '1 grid square = 1 u²'
    ),
  }
}

export function sliceAreaTile(g: PPGeometry, st: Pick<PPState, 'solid'>): TileProps {
  const w = solidWords(g.curvy)
  let sub: ReactNode
  if (st.solid === 'prism') sub = 'Same as the base at every height'
  else if (st.solid === 'both') sub = `${w.Pc}’s slice. The ${w.Q}’s is ${f1(g.Av)} u².`
  else if (g.atApex)
    sub = (
      <>
        <i>k</i> = 0: just the apex
      </>
    )
  else if (g.atBase)
    sub = (
      <>
        <i>k</i> = 1: the base itself
      </>
    )
  else
    sub = (
      <>
        <i>k</i> = {f2(g.k)}, so <i>A</i> × {trimNum(g.k * g.k)}
      </>
    )
  return {
    label: (
      <>
        Slice Area at <i>z</i>
      </>
    ),
    value: (
      <>
        {st.solid === 'prism' ? f1(g.Av) : f1(g.sliceA)}
        <Unit u="u²" />
      </>
    ),
    sub,
  }
}

export function volumeTile(g: PPGeometry, st: Pick<PPState, 'solid'>): TileProps {
  const w = solidWords(g.curvy)
  const badge = g.s !== 0 && st.solid !== 'both' ? <SameAsUprightBadge /> : undefined
  if (st.solid === 'pyramid') {
    return {
      label: (
        <>
          {w.Pc} Volume ⅓<i>Ah</i>
        </>
      ),
      value: (
        <>
          {f1(g.Vpyr)}
          <Unit u="u³" />
        </>
      ),
      sub: (
        <>
          Same-base {w.Q}:{' '}
          <span className="whitespace-nowrap">
            <i>Ah</i> = {f1(g.Vpri) + U3}
          </span>
        </>
      ),
      badge,
    }
  }
  if (st.solid === 'prism') {
    return {
      label: (
        <>
          {w.Qc} Volume <i>Ah</i>
        </>
      ),
      value: (
        <>
          {f1(g.Vpri)}
          <Unit u="u³" />
        </>
      ),
      sub: (
        <>
          Same-base {w.P}:{' '}
          <span className="whitespace-nowrap">
            ⅓<i>Ah</i> = {f1(g.Vpyr) + U3}
          </span>
        </>
      ),
      badge,
    }
  }
  return {
    label: `${w.Pc} ÷ ${w.Qc}`,
    value: '⅓',
    sub: `${f1(g.Vpyr)} u³ ÷ ${f1(g.Vpri)} u³`,
  }
}

export function layerTile(g: PPGeometry, st: Pick<PPState, 'solid' | 'layerMode'>): TileProps {
  if (g.lifted) {
    return {
      label: (
        <>
          Top Piece <i>k</i>³<i>V</i>
        </>
      ),
      value: (
        <>
          {f1(g.topV)}
          <Unit u="u³" />
        </>
      ),
      sub: `Bottom piece (frustum): ${f1(g.frustumV)} u³`,
    }
  }
  if (!g.n) return { label: 'Layer Stack', value: 'Off', sub: 'Slide Layers above 0' }
  const value = (
    <>
      {f1(g.stackV)}
      <Unit u="u³" />
    </>
  )
  if (st.solid === 'prism') {
    return {
      label: 'Layer Stack',
      value,
      sub: (
        <>
          {g.n} {g.n === 1 ? 'layer' : 'layers'} · exactly <i>Ah</i>
        </>
      ),
    }
  }
  return {
    label: 'Layer Stack',
    value,
    sub: (
      <>
        {g.n} {g.n === 1 ? 'layer' : 'layers'} {st.layerMode} · {Math.round(g.stackRatio * 100)}% of ⅓<i>Ah</i>
      </>
    ),
  }
}

export function tileFor(id: TileId, g: PPGeometry, st: Pick<PPState, 'solid' | 'layerMode'>): TileProps {
  switch (id) {
    case 'A':
      return baseAreaTile(g, st)
    case 'S':
      return sliceAreaTile(g, st)
    case 'V':
      return volumeTile(g, st)
    default:
      return layerTile(g, st)
  }
}

/** A 2-column grid of tiles. */
export function Tiles({ ids, g, st, highlight = [], className = '' }: { ids: TileId[]; g: PPGeometry; st: Pick<PPState, 'solid' | 'layerMode'>; highlight?: TileId[]; className?: string }) {
  return <TileGrid tiles={ids.map((id) => ({ key: id, ...tileFor(id, g, st), highlight: highlight.includes(id) }))} className={className} />
}

/** A 2-column grid of ready-made tiles. */
export function TileGrid({ tiles, className = '' }: { tiles: (TileProps & { key: string })[]; className?: string }) {
  return (
    <div className={`grid grid-cols-2 gap-3 ${className}`} role="group" aria-label="Readouts">
      {tiles.map(({ key, ...t }) => (
        <Tile key={key} {...t} />
      ))}
    </div>
  )
}
