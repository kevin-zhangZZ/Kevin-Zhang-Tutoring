// 2023 Specialist Exam 2 MCQ 5 — check every option against z² on the Argand diagram. With
// z = 4 cis(π/3) (the only first-quadrant z with |z| = 4 and an argument of z³ equal to −π), the
// target z² = 16 cis(2π/3) is drawn in violet with the dashed circle |w| = 16. The option buttons
// draw each option's point, with its building block dashed (z, z̄ or −z̄), and the readouts compare
// its modulus and argument with z²'s:
//   A 4z = 16 cis(π/3)     — right modulus, wrong argument
//   B −2z̄ = 8 cis(2π/3)    — right argument, half the modulus (20% chose B; the widget opens here)
//   C 3z = 12 cis(π/3)     — neither
//   D z̄² = 16 cis(−2π/3)   — right modulus, argument of the wrong sign (z² reflected in the real axis)
//   E −4z̄ = 16 cis(2π/3)   — both: the answer.
// All five checked with sympy.

import { useState } from 'react'
import { Buttons, C, Circle, Controls, Label, M, Notice, Plane, Readout, Readouts, Toggle, Vector } from './kit'

type Letter = 'A' | 'B' | 'C' | 'D' | 'E'
type V2 = [number, number]

const S3 = Math.sqrt(3)
const Z: V2 = [2, 2 * S3] // 4 cis(π/3)
const ZB: V2 = [2, -2 * S3] // z̄ = 4 cis(−π/3)
const NZB: V2 = [-2, 2 * S3] // −z̄ = 4 cis(2π/3)
const Z2: V2 = [-8, 8 * S3] // z² = 16 cis(2π/3)

const OPTS: Record<
  Letter,
  { expr: string; tip: V2; block: 'z' | 'zb' | 'nzb'; mod: number; argTex: string; modOk: boolean; argOk: boolean; attach: 'n' | 'e' | 'w' | 's' }
> = {
  A: { expr: '4z', tip: [8, 8 * S3], block: 'z', mod: 16, argTex: '\\tfrac{\\pi}{3}', modOk: true, argOk: false, attach: 'n' },
  B: { expr: '-2\\bar z', tip: [-4, 4 * S3], block: 'nzb', mod: 8, argTex: '\\tfrac{2\\pi}{3}', modOk: false, argOk: true, attach: 'w' },
  C: { expr: '3z', tip: [6, 6 * S3], block: 'z', mod: 12, argTex: '\\tfrac{\\pi}{3}', modOk: false, argOk: false, attach: 'e' },
  D: { expr: '\\bar z^{\\,2}', tip: [-8, -8 * S3], block: 'zb', mod: 16, argTex: '-\\tfrac{2\\pi}{3}', modOk: true, argOk: false, attach: 's' },
  E: { expr: '-4\\bar z', tip: Z2, block: 'nzb', mod: 16, argTex: '\\tfrac{2\\pi}{3}', modOk: true, argOk: true, attach: 'n' },
}

// Number only the gridlines at ±8 and ±16: the ±4 numbers would crowd the labels on z and z̄, and the
// equal-scale plane shows gridlines beyond the circle that need no numbers.
const tickLabel = (v: number) => ([8, 16].some(k => Math.abs(Math.abs(v) - k) < 1e-9) ? String(v).replace('-', '−') : '')

const LABEL: Record<Letter, string> = { A: 'A: 4z', B: 'B: −2z̄', C: 'C: 3z', D: 'D: z̄²', E: 'E: −4z̄ = z²' }

function Mark({ ok }: { ok: boolean }) {
  return (
    <span className={`font-bold ${ok ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
      {ok ? '✓' : '✗'}
    </span>
  )
}

export default function OptionsWidget() {
  const [pick, setPick] = useState<Letter>('B')
  const o = OPTS[pick]
  const ok = o.modOk && o.argOk
  const col = ok ? C.good : C.bad

  let notice
  if (pick === 'A') {
    notice = (
      <Notice tone="warn">
        <M>4z</M> stretches <M>z</M> by 4, so its modulus is <M>{'4 \\times 4 = 16'}</M>, the same as <M>z^2</M>. But
        multiplying by a positive number never turns the arrow: it still points at <M>{'\\tfrac{\\pi}{3}'}</M>, not{' '}
        <M>{'\\tfrac{2\\pi}{3}'}</M>. Same length, wrong direction. Try D, another option with modulus 16.
      </Notice>
    )
  } else if (pick === 'B') {
    notice = (
      <Notice tone="warn">
        The minus sign turns <M>{'\\bar z'}</M> through <M>{'\\pi'}</M> (since <M>{'-1 = \\mathrm{cis}(\\pi)'}</M>), from{' '}
        <M>{'-\\tfrac{\\pi}{3}'}</M> to <M>{'\\tfrac{2\\pi}{3}'}</M>: exactly the direction of <M>z^2</M>. But the 2 only
        stretches the modulus from 4 to 8, so the red arrow stops halfway along the violet one. Try E, which turns the same
        way and stretches by 4.
      </Notice>
    )
  } else if (pick === 'C') {
    notice = (
      <Notice tone="warn">
        <M>3z</M> has modulus <M>{'3 \\times 4 = 12'}</M> and still points at <M>{'\\tfrac{\\pi}{3}'}</M>, so it misses{' '}
        <M>z^2</M> on both counts: inside the dashed circle and in the wrong direction. Try A, which at least reaches the
        circle.
      </Notice>
    )
  } else if (pick === 'D') {
    notice = (
      <Notice tone="warn">
        Squaring <M>{'\\bar z = 4\\,\\mathrm{cis}\\left(-\\tfrac{\\pi}{3}\\right)'}</M> squares the modulus and doubles the
        argument: <M>{'16\\,\\mathrm{cis}\\left(-\\tfrac{2\\pi}{3}\\right)'}</M>. Right modulus, but it is <M>z^2</M>{' '}
        reflected in the real axis (the conjugate of <M>z^2</M>), not <M>z^2</M> itself. Try E.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        The minus sign turns <M>{'\\bar z'}</M> through <M>{'\\pi'}</M> to argument <M>{'\\tfrac{2\\pi}{3}'}</M>, and the 4
        stretches its modulus from 4 to 16:{' '}
        <M>{'-4\\bar z = 16\\,\\mathrm{cis}\\left(\\tfrac{2\\pi}{3}\\right)'}</M>. Both the modulus and the argument match,
        so the point lands exactly on <M>z^2</M>. Two complex numbers are equal only when both match.
      </Notice>
    )
  }

  const blockTip = o.block === 'z' ? Z : o.block === 'zb' ? ZB : NZB

  return (
    <div className="flex flex-col gap-3">
      <Plane x={[-17, 17]} y={[-17, 17]} xStep={4} yStep={4} height={340} equalScale xLabel="" yLabel="Im" labels={tickLabel}>
        <Label at={[17, 0]} attach="sw" size={14} gap={4} italic>
          Re
        </Label>
        {/* every number with the modulus of z² */}
        <Circle center={[0, 0]} radius={16} color={C.guide} fillOpacity={0} weight={1.5} strokeStyle="dashed" />
        <Label at={[11.3, -11.3]} attach="nw" color={C.guide} gap={6}>
          |w| = 16
        </Label>
        {/* z and z̄ */}
        <Vector tail={[0, 0]} tip={Z} color={C.f} weight={2} />
        <Label at={Z} attach="e" color={C.f} gap={8}>
          z
        </Label>
        <Vector tail={[0, 0]} tip={ZB} color={C.g} weight={2} />
        <Label at={ZB} attach="e" color={C.g} gap={8}>
          z̄
        </Label>
        {o.block === 'nzb' && (
          <>
            <Vector tail={[0, 0]} tip={NZB} color={C.g} weight={2} style="dashed" />
            <Label at={NZB} attach="w" color={C.g} gap={8}>
              −z̄
            </Label>
          </>
        )}
        {/* the target */}
        <Vector tail={[0, 0]} tip={Z2} color={C.violet} weight={2.5} opacity={0.85} />
        {pick !== 'E' && (
          <Label at={Z2} attach="n" color={C.violet} gap={9}>
            z²
          </Label>
        )}
        {/* the chosen option, built from its dashed building block */}
        {o.block !== 'nzb' && <Vector tail={[0, 0]} tip={blockTip} color={o.block === 'z' ? C.f : C.g} weight={2} style="dashed" />}
        <Vector tail={[0, 0]} tip={o.tip} color={col} weight={2.5} />
        <Label at={o.tip} attach={o.attach} color={col} gap={9}>
          {LABEL[pick]}
        </Label>
      </Plane>

      <Controls>
        <Buttons>
          {(Object.keys(OPTS) as Letter[]).map(L => (
            <Toggle
              key={L}
              checked={pick === L}
              onChange={() => setPick(L)}
              label={
                <>
                  {L}&nbsp;&nbsp;<M>{OPTS[L].expr}</M>
                </>
              }
            />
          ))}
        </Buttons>
        <Readouts>
          <Readout tex="z^2 = 16\,\mathrm{cis}\left(\tfrac{2\pi}{3}\right)" color={C.violet} />
          <Readout tex={`${o.expr} = ${o.mod}\\,\\mathrm{cis}\\left(${o.argTex}\\right)`} color={col} />
        </Readouts>
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-gray-700 dark:text-gray-300">
          <span>
            Modulus: <M>{`${o.mod}`}</M> vs <M>16</M> <Mark ok={o.modOk} />
          </span>
          <span>
            Argument: <M>{o.argTex}</M> vs <M>{'\\tfrac{2\\pi}{3}'}</M> <Mark ok={o.argOk} />
          </span>
        </div>
        {notice}
      </Controls>
    </div>
  )
}
