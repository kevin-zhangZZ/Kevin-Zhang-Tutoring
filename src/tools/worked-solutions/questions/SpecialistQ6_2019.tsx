// 2019 Specialist Mathematics — Exam 2, MCQ 6. VCAA examination report: 56% correct.
// Finding Arg(z^5/w^4) given Arg(z) and Arg(w). Question text transcribed from the original
// paper. Solution is original.
// Extras: interactive (interactives/spec-2019-mcq6-turns.tsx) — build z⁵ one factor at a time (quarter-
// turns anticlockwise, wrapping past a full turn), then divide by w one factor at a time (π/4 back
// each); w⁴ on its own lies along the negative real axis. WrongMethod for option B (15%): treating w⁴
// as "just a real number" that leaves the argument alone, which gives exactly Arg(z⁵) = π/2 (sympy:
// z = i, w = cis(π/4) gives z⁵/w⁴ = −i). D and E lie outside (−π, π], so they are ruled out as
// principal arguments without naming a slip.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const Turns = lazyWidget(() => import('../interactives/spec-2019-mcq6-turns'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 56, B: 15, C: 8, D: 15, E: 6 },
  answer: 'A',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="5\,\mathrm{Arg}(z) = 5\times\tfrac{\pi}{2} = \tfrac{5\pi}{2}" />,
    reason: (
      <>
        By de Moivre, raising to the 5th power multiplies the argument by 5: <Katex tex="z^5" /> is <Katex tex="z" />{' '}
        rotated by <Katex tex="\mathrm{Arg}(z)" /> five times. So <Katex tex="\tfrac{5\pi}{2}" /> is <em>an</em> argument of{' '}
        <Katex tex="z^5" />, but it is bigger than <Katex tex="\pi" />, so it isn&apos;t the principal one.
      </>
    ),
  },
  {
    working: <Katex display tex="\mathrm{Arg}(z^5) = \tfrac{5\pi}{2} - 2\pi = \tfrac{\pi}{2}" />,
    reason: (
      <>
        Subtract a full turn to land in <Katex tex="(-\pi,\pi]" />. A full turn changes nothing, so <Katex tex="z^5" />{' '}
        points straight up, the same way as <Katex tex="z" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\mathrm{Arg}(w^4) = 4\times\tfrac{\pi}{4} = \pi" />,
    reason: (
      <>
        Same rule for <Katex tex="w^4" />. <Katex tex="\pi" /> is already in <Katex tex="(-\pi,\pi]" /> (the top end is
        included). An argument of <Katex tex="\pi" /> means <Katex tex="w^4" /> lies on the negative real axis: it is a
        negative real number.
      </>
    ),
  },
  {
    working: <Katex display tex="\mathrm{Arg}\!\left(\frac{z^5}{w^4}\right) = \mathrm{Arg}(z^5) - \mathrm{Arg}(w^4) = \tfrac{\pi}{2} - \pi" />,
    reason: (
      <>
        Dividing complex numbers divides the moduli and <em>subtracts</em> the arguments. The result can land outside{' '}
        <Katex tex="(-\pi,\pi]" />, in which case you add or subtract <Katex tex="2\pi" />, so check it.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{= -\tfrac{\pi}{2}}" />,
    reason: (
      <>
        <Katex tex="-\tfrac{\pi}{2}" /> is inside <Katex tex="(-\pi,\pi]" />, so no adjustment is needed. Matches option{' '}
        <b>A</b>. Options <b>D</b> and <b>E</b> are both bigger than <Katex tex="\pi" />, so they can never be a value of{' '}
        <Katex tex="\mathrm{Arg}" />; option <b>B</b> is <Katex tex="\mathrm{Arg}(z^5)" /> on its own.
      </>
    ),
    more: <>See the Common Mistake below for option B.</>,
  },
]

export default function SpecialistQ6_2019() {
  return (
    <MCQShell
      question={
        <p>
          Let <Katex tex="z,w\in C" />, where <Katex tex="\mathrm{Arg}(z) = \tfrac{\pi}{2}" /> and{' '}
          <Katex tex="\mathrm{Arg}(w) = \tfrac{\pi}{4}" />.
          <br />
          The value of <Katex tex="\mathrm{Arg}\!\left(\dfrac{z^5}{w^4}\right)" /> is
        </p>
      }
      background={
        <Background title="Arguments add when you multiply, subtract when you divide">
          <p>
            In polar form, <Katex tex="r_1\,\mathrm{cis}\,\alpha \times r_2\,\mathrm{cis}\,\beta = r_1r_2\,\mathrm{cis}(\alpha+\beta)" />{' '}
            and <Katex tex="\dfrac{r_1\,\mathrm{cis}\,\alpha}{r_2\,\mathrm{cis}\,\beta} = \dfrac{r_1}{r_2}\,\mathrm{cis}(\alpha-\beta)" />.
            Multiplying by a number rotates by its argument; dividing rotates back. Powers are repeated multiplication, so{' '}
            <Katex tex="z^n" /> has argument <Katex tex="n\,\mathrm{Arg}(z)" /> (de Moivre).
          </p>
          <p>
            The catch: the <em>principal</em> argument <Katex tex="\mathrm{Arg}" /> must lie in <Katex tex="(-\pi,\pi]" />,
            and adding or multiplying angles can overshoot. Adding or subtracting <Katex tex="2\pi" /> (a full turn) brings it
            back without changing the direction. The moduli never affect the argument, which is why the question can leave
            them out.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="-\tfrac{\pi}{2}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="\tfrac{\pi}{2}" /> },
        { letter: 'C', content: <Katex tex="\pi" /> },
        { letter: 'D', content: <Katex tex="\tfrac{5\pi}{2}" /> },
        { letter: 'E', content: <Katex tex="\tfrac{7\pi}{2}" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="Five quarter-turns forward, then half a turn back">
            <Turns />
          </Explore>
          <WrongMethod
            title="w⁴ is just a real number, so dividing by it doesn't change the argument"
            source="15% chose B"
            working={<Katex display tex="\mathrm{Arg}\!\left(\frac{z^5}{w^4}\right) = \mathrm{Arg}(z^5) = \tfrac{\pi}{2} \quad \text{(option B)}" />}
          >
            <p>
              <Katex tex="w^4" /> is real, but it is a <em>negative</em> real: its argument is <Katex tex="\pi" />, not{' '}
              <Katex tex="0" />. Dividing by a positive real only rescales; dividing by a negative real also reverses the
              direction, a half-turn, which takes <Katex tex="\tfrac{\pi}{2}" /> to <Katex tex="-\tfrac{\pi}{2}" />. Try a
              concrete pair to check: <Katex tex="z=i" /> and <Katex tex="w=\mathrm{cis}\,\tfrac{\pi}{4}" /> give{' '}
              <Katex tex="z^5=i" /> and <Katex tex="w^4=\mathrm{cis}\,\pi=-1" />, so <Katex tex="\dfrac{z^5}{w^4}=-i" />,
              which points straight down.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
