// 2020 Specialist Exam 2 Q3e.ii — how many points of inflection g(x) = xⁿe^(−x) has for each
// integer n. Step n from −3 to 7. The graph (rescaled vertically for each n, which never moves
// an inflection point) is coloured by the sign of g'' — sky where it bends up, orange where it
// bends down — with the points of inflection in green. Underneath, a sign table of the factors
// of g''(x) = x^(n−2)((x − n)² − n)e^(−x) shows why: the quadratic changes sign at n ± √n, and
// x^(n−2) changes sign at 0 only when n − 2 is odd (and x = 0 only counts when g(0) exists).
// A zoom on the origin shows a cup for even n and an x³-like S for odd n. The question's table
// fills in as n values are visited. A toggle tries the wrong idea behind the report's comments —
// "count the values n ± √n" — which fails at n = 0, n = 1 and every odd n ≥ 3.

import { useState } from 'react'
import { Buttons, C, Controls, Katex, Label, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle } from './kit'

type Sign = 1 | -1 | 0 | 'U'

const N_MIN = -3
const N_MAX = 7
const TINY = 1e-9

const g = (n: number, x: number) => Math.pow(x, n) * Math.exp(-x)
const quad = (n: number, x: number) => (x - n) ** 2 - n

/** Sign of the factor x^(n−2); 'U' where it is undefined (x = 0 with n < 2). */
function powSign(n: number, x: number): Sign {
  const k = n - 2
  if (Math.abs(x) < TINY) return k > 0 ? 0 : k === 0 ? 1 : 'U'
  return k % 2 === 0 ? 1 : x > 0 ? 1 : -1
}

function quadSign(n: number, x: number): Sign {
  const v = quad(n, x)
  return Math.abs(v) < 1e-9 ? 0 : v > 0 ? 1 : -1
}

/** Sign of g''(x) itself. At x = 0 the factored form can hide a cancellation, so use the
 *  actual values: g''(0) = 1, −2, 2 for n = 0, 1, 2; 0 for n ≥ 3; undefined for n < 0. */
function d2Sign(n: number, x: number): Sign {
  if (Math.abs(x) < TINY) {
    if (n < 0) return 'U'
    if (n >= 3) return 0
    return n === 1 ? -1 : 1
  }
  const v = (powSign(n, x) as number) * (quadSign(n, x) as number)
  return v === 0 ? 0 : (v as Sign)
}

/** Where g'' could change sign: x = 0 and the real non-zero roots n ± √n. */
function criticals(n: number): number[] {
  const pts = [0]
  if (n > 0) {
    const r = Math.sqrt(n)
    for (const c of [n - r, n + r]) if (Math.abs(c) > TINY) pts.push(c)
  }
  return pts.sort((a, b) => a - b)
}

function isPOI(n: number, c: number): boolean {
  if (n < 0 && Math.abs(c) < TINY) return false
  const l = d2Sign(n, c - 0.01)
  const r = d2Sign(n, c + 0.01)
  return typeof l === 'number' && typeof r === 'number' && l !== 0 && r !== 0 && l !== r
}

/** The wrong idea: every real value of n ± √n is a point of inflection. */
function formulaValues(n: number): number[] {
  if (n < 0) return []
  if (n === 0) return [0]
  const r = Math.sqrt(n)
  return [n - r, n + r]
}

function countFor(n: number) {
  return criticals(n).filter(c => isPOI(n, c)).length
}

function xTex(n: number, c: number): string {
  if (Math.abs(c) < TINY) return '0'
  const r = Math.sqrt(n)
  if (Number.isInteger(r)) return String(Math.round(c))
  return c < n ? `${n}-\\sqrt{${n}}` : `${n}+\\sqrt{${n}}`
}

const powTex = (n: number) => `x^{${n - 2}}`
function quadTex(n: number) {
  if (n === 0) return 'x^2'
  const s = n > 0 ? '-' : '+'
  return `(x${s}${Math.abs(n)})^2${s}${Math.abs(n)}`
}

/** Half-width around the asymptote x = 0 (n < 0) where |g|/scale exceeds 30. */
function asymGap(n: number, scale: number, side: 1 | -1) {
  let lo = 1e-6
  let hi = 1
  for (let i = 0; i < 50; i++) {
    const mid = (lo + hi) / 2
    if (Math.abs(g(n, side * mid)) / scale > 30) lo = mid
    else hi = mid
  }
  return hi
}

const cellText: Record<string, string> = { '1': '+', '-1': '−', '0': '0', U: 'undef' }
function signClass(s: Sign, strong: boolean) {
  if (s === 1) return strong ? 'text-sky-700 dark:text-sky-300 bg-sky-100 dark:bg-sky-900/40' : 'text-sky-700 dark:text-sky-300'
  if (s === -1) return strong ? 'text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-900/40' : 'text-orange-700 dark:text-orange-300'
  return 'text-gray-500 dark:text-gray-400'
}

export default function Count() {
  const [n, setN] = useState(3)
  const [zoom, setZoom] = useState(false)
  const [wrong, setWrong] = useState(false)
  const [seen, setSeen] = useState<number[]>([3])

  const pick = (v: number) => {
    const k = Math.round(v)
    setN(k)
    setSeen(s => (s.includes(k) ? s : [...s, k]))
  }

  const crit = criticals(n)
  const pois = crit.filter(c => isPOI(n, c))
  const count = pois.length
  const formula = formulaValues(n)
  const wrongCount = formula.length
  const falseHits = formula.filter(c => !pois.some(p => Math.abs(p - c) < 1e-6))

  // View and vertical scale (a positive vertical stretch never moves an inflection point).
  const xr: [number, number] = zoom ? [-0.5, 0.5] : [-2, n >= 1 ? Math.max(6, Math.ceil(n + Math.sqrt(n) + 1.5)) : 6]
  // For n < 0 the left branch never comes closer to the axis than |g(−1)| (n odd) or
  // g(−2) (n even), so scale by |g(−1)| and use a taller window to keep both branches in view.
  const yr: [number, number] = zoom ? [-1.25, 1.25] : n < 0 ? [-3, 3] : [-1.3, 1.4]
  const scale = zoom
    ? Math.max(Math.abs(g(n, -0.5)), Math.abs(g(n, 0.5)))
    : n >= 1
      ? g(n, n)
      : n < 0
        ? Math.abs(g(n, -1))
        : 1
  const G = (x: number) => g(n, x) / scale

  // Curve pieces between the critical points, coloured by the sign of g''.
  const breaks = [xr[0], ...crit.filter(c => c > xr[0] && c < xr[1]), xr[1]]
  const pieces: { a: number; b: number; color: string }[] = []
  for (let i = 0; i < breaks.length - 1; i++) {
    let a = breaks[i]
    let b = breaks[i + 1]
    if (n < 0 && Math.abs(a) < TINY) a = asymGap(n, scale, 1)
    if (n < 0 && Math.abs(b) < TINY) b = -asymGap(n, scale, -1)
    if (b <= a) continue
    const s = d2Sign(n, (a + b) / 2)
    pieces.push({ a, b, color: s === -1 ? C.g : C.f })
  }

  // Sign-table columns: an interval, then a critical point, … , then the last interval.
  const cols: { x: number; point: boolean }[] = []
  crit.forEach((c, i) => {
    const prev = i === 0 ? c - 1 : (crit[i - 1] + c) / 2
    cols.push({ x: prev, point: false }, { x: c, point: true })
  })
  cols.push({ x: crit[crit.length - 1] + 1, point: false })
  const rows: { tex: string; sign: (x: number) => Sign; strong?: boolean }[] = [
    { tex: powTex(n), sign: x => powSign(n, x) },
    { tex: quadTex(n), sign: x => quadSign(n, x) },
    { tex: 'e^{-x}', sign: () => 1 },
    { tex: "g''(x)", sign: x => d2Sign(n, x), strong: true },
  ]

  const k = n - 2
  const evenPow = k % 2 === 0
  let body
  if (n < 0) {
    body = (
      <>
        <b><M>{`n = ${n}`}</M>: no points of inflection.</b> The quadratic <M>{quadTex(n)}</M> is always positive, so the only
        place <M>{"g''"}</M> could change sign is <M>x = 0</M>
        {evenPow ? (
          <>, and it doesn&apos;t even do that: <M>{powTex(n)}</M> is an even power.</>
        ) : (
          <>, and it does, since <M>{powTex(n)}</M> is an odd power.</>
        )}{' '}
        But <M>{`g(0) = 0^{${n}}`}</M> doesn&apos;t exist: <M>x = 0</M> is a vertical asymptote, so there is no point on the graph
        there to be an inflection. Every negative <M>n</M> gives 0.
      </>
    )
  } else if (n === 0) {
    body = (
      <>
        <b><M>n = 0</M>: <M>{'g(x) = e^{-x}'}</M>, concave up everywhere, so 0 points of inflection.</b> The formula{' '}
        <M>{'n \\pm \\sqrt n'}</M> gives <M>x = 0</M>, but that is the root of the quadratic <M>{'x^2'}</M>, which cancels the{' '}
        <M>{'x^{-2}'}</M>: <M>{"g''(x) = e^{-x} > 0"}</M>. In the sign table, <M>{"g''"}</M> is + everywhere, including at 0.
      </>
    )
  } else if (n === 1) {
    body = (
      <>
        <b><M>n = 1</M>: one point of inflection, at <M>x = 2</M>.</b> The other value, <M>{'n - \\sqrt n = 0'}</M>, is a root of
        the quadratic <M>{'x(x-2)'}</M>, and it cancels the <M>{'x^{-1}'}</M>, leaving <M>{"g''(x) = (x-2)e^{-x}"}</M>. In the sign
        table both factors flip at 0, so their product doesn&apos;t.
      </>
    )
  } else if (n === 2) {
    body = (
      <>
        <b><M>n = 2</M> is part c&apos;s function</b>, with points of inflection at <M>{'2 \\pm \\sqrt2'}</M>. The factor{' '}
        <M>{'x^{0} = 1'}</M> does nothing at the origin, which is just the minimum. Two points of inflection. Now try <M>n = 3</M>.
      </>
    )
  } else if (evenPow) {
    body = (
      <>
        <b><M>{`n = ${n}`}</M>: two points of inflection.</b> <M>{"g''(0) = 0"}</M>, but <M>{powTex(n)}</M> is an even power, positive
        on both sides of 0, so <M>{"g''"}</M> doesn&apos;t change sign there. The origin is a flat minimum, not an inflection:
        turn on the zoom and you&apos;ll see a cup, like <M>{`y = x^{${n}}`}</M>.
      </>
    )
  } else {
    body = (
      <>
        <b><M>{`n = ${n}`}</M>: three points of inflection.</b> <M>{powTex(n)}</M> is an odd power, negative left of 0 and positive
        right of it, so <M>{"g''"}</M> changes sign at the origin as well as at <M>{`${n} \\pm \\sqrt{${n}}`}</M>. Since{' '}
        <M>{"g'(0) = 0"}</M> too, the origin is a stationary point of inflection. Zoom in: the curve snakes through like{' '}
        <M>{'y = x^3'}</M>. Then try an even <M>n</M>.
      </>
    )
  }

  let wrongNote = null
  if (wrong) {
    if (wrongCount === count) {
      wrongNote = (
        <Notice tone="neutral">
          Here, counting the values of <M>{'n \\pm \\sqrt n'}</M> happens to give the right answer, {count}, but only because{' '}
          <M>{powTex(n)}</M> doesn&apos;t change sign at a point on the graph. Try <M>n = 0</M>, <M>n = 1</M> or <M>n = 3</M>.
        </Notice>
      )
    } else {
      const why =
        n === 0 ? (
          <><M>x = 0</M> isn&apos;t even a zero of <M>{"g'',"}</M> because <M>{"g''(0) = 1."}</M></>
        ) : n === 1 ? (
          <><M>x = 0</M> is not where <M>{"g''"}</M> changes sign: the <M>{'x^{-1}'}</M> cancels it, and <M>{"g''(0) = -2"}</M>.</>
        ) : (
          <>It misses <M>x = 0</M>, where the odd power <M>{powTex(n)}</M> flips the sign of <M>{"g''"}</M>. The report says very few
          students split the cases into even and odd <M>n</M>.</>
        )
      wrongNote = (
        <Notice tone="warn">
          Counting the values of <M>{'n \\pm \\sqrt n'}</M> gives <b>{wrongCount}</b>, but the true count is <b>{count}</b>. {why}
        </Notice>
      )
    }
  }

  const byCount = [0, 1, 2, 3].map(c => [...seen].filter(v => countFor(v) === c).sort((a, b) => a - b))
  const cellBase = 'border border-gray-200 dark:border-gray-700 px-1.5 py-1 text-center'

  return (
    <div>
      <Plane x={xr} y={yr} xStep={zoom ? 0.25 : xr[1] > 8 ? 2 : 1} yStep={!zoom && n < 0 ? 1 : 0.5} height={300} yLabels={false}>
        {pieces.map((p, i) => (
          <Plot.OfX key={`${n}-${zoom}-${i}`} y={G} domain={[p.a, p.b]} color={p.color} weight={3} />
        ))}
        {pois.map(c => (
          <Point key={`p${c}`} x={c} y={G(c)} color={C.good} />
        ))}
        {n >= 4 && evenPow && (
          <>
            <Point x={0} y={0} color={C.guide} />
            <Label at={[0, 0]} attach="s" gap={24} color={C.guide} size={12}>not a POI</Label>
          </>
        )}
        {wrong &&
          falseHits.map(c => (
            <Point key={`w${c}`} x={c} y={G(c)} color={C.bad} />
          ))}
        {wrong && falseHits.length > 0 && (
          <Label
            at={[falseHits[0], G(falseHits[0])]}
            attach={Math.abs(G(falseHits[0])) < 0.2 ? 's' : 'se'}
            gap={Math.abs(G(falseHits[0])) < 0.2 ? 24 : 7}
            color={C.bad}
            size={12}
          >
            not a POI
          </Label>
        )}
      </Plane>
      <p className="mt-1 text-[12px] text-gray-500 dark:text-gray-400">
        <span className="font-semibold text-sky-600 dark:text-sky-400">Sky</span>: <Katex tex="g''>0" />, bending up.{' '}
        <span className="font-semibold text-orange-600 dark:text-orange-400">Orange</span>: <Katex tex="g''<0" />, bending
        down. The vertical scale changes with <Katex tex="n" />; stretching a graph vertically never moves its points of
        inflection.
      </p>
      <Controls>
        <Slider label="n" value={n} onChange={pick} min={N_MIN} max={N_MAX} step={1} format={v => String(Math.round(v))} />
        <Buttons>
          <Toggle label="Zoom in on the origin" checked={zoom} onChange={setZoom} />
          <Toggle label="Just count x = n ± √n" checked={wrong} onChange={setWrong} />
        </Buttons>

        <div className="overflow-x-auto">
          <table className="text-[12.5px] border-collapse mx-auto">
            <thead>
              <tr>
                <th className={`${cellBase} font-semibold text-gray-500 dark:text-gray-400`}>
                  <M>x</M>
                </th>
                {cols.map((c, i) => (
                  <th key={i} className={`${cellBase} font-normal ${c.point ? '' : 'text-gray-500 dark:text-gray-400'}`}>
                    {c.point ? <M>{xTex(n, c.x)}</M> : '···'}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.tex}>
                  <td className={`${cellBase} text-left whitespace-nowrap`}>
                    <M>{r.tex}</M>
                  </td>
                  {cols.map((c, i) => {
                    const s = r.sign(c.x)
                    return (
                      <td key={i} className={`${cellBase} font-semibold ${s === 'U' ? 'text-[10px]' : ''} ${signClass(s, !!r.strong)}`}>
                        {cellText[String(s)]}
                      </td>
                    )
                  })}
                </tr>
              ))}
              <tr>
                <td className={`${cellBase} text-left text-gray-600 dark:text-gray-300`}>POI?</td>
                {cols.map((c, i) => (
                  <td key={i} className={`${cellBase} font-bold`}>
                    {c.point ? (
                      isPOI(n, c.x) ? (
                        <span className="text-green-600 dark:text-green-400">✓</span>
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400">✗</span>
                      )
                    ) : null}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <Readouts>
          <Readout color={C.good} tex={`\\text{points of inflection: } ${count}`} />
          {count > 0 && <Readout color={C.good} tex={`x = ${pois.map(c => xTex(n, c)).join(',\\ ')}`} />}
          {wrong && (
            <Readout color={wrongCount === count ? C.guide : C.bad} tex={`\\text{values of } n \\pm \\sqrt n\\text{: } ${wrongCount}`} />
          )}
        </Readouts>
        <Notice tone={n <= 1 ? 'neutral' : 'good'}>{body}</Notice>
        {wrongNote}

        <div className="text-[12.5px] text-gray-600 dark:text-gray-300">
          <p className="mb-1 font-semibold">The question&apos;s table, from the values of <Katex tex="n" /> you have tried</p>
          {/* A long run of tried values is one KaTeX line that can't wrap: let it scroll on a phone. */}
          <div className="overflow-x-auto scrollbar-quiet">
            <table className="border-collapse">
              <tbody>
                {byCount.map((vals, c) => (
                  <tr key={c}>
                    <td className={`${cellBase} w-10`}>{c}</td>
                    <td className={`${cellBase} text-left min-w-[150px]`}>
                      {vals.length ? <Katex tex={`n = ${vals.join(', ')}`} /> : <span className="text-gray-500 dark:text-gray-400">?</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Controls>
    </div>
  )
}
