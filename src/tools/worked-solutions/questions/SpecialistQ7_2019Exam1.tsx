// 2019 Specialist Mathematics — Exam 1, Question 7 (5 marks).
// 3 − √3 i in polar form, its cube by de Moivre, and the integer powers n for which zⁿ is real
// (part c) or purely imaginary (part d). Question text transcribed from the original paper.
// VCAA printed no diagram; the Argand diagram below is this site's own explanatory figure
// (matplotlib). Cross-checked against the VCAA examination report and itute's independent
// solutions — all agree: z³ = −24√3 i, n a multiple of 6, and n an odd multiple of 3.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import argandSrc from './spec-2019exam1-q7-argand.png'

const EXAM_A: SAExaminerStats = {
  marks: [19, 81],
  average: 0.8,
  comment: <>Students were required to show the given result and generally did this quite well. Some particular errors with the modulus and argument were noted.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [6, 23, 72],
  average: 1.7,
  comment: <>The efficient method was to use de Moivre's theorem, although some students attempted to expand the bracket directly. Students who chose the latter approach generally did not score as well.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [61, 39],
  average: 0.4,
  comment: (
    <>
      There were several ways to answer this question. Some students realised that if{' '}
      <Katex tex="n" /> was a positive or negative multiple of <Katex tex="6" /> then{' '}
      <Katex tex="z^n" /> was real, but were unable to express this mathematically. Some
      students did not indicate that <Katex tex="n" /> was a member of <Katex tex="\mathbb{Z}" />.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [74, 26],
  average: 0.3,
  comment: <>This question was answered poorly. There were a number of equivalent correct answers, but many students were unable to find a general solution.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\left|3-\sqrt3\,i\right| = \sqrt{3^2+\left(-\sqrt3\right)^2} = \sqrt{9+3} = \sqrt{12} = 2\sqrt3" />,
    reason: <>The modulus is the distance from the origin, <Katex tex="\sqrt{x^2+y^2}" />. Simplify the surd: <Katex tex="\sqrt{12}=\sqrt{4\times3}=2\sqrt3" />.</>,
  },
  {
    working: <Katex display tex="\tan\theta = \dfrac{-\sqrt3}{3} = -\dfrac{1}{\sqrt3}" />,
    reason: <>The argument satisfies <Katex tex="\tan\theta=\tfrac{y}{x}" />.</>,
  },
  {
    working: <Katex display tex="3-\sqrt3\,i \text{ lies in the fourth quadrant } (x>0,\ y<0) \implies \theta = -\dfrac{\pi}{6}" />,
    reason: <>The base angle for <Katex tex="\tfrac{1}{\sqrt3}" /> is <Katex tex="\tfrac{\pi}{6}" />; the fourth quadrant makes the principal argument negative. Checking the quadrant matters — <Katex tex="\tan" /> alone can't tell <Katex tex="-\tfrac{\pi}{6}" /> from <Katex tex="\tfrac{5\pi}{6}" />.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img src={argandSrc} alt="Argand diagram showing 3 − √3 i in the fourth quadrant, at distance 2√3 from the origin and at an angle of −π/6 below the real axis" className="w-full max-w-[320px]" />
      </div>
    ),
    reason: <>The picture confirms both readings at a glance: the point is to the right and below the origin, so the argument must be a small negative angle.</>,
  },
  {
    working: <Katex display tex="\boxed{3-\sqrt3\,i = 2\sqrt3\,\text{cis}\!\left(-\dfrac{\pi}{6}\right)}" />,
    reason: <>For a "show that", both the modulus and the argument need to be seen — a final line alone isn't enough evidence.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\left(3-\sqrt3\,i\right)^3 = \left(2\sqrt3\right)^3\text{cis}\!\left(3\times-\dfrac{\pi}{6}\right)" />,
    reason: <>de Moivre's theorem: <Katex tex="\bigl(r\,\text{cis}\,\theta\bigr)^n = r^n\,\text{cis}(n\theta)" /> — raise the modulus to the power, multiply the argument by it. Expanding the bracket by hand works but is far slower and more error-prone.</>,
  },
  {
    working: <Katex display tex="\left(2\sqrt3\right)^3 = 2^3\left(\sqrt3\right)^3 = 8\times3\sqrt3 = 24\sqrt3" />,
  },
  {
    working: <Katex display tex="= 24\sqrt3\,\text{cis}\!\left(-\dfrac{\pi}{2}\right) = 24\sqrt3\left(\cos\!\left(-\tfrac{\pi}{2}\right)+i\sin\!\left(-\tfrac{\pi}{2}\right)\right)" />,
    reason: <>Convert back to <Katex tex="x+iy" /> form as the question requires.</>,
  },
  {
    working: <Katex display tex="\cos\!\left(-\tfrac{\pi}{2}\right)=0, \qquad \sin\!\left(-\tfrac{\pi}{2}\right)=-1" />,
  },
  {
    working: <Katex display tex="\boxed{\left(3-\sqrt3\,i\right)^3 = -24\sqrt3\,i}" />,
    reason: <>So <Katex tex="x=0" /> and <Katex tex="y=-24\sqrt3" /> — the cube happens to land exactly on the negative imaginary axis, which is the clue that parts (c) and (d) are about where powers land.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="z^n = \left(2\sqrt3\right)^n\text{cis}\!\left(-\dfrac{n\pi}{6}\right)" />,
    reason: <>de Moivre again. The modulus is always positive, so whether <Katex tex="z^n" /> is real depends only on the angle.</>,
  },
  {
    working: <Katex display tex="z^n \text{ is real} \iff \sin\!\left(-\dfrac{n\pi}{6}\right)=0" />,
    reason: <>A complex number is real exactly when its imaginary part vanishes. Geometrically: <Katex tex="z^n" /> must sit on the real axis, i.e. at an angle of <Katex tex="0" /> or <Katex tex="\pi" /> (or any whole number of <Katex tex="\pi" />).</>,
  },
  {
    working: <Katex display tex="\dfrac{n\pi}{6} = k\pi, \ k\in\mathbb{Z} \implies n = 6k" />,
  },
  {
    working: <Katex display tex="\boxed{n = 6k, \ k\in\mathbb{Z}}" />,
    reason: <>That is, <Katex tex="n" /> is any integer multiple of <Katex tex="6" />: <Katex tex="\ldots,-12,-6,0,6,12,\ldots" />. Each power turns the point a further <Katex tex="\tfrac{\pi}{6}" /> clockwise, so it takes six steps to reach the real axis. Say explicitly that <Katex tex="k" /> is an integer — the report notes marks were lost for leaving that out.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="z^n = ai \iff \text{the real part is zero} \iff \cos\!\left(-\dfrac{n\pi}{6}\right)=0" />,
    reason: <>Purely imaginary means <Katex tex="z^n" /> lies on the imaginary axis — at an angle of <Katex tex="\pm\tfrac{\pi}{2}" />, or any odd multiple of <Katex tex="\tfrac{\pi}{2}" />.</>,
  },
  {
    working: <Katex display tex="\dfrac{n\pi}{6} = \dfrac{\pi}{2}+k\pi, \ k\in\mathbb{Z}" />,
  },
  {
    working: <Katex display tex="n = 3+6k, \ k\in\mathbb{Z}" />,
    reason: <>Multiply through by <Katex tex="\tfrac{6}{\pi}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 3+6k, \ k\in\mathbb{Z} \quad\text{(equivalently, } n \text{ is an odd multiple of } 3)}" />,
    reason: <>Check against part (b): <Katex tex="n=3" /> gave <Katex tex="-24\sqrt3\,i" />, which is indeed purely imaginary ✓. The values are <Katex tex="\ldots,-9,-3,3,9,15,\ldots" /> — halfway between consecutive "real" powers from part (c), exactly as the quarter-turn picture suggests.</>,
  },
]

export default function SpecialistQ7_2019Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 7 (5 marks)</p>
        <p>
          Consider the complex number <Katex tex="3-\sqrt3\,i" />.
        </p>
      </div>

      <div className="text-[13px] leading-relaxed">
        <Background title="Before You Start">
          <p>
            All four parts run on one idea: a complex number written as{' '}
            <Katex tex="r\,\text{cis}\,\theta" /> is described by a <em>distance</em> from the
            origin and an <em>angle</em>, and raising it to a power scales the distance while
            spinning the angle. Formally that is <b>de Moivre's theorem</b>,{' '}
            <Katex tex="\bigl(r\,\text{cis}\,\theta\bigr)^n = r^n\,\text{cis}(n\theta)" />.
          </p>
          <p>
            Here <Katex tex="\theta=-\tfrac{\pi}{6}" />, so each successive power rotates the
            point another <Katex tex="30^\circ" /> clockwise. Parts (c) and (d) then just ask:
            after how many such turns does the point land on the real axis, and on the imaginary
            axis?
          </p>
        </Background>
      </div>

      <PartCard letter="a" marks={1} statement={<>Show that <Katex tex="3-\sqrt3\,i = 2\sqrt3\,\text{cis}\!\left(-\dfrac{\pi}{6}\right)" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" marks={2} statement={<>Find <Katex tex="\left(3-\sqrt3\,i\right)^3" />, expressing your answer in the form <Katex tex="x+iy" />, where <Katex tex="x,y\in\mathbb{R}" />.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard letter="c" marks={1} statement={<>Find the integer values of <Katex tex="n" /> for which <Katex tex="\left(3-\sqrt3\,i\right)^n" /> is real.</>} examinerReport={EXAM_C}>
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard letter="d" marks={1} statement={<>Find the integer values of <Katex tex="n" /> for which <Katex tex="\left(3-\sqrt3\,i\right)^n = ai" />, where <Katex tex="a" /> is a real number.</>} examinerReport={EXAM_D}>
        <WorkingTable rows={ROWS_D} />
      </PartCard>
    </div>
  )
}
