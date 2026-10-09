// 2022 Methods Exam 2 Q3b.iii — the gap to the ceiling is d = 3 − h, so a HIGHER flip means a
// SMALLER gap. Drag the coin's height h: the room sketch shows h measured up from the floor and d
// measured down from the 3 m ceiling, and the plane shows the density f(h) (blue, on 1.5 ≤ h ≤ 3)
// and g(d) = f(3 − d) (orange, on 0 ≤ d ≤ 1.5) — f reflected in the line x = 1.5. The two dots sit
// at the same height because g(d) = f(h) when d = 3 − h. A toggle tries r = 1, s = 3 (which the
// report says some students wrote): g(d) = f(d + 3) lands on −1.5 ≤ d ≤ 0, negative distances, and
// keeps f's left-right order (a higher flip would give a bigger "gap"). f is the part b.ii density
// a = −4/5, b = 17/5, c = −167/60.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Readout, Readouts, Region, Slider, Toggle, Buttons } from './kit'

const f = (h: number) => (h < 1.5 || h > 3 ? 0 : -0.8 * h * h + 3.4 * h - 167 / 60)

/** The room, 0 m (floor) to 3 m (ceiling), with the coin at height h. */
function Room({ h }: { h: number }) {
  const top = 14
  const bottom = 206
  const y = (m: number) => bottom - ((bottom - top) * m) / 3
  const yc = y(h)
  return (
    <svg viewBox="0 0 92 220" className="w-[76px] flex-none text-gray-700 dark:text-gray-200" aria-label="Room: floor, ceiling and coin">
      <line x1="6" x2="86" y1={top} y2={top} stroke="currentColor" strokeWidth="2.5" />
      <line x1="6" x2="86" y1={bottom} y2={bottom} stroke="currentColor" strokeWidth="2.5" />
      <text x="46" y={top - 4} textAnchor="middle" fontSize="10" fill="currentColor">ceiling 3 m</text>
      <text x="46" y={bottom + 12} textAnchor="middle" fontSize="10" fill="currentColor">floor 0 m</text>
      {/* h: floor up to the coin */}
      <line x1="24" x2="24" y1={bottom} y2={yc} stroke={C.f} strokeWidth="2.5" />
      <text x="20" y={(bottom + yc) / 2 + 4} textAnchor="end" fontSize="13" fontStyle="italic" fontWeight="700" fill={C.f}>h</text>
      {/* d: coin up to the ceiling */}
      <line x1="68" x2="68" y1={top} y2={yc} stroke={C.g} strokeWidth="2.5" />
      <text x="72" y={(top + yc) / 2 + 4} textAnchor="start" fontSize="13" fontStyle="italic" fontWeight="700" fill={C.g}>d</text>
      <ellipse cx="46" cy={yc} rx="13" ry="4.5" fill="#eab308" stroke="#a16207" strokeWidth="1.2" />
      <line x1="24" x2="68" y1={yc} y2={yc} stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.6" />
    </svg>
  )
}

export default function GapIsReflection() {
  const [h, setH] = useState(2.6)
  const [wrong, setWrong] = useState(false)
  const fh = f(h)
  const d = wrong ? h - 3 : 3 - h
  const g = (x: number) => (wrong ? f(x + 3) : f(3 - x))
  const gFrom = wrong ? -1.5 : 0
  const gTo = wrong ? 0 : 1.5
  const gColor = wrong ? C.bad : C.g

  const notice = wrong ? (
    <Notice tone="warn">
      With <M>r=1,\ s=3</M>, <M>{'g(d)=f(d+3)'}</M> is just <M>f</M> slid 3 to the left: it is non-zero only for{' '}
      <M>{'-1.5\\le d\\le0'}</M>, so every &ldquo;distance&rdquo; is negative. It also keeps <M>f</M>&apos;s order: drag{' '}
      <M>h</M> up and the red dot moves right, as if a higher flip left a bigger gap. Switch the toggle off to fix both.
    </Notice>
  ) : (
    <Notice>
      Drag <M>h</M> up and watch <M>d</M> shrink: <M>d=3-h</M>. That reversal is the <M>r=-1</M>: the orange <M>g</M> is the
      blue <M>f</M> reflected in the dashed mirror line through 1.5, landing on <M>{'0\\le d\\le1.5'}</M> (the <M>s=3</M>). The dots
      stay level because <M>{'g(d)=f(3-d)'}</M>. Now try the toggle to see <M>r=1</M> fail.
    </Notice>
  )

  return (
    <div>
      <div className="flex items-stretch gap-2">
        <Room h={h} />
        <div className="min-w-0 flex-1">
          <Plane x={[-1.8, 3.3]} y={[0, 1.05]} xStep={0.5} yStep={0.25} height={260} xLabel="" yLabel="density"
            xLabels={v => (Math.abs(v + 1.5) < 1e-9 ? '-1.5' : Math.abs(v - 1.5) < 1e-9 ? '1.5' : Math.abs(v - 3) < 1e-9 ? '3' : '')}
            yLabels={() => ''}>
            {wrong && <Region top={() => 1.05} bottom={() => 0} from={-1.8} to={0} color={C.bad} opacity={0.08} />}
            {wrong && <Label at={[-0.9, 0.98]} attach="s" color={C.bad} size={12}>d &lt; 0: impossible</Label>}
            {!wrong && (
              <>
                <Line.Segment point1={[1.5, 0]} point2={[1.5, 1.0]} color={C.guide} style="dashed" weight={1.5} />
                <Label at={[1.5, 1.0]} attach="n" color={C.guide} size={11} gap={2}>mirror</Label>
              </>
            )}
            <Plot.OfX y={f} domain={[1.5, 3]} color={C.f} weight={3} />
            <Label at={[2.95, f(2.95)]} attach="ne" color={C.f}>f(h)</Label>
            <Plot.OfX y={g} domain={[gFrom, gTo]} color={gColor} weight={3} />
            <Label at={[wrong ? -1.45 : 0.05, g(wrong ? -1.45 : 0.05)]} attach="nw" color={gColor}>g(d)</Label>
            <Line.Segment point1={[d, fh]} point2={[h, fh]} color={C.guide} style="dashed" weight={1.5} />
            <Line.Segment point1={[h, 0]} point2={[h, fh]} color={C.f} style="dashed" weight={1.5} />
            <Line.Segment point1={[d, 0]} point2={[d, fh]} color={gColor} style="dashed" weight={1.5} />
            <Point x={h} y={fh} color={C.f} />
            <Point x={d} y={fh} color={gColor} />
            <Label at={[h, 0]} attach="n" color={C.f} size={12}>h</Label>
            <Label at={[d, 0]} attach="n" color={gColor} size={12}>d</Label>
          </Plane>
        </div>
      </div>
      <Controls>
        <Slider label="h" value={h} onChange={setH} min={1.5} max={3} step={0.01} format={v => `${v.toFixed(2)} m`} />
        <Buttons>
          <Toggle label="Try r = 1, s = 3 instead" checked={wrong} onChange={setWrong} />
        </Buttons>
        <Readouts>
          <Readout color={gColor} tex={wrong ? `h=d+3\\implies d=h-3=${d.toFixed(2)}` : `d=3-h=3-${h.toFixed(2)}=${d.toFixed(2)}`} />
          <Readout
            color={gColor}
            tex={
              wrong
                ? `g(${d.toFixed(2)})=f(${d.toFixed(2)}+3)=f(${h.toFixed(2)})=${fh.toFixed(3)}`
                : `g(${d.toFixed(2)})=f(-${d.toFixed(2)}+3)=f(${h.toFixed(2)})=${fh.toFixed(3)}`
            }
          />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
