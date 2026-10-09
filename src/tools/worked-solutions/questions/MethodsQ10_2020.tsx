// 2020 Mathematical Methods — Exam 2, MCQ 10. VCAA examination report: 62% correct.
// Which integers make a logarithm a positive integer. Question text transcribed from the original paper; solution is original.
// Answer B checked with sympy (log₂(n + 1) = x ⟺ n = 2^x − 1) and by testing each option's first
// values in Python: B gives 1, 3, 7, 15, … (all valid); D, the odd numbers, contains every valid n
// but also 5, 9, 11, 13 (and agrees with B for k = 1, 2); C gives 1, 2, 4, 8, … (only n = 1 valid);
// A and E give none. The VCAA report prints no comment for this question; itute agrees (B).
// Distractor slips verified with sympy: A is n + 1 = 2^x with the −1 dropped; C (12%) solves
// log₂(n) + 1 = x, i.e. the +1 pulled outside the log.
// Interactive diagram (§15): interactives/meth-2020e2-mcq10-ladder.tsx plots x = log₂(n + 1) with a
// dot at every whole n from 0 to 16 and the positive integer heights as rungs; buttons ring each
// option's n-values, green on a rung and red off it. This site's own explanatory figure; VCAA
// printed no diagram for this question.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const LadderWidget = lazyWidget(() => import('../interactives/meth-2020e2-mcq10-ladder'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 11, B: 62, C: 12, D: 10, E: 5 },
  answer: 'B',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="\log_2(n+1) = x \iff n+1 = 2^x" />,
    reason: <>The options all give <Katex tex="n" /> on its own, so make <Katex tex="n" /> the subject. A logarithm is an exponent: <Katex tex="\log_2(n+1)=x" /> says &ldquo;2 to the power <Katex tex="x" /> gives <Katex tex="n+1" />&rdquo;, so write it in exponential form.</>,
  },
  {
    working: <Katex display tex="n = 2^x-1" />,
    reason: <>Subtract 1 from both sides. The <Katex tex="-1" /> sits <em>outside</em> the power: it undoes the <Katex tex="+1" /> that was inside the logarithm.</>,
  },
  {
    working: <Katex display tex="x \in Z^+ \implies x = k, \quad k = 1,2,3,\ldots" />,
    reason: <>&ldquo;<Katex tex="x" /> is a positive integer&rdquo; means <Katex tex="x" /> can be any of 1, 2, 3, …, which the options call <Katex tex="k\in Z^+" />. <Katex tex="x=0" /> (from <Katex tex="n=0" />) is not allowed, because 0 isn&apos;t positive.</>,
  },
  {
    working: <Katex display tex="n = 2^k-1 = 1,\ 3,\ 7,\ 15,\ \ldots" />,
    reason: <>List a few values to check them: <Katex tex="n+1=2,4,8,16" /> are powers of 2, so <Katex tex="\log_2(n+1)=1,2,3,4" /> ✓. The gaps between the values double each time (2, 4, 8), which a linear rule like <Katex tex="2k-1" /> can&apos;t do.</>,
    more: <>See the diagram below.</>,
  },
  {
    working: <Katex display tex="\boxed{n = 2^k-1, \quad k\in Z^+}" />,
    reason: <>Matches option <b>B</b>. Option <b>A</b> drops the <Katex tex="-1" />: its <Katex tex="n=2" /> gives <Katex tex="\log_2 3" />, not an integer. Option <b>C</b> solves <Katex tex="\log_2(n)+1=x" /> instead; only its first value, <Katex tex="n=1" />, works. Options <b>D</b> and <b>E</b> are linear. <b>D</b> (the odd numbers) is the tricky one: its first two values, 1 and 3, both work, so test <Katex tex="k=3" /> too: <Katex tex="n=5" /> gives <Katex tex="\log_2 6" />, not an integer. <b>E</b> gives even <Katex tex="n" />, so <Katex tex="n+1" /> is odd and never a power of 2.</>,
    more: <>For option <b>C</b>, see the common mistake below.</>,
  },
]

export default function MethodsQ10_2020() {
  return (
    <MCQShell
      question={
        <p>
          Given that <Katex tex="\log_2(n+1)=x" />, the values of <Katex tex="n" /> for which{' '}
          <Katex tex="x" /> is a positive integer are
        </p>
      }
      background={
        <Background title="A logarithm is an exponent">
          <p>
            <Katex tex="\log_2 8 = 3" /> because <Katex tex="2^3=8" />: the logarithm answers &ldquo;what power of 2 gives
            this number?&rdquo; So <Katex tex="\log_2(\text{something})" /> is a whole number exactly when the something is a
            whole-number power of 2: 2, 4, 8, 16, …. Anything in between (3, 5, 6, 7, 9, …) gives a logarithm between two
            integers, like <Katex tex="\log_2 6\approx2.58" />.
          </p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="n=2^k,\ k\in Z^+" /> },
        { letter: 'B', content: <Katex tex="n=2^k-1,\ k\in Z^+" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="n=2^{k-1},\ k\in Z^+" /> },
        { letter: 'D', content: <Katex tex="n=2k-1,\ k\in Z^+" /> },
        { letter: 'E', content: <Katex tex="n=2k,\ k\in Z^+" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="log₂(n + 1) is a whole number only when n + 1 is a power of 2">
            <LadderWidget />
          </Explore>
          <WrongMethod
            title="Split log₂(n + 1) into log₂(n) + 1"
            source="12% chose C"
            working={
              <>
                <Katex display tex="\log_2(n) + 1 = x \implies \log_2(n) = x-1" />
                <Katex display tex="\implies n = 2^{x-1} = 2^{k-1} \quad \text{(option C)}" />
              </>
            }
          >
            <p>
              The log laws split a <em>product</em>, not a sum: <Katex tex="\log_2(2n)=\log_2 2+\log_2 n=1+\log_2 n" />, but{' '}
              <Katex tex="\log_2(n+1)" /> has no such rule, so the <Katex tex="+1" /> has to stay inside the bracket until you
              switch to exponential form. Testing catches it: option C&apos;s second value, <Katex tex="n=2" />, gives{' '}
              <Katex tex="\log_2(2+1)=\log_2 3\approx1.58" />, not an integer.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
