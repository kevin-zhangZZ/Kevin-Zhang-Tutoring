// 2020 Mathematical Methods — Exam 2, MCQ 20. VCAA examination report: 18% correct.
// Finding a valid domain for g(x) = log₂(cos(ax)) so that its range is exactly [−1, 0], given a
// periodicity condition that pins down a. Question text transcribed from the original paper; the
// graph in the examiner's report panel is cropped from the VCAA report. Solution is original;
// answer B checked against the VCAA report and itute (both B), and every option checked numerically
// (range of cos(ax) on each interval) for a = 2πn, n = 1, …, 7, and for a = π.
// Notes on sources:
// - The report goes straight from the property to "a = 2π". Strictly, f(x + 1) = f(x) for all x
//   only forces a = 2πn (n a non-zero integer): a = ±4π, ±6π, … satisfy the property too (Marty
//   Ross's blog makes this criticism). The answer is unaffected — for |n| ≥ 2 no option gives the
//   range [−1, 0] (checked numerically), so B is still the only answer. The working takes n = 1 as
//   the report does and then checks the other n.
// - itute gives the solution set 5/6 ≤ x ≤ 7/6 (the whole stretch around x = 1 where cos(2πx) ≥ 1/2);
//   option B is its right half, which has the same range — hence "a possible interval".
// - One tutor video suggests C could also be right with a = π. It can't: a = π fails the property
//   at h = 1 (cos(π(x + 1)) = −cos(πx)). That slip is the WrongMethod box below.
// Interactive diagrams (§15), this site's own explanatory figures: interactives/meth-2020e2-mcq20-shift.tsx
// overlays y = cos(ax) with its copy shifted h = 1 or 2 units, showing a = π failing at h = 1 and
// a = 2π, 4π, … passing; interactives/meth-2020e2-mcq20-window.tsx shades each option's interval on
// y = cos(2πx) against the band 1/2 ≤ y ≤ 1, with a toggle to a = 4π where no option works.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'
import reportGraphSrc from './meth-2020-mcq20-report-graph.png'

const ShiftWidget = lazyWidget(() => import('../interactives/meth-2020e2-mcq20-shift'))
const WindowWidget = lazyWidget(() => import('../interactives/meth-2020e2-mcq20-window'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 21, B: 18, C: 24, D: 21, E: 16 },
  answer: 'B',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="f(x)=\cos(ax)=f(x+h)=\cos\bigl(a(x+h)\bigr),\ a=2\pi" />
      <br />
      <Katex tex="g(x)=\log_2\bigl(f(x)\bigr)=\log_2\bigl(f(x+h)\bigr)=\log_2\bigl(\cos(a(x+h))\bigr)" />
      <br />
      <Katex tex="-1\le\log_2\bigl(\cos(2\pi x)\bigr)\le0" />
      <br />
      <Katex tex="\tfrac12\le\cos(2\pi x)\le1" />
      <br />
      Checking each of the options for a suitable domain gives <Katex tex="1\le x\le\tfrac76" />.
      <img src={reportGraphSrc} alt="The report's graph of y = cos(2πx) with the lines y = 1 and y = 1/2, marking the points (1, 1) and (7/6, 1/2)" className="w-full max-w-[360px] mt-1" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="h=1:\quad \cos(ax+a) = \cos(ax) \text{ for all } x" />,
    reason: <>Use the property with <Katex tex="h=1" /> (<Katex tex="h=0" /> says nothing). It says the graph of <Katex tex="f" /> translated 1 unit left is the same graph. Once a shift of 1 works, every integer shift does, since a shift of 3 is three shifts of 1, so <Katex tex="h=1" /> is the whole condition.</>,
  },
  {
    working: <Katex display tex="a = 2\pi n,\quad n\in Z\setminus\{0\}" />,
    reason: <>Adding <Katex tex="a" /> to the angle must change nothing, for every <Katex tex="x" />, so <Katex tex="a" /> must be a whole number of full turns, <Katex tex="2\pi n" />. In graph terms, one unit must hold a whole number of periods <Katex tex="\tfrac{2\pi}{|a|}" />. Careful: a period of 2 (<Katex tex="a=\pi" />) is a whole number, but it fails, because a shift of 1 is then half a period and turns the graph upside down.</>,
    more: <>See the first diagram below.</>,
  },
  {
    working: <Katex display tex="a = 2\pi:\quad f(x)=\cos(2\pi x),\ \text{period } 1" />,
    reason: <>Take <Katex tex="n=1" />, one cycle per unit, as the report does. <Katex tex="n=-1" /> gives the same function, because cosine is even. The larger values of <Katex tex="n" /> are checked after the options: none of them works.</>,
  },
  {
    working: (
      <>
        <Katex display tex="-1 \le \log_2\big(\cos(2\pi x)\big) \le 0" />
        <Katex display tex="\iff 2^{-1} \le \cos(2\pi x) \le 2^{0}" />
        <Katex display tex="\iff \tfrac12 \le \cos(2\pi x) \le 1" />
      </>
    ),
    reason: <>Undo the <Katex tex="\log_2" />. It is increasing, so the inequalities keep their direction: <Katex tex="\log_2\tfrac12=-1" /> and <Katex tex="\log_2 1=0" />. The range has to be <em>all</em> of <Katex tex="[-1,0]" />, so on <Katex tex="D" /> the cosine must stay between <Katex tex="\tfrac12" /> and <Katex tex="1" />, and reach both.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{B: } x\in\big[1,\tfrac76\big] \implies 2\pi x\in\big[2\pi,\tfrac{7\pi}{3}\big]" />
        <Katex display tex="\cos(2\pi x) \text{ decreases from } 1 \text{ to } \tfrac12" />
      </>
    ),
    reason: <>At <Katex tex="x=1" /> the angle is a full turn, so the cosine is at a crest, <Katex tex="1" />. By <Katex tex="\tfrac{7\pi}{3}=2\pi+\tfrac{\pi}{3}" /> it has fallen to <Katex tex="\cos\tfrac\pi3=\tfrac12" />, decreasing all the way, so it covers exactly <Katex tex="\big[\tfrac12,1\big]" /> and <Katex tex="g" /> covers exactly <Katex tex="[-1,0]" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{A: } \cos\tfrac{\pi}{2} = 0 \text{ at } x=\tfrac14" />
        <Katex display tex="\text{C: } \cos\tfrac{10\pi}{3} = -\tfrac12 \text{ at } x=\tfrac53" />
        <Katex display tex="\text{D: } \cos\big(-\tfrac{2\pi}{3}\big) = -\tfrac12 \text{ at } x=-\tfrac13" />
        <Katex display tex="\text{E: } \cos\tfrac{\pi}{2} = 0 \text{ at } x=\tfrac14" />
      </>
    ),
    reason: <>Each other interval contains a point where the cosine is 0 or negative, so <Katex tex="\log_2" /> is undefined there. Notice that C is D translated 2 units right. With period 1 that is the same piece of the graph, so C and D were always going to stand or fall together.</>,
    more: <>Try both in the second diagram below.</>,
  },
  {
    working: <Katex display tex="a=\pm4\pi,\ \pm6\pi,\ \dots:\ \text{no option works}" />,
    reason: <>The other values the property allows. The cosine stays in <Katex tex="\big[\tfrac12,1\big]" /> only while the angle <Katex tex="ax" /> is within <Katex tex="\tfrac\pi3" /> of a crest, a stretch of <Katex tex="x" /> of width at most <Katex tex="\tfrac{1}{3|n|}" />. The options have widths <Katex tex="\tfrac16" /> (A, B) and <Katex tex="\tfrac13" /> (C, D, E), so <Katex tex="|n|\ge3" /> is impossible, and <Katex tex="|n|=2" /> leaves only A and B, where <Katex tex="4\pi x" /> runs over <Katex tex="\big[\pi,\tfrac{5\pi}{3}\big]" /> (starting at <Katex tex="-1" />) and <Katex tex="\big[4\pi,\tfrac{14\pi}{3}\big]" /> (falling to <Katex tex="-\tfrac12" />). So <Katex tex="a=\pm2\pi" /> is the only value that makes any option work.</>,
  },
  {
    working: <Katex display tex="\boxed{D = \left[1,\ \tfrac76\right]}" />,
    reason: <>Matches option <b>B</b>. It is &ldquo;a possible interval&rdquo; because others work too, such as <Katex tex="\big[\tfrac56,1\big]" /> or the whole of <Katex tex="\big[\tfrac56,\tfrac76\big]" /> (itute&apos;s answer). Options <b>C</b> (24%) and <b>D</b> (21%) both give the range <Katex tex="[-1,0]" /> if you take <Katex tex="a=\pi" />, which fails the property at <Katex tex="h=1" />. Option <b>A</b> is the interval that would work for <Katex tex="\sin(2\pi x)" /> instead of <Katex tex="\cos(2\pi x)" />. Option <b>E</b> contains the crest at <Katex tex="x=0" /> but runs on to <Katex tex="\cos\tfrac\pi2=0" />.</>,
    more: <>See the Common Mistake below.</>,
  },
]

export default function MethodsQ20_2020() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Let <Katex tex="f:R\to R" />, <Katex tex="f(x)=\cos(ax)" />, where{' '}
            <Katex tex="a\in R\setminus\{0\}" />, be a function with the property
          </p>
          <p className="mb-2">
            <Katex tex="f(x) = f(x+h), \text{ for all } h\in Z" />
          </p>
          <p>
            Let <Katex tex="g:D\to R" />, <Katex tex="g(x)=\log_2\big(f(x)\big)" /> be a function where the
            range of <Katex tex="g" /> is <Katex tex="[-1,0]" />.
            <br />
            A possible interval for <Katex tex="D" /> is
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\left[\tfrac14,\ \tfrac{5}{12}\right]" /> },
        { letter: 'B', content: <Katex tex="\left[1,\ \tfrac76\right]" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="\left[\tfrac53,\ 2\right]" /> },
        { letter: 'D', content: <Katex tex="\left[-\tfrac13,\ 0\right]" /> },
        { letter: 'E', content: <Katex tex="\left[-\tfrac{1}{12},\ \tfrac14\right]" /> },
      ]}
      background={
        <Background title="Reading f(x) = f(x + h)">
          <p>
            The graph of <Katex tex="y=f(x+h)" /> is the graph of <Katex tex="f" /> translated <Katex tex="h" /> units
            left. So &ldquo;<Katex tex="f(x)=f(x+h)" /> for all <Katex tex="h\in Z" />&rdquo; says: translate the graph
            left or right by any whole number of units and you get the same graph back. A cosine graph does that only
            when the translation is a whole number of periods, and the period of <Katex tex="\cos(ax)" /> is{' '}
            <Katex tex="\tfrac{2\pi}{|a|}" />.
          </p>
        </Background>
      }
      rows={ROWS}
      extras={
        <>
          <Explore title="Every whole-number shift must give the same graph — so one unit holds a whole number of cycles">
            <ShiftWidget />
          </Explore>
          <WrongMethod
            title="The period just has to be a whole number, so take a = π (period 2)"
            source="24% chose C, 21% chose D"
            working={
              <>
                <Katex display tex="\tfrac{2\pi}{a} = 2 \implies a = \pi" />
                <Katex display tex="\text{C: } \pi x\in\big[\tfrac{5\pi}{3},2\pi\big],\ \cos \text{ rises from } \tfrac12 \text{ to } 1\ \checkmark" />
                <Katex display tex="\text{D: } \pi x\in\big[-\tfrac{\pi}{3},0\big],\ \cos \text{ rises from } \tfrac12 \text{ to } 1\ \checkmark" />
              </>
            }
          >
            <p>
              With <Katex tex="a=\pi" /> both C and D give the range <Katex tex="[-1,0]" />, and two options working at once
              is already a warning sign. The trouble is <Katex tex="h=1" />:{' '}
              <Katex tex="\cos\big(\pi(x+1)\big)=\cos(\pi x+\pi)=-\cos(\pi x)" />, so a shift of 1 turns the graph upside
              down (the diagram above starts here).
            </p>
            <p>
              The property needs <em>every</em> integer <Katex tex="h" />, and <Katex tex="h=1" /> is the hardest test: the
              period has to fit into 1 a whole number of times, not merely be a whole number itself.
            </p>
          </WrongMethod>
          <Explore title="log₂ turns [½, 1] into [−1, 0] — so on D the cosine must stay between ½ and 1, and reach both">
            <WindowWidget />
          </Explore>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
