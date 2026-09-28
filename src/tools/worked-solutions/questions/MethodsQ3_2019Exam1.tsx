// 2019 Mathematical Methods — Exam 1, Question 3 (3 marks).
// Jo picks one of three coins (two fair, one biased 1/3 for heads) and tosses it — find
// Pr(head), then Pr(unbiased | head). Question text transcribed from the original paper (no
// diagram given). Cross-checked against the VCAA examination report (which writes B = biased and
// gives Pr(B′ | H) = 3/4) and itute's independent solutions — both agree with the derivation
// below (4/9, 3/4). Solution is original.
// Interactives: part a. shows Pr(H) as the shaded area of a rectangle whose columns are the coins
// (width = chance of picking, height = chance of a head), with a toggle grouping the fair coins
// into the 2/3 branch and a wrong-idea toggle making "biased or unbiased" 50–50 (5/12); part b.
// counts 9 imagined goes, crosses out the tails and finds 3 of the 4 heads came from a fair coin,
// with a wrong-idea toggle that divides by all 9 goes (1/3 = Pr(U ∩ H)).
// Wrong methods: part a. — tossing all three coins, 5/6 (an ATAR Notes exam-discussion post:
// "Pr(TTT) = 0.5*0.5*2/3 = 1/6 ... 5/6", answered "it was one trial"); part b. — carrying the
// unsimplified 1/3 + 1/9 forward, which the report links to failures in b.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const AreaWidget = lazyWidget(() => import('../interactives/meth-2019e1-q3a-area'))
const GivenWidget = lazyWidget(() => import('../interactives/meth-2019e1-q3b-given'))

const EXAM_A: SAExaminerStats = {
  marks: [17, 15, 68],
  average: 1.5,
  comment: (
    <>
      As this question was worth two marks appropriate working was required to be shown. This
      could include computations or a probability tree diagram with relevant branches clearly
      identified. In some instances, it was not clear which fractions were being manipulated or
      how they were manipulated.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [55, 45],
  average: 0.5,
  comment: (
    <>
      Most students correctly identified the conditional nature of this probability problem.
      It was noted that many students who did not simplify their answer to part a. did not
      carry out the subsequent calculation successfully.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(H) = \Pr(U)\Pr(H\mid U) + \Pr(B)\Pr(H\mid B)" />,
    reason: (
      <>
        Let <Katex tex="U" /> = an unbiased coin is picked, <Katex tex="B" /> = the biased coin is
        picked. The experiment has two stages (pick a coin, then toss it), and the chance of a head
        depends on which coin came out. Whenever that happens, split into cases by the first stage:
        that is a tree diagram, written as the law of total probability. Defining the events in
        words first also answers the report&apos;s comment that in some scripts it was not clear
        which fractions were being manipulated.
      </>
    ),
  },
  {
    working: <Katex display tex="\Pr(U) = \tfrac23, \quad \Pr(B) = \tfrac13" />,
    reason: (
      <>
        &ldquo;Randomly selects&rdquo; means each of the three coins is equally likely, so each has
        chance <Katex tex="\tfrac13" />. Two of them are unbiased, so <Katex tex="\Pr(U)=\tfrac23" />,
        not <Katex tex="\tfrac12" />: we count coins, not kinds of coin.
      </>
    ),
  },
  {
    working: <Katex display tex="\Pr(H\mid U) = \tfrac12, \quad \Pr(H\mid B) = \tfrac13" />,
    reason: (
      <>
        The stem&apos;s first sentence says an unbiased coin makes a head as likely as a tail, and
        those are the only two outcomes, so each is <Katex tex="\tfrac12" />. The biased
        coin&apos;s <Katex tex="\tfrac13" /> is given.
      </>
    ),
  },
  {
    working: <Katex display tex="\Pr(H) = \tfrac23\times\tfrac12 + \tfrac13\times\tfrac13 = \tfrac13 + \tfrac19" />,
    reason: (
      <>
        Multiply along each head branch (pick that coin <em>and</em> get a head), then add the
        branches, because a head can come either way and the two ways can&apos;t both happen.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\Pr(H) = \dfrac{4}{9}}" />,
    reason: (
      <>
        <Katex tex="\tfrac13+\tfrac19=\tfrac39+\tfrac19" />. Simplify it now: the report notes that
        students who did not simplify this often went wrong in part b. Check: every coin gives a
        head with chance <Katex tex="\tfrac13" /> or <Katex tex="\tfrac12" />, so a mix of them must
        land in between, and <Katex tex="\tfrac49" /> does. The biased coin pulls it just below{' '}
        <Katex tex="\tfrac12" />.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(U\mid H) = \dfrac{\Pr(U\cap H)}{\Pr(H)}" />,
    reason: (
      <>
        &ldquo;Given that she tossed a head&rdquo;: we know how the second stage turned out and are
        asked about the first stage. That is conditional probability running backwards along the
        tree, so use the definition <Katex tex="\Pr(A\mid B)=\tfrac{\Pr(A\cap B)}{\Pr(B)}" />.
      </>
    ),
  },
  {
    working: <Katex display tex="= \dfrac{\tfrac23\times\tfrac12}{\tfrac49} = \dfrac{\tfrac13}{\tfrac49}" />,
    reason: (
      <>
        The numerator is the &ldquo;unbiased <em>and</em> head&rdquo; branch, which is the first term
        already worked out in part a. The denominator is part a.&apos;s answer, all the head
        branches together.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\Pr(U\mid H) = \dfrac34}" />,
    reason: (
      <>
        <Katex tex="\tfrac13\times\tfrac94=\tfrac34" /> (or in ninths,{' '}
        <Katex tex="\tfrac39\div\tfrac49=\tfrac34" />). It is higher than the{' '}
        <Katex tex="\tfrac23" /> we had before the toss: a fair coin gives heads more readily than
        the biased one, so seeing a head makes a fair coin a little more likely.
      </>
    ),
  },
]

export default function MethodsQ3_2019Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 3 (3 marks)</p>
        <p className="mb-2">
          The only possible outcomes when a coin is tossed are a head or a tail. When an
          unbiased coin is tossed, the probability of tossing a head is the same as the
          probability of tossing a tail.
        </p>
        <p className="mb-2">
          Jo has three coins in her pocket; two are unbiased and one is biased. When the biased
          coin is tossed, the probability of tossing a head is <Katex tex="\tfrac13" />.
        </p>
        <p>Jo randomly selects a coin from her pocket and tosses it.</p>
      </div>

      <PartCard letter="a" topic="Total Probability" marks={2} statement={<>Find the probability that she tosses a head.</>} examinerReport={EXAM_A}>
        <Background title="Two-Stage Experiments and the Law of Total Probability">
          <p>
            When the chance of an event depends on something that happens first, draw a tree: the
            first set of branches is the first stage (here, which coin), and each branch then splits
            by the second stage (head or tail), with conditional probabilities on those branches.
          </p>
          <p>
            Multiply along a path to get the chance of that whole path; add the paths that end in
            the event you want. Written out, that is the law of total probability:{' '}
            <Katex tex="\Pr(H)=\Pr(U)\Pr(H\mid U)+\Pr(B)\Pr(H\mid B)" />.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <Explore title="Pr(H) is an area: each coin's width times its chance of a head">
          <AreaWidget />
        </Explore>
        <WrongMethod
          title="Toss all three coins and find the chance of at least one head"
          source="ATAR Notes exam discussion"
          working={
            <>
              <Katex display tex="\Pr(TTT)=\tfrac12\times\tfrac12\times\tfrac23=\tfrac16" />
              <Katex display tex="\Pr(H)=1-\tfrac16=\tfrac56" />
            </>
          }
        >
          Jo picks <b>one</b> coin and tosses it <b>once</b>: a single trial with two stages (which
          coin, then the toss), not three tosses. The quick check catches it: no coin in her pocket
          gives a head more than half the time, so no way of choosing among them can give a head{' '}
          <Katex tex="\tfrac56" /> of the time. The answer must lie between{' '}
          <Katex tex="\tfrac13" /> and <Katex tex="\tfrac12" />.
        </WrongMethod>
      </PartCard>

      <PartCard letter="b" topic="Conditional Probability" marks={1} statement={<>Find the probability that she selected an unbiased coin, given that she tossed a head.</>} examinerReport={EXAM_B}>
        <Background title="What “Given” Does">
          <p>
            &ldquo;Given a head&rdquo; shrinks the set of possibilities to the head outcomes only;
            the tails are ruled out. <Katex tex="\Pr(U\mid H)" /> is then the share of the head
            probability that came through the unbiased branch, which is why we divide by{' '}
            <Katex tex="\Pr(H)" />.
          </p>
          <p>
            It is not the same as <Katex tex="\Pr(H\mid U)=\tfrac12" />. The order matters: the part
            after the bar is what we already know.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Explore title="Given a head: cross out the tails, then count where the heads came from">
          <GivenWidget />
        </Explore>
        <WrongMethod
          title="Carry Pr(H) into part b. as 1/3 + 1/9, unsimplified"
          source="Examiner's report"
          working={<Katex display tex="\dfrac{\tfrac13}{\tfrac13+\tfrac19} = \dfrac{\tfrac13}{\tfrac13}+\dfrac{\tfrac13}{\tfrac19} = 1+3 = 4" />}
        >
          The report notes that many students who did not simplify part a. did not complete this
          calculation successfully. One way it goes wrong is shown: splitting the fraction over the
          sum in its denominator, which is not allowed,{' '}
          <Katex tex="\tfrac{a}{b+c}\ne\tfrac ab+\tfrac ac" />. The giveaway is an answer bigger
          than 1, which no probability can be. Simplify first,{' '}
          <Katex tex="\tfrac13+\tfrac19=\tfrac49" />, then divide:{' '}
          <Katex tex="\tfrac13\times\tfrac94=\tfrac34" />.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
