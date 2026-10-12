// 2018 Mathematical Methods — Exam 2, MCQ 2. VCAA examination report: 88% correct. Which rule
// has maximal domain R\{1}. Question text transcribed from the original paper; VCAA printed no
// diagram and neither does the stem here (guide §7). Every option's excluded set checked with
// sympy; itute also gives A. Solution is original. Widget (meth-2018-mcq2-gaps): each option's
// graph with its domain coloured along the x-axis — only A has a single gap, at x = 1; E keeps 1 and
// loses everything below it. WrongMethod box for E (5%, the most popular wrong answer).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const GapsWidget = lazyWidget(() => import('../interactives/meth-2018-mcq2-gaps'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 88, B: 3, C: 2, D: 2, E: 5 },
  answer: 'A',
  noAnswer: 0,
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\text{Maximal domain} = R\setminus\{1\}" />
        <Katex display tex="\implies \text{only } x=1 \text{ is excluded}" />
      </>
    ),
    reason: <>So the rule must break at <Katex tex="x=1" /> and nowhere else. A rule breaks where a denominator is zero or a square root has a negative inside.</>,
  },
  {
    working: <Katex display tex="\textbf{A}: \ \frac{x^2-5}{x-1}, \quad x-1=0 \implies x=1" />,
    reason: <>The denominator is zero only at <Katex tex="x=1" />; the numerator is a polynomial, defined everywhere. Maximal domain <Katex tex="R\setminus\{1\}" /> ✓</>,
    more: <>The <Katex tex="x^2-5" /> on top is a decoy: it makes the numerator zero at <Katex tex="x=\pm\sqrt5" />, but a zero numerator is perfectly legal (the function just takes the value <Katex tex="0" /> there). Only the denominator restricts the domain.</>,
  },
  {
    working: <Katex display tex="\textbf{B}: \ x-5=0 \implies x=5" />,
    reason: <>Ruling out <b>B</b>: excluded set is <Katex tex="\{5\}" />, not <Katex tex="\{1\}" />.</>,
  },
  {
    working: <Katex display tex="\textbf{C}: \ x^2+1>0 \ \text{ for all } x" />,
    reason: <>Ruling out <b>C</b>: the denominator is never zero, so the maximal domain is all of <Katex tex="R" />.</>,
  },
  {
    working: <Katex display tex="\textbf{D}: \ 1+x=0 \implies x=-1" />,
    reason: <>Ruling out <b>D</b>: excluded set is <Katex tex="\{-1\}" />. Note the sign — <Katex tex="1+x" /> vanishes at <Katex tex="-1" />, not <Katex tex="1" />.</>,
  },
  {
    working: <Katex display tex="\textbf{E}: \ x-1\ge0 \implies x\ge1" />,
    reason: <>Ruling out <b>E</b> (the most popular wrong answer, <Katex tex="5\%" />): a square root needs <Katex tex="x-1\ge0" />, so the domain is <Katex tex="[1,\infty)" />, which keeps <Katex tex="1" /> and loses everything below it.</>,
  },
  {
    working: <Katex display tex="\boxed{\textbf{A}}" />,
    reason: <>Matches option <b>A</b>, the only rule that breaks at exactly <Katex tex="x=1" />.</>,
  },
]

export default function MethodsQ2_2018() {
  return (
    <MCQShell
      question={
        <p>
          The maximal domain of the function <Katex tex="f" /> is{' '}
          <Katex tex="R\setminus\{1\}" />. A possible rule for <Katex tex="f" /> is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="f(x)=\dfrac{x^2-5}{x-1}" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="f(x)=\dfrac{x+4}{x-5}" /> },
        { letter: 'C', content: <Katex tex="f(x)=\dfrac{x^2+x+4}{x^2+1}" /> },
        { letter: 'D', content: <Katex tex="f(x)=\dfrac{5-x^2}{1+x}" /> },
        { letter: 'E', content: <Katex tex="f(x)=\sqrt{x-1}" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <>
          <Explore title="A gap in the domain is an asymptote: only A has its one gap at x = 1">
            <GapsWidget />
          </Explore>
          <WrongMethod
            title="E has x − 1 in it, so x = 1 must be the value it can't take"
            source="5% chose E"
            working={
              <>
                <Katex display tex="\sqrt{x-1}: \quad x-1\ge 0 \implies x\ge 1" />
                <Katex display tex="\text{maximal domain} = [1,\infty)" />
              </>
            }
          >
            Seeing <Katex tex="x-1" /> is not the test; what matters is <em>where</em> it sits. In a
            denominator, <Katex tex="x-1" /> must not be <Katex tex="0" />, which removes one point.
            Under a square root it must not be <em>negative</em>, which removes every number
            below <Katex tex="1" /> and keeps <Katex tex="x=1" /> itself, since{' '}
            <Katex tex="\sqrt0=0" />. To catch it, ask of each option &ldquo;which values of{' '}
            <Katex tex="x" /> break this rule?&rdquo; rather than hunting for the number <Katex tex="1" />.
          </WrongMethod>
        </>
      }
      background={
        <Background title="What a maximal domain is">
          <p>
            The maximal (or implied) domain of a rule is the set of every real number it can
            be fed without breaking. When a question gives only a rule and no domain, this is
            the domain you assume. In Methods a rule breaks only through division by zero, an
            even root of a negative number, or a logarithm of a number that is not positive.
          </p>
        </Background>
      }
    />
  )
}
