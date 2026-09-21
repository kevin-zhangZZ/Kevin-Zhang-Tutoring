// 2018 Specialist Mathematics — Exam 1, Question 2 (4 marks). Convert 1+i to polar form,
// then evaluate a quotient of large powers using de Moivre. Question text transcribed from
// the original paper (no diagram given). Answer checked independently with sympy and against
// the VCAA examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [17, 83],
  average: 0.9,
  comment: (
    <>
      Students were required to show that{' '}
      <Katex tex="1+i=\sqrt2\,\operatorname{cis}\!\left(\tfrac{\pi}{4}\right)" />. This
      question was answered well by most students.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [12, 3, 48, 37],
  average: 2.1,
  comment: (
    <>
      Most students realised that they needed to use polar form and de Moivre's theorem. Quite
      a few students were not able to write <Katex tex="\sqrt3-i" /> in polar form correctly,
      with incorrect arguments being given frequently. Students are reminded that a diagram
      placing the complex number in the correct quadrant is helpful.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="|1+i| = \sqrt{1^2+1^2} = \sqrt2" />,
    reason: <>The modulus, from Pythagoras on the real and imaginary parts.</>,
  },
  {
    working: <Katex display tex="\operatorname{Arg}(1+i) = \tan^{-1}\!\left(\frac11\right) = \frac{\pi}{4}" />,
    reason: <><Katex tex="1+i" /> lies in the first quadrant, so the inverse tangent gives the argument directly with no adjustment.</>,
  },
  {
    working: <Katex display tex="1+i = \sqrt2\left(\cos\frac{\pi}{4} + i\sin\frac{\pi}{4}\right) = \sqrt2\,\operatorname{cis}\!\left(\frac{\pi}{4}\right) \ \checkmark" />,
    reason: <>On a "show that", finish by writing the required form explicitly. Confirm it if you like: <Katex tex="\sqrt2\left(\tfrac{\sqrt2}{2}+i\tfrac{\sqrt2}{2}\right)=1+i" /> ✓</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\left|\sqrt3-i\right| = \sqrt{3+1} = 2, \qquad \operatorname{Arg}\!\left(\sqrt3-i\right) = -\frac{\pi}{6}" />,
    reason: <>Fourth quadrant (positive real part, negative imaginary part), so the argument is <em>negative</em>. The report names getting this argument wrong as the main source of lost marks — a quick sketch settles the quadrant.</>,
  },
  {
    working: <Katex display tex="\left(\sqrt3-i\right)^{10} = 2^{10}\operatorname{cis}\!\left(-\frac{10\pi}{6}\right) = 1024\operatorname{cis}\!\left(-\frac{5\pi}{3}\right)" />,
    reason: <>De Moivre: raise the modulus to the power and multiply the argument by it.</>,
  },
  {
    working: <Katex display tex="(1+i)^{12} = \left(\sqrt2\right)^{12}\operatorname{cis}\!\left(\frac{12\pi}{4}\right) = 64\operatorname{cis}(3\pi)" />,
    reason: <>Using part (a). <Katex tex="\left(\sqrt2\right)^{12}=2^6=64" />.</>,
  },
  {
    working: <Katex display tex="\frac{\left(\sqrt3-i\right)^{10}}{(1+i)^{12}} = \frac{1024}{64}\operatorname{cis}\!\left(-\frac{5\pi}{3}-3\pi\right) = 16\operatorname{cis}\!\left(-\frac{14\pi}{3}\right)" />,
    reason: <>Dividing in polar form: divide the moduli, subtract the arguments.</>,
  },
  {
    working: <Katex display tex="-\frac{14\pi}{3} + 4\pi = -\frac{2\pi}{3}" />,
    reason: <>Add multiples of <Katex tex="2\pi" /> to bring the argument into <Katex tex="(-\pi,\pi]" />. Not strictly necessary, but it makes the exact values obvious.</>,
  },
  {
    working: <Katex display tex="16\operatorname{cis}\!\left(-\frac{2\pi}{3}\right) = 16\left(-\frac12 - \frac{\sqrt3}{2}i\right)" />,
    reason: <><Katex tex="\cos\!\left(-\tfrac{2\pi}{3}\right)=-\tfrac12" /> and <Katex tex="\sin\!\left(-\tfrac{2\pi}{3}\right)=-\tfrac{\sqrt3}{2}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{-8 - 8\sqrt3\,i}" />,
    reason: <>The required <Katex tex="a+bi" /> form with <Katex tex="a=-8" /> and <Katex tex="b=-8\sqrt3" />; both are real, as the question allows. (<Katex tex="\approx-8-13.86i" />, in the third quadrant — consistent with an argument of <Katex tex="-\tfrac{2\pi}{3}" />.)</>,
  },
]

export default function SpecialistQ2_2018Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (4 marks)</p>
      </div>

      <PartCard letter="a" marks={1} statement={<>Show that <Katex tex="1+i=\sqrt2\,\operatorname{cis}\!\left(\dfrac{\pi}{4}\right)" />.</>} examinerReport={EXAM_A}>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard letter="b" marks={3} statement={<>Evaluate <Katex tex="\dfrac{\left(\sqrt3-i\right)^{10}}{(1+i)^{12}}" />, giving your answer in the form <Katex tex="a+bi" />, where <Katex tex="a,b\in\mathbb{R}" />.</>} examinerReport={EXAM_B}>
        <Background>
          <p>
            Expanding these powers in cartesian form is hopeless. Convert both numbers to
            polar form, use de Moivre to raise them, then divide — moduli divide and arguments
            subtract, so the whole thing collapses to one <Katex tex="\operatorname{cis}" />{' '}
            before converting back.
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
      </PartCard>
    </div>
  )
}
