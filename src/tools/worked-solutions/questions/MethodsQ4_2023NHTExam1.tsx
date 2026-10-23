// 2023 Mathematical Methods NHT — Exam 1, Question 4 (4 marks). The NHT report gives sample
// answers only, with no statistics or comments. g(x) = 2^(2x) − 9 × 2^x + 20: evaluating
// g(log₂(3)) with index and log laws, then solving g(x) = 0 as a quadratic in 2^x. Question text
// transcribed from the original paper. Answers checked with sympy and against the report's
// sample answers (2; x = 2 or x = log₂(5)). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow } from '../QuestionParts'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="g\left(\log_2(3)\right)=2^{2\log_2(3)}-9\times2^{\log_2(3)}+20" />,
    reason: <>Substitute <Katex tex="x=\log_2(3)" /> everywhere <Katex tex="x" /> appears.</>,
  },
  {
    working: <Katex display tex="2^{\log_2(3)}=3" />,
    reason: <><Katex tex="\log_2(3)" /> is, by definition, the power you raise 2 to in order to get 3. So raising 2 to that power gives 3.</>,
  },
  {
    working: <Katex display tex="2^{2\log_2(3)}=2^{\log_2(3^2)}=2^{\log_2(9)}=9" />,
    reason: <>Move the 2 inside the log first (<Katex tex="k\log_2(a)=\log_2(a^k)" />), then use the same idea.</>,
    more: <>Or with index laws: <Katex tex="2^{2\log_2(3)}=\left(2^{\log_2(3)}\right)^2=3^2=9" />. Either way, <Katex tex="2^{2x}" /> is <Katex tex="\left(2^x\right)^2" />, which is the structure part b. uses too.</>,
  },
  {
    working: <Katex display tex="=9-9\times3+20=9-27+20" />,
  },
  {
    working: <Katex display tex="\boxed{g\left(\log_2(3)\right)=2}" />,
    reason: <>An integer, as the question asks.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\left(2^x\right)^2-9\times2^x+20=0" />,
    reason: <><Katex tex="2^{2x}=\left(2^x\right)^2" />, so this is a quadratic in <Katex tex="2^x" />.</>,
  },
  {
    working: <Katex display tex="\text{Let } A=2^x:\quad A^2-9A+20=0" />,
    reason: <>A substitution makes the quadratic easy to see.</>,
  },
  {
    working: <Katex display tex="(A-5)(A-4)=0\implies A=5\ \text{or}\ A=4" />,
    reason: <>Two numbers that multiply to 20 and add to <Katex tex="-9" />: <Katex tex="-5" /> and <Katex tex="-4" />.</>,
  },
  {
    working: <Katex display tex="2^x=5\ \text{or}\ 2^x=4" />,
    reason: <>Substitute back. Both values are positive, so both are possible (<Katex tex="2^x>0" /> for every <Katex tex="x" />); neither has to be rejected.</>,
  },
  {
    working: <Katex display tex="\boxed{x=2\ \text{or}\ x=\log_2(5)}" />,
    reason: <><Katex tex="4=2^2" /> gives <Katex tex="x=2" />. <Katex tex="5" /> is not a whole power of 2, so take <Katex tex="\log_2" /> of both sides: <Katex tex="x=\log_2(5)" />.</>,
    more: <>Check <Katex tex="x=2" />: <Katex tex="16-36+20=0" /> ✓. And <Katex tex="\log_2(5)\approx2.32" /> sits just above 2, since 5 is just above 4. Part a. fits the picture: <Katex tex="\log_2(3)\approx1.58" /> is left of both roots, where the upward quadratic in <Katex tex="2^x" /> is positive, and indeed <Katex tex="g=2>0" />.</>,
  },
]

export default function MethodsQ4_2023NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 4 (4 marks)</p>
        <p>
          Let <Katex tex="g(x)=2^{2x}-9\times2^x+20" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Log Laws"
        marks={2}
        statement={
          <>
            Evaluate <Katex tex="g\left(\log_2(3)\right)" />, giving your answer as an integer.
          </>
        }
      >
        <Background>
          <p>
            Exponentials and logs to the same base undo each other: <Katex tex="2^{\log_2(a)}=a" /> for any{' '}
            <Katex tex="a>0" />. That is just the definition of <Katex tex="\log_2" />, and it is what turns these powers into
            whole numbers.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <WrongMethod
          title="Pull the 2 in the exponent outside"
          working={<Katex display tex="2^{2\log_2(3)}=2\times2^{\log_2(3)}=6" />}
        >
          A multiplier in the exponent is not a multiplier of the power: <Katex tex="2^{2k}=\left(2^k\right)^2" />, not{' '}
          <Katex tex="2\times2^k" />. This slip gives <Katex tex="6-27+20=-1" /> instead of 2.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Exponential Equations"
        marks={2}
        statement={
          <>
            Solve <Katex tex="g(x)=0" /> for <Katex tex="x" />.
          </>
        }
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
