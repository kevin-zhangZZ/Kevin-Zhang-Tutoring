// Shared pieces of the Nets of 3D Shapes demo: selection state, names, colours and small geometry
// helpers used by both views, the info panel and the tables. All geometry comes from lib/nets.ts.
import { useEffect, useState, type ReactNode } from 'react'
import { reducedMotion } from '../lib/solid3d.ts'
import Katex from '../../../components/Katex'
import {
  NETS_PALETTE, splitMath, labelPoint,
  type NetShape, type NetInfo, type SolidFace, type SolidEdge, type FaceInfo, type Vec3, type Vec2,
} from '../lib/nets.ts'

/* ─────────────────────────────── selection ─────────────────────────────── */

export type Kind = 'face' | 'edge' | 'vertex'
/** What the student picked. id is LOGICAL: a solid face id or 'curved'; a solid edge id or
 *  'seam' / 'topRim' / 'baseRim'; a solid vertex id. part says which copy was clicked. */
export interface Sel { kind: Kind; id: string; part?: string | null; source: 'solid' | 'net' | 'panel' }
export interface Hover { kind: Kind; id: string; view?: 'solid' | 'net' }
export interface CountState { kind: Kind; list: string[]; n: number; see: boolean; done: boolean }
export interface Show { faces: boolean; edges: boolean; verts: boolean }
/** 'selected' (what was clicked), 'partner' (the same thing elsewhere), 'dim' or 'rest'. */
export type PartState = 'selected' | 'partner' | 'dim' | 'rest'
export const LIT: Record<PartState, boolean> = { selected: true, partner: true, dim: false, rest: false }

/* ─────────────────────────────── lookups ─────────────────────────────── */

export interface ShapeIndex {
  vertex: Record<string, Vec3>
  face: Record<string, SolidFace>
  edge: Record<string, SolidEdge>
  info: Record<string, FaceInfo>
}
const IX = new WeakMap<NetShape, ShapeIndex>()
export function shapeIndex(ns: NetShape): ShapeIndex {
  let ix = IX.get(ns)
  if (!ix) {
    const s = ns.shape.solid
    ix = { vertex: {}, face: {}, edge: {}, info: {} }
    s.vertices.forEach(v => { ix!.vertex[v.id] = v.p })
    s.faces.forEach(f => { ix!.face[f.id] = f })
    s.edges.forEach(e => { ix!.edge[e.id] = e })
    ns.faces.forEach(f => { ix!.info[f.id] = f })
    IX.set(ns, ix)
  }
  return ix
}
/** The solid edge the seam of a curved net becomes. */
export function seamEdge(ni: NetInfo): string {
  const e = ni.net.netEdges.find(x => x.kind === 'cut' && x.group === 'seam')
  return e ? e.solidEdge : ''
}

/* ─────────────────────────────── names ─────────────────────────────── */

export function faceName(ns: NetShape, fid: string): string {
  const f = shapeIndex(ns).info[fid]
  return f ? (f.short || f.name) : fid
}
export function faceTitle(ns: NetShape, fid: string): string {
  const f = shapeIndex(ns).info[fid]
  return f ? f.title : fid
}
export function rimName(ns: NetShape, id: string): string {
  if (id === 'seam') return 'Seam'
  const r = ns.curved?.rims.find(x => x.id === id)
  return r ? r.name : id
}
export function edgeTip(ns: NetShape, ni: NetInfo, id: string): string {
  if (ns.curved) return rimName(ns, id)
  return ni.hingeOf[id] ? 'Fold line' : 'Edge ' + ni.pairNo[id] + ' (taped)'
}
export function tipText(ns: NetShape, ni: NetInfo, h: Hover): string {
  if (h.kind === 'face') return faceTitle(ns, h.id)
  if (h.kind === 'edge') return edgeTip(ns, ni, h.id)
  return h.id === 'V' ? 'Apex' : 'Vertex ' + h.id
}

/* ─────────────────────────────── part states ─────────────────────────────── */

export interface StateCtx { ns: NetShape; sel: Sel | null; count: CountState | null }

function touches(c: StateCtx, kind: Kind, id: string): boolean {
  const s = c.sel
  if (!s || s.kind !== 'face' || kind === 'face') return false
  if (c.ns.curved) {
    if (s.id === 'curved') return true
    return kind === 'edge' && id === (s.id === 'top' ? 'topRim' : 'baseRim')
  }
  const ix = shapeIndex(c.ns)
  if (kind === 'edge') return !!ix.edge[id] && ix.edge[id].faces.indexOf(s.id) >= 0
  if (kind === 'vertex') return !!ix.face[s.id] && ix.face[s.id].verts.indexOf(id) >= 0
  return false
}
export function stateOf(c: StateCtx, view: 'solid' | 'net', kind: Kind, id: string, part: string): PartState {
  const k = c.count
  if (k) return k.kind === kind && !k.done && k.list.indexOf(id) === k.n - 1 ? 'selected' : 'rest'
  const s = c.sel
  if (!s) return 'rest'
  if (s.kind === kind && s.id === id) return s.source === view && s.part === part ? 'selected' : 'partner'
  return touches(c, kind, id) ? 'rest' : 'dim'
}
export function countNo(c: StateCtx, kind: Kind, id: string): number {
  const k = c.count
  if (!k || k.kind !== kind) return 0
  const i = k.list.indexOf(id)
  return i >= 0 && i < k.n ? i + 1 : 0
}
export function isHov(h: Hover | null, kind: Kind, id: string): boolean {
  return !!h && h.kind === kind && h.id === id
}

/* ─────────────────────────────── colours ─────────────────────────────── */

export type RGB = [number, number, number]
export interface Tokens {
  dark: boolean
  stage: RGB; ink: RGB; fold: RGB; edge3d: RGB; dot: RGB; letter: RGB; paper: RGB; focus: RGB
  /** Index by colour number 1…8 (index 0 unused). */
  face: RGB[]; pair: RGB[]
}
function hexRgb(h: string): RGB {
  const s = h.replace('#', '')
  return [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)]
}
const TOKENS: Record<'light' | 'dark', Tokens> = { light: makeTokens(false), dark: makeTokens(true) }
function makeTokens(dark: boolean): Tokens {
  const P = dark ? NETS_PALETTE.dark : NETS_PALETTE.light
  return {
    dark,
    stage: hexRgb(P.stage), ink: hexRgb(P.ink), fold: hexRgb(P.fold), edge3d: hexRgb(P.edge3d), dot: hexRgb(P.dot),
    letter: hexRgb(P.letter), paper: hexRgb(P.paper), focus: hexRgb(dark ? '#60a5fa' : '#2563eb'),
    face: [[0, 0, 0] as RGB].concat(P.face.map(hexRgb)), pair: [[0, 0, 0] as RGB].concat(P.pair.map(hexRgb)),
  }
}
export function tokensFor(dark: boolean): Tokens { return dark ? TOKENS.dark : TOKENS.light }
export function rgb(c: RGB): string {
  return 'rgb(' + c.map(x => Math.round(Math.max(0, Math.min(255, x)))).join(',') + ')'
}
export function mix(a: RGB, b: RGB, w: number): RGB {
  return [a[0] * w + b[0] * (1 - w), a[1] * w + b[1] * (1 - w), a[2] * w + b[2] * (1 - w)]
}
export function pairCol(T: Tokens, n: number): RGB { return T.pair[((n - 1) % 8) + 1] }

/** True while <html> has the .dark class (the site's theme toggle). */
export function useDark(): boolean {
  const [dark, setDark] = useState(() => typeof document !== 'undefined' && document.documentElement.classList.contains('dark'))
  useEffect(() => {
    const el = document.documentElement
    const mo = new MutationObserver(() => setDark(el.classList.contains('dark')))
    mo.observe(el, { attributes: true, attributeFilter: ['class'] })
    setDark(el.classList.contains('dark'))
    return () => mo.disconnect()
  }, [])
  return dark
}
export function useMedia(q: string): boolean {
  const get = () => { try { return window.matchMedia(q).matches } catch { return false } }
  const [on, setOn] = useState(get)
  useEffect(() => {
    let mq: MediaQueryList
    try { mq = window.matchMedia(q) } catch { return }
    const fn = () => setOn(mq.matches)
    fn()
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [q])
  return on
}

/* ─────────────────────────────── geometry ─────────────────────────────── */

export function f1(x: number): number { return Math.round(x * 10) / 10 }
export function dist(a: readonly number[], b: readonly number[]): number {
  let s = 0
  for (let k = 0; k < a.length; k++) { const d = a[k] - b[k]; s += d * d }
  return Math.sqrt(s)
}
export function lerp2(a: Vec2, b: Vec2, t: number): Vec2 { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t] }
export function lerp3(a: Vec3, b: Vec3, t: number): Vec3 { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t] }
export function mid2(a: Vec2, b: Vec2): Vec2 { return lerp2(a, b, 0.5) }
export function mid3(a: Vec3, b: Vec3): Vec3 { return lerp3(a, b, 0.5) }
export function mean3(P: Vec3[]): Vec3 {
  const m: Vec3 = [0, 0, 0]
  P.forEach(p => { m[0] += p[0]; m[1] += p[1]; m[2] += p[2] })
  return [m[0] / P.length, m[1] / P.length, m[2] / P.length]
}
export function dot3(a: readonly number[], b: readonly number[]): number { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] }
export function unit3(a: Vec3): Vec3 { const l = Math.hypot(a[0], a[1], a[2]); return l ? [a[0] / l, a[1] / l, a[2] / l] : [0, 0, 0] }
export function labelPt2(P: Vec2[]): Vec2 { return labelPoint(P) }
export function labelPt3(P: Vec3[]): Vec3 { return labelPoint(P) }
export function area2(P: Vec2[]): number {
  let s = 0
  for (let i = 0; i < P.length; i++) { const p = P[i], q = P[(i + 1) % P.length]; s += p[0] * q[1] - q[0] * p[1] }
  return Math.abs(s / 2)
}
/** Point in polygon (even–odd). */
export function pip(x: number, y: number, P: Vec2[]): boolean {
  let inside = false
  for (let i = 0, j = P.length - 1; i < P.length; j = i++) {
    const yi = P[i][1], yj = P[j][1]
    if (yi > y !== yj > y && x < ((P[j][0] - P[i][0]) * (y - yi)) / (yj - yi) + P[i][0]) inside = !inside
  }
  return inside
}
export function segDist(x: number, y: number, a: Vec2, b: Vec2): number {
  const dx = b[0] - a[0], dy = b[1] - a[1], L = dx * dx + dy * dy
  const t = L ? Math.max(0, Math.min(1, ((x - a[0]) * dx + (y - a[1]) * dy) / L)) : 0
  return Math.hypot(x - a[0] - t * dx, y - a[1] - t * dy)
}
export function pathD(P: Vec2[]): string { return 'M' + P.map(p => f1(p[0]) + ' ' + f1(p[1])).join('L') + 'Z' }
export function circleD(c: Vec2, r: number): string {
  return 'M' + f1(c[0] - r) + ' ' + f1(c[1]) + 'a' + f1(r) + ' ' + f1(r) + ' 0 1 0 ' + f1(2 * r) + ' 0a' + f1(r) + ' ' + f1(r) + ' 0 1 0 ' + f1(-2 * r) + ' 0Z'
}

/** Expanding rings at screen points (both views ping what lit up). Skipped under reduced motion. */
export function addPings(g: SVGGElement | null, pts: Vec2[]) {
  if (!g || reducedMotion() || !pts.length) return
  pts.forEach(p => {
    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    c.setAttribute('class', 'nets-ping')
    c.setAttribute('cx', String(f1(p[0])))
    c.setAttribute('cy', String(f1(p[1])))
    c.setAttribute('r', '22')
    g.appendChild(c)
    window.setTimeout(() => c.remove(), 700)
  })
}

/* ─────────────────────────────── text ─────────────────────────────── */

/** Text from the library with inline TeX between $…$. */
export function RichText({ text }: { text: string }) {
  return <>{splitMath(text).map((p, i) => (p.math ? <Katex key={i} tex={p.text} /> : <span key={i}>{p.text}</span>))}</>
}
/** Panel copy: *x* is an italic variable (inline italics read better than KaTeX in running sentences). */
export function inline(s: string): ReactNode {
  const parts = s.split(/\*([^*]+)\*/)
  return parts.map((p, i) => (i % 2 ? <i key={i} className="font-serif">{p}</i> : p))
}
export function plainText(s: string): string { return s.replace(/\*/g, '') }

export const FOCUS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900'
export const PILL_OFF = 'bg-white border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-800 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-500'

/** A labelled colour square for a face. */
export function FaceSwatch({ ci }: { ci: number }) {
  return <span className="inline-block w-3 h-3 rounded-[3px] ring-1 ring-black/10 dark:ring-white/25 shrink-0" style={{ background: `var(--nets-face-${ci})` }} aria-hidden />
}
/** A numbered taped-edge tag. */
export function TagSwatch({ n }: { n: number }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" className="shrink-0" aria-hidden>
      <rect x="1" y="1" width="16" height="16" rx="4" style={{ fill: `var(--nets-pair-${((n - 1) % 8) + 1})` }} />
      <text x="9" y="9.5" className="nets-tag-num">{n}</text>
    </svg>
  )
}
export function FoldSwatch() {
  return (
    <svg width="20" height="8" className="shrink-0" aria-hidden>
      <line x1="0" y1="4" x2="20" y2="4" style={{ stroke: 'var(--nets-fold)' }} strokeWidth="2" strokeDasharray="6 4" />
    </svg>
  )
}
