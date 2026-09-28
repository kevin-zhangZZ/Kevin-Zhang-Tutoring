// 2019 Methods Exam 2 MCQ 9 — the question gives the IMAGE (the origin) and asks for the point
// that T sends there. Drag the sky-blue point P = (a, b), or jump to an answer option, and watch
// where T puts it: the matrix first sends P to the violet point (x halved; y doubled and flipped),
// then the translation (−½, −2) moves it to the orange image. Only (1, −1), option E, lands on the
// origin; option B's image is (−1, −4). A toggle draws the backward route from the origin: undo
// the translation first (add ½ and 2), then undo the dilations (double x, divide y by −2).

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, MovablePoint, Notice, Plane, Point, Readout, Readouts, Toggle, Vector, clamp } from './kit'

type Pt = [number, number]
const stage1 = ([x, y]: Pt): Pt => [x / 2, -2 * y]
const T = ([x, y]: Pt): Pt => [x / 2 - 1 / 2, -2 * y - 2]

const OPTIONS: { letter: string; p: Pt }[] = [
  { letter: 'A', p: [1, 1] },
  { letter: 'B', p: [-1, 1] },
  { letter: 'C', p: [-1, 0] },
  { letter: 'D', p: [0, 1] },
  { letter: 'E', p: [1, -1] },
]

/** A multiple of ¼ as TeX: integers as is, otherwise a fraction. */
function tex(v: number): string {
  const n = Math.round(v * 4)
  const sign = n < 0 ? '-' : ''
  const a = Math.abs(n)
  if (a % 4 === 0) return String(n / 4)
  if (a % 2 === 0) return `${sign}\\tfrac{${a / 2}}{2}`
  return `${sign}\\tfrac{${a}}{4}`
}
const par = (v: number) => `(${tex(v)})`
const plain = (v: number) => {
  const n = Math.round(v * 4)
  const s = n % 4 === 0 ? String(Math.abs(n / 4)) : n % 2 === 0 ? `${Math.abs(n / 2)}/2` : `${Math.abs(n)}/4`
  return (n < 0 ? '−' : '') + s
}
const same = (p: Pt, q: Pt) => Math.abs(p[0] - q[0]) < 1e-9 && Math.abs(p[1] - q[1]) < 1e-9

export default function Image() {
  const [p, setP] = useState<Pt>([-1, 1])
  const [back, setBack] = useState(false)

  const s1 = stage1(p)
  const img = T(p)
  const hit = same(img, [0, 0])
  const option = OPTIONS.find(o => same(o.p, p))

  let notice
  if (hit) {
    notice = (
      <Notice tone="good">
        <M>{'(1,-1)'}</M> lands exactly on the origin: halving <M>1</M> gives <M>{'\\tfrac12'}</M> and the shift left by{' '}
        <M>{'\\tfrac12'}</M> gives <M>0</M>; doubling and flipping <M>-1</M> gives <M>2</M> and the shift down by{' '}
        <M>2</M> gives <M>0</M>. That is option E, and no other point works, because each equation has only one
        solution.
      </Notice>
    )
  } else if (option?.letter === 'B') {
    notice = (
      <Notice tone="warn">
        Option B, <M>{'(-1,1)'}</M>, comes from moving the translation across without changing its sign:{' '}
        <M>{'\\tfrac12 a = -\\tfrac12'}</M> and <M>{'-2b = -2'}</M>. Its image is <M>{'(-1,-4)'}</M>, nowhere near
        the origin. Drag <M>P</M> until the orange image sits on the green origin, or try E.
      </Notice>
    )
  } else if (option?.letter === 'A') {
    notice = (
      <Notice tone="warn">
        Option A gets <M>a = 1</M> right, so the image is on the <M>y</M>-axis, but it is at <M>{'(0,-4)'}</M>. The{' '}
        <M>-2</M> flips the sign of <M>y</M>, so to end at <M>0</M> after shifting down <M>2</M>, the point needs a{' '}
        <b>negative</b> <M>b</M>.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Drag <M>P</M> (or try an option) until the orange image sits on the green origin. Notice the image moves only{' '}
        <b>half as far</b> sideways as <M>P</M>, and <b>twice as far, the opposite way</b>, up and down: that is the
        matrix at work, before the translation shifts everything by <M>{'(-\\tfrac12,-2)'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-2.5, 2.5]} y={[-4.3, 2.4]} xStep={1} yStep={1} height={340}>
        <Line.Segment point1={p} point2={s1} color={C.violet} style="dashed" weight={2} />
        <Line.Segment point1={s1} point2={img} color={C.g} style="dashed" weight={2} />
        <Point x={s1[0]} y={s1[1]} color={C.violet} />
        {!(back && same(s1, [0.5, 2])) && (
          <Label at={s1} attach={s1[0] <= 0 ? 'w' : 'e'} color={C.violet}>
            after the matrix
          </Label>
        )}
        {back && (
          <>
            <Vector tail={[0, 0]} tip={[0.5, 2]} color={C.good} />
            <Vector tail={[0.5, 2]} tip={[1, -1]} color={C.good} />
            <Label at={[0.5, 2]} attach="e" color={C.good}>(1/2, 2)</Label>
          </>
        )}
        <Point x={0} y={0} color={C.good} />
        <Point x={img[0]} y={img[1]} color={hit ? C.good : C.g} />
        {!hit && (
          <Label at={img} attach={img[0] > 0 || img[0] <= -1.4 ? 'e' : 'w'} color={C.g}>
            image
          </Label>
        )}
        <Label at={[0, 0]} attach="ne" color={C.good}>
          {hit ? 'image = (0, 0)' : 'target (0, 0)'}
        </Label>
        <MovablePoint
          point={p}
          onMove={q => setP([clamp(Math.round(q[0] * 2) / 2, -2.5, 2.5), clamp(Math.round(q[1] * 2) / 2, -1, 1)])}
          color={C.f}
        />
        <Label at={p} attach={p[0] > 1.5 || (p[0] <= 0 && p[0] > -1.5) ? 'w' : 'e'} color={C.f} gap={12}>
          {`P (${plain(p[0])}, ${plain(p[1])})`}
        </Label>
      </Plane>
      <Controls>
        <Buttons>
          {OPTIONS.map(o => (
            <ActionButton key={o.letter} label={`${o.letter}: (${plain(o.p[0])}, ${plain(o.p[1])})`} onClick={() => setP(o.p)} />
          ))}
        </Buttons>
        <Toggle label="Work backwards from the origin" checked={back} onChange={setBack} />
        <Readouts>
          <Readout color={hit ? C.good : C.g} tex={`x' = \\tfrac12 x - \\tfrac12 = \\tfrac12${par(p[0])} - \\tfrac12 = ${tex(img[0])}`} />
          <Readout color={hit ? C.good : C.g} tex={`y' = -2y - 2 = -2${par(p[1])} - 2 = ${tex(img[1])}`} />
        </Readouts>
        {notice}
        {back && (
          <Notice>
            <b>Backwards, in reverse order.</b> <M>T</M> dilates first and translates last, so undo the translation
            first: add <M>{'\\tfrac12'}</M> and <M>2</M>, taking the origin to <M>{'(\\tfrac12, 2)'}</M>. Then undo the
            dilations: double the <M>x</M> and divide the <M>y</M> by <M>-2</M>, which gives <M>{'(1,-1)'}</M>.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
