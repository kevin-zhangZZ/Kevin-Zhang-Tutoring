// 2023 Specialist Mathematics — Exam 2, Section B Question 2 (10 marks). The seventh roots
// of unity: listing them, plotting them, a ray between two of them, and the identity their
// real parts satisfy. Question text transcribed from the original paper; the Argand diagram
// is our own drawing of the answer. Answers checked with sympy and against the VCAA
// examination report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import argandSrc from './spec-2023e2-q2-argand.png'

const EXAM_A: SAExaminerStats = { marks: [37, 63], average: 0.6 }

const EXAM_B: SAExaminerStats = {
  marks: [39, 61],
  average: 0.6,
  comment: (
    <>
      Most students were able to give at least some of the required solutions. Omitting{' '}
      <Katex tex="z=1" /> was a common error. A range of equivalent polar forms were seen and
      accepted.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [35, 12, 53],
  average: 1.2,
  comment: (
    <>
      The majority of students were aware that the roots of unity are evenly spaced around
      the unit circle. Some students failed to recognise that the sectors shown had angles of{' '}
      <Katex tex="\tfrac\pi7" /> and incorrectly estimated the required locations.
    </>
  ),
}

const EXAM_DI: SAExaminerStats = { marks: [58, 42], average: 0.4 }

const EXAM_DII: SAExaminerStats = {
  marks: [82, 18],
  average: 0.2,
  comment: (
    <>
      While many students correctly identified that <Katex tex="z_0=1" />, finding the correct
      angle was a challenge for most. A common incorrect angle was{' '}
      <Katex tex="\tfrac{5\pi}{14}" />.
    </>
  ),
}

const EXAM_E: SAExaminerStats = {
  marks: [46, 54],
  average: 0.5,
  comment: (
    <>
      Most students expanded the brackets. A significant proportion attempted polynomial long
      division; while some were successful, many did not see the process through.
    </>
  ),
}

const EXAM_FI: SAExaminerStats = {
  marks: [53, 47],
  average: 0.5,
  comment: (
    <>
      Most successful students correctly applied prior work, recognising equivalent
      trigonometric expressions.
    </>
  ),
}

const EXAM_FII: SAExaminerStats = {
  marks: [85, 8, 7],
  average: 0.2,
  comment: (
    <>
      This question was not well done. Many students were able to express the given equation
      in terms of powers of <Katex tex="w" />, but most did not "show that" the required
      result arose through a series of logical steps.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="w^7 = \left[\mathrm{cis}\!\left(\frac{2\pi}{7}\right)\right]^7 = \mathrm{cis}\!\left(\frac{14\pi}{7}\right)" />,
    reason: "De Moivre's theorem: raise the modulus (1) to the power and multiply the argument.",
  },
  {
    working: <Katex display tex="= \mathrm{cis}(2\pi) = \cos(2\pi)+i\sin(2\pi) = 1" />,
    reason: 'A full revolution returns to 1.',
  },
  {
    working: <Katex display tex="\boxed{w^7-1 = 1-1 = 0} \ \checkmark" />,
    reason: 'A verification, so the conclusion line matters as much as the algebra.',
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="z^7 = 1 \implies z = \mathrm{cis}\!\left(\frac{2k\pi}{7}\right), \ k = 0,1,\ldots,6" />,
    reason: 'Seven roots, evenly spaced by 2π/7 around the unit circle.',
  },
  {
    working: <Katex display tex="\boxed{1,\ \mathrm{cis}\!\left(\tfrac{4\pi}{7}\right),\ \mathrm{cis}\!\left(\tfrac{6\pi}{7}\right),\ \mathrm{cis}\!\left(\tfrac{8\pi}{7}\right),\ \mathrm{cis}\!\left(\tfrac{10\pi}{7}\right),\ \mathrm{cis}\!\left(\tfrac{12\pi}{7}\right)}" />,
    reason: <>The six besides <Katex tex="w" /> itself. Leaving out <Katex tex="z=1" />, the <Katex tex="k=0" /> case, was the report's named omission.</>,
  },
  {
    working: <Katex display tex="\text{Equivalently } \mathrm{cis}\!\left(\pm\tfrac{2\pi}{7}\right),\ \mathrm{cis}\!\left(\pm\tfrac{4\pi}{7}\right),\ \mathrm{cis}\!\left(\pm\tfrac{6\pi}{7}\right),\ 1" />,
    reason: <>Using principal arguments in <Katex tex="(-\pi,\pi]" />. Either listing was accepted, and this one makes the conjugate pairing visible — which part f. needs.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="|z| = 1 \text{ for every root} \implies \text{all seven lie on the unit circle}" />,
    reason: 'Each has modulus 1.',
  },
  {
    working: <Katex display tex="\text{Consecutive arguments differ by } \frac{2\pi}{7}" />,
    reason: <>The printed grid divides the plane into sectors of <Katex tex="\tfrac\pi7" />, so each root sits two sector-lines from the next — the detail the report says students missed.</>,
  },
  {
    working: <Katex display tex="\text{Start at } 1 \text{ and step round: } \tfrac{2\pi}{7},\ \tfrac{4\pi}{7},\ \ldots" />,
    reason: 'A regular heptagon inscribed in the unit circle, with one vertex on the positive real axis. Label each point.',
  },
]

const ROWS_DI: WorkingRow[] = [
  {
    working: <Katex display tex="\text{The real root is } z = 1" />,
    reason: <>The only root with zero imaginary part — the others come in conjugate pairs.</>,
  },
  {
    working: <Katex display tex="\text{Ray from } (1,0) \text{ through } \mathrm{cis}\!\left(\tfrac{2\pi}{7}\right)" />,
    reason: 'It starts at 1 (open circle, since z = 1 gives Arg(0), which is undefined) and passes through the next root anticlockwise.',
  },
]

const ROWS_DII: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{Arg}(z-z_0) = \theta \ \text{ describes a ray from } z_0" />,
    reason: <>So <Katex tex="z_0=1" />, the point the ray starts at.</>,
  },
  {
    working: <Katex display tex="\mathrm{cis}\!\left(\frac{2\pi}{7}\right)-1 = \left(\cos\tfrac{2\pi}{7}-1\right)+i\sin\tfrac{2\pi}{7}" />,
    reason: <>The direction of the ray. Note <Katex tex="\cos\tfrac{2\pi}{7}-1<0" /> and the imaginary part is positive, so <Katex tex="\theta" /> is in the second quadrant — already ruling out <Katex tex="\tfrac{5\pi}{14}" />.</>,
  },
  {
    working: <Katex display tex="\text{Geometrically: the chord from } 1 \text{ to } \mathrm{cis}\!\left(\tfrac{2\pi}{7}\right) \text{ subtends } \tfrac{2\pi}{7} \text{ at } O" />,
    reason: 'The triangle formed with the centre is isosceles (both radii are 1).',
  },
  {
    working: <Katex display tex="\text{Base angles} = \frac{\pi-\tfrac{2\pi}{7}}{2} = \frac{5\pi}{14}" />,
    reason: <>So the chord makes an angle of <Katex tex="\tfrac{5\pi}{14}" /> with the radius <Katex tex="O\text{-to-}1" />, i.e. with the positive real direction measured <em>at</em> the point 1 looking back towards O.</>,
  },
  {
    working: <Katex display tex="\theta = \pi-\frac{5\pi}{14} = \frac{9\pi}{14}" />,
    reason: <>Measured from the positive real direction at <Katex tex="z=1" />, the ray points up and to the <em>left</em>. That extra <Katex tex="\pi-\ldots" /> step is exactly what the common wrong answer skips.</>,
  },
  {
    working: <Katex display tex="\boxed{\mathrm{Arg}(z-1) = \frac{9\pi}{14}}" />,
    reason: <>Check numerically: <Katex tex="\mathrm{cis}\!\left(\tfrac{2\pi}{7}\right)-1=-0.377+0.782i" />, whose argument is <Katex tex="2.020=\tfrac{9\pi}{14}" /> ✓.</>,
  },
]

const ROWS_E: WorkingRow[] = [
  {
    working: <Katex display tex="(z-1)\left(z^6+z^5+z^4+z^3+z^2+z+1\right)" />,
    reason: 'Expand — this is faster and more reliable than long division, which the report says many students abandoned part-way.',
  },
  {
    working: <Katex display tex="= \left(z^7+z^6+z^5+z^4+z^3+z^2+z\right)-\left(z^6+z^5+z^4+z^3+z^2+z+1\right)" />,
    reason: <>Multiplying by <Katex tex="z" />, then subtracting the bracket.</>,
  },
  {
    working: <Katex display tex="\boxed{= z^7-1} \ \checkmark" />,
    reason: 'Everything between telescopes away, leaving the two end terms.',
  },
]

const ROWS_FI: WorkingRow[] = [
  {
    working: <Katex display tex="\mathrm{cis}\!\left(\frac{12\pi}{7}\right) = \mathrm{cis}\!\left(\frac{12\pi}{7}-2\pi\right) = \mathrm{cis}\!\left(-\frac{2\pi}{7}\right)" />,
    reason: 'Reduce to a principal argument, and the pairing becomes visible.',
  },
  {
    working: <Katex display tex="\mathrm{cis}(\theta)+\mathrm{cis}(-\theta) = \bigl(\cos\theta+i\sin\theta\bigr)+\bigl(\cos\theta-i\sin\theta\bigr)" />,
    reason: 'Conjugates: the imaginary parts cancel.',
  },
  {
    working: <Katex display tex="\boxed{\mathrm{cis}\!\left(\frac{2\pi}{7}\right)+\mathrm{cis}\!\left(\frac{12\pi}{7}\right) = 2\cos\!\left(\frac{2\pi}{7}\right)}" />,
    reason: <>So <Katex tex="A=2" /> and <Katex tex="B=\tfrac{2\pi}{7}" />, both positive as required.</>,
  },
]

const ROWS_FII: WorkingRow[] = [
  {
    working: <Katex display tex="w \ne 1 \implies w^6+w^5+w^4+w^3+w^2+w+1 = 0" />,
    reason: <>From part e.: since <Katex tex="w^7-1=0" /> and the first factor <Katex tex="w-1\ne0" />, the second factor must vanish.</>,
  },
  {
    working: <Katex display tex="w^k = \mathrm{cis}\!\left(\frac{2k\pi}{7}\right) \ \text{ by De Moivre}" />,
    reason: 'Turning the powers into the six non-real roots.',
  },
  {
    working: <Katex display tex="\mathrm{cis}\!\left(\tfrac{2\pi}{7}\right)+\mathrm{cis}\!\left(\tfrac{4\pi}{7}\right)+\mathrm{cis}\!\left(\tfrac{6\pi}{7}\right)+\mathrm{cis}\!\left(\tfrac{8\pi}{7}\right)+\mathrm{cis}\!\left(\tfrac{10\pi}{7}\right)+\mathrm{cis}\!\left(\tfrac{12\pi}{7}\right)+1 = 0" />,
    reason: 'The seven roots sum to zero — which is the whole content of the identity.',
  },
  {
    working: <Katex display tex="\left[\mathrm{cis}\tfrac{2\pi}{7}+\mathrm{cis}\tfrac{12\pi}{7}\right]+\left[\mathrm{cis}\tfrac{4\pi}{7}+\mathrm{cis}\tfrac{10\pi}{7}\right]+\left[\mathrm{cis}\tfrac{6\pi}{7}+\mathrm{cis}\tfrac{8\pi}{7}\right] = -1" />,
    reason: 'Pairing each root with its conjugate, exactly as in part f.i.',
  },
  {
    working: <Katex display tex="2\cos\!\left(\frac{2\pi}{7}\right)+2\cos\!\left(\frac{4\pi}{7}\right)+2\cos\!\left(\frac{6\pi}{7}\right) = -1" />,
    reason: 'Each bracket collapses by part f.i.',
  },
  {
    working: <Katex display tex="\boxed{\cos\!\left(\frac{2\pi}{7}\right)+\cos\!\left(\frac{4\pi}{7}\right)+\cos\!\left(\frac{6\pi}{7}\right) = -\frac12} \ \checkmark" />,
    reason: <>Dividing by 2. Numerically <Katex tex="0.6235-0.2225-0.9010=-0.5" /> ✓ — but a numerical check is not a proof, and the marks here are for the chain of steps.</>,
  },
]

export default function SpecialistQ2_2023Exam2() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 2 (10 marks)</p>
        <p>
          Let <Katex tex="w=\mathrm{cis}\!\left(\dfrac{2\pi}{7}\right)" />.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-5 sm:p-6">
        <Background>
          <p>
            The <Katex tex="n" />th roots of unity sit at the vertices of a regular{' '}
            <Katex tex="n" />-gon on the unit circle, one of them at <Katex tex="z=1" />. Two
            consequences drive this question: they come in conjugate pairs (except{' '}
            <Katex tex="z=1" />), and they sum to zero — the coefficient of{' '}
            <Katex tex="z^6" /> in <Katex tex="z^7-1" /> is 0.
          </p>
          <p>
            Part f. is those two facts put together: pair each root with its conjugate, each
            pair gives <Katex tex="2\cos" /> of something, and the total must be{' '}
            <Katex tex="-1" /> once the root <Katex tex="z=1" /> is taken across.
          </p>
        </Background>
      </div>

      <PartCard
        letter="a"
        marks={1}
        statement={<>Verify that <Katex tex="w" /> is a root of <Katex tex="z^7-1=0" />.</>}
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={1}
        statement={
          <>
            List the other roots of <Katex tex="z^7-1=0" /> in polar form.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        marks={2}
        statement={
          <>
            On the Argand diagram provided, plot and label the points that represent all the
            roots of <Katex tex="z^7-1=0" />.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
          <img
            src={argandSrc}
            alt="Seven points evenly spaced around the unit circle, one at 1 on the real axis and the others labelled cis(2π/7) through cis(12π/7), with an orange ray leaving the point 1 and passing through cis(2π/7)"
            className="w-full max-w-[440px]"
          />
        </div>
      </PartCard>

      <PartCard
        letter="d.i"
        marks={1}
        statement={
          <>
            On the Argand diagram, sketch the ray that originates at the real root of{' '}
            <Katex tex="z^7-1=0" /> and passes through the point represented by{' '}
            <Katex tex="\mathrm{cis}\!\left(\dfrac{2\pi}{7}\right)" />.
          </>
        }
        examinerReport={EXAM_DI}
      >
        <WorkingTable rows={ROWS_DI} />
      </PartCard>

      <PartCard
        letter="d.ii"
        marks={1}
        statement={
          <>
            Find the equation of this ray in the form{' '}
            <Katex tex="\mathrm{Arg}(z-z_0)=\theta" />, where{' '}
            <Katex tex="z_0\in\mathbb{C}" />, and <Katex tex="\theta" /> is measured in
            radians in terms of <Katex tex="\pi" />.
          </>
        }
        examinerReport={EXAM_DII}
      >
        <WorkingTable rows={ROWS_DII} />
      </PartCard>

      <PartCard
        letter="e"
        marks={1}
        statement={
          <>
            Verify that the equation <Katex tex="z^7-1=0" /> can be expressed in the form{' '}
            <Katex tex="(z-1)\left(z^6+z^5+z^4+z^3+z^2+z+1\right)=0" />.
          </>
        }
        examinerReport={EXAM_E}
      >
        <WorkingTable rows={ROWS_E} />
      </PartCard>

      <PartCard
        letter="f.i"
        marks={1}
        statement={
          <>
            Express{' '}
            <Katex tex="\mathrm{cis}\!\left(\dfrac{2\pi}{7}\right)+\mathrm{cis}\!\left(\dfrac{12\pi}{7}\right)" />{' '}
            in the form <Katex tex="A\cos(B)" />, where{' '}
            <Katex tex="A,B\in\mathbb{R}^+" />.
          </>
        }
        examinerReport={EXAM_FI}
      >
        <WorkingTable rows={ROWS_FI} />
      </PartCard>

      <PartCard
        letter="f.ii"
        marks={2}
        statement={
          <>
            Given that <Katex tex="w=\mathrm{cis}\!\left(\dfrac{2\pi}{7}\right)" /> satisfies{' '}
            <Katex tex="(z-1)\left(z^6+z^5+z^4+z^3+z^2+z+1\right)=0" />, use De Moivre's
            theorem to show that{' '}
            <Katex tex="\cos\!\left(\dfrac{2\pi}{7}\right)+\cos\!\left(\dfrac{4\pi}{7}\right)+\cos\!\left(\dfrac{6\pi}{7}\right)=-\dfrac12" />
            .
          </>
        }
        examinerReport={EXAM_FII}
      >
        <WorkingTable rows={ROWS_FII} />
      </PartCard>
    </div>
  )
}
