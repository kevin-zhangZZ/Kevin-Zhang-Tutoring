import { groundGrid, type SceneItem } from '../lib/solid3d.ts'
import { NET_SHAPES, foldState, netFaceInfo, pairColour } from '../lib/nets.ts'
import { useThumbStage, type ThumbSpec } from './useThumbStage'

// Gallery thumbnail for Nets of 3D Shapes: the cube's cross net, half folded, that folds shut
// when the card is hovered or focused. Colours match the Nets demo (faces by colour, taped
// edges by pair colour, dashed fold lines). Decorative only.

const CUBE = NET_SHAPES[0]
const CROSS = CUBE.nets[0]
const NET = CROSS.net

// The root face (the base) never moves with anchor 'net': the camera looks at its centre.
const root = NET.faces2d[NET.root]
const BC: [number, number] = [root.reduce((s, p) => s + p[0], 0) / root.length, root.reduce((s, p) => s + p[1], 0) / root.length]
const GRID = groundGrid({ size: 6.75, step: 1.5, fade: 0.9, centre: BC })

const CI: Record<string, number> = {}
for (const f of NET.order) CI[f] = netFaceInfo(CUBE, NET, f)?.ci ?? 1
const EDGES = NET.netEdges.filter(e => !e.smooth)

const SPEC: ThumbSpec = {
  options: {
    fit: 5.55, aspect: 0.6, minHeight: 170, maxHeight: 280, autoRotate: 9,
    camera: { yaw: -0.6, pitch: 0.5, target: [BC[0], BC[1], 1.35] },
  },
  rest: 0.5,
  hover: 0.97,
  ms: 1100,
  scene: (t) => {
    const st = foldState(CUBE.shape, NET, t, { anchor: 'net' })
    const items: SceneItem[] = []
    for (const f of NET.order) {
      items.push({ type: 'poly', pts: st.faces[f], normal: st.normals[f], fill: `var(--mg-face-${CI[f]})`, className: 'mg-net-face', group: 'net' })
    }
    for (const e of EDGES) {
      const poly = st.faces[e.face]
      const a = poly[e.i], b = poly[(e.i + 1) % poly.length]
      const hinge = e.kind === 'hinge'
      const no = e.solidEdge ? CROSS.pairNo[e.solidEdge] : undefined
      items.push({
        type: 'seg', a, b,
        stroke: hinge || !no ? 'var(--mg-fold)' : `var(--mg-pair-${pairColour(no)})`,
        width: hinge ? 1.2 : 2.6,
        dash: hinge ? '4 3' : undefined,
        hiddenStyle: 'hide',
        linecap: 'round',
      })
    }
    return [GRID, items]
  },
}

export default function NetThumb({ active }: { active: boolean }) {
  const ref = useThumbStage(SPEC, active)
  return <div ref={ref} />
}
