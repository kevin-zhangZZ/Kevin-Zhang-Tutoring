// 2018 Specialist Mathematics — Exam 2, MCQ 5. VCAA examination report: 41% correct.
// If z + 1/z is real, what must be true of z? A complex-numbers algebra question: the imaginary
// part is b(1 − 1/|z|²), and b ≠ 0 forces |z| = 1. The final row rules the other options out
// with the counterexample z = ½ + (√3/2)i ("must be true" means for every valid z).
// Widget (interactives/spec-2018-mcq5-reciprocal.tsx): drag z; 1/z = z̄/|z|² lies on the ray to z̄
// with length 1/|z|, so the imaginary parts cancel only on the unit circle; chips test A–E for the
// current z. WrongMethods: trusting the single example cis(π/4) (option A, 13%), and z = 1 (option
// E, 15%), which the stem's b ≠ 0 excludes. The report has no comment on this question.
// Question text transcribed from the original paper; solution is original.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const Reciprocal = lazyWidget(() => import('../interactives/spec-2018-mcq5-reciprocal'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 13, B: 16, C: 14, D: 41, E: 15 },
  answer: 'D',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} \frac{1}{z} &= \frac{1}{a+bi} \\ &= \frac{a-bi}{a^2+b^2} \end{aligned}" />,
    reason: (
      <>
        To tell whether something is real, write it as (real part) <Katex tex="+" /> (imaginary part)<Katex tex="\,i" /> and look at
        the imaginary part. <Katex tex="z" /> is already in that form but <Katex tex="\frac1z" /> isn&apos;t, so multiply top and
        bottom by the conjugate <Katex tex="a-bi" />: the denominator becomes <Katex tex="(a+bi)(a-bi) = a^2+b^2" />, a real
        number.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="z+\frac{1}{z} = \left(a+\frac{a}{a^2+b^2}\right)" />
        <Katex display tex="{}+ i\left(b-\frac{b}{a^2+b^2}\right)" />
      </>
    ),
    reason: <>Add the real parts and the imaginary parts separately.</>,
  },
  {
    working: (
      <>
        <Katex display tex="z+\frac1z \in R" />
        <Katex display tex="\implies\; b-\frac{b}{a^2+b^2}=0" />
      </>
    ),
    reason: <>A complex number is real exactly when its imaginary part is zero. The real part can be anything.</>,
  },
  {
    working: <Katex display tex="b\left(1-\frac{1}{a^2+b^2}\right)=0" />,
    reason: <>Take out the common factor <Katex tex="b" />: a product is zero only when one of its factors is.</>,
  },
  {
    working: (
      <>
        <Katex display tex="b\ne 0" />
        <Katex display tex="\implies\; 1-\frac{1}{a^2+b^2}=0" />
        <Katex display tex="\implies\; a^2+b^2=1" />
      </>
    ),
    reason: (
      <>
        The stem says <Katex tex="b\in R\setminus\{0\}" />, so the factor <Katex tex="b" /> can&apos;t be the zero one; the bracket
        must be.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{|z| = \sqrt{a^2+b^2} = 1}" />,
    reason: (
      <>
        Matches option <b>D</b>. &ldquo;Must be true&rdquo; means true for <em>every</em> <Katex tex="z" /> that makes{' '}
        <Katex tex="z+\frac1z" /> real, so one such <Katex tex="z" /> that breaks an option rules it out.{' '}
        <Katex tex="z = \tfrac12 + \tfrac{\sqrt3}{2}i" /> has <Katex tex="|z| = 1" /> and <Katex tex="z + \tfrac1z = 1" />, yet{' '}
        <Katex tex="\operatorname{Arg}(z) = \tfrac{\pi}{3}" /> (not <b>A</b>), <Katex tex="a \ne \pm b" /> (not <b>B</b> or <b>C</b>)
        and <Katex tex="z^2 \ne 1" /> (not <b>E</b>). In fact <b>E</b> never holds here: <Katex tex="z^2 = 1" /> means{' '}
        <Katex tex="z = \pm 1" />, which has <Katex tex="b = 0" />.
      </>
    ),
  },
]

export default function SpecialistQ5_2018() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Let <Katex tex="z=a+bi" />, where <Katex tex="a,b\in R\setminus\{0\}" />.
          </p>
          <p>
            If <Katex tex="z+\dfrac{1}{z}\in R" />, which one of the following must be <b>true</b>?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\operatorname{Arg}(z)=\dfrac{\pi}{4}" /> },
        { letter: 'B', content: <Katex tex="a=-b" /> },
        { letter: 'C', content: <Katex tex="a=b" /> },
        { letter: 'D', content: <Katex tex="|z|=1" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="z^2=1" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="The picture behind 1/z">
          <p>
            Multiplying top and bottom by <Katex tex="\bar z" /> gives <Katex tex="\frac1z = \frac{\bar z}{z\bar z} = \frac{\bar z}{|z|^2}" />.
            So <Katex tex="\frac1z" /> is <Katex tex="\bar z" /> (the mirror image of <Katex tex="z" /> in the real axis) rescaled to
            length <Katex tex="\frac{1}{|z|}" />. Its imaginary part points the opposite way to <Katex tex="z" />&apos;s, but has a
            different size unless <Katex tex="|z| = 1" />.
          </p>
          <p>
            On the unit circle <Katex tex="\frac1z = \bar z" /> exactly, and <Katex tex="z + \bar z = 2a" /> is always real. That is
            the one-line version of this question.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="1/z is the mirror image of z, rescaled: the imaginary parts cancel only when |z| = 1">
            <Reciprocal />
          </Explore>
          <WrongMethod
            title="z = cis(π/4) makes z + 1/z real, so Arg(z) = π/4"
            source="13% chose A"
            working={
              <>
                <Katex display tex="z = \tfrac{1}{\sqrt2} + \tfrac{1}{\sqrt2}i" />
                <Katex display tex="\tfrac1z = \tfrac{1}{\sqrt2} - \tfrac{1}{\sqrt2}i" />
                <Katex display tex="z + \tfrac1z = \sqrt2 \in R" />
                <Katex display tex="\implies \operatorname{Arg}(z) = \tfrac{\pi}{4} \quad \text{(option A)}" />
              </>
            }
          >
            <p>
              The example is valid, but it only shows that A <em>can</em> be true, not that it <em>must</em> be. This same{' '}
              <Katex tex="z" /> also has <Katex tex="a = b" /> (C) and <Katex tex="|z| = 1" /> (D), so a symmetric example like this
              can&apos;t separate the options. To rule one out, find a <Katex tex="z" /> that makes <Katex tex="z+\frac1z" /> real
              but breaks it: <Katex tex="z = \tfrac12 + \tfrac{\sqrt3}{2}i" /> gives <Katex tex="z + \frac1z = 1" /> with{' '}
              <Katex tex="\operatorname{Arg}(z) = \tfrac{\pi}{3}" />.
            </p>
          </WrongMethod>
          <WrongMethod
            title="z = 1 gives z + 1/z = 2, which is real, so z² = 1"
            source="15% chose E"
            working={
              <>
                <Katex display tex="z = 1:\ \ z + \tfrac1z = 2 \in R" />
                <Katex display tex="\implies z^2 = 1 \quad \text{(option E)}" />
              </>
            }
          >
            <p>
              <Katex tex="z = 1" /> has <Katex tex="b = 0" />, and the stem rules that out with <Katex tex="a,b\in R\setminus\{0\}" />.
              In fact <Katex tex="z^2 = 1" /> only for <Katex tex="z = \pm1" />, both with <Katex tex="b = 0" />, so E is never true for
              an allowed <Katex tex="z" />. Check any test value against every condition in the stem before trusting it.
            </p>
          </WrongMethod>
        </>
      }
    />
  )
}
