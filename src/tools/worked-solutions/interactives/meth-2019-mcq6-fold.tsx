// 2019 Methods Exam 2 MCQ 6 — why V(x) = x(80 − 2x)(50 − 2x) rises and then falls. A slider sets the
// cut x: the net shows a square gone from BOTH ends of each edge (so the base is 80 − 2x by 50 − 2x),
// the box beside it shows the shape (flat and wide for small x, tall and thin near 25), and the graph
// tracks V(x), peaking at x = 10 (18 000 cm³). Past x = 25 the width is negative, so the dashed part
// of the cubic, with its other stationary point at x = 100/3 (option D), is not a box at all. A toggle
// shows the "80 − x" model: its volume curve peaks at x = 20 (option B) — the net shows why it's wrong.

import { useState } from 'react'
import {
  Buttons, C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Polygon, Readout, Readouts, Slider, Toggle,
  num, usePlayer,
} from './kit'

const V = (x: number) => x * (80 - 2 * x) * (50 - 2 * x)
const dV = (x: number) => 12 * x * x - 520 * x + 4000
const Wrong = (x: number) => x * (80 - x) * (50 - x)
const X3 = 100 / 3

/** The sheet with its corners cut (left) and the folded box in oblique view (right). */
function Net({ x, wrong }: { x: number; wrong: boolean }) {
  const s = 1.9
  const x0 = 28
  const y0 = 26
  const L = 80 * s
  const H = 50 * s
  const X = x * s
  const cross = [
    [x0 + X, y0], [x0 + L - X, y0], [x0 + L - X, y0 + X], [x0 + L, y0 + X], [x0 + L, y0 + H - X], [x0 + L - X, y0 + H - X],
    [x0 + L - X, y0 + H], [x0 + X, y0 + H], [x0 + X, y0 + H - X], [x0, y0 + H - X], [x0, y0 + X], [x0 + X, y0 + X],
  ].map(p => p.join(',')).join(' ')
  const corners = [[x0, y0], [x0 + L - X, y0], [x0, y0 + H - X], [x0 + L - X, y0 + H - X]]

  // oblique box
  const sb = 1.75
  const ox = 226
  const oy = 140
  const bl = (80 - 2 * x) * sb
  const bd = (50 - 2 * x) * sb * 0.45
  const dx = bd * Math.cos(Math.PI / 6)
  const dy = bd * Math.sin(Math.PI / 6)
  const h = x * sb
  const P = (pts: number[][]) => pts.map(p => p.join(',')).join(' ')
  const B0 = [ox + dx, oy - dy]
  const B1 = [ox + bl + dx, oy - dy]

  const ink = 'fill-gray-700 dark:fill-gray-200'
  return (
    <svg viewBox="0 0 420 158" className="w-full max-w-[560px] mx-auto block" role="img" aria-label={`Net of the 80 by 50 sheet with ${num(x, 1)} cm squares cut from each corner, and the folded box`}>
      {/* original sheet outline */}
      <rect x={x0} y={y0} width={L} height={H} className="fill-none stroke-gray-400 dark:stroke-gray-500" strokeDasharray="3 3" strokeWidth={1} />
      <polygon points={cross} className="fill-sky-100 stroke-sky-600 dark:fill-sky-900/50 dark:stroke-sky-400" strokeWidth={1.2} />
      {corners.map(([cx, cy], i) => (
        <rect key={i} x={cx} y={cy} width={X} height={X} className="fill-rose-100/70 stroke-rose-400 dark:fill-rose-900/30 dark:stroke-rose-500" strokeWidth={1} strokeDasharray="2 2" />
      ))}
      {/* fold lines */}
      {x > 0.3 && <rect x={x0 + X} y={y0 + X} width={L - 2 * X} height={Math.max(0, H - 2 * X)} className="fill-none stroke-sky-600 dark:stroke-sky-400" strokeDasharray="4 3" strokeWidth={1} />}
      {X > 11 && (
        <text x={x0 + X / 2} y={y0 + X / 2} textAnchor="middle" dominantBaseline="central" fontSize={12} fontStyle="italic" className="fill-rose-600 dark:fill-rose-300">
          x
        </text>
      )}
      {/* top bracket: 80 − 2x */}
      <line x1={x0 + X} y1={y0 - 6} x2={x0 + L - X} y2={y0 - 6} className="stroke-gray-600 dark:stroke-gray-300" strokeWidth={1} />
      <line x1={x0 + X} y1={y0 - 10} x2={x0 + X} y2={y0 - 2} className="stroke-gray-600 dark:stroke-gray-300" strokeWidth={1} />
      <line x1={x0 + L - X} y1={y0 - 10} x2={x0 + L - X} y2={y0 - 2} className="stroke-gray-600 dark:stroke-gray-300" strokeWidth={1} />
      <text x={x0 + L / 2} y={y0 - 11} textAnchor="middle" fontSize={12} className={ink}>
        80 − 2x
      </text>
      {/* left bracket: 50 − 2x */}
      {H - 2 * X > 14 && (
        <>
          <line x1={x0 - 6} y1={y0 + X} x2={x0 - 6} y2={y0 + H - X} className="stroke-gray-600 dark:stroke-gray-300" strokeWidth={1} />
          <text x={x0 - 11} y={y0 + H / 2} textAnchor="middle" fontSize={12} className={ink} transform={`rotate(-90 ${x0 - 11} ${y0 + H / 2})`}>
            50 − 2x
          </text>
        </>
      )}
      {/* the wrong idea: 80 − x runs from one square to the far edge, through the other square */}
      {wrong && (
        <>
          <line x1={x0 + X} y1={y0 + H + 7} x2={x0 + L} y2={y0 + H + 7} stroke={C.bad} strokeWidth={1.5} />
          <line x1={x0 + X} y1={y0 + H + 3} x2={x0 + X} y2={y0 + H + 11} stroke={C.bad} strokeWidth={1.5} />
          <line x1={x0 + L} y1={y0 + H + 3} x2={x0 + L} y2={y0 + H + 11} stroke={C.bad} strokeWidth={1.5} />
          <text x={x0 + L / 2} y={y0 + H + 23} textAnchor="middle" fontSize={11} fill={C.bad}>
            80 − x forgets the far square
          </text>
        </>
      )}

      {/* box: inside walls and floor first, then the outside faces */}
      <polygon points={P([B0, B1, [B1[0], B1[1] - h], [B0[0], B0[1] - h]])} className="fill-sky-100 dark:fill-sky-950" />
      <polygon points={P([[ox, oy], B0, [B0[0], B0[1] - h], [ox, oy - h]])} className="fill-sky-200 dark:fill-sky-900" />
      <polygon points={P([[ox, oy], [ox + bl, oy], B1, B0])} className="fill-sky-50 dark:fill-sky-950/60" />
      <polygon points={P([[ox, oy], [ox + bl, oy], [ox + bl, oy - h], [ox, oy - h]])} className="fill-sky-300/90 stroke-sky-700 dark:fill-sky-700/90 dark:stroke-sky-300" strokeWidth={1} />
      <polygon points={P([[ox + bl, oy], B1, [B1[0], B1[1] - h], [ox + bl, oy - h]])} className="fill-sky-400/90 stroke-sky-700 dark:fill-sky-800 dark:stroke-sky-300" strokeWidth={1} />
      <polygon points={P([[ox, oy - h], [ox + bl, oy - h], [B1[0], B1[1] - h], [B0[0], B0[1] - h]])} className="fill-none stroke-sky-700 dark:stroke-sky-300" strokeWidth={1} />
      <text x={ox} y={22} fontSize={12} className={ink}>
        {`${num(80 - 2 * x, 1)} × ${num(50 - 2 * x, 1)} × ${num(x, 1)}`}
      </text>
      <text x={ox} y={40} fontSize={12} fontWeight={600} className={ink}>
        {`V = ${Math.round(V(x)).toLocaleString('en-AU')} cm³`}
      </text>
    </svg>
  )
}

export default function Fold() {
  const [x, setX] = useState(6)
  const [wrong, setWrong] = useState(false)
  const player = usePlayer(setX, { min: 0, max: 25, seconds: 7 })
  const near = Math.abs(x - 10) < 0.3
  const yTop = wrong ? 40000 : 20000
  const k = (v: number) => (v === 0 ? '' : `${v / 1000}k`)

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        The red curve is <M>{'x(80-x)(50-x)'}</M>: its peak is at <M>x = 20</M> (option <b>B</b>) and its other
        stationary point is <M>{'x=\\tfrac{200}{3}'}</M> (option <b>E</b>). But look at the net: along the 80 cm edge a
        square is cut from <em>both</em> ends, so the red bracket <M>80 - x</M> runs through the second square. The base
        is <M>80 - 2x</M> by <M>50 - 2x</M>.
      </Notice>
    )
  } else if (near) {
    notice = (
      <Notice tone="good">
        <b>At <M>x = 10</M> the box is <M>{'60 \\times 30 \\times 10 = 18\\,000'}</M> cm³, the most it can hold.</b>{' '}
        Here <M>{"V'(10) = 0"}</M>: one more millimetre of height is exactly cancelled by the base area lost. Keep sliding
        to watch the volume fall.
      </Notice>
    )
  } else if (x < 10) {
    notice = (
      <Notice>
        A bigger cut makes the box <b>taller</b> but its base <b>smaller</b>. For now height wins: <M>{"V'(x) > 0"}</M>,
        so <M>V</M> is still climbing. Press play or slide right to find where the two effects balance.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Past <M>x = 10</M> the base shrinks faster than the height grows, so <M>{"V'(x) < 0"}</M>. At <M>x = 25</M> the
        width <M>50 - 2x</M> is <M>0</M>: the box is flat and <M>V = 0</M> (option C). The dashed curve beyond{' '}
        <M>25</M> isn&apos;t a box, which is why <M>{'x=\\tfrac{100}{3}'}</M>, the other solution of{' '}
        <M>{"V'(x)=0"}</M> (option D), is rejected. It&apos;s a minimum anyway.
      </Notice>
    )
  }

  return (
    <div>
      <Net x={x} wrong={wrong} />
      <Plane x={[0, 40]} y={[-10000, yTop]} xStep={5} yStep={wrong ? 10000 : 5000} height={260} yLabels={k} yLabel="V">
        <Polygon points={[[25, -10000], [40, -10000], [40, yTop], [25, yTop]]} color={C.guide} fillOpacity={0.12} weight={0} strokeOpacity={0} />
        <Label at={[32.5, wrong ? 12000 : yTop * 0.9]} attach="c" color={C.guide} size={12}>
          no box here
        </Label>
        <Plot.OfX y={V} domain={[25, 40]} color={C.guide} weight={2} style="dashed" />
        {wrong && <Plot.OfX y={Wrong} domain={[0, 40]} color={C.bad} weight={2.5} />}
        {wrong && <Point x={20} y={36000} color={C.bad} />}
        {wrong && (
          <Label at={[20, 36000]} attach="ne" color={C.bad} size={12}>
            x = 20 (B)
          </Label>
        )}
        <Plot.OfX y={V} domain={[0, 25]} color={C.f} weight={3} />
        <Point x={10} y={18000} color={C.good} />
        <Label at={[10, 18000]} attach="ne" color={C.good} size={12}>
          max at x = 10
        </Label>
        <Point x={X3} y={V(X3)} color={C.guide} />
        <Label at={[X3, V(X3)]} attach="s" color={C.guide} size={12}>
          x = 100/3
        </Label>
        <Line.Segment point1={[x, 0]} point2={[x, V(x)]} color={C.f} style="dashed" weight={1.5} />
        <Point x={x} y={V(x)} color={C.f} />
      </Plane>
      <Controls>
        <Slider
          label="x"
          value={x}
          onChange={v => {
            player.stop()
            setX(v)
          }}
          min={0}
          max={25}
          step={0.1}
          format={v => num(v, 1)}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(x)} label="Sweep the cut from 0 to 25" />
          <Toggle label="Take only x off each side?" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={C.f} tex={`V(x) = ${num(x, 1)}(${num(80 - 2 * x, 1)})(${num(50 - 2 * x, 1)}) \\approx ${Math.round(V(x))}`} />
          <Readout color={dV(x) > 1e-6 ? C.good : dV(x) < -1e-6 ? C.bad : C.ink} tex={`V'(x) \\approx ${num(dV(x), 0)}`} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
