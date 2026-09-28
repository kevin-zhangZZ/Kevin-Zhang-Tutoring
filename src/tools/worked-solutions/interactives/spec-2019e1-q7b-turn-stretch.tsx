// 2019 Specialist Exam 1 Q7b — de Moivre as "turn and stretch". z = 3 − √3 i = 2√3 cis(−π/6).
// Three steps build z, z² = z × z and z³ = z² × z to scale on the Argand plane: each factor of z
// turns the arrow a further π/6 clockwise (orange arc) and stretches it by 2√3 (dashed circle =
// the current modulus). Angles add (−π/6, −π/3, −π/2) and moduli multiply (2√3, 12, 24√3), so z³
// lands straight down the imaginary axis at −24√3 i, the answer, without expanding the bracket.
// Checked: z² = 6 − 6√3 i = 12 cis(−π/3) and z³ = −24√3 i (sympy). The view zooms out ×2√3 per
// step so the newest point fits; earlier points shrink toward the origin. No y tick numbers: z³ lies
// on the imaginary axis and would run through them (the dashed circle shows each length on Re).

import { C, Circle, Controls, Label, M, Notice, Plane, Plot, Readout, Readouts, StepNav, Vector, tick, useSteps } from './kit'

const R3 = Math.sqrt(3)
const PTS: [number, number][] = [
  [3, -R3],
  [6, -6 * R3],
  [0, -24 * R3],
]
const NAMES = ['z', 'z²', 'z³']
const GRID = [1, 2, 10]

const READ = [
  {
    mod: '|z| = \\sqrt{3^2 + \\left(-\\sqrt3\\right)^2} = 2\\sqrt3',
    arg: '\\arg z = -\\tfrac{\\pi}{6}',
    val: 'z = 3 - \\sqrt3\\,i',
  },
  {
    mod: '\\left|z^2\\right| = 2\\sqrt3 \\times 2\\sqrt3 = 12',
    arg: '\\arg\\left(z^2\\right) = -\\tfrac{\\pi}{6} - \\tfrac{\\pi}{6} = -\\tfrac{\\pi}{3}',
    val: 'z^2 = 12\\operatorname{cis}\\left(-\\tfrac{\\pi}{3}\\right) = 6 - 6\\sqrt3\\,i',
  },
  {
    mod: '\\left|z^3\\right| = 12 \\times 2\\sqrt3 = 24\\sqrt3',
    arg: '\\arg\\left(z^3\\right) = -\\tfrac{\\pi}{3} - \\tfrac{\\pi}{6} = -\\tfrac{\\pi}{2}',
    val: 'z^3 = 24\\sqrt3\\operatorname{cis}\\left(-\\tfrac{\\pi}{2}\\right) = -24\\sqrt3\\,i',
  },
]

export default function TurnStretch() {
  const { step, next, back } = useSteps(3)
  const k = step + 1
  const Mod = Math.pow(2 * R3, k)
  const th = (t: number) => (-t * Math.PI) / 6
  const arc = (r: number) => (t: number): [number, number] => [r * Math.cos(th(t)), r * Math.sin(th(t))]
  const mid = arc(0.6 * Mod)(k - 0.5)

  let notice
  if (k === 1) {
    notice = (
      <Notice>
        This is part a.&apos;s point: <M>{'z = 2\\sqrt3\\operatorname{cis}\\left(-\\tfrac{\\pi}{6}\\right)'}</M>, length{' '}
        <M>2\sqrt3</M> (dashed circle), turned <M>{'\\tfrac{\\pi}{6}'}</M> clockwise from the positive real axis. Multiplying
        any number by <M>z</M> does exactly this to it: turns it <M>{'\\tfrac{\\pi}{6}'}</M> clockwise and stretches it by{' '}
        <M>2\sqrt3</M>. Press <b>Next</b> to multiply by <M>z</M> again.
      </Notice>
    )
  } else if (k === 2) {
    notice = (
      <Notice>
        <M>{'z^2 = z \\times z'}</M>: the arrow <M>z</M> has been turned another <M>{'\\tfrac{\\pi}{6}'}</M> (orange) and
        stretched by <M>2\sqrt3</M> again. The angles <b>add</b>, <M>{'-\\tfrac{\\pi}{6} - \\tfrac{\\pi}{6} = -\\tfrac{\\pi}{3}'}</M>, and
        the lengths <b>multiply</b>, <M>{'2\\sqrt3 \\times 2\\sqrt3 = 12'}</M>. The view has zoomed out to fit, which is why{' '}
        <M>z</M> now looks small. One more <b>Next</b>.
      </Notice>
    )
  } else {
    notice = (
      <Notice tone="good">
        A third turn makes <M>{'-\\tfrac{\\pi}{2}'}</M> in total: straight down the imaginary axis, at length{' '}
        <M>{'(2\\sqrt3)^3 = 24\\sqrt3 \\approx 41.6'}</M>. So <M>{'z^3 = -24\\sqrt3\\,i'}</M>, with <M>x = 0</M>, and no bracket
        was expanded. That is de Moivre&apos;s theorem: cube the modulus, triple the argument. Parts c. and d. keep on turning:
        which powers land exactly on an axis?
      </Notice>
    )
  }

  return (
    <div>
      <Plane
        x={[-0.35 * Mod, 1.2 * Mod]}
        y={[-1.05 * Mod, 0.35 * Mod]}
        xStep={GRID[step]}
        yStep={GRID[step]}
        xLabels={v => (v < -0.3 * Mod ? '' : tick(v))}
        yLabels={false}
        equalScale
        height={340}
        xLabel=""
        yLabel="Im"
      >
        {/* "Re" above the axis end rather than past it, where a phone-width plane clips it. */}
        <Label at={[1.2 * Mod, 0]} attach="n" size={14} italic>
          Re
        </Label>
        <Circle center={[0, 0]} radius={Mod} color={C.guide} fillOpacity={0} strokeStyle="dashed" weight={1.5} />
        {k > 1 && <Plot.Parametric xy={arc(0.4 * Mod)} domain={[0, k - 1]} color={C.guide} weight={2} />}
        <Plot.Parametric xy={arc(0.4 * Mod)} domain={[k - 1, k]} color={C.g} weight={3.5} />
        <Label at={mid} attach="c" color={C.g} size={12}>
          −π/6
        </Label>
        {PTS.slice(0, k - 1).map((p, j) => (
          <Vector key={j} tail={[0, 0]} tip={p} color={C.guide} weight={2} />
        ))}
        {PTS.slice(0, k - 1).map((p, j) =>
          Math.hypot(p[0], p[1]) / Mod > 0.2 ? (
            <Label key={j} at={p} attach="e" color={C.guide} size={12}>
              {NAMES[j]}
            </Label>
          ) : null,
        )}
        <Vector tail={[0, 0]} tip={PTS[k - 1]} color={C.f} weight={3.5} />
        <Label at={PTS[k - 1]} attach={k === 3 ? 'e' : 'ne'} color={C.f}>
          {NAMES[k - 1]}
        </Label>
      </Plane>
      <Controls>
        <StepNav step={step} count={3} onBack={back} onNext={next} />
        <Readouts>
          <Readout tex={READ[step].mod} color={C.guide} />
          <Readout tex={READ[step].arg} color={C.g} />
          <Readout tex={READ[step].val} color={C.f} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
