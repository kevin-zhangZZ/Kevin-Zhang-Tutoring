// 2016 Specialist Mathematics — Exam 1, Question 8 (6 marks). Speed from a position
// vector, then the maximum magnitude of the net force. The only mechanics is the single
// substitution force = mass × acceleration; everything else is vector calculus, and the
// skip guide does not list this question. Question text transcribed from the original
// paper (no diagram given). Answers checked with sympy and against the VCAA examination
// report. Solution is original.
// Interactives (qualifying parts only): c (26% full marks) — acceleration-vector ellipse, showing
// the longest arrow is 12 and that sin(2t) = cos(2t) = 1 is not a point on the path. a and b do
// not qualify (66% full marks each).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const AccelEllipse = lazyWidget(() => import('../interactives/spec-2016e1-q8c-accel-ellipse'))

const EXAM_A: SAExaminerStats = {
  marks: [9, 25, 66],
  average: 1.6,
  comment: (
    <>
      Most students answered this question very well. There were errors seen in the
      derivative, usually involving sign but sometimes mixing up sin and cos. Occasionally
      the <Katex tex="\underset{\sim}{i}" /> and <Katex tex="\underset{\sim}{j}" /> were left
      out at this stage. The most frequent error was not attempting to find the modulus. A
      small number of students removed the <Katex tex="\underset{\sim}{i}" /> and{' '}
      <Katex tex="\underset{\sim}{j}" /> in an attempt to convert from velocity and speed. A
      few correctly found an expression for the speed but then made errors in trying to
      simplify it.
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
      A broad spread of levels of achievement was seen for this question. Most students were
      able to make an attempt but the majority encountered some difficulty. The most common
      errors involved sign errors in the derivative, using velocity rather than acceleration
      or making errors in differentiation when attempting to find a maximum. Several students
      found the correct expression for either acceleration or force but were then unable to
      progress. Some chose a value for <Katex tex="t" />, while others used{' '}
      <Katex tex="\sin(2t)=1" /> and <Katex tex="\cos(2t)=1" /> simultaneously to find the
      maximum force. A small number of students attempted to use an ellipse to solve this
      question but most were unsuccessful. Some substituted{' '}
      <Katex tex="t=\tfrac{\pi}{12}" />. A few made the incorrect assumption that to find the
      maximum value for acceleration, one or both of the components of acceleration must
      equate to zero.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{r}(t) = \bigl(3\sin(2t)-2\bigr)\underset{\sim}{i}+\bigl(3-2\cos(2t)\bigr)\underset{\sim}{j}" />,
    reason: <>Velocity is the derivative of position, so differentiate each component separately.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{v}(t) = 6\cos(2t)\,\underset{\sim}{i}+4\sin(2t)\,\underset{\sim}{j}" />,
    reason: <>Chain rule: the inner <Katex tex="2t" /> gives a factor of <Katex tex="2" />, and the constants <Katex tex="-2" /> and <Katex tex="3" /> differentiate to zero.</>,
    more: (
      <>
        Watch the sign on the <Katex tex="\underset{\sim}{j}" /> component:{' '}
        <Katex tex="\tfrac{d}{dt}\bigl(-2\cos(2t)\bigr) = -2\times\bigl(-2\sin(2t)\bigr) = +4\sin(2t)" />. Two minus
        signs cancel. The report says the derivative errors usually involved sign, and sometimes
        mixing up sin and cos (<Katex tex="\sin" /> differentiates to <Katex tex="\cos" />, and{' '}
        <Katex tex="\cos" /> to <Katex tex="-\sin" />). Keep the{' '}
        <Katex tex="\underset{\sim}{i}" /> and <Katex tex="\underset{\sim}{j}" /> in the velocity:
        it is a vector until you take its magnitude.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\left|\underset{\sim}{v}\right| = \sqrt{36\cos^2(2t)+16\sin^2(2t)}}" />,
    reason: <>Speed is the <em>magnitude</em> of the velocity: the square root of the sum of the squared components.</>,
    more: (
      <>
        The report's most frequent error was not finding the modulus at all, and some students
        removed the <Katex tex="\underset{\sim}{i}" /> and <Katex tex="\underset{\sim}{j}" />.
        Writing, say, <Katex tex="6\cos(2t)+4\sin(2t)" /> is not a length. This answer needs no simplifying. If you do simplify, take care: using{' '}
        <Katex tex="\sin^2=1-\cos^2" /> gives <Katex tex="\sqrt{16+20\cos^2(2t)}" />, which is
        equivalent. You cannot take the square root of each term separately.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="t=\frac{\pi}{12} \implies 2t = \frac{\pi}{6}" />,
    reason: <>The trig functions in part a take <Katex tex="2t" />, so double the time first.</>,
  },
  {
    working: <Katex display tex="\cos\!\left(\frac{\pi}{6}\right) = \frac{\sqrt3}{2}, \qquad \sin\!\left(\frac{\pi}{6}\right) = \frac12" />,
    reason: <>Exact values.</>,
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{v}\right| = \sqrt{36\times\frac34+16\times\frac14} = \sqrt{27+4}" />,
    reason: <>Substitute into the speed from part a, using <Katex tex="\cos^2=\tfrac34" /> and <Katex tex="\sin^2=\tfrac14" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\sqrt{31} \text{ m s}^{-1}}" />,
    reason: <>Add under the root first: <Katex tex="\sqrt{27+4}\ne\sqrt{27}+\sqrt4" />. Speed is a number, not a vector.</>,
    more: (
      <>
        The report's wrong answer <Katex tex="3\sqrt3+2\approx7.20" /> is not the same as the
        correct <Katex tex="\sqrt{31}\approx5.57" />. The report also saw students leave the answer as a
        vector — <Katex tex="3\sqrt3\,\underset{\sim}{i}+2\,\underset{\sim}{j}" /> is the
        velocity, not the speed.
      </>
    ),
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\underset{\sim}{a}(t) = -12\sin(2t)\,\underset{\sim}{i}+8\cos(2t)\,\underset{\sim}{j}" />,
    reason: <>Force needs acceleration, so differentiate the velocity from part a (chain rule again: a factor of <Katex tex="2" />).</>,
    more: (
      <>
        <Katex tex="\tfrac{d}{dt}\bigl(6\cos(2t)\bigr) = -12\sin(2t)" /> and{' '}
        <Katex tex="\tfrac{d}{dt}\bigl(4\sin(2t)\bigr) = 8\cos(2t)" />. The report lists sign
        errors here, and using velocity rather than acceleration, among the most common errors.
        Using velocity instead: <Katex tex="\left|\underset{\sim}{v}\right|=\sqrt{16+20\cos^2(2t)}" /> is
        at most <Katex tex="\sqrt{36}=6" />, giving <Katex tex="3\times6=18" /> N, which is wrong.
      </>
    ),
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{a}\right|^2 = 144\sin^2(2t)+64\cos^2(2t)" />,
    reason: <>Work with the square: <Katex tex="\left|\underset{\sim}{a}\right|" /> is largest exactly when <Katex tex="\left|\underset{\sim}{a}\right|^2" /> is, and there is no square root to handle.</>,
  },
  {
    working: <Katex display tex="= 64+80\sin^2(2t)" />,
    reason: <>Replace <Katex tex="\cos^2(2t)" /> by <Katex tex="1-\sin^2(2t)" />: <Katex tex="64-64\sin^2+144\sin^2" />. Now only one trig function varies.</>,
  },
  {
    working: <Katex display tex="\sin^2(2t)\le1 \implies \left|\underset{\sim}{a}\right|^2 \le 64+80 = 144" />,
    reason: <>The largest value of <Katex tex="\sin^2" /> is <Katex tex="1" />, reached when <Katex tex="\sin(2t)=\pm1" /> (e.g. <Katex tex="t=\tfrac{\pi}{4}" />). No differentiation needed.</>,
    more: (
      <>
        The report notes several traps at this point. Some students chose a value of{' '}
        <Katex tex="t" /> (some used <Katex tex="t=\tfrac{\pi}{12}" /> from part b): that gives
        the force at one instant — here <Katex tex="6\sqrt{21}\approx27.5" /> N — not the
        maximum. Others put <Katex tex="\sin(2t)=1" /> and <Katex tex="\cos(2t)=1" /> at the same
        time, getting <Katex tex="\sqrt{144+64}=\sqrt{208}" />. That is impossible, since{' '}
        <Katex tex="\sin^2+\cos^2=1" />: when <Katex tex="\sin(2t)=\pm1" />,{' '}
        <Katex tex="\cos(2t)=0" />. And a few assumed a component of the acceleration must be zero
        at the maximum. It happens to be true here, but it is not a method: it gives two
        candidates (<Katex tex="\sin(2t)=0" /> gives <Katex tex="\left|\underset{\sim}{a}\right|=8" />,{' '}
        <Katex tex="\cos(2t)=0" /> gives <Katex tex="12" />) with no reason why either is the
        maximum. The single-trig-function form settles it. Differentiating also works but is
        longer: <Katex tex="\tfrac{d}{dt}\left|\underset{\sim}{a}\right|^2=320\sin(2t)\cos(2t)" />{' '}
        is zero when <Katex tex="\sin(2t)=0" /> (<Katex tex="\left|\underset{\sim}{a}\right|=8" />) or{' '}
        <Katex tex="\cos(2t)=0" /> (<Katex tex="\left|\underset{\sim}{a}\right|=12" />), and you
        still have to compare the two.
      </>
    ),
  },
  {
    working: <Katex display tex="\left|\underset{\sim}{a}\right|_{\max} = \sqrt{144} = 12 \text{ m s}^{-2}" />,
    reason: <>Taking the square root.</>,
    more: (
      <>
        A check, and the ellipse idea some students tried: the tip of{' '}
        <Katex tex="\underset{\sim}{a}=x\,\underset{\sim}{i}+y\,\underset{\sim}{j}" /> satisfies{' '}
        <Katex tex="\tfrac{x^2}{144}+\tfrac{y^2}{64}=\sin^2(2t)+\cos^2(2t)=1" />, an ellipse with
        semi-axes <Katex tex="12" /> and <Katex tex="8" />. The point of an ellipse farthest from
        its centre is an end of the longer axis, so the longest acceleration vector has length{' '}
        <Katex tex="12" />. That works, but the algebra above is quicker to justify.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\left|\underset{\sim}{F}\right|_{\max} = m\left|\underset{\sim}{a}\right|_{\max} = 3\times12 = 36 \text{ N}}" />,
    reason: <>Newton's second law: net force equals mass times acceleration, with <Katex tex="m=3" /> kg.</>,
    more: (
      <>
        The report says several students found the correct expression for the
        acceleration or force but could not go further — the step using{' '}
        <Katex tex="\sin^2(2t)\le1" /> is the one to learn.
      </>
    ),
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
        topic="Speed"
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
        topic="Speed"
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
        topic="Maximum Force"
        marks={3}
        statement={<>Find the maximum magnitude of the net force acting on the body in newtons.</>}
        examinerReport={EXAM_C}
      >
        <Background title="Maximising a magnitude without calculus">
          <p>
            &ldquo;Maximum magnitude of the net force&rdquo; means the largest value of{' '}
            <Katex tex="\left|\underset{\sim}{F}\right|=m\left|\underset{\sim}{a}\right|" /> over all
            times <Katex tex="t\ge0" />, so the task is to find the largest{' '}
            <Katex tex="\left|\underset{\sim}{a}\right|" />. It is not the force at any particular time.
          </p>
          <p>
            The two components of <Katex tex="\underset{\sim}{a}" /> are tied together by{' '}
            <Katex tex="\sin^2+\cos^2=1" />, so they cannot both be at their largest at once. The
            clean way to handle that is to write the squared magnitude in terms of one trig
            function, then use <Katex tex="0\le\sin^2\le1" />.
          </p>
          <p>
            The force step is a single substitution rather than any force analysis, so this
            question stays on the current study design, unlike Q1 on this paper.
          </p>
        </Background>
        <WorkingTable rows={ROWS_C} />
        <Explore title="The acceleration vector sweeps out an ellipse: its longest arrow is 12">
          <AccelEllipse />
        </Explore>
      </PartCard>
    </div>
  )
}
