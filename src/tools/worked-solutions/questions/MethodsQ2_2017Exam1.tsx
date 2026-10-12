// 2017 Mathematical Methods — Exam 1, Question 2 (4 marks).
// Product rule on x·logₑ(3x), then integration by recognition — the "hence" in (b), where 36%
// of students scored zero. Question text transcribed from the original paper (no diagram
// given). Answers verified with sympy; they agree with the examiner's report and itute.
// Solution is original.
// Widgets: (a) meth-2017e1-q2a-shift — logₑ(kx) is logₑ(x) lifted by logₑ(k), so the tangents
// are parallel with slope 1/x (toggle: the report's wrong slopes 1/(3x) and 3/x fail);
// (b) meth-2017e1-q2b-rise — the rise of F(x) = x logₑ(3x) from 1 to t equals the area under
// logₑ(3x) + 1 (toggle: the wrong "antiderivative" 1/x + x does not keep score).

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const ShiftWidget = lazyWidget(() => import('../interactives/meth-2017e1-q2a-shift'))
const RiseWidget = lazyWidget(() => import('../interactives/meth-2017e1-q2b-rise'))

const EXAM_A: SAExaminerStats = {
  marks: [12, 31, 57],
  average: 1.1,
  comment: (
    <>
      Most students used the product rule; however, many erred with the derivative of{' '}
      <Katex tex="\log_e(3x)" />. Common incorrect answers were{' '}
      <Katex tex="\log_e(3x)+3" /> and <Katex tex="\log_e(3x)+\tfrac13" />.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [36, 19, 45],
  average: 0.7,
  comment: (
    <>
      Students generally were not able to form an integral from their previous answer,
      ignoring the "hence" instruction. Some students attempted to integrate the given
      expression. Some poor application of log laws and/or log notation was observed.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="y = x\log_e(3x)" />,
    reason: (
      <>
        Two factors multiplied, and <em>both</em> contain <Katex tex="x" />, so use the product rule
        with <Katex tex="u=x" /> and <Katex tex="v=\log_e(3x)" />.
      </>
    ),
    more: (
      <>
        If one factor were a constant, like <Katex tex="5\log_e(3x)" />, you wouldn&apos;t need the
        product rule: the constant just stays in front.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{d}{dx}\log_e(3x) = \frac{1}{3x}\times 3 = \frac{1}{x}" />,
    reason: (
      <>
        Chain rule on the log: one over the inside, times the derivative of the inside, which is{' '}
        <Katex tex="3" />. The two threes cancel.
      </>
    ),
    more: (
      <>
        Quicker still: <Katex tex="\log_e(3x)=\log_e(3)+\log_e(x)" />, and the constant{' '}
        <Katex tex="\log_e(3)" /> differentiates to <Katex tex="0" />. So{' '}
        <Katex tex="\log_e(kx)" /> differentiates to <Katex tex="\tfrac1x" /> for every positive
        constant <Katex tex="k" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\frac{dy}{dx} = 1\times\log_e(3x) + x\times\frac{1}{x}" />,
    reason: (
      <>
        Product rule <Katex tex="u'v+uv'" /> with <Katex tex="u'=1" /> and{' '}
        <Katex tex="v'=\tfrac1x" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\frac{dy}{dx} = \log_e(3x) + 1}" />,
    reason: (
      <>
        Simplify <Katex tex="x\times\tfrac1x=1" />.
      </>
    ),
    more: (
      <>
        A free check: the integrand in part (b) is <Katex tex="\log_e(3x)+1" />, exactly this.
        That match is no accident; it is what the &ldquo;hence&rdquo; in part (b) is built on.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\int_1^2\bigl(\log_e(3x)+1\bigr)dx = \Bigl[x\log_e(3x)\Bigr]_1^2" />,
    reason: (
      <>
        &ldquo;Hence&rdquo;: the integrand is part (a)&apos;s answer, so{' '}
        <Katex tex="x\log_e(3x)" />, which differentiates to it, is an antiderivative.
      </>
    ),
    more: (
      <>
        This is part (a) read backwards: the answer to (a) is the antiderivative for (b).
      </>
    ),
  },
  {
    working: <Katex display tex="= 2\log_e(6) - 1\log_e(3)" />,
    reason: (
      <>
        Upper terminal minus lower: <Katex tex="x=2" /> gives <Katex tex="2\log_e(6)" />,{' '}
        <Katex tex="x=1" /> gives <Katex tex="1\log_e(3)" />.
      </>
    ),
    more: (
      <>
        Keep the front factors <Katex tex="2" /> and <Katex tex="1" />; they are the{' '}
        <Katex tex="x" /> in <Katex tex="x\log_e(3x)" />, and the inside of each log is{' '}
        <Katex tex="3\times2=6" /> and <Katex tex="3\times1=3" />.
      </>
    ),
  },
  {
    working: <Katex display tex="= \log_e(6^2) - \log_e(3) = \log_e\!\left(\frac{36}{3}\right)" />,
    reason: (
      <>
        Move the <Katex tex="2" /> up as a power <em>first</em>, then subtract logs by dividing.
      </>
    ),
    more: (
      <>
        The quotient law <Katex tex="\log_e(m)-\log_e(n)=\log_e\!\left(\tfrac mn\right)" /> only
        works on bare logs, and the <Katex tex="2" /> belongs to the first log only. So rewrite{' '}
        <Katex tex="2\log_e(6)=\log_e(36)" /> before combining.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\log_e(12)}" />,
    reason: (
      <>
        So <Katex tex="a=12" />, a positive integer as required.
      </>
    ),
    more: (
      <>
        Sanity check: <Katex tex="\log_e(12)\approx2.48" />, and the integrand runs from{' '}
        <Katex tex="\log_e(3)+1\approx2.10" /> to <Katex tex="\log_e(6)+1\approx2.79" /> over an
        interval of width <Katex tex="1" />, so the area must lie between those two numbers.
      </>
    ),
  },
]

export default function MethodsQ2_2017Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 2 (4 marks)</p>
        <p>
          Let <Katex tex="y = x\log_e(3x)" />.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Product Rule"
        marks={2}
        statement={
          <>
            Find <Katex tex="\dfrac{dy}{dx}" />.
          </>
        }
        examinerReport={EXAM_A}
      >
        <WorkingTable rows={ROWS_A} />
        <Explore title="Why logₑ(3x) has the same gradient as logₑ(x)">
          <ShiftWidget />
        </Explore>
        <WrongMethod
          title={
            <>
              &ldquo;The derivative of <Katex tex="\log_e(3x)" /> is <Katex tex="\tfrac{1}{3x}" />&rdquo;
              (or <Katex tex="\tfrac{3}{x}" />)
            </>
          }
          source="Examiner's report"
          working={
            <Katex
              display
              tex="\begin{aligned}&\log_e(3x)+x\times\tfrac{1}{3x}=\log_e(3x)+\tfrac13\ \text{✗}\\&\log_e(3x)+x\times\tfrac{3}{x}=\log_e(3x)+3\ \text{✗}\end{aligned}"
            />
          }
        >
          These are the report&apos;s two common wrong answers. The chain rule gives{' '}
          <Katex tex="\tfrac{1}{3x}\times3" />, and each slip keeps only one of the two threes:
          dropping the <Katex tex="\times3" /> gives <Katex tex="\tfrac13" />, and dropping the{' '}
          <Katex tex="3" /> under the <Katex tex="x" /> gives <Katex tex="3" />. Splitting the log
          first, as in the note on row 2, avoids the chain rule entirely.
        </WrongMethod>
      </PartCard>

      <PartCard
        letter="b"
        topic="Integral Recognition"
        marks={2}
        statement={
          <>
            Hence, calculate <Katex tex="\displaystyle\int_1^2\bigl(\log_e(3x)+1\bigr)dx" />.
            Express your answer in the form <Katex tex="\log_e(a)" />, where <Katex tex="a" />{' '}
            is a positive integer.
          </>
        }
        examinerReport={EXAM_B}
      >
        <Background title="What “hence” is asking for">
          <p>
            This is <em>integration by recognition</em>. The integrand{' '}
            <Katex tex="\log_e(3x)+1" /> has no antiderivative you can write down by the rules
            on the formula sheet, but part (a) just showed it <em>is</em> the derivative of
            something, and that something is the antiderivative.
          </p>
          <p>
            In general: if <Katex tex="\dfrac{d}{dx}F(x)=f(x)" />, then{' '}
            <Katex tex="\displaystyle\int_a^b f(x)\,dx=F(b)-F(a)" />. Whenever an exam question
            differentiates something in one part and integrates something similar in the next,
            the answer to the first part is the tool for the second. &ldquo;Hence&rdquo; means you
            must use it. The report says students generally did not form the integral from their
            previous answer, and over a third scored zero here.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Explore title="Why part (a) answers part (b): F's rise is the area">
          <RiseWidget />
        </Explore>
        <WrongMethod
          title={
            <>
              Ignore the &ldquo;hence&rdquo; and integrate <Katex tex="\log_e(3x)+1" /> from scratch
            </>
          }
          source="Examiner's report"
          working={<Katex display tex="\Bigl[\tfrac1x+x\Bigr]_1^2=\tfrac52-2=\tfrac12\ \text{✗}" />}
        >
          The report notes some students tried to integrate the expression directly. The tempting
          move is to write down <Katex tex="\tfrac1x" />, but that is the{' '}
          <em>derivative</em> of <Katex tex="\log_e(3x)" /> (from part (a)), not an antiderivative.
          Two alarms: <Katex tex="\tfrac12" /> is not of the form <Katex tex="\log_e(a)" />, and the
          size check in the last row rules it out.
        </WrongMethod>
        <WrongMethod
          title="Combine the logs before moving the 2 up"
          working={
            <Katex display tex="2\log_e(6)-\log_e(3)=2\log_e\!\left(\tfrac63\right)=\log_e(4)\ \text{✗}" />
          }
        >
          The report mentions some poor application of log laws, and this is one way it happens
          here: the <Katex tex="2" /> has been applied to both logs instead of just the first. The
          size check in the last row catches it: <Katex tex="\log_e(4)\approx1.39" /> is below even
          the smallest height of the integrand, about <Katex tex="2.10" />.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
