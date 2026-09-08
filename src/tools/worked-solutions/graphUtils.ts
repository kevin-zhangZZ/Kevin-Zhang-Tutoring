// Shared helper for plotting an exact mathematical function as a smooth SVG path,
// rather than hand-drawing a handful of waypoints and connecting them with straight
// segments. Samples the real function at high resolution and joins the samples with
// an SVG path — at this density the curve reads as perfectly smooth, and (unlike a
// spline fitted through a few points) it is mathematically exact, not an approximation.
export function functionToPath(
  fn: (x: number) => number,
  xMin: number,
  xMax: number,
  toSvgX: (x: number) => number,
  toSvgY: (y: number) => number,
  steps = 300,
): string {
  let d = ''
  for (let i = 0; i <= steps; i++) {
    const x = xMin + ((xMax - xMin) * i) / steps
    const px = toSvgX(x)
    const py = toSvgY(fn(x))
    d += i === 0 ? `M ${px} ${py}` : ` L ${px} ${py}`
  }
  return d
}
