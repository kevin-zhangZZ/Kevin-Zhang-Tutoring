// 2017 Methods Exam 2 Q4g(ii) — g₁⁻¹(x) = logₑ((x + 2)/2) onto gₖ⁻¹(x) = (1/k)logₑ((x + 2)/2) is a
// dilation by factor 1/k from the x-axis. The same three points as the part (i) widget, reflected
// in y = x: the purple arrows are now vertical (x kept, y multiplied by 1/k). A toggle overlays the
// part (i) picture so each vertical arrow is seen to be the mirror image of a horizontal one.

import { DilationView } from './meth-2017e2-q4gi-dilation'

export default function DilationFromXAxis() {
  return <DilationView inverse />
}
