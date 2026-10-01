// The 3D view: the solid (or the net part-folded) on the solid3d stage, with taped-edge tags and
// Count Along badges drawn on an overlay. React state drives what it draws; the stage itself is an
// imperative engine object created once and destroyed on unmount.
import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react'
import { createStage, reducedMotion, type Stage, type SceneItem, type Camera } from '../lib/solid3d.ts'
import { foldState, meetLines, logicalFaceOf, type NetShape, type NetInfo, type FoldState, type Vec3, type Vec2 } from '../lib/nets.ts'
import {
  LIT, shapeIndex, seamEdge, stateOf, countNo, isHov, tipText, rgb, mix, pairCol, dist, mid3, lerp3, mean3, dot3, unit3,
  labelPt3, area2, f1, addPings, type Sel, type Hover, type CountState, type Show, type Tokens, type StateCtx, type Kind,
} from './common'

const RAD = Math.PI / 180
// The mockup's spec yaw −35° from the front is −55° in the engine's terms (a front-right view).
const HOME = { yaw: -55 * RAD, pitch: 22 * RAD }
// While part-folded the net is seen from higher up, so the flat faces don't go edge-on.
const FOLD_VIEW = { yaw: -60 * RAD, pitch: 50 * RAD }
const LIGHT = unit3([-0.45, 0.65, 0.62])
const CLOSED = 0.995

export interface Solid3DHandle {
  /** Turn the solid so a selected part on its hidden side comes into view. True if it turned. */
  autoTurn(s: Sel): boolean
  ping(): void
  resetView(): void
}

interface Props {
  ns: NetShape
  ni: NetInfo
  sel: Sel | null
  hover: Hover | null
  show: Show
  see: boolean
  count: CountState | null
  foldT: number
  playing: boolean
  T: Tokens
  fine: boolean
  coarse: boolean
  onPick(s: Sel | null): void
  onHover(h: Hover | null): void
  onEscape(): void
}

interface Basis { R: Vec3; U: Vec3; E: Vec3 }
function camBasis(c: Camera): Basis {
  const cy = Math.cos(c.yaw), sy = Math.sin(c.yaw), cp = Math.cos(c.pitch), sp = Math.sin(c.pitch)
  return { R: [-sy, cy, 0], U: [-sp * cy, -sp * sy, cp], E: [cp * cy, cp * sy, sp] }
}
interface PickData { kind: Kind; id: string; part: string }
interface Tag { p: Vec3; num: number; logical: string; part: string }
interface Badge { p: Vec3; n: number; dx?: number; dy?: number }
interface Frame { see: boolean; spots: Vec3[]; badges: Badge[]; tags: Tag[] }

function tagSVG(T: Tokens, x: number, y: number, num: number, lit: boolean, dim: boolean, op = 1): string {
  const s = lit ? 1.25 : 1, h = 8 * s, o = (dim ? 0.25 : 1) * op
  return '<g opacity="' + o + '">' +
    (lit ? '<rect x="' + f1(x - h - 4) + '" y="' + f1(y - h - 4) + '" width="' + f1(2 * h + 8) + '" height="' + f1(2 * h + 8) + '" rx="' + f1(4 * s + 3) + '" fill="' + rgb(T.ink) + '"/>' : '') +
    '<rect x="' + f1(x - h - 2) + '" y="' + f1(y - h - 2) + '" width="' + f1(2 * h + 4) + '" height="' + f1(2 * h + 4) + '" rx="' + f1(4 * s + 2) + '" fill="' + rgb(T.stage) + '"/>' +
    '<rect x="' + f1(x - h) + '" y="' + f1(y - h) + '" width="' + f1(2 * h) + '" height="' + f1(2 * h) + '" rx="' + f1(4 * s) + '" fill="' + rgb(pairCol(T, num)) + '"/>' +
    '<text x="' + f1(x) + '" y="' + f1(y + 0.5) + '" class="nets-tag-num"' + (lit ? ' style="font-size:13px"' : '') + '>' + num + '</text></g>'
}
function badgeSVG(T: Tokens, x: number, y: number, n: number): string {
  return '<g><circle cx="' + f1(x) + '" cy="' + f1(y) + '" r="9" fill="' + rgb(T.ink) + '"/><text x="' + f1(x) + '" y="' + f1(y + 0.5) + '" class="nets-badge-num">' + n + '</text></g>'
}

const Solid3DView = forwardRef<Solid3DHandle, Props>(function Solid3DView(props, ref) {
  const { ns, ni, foldT, fine } = props
  const boxRef = useRef<HTMLDivElement>(null)
  const hostRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<SVGSVGElement>(null)
  const mainRef = useRef<SVGGElement>(null)
  const pingRef = useRef<SVGGElement>(null)
  const tipRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<Stage | null>(null)
  const propsRef = useRef(props)
  propsRef.current = props
  const frameRef = useRef<Frame>({ see: false, spots: [], badges: [], tags: [] })
  const cacheRef = useRef<{ key: string; fs: FoldState | null }>({ key: '', fs: null })
  const draggingRef = useRef(false)
  const foldCamRef = useRef<{ prev: Camera; dragged: boolean } | null>(null)
  const lastRef = useRef<{ key: string; t: number }>({ key: '', t: 1 })
  const ptrRef = useRef<[number, number]>([0, 0])
  // The hint shows until the first drag; a plain wheel over the stage flashes the Ctrl + scroll tip.
  const [dragged, setDragged] = useState(false)
  const [wheelHint, setWheelHint] = useState(0)

  function foldAt(t: number): FoldState {
    const p = propsRef.current
    const key = p.ns.key + '|' + p.ni.id + '|' + t
    if (cacheRef.current.key !== key || !cacheRef.current.fs) cacheRef.current = { key, fs: foldState(p.ns.shape, p.ni.net, t) }
    return cacheRef.current.fs!
  }

  /** Zoom and target that frame the part-folded net from orientation cam, scaled so the closed
   *  solid lands exactly on the home framing (zoom 1, target = centre) at t = 1. */
  function fitFor(t: number, cam: { yaw: number; pitch: number }): { zoom: number; target: Vec3 } {
    const st = stageRef.current!, p = propsRef.current
    const B = camBasis({ ...st.getCamera(), yaw: cam.yaw, pitch: cam.pitch })
    const ext = (tt: number) => {
      const fs = foldAt(tt)
      const lo = [Infinity, Infinity], hi = [-Infinity, -Infinity]
      let e = 0, n = 0
      Object.keys(fs.faces).forEach(f => fs.faces[f].forEach(q => {
        const x = dot3(q, B.R), y = dot3(q, B.U)
        lo[0] = Math.min(lo[0], x); hi[0] = Math.max(hi[0], x); lo[1] = Math.min(lo[1], y); hi[1] = Math.max(hi[1], y)
        e += dot3(q, B.E); n++
      }))
      const cx = (lo[0] + hi[0]) / 2, cy = (lo[1] + hi[1]) / 2, ce = e / n
      const c: Vec3 = [0, 1, 2].map(k => B.R[k] * cx + B.U[k] * cy + B.E[k] * ce) as Vec3
      return { w: Math.max(hi[0] - lo[0], 1e-6), h: Math.max(hi[1] - lo[1], 1e-6), c }
    }
    const sz = st.size(), W = sz.width || 1, H = sz.height || 1
    const a = ext(t), b = ext(1)
    const fitScale = (x: { w: number; h: number }) => Math.min(W / x.w, H / x.h)
    // Flat: the net fills ~80% of the stage (room for letters and tags). Closed: exactly the home
    // framing (zoom 1). In between, a blend of the two.
    const s1 = Math.min(W, H) / (2 * st.options.fit)
    const zoom = fitScale(a) * ((1 - t) * 0.8 / s1 + t / fitScale(b))
    const target: Vec3 = [0, 1, 2].map(k => a.c[k] + (p.ns.centre[k] - b.c[k]) * t) as Vec3
    return { zoom, target }
  }
  function applyFit() {
    const st = stageRef.current
    if (!st) return
    const t = propsRef.current.foldT
    if (t >= CLOSED) { st.setCamera({ zoom: 1, target: propsRef.current.ns.centre }); return }
    st.setCamera(fitFor(t, st.getCamera()))
  }

  /* ── scene ── */
  function scene(sg: Stage): SceneItem[] {
    const p = propsRef.current
    const { ns, ni, T, show } = p
    const net = ni.net, ix = shapeIndex(ns), t = p.foldT, closed = t >= CLOSED
    const FS = foldAt(closed ? 1 : t)
    const see = p.see || !!(p.count && p.count.see)
    const B = camBasis(sg.getCamera())
    const ctx: StateCtx = { ns, sel: p.sel, count: p.count }
    const fr: Frame = { see, spots: [], badges: [], tags: [] }
    frameRef.current = fr
    const items: SceneItem[] = []
    const proj = (q: Vec3): Vec2 => { const r = sg.project(q); return [r.x, r.y] }
    const bc: Vec3 = [0, 1, 2].map(k => (FS.bounds.min[k] + FS.bounds.max[k]) / 2) as Vec3
    const centreS = sg.project(bc)
    const ink = rgb(T.ink), stageC = rgb(T.stage)
    const hitW = p.coarse ? 24 : 16, hitR = p.coarse ? 16 : 10
    const shade = (c: [number, number, number], n: Vec3): [number, number, number] => {
      const vn: Vec3 = [dot3(n, B.R), dot3(n, B.U), dot3(n, B.E)]
      const lam = Math.max(0, dot3(vn, LIGHT))
      // Gentler than the mockup's 0.8 floor so pale faces (amber, orange) don't go muddy in light mode.
      const k = T.dark ? 0.8 + 0.2 * lam : 0.9 + 0.1 * lam
      return [c[0] * k, c[1] * k, c[2] * k]
    }

    const addEdge = (o: { a?: Vec3; b?: Vec3; pts?: Vec3[]; tagP?: Vec3; taped: boolean; thin?: boolean; num: number; id: string; logical: string; part: string; outline?: boolean }) => {
      const state = stateOf(ctx, 'solid', 'edge', o.logical, o.part), lit = LIT[state], hov = isHov(p.hover, 'edge', o.logical), cn = countNo(ctx, 'edge', o.logical)
      const geo = o.pts ? { type: 'line' as const, pts: o.pts, closed: true } : { type: 'seg' as const, a: o.a!, b: o.b! }
      const base = { hiddenStyle: see ? 'dash' as const : 'hide' as const, hiddenDash: '2 3', pickHidden: see }
      let col = o.taped ? rgb(pairCol(T, o.num)) : rgb(T.edge3d), w = o.taped ? (o.thin ? 1.5 : 3) : 1.25, op = o.taped ? 1 : 0.8
      if (lit || o.outline) {
        items.push({ ...geo, ...base, stroke: ink, width: lit ? 8 : 7, hiddenOpacity: 0.5 })
        if (lit) { w = o.taped ? 4 : 3; if (!o.taped) { col = ink; op = 1 } }
      } else if (hov) items.push({ ...geo, ...base, stroke: ink, width: w + 4, opacity: 0.55, hiddenOpacity: 0.3 })
      if (state === 'dim') op = 0.25
      items.push({
        ...geo, ...base, id: o.id, stroke: col, width: w, opacity: op, hiddenOpacity: Math.round(60 * op) / 100, hitWidth: hitW,
        data: { kind: 'edge', id: o.logical, part: o.part } satisfies PickData,
      })
      const at = o.tagP || (o.pts ? null : mid3(o.a!, o.b!))
      if (at && state === 'partner') fr.spots.push(at)
      if (at && cn) fr.badges.push({ p: at, n: cn, dy: -15 })
    }
    const addVertex = (q: Vec3, part: string, v: string) => {
      const state = stateOf(ctx, 'solid', 'vertex', v, part), lit = LIT[state], hov = isHov(p.hover, 'vertex', v), cn = countNo(ctx, 'vertex', v)
      const hs = see ? 'dim' as const : 'hide' as const, data: PickData = { kind: 'vertex', id: v, part }
      if (lit) {
        items.push({ type: 'pt', p: q, r: 9, fill: 'none', stroke: ink, strokeWidth: 1.5, hiddenStyle: hs })
        items.push({ type: 'pt', p: q, r: 6, fill: ink, hiddenStyle: hs, id: 'V|' + part, hitRadius: hitR, data })
      } else {
        if (hov) items.push({ type: 'pt', p: q, r: 8, fill: 'none', stroke: ink, strokeWidth: 1.5, opacity: 0.55, hiddenStyle: hs })
        items.push({ type: 'pt', p: q, r: 2.5, fill: rgb(T.dot), opacity: state === 'dim' ? 0.3 : 1, hiddenStyle: hs, id: 'V|' + part, hitRadius: hitR, data })
      }
      if (show.verts) {
        const r = sg.project(q)
        let dx = r.x - centreS.x, dy = r.y - centreS.y, L = Math.hypot(dx, dy)
        if (L < 1) { dx = 0; dy = -1; L = 1 }
        const off = lit ? 16 : 12
        items.push({
          type: 'label', p: q, text: v === 'V' ? 'Apex' : v, dx: (dx / L) * off, dy: (dy / L) * off, hiddenStyle: hs,
          className: 'v-letter' + (v === 'V' ? ' apex' : '') + (lit ? ' is-sel' : '') + (state === 'dim' ? ' is-dim' : ''),
        })
      }
      if (state === 'partner') fr.spots.push(q)
      if (cn) fr.badges.push({ p: q, n: cn })
    }

    /* faces (names are added last, minus any a visible tag would cover) */
    const faceLabels: { face: string; item: SceneItem & { type: 'label' } }[] = []
    let bestCurved: { facing: number; p: Vec3 } | null = null
    net.order.forEach(f => {
      const pts = FS.faces[f], n = FS.normals[f], lf = logicalFaceOf(ns.shape, net, f)
      const info = ix.info[lf]
      if (!info) return
      const facing = dot3(n, B.E), front = facing > 0
      const state = stateOf(ctx, 'solid', 'face', lf, 'F|' + lf), lit = LIT[state], hov = isHov(p.hover, 'face', lf)
      let col = front ? shade(T.face[info.ci], n) : mix(T.face[info.ci], T.paper, 0.6)
      if (state === 'dim') col = mix(col, T.stage, 0.3)
      const a = area2(pts.map(proj)), fill = rgb(col)
      items.push({
        type: 'poly', id: 'F|' + f, pts, normal: n, fill, fillOpacity: see ? 0.25 : 1, stroke: fill, strokeWidth: 0.6, strokeOpacity: see ? 0.25 : 1,
        cull: closed && !see, pickable: a >= 120 && (front || !closed) && !(see && closed && !front),
        data: { kind: 'face', id: lf, part: 'F|' + lf } satisfies PickData,
      })
      if (lf === 'curved') {
        if (front && (!bestCurved || facing > bestCurved.facing)) bestCurved = { facing, p: mean3(pts) }
        return
      }
      const lp = labelPt3(pts)
      if ((lit || hov) && (front || !closed)) {
        items.push({ type: 'line', pts, closed: true, stroke: lit ? stageC : ink, width: lit ? 7 : 2, opacity: lit ? 1 : 0.55, hiddenStyle: 'hide' })
        if (lit) items.push({ type: 'line', pts, closed: true, stroke: ink, width: 3, hiddenStyle: 'hide' })
      }
      if (state === 'partner' && (front || !closed)) fr.spots.push(lp)
      const cn = countNo(ctx, 'face', lf)
      if (cn && (front || see)) fr.badges.push({ p: lp, n: cn, dy: 15 })
      if (show.faces && facing > 0.25 && a >= 1400) faceLabels.push({ face: lf, item: { type: 'label', p: lp, text: info.short || info.name, className: 'f-label' + (state === 'dim' ? ' is-dim' : ''), hiddenStyle: 'hide' } })
    })
    const bcv = bestCurved as { facing: number; p: Vec3 } | null
    if (bcv) {
      const cstate = stateOf(ctx, 'solid', 'face', 'curved', 'F|curved')
      if (show.faces) items.push({ type: 'label', p: bcv.p, text: 'Curved', className: 'f-label' + (cstate === 'dim' ? ' is-dim' : ''), hiddenStyle: 'hide' })
      if (cstate === 'partner') fr.spots.push(bcv.p)
      const cn = countNo(ctx, 'face', 'curved')
      if (cn) fr.badges.push({ p: bcv.p, n: cn, dy: 15 })
    }

    /* edges */
    const curvedLit = !!ns.curved && LIT[stateOf(ctx, 'solid', 'face', 'curved', 'F|curved')]
    if (closed && !ns.curved) {
      ns.shape.solid.edges.forEach(e => {
        const a = ix.vertex[e.v[0]], b = ix.vertex[e.v[1]], num = ni.pairNo[e.id]
        addEdge({ a, b, taped: !!num, num, id: 'E|' + e.id, logical: e.id, part: 'E|' + e.id })
        if (num) fr.tags.push({ p: mid3(a, b), num, logical: e.id, part: 'E|' + e.id })
      })
    } else if (closed) {
      const cstate = stateOf(ctx, 'solid', 'face', 'curved', 'F|curved')
      ns.shape.solid.edges.forEach(e => {
        if (e.group !== 'ruling') return
        const f0 = ix.face[e.faces[0]], f1n = ix.face[e.faces[1]]
        if ((dot3(f0.normal, B.E) > 0) === (dot3(f1n.normal, B.E) > 0)) return // silhouette rulings only
        const a = ix.vertex[e.v[0]], b = ix.vertex[e.v[1]]
        if (curvedLit) {
          items.push({ type: 'seg', a, b, stroke: stageC, width: 7, hiddenStyle: 'hide' })
          items.push({ type: 'seg', a, b, stroke: ink, width: 3, hiddenStyle: 'hide' })
        } else items.push({ type: 'seg', a, b, stroke: rgb(T.edge3d), width: 1.25, opacity: cstate === 'dim' ? 0.25 : 0.8, hiddenStyle: 'hide' })
      })
      const ring = (pref: string) => { const out: Vec3[] = []; for (let i = 0; i < 32; i++) out.push(ix.vertex[pref + i]); return out }
      const rims: [string, Vec3[]][] = ns.curved!.kind === 'cylinder' ? [['topRim', ring('t')], ['baseRim', ring('b')]] : [['baseRim', ring('b')]]
      rims.forEach(([id, pts]) => {
        let k = 0, bestD = -Infinity
        pts.forEach((q, i) => { const d = dot3(q, B.E); if (d > bestD) { bestD = d; k = i } })
        const tagP = pts[k]
        addEdge({ pts, tagP, taped: true, num: ni.pairNo[id], id: 'E|' + id, logical: id, part: 'E|' + id, outline: curvedLit })
        fr.tags.push({ p: tagP, num: ni.pairNo[id], logical: id, part: 'E|' + id })
      })
      const se = ix.edge[seamEdge(ni)]
      if (se) {
        const sa = ix.vertex[se.v[0]], sb = ix.vertex[se.v[1]]
        addEdge({ a: sa, b: sb, taped: true, thin: true, num: 1, id: 'E|seam', logical: 'seam', part: 'E|seam' })
        fr.tags.push({ p: mid3(sa, sb), num: 1, logical: 'seam', part: 'E|seam' })
      }
    } else {
      // Part-folded: every net edge where its face is now; taped pairs show both copies.
      const groups: Record<string, Tag[]> = {}
      net.netEdges.forEach(ne => {
        if (ne.smooth) return
        const P = FS.faces[ne.face], a = P[ne.i], b = P[(ne.i + 1) % P.length]
        const logical = ns.curved ? (ne.group || 'seam') : ne.solidEdge
        const taped = ne.kind === 'cut', num = ni.pairNo[logical]
        addEdge({ a, b, taped, thin: logical === 'seam', num, id: 'N|' + ne.id, logical, part: 'N|' + ne.id })
        if (!taped) return
        if (!ns.curved) fr.tags.push({ p: mid3(a, b), num, logical, part: 'N|' + ne.id })
        else {
          const cap = ne.face === 'base' || ne.face === 'top'
          const key = logical === 'seam' ? 'seam|' + ne.face : logical + '|' + (cap ? 'cap' : 'strip')
          ;(groups[key] = groups[key] || []).push({ p: mid3(a, b), num, logical, part: 'N|' + ne.id })
        }
      })
      Object.keys(groups).forEach(k => { const g = groups[k]; fr.tags.push(g[Math.floor(g.length / 2)]) })
    }

    /* vertices */
    if (!ns.curved) {
      if (closed) ns.shape.solid.vertices.forEach(v => addVertex(v.p, 'V|' + v.id, v.id))
      else Object.keys(FS.corners3d).forEach(v => {
        const seen: Vec3[] = []
        FS.corners3d[v].forEach(q => {
          if (seen.some(s => dist(q, s) < 1e-6)) return
          seen.push(q)
          addVertex(q, 'C|' + v + '|' + seen.length, v)
        })
      })
    } else if (ns.curved.kind === 'cone') {
      addVertex(closed ? ix.vertex.V : FS.corners3d.V[0], 'V|V', 'V')
    }

    if (faceLabels.length) {
      const tagAt = show.edges ? fr.tags.filter(tg => {
        if (!closed || ns.curved) return true
        const e = ix.edge[tg.logical]
        return !!e && e.faces.some(f => dot3(ix.face[f].normal, B.E) > 0)
      }).map(tg => sg.project(tg.p)) : []
      // The slant-height callout runs across the selected sloping face: its name gives way.
      const callout = ns.slant && closed && p.sel && p.sel.kind === 'face' && p.sel.id !== 'base' ? p.sel.id : null
      faceLabels.forEach(({ face, item: L }) => {
        if (face === callout) return
        const q = sg.project(L.p), hw = String(L.text).length * 3.4 + 2
        if (!tagAt.some(tq => Math.abs(tq.x - q.x) < 10 + hw && Math.abs(tq.y - q.y) < 17)) items.push(L)
      })
    }

    /* meet lines while part-folded: which cut edges will be taped, where a corner ends up */
    const sel = p.sel
    if (!closed && sel && !p.count) {
      const op = 0.7 * Math.sqrt(Math.max(0, 1 - t))
      let ml: ReturnType<typeof meetLines> | null = null
      if (sel.kind === 'edge' && (!ns.curved || sel.id === 'seam')) ml = meetLines(ns.shape, net, t, { kind: 'edge', id: sel.id })
      else if (sel.kind === 'vertex') ml = meetLines(ns.shape, net, t, { kind: 'vertex', id: sel.id })
      if (ml && op > 0.02) {
        ml.segments.forEach(([a, b]) => items.push({ type: 'seg', a, b, stroke: ink, width: 1.5, dash: '2 4', opacity: op, hiddenStyle: 'show', layer: 1 }))
        if (ml.target) items.push({ type: 'pt', p: ml.target, r: 7, fill: 'none', stroke: ink, strokeWidth: 1.5, opacity: op, hiddenStyle: 'show', layer: 1 })
      }
    }

    /* slant height callout (square pyramid and cone) */
    if (ns.slant && closed && sel && sel.kind === 'face' && sel.id !== 'base') {
      const apex = ix.vertex[ns.slant.apex]
      let foot: Vec3
      if (ns.curved) {
        let bk = 0, bd = -Infinity
        const look: Vec3 = [B.R[0] * 0.7 + B.E[0] * 0.7, B.R[1] * 0.7 + B.E[1] * 0.7, 0]
        for (let i = 0; i < 32; i++) { const d = dot3(ix.vertex['b' + i], look); if (d > bd) { bd = d; bk = i } }
        foot = ix.vertex['b' + bk]
      } else {
        const fv = ix.face[sel.id].verts.filter(v => v !== ns.slant!.apex)
        foot = mid3(ix.vertex[fv[0]], ix.vertex[fv[1]])
      }
      const c0: Vec3 = [0, 0, 0]
      items.push({ type: 'seg', a: apex, b: c0, stroke: ink, width: 1.5, dash: '2 4', hiddenStyle: 'show', layer: 2 })
      items.push({ type: 'seg', a: apex, b: foot, stroke: ink, width: 2.5, hiddenStyle: 'show', layer: 2 })
      // Each label on the far side of its own line from the other line, so they never overlap.
      const sR = sg.project(foot).x >= sg.project(c0).x
      items.push({ type: 'label', p: lerp3(apex, foot, 0.6), text: 's = ' + ns.slant.s, className: 'callout', dx: sR ? 9 : -9, anchor: sR ? 'start' : 'end', layer: 2 })
      items.push({ type: 'label', p: lerp3(apex, c0, 0.45), text: 'h = ' + ns.slant.h, className: 'callout', dx: sR ? -9 : 9, anchor: sR ? 'end' : 'start', layer: 2 })
    }
    return items
  }

  function drawOverlay() {
    const st = stageRef.current, svg = overlayRef.current, g = mainRef.current
    if (!st || !svg || !g) return
    const p = propsRef.current, fr = frameRef.current, T = p.T
    const ctx: StateCtx = { ns: p.ns, sel: p.sel, count: p.count }
    const sz = st.size(), out: string[] = []
    svg.setAttribute('viewBox', '0 0 ' + sz.width + ' ' + sz.height)
    if (p.show.edges) fr.tags.forEach(tg => {
      const hidden = st.isHidden(tg.p)
      if (hidden && !fr.see) return
      const q = st.project(tg.p), s = stateOf(ctx, 'solid', 'edge', tg.logical, tg.part)
      out.push(tagSVG(T, q.x, q.y, tg.num, LIT[s], s === 'dim', hidden ? 0.6 : 1))
    })
    fr.badges.forEach(b => {
      if (st.isHidden(b.p) && !fr.see) return
      const q = st.project(b.p)
      out.push(badgeSVG(T, q.x + (b.dx || 0), q.y + (b.dy || 0), b.n))
    })
    g.innerHTML = out.join('')
  }

  /* ── create the stage once ── */
  useEffect(() => {
    const host = hostRef.current, box = boxRef.current
    if (!host || !box) return
    const p = propsRef.current
    const st = createStage(host, {
      height: box.clientHeight || 280, fit: p.ns.radius * 1.12, minZoom: 0.06, maxZoom: 4,
      pitchRange: [-80 * RAD, 80 * RAD], rotateSpeedX: 0.5, rotateSpeedY: 0.5, wheelZoom: 'ctrl', doubleTapReset: false,
      hitWidth: p.coarse ? 24 : 16, ptHitRadius: p.coarse ? 16 : 10, orientSort: false,
      role: 'group', roleDescription: null,
      label: '3D view of ' + p.ns.lower + ', folded. Drag or use the arrow keys to turn it.',
      camera: { yaw: HOME.yaw, pitch: HOME.pitch, zoom: 1, target: p.ns.centre, projection: 'orthographic' },
    })
    stageRef.current = st
    lastRef.current = { key: p.ns.key, t: p.foldT }
    st.render(scene)
    const offs = [
      st.on('render', drawOverlay),
      st.on('pick', e => {
        const d = e.data as PickData | undefined
        if (!e.id || !d) propsRef.current.onPick(null)
        else propsRef.current.onPick({ kind: d.kind, id: d.id, part: d.part, source: 'solid' })
      }),
      st.on('hover', e => {
        if (!propsRef.current.fine) return
        const d = e.data as PickData | undefined
        propsRef.current.onHover(d ? { kind: d.kind, id: d.id, view: 'solid' } : null)
      }),
      st.on('camera', () => {
        if (!draggingRef.current) return
        setDragged(true)
        if (foldCamRef.current) foldCamRef.current.dragged = true
      }),
      st.on('wheelIgnored', () => setWheelHint(n => n + 1)),
    ]
    const svg = st.svg
    const down = () => { draggingRef.current = true }
    const up = () => { draggingRef.current = false }
    const move = (e: PointerEvent) => {
      const r = box.getBoundingClientRect()
      ptrRef.current = [e.clientX - r.left, e.clientY - r.top]
      placeTip()
    }
    const leave = () => { if (propsRef.current.hover?.view === 'solid') propsRef.current.onHover(null) }
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') { propsRef.current.onEscape(); e.preventDefault() } }
    svg.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
    svg.addEventListener('pointermove', move)
    svg.addEventListener('pointerleave', leave)
    svg.addEventListener('keydown', key)
    const ro = new ResizeObserver(() => {
      const h = box.clientHeight
      if (h && st.options.height !== h) { st.options.height = h; st.resize() }
      if (propsRef.current.foldT < CLOSED) applyFit()
      st.redraw()
    })
    ro.observe(box)
    return () => {
      offs.forEach(f => f())
      ro.disconnect()
      svg.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
      svg.removeEventListener('pointermove', move)
      svg.removeEventListener('pointerleave', leave)
      svg.removeEventListener('keydown', key)
      st.destroy()
      stageRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ── shape, net and fold changes: framing ── */
  useEffect(() => {
    const st = stageRef.current
    if (!st) return
    const prev = lastRef.current, open = foldT < CLOSED, wasOpen = prev.t < CLOSED
    const rm = reducedMotion()
    if (prev.key !== ns.key) {
      st.options.fit = ns.radius * 1.12
      st.setHome({ yaw: HOME.yaw, pitch: HOME.pitch, zoom: 1, target: ns.centre, pan: [0, 0] })
      st.resetCamera({ animate: false })
      foldCamRef.current = null
      if (open) {
        foldCamRef.current = { prev: st.getCamera(), dragged: false }
        st.setCamera({ ...FOLD_VIEW, ...fitFor(foldT, FOLD_VIEW) })
      }
    } else if (open && !wasOpen) {
      // Opening from closed: look from higher up while it folds; come back afterwards.
      foldCamRef.current = { prev: st.getCamera(), dragged: false }
      const cam = st.getCamera()
      const to = cam.pitch >= FOLD_VIEW.pitch - 1e-6 ? { yaw: cam.yaw, pitch: cam.pitch } : FOLD_VIEW
      st.setCamera({ ...to, ...fitFor(foldT, to) }, { animate: rm ? false : 300 })
    } else if (open) {
      applyFit()
    } else if (wasOpen) {
      const fc = foldCamRef.current
      if (fc && !fc.dragged) st.setCamera({ yaw: fc.prev.yaw, pitch: fc.prev.pitch, zoom: 1, target: ns.centre }, { animate: rm ? false : 400 })
      else st.setCamera({ zoom: 1, target: ns.centre })
      foldCamRef.current = null
    }
    lastRef.current = { key: ns.key, t: foldT }
    st.svg.setAttribute('aria-label', '3D view of ' + ns.lower + ', ' + (open ? Math.round(foldT * 100) + '% folded' : 'folded') + '. Drag or use the arrow keys to turn it.')
    st.redraw()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ns, ni, foldT])

  // Everything else (selection, hover, toggles, theme) just redraws.
  useEffect(() => { stageRef.current?.redraw() })

  useEffect(() => {
    if (!wheelHint) return
    const id = window.setTimeout(() => setWheelHint(0), 1800)
    return () => window.clearTimeout(id)
  }, [wheelHint])

  /* ── tooltip ── */
  function placeTip() {
    const tip = tipRef.current, box = boxRef.current
    if (!tip || !box) return
    const p = propsRef.current, h = p.hover
    if (!h || h.view !== 'solid' || !p.fine) { tip.classList.add('hidden'); return }
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

  useImperativeHandle(ref, () => ({
    autoTurn(s: Sel) {
      const st = stageRef.current, p = propsRef.current
      if (!st || p.foldT < CLOSED || p.playing || draggingRef.current) return false
      const ix = shapeIndex(p.ns)
      let d: Vec3 | null = null
      if (s.kind === 'face') d = s.id === 'curved' ? null : ix.face[s.id]?.normal || null
      else if (s.kind === 'edge') {
        const e = p.ns.curved ? (s.id === 'seam' ? ix.edge[seamEdge(p.ni)] : null) : ix.edge[s.id]
        if (e) { const a = ix.face[e.faces[0]].normal, b = ix.face[e.faces[1]].normal; d = unit3([a[0] + b[0], a[1] + b[1], a[2] + b[2]]) }
      } else if (ix.vertex[s.id]) {
        const v = ix.vertex[s.id]
        d = unit3([v[0] - p.ns.centre[0], v[1] - p.ns.centre[1], v[2] - p.ns.centre[2]])
      }
      if (!d) return false
      if (dot3(d, camBasis(st.getCamera()).E) >= 0.3) return false
      const el = Math.asin(Math.max(-1, Math.min(1, d[2])))
      const yaw = Math.atan2(d[1], d[0]) + 15 * RAD
      let pitch = el > 1e-6 ? el - 15 * RAD : el + 15 * RAD
      pitch = Math.max(-80 * RAD, Math.min(80 * RAD, pitch))
      st.setCamera({ yaw, pitch }, { animate: 450 })
      return true
    },
    ping() {
      const st = stageRef.current
      if (!st) return
      addPings(pingRef.current, frameRef.current.spots.map(q => { const r = st.project(q); return [r.x, r.y] as Vec2 }))
    },
    resetView() {
      const st = stageRef.current, p = propsRef.current
      if (!st) return
      if (p.foldT >= CLOSED) st.resetCamera({ animate: 350 })
      else st.setCamera({ ...FOLD_VIEW, ...fitFor(p.foldT, FOLD_VIEW) }, { animate: 350 })
    },
  }))

  const hintText = wheelHint ? 'Ctrl + scroll to zoom' : fine ? 'Drag to turn · Ctrl + scroll to zoom' : 'Drag to turn'
  return (
    <div ref={boxRef} className="nets-stage relative rounded-lg overflow-hidden" style={{ touchAction: 'none' }}>
      <div ref={hostRef} className="absolute inset-0" />
      <svg ref={overlayRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
        <g ref={mainRef} />
        <g ref={pingRef} />
      </svg>
      {(wheelHint > 0 || !dragged) && (
        <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400 bg-white/85 dark:bg-gray-900/85 rounded-full px-2 py-0.5 pointer-events-none">
          <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.5 8a5.5 5.5 0 1 0 1.8-4.1" /><path d="M2.3 1.8v2.6h2.6" /></svg>
          {hintText}
        </div>
      )}
      <div ref={tipRef} className="hidden absolute z-[5] pointer-events-none whitespace-nowrap text-[11.5px] font-semibold text-white bg-gray-900/90 dark:bg-gray-100 dark:text-gray-900 rounded-full px-2 py-0.5" />
    </div>
  )
})

export default Solid3DView
