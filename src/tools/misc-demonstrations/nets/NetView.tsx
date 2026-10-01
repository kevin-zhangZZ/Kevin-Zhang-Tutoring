// The flat net: faces in their colours, dashed fold lines, numbered taped edges and corner letters.
// Plain SVG at true scale. Clicks are hit-tested against the drawn geometry (corners, then edges,
// then faces), so thin edges and small dots are easy to pick on touch screens.
import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { fmtDeg, type NetShape, type NetInfo, type Vec2 } from '../lib/nets.ts'
import {
  LIT, shapeIndex, stateOf, countNo, isHov, tipText, faceTitle, rimName, rgb, mix, pairCol, mid2, lerp2, labelPt2,
  pip, segDist, pathD, circleD, f1, addPings, type Sel, type Hover, type CountState, type Show, type Tokens, type StateCtx, type Kind, type PartState,
} from './common'

const RAD = Math.PI / 180

export interface NetHandle { ping(): void }

interface Props {
  ns: NetShape
  ni: NetInfo
  sel: Sel | null
  hover: Hover | null
  show: Show
  count: CountState | null
  T: Tokens
  fine: boolean
  wide: boolean
  onPick(s: Sel | null): void
  onHover(h: Hover | null): void
  onEscape(): void
}

interface PickSel { kind: Kind; id: string; part: string }
interface NavItem { dom: string; kind: Kind; sel: PickSel; ring: ReactNode }
interface Geo {
  els: ReactNode
  hits: { v: { x: number; y: number; sel: PickSel }[]; e: { a?: Vec2; b?: Vec2; dist?: (x: number, y: number) => number; sel: PickSel }[]; f: { poly?: Vec2[]; inside?: (x: number, y: number) => boolean; sel: PickSel }[] }
  nav: NavItem[]
  spots: Vec2[]
  tangents: Vec2[]
}

const DOM = 'nets-'
function domId(s: string) { return DOM + s.replace(/[^A-Za-z0-9_-]/g, '_') }

// Direction (screen) of the widest empty angle around a net point.
function gapDir(P: Vec2, rays: [Vec2, Vec2][]): Vec2 {
  const cover = new Array<boolean>(360).fill(false)
  rays.forEach(r => {
    const a1 = Math.atan2(r[0][1] - P[1], r[0][0] - P[0]), a2 = Math.atan2(r[1][1] - P[1], r[1][0] - P[0])
    let d = a2 - a1
    while (d > Math.PI) d -= 2 * Math.PI
    while (d < -Math.PI) d += 2 * Math.PI
    const s = d >= 0 ? a1 : a2, w = Math.abs(d)
    for (let k = 0; k < 360; k++) {
      let ang = ((k + 0.5) * RAD - s) % (2 * Math.PI)
      if (ang < 0) ang += 2 * Math.PI
      if (ang <= w) cover[k] = true
    }
  })
  let bestLen = 0, bestMid = 270
  for (let k = 0; k < 360; k++) {
    if (cover[k] || !cover[(k + 359) % 360]) continue
    let n = 0
    while (n < 360 && !cover[(k + n) % 360]) n++
    if (n > bestLen) { bestLen = n; bestMid = k + n / 2 }
  }
  if (!cover.some(Boolean)) bestMid = 270
  return [Math.cos(bestMid * RAD), Math.sin(bestMid * RAD)]
}
function ringForSeg(a: Vec2, b: Vec2): ReactNode {
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = (-dy / L) * 8, ny = (dx / L) * 8, ux = (dx / L) * 6, uy = (dy / L) * 6
  return <path d={pathD([[a[0] - ux + nx, a[1] - uy + ny], [b[0] + ux + nx, b[1] + uy + ny], [b[0] + ux - nx, b[1] + uy - ny], [a[0] - ux - nx, a[1] - uy - ny]])} />
}

/** Builds the drawing. Pure apart from the key counter. */
function buildGeo(p: Props, W: number, H: number): Geo {
  const { ns, ni, T, show } = p
  const ix = shapeIndex(ns)
  const ctx: StateCtx = { ns, sel: p.sel, count: p.count }
  let kc = 0
  const K = () => kc++
  const ink = rgb(T.ink)
  const b = ni.curved ? ni.curved.bounds : ni.net.bounds
  const pad = 26, padTop = 38
  const sc = Math.min((W - 2 * pad) / (b.maxX - b.minX), (H - pad - padTop) / (b.maxY - b.minY))
  const cx = (b.minX + b.maxX) / 2, cy = (b.minY + b.maxY) / 2, oy = padTop + (H - pad - padTop) / 2
  const toS = (q: Vec2): Vec2 => [W / 2 + (q[0] - cx) * sc, oy - (q[1] - cy) * sc]
  const toN = (x: number, y: number): Vec2 => [(x - W / 2) / sc + cx, -(y - oy) / sc + cy]
  const G: Geo = { els: null, hits: { v: [], e: [], f: [] }, nav: [], spots: [], tangents: [] }
  const out: ReactNode[] = [], top: ReactNode[] = [], defs: ReactNode[] = []

  const lineEl = (a: Vec2, c: Vec2, col: string, w: number, o: { dash?: string; op?: number; id?: string; label?: string } = {}) => (
    <line key={K()} x1={f1(a[0])} y1={f1(a[1])} x2={f1(c[0])} y2={f1(c[1])} stroke={col} strokeWidth={w} strokeDasharray={o.dash || undefined}
      opacity={o.op !== undefined && o.op !== 1 ? o.op : undefined} strokeLinecap="round" id={o.id} role={o.id ? 'button' : undefined} aria-label={o.label} />
  )
  const tagEl = (x: number, y: number, num: number, state: PartState) => {
    const lit = LIT[state], s = lit ? 1.25 : 1, h = 8 * s
    return (
      <g key={K()} opacity={state === 'dim' ? 0.25 : undefined}>
        {lit && <rect x={f1(x - h - 4)} y={f1(y - h - 4)} width={f1(2 * h + 8)} height={f1(2 * h + 8)} rx={f1(4 * s + 3)} fill={ink} />}
        <rect x={f1(x - h - 2)} y={f1(y - h - 2)} width={f1(2 * h + 4)} height={f1(2 * h + 4)} rx={f1(4 * s + 2)} fill={rgb(T.stage)} />
        <rect x={f1(x - h)} y={f1(y - h)} width={f1(2 * h)} height={f1(2 * h)} rx={f1(4 * s)} fill={rgb(pairCol(T, num))} />
        <text x={f1(x)} y={f1(y + 0.5)} className="nets-tag-num" style={lit ? { fontSize: 13 } : undefined}>{num}</text>
      </g>
    )
  }
  const badgeEl = (x: number, y: number, n: number) => (
    <g key={K()}><circle cx={f1(x)} cy={f1(y)} r={9} fill={ink} /><text x={f1(x)} y={f1(y + 0.5)} className="nets-badge-num">{n}</text></g>
  )
  const faceOutline = (d: string, k: string, lit: boolean) => {
    const id = DOM + 'clip-' + k
    defs.push(<clipPath key={K()} id={id}><path d={d} /></clipPath>)
    if (lit) {
      out.push(<path key={K()} d={d} clipPath={`url(#${id})`} fill="none" stroke={rgb(T.stage)} strokeWidth={14} />)
      out.push(<path key={K()} d={d} clipPath={`url(#${id})`} fill="none" stroke={ink} strokeWidth={6} />)
    } else out.push(<path key={K()} d={d} clipPath={`url(#${id})`} fill="none" stroke={ink} strokeWidth={4} opacity={0.55} />)
  }
  const edgeEl = (ed: { a?: Vec2; b?: Vec2; d?: string; taped: boolean; num: number; state: PartState; hov: boolean; id: string; label: string }) => {
    const lit = LIT[ed.state]
    let col = ed.taped ? rgb(pairCol(T, ed.num)) : rgb(T.fold), w = ed.taped ? 3 : 1.5
    const dash = ed.taped ? '' : '6 4', op = ed.state === 'dim' ? 0.25 : 1
    const draw = (c: string, width: number, o: { dash?: string; op?: number; id?: string; label?: string }) => ed.d
      ? <path key={K()} d={ed.d} fill="none" stroke={c} strokeWidth={width} strokeLinecap="round" strokeDasharray={o.dash || undefined}
        opacity={o.op !== undefined && o.op !== 1 ? o.op : undefined} id={o.id} role={o.id ? 'button' : undefined} aria-label={o.label} />
      : lineEl(ed.a!, ed.b!, c, width, o)
    if (lit) {
      if (ed.taped) { out.push(draw(ink, 8, {})); w = 4 } else { col = ink; w = 3 }
    } else if (ed.hov) out.push(draw(ink, w + 4, { op: 0.55 }))
    out.push(draw(col, w, { dash, op, id: ed.id, label: ed.label }))
  }
  const vertexEls = (P: Vec2, dir: Vec2, letter: string, state: PartState, hov: boolean, cn: number, isApex = false) => {
    const lit = LIT[state]
    if (lit) {
      top.push(<circle key={K()} cx={f1(P[0])} cy={f1(P[1])} r={9} fill="none" stroke={ink} strokeWidth={1.5} />)
      top.push(<circle key={K()} cx={f1(P[0])} cy={f1(P[1])} r={6} fill={ink} />)
    } else {
      if (hov) top.push(<circle key={K()} cx={f1(P[0])} cy={f1(P[1])} r={8} fill="none" stroke={ink} strokeWidth={1.5} opacity={0.55} />)
      top.push(<circle key={K()} cx={f1(P[0])} cy={f1(P[1])} r={2.5} fill={rgb(T.dot)} opacity={state === 'dim' ? 0.3 : undefined} />)
    }
    if (show.verts) {
      let off = lit ? 15 : 11
      if (isApex) off += 10
      top.push(<text key={K()} x={f1(P[0] + dir[0] * off)} y={f1(P[1] + dir[1] * off)} className={'nets-letter' + (isApex ? ' apex' : '') + (lit ? ' is-sel' : '')} opacity={state === 'dim' ? 0.3 : undefined}>{letter}</text>)
    }
    if (cn) top.push(badgeEl(P[0] + dir[0] * 28, P[1] + dir[1] * 28, cn))
  }

  // Face names that would sit under a tag: nudge the tag outward, or hide the name when crowded.
  interface TagBox { x: number; y: number; nx: number; ny: number; ux: number; uy: number; room: number; off: number; num: number; state: PartState; gone?: boolean }
  interface Label { x: number; y: number; text: string; dim: boolean; hide?: boolean }
  const settle = (tags: TagBox[], labels: Label[]) => {
    // Tags on two edges that leave the same corner at a sharp angle can land on top of each other:
    // slide each along its own edge, away from the other.
    for (let pass = 0; pass < 4; pass++) {
      for (let i = 0; i < tags.length; i++) for (let j = i + 1; j < tags.length; j++) {
        const A = tags[i], B = tags[j], ddx = B.x - A.x, ddy = B.y - A.y, need = 19 - Math.hypot(ddx, ddy)
        if (need <= 0) continue
        ;([[A, -1], [B, 1]] as [TagBox, number][]).forEach(([tg, sgn]) => {
          const s = (tg.ux * ddx + tg.uy * ddy) * sgn >= 0 ? 1 : -1
          const off = Math.max(-tg.room, Math.min(tg.room, tg.off + s * (need / 2 + 0.5)))
          tg.x += tg.ux * (off - tg.off); tg.y += tg.uy * (off - tg.off); tg.off = off
        })
      }
    }
    // Still touching on a small net? Two copies of the SAME number share one tag.
    tags.forEach((A, i) => tags.slice(i + 1).forEach(B => {
      if (A.gone || B.gone || A.num !== B.num || Math.hypot(B.x - A.x, B.y - A.y) >= 17) return
      A.x = (A.x + B.x) / 2; A.y = (A.y + B.y) / 2; B.gone = true
      if (LIT[B.state] && !LIT[A.state]) A.state = B.state
    }))
    const hits = (tg: TagBox, L: Label) => {
      const hw = L.text.length * 3.4 + 2
      return Math.abs(tg.x - L.x) < 10 + hw && Math.abs(tg.y - L.y) < 10 + 7
    }
    tags.forEach(tg => {
      if (tg.gone) return
      labels.forEach(L => {
        if (L.hide || !hits(tg, L)) return
        for (let k = 1; k <= 3 && hits(tg, L); k++) { tg.x += tg.nx * 4; tg.y += tg.ny * 4 }
        if (hits(tg, L)) L.hide = true
      })
    })
  }
  const labelEls = (labels: Label[]) => {
    if (show.faces) labels.forEach(L => { if (!L.hide) out.push(<text key={K()} x={f1(L.x)} y={f1(L.y)} className="nets-face-label" opacity={L.dim ? 0.35 : undefined}>{L.text}</text>) })
  }

  if (!ni.curved) {
    /* ═════ polyhedra ═════ */
    const net = ni.net
    const faces = net.order.map(f => {
      const P = net.faces2d[f].map(toS)
      const info = ix.info[f]
      return { f, P, d: pathD(P), info, state: stateOf(ctx, 'net', 'face', f, 'nf:' + f), lp: labelPt2(P) }
    })
    const byId: Record<string, typeof faces[number]> = {}
    faces.forEach(o => {
      byId[o.f] = o
      let c = T.face[o.info.ci]
      if (o.state === 'dim') c = mix(c, T.stage, 0.3)
      out.push(<path key={K()} id={domId('f-' + o.f)} role="button" aria-label={faceTitle(ns, o.f)} d={o.d} fill={rgb(c)} />)
      G.hits.f.push({ poly: o.P, sel: { kind: 'face', id: o.f, part: 'nf:' + o.f } })
    })
    ns.faces.forEach(fi => { const o = byId[fi.id]; if (o) G.nav.push({ dom: domId('f-' + o.f), kind: 'face', sel: { kind: 'face', id: o.f, part: 'nf:' + o.f }, ring: <path d={o.d} /> }) })
    faces.forEach(o => {
      const lit = LIT[o.state], hov = isHov(p.hover, 'face', o.f)
      if (lit || hov) faceOutline(o.d, o.f, lit)
      if (o.state === 'partner') G.spots.push(o.lp)
    })
    // edges: fold lines first, then taped edges on top
    const navE: { n: number; item: NavItem }[] = [], navF: NavItem[] = [], seenPair: Record<number, 1> = {}
    const edges = net.netEdges.slice().sort((x, y) => (x.kind === 'cut' ? 1 : 0) - (y.kind === 'cut' ? 1 : 0))
    const tags: TagBox[] = []
    edges.forEach(ne => {
      const a = toS(ne.seg[0]), c = toS(ne.seg[1]), logical = ne.solidEdge, part = 'ne:' + ne.id, taped = ne.kind === 'cut', num = ni.pairNo[logical]
      const state = stateOf(ctx, 'net', 'edge', logical, part), dom = domId('e-' + ne.id)
      edgeEl({ a, b: c, taped, num, state, hov: isHov(p.hover, 'edge', logical), id: dom, label: taped ? 'Edge ' + num + ', taped' : 'Fold line ' + (ix.edge[logical]?.label || '') })
      const sel: PickSel = { kind: 'edge', id: logical, part }
      G.hits.e.push({ a, b: c, sel })
      const m = mid2(a, c), fc = byId[ne.face].lp
      const dx = c[0] - a[0], dy = c[1] - a[1], L = Math.hypot(dx, dy) || 1
      let nx = -dy / L, ny = dx / L
      if (nx * (fc[0] - m[0]) + ny * (fc[1] - m[1]) > 0) { nx = -nx; ny = -ny }
      if (state === 'partner') G.spots.push(m)
      const cn = countNo(ctx, 'edge', logical)
      if (cn) top.push(badgeEl(m[0] - nx * (taped ? 13 : 0), m[1] - ny * (taped ? 13 : 0), cn))
      if (taped) {
        if (show.edges) tags.push({ x: m[0] + nx * 10, y: m[1] + ny * 10, nx, ny, ux: dx / L, uy: dy / L, room: Math.max(0, L / 2 - 9), off: 0, num, state })
        if (!seenPair[num]) { seenPair[num] = 1; navE.push({ n: num, item: { dom, kind: 'edge', sel, ring: ringForSeg(a, c) } }) }
      } else navF.push({ dom, kind: 'edge', sel, ring: ringForSeg(a, c) })
    })
    navE.sort((x, y) => x.n - y.n).forEach(x => G.nav.push(x.item))
    navF.forEach(x => G.nav.push(x))
    const labels: Label[] = faces.map(o => ({ x: o.lp[0], y: o.lp[1], text: o.info.short || o.info.name, dim: o.state === 'dim' }))
    settle(tags, show.faces ? labels : [])
    labelEls(labels)
    tags.forEach(tg => { if (!tg.gone) out.push(tagEl(tg.x, tg.y, tg.num, tg.state)) })
    // vertex selection: shade the angle at every net corner of that vertex
    const selV = p.sel && p.sel.kind === 'vertex' && !p.count ? p.sel.id : null
    if (selV) {
      net.order.forEach(f => net.corners[f].forEach((v, i) => {
        if (v !== selV) return
        const P = byId[f].P, n = P.length, C = P[i], A = P[(i - 1 + n) % n], Bp = P[(i + 1) % n]
        const u = (q: Vec2): Vec2 => { const l = Math.hypot(q[0] - C[0], q[1] - C[1]) || 1; return [(q[0] - C[0]) / l, (q[1] - C[1]) / l] }
        const u1 = u(A), u2 = u(Bp), r = 16
        const sweep = u1[0] * u2[1] - u1[1] * u2[0] > 0 ? 1 : 0
        out.push(<path key={K()} d={'M' + f1(C[0]) + ' ' + f1(C[1]) + 'L' + f1(C[0] + u1[0] * r) + ' ' + f1(C[1] + u1[1] * r) + 'A' + r + ' ' + r + ' 0 0 ' + sweep + ' ' + f1(C[0] + u2[0] * r) + ' ' + f1(C[1] + u2[1] * r) + 'Z'} fill={ink} fillOpacity={0.15} />)
        if (p.wide) {
          const bx = u1[0] + u2[0], by = u1[1] + u2[1], bl = Math.hypot(bx, by) || 1
          const ang = Math.acos(Math.max(-1, Math.min(1, u1[0] * u2[0] + u1[1] * u2[1]))) / RAD
          top.push(<text key={K()} x={f1(C[0] + (bx / bl) * 29)} y={f1(C[1] + (by / bl) * 29)} className="nets-ang-label">{fmtDeg(ang)}°</text>)
        }
      }))
    }
    // net corners
    const navV: { v: string; item: NavItem }[] = []
    net.netPoints.forEach(pt => {
      const P = toS(pt.xy), v = pt.vertices[0], part = 'np:' + pt.id
      const rays = pt.corners.map(cid => {
        const k = cid.lastIndexOf('@'), f = cid.slice(0, k), i = +cid.slice(k + 1), Q = byId[f].P, n = Q.length
        return [Q[(i - 1 + n) % n], Q[(i + 1) % n]] as [Vec2, Vec2]
      })
      const dir = gapDir(P, rays), state = stateOf(ctx, 'net', 'vertex', v, part)
      vertexEls(P, dir, pt.vertices.join('/'), state, isHov(p.hover, 'vertex', v), countNo(ctx, 'vertex', v))
      const sel: PickSel = { kind: 'vertex', id: v, part }
      G.hits.v.push({ x: P[0], y: P[1], sel })
      const dom = domId('v-' + pt.id)
      top.push(<circle key={K()} id={dom} cx={f1(P[0])} cy={f1(P[1])} r={1} fill="none" role="button" aria-label={'Corner ' + v} />)
      navV.push({ v, item: { dom, kind: 'vertex', sel, ring: <circle cx={f1(P[0])} cy={f1(P[1])} r={12} /> } })
      if (state === 'partner') G.spots.push(P)
    })
    navV.sort((x, y) => (x.v < y.v ? -1 : x.v > y.v ? 1 : 0)).forEach(x => G.nav.push(x.item))
    faces.forEach(o => { const cn = countNo(ctx, 'face', o.f); if (cn) top.push(badgeEl(o.lp[0], o.lp[1] + 17, cn)) })
  } else {
    /* ═════ cylinder and cone: a true rectangle / sector with true circles ═════ */
    const g = ni.curved
    interface CFace { id: string; d: string; inside: (x: number, y: number) => boolean; lp: Vec2; state?: PartState }
    interface CEdge { logical: string; part: string; a?: Vec2; b?: Vec2; out?: Vec2; at?: number; d?: string; dist?: (x: number, y: number) => number; tag?: Vec2; spot?: Vec2; lab?: Vec2; labAnchor?: 'start' | 'end' }
    const faces: CFace[] = [], edges: CEdge[] = []
    let apex: Vec2 | null = null, apexDir: Vec2 = [0, -1], rect: Vec2[] = [], a0 = 0, a1 = 0
    const rimLen = ns.curved!.circumference.exact + ' ≈ ' + ns.curved!.circumference.approx
    const circEdge = (c: Vec2, rr: number, part: string, logical: string, tagAng: number, labAng: number): CEdge => ({
      logical, part, d: circleD(c, rr), dist: (x, y) => Math.abs(Math.hypot(x - c[0], y - c[1]) - rr),
      tag: [c[0] + Math.cos(tagAng) * (rr + 11), c[1] + Math.sin(tagAng) * (rr + 11)], spot: [c[0] + Math.cos(tagAng) * rr, c[1] + Math.sin(tagAng) * rr],
      lab: [c[0] + Math.cos(labAng) * (rr + 14), c[1] + Math.sin(labAng) * (rr + 14)], labAnchor: Math.cos(labAng) < 0 ? 'end' : 'start',
    })
    if (g.kind === 'cylinder') {
      rect = g.rect.map(toS)
      const topC = toS(g.topC), botC = toS(g.baseC), rr = g.r * sc, rc = mid2(rect[0], rect[2])
      faces.push({ id: 'curved', d: pathD(rect), inside: (x, y) => pip(x, y, rect), lp: rc })
      faces.push({ id: 'top', d: circleD(topC, rr), inside: (x, y) => Math.hypot(x - topC[0], y - topC[1]) <= rr, lp: topC })
      faces.push({ id: 'base', d: circleD(botC, rr), inside: (x, y) => Math.hypot(x - botC[0], y - botC[1]) <= rr, lp: botC })
      edges.push({ logical: 'seam', part: 'seamL', a: rect[0], b: rect[1], out: [-1, 0] })
      edges.push({ logical: 'seam', part: 'seamR', a: rect[3], b: rect[2], out: [1, 0] })
      edges.push({ logical: 'topRim', part: 'rectTop', a: rect[1], b: rect[2], at: 0.25, out: [0, -1], lab: [lerp2(rect[1], rect[2], 0.78)[0], rect[1][1] - 13] })
      edges.push(circEdge(topC, rr, 'circTop', 'topRim', -Math.PI / 4, -Math.PI * 0.8))
      edges.push({ logical: 'baseRim', part: 'rectBot', a: rect[0], b: rect[3], at: 0.25, out: [0, 1], lab: [lerp2(rect[0], rect[3], 0.78)[0], rect[0][1] + 13] })
      edges.push(circEdge(botC, rr, 'circBot', 'baseRim', Math.PI / 4, Math.PI * 0.8))
      G.tangents = [[rc[0], rect[1][1]], [rc[0], rect[0][1]]]
    } else {
      const A = toS(g.apex), Sp = g.s * sc
      a0 = g.mid - g.half; a1 = g.mid + g.half
      const onArc = (ang: number, rad = g.s) => toS([g.apex[0] + Math.cos(ang) * rad, g.apex[1] + Math.sin(ang) * rad])
      const E1 = onArc(a0), E2 = onArc(a1), bcS = toS(g.baseC), br = g.r * sc
      const inSector = (x: number, y: number) => {
        const q = toN(x, y)
        let ang = Math.atan2(q[1] - g.apex[1], q[0] - g.apex[0]) - g.mid
        while (ang > Math.PI) ang -= 2 * Math.PI
        while (ang < -Math.PI) ang += 2 * Math.PI
        return Math.abs(ang) <= g.half
      }
      const arcD = 'M' + f1(E1[0]) + ' ' + f1(E1[1]) + 'A' + f1(Sp) + ' ' + f1(Sp) + ' 0 1 0 ' + f1(E2[0]) + ' ' + f1(E2[1])
      // The name sits 0.72 s along the sector so it clears the 216° angle label at the apex.
      faces.push({ id: 'curved', d: 'M' + f1(A[0]) + ' ' + f1(A[1]) + 'L' + arcD.slice(1) + 'Z', inside: (x, y) => Math.hypot(x - A[0], y - A[1]) <= Sp && inSector(x, y), lp: onArc(g.mid, g.s * 0.72) })
      faces.push({ id: 'base', d: circleD(bcS, br), inside: (x, y) => Math.hypot(x - bcS[0], y - bcS[1]) <= br, lp: bcS })
      const mArc = onArc(g.mid)
      const perpOut = (E: Vec2): Vec2 => {
        const l = Math.hypot(E[0] - A[0], E[1] - A[1]) || 1, u: Vec2 = [(E[0] - A[0]) / l, (E[1] - A[1]) / l]
        let n: Vec2 = [-u[1], u[0]]
        if (n[0] * (mArc[0] - A[0]) + n[1] * (mArc[1] - A[1]) > 0) n = [-n[0], -n[1]]
        return n
      }
      edges.push({ logical: 'seam', part: 'seam1', a: A, b: E1, out: perpOut(E1) })
      edges.push({ logical: 'seam', part: 'seam2', a: A, b: E2, out: perpOut(E2) })
      const tA = g.mid - g.half / 2, lA = g.mid + g.half / 2
      edges.push({
        logical: 'baseRim', part: 'arc', d: arcD,
        dist: (x, y) => (inSector(x, y) ? Math.abs(Math.hypot(x - A[0], y - A[1]) - Sp) : Infinity),
        tag: onArc(tA, g.s + 11 / sc), spot: onArc(tA), lab: onArc(lA, g.s + 16 / sc), labAnchor: Math.cos(lA) < 0 ? 'end' : 'start',
      })
      // The circle sits beyond the arc: put its tag and label on the side away from the sector.
      const away = Math.atan2(bcS[1] - A[1], bcS[0] - A[0])
      edges.push(circEdge(bcS, br, 'circBase', 'baseRim', away - Math.PI / 4, away + Math.PI * 0.3))
      apex = A
      apexDir = [-Math.cos(g.mid), Math.sin(g.mid)] // screen direction away from the sector
      G.tangents = [mArc]
    }
    faces.forEach(o => {
      const info = ix.info[o.id], state = stateOf(ctx, 'net', 'face', o.id, 'nf:' + o.id)
      let c = T.face[info.ci]
      o.state = state
      if (state === 'dim') c = mix(c, T.stage, 0.3)
      out.push(<path key={K()} id={domId('f-' + o.id)} role="button" aria-label={faceTitle(ns, o.id)} d={o.d} fill={rgb(c)} />)
      G.hits.f.push({ inside: o.inside, sel: { kind: 'face', id: o.id, part: 'nf:' + o.id } })
      if (state === 'partner') G.spots.push(o.lp)
    })
    faces.forEach(o => { const lit = LIT[o.state!], hov = isHov(p.hover, 'face', o.id); if (lit || hov) faceOutline(o.d, o.id, lit) })
    ns.faces.forEach(fi => { const o = faces.find(x => x.id === fi.id); if (o) G.nav.push({ dom: domId('f-' + o.id), kind: 'face', sel: { kind: 'face', id: o.id, part: 'nf:' + o.id }, ring: <path d={o.d} /> }) })
    const tagEls: ReactNode[] = [], labs: ReactNode[] = [], navSeen: Record<string, 1> = {}
    edges.forEach(ed => {
      const num = ni.pairNo[ed.logical], state = stateOf(ctx, 'net', 'edge', ed.logical, 'ne:' + ed.part), dom = domId('e-' + ed.part)
      edgeEl({ a: ed.a, b: ed.b, d: ed.d, taped: true, num, state, hov: isHov(p.hover, 'edge', ed.logical), id: dom, label: rimName(ns, ed.logical) + ', edge ' + num })
      const sel: PickSel = { kind: 'edge', id: ed.logical, part: 'ne:' + ed.part }
      G.hits.e.push({ a: ed.a, b: ed.b, dist: ed.dist, sel })
      let tag: Vec2, spot: Vec2
      if (ed.a) {
        const q = lerp2(ed.a, ed.b!, ed.at || 0.5)
        tag = [q[0] + ed.out![0] * 10, q[1] + ed.out![1] * 10]; spot = q
      } else { tag = ed.tag!; spot = ed.spot! }
      if (show.edges) tagEls.push(tagEl(tag[0], tag[1], num, state))
      if (state === 'partner') G.spots.push(spot)
      const cn = countNo(ctx, 'edge', ed.logical)
      if (cn) top.push(badgeEl(spot[0] - (ed.out ? ed.out[0] * 13 : 0), spot[1] - (ed.out ? ed.out[1] * 13 : 0), cn))
      if (!navSeen[ed.logical]) {
        navSeen[ed.logical] = 1
        G.nav.push({ dom, kind: 'edge', sel, ring: ed.a ? ringForSeg(ed.a, ed.b!) : <path d={ed.d} strokeWidth={2} /> })
      }
      if (LIT[state] && ed.logical !== 'seam' && ed.lab) labs.push(<text key={K()} x={f1(ed.lab[0])} y={f1(ed.lab[1])} className="nets-dim-label" style={ed.labAnchor ? { textAnchor: ed.labAnchor } : undefined}>{rimLen}</text>)
    })
    const labels: Label[] = faces.map(o => { const info = ix.info[o.id]; return { x: o.lp[0], y: o.lp[1], text: info.short || info.name, dim: o.state === 'dim' } })
    labelEls(labels)
    out.push(...tagEls)
    // dimension lines on the curved surface
    if (LIT[stateOf(ctx, 'net', 'face', 'curved', 'nf:curved')]) {
      const c = ns.curved!
      if (g.kind === 'cylinder') {
        const y0 = rect[0][1] - 16, x0 = rect[0][0] + 6, x1 = rect[3][0] - 6
        top.push(lineEl([x0, y0], [x1, y0], ink, 1.5), lineEl([x0, y0 - 5], [x0, y0 + 5], ink, 1.5), lineEl([x1, y0 - 5], [x1, y0 + 5], ink, 1.5))
        top.push(<text key={K()} x={f1((x0 + x1) / 2)} y={f1(y0)} className="nets-dim-label">2π<tspan fontStyle="italic">r</tspan> = {c.circumference.exact}</text>)
        const hx = rect[0][0] + 16, hy0 = rect[0][1] - 6, hy1 = rect[1][1] + 6
        top.push(lineEl([hx, hy0], [hx, hy1], ink, 1.5), lineEl([hx - 5, hy0], [hx + 5, hy0], ink, 1.5), lineEl([hx - 5, hy1], [hx + 5, hy1], ink, 1.5))
        top.push(<text key={K()} x={f1(hx + 10)} y={f1((hy0 + hy1) / 2)} className="nets-dim-label" style={{ textAnchor: 'start' }}><tspan fontStyle="italic">h</tspan> = {c.h}</text>)
      } else if (apex) {
        const ra = 24, P0: Vec2 = [apex[0] + Math.cos(-a0) * ra, apex[1] + Math.sin(-a0) * ra], P1: Vec2 = [apex[0] + Math.cos(-a1) * ra, apex[1] + Math.sin(-a1) * ra]
        top.push(<path key={K()} d={'M' + f1(P0[0]) + ' ' + f1(P0[1]) + 'A' + ra + ' ' + ra + ' 0 1 0 ' + f1(P1[0]) + ' ' + f1(P1[1])} fill="none" stroke={ink} strokeWidth={1.5} />)
        top.push(<text key={K()} x={f1(apex[0] - apexDir[0] * (ra + 11))} y={f1(apex[1] - apexDir[1] * (ra + 11))} className="nets-dim-label">{fmtDeg(c.sectorAngle || 0)}°</text>)
        const e2 = edges[1], sm = mid2(e2.a!, e2.b!), sn = e2.out!
        top.push(<text key={K()} x={f1(sm[0] - sn[0] * 14)} y={f1(sm[1] - sn[1] * 14)} className="nets-dim-label"><tspan fontStyle="italic">s</tspan> = {c.s}</text>)
      }
    }
    top.unshift(...labs)
    // the cone's apex
    if (apex) {
      const vstate = stateOf(ctx, 'net', 'vertex', 'V', 'np:apex')
      if (p.sel && p.sel.id === 'V' && p.wide) top.push(<text key={K()} x={f1(apex[0] - apexDir[0] * 30)} y={f1(apex[1] - apexDir[1] * 30)} className="nets-ang-label">{fmtDeg(ns.curved!.sectorAngle || 0)}°</text>)
      vertexEls(apex, apexDir, 'Apex', vstate, isHov(p.hover, 'vertex', 'V'), countNo(ctx, 'vertex', 'V'), true)
      const vsel: PickSel = { kind: 'vertex', id: 'V', part: 'np:apex' }
      G.hits.v.push({ x: apex[0], y: apex[1], sel: vsel })
      const dom = domId('v-apex')
      top.push(<circle key={K()} id={dom} cx={f1(apex[0])} cy={f1(apex[1])} r={1} fill="none" role="button" aria-label="Apex" />)
      G.nav.push({ dom, kind: 'vertex', sel: vsel, ring: <circle cx={f1(apex[0])} cy={f1(apex[1])} r={12} /> })
      if (vstate === 'partner') G.spots.push(apex)
    }
    faces.forEach(o => { const cn = countNo(ctx, 'face', o.id); if (cn) top.push(badgeEl(o.lp[0], o.lp[1] + 17, cn)) })
  }
  G.els = <><defs>{defs}</defs>{out}{top}</>
  return G
}

function netHit(G: Geo | null, x: number, y: number, touch: boolean): PickSel | null {
  if (!G) return null
  const vt = touch ? 16 : 10, et = touch ? 12 : 8
  let best: PickSel | null = null, bd = Infinity
  G.hits.v.forEach(h => { const d = Math.hypot(h.x - x, h.y - y); if (d <= vt && d < bd) { bd = d; best = h.sel } })
  if (best) return best
  const nearTangent = G.tangents.some(q => Math.hypot(q[0] - x, q[1] - y) <= et + 2)
  if (!nearTangent) {
    G.hits.e.forEach(h => { const d = h.dist ? h.dist(x, y) : segDist(x, y, h.a!, h.b!); if (d <= et && d < bd) { bd = d; best = h.sel } })
    if (best) return best
  }
  for (let i = G.hits.f.length - 1; i >= 0; i--) {
    const h = G.hits.f[i]
    if (h.inside ? h.inside(x, y) : pip(x, y, h.poly!)) return h.sel
  }
  return null
}

const NetView = forwardRef<NetHandle, Props>(function NetView(props, ref) {
  const { ns, ni } = props
  const boxRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const pingRef = useRef<SVGGElement>(null)
  const tipRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<[number, number]>([0, 0])
  const [nk, setNk] = useState({ idx: 0, kbd: false, focused: false })
  const pressRef = useRef<{ x: number; y: number; type: string } | null>(null)
  const ptrRef = useRef<[number, number]>([0, 0])
  const propsRef = useRef(props)
  propsRef.current = props

  useEffect(() => {
    const box = boxRef.current
    if (!box) return
    const ro = new ResizeObserver(() => setSize([box.clientWidth, box.clientHeight]))
    ro.observe(box)
    setSize([box.clientWidth, box.clientHeight])
    return () => ro.disconnect()
  }, [])
  useEffect(() => { setNk(k => ({ ...k, idx: 0 })) }, [ns, ni])

  const [W, H] = size
  const geo = useMemo(
    () => (W && H ? buildGeo(props, W, H) : null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ns, ni, props.sel, props.hover, props.show, props.count, props.T, props.wide, W, H],
  )
  const geoRef = useRef(geo)
  geoRef.current = geo

  useImperativeHandle(ref, () => ({
    ping() { addPings(pingRef.current, geoRef.current ? geoRef.current.spots : []) },
  }))

  const local = (e: React.PointerEvent): [number, number] => {
    const r = svgRef.current!.getBoundingClientRect()
    return [e.clientX - r.left, e.clientY - r.top]
  }
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    const q = local(e)
    pressRef.current = { x: q[0], y: q[1], type: e.pointerType }
    if (nk.kbd) setNk(k => ({ ...k, kbd: false }))
  }
  const onPointerUp = (e: React.PointerEvent) => {
    const pr = pressRef.current
    if (!pr) return
    pressRef.current = null
    const q = local(e), touch = pr.type === 'touch' || pr.type === 'pen'
    if (Math.hypot(q[0] - pr.x, q[1] - pr.y) > (touch ? 10 : 6)) return
    const hit = netHit(geoRef.current, q[0], q[1], touch)
    props.onPick(hit ? { ...hit, source: 'net' } : null)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !props.fine) return
    const q = local(e)
    ptrRef.current = q
    const h = netHit(geoRef.current, q[0], q[1], false)
    const cur = props.hover
    const next: Hover | null = h ? { kind: h.kind, id: h.id, view: 'net' } : null
    if ((!next && cur?.view === 'net') || (next && (!cur || cur.kind !== next.kind || cur.id !== next.id || cur.view !== 'net'))) props.onHover(next)
    else placeTip()
  }
  const onKeyDown = (e: React.KeyboardEvent) => {
    const nav = geo ? geo.nav : []
    if (!nav.length) return
    let i = Math.min(nk.idx, nav.length - 1)
    const kinds: Kind[] = ['face', 'edge', 'vertex']
    const firstOf = (k: Kind) => nav.findIndex(n => n.kind === k)
    switch (e.key) {
      case 'ArrowRight': i = (i + 1) % nav.length; break
      case 'ArrowLeft': i = (i - 1 + nav.length) % nav.length; break
      case 'ArrowDown': case 'ArrowUp': {
        const k = kinds.indexOf(nav[i].kind), dir = e.key === 'ArrowDown' ? 1 : -1
        for (let s = 1; s <= 3; s++) { const j = firstOf(kinds[(k + dir * s + 3) % 3]); if (j >= 0) { i = j; break } }
        break
      }
      case 'Enter': case ' ': {
        const it = nav[i]
        setNk(k => ({ ...k, kbd: true }))
        props.onPick({ ...it.sel, source: 'net' })
        e.preventDefault()
        return
      }
      case 'Escape': props.onEscape(); e.preventDefault(); return
      default: return
    }
    e.preventDefault()
    setNk(k => ({ ...k, idx: i, kbd: true }))
  }

  function placeTip() {
    const tip = tipRef.current, box = boxRef.current
    if (!tip || !box) return
    const p = propsRef.current, h = p.hover
    if (!h || h.view !== 'net' || !p.fine) { tip.classList.add('hidden'); return }
    tip.textContent = tipText(p.ns, p.ni, h)
    tip.classList.remove('hidden')
    const [px, py] = ptrRef.current, w = tip.offsetWidth
    let x = px + 12, y = py + 14
    if (x + w > box.clientWidth - 4) x = px - w - 10
    if (y + 22 > box.clientHeight) y = py - 30
    tip.style.left = x + 'px'
    tip.style.top = y + 'px'
  }
  useLayoutEffect(placeTip)

  const navItem = geo && geo.nav.length ? geo.nav[Math.min(nk.idx, geo.nav.length - 1)] : null
  return (
    <div ref={boxRef} className="nets-stage nets-stage-net relative rounded-lg overflow-hidden">
      <svg
        ref={svgRef}
        className="nets-net-svg"
        viewBox={`0 0 ${W || 1} ${H || 1}`}
        tabIndex={0}
        role="group"
        aria-label={'Net of ' + ns.lower + '. Arrow keys move between parts; Enter selects.'}
        aria-activedescendant={navItem ? navItem.dom : undefined}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => { pressRef.current = null }}
        onPointerMove={onPointerMove}
        onPointerLeave={() => { if (props.hover?.view === 'net') props.onHover(null) }}
        onFocus={() => setNk(k => ({ ...k, focused: true }))}
        onBlur={() => setNk(k => ({ ...k, focused: false }))}
        onKeyDown={onKeyDown}
      >
        {geo && geo.els}
        {nk.focused && nk.kbd && navItem && (
          <g fill="none" stroke={rgb(props.T.focus)} strokeWidth={2} strokeDasharray="4 3">{navItem.ring}</g>
        )}
        <g ref={pingRef} />
      </svg>
      <div className="absolute top-2 left-2.5 text-[11px] font-semibold text-gray-500 dark:text-gray-400 pointer-events-none">{ni.caption}</div>
      <div ref={tipRef} className="hidden absolute z-[5] pointer-events-none whitespace-nowrap text-[11.5px] font-semibold text-white bg-gray-900/90 dark:bg-gray-100 dark:text-gray-900 rounded-full px-2 py-0.5" />
    </div>
  )
})

export default NetView
