// 2017 Mathematical Methods — Exam 1, Question 5 (4 marks).
// Repeated independent attempts at a password, at most three. Question text transcribed
// from the original paper (no diagram given). Answers verified with sympy; itute agrees
// (27/125, 98/125, 48/125). Solution is original.
// Widgets: part a. "125 Jacs" stepped through the three attempts (still locked out
// 125 → 75 → 45 → 27, so (3/5)³; interactives/meth-2017e1-q5a-attempts.tsx); part c. the same
// dots with the event highlighted and the two wrong ideas from the report — conditioning on
// the first failure (48/75 = 16/25) and forcing a third attempt (FSF + FFS = 36/125)
// (interactives/meth-2017e1-q5c-count.tsx). WrongMethod boxes in part c. for both.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const AttemptsWidget = lazyWidget(() => import('../interactives/meth-2017e1-q5a-attempts'))
const CountWidget = lazyWidget(() => import('../interactives/meth-2017e1-q5c-count'))

const EXAM_A: SAExaminerStats = {
  marks: [24, 76],
  average: 0.6,
  comment: <>Students clearly identified what was required but some students erred with the arithmetic evaluation.</>,
}

const EXAM_B: SAExaminerStats = {
  marks: [34, 66],
  average: 0.6,
  comment: (
    <>
      Students generally recognised that the solution was the complement of their answer to
      part a. Others used a tree diagram to identify all possibilities for Jac to log on
      successfully.
    </>
  ),
}

const EXAM_C: SAExaminerStats = {
  marks: [26, 24, 50],
  average: 1.1,
  comment: (
    <>
      Many students who struggled with previous parts of the question generally made use of a
      tree diagram to find the two required cases. Common errors included use of conditional
      probability, use of binomial theorem or not realising that once Jac logged in, there was
      no need to keep attempting (three cases).
      <br />
      <br />
      A small number of students recognised that Pr(success on second or third attempt) =
      Pr(success) – Pr(success on the first attempt) ={' '}
      <Katex tex="\tfrac{98}{125}-\tfrac25=\tfrac{48}{125}" />
    </>
  ),
}

const ROWS_A: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(F) = 1-\tfrac25 = \tfrac35" />,
    reason: (
      <>
        Not logging on means Jac never types the right password, so the building block is the
        chance that <em>one</em> attempt fails — the complement of <Katex tex="\tfrac25" />.
      </>
    ),
  },
  {
    working: <Katex display tex="\Pr(\text{not log on}) = \Pr(FFF) = \left(\frac35\right)^{3}" />,
    reason: (
      <>
        The only way to miss out is wrong, wrong, wrong — a single path down the tree. Along a
        path we multiply, and &ldquo;independent&rdquo; is what allows it: the third attempt still
        fails with probability <Katex tex="\tfrac35" />, whatever happened before.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\frac{27}{125}}" />,
    reason: (
      <>
        <Katex tex="3^3=27" /> and <Katex tex="5^3=125" /> — the report says the slips here were
        in the arithmetic, so check the powers. About <Katex tex="0.216" />: roughly a one-in-five
        chance of being locked out, sensible for three tries at <Katex tex="40\%" /> each.
      </>
    ),
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(\text{log on}) = 1 - \Pr(\text{not log on})" />,
    reason: (
      <>
        How would I know to use the complement? Logging on has three routes (<Katex tex="S" />,{' '}
        <Katex tex="FS" />, <Katex tex="FFS" />) but not logging on has only one (
        <Katex tex="FFF" />), and part (a) has already found it. When the event you want has
        several routes and its opposite has one, subtract from <Katex tex="1" />.
      </>
    ),
  },
  {
    working: <Katex display tex="= 1 - \frac{27}{125}" />,
    reason: <>Directly from part (a); think of <Katex tex="1" /> as <Katex tex="\tfrac{125}{125}" />.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{98}{125}}" />,
    reason: (
      <>
        In the form <Katex tex="\tfrac{a}{b}" /> with <Katex tex="a=98" /> and{' '}
        <Katex tex="b=125" />. Check by adding the three routes:{' '}
        <Katex tex="\tfrac25+\tfrac{6}{25}+\tfrac{18}{125}" />{' '}
        <Katex tex="=\tfrac{50+30+18}{125}=\tfrac{98}{125}" />.
      </>
    ),
  },
]

const ROWS_C: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(FS) = \frac35\times\frac25 = \frac{6}{25}" />,
    reason: (
      <>
        &ldquo;Logs on at the second attempt&rdquo; is one route: wrong first, right second — and
        then Jac stops, so there is no third factor. Nothing is &ldquo;given&rdquo; in the question,
        so this is an ordinary path from the start of the tree, not a conditional probability: the{' '}
        <Katex tex="\tfrac35" /> for the first failure belongs in it.
      </>
    ),
  },
  {
    working: <Katex display tex="\Pr(FFS) = \frac35\times\frac35\times\frac25 = \frac{18}{125}" />,
    reason: <>Logging on at the third attempt is wrong, wrong, right.</>,
  },
  {
    working: <Katex display tex="\Pr(FS)+\Pr(FFS) = \frac{30}{125}+\frac{18}{125}" />,
    reason: (
      <>
        The two routes can&apos;t both happen — Jac can only get in for the first time once — so
        add. Write <Katex tex="\tfrac{6}{25}" /> as <Katex tex="\tfrac{30}{125}" /> for a common
        denominator.
      </>
    ),
  },
  {
    working: <Katex display tex="\boxed{\frac{48}{125}}" />,
    reason: (
      <>
        So <Katex tex="c=48" /> and <Katex tex="d=125" />. A neat check, which the report says
        a small number of students used: part (b) minus the chance of succeeding first go,{' '}
        <Katex tex="\tfrac{98}{125}-\tfrac{2}{5}=\tfrac{98-50}{125}=\tfrac{48}{125}" />.
      </>
    ),
  },
]

export default function MethodsQ5_2017Exam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">Question 5 (4 marks)</p>
        <p>
          For Jac to log on to a computer successfully, Jac must type the correct password.
          Unfortunately, Jac has forgotten the password. If Jac types the wrong password, Jac
          can make another attempt. The probability of success on any attempt is{' '}
          <Katex tex="\tfrac25" />. Assume that the result of each attempt is independent of
          the result of any other attempt. A maximum of three attempts can be made.
        </p>
      </div>

      <PartCard
        letter="a"
        topic="Independent Events"
        marks={1}
        statement={<>What is the probability that Jac does not log on to the computer successfully?</>}
        examinerReport={EXAM_A}
      >
        <Background title="A process that stops at the first success">
          <p>
            It looks binomial — three independent attempts, each with probability{' '}
            <Katex tex="\tfrac25" /> — but Jac <em>stops</em> as soon as the password works. So the
            tree does not have eight three-letter branches; it has four routes, each ending where
            Jac stops:
          </p>
          <Katex
            display
            tex="\underbrace{S}_{\frac{50}{125}},\quad \underbrace{FS}_{\frac{30}{125}},\quad \underbrace{FFS}_{\frac{18}{125}},\quad \underbrace{FFF}_{\frac{27}{125}}"
          />
          <p>
            They add to <Katex tex="\tfrac{125}{125}=1" />, as the routes of a tree must. Stopping a
            branch loses nothing: if Jac typed on after getting in, <Katex tex="FS" /> would just
            split into <Katex tex="FSS" /> and <Katex tex="FSF" />, and{' '}
            <Katex tex="\tfrac{6}{25}\cdot\tfrac25+\tfrac{6}{25}\cdot\tfrac35=\tfrac{6}{25}" /> again.
          </p>
          <p>
            &ldquo;All three attempts fail&rdquo; is <Katex tex="FFF" /> either way, which is why
            the report can write parts (a) and (b) with <Katex tex="\Pr(X=0)" />. Part (c) is about{' '}
            <em>when</em> Jac first gets in, which a count of successes can&apos;t describe — the
            report lists &ldquo;use of binomial theorem&rdquo; as a common error there.
          </p>
        </Background>
        <WorkingTable rows={ROWS_A} />
        <Explore title="Why it's (3/5)³: each attempt leaves 3 in 5 still locked out">
          <AttemptsWidget />
        </Explore>
      </PartCard>

      <PartCard
        letter="b"
        topic="Complement"
        marks={1}
        statement={
          <>
            Calculate the probability that Jac logs on to the computer successfully. Express
            your answer in the form <Katex tex="\dfrac{a}{b}" />, where <Katex tex="a" /> and{' '}
            <Katex tex="b" /> are positive integers.
          </>
        }
        examinerReport={EXAM_B}
      >
        <WorkingTable rows={ROWS_B} />
      </PartCard>

      <PartCard
        letter="c"
        topic="Independent Events"
        marks={2}
        statement={
          <>
            Calculate the probability that Jac logs on to the computer successfully on the
            second or on the third attempt. Express your answer in the form{' '}
            <Katex tex="\dfrac{c}{d}" />, where <Katex tex="c" /> and <Katex tex="d" /> are
            positive integers.
          </>
        }
        examinerReport={EXAM_C}
      >
        <WorkingTable rows={ROWS_C} />
        <Explore title="Count out of all 125 Jacs, not just the 75 who failed first">
          <CountWidget />
        </Explore>
        <WrongMethod
          title="Jac has already failed once, so from there it's Pr(S) + Pr(FS)"
          source="Examiner's report"
          working={<Katex display tex="\frac25+\frac35\times\frac25=\frac{16}{25}" />}
        >
          This treats the first failure as <em>given</em> — the conditional probability the report
          lists as a common error. It equals <Katex tex="\tfrac{48}{125}\div\tfrac35" />: the chance of
          getting in later <em>among the Jacs who failed first</em>. But the question is asked from the
          start, before Jac types anything, and says nothing like &ldquo;given&rdquo;. A size check
          catches it: <Katex tex="\tfrac{16}{25}=\tfrac{80}{125}" />, yet Jac logs on at all with
          probability <Katex tex="\tfrac{98}{125}" /> and <Katex tex="\tfrac{50}{125}" /> of that is the
          first attempt, so at most <Katex tex="\tfrac{48}{125}" /> is left for the second or third.
        </WrongMethod>
        <WrongMethod
          title="Three attempts, so the routes are F S F and F F S"
          source="Examiner's report"
          working={<Katex display tex="\Pr(FSF)+\Pr(FFS)=\tfrac{18}{125}+\tfrac{18}{125}=\tfrac{36}{125}" />}
        >
          Giving every route three letters is the binomial habit (the same{' '}
          <Katex tex="\tfrac{36}{125}" /> comes from <Katex tex="\Pr(X=1)-\Pr(SFF)" />), and it is one
          form of what the report describes as &ldquo;not realising that once Jac logged in, there was
          no need to keep attempting&rdquo;. After <Katex tex="FS" /> Jac is in and stops, so{' '}
          <Katex tex="FS" /> is a complete route worth <Katex tex="\tfrac{30}{125}" />. Forcing a third
          letter splits it into <Katex tex="FSF" /> (<Katex tex="\tfrac{18}{125}" />) and{' '}
          <Katex tex="FSS" /> (<Katex tex="\tfrac{12}{125}" />), and keeping only <Katex tex="FSF" />{' '}
          throws away <Katex tex="\tfrac{12}{125}" /> of genuine second-attempt log-ons. A branch of a
          tree ends when the process ends.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
