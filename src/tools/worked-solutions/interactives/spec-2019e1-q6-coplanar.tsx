// 2019 Specialist Exam 1 Q6 — three vectors in space are linearly dependent exactly when they
// lie in one plane through the origin. A turnable 3D view (orthographic projection drawn on a
// blank plane) shows the sheet spanned by a = 2i − 3j + 4k and b = −2i + 4j − 8k, i.e. the plane
// 4x + 4y + z = 0, and c = −6i + 2j + dk. Changing d only slides c's tip up and down the vertical
// line above (−6, 2); the sheet crosses that line once, at −10a − 7b = −6i + 2j + 16k. The red
// gap d − 16 is the mismatch in the k-equation once the i and j equations have fixed m = −10,
// n = −7. "View edge-on" turns the camera until the sheet is a line, so on/off the plane is
// obvious; "Spin" turns it for depth.

import { useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, PlayButton, Point, Polygon, Readout,
  Readouts, Slider, Vector, clamp, usePlayer,
} from './kit'

type V3 = [number, number, number]
type Attach = 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw' | 'c'

const A: V3 = [2, -3, 4]
const B: V3 = [-2, 4, -8]
const M0 = -10 // fixed by the i and j equations
const N0 = -7
const P: V3 = [M0 * A[0] + N0 * B[0], M0 * A[1] + N0 * B[1], M0 * A[2] + N0 * B[2]] // (−6, 2, 16)
const D_MIN = -4
const D_MAX = 26

// The scene is drawn far from the plane's own axes so its grid and axes stay out of view.
const OX = 500
const OY = 500

// Camera: turned θ about the z-axis, raised a fixed angle φ. φ is chosen so the sheet
// (normal 4i + 4j + k) is seen exactly edge-on at θ = 138°: 4cos φ (cos θ + sin θ) + sin φ = 0.
const EDGE = 138
const rad = (deg: number) => (deg * Math.PI) / 180
const PHI = Math.atan(-4 * (Math.cos(rad(EDGE)) + Math.sin(rad(EDGE))))

function proj([x, y, z]: V3, thDeg: number): [number, number] {
  const th = rad(thDeg)
  const sx = -x * Math.sin(th) + y * Math.cos(th)
  const sy = -Math.sin(PHI) * (x * Math.cos(th) + y * Math.sin(th)) + z * Math.cos(PHI)
  return [OX + sx, OY + sy]
}

// In-sheet directions: e1 is level (x + y = 0, z = 0), e2 runs straight down the slope.
const R2 = Math.SQRT2
const R66 = Math.sqrt(66)
const sheet = (s: number, t: number): V3 => [s / R2 + t / R66, -s / R2 + t / R66, (-8 * t) / R66]
const S_RANGE: [number, number] = [-8, 6]
const T_RANGE: [number, number] = [-18.5, 9.5]
const CONTOURS = [-8, 0, 8, 16] // heights of the level lines drawn on the sheet

/** Which side of a point to put its label: away from the origin on screen. */
function outward([sx, sy]: [number, number]): Attach {
  const ang = (Math.atan2(sy - OY, sx - OX) * 180) / Math.PI
  const dirs: Attach[] = ['e', 'ne', 'n', 'nw', 'w', 'sw', 's', 'se']
  return dirs[((Math.round(ang / 45) % 8) + 8) % 8]
}

export default function Coplanar() {
  const [d, setD] = useState(6)
  const [theta, setTheta] = useState(100)
  const player = usePlayer(setTheta, { min: 0, max: 180, seconds: 9 })

  const pr = (p: V3) => proj(p, theta)
  const O = pr([0, 0, 0])
  const tip = pr([-6, 2, d])
  const pP = pr(P)
  const gap = d - 16
  const inPlane = gap === 0
  const edgeOn = Math.abs(theta - EDGE) <= 1.5
  const cCol = inPlane ? C.good : C.g
  const trackRight = pP[0] >= OX

  const dFromScreenY = (y: number) => {
    const base = pr([-6, 2, 0])[1]
    return clamp(Math.round((y - base) / Math.cos(PHI)), D_MIN, D_MAX)
  }

  const corners: [number, number][] = [
    pr(sheet(S_RANGE[0], T_RANGE[0])),
    pr(sheet(S_RANGE[1], T_RANGE[0])),
    pr(sheet(S_RANGE[1], T_RANGE[1])),
    pr(sheet(S_RANGE[0], T_RANGE[1])),
  ]

  const axes: { end: V3; name: string }[] = [
    { end: [9, 0, 0], name: 'x' },
    { end: [0, 9, 0], name: 'y' },
    { end: [0, 0, 24], name: 'z' },
  ]

  let notice
  if (inPlane && edgeOn) {
    notice = (
      <Notice tone="good">
        <b>Edge-on, the sheet is a single line and the tip of <M>{'\\underset{\\sim}{c}'}</M> sits right on it.</b> So{' '}
        <M>{'\\underset{\\sim}{c}'}</M> lies in the plane of <M>{'\\underset{\\sim}{a}'}</M> and{' '}
        <M>{'\\underset{\\sim}{b}'}</M>: <M>{'\\underset{\\sim}{c}=-10\\underset{\\sim}{a}-7\\underset{\\sim}{b}'}</M>, and the
        three vectors are linearly dependent. Press Spin — from every angle the tip stays in the sheet.
      </Notice>
    )
  } else if (inPlane) {
    notice = (
      <Notice tone="good">
        <b>At <M>d = 16</M> the tip of <M>{'\\underset{\\sim}{c}'}</M> lands on the green point, which is in the sheet.</b>{' '}
        So <M>{'\\underset{\\sim}{c}=-10\\underset{\\sim}{a}-7\\underset{\\sim}{b}'}</M>: one vector is built from the other
        two, which is what linearly dependent means. Press View edge-on to see all three lie flat in one plane.
      </Notice>
    )
  } else if (edgeOn) {
    notice = (
      <Notice tone="warn">
        <b>
          Edge-on, the sheet of <M>{'\\underset{\\sim}{a}'}</M> and <M>{'\\underset{\\sim}{b}'}</M> is just a line, and the tip
          of <M>{'\\underset{\\sim}{c}'}</M> is {Math.abs(gap)} {Math.abs(gap) === 1 ? 'unit' : 'units'} {gap > 0 ? 'above' : 'below'} it.
        </b>{' '}
        Every <M>{'m\\underset{\\sim}{a}+n\\underset{\\sim}{b}'}</M> stays in the sheet, so none of them can equal{' '}
        <M>{'\\underset{\\sim}{c}'}</M>: the vectors are independent. Drag the tip (or <M>d</M>) onto the line.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Changing <M>d</M> only slides the tip of <M>{'\\underset{\\sim}{c}'}</M> up or down the dashed line above{' '}
        <M>(-6, 2)</M>. The <M>{'\\underset{\\sim}{i}'}</M> and <M>{'\\underset{\\sim}{j}'}</M> equations fix{' '}
        <M>m=-10,\ n=-7</M> whatever <M>d</M> is, and <M>{'-10\\underset{\\sim}{a}-7\\underset{\\sim}{b}'}</M> is the green
        point at height <M>16</M> — the only point of the sheet on that line. From this angle it is hard to judge whether
        the tip is in the sheet: press View edge-on.
      </Notice>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <Plane x={[OX - 18, OX + 18]} y={[OY - 12.5, OY + 27]} xStep={1e5} yStep={1e5} height={380} labels={false} xLabel="" yLabel="">
        {/* the sheet spanned by a and b, with level lines at heights −8, 0, 8, 16 */}
        <Polygon points={corners} color={C.f} fillOpacity={0.12} strokeOpacity={0.45} weight={1.5} />
        {CONTOURS.map(h => {
          const t = (-h * R66) / 8
          return (
            <Line.Segment
              key={h}
              point1={pr(sheet(S_RANGE[0], t))}
              point2={pr(sheet(S_RANGE[1], t))}
              color={C.f}
              weight={1}
              opacity={0.4}
            />
          )
        })}

        {/* axes: positive halves solid, negative halves dashed */}
        {axes.map(({ end, name }) => {
          const neg: V3 = [-end[0], -end[1], end[2] ? -10 : 0]
          const e = pr(end)
          return (
            <g key={name}>
              <Line.Segment point1={O} point2={e} color={C.guide} weight={1.5} />
              <Line.Segment point1={O} point2={pr(neg)} color={C.guide} weight={1} style="dashed" opacity={0.6} />
              <Label at={e} attach={outward(e)} color={C.guide} italic size={14} gap={4}>
                {name}
              </Label>
            </g>
          )
        })}

        {/* floor shadow of c and the vertical track its tip rides on */}
        <Line.Segment point1={pr([-6, 2, 0])} point2={pr([-6, 0, 0])} color={C.guide} weight={1} style="dashed" />
        <Line.Segment point1={pr([-6, 2, 0])} point2={pr([0, 2, 0])} color={C.guide} weight={1} style="dashed" />
        <Line.Segment point1={pr([-6, 2, D_MIN])} point2={pr([-6, 2, D_MAX])} color={C.guide} weight={1.5} style="dashed" />
        <Point x={pr([-6, 2, 0])[0]} y={pr([-6, 2, 0])[1]} color={C.guide} />

        {/* a and b lie in the sheet */}
        <Vector tail={O} tip={pr(A)} color={C.f} weight={3} />
        <Vector tail={O} tip={pr(B)} color={C.violet} weight={3} />
        <Label at={pr(A)} attach={outward(pr(A))} color={C.f} italic>
          a
        </Label>
        <Label at={pr(B)} attach={outward(pr(B))} color={C.violet} italic>
          b
        </Label>

        {/* the gap between c's tip and the sheet, along the track */}
        {!inPlane && <Line.Segment point1={tip} point2={pP} color={C.bad} weight={3.5} />}
        <Vector tail={O} tip={tip} color={cCol} weight={3} />
        <Point x={pP[0]} y={pP[1]} color={C.good} />
        <Label at={pP} attach={trackRight ? 'e' : 'w'} color={C.good}>
          (−6, 2, 16)
        </Label>
        <Label at={tip} attach={gap >= 0 ? (trackRight ? 'ne' : 'nw') : trackRight ? 'se' : 'sw'} color={cCol} italic>
          c
        </Label>
        <MovablePoint
          point={tip}
          color={cCol}
          constrain={p => pr([-6, 2, dFromScreenY(p[1])])}
          onMove={p => {
            player.stop()
            setD(dFromScreenY(p[1]))
          }}
        />
      </Plane>

      <Controls>
        <Slider label="d" value={d} onChange={setD} min={D_MIN} max={D_MAX} step={1} format={v => String(v)} />
        <Slider
          label="\text{turn}"
          value={theta}
          onChange={v => {
            player.stop()
            setTheta(v)
          }}
          min={0}
          max={180}
          step={1}
          format={v => `${Math.round(v)}°`}
        />
        <Buttons>
          <ActionButton
            label="View edge-on"
            onClick={() => {
              player.stop()
              setTheta(EDGE)
            }}
          />
          <PlayButton playing={player.playing} onClick={() => player.toggle(theta)} label="Spin" />
        </Buttons>
        <Readouts>
          <Readout
            color={cCol}
            tex={`\\underset{\\sim}{c} = -6\\underset{\\sim}{i}+2\\underset{\\sim}{j}${d < 0 ? '-' : '+'}${Math.abs(d)}\\underset{\\sim}{k}`}
          />
          <Readout
            color={C.good}
            tex="-10\underset{\sim}{a}-7\underset{\sim}{b} = -6\underset{\sim}{i}+2\underset{\sim}{j}+16\underset{\sim}{k}"
          />
          <Readout color={inPlane ? C.good : C.bad} tex={inPlane ? '\\text{gap} = d-16 = 0\\ \\checkmark' : `\\text{gap} = d-16 = ${gap}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
