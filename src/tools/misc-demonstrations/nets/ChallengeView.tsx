// Is It a Net?: the six-square pattern on the 3D stage, folding up onto the cube. Before the reveal
// the squares are plain grey and numbered; afterwards each takes the colour of the cube face it lands
// on, squares that land on a face already covered are hatched ("Overlap") and open faces are dashed
// ("Gap"). Same stage set-up, palette and hint pill as the Explore 3D view.
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { createStage, groundGrid, reducedMotion, type Stage, type SceneItem, type Camera } from '../lib/solid3d.ts'
import { foldState, gapPolygons, NET_SHAPES, NETS_PALETTE, type Challenge, type FoldState, type Vec3, type Vec2 } from '../lib/nets.ts'
import { shapeIndex, rgb, mix, dot3, unit3, mean3, labelPt3, area2, type Tokens, type RGB } from './common'

const RAD = Math.PI / 180
const CUBE = NET_SHAPES[0]
/** B's challenge view: a little higher than Explore's, so the flat pattern reads well. */
export const CH_HOME = { yaw: -60 * RAD, pitch: 55 * RAD }
const LIGHT = unit3([-0.45, 0.65, 0.62])
/** The root square never moves, so the pattern sits still on the grid while it folds. */
const FOLD_OPTS = { anchor: 'net' as const }
const HATCH = 'nets-ch-hatch'

export interface ChallengeHandle {
  resetView(): void
  /** Turn the cube so its (first) open face is in view. */
  showGap(): void
}

interface Props {
  ch: Challenge
  t: number
  revealed: boolean
  T: Tokens
  fine: boolean
}

function camBasis(c: { yaw: number; pitch: number }) {
  const cy = Math.cos(c.yaw), sy = Math.sin(c.yaw), cp = Math.cos(c.pitch), sp = Math.sin(c.pitch)
  return { R: [-sy, cy, 0] as Vec3, U: [-sp * cy, -sp * sy, cp] as Vec3, E: [cp * cy, cp * sy, sp] as Vec3 }
}
function hexRgb(h: string): RGB {
  const s = h.replace('#', '')
  return [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)]
}

const ChallengeView = forwardRef<ChallengeHandle, Props>(function ChallengeView(props, ref) {
  const { ch, t, fine } = props
  const boxRef = useRef<HTMLDivElement>(null)
  const hostRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<Stage | null>(null)
  const propsRef = useRef(props)
  propsRef.current = props
  const cacheRef = useRef<{ ch: Challenge | null; t: number; fs: FoldState | null }>({ ch: null, t: -1, fs: null })
  const lastChRef = useRef<Challenge | null>(null)
  const [dragged, setDragged] = useState(false)
  const [wheelHint, setWheelHint] = useState(0)
  const draggingRef = useRef(false)

  function foldAt(tt: number): FoldState {
    const c = cacheRef.current, p = propsRef.current
    if (c.ch !== p.ch || c.t !== tt || !c.fs) cacheRef.current = { ch: p.ch, t: tt, fs: foldState(CUBE.shape, p.ch.net, tt, FOLD_OPTS) }
    return cacheRef.current.fs!
  }
  /** Second squares on the same face are nudged out a little so both show (and don't flicker). */
  function nudged(fs: FoldState, nf: string, pts: Vec3[]): Vec3[] {
    const k = propsRef.current.ch.dupIndex[nf] || 0
    if (!k) return pts
    const n = fs.normals[nf], d = k * 0.06 * fs.t
    return pts.map(q => [q[0] + n[0] * d, q[1] + n[1] * d, q[2] + n[2] * d] as Vec3)
  }

  /** Zoom and target so the pattern fills the stage: ~80% flat, easing to ~62% once closed. */
  function fitFor(tt: number, cam: { yaw: number; pitch: number }): { zoom: number; target: Vec3 } {
    const st = stageRef.current!
    const B = camBasis(cam), fs = foldAt(tt)
    const lo = [Infinity, Infinity], hi = [-Infinity, -Infinity]
    let e = 0, n = 0
    Object.keys(fs.faces).forEach(f => fs.faces[f].forEach(q => {
      const x = dot3(q, B.R), y = dot3(q, B.U)
      lo[0] = Math.min(lo[0], x); hi[0] = Math.max(hi[0], x); lo[1] = Math.min(lo[1], y); hi[1] = Math.max(hi[1], y)
      e += dot3(q, B.E); n++
    }))
    const cx = (lo[0] + hi[0]) / 2, cy = (lo[1] + hi[1]) / 2, ce = e / n
    const target = [0, 1, 2].map(k => B.R[k] * cx + B.U[k] * cy + B.E[k] * ce) as Vec3
    const sz = st.size(), W = sz.width || 1, H = sz.height || 1
    const w = Math.max(hi[0] - lo[0], 1e-6), h = Math.max(hi[1] - lo[1], 1e-6)
    const frac = 0.8 - 0.18 * tt
    const pxPerUnit = Math.min(W / w, H / h) * frac
    // At zoom 1 the world radius `fit` spans half the shorter side.
    const zoom = pxPerUnit / (Math.min(W, H) / (2 * st.options.fit))
    return { zoom, target }
  }
  function applyFit(animate?: number) {
    const st = stageRef.current
    if (!st) return
    const cam = st.getCamera()
    st.setCamera(fitFor(propsRef.current.t, cam), animate ? { animate } : undefined)
  }

  /* ── scene ── */
  function scene(sg: Stage): SceneItem[] {
    const p = propsRef.current
    const { ch, T } = p
    const P = T.dark ? NETS_PALETTE.dark : NETS_PALETTE.light
    const net = ch.net, ix = shapeIndex(CUBE), fs = foldAt(p.t), rev = p.revealed
    const B = camBasis(sg.getCamera())
    const items: SceneItem[] = []
    const neutral = hexRgb(P.neutral), amber = rgb(hexRgb(P.amberLine))
    const proj = (q: Vec3): Vec2 => { const r = sg.project(q); return [r.x, r.y] }
    const shade = (c: RGB, n: Vec3): RGB => {
      const vn: Vec3 = [dot3(n, B.R), dot3(n, B.U), dot3(n, B.E)]
      const lam = Math.max(0, dot3(vn, LIGHT))
      const k = T.dark ? 0.8 + 0.2 * lam : 0.9 + 0.1 * lam
      return [c[0] * k, c[1] * k, c[2] * k]
    }

    // a faint table grid under the flat pattern
    // (lined up with the squares: a corner of the root square, moved by whole squares to the middle)
    const flat = foldAt(0), b = flat.bounds, c0 = flat.faces[net.root][0]
    const snap = (v: number, o: number) => o + Math.round((v - o) / 3) * 3
    const gc: Vec2 = [snap((b.min[0] + b.max[0]) / 2, c0[0]), snap((b.min[1] + b.max[1]) / 2, c0[1])]
    const half = Math.ceil((Math.max(b.max[0] - b.min[0], b.max[1] - b.min[1]) * 0.5 + 3) / 3) * 3
    items.push(...groundGrid({ size: half, step: 1.5, centre: gc, fade: 0.9, stroke: T.dark ? 'rgba(156,163,175,.16)' : 'rgba(107,114,128,.18)' }))

    const faces: Record<string, Vec3[]> = {}
    net.order.forEach(nf => { faces[nf] = nudged(fs, nf, fs.faces[nf]) })

    net.order.forEach(nf => {
      const pts = faces[nf], n = fs.normals[nf], facing = dot3(n, B.E)
      const info = ix.info[net.faceMap[nf]]
      const base: RGB = rev && info ? T.face[info.ci] : neutral
      const col = facing > 0 ? shade(base, n) : mix(base, T.paper, 0.6)
      const fill = rgb(col)
      items.push({ type: 'poly', pts, normal: n, fill, fillOpacity: 1, stroke: fill, strokeWidth: 0.6, pickable: false })
    })

    // Overlaps: hatch every square that shares its face with another square.
    if (rev) ch.overlapFaces.forEach(nf => {
      items.push({ type: 'poly', pts: faces[nf], normal: fs.normals[nf], fill: 'url(#' + HATCH + ')', fillOpacity: 1, stroke: 'none', occluder: false, pickable: false, depthBias: 1e-3, merge: false })
      items.push({ type: 'line', pts: faces[nf], closed: true, stroke: amber, width: 3, hiddenStyle: 'hide' })
    })

    // Edges: cut edges solid grey, fold lines darker and thinner.
    net.netEdges.forEach(ne => {
      const Q = faces[ne.face], a = Q[ne.i], c = Q[(ne.i + 1) % Q.length]
      const cut = ne.kind === 'cut'
      items.push({ type: 'seg', a, b: c, stroke: rgb(cut ? T.fold : T.edge3d), width: cut ? 1.5 : 1.25, opacity: cut ? 1 : 0.8, hiddenStyle: 'hide', pickable: false })
    })

    // Gaps: the open faces, once it's closed.
    if (rev && p.t >= 0.95) gapPolygons(ch, FOLD_OPTS).forEach(g => {
      items.push({ type: 'poly', pts: g.pts, fill: rgb(hexRgb(P.amberHatch)), fillOpacity: 0.1, stroke: 'none', occluder: false, pickable: false, layer: 1 })
      items.push({ type: 'line', pts: g.pts, closed: true, stroke: amber, width: 2, dash: '5 4', hiddenStyle: 'show', layer: 1 })
      items.push({ type: 'label', p: mean3(g.pts), text: 'Gap', className: 'callout', fill: T.dark ? '#fcd34d' : '#92400e', hiddenStyle: 'show', layer: 1 })
    })

    // Square numbers before the reveal; face names (or Overlap) after.
    net.order.forEach(nf => {
      const pts = faces[nf], facing = dot3(fs.normals[nf], B.E)
      // Flat or part-folded, either side of the paper can be labelled; once closed, only the
      // outsides (an inside seen through a gap would sit on top of the Gap label).
      if ((p.t >= 0.95 ? facing : Math.abs(facing)) <= 0.25 || area2(pts.map(proj)) < 1400) return
      const info = ix.info[net.faceMap[nf]]
      const text = !rev ? String(ch.squareNo[nf]) : ch.overlapFaces.indexOf(nf) >= 0 ? 'Overlap' : info ? info.name : ''
      if (!text) return
      items.push({ type: 'label', p: labelPt3(pts), text, className: 'f-label', size: rev ? undefined : 15, hiddenStyle: 'hide', pickable: false })
    })
    return items
  }

  /* ── create the stage once ── */
  useEffect(() => {
    const host = hostRef.current, box = boxRef.current
    if (!host || !box) return
    const st = createStage(host, {
      height: box.clientHeight || 280, fit: 4, minZoom: 0.05, maxZoom: 6,
      pitchRange: [-80 * RAD, 85 * RAD], rotateSpeedX: 0.5, rotateSpeedY: 0.5, wheelZoom: 'ctrl', doubleTapReset: false,
      orientSort: false, role: 'img', roleDescription: 'interactive 3D view',
      label: 'Six-square pattern, flat. Drag or use the arrow keys to turn it.',
      camera: { yaw: CH_HOME.yaw, pitch: CH_HOME.pitch, zoom: 1, target: [0, 0, 0], projection: 'orthographic' },
    })
    stageRef.current = st
    // The hatch pattern for overlaps (stroke colour set per theme below).
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
    defs.innerHTML = '<pattern id="' + HATCH + '" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="7" stroke-width="3" stroke-opacity=".4"/></pattern>'
    st.svg.insertBefore(defs, st.svg.firstChild)
    applyFit()
    lastChRef.current = propsRef.current.ch
    st.render(scene)
    const offs = [
      st.on('camera', () => { if (draggingRef.current) setDragged(true) }),
      st.on('wheelIgnored', () => setWheelHint(n => n + 1)),
    ]
    const down = () => { draggingRef.current = true }
    const up = () => { draggingRef.current = false }
    st.svg.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
    const ro = new ResizeObserver(() => {
      const h = box.clientHeight
      if (h && st.options.height !== h) { st.options.height = h; st.resize() }
      applyFit()
      st.redraw()
    })
    ro.observe(box)
    return () => {
      offs.forEach(f => f())
      ro.disconnect()
      st.svg.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
      st.destroy()
      stageRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ── new pattern: home view; fold changes: refit ── */
  useEffect(() => {
    const st = stageRef.current
    if (!st) return
    if (lastChRef.current !== ch) {
      lastChRef.current = ch
      st.cancelTween()
      st.setCamera({ yaw: CH_HOME.yaw, pitch: CH_HOME.pitch, ...fitFor(t, CH_HOME) })
    } else if (!st.isAnimating()) applyFit()
    const pct = Math.round(t * 100)
    st.svg.setAttribute('aria-label', 'Six-square pattern, ' + (pct === 0 ? 'flat' : pct + '% folded') + '. Drag or use the arrow keys to turn it.')
    st.redraw()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ch, t])

  // Theme and reveal just redraw (the hatch follows the theme's amber).
  useEffect(() => {
    const st = stageRef.current
    if (!st) return
    const line = st.svg.querySelector('#' + HATCH + ' line')
    if (line) line.setAttribute('stroke', props.T.dark ? NETS_PALETTE.dark.amberHatch : NETS_PALETTE.light.amberHatch)
    st.redraw()
  })

  useEffect(() => {
    if (!wheelHint) return
    const id = window.setTimeout(() => setWheelHint(0), 1800)
    return () => window.clearTimeout(id)
  }, [wheelHint])

  useImperativeHandle(ref, () => ({
    resetView() {
      const st = stageRef.current
      if (!st) return
      st.setCamera({ ...CH_HOME, ...fitFor(propsRef.current.t, CH_HOME) }, { animate: 350 })
    },
    showGap() {
      const st = stageRef.current, p = propsRef.current
      if (!st || !p.ch.missing.length) return
      const g = gapPolygons(p.ch, FOLD_OPTS)[0]
      const centre = foldAt(1).bounds, c: Vec3 = [0, 1, 2].map(k => (centre.min[k] + centre.max[k]) / 2) as Vec3
      const m = mean3(g.pts), d = unit3([m[0] - c[0], m[1] - c[1], m[2] - c[2]])
      const cam: Camera = st.getCamera()
      if (dot3(d, camBasis(cam).E) >= 0.3) return
      const yaw = Math.abs(d[2]) > 0.97 ? cam.yaw : Math.atan2(d[1], d[0]) + 20 * RAD
      const pitch = Math.max(-80 * RAD, Math.min(80 * RAD, Math.asin(Math.max(-1, Math.min(1, d[2]))) + 25 * RAD))
      st.setCamera({ yaw, pitch, ...fitFor(p.t, { yaw, pitch }) }, { animate: reducedMotion() ? false : 600 })
    },
  }))

  const hintText = wheelHint ? 'Ctrl + scroll to zoom' : fine ? 'Drag to turn · Ctrl + scroll to zoom' : 'Drag to turn'
  return (
    <div ref={boxRef} className="nets-stage relative rounded-lg overflow-hidden" style={{ touchAction: 'none' }}>
      <div ref={hostRef} className="absolute inset-0" />
      {(wheelHint > 0 || !dragged) && (
        <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400 bg-white/85 dark:bg-gray-900/85 rounded-full px-2 py-0.5 pointer-events-none">
          <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.5 8a5.5 5.5 0 1 0 1.8-4.1" /><path d="M2.3 1.8v2.6h2.6" /></svg>
          {hintText}
        </div>
      )}
    </div>
  )
})

export default ChallengeView
