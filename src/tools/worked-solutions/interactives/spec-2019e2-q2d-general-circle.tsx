// 2019 Specialist Exam 2 Q2d — for az² + bz + c = 0 with b² < 4ac the roots are the conjugate pair
// −b/(2a) ± (√(4ac − b²)/(2|a|)) i, straight above and below −b/(2a). The smallest circle through
// them is centred at the real part (so −p = −b/(2a), p = b/(2a)) with radius the SIZE of the
// imaginary part, q = √(4ac − b²)/(2|a|). Sliders for a, b, c; "Multiply by −1" keeps the same roots
// but flips the sign of a. Toggles show the report's two slips: p = −b/(2a) (centre mirrored to the
// wrong side) and q = √(4ac − b²)/(2a) (a negative "radius" once a < 0).

import { useState } from 'react'
import { ActionButton, Buttons, C, Circle, Controls, Label, Line, M, Notice, Plane, Point, Readout, Readouts, Slider, Toggle, num, tick } from './kit'

/** Tick numbers only inside the requested range (the padding beyond it would put a tick under the axis names). */
const inRange = (lo: number, hi: number) => (v: number) => (v < lo - 1e-9 || v > hi + 1e-9 ? '' : tick(v))

/** "2z^2+4z+5=0" style TeX for the current coefficients. */
function poly(a: number, b: number, c: number) {
  const coef = (v: number, first: boolean) => {
    const s = Math.abs(v) === 1 ? '' : num(Math.abs(v), Number.isInteger(v) ? 0 : 1)
    return `${v < 0 ? '-' : first ? '' : '+'}${s}`
  }
  let t = `${coef(a, true)}z^2`
  if (b !== 0) t += `${coef(b, false)}z`
  if (c !== 0) t += `${c < 0 ? '-' : '+'}${num(Math.abs(c), Number.isInteger(c) ? 0 : 1)}`
  return `${t}=0`
}

export default function GeneralCircle() {
  const [a, setA] = useState(2)
  const [b, setB] = useState(4)
  const [c, setC] = useState(5)
  const [slipP, setSlipP] = useState(false)
  const [slipQ, setSlipQ] = useState(false)

  const disc = b * b - 4 * a * c
  const complex = disc < 0
  const re = -b / (2 * a) // real part of both roots = the centre, −p
  const p = b / (2 * a)
  const q = complex ? Math.sqrt(-disc) / (2 * Math.abs(a)) : 0
  const qSlip = complex ? Math.sqrt(-disc) / (2 * a) : 0

  const setAnz = (v: number) => setA(v === 0 ? (a > 0 ? -0.5 : 0.5) : v) // a = 0 is not a quadratic

  const notices = []
  if (!complex) {
    notices.push(
      <Notice key="real" tone="warn">
        Here <M>{'b^2-4ac=' + num(disc, 2)}</M> is not negative, so the roots are <b>real</b> and the question rules
        this case out. Change <M>a</M>, <M>b</M> or <M>c</M> until <M>{'b^2<4ac'}</M> again.
      </Notice>,
    )
  } else {
    if (slipP)
      notices.push(
        <Notice key="p" tone="warn">
          The red dashed circle uses <M>{'p=-\\tfrac{b}{2a}'}</M>, so its centre <M>-p</M> is at{' '}
          <M>{'+\\tfrac{b}{2a}=' + num(-re)}</M>:{' '}
          {Math.abs(re) > 1e-9
            ? 'the mirror image of the true centre, and it misses both roots.'
            : 'with b = 0 the two centres coincide at 0, so the slip is hidden here; move b away from 0 to see it.'}{' '}
          The
          centre of <M>{'|z+p|=q'}</M> is <M>-p</M>, and it must equal the real part <M>{'-\\tfrac{b}{2a}'}</M>, so{' '}
          <M>{'p=\\tfrac{b}{2a}'}</M>.
        </Notice>,
      )
    if (slipQ)
      notices.push(
        a < 0 ? (
          <Notice key="q" tone="warn">
            With <M>{'a<0'}</M> the slip gives <M>{'\\tfrac{\\sqrt{4ac-b^2}}{2a}=' + num(qSlip)}</M>, a{' '}
            <b>negative</b> radius, which no circle has. The roots are <M>{'\\pm\\tfrac{\\sqrt{4ac-b^2}}{2a}i'}</M> from
            the centre; the radius is the <em>size</em> of that, so divide by <M>{'2|a|'}</M>.
          </Notice>
        ) : (
          <Notice key="q">
            With <M>{'a>0'}</M>, <M>{'2a=2|a|'}</M>, so the slip happens to give the right radius here, which is why it
            is easy to miss. Press <b>Multiply by −1</b>: the new equation has exactly the same roots, so the circle
            cannot change, but the slipped formula flips sign.
          </Notice>
        ),
      )
    if (!slipP && !slipQ)
      notices.push(
        a > 0 ? (
          <Notice key="ok">
            The roots are <M>{'-\\tfrac{b}{2a}\\pm\\tfrac{\\sqrt{4ac-b^2}}{2|a|}i'}</M>: straight above and below the
            real number <M>{'-\\tfrac{b}{2a}'}</M>. As in part b., the smallest circle has them at the ends of a
            diameter, so its centre is that real part and its radius is the height of the top root. Try other{' '}
            <M>a,b,c</M>, then press <b>Multiply by −1</b>.
          </Notice>
        ) : (
          <Notice key="ok" tone="good">
            Now <M>{'a<0'}</M>. The circle still passes through both roots, and <M>{'q=\\tfrac{\\sqrt{4ac-b^2}}{2|a|}'}</M>{' '}
            is still positive because of the <M>{'|a|'}</M>. Turn on the second slip to see what goes wrong without it.
          </Notice>
        ),
      )
  }

  if (complex && (Math.abs(re) + q > 3.5 || q > 2.5))
    notices.push(
      <Notice key="off">
        Part of the circle runs off the diagram for these coefficients; the readouts still give its centre and radius.
      </Notice>,
    )

  return (
    <div>
      <Plane x={[-3.5, 3.5]} y={[-2.5, 2.5]} equalScale height={330} xLabel="" yLabel="Im" xLabels={inRange(-3.5, 3.5)} yLabels={inRange(-2.5, 2.5)}>
        <Label at={[3.5, 0]} attach="n" size={14} italic>Re</Label>
        {complex && (
          <>
            <Circle center={[re, 0]} radius={q} color={C.good} fillOpacity={0.08} weight={2.5} />
            {slipP && Math.abs(re) > 1e-9 && (
              <Circle center={[-re, 0]} radius={q} color={C.bad} fillOpacity={0} weight={2.5} strokeStyle="dashed" />
            )}
            <Line.Segment point1={[re, 0]} point2={[re, q]} color={C.violet} weight={3} />
            <Label at={[re, q / 2]} attach={re > 0 ? 'e' : 'w'} color={C.violet}>q</Label>
            <Point x={re} y={0} color={C.good} />
            <Label at={[re, 0]} attach={re > 0 ? 'nw' : 'ne'} color={C.good}>−p</Label>
            <Point x={re} y={q} color={C.f} />
            <Point x={re} y={-q} color={C.f} />
          </>
        )}
        {!complex &&
          (disc === 0
            ? [-b / (2 * a)]
            : [(-b - Math.sqrt(disc)) / (2 * a), (-b + Math.sqrt(disc)) / (2 * a)]
          ).map((x, i) => <Point key={i} x={x} y={0} color={C.bad} />)}
      </Plane>
      <Controls>
        <Slider label="a" value={a} onChange={setAnz} min={-3} max={3} step={0.5} format={v => v.toFixed(1)} />
        <Slider label="b" value={b} onChange={setB} min={-4} max={4} step={0.5} format={v => v.toFixed(1)} />
        <Slider label="c" value={c} onChange={setC} min={-6} max={6} step={0.5} format={v => v.toFixed(1)} />
        <Buttons>
          <ActionButton
            label="Multiply by −1"
            onClick={() => {
              setA(-a)
              setB(-b)
              setC(-c)
            }}
          />
          <ActionButton
            label="Back to 2z² + 4z + 5"
            onClick={() => {
              setA(2)
              setB(4)
              setC(5)
            }}
          />
        </Buttons>
        <Buttons>
          <Toggle label="Slip: p = −b/(2a)" checked={slipP} onChange={setSlipP} />
          <Toggle label="Slip: q = √(4ac − b²)/(2a)" checked={slipQ} onChange={setSlipQ} />
        </Buttons>
        <div className="[&_.katex]:pointer-events-none">
        <Readouts>
          <Readout tex={poly(a, b, c)} />
          {complex && <Readout color={C.good} tex={`-p=-\\tfrac{b}{2a}=${num(re)},\\ \\ p=${num(p)}`} />}
          {complex && <Readout color={C.violet} tex={`q=\\tfrac{\\sqrt{4ac-b^2}}{2|a|}=${num(q)}`} />}
          {complex && slipQ && <Readout color={qSlip < 0 ? C.bad : C.guide} tex={`\\tfrac{\\sqrt{4ac-b^2}}{2a}=${num(qSlip)}`} />}
        </Readouts>
        </div>
        {notices}
      </Controls>
    </div>
  )
}
