// 2023 Specialist NHT — Exam 1, Question 5 (4 marks). The NHT report gives sample answers only,
// with no statistics; its notes beyond the bare answers (a. the geometric alternative; b. "Alternative
// approaches … were acceptable.") are quoted as those parts' examiner comments. Cube roots of −8i by
// de Moivre (−√3 − i, √3 − i, 2i), the side 2√3 of the equilateral triangle they form, and its area
// 3√3. Question text transcribed from the original paper. Answers checked with sympy (roots of
// z³ + 8i; all three sides 2√3; area 3√3) and against the report's sample answers. The report writes
// the roots as −2cis(π/6 + 2kπ/3); the solution uses 2cis(−π/6 + 2kπ/3), the same three numbers.
// Solution is original. The Argand diagram in part b. is this site's own explanatory figure
// (spec-2023nhte1-q5-roots.png, matplotlib); VCAA printed no figure for this question.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import rootsSrc from './spec-2023nhte1-q5-roots.png'

const REPORT_A: SAExaminerStats = {
  comment: (
    <>
      Alternatively, a geometric argument could be used. Knowing that <Katex tex="z=2i" /> is a solution
      of <Katex tex="z^3=-8i" /> and that the other solutions lie on a circle of radius of 2 centred at the
      origin and separated by an angle of <Katex tex="\frac{2\pi}{3}" />, the remaining solutions can be
      located.
    </>
  ),
}

const REPORT_B: SAExaminerStats = {
  comment: <>Alternative approaches (using, for example, the cosine rule) were acceptable.</>,
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="-8i=8\,\text{cis}\!\left(-\frac{\pi}{2}\right)" />,
    reason: <>Write the right side in polar form: <Katex tex="-8i" /> sits on the negative imaginary axis, 8 units from the origin.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}&z=r\,\text{cis}(\theta)\\ \implies &r^3\,\text{cis}(3\theta)\\ &\ =8\,\text{cis}\!\left(-\tfrac{\pi}{2}+2k\pi\right)\end{aligned}" />,
    reason: <>By de Moivre&apos;s theorem, cubing <Katex tex="z" /> cubes the modulus and triples the argument. The argument of <Katex tex="-8i" /> is only fixed up to whole turns, so add <Katex tex="2k\pi" />: this is where the three different roots come from.</>,
  },
  {
    working: <Katex display tex="r=2,\qquad \theta=-\frac{\pi}{6}+\frac{2k\pi}{3},\ k=0,1,-1" />,
    reason: <>Equate moduli (<Katex tex="r^3=8" />, with <Katex tex="r>0" />) and arguments (divide by 3). Three consecutive values of <Katex tex="k" /> give three different points; any other <Katex tex="k" /> repeats one of them.</>,
  },
  {
    working: <Katex display tex="\theta=-\frac{\pi}{6},\ \frac{\pi}{2},\ -\frac{5\pi}{6}" />,
    reason: <>Taking <Katex tex="k=-1" /> keeps every argument inside <Katex tex="(-\pi,\pi]" />.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}2\,\text{cis}\!\left(-\tfrac{\pi}{6}\right)&=2\left(\tfrac{\sqrt3}{2}-\tfrac12i\right)=\sqrt3-i\\2\,\text{cis}\!\left(\tfrac{\pi}{2}\right)&=2(0+i)=2i\\2\,\text{cis}\!\left(-\tfrac{5\pi}{6}\right)&=2\left(-\tfrac{\sqrt3}{2}-\tfrac12i\right)=-\sqrt3-i\end{aligned}" />,
    reason: <>The question asks for Cartesian form: <Katex tex="\text{cis}(\theta)=\cos(\theta)+i\sin(\theta)" />, with exact values from the <Katex tex="\tfrac{\pi}{6}" /> family.</>,
  },
  {
    working: <Katex display tex="\boxed{z=\sqrt3-i,\quad z=-\sqrt3-i,\quad z=2i}" />,
    reason: <>Quick check on the easiest one: <Katex tex="(2i)^3=8i^3=-8i" /> ✓.</>,
    more: <>VCAA writes the roots as <Katex tex="-2\,\text{cis}\!\left(\tfrac{\pi}{6}+\tfrac{2k\pi}{3}\right)" />, using <Katex tex="-8=8\,\text{cis}(\pi)" /> to absorb the minus sign; it is the same three numbers. The other two roots also check: <Katex tex="(\sqrt3-i)^2=2-2\sqrt3i" />, and <Katex tex="(2-2\sqrt3i)(\sqrt3-i)=2\sqrt3-2i-6i+2\sqrt3i^2=-8i" /> ✓.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="z_1=-\sqrt3-i,\quad z_2=\sqrt3-i" />,
    reason: <>Any two of the three roots will do: the roots of <Katex tex="z^3=-8i" /> are equally spaced around the circle <Katex tex="|z|=2" />, so all three sides of the triangle they form are equal. This pair is the easiest because the two points are level.</>,
    more: (
      <>
        <span className="block mb-2">The three roots, the circle of radius 2 they lie on, and the triangle they make:</span>
        <span className="block bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img loading="lazy" decoding="async" src={rootsSrc}
            alt="This site's own Argand diagram: the points −√3 − i, √3 − i and 2i on a dashed circle of radius 2 centred at the origin, joined into a shaded equilateral triangle whose bottom side, from −√3 − i to √3 − i, is labelled 2√3"
            className="w-full max-w-[320px] block" />
        </span>
      </>
    ),
  },
  {
    working: <Katex display tex="\begin{aligned}|z_2-z_1|&=\left|2\sqrt3+0i\right|\\ &=\sqrt{\left(2\sqrt3\right)^2+0^2}\\ &=2\sqrt3\end{aligned}" />,
    reason: <>The distance between the points representing <Katex tex="z_1" /> and <Katex tex="z_2" /> is the modulus of their difference. As required.</>,
    more: <>The cosine rule, which the report also accepts: both points are 2 from the origin and <Katex tex="\tfrac{2\pi}{3}" /> apart in argument, so the distance squared is <Katex tex="2^2+2^2-2(2)(2)\cos\!\left(\tfrac{2\pi}{3}\right)=4+4+4=12" />, giving <Katex tex="\sqrt{12}=2\sqrt3" />. That works for any pair.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\text{equilateral triangle, side } 2\sqrt3" />,
    reason: <>From part b.: the three roots are equally spaced on a circle, so every side has the length just found.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}A&=\tfrac12\times2\sqrt3\times2\sqrt3\\ &\quad\times\sin\!\left(\tfrac{\pi}{3}\right)\\ &=\tfrac12\times12\times\tfrac{\sqrt3}{2}\end{aligned}" />,
    reason: <>Area <Katex tex="=\tfrac12ab\sin(C)" />, with two sides of <Katex tex="2\sqrt3" /> and the <Katex tex="60^\circ" /> angle between them.</>,
  },
  {
    working: <Katex display tex="\boxed{A=3\sqrt3}" />,
    reason: <>Sanity check with base and height: the base from <Katex tex="-\sqrt3-i" /> to <Katex tex="\sqrt3-i" /> is <Katex tex="2\sqrt3" />, and the top vertex <Katex tex="2i" /> is 3 units above the line <Katex tex="\operatorname{Im}(z)=-1" />, so <Katex tex="A=\tfrac12\times2\sqrt3\times3=3\sqrt3" /> ✓.</>,
  },
]

export default function SpecialistQ5_2023NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (4 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Roots of Complex Numbers"
        marks={2}
        statement={
          <>
            Find the three solutions of the equation <Katex tex="z^3=-8i" />, where <Katex tex="z\in C" />.
            Give your answers in Cartesian form.
          </>
        }
        examinerReport={REPORT_A}
      >
        <Background>
          <p>
            To solve <Katex tex="z^n=w" />, write <Katex tex="w" /> in polar form and use de Moivre&apos;s
            theorem, <Katex tex="\left(r\,\text{cis}(\theta)\right)^n=r^n\,\text{cis}(n\theta)" />. The{' '}
            <Katex tex="n" /> solutions all have modulus <Katex tex="\sqrt[n]{|w|}" />, and their
            arguments are spaced <Katex tex="\tfrac{2\pi}{n}" /> apart, so on an Argand diagram they are
            the vertices of a regular <Katex tex="n" />-sided polygon centred at the origin.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Roots of Complex Numbers"
        marks={1}
        statement={
          <>
            Let <Katex tex="z_1" /> and <Katex tex="z_2" /> be two of the solutions of the equation{' '}
            <Katex tex="z^3=-8i" />.
            <br />
            Show that the length of the straight line segment between the points represented by{' '}
            <Katex tex="z_1" /> and <Katex tex="z_2" /> is <Katex tex="2\sqrt3" />.
          </>
        }
        examinerReport={REPORT_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Area of a Triangle"
        marks={1}
        statement={
          <>
            Hence, or otherwise, determine the area of the triangle whose vertices are the points
            representing the solutions of the equation <Katex tex="z^3=-8i" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
