import Katex from '../../../components/Katex'
import { kFraction, solidWords, texNum, type PPGeometry, type PPState } from './model'

const U2 = '\\text{ u}^2'
const U3 = '\\text{ u}^3'

export function pyramidVolumeTex(g: PPGeometry): string {
  const h = texNum(g.h, 1)
  if (g.circle) return `V = \\tfrac{1}{3}\\pi r^2 h = \\tfrac{1}{3} \\times \\pi \\times 2.5^2 \\times ${h} = ${texNum(g.Vpyr, 2)}${U3}`
  return `V = \\tfrac{1}{3} \\times A \\times h = \\tfrac{1}{3} \\times ${texNum(g.Av, 2)} \\times ${h} = ${texNum(g.Vpyr, 2)}${U3}`
}
export function prismVolumeTex(g: PPGeometry): string {
  const h = texNum(g.h, 1)
  if (g.circle) return `V = \\pi r^2 h = \\pi \\times 2.5^2 \\times ${h} = ${texNum(g.Vpri, 2)}${U3}`
  return `V = A \\times h = ${texNum(g.Av, 2)} \\times ${h} = ${texNum(g.Vpri, 2)}${U3}`
}
/** A(z) = A × (1 − z/h)² = … with k as an exact fraction where it is a tidy one. */
export function pyramidSliceTex(g: PPGeometry): string {
  const kf = kFraction(g.z, g.h)
  const kk = kf === null ? texNum(g.k, 4) : kf.q === 1 ? String(kf.p) : `\\tfrac{${kf.p}}{${kf.q}}`
  const A = texNum(g.Av, 2)
  return `A(z) = A \\times \\left(1 - \\tfrac{z}{h}\\right)^2 = ${A} \\times \\left(1 - \\tfrac{${texNum(g.z, 1)}}{${texNum(g.h, 1)}}\\right)^2 = ${A} \\times \\left(${kk}\\right)^2 = ${texNum(g.sliceA, 2)}${U2}`
}
export function prismSliceTex(g: PPGeometry): string {
  return `A(z) = A = ${texNum(g.Av, 2)}${U2} \\text{ for every } z`
}

function Tag({ children }: { children: string }) {
  return <span className="inline-block min-w-[4.5rem] text-[12.5px] font-semibold text-gray-500 dark:text-gray-400">{children}</span>
}

/** The working lines: the volume and slice-area calculations with this state's numbers. With
 *  `hiddenSlice`, the slice-area line stops at the formula and shows that text instead of the
 *  number (the Lesson, until step 3's prediction). */
export function WorkingLines({ g, st, hiddenSlice }: { g: PPGeometry; st: Pick<PPState, 'solid'>; hiddenSlice?: string }) {
  const w = solidWords(g.curvy)
  const slice = hiddenSlice ? String.raw`A(z) = A \times \left(1 - \tfrac{z}{h}\right)^2 = \, ?` : pyramidSliceTex(g)
  let lines: { tag?: string; tex: string; note?: string }[]
  if (st.solid === 'pyramid') lines = [{ tex: pyramidVolumeTex(g) }, { tex: slice, note: hiddenSlice }]
  else if (st.solid === 'prism') lines = [{ tex: prismVolumeTex(g) }, { tex: prismSliceTex(g) }]
  else
    lines = [
      { tag: w.Pc, tex: pyramidVolumeTex(g) },
      { tag: w.Qc, tex: prismVolumeTex(g) },
      { tag: 'Slice', tex: slice, note: hiddenSlice },
    ]
  return (
    <div className="pp-working mt-1.5 flex flex-col gap-1.5 text-[14px] tabular-nums text-gray-800 dark:text-gray-100 leading-relaxed">
      {lines.map((l, i) => (
        <div key={i}>
          {l.tag && <Tag>{l.tag}</Tag>}
          <Katex tex={l.tex} />
          {l.note && <span className="ml-1.5 text-[12.5px] text-gray-500 dark:text-gray-400">({l.note})</span>}
        </div>
      ))}
    </div>
  )
}

/** The Working card. */
export function Working({ g, st, className = '' }: { g: PPGeometry; st: Pick<PPState, 'solid'>; className?: string }) {
  return (
    <section className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 ${className}`} aria-label="Working">
      <h2 className="text-[12.5px] font-semibold text-gray-500 dark:text-gray-400">Working</h2>
      <WorkingLines g={g} st={st} />
    </section>
  )
}
