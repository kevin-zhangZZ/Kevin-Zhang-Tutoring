// 2025 Specialist NHT — Exam 1, Question 4 (6 marks). The NHT report gives sample answers only,
// with no statistics. tan(π/12) = (√3 − 1)/(√3 + 1) from the tan difference identity; z = (√3 + 1)
// + (√3 − 1)i in polar form, 2√2 cis(π/12); w = z⁴ = 64 cis(π/3) = 32 + 32√3 i by de Moivre; and
// the area of the triangle O, z, w as ½|z||w| sin(π/4) = 64. Question text transcribed from the
// original paper (read from a rendered page image; the 2025 paper has no text layer). Answers
// checked with sympy (|z|, arg z, z⁴ expanded, and the area by ½|x₁y₂ − x₂y₁|) and against the
// report's sample answers, which agree. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow } from '../QuestionParts'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\tan\left(\frac{\pi}{12}\right)=\tan\left(\frac{\pi}{3}-\frac{\pi}{4}\right)" />,
    reason: <>No exact value of <Katex tex="\tan\left(\tfrac{\pi}{12}\right)" /> is memorised, so write <Katex tex="\tfrac{\pi}{12}" /> as a difference of two angles we do know: <Katex tex="\tfrac{4\pi}{12}-\tfrac{3\pi}{12}" />.</>,
  },
  {
    working: <Katex display tex="=\frac{\tan\left(\frac{\pi}{3}\right)-\tan\left(\frac{\pi}{4}\right)}{1+\tan\left(\frac{\pi}{3}\right)\tan\left(\frac{\pi}{4}\right)}" />,
    reason: <>The difference identity from the formula sheet: <Katex tex="\tan(A-B)=\dfrac{\tan(A)-\tan(B)}{1+\tan(A)\tan(B)}" />.</>,
  },
  {
    working: <Katex display tex="=\frac{\sqrt3-1}{1+\sqrt3\times1}=\frac{\sqrt3-1}{\sqrt3+1}" />,
    reason: <>Exact values: <Katex tex="\tan\left(\tfrac{\pi}{3}\right)=\sqrt3" />, <Katex tex="\tan\left(\tfrac{\pi}{4}\right)=1" />. As required.</>,
    more: <>Sanity check: <Katex tex="\tfrac{\sqrt3-1}{\sqrt3+1}\approx\tfrac{0.732}{2.732}\approx0.268" />, small and positive, as the tangent of a small first-quadrant angle (15°) should be. Using <Katex tex="\tfrac{\pi}{4}-\tfrac{\pi}{6}" /> works too: <Katex tex="\tfrac{1-\frac{1}{\sqrt3}}{1+\frac{1}{\sqrt3}}" />, then multiply top and bottom by <Katex tex="\sqrt3" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} |z|&=\sqrt{\left(\sqrt3+1\right)^2+\left(\sqrt3-1\right)^2} \\ &=\sqrt{\left(4+2\sqrt3\right)+\left(4-2\sqrt3\right)}=\sqrt8=2\sqrt2 \end{aligned}" />,
    reason: <>The modulus is the distance from the origin: <Katex tex="\sqrt{a^2+b^2}" />. Expanding, <Katex tex="(\sqrt3\pm1)^2=3\pm2\sqrt3+1" />, and the surd terms cancel.</>,
  },
  {
    working: <Katex display tex="\tan(\theta)=\frac{\sqrt3-1}{\sqrt3+1},\quad \theta\in\left(0,\frac{\pi}{2}\right)\implies\theta=\frac{\pi}{12}" />,
    reason: <>Both the real and imaginary parts are positive, so <Katex tex="z" /> is in the first quadrant. There <Katex tex="\tan(\theta)=\tfrac{\text{Im}(z)}{\text{Re}(z)}" />, and part a. says exactly which first-quadrant angle has this tangent.</>,
  },
  {
    working: <Katex display tex="\boxed{z=2\sqrt2\,\text{cis}\left(\frac{\pi}{12}\right)}" />,
    reason: <>Polar form is <Katex tex="r\,\text{cis}(\theta)" />, with the principal argument in <Katex tex="(-\pi,\pi]" />.</>,
    more: <>Check: <Katex tex="2\sqrt2\cos\left(\tfrac{\pi}{12}\right)=2\sqrt2\cdot\tfrac{\sqrt6+\sqrt2}{4}=\tfrac{\sqrt{12}+2}{2}=\sqrt3+1" /> ✓, the real part.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="w=z^4=\left(2\sqrt2\right)^4\text{cis}\left(4\times\frac{\pi}{12}\right)" />,
    reason: <>De Moivre&apos;s theorem: raising to the 4th power raises the modulus to the 4th power and multiplies the argument by 4.</>,
  },
  {
    working: <Katex display tex="=64\,\text{cis}\left(\frac{\pi}{3}\right)=64\left(\frac12+\frac{\sqrt3}{2}i\right)" />,
    reason: <><Katex tex="\left(2\sqrt2\right)^4=\left(8\right)^2=64" />, since <Katex tex="\left(2\sqrt2\right)^2=8" />. Then <Katex tex="\cos\left(\tfrac{\pi}{3}\right)=\tfrac12" /> and <Katex tex="\sin\left(\tfrac{\pi}{3}\right)=\tfrac{\sqrt3}{2}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{w=32+32\sqrt3\,i}" />,
    reason: <>As required.</>,
    more: <>Multiplying out <Katex tex="\big((\sqrt3+1)+(\sqrt3-1)i\big)^4" /> would also work, but it is long and easy to slip in; polar form is the reason part b. came first.</>,
  },
]

const ROWS_D: WorkingRow[] = [
  {
    working: <Katex display tex="|z|=2\sqrt2,\quad |w|=64" />,
    reason: <>Two sides of the triangle are <Katex tex="Oz" /> and <Katex tex="Ow" />, whose lengths are the moduli (parts b. and c.).</>,
  },
  {
    working: <Katex display tex="\angle zOw=\arg(w)-\arg(z)=\frac{\pi}{3}-\frac{\pi}{12}=\frac{\pi}{4}" />,
    reason: <>The angle between those two sides, at <Katex tex="O" />, is the difference of the arguments.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \text{Area}&=\frac12|z||w|\sin\left(\frac{\pi}{4}\right) \\ &=\frac12\times2\sqrt2\times64\times\frac{1}{\sqrt2} \end{aligned}" />,
    reason: <>Area of a triangle from two sides and the included angle: <Katex tex="\tfrac12ab\sin(C)" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Area}=64\text{ square units}}" />,
    reason: <>The <Katex tex="\sqrt2" />&apos;s cancel and <Katex tex="\tfrac12\times2=1" />.</>,
    more: <>Check with coordinates: for a triangle with vertices <Katex tex="O" />, <Katex tex="(a,b)" /> and <Katex tex="(c,d)" />, the area is <Katex tex="\tfrac12|ad-bc|" />. Here <Katex tex="\tfrac12\left|(\sqrt3+1)(32\sqrt3)-(\sqrt3-1)(32)\right|=16\left|(3+\sqrt3)-(\sqrt3-1)\right|=64" /> ✓.</>,
  },
]

export default function SpecialistQ4_2025NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (6 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Compound Angle"
        marks={2}
        statement={<>Show that <Katex tex="\tan\left(\dfrac{\pi}{12}\right)=\dfrac{\sqrt3-1}{\sqrt3+1}" />.</>}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p>
          Consider the complex number <Katex tex="z=\left(\sqrt3+1\right)+\left(\sqrt3-1\right)i" />.
        </p>
      </div>

      <PartCard letter="b" topic="Polar Form" marks={1} statement={<>Express <Katex tex="z" /> in polar form.</>}>
        <Background>
          <p>
            The point of part a. is to give you the argument here. <Katex tex="z" /> is in the first quadrant, its argument{' '}
            <Katex tex="\theta" /> satisfies <Katex tex="\tan(\theta)=\tfrac{\sqrt3-1}{\sqrt3+1}" />, and part a. has just shown
            that <Katex tex="\theta=\tfrac{\pi}{12}" /> does. When a &ldquo;show that&rdquo; part is followed by a question
            using the same numbers, look for how the first feeds the second.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p>
          Consider the complex number <Katex tex="w=z^4" />.
        </p>
      </div>

      <PartCard letter="c" topic="De Moivre's Theorem" marks={1} statement={<>Show that <Katex tex="w=32+32\sqrt3\,i" />.</>}>
        <WorkingTable rows={ROWS_C} />
      </PartCard>

      <PartCard
        letter="d"
        topic="Area on Argand Plane"
        marks={2}
        statement={
          <>
            On the complex plane, the origin, <Katex tex="O" />, and the points representing the complex numbers{' '}
            <Katex tex="z" /> and <Katex tex="w" /> form a triangle.
            <br />
            Calculate the area of the triangle.
          </>
        }
      >
        <WorkingTable rows={ROWS_D} />
      </PartCard>
    </div>
  )
}
