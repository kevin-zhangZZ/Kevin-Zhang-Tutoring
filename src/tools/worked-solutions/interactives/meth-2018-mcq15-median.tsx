// 2018 Methods Exam 2 MCQ 15 — every option is secretly an "area up to m" equation. The area under
// f(x) = (8x − x³)/12 from 0 to m is m²/3 − m⁴/48, so m⁴ − 16m² + 24 = 24 − 48 × area. Each option
// button jumps m to that option's root in [0, 2] and shades the area it forces: A ⇔ area 1/8,
// B has no real root at all, C ⇔ area 0, D ⇔ area 23.5/48 ≈ 0.490 (the ½ used twice — its root
// 1.279 sits a hair left of the median), E ⇔ area ½ exactly, so m ≈ 1.294 (E's other positive root,
// 3.78, lies outside [0, 2]). Left area sky, right area orange: at the median they are equal.

import { useState } from 'react'
import { Buttons, C, Controls, Label, Line, M, Notice, Plane, Plot, Readout, Readouts, Region, Slider, Toggle } from './kit'

const f = (x: number) => (8 * x - x ** 3) / 12
const area = (m: number) => (m * m) / 3 - m ** 4 / 48
const MEDIAN = Math.sqrt(8 - 2 * Math.sqrt(10)) // 1.29439
const ROOT_A = Math.sqrt(8 - Math.sqrt(58)) // 0.61986, area 1/8
const ROOT_D = Math.sqrt(8 - (9 * Math.sqrt(2)) / 2) // 1.27909, area 23.5/48

type Opt = 'A' | 'B' | 'C' | 'D' | 'E'
const ROOT: Record<Opt, number | null> = { A: ROOT_A, B: null, C: 0, D: ROOT_D, E: MEDIAN }
const TEX: Record<Opt, string> = {
  A: '-m^4+16m^2-6=0',
  B: '-m^4+4m^2-6=0',
  C: 'm^4-16m^2=0',
  D: 'm^4-16m^2+24=0.5',
  E: 'm^4-16m^2+24=0',
}

export default function MedianOptions() {
  const [m, setM] = useState(MEDIAN)
  const [opt, setOpt] = useState<Opt | null>('E')

  const left = area(m)
  const right = 1 - left
  const lhs = m ** 4 - 16 * m * m + 24
  const atMedian = Math.abs(m - MEDIAN) < 1e-9

  const pick = (o: Opt) => {
    setOpt(o)
    const r = ROOT[o]
    if (r !== null) setM(r)
  }
  const slide = (v: number) => {
    setOpt(null)
    setM(Math.abs(v - MEDIAN) < 0.006 ? MEDIAN : v)
  }

  let notice
  if (opt === 'B') {
    notice = (
      <Notice tone="warn">
        Option B is <M>{'m^4-4m^2+6=0'}</M>, and <M>{'m^4-4m^2+6=(m^2-2)^2+2'}</M> is never smaller than <M>2</M>.
        It has <b>no real solution</b>, so it cannot pin down a median. It comes from clearing the <M>{'\\tfrac14'}</M>{' '}
        off the <M>m^4</M> term only, leaving <M>4m^2</M> unmultiplied.
      </Notice>
    )
  } else if (opt === 'A') {
    notice = (
      <Notice tone="warn">
        Option A rearranges to <M>{'16m^2-m^4=6'}</M>, which means <M>{'48\\times\\text{area}=6'}</M>, so the area up to{' '}
        <M>m</M> is only <M>{'\\tfrac18'}</M>. That is the <M>{'4m^2-\\tfrac{m^4}{4}=6'}</M> step with only the left side
        multiplied by <M>4</M>. Press E to compare.
      </Notice>
    )
  } else if (opt === 'C') {
    notice = (
      <Notice tone="warn">
        Option C says <M>{'48\\times\\text{area}=0'}</M>: the area up to <M>m</M> is zero, so <M>m=0</M> (its other
        root, <M>m=4</M>, is outside the domain). That is the integral set equal to <M>0</M> instead of{' '}
        <M>{'\\tfrac12'}</M>.
      </Notice>
    )
  } else if (opt === 'D') {
    notice = (
      <Notice tone="warn">
        Option D looks almost right: its root <M>m\approx1.279</M> is a hair left of the median. But it says{' '}
        <M>{'24-48\\times\\text{area}=0.5'}</M>, so the area is <M>{'\\tfrac{23.5}{48}\\approx0.490'}</M>, not{' '}
        <M>{'\\tfrac12'}</M>. The <M>{'\\tfrac12'}</M> was already used up when it became the <M>24</M>; writing{' '}
        <M>0.5</M> on the right uses it twice.
      </Notice>
    )
  } else if (atMedian) {
    notice = (
      <Notice tone="good">
        At <M>m\approx1.294</M> the blue and orange areas are both <M>{'\\tfrac12'}</M>, which is what &ldquo;median&rdquo;
        means. Since <M>{'m^4-16m^2+24=24-48\\times\\text{area}'}</M>, option E is zero exactly when the area is{' '}
        <M>{'\\tfrac12'}</M>. (E&rsquo;s other positive root, <M>m\approx3.78</M>, is past <M>x=2</M> where{' '}
        <M>f</M> is zero.) Now press each other option to see which area it really asks for.
      </Notice>
    )
  } else {
    notice = (
      <Notice>
        The area up to <M>m</M> is <M>{left.toFixed(3)}</M>, so <M>{'m^4-16m^2+24'}</M> is{' '}
        <M>{`24-48\\times${left.toFixed(3)}=${lhs.toFixed(2)}`}</M>. The median needs the area to be exactly{' '}
        <M>{'\\tfrac12'}</M>, which makes that expression <M>0</M>. Slide <M>m</M> {left < 0.5 ? 'right' : 'left'} to
        find it.
      </Notice>
    )
  }

  return (
    <div>
      <Plane x={[0, 2.2]} y={[0, 0.85]} xStep={0.5} yStep={0.25} height={290} labels={v => String(v)}>
        <Region top={f} bottom={() => 0} from={0} to={m} color={C.f} opacity={0.35} />
        <Region top={f} bottom={() => 0} from={m} to={2} color={C.g} opacity={0.22} />
        <Plot.OfX y={f} domain={[0, 2]} color={C.f} weight={3} />
        <Line.Segment point1={[2, 0]} point2={[2, f(2)]} color={C.f} style="dashed" weight={1.2} />
        {m > 0.01 && <Line.Segment point1={[m, 0]} point2={[m, f(m)]} color={C.violet} weight={2.5} />}
        <Label at={[m, f(m)]} attach={m > 1.5 ? 'nw' : 'n'} color={C.violet} gap={10}>
          {`m = ${m.toFixed(3)}`}
        </Label>
        {m > 0.45 && (
          <Label at={[m * 0.62, f(m * 0.62) * 0.35]} attach="c" color={C.f} size={12}>
            {left.toFixed(3)}
          </Label>
        )}
        {m < 1.75 && (
          <Label at={[(m + 2) / 2, f((m + 2) / 2) * 0.35]} attach="c" color={C.g} size={12}>
            {right.toFixed(3)}
          </Label>
        )}
        <Label at={[0.55, f(0.55)]} attach="nw" color={C.f} size={12}>
          y = f(x)
        </Label>
      </Plane>
      <Controls>
        <Slider label="m" value={m} onChange={slide} min={0} max={2} step={0.001} format={v => v.toFixed(3)} />
        <Buttons>
          {(['A', 'B', 'C', 'D', 'E'] as Opt[]).map(o => (
            <Toggle key={o} label={`Option ${o}`} checked={opt === o} onChange={() => pick(o)} />
          ))}
        </Buttons>
        <Readouts>
          {opt && <Readout tex={`\\text{${opt}: } ${TEX[opt]}`} color={opt === 'E' ? C.good : C.bad} />}
          <Readout tex={`\\int_0^m f(x)\\,dx=\\frac{m^2}{3}-\\frac{m^4}{48}=${left.toFixed(3)}`} color={C.f} />
          <Readout tex={`m^4-16m^2+24=${lhs.toFixed(3)}`} color={Math.abs(lhs) < 5e-4 ? C.good : undefined} />
        </Readouts>
        {notice}
      </Controls>
    </div>
  )
}
