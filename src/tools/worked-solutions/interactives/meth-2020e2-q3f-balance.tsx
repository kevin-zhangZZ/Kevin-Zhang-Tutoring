// 2020 Methods Exam 2 Q3f — the tree diagram as an area model. All deliveries form a unit square:
// a column of width y (after 4 pm, on time with probability x) and a column of width 1 − y
// (before 4 pm, on time with probability 0.85). The shaded area is the overall on-time
// probability 0.85(1 − y) + xy, the sum of the tree's two on-time branches. For it to equal 0.75,
// the green extra above the 0.75 line in the before-4 pm column must exactly fill the red gap
// below it in the after-4 pm column: 0.1(1 − y) = (0.75 − x)y, i.e. y = 0.1/(0.85 − x). The
// smaller x is, the deeper the gap and the thinner the after-4 pm column must be, so y runs from
// 2/11 (x = 0.3) to 2/3 (x = 0.7). The split point sits directly above y on the number line below.

import { useState } from 'react'
import { Buttons, C, Controls, M, Notice, Readout, Readouts, Slider, Toggle, clamp } from './kit'

const X0 = 56
const X1 = 298
const Y0 = 12
const Y1 = 192
const sx = (u: number) => X0 + u * (X1 - X0)
const sy = (p: number) => Y1 - p * (Y1 - Y0)
const Y_MIN = 2 / 11
const Y_MAX = 2 / 3
const balanceY = (x: number) => 0.1 / (0.85 - x)

export default function Balance() {
  const [x, setX] = useState(0.5)
  const [lock, setLock] = useState(true)
  const [yFree, setYFree] = useState(0.4)

  const y = lock ? balanceY(x) : yFree
  const overall = 0.85 * (1 - y) + x * y
  const extra = 0.1 * (1 - y)
  const short = (0.75 - x) * y
  const balanced = Math.abs(overall - 0.75) < 0.0005
  const atMin = lock && Math.abs(x - 0.3) < 1e-6
  const atMax = lock && Math.abs(x - 0.7) < 1e-6

  const colW = (y: number) => y * (X1 - X0)
  // A narrow after-4 pm column gets its name on two lines, so it stays inside the column.
  const afterNarrow = colW(y) < 64
  const afterMid = clamp(sx(y / 2), X0 + (afterNarrow ? 14 : 24), X1 - 30)
  const beforeMid = clamp(sx((1 + y) / 2), X0 + 30, X1 - 30)

  let notice
  if (atMin) {
    notice = (
      <Notice tone="good">
        <b>x = 0.3, the worst the analyst allows after 4 pm.</b> Every after-4 pm delivery is 0.45 short of 0.75, so only a thin
        slice of deliveries can be after 4 pm before the extra from the before-4 pm deliveries is used up:{' '}
        <M>{'y = \\tfrac{0.1}{0.55} = \\tfrac{2}{11} \\approx 0.18'}</M>, the <b>minimum</b>.
      </Notice>
    )
  } else if (atMax) {
    notice = (
      <Notice tone="good">
        <b>x = 0.7:</b> each after-4 pm delivery is now only 0.05 short, so it takes a much wider column to use up the same extra:{' '}
        <M>{'y = \\tfrac{0.1}{0.15} = \\tfrac{2}{3}'}</M>, the <b>maximum</b>. Because <M>y</M> only ever increases with{' '}
        <M>x</M>, the two ends of <M>{'0.3 \\le x \\le 0.7'}</M> give the two ends of <M>y</M>.
      </Notice>
    )
  } else if (lock) {
    notice = (
      <Notice>
        Each column&apos;s shaded area is (share of deliveries) × (chance of being on time), the two on-time branches of the
        tree, so the total shaded area is <M>{'0.85(1-y) + xy'}</M>. For it to be 0.75, the <b>green extra</b> above the red
        line must exactly fill the <b>red gap</b> below it: <M>{'0.1(1-y) = (0.75-x)\\,y'}</M>, which rearranges to{' '}
        <M>{'y = \\tfrac{0.1}{0.85-x}'}</M>. Drag <M>x</M> down to 0.3 and up to 0.7 and watch the split move.
      </Notice>
    )
  } else if (balanced) {
    notice = (
      <Notice tone="good">
        Balanced: the green extra exactly fills the red gap, so the overall chance of being on time is 0.75. Only one width{' '}
        <M>y</M> does this for each <M>x</M>, namely <M>{'y = \\tfrac{0.1}{0.85-x}'}</M>.
      </Notice>
    )
  } else if (overall > 0.75) {
    notice = (
      <Notice>
        Overall about {overall.toFixed(4)}, more than 0.75: the green extra is bigger than the red gap. Too few deliveries are
        after 4 pm to drag the average down that far, so <b>increase</b> <M>y</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Overall about {overall.toFixed(4)}, less than 0.75: the red gap is bigger than the green extra. Too many deliveries are
        after 4 pm, so <b>decrease</b> <M>y</M>.
      </Notice>
    )
  }

  return (
    <div>
      <div className="text-gray-700 dark:text-gray-300">
        <svg viewBox="0 0 340 262" className="w-full max-w-[460px] mx-auto block" role="img" aria-label="A unit square split into an after-4 pm column of width y, shaded to height x, and a before-4 pm column of width 1 − y, shaded to height 0.85, with a dashed line at 0.75">
          {/* The two on-time areas. */}
          <rect x={sx(0)} y={sy(x)} width={colW(y)} height={sy(0) - sy(x)} fill={C.g} fillOpacity={0.45} />
          <rect x={sx(y)} y={sy(0.85)} width={colW(1 - y)} height={sy(0) - sy(0.85)} fill={C.f} fillOpacity={0.4} />
          {/* The balance: extra above 0.75 on the right, the gap below 0.75 on the left. */}
          <rect x={sx(y)} y={sy(0.85)} width={colW(1 - y)} height={sy(0.75) - sy(0.85)} fill={C.good} fillOpacity={0.55} />
          <rect x={sx(0)} y={sy(0.75)} width={colW(y)} height={sy(x) - sy(0.75)} fill={C.bad} fillOpacity={0.18} stroke={C.bad} strokeWidth={1.2} strokeDasharray="4 3" />
          {colW(1 - y) > 44 && (
            <text x={(sx(y) + sx(1)) / 2} y={(sy(0.85) + sy(0.75)) / 2 + 4} fontSize={10.5} fontWeight={700} textAnchor="middle" fill="currentColor">extra</text>
          )}
          {colW(y) > 36 && sy(x) - sy(0.75) > 14 && (
            <text x={(sx(0) + sx(y)) / 2} y={(sy(x) + sy(0.75)) / 2 + 4} fontSize={10.5} fontWeight={700} textAnchor="middle" fill={C.bad}>gap</text>
          )}
          {/* Frame, split and the 0.75 line. */}
          <rect x={X0} y={Y0} width={X1 - X0} height={Y1 - Y0} fill="none" stroke="currentColor" strokeWidth={1.4} />
          <line x1={sx(y)} y1={Y0} x2={sx(y)} y2={Y1} stroke="currentColor" strokeWidth={1.4} />
          <line x1={X0} y1={sy(0.75)} x2={X1} y2={sy(0.75)} stroke={C.bad} strokeWidth={1.8} strokeDasharray="6 4" />
          {/* Heights: x on the left (the after-4 pm column), 0.85 and 0.75 on the right. */}
          <text x={X0 - 5} y={Y0 + 4} fontSize={11} textAnchor="end" fill="currentColor">1</text>
          <text x={X0 - 5} y={Y1 + 4} fontSize={11} textAnchor="end" fill="currentColor">0</text>
          <text x={X0 - 5} y={sy(x) + 4} fontSize={11} fontWeight={700} textAnchor="end" fill={C.g}>{`x = ${x.toFixed(2)}`}</text>
          <text x={X1 + 5} y={sy(0.85) + 1} fontSize={11} fontWeight={700} fill={C.f}>0.85</text>
          <text x={X1 + 5} y={sy(0.75) + 9} fontSize={11} fontWeight={700} fill={C.bad}>0.75</text>
          {/* Column names. */}
          {afterNarrow ? (
            <text x={afterMid} y={Y1 + 13} fontSize={10.5} textAnchor="middle" fill="currentColor">
              <tspan x={afterMid}>after</tspan>
              <tspan x={afterMid} dy={12}>4 pm</tspan>
            </text>
          ) : (
            <text x={afterMid} y={Y1 + 15} fontSize={10.5} textAnchor="middle" fill="currentColor">after 4 pm</text>
          )}
          <text x={beforeMid} y={Y1 + 15} fontSize={10.5} textAnchor="middle" fill="currentColor">before 4 pm</text>
          {/* The split point is y: a number line underneath, with the values y can take. */}
          <line x1={sx(y)} y1={Y1} x2={sx(y)} y2={Y1 + 44} stroke="currentColor" strokeWidth={1} strokeDasharray="3 3" opacity={0.6} />
          <line x1={X0} y1={Y1 + 44} x2={X1} y2={Y1 + 44} stroke="currentColor" strokeWidth={1.2} />
          <line x1={sx(Y_MIN)} y1={Y1 + 44} x2={sx(Y_MAX)} y2={Y1 + 44} stroke={C.good} strokeWidth={5} strokeLinecap="round" opacity={lock ? 0.8 : 0.35} />
          {[0, Y_MIN, Y_MAX, 1].map(v => (
            <line key={v} x1={sx(v)} y1={Y1 + 40} x2={sx(v)} y2={Y1 + 48} stroke="currentColor" strokeWidth={1.2} />
          ))}
          {[
            [0, '0'],
            [Y_MIN, '2/11'],
            [Y_MAX, '2/3'],
            [1, '1'],
          ].map(([v, t]) => (
            <text key={t as string} x={sx(v as number)} y={Y1 + 62} fontSize={10.5} textAnchor="middle" fill="currentColor">{t}</text>
          ))}
          <text x={X0 - 8} y={Y1 + 48} fontSize={12} fontStyle="italic" fontWeight={600} textAnchor="end" fill="currentColor">y</text>
          <circle cx={sx(y)} cy={Y1 + 44} r={4.5} fill={balanced ? C.good : C.g} stroke="white" strokeWidth={1.2} />
        </svg>
      </div>
      <Controls>
        <Slider label="x" value={x} onChange={setX} min={0.3} max={0.7} step={0.01} />
        <Slider
          label="y"
          value={y}
          onChange={v => {
            setLock(false)
            setYFree(v)
          }}
          min={0}
          max={1}
          step={0.005}
          format={v => v.toFixed(3)}
        />
        <Buttons>
          <Toggle
            label="Keep the overall at 0.75"
            checked={lock}
            onChange={on => {
              if (!on) setYFree(y)
              setLock(on)
            }}
          />
        </Buttons>
        <Readouts>
          <Readout color={balanced ? C.good : C.g} tex={`0.85(1-y) + xy \\approx ${overall.toFixed(4)}`} />
          <Readout color={C.good} tex={`\\text{extra } 0.1(1-y) \\approx ${extra.toFixed(4)}`} />
          <Readout color={C.bad} tex={`\\text{gap } (0.75-x)y \\approx ${short.toFixed(4)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
