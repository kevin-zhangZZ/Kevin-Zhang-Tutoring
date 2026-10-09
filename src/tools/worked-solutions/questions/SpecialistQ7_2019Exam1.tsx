// 2019 Specialist Mathematics — Exam 1, Question 7 (5 marks).
// 3 − √3 i in polar form, its cube by de Moivre, and the integer powers n for which zⁿ is real
// (part c) or purely imaginary (part d). Question text transcribed from the original paper.
// VCAA printed no diagram; the Argand diagram below is this site's own explanatory figure
// (matplotlib). Cross-checked against the VCAA examination report and itute's independent
// solutions — all agree: z³ = −24√3 i, n a multiple of 6, and n an odd multiple of 3.
// Solution is original.
// Interactives: b. spec-2019e1-q7b-turn-stretch (z, z², z³ to scale: each ×z turns π/6 clockwise
// and stretches by 2√3); c. spec-2019e1-q7c-real-powers and d. spec-2019e1-q7d-imaginary-powers
// (the direction of zⁿ on a clock beside the integers in rows of 6, so the 6k and 6k + 3 columns
// light up; toggles show the wrong ideas n = 12k and "any multiple of 3"). WrongMethod boxes:
// a. the report's tan⁻¹(√3/3) = π/6 = −π/6 chain; c. "real means Arg = 0" and the report's missing
// k ∈ Z; d. "any multiple of 3" and "only straight down". Each wrong answer checked with sympy
// (z⁶ = −1728 real; z⁹ = (2√3)⁹ i imaginary; z⁻³ = (√3/72) i).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats, DetailOnly } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import argandSrc from './spec-2019e1-q7-argand.png'

const TurnStretchWidget = lazyWidget(() => import('../interactives/spec-2019e1-q7b-turn-stretch'))
const RealPowersWidget = lazyWidget(() => import('../interactives/spec-2019e1-q7c-real-powers'))
const ImaginaryPowersWidget = lazyWidget(() => import('../interactives/spec-2019e1-q7d-imaginary-powers'))

const EXAM_A: SAExaminerStats = {
  marks: [19, 81],
  average: 0.8,
  comment: (
    <>
      Students were required to show that{' '}
      <Katex tex="3-\sqrt3i=2\sqrt3\operatorname{cis}\left(-\dfrac{\pi}{6}\right)" /> and students
      generally did this quite well. Some particular errors were noted. Some students wrote such
      things as <Katex tex="\tan\left(\dfrac{\sqrt3}{3}\right)" /> or{' '}
      <Katex tex="\tan^{-1}\left(\dfrac{\sqrt3}{3}\right)=\dfrac{\pi}{6}=-\dfrac{\pi}{6}" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [6, 23, 72],
  average: 1.7,
  comment: <>The efficient method was to use de Moivre's theorem although some students attempted to expand <Katex tex="\left(3-\sqrt3i\right)^3" />. Students who chose the latter approach generally did not score as well.</>,
}

const EXAM_C: SAExaminerStats = {
  marks: [61, 39],
  average: 0.4,
  comment: (
    <>
      There were several ways to answer this question. Some students realised that if{' '}
      <Katex tex="n" /> was a positive or negative multiple of <Katex tex="6" /> then{' '}
      <Katex tex="\left(3-\sqrt3i\right)^n" /> was real, but were unable to express this
      mathematically. Some students did not indicate that <Katex tex="k" /> was a member of{' '}
      <Katex tex="Z" />, the set of integers.
    </>
  ),
}

const EXAM_D: SAExaminerStats = {
  marks: [74, 26],
  average: 0.3,
  comment: <>This question was answered poorly. There were a number of equivalent correct answers but many students were unable to find a general solution.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}\left|3-\sqrt3\,i\right| &= \sqrt{3^2+\left(-\sqrt3\right)^2}\\ &= \sqrt{12} = 2\sqrt3\end{aligned}" />,
    reason: <>A "show that" in polar form means producing both halves of <Katex tex="r\,\text{cis}\,\theta" /> from <Katex tex="x+yi" />, so start with <Katex tex="r" />. The modulus is the distance from the origin, <Katex tex="\sqrt{x^2+y^2}" /> (Pythagoras on the Argand diagram). Simplify the surd: <Katex tex="\sqrt{12}=\sqrt{4\times3}=2\sqrt3" />.</>,
  },
  {
    working: <Katex display tex="\tan\theta = \dfrac{-\sqrt3}{3} = -\dfrac{1}{\sqrt3}" />,
    reason: <>The argument is the angle from the positive real axis, and in the right-angled triangle to the point, <Katex tex="\tan\theta=\tfrac{y}{x}" />. But <Katex tex="\tan" /> repeats every <Katex tex="\pi" />, so this equation has two answers in <Katex tex="(-\pi,\pi]" />; it can't finish the job on its own.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&x>0,\ y<0 \text{: fourth quadrant}\\ &\implies \theta = -\dfrac{\pi}{6}\end{aligned}" />,
    reason: <>The basic angle for <Katex tex="\tfrac{1}{\sqrt3}" /> is <Katex tex="\tfrac{\pi}{6}" /> (the 30°–60°–90° triangle). The point is right of and below the origin, so the angle is measured clockwise: the principal argument is <Katex tex="-\tfrac{\pi}{6}" />, not <Katex tex="\tfrac{5\pi}{6}" />, the other angle with the same <Katex tex="\tan" />. Sketching the point first is the quickest way to know which one.</>,
  },
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async" src={argandSrc} alt="Argand diagram showing 3 − √3 i in the fourth quadrant, at distance 2√3 from the origin and at an angle of −π/6 below the real axis" className="w-full max-w-[320px]" />
      </div>
    ),
    reason: <>The picture confirms both readings at a glance: the point is to the right and below the origin, so the argument must be a small negative angle.</>,
  },
  {
    working: <Katex display tex="\boxed{3-\sqrt3\,i = 2\sqrt3\,\text{cis}\!\left(-\dfrac{\pi}{6}\right)}" />,
    reason: <>In a "show that" the answer is given, so the mark is for the working: both the modulus and the argument need to be seen. As required.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\left(3-\sqrt3\,i\right)^3 = \left(2\sqrt3\right)^3\text{cis}\!\left(3\times-\dfrac{\pi}{6}\right)" />,
    reason: <>A power of a complex number is the cue for polar form, and part a. has just handed it to us. de Moivre's theorem: <Katex tex="\bigl(r\,\text{cis}\,\theta\bigr)^n = r^n\,\text{cis}(n\theta)" />. Raise the modulus to the power and multiply the argument by it. That works because multiplying complex numbers multiplies their lengths and adds their angles. Expanding the bracket works but is slower and more error-prone.</>,
    more: <>Step through the diagram below.</>,
  },
  {
    working: <Katex display tex="\left(2\sqrt3\right)^3 = 2^3\left(\sqrt3\right)^3 = 8\times3\sqrt3 = 24\sqrt3" />,
    reason: <>The modulus cubed, using <Katex tex="\left(\sqrt3\right)^3=\sqrt3\times\sqrt3\times\sqrt3=3\sqrt3" />; and the argument tripled is <Katex tex="3\times-\tfrac{\pi}{6}=-\tfrac{\pi}{2}" />.</>,
  },
  {
    working: <Katex display tex="= 24\sqrt3\,\text{cis}\!\left(-\dfrac{\pi}{2}\right) = 24\sqrt3\left(\cos\!\left(-\tfrac{\pi}{2}\right)+i\sin\!\left(-\tfrac{\pi}{2}\right)\right)" />,
    reason: <>Convert back to <Katex tex="x+iy" /> form as the question requires.</>,
  },
  {
    working: <Katex display tex="\cos\!\left(-\tfrac{\pi}{2}\right)=0, \qquad \sin\!\left(-\tfrac{\pi}{2}\right)=-1" />,
    reason: <>Exact values: <Katex tex="-\tfrac{\pi}{2}" /> points straight down the negative imaginary axis.</>,
  },
  {
    working: <Katex display tex="\boxed{\left(3-\sqrt3\,i\right)^3 = -24\sqrt3\,i}" />,
    reason: <>So <Katex tex="x=0" /> and <Katex tex="y=-24\sqrt3" /> — the cube happens to land exactly on the negative imaginary axis, which is the clue that parts c. and d. are about where powers land.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\left(3-\sqrt3\,i\right)^n = \left(2\sqrt3\right)^n\text{cis}\!\left(-\dfrac{n\pi}{6}\right)" />,
    reason: <>de Moivre again, now with a general <Katex tex="n" /> (negative <Katex tex="n" /> too: the theorem holds for every integer power). Write <Katex tex="z=3-\sqrt3\,i" /> for short. The modulus <Katex tex="\left(2\sqrt3\right)^n" /> is never <Katex tex="0" />, so whether <Katex tex="z^n" /> is real depends only on the angle.</>,
  },
  {
    working: <Katex display tex="z^n \text{ is real} \iff \sin\!\left(-\dfrac{n\pi}{6}\right)=0" />,
    reason: <>In <Katex tex="r\,\text{cis}\,\theta = r\cos\theta + i\,r\sin\theta" /> the imaginary part is <Katex tex="r\sin\theta" />, and a number is real exactly when that is <Katex tex="0" />. Geometrically, <Katex tex="z^n" /> must sit on the real axis, on <em>either</em> side: an angle of <Katex tex="0" />, <Katex tex="\pi" />, <Katex tex="-\pi" />, <Katex tex="2\pi" />, and so on.</>,
  },
  {
    working: <Katex display tex="\dfrac{n\pi}{6} = k\pi, \ k\in Z \implies n = 6k" />,
    reason: <><Katex tex="\sin\theta=0" /> exactly when <Katex tex="\theta" /> is a whole multiple of <Katex tex="\pi" />, and <Katex tex="\sin(-\theta)=-\sin\theta" />, so the minus sign can go. The question wants <em>every</em> integer <Katex tex="n" />, so the answer is a family, and a family needs a counter that runs through all the integers: that is <Katex tex="k" /> (a new letter, since <Katex tex="n" /> is taken). Multiply both sides by <Katex tex="\tfrac{6}{\pi}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 6k, \ k\in Z}" />,
    reason: <>That is, <Katex tex="n" /> is any integer multiple of <Katex tex="6" />: <Katex tex="\ldots,-12,-6,0,6,12,\ldots" />. Each power turns the point a further <Katex tex="\tfrac{\pi}{6}" /> clockwise, so six powers make a half-turn, from one side of the real axis to the other. Say explicitly that <Katex tex="k" /> is an integer; the report notes some students did not indicate that <Katex tex="k" /> was a member of <Katex tex="Z" />. Any form that lists the same set is equally correct: <Katex tex="n=-6k" /> (straight from <Katex tex="-\tfrac{n\pi}{6}=k\pi" />) or <Katex tex="n=6k+6" />, because <Katex tex="k" /> runs over every integer.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned}z^n = ai &\iff \operatorname{Re}\left(z^n\right) = 0\\ &\iff \cos\!\left(-\dfrac{n\pi}{6}\right)=0\end{aligned}" />,
    reason: <>&quot;<Katex tex="z^n=ai" /> with <Katex tex="a" /> real&quot; is a careful way of saying <em>purely imaginary</em>: the real part <Katex tex="\left(2\sqrt3\right)^n\cos\!\left(-\tfrac{n\pi}{6}\right)" /> must be <Katex tex="0" />, and since the modulus is never <Katex tex="0" />, the cosine must be. Geometrically, <Katex tex="z^n" /> lies on the imaginary axis, pointing straight up (<Katex tex="a>0" />) or straight down (<Katex tex="a<0" />); both count.</>,
  },
  {
    working: <Katex display tex="\dfrac{n\pi}{6} = \dfrac{\pi}{2}+k\pi, \ k\in Z" />,
    reason: <>Cosine is even, so the minus sign can go. <Katex tex="\cos\theta=0" /> at <Katex tex="\theta=\tfrac{\pi}{2}" />, and then at every <Katex tex="\pi" /> either side of it (the top and bottom of the unit circle are <Katex tex="\pi" /> apart). A general solution is always &quot;the first solution, plus any whole number of gaps&quot;: here <Katex tex="\tfrac{\pi}{2}+k\pi" />, not <Katex tex="\tfrac{\pi}{2}+2k\pi" />, which would keep only the straight-down powers.</>,
  },
  {
    working: <Katex display tex="n = 3+6k, \ k\in Z" />,
    reason: <>Multiply through by <Katex tex="\tfrac{6}{\pi}" />. The first solution <Katex tex="\tfrac{\pi}{2}" /> becomes <Katex tex="n=3" /> and the gap <Katex tex="\pi" /> becomes <Katex tex="6" /> powers.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 6k+3, \ k\in Z}" />,
    reason: <>Equivalently, <Katex tex="n" /> is an odd multiple of <Katex tex="3" />: <Katex tex="\ldots,-9,-3,3,9,15,\ldots" />. Check against part b.: <Katex tex="n=3" /> gave <Katex tex="-24\sqrt3\,i" />, purely imaginary ✓. These sit halfway between the real powers of part c.: three turns of <Katex tex="-\tfrac{\pi}{6}" /> reach the imaginary axis, three more reach the real axis. The report notes that there were a number of equivalent correct answers; for example, <Katex tex="n=3(2k+1)" />, <Katex tex="n=6k-3" /> and <Katex tex="n=12k\pm3" /> (each with <Katex tex="k\in Z" />) all describe this same set.</>,
  },
]

export default function SpecialistQ7_2019Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 7 (5 marks)</p>
      </div>

      <DetailOnly>
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
              point another <Katex tex="30^\circ" /> clockwise. Parts c. and d. then just ask:
              after how many such turns does the point land on the real axis, and on the imaginary
              axis?
            </p>
          </Background>
        </div>
      </DetailOnly>

      <PartCard letter="a" topic="Polar Form" marks={1} statement={<>Show that <Katex tex="3-\sqrt3\,i = 2\sqrt3\,\text{cis}\!\left(-\dfrac{\pi}{6}\right)" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
        <WrongMethod
          title="tan⁻¹(√3/3) is π/6, the point is below the axis, so it's −π/6"
          source="Examiner's report"
          working={<Katex display tex="\tan^{-1}\left(\dfrac{\sqrt3}{3}\right)=\dfrac{\pi}{6}=-\dfrac{\pi}{6}" />}
        >
          Each thought is right, but written as one chain it claims <Katex tex="\tfrac{\pi}{6}=-\tfrac{\pi}{6}" />, which is
          false, and in a &quot;show that&quot; the written working is the whole mark. Keep the two facts apart: the basic angle
          is <Katex tex="\tfrac{\pi}{6}" />; the point is in the fourth quadrant, so the argument is{' '}
          <Katex tex="-\tfrac{\pi}{6}" />. (The report also quotes <Katex tex="\tan\left(\tfrac{\sqrt3}{3}\right)" />, the wrong
          function: <Katex tex="\tan" /> takes an angle, <Katex tex="\tan^{-1}" /> gives one.)
        </WrongMethod>
      </PartCard>

      <PartCard letter="b" topic="De Moivre's Theorem" marks={2} statement={<>Find <Katex tex="\left(3-\sqrt3\,i\right)^3" />, expressing your answer in the form <Katex tex="x+iy" />, where <Katex tex="x,y\in R" />.</>} examinerReport={EXAM_B}>
        <WorkingTable rows={ROWS_B} />
        <Explore title="Each factor of z turns the arrow π/6 clockwise and stretches it by 2√3">
          <TurnStretchWidget />
        </Explore>
      </PartCard>

      <PartCard letter="c" topic="Real Powers" marks={1} statement={<>Find the integer values of <Katex tex="n" /> for which <Katex tex="\left(3-\sqrt3\,i\right)^n" /> is real.</>} examinerReport={EXAM_C}>
        <Background title="General Solutions of sin θ = 0 and cos θ = 0">
          <p>
            On the unit circle <Katex tex="\sin\theta" /> is the height of the point, so it is zero at the two ends of the
            horizontal diameter, <Katex tex="\theta=0" /> and <Katex tex="\theta=\pi" />, and then every <Katex tex="\pi" /> after
            that in either direction: <Katex tex="\theta=k\pi,\ k\in Z" />. Likewise <Katex tex="\cos\theta" /> (the
            across-distance) is zero at the top and bottom, <Katex tex="\theta=\tfrac{\pi}{2}+k\pi,\ k\in Z" />.
          </p>
          <p>
            That is the pattern for any general solution: the first solution, plus any whole number of gaps between
            solutions, with the counter <Katex tex="k" /> ranging over <em>all</em> integers.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <Explore title="Every sixth power lands on the real axis, on one side or the other">
          <RealPowersWidget />
        </Explore>
        <WrongMethod
          title="Real means the argument is 0"
          working={<Katex display tex="-\dfrac{n\pi}{6}=2k\pi \implies n=-12k" />}
        >
          That only finds the powers on the <em>positive</em> real axis. At <Katex tex="n=6" /> the point has made a
          half-turn: <Katex tex="z^6=1728\,\text{cis}(-\pi)=-1728" />, which is certainly real. Real means the imaginary part
          is <Katex tex="0" />, and <Katex tex="\sin" /> is zero at every multiple of <Katex tex="\pi" />, not just the
          multiples of <Katex tex="2\pi" />. Catch it by testing a value your rule leaves out, such as <Katex tex="n=6" />.
        </WrongMethod>
        <WrongMethod
          title="It's the multiples of 6, so n = 6k"
          source="Examiner's report"
          working={<Katex display tex="n=6k" />}
        >
          The right family, but only once you say what <Katex tex="k" /> is. With <Katex tex="k=\tfrac12" /> it gives{' '}
          <Katex tex="n=3" />, and <Katex tex="z^3=-24\sqrt3\,i" /> is not real. And{' '}
          <Katex tex="k\in N" /> would lose <Katex tex="n=0" /> (<Katex tex="z^0=1" />) and the negative multiples, such as{' '}
          <Katex tex="z^{-6}=-\tfrac{1}{1728}" />, which are real too. Finish every general solution with{' '}
          <Katex tex="k\in Z" />.
        </WrongMethod>
      </PartCard>

      <PartCard letter="d" topic="Imaginary Powers" marks={1} statement={<>Find the integer values of <Katex tex="n" /> for which <Katex tex="\left(3-\sqrt3\,i\right)^n = ai" />, where <Katex tex="a" /> is a real number.</>} examinerReport={EXAM_D}>
        <WorkingTable rows={ROWS_D} />
        <Explore title="The first imaginary power is n = 3, then every 6 more">
          <ImaginaryPowersWidget />
        </Explore>
        <WrongMethod
          title="Part b. showed n = 3 works, so n is a multiple of 3"
          working={<Katex display tex="n=3k,\ k\in Z" />}
        >
          Multiples of <Katex tex="3" /> include the multiples of <Katex tex="6" />, and part c. showed those make{' '}
          <Katex tex="z^n" /> real: <Katex tex="z^6=-1728" />, which is not <Katex tex="ai" /> for any real{' '}
          <Katex tex="a" />. Three turns of <Katex tex="-\tfrac{\pi}{6}" /> reach the imaginary axis; three more reach the real
          axis. Only the <em>odd</em> multiples of <Katex tex="3" /> work. Test <Katex tex="n=6" /> in your answer.
        </WrongMethod>
        <WrongMethod
          title="Like part b., the answer has to point straight down: cis = −i"
          working={<Katex display tex="-\dfrac{n\pi}{6}=-\dfrac{\pi}{2}+2k\pi \implies n=3-12k" />}
        >
          <Katex tex="a" /> can be any real number, including a positive one. At <Katex tex="n=9" />,{' '}
          <Katex tex="z^9=\left(2\sqrt3\right)^9\text{cis}\left(-\tfrac{3\pi}{2}\right)=\left(2\sqrt3\right)^9 i" />, straight up,
          and <Katex tex="9" /> isn&apos;t of the form <Katex tex="3-12k" /> (nor is <Katex tex="-3" />). The condition is a zero
          real part, <Katex tex="\cos=0" />, and cosine is zero every <Katex tex="\pi" />, not every <Katex tex="2\pi" />.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
