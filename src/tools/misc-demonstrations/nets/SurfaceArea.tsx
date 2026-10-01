// Surface Area: one row per face (click a row to select that face), the total, the worked formula
// and, for the square pyramid and cone, the slant-height warning.
import Katex from '../../../components/Katex'
import type { NetShape } from '../lib/nets.ts'
import { FaceSwatch, RichText, type Sel } from './common'

export default function SurfaceArea({ ns, sel, onFace }: { ns: NetShape; sel: Sel | null; onFace(id: string): void }) {
  const selF = sel && sel.kind === 'face' ? sel.id : null
  return (
    <>
      <table className="w-full text-[13px]">
        <thead>
          <tr className="text-left text-[12px] text-gray-500 dark:text-gray-400">
            <th className="font-semibold pb-1.5 pl-[11px]">Face</th>
            <th className="font-semibold pb-1.5">Shape</th>
            <th className="font-semibold pb-1.5 pr-2 text-right">Area (cm²)</th>
          </tr>
        </thead>
        <tbody>
          {ns.faces.map(f => {
            const on = f.id === selF
            return (
              <tr
                key={f.id}
                tabIndex={0}
                role="button"
                aria-pressed={on}
                aria-label={f.title + ', ' + f.areaText + ' square centimetres'}
                onClick={() => onFace(f.id)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onFace(f.id) } }}
                className={'nets-sa-row cursor-pointer border-l-[3px] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 ' +
                  (on ? 'border-l-blue-600 bg-blue-50 dark:bg-blue-950/40' : 'border-l-transparent hover:bg-gray-50 dark:hover:bg-gray-800/60')}
              >
                <td className="py-1.5 pl-2 pr-2">
                  <span className="inline-flex items-center gap-2"><FaceSwatch ci={f.ci} /><span className="font-medium text-gray-800 dark:text-gray-100">{f.name}</span></span>
                </td>
                <td className="py-1.5 pr-2 text-gray-600 dark:text-gray-300">{f.shape}</td>
                <td className="py-1.5 pr-2 text-right tabular-nums text-gray-800 dark:text-gray-100">{f.areaText}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2 text-[13px]">
        <p className="text-gray-600 dark:text-gray-300">{ns.total.text}</p>
        <p className="mt-1 text-gray-900 dark:text-white max-w-full overflow-x-auto"><Katex tex={ns.formula.tex} /></p>
        {ns.formulaNote && <p className="text-[12.5px] text-gray-500 dark:text-gray-400 mt-0.5">{ns.formulaNote}</p>}
      </div>
      {ns.mistake && (
        <div className="mt-3 rounded-lg border px-3.5 py-2.5 text-[13px] leading-relaxed border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
          <RichText text={ns.mistake} />
        </div>
      )}
    </>
  )
}
