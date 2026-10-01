import type { ReactNode } from 'react'
import { f1, f2, solidWords, trimNum, type PPGeometry, type PPState } from './model'

export type NoticeTone = 'neutral' | 'good' | 'warn'

const TONES: Record<NoticeTone, string> = {
  neutral: 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800/60 dark:text-gray-200 dark:border-gray-800',
  good: 'bg-emerald-50 text-emerald-900 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-100 dark:border-emerald-900',
  warn: 'bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950/40 dark:text-amber-100 dark:border-amber-900',
}

/** The strip under the stage: one sentence about what the picture is showing right now. */
export function NoticeBar({ tone, children }: { tone: NoticeTone; children: ReactNode }) {
  return (
    <div aria-live="polite" className={`border-t px-4 py-2.5 text-[13px] leading-relaxed ${TONES[tone]}`}>
      {children}
    </div>
  )
}

const U2 = ' u²'
const U3 = ' u³'

/** What the Explore notice says for this state (first match wins, as in the mockup). */
export function exploreNotice(g: PPGeometry, st: PPState): { tone: NoticeTone; body: ReactNode } {
  const w = solidWords(g.curvy)
  const mode = st.solid
  const third = (
    <>
      ⅓<i>Ah</i> = {f1(g.Vpyr) + U3}
    </>
  )
  const n = (body: ReactNode, tone: NoticeTone = 'neutral') => ({ tone, body })

  if (g.lifted) {
    return n(
      <>
        The top piece is a mini {w.P}, scaled by <i>k</i> = {f2(g.k)}. Lengths × {trimNum(g.k)}, areas × {trimNum(g.k * g.k)}, volume ×{' '}
        {trimNum(g.k * g.k * g.k)}: {f1(g.topV) + U3} of the whole {f1(g.Vpyr) + U3}.
      </>,
    )
  }
  if (st.slant) {
    if (mode !== 'prism') {
      // The apex can sit right above the front edge's line (or the front point), where l = h
      if (g.slant.length - g.h < 0.005) {
        return n(
          <>
            Here the slant {g.slant.kind === 'point' ? 'length' : 'height'} <i>l</i> = {f2(g.slant.length)} equals <i>h</i> = {f1(g.h)}, because the
            apex is straight above the {g.slant.kind === 'point' ? 'front of the base' : 'line of the front edge'}. Slide it and <i>l</i> gets longer,
            but the volume never changes.
          </>,
        )
      }
      if (g.slant.kind === 'point') {
        return n(
          <>
            The slant length <i>l</i> = {f2(g.slant.length)} runs from the apex down the side to the front of the base. It’s longer than{' '}
            <i>h</i> = {f1(g.h)}, and volume never uses it.
          </>,
        )
      }
      if (g.s === 0) {
        return n(
          <>
            The slant height <i>l</i> = {f2(g.slant.length)} of the front face is longer than <i>h</i> = {f1(g.h)}. It’s used for surface
            area, never for volume.
          </>,
        )
      }
      return n(
        <>
          The front face’s slant height <i>l</i> = {f2(g.slant.length)} is longer than <i>h</i> = {f1(g.h)}. Volume always uses the
          perpendicular height <i>h</i>, never a slanted length.
        </>,
      )
    }
    if (g.s === 0) return n(<>For an upright {w.Q} the edge is the height. Shear it and they differ.</>)
    return n(
      <>
        The slanted edge is {f2(g.edgeL)} long, but <i>V</i> = <i>Ah</i> uses the height <i>h</i> = {f1(g.h)}.
      </>,
    )
  }
  if (g.n > 0) {
    if (mode === 'prism') return n(<>Every layer of a {w.Q} is identical, so the stack is exactly <i>Ah</i> for any number of layers.</>)
    if (g.n === 1 && st.layerMode === 'inside')
      return n(<>One inside layer uses the slice at the top, which is just the apex point, so it holds nothing. Add more layers.</>)
    if (g.n === 1)
      return n(
        <>
          One outside layer is the whole {w.Q}, <i>Ah</i> = {f1(g.Vpri) + U3}. Add layers to trim it toward ⅓<i>Ah</i>.
        </>,
      )
    if (st.layerMode === 'inside')
      return n(
        <>
          These {g.n} steps fill {Math.round(g.stackRatio * 100)}% of the {w.P}. Thinner layers get closer to {third}.
        </>,
      )
    return n(
      <>
        These {g.n} steps overshoot by {Math.round((g.stackRatio - 1) * 100)}%. Thinner layers get closer to {third}.
      </>,
    )
  }
  if (mode === 'pyramid' && g.atApex) return n(<>At the apex the slice shrinks to a single point: <i>k</i> = 0, so its area is 0.</>)
  if (mode === 'pyramid' && g.atBase)
    return n(
      <>
        At <i>z</i> = 0 the slice is the base itself: <i>k</i> = 1.
      </>,
    )
  if (g.fOutside) {
    if (mode !== 'prism')
      return n(
        <>
          The apex is no longer above the base, but <i>h</i> is still measured straight down to the base’s plane (the dashed line). The volume
          is still {third}.
        </>,
        'warn',
      )
    return n(
      <>
        The top has slid so far that its centre is past the edge of the base, but the height is still the straight-up distance <i>h</i> ={' '}
        {f1(g.h)}, not the slanted edge ({f1(g.edgeL)}).
      </>,
      'warn',
    )
  }
  if (g.s !== 0) {
    if (mode !== 'prism')
      return n(<>Sliding the apex moves every slice sideways, but no slice changes area, so the volume is unchanged (Cavalieri’s principle).</>, 'good')
    return n(
      <>
        Shearing slides each slice across like a stack of coins. Same slices, same height, so <i>V</i> = <i>Ah</i> is unchanged.
      </>,
      'good',
    )
  }
  if (mode === 'pyramid' && g.half)
    return n(
      <>
        Halfway up, the slice is half as wide but only a quarter of the area: {f1(g.sliceA) + U2} out of {f1(g.A) + U2}.
      </>,
    )
  if (mode === 'both') return n(<>Same base, same height: the {w.P} is exactly ⅓ of the {w.Q}, whatever you change.</>, 'good')
  if (mode === 'prism')
    return n(
      <>
        Every slice of a {w.Q} is a copy of the base, so the volume is base area × height: <i>V</i> = <i>Ah</i>.
      </>,
    )
  return n(
    <>
      Each slice is the base shrunk toward the apex by <i>k</i> = 1 − <i>z</i>/<i>h</i> = {f2(g.k)}, so its area is <i>A</i> × <i>k</i>² ={' '}
      {f1(g.sliceA) + U2}.
    </>,
  )
}
