// 2018 Specialist Mathematics — Exam 2, MCQ 15. VCAA examination report: 69% correct.
// A constant force accelerating a particle between two speeds over a given distance.
//
// Newton's second law is off the current study design, but this question needs it only as a
// single substitution, F = ma, after an ordinary constant-acceleration calculation. Guide
// §13.7 — judge the mathematics, not the vocabulary; the skip guide records the same reading
// here as it does for 2019 Exam 2 MCQ 13.
//
// Question text transcribed from the original paper; VCAA printed no diagram and neither
// does the stem here (guide §7). Solution is original; a = 64/5, P = 512/5 = 102.4 checked in
// sympy and agrees with itute. The report makes no comment beyond the percentages. Options
// A, B and D have no slip we could reproduce, so they are not explained.
//
// Interactive (extras): interactives/spec-2018-mcq15-force-slope — the velocity–time graph for
// a chosen force P: the force sets the gradient a = P/8, the distance is the trapezium's area,
// and only P = 102.4 makes that area 15 m. A button tries P = 12.8 (option C).
// WrongMethod: stopping at the acceleration (17% chose C).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const ForceSlope = lazyWidget(() => import('../interactives/spec-2018-mcq15-force-slope'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 3, B: 7, C: 17, D: 4, E: 69 },
  answer: 'E',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="u=4,\ v=20,\ s=15,\ a=\,?" />,
    reason: <>A <em>constant</em> force gives a constant acceleration, so the constant-acceleration formulas apply. List what is known. There is no time, and none is asked for.</>,
  },
  {
    working: <Katex display tex="v^2 = u^2 + 2as" />,
    reason: <>How would I know which formula? It is the one that links the two speeds and the distance without <Katex tex="t" />.</>,
  },
  {
    working: <Katex display tex="20^2 = 4^2 + 2a(15)" />,
    reason: <>Substitute.</>,
  },
  {
    working: <Katex display tex="384 = 30a \implies a = 12.8 \ \text{m s}^{-2}" />,
    reason: <>This is the acceleration, in m s<Katex tex="^{-2}" />. The question asks for a force, in newtons, so it is not finished yet.</>,
  },
  {
    working: <Katex display tex="P = ma = 8 \times 12.8" />,
    reason: <>The force is what produces the acceleration, and the heavier the particle, the more force the same acceleration takes: force equals mass times acceleration. <Katex tex="P" /> is the only force mentioned, so it is the whole of <Katex tex="ma" />.</>,
  },
  {
    working: <Katex display tex="\boxed{P = 102.4}" />,
    reason: <>Matches option <b>E</b>. Option <b>C</b> <Katex tex="(12.8)" />, chosen by <Katex tex="17\%" />, is the acceleration: the answer to a question that was not asked.</>,
  },
]

export default function SpecialistQ15_2018() {
  return (
    <MCQShell
      question={
        <p>
          A constant force of magnitude <Katex tex="P" /> newtons accelerates a particle of
          mass <Katex tex="8" /> kg in a straight line from a speed of <Katex tex="4" /> m
          s<Katex tex="^{-1}" /> to a speed of <Katex tex="20" /> m s<Katex tex="^{-1}" /> over
          a distance of <Katex tex="15" /> m. The magnitude of <Katex tex="P" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="9.8" /> },
        { letter: 'B', content: <Katex tex="12.5" /> },
        { letter: 'C', content: <Katex tex="12.8" /> },
        { letter: 'D', content: <Katex tex="100" /> },
        { letter: 'E', content: <Katex tex="102.4" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="Two steps, and the options punish stopping after one">
          <p>
            Speeds and a distance, with no time mentioned, point straight at{' '}
            <Katex tex="v^2=u^2+2as" />. That gives the acceleration.
          </p>
          <p>
            Where that formula comes from: with constant acceleration the velocity–time graph
            is a straight line, and the distance is the area under it, a trapezium{' '}
            <Katex tex="s=\tfrac12(u+v)t" />. Its time is <Katex tex="t=\tfrac{v-u}{a}" />, so{' '}
            <Katex tex="s=\tfrac{(v+u)(v-u)}{2a}=\tfrac{v^2-u^2}{2a}" />.
          </p>
          <p>
            The question asks for a <em>force</em>, though, so one more step is needed:{' '}
            <Katex tex="P=ma" />. The acceleration itself appears as option C, so finishing
            the second step is the whole difference between the two.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="The force sets the slope of the v–t graph; the distance is the area under it">
            <ForceSlope />
          </Explore>
          <WrongMethod
            title="v² = u² + 2as gives 12.8, so P = 12.8"
            source="17% chose C"
            working={<Katex display tex="20^2=4^2+2a(15)\implies a=12.8" />}
          >
            <p>
              <Katex tex="12.8" /> is the acceleration, in m s<Katex tex="^{-2}" />. A force of{' '}
              <Katex tex="12.8" /> N on an <Katex tex="8" /> kg particle would give only{' '}
              <Katex tex="a=\tfrac{12.8}{8}=1.6" /> m s<Katex tex="^{-2}" />, and it would take{' '}
              <Katex tex="120" /> m to reach <Katex tex="20" /> m s<Katex tex="^{-1}" />, not{' '}
              <Katex tex="15" />.
            </p>
            <p>
              To catch it: before choosing, check the units of what the question asks for.
              Newtons are kg m s<Katex tex="^{-2}" />, so a mass must be multiplied in.
            </p>
          </WrongMethod>
        </>
      }
    />
  )
}
