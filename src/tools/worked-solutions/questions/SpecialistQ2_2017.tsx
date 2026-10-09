// 2017 Specialist Mathematics — Exam 2, MCQ 2. VCAA examination report: 37% correct.
// A trigonometric inequality involving cosec — solve with care around the sign of sin(x).
// Question text transcribed from the original paper; solution is original. Answer E agrees
// with the report and itute.
// Widget: interactives/spec-2017-mcq2-cosec.tsx — slide x along cos x and ¼cosec x; the green
// bands are where cos x is on top, including (π, 13π/12) just right of the asymptote, where
// ¼cosec x plunges to −∞. A toggle draws option B's set (sin 2x > ½) as red bars to compare.
// WrongMethod: option B (30%) — multiplying by sin x without flipping on (π, 2π); computed, it
// gives exactly B.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import { Cas } from '../CasRef'

const CosecWidget = lazyWidget(() => import('../interactives/spec-2017-mcq2-cosec'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 9, B: 30, C: 11, D: 12, E: 37 },
  answer: 'E',
  noAnswer: 1,
  comment: 'The solve and graphing capabilities of a CAS could have been used to find the correct answer.',
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\cos(x) > \tfrac14\operatorname{cosec}(x)" />
        <Katex display tex="\cos(x) > \frac{1}{4\sin(x)}" />
      </>
    ),
    reason: (
      <>
        Rewrite <Katex tex="\operatorname{cosec}(x)=\tfrac{1}{\sin(x)}" />. The natural next move is to clear the
        fraction by multiplying by <Katex tex="\sin(x)" />, but multiplying an inequality by a negative number flips
        it, and <Katex tex="\sin(x)" /> is positive on <Katex tex="(0,\pi)" /> and negative on{' '}
        <Katex tex="(\pi,2\pi)" />. That sign change at <Katex tex="\pi" /> (where <Katex tex="\operatorname{cosec}" />{' '}
        is undefined, hence its removal from the domain) is the signal to split into two cases.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\text{Case 1: } x\in(0,\pi),\ \sin(x)>0" />
        <Katex display tex="\sin(x)\cos(x) > \tfrac14" />
        <Katex display tex="\sin(2x) > \tfrac12" />
      </>
    ),
    reason: (
      <>
        Multiplying by the positive <Katex tex="\sin(x)" /> keeps the <Katex tex=">" />. Then{' '}
        <Katex tex="\sin(x)\cos(x)=\tfrac12\sin(2x)" />, so doubling both sides gives one trig function to solve.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="2x\in(0,2\pi)" />
        <Katex display tex="2x\in\left(\tfrac{\pi}{6},\tfrac{5\pi}{6}\right)" />
        <Katex display tex="x\in\left(\tfrac{\pi}{12},\tfrac{5\pi}{12}\right)" />
      </>
    ),
    reason: (
      <>
        Doubling the angle doubles its interval, so <Katex tex="2x" /> runs over one full revolution. There{' '}
        <Katex tex="\sin" /> equals <Katex tex="\tfrac12" /> at <Katex tex="\tfrac{\pi}{6}" /> and{' '}
        <Katex tex="\tfrac{5\pi}{6}" /> (first and second quadrants) and is above <Katex tex="\tfrac12" /> between
        them. Halve to get back to <Katex tex="x" />.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\text{Case 2: } x\in(\pi,2\pi),\ \sin(x)<0" />
        <Katex display tex="\sin(x)\cos(x) < \tfrac14" />
        <Katex display tex="\sin(2x) < \tfrac12" />
      </>
    ),
    reason: <>Multiplying by the <em>negative</em> <Katex tex="\sin(x)" /> flips <Katex tex=">" /> to <Katex tex="<" />. This is the step that is easy to skip.</>,
  },
  {
    working: (
      <>
        <Katex display tex="2x\in(2\pi,4\pi)" />
        <Katex display tex="\sin(2x)=\tfrac12 \text{ at } 2x=\tfrac{13\pi}{6},\ \tfrac{17\pi}{6}" />
        <Katex display tex="2x\in\left(2\pi,\tfrac{13\pi}{6}\right)\cup\left(\tfrac{17\pi}{6},4\pi\right)" />
      </>
    ),
    reason: (
      <>
        The second revolution: add <Katex tex="2\pi" /> to <Katex tex="\tfrac{\pi}{6}" /> and{' '}
        <Katex tex="\tfrac{5\pi}{6}" />. Between those two, <Katex tex="\sin(2x)" /> is <em>above</em>{' '}
        <Katex tex="\tfrac12" />, so &ldquo;below <Katex tex="\tfrac12" />&rdquo; is the rest of the revolution.
      </>
    ),
  },
  {
    working: <Katex display tex="x\in\left(\pi,\tfrac{13\pi}{12}\right)\cup\left(\tfrac{17\pi}{12},2\pi\right)" />,
    reason: <>Halve every endpoint to get back to <Katex tex="x" />.</>,
  },
  {
    working: (
      <Katex
        display
        tex="\boxed{\begin{aligned}x\in\left(\tfrac{\pi}{12},\tfrac{5\pi}{12}\right)&\cup\left(\pi,\tfrac{13\pi}{12}\right)\\&\cup\left(\tfrac{17\pi}{12},2\pi\right)\end{aligned}}"
      />
    ),
    reason: (
      <>
        Matches option <b>E</b>, the union of both cases. Option B is what you get by multiplying by{' '}
        <Katex tex="\sin(x)" /> without flipping on <Katex tex="(\pi,2\pi)" />. On CAS,{' '}
        <Cas fn="solve">{'solve(cos(x) > 1/(4·sin(x)), x) | 0 < x < 2π'}</Cas> gives the three intervals directly,
        and graphing both sides shows where <Katex tex="\cos(x)" /> is on top.
      </>
    ),
    more: <>For option B, see below.</>,
  },
]

export default function SpecialistQ2_2017() {
  return (
    <MCQShell
      question={
        <p>
          The solutions to <Katex tex="\cos(x) > \tfrac14\operatorname{cosec}(x)" /> for{' '}
          <Katex tex="x\in(0,2\pi)\setminus\{\pi\}" /> are given by
        </p>
      }
      options={[
        {
          letter: 'A',
          content: (
            <Katex tex="x\in\left(\tfrac{\pi}{12},\tfrac{5\pi}{12}\right)\cup\left(\tfrac{5\pi}{12},\tfrac{13\pi}{12}\right)\cup\left(\tfrac{17\pi}{12},2\pi\right)" />
          ),
        },
        { letter: 'B', content: <Katex tex="x\in\left(\tfrac{\pi}{12},\tfrac{5\pi}{12}\right)\cup\left(\tfrac{13\pi}{12},\tfrac{17\pi}{12}\right)" /> },
        {
          letter: 'C',
          content: (
            <Katex tex="x\in\left(\tfrac{\pi}{12},\tfrac{5\pi}{12}\right)\cup\left(\pi,\tfrac{13\pi}{12}\right)\cup\left(\tfrac{13\pi}{12},2\pi\right)" />
          ),
        },
        { letter: 'D', content: <Katex tex="x\in\left(\tfrac{\pi}{12},\tfrac{13\pi}{12}\right)\cup\left(\tfrac{17\pi}{12},2\pi\right)" /> },
        {
          letter: 'E',
          content: (
            <Katex tex="x\in\left(\tfrac{\pi}{12},\tfrac{5\pi}{12}\right)\cup\left(\pi,\tfrac{13\pi}{12}\right)\cup\left(\tfrac{17\pi}{12},2\pi\right)" />
          ),
          isAnswer: true,
        },
      ]}
      rows={ROWS}
      background={
        <Background title="Inequalities: never multiply by something of unknown sign">
          <p>
            Multiplying or dividing both sides of an inequality by a negative number reverses it (
            <Katex tex="2<3" /> but <Katex tex="-2>-3" />). So before clearing a fraction such as{' '}
            <Katex tex="\tfrac{1}{4\sin(x)}" />, ask whether the denominator can be negative. If it can, split the domain
            where it changes sign, or read the answer off a graph instead.
          </p>
          <p>
            On a graph, <Katex tex="f(x)>g(x)" /> exactly where the graph of <Katex tex="f" /> is above the graph of{' '}
            <Katex tex="g" />. The answer can switch at a crossing point <em>or</em> at a vertical asymptote, as it does
            here at <Katex tex="x=\pi" />.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="Just right of π, ¼cosec x plunges below cos x">
            <CosecWidget />
          </Explore>
          <WrongMethod
            title="Multiply both sides by sin x to clear the fraction: sin 2x > ½ on all of (0, 2π)"
            source="30% chose B"
            working={
              <>
                <Katex display tex="\sin(2x)>\tfrac12,\quad 2x\in(0,4\pi)" />
                <Katex display tex="2x\in\left(\tfrac{\pi}{6},\tfrac{5\pi}{6}\right)\cup\left(\tfrac{13\pi}{6},\tfrac{17\pi}{6}\right)" />
                <Katex display tex="x\in\left(\tfrac{\pi}{12},\tfrac{5\pi}{12}\right)\cup\left(\tfrac{13\pi}{12},\tfrac{17\pi}{12}\right)" />
              </>
            }
          >
            On <Katex tex="(\pi,2\pi)" />, <Katex tex="\sin(x)" /> is negative, so multiplying by it should have flipped
            the inequality. As a result the second half of B is exactly backwards: it keeps{' '}
            <Katex tex="\left(\tfrac{13\pi}{12},\tfrac{17\pi}{12}\right)" />, where the inequality fails, and drops the
            two intervals where it holds. To catch it, test a value from that band in the original:{' '}
            <Katex tex="x=\tfrac{5\pi}{4}" /> gives <Katex tex="\cos(x)=-\tfrac{\sqrt2}{2}\approx-0.71" /> and{' '}
            <Katex tex="\tfrac14\operatorname{cosec}(x)=-\tfrac{\sqrt2}{4}\approx-0.35" />, and{' '}
            <Katex tex="-0.71>-0.35" /> is false.
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
