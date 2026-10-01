// Pyramids & Prisms: the pure model. State in, geometry and numbers out. No DOM and no React, so
// node can import it (scripts/pyramids.test.mjs) and both faces of the demo (the Lesson and
// Explore) share it. Erasable-only TypeScript with explicit .ts imports, like lib/.
//
// World units are abstract: 1 grid square = 1 u², volumes in u³. z is up. The apex (and a prism's
// top) slides along +x by s; the apex foot is F = (s, 0).
import {
  polygonArea,
  prismModel,
  pyramidModel,
  reflexCount,
  regularPolygon,
  rng,
  vec3,
  type Face,
  type PrismModel,
  type PyramidModel,
  type Vec2,
  type Vec3,
} from '../lib/solid3d.ts'

export const DEG = Math.PI / 180

// ------------------------------------------------------------------------------------------------
// State
// ------------------------------------------------------------------------------------------------

export type Shape = 'square' | 'triangle' | 'hexagon' | 'weird' | 'curvy'
export type Outline = 'blob' | 'circle'
export type SolidMode = 'pyramid' | 'prism' | 'both'
export type BothLayout = 'nested' | 'side'
export type StackMode = 'inside' | 'outside'
export type InsetTab = 'slice' | 'graph'

export interface PPState {
  shape: Shape
  /** Curvy bases only. */
  outline: Outline
  /** Weird bases only. */
  seed: number
  solid: SolidMode
  /** Both only: the prism as a dashed ghost around the pyramid, or the two side by side. */
  layout: BothLayout
  /** Height, 1…10. */
  h: number
  /** How far the apex (pyramid) or the top (prism) has slid along x, −6…6. */
  s: number
  /** Slice height, 0…h. */
  z: number
  /** Layer count, 0 (off)…30. */
  layers: number
  layerMode: StackMode
  slant: boolean
  lift: boolean
  tab: InsetTab
}

export const WEIRD_SEED = 9

export const DEFAULTS: Readonly<PPState> = {
  shape: 'square',
  outline: 'blob',
  seed: WEIRD_SEED,
  solid: 'pyramid',
  layout: 'nested',
  h: 6,
  s: 0,
  z: 3,
  layers: 0,
  layerMode: 'inside',
  slant: false,
  lift: false,
  tab: 'slice',
}

export const LIMITS = { hMin: 1, hMax: 10, sMax: 6, layersMax: 30 } as const

/** Is the apex sitting on the slice level (k = 0)? / Is the slice the base (k = 1)? */
export function atApex(z: number, h: number): boolean {
  return z >= h - 1e-9
}
export function atBase(z: number): boolean {
  return z <= 1e-9
}

/** Applies a patch the way the controls do: h and z snap to 0.1, z ≤ h, Lift Off Top and Layers
 *  are mutually exclusive, and the lift switches itself off where there is no top piece. */
export function applyPatch(st: PPState, patch: Partial<PPState>): PPState {
  const next: PPState = { ...st, ...patch }
  if (patch.lift === true) next.layers = 0
  if (patch.layers !== undefined && patch.layers > 0) next.lift = false
  next.h = Math.round(next.h * 10) / 10
  next.z = Math.round(Math.min(next.z, next.h) * 10) / 10
  if (next.lift && (next.solid === 'prism' || atApex(next.z, next.h) || atBase(next.z))) next.lift = false
  return next
}

/** Slide Apex / Shear snaps to 0.1 and to 0 near the middle, so "upright" is easy to hit. */
export function snapShift(v: number): number {
  const r = Math.round(v * 10) / 10
  return Math.abs(r) < 0.15 ? 0 : r
}

// ------------------------------------------------------------------------------------------------
// Camera presets (radians). The engine's yaw 0 looks along −x; the brief's yaw 0 is the Side View
// (x across the screen), so engine yaw = brief yaw − 90°. The orthographic stage uses FIT.
// ------------------------------------------------------------------------------------------------

export interface CamPreset {
  yaw: number
  pitch: number
  zoom?: number
}
export const HOME_CAM: CamPreset = { yaw: -125 * DEG, pitch: 22 * DEG, zoom: 1 }
export const SIDE_CAM: CamPreset = { yaw: -90 * DEG, pitch: 0 }
export const TOP_CAM: CamPreset = { yaw: -90 * DEG, pitch: 89 * DEG }
/** The Lesson's step 3: looking down at 55°, so the slice and the base below it read as areas. */
export const RAISED_CAM: CamPreset = { yaw: -125 * DEG, pitch: 55 * DEG, zoom: 1 }
/** Looking along x: the square pyramid's front face is edge-on, so its slant height shows true. */
export const SLANT_CAM: CamPreset = { yaw: 180 * DEG, pitch: 0, zoom: 1 }
/** World radius that fills the stage's shorter side at zoom 1. With homeFrame() centring the
 *  solid, the default h = 6 square pyramid fills ~59% of the stage height at the home view. */
export const STAGE_FIT = 5.6
/** On the floor, toward the home camera: picks the "front" face for Slant Length. */
export const FRONT: Vec2 = [Math.cos(HOME_CAM.yaw), Math.sin(HOME_CAM.yaw)]
/** The most of the stage's shorter side the solid may fill before homeFrame() zooms out. */
const FRAME_FILL = 0.8

// ------------------------------------------------------------------------------------------------
// Number formatting (the readouts, notice and working line all use these)
// ------------------------------------------------------------------------------------------------

/** Fixed dp with a true minus sign; −0.0 shows as 0.0. */
export function fx(v: number, dp: number): string {
  if (Math.abs(v) < 0.5 * Math.pow(10, -dp)) v = 0
  return v.toFixed(dp).replace('-', '−')
}
export const f1 = (v: number): string => fx(v, 1)
export const f2 = (v: number): string => fx(v, 2)
/** Up to dp places, trailing zeros dropped: 0.2500 → 0.25, 1.0000 → 1. */
export function trimNum(v: number, dp = 4): string {
  let t = fx(v, dp)
  if (t.indexOf('.') >= 0) t = t.replace(/0+$/, '').replace(/\.$/, '')
  return t
}
/** For KaTeX strings: an ASCII minus. */
export function texNum(v: number, dp: number): string {
  return fx(v, dp).replace('−', '-')
}

function gcd(a: number, b: number): number {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b) {
    const t = a % b
    a = b
    b = t
  }
  return a
}
/** k = 1 − z/h as an exact fraction p/q (lowest terms) when q ≤ 12, else null. z and h are on the
 *  0.1 grid. An integer k comes back with q = 1. */
export function kFraction(z: number, h: number): { p: number; q: number } | null {
  const Z = Math.round(z * 10)
  const H = Math.round(h * 10)
  let p = H - Z
  let q = H
  const g = gcd(p, q) || 1
  p /= g
  q /= g
  if (q > 12) return null
  return { p, q }
}
const VULGAR: Record<string, string> = { '1/2': '½', '1/3': '⅓', '2/3': '⅔', '1/4': '¼', '3/4': '¾' }
/** A fraction as text: "½", "3/5", "1". */
export function fracText(fr: { p: number; q: number }): string {
  if (fr.q === 1) return String(fr.p)
  return VULGAR[fr.p + '/' + fr.q] || fr.p + '/' + fr.q
}

// ------------------------------------------------------------------------------------------------
// Bases. All counter-clockwise and star-shaped about the origin O.
// ------------------------------------------------------------------------------------------------

const weirdCache = new Map<number, Vec2[]>()
/** A lumpy, non-convex polygon (9–13 corners, at least 2 dents) from a seed. Star-shaped about O,
 *  so layer stacks built toward the apex stay inside the pyramid. */
export function weirdBase(seed: number): Vec2[] {
  const hit = weirdCache.get(seed)
  if (hit) return hit
  const rand = rng(seed)
  let pts: Vec2[] = []
  for (let attempt = 0; attempt < 200; attempt++) {
    const n = 9 + Math.floor(rand() * 5)
    const step = (2 * Math.PI) / n
    const a0 = rand() * 2 * Math.PI
    const rs: number[] = []
    const th: number[] = []
    for (let i = 0; i < n; i++) {
      rs.push(1.4 + 2.2 * rand())
      th.push(a0 + step * i + (rand() * 2 - 1) * 0.25 * step)
    }
    const lo = rs.filter((r) => r < 2).length
    const hi = rs.filter((r) => r > 3).length
    if (attempt < 199 && (lo < 2 || hi < 2)) continue
    pts = rs.map((r, j): Vec2 => [r * Math.cos(th[j]), r * Math.sin(th[j])])
    if (attempt < 199 && reflexCount(pts) < 2) continue
    break
  }
  weirdCache.set(seed, pts)
  return pts
}

export const CIRCLE_R = 2.5
/** 72-point curvy outline: a lumpy blob, or a circle of radius 2.5. */
export function curvyBase(circle: boolean): Vec2[] {
  const pts: Vec2[] = []
  for (let i = 0; i < 72; i++) {
    const t = (2 * Math.PI * i) / 72
    const r = circle ? CIRCLE_R : 2.4 + 0.45 * Math.cos(2 * t + 0.6) + 0.3 * Math.sin(3 * t) + 0.15 * Math.cos(5 * t - 1)
    pts.push([r * Math.cos(t), r * Math.sin(t)])
  }
  return pts
}

export function baseShape(shape: Shape, outline: Outline, seed: number): Vec2[] {
  switch (shape) {
    case 'square':
      return [[-2, -2], [2, -2], [2, 2], [-2, 2]]
    case 'triangle':
      return [[-3, -2], [3, -1], [0, 3]]
    case 'hexagon':
      return regularPolygon(6, 2.5, { rotation: 0 })
    case 'weird':
      return weirdBase(seed)
    default:
      return curvyBase(outline === 'circle')
  }
}

export function pointInPoly(p: readonly number[], poly: readonly Vec2[]): boolean {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const a = poly[i]
    const b = poly[j]
    if ((a[1] > p[1]) !== (b[1] > p[1]) && p[0] < ((b[0] - a[0]) * (p[1] - a[1])) / (b[1] - a[1]) + a[0]) inside = !inside
  }
  return inside
}

function shiftX(pts: readonly Vec2[], dx: number): Vec2[] {
  return pts.map((p): Vec2 => [p[0] + dx, p[1]])
}

// ------------------------------------------------------------------------------------------------
// The maths
// ------------------------------------------------------------------------------------------------

/** k = 1 − z/h: the slice is the base scaled by k toward the apex. */
export function sliceScale(z: number, h: number): number {
  return Math.max(0, 1 - z / h)
}
/** A pyramid's slice area at height z: A k². */
export function pyramidSliceArea(A: number, z: number, h: number): number {
  const k = sliceScale(z, h)
  return A * k * k
}
export function pyramidVolume(A: number, h: number): number {
  return (A * h) / 3
}
export function prismVolume(A: number, h: number): number {
  return A * h
}
/** n stepped layers of a pyramid. Inside: each layer uses the slice at its top, so the steps sit
 *  inside the pyramid, Ah(n−1)(2n−1)/(6n²). Outside: the slice at its bottom,
 *  Ah(n+1)(2n+1)/(6n²). Both → ⅓Ah as n → ∞. */
export function stackVolume(A: number, h: number, n: number, mode: StackMode): number {
  if (n <= 0) return 0
  return mode === 'inside' ? (A * h * (n - 1) * (2 * n - 1)) / (6 * n * n) : (A * h * (n + 1) * (2 * n + 1)) / (6 * n * n)
}
/** The same stack as a sum of slabs: (h/n) × A k_j², with k_j = 1 − j/n. */
export function stackVolumeBySlabs(A: number, h: number, n: number, mode: StackMode): number {
  let v = 0
  for (let j = 0; j < n; j++) {
    const k = mode === 'inside' ? 1 - (j + 1) / n : 1 - j / n
    v += (h / n) * A * k * k
  }
  return v
}
/** Lift Off Top at scale k: the top piece is a mini pyramid, k³ of the volume. */
export function frustumSplit(V: number, k: number): { top: number; bottom: number } {
  const top = k * k * k * V
  return { top, bottom: V - top }
}

export interface SlantInfo {
  /** 'face': a polygon base, the true slant height of the front face (apex ⟂ to the front base
   *  edge's line). 'point': a curvy base, apex to the front-most point of the outline. */
  kind: 'face' | 'point'
  /** Where the slant line meets the floor (unshifted world x, y). */
  foot: Vec2
  /** Apex to foot. */
  length: number
  /** The front base edge ('face' only). */
  edge: [Vec2, Vec2] | null
  /** Is the foot on the edge itself (false when the apex has slid past an end of it)? */
  onEdge: boolean
}
/** Slant Length: for a polygon base, the front face's slant height, the perpendicular distance
 *  from the apex (F, h) to the line of the base edge facing `front`; the same at any lean. For a
 *  curvy base, the "slant length" from the apex to the outline's front-most point. */
export function slantInfo(base: readonly Vec2[], F: Vec2, h: number, curvy: boolean, front: Vec2 = FRONT): SlantInfo {
  if (curvy) {
    let best = -Infinity
    let M: Vec2 = base[0]
    for (const p of base) {
      const d = p[0] * front[0] + p[1] * front[1]
      if (d > best) {
        best = d
        M = p
      }
    }
    return { kind: 'point', foot: [M[0], M[1]], length: Math.hypot(F[0] - M[0], F[1] - M[1], h), edge: null, onEdge: true }
  }
  let best = -Infinity
  let ia = 0
  for (let i = 0; i < base.length; i++) {
    const a = base[i]
    const b = base[(i + 1) % base.length]
    const nx = b[1] - a[1]
    const ny = -(b[0] - a[0])
    const dn = (nx * front[0] + ny * front[1]) / Math.hypot(nx, ny)
    if (dn > best) {
      best = dn
      ia = i
    }
  }
  const a = base[ia]
  const b = base[(ia + 1) % base.length]
  const ex = b[0] - a[0]
  const ey = b[1] - a[1]
  const L2 = ex * ex + ey * ey
  const t = ((F[0] - a[0]) * ex + (F[1] - a[1]) * ey) / L2
  const foot: Vec2 = [a[0] + t * ex, a[1] + t * ey]
  const d = Math.hypot(F[0] - foot[0], F[1] - foot[1])
  return { kind: 'face', foot, length: Math.hypot(d, h), edge: [a, b], onEdge: t >= -1e-9 && t <= 1 + 1e-9 }
}

// ------------------------------------------------------------------------------------------------
// 3D pieces the stage draws
// ------------------------------------------------------------------------------------------------

export interface FrustumModel {
  kind: 'frustum'
  faces: Face<'base' | 'top' | 'side'>[]
  edges: { id: string; a: Vec3; b: Vec3; kind: 'base' | 'top' | 'lateral'; faces: string[]; smooth: boolean }[]
  vertices: { id: string; p: Vec3 }[]
}
function mkFace<K extends string>(id: string, pts: Vec3[], kind: K): Face<K> {
  return { id, pts, normal: vec3.normal(pts), centroid: vec3.centroid(pts), kind }
}
/** The bottom piece once the top is lifted off: the base at z = 0, the slice as its top face. */
export function frustumModel(b2: readonly Vec2[], t2: readonly Vec2[], zt: number, smooth: boolean): FrustumModel {
  const n = b2.length
  const B = b2.map((p): Vec3 => [p[0], p[1], 0])
  const T = t2.map((p): Vec3 => [p[0], p[1], zt])
  const faces: Face<'base' | 'top' | 'side'>[] = [mkFace('base', B.slice().reverse(), 'base'), mkFace('top', T.slice(), 'top')]
  const edges: FrustumModel['edges'] = []
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n
    faces.push(mkFace('s' + i, [B[i], B[j], T[j], T[i]], 'side'))
    edges.push({ id: 'b' + i, a: B[i], b: B[j], kind: 'base', faces: ['base', 's' + i], smooth: false })
    edges.push({ id: 't' + i, a: T[i], b: T[j], kind: 'top', faces: ['top', 's' + i], smooth: false })
  }
  for (let i = 0; i < n; i++) {
    edges.push({ id: 'l' + i, a: B[i], b: T[i], kind: 'lateral', faces: ['s' + ((i + n - 1) % n), 's' + i], smooth })
  }
  return { kind: 'frustum', faces, edges, vertices: [] }
}

/** n slabs. Each is a mini prism whose side edges are parallel to O→apex, so the stack leans with
 *  the apex and (the base being star-shaped about O) inside layers stay inside the pyramid. In
 *  prism mode every slab is the full base. Curvy bases use every other point (36). */
export function layerModels(
  base: readonly Vec2[],
  n: number,
  mode: StackMode,
  s: number,
  h: number,
  dx: number,
  prismMode: boolean,
  curvy: boolean,
): PrismModel[] {
  const b = curvy ? base.filter((_, i) => i % 2 === 0) : base
  const D = h / n
  const out: PrismModel[] = []
  for (let j = 0; j < n; j++) {
    const z0 = j * D
    const kk = prismMode ? 1 : mode === 'inside' ? 1 - (j + 1) / n : 1 - j / n
    if (kk <= 1e-9) continue
    const off = (s * z0) / h + dx
    const poly = b.map((p): Vec2 => [kk * p[0] + off, kk * p[1]])
    out.push(prismModel(poly, D, [(s * D) / h, 0], { z0, idPrefix: 'L' + j + ':', smooth: curvy }))
  }
  return out
}

// ------------------------------------------------------------------------------------------------
// Everything the picture and the numbers need, from the state
// ------------------------------------------------------------------------------------------------

/** How far Lift Off Top raises the top piece. */
export const LIFT_HEIGHT = 1.5

export interface PPGeometry {
  curvy: boolean
  circle: boolean
  base: Vec2[]
  /** Base area (exact). */
  A: number
  /** Base area to 2 dp. */
  A2: number
  /** The area volumes use: A to 2 dp (so the Working line checks by hand), or πr² for a circle. */
  Av: number
  h: number
  s: number
  /** z, clamped to h. */
  z: number
  /** 1 − z/h. */
  k: number
  /** Both, Side by Side. */
  side: boolean
  /** x offsets of the pyramid and prism in Side by Side (0 otherwise). */
  dxP: number
  dxQ: number
  showPyr: boolean
  showPri: boolean
  Vpyr: number
  Vpri: number
  /** The pyramid's slice area, Av k². */
  sliceA: number
  /** Ground grid half-width. */
  gridSize: number
  atApex: boolean
  atBase: boolean
  /** z is (about) h / 2. */
  half: boolean
  /** The apex foot F = (s, 0) is outside the base. */
  fOutside: boolean
  n: number
  liftAllowed: boolean
  /** Lift Off Top is on (and allowed). */
  lifted: boolean
  /** 0…1 progress of the lift animation. */
  liftT: number
  /** How high the top piece is drawn: LIFT_HEIGHT × liftT. */
  liftOff: number
  pyr: PyramidModel | null
  pri: PrismModel | null
  /** The pyramid's slice (unshifted), or null at the apex. */
  slice2D: Vec2[] | null
  /** The prism's slice (unshifted): the base slid by s z / h. */
  priSlice2D: Vec2[]
  /** While the top is (being) lifted: the bottom piece and the top piece. */
  frustum: FrustumModel | null
  top: PyramidModel | null
  topV: number
  frustumV: number
  layerModels: PrismModel[] | null
  stackV: number
  /** stackV / Vpyr. */
  stackRatio: number
  /** Slant Length for the pyramid (unshifted). */
  slant: SlantInfo
  /** The prism's front corner (shifted) and its slanted side edge length √(h² + s²). */
  edgeV: Vec3
  edgeL: number
}

export function computeGeometry(st: PPState, liftT: number = st.lift ? 1 : 0): PPGeometry {
  const curvy = st.shape === 'curvy'
  const circle = curvy && st.outline === 'circle'
  const base = baseShape(st.shape, st.outline, st.seed)
  const A = circle ? Math.PI * CIRCLE_R * CIRCLE_R : polygonArea(base)
  const A2 = Math.round(A * 100) / 100
  const Av = circle ? A : A2
  const h = st.h
  const s = st.s
  const z = Math.min(st.z, h)
  const k = sliceScale(z, h)
  let Rmax = 0
  for (const p of base) Rmax = Math.max(Rmax, Math.hypot(p[0], p[1]))
  const side = st.solid === 'both' && st.layout === 'side'
  const dxP = side ? -(Rmax + 1.5) : 0
  const dxQ = side ? Rmax + 1.5 : 0
  const showPyr = st.solid !== 'prism'
  const showPri = st.solid !== 'pyramid'
  const Vpyr = pyramidVolume(Av, h)
  const Vpri = prismVolume(Av, h)
  const apexAt = atApex(z, h)
  const baseAt = atBase(z)
  const liftAllowed = showPyr && !apexAt && !baseAt
  const lifted = st.lift && liftAllowed

  const slice2D = k > 1e-9 ? base.map((p): Vec2 => [s + k * (p[0] - s), k * p[1]]) : null
  const priSlice2D = base.map((p): Vec2 => [p[0] + (s * z) / h, p[1]])

  const liftOff = LIFT_HEIGHT * liftT
  let frustum: FrustumModel | null = null
  let top: PyramidModel | null = null
  if (showPyr && liftT > 0 && slice2D && !baseAt) {
    const sl = shiftX(slice2D, dxP)
    frustum = frustumModel(shiftX(base, dxP), sl, z, curvy)
    top = pyramidModel(sl, [s + dxP, 0, h + liftOff], { z0: z + liftOff, smooth: curvy })
  }
  const split = frustumSplit(Vpyr, k)

  const n = st.layers
  let layers: PrismModel[] | null = null
  let stackV = 0
  if (n > 0) {
    const prismMode = st.solid === 'prism'
    layers = layerModels(base, n, st.layerMode, s, h, prismMode ? dxQ : dxP, prismMode, curvy)
    stackV = prismMode ? Vpri : stackVolume(Av, h, n, st.layerMode)
  }

  // The prism's front corner, for its slanted side edge
  let fv = base[0]
  let bestV = -Infinity
  for (const p of base) {
    const d = p[0] * FRONT[0] + p[1] * FRONT[1]
    if (d > bestV) {
      bestV = d
      fv = p
    }
  }

  return {
    curvy,
    circle,
    base,
    A,
    A2,
    Av,
    h,
    s,
    z,
    k,
    side,
    dxP,
    dxQ,
    showPyr,
    showPri,
    Vpyr,
    Vpri,
    sliceA: Av * k * k,
    gridSize: side ? 10 : 8,
    atApex: apexAt,
    atBase: baseAt,
    half: Math.abs(z - h / 2) < 0.05,
    fOutside: !pointInPoly([s, 0], base),
    n,
    liftAllowed,
    lifted,
    liftT,
    liftOff,
    pyr: showPyr ? pyramidModel(shiftX(base, dxP), [s + dxP, 0, h], { smooth: curvy }) : null,
    pri: showPri ? prismModel(shiftX(base, dxQ), h, [s, 0], { smooth: curvy }) : null,
    slice2D,
    priSlice2D,
    frustum,
    top,
    topV: split.top,
    frustumV: split.bottom,
    layerModels: layers,
    stackV,
    stackRatio: n > 0 ? stackV / Vpyr : 0,
    slant: slantInfo(base, [s, 0], h, curvy),
    edgeV: [fv[0] + dxQ, fv[1], 0],
    edgeL: Math.hypot(h, s),
  }
}

/** The camera target and zoom that frame these points for a camera preset: the target centres
 *  them on the stage (it stays on the vertical through their middle, so turning the view keeps
 *  them centred) and the zoom stays at the preset's zoom (1) unless they would overfill the stage,
 *  when it zooms out just enough. Good for pitches up to ~60°. */
export function frameFor(pts: readonly (readonly number[])[], cam: CamPreset = HOME_CAM): { target: Vec3; zoom: number } {
  const cp = Math.cos(cam.pitch)
  const sp = Math.sin(cam.pitch)
  const E: Vec2 = [Math.cos(cam.yaw), Math.sin(cam.yaw)] // toward the camera, on the floor
  const R: Vec2 = [-Math.sin(cam.yaw), Math.cos(cam.yaw)] // screen right, on the floor
  let u0 = Infinity, u1 = -Infinity, r0 = Infinity, r1 = -Infinity
  for (const p of pts) {
    const u = (p[2] ?? 0) * cp - (p[0] * E[0] + p[1] * E[1]) * sp // screen up
    const r = p[0] * R[0] + p[1] * R[1]
    u0 = Math.min(u0, u); u1 = Math.max(u1, u)
    r0 = Math.min(r0, r); r1 = Math.max(r1, r)
  }
  const uc = (u0 + u1) / 2
  const rc = (r0 + r1) / 2
  const room = FRAME_FILL * 2 * STAGE_FIT
  const zoom = Math.min(cam.zoom ?? 1, room / (u1 - u0), room / (r1 - r0))
  // Moving the target along R shifts the picture sideways only; raising it shifts it up only.
  return { target: [rc * R[0], rc * R[1], uc / cp], zoom: Math.round(zoom * 1000) / 1000 }
}

/** The home camera's target and zoom for this geometry: frameFor() the solid (with its top piece
 *  fully lifted when Lift Off Top is on). Sliding h or the apex keeps everything on the stage. */
export function homeFrame(g: PPGeometry, lifted: boolean = g.lifted, cam: CamPreset = HOME_CAM): { target: Vec3; zoom: number } {
  const pts: (readonly number[])[] = []
  if (g.pyr) {
    pts.push(...g.pyr.base3D, g.pyr.apex)
    if (lifted) pts.push([g.pyr.apex[0], g.pyr.apex[1], g.h + LIFT_HEIGHT])
  }
  if (g.pri) pts.push(...g.pri.base3D, ...g.pri.top3D)
  return frameFor(pts, cam)
}

// ------------------------------------------------------------------------------------------------
// Lesson step 5: a triangular prism cut into three triangular pyramids of equal volume
// ------------------------------------------------------------------------------------------------

export type PrismCorner = 'A' | 'B' | 'C' | 'D' | 'E' | 'F'
/** The step 5 prism: the triangle base (area 13.5) at z = 0 and its copy at z = 6. */
export const TRI_PRISM: Readonly<Record<PrismCorner, Vec3>> = {
  A: [-3, -2, 0],
  B: [3, -1, 0],
  C: [0, 3, 0],
  D: [-3, -2, 6],
  E: [3, -1, 6],
  F: [0, 3, 6],
}
export const TRI_PRISM_VOLUME = 13.5 * 6

/** Step 5's camera. The pieces' pull-apart directions are picked for it. */
export const STEP5_CAM: CamPreset = { yaw: -40 * DEG, pitch: 24 * DEG, zoom: 1 }

export interface DissectionPiece {
  n: 1 | 2 | 3
  /** Its four corners, e.g. 'ABCF'. */
  corners: string
  /** Where it moves when fully pulled apart. */
  push: Vec3
  centroid: Vec3
  /** The four faces, each with its corner indices (counter-clockwise from outside) and a key,
   *  the face's corner letters sorted ('ABC'). */
  faces: { key: string; idx: number[] }[]
}

/** |det(b − a, c − a, d − a)| / 6 */
export function tetraVolume(a: readonly number[], b: readonly number[], c: readonly number[], d: readonly number[]): number {
  const u = vec3.sub(b, a)
  const v = vec3.sub(c, a)
  const w = vec3.sub(d, a)
  return Math.abs(vec3.dot(u, vec3.cross(v, w))) / 6
}

export function cornersOf(piece: Pick<DissectionPiece, 'corners'>): Vec3[] {
  return piece.corners.split('').map((L) => TRI_PRISM[L as PrismCorner])
}

/** Two flat cuts, through A, B, F and through A, E, F: 1 = ABCF, 2 = ABEF, 3 = ADEF. */
export const PIECES: readonly DissectionPiece[] = (() => {
  // Pulled apart, piece 1 slides right along the floor, 2 comes toward the viewer and 3 lifts up
  // and to the left, so from STEP5_CAM no piece hides another and none sinks below the floor.
  const cy = Math.cos(STEP5_CAM.yaw)
  const sy = Math.sin(STEP5_CAM.yaw)
  const right: Vec3 = [-sy, cy, 0]
  const toward: Vec3 = [cy, sy, 0]
  const defs: [1 | 2 | 3, string, Vec3][] = [
    [1, 'ABCF', vec3.scale(right, 3.3)],
    [2, 'ABEF', vec3.add(vec3.scale(toward, 2.4), vec3.scale(right, -0.6))],
    [3, 'ADEF', vec3.add(vec3.scale(right, -2.4), [0, 0, 1])],
  ]
  const tris = [[0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3]]
  return defs.map(([n, corners, push]) => {
    const P = cornersOf({ corners })
    const faces = tris.map((f) => {
      const other = [0, 1, 2, 3].find((q) => !f.includes(q)) as number
      const idx = f.slice()
      const pts = idx.map((q) => P[q])
      if (vec3.dot(vec3.normal(pts), vec3.sub(P[other], vec3.centroid(pts))) > 0) idx.reverse()
      return { key: idx.map((q) => corners[q]).sort().join(''), idx }
    })
    return { n, corners, push, centroid: vec3.centroid(P), faces }
  })
})()

/** Why Equal? pairs: the pieces compared and the face of each that matters (equal bases). */
export const PAIRS: Readonly<Record<1 | 2, { pieces: [number, number]; faces: Record<number, string> }>> = {
  1: { pieces: [1, 3], faces: { 1: 'ABC', 3: 'DEF' } },
  2: { pieces: [2, 3], faces: { 2: 'ABE', 3: 'ADE' } },
}

/** Pull Apart 0…100 → 0…1, eased so the pieces start and stop gently. */
export function pullT(pull: number): number {
  const t = Math.max(0, Math.min(1, pull / 100))
  return t * t * (3 - 2 * t)
}

// ------------------------------------------------------------------------------------------------
// Names
// ------------------------------------------------------------------------------------------------

export interface SolidWords {
  /** pyramid / cone */
  P: string
  /** prism / cylinder */
  Q: string
  Pc: string
  Qc: string
}
export function solidWords(curvy: boolean): SolidWords {
  return curvy ? { P: 'cone', Q: 'cylinder', Pc: 'Cone', Qc: 'Cylinder' } : { P: 'pyramid', Q: 'prism', Pc: 'Pyramid', Qc: 'Prism' }
}

const ADJ: Record<'square' | 'triangle' | 'hexagon', string> = { square: 'Square-Based', triangle: 'Triangular', hexagon: 'Hexagonal' }

/** The stage chip's name, e.g. "Right Square-Based Pyramid", "Oblique Cone on a Curvy Base". */
export function solidName(st: Pick<PPState, 'shape' | 'outline' | 'solid' | 's'>): string {
  const curvy = st.shape === 'curvy'
  const circle = curvy && st.outline === 'circle'
  const obl = st.s !== 0
  const RO = obl ? 'Oblique' : 'Right'
  const O = obl ? 'Oblique ' : ''
  if (st.solid === 'both') {
    if (circle) return RO + ' Circular Cone and Cylinder'
    if (curvy) return O + 'Cone and Cylinder'
    if (st.shape === 'weird') return O + 'Pyramid and Prism on an Irregular Base'
    return O + ADJ[st.shape as keyof typeof ADJ] + ' Pyramid and Prism'
  }
  const pyr = st.solid === 'pyramid'
  if (circle) return RO + ' Circular ' + (pyr ? 'Cone' : 'Cylinder')
  if (curvy) return O + (pyr ? 'Cone' : 'Cylinder') + ' on a Curvy Base'
  if (st.shape === 'weird') return O + (pyr ? 'Pyramid' : 'Prism') + ' on an Irregular Base'
  const adj = st.shape === 'square' && !pyr ? 'Square' : ADJ[st.shape as keyof typeof ADJ]
  return RO + ' ' + adj + ' ' + (pyr ? 'Pyramid' : 'Prism')
}
