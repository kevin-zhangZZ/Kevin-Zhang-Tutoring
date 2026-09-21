// 2016 Specialist Mathematics — Exam 1, Question 8 (6 marks). Speed from a position
// vector, then the maximum magnitude of the net force. The only mechanics is the single
// substitution force = mass × acceleration; everything else is vector calculus, and the
// skip guide does not list this question. Question text transcribed from the original
// paper (no diagram given). Answers checked with sympy and against the VCAA examination
// report. Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM_A: SAExaminerStats = {
  marks: [9, 25, 66],
  average: 1.6,
  comment: (
    <>
      Most students answered this question very well. There were errors seen in the
      derivative, usually involving sign but sometimes mixing up sin and cos. The most
      frequent error was not attempting to find the modulus. A small number of students
      removed the <Katex tex="\underset{\sim}{i}" /> and <Katex tex="\underset{\sim}{j}" /> in
      an attempt to convert from velocity to speed.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [34, 66],
  average: 0.7,
  comment: (
    <>
      This question was answered well, with most students who had made a reasonable attempt
      at part a. answering correctly. Typical errors included leaving the answer as a vector
      or simplifying incorrectly to obtain <Katex tex="3\sqrt3+2" /> by taking the square
      root of individual terms.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [22, 31, 21, 26],
  average: 1.5,
  comment: (
    <>
      A broad spread of levels of achievement was seen. The most common errors involved sign
      errors in the derivative, using velocity rather than acceleration, or making errors in
      differentiation when attempting to find a maximum. Others used{' '}
      <Katex tex="\sin(2t)=1" /> and <Katex tex="\cos(2t)=1" /> simultaneously to find the
      maximum force.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{r}(t) = \bigl(3\sin(2t)-2\bigr)\underset{\sim}{i}+\bigl(3-2\cos(2t)\bigr)\underset{\sim}{j}" />,
    reason: <>Differentiate component by component.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{v}(t) = 6\cos(2t)\,\underset{\sim}{i}+4\sin(2t)\,\underset{\sim}{j}" />,
    reason: <>Chain rule on each: the inner <Katex tex="2t" /> contributes a factor of <Katex tex="2" />. The derivative of <Katex tex="-2\cos(2t)" /> is <Katex tex="+4\sin(2t)" /> — two minus signs cancelling, which is the report's usual slip.</>,
  },
  {
    working: <Katex display tex="\boxed{\left|\underset{\sim}{v}\right| = \sqrt{36\cos^2(2t)+16\sin^2(2t)}}" />,
    reason: <>Speed is the <em>magnitude</em> of the velocity. Dropping the <Katex tex="\underset{\sim}{i}" /> and <Katex tex="\underset{\sim}{j}" /> and adding is not the same thing.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="t=\frac{\pi}{12} \implies 2t = \frac{\pi}{6}" />,
    reason: <>Double the time before taking the trig values.</>,
  },
  {
    working: <Katex display tex="\cos\!\left(\frac{\pi}{6}\right) = \frac{\sqrt3}{2}, \qquad \sin\!\left(\frac{\pi}{6}\right) = \frac12" />,
    reason: <>Exact values.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{v}\right| = \sqrt{36\times\frac34+16\times\frac14} = \sqrt{27+4}" />,
    reason: <>Squaring each exact value before multiplying.</>,
  },
  {
    working: <Katex display tex="\boxed{\sqrt{31} \text{ m s}^{-1}}" />,
    reason: <>About <Katex tex="5.57" />. Note <Katex tex="\sqrt{27+4}\ne\sqrt{27}+\sqrt4" /> — the report's <Katex tex="3\sqrt3+2" /> is exactly that error.</>,
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a}(t) = -12\sin(2t)\,\underset{\sim}{i}+8\cos(2t)\,\underset{\sim}{j}" />,
    reason: <>Differentiating the velocity. Using velocity instead of acceleration here is one of the report's flagged errors.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{a}\right|^2 = 144\sin^2(2t)+64\cos^2(2t)" />,
    reason: <>Work with the square — maximising it maximises the magnitude, and avoids differentiating a square root.</>,
  },
  {
    working: <Katex display tex="= 64+80\sin^2(2t)" />,
    reason: <>Using <Katex tex="\cos^2=1-\sin^2" /> reduces it to one trig function. This is what makes the maximum obvious without calculus.</>,
  },
  {
    working: <Katex display tex="\sin^2(2t)\le1 \implies \left|\underset{\sim}{a}\right|^2 \le 144" />,
    reason: <>Attained when <Katex tex="\sin(2t)=\pm1" />, where <Katex tex="\cos(2t)=0" />. Setting both to <Katex tex="1" /> at once — the report's noted mistake — is impossible.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{a}\right|_{\max} = 12 \text{ m s}^{-2}" />,
    reason: <>Taking the square root.</>,
  },
  {
    working: <Katex display tex="\boxed{\left|\underset{\sim}{F}\right|_{\max} = m\left|\underset{\sim}{a}\right|_{\max} = 3\times12 = 36 \text{ N}}" />,
    reason: <>The only mechanics in the whole question is this one substitution. Everything before it is vector calculus.</>,
  },
]

export default function SpecialistQ8_2016Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 8 (6 marks)</p>
        <p>
          The position of a body with mass <Katex tex="3" /> kg from a fixed origin at time{' '}
          <Katex tex="t" /> seconds, <Katex tex="t\ge0" />, is given by{' '}
          <Katex tex="\underset{\sim}{r}=\bigl(3\sin(2t)-2\bigr)\underset{\sim}{i}+\bigl(3-2\cos(2t)\bigr)\underset{\sim}{j}" />
          , where components are in metres.
        </p>
      </div>

      <PartCard
        letter="a"
        marks={2}
        statement={
          <>
            Find an expression for the speed, in metres per second, of the body at time{' '}
            <Katex tex="t" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        marks={1}
        statement={
          <>
            Find the speed of the body, in metres per second, when{' '}
            <Katex tex="t=\tfrac{\pi}{12}" />.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        marks={3}
        statement={<>Find the maximum magnitude of the net force acting on the body in newtons.</>}
        examinerReport={EXAM_C}
      >
        <Background title="Maximising a magnitude without calculus">
          <p>
            <Katex tex="\left|\underset{\sim}{a}\right|" /> is a square root, and
            differentiating it is unpleasant. Maximise{' '}
            <Katex tex="\left|\underset{\sim}{a}\right|^2" /> instead — the square root is
            increasing, so the maximum happens at the same <Katex tex="t" />.
          </p>
          <p>
            Then use <Katex tex="\cos^2=1-\sin^2" /> to reduce it to a single trig function.
            Once it reads <Katex tex="64+80\sin^2(2t)" />, the largest value is visible
            without any differentiation at all.
          </p>
          <p>
            One more thing to note: this question needs{' '}
            <Katex tex="\left|\underset{\sim}{F}\right|=m\left|\underset{\sim}{a}\right|" />,
            which is a single substitution rather than any force analysis — so it stays on
            the current study design, unlike Q1 on this paper.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
      </PartCard>
    </div>
  )
}
