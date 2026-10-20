// 2022 Specialist NHT Exam 2 Q2d–e — three equally spaced points on |z| = 2, built up in four
// steps: z₀ = √3 + i = 2cis(π/6); a third of a turn (2π/3) round the circle gives
// z₁ = 2cis(5π/6) = −√3 + i; another third gives 2cis(3π/2), whose principal form is
// z₂ = 2cis(−π/2) = −2i; then cubing each one triples its argument (π/2, 5π/2, −3π/2), and all three
// land on the same direction, straight up, with modulus 2³ = 8: every point cubes to 8i, so they
// are the roots of z³ − 8i = 0 (part e). Values checked with sympy.

import {
  C, Circle, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, StepNav, useSteps,
} from './kit'
import type { Attach } from './kit'

const pt = (r: number, a: number): [number, number] => [r * Math.cos(a), r * Math.sin(a)]
const ARGS = [Math.PI / 6, (5 * Math.PI) / 6, -Math.PI / 2]
const NAMES: { name: string; attach: Attach }[] = [
  { name: 'z₀ = √3 + i', attach: 'n' },
  { name: 'z₁ = −√3 + i', attach: 'n' },
  { name: 'z₂ = −2i', attach: 'w' },
]
const TITLES = ['Start at z₀ on the circle |z| = 2', 'Turn a third of a revolution', 'Turn another third', 'Cube each point']

function Arc({ r, from, to, color }: { r: number; from: number; to: number; color: string }) {
  return <Plot.Parametric xy={t => pt(r, t)} domain={[Math.min(from, to), Math.max(from, to)]} color={color} weight={2.5} />
}

export default function CubeRoots() {
  const s = useSteps(4)
  const step = s.step
  const cubed = step === 3
  const shown = cubed ? 3 : step + 1
  const col = (k: number) => (cubed ? C.good : k === 0 ? C.f : C.g)

  return (
    <div>
      <p className="text-[12.5px] font-semibold text-gray-600 dark:text-gray-300 mb-1">
        Step {step + 1}: {TITLES[step]}
      </p>
      <Plane x={[-2.7, 2.7]} y={[-2.6, 2.6]} equalScale height={360} xLabel="" yLabel="Im">
        <Label at={[2.7, 0]} attach="nw" size={14} italic>
          Re
        </Label>
        <Circle center={[0, 0]} radius={2} color={C.guide} fillOpacity={0} strokeStyle="dashed" weight={1.5} />
        {step === 0 && (
          <>
            <Line.Segment point1={[0, 0]} point2={pt(2, ARGS[0])} color={C.f} weight={2} />
            <Arc r={0.6} from={0} to={ARGS[0]} color={C.f} />
            <Label at={pt(0.6, ARGS[0] / 2)} attach="e" color={C.f} size={12}>
              π/6
            </Label>
          </>
        )}
        {(step === 1 || step === 2) && (
          <>
            <Arc r={2} from={ARGS[0]} to={ARGS[0] + (2 * Math.PI * step) / 3} color={C.g} />
            <Label at={pt(2, Math.PI / 3)} attach="ne" color={C.g} size={12}>
              + 2π/3
            </Label>
            {step === 2 && (
              <Label at={pt(2, (7 * Math.PI) / 6)} attach="sw" color={C.g} size={12}>
                + 2π/3
              </Label>
            )}
          </>
        )}
        {shown === 3 && <Polygon points={ARGS.map(a => pt(2, a))} color={cubed ? C.good : C.g} fillOpacity={0.06} weight={1.5} />}
        {cubed && (
          <>
            <Line.Segment point1={[0, 0]} point2={[0, 2.45]} color={C.good} weight={3} />
            <Label at={[0, 2.45]} attach="e" color={C.good} size={12}>
              every z³ points here
            </Label>
          </>
        )}
        {ARGS.slice(0, shown).map((a, k) => (
          <g key={k}>
            <Point x={pt(2, a)[0]} y={pt(2, a)[1]} color={col(k)} />
            <Label at={pt(2, a)} attach={NAMES[k].attach} color={col(k)} size={13} gap={8}>
              {NAMES[k].name}
            </Label>
          </g>
        ))}
      </Plane>
      <Controls>
        <StepNav step={step} count={4} onBack={s.back} onNext={s.next} />
        <Readouts>
          {step === 0 && <Readout color={C.f} tex="z_0 = \sqrt3 + i = 2\,\text{cis}\left(\tfrac{\pi}{6}\right)" />}
          {step === 1 && <Readout color={C.g} tex="z_1 = 2\,\text{cis}\left(\tfrac{\pi}{6}+\tfrac{2\pi}{3}\right) = 2\,\text{cis}\left(\tfrac{5\pi}{6}\right) = -\sqrt3 + i" />}
          {step === 2 && (
            <>
              <Readout color={C.g} tex="2\,\text{cis}\left(\tfrac{5\pi}{6}+\tfrac{2\pi}{3}\right) = 2\,\text{cis}\left(\tfrac{3\pi}{2}\right)" />
              <Readout color={C.g} tex="z_2 = 2\,\text{cis}\left(-\tfrac{\pi}{2}\right) = -2i" />
            </>
          )}
          {cubed && (
            <>
              <Readout color={C.good} tex="z_0^3 = 8\,\text{cis}\left(\tfrac{\pi}{2}\right) = 8i" />
              <Readout color={C.good} tex="z_1^3 = 8\,\text{cis}\left(\tfrac{5\pi}{2}\right) = 8i" />
              <Readout color={C.good} tex="z_2^3 = 8\,\text{cis}\left(-\tfrac{3\pi}{2}\right) = 8i" />
            </>
          )}
        </Readouts>
        {step === 0 && (
          <Notice>
            <M>{'z_0 = \\sqrt3 + i'}</M> has modulus <M>{'\\sqrt{3+1} = 2'}</M> and argument <M>{'\\tfrac{\\pi}{6}'}</M>, so it sits on
            the circle <M>|z| = 2</M> from part c. Three equally spaced points split the full turn <M>2\pi</M> into three
            equal angles of <M>{'\\tfrac{2\\pi}{3}'}</M>. Press <b>Next</b> to take the first step round.
          </Notice>
        )}
        {step === 1 && (
          <Notice>
            Same modulus, argument up by <M>{'\\tfrac{2\\pi}{3}'}</M>: <M>{'z_1 = 2\\,\\text{cis}\\left(\\tfrac{5\\pi}{6}\\right) = -\\sqrt3 + i'}</M>,
            the mirror image of <M>z_0</M> in the imaginary axis. Press <b>Next</b> for the third point.
          </Notice>
        )}
        {step === 2 && (
          <Notice>
            Another <M>{'\\tfrac{2\\pi}{3}'}</M> reaches <M>{'\\tfrac{3\\pi}{2}'}</M>, which is not a principal argument: subtract{' '}
            <M>2\pi</M> to get <M>{'-\\tfrac{\\pi}{2}'}</M>, straight down, so <M>{'z_2 = -2i'}</M>. The three points make an
            equilateral triangle, and one more turn would land back on <M>z_0</M>. Press <b>Next</b> to see where <M>f(z)</M> comes from.
          </Notice>
        )}
        {cubed && (
          <Notice tone="good">
            <b>Cubing triples the argument and cubes the modulus.</b> The arguments become <M>{'\\tfrac{\\pi}{2}'}</M>,{' '}
            <M>{'\\tfrac{5\\pi}{2}'}</M> and <M>{'-\\tfrac{3\\pi}{2}'}</M>, which differ by whole turns, so all three point straight
            up, and each modulus becomes <M>{'2^3 = 8'}</M>. Every point cubes to <M>8i</M>: they are the three solutions of{' '}
            <M>{'z^3 = 8i'}</M>, so <M>{'f(z) = z^3 - 8i'}</M>.
          </Notice>
        )}
      </Controls>
    </div>
  )
}

