// 2018 Mathematical Methods — Exam 1, Question 6 (4 marks). Total probability across two
// boxes, then the reverse conditional probability. Question text transcribed from the
// original paper (no diagram given). Answers checked against the VCAA examination report
// (and itute: 3/4, 2/3). Solution is original.
//
// Interactives (both use the same "probability as area" picture: the square is probability 1, a
// column per box, a rectangle per stone):
// - part a. (meth-2018e1-q6a-area): build the square in three steps — choose a box, draw a stone,
//   shade black — so multiplying along a branch is a rectangle's area and adding branches is adding
//   areas; a "what if Box 2 had 6 stones" toggle shows the report's 6/8 counting shortcut failing
//   when the stones stop having equal areas.
// - part b. (meth-2018e1-q6b-given): "given black" makes the black area the new whole (2/3 of it
//   is Box 1); the reverse conditional Pr(K | B1) = 1; and Pr(K) ÷ Pr(B1) = 3/2 overshooting 1.
// The report prints its 6b working line above the feedback, so it is the sample answer and is not
// copied into the comment (§12.7); 6a's approaches are inside the feedback text, so they are.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const AreaWidget = lazyWidget(() => import('../interactives/meth-2018e1-q6a-area'))
const GivenWidget = lazyWidget(() => import('../interactives/meth-2018e1-q6b-given'))

const EXAM_A: SAExaminerStats = {
  marks: [10, 11, 79],
  average: 1.7,
  comment: (
    <>
      Several approaches were possible using a tree diagram or a counting argument.
      <ul className="list-disc pl-5 my-1">
        <li>
          <Katex tex="\Pr(\text{Black})=\tfrac12\times1+\tfrac12\times\tfrac12=\tfrac34" />
        </li>
        <li>
          <Katex tex="1-\Pr(\text{White})=1-\tfrac14=\tfrac34" />
        </li>
        <li>
          Since choosing either box is equally likely and choosing any stone is equally likely
          and there are <Katex tex="8" /> stones, <Katex tex="6" /> of which are black,{' '}
          <Katex tex="\Pr(\text{Black})=\tfrac68=\tfrac34" />
        </li>
      </ul>
      This question was generally well answered. Many students showed their reasoning via a
      tree diagram or some written explanation. Some students overworked the problem by trying
      to use the binomial distribution.
    </>
  ),
}

const EXAM_B: SAExaminerStats = {
  marks: [21, 19, 61],
  average: 1.4,
  comment: (
    <>
      Students generally recognised the conditional probability (reduced sample space). Some
      students incorrectly worked <Katex tex="\Pr(\text{Black}\mid\text{Box 1})" />, resulting
      in a probability greater than <Katex tex="1" />, which is not feasible.
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(B_1) = \Pr(B_2) = \frac12" />,
    reason: <>Each box is equally likely to be chosen. Write <Katex tex="B_1,B_2" /> for the boxes and <Katex tex="K" /> for "the stone is black". How do I know to start with the box? The chance of black depends on which box you are in, so split by box first, then find black inside each box.</>,
  },
  {
    working: <Katex display tex="\Pr(K\mid B_1) = \frac44 = 1, \qquad \Pr(K\mid B_2) = \frac24 = \frac12" />,
    reason: <>Box 1 is all black, so a black stone is certain. Box 2 is half black. These are the second-stage branches of the tree: each is worked out <em>inside</em> one box, which is what the bar in <Katex tex="\Pr(K\mid B_1)" /> means.</>,
  },
  {
    working: <Katex display tex="\Pr(K) = \Pr(K\mid B_1)\Pr(B_1) + \Pr(K\mid B_2)\Pr(B_2)" />,
    reason: <>The law of total probability: the stone is black either via Box 1 or via Box 2, and those two routes are mutually exclusive. On a tree diagram this is "multiply along each branch, then add the branches".</>,
  },
  {
    working: <Katex display tex="= 1\times\frac12 + \frac12\times\frac12 = \frac12+\frac14" />,
    reason: <>Substituting.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(K) = \frac34}" />,
    reason: <>The report gives a one-line counting check: because both boxes and all stones are equally likely, every one of the <Katex tex="8" /> stones is equally likely to be drawn, and <Katex tex="6" /> of them are black — <Katex tex="\tfrac68=\tfrac34" />. (This shortcut works only because the boxes hold the <em>same</em> number of stones.)</>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(B_1\mid K) = \frac{\Pr(B_1\cap K)}{\Pr(K)}" />,
    reason: <>&ldquo;Given that the stone is black&rdquo; tells you what you already know, and that goes after the bar. So the question reverses the conditioning: part a. went box <Katex tex="\to" /> colour, this goes colour <Katex tex="\to" /> box. Note which event is given — the report flags students who computed <Katex tex="\Pr(K\mid B_1)" /> instead and got an answer above <Katex tex="1" />, which is impossible for a probability and should be caught immediately.</>,
  },
  {
    working: <Katex display tex="\Pr(B_1\cap K) = \Pr(K\mid B_1)\Pr(B_1) = 1\times\frac12 = \frac12" />,
    reason: <>The numerator is the single branch "Box 1 <em>and</em> black", already computed in part a.</>,
  },
  {
    working: <Katex display tex="\Pr(B_1\mid K) = \frac{1/2}{3/4} = \frac12\times\frac43" />,
    reason: <>Dividing by the total from part a. Knowing the stone is black shrinks the sample space to the black outcomes only.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(B_1\mid K) = \frac23}" />,
    reason: <>Sensible: of the six black stones, four are in Box 1, so <Katex tex="\tfrac46=\tfrac23" />. It is larger than the prior <Katex tex="\tfrac12" />, as it should be — seeing a black stone is evidence <em>for</em> the all-black box. (<Katex tex="\tfrac23\approx0.67" />.)</>,
  },
]

export default function MethodsQ6_2018Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 6 (4 marks)</p>
        <p>
          Two boxes each contain four stones that differ only in colour.<br />
          Box 1 contains four black stones.<br />
          Box 2 contains two black stones and two white stones.<br />
          A box is chosen randomly and one stone is drawn randomly from it.<br />
          Each box is equally likely to be chosen, as is each stone.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Total Probability"
        marks={2}
        statement={<>What is the probability that the randomly drawn stone is black?</>}
        examinerReport={EXAM_A}
      >
        <Background>
          <p>
            A two-stage experiment (first a box, then a stone from that box) is a tree:{' '}
            <b>multiply</b> along each branch, then <b>add</b> the branches you want. You multiply
            because the second probability is a fraction <em>of</em> the first (half of the times
            you pick Box 2, the stone is black, and you pick Box 2 half the time). You add because
            the branches can&apos;t both happen: the stone comes from one box or the other.
          </p>
          <p>
            Only one stone is drawn, once, so there are no repeated trials and no binomial
            distribution here. The report notes students who overworked the problem that way.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <Explore title="Why you multiply along a branch, then add: probability as area">
          <AreaWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="b"
        topic="Conditional Probability"
        marks={2}
        statement={<>It is not known from which box the stone has been drawn. Given that the stone that is drawn is black, what is the probability that it was drawn from Box 1?</>}
        examinerReport={EXAM_B}
      >
        <Background>
          <p>
            Part a. was built from "given the box, how likely is black?". Part b. asks the
            question backwards: "given black, how likely is the box?". These are different numbers, and
            the order inside <Katex tex="\Pr(A\mid B)" /> is what distinguishes them — the bar
            means "given", and what follows it is what you already know.
          </p>
          <p>
            A sanity check that costs nothing: a probability can never exceed{' '}
            <Katex tex="1" />. The report notes students whose answer did, which is a signal
            the conditioning was applied the wrong way round.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <Explore title="“Given black” makes the black area the new whole">
          <GivenWidget />
        </Explore>
        <WrongMethod
          title="“Black … from Box 1”, so find Pr(Black | Box 1)"
          source="Examiner's report"
          working={<Katex display tex="\Pr(K\mid B_1)=\frac{\Pr(K)}{\Pr(B_1)}=\frac{3/4}{1/2}=\frac32" />}
        >
          The report notes students who worked <Katex tex="\Pr(\text{Black}\mid\text{Box 1})" />{' '}
          and got a probability greater than <Katex tex="1" />; dividing the part a. answer by{' '}
          <Katex tex="\Pr(B_1)" /> is the quickest way to land there. Two things are wrong. The
          conditioning is backwards: the question says the stone <em>is</em> black, so black is
          the known event and goes after the bar. And the top of a conditional probability must be
          the overlap <Katex tex="\Pr(A\cap B)" />, which sits inside the bottom event, so the
          fraction can never be more than <Katex tex="1" />. (Done correctly,{' '}
          <Katex tex="\Pr(K\mid B_1)=\tfrac{1/2}{1/2}=1" />: true, but it answers a
          different question.) Any probability above <Katex tex="1" /> means the wrong thing is on
          top or on the bottom.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
