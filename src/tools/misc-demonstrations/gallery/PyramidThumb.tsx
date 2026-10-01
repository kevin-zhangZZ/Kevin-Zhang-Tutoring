import { groundGrid, modelItems, pyramidModel, randomBlob, sliceAt } from '../lib/solid3d.ts'
import { useThumbStage, type ThumbSpec } from './useThumbStage'

// Gallery thumbnail for Pyramids & Prisms: a pyramid on a lumpy base with an orange slice that
// rises when the card is hovered or focused. Decorative only.

const H = 5.4
const PYR = pyramidModel(randomBlob(7), [0.5, 0.2, H])
const GRID = groundGrid({ size: 4.5, fade: 0.9 })

const SPEC: ThumbSpec = {
  options: {
    fit: 4.2, aspect: 0.6, minHeight: 170, maxHeight: 280, autoRotate: 9,
    camera: { yaw: -0.95, pitch: 0.34, target: [0.2, 0, 2.2] },
  },
  rest: 0.32,
  hover: 0.72,
  ms: 900,
  scene: (k) => {
    const sl = sliceAt(PYR, k * H)
    return [
      GRID,
      modelItems(PYR, { group: 'pyr', pickable: false, face: { className: 'mg-pyr-face' }, edge: { className: 'mg-pyr-edge' } }),
      sl && sl.scale > 0.001 && [
        { type: 'poly', pts: sl.pts, className: 'mg-slice-face', occluder: false },
        { type: 'line', pts: sl.pts, closed: true, className: 'mg-slice-edge', hiddenStyle: 'show' },
      ],
    ]
  },
}

export default function PyramidThumb({ active }: { active: boolean }) {
  const ref = useThumbStage(SPEC, active)
  return <div ref={ref} />
}
