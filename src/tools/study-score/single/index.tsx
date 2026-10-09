// Check My Marks: one set of exam marks scored against every year. In order: the headline (one
// number and its year-to-year range), Keep in Mind, Year by Year, and Marks Needed. The inputs
// live in the page's top card (MarkInputs), and the sticky mark bar is placed by the page.

import type { Ref } from 'react'
import type { Subject } from '../data.ts'
import { aheadOf } from '../format.ts'
import type { Projection } from '../model.ts'
import { Announce, KeepInMind } from '../shared.tsx'
import Headline from './Headline.tsx'
import MarksNeeded from './MarksNeeded.tsx'
import YearByYear from './YearByYear.tsx'

export default function CheckMarks({
  subject,
  marks,
  rows,
  typical,
  busy,
  endRef,
}: {
  subject: Subject
  marks: number[]
  /** The marks projected in every year, oldest first. */
  rows: Projection[]
  /** typicalOf(rows): the headline number wherever it appears. */
  typical: number
  /** A mark box holds something that isn't a mark: the results dim until it does. */
  busy: boolean
  /** The Marks Needed card, for the sticky mark bar. */
  endRef?: Ref<HTMLElement>
}) {
  const latest = rows[rows.length - 1]
  return (
    <div aria-busy={busy || undefined} className={`flex flex-col gap-5 transition-opacity motion-reduce:transition-none ${busy ? 'opacity-50' : ''}`}>
      <Headline rows={rows} typical={typical} />
      <KeepInMind subject={subject} nearTop={rows.some(r => r.score >= 45)} />
      <YearByYear subject={subject} marks={marks} rows={rows} />
      <MarksNeeded subject={subject} marks={marks} typical={typical} cardRef={endRef} />
      <Announce text={`Typical year ${typical}. In ${latest.year}: ${latest.score}, ${aheadOf(latest.pct)} of the state.`} />
    </div>
  )
}
