// 2020 Specialist Exam 1 Q3 — drag w round the unit circle (or press play to send it once round)
// and watch w³ = cis(3θ). Cubing triples the angle, so w³ moves three times as fast as w and laps
// the circle three times while w goes round once. Each lap passes through z = cis(−π/4) once, so z
// has exactly three cube roots: θ = −π/12, 7π/12 and −3π/4, found as green dots, a third of a turn
// apart. The violet spiral traces the angle 3θ from the positive real axis, so the extra full turn
// (3θ = −π/4 + 2π, or −π/4 − 2π) is visible rather than just asserted. Parking w on z itself shows
// the report's "found the cube of z" slip. A toggle shows the other slip the report describes, an
// incorrect argument: taking Arg z = π/4 aims at 1/√2 + i/√2, z reflected in the real axis, and
// its cube roots (red) are the mirror images of the true ones.

import { useEffect, useState } from 'react'
import {
  Buttons, C, Circle, Controls, Label, Line, M, MovablePoint, Notice, Plane, PlayButton, Point, Polygon, Polyline,
  Readout, Readouts, Slider, Toggle, usePlayer,
} from './kit'

const PI = Math.PI
/** Exact angles are handled as whole numbers of π/12. */
const U = PI / 12
const ROOTS = [-9, -1, 7] // the cube roots of z: −3π/4, −π/12, 7π/12
const WRONG = [-7, 1, 9] // the cube roots of cis(π/4): −7π/12, π/12, 3π/4
const ARG_Z = -3 // Arg z = −π/4
const FINE = PI / 120 // slider and drag stops, 1.5°
const MIN = -PI + FINE // −π itself is not a principal argument (it is the same point as π)

const at = (a: number, r = 1): [number, number] => [r * Math.cos(a), r * Math.sin(a)]

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

/** n·π/12 reduced, as TeX (7 → \tfrac{7\pi}{12}) or as plain text (−9 → −3π/4). */
export function piFrac(n: number, tex: boolean): string {
  if (n === 0) return '0'
  const g = gcd(Math.abs(n), 12)
  const p = Math.abs(n) / g
  const q = 12 / g
  const sign = n < 0 ? (tex ? '-' : '−') : ''
  const pi = tex ? '\\pi' : 'π'
  const top = p === 1 ? pi : `${p}${pi}`
  if (q === 1) return sign + top
  return tex ? `${sign}\\tfrac{${top}}{${q}}` : `${sign}${top}/${q}`
}

/** n·π/12 moved into the principal range (−π, π], i.e. n into (−12, 12]. */
export function principal(n: number): number {
  let m = n
  while (m > 12) m -= 24
  while (m <= -12) m += 24
  return m
}

/** A dragged angle: onto a multiple of π/12 when it is close to one, else onto the 1.5° stops. */
function snap(a: number): number {
  let t = a
  const n = Math.round(t / U)
  if (Math.abs(t - n * U) < 0.06) t = n * U
  else t = Math.round(t / FINE) * FINE
  return t <= -PI + 1e-9 ? PI : t
}

/** An arc from angle `from` to angle `to` whose radius grows by `grow` per full turn, so an angle
 *  of more than a full turn shows as more than one loop. */
export function spiral(from: number, to: number, r0: number, grow: number): [number, number][] {
  const n = Math.max(2, Math.ceil(Math.abs(to - from) / 0.04) + 1)
  return Array.from({ length: n }, (_, i) => {
    const a = from + ((to - from) * i) / (n - 1)
    return at(a, r0 + (grow * Math.abs(a - from)) / (2 * PI))
  })
}

export default function Triple() {
  const [theta, setTheta] = useState(2 * U)
  const [wrong, setWrong] = useState(false)
  const [found, setFound] = useState<Set<number>>(() => new Set())
  const player = usePlayer(setTheta, { min: MIN, max: PI, seconds: 9 })

  // A root counts as found when the student lands on it exactly, or when the animation sweeps
  // past it (a frame moves w at most about 0.035 rad, so 0.03 either side can't be skipped).
  const playing = player.playing
  useEffect(() => {
    const tol = playing ? 0.03 : 1e-6
    const hits = ROOTS.filter(n => Math.abs(theta - n * U) < tol)
    if (!hits.length) return
    setFound(prev => (hits.every(n => prev.has(n)) ? prev : new Set([...prev, ...hits])))
  }, [theta, playing])

  const n = Math.round(theta / U)
  const exact = Math.abs(theta - n * U) < 1e-6
  const rootHere = exact && ROOTS.includes(n)
  const wrongHere = wrong && exact && WRONG.includes(n)
  const cube = 3 * theta
  const w = at(theta)
  const w3 = at(cube)
  const w3Colour = rootHere ? C.good : wrongHere ? C.bad : C.violet
  const all = found.size === 3

  // Readouts, exact where the angle is a multiple of π/12.
  const thetaTex = exact ? piFrac(n, true) : `${(theta / PI).toFixed(2)}\\pi`
  let cubeTex: string
  if (exact) {
    const m = 3 * n
    const p = principal(m)
    const turns = (m - p) / 24
    cubeTex = `3\\theta = ${piFrac(m, true)}`
    if (turns !== 0) cubeTex += ` = ${piFrac(p, true)} ${turns > 0 ? '+' : '-'} ${Math.abs(turns) === 1 ? '2' : 2 * Math.abs(turns)}\\pi`
  } else {
    cubeTex = `3\\theta \\approx ${(cube / PI).toFixed(2)}\\pi`
  }

  let notice
  if (wrongHere) {
    notice = (
      <Notice tone="warn">
        <b>
          Here <M>{'w^3 = \\operatorname{cis}\\left(\\tfrac{\\pi}{4}\\right)'}</M>, the red ring, not <M>z</M>.
        </b>{' '}
        That number is <M>{'\\tfrac{1}{\\sqrt2} + \\tfrac{1}{\\sqrt2}i'}</M>: its imaginary part is positive, and{' '}
        <M>z</M>&apos;s is negative. So this <M>w</M> is a cube root of the wrong number. Its mirror image in the real
        axis, <M>{`\\operatorname{cis}\\left(${piFrac(-n, true)}\\right)`}</M>, is a true cube root of <M>z</M>.
      </Notice>
    )
  } else if (wrong) {
    notice = (
      <Notice tone="warn">
        <b>
          Taking <M>{'\\operatorname{Arg}(z) = \\tfrac{\\pi}{4}'}</M> aims at the wrong point.
        </b>{' '}
        <M>{'\\tan^{-1}(1) = \\tfrac{\\pi}{4}'}</M> gives only the size of the angle. <M>z</M> has a negative imaginary
        part, so it is below the real axis and <M>{'\\operatorname{Arg}(z) = -\\tfrac{\\pi}{4}'}</M>. The red ring is{' '}
        <span className="whitespace-nowrap">
          <M>{'\\tfrac{1}{\\sqrt2} + \\tfrac{1}{\\sqrt2}i'}</M>,
        </span>{' '}
        <M>z</M> reflected in the real axis, and the red triangle is its cube roots: each one the mirror image of a true
        root. Drag <M>w</M> onto a red corner and see where <M>w^3</M> lands.
      </Notice>
    )
  } else if (rootHere && n === -1) {
    notice = (
      <Notice tone="good">
        <b>
          <M>w^3 = z</M>.
        </b>{' '}
        <M>{'3\\theta = 3 \\times \\left(-\\tfrac{\\pi}{12}\\right) = -\\tfrac{\\pi}{4}'}</M>, exactly the argument of{' '}
        <M>z</M>. This is the root you get by dividing the argument by 3 (<M>k = 0</M> in the working). It is only one of
        three: a cube root is <i>any</i> <M>w</M> with <M>w^3 = z</M>. Drag <M>w</M> on anticlockwise and watch{' '}
        <M>w^3</M> race round to <M>z</M> again.
      </Notice>
    )
  } else if (rootHere && n === 7) {
    notice = (
      <Notice tone="good">
        <b>
          <M>w^3 = z</M> again.
        </b>{' '}
        <M>{'3\\theta = \\tfrac{7\\pi}{4}'}</M>, which isn&apos;t <M>{'-\\tfrac{\\pi}{4}'}</M>, but it is{' '}
        <M>{'-\\tfrac{\\pi}{4} + 2\\pi'}</M>. The violet spiral goes seven-eighths of a turn anticlockwise instead of an
        eighth of a turn clockwise, and ends pointing at <M>z</M> just the same. Angles <M>2\pi</M> apart point the same
        way, so this is the same complex number. This is <M>k = 1</M> in the
        working: <M>{'\\theta = \\tfrac{1}{3}\\left(-\\tfrac{\\pi}{4} + 2\\pi\\right) = \\tfrac{7\\pi}{12}'}</M>.
      </Notice>
    )
  } else if (rootHere) {
    notice = (
      <Notice tone="good">
        <b>
          <M>w^3 = z</M> again.
        </b>{' '}
        <M>{'3\\theta = -\\tfrac{9\\pi}{4} = -\\tfrac{\\pi}{4} - 2\\pi'}</M>: the violet spiral goes clockwise a full turn
        and an eighth, one full turn further than <M>{'-\\tfrac{\\pi}{4}'}</M>, and ends on <M>z</M>. This is{' '}
        <M>k = -1</M>. Carry on anticlockwise from <M>{'\\tfrac{7\\pi}{12}'}</M> instead and you reach this same point under the name{' '}
        <M>{'\\tfrac{5\\pi}{4}'}</M>, but that is bigger than <M>\pi</M>, so it isn&apos;t a principal value. Write{' '}
        <span className="whitespace-nowrap">
          <M>{'-\\tfrac{3\\pi}{4}'}</M>.
        </span>
      </Notice>
    )
  } else if (exact && n === ARG_Z) {
    notice = (
      <Notice tone="warn">
        <b>
          Here <M>w</M> is <M>z</M> itself
        </b>
        , so <M>w^3</M> is <M>z^3</M>: that is cubing <M>z</M>, not finding its cube roots. The report notes some students
        did exactly this. Cubing multiplies the angle by 3; a cube root needs an angle that, multiplied by 3,{' '}
        <i>gives</i> <M>{'-\\tfrac{\\pi}{4}'}</M>. (By coincidence <M>{'z^3 = \\operatorname{cis}\\left(-\\tfrac{3\\pi}{4}\\right)'}</M>{' '}
        is one of the three cube roots, but it is only one of three.)
      </Notice>
    )
  } else if (all) {
    notice = (
      <Notice tone="good">
        <b>All three cube roots found.</b> They are a third of a turn (<M>{'\\tfrac{2\\pi}{3}'}</M>) apart, at the corners
        of an equilateral triangle: moving <M>w</M> on by <M>{'\\tfrac{2\\pi}{3}'}</M> moves <M>w^3</M> on by{' '}
        <M>2\pi</M>, a full turn, which brings it back to the same place. As <M>w</M> goes once round, <M>w^3</M> goes
        round three times and passes <M>z</M> once per lap. That is why there are exactly three.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>w</M> is at angle <M>{thetaTex}</M>, so by de Moivre <M>{'w^3 = \\operatorname{cis}(3\\theta)'}</M> is at angle{' '}
        <M>{exact ? `3\\theta = ${piFrac(3 * n, true)}` : `3\\theta \\approx ${(cube / PI).toFixed(2)}\\pi`}</M>. Cubing
        triples the angle, and the modulus stays <M>{'1^3 = 1'}</M>. The violet spiral traces <M>3\theta</M>, so{' '}
        <M>w^3</M> moves three times as fast as <M>w</M>. Drag <M>w</M>, or press play, until the violet point lands on
        the orange{' '}
        <span className="whitespace-nowrap">
          <M>z</M>.
        </span>
        {found.size > 0 && <> Found so far: {found.size} of 3.</>}
      </Notice>
    )
  }

  const rootPts = ROOTS.map(k => at(k * U))
  const wrongPts = WRONG.map(k => at(k * U))

  return (
    <div>
      <Plane
        x={[-1.4, 1.4]}
        y={[-1.4, 1.4]}
        xStep={0.5}
        yStep={0.5}
        equalScale
        height={340}
        labels={false}
        xLabel=""
        yLabel="Im"
      >
        {/* "Re" just inside the right end: the kit's default spot past the axis end is clipped on
            a phone, where this plane is as wide as the screen. */}
        <Label at={[1.6, 0]} attach="nw" size={14} italic gap={6}>Re</Label>
        <Circle center={[0, 0]} radius={1} color={C.guide} fillOpacity={0} weight={1.5} />
        {all && <Polygon points={rootPts} color={C.good} fillOpacity={0.08} weight={1.5} strokeStyle="dashed" />}
        {wrong && (
          <>
            <Polygon points={wrongPts} color={C.bad} fillOpacity={0.05} weight={1.5} strokeStyle="dashed" />
            {wrongPts.map(([x, y], i) => (
              <Point key={i} x={x} y={y} color={C.bad} />
            ))}
            {/* The point the slip aims at, cis(π/4): a ring, to tell it apart from the red roots. */}
            <Line.Segment point1={[0, 0]} point2={at(PI / 4)} color={C.bad} style="dashed" weight={1.5} />
            <Circle center={at(PI / 4)} radius={0.08} color={C.bad} fillOpacity={0} weight={2.5} />
            <Label at={at(PI / 4)} color={C.bad} attach="ne" gap={9}>{wrongHere ? 'w³ ≠ z' : 'not z'}</Label>
          </>
        )}
        <Line.Segment point1={[0, 0]} point2={at(ARG_Z * U)} color={C.g} style="dashed" weight={1.5} />
        <Point x={at(ARG_Z * U)[0]} y={at(ARG_Z * U)[1]} color={C.g} />
        {[...found].map(k => (
          <Point key={k} x={at(k * U)[0]} y={at(k * U)[1]} color={C.good} />
        ))}
        {all &&
          ROOTS.map(k => (
            <Label key={k} at={at(k * U, 1.3)} color={C.good} attach="c" size={12}>
              {piFrac(k, false)}
            </Label>
          ))}
        {/* The angle of w (a small arc) and of w³ (a spiral that widens with each full turn). */}
        <Polyline points={spiral(0, theta, 0.17, 0)} color={C.f} weight={2} />
        <Polyline points={spiral(0, cube, 0.3, 0.09)} color={C.violet} weight={2.5} />
        <Line.Segment point1={[0, 0]} point2={w3} color={w3Colour} weight={2.5} />
        <Line.Segment point1={[0, 0]} point2={w} color={C.f} weight={2.5} />
        <Point x={w3[0]} y={w3[1]} color={w3Colour} />
        {rootHere ? (
          <Label at={at(ARG_Z * U)} color={C.good} attach="se">w³ = z</Label>
        ) : (
          <>
            <Label at={at(ARG_Z * U)} color={C.g} attach="se">z</Label>
            {!wrongHere && <Label at={at(cube - 0.2, 1.15)} color={w3Colour} attach="c">w³</Label>}
          </>
        )}
        {/* In the π/4 view, w's label would sit on the "not z" label for w between about π/12 and π/3. */}
        {!(wrong && Math.abs(theta - 0.62) < 0.33) && <Label at={at(theta + 0.2, 1.15)} color={C.f} attach="c">w</Label>}
        <MovablePoint
          point={w}
          color={C.f}
          constrain={p => at(snap(Math.atan2(p[1], p[0])))}
          onMove={p => {
            player.stop()
            setTheta(snap(Math.atan2(p[1], p[0])))
          }}
        />
      </Plane>
      <Controls>
        <Slider
          label="\theta"
          value={theta}
          onChange={v => {
            player.stop()
            setTheta(Math.round(v / FINE) * FINE)
          }}
          min={MIN}
          max={PI}
          step={FINE}
          format={() => (exact ? piFrac(n, false) : `${(theta / PI).toFixed(2).replace('-', '−')}π`)}
        />
        <Buttons>
          <PlayButton
            playing={player.playing}
            onClick={() => {
              if (!player.playing) {
                setTheta(MIN)
                setFound(new Set())
              }
              player.toggle(MIN)
            }}
            label="Send w once round"
          />
          <Toggle label="What if Arg z = π/4?" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`\\theta = \\arg(w) ${exact ? '=' : '\\approx'} ${thetaTex}`} />
          <Readout color={w3Colour} tex={cubeTex} />
          <Readout color={C.good} tex={`\\text{cube roots found: } ${found.size} \\text{ of } 3`} />
        </Readouts>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">
          Drag the blue point <M>w</M> round the unit circle (every point on it has modulus 1), or use the slider.
        </p>
        {notice}
      </Controls>
    </div>
  )
}
