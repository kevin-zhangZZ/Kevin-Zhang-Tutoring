// 2018 Specialist Mathematics — Exam 1, Question 2 (4 marks). Convert 1+i to polar form,
// then evaluate a quotient of large powers using de Moivre. Question text transcribed from
// the original paper (no diagram given). Answer checked independently with sympy and against
// the VCAA examination report (-8 - 8√3 i); itute agrees. Solution is original.
//
// Part b has two interactives: interactives/spec-2018e1-q2b-quadrant.tsx (pick π/6, π/3, 5π/6,
// 11π/6 or −π/6 and see where 2 cis θ lands relative to √3 − i, the argument error the report
// describes) and interactives/spec-2018e1-q2b-spin.tsx (de Moivre as repeated turning on a
// direction dial: numerator, denominator, then the quotient's −14π/3 unwinding to −2π/3, with a
// toggle for the +π/6 slip, which gives the conjugate). WrongMethod boxes: tan(1/1) = π/4 in part
// a; Arg(√3 − i) = π/6, π/3 and 5π/6 in part b, each followed through with sympy (π/6 gives
// −8 + 8√3 i, π/3 gives 8 + 8√3 i, 5π/6 happens to give the right answer because the power is
// even).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const QuadrantWidget = lazyWidget(() => import('../interactives/spec-2018e1-q2b-quadrant'))
const SpinWidget = lazyWidget(() => import('../interactives/spec-2018e1-q2b-spin'))

const EXAM_A: SAExaminerStats = {
  marks: [17, 83],
  average: 0.9,
  comment: (
    <>
      Students were required to show that{' '}
      <Katex tex="1+i=\sqrt2\,\operatorname{cis}\!\left(\tfrac{\pi}{4}\right)" />.
      <br />
      This question was answered well by most students. A common incorrect response was to
      write <Katex tex="\tan\left(\tfrac11\right)=\tfrac{\pi}{4}" /> rather than{' '}
      <Katex tex="\arctan\left(\tfrac11\right)=\tfrac{\pi}{4}" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [12, 3, 48, 37],
  average: 2.1,
  comment: (
    <>
      Most students realised that they needed to use polar form and de Moirvre's theorem.
      Quite a few students were not able to write <Katex tex="\sqrt3-i" /> in polar form
      correctly with arguments of <Katex tex="\tfrac{\pi}{6}" />,{' '}
      <Katex tex="\tfrac{5\pi}{6}" /> and <Katex tex="\tfrac{\pi}{3}" /> being given
      frequently. Students are reminded that a diagram placing the complex number in the
      correct quadrant can be helpful in avoiding errors. Of those students who obtained the
      result <Katex tex="16\operatorname{cis}\left(-\tfrac{2\pi}{3}\right)" />, some neglected
      to write the final answer in the required form or made errors in their attempt.
      <br />
      A small number of students attempted to expand brackets. This approach was rarely
      successful.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="|1+i| = \sqrt{1^2+1^2} = \sqrt2" />,
    reason: <>The modulus is the distance from the origin. <Katex tex="1+i" /> is 1 across and 1 up, so Pythagoras gives the length of the hypotenuse.</>,
  },
  {
    working: <Katex display tex="\operatorname{Arg}(1+i) = \tan^{-1}\!\left(\frac11\right) = \frac{\pi}{4}" />,
    reason: <>The argument is the angle from the positive real axis, and its tangent is imaginary part over real part. Both parts are positive, so <Katex tex="1+i" /> is in the first quadrant and the angle in the triangle <em>is</em> the argument, no adjustment needed. You want the angle whose tangent is 1, so write <Katex tex="\tan^{-1}" /> (arctan). The report's common incorrect response was writing <Katex tex="\tan\left(\tfrac11\right)=\tfrac{\pi}{4}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{1+i = \sqrt2\left(\cos\frac{\pi}{4} + i\sin\frac{\pi}{4}\right) = \sqrt2\,\operatorname{cis}\!\left(\frac{\pi}{4}\right)}" />,
    reason: <>Polar form is <Katex tex="r\operatorname{cis}\theta" /> with <Katex tex="r=|z|" /> and <Katex tex="\theta=\operatorname{Arg}z" />; on a "show that", finish by writing the required form explicitly. Expanding back confirms it: <Katex tex="\sqrt2\left(\tfrac{\sqrt2}{2}+\tfrac{\sqrt2}{2}i\right)=1+i" />. As required.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\left|\sqrt3-i\right| = \sqrt{3+1} = 2" />,
    reason: <>Polar form first: powers are easy in polar form and hopeless in cartesian form. Start with the modulus, by Pythagoras.</>,
  },
  {
    working: <Katex display tex="\operatorname{Arg}\left(\sqrt3-i\right) = -\frac{\pi}{6}" />,
    reason: <>Sketch it: <Katex tex="\sqrt3" /> across and 1 <em>down</em>, so the fourth quadrant. The triangle has sides 1, <Katex tex="\sqrt3" />, 2, so the angle at the origin is <Katex tex="\tan^{-1}\!\left(\tfrac{1}{\sqrt3}\right)=\tfrac{\pi}{6}" />; below the axis means clockwise, so the argument is negative. The report says <Katex tex="\tfrac{\pi}{6}" />, <Katex tex="\tfrac{5\pi}{6}" /> and <Katex tex="\tfrac{\pi}{3}" /> were given frequently. Each of those points somewhere else (try them in the first widget below).</>,
  },
  {
    working: <Katex display tex="\left(\sqrt3-i\right)^{10} = 2^{10}\operatorname{cis}\!\left(-\frac{10\pi}{6}\right) = 1024\operatorname{cis}\!\left(-\frac{5\pi}{3}\right)" />,
    reason: <>De Moivre: raise the modulus to the power and multiply the argument by it. Why: multiplying complex numbers multiplies their lengths and adds their angles, so ten equal factors add <Katex tex="-\tfrac{\pi}{6}" /> ten times.</>,
  },
  {
    working: <Katex display tex="(1+i)^{12} = \left(\sqrt2\right)^{12}\operatorname{cis}\!\left(\frac{12\pi}{4}\right) = 64\operatorname{cis}(3\pi)" />,
    reason: <>Using part a, which is why it was there. <Katex tex="\left(\sqrt2\right)^{12}=2^6=64" />. Note <Katex tex="64\operatorname{cis}(3\pi)=-64" />, a real number; quick check: <Katex tex="(1+i)^2=2i" />, so <Katex tex="(1+i)^{12}=(2i)^6=-64" />.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\begin{aligned}\frac{\left(\sqrt3-i\right)^{10}}{(1+i)^{12}} &= \frac{1024}{64}\operatorname{cis}\!\left(-\frac{5\pi}{3}-3\pi\right)\\ &= 16\operatorname{cis}\!\left(-\frac{14\pi}{3}\right)\end{aligned}"
      />
    ),
    reason: <>Dividing in polar form undoes multiplying: divide the moduli and subtract the arguments (numerator's minus denominator's).</>,
  },
  {
    working: <Katex display tex="-\frac{14\pi}{3} + 4\pi = -\frac{2\pi}{3}" />,
    reason: <>Adding <Katex tex="2\pi" /> is a full turn, so it doesn't change the complex number. Add two turns to bring the argument into <Katex tex="(-\pi,\pi]" />, where the exact values are the familiar ones. (Or reduce each argument early: <Katex tex="-\tfrac{5\pi}{3}" /> points the same way as <Katex tex="\tfrac{\pi}{3}" /> and <Katex tex="3\pi" /> the same way as <Katex tex="\pi" />, so <Katex tex="\tfrac{\pi}{3}-\pi=-\tfrac{2\pi}{3}" /> directly.)</>,
  },
  {
    working: <Katex display tex="16\operatorname{cis}\!\left(-\frac{2\pi}{3}\right) = 16\left(-\frac12 - \frac{\sqrt3}{2}i\right)" />,
    reason: <><Katex tex="-\tfrac{2\pi}{3}" /> is clockwise past <Katex tex="-\tfrac{\pi}{2}" />, in the third quadrant, where cosine and sine are both negative. The reference angle is <Katex tex="\tfrac{\pi}{3}" />, so <Katex tex="\cos\!\left(-\tfrac{2\pi}{3}\right)=-\tfrac12" /> and <Katex tex="\sin\!\left(-\tfrac{2\pi}{3}\right)=-\tfrac{\sqrt3}{2}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{-8 - 8\sqrt3\,i}" />,
    reason: <>The required <Katex tex="a+bi" /> form (the report notes some students who reached <Katex tex="16\operatorname{cis}\left(-\tfrac{2\pi}{3}\right)" /> did not finish in this form), with <Katex tex="a=-8" /> and <Katex tex="b=-8\sqrt3" />, both real, as the question requires. Both parts negative: third quadrant, consistent with an argument of <Katex tex="-\tfrac{2\pi}{3}" />.</>,
  },
]

export default function SpecialistQ2_2018Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (4 marks)</p>
      </div>

      <PartCard letter="a" topic="Polar Form" marks={1} statement={<>Show that <Katex tex="1+i=\sqrt2\,\operatorname{cis}\!\left(\dfrac{\pi}{4}\right)" />.</>} examinerReport={EXAM_A}>
        <Background>
          <p>
            Every complex number <Katex tex="z=x+yi" /> is a point on the Argand plane, and polar
            form describes that point by its distance and direction instead:{' '}
            <Katex tex="z=r\operatorname{cis}\theta=r(\cos\theta+i\sin\theta)" />, where{' '}
            <Katex tex="r=|z|=\sqrt{x^2+y^2}" /> and <Katex tex="\theta" /> is the angle from the
            positive real axis, with <Katex tex="\tan\theta=\tfrac{y}{x}" />. The principal
            argument <Katex tex="\operatorname{Arg}z" /> is the one in <Katex tex="(-\pi,\pi]" />.
            The tangent alone never settles the angle; the quadrant of the point does.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <WrongMethod
          title="Write tan(1/1) = π/4"
          source="Examiner's report"
          working={<Katex display tex="\tan\left(\tfrac11\right)=\tfrac{\pi}{4}" />}
        >
          The idea is right but the statement is false: <Katex tex="\tan" /> takes an angle and
          gives a ratio, so <Katex tex="\tan(1)" /> is the tangent of 1 radian, about 1.557, not{' '}
          <Katex tex="\tfrac{\pi}{4}" />. What you mean is the angle whose tangent is 1, which is{' '}
          <Katex tex="\tan^{-1}(1)=\tfrac{\pi}{4}" /> (equivalently{' '}
          <Katex tex="\tan\tfrac{\pi}{4}=1" />). In a "show that" the working is all there is to
          mark, so the notation has to say what you mean.
        </WrongMethod>
      </PartCard>

      <PartCard letter="b" topic="De Moivre's Theorem" marks={3} statement={<>Evaluate <Katex tex="\dfrac{\left(\sqrt3-i\right)^{10}}{(1+i)^{12}}" />, giving your answer in the form <Katex tex="a+bi" />, where <Katex tex="a,b\in R" />.</>} examinerReport={EXAM_B}>
        <Background>
          <p>
            Expanding these powers in cartesian form is hopeless. Convert both numbers to
            polar form, use de Moivre, <Katex tex="(r\operatorname{cis}\theta)^n=r^n\operatorname{cis}(n\theta)" />,
            to raise them, then divide: moduli divide and arguments subtract, so the whole thing
            collapses to one <Katex tex="\operatorname{cis}" /> before converting back.
          </p>
          <p>
            De Moivre is not a new rule to memorise. Multiplying two complex numbers multiplies
            their lengths and <em>adds</em> their angles, so multiplying by the same number{' '}
            <Katex tex="n" /> times turns the point by <Katex tex="\theta" />, <Katex tex="n" /> times
            over. Dividing turns it back the other way.
          </p>
          <p>
            The one place to be careful is the argument of <Katex tex="\sqrt3-i" />. It sits
            in the fourth quadrant, so <Katex tex="\operatorname{Arg}=-\tfrac{\pi}{6}" />, not{' '}
            <Katex tex="+\tfrac{\pi}{6}" /> and not <Katex tex="\tfrac{11\pi}{6}" /> if you
            want the principal value. Sketching it on an Argand diagram takes five seconds and
            is what the report recommends.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Explore title="Which angle actually points at √3 − i?">
          <QuadrantWidget />
        </Explore>
        <Explore title="De Moivre is repeated turning: why −14π/3 and −2π/3 are the same direction">
          <SpinWidget />
        </Explore>
        <WrongMethod
          title="Arg(√3 − i) = tan⁻¹(1/√3) = π/6"
          source="Examiner's report"
          working={
            <Katex
              display
              tex="\begin{aligned}\frac{\left(2\operatorname{cis}\frac{\pi}{6}\right)^{10}}{64\operatorname{cis}(3\pi)} &= 16\operatorname{cis}\!\left(\frac{5\pi}{3}-3\pi\right)\\ &= 16\operatorname{cis}\!\left(-\frac{4\pi}{3}\right) = -8+8\sqrt3\,i\end{aligned}"
            />
          }
        >
          <Katex tex="\tan^{-1}\!\left(\tfrac{1}{\sqrt3}\right)" /> only gives the size of the angle
          in the triangle. <Katex tex="2\operatorname{cis}\tfrac{\pi}{6}=\sqrt3+i" />, the point{' '}
          <em>above</em> the axis, so everything turns the wrong way and the answer comes out as
          the conjugate of the true one. Catch it by plotting the point first: a negative imaginary
          part means below the real axis, so a negative argument.
        </WrongMethod>
        <WrongMethod
          title="Arg(√3 − i) = π/3"
          source="Examiner's report"
          working={<Katex display tex="16\operatorname{cis}\!\left(\frac{10\pi}{3}-3\pi\right) = 16\operatorname{cis}\!\left(\frac{\pi}{3}\right) = 8+8\sqrt3\,i" />}
        >
          This is the ratio upside down, <Katex tex="\tan^{-1}\!\left(\tfrac{\sqrt3}{1}\right)" />, as
          well as the sign lost. The tangent of the argument is imaginary part over real part,{' '}
          <Katex tex="\tfrac{-1}{\sqrt3}" />. Catch it by converting back:{' '}
          <Katex tex="2\operatorname{cis}\tfrac{\pi}{3}=1+\sqrt3\,i" />, which isn't{' '}
          <Katex tex="\sqrt3-i" />.
        </WrongMethod>
        <WrongMethod
          title="tan θ = −1/√3, so θ = 5π/6"
          source="Examiner's report"
          working={<Katex display tex="2\operatorname{cis}\!\left(\frac{5\pi}{6}\right) = -\sqrt3+i \ne \sqrt3-i" />}
        >
          <Katex tex="\tan\theta=-\tfrac{1}{\sqrt3}" /> has two solutions in{' '}
          <Katex tex="(-\pi,\pi]" />, pointing in opposite directions, and{' '}
          <Katex tex="\tfrac{5\pi}{6}" /> is the one in the second quadrant. Followed through, it
          happens to give the right final answer here, because{' '}
          <Katex tex="-\sqrt3+i=-(\sqrt3-i)" /> and an even power removes the minus sign. But the
          polar form written down is false, and with an odd power the answer would be wrong too.
          Catch it: the real part of <Katex tex="\sqrt3-i" /> is positive, so the point is on the
          right half of the plane and its argument is between <Katex tex="-\tfrac{\pi}{2}" /> and{' '}
          <Katex tex="\tfrac{\pi}{2}" />.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
