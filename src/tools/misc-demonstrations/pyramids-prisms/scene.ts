// The 3D scene for the Pyramids & Prisms stage: geometry (model.ts) + state → engine items. Called
// at draw time with the live stage, so labels and silhouettes follow the camera.
import { groundGrid, modelItems, vec3, type FaceStyle, type PrismModel, type PyramidModel, type Scene, type Stage, type Vec3 } from '../lib/solid3d.ts'
import { DEG, PAIRS, PIECES, TRI_PRISM, cornersOf, f1, pullT, type FrustumModel, type PPGeometry, type PPState, type PrismCorner } from './model.ts'

export interface SceneOptions {
  /** A slow frame during a drag: draw only the layer caps until pointer-up. */
  heavy?: boolean
  /** Lesson step 2: in a side-on view, measure z and h − z on a bracket beside the pyramid and
   *  label the base and slice widths, instead of labelling the height line. */
  bracket?: boolean
}

type StateBits = Pick<PPState, 'solid' | 'layerMode' | 'slant'>

export function buildScene(g: PPGeometry, st: StateBits, stg: Stage, opts: SceneOptions = {}): Scene {
  const it: Scene[] = []
  const cam = stg.getCamera()
  const R = [-Math.sin(cam.yaw), Math.cos(cam.yaw)] // screen-right, on the floor
  const em = g.curvy ? 'auto' : 'all'
  const layersOn = g.n > 0 && !!g.layerModels
  const prismMode = st.solid === 'prism'
  const nested = st.solid === 'both' && !g.side
  const inside = layersOn && !prismMode && st.layerMode === 'inside'
  const frontL = inside ? 1 : 0 // an inside stack: the pyramid's front faces are drawn over it
  const stackL = inside ? 0 : 1
  const lifting = !!g.frustum // the top piece is up (or on its way)
  it.push(groundGrid({ size: g.gridSize, fade: 0.6 }))

  // Prism: solid, or the dashed ghost in Both → Nested
  if (g.pri) {
    if (nested) {
      it.push(modelItems(g.pri, { pickable: false, edges: em, stage: stg, face: () => null, edge: { className: 'e-ghost', hiddenStyle: 'show', layer: 1 } }))
    } else {
      const pf = layersOn && prismMode ? ' f-faint' : ''
      it.push(
        modelItems(g.pri, {
          pickable: false,
          group: 'pri',
          edges: em,
          stage: stg,
          face: { className: 'f-prism' + pf },
          edge: { className: 'e-prism', occluders: ['pri', 'pyr'] },
        }),
      )
    }
  }

  // Pyramid: whole, or the frustum + the lifted top piece
  if (g.pyr) {
    const faint = layersOn ? ' f-faint' : ''
    const drawPyr = (m: PyramidModel | FrustumModel, isTop: boolean) => {
      it.push(
        modelItems<PyramidModel | FrustumModel>(m, {
          pickable: false,
          group: 'pyr',
          edges: em,
          stage: stg,
          face: (f): FaceStyle => {
            const front = stg.facing(f.normal, f.centroid)
            const cls = f.kind === 'side' ? 'f-pyr' + faint : f.kind === 'top' || isTop ? 'f-slice' : 'f-pyr-base' + faint
            return { className: cls, layer: front ? frontL : 0 }
          },
          edge: (e) => {
            const sl = e.kind === 'top' || (isTop && e.kind === 'base')
            return { className: sl ? 'e-slice' : 'e-pyr', occluders: ['pyr', 'pri'], layer: frontL }
          },
        }),
      )
    }
    if (g.frustum && g.top) {
      drawPyr(g.frustum, false)
      drawPyr(g.top, true)
    } else drawPyr(g.pyr, false)
    if (g.curvy && !lifting) {
      for (let gi = 0; gi < g.pyr.base3D.length; gi += 9) {
        it.push({ type: 'seg', a: g.pyr.base3D[gi], b: g.pyr.apex, className: 'e-gen', hiddenStyle: 'hide', occluders: ['pyr'], pickable: false, layer: frontL })
      }
    }
    // The slice. Hidden while layers are shown, so it doesn't clutter the stack.
    if (!lifting && g.slice2D && !layersOn) {
      const zd = Math.max(g.z, 0.02)
      const P3 = g.slice2D.map((p): Vec3 => [p[0] + g.dxP, p[1], zd])
      it.push({ type: 'poly', pts: P3, className: 'f-slice', occluder: false, pickable: false })
      it.push({ type: 'line', pts: P3, closed: true, className: 'e-slice', hiddenStyle: 'show', pickable: false, layer: frontL })
    }
  }
  if (g.pri && !layersOn) {
    const zq = Math.max(g.z, 0.02)
    const Q3 = g.priSlice2D.map((p): Vec3 => [p[0] + g.dxQ, p[1], zq])
    if (nested) {
      it.push({ type: 'line', pts: Q3, closed: true, className: 'e-ghost', hiddenStyle: 'show', pickable: false, layer: 1 })
    } else {
      it.push({ type: 'poly', pts: Q3, className: 'f-slice', occluder: false, pickable: false })
      it.push({ type: 'line', pts: Q3, closed: true, className: 'e-slice', hiddenStyle: 'show', pickable: false })
    }
  }

  // Layer stack
  if (layersOn && g.layerModels) {
    // Curvy layers: no per-edge strokes (72 short edges a slab is too slow), just each cap's rim
    const em2 = g.n > 12 || g.curvy ? 'none' : em
    g.layerModels.forEach((m: PrismModel) => {
      if (g.curvy && g.n <= 12) {
        it.push({ type: 'line', pts: m.faces[1].pts, closed: true, className: 'e-layer', occluders: ['stack'], hiddenStyle: 'hide', pickable: false, layer: stackL })
      }
      it.push(
        modelItems(m, {
          pickable: false,
          group: 'stack',
          edges: em2,
          stage: stg,
          face: (f) => (opts.heavy && f.kind !== 'top' ? null : { className: 'f-layer', cull: true, layer: stackL }),
          edge: { className: 'e-layer', occluders: ['stack'], hiddenStyle: 'hide', layer: stackL },
        }),
      )
    })
  }

  // Perpendicular height, right-angle marker, h and z labels. All hidden while the top is lifted,
  // so nothing floats in the gap.
  const sideish = cam.pitch < 12 * DEG
  const bracket = !!opts.bracket && sideish && !!g.pyr && !lifting
  const heightLine = (ax: number, labelZ: boolean) => {
    const A: Vec3 = [ax, 0, g.h]
    const F: Vec3 = [ax, 0, 0]
    const m = 0.4
    it.push({ type: 'seg', a: A, b: F, className: 'g-h', hiddenStyle: 'show', layer: 2 })
    it.push({ type: 'line', pts: [[ax + R[0] * m, R[1] * m, 0], [ax + R[0] * m, R[1] * m, m], [ax, 0, m]], className: 'g-ra', hiddenStyle: 'show', layer: 2 })
    const pA = stg.project(A)
    const pF = stg.project(F)
    const pZ = stg.project([ax, 0, g.z])
    const dist = (p: { x: number; y: number }, q: { x: number; y: number }) => Math.hypot(p.x - q.x, p.y - q.y)
    // h at the midpoint, nudged off the slice level so it never sits on the z tick
    let hz = g.h / 2
    if (sideish) hz = Math.abs(g.z - 0.2 * g.h) > 0.08 * g.h ? 0.2 * g.h : 0.36 * g.h // low, clear of the slant line
    else if (Math.abs(g.z - hz) < 0.14 * g.h) hz = g.z > 0.5 * g.h ? g.z - 0.22 * g.h : g.z + 0.22 * g.h
    if (dist(pA, pF) >= 24 && !bracket) it.push({ type: 'label', p: [ax, 0, hz], text: 'h', italic: true, dx: 12, className: 'l-h', layer: 2 })
    it.push({ type: 'seg', a: [ax - R[0] * 0.32, -R[1] * 0.32, g.z], b: [ax + R[0] * 0.32, R[1] * 0.32, g.z], className: 'g-tick', hiddenStyle: 'show', layer: 2 })
    if (!labelZ || bracket) return
    if (sideish && dist(pA, pF) >= 24) {
      // Side View: label the two gaps, so k = (h − z)/h reads straight off the similar triangles
      if (dist(pZ, pF) >= 18) it.push({ type: 'label', p: [ax, 0, g.z / 2], text: 'z', italic: true, dx: -14, anchor: 'end', className: 'l-z', layer: 2 })
      if (dist(pZ, pA) >= 18) it.push({ type: 'label', p: [ax, 0, (g.z + g.h) / 2], text: 'h − z', italic: true, dx: -14, anchor: 'end', className: 'l-z l-small', layer: 2 })
    } else if (dist(pZ, pF) >= 14 && dist(pZ, pA) >= 14) {
      it.push({ type: 'label', p: [ax, 0, g.z], text: 'z', italic: true, dx: -14, className: 'l-z', layer: 2 })
    }
  }
  const footCross = (ax: number) => {
    const c = 0.28
    it.push({ type: 'segs', segs: [[[ax - c, -c, 0], [ax + c, c, 0]], [[ax - c, c, 0], [ax + c, -c, 0]]], className: 'g-ra', hiddenStyle: 'show', layer: 2 })
  }
  if (g.pyr) {
    if (!lifting) {
      heightLine(g.s + g.dxP, true)
      if (g.fOutside) footCross(g.s + g.dxP)
    }
    const apexP: Vec3 = [g.s + g.dxP, 0, g.h + (lifting ? g.liftOff : 0)]
    it.push({ type: 'pt', p: apexP, r: g.atApex ? 5 : 3.5, className: 'p-apex' + (g.atApex ? ' is-slice' : ''), layer: 2 })
  }
  if (g.pri && (!g.pyr || g.side)) {
    heightLine(g.s + g.dxQ, !g.pyr)
    if (g.fOutside) footCross(g.s + g.dxQ)
  }

  if (bracket) it.push(bracketItems(g))

  // Slant Length (pyramid: the front face's slant height) or the slanted edge (prism)
  if (st.slant && !lifting) {
    if (g.pyr) {
      const A0: Vec3 = [g.s + g.dxP, 0, g.h]
      const foot: Vec3 = [g.slant.foot[0] + g.dxP, g.slant.foot[1], 0]
      if (g.slant.edge && !g.slant.onEdge) {
        // The apex has slid past the end of the front edge: extend the edge's line to the foot
        const [a, b] = g.slant.edge
        const da = Math.hypot(a[0] - g.slant.foot[0], a[1] - g.slant.foot[1])
        const db = Math.hypot(b[0] - g.slant.foot[0], b[1] - g.slant.foot[1])
        const end = da < db ? a : b
        it.push({ type: 'seg', a: [end[0] + g.dxP, end[1], 0], b: foot, className: 'g-slant-ext', hiddenStyle: 'show', layer: 2 })
      }
      it.push({ type: 'seg', a: A0, b: foot, className: 'g-slant', hiddenStyle: 'show', layer: 2 })
      it.push({ type: 'pt', p: foot, r: 3, className: 'p-slant', layer: 2 })
      it.push({ type: 'label', p: vec3.mid(A0, foot), text: 'l', italic: true, dx: 13, dy: -6, className: 'l-slant', layer: 2 })
    } else {
      const e0 = g.edgeV
      const e1: Vec3 = [e0[0] + g.s, e0[1], g.h]
      it.push({ type: 'seg', a: e0, b: e1, className: 'g-slant', hiddenStyle: 'show', layer: 2 })
      it.push({ type: 'label', p: vec3.mid(e0, e1), text: f1(g.edgeL), dx: -16, className: 'l-slant l-small', layer: 2 })
    }
  }
  return it
}

/** Lesson step 2, side on: a bracket left of the pyramid splits h into z (ink) and h − z (orange),
 *  a dashed line carries the slice level across, and the base and slice widths are labelled, so
 *  k = (h − z)/h reads straight off the similar triangles. Square base: half-width 2. */
function bracketItems(g: PPGeometry): Scene {
  const xb = Math.min(...g.base.map((p) => p[0])) - 0.9
  const half = Math.max(...g.base.map((p) => p[0]))
  const tk = 0.18
  const it: Scene[] = [
    { type: 'seg', a: [xb, 0, 0], b: [xb, 0, g.z], className: 'g-brk', hiddenStyle: 'show', layer: 2 },
    { type: 'seg', a: [xb, 0, g.z], b: [xb, 0, g.h], className: 'g-brk-z', hiddenStyle: 'show', layer: 2 },
    { type: 'segs', segs: [[[xb - tk, 0, 0], [xb + tk, 0, 0]], [[xb - tk, 0, g.h], [xb + tk, 0, g.h]]], className: 'g-brk', hiddenStyle: 'show', layer: 2 },
    { type: 'seg', a: [xb - tk, 0, g.z], b: [xb + tk, 0, g.z], className: 'g-brk-z', hiddenStyle: 'show', layer: 2 },
    { type: 'seg', a: [xb + tk, 0, g.z], b: [g.s + half * g.k, 0, g.z], className: 'g-brk-z', dash: '2 3', hiddenStyle: 'show', layer: 2 },
    { type: 'label', p: [0, Math.min(...g.base.map((p) => p[1])), 0], text: f1(2 * half), dy: 16, className: 'l-ink l-small', layer: 2 },
  ]
  if (g.z > 0.25) it.push({ type: 'label', p: [xb, 0, g.z / 2], text: 'z', italic: true, dx: -9, anchor: 'end', className: 'l-ink', layer: 2 })
  if (g.h - g.z > 0.25) it.push({ type: 'label', p: [xb, 0, (g.z + g.h) / 2], text: 'h − z', italic: true, dx: -9, anchor: 'end', className: 'l-z', layer: 2 })
  if (g.k > 1e-9) it.push({ type: 'label', p: [g.s + half * g.k, 0, g.z], text: `k × ${f1(2 * half)} = ${f1(2 * half * g.k)}`, dx: 9, anchor: 'start', className: 'l-z l-small', layer: 2 })
  return it
}

// ------------------------------------------------------------------------------------------------
// Lesson step 5: the triangular prism cut into three pyramids
// ------------------------------------------------------------------------------------------------

export interface DissectionState {
  /** Pull Apart, 0…100. */
  pull: number
  /** Why Equal?: the pair lit up, or null. */
  pair: 1 | 2 | null
}

/** The three pieces, numbered and coloured, moved apart by `pull`. With a pair picked, the other
 *  piece is dimmed and the two equal faces are lit; at pull 0 the prism's corners are lettered. */
export function dissectionScene(d: DissectionState): Scene {
  const t = pullT(d.pull)
  const pair = d.pair ? PAIRS[d.pair] : null
  const it: Scene[] = [groundGrid({ size: 8, fade: 0.6 })]
  for (const pc of PIECES) {
    const off = vec3.scale(pc.push, t)
    const P = cornersOf(pc).map((c) => vec3.add(c, off))
    const involved = !pair || pair.pieces.includes(pc.n)
    const hlKey = pair ? pair.faces[pc.n] : undefined
    const dim = involved ? '' : ' is-dim'
    const cls = 'p' + pc.n
    for (const f of pc.faces) {
      const pts = f.idx.map((q) => P[q])
      const hl = hlKey === f.key
      it.push({ type: 'poly', pts, normal: true, group: 'piece' + pc.n, className: `${cls}-face${hl ? ' is-hl' : ''}${dim}`, merge: false, pickable: false })
      if (hl) it.push({ type: 'line', pts, closed: true, className: `${cls}-edge hl-edge`, hiddenStyle: 'show', layer: 1, pickable: false })
    }
    for (const [a, b] of [[0, 1], [0, 2], [0, 3], [1, 2], [1, 3], [2, 3]]) {
      it.push({ type: 'seg', a: P[a], b: P[b], className: `${cls}-edge${dim}`, occluders: ['piece' + pc.n], pickable: false })
    }
    const c = vec3.add(pc.centroid, off)
    it.push({ type: 'pt', p: c, r: 10, className: `badge b${pc.n}${dim}`, layer: 2, hiddenStyle: 'show' })
    it.push({ type: 'label', p: c, text: String(pc.n), className: `badge-num${dim}`, layer: 2, hiddenStyle: 'show' })
    if (pair && involved) {
      // Each piece's apex for the pair: F, except piece 3 in pair 1 (apex A, base DEF)
      const apex: PrismCorner = pc.n === 3 && d.pair === 1 ? 'A' : 'F'
      it.push({ type: 'pt', p: vec3.add(TRI_PRISM[apex], off), r: 4, className: 'p-apex', layer: 2 })
    }
  }
  if (d.pull === 0) {
    for (const L of Object.keys(TRI_PRISM) as PrismCorner[]) {
      const p = TRI_PRISM[L]
      const n = vec3.norm([p[0], p[1], 0])
      it.push({ type: 'label', p: [p[0] + n[0] * 0.5, p[1] + n[1] * 0.5, p[2]], text: L, className: 'l-vtx', layer: 2, hiddenStyle: 'show' })
    }
  }
  return it
}
