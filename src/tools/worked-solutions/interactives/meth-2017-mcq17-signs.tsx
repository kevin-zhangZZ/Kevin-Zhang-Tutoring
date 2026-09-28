// 2017 Methods Exam 2 MCQ 17 — test each option by the sign of every piece it adds up. The curve
// is one even function with the paper's shape, f(x) = −¼(x² − 1)(x² − 9), so a = −3, b = −1, c = 1,
// d = 3 (the letters are shown, not the numbers). A₁ is the area of each outer hump and A₂ the area
// of the dip, so the true area is 2A₁ + A₂. Pick an option: each piece of the interval it covers
// is shaded green if it adds area and red if it subtracts area, labelled with what it contributes.
// Only D ends all-green: 2∫ₐᵇ gives both humps, and since b + c = 0, −2∫_b^{b+c} doubles the left
// half of the dip, which is −½A₂, into +A₂. B flips the dip twice (bounds and minus sign), C adds
// the dip's negative integral, E wrongly reverses the right hump.

import { useState, type ReactNode } from 'react'
import { Buttons, C, Controls, Katex, Label, M, Notice, Plane, Plot, Readout, Readouts, Region, Toggle } from './kit'

const f = (x: number) => (-(x * x - 1) * (x * x - 9)) / 4
const A = -3
const B = -1
const Cc = 1
const D = 3

// The four elementary pieces and what ∫ f dx over each (left to right) is, in units of A₁ and A₂.
type Piece = 'L' | 'ML' | 'MR' | 'R'
const PIECES: { id: Piece; from: number; to: number; a1: number; a2: number }[] = [
  { id: 'L', from: A, to: B, a1: 1, a2: 0 },
  { id: 'ML', from: B, to: 0, a1: 0, a2: -0.5 },
  { id: 'MR', from: 0, to: Cc, a1: 0, a2: -0.5 },
  { id: 'R', from: Cc, to: D, a1: 1, a2: 0 },
]

// A term = coef × ∫ over pieces, with orient −1 when the bounds run right to left.
type Term = { coef: number; orient: 1 | -1; pieces: Piece[]; tex: string; val: string }
type Option = { letter: string; tex: string; terms: Term[]; total: string; right: boolean }

const OPTIONS: Option[] = [
  {
    letter: 'A',
    tex: '\\int_a^d f(x)\\,dx',
    terms: [{ coef: 1, orient: 1, pieces: ['L', 'ML', 'MR', 'R'], tex: '\\int_a^d f(x)\\,dx', val: 'A_1 - A_2 + A_1' }],
    total: '2A_1 - A_2',
    right: false,
  },
  {
    letter: 'B',
    tex: '\\int_a^b f(x)\\,dx - \\int_c^b f(x)\\,dx + \\int_c^d f(x)\\,dx',
    terms: [
      { coef: 1, orient: 1, pieces: ['L'], tex: '\\int_a^b f(x)\\,dx', val: '+A_1' },
      { coef: -1, orient: -1, pieces: ['ML', 'MR'], tex: '-\\int_c^b f(x)\\,dx', val: '-A_2' },
      { coef: 1, orient: 1, pieces: ['R'], tex: '\\int_c^d f(x)\\,dx', val: '+A_1' },
    ],
    total: '2A_1 - A_2',
    right: false,
  },
  {
    letter: 'C',
    tex: '2\\int_a^b f(x)\\,dx + \\int_b^c f(x)\\,dx',
    terms: [
      { coef: 2, orient: 1, pieces: ['L'], tex: '2\\int_a^b f(x)\\,dx', val: '+2A_1' },
      { coef: 1, orient: 1, pieces: ['ML', 'MR'], tex: '\\int_b^c f(x)\\,dx', val: '-A_2' },
    ],
    total: '2A_1 - A_2',
    right: false,
  },
  {
    letter: 'D',
    tex: '2\\int_a^b f(x)\\,dx - 2\\int_b^{b+c} f(x)\\,dx',
    terms: [
      { coef: 2, orient: 1, pieces: ['L'], tex: '2\\int_a^b f(x)\\,dx', val: '+2A_1' },
      { coef: -2, orient: 1, pieces: ['ML'], tex: '-2\\int_b^{0} f(x)\\,dx', val: '+A_2' },
    ],
    total: '2A_1 + A_2',
    right: true,
  },
  {
    letter: 'E',
    tex: '\\int_a^b f(x)\\,dx + \\int_c^b f(x)\\,dx + \\int_d^c f(x)\\,dx',
    terms: [
      { coef: 1, orient: 1, pieces: ['L'], tex: '\\int_a^b f(x)\\,dx', val: '+A_1' },
      { coef: 1, orient: -1, pieces: ['ML', 'MR'], tex: '\\int_c^b f(x)\\,dx', val: '+A_2' },
      { coef: 1, orient: -1, pieces: ['R'], tex: '\\int_d^c f(x)\\,dx', val: '-A_1' },
    ],
    total: 'A_2',
    right: false,
  },
]

const NOTICES: Record<string, { tone: 'good' | 'warn'; body: ReactNode }> = {
  A: {
    tone: 'warn',
    body: (
      <>
        One integral over <M>[a,d]</M> adds the humps but <b>subtracts</b> the dip: below the axis <M>{'f(x)<0'}</M>, so
        those strips count as negative. It gives <M>2A_1-A_2</M>, a signed total, not the area.
      </>
    ),
  },
  B: {
    tone: 'warn',
    body: (
      <>
        B reverses the dip&apos;s bounds <b>and</b> puts a minus in front. Each of those flips the sign once, so together
        they cancel: <M>{'-\\int_c^b f(x)\\,dx=\\int_b^c f(x)\\,dx'}</M>, still negative. Use one fix or the other, never both. B is
        option A in disguise.
      </>
    ),
  },
  C: {
    tone: 'warn',
    body: (
      <>
        <M>{'2\\int_a^b f(x)\\,dx'}</M> uses the symmetry correctly for the two humps. But <M>{'+\\int_b^c f(x)\\,dx'}</M> adds
        the dip&apos;s integral, which is negative, so the dip is subtracted: <M>2A_1-A_2</M>.
      </>
    ),
  },
  D: {
    tone: 'good',
    body: (
      <>
        <M>{'2\\int_a^b f(x)\\,dx'}</M> counts the left hump twice, which covers the right hump too (mirror images). Since{' '}
        <M>b=-c</M>, the upper limit <M>b+c</M> is <M>0</M>: the second integral covers only the left half of the dip,{' '}
        <M>{'-\\tfrac12A_2'}</M>, and <M>-2</M> turns it into <M>+A_2</M>. Every piece is green: <M>2A_1+A_2</M>.
      </>
    ),
  },
  E: {
    tone: 'warn',
    body: (
      <>
        <M>{'\\int_c^b f(x)\\,dx'}</M> correctly makes the dip positive. But <M>{'\\int_d^c f(x)\\,dx'}</M> also reverses the
        right hump, which was already above the axis, so it becomes <M>-A_1</M> and cancels the left hump. E only gives{' '}
        <M>A_2</M>, the dip on its own.
      </>
    ),
  },
}

const fmt = (a1: number, a2: number) => {
  const parts: string[] = []
  const one = (c: number, s: string) => {
    if (c === 0) return
    const sign = c > 0 ? '+' : '−'
    const m = Math.abs(c)
    parts.push(`${sign}${m === 1 ? '' : m === 0.5 ? '½' : m}${s}`)
  }
  one(a1, 'A₁')
  one(a2, 'A₂')
  return parts.join(' ')
}

export default function Signs() {
  const [letter, setLetter] = useState('B')
  const opt = OPTIONS.find(o => o.letter === letter)!

  // Net contribution of each piece, in units of A₁ / A₂.
  const net = new Map<Piece, { a1: number; a2: number; mult: number }>()
  for (const t of opt.terms) {
    for (const id of t.pieces) {
      const pc = PIECES.find(q => q.id === id)!
      const cur = net.get(id) ?? { a1: 0, a2: 0, mult: 0 }
      net.set(id, { a1: cur.a1 + t.coef * t.orient * pc.a1, a2: cur.a2 + t.coef * t.orient * pc.a2, mult: cur.mult + Math.abs(t.coef) })
    }
  }
  const sign = (id: Piece) => {
    const v = net.get(id)
    return v ? Math.sign(v.a1 + v.a2) : 0
  }
  const ml = net.get('ML')
  const mr = net.get('MR')
  const dipSame = ml && mr && ml.a2 === mr.a2
  const termColor = (t: Term) => {
    const s = t.pieces.map(id => {
      const pc = PIECES.find(q => q.id === id)!
      return Math.sign(t.coef * t.orient * (pc.a1 + pc.a2))
    })
    return s.every(v => v > 0) ? C.good : s.every(v => v < 0) ? C.bad : C.guide
  }
  const note = NOTICES[letter]

  return (
    <div>
      <Plane x={[-3.6, 3.6]} y={[-3.8, 4.6]} xStep={1} yStep={1} height={300} labels={false}>
        {PIECES.map(pc =>
          net.has(pc.id) ? (
            <Region
              key={pc.id}
              top={f}
              bottom={() => 0}
              from={pc.from}
              to={pc.to}
              color={sign(pc.id) > 0 ? C.good : C.bad}
              opacity={net.get(pc.id)!.mult > 1 ? 0.5 : 0.28}
            />
          ) : null,
        )}
        {/* A doubled piece stands in for its mirror image too: show that mirror as a faint ghost. */}
        {(['L', 'ML'] as Piece[]).map(id => {
          const v = net.get(id)
          const mirror = PIECES.find(q => q.id === (id === 'L' ? 'R' : 'MR'))!
          if (!v || v.mult < 2 || net.has(mirror.id)) return null
          return <Region key={`g${id}`} top={f} bottom={() => 0} from={mirror.from} to={mirror.to} color={sign(id) > 0 ? C.good : C.bad} opacity={0.12} />
        })}
        <Plot.OfX y={f} domain={[-3.28, 3.28]} color={C.f} weight={3} />
        {net.has('L') && <Label at={[-2, 1.7]} attach="c" color={sign('L') > 0 ? C.good : C.bad} size={14}>{fmt(net.get('L')!.a1, 0)}</Label>}
        {net.has('R') && <Label at={[2, 1.7]} attach="c" color={sign('R') > 0 ? C.good : C.bad} size={14}>{fmt(net.get('R')!.a1, 0)}</Label>}
        {dipSame && ml && mr ? (
          <Label at={[0, -1.1]} attach="c" color={sign('ML') > 0 ? C.good : C.bad} size={14}>{fmt(0, ml.a2 + mr.a2)}</Label>
        ) : (
          ml && <Label at={[-0.5, -1.1]} attach="c" color={sign('ML') > 0 ? C.good : C.bad} size={13}>{fmt(0, ml.a2)}</Label>
        )}
        {letter === 'D' && <Label at={[0, -2.25]} attach="s" color={C.ink} size={12}>b + c = 0</Label>}
        <Label at={[A, 0]} attach="se" size={14} italic>a</Label>
        <Label at={[B, 0]} attach="ne" size={14} italic>b</Label>
        <Label at={[Cc, 0]} attach="nw" size={14} italic>c</Label>
        <Label at={[D, 0]} attach="sw" size={14} italic>d</Label>
      </Plane>
      <Controls>
        <Buttons>
          <span className="text-[12.5px] text-gray-600 dark:text-gray-300">Option:</span>
          {OPTIONS.map(o => (
            <Toggle key={o.letter} label={o.letter} checked={letter === o.letter} onChange={() => setLetter(o.letter)} />
          ))}
        </Buttons>
        <div className="text-[13px] text-gray-700 dark:text-gray-300 overflow-x-auto">
          <Katex tex={`\\text{${opt.letter}: }\\ ${opt.tex}`} />
        </div>
        <Readouts>
          {opt.terms.map((t, i) => (
            <Readout key={i} color={termColor(t)} tex={`${t.tex} = ${t.val}`} />
          ))}
        </Readouts>
        <Readouts>
          <Readout color={opt.right ? C.good : C.bad} tex={`\\text{total} = ${opt.total}\\ ${opt.right ? '\\checkmark' : '\\ne 2A_1 + A_2'}`} />
        </Readouts>
        <Notice tone={note.tone}>
          {note.body} {letter !== 'D' && <>Now try option <b>D</b>.</>}
        </Notice>
      </Controls>
    </div>
  )
}
