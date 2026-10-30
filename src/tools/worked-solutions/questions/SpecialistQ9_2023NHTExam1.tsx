// 2023 Specialist NHT — Exam 1, Question 9 (5 marks). The NHT report gives sample answers only,
// with no statistics, and no notes. Two cyclists' position vectors: the initial distance 6√2 gives
// 17a² − 20a − 28 = 0 (roots 2 and −14/17, so a = 2), then with a = 2 a third cyclist's velocity
// is integrated and n chosen so all three meet: A and B meet at t = 6 at 38i + 38j, giving
// n = 28/3. Question text transcribed from the original paper. Answers checked with sympy and
// against the report's sample answers (17a² − 20a − 28 = 0; n = 28/3). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, type WorkingRow } from '../QuestionParts'

const R = (s: string) => `\\underset{\\sim}{r}_{${s}}`
const I = '\\underset{\\sim}{i}'
const J = '\\underset{\\sim}{j}'

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex={`\\begin{aligned}${R('A')}(0)&=a${I}+(2-3a)${J}\\\\${R('B')}(0)&=4a${I}+(2a-2)${J}\\end{aligned}`} />,
    reason: <>&ldquo;Initially&rdquo; means <Katex tex="t=0" />: substitute it into both position vectors.</>,
  },
  {
    working: <Katex display tex={`${R('A')}(0)-${R('B')}(0)=-3a${I}+(4-5a)${J}`} />,
    reason: <>The distance between the cyclists is the magnitude of the vector from one to the other. <Katex tex="a-4a=-3a" /> and <Katex tex="(2-3a)-(2a-2)=4-5a" />.</>,
  },
  {
    working: <Katex display tex={`\\begin{aligned}&\\left|${R('A')}(0)-${R('B')}(0)\\right|^2\\\\ &=9a^2+(4-5a)^2\\\\ &=34a^2-40a+16\\end{aligned}`} />,
    reason: <>Square the magnitude to avoid the square root: <Katex tex="(-3a)^2=9a^2" /> and <Katex tex="(4-5a)^2=16-40a+25a^2" />.</>,
  },
  {
    working: <Katex display tex="34a^2-40a+16=\left(6\sqrt2\right)^2=72" />,
    reason: <>The distance is <Katex tex="6\sqrt2" />, so its square is <Katex tex="36\times2=72" />.</>,
  },
  {
    working: <Katex display tex="34a^2-40a-56=0" />,
    reason: <>Rearrange to the form <Katex tex="f(a)=0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{17a^2-20a-28=0}" />,
    reason: <>Divide by 2 (optional, any non-zero multiple is the same equation). The question says no solution is required.</>,
    more: <>For part b.: it factorises as <Katex tex="(a-2)(17a+14)=0" />, so <Katex tex="a=2" /> or <Katex tex="a=-\tfrac{14}{17}" />, and <Katex tex="a" /> is positive, so <Katex tex="a=2" />: the value part b. gives. Check: with <Katex tex="a=2" /> the initial displacement is <Katex tex="-6\underset{\sim}{i}-6\underset{\sim}{j}" />, of length <Katex tex="\sqrt{72}=6\sqrt2" /> ✓.</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex={`\\begin{aligned}${R('C')}&=\\int\\left(2t${I}+(n-3)${J}\\right)dt\\\\ &=t^2${I}+(n-3)t${J}+\\underset{\\sim}{c}\\end{aligned}`} />,
    reason: <>Position is the antiderivative of velocity. Integrate each component separately; <Katex tex="n" /> is a constant.</>,
  },
  {
    working: <Katex display tex={`\\begin{aligned}&${R('C')}(0)=\\underset{\\sim}{c}=2${I}\\\\ &${R('C')}=\\left(t^2+2\\right)${I}+(n-3)t${J}\\end{aligned}`} />,
    reason: <>At <Katex tex="t=0" /> the <Katex tex="t" /> terms are zero, so <Katex tex={`${R('C')}(0)=\\underset{\\sim}{c}`} />. The initial position is <Katex tex={`2${I}`} />, so that is the constant vector.</>,
  },
  {
    working: <Katex display tex={`\\begin{aligned}${R('A')}&=(6t+2)${I}+(7t-4)${J}\\\\ ${R('B')}&=(5t+8)${I}+(6t+2)${J}\\end{aligned}`} />,
    reason: <>Substitute <Katex tex="a=2" /> into the given position vectors: <Katex tex="4a=8" />, <Katex tex="2-3a=-4" /> and <Katex tex="2a-2=2" />.</>,
  },
  {
    working: <Katex display tex="6t+2=5t+8\implies t=6" />,
    reason: <>For all three to meet, <Katex tex="A" /> and <Katex tex="B" /> must at least meet each other: same position at the <b>same</b> time <Katex tex="t" />. Equate the <Katex tex="\underset{\sim}{i}" /> components.</>,
  },
  {
    working: <Katex display tex="t=6:\quad 7(6)-4=38=6(6)+2" />,
    reason: <>Check the <Katex tex="\underset{\sim}{j}" /> components agree at <Katex tex="t=6" /> too, or <Katex tex="A" /> and <Katex tex="B" /> would never meet.</>,
  },
  {
    working: <Katex display tex={`${R('A')}(6)=${R('B')}(6)=38${I}+38${J}`} />,
    reason: <>The meeting point of <Katex tex="A" /> and <Katex tex="B" />.</>,
  },
  {
    working: <Katex display tex={`\\begin{aligned}${R('C')}(6)&=\\left(36+2\\right)${I}+6(n-3)${J}\\\\ &=38${I}+6(n-3)${J}\\end{aligned}`} />,
    reason: <><Katex tex="C" /> must be at the same point at the same time. Its <Katex tex="\underset{\sim}{i}" /> component is already 38 at <Katex tex="t=6" />, whatever <Katex tex="n" /> is.</>,
  },
  {
    working: <Katex display tex="6(n-3)=38\implies n-3=\frac{19}{3}" />,
    reason: <>Equate the <Katex tex="\underset{\sim}{j}" /> components.</>,
  },
  {
    working: <Katex display tex="\boxed{n=\frac{28}{3}}" />,
    reason: <>Add 3: <Katex tex="n=\tfrac{19}{3}+3=\tfrac{28}{3}" />.</>,
    more: <>Check: with <Katex tex="n=\tfrac{28}{3}" />, <Katex tex="\underset{\sim}{r}_C(6)" /> has <Katex tex="\underset{\sim}{j}" /> component <Katex tex="\tfrac{19}{3}\times6=38" /> ✓, so all three are at <Katex tex="38\underset{\sim}{i}+38\underset{\sim}{j}" /> after 6 seconds. The <Katex tex="\underset{\sim}{i}" /> component of <Katex tex="C" /> lands on 38 at exactly <Katex tex="t=6" /> without any help from <Katex tex="n" />. That is the question&apos;s design, not luck: only the <Katex tex="\underset{\sim}{j}" /> direction has a free constant to fit.</>,
  },
]

export default function SpecialistQ9_2023NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 9 (5 marks)</p>
        <p>
          The position vectors of two cyclists, <Katex tex="A" /> and <Katex tex="B" />, after <Katex tex="t" /> seconds
          are given by <Katex tex={`${R('A')}=(6t+a)${I}+(7t+2-3a)${J}`} /> and{' '}
          <Katex tex={`${R('B')}=(5t+4a)${I}+(6t+2a-2)${J}`} /> respectively for <Katex tex="t\ge0" />, where{' '}
          <Katex tex="a" /> is a positive constant and the components are measured in metres. The distance
          between the cyclists is initially <Katex tex="6\sqrt2" /> metres.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Distance Between Particles"
        marks={2}
        statement={
          <>
            Find a quadratic equation in the form <Katex tex="f(a)=0" /> that, when solved, gives the value
            of <Katex tex="a" />.
            <br />
            A solution to this equation is not required.
          </>
        }
      >
        <WorkingTable rows={ROWS_A} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Vector Kinematics"
        marks={3}
        statement={
          <>
            Another cyclist, <Katex tex="C" />, is moving with velocity given by{' '}
            <Katex tex={`\\dot{\\underset{\\sim}{r}}_C=2t${I}+(n-3)${J}`} />, where <Katex tex="n\in R" />,
            with initial position <Katex tex={`${R('C')}=2${I}`} />.
            <br />
            Given that <Katex tex="a=2" />, find the value of <Katex tex="n" /> such that the three
            cyclists, <Katex tex="A" />, <Katex tex="B" /> and <Katex tex="C" />, meet at the same point at
            the same time.
          </>
        }
      >
        <Background>
          <p>
            Two moving objects meet only if they are at the same position at the <b>same</b> time, so
            every component must agree for one value of <Katex tex="t" />. Paths that cross at different
            times are not a meeting. With three objects, find when and where two of them meet first, then
            make the third be there at that moment.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
      </PartCard>
    </div>
  )
}
