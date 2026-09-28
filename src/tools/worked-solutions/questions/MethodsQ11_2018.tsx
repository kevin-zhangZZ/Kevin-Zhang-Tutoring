// 2018 Mathematical Methods — Exam 2, MCQ 11. VCAA examination report: 26% correct, with
// option A (38%) the most popular answer.
// Pin down a in y = tan(ax) from one asymptote location and a count of x-intercepts.
// Question text transcribed from the original paper; solution is original, checked in sympy;
// answer C agrees with the report and itute. Method: the features of tan(ax) alternate intercept,
// asymptote, intercept, … from the origin, so exactly one intercept in (0, 3π) makes 3π the SECOND
// asymptote, 3π/(2a) = 3π. Interactive: meth-2018-mcq11-asymptotes (slide a, numbered asymptotes,
// intercepts counted in the band (0, 3π); option buttons). WrongMethods: A (first asymptote at 3π)
// and B (period 3π), both computed to give exactly those options.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const AsymptotesWidget = lazyWidget(() => import('../interactives/meth-2018-mcq11-asymptotes'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 38, B: 29, C: 26, D: 4, E: 3 },
  answer: 'C',
  noAnswer: 0,
  comment: (
    <>
      <Katex tex="y=\tan(ax)" />
      <br />
      <Katex tex="y=\tan\!\left(\dfrac{x}{2}\right)" />, Period <Katex tex="=2\pi" />
      <br />
      Asymptotes are at <Katex tex="x=\pi,\ x=3\pi" />
      <br />
      <Katex tex="x" />-intercept is <Katex tex="2\pi" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\text{asymptotes: } ax=\frac{\pi}{2}+n\pi" />
        <Katex display tex="\implies\; x=\frac{\pi}{2a},\ \frac{3\pi}{2a},\ \frac{5\pi}{2a},\ \dots" />
      </>
    ),
    reason: <><Katex tex="\tan\theta" /> is undefined where <Katex tex="\cos\theta=0" />, i.e. where its argument is an odd multiple of <Katex tex="\tfrac{\pi}{2}" />. Since <Katex tex="a>0" />, these are the asymptotes to the right of the origin, in order.</>,
  },
  {
    working: (
      <>
        <Katex display tex="x\text{-intercepts: } ax=n\pi" />
        <Katex display tex="\implies\; x=0,\ \frac{\pi}{a},\ \frac{2\pi}{a},\ \dots" />
      </>
    ),
    reason: <><Katex tex="\tan\theta=0" /> where <Katex tex="\sin\theta=0" />, i.e. where its argument is a multiple of <Katex tex="\pi" />. Each intercept sits halfway between two neighbouring asymptotes (<Katex tex="\tfrac{\pi}{a}" /> is halfway between <Katex tex="\tfrac{\pi}{2a}" /> and <Katex tex="\tfrac{3\pi}{2a}" />), so walking right from the origin the features alternate: intercept, asymptote, intercept, asymptote, …</>,
  },
  {
    working: (
      <>
        <Katex display tex="0<\frac{\pi}{2a}<\frac{\pi}{a}<\frac{3\pi}{2a}" />
        <Katex display tex="\text{one intercept in } (0,3\pi)" />
        <Katex display tex="\implies 3\pi=\frac{3\pi}{2a}" />
      </>
    ),
    reason: <>How would I know which asymptote <Katex tex="3\pi" /> is? Count the intercepts before it. <Katex tex="x=0" /> is an intercept, but <Katex tex="(0,3\pi)" /> is open, so it doesn&apos;t count. If <Katex tex="3\pi" /> were the <em>first</em> asymptote there would be no intercept inside; the <em>third</em> would give two. Exactly one intercept means <Katex tex="3\pi" /> is the <b>second</b> asymptote.</>,
  },
  {
    working: <Katex display tex="\frac{3\pi}{2a}=3\pi \implies a=\frac12" />,
    reason: <>Divide both sides by <Katex tex="3\pi" />: <Katex tex="\tfrac{1}{2a}=1" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="a=\tfrac12: \ \text{asymptotes } x=\pi,\ 3\pi,\ 5\pi,\ \dots" />
        <Katex display tex="x\text{-intercepts } x=0,\ 2\pi,\ 4\pi,\ \dots" />
        <Katex display tex="\text{in } (0,3\pi)\text{: only } x=2\pi \ \checkmark" />
      </>
    ),
    reason: <>Check both conditions against the answer: <Katex tex="\tan\!\left(\tfrac12\cdot3\pi\right)=\tan\tfrac{3\pi}{2}" /> is undefined, so <Katex tex="x=3\pi" /> is an asymptote, and <Katex tex="2\pi" /> is the only intercept strictly between <Katex tex="0" /> and <Katex tex="3\pi" />. The period is <Katex tex="\tfrac{\pi}{a}=2\pi" />, the gap between neighbouring asymptotes.</>,
  },
  {
    working: <Katex display tex="\boxed{a=\tfrac12}" />,
    reason: <>Matches option <b>C</b>. Option <b>A</b> <Katex tex="\left(\tfrac16\right)" /> makes <Katex tex="3\pi" /> the <em>first</em> asymptote, <Katex tex="\tfrac{\pi}{2a}=3\pi" />; option <b>B</b> <Katex tex="\left(\tfrac13\right)" /> sets the period <Katex tex="\tfrac{\pi}{a}=3\pi" />. Both are unpacked below.</>,
  },
]

export default function MethodsQ11_2018() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            The graph of <Katex tex="y=\tan(ax)" />, where <Katex tex="a\in R^+" />, has a vertical
            asymptote <Katex tex="x=3\pi" /> and has exactly one <Katex tex="x" />-intercept in the region{' '}
            <Katex tex="(0,3\pi)" />.
          </p>
          <p>The value of <Katex tex="a" /> is</p>
        </>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{1}{6}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{1}{3}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{1}{2}" />, isAnswer: true },
        { letter: 'D', content: '1' },
        { letter: 'E', content: '2' },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="The features of y = tan(ax)">
          <p>
            For <Katex tex="a>0" />, the graph of <Katex tex="y=\tan(ax)" /> repeats every{' '}
            <Katex tex="\tfrac{\pi}{a}" /> (the period). It has vertical asymptotes where{' '}
            <Katex tex="ax" /> is an odd multiple of <Katex tex="\tfrac{\pi}{2}" /> and{' '}
            <Katex tex="x" />-intercepts where <Katex tex="ax" /> is a multiple of{' '}
            <Katex tex="\pi" />.
          </p>
          <p>
            Each branch runs from <Katex tex="-\infty" /> up to <Katex tex="+\infty" /> between
            two neighbouring asymptotes and crosses the axis exactly once, halfway across. So the
            period is the <em>gap</em> between neighbouring asymptotes, and knowing where one
            asymptote is does not tell you which one it is. That is what the intercept condition
            in this question is for.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="Which asymptote is x = 3π? Count the intercepts before it">
            <AsymptotesWidget />
          </Explore>
          <WrongMethod
            title="The first asymptote is at π/(2a), so π/(2a) = 3π"
            source="38% chose A"
            working={<Katex display tex="\frac{\pi}{2a}=3\pi \implies a=\frac16" />}
          >
            <p>
              This does put an asymptote at <Katex tex="3\pi" />, but it is the <em>first</em>{' '}
              one. With <Katex tex="a=\tfrac16" /> the intercepts are at{' '}
              <Katex tex="x=0,\ 6\pi,\ 12\pi,\ \dots" />, so the graph climbs from the origin
              straight up to <Katex tex="x=3\pi" /> without crossing the axis, and{' '}
              <Katex tex="x=0" /> doesn&apos;t count because <Katex tex="(0,3\pi)" /> is open. That
              is zero intercepts, not one. The intercept condition is there to tell you which
              asymptote <Katex tex="3\pi" /> is; to catch this, list the intercepts in{' '}
              <Katex tex="(0,3\pi)" /> for your <Katex tex="a" /> and count them.
            </p>
          </WrongMethod>
          <WrongMethod
            title="An asymptote at 3π means the period is 3π"
            source="29% chose B"
            working={<Katex display tex="\frac{\pi}{a}=3\pi \implies a=\frac13" />}
          >
            <p>
              The period is the <em>gap</em> between neighbouring asymptotes, not the position of
              one. With <Katex tex="a=\tfrac13" /> the asymptotes are at{' '}
              <Katex tex="x=\tfrac{3\pi}{2},\ \tfrac{9\pi}{2},\ \dots" /> and{' '}
              <Katex tex="x=3\pi" /> is an <em>intercept</em>: substituting back,{' '}
              <Katex tex="\tan\!\left(\tfrac13\cdot3\pi\right)=\tan\pi=0" />, not undefined.
              Substituting <Katex tex="x=3\pi" /> into your answer catches it immediately.
            </p>
          </WrongMethod>
        </>
      }
    />
  )
}
