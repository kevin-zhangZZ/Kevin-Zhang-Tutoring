// 2020 Specialist Exam 2 Q4b.ii — where the aeroplane starts and which way it goes. Slide or play
// t from 0 to 12: the path r_A(t) = (450 − 150 sin(πt/6)) i + (400 − 200 cos(πt/6)) j is traced
// from t = 0 at (450, 200), and a table fills in the points a student can work out by hand
// (t = 0, 1, 3, 6, 9, 12). At t = 1 the plane is at (375, 226.8), left of where it started, so it
// goes bottom → left → top → right: clockwise. A toggle shows the anticlockwise guess failing.

import { useState } from 'react'
import { Buttons, C, Controls, Label, M, Notice, Plane, PlayButton, Plot, Point, Slider, Toggle, Vector, usePlayer } from './kit'

const W = Math.PI / 6
const xA = (t: number) => 450 - 150 * Math.sin(W * t)
const yA = (t: number) => 400 - 200 * Math.cos(W * t)

const ROWS: { t: number; x: string; y: string; where: string }[] = [
  { t: 0, x: '450', y: '200', where: 'bottom (start)' },
  { t: 1, x: '375', y: '226.8', where: 'left of the start' },
  { t: 3, x: '300', y: '400', where: 'left end' },
  { t: 6, x: '450', y: '600', where: 'top' },
  { t: 9, x: '600', y: '400', where: 'right end' },
  { t: 12, x: '450', y: '200', where: 'back to the start' },
]

export default function Direction() {
  const [t, setT] = useState(1)
  const [guess, setGuess] = useState(false)
  const player = usePlayer(setT, { min: 0, max: 12, seconds: 9 })

  const px = xA(t)
  const py = yA(t)
  // Direction of motion: the velocity, scaled to a fixed arrow length.
  const dx = -25 * Math.PI * Math.cos(W * t)
  const dy = ((100 * Math.PI) / 3) * Math.sin(W * t)
  const len = Math.hypot(dx, dy)
  const tip: [number, number] = [px + (55 * dx) / len, py + (55 * dy) / len]

  let notice
  if (guess) {
    notice = (
      <Notice tone="warn">
        Anticlockwise from the bottom would mean moving <b>right</b>, so <M>x</M> would rise above 450. But at{' '}
        <M>t=1</M>, <M>{'x = 450-150\\sin\\left(\\tfrac{\\pi}{6}\\right) = 375'}</M>, which is less than 450: the plane went
        left. The minus sign in front of <M>{'150\\sin'}</M> is what reverses the usual direction.
      </Notice>
    )
  } else if (t < 0.15) {
    notice = (
      <Notice>
        At <M>t=0</M>: <M>{'\\sin 0 = 0'}</M> and <M>{'\\cos 0 = 1'}</M>, so the plane is at{' '}
        <M>{'(450,\\ 400-200) = (450,\\ 200)'}</M>, the bottom of the ellipse. That point, with its coordinates, is one of
        the three things the marker looks for. Nudge <M>t</M> up to see which way it heads.
      </Notice>
    )
  } else if (t < 3) {
    notice = (
      <Notice>
        <M>x</M> has dropped below 450 while <M>y</M> climbs: the plane leaves the bottom heading left and up. Moving left
        along the bottom of a loop is <b>clockwise</b>. One extra point (<M>t=1</M>) or the sign of{' '}
        <M>{'\\dot x(0) = -25\\pi'}</M> settles the arrow without drawing the whole lap.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone={t > 11.9 ? 'good' : 'neutral'}>
        Bottom, left end, top, right end, bottom: that order is <b>clockwise</b>. One lap takes{' '}
        <M>{'2\\pi \\div \\tfrac{\\pi}{6} = 12'}</M> seconds, so at <M>t=12</M> the plane is back at{' '}
        <M>(450,\ 200)</M> and repeats the same loop for ever.
      </Notice>
    )
  }

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-[3fr_2fr] items-center">
        <Plane x={[170, 730]} y={[150, 650]} xStep={50} yStep={50} equalScale height={340} labels={false} xLabel="" yLabel="">
          <Plot.Parametric xy={u => [xA(u), yA(u)]} domain={[0, 12]} color={C.guide} weight={1.5} style="dashed" />
          {t > 0.01 && <Plot.Parametric xy={u => [xA(u), yA(u)]} domain={[0, t]} color={C.f} weight={3.5} />}
          {ROWS.filter(r => r.t > 0 && r.t < 12 && t >= r.t).map(r => (
            <Point key={r.t} x={xA(r.t)} y={yA(r.t)} color={C.ink} />
          ))}
          {t >= 3 && <Label at={[300, 400]} attach="w" size={11}>t = 3</Label>}
          {t >= 6 && <Label at={[450, 600]} attach="n" size={11}>t = 6</Label>}
          {t >= 9 && <Label at={[600, 400]} attach="e" size={11}>t = 9</Label>}
          <Point x={450} y={200} color={C.good} />
          <Label at={[450, 200]} attach="s" color={C.good} size={12}>t = 0: (450, 200)</Label>
          {guess && <Vector tail={[450, 200]} tip={[520, 200]} color={C.bad} weight={3} />}
          {guess && <Label at={[520, 200]} attach="e" color={C.bad} size={11}>anticlockwise?</Label>}
          <Vector tail={[px, py]} tip={tip} color={C.f} weight={3} />
          <Point x={px} y={py} color={C.f} />
        </Plane>
        <table className="text-[12.5px] w-full border-collapse text-gray-700 dark:text-gray-300">
          <thead>
            <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
              <th className="py-1 pr-2 font-semibold"><M>t</M></th>
              <th className="py-1 pr-2 font-semibold"><M>x</M></th>
              <th className="py-1 pr-2 font-semibold"><M>y</M></th>
              <th className="py-1 font-semibold">where</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(r => {
              const shown = t >= r.t - 1e-9
              return (
                <tr key={r.t} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="py-1 pr-2">{r.t}</td>
                  <td className="py-1 pr-2">{shown ? r.x : '?'}</td>
                  <td className="py-1 pr-2">{shown ? r.y : '?'}</td>
                  <td className="py-1 text-gray-500 dark:text-gray-400">{shown ? r.where : ''}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <Controls>
        <Slider
          label="t"
          value={t}
          onChange={v => {
            player.stop()
            setT(v)
          }}
          min={0}
          max={12}
          step={0.05}
        />
        <Buttons>
          <PlayButton playing={player.playing} onClick={() => player.toggle(t)} label="Trace one lap" />
          <Toggle label="Guess anticlockwise?" checked={guess} onChange={setGuess} />
        </Buttons>
        {notice}
      </Controls>
    </div>
  )
}
