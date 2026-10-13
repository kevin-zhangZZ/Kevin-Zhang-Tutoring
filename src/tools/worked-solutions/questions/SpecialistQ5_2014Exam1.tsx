// 2014 Specialist Mathematics — Exam 1, Question 5 (5 marks). A double-angle simplification,
// then the same integral by substitution. Question text transcribed from the original paper
// (no diagram given). Answers checked with sympy and against the VCAA examination report.
// Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [19, 81],
  average: 0.8,
  comment: (
    <>
      This question was answered well, with most students understanding that a double-angle
      formula was required. Some applied the double-angle formula incorrectly. Common
      incorrect answers were{' '}
      <Katex tex="16" />, <Katex tex="96" /> and <Katex tex="192" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [20, 11, 22, 48],
  average: 2,
  comment: (
    <>
      This question was answered reasonably well, but the result from Question 5a. was often
      not used. There were many errors in notation, with <Katex tex="dx" /> and{' '}
      <Katex tex="du" /> often missing. When performing the required substitution, several
      students used <Katex tex="u=\sin(6x)" />, <Katex tex="u=\sin(3x)" />,{' '}
      <Katex tex="u=\cos(3x)" /> or <Katex tex="u=\cos^2(6x)" /> rather than{' '}
      <Katex tex="u=\cos(6x)" />. These attempts led to a more complicated solution and were
      rarely successful. Many who used <Katex tex="u=\cos(6x)" /> then stated{' '}
      <Katex tex="\tfrac{du}{dx}=-\sin(6x)" />, <Katex tex="6\sin(6x)" /> and sometimes{' '}
      <Katex tex="-6\sin(x)" /> or hybrids of these. Others failed to change the terminals.
      Many students made simplification errors and errors in exact values for circular
      functions.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [55, 45],
  average: 0.5,
  comment: (
    <>
      This question was answered well by students who completed Question 5b. successfully.
      There were some instances of poor arithmetic. Some students correctly obtained{' '}
      <Katex tex="\sqrt3" /> but then stated <Katex tex="k=\sqrt3" />. Typical errors included
      substituting the terminals in the incorrect order or being unable to correctly evaluate{' '}
      <Katex tex="\left(\tfrac{\sqrt3}{2}\right)^3" />.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\sin(2\theta) = 2\sin(\theta)\cos(\theta)" />,
    reason: <>The double-angle formula, with <Katex tex="\theta=3x" /> so that <Katex tex="2\theta=6x" />.</>,
  },
  {
    working: <Katex display tex="\sin(6x) = 2\sin(3x)\cos(3x)" />,
    reason: <>Divide both sides by 2: <Katex tex="\sin(3x)\cos(3x)=\tfrac12\sin(6x)" />.</>,
  },
  {
    working: <Katex display tex="96\cos(3x)\sin(3x) = 96\times\tfrac12\sin(6x) = 48\sin(6x)" />,
    reason: <>Replace the product <Katex tex="\sin(3x)\cos(3x)" /> by <Katex tex="\tfrac12\sin(6x)" />: the coefficient halves.</>,
    more: (
      <>
        The report's common wrong answers each come from mishandling the factor of 2: 192 doubles
        96 instead of halving it, and 96 ignores the factor altogether. Check by
        substituting a value, e.g. <Katex tex="x=\tfrac{\pi}{12}" />: then{' '}
        <Katex tex="96\cos\tfrac\pi4\sin\tfrac\pi4=96\times\tfrac12=48" /> and{' '}
        <Katex tex="a\sin\tfrac\pi2=a" />, so <Katex tex="a=48" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{a = 48}" />,
    reason: <>Matching <Katex tex="48\sin(6x)" /> with <Katex tex="a\sin(6x)" />.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="I = \int_{\pi/36}^{\pi/12}48\sin(6x)\cos^2(6x)\,dx" />,
    reason: <>Use part a. first: <Katex tex="96\cos(3x)\sin(3x)=48\sin(6x)" />, so every function in the integrand is now of <Katex tex="6x" />.</>,
    more: (
      <>
        The report notes the result from part a. was often not used. Left as{' '}
        <Katex tex="\cos(3x)\sin(3x)\cos^2(6x)" />, the integrand mixes angles <Katex tex="3x" /> and{' '}
        <Katex tex="6x" />, and no single substitution turns it into a function of <Katex tex="u" /> only.
      </>
    ),
  },
  {
    working: <Katex display tex="u = \cos(6x) \implies \frac{du}{dx} = -6\sin(6x)" />,
    reason: <>Let <Katex tex="u" /> be the function being squared, since its derivative is the other factor, <Katex tex="\sin(6x)" />, up to a constant.</>,
    more: (
      <>
        The chain rule gives both the minus sign (the derivative of <Katex tex="\cos" /> is{' '}
        <Katex tex="-\sin" />) and the factor 6 (the derivative of <Katex tex="6x" />). The report lists{' '}
        <Katex tex="-\sin(6x)" />, <Katex tex="6\sin(6x)" /> and <Katex tex="-6\sin(x)" /> as wrong
        derivatives: each drops one of these pieces or loses the <Katex tex="6x" /> inside. The other
        substitutions the report mentions fail for a reason you can see in advance: with{' '}
        <Katex tex="u=\sin(6x)" />, <Katex tex="du" /> absorbs one <Katex tex="\cos(6x)" /> and leaves{' '}
        <Katex tex="u\cos(6x)=u\sqrt{1-u^2}" /> (valid only because <Katex tex="\cos(6x)\ge0" /> here), which
        needs a second substitution, so it is not in terms of <Katex tex="u" /> in one clean step; with{' '}
        <Katex tex="u=\cos^2(6x)" />, <Katex tex="du" /> brings in <Katex tex="\sin(6x)\cos(6x)" />, leaving
        a stray <Katex tex="\cos(6x)=\sqrt u" />; and <Katex tex="u=\sin(3x)" /> or{' '}
        <Katex tex="u=\cos(3x)" /> would first need <Katex tex="\cos^2(6x)" /> rewritten in terms of{' '}
        <Katex tex="3x" />, a long detour.
      </>
    ),
  },
  {
    working: <Katex display tex="\sin(6x)\,dx = -\tfrac16\,du" />,
    reason: <>Rearranging the differential so <Katex tex="\sin(6x)\,dx" /> can be swapped out in one go.</>,
    more: <>The report notes many notation errors, with <Katex tex="dx" /> and <Katex tex="du" /> often missing. Writing the integral without its <Katex tex="du" /> is incomplete, so keep the differential on every line.</>,
  },
  {
    working: <Katex display tex="x = \tfrac{\pi}{36} \implies u = \cos\!\left(\tfrac\pi6\right) = \tfrac{\sqrt3}{2}" />,
    reason: <>The terminals must change too, since the new integral is in <Katex tex="u" /> only. Here <Katex tex="6\times\tfrac{\pi}{36}=\tfrac\pi6" />.</>,
    more: <>The report notes that others failed to change the terminals. Keeping <Katex tex="\tfrac{\pi}{36}" /> and <Katex tex="\tfrac{\pi}{12}" /> with a <Katex tex="du" /> integral gives a different (wrong) number.</>,
  },
  {
    working: <Katex display tex="x = \tfrac{\pi}{12} \implies u = \cos\!\left(\tfrac\pi2\right) = 0" />,
    reason: <>Here <Katex tex="6\times\tfrac{\pi}{12}=\tfrac\pi2" />. The upper terminal becomes the <em>smaller</em> number, which is fine.</>,
  },
  {
    working: <Katex display tex="I = \int_{\sqrt3/2}^{0}48\,u^2\left(-\tfrac16\right)du" />,
    reason: <>Substitute: <Katex tex="\cos^2(6x)" /> becomes <Katex tex="u^2" />, <Katex tex="\sin(6x)\,dx" /> becomes <Katex tex="-\tfrac16\,du" />, and the <Katex tex="x" />-terminals become the <Katex tex="u" />-terminals.</>,
  },
  {
    working: <Katex display tex="\boxed{I = -8\int_{\sqrt3/2}^{0}u^2\,du \ \left(= 8\int_0^{\sqrt3/2}u^2\,du\right)}" />,
    reason: <>Multiply the constants: <Katex tex="48\times\left(-\tfrac16\right)=-8" />. Swapping the terminals absorbs the minus sign, giving the tidier form; either form answers the question.</>,
    more: <>Swapping terminals uses <Katex tex="\int_a^b f(u)\,du=-\int_b^a f(u)\,du" />. The report's answer gives both forms.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="I = 8\int_0^{\sqrt3/2}u^2\,du = 8\left[\frac{u^3}{3}\right]_0^{\sqrt3/2}" />,
    reason: <>Using the tidied form from part b. — this is what "hence" asks for.</>,
    more: <>The report notes students substituting the terminals in the incorrect order. The rule is always (upper) minus (lower) as written on the integral sign. With the tidied form the lower terminal is 0, so there is only one term to worry about; with the untidied form, <Katex tex="-8\left[\tfrac{u^3}{3}\right]_{\sqrt3/2}^{0}=-8\left(0-\tfrac{\sqrt3}{8}\right)" />, which gives the same answer.</>,
  },
  {
    working: <Katex display tex="\left(\tfrac{\sqrt3}{2}\right)^3 = \frac{3\sqrt3}{8}" />,
    reason: <>Cubing: <Katex tex="\left(\sqrt3\right)^3=\sqrt3\times\sqrt3\times\sqrt3=3\sqrt3" /> and <Katex tex="2^3=8" />.</>,
  },
  {
    working: <Katex display tex="I = \frac83\times\frac{3\sqrt3}{8} - 0 = \sqrt3" />,
    reason: <>The lower terminal contributes 0, and the 8s and 3s cancel.</>,
  },
  {
    working: <Katex display tex="\boxed{\sqrt3, \text{ so } k = 3}" />,
    reason: <>The answer is <Katex tex="\sqrt3" />, which is in the required form <Katex tex="\sqrt k" /> with integer <Katex tex="k=3" />.</>,
    more: <>The report notes some students correctly obtained <Katex tex="\sqrt3" /> but then stated <Katex tex="k=\sqrt3" />. That fails the condition <Katex tex="k\in Z" />: <Katex tex="k" /> is the number under the square root, not the answer itself.</>,
  },
]

export default function SpecialistQ5_2014Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white">Question 5 (5 marks)</p>
      </div>

      <PartCard
        letter="a"
        topic="Double Angle"
        marks={1}
        statement={
          <>
            For the function with rule <Katex tex="f(x)=96\cos(3x)\sin(3x)" />, find the value
            of <Katex tex="a" /> such that <Katex tex="f(x)=a\sin(6x)" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <Background>
          <p>
            Part a. is not a warm-up — it is what turns the integrand of parts b. and c. into
            something a single substitution can handle.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Substitution"
        marks={3}
        statement={
          <>
            Use an appropriate substitution in the form <Katex tex="u=g(x)" /> to find an
            equivalent definite integral for{' '}
            <Katex tex="\displaystyle\int_{\pi/36}^{\pi/12}96\cos(3x)\sin(3x)\cos^2(6x)\,dx" />{' '}
            in terms of <Katex tex="u" /> only.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Definite Integral"
        marks={1}
        statement={
          <>
            <b>Hence</b> evaluate{' '}
            <Katex tex="\displaystyle\int_{\pi/36}^{\pi/12}96\cos(3x)\sin(3x)\cos^2(6x)\,dx" />
            , giving your answer in the form <Katex tex="\sqrt k" />,{' '}
            <Katex tex="k\in Z" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
