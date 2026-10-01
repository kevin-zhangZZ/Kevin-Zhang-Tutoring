// Pick a Net: a strip of small net thumbnails (the cube's 11 grouped by family). It scrolls
// sideways on phones and wraps from 640 px.
import { logicalFace, type NetShape, type NetInfo, type Vec2 } from '../lib/nets.ts'
import { shapeIndex, circleD, FOCUS } from './common'

const W = 56, H = 46

function Thumb({ ns, ni }: { ns: NetShape; ni: NetInfo }) {
  const g = ni.curved
  const b = g ? g.bounds : ni.net.bounds
  const k = Math.min((W - 4) / (b.maxX - b.minX), (H - 4) / (b.maxY - b.minY))
  const ox = (W - (b.maxX - b.minX) * k) / 2, oy = (H - (b.maxY - b.minY) * k) / 2
  const P = (q: Vec2): Vec2 => [ox + (q[0] - b.minX) * k, oy + (b.maxY - q[1]) * k]
  const pts = (Q: Vec2[]) => Q.map(P).map(q => q[0].toFixed(1) + ',' + q[1].toFixed(1)).join(' ')
  const ix = shapeIndex(ns)
  const fill = (id: string) => ({ fill: `var(--nets-face-${ix.info[id]?.ci || 1})` })
  if (g && g.kind === 'cylinder') {
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" aria-hidden="true">
        <polygon points={pts(g.rect)} style={fill('curved')} />
        <path d={circleD(P(g.topC), g.r * k)} style={fill('top')} />
        <path d={circleD(P(g.baseC), g.r * k)} style={fill('base')} />
      </svg>
    )
  }
  if (g && g.kind === 'cone') {
    const sector: Vec2[] = [g.apex]
    for (let i = 0; i <= 40; i++) { const a = g.mid - g.half + (2 * g.half * i) / 40; sector.push([g.apex[0] + g.s * Math.cos(a), g.apex[1] + g.s * Math.sin(a)]) }
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" aria-hidden="true">
        <polygon points={pts(sector)} style={fill('curved')} />
        <path d={circleD(P(g.baseC), g.r * k)} style={fill('base')} />
      </svg>
    )
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" aria-hidden="true">
      {ni.net.order.map(f => <polygon key={f} points={pts(ni.net.faces2d[f])} style={fill(logicalFace(ns, ni.net.faceMap[f]))} />)}
    </svg>
  )
}

export default function NetStrip({ ns, netIx, onPick }: { ns: NetShape; netIx: number; onPick(i: number): void }) {
  const total = ns.nets.length
  return (
    <div className="mt-3">
      <div className="flex items-baseline gap-2">
        <h4 className="text-[13px] font-semibold text-gray-700 dark:text-gray-300">Pick a Net</h4>
        <span className="text-[12px] text-gray-500 dark:text-gray-400">{ns.netsTitle}</span>
      </div>
      {/* -mx-1 px-1 pt-1: room inside the scroller so the selected thumbnail's ring isn't clipped. */}
      <div className="nets-strip-fade mt-1 -mx-1 px-1 pt-1 scroll-px-1 flex gap-4 overflow-x-auto snap-x pb-2 sm:flex-wrap sm:overflow-visible sm:snap-none sm:pb-0">
        {ns.netGroups.map(g => (
          <div key={g.caption} className="flex-none snap-start sm:flex-initial sm:min-w-0 sm:max-w-full">
            <div className="text-[11.5px] text-gray-500 dark:text-gray-400 mb-1 whitespace-nowrap">{g.caption}</div>
            <div className="flex gap-2 sm:flex-wrap">
              {g.nets.map(i => {
                const n = ns.nets[i], on = i === netIx
                return (
                  <button
                    key={n.id}
                    type="button"
                    data-net={i}
                    aria-pressed={on}
                    aria-label={'Net ' + n.n + ' of ' + total + ', ' + g.short}
                    title={'Net ' + n.n}
                    onClick={() => onPick(i)}
                    className={'nets-thumb flex-none w-16 h-14 rounded-md border bg-white dark:bg-gray-900 p-1 hover:border-gray-400 dark:hover:border-gray-500 ' + FOCUS + ' ' +
                      (on ? 'ring-2 ring-blue-600 dark:ring-blue-400 border-transparent' : 'border-gray-200 dark:border-gray-700')}
                  >
                    <Thumb ns={ns} ni={n} />
                  </button>
                )
              })}
            </div>
          </div>
        ))}
        <div className="flex-none w-4 sm:hidden" aria-hidden="true" />
      </div>
    </div>
  )
}
