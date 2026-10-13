// 2014 Methods Exam 2 MCQ 22 — "at least one hit" is what the misses leave over. Each bar is the
// whole probability, 1; step through the throws and each new throw can only hit inside the grey
// "no hit yet" part. John's throws add 1/4, 3/16, 9/64, 27/256 (not 1/4 each time), reaching
// 1 − (3/4)^4 = 175/256 ≈ 0.68; Rebecca's add 1/2, 1/4, reaching 3/4 = 192/256. Ratio 192:175
// (option E). Step 1 shows the single-throw 2:1 (option D); the last step shows why 4 × 1/4 = 1
// (the expected number of hits, behind option A's 1:1) is not a probability.

import { C, Controls, Label, M, Notice, Plane, Polygon, Readout, Readouts, StepNav, useSteps } from './kit'

type Seg = { from: number; to: number; throwNo: number }

function segments(q: number, throws: number): { hits: Seg[]; noHit: number } {
  const hits: Seg[] = []
  let done = 0
  let left = 1
  for (let i = 1; i <= throws; i++) {
    const h = left * q
    hits.push({ from: done, to: done + h, throwNo: i })
    done += h
    left -= h
  }
  return { hits, noHit: left }
}

const JOHN = ['0', '\\tfrac14', '\\tfrac{7}{16}', '\\tfrac{37}{64}', '\\tfrac{175}{256}']
const REB = ['0', '\\tfrac12', '\\tfrac34', '\\tfrac34', '\\tfrac34']

function Bar({ y, q, throws, color }: { y: number; q: number; throws: number; color: string }) {
  const { hits } = segments(q, throws)
  const h = 0.5
  return (
    <>
      <Polygon points={[[0, y], [1, y], [1, y + h], [0, y + h]]} color={C.guide} fillOpacity={0.25} weight={1.5} />
      {hits.map(s => (
        <g key={s.throwNo}>
          <Polygon
            points={[[s.from, y], [s.to, y], [s.to, y + h], [s.from, y + h]]}
            color={color}
            fillOpacity={s.throwNo % 2 ? 0.55 : 0.3}
            weight={1.5}
          />
          {s.to - s.from > 0.06 && (
            <Label at={[(s.from + s.to) / 2, y + h / 2]} attach="c" size={12} color={C.ink}>
              {s.throwNo}
            </Label>
          )}
        </g>
      ))}
    </>
  )
}

export default function DartsBars() {
  const steps = useSteps(4)
  const k = steps.step + 1
  const kR = Math.min(k, 2)
  const john = 1 - (3 / 4) ** k
  const reb = 1 - (1 / 2) ** kR

  const notices = [
    null,
    <Notice key={1}>
      Each bar is the whole probability, <M>1</M>; grey means &ldquo;no bullseye yet&rdquo;. After one throw each: John{' '}
      <M>{'\\tfrac14'}</M>, Rebecca <M>{'\\tfrac12'}</M>. That <M>2:1</M> is option D, but it compares single throws, and
      nobody has finished yet. Each numbered block is the chance that the <em>first</em> bullseye comes on that
      throw. Press Next.
    </Notice>,
    <Notice key={2}>
      Rebecca is finished: <M>{'\\tfrac12 + \\tfrac14 = \\tfrac34'}</M>. Her second throw only counts if her first missed,
      so it adds <M>{'\\tfrac12'}</M> of the grey <M>{'\\tfrac12'}</M>. Likewise John&apos;s second throw adds{' '}
      <M>{'\\tfrac14 \\times \\tfrac34 = \\tfrac{3}{16}'}</M>, not another <M>{'\\tfrac14'}</M>.
    </Notice>,
    <Notice key={3}>
      John&apos;s third throw adds <M>{'\\tfrac14 \\times \\tfrac{9}{16} = \\tfrac{9}{64}'}</M>. Each block is smaller
      than the last, because there is less grey left to hit in. John&apos;s grey is always{' '}
      <M>{'\\left(\\tfrac34\\right)^{k}'}</M> after <M>k</M> throws (Rebecca&apos;s is{' '}
      <M>{'\\left(\\tfrac12\\right)^{k}'}</M>).
    </Notice>,
    <Notice key={4} tone="good">
      <b>All throws done.</b> John&apos;s grey is <M>{'\\left(\\tfrac34\\right)^4 = \\tfrac{81}{256}'}</M>, so{' '}
      <M>{'\\Pr(J \\ge 1) = \\tfrac{175}{256}'}</M>, and <M>{'\\Pr(R \\ge 1) = \\tfrac34 = \\tfrac{192}{256}'}</M>: the ratio
      is <M>192:175</M> (option E). Adding <M>{'4 \\times \\tfrac14 = 1'}</M> would fill John&apos;s whole bar: that is
      his expected number of hits (and Rebecca&apos;s is also <M>1</M>, option A&apos;s <M>1:1</M>), not a probability.
    </Notice>,
  ]

  return (
    <div>
      <Plane x={[0, 1]} y={[-0.1, 2.05]} xStep={0.25} yStep={10} height={220} yLabels={false} xLabel="" yLabel="">
        <Label at={[0, 1.8]} attach="ne" size={12} color={C.ink}>John: 4 throws, 1/4 each</Label>
        <Bar y={1.3} q={1 / 4} throws={k} color={C.f} />
        <Label at={[0, 0.8]} attach="ne" size={12} color={C.ink}>Rebecca: 2 throws, 1/2 each</Label>
        <Bar y={0.3} q={1 / 2} throws={kR} color={C.g} />
      </Plane>
      <Controls>
        <StepNav step={steps.step} count={4} onBack={steps.back} onNext={steps.next} />
        <Readouts>
          <Readout tex={`\\Pr(\\text{John} \\ge 1) = ${JOHN[k]} \\approx ${john.toFixed(2)}`} color={C.f} />
          <Readout tex={`\\Pr(\\text{Rebecca} \\ge 1) = ${REB[k]} = ${reb.toFixed(2)}`} color={C.g} />
        </Readouts>
        {notices[k]}
      </Controls>
    </div>
  )
}
