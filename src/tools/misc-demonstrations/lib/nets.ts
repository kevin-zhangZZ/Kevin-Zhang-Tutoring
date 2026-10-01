/*
 * nets.ts — solids, their nets, hinge folding and 2D <-> 3D correspondences for the
 * "Nets of 3D Shapes" demonstration. Pure TypeScript (erasable syntax only), no DOM, no imports:
 * node can import it directly (scripts/nets.test.mjs) and the page imports it as a module.
 *
 * This file is the ONE source of truth for the demo's geometry and data. Its top half is the
 * general engine (ported from scratch/misc-demos/shared/nets.js); its bottom half is the catalogue
 * the reviewed mockups (nets-a.html, nets-b.html) showed: the nine shapes in their order, with the
 * mockups' sizes, letters, face names, colours, nets, captions, taped-pair numbers, panel copy and
 * worked formulas, plus the cube patterns for "Is It a Net?".
 *
 * ── Conventions ──────────────────────────────────────────────────────────────────────────────
 *  Solids    z is up. Every solid rests on the ground (z = 0) on its base face (role 'base'),
 *            centred so that face's centroid is at x = y = 0. "Front" faces −y, right is +x. Face
 *            vertex lists are counter-clockwise seen from outside the solid.
 *  Vertices  Polyhedra use letters (cuboid ABCD on the ground, EFGH on top, E above A). Curved
 *            models use 'b0'…'b31' (bottom rim), 't0'…'t31' (top rim) and 'V' (cone apex).
 *  Curved    The cylinder is a 32-gon prism, the cone a 32-gon pyramid; their thin strips have
 *            group 'curved', the 32-gons group 'base' / 'top'. Strip-to-strip edges are smooth
 *            (group 'ruling'); rim edges have group 'topRim' / 'baseRim'. On a net, the two straight
 *            cut edges of the unrolled surface have group 'seam'.
 *  Nets      A net lies flat on z = 0 and folds UP (+z), outside face-down, root face fixed.
 *            faces2d are (x, y) seen from above with maths axes (y up), so polygons run clockwise
 *            seen from above. To draw a net in SVG, plot (x, −y). Nets are true size and centred.
 *  Ids       net edge id  = '<netFace>:<i>' (side i runs from corner i to corner i+1)
 *            net corner id = '<netFace>@<i>'; net point id = 'p<k>' (a dot where corners meet)
 *  Logical   What a student clicks: a face is a solid face id, or 'curved' for a curved surface;
 *            an edge is a solid edge id, or 'seam' / 'topRim' / 'baseRim' on curved solids; a
 *            vertex is a solid vertex id. linked() accepts and returns these.
 *  Maths     Text fields are plain Unicode. Fields documented as "rich" may contain inline TeX
 *            between $…$; split them with splitMath() and render the maths with <Katex>.
 */

/* ═════════════════════════════════════════ Types ═════════════════════════════════════════ */

export type Vec2 = [number, number]
export type Vec3 = [number, number, number]

export type FaceRole = 'base' | 'top' | 'side'

export interface SolidVertex {
  id: string
  p: Vec3
}

export interface SolidFace {
  id: string
  /** Display name ('Top', 'Face ABHG', 'Curved surface'). */
  name: string
  /** Vertex letters in reading order ('ABCD'); the id for curved strips. */
  label: string
  /** Vertex ids, counter-clockwise seen from outside. */
  verts: string[]
  role: FaceRole
  /** Student words: 'square', 'rectangle', 'right-angled triangle', 'circle', 'curved surface'… */
  polygon: string
  /** Outward unit normal. */
  normal: Vec3
  area: number
  centroid: Vec3
  group?: string
  /** Colour index of the engine's own surfaces (0-based); the catalogue's FaceInfo.ci is the one to draw with. */
  ci: number
}

export interface SolidEdge {
  id: string
  v: [string, string]
  label: string
  faces: [string, string]
  length: number
  ci: number
  /** An internal edge of a curved surface (between two strips): don't draw it. */
  smooth?: boolean
  /** 'ruling' (smooth), 'topRim' or 'baseRim' on curved solids. */
  group?: string
}

export interface Solid {
  vertices: SolidVertex[]
  faces: SolidFace[]
  edges: SolidEdge[]
}

/** A selectable surface: one face, or a whole group of faces (the curved surface). */
export interface Surface {
  id: string
  name: string
  faces: string[]
  ci: number
  polygon: string
}

export interface FormulaPart {
  id: string
  label: string
  faces: string[]
  formula: string
  working: string
  value: number
  exact?: string | null
}

export interface FormulaLine {
  formula: string
  working: string
  value: number
  exact?: string | null
}

export interface FormulaFact {
  label: string
  formula: string
  working?: string
  value: number
  unit?: string
}

export interface DimInfo {
  key: string
  name: string
  value: number
}

/** The engine's general formulas for a shape (plain Unicode). */
export interface Formulas {
  surfaceArea: string
  words: string
  parts: FormulaPart[]
  total: number
  totalExact?: string | null
  volume: FormulaLine
  dims: DimInfo[]
  baseArea?: FormulaLine
  perimeter?: FormulaLine
  slant?: FormulaLine | null
  facts?: FormulaFact[]
  alt?: string
  model?: string
}

export type ShapeCategory = 'prism' | 'pyramid' | 'platonic' | 'curved'

export interface EulerInfo {
  what: string
  surfaces: number
  edges: number
  vertices: number
}

export interface Shape {
  id: string
  name: string
  category: ShapeCategory
  curved: boolean
  dims: Record<string, number>
  solid: Solid
  surfaces: Surface[]
  nets: Net[]
  formulas: Formulas
  eulerInfo?: EulerInfo
}

export interface Hinge {
  /** Net edge id of the hinge (on the child face). */
  id: string
  parent: string
  child: string
  /** Solid edge the hinge becomes. */
  edge: string
  /** Fold angle at t = 1 in radians (π − dihedral angle); always folds up. */
  angle: number
  depth: number
  /** Side index on the parent / child face. */
  pi: number
  ci: number
  seg: [Vec2, Vec2]
}

export type NetEdgeKind = 'hinge' | 'cut'

export interface NetEdge {
  id: string
  face: string
  i: number
  kind: NetEdgeKind
  solidEdge: string
  /** Cut edges that glue together share a pairId (0…cutPairs−1, in order round the centre); then one id per hinge. */
  pairId: number
  /** The other cut edge of the pair (null for hinges and unpaired cuts on non-nets). */
  partner: string | null
  pairSize: number
  seg: [Vec2, Vec2]
  length: number
  /** A strip-to-strip hinge of a curved surface: internal, don't draw it. */
  smooth?: boolean
  /** 'ruling' (smooth hinge), 'seam' (straight cut edge of a curved surface), 'topRim', 'baseRim'. */
  group?: string
  /** Hinges only: [parent, child]. */
  faces?: [string, string]
  /** Hinges only: the parent's side. */
  other?: { face: string; i: number }
}

export interface NetPoint {
  id: string
  xy: Vec2
  corners: string[]
  vertices: string[]
}

export interface Bounds2 {
  minX: number
  maxX: number
  minY: number
  maxY: number
  w: number
  h: number
}

export interface Net {
  id: string
  name: string
  n?: number
  family?: CubeFamily
  note?: string
  isNet: boolean
  failReason?: string
  failDetail?: string
  /** Non-nets: solid faces that two squares land on. */
  doubled?: string[]
  /** Non-nets: solid faces left open (the gaps). */
  missing?: string[]
  root: string
  /** Net face ids, root first, tree order. */
  order: string[]
  /** Net face -> solid face (identity on real nets; a non-net's extra copy is e.g. 'top2' -> 'top'). */
  faceMap: Record<string, string>
  faces2d: Record<string, Vec2[]>
  /** Net face -> solid vertex ids, in the same order as faces2d. */
  corners: Record<string, string[]>
  hinges: Hinge[]
  netEdges: NetEdge[]
  netPoints: NetPoint[]
  sideIndex: Record<string, string>
  cornerPoint: Record<string, string>
  cutPairs: number
  bounds: Bounds2
  /** Flat net frame -> solid frame: x ↦ Rz(angle)·x + (tx, ty). */
  toSolid: { angle: number; tx: number; ty: number }
  /** Cube nets: the grid squares, y up. */
  cells?: Vec2[]
}

export type Selection = {
  kind: 'face' | 'netFace' | 'surface' | 'edge' | 'netEdge' | 'vertex' | 'corner' | 'netPoint'
  id: string
}

export interface Linked {
  kind: Selection['kind']
  id: string
  /** Solid faces, edges and vertices. */
  faces: string[]
  edges: string[]
  vertices: string[]
  /** Net faces, net edges, net corners ('face@i') and net points. */
  netFaces: string[]
  netEdges: string[]
  corners: string[]
  netPoints: string[]
  /** Logical faces (surface ids: a face id or 'curved'). */
  surfaces: string[]
  /** Logical edges (solid edge ids, or 'seam' / 'topRim' / 'baseRim'). */
  logicalEdges: string[]
  pairId?: number
  edgeKind?: NetEdgeKind
  /** Non-nets: more than one square lands on this face. */
  clash?: boolean
}

export interface Transform {
  /** 3×3 rotation, row-major. */
  R: number[]
  t: Vec3
}

export type EaseName = 'linear' | 'smooth' | 'smoothstep'
export type Ease = EaseName | ((t: number) => number)

export interface FoldOptions {
  /** 'together' (default): every hinge turns at once. 'sequence': one at a time, lid last. 'depth': by tree depth. */
  mode?: 'together' | 'sequence' | 'depth'
  /** Default 'linear' for together; 'smooth' per step otherwise. */
  ease?: Ease
  /** 0…0.95: how much consecutive steps overlap in sequence / depth mode. */
  overlap?: number
  /** Custom step order: arrays of child net-face ids. */
  steps?: string[][]
  /** Override single hinges: {childNetFace: 0…1}. */
  hingeT?: Record<string, number>
  /**
   * 'solid' (default): centred net at t = 0 that slides/turns to be exactly the solid at t = 1.
   * 'net': the root face never moves. A number s in [0, 1] blends between the two.
   */
  anchor?: 'solid' | 'net' | number
}

export interface FoldState {
  t: number
  faces: Record<string, Vec3[]>
  normals: Record<string, Vec3>
  centroids: Record<string, Vec3>
  /** Solid vertex -> its positions (one per net corner that becomes it). */
  corners3d: Record<string, Vec3[]>
  /** Maps a flat net point [x, y, 0] to 3D. */
  transforms: Record<string, Transform>
  /** Child net face -> 0…1. */
  progress: Record<string, number>
  bounds: { min: Vec3; max: Vec3 }
}

export interface FoldStep {
  hinges: number[]
  faces: string[]
  label: string
  kind: 'fold' | 'roll' | 'lid'
}

/** A hinge-tree net: hinges = [[parent, child], …] over solid faces. */
export interface TreeNetSpec {
  id: string
  name: string
  hinges: [string, string][]
  root?: string
  /** Turn the flat layout: radians, or 'landscape' (widest relative to its height). */
  angle?: number | 'landscape'
  n?: number
  family?: CubeFamily
  note?: string
}

/** A cube net from grid squares (y up). */
export interface CellNetSpec {
  id: string
  name: string
  cells: Vec2[]
  /** Index of the square that sits on the base (default: the squares' tree centre). */
  root?: number
  /** Hinges as pairs of cell indices (default: breadth-first from the root). */
  hinges?: [number, number][]
  n?: number
  family?: CubeFamily
  note?: string
  isNet?: boolean
  failReason?: string
}

export type NetSpec = TreeNetSpec | CellNetSpec

/* ═════════════════════════════════════ Maths helpers ═════════════════════════════════════ */

const MATCH = 1e-6 // tolerance for matching points (all models are 1–15 units across)

function add(a: Vec3, b: Vec3): Vec3 { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]] }
function sub(a: Vec3, b: Vec3): Vec3 { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]] }
function mul(a: Vec3, s: number): Vec3 { return [a[0] * s, a[1] * s, a[2] * s] }
function dot(a: Vec3, b: Vec3): number { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] }
function cross(a: Vec3, b: Vec3): Vec3 { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]] }
function len(a: Vec3): number { return Math.sqrt(dot(a, a)) }
function unit(a: Vec3): Vec3 { const l = len(a); return l > 0 ? mul(a, 1 / l) : [0, 0, 0] }
function dist(a: Vec3, b: Vec3): number { return len(sub(a, b)) }
function clamp(x: number, lo: number, hi: number): number { return x < lo ? lo : x > hi ? hi : x }
/** Remove floating-point dust (−0, 1.0000000000000002) from generated coordinates. */
function snap(x: number): number { const r = Math.round(x * 1e12) / 1e12; return r === 0 ? 0 : r }
function near2(p: Vec2, q: Vec2, tol: number): boolean { return Math.abs(p[0] - q[0]) <= tol && Math.abs(p[1] - q[1]) <= tol }
function mean3(pts: Vec3[]): Vec3 {
  const m: Vec3 = [0, 0, 0]
  pts.forEach(p => { m[0] += p[0]; m[1] += p[1]; m[2] += p[2] })
  return [m[0] / pts.length, m[1] / pts.length, m[2] / pts.length]
}
function mean2(pts: Vec2[]): Vec2 {
  let x = 0, y = 0
  pts.forEach(p => { x += p[0]; y += p[1] })
  return [x / pts.length, y / pts.length]
}
function to3(p: Vec2): Vec3 { return [p[0], p[1], 0] }
function rot2(p: Vec2, a: number): Vec2 { const c = Math.cos(a), s = Math.sin(a); return [c * p[0] - s * p[1], s * p[0] + c * p[1]] }
/** Signed area of a 2D polygon (positive = counter-clockwise seen from above). */
function area2(poly: Vec2[]): number {
  let s = 0
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i], q = poly[(i + 1) % poly.length]
    s += p[0] * q[1] - q[0] * p[1]
  }
  return s / 2
}
function areaCentroid2(poly: Vec2[]): Vec2 {
  let a = 0, cx = 0, cy = 0
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i], q = poly[(i + 1) % poly.length], w = p[0] * q[1] - q[0] * p[1]
    a += w; cx += (p[0] + q[0]) * w; cy += (p[1] + q[1]) * w
  }
  return [cx / (3 * a), cy / (3 * a)]
}
/** Newell's method: normal of a 3D polygon, right-hand rule, length = 2 × area. */
function newell(pts: Vec3[]): Vec3 {
  let x = 0, y = 0, z = 0
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i], q = pts[(i + 1) % pts.length]
    x += (p[1] - q[1]) * (p[2] + q[2])
    y += (p[2] - q[2]) * (p[0] + q[0])
    z += (p[0] - q[0]) * (p[1] + q[1])
  }
  return [x, y, z]
}
function mm(A: number[], B: number[]): number[] {
  const C = new Array<number>(9)
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) C[3 * i + j] = A[3 * i] * B[j] + A[3 * i + 1] * B[3 + j] + A[3 * i + 2] * B[6 + j]
  }
  return C
}
function mv(A: number[], v: Vec3): Vec3 {
  return [A[0] * v[0] + A[1] * v[1] + A[2] * v[2], A[3] * v[0] + A[4] * v[1] + A[5] * v[2], A[6] * v[0] + A[7] * v[1] + A[8] * v[2]]
}
/** Rotation by `ang` about the unit axis u (Rodrigues). */
function axisAngle(u: Vec3, ang: number): number[] {
  const c = Math.cos(ang), s = Math.sin(ang), C = 1 - c, x = u[0], y = u[1], z = u[2]
  return [
    c + x * x * C, x * y * C - z * s, x * z * C + y * s,
    y * x * C + z * s, c + y * y * C, y * z * C - x * s,
    z * x * C - y * s, z * y * C + x * s, c + z * z * C,
  ]
}
function rotZ(ang: number): number[] { const c = Math.cos(ang), s = Math.sin(ang); return [c, -s, 0, s, c, 0, 0, 0, 1] }
const IDENTITY: Transform = { R: [1, 0, 0, 0, 1, 0, 0, 0, 1], t: [0, 0, 0] }
/** Apply a rigid transform to a point. */
export function applyTransform(T: Transform, p: Vec3): Vec3 { return add(mv(T.R, p), T.t) }
function tCompose(A: Transform, B: Transform): Transform { return { R: mm(A.R, B.R), t: add(mv(A.R, B.t), A.t) } } // A after B
function tRotLine(a: Vec3, u: Vec3, ang: number): Transform { const R = axisAngle(u, ang); return { R, t: sub(a, mv(R, a)) } }
function uniq<T>(a: T[]): T[] { return a.filter((x, i) => a.indexOf(x) === i) }

/* ═══════════════════════════════════ Formatting helpers ═══════════════════════════════════ */

/** Number for formula working: 2.5, 1.333, 6 (no trailing zeros; dp default 3). */
export function fmt(x: number, dp = 3): string {
  const k = Math.pow(10, dp)
  const r = Math.round(x * k) / k
  return String(r === 0 ? 0 : r)
}
/** Two decimal places, always shown: 87.96, 75.40. */
export function fmt2(x: number): string { return (Math.round(x * 100) / 100).toFixed(2) }
/** Is an angle in degrees a whole number? */
export function isWholeDeg(x: number): boolean { return Math.abs(x - Math.round(x)) < 1e-6 }
/** Whole angles print whole; anything else to 1 dp (so 59.04° shows as 59.0°, not 59°). */
export function fmtDeg(x: number): string { return isWholeDeg(x) ? String(Math.round(x)) : (Math.round(x * 10) / 10).toFixed(1) }
/** A length with its exact surd kept: 5, '√34 ≈ 5.83', '2√2 ≈ 2.83', else 2 dp. */
export function lenText(x: number): string {
  if (Math.abs(x - Math.round(x)) < 1e-9) return String(Math.round(x))
  const sq = Math.round(x * x)
  if (Math.abs(x * x - sq) < 1e-6) {
    let k = 1, m = sq
    for (let d = 2; d * d <= m; d++) while (m % (d * d) === 0) { m /= d * d; k *= d }
    return (k > 1 ? k : '') + '√' + m + ' ≈ ' + fmt2(x)
  }
  return fmt2(x)
}
/** 'a', 'a and b', 'a, b and c'. */
export function listText(names: string[]): string {
  if (names.length <= 1) return names.join('')
  return names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1]
}
/** 7.0685… -> '2.25π' when value ÷ π is a tidy decimal, else null. */
export function piText(value: number): string | null {
  const k = value / Math.PI, r = Math.round(k * 1000) / 1000
  if (Math.abs(k - r) > 1e-9) return null
  return (r === 1 ? '' : fmt(r)) + 'π'
}
/** Split rich text on $…$: odd segments are inline TeX for <Katex>. */
export function splitMath(s: string): { math: boolean; text: string }[] {
  return s.split('$').map((text, i) => ({ math: i % 2 === 1, text })).filter(p => p.text !== '')
}
/** Where to put a face's name: the incentre of a triangle, else the mean of its corners (2D or 3D). */
export function labelPoint<P extends Vec2 | Vec3>(P: P[]): P {
  const d = P[0].length
  const dd = (a: P, b: P) => { let s = 0; for (let k = 0; k < d; k++) { const t = a[k] - b[k]; s += t * t } return Math.sqrt(s) }
  const out = new Array<number>(d).fill(0)
  if (P.length === 3) {
    const a = dd(P[1], P[2]), b = dd(P[0], P[2]), c = dd(P[0], P[1]), s = a + b + c
    for (let k = 0; k < d; k++) out[k] = (a * P[0][k] + b * P[1][k] + c * P[2][k]) / s
  } else {
    P.forEach(p => { for (let k = 0; k < d; k++) out[k] += p[k] / P.length })
  }
  return out as unknown as P
}

export const ease: Record<EaseName, (t: number) => number> = {
  linear: t => t,
  smooth: t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2), // cubic in-out
  smoothstep: t => t * t * (3 - 2 * t),
}
function easeFn(e: Ease | undefined): (t: number) => number { return typeof e === 'function' ? e : ease[e || 'linear'] || ease.linear }

/* ═════════════════════════════════════ Building solids ═════════════════════════════════════ */

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
function L(i: number): string { if (i >= 26) throw new Error('nets: too many lettered vertices'); return LETTERS[i] }

/** n points of a regular polygon with circumradius R, CCW from above, flat edge 0→1 at the front (−y). */
function ring(n: number, R: number, turn = 0): Vec2[] {
  const pts: Vec2[] = []
  for (let i = 0; i < n; i++) {
    const th = -Math.PI / 2 - Math.PI / n + (2 * Math.PI * i) / n + turn
    pts.push([R * Math.cos(th), R * Math.sin(th)])
  }
  return pts
}
function regularPolygon(n: number, side: number): Vec2[] { return ring(n, side / (2 * Math.sin(Math.PI / n))) }

/** Face label from its vertex letters, read from the earliest letter towards its earlier neighbour. */
function cyclicLabel(verts: string[], vi: Record<string, number>): string | null {
  if (!verts.every(v => v.length === 1)) return null
  const n = verts.length
  let k = 0
  for (let i = 1; i < n; i++) if (vi[verts[i]] < vi[verts[k]]) k = i
  const dir = vi[verts[(k + 1) % n]] < vi[verts[(k - 1 + n) % n]] ? 1 : -1
  let s = ''
  for (let j = 0; j < n; j++) s += verts[(((k + dir * j) % n) + n) % n]
  return s
}
function edgeName(a: string, b: string): string { return a.length === 1 && b.length === 1 ? a + b : a + '-' + b }

/** What kind of polygon a face is, in student words. */
function polygonName(pts: Vec3[]): string {
  const n = pts.length
  const sides = pts.map((p, i) => dist(p, pts[(i + 1) % n]))
  const eq = (a: number, b: number) => Math.abs(a - b) < 1e-9 * Math.max(1, a, b)
  if (n === 3) {
    const s = sides.slice().sort((a, b) => a - b)
    if (eq(s[0], s[2])) return 'equilateral triangle'
    if (eq(s[0] * s[0] + s[1] * s[1], s[2] * s[2])) return 'right-angled triangle'
    if (eq(s[0], s[1]) || eq(s[1], s[2])) return 'isosceles triangle'
    return 'triangle'
  }
  if (n === 4) {
    const d1 = dist(pts[0], pts[2]), d2 = dist(pts[1], pts[3])
    if (eq(d1, d2) && eq(sides[0], sides[2]) && eq(sides[1], sides[3])) return eq(sides[0], sides[1]) ? 'square' : 'rectangle'
    return 'quadrilateral'
  }
  const regular = sides.every(s => eq(s, sides[0]))
  const names: Record<number, string> = { 5: 'pentagon', 6: 'hexagon', 7: 'heptagon', 8: 'octagon' }
  return (regular ? 'regular ' : '') + (names[n] || n + '-gon')
}

export interface FaceDef {
  id: string
  name?: string
  verts: string[]
  role?: FaceRole
  group?: string
  polygon?: string
}
export interface SolidDef {
  vertices: SolidVertex[]
  faces: FaceDef[]
}

/**
 * A convex solid from vertices + faces (any vertex order): orients every face counter-clockwise
 * from outside, derives edges, labels, normals, areas and the curved-surface edge groups.
 */
export function makeSolid(def: SolidDef): Solid {
  const vertices: SolidVertex[] = def.vertices.map(v => ({ id: v.id, p: [snap(v.p[0]), snap(v.p[1]), snap(v.p[2])] }))
  const vi: Record<string, number> = {}
  vertices.forEach((v, i) => { vi[v.id] = i })
  const P = (id: string) => vertices[vi[id]].p
  const centre = mean3(vertices.map(v => v.p))

  const faces: SolidFace[] = def.faces.map(f => {
    let verts = f.verts.slice()
    let n = newell(verts.map(P))
    const c = mean3(verts.map(P))
    if (dot(n, sub(c, centre)) < 0) { // wrong way round: keep the first vertex, reverse the rest
      verts = [verts[0]].concat(verts.slice(1).reverse())
      n = mul(n, -1)
    }
    const label = cyclicLabel(verts, vi)
    const nn = unit(n)
    const face: SolidFace = {
      id: f.id,
      name: f.name || (label ? 'Face ' + label : f.id),
      label: label || f.name || f.id,
      verts,
      role: f.role || 'side',
      polygon: f.polygon || polygonName(verts.map(P)),
      normal: [snap(nn[0]), snap(nn[1]), snap(nn[2])],
      area: len(n) / 2,
      centroid: [snap(c[0]), snap(c[1]), snap(c[2])],
      ci: 0,
    }
    if (f.group) face.group = f.group
    return face
  })

  const byId: Record<string, SolidFace> = {}
  faces.forEach(f => { byId[f.id] = f })
  const emap: Record<string, { id: string; v: [string, string]; label: string; faces: string[] }> = {}
  const raw: { id: string; v: [string, string]; label: string; faces: string[] }[] = []
  faces.forEach(f => f.verts.forEach((a, i) => {
    const b = f.verts[(i + 1) % f.verts.length]
    const x = vi[a] < vi[b] ? a : b, y = x === a ? b : a
    const key = x + '|' + y
    let e = emap[key]
    if (!e) { e = emap[key] = { id: edgeName(x, y), v: [x, y], label: edgeName(x, y), faces: [] }; raw.push(e) }
    e.faces.push(f.id)
  }))
  const edges: SolidEdge[] = raw.map(e => {
    if (e.faces.length !== 2) throw new Error('nets: edge ' + e.id + ' is not shared by exactly two faces')
    const out: SolidEdge = { id: e.id, v: e.v, label: e.label, faces: [e.faces[0], e.faces[1]], length: dist(P(e.v[0]), P(e.v[1])), ci: 0 }
    const g0 = byId[e.faces[0]].group, g1 = byId[e.faces[1]].group
    if (g0 === 'curved' && g1 === 'curved') { out.smooth = true; out.group = 'ruling' }
    else if (g0 === 'curved' || g1 === 'curved') out.group = (g0 === 'curved' ? g1 : g0) === 'top' ? 'topRim' : 'baseRim'
    return out
  })
  edges.sort((a, b) => vi[a.v[0]] - vi[b.v[0]] || vi[a.v[1]] - vi[b.v[1]])
  const groupCi: Record<string, number> = {}
  let next = 0
  edges.forEach(e => {
    if (e.group) { if (!(e.group in groupCi)) groupCi[e.group] = next++; e.ci = groupCi[e.group] }
    else e.ci = next++
  })
  return { vertices, faces, edges }
}

function makeSurfaces(solid: Solid, names?: Record<string, string>): Surface[] {
  const out: Surface[] = [], byKey: Record<string, Surface> = {}
  solid.faces.forEach(f => {
    const key = f.group || f.id
    let s = byKey[key]
    if (!s) {
      s = byKey[key] = { id: key, name: (names && names[key]) || f.name, faces: [], ci: out.length, polygon: f.polygon }
      out.push(s)
    }
    s.faces.push(f.id)
    f.ci = s.ci
  })
  return out
}

interface ShapeIndex {
  vi: Record<string, number>
  vertex: Record<string, SolidVertex>
  face: Record<string, SolidFace>
  edge: Record<string, SolidEdge>
  edgeByVerts: Record<string, SolidEdge>
  edgeByFaces: Record<string, SolidEdge>
  vertexFaces: Record<string, string[]>
  group: Record<string, string[]>
  surface: Record<string, Surface>
  base: string
}
const INDEX = new WeakMap<Shape, ShapeIndex>()
function index(shape: Shape): ShapeIndex {
  let ix = INDEX.get(shape)
  if (ix) return ix
  const s = shape.solid
  const base = s.faces.find(f => f.role === 'base')
  ix = { vi: {}, vertex: {}, face: {}, edge: {}, edgeByVerts: {}, edgeByFaces: {}, vertexFaces: {}, group: {}, surface: {}, base: base ? base.id : 'base' }
  const X = ix
  s.vertices.forEach((v, i) => { X.vi[v.id] = i; X.vertex[v.id] = v; X.vertexFaces[v.id] = [] })
  s.faces.forEach(f => {
    X.face[f.id] = f
    f.verts.forEach(v => X.vertexFaces[v].push(f.id))
    if (f.group) (X.group[f.group] = X.group[f.group] || []).push(f.id)
  })
  s.edges.forEach(e => {
    X.edge[e.id] = e
    X.edgeByVerts[e.v[0] + '|' + e.v[1]] = X.edgeByVerts[e.v[1] + '|' + e.v[0]] = e
    X.edgeByFaces[e.faces[0] + '|' + e.faces[1]] = X.edgeByFaces[e.faces[1] + '|' + e.faces[0]] = e
  })
  shape.surfaces.forEach(su => su.faces.forEach(f => { X.surface[f] = su }))
  INDEX.set(shape, ix)
  return ix
}

interface SideNaming { sideId: (i: number) => string; sideName: (i: number) => string }
interface RingOpts extends SideNaming { curved?: boolean; apex?: Vec2 }

/** Prism on a base polygon (CCW from above; its first edge is the front). opts.curved -> cylinder. */
function prismSolid(base: Vec2[], h: number, opts: RingOpts): SolidDef {
  const n = base.length, c = areaCentroid2(base)
  const pts = base.map(p => [p[0] - c[0], p[1] - c[1]] as Vec2)
  const curved = !!opts.curved
  const bId = (i: number) => (curved ? 'b' + i : L(i))
  const tId = (i: number) => (curved ? 't' + i : L(n + i))
  const vertices: SolidVertex[] = []
  pts.forEach((p, i) => vertices.push({ id: bId(i), p: [p[0], p[1], 0] }))
  pts.forEach((p, i) => vertices.push({ id: tId(i), p: [p[0], p[1], h] }))
  const baseVerts = [bId(0)]
  for (let i = n - 1; i >= 1; i--) baseVerts.push(bId(i))
  const topVerts: string[] = []
  for (let i = 0; i < n; i++) topVerts.push(tId(i))
  const faces: FaceDef[] = [
    { id: 'base', name: 'Base', role: 'base', verts: baseVerts, group: curved ? 'base' : undefined, polygon: curved ? 'circle' : undefined },
    { id: 'top', name: 'Top', role: 'top', verts: topVerts, group: curved ? 'top' : undefined, polygon: curved ? 'circle' : undefined },
  ]
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n
    faces.push({
      id: opts.sideId(i), name: opts.sideName(i), role: 'side', verts: [bId(i), bId(j), tId(j), tId(i)],
      group: curved ? 'curved' : undefined, polygon: curved ? 'curved surface' : undefined,
    })
  }
  return { vertices, faces }
}

/** Pyramid on a base polygon with the apex at height h above (base centroid + opts.apex). */
function pyramidSolid(base: Vec2[], h: number, opts: RingOpts): SolidDef {
  const n = base.length, c = areaCentroid2(base)
  const pts = base.map(p => [p[0] - c[0], p[1] - c[1]] as Vec2)
  const curved = !!opts.curved
  const bId = (i: number) => (curved ? 'b' + i : L(i))
  const apex = curved ? 'V' : L(n)
  const off = opts.apex || [0, 0]
  const vertices: SolidVertex[] = pts.map((p, i) => ({ id: bId(i), p: [p[0], p[1], 0] as Vec3 }))
  vertices.push({ id: apex, p: [off[0], off[1], h] })
  const baseVerts = [bId(0)]
  for (let i = n - 1; i >= 1; i--) baseVerts.push(bId(i))
  const faces: FaceDef[] = [{ id: 'base', name: 'Base', role: 'base', verts: baseVerts, group: curved ? 'base' : undefined, polygon: curved ? 'circle' : undefined }]
  for (let i = 0; i < n; i++) {
    faces.push({
      id: opts.sideId(i), name: opts.sideName(i), role: 'side', verts: [bId(i), bId((i + 1) % n), apex],
      group: curved ? 'curved' : undefined, polygon: curved ? 'curved surface' : undefined,
    })
  }
  return { vertices, faces }
}

const FRBL = ['front', 'right', 'back', 'left']
const FRL = ['front', 'right', 'left']
function cap(s: string): string { return s.charAt(0).toUpperCase() + s.slice(1) }
function sideNaming(n: number): SideNaming {
  if (n === 4) return { sideId: i => FRBL[i], sideName: i => cap(FRBL[i]) }
  if (n === 3) return { sideId: i => FRL[i], sideName: i => cap(FRL[i]) }
  return { sideId: i => 'side' + (i + 1), sideName: i => 'Side ' + (i + 1) }
}

/** Side faces in one strip: side 0 is the hub, the rest hang off it to the right (1…m) and left (n−1…m+1). */
function stripHinges(sides: string[], hub: string | null, root = 'base'): [string, string][] {
  const n = sides.length, m = Math.ceil((n - 1) / 2), out: [string, string][] = []
  for (let i = 1; i <= m; i++) out.push([sides[i - 1], sides[i]])
  let prev = sides[0]
  for (let i = n - 1; i > m; i--) { out.push([prev, sides[i]]); prev = sides[i] }
  const head: [string, string][] = [[root, sides[0]]]
  if (hub) head.push([sides[0], hub])
  return head.concat(out)
}
/** Index of the side whose outward normal points most nearly to +x (so a lid hangs off to the right). */
function rightmostSide(base: Vec2[]): number {
  let best = 0, bx = -Infinity
  base.forEach((p, i) => {
    const q = base[(i + 1) % base.length], dx = q[0] - p[0], dy = q[1] - p[1]
    const nx = dy / Math.hypot(dx, dy)
    if (nx > bx + 1e-9) { bx = nx; best = i }
  })
  return best
}
function prismNetSpecs(base: Vec2[], sides: string[], names: [string, string]): TreeNetSpec[] {
  const lid = rightmostSide(base)
  return [
    { id: 'strip', name: names[0], note: 'The side faces make one long strip; the two ends hang off the same face.', hinges: stripHinges(sides, 'top') },
    { id: 'box', name: names[1], note: 'Every side face folds up from the base like the walls of a box; the top is the lid.', hinges: sides.map(s => ['base', s] as [string, string]).concat([[sides[lid], 'top']]) },
  ]
}

/* ── Formulas ── */
interface PrismFormulaOpts {
  A: number; P: number; h: number; sides: string[]; endPlural: string
  ends?: string[]; Aformula: string; Aworking: string; Pformula: string; Pworking: string
}
function prismFormulas(o: PrismFormulaOpts): Formulas {
  const lateral = o.P * o.h
  return {
    surfaceArea: 'SA = 2A + Ph',
    words: 'Two identical ends, plus the side faces, which unroll into one rectangle (perimeter of the end × height).',
    parts: [
      { id: 'ends', label: '2 ' + o.endPlural, faces: (o.ends || ['base', 'top']).slice(), formula: '2 × A', working: '2 × ' + fmt(o.A), value: 2 * o.A },
      { id: 'sides', label: o.sides.length + ' rectangles', faces: o.sides.slice(), formula: 'P × h', working: fmt(o.P) + ' × ' + fmt(o.h), value: lateral },
    ],
    total: 2 * o.A + lateral,
    baseArea: { formula: o.Aformula, working: o.Aworking, value: o.A },
    perimeter: { formula: o.Pformula, working: o.Pworking, value: o.P },
    volume: { formula: 'V = Ah', working: fmt(o.A) + ' × ' + fmt(o.h), value: o.A * o.h },
    facts: [{ label: 'Side faces laid flat', formula: 'one rectangle P × h', working: fmt(o.P) + ' × ' + fmt(o.h), value: lateral }],
    dims: [],
  }
}

/* ═════════════════════════════════════ Shape builders ═════════════════════════════════════ */

interface ShapeDraft {
  id: string; name: string; category: ShapeCategory; curved?: boolean; dims: Record<string, number>
  dimList: DimInfo[]; solidDef: SolidDef; formulas: Formulas; netSpecs: NetSpec[]
  surfaceNames?: Record<string, string>; euler?: EulerInfo
}
function finishShape(o: ShapeDraft): Shape {
  const solid = makeSolid(o.solidDef)
  const shape: Shape = {
    id: o.id, name: o.name, category: o.category, curved: !!o.curved, dims: o.dims,
    solid, surfaces: [], nets: [], formulas: o.formulas,
  }
  shape.surfaces = makeSurfaces(solid, o.surfaceNames)
  if (o.euler) shape.eulerInfo = o.euler
  shape.formulas.dims = o.dimList
  snapNumbers(shape.formulas as unknown as Record<string, unknown>)
  shape.nets = o.netSpecs.map((spec, k) => {
    const net = 'cells' in spec ? buildCellNet(shape, spec) : buildTreeNet(shape, spec)
    if (net.isNet && net.n === undefined) net.n = k + 1
    return net
  })
  return shape
}
/** 9.000000000000002 -> 9 in formula values (they are shown to students). */
function snapNumbers(o: Record<string, unknown>): void {
  Object.keys(o).forEach(k => {
    const v = o[k]
    if (typeof v === 'number') o[k] = snap(v)
    else if (v && typeof v === 'object') snapNumbers(v as Record<string, unknown>)
  })
}

export type BuildType = 'cube' | 'cuboid' | 'prism' | 'pyramid' | 'tetrahedron' | 'cylinder' | 'cone'
export interface BuildParams {
  /** cube side / regular base side / tetrahedron edge */
  a?: number
  l?: number
  w?: number
  h?: number
  /** sides of a regular prism / pyramid base */
  n?: number
  /** pyramid apex offset from above the base centroid */
  apex?: Vec2
  r?: number
  /** strips in a curved model (default 32) */
  strips?: number
}

/** Fold-up-able net specs for a cube (polyomino cells, y up), with family keys. */
const CUBE_NET_CELLS: { id: string; name: string; family: CubeFamily; cells: Vec2[] }[] = [
  { id: 'cross', name: 'Cross', family: '1-4-1', cells: [[0, 0], [1, 0], [2, 0], [3, 0], [1, 1], [1, -1]] },
  { id: 't-shape', name: 'T Shape', family: '1-4-1', cells: [[0, 0], [1, 0], [2, 0], [3, 0], [0, 1], [0, -1]] },
  { id: 'z-shape', name: 'Long Z', family: '1-4-1', cells: [[0, 0], [1, 0], [2, 0], [3, 0], [0, 1], [3, -1]] },
  { id: 'offset-cross', name: 'Offset Cross', family: '1-4-1', cells: [[0, 0], [1, 0], [2, 0], [3, 0], [1, 1], [2, -1]] },
  { id: 'hook', name: 'Hook', family: '1-4-1', cells: [[0, 0], [1, 0], [2, 0], [3, 0], [0, 1], [1, -1]] },
  { id: 'long-hook', name: 'Long Hook', family: '1-4-1', cells: [[0, 0], [1, 0], [2, 0], [3, 0], [0, 1], [2, -1]] },
  { id: 'two-three-one-a', name: 'Row of Three (a)', family: '2-3-1', cells: [[-1, 1], [0, 1], [0, 0], [1, 0], [2, 0], [0, -1]] },
  { id: 'two-three-one-b', name: 'Row of Three (b)', family: '2-3-1', cells: [[-1, 1], [0, 1], [0, 0], [1, 0], [2, 0], [1, -1]] },
  { id: 'two-three-one-c', name: 'Row of Three (c)', family: '2-3-1', cells: [[-1, 1], [0, 1], [0, 0], [1, 0], [2, 0], [2, -1]] },
  { id: 'staircase', name: 'Staircase', family: '2-2-2', cells: [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 2]] },
  { id: 'three-three', name: 'Two Rows of Three', family: '3-3', cells: [[0, 0], [1, 0], [2, 0], [2, 1], [3, 1], [4, 1]] },
]

const BUILDERS: Record<BuildType, (p: BuildParams, specs?: NetSpec[]) => Shape> = {
  cube(p, specs) {
    const a = p.a || 2
    const sq: Vec2[] = [[-a / 2, -a / 2], [a / 2, -a / 2], [a / 2, a / 2], [-a / 2, a / 2]]
    return finishShape({
      id: 'cube', name: 'Cube', category: 'prism', dims: { a },
      dimList: [{ key: 'a', name: 'side length', value: a }],
      solidDef: prismSolid(sq, a, sideNaming(4)),
      formulas: {
        surfaceArea: 'SA = 6a²', words: 'Six identical squares.',
        parts: [{ id: 'squares', label: '6 squares', faces: ['base', 'top'].concat(FRBL), formula: '6 × a²', working: '6 × ' + fmt(a) + '²', value: 6 * a * a }],
        total: 6 * a * a,
        volume: { formula: 'V = a³', working: fmt(a) + '³', value: a * a * a },
        dims: [],
      },
      netSpecs: specs || CUBE_NET_CELLS.map((s, k) => ({ id: s.id, name: s.name, family: s.family, cells: s.cells, n: k + 1 })),
    })
  },

  cuboid(p, specs) {
    const l = p.l || 3, w = p.w || 2, h = p.h || 1.5
    const rect: Vec2[] = [[-l / 2, -w / 2], [l / 2, -w / 2], [l / 2, w / 2], [-l / 2, w / 2]]
    return finishShape({
      id: 'cuboid', name: 'Cuboid', category: 'prism', dims: { l, w, h },
      dimList: [{ key: 'l', name: 'length', value: l }, { key: 'w', name: 'width', value: w }, { key: 'h', name: 'height', value: h }],
      solidDef: prismSolid(rect, h, sideNaming(4)),
      formulas: {
        surfaceArea: 'SA = 2(lw + lh + wh)', words: 'Three pairs of matching rectangles: opposite faces are identical.',
        parts: [
          { id: 'base-top', label: 'Base and top', faces: ['base', 'top'], formula: '2 × l × w', working: '2 × ' + fmt(l) + ' × ' + fmt(w), value: 2 * l * w },
          { id: 'front-back', label: 'Front and back', faces: ['front', 'back'], formula: '2 × l × h', working: '2 × ' + fmt(l) + ' × ' + fmt(h), value: 2 * l * h },
          { id: 'left-right', label: 'Left and right', faces: ['left', 'right'], formula: '2 × w × h', working: '2 × ' + fmt(w) + ' × ' + fmt(h), value: 2 * w * h },
        ],
        total: 2 * (l * w + l * h + w * h),
        volume: { formula: 'V = lwh', working: fmt(l) + ' × ' + fmt(w) + ' × ' + fmt(h), value: l * w * h },
        alt: 'SA = 2A + Ph also works: A = lw, P = 2(l + w).',
        dims: [],
      },
      netSpecs: specs || prismNetSpecs(rect, FRBL, ['Row of Four Sides', 'Open Box with Lid']),
    })
  },

  // Prism on a regular n-gon of side a (n = 5 pentagonal, 6 hexagonal, …).
  prism(p, specs) {
    const n = p.n || 6, a = p.a || 1.2, h = p.h || 2.5
    const base = regularPolygon(n, a)
    const naming = sideNaming(n), sides: string[] = []
    for (let i = 0; i < n; i++) sides.push(naming.sideId(i))
    const A = (n * a * a) / (4 * Math.tan(Math.PI / n)), P = n * a
    const poly = ({ 3: 'triangle', 4: 'square', 5: 'pentagon', 6: 'hexagon', 8: 'octagon' } as Record<number, string>)[n] || n + '-gon'
    const Aformula = n === 6 ? 'A = (3√3 ÷ 2)a²' : n === 5 ? 'A ≈ 1.720a²' : 'A = na² ÷ (4 tan(180° ÷ n))'
    const names = ({ 3: 'Triangular', 4: 'Square', 5: 'Pentagonal', 6: 'Hexagonal', 8: 'Octagonal' } as Record<number, string>)[n] || n + '-gonal'
    return finishShape({
      id: names.toLowerCase() + '-prism', name: names + ' prism', category: 'prism', dims: { n, a, h },
      dimList: [{ key: 'a', name: 'side of the ' + poly, value: a }, { key: 'h', name: 'height', value: h }],
      solidDef: prismSolid(base, h, naming),
      formulas: prismFormulas({
        A, P, h, sides, endPlural: 'regular ' + poly + 's',
        Aformula, Aworking: fmt(A), Pformula: 'P = ' + n + 'a', Pworking: n + ' × ' + fmt(a),
      }),
      netSpecs: specs || prismNetSpecs(base, sides, ['Strip of Rectangles', n === 6 ? 'Flower' : 'Base in the Middle']),
    })
  },

  // Pyramid on a regular n-gon of side a; apex = [dx, dy] offset (oblique) — nets still unfold.
  pyramid(p, specs) {
    const n = p.n || 4, a = p.a || 3, h = p.h || 2
    const base = regularPolygon(n, a)
    const naming = sideNaming(n), sides: string[] = []
    for (let i = 0; i < n; i++) sides.push(naming.sideId(i))
    const right = !p.apex || (p.apex[0] === 0 && p.apex[1] === 0)
    const apo = a / (2 * Math.tan(Math.PI / n)) // centre to the middle of a base edge
    const s = Math.hypot(h, apo) // slant height of each triangle (right pyramid)
    const A = (n * a * a) / (4 * Math.tan(Math.PI / n))
    const sq = n === 4
    const solidDef = pyramidSolid(base, h, Object.assign({ apex: p.apex }, naming))
    const tmp = makeSolid(solidDef)
    const triTotal = tmp.faces.filter(f => f.role === 'side').reduce((t, f) => t + f.area, 0)
    const poly = ({ 3: 'triangle', 4: 'square', 5: 'pentagon', 6: 'hexagon' } as Record<number, string>)[n] || n + '-gon'
    return finishShape({
      id: sq ? 'square-pyramid' : poly + '-pyramid', name: sq ? 'Square-based pyramid' : cap(poly) + '-based pyramid',
      category: 'pyramid', dims: { n, a, h, apexX: p.apex ? p.apex[0] : 0, apexY: p.apex ? p.apex[1] : 0 },
      dimList: [{ key: 'a', name: 'base side', value: a }, { key: 'h', name: 'height', value: h }],
      solidDef,
      formulas: {
        surfaceArea: sq ? 'SA = a² + 4 × ½as' : 'SA = A + n × ½as',
        words: 'The base, plus ' + n + ' triangles whose height is the slant height s (not the pyramid’s height h).',
        parts: [
          { id: 'base', label: 'Base', faces: ['base'], formula: sq ? 'a²' : 'A', working: sq ? fmt(a) + '²' : fmt(A), value: A },
          {
            id: 'triangles', label: n + ' triangles', faces: sides.slice(), formula: n + ' × ½ × a × s',
            working: right ? n + ' × ½ × ' + fmt(a) + ' × ' + fmt(s) : 'oblique: triangles differ', value: triTotal,
          },
        ],
        total: A + triTotal,
        slant: right ? { formula: 's = √(h² + (a ÷ 2)²)', working: '√(' + fmt(h) + '² + ' + fmt(apo) + '²)', value: s } : null,
        volume: { formula: 'V = ⅓Ah', working: '⅓ × ' + fmt(A) + ' × ' + fmt(h), value: (A * h) / 3 },
        dims: [],
      },
      netSpecs: specs || [
        { id: 'star', name: 'Star', note: 'The base sits in the middle with a triangle folding up from each edge.', hinges: sides.map(x => ['base', x] as [string, string]) },
        { id: 'fan', name: 'Fan of Triangles', note: 'The triangles share their slanted edges in a fan around the apex; the base hangs off one of them.', hinges: stripHinges(sides, null) },
      ],
    })
  },

  tetrahedron(p, specs) {
    const a = p.a || 3
    const H = a * Math.sqrt(2 / 3)
    const A1 = (Math.sqrt(3) / 4) * a * a
    return finishShape({
      id: 'tetrahedron', name: 'Regular tetrahedron', category: 'pyramid', dims: { a },
      dimList: [{ key: 'a', name: 'edge length', value: a }],
      solidDef: pyramidSolid(regularPolygon(3, a), H, sideNaming(3)),
      formulas: {
        surfaceArea: 'SA = √3 a²', words: 'Four identical equilateral triangles (a triangular pyramid with every edge equal).',
        parts: [{ id: 'triangles', label: '4 equilateral triangles', faces: ['base', 'front', 'right', 'left'], formula: '4 × (√3 ÷ 4)a²', working: '4 × ' + fmt(A1), value: 4 * A1 }],
        total: 4 * A1,
        volume: { formula: 'V = a³ ÷ (6√2)', working: fmt(a) + '³ ÷ (6√2)', value: (a * a * a) / (6 * Math.SQRT2) },
        dims: [],
      },
      netSpecs: specs || [
        { id: 'big-triangle', name: 'Big Triangle', note: 'A triangle twice the size, split into four: the three corners fold up to meet.', hinges: [['base', 'front'], ['base', 'right'], ['base', 'left']] },
        { id: 'strip', name: 'Strip of Four', note: 'Four triangles in a row make a parallelogram.', angle: 'landscape', hinges: [['base', 'front'], ['base', 'right'], ['right', 'left']] },
      ],
    })
  },

  cylinder(p, specs) {
    const r = p.r || 1, h = p.h || 2.5, n = p.strips || 32
    const strips: string[] = []
    for (let i = 0; i < n; i++) strips.push('c' + i)
    const circles = 2 * Math.PI * r * r, curved = 2 * Math.PI * r * h
    const chain: [string, string][] = [['base', 'c0']]
    for (let i = 1; i < n; i++) chain.push(['c' + (i - 1), 'c' + i])
    chain.push(['c' + (n - 1), 'top'])
    return finishShape({
      id: 'cylinder', name: 'Cylinder', category: 'curved', curved: true, dims: { r, h, n },
      dimList: [{ key: 'r', name: 'radius', value: r }, { key: 'h', name: 'height', value: h }],
      surfaceNames: { curved: 'Curved surface', base: 'Base', top: 'Top' },
      solidDef: prismSolid(ring(n, r), h, { curved: true, sideId: i => 'c' + i, sideName: () => 'Curved surface' }),
      euler: { what: 'cylinder', surfaces: 3, edges: 2, vertices: 0 },
      formulas: {
        surfaceArea: 'SA = 2πr² + 2πrh', words: 'Two circles, plus the curved surface, which unrolls into a rectangle 2πr wide and h tall.',
        parts: [
          { id: 'circles', label: '2 circles', faces: ['base', 'top'], formula: '2 × πr²', working: '2 × π × ' + fmt(r) + '²', value: circles, exact: piText(circles) },
          { id: 'curved', label: 'Curved surface (a rectangle when flat)', faces: strips.slice(), formula: '2πr × h', working: '2 × π × ' + fmt(r) + ' × ' + fmt(h), value: curved, exact: piText(curved) },
        ],
        total: circles + curved, totalExact: piText(circles + curved),
        volume: { formula: 'V = πr²h', working: 'π × ' + fmt(r) + '² × ' + fmt(h), value: Math.PI * r * r * h, exact: piText(Math.PI * r * r * h) },
        facts: [
          { label: 'Rectangle width = circumference', formula: '2πr', working: '2 × π × ' + fmt(r), value: 2 * Math.PI * r },
          { label: 'Rectangle height', formula: 'h', working: fmt(h), value: h },
        ],
        model: 'Drawn as a ' + n + '-sided prism; areas use the true circle formulas.',
        dims: [],
      },
      netSpecs: specs || [
        { id: 'circles-middle', name: 'Circles in the Middle', note: 'The curved surface unrolls to a rectangle; the circles touch the middle of its long edges.', hinges: stripHinges(strips, 'top') },
        { id: 'circles-ends', name: 'Circles at Opposite Ends', note: 'The same rectangle with one circle on each end of it.', hinges: chain },
      ],
    })
  },

  cone(p, specs) {
    const r = p.r || 1.5, h = p.h || 2, n = p.strips || 32
    const l = Math.hypot(r, h)
    const strips: string[] = []
    for (let i = 0; i < n; i++) strips.push('c' + i)
    const disc = Math.PI * r * r, curved = Math.PI * r * l
    return finishShape({
      id: 'cone', name: 'Cone', category: 'curved', curved: true, dims: { r, h, n, l },
      dimList: [{ key: 'r', name: 'radius', value: r }, { key: 'h', name: 'height', value: h }, { key: 'l', name: 'slant height', value: l }],
      surfaceNames: { curved: 'Curved surface', base: 'Base' },
      solidDef: pyramidSolid(ring(n, r), h, { curved: true, sideId: i => 'c' + i, sideName: () => 'Curved surface' }),
      euler: { what: 'cone', surfaces: 2, edges: 1, vertices: 1 },
      formulas: {
        surfaceArea: 'SA = πr² + πrl', words: 'A circle, plus the curved surface, which unrolls into a sector of a circle with radius l (the slant height).',
        parts: [
          { id: 'base', label: 'Circular base', faces: ['base'], formula: 'πr²', working: 'π × ' + fmt(r) + '²', value: disc, exact: piText(disc) },
          { id: 'curved', label: 'Curved surface (a sector when flat)', faces: strips.slice(), formula: 'πrl', working: 'π × ' + fmt(r) + ' × ' + fmt(l), value: curved, exact: piText(curved) },
        ],
        total: disc + curved, totalExact: piText(disc + curved),
        slant: { formula: 'l = √(r² + h²)', working: '√(' + fmt(r) + '² + ' + fmt(h) + '²)', value: l },
        volume: { formula: 'V = ⅓πr²h', working: '⅓ × π × ' + fmt(r) + '² × ' + fmt(h), value: (Math.PI * r * r * h) / 3, exact: piText((Math.PI * r * r * h) / 3) },
        facts: [
          { label: 'Sector radius = slant height', formula: 'l', working: fmt(l), value: l },
          { label: 'Arc length = circumference of the base', formula: '2πr', working: '2 × π × ' + fmt(r), value: 2 * Math.PI * r },
          { label: 'Sector angle', formula: '360° × r ÷ l', working: '360° × ' + fmt(r) + ' ÷ ' + fmt(l), value: (360 * r) / l, unit: '°' },
        ],
        model: 'Drawn as a ' + n + '-sided pyramid; areas use the true circle formulas.',
        dims: [],
      },
      netSpecs: specs || [{ id: 'sector', name: 'Sector and Circle', note: 'The curved surface unrolls to a sector; the base circle touches the middle of its arc.', hinges: stripHinges(strips, null) }],
    })
  },
}

/** A fresh shape with other dimensions, e.g. build('cuboid', {l: 4, w: 2, h: 1}). Optional net specs replace the defaults. */
export function build(type: BuildType, params: BuildParams = {}, netSpecs?: NetSpec[]): Shape {
  const b = BUILDERS[type]
  if (!b) throw new Error('nets: unknown shape type ' + type + ' (try ' + Object.keys(BUILDERS).join(', ') + ')')
  return b(params, netSpecs)
}
export const builders = Object.keys(BUILDERS) as BuildType[]

/** A shape from your own convex solid; the resting face must have role 'base' and lie on z = 0. */
export function customShape(o: {
  id: string; name: string; category: ShapeCategory; solid: SolidDef; formulas: Formulas; netSpecs: NetSpec[]
  dims?: Record<string, number>; dimList?: DimInfo[]
}): Shape {
  return finishShape({ id: o.id, name: o.name, category: o.category, dims: o.dims || {}, dimList: o.dimList || [], solidDef: o.solid, formulas: o.formulas, netSpecs: o.netSpecs })
}

/* ═════════════════════════════════════ Building nets ═════════════════════════════════════ */

interface DraftHinge { parent: string; child: string; angle: number; depth?: number; pi?: number; ci?: number; seg?: [Vec2, Vec2]; edge?: string; id?: string }
interface DraftNet {
  id: string; name: string; isNet: boolean; root: string; faceMap: Record<string, string>
  faces2d: Record<string, Vec2[]>; corners: Record<string, string[]>; hinges: DraftHinge[]
  toSolid: { angle: number; tx: number; ty: number }; order?: string[]
  cells?: Vec2[]; n?: number; family?: CubeFamily; note?: string
  failReason?: string; failDetail?: string; doubled?: string[]; missing?: string[]
}

/**
 * Tree net: unfold the solid along a spanning tree of faces. Each child turns about its shared edge
 * until its outward normal matches its parent's, which lays it flat in the parent's plane on the far
 * side of the edge, true size. The root (the base face) is already flat on z = 0, facing down.
 */
export function buildTreeNet(shape: Shape, spec: TreeNetSpec): Net {
  const ix = index(shape)
  const root = spec.root || ix.base
  const rf = ix.face[root]
  if (!rf) throw new Error('nets: unknown root face ' + root)
  if (Math.abs(rf.normal[2] + 1) > 1e-9 || rf.verts.some(v => Math.abs(ix.vertex[v].p[2]) > 1e-9)) {
    throw new Error('nets: the root face of ' + shape.id + '/' + spec.id + ' must lie on the ground')
  }
  const P = (id: string) => ix.vertex[id].p
  const kids: Record<string, string[]> = {}
  spec.hinges.forEach(h => { (kids[h[0]] = kids[h[0]] || []).push(h[1]) })
  const U: Record<string, Transform> = {}, hinges: DraftHinge[] = [], order = [root]
  U[root] = IDENTITY
  for (let q = 0; q < order.length; q++) {
    const pId = order[q]
    ;(kids[pId] || []).forEach(cId => {
      if (U[cId]) throw new Error('nets: ' + shape.id + '/' + spec.id + ' hinges are not a tree (face ' + cId + ')')
      const e = ix.edgeByFaces[pId + '|' + cId]
      if (!e) throw new Error('nets: faces ' + pId + ' and ' + cId + ' do not share an edge')
      const fp = ix.face[pId], fc = ix.face[cId]
      const a = P(e.v[0]), k = unit(sub(P(e.v[1]), a))
      const th = Math.atan2(dot(cross(fc.normal, fp.normal), k), dot(fc.normal, fp.normal))
      U[cId] = tCompose(U[pId], tRotLine(a, k, th))
      order.push(cId)
      hinges.push({ parent: pId, child: cId, angle: Math.acos(clamp(dot(fp.normal, fc.normal), -1, 1)) })
    })
  }
  if (order.length !== shape.solid.faces.length) throw new Error('nets: ' + shape.id + '/' + spec.id + ' hinges do not reach every face')

  const flat: Record<string, Vec2[]> = {}
  order.forEach(f => {
    flat[f] = ix.face[f].verts.map(v => {
      const q = applyTransform(U[f], P(v))
      if (Math.abs(q[2]) > 1e-9) throw new Error('nets: unfolding left face ' + f + ' off the ground')
      return [q[0], q[1]] as Vec2
    })
  })
  const phi = spec.angle === 'landscape' ? landscapeAngle(flat) : spec.angle || 0
  const raw: Record<string, Vec2[]> = {}
  order.forEach(f => { raw[f] = flat[f].map(q => rot2(q, phi)) })
  const c = bboxCentre(raw)
  const faces2d: Record<string, Vec2[]> = {}, corners: Record<string, string[]> = {}, faceMap: Record<string, string> = {}
  order.forEach(f => {
    faces2d[f] = raw[f].map(q => [snap(q[0] - c[0]), snap(q[1] - c[1])] as Vec2)
    corners[f] = ix.face[f].verts.slice()
    faceMap[f] = f
  })
  // Flat frame -> solid frame: x ↦ Rz(−φ)·(x + c).
  const back = rot2(c, -phi)
  const net: DraftNet = {
    id: spec.id, name: spec.name, isNet: true, root, faceMap, faces2d, corners,
    hinges, toSolid: { angle: -phi, tx: back[0], ty: back[1] },
  }
  if (spec.note) net.note = spec.note
  if (spec.family) net.family = spec.family
  if (spec.n) net.n = spec.n
  return finishNet(shape, net)
}

/** The turn that makes a layout widest relative to its height (smallest turn on a tie). */
function landscapeAngle(polys: Record<string, Vec2[]>): number {
  const pts: Vec2[] = []
  Object.keys(polys).forEach(f => polys[f].forEach(p => pts.push(p)))
  const cands = [0]
  Object.keys(polys).forEach(f => polys[f].forEach((p, i) => {
    const q = polys[f][(i + 1) % polys[f].length]
    let a = -Math.atan2(q[1] - p[1], q[0] - p[0])
    while (a > Math.PI / 2 + 1e-9) a -= Math.PI
    while (a <= -Math.PI / 2 + 1e-9) a += Math.PI
    cands.push(a)
  }))
  let best = 0, bestScore = -Infinity
  cands.forEach(a => {
    const c = Math.cos(a), s = Math.sin(a)
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
    pts.forEach(p => {
      const x = c * p[0] - s * p[1], y = s * p[0] + c * p[1]
      minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y)
    })
    const score = (maxX - minX) / (maxY - minY)
    if (score > bestScore + 1e-9 || (Math.abs(score - bestScore) <= 1e-9 && Math.abs(a) < Math.abs(best))) { best = a; bestScore = score }
  })
  return best
}

function bboxCentre(polys: Record<string, Vec2[]>): Vec2 {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
  Object.keys(polys).forEach(f => polys[f].forEach(q => {
    minX = Math.min(minX, q[0]); maxX = Math.max(maxX, q[0]); minY = Math.min(minY, q[1]); maxY = Math.max(maxY, q[1])
  }))
  return [(minX + maxX) / 2, (minY + maxY) / 2]
}

/**
 * Cell net (cube only): unit squares on a grid, every hinge folding 90° up. Folding with the root
 * square on the cube's base tells us which face each square becomes. If two squares land on the same
 * face it is not a net (isNet false), and the net records doubled / missing faces and failDetail.
 */
export function buildCellNet(shape: Shape, spec: CellNetSpec): Net {
  const ix = index(shape)
  const a = shape.dims.a
  const cells = spec.cells
  const at: Record<string, number> = {}
  cells.forEach((c, i) => { at[c[0] + ',' + c[1]] = i })
  const DIRS: Vec2[] = [[0, -1], [1, 0], [0, 1], [-1, 0]]
  const adj = cells.map(c => DIRS.map(d => at[(c[0] + d[0]) + ',' + (c[1] + d[1])]).filter(j => j !== undefined))
  const rootIdx = spec.root !== undefined ? spec.root : treeCentre(adj)
  let pairs = spec.hinges
  if (!pairs) {
    const ps: [number, number][] = []
    const seen: Record<number, boolean> = { [rootIdx]: true }, queue = [rootIdx]
    while (queue.length) {
      const i = queue.shift() as number
      adj[i].forEach(j => { if (!seen[j]) { seen[j] = true; ps.push([i, j]); queue.push(j) } })
    }
    pairs = ps
  }
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
  cells.forEach(c => { minX = Math.min(minX, c[0]); maxX = Math.max(maxX, c[0] + 1); minY = Math.min(minY, c[1]); maxY = Math.max(maxY, c[1] + 1) })
  const cx = ((minX + maxX) / 2) * a, cy = ((minY + maxY) / 2) * a
  const q = (i: number) => 'q' + i
  const prov: DraftNet = {
    id: spec.id, name: spec.name, isNet: true, root: q(rootIdx), faceMap: {}, faces2d: {}, corners: {},
    hinges: pairs.map(pc => ({ parent: q(pc[0]), child: q(pc[1]), angle: Math.PI / 2 })), toSolid: { angle: 0, tx: 0, ty: 0 },
  }
  cells.forEach((c, i) => {
    const X = snap(c[0] * a - cx), Y = snap(c[1] * a - cy), X1 = snap(X + a), Y1 = snap(Y + a)
    prov.faces2d[q(i)] = [[X, Y], [X, Y1], [X1, Y1], [X1, Y]]
  })
  orderHinges(prov)
  matchHingeSides(prov)
  const T = computeFrames(prov as unknown as Net, prov.hinges.map(() => 1))

  const base = ix.face[ix.base]
  const rc = mean2(prov.faces2d[prov.root])
  const tx = base.centroid[0] - rc[0], ty = base.centroid[1] - rc[1]
  const verts = shape.solid.vertices
  const landed: Record<string, string> = {}, cornersQ: Record<string, string[]> = {}, faces2dQ: Record<string, Vec2[]> = {}
  cells.forEach((_c, i) => {
    const id = q(i), poly = prov.faces2d[id]
    const vids = poly.map(pt => {
      const p3 = add(applyTransform(T[id], [pt[0], pt[1], 0]), [tx, ty, 0])
      const v = verts.find(vv => dist(vv.p, p3) < MATCH)
      if (!v) throw new Error('nets: square ' + i + ' of ' + spec.id + ' does not land on the cube')
      return v.id
    })
    const sf = shape.solid.faces.find(f => f.verts.length === vids.length && vids.every(v => f.verts.indexOf(v) >= 0))
    if (!sf) throw new Error('nets: square ' + i + ' of ' + spec.id + ' does not land on a face')
    const k = sf.verts.indexOf(vids[0])
    vids.forEach((v, j) => { if (sf.verts[(k + j) % 4] !== v) throw new Error('nets: square ' + i + ' of ' + spec.id + ' lands inside out') })
    landed[id] = sf.id
    cornersQ[id] = sf.verts.slice()
    faces2dQ[id] = sf.verts.map((_v, j) => poly[(j - k + 4) % 4])
  })

  // Name the squares after the faces they become ('top', then 'top2' for a second copy).
  const count: Record<string, number> = {}, rename: Record<string, string> = {}
  cells.forEach((_c, i) => {
    const f = landed[q(i)]
    count[f] = (count[f] || 0) + 1
    rename[q(i)] = count[f] === 1 ? f : f + count[f]
  })
  const isNet = shape.solid.faces.every(f => count[f.id] === 1)
  if (spec.isNet !== undefined && spec.isNet !== isNet) throw new Error('nets: ' + spec.id + ' isNet should be ' + isNet)
  const net: DraftNet = {
    id: spec.id, name: spec.name, isNet, root: rename[prov.root], faceMap: {}, faces2d: {}, corners: {},
    hinges: prov.hinges.map(h => ({ parent: rename[h.parent], child: rename[h.child], angle: h.angle })),
    toSolid: { angle: 0, tx: snap(tx), ty: snap(ty) }, cells: cells.map(c => [c[0], c[1]] as Vec2),
  }
  if (spec.family) net.family = spec.family
  if (spec.n) net.n = spec.n
  if (spec.note) net.note = spec.note
  cells.forEach((_c, i) => {
    const id = rename[q(i)]
    net.faceMap[id] = landed[q(i)]
    net.faces2d[id] = faces2dQ[q(i)]
    net.corners[id] = cornersQ[q(i)]
  })
  if (!isNet) {
    const nm = (f: string) => ix.face[f].name
    net.failReason = spec.failReason || (cells.length !== 6 ? 'A cube needs exactly six squares; this has ' + cells.length + '.' : 'These six squares do not fold into a cube.')
    net.doubled = shape.solid.faces.filter(f => count[f.id] > 1).map(f => f.id)
    net.missing = shape.solid.faces.filter(f => !count[f.id]).map(f => f.id)
    const two = net.doubled.length === 1 && count[net.doubled[0]] === 2
    net.failDetail = 'Folded up, ' + (two ? 'two squares both land on the ' + nm(net.doubled[0]) + ' face'
      : 'squares double up on the ' + listText(net.doubled.map(nm)) + ' faces') + ', and the ' + listText(net.missing.map(nm)) +
      (net.missing.length === 1 ? ' face is' : ' faces are') + ' left open.'
  }
  return finishNet(shape, net)
}

/** The cell with the smallest eccentricity (then most neighbours): folding from it nests least. */
function treeCentre(adj: number[][]): number {
  let best = 0, bestKey: [number, number] | null = null
  adj.forEach((nb, i) => {
    const d = adj.map(() => -1)
    d[i] = 0
    const qu = [i]
    while (qu.length) { const x = qu.shift() as number; adj[x].forEach(y => { if (d[y] < 0) { d[y] = d[x] + 1; qu.push(y) } }) }
    const key: [number, number] = [Math.max(...d), -nb.length]
    if (!bestKey || key[0] < bestKey[0] || (key[0] === bestKey[0] && key[1] < bestKey[1])) { best = i; bestKey = key }
  })
  return best
}

/** Put hinges in breadth-first order from the root, with depth; check they form a spanning tree. */
function orderHinges(net: DraftNet): void {
  const ids = Object.keys(net.faces2d)
  const kids: Record<string, DraftHinge[]> = {}, hasParent: Record<string, boolean> = {}
  net.hinges.forEach(h => {
    if (hasParent[h.child]) throw new Error('nets: face ' + h.child + ' has two parents in ' + net.id)
    hasParent[h.child] = true
    ;(kids[h.parent] = kids[h.parent] || []).push(h)
  })
  const depth: Record<string, number> = {}, order = [net.root], out: DraftHinge[] = []
  depth[net.root] = 0
  for (let k = 0; k < order.length; k++) {
    ;(kids[order[k]] || []).forEach(h => {
      if (h.child in depth) throw new Error('nets: hinge cycle in ' + net.id)
      depth[h.child] = depth[order[k]] + 1
      h.depth = depth[h.child]
      order.push(h.child)
      out.push(h)
    })
  }
  if (order.length !== ids.length || out.length !== ids.length - 1) throw new Error('nets: hinges of ' + net.id + ' are not a spanning tree')
  net.hinges = out
  net.order = order
}

/** Find which side of each face a hinge uses (2D geometry), and store its segment. */
function matchHingeSides(net: DraftNet): void {
  net.hinges.forEach(h => {
    const P = net.faces2d[h.parent], C = net.faces2d[h.child]
    let found: [number, number] | null = null
    for (let i = 0; i < P.length && !found; i++) {
      for (let j = 0; j < C.length && !found; j++) {
        if (near2(P[i], C[(j + 1) % C.length], MATCH) && near2(P[(i + 1) % P.length], C[j], MATCH)) found = [i, j]
      }
    }
    if (!found) throw new Error('nets: hinge ' + h.parent + '–' + h.child + ' in ' + net.id + ': faces do not share a side')
    h.pi = found[0]
    h.ci = found[1]
    h.seg = [[P[h.pi][0], P[h.pi][1]], [P[(h.pi + 1) % P.length][0], P[(h.pi + 1) % P.length][1]]]
  })
}

/** Everything else a UI needs: hinge ids, net edges with cut pairs, net points, bounds. */
function finishNet(shape: Shape, draft: DraftNet): Net {
  const ix = index(shape)
  orderHinges(draft)
  matchHingeSides(draft)
  const net = draft as unknown as Net
  const sideKey = (f: string, i: number) => f + ':' + i
  const solidEdge = (f: string, i: number) => {
    const c = net.corners[f], e = ix.edgeByVerts[c[i] + '|' + c[(i + 1) % c.length]]
    if (!e) throw new Error('nets: side ' + sideKey(f, i) + ' of ' + net.id + ' is not an edge of the solid')
    return e
  }
  const hingeAt: Record<string, Hinge> = {}
  net.hinges.forEach(h => {
    const e = solidEdge(h.parent, h.pi)
    if (solidEdge(h.child, h.ci) !== e) throw new Error('nets: hinge ' + h.parent + '–' + h.child + ' joins different edges')
    h.edge = e.id
    h.id = sideKey(h.child, h.ci)
    hingeAt[sideKey(h.parent, h.pi)] = hingeAt[sideKey(h.child, h.ci)] = h
  })

  // Cut sides, in order round the net (by angle of their midpoint about the centre).
  const cuts: { id: string; face: string; i: number; solidEdge: string; seg: [Vec2, Vec2]; ang: number }[] = []
  net.order.forEach(f => {
    const poly = net.faces2d[f]
    poly.forEach((pt, i) => {
      if (hingeAt[sideKey(f, i)]) return
      const q = poly[(i + 1) % poly.length], e = solidEdge(f, i)
      cuts.push({ id: sideKey(f, i), face: f, i, solidEdge: e.id, seg: [[pt[0], pt[1]], [q[0], q[1]]], ang: Math.atan2((pt[1] + q[1]) / 2, (pt[0] + q[0]) / 2) })
    })
  })
  cuts.sort((x, y) => y.ang - x.ang)
  const pairOf: Record<string, number> = {}, members: Record<string, string[]> = {}
  let nextPair = 0
  cuts.forEach(c => {
    if (!(c.solidEdge in pairOf)) { pairOf[c.solidEdge] = nextPair++; members[c.solidEdge] = [] }
    members[c.solidEdge].push(c.id)
  })
  const decorate = (ne: NetEdge, e: SolidEdge) => {
    ne.length = e.length
    if (e.smooth) { if (ne.kind === 'hinge') ne.smooth = true; ne.group = ne.kind === 'hinge' ? 'ruling' : 'seam' }
    else if (e.group) ne.group = e.group
    return ne
  }
  const netEdges: NetEdge[] = []
  cuts.slice().sort((x, y) => pairOf[x.solidEdge] - pairOf[y.solidEdge]).forEach(c => {
    const m = members[c.solidEdge]
    const ne: NetEdge = {
      id: c.id, face: c.face, i: c.i, kind: 'cut', solidEdge: c.solidEdge, pairId: pairOf[c.solidEdge],
      partner: m.length === 2 ? m[m[0] === c.id ? 1 : 0] : null, pairSize: m.length, seg: c.seg, length: 0,
    }
    netEdges.push(decorate(ne, ix.edge[c.solidEdge]))
  })
  net.hinges.forEach(h => {
    const ne: NetEdge = {
      id: h.id, face: h.child, i: h.ci, kind: 'hinge', solidEdge: h.edge, pairId: nextPair++, partner: null, pairSize: 1,
      faces: [h.parent, h.child], other: { face: h.parent, i: h.pi }, seg: [[h.seg[0][0], h.seg[0][1]], [h.seg[1][0], h.seg[1][1]]], length: 0,
    }
    netEdges.push(decorate(ne, ix.edge[h.edge]))
  })
  net.netEdges = netEdges
  net.cutPairs = Object.keys(pairOf).length
  net.sideIndex = {}
  netEdges.forEach(ne => {
    net.sideIndex[sideKey(ne.face, ne.i)] = ne.id
    if (ne.other) net.sideIndex[sideKey(ne.other.face, ne.other.i)] = ne.id
  })

  const pts: NetPoint[] = []
  net.cornerPoint = {}
  net.order.forEach(f => net.faces2d[f].forEach((q, i) => {
    let pt = pts.find(p => near2(p.xy, q, MATCH))
    if (!pt) { pt = { id: 'p' + pts.length, xy: [q[0], q[1]], corners: [], vertices: [] }; pts.push(pt) }
    const cid = f + '@' + i, v = net.corners[f][i]
    pt.corners.push(cid)
    if (pt.vertices.indexOf(v) < 0) pt.vertices.push(v)
    net.cornerPoint[cid] = pt.id
  }))
  net.netPoints = pts

  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
  net.order.forEach(f => net.faces2d[f].forEach(q => {
    minX = Math.min(minX, q[0]); maxX = Math.max(maxX, q[0]); minY = Math.min(minY, q[1]); maxY = Math.max(maxY, q[1])
  }))
  net.bounds = { minX, maxX, minY, maxY, w: maxX - minX, h: maxY - minY }
  return net
}

/* ═════════════════════════════════════════ Folding ═════════════════════════════════════════ */

const FRAMES = new WeakMap<object, { a: Vec3; u: Vec3 }[]>()
/** Per hinge: a point on the hinge line and the axis direction that lifts the child UP (+z). */
function hingeFrames(net: Net): { a: Vec3; u: Vec3 }[] {
  let fr = FRAMES.get(net)
  if (fr) return fr
  fr = net.hinges.map(h => {
    const a = h.seg[0], b = h.seg[1]
    let u = unit([b[0] - a[0], b[1] - a[1], 0])
    const c = mean2(net.faces2d[h.child])
    if (u[0] * (c[1] - a[1]) - u[1] * (c[0] - a[0]) < 0) u = mul(u, -1) // (u × d)·z must be > 0
    return { a: to3(a), u }
  })
  FRAMES.set(net, fr)
  return fr
}
/** Rigid transform of every face (flat net frame) when hinge k is folded by prog[k] of its angle. */
function computeFrames(net: Net, prog: number[]): Record<string, Transform> {
  const fr = hingeFrames(net), T: Record<string, Transform> = {}
  T[net.root] = IDENTITY
  net.hinges.forEach((h, k) => { T[h.child] = tCompose(T[h.parent], tRotLine(fr[k].a, fr[k].u, h.angle * prog[k])) })
  return T
}

/** Display name of a net face: its surface ('Curved surface' for any strip), or e.g. 'Top (2nd square)' on a non-net. */
export function netFaceName(shape: Shape, net: Net, f: string): string {
  const ix = index(shape), sf = net.faceMap[f], su = ix.surface[sf]
  const nm = su ? su.name : ix.face[sf] ? ix.face[sf].name : f
  const k = f.length > sf.length ? +f.slice(sf.length) : 1
  return k > 1 ? nm + ' (' + k + (k === 2 ? 'nd' : k === 3 ? 'rd' : 'th') + ' square)' : nm
}

/**
 * The steps used by fold modes 'sequence' / 'depth'.
 *  'sequence': one hinge at a time, breadth-first (nearest the base first); all strip-to-strip hinges
 *    of a curved surface roll together as one step; the lid ('top' and what hangs off it) closes last.
 *  'depth': all hinges at the same depth fold together. opts.steps: a custom order.
 */
export function foldSteps(shape: Shape, net: Net, opts: FoldOptions = {}): FoldStep[] {
  const ix = index(shape)
  const k0: Record<string, number> = {}
  net.hinges.forEach((h, k) => { k0[h.child] = k })
  const mk = (list: number[]): FoldStep => ({ hinges: list, faces: list.map(k => net.hinges[k].child), label: '', kind: 'fold' })
  let steps: FoldStep[]
  if (opts.steps) {
    steps = opts.steps.map(st => mk(st.map(f => k0[f]).filter(k => k !== undefined)))
  } else if (opts.mode === 'depth') {
    const byDepth: number[][] = []
    net.hinges.forEach((h, k) => { (byDepth[h.depth - 1] = byDepth[h.depth - 1] || []).push(k) })
    steps = byDepth.filter(Boolean).map(mk)
  } else {
    const sf = (f: string) => ix.face[net.faceMap[f]]
    const lidSide: Record<string, boolean> = {}
    net.order.forEach(f => {
      const h = net.hinges[k0[f]]
      lidSide[f] = sf(f).role === 'top' || (h ? !!lidSide[h.parent] : false)
    })
    const items = net.hinges.map((h, k) => ({ k, h, g: sf(h.parent).group && sf(h.parent).group === sf(h.child).group ? sf(h.child).group : null }))
    items.sort((x, y) => (lidSide[x.h.child] ? 1 : 0) - (lidSide[y.h.child] ? 1 : 0) || x.h.depth - y.h.depth || x.k - y.k)
    steps = []
    const groupStep: Record<string, FoldStep> = {}
    items.forEach(it => {
      if (it.g) {
        if (!groupStep[it.g]) { groupStep[it.g] = mk([]); groupStep[it.g].kind = 'roll'; steps.push(groupStep[it.g]) }
        groupStep[it.g].hinges.push(it.k)
        groupStep[it.g].faces.push(it.h.child)
      } else {
        const st = mk([it.k])
        st.kind = lidSide[it.h.child] ? 'lid' : 'fold'
        steps.push(st)
      }
    })
  }
  steps.forEach(st => {
    const names: string[] = []
    st.faces.forEach(f => { const nm = netFaceName(shape, net, f); if (names.indexOf(nm) < 0) names.push(nm) })
    st.label = listText(names)
  })
  return steps
}

const STEPS = new WeakMap<Net, Record<string, FoldStep[]>>()
function cachedSteps(shape: Shape, net: Net, opts: FoldOptions): FoldStep[] {
  if (opts.steps) return foldSteps(shape, net, opts)
  let c = STEPS.get(net)
  if (!c) { c = {}; STEPS.set(net, c) }
  const key = (opts.mode === 'depth' ? 'depth' : 'sequence') + '|' + shape.id
  return c[key] || (c[key] = foldSteps(shape, net, opts))
}

function hingeProgress(shape: Shape, net: Net, t: number, opts: FoldOptions): number[] {
  const mode = opts.mode || 'together'
  const prog = new Array<number>(net.hinges.length).fill(0)
  if (mode === 'together') {
    prog.fill(easeFn(opts.ease || 'linear')(t))
  } else {
    const steps = cachedSteps(shape, net, opts)
    const K = steps.length, ov = clamp(opts.overlap || 0, 0, 0.95)
    const w = 1 / (1 + (K - 1) * (1 - ov)), e = easeFn(opts.ease || 'smooth')
    steps.forEach((st, j) => {
      const f = e(clamp((t - j * w * (1 - ov)) / w, 0, 1))
      st.hinges.forEach(k => { prog[k] = f })
    })
  }
  const ht = opts.hingeT
  if (ht) net.hinges.forEach((h, k) => { if (ht[h.child] !== undefined) prog[k] = clamp(ht[h.child], 0, 1) })
  return prog
}

/** How far the fold has slid/turned towards the solid's place (0 = net frame, 1 = solid frame). */
function anchorAmount(t: number, opts: FoldOptions): number {
  const anchor = opts.anchor === undefined ? 'solid' : opts.anchor
  const mode = opts.mode || 'together'
  return anchor === 'net' ? 0 : typeof anchor === 'number' ? clamp(anchor, 0, 1)
    : easeFn(mode === 'together' ? opts.ease || 'linear' : 'smooth')(t)
}

/**
 * Where every net face is at fold amount t (0 = flat, 1 = folded). For a non-net the same rule
 * applies, so overlaps and gaps show at t = 1. See FoldOptions for mode / ease / anchor.
 */
export function foldState(shape: Shape, net: Net, t: number, opts: FoldOptions = {}): FoldState {
  t = clamp(+t || 0, 0, 1)
  const prog = hingeProgress(shape, net, t, opts)
  const T = computeFrames(net, prog)
  const s = anchorAmount(t, opts)
  const ts = net.toSolid
  const place: Transform = { R: rotZ(ts.angle * s), t: [ts.tx * s, ts.ty * s, 0] }
  const out: FoldState = { t, faces: {}, normals: {}, centroids: {}, corners3d: {}, transforms: {}, progress: {}, bounds: { min: [0, 0, 0], max: [0, 0, 0] } }
  const lo: Vec3 = [Infinity, Infinity, Infinity], hi: Vec3 = [-Infinity, -Infinity, -Infinity]
  net.order.forEach(f => {
    const Tf = tCompose(place, T[f])
    const pts = net.faces2d[f].map(q => applyTransform(Tf, [q[0], q[1], 0]))
    out.transforms[f] = Tf
    out.faces[f] = pts
    out.normals[f] = mv(Tf.R, [0, 0, -1]) // the outside of a flat net faces down
    out.centroids[f] = mean3(pts)
    pts.forEach((p, i) => {
      const v = net.corners[f][i]
      ;(out.corners3d[v] = out.corners3d[v] || []).push(p)
      for (let k = 0; k < 3; k++) { lo[k] = Math.min(lo[k], p[k]); hi[k] = Math.max(hi[k], p[k]) }
    })
  })
  net.hinges.forEach((h, k) => { out.progress[h.child] = prog[k] })
  out.bounds = { min: lo, max: hi }
  return out
}

/**
 * A point of the closed solid in the frame foldState(…, 1, opts) uses (identity for the default
 * anchor 'solid'; the root face's own frame for anchor 'net').
 */
export function solidToFoldFrame(net: Net, p: Vec3, opts: FoldOptions = {}): Vec3 {
  const s = anchorAmount(1, opts), ts = net.toSolid
  const q = rot2([p[0] - ts.tx, p[1] - ts.ty], -ts.angle) // solid -> flat net frame
  const r = rot2(q, ts.angle * s)
  return [r[0] + ts.tx * s, r[1] + ts.ty * s, p[2]]
}

/* ═════════════════════════════════════════ Lookups ═════════════════════════════════════════ */

export function getNet(shape: Shape, id: string): Net | null { return shape.nets.find(n => n.id === id) || null }
/** The net edge on side i of a net face (hinges can be reached from both sides). */
export function netEdgeAt(net: Net, face: string, i: number): NetEdge | null {
  const id = net.sideIndex[face + ':' + i]
  return id ? net.netEdges.find(e => e.id === id) || null : null
}
export function netEdgeById(net: Net, id: string): NetEdge | null { return net.netEdges.find(e => e.id === id) || null }
/** The selectable surface a solid face belongs to (its group, or itself). */
export function surfaceOf(shape: Shape, faceId: string): Surface | null { return index(shape).surface[faceId] || null }
/** Logical face of a solid or net face: the face id, or 'curved' for a strip of a curved surface. */
export function logicalFaceOf(shape: Shape, net: Net | null, faceId: string): string {
  const sf = net && net.faceMap[faceId] ? net.faceMap[faceId] : faceId
  const su = surfaceOf(shape, sf)
  return su ? su.id : sf
}
/** Logical edge of a net edge: the solid edge id, or 'seam' / 'topRim' / 'baseRim' on curved solids. */
export function logicalEdgeOf(ne: NetEdge): string {
  return ne.group === 'seam' ? 'seam' : ne.group === 'topRim' || ne.group === 'baseRim' ? ne.group : ne.solidEdge
}

/**
 * Everything that corresponds to a clicked feature, in BOTH views.
 *  'face'    a solid face id, or a group / logical id ('curved')    'netFace'  a net face id
 *  'surface' a surface id (same as face)                            'edge'     a solid edge id, or 'seam' / 'topRim' / 'baseRim'
 *  'netEdge' a net edge id                                          'vertex'   a solid vertex id
 *  'corner'  a net corner 'face@i'                                  'netPoint' a net point 'p3'
 * opts.groups (default true): a face or edge in a group (curved surface, rim) selects the whole group.
 * A solid face <-> its net face (every strip for curved); a solid edge <-> one hinge or the two cut
 * edges that glue together; a solid vertex <-> every net corner that becomes it.
 */
export function linked(shape: Shape, net: Net, sel: Selection, opts: { groups?: boolean } = {}): Linked {
  const groups = opts.groups !== false
  const ix = index(shape)
  const res: Linked = { kind: sel.kind, id: sel.id, faces: [], edges: [], vertices: [], netFaces: [], netEdges: [], corners: [], netPoints: [], surfaces: [], logicalEdges: [] }
  const addFace = (f: string) => {
    const sf = ix.face[f]
    if (!sf) return
    if (groups && sf.group) res.faces = res.faces.concat(ix.group[sf.group])
    else res.faces.push(f)
  }
  const addEdge = (id: string) => {
    const e = ix.edge[id]
    if (!e) return
    if (groups && e.group && e.group !== 'ruling') res.edges = res.edges.concat(shape.solid.edges.filter(x => x.group === e.group).map(x => x.id))
    else res.edges.push(id)
  }
  const parse = (id: string, sep: string): [string, number] => { const k = id.lastIndexOf(sep); return [id.slice(0, k), +id.slice(k + 1)] }
  switch (sel.kind) {
    case 'face':
    case 'surface':
      if (ix.face[sel.id]) addFace(sel.id)
      else (ix.group[sel.id] || []).forEach(addFace)
      break
    case 'netFace': if (net.faceMap[sel.id]) addFace(net.faceMap[sel.id]); break
    case 'edge':
      if (ix.edge[sel.id]) addEdge(sel.id)
      else if (sel.id === 'seam') net.netEdges.forEach(e => { if (e.group === 'seam') res.edges.push(e.solidEdge) })
      else shape.solid.edges.forEach(e => { if (e.group === sel.id) res.edges.push(e.id) })
      break
    case 'netEdge': {
      const ne = netEdgeById(net, sel.id) || netEdgeAt(net, ...parse(sel.id, ':'))
      if (ne) { addEdge(ne.solidEdge); res.pairId = ne.pairId; res.edgeKind = ne.kind }
      break
    }
    case 'vertex': if (ix.vertex[sel.id]) res.vertices.push(sel.id); break
    case 'corner': {
      const fc = parse(sel.id, '@'), c = net.corners[fc[0]]
      if (c && c[fc[1]] !== undefined) res.vertices.push(c[fc[1]])
      break
    }
    case 'netPoint': {
      const pt = net.netPoints.find(p => p.id === sel.id)
      if (pt) res.vertices = pt.vertices.slice()
      break
    }
  }
  res.faces = uniq(res.faces)
  res.edges = uniq(res.edges)
  res.vertices = uniq(res.vertices)
  const fset: Record<string, 1> = {}, eset: Record<string, 1> = {}, vset: Record<string, 1> = {}
  res.faces.forEach(f => { fset[f] = 1 })
  res.edges.forEach(e => { eset[e] = 1 })
  res.vertices.forEach(v => { vset[v] = 1 })
  res.netFaces = net.order.filter(f => fset[net.faceMap[f]])
  const nes = net.netEdges.filter(e => eset[e.solidEdge])
  res.netEdges = nes.map(e => e.id)
  net.order.forEach(f => net.corners[f].forEach((v, i) => { if (vset[v]) res.corners.push(f + '@' + i) }))
  res.netPoints = uniq(res.corners.map(c => net.cornerPoint[c]))
  res.surfaces = uniq(res.faces.map(f => logicalFaceOf(shape, null, f)))
  res.logicalEdges = shape.curved
    ? uniq(nes.filter(e => e.group !== 'ruling').map(logicalEdgeOf))
    : res.edges.slice()
  if (!net.isNet && res.faces.length === 1 && res.netFaces.length > 1) res.clash = true
  if (res.edges.length === 1 && res.edgeKind === undefined && nes.length) {
    res.pairId = nes[0].pairId
    res.edgeKind = nes[0].kind
  }
  return res
}

/** Area of a solid face, or of a net face when given a net. */
export function faceArea(obj: Shape | Net, faceId: string): number {
  if ('faces2d' in obj) return Math.abs(area2(obj.faces2d[faceId]))
  const f = index(obj).face[faceId]
  return f ? f.area : NaN
}
/** True surface area: exact circle formulas for curved shapes; {polyhedral: true} sums the model's faces. */
export function surfaceArea(shape: Shape, opts: { polyhedral?: boolean } = {}): number {
  if (opts.polyhedral || !shape.curved) return shape.solid.faces.reduce((s, f) => s + f.area, 0)
  return shape.formulas.total
}

export interface EulerResult {
  polyhedron: boolean
  V: number | null
  E: number | null
  F: number | null
  chi: number | null
  note: string
  informal?: { surfaces: number; edges: number; vertices: number }
  model?: { V: number; E: number; F: number; chi: number }
}
/** V, E, F and V − E + F, or a "not a polyhedron" note for curved shapes. */
export function euler(shape: Shape): EulerResult {
  const V = shape.solid.vertices.length, E = shape.solid.edges.length, F = shape.solid.faces.length
  if (shape.curved) {
    const info = shape.eulerInfo || { what: shape.name.toLowerCase(), surfaces: 0, edges: 0, vertices: 0 }
    return {
      polyhedron: false, V: null, E: null, F: null, chi: null,
      note: 'A ' + info.what + ' is not a polyhedron: its curved surface is not made of flat faces, so Euler’s formula V − E + F = 2 does not apply.',
      informal: { surfaces: info.surfaces, edges: info.edges, vertices: info.vertices },
      model: { V, E, F, chi: V - E + F },
    }
  }
  return { polyhedron: true, V, E, F, chi: V - E + F, note: 'V − E + F = ' + V + ' − ' + E + ' + ' + F + ' = ' + (V - E + F) }
}
/** 3D corner positions of a solid face (closed solid frame). */
export function facePoints(shape: Shape, faceId: string): Vec3[] | null {
  const ix = index(shape), f = ix.face[faceId]
  return f ? f.verts.map(v => [ix.vertex[v].p[0], ix.vertex[v].p[1], ix.vertex[v].p[2]] as Vec3) : null
}

/** Boundary loop(s) of a net or of some of its faces (hinges between two of them ignored); collinear points merged. */
export function outline(net: Net, faceIds?: string[]): Vec2[][] {
  const ids = faceIds || net.order, set: Record<string, 1> = {}
  ids.forEach(f => { set[f] = 1 })
  const segs: [Vec2, Vec2][] = []
  ids.forEach(f => {
    const poly = net.faces2d[f]
    poly.forEach((p, i) => {
      const ne = netEdgeAt(net, f, i)
      if (ne && ne.kind === 'hinge' && ne.faces && set[ne.faces[0]] && set[ne.faces[1]]) return
      segs.push([p, poly[(i + 1) % poly.length]])
    })
  })
  const used = segs.map(() => false), loops: Vec2[][] = []
  for (let s0 = 0; s0 < segs.length; s0++) {
    if (used[s0]) continue
    used[s0] = true
    const loop = [segs[s0][0]]
    let cur = segs[s0][1]
    for (let guard = 0; guard < segs.length && !near2(cur, loop[0], MATCH); guard++) {
      const j = segs.findIndex((sg, k) => !used[k] && near2(sg[0], cur, MATCH))
      if (j < 0) break
      used[j] = true
      loop.push(segs[j][0])
      cur = segs[j][1]
    }
    loops.push(simplifyLoop(loop))
  }
  return loops
}
function simplifyLoop(loop: Vec2[]): Vec2[] {
  const n = loop.length
  return loop.filter((p, i) => {
    const a = loop[(i - 1 + n) % n], b = loop[(i + 1) % n]
    const cr = (p[0] - a[0]) * (b[1] - p[1]) - (p[1] - a[1]) * (b[0] - p[0])
    return Math.abs(cr) > 1e-9 * Math.max(1, Math.hypot(b[0] - a[0], b[1] - a[1]))
  }).map(p => [p[0], p[1]] as Vec2)
}
/** Outline of all net faces in a solid face group (the cylinder's rectangle, the cone's sector). */
export function groupOutline(shape: Shape, net: Net, group: string): Vec2[][] {
  const ix = index(shape)
  return outline(net, net.order.filter(f => { const sf = ix.face[net.faceMap[f]]; return !!sf && (sf.group === group || sf.id === group) }))
}

/**
 * Meet lines while a net is partly folded (dotted guides showing what will join):
 *  edge (solid id, 'seam', or any of its net edges): one segment between the midpoints of the two
 *    cut edges that will be taped together (none if it is a fold line);
 *  vertex: a segment from every current position of that corner to where it ends up (target).
 * Uses foldState(shape, net, t, opts) and the closed state with the same opts.
 */
export function meetLines(shape: Shape, net: Net, t: number, sel: Selection, opts: FoldOptions = {}): { segments: [Vec3, Vec3][]; target: Vec3 | null } {
  const out = { segments: [] as [Vec3, Vec3][], target: null as Vec3 | null }
  const fs = foldState(shape, net, t, opts)
  if (sel.kind === 'edge' || sel.kind === 'netEdge') {
    let solidEdge = sel.id
    if (sel.kind === 'netEdge') { const ne = netEdgeById(net, sel.id); if (!ne) return out; solidEdge = ne.solidEdge }
    else if (sel.id === 'seam') { const ne = net.netEdges.find(e => e.group === 'seam'); if (!ne) return out; solidEdge = ne.solidEdge }
    const cuts = net.netEdges.filter(e => e.kind === 'cut' && e.solidEdge === solidEdge)
    if (cuts.length === 2) {
      const m = (e: NetEdge): Vec3 => { const P = fs.faces[e.face]; return mean3([P[e.i], P[(e.i + 1) % P.length]]) }
      out.segments.push([m(cuts[0]), m(cuts[1])])
    }
    return out
  }
  let v: string | null = null
  if (sel.kind === 'vertex') v = sel.id
  else if (sel.kind === 'corner' || sel.kind === 'netPoint') v = linked(shape, net, sel).vertices[0] || null
  if (!v) return out
  const closed = foldState(shape, net, 1, opts).corners3d[v]
  if (!closed) return out
  const target = closed[0]
  out.target = target
  const seen: Vec3[] = []
  ;(fs.corners3d[v] || []).forEach(p => {
    if (seen.some(q => dist(p, q) < 1e-6)) return
    seen.push(p)
    if (dist(p, target) > 1e-3) out.segments.push([p, target])
  })
  return out
}

/* ═══════════════════════════════════ Cube grid patterns ═══════════════════════════════════ */

export type CubeFamily = '1-4-1' | '2-3-1' | '2-2-2' | '3-3'

/** The four families of cube nets, with the mockups' captions. */
export const CUBE_FAMILIES: Record<CubeFamily, { label: string; short: string; tip: string }> = {
  '1-4-1': { label: 'Row of Four (1–4–1)', short: 'row of four', tip: 'a row of 4 with one square on each side' },
  '2-3-1': { label: 'Row of Three (1–3–2)', short: 'row of three', tip: 'a row of 3 with one square on one side and two on the other' },
  '2-2-2': { label: 'Staircase (2–2–2)', short: 'staircase', tip: 'three steps of two squares' },
  '3-3': { label: 'Two Rows of Three (3–3)', short: 'two rows of three', tip: 'two rows of 3 that overlap by one square' },
}
export const CUBE_FAMILY_ORDER: CubeFamily[] = ['1-4-1', '2-3-1', '2-2-2', '3-3']

/** The 8 turns / flips of a grid pattern (identity first). */
export const GRID_SYMMETRIES: ((x: number, y: number) => Vec2)[] = [
  (x, y) => [x, y], (x, y) => [-y, x], (x, y) => [-x, -y], (x, y) => [y, -x],
  (x, y) => [-x, y], (x, y) => [y, x], (x, y) => [x, -y], (x, y) => [-y, -x],
]

/** Longest straight run of squares, in either direction. */
export function longestRun(cells: Vec2[]): number {
  const h: Record<string, 1> = {}
  let best = 0
  cells.forEach(c => { h[c[0] + ',' + c[1]] = 1 })
  cells.forEach(c => {
    ;([[1, 0], [0, 1]] as Vec2[]).forEach(d => {
      if (h[(c[0] - d[0]) + ',' + (c[1] - d[1])]) return
      let n = 0
      while (h[(c[0] + n * d[0]) + ',' + (c[1] + n * d[1])]) n++
      best = Math.max(best, n)
    })
  })
  return best
}
/** Which family a cube net's squares belong to (by its rows). */
export function familyOf(cells: Vec2[]): CubeFamily {
  const run = longestRun(cells)
  if (run >= 4) return '1-4-1'
  if (run <= 2) return '2-2-2'
  const h: Record<string, 1> = {}, rows3 = [0, 0]
  cells.forEach(c => { h[c[0] + ',' + c[1]] = 1 })
  cells.forEach(c => {
    ;([[1, 0], [0, 1]] as Vec2[]).forEach((d, k) => {
      if (h[(c[0] - d[0]) + ',' + (c[1] - d[1])]) return
      let n = 0
      while (h[(c[0] + n * d[0]) + ',' + (c[1] + n * d[1])]) n++
      if (n === 3) rows3[k]++
    })
  })
  return rows3[0] >= 2 || rows3[1] >= 2 ? '3-3' : '2-3-1'
}

/**
 * The mockups' root rule for a cube net: the square with the most neighbours, ties going to the
 * first in reading order (top row first, then left to right).
 */
export function pickRoot(cells: Vec2[]): number {
  const at: Record<string, number> = {}
  cells.forEach((c, i) => { at[c[0] + ',' + c[1]] = i })
  const nb = cells.map(c => ([[1, 0], [-1, 0], [0, 1], [0, -1]] as Vec2[]).filter(d => at[(c[0] + d[0]) + ',' + (c[1] + d[1])] !== undefined).length)
  const idx = cells.map((_c, i) => i).sort((i, j) => cells[j][1] - cells[i][1] || cells[i][0] - cells[j][0])
  let best = idx[0]
  idx.forEach(i => { if (nb[i] > nb[best]) best = i })
  return best
}

/* ═══════════════════════════════════ The catalogue (mockups) ═══════════════════════════════════ */

/** Colour index 1…8 (var(--face-N) / var(--pair-N) in the page's stylesheet). */
export const BLUE = 1, AMBER = 2, EMERALD = 3, ROSE = 4, VIOLET = 5, ORANGE = 6, TEAL = 7, LIME = 8

/** The mockups' colours (Tailwind 200 fills / 700 tags in light; 800 fills / 300 tags in dark). */
export const NETS_PALETTE = {
  light: {
    face: ['#bfdbfe', '#fde68a', '#a7f3d0', '#fecdd3', '#ddd6fe', '#fed7aa', '#99f6e4', '#d9f99d'],
    pair: ['#1d4ed8', '#c2410c', '#0f766e', '#be185d', '#a16207', '#6d28d9', '#b91c1c', '#15803d'],
    stage: '#f9fafb', ink: '#111827', fold: '#6b7280', edge3d: '#374151', dot: '#374151', letter: '#1f2937',
    faceText: '#111827', tagText: '#ffffff', paper: '#9ca3af', neutral: '#e5e7eb', amberLine: '#d97706', amberHatch: '#f59e0b',
  },
  dark: {
    face: ['#1e40af', '#92400e', '#065f46', '#9f1239', '#5b21b6', '#9a3412', '#115e59', '#3f6212'],
    pair: ['#93c5fd', '#fdba74', '#5eead4', '#f9a8d4', '#fde047', '#c4b5fd', '#fca5a5', '#86efac'],
    stage: '#030712', ink: '#f9fafb', fold: '#9ca3af', edge3d: '#d1d5db', dot: '#d1d5db', letter: '#f3f4f6',
    faceText: '#ffffff', tagText: '#030712', paper: '#4b5563', neutral: '#374151', amberLine: '#fbbf24', amberHatch: '#f59e0b',
  },
} as const
/** Colour index (1…8) of a taped-pair number: 1→1 … 8→8, 9→1. */
export function pairColour(no: number): number { return ((no - 1) % 8) + 1 }

export type ShapeKey = 'cube' | 'cuboid' | 'triangular-prism' | 'hexagonal-prism' | 'square-pyramid' | 'tetrahedron' | 'octahedron' | 'cylinder' | 'cone'
export type ShapeGroup = 'Prisms' | 'Pyramids' | 'Other Polyhedra' | 'Curved Solids'
export const SHAPE_GROUPS: ShapeGroup[] = ['Prisms', 'Pyramids', 'Other Polyhedra', 'Curved Solids']

/** One row of the Surface Area table / one selectable face. */
export interface FaceInfo {
  /** Logical face id: the solid face id, or 'curved'. */
  id: string
  /** 'Top', 'Slope', 'ABHG' (unnamed faces go by their letters), 'Curved Surface'. */
  name: string
  /** Shorter label where space is tight ('Curved'). */
  short?: string
  /** True for faces with a name ('Top face'); false for letter-named faces ('Face ABHG'). */
  named: boolean
  /** Heading / tooltip: 'Top face', 'Face ABHG', 'Curved surface'. */
  title: string
  /** Vertex letters of the solid face ('EFGH'); '' for curved surfaces and circles. */
  label: string
  /** Colour index 1…8. */
  ci: number
  /** 'Square, 3 cm by 3 cm' — the panel says desc + '. Area = ' + work + ' = ' + areaText + ' cm².' */
  desc: string
  work: string
  area: number
  /** '9', '4√3 ≈ 6.93', '20π ≈ 62.83' (cm², unit not included). */
  areaText: string
  /** Exact form when areaText has an approximation ('4√3', '20π'). */
  exact?: string
  /** Table column: 'Square', 'Rectangle', 'Right-angled triangle', 'Rectangle when flat'… */
  shape: string
}

/** True geometry of a curved solid's net (a real rectangle / sector and circles), in its net's frame. */
export type CurvedNetGeometry = {
  kind: 'cylinder'
  /** Rectangle corners: bottom-left, top-left, top-right, bottom-right (seen with `up` pointing up). */
  rect: [Vec2, Vec2, Vec2, Vec2]
  baseC: Vec2
  topC: Vec2
  r: number
  /** Rectangle width 2πr and height h. */
  w: number
  h: number
  /** Unit direction from the base circle up the rectangle. */
  up: Vec2
  /** Where each circle touches the rectangle. */
  touchBase: Vec2
  touchTop: Vec2
  bounds: Bounds2
} | {
  kind: 'cone'
  apex: Vec2
  /** Sector radius = slant height. */
  s: number
  /** Half the sector angle (radians) and the direction of its middle (radians, maths axes). */
  half: number
  mid: number
  /** Sector angle in degrees (216 for r = 3, s = 5). */
  angle: number
  /** The two ends of the arc (mid − half, mid + half). */
  arcEnds: [Vec2, Vec2]
  /** Where the base circle touches the arc. */
  touch: Vec2
  baseC: Vec2
  r: number
  bounds: Bounds2
}

export interface NetInfo {
  id: string
  /** Short name ('Cross', 'Strip of Three', 'Band of Six'). */
  name: string
  /** Caption over the net ('Row of Four (1–4–1)', 'Band of Six Rectangles'). */
  caption: string
  /** 1-based position in the shape's list. */
  n: number
  family?: CubeFamily
  cells?: Vec2[]
  net: Net
  /** Logical edge -> taped-pair number (cut edges only; numbers rise clockwise round the net from its top-left corner). */
  pairNo: Record<string, number>
  pairCount: number
  /** Cut net-edge ids in the clockwise walk used for numbering (polyhedra). */
  walk: string[]
  walkComplete: boolean
  /** Solid edge -> its hinge net edge id (fold lines). */
  hingeOf: Record<string, string>
  /** Solid edge -> fold angle in degrees (fold lines; the faces end up at 180 − this to each other). */
  foldAngle: Record<string, number>
  /** Fold lines (F − 1), pairs of taped edges, edges round the outside. */
  foldLines: number
  tapedPairs: number
  outsideEdges: number
  /** Curved solids: the true rectangle / sector and circles. */
  curved?: CurvedNetGeometry
}

export interface CurvedInfo {
  kind: 'cylinder' | 'cone'
  r: number
  h: number
  /** Cone slant height. */
  s?: number
  /** Circumference of the base: {exact: '4π', approx: '12.57'}. */
  circumference: { exact: string; approx: string; value: number }
  /** Cone: sector angle (216) and its fraction of a circle ('3⁄5'). */
  sectorAngle?: number
  sectorFraction?: string
  /** '2 flat faces · 1 curved surface · 2 curved edges · 0 vertices' */
  counts: string
  what: string
  /** 'This net: 3 pairs of taped edges — the seam and the two rims.' */
  tapedNote: string
  /** Logical rim edges and their names, in pair-number order (after the seam). */
  rims: { id: 'topRim' | 'baseRim'; name: string }[]
}

export interface NetShape {
  key: ShapeKey
  title: string
  group: ShapeGroup
  /** 'a cube', 'an octahedron' (for aria labels and sentences). */
  lower: string
  shape: Shape
  /** 's = 3', '3-4-5 triangle, length 6'. */
  size: string
  /** Faces in Surface Area table order (the curved surface counts as one). */
  faces: FaceInfo[]
  nets: NetInfo[]
  /** Pick a Net title: '11 nets of a cube', '2 nets of a tetrahedron', 'One common net'. */
  netsTitle: string
  /** Pick a Net groups (cube: by family; others: one group per net). Indices into nets. */
  netGroups: { caption: string; short: string; nets: number[] }[]
  /** Rich text ($…$ = TeX): the line under the empty info panel. */
  fact: string
  /** The worked surface-area formula: TeX for <Katex>, and plain text. */
  formula: { tex: string; text: string }
  formulaNote?: string
  /** 'Total = 9 + 9 + … = 54 cm²' and its parts. */
  total: { exact: string; approx: string | null; value: number; text: string }
  /** Rich text: the Common Mistake box (square pyramid and cone). */
  mistake?: string
  /** Slant height and height callout (square pyramid, cone). */
  slant?: { s: number; h: number; apex: string }
  curved?: CurvedInfo
  /** Polyhedra: faces, vertices, edges (F + V − E = 2). Null for curved solids. */
  euler: { F: number; V: number; E: number } | null
  /** Bounding-box centre and half-diagonal of the closed solid (camera framing). */
  centre: Vec3
  radius: number
}

/* ── face rows ── */
const R3 = '√3'
type FaceBody = Omit<FaceInfo, 'id' | 'name' | 'short' | 'named' | 'title' | 'label' | 'ci'>
function sqFace(a: number): FaceBody { return { desc: 'Square, ' + a + ' cm by ' + a + ' cm', work: a + ' × ' + a, area: a * a, areaText: String(a * a), shape: 'Square' } }
function rectFace(a: number, b: number): FaceBody { return { desc: 'Rectangle, ' + a + ' cm by ' + b + ' cm', work: a + ' × ' + b, area: a * b, areaText: String(a * b), shape: 'Rectangle' } }
function eqTri(a: number, exact: string): FaceBody {
  const A = (Math.sqrt(3) / 4) * a * a
  return { desc: 'Equilateral triangle with side ' + a + ' cm', work: '(' + R3 + '⁄4) × ' + a + '²', area: A, areaText: exact + ' ≈ ' + fmt2(A), exact, shape: 'Equilateral triangle' }
}
function row(shape: Shape, id: string, name: string, ci: number, body: FaceBody, named = true, extra: Partial<FaceInfo> = {}): FaceInfo {
  const sf = index(shape).face[id]
  const label = sf && !sf.group ? sf.label : ''
  const title = id === 'curved' ? 'Curved surface' : named ? name + ' face' : 'Face ' + name
  return Object.assign({ id, name, named, title, label, ci }, body, extra)
}

/* ── taped-pair numbering: walk the outside of the net clockwise from its top-most, then left-most corner ── */
function numberPairs(net: Net): { num: Record<number, number>; walk: string[]; complete: boolean } {
  const cuts = net.netEdges.filter(e => e.kind === 'cut')
  const key = (p: Vec2) => Math.round(p[0] * 1e6) + ',' + Math.round(p[1] * 1e6)
  const from: Record<string, NetEdge[]> = {}
  cuts.forEach(e => { (from[key(e.seg[0])] = from[key(e.seg[0])] || []).push(e) })
  let start: NetEdge | null = null
  for (const e of cuts) {
    const q = e.seg[0], b = start ? start.seg[0] : null
    if (!b || q[1] > b[1] + 1e-9 || (Math.abs(q[1] - b[1]) <= 1e-9 && q[0] < b[0] - 1e-9)) start = e
  }
  const used: Record<string, boolean> = {}, order: NetEdge[] = []
  let cur: NetEdge | null = start
  while (cur && !used[cur.id]) {
    used[cur.id] = true
    order.push(cur)
    const nxt: NetEdge[] = (from[key(cur.seg[1])] || []).filter(e => !used[e.id])
    cur = nxt[0] || null
  }
  const complete = order.length === cuts.length
  cuts.forEach(e => { if (!used[e.id]) order.push(e) }) // never expected; keeps the numbering total
  const num: Record<number, number> = {}
  let k = 0
  order.forEach(e => { if (!(e.pairId in num)) num[e.pairId] = ++k })
  return { num, walk: order.map(e => e.id), complete }
}

function curvedGeometry(shape: Shape, net: Net, kind: 'cylinder' | 'cone', r: number, h: number, s: number): CurvedNetGeometry {
  const hb = net.hinges.find(x => x.parent === net.root && x.child === 'c0')
  if (!hb) throw new Error('nets: curved net ' + shape.id + '/' + net.id + ' needs base–c0 as a hinge')
  const T: Vec2 = [(hb.seg[0][0] + hb.seg[1][0]) / 2, (hb.seg[0][1] + hb.seg[1][1]) / 2]
  const box = (pts: Vec2[], circles: [Vec2, number][]): Bounds2 => {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
    pts.forEach(p => { minX = Math.min(minX, p[0]); maxX = Math.max(maxX, p[0]); minY = Math.min(minY, p[1]); maxY = Math.max(maxY, p[1]) })
    circles.forEach(([c, rr]) => { minX = Math.min(minX, c[0] - rr); maxX = Math.max(maxX, c[0] + rr); minY = Math.min(minY, c[1] - rr); maxY = Math.max(maxY, c[1] + rr) })
    return { minX, maxX, minY, maxY, w: maxX - minX, h: maxY - minY }
  }
  const at = (o: Vec2, d: Vec2, k: number): Vec2 => [o[0] + d[0] * k, o[1] + d[1] * k]
  if (kind === 'cylinder') {
    const bc = mean2(net.faces2d[net.root])
    const n3 = unit([T[0] - bc[0], T[1] - bc[1], 0]), up: Vec2 = [n3[0], n3[1]], u: Vec2 = [up[1], -up[0]]
    const W = 2 * Math.PI * r
    const bl = at(T, u, -W / 2), br = at(T, u, W / 2)
    const rect: [Vec2, Vec2, Vec2, Vec2] = [bl, at(bl, up, h), at(br, up, h), br]
    const baseC = at(T, up, -r), topC = at(T, up, h + r)
    return { kind, rect, baseC, topC, r, w: W, h, up, touchBase: T, touchTop: at(T, up, h), bounds: box(rect, [[baseC, r], [topC, r]]) }
  }
  const apexPt = net.netPoints.find(p => p.vertices.indexOf('V') >= 0)
  if (!apexPt) throw new Error('nets: cone net has no apex point')
  const A = apexPt.xy
  const d3 = unit([T[0] - A[0], T[1] - A[1], 0]), d: Vec2 = [d3[0], d3[1]]
  const mid = Math.atan2(d[1], d[0]), half = (Math.PI * r) / s
  const onArc = (ang: number): Vec2 => [A[0] + s * Math.cos(ang), A[1] + s * Math.sin(ang)]
  const arc: Vec2[] = [A]
  for (let k = 0; k <= 64; k++) arc.push(onArc(mid - half + (2 * half * k) / 64))
  const baseC = at(A, d, s + r)
  return { kind, apex: [A[0], A[1]], s, half, mid, angle: (2 * half * 180) / Math.PI, arcEnds: [onArc(mid - half), onArc(mid + half)], touch: onArc(mid), baseC, r, bounds: box(arc, [[baseC, r]]) }
}

interface Draft {
  key: ShapeKey; title: string; group: ShapeGroup; lower: string; shape: Shape; size: string; faces: FaceInfo[]
  nets: { net: Net; name: string; caption: string; family?: CubeFamily; cells?: Vec2[] }[]
  fact: string; formula: { tex: string; text: string }; formulaNote?: string; total: { exact: string; approx: string | null }
  mistake?: string; slant?: { s: number; h: number; apex: string }
  curved?: { kind: 'cylinder' | 'cone'; r: number; h: number; s?: number }
}

const MISTAKE = 'Common mistake: use the slant height $s = 5$ cm, not the height $h = 4$ cm.'

function finishNetShape(d: Draft): NetShape {
  const s = d.shape.solid
  // Solid face / surface names follow the catalogue, so engine text (step labels, failDetail) matches the page.
  const ix = index(d.shape)
  d.faces.forEach(f => {
    const su = d.shape.surfaces.find(x => x.id === f.id)
    const name = f.id === 'curved' ? 'Curved surface' : f.named ? f.name : 'Face ' + f.name
    if (su) su.name = name
    ;(ix.group[f.id] || [f.id]).forEach(id => { if (ix.face[id] && f.id !== 'curved') ix.face[id].name = name })
  })
  const lo: Vec3 = [Infinity, Infinity, Infinity], hi: Vec3 = [-Infinity, -Infinity, -Infinity]
  s.vertices.forEach(v => { for (let k = 0; k < 3; k++) { lo[k] = Math.min(lo[k], v.p[k]); hi[k] = Math.max(hi[k], v.p[k]) } })
  const nets: NetInfo[] = d.nets.map((nd, k) => {
    const net = nd.net
    const hingeOf: Record<string, string> = {}, foldAngle: Record<string, number> = {}
    net.netEdges.forEach(e => { if (e.kind === 'hinge') hingeOf[e.solidEdge] = e.id })
    net.hinges.forEach(h => { foldAngle[h.edge] = (h.angle * 180) / Math.PI })
    const info: NetInfo = {
      id: net.id, name: nd.name, caption: nd.caption, n: k + 1, net, pairNo: {}, pairCount: 0, walk: [], walkComplete: true,
      hingeOf, foldAngle, foldLines: net.hinges.length, tapedPairs: net.cutPairs, outsideEdges: 2 * net.cutPairs,
    }
    if (nd.family) info.family = nd.family
    if (nd.cells) info.cells = nd.cells
    if (d.curved) {
      const c = d.curved
      info.curved = curvedGeometry(d.shape, net, c.kind, c.r, c.h, c.s || 0)
      info.pairNo = c.kind === 'cylinder' ? { seam: 1, topRim: 2, baseRim: 3 } : { seam: 1, baseRim: 2 }
      info.pairCount = info.tapedPairs = c.kind === 'cylinder' ? 3 : 2
      info.outsideEdges = 2 * info.tapedPairs
      info.foldLines = 0
    } else {
      const np = numberPairs(net)
      net.netEdges.forEach(e => { if (e.kind === 'cut') info.pairNo[e.solidEdge] = np.num[e.pairId] })
      info.pairCount = Object.keys(np.num).length
      info.walk = np.walk
      info.walkComplete = np.complete
    }
    return info
  })
  const parts = d.faces.map(f => f.exact || f.areaText)
  const value = surfaceArea(d.shape)
  const out: NetShape = {
    key: d.key, title: d.title, group: d.group, lower: d.lower, shape: d.shape, size: d.size, faces: d.faces, nets,
    netsTitle: d.key === 'cube' ? '11 nets of a cube' : nets.length > 1 ? nets.length + ' nets of ' + d.lower.replace(/^an? /, 'a ') : 'One common net',
    netGroups: d.key === 'cube'
      ? CUBE_FAMILY_ORDER.map(f => ({ caption: CUBE_FAMILIES[f].label, short: CUBE_FAMILIES[f].short, nets: nets.filter(n => n.family === f).map(n => n.n - 1) }))
      : nets.map((n, i) => ({ caption: n.caption, short: n.name.toLowerCase(), nets: [i] })),
    fact: d.fact, formula: d.formula,
    total: { exact: d.total.exact, approx: d.total.approx, value, text: 'Total = ' + parts.join(' + ') + ' = ' + d.total.exact + (d.total.approx ? ' ≈ ' + d.total.approx : '') + ' cm²' },
    euler: d.curved ? null : { F: s.faces.length, V: s.vertices.length, E: s.edges.length },
    centre: [(lo[0] + hi[0]) / 2, (lo[1] + hi[1]) / 2, (lo[2] + hi[2]) / 2],
    radius: dist(hi, lo) / 2,
  }
  if (d.formulaNote) out.formulaNote = d.formulaNote
  if (d.mistake) out.mistake = d.mistake
  if (d.slant) out.slant = d.slant
  if (d.curved) {
    const c = d.curved, cyl = c.kind === 'cylinder', circ = 2 * Math.PI * c.r
    out.curved = {
      kind: c.kind, r: c.r, h: c.h, circumference: { exact: piText(circ) || fmt2(circ), approx: fmt2(circ), value: circ },
      counts: cyl ? '2 flat faces · 1 curved surface · 2 curved edges · 0 vertices' : '1 flat face · 1 curved surface · 1 curved edge · 1 apex',
      what: c.kind,
      tapedNote: cyl ? 'This net: 3 pairs of taped edges — the seam and the two rims.' : 'This net: 2 pairs of taped edges — the seam and the rim.',
      rims: cyl ? [{ id: 'topRim', name: 'Top rim' }, { id: 'baseRim', name: 'Bottom rim' }] : [{ id: 'baseRim', name: 'Base rim' }],
    }
    if (!cyl && c.s) {
      out.curved.s = c.s
      out.curved.sectorAngle = Math.round((360 * c.r) / c.s * 1e9) / 1e9
      out.curved.sectorFraction = c.r + '⁄' + c.s
    }
  }
  return out
}

/* ── the nine solids, as the mockups built them ── */
function cubeEntry(): Draft {
  const a = 3
  // Every cube net a quarter turn from the library layout, so rows of four stand upright; Net 1 is
  // the upright cross (Back above Base, Front below it, Top hinged to Front).
  const specs: CellNetSpec[] = CUBE_NET_CELLS.map((s, k) => {
    const cells = s.cells.map(c => [c[1], -c[0]] as Vec2)
    return { id: s.id, name: s.name, cells, root: pickRoot(cells), family: s.family, n: k + 1 }
  })
  const shape = build('cube', { a }, specs)
  const F = sqFace(a)
  const rows: [string, string, number][] = [['top', 'Top', BLUE], ['base', 'Base', AMBER], ['front', 'Front', EMERALD], ['back', 'Back', ROSE], ['left', 'Left', VIOLET], ['right', 'Right', ORANGE]]
  return {
    key: 'cube', title: 'Cube', group: 'Prisms', lower: 'a cube', shape, size: 's = 3',
    faces: rows.map(r => row(shape, r[0], r[1], r[2], F)),
    nets: shape.nets.map((net, k) => ({ net, name: specs[k].name, caption: CUBE_FAMILIES[specs[k].family as CubeFamily].label, family: specs[k].family, cells: specs[k].cells })),
    fact: 'There are 11 different nets of a cube. Every one has 5 fold lines and 7 pairs of taped edges.',
    formula: { tex: 'SA = 6s^2 = 6 \\times 3^2 = \\mathbf{54\\ cm^2}', text: 'SA = 6s² = 6 × 3² = 54 cm²' },
    total: { exact: '54', approx: null },
  }
}

function cuboidEntry(): Draft {
  const l = 4, w = 3, h = 2
  const spec: TreeNetSpec = { id: 'cross', name: 'Cross', hinges: [['base', 'back'], ['base', 'front'], ['base', 'left'], ['base', 'right'], ['front', 'top']] }
  const shape = build('cuboid', { l, w, h }, [spec])
  const rows: [string, string, number, FaceBody][] = [['top', 'Top', BLUE, rectFace(l, w)], ['base', 'Base', AMBER, rectFace(l, w)], ['front', 'Front', EMERALD, rectFace(l, h)], ['back', 'Back', ROSE, rectFace(l, h)], ['left', 'Left', VIOLET, rectFace(w, h)], ['right', 'Right', ORANGE, rectFace(w, h)]]
  return {
    key: 'cuboid', title: 'Cuboid', group: 'Prisms', lower: 'a cuboid', shape, size: 'l = 4, w = 3, h = 2',
    faces: rows.map(r => row(shape, r[0], r[1], r[2], r[3])),
    nets: [{ net: shape.nets[0], name: 'Cross', caption: 'Cross' }],
    fact: 'Opposite faces match — Top and Base, Front and Back, Left and Right. That’s why $SA = 2(lw + lh + wh)$.',
    formula: { tex: 'SA = 2(lw + lh + wh) = 2(12 + 8 + 6) = \\mathbf{52\\ cm^2}', text: 'SA = 2(lw + lh + wh) = 2(12 + 8 + 6) = 52 cm²' },
    total: { exact: '52', approx: null },
  }
}

function triPrismEntry(): Draft {
  // Lying along its length (x). Left end ABC: A is the right angle, AB = 4 along the ground (y),
  // AC = 3 upright. It rests on the 4 × 6 rectangle ABED, centred at x = y = 0.
  const V: [string, Vec3][] = [['A', [-3, 2, 0]], ['B', [-3, -2, 0]], ['C', [-3, 2, 3]], ['D', [3, 2, 0]], ['E', [3, -2, 0]], ['F', [3, 2, 3]]]
  const shape = customShape({
    id: 'triangular-prism', name: 'Triangular prism', category: 'prism',
    solid: {
      vertices: V.map(v => ({ id: v[0], p: v[1] })),
      faces: [
        { id: 'base', name: 'Base', verts: ['A', 'B', 'E', 'D'], role: 'base' },
        { id: 'left', name: 'Left', verts: ['A', 'B', 'C'] },
        { id: 'right', name: 'Right', verts: ['D', 'E', 'F'] },
        { id: 'back', name: 'Back', verts: ['A', 'C', 'F', 'D'] },
        { id: 'slope', name: 'Slope', verts: ['B', 'C', 'F', 'E'] },
      ],
    },
    dims: { b: 4, c: 3, l: 6 },
    dimList: [{ key: 'b', name: 'triangle base', value: 4 }, { key: 'c', name: 'triangle height', value: 3 }, { key: 'l', name: 'prism length', value: 6 }],
    formulas: prismFormulas({
      A: 6, P: 12, h: 6, sides: ['base', 'back', 'slope'], ends: ['left', 'right'], endPlural: 'right-angled triangles',
      Aformula: 'A = ½ × b × c', Aworking: '½ × 4 × 3', Pformula: 'P = b + c + hypotenuse', Pworking: '4 + 3 + 5',
    }),
    netSpecs: [{ id: 'strip', name: 'Strip of Three', angle: Math.PI / 2, hinges: [['base', 'back'], ['base', 'slope'], ['base', 'left'], ['base', 'right']] }],
  })
  const tri: FaceBody = { desc: 'Right-angled triangle with legs 4 cm and 3 cm', work: '½ × 4 × 3', area: 6, areaText: '6', shape: 'Right-angled triangle' }
  const rows: [string, string, number, FaceBody][] = [['left', 'Left', BLUE, tri], ['right', 'Right', VIOLET, tri], ['base', 'Base', AMBER, rectFace(4, 6)], ['back', 'Back', ROSE, rectFace(3, 6)], ['slope', 'Slope', EMERALD, rectFace(5, 6)]]
  return {
    key: 'triangular-prism', title: 'Triangular Prism', group: 'Prisms', lower: 'a triangular prism', shape, size: '3-4-5 triangle, length 6',
    faces: rows.map(r => row(shape, r[0], r[1], r[2], r[3])),
    nets: [{ net: shape.nets[0], name: 'Strip of Three', caption: 'Strip of Three Rectangles' }],
    fact: 'Each side of the triangle matches the width of one rectangle: 3, 4 and 5 cm. Side by side, the rectangles make one 12 cm × 6 cm strip — perimeter × length.',
    formula: { tex: 'SA = 2 \\times \\tfrac12 \\times 4 \\times 3 + (3 + 4 + 5) \\times 6 = 12 + 72 = \\mathbf{84\\ cm^2}', text: 'SA = 2 × ½ × 4 × 3 + (3 + 4 + 5) × 6 = 12 + 72 = 84 cm²' },
    formulaNote: 'The three rectangles together = perimeter × length.',
    total: { exact: '84', approx: null },
  }
}

function hexPrismEntry(): Draft {
  // The band of six rectangles is hinged to the base along CDJI (side3); Top hangs off the same rectangle.
  const shape = build('prism', { n: 6, a: 2, h: 5 }, [{
    id: 'band', name: 'Band of Six', angle: 'landscape',
    hinges: [['base', 'side3'], ['side3', 'top'], ['side3', 'side2'], ['side2', 'side1'], ['side3', 'side4'], ['side4', 'side5'], ['side5', 'side6']],
  }])
  const hex: FaceBody = { desc: 'Regular hexagon with side 2 cm — six equilateral triangles', work: '6 × (' + R3 + '⁄4) × 2²', area: 6 * Math.sqrt(3), areaText: '6' + R3 + ' ≈ 10.39', exact: '6' + R3, shape: 'Regular hexagon' }
  const ix = index(shape)
  const faces = [row(shape, 'top', 'Top', BLUE, hex), row(shape, 'base', 'Base', AMBER, hex)]
  const sideCi = [EMERALD, ROSE, VIOLET, ORANGE, TEAL, LIME]
  for (let i = 1; i <= 6; i++) faces.push(row(shape, 'side' + i, ix.face['side' + i].label, sideCi[i - 1], rectFace(2, 5), false))
  return {
    key: 'hexagonal-prism', title: 'Hexagonal Prism', group: 'Prisms', lower: 'a hexagonal prism', shape, size: 'side 2, length 5', faces,
    nets: [{ net: shape.nets[0], name: 'Band of Six', caption: 'Band of Six Rectangles' }],
    fact: 'The six rectangles make one strip as wide as the hexagon’s perimeter, 6 × 2 = 12 cm.',
    formula: { tex: 'SA = 2 \\times 6\\sqrt3 + 6 \\times 2 \\times 5 = 12\\sqrt3 + 60 \\approx \\mathbf{80.78\\ cm^2}', text: 'SA = 2 × 6√3 + 6 × 2 × 5 = 12√3 + 60 ≈ 80.78 cm²' },
    total: { exact: '12√3 + 60', approx: '80.78' },
  }
}

function sqPyramidEntry(): Draft {
  const shape = build('pyramid', { n: 4, a: 6, h: 4 }, [{ id: 'star', name: 'Star', hinges: FRBL.map(x => ['base', x] as [string, string]) }])
  const tri: FaceBody = { desc: 'Triangle with base 6 cm and slant height 5 cm', work: '½ × 6 × 5', area: 15, areaText: '15', shape: 'Triangle' }
  const rows: [string, string, number, FaceBody][] = [['base', 'Base', AMBER, sqFace(6)], ['front', 'Front', EMERALD, tri], ['right', 'Right', ORANGE, tri], ['back', 'Back', ROSE, tri], ['left', 'Left', VIOLET, tri]]
  return {
    key: 'square-pyramid', title: 'Square Pyramid', group: 'Pyramids', lower: 'a square pyramid', shape, size: 'base 6, slant height 5, height 4',
    faces: rows.map(r => row(shape, r[0], r[1], r[2], r[3])),
    nets: [{ net: shape.nets[0], name: 'Star', caption: 'Star' }],
    fact: 'The slant height $s = 5$ cm runs up the middle of a triangle. It isn’t the pyramid’s height $h = 4$ cm.',
    formula: { tex: 'SA = b^2 + 4 \\times \\tfrac12 bs = 36 + 4 \\times 15 = \\mathbf{96\\ cm^2}', text: 'SA = b² + 4 × ½bs = 36 + 4 × 15 = 96 cm²' },
    total: { exact: '96', approx: null }, mistake: MISTAKE, slant: { s: 5, h: 4, apex: 'E' },
  }
}

function tetraEntry(): Draft {
  const shape = build('tetrahedron', { a: 4 }, [
    { id: 'big-triangle', name: 'Big Triangle', hinges: [['base', 'front'], ['base', 'right'], ['base', 'left']] },
    { id: 'strip', name: 'Strip of Four', angle: 'landscape', hinges: [['base', 'front'], ['base', 'right'], ['right', 'left']] },
  ])
  const T = eqTri(4, '4' + R3)
  const ix = index(shape)
  return {
    key: 'tetrahedron', title: 'Tetrahedron', group: 'Pyramids', lower: 'a tetrahedron', shape, size: 'edge 4',
    faces: [row(shape, 'base', 'Base', AMBER, T), row(shape, 'front', ix.face.front.label, EMERALD, T, false), row(shape, 'right', ix.face.right.label, ORANGE, T, false), row(shape, 'left', ix.face.left.label, VIOLET, T, false)],
    nets: [{ net: shape.nets[0], name: 'Big Triangle', caption: 'Big Triangle' }, { net: shape.nets[1], name: 'Strip of Four', caption: 'Strip of Four' }],
    fact: 'A tetrahedron has only 2 different nets. Try both.',
    formula: { tex: 'SA = 4 \\times \\tfrac{\\sqrt3}{4}a^2 = \\sqrt3 \\times 4^2 = 16\\sqrt3 \\approx \\mathbf{27.71\\ cm^2}', text: 'SA = 4 × (√3⁄4)a² = √3 × 4² = 16√3 ≈ 27.71 cm²' },
    total: { exact: '16√3', approx: '27.71' },
  }
}

function octaEntry(): Draft {
  // Equator ABCD, top E, bottom F (edge 3); then turned to rest on face CDF.
  const c = 1.5, hh = 3 / Math.SQRT2
  const raw: Record<string, Vec3> = { A: [-c, -c, 0], B: [c, -c, 0], C: [c, c, 0], D: [-c, c, 0], E: [0, 0, hh], F: [0, 0, -hh] }
  const th = -Math.atan(Math.SQRT2), co = Math.cos(th), si = Math.sin(th)
  const turned: Record<string, Vec3> = {}
  Object.keys(raw).forEach(k => { const p = raw[k]; turned[k] = [p[0], p[1] * co - p[2] * si, p[1] * si + p[2] * co] })
  const bc = mean3(['C', 'D', 'F'].map(k => turned[k]))
  const ids = ['ABE', 'BCE', 'CDE', 'ADE', 'ABF', 'BCF', 'CDF', 'ADF']
  const A1 = (Math.sqrt(3) / 4) * 9
  const shape = customShape({
    id: 'octahedron', name: 'Regular octahedron', category: 'platonic', dims: { a: 3 },
    dimList: [{ key: 'a', name: 'edge length', value: 3 }],
    solid: {
      vertices: Object.keys(turned).map(k => ({ id: k, p: sub(turned[k], bc) })),
      faces: ids.map(l => ({ id: l.toLowerCase(), name: 'Face ' + l, verts: l.split(''), role: l === 'CDF' ? 'base' as FaceRole : 'side' as FaceRole })),
    },
    formulas: {
      surfaceArea: 'SA = 2√3 a²', words: 'Eight identical equilateral triangles (two square-based pyramids glued base to base).',
      parts: [{ id: 'triangles', label: '8 equilateral triangles', faces: ids.map(l => l.toLowerCase()), formula: '8 × (√3 ÷ 4)a²', working: '8 × ' + fmt(A1), value: 8 * A1 }],
      total: 8 * A1,
      volume: { formula: 'V = (√2 ÷ 3)a³', working: '(√2 ÷ 3) × 3³', value: (Math.SQRT2 / 3) * 27 },
      dims: [],
    },
    netSpecs: [{ id: 'band', name: 'Band of Six', root: 'cdf', angle: 'landscape', hinges: [['cdf', 'cde'], ['cde', 'bce'], ['cde', 'ade'], ['bce', 'bcf'], ['bcf', 'abf'], ['bce', 'abe'], ['ade', 'adf']] }],
  })
  const T = eqTri(3, '9' + R3 + '⁄4')
  const cis = [BLUE, EMERALD, ROSE, ORANGE, VIOLET, AMBER, TEAL, LIME]
  return {
    key: 'octahedron', title: 'Octahedron', group: 'Other Polyhedra', lower: 'an octahedron', shape, size: 'edge 3',
    faces: ids.map((l, i) => row(shape, l.toLowerCase(), l, cis[i], T, false)),
    nets: [{ net: shape.nets[0], name: 'Band of Six', caption: 'Band of Six + Two' }],
    fact: 'An octahedron is two square pyramids joined base to base. Like the cube, it has 11 nets.',
    formula: { tex: 'SA = 8 \\times \\tfrac{\\sqrt3}{4}a^2 = 2\\sqrt3 \\times 3^2 = 18\\sqrt3 \\approx \\mathbf{31.18\\ cm^2}', text: 'SA = 8 × (√3⁄4)a² = 2√3 × 3² = 18√3 ≈ 31.18 cm²' },
    total: { exact: '18√3', approx: '31.18' },
  }
}

function cylinderEntry(): Draft {
  const r = 2, h = 5, strips: string[] = []
  for (let i = 0; i < 32; i++) strips.push('c' + i)
  // Turned half a turn from the library layout so the rectangle runs up from the base circle.
  const shape = build('cylinder', { r, h }, [{ id: 'circles-middle', name: 'Rectangle and Two Circles', angle: Math.PI, hinges: stripHinges(strips, 'top') }])
  const circ: FaceBody = { desc: 'Circle with radius 2 cm', work: 'π × 2²', area: 4 * Math.PI, areaText: '4π ≈ 12.57', exact: '4π', shape: 'Circle' }
  const curved: FaceBody = { desc: 'Curved surface', work: '2 × π × 2 × 5', area: 20 * Math.PI, areaText: '20π ≈ 62.83', exact: '20π', shape: 'Rectangle when flat' }
  return {
    key: 'cylinder', title: 'Cylinder', group: 'Curved Solids', lower: 'a cylinder', shape, size: 'r = 2, h = 5',
    faces: [row(shape, 'top', 'Top', BLUE, circ), row(shape, 'base', 'Base', AMBER, circ), row(shape, 'curved', 'Curved Surface', EMERALD, curved, true, { short: 'Curved' })],
    nets: [{ net: shape.nets[0], name: 'Rectangle and Two Circles', caption: 'Rectangle and Two Circles' }],
    fact: 'The rectangle’s width is the circle’s circumference, $2\\pi r$ — it has to wrap exactly once round.',
    formula: { tex: 'SA = 2\\pi r^2 + 2\\pi rh = 8\\pi + 20\\pi = 28\\pi \\approx \\mathbf{87.96\\ cm^2}', text: 'SA = 2πr² + 2πrh = 8π + 20π = 28π ≈ 87.96 cm²' },
    total: { exact: '28π', approx: '87.96' },
    curved: { kind: 'cylinder', r, h },
  }
}

function coneEntry(): Draft {
  const r = 3, h = 4, strips: string[] = []
  for (let i = 0; i < 32; i++) strips.push('c' + i)
  // Turned half a turn from the library layout so the sector sits above its circle (apex at the top).
  const shape = build('cone', { r, h }, [{ id: 'sector', name: 'Sector and Circle', angle: Math.PI, hinges: stripHinges(strips, null) }])
  const circ: FaceBody = { desc: 'Circle with radius 3 cm', work: 'π × 3²', area: 9 * Math.PI, areaText: '9π ≈ 28.27', exact: '9π', shape: 'Circle' }
  const curved: FaceBody = { desc: 'Curved surface', work: 'π × 3 × 5', area: 15 * Math.PI, areaText: '15π ≈ 47.12', exact: '15π', shape: 'Sector when flat' }
  return {
    key: 'cone', title: 'Cone', group: 'Curved Solids', lower: 'a cone', shape, size: 'r = 3, s = 5, h = 4',
    faces: [row(shape, 'base', 'Base', AMBER, circ), row(shape, 'curved', 'Curved Surface', ROSE, curved, true, { short: 'Curved' })],
    nets: [{ net: shape.nets[0], name: 'Sector and Circle', caption: 'Sector and Circle' }],
    fact: 'The sector’s radius is the slant height $s$, and its arc is the base circle’s circumference, $2\\pi r$.',
    formula: { tex: 'SA = \\pi r^2 + \\pi rs = 9\\pi + 15\\pi = 24\\pi \\approx \\mathbf{75.40\\ cm^2}', text: 'SA = πr² + πrs = 9π + 15π = 24π ≈ 75.40 cm²' },
    total: { exact: '24π', approx: '75.40' }, mistake: MISTAKE, slant: { s: 5, h: 4, apex: 'V' },
    curved: { kind: 'cone', r, h, s: 5 },
  }
}

/** The nine shapes of the demo, in the mockups' order. */
export const NET_SHAPES: NetShape[] = [cubeEntry(), cuboidEntry(), triPrismEntry(), hexPrismEntry(), sqPyramidEntry(), tetraEntry(), octaEntry(), cylinderEntry(), coneEntry()].map(finishNetShape)

export function getNetShape(key: string): NetShape | null { return NET_SHAPES.find(s => s.key === key) || null }
/** The FaceInfo of a logical face id. */
export function faceInfo(ns: NetShape, id: string): FaceInfo | null { return ns.faces.find(f => f.id === id) || null }
/** Logical face of a solid face ('curved' for a strip). */
export function logicalFace(ns: NetShape, solidFaceId: string): string { return logicalFaceOf(ns.shape, null, solidFaceId) }
/** FaceInfo for a net face (any strip of a curved surface gives the curved surface). */
export function netFaceInfo(ns: NetShape, net: Net, netFaceId: string): FaceInfo | null { return faceInfo(ns, logicalFaceOf(ns.shape, net, netFaceId)) }

/** What Count Along steps through: faces (table order), vertices or edges (solid order). Polyhedra only. */
export function countList(ns: NetShape, kind: 'face' | 'vertex' | 'edge'): string[] {
  const s = ns.shape.solid
  return kind === 'face' ? ns.faces.map(f => f.id) : kind === 'vertex' ? s.vertices.map(v => v.id) : s.edges.map(e => e.id)
}

/** The faces meeting at a vertex (table order), the angle of each at it (degrees) and their sum. */
export function vertexFacts(ns: NetShape, v: string): { faces: string[]; angles: number[]; sum: number } {
  const ix = index(ns.shape)
  const order = ns.faces.map(f => f.id)
  const faces = ns.shape.solid.faces.filter(f => f.verts.indexOf(v) >= 0).sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id))
  const angles = faces.map(f => {
    const i = f.verts.indexOf(v), n = f.verts.length
    const P = ix.vertex[v].p, A = ix.vertex[f.verts[(i - 1 + n) % n]].p, B = ix.vertex[f.verts[(i + 1) % n]].p
    const u = unit(sub(A, P)), w = unit(sub(B, P))
    return (Math.acos(clamp(dot(u, w), -1, 1)) * 180) / Math.PI
  })
  return { faces: faces.map(f => f.id), angles, sum: angles.reduce((a, b) => a + b, 0) }
}

/** On a polyhedron's net, a face's fold lines (to which face, along which edge) and its taped edges (by number). */
export function faceEdgesOnNet(ns: NetShape, ni: NetInfo, faceId: string): { folds: { face: string; edge: string }[]; taped: { n: number; edge: string }[] } {
  const out = { folds: [] as { face: string; edge: string }[], taped: [] as { n: number; edge: string }[] }
  const sf = index(ns.shape).face[faceId]
  if (!sf) return out
  sf.verts.forEach((_v, i) => {
    const ne = netEdgeAt(ni.net, faceId, i)
    if (!ne) return
    if (ne.kind === 'hinge' && ne.faces) out.folds.push({ face: ne.faces[0] === faceId ? ne.faces[1] : ne.faces[0], edge: ne.solidEdge })
    else out.taped.push({ n: ni.pairNo[ne.solidEdge], edge: ne.solidEdge })
  })
  out.taped.sort((a, b) => a.n - b.n)
  return out
}

/** Number of separate net corners (dots) that a vertex is split across on this net. */
export function cornerCount(ni: NetInfo, v: string): number { return ni.net.netPoints.filter(p => p.vertices.indexOf(v) >= 0).length }

/* ═══════════════════════════════════════ Is It a Net? ═══════════════════════════════════════ */

const CUBE_NON_NET_CELLS: { id: string; name: string; cells: Vec2[]; failReason: string }[] = [
  { id: 'block-2x3', name: '2 × 3 Block', cells: [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]], failReason: 'Four squares meet at the inside corners, but only three faces meet at each corner of a cube.' },
  { id: 'row-of-five', name: 'Row of Five + 1', cells: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [1, 1]], failReason: 'Five squares in a row wrap all the way round, so the first and last squares land on the same face.' },
  { id: 'flaps-same-side', name: 'Both Flaps on One Side', cells: [[0, 0], [1, 0], [2, 0], [3, 0], [0, 1], [3, 1]], failReason: 'Both flaps are on the same side of the row of four, so they fold onto the same face and the opposite face is left open.' },
  { id: 'cross-arm-moved', name: 'Cross with an Arm Moved', cells: [[0, 0], [1, 0], [2, 0], [3, 0], [1, -1], [3, -1]], failReason: 'Moving one arm of the cross puts both arms on the same side of the row of four, so they fold onto the same face.' },
  { id: 'long-flap', name: 'Two-Square Flap', cells: [[0, 1], [1, 1], [2, 1], [3, 1], [0, 0], [0, -1]], failReason: 'The flap is two squares long, so its outer square folds back over a face that is already covered.' },
]

export interface CubePattern {
  id: string
  name: string
  cells: Vec2[]
  isNet: boolean
  family?: CubeFamily
  failReason?: string
}

const CUBE_SHAPE = NET_SHAPES[0].shape

/** Is It a Net?: the 11 cube nets, then the 5 non-nets (show them in random order). */
export const IS_IT_A_NET: CubePattern[] = NET_SHAPES[0].nets.map(n => ({ id: n.id, name: n.name, cells: n.cells as Vec2[], isNet: true, family: n.family }) as CubePattern)
  .concat(CUBE_NON_NET_CELLS.map(c => ({ id: c.id, name: c.name, cells: c.cells, isNet: false, failReason: c.failReason })))

/**
 * Any set of grid squares folded onto the demo's cube (s = 3): "is this a net of a cube?".
 * Returns null if the squares are not all joined edge to edge (or there are none).
 */
export function cubeNet(cells: Vec2[], opts: { id?: string; name?: string; failReason?: string; cube?: Shape } = {}): Net | null {
  const seen: Record<string, 1> = {}, list: Vec2[] = []
  ;(cells || []).forEach(c => { const k = c[0] + ',' + c[1]; if (!seen[k]) { seen[k] = 1; list.push([c[0], c[1]]) } })
  if (!list.length) return null
  const reach: Record<string, 1> = {}, q: Vec2[] = [list[0]]
  reach[list[0][0] + ',' + list[0][1]] = 1
  while (q.length) {
    const c = q.shift() as Vec2
    ;([[1, 0], [-1, 0], [0, 1], [0, -1]] as Vec2[]).forEach(d => {
      const k = (c[0] + d[0]) + ',' + (c[1] + d[1])
      if (seen[k] && !reach[k]) { reach[k] = 1; q.push([c[0] + d[0], c[1] + d[1]]) }
    })
  }
  if (Object.keys(reach).length !== list.length) return null
  return buildCellNet(opts.cube || CUBE_SHAPE, { id: opts.id || 'custom', name: opts.name || 'Your Net', cells: list, failReason: opts.failReason })
}

export interface Challenge {
  pattern: CubePattern
  /** Index into GRID_SYMMETRIES used to turn / flip the pattern. */
  sym: number
  cells: Vec2[]
  /** Folds onto NET_SHAPES[0].shape (the cube). */
  net: Net
  isNet: boolean
  /** Net face -> square number 1…6 (reading order: top row first, left to right). */
  squareNo: Record<string, number>
  /** Net face -> 0 for the first square on a face, 1 for a second copy (nudge copies apart when drawing). */
  dupIndex: Record<string, number>
  /** Net faces whose square lands on a face another square also covers (hatch them: "Overlap"). */
  overlapFaces: string[]
  /** Solid faces covered twice, and the open ones (the gaps). */
  doubled: string[]
  missing: string[]
  /** Square numbers that land on the same face, one list per doubled face. */
  clashes: number[][]
  failReason?: string
  failDetail?: string
}

/** Lay out a pattern (turned / flipped by GRID_SYMMETRIES[sym]) and fold it onto the cube. */
export function makeChallenge(pattern: CubePattern, sym = 0): Challenge {
  const f = GRID_SYMMETRIES[((sym % 8) + 8) % 8]
  const cells = pattern.cells.map(c => f(c[0], c[1]))
  const net = cubeNet(cells, { id: pattern.id, name: pattern.name, failReason: pattern.failReason }) as Net
  const cen: Record<string, Vec2> = {}
  net.order.forEach(nf => { cen[nf] = mean2(net.faces2d[nf]) })
  const ordered = net.order.slice().sort((a, b) => { const dy = cen[b][1] - cen[a][1]; return Math.abs(dy) > 1e-6 ? dy : cen[a][0] - cen[b][0] })
  const squareNo: Record<string, number> = {}
  ordered.forEach((nf, i) => { squareNo[nf] = i + 1 })
  const cnt: Record<string, number> = {}, dupIndex: Record<string, number> = {}
  net.order.forEach(nf => { const s = net.faceMap[nf]; dupIndex[nf] = cnt[s] || 0; cnt[s] = (cnt[s] || 0) + 1 })
  const doubled = net.doubled || [], missing = net.missing || []
  const ch: Challenge = {
    pattern, sym, cells, net, isNet: net.isNet, squareNo, dupIndex,
    overlapFaces: net.order.filter(nf => doubled.indexOf(net.faceMap[nf]) >= 0),
    doubled, missing,
    clashes: doubled.map(sf => net.order.filter(nf => net.faceMap[nf] === sf).map(nf => squareNo[nf]).sort((a, b) => a - b)),
  }
  if (net.failReason) ch.failReason = net.failReason
  if (net.failDetail) ch.failDetail = net.failDetail
  return ch
}

/** The open faces of a non-net as 3D polygons in the frame foldState(cube, ch.net, 1, opts) uses. */
export function gapPolygons(ch: Challenge, opts: FoldOptions = {}): { face: string; pts: Vec3[] }[] {
  return ch.missing.map(face => ({ face, pts: (facePoints(CUBE_SHAPE, face) as Vec3[]).map(p => solidToFoldFrame(ch.net, p, opts)) }))
}

/** The feedback after a Yes / No answer (B's copy): correct?, the message and a tip line. */
export function challengeFeedback(ch: Challenge, saidYes: boolean): { correct: boolean; message: string; tip: string } {
  const correct = saidYes === ch.isNet
  const sq = (g: number[]) => 'squares ' + listText(g.map(String))
  const clause = ch.clashes.length ? sq(ch.clashes[0]) + ' land on the same face' + (ch.clashes.length > 1 ? ', and so do ' + sq(ch.clashes[1]) : '') : ''
  const nOpen = ch.missing.length
  const open = nOpen === 1 ? 'one face is' : nOpen === 2 ? 'two faces are' : nOpen + ' faces are'
  let message: string
  if (correct && ch.isNet) message = 'Correct — it’s a net. All six squares land on different faces of the cube.'
  else if (correct) message = 'Correct — it’s not a net. ' + cap(clause) + ', so ' + open + ' left open.'
  else if (!ch.isNet) message = 'Not quite — ' + clause + ', so ' + open + ' left open. It isn’t a net.'
  else message = 'Not quite — it is a net. Watch: all six squares land on different faces.'
  let tip = ''
  if (!ch.isNet && longestRun(ch.cells) >= 5) tip = 'Tip: with 5 squares in a row, the 1st and 5th always land on the same face.'
  if (ch.isNet) { const fam = CUBE_FAMILIES[ch.pattern.family || familyOf(ch.cells)]; tip = 'This is a ' + fam.label + ' net: ' + fam.tip + '.' }
  return { correct, message, tip }
}
