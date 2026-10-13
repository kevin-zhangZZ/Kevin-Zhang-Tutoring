// 2015 Specialist Mathematics — Exam 1, Question 3 (4 marks). Antidifferentiating a velocity
// vector with a given initial position, then the distance from the origin at t = 2. Question
// text transcribed from the original paper (no diagram given). Answer checked with sympy and
// against the VCAA examination report. Solution is original. This question has no lettered
// parts, so it uses the plain card layout rather than PartCard.

import Katex from '../../../components/Katex'
import { Background, WorkingTable, SAExaminerReport, type WorkingRow, type SAExaminerStats } from '../QuestionParts'

const EXAM: SAExaminerStats = {
  marks: [5, 5, 23, 14, 53],
  average: 3.1,
  comment: (
    <>
      Most students handled this question very well. Common errors included finding an
      incorrect antiderivative vector, forgetting to include a constant (vector) of
      integration, finding the incorrect constant of integration, or a sign error in
      consolidating the vector answer. A large proportion of these errors were caused by
      incorrect use (or lack) of brackets. Some students added <Katex tex="5t" /> to 2 and got{' '}
      <Katex tex="7t" />. Several students left the displacement vector as the answer, and
      many made arithmetic errors in calculating the modulus of the vector. Some assumed that the distance from the origin was given by the modulus of{' '}
      <Katex tex="\underset{\sim}{r}(2)-\underset{\sim}{r}(0)" />. Some were unable to
      recognise that <Katex tex="\sqrt{169}=13" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\dot{\underset{\sim}{r}}(t) = (4t-3)\underset{\sim}{i}+2t\,\underset{\sim}{j}-5\underset{\sim}{k}" />,
    reason: <>Velocity is the derivative of position, so antidifferentiate each component of the given velocity to get position.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{r}(t) = (2t^2-3t)\underset{\sim}{i}+t^2\underset{\sim}{j}-5t\,\underset{\sim}{k}+\underset{\sim}{c}" />,
    reason: <>Antidifferentiate: <Katex tex="4t-3\to 2t^2-3t" />, <Katex tex="2t\to t^2" />, <Katex tex="-5\to -5t" />. The constant of integration is a <em>vector</em> <Katex tex="\underset{\sim}{c}" />.</>,
    more: <>Each component has its own constant, so <Katex tex="\underset{\sim}{c}=c_1\underset{\sim}{i}+c_2\underset{\sim}{j}+c_3\underset{\sim}{k}" /> — three unknowns, all found at once from the one given vector <Katex tex="\underset{\sim}{r}(0)" />. The report lists forgetting this constant, or finding it wrongly, among the common errors; without it the position at <Katex tex="t=0" /> would be <Katex tex="\underset{\sim}{0}" />, contradicting the given <Katex tex="\underset{\sim}{r}(0)" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{r}(0) = \underset{\sim}{c} = \underset{\sim}{i}-2\underset{\sim}{k}" />,
    reason: <>At <Katex tex="t=0" /> every term with a <Katex tex="t" /> vanishes, so the constant is the given initial position outright.</>,
    more: <>That shortcut works only because every antiderivative here is zero at <Katex tex="t=0" />. If one were not (say a <Katex tex="\cos t" /> term, worth 1 at <Katex tex="t=0" />), you would substitute <Katex tex="t=0" /> in full and solve for <Katex tex="\underset{\sim}{c}" />.</>,
  },
  {
    working: <Katex display tex="\underset{\sim}{r}(t) = (2t^2-3t+1)\underset{\sim}{i}+t^2\underset{\sim}{j}+(-5t-2)\underset{\sim}{k}" />,
    reason: <>Add <Katex tex="\underset{\sim}{c}" /> component by component, bracketing each: the <Katex tex="\underset{\sim}{k}" />-component is <Katex tex="(-5t-2)" />, unlike terms that don't combine.</>,
    more: <>The report blames a large proportion of errors on brackets: some students added <Katex tex="5t" /> to 2 and got <Katex tex="7t" />, but <Katex tex="5t" /> and 2 are unlike terms and cannot be combined. Check the result: at <Katex tex="t=0" /> it gives <Katex tex="\underset{\sim}{i}-2\underset{\sim}{k}" />, and differentiating it gives back the velocity.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\underset{\sim}{r}(2) &= (8-6+1)\underset{\sim}{i}+4\underset{\sim}{j}+(-10-2)\underset{\sim}{k} \\ &= 3\underset{\sim}{i}+4\underset{\sim}{j}-12\underset{\sim}{k}\end{aligned}" />,
    reason: <>Substituting <Katex tex="t=2" /> into each component.</>,
  },
  {
    working: <Katex display tex="\begin{aligned}\bigl|\underset{\sim}{r}(2)\bigr| &= \sqrt{3^2+4^2+(-12)^2} \\ &= \sqrt{9+16+144}\end{aligned}" />,
    reason: <>A position vector is measured from the origin, so the distance from the origin is its magnitude <Katex tex="|\underset{\sim}{r}(2)|" />.</>,
    more: <>The question asks for a distance — a number — so leaving the vector <Katex tex="3\underset{\sim}{i}+4\underset{\sim}{j}-12\underset{\sim}{k}" /> as the answer (as several students did) is incomplete. Some students found <Katex tex="|\underset{\sim}{r}(2)-\underset{\sim}{r}(0)|=|2\underset{\sim}{i}+4\underset{\sim}{j}-10\underset{\sim}{k}|=2\sqrt{30}" />; that is how far the particle is from its <em>starting point</em>, not from the origin. The report also notes many arithmetic errors in the modulus: square each component with its sign, so <Katex tex="(-12)^2=+144" />, and never add the components before squaring.</>,
  },
  {
    working: <Katex display tex="\boxed{\sqrt{169} = 13\ \text{metres}}" />,
    reason: <><Katex tex="9+16+144=169=13^2" />, so the surd comes out whole.</>,
    more: <>The report notes some students did not recognise <Katex tex="\sqrt{169}=13" />. Knowing squares up to <Katex tex="20^2" /> pays off on the technology-free exam, where answers like this are designed to simplify.</>,
  },
]

export default function SpecialistQ3_2015Exam1() {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
      <Background title="Question 3 (4 marks)" always>
        <p>
          The velocity of a particle at time <Katex tex="t" /> seconds is given by{' '}
          <Katex tex="\dot{\underset{\sim}{r}}(t)=(4t-3)\underset{\sim}{i}+2t\,\underset{\sim}{j}-5\underset{\sim}{k}" />
          , where components are measured in metres per second.
        </p>
        <p>
          Find the distance of the particle from the origin in metres when{' '}
          <Katex tex="t=2" />, given that{' '}
          <Katex tex="\underset{\sim}{r}(0)=\underset{\sim}{i}-2\underset{\sim}{k}" />.
        </p>
      </Background>
      <Background>
        <p>
          The plan: antidifferentiate the velocity to get position, use the given initial
          position to find the constant of integration, substitute <Katex tex="t=2" />, then take
          the magnitude of that position vector.
        </p>
      </Background>
      <WorkingTable rows={ROWS} />
      <SAExaminerReport stats={EXAM} maxMarks={4} />
      <div>
        <p className="text-[11px] font-bold tracking-wider text-gray-500 dark:text-gray-400 mb-2.5">Video Walkthrough</p>
        <p className="text-[13px] text-gray-500 dark:text-gray-400 italic">Coming soon.</p>
      </div>
    </div>
  )
}
