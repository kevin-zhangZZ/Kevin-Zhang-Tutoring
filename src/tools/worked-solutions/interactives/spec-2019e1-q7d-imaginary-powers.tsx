// 2019 Specialist Exam 1 Q7d — why (3 − √3 i)ⁿ is purely imaginary exactly when n = 6k + 3, k ∈ Z.
// Same picture as part c. (PowersPicture from spec-2019e1-q7c-real-powers.tsx): zⁿ = (2√3)ⁿ cis(−nπ/6)
// turns π/6 clockwise per factor of z. The first landing on the imaginary axis is n = 3 (three turns
// = −π/2, part b.'s z³ = −24√3 i, straight down); after that every half-turn (6 more powers) lands on
// the imaginary axis again, alternately straight up (n = 9, z⁹ = (2√3)⁹ i) and straight down. So the
// answer is "first solution + multiples of the gap": n = 3 + 6k, the green 6k+3 column. Negative n
// work too (z⁻³ = (√3/72) i). The toggle shows the wrong idea "n is a multiple of 3", which also picks
// the 6k column, where zⁿ is real (z⁶ = −1728 is not ai for any real a).

import { useState } from 'react'
import { C, Controls, M, Notice, Readout, Readouts, Toggle } from './kit'
import { PowerControls, PowersPicture, argStep, landingTex, mod, piTex, powerReadouts } from './spec-2019e1-q7c-real-powers'

export default function ImaginaryPowers() {
  const [n, setN] = useState(3)
  const [wrong, setWrong] = useState(false)
  const imag = mod(n, 6) === 3
  const real = mod(n, 6) === 0
  const r = powerReadouts(n)
  const land = landingTex(n)
  const zn = `z^{${n}}`
  const up = argStep(n) === 3

  let notice
  if (wrong) {
    notice = (
      <Notice tone="warn">
        <b>&ldquo;<M>n</M> is a multiple of 3&rdquo;</b> picks the red dashed cells: the green <M>6k+3</M> column, but also the{' '}
        <M>6k</M> column. Click <M>6</M>: six turns is a half-turn, <M>{'z^6 = -1728'}</M>, on the <em>real</em> axis. That is
        not <M>ai</M> for any real <M>a</M>. Only the <b>odd</b> multiples of 3 land on the imaginary axis.
      </Notice>
    )
  } else if (imag && n === 3) {
    notice = (
      <Notice tone="good">
        Three turns of <M>{'-\\tfrac{\\pi}{6}'}</M> make <M>{'-\\tfrac{\\pi}{2}'}</M>: <M>{'z^3 = -24\\sqrt3\\,i'}</M>, part b.&apos;s
        answer, straight down the imaginary axis. That&apos;s the <em>first</em> solution. Now press <b>× z</b> six times (or
        click <M>9</M>): six more turns is a half-turn, so where does it land?
      </Notice>
    )
  } else if (imag && n > 0) {
    notice = (
      <Notice tone="good">
        <M>{`${zn} = ${land}`}</M>: {up ? 'straight up' : 'straight down'} the imaginary axis, so it is <M>ai</M>
        {up ? (
          <>
            {' '}with <M>{'a > 0'}</M> this time
          </>
        ) : null}
        . Each half-turn (6 more powers) swaps between straight down and straight up, and
        both count. So the solutions are the first one, <M>3</M>, plus any number of 6s: <M>{'n = 3 + 6k'}</M>. Now try{' '}
        <M>n = -3</M>.
      </Notice>
    )
  } else if (imag) {
    notice = (
      <Notice tone="good">
        <M>{`${zn} = ${land}`}</M>: dividing by <M>z</M> turns the other way, and it still lands on the imaginary axis. So
        negative <M>k</M> count too: <M>{'n = 3 + 6k,\\ k \\in Z'}</M>, the whole green column. That is every odd multiple of{' '}
        <M>3</M>: <M>{'\\ldots,-9,-3,3,9,15,\\ldots'}</M>.
      </Notice>
    )
  } else if (real) {
    notice = (
      <Notice tone="warn">
        <M>{`n = ${n}`}</M> is a multiple of <M>3</M>, but <M>{zn}</M> lands on the <em>real</em> axis:{' '}
        <M>{`${zn} = ${land}`}</M>. Its real part isn&apos;t <M>0</M>, so it isn&apos;t <M>ai</M>. Press <b>× z</b> three times to
        reach the imaginary axis.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        <M>{zn}</M> points at <M>{`\\operatorname{Arg} = ${piTex(argStep(n), 6)}`}</M>, so its real part{' '}
        <M>{`\\left(2\\sqrt3\\right)^{${n}}\\cos\\left(${piTex(-n, 6)}\\right)`}</M> isn&apos;t <M>0</M>. Press <b>× z</b> or{' '}
        <b>÷ z</b> until the arrow lands on the green (imaginary) axis, and watch which column it lands in.
      </Notice>
    )
  }

  return (
    <div>
      <PowersPicture n={n} setN={setN} target="imag" marked={wrong ? k => mod(k, 3) === 0 : undefined} />
      <Controls>
        <PowerControls n={n} setN={setN} />
        <Toggle label="Wrong idea: n is any multiple of 3" checked={wrong} onChange={setWrong} />
        <Readouts>
          <Readout tex={r.turn} color={C.g} />
          <Readout tex={r.value} color={imag ? C.good : C.f} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
