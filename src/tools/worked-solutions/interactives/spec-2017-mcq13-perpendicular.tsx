// 2017 Specialist Exam 2 MCQ 13 — the vector resolute of a in the direction of b is the multiple λb
// that leaves a − λb perpendicular to b. Drawn in the plane containing the question's a = 3i − 4j + 12k
// and b = 2i + 2j − k at true lengths and angle: b along the horizontal (|b| = 3), a of length 13 at
// the angle with cos θ = a·b/(|a||b|) = −14/39 (about 111°). A slider moves λ; the readout
// (a − λb)·b = a·b − λ|b|² = −14 − 9λ is zero only at λ = −14/9 (option C), where a right angle
// appears — which is exactly why the formula divides by |b|² = 9. The option-B button puts
// λ = −14/3 (scalar resolute times b, not b̂): three times too far, the remainder is not
// perpendicular, and the "resolute" would be 14 long, longer than a itself (13).

import { useState } from 'react'
import { ActionButton, Buttons, C, Controls, Label, Line, M, Notice, Plane, Polygon, Readout, Readouts, Slider, Vector, num } from './kit'

const AB = -14
const BB = 9
const AA = 169
const LB = 3
/** a in the plane of a and b, with b along the horizontal. */
const AX = AB / LB
const AY = Math.sqrt(AA - AX * AX)
const RIGHT = AB / BB
const WRONG = AB / LB

export default function PerpendicularWidget() {
  const [lam, setLam] = useState(-0.6)

  const foot: [number, number] = [lam * LB, 0]
  const dotRem = AB - lam * BB
  const perp = Math.abs(dotRem) < 0.02
  const len = Math.abs(lam) * LB
  const move = (v: number) => setLam(Math.abs(v - RIGHT) < 0.03 ? RIGHT : Math.abs(v - WRONG) < 0.03 ? WRONG : v)
  const atWrong = Math.abs(lam - WRONG) < 1e-9
  const remColor = perp ? C.good : C.bad

  // Right-angle marker at the foot, on the side of the remainder.
  const s = 0.7
  const sq: [number, number][] = [
    [foot[0], 0],
    [foot[0] + s, 0],
    [foot[0] + s, s],
    [foot[0], s],
  ]

  let notice
  if (perp) {
    notice = (
      <Notice tone="good">
        <b>
          <M>{'\\lambda = -\\tfrac{14}{9}'}</M>: the leftover <M>{'\\underset{\\sim}{a} - \\lambda\\underset{\\sim}{b}'}</M> is
          perpendicular to <M>{'\\underset{\\sim}{b}'}</M>
        </b>
        , so <M>{'-\\tfrac{14}{9}\\underset{\\sim}{b}'}</M> is the shadow of <M>{'\\underset{\\sim}{a}'}</M> on the line of{' '}
        <M>{'\\underset{\\sim}{b}'}</M>: the vector resolute. Setting <M>{'(\\underset{\\sim}{a}-\\lambda\\underset{\\sim}{b})\\cdot\\underset{\\sim}{b} = 0'}</M>{' '}
        gives <M>{'\\lambda = \\tfrac{\\underset{\\sim}{a}\\cdot\\underset{\\sim}{b}}{|\\underset{\\sim}{b}|^2}'}</M>. That is where
        the square comes from. Its length, <M>{'\\tfrac{14}{3}'}</M>, is the size of the scalar resolute.
      </Notice>
    )
  } else if (atWrong) {
    notice = (
      <Notice tone="warn">
        <b>Option B overshoots.</b> <M>{'-\\tfrac{14}{3}\\underset{\\sim}{b}'}</M> is <M>14</M> units long, longer than{' '}
        <M>{'\\underset{\\sim}{a}'}</M> itself (<M>13</M>). No shadow can be longer than the vector casting it, and the leftover
        is clearly not at right angles. <M>{'-\\tfrac{14}{3}'}</M> is the right <em>length</em>, but multiplying by{' '}
        <M>{'\\underset{\\sim}{b}'}</M> (length <M>3</M>) instead of <M>{'\\hat{\\underset{\\sim}{b}}'}</M> (length <M>1</M>)
        stretches it three times too far.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        Slide <M>{'\\lambda'}</M> to move the purple multiple <M>{'\\lambda\\underset{\\sim}{b}'}</M> along the line of{' '}
        <M>{'\\underset{\\sim}{b}'}</M>. The vector resolute is the one whose leftover{' '}
        <M>{'\\underset{\\sim}{a} - \\lambda\\underset{\\sim}{b}'}</M> (red) meets that line at a right angle, which happens
        when the readout is <M>0</M>. Since <M>{'\\underset{\\sim}{a}\\cdot\\underset{\\sim}{b}'}</M> is negative, look on the
        side opposite <M>{'\\underset{\\sim}{b}'}</M>.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[-15, 5]} y={[-1.5, 13.5]} equalScale height={380} xStep={1} yStep={1} labels={false} xLabel="" yLabel="">
        <Line.ThroughPoints point1={[0, 0]} point2={[1, 0]} color={C.guide} weight={1.5} />
        {perp && <Polygon points={sq} color={C.good} fillOpacity={0.15} weight={1.5} />}
        <Line.Segment point1={foot} point2={[AX, AY]} color={remColor} weight={2.5} style="dashed" />
        <Vector tail={[0, 0]} tip={[AX, AY]} color={C.g} weight={3} />
        {Math.abs(lam) > 0.02 && <Vector tail={[0, 0]} tip={foot} color={perp ? C.good : C.violet} weight={4} />}
        <Vector tail={[0, 0]} tip={[LB, 0]} color={C.f} weight={3} />
        <Label at={[0.4 * AX, 0.4 * AY]} attach={foot[0] < 0 ? 'e' : 'w'} color={C.g}>
          a
        </Label>
        <Label at={[LB / 2, 0]} attach="n" color={C.f}>
          b
        </Label>
        {Math.abs(lam) > 0.3 && (
          // Short multiples: label past the tip so it clears the y-axis; long ones: centred under the arrow.
          <Label
            at={foot[0] < 0 && foot[0] > -8 ? [foot[0], 0] : [foot[0] / 2, 0]}
            attach={foot[0] < 0 && foot[0] > -8 ? 'sw' : 's'}
            color={perp ? C.good : C.violet}
          >
            {`λb, length ${num(len, 2)}`}
          </Label>
        )}
        <Label at={[(foot[0] + AX) / 2, AY / 2]} attach={foot[0] < 0 ? 'w' : 'e'} color={remColor}>
          a − λb
        </Label>
      </Plane>
      <Controls>
        <Slider label="\lambda" value={lam} onChange={move} min={-5} max={1} step={0.01} format={v => num(v, 3)} />
        <Buttons>
          <ActionButton label={<>Option C: <M>{'\\lambda = -\\tfrac{14}{9}'}</M></>} onClick={() => setLam(RIGHT)} />
          <ActionButton label={<>Option B: <M>{'\\lambda = -\\tfrac{14}{3}'}</M></>} onClick={() => setLam(WRONG)} />
        </Buttons>
        <Readouts>
          <Readout
            tex={`(\\underset{\\sim}{a}-\\lambda\\underset{\\sim}{b})\\cdot\\underset{\\sim}{b} = -14 - 9\\lambda = ${num(dotRem, 2)}`}
            color={remColor}
          />
          <Readout tex={`|\\lambda\\underset{\\sim}{b}| = 3|\\lambda| = ${num(len, 2)}`} />
        </Readouts>
      </Controls>
      {notice}
      <p className="mt-1 text-[11.5px] text-gray-500 dark:text-gray-400">
        Drawn flat in the plane that contains <M>{'\\underset{\\sim}{a}'}</M> and <M>{'\\underset{\\sim}{b}'}</M>, at true lengths
        (<M>13</M> and <M>3</M>) and the true angle between them (about <M>{'111^\\circ'}</M>).
      </p>
    </div>
  )
}
