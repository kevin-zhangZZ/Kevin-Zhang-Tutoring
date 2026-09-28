// 2018 Specialist Exam 1 Q2b — de Moivre as repeated turning, on a direction dial (arrows show
// direction only; lengths are in the readouts because 1024 won't fit on a page).
// Step 1: each factor of √3 − i turns the arrow π/6 clockwise, so ten of them turn −10π/6 = −5π/3,
// which points the same way as π/3. Step 2: each factor of 1 + i turns π/4 anticlockwise, so
// twelve turn 3π and the arrow points along the negative real axis: (1 + i)¹² = −64. Step 3:
// dividing subtracts the arguments, −5π/3 − 3π = −14π/3, drawn as a spiral 2⅓ turns long; the
// slider adds whole turns of 2π and the arrow never moves, landing on the principal −2π/3.
// The toggle uses the report's slip Arg(√3 − i) = +π/6: everything reflects in the real axis and
// the answer becomes −8 + 8√3 i, the conjugate of the true −8 − 8√3 i.

import { useState } from 'react'
import {
  C, Circle, Controls, Label, Line, M, Notice, Plane, PlayButton, Plot, Point, Readout, Readouts, Slider, StepNav, Toggle,
  Buttons, Vector, usePlayer, useSteps,
} from './kit'
import type { Attach } from './kit'

// Angles are counted in twelfths of π, so every angle in the question is a whole number.
const U = Math.PI / 12

function gcd(a: number, b: number): number {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b) [a, b] = [b, a % b]
  return a || 1
}

/** TeX for (k/12)π, reduced: -20 → -\frac{5\pi}{3}. */
function piTex(k: number): string {
  if (k === 0) return '0'
  const g = gcd(k, 12)
  const p = k / g
  const q = 12 / g
  const a = Math.abs(p)
  const top = a === 1 ? '\\pi' : `${a}\\pi`
  return `${p < 0 ? '-' : ''}${q === 1 ? top : `\\frac{${top}}{${q}}`}`
}

/** The principal value in (−π, π], in twelfths of π. */
function principal(k: number): number {
  let v = k
  while (v <= -12) v += 24
  while (v > 12) v -= 24
  return v
}

const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹'
const sup = (n: number) => String(n).split('').map(d => SUP[Number(d)]).join('')

/** Where a label goes at the tip of an arrow pointing at angle a: just beyond it. */
function attachFor(a: number): Attach {
  const c = Math.cos(a)
  const s = Math.sin(a)
  // Near the real axis, lift the label above it so the axis line doesn't run through the text.
  const ns = s < -0.38 ? 's' : 'n'
  const ew = c < -0.38 ? 'w' : 'e' // near the imaginary axis, sit to its right
  return ((ns + ew) || 'e') as Attach
}

/** A spiral trail from angle 0 to angle a (radians), widening slowly so whole turns don't overlap. */
const spiralR = (t: number) => 0.3 + (0.13 * Math.abs(t)) / (2 * Math.PI)
function Spiral({ a, color }: { a: number; color: string }) {
  if (Math.abs(a) < 1e-6) return null
  return (
    <Plot.Parametric
      xy={t => [spiralR(t) * Math.cos(t), spiralR(t) * Math.sin(t)]}
      domain={[Math.min(0, a), Math.max(0, a)]}
      color={color}
      weight={2.5}
    />
  )
}

function Ticks({ every }: { every: number }) {
  const out = []
  for (let k = 0; k < 24; k += every) {
    const a = k * U
    out.push(
      <Line.Segment
        key={k}
        point1={[0.93 * Math.cos(a), 0.93 * Math.sin(a)]}
        point2={[1.07 * Math.cos(a), 1.07 * Math.sin(a)]}
        color={C.guide}
        weight={1.5}
      />,
    )
  }
  return <>{out}</>
}

const dir = (a: number): [number, number] => [Math.cos(a), Math.sin(a)]

export default function Spin() {
  const steps = useSteps(3)
  const [n, setN] = useState(3)
  const [m, setM] = useState(12)
  const [k, setK] = useState(0)
  const [slip, setSlip] = useState(false)
  const pn = usePlayer(setN, { min: 0, max: 10, seconds: 5 })
  const pm = usePlayer(setM, { min: 0, max: 12, seconds: 6 })

  const s = slip ? 1 : -1 // direction of one factor of √3 − i: −π/6 (true) or +π/6 (the slip)
  const numCol = slip ? C.bad : C.f
  const ansCol = slip ? C.bad : C.good
  const nInt = Math.floor(n + 1e-9)
  const mInt = Math.floor(m + 1e-9)

  const numK = s * 2 * 10 // argument of (√3 − i)¹⁰ in twelfths: −20 (true) or +20
  const denK = 3 * 12 // 36, i.e. 3π
  const quoK = numK - denK // −56 = −14π/3 (true) or −16 = −4π/3
  const K = Math.round((principal(quoK) - quoK) / 24) // whole turns to add: 2 (true) or 1
  const kk = Math.min(k, K)

  const stepTo = (to: number) => {
    const i = Math.max(0, Math.min(2, to))
    pn.stop()
    pm.stop()
    if (i >= 1) setN(10)
    if (i >= 2) setM(12)
    steps.setStep(i)
  }

  const numArrow = (
    <>
      <Line.Segment point1={[0, 0]} point2={dir(numK * U)} color={numCol} style="dashed" weight={2} />
      <Point x={Math.cos(numK * U)} y={Math.sin(numK * U)} color={numCol} />
      <Label at={dir(numK * U)} attach={attachFor(numK * U)} color={numCol} size={12}>
        {`(√3 − i)${sup(10)}`}
      </Label>
    </>
  )

  let picture
  let controls
  let readouts
  let notice

  if (steps.step === 0) {
    const a = s * n * 2 * U
    const aK = s * 2 * nInt
    picture = (
      <>
        <Ticks every={2} />
        <Spiral a={a} color={numCol} />
        {Array.from({ length: nInt + 1 }, (_, j) => (
          <Point key={j} x={spiralR(s * j * 2 * U) * Math.cos(s * j * 2 * U)} y={spiralR(s * j * 2 * U) * Math.sin(s * j * 2 * U)} color={numCol} />
        ))}
        <Vector tail={[0, 0]} tip={dir(a)} color={numCol} weight={3} />
        <Label at={dir(a)} attach={attachFor(a)} color={numCol} size={12}>
          {`(√3 − i)${sup(nInt)}`}
        </Label>
      </>
    )
    controls = (
      <>
        <Slider
          label="n"
          value={n}
          onChange={v => {
            pn.stop()
            setN(Math.round(v))
          }}
          min={0}
          max={10}
          step={1}
          format={v => v.toFixed(0)}
        />
        <Buttons>
          <PlayButton playing={pn.playing} onClick={() => pn.toggle(n)} label="Multiply by √3 − i ten times" />
        </Buttons>
      </>
    )
    readouts = (
      <>
        <Readout
          color={numCol}
          tex={nInt === 0 ? '(\\sqrt3 - i)^0 = 1' : `(\\sqrt3 - i)^{${nInt}} = 2^{${nInt}}\\operatorname{cis}\\left(${slip ? '' : '-'}\\tfrac{${nInt === 1 ? '' : nInt}\\pi}{6}\\right) = ${2 ** nInt}\\operatorname{cis}\\left(${piTex(aK)}\\right)`}
        />
        {principal(aK) !== aK && (
          <Readout tex={`\\text{same direction as } ${piTex(aK)} ${aK < 0 ? '+' : '-'} 2\\pi = ${piTex(principal(aK))}`} />
        )}
      </>
    )
    notice =
      nInt < 10 ? (
        <Notice>
          Each extra factor of <M>{'\\sqrt3 - i'}</M> turns the arrow another <M>{'\\tfrac{\\pi}{6}'}</M>{' '}
          {slip ? 'anticlockwise' : 'clockwise'} (one tick) and doubles its length. That is all de Moivre says:
          arguments add, so the <M>n</M>th power has argument <M>{`${slip ? '' : '-'}\\tfrac{n\\pi}{6}`}</M>. Press play
          to go to <M>n = 10</M>.
        </Notice>
      ) : slip ? (
        <Notice tone="warn">
          With the slip <M>{'\\operatorname{Arg}(\\sqrt3 - i) = +\\tfrac{\\pi}{6}'}</M> the arrow turns{' '}
          <b>anticlockwise</b> and ends at <M>{'\\tfrac{5\\pi}{3}'}</M>, the same direction as{' '}
          <M>{'-\\tfrac{\\pi}{3}'}</M>: the mirror image, in the real axis, of the true direction{' '}
          <M>{'\\tfrac{\\pi}{3}'}</M>. Follow it to step 3.
        </Notice>
      ) : (
        <Notice tone="good">
          Ten turns of <M>{'\\tfrac{\\pi}{6}'}</M> clockwise is <M>{'-\\tfrac{10\\pi}{6} = -\\tfrac{5\\pi}{3}'}</M>,
          five-sixths of a full turn, so the arrow ends up pointing at <M>{'\\tfrac{\\pi}{3}'}</M>. The length is{' '}
          <M>{'2^{10} = 1024'}</M>. Next: the denominator.
        </Notice>
      )
  } else if (steps.step === 1) {
    const a = m * 3 * U
    const aK = 3 * mInt
    const modTex = mInt % 2 === 0 ? `${2 ** (mInt / 2)}` : mInt === 1 ? '\\sqrt2' : `${2 ** ((mInt - 1) / 2)}\\sqrt2`
    picture = (
      <>
        <Ticks every={3} />
        {numArrow}
        <Spiral a={a} color={C.g} />
        {Array.from({ length: mInt + 1 }, (_, j) => (
          <Point key={j} x={spiralR(j * 3 * U) * Math.cos(j * 3 * U)} y={spiralR(j * 3 * U) * Math.sin(j * 3 * U)} color={C.g} />
        ))}
        <Vector tail={[0, 0]} tip={dir(a)} color={C.g} weight={3} />
        <Label at={dir(a)} attach={attachFor(a)} color={C.g} size={12}>
          {`(1 + i)${sup(mInt)}`}
        </Label>
      </>
    )
    controls = (
      <>
        <Slider
          label="m"
          value={m}
          onChange={v => {
            pm.stop()
            setM(Math.round(v))
          }}
          min={0}
          max={12}
          step={1}
          format={v => v.toFixed(0)}
        />
        <Buttons>
          <PlayButton playing={pm.playing} onClick={() => pm.toggle(m)} label="Multiply by 1 + i twelve times" />
        </Buttons>
      </>
    )
    readouts = (
      <>
        <Readout
          color={C.g}
          tex={mInt === 0 ? '(1 + i)^0 = 1' : `(1 + i)^{${mInt}} = (\\sqrt2)^{${mInt}}\\operatorname{cis}\\left(\\tfrac{${mInt === 1 ? '' : mInt}\\pi}{4}\\right) = ${modTex}\\operatorname{cis}\\left(${piTex(aK)}\\right)`}
        />
        {mInt === 12 && <Readout tex={`64\\operatorname{cis}(3\\pi) = 64\\operatorname{cis}(\\pi) = -64`} />}
      </>
    )
    notice =
      mInt < 12 ? (
        <Notice>
          From part a, <M>{'1 + i = \\sqrt2\\operatorname{cis}\\left(\\tfrac{\\pi}{4}\\right)'}</M>, so each factor turns
          the arrow <M>{'\\tfrac{\\pi}{4}'}</M> <b>anticlockwise</b> (one tick) and multiplies the length by{' '}
          <M>{'\\sqrt2'}</M>. The dashed arrow is the numerator from step 1. Go to <M>m = 12</M>.
        </Notice>
      ) : (
        <Notice tone="good">
          Twelve eighth-turns is <M>{'\\tfrac{12\\pi}{4} = 3\\pi'}</M>, one and a half turns, so the arrow ends on the{' '}
          <b>negative real axis</b>: <M>{'(1+i)^{12} = 64\\operatorname{cis}(3\\pi) = -64'}</M>, a plain real number.
          (Quick check: <M>{'(1+i)^2 = 2i'}</M>, so <M>{'(1+i)^{12} = (2i)^6 = 64i^6 = -64'}</M>.)
        </Notice>
      )
  } else {
    const aK = quoK + 24 * kk
    const a = aK * U
    const cart = slip ? '-8 + 8\\sqrt3\\,i' : '-8 - 8\\sqrt3\\,i'
    picture = (
      <>
        <Ticks every={2} />
        {numArrow}
        <Line.Segment point1={[0, 0]} point2={[-1, 0]} color={C.g} style="dashed" weight={2} />
        <Point x={-1} y={0} color={C.g} />
        <Label at={[-1, 0]} attach="nw" color={C.g} size={12}>
          {`(1 + i)${sup(12)}`}
        </Label>
        <Spiral a={a} color={ansCol} />
        <Vector tail={[0, 0]} tip={dir(a)} color={ansCol} weight={3} />
        <Label at={dir(a)} attach={attachFor(a)} color={ansCol} size={12}>
          quotient
        </Label>
      </>
    )
    controls = (
      <Slider label="k" value={kk} onChange={v => setK(Math.round(v))} min={0} max={K} step={1} format={v => `${v.toFixed(0)} turn${v === 1 ? '' : 's'}`} />
    )
    readouts = (
      <>
        <Readout
          color={ansCol}
          tex={`\\tfrac{1024}{64}\\operatorname{cis}\\left(${piTex(numK)} - 3\\pi\\right) = 16\\operatorname{cis}\\left(${piTex(quoK)}\\right)`}
        />
        <Readout tex={`${piTex(quoK)} + ${kk} \\times 2\\pi = ${piTex(aK)}`} />
        {kk === K && <Readout color={ansCol} tex={`16\\operatorname{cis}\\left(${piTex(aK)}\\right) = ${cart}`} />}
      </>
    )
    notice =
      kk < K ? (
        <Notice>
          Dividing <b>subtracts</b> the arguments (and divides the lengths, <M>{'1024 \\div 64 = 16'}</M>):{' '}
          <M>{`${piTex(numK)} - 3\\pi = ${piTex(quoK)}`}</M>, drawn as the spiral, {slip ? 'more than half a turn' : 'more than two full turns'}{' '}
          clockwise. Slide <M>k</M> to add whole turns of <M>2\pi</M>: the spiral unwinds but the arrow{' '}
          <b>doesn&apos;t move</b>, because a full turn brings you back to the same direction.
        </Notice>
      ) : slip ? (
        <Notice tone="warn">
          With <M>{'\\operatorname{Arg}(\\sqrt3 - i) = +\\tfrac{\\pi}{6}'}</M> the quotient lands at{' '}
          <M>{'\\tfrac{2\\pi}{3}'}</M>, giving <M>{'-8 + 8\\sqrt3\\,i'}</M>: the <b>conjugate</b> of the true answer, its
          mirror image in the real axis. One sign in one argument flips the whole answer. Turn the toggle off to see
          the right one.
        </Notice>
      ) : (
        <Notice tone="good">
          <M>{'-\\tfrac{14\\pi}{3} + 4\\pi = -\\tfrac{2\\pi}{3}'}</M>: the same arrow, now named by its principal
          argument, which you can evaluate. <M>{'\\cos\\left(-\\tfrac{2\\pi}{3}\\right) = -\\tfrac12'}</M> and{' '}
          <M>{'\\sin\\left(-\\tfrac{2\\pi}{3}\\right) = -\\tfrac{\\sqrt3}{2}'}</M>, so the answer is{' '}
          <M>{'-8 - 8\\sqrt3\\,i'}</M>, in the third quadrant, exactly where the arrow points.
        </Notice>
      )
  }

  const TITLES = ['Step 1: the numerator', 'Step 2: the denominator', 'Step 3: divide']

  return (
    <div>
      <Plane x={[-1.35, 1.35]} y={[-1.35, 1.35]} xStep={1} yStep={1} height={340} equalScale xLabel="Re" yLabel="Im" labels={false}>
        <Circle center={[0, 0]} radius={1} color={C.guide} fillOpacity={0} />
        {picture}
      </Plane>
      <Controls>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[13px] font-semibold text-gray-700 dark:text-gray-200">{TITLES[steps.step]}</span>
          <StepNav step={steps.step} count={3} onBack={() => stepTo(steps.step - 1)} onNext={() => stepTo(steps.step + 1)} />
        </div>
        {controls}
        <Buttons>
          <Toggle
            label={<>Use the slip <M>{'\\operatorname{Arg}(\\sqrt3 - i) = +\\tfrac{\\pi}{6}'}</M></>}
            checked={slip}
            onChange={v => {
              setSlip(v)
              setK(0)
            }}
          />
        </Buttons>
        <Readouts>{readouts}</Readouts>
        {notice}
        <p className="text-[12px] text-gray-500 dark:text-gray-400">
          The dial shows direction only; the lengths are in the readouts.
        </p>
      </Controls>
    </div>
  )
}
