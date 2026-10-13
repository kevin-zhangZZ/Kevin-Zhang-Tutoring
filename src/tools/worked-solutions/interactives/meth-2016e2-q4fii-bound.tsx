// 2016 Methods Exam 2 Q4f.ii — bound the region, not the formula. For every k > 1 the region
// between y = g(x) and y = x lies inside the triangle cut off by x = −1, y = 1 and y = x (area 2):
// g is increasing with g(1) = 1, so g ≤ 1 on [−1, 1]. Slide k towards 1 and the region almost
// fills the triangle (A → 2); slide it up and the region thins towards nothing (A → 0). It never
// reaches either bound, because g(−1) = −1 leaves a corner of the triangle empty.

import { useState } from 'react'
import { C, Controls, Label, Line, M, Notice, Plane, Plot, Polygon, Readout, Readouts, Region, Slider } from './kit'

const A = (k: number) => 2 * k + (k * k - 1) * Math.log((k - 1) / (k + 1))

export default function Bound() {
  // The slider runs over u = log(k − 1), so both ends (k near 1, k large) get room.
  const [u, setU] = useState(Math.log(1))
  const k = 1 + Math.exp(u)
  const g = (x: number) => (k * x + 1) / (x + k)
  const area = A(k)
  const nearOne = k < 1.1
  const big = k > 20

  return (
    <div>
      <Plane x={[-1.5, 1.5]} y={[-1.5, 1.5]} xStep={0.5} yStep={0.5} equalScale height={360}>
        <Polygon points={[[-1, -1], [1, 1], [-1, 1]]} color={C.violet} fillOpacity={0.06} weight={2} strokeStyle="dashed" />
        <Region top={g} bottom={x => x} from={-1} to={1} color={C.f} opacity={0.3} />
        <Plot.OfX y={g} domain={[Math.max(-1.5, -k + 0.01), 1.5]} color={C.f} weight={3} />
        <Line.Segment point1={[-1.5, -1.5]} point2={[1.5, 1.5]} color={C.ink} weight={1.5} />
        <Label at={[-1, 1]} color={C.violet} attach="nw">(−1, 1)</Label>
        <Label at={[-0.5, 1]} color={C.violet} attach="n">y = 1</Label>
        <Label at={[-1, 0.2]} color={C.violet} attach="w">x = −1</Label>
        <Label at={[1.2, g(1.2)]} color={C.f} attach="s">g</Label>
      </Plane>
      <Controls>
        <Slider label="k" value={u} onChange={setU} min={Math.log(0.005)} max={Math.log(99)} step={0.01} format={() => k.toFixed(k < 10 ? 3 : 1)} />
        <Readouts>
          <Readout color={C.f} tex={`A(k) \\approx ${area.toFixed(4)}`} />
          <Readout color={C.violet} tex={`\\text{triangle} = \\tfrac12\\times2\\times2 = 2`} />
        </Readouts>
        {nearOne ? (
          <Notice>
            Near <M>k=1</M>, <M>g</M> is almost flat at <M>y=1</M> and the region nearly fills the triangle, so <M>A(k)</M> is close
            to <M>2</M>. It never gets there: <M>g(-1)=-1</M> for every <M>k</M>, so the corner at <M>(-1,1)</M> is always left
            out. Now slide <M>k</M> up.
          </Notice>
        ) : big ? (
          <Notice>
            For large <M>k</M>, <M>g</M> hugs <M>y=x</M> and <M>A(k)</M> shrinks towards <M>0</M>, but it stays positive because{' '}
            <M>g</M> is still above the line between <M>-1</M> and <M>1</M>. So <M>{'0<A(k)<2'}</M> for every <M>{'k>1'}</M>.
          </Notice>
        ) : (
          <Notice>
            Whatever <M>k</M> is, the shaded region stays inside the dashed triangle: <M>g</M> is increasing and <M>g(1)=1</M>, so
            the curve never rises above <M>y=1</M> between <M>-1</M> and <M>1</M>. Slide <M>k</M> towards <M>1</M> (the area approaches <M>2</M>), then make <M>k</M> large (the area approaches <M>0</M>).
          </Notice>
        )}
      </Controls>
    </div>
  )
}
