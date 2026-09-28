// 2018 Methods Exam 1 Q7b — the distance formula is Pythagoras on the gaps. Built in three steps
// for O = (0, 0) and P = (8/5, −4/5): (1) the horizontal gap 8/5 and vertical gap 4/5 are the legs
// of a right-angled triangle with hypotenuse OP; (2) the squares on the legs have areas 64/25 and
// 16/25 (the sign of a gap disappears when squared); (3) the square on OP has area 80/25 = 16/5,
// so OP = √(16/5) = 4√5/5. One edge of the square on OP runs along y = 2x − 4 itself, since OP is
// perpendicular to the line.

import { C, Controls, Label, Line, M, Notice, Plane, Plot, Point, Polygon, Readout, Readouts, StepNav, useSteps } from './kit'

const PX = 8 / 5
const PY = -4 / 5
const line = (x: number) => 2 * x - 4

export default function Pythagoras() {
  const { step, next, back } = useSteps(3)

  const notices = [
    <Notice key={0}>
      From <M>O</M> to <M>P</M> you go <M>{'\\tfrac85'}</M> across and <M>{'\\tfrac45'}</M> down. Those two gaps are the
      legs of a right-angled triangle, and <M>OP</M> is its hypotenuse. That is all the distance formula is: Pythagoras
      on the gaps <M>{'x_2 - x_1'}</M> and <M>{'y_2 - y_1'}</M>. Press Next to square them.
    </Notice>,
    <Notice key={1}>
      Square each gap: <M>{'\\left(\\tfrac85\\right)^2 = \\tfrac{64}{25}'}</M> and{' '}
      <M>{'\\left(-\\tfrac45\\right)^2 = \\tfrac{16}{25}'}</M>. Squaring removes the sign, which is why it doesn&apos;t
      matter whether you subtract <M>{'y_2 - y_1'}</M> or <M>{'y_1 - y_2'}</M>. The squares are <em>added</em>, never
      subtracted.
    </Notice>,
    <Notice key={2} tone="good">
      Pythagoras: the square on <M>OP</M> has area <M>{'\\tfrac{64}{25} + \\tfrac{16}{25} = \\tfrac{80}{25}'}</M>, so{' '}
      <M>{'OP = \\tfrac{\\sqrt{80}}{5} = \\tfrac{4\\sqrt5}{5}'}</M>. Notice one edge of the green square lies along{' '}
      <M>{'y = 2x - 4'}</M> itself, because <M>OP</M> is perpendicular to the line.
    </Notice>,
  ]

  return (
    <div>
      <Plane x={[-1, 2.8]} y={[-2.6, 1.8]} xStep={1} yStep={1} equalScale height={420} labels={false}>
        <Plot.OfX y={line} domain={[0.6, 1.75]} color={C.f} weight={2} opacity={0.6} />
        <Label at={[0.75, line(0.75)]} attach="e" color={C.f} size={12}>
          y = 2x − 4
        </Label>
        {step >= 1 && (
          <>
            <Polygon points={[[0, 0], [PX, 0], [PX, PX], [0, PX]]} color={C.f} fillOpacity={0.15} weight={2} />
            <Label at={[PX / 2, PX / 2]} attach="c" color={C.f}>
              64/25
            </Label>
            <Polygon points={[[PX, 0], [PX - PY, 0], [PX - PY, PY], [PX, PY]]} color={C.violet} fillOpacity={0.15} weight={2} />
            <Label at={[PX - PY / 2, PY / 2]} attach="c" color={C.violet} size={11}>
              16/25
            </Label>
          </>
        )}
        {step >= 2 && (
          <>
            <Polygon points={[[0, 0], [PX, PY], [PX + PY, PY - PX], [PY, -PX]]} color={C.good} fillOpacity={0.15} weight={2} />
            <Label at={[(PX + PY) / 2, (PY - PX) / 2]} attach="c" color={C.good}>
              80/25
            </Label>
          </>
        )}
        <Polygon points={[[0, 0], [PX, 0], [PX, PY]]} color={C.g} fillOpacity={0.25} weight={2} />
        <Line.Segment point1={[0, 0]} point2={[PX, PY]} color={step >= 2 ? C.good : C.g} weight={3} />
        {step === 0 && (
          <>
            <Label at={[PX / 2, 0]} attach="n" color={C.ink} size={12}>
              8/5
            </Label>
            <Label at={[PX, PY / 2]} attach="w" color={C.ink} size={12}>
              4/5
            </Label>
          </>
        )}
        <Point x={0} y={0} color={C.ink} />
        <Point x={PX} y={PY} color={C.g} />
        <Label at={[0, 0]} attach="nw" color={C.ink}>
          O
        </Label>
        <Label at={[PX, PY]} attach="s" gap={10} color={C.g}>
          P
        </Label>
      </Plane>
      <Controls>
        <StepNav step={step} count={3} onBack={back} onNext={next} />
        <Readouts>
          {step === 0 && <Readout tex={'\\text{gaps: } \\ \\tfrac85 - 0 = \\tfrac85, \\quad -\\tfrac45 - 0 = -\\tfrac45'} />}
          {step === 1 && <Readout tex={'\\left(\\tfrac85\\right)^2 + \\left(-\\tfrac45\\right)^2 = \\tfrac{64}{25} + \\tfrac{16}{25}'} />}
          {step === 2 && <Readout color={C.good} tex={'OP = \\sqrt{\\tfrac{80}{25}} = \\tfrac{4\\sqrt5}{5} \\approx 1.789'} />}
        </Readouts>
        {notices[step]}
      </Controls>
    </div>
  )
}
