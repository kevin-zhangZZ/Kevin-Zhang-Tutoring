// Is It a Net?: the six squares seen flat from above, numbered in reading order. After the reveal
// each square takes the colour of the cube face it lands on, and overlapping squares are hatched.
import { NET_SHAPES, NETS_PALETTE, type Challenge, type Vec2 } from '../lib/nets.ts'
import { shapeIndex, pathD, labelPt2 } from './common'

const CUBE = NET_SHAPES[0]

export default function PatternView({ ch, revealed, dark }: { ch: Challenge; revealed: boolean; dark: boolean }) {
  const net = ch.net, b = net.bounds, ix = shapeIndex(CUBE)
  const P = dark ? NETS_PALETTE.dark : NETS_PALETTE.light
  // True size: 3 cm squares drawn at a fixed scale, so every pattern's squares are the same size.
  const k = Math.min(15, 260 / b.w, 180 / b.h), pad = 8
  // "Overlap" has to fit inside one square, however small the squares are drawn.
  const subSize = Math.min(10, k * 3 * 0.22)
  const W = b.w * k + 2 * pad, H = b.h * k + 2 * pad
  const tp = (q: Vec2): Vec2 => [pad + (q[0] - b.minX) * k, pad + (b.maxY - q[1]) * k]
  const hatch = 'nets-ch-hatch2d'
  const overlap = new Set(ch.overlapFaces)
  const sorted = net.order.slice().sort((a, c) => ch.squareNo[a] - ch.squareNo[c])

  let label = 'The six squares, flat, numbered 1 to 6 from the top row down, left to right.'
  if (revealed) {
    label += ch.isNet ? ' Each square lands on a different face of the cube.'
      : ' ' + ch.clashes.map(g => 'Squares ' + g.join(' and ') + ' land on the same face.').join(' ')
  }

  return (
    <svg viewBox={`0 0 ${W.toFixed(1)} ${H.toFixed(1)}`} width={W} height={H} className="block max-w-full h-auto mx-auto" role="img" aria-label={label}>
      <defs>
        <pattern id={hatch} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke={P.amberHatch} strokeWidth="2.5" strokeOpacity=".45" />
        </pattern>
      </defs>
      {sorted.map(nf => {
        const pts = net.faces2d[nf].map(tp), info = ix.info[net.faceMap[nf]]
        const fill = revealed && info ? `var(--nets-face-${info.ci})` : P.neutral
        return <path key={nf} d={pathD(pts)} style={{ fill, transition: 'fill .3s ease' }} className="motion-reduce:transition-none" />
      })}
      {revealed && sorted.filter(nf => overlap.has(nf)).map(nf => (
        <path key={'h' + nf} d={pathD(net.faces2d[nf].map(tp))} style={{ fill: `url(#${hatch})` }} />
      ))}
      {net.netEdges.map(ne => {
        const Q = net.faces2d[ne.face], a = tp(Q[ne.i]), c = tp(Q[(ne.i + 1) % Q.length])
        return ne.kind === 'cut'
          ? <line key={ne.id} x1={a[0]} y1={a[1]} x2={c[0]} y2={c[1]} style={{ stroke: 'var(--nets-fold)' }} strokeWidth="1.5" strokeLinecap="round" />
          : <line key={ne.id} x1={a[0]} y1={a[1]} x2={c[0]} y2={c[1]} style={{ stroke: 'var(--nets-fold)' }} strokeWidth="1.25" strokeDasharray="4 3" />
      })}
      {revealed && sorted.filter(nf => overlap.has(nf)).map(nf => (
        <path key={'o' + nf} d={pathD(net.faces2d[nf].map(tp))} style={{ fill: 'none', stroke: P.amberLine }} strokeWidth="2" strokeLinejoin="round" />
      ))}
      {sorted.map(nf => {
        const pts = net.faces2d[nf].map(tp), lp = labelPt2(pts), info = ix.info[net.faceMap[nf]]
        const sub = revealed ? (overlap.has(nf) ? 'Overlap' : info ? info.name : '') : ''
        return (
          <g key={'l' + nf} style={{ fill: 'var(--nets-face-text)' }} textAnchor="middle" dominantBaseline="central" pointerEvents="none">
            <text x={lp[0]} y={sub ? lp[1] - 6 : lp[1]} fontSize="15" fontWeight="700">{ch.squareNo[nf]}</text>
            {sub && <text x={lp[0]} y={lp[1] + 9} fontSize={subSize.toFixed(1)} fontWeight="600">{sub}</text>}
          </g>
        )
      })}
    </svg>
  )
}
