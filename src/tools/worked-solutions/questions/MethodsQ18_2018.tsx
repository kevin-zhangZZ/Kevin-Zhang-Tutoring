// 2018 Mathematical Methods — Exam 2, MCQ 18. VCAA examination report: 14% correct — the
// hardest question in Section A.
// Comparing two power functions on either side of x = 1; which statement must be false?
// Question text transcribed from the original paper; solution is original.
// Answer E checked with sympy: f′(x) = g′(x) ⟺ x = (r/s)^(1/(s−r)), the single solution, which lies
// in (0, 1) whenever 0 < r < s (e.g. r = 1/2, s = 2 gives 4^(−2/3) ≈ 0.397). itute agrees (E).
// The working checks every option against r < s, since the options are the discriminating part.
// Interactive (§15): interactives/meth-2018-mcq18-matching-slopes.tsx draws x^r and x^s with
// tangents at a movable x, the matching-gradient point c, and the gradient graphs f′ and g′.
// WrongMethod: "f is above g, so f is steeper" leads to rejecting D (21% chose D); a numerical
// counterexample (r = 1/2, s = 2 at x = 0.9) is given.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const SlopesWidget = lazyWidget(() => import('../interactives/meth-2018-mcq18-matching-slopes'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 17, B: 22, C: 24, D: 21, E: 14 },
  answer: 'E',
  noAnswer: 2,
  comment: (
    <>
      <Katex tex="f'(d)=g'(d)" /> for some <Katex tex="d\in(1,\infty)" /> is false.
      <br />
      Options A to D could be seen to be true by substituting in values.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\text{let } r=\tfrac{p}{q}, \ s=\tfrac{m}{n}" />
        <Katex display tex="f(x)=x^r, \ g(x)=x^s, \quad r,s>0" />
      </>
    ),
    reason: <>The integers <Katex tex="p,q,m,n" /> only matter through the two powers, so give the powers names. Both are positive because <Katex tex="p,q,m,n" /> are positive integers.</>,
  },
  {
    working: (
      <>
        <Katex display tex="0<x<1: \ x^r>x^s \iff r<s" />
        <Katex display tex="x>1: \ x^s>x^r \iff s>r" />
        <Katex display tex="\therefore\ r<s, \text{ i.e. } \tfrac{p}{q}<\tfrac{m}{n}" />
      </>
    ),
    reason: (
      <>
        Test a number to see which way powers go. For a base between <Katex tex="0" /> and <Katex tex="1" />, a bigger
        power gives a <em>smaller</em> number: <Katex tex="\left(\tfrac12\right)^2=\tfrac14<\left(\tfrac12\right)^1" />. For a
        base above <Katex tex="1" /> it&apos;s the reverse. Both graphs pass through <Katex tex="(1,1)" />, and{' '}
        <Katex tex="f" /> is on top before it, so <Katex tex="f" /> has the smaller power. Everything below is checked
        against this one fact.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\text{A: } p=m,\ q>n" />
        <Katex display tex="\implies \tfrac{p}{q}<\tfrac{p}{n}=\tfrac{m}{n} \ \checkmark" />
      </>
    ),
    reason: <>Same numerator, bigger denominator, smaller fraction. So A fits <Katex tex="r<s" /> and can be true, e.g. <Katex tex="f(x)=x^{1/3}" />, <Katex tex="g(x)=x^{1/2}" />. It is not <em>must</em> be false.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{B: } q=n,\ m>p" />
        <Katex display tex="\implies \tfrac{p}{q}<\tfrac{m}{q}=\tfrac{m}{n} \ \checkmark" />
      </>
    ),
    reason: <>Same denominator, bigger numerator, bigger fraction. B can be true too, e.g. <Katex tex="f(x)=x^{1/2}" />, <Katex tex="g(x)=x^{3/2}" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\text{C: } pn<qm" />
        <Katex display tex="\iff \tfrac{p}{q}<\tfrac{m}{n} \ \checkmark" />
      </>
    ),
    reason: <>Divide both sides by <Katex tex="qn" />, which is positive, so the inequality keeps its direction. C is just <Katex tex="r<s" /> in disguise: it is <em>always</em> true.</>,
  },
  {
    working: (
      <>
        <Katex display tex="f'(x)=rx^{r-1}, \ g'(x)=sx^{s-1}" />
        <Katex display tex="f'(x)=g'(x) \iff rx^{r-1}=sx^{s-1}" />
        <Katex display tex="\iff x^{s-r}=\tfrac{r}{s}" />
        <Katex display tex="\iff x=\left(\tfrac{r}{s}\right)^{\frac{1}{s-r}}" />
      </>
    ),
    reason: (
      <>
        D and E are both about where the gradients are equal, so find that point once, in general. Divide both sides by{' '}
        <Katex tex="sx^{r-1}" /> (positive) and use <Katex tex="\tfrac{x^{s-1}}{x^{r-1}}=x^{s-r}" />. There is exactly one
        solution.
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="0<\tfrac{r}{s}<1, \ \tfrac{1}{s-r}>0" />
        <Katex display tex="\implies 0<\left(\tfrac{r}{s}\right)^{\frac{1}{s-r}}<1" />
      </>
    ),
    reason: (
      <>
        A number between <Katex tex="0" /> and <Katex tex="1" /> raised to a positive power stays between{' '}
        <Katex tex="0" /> and <Katex tex="1" />. So the only point where the gradients match is always in{' '}
        <Katex tex="(0,1)" />: D is true for every allowed <Katex tex="f" /> and <Katex tex="g" /> (for example{' '}
        <Katex tex="r=\tfrac12,\ s=2" /> gives <Katex tex="c=4^{-2/3}\approx0.40" />).
      </>
    ),
  },
  {
    working: (
      <>
        <Katex display tex="\text{for } x>1: \ \frac{g'(x)}{f'(x)}=\frac{s}{r}\,x^{s-r}>1" />
        <Katex display tex="\boxed{f'(d)\ne g'(d) \text{ for all } d\in(1,\infty)}" />
      </>
    ),
    reason: (
      <>
        Matches option <b>E</b>. The ratio shows it directly: <Katex tex="\tfrac{s}{r}>1" /> and <Katex tex="x^{s-r}>1" />{' '}
        when <Katex tex="x>1" />, so <Katex tex="g" /> is always the steeper one there and the gradients can never be equal.
        Options A to D can all be true, as the report says, so E is the only one that <em>must</em> be false.
      </>
    ),
  },
]

export default function MethodsQ18_2018() {
  return (
    <MCQShell
      question={
        <>
          <p className="mb-2">
            Consider the functions <Katex tex="f:R^+\to R, \ f(x)=x^{p/q}" /> and{' '}
            <Katex tex="g:R^+\to R, \ g(x)=x^{m/n}" />, where <Katex tex="p,q,m" /> and{' '}
            <Katex tex="n" /> are positive integers, and <Katex tex="\tfrac{p}{q}" /> and <Katex tex="\tfrac{m}{n}" />{' '}
            are fractions in simplest form.
          </p>
          <p>
            If <Katex tex="\{x:f(x)>g(x)\}=(0,1)" /> and <Katex tex="\{x:g(x)>f(x)\}=(1,\infty)" />, which of
            the following must be <b>false</b>?
          </p>
        </>
      }
      options={[
        { letter: 'A', content: <><Katex tex="q>n" /> and <Katex tex="p=m" /></> },
        { letter: 'B', content: <><Katex tex="m>p" /> and <Katex tex="q=n" /></> },
        { letter: 'C', content: <Katex tex="pn<qm" /> },
        { letter: 'D', content: <><Katex tex="f'(c)=g'(c)" /> for some <Katex tex="c\in(0,1)" /></> },
        { letter: 'E', content: <><Katex tex="f'(d)=g'(d)" /> for some <Katex tex="d\in(1,\infty)" /></>, isAnswer: true },
      ]}
      rows={ROWS}
      background={
        <Background title="What ‘must be false’ asks for">
          <p>
            A statement <em>must be false</em> if no allowed choice of <Katex tex="p,q,m,n" /> makes it true. So the
            options are sorted two ways: one example where an option is true is enough to throw it out, but the answer
            needs an argument that works for <em>every</em> allowed choice.
          </p>
          <p>
            The only fact the question gives is the sign pattern either side of <Katex tex="x=1" />, and that pins down
            one thing: which function has the bigger power. Turn that into an inequality first, then test each option
            against it.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="The gradients match once, and always before x = 1">
            <SlopesWidget />
          </Explore>
          <WrongMethod
            title="f is above g on (0, 1), so f must be steeper there too"
            source="21% chose D"
            working={
              <>
                <Katex display tex="f(x)>g(x) \text{ on } (0,1) \implies f'(x)>g'(x)\,?" />
                <Katex display tex="\implies f'(c)\ne g'(c) \quad \text{(D chosen as false)}" />
              </>
            }
          >
            <p>
              Height and gradient are different things. Take <Katex tex="f(x)=x^{1/2}" />, <Katex tex="g(x)=x^2" /> at{' '}
              <Katex tex="x=0.9" />: <Katex tex="f" /> is higher (<Katex tex="0.949" /> against <Katex tex="0.81" />), but{' '}
              <Katex tex="f'(0.9)\approx0.53" /> while <Katex tex="g'(0.9)=1.8" />. Both curves start at{' '}
              <Katex tex="0" /> and meet again at <Katex tex="(1,1)" />, so <Katex tex="f" />&apos;s lead has to shrink back
              to zero, which means <Katex tex="g" /> is climbing faster near <Katex tex="x=1" />. Where the lead stops
              growing, the gradients are equal.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
