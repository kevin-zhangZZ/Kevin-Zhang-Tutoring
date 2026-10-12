// 2020 Specialist Mathematics — Exam 1 Question 3 (3 marks). Cube roots of a complex number
// on the unit circle, by de Moivre. Question text transcribed from the original paper.
// Answer checked with sympy and against the VCAA examination report. Solution is original.
// Notes on sources:
// - itute starts from z = cis(7π/4 + 2kπ), takes k = −1, 0, 1 and converts its third root
//   cis(15π/12) = cis(5π/4) to cis(−3π/4). Same three roots; the working here starts from the
//   principal argument −π/4, so k = −1, 0, 1 lands in (−π, π] with no conversion.
// - The first suggested answers posted on the ATAR Notes forum after the exam were cis(−7π/12),
//   cis(π/12), cis(3π/4), the cube roots of 1/√2 + i/√2, from a minus sign copied down as a plus;
//   a student corrected them. It is the same answer the Arg z = +π/4 slip produces (first
//   WrongMethod below).
// - The report asks for polar form in its general comments too ("Question 3 required students to
//   express their answers in polar form"), so the final row keeps the answers in cis form.
// - Checks by sympy: the three roots cube to z exactly; the +π/4 roots cube to 1/√2 + i/√2; and
//   z³ = cis(−3π/4), which is itself one of the cube roots (z⁹ = z), noted in the third WrongMethod.
// Interactive diagrams (§15), this site's own explanatory figures: the first
// (interactives/spec-2020e1-q3-triple.tsx) drags w round the unit circle while w³ = cis(3θ) laps
// it three times as fast, so it passes z three times — three cube roots, a third of a turn apart —
// with a toggle showing the roots the Arg z = π/4 slip produces; the second
// (interactives/spec-2020e1-q3-principal.tsx) slides k through θ = −π/12 + 2kπ/3 on the circle
// and on a number line of arguments, showing that every third k repeats a point and that the
// principal range (−π, π] holds exactly k = −1, 0, 1 (k = 2 gives 5π/4, not a principal value).

import Katex from '../../../components/Katex'
import { Background, SAExaminerReport, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const TripleWidget = lazyWidget(() => import('../interactives/spec-2020e1-q3-triple'))
const PrincipalWidget = lazyWidget(() => import('../interactives/spec-2020e1-q3-principal'))

const EXAM: SAExaminerStats = {
  marks: [23, 30, 10, 37],
  average: 1.6,
  comment: (
    <>
      Students should be able to express{' '}
      <Katex tex="z=\tfrac{1}{\sqrt2}-\tfrac{1}{\sqrt2}i" /> in polar form{' '}
      <Katex tex="\operatorname{cis}\!\left(-\tfrac\pi4\right)" /> by recognition (possibly
      with the aid of a small diagram). Some students had difficulty with this first step and
      gave an incorrect argument or modulus. De Moivre's theorem or a geometric approach could
      be used to find the three cube roots of <Katex tex="z" />. Some students neglected to give
      the arguments for their final answers using principal values as required by the question.
      Some students found the cube of <Katex tex="z=\tfrac{1}{\sqrt2}-\tfrac{1}{\sqrt2}i" /> rather
      than the cube roots.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="|z| = \sqrt{\left(\tfrac{1}{\sqrt2}\right)^2+\left(-\tfrac{1}{\sqrt2}\right)^2} = \sqrt{\tfrac12+\tfrac12} = 1" />,
    reason: (
      <>
        Call the number <Katex tex="z" />. Put it in polar form first: de Moivre&apos;s theorem works with the
        modulus and the argument.
        Square each part before adding.
      </>
    ),
    more: (
      <>
        The report notes some students had difficulty with this first step and gave an incorrect argument or modulus.
        Squaring turns each <Katex tex="\pm\tfrac{1}{\sqrt2}" /> into <Katex tex="\tfrac12" />, minus sign and all, so
        the modulus is exactly 1: <Katex tex="z" /> is on the unit circle.
      </>
    ),
  },
  {
    working: <Katex display tex="\operatorname{Arg}(z) = -\tfrac\pi4, \quad z = \operatorname{cis}\!\left(-\tfrac\pi4\right)" />,
    reason: (
      <>
        Real part positive, imaginary part negative: <Katex tex="z" /> is in the fourth quadrant, so its argument is
        negative. Equal-sized parts put it halfway between the axes: <Katex tex="\tfrac\pi4" /> below the positive
        real axis.
      </>
    ),
    more: (
      <>
        A small sketch settles it. <Katex tex="\tan^{-1}(1)=\tfrac\pi4" /> gives only the size of the angle; the
        sketch gives the sign. Writing <Katex tex="+\tfrac\pi4" /> here finds the cube roots of a different number:
        see the first common mistake below.
      </>
    ),
  },
  {
    working: <Katex display tex="\text{Let } w = r\operatorname{cis}\theta, \text{ with } w^3 = z" />,
    reason: (
      <>
        A cube root of <Katex tex="z" /> is any <Katex tex="w" /> with <Katex tex="w^3 = z" />; there are three. Write{' '}
        <Katex tex="w" /> in polar form so de Moivre can cube it.
      </>
    ),
  },
  {
    working: <Katex display tex="w^3 = r^3\operatorname{cis}(3\theta)" />,
    reason: <>De Moivre: cubing cubes the modulus and <em>triples</em> the argument.</>,
    more: (
      <>
        So we need a length <Katex tex="r" /> whose cube is 1, and an angle <Katex tex="\theta" /> that, tripled,
        points the same way as <Katex tex="z" />.
      </>
    ),
  },
  {
    working: <Katex display tex="r^3\operatorname{cis}(3\theta) = \operatorname{cis}\!\left(-\tfrac\pi4+2k\pi\right), \ k\in Z" />,
    reason: (
      <>
        Adding whole turns doesn&apos;t change <Katex tex="z" />. <Katex tex="3\theta" /> only has to point the same
        way as <Katex tex="-\tfrac\pi4" />, and this is what gives three <em>different</em> roots.
      </>
    ),
    more: (
      <>
        Drag <Katex tex="w" /> round in the first diagram below: <Katex tex="w^3" /> passes through{' '}
        <Katex tex="z" /> three times.
      </>
    ),
  },
  {
    working: <Katex display tex="r^3 = 1 \implies r = 1" />,
    reason: (
      <>
        Match the moduli. <Katex tex="r" /> is a length, a positive real number, so <Katex tex="r = 1" />: every cube
        root lies on the unit circle.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="3\theta = -\tfrac\pi4 + 2k\pi" />
        <Katex display tex="\theta = -\tfrac{\pi}{12} + \tfrac{2k\pi}{3}" />
      </>
    ),
    reason: (
      <>
        Match the arguments, then divide by 3: consecutive roots are a third of a turn apart. Choose the{' '}
        <Katex tex="k" /> values that put <Katex tex="\theta" /> in <Katex tex="(-\pi,\pi]" />, the principal range.
      </>
    ),
  },
  {
    working: <Katex display tex="k=0: \ \theta = -\tfrac{\pi}{12}" />,
    reason: <>The argument of <Katex tex="z" /> divided by 3. Already in <Katex tex="(-\pi,\pi]" />.</>,
  },
  {
    working: <Katex display tex="k=1: \ \theta = -\tfrac{\pi}{12}+\tfrac{8\pi}{12} = \tfrac{7\pi}{12}" />,
    reason: <>A third of a turn anticlockwise. Inside <Katex tex="(-\pi,\pi]" />.</>,
  },
  {
    working: <Katex display tex="k=-1: \ \theta = -\tfrac{\pi}{12}-\tfrac{8\pi}{12} = -\tfrac{3\pi}{4}" />,
    reason: (
      <>
        A third of a turn clockwise. Take <Katex tex="k=-1" />, not <Katex tex="k=2" />, which gives{' '}
        <Katex tex="\tfrac{5\pi}{4}" />: the same point, but bigger than <Katex tex="\pi" />, so not a principal value.
      </>
    ),
    more: (
      <>
        The report notes some students neglected to give the arguments using principal values. There are no
        more roots to find: <Katex tex="k=3" /> gives <Katex tex="-\tfrac{\pi}{12}+2\pi" />,
        the <Katex tex="k=0" /> root again, and every other <Katex tex="k" /> repeats one of the three.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\operatorname{cis}\!\left(-\tfrac{3\pi}{4}\right), \ \operatorname{cis}\!\left(-\tfrac{\pi}{12}\right), \ \operatorname{cis}\!\left(\tfrac{7\pi}{12}\right)}" />,
    reason: (
      <>
        Three roots, in polar form with principal arguments, as asked. Check one:{' '}
        <Katex tex="\left(\operatorname{cis}\tfrac{7\pi}{12}\right)^3 = \operatorname{cis}\tfrac{7\pi}{4} = \operatorname{cis}\!\left(-\tfrac\pi4\right) = z" />{' '}
        ✓
      </>
    ),
    more: (
      <>
        On the unit circle the three roots are the corners of an equilateral triangle. Leave them in polar form: the report&apos;s general comments use this question as
        their example of giving answers in the form specified.
      </>
    ),
  },
]

export default function SpecialistQ3_2020Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (3 marks)</p>
        <p>
          Find the cube roots of{' '}
          <Katex tex="\dfrac{1}{\sqrt2}-\dfrac{1}{\sqrt2}i" />. Express your answers in polar
          form using principal values of the argument.
        </p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <Background>
          <p>
            The cube roots of <Katex tex="z" /> are all the numbers <Katex tex="w" /> with{' '}
            <Katex tex="w^3 = z" />. Every non-zero complex number has exactly three, spread evenly around a circle
            centred at the origin, so expect three answers, not one.
          </p>
          <p>
            The plan: write <Katex tex="z" /> in polar form, write the unknown root as{' '}
            <Katex tex="w = r\operatorname{cis}\theta" />, and use de Moivre&apos;s theorem to cube it. Here the modulus
            is 1, so the whole question comes down to angles.
          </p>
          <p>
            &ldquo;Principal values&rdquo; means every argument you write down must lie in{' '}
            <Katex tex="(-\pi,\pi]" />. That is part of the answer, not a formatting detail.
          </p>
        </Background>
        <WorkingTable rows={ROWS} />
        <Explore title="Why there are three cube roots: cubing triples the angle, so w³ laps the circle three times while w goes round once">
          <TripleWidget />
        </Explore>
        <WrongMethod
          title="tan⁻¹(1) = π/4, so Arg(z) = π/4"
          source="Report: incorrect argument"
          working={
            <>
              <Katex display tex="z = \operatorname{cis}\!\left(\tfrac\pi4\right) \implies \theta = \tfrac{\pi}{12} + \tfrac{2k\pi}{3}" />
              <Katex display tex="\operatorname{cis}\!\left(-\tfrac{7\pi}{12}\right), \ \operatorname{cis}\!\left(\tfrac{\pi}{12}\right), \ \operatorname{cis}\!\left(\tfrac{3\pi}{4}\right)" />
            </>
          }
        >
          <Katex tex="\operatorname{cis}\tfrac\pi4 = \tfrac{1}{\sqrt2}+\tfrac{1}{\sqrt2}i" />: the imaginary part has the
          wrong sign. Everything after the first line is done correctly, and all three answers are still wrong, because
          they are the cube roots of <Katex tex="\tfrac{1}{\sqrt2}+\tfrac{1}{\sqrt2}i" />, the reflection of{' '}
          <Katex tex="z" /> in the real axis. Each one is the mirror image of a true root (turn on the toggle in the
          diagram above to see them). Two checks catch it: sketch <Katex tex="z" /> before finding its argument (it is
          below the real axis, so the argument is negative), and cube one answer at the end:{' '}
          <Katex tex="\left(\operatorname{cis}\tfrac{\pi}{12}\right)^3 = \operatorname{cis}\tfrac\pi4 \ne z" />.
        </WrongMethod>
        <Explore title="Endless values of k, only three points: the principal range (−π, π] holds exactly one name for each">
          <PrincipalWidget />
        </Explore>
        <WrongMethod
          title="Take k = 0, 1, 2"
          source="Report: principal values"
          working={
            <Katex display tex="\operatorname{cis}\!\left(-\tfrac{\pi}{12}\right), \ \operatorname{cis}\!\left(\tfrac{7\pi}{12}\right), \ \operatorname{cis}\!\left(\tfrac{5\pi}{4}\right)" />
          }
        >
          The three points are right, but <Katex tex="\tfrac{5\pi}{4}" /> is bigger than <Katex tex="\pi" />, so it is
          not a principal value, and the question asks for principal values. Subtract a full turn (or take{' '}
          <Katex tex="k=-1" /> instead): <Katex tex="\tfrac{5\pi}{4}-2\pi = -\tfrac{3\pi}{4}" />. Before writing the
          answer down, check every argument is between <Katex tex="-\pi" /> and <Katex tex="\pi" />, with{' '}
          <Katex tex="\pi" /> itself allowed and <Katex tex="-\pi" /> not.
        </WrongMethod>
        <WrongMethod
          title="Cube z instead"
          source="Report: found the cube"
          working={<Katex display tex="z^3 = \operatorname{cis}\!\left(3\times\left(-\tfrac\pi4\right)\right) = \operatorname{cis}\!\left(-\tfrac{3\pi}{4}\right)" />}
        >
          A cube root goes the other way: you want <Katex tex="w" /> with <Katex tex="w^3 = z" />, so the argument is{' '}
          <em>divided</em> by 3 (with thirds of a turn added and subtracted), not multiplied. The report notes some
          students found the cube of <Katex tex="z" /> rather than the cube roots. The slip is sneaky here, because{' '}
          <Katex tex="z^3 = \operatorname{cis}\!\left(-\tfrac{3\pi}{4}\right)" /> happens to be one of the three cube
          roots, since <Katex tex="\left(z^3\right)^3 = z^9 = \operatorname{cis}\!\left(-\tfrac{9\pi}{4}\right) = z" />, so it
          looks half right.
          But it is one number where the question asks for three, found by accident rather than by a method.
        </WrongMethod>
        <SAExaminerReport stats={EXAM} maxMarks={3} />
        <div>
          <p className="text-[11px] font-bold tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">
            Video Walkthrough
          </p>
          <p className="text-[13px] text-gray-500 dark:text-gray-400 italic">Coming soon.</p>
        </div>
      </div>
    </div>
  )
}
