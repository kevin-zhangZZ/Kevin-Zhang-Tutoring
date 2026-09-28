// 2018 Mathematical Methods — Exam 2, MCQ 8. VCAA examination report: 41% correct, with option
// E close behind at 36%. Additivity
// of definite integrals with a reversed interval. Question text transcribed from the original
// paper; VCAA printed no diagram and neither does the stem here (guide §7).
// Solution is original; B agrees with the report and itute.
// Interactive: meth-2018-mcq8-walk (walk 1 → 12 → 5 collecting signed area under one sample g
// that fits both given facts: walking back over 5 to 12 subtracts what leg 1 added, leaving
// ∫₁⁵ = −1). WrongMethod: option E, 5 − (−6) = 11 (36% chose E; computed to give exactly 11).

import Katex from '../../../components/Katex'
import { MCQShell } from '../MCQShell'
import { Background, WrongMethod, type WorkingRow, type MCQExaminerStats } from '../QuestionParts'
import { Explore, lazyWidget } from '../Explore'

const WalkWidget = lazyWidget(() => import('../interactives/meth-2018-mcq8-walk'))

const EXAMINER: MCQExaminerStats = {
  percentages: { A: 5, B: 41, C: 11, D: 7, E: 36 },
  answer: 'B',
  noAnswer: 0,
  comment: (
    <>
      <Katex tex="\displaystyle\int_1^{12} g(x)\,dx = 5,\ \int_{12}^{5} g(x)\,dx = -6" />
      <br />
      <Katex tex="\displaystyle\int_1^{12} g(x)\,dx = \int_1^{5} g(x)\,dx + \int_5^{12} g(x)\,dx" /> so
      <br />
      <Katex tex="\displaystyle 5 = \int_1^{5} g(x)\,dx + 6" />
      <br />
      <Katex tex="\displaystyle\int_1^{5} g(x)\,dx = -1" />
    </>
  ),
}

const ROWS: WorkingRow[] = [
  {
    working: (
      <>
        <Katex display tex="\int_{12}^{5} g(x)\,dx = -6" />
        <Katex display tex="\implies \int_{5}^{12} g(x)\,dx = 6" />
      </>
    ),
    reason: <>Swapping the terminals of a definite integral reverses its sign. The given integral runs <em>backwards</em> (from <Katex tex="12" /> down to <Katex tex="5" />), so turn it round before combining it with anything. This is the step the question is really testing: whenever a terminal on top is smaller than the one underneath, flip it first.</>,
  },
  {
    working: <Katex display tex="\int_1^{12} = \int_1^{5} + \int_5^{12}" />,
    reason: <>How would I know to split at <Katex tex="5" />? The integral we want (<Katex tex="1" /> to <Katex tex="5" />) and the flipped one (<Katex tex="5" /> to <Katex tex="12" />) join end to start at <Katex tex="5" /> and together cover <Katex tex="1" /> to <Katex tex="12" />, which is the integral we know. The signed areas of the two pieces add up to the whole.</>,
  },
  {
    working: <Katex display tex="5 = \int_1^{5} g(x)\,dx + 6" />,
    reason: <>Substituting the two known values.</>,
  },
  {
    working: <Katex display tex="\int_1^{5} g(x)\,dx = 5 - 6" />,
    reason: <>Subtract <Katex tex="6" /> from both sides. The same answer comes in one line by chaining the given integrals end to start, <Katex tex="1\to12\to5" />: <Katex tex="\int_1^{12}+\int_{12}^{5}=\int_1^{5}" />, so <Katex tex="5+(-6)=-1" />. The middle point does not have to lie between the ends: the walk below shows the backwards leg cancelling the overlap.</>,
  },
  {
    working: <Katex display tex="\boxed{\int_1^{5} g(x)\,dx = -1}" />,
    reason: <>Matches option <b>B</b>. A negative answer is fine: a definite integral is a <em>signed</em> area, so between <Katex tex="1" /> and <Katex tex="5" /> more area lies below the axis than above it. Option <b>E</b> <Katex tex="(11)" />, chosen by <Katex tex="36\%" /> (almost as many as answered correctly), is <Katex tex="5-(-6)" />: see the box below. Option <b>C</b> <Katex tex="(1)" /> has the right size but the wrong sign, which is what rearranging <Katex tex="5=\int_1^5+6" /> as <Katex tex="6-5" /> gives.</>,
  },
]

export default function MethodsQ8_2018() {
  return (
    <MCQShell
      question={
        <p>
          If <Katex tex="\displaystyle\int_1^{12} g(x)\,dx = 5" /> and{' '}
          <Katex tex="\displaystyle\int_{12}^{5} g(x)\,dx = -6" />, then{' '}
          <Katex tex="\displaystyle\int_1^{5} g(x)\,dx" /> is equal to
        </p>
      }
      options={[
        { letter: 'A', content: <Katex tex="-11" /> },
        { letter: 'B', content: <Katex tex="-1" />, isAnswer: true },
        { letter: 'C', content: <Katex tex="1" /> },
        { letter: 'D', content: <Katex tex="3" /> },
        { letter: 'E', content: <Katex tex="11" /> },
      ]}
      rows={ROWS}
      examinerReport={EXAMINER}
      background={
        <Background title="Why the terminals here are deliberately awkward">
          <p>
            Look at the order: <Katex tex="1\to12" />, then <Katex tex="12\to5" />. The second
            interval runs backwards and overlaps the first. That is not an accident: the
            question is built so that anyone who only remembers "add the integrals" without
            checking direction lands on a distractor.
          </p>
          <p>
            Two facts settle it:{' '}
            <Katex tex="\int_a^b = -\int_b^a" />, and{' '}
            <Katex tex="\int_a^b + \int_b^c = \int_a^c" /> for <em>any</em>{' '}
            <Katex tex="a,b,c" />, in any order. Think of <Katex tex="\int_a^b" /> as a walk from{' '}
            <Katex tex="a" /> to <Katex tex="b" /> collecting signed area: walking left, each strip has
            a negative width <Katex tex="dx" />, so the same area counts with the opposite sign. Two walks
            that join end to start add up to one walk from the first start to the last end.
          </p>
        </Background>
      }
      extras={
        <>
          <Explore title="Walk 1 → 12 → 5: the overlap cancels, leaving the integral from 1 to 5">
            <WalkWidget />
          </Explore>
          <WrongMethod
            title="Take the given −6 away from 5"
            source="36% chose E"
            working={
              <>
                <Katex display tex="\int_1^{5} = \int_1^{12} - \int_{12}^{5}" />
                <Katex display tex="= 5-(-6) = 11" />
              </>
            }
          >
            <p>
              Subtracting would be right for the piece <Katex tex="\int_5^{12}" />, which runs from{' '}
              <Katex tex="5" /> up to <Katex tex="12" />. But the question gives{' '}
              <Katex tex="\int_{12}^{5}" />, which runs the other way and so is the <em>negative</em> of that
              piece: <Katex tex="\int_5^{12}=+6" />. Using <Katex tex="-6" /> for it flips one sign, and{' '}
              <Katex tex="5-6=-1" /> becomes <Katex tex="5+6=11" />. To catch it, rewrite every given integral
              with its smaller terminal on the bottom before combining anything, or check that the pieces
              chain end to start (<Katex tex="1\to12" /> then <Katex tex="12\to5" />), in which case you add.
            </p>
          </WrongMethod>
        </>
      }
    />
  )
}
