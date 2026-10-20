// 2022 Specialist NHT — Exam 2, MCQ 7. The NHT report gives the answer key only, with no
// statistics. Complex numbers: which Argand diagram shows the five solutions of z⁵ = 6 + 30i —
// modulus 936^(1/10) ≈ 1.98, arguments tan⁻¹(5)/5 + 2kπ/5 ≈ 15.7°, 87.7°, 159.7°, 231.7°,
// 303.7°. Question text transcribed from the original paper; each option is the actual VCAA
// figure, cropped from the official exam PDF at 300 dpi, option letters excluded. Solution is
// original; the answer A agrees with the report's key.
// The point positions quoted for each option were measured from the 300 dpi crops (gridline
// calibration, dot centroids): A r ≈ 1.98 at ≈ 16°, 88°, 159°, 232°, 304° (the five roots, which
// sympy gives as 1.908 + 0.538i, 0.078 + 1.981i, −1.859 + 0.686i, −1.227 − 1.556i,
// 1.101 − 1.648i); B r ≈ 4.95 and D r ≈ 3.15 at the right angles; C r ≈ 2 at ≈ 2°, 74°, 146°,
// 218°, 290°; E r ≈ 2 at ≈ 57°, 128°, 199°, 272°, 345°, the reflection of A in the real axis
// (the solutions of z⁵ = 6 − 30i).
// Interactive diagram (§15): interactives/spec-2022nht-mcq7-roots.tsx (this site's own
// explanatory figure) builds the five solutions one 72° step at a time and can overlay option E's
// mirror-image points.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import optASrc from './spec-2022nht-mcq7-optA.png'
import optBSrc from './spec-2022nht-mcq7-optB.png'
import optCSrc from './spec-2022nht-mcq7-optC.png'
import optDSrc from './spec-2022nht-mcq7-optD.png'
import optESrc from './spec-2022nht-mcq7-optE.png'

const RootsWidget = lazyWidget(() => import('../interactives/spec-2022nht-mcq7-roots'))

function Argand({ src, letter, alt }: { src: string; letter: string; alt: string }) {
  return <img loading="lazy" decoding="async" src={src} alt={`Option ${letter}, cropped from the VCAA paper: ${alt}`} className="w-full max-w-[240px]" />
}

const EXAMINER: MCQExaminerStats = { percentages: {}, answer: 'A' }

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="|6+30i|=\sqrt{6^2+30^2}=\sqrt{936}" />,
    reason: <>To take fifth roots, first write <Katex tex="6+30i" /> in polar form, starting with its modulus.</>,
  },
  {
    working: <Katex display tex="\operatorname{Arg}(6+30i)=\tan^{-1}\!\left(\tfrac{30}{6}\right)=\tan^{-1}(5)" />,
    reason: <>Both parts are positive, so <Katex tex="6+30i" /> is in the first quadrant and <Katex tex="\tan^{-1}" /> gives the argument directly (<Katex tex="\approx1.373" />, about <Katex tex="78.7^\circ" />).</>,
  },
  {
    working: <Katex display tex="\begin{aligned}z&=\left(\sqrt{936}\right)^{1/5}\operatorname{cis}\!\left(\frac{\tan^{-1}(5)+2k\pi}{5}\right)\\ k&=0,1,2,3,4\end{aligned}" />,
    reason: <>De Moivre in reverse: a fifth root has the fifth root of the modulus and a fifth of the argument. Adding <Katex tex="2k\pi" /> to the argument doesn&apos;t change <Katex tex="6+30i" />, but a fifth of it gives five different solutions.</>,
  },
  {
    working: <Katex display tex="|z|=936^{1/10}\approx1.98" />,
    reason: <>All five solutions are on one circle about the origin, radius just under <Katex tex="2" />.</>,
    more: <>Since <Katex tex="2^{10}=1024" /> is a little more than <Katex tex="936" />, the radius is a little less than <Katex tex="2" />.</>,
  },
  {
    working: <Katex display tex="\arg z\approx15.7^\circ,\ 87.7^\circ,\ 159.7^\circ,\ 231.7^\circ,\ 303.7^\circ" />,
    reason: <>The first is <Katex tex="\tfrac15\tan^{-1}(5)\approx15.7^\circ" />; each of the others is a further <Katex tex="\tfrac{2\pi}{5}=72^\circ" /> round the circle.</>,
    more: <><Cas fn="cSolve">cSolve(z^5=6+30i, z)</Cas> lists the five solutions: approximately <Katex tex="1.91+0.54i" />, <Katex tex="0.08+1.98i" />, <Katex tex="-1.86+0.69i" />, <Katex tex="-1.23-1.56i" /> and <Katex tex="1.10-1.65i" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&\text{A: } r\approx2,\ \text{points at}\\ &\approx16^\circ,\,88^\circ,\,159^\circ,\,232^\circ,\,304^\circ\end{aligned}" />,
    reason: <>Check each diagram for both features: the radius, and one point just above the positive real axis with one just right of the positive imaginary axis. Only option A has both.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{A}}" />,
    reason: <>Matches option <b>A</b>.</>,
    more: <>B and D have the right angles but the wrong radius: B&apos;s points are about <Katex tex="5" /> from <Katex tex="O" /> (one is near <Katex tex="5i" />), D&apos;s about <Katex tex="3" />. C has the right radius but a point on the positive real axis at <Katex tex="2" />, so its angles start at about <Katex tex="0^\circ" /> instead of <Katex tex="15.7^\circ" />. E has the right radius and is A reflected in the real axis: its point near <Katex tex="-2i" /> and its point just <i>below</i> the positive real axis give it away. Those are the solutions of <Katex tex="z^5=6-30i" />.</>,
  },
]

export default function SpecialistQ7_2022NHT() {
  return (
    <MCQShell
      question={
        <p>
          Which one of the following could represent the solutions to <Katex tex="z^5=6+30i" /> on an Argand diagram?
        </p>
      }
      options={[
        { letter: 'A', content: <Argand src={optASrc} letter="A" alt="five points about 2 from O, near 1.9 + 0.5i, 2i, −1.9 + 0.7i, −1.2 − 1.6i and 1.1 − 1.7i, axes −4 to 4" />, isAnswer: true },
        { letter: 'B', content: <Argand src={optBSrc} letter="B" alt="five points about 5 from O, one near 5i, axes −10 to 10" /> },
        { letter: 'C', content: <Argand src={optCSrc} letter="C" alt="five points about 2 from O, one on the positive real axis at 2, axes −4 to 4" /> },
        { letter: 'D', content: <Argand src={optDSrc} letter="D" alt="five points about 3 from O, one near 3i, axes −6 to 6" /> },
        { letter: 'E', content: <Argand src={optESrc} letter="E" alt="five points about 2 from O, one near −2i and one just below the positive real axis, axes −4 to 4" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <Explore title="Five solutions, one circle, 72° apart — and the first sits at a fifth of 78.7°">
          <RootsWidget />
        </Explore>
      }
    />
  )
}
