// Tests for src/tools/misc-demonstrations/lib/nets.ts — run from the project root with:
//   node scripts/nets.test.mjs
// Node 24 strips the TypeScript types itself, so the library is imported directly.
import * as N from '../src/tools/misc-demonstrations/lib/nets.ts'

let passed = 0, failed = 0
const failures = []
function check(cond, msg) {
  if (cond) passed++
  else { failed++; if (failures.length < 80) failures.push(msg) }
}
const TOL = 1e-9
const d3 = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2])
const d2 = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1])
const area2 = poly => poly.reduce((s, p, i) => { const q = poly[(i + 1) % poly.length]; return s + p[0] * q[1] - q[0] * p[1] }, 0) / 2
const mean = pts => pts[0].map((_, k) => pts.reduce((s, p) => s + p[k], 0) / pts.length)
const close = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)

// Do two convex polygons overlap in their interiors? (separating-axis test; touching is fine)
function interiorsOverlap(P, Q, eps = 1e-9) {
  for (const poly of [P, Q]) {
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i], b = poly[(i + 1) % poly.length]
      const nx = -(b[1] - a[1]), ny = b[0] - a[0], L = Math.hypot(nx, ny)
      const pa = P.map(p => (p[0] * nx + p[1] * ny) / L), pb = Q.map(p => (p[0] * nx + p[1] * ny) / L)
      if (Math.max(...pa) <= Math.min(...pb) + eps || Math.max(...pb) <= Math.min(...pa) + eps) return false
    }
  }
  return true
}
function isConvex2(poly) {
  let sign = 0
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length], c = poly[(i + 2) % poly.length]
    const cr = (b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0])
    if (Math.abs(cr) < 1e-12) continue
    if (sign === 0) sign = Math.sign(cr); else if (Math.sign(cr) !== sign) return false
  }
  return true
}
function sameSegment(s, t, tol = TOL) {
  return (d3(s[0], t[0]) <= tol && d3(s[1], t[1]) <= tol) || (d3(s[0], t[1]) <= tol && d3(s[1], t[0]) <= tol)
}
// Canonical form of a set of grid cells up to rotation / reflection / translation.
function canonical(cells) {
  const T = [([x, y]) => [x, y], ([x, y]) => [-x, y], ([x, y]) => [x, -y], ([x, y]) => [-x, -y],
    ([x, y]) => [y, x], ([x, y]) => [-y, x], ([x, y]) => [y, -x], ([x, y]) => [-y, -x]]
  return T.map(f => {
    const c = cells.map(f), mx = Math.min(...c.map(p => p[0])), my = Math.min(...c.map(p => p[1]))
    return c.map(([x, y]) => [x - mx, y - my]).sort((a, b) => a[0] - b[0] || a[1] - b[1]).map(p => p.join(',')).join(' ')
  }).sort()[0]
}
// Cells of a square net (any net of a cube with side a).
function cellsOf(net, a) {
  const all = Object.values(net.faces2d).flat()
  const mx = Math.min(...all.map(p => p[0])), my = Math.min(...all.map(p => p[1]))
  return Object.values(net.faces2d).map(poly => {
    const x = Math.min(...poly.map(p => p[0])), y = Math.min(...poly.map(p => p[1]))
    return [Math.round((x - mx) / a), Math.round((y - my) / a)]
  })
}
function faceKeyAt(st, f) { return st.faces[f].map(p => p.map(x => (Math.round(x * 1e6) / 1e6 + 0).toFixed(6)).join(',')).sort().join(' ') }

const TS = Array.from({ length: 21 }, (_, i) => i / 20)
const MODES = [{ mode: 'together' }, { mode: 'sequence' }, { mode: 'depth' }, { mode: 'sequence', overlap: 0.5 }, { mode: 'together', anchor: 'net' }]
const summary = []

/* ── 1. The catalogue: the mockups' nine shapes, in order ── */
const KEYS = ['cube', 'cuboid', 'triangular-prism', 'hexagonal-prism', 'square-pyramid', 'tetrahedron', 'octahedron', 'cylinder', 'cone']
check(same(N.NET_SHAPES.map(s => s.key), KEYS), 'shape order ' + N.NET_SHAPES.map(s => s.key))
check(same(N.NET_SHAPES.map(s => s.title), ['Cube', 'Cuboid', 'Triangular Prism', 'Hexagonal Prism', 'Square Pyramid', 'Tetrahedron', 'Octahedron', 'Cylinder', 'Cone']), 'titles')
check(same(N.NET_SHAPES.map(s => s.group), ['Prisms', 'Prisms', 'Prisms', 'Prisms', 'Pyramids', 'Pyramids', 'Other Polyhedra', 'Curved Solids', 'Curved Solids']), 'groups')
check(same(N.SHAPE_GROUPS, ['Prisms', 'Pyramids', 'Other Polyhedra', 'Curved Solids']), 'group order')
check(same(N.NET_SHAPES.map(s => s.nets.length), [11, 1, 1, 1, 1, 2, 1, 1, 1]), 'nets per shape')
check(N.getNetShape('cone') === N.NET_SHAPES[8] && N.getNetShape('sphere') === null, 'getNetShape')

/* ── 2. Every solid and every net ── */
for (const ns of N.NET_SHAPES) {
  const shape = ns.shape, S = shape.solid, tag = ns.key
  const V3 = Object.fromEntries(S.vertices.map(v => [v.id, v.p]))
  const F3 = Object.fromEntries(S.faces.map(f => [f.id, f]))
  const E3 = Object.fromEntries(S.edges.map(e => [e.id, e]))
  const edgeBy = (a, b) => S.edges.find(e => (e.v[0] === a && e.v[1] === b) || (e.v[0] === b && e.v[1] === a))
  const centre = mean(S.vertices.map(v => v.p))

  for (const f of S.faces) {
    const pts = f.verts.map(v => V3[v]), n = f.normal
    pts.forEach(p => check(Math.abs((p[0] - pts[0][0]) * n[0] + (p[1] - pts[0][1]) * n[1] + (p[2] - pts[0][2]) * n[2]) < TOL, `${tag}: face ${f.id} not planar`))
    const c = f.centroid
    check((c[0] - centre[0]) * n[0] + (c[1] - centre[1]) * n[1] + (c[2] - centre[2]) * n[2] > 0, `${tag}: face ${f.id} normal not outward`)
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i], b = pts[(i + 1) % pts.length], cc = pts[(i + 2) % pts.length]
      const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], w = [cc[0] - b[0], cc[1] - b[1], cc[2] - b[2]]
      const cr = [u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2], u[0] * w[1] - u[1] * w[0]]
      check(cr[0] * n[0] + cr[1] * n[1] + cr[2] * n[2] > 1e-12, `${tag}: face ${f.id} not convex / not CCW from outside`)
    }
  }
  const base = S.faces.find(f => f.role === 'base')
  check(base && Math.abs(base.normal[2] + 1) < TOL && base.verts.every(v => Math.abs(V3[v][2]) < TOL), `${tag}: base not on the ground`)
  check(Math.min(...S.vertices.map(v => v.p[2])) > -TOL, `${tag}: vertex below ground`)
  check(Math.hypot(base.centroid[0], base.centroid[1]) < 1e-9, `${tag}: base not centred`)
  S.edges.forEach(e => check(e.faces.length === 2, `${tag}: edge ${e.id}`))
  S.faces.forEach(f => f.verts.forEach((v, i) => check(edgeBy(v, f.verts[(i + 1) % f.verts.length]), `${tag}: side of ${f.id} not an edge`)))
  const V = S.vertices.length, E = S.edges.length, F = S.faces.length
  check(V - E + F === 2, `${tag}: V − E + F = ${V - E + F}`)
  const eu = N.euler(shape)
  if (shape.curved) check(eu.polyhedron === false && /not a polyhedron/.test(eu.note) && eu.model.chi === 2 && ns.euler === null, `${tag}: euler note`)
  else check(eu.polyhedron && eu.chi === 2 && eu.V === V && eu.E === E && eu.F === F && same(ns.euler, { F, V, E }), `${tag}: euler counts`)

  // areas & formula parts
  const poly = N.surfaceArea(shape, { polyhedral: true })
  check(Math.abs(poly - S.faces.reduce((s, f) => s + N.faceArea(shape, f.id), 0)) < TOL, `${tag}: polyhedral area`)
  const fm = shape.formulas
  check(Math.abs(fm.parts.reduce((s, p) => s + p.value, 0) - fm.total) < TOL, `${tag}: parts don't add to total`)
  check(same(fm.parts.flatMap(p => p.faces).sort(), S.faces.map(f => f.id).sort()), `${tag}: formula parts don't cover each face once`)
  if (shape.curved) {
    check(Math.abs(poly - fm.total) / fm.total < 0.01 && poly < fm.total, `${tag}: 32-gon model area ${poly} vs exact ${fm.total}`)
    check(N.surfaceArea(shape) === fm.total && typeof fm.totalExact === 'string', `${tag}: exact area`)
    S.edges.forEach(e => {
      const g = e.faces.map(f => F3[f].group)
      check(!!e.smooth === (g[0] === 'curved' && g[1] === 'curved') && !!e.group, `${tag}: smooth flag / group on ${e.id}`)
    })
    check(shape.surfaces.length === (tag === 'cone' ? 2 : 3), `${tag}: surfaces`)
  } else {
    check(Math.abs(poly - fm.total) < 1e-9, `${tag}: formula total ${fm.total} vs faces ${poly}`)
  }
  // the panel's face rows: one per logical face, areas add up to the shape's surface area
  check(same(ns.faces.map(f => f.id).sort(), shape.surfaces.map(s => s.id).sort()), `${tag}: face rows ≠ surfaces`)
  check(Math.abs(ns.faces.reduce((s, f) => s + f.area, 0) - N.surfaceArea(shape)) < 1e-9, `${tag}: face rows add to ${N.surfaceArea(shape)}`)
  ns.faces.forEach(f => {
    if (f.id !== 'curved' && !shape.curved) check(Math.abs(f.area - F3[f.id].area) < 1e-9, `${tag}: row ${f.id} area`)
    check(f.ci >= 1 && f.ci <= 8 && f.title.length > 0 && f.desc.length > 0, `${tag}: row ${f.id} fields`)
    check(f.exact ? f.areaText.startsWith(f.exact + ' ≈ ') : /^\d+$/.test(f.areaText), `${tag}: areaText ${f.areaText}`)
  })
  check(new Set(ns.faces.map(f => f.ci)).size === ns.faces.length, `${tag}: two faces share a colour`)
  check(ns.total.text.startsWith('Total = ') && ns.total.text.endsWith(' cm²'), `${tag}: total line`)
  check(Math.abs(ns.total.value - N.surfaceArea(shape)) < 1e-9, `${tag}: total value`)
  if (ns.total.approx) check(N.fmt2(ns.total.value) === ns.total.approx, `${tag}: total ≈ ${ns.total.approx} vs ${ns.total.value}`)
  else check(String(ns.total.value) === ns.total.exact, `${tag}: total ${ns.total.exact} vs ${ns.total.value}`)
  check(ns.formula.text.includes(ns.total.approx || ns.total.exact) && /\\mathbf\{/.test(ns.formula.tex), `${tag}: formula text/tex`)
  check(ns.fact.split('$').length % 2 === 1, `${tag}: unbalanced $ in fact`)

  for (const ni of ns.nets) {
    const net = ni.net, nt = `${tag}/${net.id}`
    const ids = Object.keys(net.faces2d)
    check(net.isNet && net.root === base.id && net.hinges.length === ids.length - 1, `${nt}: root / hinge count`)
    const reach = new Set([net.root])
    net.hinges.forEach(h => { check(reach.has(h.parent) && !reach.has(h.child), `${nt}: hinge order / tree`); reach.add(h.child) })
    check(reach.size === ids.length, `${nt}: hinges don't reach every face`)
    const b = net.bounds
    check(Math.abs(b.minX + b.maxX) < 1e-9 && Math.abs(b.minY + b.maxY) < 1e-9, `${nt}: not centred`)
    ids.forEach(f => {
      const sf = F3[net.faceMap[f]]
      check(sf && same(net.corners[f], sf.verts), `${nt}: corners of ${f} not in solid order`)
      check(Math.abs(N.faceArea(net, f) - sf.area) < 1e-9, `${nt}: area of ${f}`)
      check(area2(net.faces2d[f]) < 0, `${nt}: ${f} not clockwise from above`)
      check(isConvex2(net.faces2d[f]), `${nt}: ${f} not convex`)
      net.faces2d[f].forEach((p, i) => {
        const q = net.faces2d[f][(i + 1) % net.faces2d[f].length]
        const e = edgeBy(net.corners[f][i], net.corners[f][(i + 1) % net.corners[f].length])
        check(e && Math.abs(d2(p, q) - e.length) < 1e-9, `${nt}: side ${f}:${i} length`)
      })
    })
    const flat = N.foldState(shape, net, 0)
    ids.forEach(f => flat.faces[f].forEach((p, i) => check(Math.abs(p[2]) < 1e-12 && d2(p, net.faces2d[f][i]) < 1e-12, `${nt}: t=0 not the flat net (${f})`)))
    for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) check(!interiorsOverlap(net.faces2d[ids[i]], net.faces2d[ids[j]]), `${nt}: flat faces ${ids[i]} and ${ids[j]} overlap`)
    for (const opt of MODES) {
      for (const t of TS) {
        const st = N.foldState(shape, net, t, opt)
        net.hinges.forEach(h => {
          const P1 = st.faces[h.parent], C1 = st.faces[h.child]
          check(sameSegment([P1[h.pi], P1[(h.pi + 1) % P1.length]], [C1[h.ci], C1[(h.ci + 1) % C1.length]]), `${nt}: hinge ${h.parent}-${h.child} separates at t=${t} (${opt.mode})`)
        })
        if (t === 0.5) ids.forEach(f => st.faces[f].forEach((p, i) => {
          const q = st.faces[f][(i + 1) % st.faces[f].length], p2 = net.faces2d[f][i], q2 = net.faces2d[f][(i + 1) % st.faces[f].length]
          check(Math.abs(d3(p, q) - d2(p2, q2)) < 1e-9, `${nt}: face ${f} not rigid`)
        }))
      }
    }
    const early = N.foldState(shape, net, 0.1, { anchor: 'net' })
    ids.filter(f => f !== net.root).forEach(f => check(early.centroids[f][2] > 0, `${nt}: ${f} folds down`))
    for (const opt of MODES.filter(o => o.anchor === undefined)) {
      const st = N.foldState(shape, net, 1, opt)
      ids.forEach(f => st.faces[f].forEach((p, i) => check(d3(p, V3[net.corners[f][i]]) <= TOL, `${nt}: t=1 (${opt.mode}) corner ${f}@${i}`)))
      ids.forEach(f => check(d3(st.normals[f], F3[f].normal) < 1e-9, `${nt}: folded normal of ${f}`))
      net.netEdges.filter(e => e.kind === 'cut').forEach(e => {
        const o = net.netEdges.find(x => x.id === e.partner), A = st.faces[e.face], B = st.faces[o.face]
        check(sameSegment([A[e.i], A[(e.i + 1) % A.length]], [B[o.i], B[(o.i + 1) % B.length]]), `${nt}: cut pair ${e.id} / ${o.id} doesn't meet`)
      })
    }
    // anchor 'net' + toSolid (and solidToFoldFrame) give the solid too
    const stN = N.foldState(shape, net, 1, { anchor: 'net' }), ts = net.toSolid
    ids.forEach(f => stN.faces[f].forEach((p, i) => {
      const c = Math.cos(ts.angle), s = Math.sin(ts.angle), v = V3[net.corners[f][i]]
      check(d3([c * p[0] - s * p[1] + ts.tx, s * p[0] + c * p[1] + ts.ty, p[2]], v) <= TOL, `${nt}: anchor net + toSolid`)
      check(d3(N.solidToFoldFrame(net, v, { anchor: 'net' }), p) <= 1e-9, `${nt}: solidToFoldFrame`)
    }))
    S.edges.forEach(e => {
      const hs = net.hinges.filter(h => h.edge === e.id), cs = net.netEdges.filter(x => x.kind === 'cut' && x.solidEdge === e.id)
      check((hs.length === 1 && cs.length === 0) || (hs.length === 0 && cs.length === 2), `${nt}: edge ${e.id} covered by ${hs.length} hinges + ${cs.length} cuts`)
      if (cs.length === 2) check(cs[0].pairId === cs[1].pairId && cs[0].partner === cs[1].id && cs[1].partner === cs[0].id, `${nt}: pair ${e.id}`)
    })
    const cuts = net.netEdges.filter(e => e.kind === 'cut')
    check(net.netEdges.length === net.hinges.length + cuts.length && cuts.length === 2 * net.cutPairs && net.cutPairs === E - net.hinges.length, `${nt}: net edge counts`)
    check(new Set(net.netEdges.map(e => e.id)).size === net.netEdges.length, `${nt}: duplicate net edge ids`)
    ids.forEach(f => net.faces2d[f].forEach((_, i) => check(N.netEdgeAt(net, f, i), `${nt}: no net edge at ${f}:${i}`)))
    net.netPoints.forEach(p => check(p.vertices.length === 1, `${nt}: net point ${p.id} becomes ${p.vertices.join(',')}`))
    const loops = N.outline(net)
    check(loops.length === 1, `${nt}: outline has ${loops.length} loops`)
    const per = loops[0].reduce((s, p, i) => s + d2(p, loops[0][(i + 1) % loops[0].length]), 0)
    check(Math.abs(per - cuts.reduce((s, e) => s + d2(e.seg[0], e.seg[1]), 0)) < 1e-9, `${nt}: outline perimeter`)

    // linked(): faces, edges, vertices both ways
    S.faces.forEach(f => {
      const r = N.linked(shape, net, { kind: 'face', id: f.id })
      const expect = f.group ? ids.filter(x => F3[x].group === f.group) : [f.id]
      check(same(r.netFaces.slice().sort(), expect.slice().sort()), `${nt}: linked face ${f.id}`)
      check(N.linked(shape, net, { kind: 'netFace', id: f.id }).faces.indexOf(f.id) >= 0, `${nt}: linked netFace ${f.id}`)
    })
    S.edges.forEach(e => {
      const r = N.linked(shape, net, { kind: 'edge', id: e.id }, { groups: false })
      const kinds = r.netEdges.map(id => net.netEdges.find(x => x.id === id).kind)
      check((kinds.length === 1 && kinds[0] === 'hinge') || (kinds.length === 2 && kinds.every(k => k === 'cut')), `${nt}: linked edge ${e.id} -> ${kinds}`)
    })
    net.netEdges.forEach(ne => {
      const r = N.linked(shape, net, { kind: 'netEdge', id: ne.id }, { groups: false })
      check(r.edges.length === 1 && r.edges[0] === ne.solidEdge && r.netEdges.indexOf(ne.id) >= 0 && r.edgeKind === ne.kind, `${nt}: linked netEdge ${ne.id}`)
      if (ne.kind === 'cut') check(r.netEdges.length === 2 && r.netEdges.indexOf(ne.partner) >= 0, `${nt}: linked netEdge partner ${ne.id}`)
    })
    S.vertices.forEach(v => {
      const r = N.linked(shape, net, { kind: 'vertex', id: v.id })
      const nFaces = S.faces.filter(f => f.verts.includes(v.id)).length
      check(r.corners.length === nFaces, `${nt}: vertex ${v.id} has ${r.corners.length} net corners, ${nFaces} faces`)
      r.corners.forEach(c => {
        const back = N.linked(shape, net, { kind: 'corner', id: c })
        check(back.vertices.length === 1 && back.vertices[0] === v.id && back.corners.length === r.corners.length, `${nt}: corner ${c}`)
      })
      r.netPoints.forEach(pid => check(N.linked(shape, net, { kind: 'netPoint', id: pid }).vertices[0] === v.id, `${nt}: net point ${pid}`))
      check(N.cornerCount(ni, v.id) === r.netPoints.length, `${nt}: cornerCount ${v.id}`)
    })
    // sequence steps: lid last, steps run in order
    const steps = N.foldSteps(shape, net, { mode: 'sequence' })
    check(steps.reduce((s, st) => s + st.hinges.length, 0) === net.hinges.length, `${nt}: steps cover all hinges`)
    if (F3.top) {
      const lidSub = new Set(['top'])
      net.hinges.forEach(h => { if (lidSub.has(h.parent)) lidSub.add(h.child) })
      const j0 = steps.findIndex(s2 => s2.faces.includes('top'))
      check(j0 >= 0 && steps.every((s2, j) => (j >= j0) === s2.faces.every(f => lidSub.has(f))), `${nt}: lid not last`)
    }
    for (let j = 0; j < steps.length; j++) {
      const st = N.foldState(shape, net, (j + 0.5) / steps.length, { mode: 'sequence' })
      steps.forEach((s2, jj) => s2.faces.forEach(f => {
        const pr = st.progress[f]
        check(jj < j ? pr === 1 : jj > j ? pr === 0 : pr > 0 && pr < 1, `${nt}: step ${jj} progress ${pr} at step ${j}`)
      }))
    }
    if (shape.curved) check(steps.some(s => s.label === 'Curved surface' && s.kind === 'roll' && s.hinges.length === 31), `${nt}: curved strips roll as one step`)

    // taped-pair numbering: 1…n, each number on exactly two cut edges, rising clockwise round the net
    if (!shape.curved) {
      const nums = Object.values(ni.pairNo)
      check(same(nums.slice().sort((a, b) => a - b), Array.from({ length: net.cutPairs }, (_, i) => i + 1)) && ni.pairCount === net.cutPairs, `${nt}: pair numbers ${nums}`)
      check(ni.walkComplete && ni.walk.length === cuts.length, `${nt}: outside walk incomplete`)
      const walk = ni.walk.map(id => net.netEdges.find(e => e.id === id))
      walk.forEach((e, i) => check(d2(e.seg[1], walk[(i + 1) % walk.length].seg[0]) < 1e-6, `${nt}: walk breaks after ${e.id}`))
      check(area2(walk.map(e => e.seg[0])) < 0, `${nt}: walk is not clockwise`)
      const top = Math.max(...walk.map(e => e.seg[0][1]))
      const leftTop = Math.min(...walk.filter(e => Math.abs(e.seg[0][1] - top) < 1e-9).map(e => e.seg[0][0]))
      check(close(walk[0].seg[0][1], top) && close(walk[0].seg[0][0], leftTop), `${nt}: walk doesn't start at the top-left corner`)
      let hi = 0
      walk.forEach(e => { const n = ni.pairNo[e.solidEdge]; if (n > hi) { check(n === hi + 1, `${nt}: number ${n} met before ${hi + 1}`); hi = n } })
      Object.entries(ni.pairNo).forEach(([e, n]) => check(cuts.filter(c => c.solidEdge === e).length === 2 && n >= 1, `${nt}: pair ${n}`))
      check(ni.foldLines === F - 1 && ni.tapedPairs === E - F + 1 && ni.outsideEdges === 2 * (E - F + 1), `${nt}: fold / taped counts`)
      net.hinges.forEach(h => { const np = F3[h.parent].normal, nc = F3[h.child].normal; check(close(ni.foldAngle[h.edge], (Math.acos(Math.max(-1, Math.min(1, np[0] * nc[0] + np[1] * nc[1] + np[2] * nc[2]))) * 180) / Math.PI, 1e-9), `${nt}: fold angle ${h.edge}`) })
      Object.keys(ni.hingeOf).forEach(e => check(net.netEdges.find(x => x.id === ni.hingeOf[e]).kind === 'hinge', `${nt}: hingeOf ${e}`))
      S.faces.forEach(f => {
        const fe = N.faceEdgesOnNet(ns, ni, f.id)
        check(fe.folds.length + fe.taped.length === f.verts.length, `${nt}: faceEdgesOnNet ${f.id}`)
      })
    }

    // meet lines while part-folded: a taped pair's midpoints come together, corners go to their target
    if (!shape.curved) {
      const cut = cuts[0]
      const m5 = N.meetLines(shape, net, 0.5, { kind: 'edge', id: cut.solidEdge }), m1 = N.meetLines(shape, net, 1, { kind: 'edge', id: cut.solidEdge })
      check(m5.segments.length === 1 && d3(...m5.segments[0]) > 1e-3 && m1.segments.length === 1 && d3(...m1.segments[0]) < 1e-9, `${nt}: meet line for ${cut.solidEdge}`)
      check(N.meetLines(shape, net, 0.5, { kind: 'edge', id: net.hinges[0].edge }).segments.length === 0, `${nt}: a fold line has no meet line`)
      const v = S.vertices.find(x => N.cornerCount(ni, x.id) > 1)
      if (v) {
        const mv = N.meetLines(shape, net, 0.4, { kind: 'vertex', id: v.id }, { anchor: 'net' })
        const tgt = N.foldState(shape, net, 1, { anchor: 'net' }).corners3d[v.id][0]
        check(mv.target && d3(mv.target, tgt) < 1e-9 && mv.segments.length >= 1 && mv.segments.every(s => d3(s[1], tgt) < 1e-9), `${nt}: meet lines for vertex ${v.id}`)
        check(N.meetLines(shape, net, 1, { kind: 'vertex', id: v.id }).segments.length === 0, `${nt}: no meet lines when closed`)
      }
    }
  }
  summary.push(`${tag.padEnd(17)} V${String(V).padStart(3)} E${String(E).padStart(3)} F${String(F).padStart(3)}  nets ${ns.nets.length}  SA ${ns.total.exact}${ns.total.approx ? ' ≈ ' + ns.total.approx : ''}`)
}

/* ── 3. The data matches what the mockups showed ── */
const get = k => N.getNetShape(k)
const tot = k => get(k).total
check(same(['cube', 'cuboid', 'triangular-prism', 'hexagonal-prism', 'square-pyramid', 'tetrahedron', 'octahedron', 'cylinder', 'cone'].map(k => tot(k).exact + (tot(k).approx ? ' ≈ ' + tot(k).approx : '')),
  ['54', '52', '84', '12√3 + 60 ≈ 80.78', '96', '16√3 ≈ 27.71', '18√3 ≈ 31.18', '28π ≈ 87.96', '24π ≈ 75.40']), 'surface-area totals')
check(same(N.NET_SHAPES.map(s => s.size), ['s = 3', 'l = 4, w = 3, h = 2', '3-4-5 triangle, length 6', 'side 2, length 5', 'base 6, slant height 5, height 4', 'edge 4', 'edge 3', 'r = 2, h = 5', 'r = 3, s = 5, h = 4']), 'sizes')
// colours (B's names: blue 1, amber 2, emerald 3, rose 4, violet 5, orange 6, teal 7, lime 8)
const colours = k => Object.fromEntries(get(k).faces.map(f => [f.id, f.ci]))
check(same(colours('cube'), { top: 1, base: 2, front: 3, back: 4, left: 5, right: 6 }), 'cube colours')
check(same(colours('triangular-prism'), { left: 1, right: 5, base: 2, back: 4, slope: 3 }), 'triangular prism colours')
check(same(colours('square-pyramid'), { base: 2, front: 3, right: 6, back: 4, left: 5 }), 'square pyramid colours')
check(same(colours('octahedron'), { abe: 1, bce: 3, cde: 4, ade: 6, abf: 5, bcf: 2, cdf: 7, adf: 8 }), 'octahedron colours')
check(same(colours('cylinder'), { top: 1, base: 2, curved: 3 }) && same(colours('cone'), { base: 2, curved: 4 }), 'curved colours')
check(N.pairColour(1) === 1 && N.pairColour(8) === 8 && N.pairColour(11) === 3 && N.NETS_PALETTE.light.face.length === 8 && N.NETS_PALETTE.dark.pair.length === 8, 'palette')

// cube: 11 nets + 5 non-nets; Net 1 is the upright cross; rows of four stand upright
{
  const ns = get('cube'), a = ns.shape.dims.a
  check(a === 3 && ns.netsTitle === '11 nets of a cube', 'cube size / title')
  const nets = ns.nets.map(n => n.net)
  const canon = nets.map(n => canonical(n.cells))
  check(nets.length === 11 && new Set(canon).size === 11, 'cube nets are not 11 distinct shapes')
  nets.forEach(n => check(canonical(cellsOf(n, a)) === canonical(n.cells), `cube/${n.id}: layout doesn't match its cells`))
  const c1 = Object.fromEntries(Object.entries(nets[0].faces2d).map(([f, p]) => [f, mean(p)]))
  check(ns.nets[0].name === 'Cross' && close(c1.back[0], c1.base[0]) && close(c1.front[0], c1.base[0]) && close(c1.top[0], c1.base[0]) &&
    c1.back[1] > c1.base[1] && c1.front[1] < c1.base[1] && c1.top[1] < c1.front[1] && c1.left[0] < c1.base[0] && c1.right[0] > c1.base[0] &&
    close(c1.left[1], c1.base[1]) && close(c1.right[1], c1.base[1]), 'cube Net 1 is not the upright cross (Back above Base, Front below, Top below Front)')
  ns.nets.filter(n => n.family === '1-4-1').forEach(n => {
    const xs = n.cells.map(c => c[0]), counts = {}
    xs.forEach(x => { counts[x] = (counts[x] || 0) + 1 })
    check(Object.values(counts).includes(4), `cube/${n.id}: row of four is not upright`)
  })
  check(same(ns.nets.map(n => n.family), ['1-4-1', '1-4-1', '1-4-1', '1-4-1', '1-4-1', '1-4-1', '2-3-1', '2-3-1', '2-3-1', '2-2-2', '3-3']), 'cube families')
  ns.nets.forEach(n => check(n.caption === N.CUBE_FAMILIES[n.family].label && N.familyOf(n.cells) === n.family, `cube/${n.id}: caption / family`))
  check(same(ns.netGroups.map(g => g.caption), ['Row of Four (1–4–1)', 'Row of Three (1–3–2)', 'Staircase (2–2–2)', 'Two Rows of Three (3–3)']) && same(ns.netGroups.map(g => g.nets.length), [6, 3, 1, 1]), 'cube Pick a Net groups')
  check(ns.nets.every(n => n.pairCount === 7 && n.foldLines === 5), 'cube: 7 taped pairs and 5 fold lines on every net')
  check(same(ns.nets[0].pairNo, { AE: 6, EH: 5, DH: 7, GH: 1, CG: 2, FG: 3, BF: 4 }), 'cube Net 1 tag numbers ' + JSON.stringify(ns.nets[0].pairNo))
  ns.nets.forEach(n => n.net.hinges.forEach(h => check(close(n.foldAngle[h.edge], 90), `cube/${n.id}: fold angle`)))
  // the 5 non-nets
  const pats = N.IS_IT_A_NET
  check(pats.length === 16 && pats.filter(p => p.isNet).length === 11 && pats.filter(p => !p.isNet).length === 5, 'Is It a Net?: 11 nets + 5 non-nets')
  pats.filter(p => !p.isNet).forEach(p => check(!canon.includes(canonical(p.cells)) && p.failReason.length > 20, `non-net ${p.id}`))
  check(same(pats.filter(p => !p.isNet).map(p => p.id), ['block-2x3', 'row-of-five', 'flaps-same-side', 'cross-arm-moved', 'long-flap']), 'non-net ids')
  // every spanning tree of the cube's faces (384) unfolds to one of the 11
  const F = ns.shape.solid.faces.map(f => f.id), E = ns.shape.solid.edges
  let trees = 0
  const seen = new Set()
  for (let mask = 0; mask < 1 << E.length; mask++) {
    let bits = 0
    for (let m = mask; m; m &= m - 1) bits++
    if (bits !== 5) continue
    const chosen = E.filter((_, i) => mask & (1 << i))
    const parent = Object.fromEntries(F.map(f => [f, f]))
    const find = f => (parent[f] === f ? f : (parent[f] = find(parent[f])))
    let ok = true
    chosen.forEach(e => { const x = find(e.faces[0]), y = find(e.faces[1]); if (x === y) ok = false; else parent[x] = y })
    if (!ok) continue
    trees++
    const adj = {}
    chosen.forEach(e => { (adj[e.faces[0]] = adj[e.faces[0]] || []).push(e.faces[1]); (adj[e.faces[1]] = adj[e.faces[1]] || []).push(e.faces[0]) })
    const hinges = [], q = ['base'], vis = { base: 1 }
    while (q.length) { const f = q.shift(); (adj[f] || []).forEach(g => { if (!vis[g]) { vis[g] = 1; hinges.push([f, g]); q.push(g) } }) }
    const tn = N.buildTreeNet(ns.shape, { id: 'tree' + mask, name: 'tree', hinges })
    const tids = Object.keys(tn.faces2d)
    let overlap = false
    for (let i = 0; i < tids.length; i++) for (let j = i + 1; j < tids.length; j++) if (interiorsOverlap(tn.faces2d[tids[i]], tn.faces2d[tids[j]])) overlap = true
    check(!overlap, `cube spanning tree ${mask} overlaps when unfolded`)
    seen.add(canonical(cellsOf(tn, a)))
  }
  check(trees === 384 && seen.size === 11 && [...seen].every(c => canon.includes(c)), `spanning trees: ${trees}, unfold to ${seen.size} shapes`)
  // all 35 free hexominoes: exactly the 11 fold into a cube
  let level = new Set([canonical([[0, 0]])])
  for (let k = 1; k < 6; k++) {
    const nextLevel = new Set()
    level.forEach(key => {
      const cells = key.split(' ').map(s => s.split(',').map(Number)), has = new Set(cells.map(c => c.join(',')))
      cells.forEach(([x, y]) => [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => { if (!has.has((x + dx) + ',' + (y + dy))) nextLevel.add(canonical(cells.concat([[x + dx, y + dy]]))) }))
    })
    level = nextLevel
  }
  const hexominoes = [...level].map(k => k.split(' ').map(s => s.split(',').map(Number)))
  const folding = hexominoes.filter(c => N.cubeNet(c).isNet)
  check(hexominoes.length === 35 && folding.length === 11 && folding.every(c => canon.includes(canonical(c))), `hexominoes: ${hexominoes.length}, ${folding.length} fold into a cube`)
  hexominoes.forEach(c => {
    const n = N.cubeNet(c)
    if (n.isNet) return
    const st = N.foldState(ns.shape, n, 1), ks = Object.keys(n.faces2d).map(f => faceKeyAt(st, f))
    check(ks.some((k, i) => ks.indexOf(k) !== i) && n.missing.length > 0, 'hexomino non-net: two squares coincide')
  })
  check(N.cubeNet([[0, 0], [2, 0]]) === null && N.cubeNet([]) === null, 'cubeNet: disconnected / empty -> null')
  const open = N.cubeNet([[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]])
  check(open && !open.isNet && open.missing.length === 1 && /exactly six/.test(open.failReason), 'cubeNet: 5 squares = open box')
}

// Is It a Net?: every pattern in all 8 orientations; overlaps, gaps and feedback
{
  const cube = get('cube').shape
  for (const p of N.IS_IT_A_NET) {
    for (let sym = 0; sym < 8; sym++) {
      const ch = N.makeChallenge(p, sym), net = ch.net, tg = `challenge ${p.id}/${sym}`
      check(ch.isNet === p.isNet && net.isNet === p.isNet, `${tg}: isNet`)
      check(same(Object.values(ch.squareNo).sort(), [1, 2, 3, 4, 5, 6]), `${tg}: square numbers`)
      const byNo = Object.entries(ch.squareNo).sort((a, b) => a[1] - b[1]).map(([f]) => mean(net.faces2d[f]))
      byNo.forEach((c, i) => { if (i) check(c[1] < byNo[i - 1][1] - 1e-9 || (close(c[1], byNo[i - 1][1], 1e-6) && c[0] > byNo[i - 1][0]), `${tg}: squares not in reading order`) })
      const yes = N.challengeFeedback(ch, true), no = N.challengeFeedback(ch, false)
      check(yes.correct === p.isNet && no.correct === !p.isNet, `${tg}: feedback correctness`)
      if (p.isNet) {
        check(ch.overlapFaces.length === 0 && ch.missing.length === 0 && ch.clashes.length === 0 && N.gapPolygons(ch).length === 0, `${tg}: a net has no overlaps or gaps`)
        check(yes.message.startsWith('Correct — it’s a net.') && yes.tip === 'This is a ' + N.CUBE_FAMILIES[p.family].label + ' net: ' + N.CUBE_FAMILIES[p.family].tip + '.', `${tg}: net feedback`)
      } else {
        check(ch.overlapFaces.length >= 2 && ch.doubled.length >= 1 && ch.missing.length >= 1 && /left open/.test(ch.failDetail) && ch.failReason === p.failReason, `${tg}: overlap / gap detail`)
        check(ch.clashes.every(g => g.length >= 2) && ch.overlapFaces.every(f => ch.doubled.includes(net.faceMap[f])), `${tg}: clashes`)
        check(Object.values(ch.dupIndex).filter(x => x > 0).length === ch.missing.length, `${tg}: dupIndex`)
        check(no.message.startsWith('Correct — it’s not a net. Squares ' + N.listText(ch.clashes[0].map(String)) + ' land on the same face') && /left open\.$/.test(no.message), `${tg}: non-net feedback ${no.message}`)
        check(yes.message.startsWith('Not quite — squares') && /left open\. It isn’t a net\.$/.test(yes.message), `${tg}: wrong-answer feedback`)
        // the gaps: open faces of the cube, where no folded square lies (both anchors)
        for (const anchor of ['solid', 'net']) {
          const st = N.foldState(cube, net, 1, { anchor }), keys = Object.keys(net.faces2d).map(f => faceKeyAt(st, f))
          const coincide = keys.some((k, i) => keys.indexOf(k) !== i)
          check(coincide, `${tg}: two squares should coincide at t=1`)
          const gaps = N.gapPolygons(ch, { anchor })
          check(gaps.length === ch.missing.length, `${tg}: gap count`)
          gaps.forEach(g => {
            const key = g.pts.map(p => p.map(x => (Math.round(x * 1e6) / 1e6 + 0).toFixed(6)).join(',')).sort().join(' ')
            check(!keys.includes(key) && g.pts.length === 4, `${tg}: gap ${g.face} is covered (${anchor})`)
          })
        }
        const r = N.linked(cube, net, { kind: 'face', id: ch.doubled[0] })
        check(r.clash && r.netFaces.length >= 2, `${tg}: linked doubled face should clash`)
      }
    }
  }
  const row5 = N.makeChallenge(N.IS_IT_A_NET.find(p => p.id === 'row-of-five'))
  check(N.challengeFeedback(row5, false).tip === 'Tip: with 5 squares in a row, the 1st and 5th always land on the same face.', 'row-of-five tip')
  check(Object.keys(row5.net.faces2d).some(f => / \(2nd square\)$/.test(N.netFaceName(cube, row5.net, f))), 'netFaceName for a doubled square')
  check(N.GRID_SYMMETRIES.length === 8 && N.GRID_SYMMETRIES[1](1, 0)[1] === 1 && N.GRID_SYMMETRIES[1](1, 0)[0] === 0, 'symmetries')
}

// cuboid: the cross, base in the middle, Top hinged to Front
{
  const n = get('cuboid').nets[0].net
  check(n.id === 'cross' && n.hinges.filter(h => h.parent === 'base').length === 4 && n.hinges.some(h => h.parent === 'front' && h.child === 'top'), 'cuboid cross net')
  check(same(get('cuboid').nets[0].pairNo, { AE: 6, EH: 5, DH: 7, GH: 1, CG: 2, FG: 3, BF: 4 }), 'cuboid tag numbers')
  check(get('cuboid').fact.includes('$SA = 2(lw + lh + wh)$'), 'cuboid fact maths')
}

// triangular prism: lying on ABED, A the right angle, 3-4-5 triangle, length 6, SA 84
{
  const ns = get('triangular-prism'), s = ns.shape, P = Object.fromEntries(s.solid.vertices.map(v => [v.id, v.p]))
  const base = s.solid.faces.find(f => f.role === 'base')
  check(base.id === 'base' && base.label === 'ABED' && base.polygon === 'rectangle', 'triangular prism rests on ABED ' + base.label)
  const u = [0, 1, 2].map(k => P.B[k] - P.A[k]), w = [0, 1, 2].map(k => P.C[k] - P.A[k])
  check(Math.abs(u[0] * w[0] + u[1] * w[1] + u[2] * w[2]) < 1e-12 && close(d3(P.A, P.B), 4) && close(d3(P.A, P.C), 3) && close(d3(P.B, P.C), 5) && close(d3(P.A, P.D), 6), 'A is the right angle: AB = 4, AC = 3, BC = 5, length 6')
  check(close(N.surfaceArea(s), 84) && ns.total.exact === '84' && s.formulas.total === 84, 'triangular prism SA = 84')
  check(same(ns.faces.map(f => [f.id, f.name, f.areaText]), [['left', 'Left', '6'], ['right', 'Right', '6'], ['base', 'Base', '24'], ['back', 'Back', '18'], ['slope', 'Slope', '30']]), 'triangular prism rows')
  check(same(s.solid.faces.map(f => f.polygon).sort(), ['rectangle', 'rectangle', 'rectangle', 'right-angled triangle', 'right-angled triangle']), 'triangular prism polygons')
  check(ns.nets[0].name === 'Strip of Three' && ns.nets[0].caption === 'Strip of Three Rectangles', 'triangular prism net name')
  check(same(ns.nets[0].pairNo, { CF: 2, DF: 5, EF: 1, BC: 3, AC: 4 }), 'triangular prism tag numbers ' + JSON.stringify(ns.nets[0].pairNo))
  check(ns.formulaNote === 'The three rectangles together = perimeter × length.', 'triangular prism note')
}

// hexagonal prism: band of six hinged to the base on CDJI, base below the band and Top above it
{
  const ns = get('hexagonal-prism'), n = ns.nets[0].net, ix = Object.fromEntries(ns.shape.solid.faces.map(f => [f.id, f]))
  const h0 = n.hinges.find(h => h.parent === 'base')
  check(n.hinges.filter(h => h.parent === 'base').length === 1 && h0.child === 'side3' && ix.side3.label === 'CDJI' && h0.edge === 'CD', 'hex band hinged on CDJI')
  const c = f => mean(n.faces2d[f])
  const sides = ['side1', 'side2', 'side3', 'side4', 'side5', 'side6']
  check(sides.every(f => close(c(f)[1], c('side3')[1], 1e-9)) && c('base')[1] < c('side3')[1] && c('top')[1] > c('side3')[1], 'hex band is one row, base below, top above')
  check(same(ns.faces.slice(2).map(f => [f.name, f.named]), sides.map(f => [ix[f].label, false])) && ns.faces[2].title === 'Face ' + ix.side1.label, 'hex side names are their letters')
  check(same(ns.nets[0].pairNo, { AG: 4, GL: 1, KL: 10, JK: 11, GH: 2, HI: 3, AB: 5, BC: 6, AF: 7, EF: 8, DE: 9 }), 'hex tag numbers')
}

// square pyramid: slant height 5, height 4, slant edge √34
{
  const ns = get('square-pyramid'), s = ns.shape
  check(ns.slant && ns.slant.s === 5 && ns.slant.h === 4 && ns.slant.apex === 'E' && close(s.formulas.slant.value, 5), 'pyramid slant height')
  check(N.lenText(s.solid.edges.find(e => e.id === 'AE').length) === '√34 ≈ 5.83', 'pyramid slant edge √34 ≈ 5.83')
  check(ns.mistake === 'Common mistake: use the slant height $s = 5$ cm, not the height $h = 4$ cm.', 'pyramid common mistake')
  check(same(ns.nets[0].pairNo, { DE: 4, CE: 1, BE: 2, AE: 3 }), 'pyramid tag numbers')
}

// tetrahedron: big triangle + strip of four (a landscape parallelogram)
{
  const ns = get('tetrahedron'), strip = ns.nets[1].net
  check(same(ns.nets.map(n => n.name), ['Big Triangle', 'Strip of Four']) && ns.netsTitle === '2 nets of a tetrahedron', 'tetrahedron nets')
  check(Math.abs(strip.toSolid.angle) > 0.1 && strip.bounds.w > strip.bounds.h && N.outline(strip)[0].length === 4, 'tetrahedron strip is a landscape parallelogram')
  check(same(ns.nets[1].pairNo, { AC: 1, AD: 2, BD: 3 }) && same(ns.nets[0].pairNo, { AD: 3, CD: 1, BD: 2 }), 'tetrahedron tag numbers')
  check(ns.faces[0].areaText === '4√3 ≈ 6.93', 'tetrahedron face area')
}

// octahedron: equator ABCD, apexes E and F, resting on CDF
{
  const ns = get('octahedron'), s = ns.shape, P = Object.fromEntries(s.solid.vertices.map(v => [v.id, v.p]))
  check(same(s.solid.vertices.map(v => v.id), ['A', 'B', 'C', 'D', 'E', 'F']), 'octahedron letters')
  const base = s.solid.faces.find(f => f.role === 'base')
  check(base.id === 'cdf' && base.label === 'CDF' && ['C', 'D', 'F'].every(v => Math.abs(P[v][2]) < 1e-9), 'octahedron rests on CDF')
  check(['AB', 'BC', 'CD', 'AD', 'AE', 'BE', 'CE', 'DE', 'AF', 'BF', 'CF', 'DF'].every(e => close(d3(P[e[0]], P[e[1]]), 3)) && close(d3(P.A, P.C), 3 * Math.SQRT2) && close(d3(P.E, P.F), 3 * Math.SQRT2), 'octahedron: edge 3, equator ABCD a square, E opposite F')
  check(same(ns.faces.map(f => f.name), ['ABE', 'BCE', 'CDE', 'ADE', 'ABF', 'BCF', 'CDF', 'ADF']) && ns.faces.every(f => !f.named && f.title === 'Face ' + f.name), 'octahedron face names')
  check(ns.nets[0].caption === 'Band of Six + Two' && same(ns.nets[0].pairNo, { AE: 5, AB: 1, AF: 2, CF: 3, DF: 4 }), 'octahedron net')
  check(close(N.surfaceArea(s), 18 * Math.sqrt(3)), 'octahedron SA 18√3')
}

// cylinder: rectangle 4π × 5 with its circles, rims 4π, SA 28π
{
  const ns = get('cylinder'), ni = ns.nets[0], g = ni.curved, s = ns.shape
  check(ns.curved.kind === 'cylinder' && ns.curved.circumference.exact === '4π' && ns.curved.circumference.approx === '12.57', 'cylinder rim 4π ≈ 12.57')
  check(g.kind === 'cylinder' && close(g.w, 4 * Math.PI) && close(g.h, 5) && close(g.r, 2) && close(d2(g.rect[0], g.rect[3]), 4 * Math.PI) && close(d2(g.rect[0], g.rect[1]), 5), 'cylinder rectangle 4π × 5')
  check(close(g.up[0], 0) && close(g.up[1], 1) && g.baseC[1] < g.rect[0][1] && g.topC[1] > g.rect[1][1] && close(d2(g.baseC, g.touchBase), 2) && close(d2(g.topC, g.touchTop), 2), 'cylinder: base circle below the rectangle, top circle above')
  check(close(g.bounds.h, 5 + 8) && close(g.bounds.w, 4 * Math.PI), 'cylinder net bounds')
  check(same(s.formulas.parts.map(p => p.exact), ['8π', '20π']) && s.formulas.totalExact === '28π' && close(N.surfaceArea(s), 28 * Math.PI), 'cylinder exact areas')
  check(same(ni.pairNo, { seam: 1, topRim: 2, baseRim: 3 }) && ni.pairCount === 3 && ns.curved.tapedNote.startsWith('This net: 3 pairs'), 'cylinder tag numbers')
  const net = ni.net
  const loops = N.groupOutline(s, net, 'curved')
  check(loops.length === 1 && loops[0].length === 4, 'cylinder: the unrolled strips make a rectangle')
  const rc = N.linked(s, net, { kind: 'face', id: 'curved' })
  check(rc.netFaces.length === 32 && same(rc.surfaces, ['curved']), 'cylinder: the curved surface selects every strip')
  const rs = N.linked(s, net, { kind: 'edge', id: 'seam' })
  check(rs.netEdges.length === 2 && same(rs.logicalEdges, ['seam']) && rs.edgeKind === 'cut', 'cylinder: seam links its two edges')
  const rt = N.linked(s, net, { kind: 'edge', id: 'topRim' })
  check(rt.edges.length === 32 && rt.netEdges.length === 63 && same(rt.logicalEdges, ['topRim']), 'cylinder: top rim')
  check(same(N.linked(s, net, { kind: 'netFace', id: 'c7' }).surfaces, ['curved']) && N.logicalFace(ns, 'c7') === 'curved' && N.netFaceInfo(ns, net, 'c7').name === 'Curved Surface', 'cylinder: a strip is the curved surface')
  check(net.netEdges.filter(e => e.smooth).length === 31 && net.netEdges.filter(e => e.group === 'seam').every(e => N.logicalEdgeOf(e) === 'seam'), 'cylinder: smooth hinges / seam')
  const ms = N.meetLines(s, net, 0.5, { kind: 'edge', id: 'seam' })
  check(ms.segments.length === 1 && d3(...ms.segments[0]) > 0.1 && d3(...N.meetLines(s, net, 1, { kind: 'edge', id: 'seam' }).segments[0]) < 1e-9, 'cylinder: seam meet line')
  check(same(N.foldSteps(s, net).map(st => st.kind), ['fold', 'roll', 'lid']), 'cylinder steps')
}

// cone: a 216° sector of radius 5 sitting above its circle, SA 24π
{
  const ns = get('cone'), ni = ns.nets[0], g = ni.curved, s = ns.shape
  check(ns.curved.sectorAngle === 216 && ns.curved.sectorFraction === '3⁄5' && ns.curved.s === 5, 'cone 216° = 3⁄5 of a circle')
  check(g.kind === 'cone' && close(g.angle, 216) && close(g.s, 5) && close(g.r, 3) && close(g.mid, -Math.PI / 2), 'cone sector geometry')
  check(g.apex[1] > g.baseC[1] + 5 && close(d2(g.touch, g.baseC), 3) && close(d2(g.touch, g.apex), 5) && g.arcEnds.every(e => close(d2(e, g.apex), 5)), 'cone: sector above its circle, touching it')
  check(close(ns.curved.circumference.value, 6 * Math.PI) && ns.curved.circumference.exact === '6π', 'cone rim 6π')
  check(close(N.surfaceArea(s), 24 * Math.PI) && s.formulas.totalExact === '24π' && same(s.formulas.parts.map(p => p.exact), ['9π', '15π']), 'cone SA 24π')
  check(same(ni.pairNo, { seam: 1, baseRim: 2 }) && ns.slant.apex === 'V', 'cone tag numbers')
  const net = ni.net, apex = net.netPoints.find(p => p.vertices[0] === 'V')
  check(apex && apex.corners.length === 32 && apex.xy[1] > mean(net.faces2d.base)[1], 'cone strip net: apex above the base circle')
  const radii = N.groupOutline(s, net, 'curved')[0].map(p => d2(p, apex.xy)).filter(x => x > 1e-6)
  check(radii.every(x => Math.abs(x - s.dims.l) < 1e-9) && s.dims.l === 5, 'cone: sector radius = slant height 5')
  let ang = 0
  Object.keys(net.faces2d).filter(f => f[0] === 'c').forEach(f => {
    const p = net.faces2d[f], v = p[2], u1 = [p[0][0] - v[0], p[0][1] - v[1]], u2 = [p[1][0] - v[0], p[1][1] - v[1]]
    ang += Math.acos((u1[0] * u2[0] + u1[1] * u2[1]) / (Math.hypot(...u1) * Math.hypot(...u2)))
  })
  check(Math.abs((ang * 180) / Math.PI - 216) < 1, `cone strip net angle ${(ang * 180) / Math.PI}°`)
  const vr = N.linked(s, net, { kind: 'vertex', id: 'V' })
  check(vr.netPoints.length === 1 && vr.corners.length === 32, 'cone: apex link')
  check(same(N.linked(s, net, { kind: 'edge', id: 'baseRim' }).logicalEdges, ['baseRim']), 'cone: base rim')
}

/* ── 4. Helpers, builders, misc API ── */
check(same(N.splitMath('That’s why $SA = 2(lw)$.'), [{ math: false, text: 'That’s why ' }, { math: true, text: 'SA = 2(lw)' }, { math: false, text: '.' }]), 'splitMath')
check(N.fmtDeg(90) === '90' && N.fmtDeg(59.04) === '59.0' && N.fmtDeg(208.07) === '208.1' && N.fmt2(75.398) === '75.40' && N.lenText(5) === '5' && N.lenText(Math.sqrt(8)) === '2√2 ≈ 2.83', 'number formatting')
check(N.piText(28 * Math.PI) === '28π' && N.piText(Math.PI) === 'π' && N.piText(3) === null && N.listText(['a', 'b', 'c']) === 'a, b and c', 'piText / listText')
check(same(N.labelPoint([[0, 0], [4, 0], [0, 3]]), [1, 1]), 'labelPoint = incentre of a 3-4-5 triangle')
{
  const vf = N.vertexFacts(get('cube'), 'A')
  check(vf.faces.length === 3 && close(vf.sum, 270) && same(vf.faces, ['base', 'front', 'left']), 'vertexFacts cube A')
  const vp = N.vertexFacts(get('square-pyramid'), 'E')
  check(vp.faces.length === 4 && vp.sum < 360, 'vertexFacts pyramid apex')
  check(same(N.countList(get('cube'), 'face'), ['top', 'base', 'front', 'back', 'left', 'right']) && N.countList(get('octahedron'), 'edge').length === 12, 'countList')
}
check(N.ease.smooth(0) === 0 && N.ease.smooth(1) === 1 && Math.abs(N.ease.smooth(0.5) - 0.5) < 1e-12, 'easing')
{
  const cube = get('cube').shape, net = cube.nets[0]
  const st = N.foldState(cube, net, 0, { hingeT: { front: 1 }, anchor: 'net' })
  check(Object.keys(st.progress).every(f => st.progress[f] === (f === 'front' ? 1 : 0)), 'hingeT')
  const half = N.foldState(cube, net, 0.5, { mode: 'together', ease: 'smooth' })
  check(Object.values(half.progress).every(p => close(p, 0.5)), 'ease smooth at 0.5')
}
{
  const big = N.build('cuboid', { l: 4, w: 2.5, h: 1 })
  check(big.nets.length === 2 && Math.abs(N.surfaceArea(big) - 2 * (10 + 4 + 2.5)) < 1e-9, 'build cuboid')
  const obl = N.build('pyramid', { n: 4, a: 3, h: 2, apex: [0.6, 0.3] })
  check(obl.nets.length === 2 && obl.nets.every(n => n.isNet), 'build oblique pyramid')
  const oct = N.build('prism', { n: 8, a: 1, h: 2 })
  check(oct.solid.faces.length === 10 && oct.nets.length === 2 && oct.id === 'octagonal-prism', 'build octagonal prism')
  const cyl = N.build('cylinder', { r: 1, h: 2 })
  check(same(cyl.nets.map(n => n.id), ['circles-middle', 'circles-ends']) && same(N.foldSteps(cyl, cyl.nets[0]).map(s => s.kind), ['fold', 'roll', 'lid']), 'build cylinder')
  check(N.builders.length === 7, 'builders')
  let threw = false
  try { N.build('sphere') } catch { threw = true }
  check(threw, 'build unknown type throws')
}

/* ── Report ── */
console.log(summary.join('\n'))
if (failed) {
  console.log(`\nFAILED ${failed} of ${passed + failed} checks:`)
  failures.forEach(f => console.log('  - ' + f))
  process.exit(1)
} else {
  console.log(`\nAll ${passed} checks passed.`)
}
