// 2025 Mathematical Methods NHT — Exam 1, Question 6 (4 marks). The NHT report gives sample
// answers only, with no statistics; its note on part b. (a tree diagram, conditional notation) is
// quoted as that part's examiner comment, and a.i. and a.ii. have no note. A high jumper with up
// to three attempts: a.i. the distribution of the number of attempts N; a.ii. E(N); b. Pr(C | B′)
// from Pr(success on the second or third attempt | first failed) = 0.7. Question text transcribed
// from the original paper (read from the page images — the 2025 paper has no text layer). The tree
// diagram is this site's own explanatory figure (matplotlib), not VCAA's. Answers checked against
// the VCAA report's sample answers (0.6, 0.2, 0.2; E(N) = 8/5 = 1.6; 0.4). Solution is original.

import Katex from '../../../components/Katex'
import { Background, PartCard, WorkingTable, WrongMethod, type WorkingRow, type SAExaminerStats } from '../QuestionParts'
import treeSrc from './meth-2025nhte1-q6-tree.png'

const REPORT_B: SAExaminerStats = {
  comment: (
    <>
      A tree diagram was useful. Familiarity with probability notation, particularly conditional probability notation, was
      important.
    </>
  ),
}

const CELL = 'border border-gray-300 dark:border-gray-700 px-4 py-1.5 text-center'

function DistTable({ filled }: { filled: boolean }) {
  const vals = filled ? ['0.6', '0.2', '0.2'] : ['0.6', '', '']
  return (
    <table className="text-[13.5px] border-collapse">
      <tbody>
        <tr>
          <th className={`${CELL} font-normal`}><Katex tex="n" /></th>
          {[1, 2, 3].map((v) => (
            <td key={v} className={CELL}>{v}</td>
          ))}
        </tr>
        <tr>
          <th className={`${CELL} font-normal whitespace-nowrap`}><Katex tex="\Pr(N=n)" /></th>
          {vals.map((v, i) => (
            <td key={i} className={`${CELL} min-w-[3.5rem] ${filled && i > 0 ? 'font-semibold text-sky-700 dark:text-sky-400' : ''}`}>{v}</td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}

const ROWS_AI: WorkingRow[] = [
  {
    working: (
      <div className="bg-white border border-gray-200 dark:border-gray-800 rounded-xl p-3 w-fit">
        <img loading="lazy" decoding="async"
          src={treeSrc}
          alt="This site's own tree diagram: from Start, A with probability 0.6 (N = 1), or A′ with 0.4; from A′, B with 0.5 (N = 2) or B′ with 0.5; from B′, C with probability p or C′ with 1 − p (both N = 3, total 0.4 × 0.5 = 0.2)"
          className="w-full max-w-[460px]"
        />
      </div>
    ),
    reason: <>
      Each attempt only happens if every earlier one failed, so the tree only branches further from the &ldquo;fail&rdquo;
      side. <Katex tex="\Pr(B\mid A')=0.5" /> means that, having failed the first jump, the second succeeds half the time;
      so <Katex tex="\Pr(B'\mid A')=0.5" /> too.
    </>,
  },
  {
    working: <Katex display tex="\Pr(N=1)=\Pr(A)=0.6" />,
    reason: <>One attempt exactly when the first succeeds (given in the table).</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \Pr(N=2)&=\Pr(A')\Pr(B\mid A') \\ &=0.4\times0.5=0.2 \end{aligned}" />,
    reason: <>Two attempts: the first fails and the second succeeds, so the jumper stops. Multiply along the branches.</>,
  },
  {
    working: <Katex display tex="\begin{aligned} \Pr(N=3)&=\Pr(A')\Pr(B'\mid A') \\ &=0.4\times0.5=0.2 \end{aligned}" />,
    reason: <>
      Three attempts: the first two both fail. The third attempt is then made <b>whatever</b> its result, so we don&apos;t need
      the probability of <Katex tex="C" /> here.
    </>,
  },
  {
    working: <DistTable filled />,
    reason: <>Check: <Katex tex="0.6+0.2+0.2=1" /> ✓, as the probabilities of a distribution must.</>,
  },
]

const ROWS_AII: WorkingRow[] = [
  {
    working: <Katex display tex="\begin{aligned} \text{E}(N)&=\sum n\Pr(N=n) \\ &=1(0.6)+2(0.2)+3(0.2) \end{aligned}" />,
    reason: <>The mean of a discrete random variable: each value times its probability, then add.</>,
  },
  {
    working: <Katex display tex="=0.6+0.4+0.6" />,
  },
  {
    working: <Katex display tex="\boxed{\text{E}(N)=1.6}" />,
    reason: <>
      VCAA writes this as <Katex tex="\tfrac85=1.6" />. Plausible: between 1 and 2, closer to 1, since the jumper usually clears
      the bar first time.
    </>,
  },
]

const ROWS_B: WorkingRow[] = [
  {
    working: <Katex display tex="\Pr(B\mid A')+\Pr(B'\mid A')\times\Pr(C\mid B')=0.7" />,
    reason: <>
      Given the first attempt failed (the <Katex tex="A'" /> branch of the tree in part a.i), &ldquo;successful on either the
      second or third attempt&rdquo; is two paths: succeed on the second, or fail the second and then succeed on the third.
      Add the two paths. <Katex tex="\Pr(C\mid B')" /> is the last branch of the tree (labelled <Katex tex="p" />): the third
      jump succeeds, given that the first two failed.
    </>,
  },
  {
    working: <Katex display tex="0.5+0.5\Pr(C\mid B')=0.7" />,
    reason: <><Katex tex="\Pr(B\mid A')=0.5" /> is given, and <Katex tex="\Pr(B'\mid A')=1-0.5=0.5" />.</>,
  },
  {
    working: <Katex display tex="0.5\Pr(C\mid B')=0.2" />,
    reason: <>Subtract 0.5 from both sides.</>,
  },
  {
    working: <Katex display tex="\boxed{\Pr(C\mid B')=0.4}" />,
    reason: <>
      Divide both sides by 0.5. Check through the complement: given <Katex tex="A'" />, failing both remaining jumps has probability{' '}
      <Katex tex="0.5\times(1-0.4)=0.3=1-0.7" /> ✓.
    </>,
  },
]

export default function MethodsQ6_2025NHTExam1() {
  return (
    <div className="flex flex-col gap-8">
      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">Question 6 (4 marks)</p>
        <p>A high jumper has up to three attempts to jump over a bar at a specific height.</p>
        <p>Once one attempt is successful, the high jumper does not make another attempt at this height.</p>
        <p>At this height, let</p>
        <ul className="list-disc pl-5 flex flex-col gap-1">
          <li><Katex tex="A" /> be the event that the high jumper&rsquo;s first attempt is successful</li>
          <li><Katex tex="B" /> be the event that the high jumper&rsquo;s second attempt is successful</li>
          <li><Katex tex="C" /> be the event that the high jumper&rsquo;s third attempt is successful.</li>
        </ul>
        <p>
          <Katex tex="\Pr(A)=0.6" /> and <Katex tex="\Pr(B\mid A')=0.5" />
        </p>
      </div>

      <div className="text-[14.5px] leading-relaxed text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 rounded-2xl px-5 py-4 flex flex-col gap-2">
        <p className="font-semibold text-gray-900 dark:text-white">a.</p>
        <p>
          Let <Katex tex="N" /> be a discrete random variable representing the number of attempts the high jumper makes at this
          height.
        </p>
      </div>

      <PartCard
        letter="a.i"
        topic="Discrete Distribution"
        marks={1}
        statement={
          <>
            Complete the table below for the probability distribution of <Katex tex="N" />.
            <div className="mt-3">
              <DistTable filled={false} />
            </div>
          </>
        }
      >
        <WorkingTable rows={ROWS_AI} />
      </PartCard>

      <PartCard
        letter="a.ii"
        topic="Expected Value"
        marks={1}
        statement={
          <>
            Find <Katex tex="\text{E}(N)" />, the mean number of attempts the high jumper makes at this height.
          </>
        }
      >
        <WorkingTable rows={ROWS_AII} />
      </PartCard>

      <PartCard
        letter="b"
        topic="Conditional Probability"
        marks={2}
        statement={
          <>
            The high jumper was not successful on the first attempt at this height.
            <br />
            Find <Katex tex="\Pr(C\mid B')" />, given that the high jumper has a 0.7 probability of making a successful jump on
            either their second or third attempt.
          </>
        }
        examinerReport={REPORT_B}
      >
        <Background>
          <p>
            Every probability on a tree&rsquo;s later branch is conditional on the path that led to it. The third-attempt branch
            only exists after two failures, so its probability is <Katex tex="\Pr(C\mid B')" />, read here as &ldquo;the third
            jump succeeds, given the first two failed&rdquo;. The 0.7 is also conditional: it is measured from the{' '}
            <Katex tex="A'" /> node, because the question says the first attempt failed.
          </p>
        </Background>
        <WorkingTable rows={ROWS_B} />
        <WrongMethod
          title="Take the 0.7 from the start of the tree"
          working={<Katex display tex="\begin{aligned} 0.4\times0.5+0.4\times0.5\times p&=0.7 \\ \implies p&=2.5 \end{aligned}" />}
        >
          A probability can&apos;t exceed 1, which is the warning sign. The 0.7 is the chance of success on the second or third
          attempt <b>given</b> the first failed, so the paths start from the <Katex tex="A'" /> node and don&apos;t include the
          factor 0.4.
        </WrongMethod>
      </PartCard>
    </div>
  )
}
