// The panel between the two pictures: what the selected face, edge or corner is, how it folds,
// and Jump To pills for its neighbours. On phones only the first sentence shows until More.
import { useRef, type ReactNode } from 'react'
import { lenText, fmtDeg, listText, isWholeDeg, vertexFacts, faceEdgesOnNet, cornerCount, type NetShape, type NetInfo } from '../lib/nets.ts'
import {
  shapeIndex, faceName, inline, plainText, RichText, FaceSwatch, TagSwatch, FoldSwatch, FOCUS, PILL_OFF,
  type Sel, type Kind,
} from './common'

interface Jump { label: string; italic?: boolean; sel: { kind: Kind; id: string } }
interface PanelModel { swatch: ReactNode; heading: string; paras: string[]; jumps: Jump[] }

function panelModel(ns: NetShape, ni: NetInfo, s: Sel): PanelModel | null {
  if (ns.curved) return curvedPanel(ns, s)
  const ix = shapeIndex(ns)
  if (s.kind === 'face') {
    const fi = ix.info[s.id], sf = ix.face[s.id]
    if (!fi || !sf) return null
    const { folds, taped } = faceEdgesOnNet(ns, ni, s.id)
    let p2 = 'On this net it folds against ' + listText(folds.map(h => faceName(ns, h.face))) + '. '
    if (!taped.length) p2 += 'All its edges are fold lines on this net.'
    else p2 += 'Its other ' + (taped.length === 1 ? 'edge gets taped: edge ' : taped.length + ' edges get taped: edges ') + listText(taped.map(x => String(x.n))) + '.'
    return {
      swatch: <FaceSwatch ci={fi.ci} />, heading: fi.named ? fi.name + ' face · ' + sf.label : 'Face ' + fi.name,
      paras: [fi.desc + '. Area = ' + fi.work + ' = ' + fi.areaText + ' cm².', p2],
      jumps: folds.map(h => ({ label: 'Fold to ' + faceName(ns, h.face), sel: { kind: 'edge' as Kind, id: h.edge } }))
        .concat(taped.map(x => ({ label: 'Edge ' + x.n, sel: { kind: 'edge' as Kind, id: x.edge } })))
        .concat(sf.verts.slice().sort().map(v => ({ label: v, italic: true, sel: { kind: 'vertex' as Kind, id: v } }))),
    }
  }
  if (s.kind === 'edge') {
    const e = ix.edge[s.id]
    if (!e) return null
    const fa = faceName(ns, e.faces[0]), fb = faceName(ns, e.faces[1]), XY = e.label, len = lenText(e.length)
    const jumps: Jump[] = [
      { label: fa, sel: { kind: 'face', id: e.faces[0] } }, { label: fb, sel: { kind: 'face', id: e.faces[1] } },
      { label: e.v[0], italic: true, sel: { kind: 'vertex', id: e.v[0] } }, { label: e.v[1], italic: true, sel: { kind: 'vertex', id: e.v[1] } },
    ]
    if (ni.hingeOf[s.id]) {
      const th = ni.foldAngle[s.id]
      return {
        swatch: <FoldSwatch />, heading: 'Fold line → edge ' + XY,
        paras: ['This edge is already joined on the net: the ' + fa + ' and ' + fb + ' faces fold along it to make edge ' + XY + ' (' + len + ' cm). Fold it up ' + fmtDeg(th) + '°, so the two faces end up at ' + fmtDeg(180 - th) + '° to each other.'],
        jumps,
      }
    }
    const n = ni.pairNo[s.id]
    return {
      swatch: <TagSwatch n={n} />, heading: 'Edges ' + n + ' and ' + n + ' join to make edge ' + XY,
      paras: ['These two edges are on the outside of the net. When it’s folded, the edge of the ' + fa + ' face meets the edge of the ' + fb + ' face and they’re taped together to make edge ' + XY + '. Both are ' + len + ' cm — edges that get taped always match in length.'],
      jumps,
    }
  }
  const v = s.id, vf = vertexFacts(ns, v), m = cornerCount(ni, v)
  const p1 = vf.faces.length + ' faces meet here: ' + listText(vf.faces.map(f => faceName(ns, f))) + '. ' + (m === 1 ? 'On this net they already meet at one corner.' : 'On this net, ' + v + ' is split across ' + m + ' corners.')
  // Rounded parts don't always add to the rounded total (59.0 + 59.0 + 90 vs 208.07), so say ≈ then.
  const rounded = vf.angles.some(a => !isWholeDeg(a))
  const p2 = 'Angles at ' + v + ': ' + vf.angles.map(a => fmtDeg(a) + '°').join(' + ') + (rounded ? ' ≈ ' : ' = ') + fmtDeg(vf.sum) + '°. That’s less than 360°, so the ' + fmtDeg(360 - vf.sum) + '° gap closes up when you fold.'
  return {
    swatch: <i className="font-serif font-semibold text-[15px] text-gray-900 dark:text-white shrink-0">{v}</i>, heading: 'Vertex ' + v, paras: [p1, p2],
    jumps: vf.faces.map(f => ({ label: faceName(ns, f), sel: { kind: 'face' as Kind, id: f } })),
  }
}

function curvedPanel(ns: NetShape, s: Sel): PanelModel | null {
  const c = ns.curved!, cyl = c.kind === 'cylinder', ix = shapeIndex(ns)
  const circ = c.circumference
  const J: Record<string, Jump> = {
    curved: { label: 'Curved surface', sel: { kind: 'face', id: 'curved' } }, top: { label: 'Top', sel: { kind: 'face', id: 'top' } }, base: { label: 'Base', sel: { kind: 'face', id: 'base' } },
    seam: { label: 'Edge 1', sel: { kind: 'edge', id: 'seam' } }, topRim: { label: 'Edge 2', sel: { kind: 'edge', id: 'topRim' } }, baseRim: { label: cyl ? 'Edge 3' : 'Edge 2', sel: { kind: 'edge', id: 'baseRim' } },
    apex: { label: 'Apex', sel: { kind: 'vertex', id: 'V' } },
  }
  const curvedInfo = ix.info.curved
  if (s.kind === 'face') {
    if (s.id === 'curved') {
      return cyl ? {
        swatch: <FaceSwatch ci={curvedInfo.ci} />, heading: 'Curved surface',
        paras: ['Unrolled, it’s a rectangle 2π*r* = ' + circ.exact + ' cm wide (once round the circle) and *h* = ' + c.h + ' cm high. Area = 2π*rh* = 2 × π × ' + c.r + ' × ' + c.h + ' = ' + curvedInfo.areaText + ' cm².'],
        jumps: [J.seam, J.topRim, J.baseRim, J.top, J.base],
      } : {
        swatch: <FaceSwatch ci={curvedInfo.ci} />, heading: 'Curved surface',
        paras: [
          'Unrolled, it’s a sector of a circle with radius *s* = ' + c.s + ' cm. Its arc wraps round the base, so it’s 2π*r* = ' + circ.exact + ' cm long.',
          'A full circle of radius ' + c.s + ' has circumference ' + 2 * (c.s || 0) + 'π, so the sector is ' + circ.exact + '⁄' + 2 * (c.s || 0) + 'π = ' + c.sectorFraction + ' of the circle: angle ' + c.sectorFraction + ' × 360° = ' + fmtDeg(c.sectorAngle || 0) + '°, area ' + c.sectorFraction + ' × π × ' + c.s + '² = ' + curvedInfo.areaText + ' cm². In general, (*r*⁄*s*) × π*s*² = π*rs*.',
        ],
        jumps: [J.seam, J.baseRim, J.apex, J.base],
      }
    }
    const fi = ix.info[s.id]
    if (!fi) return null
    const n = cyl ? (s.id === 'top' ? 2 : 3) : 2
    return {
      swatch: <FaceSwatch ci={fi.ci} />, heading: fi.name + ' face',
      paras: [fi.desc + '. Area = ' + fi.work + ' = ' + fi.areaText + ' cm².', cyl
        ? 'On the net it touches the rectangle at one point. Its whole circumference gets taped to the rectangle’s ' + (s.id === 'top' ? 'top' : 'bottom') + ' edge: edge ' + n + '.'
        : 'On the net it touches the sector’s arc at one point. Its whole circumference gets taped to the arc: edge 2.'],
      jumps: [s.id === 'top' ? J.topRim : J.baseRim, J.curved],
    }
  }
  if (s.kind === 'edge') {
    if (s.id === 'seam') return {
      swatch: <TagSwatch n={1} />, heading: 'Edges 1 and 1 → the seam',
      paras: [cyl ? 'The two short ends of the rectangle meet to close the tube. The seam is only where the paper joins — a real cylinder has no edge here. Length *h* = ' + c.h + ' cm.'
        : 'The two straight edges of the sector meet to close the cone. The seam is only where the paper joins — a real cone has no edge here. Length *s* = ' + c.s + ' cm, the slant height.'],
      jumps: cyl ? [J.curved] : [J.curved, J.apex],
    }
    const work = '2 × π × ' + c.r + ' = ' + circ.exact + ' ≈ ' + circ.approx + ' cm.'
    if (s.id === 'topRim') return {
      swatch: <TagSwatch n={2} />, heading: 'Edges 2 and 2 → the top rim',
      paras: ['The long top edge of the rectangle wraps once round the top circle, so the rectangle’s width must equal the circle’s circumference: 2π*r* = ' + work],
      jumps: [J.curved, J.top],
    }
    return cyl ? {
      swatch: <TagSwatch n={3} />, heading: 'Edges 3 and 3 → the bottom rim',
      paras: ['The long bottom edge of the rectangle wraps once round the base circle, so the rectangle’s width must equal the circle’s circumference: 2π*r* = ' + work],
      jumps: [J.curved, J.base],
    } : {
      swatch: <TagSwatch n={2} />, heading: 'Edges 2 and 2 → the base rim',
      paras: ['The sector’s arc wraps once round the base circle, so the arc length = 2π*r* = ' + circ.exact + ' ≈ ' + circ.approx + ' cm.'],
      jumps: [J.curved, J.base],
    }
  }
  return {
    swatch: null, heading: 'Apex',
    paras: ['It’s the centre of the sector. Every point on the arc is ' + c.s + ' cm from it — the slant height *s*, not the height *h* = ' + c.h + ' cm.'],
    jumps: [J.curved, J.seam],
  }
}

/** First sentence, and the rest. */
function splitLead(s: string): [string, string] {
  const m = /^([\s\S]+?[.!?])\s+(?=[A-Z0-9(*])/.exec(s)
  return m ? [m[1], s.slice(m[0].length)] : [s, '']
}

export default function InfoPanel({ ns, ni, sel, phone, more, onMore, onJump, onClear }: {
  ns: NetShape; ni: NetInfo; sel: Sel | null; phone: boolean; more: boolean
  onMore(): void; onJump(s: { kind: Kind; id: string }): void; onClear(): void
}) {
  const jumpsRef = useRef<HTMLDivElement>(null)
  const m = sel ? panelModel(ns, ni, sel) : null
  let body: ReactNode, live = ''
  if (!m) {
    body = (
      <>
        <p>Click or tap any face, edge or corner — the matching part lights up in the other picture. Edges with the same number get taped together; dashed lines are folds.</p>
        <p className="mt-1 text-gray-500 dark:text-gray-400"><RichText text={ns.fact} /></p>
      </>
    )
  } else {
    const [lead, rest] = splitLead(m.paras[0])
    const hasMore = !!rest || m.paras.length > 1
    const showRest = !phone || more
    live = m.heading + '. ' + plainText(lead)
    body = (
      <>
        <div className="flex items-center gap-2 pr-9 min-h-[24px]">
          {m.swatch}
          <h4 className="text-[14px] font-semibold text-gray-900 dark:text-white">{m.heading}</h4>
        </div>
        <p className="mt-1">{inline(lead)}{showRest && rest ? <> {inline(rest)}</> : null}</p>
        {showRest && m.paras.slice(1).map((p, i) => <p key={i} className="mt-1">{inline(p)}</p>)}
        {phone && hasMore && (
          <button type="button" aria-expanded={more} onClick={onMore} className={'mt-1 min-h-11 text-[13px] font-semibold text-blue-700 dark:text-blue-400 underline underline-offset-2 rounded ' + FOCUS}>
            {more ? 'Less' : 'More'}
          </button>
        )}
        {showRest && m.jumps.length > 0 && (
          <div ref={jumpsRef} className="mt-2 flex flex-wrap items-center gap-1.5">
            <span className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 mr-0.5">Jump To</span>
            {m.jumps.map((j, i) => (
              <button
                key={i}
                type="button"
                data-jump
                onClick={() => {
                  onJump(j.sel)
                  // Keep keyboard focus in the panel after it re-renders for the new selection.
                  window.setTimeout(() => { (jumpsRef.current?.querySelector('[data-jump]') as HTMLElement | null)?.focus() }, 0)
                }}
                className={'text-[12px] font-semibold px-2.5 py-1 min-h-11 sm:min-h-0 rounded-full border ' + PILL_OFF + ' ' + FOCUS}
              >
                {j.italic ? <i className="font-serif">{j.label}</i> : j.label}
              </button>
            ))}
          </div>
        )}
        <button type="button" aria-label="Clear selection" onClick={onClear} className={'absolute top-0 right-0 w-11 h-11 flex items-center justify-center rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 ' + FOCUS}>
          <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" /></svg>
        </button>
      </>
    )
  }
  return (
    <section className="nets-area-info" aria-label="About the selected part">
      <span className="sr-only" aria-live="polite">{live}</span>
      <div className="relative rounded-lg border px-3.5 py-2.5 text-[13px] leading-relaxed border-gray-200 bg-white text-gray-700 dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-200">
        {body}
      </div>
    </section>
  )
}
