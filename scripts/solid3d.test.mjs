// Unit tests for the pure parts of src/tools/misc-demonstrations/lib/solid3d.ts (node 24 strips the
// TypeScript types natively). Run from math-tools/: node scripts/solid3d.test.mjs
// Ported from scratch/misc-demos/shared/_solid3d.test.cjs, plus tests for the 0.2.0 stage options.
import { readFileSync } from 'node:fs'
import * as S from '../src/tools/misc-demonstrations/lib/solid3d.ts'

let pass = 0
let fail = 0
function ok(cond, msg) {
  if (cond) pass++
  else {
    fail++
    console.log('FAIL:', msg)
  }
}
function near(a, b, tol, msg) {
  ok(Math.abs(a - b) <= tol, `${msg}: got ${a}, expected ${b} (±${tol})`)
}
const DEG = Math.PI / 180

// --- Independent checks (not using the library's own predicates) -------------------------------
function cross(o, a, b) {
  return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
}
function properOrTouch(p1, p2, p3, p4) {
  const d1 = cross(p3, p4, p1), d2 = cross(p3, p4, p2), d3 = cross(p1, p2, p3), d4 = cross(p1, p2, p4)
  if (d1 * d2 < 0 && d3 * d4 < 0) return true
  const onSeg = (a, b, p) => Math.min(a[0], b[0]) <= p[0] && p[0] <= Math.max(a[0], b[0]) && Math.min(a[1], b[1]) <= p[1] && p[1] <= Math.max(a[1], b[1])
  if (d1 === 0 && onSeg(p3, p4, p1)) return true
  if (d2 === 0 && onSeg(p3, p4, p2)) return true
  if (d3 === 0 && onSeg(p1, p2, p3)) return true
  if (d4 === 0 && onSeg(p1, p2, p4)) return true
  return false
}
function selfIntersects(P) {
  const n = P.length
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (Math.abs(i - j) <= 1 || (i === 0 && j === n - 1) || (j === 0 && i === n - 1)) continue
      if (properOrTouch(P[i], P[(i + 1) % n], P[j], P[(j + 1) % n])) return true
    }
  }
  return false
}
function shoelace(P) {
  let s = 0
  for (let i = 0; i < P.length; i++) {
    const a = P[i], b = P[(i + 1) % P.length]
    s += a[0] * b[1] - b[0] * a[1]
  }
  return s / 2
}
/** Volume by the divergence theorem: V = ⅓ Σ area_f (n_f · c_f). Only right if normals point out. */
function divergenceVolume(model) {
  let v = 0
  for (const f of model.faces) {
    // vector area (Newell) / 2 = area × unit normal
    let nx = 0, ny = 0, nz = 0
    const P = f.pts
    for (let i = 0; i < P.length; i++) {
      const a = P[i], b = P[(i + 1) % P.length]
      nx += (a[1] - b[1]) * (a[2] + b[2])
      ny += (a[2] - b[2]) * (a[0] + b[0])
      nz += (a[0] - b[0]) * (a[1] + b[1])
    }
    const p0 = P[0]
    v += (nx * p0[0] + ny * p0[1] + nz * p0[2]) / 2
    // also: the model's stored unit normal must agree with the winding
    const l = Math.hypot(nx, ny, nz)
    if (l > 1e-12) ok(Math.abs((nx * f.normal[0] + ny * f.normal[1] + nz * f.normal[2]) / l - 1) < 1e-9, `normal of ${f.id} matches winding`)
  }
  return v / 3
}

// --- module hygiene -------------------------------------------------------------------------------
ok(typeof document === 'undefined', 'node has no DOM, and importing solid3d.ts worked anyway')
ok(S.version === '0.2.0', 'version')
let threw = false
try { S.createStage('#x') } catch (e) { threw = /browser DOM/.test(String(e && e.message)) }
ok(threw, 'createStage throws a clear error without a DOM')
ok(S.reducedMotion() === false, 'reducedMotion is false outside a browser')

// --- polygonArea / signedArea / centroid2D ------------------------------------------------------
const sq = [[0, 0], [1, 0], [1, 1], [0, 1]]
near(S.polygonArea(sq), 1, 1e-12, 'unit square area')
near(S.polygonArea(sq, true), 1, 1e-12, 'unit square signed (CCW)')
near(S.signedArea(sq.slice().reverse()), -1, 1e-12, 'unit square signed (CW)')
near(S.polygonArea(sq.slice().reverse()), 1, 1e-12, 'abs area of CW square')
near(S.polygonArea([[0, 0], [4, 0], [0, 3]]), 6, 1e-12, '3-4-5 triangle area')
near(S.polygonArea(S.regularPolygon(6, 1)), (3 * Math.sqrt(3)) / 2, 1e-12, 'regular hexagon area')
near(S.polygonArea(S.regularPolygon(4, Math.SQRT2)), 4, 1e-12, 'regularPolygon(4, √2) is a 2×2 square')
const sq4 = S.regularPolygon(4, Math.SQRT2)
ok(sq4.every((p) => Math.abs(Math.abs(p[0]) - 1) < 1e-12 && Math.abs(Math.abs(p[1]) - 1) < 1e-12), 'regularPolygon(4) is axis-aligned')
ok(S.signedArea(S.regularPolygon(7, 2)) > 0, 'regularPolygon is CCW')
const rc = S.regularPolygon(4, 1, { centre: [5, -2] })
near(S.centroid2D(rc)[0], 5, 1e-12, 'regularPolygon centre x')
near(S.centroid2D(rc)[1], -2, 1e-12, 'regularPolygon centre y')
const L = [[0, 0], [2, 0], [2, 1], [1, 1], [1, 2], [0, 2]]
near(S.polygonArea(L), 3, 1e-12, 'L-shape area')
const cL = S.centroid2D(L)
near(cL[0], 2.5 / 3, 1e-12, 'L-shape centroid x')
near(cL[1], 2.5 / 3, 1e-12, 'L-shape centroid y')
const cS = S.centroid2D([[0, 0], [2, 0], [2, 2], [0, 2]])
ok(cS[0] === 1 && cS[1] === 1, 'square centroid')
// circle-ish: 1000-gon area → πr²
near(S.polygonArea(S.regularPolygon(1000, 2)), Math.PI * 4, 1e-3, '1000-gon ≈ πr²')
ok(S.reflexCount(L) === 1 && S.reflexCount(sq) === 0, 'reflexCount: L has one reflex corner, square none')
ok(S.ensureCCW(sq.slice().reverse())[0] !== undefined && S.signedArea(S.ensureCCW(sq.slice().reverse())) > 0, 'ensureCCW')
ok(S.segmentsIntersect([0, 0], [2, 2], [0, 2], [2, 0]) && !S.segmentsIntersect([0, 0], [1, 0], [0, 1], [1, 1]), 'segmentsIntersect')
ok(!S.isSimplePolygon([[0, 0], [2, 2], [2, 0], [0, 2]]), 'bow-tie is not simple')

// --- randomBlob ---------------------------------------------------------------------------------
let minV = 99, maxV = 0, minReflex = 99
const areas = []
for (let seed = 1; seed <= 200; seed++) {
  const P = S.randomBlob(seed)
  minV = Math.min(minV, P.length)
  maxV = Math.max(maxV, P.length)
  ok(P.length >= 7 && P.length <= 11, `seed ${seed}: 7–11 vertices (got ${P.length})`)
  ok(!selfIntersects(P), `seed ${seed}: simple (no self-intersection)`)
  ok(S.isSimplePolygon(P), `seed ${seed}: library isSimplePolygon agrees`)
  ok(shoelace(P) > 0, `seed ${seed}: CCW`)
  // non-convex: at least one reflex corner (independent check)
  let reflex = 0
  for (let i = 0; i < P.length; i++) if (cross(P[(i + P.length - 1) % P.length], P[i], P[(i + 1) % P.length]) < 0) reflex++
  minReflex = Math.min(minReflex, reflex)
  ok(reflex >= 1, `seed ${seed}: non-convex`)
  const c = S.centroid2D(P)
  ok(Math.hypot(c[0], c[1]) < 1e-9, `seed ${seed}: centroid at origin`)
  // star-shaped about the centroid (independent): every edge turns positively about the origin
  let star = true
  for (let i = 0; i < P.length; i++) if (cross([0, 0], P[i], P[(i + 1) % P.length]) <= 0) star = false
  ok(star, `seed ${seed}: star-shaped about centroid`)
  areas.push(S.polygonArea(P))
}
ok(minV === 7 && maxV === 11, `vertex counts span 7…11 (got ${minV}…${maxV})`)
ok(minReflex >= 2, `every blob has ≥ 2 dents (min ${minReflex})`)
ok(JSON.stringify(S.randomBlob(42)) === JSON.stringify(S.randomBlob(42)), 'randomBlob is reproducible')
ok(JSON.stringify(S.randomBlob(42)) !== JSON.stringify(S.randomBlob(43)), 'different seeds differ')
ok(JSON.stringify(S.randomBlob('abc')) === JSON.stringify(S.randomBlob('abc')), 'string seeds are reproducible')
near(S.polygonArea(S.randomBlob(5, { area: 12 })), 12, 1e-9, 'randomBlob area option')
areas.sort((a, b) => a - b)
console.log(`randomBlob areas (seeds 1–200): min ${areas[0].toFixed(2)}, median ${areas[100].toFixed(2)}, max ${areas[199].toFixed(2)}`)
// Same shapes as the mockup engine (hub thumbnail uses seed 7).
const b7 = S.randomBlob(7)
ok(b7.length >= 7 && S.isSimplePolygon(b7), 'randomBlob(7) is a valid lumpy base')

// --- smoothBlob ---------------------------------------------------------------------------------
for (let seed = 1; seed <= 60; seed++) {
  const P = S.smoothBlob(seed, 64)
  ok(P.length === 64, `smooth ${seed}: 64 points`)
  ok(!selfIntersects(P), `smooth ${seed}: simple`)
  ok(shoelace(P) > 0, `smooth ${seed}: CCW`)
  const c = S.centroid2D(P)
  ok(Math.hypot(c[0], c[1]) < 1e-9, `smooth ${seed}: centroid at origin`)
}
near(S.polygonArea(S.smoothBlob(4, 64, { area: 9 })), 9, 1e-9, 'smoothBlob area option')

// --- scaleToward ----------------------------------------------------------------------------------
const sc = S.scaleToward([[2, 0], [0, 2]], [0, 0], 0.5)
ok(sc[0][0] === 1 && sc[1][1] === 1, 'scaleToward 2D')
const sc3 = S.scaleToward([[2, 2, 5]], [0, 0], 0.5)
ok(sc3[0][0] === 1 && sc3[0][1] === 1 && sc3[0][2] === 5, 'scaleToward keeps z with a 2D centre')
near(S.polygonArea(S.scaleToward(L, [0.3, 0.2], 0.6)), 3 * 0.36, 1e-12, 'scaleToward scales area by k²')
const tr = S.translate2D(sq, [1, 2])
ok(tr[2][0] === 2 && tr[2][1] === 3, 'translate2D')

// --- vec3 -----------------------------------------------------------------------------------------
const rz = S.vec3.rotateAbout([1, 0, 0], [0, 0, 0], [0, 0, 1], Math.PI / 2)
ok(Math.abs(rz[0]) < 1e-12 && Math.abs(rz[1] - 1) < 1e-12 && Math.abs(rz[2]) < 1e-12, 'rotateAbout z by 90°')
const rh = S.vec3.rotateAbout([1, 1, 0], [1, 0, 0], [1, 0, 0], Math.PI / 2) // hinge along x at y=0
ok(Math.abs(rh[1]) < 1e-12 && Math.abs(rh[2] - 1) < 1e-12, 'rotateAbout a hinge folds a flap up')
const nz = S.vec3.normal([[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0]])
ok(nz[2] === 1, 'Newell normal of CCW square is +z')
ok(S.vec3.dist([0, 0, 0], [2, 3, 6]) === 7, 'vec3.dist')
ok(JSON.stringify(S.vec3.cross([1, 0, 0], [0, 1, 0])) === '[0,0,1]', 'vec3.cross')
ok(JSON.stringify(S.to3([1, 2])) === '[1,2,0]' && JSON.stringify(S.to3([1, 2], 4)) === '[1,2,4]', 'to3')

// --- models: outward normals + volumes ------------------------------------------------------------
const blob = S.randomBlob(11)
const A = S.polygonArea(blob)
const h = 6
const pyr = S.pyramidModel(blob, [0, 0, h])
near(pyr.volume, (A * h) / 3, 1e-12, 'pyramid volume ⅓Ah')
near(divergenceVolume(pyr), (A * h) / 3, 1e-9, 'pyramid: outward normals (divergence theorem gives ⅓Ah)')
const pyrSlid = S.pyramidModel(blob, [2.5, -1.5, h])
near(divergenceVolume(pyrSlid), (A * h) / 3, 1e-9, 'slid apex: same volume (Cavalieri)')
ok(pyr.faces.length === blob.length + 1 && pyr.edges.length === 2 * blob.length && pyr.vertices.length === blob.length + 1, 'pyramid counts F, E, V')
ok(pyr.faces.length - pyr.edges.length + pyr.vertices.length === 2, 'pyramid Euler F − E + V = 2')
const pri = S.prismModel(blob, h, [1.2, -0.7])
near(pri.volume, A * h, 1e-12, 'prism volume Ah')
near(divergenceVolume(pri), A * h, 1e-9, 'oblique prism: outward normals (divergence gives Ah)')
ok(pri.faces.length - pri.edges.length + pri.vertices.length === 2, 'prism Euler F − E + V = 2')
// edge → faces map is consistent: each edge's two faces both contain both endpoints
function hasPt(f, p) {
  return f.pts.some((q) => q[0] === p[0] && q[1] === p[1] && q[2] === p[2])
}
for (const m of [pyr, pri]) {
  const byId = Object.fromEntries(m.faces.map((f) => [f.id, f]))
  ok(m.edges.every((e) => e.faces.length === 2 && e.faces.every((fid) => byId[fid] && hasPt(byId[fid], e.a) && hasPt(byId[fid], e.b))), `${m.kind}: edge.faces are the two faces that meet there`)
}
// ids and prefixes
const pp = S.pyramidModel(S.regularPolygon(4, 2), [0, 0, 3], { idPrefix: 'q:', z0: 1 })
ok(pp.faces[0].id === 'q:base' && pp.vertices[pp.vertices.length - 1].id === 'q:apex' && pp.edges.some((e) => e.id === 'q:l3'), 'pyramid ids carry the prefix')
near(pp.height, 2, 1e-12, 'pyramid height = apex z − z0')
const pm = S.prismModel(S.regularPolygon(3, 1), 2, null, { idPrefix: 'r:' })
ok(pm.faces[1].id === 'r:top' && pm.vertices.some((v) => v.id === 'r:w2') && pm.shift[0] === 0, 'prism ids + null shift')
// a CW base is made CCW
const cwPyr = S.pyramidModel(sq.slice().reverse(), [0.5, 0.5, 1])
ok(S.signedArea(cwPyr.base2D) > 0 && cwPyr.faces[0].normal[2] < 0, 'pyramid on a CW base: base made CCW, base face points down')
// cone (smooth base) flags lateral edges smooth
const cone = S.pyramidModel(S.smoothBlob(3), [0, 0, 5], { smooth: true })
ok(cone.edges.filter((e) => e.kind === 'lateral').every((e) => e.smooth) && cone.edges.filter((e) => e.kind === 'base').every((e) => !e.smooth), 'cone: lateral edges smooth, base edges not')

// --- sliceAt --------------------------------------------------------------------------------------
for (const z of [0, 0.5, 1.7, 3, 4.2, 5.9]) {
  const s = S.sliceAt(pri, z)
  near(S.polygonArea(s.pts2D), A, 1e-9, `prism slice area constant at z=${z}`)
  ok(s.pts.every((p) => Math.abs(p[2] - z) < 1e-12), `prism slice lies at z=${z}`)
  const ps = S.sliceAt(pyr, z)
  near(S.polygonArea(ps.pts2D), A * (1 - z / h) ** 2, 1e-9, `pyramid slice area A(1 − z/h)² at z=${z}`)
  near(ps.area, A * (1 - z / h) ** 2, 1e-9, `pyramid slice .area at z=${z}`)
  near(ps.scale, 1 - z / h, 1e-12, `pyramid slice scale at z=${z}`)
  const pss = S.sliceAt(pyrSlid, z)
  near(S.polygonArea(pss.pts2D), A * (1 - z / h) ** 2, 1e-9, `slid-apex slice area at z=${z}`)
}
ok(S.sliceAt(pyr, -0.1) === null && S.sliceAt(pyr, h + 0.1) === null, 'slice outside the solid is null')
// a slice is a similar copy: scaled about the apex foot
const s3 = S.sliceAt(pyrSlid, 3)
const expect = S.scaleToward(blob, [2.5, -1.5], 0.5)
ok(s3.pts2D.every((p, i) => Math.abs(p[0] - expect[i][0]) < 1e-12 && Math.abs(p[1] - expect[i][1]) < 1e-12), 'pyramid slice = base scaled toward the apex foot')
near(s3.areaFactor, 0.25, 1e-12, 'slice areaFactor = scale²')
near(s3.centre[2], 3, 1e-12, 'slice centre at its height')

// --- layerStack -----------------------------------------------------------------------------------
let prev = 0
for (const n of [1, 2, 3, 5, 10, 20, 50, 100, 200, 1000]) {
  const st = S.layerStack(blob, [0, 0], h, n)
  const formula = ((n - 1) * (2 * n - 1)) / (2 * n * n)
  near(st.ratio, formula, 1e-9, `inner stack ratio n=${n} = (n−1)(2n−1)/2n²`)
  // independent: sum of each slab's base area × thickness
  const indep = st.layers.reduce((acc, Lr) => acc + S.polygonArea(Lr.base2D) * (h / n), 0)
  near(indep, st.volume, 1e-9, `inner stack n=${n}: slabs' area × thickness sums to .volume`)
  ok(st.volume <= st.exact + 1e-12, `inner stack n=${n} stays below ⅓Ah`)
  ok(st.ratio >= prev - 1e-12, `inner stack n=${n} climbs`)
  prev = st.ratio
  ok(st.layers.length === n - 1, `inner stack n=${n}: n − 1 visible slabs`)
  const out = S.layerStack(blob, [0, 0], h, n, { mode: 'outer' })
  near(out.ratio, ((n + 1) * (2 * n + 1)) / (2 * n * n), 1e-9, `outer stack ratio n=${n}`)
}
near(S.layerStack(blob, [0, 0], h, 1000).ratio, 1, 2e-3, 'inner stack → ⅓Ah as n grows')
near(S.layerStack(blob, [0, 0], h, 1000, { mode: 'mid' }).ratio, 1, 1e-6, 'mid stack → ⅓Ah')
const slid = S.layerStack(blob, [2, 1], h, 12)
near(slid.volume, S.layerStack(blob, [0, 0], h, 12).volume, 1e-9, 'pushed coin stack keeps its volume')
ok(slid.layers.every((Lr) => Math.abs(Lr.model.z0 - Lr.z0) < 1e-12 && Math.abs(Lr.model.height - h / 12) < 1e-12), 'slab models sit at their heights')
ok(slid.layers[2].model.faces[0].id === 'L2:base', 'slab ids default to L<k>:')
ok(S.layerStack(blob, [0, 0], h, 0).layers.length === 0, 'zero layers')

// --- groundGrid / modelItems -----------------------------------------------------------------------
const g = S.groundGrid({ size: 6, step: 1 })
ok(g.reduce((n, it) => n + it.segs.length, 0) === 13 * 2 * 8 && g.length <= 12 && g.every((it) => it.type === 'segs' && it.layer === -1 && it.hiddenStyle === 'show' && it.pickable === false), 'groundGrid: 13 lines each way, cut for the fade, bucketed into a few segs items in layer −1')
ok(g.every((it, i) => i === 0 || g[i - 1].opacity <= it.opacity), 'groundGrid: faint buckets first')
ok(g.every((it) => /\bs3d-grid-line\b/.test(it.className)), 'groundGrid: grid-line class')
const ga = S.groundGrid({ size: 2, axes: true, fade: 0, className: 'mine' })
ok(ga.some((it) => /s3d-grid-axis/.test(it.className)) && ga.every((it) => /mine/.test(it.className) && it.opacity === 1), 'groundGrid: axes, className, no fade')
const items = S.modelItems(pyr, { idPrefix: 'p:', face: (f) => (f.kind === 'base' ? { fill: 'red' } : null), edge: { stroke: 'blue' }, vertex: { r: 3 } })
ok(items.filter((i) => i.type === 'poly').length === 1 && items[0].id === 'p:base' && items[0].fill === 'red' && items[0].data.part === 'face', 'modelItems: face filter + ids + data')
ok(items.filter((i) => i.type === 'seg').length === pyr.edges.length && items.filter((i) => i.type === 'pt').length === pyr.vertices.length, 'modelItems: edges and vertices')
ok(items[0].data.ref === pyr.faces[0] && items[0].data.model === pyr && items[0].normal === pyr.faces[0].normal, 'modelItems: data.ref/model, outward normal on faces')
const ghost = S.modelItems(pyr, { group: 'g', occluder: false, pickable: false, edges: 'none', face: { className: 'f', data: { extra: 1 } } })
ok(ghost.length === pyr.faces.length && ghost.every((i) => i.occluder === false && i.pickable === false && i.group === 'g' && i.data.extra === 1 && i.data.part === 'face'), 'modelItems: ghost options + merged style data')
// edges: 'auto' keeps smooth edges only where the two faces disagree about facing the camera
const fakeStage = { facing: (n) => n[0] > 0 }
const coneAuto = S.modelItems(cone, { edges: 'auto', stage: fakeStage })
const lateralShown = coneAuto.filter((i) => i.type === 'seg' && i.data.ref.kind === 'lateral')
ok(lateralShown.length > 0 && lateralShown.length < cone.edges.filter((e) => e.kind === 'lateral').length, 'modelItems edges:auto keeps only silhouette generators')
ok(coneAuto.filter((i) => i.type === 'seg' && i.data.ref.kind === 'base').length === 64, 'modelItems edges:auto keeps non-smooth edges')

// --- easing ------------------------------------------------------------------------------------------
for (const [name, fn] of Object.entries(S.easings)) {
  near(fn(0), 0, 1e-12, `easing ${name}(0)`)
  near(fn(1), 1, 1e-12, `easing ${name}(1)`)
  let mono = true
  for (let t = 0; t < 1; t += 0.01) if (fn(t + 0.01) < fn(t) - 1e-12) mono = false
  ok(mono, `easing ${name} is monotone`)
}
near(S.easings.easeInOut(0.5), 0.5, 1e-12, 'easeInOut is symmetric about ½')
near(S.easings.easeInOut(0.25), 0.125, 1e-12, 'easeInOut is the mockups\' quadratic')
ok(S.resolveEasing(undefined) === S.easings.easeInOut && S.resolveEasing('linear') === S.easings.linear, 'resolveEasing names / default')
const custom = (t) => t * t
ok(S.resolveEasing(custom) === custom, 'resolveEasing passes functions through')

// --- stage option defaults --------------------------------------------------------------------------
const cfg = S.resolveStageOptions()
ok(cfg.rotateSpeedX === 0.5 && cfg.rotateSpeedY === 0.4, 'default drag speeds 0.5°/px across, 0.4°/px up-down')
ok(cfg.keyYawStep === 15 && cfg.keyPitchStep === 5 && cfg.zoomStep === 0.1 && cfg.keyShiftMultiplier === 3, 'default key steps 15°, 5°, 10%')
ok(cfg.wheelZoom === 'ctrl', 'wheel zoom defaults to ctrl only')
ok(cfg.dragThreshold.mouse === 6 && cfg.dragThreshold.touch === 10 && cfg.dragThreshold.pen === 6, 'default drag thresholds 6 / 10 / 6 px')
ok(cfg.animateMs === 350 && cfg.easing === 'easeInOut', 'default tween 350 ms easeInOut')
ok(cfg.fit === 5 && cfg.aspect === 0.72 && cfg.minHeight === 240 && cfg.maxHeight === 620 && cfg.minZoom === 0.5 && cfg.maxZoom === 4, 'size/zoom defaults as the mockup engine')
ok(cfg.pitchRange[0] === -0.6 && cfg.pitchRange[1] === 1.5 && cfg.hitWidth === 18 && cfg.ptHitRadius === 14 && cfg.orientSort === true && cfg.sampleSpacing === 7, 'other defaults as the mockup engine')
ok(cfg.doubleTapReset === true && cfg.keyboard === true && cfg.height === undefined, 'doubleTapReset, keyboard, height defaults')
near(S.vec3.len(cfg.light), 1, 1e-12, 'light is normalised')
ok(S.resolveStageOptions({ dragThreshold: 3 }).dragThreshold.mouse === 3 && S.resolveStageOptions({ dragThreshold: 3 }).dragThreshold.pen === 3 && S.resolveStageOptions({ dragThreshold: 3 }).dragThreshold.touch === 10, 'dragThreshold number sets mouse + pen')
const dt2 = S.resolveStageOptions({ dragThreshold: { touch: 14 } }).dragThreshold
ok(dt2.touch === 14 && dt2.mouse === 6 && dt2.pen === 6, 'dragThreshold object')
ok(S.resolveStageOptions({ wheelZoom: false }).wheelZoom === false && S.resolveStageOptions({ wheelZoom: true }).wheelZoom === true, 'wheelZoom false / true kept')
ok(S.resolveStageOptions({ sampleSpacing: 0.5 }).sampleSpacing === 2, 'sampleSpacing min 2')
const pr = [0, 1]
const cfgPr = S.resolveStageOptions({ pitchRange: pr })
ok(cfgPr.pitchRange !== pr && cfgPr.pitchRange[1] === 1, 'pitchRange copied')

// --- wheel / drag / keys ------------------------------------------------------------------------------
ok(!S.wheelZooms('ctrl', {}) && S.wheelZooms('ctrl', { ctrlKey: true }) && S.wheelZooms('ctrl', { metaKey: true }), "wheelZoom 'ctrl': only with Ctrl/⌘")
ok(S.wheelZooms(true, {}) && !S.wheelZooms(false, { ctrlKey: true }), 'wheelZoom true / false')
near(S.wheelZoomValue(1, -100, 0, cfg), Math.exp(0.15), 1e-12, 'wheel up zooms in')
near(S.wheelZoomValue(1, 3, 1, cfg), Math.exp(-48 * 0.0015), 1e-12, 'line-mode wheel deltas count 16 px')
ok(S.wheelZoomValue(1, -1e6, 0, cfg) === 4 && S.wheelZoomValue(1, 1e6, 0, cfg) === 0.5, 'wheel zoom clamped')
ok(S.dragThresholdFor(cfg, 'mouse') === 6 && S.dragThresholdFor(cfg, 'touch') === 10 && S.dragThresholdFor(cfg, 'pen') === 6 && S.dragThresholdFor(cfg, '') === 6, 'dragThresholdFor')
const cam0 = S.normalizeCamera({ yaw: 0, pitch: 0.3 }, cfg)
const dragged = S.dragCamera(cam0, 10, 10, cfg)
near(dragged.yaw, -5 * DEG, 1e-12, 'drag 10 px right = 5° of yaw')
near(dragged.pitch, 0.3 + 4 * DEG, 1e-12, 'drag 10 px down = 4° of pitch')
ok(S.dragCamera(cam0, 0, 1e5, cfg).pitch === 1.5, 'drag pitch clamped to pitchRange')
const kL = S.keyCameraChange('ArrowLeft', false, cam0, cfg)
near(kL.yaw, 15 * DEG, 1e-12, '← turns 15°')
near(S.keyCameraChange('ArrowRight', true, cam0, cfg).yaw, -45 * DEG, 1e-12, 'Shift+→ turns 45°')
near(S.keyCameraChange('ArrowDown', false, cam0, cfg).pitch, 0.3 + 5 * DEG, 1e-12, '↓ tips 5°')
near(S.keyCameraChange('ArrowUp', false, cam0, cfg).pitch, 0.3 - 5 * DEG, 1e-12, '↑ tips 5° the other way')
near(S.keyCameraChange('+', false, cam0, cfg).zoom, 1.1, 1e-12, '+ zooms in 10%')
near(S.keyCameraChange('-', false, cam0, cfg).zoom, 1 / 1.1, 1e-12, '− zooms out 10%')
ok(S.keyCameraChange('0', false, cam0, cfg) === 'reset' && S.keyCameraChange('Home', false, cam0, cfg) === 'reset', '0 / Home reset')
ok(S.keyCameraChange('a', false, cam0, cfg) === null, 'other keys ignored')
const cfgK = S.resolveStageOptions({ keyYawStep: 30, keyPitchStep: 2, zoomStep: 0.25 })
near(S.keyCameraChange('ArrowLeft', false, cam0, cfgK).yaw, 30 * DEG, 1e-12, 'keyYawStep option')
near(S.keyCameraChange('ArrowDown', false, cam0, cfgK).pitch, 0.3 + 2 * DEG, 1e-12, 'keyPitchStep option')
near(S.keyCameraChange('=', false, cam0, cfgK).zoom, 1.25, 1e-12, 'zoomStep option')

// --- camera normalisation / interpolation ---------------------------------------------------------------
const nc = S.normalizeCamera({ pitch: 9, zoom: 99, target: [1, 2] }, cfg)
ok(nc.pitch === 1.5 && nc.zoom === 4 && nc.target[2] === 0 && nc.yaw === -0.85 && nc.projection === 'perspective' && nc.distance === 4, 'normalizeCamera clamps + fills defaults')
ok(nc.pan[0] === 0 && nc.pan[1] === 0, 'pan defaults to [0, 0]')
const nc2 = S.normalizeCamera({ yaw: undefined, zoom: 2 }, cfg, nc)
ok(nc2.yaw === nc.yaw && nc2.zoom === 2 && nc2.target !== nc.target, 'normalizeCamera: undefined fields count as missing; base merged; arrays copied')
ok(S.DEFAULT_CAMERA.target[0] === 0 && S.normalizeCamera(null, cfg).target !== S.DEFAULT_CAMERA.target, 'default camera arrays are never shared')
ok(JSON.stringify(S.cameraFields({ yaw: 1, zoom: undefined, pan: [0, 0] })) === '["yaw","pan"]', 'cameraFields')
const ca = S.normalizeCamera({ yaw: 3, zoom: 1, pan: [0, 0], projection: 'perspective' }, cfg)
const cb = S.normalizeCamera({ yaw: -3, zoom: 4, pan: [0.2, -0.1], projection: 'orthographic' }, cfg)
const half = S.lerpCamera(ca, cb, 0.5)
ok(Math.abs(Math.abs(half.yaw) - Math.PI) < 1e-9, 'lerpCamera: yaw goes the short way round')
near(half.zoom, 2, 1e-12, 'lerpCamera: zoom geometric')
near(half.pan[0], 0.1, 1e-12, 'lerpCamera: pan x')
near(half.pan[1], -0.05, 1e-12, 'lerpCamera: pan y')
ok(S.lerpCamera(ca, cb, 0.49).projection === 'perspective' && half.projection === 'orthographic', 'lerpCamera: projection switches half-way')
ok(S.wrapAngle(3 * Math.PI) === Math.PI || Math.abs(Math.abs(S.wrapAngle(3 * Math.PI)) - Math.PI) < 1e-12, 'wrapAngle')

// --- view / projection / pan ----------------------------------------------------------------------------
const camV = S.normalizeCamera({ yaw: 0.3, pitch: 0.5, target: [1, 2, 3], projection: 'orthographic' }, cfg)
const v = S.computeView(camV, 5, 400, 300)
const pt = S.projectPoint(v, [1, 2, 3])
ok(pt[0] === 200 && pt[1] === 150 && pt[2] === 0, 'target projects to the stage centre')
near(v.s, 300 / 10, 1e-12, 'fit 5 fills the shorter side (300 px) at zoom 1')
const vPan = S.computeView({ ...camV, pan: [0.25, -0.1] }, 5, 400, 300)
const pp2 = S.projectPoint(vPan, [1, 2, 3])
near(pp2[0], 300, 1e-12, 'pan x moves the picture by a fraction of the width')
near(pp2[1], 120, 1e-12, 'pan y moves the picture by a fraction of the height')
const other = [3, -1, 5]
near(S.projectPoint(vPan, other)[0] - S.projectPoint(v, other)[0], 100, 1e-9, 'pan is a pure screen shift (x)')
near(S.projectPoint(vPan, other)[1] - S.projectPoint(v, other)[1], -30, 1e-9, 'pan is a pure screen shift (y)')
// up is up: a point above the target is higher on screen; ortho projection keeps lengths of verticals ∝ cos(pitch)
const up = S.projectPoint(v, [1, 2, 4])
near(150 - up[1], v.s * Math.cos(0.5), 1e-9, 'a unit vertical projects to s·cos(pitch) px up')
ok(S.isFacing(v, v.E, [0, 0, 0]) && !S.isFacing(v, S.vec3.scale(v.E, -1), [0, 0, 0]), 'isFacing (orthographic)')
const vP = S.computeView({ ...camV, projection: 'perspective' }, 5, 400, 300)
ok(vP.persp && S.vec3.dist(vP.eye, camV.target) === 20, 'perspective eye at distance × fit')
const near1 = S.projectPoint(vP, S.vec3.add(camV.target, S.vec3.add(v.R, S.vec3.scale(v.E, 2))))
const far1 = S.projectPoint(vP, S.vec3.add(camV.target, S.vec3.add(v.R, S.vec3.scale(v.E, -2))))
ok(near1[0] - 200 > far1[0] - 200 && near1[2] > far1[2], 'perspective: nearer points spread wider and have larger depth')

// --- engine CSS: no polygon colours / fill-opacity, everything scoped to .s3d-svg -------------------------
const src = readFileSync(new URL('../src/tools/misc-demonstrations/lib/solid3d.ts', import.meta.url), 'utf8')
const cssBlock = src.slice(src.indexOf('const CSS = ['), src.indexOf("].join('')", src.indexOf('const CSS = [')))
const rules = [...cssBlock.matchAll(/'([^']*)'/g)].map((m) => m[1]).join('')
ok(!/s3d-poly[^{]*\{[^}]*(fill|opacity)/.test(rules), 'no CSS fill / fill-opacity / opacity on .s3d-poly')
const selectors = [...rules.matchAll(/(^|\})([^{}]+)\{/g)].map((m) => m[2])
ok(selectors.length > 5 && selectors.every((sel) => sel.split(',').every((p) => /\.s3d-svg/.test(p))), 'every engine CSS selector is scoped to .s3d-svg')
ok(!/(^|[^-])window\.|(^|[^.\w])document\./m.test(src.slice(0, src.indexOf('function injectCSS'))), 'no DOM access above the stage code')

console.log(`\n${pass} passed, ${fail} failed`)
process.exit(fail ? 1 : 0)
