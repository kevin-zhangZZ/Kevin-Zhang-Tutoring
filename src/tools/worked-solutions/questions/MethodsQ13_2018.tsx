// 2018 Mathematical Methods — Exam 2, MCQ 13. VCAA examination report: 59% correct. Two
// marbles from two different boxes; find the probability the scores total +1. Question text
// transcribed from the original paper; VCAA printed no diagram and neither does the stem here
// (guide §7). Answer checked with sympy (all 30 pairs enumerated: −4 in 8, +1 in 16, +6 in 6);
// itute agrees (E). Solution is original.
// Widget (in extras): interactives/meth-2018-mcq13-grid — the 30 equally likely pairs as a 6 × 5
// grid; +1 lights up two blocks (12 + 4 cells), and the "one order only" toggle shows option C.

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const GridWidget = lazyWidget(() => import('../interactives/meth-2018-mcq13-grid'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 7, C: 15, D: 14, E: 59 },
  answer: 'E',
  noAnswer: 1,
}

const ROWS: WorkingRow[] = [
  {
    working: <Katex display tex="-2 + 3 = 1" />,
    reason: <>Work out which <em>combination</em> of colours scores <Katex tex="+1" /> before touching any probability. There are only three colour pairs, so list them: two whites give <Katex tex="-4" />, two reds give <Katex tex="+6" />, and one of each gives <Katex tex="-2+3=+1" />. So the question is really &ldquo;what is the chance of one white and one red?&rdquo;</>,
  },
  {
    working: <Katex display tex="\text{Box 1: } 4W, 2R \ (6) \qquad \text{Box 2: } 2W, 3R \ (5)" />,
    reason: <>One marble comes from each box, so the two draws are independent. Keep the boxes separate: their sizes differ (<Katex tex="6" /> and <Katex tex="5" />), and they are not one shared pool of <Katex tex="11" /> marbles.</>,
  },
  {
    working: <Katex display tex="\Pr(W_1 \cap R_2) = \frac46 \times \frac35 = \frac{12}{30}" />,
    reason: <>&ldquo;One of each&rdquo; can happen two ways, because it matters <em>which box</em> gave the white. First way: white from Box 1 <em>and</em> red from Box 2. &ldquo;And&rdquo; for independent draws means multiply, as along the branches of a tree diagram.</>,
  },
  {
    working: <Katex display tex="\Pr(R_1 \cap W_2) = \frac26 \times \frac25 = \frac{4}{30}" />,
    reason: <>Second way: red from Box 1 and white from Box 2. This is a different outcome with a different probability, because the boxes hold different mixes. Missing this case leaves you on option C.</>,
  },
  {
    working: <Katex display tex="\Pr(\text{score}=+1) = \frac{12}{30}+\frac{4}{30} = \frac{16}{30}" />,
    reason: <>The two cases cannot both happen (Box 1 gave either a white or a red), so they are mutually exclusive and their probabilities add. &ldquo;Or&rdquo; between separate cases means add.</>,
  },
  {
    working: <Katex display tex="\boxed{\frac{8}{15}}" />,
    reason: <>Matches option <b>E</b>. (<Katex tex="\tfrac{8}{15}\approx0.53" /> — a little over half, which is plausible: mixed pairs are the most common outcome when each box is fairly balanced.) Option <b>C</b> <Katex tex="\left(\tfrac25=\tfrac{12}{30}\right)" /> is the first case only; option <b>D</b> <Katex tex="\left(\tfrac{2}{15}=\tfrac{4}{30}\right)" /> is the second only.</>,
  },
]

export default function MethodsQ13_2018() {
  return (
    <MCQShell
      question={
        <p>
          In a particular scoring game, there are two boxes of marbles and a player must
          randomly select one marble from each box. The first box contains four white marbles
          and two red marbles. The second box contains two white marbles and three red
          marbles. Each white marble scores <Katex tex="-2" /> points and each red marble
          scores <Katex tex="+3" /> points. The points obtained from the two marbles randomly
          selected by a player are added together to obtain a final score. What is the
          probability that the final score will equal <Katex tex="+1" />?
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="\dfrac23" /> },
        { letter: 'B', content: <Katex tex="\dfrac15" /> },
        { letter: 'C', content: <Katex tex="\dfrac25" /> },
        { letter: 'D', content: <Katex tex="\dfrac{2}{15}" /> },
        { letter: 'E', content: <Katex tex="\dfrac{8}{15}" />, isAnswer: true },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      extras={
        <>
          <Explore title="Why a score of +1 happens in two blocks of the grid">
            <GridWidget />
          </Explore>
          <WrongMethod
            title="+1 is one white and one red, so it is one product"
            source="15% chose C, 14% chose D"
            working={
              <>
                <Katex display tex="\tfrac46\times\tfrac35=\tfrac25 \quad (\text{C})" />
                <Katex display tex="\text{or } \tfrac26\times\tfrac25=\tfrac2{15} \quad (\text{D})" />
              </>
            }
          >
            Each of these is only one of the two ways to get one white and one red. The question never says which
            box the white comes from. The catch: once you know the score needs &ldquo;one of each&rdquo;, ask
            &ldquo;which box gave the white?&rdquo; Both answers are possible, so there are two cases to add. A
            quick check is that the three scores must share all the probability:{' '}
            <Katex tex="\tfrac{8}{30}+\tfrac{16}{30}+\tfrac{6}{30}=1" /> for <Katex tex="-4" />,{' '}
            <Katex tex="+1" /> and <Katex tex="+6" />. With <Katex tex="\tfrac{12}{30}" /> for{' '}
            <Katex tex="+1" /> the total falls short of <Katex tex="1" />.
          </WrongMethod>
        </>
      }
      background={
        <Background title="Translate the score into colours first">
          <p>
            Questions like this are easier backwards. Rather than enumerating outcomes and
            adding up scores, ask what colour combination produces the target score — here
            only one does, and that immediately reduces the problem to two ordered cases.
          </p>
          <p>
            Then be careful that the two boxes have <em>different</em> compositions, so
            "white then red" and "red then white" are genuinely different probabilities. They
            are not, as in many textbook versions, two copies of the same number.
          </p>
        </Background>
      }
    />
  )
}
