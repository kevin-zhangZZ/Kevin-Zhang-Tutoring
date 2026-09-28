// 2017 Specialist Exam 2 Q4c — "express the roots in terms of 2 − 2√3i". Start from the fixed point
// w = 2 − 2√3i and apply negation (a half-turn about O) and conjugation (a flip in the real axis),
// one press at a time. −w lands on the root −2 + 2√3i and −w̄ on −2 − 2√3i, so the answer is an
// operation on w, not a recomputed number. All four points sit on |z| = 4.

import { useState } from 'react'
import { ActionButton, Buttons, C, Circle, Controls, Label, Line, M, Notice, Plane, Point, Readout, Readouts, tick } from './kit'

type Op = 'neg' | 'conj'
const S3 = Math.sqrt(3)
const W: [number, number] = [2, -2 * S3]

function apply(p: [number, number], op: Op): [number, number] {
  return op === 'neg' ? [-p[0], -p[1]] : [p[0], -p[1]]
}

// z² + 4z + 16 for z = x + yi, as [re, im]
function quad([x, y]: [number, number]): [number, number] {
  return [x * x - y * y + 4 * x + 16, 2 * x * y + 4 * y]
}

const fmt = (v: number) => {
  const r = Math.round(v * 1000) / 1000
  return Math.abs(r) < 1e-9 ? '0' : r.toFixed(2).replace(/\.?0+$/, '')
}
const cx = ([x, y]: [number, number]) => {
  const re = Math.round(x) === x ? String(x) : fmt(x)
  const im = Math.abs(y) < 1e-9 ? '' : `${y < 0 ? ' - ' : ' + '}2\\sqrt3\\,i`
  return `${re}${im}`
}

export default function Symmetries() {
  const [ops, setOps] = useState<Op[]>(['neg'])

  const pts: [number, number][] = [W]
  for (const op of ops) pts.push(apply(pts[pts.length - 1], op))
  const z = pts[pts.length - 1]
  const neg = z[0] * W[0] < 0
  const conj = z[1] * W[1] < 0 !== neg
  const name = `${neg ? '-' : ''}${conj ? '\\overline{w}' : 'w'}`
  const [qr, qi] = quad(z)
  const isRoot = Math.abs(qr) < 1e-6 && Math.abs(qi) < 1e-6
  const trail = pts.slice(-5)
  const trailOps = ops.slice(-(trail.length - 1))

  let notice
  if (!neg && !conj) {
    notice = (
      <Notice>
        <M>{'w = 2 - 2\\sqrt3\\,i'}</M> is in the fourth quadrant, but both roots have real part <M>-2</M>, so they are on
        the left. Press <b>Negate</b>: multiplying by <M>-1</M> turns a point half a turn about <M>O</M>.
      </Notice>
    )
  } else if (neg && !conj) {
    notice = (
      <Notice tone="good">
        <M>{'-w = -2 + 2\\sqrt3\\,i'}</M> is a root. Half a turn about <M>O</M> carries <M>w</M> straight through the
        origin to the root in the second quadrant. The other root is this one&apos;s conjugate, so press{' '}
        <b>Conjugate</b> to flip it in the real axis.
      </Notice>
    )
  } else if (neg && conj) {
    notice = (
      <Notice tone="good">
        <M>{'-\\overline{w} = -2 - 2\\sqrt3\\,i'}</M> is the other root. A real quadratic&apos;s non-real roots come as a
        conjugate pair, so once <M>-w</M> is a root, its mirror image <M>{'-\\overline{w}'}</M> must be too. That is the
        whole of part c: <M>{'z = -w'}</M> and <M>{'z = -\\overline{w}'}</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <M>{'\\overline{w} = 2 + 2\\sqrt3\\,i'}</M> is in the first quadrant: real part <M>+2</M>, so not a root. Flipping
        alone never gets you to the left half of the plane. Press <b>Negate</b> to turn it half a turn onto the
        third-quadrant root.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-5, 5]} y={[-5, 5]} equalScale xLabel="Re(z)" yLabel="Im(z)" height={380} xLabels={v => (v >= 5 ? "" : tick(v))} yLabels={v => (v >= 5 ? "" : tick(v))}>
        <Circle center={[0, 0]} radius={4} color={C.guide} fillOpacity={0} strokeStyle="dashed" weight={1.5} />
        <Label at={[2.83, 2.83]} color={C.guide} attach="ne">|z| = 4</Label>
        {trail.slice(1).map((p, i) => (
          <Line.Segment
            key={i}
            point1={trail[i]}
            point2={p}
            color={trailOps[i] === 'neg' ? C.violet : C.g}
            style="dashed"
            weight={2}
          />
        ))}
        <Circle center={[-2, 2 * S3]} radius={0.28} color={C.good} fillOpacity={0} weight={2.5} />
        <Circle center={[-2, -2 * S3]} radius={0.28} color={C.good} fillOpacity={0} weight={2.5} />
        <Label at={[-2, 2 * S3]} color={C.good} attach="w" gap={12}>root</Label>
        <Label at={[-2, -2 * S3]} color={C.good} attach="w" gap={12}>root</Label>
        <Point x={W[0]} y={W[1]} color={C.f} />
        <Label at={W} color={C.f} attach="e" gap={10}>w</Label>
        <Point x={z[0]} y={z[1]} color={isRoot ? C.good : C.ink} />
        {(neg || conj) && (
          <Label at={z} color={isRoot ? C.good : C.ink} attach={z[1] > 0 ? "n" : "s"} gap={16}>
            {neg ? (conj ? '−w̄' : '−w') : 'w̄'}
          </Label>
        )}
      </Plane>
      <Controls>
        <Buttons>
          <ActionButton label="Negate: −z (half-turn about O)" onClick={() => setOps([...ops, 'neg'])} />
          <ActionButton label="Conjugate: z̄ (flip in the real axis)" onClick={() => setOps([...ops, 'conj'])} />
          <ActionButton label="Start again from w" onClick={() => setOps([])} />
        </Buttons>
        <Readouts>
          <Readout color={isRoot ? C.good : C.ink} tex={`z = ${name} = ${cx(z)}`} />
          <Readout
            color={isRoot ? C.good : C.bad}
            tex={
              isRoot
                ? 'z^2 + 4z + 16 = 0\\ \\checkmark'
                : `z^2 + 4z + 16 = ${fmt(qr)} ${qi < 0 ? '-' : '+'} ${fmt(Math.abs(qi) / S3)}\\sqrt3\\,i \\ne 0`
            }
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
