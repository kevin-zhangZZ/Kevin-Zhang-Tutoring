// 2021 Methods Exam 1 Q6b — Pr(B | G) in terms of g. The box of 20 has 6 glazed doughnuts
// (7/10 of 20 are not glazed). Slide g, the number of glazed in Box A: the two boxes show Box B
// holding the other 6 − g, the tree shows each count divided by the 10 in its box before
// multiplying by ½, and Pr(B | G) = ((6 − g)/20) / (g/20 + (6 − g)/20) = (6 − g)/6 for every g
// from 0 to 6. A toggle shows the report's error: using 6 − g itself as the B-then-glazed
// branch, so that ½(6 − g) is ten times too big (and more than 1 when g ≤ 3).

import { useState } from 'react'
import { Buttons, C, Controls, M, Notice, Readout, Readouts, Slider, Toggle } from './kit'

const GLAZED = 6

/** One doughnut: a thick ring, coloured when glazed, pale grey when not. */
function Ring({ cx, cy, color }: { cx: number; cy: number; color: string | null }) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={8.5}
      fill="none"
      stroke={color ?? C.guide}
      strokeOpacity={color ? 1 : 0.35}
      strokeWidth={6}
    />
  )
}

function Box({ x, name, glazed, color, caption }: { x: number; name: string; glazed: number; color: string; caption: string }) {
  return (
    <g>
      <text x={x + 75} y={14} fontSize={12} fontWeight={700} textAnchor="middle" fill="currentColor">
        {name}
        <tspan dx={6} fontWeight={400} fill={color}>{caption}</tspan>
      </text>
      <rect x={x} y={22} width={150} height={62} rx={8} fill="none" stroke="currentColor" strokeOpacity={0.3} />
      {Array.from({ length: 10 }, (_, i) => (
        <Ring key={i} cx={x + 19 + (i % 5) * 28} cy={i < 5 ? 40 : 66} color={i < glazed ? color : null} />
      ))}
    </g>
  )
}

export default function Glazed() {
  const [g, setG] = useState(2)
  const [wrong, setWrong] = useState(false)
  const b = GLAZED - g
  const wrongJoint = b / 2

  // Tree geometry (viewBox 360 × 150): root, then the box, then glazed / not glazed.
  const root: [number, number] = [14, 76]
  const nodeA: [number, number] = [104, 36]
  const nodeB: [number, number] = [104, 116]
  const leaves = [
    { y: 16, from: nodeA, label: 'G', branch: 'g/10', color: C.g, prod: `½ × ${g}/10 = ${g}/20`, bad: false },
    { y: 56, from: nodeA, label: 'G′', branch: '(10 − g)/10', color: null, prod: '', bad: false },
    {
      y: 96,
      from: nodeB,
      label: 'G',
      branch: wrong ? '6 − g' : '(6 − g)/10',
      color: wrong ? C.bad : C.f,
      prod: wrong ? `½ × ${b} = ${wrongJoint}` : `½ × ${b}/10 = ${b}/20`,
      bad: wrong,
    },
    { y: 136, from: nodeB, label: 'G′', branch: '(4 + g)/10', color: null, prod: '', bad: false },
  ]
  const LX = 196

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        <b>A count is not a probability.</b> Box B holds <M>{`6 - g = ${b}`}</M> glazed doughnuts <i>out of 10</i>, so the
        branch is <M>{`\\tfrac{6-g}{10} = \\tfrac{${b}}{10}`}</M>, not <M>{`${b}`}</M>. Using <M>6 - g</M> gives{' '}
        <M>{`\\tfrac12(6-g) = ${wrongJoint}`}</M>
        {b === 0 ? (
          <>, which only looks right here because both are 0. Move <M>g</M> back down and it is ten times too big.</>
        ) : (
          <>
            , ten times the true <M>{`\\Pr(B\\cap G) = \\tfrac{${b}}{20}`}</M>
            {wrongJoint > 1 ? <>, and more than 1, so it can&apos;t even be a probability.</> : '.'}
          </>
        )}
      </Notice>
    )
  } else if (g === 0) {
    notice = (
      <Notice tone="good">
        With <M>g = 0</M> all six glazed doughnuts are in Box B, so a glazed doughnut must have come from B:{' '}
        <M>{'\\tfrac{6-0}{6} = 1'}</M>. Checking an extreme value like this is a quick way to test an answer in terms of a
        letter. Now slide to <M>g = 6</M>.
      </Notice>
    )
  } else if (g === GLAZED) {
    notice = (
      <Notice tone="good">
        With <M>g = 6</M> every glazed doughnut is in Box A, so a glazed one can&apos;t have come from B:{' '}
        <M>{'\\tfrac{6-6}{6} = 0'}</M>. Now turn on the common error to see what happens if <M>6 - g</M> is used as a
        probability.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        There are only 6 glazed doughnuts in all, so if Box A has <M>{`g = ${g}`}</M> of them, Box B has the other{' '}
        <M>{`6 - g = ${b}`}</M>. Each count becomes a probability only after dividing by the 10 in its box, then the{' '}
        <M>\tfrac12</M> for choosing the box. Both boxes are equally likely and equally full, so given glazed it is one of
        the six glazed doughnuts at random, and <M>{`${b}`}</M> of them are in B. Slide <M>g</M> to <M>0</M> and{' '}
        <M>6</M> to check the formula at the extremes.
      </Notice>
    )
  }

  return (
    <div>
      <div className="text-gray-700 dark:text-gray-300">
        <svg viewBox="0 0 360 160" className="w-full max-w-[440px] mx-auto block" role="img" aria-label={`Box A with ${g} glazed doughnuts and Box B with ${b} glazed doughnuts, ten doughnuts in each box`}>
          <Box x={12} name="Box A" glazed={g} color={C.g} caption={`g = ${g} glazed`} />
          <Box x={198} name="Box B" glazed={b} color={C.f} caption={`6 − g = ${b} glazed`} />
          <text x={180} y={106} fontSize={11.5} textAnchor="middle" fill="currentColor" opacity={0.8}>
            Given glazed, it is one of these six, each equally likely:
          </text>
          {Array.from({ length: GLAZED }, (_, i) => (
            <Ring key={i} cx={110 + i * 28} cy={127} color={i < g ? C.g : C.f} />
          ))}
          <text x={180} y={155} fontSize={11.5} textAnchor="middle" fill="currentColor">
            <tspan fill={C.g} fontWeight={700}>{g}</tspan> from A,{' '}
            <tspan fill={C.f} fontWeight={700}>{b}</tspan> from B
          </text>
        </svg>
        <svg viewBox="0 0 360 152" className="w-full max-w-[440px] mx-auto block mt-3" role="img" aria-label="Tree diagram: choose a box with probability one half each, then glazed or not glazed">
          <line x1={root[0]} y1={root[1]} x2={nodeA[0] - 10} y2={nodeA[1] + 4} stroke={C.g} strokeWidth={2.4} />
          <line x1={root[0]} y1={root[1]} x2={nodeB[0] - 10} y2={nodeB[1] - 4} stroke={wrong ? C.bad : C.f} strokeWidth={2.4} />
          <text x={50} y={48} fontSize={11.5} fontWeight={600} textAnchor="middle" fill="currentColor">½</text>
          <text x={50} y={112} fontSize={11.5} fontWeight={600} textAnchor="middle" fill="currentColor">½</text>
          <circle cx={root[0]} cy={root[1]} r={3} fill="currentColor" />
          <text x={nodeA[0]} y={nodeA[1] + 4} fontSize={12.5} fontWeight={700} textAnchor="middle" fill="currentColor">A</text>
          <text x={nodeB[0]} y={nodeB[1] + 4} fontSize={12.5} fontWeight={700} textAnchor="middle" fill="currentColor">B</text>
          {leaves.map(l => {
            const up = l.y < l.from[1]
            const x1 = l.from[0] + 10
            const y1 = l.from[1] + (up ? -3 : 3)
            const x2 = LX - 10
            const midX = (x1 + x2) / 2
            const midY = (y1 + l.y) / 2
            return (
              <g key={l.y}>
                {l.color && <rect x={LX + 14} y={l.y - 10} width={150} height={20} rx={4} fill={l.color} fillOpacity={0.14} />}
                <line x1={x1} y1={y1} x2={x2} y2={l.y} stroke={l.color ?? C.guide} strokeWidth={l.color ? 2.4 : 1.2} />
                <text
                  x={midX - 8}
                  y={up ? midY - 6 : midY + 20}
                  fontSize={11}
                  fontWeight={600}
                  textAnchor="middle"
                  fill={l.bad ? C.bad : 'currentColor'}
                  opacity={l.color ? 1 : 0.65}
                >
                  {l.branch}
                </text>
                <text x={LX} y={l.y + 4} fontSize={12.5} fontWeight={700} textAnchor="middle" fill="currentColor" opacity={l.color ? 1 : 0.6}>
                  {l.label}
                </text>
                {l.prod && (
                  <text x={LX + 89} y={l.y + 4} fontSize={11.5} fontWeight={700} textAnchor="middle" fill={l.bad ? C.bad : 'currentColor'}>
                    {l.prod}
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      </div>
      <Controls>
        <Slider label="g" value={g} onChange={v => setG(Math.round(v))} min={0} max={GLAZED} step={1} format={v => String(Math.round(v))} />
        <Buttons>
          <Toggle label={<>Common error: <M>6 - g</M> as a probability</>} checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          {wrong ? (
            <>
              <Readout color={C.bad} tex={`\\tfrac12(6-g) = ${wrongJoint}${wrongJoint > 1 ? ' > 1' : ''}\\ \\text{✗}`} />
              <Readout color={C.f} tex={`\\text{true } \\Pr(B\\cap G) = \\tfrac12\\times\\tfrac{6-g}{10} = \\tfrac{${b}}{20}`} />
            </>
          ) : (
            <Readout
              color={C.f}
              tex={`\\Pr(B\\mid G) = \\frac{${b}/20}{${g}/20 + ${b}/20} = \\frac{${b}}{6} = \\frac{6-g}{6}\\ \\checkmark`}
            />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
