// 2017 Specialist Exam 2 Q4f — running the locus |z − a| = |z − b| backwards. Drag a; b is made from a by
// the chosen rule, and the orange line is the perpendicular bisector of a and b (the locus). Only
// b = −4 − ā (a's mirror image in Re(z) = −2) puts that bisector on the line through the two roots
// −2 ± 2√3i for every a. The other rules (−ā, −4 − a, ā) show near-misses failing.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Point, Readout, Readouts, Toggle, tick } from './kit'

type Rule = 'right' | 'negbar' | 'noconj' | 'bar'
const S3 = Math.sqrt(3)
const ROOTS: [number, number][] = [
  [-2, 2 * S3],
  [-2, -2 * S3],
]

const RULES: Record<Rule, { tex: string; label: string; make: (a: [number, number]) => [number, number] }> = {
  right: { tex: 'b = -4 - \\overline{a}', label: 'b = −4 − ā', make: ([x, y]) => [-4 - x, y] },
  negbar: { tex: 'b = -\\overline{a}', label: 'b = −ā', make: ([x, y]) => [-x, y] },
  noconj: { tex: 'b = -4 - a', label: 'b = −4 − a', make: ([x, y]) => [-4 - x, -y] },
  bar: { tex: 'b = \\overline{a}', label: 'b = ā', make: ([x, y]) => [x, -y] },
}

const c = (v: number) => (Math.abs(v) < 0.005 ? '0' : v.toFixed(2))
const cx = ([x, y]: [number, number]) => `${c(x)} ${y < 0 ? '-' : '+'} ${c(Math.abs(y))}i`

export default function Mirror() {
  const [a, setA] = useState<[number, number]>([1, 1.5])
  const [rule, setRule] = useState<Rule>('right')

  const b = RULES[rule].make(a)
  const mid: [number, number] = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
  const ab: [number, number] = [b[0] - a[0], b[1] - a[1]]
  const len = Math.hypot(ab[0], ab[1])
  const degenerate = len < 0.05
  // direction of the bisector: ab turned a quarter turn
  const dir: [number, number] = degenerate ? [0, 1] : [-ab[1] / len, ab[0] / len]
  const offLine = (p: [number, number]) => Math.abs((p[0] - mid[0]) * ab[0] + (p[1] - mid[1]) * ab[1]) / (len || 1)
  const hits = !degenerate && ROOTS.every(p => offLine(p) < 0.08)
  const bisColor = hits ? C.good : C.g

  let notice
  if (degenerate) {
    notice = (
      <Notice tone="warn">
        Here <M>b = a</M>, and <M>|z - a| = |z - a|</M> is true for every <M>z</M>: that&apos;s the whole plane, not a line.
        Drag <M>a</M> off this spot.
      </Notice>
    )
  } else if (rule === 'right') {
    notice = (
      <Notice tone="good">
        The segment from <M>a</M> to <M>b</M> is horizontal and its midpoint is on <M>{'\\operatorname{Re}(z) = -2'}</M>,
        so the bisector lands on the line through both roots. Drag <M>a</M> anywhere and it still works: <M>b</M> is always
        a&apos;s <b>mirror image</b> in that line. Same imaginary part, real parts averaging <M>-2</M>. That is{' '}
        <M>{'b = -4 - \\overline{a}'}</M>. Now try the other rules.
      </Notice>
    )
  } else if (rule === 'negbar') {
    notice = (
      <Notice tone="warn">
        <M>{'-\\overline{a}'}</M> is a&apos;s mirror image in the <b>imaginary axis</b>. The bisector is vertical, but it is{' '}
        <M>{'\\operatorname{Re}(z) = 0'}</M>, not <M>{'\\operatorname{Re}(z) = -2'}</M>. The mirror has to be the line through
        the roots, and shifting it 2 units left is what brings in the <M>-4</M>.
      </Notice>
    )
  } else if (rule === 'noconj') {
    notice = hits ? (
      <Notice tone="warn">
        It works right now only because <M>a</M> is on the real axis, where <M>{'\\overline{a} = a'}</M>. Drag <M>a</M> up
        or down and watch the bisector tilt away from the roots.
      </Notice>
    ) : (
      <Notice tone="warn">
        Without the conjugate, <M>b</M> is <M>a</M> turned half a turn about <M>-2</M>. The midpoint is on the right line,
        but the segment <M>ab</M> isn&apos;t horizontal, so its bisector tilts and misses the roots. Drag <M>a</M> onto the
        real axis: that is the only place this rule works.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        <M>{'\\overline{a}'}</M> is a&apos;s mirror image in the <b>real axis</b>, so the bisector is the real axis itself.
        It is horizontal, but the line through the roots is vertical.
      </Notice>
    )
  }

  const far = 30
  return (
    <div>
      <Plane x={[-7, 4]} y={[-4.5, 4.5]} equalScale xLabel="Re(z)" yLabel="Im(z)" height={360} xLabels={v => (v >= 4 ? "" : tick(v))} yLabels={v => (v >= 4.5 ? "" : tick(v))}>
        <Line.Segment point1={[-2, -20]} point2={[-2, 20]} color={C.guide} style="dashed" weight={2} />
        <Label at={[-2, -2]} color={C.guide} attach="w" gap={8}>Re(z) = −2</Label>
        {!degenerate && (
          <Line.Segment
            point1={[mid[0] - far * dir[0], mid[1] - far * dir[1]]}
            point2={[mid[0] + far * dir[0], mid[1] + far * dir[1]]}
            color={bisColor}
            weight={3}
          />
        )}
        <Line.Segment point1={a} point2={b} color={C.violet} style="dashed" weight={2} />
        <Point x={mid[0]} y={mid[1]} color={C.violet} />
        {ROOTS.map((p, i) => (
          <Point key={i} x={p[0]} y={p[1]} color={C.ink} />
        ))}
        <Label at={ROOTS[0]} color={C.ink} attach="w" gap={8}>root</Label>
        <Label at={ROOTS[1]} color={C.ink} attach="w" gap={8}>root</Label>
        <Point x={b[0]} y={b[1]} color={C.g} />
        <Label at={b} color={C.g} attach="s" gap={10}>b</Label>
        <MovablePoint point={a} onMove={p => setA(p as [number, number])} color={C.f} />
        <Label at={a} color={C.f} attach="n" gap={12}>a</Label>
      </Plane>
      <Controls>
        <Buttons>
          {(Object.keys(RULES) as Rule[]).map(r => (
            <Toggle key={r} label={RULES[r].label} checked={rule === r} onChange={() => setRule(r)} />
          ))}
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`a = ${cx(a)}`} />
          <Readout color={C.g} tex={`${RULES[rule].tex} = ${cx(b)}`} />
          <Readout
            color={hits ? C.good : C.bad}
            tex={hits ? '\\text{bisector passes through both roots}\\ \\checkmark' : '\\text{bisector misses the roots}'}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
