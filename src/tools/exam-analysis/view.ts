// What every chart on the analysis page is given: the filtered items, the groups to draw at
// the current level, what's been clicked, and what to do on a click.

import type { AnalysisSubject } from './taxonomy'
import type { Filters, Group, Item, Level } from './model'

/** What the reader has clicked: a topic or subtopic, a year, a 5% difficulty band. The
 *  question list at the bottom shows exactly these. A picked topic also zooms every chart
 *  into its subtopics. */
export interface Focus {
  topic: string | null
  sub: string | null
  year: number | null
  bin: number | null
}

export const NO_FOCUS: Focus = { topic: null, sub: null, year: null, bin: null }

export interface ChartCtx {
  subject: AnalysisSubject
  filters: Filters
  /** Every item in the filters, narrowed to the picked topic if there is one. */
  items: Item[]
  /** The rows to draw: topics, or subtopics (of the picked topic, if there is one). */
  groups: Group[]
  level: Level
  years: number[]
  /** Marks the archive doesn't hold, per year, in the filtered papers (none once zoomed in). */
  missing: Map<number, number>
  focus: Focus
  onGroup: (id: string) => void
  /** Sets the year filter to this one year. */
  onYear: (year: number) => void
  /** A topic/subtopic in one year: lists just those questions. */
  onCell: (id: string, year: number) => void
  onBin: (bin: number) => void
}

export function isPicked(ctx: ChartCtx, id: string): boolean {
  return ctx.focus.sub === id || (ctx.focus.sub === null && ctx.focus.topic === id)
}

export function yearCount(ctx: ChartCtx): number {
  return Math.max(1, ctx.years.length)
}

export function missingTotal(ctx: ChartCtx): number {
  let s = 0
  for (const v of ctx.missing.values()) s += v
  return s
}
