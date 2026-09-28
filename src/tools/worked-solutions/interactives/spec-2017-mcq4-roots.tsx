// 2017 Specialist Exam 2 MCQ 4 — test each option by raising its points to the power n. Pick an
// option and n, then "raise to the power p" from p = 1 up to p = n: each point r cis θ moves along
// r^p cis(pθ). Option E's n points all land exactly on 1 + i (the argument π/(4n) + 2kπ/n times n
// is π/4 plus k whole turns). D lands on √2 + √2i (modulus 2, not √2); B gives only one point;
// A and C (k ∈ R) give the whole circle, most of which does not land on 1 + i.

import { useState } from 'react'
import {
  Buttons, C, Circle, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Polygon, Readout, Readouts,
  Slider, Toggle, usePlayer,
} from './kit'

type Opt = 'A' | 'B' | 'C' | 'D' | 'E'
const OPTS: Opt[] = ['A', 'B', 'C', 'D', 'E']
const PI = Math.PI
const ROOT2 = Math.SQRT2

const polar = (r: number, t: number): [number, number] => [r * Math.cos(t), r * Math.sin(t)]

export default function RootsOfOnePlusI() {
  const [opt, setOpt] = useState<Opt>('E')
  const [n, setN] = useState(3)
  const [s, setS] = useState(1)
  const player = usePlayer(setS, { min: 0, max: 1, seconds: 4 })

  const p = 1 + s * (n - 1)
  const done = s > 0.995 || n === 1
  const smallMod = opt === 'A' || opt === 'C' || opt === 'E'
  const r = smallMod ? Math.pow(2, 1 / (2 * n)) : Math.pow(2, 1 / n)
  const continuous = opt === 'A' || opt === 'C'

  // The angles of the points each option gives (for A and C: one sample value of k).
  let thetas: number[]
  if (opt === 'D' || opt === 'E') thetas = Array.from({ length: n }, (_, k) => PI / (4 * n) + (2 * PI * k) / n)
  else if (opt === 'B') thetas = [PI / (4 * n)]
  else if (opt === 'A') thetas = [PI / (4 * n) + PI / n] // k = 1/2
  else thetas = [PI / 4] // C with k = 0

  const image = (t: number) => polar(Math.pow(r, p), p * t)
  const finalImg = (t: number) => polar(Math.pow(r, n), n * t)
  const hits = (t: number) => {
    const [a, b] = finalImg(t)
    return Math.hypot(a - 1, b - 1) < 1e-6
  }
  const imgColor = (t: number) => (done ? (hits(t) ? C.good : C.bad) : C.violet)

  const pick = (o: Opt) => {
    player.stop()
    setOpt(o)
    setS(0)
  }

  // Where the red "landing" label goes for the wrong options
  const cFinal = finalImg(PI / 4)

  let notice
  if (!done) {
    notice = (
      <Notice>
        Raising to the power <M>p</M> multiplies every argument by <M>p</M> and raises every modulus to the power{' '}
        <M>p</M>, so the points spiral outwards. Press <b>Raise to the power n</b> or drag <M>p</M> up to{' '}
        <M>{`n = ${n}`}</M>. A true solution has to finish exactly on the orange point <M>1 + i</M>.
      </Notice>
    )
  } else if (opt === 'E') {
    notice = (
      <Notice tone="good">
        All <M>{`${n}`}</M> points land on <M>1 + i</M>. Multiplying the argument{' '}
        <M>{'\\tfrac{\\pi}{4n} + \\tfrac{2\\pi k}{n}'}</M> by <M>n</M> gives <M>{'\\tfrac{\\pi}{4} + 2\\pi k'}</M>: the
        direction of <M>1 + i</M> after <M>k</M> extra full turns. The modulus becomes{' '}
        <M>{'\\left(2^{\\frac{1}{2n}}\\right)^n = \\sqrt2'}</M>. Change <M>n</M>: there are always exactly <M>n</M>{' '}
        roots, spaced <M>{'\\tfrac{2\\pi}{n}'}</M> apart. Then pick D or A to see how they miss.
      </Notice>
    )
  } else if (opt === 'D') {
    notice = (
      <Notice tone="warn">
        Right directions, wrong size. Each point&apos;s modulus becomes <M>{'\\left(2^{\\frac1n}\\right)^n = 2'}</M>, so
        they all land on <M>{'\\sqrt2 + \\sqrt2\\,i'}</M>, past <M>1 + i</M> on the same ray (the dashed circle has radius{' '}
        <M>{'|1+i| = \\sqrt2'}</M>). D took the <M>n</M>th root of <M>2</M> instead of <M>\sqrt2</M>.
      </Notice>
    )
  } else if (opt === 'B') {
    notice = (
      <Notice tone="warn">
        Every <M>k</M> gives this <b>one</b> point, because <M>{'2\\pi k'}</M> added <em>after</em> dividing by <M>n</M> is
        just whole turns.{' '}
        {n > 1 ? <>So B misses <M>{`${n - 1}`}</M> of the <M>{`${n}`}</M> roots. </> : <>Try <M>n = 3</M>: B still gives one point, but there are three roots. </>}
        Its modulus <M>{'2^{\\frac1n}'}</M>{' '}
        is also too big: it lands on <M>{'\\sqrt2 + \\sqrt2\\,i'}</M>, not <M>1 + i</M>.
      </Notice>
    )
  } else if (opt === 'A') {
    notice = (
      <Notice tone="warn">
        With <M>{'k \\in R'}</M> every angle is allowed, so A&apos;s &ldquo;solutions&rdquo; are the <b>whole blue circle</b>,
        and their <M>n</M>th powers cover the whole circle of radius <M>\sqrt2</M>. The red point is <M>{'k = \\tfrac12'}</M>:
        it lands on <M>-1 - i</M>. Only integer <M>k</M> (the green points of E) give <M>1 + i</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        Two faults. <M>{'k \\in R'}</M> gives the whole blue circle again, and <M>{'\\tfrac{\\pi}{4}'}</M> was not divided
        by <M>n</M>. Even the integer <M>k = 0</M> {n === 1 ? 'only works here because n = 1' : 'fails'}: the red point
        is <M>{'\\left(2^{\\frac{1}{2n}}\\operatorname{cis}\\tfrac{\\pi}{4}\\right)^n = \\sqrt2\\operatorname{cis}\\tfrac{n\\pi}{4}'}</M>
        {n === 1 ? '.' : <>, not <M>1 + i</M>.</>}
      </Notice>
    )
  }

  const discreteImgs = thetas.map(t => image(t))

  return (
    <div>
      <Plane x={[-2.2, 2.2]} y={[-2.2, 2.2]} equalScale xLabel="Re" yLabel="Im" height={420}>
        {/* |z^n| must equal |1 + i| = √2 */}
        <Circle center={[0, 0]} radius={ROOT2} color={C.guide} fillOpacity={0} strokeStyle="dashed" weight={1.5} />

        {/* the candidate solutions */}
        {continuous ? (
          <Circle center={[0, 0]} radius={r} color={C.f} fillOpacity={0.06} weight={3} />
        ) : (
          <>
            {n >= 3 && opt !== 'B' && (
              <Polygon points={thetas.map(t => polar(r, t))} color={C.f} fillOpacity={0.06} weight={1} />
            )}
            {thetas.map((t, i) => (
              <Line.Segment key={`ray${i}`} point1={[0, 0]} point2={polar(r, t)} color={C.f} weight={1} opacity={0.5} />
            ))}
          </>
        )}

        {/* the images at power p (a circle for A, C) */}
        {continuous && s > 0.001 && (
          <Circle center={[0, 0]} radius={Math.pow(r, p)} color={done ? C.bad : C.violet} fillOpacity={0} weight={2} />
        )}

        {/* spiral trails from p = 1 to the current p */}
        {s > 0.001 &&
          thetas.map((t, i) => (
            <Plot.Parametric
              key={`trail${i}`}
              xy={q => polar(Math.pow(r, q), q * t)}
              domain={[1, p]}
              color={C.violet}
              weight={1.5}
              style="dashed"
            />
          ))}

        {thetas.map((t, i) => {
          const [a, b] = polar(r, t)
          return <Point key={`z${i}`} x={a} y={b} color={C.f} />
        })}

        {/* target */}
        <Point x={1} y={1} color={C.g} />
        <Label at={[1, 1]} color={C.g} attach="ne">1 + i</Label>

        {(s > 0.001 || n === 1) &&
          discreteImgs.map(([a, b], i) => <Point key={`w${i}`} x={a} y={b} color={imgColor(thetas[i])} />)}

        {done && (opt === 'B' || opt === 'D') && (
          <Label at={[ROOT2, ROOT2]} color={C.bad} attach="n">
            √2 + √2 i
          </Label>
        )}
        {done && opt === 'A' && (
          <Label at={[-1, -1]} color={C.bad} attach="sw">
            −1 − i
          </Label>
        )}
        {done && opt === 'C' && n > 1 && (
          <Label at={cFinal} color={C.bad} attach={cFinal[1] >= 0 ? 'n' : 's'}>
            k = 0
          </Label>
        )}
      </Plane>
      <Controls>
        <Buttons>
          {OPTS.map(o => (
            <Toggle key={o} label={`Option ${o}`} checked={opt === o} onChange={() => pick(o)} />
          ))}
        </Buttons>
        <Slider
          label="n"
          value={n}
          onChange={v => {
            player.stop()
            setN(v)
            setS(0)
          }}
          min={1}
          max={8}
          step={1}
          format={v => v.toFixed(0)}
        />
        <Slider
          label="p"
          value={s}
          onChange={v => {
            player.stop()
            setS(v)
          }}
          min={0}
          max={1}
          step={0.005}
          format={v => (1 + v * (n - 1)).toFixed(2)}
        />
        <Buttons>
          <PlayButton
            playing={player.playing}
            onClick={() => player.toggle(s >= 0.995 ? 0 : s)}
            label="Raise to the power n"
          />
        </Buttons>
        <Readouts>
          <Readout
            color={C.f}
            tex={
              smallMod
                ? `|z| = 2^{\\frac{1}{2n}} \\approx ${r.toFixed(3)}`
                : `|z| = 2^{\\frac{1}{n}} \\approx ${r.toFixed(3)}`
            }
          />
          <Readout
            color={smallMod ? C.good : C.bad}
            tex={smallMod ? `|z|^n = \\sqrt2\\ \\checkmark` : `|z|^n = 2 \\ne \\sqrt2`}
          />
          <Readout
            tex={
              continuous
                ? `\\text{points given: infinitely many}`
                : opt === 'B'
                  ? `\\text{points given: } 1`
                  : `\\text{points given: } ${n}`
            }
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
