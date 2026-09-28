// 2018 Mathematical Methods — Exam 2, MCQ 3. VCAA examination report: 48% correct. The range
// of f(x) = 1/x on the half-open interval [a, b). Question text transcribed from the original
// paper; VCAA printed no diagram and neither does the stem here (guide §7). The report's own
// comment confirms the domain is [a, b) and the range (1/b, 1/a]; itute also gives D. Solution
// is original. Widget (meth-2018-mcq3-flip): domain on the x-axis, range on the y-axis, a slider
// that moves x across [a, b) so the output visibly moves down, and a toggle showing option A's
// interval running downhill. WrongMethod box for option A (34%), checked against a = 1, b = 2.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const FlipWidget = lazyWidget(() => import('../interactives/meth-2018-mcq3-flip'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 34, B: 6, C: 7, D: 48, E: 4 },
  answer: 'D',
  noAnswer: 0,
  comment: (
    <>
      <Katex tex="f:[a,b)\to R,\ f(x)=\dfrac{1}{x}" />,
      <br />
      <Katex tex="f(a)=\dfrac{1}{a},\ f(b)=\dfrac{1}{b},\ f(a)>f(b)" />,
      <br />
      Range <Katex tex="\left(\dfrac{1}{b},\ \dfrac{1}{a}\right]" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="f(x)=\frac1x, \quad f'(x) = -\frac{1}{x^2} < 0 \ \text{ for } x>0" />,
    reason: <>Whenever you are asked for a range over an interval, first decide whether the function goes up or down across it: that decides which end of the domain gives the top of the range. On the positive reals <Katex tex="f" /> is strictly <em>decreasing</em>. That single fact reverses the order of the endpoints, and it is what separates the right answer from the most popular wrong one.</>,
  },
  {
    working: <Katex display tex="0<a<b \implies \frac1b < \frac1a" />,
    reason: <>Taking reciprocals of positive numbers flips the inequality. So the <em>largest</em> output comes from the smallest input <Katex tex="a" />, and the smallest output from <Katex tex="b" />.</>,
  },
  {
    working: <Katex display tex="f(a) = \frac1a \ \text{ attained} \quad \left(a \in [a,b)\right)" />,
    reason: <>The domain includes its left endpoint, so <Katex tex="\tfrac1a" /> is an actual output — the range is <em>closed</em> at that end.</>,
  },
  {
    working: <Katex display tex="f(b) = \frac1b \ \text{ not attained} \quad \left(b \notin [a,b)\right)" />,
    reason: <>The domain excludes its right endpoint. The outputs get arbitrarily close to <Katex tex="\tfrac1b" /> without ever reaching it — the range is <em>open</em> at that end.</>,
  },
  {
    working: <Katex display tex="\left[\frac1a,\ \frac1b\right) \ \text{ is empty when } \frac1a > \frac1b" />,
    reason: <>Ruling out <b>A</b>, chosen by <Katex tex="34\%" /> — nearly as many as got it right. Its brackets are actually on the right values (<Katex tex="[" /> with <Katex tex="\tfrac1a" />, <Katex tex=")" /> with <Katex tex="\tfrac1b" />), but it keeps the <em>same</em> order as the domain, forgetting that <Katex tex="f" /> is decreasing. Written as an interval it is back-to-front, so it describes no values at all.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\textbf{C}: \left[\frac1b,\frac1a\right)" />
        <Katex display tex="\text{brackets the wrong way round}" />
      </>
    ),
    reason: <>Ruling out <b>C</b>: right order, wrong ends. It closes the interval at the value that is never attained and opens it at the value that is. <b>B</b> makes both errors at once, and <b>E</b> simply repeats the domain.</>,
  },
  {
    working: <Katex display tex="\boxed{\text{Range} = \left(\frac1b,\ \frac1a\right]}" />,
    reason: <>Matches option <b>D</b>. Both features have to be right: the order (<Katex tex="\tfrac1b" /> first because <Katex tex="f" /> decreases) <em>and</em> the bracket types (open where the domain was open, closed where it was closed).</>,
  },
]

export default function MethodsQ3_2018() {
  return (
    <MCQShell
      question={
        <p>
          Consider the function <Katex tex="f:[a,b)\to R,\ f(x)=\dfrac{1}{x}" />, where{' '}
          <Katex tex="a" /> and <Katex tex="b" /> are positive real numbers. The range of{' '}
          <Katex tex="f" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\left[\dfrac1a,\ \dfrac1b\right)" /> },
        { letter: 'B', content: <Katex tex="\left(\dfrac1a,\ \dfrac1b\right]" /> },
        { letter: 'C', content: <Katex tex="\left[\dfrac1b,\ \dfrac1a\right)" /> },
        { letter: 'D', content: <Katex tex="\left(\dfrac1b,\ \dfrac1a\right]" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="[a,\ b)" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <>
          <Explore title="Why the ends swap: as x moves right, 1/x moves down">
            <FlipWidget />
          </Explore>
          <WrongMethod
            title="The domain is [a, b), so the range is [f(a), f(b)) = [1/a, 1/b)"
            source="34% chose A"
            working={<Katex display tex="f(a)=\tfrac1a,\ \ f(b)=\tfrac1b \implies \left[\tfrac1a,\ \tfrac1b\right)" />}
          >
            This carries each bracket across with its own endpoint, which is right, but keeps the
            domain&apos;s order, which only works for an <em>increasing</em> function. Because{' '}
            <Katex tex="\tfrac1x" /> decreases, <Katex tex="\tfrac1a" /> is the bigger number, so{' '}
            <Katex tex="\left[\tfrac1a, \tfrac1b\right)" /> runs from larger to smaller and contains
            nothing. Catch it by trying numbers: with <Katex tex="a=1" /> and <Katex tex="b=2" />,{' '}
            <Katex tex="x" /> runs from <Katex tex="1" /> up towards <Katex tex="2" />, so{' '}
            <Katex tex="\tfrac1x" /> runs from <Katex tex="1" /> <em>down</em> towards{' '}
            <Katex tex="\tfrac12" /> without reaching it: <Katex tex="\left(\tfrac12, 1\right]" />.
            That pattern, smaller value first, is option <b>D</b>.
          </WrongMethod>
        </>
      }
      background={
        <Background title="Carrying brackets across from domain to range">
          <p>
            For a function that is strictly increasing or decreasing, each endpoint of the
            domain maps to an endpoint of the range, and an included endpoint stays included
            while an excluded one stays excluded. So the bracket <em>types</em> travel with
            their endpoints.
          </p>
          <p>
            What can change is the <em>order</em>. If the function decreases, the left end of
            the domain produces the right end of the range, and the two brackets swap sides.
            Writing out <Katex tex="f(a)" /> and <Katex tex="f(b)" /> separately, then asking
            which is bigger, keeps this straight — and it is exactly the working the report
            sets out.
          </p>
        </Background>
      }
    />
  )
}
