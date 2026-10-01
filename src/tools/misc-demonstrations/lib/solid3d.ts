/*
 * solid3d.ts: a tiny, dependency-free 3D-in-SVG engine for the Misc Demonstrations.
 *
 * Port of scratch/misc-demos/shared/solid3d.js (the engine every mockup was built and reviewed
 * against), as an ES module with types. Erasable-only TypeScript (no enums, namespaces or parameter
 * properties), so node 24 can import it directly for the unit tests in scripts/solid3d.test.mjs.
 * Nothing touches the DOM at module top level: only createStage() needs a browser.
 *
 * World coordinates are z-up: the ground is z = 0 and "height" is z. The grid squares are 1 unit.
 *
 *   const stage = createStage(el, { fit: 5, camera: { target: [0, 0, 2] } })
 *   const pyr = pyramidModel(randomBlob(7), [0, 0, 6])
 *   stage.render(() => [
 *     groundGrid({ size: 6 }),
 *     modelItems(pyr, { idPrefix: 'pyr:', face: { className: 'pyr-face' }, edge: { className: 'pyr-edge' } }),
 *   ])
 *   const off = stage.on('pick', (e) => console.log(e.id, e.data))
 *   // later: off(); stage.destroy()
 *
 * What the engine does each frame
 *   1. Projects every item with the camera (perspective or orthographic).
 *   2. Sorts polygons with the painter's algorithm: by layer, then back faces before unoriented
 *      faces before front faces (faces with an outward `normal`), then by centroid depth. For a
 *      closed convex-ish solid that is exact, and it keeps translucent faces looking right.
 *   3. Draws segments after the polygons of their layer, splitting each one into visible and hidden
 *      runs: points along it are tested against the projected "occluder" polygons (point-in-polygon
 *      on screen + which side of the face's plane the point is on), and the boundaries are refined
 *      by bisection. Hidden runs are drawn dashed, so the back edges of a solid show dashed through
 *      translucent faces, even on non-convex bases.
 *   4. Reuses SVG nodes between frames (by position in draw order) and only writes attributes that
 *      changed. Non-pickable lines with the same look share one <path>, and so do runs of
 *      non-pickable polygons with the same look that sit next to each other in the draw order.
 *
 * Styling
 *   Every drawn element gets an engine class (s3d-poly, s3d-front / s3d-back, s3d-line, s3d-hid,
 *   s3d-pt, s3d-hid-pt, s3d-label, s3d-hid-label, s3d-grid-line, s3d-grid-axis) plus the item's own
 *   `className`; item props (fill, stroke, …) are written as inline styles. Polygons get NO default
 *   fill, fill-opacity or colour from the engine: give each one a `fill` (prop or class). Lines,
 *   points and labels have zero-specificity defaults (`:where(...)`) that read the CSS variables
 *   --s3d-ink, --s3d-halo, --s3d-grid, --s3d-grid-axis, --s3d-shade and --s3d-focus (switched
 *   under `.dark`), so any page class wins without !important. The engine injects one <style>
 *   (id "s3d-style-2") whose selectors are all scoped to the stage's own `.s3d-svg` class.
 *
 * Changes from the mockup engine (0.1.0)
 *   - Drag speed is per axis in degrees per px: rotateSpeedX (0.5) and rotateSpeedY (0.4).
 *   - Arrow keys: ←/→ keyYawStep (15°), ↑/↓ keyPitchStep (5°), Shift × keyShiftMultiplier (3);
 *     + / − zoom by zoomStep (10%). zoomIn() / zoomOut() / zoomBy() for on-screen buttons.
 *   - wheelZoom defaults to 'ctrl': a plain wheel scrolls the page (and emits 'wheelIgnored');
 *     Ctrl/⌘ + wheel (and trackpad pinch, which browsers report as ctrl + wheel) zooms.
 *   - No default polygon fill / fill-opacity (the old `.s3d-poly { fill-opacity: .35 }` is gone).
 *   - setCamera() without animate only takes the fields it sets away from a running tween; the
 *     rest of the tween carries on. cancelTween() stops it outright. A new animated setCamera()
 *     keeps heading for the old tween's destination on the fields it doesn't set.
 *   - Tween easing is configurable (stage option `easing`, or per call).
 *   - Click vs drag threshold is configurable (dragThreshold: 6 px mouse/pen, 10 px touch).
 *   - camera.pan: a screen-space offset of the picture, as fractions of the stage width / height.
 *   - `decorative: true` for thumbnails: aria-hidden, not focusable, no input, page scrolls over it.
 */

export const version = '0.2.0'

const SVGNS = 'http://www.w3.org/2000/svg'
const TAU = Math.PI * 2
const DEG = Math.PI / 180

// =================================================================================================
// Types
// =================================================================================================

export type Vec2 = [number, number]
export type Vec3 = [number, number, number]
/** Any [x, y] or [x, y, z] point (a missing z counts as 0 where noted). */
export type PointLike = readonly number[]

export type Projection = 'perspective' | 'orthographic'

/** The full camera state. Angles are radians. */
export interface Camera {
  /** Turn about the vertical (z) axis. */
  yaw: number
  /** Angle above the horizon (clamped to the stage's pitchRange). */
  pitch: number
  /** Magnification (clamped to minZoom…maxZoom); 1 = a world radius of `fit` fills the shorter side. */
  zoom: number
  /** World point the camera looks at (drawn at the stage centre, plus `pan`). */
  target: Vec3
  projection: Projection
  /** Perspective eye distance in multiples of `fit` (min 1.2). */
  distance: number
  /** Screen-space offset of the picture as fractions of the stage [width, height] (x right, y
   *  down): [0, 0.1] draws everything 10% of the stage height lower. Default [0, 0]. */
  pan: Vec2
}

/** What setCamera / createStage({ camera }) accept: any subset; target may be [x, y] (z = 0). */
export interface CameraInput {
  yaw?: number
  pitch?: number
  zoom?: number
  target?: PointLike
  projection?: Projection
  distance?: number
  pan?: PointLike
}

export type CameraField = keyof Camera
export const CAMERA_FIELDS: readonly CameraField[] = ['yaw', 'pitch', 'zoom', 'target', 'projection', 'distance', 'pan']

export type EasingFn = (t: number) => number
export type EasingName = 'linear' | 'easeInOut' | 'easeOut' | 'easeInOutCubic'

export type WheelZoomMode = boolean | 'ctrl'
export type DoubleTapReset = boolean | 'background'
export type PointerKind = 'mouse' | 'touch' | 'pen'

/** Options for createStage(). Everything is optional. */
export interface StageOptions {
  /** height / width; height = clamp(width × aspect, minHeight, maxHeight). Default 0.72. */
  aspect?: number
  /** Default 240. */
  minHeight?: number
  /** Default 620. */
  maxHeight?: number
  /** Fixed px height (overrides aspect). */
  height?: number
  /** World radius (about the target) that fills the shorter side at zoom 1. Default 5. */
  fit?: number
  /** The home camera (resetCamera goes back to it). Defaults: yaw −0.85, pitch 0.42, zoom 1,
   *  target [0,0,0], projection 'perspective', distance 4, pan [0, 0]. */
  camera?: CameraInput
  /** Default 0.5. */
  minZoom?: number
  /** Default 4. */
  maxZoom?: number
  /** [min, max] pitch in radians. Default [−0.6, 1.5]. */
  pitchRange?: readonly [number, number]
  /** Degrees of yaw per horizontally dragged px. Default 0.5. */
  rotateSpeedX?: number
  /** Degrees of pitch per vertically dragged px. Default 0.4. */
  rotateSpeedY?: number
  /** Degrees per ← / → press. Default 15. */
  keyYawStep?: number
  /** Degrees per ↑ / ↓ press. Default 5. */
  keyPitchStep?: number
  /** Shift + arrow multiplies the step by this. Default 3. */
  keyShiftMultiplier?: number
  /** Fractional zoom per + / − key press or zoomIn()/zoomOut(): 0.1 = 10%. Default 0.1. */
  zoomStep?: number
  /** Degrees per second of slow turning; stops for good on the first interaction; off under
   *  prefers-reduced-motion. Default 0. */
  autoRotate?: number
  /** true: wheel zooms; false: never; 'ctrl' (default): only with Ctrl/⌘ held, so a plain wheel
   *  scrolls the page. The wheel event is only preventDefault-ed when it zooms. */
  wheelZoom?: WheelZoomMode
  /** Zoom factor per wheel px: zoom × e^(−deltaY × speed). Default 0.0015. */
  wheelZoomSpeed?: number
  /** Double-click / double-tap resets the camera: true (default) | false | 'background' (only
   *  when not on a pickable item). */
  doubleTapReset?: DoubleTapReset
  /** Arrow keys rotate, + / − zoom, 0 or Home resets (while the svg has focus). Default true. */
  keyboard?: boolean
  /** Movement (px) before a press becomes a drag instead of a click/tap. A number sets mouse and
   *  pen; default { mouse: 6, touch: 10, pen: 6 }. */
  dragThreshold?: number | { mouse?: number; touch?: number; pen?: number }
  /** Default tween length in ms for animate: true and resetCamera(). Default 350. */
  animateMs?: number
  /** Default tween easing. Default 'easeInOut' (quadratic). */
  easing?: EasingName | EasingFn
  /** aria-label for the svg (a default describing the controls is generated). */
  label?: string
  /** Extra classes on the svg. */
  className?: string
  /** role attribute. Default 'img'. */
  role?: string
  /** aria-roledescription. Default 'interactive 3D view'; null leaves it off. */
  roleDescription?: string | null
  /** tabindex. Default 0 (−1 or null for not focusable). */
  tabIndex?: number | null
  /** A decorative thumbnail: aria-hidden, not focusable, no pointer/keyboard/wheel input, no
   *  pointer events (clicks and scrolling go to what is underneath). Default false. */
  decorative?: boolean
  /** Width in px of the invisible stroke that makes pickable lines tappable. Default 18. */
  hitWidth?: number
  /** Minimum hit radius in px for pickable points. Default 14. */
  ptHitRadius?: number
  /** Back faces / unoriented / front faces ordering (see the top of the file). Default true. */
  orientSort?: boolean
  /** px between occlusion samples along an edge (min 2). Default 7. */
  sampleSpacing?: number
  /** View-space light for `shade` (x right, y up, z toward the viewer). Default [−0.45, 0.65, 0.62]. */
  light?: PointLike
}

/** The live, resolved options (stage.options). Fields can be changed at run time; call
 *  stage.resize() after changing a size field and stage.redraw() after changing a drawing field. */
export interface StageConfig {
  aspect: number
  minHeight: number
  maxHeight: number
  height: number | undefined
  fit: number
  minZoom: number
  maxZoom: number
  pitchRange: [number, number]
  rotateSpeedX: number
  rotateSpeedY: number
  keyYawStep: number
  keyPitchStep: number
  keyShiftMultiplier: number
  zoomStep: number
  wheelZoom: WheelZoomMode
  wheelZoomSpeed: number
  doubleTapReset: DoubleTapReset
  keyboard: boolean
  dragThreshold: { mouse: number; touch: number; pen: number }
  animateMs: number
  easing: EasingName | EasingFn
  hitWidth: number
  ptHitRadius: number
  orientSort: boolean
  sampleSpacing: number
  light: Vec3
}

// --- Scene items ---------------------------------------------------------------------------------

export type ItemId = string | number

interface ItemCommon {
  /** Makes it pickable; reported by 'pick' / 'hover' and put on the element as data-id. */
  id?: ItemId | null
  /** Anything; handed back with picks and hovers. */
  data?: unknown
  className?: string
  /** Layers draw in order: −1 is behind, 1 is on top. Default 0. */
  layer?: number
  /** Default: has an id. */
  pickable?: boolean
}

export type CssLength = number | string

export interface PolyItem extends ItemCommon {
  type: 'poly'
  pts: readonly PointLike[]
  fill?: string
  fillOpacity?: number
  stroke?: string
  strokeWidth?: CssLength
  strokeOpacity?: number
  dash?: string
  opacity?: number
  /** Outward unit normal, or true = from the winding (CCW seen from outside). Makes it a front or
   *  back face (classes s3d-front / s3d-back). */
  normal?: PointLike | true | null
  /** Hides edges behind it. Default: true unless fill 'none' or fillOpacity < 0.12. */
  occluder?: boolean
  /** Occluder group name (segments, points and labels can limit their `occluders` to groups). */
  group?: string
  /** Don't draw it when it faces away (closed opaque solids). */
  cull?: boolean
  /** 0–1 headlight shading (a dark overlay; colour --s3d-shade). */
  shade?: number
  depthBias?: number
  /** false = never share a <path> with neighbours. */
  merge?: boolean
}

export type HiddenLineStyle = 'dash' | 'hide' | 'show'

export interface LineStyleProps extends ItemCommon {
  stroke?: string
  width?: CssLength
  dash?: string
  opacity?: number
  linecap?: 'butt' | 'round' | 'square'
  /** 'dash' (default): hidden runs drawn dashed; 'hide': not drawn; 'show': no hidden test. */
  hiddenStyle?: HiddenLineStyle
  hiddenDash?: string
  hiddenOpacity?: number
  hiddenClassName?: string
  /** Only polygons in these groups may hide it. */
  occluders?: readonly string[]
  /** px; default the stage's hitWidth. */
  hitWidth?: number
  /** Hidden runs are pickable too. */
  pickHidden?: boolean
}

export interface SegItem extends LineStyleProps {
  type: 'seg'
  a: PointLike
  b: PointLike
}
export interface LineItem extends LineStyleProps {
  type: 'line'
  pts: readonly PointLike[]
  closed?: boolean
}
export interface SegsItem extends LineStyleProps {
  type: 'segs'
  segs: readonly (readonly [PointLike, PointLike])[]
}

export type HiddenMarkStyle = 'show' | 'dim' | 'hide'

export interface PtItem extends ItemCommon {
  type: 'pt'
  p: PointLike
  /** Radius px. Default 3.5. */
  r?: number
  fill?: string
  stroke?: string
  strokeWidth?: CssLength
  opacity?: number
  /** Default 'show' (no hidden test). 'dim' adds class s3d-hid-pt. */
  hiddenStyle?: HiddenMarkStyle
  occluders?: readonly string[]
  hitRadius?: number
}

export interface LabelItem extends ItemCommon {
  type: 'label'
  p: PointLike
  text: string | number
  /** Screen offset px. */
  dx?: number
  dy?: number
  /** Default 'middle'. */
  anchor?: 'start' | 'middle' | 'end'
  fill?: string
  /** Font size px. */
  size?: number
  italic?: boolean
  /** Default 'show'. 'dim' adds class s3d-hid-label. */
  hiddenStyle?: HiddenMarkStyle
  occluders?: readonly string[]
}

export type LineLikeItem = SegItem | LineItem | SegsItem
export type SceneItem = PolyItem | SegItem | LineItem | SegsItem | PtItem | LabelItem
/** Any nesting of arrays of items; falsy entries are skipped. */
export type Scene = SceneItem | null | undefined | false | 0 | '' | readonly Scene[]
export type SceneSource = Scene | ((stage: Stage) => Scene)

// --- Events ---------------------------------------------------------------------------------------

export interface PickEvent {
  /** data-id of the picked item, or null for the background. */
  id: string | null
  item: SceneItem | null
  data: unknown
  type: SceneItem['type'] | null
  /** Position in svg px. */
  x: number
  y: number
  pointerType: string
  originalEvent: PointerEvent
}

export interface HoverEvent {
  id: string | null
  item: SceneItem | null
  data: unknown
  type: SceneItem['type'] | null
}

export interface RenderStats {
  polys: number
  polyNodes: number
  segs: number
  lineNodes: number
  points: number
  labels: number
  occluders: number
  hiddenRuns: number
  samples: number
  ms: number
  /** ms: project + sort + occluder grid, polygons, lines, the rest. */
  split: number[]
}

export interface StageEvents {
  /** A click or tap (not a drag) on an item (id) or on the background (id null). */
  pick: PickEvent
  /** Mouse/pen hover target changed (never fired for touch). */
  hover: HoverEvent
  /** Camera changed by the user, setCamera, or at the end of a tween. */
  camera: Camera
  /** A frame was drawn. */
  render: RenderStats
  /** The first user interaction (pointer down, wheel zoom, key). */
  interact: null
  /** A double-tap / double-click reset. */
  reset: null
  /** A plain wheel scrolled past the stage because wheelZoom is 'ctrl' (show a hint). */
  wheelIgnored: null
}

export interface AnimateOptions {
  /** true = the stage's animateMs, a number = that many ms, false/0 = instant. Instant under
   *  prefers-reduced-motion. */
  animate?: boolean | number
  easing?: EasingName | EasingFn
}

/** The handle createStage() returns. */
export interface Stage {
  readonly svg: SVGSVGElement
  /** Set the scene: items (any nesting, falsy skipped) or a function (stage) → items evaluated at
   *  draw time with the current camera. Batched to the next animation frame. */
  render(scene: SceneSource): Stage
  /** Draw now, synchronously (tests, background tabs, or when the DOM must be current). */
  renderNow(scene?: SceneSource): Stage
  /** Redraw the current scene on the next frame. */
  redraw(): Stage
  on<K extends keyof StageEvents>(name: K, fn: (e: StageEvents[K]) => void): () => void
  off<K extends keyof StageEvents>(name: K, fn: (e: StageEvents[K]) => void): void
  getCamera(): Camera
  /** Change the camera. Without animation it only cancels the parts of a running tween that it
   *  sets. With animation, fields of a running tween it doesn't set keep heading for their old
   *  destination. */
  setCamera(c: CameraInput, options?: AnimateOptions): void
  /** Back to the home view (yaw, pitch, zoom, target, pan; projection and distance are kept).
   *  Animates by default (animateMs); { animate: false } for instant. */
  resetCamera(options?: AnimateOptions): void
  /** Change the home view (merged into the current home). */
  setHome(c: CameraInput): void
  getHome(): Camera
  /** Multiply the zoom (clamped). */
  zoomBy(factor: number, options?: AnimateOptions): void
  /** Zoom in / out by one zoomStep (as the + / − keys do). */
  zoomIn(options?: AnimateOptions): void
  zoomOut(options?: AnimateOptions): void
  /** Degrees per second; 0 stops. Ignored (0) under prefers-reduced-motion. */
  setAutoRotate(degPerSec: number): void
  /** Stop a running camera tween where it is. */
  cancelTween(): void
  isAnimating(): boolean
  /** World point → svg px with the current camera. */
  project(p: PointLike): { x: number; y: number; depth: number }
  /** Does a face with outward unit normal `normal` at `point` (default: the target) face the camera? */
  facing(normal: PointLike, point?: PointLike): boolean
  /** Is world point p hidden behind an occluding face (as of the last drawn frame)? */
  isHidden(p: PointLike, groups?: readonly string[]): boolean
  /** The item with this id in the last drawn frame. */
  item(id: ItemId): SceneItem | null
  size(): { width: number; height: number }
  /** Re-measure (after changing options.height / aspect / container size). */
  resize(): Stage
  destroy(): void
  readonly stats: RenderStats
  readonly camera: Camera
  /** Live options; see StageConfig. */
  readonly options: StageConfig
}

// --- Geometry results -------------------------------------------------------------------------------

export interface Face<K extends string = string> {
  id: string
  /** 3D points, counter-clockwise seen from outside. */
  pts: Vec3[]
  /** Outward unit normal. */
  normal: Vec3
  centroid: Vec3
  kind: K
  index?: number
}
export interface Edge<K extends string = string> {
  id: string
  a: Vec3
  b: Vec3
  kind: K
  index: number
  /** Ids of the two faces that meet there. */
  faces: string[]
  /** A smooth edge (cone / cylinder generator): drawn only on the silhouette with edges: 'auto'. */
  smooth: boolean
}
export interface Vertex<K extends string = string> {
  id: string
  p: Vec3
  kind: K
  index?: number
}

/** The minimum modelItems() needs; pyramid and prism models (and the nets library) fit it. */
export interface SolidModelLike {
  faces: readonly { id: string; pts: readonly PointLike[]; normal: PointLike; centroid: PointLike }[]
  edges: readonly { id: string; a: PointLike; b: PointLike; faces: readonly string[]; smooth?: boolean }[]
  vertices: readonly { id: string; p: PointLike }[]
}

export interface PyramidModel {
  kind: 'pyramid'
  idPrefix: string
  /** The base, counter-clockwise. */
  base2D: Vec2[]
  base3D: Vec3[]
  apex: Vec3
  z0: number
  height: number
  faces: Face<'base' | 'side'>[]
  edges: Edge<'base' | 'lateral'>[]
  vertices: Vertex<'base' | 'apex'>[]
  area: number
  volume: number
  smooth: boolean
}

export interface PrismModel {
  kind: 'prism'
  idPrefix: string
  base2D: Vec2[]
  base3D: Vec3[]
  top3D: Vec3[]
  shift: Vec2
  z0: number
  height: number
  faces: Face<'base' | 'top' | 'side'>[]
  edges: Edge<'base' | 'top' | 'lateral'>[]
  vertices: Vertex<'base' | 'top'>[]
  area: number
  volume: number
  smooth: boolean
}

export type SolidModel = PyramidModel | PrismModel

export interface Slice {
  z: number
  /** (z − z0) / h, 0…1. */
  t: number
  /** Linear scale of the slice vs the base (1 − t for a pyramid, 1 for a prism). */
  scale: number
  /** scale². */
  areaFactor: number
  area: number
  /** 3D, counter-clockwise from above. */
  pts: Vec3[]
  pts2D: Vec2[]
  /** Area centroid, 3D. */
  centre: Vec3
}

export type LayerMode = 'inner' | 'outer' | 'mid'

export interface Layer {
  index: number
  z0: number
  z1: number
  scale: number
  area: number
  volume: number
  base2D: Vec2[]
  model: PrismModel
}

export interface LayerStackResult {
  n: number
  mode: LayerMode
  layers: Layer[]
  volume: number
  /** ⅓Ah. */
  exact: number
  /** volume / exact. */
  ratio: number
}

export interface ModelItemData<M = unknown> {
  part: 'face' | 'edge' | 'vertex'
  ref: unknown
  model: M
}

export type FaceStyle = Partial<Omit<PolyItem, 'type' | 'pts'>>
export type EdgeStyle = Partial<Omit<SegItem, 'type' | 'a' | 'b'>>
export type VertexStyle = Partial<Omit<PtItem, 'type' | 'p'>>
type StyleSpec<S, X> = S | null | false | undefined | ((x: X) => S | null | false | undefined)

export interface ModelItemsOptions<M extends SolidModelLike = SolidModelLike> {
  /** Prepended to every face/edge/vertex id (e.g. 'pyr:'). */
  idPrefix?: string
  /** Polygon group name for the faces. */
  group?: string
  /** Style for every face, or fn(face) → style | null (null/false = skip the face). */
  face?: StyleSpec<FaceStyle, M['faces'][number]>
  edge?: StyleSpec<EdgeStyle, M['edges'][number]>
  /** Default: no vertex points. */
  vertex?: StyleSpec<VertexStyle, M['vertices'][number]>
  /** 'all' (default) | 'auto' (smooth edges only on the silhouette; needs `stage`) | 'none'. */
  edges?: 'all' | 'auto' | 'none'
  stage?: Pick<Stage, 'facing'>
  /** Default occluder flag for the faces (false for a ghost). */
  occluder?: boolean
  /** false makes the whole model unpickable. */
  pickable?: boolean
}

export interface GroundGridOptions {
  /** Half-width. Default 6. */
  size?: number
  /** Default 1. */
  step?: number
  /** Default 0. */
  z?: number
  centre?: PointLike
  center?: PointLike
  /** 0 = none. Default 0.85. */
  fade?: number
  /** Cuts per half-line, for the fade. Default 4. */
  pieces?: number
  /** Class s3d-grid-axis on the two centre lines. */
  axes?: boolean
  className?: string
  stroke?: string
  width?: CssLength
  /** Default −1. */
  layer?: number
}

// =================================================================================================
// Small helpers
// =================================================================================================

function def<T>(v: T | undefined | null, d: T): T {
  return v === undefined || v === null ? d : v
}
/** '' for undefined/null, else the value as a string (for style keys). */
function rec0(v: unknown): string {
  return v === undefined || v === null ? '' : String(v)
}
export function clamp(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v
}
function now(): number {
  return typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now()
}
/** Round to 0.1 px: plenty for SVG and keeps path strings short. */
function r1(v: number): number {
  return Math.round(v * 10) / 10
}
export function wrapAngle(a: number): number {
  a = a % TAU
  if (a > Math.PI) a -= TAU
  if (a < -Math.PI) a += TAU
  return a
}

/** prefers-reduced-motion: reduce (false outside a browser). */
export function reducedMotion(): boolean {
  try {
    const mm = (globalThis as { matchMedia?: (q: string) => MediaQueryList }).matchMedia
    return typeof mm === 'function' && !!mm('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

// =================================================================================================
// vec3: plain [x, y, z] arrays, every function returns a new array
// =================================================================================================

export const vec3 = {
  add(a: PointLike, b: PointLike): Vec3 {
    return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
  },
  sub(a: PointLike, b: PointLike): Vec3 {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
  },
  scale(a: PointLike, k: number): Vec3 {
    return [a[0] * k, a[1] * k, a[2] * k]
  },
  dot(a: PointLike, b: PointLike): number {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
  },
  cross(a: PointLike, b: PointLike): Vec3 {
    return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
  },
  len(a: PointLike): number {
    return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2])
  },
  dist(a: PointLike, b: PointLike): number {
    return vec3.len(vec3.sub(a, b))
  },
  norm(a: PointLike): Vec3 {
    const l = vec3.len(a)
    return l > 1e-12 ? [a[0] / l, a[1] / l, a[2] / l] : [0, 0, 0]
  },
  lerp(a: PointLike, b: PointLike, t: number): Vec3 {
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
  },
  mid(a: PointLike, b: PointLike): Vec3 {
    return vec3.lerp(a, b, 0.5)
  },
  /** Vertex average (not the area centroid): fine for depth sorting and label placement. A
   *  missing z counts as 0. */
  centroid(pts: readonly PointLike[]): Vec3 {
    let x = 0, y = 0, z = 0
    const n = pts.length
    for (let i = 0; i < n; i++) {
      x += pts[i][0]
      y += pts[i][1]
      z += def(pts[i][2], 0)
    }
    return n ? [x / n, y / n, z / n] : [0, 0, 0]
  },
  /** Unit normal of a (planar-ish) 3D polygon by Newell's method. Counter-clockwise seen from the
   *  side the normal points to. [0,0,0] for a degenerate polygon. */
  normal(pts: readonly PointLike[]): Vec3 {
    let nx = 0, ny = 0, nz = 0
    const n = pts.length
    for (let i = 0; i < n; i++) {
      const a = pts[i], b = pts[(i + 1) % n]
      const az = def(a[2], 0), bz = def(b[2], 0)
      nx += (a[1] - b[1]) * (az + bz)
      ny += (az - bz) * (a[0] + b[0])
      nz += (a[0] - b[0]) * (a[1] + b[1])
    }
    return vec3.norm([nx, ny, nz])
  },
  /** Rotate point p by `angle` (radians, right-hand rule) about the line through `origin` with
   *  direction `axis` (Rodrigues). Handy for folding nets about a hinge edge. */
  rotateAbout(p: PointLike, origin: PointLike, axis: PointLike, angle: number): Vec3 {
    const k = vec3.norm(axis)
    const v = vec3.sub(p, origin)
    const c = Math.cos(angle), s = Math.sin(angle)
    const kxv = vec3.cross(k, v)
    const kdv = vec3.dot(k, v) * (1 - c)
    return [
      origin[0] + v[0] * c + kxv[0] * s + k[0] * kdv,
      origin[1] + v[1] * c + kxv[1] * s + k[1] * kdv,
      origin[2] + v[2] * c + kxv[2] * s + k[2] * kdv,
    ]
  },
}

/** Lift a 2D point to 3D at height z (default 0). */
export function to3(p: PointLike, z?: number): Vec3 {
  return [p[0], p[1], def(z, 0)]
}

// =================================================================================================
// Seeded PRNG (mulberry32), so "New Weird Base" shapes are reproducible from their seed
// =================================================================================================

export function rng(seed?: number | string | null): () => number {
  let a: number
  if (typeof seed === 'string') {
    a = 2166136261
    for (let i = 0; i < seed.length; i++) a = Math.imul(a ^ seed.charCodeAt(i), 16777619)
  } else {
    a = Math.imul(Math.floor(def(seed, 1)) | 0, 2654435761) ^ 0x5bd1e995
  }
  a = a >>> 0
  return function () {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// =================================================================================================
// 2D polygon helpers. Polygons are arrays of [x, y]; counter-clockwise = positive area.
// =================================================================================================

/** Signed area (shoelace): positive when the vertices run counter-clockwise. */
export function signedArea(pts: readonly PointLike[]): number {
  let s = 0
  const n = pts.length
  for (let i = 0, j = n - 1; i < n; j = i++) s += pts[j][0] * pts[i][1] - pts[i][0] * pts[j][1]
  return s / 2
}

/** Area of a simple polygon. `polygonArea(pts, true)` returns the signed area instead. */
export function polygonArea(pts: readonly PointLike[], signed?: boolean): number {
  const a = signedArea(pts)
  return signed ? a : Math.abs(a)
}

/** Area centroid of a simple polygon (falls back to the vertex average when the area is ~0). */
export function centroid2D(pts: readonly PointLike[]): Vec2 {
  const n = pts.length
  let a = 0, cx = 0, cy = 0
  for (let i = 0; i < n; i++) {
    const p = pts[i], q = pts[(i + 1) % n]
    const c = p[0] * q[1] - q[0] * p[1]
    a += c
    cx += (p[0] + q[0]) * c
    cy += (p[1] + q[1]) * c
  }
  if (Math.abs(a) < 1e-12) {
    const v = vec3.centroid(pts)
    return [v[0], v[1]]
  }
  return [cx / (3 * a), cy / (3 * a)]
}

/** Same points, counter-clockwise (a new array). */
export function ensureCCW<P extends PointLike>(pts: readonly P[]): P[] {
  return signedArea(pts) < 0 ? pts.slice().reverse() : pts.slice()
}

/** Regular n-gon of circumradius r, counter-clockwise. Default rotation puts a flat edge at the
 *  bottom (so a square comes out axis-aligned). */
export function regularPolygon(n: number, r: number, opts?: { rotation?: number; centre?: PointLike; center?: PointLike }): Vec2[] {
  const o = opts || {}
  const c = o.centre || o.center || [0, 0]
  const rot = def(o.rotation, -Math.PI / 2 + Math.PI / n)
  const out: Vec2[] = []
  for (let i = 0; i < n; i++) {
    const t = rot + (TAU * i) / n
    out.push([c[0] + r * Math.cos(t), c[1] + r * Math.sin(t)])
  }
  return out
}

function orient(a: PointLike, b: PointLike, c: PointLike): number {
  return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])
}
function onSeg(a: PointLike, b: PointLike, p: PointLike): boolean {
  return (
    Math.min(a[0], b[0]) - 1e-12 <= p[0] && p[0] <= Math.max(a[0], b[0]) + 1e-12 &&
    Math.min(a[1], b[1]) - 1e-12 <= p[1] && p[1] <= Math.max(a[1], b[1]) + 1e-12
  )
}
/** Do closed segments p1p2 and p3p4 touch or cross? */
export function segmentsIntersect(p1: PointLike, p2: PointLike, p3: PointLike, p4: PointLike): boolean {
  const d1 = orient(p3, p4, p1), d2 = orient(p3, p4, p2), d3 = orient(p1, p2, p3), d4 = orient(p1, p2, p4)
  if (((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) && ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0))) return true
  const e = 1e-12
  if (Math.abs(d1) < e && onSeg(p3, p4, p1)) return true
  if (Math.abs(d2) < e && onSeg(p3, p4, p2)) return true
  if (Math.abs(d3) < e && onSeg(p1, p2, p3)) return true
  if (Math.abs(d4) < e && onSeg(p1, p2, p4)) return true
  return false
}

/** True when no two non-adjacent edges touch (and no edge has zero length). O(n²). */
export function isSimplePolygon(pts: readonly PointLike[]): boolean {
  const n = pts.length
  if (n < 3) return false
  for (let i = 0; i < n; i++) {
    const a = pts[i], b = pts[(i + 1) % n]
    if (Math.abs(a[0] - b[0]) < 1e-12 && Math.abs(a[1] - b[1]) < 1e-12) return false
    for (let j = i + 1; j < n; j++) {
      if (j === i || (j + 1) % n === i || (i + 1) % n === j) continue // adjacent edges share a vertex
      if (segmentsIntersect(a, b, pts[j], pts[(j + 1) % n])) return false
    }
  }
  return true
}

/** Is the CCW polygon star-shaped about point c (every edge seen "head on" from c)? `margin` is the
 *  smallest allowed cross product, so near-grazing edges count as failures. */
export function isStarShaped(pts: readonly PointLike[], c: PointLike, margin?: number): boolean {
  const m = def(margin, 0), n = pts.length
  let turn = 0
  for (let i = 0; i < n; i++) {
    const a = pts[i], b = pts[(i + 1) % n]
    const ax = a[0] - c[0], ay = a[1] - c[1], bx = b[0] - c[0], by = b[1] - c[1]
    const cr = ax * by - ay * bx
    if (cr <= m) return false
    turn += Math.atan2(cr, ax * bx + ay * by)
  }
  return Math.abs(turn - TAU) < 1e-6 // winds exactly once round c
}

/** Number of reflex (inward-pointing) corners of a CCW polygon: > 0 means non-convex. */
export function reflexCount(pts: readonly PointLike[]): number {
  const n = pts.length
  let k = 0
  for (let i = 0; i < n; i++) if (orient(pts[(i + n - 1) % n], pts[i], pts[(i + 1) % n]) < 0) k++
  return k
}

/** Move every point toward `centre` by factor k (k = 1 leaves it, k = 0 collapses it). Works for 2D
 *  or 3D points; coordinates the centre lacks (e.g. z with a 2D centre) are kept. */
export function scaleToward<P extends PointLike>(points: readonly P[], centre: PointLike, k: number): P[] {
  return points.map((p) => {
    const q = p.slice()
    for (let d = 0; d < p.length; d++) if (centre[d] !== undefined) q[d] = centre[d] + k * (p[d] - centre[d])
    return q as unknown as P
  })
}

export function translate2D(pts: readonly PointLike[], v: PointLike): Vec2[] {
  return pts.map((p): Vec2 => [p[0] + v[0], p[1] + v[1]])
}

/** Scale about the origin to exactly this area (a copy; unchanged if area is 0 or the polygon is degenerate). */
export function scaleToArea<P extends PointLike>(pts: readonly P[], area: number): P[] {
  const a = polygonArea(pts)
  if (!area || a < 1e-12) return pts.slice()
  return scaleToward(pts, [0, 0], Math.sqrt(area / a))
}

export interface RandomBlobOptions {
  /** Outer radius. Default 3. */
  radius?: number
  minVerts?: number
  maxVerts?: number
  minDents?: number
  /** Rescale the result to exactly this area. */
  area?: number
}

/**
 * A lumpy, non-convex but simple polygon, counter-clockwise, star-shaped about its own area
 * centroid, which is moved to the origin. Same seed, same shape. 7–11 vertices, ≥ 2 dents.
 */
export function randomBlob(seed?: number | string | null, opts?: RandomBlobOptions): Vec2[] {
  const o = opts || {}
  const R = def(o.radius, 3)
  const minV = def(o.minVerts, 7), maxV = def(o.maxVerts, 11)
  const minDents = def(o.minDents, 2)
  const rand = rng(seed)
  for (let attempt = 0; attempt < 400; attempt++) {
    const n = minV + Math.floor(rand() * (maxV - minV + 1))
    const a0 = rand() * TAU, step = TAU / n
    // Dents: about a third of the corners are pulled well in, the rest pushed out. Jittering the
    // angles by less than ±0.3 of a step keeps them strictly increasing.
    const dents: boolean[] = []
    for (let i = 0; i < n; i++) dents.push(rand() < 0.34)
    let pts: Vec2[] = []
    for (let i = 0; i < n; i++) {
      const r = dents[i] ? R * (0.3 + 0.2 * rand()) : R * (0.62 + 0.38 * rand())
      const t = a0 + step * (i + (rand() - 0.5) * 0.56)
      pts.push([r * Math.cos(t), r * Math.sin(t)])
    }
    if (reflexCount(pts) < minDents) continue
    const c = centroid2D(pts)
    if (!isStarShaped(pts, c, 0.05 * R * R)) continue
    // No needle-thin spikes or tiny edges: they look like rendering glitches.
    let ok = true
    for (let i = 0; i < n && ok; i++) {
      const p = pts[i], q = pts[(i + 1) % n]
      if (Math.hypot(q[0] - p[0], q[1] - p[1]) < 0.22 * R) ok = false
    }
    if (!ok) continue
    pts = translate2D(pts, [-c[0], -c[1]])
    return o.area ? scaleToArea(pts, o.area) : pts
  }
  // Practically unreachable: a fixed lumpy shape so callers always get something valid.
  const fallback: Vec2[] = [[2.4, 0], [1.2, 0.5], [1.3, 1.9], [0, 1.1], [-1.9, 1.6], [-1.1, 0], [-2.2, -1.5], [0.2, -0.9], [1.4, -2]]
  const fc = centroid2D(fallback)
  return translate2D(fallback, [-fc[0], -fc[1]])
}

/**
 * A smooth curvy outline (a "cone" base): r(θ) = R(1 + Σ aₖ cos(kθ + φₖ)), k = 2…4, sampled at n
 * points (default 64), counter-clockwise, star-shaped about its centroid, which is moved to the
 * origin. opts: { radius = 2.3, area }
 */
export function smoothBlob(seed?: number | string | null, n?: number, opts?: { radius?: number; area?: number }): Vec2[] {
  const o = opts || {}
  const N = def(n, 64)
  const R = def(o.radius, 2.3)
  const rand = rng(seed)
  const amp = [0, 0, 0.1 + 0.12 * rand(), 0.07 + 0.11 * rand(), 0.03 + 0.07 * rand()]
  const ph = [0, 0, rand() * TAU, rand() * TAU, rand() * TAU]
  for (let attempt = 0; attempt < 30; attempt++) {
    let pts: Vec2[] = []
    for (let i = 0; i < N; i++) {
      const t = (TAU * i) / N
      let r = 1
      for (let k = 2; k <= 4; k++) r += amp[k] * Math.cos(k * t + ph[k])
      r = R * Math.max(r, 0.3)
      pts.push([r * Math.cos(t), r * Math.sin(t)])
    }
    const c = centroid2D(pts)
    if (isStarShaped(pts, c, 1e-4 * R * R)) {
      pts = translate2D(pts, [-c[0], -c[1]])
      return o.area ? scaleToArea(pts, o.area) : pts
    }
    for (let k = 2; k <= 4; k++) amp[k] *= 0.8
  }
  return regularPolygon(N, R)
}

// =================================================================================================
// Solid models
// =================================================================================================

function makeFace<K extends string>(id: string, pts: Vec3[], kind: K, index?: number): Face<K> {
  const f: Face<K> = { id, pts, normal: vec3.normal(pts), centroid: vec3.centroid(pts), kind }
  if (index !== undefined) f.index = index
  return f
}

export interface ModelOptions {
  idPrefix?: string
  /** Base plane height. Default 0. */
  z0?: number
  /** Mark lateral edges smooth (a curvy-base cone / cylinder). */
  smooth?: boolean
}

/**
 * Pyramid (or cone, with a smooth base) on a 2D base polygon in the plane z = z0, apex at the
 * absolute 3D point `apex` (a missing z means z0 + 1). Height h = apex z − z0.
 * Ids: faces 'base', 's0'…; edges 'b0'… (base), 'l0'… (lateral, base vertex i → apex);
 *      vertices 'v0'…, 'apex'. All prefixed with opts.idPrefix.
 */
export function pyramidModel(base2D: readonly PointLike[], apex: PointLike, opts?: ModelOptions): PyramidModel {
  const o = opts || {}
  const pre = o.idPrefix || ''
  const base = ensureCCW(base2D).map((p): Vec2 => [p[0], p[1]])
  const n = base.length
  const z0 = def(o.z0, 0)
  const A: Vec3 = [apex[0], apex[1], def(apex[2], z0 + 1)]
  const B = base.map((p): Vec3 => [p[0], p[1], z0])
  const faces: Face<'base' | 'side'>[] = [makeFace(pre + 'base', B.slice().reverse(), 'base')]
  const edges: Edge<'base' | 'lateral'>[] = []
  const vertices: Vertex<'base' | 'apex'>[] = []
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n
    faces.push(makeFace(pre + 's' + i, [B[i], B[j], A], 'side', i))
    edges.push({ id: pre + 'b' + i, a: B[i], b: B[j], kind: 'base', index: i, faces: [pre + 'base', pre + 's' + i], smooth: false })
  }
  for (let i = 0; i < n; i++) {
    edges.push({ id: pre + 'l' + i, a: B[i], b: A, kind: 'lateral', index: i, faces: [pre + 's' + ((i + n - 1) % n), pre + 's' + i], smooth: !!o.smooth })
    vertices.push({ id: pre + 'v' + i, p: B[i], kind: 'base', index: i })
  }
  vertices.push({ id: pre + 'apex', p: A, kind: 'apex' })
  const area = polygonArea(base)
  const h = A[2] - z0
  return {
    kind: 'pyramid', idPrefix: pre, base2D: base, base3D: B, apex: A, z0, height: h,
    faces, edges, vertices, area, volume: (area * h) / 3, smooth: !!o.smooth,
  }
}

/**
 * Prism (cylinder, with a smooth base) on a 2D base polygon from z0 to z0 + height. The top is the
 * base translated by (shift2D, height), so a non-zero shift gives an oblique prism.
 * Ids: faces 'base', 'top', 's0'…; edges 'b0'… (bottom), 't0'… (top), 'l0'… (lateral);
 *      vertices 'v0'… (bottom), 'w0'… (top). All prefixed with opts.idPrefix.
 */
export function prismModel(base2D: readonly PointLike[], height: number, shift2D?: PointLike | null, opts?: ModelOptions): PrismModel {
  const o = opts || {}
  const pre = o.idPrefix || ''
  const base = ensureCCW(base2D).map((p): Vec2 => [p[0], p[1]])
  const n = base.length
  const z0 = def(o.z0, 0)
  const sh = shift2D || [0, 0]
  const B = base.map((p): Vec3 => [p[0], p[1], z0])
  const T = base.map((p): Vec3 => [p[0] + sh[0], p[1] + sh[1], z0 + height])
  const faces: Face<'base' | 'top' | 'side'>[] = [makeFace(pre + 'base', B.slice().reverse(), 'base'), makeFace(pre + 'top', T.slice(), 'top')]
  const edges: Edge<'base' | 'top' | 'lateral'>[] = []
  const vertices: Vertex<'base' | 'top'>[] = []
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n
    faces.push(makeFace(pre + 's' + i, [B[i], B[j], T[j], T[i]], 'side', i))
    edges.push({ id: pre + 'b' + i, a: B[i], b: B[j], kind: 'base', index: i, faces: [pre + 'base', pre + 's' + i], smooth: false })
    edges.push({ id: pre + 't' + i, a: T[i], b: T[j], kind: 'top', index: i, faces: [pre + 'top', pre + 's' + i], smooth: false })
  }
  for (let i = 0; i < n; i++) {
    edges.push({ id: pre + 'l' + i, a: B[i], b: T[i], kind: 'lateral', index: i, faces: [pre + 's' + ((i + n - 1) % n), pre + 's' + i], smooth: !!o.smooth })
    vertices.push({ id: pre + 'v' + i, p: B[i], kind: 'base', index: i })
  }
  for (let i = 0; i < n; i++) vertices.push({ id: pre + 'w' + i, p: T[i], kind: 'top', index: i })
  const area = polygonArea(base)
  return {
    kind: 'prism', idPrefix: pre, base2D: base, base3D: B, top3D: T, shift: [sh[0], sh[1]], z0, height,
    faces, edges, vertices, area, volume: area * height, smooth: !!o.smooth,
  }
}

/**
 * Horizontal cross-section of a pyramid or prism model at height z (null outside the solid).
 * Pyramid: the base shrunk toward the apex by scale 1 − t (t = (z − z0)/h), area A(1 − t)².
 * Prism: the base translated by t·(shift, h), area A.
 */
export function sliceAt(model: SolidModel, z: number): Slice | null {
  const h = model.height
  let t = (z - model.z0) / h
  if (!(t >= -1e-12 && t <= 1 + 1e-12)) return null
  t = clamp(t, 0, 1)
  let pts: Vec3[], scale: number
  if (model.kind === 'pyramid') {
    scale = 1 - t
    const apex = model.apex
    pts = model.base3D.map((p) => vec3.lerp(p, apex, t))
  } else if (model.kind === 'prism') {
    scale = 1
    const dx = model.shift[0] * t, dy = model.shift[1] * t, zz = model.z0 + h * t
    pts = model.base3D.map((p): Vec3 => [p[0] + dx, p[1] + dy, zz])
  } else {
    return null
  }
  const pts2D = pts.map((p): Vec2 => [p[0], p[1]])
  const c2 = centroid2D(pts2D)
  return {
    z: model.z0 + h * t, t, scale, areaFactor: scale * scale, area: model.area * scale * scale,
    pts, pts2D, centre: [c2[0], c2[1], model.z0 + h * t],
  }
}

/**
 * n stepped prisms ("coins") approximating a pyramid on base2D with apex foot (apex[0], apex[1])
 * and height h. Slab k runs from z = k·h/n to (k+1)·h/n; its cross-section is the pyramid's slice
 * at the slab's top (mode 'inner': the stack sits inside the pyramid and its volume climbs to ⅓Ah
 * from below), bottom ('outer': it contains the pyramid, volume falls to ⅓Ah) or middle ('mid').
 * Slabs are vertical (not sheared), so with the apex slid sideways they shift like a pushed stack
 * of coins. In 'inner' mode the top slab has zero area and is left out, so n slabs give n − 1
 * visible prisms. opts: { mode = 'inner', idPrefix = 'L' (slab k's ids start 'L3:'), smooth }
 */
export function layerStack(
  base2D: readonly PointLike[],
  apex: PointLike,
  h: number,
  n: number,
  opts?: { mode?: LayerMode; idPrefix?: string; smooth?: boolean },
): LayerStackResult {
  const o = opts || {}
  const mode: LayerMode = o.mode || 'inner'
  const pre = def(o.idPrefix, 'L')
  const base = ensureCCW(base2D).map((p): Vec2 => [p[0], p[1]])
  const A = polygonArea(base)
  const foot: Vec2 = [apex[0], apex[1]]
  const N = Math.max(0, Math.floor(n))
  const layers: Layer[] = []
  let vol = 0
  for (let k = 0; k < N; k++) {
    const z0 = (k * h) / N, z1 = ((k + 1) * h) / N
    const zs = mode === 'outer' ? z0 : mode === 'mid' ? (z0 + z1) / 2 : z1
    const s = 1 - zs / h
    const area = A * s * s
    const v = (area * h) / N
    vol += v
    if (s <= 1e-9) continue
    const poly = scaleToward(base, foot, s)
    layers.push({
      index: k, z0, z1, scale: s, area, volume: v, base2D: poly,
      model: prismModel(poly, h / N, [0, 0], { z0, idPrefix: pre + k + ':', smooth: o.smooth }),
    })
  }
  const exact = (A * h) / 3
  return { n: N, mode, layers, volume: vol, exact, ratio: exact > 0 ? vol / exact : 0 }
}

// =================================================================================================
// Item builders
// =================================================================================================

function styleOf<S, X>(s: StyleSpec<S, X>, x: X): S | null | false | undefined {
  return typeof s === 'function' ? (s as (x: X) => S | null | false | undefined)(x) : s
}

/**
 * Render items for a model: one 'poly' per face (with its outward normal, so it sorts as a front or
 * back face) and one 'seg' per edge, optionally a 'pt' per vertex. Every item's `data` is
 * { part: 'face' | 'edge' | 'vertex', ref: <the face/edge/vertex>, model } (ModelItemData), merged
 * with any `data` in the style.
 */
export function modelItems<M extends SolidModelLike>(model: M, opts?: ModelItemsOptions<M>): SceneItem[] {
  const o: ModelItemsOptions<M> = opts || {}
  const pre = o.idPrefix || ''
  const items: SceneItem[] = []
  const facing: Record<string, boolean> = {}
  const edgesMode = o.edges || 'all'
  const stage = o.stage
  const extra = (st: { data?: unknown } | null | undefined): object => {
    const d = st ? st.data : undefined
    return d && typeof d === 'object' ? d : {}
  }
  for (const f of model.faces as readonly M['faces'][number][]) {
    if (edgesMode === 'auto' && stage) facing[f.id] = stage.facing(f.normal, f.centroid)
    const st = styleOf(o.face, f)
    if (st === null || st === false) continue
    const it: PolyItem = Object.assign({ type: 'poly' as const, pts: f.pts, normal: f.normal, id: pre + f.id, group: o.group }, st || {})
    it.data = Object.assign({ part: 'face', ref: f, model }, extra(st))
    if (it.occluder === undefined && o.occluder !== undefined) it.occluder = o.occluder
    if (o.pickable === false) it.pickable = false
    items.push(it)
  }
  if (edgesMode !== 'none') {
    for (const e of model.edges as readonly M['edges'][number][]) {
      if (e.smooth && edgesMode === 'auto') {
        if (!stage || e.faces.length < 2) continue
        if (facing[e.faces[0]] === facing[e.faces[1]]) continue
      }
      const st = styleOf(o.edge, e)
      if (st === null || st === false) continue
      const it: SegItem = Object.assign({ type: 'seg' as const, a: e.a, b: e.b, id: pre + e.id }, st || {})
      it.data = Object.assign({ part: 'edge', ref: e, model }, extra(st))
      if (o.pickable === false) it.pickable = false
      items.push(it)
    }
  }
  if (o.vertex) {
    for (const v of model.vertices as readonly M['vertices'][number][]) {
      const st = styleOf(o.vertex, v)
      if (st === null || st === false) continue
      const it: PtItem = Object.assign({ type: 'pt' as const, p: v.p, id: pre + v.id }, st || {})
      it.data = Object.assign({ part: 'vertex', ref: v, model }, extra(st))
      if (o.pickable === false) it.pickable = false
      items.push(it)
    }
  }
  return items
}

/**
 * Square ground grid in layer −1 (drawn behind everything, never dashed, never picked). Lines fade
 * toward the edge: each line is cut into pieces and the pieces are bucketed by opacity (steps of
 * 0.1) into a handful of 'segs' items, so the whole grid is only a few <path>s. Classes
 * s3d-grid-line (+ s3d-grid-axis on the centre lines with `axes`).
 */
export function groundGrid(opts?: GroundGridOptions): SegsItem[] {
  const o = opts || {}
  const size = def(o.size, 6), step = def(o.step, 1), z = def(o.z, 0)
  const c = o.centre || o.center || [0, 0]
  const fade = def(o.fade, 0.85)
  const pieces = Math.max(1, def(o.pieces, 4))
  const layer = def(o.layer, -1)
  const buckets: Record<string, SegsItem & { segs: [PointLike, PointLike][]; opacity: number }> = {}
  const order: string[] = []
  const m = Math.floor(size / step + 1e-9)
  const cut: number[] = []
  for (let p = -pieces; p <= pieces; p++) cut.push((p / pieces) * size)
  for (let k = -m; k <= m; k++) {
    const u = k * step
    const axis = !!o.axes && k === 0
    for (let dir = 0; dir < 2; dir++) {
      for (let q = 0; q < cut.length - 1; q++) {
        const v0 = cut[q], v1 = cut[q + 1]
        const vm = (v0 + v1) / 2
        const rr = Math.sqrt(u * u + vm * vm) / size
        const op = fade ? Math.round(clamp(1 - fade * rr * rr, 0.1, 1) * 10) / 10 : 1
        const key = (axis ? 'A' : 'G') + op
        if (!buckets[key]) {
          buckets[key] = {
            type: 'segs', segs: [], layer, hiddenStyle: 'show', pickable: false, opacity: op, stroke: o.stroke, width: o.width,
            className: 's3d-grid-line' + (axis ? ' s3d-grid-axis' : '') + (o.className ? ' ' + o.className : ''),
          }
          order.push(key)
        }
        const a: Vec3 = dir ? [c[0] + v0, c[1] + u, z] : [c[0] + u, c[1] + v0, z]
        const b: Vec3 = dir ? [c[0] + v1, c[1] + u, z] : [c[0] + u, c[1] + v1, z]
        buckets[key].segs.push([a, b])
      }
    }
  }
  // Faint first, so the brighter middle lines sit on top where pieces meet.
  order.sort((x, y) => buckets[x].opacity - buckets[y].opacity)
  return order.map((key) => buckets[key])
}

// =================================================================================================
// Pure stage logic (exported so node can test it)
// =================================================================================================

export const easings: Record<EasingName, EasingFn> = {
  linear: (t) => t,
  /** Quadratic ease in-out (the mockups' tween). */
  easeInOut: (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
  /** Cubic ease out. */
  easeOut: (t) => 1 - Math.pow(1 - t, 3),
  easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
}

export function resolveEasing(e: EasingName | EasingFn | undefined | null): EasingFn {
  if (typeof e === 'function') return e
  return (e && easings[e]) || easings.easeInOut
}

export const DEFAULT_CAMERA: Readonly<Camera> = {
  yaw: -0.85, pitch: 0.42, zoom: 1, target: [0, 0, 0], projection: 'perspective', distance: 4, pan: [0, 0],
}

/** All createStage defaults applied (the live stage.options object starts as this). */
export function resolveStageOptions(opts?: StageOptions): StageConfig {
  const o = opts || {}
  const dt = o.dragThreshold
  const dragMouse = typeof dt === 'number' ? dt : def(dt && dt.mouse, 6)
  const pr = o.pitchRange
  return {
    aspect: def(o.aspect, 0.72),
    minHeight: def(o.minHeight, 240),
    maxHeight: def(o.maxHeight, 620),
    height: o.height,
    fit: def(o.fit, 5),
    minZoom: def(o.minZoom, 0.5),
    maxZoom: def(o.maxZoom, 4),
    pitchRange: pr ? [pr[0], pr[1]] : [-0.6, 1.5],
    rotateSpeedX: def(o.rotateSpeedX, 0.5),
    rotateSpeedY: def(o.rotateSpeedY, 0.4),
    keyYawStep: def(o.keyYawStep, 15),
    keyPitchStep: def(o.keyPitchStep, 5),
    keyShiftMultiplier: def(o.keyShiftMultiplier, 3),
    zoomStep: def(o.zoomStep, 0.1),
    wheelZoom: def<WheelZoomMode>(o.wheelZoom, 'ctrl'),
    wheelZoomSpeed: def(o.wheelZoomSpeed, 0.0015),
    doubleTapReset: def<DoubleTapReset>(o.doubleTapReset, true),
    keyboard: def(o.keyboard, true),
    dragThreshold: {
      mouse: dragMouse,
      touch: typeof dt === 'number' || !dt ? 10 : def(dt.touch, 10),
      pen: typeof dt === 'number' ? dt : def(dt && dt.pen, dragMouse),
    },
    animateMs: def(o.animateMs, 350),
    easing: def<EasingName | EasingFn>(o.easing, 'easeInOut'),
    hitWidth: def(o.hitWidth, 18),
    ptHitRadius: def(o.ptHitRadius, 14),
    orientSort: def(o.orientSort, true),
    sampleSpacing: Math.max(2, def(o.sampleSpacing, 7)),
    light: vec3.norm(o.light || [-0.45, 0.65, 0.62]),
  }
}

type CameraLimits = Pick<StageConfig, 'pitchRange' | 'minZoom' | 'maxZoom'>

/** A full camera from a partial one (defaults filled, pitch and zoom clamped; undefined fields
 *  count as missing). */
export function normalizeCamera(c: CameraInput | null | undefined, limits: CameraLimits, base: Readonly<Camera> = DEFAULT_CAMERA): Camera {
  const src = c || {}
  const t = def(src.target, base.target)
  const p = def(src.pan, base.pan)
  return {
    yaw: def(src.yaw, base.yaw),
    pitch: clamp(def(src.pitch, base.pitch), limits.pitchRange[0], limits.pitchRange[1]),
    zoom: clamp(def(src.zoom, base.zoom), limits.minZoom, limits.maxZoom),
    target: [t[0], t[1], def(t[2], 0)],
    projection: def(src.projection, base.projection),
    distance: def(src.distance, base.distance),
    pan: [def(p[0], 0), def(p[1], 0)],
  }
}

/** Camera fields present (not undefined) in a partial camera. */
export function cameraFields(c: CameraInput): CameraField[] {
  return CAMERA_FIELDS.filter((k) => c[k] !== undefined && c[k] !== null)
}

/** Interpolate cameras: yaw the short way round, zoom geometrically, the projection switches at
 *  the half-way point. */
export function lerpCamera(a: Readonly<Camera>, b: Readonly<Camera>, k: number): Camera {
  return {
    yaw: a.yaw + wrapAngle(b.yaw - a.yaw) * k,
    pitch: a.pitch + (b.pitch - a.pitch) * k,
    zoom: a.zoom * Math.pow(b.zoom / a.zoom, k),
    target: vec3.lerp(a.target, b.target, k),
    projection: k < 0.5 ? a.projection : b.projection,
    distance: a.distance + (b.distance - a.distance) * k,
    pan: [a.pan[0] + (b.pan[0] - a.pan[0]) * k, a.pan[1] + (b.pan[1] - a.pan[1]) * k],
  }
}

/** Does a wheel event zoom under this wheelZoom mode? */
export function wheelZooms(mode: WheelZoomMode, e: { ctrlKey?: boolean; metaKey?: boolean }): boolean {
  if (!mode) return false
  if (mode === 'ctrl') return !!(e.ctrlKey || e.metaKey)
  return true
}

/** New zoom after a wheel event (deltaMode 1 = lines × 16 px, 2 = pages × 400 px). */
export function wheelZoomValue(zoom: number, deltaY: number, deltaMode: number, cfg: Pick<StageConfig, 'wheelZoomSpeed' | 'minZoom' | 'maxZoom'>): number {
  const dy = deltaY * (deltaMode === 1 ? 16 : deltaMode === 2 ? 400 : 1)
  return clamp(zoom * Math.exp(-dy * cfg.wheelZoomSpeed), cfg.minZoom, cfg.maxZoom)
}

/** px a press must move before it is a drag. */
export function dragThresholdFor(cfg: Pick<StageConfig, 'dragThreshold'>, pointerType: string): number {
  const t = cfg.dragThreshold
  return pointerType === 'touch' ? t.touch : pointerType === 'pen' ? t.pen : t.mouse
}

/** Camera after dragging by (dx, dy) px: right turns the solid to the right, down tips the top
 *  toward the viewer. */
export function dragCamera(cam: Readonly<Camera>, dx: number, dy: number, cfg: Pick<StageConfig, 'rotateSpeedX' | 'rotateSpeedY' | 'pitchRange'>): { yaw: number; pitch: number } {
  return {
    yaw: wrapAngle(cam.yaw - dx * cfg.rotateSpeedX * DEG),
    pitch: clamp(cam.pitch + dy * cfg.rotateSpeedY * DEG, cfg.pitchRange[0], cfg.pitchRange[1]),
  }
}

/** What a key does to the camera: the changed fields, 'reset', or null (not a camera key). */
export function keyCameraChange(
  key: string,
  shift: boolean,
  cam: Readonly<Camera>,
  cfg: Pick<StageConfig, 'keyYawStep' | 'keyPitchStep' | 'keyShiftMultiplier' | 'zoomStep' | 'pitchRange' | 'minZoom' | 'maxZoom'>,
): Partial<Camera> | 'reset' | null {
  const mul = shift ? cfg.keyShiftMultiplier : 1
  const yawStep = cfg.keyYawStep * mul * DEG
  const pitchStep = cfg.keyPitchStep * mul * DEG
  const zf = 1 + cfg.zoomStep
  switch (key) {
    case 'ArrowLeft': return { yaw: wrapAngle(cam.yaw + yawStep) }
    case 'ArrowRight': return { yaw: wrapAngle(cam.yaw - yawStep) }
    case 'ArrowUp': return { pitch: clamp(cam.pitch - pitchStep, cfg.pitchRange[0], cfg.pitchRange[1]) }
    case 'ArrowDown': return { pitch: clamp(cam.pitch + pitchStep, cfg.pitchRange[0], cfg.pitchRange[1]) }
    case '+': case '=': return { zoom: clamp(cam.zoom * zf, cfg.minZoom, cfg.maxZoom) }
    case '-': case '_': return { zoom: clamp(cam.zoom / zf, cfg.minZoom, cfg.maxZoom) }
    case '0': case 'Home': return 'reset'
    default: return null
  }
}

/** The projection set-up for one frame. */
export interface View {
  /** Screen right, screen up, toward the viewer (world unit vectors). */
  R: Vec3
  U: Vec3
  E: Vec3
  /** px per world unit at the target. */
  s: number
  /** Screen position of the target (stage centre + pan). */
  cx: number
  cy: number
  persp: boolean
  /** Eye distance (world units). */
  D: number
  T: Vec3
  eye: Vec3
}

export function computeView(cam: Readonly<Camera>, fit: number, W: number, H: number): View {
  const cyw = Math.cos(cam.yaw), syw = Math.sin(cam.yaw), cp = Math.cos(cam.pitch), sp = Math.sin(cam.pitch)
  const E: Vec3 = [cp * cyw, cp * syw, sp]
  const D = cam.distance * fit
  return {
    R: [-syw, cyw, 0],
    U: [-sp * cyw, -sp * syw, cp],
    E,
    s: (Math.min(W || 1, H || 1) / (2 * fit)) * cam.zoom,
    cx: W / 2 + cam.pan[0] * W,
    cy: H / 2 + cam.pan[1] * H,
    persp: cam.projection !== 'orthographic',
    D,
    T: cam.target,
    eye: vec3.add(cam.target, vec3.scale(E, D)),
  }
}

/** World point → [screen x, screen y, depth] (depth grows toward the viewer). */
export function projectPoint(view: View, p: PointLike): Vec3 {
  const rx = p[0] - view.T[0], ry = p[1] - view.T[1], rz = def(p[2], 0) - view.T[2]
  const R = view.R, U = view.U, E = view.E
  const x = rx * R[0] + ry * R[1]
  const y = rx * U[0] + ry * U[1] + rz * U[2]
  const d = rx * E[0] + ry * E[1] + rz * E[2]
  let f = view.s
  if (view.persp) f *= view.D / Math.max(view.D - d, view.D * 0.05)
  return [view.cx + x * f, view.cy - y * f, d]
}

/** Is a face with outward normal n at point c facing the camera? */
export function isFacing(view: View, n: PointLike, c: PointLike): boolean {
  if (view.persp) {
    return n[0] * (view.eye[0] - c[0]) + n[1] * (view.eye[1] - c[1]) + n[2] * (view.eye[2] - def(c[2], 0)) > 0
  }
  return vec3.dot(n, view.E) > 0
}

// =================================================================================================
// Stage CSS: one <style>, every selector scoped to the stage's own class. Presentation defaults are
// wrapped in :where() (zero specificity), so any page class overrides them. No polygon fills.
// =================================================================================================

const STYLE_ID = 's3d-style-2'
const CSS = [
  ':where(.s3d-svg){display:block;width:100%;max-width:100%;overflow:hidden;touch-action:none;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent;cursor:grab;',
  '--s3d-ink:#1f2937;--s3d-muted:#6b7280;--s3d-grid:#cbd5e1;--s3d-grid-axis:#94a3b8;--s3d-halo:#ffffff;--s3d-shade:#000000;--s3d-focus:#2563eb}',
  ':where(.dark) :where(.s3d-svg){--s3d-ink:#e5e7eb;--s3d-muted:#9ca3af;--s3d-grid:#334155;--s3d-grid-axis:#64748b;--s3d-halo:#111827;--s3d-focus:#60a5fa}',
  ':where(.s3d-svg:focus){outline:none}',
  ':where(.s3d-svg:focus-visible){outline:2px solid var(--s3d-focus);outline-offset:2px}',
  ':where(.s3d-svg [data-id]){cursor:pointer}',
  ':where(.s3d-svg.s3d-dragging),:where(.s3d-svg.s3d-dragging [data-id]){cursor:grabbing}',
  ':where(.s3d-svg .s3d-poly){stroke-linejoin:round}',
  ':where(.s3d-svg .s3d-line){fill:none;stroke:var(--s3d-ink);stroke-width:1.5px;stroke-linecap:round;stroke-linejoin:round}',
  ':where(.s3d-svg .s3d-hid){stroke-dasharray:5 4;opacity:.55}',
  ':where(.s3d-svg .s3d-grid-line){stroke:var(--s3d-grid);stroke-width:1px;stroke-linecap:butt}',
  ':where(.s3d-svg .s3d-grid-axis){stroke:var(--s3d-grid-axis)}',
  ':where(.s3d-svg .s3d-pt){fill:var(--s3d-ink);stroke:none}',
  ':where(.s3d-svg .s3d-hid-pt){opacity:.4}',
  ':where(.s3d-svg .s3d-label){fill:var(--s3d-ink);font-size:13px;font-weight:600;paint-order:stroke;stroke:var(--s3d-halo);stroke-width:4px;stroke-linejoin:round;dominant-baseline:central}',
  ':where(.s3d-svg .s3d-hid-label){opacity:.45}',
  // Only hit targets take pointer events; what is drawn never steals them.
  '.s3d-svg .s3d-line,.s3d-svg .s3d-pt,.s3d-svg .s3d-label,.s3d-svg .s3d-shade,.s3d-svg .s3d-nopick{pointer-events:none}',
].join('')

function injectCSS(): void {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return
  const st = document.createElement('style')
  st.id = STYLE_ID
  st.textContent = CSS
  // First in <head>; the rules have zero specificity anyway, so page styles always win.
  const head = document.head || document.documentElement
  head.insertBefore(st, head.firstChild)
}

// =================================================================================================
// DOM node pools: the i-th drawn element of a kind reuses the i-th node, so the DOM order is the draw
// order without any re-sorting, and attributes are only written when they change.
// =================================================================================================

type AttrVal = string | number | null | undefined
type CachedEl = SVGElement & { _s3d: Record<string, string | number | null> }

interface Pool {
  next(): CachedEl
  end(): void
}

function makePool(parent: SVGElement, tag: string): Pool {
  const nodes: CachedEl[] = []
  let n = 0
  return {
    next() {
      let el = nodes[n]
      if (!el) {
        el = document.createElementNS(SVGNS, tag) as CachedEl
        el._s3d = {}
        parent.appendChild(el)
        nodes.push(el)
      }
      n++
      return el
    },
    end() {
      for (let i = n; i < nodes.length; i++) parent.removeChild(nodes[i])
      nodes.length = n
      n = 0
    },
  }
}

function setA(el: CachedEl, k: string, v: AttrVal): void {
  const c = el._s3d
  const val = v === undefined ? null : v
  if (c[k] === val) return
  c[k] = val
  if (val === null) el.removeAttribute(k)
  else el.setAttribute(k, String(val))
}
function setS(el: CachedEl, k: string, v: AttrVal): void {
  const c = el._s3d
  const key = 's:' + k
  const val = v === undefined || v === '' ? null : v
  if (c[key] === val) return
  c[key] = val
  if (val === null) el.style.removeProperty(k)
  else el.style.setProperty(k, String(val))
}
/** Numbers → px for length properties set through style (stroke-width, font-size). */
function px(v: CssLength | undefined): string | undefined {
  return typeof v === 'number' ? v + 'px' : v
}
function setText(el: CachedEl, t: unknown): void {
  const s = String(def(t, ''))
  if (el._s3d.text === s) return
  el._s3d.text = s
  el.textContent = s
}
function svgEl<T extends SVGElement = SVGElement>(tag: string, attrs?: Record<string, string>, parent?: Element): T {
  const el = document.createElementNS(SVGNS, tag) as T
  if (attrs) for (const k in attrs) el.setAttribute(k, attrs[k])
  if (parent) parent.appendChild(el)
  return el
}

// =================================================================================================
// The stage
// =================================================================================================

interface PolyRec {
  it: PolyItem
  xs: number[]
  ys: number[]
  n: number
  depth: number
  layer: number
  cls: number
  front: boolean | null
  nrm: PointLike | null
  order: number
  minx: number
  maxx: number
  miny: number
  maxy: number
  dmax: number
  occ: boolean
  group: string
  pick: boolean
  culled: boolean
  key: string | null
  pn?: Vec3
  pd?: number
  es?: number
}

interface LayerGroup {
  g: SVGGElement
  polys: Pool
  hid: Pool
  vis: Pool
  pts: Pool
  labels: Pool
}

interface LineGroup {
  el: CachedEl
  it: LineLikeItem
  hidden: boolean
  d: string
}

interface Tween {
  from: Camera
  to: Camera
  fields: Set<CameraField>
  ms: number
  t0: number | null
  ease: EasingFn
}

/** Build a path string from screen-space segments, joining consecutive ones. */
function makePathBuilder() {
  const b = {
    d: '',
    lx: NaN,
    ly: NaN,
    seg(p: PointLike, q: PointLike) {
      if (!(Math.abs(p[0] - b.lx) < 0.05 && Math.abs(p[1] - b.ly) < 0.05)) b.d += 'M' + r1(p[0]) + ' ' + r1(p[1])
      b.d += 'L' + r1(q[0]) + ' ' + r1(q[1])
      b.lx = q[0]
      b.ly = q[1]
    },
  }
  return b
}

/** Closed path for a projected polygon, always wound the same way on screen, so polygons merged into
 *  one <path> never cancel each other out under the nonzero fill rule. */
function polyD(xs: number[], ys: number[], n: number): string {
  let a = 0
  for (let i = 0, j = n - 1; i < n; j = i++) a += xs[j] * ys[i] - xs[i] * ys[j]
  let d: string
  if (a >= 0) {
    d = 'M' + r1(xs[0]) + ' ' + r1(ys[0])
    for (let k = 1; k < n; k++) d += 'L' + r1(xs[k]) + ' ' + r1(ys[k])
  } else {
    d = 'M' + r1(xs[n - 1]) + ' ' + r1(ys[n - 1])
    for (let k = n - 2; k >= 0; k--) d += 'L' + r1(xs[k]) + ' ' + r1(ys[k])
  }
  return d + 'Z'
}

function setOf(arr: readonly string[]): Record<string, boolean> {
  const s: Record<string, boolean> = {}
  for (let i = 0; i < arr.length; i++) s[String(arr[i])] = true
  return s
}

function isPickable(it: { pickable?: boolean; id?: ItemId | null }): boolean {
  return it.pickable !== undefined ? !!it.pickable : it.id !== undefined && it.id !== null
}

function defaultLabel(cfg: StageConfig): string {
  const zoom = cfg.wheelZoom === 'ctrl' ? 'Ctrl + scroll or pinch to zoom' : cfg.wheelZoom ? 'scroll or pinch to zoom' : 'pinch to zoom'
  return '3D view. Drag to rotate, ' + zoom + '.' + (cfg.keyboard ? ' When focused, arrow keys rotate, plus and minus zoom, 0 resets.' : '')
}

/**
 * Create a responsive <svg> stage inside `container` (an element or a selector). Browser only.
 * The svg fills the container's content width; its height is clamp(width × aspect, minHeight,
 * maxHeight) or options.height. Call destroy() when done (e.g. in a React effect cleanup).
 */
export function createStage(container: Element | string, opts?: StageOptions): Stage {
  if (typeof document === 'undefined') throw new Error('solid3d createStage needs a browser DOM')
  const host: Element | null = typeof container === 'string' ? document.querySelector(container) : container
  if (!host) throw new Error('solid3d createStage: container not found')
  const options = opts || {}
  injectCSS()
  const win = window

  const o = resolveStageOptions(options)
  let home = normalizeCamera(options.camera, o)
  const cam: Camera = normalizeCamera(home, o)
  const decorative = !!options.decorative

  // --- DOM -----------------------------------------------------------------------------------------
  const attrs: Record<string, string> = { class: 's3d-svg' + (options.className ? ' ' + options.className : ''), xmlns: SVGNS }
  if (decorative) {
    attrs['aria-hidden'] = 'true'
    attrs.focusable = 'false'
  } else {
    const ti = options.tabIndex === undefined ? 0 : options.tabIndex
    if (ti !== null) attrs.tabindex = String(ti)
    attrs.role = options.role || 'img'
    const rd = options.roleDescription === undefined ? 'interactive 3D view' : options.roleDescription
    if (rd) attrs['aria-roledescription'] = rd
    attrs['aria-label'] = options.label || defaultLabel(o)
  }
  const svg = svgEl<SVGSVGElement>('svg', attrs)
  if (decorative) {
    svg.style.pointerEvents = 'none'
    svg.style.touchAction = 'auto'
    svg.style.cursor = 'auto'
  }
  host.appendChild(svg)
  const hitsG = svgEl('g', { class: 's3d-hits' }, svg)
  const hitSegs = makePool(hitsG, 'path')
  const hitPts = makePool(hitsG, 'circle')
  const layerGroups: Record<number, LayerGroup> = {}
  const layerKeys: number[] = []

  function getLayer(L: number): LayerGroup {
    const found = layerGroups[L]
    if (found) return found
    const g = svgEl<SVGGElement>('g', { class: 's3d-layer', 'data-layer': String(L) })
    const lg: LayerGroup = {
      g,
      polys: makePool(svgEl('g', { class: 's3d-polys' }, g), 'path'),
      hid: makePool(svgEl('g', { class: 's3d-hidden-lines' }, g), 'path'),
      vis: makePool(svgEl('g', { class: 's3d-lines' }, g), 'path'),
      pts: makePool(svgEl('g', { class: 's3d-points' }, g), 'circle'),
      labels: makePool(svgEl('g', { class: 's3d-labels' }, g), 'text'),
    }
    layerGroups[L] = lg
    layerKeys.push(L)
    layerKeys.sort((a, b) => a - b)
    for (let i = 0; i < layerKeys.length; i++) svg.insertBefore(layerGroups[layerKeys[i]].g, hitsG)
    return lg
  }

  // --- size ----------------------------------------------------------------------------------------
  let W = 0, H = 0
  function measure(): boolean {
    const cs = win.getComputedStyle ? win.getComputedStyle(host as Element) : null
    const pad = cs ? (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0) : 0
    const w = Math.max(0, Math.floor((host as Element).clientWidth - pad))
    const h = o.height ? o.height : Math.round(clamp(w * o.aspect, o.minHeight, o.maxHeight))
    if (w === W && h === H) return false
    W = w
    H = h
    svg.setAttribute('viewBox', '0 0 ' + Math.max(W, 1) + ' ' + Math.max(H, 1))
    svg.style.height = H + 'px'
    return true
  }
  measure()
  let ro: ResizeObserver | null = null
  function onWinResize() {
    if (measure()) requestDraw()
  }
  if (typeof win.ResizeObserver === 'function') {
    ro = new win.ResizeObserver(() => {
      if (measure()) requestDraw()
    })
    ro.observe(host)
  } else {
    win.addEventListener('resize', onWinResize)
  }

  let visible = true
  let io: IntersectionObserver | null = null
  if (typeof win.IntersectionObserver === 'function') {
    io = new win.IntersectionObserver((entries) => {
      visible = entries[entries.length - 1].isIntersecting
      if (visible) schedule()
    })
    io.observe(svg)
  }

  // --- view & projection ---------------------------------------------------------------------------
  let view: View = computeView(cam, o.fit, W, H)
  function setupView() {
    view = computeView(cam, o.fit, W, H)
  }
  function proj(p: PointLike): Vec3 {
    return projectPoint(view, p)
  }

  // --- events --------------------------------------------------------------------------------------
  type AnyHandler = (e: unknown) => void
  let handlers: Record<string, AnyHandler[]> = {}
  function on<K extends keyof StageEvents>(name: K, fn: (e: StageEvents[K]) => void): () => void {
    ;(handlers[name] = handlers[name] || []).push(fn as AnyHandler)
    return () => off(name, fn)
  }
  function off<K extends keyof StageEvents>(name: K, fn: (e: StageEvents[K]) => void): void {
    const l = handlers[name]
    if (!l) return
    const i = l.indexOf(fn as AnyHandler)
    if (i >= 0) l.splice(i, 1)
  }
  function emit<K extends keyof StageEvents>(name: K, payload: StageEvents[K]): void {
    const l = handlers[name]
    if (!l) return
    l.slice().forEach((fn) => {
      try {
        fn(payload)
      } catch (err) {
        console.error(err)
      }
    })
  }

  // --- render loop -----------------------------------------------------------------------------------
  let source: SceneSource = []
  let dirty = false
  let rafId = 0
  let destroyed = false
  let lastLoopT = 0
  let tween: Tween | null = null
  let autoSpeed = reducedMotion() ? 0 : def(options.autoRotate, 0)
  const raf: (f: (t: number) => void) => number = win.requestAnimationFrame
    ? win.requestAnimationFrame.bind(win)
    : (f) => win.setTimeout(() => f(now()), 16)
  const caf: (id: number) => void = win.cancelAnimationFrame ? win.cancelAnimationFrame.bind(win) : (id) => win.clearTimeout(id)

  function requestDraw() {
    dirty = true
    schedule()
  }
  function schedule() {
    if (!rafId && !destroyed) rafId = raf(loop)
  }
  function loop(t: number) {
    rafId = 0
    const dt = lastLoopT ? Math.min(t - lastLoopT, 50) : 16
    lastLoopT = t
    let keepGoing = false
    if (tween) {
      const tw = tween
      if (tw.t0 === null) tw.t0 = t
      const k = clamp((t - tw.t0) / tw.ms, 0, 1)
      applyFields(lerpCamera(tw.from, tw.to, tw.ease(k)), tw.fields)
      if (k >= 1) {
        tween = null
        emit('camera', getCamera())
      } else keepGoing = true
      dirty = true
    }
    if (autoSpeed && !tween) {
      if (visible) {
        cam.yaw = wrapAngle(cam.yaw + autoSpeed * DEG * (dt / 1000))
        dirty = true
      }
      keepGoing = true
    }
    if (dirty && visible) {
      dirty = false
      draw()
    }
    if (keepGoing) schedule()
    else lastLoopT = 0
  }

  function applyCam(c: CameraInput) {
    if (c.yaw !== undefined) cam.yaw = wrapAngle(c.yaw)
    if (c.pitch !== undefined) cam.pitch = clamp(c.pitch, o.pitchRange[0], o.pitchRange[1])
    if (c.zoom !== undefined) cam.zoom = clamp(c.zoom, o.minZoom, o.maxZoom)
    if (c.target) cam.target = [c.target[0], c.target[1], def(c.target[2], 0)]
    if (c.distance !== undefined) cam.distance = Math.max(1.2, c.distance)
    if (c.projection) cam.projection = c.projection
    if (c.pan) cam.pan = [def(c.pan[0], 0), def(c.pan[1], 0)]
  }
  function applyFields(c: Camera, fields: Set<CameraField>) {
    const part: CameraInput = {}
    fields.forEach((f) => {
      ;(part as Record<string, unknown>)[f] = c[f]
    })
    applyCam(part)
  }
  function getCamera(): Camera {
    return {
      yaw: cam.yaw, pitch: cam.pitch, zoom: cam.zoom, target: [cam.target[0], cam.target[1], cam.target[2]],
      projection: cam.projection, distance: cam.distance, pan: [cam.pan[0], cam.pan[1]],
    }
  }
  function animMs(options?: AnimateOptions): number {
    const a = options ? options.animate : undefined
    return a === true ? o.animateMs : typeof a === 'number' && a > 0 ? a : 0
  }
  function setCamera(c: CameraInput, opt?: AnimateOptions) {
    const fields = cameraFields(c)
    const ms = animMs(opt)
    if (ms && !reducedMotion()) {
      // Fields a running tween is animating that this call doesn't set keep their destination.
      const to = getCamera()
      const all = new Set<CameraField>(fields)
      if (tween) {
        const prev = tween
        prev.fields.forEach((f) => {
          if (!all.has(f)) {
            all.add(f)
            ;(to as unknown as Record<string, unknown>)[f] = prev.to[f]
          }
        })
      }
      tween = { from: getCamera(), to: normalizeCamera(c, o, to), fields: all, ms, t0: null, ease: resolveEasing(opt && opt.easing ? opt.easing : o.easing) }
      schedule()
    } else {
      if (tween) {
        for (const f of fields) tween.fields.delete(f)
        if (!tween.fields.size) tween = null
      }
      applyCam(c)
      emit('camera', getCamera())
      requestDraw()
    }
  }
  function cancelTween() {
    if (!tween) return
    tween = null
    emit('camera', getCamera())
  }
  function resetCamera(opt?: AnimateOptions) {
    const a = opt && opt.animate !== undefined ? opt.animate : true
    setCamera({ yaw: home.yaw, pitch: home.pitch, zoom: home.zoom, target: home.target, pan: home.pan }, { animate: a, easing: opt && opt.easing })
  }
  function setHome(c: CameraInput) {
    home = normalizeCamera(c, o, home)
  }
  function zoomBy(factor: number, opt?: AnimateOptions) {
    const base = tween && tween.fields.has('zoom') ? tween.to.zoom : cam.zoom
    setCamera({ zoom: clamp(base * factor, o.minZoom, o.maxZoom) }, opt)
  }

  let interacted = false
  function interaction() {
    tween = null
    if (autoSpeed) autoSpeed = 0
    if (!interacted) {
      interacted = true
      emit('interact', null)
    }
  }
  function setAutoRotate(degPerSec: number) {
    autoSpeed = reducedMotion() ? 0 : degPerSec || 0
    if (autoSpeed) schedule()
  }

  // --- drawing -------------------------------------------------------------------------------------
  let idMap: Record<string, SceneItem> = {}
  let occ: PolyRec[] = [] // occluder records from the last frame
  let grid: (number[] | undefined)[] | null = null
  const GX = 16, GY = 16
  let cellW = 1, cellH = 1
  let eps = 1e-6
  const stats: RenderStats = { polys: 0, polyNodes: 0, segs: 0, lineNodes: 0, points: 0, labels: 0, occluders: 0, hiddenRuns: 0, samples: 0, ms: 0, split: [] }

  function flatten(x: Scene, out: SceneItem[]): SceneItem[] {
    if (!x) return out
    if (Array.isArray(x)) {
      for (let i = 0; i < x.length; i++) flatten(x[i] as Scene, out)
    } else if (typeof x === 'object' && (x as SceneItem).type) {
      out.push(x as SceneItem)
    }
    return out
  }

  function prepPoly(it: PolyItem, order: number): PolyRec | null {
    const P = it.pts
    if (!P || P.length < 3) return null
    const n = P.length
    const xs = new Array<number>(n), ys = new Array<number>(n)
    let dsum = 0, dmax = -Infinity, minx = Infinity, miny = Infinity, maxx = -Infinity, maxy = -Infinity
    for (let k = 0; k < n; k++) {
      const q = proj(P[k])
      xs[k] = q[0]
      ys[k] = q[1]
      dsum += q[2]
      if (q[2] > dmax) dmax = q[2]
      if (q[0] < minx) minx = q[0]
      if (q[0] > maxx) maxx = q[0]
      if (q[1] < miny) miny = q[1]
      if (q[1] > maxy) maxy = q[1]
    }
    const c = vec3.centroid(P)
    const nrm: PointLike | null = it.normal === true ? vec3.normal(P) : it.normal || null
    const front = nrm ? isFacing(view, nrm, c) : null
    const cls = nrm && o.orientSort ? (front ? 2 : 0) : 1
    const occl = it.occluder !== undefined ? !!it.occluder : !(it.fill === 'none' || (it.fillOpacity !== undefined && it.fillOpacity < 0.12))
    const pick = isPickable(it)
    const rec: PolyRec = {
      it, xs, ys, n, depth: dsum / n + (it.depthBias || 0), layer: it.layer || 0, cls, front,
      nrm, order, minx, maxx, miny, maxy, dmax, occ: false, group: String(it.group),
      pick,
      // `cull`: back faces of an opaque solid are not drawn at all (they still hide edges).
      culled: !!it.cull && front === false,
      // Non-pickable, unshaded polygons that look the same and end up next to each other in the
      // draw order share one <path> (far fewer DOM nodes for layer stacks and ghosts).
      key: pick || it.shade || it.merge === false
        ? null
        : [rec0(it.className), cls, rec0(it.fill), rec0(it.fillOpacity), rec0(it.stroke), rec0(it.strokeWidth), rec0(it.strokeOpacity), rec0(it.dash), rec0(it.opacity)].join('|'),
    }
    // A culled back face of a closed solid never hides anything that one of the solid's front faces
    // doesn't already hide (a sight line has to enter the solid before it can leave), so it is
    // skipped as an occluder too.
    if (occl && !rec.culled) {
      const pn = vec3.normal(P)
      if (pn[0] || pn[1] || pn[2]) {
        const pd = vec3.dot(pn, [P[0][0], P[0][1], def(P[0][2], 0)])
        const es = view.persp ? vec3.dot(pn, view.eye) - pd : vec3.dot(pn, view.E)
        if (Math.abs(es) > 1e-9) {
          rec.occ = true
          rec.pn = pn
          rec.pd = pd
          rec.es = es > 0 ? 1 : -1
        }
      }
    }
    return rec
  }

  function cmpPoly(a: PolyRec, b: PolyRec): number {
    return a.layer - b.layer || a.cls - b.cls || a.depth - b.depth || a.order - b.order
  }

  function buildOccluders(polys: PolyRec[]) {
    occ = []
    for (let i = 0; i < polys.length; i++) if (polys[i].occ) occ.push(polys[i])
    const g: (number[] | undefined)[] = new Array(GX * GY)
    cellW = Math.max(W, 1) / GX
    cellH = Math.max(H, 1) / GY
    for (let i = 0; i < occ.length; i++) {
      const r = occ[i]
      const x0 = clamp(Math.floor(r.minx / cellW), 0, GX - 1), x1 = clamp(Math.floor(r.maxx / cellW), 0, GX - 1)
      const y0 = clamp(Math.floor(r.miny / cellH), 0, GY - 1), y1 = clamp(Math.floor(r.maxy / cellH), 0, GY - 1)
      for (let gy = y0; gy <= y1; gy++) {
        for (let gx = x0; gx <= x1; gx++) {
          const idx = gy * GX + gx
          ;(g[idx] = g[idx] || []).push(i)
        }
      }
    }
    grid = g
  }

  function pip(x: number, y: number, xs: number[], ys: number[], n: number): boolean {
    let inside = false
    for (let i = 0, j = n - 1; i < n; j = i++) {
      const yi = ys[i], yj = ys[j]
      if (yi > y !== yj > y && x < ((xs[j] - xs[i]) * (y - yi)) / (yj - yi) + xs[i]) inside = !inside
    }
    return inside
  }

  /** Is world point p (projected to sx, sy) behind an occluder polygon? */
  function occludedAt(p: PointLike, sx: number, sy: number, filter: Record<string, boolean> | null, depth?: number): boolean {
    if (!grid || !occ.length) return false
    const gx = clamp(Math.floor(sx / cellW), 0, GX - 1), gy = clamp(Math.floor(sy / cellH), 0, GY - 1)
    const list = grid[gy * GX + gx]
    if (!list) return false
    stats.samples++
    const pz = def(p[2], 0)
    for (let i = 0; i < list.length; i++) {
      const r = occ[list[i]]
      if (filter && !filter[r.group]) continue
      if (depth !== undefined && r.dmax < depth - eps) continue // wholly behind the point
      if (sx < r.minx || sx > r.maxx || sy < r.miny || sy > r.maxy) continue
      // Signed distance from the face's plane, positive on the viewer's side. The point is behind
      // the face only if it is clearly on the far side (points on the plane, like the face's own
      // edges, are never hidden by it).
      const pn = r.pn as Vec3
      const s = (pn[0] * p[0] + pn[1] * p[1] + pn[2] * pz - (r.pd as number)) * (r.es as number)
      if (s > -eps) continue
      if (pip(sx, sy, r.xs, r.ys, r.n)) return true
    }
    return false
  }

  /** Split segment a→b into [t0, t1, hidden] runs. */
  function segRuns(a: PointLike, b: PointLike, pa: PointLike, pb: PointLike, filter: Record<string, boolean> | null): [number, number, boolean][] {
    const L = Math.sqrt((pb[0] - pa[0]) * (pb[0] - pa[0]) + (pb[1] - pa[1]) * (pb[1] - pa[1]))
    // Very short edges get a single sample at their midpoint.
    const m = clamp(Math.ceil(L / o.sampleSpacing), 1, 48)
    const hiddenAt = (t: number): boolean => {
      const p = vec3.lerp(a, b, t)
      const q = proj(p)
      return occludedAt(p, q[0], q[1], filter, q[2])
    }
    const flags = new Array<boolean>(m)
    for (let i = 0; i < m; i++) flags[i] = hiddenAt((i + 0.5) / m)
    const runs: [number, number, boolean][] = []
    let start = 0, cur = flags[0]
    for (let i = 1; i < m; i++) {
      if (flags[i] === cur) continue
      let lo = (i - 0.5) / m, hi = (i + 0.5) / m
      for (let it = 0; it < 5; it++) {
        const mid = (lo + hi) / 2
        if (hiddenAt(mid) === cur) lo = mid
        else hi = mid
      }
      const tb = (lo + hi) / 2
      runs.push([start, tb, cur])
      start = tb
      cur = flags[i]
    }
    runs.push([start, 1, cur])
    return runs
  }

  /** Draw one polygon, or a run of mergeable polygons (same key, consecutive in draw order). */
  function writePoly(rec: PolyRec, d: string) {
    const it = rec.it
    const lg = getLayer(rec.layer)
    const el = lg.polys.next()
    setA(el, 'd', d)
    setA(el, 'class', 's3d-poly' + (rec.front === true ? ' s3d-front' : rec.front === false ? ' s3d-back' : '') + (rec.pick ? '' : ' s3d-nopick') + (it.className ? ' ' + it.className : ''))
    setA(el, 'data-id', rec.pick ? String(it.id) : null)
    setS(el, 'fill', it.fill)
    setS(el, 'fill-opacity', it.fillOpacity)
    setS(el, 'stroke', it.stroke)
    setS(el, 'stroke-width', px(it.strokeWidth))
    setS(el, 'stroke-opacity', it.strokeOpacity)
    setS(el, 'stroke-dasharray', it.dash)
    setS(el, 'opacity', it.opacity)
    if (it.shade && rec.nrm) {
      // Headlight shading: a dark overlay whose opacity grows as the face turns from the light.
      const n = rec.front === false ? vec3.scale(rec.nrm, -1) : rec.nrm
      const vn: Vec3 = [vec3.dot(n, view.R), vec3.dot(n, view.U), vec3.dot(n, view.E)]
      const lam = Math.max(0, vec3.dot(vn, o.light))
      const amount = it.shade * (1 - (0.35 + 0.65 * lam))
      if (amount > 0.004) {
        const sh = lg.polys.next()
        setA(sh, 'd', d)
        setA(sh, 'class', 's3d-shade')
        setA(sh, 'data-id', null)
        setS(sh, 'fill', 'var(--s3d-shade, #000)')
        setS(sh, 'fill-opacity', Math.round(amount * 1000) / 1000)
        setS(sh, 'stroke', 'none')
        setS(sh, 'stroke-width', null)
        setS(sh, 'stroke-opacity', null)
        setS(sh, 'stroke-dasharray', null)
        setS(sh, 'opacity', null)
      }
    }
  }

  function drawPolys(polys: PolyRec[]): number {
    let i = 0, nodes = 0
    while (i < polys.length) {
      const rec = polys[i]
      if (rec.culled) {
        i++
        continue
      }
      let d = polyD(rec.xs, rec.ys, rec.n)
      let j = i + 1
      if (rec.key !== null) {
        while (j < polys.length) {
          const nx = polys[j]
          if (nx.culled) {
            j++
            continue
          }
          if (nx.key !== rec.key || nx.layer !== rec.layer) break
          d += polyD(nx.xs, nx.ys, nx.n)
          j++
        }
      }
      writePoly(rec, d)
      nodes++
      i = j
    }
    return nodes
  }

  // Lines are drawn in item order after the polygons of their layer. Pickable lines get their own
  // <path> (carrying data-id) plus a fat invisible hit path; non-pickable lines that look the same
  // share one <path>, which is reserved where the first of them appears in the item order.
  let lineGroups: { map: Record<string, LineGroup>; list: LineGroup[] } | null = null

  function lineStyle(el: CachedEl, it: LineLikeItem, hidden: boolean, pickId: string | null) {
    const cls = it.className ? ' ' + it.className : ''
    if (hidden) {
      setA(el, 'class', 's3d-line s3d-hid' + cls + (it.hiddenClassName ? ' ' + it.hiddenClassName : ''))
      setS(el, 'stroke-dasharray', it.hiddenDash)
      setS(el, 'opacity', it.hiddenOpacity !== undefined ? it.hiddenOpacity : it.opacity !== undefined ? Math.round(it.opacity * 55) / 100 : null)
    } else {
      setA(el, 'class', 's3d-line' + cls)
      setS(el, 'stroke-dasharray', it.dash)
      setS(el, 'opacity', it.opacity)
    }
    setA(el, 'data-id', pickId)
    setS(el, 'stroke', it.stroke)
    setS(el, 'stroke-width', px(it.width))
    setS(el, 'stroke-linecap', it.linecap)
  }

  function lineKey(it: LineLikeItem, hidden: boolean): string {
    const k = (hidden ? 'H' : 'V') + (it.layer || 0) + '|' + rec0(it.className) + '|' + rec0(it.stroke) + '|' + rec0(it.width) + '|' + rec0(it.linecap) + '|' + rec0(it.opacity)
    return hidden ? k + '|' + rec0(it.hiddenClassName) + '|' + rec0(it.hiddenDash) + '|' + rec0(it.hiddenOpacity) : k + '|' + rec0(it.dash)
  }

  function addToGroup(it: LineLikeItem, hidden: boolean, d: string) {
    const groups = lineGroups as { map: Record<string, LineGroup>; list: LineGroup[] }
    const key = lineKey(it, hidden)
    let g = groups.map[key]
    if (!g) {
      const lg = getLayer(it.layer || 0)
      g = groups.map[key] = { el: hidden ? lg.hid.next() : lg.vis.next(), it, hidden, d: '' }
      groups.list.push(g)
    }
    g.d += d
  }

  function writeLine(it: LineLikeItem) {
    let pairs: readonly (readonly [PointLike, PointLike])[] | null = null
    let P: readonly PointLike[] | null = null
    if (it.type === 'segs') {
      pairs = it.segs
      if (!pairs || !pairs.length) return
    } else {
      P = it.type === 'seg' ? [it.a, it.b] : it.pts
      if (!P || P.length < 2 || !P[0] || !P[1]) return
    }
    const hs = it.hiddenStyle || 'dash'
    const test = hs !== 'show' && occ.length > 0
    const filter = it.occluders ? setOf(it.occluders) : null
    const vis = makePathBuilder(), hid = makePathBuilder()
    let nseg: number
    let projected: Vec3[] | null = null
    if (pairs) nseg = pairs.length
    else {
      const pts = P as readonly PointLike[]
      projected = pts.map(proj)
      nseg = it.type === 'line' && it.closed ? pts.length : pts.length - 1
    }
    for (let k = 0; k < nseg; k++) {
      let a: PointLike, b: PointLike, pa: PointLike, pb: PointLike
      if (pairs) {
        a = pairs[k][0]
        b = pairs[k][1]
        pa = proj(a)
        pb = proj(b)
      } else {
        const pts = P as readonly PointLike[]
        const pr = projected as Vec3[]
        const k2 = (k + 1) % pts.length
        a = pts[k]
        b = pts[k2]
        pa = pr[k]
        pb = pr[k2]
      }
      if (!test) {
        vis.seg(pa, pb)
        continue
      }
      const runs = segRuns(a, b, pa, pb, filter)
      for (let r = 0; r < runs.length; r++) {
        const run = runs[r]
        const q0 = run[0] === 0 ? pa : proj(vec3.lerp(a, b, run[0]))
        const q1 = run[1] === 1 ? pb : proj(vec3.lerp(a, b, run[1]))
        ;(run[2] ? hid : vis).seg(q0, q1)
        if (run[2]) stats.hiddenRuns++
      }
    }
    const pick = isPickable(it)
    const showHid = !!hid.d && hs === 'dash'
    if (!pick) {
      if (showHid) addToGroup(it, true, hid.d)
      if (vis.d) addToGroup(it, false, vis.d)
      return
    }
    const lg = getLayer(it.layer || 0)
    const id = String(it.id)
    if (showHid) {
      const eh = lg.hid.next()
      setA(eh, 'd', hid.d)
      lineStyle(eh, it, true, id)
      stats.lineNodes++
    }
    if (vis.d) {
      const ev = lg.vis.next()
      setA(ev, 'd', vis.d)
      lineStyle(ev, it, false, id)
      stats.lineNodes++
    }
    const hd = vis.d + (it.pickHidden || hs === 'show' ? hid.d : '')
    if (hd) {
      const ht = hitSegs.next()
      setA(ht, 'd', hd)
      setA(ht, 'class', 's3d-hit')
      setA(ht, 'data-id', id)
      setS(ht, 'fill', 'none')
      setS(ht, 'stroke', 'transparent')
      setS(ht, 'stroke-linecap', 'round')
      setS(ht, 'stroke-linejoin', 'round')
      setS(ht, 'pointer-events', 'stroke')
      setS(ht, 'stroke-width', px(def(it.hitWidth, o.hitWidth)))
    }
  }

  function flushLineGroups() {
    const groups = lineGroups as { list: LineGroup[] }
    for (let i = 0; i < groups.list.length; i++) {
      const g = groups.list[i]
      setA(g.el, 'd', g.d)
      lineStyle(g.el, g.it, g.hidden, null)
      stats.lineNodes++
    }
  }

  function writePt(it: PtItem) {
    if (!it.p) return
    const q = proj(it.p)
    const hs = it.hiddenStyle || 'show'
    const hidden = hs !== 'show' && occludedAt(it.p, q[0], q[1], it.occluders ? setOf(it.occluders) : null, q[2])
    if (hidden && hs === 'hide') return
    const lg = getLayer(it.layer || 0)
    const el = lg.pts.next()
    const r = def(it.r, 3.5)
    setA(el, 'cx', r1(q[0]))
    setA(el, 'cy', r1(q[1]))
    setA(el, 'r', r)
    setA(el, 'class', 's3d-pt' + (hidden ? ' s3d-hid-pt' : '') + (it.className ? ' ' + it.className : ''))
    setS(el, 'fill', it.fill)
    setS(el, 'stroke', it.stroke)
    setS(el, 'stroke-width', px(it.strokeWidth))
    setS(el, 'opacity', it.opacity)
    if (isPickable(it)) {
      const h = hitPts.next()
      setA(h, 'cx', r1(q[0]))
      setA(h, 'cy', r1(q[1]))
      setA(h, 'r', Math.max(r + 6, def(it.hitRadius, o.ptHitRadius)))
      setA(h, 'class', 's3d-hit-pt')
      setA(h, 'data-id', String(it.id))
      setS(h, 'fill', 'transparent')
      setS(h, 'stroke', 'none')
      setS(h, 'pointer-events', 'all')
    }
  }

  function writeLabel(it: LabelItem) {
    if (!it.p) return
    const q = proj(it.p)
    const hs = it.hiddenStyle || 'show'
    const hidden = hs !== 'show' && occludedAt(it.p, q[0], q[1], it.occluders ? setOf(it.occluders) : null, q[2])
    if (hidden && hs === 'hide') return
    const lg = getLayer(it.layer || 0)
    const el = lg.labels.next()
    setA(el, 'x', r1(q[0] + (it.dx || 0)))
    setA(el, 'y', r1(q[1] + (it.dy || 0)))
    setA(el, 'class', 's3d-label' + (hidden ? ' s3d-hid-label' : '') + (it.className ? ' ' + it.className : ''))
    setS(el, 'text-anchor', it.anchor || 'middle')
    setS(el, 'fill', it.fill)
    setS(el, 'font-size', it.size ? it.size + 'px' : null)
    setS(el, 'font-style', it.italic ? 'italic' : null)
    setText(el, it.text)
  }

  function draw() {
    if (destroyed || !W || !H) return
    const t0 = now()
    setupView()
    eps = 1e-6 * o.fit
    stats.samples = 0
    stats.hiddenRuns = 0
    const list = flatten(typeof source === 'function' ? source(api) : source, [])
    const polys: PolyRec[] = [], lines: LineLikeItem[] = [], pts: PtItem[] = [], labels: LabelItem[] = []
    const ids: Record<string, SceneItem> = {}
    for (let i = 0; i < list.length; i++) {
      const it = list[i]
      if (it.id !== undefined && it.id !== null) ids[String(it.id)] = it
      if (it.type === 'poly') {
        const rec = prepPoly(it, i)
        if (rec) polys.push(rec)
      } else if (it.type === 'seg' || it.type === 'line' || it.type === 'segs') lines.push(it)
      else if (it.type === 'pt') pts.push(it)
      else if (it.type === 'label') labels.push(it)
    }
    idMap = ids
    polys.sort(cmpPoly)
    buildOccluders(polys)
    const t1 = now()

    stats.lineNodes = 0
    stats.polyNodes = drawPolys(polys)
    const t2 = now()
    lineGroups = { map: {}, list: [] }
    for (let i = 0; i < lines.length; i++) writeLine(lines[i])
    flushLineGroups()
    lineGroups = null
    const t3 = now()
    for (let i = 0; i < pts.length; i++) writePt(pts[i])
    for (let i = 0; i < labels.length; i++) writeLabel(labels[i])

    for (let i = 0; i < layerKeys.length; i++) {
      const lg = layerGroups[layerKeys[i]]
      lg.polys.end()
      lg.hid.end()
      lg.vis.end()
      lg.pts.end()
      lg.labels.end()
    }
    hitSegs.end()
    hitPts.end()

    stats.polys = polys.length
    stats.segs = lines.length
    stats.points = pts.length
    stats.labels = labels.length
    stats.occluders = occ.length
    const t4 = now()
    stats.ms = Math.round((t4 - t0) * 100) / 100
    stats.split = [t1 - t0, t2 - t1, t3 - t2, t4 - t3].map((v) => Math.round(v * 100) / 100)
    emit('render', Object.assign({}, stats))
  }

  // --- pointer input -------------------------------------------------------------------------------
  const pointers: Record<number, { x: number; y: number }> = {}
  let npointers = 0
  let press: { id: number; x0: number; y0: number; t0: number; target: string | null; dragged: boolean; type: string } | null = null
  let pinchDist = 0
  let lastTap: { t: number; x: number; y: number } | null = null
  let suppressClickUntil = 0
  let hoverId: string | null = null

  function local(e: PointerEvent): Vec2 {
    const r = svg.getBoundingClientRect()
    const sx = r.width ? W / r.width : 1
    const sy = r.height ? H / r.height : 1
    return [(e.clientX - r.left) * sx, (e.clientY - r.top) * sy]
  }
  function idTarget(el: EventTarget | null): string | null {
    const t = el && (el as Element).closest ? (el as Element).closest('[data-id]') : null
    return t && svg.contains(t) ? t.getAttribute('data-id') : null
  }
  function pinchSpan(): number {
    const ks = Object.keys(pointers)
    if (ks.length < 2) return 0
    const a = pointers[+ks[0]], b = pointers[+ks[1]]
    return Math.hypot(a.x - b.x, a.y - b.y)
  }

  function onDown(e: PointerEvent) {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    interaction()
    if (e.pointerType === 'mouse' && document.activeElement !== svg && svg.hasAttribute('tabindex')) {
      try {
        svg.focus({ preventScroll: true })
      } catch {
        /* ignore */
      }
    }
    pointers[e.pointerId] = { x: e.clientX, y: e.clientY }
    npointers = Object.keys(pointers).length
    try {
      svg.setPointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
    if (npointers === 1) {
      press = { id: e.pointerId, x0: e.clientX, y0: e.clientY, t0: now(), target: idTarget(e.target), dragged: false, type: e.pointerType }
    } else if (npointers === 2) {
      if (press) press.dragged = true // a pinch is never a tap
      pinchDist = pinchSpan()
    }
  }

  function onMove(e: PointerEvent) {
    const p = pointers[e.pointerId]
    if (!p) {
      // Not pressed: hover (mouse and pen only).
      if (e.pointerType !== 'touch') setHover(idTarget(e.target))
      return
    }
    const dx = e.clientX - p.x, dy = e.clientY - p.y
    p.x = e.clientX
    p.y = e.clientY
    if (npointers >= 2) {
      const span = pinchSpan()
      if (pinchDist > 0 && span > 0) {
        cam.zoom = clamp(cam.zoom * (span / pinchDist), o.minZoom, o.maxZoom)
        emit('camera', getCamera())
        requestDraw()
      }
      pinchDist = span
      return
    }
    if (!press || press.id !== e.pointerId) return
    if (!press.dragged) {
      const tot = Math.hypot(e.clientX - press.x0, e.clientY - press.y0)
      if (tot < dragThresholdFor(o, press.type)) return
      press.dragged = true
      svg.classList.add('s3d-dragging')
      setHover(null)
    }
    const c = dragCamera(cam, dx, dy, o)
    cam.yaw = c.yaw
    cam.pitch = c.pitch
    emit('camera', getCamera())
    requestDraw()
  }

  function onUp(e: PointerEvent) {
    if (!pointers[e.pointerId]) return
    delete pointers[e.pointerId]
    npointers = Object.keys(pointers).length
    try {
      svg.releasePointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
    if (npointers === 1) pinchDist = 0
    if (!press || press.id !== e.pointerId) {
      if (npointers === 0) press = null
      return
    }
    const g = press
    press = null
    svg.classList.remove('s3d-dragging')
    if (g.dragged || e.type === 'pointercancel') {
      suppressClickUntil = now() + 400
      return
    }
    // A tap or click.
    const t = now()
    const pos = local(e)
    const dbl = lastTap && t - lastTap.t < 330 && Math.hypot(e.clientX - lastTap.x, e.clientY - lastTap.y) < 30
    if (dbl && o.doubleTapReset && (o.doubleTapReset !== 'background' || !g.target)) {
      lastTap = null
      resetCamera()
      emit('reset', null)
      return
    }
    lastTap = { t, x: e.clientX, y: e.clientY }
    const item = g.target !== null ? idMap[g.target] || null : null
    emit('pick', { id: g.target, item, data: item ? item.data : undefined, type: item ? item.type : null, x: pos[0], y: pos[1], pointerType: g.type, originalEvent: e })
  }

  function setHover(id: string | null) {
    if (id === hoverId) return
    hoverId = id
    const item = id !== null ? idMap[id] || null : null
    emit('hover', { id, item, data: item ? item.data : undefined, type: item ? item.type : null })
  }

  function onLeave(e: PointerEvent) {
    if (e.pointerType !== 'touch' && !pointers[e.pointerId]) setHover(null)
  }

  function onClickCapture(e: MouseEvent) {
    if (now() < suppressClickUntil) {
      e.stopPropagation()
      e.preventDefault()
    }
  }

  function onWheel(e: WheelEvent) {
    if (!wheelZooms(o.wheelZoom, e)) {
      if (o.wheelZoom === 'ctrl') emit('wheelIgnored', null)
      return
    }
    e.preventDefault()
    interaction()
    cam.zoom = wheelZoomValue(cam.zoom, e.deltaY, e.deltaMode, o)
    emit('camera', getCamera())
    requestDraw()
  }

  function onKey(e: KeyboardEvent) {
    if (!o.keyboard || e.altKey || e.ctrlKey || e.metaKey) return
    const ch = keyCameraChange(e.key, e.shiftKey, cam, o)
    if (!ch) return
    e.preventDefault()
    interaction()
    if (ch === 'reset') {
      resetCamera()
      return
    }
    applyCam(ch)
    emit('camera', getCamera())
    requestDraw()
  }
  function onDragStart(e: Event) {
    e.preventDefault()
  }

  if (!decorative) {
    svg.addEventListener('pointerdown', onDown)
    svg.addEventListener('pointermove', onMove)
    svg.addEventListener('pointerup', onUp)
    svg.addEventListener('pointercancel', onUp)
    svg.addEventListener('pointerleave', onLeave)
    svg.addEventListener('click', onClickCapture, true)
    svg.addEventListener('wheel', onWheel, { passive: false })
    svg.addEventListener('keydown', onKey)
    svg.addEventListener('dragstart', onDragStart)
  }

  function destroy() {
    if (destroyed) return
    destroyed = true
    if (rafId) caf(rafId)
    rafId = 0
    tween = null
    if (ro) ro.disconnect()
    if (io) io.disconnect()
    win.removeEventListener('resize', onWinResize)
    if (svg.parentNode) svg.parentNode.removeChild(svg)
    handlers = {}
  }

  const api: Stage = {
    svg,
    render(scene) {
      source = scene || []
      requestDraw()
      return api
    },
    renderNow(scene) {
      if (scene !== undefined) source = scene || []
      measure()
      dirty = false
      draw()
      return api
    },
    redraw() {
      requestDraw()
      return api
    },
    on,
    off,
    getCamera,
    setCamera,
    resetCamera,
    setHome,
    getHome: () => normalizeCamera(home, o, home),
    zoomBy,
    zoomIn: (opt) => zoomBy(1 + o.zoomStep, opt),
    zoomOut: (opt) => zoomBy(1 / (1 + o.zoomStep), opt),
    setAutoRotate,
    cancelTween,
    isAnimating: () => !!tween,
    project(p) {
      setupView()
      const q = proj(p)
      return { x: q[0], y: q[1], depth: q[2] }
    },
    facing(normal, point) {
      setupView()
      return isFacing(view, normal, point || cam.target)
    },
    isHidden(p, groups) {
      const q = proj(p)
      return occludedAt(p, q[0], q[1], groups ? setOf(groups) : null, q[2])
    },
    item: (id) => idMap[String(id)] || null,
    size: () => ({ width: W, height: H }),
    resize() {
      if (measure()) requestDraw()
      return api
    },
    destroy,
    get stats() {
      return Object.assign({}, stats, { split: stats.split.slice() })
    },
    get camera() {
      return getCamera()
    },
    get options() {
      return o
    },
  }

  if (autoSpeed) schedule()
  return api
}
