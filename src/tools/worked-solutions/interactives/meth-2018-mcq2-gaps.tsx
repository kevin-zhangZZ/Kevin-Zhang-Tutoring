// 2018 Methods Exam 2 MCQ 2 — where each of the five rules breaks. Pick an option: its graph is
// drawn from the rule, the x-axis is coloured green where the rule works and red where it doesn't,
// and a vertical asymptote marks each zero of a denominator. Only A has its single gap at x = 1.
// The zeros of a numerator (x = ±√5 in A and D) are shown too: they are x-intercepts, not gaps.
// E, the most popular wrong answer, keeps x = 1 and loses everything to its left.

import { useState, type ReactNode } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Toggle } from './kit'

type Key = 'A' | 'B' | 'C' | 'D' | 'E'

const X0 = -4
const X1 = 6
const CAP = 30
const cap = (v: number) => Math.max(-CAP, Math.min(CAP, v))
const R5 = Math.sqrt(5)

interface Opt {
  tex: string
  f: (x: number) => number
  /** x where the denominator is zero */
  pole?: number
  /** where the rule is defined: [from, to] pieces */
  pieces: [number, number][]
  /** excluded interval on the x-axis (for the square root) */
  lost?: [number, number]
  zeros?: number[]
  domainTex: string
}

const OPTS: Record<Key, Opt> = {
  A: {
    tex: 'f(x)=\\dfrac{x^2-5}{x-1}',
    f: x => (x * x - 5) / (x - 1),
    pole: 1,
    pieces: [[X0, 1], [1, X1]],
    zeros: [-R5, R5],
    domainTex: 'R\\setminus\\{1\\}',
  },
  B: {
    tex: 'f(x)=\\dfrac{x+4}{x-5}',
    f: x => (x + 4) / (x - 5),
    pole: 5,
    pieces: [[X0, 5], [5, X1]],
    domainTex: 'R\\setminus\\{5\\}',
  },
  C: {
    tex: 'f(x)=\\dfrac{x^2+x+4}{x^2+1}',
    f: x => (x * x + x + 4) / (x * x + 1),
    pieces: [[X0, X1]],
    domainTex: 'R',
  },
  D: {
    tex: 'f(x)=\\dfrac{5-x^2}{1+x}',
    f: x => (5 - x * x) / (1 + x),
    pole: -1,
    pieces: [[X0, -1], [-1, X1]],
    zeros: [-R5, R5],
    domainTex: 'R\\setminus\\{-1\\}',
  },
  E: {
    tex: 'f(x)=\\sqrt{x-1}',
    f: x => Math.sqrt(x - 1),
    pieces: [[1, X1]],
    lost: [X0, 1],
    domainTex: '[1,\\ \\infty)',
  },
}

function OpenPoint({ x, y, color }: { x: number; y: number; color: string }) {
  return <Point x={x} y={y} color={color} svgCircleProps={{ r: 5, style: { fill: 'var(--mafs-bg)', stroke: color, strokeWidth: 2.5 } }} />
}

const NOTICES: Record<Key, { tone: 'good' | 'warn' | 'neutral'; body: ReactNode }> = {
  A: {
    tone: 'good',
    body: (
      <>
        <b>The denominator <M>x - 1</M> is zero at <M>x = 1</M> and nowhere else</b>, so the graph has one vertical
        asymptote, at <M>x = 1</M>, and one gap in the domain. The numerator <M>x^2 - 5</M> is zero at{' '}
        <M>{'x = \\pm\\sqrt5'}</M>, but that only puts the graph on the <M>x</M>-axis there: a zero on top is allowed.
        Now try <b>E</b>, the most popular wrong answer.
      </>
    ),
  },
  B: {
    tone: 'warn',
    body: (
      <>
        Here the denominator <M>x - 5</M> is zero at <M>x = 5</M>, so the gap is at <M>5</M>, not <M>1</M>. At{' '}
        <M>x = 1</M> this rule works fine: <M>{'f(1) = \\tfrac{5}{-4} = -1.25'}</M>, the green dot.
      </>
    ),
  },
  C: {
    tone: 'warn',
    body: (
      <>
        <M>x^2 + 1</M> is at least <M>1</M> for every <M>x</M>, so this denominator is never zero: no asymptote, no
        gap. The maximal domain is all of <M>R</M>, which keeps <M>1</M> too (<M>{'f(1) = \\tfrac{6}{2} = 3'}</M>).
      </>
    ),
  },
  D: {
    tone: 'warn',
    body: (
      <>
        <M>1 + x</M> is zero when <M>x = -1</M>, so the asymptote is on the other side of the <M>y</M>-axis. The value
        that breaks a rule is the one that makes the bracket <b>zero</b>, so watch the sign. At <M>x = 1</M> it
        works: <M>{'f(1) = \\tfrac{4}{2} = 2'}</M>.
      </>
    ),
  },
  E: {
    tone: 'warn',
    body: (
      <>
        A square root can&apos;t take a negative, so it needs <M>{'x - 1 \\ge 0'}</M>: the graph <b>starts</b> at{' '}
        <M>x = 1</M> (closed dot, <M>f(1) = 0</M>) and everything to its left is missing. That throws away every
        number below <M>1</M> and <b>keeps</b> <M>1</M>, nearly the opposite of <M>{'R\\setminus\\{1\\}'}</M>.
      </>
    ),
  },
}

export default function GapsWidget() {
  const [key, setKey] = useState<Key>('A')
  const o = OPTS[key]
  const ok = key === 'A'
  const eps = 1e-3
  const f1 = key === 'A' ? null : o.f(1)

  return (
    <div>
      <Plane x={[X0, X1]} y={[-8, 8]} xStep={1} yStep={2} height={300}>
        {/* where the rule works (green) and where it doesn't (red), along the x-axis */}
        {o.pieces.map(([a, b], i) => (
          <Line.Segment
            key={i}
            point1={[a + (a === o.pole ? eps : 0), 0]}
            point2={[b - (b === o.pole ? eps : 0), 0]}
            color={C.good}
            weight={6}
          />
        ))}
        {o.lost && <Line.Segment point1={[o.lost[0], 0]} point2={[o.lost[1], 0]} color={C.bad} weight={6} />}
        {o.pole !== undefined && (
          <>
            <Line.Segment point1={[o.pole, -8]} point2={[o.pole, 8]} color={C.bad} style="dashed" weight={2} />
            <Label at={[o.pole, 7.2]} color={C.bad} attach={o.pole === 1 ? 'e' : 'w'}>
              {`x = ${String(o.pole).replace('-', '−')}`}
            </Label>
          </>
        )}
        {o.pieces.map(([a, b], i) => (
          <Plot.OfX
            key={`p${i}`}
            y={x => cap(o.f(x))}
            domain={[a + (a === o.pole ? eps : 0), b - (b === o.pole ? eps : 0)]}
            color={C.f}
            weight={3}
          />
        ))}
        {o.pole !== undefined && <OpenPoint x={o.pole} y={0} color={C.bad} />}
        {o.zeros?.map(z => <Point key={z} x={z} y={0} color={C.violet} />)}
        {f1 !== null && <Point x={1} y={f1} color={C.good} />}
        {f1 !== null && key !== 'E' && (
          <Label at={[1, f1]} color={C.good} attach="ne">
            {'f(1) exists'}
          </Label>
        )}
      </Plane>
      <Controls>
        <div className="flex flex-wrap items-center gap-2">
          {(Object.keys(OPTS) as Key[]).map(k => (
            <Toggle key={k} label={`Option ${k}`} checked={key === k} onChange={() => setKey(k)} />
          ))}
        </div>
        <Readouts>
          <Readout color={C.f} tex={o.tex} />
          {o.pole !== undefined && <Readout color={C.bad} tex={`\\text{bottom} = 0 \\text{ at } x = ${o.pole}\\text{: excluded}`} />}
          {o.zeros && <Readout color={C.violet} tex={'\\text{top} = 0 \\text{ at } x = \\pm\\sqrt5 \\text{: allowed}'} />}
          <Readout color={ok ? C.good : C.bad} tex={`\\text{maximal domain} = ${o.domainTex}\\ ${ok ? '\\checkmark' : '\\times'}`} />
        </Readouts>
        <Notice tone={NOTICES[key].tone}>{NOTICES[key].body}</Notice>
      </Controls>
    </div>
  )
}
