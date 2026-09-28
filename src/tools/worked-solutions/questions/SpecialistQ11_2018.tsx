// 2018 Specialist Mathematics — Exam 2, MCQ 11. VCAA examination report: 80% correct. The
// value of m making the acute angle between two vectors 30°. Question text transcribed from
// the original paper; VCAA printed no diagram and neither does the stem here (guide §7).
// Both roots confirmed in sympy; so is each distractor's angle (A: 45°, B: 60°).
// Note: negative m (−√3 or −1/√3) makes the angle between a and b 150°, not 30°, so reading
// "the acute angle between a and b" as the angle between the vectors, only positive m works;
// no option lists negative values, so C is unaffected either way.
// Widget (extras): spec-2018-mcq11-mirror — a and b are mirror images in y = x, so 30° means
// each sits 15° off the mirror, on either side: the two reciprocal roots.
// WrongMethod: using sin 30° = ½ gives exactly option B (10%).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Cas } from '../CasRef'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const MirrorWidget = lazyWidget(() => import('../interactives/spec-2018-mcq11-mirror'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 4, B: 10, C: 80, D: 5, E: 2 },
  answer: 'C',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a}\cdot\underset{\sim}{b} = m(1)+1(m) = 2m" />,
    reason: (
      <>
        An angle between two vectors is the cue for the dot product,{' '}
        <Katex tex="\underset{\sim}{a}\cdot\underset{\sim}{b}=|\underset{\sim}{a}||\underset{\sim}{b}|\cos\theta" />:
        it is the one formula that links the components to the angle. First the dot product itself: multiply
        matching components and add.
      </>
    ),
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{a}\right| = \left|\underset{\sim}{b}\right| = \sqrt{m^2+1}" />,
    reason: (
      <>
        Same two components in swapped order, so the same length. (Swapping the components reflects a vector
        in the line <Katex tex="y=x" />, so <Katex tex="\underset{\sim}{b}" /> is the mirror image of{' '}
        <Katex tex="\underset{\sim}{a}" />. The widget below uses this.)
      </>
    ),
  },
  {
    working: <Katex display tex="\cos(30^\circ) = \frac{\underset{\sim}{a}\cdot\underset{\sim}{b}}{\left|\underset{\sim}{a}\right|\left|\underset{\sim}{b}\right|} = \frac{2m}{m^2+1}" />,
    reason: (
      <>
        The angle formula, rearranged for <Katex tex="\cos\theta" />. The product of the two moduli is{' '}
        <Katex tex="\left(\sqrt{m^2+1}\right)^2=m^2+1" />, with no surd left.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{\sqrt3}{2} = \frac{2m}{m^2+1} \implies \sqrt3\left(m^2+1\right) = 4m" />,
    reason: (
      <>
        Cross-multiplying. Before solving, note what to expect: an acute angle has a positive cosine, so{' '}
        <Katex tex="2m" /> must be positive and any valid <Katex tex="m" /> is positive.
      </>
    ),
  },
  {
    working: <Katex display tex="\sqrt3 m^2 - 4m + \sqrt3 = 0" />,
    reason: <>A quadratic in <Katex tex="m" /> with surd coefficients — awkward-looking but perfectly ordinary.</>,
  },
  {
    working: <Katex display tex="m = \frac{4\pm\sqrt{16-12}}{2\sqrt3} = \frac{4\pm2}{2\sqrt3}" />,
    reason: (
      <>
        Quadratic formula; the discriminant is <Katex tex="16-4(\sqrt3)(\sqrt3)=4" />, a perfect square. On CAS,{' '}
        <Cas fn="solve">solve(√(3)/2=2m/(m^2+1), m)</Cas> gives both roots at once.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="m = \frac{6}{2\sqrt3} = \sqrt3" />
        <Katex display tex="\text{or } \ m = \frac{2}{2\sqrt3} = \frac{1}{\sqrt3}" />
      </>
    ),
    reason: (
      <>
        Both are positive, so both give an acute angle, and both count. They are reciprocals, which makes
        sense: replacing <Katex tex="m" /> by <Katex tex="\tfrac1m" /> turns{' '}
        <Katex tex="\underset{\sim}{a}" /> into a multiple of the old <Katex tex="\underset{\sim}{b}" /> and
        vice versa, so the angle between them is unchanged.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{m = \sqrt3 \ \text{ or } \ m = \frac{1}{\sqrt3}}" />,
    reason: (
      <>
        Matches option <b>C</b>. Option <b>B</b>, chosen by <Katex tex="10\%" />, is what setting the ratio
        equal to <Katex tex="\sin(30^\circ)=\tfrac12" /> gives (see below). Option <b>A</b>&apos;s values make
        the ratio <Katex tex="\tfrac{1}{\sqrt2}" />, an angle of <Katex tex="45^\circ" />.
      </>
    ),
  },
]

export default function SpecialistQ11_2018() {
  return (
    <MCQShell
      question={
        <p>
          Consider the vectors given by{' '}
          <Katex tex="\underset{\sim}{a}=m\underset{\sim}{i}+\underset{\sim}{j}" /> and{' '}
          <Katex tex="\underset{\sim}{b}=\underset{\sim}{i}+m\underset{\sim}{j}" />, where{' '}
          <Katex tex="m\in R" />. If the acute angle between{' '}
          <Katex tex="\underset{\sim}{a}" /> and <Katex tex="\underset{\sim}{b}" /> is{' '}
          <Katex tex="30^\circ" />, then <Katex tex="m" /> equals
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\sqrt2\pm1" /> },
        { letter: 'B', content: <Katex tex="2\pm\sqrt3" /> },
        { letter: 'C', content: <Katex tex="\sqrt3,\ \dfrac{1}{\sqrt3}" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="\dfrac{\sqrt3}{4-\sqrt3}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{\sqrt{39}}{13}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <>
          <Explore title="Why two values of m: a and b are mirror images in y = x">
            <MirrorWidget />
          </Explore>
          <WrongMethod
            title="30° goes with ½, so set the ratio equal to ½"
            source="10% chose B"
            working={
              <>
                <Katex display tex="\frac{2m}{m^2+1}=\frac12 \implies m^2-4m+1=0" />
                <Katex display tex="\implies m=2\pm\sqrt3" />
              </>
            }
          >
            <Katex tex="\tfrac12" /> is <Katex tex="\sin(30^\circ)" />, but the dot product formula contains the{' '}
            <em>cosine</em>, and <Katex tex="\cos(30^\circ)=\tfrac{\sqrt3}{2}" />. With{' '}
            <Katex tex="m=2\pm\sqrt3" /> the ratio is <Katex tex="\tfrac12=\cos(60^\circ)" />, so those vectors are{' '}
            <Katex tex="60^\circ" /> apart. A quick sense check: a small angle means the vectors nearly line up, so
            its cosine should be close to <Katex tex="1" /> (about <Katex tex="0.87" /> for{' '}
            <Katex tex="30^\circ" />), not <Katex tex="0.5" />.
          </WrongMethod>
        </>
      }
    />
  )
}
