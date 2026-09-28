// 2019 Specialist Mathematics — Exam 2, MCQ 3. VCAA examination report: 65% correct. The
// implied domain of 1 − sec(x + π/4). Question text transcribed from the original paper
// (no diagram). Solution is original.
//
// Interactive (extras): interactives/spec-2019-mcq3-shift — slide the shift s in
// y = 1 − sec(x + s) from 0 to π/4 and watch the asymptotes move LEFT from (2n − 1)π/2 (option E)
// to (4n + 1)π/4 (option D); a toggle draws option C's values (4n − 1)π/4 = 3π/4 + nπ and shows
// each passing through a point of the graph. Wrong-method boxes: C (24%) as the asymptotes shifted
// the wrong way (3π/4 + nπ is exactly C's set), E (8%) as the zeros of cos x with the shift
// forgotten. Answer D confirmed with sympy and agrees with itute.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import { Cas } from '../CasRef'

const ShiftWidget = lazyWidget(() => import('../interactives/spec-2019-mcq3-shift'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 2, B: 1, C: 24, D: 65, E: 8 },
  answer: 'D',
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\sec(\theta) = \dfrac{1}{\cos(\theta)}" />,
    reason: <>For an implied domain, ask what could stop the rule from giving an output: a zero denominator, a negative under a square root, a non-positive inside a logarithm. Here the only one is the hidden fraction in <Katex tex="\sec" />, which is undefined exactly where <Katex tex="\cos" /> is zero.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\cos\!\left(x+\dfrac{\pi}{4}\right)=0" />
        <Katex display tex="\implies x+\dfrac{\pi}{4} = \dfrac{\pi}{2}+n\pi, \ n\in Z" />
      </>
    ),
    reason: <>Treat the whole bracket as the angle. <Katex tex="\cos" /> is zero at <Katex tex="\tfrac{\pi}{2}" />, <Katex tex="\tfrac{3\pi}{2}" />, <Katex tex="-\tfrac{\pi}{2}" />, …: every <Katex tex="\tfrac{\pi}{2}" /> plus a whole number of half-turns. (On the CAS, <Cas fn="solve">solve(cos(x+π/4)=0,x)</Cas> does this step, but it may write the answer in a different-looking form.)</>,
  },
  {
    working: <Katex display tex="x = \dfrac{\pi}{2}-\dfrac{\pi}{4}+n\pi = \dfrac{\pi}{4}+n\pi" />,
    reason: <>Subtract <Katex tex="\tfrac{\pi}{4}" /> from both sides. The bracket reaches <Katex tex="\tfrac{\pi}{2}" /> when <Katex tex="x" /> is only <Katex tex="\tfrac{\pi}{4}" />, so the bad values are <Katex tex="\tfrac{\pi}{4}" /> <em>earlier</em> than those of <Katex tex="\sec x" />: the graph of <Katex tex="\sec x" /> has been translated <Katex tex="\tfrac{\pi}{4}" /> to the left.</>,
  },
  {
    working: <Katex display tex="= \dfrac{\pi}{4}+\dfrac{4n\pi}{4} = \dfrac{(4n+1)\pi}{4}" />,
    reason: <>Putting it over a common denominator of <Katex tex="4" /> to match the form of the options.</>,
  },
  {
    working: <Katex display tex="\boxed{R\setminus\left\{\dfrac{(4n+1)\pi}{4}\right\},\ n\in Z}" />,
    reason: <>Matches option <b>D</b>. Set-builder forms can look different yet describe the same set (for example, the CAS may give <Katex tex="\tfrac{(4n-3)\pi}{4}" />, which is the same list), so compare actual members: <Katex tex="n=0,\,1,\,-1" /> give <Katex tex="\tfrac{\pi}{4},\ \tfrac{5\pi}{4},\ -\tfrac{3\pi}{4}" />, each <Katex tex="\pi" /> apart. Option <b>C</b> lists <Katex tex="-\tfrac{\pi}{4},\ \tfrac{3\pi}{4},\dots" />, where <Katex tex="\cos\left(x+\tfrac{\pi}{4}\right)=\pm1" />, not zero; <b>E</b> lists the zeros of <Katex tex="\cos x" /> with the shift left out (both below). <b>A</b> ignores the restriction altogether, and <b>B</b> is not a domain of this function at all.</>,
  },
]

export default function SpecialistQ3_2019() {
  return (
    <MCQShell
      question={<p>The implied domain of the function with rule <Katex tex="f(x)=1-\sec\!\left(x+\dfrac{\pi}{4}\right)" /> is</p>}
      options={[
        { letter: 'A', content: <Katex tex="R" /> },
        { letter: 'B', content: <Katex tex="[0,2]" /> },
        { letter: 'C', content: <Katex tex="R\setminus\left\{\tfrac{(4n-1)\pi}{4}\right\},\ n\in Z" /> },
        { letter: 'D', content: <Katex tex="R\setminus\left\{\tfrac{(4n+1)\pi}{4}\right\},\ n\in Z" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="R\setminus\left\{\tfrac{(2n-1)\pi}{2}\right\},\ n\in Z" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <>
          <Explore title="Adding π/4 inside the bracket moves every asymptote π/4 to the left">
            <ShiftWidget />
          </Explore>
          <WrongMethod
            title="+π/4 moves the graph π/4 to the right, so the asymptotes move from π/2 to 3π/4"
            source="24% chose C"
            working={
              <>
                <Katex display tex="x=\dfrac{\pi}{2}+\dfrac{\pi}{4}+n\pi=\dfrac{3\pi}{4}+n\pi" />
                <Katex display tex="=\dfrac{(4n+3)\pi}{4}=\dfrac{\big(4(n+1)-1\big)\pi}{4}" />
                <Katex display tex="\implies R\setminus\left\{\tfrac{(4n-1)\pi}{4}\right\} \ \text{(option C)}" />
              </>
            }
          >
            <p>
              A plus sign inside the bracket moves the graph to the <b>left</b>: every output of <Katex tex="y=g(x)" /> turns up
              on <Katex tex="y=g(x+a)" /> at an <Katex tex="x" />-value <Katex tex="a" /> smaller. Moving right instead (or adding{' '}
              <Katex tex="\tfrac{\pi}{4}" /> to both sides when solving) gives <Katex tex="\tfrac{3\pi}{4}+n\pi" />, and
              relabelling <Katex tex="n+1" /> as <Katex tex="n" /> turns that into exactly option C&apos;s set.
            </p>
            <p>
              Catch it by substituting one excluded value back in: <Katex tex="x=-\tfrac{\pi}{4}" /> gives{' '}
              <Katex tex="f\left(-\tfrac{\pi}{4}\right)=1-\sec 0=0" />, a perfectly good output, so it cannot be missing from
              the domain. A correct excluded value must make <Katex tex="\cos\left(x+\tfrac{\pi}{4}\right)" /> exactly{' '}
              <Katex tex="0" />.
            </p>
          </WrongMethod>
          <WrongMethod
            title="sec is undefined where cos x = 0, so exclude the odd multiples of π/2"
            source="8% chose E"
            working={
              <>
                <Katex display tex="\cos x=0 \implies x=\dfrac{(2n-1)\pi}{2}" />
                <Katex display tex="\implies R\setminus\left\{\tfrac{(2n-1)\pi}{2}\right\} \ \text{(option E)}" />
              </>
            }
          >
            <p>
              That is the implied domain of <Katex tex="\sec x" />, not of <Katex tex="\sec\left(x+\tfrac{\pi}{4}\right)" />.
              The function is undefined where its <em>own</em> angle, the whole bracket <Katex tex="x+\tfrac{\pi}{4}" />, is an
              odd multiple of <Katex tex="\tfrac{\pi}{2}" />. Check: at <Katex tex="x=\tfrac{\pi}{2}" /> the bracket is{' '}
              <Katex tex="\tfrac{3\pi}{4}" />, and <Katex tex="\sec\tfrac{3\pi}{4}=-\sqrt2" /> exists, so{' '}
              <Katex tex="\tfrac{\pi}{2}" /> is in the domain.
            </p>
          </WrongMethod>
        </>
      }
    />
  )
}
