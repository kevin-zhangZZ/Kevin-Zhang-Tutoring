// 2019 Methods Exam 1 Q1a.ii — checking an antiderivative by differentiating it, as the examiner's
// report recommends. Pick a candidate F (3 logₑ(3x − 1), logₑ(3x − 1), ⅓ logₑ(3x − 1) or the report's
// other form ⅓ logₑ(x − ⅓)). Top graph: F with its tangent at x. Bottom graph: f(x) = 1/(3x − 1)
// and F′(x) dashed. Only the ⅓ versions have F′ landing exactly on f; logₑ(3x − 1) gives 3f and
// 3 logₑ(3x − 1) gives 9f, because the chain rule multiplies by the inside's 3 again.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, tick } from './kit'

const f = (x: number) => 1 / (3 * x - 1)
const LN3 = Math.log(3)
// Tick numbers only inside the plotted range (the plane pads its view a little past it).
const within = (lo: number, hi: number) => (v: number) => (v < lo - 1e-9 || v > hi + 1e-9 ? '' : tick(v))
const XL = within(0, 2.4)

type Key = 'three' | 'one' | 'third' | 'alt'
const CANDIDATES: Record<Key, { btn: string; tex: string; F: (x: number) => number; dF: (x: number) => number }> = {
  three: { btn: '3 logₑ(3x − 1)', tex: '3\\log_e(3x-1)', F: x => 3 * Math.log(3 * x - 1), dF: x => 9 / (3 * x - 1) },
  one: { btn: 'logₑ(3x − 1)', tex: '\\log_e(3x-1)', F: x => Math.log(3 * x - 1), dF: x => 3 / (3 * x - 1) },
  third: { btn: '⅓ logₑ(3x − 1)', tex: '\\tfrac13\\log_e(3x-1)', F: x => Math.log(3 * x - 1) / 3, dF: x => 1 / (3 * x - 1) },
  alt: { btn: '⅓ logₑ(x − ⅓)', tex: '\\tfrac13\\log_e\\!\\left(x-\\tfrac13\\right)', F: x => Math.log(x - 1 / 3) / 3, dF: x => 1 / (3 * x - 1) },
}
const ORDER: Key[] = ['three', 'one', 'third', 'alt']

function Choice({ active, onClick, children }: { active: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'text-[12.5px] font-semibold px-3 py-1.5 rounded-full border ' +
        (active
          ? 'bg-orange-50 border-orange-400 text-orange-700 dark:bg-orange-950/40 dark:border-orange-500 dark:text-orange-300'
          : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300 dark:hover:border-gray-500')
      }
    >
      {children}
    </button>
  )
}

export default function AntiderivativeCheck() {
  const [key, setKey] = useState<Key>('one')
  const [x0, setX0] = useState(1)
  const cand = CANDIDATES[key]
  const correct = key === 'third' || key === 'alt'

  const F0 = cand.F(x0)
  const slope = cand.dF(x0)
  const height = f(x0)
  const ratio = slope / height
  // Put the F label where the curve is still on screen (3 logₑ(3x − 1) leaves the top early).
  const labelX = key === 'three' ? (Math.exp(-0.4) + 1) / 3 : 2.3

  return (
    <div>
      <p className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 mb-1">
        Your answer <span style={{ color: C.g }}>F</span>, with its tangent at x
      </p>
      <Plane x={[0, 2.4]} y={[-2, 3]} xStep={0.5} yStep={1} height={200} yLabel="" xLabels={false} yLabels={within(-2, 3)}>
        <Line.Segment point1={[1 / 3, -2]} point2={[1 / 3, 3]} color={C.guide} style="dashed" weight={1.5} />
        {key === 'alt' && (
          <Plot.OfX y={CANDIDATES.third.F} domain={[0.36, 2.4]} color={C.guide} weight={2} style="dashed" />
        )}
        <Plot.OfX y={cand.F} domain={[0.345, 2.4]} color={C.g} weight={3} />
        <Line.PointSlope point={[x0, F0]} slope={slope} color={C.violet} weight={2} />
        <Point x={x0} y={F0} color={C.violet} />
        <Label at={[labelX, cand.F(labelX)]} color={C.g} attach="se">F</Label>
      </Plane>
      <p className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 mt-3 mb-1">
        <span style={{ color: C.f }}>f(x)</span> and what your answer differentiates to,{' '}
        <span style={{ color: C.g }}>F′(x)</span> (dashed)
      </p>
      <Plane x={[0, 2.4]} y={[0, 4.5]} xStep={0.5} yStep={1} height={210} yLabel="" xLabels={XL} yLabels={within(0, 4.5)}>
        <Line.Segment point1={[1 / 3, 0]} point2={[1 / 3, 4.5]} color={C.guide} style="dashed" weight={1.5} />
        <Plot.OfX y={f} domain={[0.4, 2.4]} color={C.f} weight={3} />
        <Plot.OfX y={cand.dF} domain={[0.345, 2.4]} color={C.g} weight={2.5} style="dashed" />
        <Line.Segment point1={[x0, 0]} point2={[x0, Math.max(height, Math.min(slope, 4.5))]} color={C.guide} weight={1} />
        <Point x={x0} y={height} color={C.f} />
        {slope <= 4.5 && <Point x={x0} y={slope} color={correct ? C.good : C.g} />}
        <Label at={[0.5, f(0.5)]} color={C.f} attach="e">f</Label>
      </Plane>
      <Controls>
        <div className="flex flex-wrap items-center gap-2">
          {ORDER.map(k => (
            <Choice key={k} active={k === key} onClick={() => setKey(k)}>
              {CANDIDATES[k].btn}
            </Choice>
          ))}
        </div>
        <Slider label="x" value={x0} onChange={setX0} min={0.45} max={2.3} step={0.01} />
        <Readouts>
          <Readout color={C.violet} tex={`\\text{gradient of } F = ${slope.toFixed(3)}`} />
          <Readout color={C.f} tex={`f(${x0.toFixed(2)}) = ${height.toFixed(3)}`} />
          <Readout color={correct ? C.good : C.bad} tex={`\\text{gradient} \\div f = ${ratio.toFixed(2)}${correct ? '\\ \\checkmark' : ''}`} />
        </Readouts>
        {key === 'three' && (
          <Notice tone="warn">
            <M>{'\\tfrac{d}{dx}\\,3\\log_e(3x-1) = 3\\times\\tfrac{3}{3x-1} = \\tfrac{9}{3x-1}'}</M>, so the dashed curve is{' '}
            <b>9 times</b> as tall as <M>f</M>. The chain rule already brings a <M>3</M> out of the inside, so putting
            another <M>3</M> in front makes it worse. Try <M>{'\\log_e(3x-1)'}</M> next.
          </Notice>
        )}
        {key === 'one' && (
          <Notice tone="warn">
            <M>{'\\tfrac{d}{dx}\\log_e(3x-1) = \\tfrac{3}{3x-1}'}</M>: the chain rule multiplies by the inside&apos;s{' '}
            <M>3</M>, so the dashed curve is exactly <b>3 times</b> <M>f</M> at every <M>x</M>, and the tangent on the top
            graph is 3 times too steep. To cancel that <M>3</M> you need <M>{'\\tfrac13'}</M> in front. Try it.
          </Notice>
        )}
        {key === 'third' && (
          <Notice tone="good">
            <M>{'\\tfrac13\\times\\tfrac{3}{3x-1} = \\tfrac{1}{3x-1}'}</M>: the dashed curve lies exactly on <M>f</M>. Slide{' '}
            <M>x</M>: the gradient of <M>F</M> on the top graph always equals the height of <M>f</M> below. That is what
            &ldquo;<M>F</M> is an antiderivative of <M>f</M>&rdquo; means. Now try the report&apos;s other form.
          </Notice>
        )}
        {key === 'alt' && (
          <Notice tone="good">
            <M>{'\\tfrac13\\log_e(x-\\tfrac13)'}</M> is the grey curve <M>{'\\tfrac13\\log_e(3x-1)'}</M> shifted down by{' '}
            <M>{`\\tfrac13\\log_e 3 \\approx ${(LN3 / 3).toFixed(3)}`}</M>. A vertical shift changes no gradients, so its
            derivative is also exactly <M>f</M>. Any shift gives another antiderivative, which is why the question
            asks for <em>an</em> antiderivative.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
