// The demonstrations on the Misc Demonstrations page, in gallery order. Each lives at
// #/misc-demonstrations/<id>.
export type DemoId = 'pyramids-prisms' | 'nets'

export interface Demo {
  id: DemoId
  name: string
  /** One line, for the gallery card and the "Another Demonstration" link. */
  tagline: string
}

export const DEMOS: Demo[] = [
  {
    id: 'pyramids-prisms',
    name: 'Pyramids & Prisms',
    tagline: 'Slice them at any height to see where V = Ah and V = ⅓Ah come from.',
  },
  {
    id: 'nets',
    name: 'Nets of 3D Shapes',
    tagline: 'Fold a net into its solid and see which edges and faces join up.',
  },
]
