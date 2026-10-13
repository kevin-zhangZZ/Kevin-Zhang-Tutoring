// 2014 Specialist Mathematics — Exam 1, Question 3 (5 marks). Factorising a real quartic
// from one complex root. Question text transcribed from the original paper (no diagram
// given). Answers checked with sympy and against the VCAA examination report. Solution is
// original.

import Katex from '../../../components/Katex'
import { PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [24, 9, 67],
  average: 1.5,
  comment: (
    <>
      Most students identified the need to use the conjugate root theorem but some then gave{' '}
      <Katex tex="z^2-1" /> as their answer. Confusion between solutions and factors was
      often evident. Several students gave the conjugate root or factor and then did no
      further work. Some students seemed not to realise that they had completed what was
      required and found the second quadratic factor. Some quoted <Katex tex="z=\pm1" /> as
      solutions rather than <Katex tex="z=\pm i" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [30, 7, 9, 54],
  average: 1.9,
  comment: (
    <>
      Students made many sign errors and other algebraic errors in finding the second
      quadratic factor. Some students, having found this factor, gave{' '}
      <Katex tex="-2\pm\sqrt2 i" />, <Katex tex="2\pm2i" /> or{' '}
      <Katex tex="2\pm\sqrt{10}i" /> as the solution. Some confusion between solutions and
      factors was evident.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="f(z) \text{ has real coefficients}" />,
    reason: <>The coefficients <Katex tex="1,-4,7,-4,6" /> are all real: the condition the conjugate root theorem needs.</>,
  },
  {
    working: <Katex display tex="z = i \text{ a root} \implies z = -i \text{ a root}" />,
    reason: <>Conjugate root theorem: non-real roots of a polynomial with real coefficients come in conjugate pairs.</>,
  },
  {
    working: <Katex display tex="(z-i)(z+i) = z^2-i^2 = z^2+1" />,
    reason: <>Each root <Katex tex="z=a" /> gives a factor <Katex tex="z-a" />. Since <Katex tex="i^2=-1" />, <Katex tex="-i^2=+1" />.</>,
    more: <>The report notes some students gave <Katex tex="z^2-1" />: that comes from treating <Katex tex="i^2" /> as <Katex tex="+1" />, and <Katex tex="z^2-1=(z-1)(z+1)" /> has roots <Katex tex="\pm1" /> (the report's other slip, <Katex tex="z=\pm1" />), not <Katex tex="\pm i" />. Quick check: <Katex tex="z^2+1=0 \iff z^2=-1 \iff z=\pm i" /> ✓.</>,
  },
  {
    working: <Katex display tex="\boxed{z^2+1}" />,
    reason: <>The question asks for a <em>factor</em> (an expression), not the roots — and nothing more.</>,
    more: <>The report describes two opposite slips here. Some students stopped at the conjugate root <Katex tex="-i" /> (or wrote <Katex tex="z=\pm i" />), which are solutions, not a factor; or gave only the linear factor <Katex tex="z+i" />. The question asks for a quadratic factor, so multiply the two linear factors. Others went on to find the second quadratic factor, which is part b's job and earns nothing extra in part a. "Write down" signals a short answer: one line of reasoning and the factor.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="z^4-4z^3+7z^2-4z+6 = \left(z^2+1\right)\left(z^2+bz+c\right)" />,
    reason: <>Part a's factor times the given form of the other factor. Expanding and equating coefficients finds <Katex tex="b" /> and <Katex tex="c" />.</>,
    more: <>Polynomial long division of <Katex tex="f(z)" /> by <Katex tex="z^2+1" /> also works, but the question hands you the form <Katex tex="z^2+bz+c" />, so equating coefficients is shorter and has fewer places for the sign errors the report mentions.</>,
  },
  {
    working: <Katex display tex="= z^4+bz^3+(c+1)z^2+bz+c" />,
    reason: <>Expanding the right-hand side: <Katex tex="z^2(z^2+bz+c)+1(z^2+bz+c)" />, then collecting like terms.</>,
  },
  {
    working: <Katex display tex="b = -4, \qquad c = 6" />,
    reason: <>Matching the <Katex tex="z^3" /> coefficients gives <Katex tex="b=-4" />; matching the constants gives <Katex tex="c=6" />. The <Katex tex="z^2" /> and <Katex tex="z" /> terms must also agree.</>,
    more: <>Those two leftover coefficients are a check: the <Katex tex="z^2" /> term needs <Katex tex="c+1=7" /> ✓ and the <Katex tex="z" /> term needs <Katex tex="b=-4" /> ✓. If either check fails, there is an expansion or sign error to find before going on. A common slip is <Katex tex="b=+4" />, which leads to the report's wrong answer <Katex tex="-2\pm\sqrt2 i" />.</>,
  },
  {
    working: <Katex display tex="z^2-4z+6 = 0 \implies z = \frac{4\pm\sqrt{16-24}}{2}" />,
    reason: <>The other two solutions are the roots of the second factor. Quadratic formula with <Katex tex="a=1,\ b=-4,\ c=6" />.</>,
    more: <>The discriminant is <Katex tex="(-4)^2-4(1)(6)=16-24=-8" />. Writing <Katex tex="16+24" /> instead gives <Katex tex="\sqrt{-40}/2=\sqrt{10}\,i" />, the report's wrong answer <Katex tex="2\pm\sqrt{10}i" />. Alternatively, complete the square: <Katex tex="(z-2)^2+2=0" />, so <Katex tex="z-2=\pm\sqrt2 i" />.</>,
  },
  {
    working: <Katex display tex="= \frac{4\pm\sqrt{-8}}{2} = \frac{4\pm2\sqrt2 i}{2} = 2\pm\sqrt2 i" />,
    reason: <><Katex tex="\sqrt{-8}=\sqrt{8}\,i=2\sqrt2\,i" />, then divide <em>both</em> terms by 2.</>,
    more: <>The report's wrong answer <Katex tex="2\pm2i" /> most likely comes from simplifying <Katex tex="\tfrac{\sqrt8}{2}" /> as <Katex tex="\sqrt4=2" />: dividing under the root needs <Katex tex="\tfrac{\sqrt8}{2}=\sqrt{\tfrac84}=\sqrt2" />. Check by substitution: <Katex tex="(2+\sqrt2 i)^2=2+4\sqrt2 i" />, and <Katex tex="2+4\sqrt2 i-4(2+\sqrt2 i)+6=0" /> ✓.</>,
  },
  {
    working: <Katex display tex="\boxed{z = i,\ -i,\ 2+\sqrt2 i,\ 2-\sqrt2 i}" />,
    reason: <>All four solutions in cartesian form <Katex tex="x+yi" />: two from each quadratic factor.</>,
    more: <>The question asks for <em>solutions</em>, so give the four values of <Katex tex="z" />, not the factorised form — the report notes some confusion between the two. Include <Katex tex="\pm i" /> from part a as well as the two new roots.</>,
  },
]

export default function SpecialistQ3_2014Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (5 marks)</p>
        <p>
          Let <Katex tex="f" /> be a function of a complex variable, defined by the rule{' '}
          <Katex tex="f(z)=z^4-4z^3+7z^2-4z+6" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Conjugate Root"
        marks={2}
        statement={
          <>
            Given that <Katex tex="z=i" /> is a solution of <Katex tex="f(z)=0" />, write down
            a quadratic factor of <Katex tex="f(z)" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Factorise Quartic"
        marks={3}
        statement={
          <>
            Given that the other quadratic factor of <Katex tex="f(z)" /> has the form{' '}
            <Katex tex="z^2+bz+c" />, find all solutions of{' '}
            <Katex tex="z^4-4z^3+7z^2-4z+6=0" /> in cartesian form.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
