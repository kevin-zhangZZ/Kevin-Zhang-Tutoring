// 2023 Specialist Exam 2 Q2f.ii — how 1 + w + w² + … + w⁶ = 0 (seven complex numbers) turns into
// a sum of three cosines. Step through: the seven powers of w = cis(2π/7) on the unit circle; then
// each power paired with its conjugate (w with w⁶, w² with w⁵, w³ with w⁴), whose imaginary parts
// cancel so each pair adds to a real number 2cos(2kπ/7); then the three pair sums laid end to end
// reach −1, and the unpaired root 1 brings the total back to 0. Every value from cis(2kπ/7).

import { C, Circle, Controls, Label, Line, M, Notice, Plane, Point, Readout, Readouts, StepNav, Vector, useSteps, type Attach } from './kit'

const SUP = ['', '', '²', '³', '⁴', '⁵', '⁶']
const NAME = (k: number) => (k === 0 ? '1' : `w${SUP[k]}`)
const ROOT = (k: number): [number, number] => [Math.cos((2 * k * Math.PI) / 7), Math.sin((2 * k * Math.PI) / 7)]
const PAIRS = [
  { k: 1, color: C.f },
  { k: 2, color: C.g },
  { k: 3, color: C.violet },
] as const
const SUM = (k: number) => 2 * Math.cos((2 * k * Math.PI) / 7)
// Each root's label sits just outside the circle on its own side, a fixed few px from the dot
// (1 sits below-left, clear of the w + w⁶ arrowhead at 1.247).
const ROOT_ATTACH: Attach[] = ['sw', 'ne', 'n', 'w', 'w', 's', 'se']
const STEPS = 5

const PAIR_TEX = [
  '',
  'w + w^6 = 2\\cos\\tfrac{2\\pi}{7} \\approx 1.247',
  'w^2 + w^5 = 2\\cos\\tfrac{4\\pi}{7} \\approx -0.445',
  'w^3 + w^4 = 2\\cos\\tfrac{6\\pi}{7} \\approx -1.802',
]

export default function ConjugatePairs() {
  const s = useSteps(STEPS)
  const step = s.step
  const chain = step === STEPS - 1

  // The head-to-tail chain on the last step: each pair sum, then the root 1.
  const s1 = SUM(1)
  const s2 = s1 + SUM(2)
  const s3 = s2 + SUM(3)
  // The short w² + w⁵ arrow's label sits up-left of its tip, clear of the dashed guide at s1.
  const ARROWS: { from: number; to: number; y: number; color: string; text: string; lx?: number; la?: Attach }[] = [
    { from: 0, to: s1, y: 0.95, color: C.f, text: 'w + w⁶' },
    { from: s1, to: s2, y: 0.6, color: C.g, text: 'w² + w⁵', lx: s2, la: 'nw' },
    { from: s2, to: s3, y: 0.25, color: C.violet, text: 'w³ + w⁴' },
    { from: s3, to: s3 + 1, y: -0.35, color: C.good, text: '1' },
  ]

  const notices = [
    <Notice key={0}>
      Since <M>w \ne 1</M>, the given equation says <M>{'1 + w + w^2 + \\cdots + w^6 = 0'}</M>. De Moivre turns each power
      into a point: <M>{'w^k = \\mathrm{cis}\\left(\\tfrac{2k\\pi}{7}\\right)'}</M>, seven points evenly spaced round the
      circle. They are complex numbers, so where do cosines come from? Press Next to pair them up.
    </Notice>,
    <Notice key={1}>
      <M>{'w^6 = \\mathrm{cis}\\left(\\tfrac{12\\pi}{7}\\right) = \\mathrm{cis}\\left(-\\tfrac{2\\pi}{7}\\right)'}</M> is
      the reflection of <M>w</M> in the real axis: its conjugate. Added as vectors (the dashed parallelogram), the
      imaginary parts cancel and the sum lands on the real axis at <M>{'2\\cos\\tfrac{2\\pi}{7}'}</M>. That is part f.i.
    </Notice>,
    <Notice key={2}>
      <M>w^2</M> and{' '}
      <M>{'w^5 = \\mathrm{cis}\\left(\\tfrac{10\\pi}{7}\\right) = \\mathrm{cis}\\left(-\\tfrac{4\\pi}{7}\\right)'}</M> are
      the next mirror pair, so they add to <M>{'2\\cos\\tfrac{4\\pi}{7}'}</M>. It is negative because{' '}
      <M>{'\\tfrac{4\\pi}{7} > \\tfrac{\\pi}{2}'}</M>.
    </Notice>,
    <Notice key={3}>
      The last pair, <M>w^3</M> and <M>{'w^4 = \\mathrm{cis}\\left(-\\tfrac{6\\pi}{7}\\right)'}</M>, adds to{' '}
      <M>{'2\\cos\\tfrac{6\\pi}{7}'}</M>. Only the root <M>1</M> is left unpaired, because it is its own conjugate.
      Press Next to add everything up.
    </Notice>,
    <Notice key={4} tone="good">
      Laid end to end, the three pair sums reach <M>-1</M>, and the root <M>1</M> brings the total back to{' '}
      <M>0</M>, just as <M>{'1 + w + \\cdots + w^6 = 0'}</M> says. So{' '}
      <M>{'2\\cos\\tfrac{2\\pi}{7} + 2\\cos\\tfrac{4\\pi}{7} + 2\\cos\\tfrac{6\\pi}{7} = -1'}</M>; divide by 2. Each of
      these moves is a line the &lsquo;show that&rsquo; needs written down.
    </Notice>,
  ]

  return (
    <div>
      <Plane x={[-2.05, 1.6]} y={[-1.2, 1.2]} xStep={1} yStep={1} equalScale height={380} labels={false} xLabel="" yLabel="">
        {!chain && <Circle center={[0, 0]} radius={1} color={C.guide} fillOpacity={0} weight={1.5} />}
        {!chain &&
          PAIRS.filter(p => p.k <= step).map(p => {
            const active = p.k === step
            const a = ROOT(p.k)
            const b = ROOT(7 - p.k)
            const tip: [number, number] = [SUM(p.k), 0]
            return (
              <g key={p.k} opacity={active ? 1 : 0.35}>
                <Vector tail={[0, 0]} tip={a} color={p.color} weight={2} />
                <Vector tail={[0, 0]} tip={b} color={p.color} weight={2} />
                {active && <Line.Segment point1={a} point2={tip} color={p.color} style="dashed" weight={1.5} />}
                {active && <Line.Segment point1={b} point2={tip} color={p.color} style="dashed" weight={1.5} />}
                <Vector tail={[0, 0]} tip={tip} color={p.color} weight={4} />
              </g>
            )
          })}
        {chain && (
          <>
            {ARROWS.map(a => (
              <g key={a.y}>
                <Vector tail={[a.from, a.y]} tip={[a.to, a.y]} color={a.color} weight={2.5} />
                <Label at={[a.lx ?? (a.from + a.to) / 2, a.y]} attach={a.la ?? (a.y < 0 ? 's' : 'n')} color={a.color} size={13} gap={5} italic={a.y > 0}>
                  {a.text}
                </Label>
              </g>
            ))}
            {ARROWS.slice(1).map((a, i) => (
              <Line.Segment key={i} point1={[a.from, ARROWS[i].y]} point2={[a.from, a.y]} color={C.guide} style="dashed" weight={1} />
            ))}
            <Point x={s3} y={0} color={C.violet} />
            <Label at={[s3, 0]} attach="nw" size={13} color={C.violet}>
              −1
            </Label>
            <Point x={0} y={0} color={C.good} />
            <Label at={[0, 0]} attach="se" size={13} color={C.good}>
              total 0
            </Label>
          </>
        )}
        {!chain && [0, 1, 2, 3, 4, 5, 6].map(k => {
          const pair = PAIRS.find(p => p.k === k || p.k === 7 - k)
          const lit = !chain && pair !== undefined && pair.k === step
          const color = k === 0 ? C.good : lit ? pair!.color : C.ink
          const [x, y] = ROOT(k)
          return (
            <g key={k}>
              <Point x={x} y={y} color={color} />
              <Label at={[x, y]} attach={ROOT_ATTACH[k]} gap={8} size={16} color={color} italic={k > 0}>
                {NAME(k)}
              </Label>
            </g>
          )
        })}
      </Plane>
      <Controls>
        <StepNav step={step} count={STEPS} onBack={s.back} onNext={s.next} />
        <Readouts>
          {step === 0 && <Readout tex="1 + w + w^2 + w^3 + w^4 + w^5 + w^6 = 0" />}
          {step > 0 && !chain && PAIRS.filter(p => p.k <= step).map(p => <Readout key={p.k} color={p.color} tex={PAIR_TEX[p.k]} />)}
          {chain && (
            <Readout color={C.violet} tex={`${SUM(1).toFixed(3)} - ${(-SUM(2)).toFixed(3)} - ${(-SUM(3)).toFixed(3)} = ${s3.toFixed(3)}`} />
          )}
          {chain && <Readout color={C.good} tex="-1 + 1 = 0\ \checkmark" />}
        </Readouts>
        {notices[step]}
      </Controls>
    </div>
  )
}
