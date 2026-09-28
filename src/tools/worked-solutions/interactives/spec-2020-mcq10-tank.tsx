// 2020 Specialist Exam 2 MCQ 10 — why the outflow term divides by 50 − 3t. A time slider drains
// the tank: every minute 2 L pour in and 5 L flow out, so the level falls 3 L a minute and the
// ledger beside the tank adds it up, V = 50 + 2t − 5t = 50 − 3t. The readouts follow the salt: in at
// 2 × 15 = 30 g/min, out at 5 × m/V. The model buttons draw the level each wrong option assumes as
// a red dashed line — option C's fixed 50 L (5m/50 = m/10) and option E's 50 − 5t, which "empties"
// the tank at t = 10 while 20 L are still in it (14% chose E) — and quote the outflow each one
// computes from the same m.
//
// m is the actual salt: option D solved with m(0) = 300 (checked with sympy),
// m = 15V − 450(V/50)^{5/3} with V = 50 − 3t. At t = 0 the tank is at 6 g/L, so 30 g/min leave and
// 30 g/min arrive (dm/dt = 0 for an instant); m falls to 0 as the tank runs dry at t = 50/3.

import { useState } from 'react'
import { Buttons, C, Controls, Katex, M, Notice, PlayButton, Readout, Readouts, Slider, Toggle, num, usePlayer } from './kit'

const T_MAX = 16.6 // the tank runs dry at t = 50/3 ≈ 16.67; stop just short, where V = 0.2 L
const vol = (t: number) => 50 - 3 * t
const salt = (t: number) => {
  const V = vol(t)
  return 15 * V - 450 * Math.pow(V / 50, 5 / 3)
}

type Model = 'D' | 'C' | 'E'
const MODEL_VOL: Record<Model, (t: number) => number> = {
  D: vol,
  C: () => 50,
  E: t => 50 - 5 * t,
}

// Tank drawing (SVG units): walls x 60–170, open top at y = 44, floor at y = 184; 50 L at y = 64.
const X0 = 60
const X1 = 170
const FLOOR = 184
const yOf = (V: number) => FLOOR - V * 2.4

function Tank({ t, model }: { t: number; model: Model }) {
  const V = vol(t)
  const c = salt(t) / V
  const level = yOf(V)
  const tint = 0.16 + (0.42 * (c - 6)) / 9
  const Vm = MODEL_VOL[model](t)
  const ghost = model === 'D' ? null : yOf(Math.max(0, Vm))
  const ghostText = model === 'C' ? 'C: 50 L' : Vm > 0.05 ? `E: ${num(Vm, 1)} L` : Vm > -0.05 ? 'E: 0 L' : 'E: below 0'
  return (
    <svg viewBox="0 0 240 206" className="w-full max-w-[250px] text-gray-700 dark:text-gray-300" role="img" aria-label={`Tank holding ${V.toFixed(1)} litres, with 2 L per minute flowing in and 5 L per minute flowing out`}>
      <defs>
        <marker id="tank-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 Z" fill="currentColor" />
        </marker>
      </defs>
      {/* water, tinted darker as the concentration rises from 6 g/L towards 15 g/L */}
      <rect x={X0 + 1.5} y={level} width={X1 - X0 - 3} height={Math.max(0, FLOOR - level - 1.5)} fill={C.f} fillOpacity={tint} />
      <line x1={X0 + 1.5} y1={level} x2={X1 - 1.5} y2={level} stroke={C.f} strokeWidth={2} />
      {/* walls */}
      <path d={`M${X0} 44 L${X0} ${FLOOR} L${X1} ${FLOOR} L${X1} 44`} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinejoin="round" />
      {/* 50 L mark on the left wall */}
      <line x1={X0 - 5} y1={yOf(50)} x2={X0} y2={yOf(50)} stroke="currentColor" strokeWidth={1.5} />
      <text x={X0 - 8} y={yOf(50) + 4} fontSize={11} textAnchor="end" fill="currentColor">50 L</text>
      {/* inflow */}
      <path d="M8 28 L96 28 L96 50" fill="none" stroke="currentColor" strokeWidth={2} markerEnd="url(#tank-arrow)" />
      <text x={8} y={18} fontSize={11.5} fill="currentColor" fontWeight={600}>in: 2 L/min at 15 g/L</text>
      {/* outflow */}
      <path d={`M${X1} 174 L226 174`} fill="none" stroke="currentColor" strokeWidth={2} markerEnd="url(#tank-arrow)" />
      <text x={X1 + 4} y={164} fontSize={11.5} fill="currentColor" fontWeight={600}>out:</text>
      <text x={X1 + 4} y={194} fontSize={11.5} fill="currentColor" fontWeight={600}>5 L/min</text>
      {/* the level and how much is in the tank */}
      {V > 6 ? (
        <text x={X0 + 8} y={level + 15} fontSize={12} fontWeight={700} fill={C.f}>{`V = ${num(V, 1)} L`}</text>
      ) : (
        <text x={X0 + 8} y={level - 6} fontSize={12} fontWeight={700} fill={C.f}>{`V = ${num(V, 1)} L`}</text>
      )}
      {/* the level a wrong option assumes */}
      {ghost !== null && (
        <>
          <line x1={X0 - 4} y1={ghost} x2={X1 + 4} y2={ghost} stroke={C.bad} strokeWidth={2} strokeDasharray="6 4" />
          <text x={X1 - 6} y={ghost < 60 ? ghost + 14 : ghost - 6} fontSize={11.5} fontWeight={700} textAnchor="end" fill={C.bad}>
            {ghostText}
          </text>
        </>
      )}
    </svg>
  )
}

export default function TankWidget() {
  const [t, setT] = useState(10)
  const [model, setModel] = useState<Model>('D')
  const player = usePlayer(setT, { min: 0, max: T_MAX, seconds: 9 })

  const V = vol(t)
  const m = salt(t)
  const c = m / V
  const out = 5 * c
  const Vm = MODEL_VOL[model](t)
  const tt = num(t, 1)
  const start = t < 0.25
  const end = t > 15.8

  let notice
  if (model === 'D') {
    if (start) {
      notice = (
        <Notice>
          At the start the tank holds 300 g of salt in 50 L: 6 g in every litre. The 5 L leaving each minute carry{' '}
          <M>5 \times 6 = 30</M> g, exactly the 30 g arriving, so for this one instant <M>{'\\tfrac{dm}{dt} = 0'}</M>. It
          doesn&apos;t last, because the volume doesn&apos;t stay at 50 L. Press play and watch the level.
        </Notice>
      )
    } else if (end) {
      notice = (
        <Notice tone="warn">
          The tank is nearly empty. At <M>{'t = \\tfrac{50}{3} \\approx 16.7'}</M> minutes, <M>50 - 3t = 0</M> and{' '}
          <M>{'\\tfrac{5m}{50 - 3t}'}</M> is undefined. That is why the question says &ldquo;for a non-zero volume of
          mixture&rdquo;. The mixture is now close to 15 g/L: almost all of it is solution that poured in.
        </Notice>
      )
    } else {
      notice = (
        <Notice tone="good">
          Every minute 2 L pour in and 5 L flow out, so the tank <b>loses 3 L a minute</b>. After {tt} minutes it holds{' '}
          <M>{`50 + 2t - 5t = 50 - 3t = ${num(V, 1)}`}</M> L. It is well stirred, so every litre that leaves carries{' '}
          <M>{'\\tfrac{m}{V}'}</M> grams (about {num(c, 1)} g now), and 5 of those litres leave each minute:{' '}
          <M>{'\\tfrac{5m}{50 - 3t}'}</M>. That is option D. Now try the other two volumes.
        </Notice>
      )
    }
  } else if (model === 'C') {
    notice = start ? (
      <Notice>
        At <M>t = 0</M> option C agrees with D, since both use 50 L. Press play to see them part company.
      </Notice>
    ) : (
      <Notice tone="warn">
        Option C divides by 50, as if the tank always held 50 L (<M>{'\\tfrac{5m}{50} = \\tfrac{m}{10}'}</M>). The red
        line is where C thinks the surface is; the real surface is at {num(V, 1)} L. Spreading the same {num(m, 0)} g through
        50 L makes the mixture look weaker than it is: C says <M>{`${num((5 * m) / 50, 1)}`}</M> g/min leave, when really{' '}
        <M>{num(out, 1)}</M> g/min do. The volume only stays fixed when the flow in equals the flow out.
      </Notice>
    )
  } else {
    notice =
      Vm > 0.05 ? (
        <Notice tone="warn">
          Option E uses <M>50 - 5t</M>: it counts the 5 L leaving each minute but forgets the 2 L arriving, so its surface
          (red) falls too fast. Keep going to <M>t = 10</M> and see what E says there.
        </Notice>
      ) : (
        <Notice tone="warn">
          At <M>t = 10</M> option E&apos;s volume <M>50 - 5t</M> is zero: it says the tank is empty. But 20 L have poured in
          and 50 L have flowed out, so <M>50 + 20 - 50 = 20</M> L are still there. {Vm < -0.05 && <>After that E&apos;s &ldquo;volume&rdquo; is negative. </>}
          Only the <b>net</b> flow, <M>2 - 5 = -3</M> L/min, changes the volume.
        </Notice>
      )
  }

  const wrongOut =
    model === 'D'
      ? null
      : model === 'C'
        ? `\\text{C: } 5\\times\\tfrac{m}{50} \\approx ${num((5 * m) / 50, 1)}\\ \\text{g/min}`
        : Vm > 0.05
          ? `\\text{E: } 5\\times\\tfrac{m}{50-5t} \\approx ${num((5 * m) / Vm, 1)}\\ \\text{g/min}`
          : `\\text{E: } 5\\times\\tfrac{m}{50-5t}\\ \\text{is undefined or negative}`

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <Tank t={t} model={model} />
        <div className="text-[13.5px] text-gray-700 dark:text-gray-200 flex flex-col gap-1.5">
          <p className="text-[12px] text-gray-500 dark:text-gray-400">Volume after {tt} min</p>
          <Katex tex={`V = 50 + 2t - 5t`} />
          <Katex tex={`\\phantom{V} = 50 + ${num(2 * t, 1)} - ${num(5 * t, 1)}`} />
          <Katex tex={`\\phantom{V} = ${num(V, 1)}\\ \\text{L}`} />
          <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-1">a net loss of 3 L a minute, so</p>
          <Katex tex={`V = 50 - 3t`} />
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
          step={0.05}
          format={v => `${num(v, 1)} min`}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Run the tank" />
        </Buttons>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[12px] text-gray-500 dark:text-gray-400">Volume in the outflow term:</span>
          <Toggle label={<>50 − 3t (D)</>} checked={model === 'D'} onChange={() => setModel('D')} />
          <Toggle label={<>50 (C)</>} checked={model === 'C'} onChange={() => setModel('C')} />
          <Toggle label={<>50 − 5t (E)</>} checked={model === 'E'} onChange={() => setModel('E')} />
        </div>
        <Readouts>
          <Readout tex={`\\text{salt in} = 2\\times15 = 30\\ \\text{g/min}`} />
          <Readout color={C.f} tex={`m \\approx ${num(m, 1)}\\ \\text{g}`} />
          <Readout color={C.f} tex={`\\tfrac{m}{V} \\approx ${num(c, 2)}\\ \\text{g/L}`} />
          <Readout color={C.f} tex={`\\text{salt out} = 5\\times\\tfrac{m}{V} \\approx ${num(out, 1)}\\ \\text{g/min}`} />
          <Readout tex={`\\tfrac{dm}{dt} \\approx ${num(30 - out, 1)}\\ \\text{g/min}`} />
          {wrongOut && <Readout color={C.bad} tex={wrongOut} />}
        </Readouts>
        {notice}
        <p className="text-[11.5px] text-gray-500 dark:text-gray-400">
          The salt <M>m</M> shown is option D&apos;s equation solved with <M>m(0) = 300</M> (by CAS): the actual amount in
          the tank. The question only asks for the equation.
        </p>
      </Controls>
    </div>
  )
}
