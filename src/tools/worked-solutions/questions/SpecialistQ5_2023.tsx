// 2023 Specialist Mathematics — Exam 2, MCQ 5. VCAA examination report: 34% correct.
// Given |z̄| = 4 and arg(z³) = −π with z in the first quadrant, express z² in terms of z̄.
// Question text transcribed from the original paper. Solution is original.
// Answer E checked with sympy: z = 4 cis(π/3), z² = 16 cis(2π/3) = −4z̄; the other options are
// A 16 cis(π/3), B 8 cis(2π/3), C 12 cis(π/3), D 16 cis(−2π/3). (E also holds for every cube root of
// −64, since z² = z³z̄/|z|².) arg(z³) = −π is read as "an argument of z³ is −π" (−π is outside the
// principal range). No distractor slip is attributed: the final row states what each option gets wrong.
// Interactive diagram (§15): interactives/spec-2023-mcq5-options.tsx plots z, z̄ and z² on the Argand
// diagram with the circle |w| = 16; buttons draw each option's point and compare its modulus and
// argument with z²'s (opens on B, the most chosen wrong option).

import Katex from '../../../components/Katex'
import { Explore, lazyWidget } from '../Explore'
import { MCQShell } from '../MCQShell'
import type { WorkingRow, MCQExaminerStats } from '../QuestionParts'

const W = lazyWidget(() => import('../interactives/spec-2023-mcq5-options'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 15, B: 20, C: 13, D: 18, E: 34 },
  answer: 'E',
  comment: (
    <>
      <Katex tex="\arg\left(z^3\right)=-\pi\Rightarrow\arg(z)=\tfrac\pi3" />,{' '}
      <Katex tex="z^2=16\,\mathrm{cis}\!\left(\tfrac{2\pi}{3}\right)=-4\bar z" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="|z| = |\bar z| = 4" />,
    reason: (
      <>
        The conjugate <Katex tex="\bar z" /> is <Katex tex="z" /> reflected in the real axis, so it is the same distance
        from the origin: same modulus.
      </>
    ),
  },
  {
    working: <Katex display tex="z = 4\,\mathrm{cis}(\theta) \implies z^3 = 64\,\mathrm{cis}(3\theta)" />,
    reason: (
      <>
        Write <Katex tex="z" /> in polar form with <Katex tex="\theta = \arg(z)" />. De Moivre&apos;s theorem: cubing cubes the modulus (<Katex tex="4^3 = 64" />) and triples the argument. This
        turns the given fact about <Katex tex="z^3" /> into a fact about <Katex tex="\theta" />.
      </>
    ),
  },
  {
    working: <Katex display tex="3\theta = -\pi + 2k\pi,\quad k \in Z" />,
    reason: (
      <>
        <Katex tex="\arg(z^3) = -\pi" /> says <Katex tex="z^3" /> points along the negative real axis. Lower-case
        &ldquo;arg&rdquo; allows any argument, not just the principal one in <Katex tex="(-\pi, \pi]" />, so{' '}
        <Katex tex="3\theta" /> need not equal <Katex tex="-\pi" /> exactly: it can differ from it by any whole number
        of turns of <Katex tex="2\pi" />, which all point the same way.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{gathered} 0 < \theta < \tfrac{\pi}{2} \implies 0 < 3\theta < \tfrac{3\pi}{2} \\ \implies 3\theta = \pi \implies \theta = \tfrac{\pi}{3} \end{gathered}"
      />
    ),
    reason: (
      <>
        <Katex tex="\mathrm{Re}(z) > 0" /> and <Katex tex="\mathrm{Im}(z) > 0" /> put <Katex tex="z" /> in the first
        quadrant. The only value of <Katex tex="-\pi + 2k\pi" /> between 0 and <Katex tex="\tfrac{3\pi}{2}" /> is{' '}
        <Katex tex="\pi" /> (<Katex tex="k = 1" />). Dividing <Katex tex="-\pi" /> by 3 straight away gives{' '}
        <Katex tex="\theta = -\tfrac{\pi}{3}" /> (<Katex tex="k = 0" />), which is in the fourth quadrant, so it is
        rejected; <Katex tex="k = 2" /> gives <Katex tex="\theta = \pi" />, on the negative real axis, also rejected.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{gathered} z = 4\,\mathrm{cis}\left(\tfrac{\pi}{3}\right),\quad z^2 = 16\,\mathrm{cis}\left(\tfrac{2\pi}{3}\right) \\ \bar z = 4\,\mathrm{cis}\left(-\tfrac{\pi}{3}\right) \end{gathered}"
      />
    ),
    reason: (
      <>
        Squaring squares the modulus and doubles the argument (De Moivre). The conjugate keeps the modulus and negates the
        argument. The options are written in terms of <Katex tex="z" /> and <Katex tex="\bar z" />, so we need both in
        polar form.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned} \text{A: } 4z &= 16\,\mathrm{cis}\left(\tfrac{\pi}{3}\right) \\ \text{B: } -2\bar z &= 8\,\mathrm{cis}\left(\tfrac{2\pi}{3}\right) \\ \text{C: } 3z &= 12\,\mathrm{cis}\left(\tfrac{\pi}{3}\right) \\ \text{D: } \bar z^{\,2} &= 16\,\mathrm{cis}\left(-\tfrac{2\pi}{3}\right) \\ \text{E: } -4\bar z &= 16\,\mathrm{cis}\left(\tfrac{2\pi}{3}\right) \end{aligned}"
      />
    ),
    reason: (
      <>
        Write each option in polar form and compare with <Katex tex="z^2 = 16\,\mathrm{cis}\left(\tfrac{2\pi}{3}\right)" />.
        Multiplying by a positive number <Katex tex="k" /> multiplies the modulus by <Katex tex="k" /> and leaves the
        argument alone. A negative number also turns the point through <Katex tex="\pi" />, because{' '}
        <Katex tex="-1 = \mathrm{cis}(\pi)" />: for example{' '}
        <Katex tex="-4\bar z = 4 \times 4\,\mathrm{cis}\left(-\tfrac{\pi}{3} + \pi\right)" />. Two complex numbers are
        equal only if the moduli <em>and</em> the arguments match, and only E matches on both.
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{gathered} z\bar z = |z|^2 = 16,\quad z^3 = -64 \\ \implies z^2 = \frac{z^3 \bar z}{z\bar z} = \frac{-64\,\bar z}{16} = -4\bar z \end{gathered}" />,
    reason: (
      <>
        A second check, without polar form: <Katex tex="z^3 = 64\,\mathrm{cis}(-\pi) = -64" />, and multiplying top and
        bottom of <Katex tex="\tfrac{z^3}{z}" /> by <Katex tex="\bar z" /> uses <Katex tex="z\bar z = |z|^2" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{z^2 = -4\bar z}" />,
    reason: (
      <>
        Matches option <b>E</b>. A (<Katex tex="4z" />) and D (<Katex tex="\bar z^{\,2}" />, which is{' '}
        <Katex tex="z^2" /> reflected in the real axis) have the right modulus but the wrong argument; B (
        <Katex tex="-2\bar z" />) points the right way but has modulus 8, not 16; C (<Katex tex="3z" />) matches neither.
      </>
    ),
  },
]

export default function SpecialistQ5_2023() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="z" /> be a complex number where <Katex tex="\mathrm{Re}(z)>0" /> and <Katex tex="\mathrm{Im}(z)>0" />.
          <br />
          Given <Katex tex="|\bar z\,| = 4" /> and <Katex tex="\mathrm{arg}(z^3) = -\pi" />, then <Katex tex="z^2" /> is
          equivalent to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="4z" /> },
        { letter: 'B', content: <Katex tex="-2\bar z" /> },
        { letter: 'C', content: <Katex tex="3z" /> },
        { letter: 'D', content: <Katex tex="\bar z^2" /> },
        { letter: 'E', content: <Katex tex="-4\bar z" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <Explore title="An option equals z² only if it matches both the modulus 16 and the argument 2π/3">
          <W />
        </Explore>
      }
    />
  )
}
