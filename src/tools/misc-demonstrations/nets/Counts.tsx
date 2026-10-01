// Faces, Vertices and Edges: three tiles that start Count Along, Euler's rule, and this net's
// fold lines and taped pairs. Curved solids get the "Euler doesn't apply" note instead.
import Katex from '../../../components/Katex'
import type { NetShape, NetInfo } from '../lib/nets.ts'
import { FOCUS, type CountState, type Kind } from './common'

export default function Counts({ ns, ni, count, onCount }: { ns: NetShape; ni: NetInfo; count: CountState | null; onCount(k: Kind): void }) {
  if (ns.curved) {
    const c = ns.curved
    return (
      <>
        <p className="text-[13px] text-gray-700 dark:text-gray-200">{c.counts}.</p>
        <div className="mt-3 rounded-lg border px-3.5 py-2.5 text-[13px] leading-relaxed border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-200">
          Euler’s rule <Katex tex="F + V - E = 2" /> is for polyhedra — solids whose faces are all flat polygons. A {c.what} has a curved surface, so the rule doesn’t apply.
        </div>
        <p className="mt-2 text-[13px] text-gray-600 dark:text-gray-400">{c.tapedNote}</p>
      </>
    )
  }
  const E = ns.euler!
  const tile = (kind: Kind, n: number, cap: string, letter: string) => {
    const on = !!count && count.kind === kind
    return (
      <button
        type="button"
        aria-pressed={on}
        onClick={() => onCount(kind)}
        className={'flex flex-col items-center justify-start rounded-lg border p-3 text-center min-h-11 transition-colors ' + FOCUS + ' ' +
          (on ? 'border-blue-600 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/40' : 'border-gray-200 bg-gray-50 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800/60 dark:hover:border-gray-600')}
      >
        <div className="text-2xl font-display font-semibold tabular-nums text-gray-900 dark:text-white">{n}</div>
        <div className="text-[12.5px] font-semibold text-gray-700 dark:text-gray-200">{cap} (<i className="font-serif">{letter}</i>)</div>
        <div className="text-[11px] text-gray-500 dark:text-gray-400 tabular-nums">{on ? count!.n + ' of ' + count!.list.length : 'Count Them'}</div>
      </button>
    )
  }
  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {tile('face', E.F, 'Faces', 'F')}
        {tile('vertex', E.V, 'Vertices', 'V')}
        {tile('edge', E.E, 'Edges', 'E')}
      </div>
      <div className="mt-3 rounded-lg border px-3.5 py-2.5 text-[13px] leading-relaxed border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100">
        <span className="font-semibold"><Katex tex={`F + V - E = ${E.F} + ${E.V} - ${E.E} = ${E.F + E.V - E.E}`} /></span>
        <br />Euler’s rule — it works for every polyhedron.
      </div>
      <p className="mt-2 text-[13px] text-gray-600 dark:text-gray-400">
        This net: {ni.foldLines} fold lines (always <i className="font-serif">F</i> − 1) and {ni.tapedPairs} pairs of taped edges, so {ni.outsideEdges} edges around the outside.
      </p>
    </>
  )
}
