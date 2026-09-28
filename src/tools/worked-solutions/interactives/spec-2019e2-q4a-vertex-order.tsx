// 2019 Specialist Exam 2 Q4a — the letters ABCD give the order you walk round the parallelogram,
// so you go out along AB and come back along CD: opposite sides point opposite ways, and the
// equal vectors are AB = DC (not CD). The base is drawn face-on and to scale, from the question's
// coordinates (a flat frame in the plane of A, B, D: x along AD). "Walk round" moves a dot
// A → B → C → D → A. The toggle shows the report's slip AB = CD: it puts C at D − AB = (2, 4, 1),
// and the walk then crosses itself — a bow-tie, not a parallelogram (and BC ≠ AD, the check).

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Buttons, C, Controls, Katex, M, Notice, PlayButton, Readout, Readouts, Toggle, usePlayer } from './kit'

type V3 = readonly [number, number, number]
type P2 = readonly [number, number]
const sub = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
const mul = (k: number, a: V3): V3 => [k * a[0], k * a[1], k * a[2]]
const dot = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
const unit = (a: V3) => mul(1 / Math.sqrt(dot(a, a)), a)

const A: V3 = [2, -1, 3]
const B: V3 = [4, -2, 1]
const D: V3 = [4, 3, -1]
const AB = sub(B, A)
const AD = sub(D, A)
const C_RIGHT = add(B, AD) // AB = DC  ⟹  C = B + AD = (6, 2, −3)
const C_SLIP = sub(D, AB) // AB = CD  ⟹  C = D − AB = (2, 4, 1)

// A flat frame in the base's plane: x along AD, y towards B.
const XH = unit(AD)
const YH = unit(sub(AB, mul(dot(AB, XH), XH)))
const flat = (p: V3): P2 => {
  const d = sub(p, A)
  return [dot(d, XH), dot(d, YH)]
}
const FA = flat(A)
const FB = flat(B)
const FD = flat(D)
const FC = flat(C_RIGHT)
const FS = flat(C_SLIP)

// One frame for both versions, with room for the coordinate labels.
const X0 = -1.5
const X1 = 8.9
const Y0 = FS[1] - 0.7
const Y1 = FC[1] + 0.7

const pt = (p: V3) => `(${p.join(', ')})`
const vecTex = (v: V3) => {
  const units = ['\\underset{\\sim}{i}', '\\underset{\\sim}{j}', '\\underset{\\sim}{k}']
  let out = ''
  v.forEach((c, i) => {
    if (c === 0) return
    const coef = Math.abs(c) === 1 ? '' : String(Math.abs(c))
    out += c < 0 ? `-${coef}${units[i]}` : `${out ? '+' : ''}${coef}${units[i]}`
  })
  return out
}

function useWidth() {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    setWidth(el.getBoundingClientRect().width)
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(entries => setWidth(entries[0]?.contentRect.width ?? 0))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, width] as const
}

type Side = 'n' | 's' | 'e' | 'w' | 'c'
const SHIFT: Record<Side, string> = {
  n: '-translate-x-1/2 -translate-y-full',
  s: '-translate-x-1/2',
  e: '-translate-y-1/2',
  w: '-translate-x-full -translate-y-1/2',
  c: '-translate-x-1/2 -translate-y-1/2',
}
const NUDGE: Record<Side, P2> = { n: [0, -7], s: [0, 7], e: [8, 0], w: [-8, 0], c: [0, 0] }

/** A KaTeX label laid over the SVG next to a point (px). */
function Tag({ at, tex, side = 'c', color }: { at: P2; tex: string; side?: Side; color?: string }) {
  return (
    <span
      className={`absolute ${SHIFT[side]} px-0.5 rounded bg-white/80 dark:bg-gray-900/80 text-[13px] leading-none pointer-events-none whitespace-nowrap`}
      style={{ left: at[0] + NUDGE[side][0], top: at[1] + NUDGE[side][1], color: color ?? undefined }}
    >
      <Katex tex={tex} />
    </span>
  )
}

function Arrow({ from, to, color, width = 3 }: { from: P2; to: P2; color: string; width?: number }) {
  const dx = to[0] - from[0]
  const dy = to[1] - from[1]
  const l = Math.hypot(dx, dy) || 1
  const ux = dx / l
  const uy = dy / l
  const hl = 12
  const hw = 5.5
  const bx = to[0] - ux * hl
  const by = to[1] - uy * hl
  return (
    <g>
      <line x1={from[0]} y1={from[1]} x2={bx + ux} y2={by + uy} stroke={color} strokeWidth={width} strokeLinecap="round" />
      <polygon points={`${to[0]},${to[1]} ${bx - uy * hw},${by + ux * hw} ${bx + uy * hw},${by - ux * hw}`} fill={color} />
    </g>
  )
}

/** Where segments pq and rs cross, if they do. */
function crossing(p: P2, q: P2, r: P2, s: P2): P2 | null {
  const d = (q[0] - p[0]) * (s[1] - r[1]) - (q[1] - p[1]) * (s[0] - r[0])
  if (Math.abs(d) < 1e-9) return null
  const t = ((r[0] - p[0]) * (s[1] - r[1]) - (r[1] - p[1]) * (s[0] - r[0])) / d
  const u = ((r[0] - p[0]) * (q[1] - p[1]) - (r[1] - p[1]) * (q[0] - p[0])) / d
  return t > 1e-6 && t < 1 - 1e-6 && u > 1e-6 && u < 1 - 1e-6 ? [p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])] : null
}

export default function VertexOrder() {
  const [ref, width] = useWidth()
  const [slip, setSlip] = useState(false)
  const [walk, setWalk] = useState(0)
  const player = usePlayer(setWalk, { min: 0, max: 4, seconds: 6 })

  const W = Math.min(width || 340, 520)
  const S = W / (X1 - X0)
  const H = Math.round(S * (Y1 - Y0))
  const X = (p: P2): P2 => [S * (p[0] - X0), S * (Y1 - p[1])]

  const Cw = slip ? C_SLIP : C_RIGHT
  const Cf = slip ? FS : FC
  const loop: P2[] = [FA, FB, Cf, FD, FA]
  const i = Math.min(3, Math.floor(walk))
  const f = walk - i
  const dot2: P2 = [loop[i][0] + f * (loop[i + 1][0] - loop[i][0]), loop[i][1] + f * (loop[i + 1][1] - loop[i][1])]
  const cut = slip ? crossing(FB, FS, FD, FA) : null
  const BC = sub(Cw, B)

  /** A small arrowhead half-way along a side, pointing the way you walk. */
  const midHead = (p: P2, q: P2, key: number) => {
    const a = X(p)
    const b = X(q)
    const m: P2 = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
    const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1
    const ux = (b[0] - a[0]) / l
    const uy = (b[1] - a[1]) / l
    const tip: P2 = [m[0] + ux * 5, m[1] + uy * 5]
    return (
      <polygon
        key={key}
        points={`${tip[0]},${tip[1]} ${tip[0] - ux * 10 - uy * 4.5},${tip[1] - uy * 10 + ux * 4.5} ${tip[0] - ux * 10 + uy * 4.5},${tip[1] - uy * 10 - ux * 4.5}`}
        fill={C.guide}
      />
    )
  }

  const mid = (p: P2, q: P2): P2 => {
    const a = X(p)
    const b = X(q)
    return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
  }

  let notice: ReactNode
  if (!slip) {
    notice = (
      <Notice>
        The letters give the order you walk round the base: <M>{'A \\to B \\to C \\to D \\to A'}</M> (press &ldquo;Walk
        round&rdquo;). You go out along <M>AB</M> and come back along <M>CD</M>, so <b>opposite sides point opposite
        ways</b>. The two blue arrows that match are <M>{'\\overrightarrow{AB}'}</M> and <M>{'\\overrightarrow{DC}'}</M>, which
        puts <M>C</M> at <M>{'(6, 2, -3)'}</M>. Now turn on the slip the report describes.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="warn">
        Setting <M>{'\\overrightarrow{AB} = \\overrightarrow{CD}'}</M> makes the walk from <M>C</M> to <M>D</M> go the{' '}
        <em>same</em> way as <M>A</M> to <M>B</M>, so <M>{'C = D - \\overrightarrow{AB} = (2, 4, 1)'}</M>. Walk round now: the
        path crosses itself (the red dot), a bow-tie rather than a parallelogram. The quick check catches it:{' '}
        <M>{'\\overrightarrow{BC}'}</M> should equal <M>{'\\overrightarrow{AD}'}</M>, and here it doesn&apos;t.
      </Notice>
    )
  }

  return (
    <div>
      <div ref={ref} className="w-full">
        <div className="relative mx-auto text-gray-700 dark:text-gray-300" style={{ width: W, height: H }}>
          <svg
            width={W}
            height={H}
            viewBox={`0 0 ${W} ${H}`}
            className="block"
            role="img"
            aria-label={`The base ABCD drawn face-on: A, B and D fixed, with C at ${pt(Cw)}${slip ? ', where the path A B C D crosses itself' : ', making a parallelogram'}`}
          >
            <polygon
              points={loop.slice(0, 4).map(p => X(p).join(',')).join(' ')}
              fill={slip ? C.bad : C.f}
              fillOpacity={slip ? 0.1 : 0.14}
              fillRule="evenodd"
              stroke="none"
            />
            {/* The two sides that aren't the matching pair, with the direction of the walk. */}
            {[
              [FB, Cf],
              [FD, FA],
            ].map(([p, q], k) => {
              const a = X(p)
              const b = X(q)
              return <line key={k} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={C.guide} strokeWidth={2} />
            })}
            {midHead(FB, Cf, 1)}
            {midHead(FD, FA, 2)}
            {/* AB, and its partner: DC (right) or CD (the slip). */}
            <Arrow from={X(FA)} to={X(FB)} color={C.f} />
            {slip ? <Arrow from={X(FS)} to={X(FD)} color={C.bad} /> : <Arrow from={X(FD)} to={X(FC)} color={C.f} />}
            {cut && <circle cx={X(cut)[0]} cy={X(cut)[1]} r={5} fill={C.bad} />}
            {[FA, FB, FD].map((p, k) => (
              <circle key={k} cx={X(p)[0]} cy={X(p)[1]} r={3.5} fill="currentColor" />
            ))}
            <circle cx={X(Cf)[0]} cy={X(Cf)[1]} r={4} fill={slip ? C.bad : C.good} />
            <circle cx={X(dot2)[0]} cy={X(dot2)[1]} r={6} fill={C.g} stroke="white" strokeWidth={1.5} />
          </svg>
          <Tag at={X(FA)} side="s" tex={`A${pt(A)}`} />
          <Tag at={X(FB)} side="n" tex={`B${pt(B)}`} />
          <Tag at={X(FD)} side="e" tex={`D${pt(D)}`} />
          <Tag at={X(Cf)} side={slip ? 's' : 'n'} tex={`C${pt(Cw)}`} color={slip ? C.bad : C.good} />
          <Tag at={mid(FA, FB)} side="w" tex="\overrightarrow{AB}" color={C.f} />
          {slip ? (
            <Tag at={mid(FS, FD)} side="e" tex="\overrightarrow{CD}" color={C.bad} />
          ) : (
            <Tag at={mid(FD, FC)} side="e" tex="\overrightarrow{DC}" color={C.f} />
          )}
        </div>
      </div>
      <Controls>
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(walk >= 3.99 ? 0 : walk)} label="Walk round A → B → C → D" />
          <Toggle
            label={<>Set <Katex tex="\overrightarrow{AB} = \overrightarrow{CD}" /> (the slip)</>}
            checked={slip}
            onChange={v => {
              player.stop()
              setWalk(0)
              setSlip(v)
            }}
          />
        </Buttons>
        <Readouts>
          <Readout
            color={slip ? C.bad : C.good}
            tex={slip ? `C = D - \\overrightarrow{AB} = ${pt(Cw)}` : `C = B + \\overrightarrow{AD} = ${pt(Cw)}`}
          />
          <Readout
            color={slip ? C.bad : C.good}
            tex={`\\overrightarrow{BC} = ${vecTex(BC)} ${slip ? '\\ne' : '='} \\overrightarrow{AD}`}
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
