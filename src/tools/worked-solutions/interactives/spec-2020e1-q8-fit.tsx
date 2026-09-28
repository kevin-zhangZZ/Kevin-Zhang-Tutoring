// 2020 Specialist Exam 1 Q8 — why the numerator over the irreducible quadratic x² + 1 must be
// Bx + C, not a constant. Sliders for A, B and C build A/(x + 1) + (Bx + C)/(x² + 1) (orange) against
// the integrand's fraction (x² + x + 1)/((x + 1)(x² + 1)) (blue), with a live table matching the
// coefficients of A(x² + 1) + (Bx + C)(x + 1) = (A + B)x² + (B + C)x + (A + C) against x² + x + 1.
// Only A = B = C = ½ matches all three, and then the curves coincide for every x. The toggle forces
// B = 0 (a constant numerator): two unknowns can't satisfy three coefficient equations — A = 1 and
// C = 1 fix x² and x but leave the constant at 2. The starting state A = C = ½, B = 0 is exactly what
// substituting x = −1 and x = 0 into the constant-numerator form gives (the WrongMethod in the
// question file): the curves agree at x = 0 but not at x = 1 (0.5 against 0.75).

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Katex, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Toggle, num, tick } from './kit'

const target = (x: number) => (x * x + x + 1) / ((x + 1) * (x * x + 1))
const same = (a: number, b: number) => Math.abs(a - b) < 1e-6

function Coeffs({ c2, c1, c0 }: { c2: number; c1: number; c0: number }) {
  const cell = (ok: boolean) =>
    `px-1.5 py-1 text-center rounded ${
      ok
        ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/50 dark:text-emerald-100'
        : 'bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-200'
    }`
  const cols: { head: string; tex: string; v: number }[] = [
    { head: 'x^2', tex: 'A+B', v: c2 },
    { head: 'x', tex: 'B+C', v: c1 },
    { head: '\\text{constant}', tex: 'A+C', v: c0 },
  ]
  return (
    <table className="w-full table-fixed border-separate border-spacing-1 text-[12.5px] text-gray-700 dark:text-gray-300">
      <thead>
        <tr>
          <th className="w-[5.4rem] text-left font-normal text-[11.5px] text-gray-500 dark:text-gray-400">coefficient of</th>
          {cols.map(c => (
            <th key={c.head} className="font-normal">
              <Katex tex={c.head} />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="text-[11.5px] text-gray-500 dark:text-gray-400">right side</td>
          {cols.map(c => (
            <td key={c.head} className={cell(same(c.v, 1))}>
              <span className="flex flex-col items-center leading-tight">
                <Katex tex={c.tex} />
                <span className="font-semibold tabular-nums">
                  {num(c.v, 2)} {same(c.v, 1) ? '✓' : '✗'}
                </span>
              </span>
            </td>
          ))}
        </tr>
        <tr>
          <td className="text-[11.5px] text-gray-500 dark:text-gray-400">left side</td>
          {cols.map(c => (
            <td key={c.head} className="px-1.5 py-1 text-center">
              <Katex tex="1" />
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}

export default function Fit() {
  const [A, setA] = useState(0.5)
  const [Bv, setB] = useState(0)
  const [Cv, setC] = useState(0.5)
  const [constOnly, setConstOnly] = useState(false)

  const B = constOnly ? 0 : Bv
  const trial = (x: number) => A / (x + 1) + (B * x + Cv) / (x * x + 1)
  const c2 = A + B
  const c1 = B + Cv
  const c0 = A + Cv
  const m2 = same(c2, 1)
  const m1 = same(c1, 1)
  const m0 = same(c0, 1)
  const all = m2 && m1 && m0
  const matched = [m2, m1, m0].filter(Boolean).length
  const aHalf = same(A, 0.5)

  let notice
  if (constOnly) {
    if (m2 && m1) {
      notice = (
        <Notice tone="warn">
          <b>
            <M>x^2</M> and <M>x</M> match, but now the constant is <M>A + C = 2</M>, not 1.
          </b>{' '}
          At <M>x = 0</M> the orange curve is at 2 (off the top of the graph), double the blue one. Fix the constant and
          you break <M>x^2</M> or{' '}
          <M>x</M>. Three equations (<M>x^2</M>, <M>x</M>, constant) and only two unknowns: no constant on top of{' '}
          <M>x^2 + 1</M> can ever work. Turn the toggle off and give it <M>Bx + C</M>.
        </Notice>
      )
    } else if (matched >= 2) {
      notice = (
        <Notice tone="warn">
          Two of the three coefficients match, but the third doesn&apos;t, and it can&apos;t: with only <M>A</M> and{' '}
          <M>C</M> there are three equations and two unknowns. Try <M>A = 1</M>, <M>C = 1</M>, or turn the toggle off.
        </Notice>
      )
    } else if (aHalf && same(Cv, 0.5)) {
      notice = (
        <Notice tone="warn">
          <b>This is what substituting <M>x = -1</M> and <M>x = 0</M> gives: <M>{'A = C = \\tfrac12'}</M>.</b> The curves
          agree at <M>x = 0</M> (the green dot), but look at <M>x = 1</M>: orange is at 0.5, blue at 0.75. Two
          substitutions will always &ldquo;find&rdquo; two constants. A third value of <M>x</M>, or comparing
          coefficients, shows they&apos;re wrong.
        </Notice>
      )
    } else {
      notice = (
        <Notice>
          With only a constant <M>C</M> over <M>x^2 + 1</M> there are two unknowns but three coefficients to match. Drag{' '}
          <M>A</M> and <M>C</M> and try to put the orange curve on the blue one.
        </Notice>
      )
    }
  } else if (all) {
    notice = (
      <Notice tone="good">
        <b>
          All three coefficients match: <M>{'A = B = C = \\tfrac12'}</M>.
        </b>{' '}
        The two numerators are the same polynomial, so your sum (now green) lies on the blue curve for <i>every</i>{' '}
        <M>x</M>, not just on <M>{'[0, \\sqrt3]'}</M>. Times 4, that is{' '}
        <M>{'y^2 = \\tfrac{2}{x+1} + \\tfrac{2x+2}{x^2+1}'}</M>. Now try the toggle to see why the <M>Bx</M> had to
        be there.
      </Notice>
    )
  } else if (aHalf && same(B, 0) && same(Cv, 0.5)) {
    notice = (
      <Notice>
        <M>{'A = \\tfrac12'}</M> (from <M>x = -1</M>) and <M>{'C = \\tfrac12'}</M> make the constants match, so the
        curves agree at <M>x = 0</M>. But with <M>B = 0</M> the <M>x^2</M> and <M>x</M> coefficients are only{' '}
        <M>{'\\tfrac12'}</M> each, and the orange curve is too low for <M>{'x > 0'}</M>. <b>Drag <M>B</M> to{' '}
        <M>{'\\tfrac12'}</M></b>: the <M>Bx</M> term adds <M>{'Bx(x+1) = Bx^2 + Bx'}</M>, topping up both at once.
      </Notice>
    )
  } else if (!aHalf) {
    notice = (
      <Notice>
        Start with <M>A</M>: press &ldquo;Use <M>x = -1</M>&rdquo;. At <M>x = -1</M> the factor <M>x + 1</M> is zero, so
        the whole <M>{'(Bx + C)(x + 1)'}</M> term vanishes and the identity says <M>1 = 2A</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>{'A = \\tfrac12'}</M> is settled. Now compare coefficients: <M>x^2</M> needs <M>A + B = 1</M> and the
        constant needs <M>A + C = 1</M>. The <M>x</M> coefficient, <M>B + C = 1</M>, is then a free check.
      </Notice>
    )
  }

  const trialColor = all && !constOnly ? C.good : C.g

  return (
    <div>
      {/* No tick number at y = 1: the green dot at (0, 1) sits on it. */}
      <Plane x={[-0.5, 3]} y={[0, 1.5]} xStep={0.5} yStep={0.5} height={300} yLabels={v => (Math.abs(v - 1) < 1e-9 ? '' : tick(v))}>
        <Plot.OfX y={target} domain={[-0.5, 3]} color={C.f} weight={4} />
        <Plot.OfX y={trial} domain={[-0.5, 3]} color={trialColor} weight={2.5} style={all && !constOnly ? 'solid' : 'dashed'} />
        {same(trial(0), target(0)) && <Point x={0} y={1} color={C.good} />}
        {!all && <Point x={1} y={trial(1)} color={C.g} />}
        {!all && <Point x={1} y={target(1)} color={C.f} />}
      </Plane>
      <Controls>
        <Readouts>
          <Readout color={C.f} tex="\dfrac{x^2+x+1}{(x+1)(x^2+1)}" />
          <Readout color={trialColor} tex={constOnly ? '\\dfrac{A}{x+1}+\\dfrac{C}{x^2+1}' : '\\dfrac{A}{x+1}+\\dfrac{Bx+C}{x^2+1}'} />
        </Readouts>
        <Slider label="A" value={A} onChange={setA} min={-0.5} max={1.5} step={0.05} />
        {constOnly ? (
          <p className="text-[12.5px] text-gray-500 dark:text-gray-400">
            <M>B = 0</M>: only a constant on top of <M>x^2 + 1</M>.
          </p>
        ) : (
          <Slider label="B" value={Bv} onChange={setB} min={-0.5} max={1.5} step={0.05} />
        )}
        <Slider label="C" value={Cv} onChange={setC} min={-0.5} max={1.5} step={0.05} />
        <Buttons>
          <ActionButton label={<>Use <Katex tex="x=-1" /></>} onClick={() => setA(0.5)} />
          <Toggle label="Constant on top of x² + 1" checked={constOnly} onChange={setConstOnly} />
          <ActionButton
            label="Reset"
            onClick={() => {
              setA(0.5)
              setB(0)
              setC(0.5)
            }}
          />
        </Buttons>
        <p className="text-[12.5px] leading-relaxed text-gray-600 dark:text-gray-300">
          Multiplied out, <M>{'A(x^2+1)+(Bx+C)(x+1)'}</M> is <M>{'(A+B)x^2+(B+C)x+(A+C)'}</M>. It has to equal{' '}
          <M>x^2+x+1</M>:
        </p>
        <Coeffs c2={c2} c1={c1} c0={c0} />
        {!all && (
          <Readouts>
            <Readout color={C.f} tex={`\\text{at } x = 1\\text{: blue} = ${num(target(1), 2)}`} />
            <Readout color={C.g} tex={`\\text{orange} = ${num(trial(1), 2)}`} />
          </Readouts>
        )}
        {notice}
      </Controls>
    </div>
  )
}
