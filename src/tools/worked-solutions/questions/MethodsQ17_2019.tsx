// 2019 Mathematical Methods — Exam 2, MCQ 17. VCAA examination report: 43% correct.
// Probability that two marbles drawn without replacement are the same colour. Question text
// transcribed from the original paper. Solution is original. itute counts pairs instead
// (kC2 + (n−k)C2)/nC2, the same expression — noted in the working.
// Interactive: interactives/meth-2019-mcq17-marble-tree.tsx (live tree for n, k; options
// evaluated at the same numbers; a replacement toggle turns the answer into option A).
// WrongMethods: with-replacement thinking (A, 8%) and the binomial (E, 14%).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const MarbleTree = lazyWidget(() => import('../interactives/meth-2019-mcq17-marble-tree'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 8, B: 14, C: 21, D: 43, E: 14 },
  answer: 'D',
  noAnswer: 0,
  comment: (
    <>
      Let <Katex tex="R" /> represent a red marble and <Katex tex="G" /> a green marble.
      <br />
      <Katex tex="\Pr(RR)+\Pr(GG)" />
      <br />
      <Katex tex="=\dfrac{k}{n}\times\dfrac{k-1}{n-1}+\dfrac{n-k}{n}\times\dfrac{n-k-1}{n-1}" />
      <br />
      <Katex tex="=\dfrac{k(k-1)+(n-k)(n-k-1)}{n(n-1)}" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="n \text{ marbles: } k \text{ red},\ n-k \text{ green}" />,
    reason: <>&ldquo;<b>Not</b> replaced&rdquo; is the key phrase. After the first draw the box has one marble fewer, and one fewer of the colour just drawn, so the second draw&apos;s probabilities depend on the first. That calls for a two-stage tree diagram.</>,
  },
  {
    working: <Katex display tex="\Pr(\text{both red}) = \frac{k}{n}\cdot\frac{k-1}{n-1}" />,
    reason: <>Multiply along the branch. The first red has probability <Katex tex="\tfrac kn" />; given that, <Katex tex="k-1" /> reds remain among the <Katex tex="n-1" /> marbles left.</>,
  },
  {
    working: <Katex display tex="\Pr(\text{both green}) = \frac{n-k}{n}\cdot\frac{n-k-1}{n-1}" />,
    reason: <>The same on the green branch: <Katex tex="n-k" /> greens out of <Katex tex="n" />, then <Katex tex="n-k-1" /> greens out of <Katex tex="n-1" />.</>,
  },
  {
    working: <Katex display tex="\Pr(\text{same colour}) = \Pr(\text{RR})+\Pr(\text{GG})" />,
    reason: <>&ldquo;Same colour&rdquo; means either both red or both green. These are different paths through the tree (mutually exclusive), so add.</>,
  },
  {
    working: <Katex display tex="= \frac{k(k-1)}{n(n-1)} + \frac{(n-k)(n-k-1)}{n(n-1)}" />,
    reason: <>Both products already have the denominator <Katex tex="n(n-1)" />, so the numerators add directly. Counting pairs gives the same thing: <Katex tex="\tfrac{{}^kC_2+{}^{n-k}C_2}{{}^nC_2}" /> (2 of the reds or 2 of the greens, out of all pairs), and the halves in each <Katex tex="{}^mC_2=\tfrac{m(m-1)}{2}" /> cancel.</>,
  },
  {
    working: <Katex display tex="\text{Check } n=6,\ k=2: \ \tfrac26\cdot\tfrac15+\tfrac46\cdot\tfrac35=\tfrac{14}{30}=\tfrac{7}{15}" />,
    reason: <>With letters in every option, test a small case. With 2 red and 4 green marbles only D gives <Katex tex="\tfrac7{15}" /> (A gives <Katex tex="\tfrac59" />, C gives <Katex tex="\tfrac25" />). Choose the counts with care: when there are as many greens as reds, or exactly one more green than red, C happens to equal D (and 3 red with 2 green makes B equal D).</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{k(k-1)+(n-k)(n-k-1)}{n(n-1)}}" />,
    reason: <>Matches option <b>D</b>. Option <b>A</b> is the with-replacement answer (both draws out of <Katex tex="n" />). Option <b>E</b> is the binomial probability of exactly two reds in <Katex tex="n" /> draws with replacement, a different experiment. Option <b>C</b> agrees with D only when the number of green marbles equals the number of red marbles or is one more, so it is not correct in general.</>,
  },
]

export default function MethodsQ17_2019() {
  return (
    <MCQShell
      question={
        <p>
          A box contains <Katex tex="n" /> marbles that are identical in every way except colour, of which{' '}
          <Katex tex="k" /> marbles are coloured red and the remainder of the marbles are coloured green. Two
          marbles are drawn randomly from the box.
          <br />
          If the first marble is <b>not</b> replaced into the box before the second marble is drawn, then the
          probability that the two marbles drawn are the same colour is
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac{k^2+(n-k)^2}{n^2}" /> },
        { letter: 'B', content: <Katex tex="\dfrac{k^2+(n-k-1)^2}{n^2}" /> },
        { letter: 'C', content: <Katex tex="\dfrac{2k(n-k-1)}{n(n-1)}" /> },
        { letter: 'D', content: <Katex tex="\dfrac{k(k-1)+(n-k)(n-k-1)}{n(n-1)}" />, isAnswer: true },
        { letter: 'E', content: <Katex tex="{}^nC_2\left(\dfrac{k}{n}\right)^2\left(1-\dfrac{k}{n}\right)^{n-2}" /> },
      ]}
      background={
        <Background title="Without replacement, the second draw depends on the first">
          <p>
            In a tree diagram each second-stage branch is a conditional probability, such as{' '}
            <Katex tex="\Pr(\text{2nd red} \mid \text{1st red})" />. Multiply along a path, because{' '}
            <Katex tex="\Pr(A\cap B)=\Pr(A)\Pr(B\mid A)" />, and add the paths that make up the event. With replacement
            the box is restored, the second stage is identical to the first and the draws are independent. That is also the
            only setting in which a binomial distribution can apply.
          </p>
        </Background>
      }
      rows={ROWS}
      extras={
        <>
          <Explore title="Why the second draw has n − 1 underneath">
            <MarbleTree />
          </Explore>
          <WrongMethod
            title="Each draw is red with probability k/n"
            source="8% chose A"
            working={<Katex display tex="\left(\tfrac kn\right)^2+\left(\tfrac{n-k}{n}\right)^2=\tfrac{k^2+(n-k)^2}{n^2} \quad \text{(option A)}" />}
          >
            <p>
              Squaring <Katex tex="\tfrac kn" /> treats the two draws as independent, which is only true if the first marble
              goes back in. Here it doesn&apos;t: once a red is out, only <Katex tex="k-1" /> of the remaining{' '}
              <Katex tex="n-1" /> marbles are red. To catch it, try the smallest case, one red and one green (
              <Katex tex="n=2,\ k=1" />). Without replacement the two marbles must be different colours, so the answer is{' '}
              <Katex tex="0" />. D gives <Katex tex="0" />, but A gives <Katex tex="\tfrac12" />.
            </p>
          </WrongMethod>
          <WrongMethod
            title="Red or green each time, so it's binomial"
            source="14% chose E"
            working={<Katex display tex="\begin{gathered}X\sim\text{Bi}\left(n,\tfrac kn\right) \\ \Pr(X=2)={}^nC_2\left(\tfrac kn\right)^2\left(1-\tfrac kn\right)^{n-2} \\ \text{(option E)}\end{gathered}" />}
          >
            <p>
              A binomial needs independent trials with the same probability every time, which is impossible without
              replacement. Even with replacement this expression answers a different question: exactly two reds in{' '}
              <Katex tex="n" /> draws. Here only two marbles are drawn (<Katex tex="n" /> is the number in the box, not the
              number of trials), and &ldquo;same colour&rdquo; also includes two greens.
            </p>
          </WrongMethod>
        </>
      }
      examinerReport={EXAMINER}
    />
  )
}
