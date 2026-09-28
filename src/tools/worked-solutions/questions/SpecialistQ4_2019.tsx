// 2019 Specialist Mathematics — Exam 2, MCQ 4. VCAA examination report: 44% correct.
// Sum of i to the power of consecutive factorials. Question text transcribed from the
// original paper. Solution is original.
// Extras: interactive (interactives/spec-2019-mcq4-quarter-turns.tsx) — slide n and see i^(n!) as
// n! quarter-turns of 1, landing back on 1 for every n ≥ 4, with the running total; a toggle swaps in
// exponent n (the terms then cycle and 100 terms add to 0). WrongMethod for option A (18%): treating
// the exponents as 1, 2, 3, … so the terms cycle, which gives exactly 0 (sympy). Option B (96) is
// exactly what reading i^(3!) as i³ gives (sympy); D and E have no verified single slip, so they are
// not explained.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const QuarterTurns = lazyWidget(() => import('../interactives/spec-2019-mcq4-quarter-turns'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 18, B: 8, C: 44, D: 17, E: 13 },
  answer: 'C',
  comment: <><Katex tex="n!" /> is a multiple of 4 for <Katex tex="n\geq4,\ n\in N" />.</>,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} &1!=1,\ \ 2!=2,\ \ 3!=6 \\ &n!\text{ divisible by }4\text{ for }n\geq4 \end{aligned}" />,
    reason: (
      <>
        <Katex tex="100!" /> has 158 digits, so nobody works out <Katex tex="i^{100!}" /> directly. What you can use is
        that the powers of <Katex tex="i" /> repeat every 4, so <Katex tex="i^k" /> depends only on the remainder when{' '}
        <Katex tex="k" /> is divided by 4. The job is therefore to find each exponent&apos;s remainder. For{' '}
        <Katex tex="n\geq4" />, <Katex tex="n!=n\times\cdots\times4\times3\times2\times1" /> has <Katex tex="4" /> as one of
        its factors, so the remainder is <Katex tex="0" />.
      </>
    ),
  },
  {
    working: <Katex display tex="i^{1!}=i^1=i" />,
    reason: <>First term: <Katex tex="1!=1" />.</>,
  },
  {
    working: <Katex display tex="i^{2!}=i^2=-1" />,
    reason: <>Second term: <Katex tex="2!=2" />.</>,
  },
  {
    working: <Katex display tex="i^{3!}=i^6=i^4\cdot i^2=-1" />,
    reason: (
      <>
        Third term, and the first trap: the exponent is <Katex tex="3!=6" />, not <Katex tex="3" />. Since{' '}
        <Katex tex="6=4+2" />, split off the <Katex tex="i^4=1" /> and what&apos;s left is <Katex tex="i^2=-1" />.
      </>
    ),
  },
  {
    working: <Katex display tex="i^{n!}=\left(i^4\right)^{n!/4}=1 \text{ for } n=4,5,\dots,100" />,
    reason: (
      <>
        Each of these exponents is a multiple of 4, so each term is a power of <Katex tex="i^4=1" />. Count them
        carefully: <Katex tex="n=4" /> to <Katex tex="100" /> is <Katex tex="100-4+1=97" /> terms, each equal to{' '}
        <Katex tex="1" />. The terms don&apos;t cycle at all after the third.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{i+(-1)+(-1)+97(1) = 95+i}" />,
    reason: (
      <>
        Matches option <b>C</b>. Option <b>A</b>, <Katex tex="0" />, is what <Katex tex="i+i^2+\cdots+i^{100}" /> adds to
        (exponent <Katex tex="n" /> instead of <Katex tex="n!" />, see below), and option <b>B</b>, <Katex tex="96" />, is
        what you get by reading <Katex tex="i^{3!}" /> as <Katex tex="i^3=-i" />: <Katex tex="i-1-i+97=96" />.
      </>
    ),
  },
]

export default function SpecialistQ4_2019() {
  return (
    <MCQShell
      question={
        <p>
          The expression <Katex tex="i^{1!}+i^{2!}+i^{3!}+\cdots+i^{100!}" /> is equal to
        </p>
      }
      background={
        <Background title="Multiplying by i is a quarter-turn">
          <p>
            On the Argand plane, multiplying by <Katex tex="i" /> rotates a number <Katex tex="\tfrac{\pi}{2}" />{' '}
            anticlockwise about the origin. So <Katex tex="i^k" /> is <Katex tex="1" /> turned through <Katex tex="k" />{' '}
            quarter-turns: <Katex tex="i^1=i" />, <Katex tex="i^2=-1" />, <Katex tex="i^3=-i" />, and{' '}
            <Katex tex="i^4=1" /> is a full turn, back where you started.
          </p>
          <p>
            Full turns change nothing, so only the leftover quarter-turns matter: <Katex tex="i^k" /> depends only on the
            remainder when <Katex tex="k" /> is divided by 4. For example <Katex tex="i^{23}=i^{20}\cdot i^3=-i" />, since{' '}
            <Katex tex="23=4\times5+3" />.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="0" /> },
        { letter: 'B', content: <Katex tex="96" /> },
        { letter: 'C', content: <Katex tex="95+i" />, isAnswer: true },
        { letter: 'D', content: <Katex tex="94+2i" /> },
        { letter: 'E', content: <Katex tex="98+2i" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="After the third term, every exponent is a whole number of turns">
            <QuarterTurns />
          </Explore>
          <WrongMethod
            title="Powers of i cycle every four terms, so 100 terms is 25 full cycles, which add to 0"
            source="18% chose A"
            working={
              <>
                <Katex display tex="i+i^2+i^3+i^4 = i-1-i+1 = 0" />
                <Katex display tex="25\times0 = 0 \quad \text{(option A)}" />
              </>
            }
          >
            <p>
              That reasoning is right for <Katex tex="i^1+i^2+\cdots+i^{100}" />, where the exponents run{' '}
              <Katex tex="1,2,3,4,5,\dots" /> and so pass through every remainder in turn. Here the exponents are{' '}
              <Katex tex="1,2,6,24,120,\dots" />: after the third one they are all multiples of 4, so the remainder is stuck
              at <Katex tex="0" /> and every term is <Katex tex="1" />. The terms never cycle. Writing out the first four or
              five exponents before assuming a pattern catches this: <Katex tex="i^{4!}=i^{24}=1" /> and{' '}
              <Katex tex="i^{5!}=i^{120}=1" />, not <Katex tex="i" />.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
