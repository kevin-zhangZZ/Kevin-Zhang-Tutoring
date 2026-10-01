// Pure-maths tests for src/tools/misc-demonstrations/pyramids-prisms/model.ts (node 24 strips the
// TypeScript types natively). Run from math-tools/: node scripts/pyramids.test.mjs
import * as M from '../src/tools/misc-demonstrations/pyramids-prisms/model.ts'

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
function shoelace(P) {
  let s = 0
  for (let i = 0; i < P.length; i++) {
    const a = P[i], b = P[(i + 1) % P.length]
    s += a[0] * b[1] - b[0] * a[1]
  }
  return s / 2
}
const st = (patch) => M.applyPatch({ ...M.DEFAULTS }, patch || {})

// --- Bases and areas -------------------------------------------------------------------------------
{
  const g = M.computeGeometry(st())
  near(g.A, 16, 1e-12, 'square base area')
  near(g.Av, 16, 1e-12, 'square Av')
  near(M.computeGeometry(st({ shape: 'triangle' })).A, 13.5, 1e-12, 'triangle (−3,−2),(3,−1),(0,3) area')
  near(M.computeGeometry(st({ shape: 'hexagon' })).A, ((3 * Math.sqrt(3)) / 2) * 6.25, 1e-9, 'regular hexagon r = 2.5')
  const c = M.computeGeometry(st({ shape: 'curvy', outline: 'circle' }))
  near(c.A, Math.PI * 6.25, 1e-12, 'circle area πr²')
  near(c.Av, Math.PI * 6.25, 1e-12, 'circle volumes use exact πr²')
  near(c.Vpyr, (Math.PI * 6.25 * 6) / 3, 1e-9, 'cone volume ⅓πr²h')
  for (const shape of ['square', 'triangle', 'hexagon', 'weird', 'curvy']) {
    const b = M.baseShape(shape, 'blob', M.WEIRD_SEED)
    ok(shoelace(b) > 0, `${shape} base is counter-clockwise`)
    ok(M.pointInPoly([0, 0], b), `${shape} base contains O`)
  }
  const w = M.computeGeometry(st({ shape: 'weird' }))
  near(w.Av, Math.round(w.A * 100) / 100, 1e-12, 'weird Av is A to 2 dp')
  ok(w.base.length >= 9 && w.base.length <= 13, 'weird base has 9–13 corners')
  ok(M.weirdBase(9) === M.weirdBase(9), 'weird base is cached per seed')
  ok(JSON.stringify(M.weirdBase(10)) !== JSON.stringify(M.weirdBase(9)), 'New Weird Base changes the base')
  // Star-shaped about O: every ray from O crosses the outline once (angles increase monotonically)
  for (const seed of [9, 10, 11, 12, 13, 42]) {
    const b = M.weirdBase(seed)
    let turn = 0
    for (let i = 0; i < b.length; i++) {
      const a = b[i], c2 = b[(i + 1) % b.length]
      const d = Math.atan2(a[0] * c2[1] - a[1] * c2[0], a[0] * c2[0] + a[1] * c2[1])
      ok(d > 0, `weird seed ${seed}: corner ${i} → ${i + 1} turns CCW about O`)
      turn += d
    }
    near(turn, 2 * Math.PI, 1e-9, `weird seed ${seed}: one full turn about O`)
  }
}

// --- k, k², slice areas -------------------------------------------------------------------------------
{
  near(M.sliceScale(3, 6), 0.5, 1e-12, 'k at z = h/2')
  near(M.sliceScale(4.5, 6), 0.25, 1e-12, 'k at z = 4.5, h = 6')
  near(M.sliceScale(0, 6), 1, 1e-12, 'k at the base')
  near(M.sliceScale(6, 6), 0, 1e-12, 'k at the apex')
  near(M.pyramidSliceArea(16, 3, 6), 4, 1e-12, 'slice area halfway = A/4')
  near(M.pyramidSliceArea(16, 4.5, 6), 1, 1e-12, 'slice area at k = ¼ is A/16')
  const g = M.computeGeometry(st({ z: 4.5 }))
  near(g.k, 0.25, 1e-12, 'computeGeometry k')
  near(g.sliceA, 1, 1e-12, 'computeGeometry slice area')
  near(Math.abs(shoelace(g.slice2D)), g.A * g.k * g.k, 1e-9, 'drawn slice polygon has area A k²')
  // Oblique: same slice areas, slice is the base scaled about F = (s, 0)
  const o = M.computeGeometry(st({ s: 4, z: 2 }))
  near(Math.abs(shoelace(o.slice2D)), o.A * o.k * o.k, 1e-9, 'oblique slice area A k²')
  near(o.slice2D[0][0], 4 + o.k * (-2 - 4), 1e-12, 'oblique slice is a dilation about F')
  near(Math.abs(shoelace(o.priSlice2D)), o.A, 1e-9, 'prism slice = base area')
  near(o.priSlice2D[0][0], -2 + (4 * 2) / 6, 1e-12, 'sheared prism slice slides by s z/h')
  const top = M.computeGeometry(st({ z: 6 }))
  ok(top.slice2D === null && top.atApex, 'no slice at the apex')
  ok(M.computeGeometry(st({ z: 0 })).atBase, 'z = 0 is the base')
  ok(M.computeGeometry(st({ z: 3 })).half, 'z = 3, h = 6 is half way')
}

// --- Volumes -----------------------------------------------------------------------------------------
{
  const g = M.computeGeometry(st())
  near(g.Vpyr, 32, 1e-12, 'pyramid ⅓Ah = 32')
  near(g.Vpri, 96, 1e-12, 'prism Ah = 96')
  near(g.Vpyr / g.Vpri, 1 / 3, 1e-12, 'pyramid ÷ prism = ⅓')
  near(M.computeGeometry(st({ s: 5 })).Vpyr, 32, 1e-12, 'sliding the apex keeps the volume (Cavalieri)')
  near(g.pyr.volume, g.Vpyr, 1e-9, 'engine pyramid model agrees')
  near(g.pyr.area, 16, 1e-9, 'engine base area agrees')
  for (const h of [1, 2.5, 6, 7.3, 10]) {
    const gh = M.computeGeometry(st({ h, z: 0 }))
    near(gh.Vpyr, (16 * h) / 3, 1e-9, `⅓Ah at h = ${h}`)
  }
  const w = M.computeGeometry(st({ shape: 'weird', solid: 'both' }))
  near(w.Vpyr * 3, w.Vpri, 1e-9, 'weird base: pyramid is ⅓ of prism')
}

// --- Layer stacks ------------------------------------------------------------------------------------
{
  for (const n of [1, 2, 3, 4, 5, 10, 17, 30]) {
    for (const mode of ['inside', 'outside']) {
      const exact = mode === 'inside' ? (16 * 6 * (n - 1) * (2 * n - 1)) / (6 * n * n) : (16 * 6 * (n + 1) * (2 * n + 1)) / (6 * n * n)
      near(M.stackVolume(16, 6, n, mode), exact, 1e-9, `stack formula n = ${n} ${mode}`)
      near(M.stackVolumeBySlabs(16, 6, n, mode), exact, 1e-9, `stack sum of slabs n = ${n} ${mode}`)
      const g = M.computeGeometry(st({ layers: n, layerMode: mode }))
      near(g.stackV, exact, 1e-9, `computeGeometry stackV n = ${n} ${mode}`)
      const modelSum = g.layerModels.reduce((a, m) => a + m.volume, 0)
      near(modelSum, exact, 1e-9, `drawn slabs add up, n = ${n} ${mode}`)
      ok(mode === 'inside' ? g.stackV < g.Vpyr : g.stackV > g.Vpyr, `${mode} stack ${mode === 'inside' ? 'under' : 'over'}counts, n = ${n}`)
    }
  }
  near(M.stackVolume(16, 6, 1, 'inside'), 0, 1e-12, 'one inside layer holds nothing')
  near(M.stackVolume(16, 6, 1, 'outside'), 96, 1e-12, 'one outside layer is the whole prism')
  near(M.computeGeometry(st({ layers: 4 })).stackV, 21, 1e-12, 'n = 4 inside = 96 × 3 × 7 / 96 = 21 u³')
  near(M.computeGeometry(st({ layers: 4, layerMode: 'outside' })).stackV, 45, 1e-12, 'n = 4 outside = 96 × 5 × 9 / 96 = 45 u³')
  near(M.computeGeometry(st({ layers: 10 })).stackRatio, 0.855, 1e-12, 'n = 10 inside fills 85.5%')
  ok(Math.abs(M.stackVolume(16, 6, 1e5, 'inside') - 32) < 1e-3 && Math.abs(M.stackVolume(16, 6, 1e5, 'outside') - 32) < 1e-3, 'both stacks → ⅓Ah')
  const p = M.computeGeometry(st({ solid: 'prism', layers: 7 }))
  near(p.stackV, 96, 1e-12, 'prism stack is exactly Ah')
  near(p.layerModels.reduce((a, m) => a + m.volume, 0), 96, 1e-9, 'prism slabs add up to Ah')
  // A leaning stack stays the same volume
  near(M.computeGeometry(st({ layers: 6, s: 4 })).layerModels.reduce((a, m) => a + m.volume, 0), M.stackVolume(16, 6, 6, 'inside'), 1e-9, 'leaning stack volume')
  // Curvy stacks use 36 points per slab
  ok(M.computeGeometry(st({ shape: 'curvy', layers: 3 })).layerModels[0].base2D.length === 36, 'curvy slab uses 36 points')
}

// --- Slant length ------------------------------------------------------------------------------------
{
  const g = M.computeGeometry(st({ slant: true }))
  ok(g.slant.kind === 'face', 'square: a face slant height')
  near(g.slant.length, Math.sqrt(40), 1e-12, 'square h = 6: l = √(2² + 6²)')
  near(g.slant.foot[1], -2, 1e-12, 'front edge is y = −2 (toward the home camera)')
  // Same front face at any lean: perpendicular distance to the edge's line is still 2
  const o = M.computeGeometry(st({ slant: true, s: 3 }))
  near(o.slant.length, Math.sqrt(40), 1e-12, 'slid apex: slant height of the front face unchanged')
  near(o.slant.foot[0], 3, 1e-12, 'foot follows the apex along the edge')
  ok(!o.slant.onEdge && M.computeGeometry(st({ slant: true, s: 1 })).slant.onEdge, 'foot on the edge at s = 1, past the corner at s = 3')
  ok(!M.computeGeometry(st({ slant: true, s: 5 })).slant.onEdge, 'foot past the corner at s = 5')
  near(M.computeGeometry(st({ slant: true, h: 10 })).slant.length, Math.sqrt(104), 1e-12, 'h = 10')
  // Hexagon r = 2.5: apothem 2.5 cos 30°
  near(M.computeGeometry(st({ slant: true, shape: 'hexagon' })).slant.length, Math.hypot(2.5 * Math.cos(Math.PI / 6), 6), 1e-12, 'hexagon slant height uses the apothem')
  // Triangle: distance from O to the line through (−3,−2), (3,−1)
  const dTri = Math.abs(-3 * -1 - 3 * -2) / Math.hypot(6, 1) // |x1 y2 − x2 y1| / |e|
  near(M.computeGeometry(st({ slant: true, shape: 'triangle' })).slant.length, Math.hypot(dTri, 6), 1e-12, 'triangle slant height')
  ok(M.computeGeometry(st({ slant: true, shape: 'triangle' })).slant.edge[0][0] === -3, 'triangle front edge is the bottom one')
  // Circle cone: generator √(r² + h²)
  const c = M.computeGeometry(st({ slant: true, shape: 'curvy', outline: 'circle' }))
  ok(c.slant.kind === 'point', 'curvy: slant length to a point')
  near(c.slant.length, Math.hypot(2.5, 6), 1e-9, 'right circular cone: l = √(r² + h²)')
  ok(g.slant.length > g.h, 'slant length is longer than h')
  near(M.computeGeometry(st({ solid: 'prism', s: 3 })).edgeL, Math.hypot(6, 3), 1e-12, 'sheared prism edge √(h² + s²)')
}

// --- Lift Off Top: k³ ---------------------------------------------------------------------------------
{
  const g = M.computeGeometry(st({ lift: true, z: 3 }))
  ok(g.lifted && g.frustum && g.top, 'lifted at z = 3')
  near(g.topV, 32 / 8, 1e-12, 'top piece is k³V = V/8 at k = ½')
  near(g.frustumV, 28, 1e-12, 'frustum is V − k³V')
  near(g.top.volume, g.topV, 1e-9, 'engine agrees: drawn top piece volume = k³V')
  near(g.top.apex[2], 6 + M.LIFT_HEIGHT, 1e-12, 'top piece raised by LIFT_HEIGHT')
  const g2 = M.computeGeometry(st({ lift: true, z: 1.5, shape: 'hexagon', s: 2 }))
  near(g2.top.volume, Math.pow(0.75, 3) * g2.A * 6 / 3, 1e-9, 'oblique hexagon: top piece = k³V (exact A)')
  const { top, bottom } = M.frustumSplit(30, 0.4)
  near(top, 30 * 0.064, 1e-12, 'frustumSplit top')
  near(top + bottom, 30, 1e-12, 'frustumSplit adds up')
  ok(!st({ solid: 'prism', lift: true }).lift, 'no lift for a prism')
  ok(!st({ lift: true, z: 6 }).lift && !st({ lift: true, z: 0 }).lift, 'no lift at the apex or base')
  const both = st({ lift: true, layers: 0 })
  ok(!M.applyPatch(both, { layers: 5 }).lift, 'layers switch the lift off')
  ok(M.applyPatch(st({ layers: 5 }), { lift: true }).layers === 0, 'the lift switches layers off')
}

// --- Patches, formatting, names --------------------------------------------------------------------
{
  ok(st({ h: 4, z: 5 }).z === 4, 'z clamps to h')
  ok(st({ h: 6.04 }).h === 6, 'h snaps to 0.1')
  ok(M.snapShift(0.12) === 0 && M.snapShift(-0.16) === -0.2 && M.snapShift(2.34) === 2.3, 'shift snaps')
  ok(M.f1(-0.04) === '0.0' && M.f1(-1.26) === '−1.3', 'f1 with true minus')
  ok(M.f2(32) === '32.00', 'f2')
  ok(M.trimNum(0.25) === '0.25' && M.trimNum(1) === '1' && M.trimNum(0.0625) === '0.0625', 'trimNum')
  ok(M.texNum(-2, 1) === '-2.0', 'texNum ASCII minus')
  const k1 = M.kFraction(3, 6)
  ok(k1.p === 1 && k1.q === 2 && M.fracText(k1) === '½', 'k = ½')
  ok(M.fracText(M.kFraction(2.4, 6)) === '3/5', 'k = 3/5')
  ok(M.fracText(M.kFraction(0, 6)) === '1', 'k = 1')
  ok(M.kFraction(0.1, 6.1) === null, 'k = 60/61 is not shown as a fraction')
  ok(M.solidName(st()) === 'Right Square-Based Pyramid', 'name: default')
  ok(M.solidName(st({ solid: 'prism' })) === 'Right Square Prism', 'name: prism')
  ok(M.solidName(st({ shape: 'curvy', outline: 'circle', s: 1 })) === 'Oblique Circular Cone', 'name: oblique cone')
  ok(M.solidName(st({ shape: 'weird', solid: 'both' })) === 'Pyramid and Prism on an Irregular Base', 'name: both weird')
  ok(M.solidName(st({ shape: 'curvy', solid: 'prism' })) === 'Cylinder on a Curvy Base', 'name: curvy cylinder')
  // Side by Side spreads the two solids apart, volumes unchanged
  const sb = M.computeGeometry(st({ solid: 'both', layout: 'side' }))
  ok(sb.side && sb.dxP < 0 && sb.dxQ > 0 && sb.gridSize === 10, 'side by side offsets')
  near(sb.pri.volume, 96, 1e-9, 'side by side prism volume')
  // Camera framing: h = 6 sits a little below centre, taller solids raise the target
  // Camera framing at the home view (orthographic): project with the home camera's axes
  const cp = Math.cos(M.HOME_CAM.pitch), sp = Math.sin(M.HOME_CAM.pitch)
  const Rv = [-Math.sin(M.HOME_CAM.yaw), Math.cos(M.HOME_CAM.yaw)]
  const extent = (g, fr) => {
    const pts = []
    if (g.pyr) { pts.push(...g.pyr.base3D, g.pyr.apex); if (g.lifted) pts.push([g.pyr.apex[0], 0, g.h + M.LIFT_HEIGHT]) }
    if (g.pri) pts.push(...g.pri.base3D, ...g.pri.top3D)
    const t = fr.target
    const tu = t[2] * cp - (t[0] * M.FRONT[0] + t[1] * M.FRONT[1]) * sp, tr = t[0] * Rv[0] + t[1] * Rv[1]
    let maxU = 0, maxR = 0
    for (const p of pts) {
      const u = p[2] * cp - (p[0] * M.FRONT[0] + p[1] * M.FRONT[1]) * sp - tu
      const r = p[0] * Rv[0] + p[1] * Rv[1] - tr
      maxU = Math.max(maxU, Math.abs(u)); maxR = Math.max(maxR, Math.abs(r))
    }
    return { maxU, maxR, half: M.STAGE_FIT / fr.zoom } // half the stage's shorter side, in world units
  }
  const d0 = M.computeGeometry(st())
  const f0 = M.homeFrame(d0)
  ok(f0.zoom === 1, 'default framing: zoom 1')
  const e0 = extent(d0, f0)
  near((2 * e0.maxU) / (2 * e0.half), 0.59, 0.03, 'h = 6 square pyramid fills ~60% of the stage height')
  for (const p of [{ h: 10, s: 6 }, { h: 10, s: -6 }, { h: 10, s: 6, shape: 'weird' }, { h: 10, s: 6, z: 3, lift: true }, { solid: 'both', layout: 'side', h: 10, s: 6 }, { solid: 'both', layout: 'side', shape: 'weird' }, { h: 1, s: -6, shape: 'curvy' }]) {
    const g = M.computeGeometry(st(p))
    const e = extent(g, M.homeFrame(g))
    ok(e.maxU <= e.half * 0.81 && e.maxR <= e.half * 0.81, `${JSON.stringify(p)} stays on the stage (${e.maxU.toFixed(2)}, ${e.maxR.toFixed(2)} of ${e.half.toFixed(2)})`)
  }
  ok(M.homeFrame(M.computeGeometry(st({ h: 10 }))).target[2] > f0.target[2], 'taller solids raise the target')
}

// --- Lesson step 5: three pyramids fill the prism ----------------------------------------------------
{
  const T = M.TRI_PRISM
  const triArea = (a, b, c) => Math.hypot(...[
    (b[1] - a[1]) * (c[2] - a[2]) - (b[2] - a[2]) * (c[1] - a[1]),
    (b[2] - a[2]) * (c[0] - a[0]) - (b[0] - a[0]) * (c[2] - a[2]),
    (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]),
  ]) / 2
  near(triArea(T.A, T.B, T.C), 13.5, 1e-12, 'prism base ABC = 13.5 u² (the lesson’s triangle)')
  near(M.TRI_PRISM_VOLUME, 81, 1e-12, 'prism Ah = 13.5 × 6 = 81')
  near(M.computeGeometry(st({ shape: 'triangle', solid: 'prism' })).Vpri, M.TRI_PRISM_VOLUME, 1e-9, 'same prism as the triangle base at h = 6')
  ok(M.PIECES.length === 3, 'three pieces')
  let sum = 0
  for (const p of M.PIECES) {
    const v = M.tetraVolume(...M.cornersOf(p))
    near(v, M.TRI_PRISM_VOLUME / 3, 1e-9, `piece ${p.n} (${p.corners}) = ⅓ of the prism = 27`)
    sum += v
    ok(p.faces.length === 4 && new Set(p.faces.map((f) => f.key)).size === 4, `piece ${p.n} has four different faces`)
    // Faces wind counter-clockwise from outside: the outward normal points away from the 4th corner
    const P = M.cornersOf(p)
    for (const f of p.faces) {
      const pts = f.idx.map((q) => P[q])
      const other = P[[0, 1, 2, 3].find((q) => !f.idx.includes(q))]
      const n = [
        (pts[1][1] - pts[0][1]) * (pts[2][2] - pts[0][2]) - (pts[1][2] - pts[0][2]) * (pts[2][1] - pts[0][1]),
        (pts[1][2] - pts[0][2]) * (pts[2][0] - pts[0][0]) - (pts[1][0] - pts[0][0]) * (pts[2][2] - pts[0][2]),
        (pts[1][0] - pts[0][0]) * (pts[2][1] - pts[0][1]) - (pts[1][1] - pts[0][1]) * (pts[2][0] - pts[0][0]),
      ]
      const d = n[0] * (other[0] - pts[0][0]) + n[1] * (other[1] - pts[0][1]) + n[2] * (other[2] - pts[0][2])
      ok(d < 0, `piece ${p.n} face ${f.key} faces outward`)
    }
    // Pulled fully apart, nothing sinks below the floor
    for (const c of P) ok(c[2] + p.push[2] >= -1e-12, `piece ${p.n} stays on or above the floor`)
  }
  near(sum, M.TRI_PRISM_VOLUME, 1e-9, 'the three pieces add up to the prism (no gaps, no overlaps)')
  // Every piece's corners are prism corners, and each prism face is covered: the two cuts share AF
  ok(M.PIECES.every((p) => p.corners.includes('A') && p.corners.includes('F')), 'every piece contains the shared cut edge AF')
  // Why Equal? pair 1: bases ABC and DEF are equal, both heights are h = 6
  near(triArea(T.A, T.B, T.C), triArea(T.D, T.E, T.F), 1e-12, 'pair 1: equal bases ABC and DEF')
  near(T.F[2] - T.A[2], 6, 1e-12, 'pair 1: piece 1 is h tall (F above ABC)')
  near(T.D[2] - T.A[2], 6, 1e-12, 'pair 1: piece 3 is h tall (A below DEF)')
  // Pair 2: bases ABE and ADE are the two halves of the rectangle ABED, both with apex F
  near(triArea(T.A, T.B, T.E), triArea(T.A, T.D, T.E), 1e-12, 'pair 2: ABE and ADE are equal halves')
  near(triArea(T.A, T.B, T.E) * 2, Math.hypot(6, 1) * 6, 1e-9, 'pair 2: together they make the side face ABED')
  ok(M.PAIRS[1].pieces.join() === '1,3' && M.PAIRS[2].pieces.join() === '2,3', 'pairs 1–3 and 2–3')
  for (const k of [1, 2]) {
    for (const n of M.PAIRS[k].pieces) ok(M.PIECES[n - 1].faces.some((f) => f.key === M.PAIRS[k].faces[n]), `pair ${k}: piece ${n} has face ${M.PAIRS[k].faces[n]}`)
  }
  near(M.pullT(0), 0, 0, 'pull 0'); near(M.pullT(100), 1, 0, 'pull 100'); near(M.pullT(50), 0.5, 1e-12, 'pull 50 half way')
  // Framing: the pieces stay on the stage when pulled apart
  const pts = []
  for (const p of M.PIECES) for (const c of M.cornersOf(p)) { pts.push(c); pts.push([c[0] + p.push[0], c[1] + p.push[1], c[2] + p.push[2]]) }
  const fr = M.frameFor(pts, M.STEP5_CAM)
  ok(fr.zoom > 0.5 && fr.zoom <= 1, 'step 5 frame zoom ' + fr.zoom)
  // frameFor with the home camera matches homeFrame
  const g0 = M.computeGeometry(st())
  ok(JSON.stringify(M.frameFor([...g0.pyr.base3D, g0.pyr.apex])) === JSON.stringify(M.homeFrame(g0)), 'homeFrame = frameFor at the home camera')
}

console.log(`${pass} passed, ${fail} failed`)
if (fail) process.exit(1)
