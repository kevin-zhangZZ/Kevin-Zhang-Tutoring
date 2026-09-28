// 2018 Specialist Exam 2 MCQ 17 — why the dropped camera takes 3.4 s, not 3.2 s. Height against
// time for the camera, h = 50 + 2t − 4.9t² (upwards positive, released at 50 m while rising at
// 2 m/s with the balloon), beside the balloon's own line h = 50 + 2t. Slide or play t: the camera
// keeps rising for 0.20 s, is back at 50 m at t = 4/9.8 ≈ 0.41 s moving DOWN at 2 m/s, and from
// there it is exactly a camera thrown down at 2 m/s (3.00 s more, option C's number), landing at
// 3.40 s. The toggle overlays the wrong reading of "drops" as "from rest", h = 50 − 4.9t², which
// lands at 3.19 s (option D, the report's comment). A second toggle zooms in on the first 0.7 s,
// where the 0.20 m rise to 50.20 m and the return to 50 m are visible.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, Toggle, usePlayer } from './kit'

const G = 9.8
const H0 = 50
const U = 2
const h = (t: number) => H0 + U * t - (G / 2) * t * t
const v = (t: number) => U - G * t
const hRest = (t: number) => H0 - (G / 2) * t * t
const T_LAND = (U + Math.sqrt(U * U + 2 * G * H0)) / G // 3.4050
const T_REST = Math.sqrt((2 * H0) / G) // 3.1944
const T_TOP = U / G // 0.2041
const T_BACK = (2 * U) / G // 0.4082
const T_DOWN = (-U + Math.sqrt(U * U + 2 * G * H0)) / G // 2.9968: thrown down at 2 m/s from 50 m

const f2 = (x: number) => x.toFixed(2)

export default function UpThenDownWidget() {
  const [t, setT] = useState(T_BACK)
  const [rest, setRest] = useState(false)
  const [zoom, setZoom] = useState(false)
  const player = usePlayer(setT, { min: 0, max: T_LAND, seconds: 7 })

  const ht = Math.max(0, h(t))
  const vt = v(t)
  const tr = Math.min(t, T_REST)
  const landed = t >= T_LAND - 0.005

  let notice
  let tone: 'neutral' | 'good' | 'warn' = 'neutral'
  if (rest && t >= T_REST - 0.005) {
    tone = 'warn'
    notice = (
      <>
        The red camera was let go with <M>u = 0</M>, so it never rises: it hits the ground at <M>{`t \\approx ${f2(T_REST)}`}</M> s,
        option D. The real camera is still in the air: it began by moving <em>up</em> with the balloon, and that detour costs time.
      </>
    )
  } else if (landed) {
    tone = 'good'
    notice = (
      <>
        Ground at <M>{`t \\approx ${f2(T_LAND)}`}</M> s: the <M>0.41</M> s up-and-back trip plus the <M>3.00</M> s from the release
        height, thrown down at <M>{'2\\ \\text{m s}^{-1}'}</M>. Turn on the toggle and replay to watch a camera dropped from rest
        land first.
      </>
    )
  } else if (t < T_TOP - 0.01) {
    notice = (
      <>
        Letting go does not stop the camera: at release it moves up at <M>{'2\\ \\text{m s}^{-1}'}</M>, just like the balloon.
        Gravity slows it, <M>v = 2 - 9.8t</M>, so for a moment it keeps climbing. Press play or drag <M>t</M>.
      </>
    )
  } else if (t < T_BACK - 0.02) {
    notice = (
      <>
        At <M>{`t = \\tfrac{2}{9.8} \\approx ${f2(T_TOP)}`}</M> s the velocity reaches zero: the camera is at its highest point,{' '}
        <M>0.20</M> m above where it was let go{zoom ? '' : ' (turn on the zoom to see it)'}. Now it starts to fall.
      </>
    )
  } else if (t <= T_BACK + 0.03) {
    notice = (
      <>
        Back at <M>50</M> m at <M>{`t = \\tfrac{4}{9.8} \\approx ${f2(T_BACK)}`}</M> s, now moving <em>down</em> at{' '}
        <M>{'2\\ \\text{m s}^{-1}'}</M> (the rise and fall are mirror images). From here it is a camera <em>thrown down</em> at{' '}
        <M>{'2\\ \\text{m s}^{-1}'}</M>, which takes <M>{`${f2(T_DOWN)}`}</M> s more: option C's number, but only the second half of the trip.
      </>
    )
  } else {
    notice = (
      <>
        Falling, and speeding up by <M>{'9.8\\ \\text{m s}^{-1}'}</M> every second. The balloon (orange) keeps rising at a steady{' '}
        <M>{'2\\ \\text{m s}^{-1}'}</M>; once the camera leaves the basket, only gravity acts on it.
      </>
    )
  }

  return (
    <div>
      <Plane
        key={zoom ? 'zoom' : 'full'}
        x={zoom ? [0, 0.7] : [0, 3.6]}
        y={zoom ? [48.6, 50.8] : [0, 60]}
        xStep={zoom ? 0.1 : 0.5}
        yStep={zoom ? 0.2 : 10}
        height={330}
        xLabel="t"
        yLabel="h"
        xLabels={x => (zoom ? (Math.round(x * 10) % 2 === 0 ? x.toFixed(1) : '') : Number.isInteger(x) ? String(x) : '')}
        yLabels={y => (zoom ? (Math.round(y * 10) % 4 === 0 && y > 48.6 && y < 50.8 ? y.toFixed(1) : '') : String(y))}
      >
        {/* Release height, for the "back at 50 m" moment. */}
        <Line.Segment point1={[0, H0]} point2={[3.6, H0]} color={C.guide} style="dashed" weight={1} />
        {!zoom && <Label at={[3.6, H0]} attach="sw" color={C.guide} size={12}>50 m</Label>}
        {/* The balloon keeps rising at 2 m/s. */}
        <Plot.OfX y={x => H0 + U * x} domain={[0, 3.6]} color={C.g} weight={2} />
        {zoom ? (
          <Label at={[0.3, H0 + U * 0.3]} attach="nw" color={C.g} size={12} gap={6}>balloon</Label>
        ) : (
          <Label at={[2.6, H0 + U * 2.6]} attach="n" color={C.g} size={12} gap={8}>balloon</Label>
        )}
        {rest && (
          <>
            <Plot.OfX y={hRest} domain={[0, T_REST]} color={C.bad} weight={2} style="dashed" />
            <Point x={T_REST} y={0} color={C.bad} />
            <Label at={[T_REST, 0]} attach="nw" color={C.bad} size={12} gap={6}>{f2(T_REST)}</Label>
            <Point x={tr} y={hRest(tr)} color={C.bad} />
          </>
        )}
        <Plot.OfX y={h} domain={[0, T_LAND]} color={C.f} weight={2.5} />
        <Label at={zoom ? [0.55, h(0.55)] : [1.35, h(1.35)]} attach="sw" color={C.f} size={12} gap={8}>camera</Label>
        {!zoom && <Point x={T_LAND} y={0} color={C.good} />}
        {!zoom && <Label at={[T_LAND, 0]} attach="n" color={C.good} size={12} gap={8}>{f2(T_LAND)}</Label>}
        {zoom && <Point x={T_TOP} y={h(T_TOP)} color={C.violet} />}
        {zoom && <Label at={[T_TOP, h(T_TOP)]} attach="s" color={C.violet} size={12} gap={6}>top: 50.20 m</Label>}
        {/* Where the camera is back at the release height, heading down. */}
        <Point x={T_BACK} y={H0} color={C.violet} />
        {zoom && <Label at={[T_BACK, H0]} attach="ne" color={C.violet} size={12} gap={6}>back at 50 m</Label>}
        {/* Now: the balloon above, the camera on its curve. */}
        <Line.Segment point1={[t, 0]} point2={[t, H0 + U * t]} color={C.guide} weight={1} />
        <Point x={t} y={H0 + U * t} color={C.g} />
        <Point x={t} y={ht} color={C.f} />
      </Plane>
      <Controls>
        <Slider label="t" value={t} onChange={x => { player.stop(); setT(x) }} min={0} max={T_LAND} step={0.01} format={x => `${f2(x)} s`} />
        <Readouts>
          <Readout tex={`h = 50 + 2t - 4.9t^2 \\approx ${f2(ht)}\\ \\text{m}`} color={C.f} />
          <Readout tex={`v = 2 - 9.8t \\approx ${f2(vt)}\\ \\text{m s}^{-1}`} color={C.f} />
        </Readouts>
        <div className="flex flex-wrap items-center gap-3">
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Play the fall" />
          <Toggle label="Zoom in on the release" checked={zoom} onChange={setZoom} />
          <Toggle label={<>Wrong idea: "drops" means from rest</>} checked={rest} onChange={setRest} />
        </div>
        <Notice tone={tone}>{notice}</Notice>
      </Controls>
    </div>
  )
}
