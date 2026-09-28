// 2020 Specialist Exam 2 MCQ 7 — why the sign of b decides the partial-fraction form of
// 1/(ax(x² + b)). The blue curve is the whole denominator y = ax(x² + b) and the orange one its
// factor y = x² + b, which is y = x² moved down (b < 0) or up (b > 0) by |b|. Each place the
// denominator crosses the x-axis is a real linear factor, so a partial-fraction term: with b < 0
// there are three (0 and ±√|b|, option D); with b > 0 only one, and x² + b stays a quadratic with a
// (Bx + C) numerator, option A's form — the report: "Option A results from not considering that
// b < 0" (39% chose A). Slide a: the curve stretches but its zeros never move, because a is a
// constant multiplier; it ends up in the constants, A = 1/(ab) and B = C = −1/(2ab) (sympy's apart
// agrees). A toggle marks where option C's denominators ax ± √|b| are zero, x = ∓√|b|/a, which
// misses the real zeros unless a = ±1.

import { useState } from 'react'
import { C, Controls, Katex, Label, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, num } from './kit'

const X = 3
const Y = 4

export default function Roots() {
  const [b, setB] = useState(-2.25)
  const [a, setA] = useState(2)
  const [showC, setShowC] = useState(false)

  const zero = Math.abs(b) < 0.03
  const neg = b < 0 && !zero
  const k = Math.sqrt(Math.abs(b))
  const quad = (x: number) => x * x + b
  const denom = (x: number) => a * x * (x * x + b)
  const cRoot = k / a

  // Where to write "x² + b" on the orange curve: where it reaches y = 3.2, if that is on screen.
  const lx = Math.sqrt(Math.max(0, 3.2 - b))
  const showQuadLabel = lx < X - 0.35

  let factor: string
  if (zero) factor = 'x^2 + b = x^2 \\quad (b = 0 \\text{ is not allowed})'
  else if (neg) factor = `x^2 + b = x^2 - ${num(-b)} = (x - ${num(k)})(x + ${num(k)})`
  else factor = `x^2 + b = x^2 + ${num(b)} > 0 \\text{ for every } x`

  let notice
  if (zero) {
    notice = (
      <Notice tone="warn">
        <b>The question rules out <M>b = 0</M></b> (<M>a</M> and <M>b</M> are non-zero). Here <M>x^2 + b = x^2</M>: the two
        roots <M>\pm\sqrt{'{|b|}'}</M> have merged into a double root at <M>0</M>. A squared denominator, like option E&apos;s{' '}
        <M>(x + \sqrt b)^2</M>, only belongs to a factor that repeats, and for <M>b \ne 0</M> none does. Slide <M>b</M> back
        below zero.
      </Notice>
    )
  } else if (!neg) {
    notice = (
      <Notice tone="warn">
        <b>Now <M>b</M> is positive</b>, so the orange curve is <M>y = x^2</M> moved <i>up</i>: it never reaches the{' '}
        <M>x</M>-axis. No real roots means no real linear factors, so <M>x^2 + b</M> has to stay whole, over a{' '}
        <M>Bx + C</M> numerator. That is option A&apos;s form, and the blue denominator now crosses the axis only once, at{' '}
        <M>0</M>. But this question says <M>{'b < 0'}</M>: option A answers a different question. The report: &ldquo;Option A
        results from not considering that <M>{'b<0'}</M>.&rdquo;
      </Notice>
    )
  } else if (showC) {
    notice = (
      <Notice tone={Math.abs(Math.abs(a) - 1) < 0.05 ? 'good' : 'warn'}>
        The red points are where option C&apos;s denominators <M>{'ax + \\sqrt{|b|}'}</M> and <M>{'ax - \\sqrt{|b|}'}</M> are
        zero: <M>{`x = \\mp\\tfrac{\\sqrt{|b|}}{a} = \\mp${num(Math.abs(cRoot))}`}</M>.{' '}
        {Math.abs(Math.abs(a) - 1) < 0.05 ? (
          <>
            At <M>a = \pm 1</M> they happen to land on the green zeros, but the question is for <i>every</i> non-zero{' '}
            <M>a</M>. Move <M>a</M> away from <M>\pm 1</M>.
          </>
        ) : (
          <>
            They miss the green zeros of the real denominator, so C&apos;s fractions blow up in the wrong places. Slide{' '}
            <M>a</M>: the blue curve stretches, but its zeros never move. <M>a</M> has no <M>x</M> in it, so it can&apos;t
            be a factor that is zero anywhere; it just rescales the constants, <M>{'A = \\tfrac{1}{ab}'}</M> and{' '}
            <M>{'B = C = -\\tfrac{1}{2ab}'}</M>.
          </>
        )}
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        <b><M>b</M> is negative</b>, so the orange curve <M>y = x^2 + b</M> is <M>y = x^2</M> moved down by{' '}
        <M>{`|b| = ${num(-b)}`}</M>. It crosses the <M>x</M>-axis at <M>{`x = \\pm\\sqrt{|b|} = \\pm${num(k)}`}</M>, and
        every crossing is a linear factor. With the factor <M>x</M>, the blue denominator crosses the axis three times
        (green): three linear factors, three partial fractions, option D. (Options B and E write <M>\sqrt b</M>; here that
        is <M>{`\\sqrt{-${num(-b)}}`}</M>, not a real number.) Now slide <M>b</M> above zero.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-X, X]} y={[-Y, Y]} xStep={1} yStep={1} height={320}>
        <Plot.OfX y={quad} domain={[-X, X]} color={C.g} weight={2} />
        {showQuadLabel && (
          <Label at={[lx, 3.2]} color={C.g} attach="e" size={12}>
            x² + b
          </Label>
        )}
        <Plot.OfX y={denom} domain={[-X, X]} color={C.f} weight={3} />
        <Point x={0} y={0} color={C.good} />
        {neg && (
          <>
            <Point x={-k} y={0} color={C.good} />
            <Point x={k} y={0} color={C.good} />
            <Label at={[-k, 0]} color={C.good} attach="n" gap={11} size={12}>−√|b|</Label>
            <Label at={[k, 0]} color={C.good} attach="n" gap={11} size={12}>√|b|</Label>
          </>
        )}
        {neg && showC && (
          <>
            <Point x={-cRoot} y={0} color={C.bad} />
            <Point x={cRoot} y={0} color={C.bad} />
            <Label at={[Math.abs(cRoot), 0]} color={C.bad} attach="s" gap={14} size={12}>C</Label>
            <Label at={[-Math.abs(cRoot), 0]} color={C.bad} attach="s" gap={14} size={12}>C</Label>
          </>
        )}
      </Plane>
      <Controls>
        <Slider label="b" value={b} onChange={setB} min={-4} max={3} step={0.05} format={v => num(v)} />
        <Slider
          label="a"
          value={a}
          onChange={v => setA(Math.abs(v) < 0.05 ? (v < 0 ? -0.1 : 0.1) : v)}
          min={-2}
          max={2}
          step={0.1}
          format={v => num(v, 1)}
        />
        <div className="flex flex-wrap items-center gap-2">
          <Toggle label="Show option C's denominators" checked={showC} onChange={setShowC} />
        </div>
        <Readouts>
          <Readout color={C.f} tex="y = ax(x^2 + b)" />
          <Readout color={C.g} tex="y = x^2 + b" />
          <Readout color={C.good} tex="\text{zeros of the denominator}" />
        </Readouts>
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-[13px] text-gray-700 dark:text-gray-300 flex flex-col gap-1.5 overflow-x-auto">
          <Katex tex={factor} />
          {neg ? (
            <>
              <Katex tex={`\\dfrac{1}{ax(x^2+b)} = \\dfrac{A}{x} + \\dfrac{B}{x + ${num(k)}} + \\dfrac{C}{x - ${num(k)}}`} />
              <Katex
                tex={`A = \\tfrac{1}{ab} \\approx ${num(1 / (a * b), 3)}, \\quad B = C = -\\tfrac{1}{2ab} \\approx ${num(-1 / (2 * a * b), 3)}`}
              />
            </>
          ) : zero ? null : (
            <Katex tex={`\\dfrac{1}{ax(x^2+b)} = \\dfrac{A}{x} + \\dfrac{Bx + C}{x^2 + ${num(b)}}`} />
          )}
        </div>
        {notice}
      </Controls>
    </div>
  )
}
