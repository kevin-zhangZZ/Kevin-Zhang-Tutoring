// 2019 Mathematical Methods — Exam 2, MCQ 11. VCAA examination report: 30% correct.
// The condition for independence of two events A and B, given conditional probabilities.
// Question text transcribed from the original paper. Solution is original; answer A agrees with
// the report and itute. Interactive: meth-2019-mcq11-square (the tree as a unit-square area model:
// Pr(B) is a weighted average of m and n, so it equals m only when n = m, whatever p is; buttons
// test options B–E). WrongMethods: options C and D.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const SquareWidget = lazyWidget(() => import('../interactives/meth-2019-mcq11-square'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 30, B: 23, C: 16, D: 12, E: 19 },
  answer: 'A',
  noAnswer: 1,
  comment: (
    <>
      <Katex tex="\Pr(A)=p" />
      <br />
      <Katex tex="\Pr(B\mid A)=\dfrac{\Pr(A\cap B)}{\Pr(A)}=\dfrac{\Pr(A)\times\Pr(B)}{\Pr(A)}=\Pr(B)=m" />
      <br />
      <Katex tex="\Pr(B\mid A')=\dfrac{\Pr(A'\cap B)}{\Pr(A')}=\dfrac{\Pr(A')\times\Pr(B)}{\Pr(A')}=\Pr(B)=n" />
      <br />
      Hence <Katex tex="m=n" />.
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\Pr(A)=p" />
        <Katex display tex="\Pr(B\mid A)=m,\quad \Pr(B\mid A')=n" />
      </>
    ),
    reason: <>Given information. On a tree: first branches <Katex tex="A" /> (<Katex tex="p" />) and <Katex tex="A'" /> (<Katex tex="1-p" />); then <Katex tex="B" /> after <Katex tex="A" /> is <Katex tex="m" />, and <Katex tex="B" /> after <Katex tex="A'" /> is <Katex tex="n" />.</>,
  },
  {
    working: <Katex display tex="A,B \text{ independent} \iff \Pr(B\mid A)=\Pr(B)" />,
    reason: <>Independence in conditional form: knowing <Katex tex="A" /> occurred doesn't change the probability of <Katex tex="B" />. Use this form because <Katex tex="m" /> is already a conditional probability; only <Katex tex="\Pr(B)" /> is missing.</>,
    more: <>The other form, <Katex tex="\Pr(A\cap B)=\Pr(A)\Pr(B)" />, works too, but it needs <Katex tex="\Pr(A\cap B)=pm" /> as an extra step and leads to the same equation.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\Pr(B) = \Pr(B\mid A)\Pr(A) + \Pr(B\mid A')\Pr(A')" />
        <Katex display tex="= mp+n(1-p)" />
      </>
    ),
    reason: <>Law of total probability: add the two <Katex tex="B" />-paths on the tree, since <Katex tex="B" /> happens either with <Katex tex="A" /> or without it.</>,
    more: <>Notice that <Katex tex="\Pr(B)" /> is a weighted average of <Katex tex="m" /> and <Katex tex="n" /> (the weights <Katex tex="p" /> and <Katex tex="1-p" /> add to 1), so it always lies between them. It can only equal <Katex tex="m" /> if <Katex tex="n" /> equals <Katex tex="m" /> too, which is where the algebra below ends up.</>,
  },
  {
    working: <Katex display tex="m = mp+n(1-p)" />,
    reason: <>Substitute into <Katex tex="\Pr(B\mid A)=\Pr(B)" />: the left side is <Katex tex="m" />, the right side is <Katex tex="\Pr(B)" /> from the line above.</>,
  },
  {
    working: <Katex display tex="m(1-p) = n(1-p)" />,
    reason: <>Subtract <Katex tex="mp" /> from both sides and factorise. Then divide by <Katex tex="1-p" />, which is not zero: <Katex tex="\Pr(B\mid A')" /> is given, so <Katex tex="A'" /> can happen and <Katex tex="p<1" />.</>,
    more: <>A probability conditional on <Katex tex="A'" /> only exists if <Katex tex="A'" /> is possible, so <Katex tex="\Pr(A')=1-p>0" />.</>,
  },
  {
    working: <Katex display tex="\boxed{m=n}" />,
    reason: <>Matches option <b>A</b>: <Katex tex="B" /> occurs at the same rate whether or not <Katex tex="A" /> happens.</>,
    more: <>That is exactly what independence means, and it holds for any value of <Katex tex="p" />, so options <b>B</b>, <b>D</b> and <b>E</b>, which tie <Katex tex="m" /> or <Katex tex="n" /> to <Katex tex="p" />, cannot be right. Option <b>B</b> (<Katex tex="23\%" />) likely comes from setting <Katex tex="m" /> equal to the <Katex tex="A'" /> branch, <Katex tex="1-p" />, mixing up a first-branch probability with a conditional probability of <Katex tex="B" />; but <Katex tex="1-p" /> says nothing about how often <Katex tex="B" /> happens. Option <b>C</b> (<Katex tex="16\%" />) adds the two <Katex tex="B" />-branches as if they left the same point on the tree; the Common Mistake boxes below test C and D with numbers.</>,
  },
]

export default function MethodsQ11_2019() {
  return (
    <MCQShell
      question={
        <p>
          <Katex tex="A" /> and <Katex tex="B" /> are events from a sample space such that <Katex tex="\Pr(A)=p" />,
          where <Katex tex="p>0" />, <Katex tex="\Pr(B\mid A)=m" /> and <Katex tex="\Pr(B\mid A')=n" />.
          <br />
          <Katex tex="A" /> and <Katex tex="B" /> are independent events when
        </p>
      }
      background={
        <Background title="Two ways to test for independence">
          <p>
            <Katex tex="A" /> and <Katex tex="B" /> are independent when knowing that <Katex tex="A" /> happened tells you
            nothing new about <Katex tex="B" />. Either of these says so, and each implies the other (when{' '}
            <Katex tex="\Pr(A)>0" />):
          </p>
          <Katex display tex="\Pr(A\cap B)=\Pr(A)\Pr(B)" />
          <Katex display tex="\Pr(B\mid A)=\Pr(B)" />
          <p>Pick the form that uses what you are given.</p>
        </Background>
      }
      options={[
        { letter: 'A', content: <Katex tex="m=n" />, isAnswer: true },
        { letter: 'B', content: <Katex tex="m=1-p" /> },
        { letter: 'C', content: <Katex tex="m+n=1" /> },
        { letter: 'D', content: <Katex tex="m=p" /> },
        { letter: 'E', content: <Katex tex="m+n=1-p" /> },
      ]}
      rows={ROWS}
      extras={
        <>
          <Explore title="Pr(B) is a weighted average of m and n, so it equals m only when n = m">
            <SquareWidget />
          </Explore>
          <WrongMethod
            title="The two B-branches add to 1, so m + n = 1"
            source="16% chose C"
            working={<Katex display tex="\Pr(B\mid A)+\Pr(B\mid A')=1 \implies m+n=1" />}
          >
            <p>
              Branches add to 1 only when they leave the <em>same</em> point on the tree:{' '}
              <Katex tex="\Pr(B\mid A)+\Pr(B'\mid A)=1" />. The branches carrying <Katex tex="m" /> and <Katex tex="n" /> leave
              different points (after <Katex tex="A" /> and after <Katex tex="A'" />), so nothing makes them add to 1. Test it:{' '}
              <Katex tex="p=0.4,\ m=0.7,\ n=0.3" /> satisfies <Katex tex="m+n=1" />, but{' '}
              <Katex tex="\Pr(B)=0.4(0.7)+0.6(0.3)=0.46\ne0.7=\Pr(B\mid A)" />, so the events are not independent.
            </p>
          </WrongMethod>
          <WrongMethod
            title="Independent means Pr(B | A) = Pr(A)"
            source="12% chose D"
            working={<Katex display tex="\Pr(B\mid A)=\Pr(A) \implies m=p" />}
          >
            <p>
              Independence compares the probability of <Katex tex="B" /> <em>with</em> the condition to the probability of{' '}
              <Katex tex="B" /> <em>without</em> it: <Katex tex="\Pr(B\mid A)=\Pr(B)" />. <Katex tex="\Pr(B)" /> is not given,
              which is why it has to be built from the tree; swapping in the probability that <em>is</em> given,{' '}
              <Katex tex="\Pr(A)" />, compares two different events. Test it: <Katex tex="p=0.4,\ m=0.4,\ n=0.7" /> satisfies{' '}
              <Katex tex="m=p" />, but <Katex tex="\Pr(B)=0.16+0.42=0.58\ne0.4" />.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
