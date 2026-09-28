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
    reason: <>Given information. Put it on a tree: the first branches are <Katex tex="A" /> (probability <Katex tex="p" />) and <Katex tex="A'" /> (probability <Katex tex="1-p" />); the <Katex tex="B" />-branch after <Katex tex="A" /> carries <Katex tex="m" />, and the <Katex tex="B" />-branch after <Katex tex="A'" /> carries <Katex tex="n" />.</>,
  },
  {
    working: <Katex display tex="A,B \text{ independent} \iff \Pr(B\mid A)=\Pr(B)" />,
    reason: <>The definition of independence, in the conditional form: knowing that <Katex tex="A" /> occurred does not change the probability of <Katex tex="B" />. How would I know to use this form? What we are given, <Katex tex="m" />, is already a conditional probability, so this form lets it go straight in. The only missing piece is <Katex tex="\Pr(B)" />.</>,
  },
  {
    working: (
      <>
        <Katex display tex="\Pr(B) = \Pr(B\mid A)\Pr(A) + \Pr(B\mid A')\Pr(A')" />
        <Katex display tex="= mp+n(1-p)" />
      </>
    ),
    reason: <>The law of total probability, which is just adding the two <Katex tex="B" />-paths on the tree: <Katex tex="B" /> happens either with <Katex tex="A" /> or without it. Everything is now in terms of <Katex tex="m" />, <Katex tex="n" /> and <Katex tex="p" />. Notice that <Katex tex="\Pr(B)" /> is a weighted average of <Katex tex="m" /> and <Katex tex="n" /> (the weights <Katex tex="p" /> and <Katex tex="1-p" /> add to 1), so it always lies between them.</>,
  },
  {
    working: <Katex display tex="m = mp+n(1-p)" />,
    reason: <>Substituting both sides of the independence condition: the left side is <Katex tex="\Pr(B\mid A)=m" />, the right side is <Katex tex="\Pr(B)" /> from the line above.</>,
  },
  {
    working: <Katex display tex="m(1-p) = n(1-p)" />,
    reason: <>Subtracting <Katex tex="mp" /> from both sides and factorising. Since the question quotes <Katex tex="\Pr(B\mid A')=n" />, the event <Katex tex="A'" /> must be possible, so <Katex tex="p<1" /> and <Katex tex="1-p\ne0" /> — it can be divided out.</>,
  },
  {
    working: <Katex display tex="\boxed{m=n}" />,
    reason: <>Matches option <b>A</b>. This also makes sense directly: if <Katex tex="\Pr(B\mid A)=\Pr(B\mid A')" />, then <Katex tex="B" /> occurs at the same rate whether or not <Katex tex="A" /> happens, which is exactly what independence means. It holds for any value of <Katex tex="p" />, which is why none of the options involving <Katex tex="p" /> can be right. Option <b>C</b> (<Katex tex="16\%" />) adds the two <Katex tex="B" />-branches as if they left the same point on the tree, and option <b>D</b> (<Katex tex="12\%" />) compares <Katex tex="\Pr(B\mid A)" /> with <Katex tex="\Pr(A)" /> instead of <Katex tex="\Pr(B)" />.</>,
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
          <p>
            Pick the form that uses what you are given. Here the givens are conditional probabilities, so the second form
            is the natural one.
          </p>
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
