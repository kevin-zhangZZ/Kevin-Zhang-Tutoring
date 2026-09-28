// 2017 Specialist Mathematics — Exam 2, MCQ 3. VCAA examination report: 47% correct.
// Count the distinct roots of a product of a quartic and a quadratic in z — the trap is that
// one root of each factor coincides.
// Question text transcribed from the original paper; solution is original. Answer D agrees with
// the report and itute.
// Widget: interactives/spec-2017-mcq3-roots.tsx — three steps on an Argand diagram: the fourth
// roots of unity, then the quadratic's roots (−i lands on one of them), then the five distinct points.
// WrongMethod: option E (35%) — 4 + 2 = 6 without checking for a shared root.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const RootsWidget = lazyWidget(() => import('../interactives/spec-2017-mcq3-roots'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 4, C: 9, D: 47, E: 35 },
  answer: 'D',
  noAnswer: 0,
  comment: 'Use of complex solve gives five solutions.',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="z^4-1=0 \;\implies\; z^4=1" />,
    reason: (
      <>
        A product is zero when either factor is zero, so solve each factor separately and then combine the
        answers. Because the question asks for <em>distinct</em> roots, check the combined list for repeats
        before counting.
      </>
    ),
  },
  {
    working: <Katex display tex="z \in \{1,\,-1,\,i,\,-i\}" />,
    reason: (
      <>
        <Katex tex="z^4-1=(z^2-1)(z^2+1)=(z-1)(z+1)(z-i)(z+i)" />: the four fourth roots of unity, a
        quarter-turn apart on the unit circle.
      </>
    ),
  },
  {
    working: <Katex display tex="z^2+3iz-2=0" />,
    reason: <>A quadratic with a complex coefficient: the quadratic formula works exactly as for real coefficients.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\begin{aligned} z &= \frac{-3i\pm\sqrt{(3i)^2-4(1)(-2)}}{2} \\ &= \frac{-3i\pm\sqrt{-9+8}}{2} \end{aligned}" />
        <Katex display tex="= \frac{-3i\pm i}{2}" />
      </>
    ),
    reason: <>The quadratic formula, remembering that <Katex tex="i^2=-1" />.</>,
  },
  {
    working: <Katex display tex="z = \frac{-3i+i}{2}=-i, \quad \text{or} \quad z=\frac{-3i-i}{2}=-2i" />,
    reason: (
      <>
        Check by expanding: <Katex tex="(z+i)(z+2i)=z^2+3iz+2i^2=z^2+3iz-2" />. Spotting that factorisation (two
        numbers with sum <Katex tex="3i" /> and product <Katex tex="-2" />) is a quicker route.
      </>
    ),
  },
  {
    working: <Katex display tex="\{1,-1,i,-i\} \cup \{-i,-2i\} = \{1,-1,i,-i,-2i\}" />,
    reason: <>Combine the two solution sets — but <Katex tex="-i" /> appears in <em>both</em>, so it's only counted once.</>,
  },
  {
    working: <Katex display tex="\boxed{5 \text{ distinct roots}}" />,
    reason: (
      <>
        Matches option <b>D</b>. Option E, <Katex tex="4+2=6" />, counts the shared root{' '}
        <Katex tex="z=-i" /> twice (see below). On CAS, complex solve (cSolve) of the whole equation lists the five
        solutions; the ordinary real solve would return only <Katex tex="z=\pm1" />.
      </>
    ),
  },
]

export default function SpecialistQ3_2017() {
  return (
    <MCQShell
      question={
        <p>
          The number of distinct roots of the equation <Katex tex="(z^4-1)(z^2+3iz-2)=0" />, where{' '}
          <Katex tex="z\in C" />, is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="2" /> },
        { letter: 'B', content: <Katex tex="3" /> },
        { letter: 'C', content: <Katex tex="4" /> },
        { letter: 'D', content: <Katex tex="5" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="6" /> },
      ]}
      rows={ROWS}
      background={
        <Background title="Distinct roots and multiplicity">
          <p>
            A polynomial of degree <Katex tex="n" /> has exactly <Katex tex="n" /> roots in <Katex tex="C" /> when each
            root is counted as many times as its factor appears. Here the full factorisation is{' '}
            <Katex tex="(z-1)(z+1)(z-i)(z+i)^2(z+2i)" />: degree 6, but <Katex tex="(z+i)" /> appears twice, so{' '}
            <Katex tex="-i" /> is a double root. Six roots counted with multiplicity, five distinct.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="Six roots with repeats, only five different points">
            <RootsWidget />
          </Explore>
          <WrongMethod
            title="z⁴ − 1 gives 4 roots and the quadratic gives 2, so 4 + 2 = 6"
            source="35% chose E"
            working={<Katex display tex="4+2=6" />}
          >
            Adding the counts only works when the two lists share no roots. Here <Katex tex="-i" /> is in both:{' '}
            <Katex tex="(-i)^4-1=0" /> and <Katex tex="(-i)^2+3i(-i)-2=-1+3-2=0" />. It is one root found twice, so
            6 is the count with multiplicity, not the number of distinct roots. To catch it, write both solution sets
            out in full and look for repeats before counting.
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
