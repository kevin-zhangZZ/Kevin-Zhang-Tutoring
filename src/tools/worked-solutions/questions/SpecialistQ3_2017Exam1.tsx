// 2017 Specialist Mathematics — Exam 1, Question 3 (3 marks). A real cubic with one given
// complex root: find the other two. Question text transcribed from the original paper (no
// diagram given). Answer checked with sympy and against the VCAA examination report.
// Solution is original. No lettered parts, so this uses the plain card layout.
//
// Method: conjugate root theorem → quadratic factor z² − 2z + 2 → (z² − 2z + 2)(z − c), equate
// coefficients. This is the course method (both scouted tutor videos use it); itute's
// sum-and-product-of-roots shortcut is kept as a note in the "Another Route" Background, since
// relations between roots and coefficients are not in the study design. An earlier version
// called the report's wrong answer −1 − i "the negative" of 1 − i; the negative is −1 + i, and
// −1 − i is 1 − i reflected in the imaginary axis — fixed. The report's "not being able to
// correctly determine G" is kept verbatim (G appears nowhere in the question; presumably a
// letter from VCAA's own marking scheme).
//
// Interactives: spec-2017e1-q3-conjugate-pair (the roots of z³ + az² + 6z + a as a slides: the
// non-real pair is always mirrored in the real axis, 1 − i is reached at a = −4, and a toggle
// shows −1 − i is only a root at a = 4) and spec-2017e1-q3-third-root (a multiplication grid for
// (z² − 2z + 2)(z − c); only c = 2 fits the pattern z³ + az² + 6z + a). WrongMethods: −1 − i as
// the partner, and "(1 − i)(1 + i) = 2 so the third solution is 2" — both from the report, both
// verified (P(−1 − i) = −8 − 16i at a = −4; z³ − 3z² + 4z − 2 has the same pair but third root 1).

import Katex from '../../../components/Katex'
import { Background, WorkingTable, WrongMethod, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const ConjugatePairWidget = lazyWidget(() => import('../interactives/spec-2017e1-q3-conjugate-pair'))
const ThirdRootWidget = lazyWidget(() => import('../interactives/spec-2017e1-q3-third-root'))

const EXAM: SAExaminerStats = {
  marks: [8, 23, 27, 43],
  average: 2.1,
  comment: (
    <>
      Students generally performed well on this question, with most students able to obtain
      at least two marks. Typical errors included:
      <ul className="list-disc pl-5 my-1">
        <li>giving a second solution as <Katex tex="-1-i" /></li>
        <li>
          correctly giving <Katex tex="1+i" /> as a second solution then multiplying this by the
          given solution to get 2 and stating 2 as the third solution, which was a correct
          answer but incorrect reasoning
        </li>
        <li>
          not being able to correctly determine G. Students could correctly find{' '}
          <Katex tex="a=-4" /> but were unable to get the third solution.
        </li>
      </ul>
      A small number of students expressed the real solution in terms of <Katex tex="a" />.
      Some students quoted the answer as factors rather than solutions. Those who attempted to
      use polar form were unsuccessful.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="z = \overline{1-i} = 1+i" />,
    reason: (
      <>
        Every coefficient (<Katex tex="1,\ a,\ 6,\ a" />) is real, so non-real solutions come in
        conjugate pairs: if <Katex tex="1-i" /> is a solution, so is its conjugate. Conjugating flips
        the sign of the <b>imaginary</b> part only — on an Argand diagram, a reflection in the real
        axis. Whenever a real polynomial hands you one non-real root, this is the first thing to
        write down.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}&(z-1+i)(z-1-i)\\ &\quad= (z-1)^2 - i^2\\ &\quad= z^2-2z+2\end{aligned}"
      />
    ),
    reason: (
      <>
        Each solution gives a linear factor, so the pair gives a quadratic factor. Keep{' '}
        <Katex tex="z-1" /> together and it is a difference of two squares; the <Katex tex="i" />{' '}
        terms cancel because the roots are conjugates, which is why the factor has real
        coefficients.
      </>
    ),
  },
  {
    working: (
      <Katex display tex="\begin{aligned}&z^3+az^2+6z+a\\ &\quad= (z^2-2z+2)(z-c)\end{aligned}" />
    ),
    reason: (
      <>
        A cubic has three solutions. Two are used up, so exactly one linear factor{' '}
        <Katex tex="(z-c)" /> is left, where <Katex tex="c" /> is the third solution. It must be
        real: non-real solutions come in pairs and only one is left. Both sides start with{' '}
        <Katex tex="z^3" />, so no extra constant is needed. The question is now just: which{' '}
        <Katex tex="c" /> makes the two sides match?
      </>
    ),
  },
  {
    working: <Katex display tex="= z^3+(-2-c)z^2+(2+2c)z-2c" />,
    reason: <>Expand and collect like powers.</>,
    more: <>The grid in the second diagram below shows where each term comes from.</>,
  },
  {
    working: <Katex display tex="z:\ \ 2+2c = 6 \implies c = 2" />,
    reason: (
      <>
        Equate coefficients of <Katex tex="z" />. Choose this one first: it is the only coefficient
        on the left that doesn&apos;t involve the unknown <Katex tex="a" />, so it gives{' '}
        <Katex tex="c" /> in one line.
      </>
    ),
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\text{const: }& a = -2c = -4\\ z^2:\ & a = -2-c = -4\ \checkmark\end{aligned}"
      />
    ),
    reason: (
      <>
        The other two coefficients must both equal <Katex tex="a" />. They agree, which confirms{' '}
        <Katex tex="c = 2" /> and gives <Katex tex="a=-4" /> (not asked for, but a check). The
        report says many students found <Katex tex="a=-4" /> and then stalled — with the factor form
        written down, the constant term <Katex tex="-2c = -4" /> hands you the third solution.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{z = 1+i \ \text{ and }\ z = 2}" />,
    reason: (
      <>
        Check with <Katex tex="a=-4" />: <Katex tex="2^3-4(2)^2+6(2)-4 = 0" /> ✓. The question asks
        for solutions, so write <Katex tex="z=2" />, not the factor <Katex tex="(z-2)" />, and give the
        real solution as a number, not in terms of <Katex tex="a" /> — the report notes both slips.
      </>
    ),
  },
]

export default function SpecialistQ3_2017Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 3 (3 marks)" always>
        <p>
          Let <Katex tex="z^3+az^2+6z+a=0" />, <Katex tex="z\in C" />, where{' '}
          <Katex tex="a" /> is a real constant. Given that <Katex tex="z=1-i" /> is a solution
          to the equation, find all other solutions.
        </p>
      </Background>
      <Background>
        <p>
          <b>Why non-real roots pair up.</b> Call the left side <Katex tex="P(z)" />. Taking the
          conjugate of <Katex tex="P(z)" /> conjugates every <Katex tex="z" /> but leaves the
          coefficients alone, because they are real:
        </p>
        <Katex display tex="\overline{P(z)} = \bar z^{\,3} + a\bar z^{\,2} + 6\bar z + a = P(\bar z)" />
        <p>
          So if <Katex tex="P(1-i)=0" />, then <Katex tex="P(1+i) = \overline{0} = 0" />. This is the
          conjugate root theorem, and it needs <Katex tex="a" /> to be real, which is why the
          question tells you so.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <Explore title="Why the other root is 1 + i, not −1 − i">
        <ConjugatePairWidget />
      </Explore>
      <Explore title="Why the third root is 2: only one factor (z − c) fits">
        <ThirdRootWidget />
      </Explore>
      <WrongMethod
        title="The partner of 1 − i is −1 − i"
        source="Examiner's report"
        working={<Katex display tex="\overline{1-i} = -1-i" />}
      >
        That flips the sign of the real part as well: <Katex tex="-1-i" /> is <Katex tex="1-i" />{' '}
        reflected in the imaginary axis. The conjugate flips only the imaginary part, a reflection in
        the real axis. Catch it by substituting: with <Katex tex="a=-4" />,{' '}
        <Katex tex="P(-1-i) = -8-16i \ne 0" />.
      </WrongMethod>
      <WrongMethod
        title="(1 − i)(1 + i) = 2, so the third solution is 2"
        source="Examiner's report"
        working={<Katex display tex="(1-i)(1+i) = 2 \implies z = 2" />}
      >
        Right number, wrong reason — the report counts it as incorrect reasoning. Multiplying two
        roots doesn&apos;t produce another root:{' '}
        <Katex tex="z^3-3z^2+4z-2 = (z^2-2z+2)(z-1)" /> has the same pair, whose product is also 2,
        but its third root is 1. Here the constant term gives <Katex tex="-2c = a = -4" />, so{' '}
        <Katex tex="c" /> happens to equal 2 as well — a coincidence of this question. Find the
        third root from the factor <Katex tex="(z-c)" /> instead.
      </WrongMethod>
      <Background title="Another Route: Find a First">
        <p>
          Substitute <Katex tex="z=1-i" />. Since <Katex tex="(1-i)^2=-2i" /> and{' '}
          <Katex tex="(1-i)^3=-2-2i" />,
        </p>
        <Katex display tex="P(1-i) = (4+a) + (-8-2a)i = 0" />
        <p>
          A complex number is zero only when its real and imaginary parts are both zero, so{' '}
          <Katex tex="a=-4" /> (both parts agree). Then{' '}
          <Katex tex="z^3-4z^2+6z-4 = (z^2-2z+2)(z-c)" />, and the constant terms give{' '}
          <Katex tex="-2c=-4" />, so <Katex tex="c=2" />. Long division by{' '}
          <Katex tex="z^2-2z+2" /> gets the same factor <Katex tex="z-2" />.
        </p>
        <p>
          A shortcut from outside the course: for a cubic <Katex tex="z^3+pz^2+qz+r" />, the roots
          add to <Katex tex="-p" /> and multiply to <Katex tex="-r" />. Here both are{' '}
          <Katex tex="-a" />, so <Katex tex="(1-i)+(1+i)+z_3 = (1-i)(1+i)z_3" />, giving{' '}
          <Katex tex="2+z_3 = 2z_3" /> and <Katex tex="z_3=2" />.
        </p>
      </Background>
      <SAExaminerReport stats={EXAM} maxMarks={3} />
      <div>
        <p className="text-[11px] font-bold tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">Video Walkthrough</p>
        <p className="text-[13px] text-gray-500 dark:text-gray-400 italic">Coming soon.</p>
      </div>
    </div>
  )
}
