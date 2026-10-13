// 2015 Methods Exam 2 Q5c(ii) — the same single-dip picture as c(i), zoomed in on small d. The
// minimum on [0, 5] is at t = 5 exactly when the dip t* = ln(2(10−d)/d) is at or right of t = 5,
// i.e. 0 < d ≤ 20/(2 + e⁵) ≈ 0.133: the boundary value is included (V'(5) = 0 there) and d = 0 is
// excluded by d ∈ (0, 10). Uses the Dip component from the c(i) widget.

import { Dip } from './meth-2015e2-q5ci-dip'

export default function DipCII() {
  return (
    <Dip
      cfg={{
        end: 5,
        dB: 20 / (2 + Math.exp(5)),
        dBTex: '\\tfrac{20}{2+e^5}',
        dBPlain: '20/(2+e⁵)',
        start: 0.3,
        min: 0.02,
        max: 0.6,
        step: 0.001,
        x: [-1, 7],
        y: [0, 12],
        yStep: 2,
      }}
    />
  )
}
