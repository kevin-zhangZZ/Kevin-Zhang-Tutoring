// 2018 Specialist Exam 1 Q8a — two different things flow through this tank: litres of liquid and
// kilograms of salt, and the differential equation needs both accounts. A time slider runs the
// tank: 5 L of pure water in and 3 L of mixture out each minute, so the level RISES 2 L a minute
// (V = 16 + 2t) while the salt dots (10 g each) thin out. The ledger beside it keeps the accounts
// separate: salt in = 5 × 0 = 0 kg/min (the report's most common lost mark was not writing this),
// salt out = 3 × Q/V kg/min. A toggle tries "pure water adds no salt, so ignore the inflow": its
// red level V = 16 − 3t falls and "empties" the tank at t = 16/3 while the real tank is filling.
//
// Q is the actual salt in the tank: part b's solution Q = 32/(16 + 2t)^{3/2} (checked with sympy).

import { useState } from 'react'
import { Buttons, C, Controls, Katex, M, Notice, PlayButton, Readout, Readouts, Slider, Toggle, num, usePlayer } from './kit'

const T_MAX = 30
const vol = (t: number) => 16 + 2 * t
const salt = (t: number) => 32 / Math.pow(vol(t), 1.5)
const wrongVol = (t: number) => 16 - 3 * t

// Tank drawing (SVG units): walls x 70–180, open top at y = 30, floor at y = 190; 80 L at y = 42.
const X0 = 70
const X1 = 180
const FLOOR = 190
const yOf = (V: number) => FLOOR - V * 1.85

// Fixed scatter positions for the salt dots (one dot = 10 g, so 50 dots at the start).
const DOTS: [number, number][] = (() => {
  let s = 7
  const r = () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
  return Array.from({ length: 50 }, () => [r(), r()] as [number, number])
})()

function Tank({ t, wrong }: { t: number; wrong: boolean }) {
  const V = vol(t)
  const level = yOf(V)
  const dots = Math.round(salt(t) * 100)
  const Vw = wrongVol(t)
  return (
    <svg
      viewBox="0 0 250 212"
      className="w-full max-w-[260px] text-gray-700 dark:text-gray-300"
      role="img"
      aria-label={`Tank holding ${V.toFixed(1)} litres with ${num(salt(t), 3)} kg of salt; 5 L per minute of pure water flows in and 3 L per minute flows out`}
    >
      <defs>
        <marker id="q8a-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 Z" fill="currentColor" />
        </marker>
      </defs>
      {/* the water */}
      <rect x={X0 + 1.5} y={level} width={X1 - X0 - 3} height={FLOOR - level - 1.5} fill={C.f} fillOpacity={0.18} />
      <line x1={X0 + 1.5} y1={level} x2={X1 - 1.5} y2={level} stroke={C.f} strokeWidth={2} />
      {/* the salt, spread evenly through whatever water there is */}
      {DOTS.slice(0, dots).map(([u, v], i) => (
        <circle
          key={i}
          cx={X0 + 7 + u * (X1 - X0 - 14)}
          cy={level + 6 + v * Math.max(0, FLOOR - level - 12)}
          r={1.9}
          fill="currentColor"
          fillOpacity={0.85}
        />
      ))}
      {/* walls */}
      <path d={`M${X0} 30 L${X0} ${FLOOR} L${X1} ${FLOOR} L${X1} 30`} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinejoin="round" />
      {/* 16 L mark on the left wall */}
      <line x1={X0 - 5} y1={yOf(16)} x2={X0} y2={yOf(16)} stroke="currentColor" strokeWidth={1.5} />
      <text x={X0 - 8} y={yOf(16) + 4} fontSize={11} textAnchor="end" fill="currentColor">16 L</text>
      {/* inflow */}
      <path d="M8 22 L104 22 L104 40" fill="none" stroke="currentColor" strokeWidth={2} markerEnd="url(#q8a-arrow)" />
      <text x={8} y={13} fontSize={11.5} fill="currentColor" fontWeight={600}>in: 5 L/min, pure water</text>
      {/* outflow */}
      <path d={`M${X1} 180 L244 180`} fill="none" stroke="currentColor" strokeWidth={2} markerEnd="url(#q8a-arrow)" />
      <text x={X1 + 5} y={170} fontSize={11.5} fill="currentColor" fontWeight={600}>out:</text>
      <text x={X1 + 5} y={200} fontSize={11.5} fill="currentColor" fontWeight={600}>3 L/min</text>
      {/* how much liquid is in the tank */}
      <text x={X1 - 6} y={level - 6} fontSize={12} fontWeight={700} textAnchor="end" fill={C.f}>{`V = ${num(V, 1)} L`}</text>
      {/* the level the "ignore the inflow" model believes */}
      {wrong &&
        (Vw > 0 ? (
          <>
            <line x1={X0 - 4} y1={yOf(Vw)} x2={X1 + 4} y2={yOf(Vw)} stroke={C.bad} strokeWidth={2} strokeDasharray="6 4" />
            <text x={X1 - 6} y={yOf(Vw) + 15} fontSize={11.5} fontWeight={700} textAnchor="end" fill={C.bad}>
              {`16 − 3t = ${num(Vw, 1)} L`}
            </text>
          </>
        ) : (
          <>
            <line x1={X0 - 4} y1={FLOOR} x2={X1 + 4} y2={FLOOR} stroke={C.bad} strokeWidth={3} strokeDasharray="6 4" />
            <text x={X0 + 55} y={FLOOR + 17} fontSize={11.5} fontWeight={700} textAnchor="middle" fill={C.bad}>
              {Vw > -0.05 ? '16 − 3t = 0: "empty"' : '16 − 3t below 0'}
            </text>
          </>
        ))}
    </svg>
  )
}

export default function TankWidget() {
  const [t, setT] = useState(5)
  const [wrong, setWrong] = useState(false)
  const player = usePlayer(setT, { min: 0, max: T_MAX, seconds: 10 })

  const V = vol(t)
  const Q = salt(t)
  const out = (3 * Q) / V
  const Vw = wrongVol(t)
  const tt = num(t, 1)
  const start = t < 0.25

  let notice
  if (!wrong) {
    notice = start ? (
      <Notice>
        At the start there are 0.5 kg of salt in 16 L: <M>{'\\tfrac{1}{32}'}</M> kg in every litre. The 3 L leaving each
        minute carry <M>{'3 \\times \\tfrac{1}{32} = \\tfrac{3}{32}'}</M> kg of salt. The 5 L arriving are pure water, so
        they carry <M>5 \times 0 = 0</M> kg. Press play and watch both the level and the dots.
      </Notice>
    ) : (
      <Notice tone="good">
        After {tt} minutes, {num(5 * t, 1)} L have come in and {num(3 * t, 1)} L have gone out, so the tank holds{' '}
        <M>{`16 + 2t = ${num(V, 1)}\\ \\text{L}`}</M>. It is stirred, so every litre leaving carries <M>{'\\tfrac{Q}{V}'}</M> kg of
        salt, and 3 litres leave each minute: <M>{'\\tfrac{3Q}{16 + 2t}'}</M>. The dots thin out for two reasons: salt
        leaves, and the pure water spreads what is left through more litres. Now try the toggle.
      </Notice>
    )
  } else if (Vw > 0) {
    notice = (
      <Notice tone="warn">
        &ldquo;Pure water adds no salt, so ignore it&rdquo; gives <M>V = 16 - 3t</M>, the red line: a tank that drains. The
        inflow adds 0 kg of salt, but it still adds 5 L of liquid, and litres are what the concentration divides by. With
        the red volume, salt would leave at <M>{`\\tfrac{3Q}{16 - 3t} \\approx ${num((3 * Q) / Vw, 3)}`}</M> kg/min
        instead of <M>{num(out, 3)}</M>. Keep going to <M>{'t = \\tfrac{16}{3}'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        At <M>{'t = \\tfrac{16}{3} \\approx 5.3'}</M> minutes, <M>16 - 3t = 0</M>: this model says the tank is empty, yet it
        holds <M>{`16 + 2t = ${num(V, 1)}\\ \\text{L}`}</M>. Keep the two accounts separate. Salt: in at <M>5 \times 0 = 0</M>. Litres:
        in at 5, out at 3, so the volume grows by <M>5 - 3 = 2</M> L every minute.
      </Notice>
    )
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <Tank t={t} wrong={wrong} />
        <div className="text-[13.5px] text-gray-700 dark:text-gray-200 flex flex-col gap-1.5">
          <p className="text-[12px] font-semibold text-gray-500 dark:text-gray-400">Litres (after {tt} min)</p>
          <Katex tex={`V = 16 + 5t - 3t`} />
          <Katex tex={`\\phantom{V} = 16 + ${num(5 * t, 1)} - ${num(3 * t, 1)}`} />
          <Katex tex={`\\phantom{V} = ${num(V, 1)}\\ \\text{L}`} />
          <p className="text-[12px] font-semibold text-gray-500 dark:text-gray-400 mt-2">Kilograms of salt per minute</p>
          <Katex tex={`\\text{in} = 5 \\times 0 = 0`} />
          <Katex tex={`\\text{out} = 3 \\times \\tfrac{Q}{V} \\approx 3 \\times \\tfrac{${num(Q, 3)}}{${num(V, 1)}}`} />
          <Katex tex={`\\phantom{\\text{out}} \\approx ${num(out, 4)}`} />
        </div>
      </div>
      <Controls>
        <Slider
          label="t"
          value={t}
          onChange={v => {
            player.stop()
            setT(v)
          }}
          min={0}
          max={T_MAX}
          step={0.1}
          format={v => `${num(v, 1)} min`}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Run the tank" />
          <Toggle label="Pure water adds no salt, so ignore the inflow?" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`Q \\approx ${num(Q, 3)}\\ \\text{kg}`} />
          <Readout color={C.f} tex={`\\tfrac{Q}{V} \\approx ${num(Q / V, 4)}\\ \\text{kg/L}`} />
          <Readout tex={`\\tfrac{dQ}{dt} = 0 - \\tfrac{3Q}{16+2t} \\approx ${num(-out, 4)}`} />
          {wrong && (
            <Readout
              color={C.bad}
              tex={Vw > 0.05 ? `16 - 3t = ${num(Vw, 1)}\\ \\text{L}` : `16 - 3t \\le 0`}
            />
          )}
        </Readouts>
        {notice}
        <p className="text-[11.5px] text-gray-500 dark:text-gray-400">
          Each dot is 10 g of salt. The amount <M>Q</M> shown is part b&apos;s answer, the salt actually in the tank; part a
          only asks for the equation.
        </p>
      </Controls>
    </div>
  )
}
