// 2017 Methods Exam 1 Q7c — the same x → h → u → f → y chain as part b.ii's widget, now with
// h(x) = x² + 3, which only ever hands f the inputs [3, ∞). The piece of f from (0, 1) to (3, 2) is
// never used, so the range of f(h(x)) starts at f(3) = 2, not at f(0) = 1. A toggle switches to
// part b.ii's g for comparison, and another tests the wrong idea "it's just ran f = [1, ∞)" by
// chasing y = 1.5 back to an input u = 1.25 that h can never produce.

import { Chain } from './meth-2017e1-q7bii-chain'

export default function ChainH() {
  return <Chain start="h" compare />
}
