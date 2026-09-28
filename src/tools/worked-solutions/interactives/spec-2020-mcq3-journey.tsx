// 2020 Specialist Exam 2 MCQ 3 — draw the journey first. The v–t graph of the story is a
// trapezium: up from rest to 10 m s⁻¹ in 30 s, flat for 200 s (brackets show 30 s | 200 s | 30 s,
// so the flat piece ends at t = 30 + 200 = 230), down to 0 at t = 260. A time cursor (slider or
// "Run the journey") lights up the active piece and gives its rule: t/3, 10, (260 − t)/3. Any
// option can be laid over the journey: A sits on it exactly; B's last piece (230 − t)/3 is the
// right gradient through the wrong point (230, 0), so it goes negative, reaching −10 at t = 260;
// C and D use 3t (gradient 30/10), 90 m s⁻¹ at t = 30; E ends the cruise at 200 and stops the train
// at 230. All pieces are the options' own rules, drawn as straight segments.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, PlayButton, Point, Readout, Readouts, Slider, num, usePlayer } from './kit'

type Piece = { from: number; to: number; v: (t: number) => number }
const third = (t: number) => t / 3
const ten = () => 10

const OPTIONS: Record<string, Piece[]> = {
  A: [{ from: 0, to: 30, v: third }, { from: 30, to: 230, v: ten }, { from: 230, to: 260, v: t => (260 - t) / 3 }],
  B: [{ from: 0, to: 30, v: third }, { from: 30, to: 230, v: ten }, { from: 230, to: 260, v: t => (230 - t) / 3 }],
  C: [{ from: 0, to: 30, v: t => 3 * t }, { from: 30, to: 230, v: ten }, { from: 230, to: 260, v: t => 3 * (230 - t) }],
  D: [{ from: 0, to: 30, v: t => 3 * t }, { from: 30, to: 230, v: ten }, { from: 230, to: 260, v: t => 3 * (260 - t) }],
  E: [{ from: 0, to: 30, v: third }, { from: 30, to: 200, v: ten }, { from: 200, to: 230, v: t => (230 - t) / 3 }],
}
const JOURNEY = OPTIONS.A
const RULES = ['v = \\tfrac13 t', 'v = 10', 'v = \\tfrac13(260 - t)']

/** Value of a piecewise rule at t (first piece closed at both ends, later ones open on the left). */
function valueAt(pieces: Piece[], t: number): number | null {
  for (let i = 0; i < pieces.length; i++) {
    const p = pieces[i]
    if ((i === 0 ? t >= p.from : t > p.from) && t <= p.to) return p.v(t)
  }
  return null
}

const Y0 = -12
const Y1 = 15
const BRACE = 13

function Brace({ from, to, text }: { from: number; to: number; text: string }) {
  return (
    <>
      <Line.Segment point1={[from, BRACE]} point2={[to, BRACE]} color={C.guide} weight={1.5} />
      <Line.Segment point1={[from, BRACE - 0.6]} point2={[from, BRACE + 0.6]} color={C.guide} weight={1.5} />
      <Line.Segment point1={[to, BRACE - 0.6]} point2={[to, BRACE + 0.6]} color={C.guide} weight={1.5} />
      <Label at={[(from + to) / 2, BRACE]} attach="n" size={12} gap={5}>{text}</Label>
    </>
  )
}

/** Pick one option to lay over the journey (or none) — a neutral segmented control, so the
 *  selected button doesn't look "correct". */
function OptionPicker({ value, onChange }: { value: string | null; onChange: (v: string | null) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="text-[12px] text-gray-500 dark:text-gray-400 mr-1">Lay an option over the journey:</span>
      {Object.keys(OPTIONS).map(letter => {
        const on = value === letter
        return (
          <button
            key={letter}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(on ? null : letter)}
            className={`w-9 text-[12.5px] font-semibold py-1.5 rounded-full border transition-colors ${
              on
                ? 'bg-gray-900 border-gray-900 text-white dark:bg-white dark:border-white dark:text-gray-900'
                : 'bg-white border-gray-300 text-gray-600 hover:border-gray-400 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300'
            }`}
          >
            {letter}
          </button>
        )
      })}
    </div>
  )
}

export default function Journey() {
  const [t, setT] = useState(245)
  const [opt, setOpt] = useState<string | null>(null)
  const player = usePlayer(setT, { min: 0, max: 260, seconds: 10 })

  const phase = t <= 30 ? 0 : t <= 230 ? 1 : 2
  const v = valueAt(JOURNEY, t) ?? 0
  const pieces = opt ? OPTIONS[opt] : null
  const vOpt = pieces ? valueAt(pieces, t) : null
  const optColor = opt === 'A' ? C.good : C.g
  const xMarks = opt === 'E' ? [30, 200, 230, 260] : [30, 230, 260]

  let notice
  if (opt === 'A') {
    notice = (
      <Notice tone="good">
        <b>Option A sits exactly on the journey</b>, piece by piece. Its pieces also join up where they meet:{' '}
        <M>{'\\tfrac13(30) = 10'}</M> at <M>t = 30</M> and <M>{'\\tfrac13(260 - 230) = 10'}</M> at <M>t = 230</M>, as a
        real velocity must (a train can&apos;t change speed instantly). Try B to see the popular wrong answer.
      </Notice>
    )
  } else if (opt === 'B') {
    notice = (
      <Notice tone="warn">
        <b>Option B</b> agrees until <M>t = 230</M>. Then its last piece <M>{'\\tfrac13(230 - t)'}</M> starts at 0, when the
        train is still doing 10&nbsp;m&nbsp;s⁻¹, and goes <i>negative</i>: at <M>t = 260</M> it gives <M>-10</M>&nbsp;m&nbsp;s⁻¹, the train reversing
        at full speed. It is the right gradient, <M>{'-\\tfrac13'}</M>, through the wrong point, <M>(230, 0)</M> instead of{' '}
        <M>(230, 10)</M>. The bracket must be <M>260 - t</M>, so that <M>v = 0</M> at <M>t = 260</M>, when the train stops.
      </Notice>
    )
  } else if (opt === 'C' || opt === 'D') {
    notice = (
      <Notice tone="warn">
        <b>Option {opt}</b> starts with <M>v = 3t</M>: the gradient <M>{'\\tfrac{30}{10}'}</M>, upside down. At <M>t = 30</M> that
        gives 90&nbsp;m&nbsp;s⁻¹, not 10, so the graph shoots off the top and would have to drop from 90 to 10 in an instant. Gradient
        is <b>rise over run</b>: 10&nbsp;m&nbsp;s⁻¹ gained over 30 s is <M>{'\\tfrac{10}{30} = \\tfrac13'}</M>.{' '}
        {opt === 'C' ? (
          <>C&apos;s last piece <M>3(230 - t)</M> is zero at the wrong end as well.</>
        ) : (
          <>D&apos;s last piece <M>3(260 - t)</M> does end at 0, but it starts at 90.</>
        )}
      </Notice>
    )
  } else if (opt === 'E') {
    notice = (
      <Notice tone="warn">
        <b>Option E</b> ends the cruise at <M>t = 200</M>. But 200 s is <i>how long</i> the cruise lasts (the middle bracket),
        not when it ends: it starts at <M>t = 30</M>, so it ends at <M>30 + 200 = 230</M>. E&apos;s train stops at{' '}
        <M>t = 230</M>, 30 s early, and E gives no velocity at all for <M>{'230 < t \\le 260'}</M>.
      </Notice>
    )
  } else if (phase === 0) {
    notice = (
      <Notice>
        <b>Phase 1, <M>{'0 \\le t \\le 30'}</M>:</b> constant acceleration from rest is a straight line from the origin. It rises
        10&nbsp;m&nbsp;s⁻¹ in 30 s, so the gradient is <M>{'\\tfrac{10}{30} = \\tfrac13'}</M> and <M>{'v = \\tfrac13 t'}</M>. Now pick an option
        to lay over the journey.
      </Notice>
    )
  } else if (phase === 1) {
    notice = (
      <Notice>
        <b>Phase 2:</b> cruising at a constant 10&nbsp;m&nbsp;s⁻¹, so <M>v = 10</M>. The 200 in the question is a <i>duration</i> (the
        middle bracket): the cruise starts at <M>t = 30</M>, so it ends at <M>t = 30 + 200 = 230</M>, not at 200.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <b>Phase 3, <M>{'230 < t \\le 260'}</M>:</b> constant deceleration is a straight line from <M>(230, 10)</M> down to{' '}
        <M>(260, 0)</M>, with gradient <M>{'\\tfrac{0 - 10}{260 - 230} = -\\tfrac13'}</M>. It must be zero at <M>t = 260</M>,
        so <M>{'v = \\tfrac13(260 - t)'}</M>. Check the other end: <M>{'\\tfrac13(260 - 230) = 10'}</M>. Now lay option B over
        the journey: 20% of students chose it.
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[0, 275]}
        y={[Y0, Y1]}
        xStep={10}
        yStep={2}
        height={320}
        xLabel="t"
        yLabel="v"
        xLabels={x => (xMarks.includes(Math.round(x)) ? String(Math.round(x)) : '')}
        yLabels={y => (Math.abs(Math.abs(y) - 10) < 1e-9 ? String(y).replace('-', '−') : '')}
      >
        <Brace from={0} to={30} text="30 s" />
        <Brace from={30} to={230} text="200 s" />
        <Brace from={230} to={260} text="30 s" />
        {JOURNEY.map((p, i) => (
          <Line.Segment
            key={i}
            point1={[p.from, p.v(p.from)]}
            point2={[p.to, p.v(p.to)]}
            color={C.f}
            weight={i === phase ? 6 : 3}
          />
        ))}
        {pieces &&
          pieces.map((p, i) => (
            <Line.Segment
              key={`o${i}`}
              point1={[p.from, p.v(p.from)]}
              point2={[p.to, p.v(p.to)]}
              color={optColor}
              weight={2.5}
              style={opt === 'A' ? 'dashed' : 'solid'}
            />
          ))}
        <Line.Segment point1={[t, Y0]} point2={[t, Y1 - 3]} color={C.guide} style="dashed" weight={1.5} />
        <Point x={t} y={v} color={C.f} />
        {vOpt !== null && vOpt >= Y0 && vOpt <= Y1 && <Point x={t} y={vOpt} color={optColor} />}
        {!opt && (
          <Label at={[t, v]} color={C.f} attach={phase === 2 ? 'ne' : phase === 0 ? 'se' : 's'} size={12}>
            {`v = ${num(v)}`}
          </Label>
        )}
      </Plane>
      <Controls>
        <Slider
          label="t"
          value={t}
          onChange={x => {
            player.stop()
            setT(x)
          }}
          min={0}
          max={260}
          step={1}
          format={x => `${Math.round(x)} s`}
        />
        <div className="flex flex-wrap items-center gap-2">
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Run the journey" />
        </div>
        <OptionPicker value={opt} onChange={setOpt} />
        <Readouts>
          <Readout color={C.f} tex={`\\text{journey: } ${RULES[phase]} = ${num(v)}`} />
          {opt && (
            <Readout
              color={optColor}
              tex={vOpt === null ? `\\text{option ${opt}: undefined at } t = ${Math.round(t)}` : `\\text{option ${opt}: } v(${Math.round(t)}) = ${num(vOpt).replace('−', '-')}`}
            />
          )}
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
