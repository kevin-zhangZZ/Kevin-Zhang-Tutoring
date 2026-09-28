// 2017 Specialist Exam 2 MCQ 3 — distinct roots of (z⁴ − 1)(z² + 3iz − 2) = 0 on an Argand
// diagram, built up in three steps: the four fourth roots of unity (blue), then the quadratic's
// roots −i and −2i (orange) — one of which lands exactly on a blue point — then the five distinct
// points. Counted with multiplicity there are 4 + 2 = 6 roots (degree 6), but −i is a double root,
// so only 5 are distinct (option E, 6, is the 4 + 2 count).

import {
  C, Circle, Controls, Label, M, Notice, Plane, Point, Polygon, Readout, Readouts, StepNav, useSteps,
} from './kit'

type Attach = 'ne' | 'nw' | 'e' | 'w'
const UNITY: { z: [number, number]; name: string; attach: Attach }[] = [
  { z: [1, 0], name: '1', attach: 'ne' },
  { z: [0, 1], name: 'i', attach: 'ne' },
  { z: [-1, 0], name: '−1', attach: 'nw' },
  { z: [0, -1], name: '−i', attach: 'w' },
]
const TITLES = ['Solve z⁴ − 1 = 0', 'Solve z² + 3iz − 2 = 0', 'Count the distinct points']

export default function DistinctRoots() {
  const s = useSteps(3)
  const step = s.step
  const done = step === 2
  const blue = done ? C.good : C.f
  const orange = done ? C.good : C.g

  return (
    <div>
      <p className="text-[12.5px] font-semibold text-gray-600 dark:text-gray-300 mb-1">
        Step {step + 1}: {TITLES[step]}
      </p>
      <Plane x={[-2.2, 2.2]} y={[-2.5, 1.6]} equalScale height={380} labels={false} xLabel="" yLabel="Im">
        <Label at={[2.2, 0]} attach="n" size={14} italic>
          Re
        </Label>
        <Circle center={[0, 0]} radius={1} color={C.guide} fillOpacity={0} strokeStyle="dashed" weight={1.5} />
        <Polygon points={UNITY.map(u => u.z)} color={C.f} fillOpacity={0.06} weight={1} />

        {UNITY.map(u => (
          <g key={u.name}>
            <Point x={u.z[0]} y={u.z[1]} color={blue} />
            {!(step >= 1 && u.name === '−i') && (
              <Label at={u.z} attach={u.attach} color={blue} gap={8}>
                {u.name}
              </Label>
            )}
          </g>
        ))}

        {step >= 1 && (
          <>
            <Circle center={[0, -1]} radius={0.16} color={orange} fillOpacity={0} weight={3} />
            <Point x={0} y={-2} color={orange} />
            <Label at={[0, -2]} attach="e" color={orange} gap={8}>
              −2i
            </Label>
            <Label at={[0, -1]} attach="e" color={done ? C.good : C.g} gap={24}>
              {done ? '−i (double root)' : '−i again!'}
            </Label>
          </>
        )}
      </Plane>
      <Controls>
        <StepNav step={step} count={3} onBack={s.back} onNext={s.next} />
        <Readouts>
          {step === 0 && <Readout color={C.f} tex="z^4 = 1:\ z = 1,\ i,\ -1,\ -i" />}
          {step === 1 && (
            <>
              <Readout color={C.g} tex="z^2 + 3iz - 2 = (z+i)(z+2i)" />
              <Readout color={C.g} tex="(-i)^4 - 1 = 1 - 1 = 0" />
              <Readout color={C.g} tex="(-i)^2 + 3i(-i) - 2 = -1 + 3 - 2 = 0" />
            </>
          )}
          {done && (
            <>
              <Readout tex="(z-1)(z+1)(z-i)(z+i)^2(z+2i) = 0" />
              <Readout tex="\text{with multiplicity: } 4 + 2 = 6" />
              <Readout color={C.good} tex="\text{distinct: } 5" />
            </>
          )}
        </Readouts>
        {step === 0 && (
          <Notice>
            <M>{'z^4 = 1'}</M> has four solutions, the fourth roots of unity, a quarter-turn apart on the unit circle. Press{' '}
            <b>Next</b> to add the two roots of the quadratic factor.
          </Notice>
        )}
        {step === 1 && (
          <Notice tone="warn">
            The quadratic&apos;s roots are <M>-i</M> and <M>-2i</M>. But <M>-i</M> is <b>already on the picture</b>: it
            lands exactly on one of the blue points, because it makes <em>both</em> factors zero. Six roots found, only
            five different places.
          </Notice>
        )}
        {done && (
          <Notice tone="good">
            &ldquo;Distinct&rdquo; means different points: five dots, so <b>5</b>. Counted with multiplicity there are{' '}
            <M>4 + 2 = 6</M> roots, matching the degree, because <M>{'(z+i)'}</M> appears twice. Adding{' '}
            <M>4 + 2</M> without checking for overlap gives option E.
          </Notice>
        )}
      </Controls>
    </div>
  )
}
