// 2023 Specialist Mathematics — Exam 2, MCQ 5. VCAA examination report: 34% correct.
// Given |z̄| = 4 and arg(z³) = −π with z in the first quadrant, express z² in terms of z̄.
// Question text transcribed from the original paper. Solution is original.
// Answer E checked with sympy: z = 4 cis(π/3), z² = 16 cis(2π/3) = −4z̄; the other options are
// A 16 cis(π/3), B 8 cis(2π/3), C 12 cis(π/3), D 16 cis(−2π/3). (E also holds for every cube root of
// −64, since z² = z³z̄/|z|².) arg(z³) = −π is read as "an argument of z³ is −π" (−π is outside the
// principal range). No distractor slip is attributed to the report: the final row states what each option
// gets wrong, and names the squaring slips that would produce A and B as possibilities only.
// Interactive diagram (§15): interactives/spec-2023-mcq5-options.tsx plots z, z̄ and z² on the Argand
// diagram with the circle |w| = 16; buttons draw each option's point and compare its modulus and
// argument with z²'s (opens on B, the most chosen wrong option).
// Concise/Detailed (Oct 2026): reasons trimmed to the step's "why"; the arg-vs-principal-Arg note, the
// rejected k values, the multiplier example, the option-by-option analysis and the z³z̄/|z|² route (now
// with the note that it never needs the quadrant) moved into rows' `more` (Detailed only).

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
        Polar form, with <Katex tex="\theta = \arg(z)" />, turns the given fact about <Katex tex="z^3" /> into a fact
        about <Katex tex="\theta" />. De Moivre&apos;s theorem: cubing cubes the modulus (<Katex tex="4^3 = 64" />) and
        triples the argument.
      </>
    ),
  },
  {
    working: <Katex display tex="3\theta = -\pi + 2k\pi,\quad k \in Z" />,
    reason: (
      <>
        <Katex tex="\arg(z^3) = -\pi" /> says <Katex tex="z^3" /> points along the negative real axis. Every angle that
        differs from <Katex tex="-\pi" /> by a whole number of turns of <Katex tex="2\pi" /> points the same way, so{' '}
        <Katex tex="3\theta" /> could be any of them.
      </>
    ),
    more: (
      <>
        Lower-case &ldquo;arg&rdquo; means <em>an</em> argument, not the principal argument in{' '}
        <Katex tex="(-\pi, \pi]" /> (which <Katex tex="-\pi" /> is not even in). So <Katex tex="3\theta" /> need not
        equal <Katex tex="-\pi" /> itself: the quadrant of <Katex tex="z" /> decides which turn is the right one.
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
        <Katex tex="\pi" /> (<Katex tex="k = 1" />).
      </>
    ),
    more: (
      <>
        Dividing <Katex tex="-\pi" /> by 3 straight away gives <Katex tex="\theta = -\tfrac{\pi}{3}" /> (
        <Katex tex="k = 0" />), which is in the fourth quadrant, so it is rejected; <Katex tex="k = 2" /> gives{' '}
        <Katex tex="\theta = \pi" />, on the negative real axis, also rejected. These three angles give the three cube
        roots of <Katex tex="-64" />, and the quadrant condition picks out one of them.
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
        The options are written in terms of <Katex tex="z" /> and <Katex tex="\bar z" />, so we need both in polar form.
        Squaring squares the modulus and doubles the argument (De Moivre); conjugating keeps the modulus and negates the
        argument.
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
        Write each option in polar form and compare with <Katex tex="z^2 = 16\,\mathrm{cis}\left(\tfrac{2\pi}{3}\right)" />:
        an option equals <Katex tex="z^2" /> only if the modulus <em>and</em> the argument both match. A real
        multiplier scales the modulus by its size; a negative one also adds <Katex tex="\pi" /> to the argument, since{' '}
        <Katex tex="-1 = \mathrm{cis}(\pi)" />.
      </>
    ),
    more: (
      <>
        For example,{' '}
        <Katex tex="-4\bar z = 4 \times \mathrm{cis}(\pi) \times 4\,\mathrm{cis}\left(-\tfrac{\pi}{3}\right) = 16\,\mathrm{cis}\left(\tfrac{2\pi}{3}\right)" />
        , while a positive multiplier such as the 4 in <Katex tex="4z" /> leaves the argument alone. For D, De Moivre again: squaring <Katex tex="\bar z = 4\,\mathrm{cis}\left(-\tfrac{\pi}{3}\right)" /> gives
        modulus 16 and argument <Katex tex="-\tfrac{2\pi}{3}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{z^2 = -4\bar z}" />,
    reason: (
      <>
        Matches option <b>E</b>, the only option with modulus 16 and argument <Katex tex="\tfrac{2\pi}{3}" />.
      </>
    ),
    more: (
      <>
        <p>
          A (<Katex tex="4z" />) and D (<Katex tex="\bar z^{\,2}" />, which is <Katex tex="z^2" /> reflected in the real
          axis) have the right modulus but the wrong argument. A is what you get by squaring the modulus but forgetting
          to double the argument. B (<Katex tex="-2\bar z" />) points the right way but has modulus 8, not 16:
          that is what doubling the modulus 4, instead of squaring it, would give. C (<Katex tex="3z" />) matches
          neither.
        </p>
        <p>
          A quicker route, with no polar form for the options: <Katex tex="z^3 = 64\,\mathrm{cis}(-\pi) = -64" /> and{' '}
          <Katex tex="z\bar z = |z|^2 = 16" />, so multiplying top and bottom of <Katex tex="\tfrac{z^3}{z}" /> by{' '}
          <Katex tex="\bar z" /> gives
        </p>
        <Katex display tex="z^2 = \frac{z^3 \bar z}{z\bar z} = \frac{-64\,\bar z}{16} = -4\bar z" />
        <p>
          This route never uses the quadrant: all three cube roots of <Katex tex="-64" /> have modulus 4, so{' '}
          <Katex tex="z^2 = -4\bar z" /> for each of them.
        </p>
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
        <Explore title="Only E lands on z²: A and D point the wrong way, and B stops halfway">
          <W />
        </Explore>
      }
    />
  )
}
