// 2020 Mathematical Methods — Exam 2, MCQ 2. VCAA examination report: 56% correct.
// The remainder theorem with an unknown coefficient. Question text transcribed from the original paper; solution is original.
// Answer E checked with sympy (p(−2) = −8a − 11; quotient x² − (2a + 2)x + 4a + 5), against the
// VCAA report (no comment printed for this question) and itute (E). Distractors verified with
// sympy: C = ½ from p(2) = 5; A = 2 from −2a(−2)² written as +8a; B = −7/4 and D = −3/2 from the
// constant terms totalled as −9 or −7 instead of −11 (e.g. (−2)³ = −6; the x term as +2).
// Interactive diagram (§15): interactives/meth-2020e2-mcq2-remainder.tsx plots p(x) beside
// (x + 2)q(x), which always passes through (−2, 0), so the gap between them at x = −2 is the
// remainder; an a slider finds a = −2 and a toggle shows why p(2) = 5 (option C) is the wrong
// condition. This site's own explanatory figure; VCAA printed no diagram for this question.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import { Cas } from '../CasRef'

const RemainderWidget = lazyWidget(() => import('../interactives/meth-2020e2-mcq2-remainder'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 7, B: 13, C: 12, D: 10, E: 56 },
  answer: 'E',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="p(x) \text{ divided by } x+2" />
        <Katex display tex="\implies \text{remainder} = p(-2)" />
      </>
    ),
    reason: <>The remainder theorem (see the Background above): dividing by <Katex tex="x-k" /> leaves remainder <Katex tex="p(k)" />. Here <Katex tex="x+2=x-(-2)" />, so <Katex tex="k=-2" />, the value that makes the divisor zero, not <Katex tex="+2" />.</>,
  },
  {
    working: <Katex display tex="p(-2) = (-2)^3-2a(-2)^2+(-2)-1" />,
    reason: <>Substitute into <Katex tex="p(x)=x^3-2ax^2+x-1" />, with a bracket round every <Katex tex="-2" /> so the signs survive the powers.</>,
  },
  {
    working: <Katex display tex="= -8-8a-2-1 = -11-8a" />,
    reason: <>Powers first. <Katex tex="(-2)^3=-8" /> (an odd power keeps the minus sign), but <Katex tex="(-2)^2=4" /> is positive, so <Katex tex="-2a(-2)^2=-2a\times4=-8a" />: the only minus left in that term is the one in front of <Katex tex="2a" />.</>,
  },
  {
    working: <Katex display tex="-11-8a = 5 \implies -8a = 16" />,
    reason: <>The remainder is given as 5. (On CAS, <Cas fn="define">Define p(x) = x^3 − 2a·x^2 + x − 1</Cas> then <Cas fn="solve">solve(p(−2) = 5, a)</Cas> does these lines in one go, but by hand is just as quick.)</>,
  },
  {
    working: <Katex display tex="\boxed{a = -2}" />,
    reason: <>Matches option <b>E</b>. Check: <Katex tex="p(-2)=-8+16-2-1=5" /> ✓. Option <b>C</b> (<Katex tex="\tfrac12" />) comes from substituting <Katex tex="x=2" /> instead of <Katex tex="-2" />; option <b>A</b> (<Katex tex="2" />) from writing <Katex tex="-2a(-2)^2" /> as <Katex tex="+8a" />. Options <b>B</b> and <b>D</b> come from slips in the terms without <Katex tex="a" />, which total <Katex tex="-8-2-1=-11" />: getting <Katex tex="-9" /> instead (for example, <Katex tex="(-2)^3" /> as <Katex tex="-6" />) gives <Katex tex="-\tfrac74" />, and getting <Katex tex="-7" /> (for example, the <Katex tex="x" /> term as <Katex tex="+2" />) gives <Katex tex="-\tfrac32" />.</>,
  },
]

export default function MethodsQ2_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Let <Katex tex="p(x)=x^3-2ax^2+x-1" />, where <Katex tex="a\in R" />. When{' '}
            <Katex tex="p" /> is divided by <Katex tex="x+2" />, the remainder is 5.
          </p>
          <p>The value of <Katex tex="a" /> is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="2" /> },
        { letter: 'B', content: <Katex tex="-\tfrac74" /> },
        { letter: 'C', content: <Katex tex="\tfrac12" /> },
        { letter: 'D', content: <Katex tex="-\tfrac32" /> },
        { letter: 'E', content: <Katex tex="-2" />, isAnswer: true },
      ]}
      rows={ROWS}
      background={
        <Background title="The remainder theorem, and why it works">
          <p>
            Dividing <Katex tex="p(x)" /> by <Katex tex="x+2" /> means writing
          </p>
          <Katex display tex="p(x) = (x+2)\,q(x) + r," />
          <p>
            where <Katex tex="q(x)" /> is the quotient and the remainder <Katex tex="r" /> is just a number (dividing by a
            linear expression always leaves a constant remainder). Now put <Katex tex="x=-2" />: the first term becomes{' '}
            <Katex tex="0\times q(-2)=0" />, leaving <Katex tex="p(-2)=r" />.
          </p>
          <p>
            So the remainder is the value of <Katex tex="p" /> at the <Katex tex="x" /> that makes the divisor zero. In
            general, dividing by <Katex tex="x-k" /> leaves remainder <Katex tex="p(k)" />, and when that is 0,{' '}
            <Katex tex="x-k" /> is a factor (the factor theorem). No long division needed.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="Why the remainder is p(−2): p(x) is (x + 2)q(x) shifted by r, and (x + 2)q(x) is zero at x = −2">
            <RemainderWidget />
          </Explore>
          <WrongMethod
            title="It's divided by x + 2, so substitute x = 2"
            source="12% chose C"
            working={
              <>
                <Katex display tex="p(2) = 8-8a+2-1 = 9-8a = 5" />
                <Katex display tex="\implies a = \tfrac12 \quad \text{(option C)}" />
              </>
            }
          >
            <p>
              The remainder theorem uses the <Katex tex="x" /> that makes the divisor <b>zero</b>, and <Katex tex="x+2=0" /> at{' '}
              <Katex tex="x=-2" />. At <Katex tex="x=2" /> the quotient term <Katex tex="(x+2)q(x)" /> is <Katex tex="4q(2)" />, not
              0, so <Katex tex="p(2)" /> isn&apos;t the remainder. Check the answer: with <Katex tex="a=\tfrac12" />,{' '}
              <Katex tex="p(-2)=-8-4-2-1=-15" />, so the remainder would be <Katex tex="-15" />, not 5.
            </p>
            <p>Next time, solve divisor = 0 first and substitute that value.</p>
          </WrongMethod>
          <WrongMethod
            title="−2a(−2)² has two minus signs, so it's +8a"
            source="7% chose A"
            working={
              <>
                <Katex display tex="p(-2) = -8+8a-2-1 = 8a-11 = 5" />
                <Katex display tex="\implies a = 2 \quad \text{(option A)}" />
              </>
            }
          >
            <p>
              The square acts first: <Katex tex="(-2)^2=4" />, and the minus sign inside the bracket is gone before anything is
              multiplied. That leaves only one minus sign, the one in front of <Katex tex="2a" />, so{' '}
              <Katex tex="-2a(-2)^2=-2a\times4=-8a" />. Checking <Katex tex="a=2" /> catches it:{' '}
              <Katex tex="p(-2)=-8-16-2-1=-27" />, not 5.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
