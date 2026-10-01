// 2021 Methods Exam 1 Q5b — dilate f(x) = x² − 4 by a factor k from the vertical axis, then
// translate it c units right: the image is y = f((x − c)/k). Slide k down to ½ (intercepts
// (±2, 0) → (±1, 0), rule f(2x) = 4x² − 4), then slide c to 2 and watch the rule
// f(2(x − c)) = (2x − 2c)² − 4: the number subtracted from 2x is double the shift. At c = 1 the
// rule is the report's named wrong answer (2x − 2)² − 4, and the graph has moved only 1 unit;
// at c = 2 it is h(x) = 4(x − 2)² − 4 with intercepts (1, 0) and (3, 0). A toggle overlays the
// bracket-less rule, which is exactly g(x) = 4(x − 1)² − 4 from part a.

import { useCallback, useState, type Dispatch, type SetStateAction } from 'react'
import { Buttons, C, Controls, Label, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, Toggle, Vector, usePlayer } from './kit'

const f = (x: number) => x * x - 4
const wrong = (x: number) => (2 * x - 2) ** 2 - 4
/** Half-width of the parabola u² − 4 up to y = 5.5, so each curve is only sampled where it's on screen. */
const R = Math.sqrt(9.5)

type S = { k: number; c: number }
// The play button runs one number t from 0 to 2: the dilation for t ≤ 1, then the translation.
const toT = (s: S) => (s.c > 1e-9 ? 1 + s.c / 2 : 2 * (1 - s.k))
const fromT = (t: number): S => (t <= 1 ? { k: 1 - t / 2, c: 0 } : { k: 0.5, c: 2 * (t - 1) })

/** Up to 2 dp with trailing zeros dropped: 2, 1.5, 1.33. */
const fmt = (v: number) => String(Math.round(v * 100) / 100)

/** The image's rule as "y = f(…) = (…)² − 4", each side braced so KaTeX only wraps at an "=". */
function ruleTex(k: number, c: number, extra?: string): string {
  const n = 1 / k
  const one = Math.abs(n - 1) < 0.005
  let parts: string[]
  if (c < 0.01) parts = one ? ['y', 'f(x)', 'x^2 - 4'] : ['y', `f(${fmt(n)}x)`, `(${fmt(n)}x)^2 - 4`]
  else if (one) parts = ['y', `f(x - ${fmt(c)})`, `(x - ${fmt(c)})^2 - 4`]
  else parts = ['y', `f\\bigl(${fmt(n)}(x - ${fmt(c)})\\bigr)`, `(${fmt(n)}x - ${fmt(n * c)})^2 - 4`]
  if (extra) parts.push(extra)
  return parts.map(p => `{${p}}`).join(' = ')
}

export default function Brackets() {
  const [s, setS] = useState<S>({ k: 0.5, c: 0 })
  const [showWrong, setShowWrong] = useState(false)
  const setT = useCallback<Dispatch<SetStateAction<number>>>(
    // Return the same object when nothing moves, so React can bail out and the player sees its end.
    a =>
      setS(prev => {
        const next = fromT(typeof a === 'function' ? a(toT(prev)) : a)
        return next.k === prev.k && next.c === prev.c ? prev : next
      }),
    [],
  )
  const player = usePlayer(setT, { min: 0, max: 2, seconds: 7 })
  const { k, c } = s
  const image = (x: number) => ((x - c) / k) ** 2 - 4

  const halved = Math.abs(k - 0.5) < 0.005
  const c0 = c < 0.01
  const c1 = Math.abs(c - 1) < 0.02
  const c2 = Math.abs(c - 2) < 0.01

  let notice
  if (showWrong) {
    notice = (
      <Notice tone="warn">
        Red is the bracket-less rule <M>{'(2x - 2)^2 - 4 = 4(x - 1)^2 - 4'}</M>. Its intercepts are <M>(0, 0)</M> and{' '}
        <M>(2, 0)</M> and its turning point is <M>(1, -4)</M>: it sits only <b>1</b> unit right of <M>f(2x)</M>. Replacing{' '}
        <M>x</M> by <M>x - 2</M> in <M>2x</M> must give <M>2(x - 2) = 2x - 4</M>. In fact the red curve is <M>g</M> from
        part a.
      </Notice>
    )
  } else if (!halved && c0) {
    notice = (
      <Notice>
        A dilation by factor <M>k</M> from the vertical axis multiplies every <M>x</M>-coordinate by <M>k</M>, so the
        intercepts <M>(\pm 2, 0)</M> slide to <M>(\pm 2k, 0)</M> and the rule becomes <M>{'f\\left(\\tfrac{x}{k}\\right)'}</M>.
        The question&apos;s factor is <M>\tfrac12</M>: slide <M>k</M> down to <M>\tfrac12</M> first.
      </Notice>
    )
  } else if (!halved) {
    notice = (
      <Notice>
        The question dilates first and translates second, and the diagram always applies them in that order. Slide{' '}
        <M>k</M> to <M>\tfrac12</M> to finish the dilation, then look at the rule.
      </Notice>
    )
  } else if (c0) {
    notice = (
      <Notice>
        Dilation done: <M>{'y = f(2x) = 4x^2 - 4'}</M>. Each intercept is now half as far from the <M>y</M>-axis,{' '}
        <M>{'(\\pm 2, 0) \\to (\\pm 1, 0)'}</M>, and the turning point on the axis hasn&apos;t moved. Now translate: slide{' '}
        <M>c</M> to <M>2</M> and watch the number inside the bracket.
      </Notice>
    )
  } else if (c1) {
    notice = (
      <Notice tone="warn">
        <b>Stop here.</b> The rule is now <M>{'(2x - 2)^2 - 4'}</M>, the report&apos;s common wrong answer, and the graph
        has moved only <b>1</b> unit right. Subtracting 2 from <M>2x</M> is a shift of <M>\tfrac22 = 1</M>. To move 2
        units, slide on to <M>c = 2</M>.
      </Notice>
    )
  } else if (c2) {
    notice = (
      <Notice tone="good">
        <M>{'h(x) = f\\bigl(2(x - 2)\\bigr) = (2x - 4)^2 - 4 = 4(x - 2)^2 - 4'}</M>. Every point moved 2 right: the
        intercepts <M>(\pm 1, 0)</M> land on <M>(1, 0)</M> and <M>(3, 0)</M>. Taking the 2 out of <M>{'(2x - 4)^2'}</M>{' '}
        gives <M>{'4(x - 2)^2'}</M>, not <M>{'2(x - 2)^2'}</M>. Now show the bracket-less rule.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Translating <M>c</M> units right replaces <M>x</M> by <M>x - c</M> in <M>f(2x)</M>, giving{' '}
        <M>{'f\\bigl(2(x - c)\\bigr) = (2x - 2c)^2 - 4'}</M>. The number subtracted from <M>2x</M> is <b>double</b> the
        shift, because the 2 multiplies the whole bracket. Keep going to <M>c = 2</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-3, 4]} y={[-5, 5]} height={330}>
        <Plot.OfX y={f} domain={[-R, R]} color={C.guide} weight={2} style="dashed" />
        <Label at={[-2.85, f(-2.85)]} color={C.guide} attach="e">
          f
        </Label>
        {/* f's intercepts go under the red overlay, which also passes through (2, 0). */}
        <Point x={-2} y={0} color={C.guide} />
        <Point x={2} y={0} color={C.guide} />
        {showWrong && (
          <>
            <Plot.OfX y={wrong} domain={[1 - R / 2, 1 + R / 2]} color={C.bad} weight={2.5} />
            <Point x={0} y={0} color={C.bad} />
            <Point x={2} y={0} color={C.bad} />
            <Point x={1} y={-4} color={C.bad} />
          </>
        )}
        <Plot.OfX y={image} domain={[c - k * R, c + k * R]} color={C.f} weight={3} />
        {c > 0.08 && (
          <>
            <Vector tail={[0, -4]} tip={[c, -4]} color={C.g} weight={2.5} />
            <Label at={[c / 2, -4]} color={C.g} attach="s">
              {`${fmt(c)} right`}
            </Label>
          </>
        )}
        <Point x={c - 2 * k} y={0} color={C.f} />
        <Point x={c + 2 * k} y={0} color={C.f} />
        <Point x={c} y={-4} color={C.f} />
      </Plane>
      <Controls>
        <Slider
          label="\text{dilate}\ k"
          value={k}
          onChange={v => {
            player.stop()
            setS(p => ({ ...p, k: v }))
          }}
          min={0.5}
          max={1}
          step={0.01}
          format={v => (Math.abs(v - 0.5) < 0.005 ? '½' : v.toFixed(2))}
        />
        <Slider
          label="\text{shift}\ c"
          value={c}
          onChange={v => {
            player.stop()
            setS(p => ({ ...p, c: v }))
          }}
          min={0}
          max={2}
          step={0.05}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(toT(s))} label="Play: dilate, then translate" />
          <Toggle label="Show the bracket-less rule" checked={showWrong} onChange={setShowWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={ruleTex(k, c, halved && c2 ? '4(x-2)^2 - 4' : halved && c0 ? '4x^2 - 4' : undefined)} />
          <Readout tex={`(\\pm 2, 0) \\to (${fmt(c - 2 * k)}, 0),\\ (${fmt(c + 2 * k)}, 0)`} />
          {showWrong && <Readout color={C.bad} tex="(2x-2)^2 - 4 = f\bigl(2(x-1)\bigr)" />}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
