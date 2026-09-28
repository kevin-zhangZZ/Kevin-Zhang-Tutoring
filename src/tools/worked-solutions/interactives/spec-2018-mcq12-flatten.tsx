// 2018 Specialist Exam 2 MCQ 12 — why |a + b| = |a| + |b| forces a and b to point the same way. Place
// b head-to-tail after a (|a| = 3 fixed): a, b and a + b form a triangle, and one side is always
// shorter than the other two together, so |a + b| < |a| + |b| until the triangle flattens at θ = 0.
// The dashed arc of radius |a| + |b| is the farthest two steps can reach, touched only at θ = 0. The
// checklist ticks which options are true in the current picture: whenever the equation holds, A is
// ticked, while B and C are ticked only when |b| = 3 as well — "necessarily true" means every case.
// θ = 180° shows parallel-but-opposite failing (A is necessary, not sufficient); θ = 90° is Pythagoras;
// |b| = 3 at any other angle shows equal lengths (B) without the equation.

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Slider, Vector } from './kit'

const A_LEN = 3

type Case = { label: string; th: number; b: number }
const CASES: Case[] = [
  { label: 'same way', th: 0, b: 2 },
  { label: 'a = b', th: 0, b: 3 },
  { label: '|a| = |b|', th: 60, b: 3 },
  { label: 'perpendicular', th: 90, b: 2 },
  { label: 'opposite way', th: 180, b: 2 },
  { label: 'a = −b', th: 180, b: 3 },
]

function Chip({ letter, text, ok }: { letter: string; text: string; ok: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[12px] ${
        ok
          ? 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200'
          : 'border-gray-200 bg-white text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400'
      }`}
    >
      <b>{letter}</b>
      <M>{text}</M>
      <span aria-hidden="true">{ok ? '✓' : '✗'}</span>
    </span>
  )
}

export default function Flatten() {
  const [th, setTh] = useState(50)
  const [bl, setBl] = useState(2)

  const t = (th * Math.PI) / 180
  const P: [number, number] = [A_LEN, 0]
  const Q: [number, number] = [A_LEN + bl * Math.cos(t), bl * Math.sin(t)]
  const sum = A_LEN + bl
  const res = Math.hypot(Q[0], Q[1])
  const equal = th === 0
  const same = Math.abs(bl - A_LEN) < 0.05
  const zero = res < 0.05

  const parallel = th === 0 || th === 180
  const checks = [
    { letter: 'A', text: '\\text{parallel}', ok: parallel },
    { letter: 'B', text: '|\\underset{\\sim}{a}|=|\\underset{\\sim}{b}|', ok: same },
    { letter: 'C', text: '\\underset{\\sim}{a}=\\underset{\\sim}{b}', ok: same && th === 0 },
    { letter: 'D', text: '\\underset{\\sim}{a}=-\\underset{\\sim}{b}', ok: same && th === 180 },
    { letter: 'E', text: '\\text{perpendicular}', ok: th === 90 },
  ]

  let notice
  if (equal && !same) {
    notice = (
      <Notice tone="good">
        The triangle has flattened: <M>{'\\underset{\\sim}{b}'}</M> carries straight on in{' '}
        <M>{'\\underset{\\sim}{a}'}</M>&apos;s direction, so <M>{'|\\underset{\\sim}{a}+\\underset{\\sim}{b}|'}</M> is
        exactly <M>{'3+|\\underset{\\sim}{b}|'}</M>. The equation holds, yet the lengths differ and{' '}
        <M>{'\\underset{\\sim}{a}\\ne\\underset{\\sim}{b}'}</M>, so B and C are not forced. Only A is ticked. Tap
        &ldquo;a = b&rdquo; next.
      </Notice>
    )
  } else if (equal) {
    notice = (
      <Notice tone="good">
        <M>{'\\underset{\\sim}{a}=\\underset{\\sim}{b}'}</M> is <em>one</em> case where the equation holds, so C can be
        true. Now drag <M>{'|\\underset{\\sim}{b}|'}</M> away from <M>3</M>: the equation still holds but C (and B)
        fail. &ldquo;Necessarily true&rdquo; means true in every case where the equation holds, and only A is.
      </Notice>
    )
  } else if (th === 180) {
    notice = (
      <Notice tone="warn">
        Parallel, but pointing opposite ways: <M>{'\\underset{\\sim}{b}'}</M> walks back over{' '}
        <M>{'\\underset{\\sim}{a}'}</M>, so <M>{'|\\underset{\\sim}{a}+\\underset{\\sim}{b}|=|3-|\\underset{\\sim}{b}||'}</M>,
        far short of the sum. So &ldquo;parallel&rdquo; alone does not make the equation hold. That is fine: the question
        asks what must follow <em>from</em> it, not what guarantees it.
        {same && <> With <M>{'|\\underset{\\sim}{b}|=3'}</M> this is D, and <M>{'\\underset{\\sim}{a}+\\underset{\\sim}{b}=\\underset{\\sim}{0}'}</M>.</>}
      </Notice>
    )
  } else if (th === 90) {
    notice = (
      <Notice tone="warn">
        Perpendicular: Pythagoras gives <M>{`|\\underset{\\sim}{a}+\\underset{\\sim}{b}|=\\sqrt{9+|\\underset{\\sim}{b}|^2}`}</M>,
        shorter than <M>{'3+|\\underset{\\sim}{b}|'}</M>. The squared version,{' '}
        <M>{'|\\underset{\\sim}{a}+\\underset{\\sim}{b}|^2=|\\underset{\\sim}{a}|^2+|\\underset{\\sim}{b}|^2'}</M>, is the
        perpendicular condition, not the one in the question.
      </Notice>
    )
  } else if (same) {
    notice = (
      <Notice tone="warn">
        Equal lengths, so B is true here, yet <M>{'|\\underset{\\sim}{a}+\\underset{\\sim}{b}|'}</M> still falls
        short of <M>6</M>: equal lengths don&apos;t make the equation hold. And &ldquo;same way&rdquo; shows the
        equation holding with <em>unequal</em> lengths, so the equation doesn&apos;t force B either.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>{'\\underset{\\sim}{a}'}</M>, <M>{'\\underset{\\sim}{b}'}</M> and{' '}
        <M>{'\\underset{\\sim}{a}+\\underset{\\sim}{b}'}</M> form a triangle, and one side of a triangle is always
        shorter than the other two together, so the tip never reaches the dashed arc of radius{' '}
        <M>{'|\\underset{\\sim}{a}|+|\\underset{\\sim}{b}|'}</M>. The gap closes only when the triangle flattens, with{' '}
        <M>{'\\underset{\\sim}{b}'}</M> pointing the same way as <M>{'\\underset{\\sim}{a}'}</M>. Slide{' '}
        <M>{'\\theta'}</M> to <M>{'0^\\circ'}</M>.
      </Notice>
    )
  }

  const arcTop = Math.min(Math.PI / 2, Math.asin(Math.min(1, 4.2 / sum)))
  const bMid: [number, number] = [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2]

  return (
    <div>
      <div className="mx-auto max-w-[600px]">
      <Plane x={[-1.2, 8.6]} y={[-0.6, 4.3]} equalScale height={340} labels={false} xLabel="" yLabel="">
        <Plot.Parametric
          xy={s => [sum * Math.cos(s), sum * Math.sin(s)]}
          domain={[-0.08, arcTop]}
          color={C.guide}
          style="dashed"
          weight={1.5}
        />
        <Label at={[sum * Math.cos(0.3), sum * Math.sin(0.3)]} attach="e" color={C.guide} bold={false} size={12}>
          |a| + |b|
        </Label>
        {zero ? (
          <Point x={0} y={0} color={C.violet} />
        ) : (
          <Vector tail={[0, 0]} tip={Q} color={equal ? C.good : C.violet} weight={equal ? 5 : 3} />
        )}
        <Vector tail={[0, 0]} tip={P} color={C.f} weight={3} />
        <Vector tail={P} tip={Q} color={C.g} weight={3} />
        <Line.Segment point1={P} point2={[A_LEN + 0.9, 0]} color={C.f} style="dashed" weight={1} opacity={th === 0 ? 0 : 0.6} />
        <Label at={[A_LEN / 2, 0]} attach="s" color={C.f}>
          a
        </Label>
        <Label at={bMid} attach={th === 0 || th === 180 ? 's' : th < 90 ? 'se' : 'e'} color={C.g}>
          b
        </Label>
        <Label at={zero ? [0, 0] : [Q[0] / 2, Q[1] / 2]} attach="nw" color={equal ? C.good : C.violet}>
          {zero ? 'a + b = 0' : 'a + b'}
        </Label>
      </Plane>
      </div>
      <Controls>
        <Slider label="\theta" value={th} onChange={setTh} min={0} max={180} step={1} format={v => `${v}°`} />
        <Slider label="|\underset{\sim}{b}|" value={bl} onChange={setBl} min={1} max={4} step={0.1} format={v => v.toFixed(1)} />
        <Buttons>
          {CASES.map(c => (
            <ActionButton
              key={c.label}
              label={c.label}
              onClick={() => {
                setTh(c.th)
                setBl(c.b)
              }}
            />
          ))}
        </Buttons>
        <Readouts>
          <Readout color={C.guide} tex={`|\\underset{\\sim}{a}|+|\\underset{\\sim}{b}|=${sum.toFixed(2)}`} />
          <Readout
            color={equal ? C.good : C.violet}
            tex={`|\\underset{\\sim}{a}+\\underset{\\sim}{b}|=${res.toFixed(2)}\\ ${equal ? '\\checkmark' : `\\ (\\text{short by } ${(sum - res).toFixed(2)})`}`}
          />
        </Readouts>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[12px] text-gray-500 dark:text-gray-400">True in this picture:</span>
          {checks.map(c => (
            <Chip key={c.letter} {...c} />
          ))}
        </div>
        {notice}
      </Controls>
    </div>
  )
}
