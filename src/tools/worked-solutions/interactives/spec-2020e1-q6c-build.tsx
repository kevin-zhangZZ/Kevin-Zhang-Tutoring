// 2020 Specialist Exam 1 Q6c — build y = arctan(3x − 6) + π from y = arctan x in three moves, the
// way a teacher would on the board, carrying the asymptotes and the centre along:
//   1. y = arctan x: asymptotes y = ±π/2, centre (0, 0), gradient 1 there;
//   2. dilation by factor 1/3 from the y-axis → y = arctan(3x): the asymptotes don't move (a
//      sideways squeeze can't change a height) and the gradient at the centre becomes 3, which is
//      part a's chain-rule 3;
//   3. translation 2 units right → y = arctan(3(x − 2)) = arctan(3x − 6): a shift of 2, not 6;
//   4. translation π units up → y = arctan(3x − 6) + π: asymptotes y = π/2 and y = 3π/2, centre
//      (2, π), the point of inflection of part b;
//   5. the finished sketch across VCAA's grid (−6 ≤ x ≤ 6), with a toggle that draws only
//      0 ≤ x ≤ 4 — the report's "limited domain" sketch, on which no asymptotic behaviour shows.
// Each move animates from the previous curve, which stays behind as a grey dashed ghost.

import { useEffect, useState } from 'react'
import {
  ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, StepNav, Toggle,
  num, prefersReducedMotion, tick, useSteps,
} from './kit'

const HALF_PI = Math.PI / 2
const XL = -7
const XR = 7

/** y = arctan(k(x − h)) + v */
type Stage = { k: number; h: number; v: number }
const STAGES: Stage[] = [
  { k: 1, h: 0, v: 0 },
  { k: 3, h: 0, v: 0 },
  { k: 3, h: 2, v: 0 },
  { k: 3, h: 2, v: Math.PI },
  { k: 3, h: 2, v: Math.PI },
]
const curve = ({ k, h, v }: Stage) => (x: number) => Math.atan(k * (x - h)) + v
const lerp = (a: number, b: number, s: number) => a + (b - a) * s

/** A multiple of π/2 as text: −π/2, π/2, π, 3π/2. */
function piText(y: number): string {
  const n = Math.round(y / HALF_PI)
  const names: Record<number, string> = { [-3]: '−3π/2', [-2]: '−π', [-1]: '−π/2', 0: '0', 1: 'π/2', 2: 'π', 3: '3π/2' }
  return names[n] ?? num(y)
}

/** The same, as TeX for a readout. */
function piTex(y: number): string {
  const n = Math.round(y / HALF_PI)
  const names: Record<number, string> = { [-1]: '-\\tfrac{\\pi}{2}', 1: '\\tfrac{\\pi}{2}', 3: '\\tfrac{3\\pi}{2}' }
  return names[n] ?? num(y)
}

/** s runs 0 → 1 (eased) over `seconds` each time play() is called; finish() jumps to 1. */
function useMorph(seconds = 1.5) {
  const [s, setS] = useState(1)
  const [run, setRun] = useState(0)
  useEffect(() => {
    if (run === 0) return
    let raf = 0
    const start = performance.now()
    setS(0)
    const frame = (now: number) => {
      const t = Math.min(1, (now - start) / (seconds * 1000))
      setS(t < 1 ? 0.5 - 0.5 * Math.cos(Math.PI * t) : 1)
      if (t < 1) raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [run, seconds])
  return {
    s,
    // s drops to 0 in the same render as the step change, so the new stage never flashes up
    // finished before the move plays.
    play: () => {
      // Reduced motion: the new stage appears finished, with no move.
      if (prefersReducedMotion()) return setS(1)
      setS(0)
      setRun(r => r + 1)
    },
    finish: () => {
      setRun(0)
      setS(1)
    },
  }
}

export default function BuildArctan() {
  const steps = useSteps(5)
  const morph = useMorph()
  const [short, setShort] = useState(false)
  const step = steps.step
  const moving = step >= 1 && step <= 3
  const s = moving ? morph.s : 1
  const settled = s > 0.999

  const prev = moving ? STAGES[step - 1] : null
  const target = STAGES[step]
  const now: Stage = prev
    ? { k: lerp(prev.k, target.k, s), h: lerp(prev.h, target.h, s), v: lerp(prev.v, target.v, s) }
    : target
  const g = curve(now)
  const upper = now.v + HALF_PI
  const lower = now.v - HALF_PI
  const domain: [number, number] = step === 4 && short ? [0, 4] : [XL, XR]

  let rule: string
  if (step === 0) rule = 'y = \\arctan(x)'
  else if (step === 1) rule = settled ? 'y = \\arctan(3x)' : `y = \\arctan(${num(now.k)}x)`
  else if (step === 2) rule = settled ? 'y = \\arctan(3(x-2)) = \\arctan(3x-6)' : `y = \\arctan(3(x-${num(now.h)}))`
  else if (step === 3 && !settled) rule = `y = \\arctan(3x-6)+${num(now.v)}`
  else rule = 'y = \\arctan(3x-6)+\\pi'

  const centreText = `(${now.h < 1 ? '0' : '2'}, ${now.v < 1 ? '0' : 'π'})`

  let notice
  if (step === 0) {
    notice = (
      <Notice>
        <b>Start from the graph you know, <M>y = \arctan(x)</M>.</b> Its outputs are angles strictly between{' '}
        <M>{'-\\tfrac{\\pi}{2}'}</M> and <M>{'\\tfrac{\\pi}{2}'}</M>: <M>\tan\theta</M> only heads off to <M>\pm\infty</M> as{' '}
        <M>\theta</M> approaches <M>{'\\pm\\tfrac{\\pi}{2}'}</M>, so <M>\arctan(x)</M> only approaches{' '}
        <M>{'\\pm\\tfrac{\\pi}{2}'}</M> as <M>{'x \\to \\pm\\infty'}</M>. Those are its asymptotes. Its centre{' '}
        <M>(0, 0)</M> is its steepest point, with gradient <M>{'\\tfrac{1}{1+0^2} = 1'}</M> (orange). Press Next for the first move.
      </Notice>
    )
  } else if (step === 1) {
    notice = (
      <Notice>
        <b>Dilation by factor <M>{'\\tfrac13'}</M> from the <M>y</M>-axis: <M>x</M> becomes <M>3x</M>.</b> Every point moves to a
        third of its distance from the <M>y</M>-axis, so the S squeezes in sideways. The asymptotes stay put, because a
        sideways squeeze can&apos;t change a height. But the curve is now 3 times as steep: gradient <M>3</M> at the centre.
        That is the chain-rule 3 in part a.
      </Notice>
    )
  } else if (step === 2) {
    notice = (
      <Notice>
        <b>Translation 2 units right: <M>{'\\arctan(3x-6) = \\arctan(3(x-2))'}</M>.</b> Take the 3 out first: the shift is{' '}
        <M>2</M>, not <M>6</M>. Quick check: the centre is where the inside is zero, and <M>3x - 6 = 0</M> at <M>x = 2</M>.
        The asymptotes are horizontal lines, so a sideways shift leaves them alone too. The centre <M>(2, 0)</M> is at
        the <M>x</M>-value where part b found the inflection.
      </Notice>
    )
  } else if (step === 3) {
    notice = (
      <Notice>
        <b>Translation <M>\pi</M> units up: <M>{'+\\,\\pi'}</M>.</b> Everything rises by <M>\pi</M>, the asymptotes
        included (the grey dashed lines show where they were): <M>{'-\\tfrac{\\pi}{2} + \\pi = \\tfrac{\\pi}{2}'}</M> and{' '}
        <M>{'\\tfrac{\\pi}{2} + \\pi = \\tfrac{3\\pi}{2}'}</M>. The centre lands on <M>(2, \pi)</M>, the point of
        inflection, and the curve stays strictly between the two asymptotes.
      </Notice>
    )
  } else if (!short) {
    notice = (
      <Notice tone="good">
        <b>The finished sketch.</b> The question asks for three labels: <M>{'y = \\tfrac{\\pi}{2}'}</M>,{' '}
        <M>{'y = \\tfrac{3\\pi}{2}'}</M> and <M>(2, \pi)</M>. Drawn across the whole grid, the curve visibly flattens onto{' '}
        <M>{'y = \\tfrac{\\pi}{2}'}</M> on the left (at <M>x = -6</M> it is only about <M>0.04</M> above it) and onto{' '}
        <M>{'y = \\tfrac{3\\pi}{2}'}</M> on the right (about <M>0.08</M> below it at <M>x = 6</M>). Now switch on the toggle.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <b>Only <M>0 \le x \le 4</M>.</b> The curve runs from about <M>1.74</M> up to about <M>4.55</M> and just stops,
        still clearly short of both dashed lines. From this piece a marker can&apos;t tell whether it goes on to
        approach them, cross them or turn away: the asymptotic behaviour isn&apos;t shown, which is what the report
        says some students&apos; graphs were missing. Use the width of the grid.
      </Notice>
    )
  }

  return (
    <div>
      {/* No y tick numbers: in the finished graph the curve hugs y = π/2 on both sides of the y-axis,
          right where a π/2 tick number would sit. The asymptotes carry their equations instead,
          each at the end of the grid where the curve is far away from it. */}
      <Plane x={[XL, XR]} y={[-2, 5]} xStep={2} yStep={HALF_PI} height={310} yLabels={false} xLabels={v => (Math.abs(v) > 6.5 || (step === 2 && Math.abs(v - 2) < 1e-6) ? '' : tick(v))}>
        {/* The previous stage, left behind as a ghost while this move plays. */}
        {prev && (
          <>
            <Plot.OfX y={curve(prev)} domain={[XL, XR]} color={C.guide} weight={2} style="dashed" minSamplingDepth={10} />
            {step === 3 && (
              <>
                <Line.Segment point1={[XL, -HALF_PI]} point2={[XR, -HALF_PI]} color={C.guide} style="dashed" weight={1.5} />
                <Line.Segment point1={[XL, HALF_PI]} point2={[XR, HALF_PI]} color={C.guide} style="dashed" weight={1.5} />
              </>
            )}
          </>
        )}
        <Line.Segment point1={[XL, upper]} point2={[XR, upper]} color={C.f} style="dashed" weight={2} />
        <Line.Segment point1={[XL, lower]} point2={[XR, lower]} color={C.f} style="dashed" weight={2} />
        {settled && (
          <>
            <Label at={[XL, upper]} color={C.f} attach="ne" size={12}>{`y = ${piText(upper)}`}</Label>
            <Label at={[XR, lower]} color={C.f} attach="sw" size={12}>{`y = ${piText(lower)}`}</Label>
          </>
        )}
        <Plot.OfX y={g} domain={domain} color={C.f} weight={3} minSamplingDepth={10} />
        {step === 4 && short && (
          <>
            <Point x={0} y={g(0)} color={C.bad} />
            <Point x={4} y={g(4)} color={C.bad} />
          </>
        )}
        {/* The tangent at the centre, 1 unit up and down from it: gradient k. */}
        {step <= 2 && (
          <Line.Segment
            point1={[now.h - 1 / now.k, now.v - 1]}
            point2={[now.h + 1 / now.k, now.v + 1]}
            color={C.g}
            weight={2}
          />
        )}
        <Point x={now.h} y={now.v} color={C.ink} />
        {/* Up-left of the centre, where the S leaves a gap — except at (2, 0), where the ghost
            arctan(3x) and the y-axis run through that corner on a phone: there it goes down-right,
            small enough to end before the "4" tick (the "2" tick is hidden in this step). */}
        {settled && (
          <Label at={[now.h, now.v]} attach={step === 2 ? 'se' : 'nw'} gap={step === 2 ? 5 : 9} size={step === 2 ? 11 : 12}>
            {centreText}
          </Label>
        )}
      </Plane>
      <Controls>
        <div className="flex flex-wrap items-center gap-2">
          <StepNav
            step={step}
            count={5}
            onBack={() => {
              morph.finish()
              steps.back()
            }}
            onNext={() => {
              if (step < 4) {
                steps.next()
                if (step + 1 <= 3) morph.play()
              }
            }}
          />
          {moving && <ActionButton label="Replay this move" onClick={morph.play} />}
        </div>
        {step === 4 && (
          <Buttons>
            <Toggle label="Only draw 0 ≤ x ≤ 4" checked={short} onChange={setShort} />
          </Buttons>
        )}
        <Readouts>
          <Readout color={C.f} tex={rule} />
          {settled && <Readout tex={`\\text{asymptotes } y = ${piTex(lower)},\\ y = ${piTex(upper)}`} />}
          {step <= 2 && <Readout color={C.g} tex={`\\text{gradient at the centre} = ${settled ? String(Math.round(now.k)) : num(now.k)}`} />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
