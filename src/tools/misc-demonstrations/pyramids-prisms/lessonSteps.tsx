// The Lesson's six steps as data: copy, Predict questions, which controls and tiles each step
// shows, its preset state, camera and entry animation (mockup pyramids-b.html).
import type { ReactNode } from 'react'
import { HOME_CAM, RAISED_CAM, SIDE_CAM, STEP5_CAM, WEIRD_SEED, type CamPreset, type InsetTab, type PPState } from './model'
import type { TileId } from './Tiles'

export type StepN = 1 | 2 | 3 | 4 | 5 | 6
export const STEP_NUMBERS: StepN[] = [1, 2, 3, 4, 5, 6]

export type ControlId = 'shapes4' | 'shapes5' | 'z' | 's' | 'h' | 'solid' | 'view3d' | 'liftOff' | 'layers' | 'lmode' | 'pull' | 'slant'

export interface Predict {
  q: ReactNode
  choices: ReactNode[]
  correct: number
  /** Feedback for each wrong choice (the correct one's is lead + exp). */
  fb: ReactNode[]
  lead: string
  exp: ReactNode
}

export interface StepConf {
  n: StepN
  /** The step bar's label. */
  short: string
  title: string
  /** The state the step starts from (anything not given comes from DEFAULTS). */
  preset: Partial<PPState>
  cam: CamPreset
  /** Plays once the step's preset is in place: from → fn(t) over ms. */
  entry?: { from: Partial<PPState>; ms: number; fn: (t: number) => Partial<PPState> }
  controls: ControlId[]
  body: ReactNode
  tryThis: ReactNode
  predict?: Predict
  /** Ask before explaining (step 3: the answer is the lesson). */
  predictFirst?: boolean
  /** The tiles that matter in this step (the others are faded). */
  tiles: TileId[]
  inset: InsetTab | 'why'
  /** Ring the inset: this step's picture is there. */
  insetRing?: boolean
  gridStrong?: boolean
  /** Step 4: the layer-sum table and the Methods & Specialist extension. */
  table?: boolean
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const smooth = (t: number) => t * t * (3 - 2 * t)

export const STEPS: Record<StepN, StepConf> = {
  1: {
    n: 1,
    short: 'Prisms',
    title: 'A Prism Has the Same Slice All the Way Up',
    preset: { shape: 'square', solid: 'prism', h: 6, s: 0, z: 1.5, layers: 0, tab: 'slice' },
    cam: HOME_CAM,
    entry: { from: { z: 0 }, ms: 3000, fn: (t) => ({ z: t < 0.55 ? lerp(0, 6, smooth(t / 0.55)) : lerp(6, 1.5, smooth((t - 0.55) / 0.45)) }) },
    controls: ['shapes4', 'z', 's'],
    body: (
      <>
        A prism has the same cross-section all the way up. Slice it at any height and you get an exact copy of the base, so every slice has area{' '}
        <i>A</i>. Pile up slices of area <i>A</i> to a height <i>h</i> and the volume is <i>V</i> = <i>Ah</i>.
      </>
    ),
    tryThis: (
      <>
        Drag Slice Height <i>z</i>: the slice never changes. Then drag Shear to push the prism over like a stack of coins.
      </>
    ),
    predict: {
      q: 'When you shear the prism sideways, its volume…',
      choices: ['Gets Bigger', 'Stays the Same', 'Gets Smaller'],
      correct: 1,
      fb: [
        <>
          The slanted edges do get longer, but volume uses the perpendicular height <i>h</i>, not the edge length.
        </>,
        null,
        <>Each slice just slides across. None of them shrink, so the volume can’t drop.</>,
      ],
      lead: 'Right.',
      exp: (
        <>
          Every slice is still a copy of the base and the height is still <i>h</i>, so <i>V</i> = <i>Ah</i>.
        </>
      ),
    },
    tiles: ['S', 'V'],
    inset: 'slice',
  },
  2: {
    n: 2,
    short: 'Shrinking Slices',
    title: 'A Pyramid’s Slices Shrink to the Apex',
    preset: { shape: 'square', solid: 'pyramid', h: 6, s: 0, z: 3, layers: 0, tab: 'slice' },
    cam: SIDE_CAM,
    entry: { from: { z: 0 }, ms: 2000, fn: (t) => ({ z: lerp(0, 3, smooth(t)) }) },
    controls: ['z', 'view3d'],
    body: (
      <>
        Slice a pyramid and you get a smaller copy of its base. From the side you can see why: the slice sits <i>h</i> − <i>z</i> below the apex
        and the base sits <i>h</i> below it. These are similar triangles, so the slice is scaled by <i>k</i> = (<i>h</i> − <i>z</i>)/<i>h</i> = 1 −{' '}
        <i>z</i>/<i>h</i>.
      </>
    ),
    tryThis: (
      <>
        Drag <i>z</i> from the base to the apex. <i>k</i> falls steadily from 1 to 0.
      </>
    ),
    predict: {
      q: 'At what height is the slice half as wide as the base?',
      choices: [
        <>
          <i>z</i> = 2.0
        </>,
        <>
          <i>z</i> = 3.0
        </>,
        <>
          <i>z</i> = 4.5
        </>,
      ],
      correct: 1,
      fb: [
        <>
          At <i>z</i> = 2.0 the slice is 4 below the apex out of 6, so <i>k</i> = ⅔.
        </>,
        null,
        <>
          At <i>z</i> = 4.5 only 1.5 is left to the apex, so <i>k</i> = 1.5/6 = ¼.
        </>,
      ],
      lead: 'Yes.',
      exp: (
        <>
          Halfway up, <i>h</i> − <i>z</i> = 3 out of 6, so <i>k</i> = ½.
        </>
      ),
    },
    tiles: ['S'],
    inset: 'slice',
    insetRing: true,
  },
  3: {
    n: 3,
    short: 'Area × k²',
    title: 'Halve the Lengths, Quarter the Area',
    preset: { shape: 'square', solid: 'pyramid', h: 6, s: 0, z: 3, layers: 0, tab: 'slice' },
    cam: RAISED_CAM,
    controls: ['z', 'shapes5', 'liftOff'],
    predictFirst: true,
    body: (
      <>
        Every length in the slice is <i>k</i> times the matching length in the base. Area is length × length, so the slice’s area is <i>k</i>²
        times the base’s: <i>A</i>(<i>z</i>) = <i>A</i> × <i>k</i>² = <i>A</i>(1 − <i>z</i>/<i>h</i>)². The shape of the base doesn’t matter.
      </>
    ),
    tryThis: (
      <>
        Count the squares in the inset. Then try <i>z</i> = 4.5 (<i>k</i> = ¼): how many squares now?
      </>
    ),
    predict: {
      q: 'Halfway up, the slice is half as wide. What fraction of the base area does it cover?',
      choices: ['½', '¼', '⅛'],
      correct: 1,
      fb: [
        <>That’s the most common slip. Length and width both halve, so the area is ½ × ½ = ¼.</>,
        null,
        <>⅛ = ½³ is how volume scales (try Lift Off Top). Area only uses two lengths: ½ × ½ = ¼.</>,
      ],
      lead: 'Yes:',
      exp: '4 grid squares out of 16.',
    },
    tiles: ['S'],
    inset: 'slice',
    insetRing: true,
    gridStrong: true,
  },
  4: {
    n: 4,
    short: 'Stack the Slices',
    title: 'Stack the Slices: Where ⅓ Comes From',
    preset: { shape: 'square', solid: 'pyramid', h: 6, s: 0, z: 3, layers: 10, layerMode: 'inside', tab: 'graph' },
    cam: HOME_CAM,
    entry: { from: { layers: 4 }, ms: 1500, fn: (t) => ({ layers: Math.round(lerp(4, 10, t)) }) },
    controls: ['layers', 'lmode'],
    body: (
      <>
        Build the pyramid out of thin layers. Each layer is a flat prism, so its volume is slice area × thickness. Inside layers fall short and
        outside layers overshoot, but the gap between them is exactly <i>Ah</i>/<i>n</i>, so both close in on the same number: ⅓<i>Ah</i> = 32.0 u³.
      </>
    ),
    tryThis: 'Drag Layers to 30, then flip between Inside and Outside.',
    predict: {
      q: 'With more and more layers, the stack’s volume gets closer to…',
      choices: [
        <>
          ½<i>Ah</i> = 48.0
        </>,
        <>
          ⅓<i>Ah</i> = 32.0
        </>,
        <>
          ¼<i>Ah</i> = 24.0
        </>,
      ],
      correct: 1,
      fb: [
        <>
          ½ would be a straight-sided wedge. A pyramid’s slices shrink faster than that, as <i>k</i>².
        </>,
        null,
        <>Close, but the area graph’s shaded region is exactly ⅓ of the rectangle.</>,
      ],
      lead: 'Yes.',
      exp: (
        <>
          Inside and outside stacks close in on the same number from both sides, because the gap <i>Ah</i>/<i>n</i> shrinks to 0.
        </>
      ),
    },
    tiles: ['L', 'V'],
    inset: 'graph',
    table: true,
  },
  5: {
    n: 5,
    short: 'Three Pyramids',
    title: 'Three Pyramids Fill a Prism',
    preset: { shape: 'triangle', solid: 'prism', h: 6, s: 0, z: 3, layers: 0, tab: 'slice' },
    cam: STEP5_CAM,
    controls: ['pull'],
    body: (
      <>
        Cut a triangular prism with two flat cuts and it falls into three triangular pyramids. They look different, but they all have the same
        volume, so each one is exactly ⅓ of the prism: <i>V</i> = ⅓<i>Ah</i>.
      </>
    ),
    tryThis: 'Pull the pieces apart, then turn on Why Equal? and check each pair.',
    predict: {
      q: 'How many of these pyramids fill the prism?',
      choices: ['2', '3', '4'],
      correct: 1,
      fb: ['Two cuts make three pieces, not two. Count the numbered badges.', null, 'Two cuts make three pieces, not four. Pull them apart and count.'],
      lead: 'Right.',
      exp: 'Three equal pieces, so each is ⅓ of 81.0 = 27.0 u³.',
    },
    tiles: ['A', 'S', 'V', 'L'],
    inset: 'why',
  },
  6: {
    n: 6,
    short: 'Any Base, Any Lean',
    title: 'Any Base, Any Lean',
    preset: { shape: 'weird', seed: WEIRD_SEED, solid: 'pyramid', h: 6, s: 0, z: 2, layers: 0, tab: 'slice' },
    cam: HOME_CAM,
    controls: ['shapes5', 'solid', 'h', 's', 'z', 'slant'],
    body: (
      <>
        If two solids have the same slice area at every height, they have the same volume. This is Cavalieri’s principle. Sliding the apex moves
        each slice sideways without changing its area, so the volume stays ⅓<i>Ah</i>. The base can be any shape at all, and a cone is just a
        pyramid with a curved base: <i>V</i> = ⅓π<i>r</i>²<i>h</i>.
      </>
    ),
    tryThis: 'Slide the apex until it isn’t above the base at all. Then pick Curvy → Circle.',
    tiles: ['V', 'S'],
    inset: 'slice',
  },
}
